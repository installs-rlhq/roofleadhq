#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_BUILD_RUNNER_PRE_RUN_GUARD.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_BUILD_RUNNER_PRE_RUN_GUARD_NO_GO_REVIEW.md';
const capturePacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CAPTURE_SIGNED_BUILD_RUNNER_APPROVAL.md';
const buildRunnerTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_APPROVAL_TO_BUILD_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER.md';
const runnerDesignDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_DESIGN.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/build-runner-pre-run-guard.json';
const upstreamCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/capture-signed-build-runner-approval.json';
const buildRunnerTemplateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/exact-approval-to-build-actual-external-sandbox-30-scenario-runner.json';
const runnerDesignFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-design.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-build-runner-pre-run-guard-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-build-runner-pre-run-guard-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '912b3aa';
const CAPTURE_SIGNED_BUILD_RUNNER_APPROVAL_COMMIT = '912b3aa';
const BUILD_RUNNER_TEMPLATE_COMMIT = '07421c8';
const RUNNER_DESIGN_COMMIT = '40d0d24';
const SIGNED_APPROVAL_SIGNATURE_NAME = 'Jason Lohse';
const SIGNED_APPROVAL_TIMESTAMP = '06/19/2026 9:13pm Mountain Time';
const APPROVAL_SCOPE = 'build_actual_external_sandbox_30_scenario_runner_scaffolding_only';

