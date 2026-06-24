#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_SIGNED_RUNNER_APPROVAL_AFTER_BUILD_179.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-signed-runner-approval-after-build-179.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-capture-signed-runner-approval-after-build-179-dry-run.sh';
const actualRunnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const priorDecisionPath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-decision-after-build-178-correction.json';
const indexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const firstPaidContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const agentContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const guidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';

const title = 'Native Workflow Fixture Capture Signed Runner Approval After Build 179';
const normalizedTitle = 'native workflow fixture capture signed runner approval after build 179';
const exactSignedApprovalText = [
  'I, Jason Lohse, approve one fresh sandbox/test-mode runner command attempt for RoofLeadHQ after Build 178 runner state correction, subject to a separate fresh pre-run guard passing first.',
  '',
  'Approval scope:',
  'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_178_runner_state_correction_and_future_fresh_guard',
  '',
  'Exact working directory:',
  '/root/roofleadhq',
  '',
  'Exact command:',
  'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  '',
  'Corrected execution wrapper requirement:',
  'The command must be run without any terminal-closing `exit` statement. The shell must remain open after the runner exits so full output and exit status can be captured.',
  '',
  'Exact runner path:',
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  '',
  'Exact manifest path:',
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json',
  '',
  'Exact scenario count:',
  '30',
  '',
  'Approval limits:',
  '- Sandbox/test-mode only.',
  '- One-time attempt only after a separate fresh pre-run guard passes.',
  '- No live activation.',
  '- No real homeowner contact.',
  '- No real roofer contact unless separately approved.',
  '- No production Supabase writes.',
  '- No production data access.',
  '- No schema/auth/RLS/security changes.',
  '- No billing/payment/deposit/quote/estimate/invoice automation.',
  '- No public/live automation.',
  '- No credential or secret exposure.',
  '- If the command blocks, exits nonzero, reports stale state, or output is incomplete, stop and do not rerun.',
  '- If the command succeeds, stop and capture validation evidence before any next step.',
  '',
  'Signed:',
  'Jason Lohse',
  '',
  'Signed date/time:',
  '06/24/2026, current chat MST'
].join('\n');

const expectedValues = {
  packet_name: title,
  packet_status: 'approval_capture_only',
  review_status: 'capture_signed_runner_approval_after_build_179_review_only',
  build_number: 180,
  source_of_truth_commit: '5c491ac',
  source_of_truth_label: 'test(workflow): add fresh runner decision after build 178 correction',
  prior_decision_template_commit: '5c491ac',
  prior_runner_state_correction_commit: 'dc7d570',
  prior_post_build_176_stale_evidence_commit: '084f039',
  prior_build_176_fresh_guard_commit: 'cc6d827',
  prior_build_175_signed_approval_capture_commit: '5ed0089',
  prior_build_174_ambiguous_attempt_capture_commit: 'a67205c',
  approval_scope:
    'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_178_runner_state_correction_and_future_fresh_guard',
  approval_capture_status: 'captured_signed',
  jason_signed_approval_status: 'signed',
  approval_signed_by: 'Jason Lohse',
  approval_signed_date_time: '06/24/2026, current chat MST',
  approval_template_status: 'template_from_build_179_now_signed_and_captured_by_build_180',
  signed_approval_text: exactSignedApprovalText,
  exact_working_directory: '/root/roofleadhq',
  exact_command:
    'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  corrected_execution_wrapper_requirement:
    'no_terminal_closing_exit_statement_shell_must_remain_open_for_output_and_exit_status_capture',
  exact_runner_path:
    'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  exact_manifest_path:
    'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json',
  exact_scenario_count: 30,
  fresh_pre_run_guard_status: 'not_created_not_passed_by_this_packet',
  runner_command_attempt_status: 'not_attempted_by_this_packet',
  command_execution_status: 'not_run_by_this_packet',
  runner_execution_status: 'not_run_by_this_packet',
  runner_command_path_status:
    'blocked_until_fresh_pre_run_guard_after_build_180_signed_approval_capture',
  approval_one_time_use_status: 'unused_pending_fresh_pre_run_guard',
  future_command_status:
    'blocked_until_fresh_pre_run_guard_after_build_180_signed_approval_capture',
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

console.log('== Build 180 Capture Signed Runner Approval After Build 179 Verification ==');

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
const priorDecision = readJson(priorDecisionPath);

mustHave(doc, title, 'packet doc');
mustHave(doc, 'source_of_truth_commit | 5c491ac', 'packet doc');
mustHave(doc, 'prior_decision_template_commit | 5c491ac', 'packet doc');
mustHave(doc, 'approval_capture_status | captured_signed', 'packet doc');
mustHave(doc, 'jason_signed_approval_status | signed', 'packet doc');
mustHave(doc, 'approval_signed_by | Jason Lohse', 'packet doc');
mustHave(doc, 'approval_signed_date_time | 06/24/2026, current chat MST', 'packet doc');
mustHave(
  doc,
  'future_command_status | blocked_until_fresh_pre_run_guard_after_build_180_signed_approval_capture',
  'packet doc'
);
mustHave(doc, exactSignedApprovalText, 'packet doc');
mustHave(doc, 'A separate fresh pre-run guard packet must be created and passed after this capture.', 'packet doc');
mustHave(doc, 'Actual validation remains 0 captured / 0 passed / 30 missing.', 'packet doc');
mustHave(doc, 'Live automation remains disabled.', 'packet doc');

for (const [key, value] of Object.entries(expectedValues)) expectEq(fixture, key, value);
for (const key of expectedFalse) expectEq(fixture, key, false);
for (const key of expectedTrue) expectEq(fixture, key, true);

expectEq(priorDecision, 'build_number', 179);
expectEq(priorDecision, 'approval_template_status', 'template_only_not_signed_not_captured_not_granted');
expectEq(priorDecision, 'jason_signed_approval_status', 'not_signed');
expectEq(priorDecision, 'approval_capture_status', 'not_captured');
expectEq(priorDecision, 'runner_execution_status', 'not_run_by_this_packet');
pass('build_179_decision_template_recognized_as_prior_source_of_truth_commit_5c491ac');

if (!isExecutable(wrapperPath)) fail('dry-run wrapper must be executable: ' + wrapperPath);
pass('dry_run_wrapper_executable');
mustHave(wrapper, 'Approval-capture only. This wrapper does not run the runner or pass the guard.', 'wrapper');
mustHave(
  wrapper,
  'node backend/scripts/verify-native-workflow-fixture-capture-signed-runner-approval-after-build-179-readonly.js',
  'wrapper'
);
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual runner');
}
pass('wrapper_does_not_invoke_actual_runner_command');

for (const text of [index, firstPaidContext, agentContext, guide, safeReadiness, aggregate]) {
  if (!text.includes(title)) fail('context/index wiring missing Build 180 title');
  if (!text.includes(normalizedTitle)) fail('context/index wiring missing normalized Build 180 title');
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

console.log('PASS: Build 180 signed approval capture packet verified');
console.log('PASS: Jason approval was signed and captured by this packet');
console.log('PASS: approval remains contingent on a separate fresh pre-run guard');
console.log('PASS: fresh pre-run guard was not created or passed by this packet');
console.log('PASS: runner direct execution was not run by this packet');
console.log('PASS: actual validation remains 0 captured / 0 passed / 30 missing');
console.log('PASS: controlled test-roofer E2E is review-only, not approved, and not run');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log(
  'PASS: Native Workflow Fixture Capture Signed Runner Approval After Build 179 verified (' +
    passCount +
    ' assertions).'
);
