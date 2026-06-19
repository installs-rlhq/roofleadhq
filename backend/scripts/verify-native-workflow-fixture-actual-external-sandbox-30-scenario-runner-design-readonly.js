#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_DESIGN.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_DESIGN_NO_GO_REVIEW.md';
const upstreamCommandRunDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_REFRESHED_ACTUAL_30_SCENARIO_COMMAND_RUN_EVIDENCE.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-runner-design.json';
const upstreamCommandRunFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/refreshed-actual-30-scenario-command-run-evidence.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '0150699';
const PROPOSED_FUTURE_COMMAND =
  'bash scripts/run-native-workflow-fixture-actual-external-sandbox-30-scenario-validation.sh';
const PROPOSED_WORKING_DIRECTORY = '/root/roofleadhq';
const PROPOSED_EVIDENCE_LOG_PATH =
  'logs/actual-external-sandbox-30-scenario-validation/{YYYY-MM-DD-HHMMSS}.log';
const PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH =
  'backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-validation-result-{YYYY-MM-DD-HHMMSS}.json';

const SCENARIO_GROUPS = [
  { name: 'SMS sandbox validation', count: 5 },
  { name: 'Vapi test assistant validation', count: 3 },
  { name: 'Lead intake validation', count: 5 },
  { name: 'Manual review/escalation validation', count: 4 },
  { name: 'Calendar/appointment sandbox validation', count: 4 },
  { name: 'Reporting/admin visibility validation', count: 3 },
  { name: 'Audit log evidence validation', count: 3 },
  { name: 'STOP/rollback validation', count: 3 },
];

const REQUIRED_EVIDENCE_FIELDS = [
  'scenario_id',
  'scenario_group',
  'scenario_name',
  'approved_boundary_checked',
  'service_mode',
  'test_account_reference',
  'input_fixture',
  'action_taken',
  'expected_result',
  'observed_result',
  'pass_fail_status',
  'evidence_log_reference',
  'stop_condition_triggered',
  'reviewer_initials',
  'timestamp',
];

const AGGREGATE_COUNTERS = [
  'total_scenarios_count',
  'captured_scenarios_count',
  'passed_scenarios_count',
  'failed_scenarios_count',
  'missing_scenarios_count',
  'stop_conditions_count',
  'external_calls_count_by_service',
  'credential_values_logged_count',
  'production_data_touches_count',
  'real_contact_touches_count',
];

const DESIGN_CHECKS = [
  'source_of_truth_commit 0150699 referenced',
  'prior refreshed command run local wrapper gap documented',
  'different actual external/sandbox runner required',
  'proposed runner status design_only_not_built_not_approved_not_run',
  'actual 30-scenario external validation remains 0 captured / 0 passed / 30 missing',
  'all 8 scenario groups and 30 scenarios specified',
  'required evidence fields and aggregate counters specified',
  'proposed future paths documented as proposed only',
  'live activation and real contact blocks remain not_granted',
  'demo_ready_with_live_automation_disabled preserved',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_refreshed_command_run_fixture_present',
  'source_of_truth_commit_0150699_referenced',
  'prior_refreshed_command_run_status_completed_local_review_only_wrapper_passed',
  'current_runner_gap_status_existing_wrapper_is_local_only_not_actual_external_sandbox_runner',
  'different_runner_required_true',
  'proposed_runner_status_design_only_not_built_not_approved_not_run',
  'actual_30_scenario_external_validation_captured_count_0',
  'actual_30_scenario_external_validation_passed_count_0',
  'actual_30_scenario_external_validation_missing_count_30',
  'actual_30_scenario_external_validation_status_not_captured_by_this_run',
  'proposed_future_command_present_as_proposed_only',
  'proposed_working_directory_present_as_proposed_only',
  'proposed_evidence_log_path_present_as_proposed_only',
  'proposed_structured_evidence_output_path_present_as_proposed_only',
  'all_8_scenario_groups_present',
  'scenario_groups_total_30',
  'required_evidence_fields_present',
  'aggregate_counters_specified',
  'future_command_status_blocked_until_actual_external_sandbox_runner_built_and_exact_approval_captured_and_pre_run_guard_passes',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
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
  'packet_does_not_build_proposed_runner',
  'packet_does_not_approve_proposed_runner',
  'packet_does_not_approve_command_execution',
  'packet_does_not_authorize_external_calls',
  'packet_does_not_authorize_credentials',
  'packet_does_not_authorize_production_data',
  'packet_does_not_authorize_sms_email_calls_calendar_booking',
  'packet_does_not_claim_full_30_scenario_validation_passed',
  'packet_does_not_claim_live_sandbox_external_testing_completed',
  'future_runner_must_fail_closed_on_stop_condition',
  'design_checks_all_10_checks_present',
  'design_checks_all_10_checks_passed',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'runner_design_dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_DESIGN.md',
  'NATIVE_WORKFLOW_FIXTURE_ACTUAL_EXTERNAL_SANDBOX_30_SCENARIO_RUNNER_DESIGN_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-dry-run.sh',
  'verify-native-workflow-fixture-actual-external-sandbox-30-scenario-runner-design-readonly.js',
  'actual-external-sandbox-30-scenario-runner-design.json',
  'Native Workflow Fixture Actual External/Sandbox 30-Scenario Runner Design',
  'native workflow fixture actual external sandbox 30 scenario runner design',
  'actual external sandbox 30 scenario runner design',
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
read(upstreamCommandRunDocPath);
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
  'fake-data/local-only/read-only/dry-run-only/review-only/design-only/not-built/not-approved/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/design-only/not-built/not-approved/non-executing',
  'no-go review',
);

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_0150699_referenced');

