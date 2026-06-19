#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_EXACT_APPROVAL_FOR_ACTUAL_30_SCENARIO_VALIDATION.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_EXACT_APPROVAL_FOR_ACTUAL_30_SCENARIO_VALIDATION_NO_GO_REVIEW.md';
const consumptionDecisionDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ONE_TIME_APPROVAL_CONSUMPTION_DECISION.md';
const postRunEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_APPROVED_COMMAND_POST_RUN_EVIDENCE.md';
const signedApprovalCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_PACKET.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/refreshed-exact-approval-for-actual-30-scenario-validation.json';
const consumptionDecisionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/one-time-approval-consumption-decision.json';
const postRunEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/exact-approved-command-post-run-evidence.json';
const signedApprovalCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/signed-sandbox-test-mode-approval-capture-packet.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-refreshed-exact-approval-for-actual-30-scenario-validation-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-refreshed-exact-approval-for-actual-30-scenario-validation-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '6411949';
const CONSUMPTION_DECISION_COMMIT = '6411949';
const SIGNED_APPROVAL_CAPTURE_COMMIT = '06a6f7f';
const PRE_RUN_GUARD_PASS_COMMIT = '9106d8f';
const WRAPPER_CORRECTION_COMMIT = 'fbe793e';
const POST_RUN_EVIDENCE_COMMIT = '415abca';
const RECOMMENDED_EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';
const RECOMMENDED_EXACT_WORKING_DIRECTORY = '/root/roofleadhq';

const KEY_COMMITS = [
  CONSUMPTION_DECISION_COMMIT,
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
  '6411949',
];

const EXACT_VALUE_FIELDS = [
  'exact_services',
  'exact_test_accounts',
  'exact_environment',
  'exact_command',
  'exact_working_directory',
  'exact_credentials_env_api_webhook_boundary',
  'exact_external_call_boundary',
  'exact_production_data_boundary',
  'exact_schema_auth_rls_security_boundary',
  'exact_public_route_webhook_scheduler_cron_dispatcher_boundary',
  'exact_messaging_contact_permission_boundary',
  'exact_calendar_appointment_boundary',
  'exact_reporting_csv_boundary',
  'exact_stop_conditions',
  'exact_rollback_owner',
  'exact_evidence_owner',
  'exact_log_path',
  'exact_approval_expiration',
  'exact_one_time_use_limitation',
];

const REFRESHED_TEMPLATE_CHECKS = [
  'prior one-time approval consumed by local wrapper execution',
  'actual 30-scenario external validation remains 0 captured',
  'refreshed exact approval required for future actual 30-scenario validation batch',
  'refreshed approval not captured and not signed',
  'all 19 refreshed exact values remain not accepted and not approved',
  'no command execution approved by this packet',
  'no external calls credentials production data or contact',
  'live activation and real contact blocks remain not_granted',
  'controlled real roofer setup remains blocked',
  'future_command_status blocked until refreshed exact approval captured and pre-run guard passes',
];

