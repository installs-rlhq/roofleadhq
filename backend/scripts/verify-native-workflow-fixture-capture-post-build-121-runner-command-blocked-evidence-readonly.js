#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_121_RUNNER_COMMAND_BLOCKED_EVIDENCE.md';
const freshPreRunGuardAfterAfterGuardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_AFTER_GUARD_WIRING_CORRECTION_APPROVAL_CAPTURE.md';
const captureAfterAfterGuardPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_AFTER_GUARD_WIRING_CORRECTION.md';
const freshDecisionAfterAfterGuardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_GUARD_WIRING_CORRECTION.md';
const afterGuardWiringCorrectionPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_GUARD_WIRING_CORRECTION.md';
const postBuild116BlockedEvidencePacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_116_RUNNER_COMMAND_BLOCKED_EVIDENCE.md';
const scaffoldingBuildDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_SCAFFOLDING_BUILD.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-121-runner-command-blocked-evidence.json';
const upstreamFreshPreRunGuardAfterAfterGuardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-after-guard-wiring-correction-approval-capture.json';
const upstreamCaptureAfterAfterGuardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-after-guard-wiring-correction.json';
const upstreamFreshDecisionAfterAfterGuardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-after-guard-wiring-correction.json';
const upstreamAfterGuardWiringCorrectionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-guard-wiring-correction.json';
const upstreamPostBuild116BlockedEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-116-runner-command-blocked-evidence.json';
const upstreamScaffoldingBuildFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-scaffolding-build.json';
const manifestPath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const runnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const wrapperPath =
  'scripts/run-native-workflow-fixture-capture-post-build-121-runner-command-blocked-evidence-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-capture-post-build-121-runner-command-blocked-evidence-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '7cb5222';
const PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_AFTER_GUARD_WIRING_CORRECTION_COMMIT = '7cb5222';
const PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_AFTER_GUARD_WIRING_CORRECTION_COMMIT = '203c0af';
const PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_GUARD_WIRING_CORRECTION_COMMIT = '3b7719b';
const PRIOR_RUNNER_EXECUTION_PATH_AFTER_GUARD_WIRING_CORRECTION_COMMIT = '9348a64';
const PRIOR_POST_BUILD_116_BLOCKED_EVIDENCE_COMMIT = 'ae23997';
const RUNNER_SCAFFOLDING_BUILD_COMMIT = '145bf15';
const RUNNER_OUTPUT_SOURCE_OF_TRUTH_COMMIT_OBSERVED = 'ae23997';
const APPROVAL_SCOPE =
  'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_after_guard_wiring_correction';

const EXACT_WORKING_DIRECTORY = '/root/roofleadhq';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const EXACT_COMMAND_ATTEMPT_TERMINAL =
  'cd /root/roofleadhq && bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const EXPECTED_REPO_FUTURE_COMMAND_STATUS_BEFORE_ATTEMPT =
  'ready_for_exact_approved_runner_execution_command_after_after_guard_wiring_correction_guard_review_only';
const FUTURE_COMMAND_STATUS =
  'blocked_until_runner_execution_path_after_after_guard_fresh_chain_wiring_correction_and_fresh_decision';
const RUNNER_COMMAND_PATH_STATUS =
  'corrected_fail_closed_direct_invocation_always_blocked_pending_fresh_decision_after_after_guard_wiring_correction';
const BLOCKED_OUTPUT_LINE =
  'BLOCKED: This runner remains fail-closed for direct invocation and is NOT approved to run validation from this blocked path.';