mustHave(
  packetDoc,
  'prior_refreshed_command_run_status | completed_local_review_only_wrapper_passed',
  'packet doc',
);
passAssertion('prior_refreshed_command_run_status_completed_local_review_only_wrapper_passed');

mustHave(
  packetDoc,
  'current_runner_gap_status | existing_wrapper_is_local_only_not_actual_external_sandbox_runner',
  'packet doc',
);
passAssertion('current_runner_gap_status_existing_wrapper_is_local_only_not_actual_external_sandbox_runner');

mustHave(packetDoc, 'different_runner_required | true', 'packet doc');
passAssertion('different_runner_required_true');

mustHave(packetDoc, 'proposed_runner_status | design_only_not_built_not_approved_not_run', 'packet doc');
passAssertion('proposed_runner_status_design_only_not_built_not_approved_not_run');

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

mustHave(packetDoc, `proposed_future_command | ${PROPOSED_FUTURE_COMMAND}`, 'packet doc');
mustHave(packetDoc, 'PROPOSED_ONLY', 'packet doc proposed status');
mustHave(packetDoc, `proposed_working_directory | ${PROPOSED_WORKING_DIRECTORY}`, 'packet doc');
mustHave(packetDoc, `proposed_evidence_log_path | ${PROPOSED_EVIDENCE_LOG_PATH}`, 'packet doc');
mustHave(
  packetDoc,
  `proposed_structured_evidence_output_path | ${PROPOSED_STRUCTURED_EVIDENCE_OUTPUT_PATH}`,
  'packet doc',
);
passAssertion('proposed_future_command_present_as_proposed_only');
passAssertion('proposed_working_directory_present_as_proposed_only');
passAssertion('proposed_evidence_log_path_present_as_proposed_only');
passAssertion('proposed_structured_evidence_output_path_present_as_proposed_only');

for (const group of SCENARIO_GROUPS) {
  mustHave(packetDoc, group.name, 'packet doc scenario groups');
  mustHave(packetDoc, String(group.count), 'packet doc scenario counts');
}
mustHave(packetDoc, '**total_scenarios_count** | **30**', 'packet doc total scenarios');
passAssertion('all_8_scenario_groups_present');
passAssertion('scenario_groups_total_30');

for (const field of REQUIRED_EVIDENCE_FIELDS) {
  mustHave(packetDoc, field, 'packet doc evidence fields');
}
passAssertion('required_evidence_fields_present');

for (const counter of AGGREGATE_COUNTERS) {
  mustHave(packetDoc, counter, 'packet doc aggregate counters');
}
mustHave(packetDoc, 'credential_values_logged_count` must remain 0', 'packet doc');
mustHave(packetDoc, 'production_data_touches_count` must remain 0', 'packet doc');
mustHave(packetDoc, 'real_contact_touches_count` must remain 0', 'packet doc');
passAssertion('aggregate_counters_specified');