const REQUIRED_APPROVAL_LANGUAGE = [
  'I, Jason Lohse, explicitly approve the exact scoped actual 30-scenario sandbox/test-mode validation batch described below.',
  'This refreshed approval is for actual 30-scenario sandbox/test-mode validation batch only.',
  'This refreshed approval does not approve live activation.',
  'This refreshed approval does not approve real homeowner contact.',
  'This refreshed approval does not approve real roofer contact unless separately approved.',
  'This refreshed approval does not approve production Supabase writes.',
  'This refreshed approval does not approve schema/auth/RLS/security changes.',
  'This refreshed approval does not approve billing/payment/deposit/invoice/quote/estimate automation.',
  'This refreshed approval is one-time-use only.',
  'Any deviation from the exact values below requires new explicit Jason approval.',
  'Signature:',
  'Timestamp:',
  'Expiration:',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_one_time_approval_consumption_decision_fixture_present',
  'upstream_post_run_evidence_fixture_present',
  'upstream_signed_approval_capture_fixture_present',
  'source_of_truth_commit_6411949_referenced',
  'one_time_approval_consumption_decision_commit_6411949_referenced',
  'signed_approval_capture_commit_06a6f7f_referenced',
  'pre_run_guard_pass_commit_9106d8f_referenced',
  'wrapper_correction_commit_fbe793e_referenced',
  'post_run_evidence_commit_415abca_referenced',
  'one_time_approval_consumption_decision_packet_referenced',
  'exact_approved_command_post_run_evidence_packet_referenced',
  'signed_approval_capture_packet_referenced',
  'prior_one_time_approval_consumption_decision_consumed_by_local_wrapper_execution',
  'prior_one_time_approval_consumed_true',
  'refreshed_exact_approval_required_for_future_30_scenario_validation_true',
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'refreshed_approval_capture_status_not_captured',
  'refreshed_jason_signed_approval_status_not_signed',
  'refreshed_exact_values_required_count_19',
  'refreshed_exact_values_accepted_count_0',
  'refreshed_exact_values_approved_count_0',
  'future_command_status_blocked_until_refreshed_exact_approval_captured_and_pre_run_guard_passes',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'recommended_exact_command_present_as_recommended_default_only',
  'recommended_exact_working_directory_present_as_recommended_default_only',
  'recommended_defaults_are_not_approval',
  'prior_consumed_approval_does_not_equal_refreshed_approval',
  'packet_does_not_grant_refreshed_approval',
  'packet_does_not_permit_command_execution',
  'packet_does_not_permit_external_calls_unless_later_explicitly_approved',
  'packet_does_not_permit_credentials_access_unless_later_explicitly_approved',
  'packet_does_not_permit_production_data_access_under_any_condition',
  'packet_does_not_approve_anything',
  'packet_does_not_capture_approval',
  'packet_does_not_execute_command',
  'packet_does_not_contact_roofer_or_homeowner',
  'packet_does_not_activate_sandbox_test_mode',
  'packet_does_not_activate_live_automation',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_send_sms_email_calls_or_calendar_booking',
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
  'all_19_refreshed_exact_values_not_approved_in_packet',
  'fixture_all_19_accepted_exact_values_blank',
  'fixture_all_19_approved_exact_values_blank',
  'template_labeled_refreshed_template_only_not_signed_not_approved_do_not_execute',
  'template_all_19_exact_value_fields_present',
  'template_all_required_approval_language_present',
  'controlled_real_roofer_setup_remains_blocked',
  'historical_local_channel_validation_evidence_0_of_30',
  'refreshed_approval_template_checks_all_10_checks_present',
  'refreshed_approval_template_checks_all_10_checks_passed',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'refreshed_approval_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_REFRESHED_EXACT_APPROVAL_FOR_ACTUAL_30_SCENARIO_VALIDATION.md',
  'NATIVE_WORKFLOW_FIXTURE_REFRESHED_EXACT_APPROVAL_FOR_ACTUAL_30_SCENARIO_VALIDATION_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-refreshed-exact-approval-for-actual-30-scenario-validation-dry-run.sh',
  'verify-native-workflow-fixture-refreshed-exact-approval-for-actual-30-scenario-validation-readonly.js',
  'refreshed-exact-approval-for-actual-30-scenario-validation.json',
  'Native Workflow Fixture Refreshed Exact Approval for Actual 30-Scenario Validation',
  'native workflow fixture refreshed exact approval for actual 30 scenario validation',
  'refreshed exact approval for actual 30 scenario validation',
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
read(consumptionDecisionDocPath);
read(postRunEvidenceDocPath);
read(signedApprovalCaptureDocPath);
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
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/template-only/not-approved/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/template-only/not-approved/non-executing',
  'no-go review',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_6411949_referenced');

for (const commit of KEY_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc key commits');
  mustHave(noGoReviewDoc, commit, 'no-go review key commits');
}
passAssertion('one_time_approval_consumption_decision_commit_6411949_referenced');
passAssertion('signed_approval_capture_commit_06a6f7f_referenced');
passAssertion('pre_run_guard_pass_commit_9106d8f_referenced');
passAssertion('wrapper_correction_commit_fbe793e_referenced');
passAssertion('post_run_evidence_commit_415abca_referenced');

mustHave(packetDoc, consumptionDecisionDocPath, 'packet doc');
mustHave(packetDoc, consumptionDecisionFixturePath, 'packet doc');
mustHave(packetDoc, 'one-time-approval-consumption-decision', 'packet doc');
passAssertion('one_time_approval_consumption_decision_packet_referenced');

mustHave(packetDoc, postRunEvidenceDocPath, 'packet doc');
mustHave(packetDoc, postRunEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, 'exact-approved-command-post-run-evidence', 'packet doc');
passAssertion('exact_approved_command_post_run_evidence_packet_referenced');

mustHave(packetDoc, signedApprovalCaptureDocPath, 'packet doc');
mustHave(packetDoc, signedApprovalCaptureFixturePath, 'packet doc');
mustHave(packetDoc, 'signed-sandbox-test-mode-approval-capture-packet', 'packet doc');
passAssertion('signed_approval_capture_packet_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc');
}

