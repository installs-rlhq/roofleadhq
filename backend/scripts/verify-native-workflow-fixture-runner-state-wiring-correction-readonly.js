#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_STATE_WIRING_CORRECTION.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_STATE_WIRING_CORRECTION_NO_GO_REVIEW.md';
const blockedEvidencePacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_RUNNER_COMMAND_BLOCKED_EVIDENCE.md';
const preRunGuardPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_PRE_RUN_GUARD.md';
const capturePacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_SIGNED_RUNNER_EXECUTION_APPROVAL.md';
const runnerExecutionTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_EXACT_APPROVAL_TEMPLATE.md';
const scaffoldingBuildDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_SCAFFOLDING_BUILD.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-state-wiring-correction.json';
const upstreamBlockedEvidenceFixturePath =
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
  'scripts/run-native-workflow-fixture-runner-state-wiring-correction-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-runner-state-wiring-correction-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '4a618fa';
const CAPTURE_BLOCKED_EVIDENCE_COMMIT = '4a618fa';
const RUNNER_EXECUTION_PRE_RUN_GUARD_COMMIT = 'b834baa';
const CAPTURE_SIGNED_RUNNER_EXECUTION_APPROVAL_COMMIT = 'bb0bc14';
const RUNNER_EXECUTION_TEMPLATE_COMMIT = '67393ed';
const RUNNER_SCAFFOLDING_BUILD_COMMIT = '145bf15';

const FUTURE_COMMAND_STATUS =
  'blocked_until_fresh_exact_runner_execution_decision_and_fresh_execution_pre_run_guard_pass';
const STALE_FUTURE_COMMAND_STATUS =
  'blocked_until_runner_execution_exact_approval_captured_and_execution_pre_run_guard_passes';
const STALE_RUNNER_EXECUTION_APPROVAL_LINE = 'runner_execution_approval_status: not_granted';

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_blocked_evidence_fixture_present',
  'upstream_pre_run_guard_fixture_present',
  'upstream_capture_signed_runner_execution_approval_fixture_present',
  'upstream_runner_execution_template_fixture_present',
  'upstream_scaffolding_build_fixture_present',
  'manifest_fixture_present',
  'source_of_truth_commit_4a618fa_referenced',
  'capture_blocked_evidence_commit_4a618fa_referenced',
  'runner_execution_pre_run_guard_commit_b834baa_referenced',
  'capture_signed_runner_execution_approval_commit_bb0bc14_referenced',
  'runner_execution_exact_approval_template_commit_67393ed_referenced',
  'runner_scaffolding_build_commit_145bf15_referenced',
  'build_107_capture_runner_command_blocked_evidence_referenced',
  'build_106_runner_execution_pre_run_guard_packet_referenced',
  'build_105_capture_signed_runner_execution_approval_packet_referenced',
  'build_104_runner_execution_exact_approval_template_packet_referenced',
  'build_103_runner_scaffolding_build_packet_referenced',
  'runner_state_wiring_gap_status_before_packet_detected',
  'runner_state_wiring_correction_status_corrected_review_only',
  'exact_command_attempted_once_status_attempted_blocked_nonzero',
  'prior_one_time_execution_attempt_consumption_status_consumed_by_blocked_attempt',
  'fresh_exact_execution_decision_required_true',
  'fresh_execution_pre_run_guard_required_true',
  'runner_command_path_exists',
  'runner_command_path_executable',
  'runner_command_corrected_blocked_state_language',
  'runner_command_future_command_status_corrected',
  'runner_command_no_stale_future_command_status',
  'runner_command_no_stale_runner_execution_approval_status_not_granted',
  'runner_command_fail_closed',
  'runner_direct_invocation_blocked_nonzero_expected',
  'prior_runner_execution_approval_captured_signed_24_24_24',
  'prior_execution_pre_run_guard_passed_30_30_0',
  'runner_execution_status_not_run_to_validation_by_this_packet',
  'command_execution_status_not_run_to_validation_by_this_packet',
  'runner_command_rerun_by_this_packet_false',
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
  'future_command_status_blocked_until_fresh_exact',
  'packet_does_not_rerun_runner_for_validation',
  'packet_does_not_perform_validation',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_contact_roofer_or_homeowner',
  'packet_does_not_add_live_execution_behavior',
  'packet_does_not_add_credential_loading',
  'packet_does_not_add_production_data_access',
  'packet_does_not_add_sms_email_call_calendar',
  'next_step_fresh_exact_execution_decision_not_immediate_rerun',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'runner_state_wiring_correction_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_RUNNER_STATE_WIRING_CORRECTION.md',
  'NATIVE_WORKFLOW_FIXTURE_RUNNER_STATE_WIRING_CORRECTION_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-runner-state-wiring-correction-dry-run.sh',
  'verify-native-workflow-fixture-runner-state-wiring-correction-readonly.js',
  'runner-state-wiring-correction.json',
  'Native Workflow Fixture Runner State Wiring Correction',
  'native workflow fixture runner state wiring correction',
  'runner state wiring correction',
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
read(blockedEvidencePacketDocPath);
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
  'fake-data/local-only/read-only/dry-run-only/review-only/runner-state-wiring-correction-only/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/runner-state-wiring-correction-only/non-executing',
  'no-go review',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_4a618fa_referenced');

