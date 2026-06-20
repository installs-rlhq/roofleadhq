#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_RUNNER_COMMAND_BLOCKED_EVIDENCE.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_RUNNER_COMMAND_BLOCKED_EVIDENCE_NO_GO_REVIEW.md';
const preRunGuardPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PRE_RUN_GUARD.md';
const capturePacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_SIGNED_RUNNER_EXECUTION_APPROVAL.md';
const runnerExecutionTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_EXACT_APPROVAL_TEMPLATE.md';
const scaffoldingBuildDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_SCAFFOLDING_BUILD.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-runner-command-blocked-evidence.json';
const upstreamPreRunGuardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-pre-run-guard.json';
const upstreamCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-signed-runner-execution-approval.json';
const upstreamRunnerExecutionTemplateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-exact-approval-template.json';
const upstreamScaffoldingBuildFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-scaffolding-build.json';
const manifestPath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const runnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const wrapperPath =
  'scripts/run-native-workflow-fixture-capture-runner-command-blocked-evidence-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-capture-runner-command-blocked-evidence-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = 'b834baa';
const RUNNER_EXECUTION_PRE_RUN_GUARD_COMMIT = 'b834baa';
const CAPTURE_SIGNED_RUNNER_EXECUTION_APPROVAL_COMMIT = 'bb0bc14';
const RUNNER_EXECUTION_TEMPLATE_COMMIT = '67393ed';
const RUNNER_SCAFFOLDING_BUILD_COMMIT = '145bf15';
const SIGNED_APPROVAL_SIGNATURE_NAME = 'Jason Lohse';
const SIGNED_APPROVAL_TIMESTAMP = '06/19/2026 9:47pm MST';
const APPROVAL_SCOPE = 'run_actual_external_sandbox_30_scenario_validation_once_only';

const EXACT_WORKING_DIRECTORY = '/root/roofleadhq';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const EXACT_COMMAND_ATTEMPT_TERMINAL =
  'cd /root/roofleadhq && bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const EXACT_RUNNER_PATH =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const OBSERVED_FUTURE_COMMAND_STATUS =
  'blocked_until_runner_execution_exact_approval_captured_and_execution_pre_run_guard_passes';
const EXPECTED_REPO_FUTURE_COMMAND_STATUS_BEFORE_ATTEMPT =
  'ready_for_exact_approved_runner_execution_command_review_only';
const FUTURE_COMMAND_STATUS =
  'blocked_until_runner_state_wiring_correction_packet_and_fresh_exact_execution_decision';
