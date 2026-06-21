#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_SIGNED_RUNNER_APPROVAL_AFTER_BUILD_164.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-signed-runner-approval-after-build-164.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-capture-signed-runner-approval-after-build-164-dry-run.sh';
const actualRunnerPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const indexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const firstPaidContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const agentContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const guidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';

const title = 'Native Workflow Fixture Capture Signed Runner Approval After Build 164';
const normalizedTitle = 'native workflow fixture capture signed runner approval after build 164';
const exactSignedApprovalText = 'I, Jason Lohse, approve one fresh sandbox/test-mode runner command attempt for RoofLeadHQ after Build 164, subject to a separate fresh pre-run guard passing first.\n\nApproval scope:\nfresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_164_signed_approval_and_fresh_guard\n\nExact working directory:\n/root/roofleadhq\n\nExact command:\nbash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh\n\nExact runner path:\nscripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh\n\nExact manifest path:\nbackend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json\n\nExact scenario count:\n30\n\nApproval limits:\n- Sandbox/test-mode only.\n- One-time attempt only after a fresh pre-run guard passes.\n- No live activation.\n- No real homeowner contact.\n- No real roofer contact unless separately approved.\n- No production Supabase writes.\n- No production data access.\n- No schema/auth/RLS/security changes.\n- No billing/payment/deposit/quote/estimate/invoice automation.\n- No public/live automation.\n- No credential or secret exposure.\n- If the command blocks, exits nonzero, or reports stale state, stop and do not rerun.\n- If the command succeeds, stop and capture validation evidence before any next step.\n\nSigned:\nJason Lohse\n\nSigned date/time:\n06/21/2026, 11:19am MST, current chat';

const upstreamPaths = [
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-decision-and-approval-template-after-build-163-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/correct-current-runner-recognition-and-test-roofer-e2e-readiness.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-161-runner-command-blocked-evidence.json',
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json'
];

let passCount = 0;
function pass(name) {
  passCount += 1;
  console.log('PASS: ' + name);
}
function fail(message) {
  console.error('FAIL: ' + message);
  process.exit(1);
}
function read(rel) {
  const full = path.join(root, rel);
  if (!fs.existsSync(full)) fail('missing file: ' + rel);
  return fs.readFileSync(full, 'utf8');
}
function readJson(rel) {
  return JSON.parse(read(rel));
}
function mustHave(text, needle, label) {
  if (!text.includes(needle)) fail(label + ' missing: ' + needle);
  pass(label.replace(/[^a-z0-9]+/gi, '_').toLowerCase() + '_contains_' + needle.replace(/[^a-z0-9]+/gi, '_').toLowerCase().slice(0, 80));
}
function expectEq(obj, key, value) {
  if (obj[key] !== value) fail('fixture ' + key + ' expected ' + value + ' got ' + obj[key]);
  pass(key + '_' + String(value).replace(/[^a-z0-9]+/gi, '_').toLowerCase());
}

console.log('== Build 165 Capture Signed Runner Approval After Build 164 Verification ==');