mustHave(packetDoc, CAPTURE_BLOCKED_EVIDENCE_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, CAPTURE_BLOCKED_EVIDENCE_COMMIT, 'no-go review');
passAssertion('capture_blocked_evidence_commit_4a618fa_referenced');

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

mustHave(packetDoc, blockedEvidencePacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamBlockedEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, 'capture-runner-command-blocked-evidence', 'packet doc');
mustHave(packetDoc, 'Build 107', 'packet doc');
passAssertion('build_107_capture_runner_command_blocked_evidence_referenced');

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

mustHave(packetDoc, 'runner_state_wiring_gap_status_before_packet | detected', 'packet doc');
mustHave(noGoReviewDoc, 'runner_state_wiring_gap_status_before_packet | detected', 'no-go review');
passAssertion('runner_state_wiring_gap_status_before_packet_detected');

mustHave(packetDoc, 'runner_state_wiring_correction_status | corrected_review_only', 'packet doc');
mustHave(noGoReviewDoc, 'runner_state_wiring_correction_status | corrected_review_only', 'no-go review');
passAssertion('runner_state_wiring_correction_status_corrected_review_only');

mustHave(packetDoc, 'exact_command_attempted_once_status | attempted_blocked_nonzero', 'packet doc');
mustHave(noGoReviewDoc, 'exact_command_attempted_once_status | attempted_blocked_nonzero', 'no-go review');
passAssertion('exact_command_attempted_once_status_attempted_blocked_nonzero');

mustHave(
  packetDoc,
  'prior_one_time_execution_attempt_consumption_status | consumed_by_blocked_attempt',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'prior_one_time_execution_attempt_consumption_status | consumed_by_blocked_attempt',
  'no-go review',
);
passAssertion('prior_one_time_execution_attempt_consumption_status_consumed_by_blocked_attempt');

mustHave(packetDoc, 'fresh_exact_execution_decision_required | true', 'packet doc');
mustHave(packetDoc, 'fresh_exact_execution_decision_required is `true`', 'packet doc');
mustHave(noGoReviewDoc, 'fresh_exact_execution_decision_required | true', 'no-go review');
passAssertion('fresh_exact_execution_decision_required_true');

mustHave(packetDoc, 'fresh_execution_pre_run_guard_required | true', 'packet doc');
mustHave(packetDoc, 'fresh_execution_pre_run_guard_required is `true`', 'packet doc');
mustHave(noGoReviewDoc, 'fresh_execution_pre_run_guard_required | true', 'no-go review');
passAssertion('fresh_execution_pre_run_guard_required_true');

