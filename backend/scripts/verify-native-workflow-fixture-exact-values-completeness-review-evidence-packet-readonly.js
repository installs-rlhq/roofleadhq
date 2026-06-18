#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const evidencePacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_VALUES_COMPLETENESS_REVIEW_EVIDENCE_PACKET.md';
const evidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/exact-values-completeness-review-evidence-packet.json';
const captureDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT.md';
const worksheetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_WORKSHEET.md';
const completenessReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_COMPLETENESS_REVIEW.md';
const captureDraftFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-capture-draft.json';
const captureDraftVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-exact-values-capture-draft-readonly.js';
const captureDraftWrapperPath =
  'scripts/run-native-workflow-fixture-sandbox-test-mode-exact-values-capture-draft-dry-run.sh';
const wrapperPath =
  'scripts/run-native-workflow-fixture-exact-values-completeness-review-evidence-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-exact-values-completeness-review-evidence-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '6b2fe60';
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
];
const RECOMMENDED_NEXT_STEP =
  'JASON_COMPLETE_SANDBOX_TEST_MODE_EXACT_VALUES_BEFORE_ANY_ACTIVATION_CONSIDERATION';
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

const COMPLETENESS_REVIEW_ROWS = EXACT_VALUE_FIELDS.map((value) => ({
  value,
  status: 'not_captured',
}));

