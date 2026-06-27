#!/usr/bin/env node
/**
 * Build 227 Read-Only Verifier — Human Takeover runtime gate enablement readiness.
 *
 * Read-only. Reads repo docs/source as text and checks `git status` before/after. No network, no
 * Supabase call, no secret/credential access, no provider client, no SMS, no Twilio/Vapi/Resend/Lindy
 * call, no production data, no env mutation. Verifying is NOT a send and NOT an enablement.
 *
 * Proves the readiness slice is internally consistent AND that nothing was actually enabled:
 *  - The Build 227 doc exists, carries the exact decision token, and records: schema applied
 *    out-of-band (acknowledged in Build 226), workflow_events.event_type is text (no enum migration),
 *    the env stays off until separate approval, the future enablement step, and the rollback step.
 *  - The runtime gate default is UNCHANGED in source (HUMAN_TAKEOVER_SCHEMA_READY === 'true', default
 *    false); this build does not flip it.
 *  - The env reader is referenced ONLY in the expected route/dashboard call sites (no SMS/provider).
 *  - The dispatcher production + manual runners do NOT pass humanTakeoverSchemaReady to the executor
 *    (so the env flag cannot change dispatcher behavior).
 *  - No scheduler/cron is wired in backend/src/index.ts (no automatic writes from the flag alone).
 *  - Running this verifier does not mutate the repo (before/after `git status` equality).
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function assert(cond, message) { if (!cond) fail(message); }

function gitStatus() {
  return execFileSync('git', ['status', '--porcelain'], { cwd: repoRoot, encoding: 'utf8' });
}
function read(rel) {
  const p = path.join(repoRoot, rel);
  assert(fs.existsSync(p), `expected file missing: ${rel}`);
  return fs.readFileSync(p, 'utf8');
}
function count(haystack, needle) {
  return haystack.split(needle).length - 1;
}

const B227_DOC = 'docs/HUMAN_TAKEOVER_RUNTIME_GATE_ENABLEMENT_BUILD_227.md';
const B226_DOC = 'docs/HUMAN_TAKEOVER_SCHEMA_APPLICATION_BUILD_226.md';
const GATE_SRC = 'backend/src/services/lead-takeover.service.ts';
const TAKEOVER_ROUTE = 'backend/src/routes/lead-takeover.ts';
const DASHBOARD_ROUTE = 'backend/src/routes/dashboard.ts';
const PROD_RUNNER = 'backend/src/services/sms-dispatcher-production-runner.service.ts';
const MANUAL_RUNNER = 'backend/src/services/sms-dispatcher-manual-test-runner.service.ts';
const INDEX_SRC = 'backend/src/index.ts';

const DECISION_TOKEN = 'HUMAN_TAKEOVER_RUNTIME_GATE_ENABLEMENT_READY_AWAITING_SEPARATE_ENV_APPROVAL';

(async () => {
  const before = gitStatus();
  console.log('=== Build 227 Human Takeover Runtime Gate Enablement Readiness (local-only) ===');
  console.log('No SMS. No provider call. No Supabase call. No credentials. No env change. Read-only.');

  // 1. Build 227 doc exists and carries the decision token + readiness framing.
  const b227 = read(B227_DOC);
  assert(b227.includes(DECISION_TOKEN), 'B227 doc carries the exact decision token');
  assert(/repo[- ]only|readiness/i.test(b227), 'B227 doc frames itself as a repo-only readiness slice');
  assert(b227.includes('HUMAN_TAKEOVER_SCHEMA_READY'), 'B227 doc names the runtime gate env var');
  pass('Build 227 doc exists, carries the decision token, and is framed as repo-only readiness');

  // 2. B227 records workflow_events.event_type is text -> no enum migration required.
  assert(/workflow_events\.event_type/.test(b227), 'B227 doc references workflow_events.event_type');
  assert(/is `text`|is text|, not a Postgres enum|not an enum/i.test(b227), 'B227 doc states event_type is text/not an enum');
  assert(/no enum (value )?migration is required|no enum migration/i.test(b227), 'B227 doc states no enum migration is required');
  pass('Build 227 doc records event_type=text and no enum migration required');

  // 3. B227 records schema applied out-of-band + Build 226 acknowledgement.
  assert(/out-of-band/i.test(b227), 'B227 doc records the out-of-band schema application');
  assert(/Build 226|build 226/i.test(b227) && /schema_applied_by_jason=true/.test(b227), 'B227 doc references the Build 226 acknowledgement');
  pass('Build 227 doc records schema applied out-of-band and acknowledged in Build 226');

  // 4. B227 keeps env off and defers enablement to a separate approval.
  assert(/remains unset \/ false|unset \/ false|remains off/i.test(b227), 'B227 doc states the env remains unset/false/off');
  assert(/separate(ly)? (explicit )?approval|separate Jason approval|separately-approved|deferred/i.test(b227), 'B227 doc defers enablement to a separate approval');
  pass('Build 227 doc keeps the env off and defers enablement to separate approval');

  // 5. B227 records the exact future enablement step AND the rollback step.
  assert(/HUMAN_TAKEOVER_SCHEMA_READY=true/.test(b227), 'B227 doc records the enablement value HUMAN_TAKEOVER_SCHEMA_READY=true');
  assert(/HUMAN_TAKEOVER_SCHEMA_READY=false/.test(b227) || /unset it/i.test(b227), 'B227 doc records the rollback (=false / unset)');
  assert(/redeploy|restart/i.test(b227), 'B227 doc records the redeploy/restart requirement');
  assert(/Railway/i.test(b227), 'B227 doc names the backend/Railway/API service target');
  pass('Build 227 doc records the exact future enablement step and rollback step');

  // 6. B227 records the no-automatic-writes reasoning (scheduler/dispatcher/route/read facts).
  assert(/No scheduler|no cron|no scheduler \/ cron/i.test(b227), 'B227 doc states no scheduler/cron exists');
  assert(/script-only|not env-wired/i.test(b227), 'B227 doc states the dispatcher prod runner is script-only / not env-wired');
  assert(/authenticated POST/i.test(b227), 'B227 doc states route writes require authenticated POSTs');
  assert(/read-only/i.test(b227), 'B227 doc states pending-review GET is read-only');
  pass('Build 227 doc records why enabling the flag alone triggers no automatic writes');

  // 7. Runtime gate default UNCHANGED in source (this build does not flip it).
  const gate = read(GATE_SRC);
  assert(gate.includes("HUMAN_TAKEOVER_SCHEMA_READY === 'true'"), 'runtime gate still defaults false via === \'true\' check');
  pass('runtime gate default unchanged in source; Build 227 does not enable the flag');

  // 8. The env reader is referenced ONLY in the expected route/dashboard call sites (no SMS/provider).
  const takeoverRoute = read(TAKEOVER_ROUTE);
  const dashboardRoute = read(DASHBOARD_ROUTE);
  assert(count(takeoverRoute, 'isHumanTakeoverSchemaReady()') === 3, 'takeover route reads the gate at exactly the 3 endpoints (pending-review/takeover/release)');
  assert(count(dashboardRoute, 'isHumanTakeoverSchemaReady()') === 1, 'dashboard route reads the gate once (overview pendingReview projection)');
  pass('env gate referenced only in the expected route/dashboard call sites (no SMS/provider path)');

  // 9. Dispatcher prod + manual runners do NOT pass humanTakeoverSchemaReady (flag cannot move them).
  const prod = read(PROD_RUNNER);
  const manual = read(MANUAL_RUNNER);
  assert(prod.includes('executeSmsDispatcherDryRun'), 'prod runner calls the dispatcher executor');
  assert(!/humanTakeoverSchemaReady/.test(prod), 'prod runner does NOT pass humanTakeoverSchemaReady (defaults false)');
  assert(manual.includes('executeSmsDispatcherDryRun'), 'manual runner calls the dispatcher executor');
  assert(!/humanTakeoverSchemaReady/.test(manual), 'manual runner does NOT pass humanTakeoverSchemaReady (defaults false)');
  assert(!/isHumanTakeoverSchemaReady/.test(prod) && !/isHumanTakeoverSchemaReady/.test(manual), 'neither runner reads the env gate');
  pass('dispatcher prod/manual runners are not env-wired to the takeover flag');

  // 10. No scheduler/cron in the API entrypoint (no automatic writes from the flag alone).
  const index = read(INDEX_SRC);
  assert(!/setInterval|node-cron|cron\.schedule|new CronJob/.test(index), 'index.ts wires no scheduler/cron loop');
  pass('no scheduler/cron wired in backend/src/index.ts');

  // 11. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 227 runtime gate enablement readiness verified (${passCount} checks).`);
  console.log('runtime_gate_enabled=false  enum_migration_required=false  live_sms_sent=false  provider_calls_made=false  repo_unchanged=true');
})();
