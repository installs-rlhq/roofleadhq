#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_PRE_RUN_GUARD_PASS_FOR_ACTUAL_30_SCENARIO_VALIDATION.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_PRE_RUN_GUARD_PASS_FOR_ACTUAL_30_SCENARIO_VALIDATION_NO_GO_REVIEW.md';
const captureRefreshedExactApprovalDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_REFRESHED_EXACT_APPROVAL_FOR_ACTUAL_30_SCENARIO_VALIDATION.md';
const refreshedTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_EXACT_APPROVAL_FOR_ACTUAL_30_SCENARIO_VALIDATION.md';
const consumptionDecisionDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ONE_TIME_APPROVAL_CONSUMPTION_DECISION.md';
const postRunEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_APPROVED_COMMAND_POST_RUN_EVIDENCE.md';
const signedApprovalCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_PACKET.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/refreshed-pre-run-guard-pass-for-actual-30-scenario-validation.json';
const captureRefreshedExactApprovalFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-refreshed-exact-approval-for-actual-30-scenario-validation.json';
const refreshedTemplateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/refreshed-exact-approval-for-actual-30-scenario-validation.json';
const consumptionDecisionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/one-time-approval-consumption-decision.json';
const postRunEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/exact-approved-command-post-run-evidence.json';
const signedApprovalCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/signed-sandbox-test-mode-approval-capture-packet.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-refreshed-pre-run-guard-pass-for-actual-30-scenario-validation-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-refreshed-pre-run-guard-pass-for-actual-30-scenario-validation-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = 'fbdc9d6';
const CAPTURE_REFRESHED_EXACT_APPROVAL_COMMIT = 'fbdc9d6';
const REFRESHED_TEMPLATE_COMMIT = 'ae61d53';
const CONSUMPTION_DECISION_COMMIT = '6411949';
const SIGNED_APPROVAL_CAPTURE_COMMIT = '06a6f7f';
const PRE_RUN_GUARD_PASS_COMMIT = '9106d8f';
const WRAPPER_CORRECTION_COMMIT = 'fbe793e';
const POST_RUN_EVIDENCE_COMMIT = '415abca';
const APPROVED_EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';
const APPROVED_EXACT_WORKING_DIRECTORY = '/root/roofleadhq';
const REFRESHED_APPROVAL_SIGNATURE_NAME = 'Jason Lohse';
const REFRESHED_APPROVAL_TIMESTAMP = '06/18/2026 10:57 PM MST';
const REFRESHED_APPROVAL_EXPIRATION =
  '7 calendar days from timestamp OR upon completion of the actual 30-scenario validation batch, whichever comes first';

