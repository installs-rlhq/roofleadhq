#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CORRECT_CURRENT_RUNNER_RECOGNITION_AND_TEST_ROOFER_E2E_READINESS.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/correct-current-runner-recognition-and-test-roofer-e2e-readiness.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-correct-current-runner-recognition-and-test-roofer-e2e-readiness-dry-run.sh';
const runnerPath = 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const indexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const firstPaidContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const agentContextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const guidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';

const upstreamPaths = [
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-161-runner-command-blocked-evidence.json',
  'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-159-build-156-fresh-chain-wiring-correction-approval-capture.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-build-159-build-156-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-build-156-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-build-156-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-156-runner-command-blocked-evidence.json'
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
function expectArrayIncludes(obj, key, value) {
  if (!Array.isArray(obj[key]) || !obj[key].includes(value)) fail('fixture ' + key + ' missing value ' + value);
  pass(key + '_includes_' + value.replace(/[^a-z0-9]+/gi, '_').toLowerCase());
}
function expectNestedEq(obj, parent, key, value) {
  if (!obj[parent] || obj[parent][key] !== value) {
    fail('fixture ' + parent + '.' + key + ' expected ' + value + ' got ' + (obj[parent] && obj[parent][key]));
  }
  pass(parent + '_' + key + '_' + String(value).replace(/[^a-z0-9]+/gi, '_').toLowerCase());
}

console.log('== Build 163 Correct Current Runner Recognition And Test Roofer E2E Readiness Verification ==');

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

mustHave(doc, 'Native Workflow Fixture Correct Current Runner Recognition And Test Roofer E2E Readiness', 'packet doc');
mustHave(doc, 'source_of_truth_commit | 3f97a7f', 'packet doc');
mustHave(doc, 'prior_stale_runner_reported_source_of_truth_commit | 0c6abaf', 'packet doc');
mustHave(doc, 'runner_recognizes_build_158_159_160_161_162_chain | true', 'packet doc');
mustHave(doc, 'runner_stale_pre_build_158_159_160_161_state_retired_as_historical | true', 'packet doc');
mustHave(doc, 'Immediate rerun is disallowed', 'packet doc');
mustHave(doc, 'fresh decision, fresh approval capture, and fresh pre-run guard', 'packet doc');
mustHave(doc, 'No real homeowner contact until separately approved', 'packet doc');
mustHave(doc, 'No production Supabase writes', 'packet doc');
mustHave(doc, 'No live calendar booking', 'packet doc');
mustHave(doc, 'No live SMS, email, or calls', 'packet doc');
mustHave(doc, 'No billing, payment, deposit, quote, estimate, or invoice automation', 'packet doc');
mustHave(doc, 'validation evidence exists', 'packet doc');
mustHave(doc, 'demo_ready_with_live_automation_disabled', 'packet doc');

expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'review_status', 'correct_current_runner_recognition_and_test_roofer_e2e_readiness_review_only');
expectEq(fixture, 'build_number', 163);
expectEq(fixture, 'source_of_truth_commit', '3f97a7f');
expectEq(fixture, 'prior_post_build_161_blocked_evidence_commit', '3f97a7f');
expectEq(fixture, 'prior_fresh_execution_pre_run_guard_commit', 'dd05289');
expectEq(fixture, 'prior_approval_capture_commit', '46ca819');
expectEq(fixture, 'prior_fresh_decision_commit', '0eefaf3');
expectEq(fixture, 'prior_runner_execution_path_commit', '28b6413');
expectEq(fixture, 'prior_post_build_156_blocked_evidence_commit', '5dde6ce');
expectEq(fixture, 'prior_stale_runner_reported_source_of_truth_commit', '0c6abaf');
expectEq(fixture, 'runner_recognizes_build_158_159_160_161_162_chain', true);
expectEq(fixture, 'runner_recognized_build_158_path_correction_commit', '28b6413');
expectEq(fixture, 'runner_recognized_build_159_fresh_decision_commit', '0eefaf3');
expectEq(fixture, 'runner_recognized_build_160_approval_capture_commit', '46ca819');
expectEq(fixture, 'runner_recognized_build_161_pre_run_guard_commit', 'dd05289');
expectEq(fixture, 'runner_recognized_build_162_blocked_evidence_commit', '3f97a7f');
expectEq(fixture, 'runner_stale_pre_build_158_159_160_161_state_retired_as_historical', true);
expectEq(fixture, 'runner_old_build_146_chain_status', 'historical_only_not_current');
expectEq(fixture, 'stale_0c6abaf_current_state_allowed', false);
expectEq(fixture, 'approval_guard_chain_consumed', true);
expectEq(fixture, 'prior_one_time_approval_guard_chain_consumed_by_blocked_build_161_command_attempt', true);
expectEq(fixture, 'immediate_rerun_allowed', false);
expectEq(fixture, 'runner_command_rerun_allowed', false);
expectEq(fixture, 'fresh_decision_required_after_build_163_correction', true);
expectEq(fixture, 'fresh_approval_capture_required_after_build_163_correction', true);
expectEq(fixture, 'fresh_pre_run_guard_required_after_build_163_correction', true);
expectEq(fixture, 'future_command_status', 'blocked_until_fresh_decision_fresh_approval_capture_and_fresh_pre_run_guard_after_build_163_correction');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'command_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_command_invoked_by_this_packet', false);
expectEq(fixture, 'runner_command_rerun_by_this_packet', false);
expectEq(fixture, 'new_approval_chain_created_by_this_packet', false);
expectEq(fixture, 'new_pre_run_guard_created_by_this_packet', false);
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectEq(fixture, 'validation_evidence_required_before_controlled_test_roofer_execution', true);
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

