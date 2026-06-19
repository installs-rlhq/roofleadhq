#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const proposalDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_RECOMMENDED_DEFAULTS_PROPOSAL.md';
const worksheetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_JASON_REVIEW_WORKSHEET.md';
const rooferPilotEssentialsDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_ROOFER_PILOT_ESSENTIALS_PLANNING_BATCH.md';
const captureDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT.md';
const channelValidationDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_PLAN.md';
const noGoStopDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-recommended-defaults-proposal.json';
const rooferPilotEssentialsFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/roofer-pilot-essentials-planning-batch.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-sandbox-test-mode-exact-values-recommended-defaults-proposal-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-exact-values-recommended-defaults-proposal-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '0cceb00';
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
];
const RECOMMENDED_NEXT_STEP =
  'JASON_REVIEW_SANDBOX_TEST_MODE_EXACT_VALUES_RECOMMENDED_DEFAULTS_PROPOSAL';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';
const RECOMMENDED_COMMAND =
  'bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';

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

const RECOMMENDED_COUNTS = {
  total_sandbox_test_mode_validation_scenarios: 30,
  controlled_real_roofer_setup_steps: 12,
  controlled_real_roofer_limited_validation: 5,
};

const REQUIRED_ASSERTIONS = [
  'proposal_doc_present',
  'worksheet_doc_present',
  'roofer_pilot_essentials_doc_present',
  'capture_draft_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'source_of_truth_commit_0cceb00_referenced',
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
  'prior_commit_816dfc2_referenced',
  'prior_commit_ef79784_referenced',
  'prior_commit_2dd1016_referenced',
  'prior_commit_11e74d4_referenced',
  'prior_commit_0cceb00_referenced',
  'local_demo_e2e_evidence_chain_status_passed',
  'local_demo_evidence_freeze_release_candidate_review_status_completed',
  'local_demo_release_candidate_management_summary_jason_review_status_completed',
  'roofer_pilot_essentials_planning_batch_status_completed',
  'proposal_status_recommended_defaults_proposed_only',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'recommended_defaults_are_not_approval',
  'jason_review_worksheet_does_not_equal_approval',
  'exact_values_required_count_19',
  'recommended_exact_values_proposed_count_19',
  'approved_exact_values_filled_count_0',
  'exact_values_filled_count_0',
  'all_exact_values_filled_false',
  'completeness_status_incomplete',
  'default_sandbox_test_mode_decision_hold',
  'approval_status_not_granted',
  'sandbox_test_mode_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'proposal_all_19_recommended_default_sections_present',
  'worksheet_all_19_recommended_default_rows_present',
  'fixture_all_19_recommended_exact_values_filled',
  'fixture_all_19_approved_exact_values_blank',
  'proposal_does_not_approve_sandbox_test_mode_activation',
  'proposal_live_activation_remains_not_granted',
  'recommended_total_sandbox_test_mode_validation_30',
  'recommended_controlled_real_roofer_setup_steps_12',
  'recommended_controlled_real_roofer_limited_validation_5',
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
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_RECOMMENDED_DEFAULTS_PROPOSAL.md',
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_JASON_REVIEW_WORKSHEET.md',
  'run-native-workflow-fixture-sandbox-test-mode-exact-values-recommended-defaults-proposal-dry-run.sh',
  'verify-native-workflow-fixture-sandbox-test-mode-exact-values-recommended-defaults-proposal-readonly.js',
  'sandbox-test-mode-exact-values-recommended-defaults-proposal.json',
  'Native Workflow Fixture Sandbox/Test-Mode Exact Values Recommended Defaults Proposal',
  'native workflow fixture sandbox test mode exact values recommended defaults proposal',
  'sandbox test mode exact values recommended defaults proposal',
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

const proposalDoc = read(proposalDocPath);
const worksheetDoc = read(worksheetDocPath);
const rooferPilotEssentialsDoc = read(rooferPilotEssentialsDocPath);
const captureDraftDoc = read(captureDraftDocPath);
const channelValidationDoc = read(channelValidationDocPath);
const noGoStopDoc = read(noGoStopDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${proposalDoc}\n${worksheetDoc}\n${rooferPilotEssentialsDoc}`;

passAssertion('proposal_doc_present');
passAssertion('worksheet_doc_present');
passAssertion('roofer_pilot_essentials_doc_present');
passAssertion('capture_draft_doc_present');

for (const doc of [proposalDoc, worksheetDoc]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
}
passAssertion('source_of_truth_commit_0cceb00_referenced');

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
passAssertion('prior_commit_816dfc2_referenced');
passAssertion('prior_commit_ef79784_referenced');
passAssertion('prior_commit_2dd1016_referenced');
passAssertion('prior_commit_11e74d4_referenced');
passAssertion('prior_commit_0cceb00_referenced');

mustHave(proposalDoc, 'local_demo_e2e_evidence_chain_status | passed', 'proposal doc');
passAssertion('local_demo_e2e_evidence_chain_status_passed');
mustHave(
  proposalDoc,
  'local_demo_evidence_freeze_release_candidate_review_status | completed',
  'proposal doc',
);
passAssertion('local_demo_evidence_freeze_release_candidate_review_status_completed');
mustHave(
  proposalDoc,
  'local_demo_release_candidate_management_summary_jason_review_status | completed',
  'proposal doc',
);
passAssertion('local_demo_release_candidate_management_summary_jason_review_status_completed');
mustHave(
  proposalDoc,
  'roofer_pilot_essentials_planning_batch_status | completed',
  'proposal doc',
);
passAssertion('roofer_pilot_essentials_planning_batch_status_completed');

mustHave(proposalDoc, 'proposal_status | recommended_defaults_proposed_only', 'proposal doc');
passAssertion('proposal_status_recommended_defaults_proposed_only');
mustHave(proposalDoc, 'p0_blockers_count | 0', 'proposal doc');
passAssertion('p0_blockers_count_0');
mustHave(proposalDoc, 'p1_polish_status | completed', 'proposal doc');
passAssertion('p1_polish_status_completed');
mustHave(proposalDoc, 'p2_refinement_status | completed', 'proposal doc');
passAssertion('p2_refinement_status_completed');
mustHave(proposalDoc, 'p3_planning_status | completed', 'proposal doc');
passAssertion('p3_planning_status_completed');

mustHave(proposalDoc, 'Recommended defaults are **not** approval', 'proposal doc');
mustHave(worksheetDoc, 'Recommended defaults are **not** approval', 'worksheet doc');
passAssertion('recommended_defaults_are_not_approval');

mustHave(
  proposalDoc,
  'Jason review worksheet does **not** equal approval',
  'proposal doc',
);
mustHave(
  worksheetDoc,
  'Jason review worksheet does **not** equal approval',
  'worksheet doc',
);
passAssertion('jason_review_worksheet_does_not_equal_approval');

mustHave(proposalDoc, 'exact_values_required_count | 19', 'proposal doc');
mustHave(proposalDoc, 'recommended_exact_values_proposed_count | 19', 'proposal doc');
mustHave(proposalDoc, 'approved_exact_values_filled_count | 0', 'proposal doc');
mustHave(proposalDoc, 'exact_values_filled_count | 0', 'proposal doc');
mustHave(proposalDoc, 'all_exact_values_filled | false', 'proposal doc');
mustHave(proposalDoc, 'completeness_status | incomplete', 'proposal doc');
passAssertion('exact_values_required_count_19');
passAssertion('recommended_exact_values_proposed_count_19');
passAssertion('approved_exact_values_filled_count_0');
passAssertion('exact_values_filled_count_0');
passAssertion('all_exact_values_filled_false');
passAssertion('completeness_status_incomplete');

mustHave(proposalDoc, 'default_sandbox_test_mode_decision | HOLD', 'proposal doc');
mustHave(proposalDoc, 'Default sandbox/test-mode decision remains **HOLD**', 'proposal doc');
passAssertion('default_sandbox_test_mode_decision_hold');

mustHave(proposalDoc, 'approval_status | not_granted', 'proposal doc');
passAssertion('approval_status_not_granted');
mustHave(proposalDoc, 'sandbox_test_mode_approval_status | not_granted', 'proposal doc');
passAssertion('sandbox_test_mode_approval_status_not_granted');
mustHave(proposalDoc, 'live_activation_approval_status | not_granted', 'proposal doc');
passAssertion('live_activation_approval_status_not_granted');

for (let i = 0; i < EXACT_VALUE_FIELDS.length; i += 1) {
  const field = EXACT_VALUE_FIELDS[i];
  const sectionNum = i + 1;
  mustHave(proposalDoc, `### 5.${sectionNum}`, 'proposal doc');
  mustHave(proposalDoc, 'recommended_default_filled | true', 'proposal doc');
  mustHave(proposalDoc, 'approved_filled | false', 'proposal doc');
  mustHave(proposalDoc, 'RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED', 'proposal doc');
  mustHave(worksheetDoc, `| ${sectionNum} | ${field} |`, 'worksheet doc');
  mustHave(worksheetDoc, `| ${sectionNum} | ${field} |`, 'worksheet doc');
}
passAssertion('proposal_all_19_recommended_default_sections_present');
passAssertion('worksheet_all_19_recommended_default_rows_present');

mustHave(
  proposalDoc,
  'does **not** approve sandbox/test-mode activation',
  'proposal doc',
);
passAssertion('proposal_does_not_approve_sandbox_test_mode_activation');
mustHave(proposalDoc, 'Live activation remains **not granted**', 'proposal doc');
passAssertion('proposal_live_activation_remains_not_granted');

for (const [key, count] of Object.entries(RECOMMENDED_COUNTS)) {
  mustHave(proposalDoc, `${key} | ${count}`, 'proposal doc');
}
passAssertion('recommended_total_sandbox_test_mode_validation_30');
passAssertion('recommended_controlled_real_roofer_setup_steps_12');
passAssertion('recommended_controlled_real_roofer_limited_validation_5');

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

mustHave(proposalDoc, 'Twilio', 'proposal doc');
mustHave(proposalDoc, 'webhook', 'proposal doc');
mustHave(proposalDoc, 'scheduler', 'proposal doc');
mustHave(proposalDoc, 'billing', 'proposal doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(combinedDocs, 'public_website_go_live_copy_changed | false', 'combined packet docs');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(proposalDoc, 'does **not** run the final activation command', 'proposal doc');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');
mustHave(proposalDoc, RECOMMENDED_COMMAND, 'proposal doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
const rooferPilotFixture = readJson(rooferPilotEssentialsFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 0cceb00');
}
if (fixture.packet_status !== 'planning_only') {
  fail('fixture packet_status must be planning_only');
}
if (fixture.review_status !== 'recommended_defaults_review_only') {
  fail('fixture review_status must be recommended_defaults_review_only');
}
if (fixture.proposal_status !== 'recommended_defaults_proposed_only') {
  fail('fixture proposal_status must be recommended_defaults_proposed_only');
}
if (fixture.completeness_status !== 'incomplete') {
  fail('fixture completeness_status must be incomplete');
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
if (fixture.local_demo_e2e_evidence_chain_status !== 'passed') {
  fail('fixture local_demo_e2e_evidence_chain_status must be passed');
}
if (fixture.local_evidence_chain_status !== 'passed') {
  fail('fixture local_evidence_chain_status must be passed');
}
if (fixture.local_demo_evidence_freeze_release_candidate_review_status !== 'completed') {
  fail(
    'fixture local_demo_evidence_freeze_release_candidate_review_status must be completed',
  );
}
if (
  fixture.local_demo_release_candidate_management_summary_jason_review_status !== 'completed'
) {
  fail(
    'fixture local_demo_release_candidate_management_summary_jason_review_status must be completed',
  );
}
if (fixture.roofer_pilot_essentials_planning_batch_status !== 'completed') {
  fail('fixture roofer_pilot_essentials_planning_batch_status must be completed');
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
if (fixture.recommended_exact_values_proposed_count !== 19) {
  fail('fixture recommended_exact_values_proposed_count must be 19');
}
if (fixture.approved_exact_values_filled_count !== 0) {
  fail('fixture approved_exact_values_filled_count must be 0');
}
if (fixture.exact_values_filled_count !== 0) {
  fail('fixture exact_values_filled_count must be 0');
}
if (fixture.all_exact_values_filled !== false) {
  fail('fixture all_exact_values_filled must be false');
}
if (fixture.recommended_defaults_are_not_approval !== true) {
  fail('fixture recommended_defaults_are_not_approval must be true');
}
if (fixture.recommended_defaults_status !== 'RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED') {
  fail('fixture recommended_defaults_status mismatch');
}
if (fixture.jason_review_worksheet_does_not_equal_approval !== true) {
  fail('fixture jason_review_worksheet_does_not_equal_approval must be true');
}
if (fixture.default_sandbox_test_mode_decision !== 'HOLD') {
  fail('fixture default_sandbox_test_mode_decision must be HOLD');
}

for (const flag of EXACT_VALUE_REQUIRED_FLAGS) {
  if (fixture[flag] !== true) fail(`fixture ${flag} must be true`);
}

if (!fixture.recommended_exact_values || typeof fixture.recommended_exact_values !== 'object') {
  fail('fixture recommended_exact_values object missing');
}
if (!fixture.approved_exact_values || typeof fixture.approved_exact_values !== 'object') {
  fail('fixture approved_exact_values object missing');
}
for (const field of EXACT_VALUE_FIELDS) {
  if (!(field in fixture.recommended_exact_values)) {
    fail(`fixture recommended_exact_values missing ${field}`);
  }
  const recommended = fixture.recommended_exact_values[field];
  if (typeof recommended !== 'string' || recommended.trim() === '') {
    fail(`fixture recommended_exact_values.${field} must be non-empty`);
  }
  if (!(field in fixture.approved_exact_values)) {
    fail(`fixture approved_exact_values missing ${field}`);
  }
  const approved = fixture.approved_exact_values[field];
  if (typeof approved !== 'string' || approved.trim() !== '') {
    fail(`fixture approved_exact_values.${field} must be blank`);
  }
}
passAssertion('fixture_all_19_recommended_exact_values_filled');
passAssertion('fixture_all_19_approved_exact_values_blank');

for (const [key, count] of Object.entries(RECOMMENDED_COUNTS)) {
  if (fixture.recommended_default_scenario_counts[key] !== count) {
    fail(`fixture recommended_default_scenario_counts.${key} must be ${count}`);
  }
}

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
if (fixture.schema_auth_rls_security_changes_allowed !== false) {
  fail('fixture schema_auth_rls_security_changes_allowed must be false');
}
if (fixture.public_route_webhook_scheduler_cron_dispatcher_allowed !== false) {
  fail(
    'fixture public_route_webhook_scheduler_cron_dispatcher_allowed must be false',
  );
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
  !Array.isArray(fixture.evidence_chain_commits) ||
  fixture.evidence_chain_commits.length !== 20
) {
  fail('fixture evidence_chain_commits must contain 20 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}

if (rooferPilotFixture.source_of_truth_commit !== '11e74d4') {
  fail('upstream roofer pilot essentials fixture source_of_truth_commit must be 11e74d4');
}
if (rooferPilotFixture.packet_status !== 'planning_only') {
  fail('upstream roofer pilot essentials fixture packet_status must be planning_only');
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

mustHave(
  aggregate,
  'verify-native-workflow-fixture-sandbox-test-mode-exact-values-recommended-defaults-proposal-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Sandbox/Test-Mode Exact Values Recommended Defaults Proposal',
  'aggregate readiness',
);
mustHave(verifierIndex, proposalDocPath, 'verifier index');
mustHave(verifierIndex, worksheetDocPath, 'verifier index');
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
mustHave(wrapper, 'planning-only', 'wrapper mode');
mustHave(wrapper, 'Recommended defaults are not approval', 'wrapper mode');
mustHave(wrapper, 'Jason review worksheet does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Default sandbox/test-mode decision remains HOLD', 'wrapper mode');
mustHave(wrapper, 'Sandbox/test-mode and live activation remain not granted', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
mustNotHave(wrapper, RECOMMENDED_COMMAND, 'wrapper must not execute recommended command');
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(proposalDoc, worksheetDocPath, 'proposal doc');
mustHave(proposalDoc, fixturePath, 'proposal doc');
mustHave(proposalDoc, verifierPath, 'proposal doc');
mustHave(proposalDoc, wrapperPath, 'proposal doc');
mustHave(proposalDoc, rooferPilotEssentialsDocPath, 'proposal doc');
mustHave(proposalDoc, captureDraftDocPath, 'proposal doc');
mustHave(proposalDoc, channelValidationDocPath, 'proposal doc');
mustHave(proposalDoc, noGoStopDocPath, 'proposal doc');

if (REQUIRED_ASSERTIONS.length !== 109) {
  fail(`REQUIRED_ASSERTIONS must contain 109 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Sandbox/Test-Mode Exact Values Recommended Defaults Proposal verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);