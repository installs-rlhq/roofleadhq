#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_NO_GO_REVIEW.md';
const postBuild136BlockedEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_136_RUNNER_COMMAND_BLOCKED_EVIDENCE.md';
const freshPreRunGuardAfterBuild134ApprovalCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_134_APPROVAL_CAPTURE.md';
const captureAfterBuild134AfterAfterAllAfterGuardFreshChainWiringCorrectionPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_134_AFTER_AFTER_AFTER_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION.md';
const freshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_AFTER_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION.md';
const afterAfterAllAfterGuardFreshChainWiringCorrectionPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_AFTER_AFTER_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION.md';
const postBuild131BlockedEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_POST_BUILD_131_RUNNER_COMMAND_BLOCKED_EVIDENCE.md';
const scaffoldingBuildDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_SCAFFOLDING_BUILD.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-build-136-fresh-chain-wiring-correction.json';
const upstreamPostBuild136BlockedEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-136-runner-command-blocked-evidence.json';
const upstreamFreshPreRunGuardAfterBuild134ApprovalCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-execution-pre-run-guard-after-build-134-approval-capture.json';
const upstreamCaptureAfterBuild134AfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-fresh-runner-execution-approval-after-build-134-after-after-after-after-guard-fresh-chain-wiring-correction.json';
const upstreamFreshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/fresh-runner-execution-decision-after-after-after-after-guard-fresh-chain-wiring-correction.json';
const upstreamAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-path-after-after-after-after-guard-fresh-chain-wiring-correction.json';
const upstreamPostBuild131BlockedEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-post-build-131-runner-command-blocked-evidence.json';
const upstreamScaffoldingBuildFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-scaffolding-build.json';
const manifestPath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const runnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const wrapperPath =
  'scripts/run-native-workflow-fixture-runner-execution-path-after-build-136-fresh-chain-wiring-correction-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-runner-execution-path-after-build-136-fresh-chain-wiring-correction-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '5bd7509';
const PRIOR_POST_BUILD_136_BLOCKED_EVIDENCE_COMMIT = '5bd7509';
const PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_134_APPROVAL_CAPTURE_COMMIT = '7f9714e';
const PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_134_COMMIT = '9b736c0';
const PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT = 'a07dda6';
const PRIOR_RUNNER_EXECUTION_PATH_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT = '1e2af98';
const PRIOR_POST_BUILD_131_BLOCKED_EVIDENCE_COMMIT = '0dc6d88';
const RUNNER_SCAFFOLDING_BUILD_COMMIT = '145bf15';

const INCOMING_FUTURE_COMMAND_STATUS =
  'blocked_until_runner_execution_path_after_build_136_fresh_chain_wiring_correction_and_fresh_decision';
const CORRECTED_FUTURE_COMMAND_STATUS =
  'blocked_until_fresh_decision_and_fresh_pre_run_guard_pass_after_build_136_fresh_chain_wiring_correction';
const STALE_FUTURE_COMMAND_STATUS =
  'blocked_until_fresh_decision_and_fresh_pre_run_guard_pass_after_after_after_after_guard_fresh_chain_wiring_correction';
const STALE_READY_FUTURE_COMMAND_STATUS =
  'ready_for_exact_approved_runner_execution_command_after_build_134_after_after_after_after_guard_fresh_chain_wiring_correction_guard_review_only';
const STALE_BUILD_132_NO_GO_MESSAGE =
  'Build 132 consumed the post-Build-131 exact approved command attempt';
const BLOCKED_OUTPUT_LINE =
  'BLOCKED: This runner remains fail-closed for direct invocation and is NOT approved to run validation from this blocked path.';
