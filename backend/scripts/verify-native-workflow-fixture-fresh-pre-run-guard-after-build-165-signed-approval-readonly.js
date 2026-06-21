#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_PRE_RUN_GUARD_AFTER_BUILD_165_SIGNED_APPROVAL.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/fresh-pre-run-guard-after-build-165-signed-approval.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-fresh-pre-run-guard-after-build-165-signed-approval-dry-run.sh';
const approvalFixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-signed-runner-approval-after-build-164.json';
const decisionFixturePath = 'backend/fixtures/native-workflow-demo-roofer/fresh-runner-decision-and-approval-template-after-build-163-correction.json';
const recognitionFixturePath = 'backend/fixtures/native-workflow-demo-roofer/correct-current-runner-recognition-and-test-roofer-e2e-readiness.json';
const blockedEvidenceFixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-post-build-161-runner-command-blocked-evidence.json';
const manifestPath = 'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const actualRunnerPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const indexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const firstPaidContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const agentContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const guidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';

const title = 'Native Workflow Fixture Fresh Pre-Run Guard After Build 165 Signed Approval';
const normalizedTitle = 'native workflow fixture fresh pre run guard after build 165 signed approval';
const exactCommand = 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const exactRunnerPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const exactManifestPath = 'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const approvalScope = 'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_164_signed_approval_and_fresh_guard';

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
function expectFalse(obj, key) {
  expectEq(obj, key, false);
}
function expectTrue(obj, key) {
  expectEq(obj, key, true);
}

console.log('== Build 166 Fresh Pre-Run Guard After Build 165 Signed Approval Verification ==');

