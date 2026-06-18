#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const captureDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT.md';
const worksheetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_WORKSHEET.md';
const completenessReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_COMPLETENESS_REVIEW.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-capture-draft.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-sandbox-test-mode-exact-values-capture-draft-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-exact-values-capture-draft-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const priorApprovalRequestDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SEPARATE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_PACKET.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = 'ae9154b';
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
];
const RECOMMENDED_NEXT_STEP = 'JASON_REVIEW_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

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

const EXACT_VALUE_REQUIRED_FLAGS = [
  'exact_services_required',
  'exact_test_accounts_required',
  'exact_environment_required',
  'exact_command_required',
  'exact_working_directory_required',
  'exact_credentials_env_api_webhook_boundary_required',
  'exact_external_call_boundary_required',
  'exact_production_data_boundary_required',
  'exact_schema_auth_rls_security_boundary_required',
  'exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required',
  'exact_messaging_contact_permission_boundary_required',
  'exact_calendar_appointment_boundary_required',
  'exact_reporting_csv_boundary_required',
  'exact_stop_conditions_required',
  'exact_rollback_owner_required',
  'exact_evidence_owner_required',
  'exact_log_path_required',
  'exact_approval_expiration_required',
  'exact_one_time_use_limitation_required',
];

const COMPLETENESS_REVIEW_ROWS = [
  { value: 'exact_services', status: 'not_captured' },
  { value: 'exact_test_accounts', status: 'not_captured' },
  { value: 'exact_environment', status: 'not_captured' },
  { value: 'exact_command', status: 'not_captured' },
  { value: 'exact_working_directory', status: 'not_captured' },
  { value: 'exact_credentials_env_api_webhook_boundary', status: 'not_captured' },
  { value: 'exact_external_call_boundary', status: 'not_captured' },
  { value: 'exact_production_data_boundary', status: 'not_captured' },
  { value: 'exact_schema_auth_rls_security_boundary', status: 'not_captured' },
  {
    value: 'exact_public_route_webhook_scheduler_cron_dispatcher_boundary',
    status: 'not_captured',
  },
  { value: 'exact_messaging_contact_permission_boundary', status: 'not_captured' },
  { value: 'exact_calendar_appointment_boundary', status: 'not_captured' },
  { value: 'exact_reporting_csv_boundary', status: 'not_captured' },
  { value: 'exact_stop_conditions', status: 'not_captured' },
  { value: 'exact_rollback_owner', status: 'not_captured' },
  { value: 'exact_evidence_owner', status: 'not_captured' },
  { value: 'exact_log_path', status: 'not_captured' },
  { value: 'exact_approval_expiration', status: 'not_captured' },
  { value: 'exact_one_time_use_limitation', status: 'not_captured' },
];

