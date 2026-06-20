#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_EXACT_APPROVAL_TEMPLATE.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_EXACT_APPROVAL_TEMPLATE_NO_GO_REVIEW.md';
const scaffoldingBuildDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_SCAFFOLDING_BUILD.md';
const preRunGuardDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_BUILD_RUNNER_PRE_RUN_GUARD.md';
const capturePacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_SIGNED_BUILD_RUNNER_APPROVAL.md';
const buildRunnerTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_APPROVAL_TO_BUILD_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER.md';
const runnerDesignDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_DESIGN.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/runner-execution-exact-approval-template.json';
const manifestPath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-manifest.json';
const upstreamScaffoldingBuildFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-scaffolding-build.json';
const upstreamPreRunGuardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/build-runner-pre-run-guard.json';
const upstreamCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-signed-build-runner-approval.json';
const buildRunnerTemplateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/exact-approval-to-build-actual-external-sandbox-30-scenario-runner.json';
const runnerDesignFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-design.json';
const runnerPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const wrapperPath =
  'scripts/run-native-workflow-fixture-runner-execution-exact-approval-template-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-runner-execution-exact-approval-template-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '145bf15';
const RUNNER_SCAFFOLDING_BUILD_COMMIT = '145bf15';
const BUILD_RUNNER_PRE_RUN_GUARD_COMMIT = '640df59';
const CAPTURE_SIGNED_BUILD_RUNNER_APPROVAL_COMMIT = '912b3aa';
const BUILD_RUNNER_TEMPLATE_COMMIT = '07421c8';
const RUNNER_DESIGN_COMMIT = '40d0d24';

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
  'runner_execution_approval_capture_status',
  'runner_execution_jason_signed_approval_status',
  'runner_execution_exact_values_required_count',
  'runner_execution_exact_values_accepted_count',
  'runner_execution_exact_values_approved_count',
  'runner_execution_approval_status',
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

const RUNNER_EXECUTION_TEMPLATE_CHECKS = [
  'Build 99-103 upstream packets referenced and runner scaffolding built_review_only',
  'runner command path exists executable and fail-closed',
  'manifest 30 scenarios all execution_status not_run and pass_fail_status not_captured',
  'runner execution approval not captured and not signed',
  'all 24 runner execution exact values remain not accepted and not approved',
  'no runner execution approved by this packet',
  'no external sandbox calls credentials test accounts production data or contact approved by this packet',
  'live activation real contact SMS email calls calendar booking and billing remain not_granted',
  'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing',
  'future_command_status blocked until runner execution exact approval captured',
];

