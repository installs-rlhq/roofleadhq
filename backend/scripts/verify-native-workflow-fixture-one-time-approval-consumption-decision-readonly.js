#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ONE_TIME_APPROVAL_CONSUMPTION_DECISION.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ONE_TIME_APPROVAL_CONSUMPTION_DECISION_NO_GO_REVIEW.md';
const postRunEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_APPROVED_COMMAND_POST_RUN_EVIDENCE.md';
const wrapperCorrectionDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_APPROVED_COMMAND_WRAPPER_CORRECTION_PACKET.md';
const signedApprovalCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_PACKET.md';
const preRunGuardPassDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SIGNED_APPROVAL_PRE_RUN_GUARD_PASS.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/one-time-approval-consumption-decision.json';
const postRunEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/exact-approved-command-post-run-evidence.json';
const wrapperCorrectionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/approved-command-wrapper-correction-packet.json';
const signedApprovalCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/signed-sandbox-test-mode-approval-capture-packet.json';
const preRunGuardPassFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/signed-approval-pre-run-guard-pass.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-one-time-approval-consumption-decision-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-one-time-approval-consumption-decision-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '415abca';
const SIGNED_APPROVAL_CAPTURE_COMMIT = '06a6f7f';
const PRE_RUN_GUARD_PASS_COMMIT = '9106d8f';
const WRAPPER_CORRECTION_COMMIT = 'fbe793e';
const POST_RUN_EVIDENCE_COMMIT = '415abca';
const EXACT_APPROVED_COMMAND =
  'bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';
const EXACT_APPROVED_WORKING_DIRECTORY = '/root/roofleadhq';
const APPROVAL_SIGNATURE_NAME = 'Jason Lohse';
const APPROVAL_TIMESTAMP = '06/18/2026 10:00PM MST';
const COMPLETENESS_GATE_ASSERTIONS = 124;
const EVIDENCE_CAPTURE_ASSERTIONS = 115;

const KEY_COMMITS = [
  SIGNED_APPROVAL_CAPTURE_COMMIT,
  PRE_RUN_GUARD_PASS_COMMIT,
  WRAPPER_CORRECTION_COMMIT,
  POST_RUN_EVIDENCE_COMMIT,
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
];