mustHave(
  packetDoc,
  'future_command_status | blocked_until_actual_external_sandbox_runner_built_and_exact_approval_captured_and_pre_run_guard_passes',
  'packet doc',
);
passAssertion(
  'future_command_status_blocked_until_actual_external_sandbox_runner_built_and_exact_approval_captured_and_pre_run_guard_passes',
);

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');

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

mustHave(packetDoc, 'This packet **does not** build the proposed future actual external/sandbox 30-scenario validation runner', 'packet doc');
passAssertion('packet_does_not_build_proposed_runner');
mustHave(packetDoc, 'This packet **does not** approve the proposed future runner', 'packet doc');
passAssertion('packet_does_not_approve_proposed_runner');
mustHave(packetDoc, 'This packet **does not** approve any command execution', 'packet doc');
passAssertion('packet_does_not_approve_command_execution');
mustHave(packetDoc, 'This packet **does not** make external calls', 'packet doc');
passAssertion('packet_does_not_authorize_external_calls');
mustHave(packetDoc, 'This packet **does not** access credentials', 'packet doc');
passAssertion('packet_does_not_authorize_credentials');
mustHave(packetDoc, 'This packet **does not** approve production data access', 'packet doc');
passAssertion('packet_does_not_authorize_production_data');
mustHave(packetDoc, 'This packet **does not** send SMS/email/calls or create calendar bookings', 'packet doc');
passAssertion('packet_does_not_authorize_sms_email_calls_calendar_booking');
mustHave(packetDoc, 'This packet **does not** claim full 30-scenario external/sandbox validation has passed', 'packet doc');
passAssertion('packet_does_not_claim_full_30_scenario_validation_passed');
mustHave(packetDoc, 'This packet **does not** claim live/sandbox external testing has completed', 'packet doc');
passAssertion('packet_does_not_claim_live_sandbox_external_testing_completed');
mustHave(packetDoc, 'Any future runner must **fail closed** if any stop condition appears', 'packet doc');
passAssertion('future_runner_must_fail_closed_on_stop_condition');

for (const check of DESIGN_CHECKS) {
  mustHave(packetDoc, check, 'packet doc design checks');
  mustHave(packetDoc, `| ${check} | passed |`, 'packet doc design check status');
}
passAssertion('design_checks_all_10_checks_present');
passAssertion('design_checks_all_10_checks_passed');

mustHave(packetDoc, upstreamCommandRunDocPath, 'packet doc');
mustHave(packetDoc, upstreamCommandRunFixturePath, 'packet doc');
mustHave(packetDoc, 'refreshed-actual-30-scenario-command-run-evidence', 'packet doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, upstreamCommandRunFixturePath))) {
  fail(`missing upstream refreshed command run fixture: ${upstreamCommandRunFixturePath}`);
}
passAssertion('upstream_refreshed_command_run_fixture_present');

