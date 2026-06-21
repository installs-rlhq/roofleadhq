#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_DECISION_AND_APPROVAL_TEMPLATE_AFTER_BUILD_163_CORRECTION.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/fresh-runner-decision-and-approval-template-after-build-163-correction.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-fresh-runner-decision-and-approval-template-after-build-163-correction-dry-run.sh';
const runnerPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const indexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const firstPaidContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const agentContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const guidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';

const upstreamPaths = [
  'backend/fixtures/native-workflow-demo-roofer/correct-current-runner-recognition-and-test-roofer-e2e-readiness.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-161-runner-command-blocked-evidence.json',
  'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-159-build-156-fresh-chain-wiring-correction-approval-capture.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-build-159-build-156-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-build-156-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-build-156-fresh-chain-wiring-correction.json'
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
function expectNestedEq(obj, parent, key, value) {
  if (!obj[parent] || obj[parent][key] !== value) {
    fail('fixture ' + parent + '.' + key + ' expected ' + value + ' got ' + (obj[parent] && obj[parent][key]));
  }
  pass(parent + '_' + key + '_' + String(value).replace(/[^a-z0-9]+/gi, '_').toLowerCase());
}
function expectArrayIncludes(obj, key, value) {
  if (!Array.isArray(obj[key]) || !obj[key].includes(value)) fail('fixture ' + key + ' missing value ' + value);
  pass(key + '_includes_' + value.replace(/[^a-z0-9]+/gi, '_').toLowerCase());
}

console.log('== Build 164 Fresh Runner Decision And Approval Template After Build 163 Correction Verification ==');

const doc = read(docPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const runner = read(runnerPath);
const index = read(indexPath);
const firstPaidContext = read(firstPaidContextPath);
const agentContext = read(agentContextPath);
const guide = read(guidePath);
const safeReadiness = read(safeReadinessPath);
const aggregate = read(aggregatePath);

mustHave(doc, 'Native Workflow Fixture Fresh Runner Decision And Approval Template After Build 163 Correction', 'packet doc');
mustHave(doc, 'source_of_truth_commit | cf6d8c4', 'packet doc');
mustHave(doc, 'approval_template_status | template_only_not_signed_not_captured_not_granted', 'packet doc');
mustHave(doc, 'jason_signed_approval_status | not_signed', 'packet doc');
mustHave(doc, 'approval_capture_status | not_captured', 'packet doc');
mustHave(doc, 'fresh_pre_run_guard_status | not_created_not_passed', 'packet doc');
mustHave(doc, 'runner_command_attempt_status | not_attempted_by_this_packet', 'packet doc');
mustHave(doc, 'future_command_status | blocked_until_jason_signed_approval_capture_and_fresh_pre_run_guard_after_build_164', 'packet doc');
mustHave(doc, 'Exact working directory | /root/roofleadhq', 'packet doc');
mustHave(doc, 'Exact command | bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh', 'packet doc');
mustHave(doc, 'Exact runner path | scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh', 'packet doc');
mustHave(doc, 'Exact manifest path | backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json', 'packet doc');
mustHave(doc, 'Exact scenario count | 30', 'packet doc');
mustHave(doc, 'Jason must separately sign the exact approval values after Build 164', 'packet doc');
mustHave(doc, 'A fresh pre-run guard packet must pass after signed approval capture', 'packet doc');
mustHave(doc, 'Require separate approval before controlled test-roofer execution', 'packet doc');
mustHave(doc, 'demo_ready_with_live_automation_disabled', 'packet doc');

expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'review_status', 'fresh_runner_decision_and_approval_template_after_build_163_correction_review_only');
expectEq(fixture, 'build_number', 164);
expectEq(fixture, 'source_of_truth_commit', 'cf6d8c4');
expectEq(fixture, 'prior_runner_recognition_correction_commit', 'cf6d8c4');
expectEq(fixture, 'prior_runner_recognition_correction_status', 'closed');
expectEq(fixture, 'prior_post_build_161_blocked_evidence_commit', '3f97a7f');
expectEq(fixture, 'prior_fresh_execution_pre_run_guard_commit', 'dd05289');
expectEq(fixture, 'prior_approval_capture_commit', '46ca819');
expectEq(fixture, 'prior_fresh_decision_commit', '0eefaf3');
expectEq(fixture, 'prior_runner_execution_path_commit', '28b6413');
expectEq(fixture, 'prior_stale_runner_reported_source_of_truth_commit', '0c6abaf');
expectEq(fixture, 'prior_one_time_approval_guard_chain_consumed_by_blocked_build_161_command_attempt', true);
expectEq(fixture, 'fresh_runner_execution_decision_after_build_163_correction_status', 'review_only_no_go_until_signed_approval_and_guard');
expectEq(fixture, 'fresh_runner_execution_decision_gate_decision', 'NO_GO');
expectEq(fixture, 'approval_template_status', 'template_only_not_signed_not_captured_not_granted');
expectEq(fixture, 'jason_signed_approval_status', 'not_signed');
expectEq(fixture, 'approval_capture_status', 'not_captured');
expectEq(fixture, 'fresh_pre_run_guard_status', 'not_created_not_passed');
expectEq(fixture, 'fresh_pre_run_guard_created_by_this_packet', false);
expectEq(fixture, 'fresh_pre_run_guard_passed_by_this_packet', false);
expectEq(fixture, 'runner_command_attempt_status', 'not_attempted_by_this_packet');
expectEq(fixture, 'command_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_command_invoked_by_this_packet', false);
expectEq(fixture, 'runner_command_rerun_by_this_packet', false);
expectEq(fixture, 'new_approval_capture_created_by_this_packet', false);
expectEq(fixture, 'approval_granted_by_this_packet', false);
expectEq(fixture, 'immediate_rerun_allowed', false);
expectEq(fixture, 'runner_command_rerun_allowed', false);
expectEq(fixture, 'future_command_status', 'blocked_until_jason_signed_approval_capture_and_fresh_pre_run_guard_after_build_164');
expectEq(fixture, 'exact_working_directory', '/root/roofleadhq');
expectEq(fixture, 'exact_command', 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh');
expectEq(fixture, 'exact_runner_path', 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh');
expectEq(fixture, 'exact_manifest_path', 'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json');
expectEq(fixture, 'exact_scenario_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectEq(fixture, 'controlled_test_roofer_e2e_status', 'review_only_not_approved_not_run');
expectEq(fixture, 'controlled_test_roofer_e2e_approved', false);
expectEq(fixture, 'controlled_test_roofer_e2e_run_by_this_packet', false);
expectEq(fixture, 'controlled_real_roofer_validation_allowed', false);
expectEq(fixture, 'test_roofer_e2e_acceleration_checklist_status', 'review_only');
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

for (const [key, value] of Object.entries({
  template_status: 'template_only_not_signed_not_captured_not_granted',
  approval_scope: 'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_164_signed_approval_and_fresh_guard',
  exact_working_directory: '/root/roofleadhq',
  exact_command: 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  exact_runner_path: 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  exact_manifest_path: 'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json',
  exact_scenario_count: 30,
  sandbox_test_mode_only: true,
  one_time_attempt_only_after_fresh_guard: true,
  no_live_activation: true,
  no_real_homeowner_contact: true,
  no_real_roofer_contact_unless_separately_approved: true,
  no_production_supabase_writes: true,
  no_production_data_access: true,
  no_schema_auth_rls_security_changes: true,
  no_billing_payment_deposit_quote_estimate_invoice_automation: true,
  no_public_live_automation: true,
  no_credential_secret_exposure: true
})) {
  expectNestedEq(fixture, 'approval_template', key, value);
}

for (const step of [
  'build_164_closes_decision_template_only',
  'jason_must_separately_sign_exact_approval_values_after_build_164',
  'fresh_approval_capture_required_after_jason_signature',
  'fresh_pre_run_guard_required_after_signed_approval_capture',
  'exact_runner_command_can_be_attempted_once_only_after_fresh_guard'
]) {
  expectArrayIncludes(fixture, 'next_step_sequence', step);
}

for (const item of [
  'identify_controlled_test_roofer',
  'confirm_sandbox_test_mode_contact_values',
  'confirm_service_area_trade_timezone',
  'confirm_evidence_workspace',
  'confirm_operator_owner',
  'confirm_stop_conditions',
  'prepare_validation_evidence_review',
  'require_separate_approval_before_any_real_contact',
  'require_separate_approval_before_controlled_test_roofer_execution'
]) {
  expectArrayIncludes(fixture, 'test_roofer_e2e_acceleration_checklist', item);
}

for (const upstream of upstreamPaths) {
  read(upstream);
  pass('upstream_present_' + path.basename(upstream).replace(/[^a-z0-9]+/gi, '_'));
}

mustHave(wrapper, 'does not invoke the actual external/sandbox validation runner', 'wrapper');
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-fresh-runner-decision-and-approval-template-after-build-163-correction-readonly.js', 'wrapper');
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual runner');
}
pass('wrapper_does_not_invoke_actual_runner_command');

mustHave(runner, 'source_of_truth_commit: cf6d8c4', 'runner');
mustHave(runner, 'fresh_runner_execution_decision_after_build_163_correction_status: review_only_no_go_until_signed_approval_and_guard', 'runner');
mustHave(runner, 'approval_template_status: template_only_not_signed_not_captured_not_granted', 'runner');
mustHave(runner, 'jason_signed_approval_status: not_signed', 'runner');
mustHave(runner, 'fresh_pre_run_guard_status: not_created_not_passed', 'runner');
mustHave(runner, 'future_command_status: blocked_until_jason_signed_approval_capture_and_fresh_pre_run_guard_after_build_164', 'runner');
mustHave(runner, 'EXIT: non-zero (blocked)', 'runner');

for (const text of [index, firstPaidContext, agentContext, guide, safeReadiness, aggregate]) {
  if (!text.includes('Native Workflow Fixture Fresh Runner Decision And Approval Template After Build 163 Correction')) {
    fail('context/index wiring missing Build 164 title');
  }
  if (!text.includes('native workflow fixture fresh runner decision and approval template after build 163 correction')) {
    fail('context/index wiring missing normalized Build 164 title');
  }
}
pass('docs_and_context_wiring_present');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

const combined = doc + '\n' + JSON.stringify(fixture, null, 2);
const forbidden = [
  '"jason_signed_approval_status": "signed"',
  '"approval_capture_status": "captured"',
  '"fresh_pre_run_guard_status": "passed"',
  '"fresh_pre_run_guard_created_by_this_packet": true',
  '"fresh_pre_run_guard_passed_by_this_packet": true',
  '"runner_command_attempt_status": "attempted"',
  '"runner_command_invoked_by_this_packet": true',
  '"runner_command_rerun_by_this_packet": true',
  '"new_approval_capture_created_by_this_packet": true',
  '"approval_granted_by_this_packet": true',
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
  '| approval_capture_status | captured |',
  '| fresh_pre_run_guard_status | passed |',
  '| live_activation_approval_status | granted |',
  '| approved_for_activation_now | true |'
];
for (const pattern of forbidden) {
  if (combined.includes(pattern)) fail('forbidden approval/activation pattern present: ' + pattern);
}
pass('safety_boundaries_no_approval_guard_runner_live_external_or_production_activation_detected');

console.log('PASS: Build 164 decision/template packet verified');
console.log('PASS: Jason approval was not signed, captured, or granted by this packet');
console.log('PASS: fresh pre-run guard was not created or passed by this packet');
console.log('PASS: runner direct execution was not run by this packet');
console.log('PASS: actual validation remains 0 captured / 0 passed / 30 missing');
console.log('PASS: controlled test-roofer E2E is review-only, not approved, and not run');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log('PASS: Native Workflow Fixture Fresh Runner Decision And Approval Template After Build 163 Correction verified (' + passCount + ' assertions).');
