#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const packetDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_BUILD_151_FRESH_CHAIN_WIRING_CORRECTION.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-build-151-fresh-chain-wiring-correction.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-runner-execution-path-after-build-151-fresh-chain-wiring-correction-dry-run.sh';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';

const upstreamPaths = [
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-151-runner-command-blocked-evidence.json',
  'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-149-build-146-fresh-chain-wiring-correction-approval-capture.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-build-149-build-146-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-build-146-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-build-146-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-146-runner-command-blocked-evidence.json',
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-scaffolding-build.json',
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

const doc = read(packetDocPath);
const fixture = readJson(fixturePath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const index = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgent = read(contextAgentGrokPath);
const guide = read(businessGuidePath);
const safeReadiness = read(safeReadinessPath);

mustHave(doc, 'Native Workflow Fixture Runner Execution Path After Build 151 Fresh Chain Wiring Correction', 'packet doc');
mustHave(doc, 'source_of_truth_commit | ac96217', 'packet doc');
mustHave(doc, 'runner_output_source_of_truth_commit_observed_before_correction | 0c6abaf', 'packet doc');
mustHave(doc, 'runner_output_state_after_build_151_status | stale_pre_build_148_149_150_151_state_detected', 'packet doc');
mustHave(doc, 'runner_execution_path_after_build_151_fresh_chain_wiring_gap_status | detected', 'packet doc');
mustHave(doc, 'runner_execution_path_after_build_151_fresh_chain_wiring_correction_status | design_or_corrected_review_only', 'packet doc');
mustHave(doc, 'runner_command_path_status | corrected_fail_closed_direct_invocation_always_blocked_pending_fresh_decision_after_build_151_fresh_chain_wiring_correction', 'packet doc');
mustHave(doc, 'future_command_status | blocked_until_fresh_decision_and_fresh_pre_run_guard_pass_after_build_151_fresh_chain_wiring_correction', 'packet doc');
mustHave(doc, 'does **not** rerun the runner', 'packet doc');
mustHave(doc, 'fresh runner-execution decision/template after Build 151', 'packet doc');

expectEq(fixture, 'source_of_truth_commit', 'ac96217');
expectEq(fixture, 'prior_post_build_151_blocked_evidence_commit', 'ac96217');
expectEq(fixture, 'prior_fresh_execution_pre_run_guard_after_build_149_build_146_fresh_chain_wiring_correction_approval_capture_commit', '01a27cf');
expectEq(fixture, 'prior_capture_fresh_runner_execution_approval_after_build_149_build_146_fresh_chain_wiring_correction_commit', '09bf972');
expectEq(fixture, 'prior_fresh_runner_execution_decision_after_build_146_fresh_chain_wiring_correction_commit', 'df9fee3');
expectEq(fixture, 'prior_runner_execution_path_after_build_146_fresh_chain_wiring_correction_commit', '135b26c');
expectEq(fixture, 'prior_post_build_146_blocked_evidence_commit', '0c6abaf');
expectEq(fixture, 'prior_exact_command_attempt_after_build_151_status', 'attempted_blocked_nonzero');
expectEq(fixture, 'prior_exact_command_exit_status', 'nonzero_blocked');
expectEq(fixture, 'prior_command_attempt_consumption_status', 'consumed_by_blocked_fail_closed_result_after_build_151_guard');
expectEq(fixture, 'runner_output_source_of_truth_commit_observed_before_correction', '0c6abaf');
expectEq(fixture, 'runner_output_state_after_build_151_status', 'stale_pre_build_148_149_150_151_state_detected');
expectEq(fixture, 'runner_did_not_recognize_build_148_runner_execution_path_after_build_146_fresh_chain_wiring_correction_status_before_correction', true);
expectEq(fixture, 'runner_did_not_recognize_build_149_fresh_decision_after_build_146_fresh_chain_wiring_correction_status_before_correction', true);
expectEq(fixture, 'runner_did_not_recognize_build_150_approval_capture_after_build_149_build_146_fresh_chain_wiring_correction_status_before_correction', true);
expectEq(fixture, 'runner_did_not_recognize_build_151_pre_run_guard_after_build_149_build_146_fresh_chain_wiring_correction_status_before_correction', true);
expectEq(fixture, 'runner_execution_path_after_build_151_fresh_chain_wiring_gap_status', 'detected');
expectEq(fixture, 'runner_execution_path_after_build_151_fresh_chain_wiring_correction_status', 'design_or_corrected_review_only');
expectEq(fixture, 'stale_build_147_era_0c6abaf_primary_state_removed', true);
expectEq(fixture, 'stale_build_148_149_150_151_non_recognition_removed', true);
expectEq(fixture, 'fresh_decision_required_after_build_151_fresh_chain_wiring_correction', true);
expectEq(fixture, 'fresh_pre_run_guard_required_after_build_151_fresh_chain_wiring_correction', true);
expectEq(fixture, 'no_immediate_runner_invocation_by_blocked_path', true);
expectEq(fixture, 'future_command_status', 'blocked_until_fresh_decision_and_fresh_pre_run_guard_pass_after_build_151_fresh_chain_wiring_correction');
expectEq(fixture, 'command_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_command_rerun_by_this_packet', false);
expectEq(fixture, 'runner_command_invoked_by_this_packet', false);
expectEq(fixture, 'external_calls_made_by_this_packet', false);
expectEq(fixture, 'credentials_accessed_by_this_packet', false);
expectEq(fixture, 'production_data_accessed_by_this_packet', false);
expectEq(fixture, 'real_contact_made_by_this_packet', false);
expectEq(fixture, 'sms_email_calls_calendar_booking_performed_by_this_packet', false);
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectEq(fixture, 'safety_status', 'demo_ready_with_live_automation_disabled');
expectEq(fixture, 'controlled_real_roofer_validation_allowed', false);

for (const upstream of upstreamPaths) {
  read(upstream);
  pass('upstream_present_' + path.basename(upstream).replace(/[^a-z0-9]+/gi, '_'));
}

if (wrapper.includes('actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke actual runner');
}
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-runner-execution-path-after-build-151-fresh-chain-wiring-correction-readonly.js', 'wrapper');

for (const text of [aggregate, index, contextFirstPaid, contextAgent, guide, safeReadiness]) {
  if (!text.includes('Native Workflow Fixture Runner Execution Path After Build 151 Fresh Chain Wiring Correction') || !text.includes('native workflow fixture runner execution path after build 151 fresh chain wiring correction')) {
    fail('docs/context wiring missing title or normalized title');
  }
}
pass('docs_and_context_wiring_present');

const readiness = buildStatus({ rootDir: root, silent: true });
if (readiness.summary !== 'demo_ready_with_live_automation_disabled') {
  fail('pilot readiness summary changed: ' + readiness.summary);
}
pass('demo_ready_with_live_automation_disabled_preserved');

const forbidden = [
  'live_activation_approval_status: granted',
  'production_data_access_approval_status: granted',
  'production_supabase_write_approval_status: granted',
  'schema_auth_rls_security_change_approval_status: granted',
  'real_homeowner_contact_approval_status: granted',
  'real_roofer_contact_approval_status: granted',
  'billing_payment_automation_approval_status: granted'
];
const combined = doc + '\n' + JSON.stringify(fixture, null, 2);
for (const pattern of forbidden) {
  if (combined.includes(pattern)) fail('forbidden pattern present: ' + pattern);
}
pass('safety_boundaries_no_grants_detected');

console.log('PASS: Native Workflow Fixture Runner Execution Path After Build 151 Fresh Chain Wiring Correction verified (' + passCount + ' assertions).');