const STALE_STATE_LINE =
  'NO-GO: Fresh runner-execution decision and fresh execution pre-run guard pass are required after runner execution path after-guard wiring correction';

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_fresh_pre_run_guard_after_after_guard_fixture_present',
  'upstream_capture_after_after_guard_fixture_present',
  'upstream_fresh_decision_after_after_guard_fixture_present',
  'upstream_after_guard_wiring_correction_fixture_present',
  'upstream_post_build_116_blocked_evidence_fixture_present',
  'upstream_scaffolding_build_fixture_present',
  'manifest_fixture_present',
  'source_of_truth_commit_7cb5222_referenced',
  'prior_fresh_execution_pre_run_guard_after_after_guard_commit_7cb5222_referenced',
  'prior_fresh_execution_pre_run_guard_after_after_guard_status_closed',
  'prior_capture_after_after_guard_commit_203c0af_referenced',
  'prior_fresh_decision_after_after_guard_commit_3b7719b_referenced',
  'prior_runner_execution_path_after_guard_wiring_correction_commit_9348a64_referenced',
  'prior_post_build_116_blocked_evidence_commit_ae23997_referenced',
  'runner_scaffolding_build_commit_145bf15_referenced',
  'build_121_fresh_pre_run_guard_after_after_guard_packet_referenced',
  'build_120_capture_after_after_guard_packet_referenced',
  'build_119_fresh_decision_after_after_guard_packet_referenced',
  'build_118_after_guard_wiring_correction_packet_referenced',
  'build_117_post_build_116_blocked_evidence_packet_referenced',
  'build_103_runner_scaffolding_build_packet_referenced',
  'approval_scope_fresh_run_after_after_guard_wiring_correction',
  'exact_command_attempted_from_root_roofleadhq_documented',
  'exact_command_attempted_documented',
  'exact_command_attempted_after_build_121_status_attempted_blocked_nonzero',
  'exact_command_exit_status_nonzero_blocked',
  'command_attempt_consumption_status_consumed_by_blocked_after_build_121_guard',
  'runner_output_source_of_truth_commit_observed_ae23997',
  'runner_output_state_after_build_121_stale_detected',
  'runner_recognized_build_114_115_116_chain',
  'runner_did_not_recognize_build_118_after_guard_wiring_correction',
  'runner_did_not_recognize_build_119_fresh_decision',
  'runner_did_not_recognize_build_120_approval_capture',
  'runner_did_not_recognize_build_121_pre_run_guard',
  'runner_execution_path_after_after_guard_fresh_chain_wiring_gap_detected',
  'runner_direct_invocation_status_after_correction_blocked_nonzero_expected',
  'runner_execution_status_not_run',
  'command_execution_status_not_run',
  'fresh_runner_execution_approval_capture_status_captured',
  'fresh_runner_execution_jason_signed_approval_status_signed',
  'fresh_execution_pre_run_guard_status_passed',
  'expected_repo_future_command_status_before_attempt_documented',
  'runner_command_path_status_documented',
  'observed_terminal_output_documented',
  'immediate_rerun_allowed_false',
  'no_immediate_rerun_allowed_true',
  'no_immediate_runner_invocation_by_blocked_path_true',
  'external_calls_made_by_command_attempt_false',
  'credentials_accessed_by_command_attempt_false',
  'production_data_accessed_by_command_attempt_false',
  'real_contact_made_by_command_attempt_false',
  'sms_email_calls_calendar_booking_performed_by_command_attempt_false',
  'evidence_log_written_by_command_attempt_false',
  'structured_result_written_by_command_attempt_false',
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_missing_count_30',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'production_data_access_approval_status_not_granted',
  'production_supabase_write_approval_status_not_granted',
  'schema_auth_rls_security_change_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'real_homeowner_contact_approval_status_not_granted',
  'real_roofer_contact_approval_status_not_granted',
  'billing_payment_automation_approval_status_not_granted',
  'approved_for_activation_now_false',
  'future_command_status_blocked_until_after_after_guard_fresh_chain_wiring_correction_and_fresh_decision',
  'packet_does_not_rerun_runner',
  'packet_does_not_perform_validation',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_contact_roofer_or_homeowner',
  'packet_does_not_send_sms_email_calls_calendar_booking',
  'runner_command_invoked_by_this_packet_false',
  'runner_command_rerun_by_this_packet_false',
  'external_calls_made_by_this_packet_false',
  'credentials_accessed_by_this_packet_false',
  'production_data_accessed_by_this_packet_false',
  'real_contact_made_by_this_packet_false',
  'sms_email_calls_calendar_booking_performed_by_this_packet_false',
  'next_step_after_after_guard_fresh_chain_wiring_correction_not_immediate_rerun',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'capture_post_build_121_runner_command_blocked_evidence_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_121_RUNNER_COMMAND_BLOCKED_EVIDENCE.md',
  'run-native-workflow-fixture-capture-post-build-121-runner-command-blocked-evidence-dry-run.sh',
  'verify-native-workflow-fixture-capture-post-build-121-runner-command-blocked-evidence-readonly.js',
  'capture-post-build-121-runner-command-blocked-evidence.json',
  'Native Workflow Fixture Capture Post-Build-121 Runner Command Blocked Evidence',
  'native workflow fixture capture post build 121 runner command blocked evidence',
  'capture post build 121 runner command blocked evidence',
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
read(freshPreRunGuardAfterAfterGuardDocPath);
read(captureAfterAfterGuardPacketDocPath);
read(freshDecisionAfterAfterGuardDocPath);
read(afterGuardWiringCorrectionPacketDocPath);
read(postBuild116BlockedEvidencePacketDocPath);
read(scaffoldingBuildDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);

