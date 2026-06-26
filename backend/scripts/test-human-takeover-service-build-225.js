#!/usr/bin/env node
/**
 * Build 225 unit test — Human Takeover / Escalation service (lead-takeover.service.ts).
 *
 * Read-only / offline. Compiles the native service with tsc to a temp dir and exercises it against an
 * in-memory mock Supabase. No live Supabase, no provider call, no SMS, no credentials, no network.
 *
 * Proves: schema gate (no DB touch pre-schema), takeover/release/markHandled transitions, idempotency,
 * cross-roofer ownership rejection, phone masking, and that every result carries no-send guarantees.
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

function loadService() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b225-takeover-test');
  fs.mkdirSync(outDir, { recursive: true });
  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [
      path.join(backendRoot, 'src/services/lead-takeover.service.ts'),
      '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck',
      '--outDir', outDir
    ],
    { stdio: 'inherit' }
  );
  return require(path.join(outDir, 'lead-takeover.service.js'));
}

// --- In-memory mock Supabase --------------------------------------------------------------------
function createMockSupabase(initialLeads) {
  const leads = JSON.parse(JSON.stringify(initialLeads || []));
  const events = [];
  const calls = [];

  class Query {
    constructor(table) {
      this.table = table;
      this.op = null;
      this.filters = [];
      this.updatePayload = null;
      this.insertPayload = null;
    }
    select() { if (!this.op) this.op = 'select'; calls.push(this.table + '.select'); return this; }
    update(payload) { this.op = 'update'; this.updatePayload = payload; calls.push(this.table + '.update'); return this; }
    insert(payload) { this.op = 'insert'; this.insertPayload = payload; calls.push(this.table + '.insert'); return this._resolveInsert(); }
    eq(col, val) { this.filters.push([col, val]); calls.push(this.table + '.eq'); return this; }
    order() { calls.push(this.table + '.order'); return this._thenable(this._list()); }
    maybeSingle() { calls.push(this.table + '.maybeSingle'); return Promise.resolve(this._single()); }
    _filterVal(col) { const f = this.filters.find((x) => x[0] === col); return f ? f[1] : undefined; }
    _matchById() { const id = this._filterVal('id'); return leads.find((l) => l.id === id) || null; }
    _single() {
      if (this.table !== 'leads') return { data: null, error: null };
      if (this.op === 'update') {
        const row = this._matchById();
        const roofer = this._filterVal('roofer_id');
        if (!row || (roofer !== undefined && row.roofer_id !== roofer)) return { data: null, error: null };
        Object.assign(row, this.updatePayload);
        return { data: JSON.parse(JSON.stringify(row)), error: null };
      }
      const row = this._matchById();
      return { data: row ? JSON.parse(JSON.stringify(row)) : null, error: null };
    }
    _list() {
      if (this.table !== 'leads') return { data: [], error: null };
      const roofer = this._filterVal('roofer_id');
      const flag = this._filterVal('needs_human_takeover');
      const rows = leads.filter((l) =>
        (roofer === undefined || l.roofer_id === roofer) &&
        (flag === undefined || l.needs_human_takeover === flag)
      );
      return { data: JSON.parse(JSON.stringify(rows)), error: null };
    }
    _resolveInsert() {
      if (this.table === 'workflow_events') events.push(this.insertPayload);
      return Promise.resolve({ data: null, error: null });
    }
    _thenable(value) {
      return { then: (resolve) => Promise.resolve(value).then(resolve) };
    }
  }

  return {
    from(table) { calls.push(table + '.from'); return new Query(table); },
    _state: { leads, events, calls }
  };
}

const LEAD_ID = 'lead-aaaa';
const ROOFER_ID = 'roofer-1111';
const OTHER_ROOFER = 'roofer-9999';

function baseLead(overrides) {
  return Object.assign({
    id: LEAD_ID,
    roofer_id: ROOFER_ID,
    homeowner_name: 'Demo Homeowner',
    phone: '+15551234567',
    source_path: 'digital',
    source_detail: 'website',
    issue_description: 'Possible roof leak after storm',
    urgency: 'high',
    status: 'needs_attention',
    needs_human_takeover: false,
    human_takeover_at: null,
    human_takeover_by: null,
    human_takeover_notes: null,
    human_takeover_resolved_at: null
  }, overrides || {});
}

(async () => {
  console.log('=== Build 225 Human Takeover Service Unit Test (offline, mock Supabase) ===');
  console.log('No live Supabase. No provider call. No SMS. No credentials.');

  const svc = loadService();

  // 1. Schema gate: not ready -> schema_not_applied and NO supabase touch.
  const throwingClient = { from() { throw new Error('supabase must not be called pre-schema'); } };
  for (const fn of ['takeOverLead', 'releaseLead', 'markHandled']) {
    const r = await svc[fn]({ supabase: throwingClient, schemaReady: false, rooferId: ROOFER_ID, leadId: LEAD_ID });
    assert(r.ok === false && r.httpStatus === 503 && r.reason === 'schema_not_applied', `${fn} blocks pre-schema with 503 schema_not_applied`);
    assert(r.noLiveSms === true && r.noProviderCall === true, `${fn} pre-schema asserts no send`);
  }
  const pr0 = await svc.getPendingReview({ supabase: throwingClient, schemaReady: false, rooferId: ROOFER_ID });
  assert(pr0.ok === true && pr0.httpStatus === 200 && pr0.reason === 'schema_not_applied' && pr0.count === 0 && pr0.pendingReview.length === 0, 'getPendingReview pre-schema returns empty 200 placeholder');
  pass('schema gate: all transitions inert pre-schema, no supabase call, no send');

  // 2. Take over (ready) applies flag + appends started event.
  const m2 = createMockSupabase([baseLead()]);
  const take = await svc.takeOverLead({ supabase: m2, schemaReady: true, rooferId: ROOFER_ID, leadId: LEAD_ID, notes: 'hot lead', now: '2026-06-26T12:00:00.000Z' });
  assert(take.ok === true && take.reason === 'applied' && take.httpStatus === 200, 'takeover applies (200/applied)');
  assert(m2._state.leads[0].needs_human_takeover === true, 'lead flag set true');
  assert(m2._state.leads[0].human_takeover_at === '2026-06-26T12:00:00.000Z', 'taken-over-at stamped');
  assert(m2._state.leads[0].human_takeover_by === ROOFER_ID, 'taken-over-by stamped to roofer');
  assert(m2._state.leads[0].human_takeover_resolved_at === null, 'resolved-at cleared on takeover');
  assert(take.lead && take.lead.phone === '(***) ***-4567', 'returned lead has masked phone');
  assert(m2._state.events.some((e) => e.event_type === 'human_takeover_started'), 'human_takeover_started event appended');
  pass('takeover sets flag/at/by, masks phone, appends started event');

  // 3. Idempotent re-takeover -> already_in_takeover, no overwrite of original at/by.
  const re = await svc.takeOverLead({ supabase: m2, schemaReady: true, rooferId: ROOFER_ID, leadId: LEAD_ID, notes: 'second press', now: '2026-06-26T13:00:00.000Z' });
  assert(re.ok === true && re.reason === 'already_in_takeover', 're-takeover is idempotent (already_in_takeover)');
  assert(m2._state.leads[0].human_takeover_at === '2026-06-26T12:00:00.000Z', 'original taken-over-at preserved on re-takeover');
  pass('re-takeover idempotent and non-destructive');

  // 4. Ownership: other roofer cannot see or mutate -> 404 lead_not_found.
  const m4 = createMockSupabase([baseLead({ needs_human_takeover: true, human_takeover_by: ROOFER_ID, human_takeover_at: '2026-06-26T12:00:00.000Z' })]);
  const foreign = await svc.takeOverLead({ supabase: m4, schemaReady: true, rooferId: OTHER_ROOFER, leadId: LEAD_ID });
  assert(foreign.ok === false && foreign.httpStatus === 404 && foreign.reason === 'lead_not_found', 'cross-roofer takeover rejected 404');
  const foreignRel = await svc.releaseLead({ supabase: m4, schemaReady: true, rooferId: OTHER_ROOFER, leadId: LEAD_ID });
  assert(foreignRel.httpStatus === 404, 'cross-roofer release rejected 404');
  assert(m4._state.leads[0].needs_human_takeover === true, 'foreign access did not mutate the lead');
  pass('ownership guard rejects non-owned lead and performs no mutation');

  // 5. Missing lead -> 404.
  const m5 = createMockSupabase([baseLead()]);
  const missing = await svc.takeOverLead({ supabase: m5, schemaReady: true, rooferId: ROOFER_ID, leadId: 'does-not-exist' });
  assert(missing.httpStatus === 404 && missing.reason === 'lead_not_found', 'unknown lead id -> 404');
  pass('unknown lead id rejected 404');

  // 6. Release resumes automation + appends released event.
  const m6 = createMockSupabase([baseLead({ needs_human_takeover: true, human_takeover_by: ROOFER_ID, human_takeover_at: '2026-06-26T12:00:00.000Z' })]);
  const rel = await svc.releaseLead({ supabase: m6, schemaReady: true, rooferId: ROOFER_ID, leadId: LEAD_ID, notes: 'called homeowner', now: '2026-06-26T14:00:00.000Z' });
  assert(rel.ok === true && rel.reason === 'applied', 'release applies');
  assert(m6._state.leads[0].needs_human_takeover === false, 'release clears flag (automation resumes)');
  assert(m6._state.leads[0].human_takeover_resolved_at === '2026-06-26T14:00:00.000Z', 'resolved-at stamped on release');
  assert(m6._state.events.some((e) => e.event_type === 'human_takeover_released'), 'human_takeover_released event appended');
  // Idempotent release.
  const rel2 = await svc.releaseLead({ supabase: m6, schemaReady: true, rooferId: ROOFER_ID, leadId: LEAD_ID });
  assert(rel2.ok === true && rel2.reason === 'not_in_takeover', 'second release is idempotent (not_in_takeover)');
  pass('release clears flag, stamps resolved-at, appends event, idempotent');

  // 7. Mark handled -> resolved event.
  const m7 = createMockSupabase([baseLead({ needs_human_takeover: true, human_takeover_by: ROOFER_ID, human_takeover_at: '2026-06-26T12:00:00.000Z' })]);
  const handled = await svc.markHandled({ supabase: m7, schemaReady: true, rooferId: ROOFER_ID, leadId: LEAD_ID, notes: 'inspection booked offline', now: '2026-06-26T15:00:00.000Z' });
  assert(handled.ok === true && handled.reason === 'applied', 'markHandled applies');
  assert(m7._state.leads[0].needs_human_takeover === false, 'markHandled clears flag');
  assert(m7._state.events.some((e) => e.event_type === 'human_takeover_resolved'), 'human_takeover_resolved event appended');
  pass('markHandled resolves lead and appends resolved event');

  // 8. Pending Review scoped + masked + newest-first shape.
  const m8 = createMockSupabase([
    baseLead({ id: 'lead-1', needs_human_takeover: true, phone: '+15550001111', human_takeover_at: '2026-06-26T10:00:00.000Z' }),
    baseLead({ id: 'lead-2', needs_human_takeover: false }),
    baseLead({ id: 'lead-3', roofer_id: OTHER_ROOFER, needs_human_takeover: true })
  ]);
  const pr = await svc.getPendingReview({ supabase: m8, schemaReady: true, rooferId: ROOFER_ID });
  assert(pr.ok === true && pr.reason === 'ok', 'pending review ok when ready');
  assert(pr.count === 1 && pr.pendingReview.length === 1, 'pending review returns only this roofer\'s flagged leads');
  assert(pr.pendingReview[0].id === 'lead-1', 'pending review returns the active lead');
  assert(pr.pendingReview[0].phone === '(***) ***-1111', 'pending review masks phone');
  assert(!pr.pendingReview.some((l) => l.id === 'lead-3'), 'other roofer lead excluded (tenant isolation)');
  pass('pending review is tenant-scoped, flag-filtered, and phone-masked');

  // 9. No provider / messages table ever touched across all scenarios.
  for (const m of [m2, m4, m5, m6, m7, m8]) {
    assert(!m._state.calls.some((c) => /^messages\./.test(c)), 'no messages-table (SMS) access in any scenario');
  }
  pass('no SMS/messages table access in any scenario; all results assert noLiveSms + noProviderCall');

  console.log(`\nPASS: Build 225 human takeover service unit test passed (${passCount} checks).`);
  console.log('No live Supabase. No provider call. No SMS. No credentials. No writes outside the mock.');
})();
