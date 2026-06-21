#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const packetDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_161_RUNNER_COMMAND_BLOCKED_EVIDENCE.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-post-build-161-runner-command-blocked-evidence.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-capture-post-build-161-runner-command-blocked-evidence-dry-run.sh';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';

const upstreamPaths = [
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

const doc = read(packetDocPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const index = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgent = read(contextAgentGrokPath);
const guide = read(businessGuidePath);
const safeReadiness = read(safeReadinessPath);

mustHave(doc, 'Native Workflow Fixture Capture Post Build 161 Runner Command Blocked Evidence', 'packet doc');
mustHave(doc, 'source_of_truth_commit | dd05289', 'packet doc');
mustHave(doc, 'runner_command_attempt_status | attempted_blocked_nonzero', 'packet doc');
mustHave(doc, 'runner_command_exit_status | nonzero_blocked', 'packet doc');
mustHave(doc, 'runner_reported_source_of_truth_commit | 0c6abaf', 'packet doc');
mustHave(doc, 'runner_stale_state_status | stale_pre_build_158_159_160_161_state_detected', 'packet doc');
mustHave(doc, 'runner did not recognize the Build 158/159/160/161 chain', 'packet doc');
mustHave(doc, 'Immediate rerun is not allowed', 'packet doc');
mustHave(doc, 'demo_ready_with_live_automation_disabled', 'packet doc');

expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'review_status', 'capture_post_build_161_runner_command_blocked_evidence_review_only');
expectEq(fixture, 'build_number', 162);
expectEq(fixture, 'source_of_truth_commit', 'dd05289');
expectEq(fixture, 'prior_fresh_execution_pre_run_guard_commit', 'dd05289');
expectEq(fixture, 'prior_approval_capture_commit', '46ca819');
expectEq(fixture, 'prior_fresh_decision_commit', '0eefaf3');
expectEq(fixture, 'prior_runner_execution_path_commit', '28b6413');
expectEq(fixture, 'prior_post_build_156_blocked_evidence_commit', '5dde6ce');
expectEq(fixture, 'exact_command_attempted_working_directory', '/root/roofleadhq');
expectEq(fixture, 'exact_command_attempted', 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh');
expectEq(fixture, 'runner_command_attempt_status', 'attempted_blocked_nonzero');
expectEq(fixture, 'runner_command_exit_status', 'nonzero_blocked');
expectEq(fixture, 'runner_reported_source_of_truth_commit', '0c6abaf');
expectEq(fixture, 'runner_stale_state_status', 'stale_pre_build_158_159_160_161_state_detected');
expectEq(fixture, 'runner_did_not_recognize_build_158_path_correction', true);
expectEq(fixture, 'runner_did_not_recognize_build_159_fresh_decision', true);
expectEq(fixture, 'runner_did_not_recognize_build_160_approval_capture', true);
expectEq(fixture, 'runner_did_not_recognize_build_161_pre_run_guard', true);
expectEq(fixture, 'runner_recognized_old_build_146_chain', true);
expectEq(fixture, 'approval_guard_chain_consumed', true);
expectEq(fixture, 'runner_command_rerun_allowed', false);
expectEq(fixture, 'command_attempt_count', 1);
expectEq(fixture, 'command_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_command_invoked_by_this_packet', false);
expectEq(fixture, 'runner_command_rerun_by_this_packet', false);
expectEq(fixture, 'new_approval_chain_created_by_this_packet', false);
expectEq(fixture, 'external_calls_made_by_this_packet', false);
expectEq(fixture, 'credentials_accessed_by_this_packet', false);
expectEq(fixture, 'secret_values_logged_by_this_packet', false);
expectEq(fixture, 'production_data_accessed_by_this_packet', false);
expectEq(fixture, 'real_contact_made_by_this_packet', false);
expectEq(fixture, 'sms_email_calls_calendar_booking_performed_by_this_packet', false);
expectEq(fixture, 'evidence_log_written_by_this_packet', false);
expectEq(fixture, 'structured_result_written_by_this_packet', false);
expectEq(fixture, 'production_data_access_approval_status', 'not_granted');
expectEq(fixture, 'production_supabase_write_approval_status', 'not_granted');
expectEq(fixture, 'schema_auth_rls_security_change_approval_status', 'not_granted');
expectEq(fixture, 'live_activation_approval_status', 'not_granted');
expectEq(fixture, 'real_homeowner_contact_approval_status', 'not_granted');
expectEq(fixture, 'real_roofer_contact_approval_status', 'not_granted_unless_separately_approved');
expectEq(fixture, 'billing_payment_automation_approval_status', 'not_granted');
expectEq(fixture, 'public_live_automation_approval_status', 'not_granted');
expectEq(fixture, 'approved_for_activation_now', false);
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectEq(fixture, 'safety_status', 'demo_ready_with_live_automation_disabled');
expectEq(fixture, 'controlled_real_roofer_validation_allowed', false);
expectEq(fixture, 'capture_post_build_161_runner_command_blocked_evidence_packet_status', 'post_build_161_blocked_command_attempt_captured_review_only');
expectEq(fixture, 'capture_post_build_161_runner_command_blocked_evidence_does_not_equal_runner_execution', true);
expectEq(fixture, 'capture_post_build_161_runner_command_blocked_evidence_does_not_rerun_runner', true);
expectEq(fixture, 'capture_post_build_161_runner_command_blocked_evidence_does_not_perform_validation', true);

for (const upstream of upstreamPaths) {
  read(upstream);
  pass('upstream_present_' + path.basename(upstream).replace(/[^a-z0-9]+/gi, '_'));
}

if (wrapper.includes('actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke or mention actual runner command path');
}
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-capture-post-build-161-runner-command-blocked-evidence-readonly.js', 'wrapper');

for (const text of [aggregate, index, contextFirstPaid, contextAgent, guide, safeReadiness]) {
  if (!text.includes('Native Workflow Fixture Capture Post Build 161 Runner Command Blocked Evidence') || !text.includes('native workflow fixture capture post build 161 runner command blocked evidence')) {
    fail('docs/context wiring missing title or normalized title');
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
  '"billing_payment_automation_approval_status": "granted"',
  '"public_live_automation_approval_status": "granted"',
  '"approved_for_activation_now": true',
  '| production_data_access_approval_status | granted |',
  '| production_supabase_write_approval_status | granted |',
  '| schema_auth_rls_security_change_approval_status | granted |',
  '| live_activation_approval_status | granted |',
  '| real_homeowner_contact_approval_status | granted |',
  '| billing_payment_automation_approval_status | granted |',
  '| public_live_automation_approval_status | granted |',
  '| approved_for_activation_now | true |',
  '"runner_command_invoked_by_this_packet": true',
  '"runner_command_rerun_by_this_packet": true',
  '"new_approval_chain_created_by_this_packet": true'
];
for (const pattern of forbidden) {
  if (combined.includes(pattern)) fail('forbidden pattern present: ' + pattern);
}
pass('safety_boundaries_no_live_external_or_production_activation_detected');

console.log('PASS: Native Workflow Fixture Capture Post Build 161 Runner Command Blocked Evidence verified (' + passCount + ' assertions).');
