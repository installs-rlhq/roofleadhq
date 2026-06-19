#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_ACTUAL_30_SCENARIO_COMMAND_RUN_EVIDENCE.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_ACTUAL_30_SCENARIO_COMMAND_RUN_EVIDENCE_NO_GO_REVIEW.md';
const captureRefreshedExactApprovalDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_REFRESHED_EXACT_APPROVAL_FOR_ACTUAL_30_SCENARIO_VALIDATION.md';
const refreshedPreRunGuardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_PRE_RUN_GUARD_PASS_FOR_ACTUAL_30_SCENARIO_VALIDATION.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/refreshed-actual-30-scenario-command-run-evidence.json';
const captureRefreshedExactApprovalFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-refreshed-exact-approval-for-actual-30-scenario-validation.json';
const refreshedPreRunGuardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/refreshed-pre-run-guard-pass-for-actual-30-scenario-validation.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-refreshed-actual-30-scenario-command-run-evidence-dry-run.sh';
const exactApprovedCommandWrapperPath =
  'scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-refreshed-actual-30-scenario-command-run-evidence-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '0da2457';
const CAPTURE_REFRESHED_EXACT_APPROVAL_COMMIT = 'fbdc9d6';
const REFRESHED_PRE_RUN_GUARD_PASS_COMMIT = '0da2457';
const EXACT_APPROVED_COMMAND =
  'bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';
const EXACT_APPROVED_WORKING_DIRECTORY = '/root/roofleadhq';
const REFRESHED_APPROVAL_SIGNATURE_NAME = 'Jason Lohse';
const REFRESHED_APPROVAL_TIMESTAMP = '06/18/2026 10:57 PM MST';
const COMPLETENESS_GATE_ASSERTIONS = 124;
const EVIDENCE_CAPTURE_ASSERTIONS = 115;

const KEY_COMMITS = [
  CAPTURE_REFRESHED_EXACT_APPROVAL_COMMIT,
  REFRESHED_PRE_RUN_GUARD_PASS_COMMIT,
];

const EVIDENCE_CHAIN_COMMITS = [
  '17abae0',
  'cf566ae',
  '728ad03',
  '401bfc7',
  'edceb29',
  'df388f4',
  '3800512',
  'c6df554',
  'f752452',
  '0d7ae0d',
  '5ef9ef5',
  'db9ece3',
  '04e0de6',
  'ae9154b',
  '6b2fe60',
  '816dfc2',
  'ef79784',
  '2dd1016',
  '11e74d4',
  '0cceb00',
  'b6d852c',
  '7f375a4',
  '878fc77',
  'f56340f',
  'aa3f818',
  '15644fa',
  'cc67563',
  '0159faf',
  'dbb30a7',
  '436813f',
  '32c2c8b',
  'f36a247',
  '7f57e7d',
  'e96ff0e',
  '1c04c0c',
  '06529ab',
  '06a6f7f',
  '9106d8f',
  'fbe793e',
  '415abca',
  '6411949',
  'ae61d53',
  'fbdc9d6',
  '0da2457',
];