const RUNNER_COMMAND_PATH_STATUS =
  'corrected_fail_closed_direct_invocation_always_blocked_pending_fresh_decision_after_build_136_fresh_chain_wiring_correction';

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_post_build_136_blocked_evidence_fixture_present',
  'upstream_fresh_pre_run_guard_after_build_134_approval_capture_fixture_present',
  'upstream_capture_after_build_134_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present',
  'upstream_fresh_decision_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present',
  'upstream_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present',
  'upstream_scaffolding_build_fixture_present',
  'manifest_fixture_present',
  'source_of_truth_commit_5bd7509_referenced',
  'prior_post_build_136_blocked_evidence_commit_5bd7509_referenced',
  'prior_post_build_136_blocked_evidence_status_closed',
  'prior_fresh_execution_pre_run_guard_after_build_134_approval_capture_commit_7f9714e_referenced',
  'prior_capture_fresh_runner_execution_approval_after_build_134_commit_9b736c0_referenced',
  'prior_fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_commit_a07dda6_referenced',
  'prior_runner_execution_path_after_after_all_after_guard_fresh_chain_wiring_correction_commit_1e2af98_referenced',
  'runner_scaffolding_build_commit_145bf15_referenced',
  'build_137_post_build_136_blocked_evidence_packet_referenced',
  'build_136_fresh_pre_run_guard_after_build_134_approval_capture_packet_referenced',
  'build_135_capture_after_build_134_after_after_all_after_guard_wiring_correction_packet_referenced',
  'build_134_fresh_decision_after_after_all_after_guard_wiring_correction_packet_referenced',
  'build_133_after_after_all_after_guard_fresh_chain_wiring_correction_packet_referenced',
  'build_132_post_build_131_blocked_evidence_packet_referenced',
  'build_103_runner_scaffolding_build_packet_referenced',
  'runner_execution_path_after_build_136_fresh_chain_wiring_gap_status_detected',
  'runner_execution_path_after_build_136_fresh_chain_wiring_correction_status_design_or_corrected_review_only',
  'prior_exact_command_attempt_after_build_136_status_attempted_blocked_nonzero',
  'prior_exact_command_exit_status_nonzero_blocked',
  'prior_command_attempt_consumption_status_consumed_by_blocked_after_build_136_guard',
  'runner_output_state_after_build_136_stale_removed',
  'runner_did_not_recognize_build_133_before_correction_documented',
  'runner_did_not_recognize_build_134_before_correction_documented',
  'runner_did_not_recognize_build_135_before_correction_documented',
  'runner_did_not_recognize_build_136_before_correction_documented',
  'immediate_rerun_allowed_false',
  'fresh_decision_required_after_build_136_fresh_chain_wiring_correction_true',
  'fresh_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction_true',
  'fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_closed',
  'fresh_runner_execution_approval_capture_after_build_134_after_after_all_after_guard_fresh_chain_wiring_correction_captured_signed',
  'fresh_execution_pre_run_guard_after_build_134_approval_capture_passed',
  'fresh_runner_execution_approval_captured_signed_24_24_24',
  'fresh_execution_pre_run_guard_passed_30_30_0',
  'incoming_future_command_status_blocked_until_runner_execution_path_after_build_136_fresh_chain_wiring_correction_and_fresh_decision',
  'corrected_future_command_status_blocked_until_fresh_decision_and_fresh_pre_run_guard_pass_after_build_136_fresh_chain_wiring_correction',
  'runner_command_path_exists',
  'runner_command_path_executable',
  'runner_command_corrected_blocked_state_language',
  'runner_command_recognizes_build_133_after_after_all_after_guard_fresh_chain_wiring_correction',
  'runner_command_recognizes_build_134_fresh_decision',
  'runner_command_recognizes_build_135_approval_capture',
  'runner_command_recognizes_build_136_pre_run_guard',
  'runner_command_build_137_consumed_post_build_136_attempt',
  'runner_command_no_stale_future_command_status',
  'runner_command_no_stale_ready_future_command_status',
  'runner_command_no_stale_build_132_era_primary_no_go',
  'runner_command_fail_closed',
  'runner_direct_invocation_blocked_nonzero_expected',
  'runner_execution_status_not_run_by_this_packet',
  'command_execution_status_not_run_by_this_packet',
  'runner_command_rerun_by_this_packet_false',
  'runner_command_invoked_by_this_packet_false',
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
  'packet_does_not_rerun_runner',
  'packet_does_not_perform_validation',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_contact_roofer_or_homeowner',
  'packet_does_not_add_live_execution_behavior',
  'packet_does_not_add_credential_loading',
  'packet_does_not_add_production_data_access',
  'packet_does_not_add_sms_email_call_calendar',
  'packet_does_not_turn_runner_into_executable_external_validation_path',
  'next_step_fresh_decision_not_immediate_rerun',
  'build_137_consumed_post_build_136_attempt_documented',
  'prior_build_133_134_135_136_chain_not_reusable_documented',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'runner_execution_path_after_build_136_fresh_chain_wiring_correction_dry_run_wrapper_present_and_safe',
  'wrapper_does_not_execute_runner_as_validation',
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
  'NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION.md',
  'NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PATH_AFTER_BUILD_136_FRESH_CHAIN_WIRING_CORRECTION_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-runner-execution-path-after-build-136-fresh-chain-wiring-correction-dry-run.sh',
  'verify-native-workflow-fixture-runner-execution-path-after-build-136-fresh-chain-wiring-correction-readonly.js',
  'runner-execution-path-after-build-136-fresh-chain-wiring-correction.json',
  'Native Workflow Fixture Runner Execution Path After Build 136 Fresh-Chain Wiring Correction',
  'native workflow fixture runner execution path after build 136 fresh chain wiring correction',
  'runner execution path after build 136 fresh chain wiring correction',
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
read(postBuild136BlockedEvidenceDocPath);
read(freshPreRunGuardAfterBuild134ApprovalCaptureDocPath);
read(captureAfterBuild134AfterAfterAllAfterGuardFreshChainWiringCorrectionPacketDocPath);
read(freshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionDocPath);
read(afterAfterAllAfterGuardFreshChainWiringCorrectionPacketDocPath);
read(postBuild131BlockedEvidenceDocPath);
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
  'fake-data/local-only/read-only/dry-run-only/review-only/runner-execution-path-after-build-136-fresh-chain-wiring-correction-only/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/runner-execution-path-after-build-136-fresh-chain-wiring-correction-only/non-executing',
  'no-go review',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_5bd7509_referenced');

