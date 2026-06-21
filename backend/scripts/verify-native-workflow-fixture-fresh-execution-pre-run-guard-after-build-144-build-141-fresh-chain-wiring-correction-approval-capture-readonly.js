#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_144_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_APPROVAL_CAPTURE.md';
const capturePacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_144_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION.md';
const freshDecisionDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_EXECUTION_DECISION_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION.md';
const approvalTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_EXECUTION_DECISION_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_APPROVAL_TEMPLATE.md';
const runnerExecutionPathDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION.md';
const postBuild141BlockedEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_141_RUNNER_COMMAND_BLOCKED_EVIDENCE.md';
const priorFreshPreRunGuardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_139_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_APPROVAL_CAPTURE.md';
const scaffoldingBuildDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_SCAFFOLDING_BUILD.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-144-build-141-fresh-chain-wiring-correction-approval-capture.json';
const upstreamCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-build-144-build-141-fresh-chain-wiring-correction.json';
const upstreamFreshDecisionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-build-141-fresh-chain-wiring-correction.json';
const upstreamRunnerExecutionPathFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-build-141-fresh-chain-wiring-correction.json';
const upstreamPostBuild141BlockedEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-141-runner-command-blocked-evidence.json';
const upstreamPriorFreshPreRunGuardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-139-build-136-fresh-chain-wiring-correction-approval-capture.json';
const upstreamScaffoldingBuildFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-scaffolding-build.json';
const manifestPath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const runnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const wrapperPath =
  'scripts/run-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-144-build-141-fresh-chain-wiring-correction-approval-capture-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-144-build-141-fresh-chain-wiring-correction-approval-capture-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '416a61c';
const PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_144_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT = '416a61c';
const PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT = 'f4c3069';
const PRIOR_RUNNER_EXECUTION_PATH_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT = 'c5a2c41';
const PRIOR_POST_BUILD_141_BLOCKED_EVIDENCE_COMMIT = '6d66f4f';
const PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_139_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_COMMIT = 'db9b293';
const RUNNER_SCAFFOLDING_BUILD_COMMIT = '145bf15';
const SIGNED_APPROVAL_SIGNATURE_NAME = 'Jason Lohse';
const SIGNED_APPROVAL_TIMESTAMP = '06/20/2026 7:30pm MST';
const SIGNED_APPROVAL_CAPTURE_SOURCE = 'chat';
const APPROVAL_SCOPE =
  'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_141_fresh_chain_wiring_correction';
const RUNNER_COMMAND_PATH_STATUS =
  'corrected_fail_closed_ready_for_exact_approved_execution_after_build_144_build_141_fresh_chain_wiring_correction_guard';
const FUTURE_COMMAND_STATUS =
  'ready_for_exact_approved_runner_execution_command_after_build_144_build_141_fresh_chain_wiring_correction_guard_review_only';

const EXACT_WORKING_DIRECTORY = '/root/roofleadhq';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const EXACT_RUNNER_PATH =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const EXACT_MANIFEST_PATH =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const EXACT_EVIDENCE_LOG_PATH_PATTERN =
  'logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log';
const EXACT_STRUCTURED_EVIDENCE_OUTPUT_PATH_PATTERN =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json';

const EXACT_VALUE_FIELDS = [
  'source_of_truth_commit',
  'approval_scope',
  'exact_working_directory',
  'exact_command',
  'exact_runner_path',
  'exact_manifest_path',
  'exact_scenario_count',
  'exact_evidence_log_path_pattern',
  'exact_structured_evidence_output_path_pattern',
  'fresh_runner_execution_approval_capture_status',
  'fresh_runner_execution_jason_signed_approval_status',
  'fresh_runner_execution_exact_values_required_count',
  'fresh_runner_execution_exact_values_accepted_count',
  'fresh_runner_execution_exact_values_approved_count',
  'fresh_runner_execution_approval_status',
  'external_sandbox_calls_approval_status',
  'credentials_access_approval_status',
  'test_account_use_approval_status',
  'production_data_access_approval_status',
  'production_supabase_write_approval_status',
  'schema_auth_rls_security_change_approval_status',
  'live_activation_approval_status',
  'real_homeowner_contact_approval_status',
  'real_roofer_contact_approval_status',
];

const APPROVED_EXACT_VALUES = {
  source_of_truth_commit: 'f4c3069',
  approval_scope:
    'fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_141_fresh_chain_wiring_correction',
  exact_working_directory: '/root/roofleadhq',
  exact_command:
    'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  exact_runner_path:
    'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  exact_manifest_path:
    'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json',
  exact_scenario_count: '30',
  exact_evidence_log_path_pattern:
    'logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log',
  exact_structured_evidence_output_path_pattern:
    'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json',
  fresh_runner_execution_approval_capture_status: 'captured',
  fresh_runner_execution_jason_signed_approval_status: 'signed',
  fresh_runner_execution_exact_values_required_count: '24',
  fresh_runner_execution_exact_values_accepted_count: '24',
  fresh_runner_execution_exact_values_approved_count: '24',
  fresh_runner_execution_approval_status:
    'granted_scoped_one_time_pending_fresh_execution_pre_run_guard_after_build_144_build_141_fresh_chain_wiring_correction',
  external_sandbox_calls_approval_status: 'granted_scoped_test_mode_only_pending_fresh_guard',
  credentials_access_approval_status:
    'granted_scoped_test_mode_only_no_secret_logging_pending_fresh_guard',
  test_account_use_approval_status: 'granted_scoped_test_accounts_only_pending_fresh_guard',
  production_data_access_approval_status: 'not_granted',
  production_supabase_write_approval_status: 'not_granted',
  schema_auth_rls_security_change_approval_status: 'not_granted',
  live_activation_approval_status: 'not_granted',
  real_homeowner_contact_approval_status: 'not_granted',
  real_roofer_contact_approval_status: 'not_granted',
};

