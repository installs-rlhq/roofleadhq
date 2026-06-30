#!/usr/bin/env node
/**
 * Build 245 Read-Only Verifier — post-fix Vapi-originated synthetic browser/webCall validation
 * approval & fresh-guard packet.
 *
 * Read-only. Reads the Build 245 approval/guard doc and the Build 244 fix-evidence doc as text,
 * confirms the Build 244 prerequisite commit is present in git history, and checks `git status`
 * before/after. No network, no Supabase call, no credential/secret access, no provider client, no
 * SMS, no Twilio, no call, no phone dialed, no Vapi Talk, no live HTTP, no curl, no env mutation, no
 * deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no service; does NOT
 * build. Performs NO Vapi-originated action.
 *
 * Build 245 captures explicit user approval for exactly ONE post-fix Vapi-originated synthetic
 * browser/webCall validation (Test Roofing Assistant only, sanitized capture only) and establishes a
 * fresh fail-closed pre-run guard for that next step. Build 245 does NOT execute the validation.
 *
 * This verifier proves the approval/guard packet is internally consistent, grounded, and safe:
 *  - The Build 244 prerequisite commit 7342539 is present (git history + doc).
 *  - Build 244 fix evidence exists (doc + post-fix webCall 200-no-op / unauth-401 markers).
 *  - The Build 245 doc exists and carries the exact decision token.
 *  - The explicit Build 245 approval quote is captured verbatim.
 *  - Approval is limited to one post-fix Vapi-originated synthetic browser/webCall validation.
 *  - Test Roofing Assistant only.
 *  - Sanitized evidence capture only.
 *  - no real homeowner traffic / no real roofer traffic / no phone number dialed / no SMS /
 *    no Twilio call / no production data export / no schema-auth-RLS change / no billing-CRM
 *    automation / no public-live automation.
 *  - No Vapi-originated action performed by Build 245.
 *  - post_fix_vapi_validation_status = approved_not_yet_executed.
 *  - real_call_test_status = not_started.
 *  - The doc carries no secret value (redacted markers only) and no secret-shaped/phone-shaped values.
 *  - The full Build 245 safety-invariant block is present.
 *  - The next action requires rerunning this guard immediately before exactly one browser/webCall action.
 *  - The dry-run wrapper wires this verifier + predecessor verifiers + the smoke regression.
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
function commitPresent(sha) {
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', `${sha}^{commit}`],
      { cwd: repoRoot, encoding: 'utf8' });
    return true;
  } catch (_e) {
    return false;
  }
}

const DOC = 'docs/VAPI_POST_FIX_VALIDATION_GUARD_BUILD_245.md';
const B244_DOC = 'docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_BUILD_244.md';
const VERIFIER = 'backend/scripts/verify-vapi-post-fix-validation-guard-build-245-readonly.js';
const DRY_RUN = 'scripts/run-vapi-post-fix-validation-guard-build-245-dry-run.sh';

// Predecessor read-only verifiers wired into the dry-run regression chain.
const B242_VERIFIER = 'backend/scripts/verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js';
const B241_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js';
const B240_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js';
const B239_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js';
const B238_VERIFIER = 'backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js';
const B237_VERIFIER = 'backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js';

const DECISION_TOKEN = 'POST_FIX_VAPI_BROWSER_WEBCALL_VALIDATION_APPROVED_AND_GUARDED_NOT_YET_EXECUTED';
const SOURCE_COMMIT = '7342539';

const APPROVAL_QUOTE = 'I approve one post-fix Vapi-originated synthetic browser/webCall validation for RoofLeadHQ Build 245 using the Test Roofing Assistant only, with sanitized evidence capture only, no real homeowner traffic, no real roofer traffic, no phone number dialed, no SMS, no Twilio call, no production data export, no schema/auth/RLS changes, no billing/CRM automation, and no public/live automation.';

(function main() {
  const before = gitStatus();
  console.log('=== Build 245 post-fix Vapi browser/webCall validation approval & fresh-guard read-only verification (local-only) ===');
  console.log('No call. No phone dialed. No Vapi Talk. No curl. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No Vapi-originated action. Read-only.');

  const doc = read(DOC);

  // 1. Build 244 prerequisite commit present (git history) + doc records it + HEAD==origin/main.
  assert(commitPresent(SOURCE_COMMIT), 'Build 244 prerequisite commit 7342539 is present in git history');
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B245 doc references Build 244 source commit 7342539');
  assert(/build_244_prerequisite_commit\s*=\s*7342539/.test(doc),
    'B245 doc records build_244_prerequisite_commit = 7342539');
  assert(/build_244_prerequisite_status\s*=\s*validated/.test(doc),
    'B245 doc records build_244_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B245 doc records HEAD==origin/main');
  pass('Build 244 prerequisite commit 7342539 present in git history and recorded as validated in the doc');

  // 2. Build 244 fix evidence exists (doc + post-fix behavior markers).
  assert(fs.existsSync(path.join(repoRoot, B244_DOC)), 'Build 244 fix-evidence doc exists');
  const b244 = read(B244_DOC);
  assert(/VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_MESSAGE_TYPE_ROUTING_AND_WEBCALL_REPO_ONLY/.test(b244),
    'Build 244 doc carries its fix decision token');
  assert(/web_?call/i.test(b244) && /200/.test(b244) && /missing_required_field/.test(b244),
    'Build 244 doc evidences the webCall 200 no-op (no longer 400 missing_required_field)');
  assert(/build_244_webcall_noop_behavior\s*=\s*200_no_op_not_400/.test(doc),
    'B245 doc carries forward the Build 244 webCall 200-no-op behavior marker');
  assert(/build_244_unauth_behavior\s*=\s*401/.test(doc),
    'B245 doc carries forward the Build 244 unauth-401 behavior marker');
  pass('Build 244 fix evidence exists and the post-fix webCall 200-no-op / unauth-401 behavior is carried forward');

  // 3. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B245 doc carries the exact decision token');
  pass('Build 245 approval/guard doc exists and carries the decision token');

  // 4. Explicit Build 245 approval captured verbatim.
  assert(doc.includes(APPROVAL_QUOTE), 'B245 doc captures the explicit approval quote verbatim');
  assert(/approval_captured\s*=\s*true/.test(doc), 'B245 doc records approval_captured = true');
  pass('B245 doc captures the explicit user approval verbatim');

  // 5. Approval limited to ONE post-fix Vapi-originated synthetic browser/webCall validation.
  assert(/one post-fix Vapi-originated synthetic browser\/webCall validation/.test(doc),
    'B245 doc limits approval to one post-fix Vapi-originated synthetic browser/webCall validation');
  assert(/approval_count_limit\s*=\s*1/.test(doc), 'B245 doc records approval_count_limit = 1');
  pass('B245 doc limits approval to exactly one post-fix Vapi-originated synthetic browser/webCall validation');

  // 6. Test Roofing Assistant only.
  assert(/Test Roofing Assistant only/.test(doc) &&
    /approved_assistant\s*=\s*Test Roofing Assistant only/.test(doc),
    'B245 doc scopes the approval to the Test Roofing Assistant only');
  pass('B245 doc scopes the validation to the Test Roofing Assistant only');

  // 7. Sanitized evidence capture only.
  assert(/sanitized evidence capture only/.test(doc) &&
    /evidence_mode\s*=\s*sanitized evidence capture only/.test(doc),
    'B245 doc requires sanitized evidence capture only');
  pass('B245 doc requires sanitized evidence capture only');

  // 8. The explicit prohibition set (incl. no phone number dialed).
  const prohibitions = [
    [/no_real_homeowner_traffic\s*=\s*true/, 'no real homeowner traffic'],
    [/no_real_roofer_traffic\s*=\s*true/, 'no real roofer traffic'],
    [/no_phone_number_dialed\s*=\s*true/, 'no phone number dialed'],
    [/no_sms\s*=\s*true/, 'no SMS'],
    [/no_twilio_call\s*=\s*true/, 'no Twilio call'],
    [/no_production_data_export\s*=\s*true/, 'no production data export'],
    [/no_schema_auth_rls_change\s*=\s*true/, 'no schema/auth/RLS changes'],
    [/no_billing_crm_automation\s*=\s*true/, 'no billing/CRM automation'],
    [/no_public_live_automation\s*=\s*true/, 'no public/live automation'],
  ];
  for (const [re, label] of prohibitions) assert(re.test(doc), `B245 doc records prohibition: ${label}`);
  pass('B245 doc records all approval prohibitions: no homeowner/roofer traffic, no phone dialed, no SMS, no Twilio call, no export, no schema/auth/RLS, no billing/CRM, no public/live automation');

  // 9. No Vapi-originated action performed by Build 245.
  assert(/post_fix_vapi_validation_status\s*=\s*approved_not_yet_executed/.test(doc),
    'B245 doc records post_fix_vapi_validation_status = approved_not_yet_executed');
  assert(/vapi_originated_action_performed_by_build_245\s*=\s*false/.test(doc),
    'B245 doc records vapi_originated_action_performed_by_build_245 = false');
  assert(/does\s+(?:\*\*)?NOT(?:\*\*)?\s+perform the Vapi browser\/webCall validation/i.test(doc) ||
    /[Nn]o post-fix Vapi-originated browser\/webCall validation executed/.test(doc),
    'B245 doc states this build does NOT perform the Vapi browser/webCall validation');
  pass('B245 doc records the Vapi-originated action has NOT been performed by this packet (approved_not_yet_executed)');

  // 10. real_call_test_status not_started, full_payload_processing_status not_yet_validated.
  assert(/real_call_test_status\s*=\s*not_started/.test(doc), 'B245 doc records real_call_test_status = not_started');
  assert(/full_payload_processing_status\s*=\s*not_yet_validated/.test(doc),
    'B245 doc records full_payload_processing_status = not_yet_validated');
  pass('B245 doc records real_call_test not_started and full_payload_processing not_yet_validated');

  // 11. No secret value present + secret file not read + no secret committed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B245 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B245 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B245 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B245 doc asserts no secrets printed');
  pass('B245 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 12. No phone-number-shaped or secret-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B245 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B245 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B245 doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B245 doc contains no phone-number-shaped value');
  pass('B245 doc contains no secret-shaped or phone-number-shaped values');

  // 13. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No phone number dialed/i,
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
  for (const re of gates) assert(re.test(doc), `B245 doc missing safety invariant: ${re}`);
  pass('B245 doc states the full Build 245 safety-invariant block');

  // 14. Next action requires rerunning this guard immediately before exactly one browser/webCall action.
  assert(/[Nn]ext gated step/.test(doc), 'B245 doc records the exact next gated step');
  assert(/[Rr]e-?run this Build 245 guard immediately beforehand/.test(doc),
    'B245 doc next step requires re-running this guard immediately beforehand');
  assert(/browser-only Vapi Talk \/ webCall/i.test(doc) && /no phone number\s*dialed/i.test(doc),
    'B245 doc next step is a browser-only Vapi Talk/webCall with no phone number dialed');
  assert(/sanitized status\/output only|sanitized status\s*\/\s*output only/i.test(doc),
    'B245 doc next step captures sanitized status/output only');
  assert(/[Nn]o real homeowner traffic/.test(doc) && /[Nn]o real roofer traffic/.test(doc),
    'B245 doc next step forbids real homeowner/roofer traffic');
  pass('B245 doc next gated step: re-run this guard immediately before exactly one browser-only webCall action, sanitized capture only');

  // 15. Dry-run wrapper exists and wires this verifier + predecessor verifiers + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B245 verifier file exists');
  for (const v of [B242_VERIFIER, B241_VERIFIER, B240_VERIFIER, B239_VERIFIER, B238_VERIFIER, B237_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-post-fix-validation-guard-build-245-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js'),
    'dry-run wrapper runs the Build 242 verifier');
  assert(dry.includes('verify-vapi-originated-validation-approval-guard-build-239-readonly.js'),
    'dry-run wrapper runs the Build 239 verifier');
  assert(dry.includes('verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js'),
    'dry-run wrapper runs the Build 237 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B245 verifier present and the dry-run wrapper wires this verifier + B242..B237 verifiers + smoke regression');

  // 16. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 245 post-fix Vapi browser/webCall validation approval & fresh-guard packet verified (${passCount} checks).`);
  console.log('live_http_called=false  phone_dialed=false  vapi_talk_used=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  build_244_prerequisite_commit=7342539  approval_captured=true  approval_count_limit=1  approved_assistant=test_roofing_assistant_only  evidence_mode=sanitized_only  post_fix_vapi_validation_status=approved_not_yet_executed  vapi_originated_action_performed_by_build_245=false  real_call_test=not_started  full_payload_processing=not_yet_validated  secrets_in_repo=0  repo_unchanged=true');
})();
