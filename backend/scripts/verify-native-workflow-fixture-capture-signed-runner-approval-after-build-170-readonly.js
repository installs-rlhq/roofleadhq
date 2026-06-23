#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_SIGNED_RUNNER_APPROVAL_AFTER_BUILD_170.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-signed-runner-approval-after-build-170.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-capture-signed-runner-approval-after-build-170-dry-run.sh';
const actualRunnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const indexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const firstPaidContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const agentContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const guidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';

const title = 'Native Workflow Fixture Capture Signed Runner Approval After Build 170';
const normalizedTitle = 'native workflow fixture capture signed runner approval after build 170';
const exactSignedApprovalText =
  'I, Jason Lohse, approve one fresh sandbox/test-mode runner command attempt for RoofLeadHQ after Build 170, subject to a separate fresh pre-run guard passing first.\n\n' +
  'Approval scope:\n' +
  'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_170_signed_approval_and_fresh_guard\n\n' +
  'Exact working directory:\n' +
  '/root/roofleadhq\n\n' +
  'Exact command:\n' +
  'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh\n\n' +
  'Exact runner path:\n' +
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh\n\n' +
  'Exact manifest path:\n' +
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json\n\n' +
  'Exact scenario count:\n' +
  '30\n\n' +
  'Approval limits:\n' +
  '- Sandbox/test-mode only.\n' +
  '- One-time attempt only after a fresh pre-run guard passes.\n' +
  '- No live activation.\n' +
  '- No real homeowner contact.\n' +
  '- No real roofer contact unless separately approved.\n' +
  '- No production Supabase writes.\n' +
  '- No production data access.\n' +
  '- No schema/auth/RLS/security changes.\n' +
  '- No billing/payment/deposit/quote/estimate/invoice automation.\n' +
  '- No public/live automation.\n' +
  '- No credential or secret exposure.\n' +
  '- If the command blocks, exits nonzero, or reports stale state, stop and do not rerun.\n' +
  '- If the command succeeds, stop and capture validation evidence before any next step.\n\n' +
  'Signed:\n' +
  'Jason Lohse\n\n' +
  'Signed date/time:\n' +
  '06/23/2026, current chat';

const expectedValues = {
  packet_name: title,
  packet_status: 'approval_capture_only',
  review_status: 'capture_signed_runner_approval_after_build_170_review_only',
  build_number: 171,
  source_of_truth_commit: '932b7a4',
  source_of_truth_label: 'test(workflow): add build 170 fresh runner decision template',
  prior_decision_template_commit: '932b7a4',
  prior_runner_state_correction_commit: '06ae3ce',
  prior_post_build_167_stale_evidence_commit: 'd43cf77',
  prior_build_167_fresh_guard_commit: 'e0be19f',
  prior_build_166_cleanup_commit: 'bc7ea24',
  prior_premature_runner_blocked_evidence_commit: '69fe9db',
  prior_signed_approval_capture_commit: '50d66cc',
  prior_build_164_decision_template_commit: 'dfb932f',
  approval_scope:
    'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_170_signed_approval_and_fresh_guard',
  approval_capture_status: 'captured_signed',
  jason_signed_approval_status: 'signed',
  approval_signed_by: 'Jason Lohse',
  approval_signed_date_time: '06/23/2026, current chat',
  approval_template_status: 'template_from_build_170_now_signed_and_captured_by_build_171',
  signed_approval_text: exactSignedApprovalText,
  exact_working_directory: '/root/roofleadhq',
  exact_command:
    'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  exact_runner_path:
    'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  exact_manifest_path:
    'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json',
  exact_scenario_count: 30,
  fresh_pre_run_guard_status: 'not_created_not_passed_by_this_packet',
  runner_command_attempt_status: 'not_attempted_by_this_packet',
  command_execution_status: 'not_run_by_this_packet',
  runner_execution_status: 'not_run_by_this_packet',
  runner_command_path_status: 'blocked_until_fresh_pre_run_guard_after_build_171_signed_approval_capture',
  approval_one_time_use_status: 'unused_pending_fresh_pre_run_guard',
  future_command_status: 'blocked_until_fresh_pre_run_guard_after_build_171_signed_approval_capture',
  actual_30_scenario_external_validation_captured_count: 0,
  actual_30_scenario_external_validation_passed_count: 0,
  actual_30_scenario_external_validation_missing_count: 30,
  actual_30_scenario_external_validation_status: 'not_captured_by_this_run',
  controlled_test_roofer_e2e_status: 'review_only_not_approved_not_run',
  production_data_access_approval_status: 'not_granted',
  production_supabase_write_approval_status: 'not_granted',
  schema_auth_rls_security_change_approval_status: 'not_granted',
  live_activation_approval_status: 'not_granted',
  real_homeowner_contact_approval_status: 'not_granted',
  real_roofer_contact_approval_status: 'not_granted_unless_separately_approved',
  sms_email_calls_calendar_booking_approval_status: 'not_granted',
  billing_payment_automation_approval_status: 'not_granted',
  public_live_automation_approval_status: 'not_granted',
  safety_status: 'demo_ready_with_live_automation_disabled'
};

