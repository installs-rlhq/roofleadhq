#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_JASON_APPROVAL_CAPTURE_PACKET.md';
const worksheetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_WORKSHEET.md';
const templateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_FINAL_JASON_APPROVAL_STATEMENT_TEMPLATE.md';
const approvalRequestReadyDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_READY_PACKET.md';
const acceptanceBoundaryDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_RECOMMENDED_DEFAULTS_ACCEPTANCE_BOUNDARY_PACKET.md';
const acceptEditReplaceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_RECOMMENDED_DEFAULTS_ACCEPT_EDIT_REPLACE_TEMPLATE.md';
const proposalDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_RECOMMENDED_DEFAULTS_PROPOSAL.md';
const worksheetReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_JASON_REVIEW_WORKSHEET.md';
const channelValidationDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_PLAN.md';
const noGoStopDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-jason-approval-capture-packet.json';
const approvalRequestReadyFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-approval-request-ready-packet.json';
const acceptanceBoundaryFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-recommended-defaults-acceptance-boundary-packet.json';
const proposalFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-recommended-defaults-proposal.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-sandbox-test-mode-jason-approval-capture-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-jason-approval-capture-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '878fc77';
const UPSTREAM_APPROVAL_REQUEST_READY_COMMIT = '7f375a4';
const UPSTREAM_ACCEPTANCE_BOUNDARY_COMMIT = 'b6d852c';
const UPSTREAM_PROPOSAL_COMMIT = '0cceb00';
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
];
const RECOMMENDED_NEXT_STEP = 'JASON_RECORD_SANDBOX_TEST_MODE_SIGNED_APPROVAL_STATEMENT';
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