const CONSUMPTION_DECISION_CHECKS = [
  'prior local wrapper run passed',
  'one-time approval treated as consumed by local wrapper execution',
  'actual 30-scenario external validation remains 0 captured',
  'refreshed exact approval required for future actual 30-scenario validation batch',
  'no new command execution approved by this packet',
  'no external calls credentials production data or contact',
  'live activation and real contact blocks remain not_granted',
  'controlled real roofer setup remains blocked',
  'demo_ready_with_live_automation_disabled preserved',
  'future_command_status blocked until refreshed exact approval',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_post_run_evidence_fixture_present',
  'upstream_approved_command_wrapper_correction_fixture_present',
  'upstream_signed_approval_capture_fixture_present',
  'upstream_pre_run_guard_pass_fixture_present',
  'source_of_truth_commit_415abca_referenced',
  'signed_approval_capture_commit_06a6f7f_referenced',
  'pre_run_guard_pass_commit_9106d8f_referenced',
  'wrapper_correction_commit_fbe793e_referenced',
  'post_run_evidence_commit_415abca_referenced',
  'exact_approved_command_post_run_evidence_packet_referenced',
  'approved_command_wrapper_correction_packet_referenced',
  'signed_approval_capture_packet_referenced',
  'prior_pre_run_guard_pass_referenced',
  'exact_approved_command_run_status_completed_local_review_only_wrapper_passed',
  'wrapper_pass_status_passed',
  'channel_validation_completeness_gate_assertions_124',
  'channel_validation_evidence_capture_packet_assertions_115',
  'backend_build_status_passed',
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'one_time_approval_consumption_decision_consumed_by_local_wrapper_execution',
  'refreshed_exact_approval_required_for_future_30_scenario_validation_true',
  'future_command_status_blocked_until_refreshed_exact_approval_for_actual_30_scenario_validation',
  'command_execution_status_no_further_command_execution_approved_by_this_packet',
  'approval_capture_status_captured',
  'jason_signed_approval_status_signed',
  'prior_pre_run_guard_status_passed_for_exact_scoped_sandbox_test_mode_only',
  'prior_pre_run_guard_decision_pass_for_exact_approved_sandbox_test_mode_command_only',
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
  'packet_does_not_approve_any_new_command',
  'packet_does_not_approve_live_activation',
  'packet_does_not_approve_real_homeowner_contact',
  'packet_does_not_approve_real_roofer_contact',
  'packet_does_not_approve_production_supabase_writes',
  'packet_does_not_approve_schema_auth_rls_security_changes',
  'packet_does_not_approve_billing_payment_automation',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_send_sms_email_calls_or_calendar_booking',
  'packet_does_not_activate_sandbox_test_mode',
  'packet_does_not_activate_public_routes_webhooks_schedulers_cron_dispatchers',
  'prior_one_time_approval_treated_as_consumed',
  'refreshed_exact_approval_required_documented',
  'historical_local_channel_validation_evidence_0_of_30',
  'controlled_real_roofer_setup_remains_blocked',
  'consumption_decision_checks_all_10_checks_present',
  'consumption_decision_checks_all_10_checks_passed',
  'approved_for_activation_now_false',
  'external_calls_allowed_by_this_packet_false',
  'credentials_access_allowed_by_this_packet_false',
  'production_data_access_allowed_by_this_packet_false',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'consumption_decision_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_ONE_TIME_APPROVAL_CONSUMPTION_DECISION.md',
  'NATIVE_WORKFLOW_FIXTURE_ONE_TIME_APPROVAL_CONSUMPTION_DECISION_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-one-time-approval-consumption-decision-dry-run.sh',
  'verify-native-workflow-fixture-one-time-approval-consumption-decision-readonly.js',
  'one-time-approval-consumption-decision.json',
  'Native Workflow Fixture One-Time Approval Consumption Decision',
  'native workflow fixture one-time approval consumption decision',
  'one-time approval consumption decision',
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
read(postRunEvidenceDocPath);
read(wrapperCorrectionDocPath);
read(signedApprovalCaptureDocPath);
read(preRunGuardPassDocPath);
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
  'fake-data/local-only/read-only/dry-run-only/review-only/approval-consumption-decision-only/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/approval-consumption-decision-only/non-executing',
  'no-go review',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_415abca_referenced');

for (const commit of KEY_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc key commits');
  mustHave(noGoReviewDoc, commit, 'no-go review key commits');
}
passAssertion('signed_approval_capture_commit_06a6f7f_referenced');
passAssertion('pre_run_guard_pass_commit_9106d8f_referenced');
passAssertion('wrapper_correction_commit_fbe793e_referenced');
passAssertion('post_run_evidence_commit_415abca_referenced');

mustHave(packetDoc, postRunEvidenceDocPath, 'packet doc');
mustHave(packetDoc, postRunEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, 'exact-approved-command-post-run-evidence', 'packet doc');
passAssertion('exact_approved_command_post_run_evidence_packet_referenced');

mustHave(packetDoc, wrapperCorrectionDocPath, 'packet doc');
mustHave(packetDoc, wrapperCorrectionFixturePath, 'packet doc');
mustHave(packetDoc, 'approved-command-wrapper-correction-packet', 'packet doc');
passAssertion('approved_command_wrapper_correction_packet_referenced');

mustHave(packetDoc, signedApprovalCaptureDocPath, 'packet doc');
mustHave(packetDoc, signedApprovalCaptureFixturePath, 'packet doc');
mustHave(packetDoc, 'signed-sandbox-test-mode-approval-capture-packet', 'packet doc');
passAssertion('signed_approval_capture_packet_referenced');

mustHave(packetDoc, preRunGuardPassDocPath, 'packet doc');
mustHave(packetDoc, preRunGuardPassFixturePath, 'packet doc');
mustHave(packetDoc, 'signed-approval-pre-run-guard-pass', 'packet doc');
passAssertion('prior_pre_run_guard_pass_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc');
}

