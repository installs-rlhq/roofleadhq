#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const expectedRoot = '/root/roofleadhq';

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_PRE_RUN_GUARD_AFTER_BUILD_171_SIGNED_APPROVAL_CAPTURE.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-pre-run-guard-after-build-171-signed-approval-capture.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-fresh-pre-run-guard-after-build-171-signed-approval-capture-dry-run.sh';
const manifestPath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const runnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const approvalCapturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-signed-runner-approval-after-build-170.json';
const decisionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-decision-after-build-169-correction.json';
const stateCorrectionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-state-correction-after-build-168-stale-evidence.json';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const indexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const firstPaidContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const agentContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const guidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';

const title = 'Native Workflow Fixture Fresh Pre-Run Guard After Build 171 Signed Approval Capture';
const normalizedTitle = 'native workflow fixture fresh pre run guard after build 171 signed approval capture';
const exactCommand = 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const exactRunnerPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const exactManifestPath = 'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const verifierCommand =
  'node backend/scripts/verify-native-workflow-fixture-fresh-pre-run-guard-after-build-171-signed-approval-capture-readonly.js';

const expectedValues = {
  packet_name: title,
  packet_status: 'review_only',
  packet_type: 'fresh_pre_run_guard',
  review_status: 'fresh_pre_run_guard_after_build_171_signed_approval_capture_review_only',
  build_number: 172,
  source_of_truth_commit: '46a704b',
  source_of_truth_label: 'test(workflow): capture signed runner approval after build 170',
  prior_signed_approval_capture_commit: '46a704b',
  prior_fresh_runner_decision_commit: '932b7a4',
  prior_runner_state_correction_commit: '06ae3ce',
  approval_scope:
    'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_169_correction_decision_and_future_fresh_guard',
  approval_capture_status: 'captured_signed',
  jason_signed_approval_status: 'signed',
  approval_signed_by: 'Jason Lohse',
  approval_signed_date_time: '06/23/2026, current chat MST',
  fresh_pre_run_guard_status: 'passed_by_this_packet',
  fresh_pre_run_guard_result: 'pass',
  fresh_pre_run_guard_checks_required_count: 30,
  fresh_pre_run_guard_checks_passed_count: 30,
  fresh_pre_run_guard_failed_count: 0,
  runner_command_attempt_status: 'not_attempted_by_this_packet',
  command_execution_status: 'not_run_by_this_packet',
  runner_execution_status: 'not_run_by_this_packet',
  runner_command_invoked_by_this_packet: false,
  actual_30_scenario_external_validation_captured_count: 0,
  actual_30_scenario_external_validation_passed_count: 0,
  actual_30_scenario_external_validation_missing_count: 30,
  actual_30_scenario_external_validation_status: 'not_captured_by_this_run',
  future_command_status:
    'ready_only_after_build_172_committed_pushed_fetched_source_of_truth_verified_and_final_git_status_blank',
  safety_status: 'demo_ready_with_live_automation_disabled',
  controlled_test_roofer_e2e_status: 'review_only_not_approved_not_run',
  exact_working_directory: '/root/roofleadhq',
  exact_command: exactCommand,
  exact_runner_path: exactRunnerPath,
  exact_manifest_path: exactManifestPath,
  exact_scenario_count: 30
};

const expectedFalse = [
  'runner_command_invoked_by_this_packet',
  'runner_command_rerun_by_this_packet',
  'runner_command_rerun_allowed_before_attempt',
  'approved_for_activation_now',
  'controlled_test_roofer_e2e_approved',
  'controlled_test_roofer_e2e_run_by_this_packet',
  'external_calls_made_by_this_packet',
  'credentials_accessed_by_this_packet',
  'secret_values_logged_by_this_packet',
  'production_data_accessed_by_this_packet',
  'production_supabase_data_written_by_this_packet',
  'schema_auth_rls_security_modified_by_this_packet',
  'live_automation_enabled_by_this_packet',
  'real_homeowner_contact_made_by_this_packet',
  'real_roofer_contact_made_by_this_packet',
  'sms_email_calls_calendar_booking_performed_by_this_packet',
  'billing_payment_deposit_quote_estimate_invoice_automation_performed_by_this_packet',
  'public_live_route_webhook_cron_scheduler_dispatcher_created_by_this_packet'
];