mustHave(
  packetDoc,
  'prior_one_time_approval_consumption_decision | consumed_by_local_wrapper_execution',
  'packet doc',
);
mustHave(packetDoc, 'prior_one_time_approval_consumed | true', 'packet doc');
mustHave(
  packetDoc,
  'refreshed_exact_approval_required_for_future_30_scenario_validation | true',
  'packet doc',
);
passAssertion('prior_one_time_approval_consumption_decision_consumed_by_local_wrapper_execution');
passAssertion('prior_one_time_approval_consumed_true');
passAssertion('refreshed_exact_approval_required_for_future_30_scenario_validation_true');

mustHave(packetDoc, 'actual_30_scenario_external_validation_captured_count | 0', 'packet doc');
mustHave(packetDoc, 'actual_30_scenario_external_validation_passed_count | 0', 'packet doc');
mustHave(
  packetDoc,
  'actual_30_scenario_external_validation_status | not_captured_by_this_run',
  'packet doc',
);
passAssertion('actual_30_scenario_external_validation_captured_count_0');
passAssertion('actual_30_scenario_external_validation_passed_count_0');
passAssertion('actual_30_scenario_external_validation_status_not_captured_by_this_run');

mustHave(packetDoc, 'refreshed_approval_capture_status | not_captured', 'packet doc');
mustHave(packetDoc, 'refreshed_jason_signed_approval_status | not_signed', 'packet doc');
mustHave(packetDoc, 'refreshed_exact_values_required_count | 19', 'packet doc');
mustHave(packetDoc, 'refreshed_exact_values_accepted_count | 0', 'packet doc');
mustHave(packetDoc, 'refreshed_exact_values_approved_count | 0', 'packet doc');
passAssertion('refreshed_approval_capture_status_not_captured');
passAssertion('refreshed_jason_signed_approval_status_not_signed');
passAssertion('refreshed_exact_values_required_count_19');
passAssertion('refreshed_exact_values_accepted_count_0');
passAssertion('refreshed_exact_values_approved_count_0');

mustHave(
  packetDoc,
  'future_command_status | blocked_until_refreshed_exact_approval_captured_and_pre_run_guard_passes',
  'packet doc',
);
mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
passAssertion('future_command_status_blocked_until_refreshed_exact_approval_captured_and_pre_run_guard_passes');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');

mustHave(packetDoc, `recommended_exact_command | ${RECOMMENDED_EXACT_COMMAND}`, 'packet doc');
mustHave(
  packetDoc,
  `recommended_exact_working_directory | ${RECOMMENDED_EXACT_WORKING_DIRECTORY}`,
  'packet doc',
);
mustHave(packetDoc, 'recommended_defaults_status | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED', 'packet doc');
mustHave(packetDoc, 'Recommended defaults do **not** equal approval', 'packet doc');
mustHave(packetDoc, 'recommended default only', 'packet doc');
passAssertion('recommended_exact_command_present_as_recommended_default_only');
passAssertion('recommended_exact_working_directory_present_as_recommended_default_only');
passAssertion('recommended_defaults_are_not_approval');

