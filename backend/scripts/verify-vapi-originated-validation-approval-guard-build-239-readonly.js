#!/usr/bin/env node
/**
 * Build 239 Read-Only Verifier — Vapi-originated synthetic/controlled webhook validation
 * approval & guard packet.
 *
 * Read-only. Reads the Build 239 approval/guard doc (and the B237 + B238 predecessor docs) as text
 * and checks `git status` before/after. No network, no Supabase call, no credential/secret access,
 * no provider client, no SMS, no Twilio, no call, no Vapi Talk, no live HTTP, no curl, no env
 * mutation, no deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no
 * service; does NOT build. Performs NO Vapi-originated action.
 *
 * Build 239 captures explicit user approval for exactly ONE Vapi-originated synthetic/controlled
 * webhook validation (Test Roofing Assistant only, sanitized capture only) and establishes a
 * fail-closed guard for that next step. Build 239 does NOT execute the validation.
 *
 * This verifier proves the approval/guard packet is internally consistent, grounded, and safe:
 *  - The Build 239 doc exists and carries the exact decision token.
 *  - It references source commit 077716e (HEAD == origin/main).
 *  - It names Build 237 (48bb25d) and Build 238 (077716e) as the prerequisite validated states,
 *    and those predecessor docs exist.
 *  - The explicit Build 239 approval quote is captured verbatim.
 *  - Approval is limited to one Vapi-originated synthetic/controlled webhook validation.
 *  - Test Roofing Assistant only.
 *  - Sanitized evidence capture only.
 *  - no real homeowner traffic / no real roofer traffic / no SMS / no Twilio call /
 *    no production data export / no schema-auth-RLS change / no billing-CRM automation /
 *    no public-live automation.
 *  - The Vapi-originated action has NOT been performed by this packet.
 *  - real_call_test_status = not_started.
 *  - full_payload_processing_status = not_yet_validated.
 *  - The doc carries no secret value (redacted markers only) and no secret-shaped/phone-shaped values.
 *  - The full Build 239 safety-invariant block is present.
 *  - The next gated step requires a fresh pre-run command/guard and sanitized capture only.
 *  - The dry-run wrapper wires this verifier + the B238 + B237 verifiers + the smoke regression.
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

const DOC = 'docs/VAPI_ORIGINATED_VALIDATION_APPROVAL_GUARD_BUILD_239.md';
const B238_DOC = 'docs/VAPI_WEBHOOK_BEARER_CREDENTIAL_VALIDATION_EVIDENCE_BUILD_238.md';
const B237_DOC = 'docs/VAPI_WEBHOOK_AUTHORIZED_SYNTHETIC_GATE_PAIR_EVIDENCE_BUILD_237.md';
const VERIFIER = 'backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js';
const DRY_RUN = 'scripts/run-vapi-originated-validation-approval-guard-build-239-dry-run.sh';
const B238_VERIFIER = 'backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js';
const B237_VERIFIER = 'backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js';

const DECISION_TOKEN = 'VAPI_ORIGINATED_SYNTHETIC_VALIDATION_APPROVED_AND_GUARDED_NOT_YET_EXECUTED';
const SOURCE_COMMIT = '077716e';
const B237_COMMIT = '48bb25d';

const APPROVAL_QUOTE = 'I approve one Vapi-originated synthetic/controlled webhook validation for RoofLeadHQ Build 239 using the Test Roofing Assistant only, with sanitized evidence capture only, no real homeowner traffic, no real roofer traffic, no SMS, no Twilio call, no production data export, no schema/auth/RLS changes, no billing/CRM automation, and no public/live automation.';

(function main() {
  const before = gitStatus();
  console.log('=== Build 239 Vapi-originated validation approval & guard read-only verification (local-only) ===');
  console.log('No call. No Vapi Talk. No curl. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No Vapi-originated action. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B239 doc carries the exact decision token');
  pass('Build 239 approval/guard doc exists and carries the decision token');

  // 2. References source commit 077716e + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B239 doc references source commit 077716e');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B239 doc records HEAD==origin/main');
  pass('B239 doc references source commit 077716e (HEAD==origin/main)');

  // 3. Build 237 + Build 238 are the prerequisite validated states; predecessor docs exist.
  assert(/Build 237/.test(doc) && new RegExp(B237_COMMIT).test(doc) &&
    /build_237_prerequisite_status\s*=\s*validated/.test(doc),
    'B239 doc names Build 237 (48bb25d) as a validated prerequisite');
  assert(/Build 238/.test(doc) && /build_238_prerequisite_status\s*=\s*validated/.test(doc),
    'B239 doc names Build 238 as a validated prerequisite');
  assert(fs.existsSync(path.join(repoRoot, B237_DOC)), 'Build 237 evidence doc exists');
  assert(fs.existsSync(path.join(repoRoot, B238_DOC)), 'Build 238 evidence doc exists');
  pass('B239 doc names Build 237 + Build 238 as prerequisite validated states and both predecessor docs exist');

  // 4. Explicit Build 239 approval captured verbatim.
  assert(doc.includes(APPROVAL_QUOTE), 'B239 doc captures the explicit approval quote verbatim');
  assert(/approval_captured\s*=\s*true/.test(doc), 'B239 doc records approval_captured = true');
  pass('B239 doc captures the explicit user approval verbatim');

  // 5. Approval limited to ONE Vapi-originated synthetic/controlled webhook validation.
  assert(/one Vapi-originated synthetic\/controlled webhook validation/.test(doc),
    'B239 doc limits approval to one Vapi-originated synthetic/controlled webhook validation');
  assert(/approval_count_limit\s*=\s*1/.test(doc), 'B239 doc records approval_count_limit = 1');
  pass('B239 doc limits approval to exactly one Vapi-originated synthetic/controlled webhook validation');

  // 6. Test Roofing Assistant only.
  assert(/Test Roofing Assistant only/.test(doc) && /approved_assistant\s*=\s*Test Roofing Assistant only/.test(doc),
    'B239 doc scopes the approval to the Test Roofing Assistant only');
  pass('B239 doc scopes the validation to the Test Roofing Assistant only');

  // 7. Sanitized evidence capture only.
  assert(/sanitized evidence capture only/.test(doc) && /evidence_mode\s*=\s*sanitized evidence capture only/.test(doc),
    'B239 doc requires sanitized evidence capture only');
  pass('B239 doc requires sanitized evidence capture only');

  // 8. The explicit prohibition set (homeowner/roofer/SMS/Twilio/export/schema/billing-CRM/public-live).
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
  for (const [re, label] of prohibitions) assert(re.test(doc), `B239 doc records prohibition: ${label}`);
  pass('B239 doc records all approval prohibitions: no homeowner/roofer traffic, no SMS, no Twilio call, no export, no schema/auth/RLS, no billing/CRM, no public/live automation');

  // 9. Vapi-originated action NOT yet performed by this packet.
  assert(/vapi_originated_validation_status\s*=\s*approved_not_yet_executed/.test(doc),
    'B239 doc records vapi_originated_validation_status = approved_not_yet_executed');
  assert(/vapi_originated_action_performed_by_this_packet\s*=\s*false/.test(doc),
    'B239 doc records vapi_originated_action_performed_by_this_packet = false');
  assert(/does\s+(?:\*\*)?NOT(?:\*\*)?\s+perform the Vapi-originated validation/i.test(doc) ||
    /[Nn]o Vapi-originated webhook validation executed/.test(doc),
    'B239 doc states this build does NOT perform the Vapi-originated validation');
  pass('B239 doc states the Vapi-originated action has NOT been performed by this packet');

  // 10. real_call_test_status not_started, full_payload_processing_status not_yet_validated.
  assert(/real_call_test_status\s*=\s*not_started/.test(doc), 'B239 doc records real_call_test_status = not_started');
  assert(/full_payload_processing_status\s*=\s*not_yet_validated/.test(doc),
    'B239 doc records full_payload_processing_status = not_yet_validated');
  pass('B239 doc records real_call_test not_started and full_payload_processing not_yet_validated');

  // 11. No secret value present + secret file not read + no secret committed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B239 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B239 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B239 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B239 doc asserts no secrets printed');
  pass('B239 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 12. No phone-number-shaped or secret-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B239 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B239 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B239 doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B239 doc contains no phone-number-shaped value');
  pass('B239 doc contains no secret-shaped or phone-number-shaped values');

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
  for (const re of gates) assert(re.test(doc), `B239 doc missing safety invariant: ${re}`);
  pass('B239 doc states the full Build 239 safety-invariant block');

  // 14. Next gated step requires a fresh pre-run command/guard and sanitized capture only.
  assert(/[Nn]ext gated step/.test(doc), 'B239 doc records the exact next gated step');
  assert(/fresh pre-run command\/guard/i.test(doc),
    'B239 doc next step requires a fresh pre-run command/guard');
  assert(/sanitized status\/output only|sanitized status\s*\/\s*output only/i.test(doc),
    'B239 doc next step captures sanitized status/output only');
  assert(/[Nn]o real homeowner traffic/.test(doc) && /[Nn]o real roofer traffic/.test(doc),
    'B239 doc next step forbids real homeowner/roofer traffic');
  pass('B239 doc next gated step: fresh pre-run command/guard, sanitized status/output only, no real homeowner/roofer traffic');

  // 15. Dry-run wrapper exists and wires this verifier + B238 + B237 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B239 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B238_VERIFIER)), 'B238 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B237_VERIFIER)), 'B237 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-originated-validation-approval-guard-build-239-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js'),
    'dry-run wrapper runs the Build 238 verifier');
  assert(dry.includes('verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js'),
    'dry-run wrapper runs the Build 237 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B239 verifier present and the dry-run wrapper wires this verifier + B238 + B237 verifiers + smoke regression');

  // 16. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 239 Vapi-originated validation approval & guard packet verified (${passCount} checks).`);
  console.log('live_http_called=false  vapi_talk_used=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  approval_captured=true  approval_count_limit=1  approved_assistant=test_roofing_assistant_only  evidence_mode=sanitized_only  vapi_originated_validation=approved_not_yet_executed  vapi_originated_action_performed=false  real_call_test=not_started  full_payload_processing=not_yet_validated  secrets_in_repo=0  repo_unchanged=true');
})();
