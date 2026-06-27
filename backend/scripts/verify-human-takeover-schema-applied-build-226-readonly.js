#!/usr/bin/env node
/**
 * Build 226 Read-Only Verifier — Out-of-band Human Takeover schema application acknowledgement.
 *
 * Read-only. Reads repo docs/source as text and checks `git status` before/after. No network, no
 * Supabase call, no secret/credential access, no provider client, no SMS, no Twilio/Vapi/Resend/Lindy
 * call, no production data, no env mutation. Verifying is NOT a send and NOT an enablement.
 *
 * Proves:
 *  - The Build 226 record doc exists and acknowledges the out-of-band schema application
 *    (schema_applied_by_jason=true, Supabase "Success. No rows returned.", all 5 columns + the index).
 *  - The Build 225 readiness doc is PRESERVED UNCHANGED in substance: it still says the schema was
 *    NOT APPLIED at its commit time (history not rewritten).
 *  - The runtime gate default is UNCHANGED: lead-takeover.service still resolves
 *    HUMAN_TAKEOVER_SCHEMA_READY === 'true' (i.e. default false); this build does not flip it.
 *  - The Build 226 doc records that the runtime env stays unset/false and enablement is deferred.
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

const B226_DOC = 'docs/HUMAN_TAKEOVER_SCHEMA_APPLICATION_BUILD_226.md';
const B225_DOC = 'docs/HUMAN_TAKEOVER_SCHEMA_READINESS.md';
const GATE_SRC = 'backend/src/services/lead-takeover.service.ts';

const APPLIED_COLUMNS = [
  'needs_human_takeover',
  'human_takeover_at',
  'human_takeover_by',
  'human_takeover_notes',
  'human_takeover_resolved_at'
];

(async () => {
  const before = gitStatus();
  console.log('=== Build 226 Out-of-Band Human Takeover Schema Application Acknowledgement (local-only) ===');
  console.log('No SMS. No provider call. No Supabase call. No credentials. No env change. Read-only.');

  // 1. Build 226 doc exists and acknowledges the out-of-band application.
  const b226 = read(B226_DOC);
  assert(/schema_applied_by_jason=true/.test(b226), 'B226 doc records schema_applied_by_jason=true');
  assert(b226.includes('Success. No rows returned.'), 'B226 doc records the exact Supabase response');
  assert(/out-of-band/i.test(b226), 'B226 doc states the application was out-of-band');
  assert(/Supabase SQL Editor/i.test(b226), 'B226 doc names the manual Supabase SQL Editor path');
  for (const col of APPLIED_COLUMNS) {
    assert(b226.includes(col), `B226 doc lists applied column ${col}`);
  }
  assert(b226.includes('idx_leads_pending_review'), 'B226 doc lists the applied index idx_leads_pending_review');
  assert(b226.includes('HUMAN_TAKEOVER_SCHEMA_APPLIED_AWAITING_RUNTIME_GATE_ENABLEMENT_APPROVAL'), 'B226 doc carries the exact decision token');
  pass('Build 226 doc acknowledges the out-of-band schema application (columns, index, response, token)');

  // 2. Build 226 doc keeps runtime env unset/false and defers enablement.
  assert(/remains unset \/ false|remains unset\/false|unchanged — remains unset/i.test(b226) || (/HUMAN_TAKEOVER_SCHEMA_READY/.test(b226) && /unchanged/i.test(b226)), 'B226 doc states HUMAN_TAKEOVER_SCHEMA_READY remains unchanged/unset/false');
  assert(/deferred/i.test(b226) && /separately approved|separate approval|separate Jason approval/i.test(b226), 'B226 doc defers runtime enablement to a separately approved build');
  assert(/No SMS|no provider|No Twilio/i.test(b226), 'B226 doc records that no live SMS/provider action occurred');
  pass('Build 226 doc keeps runtime env unchanged and defers enablement; records no live action');

  // 3. Build 226 doc records the open workflow_events enum checklist item WITHOUT applying it.
  assert(/workflow_events\.event_type/.test(b226), 'B226 doc records the workflow_events.event_type open item');
  for (const ev of ['human_takeover_started', 'human_takeover_released', 'human_takeover_resolved']) {
    assert(b226.includes(ev), `B226 doc lists open enum value ${ev}`);
  }
  assert(/Do not apply that SQL now/i.test(b226), 'B226 doc explicitly defers the enum SQL');
  pass('Build 226 doc records the workflow_events enum item as deferred (not applied)');

  // 4. Build 225 history preserved: still says NOT APPLIED / schema_applied=false at commit time.
  const b225 = read(B225_DOC);
  assert(/Schema is NOT applied by this document/.test(b225), 'B225 doc still states schema is NOT applied by it (history preserved)');
  assert(/NOT APPLIED/.test(b225), 'B225 doc still carries its NOT APPLIED SQL annotation');
  pass('Build 225 historical readiness doc preserved unchanged in substance (still NOT APPLIED)');

  // 5. Runtime gate default unchanged in source — this build does not flip it.
  // The gate resolves true only when the env var is the literal string 'true'; default is false. A
  // doc cannot enable anything (enablement is env/code), so the real guard is this source default.
  const gate = read(GATE_SRC);
  assert(gate.includes("HUMAN_TAKEOVER_SCHEMA_READY === 'true'"), 'runtime gate still defaults false via === \'true\' check');
  pass('runtime gate default unchanged in source; Build 226 does not enable HUMAN_TAKEOVER_SCHEMA_READY');

  // 6. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 226 out-of-band schema application acknowledgement verified (${passCount} checks).`);
  console.log('schema_applied_by_jason=true  runtime_gate_enabled=false  live_sms_sent=false  provider_calls_made=false  repo_unchanged=true');
})();