const fixture = readJson(fixturePath);
const upstreamCommandRunFixture = readJson(upstreamCommandRunFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 0150699');
}
if (fixture.prior_refreshed_command_run_status !== 'completed_local_review_only_wrapper_passed') {
  fail('fixture prior_refreshed_command_run_status mismatch');
}
if (fixture.current_runner_gap_status !== 'existing_wrapper_is_local_only_not_actual_external_sandbox_runner') {
  fail('fixture current_runner_gap_status mismatch');
}
if (fixture.different_runner_required !== true) {
  fail('fixture different_runner_required must be true');
}
if (fixture.proposed_runner_status !== 'design_only_not_built_not_approved_not_run') {
  fail('fixture proposed_runner_status mismatch');
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
if (fixture.proposed_future_command !== PROPOSED_FUTURE_COMMAND) {
  fail('fixture proposed_future_command mismatch');
}
if (fixture.proposed_working_directory !== PROPOSED_WORKING_DIRECTORY) {
  fail('fixture proposed_working_directory mismatch');
}
if (fixture.future_command_status !== 'blocked_until_actual_external_sandbox_runner_built_and_exact_approval_captured_and_pre_run_guard_passes') {
  fail('fixture future_command_status mismatch');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status mismatch');
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
if (!Array.isArray(fixture.scenario_groups) || fixture.scenario_groups.length !== 8) {
  fail('fixture scenario_groups must contain 8 groups');
}
let scenarioTotal = 0;
for (let i = 0; i < SCENARIO_GROUPS.length; i += 1) {
  const group = fixture.scenario_groups[i];
  if (group.scenario_group !== SCENARIO_GROUPS[i].name) {
    fail(`fixture scenario_groups[${i}].scenario_group mismatch`);
  }
  if (group.scenario_count !== SCENARIO_GROUPS[i].count) {
    fail(`fixture scenario_groups[${i}].scenario_count mismatch`);
  }
  scenarioTotal += group.scenario_count;
}
if (scenarioTotal !== 30) {
  fail('fixture scenario_groups total must be 30');
}
if (fixture.total_scenarios_count !== 30) {
  fail('fixture total_scenarios_count must be 30');
}
if (!Array.isArray(fixture.required_evidence_fields_per_scenario) || fixture.required_evidence_fields_per_scenario.length !== 15) {
  fail('fixture required_evidence_fields_per_scenario must contain 15 fields');
}
for (const field of REQUIRED_EVIDENCE_FIELDS) {
  if (!fixture.required_evidence_fields_per_scenario.includes(field)) {
    fail(`fixture required_evidence_fields_per_scenario missing ${field}`);
  }
}
if (!fixture.required_aggregate_counters || fixture.required_aggregate_counters.total_scenarios_count !== 30) {
  fail('fixture required_aggregate_counters.total_scenarios_count must be 30');
}
if (fixture.required_aggregate_counters.credential_values_logged_count_must_be !== 0) {
  fail('fixture credential_values_logged_count_must_be must be 0');
}
if (fixture.required_aggregate_counters.production_data_touches_count_must_be !== 0) {
  fail('fixture production_data_touches_count_must_be must be 0');
}
if (fixture.required_aggregate_counters.real_contact_touches_count_must_be !== 0) {
  fail('fixture real_contact_touches_count_must_be must be 0');
}
if (!Array.isArray(fixture.design_checks) || fixture.design_checks.length !== 10) {
  fail('fixture design_checks must contain 10 checks');
}
for (let i = 0; i < DESIGN_CHECKS.length; i += 1) {
  const check = fixture.design_checks[i];
  if (check.check !== i + 1) {
    fail(`fixture design_checks[${i}].check must be ${i + 1}`);
  }
  if (check.name !== DESIGN_CHECKS[i]) {
    fail(`fixture design_checks[${i}].name mismatch`);
  }
  if (check.status !== 'passed') {
    fail(`fixture design_checks[${i}].status must be passed`);
  }
}

if (upstreamCommandRunFixture.source_of_truth_commit !== '0da2457') {
  fail('upstream command run fixture source_of_truth_commit must be 0da2457');
}
if (upstreamCommandRunFixture.refreshed_exact_approved_command_run_status !== 'completed_local_review_only_wrapper_passed') {
  fail('upstream command run fixture refreshed_exact_approved_command_run_status mismatch');
}
if (upstreamCommandRunFixture.actual_30_scenario_external_validation_captured_count !== 0) {
  fail('upstream command run fixture actual_30_scenario_external_validation_captured_count must be 0');
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
  'Native Workflow Fixture Actual External/Sandbox 30-Scenario Runner Design',
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
mustHave(wrapper, 'design-only', 'wrapper mode');
mustHave(wrapper, 'not approval', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, '0 captured / 0 passed / 30 missing', 'wrapper mode');
mustHave(wrapper, 'separate exact approval', 'wrapper mode');
mustHave(wrapper, SOURCE_OF_TRUTH_COMMIT, 'wrapper source of truth');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, PROPOSED_FUTURE_COMMAND.replace('bash ', ''), 'wrapper must not execute proposed future command');

if (!isExecutable(wrapperPath)) {
  fail(`runner design dry-run wrapper is not executable: ${wrapperPath}`);
}
passAssertion('runner_design_dry_run_wrapper_present_and_safe');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 66) {
  fail(`REQUIRED_ASSERTIONS must contain 66 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Actual External/Sandbox 30-Scenario Runner Design verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);