const doc = read(docPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const approval = readJson(approvalFixturePath);
read(decisionFixturePath);
read(recognitionFixturePath);
read(blockedEvidenceFixturePath);
read(manifestPath);
read(actualRunnerPath);
const index = read(indexPath);
const firstPaidContext = read(firstPaidContextPath);
const agentContext = read(agentContextPath);
const guide = read(guidePath);
const safeReadiness = read(safeReadinessPath);
const aggregate = read(aggregatePath);

mustHave(doc, title, 'packet doc');
mustHave(doc, 'source_of_truth_commit | 50d66cc', 'packet doc');
mustHave(doc, 'prior_signed_approval_capture_commit | 50d66cc', 'packet doc');
mustHave(doc, 'prior_decision_template_commit | dfb932f', 'packet doc');
mustHave(doc, 'prior_runner_recognition_correction_commit | cf6d8c4', 'packet doc');
mustHave(doc, 'prior_post_build_161_blocked_evidence_commit | 3f97a7f', 'packet doc');
mustHave(doc, 'fresh_execution_pre_run_guard_status | passed', 'packet doc');
mustHave(doc, 'fresh_execution_pre_run_guard_checks_passed_count | 30', 'packet doc');
mustHave(doc, 'runner_command_attempt_status | not_attempted_by_this_packet', 'packet doc');
mustHave(doc, 'runner_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(doc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(doc, 'future_command_status | ready_for_exact_approved_runner_execution_command_after_build_166_guard_review_only', 'packet doc');
mustHave(doc, 'After Build 166 is committed, pushed, fetched, and source-of-truth verified', 'packet doc');
mustHave(doc, 'Terminal 1 only', 'packet doc');
mustHave(doc, 'If that future command blocks, exits nonzero, or reports stale state, stop and do not rerun.', 'packet doc');
mustHave(doc, 'If it succeeds, stop and capture validation evidence before any next step.', 'packet doc');

expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'review_status', 'fresh_pre_run_guard_after_build_165_signed_approval_review_only');
expectEq(fixture, 'build_number', 166);
expectEq(fixture, 'source_of_truth_commit', '50d66cc');
expectEq(fixture, 'prior_signed_approval_capture_commit', '50d66cc');
expectEq(fixture, 'prior_decision_template_commit', 'dfb932f');
expectEq(fixture, 'prior_runner_recognition_correction_commit', 'cf6d8c4');
expectEq(fixture, 'prior_post_build_161_blocked_evidence_commit', '3f97a7f');
expectEq(fixture, 'approval_scope', approvalScope);
expectEq(fixture, 'approval_capture_status', 'captured_signed');
expectEq(fixture, 'jason_signed_approval_status', 'signed');
expectEq(fixture, 'approval_signed_by', 'Jason Lohse');
expectEq(fixture, 'approval_signed_date_time', '06/21/2026, 11:19am MST, current chat');
expectEq(fixture, 'exact_working_directory', '/root/roofleadhq');
expectEq(fixture, 'exact_command', exactCommand);
expectEq(fixture, 'exact_runner_path', exactRunnerPath);
expectEq(fixture, 'exact_manifest_path', exactManifestPath);
expectEq(fixture, 'exact_scenario_count', 30);
expectEq(fixture, 'fresh_execution_pre_run_guard_status', 'passed');
expectEq(fixture, 'fresh_execution_pre_run_guard_checks_required_count', 30);
expectEq(fixture, 'fresh_execution_pre_run_guard_checks_passed_count', 30);
expectEq(fixture, 'fresh_execution_pre_run_guard_failed_count', 0);
expectTrue(fixture, 'fresh_execution_pre_run_guard_does_not_equal_runner_execution');
expectTrue(fixture, 'fresh_execution_pre_run_guard_does_not_invoke_approved_command');
expectEq(fixture, 'runner_command_attempt_status', 'not_attempted_by_this_packet');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'command_execution_status', 'not_run_by_this_packet');
expectFalse(fixture, 'runner_command_invoked_by_this_packet');
expectFalse(fixture, 'runner_command_rerun_allowed_before_attempt');
expectFalse(fixture, 'runner_command_rerun_by_this_packet');
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectEq(fixture, 'future_command_status', 'ready_for_exact_approved_runner_execution_command_after_build_166_guard_review_only');
expectTrue(fixture, 'one_time_runner_attempt_allowed_after_source_of_truth_closeout');
expectEq(fixture, 'controlled_test_roofer_e2e_status', 'review_only_not_approved_not_run');
expectFalse(fixture, 'controlled_test_roofer_e2e_approved');
expectFalse(fixture, 'controlled_test_roofer_e2e_run_by_this_packet');
expectFalse(fixture, 'controlled_real_roofer_validation_allowed');
expectFalse(fixture, 'external_calls_made_by_this_packet');
expectFalse(fixture, 'credentials_accessed_by_this_packet');
expectFalse(fixture, 'secret_values_logged_by_this_packet');
expectFalse(fixture, 'production_data_accessed_by_this_packet');
expectFalse(fixture, 'production_supabase_data_written_by_this_packet');
expectFalse(fixture, 'schema_auth_rls_security_modified_by_this_packet');
expectFalse(fixture, 'live_automation_enabled_by_this_packet');
expectFalse(fixture, 'real_homeowner_contact_made_by_this_packet');
expectFalse(fixture, 'real_roofer_contact_made_by_this_packet');
expectFalse(fixture, 'sms_email_calls_calendar_booking_performed_by_this_packet');
expectFalse(fixture, 'billing_payment_deposit_quote_estimate_invoice_automation_performed_by_this_packet');
expectFalse(fixture, 'public_live_route_webhook_cron_scheduler_dispatcher_created_by_this_packet');
expectEq(fixture, 'production_data_access_approval_status', 'not_granted');
expectEq(fixture, 'production_supabase_write_approval_status', 'not_granted');
expectEq(fixture, 'schema_auth_rls_security_change_approval_status', 'not_granted');
expectEq(fixture, 'live_activation_approval_status', 'not_granted');
expectEq(fixture, 'real_homeowner_contact_approval_status', 'not_granted');
expectEq(fixture, 'real_roofer_contact_approval_status', 'not_granted');
expectEq(fixture, 'sms_email_calls_calendar_booking_approval_status', 'not_granted');
expectEq(fixture, 'billing_payment_automation_approval_status', 'not_granted');
expectEq(fixture, 'public_live_automation_approval_status', 'not_granted');
expectFalse(fixture, 'approved_for_activation_now');
expectEq(fixture, 'safety_status', 'demo_ready_with_live_automation_disabled');
expectEq(fixture, 'future_attempt_terminal', 'Terminal 1 only');
expectEq(fixture, 'future_attempt_prerequisite', 'after_build_166_committed_pushed_fetched_and_source_of_truth_verified');
expectEq(fixture, 'if_future_command_blocks_nonzero_or_stale', 'stop_and_do_not_rerun');
expectEq(fixture, 'if_future_command_succeeds', 'stop_and_capture_validation_evidence');
expectEq(fixture, 'next_step_text', 'After Build 166 is committed, pushed, fetched, and source-of-truth verified, the exact approved runner command may be attempted once from Terminal 1 only.');