mustHave(packetDoc, 'prior_runner_execution_approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'prior_runner_execution_jason_signed_approval_status | signed', 'packet doc');
mustHave(packetDoc, 'prior_runner_execution_exact_values_required_count | 24', 'packet doc');
mustHave(packetDoc, 'prior_runner_execution_exact_values_accepted_count | 24', 'packet doc');
mustHave(packetDoc, 'prior_runner_execution_exact_values_approved_count | 24', 'packet doc');
passAssertion('prior_runner_execution_approval_captured_signed_24_24_24');

mustHave(packetDoc, 'prior_execution_pre_run_guard_status | passed', 'packet doc');
mustHave(packetDoc, 'prior_execution_pre_run_guard_checks_required_count | 30', 'packet doc');
mustHave(packetDoc, 'prior_execution_pre_run_guard_checks_passed_count | 30', 'packet doc');
mustHave(packetDoc, 'prior_execution_pre_run_guard_failed_count | 0', 'packet doc');
passAssertion('prior_execution_pre_run_guard_passed_30_30_0');

mustHave(packetDoc, 'runner_execution_status | not_run_to_validation_by_this_packet', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_to_validation_by_this_packet', 'packet doc');
passAssertion('runner_execution_status_not_run_to_validation_by_this_packet');
passAssertion('command_execution_status_not_run_to_validation_by_this_packet');

mustHave(packetDoc, 'runner_command_rerun_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'runner_command_rerun_by_this_packet is `false`', 'packet doc');
passAssertion('runner_command_rerun_by_this_packet_false');

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

mustHave(packetDoc, `future_command_status | ${FUTURE_COMMAND_STATUS}`, 'packet doc');
mustHave(packetDoc, `future_command_status is \`${FUTURE_COMMAND_STATUS}\``, 'packet doc');
passAssertion('future_command_status_blocked_until_fresh_exact');

mustHave(packetDoc, 'This packet does **not** rerun the runner for validation.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** perform actual 30-scenario validation.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** make external calls.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** access credentials.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** access production data.', 'packet doc');
mustHave(packetDoc, 'This packet does **not** contact any real roofer or homeowner.', 'packet doc');
mustHave(packetDoc, 'This packet fixes runner state messaging/wiring **only**.', 'packet doc');
passAssertion('packet_does_not_rerun_runner_for_validation');
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

mustHave(packetDoc, 'fresh exact runner-execution decision/template', 'packet doc');
mustHave(packetDoc, 'not immediate rerun', 'packet doc');
passAssertion('next_step_fresh_exact_execution_decision_not_immediate_rerun');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');
passAssertion('demo_ready_with_live_automation_disabled_preserved');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
readJson(upstreamBlockedEvidenceFixturePath);
readJson(upstreamPreRunGuardFixturePath);
readJson(upstreamCaptureFixturePath);
readJson(upstreamRunnerExecutionTemplateFixturePath);
readJson(upstreamScaffoldingBuildFixturePath);
const manifest = readJson(manifestPath);
passAssertion('upstream_blocked_evidence_fixture_present');
passAssertion('upstream_pre_run_guard_fixture_present');
passAssertion('upstream_capture_signed_runner_execution_approval_fixture_present');
passAssertion('upstream_runner_execution_template_fixture_present');
passAssertion('upstream_scaffolding_build_fixture_present');
passAssertion('manifest_fixture_present');

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit mismatch');
}
if (fixture.runner_state_wiring_gap_status_before_packet !== 'detected') {
  fail('fixture runner_state_wiring_gap_status_before_packet mismatch');
}
if (fixture.runner_state_wiring_correction_status !== 'corrected_review_only') {
  fail('fixture runner_state_wiring_correction_status mismatch');
}
if (fixture.exact_command_attempted_once_status !== 'attempted_blocked_nonzero') {
  fail('fixture exact_command_attempted_once_status mismatch');
}
if (fixture.prior_one_time_execution_attempt_consumption_status !== 'consumed_by_blocked_attempt') {
  fail('fixture prior_one_time_execution_attempt_consumption_status mismatch');
}
if (fixture.fresh_exact_execution_decision_required !== true) {
  fail('fixture fresh_exact_execution_decision_required must be true');
}
if (fixture.fresh_execution_pre_run_guard_required !== true) {
  fail('fixture fresh_execution_pre_run_guard_required must be true');
}
if (fixture.prior_runner_execution_exact_values_required_count !== 24) {
  fail('fixture prior_runner_execution_exact_values_required_count must be 24');
}
if (fixture.prior_runner_execution_exact_values_accepted_count !== 24) {
  fail('fixture prior_runner_execution_exact_values_accepted_count must be 24');
}
if (fixture.prior_runner_execution_exact_values_approved_count !== 24) {
  fail('fixture prior_runner_execution_exact_values_approved_count must be 24');
}
if (fixture.prior_execution_pre_run_guard_checks_required_count !== 30) {
  fail('fixture prior_execution_pre_run_guard_checks_required_count must be 30');
}
if (fixture.prior_execution_pre_run_guard_checks_passed_count !== 30) {
  fail('fixture prior_execution_pre_run_guard_checks_passed_count must be 30');
}
if (fixture.prior_execution_pre_run_guard_failed_count !== 0) {
  fail('fixture prior_execution_pre_run_guard_failed_count must be 0');
}
if (fixture.runner_execution_status !== 'not_run_to_validation_by_this_packet') {
  fail('fixture runner_execution_status mismatch');
}
if (fixture.command_execution_status !== 'not_run_to_validation_by_this_packet') {
  fail('fixture command_execution_status mismatch');
}
if (fixture.runner_command_rerun_by_this_packet !== false) {
  fail('fixture runner_command_rerun_by_this_packet must be false');
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
mustHave(runnerScript, 'BLOCKED', 'runner script');
mustHave(runnerScript, 'exit 1', 'runner script');
mustHave(runnerScript, 'prior_runner_execution_approval_capture_status: captured (Build 105)', 'runner script');
mustHave(runnerScript, 'prior_execution_pre_run_guard_status: passed (Build 106)', 'runner script');
mustHave(runnerScript, 'exact_command_attempted_once_status: attempted_blocked_nonzero (Build 107)', 'runner script');
mustHave(runnerScript, 'runner_state_wiring_correction_status: corrected_review_only', 'runner script');
mustHave(runnerScript, `future_command_status: ${FUTURE_COMMAND_STATUS}`, 'runner script');
mustHave(runnerScript, 'fresh_exact_execution_decision_required: true', 'runner script');
mustHave(runnerScript, 'fresh_execution_pre_run_guard_required: true', 'runner script');
mustHave(runnerScript, 'no_immediate_rerun_allowed: true', 'runner script');
passAssertion('runner_command_corrected_blocked_state_language');
passAssertion('runner_command_future_command_status_corrected');

mustNotHave(runnerScript, `future_command_status: ${STALE_FUTURE_COMMAND_STATUS}`, 'runner script');
mustNotHave(runnerScript, STALE_RUNNER_EXECUTION_APPROVAL_LINE, 'runner script');
passAssertion('runner_command_no_stale_future_command_status');
passAssertion('runner_command_no_stale_runner_execution_approval_status_not_granted');
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
  'Native Workflow Fixture Runner State Wiring Correction',
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
mustHave(wrapper, 'local runner state wiring correction only', 'wrapper mode');
mustHave(wrapper, 'not external validation', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(wrapper, 'Build 107', 'wrapper Build 107');
mustHave(wrapper, 'Build 106', 'wrapper Build 106');
mustHave(wrapper, 'Build 105', 'wrapper Build 105');
mustHave(wrapper, 'runner_state_wiring_gap_status_before_packet is detected', 'wrapper mode');
mustHave(wrapper, 'runner_state_wiring_correction_status is corrected_review_only', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(
  wrapper,
  'fresh exact runner-execution decision/template and fresh execution pre-run guard',
  'wrapper mode',
);
mustHave(wrapper, 'not immediate rerun', 'wrapper mode');
mustHave(wrapper, 'FAIL-CLOSED SANITY CHECK ONLY', 'wrapper sanity label');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');

if (!isExecutable(wrapperPath)) {
  fail(`runner state wiring correction dry-run wrapper is not executable: ${wrapperPath}`);
}
passAssertion('runner_state_wiring_correction_dry_run_wrapper_present_and_safe');
passAssertion('wrapper_does_not_execute_runner_as_validation');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');
mustHave(packetDoc, runnerPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 85) {
  fail(`REQUIRED_ASSERTIONS must contain 85 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Runner State Wiring Correction verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);