const KEY_COMMITS = [
  CAPTURE_REFRESHED_EXACT_APPROVAL_COMMIT,
  REFRESHED_TEMPLATE_COMMIT,
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
  'ae61d53',
  'fbdc9d6',
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

const APPROVED_EXACT_VALUES = {
  exact_services:
    'Twilio Sandbox SMS API only; Vapi test assistant API only; Resend test mode API only; RoofLeadHQ sandbox/staging Supabase project scoped tables only. No live Twilio, no live Vapi outbound, no live Resend sends, no live Calendar integration, no production Supabase, no CRM, no billing.',
  exact_test_accounts:
    'Jason-designated Twilio sandbox test number only; Jason-designated Vapi test assistant ID only; Jason-designated Resend test inbox address only; Summit Peak Roofing Demo LLC operator sandbox login/fake demo roofer scope only.',
  exact_environment:
    '/root/roofleadhq local repository root on the operator workstation plus RoofLeadHQ sandbox/staging Supabase project only, explicitly not production.',
  exact_command: APPROVED_EXACT_COMMAND,
  exact_working_directory: APPROVED_EXACT_WORKING_DIRECTORY,
  exact_credentials_env_api_webhook_boundary:
    'Named sandbox/test-mode variables only, with no secret values logged: TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_TEST_NUMBER, VAPI_API_KEY, VAPI_ASSISTANT_ID, RESEND_API_KEY, SUPABASE_SANDBOX_URL, SUPABASE_SANDBOX_ANON_KEY, SUPABASE_SANDBOX_SERVICE_ROLE_KEY. Sandbox/staging only. Production variables are forbidden.',
  exact_external_call_boundary:
    'Twilio Sandbox SMS API send/receive to sandbox numbers only; Vapi test API assistant stub calls only; Resend test API to test inbox only; Supabase sandbox/staging REST/RPC only. No production endpoints, no CRM, no billing, no live homeowner/roofer contact.',
  exact_production_data_boundary:
    'No production Supabase reads or writes; no production homeowner PII; no production roofer PII; sandbox/staging tables scoped to Summit Peak Roofing Demo LLC test data only; local fake demo fixtures allowed.',
  exact_schema_auth_rls_security_boundary:
    'No schema migrations; no auth changes; no RLS policy changes; no security config changes. Existing sandbox/staging schema only.',
  exact_public_route_webhook_scheduler_cron_dispatcher_boundary:
    'No new public routes; no public webhook exposure; no scheduler activation; no cron activation; no dispatcher activation; no inbound live webhook handlers. Local wrapper and sandbox/test-mode validation only.',
  exact_messaging_contact_permission_boundary:
    'Sandbox test numbers only; Jason-designated test contacts only; explicit opt-in required for any test contact; STOP/opt-out honored immediately; no live homeowner SMS/email/calls; no real homeowner contact; no real roofer contact unless separately approved.',
  exact_calendar_appointment_boundary:
    'Calendar stub events in sandbox only; no live Google Calendar integration; no live Outlook integration; no real calendar booking; inspection/appointment records in sandbox/staging test data only.',
  exact_reporting_csv_boundary:
    'Local fake-data CSV exports and sandbox admin/dashboard views only; no live CSV delivery to external systems; no production reporting emails; audit logs in sandbox/local scope only.',
  exact_stop_conditions:
    'Stop immediately for any unexpected live service indicator; unexpected production data access; unexpected external call outside the approved boundary; unexpected schema/auth/RLS/security change; unexpected public route/webhook/scheduler/cron/dispatcher activation; unexpected billing/payment/deposit/invoice/quote/estimate behavior; real-data ambiguity; approval ambiguity; safe readiness failure; backend build failure; missing required sandbox/test credential; command path mismatch; working directory mismatch.',
  exact_rollback_owner: 'Jason Lohse, founder/operator.',
  exact_evidence_owner: 'Jason Lohse, founder/operator.',
  exact_log_path:
    'logs/sandbox-test-mode-channel-validation/{YYYY-MM-DD-HHMMSS}.log under /root/roofleadhq.',
  exact_approval_expiration:
    '7 calendar days from this refreshed approval timestamp OR upon completion of the actual 30-scenario validation batch, whichever comes first.',
  exact_one_time_use_limitation:
    'Single-use approval for one actual 30-scenario sandbox/test-mode validation batch only; invalidated after the 30 scenarios complete, any STOP_AND_ROLL_BACK condition, any command/working-directory/boundary deviation, or approval expiration. Reuse requires new explicit Jason approval with refreshed exact values.',
};

const PRE_RUN_GUARD_CHECKS = [
  'source-of-truth HEAD equals refreshed approved HEAD',
  'refreshed exact signed Jason approval is captured',
  'refreshed approval timestamp is captured',
  'refreshed approval scope is captured',
  'all 19 refreshed exact values are accepted',
  'all 19 refreshed exact values are approved',
  'refreshed approval capture completeness gate passes',
  'allowed services/channels match refreshed approval scope',
  'environment matches refreshed approved environment',
  'working directory matches refreshed approved working directory',
  'command matches refreshed exact approved command',
  'stop conditions are present',
  'rollback owner is present',
  'evidence owner is present',
  'refreshed approval is not expired',
  'refreshed one-time-use limitation has not been consumed',
  'full pre-run safety state is demo_ready_with_live_automation_disabled',
  'no unauthorized external services are enabled',
  'no production data access is enabled',
  'no live activation path is enabled',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_capture_refreshed_exact_approval_fixture_present',
  'source_of_truth_commit_fbdc9d6_referenced',
  'capture_refreshed_exact_approval_commit_fbdc9d6_referenced',
  'refreshed_exact_approval_template_commit_ae61d53_referenced',
  'one_time_approval_consumption_decision_commit_6411949_referenced',
  'signed_approval_capture_commit_06a6f7f_referenced',
  'pre_run_guard_pass_commit_9106d8f_referenced',
  'wrapper_correction_commit_fbe793e_referenced',
  'post_run_evidence_commit_415abca_referenced',
  'capture_refreshed_exact_approval_packet_referenced',
  'refreshed_approval_capture_status_captured',
  'refreshed_jason_signed_approval_status_signed',
  'refreshed_approval_signature_jason_lohse_present',
  'refreshed_approval_timestamp_present',
  'all_19_refreshed_exact_values_present_and_approved',
  'refreshed_exact_values_required_count_19',
  'refreshed_exact_values_accepted_count_19',
  'refreshed_exact_values_approved_count_19',
  'refreshed_pre_run_guard_status_passed_for_exact_scoped_actual_30_scenario_sandbox_test_mode_validation_only',
  'refreshed_pre_run_guard_decision_pass_for_exact_approved_actual_30_scenario_sandbox_test_mode_command_only',
  'actual_30_scenario_validation_approval_status_granted_scoped_one_time_pending_refreshed_pre_run_guard',
  'live_activation_approval_status_not_granted',
  'real_homeowner_contact_approval_status_not_granted',
  'real_roofer_contact_approval_status_not_granted',
  'production_supabase_write_approval_status_not_granted',
  'schema_auth_rls_security_change_approval_status_not_granted',
  'billing_payment_automation_approval_status_not_granted',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'future_command_status_ready_for_exact_approved_actual_30_scenario_command_review_only',
  'approved_exact_command_byte_for_byte',
  'approved_exact_working_directory_byte_for_byte',
  'refreshed_pre_run_guard_checks_all_20_checks_present',
  'refreshed_pre_run_guard_checks_all_20_checks_passed',
  'packet_passes_refreshed_pre_run_guard_only_for_exact_approved_actual_30_scenario_command',
  'packet_does_not_execute_approved_command',
  'packet_does_not_activate_sandbox_test_mode',
  'packet_does_not_approve_live_activation',
  'packet_does_not_approve_real_homeowner_contact',
  'packet_does_not_approve_real_roofer_contact',
  'packet_does_not_approve_production_data_access',
  'next_step_exact_approved_actual_30_scenario_command_review_only_after_canonical_closeout',
  'external_calls_allowed_by_this_packet_false',
  'credentials_access_allowed_by_this_packet_false',
  'production_data_access_allowed_by_this_packet_false',
  'sms_email_calls_calendar_booking_allowed_by_this_packet_false',
  'public_route_webhook_scheduler_cron_dispatcher_allowed_by_this_packet_false',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'refreshed_pre_run_guard_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_REFRESHED_PRE_RUN_GUARD_PASS_FOR_ACTUAL_30_SCENARIO_VALIDATION.md',
  'NATIVE_WORKFLOW_FIXTURE_REFRESHED_PRE_RUN_GUARD_PASS_FOR_ACTUAL_30_SCENARIO_VALIDATION_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-refreshed-pre-run-guard-pass-for-actual-30-scenario-validation-dry-run.sh',
  'verify-native-workflow-fixture-refreshed-pre-run-guard-pass-for-actual-30-scenario-validation-readonly.js',
  'refreshed-pre-run-guard-pass-for-actual-30-scenario-validation.json',
  'Native Workflow Fixture Refreshed Pre-Run Guard Pass for Actual 30-Scenario Validation',
  'native workflow fixture refreshed pre run guard pass for actual 30 scenario validation',
  'refreshed pre run guard pass for actual 30 scenario validation',
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
read(refreshedTemplateDocPath);
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
  'fake-data/local-only/read-only/dry-run-only/review-only/refreshed-pre-run-guard-pass-only/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/refreshed-pre-run-guard-pass-only/non-executing',
  'no-go review',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_fbdc9d6_referenced');

for (const commit of KEY_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc key commits');
  mustHave(noGoReviewDoc, commit, 'no-go review key commits');
}
passAssertion('capture_refreshed_exact_approval_commit_fbdc9d6_referenced');
passAssertion('refreshed_exact_approval_template_commit_ae61d53_referenced');
passAssertion('one_time_approval_consumption_decision_commit_6411949_referenced');
passAssertion('signed_approval_capture_commit_06a6f7f_referenced');
passAssertion('pre_run_guard_pass_commit_9106d8f_referenced');
passAssertion('wrapper_correction_commit_fbe793e_referenced');
passAssertion('post_run_evidence_commit_415abca_referenced');

mustHave(packetDoc, captureRefreshedExactApprovalDocPath, 'packet doc');
mustHave(packetDoc, captureRefreshedExactApprovalFixturePath, 'packet doc');
mustHave(packetDoc, 'capture-refreshed-exact-approval-for-actual-30-scenario-validation', 'packet doc');
passAssertion('capture_refreshed_exact_approval_packet_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc');
}

mustHave(packetDoc, REFRESHED_APPROVAL_SIGNATURE_NAME, 'packet doc');
passAssertion('refreshed_approval_signature_jason_lohse_present');
mustHave(packetDoc, REFRESHED_APPROVAL_TIMESTAMP, 'packet doc');
passAssertion('refreshed_approval_timestamp_present');

mustHave(packetDoc, 'refreshed_approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'refreshed_jason_signed_approval_status | signed', 'packet doc');
mustHave(
  packetDoc,
  'actual_30_scenario_validation_approval_status | granted_scoped_one_time_pending_refreshed_pre_run_guard',
  'packet doc',
);
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
passAssertion('refreshed_approval_capture_status_captured');
passAssertion('refreshed_jason_signed_approval_status_signed');
passAssertion(
  'refreshed_pre_run_guard_status_passed_for_exact_scoped_actual_30_scenario_sandbox_test_mode_validation_only',
);
passAssertion(
  'refreshed_pre_run_guard_decision_pass_for_exact_approved_actual_30_scenario_sandbox_test_mode_command_only',
);
passAssertion(
  'actual_30_scenario_validation_approval_status_granted_scoped_one_time_pending_refreshed_pre_run_guard',
);
passAssertion('live_activation_approval_status_not_granted');
passAssertion('real_homeowner_contact_approval_status_not_granted');
passAssertion('real_roofer_contact_approval_status_not_granted');
passAssertion('production_supabase_write_approval_status_not_granted');
passAssertion('schema_auth_rls_security_change_approval_status_not_granted');
passAssertion('billing_payment_automation_approval_status_not_granted');

mustHave(packetDoc, 'refreshed_exact_values_required_count | 19', 'packet doc');
mustHave(packetDoc, 'refreshed_exact_values_accepted_count | 19', 'packet doc');
mustHave(packetDoc, 'refreshed_exact_values_approved_count | 19', 'packet doc');
mustHave(
  packetDoc,
  'refreshed_exact_values_status | accepted_and_approved_for_actual_30_scenario_sandbox_test_mode_validation_only',
  'packet doc',
);
passAssertion('refreshed_exact_values_required_count_19');
passAssertion('refreshed_exact_values_accepted_count_19');
passAssertion('refreshed_exact_values_approved_count_19');

for (const field of EXACT_VALUE_FIELDS) {
  mustHave(packetDoc, `| ${field} | true | true | accepted_and_approved |`, 'packet doc exact values');
  mustHave(packetDoc, APPROVED_EXACT_VALUES[field], 'packet doc exact value text');
}
passAssertion('all_19_refreshed_exact_values_present_and_approved');

mustHave(packetDoc, `approved_exact_command | ${APPROVED_EXACT_COMMAND}`, 'packet doc');
mustHave(
  packetDoc,
  `approved_exact_working_directory | ${APPROVED_EXACT_WORKING_DIRECTORY}`,
  'packet doc',
);
passAssertion('approved_exact_command_byte_for_byte');
passAssertion('approved_exact_working_directory_byte_for_byte');

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(
  packetDoc,
  'future_command_status | ready_for_exact_approved_actual_30_scenario_command_review_only',
  'packet doc',
);
mustHave(packetDoc, 'external_calls_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'credentials_access_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'production_data_access_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_allowed_by_this_packet | false', 'packet doc');
mustHave(
  packetDoc,
  'public_route_webhook_scheduler_cron_dispatcher_allowed_by_this_packet | false',
  'packet doc',
);
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('future_command_status_ready_for_exact_approved_actual_30_scenario_command_review_only');
passAssertion('external_calls_allowed_by_this_packet_false');
passAssertion('credentials_access_allowed_by_this_packet_false');
passAssertion('production_data_access_allowed_by_this_packet_false');
passAssertion('sms_email_calls_calendar_booking_allowed_by_this_packet_false');
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_by_this_packet_false');

for (const check of PRE_RUN_GUARD_CHECKS) {
  mustHave(packetDoc, check, 'packet doc pre-run guard checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc pre-run guard check status');
}
passAssertion('refreshed_pre_run_guard_checks_all_20_checks_present');
passAssertion('refreshed_pre_run_guard_checks_all_20_checks_passed');

mustHave(
  packetDoc,
  'This packet passes the refreshed pre-run guard **only** for the exact approved actual 30-scenario sandbox/test-mode validation command',
  'packet doc',
);
passAssertion('packet_passes_refreshed_pre_run_guard_only_for_exact_approved_actual_30_scenario_command');
mustHave(packetDoc, 'This packet does **not** execute the approved command', 'packet doc');
passAssertion('packet_does_not_execute_approved_command');
mustHave(packetDoc, 'This packet does **not** activate sandbox/test-mode by itself', 'packet doc');
passAssertion('packet_does_not_activate_sandbox_test_mode');
mustHave(packetDoc, 'This packet does **not** approve live activation', 'packet doc');
passAssertion('packet_does_not_approve_live_activation');
mustHave(packetDoc, 'This packet does **not** approve real homeowner contact', 'packet doc');
passAssertion('packet_does_not_approve_real_homeowner_contact');
mustHave(packetDoc, 'This packet does **not** approve real roofer contact', 'packet doc');
passAssertion('packet_does_not_approve_real_roofer_contact');
mustHave(packetDoc, 'This packet does **not** approve production data access', 'packet doc');
passAssertion('packet_does_not_approve_production_data_access');
mustHave(packetDoc, 'closes in canonical main', 'packet doc');
mustHave(packetDoc, 'Any deviation requires new explicit Jason approval', 'packet doc');
passAssertion('next_step_exact_approved_actual_30_scenario_command_review_only_after_canonical_closeout');

mustHave(packetDoc, 'Twilio Sandbox SMS API only', 'packet doc');
mustHave(packetDoc, 'no live Twilio', 'packet doc');
mustHave(packetDoc, 'no production Supabase', 'packet doc');
mustHave(packetDoc, 'demo_ready_with_live_automation_disabled', 'packet doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, captureRefreshedExactApprovalFixturePath))) {
  fail(`missing upstream capture refreshed exact approval fixture: ${captureRefreshedExactApprovalFixturePath}`);
}
passAssertion('upstream_capture_refreshed_exact_approval_fixture_present');

for (const upstreamFixturePath of [
  refreshedTemplateFixturePath,
  consumptionDecisionFixturePath,
  postRunEvidenceFixturePath,
  signedApprovalCaptureFixturePath,
]) {
  if (!fs.existsSync(path.join(root, upstreamFixturePath))) {
    fail(`missing upstream fixture: ${upstreamFixturePath}`);
  }
}

const fixture = readJson(fixturePath);
const upstreamCaptureFixture = readJson(captureRefreshedExactApprovalFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be fbdc9d6');
}
if (fixture.capture_refreshed_exact_approval_commit !== CAPTURE_REFRESHED_EXACT_APPROVAL_COMMIT) {
  fail('fixture capture_refreshed_exact_approval_commit must be fbdc9d6');
}
if (fixture.refreshed_exact_approval_template_commit !== REFRESHED_TEMPLATE_COMMIT) {
  fail('fixture refreshed_exact_approval_template_commit must be ae61d53');
}
if (fixture.one_time_approval_consumption_decision_commit !== CONSUMPTION_DECISION_COMMIT) {
  fail('fixture one_time_approval_consumption_decision_commit must be 6411949');
}
if (fixture.packet_status !== 'review_only') {
  fail('fixture packet_status must be review_only');
}
if (fixture.refreshed_approval_capture_status !== 'captured') {
  fail('fixture refreshed_approval_capture_status must be captured');
}
if (fixture.refreshed_jason_signed_approval_status !== 'signed') {
  fail('fixture refreshed_jason_signed_approval_status must be signed');
}
if (fixture.refreshed_approval_signature_name !== REFRESHED_APPROVAL_SIGNATURE_NAME) {
  fail('fixture refreshed_approval_signature_name mismatch');
}
if (fixture.refreshed_approval_timestamp !== REFRESHED_APPROVAL_TIMESTAMP) {
  fail('fixture refreshed_approval_timestamp mismatch');
}
if (fixture.refreshed_approval_expiration !== REFRESHED_APPROVAL_EXPIRATION) {
  fail('fixture refreshed_approval_expiration mismatch');
}
if (fixture.refreshed_pre_run_guard_status !== 'passed_for_exact_scoped_actual_30_scenario_sandbox_test_mode_validation_only') {
  fail('fixture refreshed_pre_run_guard_status mismatch');
}
if (
  fixture.refreshed_pre_run_guard_decision !==
  'PASS_FOR_EXACT_APPROVED_ACTUAL_30_SCENARIO_SANDBOX_TEST_MODE_COMMAND_ONLY'
) {
  fail('fixture refreshed_pre_run_guard_decision mismatch');
}
if (fixture.refreshed_exact_values_required_count !== 19) {
  fail('fixture refreshed_exact_values_required_count must be 19');
}
if (fixture.refreshed_exact_values_accepted_count !== 19) {
  fail('fixture refreshed_exact_values_accepted_count must be 19');
}
if (fixture.refreshed_exact_values_approved_count !== 19) {
  fail('fixture refreshed_exact_values_approved_count must be 19');
}
if (
  fixture.refreshed_exact_values_status !==
  'accepted_and_approved_for_actual_30_scenario_sandbox_test_mode_validation_only'
) {
  fail('fixture refreshed_exact_values_status mismatch');
}
if (
  fixture.actual_30_scenario_validation_approval_status !==
  'granted_scoped_one_time_pending_refreshed_pre_run_guard'
) {
  fail('fixture actual_30_scenario_validation_approval_status mismatch');
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
if (fixture.approved_exact_command !== APPROVED_EXACT_COMMAND) {
  fail('fixture approved_exact_command mismatch');
}
if (fixture.approved_exact_working_directory !== APPROVED_EXACT_WORKING_DIRECTORY) {
  fail('fixture approved_exact_working_directory mismatch');
}
if (fixture.future_command_status !== 'ready_for_exact_approved_actual_30_scenario_command_review_only') {
  fail('fixture future_command_status mismatch');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
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
if (fixture.sms_email_calls_calendar_booking_allowed_by_this_packet !== false) {
  fail('fixture sms_email_calls_calendar_booking_allowed_by_this_packet must be false');
}
if (fixture.public_route_webhook_scheduler_cron_dispatcher_allowed_by_this_packet !== false) {
  fail('fixture public_route_webhook_scheduler_cron_dispatcher_allowed_by_this_packet must be false');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}
if (fixture.live_activation_allowed !== false) {
  fail('fixture live_activation_allowed must be false');
}
if (fixture.sandbox_test_mode_activation_allowed !== false) {
  fail('fixture sandbox_test_mode_activation_allowed must be false');
}
if (fixture.external_calls_allowed !== false) {
  fail('fixture external_calls_allowed must be false');
}
if (fixture.credentials_access_allowed !== false) {
  fail('fixture credentials_access_allowed must be false');
}
if (fixture.production_data_access_allowed !== false) {
  fail('fixture production_data_access_allowed must be false');
}
if (fixture.demo_ready_with_live_automation_disabled !== 'preserved') {
  fail('fixture demo_ready_with_live_automation_disabled must be preserved');
}

for (const field of EXACT_VALUE_FIELDS) {
  const accepted = fixture.accepted_exact_values[field];
  const approved = fixture.approved_exact_values[field];
  const expected = APPROVED_EXACT_VALUES[field];
  if (accepted !== expected) {
    fail(`fixture accepted_exact_values.${field} mismatch`);
  }
  if (approved !== expected) {
    fail(`fixture approved_exact_values.${field} mismatch`);
  }
}

if (
  !Array.isArray(fixture.refreshed_pre_run_guard_checks) ||
  fixture.refreshed_pre_run_guard_checks.length !== 20
) {
  fail('fixture refreshed_pre_run_guard_checks must contain 20 checks');
}
for (let i = 0; i < PRE_RUN_GUARD_CHECKS.length; i += 1) {
  const check = fixture.refreshed_pre_run_guard_checks[i];
  if (check.check !== i + 1) {
    fail(`fixture refreshed_pre_run_guard_checks[${i}].check must be ${i + 1}`);
  }
  if (check.name !== PRE_RUN_GUARD_CHECKS[i]) {
    fail(`fixture refreshed_pre_run_guard_checks[${i}].name mismatch`);
  }
  if (check.status !== 'passed') {
    fail(`fixture refreshed_pre_run_guard_checks[${i}].status must be passed`);
  }
}

if (upstreamCaptureFixture.refreshed_approval_capture_status !== 'captured') {
  fail('upstream capture fixture refreshed_approval_capture_status must be captured');
}
if (upstreamCaptureFixture.refreshed_jason_signed_approval_status !== 'signed') {
  fail('upstream capture fixture refreshed_jason_signed_approval_status must be signed');
}
if (upstreamCaptureFixture.approved_exact_command !== APPROVED_EXACT_COMMAND) {
  fail('upstream capture fixture approved_exact_command mismatch');
}
if (upstreamCaptureFixture.approved_exact_working_directory !== APPROVED_EXACT_WORKING_DIRECTORY) {
  fail('upstream capture fixture approved_exact_working_directory mismatch');
}

if (
  !Array.isArray(fixture.evidence_chain_commits) ||
  fixture.evidence_chain_commits.length !== 43
) {
  fail('fixture evidence_chain_commits must contain 43 commits');
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
  'Native Workflow Fixture Refreshed Pre-Run Guard Pass for Actual 30-Scenario Validation',
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
mustHave(wrapper, 'local refreshed pre-run guard pass only', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, 'exact approved actual 30-scenario command review', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(wrapper, 'refreshed_approval_capture_status is captured', 'wrapper mode');
mustHave(wrapper, 'refreshed_jason_signed_approval_status is signed', 'wrapper mode');
mustHave(
  wrapper,
  'future_command_status is ready_for_exact_approved_actual_30_scenario_command_review_only',
  'wrapper mode',
);
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, APPROVED_EXACT_COMMAND, 'wrapper must not execute approved command');

if (!isExecutable(wrapperPath)) {
  fail(`refreshed pre-run guard pass wrapper is not executable: ${wrapperPath}`);
}
passAssertion('refreshed_pre_run_guard_dry_run_wrapper_present_and_safe');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 66) {
  fail(`REQUIRED_ASSERTIONS must contain 66 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Refreshed Pre-Run Guard Pass for Actual 30-Scenario Validation verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);