expectEq(approval, 'approval_scope', approvalScope);
expectEq(approval, 'approval_capture_status', 'captured_signed');
expectEq(approval, 'jason_signed_approval_status', 'signed');
expectEq(approval, 'approval_signed_by', 'Jason Lohse');
expectEq(approval, 'approval_signed_date_time', '06/21/2026, 11:19am MST, current chat');
expectEq(approval, 'exact_working_directory', fixture.exact_working_directory);
expectEq(approval, 'exact_command', fixture.exact_command);
expectEq(approval, 'exact_runner_path', fixture.exact_runner_path);
expectEq(approval, 'exact_manifest_path', fixture.exact_manifest_path);
expectEq(approval, 'exact_scenario_count', fixture.exact_scenario_count);
pass('exact_approved_values_match_build_165_signed_approval');

if (!Array.isArray(fixture.fresh_execution_pre_run_guard_checks) || fixture.fresh_execution_pre_run_guard_checks.length !== 30) {
  fail('guard checks array must contain 30 checks');
}
pass('fresh_execution_pre_run_guard_checks_array_30');
for (let i = 1; i <= 30; i++) {
  expectEq(fixture, 'fresh_execution_pre_run_guard_check_' + String(i).padStart(2, '0') + '_status', 'passed');
}

const upstreamPaths = [
  approvalFixturePath,
  decisionFixturePath,
  recognitionFixturePath,
  blockedEvidenceFixturePath,
  manifestPath,
  actualRunnerPath
];
for (const upstream of upstreamPaths) {
  read(upstream);
  pass('upstream_present_' + path.basename(upstream).replace(/[^a-z0-9]+/gi, '_'));
}

mustHave(wrapper, 'Fresh pre-run guard only. This wrapper does not run the runner.', 'wrapper');
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-fresh-pre-run-guard-after-build-165-signed-approval-readonly.js', 'wrapper');
if (wrapper.includes(exactCommand) || wrapper.includes(actualRunnerPath)) {
  fail('wrapper must not invoke or mention the actual runner command/path');
}
pass('wrapper_does_not_invoke_or_reference_actual_runner');

for (const text of [index, firstPaidContext, agentContext, guide, safeReadiness, aggregate]) {
  if (!text.includes(title)) fail('docs/context wiring missing Build 166 title');
  if (!text.includes(normalizedTitle)) fail('docs/context wiring missing normalized Build 166 title');
}
pass('docs_and_context_wiring_present');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

const combined = doc + '\n' + JSON.stringify(fixture, null, 2) + '\n' + wrapper;
const forbidden = [
  '"runner_command_attempt_status": "attempted"',
  '"runner_execution_status": "run_by_this_packet"',
  '"command_execution_status": "run_by_this_packet"',
  '"runner_command_invoked_by_this_packet": true',
  '"runner_command_rerun_by_this_packet": true',
  '"actual_30_scenario_external_validation_captured_count": 30',
  '"actual_30_scenario_external_validation_passed_count": 30',
  '"actual_30_scenario_external_validation_missing_count": 0',
  '"actual_30_scenario_external_validation_status": "captured"',
  '"external_calls_made_by_this_packet": true',
  '"credentials_accessed_by_this_packet": true',
  '"secret_values_logged_by_this_packet": true',
  '"production_data_accessed_by_this_packet": true',
  '"production_supabase_data_written_by_this_packet": true',
  '"schema_auth_rls_security_modified_by_this_packet": true',
  '"live_automation_enabled_by_this_packet": true',
  '"real_homeowner_contact_made_by_this_packet": true',
  '"real_roofer_contact_made_by_this_packet": true',
  '"sms_email_calls_calendar_booking_performed_by_this_packet": true',
  '"billing_payment_deposit_quote_estimate_invoice_automation_performed_by_this_packet": true',
  '"public_live_route_webhook_cron_scheduler_dispatcher_created_by_this_packet": true',
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
  '| runner_command_attempt_status | attempted |',
  '| runner_execution_status | run_by_this_packet |',
  '| live_activation_approval_status | granted |',
  '| approved_for_activation_now | true |'
];
for (const pattern of forbidden) {
  if (combined.includes(pattern)) fail('forbidden runner/live/external/production activation pattern present: ' + pattern);
}
pass('safety_boundaries_no_runner_live_external_or_production_activation_detected');

console.log('PASS: Build 166 fresh pre-run guard verified');
console.log('PASS: guard passed 30/30');
console.log('PASS: runner was not run by this packet');
console.log('PASS: command was not attempted by this packet');
console.log('PASS: actual validation remains 0 captured / 0 passed / 30 missing');
console.log('PASS: controlled test-roofer E2E remains review-only, not approved, and not run');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log('PASS: Native Workflow Fixture Fresh Pre-Run Guard After Build 165 Signed Approval verified (' + passCount + ' assertions).');