mustHave(packetDoc, PRIOR_POST_BUILD_136_BLOCKED_EVIDENCE_COMMIT, 'packet doc');
mustHave(packetDoc, 'prior_post_build_136_blocked_evidence_status | closed', 'packet doc');
passAssertion('prior_post_build_136_blocked_evidence_commit_5bd7509_referenced');
passAssertion('prior_post_build_136_blocked_evidence_status_closed');

mustHave(
  packetDoc,
  PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_134_APPROVAL_CAPTURE_COMMIT,
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  PRIOR_FRESH_EXECUTION_PRE_RUN_GUARD_AFTER_BUILD_134_APPROVAL_CAPTURE_COMMIT,
  'no-go review',
);
passAssertion(
  'prior_fresh_execution_pre_run_guard_after_build_134_approval_capture_commit_7f9714e_referenced',
);

mustHave(
  packetDoc,
  PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_134_COMMIT,
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  PRIOR_CAPTURE_FRESH_RUNNER_EXECUTION_APPROVAL_AFTER_BUILD_134_COMMIT,
  'no-go review',
);
passAssertion('prior_capture_fresh_runner_execution_approval_after_build_134_commit_9b736c0_referenced');

mustHave(
  packetDoc,
  PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT,
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  PRIOR_FRESH_RUNNER_EXECUTION_DECISION_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT,
  'no-go review',
);
passAssertion('prior_fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_commit_a07dda6_referenced');

mustHave(
  packetDoc,
  PRIOR_RUNNER_EXECUTION_PATH_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT,
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  PRIOR_RUNNER_EXECUTION_PATH_AFTER_AFTER_ALL_AFTER_GUARD_FRESH_CHAIN_WIRING_CORRECTION_COMMIT,
  'no-go review',
);
passAssertion('prior_runner_execution_path_after_after_all_after_guard_fresh_chain_wiring_correction_commit_1e2af98_referenced');

mustHave(packetDoc, RUNNER_SCAFFOLDING_BUILD_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, RUNNER_SCAFFOLDING_BUILD_COMMIT, 'no-go review');
passAssertion('runner_scaffolding_build_commit_145bf15_referenced');

