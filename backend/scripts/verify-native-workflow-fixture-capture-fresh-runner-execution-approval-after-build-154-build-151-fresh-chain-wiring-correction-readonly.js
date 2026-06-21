#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const packetDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_154_BUILD_151_FRESH_CHAIN_WIRING_CORRECTION.md';
const fixturePath = 'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-build-154-build-151-fresh-chain-wiring-correction.json';
const wrapperPath = 'scripts/run-native-workflow-fixture-capture-fresh-runner-execution-approval-after-build-154-build-151-fresh-chain-wiring-correction-dry-run.sh';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const safeReadinessPath = 'scripts/verify-safe-readiness.sh';

const upstreamPaths = [
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-build-151-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-build-151-fresh-chain-wiring-correction.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-151-runner-command-blocked-evidence.json',
  'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-149-build-146-fresh-chain-wiring-correction-approval-capture.json',
  'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-build-149-build-146-fresh-chain-wiring-correction.json',
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

mustHave(doc, 'Native Workflow Fixture Capture Fresh Runner Execution Approval After Build 154 Build 151 Fresh Chain Wiring Correction', 'packet doc');
mustHave(doc, 'source_of_truth_commit | 7e54c00', 'packet doc');
mustHave(doc, 'fresh_runner_execution_approval_capture_status | captured', 'packet doc');
mustHave(doc, 'fresh_runner_execution_jason_signed_approval_status | signed', 'packet doc');
mustHave(doc, 'fresh_runner_execution_exact_values_accepted_count | 24', 'packet doc');
mustHave(doc, 'fresh_runner_execution_exact_values_approved_count | 24', 'packet doc');
mustHave(doc, 'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_151_fresh_chain_wiring_correction', 'packet doc');
mustHave(doc, 'Timestamp: 06/20/2026 at 9:39pm MST', 'packet doc');
mustHave(doc, 'does **not** run a fresh pre-run guard', 'packet doc');
mustHave(doc, 'does **not** invoke the runner', 'packet doc');
mustHave(doc, 'fresh execution pre-run guard after Build 154 Build 151', 'packet doc');

expectEq(fixture, 'source_of_truth_commit', '7e54c00');
expectEq(fixture, 'prior_fresh_runner_execution_decision_after_build_151_fresh_chain_wiring_correction_commit', '7e54c00');
expectEq(fixture, 'prior_runner_execution_path_after_build_151_fresh_chain_wiring_correction_commit', 'ae2a380');
expectEq(fixture, 'prior_post_build_151_blocked_evidence_commit', 'ac96217');
expectEq(fixture, 'approval_scope', 'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_151_fresh_chain_wiring_correction');
expectEq(fixture, 'fresh_runner_execution_scope_approved', 'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_151_fresh_chain_wiring_correction');
expectEq(fixture, 'signed_approval_timestamp', '06/20/2026 9:39pm MST');
expectEq(fixture, 'fresh_runner_execution_approval_signature_name', 'Jason Lohse');
expectEq(fixture, 'fresh_runner_execution_signed_by', 'Jason Lohse');
expectEq(fixture, 'fresh_runner_execution_signed_at', '06/20/2026 9:39pm MST');
expectEq(fixture, 'fresh_runner_execution_approval_capture_status', 'captured');
expectEq(fixture, 'fresh_runner_execution_jason_signed_approval_status', 'signed');
expectEq(fixture, 'fresh_runner_execution_exact_values_required_count', 24);
expectEq(fixture, 'fresh_runner_execution_exact_values_accepted_count', 24);
expectEq(fixture, 'fresh_runner_execution_exact_values_approved_count', 24);
expectEq(fixture, 'fresh_runner_execution_approval_status', 'granted_scoped_one_time_pending_fresh_execution_pre_run_guard_after_build_154_build_151_fresh_chain_wiring_correction');
expectEq(fixture, 'external_sandbox_calls_approval_status', 'granted_scoped_test_mode_only_pending_fresh_guard');
expectEq(fixture, 'credentials_access_approval_status', 'granted_scoped_test_mode_only_no_secret_logging_pending_fresh_guard');
expectEq(fixture, 'test_account_use_approval_status', 'granted_scoped_test_accounts_only_pending_fresh_guard');
expectEq(fixture, 'production_data_access_approval_status', 'not_granted');
expectEq(fixture, 'production_supabase_write_approval_status', 'not_granted');
expectEq(fixture, 'schema_auth_rls_security_change_approval_status', 'not_granted');
expectEq(fixture, 'live_activation_approval_status', 'not_granted');
expectEq(fixture, 'real_homeowner_contact_approval_status', 'not_granted');
expectEq(fixture, 'real_roofer_contact_approval_status', 'not_granted_unless_separately_approved');
expectEq(fixture, 'sms_email_calls_calendar_booking_approval_status', 'not_granted');
expectEq(fixture, 'billing_payment_automation_approval_status', 'not_granted');
expectEq(fixture, 'approved_for_activation_now', false);
expectEq(fixture, 'command_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_execution_status', 'not_run_by_this_packet');
expectEq(fixture, 'runner_command_invoked_by_this_packet', false);
expectEq(fixture, 'fresh_execution_pre_run_guard_status', 'not_passed_by_this_packet');
expectEq(fixture, 'actual_30_scenario_external_validation_captured_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_passed_count', 0);
expectEq(fixture, 'actual_30_scenario_external_validation_missing_count', 30);
expectEq(fixture, 'actual_30_scenario_external_validation_status', 'not_captured_by_this_run');
expectEq(fixture, 'future_command_status', 'blocked_until_fresh_execution_pre_run_guard_passes_after_build_154_build_151_fresh_chain_wiring_correction_approval_capture');
expectEq(fixture, 'safety_status', 'demo_ready_with_live_automation_disabled');
expectEq(fixture, 'controlled_real_roofer_validation_allowed', false);

for (const upstream of upstreamPaths) {
  read(upstream);
  pass('upstream_present_' + path.basename(upstream).replace(/[^a-z0-9]+/gi, '_'));
}

if (wrapper.includes('actual-external-sandbox-30-scenario-validation.sh')) {
  fail('wrapper must not invoke actual runner');
}
mustHave(wrapper, 'node backend/scripts/verify-native-workflow-fixture-capture-fresh-runner-execution-approval-after-build-154-build-151-fresh-chain-wiring-correction-readonly.js', 'wrapper');

for (const text of [aggregate, index, contextFirstPaid, contextAgent, guide, safeReadiness]) {
  if (!text.includes('Native Workflow Fixture Capture Fresh Runner Execution Approval After Build 154 Build 151 Fresh Chain Wiring Correction') || !text.includes('native workflow fixture capture fresh runner execution approval after build 154 build 151 fresh chain wiring correction')) {
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

console.log('PASS: Native Workflow Fixture Capture Fresh Runner Execution Approval After Build 154 Build 151 Fresh Chain Wiring Correction verified (' + passCount + ' assertions).');
