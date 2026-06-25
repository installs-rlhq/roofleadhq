#!/usr/bin/env node
/**
 * Build 217 Read-Only Verifier — Jason-Owned Integrated Local Workflow Validation.
 *
 * Read-only. Node built-ins + on-the-fly tsc compile of the native modules (to a temp dir) so it can
 * INDEPENDENTLY exercise the native binding/recognition logic and confirm the integrated runner's
 * evidence reflects real native execution (not fixture-string comparison). No network, no secret-value
 * access, no credentials, no phone numbers, no email addresses, no production data, no SMS, no email,
 * no Twilio/provider call, no retry. Does NOT construct a provider client; does NOT call messages.create;
 * does NOT arm a confirm token. Verifying this build is NOT a send.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const backendRoot = path.join(root, 'backend');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const packetPath = `${FIXTURE_DIR}/jason-owned-integrated-workflow-build-217.json`;
const evidencePath = `${FIXTURE_DIR}/integrated-workflow-execution-evidence-build-217.json`;
const approvalReadyPath = `${FIXTURE_DIR}/m1-m2-guarded-live-validation-approval-ready-build-217.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-217.json`;
const priorPacketPath = `${FIXTURE_DIR}/jason-owned-workflow-validation-build-216.json`;
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_JASON_OWNED_INTEGRATED_WORKFLOW_BUILD_217.md';
const demoProofPath = 'docs/NATIVE_WORKFLOW_DEMO_PROOF_JASON_OWNED_INTEGRATED_WORKFLOW_BUILD_217.md';
const runnerPath = 'backend/scripts/run-jason-owned-integrated-workflow-build-217.js';
const wrapperPath = 'scripts/run-jason-owned-integrated-workflow-build-217-dry-run.sh';

const EXACT_M1 =
  "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out.";
const EXACT_M2 =
  'RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.';

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

console.log('== Build 217 Jason-Owned Integrated Local Workflow Verification (local-only) ==');

const packet = readJson(packetPath);
const evidence = readJson(evidencePath);
const approvalReady = readJson(approvalReadyPath);
const summary = readJson(summaryPath);
const priorPacket = readJson(priorPacketPath);
const doc = read(docPath);
const demoProof = read(demoProofPath);

// -------------------------------------------------------------------------------------------------
// Independent native-module execution (proves native logic exists and matches the runner's evidence).
// -------------------------------------------------------------------------------------------------
function loadNativeModules() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b217-verify-native');
  fs.mkdirSync(outDir, { recursive: true });
  const files = ['lead-intake-recognition.service.ts', 'roofer-alert-binding.service.ts'].map((f) =>
    path.join(backendRoot, 'src/services', f)
  );
  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [...files, '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck', '--outDir', outDir],
    { stdio: 'inherit' }
  );
  return {
    recognition: require(path.join(outDir, 'lead-intake-recognition.service.js')),
    binding: require(path.join(outDir, 'roofer-alert-binding.service.js'))
  };
}

const native = loadNativeModules();

// Exact binding for M1/M2 via the native module.
const m1Bind = native.binding.bindRooferAlert('new_roof_inspection_lead_alert');
const m2Bind = native.binding.bindRooferAlert('missed_or_slow_lead_follow_up_nudge');
if (!m1Bind.ok || m1Bind.boundBody !== EXACT_M1 || m1Bind.messageId !== 'M1') fail('native M1 binding does not equal exact approved M1');
if (!m2Bind.ok || m2Bind.boundBody !== EXACT_M2 || m2Bind.messageId !== 'M2') fail('native M2 binding does not equal exact approved M2');
// Fail-closed on substituted / empty / wrong-scenario.
if (native.binding.bindRooferAlert('new_roof_inspection_lead_alert', { requestedBody: EXACT_M2 }).ok !== false) fail('native binding must fail closed on substituted (wrong-scenario) copy');
if (native.binding.bindRooferAlert('new_roof_inspection_lead_alert', { requestedBody: '' }).ok !== false) fail('native binding must fail closed on empty copy');
if (native.binding.bindRooferAlert('unknown_scenario_key').ok !== false) fail('native binding must fail closed on unknown scenario');
pass('build_217_native_message_binding_exact_m1_m2_and_fails_closed_on_empty_substituted_wrong_scenario');

// Recognition + routing through the native module.
const recog = native.recognition.recognizeLeadIntake({ issueText: 'New roof inspection request after a storm leak', sourceLabel: 'referral', serviceAreaMatch: true });
if (recog.isRoofInspectionRequest !== true) fail('native recognition must recognize roof-inspection request');
if (recog.routedFor !== 'roof_inspection_follow_up') fail('native routing must route recognized in-area lead for roof-inspection follow-up');
if (recog.normalizedSourceLabel !== 'referral' || recog.sourceLabelRecognized !== true) fail('native routing must retain a recognized source label');
pass('build_217_native_recognition_and_routing_exercised');

// Homeowner-consent block + guarded future M1/M2 fail-closed + isolation.
const home = native.binding.prepareHomeownerOutreach();
if (home.homeownerContactAuthorized !== false || home.status !== 'blocked_approval_required' || home.preparedSend !== null) fail('native homeowner outreach must be blocked / approval-required');
const m1Future = native.binding.prepareGuardedFutureSend('new_roof_inspection_lead_alert', { approval_signed: false, approval_granted: false });
const m2Future = native.binding.prepareGuardedFutureSend('missed_or_slow_lead_follow_up_nudge', { approval_signed: false, approval_granted: false });
if (m1Future.permitted !== false || m2Future.permitted !== false) fail('guarded future M1/M2 must fail closed with unsigned approval');
const signedM2 = { approval_signed: true, approval_granted: true, scenario_key: 'missed_or_slow_lead_follow_up_nudge', selected_variant_text: EXACT_M2, max_message_count: 1, retry_allowed: false, homeowner_contact_authorized: false };
const m2ApprovalVsM1 = native.binding.prepareGuardedFutureSend('new_roof_inspection_lead_alert', signedM2, native.binding.GUARDED_LIVE_CONFIRM_TOKEN);
if (m2ApprovalVsM1.permitted !== false || !m2ApprovalVsM1.blockedReasons.includes('approval_scenario_mismatch')) fail('an M2 approval must never authorize M1 (scenario isolation)');
const m2ApprovalVsM2NoToken = native.binding.prepareGuardedFutureSend('missed_or_slow_lead_follow_up_nudge', signedM2);
if (m2ApprovalVsM2NoToken.permitted !== false || !m2ApprovalVsM2NoToken.blockedReasons.includes('live_confirm_token_absent')) fail('a signed approval must still fail closed without an explicit confirm token');
if (m1Future.noSendPerformed !== true || m1Future.noProviderClientConstructed !== true || m1Future.noCredentialRead !== true) fail('guarded future support must be permission-only (no send / no client / no credential)');
pass('build_217_native_homeowner_block_and_guarded_future_m1_m2_fail_closed_with_scenario_isolation');

// -------------------------------------------------------------------------------------------------
// Packet checks.
// -------------------------------------------------------------------------------------------------
if (packet.build !== 217) fail('packet build must be 217');
if (packet.source_of_truth_commit !== '8a7ad6b') fail('packet source_of_truth_commit must be 8a7ad6b');
const requiredPacketTop = {
  next_step_is_unrestricted_launch: false,
  next_step_is_send_now: false,
  next_live_send_requires_fresh_signed_scenario_specific_approval: true,
  authorizes_send_now: false,
  m1_approved: false,
  m2_approved: false,
  homeowner_contact_authorized: false,
  real_roofer_contact_authorized: false,
  unrestricted_launch: false,
  live_automation_remains_disabled: true,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled',
  safety_status: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredPacketTop)) {
  if (packet[k] !== v) fail('packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(packet[k]) + ')');
}
const decision = packet.next_decision_packet || {};
if (decision.decision !== 'JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_AVAILABLE') fail('packet decision must be the locally-validated decision');
if (decision.recommended_next_option !== 'select_and_sign_separate_m1_and_m2_jason_owned_live_validation_approvals') fail('packet recommended_next_option mismatch');
// Scenario→module map present and exercises native logic.
const concerns = (packet.scenario_to_native_module_map || {}).concerns || {};
for (const needle of ['synthetic_lead_intake', 'roofing_inspection_request_recognition', 'lead_source_and_routing', 'roofer_notification_preparation', 'exact_outbound_message_binding', 'lead_status_and_follow_up_state', 'open_lead_recap_generation', 'homeowner_consent_blocking']) {
  if (typeof concerns[needle] !== 'string' || concerns[needle].length === 0) fail('packet scenario_to_native_module_map must map concern: ' + needle);
}
if ((packet.scenarios || []).length !== 5) fail('packet must list 5 scenarios');
if (packet.exact_message_binding.M1_text !== EXACT_M1) fail('packet M1_text must equal exact approved M1');
if (packet.exact_message_binding.M2_text !== EXACT_M2) fail('packet M2_text must equal exact approved M2');
pass('build_217_packet_decision_scenario_map_and_exact_binding_recorded');

// Packet safety attestations all false (except other_live_automation_remains_disabled=true).
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded', 'email_address_recorded', 'raw_sid_recorded', 'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent', 'email_sent', 'network_or_external_call_made', 'retry_performed', 'confirm_token_armed', 'live_runner_executed_live', 'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added', 'email_call_calendar_automation_added', 'schema_auth_rls_security_changes', 'lindy_live_workflow_execution'];
const att = packet.build_safety_attestations || {};
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('packet build safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('packet attestation other_live_automation_remains_disabled must be true');
pass('build_217_packet_safety_attestations_no_live_action_no_secrets');

// -------------------------------------------------------------------------------------------------
// Evidence checks (the truthful execution evidence; objective 5).
// -------------------------------------------------------------------------------------------------
const requiredEvidence = {
  build: 217,
  local_integrated_runner_executed: true,
  runner_exercises_native_workflow_logic: true,
  fixture_only_validation: false,
  scenario_count: 5,
  required_scenario_count: 3,
  optional_scenario_count: 2,
  required_scenarios_passed: 3,
  optional_scenarios_passed: 2,
  all_required_scenarios_passed: true,
  homeowner_contact_blocked: true,
  routing_result: 'roof_inspection_follow_up'
};
for (const [k, v] of Object.entries(requiredEvidence)) {
  if (evidence[k] !== v) fail('evidence ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(evidence[k]) + ')');
}
if (evidence.message_binding_match.M1 !== true || evidence.message_binding_match.M2 !== true) fail('evidence message_binding_match M1/M2 must be true');
if (typeof evidence.synthetic_open_lead_count !== 'number' || evidence.synthetic_open_lead_count < 0) fail('evidence synthetic_open_lead_count must be a non-negative number');
for (const needle of ['lead-intake-recognition.service', 'roofer-alert-binding.service', 'sms-safety.service', 'sms-dispatcher-planner.service', 'sms-send-intent-planner.service']) {
  if (!(evidence.native_workflow_modules_exercised || []).includes(needle)) fail('evidence native_workflow_modules_exercised must include: ' + needle);
}
// Every scenario ran as native_module_execution (not fixture-only).
for (const s of evidence.expected_actual_match || []) {
  if (s.integration_mode !== 'native_module_execution') fail('every evidence scenario must be native_module_execution: ' + s.scenario_key);
  if (s.required && s.pass !== true) fail('required evidence scenario must pass: ' + s.scenario_key);
}
const esafety = evidence.safety || {};
for (const k of ['live_sms_sent', 'email_sent', 'network_call_made', 'twilio_client_constructed', 'messages_create_called', 'credentials_loaded', 'production_data_used', 'production_records_created', 'raw_destination_values_recorded', 'raw_phone_number_recorded', 'raw_email_address_recorded']) {
  if (esafety[k] !== false) fail('evidence safety must be false: ' + k);
}
if (esafety.live_automation_remains_disabled !== true) fail('evidence safety live_automation_remains_disabled must be true');
const gf = evidence.guarded_future_live_m1_m2_support || {};
if (gf.m1_future_send_permitted !== false || gf.m2_future_send_permitted !== false) fail('evidence guarded future M1/M2 must not be permitted');
if (gf.m2_approval_never_authorizes_m1 !== true || gf.m2_signed_still_requires_confirm_token !== true) fail('evidence guarded future support must prove isolation + token requirement');
if (evidence.decision !== 'JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_AVAILABLE') fail('evidence decision mismatch');
// Cross-check evidence binding equals the independent native binding.
const m1Scenario = (evidence.scenarios || []).find((s) => s.scenario_key === 'new_roof_inspection_lead_alert');
if (!m1Scenario || m1Scenario.actual.message_id !== 'M1' || m1Scenario.actual.binding_matches_approved !== true) fail('evidence M1 scenario must show native M1 binding match');
pass('build_217_execution_evidence_truthful_native_execution_all_required_passed_no_send');

// -------------------------------------------------------------------------------------------------
// Approval-ready artifact (unsigned, distinct M1/M2 templates; objective 4).
// -------------------------------------------------------------------------------------------------
if (approvalReady.status !== 'approval_ready_unsigned_not_approved') fail('approval-ready status must be approval_ready_unsigned_not_approved');
if (approvalReady.authorizes_send_now !== false || approvalReady.m1_approved !== false || approvalReady.m2_approved !== false) fail('approval-ready must authorize nothing');
const templates = approvalReady.approval_templates || [];
if (templates.length !== 2) fail('approval-ready must contain exactly two templates (M1 + M2)');
const t1 = templates.find((t) => t.message_id === 'M1');
const t2 = templates.find((t) => t.message_id === 'M2');
if (!t1 || !t2) fail('approval-ready must contain distinct M1 and M2 templates');
if (t1.scenario_key !== 'new_roof_inspection_lead_alert' || t2.scenario_key !== 'missed_or_slow_lead_follow_up_nudge') fail('approval-ready templates must be scenario-specific');
if (t1.selected_variant_text !== EXACT_M1 || t2.selected_variant_text !== EXACT_M2) fail('approval-ready template text must equal exact approved M1/M2');
for (const t of templates) {
  if (t.approval_signed !== false || t.approval_granted !== false) fail('approval-ready template must be unsigned/ungranted: ' + t.message_id);
  if (t.max_message_count !== 1 || t.retry_allowed !== false || t.homeowner_contact_authorized !== false) fail('approval-ready template constraints mismatch: ' + t.message_id);
}
if (t1.authorizes_m2 !== false) fail('M1 template must not authorize M2');
if (t2.authorizes_m1 !== false) fail('M2 template must not authorize M1');
if ((approvalReady.homeowner_facing_send_template || {}).included !== false) fail('approval-ready must not include a homeowner-facing send template');
pass('build_217_approval_ready_unsigned_distinct_m1_m2_templates_scenario_isolated');

// -------------------------------------------------------------------------------------------------
// Summary (Lindy audit complete + readiness; objective 7).
// -------------------------------------------------------------------------------------------------
if (summary.build !== 217) fail('summary build must be 217');
const lindy = summary.lindy_status || {};
const requiredLindy = {
  lindy_audit_status: 'completed',
  fillout_trigger_1_status: 'removed_from_active_triggers',
  fillout_trigger_2_status: 'removed_from_active_triggers',
  removed_trigger_count: 2,
  daily_brief_remains_enabled: true,
  daily_brief_destination_scope: 'jason_only',
  remaining_auto_customer_contact_paths: 0,
  remaining_auto_roofer_contact_paths: 0,
  remaining_auto_homeowner_contact_paths: 0,
  lindy_pilot_mode: 'safe_internal_assistance_and_jason_only_daily_brief',
  lindy_owns_product_workflow: false,
  lindy_safe_for_pilot_mode: true,
  lindy_live_enabled: false
};
for (const [k, v] of Object.entries(requiredLindy)) {
  if (lindy[k] !== v) fail('summary lindy_status ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(lindy[k]) + ')');
}
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary broader automation must remain disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled', 'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled', 'crm_sync_automation_enabled', 'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
const iLane = (summary.readiness_lanes || {}).jason_owned_integrated_workflow_validation || {};
if (iLane.runner_exercises_native_workflow_logic !== true || iLane.fixture_only_validation !== false) fail('summary integrated lane must record native execution');
if (iLane.all_required_scenarios_passed !== true) fail('summary integrated lane must record all required scenarios passed');
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.authorizes_send_now !== false || summary.next_step_is_send_now !== false) fail('summary must not authorize send now');
if (summary.safety_status !== 'demo_ready_with_live_automation_disabled') fail('summary safety_status must be preserved');
pass('build_217_summary_lindy_audit_complete_triggers_removed_jason_only_brief_readiness_recorded');

// -------------------------------------------------------------------------------------------------
// Builds-on-216 integrity (prior artifacts preserved).
// -------------------------------------------------------------------------------------------------
if (priorPacket.build !== 216) fail('prior packet must be build 216');
if ((priorPacket.next_decision_packet || {}).decision !== 'JASON_OWNED_WORKFLOW_VALIDATION_READY_FOR_APPROVAL') fail('Build 216 decision must be preserved unchanged');
if (packet.prior_build_216_reference.build_216_decision !== 'JASON_OWNED_WORKFLOW_VALIDATION_READY_FOR_APPROVAL') fail('packet must reference Build 216 decision');
pass('build_217_builds_on_build_216_prior_artifacts_preserved');

// -------------------------------------------------------------------------------------------------
// No secret values / phone numbers / email addresses / raw SIDs in Build 217 DATA artifacts.
// -------------------------------------------------------------------------------------------------
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(packet), JSON.stringify(evidence), JSON.stringify(approvalReady), JSON.stringify(summary), doc, demoProof].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(dataArtifactText)) fail('an email-address-shaped value appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|scenario_count|required_scenario_count|optional_scenario_count|required_scenarios_passed|optional_scenarios_passed|synthetic_open_lead_count|removed_trigger_count|remaining_auto_customer_contact_paths|remaining_auto_roofer_contact_paths|remaining_auto_homeowner_contact_paths|max_message_count|monthly_low|monthly_high|setup_fee|trial_days_after_go_live)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_phone_numbers_email_addresses_or_raw_sids_present_in_any_build_217_artifact');

// -------------------------------------------------------------------------------------------------
// Runner + verifier must not send / arm; wrapper runs runner + verifier only.
// -------------------------------------------------------------------------------------------------
const runnerText = read(runnerPath);
const messagesCreateCall = 'messages' + '.create' + '(';
if (/require\(['"]twilio/.test(runnerText)) fail('runner must not require the twilio sdk');
if (runnerText.includes(messagesCreateCall)) fail('runner must not call messages.create');
if (/CONTROLLED_LIVE_SMS_CONFIRM\s*=/.test(runnerText)) fail('runner must not arm a live confirm token');
pass('build_217_runner_does_not_send_or_arm');

const selfText = read('backend/scripts/verify-jason-owned-integrated-workflow-build-217-readonly.js');
if (/require\(['"]twilio/.test(selfText)) fail('verifier must not require the twilio sdk');
const selfSendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall)
  && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (selfSendLines.length > 0) fail('verifier must not call messages.create');
pass('build_217_verifier_is_read_only_does_not_send_or_arm');

if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
const wrapper = read(wrapperPath);
if (wrapper.includes(messagesCreateCall)) fail('wrapper must not call messages.create');
if (/CONTROLLED_LIVE_SMS_CONFIRM\s*=/.test(wrapper)) fail('wrapper must not arm a live confirm token');
if (!wrapper.includes('run-jason-owned-integrated-workflow-build-217.js')) fail('wrapper must run the Build 217 integrated runner');
if (!wrapper.includes('verify-jason-owned-integrated-workflow-build-217-readonly.js')) fail('wrapper must run the Build 217 verifier');
pass('build_217_dry_run_wrapper_runs_runner_and_verifier_only_never_arms_or_sends');

// -------------------------------------------------------------------------------------------------
// Doc + demo proof present and labeled.
// -------------------------------------------------------------------------------------------------
for (const needle of ['Build 217', 'JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_AVAILABLE', 'native module', 'no send', 'pilot-gated', 'demo_ready_with_live_automation_disabled', 'Lindy audit', 'homeowner']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
for (const needle of ['Sales-Demo Proof', 'roof-inspection lead', 'daily recap', 'Homeowner outreach stays blocked', 'UI/demo-view gap']) {
  if (!demoProof.includes(needle)) fail('demo proof missing required marker: ' + needle);
}
pass('build_217_doc_and_demo_proof_present_and_labeled');

// -------------------------------------------------------------------------------------------------
// Safety posture preserved (pilot readiness helper).
// -------------------------------------------------------------------------------------------------
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
for (const [k, v] of Object.entries(status.live_automation)) {
  if (v !== false) fail('pilot readiness live_automation must be false: ' + k);
}
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 217 builds an integrated local runner that EXERCISES native workflow modules across all five Build 216 scenarios (not fixture-string comparison): synthetic lead intake, roof-inspection recognition, source/routing, exact M1/M2 binding, follow-up state, deterministic open-lead recap, and homeowner-consent blocking.');
console.log('PASS: Guarded FUTURE M1/M2 live support is permission-only and fails closed (separate scenario-specific approvals; M1 never authorizes M2; signed approval still needs a confirm token). No SMS/email/network/Twilio/credential action occurred.');
console.log('PASS: Lindy audit complete; both Fillout triggers removed; 0 remaining auto contact paths; Daily Brief Jason-only; Lindy safe for pilot mode and not the engine.');
console.log('PASS: Decision = JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_AVAILABLE; authorizes_send_now=false; launch pilot-gated, not unrestricted; demo_ready_with_live_automation_disabled preserved.');
console.log('PASS: Build 217 verifier passed (' + passCount + ' assertions).');
