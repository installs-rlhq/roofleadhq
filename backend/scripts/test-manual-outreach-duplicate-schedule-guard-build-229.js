#!/usr/bin/env node
/**
 * Build 229 unit test — Manual Outreach duplicate-schedule guard (manual-outreach.service.ts).
 *
 * Read-only / offline. Compiles the native service with tsc to a temp dir and exercises it against an
 * in-memory mock Supabase. No live Supabase, no provider call, no SMS, no Twilio/Vapi/Resend/Lindy
 * call, no credentials, no network. The mock only mutates in-memory JS objects.
 *
 * Proves:
 *  - First manual outreach for a roofer + homeowner creates exactly one lead and one set of 4
 *    follow-ups (unchanged baseline behavior).
 *  - A repeated manual outreach for the same roofer + homeowner with a DIFFERENT MessageSid does NOT
 *    schedule another set of 4 follow-ups (the live Test Roofing delayed/failed-SMS incident).
 *  - The skip is documented by a `manual_outreach_duplicate_schedule_skipped` workflow event, and the
 *    inbound is still acknowledged via `manual_outreach_received` (so the webhook MessageSid dedup
 *    keeps working).
 *  - Replaying the real incident shape (1 inbound + 5 delayed re-deliveries, 6 distinct MessageSids)
 *    yields exactly 4 follow-ups for the single lead — not 24.
 *  - pause/stop command paths are unaffected (skip pending follow-ups, append paused/stopped event).
 *  - After a stop, a fresh inbound re-engages with a new set of 4 (guard only blocks ACTIVE sets).
 *  - No SMS/messages-table/provider path is exercised in any scenario.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');
const backendRoot = path.join(repoRoot, 'backend');

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function assert(cond, message) { if (!cond) fail(message); }
function clone(v) { return JSON.parse(JSON.stringify(v)); }

function loadService() {
  // The module instantiates a service-role client at import time and throws without env. Supply
  // dummy, well-formed values so createClient() constructs an object (it makes NO network call at
  // construction). All real data access in the test goes through the injected mock, never this client.
  process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://dummy.supabase.co';
  process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy-service-role-key-offline-test';

  const outDir = path.join(os.tmpdir(), 'roofleadhq-b229-manual-outreach-test');
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(outDir, { recursive: true });
  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [
      path.join(backendRoot, 'src/services/manual-outreach.service.ts'),
      '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck',
      '--outDir', outDir
    ],
    { stdio: 'inherit' }
  );
  // The service imports ../config/config, so tsc roots output at src/ and nests the service under
  // services/. Resolve it without hard-coding the layout.
  const candidates = [
    path.join(outDir, 'services', 'manual-outreach.service.js'),
    path.join(outDir, 'manual-outreach.service.js')
  ];
  const compiled = candidates.find((p) => fs.existsSync(p));
  assert(compiled, 'compiled manual-outreach.service.js not found in tsc output');
  // The compiled module lives under the OS temp dir, so make the backend's node_modules resolvable
  // (it requires @supabase/supabase-js at import time to build the default — unused — client).
  const backendModules = path.join(backendRoot, 'node_modules');
  process.env.NODE_PATH = process.env.NODE_PATH ? `${backendModules}${path.delimiter}${process.env.NODE_PATH}` : backendModules;
  require('module').Module._initPaths();
  return require(compiled);
}

// --- In-memory mock Supabase --------------------------------------------------------------------
// Replicates only the query surface used by createManualOutreach. Follow-up inserts default
// status to 'scheduled', matching the real follow_ups column default that the live incident showed.
function createMockSupabase(initial) {
  const state = {
    roofers: clone(initial.roofers || []),
    leads: clone(initial.leads || []),
    follow_ups: clone(initial.follow_ups || []),
    workflow_events: [],
    calls: []
  };
  // When set, the follow_ups SELECT (the duplicate-schedule guard query) resolves with an error,
  // simulating a Supabase failure so we can prove the guard fails closed.
  const failFollowUpsSelect = initial.failFollowUpsSelect || false;
  let leadSeq = state.leads.length;

  class Query {
    constructor(table) {
      this.table = table;
      this.op = 'select';
      this.filters = [];
      this.inFilter = null;
      this.payload = null;
    }
    select(_cols) { if (this.op !== 'insert') this.op = 'select'; return this; }
    insert(payload) { this.op = 'insert'; this.payload = payload; return this; }
    update(payload) { this.op = 'update'; this.payload = payload; return this; }
    eq(col, val) { this.filters.push([col, val]); return this; }
    in(col, vals) { this.inFilter = [col, vals]; return this; }
    single() { return Promise.resolve(this._run('single')); }
    maybeSingle() { return Promise.resolve(this._run('single')); }
    then(resolve, reject) { return Promise.resolve(this._run('list')).then(resolve, reject); }

    _match(rows) {
      return rows.filter((r) =>
        this.filters.every(([c, v]) => r[c] === v) &&
        (!this.inFilter || this.inFilter[1].includes(r[this.inFilter[0]]))
      );
    }
    _run(shape) {
      state.calls.push(`${this.table}.${this.op}`);
      if (this.op === 'insert') {
        const items = Array.isArray(this.payload) ? this.payload : [this.payload];
        const inserted = items.map((it) => {
          const row = clone(it);
          if (this.table === 'leads' && !row.id) { leadSeq += 1; row.id = `lead-${leadSeq}`; }
          if (this.table === 'follow_ups' && row.status === undefined) { row.status = 'scheduled'; }
          state[this.table].push(row);
          return row;
        });
        return shape === 'single'
          ? { data: clone(inserted[0]), error: null }
          : { data: clone(inserted), error: null };
      }
      if (this.op === 'update') {
        const matched = this._match(state[this.table]);
        matched.forEach((r) => Object.assign(r, this.payload));
        return shape === 'single'
          ? { data: matched[0] ? clone(matched[0]) : null, error: null }
          : { data: clone(matched), error: null };
      }
      if (this.table === 'follow_ups' && failFollowUpsSelect) {
        return { data: null, error: { code: 'PGRST500', message: 'simulated follow_ups read failure' } };
      }
      const matched = this._match(state[this.table]);
      if (shape === 'single') {
        return matched.length
          ? { data: clone(matched[0]), error: null }
          : { data: null, error: { code: 'PGRST116', message: 'no rows' } };
      }
      return { data: clone(matched), error: null };
    }
  }

  return {
    from(table) { state.calls.push(`${table}.from`); return new Query(table); },
    _state: state
  };
}

const ROOFER_ID = 'be7efc94-bd68-43af-81b2-dc7b869b42df'; // Test Roofing roofer_id (non-secret id)
const HOMEOWNER_PHONE = '+15555550199';

function rooferRow() { return { id: ROOFER_ID }; }
function sctx(sid) {
  return {
    twilio_from: HOMEOWNER_PHONE,
    twilio_to: '+18175874990',
    message_sid: sid,
    inbound_body: `angi ${HOMEOWNER_PHONE}`,
    webhook_source: 'twilio_manual_outreach'
  };
}
function countEvents(mock, type) {
  return mock._state.workflow_events.filter((e) => e.event_type === type).length;
}
function activeFollowUps(mock) {
  return mock._state.follow_ups.filter((f) => f.status === 'scheduled' || f.status === 'pending');
}

(async () => {
  console.log('=== Build 229 Manual Outreach Duplicate-Schedule Guard Unit Test (offline, mock Supabase) ===');
  console.log('No live Supabase. No provider call. No SMS. No Twilio/Vapi/Resend/Lindy. No credentials. No network.');

  const svc = loadService();
  assert(typeof svc.createManualOutreach === 'function', 'service exports createManualOutreach');

  // 1. First manual outreach -> one lead, one set of 4 follow-ups.
  const m1 = createMockSupabase({ roofers: [rooferRow()] });
  const r1 = await svc.createManualOutreach(
    { roofer_id: ROOFER_ID, homeowner_phone: HOMEOWNER_PHONE, source_detail: 'angi', source_context: sctx('SM00000000000000000000000000000001') },
    { supabase: m1 }
  );
  assert(r1.follow_up_count === 4, 'first outreach schedules exactly 4 follow-ups');
  assert(!r1.duplicate_schedule_skipped, 'first outreach is not flagged as a duplicate skip');
  assert(m1._state.leads.length === 1, 'first outreach creates exactly one lead');
  assert(m1._state.follow_ups.length === 4, 'follow_ups table holds exactly 4 rows after first outreach');
  assert(activeFollowUps(m1).length === 4, 'all 4 follow-ups are active (default status scheduled)');
  assert(countEvents(m1, 'lead_created') === 1, 'lead_created event recorded once');
  assert(countEvents(m1, 'followup_scheduled') === 1, 'followup_scheduled event recorded once');
  assert(countEvents(m1, 'manual_outreach_received') === 1, 'manual_outreach_received recorded for first inbound');
  assert(countEvents(m1, 'manual_outreach_duplicate_schedule_skipped') === 0, 'no duplicate-skip event on first inbound');
  pass('first manual outreach creates one lead and exactly one 4-follow-up set');

  // 2. Repeated outreach, same roofer + phone, DIFFERENT MessageSid -> no second set.
  const r2 = await svc.createManualOutreach(
    { roofer_id: ROOFER_ID, homeowner_phone: HOMEOWNER_PHONE, source_detail: 'angi', source_context: sctx('SM00000000000000000000000000000002') },
    { supabase: m1 }
  );
  assert(r2.duplicate_schedule_skipped === true, 'repeated outreach flagged as duplicate schedule skip');
  assert(r2.follow_up_count === 0, 'repeated outreach schedules 0 additional follow-ups');
  assert(m1._state.leads.length === 1, 'repeated outreach does not create a second lead');
  assert(m1._state.follow_ups.length === 4, 'follow_ups table still holds exactly 4 rows (no duplicate set)');
  assert(countEvents(m1, 'manual_outreach_duplicate_schedule_skipped') === 1, 'duplicate-skip workflow event recorded');
  assert(countEvents(m1, 'manual_outreach_received') === 2, 'second inbound still acknowledged (MessageSid dedup intact)');
  const skipEvent = m1._state.workflow_events.find((e) => e.event_type === 'manual_outreach_duplicate_schedule_skipped');
  assert(skipEvent && skipEvent.metadata && skipEvent.metadata.reason === 'active_followups_exist', 'duplicate-skip event records reason');
  assert(skipEvent.metadata.active_followup_count === 4, 'duplicate-skip event records the active follow-up count');
  pass('repeated outreach with a new MessageSid schedules no second set and records the duplicate-skip event');

  // 3. Replay the real incident shape: 1 inbound + 5 delayed re-deliveries, 6 distinct MessageSids.
  const inc = createMockSupabase({ roofers: [rooferRow()] });
  for (let i = 1; i <= 6; i += 1) {
    await svc.createManualOutreach(
      { roofer_id: ROOFER_ID, homeowner_phone: HOMEOWNER_PHONE, source_detail: 'angi', source_context: sctx(`SM0000000000000000000000000000010${i}`) },
      { supabase: inc }
    );
  }
  assert(inc._state.leads.length === 1, 'incident replay: still exactly one lead');
  assert(inc._state.follow_ups.length === 4, 'incident replay: exactly 4 follow-ups (not 24) for the single lead');
  assert(countEvents(inc, 'followup_scheduled') === 1, 'incident replay: only the first inbound scheduled a set');
  assert(countEvents(inc, 'manual_outreach_duplicate_schedule_skipped') === 5, 'incident replay: 5 duplicate-skip events for the 5 re-deliveries');
  pass('incident replay (6 distinct MessageSids) yields 4 follow-ups, not 24');

  // 4. pause/stop paths unaffected.
  const mp = createMockSupabase({ roofers: [rooferRow()] });
  await svc.createManualOutreach({ roofer_id: ROOFER_ID, homeowner_phone: HOMEOWNER_PHONE, source_detail: 'angi' }, { supabase: mp });
  assert(activeFollowUps(mp).length === 4, 'pre-pause: 4 active follow-ups');
  const pr = await svc.createManualOutreach({ roofer_id: ROOFER_ID, homeowner_phone: HOMEOWNER_PHONE, command: 'pause' }, { supabase: mp });
  assert(pr.follow_up_count === 0, 'pause does not schedule follow-ups');
  assert(activeFollowUps(mp).length === 0, 'pause skips all active follow-ups');
  assert(countEvents(mp, 'followup_paused') === 1, 'pause records followup_paused event');
  assert(countEvents(mp, 'manual_outreach_duplicate_schedule_skipped') === 0, 'pause does not trip the duplicate guard');
  pass('pause path skips active follow-ups and appends followup_paused (guard not tripped)');

  const ms = createMockSupabase({ roofers: [rooferRow()] });
  await svc.createManualOutreach({ roofer_id: ROOFER_ID, homeowner_phone: HOMEOWNER_PHONE, source_detail: 'angi' }, { supabase: ms });
  const sr = await svc.createManualOutreach({ roofer_id: ROOFER_ID, homeowner_phone: HOMEOWNER_PHONE, command: 'stop' }, { supabase: ms });
  assert(sr.follow_up_count === 0, 'stop does not schedule follow-ups');
  assert(activeFollowUps(ms).length === 0, 'stop skips all active follow-ups');
  assert(ms._state.follow_ups.every((f) => f.status === 'skipped'), 'stop sets follow-ups to skipped');
  assert(ms._state.follow_ups.some((f) => f.stopped_reason === 'roofer_stopped'), 'stop records stopped_reason');
  assert(countEvents(ms, 'followup_stopped') === 1, 'stop records followup_stopped event');
  pass('stop path skips active follow-ups, stamps stopped_reason, appends followup_stopped');

  // 5. After a stop (no active set), a fresh inbound re-engages with a new set of 4.
  const re = await svc.createManualOutreach(
    { roofer_id: ROOFER_ID, homeowner_phone: HOMEOWNER_PHONE, source_detail: 'angi', source_context: sctx('SM00000000000000000000000000000200') },
    { supabase: ms }
  );
  assert(re.follow_up_count === 4, 'post-stop inbound re-engages with a new set of 4 (no active set blocks it)');
  assert(!re.duplicate_schedule_skipped, 'post-stop re-engagement is not a duplicate skip');
  assert(activeFollowUps(ms).length === 4, 'post-stop re-engagement leaves 4 active follow-ups');
  pass('guard only blocks ACTIVE sets: post-stop re-engagement schedules a fresh set');

  // 6. Fail closed: if the guard query errors, do NOT schedule — throw a clear error.
  const mf = createMockSupabase({ roofers: [rooferRow()], failFollowUpsSelect: true });
  let threw = false;
  try {
    await svc.createManualOutreach(
      { roofer_id: ROOFER_ID, homeowner_phone: HOMEOWNER_PHONE, source_detail: 'angi', source_context: sctx('SM00000000000000000000000000000300') },
      { supabase: mf }
    );
  } catch (err) {
    threw = true;
    assert(/duplicate-schedule guard failed while checking active follow-ups/i.test(err.message),
      'guard error carries the clear fail-closed message');
    assert(/simulated follow_ups read failure/.test(err.message), 'guard error includes the underlying Supabase message');
  }
  assert(threw, 'createManualOutreach throws when the guard query errors (fails closed)');
  assert(mf._state.follow_ups.length === 0, 'no follow-ups scheduled when the guard query errors');
  assert(countEvents(mf, 'followup_scheduled') === 0, 'no followup_scheduled event when the guard query errors');
  pass('duplicate-schedule guard fails closed: query error throws and schedules nothing');

  // 7. No SMS / provider / messages path touched in any scenario.
  for (const m of [m1, inc, mp, ms, mf]) {
    assert(!m._state.calls.some((c) => /^messages\./.test(c)), 'no messages-table (SMS) access in any scenario');
  }
  const serviceSrc = fs.readFileSync(path.join(backendRoot, 'src/services/manual-outreach.service.ts'), 'utf8');
  assert(!/\.messages\.create\s*\(/.test(serviceSrc), 'service contains no Twilio messages.create send call');
  assert(!/sms-twilio-send-adapter/.test(serviceSrc), 'service does not import the Twilio send adapter');
  pass('no SMS/messages/provider send path exercised or present in the service');

  console.log(`\nPASS: Build 229 manual outreach duplicate-schedule guard unit test passed (${passCount} checks).`);
  console.log('No live Supabase. No provider call. No SMS. No credentials. No writes outside the in-memory mock.');
})();