mustHave(packetDoc, 'Prior consumed approval does **not** equal refreshed approval', 'packet doc');
passAssertion('prior_consumed_approval_does_not_equal_refreshed_approval');
mustHave(packetDoc, 'This packet does **not** grant refreshed approval', 'packet doc');
passAssertion('packet_does_not_grant_refreshed_approval');
mustHave(packetDoc, 'This packet does **not** permit command execution', 'packet doc');
passAssertion('packet_does_not_permit_command_execution');
mustHave(
  packetDoc,
  'This packet does **not** permit external calls unless later explicitly approved in refreshed exact values',
  'packet doc',
);
passAssertion('packet_does_not_permit_external_calls_unless_later_explicitly_approved');
mustHave(
  packetDoc,
  'This packet does **not** permit credentials access unless later explicitly approved in refreshed exact values',
  'packet doc',
);
passAssertion('packet_does_not_permit_credentials_access_unless_later_explicitly_approved');
mustHave(
  packetDoc,
  'This packet does **not** permit production data access under any condition',
  'packet doc',
);
passAssertion('packet_does_not_permit_production_data_access_under_any_condition');

mustHave(packetDoc, 'This packet **does not** approve anything', 'packet doc');
passAssertion('packet_does_not_approve_anything');
mustHave(packetDoc, 'This packet **does not** capture a new signed approval', 'packet doc');
passAssertion('packet_does_not_capture_approval');
mustHave(packetDoc, 'This packet **does not** execute any command', 'packet doc');
passAssertion('packet_does_not_execute_command');
mustHave(packetDoc, 'This packet **does not** contact any real roofer or homeowner', 'packet doc');
passAssertion('packet_does_not_contact_roofer_or_homeowner');
mustHave(packetDoc, 'This packet **does not** activate sandbox/test-mode', 'packet doc');
passAssertion('packet_does_not_activate_sandbox_test_mode');
mustHave(packetDoc, 'This packet **does not** activate live automation', 'packet doc');
passAssertion('packet_does_not_activate_live_automation');
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

for (const field of EXACT_VALUE_FIELDS) {
  mustHave(packetDoc, `| ${field} | false | false | not_approved |`, 'packet doc exact values');
}
passAssertion('all_19_refreshed_exact_values_not_approved_in_packet');

mustHave(packetDoc, 'REFRESHED TEMPLATE ONLY — NOT SIGNED — NOT APPROVED — DO NOT EXECUTE', 'packet doc');
mustHave(
  packetDoc,
  'refreshed_approval_template_status | REFRESHED_TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE',
  'packet doc',
);
passAssertion('template_labeled_refreshed_template_only_not_signed_not_approved_do_not_execute');

for (let i = 0; i < EXACT_VALUE_FIELDS.length; i += 1) {
  const field = EXACT_VALUE_FIELDS[i];
  const rowNum = i + 1;
  mustHave(packetDoc, `${rowNum}. ${field}:`, 'packet doc template');
}
passAssertion('template_all_19_exact_value_fields_present');

for (const line of REQUIRED_APPROVAL_LANGUAGE) {
  mustHave(packetDoc, line, 'packet doc template approval language');
}
passAssertion('template_all_required_approval_language_present');

mustHave(packetDoc, 'controlled real roofer setup remains blocked', 'packet doc');
passAssertion('controlled_real_roofer_setup_remains_blocked');
mustHave(packetDoc, '0 of 30', 'packet doc');
passAssertion('historical_local_channel_validation_evidence_0_of_30');