mustHave(
  packetDoc,
  'exact_approved_command_run_status | completed_local_review_only_wrapper_passed',
  'packet doc',
);
mustHave(packetDoc, `exact_approved_command | ${EXACT_APPROVED_COMMAND}`, 'packet doc');
mustHave(packetDoc, `exact_approved_working_directory | ${EXACT_APPROVED_WORKING_DIRECTORY}`, 'packet doc');
mustHave(packetDoc, 'wrapper_pass_status | passed', 'packet doc');
mustHave(packetDoc, `channel_validation_completeness_gate_assertions | ${COMPLETENESS_GATE_ASSERTIONS}`, 'packet doc');
mustHave(
  packetDoc,
  `channel_validation_evidence_capture_packet_assertions | ${EVIDENCE_CAPTURE_ASSERTIONS}`,
  'packet doc',
);
mustHave(packetDoc, 'backend_build_status | passed', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(
  packetDoc,
  'actual_30_scenario_external_validation_status | not_captured_by_this_run',
  'packet doc',
);
passAssertion('exact_approved_command_run_status_completed_local_review_only_wrapper_passed');
passAssertion('wrapper_pass_status_passed');
passAssertion('channel_validation_completeness_gate_assertions_124');
passAssertion('channel_validation_evidence_capture_packet_assertions_115');
passAssertion('backend_build_status_passed');
passAssertion('actual_30_scenario_external_validation_captured_count_0');
passAssertion('actual_30_scenario_external_validation_passed_count_0');
passAssertion('actual_30_scenario_external_validation_status_not_captured_by_this_run');

mustHave(
  packetDoc,
  'one_time_approval_consumption_decision | consumed_by_local_wrapper_execution',
  'packet doc',
);
mustHave(
  packetDoc,
  'refreshed_exact_approval_required_for_future_30_scenario_validation | true',
  'packet doc',
);
mustHave(
  packetDoc,
  'future_command_status | blocked_until_refreshed_exact_approval_for_actual_30_scenario_validation',
  'packet doc',
);
mustHave(
  packetDoc,
  'command_execution_status | no_further_command_execution_approved_by_this_packet',
  'packet doc',
);
passAssertion('one_time_approval_consumption_decision_consumed_by_local_wrapper_execution');
passAssertion('refreshed_exact_approval_required_for_future_30_scenario_validation_true');
passAssertion('future_command_status_blocked_until_refreshed_exact_approval_for_actual_30_scenario_validation');
passAssertion('command_execution_status_no_further_command_execution_approved_by_this_packet');

mustHave(packetDoc, 'The prior one-time approval is treated as consumed by the local wrapper execution', 'packet doc');
passAssertion('prior_one_time_approval_treated_as_consumed');
mustHave(
  packetDoc,
  'a refreshed exact approval is required before any future actual 30-scenario validation batch',
  'packet doc',
);
passAssertion('refreshed_exact_approval_required_documented');

mustHave(packetDoc, 'approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'jason_signed_approval_status | signed', 'packet doc');
mustHave(
  packetDoc,
  'prior_pre_run_guard_status | passed_for_exact_scoped_sandbox_test_mode_only',
  'packet doc',
);
mustHave(
  packetDoc,
  'prior_pre_run_guard_decision | PASS_FOR_EXACT_APPROVED_SANDBOX_TEST_MODE_COMMAND_ONLY',
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
passAssertion('approval_capture_status_captured');
passAssertion('jason_signed_approval_status_signed');
passAssertion('prior_pre_run_guard_status_passed_for_exact_scoped_sandbox_test_mode_only');
passAssertion('prior_pre_run_guard_decision_pass_for_exact_approved_sandbox_test_mode_command_only');
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

mustHave(packetDoc, 'This packet **does not** approve any new command', 'packet doc');
passAssertion('packet_does_not_approve_any_new_command');
mustHave(packetDoc, 'This packet **does not** approve live activation', 'packet doc');
passAssertion('packet_does_not_approve_live_activation');
mustHave(packetDoc, 'This packet **does not** approve real homeowner contact', 'packet doc');
passAssertion('packet_does_not_approve_real_homeowner_contact');
mustHave(packetDoc, 'This packet **does not** approve real roofer contact', 'packet doc');
passAssertion('packet_does_not_approve_real_roofer_contact');
mustHave(packetDoc, 'This packet **does not** approve production Supabase writes', 'packet doc');
passAssertion('packet_does_not_approve_production_supabase_writes');
mustHave(
  packetDoc,
  'This packet **does not** approve schema/auth/RLS/security changes',
  'packet doc',
);
passAssertion('packet_does_not_approve_schema_auth_rls_security_changes');
mustHave(
  packetDoc,
  'This packet **does not** approve billing/payment/deposit/invoice/quote/estimate automation',
  'packet doc',
);
passAssertion('packet_does_not_approve_billing_payment_automation');
mustHave(packetDoc, 'This packet **does not** make external calls', 'packet doc');
passAssertion('packet_does_not_make_external_calls');
mustHave(packetDoc, 'This packet **does not** access credentials', 'packet doc');
passAssertion('packet_does_not_access_credentials');
mustHave(packetDoc, 'This packet **does not** access production data', 'packet doc');
passAssertion('packet_does_not_access_production_data');
mustHave(
  packetDoc,
  'This packet **does not** send SMS/email/calls or create calendar booking',
  'packet doc',
);
passAssertion('packet_does_not_send_sms_email_calls_or_calendar_booking');
mustHave(packetDoc, 'This packet **does not** activate sandbox/test-mode', 'packet doc');
passAssertion('packet_does_not_activate_sandbox_test_mode');
mustHave(
  packetDoc,
  'This packet **does not** activate public routes/webhooks/schedulers/cron/dispatchers',
  'packet doc',
);
passAssertion('packet_does_not_activate_public_routes_webhooks_schedulers_cron_dispatchers');

mustHave(packetDoc, '0 of 30', 'packet doc');
passAssertion('historical_local_channel_validation_evidence_0_of_30');
mustHave(packetDoc, 'controlled real roofer setup remains blocked', 'packet doc');
passAssertion('controlled_real_roofer_setup_remains_blocked');

mustHave(packetDoc, APPROVAL_SIGNATURE_NAME, 'packet doc');
mustHave(packetDoc, APPROVAL_TIMESTAMP, 'packet doc');
mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'external_calls_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'credentials_access_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'production_data_access_allowed_by_this_packet | false', 'packet doc');
passAssertion('approved_for_activation_now_false');
passAssertion('external_calls_allowed_by_this_packet_false');
passAssertion('credentials_access_allowed_by_this_packet_false');
passAssertion('production_data_access_allowed_by_this_packet_false');

for (const check of CONSUMPTION_DECISION_CHECKS) {
  mustHave(packetDoc, check, 'packet doc consumption decision checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc consumption decision check status');
}
passAssertion('consumption_decision_checks_all_10_checks_present');
passAssertion('consumption_decision_checks_all_10_checks_passed');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, postRunEvidenceFixturePath))) {
  fail(`missing upstream post-run evidence fixture: ${postRunEvidenceFixturePath}`);
}
passAssertion('upstream_post_run_evidence_fixture_present');