const FRESH_PRE_RUN_GUARD_CHECKS = [
  'source_of_truth_commit_is_416a61c',
  'build_145_approval_capture_is_closed',
  'fresh_signed_approval_after_build_144_build_141_fresh_chain_wiring_correction_is_captured',
  'all_24_exact_approval_values_are_accepted_and_approved',
  'exact_working_directory_is_root_roofleadhq',
  'exact_command_matches_signed_approval_after_build_144_build_141_fresh_chain_wiring_correction',
  'exact_runner_path_exists',
  'exact_runner_path_is_executable',
  'exact_manifest_path_exists',
  'exact_scenario_count_is_30',
  'manifest_contains_30_scenarios',
  'prior_build_138_139_140_141_decision_approval_guard_chain_not_reusable',
  'build_142_consumed_prior_post_build_141_attempt',
  'build_143_runner_execution_path_after_build_141_fresh_chain_wiring_correction_referenced',
  'build_144_fresh_decision_template_referenced',
  'build_145_approval_capture_referenced',
  'runner_remains_fail_closed_for_unguarded_direct_invocation',
  'packet_does_not_invoke_runner_as_validation',
  'no_actual_scenario_validation_performed',
  'no_external_calls_made',
  'no_credentials_accessed_or_logged',
  'no_production_data_accessed',
  'no_production_supabase_writes_performed',
  'no_schema_auth_rls_security_changes_made',
  'no_real_homeowner_contact_made',
  'no_real_roofer_contact_made',
  'no_sms_email_calls_calendar_booking_performed',
  'no_billing_payment_deposit_quote_estimate_invoice_automation_performed',
  'live_activation_remains_not_granted',
  'demo_ready_with_live_automation_disabled_preserved_and_future_command_status_review_only_ready_after_guard_not_automatic_execution',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'source_of_truth_commit_416a61c_referenced',
  'prior_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_commit_416a61c_referenced',
  'prior_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_status_closed',
  'prior_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_commit_f4c3069_referenced',
  'prior_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_status_closed',
  'prior_runner_execution_path_after_build_141_fresh_chain_wiring_correction_commit_c5a2c41_referenced',
  'prior_post_build_141_blocked_evidence_commit_6d66f4f_referenced',
  'runner_scaffolding_build_commit_145bf15_referenced',
  'build_145_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_packet_referenced',
  'build_144_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_packet_referenced',
  'build_143_runner_execution_path_after_build_141_fresh_chain_wiring_correction_referenced',
  'build_142_post_build_141_blocked_evidence_referenced',
  'build_141_fresh_execution_pre_run_guard_after_build_139_build_136_fresh_chain_wiring_correction_referenced',
  'build_103_runner_scaffolding_build_referenced',
  'signed_approval_capture_source_chat',
  'signed_approval_signature_jason_lohse_present',
  'signed_approval_timestamp_present',
  'approval_scope_fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_141_fresh_chain_wiring_correction',
  'fresh_runner_execution_approval_capture_status_captured',
  'fresh_runner_execution_jason_signed_approval_status_signed',
  'fresh_runner_execution_exact_values_required_count_24',
  'fresh_runner_execution_exact_values_accepted_count_24',
  'fresh_runner_execution_exact_values_approved_count_24',
  'all_24_fresh_runner_execution_exact_values_present_and_approved',
  'exact_command_paths_documented',
  'prior_command_attempt_consumption_status_consumed_by_blocked_fail_closed_result_after_build_141_guard',
  'immediate_rerun_allowed_false',
  'fresh_runner_execution_approval_required_after_build_141_fresh_chain_wiring_correction_true',
  'fresh_execution_pre_run_guard_required_after_build_141_fresh_chain_wiring_correction_true',
  'prior_fresh_runner_execution_approval_reusable_after_build_141_fresh_chain_wiring_correction_false',
  'prior_fresh_execution_pre_run_guard_reusable_after_build_141_fresh_chain_wiring_correction_false',
  'prior_build_138_139_140_141_decision_approval_guard_chain_reusable_after_build_142_blocked_evidence_false',
  'runner_scaffolding_build_status_built_review_only',
  'runner_command_path_status_corrected_fail_closed_ready_for_exact_approved_execution_after_build_144_build_141_fresh_chain_wiring_correction_guard',
  'runner_fail_closed_sanity_check_status_blocked_exit_code_1',
  'fresh_runner_execution_approval_status_granted_scoped_one_time_pending_fresh_execution_pre_run_guard_after_build_144_build_141_fresh_chain_wiring_correction',
  'external_sandbox_calls_approval_status_granted_scoped_test_mode_only_after_fresh_guard',
  'credentials_access_approval_status_granted_scoped_test_mode_only_no_secret_logging_after_fresh_guard',
  'test_account_use_approval_status_granted_scoped_test_accounts_only_after_fresh_guard',
  'production_data_access_approval_status_not_granted',
  'production_supabase_write_approval_status_not_granted',
  'schema_auth_rls_security_change_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'real_homeowner_contact_approval_status_not_granted',
  'real_roofer_contact_approval_status_not_granted',
  'sms_email_calls_calendar_booking_approval_status_not_granted',
  'billing_payment_automation_approval_status_not_granted',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'runner_execution_status_not_run_by_this_packet',
  'runner_command_invoked_by_this_packet_false',
  'fresh_execution_pre_run_guard_status_passed',
  'future_command_status_ready_for_exact_approved_runner_execution_command_after_build_144_build_141_fresh_chain_wiring_correction_guard_review_only',
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_missing_count_30',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'external_calls_made_by_this_packet_false',
  'credentials_accessed_by_this_packet_false',
  'production_data_accessed_by_this_packet_false',
  'real_contact_made_by_this_packet_false',
  'sms_email_calls_calendar_booking_performed_by_this_packet_false',
  'packet_is_fresh_execution_pre_run_guard_only',
  'packet_does_not_perform_actual_30_scenario_validation',
  'packet_does_not_run_runner',
  'packet_does_not_invoke_exact_command',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_contact_roofer_or_homeowner',
  'packet_does_not_approve_live_activation',
  'packet_does_not_approve_production_supabase_writes',
  'packet_does_not_approve_schema_auth_rls_security_changes',
  'packet_does_not_approve_billing_payment_automation',
  'packet_does_not_treat_prior_build_138_139_140_141_decision_approval_guard_chain_as_reusable',
  'next_step_exact_approved_runner_execution_command_after_build_144_build_141_fresh_chain_wiring_correction_guard_review_only',
  'fresh_execution_pre_run_guard_checks_required_count_30',
  'fresh_execution_pre_run_guard_checks_passed_count_30',
  'fresh_execution_pre_run_guard_failed_count_0',
  'runner_readiness_validation_status_passed',
  'manifest_readiness_validation_status_passed',
  'evidence_output_path_readiness_status_passed',
  'no_stale_runner_state_status_passed',
  'no_immediate_runner_invocation_by_this_packet_true',
  'secret_values_logged_by_this_packet_false',
  'packet_does_not_send_sms_email_calls_calendar_booking',
  'runner_remains_fail_closed_for_unguarded_direct_invocation',
  'fresh_execution_pre_run_guard_checks_all_30_checks_present',
  'fresh_execution_pre_run_guard_checks_all_30_checks_passed',
  'structured_fixture_present',
  'upstream_capture_after_build_144_build_141_fresh_chain_wiring_correction_fixture_present',
  'upstream_fresh_decision_after_build_141_fresh_chain_wiring_correction_fixture_present',
  'upstream_runner_execution_path_after_build_141_fresh_chain_wiring_correction_fixture_present',
  'upstream_post_build_141_blocked_evidence_fixture_present',
  'upstream_fresh_pre_run_guard_after_build_139_build_136_fresh_chain_wiring_correction_fixture_present_not_reusable',
  'upstream_scaffolding_build_fixture_present',
  'manifest_fixture_present',
  'manifest_path_exists',
  'total_manifest_scenarios_count_30',
  'runner_command_path_exists',
  'runner_command_path_executable',
  'structured_fixture_valid_json',
  'demo_ready_with_live_automation_disabled_preserved',
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
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'fresh_execution_pre_run_guard_after_build_144_build_141_fresh_chain_wiring_correction_approval_capture_dry_run_wrapper_present_and_safe',
  'wrapper_does_not_invoke_runner',
  'verifier_file_present',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_144_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_APPROVAL_CAPTURE.md',
  'run-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-144-build-141-fresh-chain-wiring-correction-approval-capture-dry-run.sh',
  'verify-native-workflow-fixture-fresh-execution-pre-run-guard-after-build-144-build-141-fresh-chain-wiring-correction-approval-capture-readonly.js',
  'fresh-execution-pre-run-guard-after-build-144-build-141-fresh-chain-wiring-correction-approval-capture.json',
  'Native Workflow Fixture Fresh Execution Pre-Run Guard Build 144 Build 141 Fresh-Chain Wiring Correction Approval Capture',
  'native workflow fixture fresh execution pre run guard after build 144 build 141 fresh chain wiring correction approval capture',
  'fresh execution pre run guard after build 144 build 141 fresh chain wiring correction approval capture',
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
read(capturePacketDocPath);
read(freshDecisionDocPath);
read(approvalTemplateDocPath);
read(runnerExecutionPathDocPath);
read(postBuild141BlockedEvidenceDocPath);
read(priorFreshPreRunGuardDocPath);
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
  'fake-data/local-only/read-only/dry-run-only/review-only/fresh-execution-pre-run-guard-only/non-executing',
  'packet doc',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
passAssertion('source_of_truth_commit_416a61c_referenced');

mustHave(
  packetDoc,
  PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_144_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT,
  'packet doc',
);
mustHave(
  packetDoc,
  'prior_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_status | closed',
  'packet doc',
);
passAssertion(
  'prior_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_commit_416a61c_referenced',
);
passAssertion(
  'prior_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_status_closed',
);

mustHave(packetDoc, capturePacketDocPath, 'packet doc');
mustHave(packetDoc, 'Build 145', 'packet doc');
passAssertion(
  'build_145_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_packet_referenced',
);

mustHave(
  packetDoc,
  PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT,
  'packet doc',
);
passAssertion(
  'prior_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_commit_f4c3069_referenced',
);

mustHave(
  packetDoc,
  'prior_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_status | closed',
  'packet doc',
);
passAssertion('prior_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_status_closed');

mustHave(
  packetDoc,
  PRIOR_RUNNER_EXECUTION_PATH_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT,
  'packet doc',
);
passAssertion(
  'prior_runner_execution_path_after_build_141_fresh_chain_wiring_correction_commit_c5a2c41_referenced',
);

mustHave(packetDoc, PRIOR_POST_BUILD_141_BLOCKED_EVIDENCE_COMMIT, 'packet doc');
passAssertion('prior_post_build_141_blocked_evidence_commit_6d66f4f_referenced');

mustHave(packetDoc, freshDecisionDocPath, 'packet doc');
mustHave(packetDoc, upstreamFreshDecisionFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 144', 'packet doc');
passAssertion(
  'build_144_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_packet_referenced',
);

mustHave(packetDoc, runnerExecutionPathDocPath, 'packet doc');
mustHave(packetDoc, upstreamRunnerExecutionPathFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 143', 'packet doc');
passAssertion('build_143_runner_execution_path_after_build_141_fresh_chain_wiring_correction_referenced');

mustHave(packetDoc, postBuild141BlockedEvidenceDocPath, 'packet doc');
mustHave(packetDoc, upstreamPostBuild141BlockedEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 142', 'packet doc');
passAssertion('build_142_post_build_141_blocked_evidence_referenced');

mustHave(packetDoc, priorFreshPreRunGuardDocPath, 'packet doc');
mustHave(packetDoc, upstreamPriorFreshPreRunGuardFixturePath, 'packet doc');
mustHave(packetDoc, PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_139_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_COMMIT, 'packet doc');
mustHave(packetDoc, 'Build 141', 'packet doc');
passAssertion('build_141_fresh_execution_pre_run_guard_after_build_139_build_136_fresh_chain_wiring_correction_referenced');

mustHave(packetDoc, scaffoldingBuildDocPath, 'packet doc');
mustHave(packetDoc, upstreamScaffoldingBuildFixturePath, 'packet doc');
mustHave(packetDoc, RUNNER_SCAFFOLDING_BUILD_COMMIT, 'packet doc');
mustHave(packetDoc, 'Build 103', 'packet doc');
passAssertion('build_103_runner_scaffolding_build_referenced');

mustHave(packetDoc, `signed_approval_capture_source | ${SIGNED_APPROVAL_CAPTURE_SOURCE}`, 'packet doc');
passAssertion('signed_approval_capture_source_chat');

mustHave(packetDoc, SIGNED_APPROVAL_SIGNATURE_NAME, 'packet doc');
passAssertion('signed_approval_signature_jason_lohse_present');
mustHave(packetDoc, SIGNED_APPROVAL_TIMESTAMP, 'packet doc');
passAssertion('signed_approval_timestamp_present');

mustHave(packetDoc, `approval_scope | ${APPROVAL_SCOPE}`, 'packet doc');
passAssertion(
  'approval_scope_fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_141_fresh_chain_wiring_correction',
);

mustHave(packetDoc, 'fresh_runner_execution_approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_jason_signed_approval_status | signed', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_exact_values_required_count | 24', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_exact_values_accepted_count | 24', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_exact_values_approved_count | 24', 'packet doc');
passAssertion('fresh_runner_execution_approval_capture_status_captured');
passAssertion('fresh_runner_execution_jason_signed_approval_status_signed');
passAssertion('fresh_runner_execution_exact_values_required_count_24');
passAssertion('fresh_runner_execution_exact_values_accepted_count_24');
passAssertion('fresh_runner_execution_exact_values_approved_count_24');

for (const field of EXACT_VALUE_FIELDS) {
  mustHave(packetDoc, `| ${field} |`, 'packet doc exact values table');
  mustHave(
    packetDoc,
    `| ${field} | ${APPROVED_EXACT_VALUES[field]} | true | true | accepted_and_approved |`,
    'packet doc exact values',
  );
}
passAssertion('all_24_fresh_runner_execution_exact_values_present_and_approved');

mustHave(packetDoc, `exact_working_directory | ${EXACT_WORKING_DIRECTORY}`, 'packet doc');
mustHave(packetDoc, `exact_command | ${EXACT_COMMAND}`, 'packet doc');
mustHave(packetDoc, `exact_runner_path | ${EXACT_RUNNER_PATH}`, 'packet doc');
mustHave(packetDoc, `exact_manifest_path | ${EXACT_MANIFEST_PATH}`, 'packet doc');
mustHave(packetDoc, 'exact_scenario_count | 30', 'packet doc');
mustHave(packetDoc, `exact_evidence_log_path_pattern | ${EXACT_EVIDENCE_LOG_PATH_PATTERN}`, 'packet doc');
mustHave(
  packetDoc,
  `exact_structured_evidence_output_path_pattern | ${EXACT_STRUCTURED_EVIDENCE_OUTPUT_PATH_PATTERN}`,
  'packet doc',
);
passAssertion('exact_command_paths_documented');

mustHave(
  packetDoc,
  'prior_command_attempt_consumption_status | consumed_by_blocked_fail_closed_result_after_build_141_guard',
  'packet doc',
);
passAssertion(
  'prior_command_attempt_consumption_status_consumed_by_blocked_fail_closed_result_after_build_141_guard',
);

mustHave(packetDoc, 'immediate_rerun_allowed | false', 'packet doc');
passAssertion('immediate_rerun_allowed_false');

mustHave(
  packetDoc,
  'fresh_runner_execution_approval_required_after_build_141_fresh_chain_wiring_correction | true',
  'packet doc',
);
mustHave(
  packetDoc,
  'fresh_execution_pre_run_guard_required_after_build_141_fresh_chain_wiring_correction | true',
  'packet doc',
);
passAssertion('fresh_runner_execution_approval_required_after_build_141_fresh_chain_wiring_correction_true');
passAssertion('fresh_execution_pre_run_guard_required_after_build_141_fresh_chain_wiring_correction_true');

mustHave(
  packetDoc,
  'prior_fresh_runner_execution_approval_reusable_after_build_141_fresh_chain_wiring_correction | false',
  'packet doc',
);
mustHave(
  packetDoc,
  'prior_fresh_execution_pre_run_guard_reusable_after_build_141_fresh_chain_wiring_correction | false',
  'packet doc',
);
passAssertion('prior_fresh_runner_execution_approval_reusable_after_build_141_fresh_chain_wiring_correction_false');
passAssertion('prior_fresh_execution_pre_run_guard_reusable_after_build_141_fresh_chain_wiring_correction_false');

mustHave(packetDoc, 'runner_scaffolding_build_status | built_review_only', 'packet doc');
passAssertion('runner_scaffolding_build_status_built_review_only');

mustHave(packetDoc, `runner_command_path_status | ${RUNNER_COMMAND_PATH_STATUS}`, 'packet doc');
mustHave(packetDoc, 'runner_fail_closed_sanity_check_status | blocked_exit_code_1', 'packet doc');
passAssertion(
  'runner_command_path_status_corrected_fail_closed_ready_for_exact_approved_execution_after_build_144_build_141_fresh_chain_wiring_correction_guard',
);
passAssertion('runner_fail_closed_sanity_check_status_blocked_exit_code_1');

mustHave(
  packetDoc,
  'fresh_runner_execution_approval_status | granted_scoped_one_time_pending_fresh_execution_pre_run_guard_after_build_144_build_141_fresh_chain_wiring_correction',
  'packet doc',
);
mustHave(
  packetDoc,
  'external_sandbox_calls_approval_status | granted_scoped_test_mode_only_after_fresh_guard',
  'packet doc',
);
mustHave(
  packetDoc,
  'credentials_access_approval_status | granted_scoped_test_mode_only_no_secret_logging_after_fresh_guard',
  'packet doc',
);
mustHave(
  packetDoc,
  'test_account_use_approval_status | granted_scoped_test_accounts_only_after_fresh_guard',
  'packet doc',
);
mustHave(packetDoc, 'production_data_access_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'production_supabase_write_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'schema_auth_rls_security_change_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'live_activation_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_homeowner_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_roofer_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'billing_payment_automation_approval_status | not_granted', 'packet doc');
passAssertion(
  'fresh_runner_execution_approval_status_granted_scoped_one_time_pending_fresh_execution_pre_run_guard_after_build_144_build_141_fresh_chain_wiring_correction',
);
passAssertion('external_sandbox_calls_approval_status_granted_scoped_test_mode_only_after_fresh_guard');
passAssertion('credentials_access_approval_status_granted_scoped_test_mode_only_no_secret_logging_after_fresh_guard');
passAssertion('test_account_use_approval_status_granted_scoped_test_accounts_only_after_fresh_guard');
passAssertion('production_data_access_approval_status_not_granted');
passAssertion('production_supabase_write_approval_status_not_granted');
passAssertion('schema_auth_rls_security_change_approval_status_not_granted');
passAssertion('live_activation_approval_status_not_granted');
passAssertion('real_homeowner_contact_approval_status_not_granted');
passAssertion('real_roofer_contact_approval_status_not_granted');
passAssertion('sms_email_calls_calendar_booking_approval_status_not_granted');
passAssertion('billing_payment_automation_approval_status_not_granted');

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(packetDoc, 'runner_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(packetDoc, 'runner_command_invoked_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_status | passed', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_checks_required_count | 30', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_checks_passed_count | 30', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_failed_count | 0', 'packet doc');
mustHave(packetDoc, 'runner_readiness_validation_status | passed', 'packet doc');
mustHave(packetDoc, 'manifest_readiness_validation_status | passed', 'packet doc');
mustHave(packetDoc, 'evidence_output_path_readiness_status | passed', 'packet doc');
mustHave(packetDoc, 'no_stale_runner_state_status | passed', 'packet doc');
mustHave(packetDoc, 'no_immediate_runner_invocation_by_this_packet | true', 'packet doc');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('runner_execution_status_not_run_by_this_packet');
passAssertion('runner_command_invoked_by_this_packet_false');
passAssertion('fresh_execution_pre_run_guard_status_passed');
passAssertion('fresh_execution_pre_run_guard_checks_required_count_30');
passAssertion('fresh_execution_pre_run_guard_checks_passed_count_30');
passAssertion('fresh_execution_pre_run_guard_failed_count_0');
passAssertion('runner_readiness_validation_status_passed');
passAssertion('manifest_readiness_validation_status_passed');
passAssertion('evidence_output_path_readiness_status_passed');
passAssertion('no_stale_runner_state_status_passed');
passAssertion('no_immediate_runner_invocation_by_this_packet_true');

mustHave(packetDoc, `future_command_status | ${FUTURE_COMMAND_STATUS}`, 'packet doc');
passAssertion(
  'future_command_status_ready_for_exact_approved_runner_execution_command_after_build_144_build_141_fresh_chain_wiring_correction_guard_review_only',
);

mustHave(packetDoc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(
  packetDoc,
  'actual_30_scenario_external_validation_status | not_captured_by_this_run',
  'packet doc',
);
passAssertion('actual_30_scenario_external_validation_captured_count_0');
passAssertion('actual_30_scenario_external_validation_passed_count_0');
passAssertion('actual_30_scenario_external_validation_missing_count_30');
passAssertion('actual_30_scenario_external_validation_status_not_captured_by_this_run');

mustHave(packetDoc, 'external_calls_made_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'credentials_accessed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'production_data_accessed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'real_contact_made_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_performed_by_this_packet | false', 'packet doc');
passAssertion('external_calls_made_by_this_packet_false');
passAssertion('credentials_accessed_by_this_packet_false');
passAssertion('production_data_accessed_by_this_packet_false');
passAssertion('real_contact_made_by_this_packet_false');
passAssertion('sms_email_calls_calendar_booking_performed_by_this_packet_false');

mustHave(
  packetDoc,
  'This is the **fresh execution pre-run guard only** after build 144 build 141 fresh-chain wiring correction approval capture.',
  'packet doc',
);
passAssertion('packet_is_fresh_execution_pre_run_guard_only');
mustHave(packetDoc, 'This packet does **not** run the runner', 'packet doc');
passAssertion('packet_does_not_run_runner');
mustHave(packetDoc, 'This packet does **not** invoke the exact approved command', 'packet doc');
passAssertion('packet_does_not_invoke_exact_command');
mustHave(packetDoc, 'This packet does **not** perform actual 30-scenario validation', 'packet doc');
passAssertion('packet_does_not_perform_actual_30_scenario_validation');
mustHave(packetDoc, 'This packet does **not** make external calls', 'packet doc');
passAssertion('packet_does_not_make_external_calls');
mustHave(packetDoc, 'This packet does **not** access credentials or secret values', 'packet doc');
passAssertion('packet_does_not_access_credentials');
mustHave(packetDoc, 'This packet does **not** access production data', 'packet doc');
passAssertion('packet_does_not_access_production_data');
mustHave(packetDoc, 'This packet does **not** contact real homeowners or roofers', 'packet doc');
passAssertion('packet_does_not_contact_roofer_or_homeowner');
mustHave(packetDoc, 'This packet does **not** send SMS/email/calls or create calendar bookings', 'packet doc');
passAssertion('packet_does_not_send_sms_email_calls_calendar_booking');
mustHave(packetDoc, 'This packet does **not** approve live activation', 'packet doc');
passAssertion('packet_does_not_approve_live_activation');
mustHave(packetDoc, 'This packet does **not** approve production Supabase writes', 'packet doc');
passAssertion('packet_does_not_approve_production_supabase_writes');
mustHave(packetDoc, 'This packet does **not** approve schema/auth/RLS/security changes', 'packet doc');
passAssertion('packet_does_not_approve_schema_auth_rls_security_changes');
mustHave(packetDoc, 'This packet does **not** approve billing/payment/quote/estimate/invoice automation', 'packet doc');
passAssertion('packet_does_not_approve_billing_payment_automation');
mustHave(
  packetDoc,
  'exact approved runner execution command after build 144 build 141 fresh-chain wiring correction guard review',
  'packet doc',
);
passAssertion(
  'next_step_exact_approved_runner_execution_command_after_build_144_build_141_fresh_chain_wiring_correction_guard_review_only',
);
mustHave(packetDoc, 'Fresh execution pre-run guard pass does **not** equal runner execution.', 'packet doc');
mustHave(
  packetDoc,
  'This packet does **not** treat prior Build 138/139/140/141 approvals/guard chain as reusable.',
  'packet doc',
);
passAssertion('packet_does_not_treat_prior_build_138_139_140_141_decision_approval_guard_chain_as_reusable');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');

for (const check of FRESH_PRE_RUN_GUARD_CHECKS) {
  mustHave(packetDoc, check, 'packet doc fresh pre-run guard checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc fresh pre-run guard check status');
}
passAssertion('fresh_execution_pre_run_guard_checks_all_30_checks_present');
passAssertion('fresh_execution_pre_run_guard_checks_all_30_checks_passed');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

for (const upstreamFixturePath of [
  upstreamCaptureFixturePath,
  upstreamFreshDecisionFixturePath,
  upstreamRunnerExecutionPathFixturePath,
  upstreamPostBuild141BlockedEvidenceFixturePath,
  upstreamPriorFreshPreRunGuardFixturePath,
  upstreamScaffoldingBuildFixturePath,
]) {
  if (!fs.existsSync(path.join(root, upstreamFixturePath))) {
    fail(`missing upstream fixture: ${upstreamFixturePath}`);
  }
}
passAssertion('upstream_capture_after_build_144_build_141_fresh_chain_wiring_correction_fixture_present');
passAssertion('upstream_fresh_decision_after_build_141_fresh_chain_wiring_correction_fixture_present');
passAssertion('upstream_runner_execution_path_after_build_141_fresh_chain_wiring_correction_fixture_present');
passAssertion('upstream_post_build_141_blocked_evidence_fixture_present');
passAssertion('upstream_fresh_pre_run_guard_after_build_139_build_136_fresh_chain_wiring_correction_fixture_present_not_reusable');
passAssertion('upstream_scaffolding_build_fixture_present');

if (!fs.existsSync(path.join(root, manifestPath))) {
  fail(`missing manifest fixture: ${manifestPath}`);
}
passAssertion('manifest_fixture_present');
passAssertion('manifest_path_exists');

const fixture = readJson(fixturePath);
const upstreamCaptureFixture = readJson(upstreamCaptureFixturePath);
const upstreamFreshDecisionFixture = readJson(upstreamFreshDecisionFixturePath);
const upstreamRunnerExecutionPathFixture = readJson(upstreamRunnerExecutionPathFixturePath);
const upstreamPostBuild141BlockedEvidenceFixture = readJson(upstreamPostBuild141BlockedEvidenceFixturePath);
const upstreamPriorFreshPreRunGuardFixture = readJson(upstreamPriorFreshPreRunGuardFixturePath);
const upstreamScaffoldingBuildFixture = readJson(upstreamScaffoldingBuildFixturePath);
const manifest = readJson(manifestPath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 416a61c');
}
if (
  fixture.prior_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_commit !==
  PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_144_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT
) {
  fail(
    'fixture prior_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_commit must be 416a61c',
  );
}
if (
  fixture.prior_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_status !==
  'closed'
) {
  fail(
    'fixture prior_capture_fresh_runner_execution_approval_after_build_144_build_141_fresh_chain_wiring_correction_status must be closed',
  );
}
if (
  fixture.prior_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_commit !==
  PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT
) {
  fail('fixture prior_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_commit must be f4c3069');
}
if (fixture.prior_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_status !== 'closed') {
  fail('fixture prior_fresh_runner_execution_decision_after_build_141_fresh_chain_wiring_correction_status must be closed');
}
if (
  fixture.prior_runner_execution_path_after_build_141_fresh_chain_wiring_correction_commit !==
  PRIOR_RUNNER_EXECUTION_PATH_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT
) {
  fail('fixture prior_runner_execution_path_after_build_141_fresh_chain_wiring_correction_commit must be c5a2c41');
}
if (fixture.signed_approval_capture_source !== SIGNED_APPROVAL_CAPTURE_SOURCE) {
  fail('fixture signed_approval_capture_source must be chat');
}
if (fixture.approval_scope !== APPROVAL_SCOPE) {
  fail('fixture approval_scope mismatch');
}
if (fixture.signed_approval_timestamp !== SIGNED_APPROVAL_TIMESTAMP) {
  fail('fixture signed_approval_timestamp mismatch');
}
if (fixture.fresh_runner_execution_signed_by !== SIGNED_APPROVAL_SIGNATURE_NAME) {
  fail('fixture fresh_runner_execution_signed_by mismatch');
}
if (fixture.fresh_runner_execution_signed_at !== SIGNED_APPROVAL_TIMESTAMP) {
  fail('fixture fresh_runner_execution_signed_at mismatch');
}
if (
  fixture.prior_command_attempt_consumption_status !==
  'consumed_by_blocked_fail_closed_result_after_build_141_guard'
) {
  fail('fixture prior_command_attempt_consumption_status must be consumed_by_blocked_fail_closed_result_after_build_141_guard');
}
if (fixture.immediate_rerun_allowed !== false) {
  fail('fixture immediate_rerun_allowed must be false');
}
if (fixture.fresh_runner_execution_approval_required_after_build_141_fresh_chain_wiring_correction !== true) {
  fail('fixture fresh_runner_execution_approval_required_after_build_141_fresh_chain_wiring_correction must be true');
}
if (fixture.fresh_execution_pre_run_guard_required_after_build_141_fresh_chain_wiring_correction !== true) {
  fail('fixture fresh_execution_pre_run_guard_required_after_build_141_fresh_chain_wiring_correction must be true');
}
if (fixture.prior_fresh_runner_execution_approval_reusable_after_build_141_fresh_chain_wiring_correction !== false) {
  fail('fixture prior_fresh_runner_execution_approval_reusable_after_build_141_fresh_chain_wiring_correction must be false');
}
if (fixture.prior_fresh_execution_pre_run_guard_reusable_after_build_141_fresh_chain_wiring_correction !== false) {
  fail('fixture prior_fresh_execution_pre_run_guard_reusable_after_build_141_fresh_chain_wiring_correction must be false');
}
if (
  fixture.prior_build_138_139_140_141_decision_approval_guard_chain_reusable_after_build_142_blocked_evidence !==
  false
) {
  fail(
    'fixture prior_build_138_139_140_141_decision_approval_guard_chain_reusable_after_build_142_blocked_evidence must be false',
  );
}
if (fixture.prior_build_142_consumed_attempt_status !== 'consumed') {
  fail('fixture prior_build_142_consumed_attempt_status must be consumed');
}
if (fixture.fresh_runner_execution_approval_capture_status !== 'captured') {
  fail('fixture fresh_runner_execution_approval_capture_status must be captured');
}
if (fixture.fresh_runner_execution_jason_signed_approval_status !== 'signed') {
  fail('fixture fresh_runner_execution_jason_signed_approval_status must be signed');
}
if (fixture.fresh_runner_execution_exact_values_required_count !== 24) {
  fail('fixture fresh_runner_execution_exact_values_required_count must be 24');
}
if (fixture.fresh_runner_execution_exact_values_accepted_count !== 24) {
  fail('fixture fresh_runner_execution_exact_values_accepted_count must be 24');
}
if (fixture.fresh_runner_execution_exact_values_approved_count !== 24) {
  fail('fixture fresh_runner_execution_exact_values_approved_count must be 24');
}
if (fixture.runner_scaffolding_build_status !== 'built_review_only') {
  fail('fixture runner_scaffolding_build_status must be built_review_only');
}
if (fixture.runner_command_path_status !== RUNNER_COMMAND_PATH_STATUS) {
  fail('fixture runner_command_path_status mismatch');
}
if (fixture.runner_fail_closed_sanity_check_status !== 'blocked_exit_code_1') {
  fail('fixture runner_fail_closed_sanity_check_status mismatch');
}
if (
  fixture.fresh_runner_execution_approval_status !==
  'granted_scoped_one_time_pending_fresh_execution_pre_run_guard_after_build_144_build_141_fresh_chain_wiring_correction'
) {
  fail('fixture fresh_runner_execution_approval_status mismatch');
}
if (fixture.external_sandbox_calls_approval_status !== 'granted_scoped_test_mode_only_after_fresh_guard') {
  fail('fixture external_sandbox_calls_approval_status mismatch');
}
if (
  fixture.credentials_access_approval_status !==
  'granted_scoped_test_mode_only_no_secret_logging_after_fresh_guard'
) {
  fail('fixture credentials_access_approval_status mismatch');
}
if (fixture.test_account_use_approval_status !== 'granted_scoped_test_accounts_only_after_fresh_guard') {
  fail('fixture test_account_use_approval_status mismatch');
}
if (fixture.production_data_access_approval_status !== 'not_granted') {
  fail('fixture production_data_access_approval_status must be not_granted');
}
if (fixture.production_supabase_write_approval_status !== 'not_granted') {
  fail('fixture production_supabase_write_approval_status must be not_granted');
}
if (fixture.schema_auth_rls_security_change_approval_status !== 'not_granted') {
  fail('fixture schema_auth_rls_security_change_approval_status must be not_granted');
}
if (fixture.live_activation_approval_status !== 'not_granted') {
  fail('fixture live_activation_approval_status must be not_granted');
}
if (fixture.real_homeowner_contact_approval_status !== 'not_granted') {
  fail('fixture real_homeowner_contact_approval_status must be not_granted');
}
if (fixture.real_roofer_contact_approval_status !== 'not_granted') {
  fail('fixture real_roofer_contact_approval_status must be not_granted');
}
if (fixture.sms_email_calls_calendar_booking_approval_status !== 'not_granted') {
  fail('fixture sms_email_calls_calendar_booking_approval_status must be not_granted');
}
if (fixture.billing_payment_automation_approval_status !== 'not_granted') {
  fail('fixture billing_payment_automation_approval_status must be not_granted');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
}
if (fixture.runner_execution_status !== 'not_run_by_this_packet') {
  fail('fixture runner_execution_status must be not_run_by_this_packet');
}
if (fixture.runner_command_invoked_by_this_packet !== false) {
  fail('fixture runner_command_invoked_by_this_packet must be false');
}
if (fixture.fresh_execution_pre_run_guard_status !== 'passed') {
  fail('fixture fresh_execution_pre_run_guard_status must be passed');
}
if (fixture.fresh_execution_pre_run_guard_checks_required_count !== 30) {
  fail('fixture fresh_execution_pre_run_guard_checks_required_count must be 30');
}
if (fixture.fresh_execution_pre_run_guard_checks_passed_count !== 30) {
  fail('fixture fresh_execution_pre_run_guard_checks_passed_count must be 30');
}
if (fixture.fresh_execution_pre_run_guard_failed_count !== 0) {
  fail('fixture fresh_execution_pre_run_guard_failed_count must be 0');
}
if (fixture.runner_readiness_validation_status !== 'passed') {
  fail('fixture runner_readiness_validation_status must be passed');
}
if (fixture.manifest_readiness_validation_status !== 'passed') {
  fail('fixture manifest_readiness_validation_status must be passed');
}
if (fixture.evidence_output_path_readiness_status !== 'passed') {
  fail('fixture evidence_output_path_readiness_status must be passed');
}
if (fixture.no_stale_runner_state_status !== 'passed') {
  fail('fixture no_stale_runner_state_status must be passed');
}
if (fixture.no_immediate_runner_invocation_by_this_packet !== true) {
  fail('fixture no_immediate_runner_invocation_by_this_packet must be true');
}
if (fixture.secret_values_logged_by_this_packet !== false) {
  fail('fixture secret_values_logged_by_this_packet must be false');
}
if (fixture.future_command_status !== FUTURE_COMMAND_STATUS) {
  fail('fixture future_command_status mismatch');
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
if (fixture.external_calls_made_by_this_packet !== false) {
  fail('fixture external_calls_made_by_this_packet must be false');
}
if (fixture.credentials_accessed_by_this_packet !== false) {
  fail('fixture credentials_accessed_by_this_packet must be false');
}
if (fixture.production_data_accessed_by_this_packet !== false) {
  fail('fixture production_data_accessed_by_this_packet must be false');
}
if (fixture.real_contact_made_by_this_packet !== false) {
  fail('fixture real_contact_made_by_this_packet must be false');
}
if (fixture.sms_email_calls_calendar_booking_performed_by_this_packet !== false) {
  fail('fixture sms_email_calls_calendar_booking_performed_by_this_packet must be false');
}
if (fixture.demo_ready_with_live_automation_disabled !== 'preserved') {
  fail('fixture demo_ready_with_live_automation_disabled must be preserved');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}

for (const field of EXACT_VALUE_FIELDS) {
  const pendingGuardFields = [
    'external_sandbox_calls_approval_status',
    'credentials_access_approval_status',
    'test_account_use_approval_status',
  ];
  const expected = pendingGuardFields.includes(field)
    ? upstreamCaptureFixture.accepted_exact_values[field]
    : APPROVED_EXACT_VALUES[field];
  if (upstreamCaptureFixture.accepted_exact_values[field] !== expected) {
    fail(`upstream capture after build 144 build 141 fresh-chain wiring correction fixture accepted_exact_values.${field} mismatch`);
  }
  if (upstreamCaptureFixture.approved_exact_values[field] !== expected) {
    fail(`upstream capture after build 144 build 141 fresh-chain wiring correction fixture approved_exact_values.${field} mismatch`);
  }
  if (
    !pendingGuardFields.includes(field) &&
    APPROVED_EXACT_VALUES[field] !== upstreamCaptureFixture.accepted_exact_values[field]
  ) {
    fail(`approved exact values.${field} must match upstream capture fixture`);
  }
}
passAssertion('all_24_fresh_runner_execution_exact_values_verified_from_upstream_capture');

if (
  !Array.isArray(fixture.fresh_execution_pre_run_guard_checks) ||
  fixture.fresh_execution_pre_run_guard_checks.length !== 30
) {
  fail('fixture fresh_execution_pre_run_guard_checks must contain 30 checks');
}
for (let i = 0; i < FRESH_PRE_RUN_GUARD_CHECKS.length; i += 1) {
  const check = fixture.fresh_execution_pre_run_guard_checks[i];
  if (check.check !== i + 1) {
    fail(`fixture fresh_execution_pre_run_guard_checks[${i}].check must be ${i + 1}`);
  }
  if (check.name !== FRESH_PRE_RUN_GUARD_CHECKS[i]) {
    fail(`fixture fresh_execution_pre_run_guard_checks[${i}].name mismatch`);
  }
  if (check.status !== 'passed') {
    fail(`fixture fresh_execution_pre_run_guard_checks[${i}].status must be passed`);
  }
}

if (upstreamCaptureFixture.fresh_runner_execution_approval_capture_status !== 'captured') {
  fail('upstream capture after build 144 build 141 fresh-chain wiring correction fixture fresh_runner_execution_approval_capture_status must be captured');
}
if (upstreamCaptureFixture.fresh_execution_pre_run_guard_status !== 'not_passed_by_this_packet') {
  fail('upstream capture after build 144 build 141 fresh-chain wiring correction fixture fresh_execution_pre_run_guard_status must be not_passed_by_this_packet');
}
if (
  upstreamCaptureFixture.future_command_status !==
  'blocked_until_fresh_execution_pre_run_guard_passes_after_build_144_build_141_fresh_chain_wiring_correction_approval_capture'
) {
  fail('upstream capture after build 144 build 141 fresh-chain wiring correction fixture future_command_status mismatch');
}

if (upstreamFreshDecisionFixture.fresh_runner_execution_decision_template_status !== 'created_review_only') {
  fail(
    'upstream fresh decision after build 141 fresh-chain wiring correction fixture fresh_runner_execution_decision_template_status must be created_review_only',
  );
}

if (!upstreamRunnerExecutionPathFixture.packet_name) {
  fail('upstream runner execution path after build 141 fresh-chain wiring correction fixture must exist with packet_name');
}

if (!upstreamPostBuild141BlockedEvidenceFixture.packet_name) {
  fail('upstream post build 141 blocked evidence fixture must exist with packet_name');
}

if (!upstreamPriorFreshPreRunGuardFixture.packet_name) {
  fail('upstream fresh pre-run guard after build 139 build 136 fresh-chain wiring correction fixture must exist with packet_name');
}

if (upstreamScaffoldingBuildFixture.runner_scaffolding_build_status !== 'built_review_only') {
  fail('upstream scaffolding build fixture runner_scaffolding_build_status must be built_review_only');
}

if (manifest.total_manifest_scenarios_count !== 30) {
  fail('manifest total_manifest_scenarios_count must be 30');
}
if (!Array.isArray(manifest.scenarios) || manifest.scenarios.length !== 30) {
  fail('manifest scenarios array must contain exactly 30 scenarios');
}
passAssertion('total_manifest_scenarios_count_30');

if (!fs.existsSync(path.join(root, runnerPath))) {
  fail(`missing runner command path: ${runnerPath}`);
}
passAssertion('runner_command_path_exists');

if (!isExecutable(runnerPath)) {
  fail(`runner command path is not executable: ${runnerPath}`);
}
passAssertion('runner_command_path_executable');

const runnerScript = read(runnerPath);
mustHave(runnerScript, 'BLOCKED', 'runner script');
mustHave(runnerScript, 'exit 1', 'runner script');

try {
  execSync(`bash ${runnerPath}`, { cwd: root, stdio: 'pipe' });
  fail('runner fail-closed sanity check must exit non-zero');
} catch (error) {
  if (!error.status || error.status !== 1) {
    fail(`runner fail-closed sanity check must exit 1 (got ${error.status})`);
  }
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
passAssertion('demo_ready_with_live_automation_disabled_preserved');

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
  'Native Workflow Fixture Fresh Execution Pre-Run Guard Build 144 Build 141 Fresh-Chain Wiring Correction Approval Capture',
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
mustHave(
  wrapper,
  'local fresh execution pre-run guard after build 144 build 141 fresh-chain wiring correction approval capture only',
  'wrapper mode',
);
mustHave(wrapper, 'not runner execution', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'fresh_runner_execution_approval_capture_status is captured', 'wrapper mode');
mustHave(wrapper, 'fresh_runner_execution_jason_signed_approval_status is signed', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(wrapper, PRIOR_RUNNER_EXECUTION_PATH_AFTER_BUILD_141_FRESH_CHAIN_WIRING_CORRECTION_COMMIT, 'wrapper Build 143');
mustHave(wrapper, PRIOR_POST_BUILD_141_BLOCKED_EVIDENCE_COMMIT, 'wrapper Build 142');
mustHave(
  wrapper,
  'future_command_status is ready_for_exact_approved_runner_execution_command_after_build_144_build_141_fresh_chain_wiring_correction_guard_review_only',
  'wrapper mode',
);
mustHave(wrapper, 'fresh_execution_pre_run_guard_status is passed', 'wrapper mode');
mustHave(
  wrapper,
  'exact approved runner execution command after build 144 build 141 fresh-chain wiring correction guard review only after this packet is committed',
  'wrapper mode',
);
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, `bash ${runnerPath}`, 'wrapper must not invoke runner');

if (!isExecutable(wrapperPath)) {
  fail(
    `fresh execution pre-run guard after build 144 build 141 fresh-chain wiring correction approval capture dry-run wrapper is not executable: ${wrapperPath}`,
  );
}
passAssertion(
  'fresh_execution_pre_run_guard_after_build_144_build_141_fresh_chain_wiring_correction_approval_capture_dry_run_wrapper_present_and_safe',
);
passAssertion('wrapper_does_not_invoke_runner');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length < 100) {
  fail(`REQUIRED_ASSERTIONS must contain at least 100 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Fresh Execution Pre-Run Guard Build 144 Build 141 Fresh-Chain Wiring Correction Approval Capture verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);