const COMMAND_RUN_EVIDENCE_CHECKS = [
  'refreshed exact approved command ran from exact approved working directory',
  'wrapper passed as local review-only dry-run',
  'no external calls credentials production data or contact',
  'channel validation completeness gate verifier passed 124 assertions',
  'channel validation evidence capture packet verifier passed 115 assertions',
  'backend build succeeded',
  'actual 30-scenario external validation not captured by this run',
  'live activation and real contact blocks remain not_granted',
  'demo_ready_with_live_automation_disabled preserved',
  'separate decision required before future actual 30-scenario validation batch or different external/sandbox runner',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_capture_refreshed_exact_approval_fixture_present',
  'upstream_refreshed_pre_run_guard_fixture_present',
  'exact_approved_command_wrapper_present',
  'exact_approved_command_wrapper_executable',
  'source_of_truth_commit_0da2457_referenced',
  'capture_refreshed_exact_approval_commit_fbdc9d6_referenced',
  'refreshed_pre_run_guard_pass_commit_0da2457_referenced',
  'capture_refreshed_exact_approval_packet_referenced',
  'refreshed_pre_run_guard_packet_referenced',
  'exact_approved_command_byte_for_byte',
  'exact_approved_working_directory_byte_for_byte',
  'refreshed_exact_approved_command_run_status_completed_local_review_only_wrapper_passed',
  'wrapper_pass_status_passed',
  'command_execution_status_refreshed_exact_approved_command_ran_local_review_only',
  'channel_validation_completeness_gate_assertions_124',
  'channel_validation_evidence_capture_packet_assertions_115',
  'backend_build_status_passed',
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_missing_count_30',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'refreshed_approval_capture_status_captured',
  'refreshed_jason_signed_approval_status_signed',
  'refreshed_pre_run_guard_status_passed_for_exact_scoped_actual_30_scenario_sandbox_test_mode_validation_only',
  'refreshed_pre_run_guard_decision_pass_for_exact_approved_actual_30_scenario_sandbox_test_mode_command_only',
  'live_activation_approval_status_not_granted',
  'real_homeowner_contact_approval_status_not_granted',
  'real_roofer_contact_approval_status_not_granted',
  'production_supabase_write_approval_status_not_granted',
  'schema_auth_rls_security_change_approval_status_not_granted',
  'billing_payment_automation_approval_status_not_granted',
  'external_calls_made_false',
  'credentials_accessed_false',
  'production_data_accessed_false',
  'sms_email_calls_calendar_booking_performed_false',
  'public_route_webhook_scheduler_cron_dispatcher_activated_false',
  'demo_ready_with_live_automation_disabled_preserved',
  'future_command_status_refreshed_command_run_evidence_captured_pending_next_exact_decision',
  'separate_decision_required_before_future_30_scenario_validation_batch',
  'separate_decision_required_for_different_external_sandbox_runner',
  'packet_does_not_claim_full_30_scenario_validation_passed',
  'packet_does_not_claim_live_sandbox_external_testing_completed',
  'packet_does_not_capture_actual_external_live_sandbox_evidence',
  'historical_local_channel_validation_evidence_0_of_30',
  'missing_validation_evidence_scenarios_count_30',
  'controlled_real_roofer_setup_and_live_activation_remain_blocked',
  'command_run_evidence_checks_all_10_checks_present',
  'command_run_evidence_checks_all_10_checks_passed',
  'approved_for_activation_now_false',
  'external_calls_allowed_by_this_packet_false',
  'credentials_access_allowed_by_this_packet_false',
  'production_data_access_allowed_by_this_packet_false',
  'packet_does_not_execute_sandbox_test_mode_as_external_live_run',
  'packet_does_not_activate_sandbox_test_mode',
  'packet_does_not_approve_live_activation',
  'packet_does_not_approve_real_homeowner_contact',
  'packet_does_not_approve_real_roofer_contact',
  'packet_does_not_approve_production_data_access',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'refreshed_command_run_evidence_dry_run_wrapper_present_and_safe',
  'exact_approved_command_wrapper_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_REFRESHED_ACTUAL_30_SCENARIO_COMMAND_RUN_EVIDENCE.md',
  'NATIVE_WORKFLOW_FIXTURE_REFRESHED_ACTUAL_30_SCENARIO_COMMAND_RUN_EVIDENCE_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-refreshed-actual-30-scenario-command-run-evidence-dry-run.sh',
  'verify-native-workflow-fixture-refreshed-actual-30-scenario-command-run-evidence-readonly.js',
  'refreshed-actual-30-scenario-command-run-evidence.json',
  'Native Workflow Fixture Refreshed Actual 30-Scenario Command Run Evidence',
  'native workflow fixture refreshed actual 30 scenario command run evidence',
  'refreshed actual 30 scenario command run evidence',
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
read(captureRefreshedExactApprovalDocPath);
read(refreshedPreRunGuardDocPath);
const wrapper = read(wrapperPath);
const exactApprovedWrapper = read(exactApprovedCommandWrapperPath);
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
  'fake-data/local-only/read-only/dry-run-only/review-only/refreshed-command-run-evidence-only/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/refreshed-command-run-evidence-only/non-executing',
  'no-go review',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_0da2457_referenced');

for (const commit of KEY_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc key commits');
  mustHave(noGoReviewDoc, commit, 'no-go review key commits');
}
passAssertion('capture_refreshed_exact_approval_commit_fbdc9d6_referenced');
passAssertion('refreshed_pre_run_guard_pass_commit_0da2457_referenced');

mustHave(packetDoc, captureRefreshedExactApprovalDocPath, 'packet doc');
mustHave(packetDoc, captureRefreshedExactApprovalFixturePath, 'packet doc');
mustHave(packetDoc, 'capture-refreshed-exact-approval-for-actual-30-scenario-validation', 'packet doc');
passAssertion('capture_refreshed_exact_approval_packet_referenced');

mustHave(packetDoc, refreshedPreRunGuardDocPath, 'packet doc');
mustHave(packetDoc, refreshedPreRunGuardFixturePath, 'packet doc');
mustHave(packetDoc, 'refreshed-pre-run-guard-pass-for-actual-30-scenario-validation', 'packet doc');
passAssertion('refreshed_pre_run_guard_packet_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc');
}