if (!fs.existsSync(path.join(root, wrapperCorrectionFixturePath))) {
  fail(`missing upstream wrapper correction fixture: ${wrapperCorrectionFixturePath}`);
}
passAssertion('upstream_approved_command_wrapper_correction_fixture_present');

if (!fs.existsSync(path.join(root, signedApprovalCaptureFixturePath))) {
  fail(`missing upstream signed approval capture fixture: ${signedApprovalCaptureFixturePath}`);
}
passAssertion('upstream_signed_approval_capture_fixture_present');

if (!fs.existsSync(path.join(root, preRunGuardPassFixturePath))) {
  fail(`missing upstream pre-run guard pass fixture: ${preRunGuardPassFixturePath}`);
}
passAssertion('upstream_pre_run_guard_pass_fixture_present');

const fixture = readJson(fixturePath);
const upstreamPostRunFixture = readJson(postRunEvidenceFixturePath);
const upstreamWrapperCorrectionFixture = readJson(wrapperCorrectionFixturePath);
const upstreamCaptureFixture = readJson(signedApprovalCaptureFixturePath);
const upstreamPreRunGuardFixture = readJson(preRunGuardPassFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 415abca');
}
if (fixture.signed_approval_capture_commit !== SIGNED_APPROVAL_CAPTURE_COMMIT) {
  fail('fixture signed_approval_capture_commit must be 06a6f7f');
}
if (fixture.pre_run_guard_pass_commit !== PRE_RUN_GUARD_PASS_COMMIT) {
  fail('fixture pre_run_guard_pass_commit must be 9106d8f');
}
if (fixture.wrapper_correction_commit !== WRAPPER_CORRECTION_COMMIT) {
  fail('fixture wrapper_correction_commit must be fbe793e');
}
if (fixture.post_run_evidence_commit !== POST_RUN_EVIDENCE_COMMIT) {
  fail('fixture post_run_evidence_commit must be 415abca');
}
if (fixture.exact_approved_command_run_status !== 'completed_local_review_only_wrapper_passed') {
  fail('fixture exact_approved_command_run_status mismatch');
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
if (fixture.actual_30_scenario_external_validation_status !== 'not_captured_by_this_run') {
  fail('fixture actual_30_scenario_external_validation_status mismatch');
}
if (fixture.one_time_approval_consumption_decision !== 'consumed_by_local_wrapper_execution') {
  fail('fixture one_time_approval_consumption_decision mismatch');
}
if (fixture.refreshed_exact_approval_required_for_future_30_scenario_validation !== true) {
  fail('fixture refreshed_exact_approval_required_for_future_30_scenario_validation must be true');
}
if (
  fixture.future_command_status !==
  'blocked_until_refreshed_exact_approval_for_actual_30_scenario_validation'
) {
  fail('fixture future_command_status mismatch');
}
if (fixture.command_execution_status !== 'no_further_command_execution_approved_by_this_packet') {
  fail('fixture command_execution_status mismatch');
}
if (fixture.approval_capture_status !== 'captured') {
  fail('fixture approval_capture_status must be captured');
}
if (fixture.jason_signed_approval_status !== 'signed') {
  fail('fixture jason_signed_approval_status must be signed');
}
if (fixture.prior_pre_run_guard_status !== 'passed_for_exact_scoped_sandbox_test_mode_only') {
  fail('fixture prior_pre_run_guard_status mismatch');
}
if (fixture.prior_pre_run_guard_decision !== 'PASS_FOR_EXACT_APPROVED_SANDBOX_TEST_MODE_COMMAND_ONLY') {
  fail('fixture prior_pre_run_guard_decision mismatch');
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

if (!Array.isArray(fixture.consumption_decision_checks) || fixture.consumption_decision_checks.length !== 10) {
  fail('fixture consumption_decision_checks must contain 10 checks');
}
for (let i = 0; i < CONSUMPTION_DECISION_CHECKS.length; i += 1) {
  const check = fixture.consumption_decision_checks[i];
  if (check.check !== i + 1) {
    fail(`fixture consumption_decision_checks[${i}].check must be ${i + 1}`);
  }
  if (check.name !== CONSUMPTION_DECISION_CHECKS[i]) {
    fail(`fixture consumption_decision_checks[${i}].name mismatch`);
  }
  if (check.status !== 'passed') {
    fail(`fixture consumption_decision_checks[${i}].status must be passed`);
  }
}

if (upstreamPostRunFixture.source_of_truth_commit !== 'fbe793e') {
  fail('upstream post-run evidence fixture source_of_truth_commit must be fbe793e');
}
if (upstreamPostRunFixture.exact_approved_command_run_status !== 'completed_local_review_only_wrapper_passed') {
  fail('upstream post-run evidence fixture exact_approved_command_run_status mismatch');
}

if (upstreamWrapperCorrectionFixture.source_of_truth_commit !== '9106d8f') {
  fail('upstream wrapper correction fixture source_of_truth_commit must be 9106d8f');
}
if (upstreamWrapperCorrectionFixture.exact_approved_command !== EXACT_APPROVED_COMMAND) {
  fail('upstream wrapper correction fixture exact_approved_command mismatch');
}

if (upstreamCaptureFixture.approval_capture_status !== 'captured') {
  fail('upstream capture fixture approval_capture_status must be captured');
}
if (upstreamCaptureFixture.jason_signed_approval_status !== 'signed') {
  fail('upstream capture fixture jason_signed_approval_status must be signed');
}

if (upstreamPreRunGuardFixture.pre_run_guard_status !== 'passed_for_exact_scoped_sandbox_test_mode_only') {
  fail('upstream pre-run guard fixture pre_run_guard_status mismatch');
}
if (upstreamPreRunGuardFixture.approved_exact_command !== EXACT_APPROVED_COMMAND) {
  fail('upstream pre-run guard fixture approved_exact_command mismatch');
}

if (
  !Array.isArray(fixture.evidence_chain_commits) ||
  fixture.evidence_chain_commits.length !== 40
) {
  fail('fixture evidence_chain_commits must contain 40 commits');
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
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in consumption decision wrapper`);
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

mustHave(
  aggregate,
  'verify-native-workflow-fixture-one-time-approval-consumption-decision-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture One-Time Approval Consumption Decision',
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
mustHave(wrapper, 'local approval-consumption decision only', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, 'one-time approval is treated as consumed by the local wrapper execution', 'wrapper mode');
mustHave(
  wrapper,
  'Refreshed exact approval is required for any future actual 30-scenario validation batch',
  'wrapper mode',
);
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');

if (!isExecutable(wrapperPath)) {
  fail(`consumption decision wrapper is not executable: ${wrapperPath}`);
}
passAssertion('consumption_decision_dry_run_wrapper_present_and_safe');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 82) {
  fail(`REQUIRED_ASSERTIONS must contain 82 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture One-Time Approval Consumption Decision verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);