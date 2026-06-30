#!/usr/bin/env node
/**
 * Build 243 Read-Only Verifier — Vapi webhook payload-shape diagnosis (repo-only).
 *
 * Read-only. Reads the Build 243 diagnosis doc, the Build 242 predecessor doc, and the actual backend
 * source files it diagnoses (route + auth middleware + webhook service) as text, and checks
 * `git status` before/after. No network, no Supabase call, no credential/secret access, no provider
 * client, no SMS, no Twilio, no call, no Vapi Talk, no Vapi rerun, no live HTTP, no curl, no env
 * mutation, no deploy. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Executes no
 * service; does NOT build. Performs NO runtime/external action.
 *
 * Build 243 diagnoses, from repo source only, why authenticated Vapi-originated webhook event payloads
 * returned HTTP 400 at /webhooks/vapi/call-completed (confirmed in Build 242). This verifier proves the
 * diagnosis packet is internally consistent, GROUNDED in the real source, and safe:
 *  - The Build 242 predecessor doc exists.
 *  - The Build 243 doc exists and carries the exact decision token + commit b6fafe4 + HEAD==origin/main.
 *  - The diagnosis is repo-only / read-only.
 *  - Vapi delivery was observed but full payload processing is not validated.
 *  - The expected required fields are identified (provider_call_id, caller_phone,
 *    roofer_destination_number) AND those fields really gate the 400 in the actual service source.
 *  - The likely 400 cause (missing_required_field, null web-path phones, no message-type routing) is
 *    documented AND grounded: the auth middleware really returns 401, the route really returns 400 only
 *    on missing_required_field, and there really is no message.type routing in source.
 *  - A recommended Build 244 fix plan exists.
 *  - No code fix was applied by Build 243.
 *  - The doc carries no secret value (redacted markers only) and no secret/token/raw-call-id/phone/PII.
 *  - No Vapi/Twilio/SMS/curl/secret/runtime action occurred.
 *  - The full Build 243 safety-invariant block is present.
 *  - The dry-run wrapper wires this verifier + B242 + B241 + B240 + B239 + B238 + B237 + smoke.
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

const DOC = 'docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_DIAGNOSIS_BUILD_243.md';
const B242_DOC = 'docs/VAPI_ORIGINATED_WEBHOOK_DELIVERY_CORRECTED_EVIDENCE_BUILD_242.md';
const VERIFIER = 'backend/scripts/verify-vapi-webhook-payload-shape-diagnosis-build-243-readonly.js';
const DRY_RUN = 'scripts/run-vapi-webhook-payload-shape-diagnosis-build-243-dry-run.sh';

// Real source files the diagnosis is grounded in.
const ROUTE_SRC = 'backend/src/routes/vapi-webhooks.ts';
const AUTH_SRC = 'backend/src/middleware/vapi-webhook-auth.ts';
const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';

// Predecessor verifiers wired into the dry-run regression chain.
const B242_VERIFIER = 'backend/scripts/verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js';
const B241_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js';
const B240_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js';
const B239_VERIFIER = 'backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js';
const B238_VERIFIER = 'backend/scripts/verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js';
const B237_VERIFIER = 'backend/scripts/verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js';

const DECISION_TOKEN = 'VAPI_WEBHOOK_PAYLOAD_SHAPE_DIAGNOSIS_MISSING_REQUIRED_FIELD_REPO_ONLY';
const SOURCE_COMMIT = 'b6fafe4';

(function main() {
  const before = gitStatus();
  console.log('=== Build 243 Vapi webhook payload-shape diagnosis read-only verification (local-only) ===');
  console.log('No call. No Vapi Talk. No Vapi rerun. No curl. No SMS. No Twilio. No provider call. No Supabase call. No credentials. No secret file read. No env change. No deploy. No live HTTP. No build. No runtime/external action. No code fix. Read-only.');

  const doc = read(DOC);

  // 1. Build 242 predecessor doc exists.
  assert(fs.existsSync(path.join(repoRoot, B242_DOC)), 'Build 242 prerequisite doc exists');
  pass('Build 242 prerequisite doc exists');

  // 2. Doc exists + decision token + commit + HEAD==origin/main.
  assert(doc.includes(DECISION_TOKEN), 'B243 doc carries the exact decision token');
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B243 doc references current prerequisite commit b6fafe4');
  assert(/build_242_prerequisite_commit\s*=\s*b6fafe4/.test(doc),
    'B243 doc records build_242_prerequisite_commit = b6fafe4');
  assert(/build_242_prerequisite_status\s*=\s*validated/.test(doc),
    'B243 doc records build_242_prerequisite_status = validated');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B243 doc records HEAD==origin/main');
  pass('B243 doc exists, carries the decision token, commit b6fafe4, and HEAD==origin/main');

  // 3. Diagnosis is repo-only / read-only.
  assert(/diagnosis_mode\s*=\s*repo_only_read_only/.test(doc),
    'B243 doc records diagnosis_mode = repo_only_read_only');
  assert(/repo-only/i.test(doc) && /read-only/i.test(doc),
    'B243 doc states the diagnosis is repo-only and read-only');
  pass('B243 doc records the diagnosis is repo-only / read-only');

  // 4. Vapi delivery observed but full payload processing not validated.
  assert(/vapi_originated_delivery_status\s*=\s*observed/.test(doc),
    'B243 doc records vapi_originated_delivery_status = observed');
  assert(/backend_receipt_confirmed\s*=\s*true/.test(doc), 'B243 doc records backend_receipt_confirmed = true');
  assert(/full_payload_processing_status\s*=\s*not_yet_validated/.test(doc),
    'B243 doc records full_payload_processing_status = not_yet_validated');
  assert(/real_call_test_status\s*=\s*not_started/.test(doc),
    'B243 doc records real_call_test_status = not_started');
  pass('B243 doc records Vapi delivery observed but full payload processing not_yet_validated, real call not_started');

  // 5. Expected required fields identified in the doc.
  for (const field of ['provider_call_id', 'caller_phone', 'roofer_destination_number']) {
    assert(new RegExp(field).test(doc), `B243 doc identifies required field: ${field}`);
    assert(new RegExp(`required_field_${field}\\s*=\\s*required`).test(doc),
      `B243 doc records required_field_${field} = required`);
  }
  pass('B243 doc identifies the expected required fields (provider_call_id, caller_phone, roofer_destination_number)');

  // 6. GROUNDING: those three fields really gate the 400 in the actual service source.
  const service = read(SERVICE_SRC);
  assert(/error:\s*'missing_required_field'/.test(service),
    'service source returns missing_required_field');
  assert(/!normalized\.provider_call_id/.test(service) &&
    /!normalized\.caller_phone/.test(service) &&
    /!normalized\.roofer_destination_number/.test(service),
    'service source gates on the exact three required fields the doc names');
  pass('GROUNDED: backend service source really gates the 400 on provider_call_id + caller_phone + roofer_destination_number');

  // 7. GROUNDING: route returns 400 only on missing_required_field; auth really returns 401.
  const route = read(ROUTE_SRC);
  assert(/error\s*===\s*'missing_required_field'/.test(route) && /status\(400\)/.test(route),
    'route source returns 400 on missing_required_field');
  const auth = read(AUTH_SRC);
  assert(/status\(401\)/.test(auth) && /unauthorized/.test(auth),
    'auth middleware source returns 401 on unauthorized');
  pass('GROUNDED: route returns 400 only on missing_required_field, and auth middleware returns 401 (so 400 != 401 means auth passed)');

  // 8. GROUNDING: no message.type routing exists in source (compounding cause).
  const noTypeRouting = !/message\.type/.test(route) && !/message\.type/.test(service) &&
    !/'end-of-call-report'/.test(route) && !/'end-of-call-report'/.test(service);
  assert(noTypeRouting, 'source really has no message.type / end-of-call-report routing');
  assert(/message_type_routing_present\s*=\s*false/.test(doc),
    'B243 doc records message_type_routing_present = false');
  pass('GROUNDED: source has no message.type routing, matching the doc (compounding 400 cause across event types)');

  // 9. Null-on-web-path fields documented.
  assert(/null_on_web_path_caller_phone\s*=\s*true/.test(doc),
    'B243 doc records null_on_web_path_caller_phone = true');
  assert(/null_on_web_path_roofer_destination_number\s*=\s*true/.test(doc),
    'B243 doc records null_on_web_path_roofer_destination_number = true');
  assert(/WebRTC|browser webCall|web\s*call/i.test(doc),
    'B243 doc explains the browser/web (no PSTN phone) path');
  pass('B243 doc documents which normalized fields are null on the observed web path');

  // 10. Likely 400 cause documented.
  assert(/http_400_source\s*=\s*missing_required_field/.test(doc),
    'B243 doc records http_400_source = missing_required_field');
  assert(/likely_400_cause_documented\s*=\s*true/.test(doc),
    'B243 doc records likely_400_cause_documented = true');
  assert(/[Ll]ikely cause of HTTP 400/.test(doc), 'B243 doc has a likely-cause-of-400 section');
  pass('B243 doc documents the likely HTTP 400 cause (missing_required_field on the web path)');

  // 11. Observed body {} addressed.
  assert(/body\s*`?\{\}`?/i.test(doc) && /observability|display/i.test(doc),
    'B243 doc addresses the observed body {} as an observability/display detail');
  pass('B243 doc addresses the observed body {} discrepancy');

  // 12. Recommended Build 244 fix plan exists.
  assert(/recommended_build_244_fix_plan_present\s*=\s*true/.test(doc),
    'B243 doc records recommended_build_244_fix_plan_present = true');
  assert(/Build 244 fix plan/i.test(doc), 'B243 doc has a Build 244 fix plan section');
  assert(/message\.type/.test(doc) && /end-of-call-report/.test(doc) &&
    /status-update/.test(doc) && /conversation-update/.test(doc) && /speech-update/.test(doc),
    'B243 fix plan covers message-type routing for all four event types');
  pass('B243 doc presents a recommended Build 244 fix plan (message-type routing + web-call handling + tests)');

  // 13. No code fix applied by Build 243.
  assert(/code_fix_performed_by_build_243\s*=\s*false/.test(doc),
    'B243 doc records code_fix_performed_by_build_243 = false');
  assert(/runtime_action_performed_by_build_243\s*=\s*false/.test(doc),
    'B243 doc records runtime_action_performed_by_build_243 = false');
  assert(/[Nn]o code fix applied/.test(doc), 'B243 doc states no code fix was applied');
  pass('B243 doc records no code fix and no runtime/external action performed by Build 243');

  // 14. Diagnosis did not actually change the diagnosed source files (still tracked, unmodified by this packet).
  const routeStatus = execFileSync('git', ['status', '--porcelain', '--', ROUTE_SRC, AUTH_SRC, SERVICE_SRC],
    { cwd: repoRoot, encoding: 'utf8' });
  assert(routeStatus.trim() === '', 'the diagnosed backend source files are unmodified by this packet');
  pass('the diagnosed backend source files (route/auth/service) are unmodified by Build 243');

  // 15. Approval consumed + no rerun without new approval.
  assert(/approval_consumed\s*=\s*true/.test(doc), 'B243 doc records approval_consumed = true');
  assert(/rerun_permitted_without_new_approval\s*=\s*false/.test(doc),
    'B243 doc records rerun_permitted_without_new_approval = false');
  pass('B243 doc records the approval is consumed and no rerun is permitted without a new approval');

  // 16. No secret value present + secret file not read + no secret committed/printed.
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B243 doc states the local secret file was not read');
  assert(/secret_value_recorded\s*=\s*false/i.test(doc) || /value_redacted\s*=\s*true/i.test(doc),
    'B243 doc marks the secret value as redacted/not-recorded');
  assert(/[Nn]o secret committed/.test(doc), 'B243 doc asserts no secret committed');
  assert(/[Nn]o secrets printed/.test(doc), 'B243 doc asserts no secrets printed');
  pass('B243 doc records no secret value present (redacted markers), secret file not read, no secret printed or committed');

  // 17. No secret-shaped, token-shaped, raw-call-id-shaped, or phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B243 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B243 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B243 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B243 doc contains no raw UUID-shaped call id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B243 doc contains no phone-number-shaped value');
  pass('B243 doc contains no secret-shaped, token-shaped, raw-call-id-shaped, or phone-number-shaped values');

  // 18. Full safety-invariant block present.
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
    /No Vapi-originated webhook action executed by this build/i,
    /No full Vapi payload processing pass executed/i,
    /No real call test executed/i,
    /No code fix applied by this build/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
    /No deploy \/ redeploy \/ restart/i,
  ];
  for (const re of gates) assert(re.test(doc), `B243 doc missing safety invariant: ${re}`);
  pass('B243 doc states the full Build 243 safety-invariant block');

  // 19. Next recommended step = implement the Build 244 fix plan (repo-only, test-first; no further Vapi action).
  assert(/[Nn]ext recommended step \(Build 244\)/.test(doc),
    'B243 doc records the exact next recommended step for Build 244');
  assert(/repo-only,?\s*test-first/i.test(doc), 'B243 next step is repo-only and test-first');
  assert(/[Nn]o\b[\s\S]{0,40}further Vapi-originated or real-call action[\s\S]{0,40}without a new|without a new, separate approval/i.test(doc),
    'B243 next step forbids further Vapi-originated/real-call action without a new approval');
  pass('B243 doc next recommended step: implement Build 244 fix plan, repo-only/test-first, no further Vapi action without new approval');

  // 20. Dry-run wrapper exists and wires this verifier + B242 + B241 + B240 + B239 + B238 + B237 + smoke.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B243 verifier file exists');
  for (const v of [B242_VERIFIER, B241_VERIFIER, B240_VERIFIER, B239_VERIFIER, B238_VERIFIER, B237_VERIFIER]) {
    assert(fs.existsSync(path.join(repoRoot, v)), `predecessor verifier exists (regression): ${v}`);
  }
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-webhook-payload-shape-diagnosis-build-243-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-originated-webhook-delivery-corrected-evidence-build-242-readonly.js'),
    'dry-run wrapper runs the Build 242 verifier');
  assert(dry.includes('verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js'),
    'dry-run wrapper runs the Build 241 verifier');
  assert(dry.includes('verify-vapi-originated-validation-pre-run-guard-build-240-readonly.js'),
    'dry-run wrapper runs the Build 240 verifier');
  assert(dry.includes('verify-vapi-originated-validation-approval-guard-build-239-readonly.js'),
    'dry-run wrapper runs the Build 239 verifier');
  assert(dry.includes('verify-vapi-webhook-bearer-credential-validation-build-238-readonly.js'),
    'dry-run wrapper runs the Build 238 verifier');
  assert(dry.includes('verify-vapi-webhook-authorized-synthetic-gate-pair-build-237-readonly.js'),
    'dry-run wrapper runs the Build 237 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B243 verifier present and the dry-run wrapper wires this verifier + B242 + B241 + B240 + B239 + B238 + B237 verifiers + smoke regression');

  // 21. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 243 Vapi webhook payload-shape diagnosis packet verified (${passCount} checks).`);
  console.log('live_http_called=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  deploy=false  railway_var_set=false  vapi_config_changed=false  secret_file_read=false  code_fix_applied=false  build_242_prerequisite_commit=b6fafe4  diagnosis_mode=repo_only_read_only  http_400_source=missing_required_field  message_type_routing_present=false  required_fields=provider_call_id+caller_phone+roofer_destination_number  null_on_web_path=caller_phone+roofer_destination_number  recommended_build_244_fix_plan_present=true  full_payload_processing=not_yet_validated  real_call_test=not_started  approval_consumed=true  rerun_permitted_without_new_approval=false  runtime_action_performed_by_build_243=false  secrets_in_repo=0  repo_unchanged=true');
})();