const doc = read(docPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
read(actualRunnerPath);
const index = read(indexPath);
const firstPaidContext = read(firstPaidContextPath);
const agentContext = read(agentContextPath);
const guide = read(guidePath);
const safeReadiness = read(safeReadinessPath);
const aggregate = read(aggregatePath);

mustHave(doc, title, 'packet doc');
mustHave(doc, 'source_of_truth_commit | dfb932f', 'packet doc');
mustHave(doc, 'prior_decision_template_commit | dfb932f', 'packet doc');
mustHave(doc, 'prior_runner_recognition_correction_commit | cf6d8c4', 'packet doc');
mustHave(doc, 'prior_post_build_161_blocked_evidence_commit | 3f97a7f', 'packet doc');
mustHave(doc, 'approval_capture_status | captured_signed', 'packet doc');
mustHave(doc, 'jason_signed_approval_status | signed', 'packet doc');
mustHave(doc, 'approval_signed_by | Jason Lohse', 'packet doc');
mustHave(doc, 'approval_signed_date_time | 06/21/2026, 11:19am MST, current chat', 'packet doc');
mustHave(doc, 'fresh_pre_run_guard_status | not_created_not_passed_by_this_packet', 'packet doc');
mustHave(doc, 'runner_command_attempt_status | not_attempted_by_this_packet', 'packet doc');
mustHave(doc, 'runner_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(doc, 'future_command_status | blocked_until_fresh_pre_run_guard_after_build_165_signed_approval_capture', 'packet doc');
mustHave(doc, 'controlled_test_roofer_e2e_status | review_only_not_approved_not_run', 'packet doc');
mustHave(doc, exactSignedApprovalText, 'packet doc');
mustHave(doc, 'A separate fresh pre-run guard packet must be created and passed after this capture.', 'packet doc');
mustHave(doc, 'Actual validation remains 0 captured / 0 passed / 30 missing.', 'packet doc');
mustHave(doc, 'Live automation remains disabled.', 'packet doc');

expectEq(fixture, 'packet_status', 'approval_capture_only');
expectEq(fixture, 'review_status', 'capture_signed_runner_approval_after_build_164_review_only');
expectEq(fixture, 'build_number', 165);
expectEq(fixture, 'source_of_truth_commit', 'dfb932f');
expectEq(fixture, 'prior_decision_template_commit', 'dfb932f');
expectEq(fixture, 'prior_runner_recognition_correction_commit', 'cf6d8c4');
expectEq(fixture, 'prior_post_build_161_blocked_evidence_commit', '3f97a7f');
expectEq(fixture, 'approval_scope', 'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_164_signed_approval_and_fresh_guard');
expectEq(fixture, 'approval_capture_status', 'captured_signed');
expectEq(fixture, 'jason_signed_approval_status', 'signed');
expectEq(fixture, 'approval_signed_by', 'Jason Lohse');
expectEq(fixture, 'approval_signed_date_time', '06/21/2026, 11:19am MST, current chat');
expectEq(fixture, 'approval_template_status', 'template_from_build_164_now_signed_and_captured_by_build_165');
expectEq(fixture, 'signed_approval_text', exactSignedApprovalText);
expectEq(fixture, 'exact_working_directory', '/root/roofleadhq');
expectEq(fixture, 'exact_command', 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh');
expectEq(fixture, 'exact_runner_path', 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh');
expectEq(fixture, 'exact_manifest_path', 'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json');
expectEq(fixture, 'exact_scenario_count', 30);
expectEq(fixture, 'sandbox_test_mode_only', true);
expectEq(fixture, 'one_time_attempt_only_after_fresh_guard', true);
expectEq(fixture, 'no_live_activation', true);
expectEq(fixture, 'no_real_homeowner_contact', true);
expectEq(fixture, 'no_real_roofer_contact_unless_separately_approved', true);
expectEq(fixture, 'no_production_supabase_writes', true);
expectEq(fixture, 'no_production_data_access', true);
expectEq(fixture, 'no_schema_auth_rls_security_changes', true);
expectEq(fixture, 'no_billing_payment_deposit_quote_estimate_invoice_automation', true);
expectEq(fixture, 'no_public_live_automation', true);
expectEq(fixture, 'no_credential_secret_exposure', true);
expectEq(fixture, 'if_command_blocks_or_exits_nonzero_or_reports_stale_state_stop_and_do_not_rerun', true);
expectEq(fixture, 'if_command_succeeds_stop_and_capture_validation_evidence_before_next_step', true);
expectEq(fixture, 'fresh_pre_run_guard_status', 'not_created_not_passed_by_this_packet');
expectEq(fixture, 'fresh_pre_run_guard_created_by_this_packet', false);
expectEq(fixture, 'fresh_pre_run_guard_passed_by_this_packet', false);
expectEq(fixture, 'fresh_pre_run_guard_required_after_this_packet', true);
expectEq(fixture, 'runner_command_attempt_status', 'not_attempted_by_this_packet');
expectEq(fixture, 'command_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_command_invoked_by_this_packet', false);
expectEq(fixture, 'runner_command_rerun_by_this_packet', false);
expectEq(fixture, 'runner_command_path_status', 'blocked_until_fresh_pre_run_guard_after_build_165_signed_approval_capture');
expectEq(fixture, 'approval_one_time_use_status', 'unused_pending_fresh_pre_run_guard');
expectEq(fixture, 'approval_reuse_allowed', false);
expectEq(fixture, 'future_command_status', 'blocked_until_fresh_pre_run_guard_after_build_165_signed_approval_capture');
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectEq(fixture, 'controlled_test_roofer_e2e_status', 'review_only_not_approved_not_run');
expectEq(fixture, 'controlled_test_roofer_e2e_approved', false);
expectEq(fixture, 'controlled_test_roofer_e2e_run_by_this_packet', false);
expectEq(fixture, 'controlled_real_roofer_validation_allowed', false);
expectEq(fixture, 'external_calls_made_by_this_packet', false);
expectEq(fixture, 'credentials_accessed_by_this_packet', false);
expectEq(fixture, 'secret_values_logged_by_this_packet', false);
expectEq(fixture, 'production_data_accessed_by_this_packet', false);
expectEq(fixture, 'production_supabase_data_written_by_this_packet', false);
expectEq(fixture, 'schema_auth_rls_security_modified_by_this_packet', false);
expectEq(fixture, 'real_homeowner_contact_made_by_this_packet', false);
expectEq(fixture, 'real_roofer_contact_made_by_this_packet', false);
expectEq(fixture, 'sms_email_calls_calendar_booking_performed_by_this_packet', false);
expectEq(fixture, 'billing_payment_automation_performed_by_this_packet', false);
expectEq(fixture, 'public_live_route_webhook_cron_scheduler_dispatcher_created_by_this_packet', false);
expectEq(fixture, 'production_data_access_approval_status', 'not_granted');
expectEq(fixture, 'production_supabase_write_approval_status', 'not_granted');
expectEq(fixture, 'schema_auth_rls_security_change_approval_status', 'not_granted');
expectEq(fixture, 'live_activation_approval_status', 'not_granted');
expectEq(fixture, 'real_homeowner_contact_approval_status', 'not_granted');
expectEq(fixture, 'real_roofer_contact_approval_status', 'not_granted_unless_separately_approved');
expectEq(fixture, 'sms_email_calls_calendar_booking_approval_status', 'not_granted');
expectEq(fixture, 'billing_payment_automation_approval_status', 'not_granted');
expectEq(fixture, 'public_live_automation_approval_status', 'not_granted');
expectEq(fixture, 'approved_for_activation_now', false);
expectEq(fixture, 'safety_status', 'demo_ready_with_live_automation_disabled');

for (const upstream of upstreamPaths) {
  read(upstream);
  pass('upstream_present_' + path.basename(upstream).replace(/[^a-z0-9]+/gi, '_'));
}

mustHave(wrapper, 'Approval-capture only. This wrapper does not run the runner or pass the guard.', 'wrapper');
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-capture-signed-runner-approval-after-build-164-readonly.js', 'wrapper');
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual runner');
}
pass('wrapper_does_not_invoke_actual_runner_command');

for (const text of [index, firstPaidContext, agentContext, guide, safeReadiness, aggregate]) {
  if (!text.includes(title)) fail('context/index wiring missing Build 165 title');
  if (!text.includes(normalizedTitle)) fail('context/index wiring missing normalized Build 165 title');
}
pass('docs_and_context_wiring_present');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

const combined = doc + '\n' + JSON.stringify(fixture, null, 2) + '\n' + wrapper;
const forbidden = [
  '"fresh_pre_run_guard_status": "passed"',
  '"fresh_pre_run_guard_created_by_this_packet": true',
  '"fresh_pre_run_guard_passed_by_this_packet": true',
  '"runner_command_attempt_status": "attempted"',
  '"runner_command_invoked_by_this_packet": true',
  '"runner_command_rerun_by_this_packet": true',
  '"actual_30_scenario_external_validation_captured_count": 30',
  '"actual_30_scenario_external_validation_passed_count": 30',
  '"actual_30_scenario_external_validation_missing_count": 0',
  '"actual_30_scenario_external_validation_status": "captured"',
  '"production_data_access_approval_status": "granted"',
  '"production_supabase_write_approval_status": "granted"',
  '"schema_auth_rls_security_change_approval_status": "granted"',
  '"live_activation_approval_status": "granted"',
  '"real_homeowner_contact_approval_status": "granted"',
  '"sms_email_calls_calendar_booking_approval_status": "granted"',
  '"billing_payment_automation_approval_status": "granted"',
  '"public_live_automation_approval_status": "granted"',
  '"approved_for_activation_now": true',
  '"controlled_test_roofer_e2e_approved": true',
  '"controlled_test_roofer_e2e_run_by_this_packet": true',
  '| fresh_pre_run_guard_status | passed |',
  '| runner_command_attempt_status | attempted |',
  '| live_activation_approval_status | granted |',
  '| approved_for_activation_now | true |'
];
for (const pattern of forbidden) {
  if (combined.includes(pattern)) fail('forbidden guard/runner/live/production activation pattern present: ' + pattern);
}
pass('safety_boundaries_no_guard_runner_validation_live_external_or_production_activation_detected');

console.log('PASS: Build 165 signed approval capture packet verified');
console.log('PASS: Jason approval was signed and captured by this packet');
console.log('PASS: approval remains contingent on a separate fresh pre-run guard');
console.log('PASS: fresh pre-run guard was not created or passed by this packet');
console.log('PASS: runner direct execution was not run by this packet');
console.log('PASS: actual validation remains 0 captured / 0 passed / 30 missing');
console.log('PASS: controlled test-roofer E2E is review-only, not approved, and not run');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log('PASS: Native Workflow Fixture Capture Signed Runner Approval After Build 164 verified (' + passCount + ' assertions).');