const REQUIRED_ASSERTIONS = [
  'evidence_packet_doc_present',
  'capture_draft_doc_present',
  'worksheet_doc_present',
  'completeness_review_doc_present',
  'structured_evidence_fixture_present',
  'capture_draft_fixture_present',
  'structured_evidence_fixture_valid_json',
  'source_of_truth_commit_6b2fe60_referenced',
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
  'prior_commit_6b2fe60_referenced',
  'completeness_status_incomplete',
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
  'evidence_review_does_not_equal_approval',
  'sandbox_test_mode_approval_requires_separate_jason_approval',
  'live_activation_requires_separate_later_approval',
  'exact_values_required_count_19',
  'exact_values_filled_count_0',
  'all_exact_values_filled_false',
  'evidence_packet_all_19_completeness_matrix_rows_present',
  'completeness_review_all_19_not_captured_rows_present',
  'capture_draft_all_19_exact_values_blank',
  'capture_draft_capture_status_blank_draft_only',
  'evidence_packet_does_not_approve_sandbox_test_mode_activation',
  'evidence_packet_live_activation_remains_not_granted',
  'completeness_review_not_captured_not_approval',
  'completeness_review_no_go_keep_blocked_gates',
  'completeness_review_stop_and_roll_back_gates',
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
  'NATIVE_WORKFLOW_FIXTURE_EXACT_VALUES_COMPLETENESS_REVIEW_EVIDENCE_PACKET.md',
  'run-native-workflow-fixture-exact-values-completeness-review-evidence-packet-dry-run.sh',
  'verify-native-workflow-fixture-exact-values-completeness-review-evidence-packet-readonly.js',
  'exact-values-completeness-review-evidence-packet.json',
  'Native Workflow Fixture Exact Values Completeness Review Evidence Packet',
  'native workflow fixture exact values completeness review evidence packet',
  'exact values completeness review evidence packet',
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

const evidencePacketDoc = read(evidencePacketDocPath);
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
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${evidencePacketDoc}\n${captureDraftDoc}\n${worksheetDoc}\n${completenessReviewDoc}`;

passAssertion('evidence_packet_doc_present');
passAssertion('capture_draft_doc_present');
passAssertion('worksheet_doc_present');
passAssertion('completeness_review_doc_present');

mustHave(evidencePacketDoc, SOURCE_OF_TRUTH_COMMIT, 'evidence packet doc');
mustHave(captureDraftDoc, 'ae9154b', 'capture draft doc');
passAssertion('source_of_truth_commit_6b2fe60_referenced');

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
passAssertion('prior_commit_6b2fe60_referenced');

mustHave(evidencePacketDoc, 'completeness_status | incomplete', 'evidence packet doc');
passAssertion('completeness_status_incomplete');
mustHave(evidencePacketDoc, 'approval_status | not_granted', 'evidence packet doc');
passAssertion('approval_status_not_granted');
mustHave(
  evidencePacketDoc,
  'sandbox_test_mode_approval_status | not_granted',
  'evidence packet doc',
);
passAssertion('sandbox_test_mode_approval_status_not_granted');
mustHave(
  evidencePacketDoc,
  'live_activation_approval_status | not_granted',
  'evidence packet doc',
);
passAssertion('live_activation_approval_status_not_granted');
mustHave(evidencePacketDoc, 'local_evidence_chain_status | passed', 'evidence packet doc');
passAssertion('local_evidence_chain_status_passed');
mustHave(evidencePacketDoc, 'p0_blockers_count | 0', 'evidence packet doc');
passAssertion('p0_blockers_count_0');
mustHave(evidencePacketDoc, 'p1_polish_status | completed', 'evidence packet doc');
passAssertion('p1_polish_status_completed');
mustHave(evidencePacketDoc, 'p2_refinement_status | completed', 'evidence packet doc');
passAssertion('p2_refinement_status_completed');
mustHave(evidencePacketDoc, 'p3_planning_status | completed', 'evidence packet doc');
passAssertion('p3_planning_status_completed');

mustHave(evidencePacketDoc, 'Blank placeholders are **not** approval', 'evidence packet doc');
mustHave(captureDraftDoc, 'Blank placeholders are **not** approval', 'capture draft doc');
passAssertion('blank_placeholders_are_not_approval');

mustHave(
  evidencePacketDoc,
  '"All approved" is **insufficient** for execution without exact scoped values',
  'evidence packet doc',
);
mustHave(
  captureDraftDoc,
  '"All approved" is **insufficient** for execution without exact values',
  'capture draft doc',
);
passAssertion('all_approved_insufficient_without_exact_values');

mustHave(
  evidencePacketDoc,
  'Evidence review does **not** equal approval',
  'evidence packet doc',
);
passAssertion('evidence_review_does_not_equal_approval');

mustHave(
  evidencePacketDoc,
  'Sandbox/test-mode approval still requires separate exact Jason approval',
  'evidence packet doc',
);
passAssertion('sandbox_test_mode_approval_requires_separate_jason_approval');

mustHave(
  evidencePacketDoc,
  'Live activation still requires separate later approval',
  'evidence packet doc',
);
passAssertion('live_activation_requires_separate_later_approval');

mustHave(evidencePacketDoc, 'exact_values_required_count | 19', 'evidence packet doc');
mustHave(evidencePacketDoc, 'exact_values_filled_count | 0', 'evidence packet doc');
mustHave(evidencePacketDoc, 'all_exact_values_filled | false', 'evidence packet doc');
passAssertion('exact_values_required_count_19');
passAssertion('exact_values_filled_count_0');
passAssertion('all_exact_values_filled_false');

for (let i = 0; i < EXACT_VALUE_FIELDS.length; i += 1) {
  const field = EXACT_VALUE_FIELDS[i];
  const rowNum = i + 1;
  mustHave(
    evidencePacketDoc,
    `| ${rowNum} | ${field} | blank | not_captured | false |`,
    'evidence packet doc',
  );
}
passAssertion('evidence_packet_all_19_completeness_matrix_rows_present');

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
  evidencePacketDoc,
  'does **not** approve sandbox/test-mode activation',
  'evidence packet doc',
);
passAssertion('evidence_packet_does_not_approve_sandbox_test_mode_activation');
mustHave(evidencePacketDoc, 'Live activation remains **not granted**', 'evidence packet doc');
passAssertion('evidence_packet_live_activation_remains_not_granted');

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

mustHave(evidencePacketDoc, 'capture_draft_capture_status | blank_draft_only', 'evidence packet doc');
passAssertion('capture_draft_capture_status_blank_draft_only');

mustHave(evidencePacketDoc, 'approved_for_activation_now | false', 'evidence packet doc');
passAssertion('approved_for_activation_now_false');
mustHave(
  evidencePacketDoc,
  'command_execution_status | not_run_by_this_packet',
  'evidence packet doc',
);
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(evidencePacketDoc, 'approved_channels | []', 'evidence packet doc');
passAssertion('approved_channels_empty');
mustHave(evidencePacketDoc, 'approved_external_services | []', 'evidence packet doc');
passAssertion('approved_external_services_empty');
mustHave(evidencePacketDoc, 'live_activation_allowed | false', 'evidence packet doc');
passAssertion('live_activation_allowed_false');
mustHave(
  evidencePacketDoc,
  'sandbox_test_mode_activation_allowed | false',
  'evidence packet doc',
);
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(evidencePacketDoc, 'external_calls_allowed | false', 'evidence packet doc');
passAssertion('external_calls_allowed_false');
mustHave(evidencePacketDoc, 'credentials_access_allowed | false', 'evidence packet doc');
passAssertion('credentials_access_allowed_false');
mustHave(evidencePacketDoc, 'production_data_access_allowed | false', 'evidence packet doc');
passAssertion('production_data_access_allowed_false');
mustHave(
  evidencePacketDoc,
  'schema_auth_rls_security_changes_allowed | false',
  'evidence packet doc',
);
passAssertion('schema_auth_rls_security_changes_allowed_false');
mustHave(
  evidencePacketDoc,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'evidence packet doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
mustHave(evidencePacketDoc, 'billing_payment_automation_allowed | false', 'evidence packet doc');
passAssertion('billing_payment_automation_allowed_false');
mustHave(
  evidencePacketDoc,
  'public_go_live_or_production_copy_changes_allowed | false',
  'evidence packet doc',
);
passAssertion('public_go_live_or_production_copy_changes_allowed_false');
mustHave(
  evidencePacketDoc,
  'real_demo_sandbox_live_testing_allowed | false',
  'evidence packet doc',
);
passAssertion('real_demo_sandbox_live_testing_allowed_false');

mustHave(
  evidencePacketDoc,
  'old 90-day plan cannot override current source-of-truth direction',
  'evidence packet doc',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(evidencePacketDoc, 'This is **not** approval to activate anything', 'evidence packet doc');
mustHave(
  evidencePacketDoc,
  'does **not** approve sandbox/test-mode activation',
  'evidence packet doc',
);
passAssertion('does_not_approve_activation');

mustHave(evidencePacketDoc, 'Twilio', 'evidence packet doc');
mustHave(evidencePacketDoc, 'webhook', 'evidence packet doc');
mustHave(evidencePacketDoc, 'scheduler', 'evidence packet doc');
mustHave(evidencePacketDoc, 'billing', 'evidence packet doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(evidencePacketDoc, 'public_website_go_live_copy_changed | false', 'evidence packet doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(
  evidencePacketDoc,
  'does **not** run the final activation command',
  'evidence packet doc',
);
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, evidenceFixturePath))) {
  fail(`missing structured evidence fixture: ${evidenceFixturePath}`);
}
passAssertion('structured_evidence_fixture_present');

if (!fs.existsSync(path.join(root, captureDraftFixturePath))) {
  fail(`missing capture draft fixture: ${captureDraftFixturePath}`);
}
passAssertion('capture_draft_fixture_present');

const evidenceFixture = readJson(evidenceFixturePath);
const captureDraftFixture = readJson(captureDraftFixturePath);

if (evidenceFixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('evidence fixture source_of_truth_commit must be 6b2fe60');
}
if (evidenceFixture.packet_status !== 'review_only') {
  fail('evidence fixture packet_status must be review_only');
}
if (evidenceFixture.completeness_status !== 'incomplete') {
  fail('evidence fixture completeness_status must be incomplete');
}
if (evidenceFixture.approval_status !== 'not_granted') {
  fail('evidence fixture approval_status must be not_granted');
}
if (evidenceFixture.sandbox_test_mode_approval_status !== 'not_granted') {
  fail('evidence fixture sandbox_test_mode_approval_status must be not_granted');
}
if (evidenceFixture.live_activation_approval_status !== 'not_granted') {
  fail('evidence fixture live_activation_approval_status must be not_granted');
}
if (evidenceFixture.local_evidence_chain_status !== 'passed') {
  fail('evidence fixture local_evidence_chain_status must be passed');
}
if (evidenceFixture.p1_polish_status !== 'completed') {
  fail('evidence fixture p1_polish_status must be completed');
}
if (evidenceFixture.p2_refinement_status !== 'completed') {
  fail('evidence fixture p2_refinement_status must be completed');
}
if (evidenceFixture.p3_planning_status !== 'completed') {
  fail('evidence fixture p3_planning_status must be completed');
}
if (evidenceFixture.current_recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('evidence fixture current_recommended_next_step mismatch');
}
if (evidenceFixture.p0_blockers_count !== 0) fail('evidence fixture p0_blockers_count must be 0');
if (evidenceFixture.exact_values_required_count !== 19) {
  fail('evidence fixture exact_values_required_count must be 19');
}
if (evidenceFixture.exact_values_filled_count !== 0) {
  fail('evidence fixture exact_values_filled_count must be 0');
}
if (evidenceFixture.all_exact_values_filled !== false) {
  fail('evidence fixture all_exact_values_filled must be false');
}
if (evidenceFixture.blank_placeholders_are_not_approval !== true) {
  fail('evidence fixture blank_placeholders_are_not_approval must be true');
}
if (evidenceFixture.all_approved_insufficient_without_exact_values !== true) {
  fail('evidence fixture all_approved_insufficient_without_exact_values must be true');
}
if (evidenceFixture.evidence_review_does_not_equal_approval !== true) {
  fail('evidence fixture evidence_review_does_not_equal_approval must be true');
}
if (evidenceFixture.sandbox_test_mode_approval_requires_separate_jason_approval !== true) {
  fail('evidence fixture sandbox_test_mode_approval_requires_separate_jason_approval must be true');
}
if (evidenceFixture.live_activation_requires_separate_later_approval !== true) {
  fail('evidence fixture live_activation_requires_separate_later_approval must be true');
}
if (evidenceFixture.reviewed_capture_draft_capture_status !== 'blank_draft_only') {
  fail('evidence fixture reviewed_capture_draft_capture_status must be blank_draft_only');
}

if (
  !evidenceFixture.exact_values_completeness_matrix ||
  typeof evidenceFixture.exact_values_completeness_matrix !== 'object'
) {
  fail('evidence fixture exact_values_completeness_matrix missing');
}
for (const field of EXACT_VALUE_FIELDS) {
  const entry = evidenceFixture.exact_values_completeness_matrix[field];
  if (!entry) fail(`evidence fixture exact_values_completeness_matrix missing ${field}`);
  if (entry.capture_draft_status !== 'blank') {
    fail(`evidence fixture exact_values_completeness_matrix.${field}.capture_draft_status must be blank`);
  }
  if (entry.completeness_review_status !== 'not_captured') {
    fail(
      `evidence fixture exact_values_completeness_matrix.${field}.completeness_review_status must be not_captured`,
    );
  }
}

if (!captureDraftFixture.exact_values || typeof captureDraftFixture.exact_values !== 'object') {
  fail('capture draft fixture exact_values object missing');
}
for (const field of EXACT_VALUE_FIELDS) {
  if (!(field in captureDraftFixture.exact_values)) {
    fail(`capture draft fixture exact_values missing ${field}`);
  }
  if (captureDraftFixture.exact_values[field] !== '') {
    fail(`capture draft fixture exact_values.${field} must be blank`);
  }
}
passAssertion('capture_draft_all_19_exact_values_blank');

if (evidenceFixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('evidence fixture command_execution_status must be not_run_by_this_packet');
}
if (evidenceFixture.approved_for_activation_now !== false) {
  fail('evidence fixture approved_for_activation_now must be false');
}
if (!Array.isArray(evidenceFixture.approved_channels) || evidenceFixture.approved_channels.length !== 0) {
  fail('evidence fixture approved_channels must be empty');
}
if (
  !Array.isArray(evidenceFixture.approved_external_services) ||
  evidenceFixture.approved_external_services.length !== 0
) {
  fail('evidence fixture approved_external_services must be empty');
}
if (evidenceFixture.live_activation_allowed !== false) {
  fail('evidence fixture live_activation_allowed must be false');
}
if (evidenceFixture.sandbox_test_mode_activation_allowed !== false) {
  fail('evidence fixture sandbox_test_mode_activation_allowed must be false');
}
if (evidenceFixture.external_calls_allowed !== false) {
  fail('evidence fixture external_calls_allowed must be false');
}
if (evidenceFixture.credentials_access_allowed !== false) {
  fail('evidence fixture credentials_access_allowed must be false');
}
if (evidenceFixture.production_data_access_allowed !== false) {
  fail('evidence fixture production_data_access_allowed must be false');
}
if (evidenceFixture.schema_auth_rls_security_changes_allowed !== false) {
  fail('evidence fixture schema_auth_rls_security_changes_allowed must be false');
}
if (evidenceFixture.public_route_webhook_scheduler_cron_dispatcher_allowed !== false) {
  fail('evidence fixture public_route_webhook_scheduler_cron_dispatcher_allowed must be false');
}
if (evidenceFixture.billing_payment_automation_allowed !== false) {
  fail('evidence fixture billing_payment_automation_allowed must be false');
}
if (evidenceFixture.public_go_live_or_production_copy_changes_allowed !== false) {
  fail('evidence fixture public_go_live_or_production_copy_changes_allowed must be false');
}
if (evidenceFixture.real_demo_sandbox_live_testing_allowed !== false) {
  fail('evidence fixture real_demo_sandbox_live_testing_allowed must be false');
}
if (evidenceFixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('evidence fixture safety_status mismatch');
}
if (
  evidenceFixture.old_90_day_plan_boundary !==
  'old 90-day plan cannot override current source-of-truth direction'
) {
  fail('evidence fixture old_90_day_plan_boundary mismatch');
}
if (
  !Array.isArray(evidenceFixture.evidence_chain_commits) ||
  evidenceFixture.evidence_chain_commits.length !== 15
) {
  fail('evidence fixture evidence_chain_commits must contain 15 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!evidenceFixture.evidence_chain_commits.includes(commit)) {
    fail(`evidence fixture evidence_chain_commits missing ${commit}`);
  }
}
passAssertion('structured_evidence_fixture_valid_json');

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

mustHave(
  aggregate,
  'verify-native-workflow-fixture-exact-values-completeness-review-evidence-packet-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Exact Values Completeness Review Evidence Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, evidencePacketDocPath, 'verifier index');
mustHave(verifierIndex, evidenceFixturePath, 'verifier index');
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
mustHave(wrapper, 'exact values completeness review evidence packet', 'wrapper mode');
mustHave(wrapper, 'Blank placeholders are not approval', 'wrapper mode');
mustHave(wrapper, 'Completeness status is incomplete', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(evidencePacketDoc, captureDraftDocPath, 'evidence packet doc');
mustHave(evidencePacketDoc, worksheetDocPath, 'evidence packet doc');
mustHave(evidencePacketDoc, completenessReviewDocPath, 'evidence packet doc');
mustHave(evidencePacketDoc, captureDraftFixturePath, 'evidence packet doc');
mustHave(evidencePacketDoc, captureDraftVerifierPath, 'evidence packet doc');
mustHave(evidencePacketDoc, captureDraftWrapperPath, 'evidence packet doc');

if (REQUIRED_ASSERTIONS.length !== 82) {
  fail(`REQUIRED_ASSERTIONS must contain 82 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Exact Values Completeness Review Evidence Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);