const REQUIRED_ASSERTIONS = [
  'capture_draft_doc_present',
  'worksheet_doc_present',
  'completeness_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'source_of_truth_commit_ae9154b_referenced',
  'prior_commit_17abae0_referenced',
  'prior_commit_cf566ae_referenced',
  'prior_commit_728ad03_referenced',
  'prior_commit_401bfc7_referenced',
  'prior_commit_edceb29_referenced',
  'prior_commit_df388f4_referenced',
  'prior_commit_3800512_referenced',
  'prior_commit_c6df554_referenced',
  'prior_commit_f752452_referenced',
  'prior_commit_0d7ae0d_referenced',
  'prior_commit_5ef9ef5_referenced',
  'prior_commit_db9ece3_referenced',
  'prior_commit_04e0de6_referenced',
  'prior_commit_ae9154b_referenced',
  'capture_status_blank_draft_only',
  'approval_status_not_granted',
  'sandbox_test_mode_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'local_evidence_chain_status_passed',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'blank_placeholders_are_not_approval',
  'all_approved_insufficient_without_exact_values',
  'exact_values_required_count_19',
  'exact_values_filled_count_0',
  'all_exact_values_filled_false',
  'capture_draft_all_19_exact_value_sections_present',
  'worksheet_all_19_exact_value_rows_present',
  'completeness_review_all_19_not_captured_rows_present',
  'fixture_all_19_exact_values_blank',
  'capture_draft_does_not_approve_sandbox_test_mode_activation',
  'capture_draft_live_activation_remains_not_granted',
  'capture_draft_if_approved_later_must_be_exact_and_scoped',
  'completeness_review_not_captured_not_approval',
  'completeness_review_no_go_keep_blocked_gates',
  'completeness_review_stop_and_roll_back_gates',
  'exact_services_required_true',
  'exact_test_accounts_required_true',
  'exact_environment_required_true',
  'exact_command_required_true',
  'exact_working_directory_required_true',
  'exact_credentials_env_api_webhook_boundary_required_true',
  'exact_external_call_boundary_required_true',
  'exact_production_data_boundary_required_true',
  'exact_schema_auth_rls_security_boundary_required_true',
  'exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required_true',
  'exact_messaging_contact_permission_boundary_required_true',
  'exact_calendar_appointment_boundary_required_true',
  'exact_reporting_csv_boundary_required_true',
  'exact_stop_conditions_required_true',
  'exact_rollback_owner_required_true',
  'exact_evidence_owner_required_true',
  'exact_log_path_required_true',
  'exact_approval_expiration_required_true',
  'exact_one_time_use_limitation_required_true',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'approved_channels_empty',
  'approved_external_services_empty',
  'live_activation_allowed_false',
  'sandbox_test_mode_activation_allowed_false',
  'external_calls_allowed_false',
  'credentials_access_allowed_false',
  'production_data_access_allowed_false',
  'schema_auth_rls_security_changes_allowed_false',
  'public_route_webhook_scheduler_cron_dispatcher_allowed_false',
  'billing_payment_automation_allowed_false',
  'public_go_live_or_production_copy_changes_allowed_false',
  'real_demo_sandbox_live_testing_allowed_false',
  'old_90_day_plan_cannot_override_current_source_of_truth',
  'does_not_approve_activation',
  'forbidden_live_external_sandbox_paths_remain_blocked',
  'public_go_live_or_production_copy_not_changed',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
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
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT.md',
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_WORKSHEET.md',
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_COMPLETENESS_REVIEW.md',
  'run-native-workflow-fixture-sandbox-test-mode-exact-values-capture-draft-dry-run.sh',
  'verify-native-workflow-fixture-sandbox-test-mode-exact-values-capture-draft-readonly.js',
  'sandbox-test-mode-exact-values-capture-draft.json',
  'Native Workflow Fixture Sandbox/Test-Mode Exact Values Capture Draft',
  'native workflow fixture sandbox test mode exact values capture draft',
  'sandbox test mode exact values capture draft',
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

const captureDraftDoc = read(captureDraftDocPath);
const worksheetDoc = read(worksheetDocPath);
const completenessReviewDoc = read(completenessReviewDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const priorApprovalRequestDoc = read(priorApprovalRequestDocPath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${captureDraftDoc}\n${worksheetDoc}\n${completenessReviewDoc}`;

passAssertion('capture_draft_doc_present');
passAssertion('worksheet_doc_present');
passAssertion('completeness_review_doc_present');

for (const doc of [captureDraftDoc, worksheetDoc, completenessReviewDoc]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
}
passAssertion('source_of_truth_commit_ae9154b_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(combinedDocs, commit, 'combined packet docs');
}
passAssertion('prior_commit_17abae0_referenced');
passAssertion('prior_commit_cf566ae_referenced');
passAssertion('prior_commit_728ad03_referenced');
passAssertion('prior_commit_401bfc7_referenced');
passAssertion('prior_commit_edceb29_referenced');
passAssertion('prior_commit_df388f4_referenced');
passAssertion('prior_commit_3800512_referenced');
passAssertion('prior_commit_c6df554_referenced');
passAssertion('prior_commit_f752452_referenced');
passAssertion('prior_commit_0d7ae0d_referenced');
passAssertion('prior_commit_5ef9ef5_referenced');
passAssertion('prior_commit_db9ece3_referenced');
passAssertion('prior_commit_04e0de6_referenced');
passAssertion('prior_commit_ae9154b_referenced');

mustHave(captureDraftDoc, 'capture_status | blank_draft_only', 'capture draft doc');
passAssertion('capture_status_blank_draft_only');
mustHave(captureDraftDoc, 'approval_status | not_granted', 'capture draft doc');
passAssertion('approval_status_not_granted');
mustHave(
  captureDraftDoc,
  'sandbox_test_mode_approval_status | not_granted',
  'capture draft doc',
);
passAssertion('sandbox_test_mode_approval_status_not_granted');
mustHave(
  captureDraftDoc,
  'live_activation_approval_status | not_granted',
  'capture draft doc',
);
passAssertion('live_activation_approval_status_not_granted');
mustHave(captureDraftDoc, 'local_evidence_chain_status | passed', 'capture draft doc');
passAssertion('local_evidence_chain_status_passed');
mustHave(captureDraftDoc, 'p0_blockers_count | 0', 'capture draft doc');
passAssertion('p0_blockers_count_0');
mustHave(captureDraftDoc, 'p1_polish_status | completed', 'capture draft doc');
passAssertion('p1_polish_status_completed');
mustHave(captureDraftDoc, 'p2_refinement_status | completed', 'capture draft doc');
passAssertion('p2_refinement_status_completed');
mustHave(captureDraftDoc, 'p3_planning_status | completed', 'capture draft doc');
passAssertion('p3_planning_status_completed');

mustHave(captureDraftDoc, 'Blank placeholders are **not** approval', 'capture draft doc');
mustHave(worksheetDoc, 'Blank placeholders are **not** approval', 'worksheet doc');
mustHave(
  completenessReviewDoc,
  'Blank placeholders are **not** approval',
  'completeness review doc',
);
passAssertion('blank_placeholders_are_not_approval');

mustHave(
  captureDraftDoc,
  '"All approved" is **insufficient** for execution without exact values',
  'capture draft doc',
);
mustHave(
  worksheetDoc,
  '"All approved" is **insufficient** for execution without exact values',
  'worksheet doc',
);
mustHave(
  completenessReviewDoc,
  '"All approved" is **insufficient** for execution without exact values',
  'completeness review doc',
);
passAssertion('all_approved_insufficient_without_exact_values');

mustHave(captureDraftDoc, 'exact_values_required_count | 19', 'capture draft doc');
mustHave(captureDraftDoc, 'exact_values_filled_count | 0', 'capture draft doc');
mustHave(captureDraftDoc, 'all_exact_values_filled | false', 'capture draft doc');
passAssertion('exact_values_required_count_19');
passAssertion('exact_values_filled_count_0');
passAssertion('all_exact_values_filled_false');

for (let i = 0; i < EXACT_VALUE_FIELDS.length; i += 1) {
  const field = EXACT_VALUE_FIELDS[i];
  const sectionNum = i + 1;
  mustHave(captureDraftDoc, `### 4.${sectionNum}`, 'capture draft doc');
  mustHave(captureDraftDoc, `${field}_filled | false`, 'capture draft doc');
  mustHave(worksheetDoc, `| ${sectionNum} | ${field} | false |`, 'worksheet doc');
}
passAssertion('capture_draft_all_19_exact_value_sections_present');
passAssertion('worksheet_all_19_exact_value_rows_present');

for (const row of COMPLETENESS_REVIEW_ROWS) {
  const rowStart = completenessReviewDoc.indexOf(`| ${row.value} |`);
  if (rowStart === -1) fail(`completeness review row missing: ${row.value}`);
  const rowEnd = completenessReviewDoc.indexOf('\n', rowStart);
  const rowSlice =
    rowEnd === -1
      ? completenessReviewDoc.slice(rowStart)
      : completenessReviewDoc.slice(rowStart, rowEnd);
  mustHave(rowSlice, row.status, `completeness review row ${row.value}`);
  mustHave(rowSlice, '| false |', `completeness review activation allowed ${row.value}`);
}
passAssertion('completeness_review_all_19_not_captured_rows_present');

mustHave(
  captureDraftDoc,
  'does **not** approve sandbox/test-mode activation',
  'capture draft doc',
);
passAssertion('capture_draft_does_not_approve_sandbox_test_mode_activation');
mustHave(captureDraftDoc, 'Live activation remains **not granted**', 'capture draft doc');
passAssertion('capture_draft_live_activation_remains_not_granted');
mustHave(
  captureDraftDoc,
  'approval must be **exact and scoped**',
  'capture draft doc',
);
passAssertion('capture_draft_if_approved_later_must_be_exact_and_scoped');

mustHave(
  completenessReviewDoc,
  'Not captured does **not** equal approved',
  'completeness review doc',
);
passAssertion('completeness_review_not_captured_not_approval');

mustHave(completenessReviewDoc, 'NO_GO_KEEP_BLOCKED', 'completeness review doc');
passAssertion('completeness_review_no_go_keep_blocked_gates');
mustHave(completenessReviewDoc, 'STOP_AND_ROLL_BACK', 'completeness review doc');
passAssertion('completeness_review_stop_and_roll_back_gates');

for (const flag of EXACT_VALUE_REQUIRED_FLAGS) {
  mustHave(combinedDocs, `${flag} | true`, 'combined packet docs');
}
passAssertion('exact_services_required_true');
passAssertion('exact_test_accounts_required_true');
passAssertion('exact_environment_required_true');
passAssertion('exact_command_required_true');
passAssertion('exact_working_directory_required_true');
passAssertion('exact_credentials_env_api_webhook_boundary_required_true');
passAssertion('exact_external_call_boundary_required_true');
passAssertion('exact_production_data_boundary_required_true');
passAssertion('exact_schema_auth_rls_security_boundary_required_true');
passAssertion('exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required_true');
passAssertion('exact_messaging_contact_permission_boundary_required_true');
passAssertion('exact_calendar_appointment_boundary_required_true');
passAssertion('exact_reporting_csv_boundary_required_true');
passAssertion('exact_stop_conditions_required_true');
passAssertion('exact_rollback_owner_required_true');
passAssertion('exact_evidence_owner_required_true');
passAssertion('exact_log_path_required_true');
passAssertion('exact_approval_expiration_required_true');
passAssertion('exact_one_time_use_limitation_required_true');

mustHave(combinedDocs, 'approved_for_activation_now | false', 'combined packet docs');
passAssertion('approved_for_activation_now_false');
mustHave(
  combinedDocs,
  'command_execution_status | not_run_by_this_packet',
  'combined packet docs',
);
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(combinedDocs, 'approved_channels | []', 'combined packet docs');
passAssertion('approved_channels_empty');
mustHave(combinedDocs, 'approved_external_services | []', 'combined packet docs');
passAssertion('approved_external_services_empty');
mustHave(combinedDocs, 'live_activation_allowed | false', 'combined packet docs');
passAssertion('live_activation_allowed_false');
mustHave(
  combinedDocs,
  'sandbox_test_mode_activation_allowed | false',
  'combined packet docs',
);
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(combinedDocs, 'external_calls_allowed | false', 'combined packet docs');
passAssertion('external_calls_allowed_false');
mustHave(combinedDocs, 'credentials_access_allowed | false', 'combined packet docs');
passAssertion('credentials_access_allowed_false');
mustHave(combinedDocs, 'production_data_access_allowed | false', 'combined packet docs');
passAssertion('production_data_access_allowed_false');
mustHave(
  combinedDocs,
  'schema_auth_rls_security_changes_allowed | false',
  'combined packet docs',
);
passAssertion('schema_auth_rls_security_changes_allowed_false');
mustHave(
  combinedDocs,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'combined packet docs',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
mustHave(combinedDocs, 'billing_payment_automation_allowed | false', 'combined packet docs');
passAssertion('billing_payment_automation_allowed_false');
mustHave(
  combinedDocs,
  'public_go_live_or_production_copy_changes_allowed | false',
  'combined packet docs',
);
passAssertion('public_go_live_or_production_copy_changes_allowed_false');
mustHave(
  combinedDocs,
  'real_demo_sandbox_live_testing_allowed | false',
  'combined packet docs',
);
passAssertion('real_demo_sandbox_live_testing_allowed_false');

mustHave(
  combinedDocs,
  'old 90-day plan cannot override current source-of-truth direction',
  'combined packet docs',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(combinedDocs, 'This is **not** approval to activate anything', 'combined packet docs');
mustHave(combinedDocs, 'does **not** approve sandbox/test-mode activation', 'combined packet docs');
passAssertion('does_not_approve_activation');

mustHave(completenessReviewDoc, 'Twilio', 'completeness review doc');
mustHave(completenessReviewDoc, 'webhook', 'completeness review doc');
mustHave(completenessReviewDoc, 'scheduler', 'completeness review doc');
mustHave(completenessReviewDoc, 'billing', 'completeness review doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(combinedDocs, 'public_website_go_live_copy_changed | false', 'combined packet docs');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(
  captureDraftDoc,
  'does **not** run the final activation command',
  'capture draft doc',
);
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be ae9154b');
}
if (fixture.packet_status !== 'review_only') fail('fixture packet_status must be review_only');
if (fixture.capture_status !== 'blank_draft_only') {
  fail('fixture capture_status must be blank_draft_only');
}
if (fixture.approval_status !== 'not_granted') {
  fail('fixture approval_status must be not_granted');
}
if (fixture.sandbox_test_mode_approval_status !== 'not_granted') {
  fail('fixture sandbox_test_mode_approval_status must be not_granted');
}
if (fixture.live_activation_approval_status !== 'not_granted') {
  fail('fixture live_activation_approval_status must be not_granted');
}
if (fixture.local_evidence_chain_status !== 'passed') {
  fail('fixture local_evidence_chain_status must be passed');
}
if (fixture.p1_polish_status !== 'completed') fail('fixture p1_polish_status must be completed');
if (fixture.p2_refinement_status !== 'completed') {
  fail('fixture p2_refinement_status must be completed');
}
if (fixture.p3_planning_status !== 'completed') {
  fail('fixture p3_planning_status must be completed');
}
if (fixture.current_recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('fixture current_recommended_next_step mismatch');
}
if (fixture.p0_blockers_count !== 0) fail('fixture p0_blockers_count must be 0');
if (fixture.exact_values_required_count !== 19) {
  fail('fixture exact_values_required_count must be 19');
}
if (fixture.exact_values_filled_count !== 0) {
  fail('fixture exact_values_filled_count must be 0');
}
if (fixture.all_exact_values_filled !== false) {
  fail('fixture all_exact_values_filled must be false');
}
if (fixture.blank_placeholders_are_not_approval !== true) {
  fail('fixture blank_placeholders_are_not_approval must be true');
}
if (fixture.all_approved_insufficient_without_exact_values !== true) {
  fail('fixture all_approved_insufficient_without_exact_values must be true');
}

for (const flag of EXACT_VALUE_REQUIRED_FLAGS) {
  if (fixture[flag] !== true) fail(`fixture ${flag} must be true`);
}

if (!fixture.exact_values || typeof fixture.exact_values !== 'object') {
  fail('fixture exact_values object missing');
}
for (const field of EXACT_VALUE_FIELDS) {
  if (!(field in fixture.exact_values)) fail(`fixture exact_values missing ${field}`);
  if (fixture.exact_values[field] !== '') {
    fail(`fixture exact_values.${field} must be blank`);
  }
}
passAssertion('fixture_all_19_exact_values_blank');

if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (!Array.isArray(fixture.approved_channels) || fixture.approved_channels.length !== 0) {
  fail('fixture approved_channels must be empty');
}
if (
  !Array.isArray(fixture.approved_external_services) ||
  fixture.approved_external_services.length !== 0
) {
  fail('fixture approved_external_services must be empty');
}
if (fixture.live_activation_allowed !== false) fail('fixture live_activation_allowed must be false');
if (fixture.sandbox_test_mode_activation_allowed !== false) {
  fail('fixture sandbox_test_mode_activation_allowed must be false');
}
if (fixture.external_calls_allowed !== false) fail('fixture external_calls_allowed must be false');
if (fixture.credentials_access_allowed !== false) {
  fail('fixture credentials_access_allowed must be false');
}
if (fixture.production_data_access_allowed !== false) {
  fail('fixture production_data_access_allowed must be false');
}
if (fixture.schema_auth_rls_security_changes_allowed !== false) {
  fail('fixture schema_auth_rls_security_changes_allowed must be false');
}
if (fixture.public_route_webhook_scheduler_cron_dispatcher_allowed !== false) {
  fail('fixture public_route_webhook_scheduler_cron_dispatcher_allowed must be false');
}
if (fixture.billing_payment_automation_allowed !== false) {
  fail('fixture billing_payment_automation_allowed must be false');
}
if (fixture.public_go_live_or_production_copy_changes_allowed !== false) {
  fail('fixture public_go_live_or_production_copy_changes_allowed must be false');
}
if (fixture.real_demo_sandbox_live_testing_allowed !== false) {
  fail('fixture real_demo_sandbox_live_testing_allowed must be false');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}
if (
  fixture.old_90_day_plan_boundary !==
  'old 90-day plan cannot override current source-of-truth direction'
) {
  fail('fixture old_90_day_plan_boundary mismatch');
}
if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 14) {
  fail('fixture evidence_chain_commits must contain 14 commits');
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
  fail(`pilot readiness summary is not demo_ready_with_live_automation_disabled (got: ${status.summary})`);
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
  'verify-native-workflow-fixture-sandbox-test-mode-exact-values-capture-draft-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Sandbox/Test-Mode Exact Values Capture Draft',
  'aggregate readiness',
);
mustHave(verifierIndex, captureDraftDocPath, 'verifier index');
mustHave(verifierIndex, worksheetDocPath, 'verifier index');
mustHave(verifierIndex, completenessReviewDocPath, 'verifier index');
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
mustHave(wrapper, 'npm --prefix backend run build', 'wrapper backend build');
mustHave(wrapper, 'local fake-data', 'wrapper mode');
mustHave(wrapper, 'review-only', 'wrapper mode');
mustHave(wrapper, 'exact values capture draft', 'wrapper mode');
mustHave(wrapper, 'Blank placeholders are not approval', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(captureDraftDoc, worksheetDocPath, 'capture draft doc');
mustHave(captureDraftDoc, completenessReviewDocPath, 'capture draft doc');
mustHave(captureDraftDoc, fixturePath, 'capture draft doc');
mustHave(captureDraftDoc, priorApprovalRequestDocPath, 'capture draft doc');

if (REQUIRED_ASSERTIONS.length !== 96) {
  fail(`REQUIRED_ASSERTIONS must contain 96 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Sandbox/Test-Mode Exact Values Capture Draft verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);