const expectedFalse = [
  'fresh_pre_run_guard_created_by_this_packet',
  'fresh_pre_run_guard_passed_by_this_packet',
  'runner_command_invoked_by_this_packet',
  'runner_command_rerun_by_this_packet',
  'approval_reuse_allowed',
  'controlled_test_roofer_e2e_approved',
  'controlled_test_roofer_e2e_run_by_this_packet',
  'controlled_real_roofer_validation_allowed',
  'external_calls_made_by_this_packet',
  'credentials_accessed_by_this_packet',
  'secret_values_logged_by_this_packet',
  'production_data_accessed_by_this_packet',
  'production_supabase_data_written_by_this_packet',
  'schema_auth_rls_security_modified_by_this_packet',
  'real_homeowner_contact_made_by_this_packet',
  'real_roofer_contact_made_by_this_packet',
  'sms_email_calls_calendar_booking_performed_by_this_packet',
  'billing_payment_automation_performed_by_this_packet',
  'public_live_route_webhook_cron_scheduler_dispatcher_created_by_this_packet',
  'approved_for_activation_now'
];

const expectedTrue = [
  'sandbox_test_mode_only',
  'one_time_attempt_only_after_fresh_guard',
  'no_live_activation',
  'no_real_homeowner_contact',
  'no_real_roofer_contact_unless_separately_approved',
  'no_production_supabase_writes',
  'no_production_data_access',
  'no_schema_auth_rls_security_changes',
  'no_billing_payment_deposit_quote_estimate_invoice_automation',
  'no_public_live_automation',
  'no_credential_secret_exposure',
  'if_command_blocks_or_exits_nonzero_or_reports_stale_state_stop_and_do_not_rerun',
  'if_command_succeeds_stop_and_capture_validation_evidence_before_next_step',
  'fresh_pre_run_guard_required_after_this_packet'
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

function slug(value) {
  return String(value).replace(/[^a-z0-9]+/gi, '_').toLowerCase().slice(0, 90);
}

function fullPath(rel) {
  return path.join(root, rel);
}

function read(rel) {
  const target = fullPath(rel);
  if (!fs.existsSync(target)) fail('missing file: ' + rel);
  return fs.readFileSync(target, 'utf8');
}

function readJson(rel) {
  return JSON.parse(read(rel));
}

function mustHave(text, needle, label) {
  if (!text.includes(needle)) fail(label + ' missing: ' + needle);
  pass(slug(label) + '_contains_' + slug(needle));
}

function expectEq(obj, key, value) {
  if (obj[key] !== value) fail('fixture ' + key + ' expected ' + value + ' got ' + obj[key]);
  pass(key + '_' + slug(value));
}

function isExecutable(rel) {
  try {
    fs.accessSync(fullPath(rel), fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

console.log('== Build 171 Capture Signed Runner Approval After Build 170 Verification ==');

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
const priorDecision = readJson(
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-decision-after-build-169-correction.json'
);

mustHave(doc, title, 'packet doc');
mustHave(doc, 'source_of_truth_commit | 932b7a4', 'packet doc');
mustHave(doc, 'prior_decision_template_commit | 932b7a4', 'packet doc');
mustHave(doc, 'approval_capture_status | captured_signed', 'packet doc');
mustHave(doc, 'jason_signed_approval_status | signed', 'packet doc');
mustHave(doc, 'approval_signed_by | Jason Lohse', 'packet doc');
mustHave(doc, 'approval_signed_date_time | 06/23/2026, current chat', 'packet doc');
mustHave(doc, 'future_command_status | blocked_until_fresh_pre_run_guard_after_build_171_signed_approval_capture', 'packet doc');
mustHave(doc, exactSignedApprovalText, 'packet doc');
mustHave(doc, 'A separate fresh pre-run guard packet must be created and passed after this capture.', 'packet doc');
mustHave(doc, 'Actual validation remains 0 captured / 0 passed / 30 missing.', 'packet doc');
mustHave(doc, 'Live automation remains disabled.', 'packet doc');

for (const [key, value] of Object.entries(expectedValues)) expectEq(fixture, key, value);
for (const key of expectedFalse) expectEq(fixture, key, false);
for (const key of expectedTrue) expectEq(fixture, key, true);

expectEq(priorDecision, 'build_number', 170);
expectEq(priorDecision, 'source_of_truth_commit', '06ae3ce');
expectEq(priorDecision, 'fresh_runner_execution_approval_template_status', 'created_review_only_unsigned');
expectEq(priorDecision, 'fresh_runner_execution_approval_capture_status', 'not_captured');
expectEq(priorDecision, 'fresh_runner_execution_jason_signed_approval_status', 'not_signed');
expectEq(priorDecision, 'runner_execution_status', 'not_run_by_this_packet');
pass('build_170_decision_template_recognized_as_prior_source_of_truth_commit_932b7a4');

if (!isExecutable(wrapperPath)) fail('dry-run wrapper must be executable: ' + wrapperPath);
pass('dry_run_wrapper_executable');
mustHave(wrapper, 'Approval-capture only. This wrapper does not run the runner or pass the guard.', 'wrapper');
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-capture-signed-runner-approval-after-build-170-readonly.js', 'wrapper');
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual runner');
}
pass('wrapper_does_not_invoke_actual_runner_command');

for (const text of [index, firstPaidContext, agentContext, guide, safeReadiness, aggregate]) {
  if (!text.includes(title)) fail('context/index wiring missing Build 171 title');
  if (!text.includes(normalizedTitle)) fail('context/index wiring missing normalized Build 171 title');
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

console.log('PASS: Build 171 signed approval capture packet verified');
console.log('PASS: approval remains contingent on a separate fresh pre-run guard');
console.log('PASS: runner direct execution was not run by this packet');
console.log('PASS: actual validation remains 0 captured / 0 passed / 30 missing');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log(
  'PASS: Native Workflow Fixture Capture Signed Runner Approval After Build 170 verified (' +
    passCount +
    ' assertions).'
);