mustHave(packetDoc, postBuild136BlockedEvidenceDocPath, 'packet doc');
mustHave(packetDoc, upstreamPostBuild136BlockedEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 137', 'packet doc');
passAssertion('build_137_post_build_136_blocked_evidence_packet_referenced');

mustHave(packetDoc, freshPreRunGuardAfterBuild134ApprovalCaptureDocPath, 'packet doc');
mustHave(packetDoc, upstreamFreshPreRunGuardAfterBuild134ApprovalCaptureFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 136', 'packet doc');
passAssertion('build_136_fresh_pre_run_guard_after_build_134_approval_capture_packet_referenced');

mustHave(packetDoc, captureAfterBuild134AfterAfterAllAfterGuardFreshChainWiringCorrectionPacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamCaptureAfterBuild134AfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 135', 'packet doc');
passAssertion('build_135_capture_after_build_134_after_after_all_after_guard_wiring_correction_packet_referenced');

mustHave(packetDoc, freshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionDocPath, 'packet doc');
mustHave(packetDoc, upstreamFreshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 134', 'packet doc');
passAssertion('build_134_fresh_decision_after_after_all_after_guard_wiring_correction_packet_referenced');

mustHave(packetDoc, afterAfterAllAfterGuardFreshChainWiringCorrectionPacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 133', 'packet doc');
passAssertion('build_133_after_after_all_after_guard_fresh_chain_wiring_correction_packet_referenced');

mustHave(packetDoc, postBuild131BlockedEvidenceDocPath, 'packet doc');
mustHave(packetDoc, upstreamPostBuild131BlockedEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 132', 'packet doc');
passAssertion('build_132_post_build_131_blocked_evidence_packet_referenced');

mustHave(packetDoc, scaffoldingBuildDocPath, 'packet doc');
mustHave(packetDoc, upstreamScaffoldingBuildFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 103', 'packet doc');
passAssertion('build_103_runner_scaffolding_build_packet_referenced');

mustHave(
  packetDoc,
  'runner_execution_path_after_build_136_fresh_chain_wiring_gap_status | detected',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'runner_execution_path_after_build_136_fresh_chain_wiring_gap_status | detected',
  'no-go review',
);
passAssertion('runner_execution_path_after_build_136_fresh_chain_wiring_gap_status_detected');

mustHave(
  packetDoc,
  'runner_execution_path_after_build_136_fresh_chain_wiring_correction_status | design_or_corrected_review_only',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'runner_execution_path_after_build_136_fresh_chain_wiring_correction_status | design_or_corrected_review_only',
  'no-go review',
);
passAssertion(
  'runner_execution_path_after_build_136_fresh_chain_wiring_correction_status_design_or_corrected_review_only',
);

mustHave(packetDoc, 'prior_exact_command_attempt_after_build_136_status | attempted_blocked_nonzero', 'packet doc');
mustHave(noGoReviewDoc, 'prior_exact_command_attempt_after_build_136_status | attempted_blocked_nonzero', 'no-go review');
passAssertion('prior_exact_command_attempt_after_build_136_status_attempted_blocked_nonzero');

mustHave(packetDoc, 'prior_exact_command_exit_status | nonzero_blocked', 'packet doc');
mustHave(noGoReviewDoc, 'prior_exact_command_exit_status | nonzero_blocked', 'no-go review');
passAssertion('prior_exact_command_exit_status_nonzero_blocked');

mustHave(
  packetDoc,
  'prior_command_attempt_consumption_status | consumed_by_blocked_fail_closed_result_after_build_136_guard',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'prior_command_attempt_consumption_status | consumed_by_blocked_fail_closed_result_after_build_136_guard',
  'no-go review',
);
passAssertion('prior_command_attempt_consumption_status_consumed_by_blocked_after_build_136_guard');

mustHave(
  packetDoc,
  'runner_output_state_after_build_136_status | stale_pre_build_133_134_135_136_state_detected',
  'packet doc',
);
passAssertion('runner_output_state_after_build_136_stale_removed');

mustHave(
  packetDoc,
  'runner_did_not_recognize_build_133_after_after_all_after_guard_fresh_chain_wiring_correction_status_before_correction | true',
  'packet doc',
);
mustHave(packetDoc, 'runner_did_not_recognize_build_134_fresh_decision_status_before_correction | true', 'packet doc');
mustHave(
  packetDoc,
  'runner_did_not_recognize_build_135_approval_capture_status_before_correction | true',
  'packet doc',
);
mustHave(
  packetDoc,
  'runner_did_not_recognize_build_136_pre_run_guard_status_before_correction | true',
  'packet doc',
);
passAssertion('runner_did_not_recognize_build_133_before_correction_documented');
passAssertion('runner_did_not_recognize_build_134_before_correction_documented');
passAssertion('runner_did_not_recognize_build_135_before_correction_documented');
passAssertion('runner_did_not_recognize_build_136_before_correction_documented');

mustHave(packetDoc, 'immediate_rerun_allowed | false', 'packet doc');
mustHave(noGoReviewDoc, 'immediate_rerun_allowed | false', 'no-go review');
passAssertion('immediate_rerun_allowed_false');

mustHave(
  packetDoc,
  'fresh_decision_required_after_build_136_fresh_chain_wiring_correction | true',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fresh_decision_required_after_build_136_fresh_chain_wiring_correction | true',
  'no-go review',
);
passAssertion('fresh_decision_required_after_build_136_fresh_chain_wiring_correction_true');

mustHave(
  packetDoc,
  'fresh_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction | true',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fresh_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction | true',
  'no-go review',
);
passAssertion('fresh_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction_true');

mustHave(
  packetDoc,
  'fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_status | closed',
  'packet doc',
);
passAssertion('fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_closed');

mustHave(
  packetDoc,
  'fresh_runner_execution_approval_capture_after_build_134_after_after_all_after_guard_fresh_chain_wiring_correction_status | captured_signed',
  'packet doc',
);
passAssertion(
  'fresh_runner_execution_approval_capture_after_build_134_after_after_all_after_guard_fresh_chain_wiring_correction_captured_signed',
);

mustHave(
  packetDoc,
  'fresh_execution_pre_run_guard_after_build_134_approval_capture_status | passed',
  'packet doc',
);
passAssertion('fresh_execution_pre_run_guard_after_build_134_approval_capture_passed');

mustHave(packetDoc, 'fresh_runner_execution_approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_jason_signed_approval_status | signed', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_exact_values_required_count | 24', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_exact_values_accepted_count | 24', 'packet doc');
mustHave(packetDoc, 'fresh_runner_execution_exact_values_approved_count | 24', 'packet doc');
passAssertion('fresh_runner_execution_approval_captured_signed_24_24_24');

mustHave(packetDoc, 'fresh_execution_pre_run_guard_status | passed', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_checks_required_count | 30', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_checks_passed_count | 30', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_failed_count | 0', 'packet doc');
passAssertion('fresh_execution_pre_run_guard_passed_30_30_0');

mustHave(
  packetDoc,
  `future_command_status (incoming before correction) | ${INCOMING_FUTURE_COMMAND_STATUS}`,
  'packet doc',
);
passAssertion(
  'incoming_future_command_status_blocked_until_runner_execution_path_after_build_136_fresh_chain_wiring_correction_and_fresh_decision',
);

mustHave(packetDoc, `future_command_status | ${CORRECTED_FUTURE_COMMAND_STATUS}`, 'packet doc');
mustHave(packetDoc, `corrected \`future_command_status\` is \`${CORRECTED_FUTURE_COMMAND_STATUS}\``, 'packet doc');
passAssertion(
  'corrected_future_command_status_blocked_until_fresh_decision_and_fresh_pre_run_guard_pass_after_build_136_fresh_chain_wiring_correction',
);

mustHave(packetDoc, 'runner_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
passAssertion('runner_execution_status_not_run_by_this_packet');
passAssertion('command_execution_status_not_run_by_this_packet');

mustHave(packetDoc, 'runner_command_rerun_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'runner_command_invoked_by_this_packet | false', 'packet doc');
passAssertion('runner_command_rerun_by_this_packet_false');
passAssertion('runner_command_invoked_by_this_packet_false');

mustHave(packetDoc, 'external_calls_made_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'credentials_accessed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'production_data_accessed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_performed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'real_contact_made_by_this_packet | false', 'packet doc');
passAssertion('external_calls_made_by_this_packet_false');
passAssertion('credentials_accessed_by_this_packet_false');
passAssertion('production_data_accessed_by_this_packet_false');
passAssertion('sms_email_calls_calendar_booking_performed_by_this_packet_false');
passAssertion('real_contact_made_by_this_packet_false');

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

mustHave(packetDoc, 'This packet does **not** rerun the runner.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** perform actual 30-scenario validation.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** make external calls.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** access credentials or secret values.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** access production data.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** contact any real roofer or homeowner.', 'packet doc');
mustHave(
  packetDoc,
  'This packet corrects runner execution path after Build 136 fresh-chain wiring messaging/design **only**.',
  'packet doc',
);
passAssertion('packet_does_not_rerun_runner');
passAssertion('packet_does_not_perform_validation');
passAssertion('packet_does_not_make_external_calls');
passAssertion('packet_does_not_access_credentials');
passAssertion('packet_does_not_access_production_data');
passAssertion('packet_does_not_contact_roofer_or_homeowner');

mustHave(packetDoc, 'does **not** add live execution behavior', 'packet doc');
mustHave(packetDoc, 'does **not** add credential-loading logic', 'packet doc');
mustHave(packetDoc, 'does **not** add production data access', 'packet doc');
mustHave(
  packetDoc,
  'does **not** add SMS/email/call/calendar send/booking activation',
  'packet doc',
);
passAssertion('packet_does_not_add_live_execution_behavior');
passAssertion('packet_does_not_add_credential_loading');
passAssertion('packet_does_not_add_production_data_access');
passAssertion('packet_does_not_add_sms_email_call_calendar');

mustHave(packetDoc, 'does **not** turn the runner into an executable external validation path', 'packet doc');
passAssertion('packet_does_not_turn_runner_into_executable_external_validation_path');

mustHave(packetDoc, 'fresh runner-execution decision/template', 'packet doc');
mustHave(packetDoc, 'not immediate rerun', 'packet doc');
mustHave(packetDoc, 'Build 137 consumed the post-Build-136 exact approved command attempt', 'packet doc');
passAssertion('next_step_fresh_decision_not_immediate_rerun');
passAssertion('build_137_consumed_post_build_136_attempt_documented');

mustHave(
  packetDoc,
  'prior_build_133_134_135_136_decision_approval_guard_chain_reusable_after_build_136_blocked_evidence | false',
  'packet doc',
);
passAssertion('prior_build_133_134_135_136_chain_not_reusable_documented');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');
passAssertion('demo_ready_with_live_automation_disabled_preserved');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
readJson(upstreamPostBuild136BlockedEvidenceFixturePath);
readJson(upstreamFreshPreRunGuardAfterBuild134ApprovalCaptureFixturePath);
readJson(upstreamCaptureAfterBuild134AfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath);
readJson(upstreamFreshDecisionAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath);
readJson(upstreamAfterAfterAllAfterGuardFreshChainWiringCorrectionFixturePath);
readJson(upstreamPostBuild131BlockedEvidenceFixturePath);
readJson(upstreamScaffoldingBuildFixturePath);
const manifest = readJson(manifestPath);
passAssertion('upstream_post_build_131_blocked_evidence_fixture_present');
passAssertion('upstream_fresh_pre_run_guard_after_build_134_approval_capture_fixture_present');
passAssertion('upstream_capture_after_build_134_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present');
passAssertion('upstream_fresh_decision_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present');
passAssertion('upstream_after_after_all_after_guard_fresh_chain_wiring_correction_fixture_present');
passAssertion('upstream_post_build_131_blocked_evidence_fixture_present');
passAssertion('upstream_scaffolding_build_fixture_present');
passAssertion('manifest_fixture_present');

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit mismatch');
}
if (fixture.prior_post_build_136_blocked_evidence_status !== 'closed') {
  fail('fixture prior_post_build_136_blocked_evidence_status mismatch');
}
if (fixture.runner_execution_path_after_build_136_fresh_chain_wiring_gap_status !== 'detected') {
  fail('fixture runner_execution_path_after_build_136_fresh_chain_wiring_gap_status mismatch');
}
if (
  fixture.runner_execution_path_after_build_136_fresh_chain_wiring_correction_status !==
  'design_or_corrected_review_only'
) {
  fail('fixture runner_execution_path_after_build_136_fresh_chain_wiring_correction_status mismatch');
}
if (fixture.prior_exact_command_attempt_after_build_136_status !== 'attempted_blocked_nonzero') {
  fail('fixture prior_exact_command_attempt_after_build_136_status mismatch');
}
if (fixture.prior_exact_command_exit_status !== 'nonzero_blocked') {
  fail('fixture prior_exact_command_exit_status mismatch');
}
if (
  fixture.prior_command_attempt_consumption_status !==
  'consumed_by_blocked_fail_closed_result_after_build_136_guard'
) {
  fail('fixture prior_command_attempt_consumption_status mismatch');
}
if (fixture.immediate_rerun_allowed !== false) {
  fail('fixture immediate_rerun_allowed must be false');
}
if (fixture.fresh_decision_required_after_build_136_fresh_chain_wiring_correction !== true) {
  fail('fixture fresh_decision_required_after_build_136_fresh_chain_wiring_correction must be true');
}
if (fixture.fresh_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction !== true) {
  fail('fixture fresh_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction must be true');
}
if (
  fixture.fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_status !== 'closed'
) {
  fail('fixture fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_status mismatch');
}
if (
  fixture.fresh_runner_execution_approval_capture_after_build_134_after_after_all_after_guard_fresh_chain_wiring_correction_status !==
  'captured_signed'
) {
  fail(
    'fixture fresh_runner_execution_approval_capture_after_build_134_after_after_all_after_guard_fresh_chain_wiring_correction_status mismatch',
  );
}
if (
  fixture.fresh_execution_pre_run_guard_after_build_134_approval_capture_status !== 'passed'
) {
  fail('fixture fresh_execution_pre_run_guard_after_build_134_approval_capture_status mismatch');
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
if (fixture.fresh_execution_pre_run_guard_checks_required_count !== 30) {
  fail('fixture fresh_execution_pre_run_guard_checks_required_count must be 30');
}
if (fixture.fresh_execution_pre_run_guard_checks_passed_count !== 30) {
  fail('fixture fresh_execution_pre_run_guard_checks_passed_count must be 30');
}
if (fixture.fresh_execution_pre_run_guard_failed_count !== 0) {
  fail('fixture fresh_execution_pre_run_guard_failed_count must be 0');
}
if (fixture.incoming_future_command_status_before_correction !== INCOMING_FUTURE_COMMAND_STATUS) {
  fail('fixture incoming_future_command_status_before_correction mismatch');
}
if (fixture.runner_execution_status !== 'not_run_by_this_packet') {
  fail('fixture runner_execution_status mismatch');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status mismatch');
}
if (fixture.runner_command_rerun_by_this_packet !== false) {
  fail('fixture runner_command_rerun_by_this_packet must be false');
}
if (fixture.runner_command_invoked_by_this_packet !== false) {
  fail('fixture runner_command_invoked_by_this_packet must be false');
}
if (fixture.future_command_status !== CORRECTED_FUTURE_COMMAND_STATUS) {
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
if (fixture.demo_ready_with_live_automation_disabled !== 'preserved') {
  fail('fixture demo_ready_with_live_automation_disabled must be preserved');
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
passAssertion('runner_command_path_exists');

if (!isExecutable(runnerPath)) {
  fail(`runner command path is not executable: ${runnerPath}`);
}
passAssertion('runner_command_path_executable');

const runnerScript = read(runnerPath);
mustHave(runnerScript, BLOCKED_OUTPUT_LINE, 'runner script');
mustHave(runnerScript, 'exit 1', 'runner script');
mustHave(
  runnerScript,
  'runner_execution_path_after_after_all_after_guard_fresh_chain_wiring_correction_status: design_or_corrected_review_only (Build 133)',
  'runner script',
);
mustHave(
  runnerScript,
  'fresh_runner_execution_decision_after_after_all_after_guard_fresh_chain_wiring_correction_status: closed (Build 134)',
  'runner script',
);
mustHave(
  runnerScript,
  'fresh_runner_execution_approval_capture_after_build_134_after_after_all_after_guard_fresh_chain_wiring_correction_status: captured_signed (Build 135)',
  'runner script',
);
mustHave(
  runnerScript,
  'fresh_execution_pre_run_guard_after_build_134_approval_capture_status: passed (Build 136)',
  'runner script',
);
mustHave(
  runnerScript,
  'prior_command_attempt_consumption_status: consumed_by_blocked_fail_closed_result_after_build_136_guard (Build 137)',
  'runner script',
);
mustHave(
  runnerScript,
  'runner_execution_path_after_build_136_fresh_chain_wiring_correction_status: design_or_corrected_review_only',
  'runner script',
);
mustHave(runnerScript, `runner_command_path_status: ${RUNNER_COMMAND_PATH_STATUS}`, 'runner script');
mustHave(runnerScript, `future_command_status: ${CORRECTED_FUTURE_COMMAND_STATUS}`, 'runner script');
mustHave(runnerScript, 'immediate_rerun_allowed: false', 'runner script');
mustHave(
  runnerScript,
  'fresh_decision_required_after_build_136_fresh_chain_wiring_correction: true',
  'runner script',
);
mustHave(
  runnerScript,
  'fresh_pre_run_guard_required_after_build_136_fresh_chain_wiring_correction: true',
  'runner script',
);
mustHave(runnerScript, 'no_immediate_rerun_allowed: true', 'runner script');
passAssertion('runner_command_corrected_blocked_state_language');
passAssertion('runner_command_recognizes_build_133_after_after_all_after_guard_fresh_chain_wiring_correction');
passAssertion('runner_command_recognizes_build_134_fresh_decision');
passAssertion('runner_command_recognizes_build_135_approval_capture');
passAssertion('runner_command_recognizes_build_136_pre_run_guard');
passAssertion('runner_command_build_137_consumed_post_build_136_attempt');

mustNotHave(runnerScript, `future_command_status: ${STALE_FUTURE_COMMAND_STATUS}`, 'runner script');
mustNotHave(runnerScript, STALE_READY_FUTURE_COMMAND_STATUS, 'runner script');
mustNotHave(runnerScript, STALE_BUILD_132_NO_GO_MESSAGE, 'runner script');
passAssertion('runner_command_no_stale_future_command_status');
passAssertion('runner_command_no_stale_ready_future_command_status');
passAssertion('runner_command_no_stale_build_132_era_primary_no_go');
passAssertion('runner_command_fail_closed');

try {
  execSync(`bash ${runnerPath}`, { cwd: root, stdio: 'pipe' });
  fail('runner fail-closed sanity check must exit non-zero');
} catch (error) {
  if (!error.status || error.status !== 1) {
    fail(`runner fail-closed sanity check must exit 1 (got ${error.status})`);
  }
}
passAssertion('runner_direct_invocation_blocked_nonzero_expected');

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
  'Native Workflow Fixture Runner Execution Path After Build 136 Fresh-Chain Wiring Correction',
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
mustHave(
  wrapper,
  'local runner execution path after Build 136 fresh-chain wiring correction only',
  'wrapper mode',
);
mustHave(wrapper, 'not external validation', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(wrapper, 'Build 137', 'wrapper Build 137');
mustHave(wrapper, 'Build 136', 'wrapper Build 136');
mustHave(wrapper, 'Build 135', 'wrapper Build 135');
mustHave(wrapper, 'Build 134', 'wrapper Build 134');
mustHave(wrapper, 'Build 133', 'wrapper Build 133');
mustHave(
  wrapper,
  'runner_execution_path_after_build_136_fresh_chain_wiring_gap_status is detected',
  'wrapper mode',
);
mustHave(
  wrapper,
  'runner_execution_path_after_build_136_fresh_chain_wiring_correction_status is design_or_corrected_review_only',
  'wrapper mode',
);
mustHave(
  wrapper,
  'prior_command_attempt_consumption_status is consumed_by_blocked_fail_closed_result_after_build_136_guard',
  'wrapper mode',
);
mustHave(wrapper, 'immediate_rerun_allowed is false', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(wrapper, INCOMING_FUTURE_COMMAND_STATUS, 'wrapper mode');
mustHave(wrapper, CORRECTED_FUTURE_COMMAND_STATUS, 'wrapper mode');
mustHave(wrapper, 'Build 137 consumed the post-Build-136 attempt', 'wrapper mode');
mustHave(
  wrapper,
  'fresh runner-execution decision and fresh execution pre-run guard after Build 136 fresh-chain wiring correction',
  'wrapper mode',
);
mustHave(wrapper, 'not immediate rerun', 'wrapper mode');
mustHave(wrapper, 'FAIL-CLOSED SANITY CHECK ONLY', 'wrapper sanity label');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');

if (!isExecutable(wrapperPath)) {
  fail(
    `runner execution path after Build 136 fresh-chain wiring correction dry-run wrapper is not executable: ${wrapperPath}`,
  );
}
passAssertion(
  'runner_execution_path_after_build_136_fresh_chain_wiring_correction_dry_run_wrapper_present_and_safe',
);
passAssertion('wrapper_does_not_execute_runner_as_validation');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');
mustHave(packetDoc, runnerPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 110) {
  fail(`REQUIRED_ASSERTIONS must contain 110 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Runner Execution Path After Build 136 Fresh-Chain Wiring Correction verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);