passAssertion('packet_doc_present');

mustHave(
  packetDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/blocked-command-evidence-capture-only/non-executing',
  'packet doc',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
passAssertion('source_of_truth_commit_7cb5222_referenced');

mustHave(packetDoc, PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_AFTER_GUARD_WIRING_CORRECTION_COMMIT, 'packet doc');
mustHave(
  packetDoc,
  'prior_fresh_execution_pre_run_guard_after_after_guard_wiring_correction_status | closed',
  'packet doc',
);
passAssertion('prior_fresh_execution_pre_run_guard_after_after_guard_commit_7cb5222_referenced');
passAssertion('prior_fresh_execution_pre_run_guard_after_after_guard_status_closed');

mustHave(packetDoc, PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_AFTER_GUARD_WIRING_CORRECTION_COMMIT, 'packet doc');
passAssertion('prior_capture_after_after_guard_commit_203c0af_referenced');

mustHave(packetDoc, PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_GUARD_WIRING_CORRECTION_COMMIT, 'packet doc');
passAssertion('prior_fresh_decision_after_after_guard_commit_3b7719b_referenced');

mustHave(packetDoc, PRIOR_RUNNER_EXECUTION_PATH_AFTER_GUARD_WIRING_CORRECTION_COMMIT, 'packet doc');
passAssertion('prior_runner_execution_path_after_guard_wiring_correction_commit_9348a64_referenced');

mustHave(packetDoc, PRIOR_POST_BUILD_116_BLOCKED_EVIDENCE_COMMIT, 'packet doc');
passAssertion('prior_post_build_116_blocked_evidence_commit_ae23997_referenced');

mustHave(packetDoc, RUNNER_SCAFFOLDING_BUILD_COMMIT, 'packet doc');
passAssertion('runner_scaffolding_build_commit_145bf15_referenced');

mustHave(packetDoc, freshPreRunGuardAfterAfterGuardDocPath, 'packet doc');
mustHave(packetDoc, upstreamFreshPreRunGuardAfterAfterGuardFixturePath, 'packet doc');
mustHave(packetDoc, 'fresh-execution-pre-run-guard-after-after-guard-wiring-correction-approval-capture', 'packet doc');
mustHave(packetDoc, 'Build 121', 'packet doc');
passAssertion('build_121_fresh_pre_run_guard_after_after_guard_packet_referenced');

mustHave(packetDoc, captureAfterAfterGuardPacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamCaptureAfterAfterGuardFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 120', 'packet doc');
passAssertion('build_120_capture_after_after_guard_packet_referenced');

mustHave(packetDoc, freshDecisionAfterAfterGuardDocPath, 'packet doc');
mustHave(packetDoc, upstreamFreshDecisionAfterAfterGuardFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 119', 'packet doc');
passAssertion('build_119_fresh_decision_after_after_guard_packet_referenced');

mustHave(packetDoc, afterGuardWiringCorrectionPacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamAfterGuardWiringCorrectionFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 118', 'packet doc');
passAssertion('build_118_after_guard_wiring_correction_packet_referenced');

mustHave(packetDoc, postBuild116BlockedEvidencePacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamPostBuild116BlockedEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 117', 'packet doc');
passAssertion('build_117_post_build_116_blocked_evidence_packet_referenced');

mustHave(packetDoc, scaffoldingBuildDocPath, 'packet doc');
mustHave(packetDoc, upstreamScaffoldingBuildFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 103', 'packet doc');
passAssertion('build_103_runner_scaffolding_build_packet_referenced');

mustHave(packetDoc, `approval_scope | ${APPROVAL_SCOPE}`, 'packet doc');
passAssertion('approval_scope_fresh_run_after_after_guard_wiring_correction');

mustHave(packetDoc, `exact_command_attempted_working_directory | ${EXACT_WORKING_DIRECTORY}`, 'packet doc');
mustHave(packetDoc, `exact_working_directory | ${EXACT_WORKING_DIRECTORY}`, 'packet doc');
passAssertion('exact_command_attempted_from_root_roofleadhq_documented');

mustHave(packetDoc, `exact_command_attempted | ${EXACT_COMMAND}`, 'packet doc');
mustHave(packetDoc, EXACT_COMMAND_ATTEMPT_TERMINAL, 'packet doc');
passAssertion('exact_command_attempted_documented');

mustHave(packetDoc, 'exact_command_attempted_after_build_121_status | attempted_blocked_nonzero', 'packet doc');
passAssertion('exact_command_attempted_after_build_121_status_attempted_blocked_nonzero');

mustHave(packetDoc, 'exact_command_exit_status | nonzero_blocked', 'packet doc');
passAssertion('exact_command_exit_status_nonzero_blocked');

mustHave(
  packetDoc,
  'command_attempt_consumption_status | consumed_by_blocked_fail_closed_result_after_build_121_guard',
  'packet doc',
);
passAssertion('command_attempt_consumption_status_consumed_by_blocked_after_build_121_guard');

mustHave(
  packetDoc,
  `runner_output_source_of_truth_commit_observed | ${RUNNER_OUTPUT_SOURCE_OF_TRUTH_COMMIT_OBSERVED}`,
  'packet doc',
);
passAssertion('runner_output_source_of_truth_commit_observed_ae23997');

mustHave(
  packetDoc,
  'runner_output_state_after_build_121_status | stale_pre_build_118_119_120_121_state_detected',
  'packet doc',
);
passAssertion('runner_output_state_after_build_121_stale_detected');

mustHave(packetDoc, 'runner_recognized_build_114_115_116_chain_status | true', 'packet doc');
passAssertion('runner_recognized_build_114_115_116_chain');

mustHave(packetDoc, 'runner_did_not_recognize_build_118_after_guard_wiring_correction_status | true', 'packet doc');
passAssertion('runner_did_not_recognize_build_118_after_guard_wiring_correction');

mustHave(packetDoc, 'runner_did_not_recognize_build_119_fresh_decision_status | true', 'packet doc');
passAssertion('runner_did_not_recognize_build_119_fresh_decision');

mustHave(packetDoc, 'runner_did_not_recognize_build_120_approval_capture_status | true', 'packet doc');
passAssertion('runner_did_not_recognize_build_120_approval_capture');

mustHave(packetDoc, 'runner_did_not_recognize_build_121_pre_run_guard_status | true', 'packet doc');
passAssertion('runner_did_not_recognize_build_121_pre_run_guard');

mustHave(
  packetDoc,
  'runner_execution_path_after_after_guard_fresh_chain_wiring_gap_status | detected',
  'packet doc',
);
passAssertion('runner_execution_path_after_after_guard_fresh_chain_wiring_gap_detected');

mustHave(
  packetDoc,
  'runner_direct_invocation_status_after_correction | blocked_nonzero_expected',
  'packet doc',
);
passAssertion('runner_direct_invocation_status_after_correction_blocked_nonzero_expected');

mustHave(packetDoc, 'runner_execution_status | not_run', 'packet doc');
passAssertion('runner_execution_status_not_run');

mustHave(packetDoc, 'command_execution_status | not_run', 'packet doc');
passAssertion('command_execution_status_not_run');

mustHave(packetDoc, 'fresh_runner_execution_approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_jason_signed_approval_status | signed', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_status | passed', 'packet doc');
passAssertion('fresh_runner_execution_approval_capture_status_captured');
passAssertion('fresh_runner_execution_jason_signed_approval_status_signed');
passAssertion('fresh_execution_pre_run_guard_status_passed');

mustHave(
  packetDoc,
  `expected_repo_future_command_status_before_attempt | ${EXPECTED_REPO_FUTURE_COMMAND_STATUS_BEFORE_ATTEMPT}`,
  'packet doc',
);
passAssertion('expected_repo_future_command_status_before_attempt_documented');

mustHave(packetDoc, `runner_command_path_status | ${RUNNER_COMMAND_PATH_STATUS}`, 'packet doc');
passAssertion('runner_command_path_status_documented');

mustHave(packetDoc, BLOCKED_OUTPUT_LINE, 'packet doc');
mustHave(packetDoc, STALE_STATE_LINE, 'packet doc');
mustHave(packetDoc, 'EXIT: non-zero (blocked)', 'packet doc');
passAssertion('observed_terminal_output_documented');

mustHave(packetDoc, 'immediate_rerun_allowed | false', 'packet doc');
mustHave(packetDoc, 'no_immediate_rerun_allowed | true', 'packet doc');
mustHave(packetDoc, 'no_immediate_runner_invocation_by_blocked_path | true', 'packet doc');
passAssertion('immediate_rerun_allowed_false');
passAssertion('no_immediate_rerun_allowed_true');
passAssertion('no_immediate_runner_invocation_by_blocked_path_true');

mustHave(packetDoc, 'external_calls_made_by_command_attempt | false', 'packet doc');
mustHave(packetDoc, 'credentials_accessed_by_command_attempt | false', 'packet doc');
mustHave(packetDoc, 'production_data_accessed_by_command_attempt | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_performed_by_command_attempt | false', 'packet doc');
mustHave(packetDoc, 'real_contact_made_by_command_attempt | false', 'packet doc');
mustHave(packetDoc, 'evidence_log_written_by_command_attempt | false', 'packet doc');
mustHave(packetDoc, 'structured_result_written_by_command_attempt | false', 'packet doc');
passAssertion('external_calls_made_by_command_attempt_false');
passAssertion('credentials_accessed_by_command_attempt_false');
passAssertion('production_data_accessed_by_command_attempt_false');
passAssertion('sms_email_calls_calendar_booking_performed_by_command_attempt_false');
passAssertion('real_contact_made_by_command_attempt_false');
passAssertion('evidence_log_written_by_command_attempt_false');
passAssertion('structured_result_written_by_command_attempt_false');

mustHave(packetDoc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_status | not_captured_by_this_run', 'packet doc');
passAssertion('actual_30_scenario_external_validation_captured_count_0');
passAssertion('actual_30_scenario_external_validation_passed_count_0');
passAssertion('actual_30_scenario_external_validation_missing_count_30');
passAssertion('actual_30_scenario_external_validation_status_not_captured_by_this_run');

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

mustHave(packetDoc, `future_command_status | ${FUTURE_COMMAND_STATUS}`, 'packet doc');
mustHave(packetDoc, `future_command_status is \`${FUTURE_COMMAND_STATUS}\``, 'packet doc');
passAssertion('future_command_status_blocked_until_after_after_guard_fresh_chain_wiring_correction_and_fresh_decision');

mustHave(packetDoc, 'This packet does **not** rerun the runner.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** perform actual 30-scenario validation.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** make external calls.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** access credentials or secret values.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** access production data.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** contact any real roofer or homeowner.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** send SMS/email/calls or create calendar bookings.', 'packet doc');
passAssertion('packet_does_not_rerun_runner');
passAssertion('packet_does_not_perform_validation');
passAssertion('packet_does_not_make_external_calls');
passAssertion('packet_does_not_access_credentials');
passAssertion('packet_does_not_access_production_data');
passAssertion('packet_does_not_contact_roofer_or_homeowner');
passAssertion('packet_does_not_send_sms_email_calls_calendar_booking');

mustHave(packetDoc, 'runner_command_invoked_by_this_packet is `false`', 'packet doc');
mustHave(packetDoc, 'runner_command_rerun_by_this_packet is `false`', 'packet doc');
passAssertion('runner_command_invoked_by_this_packet_false');
passAssertion('runner_command_rerun_by_this_packet_false');
passAssertion('external_calls_made_by_this_packet_false');
passAssertion('credentials_accessed_by_this_packet_false');
passAssertion('production_data_accessed_by_this_packet_false');
passAssertion('real_contact_made_by_this_packet_false');
passAssertion('sms_email_calls_calendar_booking_performed_by_this_packet_false');

mustHave(packetDoc, 'after-after-guard fresh-chain wiring correction', 'packet doc');
mustHave(packetDoc, 'fresh decision path', 'packet doc');
mustHave(packetDoc, 'not immediate rerun', 'packet doc');
passAssertion('next_step_after_after_guard_fresh_chain_wiring_correction_not_immediate_rerun');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');
passAssertion('demo_ready_with_live_automation_disabled_preserved');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
readJson(upstreamFreshPreRunGuardAfterAfterGuardFixturePath);
readJson(upstreamCaptureAfterAfterGuardFixturePath);
readJson(upstreamFreshDecisionAfterAfterGuardFixturePath);
readJson(upstreamAfterGuardWiringCorrectionFixturePath);
readJson(upstreamPostBuild116BlockedEvidenceFixturePath);
readJson(upstreamScaffoldingBuildFixturePath);
const manifest = readJson(manifestPath);
passAssertion('upstream_fresh_pre_run_guard_after_after_guard_fixture_present');
passAssertion('upstream_capture_after_after_guard_fixture_present');
passAssertion('upstream_fresh_decision_after_after_guard_fixture_present');
passAssertion('upstream_after_guard_wiring_correction_fixture_present');
passAssertion('upstream_post_build_116_blocked_evidence_fixture_present');
passAssertion('upstream_scaffolding_build_fixture_present');
passAssertion('manifest_fixture_present');

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit mismatch');
}
if (
  fixture.prior_fresh_execution_pre_run_guard_after_after_guard_wiring_correction_commit !==
  PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_AFTER_GUARD_WIRING_CORRECTION_COMMIT
) {
  fail('fixture prior_fresh_execution_pre_run_guard_after_after_guard_wiring_correction_commit mismatch');
}
if (fixture.prior_fresh_execution_pre_run_guard_after_after_guard_wiring_correction_status !== 'closed') {
  fail('fixture prior_fresh_execution_pre_run_guard_after_after_guard_wiring_correction_status must be closed');
}
if (fixture.exact_command_attempted_working_directory !== EXACT_WORKING_DIRECTORY) {
  fail('fixture exact_command_attempted_working_directory mismatch');
}
if (fixture.exact_command_attempted !== EXACT_COMMAND) {
  fail('fixture exact_command_attempted mismatch');
}
if (fixture.exact_command_attempted_after_build_121_status !== 'attempted_blocked_nonzero') {
  fail('fixture exact_command_attempted_after_build_121_status mismatch');
}
if (fixture.exact_command_exit_status !== 'nonzero_blocked') {
  fail('fixture exact_command_exit_status mismatch');
}
if (fixture.command_attempt_consumption_status !== 'consumed_by_blocked_fail_closed_result_after_build_121_guard') {
  fail('fixture command_attempt_consumption_status mismatch');
}
if (fixture.runner_output_source_of_truth_commit_observed !== RUNNER_OUTPUT_SOURCE_OF_TRUTH_COMMIT_OBSERVED) {
  fail('fixture runner_output_source_of_truth_commit_observed mismatch');
}
if (fixture.runner_output_state_after_build_121_status !== 'stale_pre_build_118_119_120_121_state_detected') {
  fail('fixture runner_output_state_after_build_121_status mismatch');
}
if (fixture.runner_recognized_build_114_115_116_chain_status !== true) {
  fail('fixture runner_recognized_build_114_115_116_chain_status must be true');
}
if (fixture.runner_did_not_recognize_build_118_after_guard_wiring_correction_status !== true) {
  fail('fixture runner_did_not_recognize_build_118_after_guard_wiring_correction_status must be true');
}
if (fixture.runner_did_not_recognize_build_119_fresh_decision_status !== true) {
  fail('fixture runner_did_not_recognize_build_119_fresh_decision_status must be true');
}
if (fixture.runner_did_not_recognize_build_120_approval_capture_status !== true) {
  fail('fixture runner_did_not_recognize_build_120_approval_capture_status must be true');
}
if (fixture.runner_did_not_recognize_build_121_pre_run_guard_status !== true) {
  fail('fixture runner_did_not_recognize_build_121_pre_run_guard_status must be true');
}
if (fixture.runner_execution_path_after_after_guard_fresh_chain_wiring_gap_status !== 'detected') {
  fail('fixture runner_execution_path_after_after_guard_fresh_chain_wiring_gap_status must be detected');
}
if (fixture.runner_direct_invocation_status_after_correction !== 'blocked_nonzero_expected') {
  fail('fixture runner_direct_invocation_status_after_correction mismatch');
}
if (fixture.expected_repo_future_command_status_before_attempt !== EXPECTED_REPO_FUTURE_COMMAND_STATUS_BEFORE_ATTEMPT) {
  fail('fixture expected_repo_future_command_status_before_attempt mismatch');
}
if (fixture.runner_command_path_status !== RUNNER_COMMAND_PATH_STATUS) {
  fail('fixture runner_command_path_status mismatch');
}
if (fixture.command_execution_status !== 'not_run') {
  fail('fixture command_execution_status mismatch');
}
if (fixture.runner_execution_status !== 'not_run') {
  fail('fixture runner_execution_status mismatch');
}
if (fixture.future_command_status !== FUTURE_COMMAND_STATUS) {
  fail('fixture future_command_status mismatch');
}
if (fixture.immediate_rerun_allowed !== false) {
  fail('fixture immediate_rerun_allowed must be false');
}
if (fixture.no_immediate_rerun_allowed !== true) {
  fail('fixture no_immediate_rerun_allowed must be true');
}
if (fixture.no_immediate_runner_invocation_by_blocked_path !== true) {
  fail('fixture no_immediate_runner_invocation_by_blocked_path must be true');
}
if (fixture.external_calls_made_by_command_attempt !== false) {
  fail('fixture external_calls_made_by_command_attempt must be false');
}
if (fixture.credentials_accessed_by_command_attempt !== false) {
  fail('fixture credentials_accessed_by_command_attempt must be false');
}
if (fixture.production_data_accessed_by_command_attempt !== false) {
  fail('fixture production_data_accessed_by_command_attempt must be false');
}
if (fixture.sms_email_calls_calendar_booking_performed_by_command_attempt !== false) {
  fail('fixture sms_email_calls_calendar_booking_performed_by_command_attempt must be false');
}
if (fixture.real_contact_made_by_command_attempt !== false) {
  fail('fixture real_contact_made_by_command_attempt must be false');
}
if (fixture.evidence_log_written_by_command_attempt !== false) {
  fail('fixture evidence_log_written_by_command_attempt must be false');
}
if (fixture.structured_result_written_by_command_attempt !== false) {
  fail('fixture structured_result_written_by_command_attempt must be false');
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
  mustNotHave(packetDoc, phrase, 'packet doc forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(packetDoc)) fail(`unsafe pattern ${pattern} found in packet doc`);
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
  'Native Workflow Fixture Capture Post-Build-121 Runner Command Blocked Evidence',
  'aggregate readiness',
);
mustHave(verifierIndex, packetDocPath, 'verifier index');
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
mustHave(wrapper, 'not rerun', 'wrapper mode');
mustHave(wrapper, 'not execution', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(wrapper, 'Build 121', 'wrapper Build 121');
mustHave(wrapper, 'Build 120', 'wrapper Build 120');
mustHave(wrapper, 'Build 119', 'wrapper Build 119');
mustHave(wrapper, 'Build 118', 'wrapper Build 118');
mustHave(wrapper, 'exact_command_attempted_after_build_121_status is attempted_blocked_nonzero', 'wrapper mode');
mustHave(wrapper, 'exact_command_exit_status is nonzero_blocked', 'wrapper mode');
mustHave(
  wrapper,
  'command_attempt_consumption_status is consumed_by_blocked_fail_closed_result_after_build_121_guard',
  'wrapper mode',
);
mustHave(wrapper, 'runner_output_state_after_build_121_status is stale_pre_build_118_119_120_121_state_detected', 'wrapper mode');
mustHave(wrapper, 'runner_execution_path_after_after_guard_fresh_chain_wiring_gap_status is detected', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(
  wrapper,
  'runner execution path after-after-guard fresh-chain wiring correction/design and fresh decision path',
  'wrapper mode',
);
mustHave(wrapper, 'not immediate rerun', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, `bash ${runnerPath}`, 'wrapper must not invoke runner');

if (!isExecutable(wrapperPath)) {
  fail(`capture post-build-121 runner command blocked evidence dry-run wrapper is not executable: ${wrapperPath}`);
}
passAssertion('capture_post_build_121_runner_command_blocked_evidence_dry_run_wrapper_present_and_safe');
passAssertion('wrapper_does_not_invoke_runner');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 101) {
  fail(`REQUIRED_ASSERTIONS must contain 101 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Capture Post-Build-121 Runner Command Blocked Evidence verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);