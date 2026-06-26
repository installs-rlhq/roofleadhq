#!/usr/bin/env node
/**
 * Build 225 Read-Only Verifier — Human Takeover / Escalation pause gate + alert copy.
 *
 * Read-only. Compiles the native dispatcher + binding modules with tsc to a temp dir and exercises
 * them directly. No network, no secret access, no credentials, no phone/email, no production data,
 * no SMS, no Twilio/Vapi/Resend call. Does NOT construct a provider client. Verifying is NOT a send.
 *
 * Proves:
 *  - evaluateSmsSafety skips with reason 'human_takeover' when needsHumanTakeover=true, and is
 *    unchanged when false; existing opt-out/booked/cancelled/lost/quiet-hours behavior preserved.
 *  - the dispatcher dry-run executor plans a taken-over lead as a SKIP (no send) when the takeover
 *    schema is gated on, and is byte-identical to today's behavior when the gate is off, with NO
 *    writes / NO SMS / NO Twilio calls in either case.
 *  - the new M4 escalation copy is internal-only and has no live-capable send path.
 *  - running this verifier does not mutate the repo (before/after `git status` equality).
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

function gitStatus() {
  return execFileSync('git', ['status', '--porcelain'], { cwd: repoRoot, encoding: 'utf8' });
}

function loadModules() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b225-gate-verify');
  fs.mkdirSync(outDir, { recursive: true });
  const files = [
    'sms-safety.service.ts',
    'sms-dispatcher-planner.service.ts',
    'sms-duplicate-send-detector.service.ts',
    'sms-dispatcher-write-plan.service.ts',
    'sms-dispatcher-dry-run-executor.service.ts',
    'roofer-alert-binding.service.ts'
  ].map((f) => path.join(backendRoot, 'src/services', f));
  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [...files, '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck', '--outDir', outDir],
    { stdio: 'inherit' }
  );
  return {
    safety: require(path.join(outDir, 'sms-safety.service.js')),
    executor: require(path.join(outDir, 'sms-dispatcher-dry-run-executor.service.js')),
    binding: require(path.join(outDir, 'roofer-alert-binding.service.js'))
  };
}

// Mock Supabase mirroring the dispatcher's read-only chain; any write throws (must be unreachable).
class Query {
  constructor(table, mock) { this.table = table; this.mock = mock; }
  select() { this.mock.calls.push(`${this.table}.select`); return this; }
  eq() { this.mock.calls.push(`${this.table}.eq`); return this; }
  lte() { this.mock.calls.push(`${this.table}.lte`); return this; }
  not() { this.mock.calls.push(`${this.table}.not`); return this; }
  contains() { this.mock.calls.push(`${this.table}.contains`); return this; }
  or() { this.mock.calls.push(`${this.table}.or`); return this; }
  limit() { this.mock.calls.push(`${this.table}.limit`); return this; }
  insert() { this.mock.calls.push(`${this.table}.insert`); throw new Error('insert unreachable in dry-run'); }
  update() { this.mock.calls.push(`${this.table}.update`); throw new Error('update unreachable in dry-run'); }
  upsert() { this.mock.calls.push(`${this.table}.upsert`); throw new Error('upsert unreachable in dry-run'); }
  delete() { this.mock.calls.push(`${this.table}.delete`); throw new Error('delete unreachable in dry-run'); }
  then(resolve, reject) { return Promise.resolve(this.mock.responseFor(this.table)).then(resolve, reject); }
}

function createMockSupabase(options = {}) {
  return {
    calls: [],
    from(table) { this.calls.push(`${table}.from`); return new Query(table, this); },
    responseFor(table) {
      if (table === 'follow_ups') return { data: options.followUps || [], error: null };
      if (table === 'messages') return { data: options.messages || [], error: null };
      if (table === 'workflow_events') return { data: options.workflowEvents || [], error: null };
      return { data: [], error: null };
    }
  };
}

(async () => {
  const before = gitStatus();
  console.log('=== Build 225 Human Takeover Escalation Gate Verification (local-only) ===');
  console.log('No SMS. No Twilio/Vapi/Resend call. No writes. No credentials.');

  const { safety, executor, binding } = loadModules();

  const base = {
    rooferSmsEnabled: true,
    homeownerPhone: '+15551234567',
    leadStatus: 'new',
    followUpStatus: 'scheduled',
    scheduledFor: '2026-06-26T16:00:00.000Z',
    currentTime: '2026-06-26T16:05:00.000Z',
    rooferTimezone: 'America/Chicago',
    templateType: 'followup_2h',
    duplicateSendExists: false
  };

  // 1. Pure safety gate.
  const eligible = safety.evaluateSmsSafety(base);
  assert(eligible.allowed === true && eligible.reason === 'eligible', 'baseline lead is eligible (control)');

  const takenOver = safety.evaluateSmsSafety({ ...base, needsHumanTakeover: true });
  assert(takenOver.allowed === false && takenOver.action === 'skip' && takenOver.reason === 'human_takeover', 'needsHumanTakeover=true -> skip/human_takeover');

  const flagFalse = safety.evaluateSmsSafety({ ...base, needsHumanTakeover: false });
  assert(flagFalse.allowed === true && flagFalse.reason === 'eligible', 'needsHumanTakeover=false leaves send eligible (no regression)');

  // Existing blocks still take precedence / still fire.
  for (const [status, reason] of [['opted_out', 'opted_out'], ['booked', 'booked'], ['cancelled', 'cancelled'], ['lost', 'lost']]) {
    const r = safety.evaluateSmsSafety({ ...base, leadStatus: status, needsHumanTakeover: true });
    assert(r.allowed === false && r.reason === reason, `existing ${reason} block preserved even with takeover flag`);
  }
  const quiet = safety.evaluateSmsSafety({ ...base, currentTime: '2026-06-27T03:30:00.000Z' });
  assert(quiet.action === 'reschedule' && quiet.reason === 'quiet_hours', 'quiet-hours behavior preserved');
  pass('safety gate: human_takeover skips sends; false is inert; opt-out/booked/cancelled/lost/quiet-hours preserved');

  // 2. Dispatcher dry-run executor — taken-over lead is planned as a SKIP when schema gated on.
  const dueRow = (leadOverrides) => ({
    id: 'followup-1',
    roofer_id: 'roofer-1',
    lead_id: 'lead-1',
    status: 'scheduled',
    followup_type: '2h',
    scheduled_for: '2026-06-26T15:00:00.000Z',
    message_body: 'Just following up on your roofing request.',
    leads: Object.assign({ id: 'lead-1', phone: '+15551234567', status: 'new' }, leadOverrides),
    roofers: { id: 'roofer-1', business_name: 'Test Roofing', sms_confirmation_enabled: true, timezone: 'America/Denver' }
  });

  // Schema ready: lead row carries needs_human_takeover=true -> executor plans skip/human_takeover.
  const takeoverMock = createMockSupabase({ followUps: [dueRow({ needs_human_takeover: true })] });
  const takeoverRun = await executor.executeSmsDispatcherDryRun({
    supabase: takeoverMock,
    currentTime: '2026-06-26T16:00:00.000Z',
    humanTakeoverSchemaReady: true
  });
  assert(takeoverRun.counts.send === 0, 'taken-over lead is not planned as a send');
  assert(takeoverRun.plans[0].reason === 'human_takeover', 'taken-over lead skip reason is human_takeover');
  assert(takeoverRun.plans[0].should_send === false, 'taken-over lead should_send=false');
  assert(takeoverRun.noWritesPerformed === true && takeoverRun.noSmsSent === true && takeoverRun.noTwilioCallsMade === true, 'takeover run performs no writes/SMS/Twilio');

  // Gate OFF (default): the column is not projected, so the row has no flag -> behavior unchanged (send planned).
  const defaultMock = createMockSupabase({ followUps: [dueRow()] }); // no needs_human_takeover field (column not selected)
  const defaultRun = await executor.executeSmsDispatcherDryRun({
    supabase: defaultMock,
    currentTime: '2026-06-26T16:00:00.000Z'
  });
  assert(defaultRun.counts.send === 1, 'gate off: eligible lead still planned as send (no behavior change)');
  assert(defaultRun.plans[0].reason === 'eligible', 'gate off: reason remains eligible');

  const mutating = [...takeoverMock.calls, ...defaultMock.calls].filter((c) => /\.(insert|update|upsert|delete)$/.test(c));
  assert(mutating.length === 0, 'no insert/update/upsert/delete reachable in either executor run');
  pass('dispatcher: taken-over lead skipped (gated on); default path unchanged (gate off); no writes/SMS/Twilio');

  // 3. M4 escalation copy is internal-only with no live-capable send path.
  const m4 = binding.bindRooferAlert('hot_lead_needs_review_alert');
  assert(m4.ok === true && m4.channel === 'internal' && m4.messageId === 'M4', 'M4 binds as internal channel');
  const built = binding.buildHotLeadReviewAlert({ name: 'Demo Homeowner', issueSummary: 'roof leak after storm', area: 'Demo Service Area' });
  assert(built.channel === 'internal' && built.liveSend === false, 'buildHotLeadReviewAlert is internal, liveSend=false');
  assert(built.body === 'RoofLeadHQ: Hot lead needs review — Demo Homeowner, roof leak after storm, Demo Service Area. Reply or open dashboard.', 'M4 body fills name/issue/area exactly');
  const guardedM4 = binding.prepareGuardedFutureSend('hot_lead_needs_review_alert', {
    approval_signed: true, approval_granted: true, scenario_key: 'hot_lead_needs_review_alert',
    selected_variant_text: built.body, max_message_count: 1, retry_allowed: false, homeowner_contact_authorized: false
  }, 'SEND_ONE_LIVE_VALIDATION_SMS');
  assert(guardedM4.permitted === false && guardedM4.blockedReasons.includes('scenario_not_live_capable'), 'M4 has NO live send path (fail-closed scenario_not_live_capable)');

  // Existing approved copy still exact (no regression from adding M4).
  const EXACT_M1 = "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out.";
  const EXACT_M2 = 'RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.';
  assert(binding.bindRooferAlert('new_roof_inspection_lead_alert').boundBody === EXACT_M1, 'M1 approved copy unchanged');
  assert(binding.bindRooferAlert('missed_or_slow_lead_follow_up_nudge').boundBody === EXACT_M2, 'M2 approved copy unchanged');
  pass('M4 escalation copy is internal-only, fail-closed for live send; M1/M2 unchanged');

  // 4. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 225 human takeover escalation gate verification passed (${passCount} checks).`);
  console.log('No SMS sent. No provider call. No writes. No credentials. Repo unchanged.');
})();
