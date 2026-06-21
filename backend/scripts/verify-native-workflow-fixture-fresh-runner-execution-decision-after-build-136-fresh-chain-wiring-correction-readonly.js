#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_EXECUTION_DECISION_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION.md';
const approvalTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_EXECUTION_DECISION_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_APPROVAL_TEMPLATE.md';
const afterBuild136FreshChainWiringCorrectionPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION.md';
const postBuild136BlockedEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_136_RUNNER_COMMAND_BLOCKED_EVIDENCE.md';
const freshPreRunGuardAfterBuild134ApprovalCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_134_APPROVAL_CAPTURE.md';
const captureAfterBuild134PacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_134_AFTER_AFTER_AFTER_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION.md';
const freshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_AFTER_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION.md';
const afterAfterAllAfterGuardFreshChainWiringCorrectionPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_AFTER_AFTER_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION.md';
const scaffoldingBuildDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_SCAFFOLDING_BUILD.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-build-136-fresh-chain-wiring-correction.json';
const upstreamAfterBuild136FreshChainWiringCorrectionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-build-136-fresh-chain-wiring-correction.json';
const upstreamPostBuild136BlockedEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-136-runner-command-blocked-evidence.json';
const upstreamFreshPreRunGuardAfterBuild134ApprovalCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-134-approval-capture.json';
const upstreamCaptureAfterBuild134FixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-build-134-after-after-after-after-guard-fresh-chain-wiring-correction.json';
const upstreamFreshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-after-after-after-guard-fresh-chain-wiring-correction.json';
const upstreamAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-after-after-after-guard-fresh-chain-wiring-correction.json';
const upstreamScaffoldingBuildFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-scaffolding-build.json';
const manifestPath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const runnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const wrapperPath =
  'scripts/run-native-workflow-fixture-fresh-runner-execution-decision-after-build-136-fresh-chain-wiring-correction-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-fresh-runner-execution-decision-after-build-136-fresh-chain-wiring-correction-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = 'c57d733';
const PRIOR_RUNNER_EXECUTION_PATH_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_COMMIT = 'c57d733';
const PRIOR_POST_BUILD_136_BLOCKED_EVIDENCE_COMMIT = '5bd7509';
const PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_134_APPROVAL_CAPTURE_COMMIT = '7f9714e';
const PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_134_COMMIT = '9b736c0';
const PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT = 'a07dda6';
const PRIOR_RUNNER_EXECUTION_PATH_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT = '1e2af98';
const RUNNER_SCAFFOLDING_BUILD_COMMIT = '145bf15';
const FIXTURE_RUNNER_COMMAND_PATH_STATUS =
  'corrected_fail_closed_direct_invocation_always_blocked_pending_fresh_decision_after_build_136_fresh_chain_wiring_correction';
const FUTURE_COMMAND_STATUS =
  'blocked_until_fresh_runner_execution_approval_captured_after_build_136_fresh_chain_wiring_correction';
const STALE_BUILD_132_PRIMARY_NO_GO_MESSAGE =
  'Build 132 consumed the post-Build-131 exact approved command attempt';

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

const FRESH_RUNNER_EXECUTION_TEMPLATE_CHECKS = [
  'Build 103-138 upstream packets referenced and runner execution path after Build 136 fresh-chain wiring correction closed at c57d733',
  'runner command path exists executable and corrected fail-closed pending fresh decision after Build 136 fresh-chain wiring correction',
  'manifest 30 scenarios all execution_status not_run and pass_fail_status not_captured',
  'fresh runner execution approval not captured and not signed',
  'all 24 fresh runner execution exact values remain not accepted and not approved',
  'no runner execution approved by this packet',
  'no external sandbox calls credentials test accounts production data or contact approved by this packet',
  'live activation real contact SMS email calls calendar booking and billing remain not_granted',
  'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing',
  'future_command_status blocked until fresh runner execution approval captured after Build 136 fresh-chain wiring correction',
];

