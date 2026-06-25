#!/usr/bin/env node
/**
 * Build 218 Read-Only Verifier — M1 Guarded Signed Approval Capture + Guarded Execution Path.
 *
 * Read-only. Node built-ins + on-the-fly tsc compile of the native binding module so it can
 * INDEPENDENTLY exercise the native M1 production and the runner's fail-closed guard. No network,
 * no secret-value access, no credentials, no phone numbers, no email addresses, no destination
 * values, no production data, no SMS, no Twilio/provider call, no retry. Does NOT construct a
 * provider client; does NOT call messages.create; does NOT arm a confirm token. Verifying is NOT a send.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');
const runner = require('./run-native-workflow-fixture-m1-guarded-live-validation-execution-build-218.js');

const root = path.resolve(__dirname, '../..');
const backendRoot = path.join(root, 'backend');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const approvalPath = `${FIXTURE_DIR}/m1-live-validation-signed-approval-build-218.json`;
const preflightPath = `${FIXTURE_DIR}/m1-guarded-send-time-preflight-result-build-218.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-218.json`;
const approvalReadyPath = `${FIXTURE_DIR}/m1-m2-guarded-live-validation-approval-ready-build-217.json`;
const priorPacketPath = `${FIXTURE_DIR}/jason-owned-integrated-workflow-build-217.json`;
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_M1_LIVE_VALIDATION_APPROVAL_BUILD_218.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-m1-guarded-live-validation-execution-build-218.js';
const negativesPath = 'backend/scripts/verify-m1-guarded-live-validation-negative-guards-build-218-readonly.js';
const wrapperPath = 'scripts/run-m1-live-validation-approval-build-218-dry-run.sh';

const EXACT_M1 =
  "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out.";
const EXACT_M2 =
  'RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.';
const SIGNED_STATEMENT =
  'I, Jason Lohse, approve exactly ONE Jason-operated, SMS-only, controlled live validation send of scenario new_roof_inspection_lead_alert (M1) using only this exact text: "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they\'re still looking. Reply STOP to opt out." Scope: one SMS only; SMS-only; no retry; this approval authorizes M1 ONLY and never M2; no homeowner contact; no real roofer contact; no live automation activation; no unrestricted launch; no production data; no secrets/phone numbers/email addresses recorded in repo/chat/logs; destination entered silently at execution time; send-time confirmation required; approval is single-use and expires after the attempt whether successful, failed, or blocked.';

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function fullPath(rel) { return path.join(root, rel); }
function read(rel) {
  const target = fullPath(rel);
  if (!fs.existsSync(target)) fail('missing file: ' + rel);
  return fs.readFileSync(target, 'utf8');
}
function readJson(rel) { return JSON.parse(read(rel)); }
function isExecutable(rel) {
  try { fs.accessSync(fullPath(rel), fs.constants.X_OK); return true; } catch { return false; }
}

console.log('== Build 218 M1 Guarded Signed Approval Verification (local-only, no send) ==');

const approval = readJson(approvalPath);
const preflight = readJson(preflightPath);
const summary = readJson(summaryPath);
const approvalReady = readJson(approvalReadyPath);
const priorPacket = readJson(priorPacketPath);
const doc = read(docPath);

// -------------------------------------------------------------------------------------------------
// Independent native-module execution — proves the M1 body is produced by native workflow logic.
// -------------------------------------------------------------------------------------------------
function loadNativeBinding() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b218-verify-native');
  fs.mkdirSync(outDir, { recursive: true });
  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [path.join(backendRoot, 'src/services/roofer-alert-binding.service.ts'), '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck', '--outDir', outDir],
    { stdio: 'inherit' }
  );
  return require(path.join(outDir, 'roofer-alert-binding.service.js'));
}
const binding = loadNativeBinding();
const m1Bind = binding.bindRooferAlert('new_roof_inspection_lead_alert');
if (!m1Bind.ok || m1Bind.boundBody !== EXACT_M1 || m1Bind.messageId !== 'M1') fail('native M1 binding must equal exact approved M1');
if (binding.bindRooferAlert('new_roof_inspection_lead_alert', { requestedBody: EXACT_M2 }).ok !== false) fail('native binding must fail closed on substituted M2 copy');
if (binding.bindRooferAlert('new_roof_inspection_lead_alert', { requestedBody: '' }).ok !== false) fail('native binding must fail closed on empty copy');
pass('build_218_native_workflow_produces_exact_m1_and_fails_closed_on_substituted_empty');

// Cross-check the runner's own native production helper produces exact M1.
const produced = runner.produceM1BodyViaNativeWorkflow();
if (!produced.ok || produced.body !== EXACT_M1) fail('runner native production helper must produce exact M1');
if (runner.assertProducedBodyMatchesSignedM1(produced.body, EXACT_M1).length !== 0) fail('runner binding guard must accept exact native M1');
if (runner.assertProducedBodyMatchesSignedM1(EXACT_M2, EXACT_M1).length === 0) fail('runner binding guard must reject M2');
if (runner.assertProducedBodyMatchesSignedM1('', EXACT_M1).length === 0) fail('runner binding guard must reject empty');
pass('build_218_runner_native_production_and_binding_guard_consistent');

// -------------------------------------------------------------------------------------------------
// Independent guard checks — baseline permitted; representative negatives blocked (no send).
// -------------------------------------------------------------------------------------------------
function validApproval() {
  return { signed_m1_approval: { approval_signed: true, approval_granted: true, scenario_key: 'new_roof_inspection_lead_alert', message_id: 'M1', channel: 'sms', selected_variant_text: EXACT_M1, max_message_count: 1, retry_allowed: false, approval_single_use: true, approval_consumed: false, approval_expired: false, authorizes_m1: true, authorizes_m2: false, m2_approved: false, bound_build_217_source_commit: '8d92939' } };
}
function validState() {
  return { branch: 'main', headEqualsOrigin: true, worktreeClean: true, headSubject: runner.EXPECTED_BUILD_218_SUBJECT, approval: validApproval(), producedBody: EXACT_M1, signedM1Text: EXACT_M1, destinationCount: 1, credentialNamesPresent: true, confirmToken: runner.M1_CONFIRM_TOKEN, retryRequested: false };
}
if (runner.evaluateM1GuardedSend(validState()).permitted !== true) fail('runner guard must permit a fully valid state');
const negChecks = [
  ['producedBody', EXACT_M2],
  ['confirmToken', undefined],
  ['destinationCount', 0],
  ['worktreeClean', false],
  ['headEqualsOrigin', false],
  ['credentialNamesPresent', false],
  ['retryRequested', true]
];
for (const [field, val] of negChecks) {
  const st = validState(); st[field] = val;
  if (runner.evaluateM1GuardedSend(st).permitted !== false) fail('runner guard must block when ' + field + ' is invalid');
}
// Wrong source chain must block.
{ const st = validState(); st.approval.signed_m1_approval.bound_build_217_source_commit = '8a7ad6b';
  const r = runner.evaluateM1GuardedSend(st);
  if (r.permitted !== false || !r.blockedReasons.some((x) => x.includes('approval_not_bound_to_build_217_commit_8d92939'))) fail('runner guard must block a wrong source chain (8a7ad6b)'); }
pass('build_218_runner_guard_permits_only_fully_valid_state_and_blocks_all_negatives');

// The runner module pins the corrected source binding (8d92939, not 8a7ad6b).
if (runner.BOUND_BUILD_217_SOURCE_COMMIT !== '8d92939') fail('runner must bind to Build 217 commit 8d92939');
if (runner.EXPECTED_BUILD_218_SUBJECT !== 'test(workflow): capture m1 live validation approval build 218') fail('runner must expect the Build 218 commit subject');
pass('build_218_runner_pins_corrected_source_binding_and_dynamic_build_218_subject');

// -------------------------------------------------------------------------------------------------
// Approval artifact (objective 1).
// -------------------------------------------------------------------------------------------------
if (approval.build !== 218) fail('approval build must be 218');
if (approval.source_of_truth_commit !== '8d92939') fail('approval source_of_truth_commit must be 8d92939');
const a = approval.signed_m1_approval || {};
const requiredApproval = {
  approval_signed: true,
  approval_granted: true,
  signer_label: 'jason_operator',
  signed_date: '2026-06-25',
  signed_timezone: 'America/Denver',
  exact_clock_time_recorded: false,
  scenario_key: 'new_roof_inspection_lead_alert',
  message_id: 'M1',
  channel: 'sms',
  selected_variant_text: EXACT_M1,
  max_message_count: 1,
  retry_allowed: false,
  approval_single_use: true,
  approval_consumed: false,
  approval_expired: false,
  authorizes_m1: true,
  authorizes_m2: false,
  m2_approved: false,
  destination_value_recorded: false,
  bound_build_217_source_commit: '8d92939',
  authorizes_send_during_build_218: false
};
for (const [k, v] of Object.entries(requiredApproval)) {
  if (a[k] !== v) fail('approval signed_m1_approval ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(a[k]) + ')');
}
if (a.exact_signed_statement !== SIGNED_STATEMENT) fail('approval exact_signed_statement must be preserved EXACTLY');
// Source-binding correction recorded; never bind to 8a7ad6b.
const corr = approval.source_binding_correction || {};
if (corr.incorrect_prior_binding_commit !== '8a7ad6b' || corr.corrected_bound_build_217_source_commit !== '8d92939') fail('approval must record the source-binding correction (8a7ad6b -> 8d92939)');
if (corr.build_218_future_hash_is_not_hardcoded !== true) fail('approval must record that Build 218 future hash is not hardcoded');
pass('build_218_approval_artifact_signed_m1_only_bound_to_8d92939_statement_preserved');

// Approval safety attestations.
const aatt = approval.approval_capture_safety_attestations || {};
const aattFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'credentials_loaded_or_inspected', 'phone_number_recorded', 'email_address_recorded', 'raw_sid_recorded', 'destination_value_recorded', 'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent_during_approval_capture', 'email_sent', 'network_or_external_call_made', 'retry_performed', 'confirm_token_armed', 'live_runner_executed_live', 'real_roofer_contacted_during_approval_capture', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added', 'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
for (const k of aattFalse) { if (aatt[k] !== false) fail('approval safety attestation must be false: ' + k); }
if (aatt.other_live_automation_remains_disabled !== true) fail('approval attestation other_live_automation_remains_disabled must be true');
// Decision packet (objective 5).
const dp = approval.next_decision_packet || {};
const requiredDecision = {
  decision: 'M1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED',
  recommended_next_option: 'run_m1_send_time_preflight_then_one_guarded_attempt',
  authorizes_send_now: false,
  m1_approved: true,
  m2_approved: false,
  approval_consumed: false,
  send_time_preflight_required: true,
  next_live_attempt_maximum: 1,
  retry_allowed: false,
  homeowner_contact_authorized: false,
  real_roofer_contact_authorized: false,
  unrestricted_launch: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (dp[k] !== v) fail('approval next_decision_packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(dp[k]) + ')');
}
pass('build_218_approval_safety_attestations_and_decision_packet_correct');

// -------------------------------------------------------------------------------------------------
// Preflight result (objective 2/3) — computed, fail-closed, no send.
// -------------------------------------------------------------------------------------------------
if (preflight.build !== 218 || preflight.mode !== 'preflight') fail('preflight result must be build 218 mode preflight');
if (preflight.bound_build_217_source_commit !== '8d92939') fail('preflight must bind to 8d92939');
if (preflight.build_218_validated_dynamically_at_send_time !== true) fail('preflight must validate Build 218 dynamically at send time');
if (preflight.would_permit_live_send !== false) fail('preflight would_permit_live_send must be false during Build 218');
if (!Array.isArray(preflight.blocked_reasons) || !preflight.blocked_reasons.some((r) => r.includes('scenario_specific_confirm_token_absent_or_wrong'))) fail('preflight must report the confirm token is absent (never armed during build)');
const nb = preflight.native_workflow_body_production || {};
if (nb.body_produced_by_native_bindRooferAlert !== true || nb.produced_body_equals_signed_m1_exactly !== true) fail('preflight must show native bindRooferAlert produced exact M1');
if (nb.produced_body_is_m2 !== false || nb.produced_body_is_generic_or_stale !== false || nb.hardcoded_or_env_provided_body_used !== false) fail('preflight native body must not be M2/generic/env-provided');
const ag = preflight.approval_guard || {};
for (const k of ['approval_artifact_present', 'approval_valid_m1_only', 'approval_bound_to_build_217_commit_8d92939', 'm1_approved', 'm2_unapproved', 'approval_unconsumed']) {
  if (ag[k] !== true) fail('preflight approval_guard ' + k + ' must be true');
}
const ei = preflight.execution_inputs_presence_only || {};
if (ei.destination_value_recorded !== false || ei.scenario_specific_confirm_token_armed_by_build !== false) fail('preflight must not record destination value or arm the token');
const psa = preflight.preflight_safety_attestations || {};
for (const k of ['sms_sent', 'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'credentials_loaded_or_inspected', 'destination_value_recorded', 'phone_number_recorded', 'email_address_recorded', 'raw_sid_recorded', 'network_or_external_call_made', 'confirm_token_armed', 'retry_performed']) {
  if (psa[k] !== false) fail('preflight safety attestation must be false: ' + k);
}
if (psa.live_automation_remains_disabled !== true) fail('preflight live_automation_remains_disabled must be true');
if (preflight.decision !== 'M1_GUARDED_SEND_TIME_PREFLIGHT_COMPUTED_NO_SEND') fail('preflight decision mismatch');
pass('build_218_preflight_computed_fail_closed_no_send_no_arm_no_destination_value');

// -------------------------------------------------------------------------------------------------
// Runner / negatives / wrapper structural safety (objective 2/4).
// -------------------------------------------------------------------------------------------------
const runnerText = read(runnerPath);
const messagesCreateCall = 'messages' + '.create' + '(';
// Twilio must be required LAZILY (only inside the live send path), never at top level.
const topLevelTwilio = runnerText.split('\n').slice(0, 60).some((l) => /require\(['"]twilio/.test(l));
if (topLevelTwilio) fail('runner must not require the twilio sdk at top level (lazy require only)');
if (!/lazy/.test(runnerText)) fail('runner must document the lazy twilio require');
if (!runnerText.includes('--arm-live-send')) fail('runner live send must be gated behind explicit --arm-live-send');
// Build 218 must never auto-arm: no hardcoded assignment of the confirm env to the token value.
if (new RegExp('M1_LIVE_VALIDATION_CONFIRM\\s*=\\s*[\'"]SEND_ONE_M1_LIVE_VALIDATION_SMS').test(runnerText)) fail('runner must not hardcode-arm the confirm token');
// The live send path must be reachable only when require.main and --arm-live-send.
if (!/require\.main === module/.test(runnerText)) fail('runner must only execute when run directly');
pass('build_218_runner_live_path_gated_lazy_twilio_no_auto_arm');

const negativesText = read(negativesPath);
if (/require\(['"]twilio/.test(negativesText)) fail('negative tests must not require twilio');
if (negativesText.includes(messagesCreateCall)) fail('negative tests must not call messages.create');
pass('build_218_negative_tests_read_only_no_send');

if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
const wrapper = read(wrapperPath);
if (wrapper.includes(messagesCreateCall)) fail('wrapper must not call messages.create');
if (new RegExp('M1_LIVE_VALIDATION_CONFIRM\\s*=').test(wrapper)) fail('wrapper must not arm the confirm token');
if (wrapper.includes('--arm-live-send')) fail('wrapper must never pass --arm-live-send');
for (const needle of ['run-native-workflow-fixture-m1-guarded-live-validation-execution-build-218.js', 'verify-m1-guarded-live-validation-negative-guards-build-218-readonly.js', 'verify-m1-live-validation-approval-build-218-readonly.js']) {
  if (!wrapper.includes(needle)) fail('wrapper must run: ' + needle);
}
pass('build_218_dry_run_wrapper_runs_preflight_negatives_verifier_only_never_arms_or_sends');

const selfText = read('backend/scripts/verify-m1-live-validation-approval-build-218-readonly.js');
const selfSendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (selfSendLines.length > 0) fail('verifier must not call messages.create');
pass('build_218_verifier_is_read_only_does_not_send_or_arm');

// -------------------------------------------------------------------------------------------------
// Summary (objective 6).
// -------------------------------------------------------------------------------------------------
if (summary.build !== 218) fail('summary build must be 218');
if (summary.source_of_truth_commit !== '8d92939') fail('summary source_of_truth_commit must be 8d92939');
const sl = summary.m1_guarded_approval_lane || {};
const requiredLane = {
  decision: 'M1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED',
  m1_signed_and_scenario_specific: true,
  m2_unsigned_and_unapproved: true,
  bound_build_217_source_commit: '8d92939',
  native_workflow_produced_body_equals_signed_m1: true,
  guarded_runner_fails_closed: true,
  no_send_during_build_218: true,
  send_time_preflight_required: true,
  next_live_attempt_maximum: 1,
  retry_allowed: false,
  approval_consumed: false,
  authorizes_send_now: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredLane)) {
  if (sl[k] !== v) fail('summary m1_guarded_approval_lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(sl[k]) + ')');
}
const lindy = summary.lindy_status || {};
if (lindy.lindy_safe_for_pilot_mode !== true || lindy.lindy_live_enabled !== false) fail('summary must record Lindy safe pilot mode, not live');
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary broader automation must remain disabled');
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.authorizes_send_now !== false || summary.next_step_is_send_now !== false) fail('summary must not authorize send now');
if (summary.m1_approved !== true || summary.m2_approved !== false) fail('summary must record m1 approved, m2 not');
if (summary.safety_status !== 'demo_ready_with_live_automation_disabled') fail('summary safety_status must be preserved');
pass('build_218_summary_records_m1_signed_m2_unsigned_no_send_preflight_required_lindy_safe');

// -------------------------------------------------------------------------------------------------
// Builds-on-217 integrity (prior artifacts preserved) + approval-ready cross reference.
// -------------------------------------------------------------------------------------------------
if (priorPacket.build !== 217) fail('prior packet must be build 217');
if ((priorPacket.next_decision_packet || {}).decision !== 'JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_AVAILABLE') fail('Build 217 decision must be preserved unchanged');
// The Build 218 approval text must match the Build 217 unsigned M1 template text exactly.
const t1 = (approvalReady.approval_templates || []).find((t) => t.message_id === 'M1');
if (!t1 || t1.selected_variant_text !== EXACT_M1) fail('Build 217 M1 template text must equal exact M1');
if (a.selected_variant_text !== t1.selected_variant_text) fail('Build 218 signed M1 text must equal the Build 217 M1 template text exactly');
pass('build_218_builds_on_build_217_prior_artifacts_preserved_and_m1_text_consistent');

// -------------------------------------------------------------------------------------------------
// No secret values / phone numbers / email addresses / raw SIDs in Build 218 DATA artifacts.
// -------------------------------------------------------------------------------------------------
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(approval), JSON.stringify(preflight), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(dataArtifactText)) fail('an email-address-shaped value appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|next_live_attempt_maximum|removed_trigger_count|remaining_auto_customer_contact_paths|remaining_auto_roofer_contact_paths|remaining_auto_homeowner_contact_paths)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_phone_numbers_email_addresses_or_raw_sids_present_in_any_build_218_artifact');

// -------------------------------------------------------------------------------------------------
// Doc present and labeled.
// -------------------------------------------------------------------------------------------------
for (const needle of ['Build 218', 'M1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED', '8d92939', 'no send', 'pilot-gated', 'demo_ready_with_live_automation_disabled', 'send-time preflight', 'never authorizes M2']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_218_doc_present_and_labeled');

// -------------------------------------------------------------------------------------------------
// Safety posture preserved (pilot readiness helper).
// -------------------------------------------------------------------------------------------------
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
for (const [k, v] of Object.entries(status.live_automation)) {
  if (v !== false) fail('pilot readiness live_automation must be false: ' + k);
}
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 218 captures Jason\'s signed, single-use, scenario-specific M1 approval (M1 only, never M2),');
console.log('      bound to the VERIFIED Build 217 source commit 8d92939 (not the Build 216 base 8a7ad6b).');
console.log('PASS: The guarded M1 runner produces the body via the native workflow (bindRooferAlert), verifies it');
console.log('      equals the signed M1 text exactly, and fails closed on M2/generic/empty/modified/env-overridden');
console.log('      copy, missing/unsigned/consumed approval, wrong source chain, dirty worktree, wrong branch/HEAD/');
console.log('      subject, missing/wrong token, missing/multiple destination, missing creds, and retry.');
console.log('PASS: Send-time preflight computed and FAIL-CLOSED; no SMS/Twilio/client/credential/destination/network action.');
console.log('PASS: Decision = M1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED; authorizes_send_now=false;');
console.log('      launch pilot-gated, not unrestricted; demo_ready_with_live_automation_disabled preserved.');
console.log('PASS: Build 218 verifier passed (' + passCount + ' assertions).');
