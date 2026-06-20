#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_APPROVAL_TO_BUILD_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_APPROVAL_TO_BUILD_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_NO_GO_REVIEW.md';
const runnerDesignDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_DESIGN.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/exact-approval-to-build-actual-external-sandbox-30-scenario-runner.json';
const runnerDesignFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-design.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-exact-approval-to-build-actual-external-sandbox-30-scenario-runner-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-exact-approval-to-build-actual-external-sandbox-30-scenario-runner-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '40d0d24';
const RUNNER_DESIGN_COMMIT = '40d0d24';
const PROPOSED_FUTURE_COMMAND =
  'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const PROPOSED_WORKING_DIRECTORY = '/root/roofleadhq';
const PROPOSED_EVIDENCE_LOG_PATH =
  'logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log';
const PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json';

const EXACT_VALUE_FIELDS = [
  'exact_runner_scaffolding_scope',
  'exact_scenario_groups_specification',
  'exact_environment',
  'exact_build_command',
  'exact_working_directory',
  'exact_proposed_future_command_path',
  'exact_proposed_evidence_log_path',
  'exact_proposed_structured_evidence_output_path',
  'exact_credentials_env_api_webhook_boundary',
  'exact_external_call_boundary',
  'exact_production_data_boundary',
  'exact_schema_auth_rls_security_boundary',
  'exact_public_route_webhook_scheduler_cron_dispatcher_boundary',
  'exact_messaging_contact_permission_boundary',
  'exact_runner_execution_boundary',
  'exact_stop_conditions',
  'exact_rollback_owner',
  'exact_approval_expiration',
  'exact_one_time_use_limitation',
];

const BUILD_RUNNER_TEMPLATE_CHECKS = [
  'Build 99 design packet referenced and prior proposed runner status design_only_not_built_not_approved_not_run',
  'current runner gap and different_runner_required true',
  'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing',
  'build runner approval not captured and not signed',
  'all 19 build runner exact values remain not accepted and not approved',
  'no runner execution approved by this packet',
  'no external calls credentials production data or contact approved',
  'live activation and real contact blocks remain not_granted',
  'controlled real roofer setup remains blocked',
  'future_command_status blocked until build runner exact approval captured',
];