const REQUIRED_APPROVAL_LANGUAGE = [
  'I, Jason Lohse, explicitly approve one-time fresh runner execution for the exact scoped actual external/sandbox 30-scenario validation described below after Build 138 runner execution path after Build 136 fresh-chain wiring correction.',
  'This fresh runner-execution approval is for fresh_run_actual_external_sandbox_30_scenario_validation_once_only_after_build_136_fresh_chain_wiring_correction only.',
  'This fresh runner-execution approval does not approve live activation.',
  'This fresh runner-execution approval does not approve production data access.',
  'This fresh runner-execution approval does not approve production Supabase writes.',
  'This fresh runner-execution approval does not approve schema/auth/RLS/security changes.',
  'This fresh runner-execution approval does not approve real homeowner contact.',
  'This fresh runner-execution approval does not approve real roofer contact.',
  'This fresh runner-execution approval does not approve billing/payment/deposit/quote/estimate/invoice automation.',
  'This fresh runner-execution approval does not approve production public routes/webhooks/schedulers/cron/dispatchers.',
  'No credential values may be logged.',
  'No production data may be touched.',
  'No real contact may occur.',
  'This fresh runner-execution approval is one-time-use only.',
  'Any deviation from the exact values below requires new explicit Jason approval.',
  'Even if signed later, runner execution remains blocked until a separate fresh execution pre-run guard passes after Build 136 fresh-chain wiring correction.',
  'Prior Build 133/134/135/136 decision/approval/guard chain is not reusable after Build 137/138.',
  'Signature:',
  'Timestamp:',
  'Expiration:',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'approval_template_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_runner_execution_path_after_build_136_fresh_chain_wiring_correction_fixture_present',
  'upstream_post_build_136_blocked_evidence_fixture_present',
  'upstream_fresh_pre_run_guard_after_build_134_approval_capture_fixture_present',
  'upstream_capture_fresh_runner_execution_approval_after_build_134_fixture_present',
  'upstream_fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present',
  'upstream_runner_execution_path_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present',
  'upstream_scaffolding_build_fixture_present',
  'manifest_fixture_present',
  'source_of_truth_commit_c57d733_referenced',
  'prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_commit_c57d733_referenced',
  'prior_post_build_136_blocked_evidence_commit_5bd7509_referenced',
  'runner_scaffolding_build_commit_145bf15_referenced',
  'build_138_runner_execution_path_after_build_136_fresh_chain_wiring_correction_referenced',
  'build_137_post_build_136_blocked_evidence_referenced',
  'build_136_fresh_pre_run_guard_after_build_134_approval_capture_referenced',
  'build_135_capture_fresh_runner_execution_approval_after_build_134_referenced',
  'build_133_runner_execution_path_after_after_all_after_guard_fresh_chain_wiring_correction_referenced',
  'build_103_runner_scaffolding_build_referenced',
  'prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_status_closed',
  'prior_post_build_136_command_attempt_consumption_status_consumed_by_blocked_fail_closed_result_after_build_136_guard',
  'prior_build_137_consumed_attempt_status_consumed',
  'immediate_rerun_allowed_false',
  'fresh_runner_execution_approval_required_after_build_136_fresh_chain_wiring_correction_true',
  'fresh_execution_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction_true',
  'fresh_runner_execution_decision_template_status_created_review_only',
  'fresh_runner_execution_approval_capture_status_not_captured',
  'fresh_runner_execution_jason_signed_approval_status_not_signed',
  'fresh_runner_execution_exact_values_required_count_24',
  'fresh_runner_execution_exact_values_accepted_count_0',
  'fresh_runner_execution_exact_values_approved_count_0',
  'fresh_runner_execution_approval_status_not_granted',
  'fresh_execution_pre_run_guard_status_not_passed',
  'exact_command_paths_documented',
  'runner_command_path_exists',
  'runner_command_path_executable',
  'runner_command_path_status_corrected_fail_closed_direct_invocation_always_blocked_pending_fresh_decision_after_build_136_fresh_chain_wiring_correction',
  'runner_command_after_build_136_fresh_chain_references_present',
  'runner_command_build_137_consumed_post_build_136_attempt_documented',
  'runner_command_no_stale_build_132_era_primary_no_go',
  'runner_execution_status_not_run_by_this_packet',
  'command_execution_status_not_run_by_this_packet',
  'runner_command_invoked_by_this_packet_false',
  'external_sandbox_calls_approval_status_not_granted_by_this_packet',
  'credentials_access_approval_status_not_granted_by_this_packet',
  'test_account_use_approval_status_not_granted_by_this_packet',
  'external_calls_made_by_this_packet_false',
  'credentials_accessed_by_this_packet_false',
  'production_data_accessed_by_this_packet_false',
  'real_contact_made_by_this_packet_false',
  'sms_email_calls_calendar_booking_performed_by_this_packet_false',
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
  'future_command_status_blocked_until_fresh_runner_execution_approval_captured_after_build_136_fresh_chain_wiring_correction',
  'template_labeled_fresh_runner_execution_template_only_not_signed_not_approved_do_not_execute',
  'template_all_24_exact_value_fields_present',
  'template_all_required_approval_language_present',
  'packet_does_not_run_runner',
  'packet_does_not_approve_anything',
  'packet_does_not_capture_approval',
  'packet_does_not_pass_fresh_pre_run_guard',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_authorize_sms_email_calls_calendar_booking',
  'packet_does_not_contact_roofer_or_homeowner',
  'packet_does_not_treat_prior_build_133_134_135_136_chain_as_reusable',
  'all_24_fresh_runner_execution_exact_values_not_approved_in_packet',
  'fixture_all_24_accepted_exact_values_blank',
  'fixture_all_24_approved_exact_values_blank',
  'fresh_runner_execution_template_checks_all_10_checks_present',
  'fresh_runner_execution_template_checks_all_10_checks_passed',
  'controlled_real_roofer_setup_remains_blocked',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'fresh_runner_execution_decision_after_build_136_fresh_chain_wiring_correction_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_EXECUTION_DECISION_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION.md',
  'NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_EXECUTION_DECISION_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_APPROVAL_TEMPLATE.md',
  'run-native-workflow-fixture-fresh-runner-execution-decision-after-build-136-fresh-chain-wiring-correction-dry-run.sh',
  'verify-native-workflow-fixture-fresh-runner-execution-decision-after-build-136-fresh-chain-wiring-correction-readonly.js',
  'fresh-runner-execution-decision-after-build-136-fresh-chain-wiring-correction.json',
  'Native Workflow Fixture Fresh Runner-Execution Decision After Build 136 Fresh-Chain Wiring Correction',
  'native workflow fixture fresh runner execution decision after build 136 fresh chain wiring correction',
  'fresh runner execution decision after build 136 fresh chain wiring correction',
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
const approvalTemplateDoc = read(approvalTemplateDocPath);
read(afterBuild136FreshChainWiringCorrectionPacketDocPath);
read(postBuild136BlockedEvidenceDocPath);
read(freshPreRunGuardAfterBuild134ApprovalCaptureDocPath);
read(captureAfterBuild134PacketDocPath);
read(freshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionDocPath);
read(afterAfterAllAfterGuardFreshChainWiringCorrectionPacketDocPath);
read(scaffoldingBuildDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const combinedDocs = `${packetDoc}\n${approvalTemplateDoc}`;

passAssertion('packet_doc_present');
passAssertion('approval_template_doc_present');

mustHave(packetDoc, 'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/template-only/not-approved/non-executing', 'packet doc');
mustHave(approvalTemplateDoc, 'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/template-only/not-approved/non-executing', 'approval template doc');

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(approvalTemplateDoc, SOURCE_OF_TRUTH_COMMIT, 'approval template doc');
passAssertion('source_of_truth_commit_c57d733_referenced');

mustHave(packetDoc, PRIOR_RUNNER_EXECUTION_PATH_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_COMMIT, 'packet doc');
mustHave(approvalTemplateDoc, PRIOR_RUNNER_EXECUTION_PATH_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_COMMIT, 'approval template doc');
passAssertion('prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_commit_c57d733_referenced');

mustHave(packetDoc, afterBuild136FreshChainWiringCorrectionPacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamAfterBuild136FreshChainWiringCorrectionFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 138', 'packet doc');
passAssertion('build_138_runner_execution_path_after_build_136_fresh_chain_wiring_correction_referenced');

mustHave(packetDoc, postBuild136BlockedEvidenceDocPath, 'packet doc');
mustHave(packetDoc, upstreamPostBuild136BlockedEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, PRIOR_POST_BUILD_136_BLOCKED_EVIDENCE_COMMIT, 'packet doc');
mustHave(packetDoc, 'Build 137', 'packet doc');
passAssertion('build_137_post_build_136_blocked_evidence_referenced');
passAssertion('prior_post_build_136_blocked_evidence_commit_5bd7509_referenced');

mustHave(packetDoc, freshPreRunGuardAfterBuild134ApprovalCaptureDocPath, 'packet doc');
mustHave(packetDoc, upstreamFreshPreRunGuardAfterBuild134ApprovalCaptureFixturePath, 'packet doc');
mustHave(packetDoc, PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_134_APPROVAL_CAPTURE_COMMIT, 'packet doc');
mustHave(packetDoc, 'Build 136', 'packet doc');
passAssertion('build_136_fresh_pre_run_guard_after_build_134_approval_capture_referenced');

mustHave(packetDoc, captureAfterBuild134PacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamCaptureAfterBuild134FixturePath, 'packet doc');
mustHave(packetDoc, PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_134_COMMIT, 'packet doc');
mustHave(packetDoc, 'Build 135', 'packet doc');
passAssertion('build_135_capture_fresh_runner_execution_approval_after_build_134_referenced');

mustHave(packetDoc, PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT, 'packet doc');
mustHave(packetDoc, freshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionDocPath, 'packet doc');
mustHave(packetDoc, upstreamFreshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 134', 'packet doc');

mustHave(packetDoc, afterAfterAllAfterGuardFreshChainWiringCorrectionPacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath, 'packet doc');
mustHave(packetDoc, PRIOR_RUNNER_EXECUTION_PATH_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT, 'packet doc');
mustHave(packetDoc, 'Build 133', 'packet doc');
passAssertion('build_133_runner_execution_path_after_after_all_after_guard_fresh_chain_wiring_correction_referenced');

mustHave(packetDoc, scaffoldingBuildDocPath, 'packet doc');
mustHave(packetDoc, upstreamScaffoldingBuildFixturePath, 'packet doc');
mustHave(packetDoc, RUNNER_SCAFFOLDING_BUILD_COMMIT, 'packet doc');
mustHave(packetDoc, 'Build 103', 'packet doc');
passAssertion('build_103_runner_scaffolding_build_referenced');
passAssertion('runner_scaffolding_build_commit_145bf15_referenced');

mustHave(packetDoc, 'prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_status | closed', 'packet doc');
mustHave(approvalTemplateDoc, 'prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_status | closed', 'approval template doc');
passAssertion('prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_status_closed');

mustHave(packetDoc, 'prior_command_attempt_consumption_status | consumed_by_blocked_fail_closed_result_after_build_136_guard', 'packet doc');
mustHave(approvalTemplateDoc, 'prior_command_attempt_consumption_status | consumed_by_blocked_fail_closed_result_after_build_136_guard', 'approval template doc');
passAssertion('prior_post_build_136_command_attempt_consumption_status_consumed_by_blocked_fail_closed_result_after_build_136_guard');

mustHave(packetDoc, 'prior_build_137_consumed_attempt_status | consumed', 'packet doc');
mustHave(approvalTemplateDoc, 'prior_build_137_consumed_attempt_status | consumed', 'approval template doc');
passAssertion('prior_build_137_consumed_attempt_status_consumed');

mustHave(packetDoc, 'immediate_rerun_allowed | false', 'packet doc');
mustHave(approvalTemplateDoc, 'immediate_rerun_allowed | false', 'approval template doc');
passAssertion('immediate_rerun_allowed_false');

mustHave(packetDoc, 'fresh_runner_execution_approval_required_after_build_136_fresh_chain_wiring_correction | true', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_approval_required_after_build_136_fresh_chain_wiring_correction is `true`', 'packet doc');
passAssertion('fresh_runner_execution_approval_required_after_build_136_fresh_chain_wiring_correction_true');

mustHave(packetDoc, 'fresh_execution_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction | true', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction is `true`', 'packet doc');
passAssertion('fresh_execution_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction_true');

mustHave(packetDoc, 'prior_fresh_runner_execution_approval_reusable_after_build_136_fresh_chain_wiring_correction | false', 'packet doc');
mustHave(packetDoc, 'prior_fresh_execution_pre_run_guard_reusable_after_build_136_fresh_chain_wiring_correction | false', 'packet doc');
mustHave(packetDoc, 'prior_build_133_134_135_136_decision_approval_guard_chain_reusable_after_build_137_blocked_evidence | false', 'packet doc');
mustHave(packetDoc, 'This packet **does not** treat prior Build 133/134/135/136 decision/approval/guard chain as reusable.', 'packet doc');
mustHave(approvalTemplateDoc, '**Explicit note:** This template does **not** treat prior Build 133/134/135/136 decision/approval/guard chain as reusable.', 'approval template doc');
passAssertion('packet_does_not_treat_prior_build_133_134_135_136_chain_as_reusable');

mustHave(packetDoc, 'fresh_runner_execution_decision_template_status | created_review_only', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_approval_capture_status | not_captured', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_jason_signed_approval_status | not_signed', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_exact_values_required_count | 24', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_exact_values_accepted_count | 0', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_exact_values_approved_count | 0', 'packet doc');
passAssertion('fresh_runner_execution_decision_template_status_created_review_only');
passAssertion('fresh_runner_execution_approval_capture_status_not_captured');
passAssertion('fresh_runner_execution_jason_signed_approval_status_not_signed');
passAssertion('fresh_runner_execution_exact_values_required_count_24');
passAssertion('fresh_runner_execution_exact_values_accepted_count_0');
passAssertion('fresh_runner_execution_exact_values_approved_count_0');

mustHave(packetDoc, 'fresh_runner_execution_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_status | not_passed', 'packet doc');
passAssertion('fresh_runner_execution_approval_status_not_granted');
passAssertion('fresh_execution_pre_run_guard_status_not_passed');

mustHave(packetDoc, 'external_sandbox_calls_approval_status | not_granted_by_this_packet', 'packet doc');
mustHave(packetDoc, 'credentials_access_approval_status | not_granted_by_this_packet', 'packet doc');
mustHave(packetDoc, 'test_account_use_approval_status | not_granted_by_this_packet', 'packet doc');
mustHave(packetDoc, 'production_data_access_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'production_supabase_write_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'schema_auth_rls_security_change_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'live_activation_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_homeowner_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_roofer_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'billing_payment_automation_approval_status | not_granted', 'packet doc');
passAssertion('external_sandbox_calls_approval_status_not_granted_by_this_packet');
passAssertion('credentials_access_approval_status_not_granted_by_this_packet');
passAssertion('test_account_use_approval_status_not_granted_by_this_packet');
passAssertion('production_data_access_approval_status_not_granted');
passAssertion('production_supabase_write_approval_status_not_granted');
passAssertion('schema_auth_rls_security_change_approval_status_not_granted');
passAssertion('live_activation_approval_status_not_granted');
passAssertion('real_homeowner_contact_approval_status_not_granted');
passAssertion('real_roofer_contact_approval_status_not_granted');
passAssertion('billing_payment_automation_approval_status_not_granted');

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(packetDoc, 'runner_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(packetDoc, 'runner_command_invoked_by_this_packet | false', 'packet doc');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('runner_execution_status_not_run_by_this_packet');
passAssertion('runner_command_invoked_by_this_packet_false');

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

mustHave(packetDoc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_status | not_captured_by_this_run', 'packet doc');
passAssertion('actual_30_scenario_external_validation_captured_count_0');
passAssertion('actual_30_scenario_external_validation_passed_count_0');
passAssertion('actual_30_scenario_external_validation_missing_count_30');
passAssertion('actual_30_scenario_external_validation_status_not_captured_by_this_run');

mustHave(packetDoc, `future_command_status | ${FUTURE_COMMAND_STATUS}`, 'packet doc');
mustHave(approvalTemplateDoc, `future_command_status | ${FUTURE_COMMAND_STATUS}`, 'approval template doc');
passAssertion('future_command_status_blocked_until_fresh_runner_execution_approval_captured_after_build_136_fresh_chain_wiring_correction');

mustHave(packetDoc, `exact_working_directory | ${EXACT_WORKING_DIRECTORY}`, 'packet doc');
mustHave(packetDoc, `exact_command | ${EXACT_COMMAND}`, 'packet doc');
mustHave(packetDoc, `exact_runner_path | ${EXACT_RUNNER_PATH}`, 'packet doc');
mustHave(packetDoc, `exact_manifest_path | ${EXACT_MANIFEST_PATH}`, 'packet doc');
mustHave(packetDoc, 'exact_scenario_count | 30', 'packet doc');
mustHave(packetDoc, `exact_evidence_log_path_pattern | ${EXACT_EVIDENCE_LOG_PATH_PATTERN}`, 'packet doc');
mustHave(packetDoc, `exact_structured_evidence_output_path_pattern | ${EXACT_STRUCTURED_EVIDENCE_OUTPUT_PATH_PATTERN}`, 'packet doc');
mustHave(packetDoc, 'REFERENCE_DEFAULT_ONLY', 'packet doc exact scope');
passAssertion('exact_command_paths_documented');

mustHave(packetDoc, `runner_command_path_status | ${FIXTURE_RUNNER_COMMAND_PATH_STATUS}`, 'packet doc');
passAssertion('runner_command_path_status_corrected_fail_closed_direct_invocation_always_blocked_pending_fresh_decision_after_build_136_fresh_chain_wiring_correction');

mustHave(packetDoc, 'This packet **does not** run the actual external/sandbox 30-scenario validation runner', 'packet doc');
passAssertion('packet_does_not_run_runner');
mustHave(packetDoc, 'This packet **does not** approve anything', 'packet doc');
passAssertion('packet_does_not_approve_anything');
mustHave(packetDoc, 'This packet **does not** capture a new signed fresh approval', 'packet doc');
passAssertion('packet_does_not_capture_approval');
mustHave(packetDoc, 'This packet **does not** pass a fresh execution pre-run guard', 'packet doc');
passAssertion('packet_does_not_pass_fresh_pre_run_guard');
mustHave(packetDoc, 'This packet **does not** make external calls', 'packet doc');
passAssertion('packet_does_not_make_external_calls');
mustHave(packetDoc, 'This packet **does not** access credentials', 'packet doc');
passAssertion('packet_does_not_access_credentials');
mustHave(packetDoc, 'This packet **does not** access production data', 'packet doc');
passAssertion('packet_does_not_access_production_data');
mustHave(packetDoc, 'This packet **does not** send SMS/email/calls or create calendar booking', 'packet doc');
passAssertion('packet_does_not_authorize_sms_email_calls_calendar_booking');
mustHave(packetDoc, 'This packet **does not** contact any real roofer or homeowner', 'packet doc');
passAssertion('packet_does_not_contact_roofer_or_homeowner');

for (const field of EXACT_VALUE_FIELDS) {
  mustHave(packetDoc, `| ${field} | false | false | not_approved |`, 'packet doc exact values');
}
passAssertion('all_24_fresh_runner_execution_exact_values_not_approved_in_packet');

mustHave(approvalTemplateDoc, 'FRESH RUNNER EXECUTION TEMPLATE ONLY — NOT SIGNED — NOT APPROVED — DO NOT EXECUTE', 'approval template doc');
mustHave(approvalTemplateDoc, 'fresh_runner_execution_decision_template_status | FRESH_RUNNER_EXECUTION_TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE', 'approval template doc');
passAssertion('template_labeled_fresh_runner_execution_template_only_not_signed_not_approved_do_not_execute');

for (let i = 0; i < EXACT_VALUE_FIELDS.length; i += 1) {
  const field = EXACT_VALUE_FIELDS[i];
  const rowNum = i + 1;
  mustHave(approvalTemplateDoc, `${rowNum}. ${field}:`, 'approval template doc template');
}
passAssertion('template_all_24_exact_value_fields_present');

for (const line of REQUIRED_APPROVAL_LANGUAGE) {
  mustHave(approvalTemplateDoc, line, 'approval template doc template approval language');
}
passAssertion('template_all_required_approval_language_present');

mustHave(packetDoc, 'controlled real roofer setup remains blocked', 'packet doc');
passAssertion('controlled_real_roofer_setup_remains_blocked');

for (const check of FRESH_RUNNER_EXECUTION_TEMPLATE_CHECKS) {
  mustHave(packetDoc, check, 'packet doc fresh runner execution template checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc fresh runner execution template check status');
}
passAssertion('fresh_runner_execution_template_checks_all_10_checks_present');
passAssertion('fresh_runner_execution_template_checks_all_10_checks_passed');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');

if (!fs.existsSync(path.join(root, fixturePath))) fail(`missing structured fixture: ${fixturePath}`);
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, upstreamAfterBuild136FreshChainWiringCorrectionFixturePath))) {
  fail(`missing upstream after Build 136 fresh-chain wiring correction fixture: ${upstreamAfterBuild136FreshChainWiringCorrectionFixturePath}`);
}
passAssertion('upstream_runner_execution_path_after_build_136_fresh_chain_wiring_correction_fixture_present');

if (!fs.existsSync(path.join(root, upstreamPostBuild136BlockedEvidenceFixturePath))) {
  fail(`missing upstream post-Build-136 blocked evidence fixture: ${upstreamPostBuild136BlockedEvidenceFixturePath}`);
}
passAssertion('upstream_post_build_136_blocked_evidence_fixture_present');

if (!fs.existsSync(path.join(root, upstreamFreshPreRunGuardAfterBuild134ApprovalCaptureFixturePath))) {
  fail(`missing upstream fresh pre-run guard after Build 134 approval capture fixture: ${upstreamFreshPreRunGuardAfterBuild134ApprovalCaptureFixturePath}`);
}
passAssertion('upstream_fresh_pre_run_guard_after_build_134_approval_capture_fixture_present');

if (!fs.existsSync(path.join(root, upstreamCaptureAfterBuild134FixturePath))) {
  fail(`missing upstream capture after Build 134 fixture: ${upstreamCaptureAfterBuild134FixturePath}`);
}
passAssertion('upstream_capture_fresh_runner_execution_approval_after_build_134_fixture_present');

if (!fs.existsSync(path.join(root, upstreamFreshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath))) {
  fail(`missing upstream fresh decision after after-after-after-after-guard fixture: ${upstreamFreshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath}`);
}
passAssertion('upstream_fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present');

if (!fs.existsSync(path.join(root, upstreamAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath))) {
  fail(`missing upstream after-after-after-after-guard fresh-chain wiring correction fixture: ${upstreamAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath}`);
}
passAssertion('upstream_runner_execution_path_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present');

if (!fs.existsSync(path.join(root, upstreamScaffoldingBuildFixturePath))) fail(`missing upstream scaffolding build fixture: ${upstreamScaffoldingBuildFixturePath}`);
passAssertion('upstream_scaffolding_build_fixture_present');

if (!fs.existsSync(path.join(root, manifestPath))) fail(`missing manifest fixture: ${manifestPath}`);
passAssertion('manifest_fixture_present');

const fixture = readJson(fixturePath);
readJson(upstreamAfterBuild136FreshChainWiringCorrectionFixturePath);
readJson(upstreamPostBuild136BlockedEvidenceFixturePath);
readJson(upstreamFreshPreRunGuardAfterBuild134ApprovalCaptureFixturePath);
readJson(upstreamCaptureAfterBuild134FixturePath);
readJson(upstreamFreshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath);
readJson(upstreamAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath);
readJson(upstreamScaffoldingBuildFixturePath);
const manifest = readJson(manifestPath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) fail('fixture source_of_truth_commit must be c57d733');
if (fixture.prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_commit !== PRIOR_RUNNER_EXECUTION_PATH_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_COMMIT) {
  fail('fixture prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_commit must be c57d733');
}
if (fixture.prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_status !== 'closed') {
  fail('fixture prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_status must be closed');
}
if (fixture.prior_post_build_136_blocked_evidence_commit !== PRIOR_POST_BUILD_136_BLOCKED_EVIDENCE_COMMIT) fail('fixture prior_post_build_136_blocked_evidence_commit must be 5bd7509');
if (fixture.prior_command_attempt_consumption_status !== 'consumed_by_blocked_fail_closed_result_after_build_136_guard') {
  fail('fixture prior_command_attempt_consumption_status mismatch');
}
if (fixture.prior_build_137_consumed_attempt_status !== 'consumed') fail('fixture prior_build_137_consumed_attempt_status must be consumed');
if (fixture.immediate_rerun_allowed !== false) fail('fixture immediate_rerun_allowed must be false');
if (fixture.fresh_runner_execution_approval_required_after_build_136_fresh_chain_wiring_correction !== true) {
  fail('fixture fresh_runner_execution_approval_required_after_build_136_fresh_chain_wiring_correction must be true');
}
if (fixture.fresh_execution_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction !== true) {
  fail('fixture fresh_execution_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction must be true');
}
if (fixture.prior_fresh_runner_execution_approval_reusable_after_build_136_fresh_chain_wiring_correction !== false) {
  fail('fixture prior_fresh_runner_execution_approval_reusable_after_build_136_fresh_chain_wiring_correction must be false');
}
if (fixture.prior_fresh_execution_pre_run_guard_reusable_after_build_136_fresh_chain_wiring_correction !== false) {
  fail('fixture prior_fresh_execution_pre_run_guard_reusable_after_build_136_fresh_chain_wiring_correction must be false');
}
if (fixture.prior_build_133_134_135_136_decision_approval_guard_chain_reusable_after_build_137_blocked_evidence !== false) {
  fail('fixture prior_build_133_134_135_136_decision_approval_guard_chain_reusable_after_build_137_blocked_evidence must be false');
}
if (fixture.prior_fresh_execution_pre_run_guard_after_build_134_approval_capture_commit !== PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_134_APPROVAL_CAPTURE_COMMIT) {
  fail('fixture prior_fresh_execution_pre_run_guard_after_build_134_approval_capture_commit must be 7f9714e');
}
if (fixture.prior_capture_fresh_runner_execution_approval_after_build_134_commit !== PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_134_COMMIT) {
  fail('fixture prior_capture_fresh_runner_execution_approval_after_build_134_commit must be 9b736c0');
}
if (fixture.prior_fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_commit !== PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT) {
  fail('fixture prior_fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_commit must be a07dda6');
}
if (fixture.prior_runner_execution_path_after_after_all_after_guard_fresh_chain_wiring_correction_commit !== PRIOR_RUNNER_EXECUTION_PATH_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT) {
  fail('fixture prior_runner_execution_path_after_after_all_after_guard_fresh_chain_wiring_correction_commit must be 1e2af98');
}
if (fixture.runner_command_path !== EXACT_RUNNER_PATH) fail('fixture runner_command_path mismatch');
if (fixture.runner_command_path_status !== FIXTURE_RUNNER_COMMAND_PATH_STATUS) fail('fixture runner_command_path_status mismatch');
if (fixture.fresh_runner_execution_decision_template_status !== 'created_review_only') fail('fixture fresh_runner_execution_decision_template_status mismatch');
if (fixture.fresh_runner_execution_approval_capture_status !== 'not_captured') fail('fixture fresh_runner_execution_approval_capture_status must be not_captured');
if (fixture.fresh_runner_execution_jason_signed_approval_status !== 'not_signed') fail('fixture fresh_runner_execution_jason_signed_approval_status must be not_signed');
if (fixture.fresh_runner_execution_exact_values_required_count !== 24) fail('fixture fresh_runner_execution_exact_values_required_count must be 24');
if (fixture.fresh_runner_execution_exact_values_accepted_count !== 0) fail('fixture fresh_runner_execution_exact_values_accepted_count must be 0');
if (fixture.fresh_runner_execution_exact_values_approved_count !== 0) fail('fixture fresh_runner_execution_exact_values_approved_count must be 0');
if (fixture.fresh_runner_execution_approval_status !== 'not_granted') fail('fixture fresh_runner_execution_approval_status must be not_granted');
if (fixture.fresh_execution_pre_run_guard_status !== 'not_passed') fail('fixture fresh_execution_pre_run_guard_status must be not_passed');
if (fixture.external_sandbox_calls_approval_status !== 'not_granted_by_this_packet') fail('fixture external_sandbox_calls_approval_status must be not_granted_by_this_packet');
if (fixture.credentials_access_approval_status !== 'not_granted_by_this_packet') fail('fixture credentials_access_approval_status must be not_granted_by_this_packet');
if (fixture.test_account_use_approval_status !== 'not_granted_by_this_packet') fail('fixture test_account_use_approval_status must be not_granted_by_this_packet');
if (fixture.production_data_access_approval_status !== 'not_granted') fail('fixture production_data_access_approval_status must be not_granted');
if (fixture.future_command_status !== FUTURE_COMMAND_STATUS) fail('fixture future_command_status mismatch');
if (fixture.command_execution_status !== 'not_run_by_this_packet') fail('fixture command_execution_status must be not_run_by_this_packet');
if (fixture.runner_execution_status !== 'not_run_by_this_packet') fail('fixture runner_execution_status must be not_run_by_this_packet');
if (fixture.runner_command_invoked_by_this_packet !== false) fail('fixture runner_command_invoked_by_this_packet must be false');
if (fixture.approved_for_activation_now !== false) fail('fixture approved_for_activation_now must be false');
if (fixture.external_calls_made_by_this_packet !== false) fail('fixture external_calls_made_by_this_packet must be false');
if (fixture.credentials_accessed_by_this_packet !== false) fail('fixture credentials_accessed_by_this_packet must be false');
if (fixture.production_data_accessed_by_this_packet !== false) fail('fixture production_data_accessed_by_this_packet must be false');
if (fixture.real_contact_made_by_this_packet !== false) fail('fixture real_contact_made_by_this_packet must be false');
if (fixture.sms_email_calls_calendar_booking_performed_by_this_packet !== false) fail('fixture sms_email_calls_calendar_booking_performed_by_this_packet must be false');
if (fixture.demo_ready_with_live_automation_disabled !== 'preserved') fail('fixture demo_ready_with_live_automation_disabled must be preserved');
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') fail('fixture safety_status mismatch');
if (fixture.fresh_runner_execution_decision_template.status !== 'FRESH_RUNNER_EXECUTION_TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE') {
  fail('fixture fresh_runner_execution_decision_template.status mismatch');
}
if (fixture.fresh_runner_execution_decision_template.signed !== false) fail('fixture fresh_runner_execution_decision_template.signed must be false');
if (fixture.fresh_runner_execution_decision_template.approved !== false) fail('fixture fresh_runner_execution_decision_template.approved must be false');
if (fixture.fresh_runner_execution_decision_template.captured !== false) fail('fixture fresh_runner_execution_decision_template.captured must be false');

if (!fixture.accepted_exact_values || typeof fixture.accepted_exact_values !== 'object') fail('fixture accepted_exact_values object missing');
if (!fixture.approved_exact_values || typeof fixture.approved_exact_values !== 'object') fail('fixture approved_exact_values object missing');
for (const field of EXACT_VALUE_FIELDS) {
  if (!(field in fixture.accepted_exact_values)) fail(`fixture accepted_exact_values missing ${field}`);
  const accepted = fixture.accepted_exact_values[field];
  if (typeof accepted !== 'string' || accepted.trim() !== '') fail(`fixture accepted_exact_values.${field} must be blank`);
  if (!(field in fixture.approved_exact_values)) fail(`fixture approved_exact_values missing ${field}`);
  const approved = fixture.approved_exact_values[field];
  if (typeof approved !== 'string' || approved.trim() !== '') fail(`fixture approved_exact_values.${field} must be blank`);
}
passAssertion('fixture_all_24_accepted_exact_values_blank');
passAssertion('fixture_all_24_approved_exact_values_blank');

if (!Array.isArray(fixture.fresh_runner_execution_decision_template_checks) || fixture.fresh_runner_execution_decision_template_checks.length !== 10) {
  fail('fixture fresh_runner_execution_decision_template_checks must contain 10 checks');
}
for (let i = 0; i < FRESH_RUNNER_EXECUTION_TEMPLATE_CHECKS.length; i += 1) {
  const check = fixture.fresh_runner_execution_decision_template_checks[i];
  if (check.check !== i + 1) fail(`fixture fresh_runner_execution_decision_template_checks[${i}].check must be ${i + 1}`);
  if (check.name !== FRESH_RUNNER_EXECUTION_TEMPLATE_CHECKS[i]) fail(`fixture fresh_runner_execution_decision_template_checks[${i}].name mismatch`);
  if (check.status !== 'passed') fail(`fixture fresh_runner_execution_decision_template_checks[${i}].status must be passed`);
}

if (manifest.total_manifest_scenarios_count !== 30) fail('manifest total_manifest_scenarios_count must be 30');
if (!Array.isArray(manifest.scenarios) || manifest.scenarios.length !== 30) fail('manifest scenarios array must contain exactly 30 scenarios');
for (const scenario of manifest.scenarios) {
  if (scenario.execution_status !== 'not_run') fail(`manifest scenario ${scenario.scenario_id || 'unknown'} execution_status must be not_run`);
  if (scenario.pass_fail_status !== 'not_captured') fail(`manifest scenario ${scenario.scenario_id || 'unknown'} pass_fail_status must be not_captured`);
}

passAssertion('structured_fixture_valid_json');

if (!fs.existsSync(path.join(root, runnerPath))) fail(`missing runner command path: ${runnerPath}`);
passAssertion('runner_command_path_exists');
if (!isExecutable(runnerPath)) fail(`runner command path is not executable: ${runnerPath}`);
passAssertion('runner_command_path_executable');

const runnerScript = read(runnerPath);
mustHave(runnerScript, 'BLOCKED', 'runner script');
mustHave(runnerScript, 'exit 1', 'runner script');
mustHave(runnerScript, `runner_command_path_status: ${FIXTURE_RUNNER_COMMAND_PATH_STATUS}`, 'runner script');
mustHave(runnerScript, 'after_build_136', 'runner script');
mustHave(runnerScript, 'after Build 136 fresh-chain wiring correction', 'runner script');
mustHave(runnerScript, 'prior_command_attempt_consumption_status: consumed_by_blocked_fail_closed_result_after_build_136_guard', 'runner script');
mustHave(runnerScript, 'Build 137 consumed the post-Build-136 exact approved command attempt', 'runner script');
mustHave(runnerScript, 'fresh_decision_required_after_build_136_fresh_chain_wiring_correction: true', 'runner script');
mustHave(runnerScript, '(Build 133)', 'runner script');
mustHave(runnerScript, '(Build 134)', 'runner script');
mustHave(runnerScript, '(Build 135)', 'runner script');
mustHave(runnerScript, '(Build 136)', 'runner script');
mustHave(runnerScript, 'immediate_rerun_allowed: false', 'runner script');
mustNotHave(runnerScript, STALE_BUILD_132_PRIMARY_NO_GO_MESSAGE, 'runner script must not have stale Build 132-era primary NO-GO');
mustNotHave(runnerScript, 'consumed_by_blocked_fail_closed_result_after_build_131_guard (Build 132)', 'runner script must not have stale Build 132-era primary consumption status');
passAssertion('runner_command_after_build_136_fresh_chain_references_present');
passAssertion('runner_command_build_137_consumed_post_build_136_attempt_documented');
passAssertion('runner_command_no_stale_build_132_era_primary_no_go');

try {
  execSync(`bash ${runnerPath}`, { cwd: root, stdio: 'pipe' });
  fail('runner fail-closed sanity check must exit non-zero');
} catch (error) {
  if (!error.status || error.status !== 1) fail(`runner fail-closed sanity check must exit 1 (got ${error.status})`);
}

for (const phrase of FORBIDDEN_PUBLIC) mustNotHave(combinedDocs, phrase, 'combined packet docs forbidden language');
for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(combinedDocs)) fail(`unsafe pattern ${pattern} found in combined docs`);
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}

if (!fs.existsSync(path.join(root, verifierPath))) fail(`missing verifier: ${verifierPath}`);
passAssertion('verifier_file_present');

const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail(`pilot readiness summary is not demo_ready_with_live_automation_disabled (got: ${status.summary})`);
passAssertion('demo_ready_with_live_automation_disabled_preserved');

const liveKeys = ['sms', 'calendar', 'vapi_outbound', 'resend', 'lindy'];
for (const key of liveKeys) {
  if (status.live_automation[key] !== false) fail(`live_automation.${key} is not false`);
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
mustHave(aggregate, 'Native Workflow Fixture Fresh Runner-Execution Decision After Build 136 Fresh-Chain Wiring Correction', 'aggregate readiness');
mustHave(verifierIndex, packetDocPath, 'verifier index');
mustHave(verifierIndex, approvalTemplateDocPath, 'verifier index');
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
mustHave(wrapper, 'local fresh runner-execution decision/template after Build 136 fresh-chain wiring correction only', 'wrapper mode');
mustHave(wrapper, 'not signed', 'wrapper mode');
mustHave(wrapper, 'not approved', 'wrapper mode');
mustHave(wrapper, 'not runner execution', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'prior_runner_execution_path_after_build_136_fresh_chain_wiring_correction_status is closed', 'wrapper mode');
mustHave(wrapper, 'prior_command_attempt_consumption_status is consumed_by_blocked_fail_closed_result_after_build_136_guard', 'wrapper mode');
mustHave(wrapper, 'prior_build_137_consumed_attempt_status is consumed', 'wrapper mode');
mustHave(wrapper, 'immediate_rerun_allowed is false', 'wrapper mode');
mustHave(wrapper, 'prior Build 133/134/135/136 decision/approval/guard chain is not reusable after Build 137/138', 'wrapper mode');
mustHave(wrapper, 'fresh_runner_execution_approval_capture_status is not_captured', 'wrapper mode');
mustHave(wrapper, 'fresh_runner_execution_jason_signed_approval_status is not_signed', 'wrapper mode');
mustHave(wrapper, 'fresh_execution_pre_run_guard_status is not_passed', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(wrapper, `future_command_status is ${FUTURE_COMMAND_STATUS}`, 'wrapper mode');
mustHave(wrapper, FIXTURE_RUNNER_COMMAND_PATH_STATUS, 'wrapper mode');
mustHave(wrapper, 'Jason review/sign fresh runner-execution approval template after Build 136 fresh-chain wiring correction', 'wrapper mode');
mustHave(wrapper, 'Build 137 consumed the post-Build-136 attempt', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, `bash ${runnerPath}`, 'wrapper must not invoke runner');
mustHave(wrapper, 'does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh', 'wrapper');

if (!isExecutable(wrapperPath)) {
  fail(`fresh runner execution decision after Build 136 fresh-chain wiring correction dry-run wrapper is not executable: ${wrapperPath}`);
}
passAssertion('fresh_runner_execution_decision_after_build_136_fresh_chain_wiring_correction_dry_run_wrapper_present_and_safe');
passAssertion('wrapper_does_not_invoke_runner');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, approvalTemplateDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 102) {
  fail(`REQUIRED_ASSERTIONS must contain 102 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Fresh Runner-Execution Decision After Build 136 Fresh-Chain Wiring Correction verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);