mustHave(
  packetDoc,
  'refreshed_exact_approved_command_run_status | completed_local_review_only_wrapper_passed',
  'packet doc',
);
mustHave(packetDoc, `exact_approved_command | ${EXACT_APPROVED_COMMAND}`, 'packet doc');
mustHave(
  packetDoc,
  `exact_approved_working_directory | ${EXACT_APPROVED_WORKING_DIRECTORY}`,
  'packet doc',
);
mustHave(
  packetDoc,
  'command_execution_status | refreshed_exact_approved_command_ran_local_review_only',
  'packet doc',
);
mustHave(packetDoc, 'wrapper_pass_status | passed', 'packet doc');
mustHave(
  packetDoc,
  `channel_validation_completeness_gate_assertions | ${COMPLETENESS_GATE_ASSERTIONS}`,
  'packet doc',
);
mustHave(
  packetDoc,
  `channel_validation_evidence_capture_packet_assertions | ${EVIDENCE_CAPTURE_ASSERTIONS}`,
  'packet doc',
);
mustHave(packetDoc, 'backend_build_status | passed', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_missing_count | 30', 'packet doc');
mustHave(
  packetDoc,
  'actual_30_scenario_external_validation_status | not_captured_by_this_run',
  'packet doc',
);
passAssertion('refreshed_exact_approved_command_run_status_completed_local_review_only_wrapper_passed');
passAssertion('wrapper_pass_status_passed');
passAssertion('command_execution_status_refreshed_exact_approved_command_ran_local_review_only');
passAssertion('channel_validation_completeness_gate_assertions_124');
passAssertion('channel_validation_evidence_capture_packet_assertions_115');
passAssertion('backend_build_status_passed');
passAssertion('actual_30_scenario_external_validation_captured_count_0');
passAssertion('actual_30_scenario_external_validation_passed_count_0');
passAssertion('actual_30_scenario_external_validation_missing_count_30');
passAssertion('actual_30_scenario_external_validation_status_not_captured_by_this_run');
passAssertion('exact_approved_command_byte_for_byte');
passAssertion('exact_approved_working_directory_byte_for_byte');

mustHave(packetDoc, 'refreshed_approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'refreshed_jason_signed_approval_status | signed', 'packet doc');
mustHave(packetDoc, REFRESHED_APPROVAL_SIGNATURE_NAME, 'packet doc');
mustHave(packetDoc, REFRESHED_APPROVAL_TIMESTAMP, 'packet doc');
mustHave(
  packetDoc,
  'refreshed_pre_run_guard_status | passed_for_exact_scoped_actual_30_scenario_sandbox_test_mode_validation_only',
  'packet doc',
);
mustHave(
  packetDoc,
  'refreshed_pre_run_guard_decision | PASS_FOR_EXACT_APPROVED_ACTUAL_30_SCENARIO_SANDBOX_TEST_MODE_COMMAND_ONLY',
  'packet doc',
);
mustHave(packetDoc, 'live_activation_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_homeowner_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_roofer_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'production_supabase_write_approval_status | not_granted', 'packet doc');
mustHave(
  packetDoc,
  'schema_auth_rls_security_change_approval_status | not_granted',
  'packet doc',
);
mustHave(packetDoc, 'billing_payment_automation_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'external_calls_made | false', 'packet doc');
mustHave(packetDoc, 'credentials_accessed | false', 'packet doc');
mustHave(packetDoc, 'production_data_accessed | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_performed | false', 'packet doc');
mustHave(packetDoc, 'public_route_webhook_scheduler_cron_dispatcher_activated | false', 'packet doc');
mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');
mustHave(
  packetDoc,
  'future_command_status | refreshed_command_run_evidence_captured_pending_next_exact_decision',
  'packet doc',
);
mustHave(
  packetDoc,
  'separate_decision_required_before_future_30_scenario_validation_batch | true',
  'packet doc',
);
mustHave(
  packetDoc,
  'separate_decision_required_for_different_external_sandbox_runner | true',
  'packet doc',
);
passAssertion('refreshed_approval_capture_status_captured');
passAssertion('refreshed_jason_signed_approval_status_signed');
passAssertion(
  'refreshed_pre_run_guard_status_passed_for_exact_scoped_actual_30_scenario_sandbox_test_mode_validation_only',
);
passAssertion(
  'refreshed_pre_run_guard_decision_pass_for_exact_approved_actual_30_scenario_sandbox_test_mode_command_only',
);
passAssertion('live_activation_approval_status_not_granted');
passAssertion('real_homeowner_contact_approval_status_not_granted');
passAssertion('real_roofer_contact_approval_status_not_granted');
passAssertion('production_supabase_write_approval_status_not_granted');
passAssertion('schema_auth_rls_security_change_approval_status_not_granted');
passAssertion('billing_payment_automation_approval_status_not_granted');
passAssertion('external_calls_made_false');
passAssertion('credentials_accessed_false');
passAssertion('production_data_accessed_false');
passAssertion('sms_email_calls_calendar_booking_performed_false');
passAssertion('public_route_webhook_scheduler_cron_dispatcher_activated_false');
passAssertion('future_command_status_refreshed_command_run_evidence_captured_pending_next_exact_decision');
passAssertion('separate_decision_required_before_future_30_scenario_validation_batch');
passAssertion('separate_decision_required_for_different_external_sandbox_runner');

mustHave(packetDoc, 'This packet **does not** claim full 30-scenario validation has passed', 'packet doc');
passAssertion('packet_does_not_claim_full_30_scenario_validation_passed');
mustHave(
  packetDoc,
  'This packet **does not** claim live/sandbox external testing has completed',
  'packet doc',
);
passAssertion('packet_does_not_claim_live_sandbox_external_testing_completed');
mustHave(
  packetDoc,
  'This packet **does not** capture actual external/live/sandbox channel validation evidence',
  'packet doc',
);
passAssertion('packet_does_not_capture_actual_external_live_sandbox_evidence');
mustHave(packetDoc, '0 of 30', 'packet doc');
passAssertion('historical_local_channel_validation_evidence_0_of_30');
mustHave(packetDoc, 'missing_validation_evidence_scenarios_count remains 30', 'packet doc');
passAssertion('missing_validation_evidence_scenarios_count_30');
mustHave(packetDoc, 'Controlled real roofer setup and live activation remain blocked', 'packet doc');
passAssertion('controlled_real_roofer_setup_and_live_activation_remain_blocked');

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'external_calls_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'credentials_access_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'production_data_access_allowed_by_this_packet | false', 'packet doc');
passAssertion('approved_for_activation_now_false');
passAssertion('external_calls_allowed_by_this_packet_false');
passAssertion('credentials_access_allowed_by_this_packet_false');
passAssertion('production_data_access_allowed_by_this_packet_false');

for (const check of COMMAND_RUN_EVIDENCE_CHECKS) {
  mustHave(packetDoc, check, 'packet doc command run evidence checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc command run evidence check status');
}
passAssertion('command_run_evidence_checks_all_10_checks_present');
passAssertion('command_run_evidence_checks_all_10_checks_passed');

mustHave(
  packetDoc,
  'This packet **does not** execute sandbox/test-mode as an external or live run',
  'packet doc',
);
passAssertion('packet_does_not_execute_sandbox_test_mode_as_external_live_run');
mustHave(packetDoc, 'This packet **does not** activate sandbox/test-mode by itself', 'packet doc');
passAssertion('packet_does_not_activate_sandbox_test_mode');
mustHave(packetDoc, 'This packet **does not** approve live activation', 'packet doc');
passAssertion('packet_does_not_approve_live_activation');
mustHave(packetDoc, 'This packet **does not** approve real homeowner contact', 'packet doc');
passAssertion('packet_does_not_approve_real_homeowner_contact');
mustHave(packetDoc, 'This packet **does not** approve real roofer contact', 'packet doc');
passAssertion('packet_does_not_approve_real_roofer_contact');
mustHave(packetDoc, 'This packet **does not** approve production data access', 'packet doc');
passAssertion('packet_does_not_approve_production_data_access');
mustHave(packetDoc, 'Any deviation requires new explicit Jason approval', 'packet doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, captureRefreshedExactApprovalFixturePath))) {
  fail(`missing upstream capture refreshed exact approval fixture: ${captureRefreshedExactApprovalFixturePath}`);
}
passAssertion('upstream_capture_refreshed_exact_approval_fixture_present');

if (!fs.existsSync(path.join(root, refreshedPreRunGuardFixturePath))) {
  fail(`missing upstream refreshed pre-run guard fixture: ${refreshedPreRunGuardFixturePath}`);
}
passAssertion('upstream_refreshed_pre_run_guard_fixture_present');

if (!fs.existsSync(path.join(root, exactApprovedCommandWrapperPath))) {
  fail(`missing exact approved command wrapper: ${exactApprovedCommandWrapperPath}`);
}
passAssertion('exact_approved_command_wrapper_present');

if (!isExecutable(exactApprovedCommandWrapperPath)) {
  fail(`exact approved command wrapper is not executable: ${exactApprovedCommandWrapperPath}`);
}
passAssertion('exact_approved_command_wrapper_executable');

const fixture = readJson(fixturePath);
const upstreamCaptureFixture = readJson(captureRefreshedExactApprovalFixturePath);
const upstreamPreRunGuardFixture = readJson(refreshedPreRunGuardFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 0da2457');
}
if (fixture.capture_refreshed_exact_approval_commit !== CAPTURE_REFRESHED_EXACT_APPROVAL_COMMIT) {
  fail('fixture capture_refreshed_exact_approval_commit must be fbdc9d6');
}
if (fixture.refreshed_pre_run_guard_pass_commit !== REFRESHED_PRE_RUN_GUARD_PASS_COMMIT) {
  fail('fixture refreshed_pre_run_guard_pass_commit must be 0da2457');
}
if (fixture.refreshed_exact_approved_command_run_status !== 'completed_local_review_only_wrapper_passed') {
  fail('fixture refreshed_exact_approved_command_run_status mismatch');
}
if (fixture.command_execution_status !== 'refreshed_exact_approved_command_ran_local_review_only') {
  fail('fixture command_execution_status mismatch');
}
if (fixture.wrapper_pass_status !== 'passed') {
  fail('fixture wrapper_pass_status must be passed');
}
if (fixture.channel_validation_completeness_gate_assertions !== COMPLETENESS_GATE_ASSERTIONS) {
  fail('fixture channel_validation_completeness_gate_assertions must be 124');
}
if (fixture.channel_validation_evidence_capture_packet_assertions !== EVIDENCE_CAPTURE_ASSERTIONS) {
  fail('fixture channel_validation_evidence_capture_packet_assertions must be 115');
}
if (fixture.backend_build_status !== 'passed') {
  fail('fixture backend_build_status must be passed');
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
if (fixture.refreshed_approval_capture_status !== 'captured') {
  fail('fixture refreshed_approval_capture_status must be captured');
}
if (fixture.refreshed_jason_signed_approval_status !== 'signed') {
  fail('fixture refreshed_jason_signed_approval_status must be signed');
}
if (
  fixture.refreshed_pre_run_guard_status !==
  'passed_for_exact_scoped_actual_30_scenario_sandbox_test_mode_validation_only'
) {
  fail('fixture refreshed_pre_run_guard_status mismatch');
}
if (
  fixture.refreshed_pre_run_guard_decision !==
  'PASS_FOR_EXACT_APPROVED_ACTUAL_30_SCENARIO_SANDBOX_TEST_MODE_COMMAND_ONLY'
) {
  fail('fixture refreshed_pre_run_guard_decision mismatch');
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
if (fixture.production_supabase_write_approval_status !== 'not_granted') {
  fail('fixture production_supabase_write_approval_status must be not_granted');
}
if (fixture.schema_auth_rls_security_change_approval_status !== 'not_granted') {
  fail('fixture schema_auth_rls_security_change_approval_status must be not_granted');
}
if (fixture.billing_payment_automation_approval_status !== 'not_granted') {
  fail('fixture billing_payment_automation_approval_status must be not_granted');
}
if (fixture.external_calls_made !== false) {
  fail('fixture external_calls_made must be false');
}
if (fixture.credentials_accessed !== false) {
  fail('fixture credentials_accessed must be false');
}
if (fixture.production_data_accessed !== false) {
  fail('fixture production_data_accessed must be false');
}
if (fixture.sms_email_calls_calendar_booking_performed !== false) {
  fail('fixture sms_email_calls_calendar_booking_performed must be false');
}
if (fixture.public_route_webhook_scheduler_cron_dispatcher_activated !== false) {
  fail('fixture public_route_webhook_scheduler_cron_dispatcher_activated must be false');
}
if (fixture.demo_ready_with_live_automation_disabled !== 'preserved') {
  fail('fixture demo_ready_with_live_automation_disabled must be preserved');
}
if (
  fixture.future_command_status !== 'refreshed_command_run_evidence_captured_pending_next_exact_decision'
) {
  fail('fixture future_command_status mismatch');
}
if (fixture.separate_decision_required_before_future_30_scenario_validation_batch !== true) {
  fail('fixture separate_decision_required_before_future_30_scenario_validation_batch must be true');
}
if (fixture.separate_decision_required_for_different_external_sandbox_runner !== true) {
  fail('fixture separate_decision_required_for_different_external_sandbox_runner must be true');
}
if (fixture.exact_approved_command !== EXACT_APPROVED_COMMAND) {
  fail('fixture exact_approved_command mismatch');
}
if (fixture.exact_approved_working_directory !== EXACT_APPROVED_WORKING_DIRECTORY) {
  fail('fixture exact_approved_working_directory mismatch');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (fixture.external_calls_allowed_by_this_packet !== false) {
  fail('fixture external_calls_allowed_by_this_packet must be false');
}
if (fixture.credentials_access_allowed_by_this_packet !== false) {
  fail('fixture credentials_access_allowed_by_this_packet must be false');
}
if (fixture.production_data_access_allowed_by_this_packet !== false) {
  fail('fixture production_data_access_allowed_by_this_packet must be false');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}
if (fixture.missing_validation_evidence_scenarios_count !== 30) {
  fail('fixture missing_validation_evidence_scenarios_count must be 30');
}

if (!Array.isArray(fixture.command_run_evidence_checks) || fixture.command_run_evidence_checks.length !== 10) {
  fail('fixture command_run_evidence_checks must contain 10 checks');
}
for (let i = 0; i < COMMAND_RUN_EVIDENCE_CHECKS.length; i += 1) {
  const check = fixture.command_run_evidence_checks[i];
  if (check.check !== i + 1) {
    fail(`fixture command_run_evidence_checks[${i}].check must be ${i + 1}`);
  }
  if (check.name !== COMMAND_RUN_EVIDENCE_CHECKS[i]) {
    fail(`fixture command_run_evidence_checks[${i}].name mismatch`);
  }
  if (check.status !== 'passed') {
    fail(`fixture command_run_evidence_checks[${i}].status must be passed`);
  }
}

if (upstreamCaptureFixture.refreshed_approval_capture_status !== 'captured') {
  fail('upstream capture fixture refreshed_approval_capture_status must be captured');
}
if (upstreamCaptureFixture.refreshed_jason_signed_approval_status !== 'signed') {
  fail('upstream capture fixture refreshed_jason_signed_approval_status must be signed');
}
if (upstreamCaptureFixture.approved_exact_command !== EXACT_APPROVED_COMMAND) {
  fail('upstream capture fixture approved_exact_command mismatch');
}
if (upstreamCaptureFixture.approved_exact_working_directory !== EXACT_APPROVED_WORKING_DIRECTORY) {
  fail('upstream capture fixture approved_exact_working_directory mismatch');
}

if (
  upstreamPreRunGuardFixture.refreshed_pre_run_guard_status !==
  'passed_for_exact_scoped_actual_30_scenario_sandbox_test_mode_validation_only'
) {
  fail('upstream pre-run guard fixture refreshed_pre_run_guard_status mismatch');
}
if (upstreamPreRunGuardFixture.approved_exact_command !== EXACT_APPROVED_COMMAND) {
  fail('upstream pre-run guard fixture approved_exact_command mismatch');
}
if (upstreamPreRunGuardFixture.approved_exact_working_directory !== EXACT_APPROVED_WORKING_DIRECTORY) {
  fail('upstream pre-run guard fixture approved_exact_working_directory mismatch');
}

if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 44) {
  fail('fixture evidence_chain_commits must contain 44 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}

passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(combinedDocs, phrase, 'combined packet docs forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(combinedDocs)) fail(`unsafe pattern ${pattern} found in combined docs`);
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
  if (pattern.test(exactApprovedWrapper)) fail(`unsafe pattern ${pattern} found in exact approved command wrapper`);
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
  'Native Workflow Fixture Refreshed Actual 30-Scenario Command Run Evidence',
  'aggregate readiness',
);
mustHave(verifierIndex, packetDocPath, 'verifier index');
mustHave(verifierIndex, noGoReviewDocPath, 'verifier index');
mustHave(verifierIndex, fixturePath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, exactApprovedCommandWrapperPath, 'verifier index');
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
mustHave(wrapper, 'local refreshed command-run evidence capture only', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, '0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(wrapper, 'separate decision', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_APPROVED_COMMAND, 'wrapper must not execute approved command');

if (!isExecutable(wrapperPath)) {
  fail(`refreshed command run evidence wrapper is not executable: ${wrapperPath}`);
}
passAssertion('refreshed_command_run_evidence_dry_run_wrapper_present_and_safe');

mustHave(exactApprovedWrapper, '#!/usr/bin/env bash', 'exact approved wrapper shebang');
mustHave(exactApprovedWrapper, 'set -eo pipefail', 'exact approved wrapper strict mode');
mustHave(exactApprovedWrapper, 'EXACT APPROVED COMMAND PATH', 'exact approved wrapper');
mustHave(exactApprovedWrapper, EXACT_APPROVED_COMMAND, 'exact approved wrapper');
mustHave(exactApprovedWrapper, EXACT_APPROVED_WORKING_DIRECTORY, 'exact approved wrapper');
mustHave(exactApprovedWrapper, 'node --check', 'exact approved wrapper syntax checks');
mustHave(
  exactApprovedWrapper,
  'does NOT execute sandbox/test-mode as an external or live run',
  'exact approved wrapper',
);
mustHave(exactApprovedWrapper, 'Any deviation requires new explicit Jason approval', 'exact approved wrapper');
mustHave(exactApprovedWrapper, 'No external calls', 'exact approved wrapper');
mustNotHave(exactApprovedWrapper, 'verify-source-of-truth.sh', 'exact approved wrapper');
mustNotHave(exactApprovedWrapper, 'fetch(', 'exact approved wrapper');
passAssertion('exact_approved_command_wrapper_safe');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, exactApprovedCommandWrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 77) {
  fail(`REQUIRED_ASSERTIONS must contain 77 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Refreshed Actual 30-Scenario Command Run Evidence verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);