const REQUIRED_APPROVAL_LANGUAGE = [
  'I, Jason Lohse, explicitly approve one-time runner execution for the exact scoped actual external/sandbox 30-scenario validation described below.',
  'This runner-execution approval does not approve live activation.',
  'This runner-execution approval does not approve production data access.',
  'This runner-execution approval does not approve production Supabase writes.',
  'This runner-execution approval does not approve schema/auth/RLS/security changes.',
  'This runner-execution approval does not approve real homeowner contact.',
  'This runner-execution approval does not approve real roofer contact.',
  'This runner-execution approval does not approve billing/payment/deposit/quote/estimate/invoice automation.',
  'This runner-execution approval does not approve production public routes/webhooks/schedulers/cron/dispatchers.',
  'No credential values may be logged.',
  'No production data may be touched.',
  'No real contact may occur.',
  'This runner-execution approval is one-time-use only.',
  'Any deviation from the exact values below requires new explicit Jason approval.',
  'Even if signed later, runner execution remains blocked until a separate execution pre-run guard passes.',
  'Signature:',
  'Timestamp:',
  'Expiration:',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_scaffolding_build_fixture_present',
  'manifest_fixture_present',
  'source_of_truth_commit_145bf15_referenced',
  'build_99_runner_design_packet_referenced',
  'build_100_build_runner_template_packet_referenced',
  'build_101_signed_build_runner_capture_packet_referenced',
  'build_102_build_runner_pre_run_guard_packet_referenced',
  'build_103_runner_scaffolding_build_packet_referenced',
  'runner_scaffolding_build_status_built_review_only',
  'runner_command_path_exists',
  'runner_command_path_executable',
  'runner_command_path_status_created_fail_closed_not_approved_to_run',
  'runner_fail_closed_sanity_check_status_blocked_exit_code_1',
  'manifest_path_exists',
  'total_manifest_scenarios_count_30',
  'all_manifest_scenarios_execution_status_not_run',
  'all_manifest_scenarios_pass_fail_status_not_captured',
  'runner_execution_approval_template_status_created_review_only',
  'runner_execution_approval_capture_status_not_captured',
  'runner_execution_jason_signed_approval_status_not_signed',
  'runner_execution_exact_values_required_count_24',
  'runner_execution_exact_values_accepted_count_0',
  'runner_execution_exact_values_approved_count_0',
  'runner_execution_approval_status_not_granted',
  'external_sandbox_calls_approval_status_not_granted',
  'credentials_access_approval_status_not_granted',
  'test_account_use_approval_status_not_granted',
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
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_missing_count_30',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'future_command_status_blocked_until_runner_execution_exact_approval_captured',
  'exact_command_paths_documented',
  'packet_does_not_run_runner',
  'packet_does_not_approve_anything',
  'packet_does_not_capture_approval',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_authorize_sms_email_calls_calendar_booking',
  'packet_does_not_contact_roofer_or_homeowner',
  'all_24_runner_execution_exact_values_not_approved_in_packet',
  'fixture_all_24_accepted_exact_values_blank',
  'fixture_all_24_approved_exact_values_blank',
  'template_labeled_runner_execution_template_only_not_signed_not_approved_do_not_execute',
  'template_all_24_exact_value_fields_present',
  'template_all_required_approval_language_present',
  'controlled_real_roofer_setup_remains_blocked',
  'runner_execution_template_checks_all_10_checks_present',
  'runner_execution_template_checks_all_10_checks_passed',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'runner_execution_approval_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_EXACT_APPROVAL_TEMPLATE.md',
  'NATIVE_WORKFLOW_FIXTURE_RUNNER_EXECUTION_EXACT_APPROVAL_TEMPLATE_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-runner-execution-exact-approval-template-dry-run.sh',
  'verify-native-workflow-fixture-runner-execution-exact-approval-template-readonly.js',
  'runner-execution-exact-approval-template.json',
  'Native Workflow Fixture Runner-Execution Exact Approval Template',
  'native workflow fixture runner execution exact approval template',
  'runner execution exact approval template',
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
read(scaffoldingBuildDocPath);
read(preRunGuardDocPath);
read(capturePacketDocPath);
read(buildRunnerTemplateDocPath);
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
passAssertion('source_of_truth_commit_145bf15_referenced');

mustHave(packetDoc, runnerDesignDocPath, 'packet doc');
mustHave(packetDoc, runnerDesignFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 99', 'packet doc');
passAssertion('build_99_runner_design_packet_referenced');

mustHave(packetDoc, buildRunnerTemplateDocPath, 'packet doc');
mustHave(packetDoc, buildRunnerTemplateFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 100', 'packet doc');
passAssertion('build_100_build_runner_template_packet_referenced');

mustHave(packetDoc, capturePacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamCaptureFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 101', 'packet doc');
passAssertion('build_101_signed_build_runner_capture_packet_referenced');

mustHave(packetDoc, preRunGuardDocPath, 'packet doc');
mustHave(packetDoc, upstreamPreRunGuardFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 102', 'packet doc');
passAssertion('build_102_build_runner_pre_run_guard_packet_referenced');

mustHave(packetDoc, scaffoldingBuildDocPath, 'packet doc');
mustHave(packetDoc, upstreamScaffoldingBuildFixturePath, 'packet doc');
mustHave(packetDoc, 'Build 103', 'packet doc');
passAssertion('build_103_runner_scaffolding_build_packet_referenced');

mustHave(packetDoc, 'runner_scaffolding_build_status | built_review_only', 'packet doc');
passAssertion('runner_scaffolding_build_status_built_review_only');

mustHave(packetDoc, `runner_command_path | ${EXACT_RUNNER_PATH}`, 'packet doc');
mustHave(packetDoc, 'runner_command_path_status | created_fail_closed_not_approved_to_run', 'packet doc');
mustHave(packetDoc, 'runner_fail_closed_sanity_check_status | blocked_exit_code_1', 'packet doc');
passAssertion('runner_command_path_status_created_fail_closed_not_approved_to_run');
passAssertion('runner_fail_closed_sanity_check_status_blocked_exit_code_1');

mustHave(packetDoc, `manifest_path | ${EXACT_MANIFEST_PATH}`, 'packet doc');
mustHave(packetDoc, 'total_manifest_scenarios_count | 30', 'packet doc');
mustHave(packetDoc, 'all_manifest_scenarios_execution_status | not_run', 'packet doc');
mustHave(packetDoc, 'all_manifest_scenarios_pass_fail_status | not_captured', 'packet doc');
passAssertion('total_manifest_scenarios_count_30');

mustHave(packetDoc, 'runner_execution_approval_template_status | created_review_only', 'packet doc');
mustHave(packetDoc, 'runner_execution_approval_capture_status | not_captured', 'packet doc');
mustHave(packetDoc, 'runner_execution_jason_signed_approval_status | not_signed', 'packet doc');
mustHave(packetDoc, 'runner_execution_exact_values_required_count | 24', 'packet doc');
mustHave(packetDoc, 'runner_execution_exact_values_accepted_count | 0', 'packet doc');
mustHave(packetDoc, 'runner_execution_exact_values_approved_count | 0', 'packet doc');
passAssertion('runner_execution_approval_template_status_created_review_only');
passAssertion('runner_execution_approval_capture_status_not_captured');
passAssertion('runner_execution_jason_signed_approval_status_not_signed');
passAssertion('runner_execution_exact_values_required_count_24');
passAssertion('runner_execution_exact_values_accepted_count_0');
passAssertion('runner_execution_exact_values_approved_count_0');

mustHave(packetDoc, 'runner_execution_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'external_sandbox_calls_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'credentials_access_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'test_account_use_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'production_data_access_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'production_supabase_write_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'schema_auth_rls_security_change_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'live_activation_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_homeowner_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_roofer_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'billing_payment_automation_approval_status | not_granted', 'packet doc');
passAssertion('runner_execution_approval_status_not_granted');
passAssertion('external_sandbox_calls_approval_status_not_granted');
passAssertion('credentials_access_approval_status_not_granted');
passAssertion('test_account_use_approval_status_not_granted');
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
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('runner_execution_status_not_run_by_this_packet');

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

mustHave(
  packetDoc,
  'future_command_status | blocked_until_runner_execution_exact_approval_captured',
  'packet doc',
);
passAssertion('future_command_status_blocked_until_runner_execution_exact_approval_captured');

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
mustHave(packetDoc, 'REFERENCE_DEFAULT_ONLY', 'packet doc exact scope');
passAssertion('exact_command_paths_documented');

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
passAssertion('all_24_runner_execution_exact_values_not_approved_in_packet');

mustHave(packetDoc, 'RUNNER EXECUTION TEMPLATE ONLY — NOT SIGNED — NOT APPROVED — DO NOT EXECUTE', 'packet doc');
mustHave(
  packetDoc,
  'runner_execution_approval_template_status | RUNNER_EXECUTION_TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE',
  'packet doc',
);
passAssertion('template_labeled_runner_execution_template_only_not_signed_not_approved_do_not_execute');

for (let i = 0; i < EXACT_VALUE_FIELDS.length; i += 1) {
  const field = EXACT_VALUE_FIELDS[i];
  const rowNum = i + 1;
  mustHave(packetDoc, `${rowNum}. ${field}:`, 'packet doc template');
}
passAssertion('template_all_24_exact_value_fields_present');

for (const line of REQUIRED_APPROVAL_LANGUAGE) {
  mustHave(packetDoc, line, 'packet doc template approval language');
}
passAssertion('template_all_required_approval_language_present');

mustHave(packetDoc, 'controlled real roofer setup remains blocked', 'packet doc');
passAssertion('controlled_real_roofer_setup_remains_blocked');

for (const check of RUNNER_EXECUTION_TEMPLATE_CHECKS) {
  mustHave(packetDoc, check, 'packet doc runner execution template checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc runner execution template check status');
}
passAssertion('runner_execution_template_checks_all_10_checks_present');
passAssertion('runner_execution_template_checks_all_10_checks_passed');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, upstreamScaffoldingBuildFixturePath))) {
  fail(`missing upstream scaffolding build fixture: ${upstreamScaffoldingBuildFixturePath}`);
}
passAssertion('upstream_scaffolding_build_fixture_present');

if (!fs.existsSync(path.join(root, manifestPath))) {
  fail(`missing manifest fixture: ${manifestPath}`);
}
passAssertion('manifest_fixture_present');
passAssertion('manifest_path_exists');

const fixture = readJson(fixturePath);
const upstreamScaffoldingBuildFixture = readJson(upstreamScaffoldingBuildFixturePath);
const manifest = readJson(manifestPath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 145bf15');
}
if (fixture.runner_scaffolding_build_status !== 'built_review_only') {
  fail('fixture runner_scaffolding_build_status must be built_review_only');
}
if (fixture.runner_command_path !== EXACT_RUNNER_PATH) {
  fail('fixture runner_command_path mismatch');
}
if (fixture.runner_command_path_status !== 'created_fail_closed_not_approved_to_run') {
  fail('fixture runner_command_path_status mismatch');
}
if (fixture.runner_fail_closed_sanity_check_status !== 'blocked_exit_code_1') {
  fail('fixture runner_fail_closed_sanity_check_status mismatch');
}
if (fixture.runner_execution_approval_template_status !== 'created_review_only') {
  fail('fixture runner_execution_approval_template_status mismatch');
}
if (fixture.runner_execution_approval_capture_status !== 'not_captured') {
  fail('fixture runner_execution_approval_capture_status must be not_captured');
}
if (fixture.runner_execution_jason_signed_approval_status !== 'not_signed') {
  fail('fixture runner_execution_jason_signed_approval_status must be not_signed');
}
if (fixture.runner_execution_exact_values_required_count !== 24) {
  fail('fixture runner_execution_exact_values_required_count must be 24');
}
if (fixture.runner_execution_exact_values_accepted_count !== 0) {
  fail('fixture runner_execution_exact_values_accepted_count must be 0');
}
if (fixture.runner_execution_exact_values_approved_count !== 0) {
  fail('fixture runner_execution_exact_values_approved_count must be 0');
}
if (fixture.runner_execution_approval_status !== 'not_granted') {
  fail('fixture runner_execution_approval_status must be not_granted');
}
if (fixture.external_sandbox_calls_approval_status !== 'not_granted') {
  fail('fixture external_sandbox_calls_approval_status must be not_granted');
}
if (fixture.credentials_access_approval_status !== 'not_granted') {
  fail('fixture credentials_access_approval_status must be not_granted');
}
if (fixture.test_account_use_approval_status !== 'not_granted') {
  fail('fixture test_account_use_approval_status must be not_granted');
}
if (fixture.production_data_access_approval_status !== 'not_granted') {
  fail('fixture production_data_access_approval_status must be not_granted');
}
if (fixture.future_command_status !== 'blocked_until_runner_execution_exact_approval_captured') {
  fail('fixture future_command_status mismatch');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
}
if (fixture.runner_execution_status !== 'not_run_by_this_packet') {
  fail('fixture runner_execution_status must be not_run_by_this_packet');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
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
if (fixture.sms_email_calls_calendar_booking_approval_status !== 'not_granted') {
  fail('fixture sms_email_calls_calendar_booking_approval_status must be not_granted');
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
  fixture.runner_execution_approval_template.status !==
  'RUNNER_EXECUTION_TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE'
) {
  fail('fixture runner_execution_approval_template.status mismatch');
}
if (fixture.runner_execution_approval_template.signed !== false) {
  fail('fixture runner_execution_approval_template.signed must be false');
}
if (fixture.runner_execution_approval_template.approved !== false) {
  fail('fixture runner_execution_approval_template.approved must be false');
}
if (fixture.runner_execution_approval_template.captured !== false) {
  fail('fixture runner_execution_approval_template.captured must be false');
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
passAssertion('fixture_all_24_accepted_exact_values_blank');
passAssertion('fixture_all_24_approved_exact_values_blank');

if (
  !Array.isArray(fixture.runner_execution_approval_template_checks) ||
  fixture.runner_execution_approval_template_checks.length !== 10
) {
  fail('fixture runner_execution_approval_template_checks must contain 10 checks');
}
for (let i = 0; i < RUNNER_EXECUTION_TEMPLATE_CHECKS.length; i += 1) {
  const check = fixture.runner_execution_approval_template_checks[i];
  if (check.check !== i + 1) {
    fail(`fixture runner_execution_approval_template_checks[${i}].check must be ${i + 1}`);
  }
  if (check.name !== RUNNER_EXECUTION_TEMPLATE_CHECKS[i]) {
    fail(`fixture runner_execution_approval_template_checks[${i}].name mismatch`);
  }
  if (check.status !== 'passed') {
    fail(`fixture runner_execution_approval_template_checks[${i}].status must be passed`);
  }
}

if (upstreamScaffoldingBuildFixture.runner_scaffolding_build_status !== 'built_review_only') {
  fail('upstream scaffolding build fixture runner_scaffolding_build_status must be built_review_only');
}
if (upstreamScaffoldingBuildFixture.runner_command_path_status !== 'created_fail_closed_not_approved_to_run') {
  fail('upstream scaffolding build fixture runner_command_path_status mismatch');
}

if (manifest.total_manifest_scenarios_count !== 30) {
  fail('manifest total_manifest_scenarios_count must be 30');
}
if (!Array.isArray(manifest.scenarios) || manifest.scenarios.length !== 30) {
  fail('manifest scenarios array must contain exactly 30 scenarios');
}
for (const scenario of manifest.scenarios) {
  if (scenario.execution_status !== 'not_run') {
    fail(`manifest scenario ${scenario.scenario_id || 'unknown'} execution_status must be not_run`);
  }
  if (scenario.pass_fail_status !== 'not_captured') {
    fail(`manifest scenario ${scenario.scenario_id || 'unknown'} pass_fail_status must be not_captured`);
  }
}
passAssertion('all_manifest_scenarios_execution_status_not_run');
passAssertion('all_manifest_scenarios_pass_fail_status_not_captured');

passAssertion('structured_fixture_valid_json');

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
mustHave(runnerScript, 'created_fail_closed_not_approved_to_run', 'runner script');

try {
  execSync(`bash ${runnerPath}`, { cwd: root, stdio: 'pipe' });
  fail('runner fail-closed sanity check must exit non-zero');
} catch (error) {
  if (!error.status || error.status !== 1) {
    fail(`runner fail-closed sanity check must exit 1 (got ${error.status})`);
  }
}

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
  'Native Workflow Fixture Runner-Execution Exact Approval Template',
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
mustHave(wrapper, 'local runner-execution approval-template only', 'wrapper mode');
mustHave(wrapper, 'not signed', 'wrapper mode');
mustHave(wrapper, 'not approved', 'wrapper mode');
mustHave(wrapper, 'not runner execution', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'runner_execution_approval_capture_status is not_captured', 'wrapper mode');
mustHave(wrapper, 'runner_execution_jason_signed_approval_status is not_signed', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(
  wrapper,
  'future_command_status is blocked_until_runner_execution_exact_approval_captured',
  'wrapper mode',
);
mustHave(wrapper, 'Jason review/sign exact runner-execution approval template', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, `bash ${runnerPath}`, 'wrapper must not invoke runner');
mustHave(
  wrapper,
  'does NOT invoke scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh',
  'wrapper',
);

if (!isExecutable(wrapperPath)) {
  fail(`runner execution approval dry-run wrapper is not executable: ${wrapperPath}`);
}
passAssertion('runner_execution_approval_dry_run_wrapper_present_and_safe');
passAssertion('wrapper_does_not_invoke_runner');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 81) {
  fail(`REQUIRED_ASSERTIONS must contain 81 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Runner-Execution Exact Approval Template verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);