const expectedTrue = [
  'one_time_runner_attempt_allowed_after_source_of_truth_closeout',
  'source_of_truth_closeout_required_before_runner_attempt',
  'ready_only_after_build_172_committed_pushed_fetched_source_of_truth_verified_and_final_git_status_blank',
  'if_future_command_blocks_nonzero_or_stale_stop_and_do_not_rerun',
  'if_future_command_succeeds_stop_and_capture_validation_evidence'
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
  pass(label.replace(/[^a-z0-9]+/gi, '_').toLowerCase() + '_contains_' + needle.replace(/[^a-z0-9]+/gi, '_').toLowerCase().slice(0, 90));
}

function mustNotHave(text, needle, label) {
  if (text.includes(needle)) fail(label + ' must not contain: ' + needle);
  pass(label.replace(/[^a-z0-9]+/gi, '_').toLowerCase() + '_omits_' + needle.replace(/[^a-z0-9]+/gi, '_').toLowerCase().slice(0, 90));
}

function expectEq(obj, key, value) {
  if (obj[key] !== value) fail('fixture ' + key + ' expected ' + value + ' got ' + obj[key]);
  pass(key + '_' + String(value).replace(/[^a-z0-9]+/gi, '_').toLowerCase());
}

function expectFalse(obj, key) {
  expectEq(obj, key, false);
}

function expectTrue(obj, key) {
  expectEq(obj, key, true);
}