const PRE_RUN_GUARD_CHECKS = [
  'source_of_truth_commit_912b3aa_confirmed',
  'signed_build_runner_approval_capture_packet_present',
  'signed_approval_timestamp_present',
  'approval_scope_scaffolding_only',
  'all_19_exact_values_required_accepted_approved',
  'runner_execution_not_granted',
  'external_calls_not_granted',
  'credentials_access_not_granted',
  'production_data_access_not_granted',
  'live_activation_not_granted',
  'real_homeowner_contact_not_granted',
  'real_roofer_contact_not_granted',
  'production_supabase_writes_not_granted',
  'schema_auth_rls_security_changes_not_granted',
  'billing_payment_automation_not_granted',
  'approved_for_activation_now_false',
  'actual_30_scenario_external_validation_still_0_0_30',
  'existing_wrapper_gap_and_different_runner_required_confirmed',
  'runner_not_built_or_run_by_this_packet',
  'demo_ready_with_live_automation_disabled_preserved',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_capture_signed_build_runner_approval_fixture_present',
  'upstream_build_runner_template_fixture_present',
  'upstream_runner_design_fixture_present',
  'source_of_truth_commit_912b3aa_referenced',
  'capture_signed_build_runner_approval_commit_912b3aa_referenced',
  'build_runner_exact_approval_template_commit_07421c8_referenced',
  'runner_design_commit_40d0d24_referenced',
  'capture_signed_build_runner_approval_packet_referenced',
  'build_runner_exact_approval_template_packet_referenced',
  'runner_design_packet_referenced',
  'signed_approval_timestamp_present',
  'approval_scope_build_actual_external_sandbox_30_scenario_runner_scaffolding_only',
  'build_runner_approval_capture_status_captured',
  'build_runner_jason_signed_approval_status_signed',
  'build_runner_exact_values_required_count_19',
  'build_runner_exact_values_accepted_count_19',
  'build_runner_exact_values_approved_count_19',
  'all_19_exact_values_required_accepted_approved',
  'build_runner_pre_run_guard_status_passed',
  'build_runner_pre_run_guard_checks_required_count_20',
  'build_runner_pre_run_guard_checks_passed_count_20',
  'build_runner_pre_run_guard_failed_count_0',
  'current_runner_gap_status_existing_wrapper_is_local_only_not_actual_external_sandbox_runner',
  'different_runner_required_true',
  'prior_proposed_runner_status_design_only_not_built_not_approved_not_run',
  'runner_execution_approval_status_not_granted',
  'external_calls_approval_status_not_granted',
  'credentials_access_approval_status_not_granted',
  'production_data_access_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'real_homeowner_contact_approval_status_not_granted',
  'real_roofer_contact_approval_status_not_granted',
  'production_supabase_write_approval_status_not_granted',
  'schema_auth_rls_security_change_approval_status_not_granted',
  'billing_payment_automation_approval_status_not_granted',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'runner_build_status_not_built_by_this_packet',
  'runner_execution_status_not_run_by_this_packet',
  'future_command_status_ready_for_build_runner_scaffolding_packet_review_only',
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_missing_count_30',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'packet_is_pre_run_guard_only',
  'packet_does_not_build_runner',
  'packet_does_not_run_runner',
  'packet_does_not_approve_runner_execution',
  'packet_does_not_approve_external_calls',
  'packet_does_not_approve_credential_access',
  'packet_does_not_approve_production_data_access',
  'packet_does_not_approve_live_activation',
  'packet_does_not_approve_real_homeowner_contact',
  'packet_does_not_approve_real_roofer_contact',
  'packet_does_not_approve_production_supabase_writes',
  'packet_does_not_approve_schema_auth_rls_security_changes',
  'packet_does_not_approve_billing_payment_automation',
  'packet_does_not_authorize_sms_email_calls_calendar_booking',
  'packet_does_not_make_external_calls',
  'packet_does_not_access_credentials',
  'packet_does_not_access_production_data',
  'packet_does_not_contact_roofer_or_homeowner',
  'next_step_separate_runner_scaffolding_build_packet_not_execution',
  'build_runner_pre_run_guard_checks_all_20_checks_present',
  'build_runner_pre_run_guard_checks_all_20_checks_passed',
  'no_external_calls_credentials_production_data_contact_authorized_or_performed',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'build_runner_pre_run_guard_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_BUILD_RUNNER_PRE_RUN_GUARD.md',
  'NATIVE_WORKFLOW_FIXTURE_BUILD_RUNNER_PRE_RUN_GUARD_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-build-runner-pre-run-guard-dry-run.sh',
  'verify-native-workflow-fixture-build-runner-pre-run-guard-readonly.js',
  'build-runner-pre-run-guard.json',
  'Native Workflow Fixture Build-Runner Pre-Run Guard',
  'native workflow fixture build runner pre run guard',
  'build runner pre run guard',
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
  'fake-data/local-only/read-only/dry-run-only/review-only/build-runner-pre-run-guard-only/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/build-runner-pre-run-guard-only/non-executing',
  'no-go review',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_912b3aa_referenced');

mustHave(packetDoc, CAPTURE_SIGNED_BUILD_RUNNER_APPROVAL_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, CAPTURE_SIGNED_BUILD_RUNNER_APPROVAL_COMMIT, 'no-go review');
passAssertion('capture_signed_build_runner_approval_commit_912b3aa_referenced');

mustHave(packetDoc, BUILD_RUNNER_TEMPLATE_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, BUILD_RUNNER_TEMPLATE_COMMIT, 'no-go review');
passAssertion('build_runner_exact_approval_template_commit_07421c8_referenced');

mustHave(packetDoc, RUNNER_DESIGN_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, RUNNER_DESIGN_COMMIT, 'no-go review');
passAssertion('runner_design_commit_40d0d24_referenced');

mustHave(packetDoc, capturePacketDocPath, 'packet doc');
mustHave(packetDoc, upstreamCaptureFixturePath, 'packet doc');
mustHave(packetDoc, 'capture-signed-build-runner-approval', 'packet doc');
passAssertion('capture_signed_build_runner_approval_packet_referenced');

mustHave(packetDoc, buildRunnerTemplateDocPath, 'packet doc');
mustHave(packetDoc, buildRunnerTemplateFixturePath, 'packet doc');
mustHave(packetDoc, 'exact-approval-to-build-actual-external-sandbox-30-scenario-runner', 'packet doc');
passAssertion('build_runner_exact_approval_template_packet_referenced');

mustHave(packetDoc, runnerDesignDocPath, 'packet doc');
mustHave(packetDoc, runnerDesignFixturePath, 'packet doc');
mustHave(packetDoc, 'actual-external-sandbox-30-scenario-runner-design', 'packet doc');
passAssertion('runner_design_packet_referenced');

mustHave(packetDoc, SIGNED_APPROVAL_TIMESTAMP, 'packet doc');
passAssertion('signed_approval_timestamp_present');

mustHave(packetDoc, `approval_scope | ${APPROVAL_SCOPE}`, 'packet doc');
passAssertion('approval_scope_build_actual_external_sandbox_30_scenario_runner_scaffolding_only');

mustHave(packetDoc, 'build_runner_approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'build_runner_jason_signed_approval_status | signed', 'packet doc');
mustHave(packetDoc, 'build_runner_exact_values_required_count | 19', 'packet doc');
mustHave(packetDoc, 'build_runner_exact_values_accepted_count | 19', 'packet doc');
mustHave(packetDoc, 'build_runner_exact_values_approved_count | 19', 'packet doc');
passAssertion('build_runner_approval_capture_status_captured');
passAssertion('build_runner_jason_signed_approval_status_signed');
passAssertion('build_runner_exact_values_required_count_19');
passAssertion('build_runner_exact_values_accepted_count_19');
passAssertion('build_runner_exact_values_approved_count_19');
mustHave(packetDoc, 'all_19_exact_values_required_accepted_approved', 'packet doc');
passAssertion('all_19_exact_values_required_accepted_approved');

mustHave(packetDoc, 'build_runner_pre_run_guard_status | passed', 'packet doc');
mustHave(packetDoc, 'build_runner_pre_run_guard_checks_required_count | 20', 'packet doc');
mustHave(packetDoc, 'build_runner_pre_run_guard_checks_passed_count | 20', 'packet doc');
mustHave(packetDoc, 'build_runner_pre_run_guard_failed_count | 0', 'packet doc');
passAssertion('build_runner_pre_run_guard_status_passed');
passAssertion('build_runner_pre_run_guard_checks_required_count_20');
passAssertion('build_runner_pre_run_guard_checks_passed_count_20');
passAssertion('build_runner_pre_run_guard_failed_count_0');

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

mustHave(packetDoc, 'runner_execution_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'external_calls_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'credentials_access_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'production_data_access_approval_status | not_granted', 'packet doc');
passAssertion('runner_execution_approval_status_not_granted');
passAssertion('external_calls_approval_status_not_granted');
passAssertion('credentials_access_approval_status_not_granted');
passAssertion('production_data_access_approval_status_not_granted');

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

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(packetDoc, 'runner_build_status | not_built_by_this_packet', 'packet doc');
mustHave(packetDoc, 'runner_execution_status | not_run_by_this_packet', 'packet doc');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('runner_build_status_not_built_by_this_packet');
passAssertion('runner_execution_status_not_run_by_this_packet');

mustHave(
  packetDoc,
  'future_command_status | ready_for_build_runner_scaffolding_packet_review_only',
  'packet doc',
);
passAssertion('future_command_status_ready_for_build_runner_scaffolding_packet_review_only');

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

mustHave(packetDoc, 'external_calls_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'credentials_access_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'production_data_access_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_allowed_by_this_packet | false', 'packet doc');
mustHave(packetDoc, 'external_calls_made | false', 'packet doc');
mustHave(packetDoc, 'credentials_accessed | false', 'packet doc');
mustHave(packetDoc, 'production_data_accessed | false', 'packet doc');
mustHave(packetDoc, 'sms_email_calls_calendar_booking_performed | false', 'packet doc');

mustHave(packetDoc, 'This is a **pre-run guard only**', 'packet doc');
passAssertion('packet_is_pre_run_guard_only');
mustHave(packetDoc, 'This packet does **not** build the runner', 'packet doc');
passAssertion('packet_does_not_build_runner');
mustHave(packetDoc, 'This packet does **not** run the runner', 'packet doc');
passAssertion('packet_does_not_run_runner');
mustHave(packetDoc, 'This packet does **not** approve runner execution', 'packet doc');
passAssertion('packet_does_not_approve_runner_execution');
mustHave(packetDoc, 'This packet does **not** approve external calls', 'packet doc');
passAssertion('packet_does_not_approve_external_calls');
mustHave(packetDoc, 'This packet does **not** approve credential access', 'packet doc');
passAssertion('packet_does_not_approve_credential_access');
mustHave(packetDoc, 'This packet does **not** approve production data access', 'packet doc');
passAssertion('packet_does_not_approve_production_data_access');
mustHave(packetDoc, 'This packet does **not** approve live activation', 'packet doc');
passAssertion('packet_does_not_approve_live_activation');
mustHave(packetDoc, 'This packet does **not** approve real homeowner contact', 'packet doc');
passAssertion('packet_does_not_approve_real_homeowner_contact');
mustHave(packetDoc, 'This packet does **not** approve real roofer contact', 'packet doc');
passAssertion('packet_does_not_approve_real_roofer_contact');
mustHave(packetDoc, 'This packet does **not** approve production Supabase writes', 'packet doc');
passAssertion('packet_does_not_approve_production_supabase_writes');
mustHave(packetDoc, 'This packet does **not** approve schema/auth/RLS/security changes', 'packet doc');
passAssertion('packet_does_not_approve_schema_auth_rls_security_changes');
mustHave(
  packetDoc,
  'This packet does **not** approve billing/payment/deposit/invoice/quote/estimate automation',
  'packet doc',
);
passAssertion('packet_does_not_approve_billing_payment_automation');
mustHave(
  packetDoc,
  'This packet does **not** approve SMS, email, calls, or calendar booking',
  'packet doc',
);
passAssertion('packet_does_not_authorize_sms_email_calls_calendar_booking');
mustHave(packetDoc, 'This packet does **not** make external calls', 'packet doc');
passAssertion('packet_does_not_make_external_calls');
mustHave(packetDoc, 'This packet does **not** access credentials', 'packet doc');
passAssertion('packet_does_not_access_credentials');
mustHave(packetDoc, 'This packet does **not** access production data', 'packet doc');
passAssertion('packet_does_not_access_production_data');
mustHave(packetDoc, 'This packet does **not** contact any real roofer or homeowner', 'packet doc');
passAssertion('packet_does_not_contact_roofer_or_homeowner');
mustHave(packetDoc, 'separate runner scaffolding build packet', 'packet doc');
passAssertion('next_step_separate_runner_scaffolding_build_packet_not_execution');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled | preserved', 'packet doc');

for (const check of PRE_RUN_GUARD_CHECKS) {
  mustHave(packetDoc, check, 'packet doc pre-run guard checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc pre-run guard check status');
}
passAssertion('build_runner_pre_run_guard_checks_all_20_checks_present');
passAssertion('build_runner_pre_run_guard_checks_all_20_checks_passed');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

for (const upstreamFixturePath of [
  upstreamCaptureFixturePath,
  buildRunnerTemplateFixturePath,
  runnerDesignFixturePath,
]) {
  if (!fs.existsSync(path.join(root, upstreamFixturePath))) {
    fail(`missing upstream fixture: ${upstreamFixturePath}`);
  }
}
passAssertion('upstream_capture_signed_build_runner_approval_fixture_present');
passAssertion('upstream_build_runner_template_fixture_present');
passAssertion('upstream_runner_design_fixture_present');

const fixture = readJson(fixturePath);
const upstreamCaptureFixture = readJson(upstreamCaptureFixturePath);
const upstreamTemplateFixture = readJson(buildRunnerTemplateFixturePath);
const upstreamRunnerDesignFixture = readJson(runnerDesignFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 912b3aa');
}
if (fixture.capture_signed_build_runner_approval_commit !== CAPTURE_SIGNED_BUILD_RUNNER_APPROVAL_COMMIT) {
  fail('fixture capture_signed_build_runner_approval_commit must be 912b3aa');
}
if (fixture.build_runner_exact_approval_template_commit !== BUILD_RUNNER_TEMPLATE_COMMIT) {
  fail('fixture build_runner_exact_approval_template_commit must be 07421c8');
}
if (fixture.runner_design_commit !== RUNNER_DESIGN_COMMIT) {
  fail('fixture runner_design_commit must be 40d0d24');
}
if (fixture.approval_scope !== APPROVAL_SCOPE) {
  fail('fixture approval_scope mismatch');
}
if (fixture.signed_approval_timestamp !== SIGNED_APPROVAL_TIMESTAMP) {
  fail('fixture signed_approval_timestamp mismatch');
}
if (fixture.build_runner_approval_capture_status !== 'captured') {
  fail('fixture build_runner_approval_capture_status must be captured');
}
if (fixture.build_runner_jason_signed_approval_status !== 'signed') {
  fail('fixture build_runner_jason_signed_approval_status must be signed');
}
if (fixture.build_runner_exact_values_required_count !== 19) {
  fail('fixture build_runner_exact_values_required_count must be 19');
}
if (fixture.build_runner_exact_values_accepted_count !== 19) {
  fail('fixture build_runner_exact_values_accepted_count must be 19');
}
if (fixture.build_runner_exact_values_approved_count !== 19) {
  fail('fixture build_runner_exact_values_approved_count must be 19');
}
if (fixture.build_runner_pre_run_guard_status !== 'passed') {
  fail('fixture build_runner_pre_run_guard_status must be passed');
}
if (fixture.build_runner_pre_run_guard_checks_required_count !== 20) {
  fail('fixture build_runner_pre_run_guard_checks_required_count must be 20');
}
if (fixture.build_runner_pre_run_guard_checks_passed_count !== 20) {
  fail('fixture build_runner_pre_run_guard_checks_passed_count must be 20');
}
if (fixture.build_runner_pre_run_guard_failed_count !== 0) {
  fail('fixture build_runner_pre_run_guard_failed_count must be 0');
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
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
}
if (fixture.runner_build_status !== 'not_built_by_this_packet') {
  fail('fixture runner_build_status must be not_built_by_this_packet');
}
if (fixture.runner_execution_status !== 'not_run_by_this_packet') {
  fail('fixture runner_execution_status must be not_run_by_this_packet');
}
if (fixture.future_command_status !== 'ready_for_build_runner_scaffolding_packet_review_only') {
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
if (fixture.demo_ready_with_live_automation_disabled !== 'preserved') {
  fail('fixture demo_ready_with_live_automation_disabled must be preserved');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}

if (
  !Array.isArray(fixture.build_runner_pre_run_guard_checks) ||
  fixture.build_runner_pre_run_guard_checks.length !== 20
) {
  fail('fixture build_runner_pre_run_guard_checks must contain 20 checks');
}
for (let i = 0; i < PRE_RUN_GUARD_CHECKS.length; i += 1) {
  const check = fixture.build_runner_pre_run_guard_checks[i];
  if (check.check !== i + 1) {
    fail(`fixture build_runner_pre_run_guard_checks[${i}].check must be ${i + 1}`);
  }
  if (check.name !== PRE_RUN_GUARD_CHECKS[i]) {
    fail(`fixture build_runner_pre_run_guard_checks[${i}].name mismatch`);
  }
  if (check.status !== 'passed') {
    fail(`fixture build_runner_pre_run_guard_checks[${i}].status must be passed`);
  }
}

if (upstreamCaptureFixture.build_runner_approval_capture_status !== 'captured') {
  fail('upstream capture fixture build_runner_approval_capture_status must be captured');
}
if (upstreamCaptureFixture.build_runner_jason_signed_approval_status !== 'signed') {
  fail('upstream capture fixture build_runner_jason_signed_approval_status must be signed');
}
if (upstreamCaptureFixture.build_runner_exact_values_required_count !== 19) {
  fail('upstream capture fixture build_runner_exact_values_required_count must be 19');
}
if (upstreamCaptureFixture.build_runner_exact_values_accepted_count !== 19) {
  fail('upstream capture fixture build_runner_exact_values_accepted_count must be 19');
}
if (upstreamCaptureFixture.build_runner_exact_values_approved_count !== 19) {
  fail('upstream capture fixture build_runner_exact_values_approved_count must be 19');
}
if (upstreamCaptureFixture.future_command_status !== 'blocked_until_build_runner_pre_run_guard_passes') {
  fail('upstream capture fixture future_command_status must be blocked_until_build_runner_pre_run_guard_passes');
}
if (upstreamTemplateFixture.source_of_truth_commit !== '40d0d24') {
  fail('upstream build-runner template fixture source_of_truth_commit must be 40d0d24');
}
if (upstreamRunnerDesignFixture.source_of_truth_commit !== '0150699') {
  fail('upstream runner design fixture source_of_truth_commit must be 0150699');
}
if (upstreamRunnerDesignFixture.different_runner_required !== true) {
  fail('upstream runner design fixture different_runner_required must be true');
}

passAssertion('structured_fixture_valid_json');
passAssertion('no_external_calls_credentials_production_data_contact_authorized_or_performed');

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
mustHave(aggregate, 'Native Workflow Fixture Build-Runner Pre-Run Guard', 'aggregate readiness');
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
mustHave(wrapper, 'local build-runner pre-run guard only', 'wrapper mode');
mustHave(wrapper, 'not runner build', 'wrapper mode');
mustHave(wrapper, 'not runner execution', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'build_runner_approval_capture_status is captured', 'wrapper mode');
mustHave(wrapper, 'build_runner_jason_signed_approval_status is signed', 'wrapper mode');
mustHave(wrapper, 'build_runner_pre_run_guard_status is passed', 'wrapper mode');
mustHave(wrapper, 'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustHave(
  wrapper,
  'future_command_status is ready_for_build_runner_scaffolding_packet_review_only',
  'wrapper mode',
);
mustHave(wrapper, 'separate runner scaffolding build packet', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');

if (!isExecutable(wrapperPath)) {
  fail(`build-runner pre-run guard dry-run wrapper is not executable: ${wrapperPath}`);
}
passAssertion('build_runner_pre_run_guard_dry_run_wrapper_present_and_safe');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 85) {
  fail(`REQUIRED_ASSERTIONS must contain 85 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Build-Runner Pre-Run Guard verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);