const REQUIRED_APPROVAL_LANGUAGE = [
  'I, Jason Lohse, explicitly approve building the exact scoped actual external/sandbox 30-scenario validation runner scaffolding described below.',
  'This build-runner approval is for actual external/sandbox 30-scenario runner scaffolding only.',
  'This build-runner approval does not approve running the runner.',
  'This build-runner approval does not approve making external calls.',
  'This build-runner approval does not approve accessing credentials.',
  'This build-runner approval does not approve contacting real homeowners.',
  'This build-runner approval does not approve contacting real roofers.',
  'This build-runner approval does not approve using production data.',
  'This build-runner approval does not approve live activation.',
  'This build-runner approval does not approve billing/payment/deposit/invoice/quote/estimate automation.',
  'This build-runner approval is one-time-use only.',
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
  'upstream_runner_design_fixture_present',
  'source_of_truth_commit_40d0d24_referenced',
  'build_99_runner_design_packet_referenced',
  'current_runner_gap_status_existing_wrapper_is_local_only_not_actual_external_sandbox_runner',
  'different_runner_required_true',
  'prior_proposed_runner_status_design_only_not_built_not_approved_not_run',
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_missing_count_30',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'build_runner_approval_capture_status_not_captured',
  'build_runner_jason_signed_approval_status_not_signed',
  'build_runner_exact_values_required_count_19',
  'build_runner_exact_values_accepted_count_0',
  'build_runner_exact_values_approved_count_0',
  'runner_execution_approval_status_not_granted',
  'external_calls_approval_status_not_granted',
  'credentials_access_approval_status_not_granted',
  'production_data_access_approval_status_not_granted',
  'future_command_status_blocked_until_build_runner_exact_approval_captured',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'proposed_paths_present_as_reference_defaults_only',
  'live_activation_approval_status_not_granted',
  'real_homeowner_contact_approval_status_not_granted',
  'real_roofer_contact_approval_status_not_granted',
  'production_supabase_write_approval_status_not_granted',
  'schema_auth_rls_security_change_approval_status_not_granted',
  'billing_payment_automation_approval_status_not_granted',
  'external_calls_allowed_by_this_packet_false',
  'credentials_access_allowed_by_this_packet_false',
  'production_data_access_allowed_by_this_packet_false',
  'sms_email_calls_calendar_booking_allowed_by_this_packet_false',
  'external_calls_made_false',
  'credentials_accessed_false',
  'production_data_accessed_false',
  'sms_email_calls_calendar_booking_performed_false',
  'packet_does_not_build_runner',
  'packet_does_not_run_runner',
  'packet_does_not_approve_anything',
  'packet_does_not_capture_approval',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_authorize_sms_email_calls_calendar_booking',
  'packet_does_not_contact_roofer_or_homeowner',
  'all_19_build_runner_exact_values_not_approved_in_packet',
  'fixture_all_19_accepted_exact_values_blank',
  'fixture_all_19_approved_exact_values_blank',
  'template_labeled_build_runner_template_only_not_signed_not_approved_do_not_execute',
  'template_all_19_exact_value_fields_present',
  'template_all_required_approval_language_present',
  'controlled_real_roofer_setup_remains_blocked',
  'build_runner_template_checks_all_10_checks_present',
  'build_runner_template_checks_all_10_checks_passed',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'build_runner_approval_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_EXACT_APPROVAL_TO_BUILD_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER.md',
  'NATIVE_WORKFLOW_FIXTURE_EXACT_APPROVAL_TO_BUILD_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-exact-approval-to-build-actual-external-sandbox-30-scenario-runner-dry-run.sh',
  'verify-native-workflow-fixture-exact-approval-to-build-actual-external-sandbox-30-scenario-runner-readonly.js',
  'exact-approval-to-build-actual-external-sandbox-30-scenario-runner.json',
  'Native Workflow Fixture Exact Approval to Build Actual External/Sandbox 30-Scenario Runner',
  'native workflow fixture exact approval to build actual external sandbox 30 scenario runner',
  'exact approval to build actual external sandbox 30 scenario runner',
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
read(runnerDesignDocPath);
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
passAssertion('source_of_truth_commit_40d0d24_referenced');

mustHave(packetDoc, runnerDesignDocPath, 'packet doc');
mustHave(packetDoc, runnerDesignFixturePath, 'packet doc');
mustHave(packetDoc, 'actual-external-sandbox-30-scenario-runner-design', 'packet doc');
mustHave(packetDoc, 'Build 99', 'packet doc');
passAssertion('build_99_runner_design_packet_referenced');

mustHave(
  packetDoc,
  'current_runner_gap_status | existing_wrapper_is_local_only_not_actual_external_sandbox_runner',
  'packet doc',
);
passAssertion('current_runner_gap_status_existing_wrapper_is_local_only_not_actual_external_sandbox_runner');

mustHave(packetDoc, 'different_runner_required | true', 'packet doc');
passAssertion('different_runner_required_true');

mustHave(packetDoc, 'prior_proposed_runner_status | design_only_not_built_not_approved_not_run', 'packet doc');
passAssertion('prior_proposed_runner_status_design_only_not_built_not_approved_not_run');

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

mustHave(packetDoc, 'build_runner_approval_capture_status | not_captured', 'packet doc');
mustHave(packetDoc, 'build_runner_jason_signed_approval_status | not_signed', 'packet doc');
mustHave(packetDoc, 'build_runner_exact_values_required_count | 19', 'packet doc');
mustHave(packetDoc, 'build_runner_exact_values_accepted_count | 0', 'packet doc');
mustHave(packetDoc, 'build_runner_exact_values_approved_count | 0', 'packet doc');
passAssertion('build_runner_approval_capture_status_not_captured');
passAssertion('build_runner_jason_signed_approval_status_not_signed');
passAssertion('build_runner_exact_values_required_count_19');
passAssertion('build_runner_exact_values_accepted_count_0');
passAssertion('build_runner_exact_values_approved_count_0');

mustHave(packetDoc, 'runner_execution_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'external_calls_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'credentials_access_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'production_data_access_approval_status | not_granted', 'packet doc');
passAssertion('runner_execution_approval_status_not_granted');
passAssertion('external_calls_approval_status_not_granted');
passAssertion('credentials_access_approval_status_not_granted');
passAssertion('production_data_access_approval_status_not_granted');

mustHave(
  packetDoc,
  'future_command_status | blocked_until_build_runner_exact_approval_captured',
  'packet doc',
);
mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
passAssertion('future_command_status_blocked_until_build_runner_exact_approval_captured');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');

mustHave(packetDoc, `proposed_future_command | ${PROPOSED_FUTURE_COMMAND}`, 'packet doc');
mustHave(packetDoc, 'REFERENCE_DEFAULT_ONLY', 'packet doc proposed paths');
mustHave(packetDoc, `proposed_working_directory | ${PROPOSED_WORKING_DIRECTORY}`, 'packet doc');
mustHave(packetDoc, `proposed_evidence_log_path | ${PROPOSED_EVIDENCE_LOG_PATH}`, 'packet doc');
mustHave(
  packetDoc,
  `proposed_structured_evidence_output_path | ${PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH}`,
  'packet doc',
);
mustHave(packetDoc, 'reference defaults only', 'packet doc');
passAssertion('proposed_paths_present_as_reference_defaults_only');

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
passAssertion('live_activation_approval_status_not_granted');
passAssertion('real_homeowner_contact_approval_status_not_granted');
passAssertion('real_roofer_contact_approval_status_not_granted');
passAssertion('production_supabase_write_approval_status_not_granted');
passAssertion('schema_auth_rls_security_change_approval_status_not_granted');
passAssertion('billing_payment_automation_approval_status_not_granted');

mustHave(packetDoc, 'external_calls_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'credentials_access_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'production_data_access_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'external_calls_made | false', 'packet doc');
mustHave(packetDoc, 'credentials_accessed | false', 'packet doc');
mustHave(packetDoc, 'production_data_accessed | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_performed | false', 'packet doc');
passAssertion('external_calls_allowed_by_this_packet_false');
passAssertion('credentials_access_allowed_by_this_packet_false');
passAssertion('production_data_access_allowed_by_this_packet_false');
passAssertion('sms_email_calls_calendar_booking_allowed_by_this_packet_false');
passAssertion('external_calls_made_false');
passAssertion('credentials_accessed_false');
passAssertion('production_data_accessed_false');
passAssertion('sms_email_calls_calendar_booking_performed_false');

mustHave(packetDoc, 'This packet **does not** build the actual external/sandbox 30-scenario validation runner', 'packet doc');
passAssertion('packet_does_not_build_runner');
mustHave(packetDoc, 'This packet **does not** run the actual external/sandbox 30-scenario validation runner', 'packet doc');
passAssertion('packet_does_not_run_runner');
mustHave(packetDoc, 'This packet **does not** approve anything', 'packet doc');
passAssertion('packet_does_not_approve_anything');
mustHave(packetDoc, 'This packet **does not** capture a new signed approval', 'packet doc');
passAssertion('packet_does_not_capture_approval');
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
passAssertion('packet_does_not_authorize_sms_email_calls_calendar_booking');
mustHave(packetDoc, 'This packet **does not** contact any real roofer or homeowner', 'packet doc');
passAssertion('packet_does_not_contact_roofer_or_homeowner');

for (const field of EXACT_VALUE_FIELDS) {
  mustHave(packetDoc, `| ${field} | false | false | not_approved |`, 'packet doc exact values');
}
passAssertion('all_19_build_runner_exact_values_not_approved_in_packet');

mustHave(packetDoc, 'BUILD RUNNER TEMPLATE ONLY — NOT SIGNED — NOT APPROVED — DO NOT EXECUTE', 'packet doc');
mustHave(
  packetDoc,
  'build_runner_approval_template_status | BUILD_RUNNER_TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE',
  'packet doc',
);
passAssertion('template_labeled_build_runner_template_only_not_signed_not_approved_do_not_execute');

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

for (const check of BUILD_RUNNER_TEMPLATE_CHECKS) {
  mustHave(packetDoc, check, 'packet doc build runner template checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc build runner template check status');
}
passAssertion('build_runner_template_checks_all_10_checks_present');
passAssertion('build_runner_template_checks_all_10_checks_passed');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, runnerDesignFixturePath))) {
  fail(`missing upstream runner design fixture: ${runnerDesignFixturePath}`);
}
passAssertion('upstream_runner_design_fixture_present');