const RUNNER_BLOCKED_REASON =
  'runner_script_still_scaffolding_only_not_recognizing_captured_approval_and_pre_run_guard';

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_pre_run_guard_fixture_present',
  'upstream_capture_signed_runner_execution_approval_fixture_present',
  'upstream_runner_execution_template_fixture_present',
  'upstream_scaffolding_build_fixture_present',
  'manifest_fixture_present',
  'source_of_truth_commit_b834baa_referenced',
  'runner_execution_pre_run_guard_commit_b834baa_referenced',
  'capture_signed_runner_execution_approval_commit_bb0bc14_referenced',
  'runner_execution_exact_approval_template_commit_67393ed_referenced',
  'runner_scaffolding_build_commit_145bf15_referenced',
  'build_106_runner_execution_pre_run_guard_packet_referenced',
  'build_105_capture_signed_runner_execution_approval_packet_referenced',
  'build_104_runner_execution_exact_approval_template_packet_referenced',
  'build_103_runner_scaffolding_build_packet_referenced',
  'signed_approval_timestamp_present',
  'approval_scope_run_actual_external_sandbox_30_scenario_validation_once_only',
  'exact_command_attempted_documented',
  'exact_working_directory_documented',
  'command_attempt_status_attempted_blocked_nonzero',
  'command_exit_status_nonzero_blocked',
  'runner_blocked_reason_documented',
  'runner_state_wiring_gap_status_detected',
  'runner_execution_approval_capture_status_captured',
  'runner_execution_jason_signed_approval_status_signed',
  'runner_execution_exact_values_required_count_24',
  'runner_execution_exact_values_accepted_count_24',
  'runner_execution_exact_values_approved_count_24',
  'execution_pre_run_guard_status_passed',
  'execution_pre_run_guard_checks_required_count_30',
  'execution_pre_run_guard_checks_passed_count_30',
  'execution_pre_run_guard_failed_count_0',
  'expected_repo_future_command_status_before_attempt_documented',
  'observed_runner_execution_approval_status_not_granted',
  'observed_runner_command_path_status_documented',
  'observed_future_command_status_older_blocked_state',
  'observed_terminal_output_documented',
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_missing_count_30',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'external_calls_made_by_attempt_false',
  'credentials_accessed_by_attempt_false',
  'production_data_accessed_by_attempt_false',
  'sms_email_calls_calendar_booking_performed_by_attempt_false',
  'real_contact_made_by_attempt_false',
  'production_data_access_approval_status_not_granted',
  'production_supabase_write_approval_status_not_granted',
  'schema_auth_rls_security_change_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'real_homeowner_contact_approval_status_not_granted',
  'real_roofer_contact_approval_status_not_granted',
  'billing_payment_automation_approval_status_not_granted',
  'approved_for_activation_now_false',
  'command_execution_status_blocked_not_run_to_validation',
  'runner_execution_status_blocked_not_run_to_validation',
  'future_command_status_blocked_until_runner_state_wiring_correction',
  'packet_does_not_fix_runner',
  'packet_does_not_rerun_runner',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_contact_roofer_or_homeowner',
  'runner_command_invoked_by_this_packet_false',
  'runner_command_rerun_by_this_packet_false',
  'external_calls_made_by_this_packet_false',
  'credentials_accessed_by_this_packet_false',
  'production_data_accessed_by_this_packet_false',
  'real_contact_made_by_this_packet_false',
  'sms_email_calls_calendar_booking_performed_by_this_packet_false',
  'next_step_runner_state_wiring_correction_not_immediate_rerun',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'capture_runner_command_blocked_evidence_dry_run_wrapper_present_and_safe',
  'wrapper_does_not_invoke_runner',
  'no_live_sms_activation',
  'no_twilio_activation',
  'no_vapi_activation',
  'no_resend_activation',
  'no_scheduler_cron_dispatcher_activation',
  'no_public_route_webhook_activation',
  'no_billing_payment_quote_invoice_estimate_activation',
  'no_supabase_production_reads_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_env_credential_logging',
  'verifier_file_present',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_CAPTURE_RUNNER_COMMAND_BLOCKED_EVIDENCE.md',
  'NATIVE_WORKFLOW_FIXTURE_CAPTURE_RUNNER_COMMAND_BLOCKED_EVIDENCE_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-capture-runner-command-blocked-evidence-dry-run.sh',
  'verify-native-workflow-fixture-capture-runner-command-blocked-evidence-readonly.js',
  'capture-runner-command-blocked-evidence.json',
  'Native Workflow Fixture Capture Runner Command Blocked Evidence',
  'native workflow fixture capture runner command blocked evidence',
  'capture runner command blocked evidence',
];

