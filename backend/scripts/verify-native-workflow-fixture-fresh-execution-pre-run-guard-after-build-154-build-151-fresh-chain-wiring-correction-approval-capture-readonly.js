#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const packetDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_154_BUILD_151_FRESH_CHAIN_WIRING_CORRECTION_APPROVAL_CAPTURE.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-154-build-151-fresh-chain-wiring-correction-approval-capture.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-154-build-151-fresh-chain-wiring-correction-approval-capture-dry-run.sh';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';

const upstreamPaths = [
  'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-build-154-build-151-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-build-151-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-build-151-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-151-runner-command-blocked-evidence.json',
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-scaffolding-build.json',
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json',
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh'
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

mustHave(doc, 'Native Workflow Fixture Fresh Execution Pre Run Guard After Build 154 Build 151 Fresh Chain Wiring Correction Approval Capture', 'packet doc');
mustHave(doc, 'source_of_truth_commit | 8a319df', 'packet doc');
mustHave(doc, 'fresh_execution_pre_run_guard_status | passed', 'packet doc');
mustHave(doc, 'fresh_execution_pre_run_guard_checks_passed_count | 30', 'packet doc');
mustHave(doc, 'fresh_execution_pre_run_guard_failed_count | 0', 'packet doc');
mustHave(doc, 'ready_for_exact_approved_runner_execution_command_after_build_154_build_151_fresh_chain_wiring_correction_guard_review_only', 'packet doc');
mustHave(doc, 'does **not** invoke the approved runner command', 'packet doc');
mustHave(doc, 'This packet itself did not run that command.', 'packet doc');

expectEq(fixture, 'source_of_truth_commit', '8a319df');
expectEq(fixture, 'packet_status', 'review_only');
expectEq(fixture, 'fresh_execution_pre_run_guard_packet_status', 'passed_for_scoped_one_time_fresh_runner_execution_after_build_154_build_151_fresh_chain_wiring_correction_review_only');
expectEq(fixture, 'fresh_execution_pre_run_guard_does_not_equal_runner_execution', true);
expectEq(fixture, 'fresh_execution_pre_run_guard_does_not_invoke_approved_command', true);
expectEq(fixture, 'approval_scope', 'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_151_fresh_chain_wiring_correction');
expectEq(fixture, 'signed_approval_timestamp', '06/20/2026 9:39pm MST');
expectEq(fixture, 'fresh_runner_execution_signed_by', 'Jason Lohse');
expectEq(fixture, 'runner_command_path_status', 'corrected_fail_closed_ready_for_exact_approved_execution_after_build_154_build_151_fresh_chain_wiring_correction_guard');
expectEq(fixture, 'exact_working_directory', '/root/roofleadhq');
expectEq(fixture, 'exact_command', 'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh');
expectEq(fixture, 'exact_runner_path', 'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh');
expectEq(fixture, 'exact_manifest_path', 'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json');
expectEq(fixture, 'exact_scenario_count', 30);
expectEq(fixture, 'fresh_runner_execution_approval_capture_status', 'captured');
expectEq(fixture, 'fresh_runner_execution_jason_signed_approval_status', 'signed');
expectEq(fixture, 'fresh_runner_execution_exact_values_required_count', 24);
expectEq(fixture, 'fresh_runner_execution_exact_values_accepted_count', 24);
expectEq(fixture, 'fresh_runner_execution_exact_values_approved_count', 24);
expectEq(fixture, 'external_sandbox_calls_approval_status', 'granted_scoped_test_mode_only_after_fresh_guard');
expectEq(fixture, 'credentials_access_approval_status', 'granted_scoped_test_mode_only_no_secret_logging_after_fresh_guard');
expectEq(fixture, 'test_account_use_approval_status', 'granted_scoped_test_accounts_only_after_fresh_guard');
expectEq(fixture, 'production_data_access_approval_status', 'not_granted');
expectEq(fixture, 'production_supabase_write_approval_status', 'not_granted');
expectEq(fixture, 'schema_auth_rls_security_change_approval_status', 'not_granted');
expectEq(fixture, 'live_activation_approval_status', 'not_granted');
expectEq(fixture, 'real_homeowner_contact_approval_status', 'not_granted');
expectEq(fixture, 'billing_payment_automation_approval_status', 'not_granted');
expectEq(fixture, 'approved_for_activation_now', false);
expectEq(fixture, 'fresh_execution_pre_run_guard_status', 'passed');
expectEq(fixture, 'fresh_execution_pre_run_guard_checks_required_count', 30);
expectEq(fixture, 'fresh_execution_pre_run_guard_checks_passed_count', 30);
expectEq(fixture, 'fresh_execution_pre_run_guard_failed_count', 0);
expectEq(fixture, 'runner_readiness_validation_status', 'passed');
expectEq(fixture, 'manifest_readiness_validation_status', 'passed');
expectEq(fixture, 'evidence_output_path_readiness_status', 'passed');
expectEq(fixture, 'no_stale_runner_state_status', 'passed');
expectEq(fixture, 'no_immediate_runner_invocation_by_this_packet', true);
expectEq(fixture, 'command_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_command_invoked_by_this_packet', false);
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectEq(fixture, 'future_command_status', 'ready_for_exact_approved_runner_execution_command_after_build_154_build_151_fresh_chain_wiring_correction_guard_review_only');
expectEq(fixture, 'safety_status', 'demo_ready_with_live_automation_disabled');
expectEq(fixture, 'controlled_real_roofer_validation_allowed', false);
expectEq(fixture, 'prior_capture_fresh_runner_execution_approval_after_build_154_build_151_fresh_chain_wiring_correction_commit', '8a319df');
expectEq(fixture, 'prior_fresh_runner_execution_decision_after_build_151_fresh_chain_wiring_correction_commit', '7e54c00');
expectEq(fixture, 'prior_runner_execution_path_after_build_151_fresh_chain_wiring_correction_commit', 'ae2a380');
expectEq(fixture, 'prior_post_build_151_blocked_evidence_commit', 'ac96217');

if (!Array.isArray(fixture.guard_checks)) fail('guard_checks must be an array');
if (fixture.guard_checks.length !== 30) fail('expected 30 guard checks, got ' + fixture.guard_checks.length);
if (fixture.guard_checks.some(check => check.status !== 'passed')) fail('all guard checks must pass');
pass('all_30_guard_checks_passed');

for (const upstream of upstreamPaths) {
  read(upstream);
  pass('upstream_present_' + path.basename(upstream).replace(/[^a-z0-9]+/gi, '_'));
}

if (wrapper.includes('actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke or mention the actual runner command path');
}
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-154-build-151-fresh-chain-wiring-correction-approval-capture-readonly.js', 'wrapper');

for (const text of [aggregate, index, contextFirstPaid, contextAgent, guide, safeReadiness]) {
  if (!text.includes('Native Workflow Fixture Fresh Execution Pre Run Guard After Build 154 Build 151 Fresh Chain Wiring Correction Approval Capture') || !text.includes('native workflow fixture fresh execution pre run guard after build 154 build 151 fresh chain wiring correction approval capture')) {
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
  'sms_email_calls_calendar_booking_approval_status: granted',
  'billing_payment_automation_approval_status: granted',
  'approved_for_activation_now: true'
];
const combined = doc + '\n' + JSON.stringify(fixture, null, 2);
for (const pattern of forbidden) {
  if (combined.includes(pattern)) fail('forbidden pattern present: ' + pattern);
}
pass('safety_boundaries_no_live_or_production_grants_detected');

console.log('PASS: Native Workflow Fixture Fresh Execution Pre Run Guard After Build 154 Build 151 Fresh Chain Wiring Correction Approval Capture verified (' + passCount + ' assertions).');