const fixture = readJson(fixturePath);
const upstreamRunnerDesignFixture = readJson(runnerDesignFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 40d0d24');
}
if (fixture.runner_design_commit !== RUNNER_DESIGN_COMMIT) {
  fail('fixture runner_design_commit must be 40d0d24');
}
if (fixture.current_runner_gap_status !== 'existing_wrapper_is_local_only_not_actual_external_sandbox_runner') {
  fail('fixture current_runner_gap_status mismatch');
}
if (fixture.different_runner_required !== true) {
  fail('fixture different_runner_required must be true');
}
if (fixture.prior_proposed_runner_status !== 'design_only_not_built_not_approved_not_run') {
  fail('fixture prior_proposed_runner_status mismatch');
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
if (fixture.build_runner_approval_capture_status !== 'not_captured') {
  fail('fixture build_runner_approval_capture_status must be not_captured');
}
if (fixture.build_runner_jason_signed_approval_status !== 'not_signed') {
  fail('fixture build_runner_jason_signed_approval_status must be not_signed');
}
if (fixture.build_runner_exact_values_required_count !== 19) {
  fail('fixture build_runner_exact_values_required_count must be 19');
}
if (fixture.build_runner_exact_values_accepted_count !== 0) {
  fail('fixture build_runner_exact_values_accepted_count must be 0');
}
if (fixture.build_runner_exact_values_approved_count !== 0) {
  fail('fixture build_runner_exact_values_approved_count must be 0');
}
if (fixture.runner_execution_approval_status !== 'not_granted') {
  fail('fixture runner_execution_approval_status must be not_granted');
}
if (fixture.external_calls_approval_status !== 'not_granted') {
  fail('fixture external_calls_approval_status must be not_granted');
}
if (fixture.credentials_access_approval_status !== 'not_granted') {
  fail('fixture credentials_access_approval_status must be not_granted');
}
if (fixture.production_data_access_approval_status !== 'not_granted') {
  fail('fixture production_data_access_approval_status must be not_granted');
}
if (fixture.future_command_status !== 'blocked_until_build_runner_exact_approval_captured') {
  fail('fixture future_command_status mismatch');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (fixture.proposed_future_command !== PROPOSED_FUTURE_COMMAND) {
  fail('fixture proposed_future_command mismatch');
}
if (fixture.proposed_working_directory !== PROPOSED_WORKING_DIRECTORY) {
  fail('fixture proposed_working_directory mismatch');
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
if (fixture.demo_ready_with_live_automation_disabled !== 'preserved') {
  fail('fixture demo_ready_with_live_automation_disabled must be preserved');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}
if (
  fixture.build_runner_approval_template.status !==
  'BUILD_RUNNER_TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE'
) {
  fail('fixture build_runner_approval_template.status mismatch');
}
if (fixture.build_runner_approval_template.signed !== false) {
  fail('fixture build_runner_approval_template.signed must be false');
}
if (fixture.build_runner_approval_template.approved !== false) {
  fail('fixture build_runner_approval_template.approved must be false');
}
if (fixture.build_runner_approval_template.captured !== false) {
  fail('fixture build_runner_approval_template.captured must be false');
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
  !Array.isArray(fixture.build_runner_approval_template_checks) ||
  fixture.build_runner_approval_template_checks.length !== 10
) {
  fail('fixture build_runner_approval_template_checks must contain 10 checks');
}
for (let i = 0; i < BUILD_RUNNER_TEMPLATE_CHECKS.length; i += 1) {
  const check = fixture.build_runner_approval_template_checks[i];
  if (check.check !== i + 1) {
    fail(`fixture build_runner_approval_template_checks[${i}].check must be ${i + 1}`);
  }
  if (check.name !== BUILD_RUNNER_TEMPLATE_CHECKS[i]) {
    fail(`fixture build_runner_approval_template_checks[${i}].name mismatch`);
  }
  if (check.status !== 'passed') {
    fail(`fixture build_runner_approval_template_checks[${i}].status must be passed`);
  }
}

if (upstreamRunnerDesignFixture.source_of_truth_commit !== '0150699') {
  fail('upstream runner design fixture source_of_truth_commit must be 0150699');
}
if (upstreamRunnerDesignFixture.proposed_runner_status !== 'design_only_not_built_not_approved_not_run') {
  fail('upstream runner design fixture proposed_runner_status mismatch');
}
if (upstreamRunnerDesignFixture.different_runner_required !== true) {
  fail('upstream runner design fixture different_runner_required must be true');
}
if (upstreamRunnerDesignFixture.actual_30_scenario_external_validation_captured_count !== 0) {
  fail('upstream runner design fixture actual_30_scenario_external_validation_captured_count must be 0');
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
  'Native Workflow Fixture Exact Approval to Build Actual External/Sandbox 30-Scenario Runner',
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
mustHave(wrapper, 'local approval-template only', 'wrapper mode');
mustHave(wrapper, 'not approval', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'build runner approval is not captured and not signed', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(
  wrapper,
  'future_command_status is blocked_until_build_runner_exact_approval_captured',
  'wrapper mode',
);
mustHave(wrapper, 'Jason review/sign exact build-runner approval', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, PROPOSED_FUTURE_COMMAND.replace('bash ', ''), 'wrapper must not execute proposed future command');

if (!isExecutable(wrapperPath)) {
  fail(`build runner approval dry-run wrapper is not executable: ${wrapperPath}`);
}
passAssertion('build_runner_approval_dry_run_wrapper_present_and_safe');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 74) {
  fail(`REQUIRED_ASSERTIONS must contain 74 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Exact Approval to Build Actual External/Sandbox 30-Scenario Runner verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);