for (const check of REFRESHED_TEMPLATE_CHECKS) {
  mustHave(packetDoc, check, 'packet doc refreshed template checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc refreshed template check status');
}
passAssertion('refreshed_approval_template_checks_all_10_checks_present');
passAssertion('refreshed_approval_template_checks_all_10_checks_passed');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

for (const upstreamFixturePath of [
  consumptionDecisionFixturePath,
  postRunEvidenceFixturePath,
  signedApprovalCaptureFixturePath,
]) {
  if (!fs.existsSync(path.join(root, upstreamFixturePath))) {
    fail(`missing upstream fixture: ${upstreamFixturePath}`);
  }
}
passAssertion('upstream_one_time_approval_consumption_decision_fixture_present');
passAssertion('upstream_post_run_evidence_fixture_present');
passAssertion('upstream_signed_approval_capture_fixture_present');

const fixture = readJson(fixturePath);
const upstreamConsumptionFixture = readJson(consumptionDecisionFixturePath);
const upstreamPostRunFixture = readJson(postRunEvidenceFixturePath);
const upstreamCaptureFixture = readJson(signedApprovalCaptureFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 6411949');
}
if (fixture.one_time_approval_consumption_decision_commit !== CONSUMPTION_DECISION_COMMIT) {
  fail('fixture one_time_approval_consumption_decision_commit must be 6411949');
}
if (fixture.prior_one_time_approval_consumption_decision !== 'consumed_by_local_wrapper_execution') {
  fail('fixture prior_one_time_approval_consumption_decision mismatch');
}
if (fixture.prior_one_time_approval_consumed !== true) {
  fail('fixture prior_one_time_approval_consumed must be true');
}
if (fixture.refreshed_exact_approval_required_for_future_30_scenario_validation !== true) {
  fail('fixture refreshed_exact_approval_required_for_future_30_scenario_validation must be true');
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
if (fixture.refreshed_approval_capture_status !== 'not_captured') {
  fail('fixture refreshed_approval_capture_status must be not_captured');
}
if (fixture.refreshed_jason_signed_approval_status !== 'not_signed') {
  fail('fixture refreshed_jason_signed_approval_status must be not_signed');
}
if (fixture.refreshed_exact_values_required_count !== 19) {
  fail('fixture refreshed_exact_values_required_count must be 19');
}
if (fixture.refreshed_exact_values_accepted_count !== 0) {
  fail('fixture refreshed_exact_values_accepted_count must be 0');
}
if (fixture.refreshed_exact_values_approved_count !== 0) {
  fail('fixture refreshed_exact_values_approved_count must be 0');
}
if (
  fixture.future_command_status !==
  'blocked_until_refreshed_exact_approval_captured_and_pre_run_guard_passes'
) {
  fail('fixture future_command_status mismatch');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (fixture.recommended_exact_command !== RECOMMENDED_EXACT_COMMAND) {
  fail('fixture recommended_exact_command mismatch');
}
if (fixture.recommended_exact_working_directory !== RECOMMENDED_EXACT_WORKING_DIRECTORY) {
  fail('fixture recommended_exact_working_directory mismatch');
}
if (fixture.recommended_defaults_status !== 'RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED') {
  fail('fixture recommended_defaults_status mismatch');
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
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
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
if (fixture.refreshed_approval_template.status !== 'REFRESHED_TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE') {
  fail('fixture refreshed_approval_template.status mismatch');
}
if (fixture.refreshed_approval_template.signed !== false) {
  fail('fixture refreshed_approval_template.signed must be false');
}
if (fixture.refreshed_approval_template.approved !== false) {
  fail('fixture refreshed_approval_template.approved must be false');
}
if (fixture.refreshed_approval_template.captured !== false) {
  fail('fixture refreshed_approval_template.captured must be false');
}

if (!fixture.accepted_exact_values || typeof fixture.accepted_exact_values !== 'object') {
  fail('fixture accepted_exact_values object missing');
}
if (!fixture.approved_exact_values || typeof fixture.approved_exact_values !== 'object') {
  fail('fixture approved_exact_values object missing');
}
for (const field of EXACT_VALUE_FIELDS) {
  if (!(field in fixture.accepted_exact_values)) {
    fail(`fixture accepted_exact_values missing ${field}`);
  }
  const accepted = fixture.accepted_exact_values[field];
  if (typeof accepted !== 'string' || accepted.trim() !== '') {
    fail(`fixture accepted_exact_values.${field} must be blank`);
  }
  if (!(field in fixture.approved_exact_values)) {
    fail(`fixture approved_exact_values missing ${field}`);
  }
  const approved = fixture.approved_exact_values[field];
  if (typeof approved !== 'string' || approved.trim() !== '') {
    fail(`fixture approved_exact_values.${field} must be blank`);
  }
}
passAssertion('fixture_all_19_accepted_exact_values_blank');
passAssertion('fixture_all_19_approved_exact_values_blank');

if (
  !Array.isArray(fixture.refreshed_approval_template_checks) ||
  fixture.refreshed_approval_template_checks.length !== 10
) {
  fail('fixture refreshed_approval_template_checks must contain 10 checks');
}
for (let i = 0; i < REFRESHED_TEMPLATE_CHECKS.length; i += 1) {
  const check = fixture.refreshed_approval_template_checks[i];
  if (check.check !== i + 1) {
    fail(`fixture refreshed_approval_template_checks[${i}].check must be ${i + 1}`);
  }
  if (check.name !== REFRESHED_TEMPLATE_CHECKS[i]) {
    fail(`fixture refreshed_approval_template_checks[${i}].name mismatch`);
  }
  if (check.status !== 'passed') {
    fail(`fixture refreshed_approval_template_checks[${i}].status must be passed`);
  }
}

if (
  !Array.isArray(fixture.evidence_chain_commits) ||
  fixture.evidence_chain_commits.length !== 41
) {
  fail('fixture evidence_chain_commits must contain 41 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}

if (upstreamConsumptionFixture.source_of_truth_commit !== '415abca') {
  fail('upstream consumption decision fixture source_of_truth_commit must be 415abca');
}
if (upstreamConsumptionFixture.one_time_approval_consumption_decision !== 'consumed_by_local_wrapper_execution') {
  fail('upstream consumption decision fixture one_time_approval_consumption_decision mismatch');
}

if (upstreamPostRunFixture.exact_approved_command_run_status !== 'completed_local_review_only_wrapper_passed') {
  fail('upstream post-run evidence fixture exact_approved_command_run_status mismatch');
}

if (upstreamCaptureFixture.approval_capture_status !== 'captured') {
  fail('upstream capture fixture approval_capture_status must be captured');
}

passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(combinedDocs, phrase, 'combined packet docs forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(combinedDocs)) fail(`unsafe pattern ${pattern} found in combined docs`);
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in refreshed approval wrapper`);
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
  'Native Workflow Fixture Refreshed Exact Approval for Actual 30-Scenario Validation',
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
mustHave(wrapper, 'local refreshed approval template only', 'wrapper mode');
mustHave(wrapper, 'not approval', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'refreshed exact approval is not captured and not signed', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(
  wrapper,
  'prior_one_time_approval_consumption_decision is consumed_by_local_wrapper_execution',
  'wrapper mode',
);
mustHave(
  wrapper,
  'future_command_status is blocked_until_refreshed_exact_approval_captured_and_pre_run_guard_passes',
  'wrapper mode',
);
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, RECOMMENDED_EXACT_COMMAND.replace('bash ', ''), 'wrapper must not execute recommended command');

if (!isExecutable(wrapperPath)) {
  fail(`refreshed approval wrapper is not executable: ${wrapperPath}`);
}
passAssertion('refreshed_approval_dry_run_wrapper_present_and_safe');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 85) {
  fail(`REQUIRED_ASSERTIONS must contain 85 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Refreshed Exact Approval for Actual 30-Scenario Validation verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);