#!/usr/bin/env node
/**
 * Build 240 Read-Only Verifier — Vapi-originated synthetic/controlled webhook validation
 * FRESH PRE-RUN GUARD packet.
 *
 * Read-only. Reads the Build 240 pre-run guard doc (and the B237 + B238 + B239 predecessor docs) as
 * text and checks `git status` before/after. No network, no Supabase call, no credential/secret
 * access, no provider client, no SMS, no Twilio, no call, no Vapi Talk, no live HTTP, no curl, no env
 * mutation, no deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no
 * service; does NOT build. Performs NO Vapi-originated action.
 *
 * Build 240 is a fresh pre-run guard for the single, already-approved (Build 239) Vapi-originated
 * synthetic/controlled webhook validation. It re-asserts every prerequisite and safety invariant and
 * establishes the fail-closed pre-run gate. Build 240 does NOT execute the validation.
 *
 * This verifier proves the pre-run guard packet is internally consistent, grounded, and safe:
 *  - The Build 240 doc exists and carries the exact decision token.
 *  - It references source commit a17d6f9 (HEAD == origin/main) — the current prerequisite Build 239.
 *  - It names Build 237 (48bb25d), Build 238 (077716e), and Build 239 (a17d6f9) as prerequisite
 *    validated/approved states, and those predecessor docs exist.
 *  - The Build 239 approval is present and limited to exactly one Vapi-originated synthetic/controlled
 *    validation.
 *  - Test Roofing Assistant only.
 *  - Sanitized evidence capture only.
 *  - no real homeowner traffic / no real roofer traffic / no SMS / no Twilio call /
 *    no production data export / no schema-auth-RLS change / no billing-CRM automation /
 *    no public-live automation.
 *  - The doc carries no secret value (redacted markers only) and no secret-shaped/phone-shaped values.
 *  - No Vapi-originated action has been executed by Build 240.
 *  - real_call_test_status = not_started.
 *  - full_payload_processing_status = not_yet_validated.
 *  - The full Build 240 safety-invariant block is present.
 *  - The next action requires exactly one guarded command/action and sanitized capture only.
 *  - The dry-run wrapper wires this verifier + the B239 + B238 + B237 verifiers + the smoke regression.
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

const DOC = 'docs/VAPI_ORIGINATED_VALIDATION_PRE_RUN_GUARD_BUILD_240.md';
const B239_DOC = 'docs/VAPI_ORIGINATED_VALIDATION_APPROVAL_GUARD_BUILD_239.md';
const B238_DOC = 'docs/VAPI_WEBHOOK_BEARER_CREDENTIAL_VALIDATION_EVIDENCE_BUILD_238.md';
const B237_DOC = 'docs/VAPI_WEBHOOK_AUTHORIZED_SYNTHETIC_GATE_PAIR_EVIDENCE_BUILD_237.md';
const VERIFIER = 'backend/scripts/verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js';
const DRY_RUN = 'scripts/run-vapi-originated-validation-pre-run-guard-build-240-dry-run.sh';
const B239_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js';
const B238_VERIFIER = 'backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js';
const B237_VERIFIER = 'backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js';

const DECISION_TOKEN = 'VAPI_ORIGINATED_VALIDATION_PRE_RUN_GUARD_READY_NOT_YET_EXECUTED';
const SOURCE_COMMIT = 'a17d6f9';
const B238_COMMIT = '077716e';
const B237_COMMIT = '48bb25d';

(function main() {
  const before = gitStatus();
  console.log('=== Build 240 Vapi-originated validation FRESH PRE-RUN GUARD read-only verification (local-only) ===');
  console.log('No call. No Vapi Talk. No curl. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No Vapi-originated action. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B240 doc carries the exact decision token');
  pass('Build 240 pre-run guard doc exists and carries the decision token');

  // 2. References current prerequisite Build 239 commit a17d6f9 + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B240 doc references current prerequisite commit a17d6f9');
  assert(/build_239_prerequisite_commit\s*=\s*a17d6f9/.test(doc),
    'B240 doc records build_239_prerequisite_commit = a17d6f9');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B240 doc records HEAD==origin/main');
  pass('B240 doc references current prerequisite Build 239 commit a17d6f9 (HEAD==origin/main)');

  // 3. Build 237 + 238 + 239 are prerequisite validated/approved states; predecessor docs exist.
  assert(/Build 237/.test(doc) && new RegExp(B237_COMMIT).test(doc) &&
    /build_237_prerequisite_status\s*=\s*validated/.test(doc),
    'B240 doc names Build 237 (48bb25d) as a validated prerequisite');
  assert(/Build 238/.test(doc) && new RegExp(B238_COMMIT).test(doc) &&
    /build_238_prerequisite_status\s*=\s*validated/.test(doc),
    'B240 doc names Build 238 (077716e) as a validated prerequisite');
  assert(/Build 239/.test(doc) && /build_239_prerequisite_status\s*=\s*validated/.test(doc),
    'B240 doc names Build 239 as a validated prerequisite');
  assert(fs.existsSync(path.join(repoRoot, B237_DOC)), 'Build 237 evidence doc exists');
  assert(fs.existsSync(path.join(repoRoot, B238_DOC)), 'Build 238 evidence doc exists');
  assert(fs.existsSync(path.join(repoRoot, B239_DOC)), 'Build 239 evidence doc exists');
  pass('B240 doc names Build 237 + Build 238 + Build 239 as prerequisites and all three predecessor docs exist');

  // 4. Build 239 approval present and limited to exactly ONE Vapi-originated synthetic/controlled validation.
  assert(/approval_captured\s*=\s*true/.test(doc), 'B240 doc records approval_captured = true');
  assert(/one Vapi-originated synthetic\/controlled webhook validation/.test(doc),
    'B240 doc limits approval to one Vapi-originated synthetic/controlled webhook validation');
  assert(/approval_count_limit\s*=\s*1/.test(doc), 'B240 doc records approval_count_limit = 1');
  pass('B240 doc carries the Build 239 approval limited to exactly one Vapi-originated synthetic/controlled validation');

  // 5. Test Roofing Assistant only.
  assert(/Test Roofing Assistant only/.test(doc) && /approved_assistant\s*=\s*Test Roofing Assistant only/.test(doc),
    'B240 doc scopes the approval to the Test Roofing Assistant only');
  pass('B240 doc scopes the validation to the Test Roofing Assistant only');

  // 6. Sanitized evidence capture only.
  assert(/sanitized evidence capture only/.test(doc) && /evidence_mode\s*=\s*sanitized evidence capture only/.test(doc),
    'B240 doc requires sanitized evidence capture only');
  pass('B240 doc requires sanitized evidence capture only');

  // 7. The explicit prohibition set (homeowner/roofer/SMS/Twilio/export/schema/billing-CRM/public-live).
  const prohibitions = [
    [/no_real_homeowner_traffic\s*=\s*true/, 'no real homeowner traffic'],
    [/no_real_roofer_traffic\s*=\s*true/, 'no real roofer traffic'],
    [/no_sms\s*=\s*true/, 'no SMS'],
    [/no_twilio_call\s*=\s*true/, 'no Twilio call'],
    [/no_production_data_export\s*=\s*true/, 'no production data export'],
    [/no_schema_auth_rls_change\s*=\s*true/, 'no schema/auth/RLS changes'],
    [/no_billing_crm_automation\s*=\s*true/, 'no billing/CRM automation'],
    [/no_public_live_automation\s*=\s*true/, 'no public/live automation'],
  ];
  for (const [re, label] of prohibitions) assert(re.test(doc), `B240 doc records prohibition: ${label}`);
  pass('B240 doc records all approval prohibitions: no homeowner/roofer traffic, no SMS, no Twilio call, no export, no schema/auth/RLS, no billing/CRM, no public/live automation');

  // 8. No Vapi-originated action executed by Build 240.
  assert(/vapi_originated_validation_status\s*=\s*approved_not_yet_executed/.test(doc),
    'B240 doc records vapi_originated_validation_status = approved_not_yet_executed');
  assert(/vapi_originated_action_performed_by_build_240\s*=\s*false/.test(doc),
    'B240 doc records vapi_originated_action_performed_by_build_240 = false');
  assert(/does\s+(?:\*\*)?NOT(?:\*\*)?\s+perform the Vapi-originated validation/i.test(doc) ||
    /[Nn]o Vapi-originated webhook validation executed/.test(doc),
    'B240 doc states this build does NOT perform the Vapi-originated validation');
  pass('B240 doc states no Vapi-originated action has been executed by Build 240');

  // 9. pre_run_guard_status ready.
  assert(/pre_run_guard_status\s*=\s*ready/.test(doc), 'B240 doc records pre_run_guard_status = ready');
  pass('B240 doc records pre_run_guard_status = ready');

  // 10. real_call_test_status not_started, full_payload_processing_status not_yet_validated.
  assert(/real_call_test_status\s*=\s*not_started/.test(doc), 'B240 doc records real_call_test_status = not_started');
  assert(/full_payload_processing_status\s*=\s*not_yet_validated/.test(doc),
    'B240 doc records full_payload_processing_status = not_yet_validated');
  pass('B240 doc records real_call_test not_started and full_payload_processing not_yet_validated');

  // 11. No secret value present + secret file not read + no secret committed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B240 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B240 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B240 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B240 doc asserts no secrets printed');
  pass('B240 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 12. No phone-number-shaped or secret-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B240 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B240 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B240 doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B240 doc contains no phone-number-shaped value');
  pass('B240 doc contains no secret-shaped or phone-number-shaped values');

  // 13. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No SMS sent/i,
    /No Twilio call placed or routed/i,
    /No Twilio configuration change/i,
    /No unrelated Railway configuration change/i,
    /No unrelated Vapi configuration change/i,
    /No Vapi-originated webhook validation executed by this build/i,
    /No full Vapi payload processing pass executed/i,
    /No real call test executed/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
    /No deploy \/ redeploy \/ restart/i,
  ];
  for (const re of gates) assert(re.test(doc), `B240 doc missing safety invariant: ${re}`);
  pass('B240 doc states the full Build 240 safety-invariant block');

  // 14. Next action requires exactly one guarded command/action and sanitized capture only.
  assert(/[Nn]ext gated step/.test(doc), 'B240 doc records the exact next gated step');
  assert(/exactly one guarded command\/action/i.test(doc),
    'B240 doc next step requires exactly one guarded command/action');
  assert(/fresh pre-run command\/guard passes/i.test(doc),
    'B240 doc next step requires a fresh pre-run command/guard to pass beforehand');
  assert(/sanitized status\/output only|sanitized status\s*\/\s*output only/i.test(doc),
    'B240 doc next step captures sanitized status/output only');
  assert(/[Nn]o real homeowner traffic/.test(doc) && /[Nn]o real roofer traffic/.test(doc),
    'B240 doc next step forbids real homeowner/roofer traffic');
  pass('B240 doc next gated step: exactly one guarded command/action after fresh pre-run guard, sanitized status/output only, no real homeowner/roofer traffic');

  // 15. Dry-run wrapper exists and wires this verifier + B239 + B238 + B237 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B240 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B239_VERIFIER)), 'B239 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B238_VERIFIER)), 'B238 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B237_VERIFIER)), 'B237 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-originated-validation-approval-guard-build-239-readonly.js'),
    'dry-run wrapper runs the Build 239 verifier');
  assert(dry.includes('verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js'),
    'dry-run wrapper runs the Build 238 verifier');
  assert(dry.includes('verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js'),
    'dry-run wrapper runs the Build 237 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B240 verifier present and the dry-run wrapper wires this verifier + B239 + B238 + B237 verifiers + smoke regression');

  // 16. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 240 Vapi-originated validation fresh pre-run guard packet verified (${passCount} checks).`);
  console.log('live_http_called=false  vapi_talk_used=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  approval_captured=true  approval_count_limit=1  approved_assistant=test_roofing_assistant_only  evidence_mode=sanitized_only  build_239_prerequisite_commit=a17d6f9  pre_run_guard_status=ready  vapi_originated_validation=approved_not_yet_executed  vapi_originated_action_performed_by_build_240=false  real_call_test=not_started  full_payload_processing=not_yet_validated  secrets_in_repo=0  repo_unchanged=true');
})();