const CAPTURE_WORKSHEET_FIELDS = [
  'exact_approval_text',
  'approval_timestamp',
  'scope',
  'services',
  'environment',
  'command',
  'stop_conditions',
  'rollback_owner',
  'evidence_owner',
  'expiry',
  'one_time_use_limitation',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'worksheet_doc_present',
  'template_doc_present',
  'approval_request_ready_doc_present',
  'acceptance_boundary_doc_present',
  'proposal_doc_present',
  'worksheet_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_approval_request_ready_fixture_present',
  'upstream_acceptance_boundary_fixture_present',
  'upstream_proposal_fixture_present',
  'source_of_truth_commit_878fc77_referenced',
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
  'prior_commit_b6d852c_referenced',
  'prior_commit_7f375a4_referenced',
  'prior_commit_878fc77_referenced',
  'local_demo_e2e_evidence_chain_status_passed',
  'local_demo_evidence_freeze_release_candidate_review_status_completed',
  'local_demo_release_candidate_management_summary_jason_review_status_completed',
  'roofer_pilot_essentials_planning_batch_status_completed',
  'recommended_defaults_proposal_status_recommended_defaults_proposed_only',
  'recommended_defaults_acceptance_boundary_status_completed',
  'approval_request_ready_status_completed',
  'approval_capture_status_not_captured',
  'jason_signed_approval_status_not_signed',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'recommended_defaults_are_not_approval',
  'recommended_defaults_are_not_accepted_exact_values',
  'jason_review_worksheet_does_not_equal_approval',
  'accept_edit_replace_template_does_not_equal_approval',
  'acceptance_boundary_does_not_equal_approval',
  'approval_request_ready_packet_does_not_equal_approval',
  'approval_capture_worksheet_does_not_equal_approval',
  'final_jason_approval_statement_template_does_not_equal_approval',
  'exact_values_required_count_19',
  'recommended_exact_values_proposed_count_19',
  'accepted_exact_values_count_0',
  'accepted_exact_values_filled_count_0',
  'approved_exact_values_filled_count_0',
  'exact_values_filled_count_0',
  'all_exact_values_filled_false',
  'completeness_status_incomplete',
  'default_sandbox_test_mode_decision_hold',
  'approval_status_not_granted',
  'sandbox_test_mode_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'template_all_19_recommended_default_rows_present',
  'fixture_all_19_accepted_exact_values_blank',
  'fixture_all_19_approved_exact_values_blank',
  'fixture_all_11_capture_worksheet_fields_blank',
  'fixture_all_11_capture_worksheet_field_statuses_not_captured',
  'upstream_proposal_all_19_recommended_exact_values_filled',
  'packet_does_not_approve_sandbox_test_mode_activation',
  'packet_live_activation_remains_not_granted',
  'captured_jason_approval_statement_not_captured_not_signed_not_granted',
  'jason_final_approval_statement_not_signed_not_granted_template_only',
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
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_JASON_APPROVAL_CAPTURE_PACKET.md',
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_WORKSHEET.md',
  'run-native-workflow-fixture-sandbox-test-mode-jason-approval-capture-packet-dry-run.sh',
  'verify-native-workflow-fixture-sandbox-test-mode-jason-approval-capture-packet-readonly.js',
  'sandbox-test-mode-jason-approval-capture-packet.json',
  'Native Workflow Fixture Sandbox/Test-Mode Jason Approval Capture Packet',
  'native workflow fixture sandbox test mode jason approval capture packet',
  'sandbox test mode jason approval capture packet',
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

const packetDoc = read(packetDocPath);
const worksheetDoc = read(worksheetDocPath);
const templateDoc = read(templateDocPath);
const approvalRequestReadyDoc = read(approvalRequestReadyDocPath);
const acceptanceBoundaryDoc = read(acceptanceBoundaryDocPath);
const acceptEditReplaceDoc = read(acceptEditReplaceDocPath);
const proposalDoc = read(proposalDocPath);
const worksheetReviewDoc = read(worksheetReviewDocPath);
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
const combinedDocs = `${packetDoc}\n${worksheetDoc}\n${templateDoc}\n${proposalDoc}`;

passAssertion('packet_doc_present');
passAssertion('worksheet_doc_present');
passAssertion('template_doc_present');
passAssertion('approval_request_ready_doc_present');
passAssertion('acceptance_boundary_doc_present');
passAssertion('proposal_doc_present');
passAssertion('worksheet_review_doc_present');

for (const doc of [packetDoc, worksheetDoc]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
}
passAssertion('source_of_truth_commit_878fc77_referenced');

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
passAssertion('prior_commit_b6d852c_referenced');
passAssertion('prior_commit_7f375a4_referenced');
passAssertion('prior_commit_878fc77_referenced');

mustHave(packetDoc, 'local_demo_e2e_evidence_chain_status | passed', 'packet doc');
passAssertion('local_demo_e2e_evidence_chain_status_passed');
mustHave(
  packetDoc,
  'local_demo_evidence_freeze_release_candidate_review_status | completed',
  'packet doc',
);
passAssertion('local_demo_evidence_freeze_release_candidate_review_status_completed');
mustHave(
  packetDoc,
  'local_demo_release_candidate_management_summary_jason_review_status | completed',
  'packet doc',
);
passAssertion('local_demo_release_candidate_management_summary_jason_review_status_completed');
mustHave(
  packetDoc,
  'roofer_pilot_essentials_planning_batch_status | completed',
  'packet doc',
);
passAssertion('roofer_pilot_essentials_planning_batch_status_completed');

mustHave(
  packetDoc,
  'recommended_defaults_proposal_status | recommended_defaults_proposed_only',
  'packet doc',
);
passAssertion('recommended_defaults_proposal_status_recommended_defaults_proposed_only');
mustHave(
  packetDoc,
  'recommended_defaults_acceptance_boundary_status | completed',
  'packet doc',
);
passAssertion('recommended_defaults_acceptance_boundary_status_completed');
mustHave(packetDoc, 'approval_request_ready_status | completed', 'packet doc');
passAssertion('approval_request_ready_status_completed');
mustHave(packetDoc, 'approval_capture_status | not_captured', 'packet doc');
passAssertion('approval_capture_status_not_captured');
mustHave(packetDoc, 'jason_signed_approval_status | not_signed', 'packet doc');
passAssertion('jason_signed_approval_status_not_signed');
mustHave(packetDoc, 'p0_blockers_count | 0', 'packet doc');
passAssertion('p0_blockers_count_0');
mustHave(packetDoc, 'p1_polish_status | completed', 'packet doc');
passAssertion('p1_polish_status_completed');
mustHave(packetDoc, 'p2_refinement_status | completed', 'packet doc');
passAssertion('p2_refinement_status_completed');
mustHave(packetDoc, 'p3_planning_status | completed', 'packet doc');
passAssertion('p3_planning_status_completed');

mustHave(packetDoc, 'Recommended defaults are **not** approval', 'packet doc');
mustHave(templateDoc, 'Recommended defaults are **not** approval', 'template doc');
passAssertion('recommended_defaults_are_not_approval');

mustHave(
  packetDoc,
  'Recommended defaults are **not** accepted exact values',
  'packet doc',
);
mustHave(
  templateDoc,
  'Recommended defaults are **not** accepted exact values',
  'template doc',
);
passAssertion('recommended_defaults_are_not_accepted_exact_values');

mustHave(
  packetDoc,
  'Jason review worksheet does **not** equal approval',
  'packet doc',
);
passAssertion('jason_review_worksheet_does_not_equal_approval');

mustHave(
  packetDoc,
  'Accept/edit/replace template does **not** equal approval',
  'packet doc',
);
passAssertion('accept_edit_replace_template_does_not_equal_approval');

mustHave(
  packetDoc,
  'Acceptance boundary does **not** equal approval',
  'packet doc',
);
mustHave(
  templateDoc,
  'Acceptance boundary does **not** equal approval',
  'template doc',
);
passAssertion('acceptance_boundary_does_not_equal_approval');

mustHave(
  packetDoc,
  'Approval request ready packet does **not** equal approval',
  'packet doc',
);
mustHave(
  templateDoc,
  'Approval request ready packet does **not** equal approval',
  'template doc',
);
passAssertion('approval_request_ready_packet_does_not_equal_approval');

mustHave(
  packetDoc,
  'Approval capture worksheet does **not** equal approval',
  'packet doc',
);
mustHave(
  worksheetDoc,
  'Approval capture worksheet does **not** equal approval',
  'worksheet doc',
);
passAssertion('approval_capture_worksheet_does_not_equal_approval');

mustHave(
  packetDoc,
  'Final Jason approval statement template does **not** equal approval',
  'packet doc',
);
mustHave(
  worksheetDoc,
  'Final Jason approval statement template does **not** equal approval',
  'worksheet doc',
);
passAssertion('final_jason_approval_statement_template_does_not_equal_approval');

mustHave(packetDoc, 'exact_values_required_count | 19', 'packet doc');
mustHave(packetDoc, 'recommended_exact_values_proposed_count | 19', 'packet doc');
mustHave(packetDoc, 'accepted_exact_values_count | 0', 'packet doc');
mustHave(packetDoc, 'accepted_exact_values_filled_count | 0', 'packet doc');
mustHave(packetDoc, 'approved_exact_values_filled_count | 0', 'packet doc');
mustHave(packetDoc, 'exact_values_filled_count | 0', 'packet doc');
mustHave(packetDoc, 'all_exact_values_filled | false', 'packet doc');
mustHave(packetDoc, 'completeness_status | incomplete', 'packet doc');
passAssertion('exact_values_required_count_19');
passAssertion('recommended_exact_values_proposed_count_19');
passAssertion('accepted_exact_values_count_0');
passAssertion('accepted_exact_values_filled_count_0');
passAssertion('approved_exact_values_filled_count_0');
passAssertion('exact_values_filled_count_0');
passAssertion('all_exact_values_filled_false');
passAssertion('completeness_status_incomplete');

mustHave(packetDoc, 'default_sandbox_test_mode_decision | HOLD', 'packet doc');
mustHave(packetDoc, 'Default sandbox/test-mode decision remains **HOLD**', 'packet doc');
passAssertion('default_sandbox_test_mode_decision_hold');

mustHave(packetDoc, 'approval_status | not_granted', 'packet doc');
passAssertion('approval_status_not_granted');
mustHave(packetDoc, 'sandbox_test_mode_approval_status | not_granted', 'packet doc');
passAssertion('sandbox_test_mode_approval_status_not_granted');
mustHave(packetDoc, 'live_activation_approval_status | not_granted', 'packet doc');
passAssertion('live_activation_approval_status_not_granted');

const proposalFixture = readJson(proposalFixturePath);
for (let i = 0; i < EXACT_VALUE_FIELDS.length; i += 1) {
  const field = EXACT_VALUE_FIELDS[i];
  const rowNum = i + 1;
  const recommended = proposalFixture.recommended_exact_values[field];
  mustHave(templateDoc, `> ${rowNum}. ${field}:`, 'template doc');
  mustHave(templateDoc, recommended, 'template doc');
}
passAssertion('template_all_19_recommended_default_rows_present');

for (let i = 0; i < CAPTURE_WORKSHEET_FIELDS.length; i += 1) {
  const field = CAPTURE_WORKSHEET_FIELDS[i];
  const rowNum = i + 1;
  mustHave(worksheetDoc, `| ${rowNum} | ${field} | not_captured |`, 'worksheet doc');
}

mustHave(
  packetDoc,
  'does **not** approve sandbox/test-mode activation',
  'packet doc',
);
passAssertion('packet_does_not_approve_sandbox_test_mode_activation');
mustHave(packetDoc, 'Live activation remains **not granted**', 'packet doc');
passAssertion('packet_live_activation_remains_not_granted');

mustHave(packetDoc, 'NOT CAPTURED / NOT SIGNED / NOT GRANTED', 'packet doc');
mustHave(worksheetDoc, 'not_captured', 'worksheet doc');
mustHave(
  packetDoc,
  'approval_capture_status | not_captured',
  'packet doc',
);
mustHave(
  packetDoc,
  'jason_signed_approval_status | not_signed',
  'packet doc',
);
passAssertion('captured_jason_approval_statement_not_captured_not_signed_not_granted');

mustHave(packetDoc, 'NOT SIGNED / NOT GRANTED / TEMPLATE ONLY', 'packet doc');
mustHave(templateDoc, 'NOT SIGNED / NOT GRANTED / TEMPLATE ONLY', 'template doc');
mustHave(
  packetDoc,
  'jason_final_approval_statement_status | NOT_SIGNED_NOT_GRANTED_TEMPLATE_ONLY',
  'packet doc',
);
mustHave(packetDoc, 'jason_final_approval_statement_signed | false', 'packet doc');
mustHave(packetDoc, 'jason_final_approval_statement_granted | false', 'packet doc');
passAssertion('jason_final_approval_statement_not_signed_not_granted_template_only');

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

mustHave(packetDoc, 'Twilio', 'packet doc');
mustHave(packetDoc, 'webhook', 'packet doc');
mustHave(packetDoc, 'scheduler', 'packet doc');
mustHave(packetDoc, 'billing', 'packet doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(combinedDocs, 'public_website_go_live_copy_changed | false', 'combined packet docs');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(packetDoc, 'does **not** run the final activation command', 'packet doc');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');
mustHave(proposalDoc, RECOMMENDED_COMMAND, 'proposal doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, approvalRequestReadyFixturePath))) {
  fail(`missing upstream approval request ready fixture: ${approvalRequestReadyFixturePath}`);
}
passAssertion('upstream_approval_request_ready_fixture_present');

if (!fs.existsSync(path.join(root, acceptanceBoundaryFixturePath))) {
  fail(`missing upstream acceptance boundary fixture: ${acceptanceBoundaryFixturePath}`);
}
passAssertion('upstream_acceptance_boundary_fixture_present');

if (!fs.existsSync(path.join(root, proposalFixturePath))) {
  fail(`missing upstream proposal fixture: ${proposalFixturePath}`);
}
passAssertion('upstream_proposal_fixture_present');

const fixture = readJson(fixturePath);
const approvalRequestReadyFixture = readJson(approvalRequestReadyFixturePath);
const acceptanceBoundaryFixture = readJson(acceptanceBoundaryFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 878fc77');
}
if (fixture.packet_status !== 'review_only') {
  fail('fixture packet_status must be review_only');
}
if (fixture.review_status !== 'jason_approval_capture_review_only') {
  fail('fixture review_status must be jason_approval_capture_review_only');
}
if (fixture.approval_capture_status !== 'not_captured') {
  fail('fixture approval_capture_status must be not_captured');
}
if (fixture.jason_signed_approval_status !== 'not_signed') {
  fail('fixture jason_signed_approval_status must be not_signed');
}
if (fixture.approval_request_ready_status !== 'completed') {
  fail('fixture approval_request_ready_status must be completed');
}
if (fixture.recommended_defaults_acceptance_boundary_status !== 'completed') {
  fail('fixture recommended_defaults_acceptance_boundary_status must be completed');
}
if (fixture.recommended_defaults_proposal_status !== 'recommended_defaults_proposed_only') {
  fail('fixture recommended_defaults_proposal_status must be recommended_defaults_proposed_only');
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
if (fixture.accepted_exact_values_count !== 0) {
  fail('fixture accepted_exact_values_count must be 0');
}
if (fixture.accepted_exact_values_filled_count !== 0) {
  fail('fixture accepted_exact_values_filled_count must be 0');
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
if (fixture.recommended_defaults_are_not_accepted_exact_values !== true) {
  fail('fixture recommended_defaults_are_not_accepted_exact_values must be true');
}
if (fixture.jason_review_worksheet_does_not_equal_approval !== true) {
  fail('fixture jason_review_worksheet_does_not_equal_approval must be true');
}
if (fixture.accept_edit_replace_template_does_not_equal_approval !== true) {
  fail('fixture accept_edit_replace_template_does_not_equal_approval must be true');
}
if (fixture.acceptance_boundary_does_not_equal_approval !== true) {
  fail('fixture acceptance_boundary_does_not_equal_approval must be true');
}
if (fixture.approval_request_ready_packet_does_not_equal_approval !== true) {
  fail('fixture approval_request_ready_packet_does_not_equal_approval must be true');
}
if (fixture.approval_capture_worksheet_does_not_equal_approval !== true) {
  fail('fixture approval_capture_worksheet_does_not_equal_approval must be true');
}
if (fixture.final_jason_approval_statement_template_does_not_equal_approval !== true) {
  fail('fixture final_jason_approval_statement_template_does_not_equal_approval must be true');
}
if (fixture.default_sandbox_test_mode_decision !== 'HOLD') {
  fail('fixture default_sandbox_test_mode_decision must be HOLD');
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

if (!fixture.jason_approval_capture_worksheet) {
  fail('fixture jason_approval_capture_worksheet missing');
}
for (const field of CAPTURE_WORKSHEET_FIELDS) {
  if (!(field in fixture.jason_approval_capture_worksheet)) {
    fail(`fixture jason_approval_capture_worksheet missing ${field}`);
  }
  const value = fixture.jason_approval_capture_worksheet[field];
  if (typeof value !== 'string' || value.trim() !== '') {
    fail(`fixture jason_approval_capture_worksheet.${field} must be blank`);
  }
  const statusField = `${field}_status`;
  if (!(statusField in fixture.jason_approval_capture_worksheet)) {
    fail(`fixture jason_approval_capture_worksheet missing ${statusField}`);
  }
  if (fixture.jason_approval_capture_worksheet[statusField] !== 'not_captured') {
    fail(`fixture jason_approval_capture_worksheet.${statusField} must be not_captured`);
  }
}
passAssertion('fixture_all_11_capture_worksheet_fields_blank');
passAssertion('fixture_all_11_capture_worksheet_field_statuses_not_captured');

if (!fixture.captured_jason_approval_statement) {
  fail('fixture captured_jason_approval_statement missing');
}
if (fixture.captured_jason_approval_statement.status !== 'NOT_CAPTURED_NOT_SIGNED_NOT_GRANTED') {
  fail('fixture captured_jason_approval_statement.status mismatch');
}
if (fixture.captured_jason_approval_statement.captured !== false) {
  fail('fixture captured_jason_approval_statement.captured must be false');
}
if (fixture.captured_jason_approval_statement.signed !== false) {
  fail('fixture captured_jason_approval_statement.signed must be false');
}
if (fixture.captured_jason_approval_statement.granted !== false) {
  fail('fixture captured_jason_approval_statement.granted must be false');
}
if (fixture.captured_jason_approval_statement.capture_only !== true) {
  fail('fixture captured_jason_approval_statement.capture_only must be true');
}

if (!fixture.jason_final_approval_statement) {
  fail('fixture jason_final_approval_statement missing');
}
if (fixture.jason_final_approval_statement.status !== 'NOT_SIGNED_NOT_GRANTED_TEMPLATE_ONLY') {
  fail('fixture jason_final_approval_statement.status mismatch');
}
if (fixture.jason_final_approval_statement.signed !== false) {
  fail('fixture jason_final_approval_statement.signed must be false');
}
if (fixture.jason_final_approval_statement.granted !== false) {
  fail('fixture jason_final_approval_statement.granted must be false');
}
if (fixture.jason_final_approval_statement.template_only !== true) {
  fail('fixture jason_final_approval_statement.template_only must be true');
}

if (approvalRequestReadyFixture.source_of_truth_commit !== UPSTREAM_APPROVAL_REQUEST_READY_COMMIT) {
  fail('upstream approval request ready fixture source_of_truth_commit must be 7f375a4');
}
if (approvalRequestReadyFixture.approval_request_ready_status !== 'template_only_not_granted') {
  fail('upstream approval request ready fixture approval_request_ready_status mismatch');
}

if (acceptanceBoundaryFixture.source_of_truth_commit !== UPSTREAM_ACCEPTANCE_BOUNDARY_COMMIT) {
  fail('upstream acceptance boundary fixture source_of_truth_commit must be b6d852c');
}
if (acceptanceBoundaryFixture.acceptance_boundary_status !== 'acceptance_boundary_review_only') {
  fail('upstream acceptance boundary fixture acceptance_boundary_status mismatch');
}

if (proposalFixture.source_of_truth_commit !== UPSTREAM_PROPOSAL_COMMIT) {
  fail('upstream proposal fixture source_of_truth_commit must be 0cceb00');
}
if (proposalFixture.recommended_exact_values_proposed_count !== 19) {
  fail('upstream proposal fixture recommended_exact_values_proposed_count must be 19');
}
if (!proposalFixture.recommended_exact_values) {
  fail('upstream proposal fixture recommended_exact_values missing');
}
for (const field of EXACT_VALUE_FIELDS) {
  const recommended = proposalFixture.recommended_exact_values[field];
  if (typeof recommended !== 'string' || recommended.trim() === '') {
    fail(`upstream proposal fixture recommended_exact_values.${field} must be non-empty`);
  }
}
passAssertion('upstream_proposal_all_19_recommended_exact_values_filled');

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
  fixture.evidence_chain_commits.length !== 23
) {
  fail('fixture evidence_chain_commits must contain 23 commits');
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

mustHave(
  aggregate,
  'verify-native-workflow-fixture-sandbox-test-mode-jason-approval-capture-packet-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Sandbox/Test-Mode Jason Approval Capture Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, packetDocPath, 'verifier index');
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
mustHave(wrapper, 'review-only', 'wrapper mode');
mustHave(wrapper, 'Recommended defaults are not approval', 'wrapper mode');
mustHave(wrapper, 'Recommended defaults are not accepted exact values', 'wrapper mode');
mustHave(wrapper, 'Acceptance boundary does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Approval request ready packet does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Approval capture worksheet does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Final Jason approval statement template does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Default sandbox/test-mode decision remains HOLD', 'wrapper mode');
mustHave(wrapper, 'Sandbox/test-mode and live activation remain not granted', 'wrapper mode');
mustHave(wrapper, 'NOT CAPTURED / NOT SIGNED / NOT GRANTED', 'wrapper mode');
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

mustHave(packetDoc, worksheetDocPath, 'packet doc');
mustHave(packetDoc, templateDocPath, 'packet doc');
mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, approvalRequestReadyDocPath, 'packet doc');
mustHave(packetDoc, acceptanceBoundaryDocPath, 'packet doc');
mustHave(packetDoc, acceptEditReplaceDocPath, 'packet doc');
mustHave(packetDoc, proposalDocPath, 'packet doc');
mustHave(packetDoc, worksheetReviewDocPath, 'packet doc');
mustHave(packetDoc, channelValidationDocPath, 'packet doc');
mustHave(packetDoc, noGoStopDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 112) {
  fail(`REQUIRED_ASSERTIONS must contain 112 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Sandbox/Test-Mode Jason Approval Capture Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);