function isExecutable(rel) {
  try {
    fs.accessSync(fullPath(rel), fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

console.log('== Build 172 Fresh Pre-Run Guard After Build 171 Signed Approval Capture Verification ==');

if (root !== expectedRoot) fail('repo root mismatch: ' + root);
pass('expected_repo_root_' + expectedRoot.replace(/[^a-z0-9]+/gi, '_').toLowerCase());

const doc = read(docPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const manifest = readJson(manifestPath);
read(runnerPath);
const approvalCapture = readJson(approvalCapturePath);
const decisionFixture = readJson(decisionFixturePath);
const stateCorrectionFixture = readJson(stateCorrectionFixturePath);
const aggregate = read(aggregatePath);
const index = read(indexPath);
const firstPaidContext = read(firstPaidContextPath);
const agentContext = read(agentContextPath);
const guide = read(guidePath);
const safeReadiness = read(safeReadinessPath);

mustHave(doc, title, 'packet doc');
mustHave(doc, 'build_number | 172', 'packet doc');
mustHave(doc, 'source_of_truth_commit | 46a704b', 'packet doc');
mustHave(doc, 'source_of_truth_label | test(workflow): capture signed runner approval after build 170', 'packet doc');
mustHave(doc, 'prior_signed_approval_capture_commit | 46a704b', 'packet doc');
mustHave(doc, 'prior_fresh_runner_decision_commit | 932b7a4', 'packet doc');
mustHave(doc, 'prior_runner_state_correction_commit | 06ae3ce', 'packet doc');
mustHave(doc, 'approval_scope | fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_169_correction_decision_and_future_fresh_guard', 'packet doc');
mustHave(doc, 'approval_capture_status | captured_signed', 'packet doc');
mustHave(doc, 'jason_signed_approval_status | signed', 'packet doc');
mustHave(doc, 'approval_signed_by | Jason Lohse', 'packet doc');
mustHave(doc, 'approval_signed_date_time | 06/23/2026, current chat MST', 'packet doc');
mustHave(doc, 'fresh_pre_run_guard_status | passed_by_this_packet', 'packet doc');
mustHave(doc, 'fresh_pre_run_guard_result | pass', 'packet doc');
mustHave(doc, 'future_command_status | ready_only_after_build_172_committed_pushed_fetched_source_of_truth_verified_and_final_git_status_blank', 'packet doc');
mustHave(doc, 'Only after Build 172 is committed, pushed, fetched, source-of-truth verified, and final git status is blank', 'packet doc');
mustHave(doc, 'If the future command blocks, exits nonzero, or reports stale state, stop and do not rerun.', 'packet doc');
mustHave(doc, 'If the future command succeeds, stop and capture validation evidence.', 'packet doc');

for (const [key, value] of Object.entries(expectedValues)) expectEq(fixture, key, value);
for (const key of expectedFalse) expectFalse(fixture, key);
for (const key of expectedTrue) expectTrue(fixture, key);

if (!Array.isArray(fixture.fresh_pre_run_guard_checks) || fixture.fresh_pre_run_guard_checks.length !== 30) {
  fail('fresh_pre_run_guard_checks must contain 30 entries');
}
pass('fresh_pre_run_guard_checks_array_30');
for (let i = 1; i <= 30; i += 1) {
  expectEq(fixture, 'fresh_pre_run_guard_check_' + String(i).padStart(2, '0') + '_status', 'passed');
}

if (!Array.isArray(manifest.scenarios) || manifest.scenarios.length !== 30) {
  fail('manifest scenarios must contain 30 entries');
}
pass('manifest_scenarios_array_30');

expectEq(approvalCapture, 'build_number', 171);
expectEq(approvalCapture, 'source_of_truth_commit', '932b7a4');
expectEq(approvalCapture, 'approval_capture_status', 'captured_signed');
expectEq(approvalCapture, 'jason_signed_approval_status', 'signed');
expectEq(approvalCapture, 'approval_signed_by', 'Jason Lohse');
expectEq(approvalCapture, 'approval_signed_date_time', '06/23/2026, current chat');

expectEq(decisionFixture, 'build_number', 170);
expectEq(decisionFixture, 'source_of_truth_commit', '06ae3ce');
expectEq(stateCorrectionFixture, 'build_number', 169);
expectEq(stateCorrectionFixture, 'source_of_truth_commit', 'd43cf77');

mustHave(wrapper, 'Fresh pre-run guard only. This wrapper does not run the actual runner.', 'wrapper');
mustHave(wrapper, verifierCommand, 'wrapper');
mustNotHave(wrapper, exactCommand, 'wrapper');

for (const text of [aggregate, index, firstPaidContext, agentContext, guide, safeReadiness]) {
  if (!text.includes(title) || !text.includes(normalizedTitle)) {
    fail('docs/context wiring missing Build 172 title or normalized title');
  }
}
pass('docs_and_context_wiring_present');

if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
pass('dry_run_wrapper_executable');

const combined = doc + '\n' + JSON.stringify(fixture, null, 2);
const forbidden = [
  '"runner_command_invoked_by_this_packet": true',
  '"runner_command_rerun_by_this_packet": true',
  '"actual_30_scenario_external_validation_captured_count": 30',
  '"actual_30_scenario_external_validation_passed_count": 30',
  '"actual_30_scenario_external_validation_missing_count": 0',
  '"production_data_access_approval_status": "granted"',
  '"production_supabase_write_approval_status": "granted"',
  '"schema_auth_rls_security_change_approval_status": "granted"',
  '"live_activation_approval_status": "granted"',
  '"real_homeowner_contact_approval_status": "granted"',
  '"real_roofer_contact_approval_status": "granted"',
  '"sms_email_calls_calendar_booking_approval_status": "granted"',
  '"billing_payment_automation_approval_status": "granted"',
  '"public_live_automation_approval_status": "granted"',
  '"approved_for_activation_now": true',
  '"controlled_test_roofer_e2e_approved": true',
  '"controlled_test_roofer_e2e_run_by_this_packet": true',
  '"fresh_pre_run_guard_status": "passed"',
  '"fresh_pre_run_guard_result": "fail"',
  '| actual_30_scenario_external_validation_captured_count | 30 |',
  '| actual_30_scenario_external_validation_passed_count | 30 |',
  '| actual_30_scenario_external_validation_missing_count | 0 |'
];
for (const pattern of forbidden) {
  mustNotHave(combined, pattern, 'fresh pre-run guard packet');
}
pass('no_live_external_production_activation_flags_detected');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Build 172 fresh pre-run guard after Build 171 signed approval capture verified (' + passCount + ' assertions).');