for (const field of [
  'test_roofer_id',
  'test_roofer_company_name',
  'test_roofer_contact_name',
  'test_roofer_test_mode_channel',
  'test_roofer_service_area',
  'test_roofer_trade',
  'test_roofer_timezone',
  'test_roofer_lead_intake_source',
  'test_roofer_sandbox_contact_values',
  'test_roofer_operator_owner',
  'test_roofer_evidence_workspace',
  'test_roofer_stop_conditions'
]) {
  expectArrayIncludes(fixture, 'required_test_roofer_fields', field);
}

for (const checkpoint of [
  'validation_evidence_captured_before_test_roofer_execution',
  'test_roofer_identity_reviewed',
  'sandbox_contact_values_reviewed',
  'channel_boundaries_reviewed',
  'stop_conditions_reviewed',
  'separate_approval_required_for_any_real_contact'
]) {
  expectArrayIncludes(fixture, 'operator_review_checkpoints', checkpoint);
}

for (const key of [
  'test_mode_sandbox_channels_only',
  'no_real_homeowner_contact_until_separately_approved',
  'no_production_supabase_writes',
  'no_live_calendar_booking',
  'no_live_sms_email_calls',
  'no_billing_payment_automation',
  'no_public_live_routes_webhooks_cron_schedulers_dispatchers'
]) {
  expectNestedEq(fixture, 'test_mode_sandbox_channel_boundaries', key, true);
}

for (const upstream of upstreamPaths) {
  read(upstream);
  pass('upstream_present_' + path.basename(upstream).replace(/[^a-z0-9]+/gi, '_'));
}

mustHave(wrapper, 'does not invoke the actual external/sandbox validation runner', 'wrapper');
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-correct-current-runner-recognition-and-test-roofer-e2e-readiness-readonly.js', 'wrapper');
if (wrapper.includes('bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke the actual runner');
}
pass('wrapper_does_not_invoke_actual_runner_command');

mustHave(runner, 'source_of_truth_commit: 3f97a7f', 'runner');
mustHave(runner, 'runner_recognizes_build_158_159_160_161_162_chain: true', 'runner');
mustHave(runner, 'prior_stale_runner_reported_source_of_truth_commit: 0c6abaf (historical only, not current)', 'runner');
mustHave(runner, 'immediate_rerun_allowed: false', 'runner');
mustHave(runner, 'fresh_decision_required_after_build_163_correction: true', 'runner');
mustHave(runner, 'fresh_approval_capture_required_after_build_163_correction: true', 'runner');
mustHave(runner, 'fresh_pre_run_guard_required_after_build_163_correction: true', 'runner');
mustHave(runner, 'EXIT: non-zero (blocked)', 'runner');

for (const text of [index, firstPaidContext, agentContext, guide, safeReadiness, aggregate]) {
  if (!text.includes('Native Workflow Fixture Correct Current Runner Recognition And Test Roofer E2E Readiness')) {
    fail('context/index wiring missing Build 163 title');
  }
  if (!text.includes('native workflow fixture correct current runner recognition and test roofer e2e readiness')) {
    fail('context/index wiring missing normalized Build 163 title');
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
  '"production_data_access_approval_status": "granted"',
  '"production_supabase_write_approval_status": "granted"',
  '"schema_auth_rls_security_change_approval_status": "granted"',
  '"live_activation_approval_status": "granted"',
  '"real_homeowner_contact_approval_status": "granted"',
  '"sms_email_calls_calendar_booking_approval_status": "granted"',
  '"billing_payment_automation_approval_status": "granted"',
  '"public_live_automation_approval_status": "granted"',
  '"approved_for_activation_now": true',
  '"runner_command_invoked_by_this_packet": true',
  '"runner_command_rerun_by_this_packet": true',
  '"new_approval_chain_created_by_this_packet": true',
  '"new_pre_run_guard_created_by_this_packet": true',
  '"controlled_test_roofer_e2e_approved": true',
  '"controlled_test_roofer_e2e_run_by_this_packet": true',
  '| live_activation_approval_status | granted |',
  '| approved_for_activation_now | true |'
];
for (const pattern of forbidden) {
  if (combined.includes(pattern)) fail('forbidden activation pattern present: ' + pattern);
}
pass('safety_boundaries_no_live_external_or_production_activation_detected');

console.log('PASS: Build 163 review-only correction packet verified');
console.log('PASS: runner direct execution was not run by this packet');
console.log('PASS: actual validation remains 0 captured / 0 passed / 30 missing');
console.log('PASS: controlled test-roofer E2E is review-only, not approved, and not run');
console.log('PASS: safety_status remains demo_ready_with_live_automation_disabled');
console.log('PASS: Native Workflow Fixture Correct Current Runner Recognition And Test Roofer E2E Readiness verified (' + passCount + ' assertions).');