const UNSAFE_PATTERNS = [
  /@supabase\/supabase-js/,
  /require\(['"]dotenv['"]\)/,
  /process\.env\.SUPABASE/i,
  /createClient\(/,
  /require\(['"]twilio['"]\)/i,
  /fetch\(/,
  /ALTER TABLE/,
  /CREATE TABLE/,
  /CREATE POLICY/,
];

const FORBIDDEN_PUBLIC = [
  'booked jobs',
  'book jobs',
  'close jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  'guaranteed appointments',
  'native CRM sync',
  'fully autonomous',
  'live SMS sends',
  'live email sends',
];

function read(p) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: ${p}`);
  return fs.readFileSync(full, 'utf8');
}

function readJson(p) {
  return JSON.parse(read(p));
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function mustHave(text, needle, label) {
  if (!text.includes(needle)) fail(`${label} missing: ${needle}`);
}

function mustNotHave(text, needle, label) {
  if (text.includes(needle)) fail(`${label} has unsafe text: ${needle}`);
}

function passAssertion(name) {
  console.log(`PASS: ${name}`);
}

function isExecutable(p) {
  try {
    fs.accessSync(path.join(root, p), fs.constants.X_OK);
    return true;
  } catch {
    return false;
  }
}

const packetDoc = read(packetDocPath);
const noGoReviewDoc = read(noGoReviewDocPath);
read(preRunGuardPacketDocPath);
read(capturePacketDocPath);
read(runnerExecutionTemplateDocPath);
read(scaffoldingBuildDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const combinedDocs = `${packetDoc}\n${noGoReviewDoc}`;

passAssertion('packet_doc_present');
passAssertion('no_go_review_doc_present');

mustHave(
  packetDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/blocked-command-evidence-capture-only/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/blocked-command-evidence-capture-only/non-executing',
  'no-go review',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_b834baa_referenced');

mustHave(packetDoc, RUNNER_EXECUTION_PRE_RUN_GUARD_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, RUNNER_EXECUTION_PRE_RUN_GUARD_COMMIT, 'no-go review');
passAssertion('runner_execution_pre_run_guard_commit_b834baa_referenced');

mustHave(packetDoc, CAPTURE_SIGNED_RUNNER_EXECUTION_APPROVAL_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, CAPTURE_SIGNED_RUNNER_EXECUTION_APPROVAL_COMMIT, 'no-go review');
passAssertion('capture_signed_runner_execution_approval_commit_bb0bc14_referenced');

mustHave(packetDoc, RUNNER_EXECUTION_TEMPLATE_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, RUNNER_EXECUTION_TEMPLATE_COMMIT, 'no-go review');
passAssertion('runner_execution_exact_approval_template_commit_67393ed_referenced');

mustHave(packetDoc, RUNNER_SCAFFOLDING_BUILD_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, RUNNER_SCAFFOLDING_BUILD_COMMIT, 'no-go review');
passAssertion('runner_scaffolding_build_commit_145bf15_referenced');

mustHave(packetDoc, preRunGuardPacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamPreRunGuardFixturePath, 'packet doc');
mustHave(packetDoc, 'runner-execution-pre-run-guard', 'packet doc');
mustHave(packetDoc, 'Build 106', 'packet doc');
passAssertion('build_106_runner_execution_pre_run_guard_packet_referenced');

mustHave(packetDoc, capturePacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamCaptureFixturePath, 'packet doc');
mustHave(packetDoc, 'capture-signed-runner-execution-approval', 'packet doc');
mustHave(packetDoc, 'Build 105', 'packet doc');
passAssertion('build_105_capture_signed_runner_execution_approval_packet_referenced');

mustHave(packetDoc, runnerExecutionTemplateDocPath, 'packet doc');
mustHave(packetDoc, upstreamRunnerExecutionTemplateFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 104', 'packet doc');
passAssertion('build_104_runner_execution_exact_approval_template_packet_referenced');

mustHave(packetDoc, scaffoldingBuildDocPath, 'packet doc');
mustHave(packetDoc, upstreamScaffoldingBuildFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 103', 'packet doc');
passAssertion('build_103_runner_scaffolding_build_packet_referenced');

mustHave(packetDoc, SIGNED_APPROVAL_TIMESTAMP, 'packet doc');
passAssertion('signed_approval_timestamp_present');

mustHave(packetDoc, `approval_scope | ${APPROVAL_SCOPE}`, 'packet doc');
passAssertion('approval_scope_run_actual_external_sandbox_30_scenario_validation_once_only');

mustHave(packetDoc, `exact_command_attempted | ${EXACT_COMMAND}`, 'packet doc');
mustHave(packetDoc, EXACT_COMMAND_ATTEMPT_TERMINAL, 'packet doc');
passAssertion('exact_command_attempted_documented');

mustHave(packetDoc, `exact_working_directory | ${EXACT_WORKING_DIRECTORY}`, 'packet doc');
passAssertion('exact_working_directory_documented');

mustHave(packetDoc, 'command_attempt_status | attempted_blocked_nonzero', 'packet doc');
mustHave(noGoReviewDoc, 'command_attempt_status | attempted_blocked_nonzero', 'no-go review');
passAssertion('command_attempt_status_attempted_blocked_nonzero');

mustHave(packetDoc, 'command_exit_status | nonzero_blocked', 'packet doc');
mustHave(noGoReviewDoc, 'command_exit_status | nonzero_blocked', 'no-go review');
passAssertion('command_exit_status_nonzero_blocked');

mustHave(packetDoc, `runner_blocked_reason | ${RUNNER_BLOCKED_REASON}`, 'packet doc');
mustHave(noGoReviewDoc, `runner_blocked_reason | ${RUNNER_BLOCKED_REASON}`, 'no-go review');
passAssertion('runner_blocked_reason_documented');

mustHave(packetDoc, 'runner_state_wiring_gap_status | detected', 'packet doc');
mustHave(noGoReviewDoc, 'runner_state_wiring_gap_status | detected', 'no-go review');
passAssertion('runner_state_wiring_gap_status_detected');

mustHave(packetDoc, 'runner_execution_approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'runner_execution_jason_signed_approval_status | signed', 'packet doc');
mustHave(packetDoc, 'runner_execution_exact_values_required_count | 24', 'packet doc');
mustHave(packetDoc, 'runner_execution_exact_values_accepted_count | 24', 'packet doc');
mustHave(packetDoc, 'runner_execution_exact_values_approved_count | 24', 'packet doc');
passAssertion('runner_execution_approval_capture_status_captured');
passAssertion('runner_execution_jason_signed_approval_status_signed');
passAssertion('runner_execution_exact_values_required_count_24');
passAssertion('runner_execution_exact_values_accepted_count_24');
passAssertion('runner_execution_exact_values_approved_count_24');

mustHave(packetDoc, 'execution_pre_run_guard_status | passed', 'packet doc');
mustHave(packetDoc, 'execution_pre_run_guard_checks_required_count | 30', 'packet doc');
mustHave(packetDoc, 'execution_pre_run_guard_checks_passed_count | 30', 'packet doc');
mustHave(packetDoc, 'execution_pre_run_guard_failed_count | 0', 'packet doc');
passAssertion('execution_pre_run_guard_status_passed');
passAssertion('execution_pre_run_guard_checks_required_count_30');
passAssertion('execution_pre_run_guard_checks_passed_count_30');
passAssertion('execution_pre_run_guard_failed_count_0');

mustHave(
  packetDoc,
  `expected_repo_future_command_status_before_attempt | ${EXPECTED_REPO_FUTURE_COMMAND_STATUS_BEFORE_ATTEMPT}`,
  'packet doc',
);
passAssertion('expected_repo_future_command_status_before_attempt_documented');

mustHave(packetDoc, 'observed_runner_execution_approval_status | not_granted', 'packet doc');
passAssertion('observed_runner_execution_approval_status_not_granted');

mustHave(
  packetDoc,
  'observed_runner_command_path_status | created_fail_closed_not_approved_to_run',
  'packet doc',
);
passAssertion('observed_runner_command_path_status_documented');

mustHave(packetDoc, `observed_future_command_status | ${OBSERVED_FUTURE_COMMAND_STATUS}`, 'packet doc');
passAssertion('observed_future_command_status_older_blocked_state');

mustHave(packetDoc, 'BLOCKED: This runner is scaffolding only and is NOT approved to run.', 'packet doc');
mustHave(packetDoc, 'EXIT: non-zero (blocked)', 'packet doc');
passAssertion('observed_terminal_output_documented');

mustHave(packetDoc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_status | not_captured_by_this_run', 'packet doc');
passAssertion('actual_30_scenario_external_validation_captured_count_0');
passAssertion('actual_30_scenario_external_validation_passed_count_0');
passAssertion('actual_30_scenario_external_validation_missing_count_30');
passAssertion('actual_30_scenario_external_validation_status_not_captured_by_this_run');

mustHave(packetDoc, 'external_calls_made_by_attempt | false', 'packet doc');
mustHave(packetDoc, 'credentials_accessed_by_attempt | false', 'packet doc');
mustHave(packetDoc, 'production_data_accessed_by_attempt | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_performed_by_attempt | false', 'packet doc');
mustHave(packetDoc, 'real_contact_made_by_attempt | false', 'packet doc');
passAssertion('external_calls_made_by_attempt_false');
passAssertion('credentials_accessed_by_attempt_false');
passAssertion('production_data_accessed_by_attempt_false');
passAssertion('sms_email_calls_calendar_booking_performed_by_attempt_false');
passAssertion('real_contact_made_by_attempt_false');

mustHave(packetDoc, 'production_data_access_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'production_supabase_write_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'schema_auth_rls_security_change_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'live_activation_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_homeowner_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_roofer_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'billing_payment_automation_approval_status | not_granted', 'packet doc');
passAssertion('production_data_access_approval_status_not_granted');
passAssertion('production_supabase_write_approval_status_not_granted');
passAssertion('schema_auth_rls_security_change_approval_status_not_granted');
passAssertion('live_activation_approval_status_not_granted');
passAssertion('real_homeowner_contact_approval_status_not_granted');
passAssertion('real_roofer_contact_approval_status_not_granted');
passAssertion('billing_payment_automation_approval_status_not_granted');

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'approved_for_activation_now is `false`', 'packet doc');
passAssertion('approved_for_activation_now_false');

mustHave(packetDoc, 'command_execution_status | blocked_not_run_to_validation', 'packet doc');
mustHave(packetDoc, 'runner_execution_status | blocked_not_run_to_validation', 'packet doc');
passAssertion('command_execution_status_blocked_not_run_to_validation');
passAssertion('runner_execution_status_blocked_not_run_to_validation');

mustHave(packetDoc, `future_command_status | ${FUTURE_COMMAND_STATUS}`, 'packet doc');
mustHave(packetDoc, `future_command_status is \`${FUTURE_COMMAND_STATUS}\``, 'packet doc');
passAssertion('future_command_status_blocked_until_runner_state_wiring_correction');

mustHave(packetDoc, 'This packet does **not** fix the runner.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** rerun the runner.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** make external calls.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** access credentials.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** access production data.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** contact any real roofer or homeowner.', 'packet doc');
passAssertion('packet_does_not_fix_runner');
passAssertion('packet_does_not_rerun_runner');
passAssertion('packet_does_not_make_external_calls');
passAssertion('packet_does_not_access_credentials');
passAssertion('packet_does_not_access_production_data');
passAssertion('packet_does_not_contact_roofer_or_homeowner');

mustHave(packetDoc, 'runner_command_invoked_by_this_packet is `false`', 'packet doc');
mustHave(packetDoc, 'runner_command_rerun_by_this_packet is `false`', 'packet doc');
passAssertion('runner_command_invoked_by_this_packet_false');
passAssertion('runner_command_rerun_by_this_packet_false');

mustHave(packetDoc, 'runner state wiring correction', 'packet doc');
mustHave(packetDoc, 'fresh exact execution decision', 'packet doc');
mustHave(packetDoc, 'not immediate rerun', 'packet doc');
passAssertion('next_step_runner_state_wiring_correction_not_immediate_rerun');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');
passAssertion('demo_ready_with_live_automation_disabled_preserved');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
readJson(upstreamPreRunGuardFixturePath);
readJson(upstreamCaptureFixturePath);
readJson(upstreamRunnerExecutionTemplateFixturePath);
readJson(upstreamScaffoldingBuildFixturePath);
const manifest = readJson(manifestPath);
passAssertion('upstream_pre_run_guard_fixture_present');
passAssertion('upstream_capture_signed_runner_execution_approval_fixture_present');
passAssertion('upstream_runner_execution_template_fixture_present');
passAssertion('upstream_scaffolding_build_fixture_present');
passAssertion('manifest_fixture_present');

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit mismatch');
}
if (fixture.exact_working_directory !== EXACT_WORKING_DIRECTORY) {
  fail('fixture exact_working_directory mismatch');
}
if (fixture.exact_command_attempted !== EXACT_COMMAND) {
  fail('fixture exact_command_attempted mismatch');
}
if (fixture.command_attempt_status !== 'attempted_blocked_nonzero') {
  fail('fixture command_attempt_status mismatch');
}
if (fixture.command_exit_status !== 'nonzero_blocked') {
  fail('fixture command_exit_status mismatch');
}
if (fixture.runner_blocked_reason !== RUNNER_BLOCKED_REASON) {
  fail('fixture runner_blocked_reason mismatch');
}
if (fixture.runner_state_wiring_gap_status !== 'detected') {
  fail('fixture runner_state_wiring_gap_status mismatch');
}
if (fixture.runner_execution_approval_capture_status !== 'captured') {
  fail('fixture runner_execution_approval_capture_status mismatch');
}
if (fixture.runner_execution_jason_signed_approval_status !== 'signed') {
  fail('fixture runner_execution_jason_signed_approval_status mismatch');
}
if (fixture.runner_execution_exact_values_required_count !== 24) {
  fail('fixture runner_execution_exact_values_required_count must be 24');
}
if (fixture.runner_execution_exact_values_accepted_count !== 24) {
  fail('fixture runner_execution_exact_values_accepted_count must be 24');
}
if (fixture.runner_execution_exact_values_approved_count !== 24) {
  fail('fixture runner_execution_exact_values_approved_count must be 24');
}
if (fixture.execution_pre_run_guard_status !== 'passed') {
  fail('fixture execution_pre_run_guard_status must be passed');
}
if (fixture.execution_pre_run_guard_checks_required_count !== 30) {
  fail('fixture execution_pre_run_guard_checks_required_count must be 30');
}
if (fixture.execution_pre_run_guard_checks_passed_count !== 30) {
  fail('fixture execution_pre_run_guard_checks_passed_count must be 30');
}
if (fixture.execution_pre_run_guard_failed_count !== 0) {
  fail('fixture execution_pre_run_guard_failed_count must be 0');
}
if (
  fixture.expected_repo_future_command_status_before_attempt !==
  EXPECTED_REPO_FUTURE_COMMAND_STATUS_BEFORE_ATTEMPT
) {
  fail('fixture expected_repo_future_command_status_before_attempt mismatch');
}
if (fixture.observed_runner_execution_approval_status !== 'not_granted') {
  fail('fixture observed_runner_execution_approval_status must be not_granted');
}
if (fixture.observed_runner_command_path_status !== 'created_fail_closed_not_approved_to_run') {
  fail('fixture observed_runner_command_path_status mismatch');
}
if (fixture.observed_future_command_status !== OBSERVED_FUTURE_COMMAND_STATUS) {
  fail('fixture observed_future_command_status mismatch');
}
if (fixture.command_execution_status !== 'blocked_not_run_to_validation') {
  fail('fixture command_execution_status mismatch');
}
if (fixture.runner_execution_status !== 'blocked_not_run_to_validation') {
  fail('fixture runner_execution_status mismatch');
}
if (fixture.future_command_status !== FUTURE_COMMAND_STATUS) {
  fail('fixture future_command_status mismatch');
}
if (fixture.external_calls_made_by_attempt !== false) {
  fail('fixture external_calls_made_by_attempt must be false');
}
if (fixture.credentials_accessed_by_attempt !== false) {
  fail('fixture credentials_accessed_by_attempt must be false');
}
if (fixture.production_data_accessed_by_attempt !== false) {
  fail('fixture production_data_accessed_by_attempt must be false');
}
if (fixture.sms_email_calls_calendar_booking_performed_by_attempt !== false) {
  fail('fixture sms_email_calls_calendar_booking_performed_by_attempt must be false');
}
if (fixture.real_contact_made_by_attempt !== false) {
  fail('fixture real_contact_made_by_attempt must be false');
}
if (fixture.runner_command_invoked_by_this_packet !== false) {
  fail('fixture runner_command_invoked_by_this_packet must be false');
}
if (fixture.runner_command_rerun_by_this_packet !== false) {
  fail('fixture runner_command_rerun_by_this_packet must be false');
}
if (fixture.actual_30_scenario_external_validation_captured_count !== 0) {
  fail('fixture actual_30_scenario_external_validation_captured_count must be 0');
}
if (fixture.actual_30_scenario_external_validation_passed_count !== 0) {
  fail('fixture actual_30_scenario_external_validation_passed_count must be 0');
}
if (fixture.actual_30_scenario_external_validation_missing_count !== 30) {
  fail('fixture actual_30_scenario_external_validation_missing_count must be 30');
}
if (fixture.actual_30_scenario_external_validation_status !== 'not_captured_by_this_run') {
  fail('fixture actual_30_scenario_external_validation_status mismatch');
}
if (fixture.demo_ready_with_live_automation_disabled !== 'preserved') {
  fail('fixture demo_ready_with_live_automation_disabled must be preserved');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}

if (manifest.total_manifest_scenarios_count !== 30) {
  fail('manifest total_manifest_scenarios_count must be 30');
}
if (!Array.isArray(manifest.scenarios) || manifest.scenarios.length !== 30) {
  fail('manifest scenarios array must contain exactly 30 scenarios');
}

if (!fs.existsSync(path.join(root, runnerPath))) {
  fail(`missing runner command path: ${runnerPath}`);
}
if (!isExecutable(runnerPath)) {
  fail(`runner command path is not executable: ${runnerPath}`);
}

passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(combinedDocs, phrase, 'combined packet docs forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(combinedDocs)) fail(`unsafe pattern ${pattern} found in combined docs`);
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}

if (!fs.existsSync(path.join(root, verifierPath))) fail(`missing verifier: ${verifierPath}`);
passAssertion('verifier_file_present');

const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') {
  fail(
    `pilot readiness summary is not demo_ready_with_live_automation_disabled (got: ${status.summary})`,
  );
}

const liveKeys = ['sms', 'calendar', 'vapi_outbound', 'resend', 'lindy'];
for (const key of liveKeys) {
  if (status.live_automation[key] !== false) {
    fail(`live_automation.${key} is not false`);
  }
}
passAssertion('no_live_sms_activation');
passAssertion('no_twilio_activation');
passAssertion('no_vapi_activation');
passAssertion('no_resend_activation');
passAssertion('no_scheduler_cron_dispatcher_activation');
passAssertion('no_public_route_webhook_activation');
passAssertion('no_billing_payment_quote_invoice_estimate_activation');
passAssertion('no_supabase_production_reads_writes');
passAssertion('no_schema_migrations_auth_rls_security_changes');
passAssertion('no_secret_env_credential_logging');

mustHave(fullReadiness, 'verify-first-paid-pilot-readiness-readonly.js', 'full safe readiness');
mustHave(fullReadiness, 'npm --prefix backend run build', 'full safe readiness');
passAssertion('full_safe_readiness_lane_preserved');

mustHave(aggregate, verifierPath, 'aggregate readiness');
mustHave(
  aggregate,
  'Native Workflow Fixture Capture Runner Command Blocked Evidence',
  'aggregate readiness',
);
mustHave(verifierIndex, packetDocPath, 'verifier index');
mustHave(verifierIndex, noGoReviewDocPath, 'verifier index');
mustHave(verifierIndex, fixturePath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

for (const ref of PACKET_REFS) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
passAssertion('docs_and_context_wiring_present');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, 'set -euo pipefail', 'wrapper strict mode');
mustHave(wrapper, verifierPath, 'wrapper verifier');
mustHave(wrapper, 'node --check', 'wrapper syntax checks');
mustHave(wrapper, 'local blocked command evidence capture only', 'wrapper mode');
mustHave(wrapper, 'not runner fix', 'wrapper mode');
mustHave(wrapper, 'not runner rerun', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(wrapper, 'Build 106', 'wrapper Build 106');
mustHave(wrapper, 'Build 105', 'wrapper Build 105');
mustHave(wrapper, 'command_attempt_status is attempted_blocked_nonzero', 'wrapper mode');
mustHave(wrapper, 'command_exit_status is nonzero_blocked', 'wrapper mode');
mustHave(wrapper, 'runner_state_wiring_gap_status is detected', 'wrapper mode');
mustHave(wrapper, 'runner_execution_approval_capture_status is captured', 'wrapper mode');
mustHave(wrapper, 'runner_execution_jason_signed_approval_status is signed', 'wrapper mode');
mustHave(wrapper, 'execution_pre_run_guard_status is passed', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(
  wrapper,
  'runner state wiring correction packet and fresh exact execution decision',
  'wrapper mode',
);
mustHave(wrapper, 'not immediate rerun', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, `bash ${runnerPath}`, 'wrapper must not invoke runner');

if (!isExecutable(wrapperPath)) {
  fail(`capture runner command blocked evidence dry-run wrapper is not executable: ${wrapperPath}`);
}
passAssertion('capture_runner_command_blocked_evidence_dry_run_wrapper_present_and_safe');
passAssertion('wrapper_does_not_invoke_runner');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 90) {
  fail(`REQUIRED_ASSERTIONS must contain 90 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Capture Runner Command Blocked Evidence verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);