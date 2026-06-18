#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const sandboxApprovalDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_DRAFT.md';
const liveActivationDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_LIVE_ACTIVATION_APPROVAL_REQUEST_DRAFT.md';
const commandTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_P3_EXACT_COMMAND_EXECUTION_APPROVAL_TEMPLATE.md';
const serviceMatrixDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_P3_CREDENTIAL_SERVICE_ENVIRONMENT_STOP_CONDITION_MATRIX.md';
const rollbackChecklistDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_P3_ROLLBACK_AND_EVIDENCE_CAPTURE_CHECKLIST.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/p3-future-approval-planning-packet.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-p3-future-approval-planning-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-p3-future-approval-planning-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = 'db9ece3';
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
];
const RECOMMENDED_NEXT_STEP =
  'HOLD_FOR_JASON_REVIEW_OR_PREPARE_SEPARATE_SANDBOX_TEST_MODE_APPROVAL_REQUEST';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const P3_ITEMS_COMPLETED = [
  'future_sandbox_test_mode_approval_request_draft',
  'future_live_activation_approval_request_draft',
  'exact_command_execution_approval_template',
  'credential_service_environment_stop_condition_matrix',
  'rollback_and_evidence_capture_checklist',
];

const SERVICE_MATRIX_ROWS = [
  'Twilio/SMS',
  'Vapi outbound',
  'Vapi webhook intake',
  'Resend',
  'Google Calendar',
  'Lindy',
  'Supabase test-mode',
  'Supabase production',
  'CSV/reporting delivery',
  'CRM sync',
  'billing/payment/quote/estimate/invoice automation',
];

const MATRIX_ROW_REQUIRED_FIELDS = [
  'current status',
  'approval status',
  'credential/env needed',
  'allowed environment',
  'blocked environment',
  'test account requirement',
  'stop condition',
  'rollback owner',
  'evidence requirement',
  'current decision',
];

const ROLLBACK_CHECKLIST_ITEMS = [
  'pre-run source-of-truth check',
  'pre-run clean git status',
  'pre-run pilot readiness',
  'pre-run safe readiness fast lane',
  'pre-run backend build',
  'exact command echo',
  'log file path',
  'run timestamp',
  'service status before/after',
  'external call evidence',
  'production data evidence',
  'credential access evidence',
  'stop-condition check',
  'rollback confirmation',
  'post-run pilot readiness',
  'post-run safe readiness',
  'post-run backend build',
  'post-run source-of-truth check',
  'final clean status',
  'decision: pass / pass with notes / hold / no-go',
];

const COMMAND_TEMPLATE_REQUIRED_FIELDS = [
  'command text',
  'working directory',
  'environment',
  'allowed side effects',
  'forbidden side effects',
  'Pre-Run Checks',
  'Post-Run Checks',
  'stop conditions',
  'rollback steps',
  'log path',
  'Jason Approval Signature/Date Placeholder',
];

const REQUIRED_ASSERTIONS = [
  'sandbox_test_mode_approval_request_draft_doc_present',
  'live_activation_approval_request_draft_doc_present',
  'exact_command_execution_approval_template_doc_present',
  'credential_service_environment_stop_condition_matrix_doc_present',
  'rollback_and_evidence_capture_checklist_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'source_of_truth_commit_db9ece3_referenced',
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
  'p3_planning_status_completed',
  'p3_item_future_sandbox_test_mode_approval_request_draft_completed',
  'p3_item_future_live_activation_approval_request_draft_completed',
  'p3_item_exact_command_execution_approval_template_completed',
  'p3_item_credential_service_environment_stop_condition_matrix_completed',
  'p3_item_rollback_and_evidence_capture_checklist_completed',
  'sandbox_draft_approval_status_not_granted',
  'sandbox_draft_does_not_approve_sandbox_test_mode_activation',
  'sandbox_draft_exact_services_named_before_approval',
  'sandbox_draft_exact_test_accounts_named_before_approval',
  'sandbox_draft_exact_environment_named_before_approval',
  'sandbox_draft_exact_command_named_before_approval',
  'sandbox_draft_exact_stop_conditions_named_before_approval',
  'sandbox_draft_exact_rollback_owner_named_before_approval',
  'sandbox_draft_exact_evidence_required_named_before_approval',
  'live_draft_approval_status_not_granted',
  'live_draft_does_not_approve_live_activation',
  'live_draft_requires_successful_sandbox_test_mode_evidence_first',
  'live_draft_named_live_services_required',
  'live_draft_named_credentials_env_vars_required',
  'live_draft_named_production_data_boundary_required',
  'live_draft_named_live_command_required',
  'live_draft_named_stop_conditions_required',
  'live_draft_named_rollback_owner_required',
  'live_draft_named_monitoring_evidence_owner_required',
  'command_template_command_approval_status_not_granted',
  'command_template_has_command_text_placeholder',
  'command_template_has_working_directory_placeholder',
  'command_template_has_environment_placeholder',
  'command_template_has_allowed_side_effects_placeholder',
  'command_template_has_forbidden_side_effects_placeholder',
  'command_template_has_pre_run_checks',
  'command_template_has_post_run_checks',
  'command_template_has_stop_conditions',
  'command_template_has_rollback_steps',
  'command_template_has_log_path',
  'command_template_has_jason_approval_placeholder',
  'command_template_no_command_approved',
  'service_matrix_row_twilio_sms_present',
  'service_matrix_row_vapi_outbound_present',
  'service_matrix_row_vapi_webhook_intake_present',
  'service_matrix_row_resend_present',
  'service_matrix_row_google_calendar_present',
  'service_matrix_row_lindy_present',
  'service_matrix_row_supabase_test_mode_present',
  'service_matrix_row_supabase_production_present',
  'service_matrix_row_csv_reporting_delivery_present',
  'service_matrix_row_crm_sync_present',
  'service_matrix_row_billing_payment_quote_estimate_invoice_automation_present',
  'service_matrix_row_required_fields_present',
  'service_matrix_all_approval_statuses_not_granted_or_blocked',
  'rollback_checklist_pre_run_source_of_truth_check_present',
  'rollback_checklist_pre_run_clean_git_status_present',
  'rollback_checklist_pre_run_pilot_readiness_present',
  'rollback_checklist_pre_run_safe_readiness_fast_lane_present',
  'rollback_checklist_pre_run_backend_build_present',
  'rollback_checklist_exact_command_echo_present',
  'rollback_checklist_log_file_path_present',
  'rollback_checklist_run_timestamp_present',
  'rollback_checklist_service_status_before_after_present',
  'rollback_checklist_external_call_evidence_present',
  'rollback_checklist_production_data_evidence_present',
  'rollback_checklist_credential_access_evidence_present',
  'rollback_checklist_stop_condition_check_present',
  'rollback_checklist_rollback_confirmation_present',
  'rollback_checklist_post_run_pilot_readiness_present',
  'rollback_checklist_post_run_safe_readiness_present',
  'rollback_checklist_post_run_backend_build_present',
  'rollback_checklist_post_run_source_of_truth_check_present',
  'rollback_checklist_final_clean_status_present',
  'rollback_checklist_decision_options_present',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'evidence_chain_status_passed',
  'p0_blockers_count_0',
  'current_recommended_next_step_hold_for_jason_review',
  'standing_local_build_approval_recorded',
  'standing_local_build_approval_scope_limited',
  'activation_approval_status_not_granted',
  'sandbox_test_mode_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'command_execution_status_not_run_by_this_packet',
  'approved_for_activation_now_false',
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
  'NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_DRAFT.md',
  'NATIVE_WORKFLOW_FIXTURE_P3_FUTURE_LIVE_ACTIVATION_APPROVAL_REQUEST_DRAFT.md',
  'NATIVE_WORKFLOW_FIXTURE_P3_EXACT_COMMAND_EXECUTION_APPROVAL_TEMPLATE.md',
  'NATIVE_WORKFLOW_FIXTURE_P3_CREDENTIAL_SERVICE_ENVIRONMENT_STOP_CONDITION_MATRIX.md',
  'NATIVE_WORKFLOW_FIXTURE_P3_ROLLBACK_AND_EVIDENCE_CAPTURE_CHECKLIST.md',
  'run-native-workflow-fixture-p3-future-approval-planning-packet-dry-run.sh',
  'verify-native-workflow-fixture-p3-future-approval-planning-packet-readonly.js',
  'p3-future-approval-planning-packet.json',
  'Native Workflow Fixture P3 Future Approval Planning Packet',
  'native workflow fixture p3 future approval planning packet',
  'p3 future approval planning packet',
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

const sandboxApprovalDoc = read(sandboxApprovalDocPath);
const liveActivationDoc = read(liveActivationDocPath);
const commandTemplateDoc = read(commandTemplateDocPath);
const serviceMatrixDoc = read(serviceMatrixDocPath);
const rollbackChecklistDoc = read(rollbackChecklistDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${sandboxApprovalDoc}\n${liveActivationDoc}\n${commandTemplateDoc}\n${serviceMatrixDoc}\n${rollbackChecklistDoc}`;

passAssertion('sandbox_test_mode_approval_request_draft_doc_present');
passAssertion('live_activation_approval_request_draft_doc_present');
passAssertion('exact_command_execution_approval_template_doc_present');
passAssertion('credential_service_environment_stop_condition_matrix_doc_present');
passAssertion('rollback_and_evidence_capture_checklist_doc_present');

for (const doc of [
  sandboxApprovalDoc,
  liveActivationDoc,
  commandTemplateDoc,
  serviceMatrixDoc,
  rollbackChecklistDoc,
]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'P3 planning doc');
}
passAssertion('source_of_truth_commit_db9ece3_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(combinedDocs, commit, 'combined P3 planning docs');
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

for (const item of P3_ITEMS_COMPLETED) {
  mustHave(combinedDocs, item, 'combined P3 planning docs');
}
mustHave(combinedDocs, 'p3_planning_status | completed', 'combined P3 planning docs');
passAssertion('p3_planning_status_completed');
passAssertion('p3_item_future_sandbox_test_mode_approval_request_draft_completed');
passAssertion('p3_item_future_live_activation_approval_request_draft_completed');
passAssertion('p3_item_exact_command_execution_approval_template_completed');
passAssertion('p3_item_credential_service_environment_stop_condition_matrix_completed');
passAssertion('p3_item_rollback_and_evidence_capture_checklist_completed');

mustHave(sandboxApprovalDoc, 'approval_status | not_granted', 'sandbox approval draft');
mustHave(sandboxApprovalDoc, 'sandbox_test_mode_approval_status | not_granted', 'sandbox approval draft');
mustHave(sandboxApprovalDoc, 'purpose | request template only', 'sandbox approval draft');
passAssertion('sandbox_draft_approval_status_not_granted');
mustHave(
  sandboxApprovalDoc,
  'does **not** approve sandbox/test-mode activation',
  'sandbox approval draft',
);
passAssertion('sandbox_draft_does_not_approve_sandbox_test_mode_activation');
mustHave(sandboxApprovalDoc, 'Exact services | must be named before approval', 'sandbox approval draft');
passAssertion('sandbox_draft_exact_services_named_before_approval');
mustHave(
  sandboxApprovalDoc,
  'Exact test accounts | must be named before approval',
  'sandbox approval draft',
);
passAssertion('sandbox_draft_exact_test_accounts_named_before_approval');
mustHave(
  sandboxApprovalDoc,
  'Exact environment | must be named before approval',
  'sandbox approval draft',
);
passAssertion('sandbox_draft_exact_environment_named_before_approval');
mustHave(sandboxApprovalDoc, 'Exact command | must be named before approval', 'sandbox approval draft');
passAssertion('sandbox_draft_exact_command_named_before_approval');
mustHave(
  sandboxApprovalDoc,
  'Exact stop conditions | must be named before approval',
  'sandbox approval draft',
);
passAssertion('sandbox_draft_exact_stop_conditions_named_before_approval');
mustHave(
  sandboxApprovalDoc,
  'Exact rollback owner | must be named before approval',
  'sandbox approval draft',
);
passAssertion('sandbox_draft_exact_rollback_owner_named_before_approval');
mustHave(
  sandboxApprovalDoc,
  'Exact evidence required | must be named before approval',
  'sandbox approval draft',
);
passAssertion('sandbox_draft_exact_evidence_required_named_before_approval');

mustHave(liveActivationDoc, 'approval_status | not_granted', 'live activation draft');
mustHave(liveActivationDoc, 'live_activation_approval_status | not_granted', 'live activation draft');
mustHave(liveActivationDoc, 'purpose | request template only', 'live activation draft');
passAssertion('live_draft_approval_status_not_granted');
mustHave(liveActivationDoc, 'does **not** approve live activation', 'live activation draft');
passAssertion('live_draft_does_not_approve_live_activation');
mustHave(
  liveActivationDoc,
  'must require successful sandbox/test-mode evidence first',
  'live activation draft',
);
mustHave(liveActivationDoc, 'successful sandbox/test-mode evidence first', 'live activation draft');
passAssertion('live_draft_requires_successful_sandbox_test_mode_evidence_first');
mustHave(liveActivationDoc, 'must require named live services', 'live activation draft');
passAssertion('live_draft_named_live_services_required');
mustHave(liveActivationDoc, 'must require named credentials/env vars', 'live activation draft');
passAssertion('live_draft_named_credentials_env_vars_required');
mustHave(
  liveActivationDoc,
  'must require named production data boundary',
  'live activation draft',
);
passAssertion('live_draft_named_production_data_boundary_required');
mustHave(liveActivationDoc, 'must require named live command', 'live activation draft');
passAssertion('live_draft_named_live_command_required');
mustHave(liveActivationDoc, 'must require named stop conditions', 'live activation draft');
passAssertion('live_draft_named_stop_conditions_required');
mustHave(liveActivationDoc, 'must require named rollback owner', 'live activation draft');
passAssertion('live_draft_named_rollback_owner_required');
mustHave(
  liveActivationDoc,
  'must require named monitoring/evidence owner',
  'live activation draft',
);
passAssertion('live_draft_named_monitoring_evidence_owner_required');

mustHave(commandTemplateDoc, 'command_approval_status | not_granted', 'command template');
passAssertion('command_template_command_approval_status_not_granted');
for (const field of COMMAND_TEMPLATE_REQUIRED_FIELDS) {
  mustHave(commandTemplateDoc, field, 'command template');
}
passAssertion('command_template_has_command_text_placeholder');
passAssertion('command_template_has_working_directory_placeholder');
passAssertion('command_template_has_environment_placeholder');
passAssertion('command_template_has_allowed_side_effects_placeholder');
passAssertion('command_template_has_forbidden_side_effects_placeholder');
passAssertion('command_template_has_pre_run_checks');
passAssertion('command_template_has_post_run_checks');
passAssertion('command_template_has_stop_conditions');
passAssertion('command_template_has_rollback_steps');
passAssertion('command_template_has_log_path');
passAssertion('command_template_has_jason_approval_placeholder');
mustHave(commandTemplateDoc, 'No command is approved by this template', 'command template');
passAssertion('command_template_no_command_approved');

for (const row of SERVICE_MATRIX_ROWS) {
  mustHave(serviceMatrixDoc, row, 'service matrix doc');
}
passAssertion('service_matrix_row_twilio_sms_present');
passAssertion('service_matrix_row_vapi_outbound_present');
passAssertion('service_matrix_row_vapi_webhook_intake_present');
passAssertion('service_matrix_row_resend_present');
passAssertion('service_matrix_row_google_calendar_present');
passAssertion('service_matrix_row_lindy_present');
passAssertion('service_matrix_row_supabase_test_mode_present');
passAssertion('service_matrix_row_supabase_production_present');
passAssertion('service_matrix_row_csv_reporting_delivery_present');
passAssertion('service_matrix_row_crm_sync_present');
passAssertion('service_matrix_row_billing_payment_quote_estimate_invoice_automation_present');

for (let i = 0; i < SERVICE_MATRIX_ROWS.length; i++) {
  const sectionStart = serviceMatrixDoc.indexOf(`### Row ${i + 1}:`);
  if (sectionStart === -1) fail(`service matrix section missing: Row ${i + 1}`);
  const section = serviceMatrixDoc.slice(sectionStart, sectionStart + 2500);
  for (const field of MATRIX_ROW_REQUIRED_FIELDS) {
    mustHave(section, field, `service matrix row ${i + 1}`);
  }
}
passAssertion('service_matrix_row_required_fields_present');

mustHave(serviceMatrixDoc, 'all approval statuses remain `not_granted` or `blocked`', 'service matrix doc');
mustHave(serviceMatrixDoc, 'approval status | not_granted', 'service matrix doc');
mustHave(serviceMatrixDoc, 'approval status | blocked', 'service matrix doc');
passAssertion('service_matrix_all_approval_statuses_not_granted_or_blocked');

for (const item of ROLLBACK_CHECKLIST_ITEMS) {
  mustHave(rollbackChecklistDoc, item, 'rollback checklist doc');
}
passAssertion('rollback_checklist_pre_run_source_of_truth_check_present');
passAssertion('rollback_checklist_pre_run_clean_git_status_present');
passAssertion('rollback_checklist_pre_run_pilot_readiness_present');
passAssertion('rollback_checklist_pre_run_safe_readiness_fast_lane_present');
passAssertion('rollback_checklist_pre_run_backend_build_present');
passAssertion('rollback_checklist_exact_command_echo_present');
passAssertion('rollback_checklist_log_file_path_present');
passAssertion('rollback_checklist_run_timestamp_present');
passAssertion('rollback_checklist_service_status_before_after_present');
passAssertion('rollback_checklist_external_call_evidence_present');
passAssertion('rollback_checklist_production_data_evidence_present');
passAssertion('rollback_checklist_credential_access_evidence_present');
passAssertion('rollback_checklist_stop_condition_check_present');
passAssertion('rollback_checklist_rollback_confirmation_present');
passAssertion('rollback_checklist_post_run_pilot_readiness_present');
passAssertion('rollback_checklist_post_run_safe_readiness_present');
passAssertion('rollback_checklist_post_run_backend_build_present');
passAssertion('rollback_checklist_post_run_source_of_truth_check_present');
passAssertion('rollback_checklist_final_clean_status_present');
passAssertion('rollback_checklist_decision_options_present');

mustHave(combinedDocs, 'p1_polish_status | completed', 'combined P3 planning docs');
passAssertion('p1_polish_status_completed');
mustHave(combinedDocs, 'p2_refinement_status | completed', 'combined P3 planning docs');
passAssertion('p2_refinement_status_completed');
mustHave(combinedDocs, 'evidence_chain_status | passed', 'combined P3 planning docs');
passAssertion('evidence_chain_status_passed');
mustHave(combinedDocs, 'p0_blockers_count | 0', 'combined P3 planning docs');
passAssertion('p0_blockers_count_0');
mustHave(combinedDocs, RECOMMENDED_NEXT_STEP, 'combined P3 planning docs');
passAssertion('current_recommended_next_step_hold_for_jason_review');

mustHave(
  combinedDocs,
  'standing_local_build_approval_recorded | true',
  'combined P3 planning docs',
);
passAssertion('standing_local_build_approval_recorded');
mustHave(
  combinedDocs,
  'local-only fake-data read-only dry-run review-only larger batches',
  'combined P3 planning docs',
);
passAssertion('standing_local_build_approval_scope_limited');

mustHave(combinedDocs, 'activation_approval_status | not_granted', 'combined P3 planning docs');
passAssertion('activation_approval_status_not_granted');
mustHave(
  combinedDocs,
  'sandbox_test_mode_approval_status | not_granted',
  'combined P3 planning docs',
);
passAssertion('sandbox_test_mode_approval_status_not_granted');
mustHave(
  combinedDocs,
  'live_activation_approval_status | not_granted',
  'combined P3 planning docs',
);
passAssertion('live_activation_approval_status_not_granted');
mustHave(
  combinedDocs,
  'command_execution_status | not_run_by_this_packet',
  'combined P3 planning docs',
);
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(combinedDocs, 'approved_for_activation_now | false', 'combined P3 planning docs');
passAssertion('approved_for_activation_now_false');
mustHave(combinedDocs, 'approved_channels | []', 'combined P3 planning docs');
passAssertion('approved_channels_empty');
mustHave(combinedDocs, 'approved_external_services | []', 'combined P3 planning docs');
passAssertion('approved_external_services_empty');

mustHave(combinedDocs, 'live_activation_allowed | false', 'combined P3 planning docs');
passAssertion('live_activation_allowed_false');
mustHave(
  combinedDocs,
  'sandbox_test_mode_activation_allowed | false',
  'combined P3 planning docs',
);
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(combinedDocs, 'external_calls_allowed | false', 'combined P3 planning docs');
passAssertion('external_calls_allowed_false');
mustHave(combinedDocs, 'credentials_access_allowed | false', 'combined P3 planning docs');
passAssertion('credentials_access_allowed_false');
mustHave(
  combinedDocs,
  'production_data_access_allowed | false',
  'combined P3 planning docs',
);
passAssertion('production_data_access_allowed_false');
mustHave(
  combinedDocs,
  'schema_auth_rls_security_changes_allowed | false',
  'combined P3 planning docs',
);
passAssertion('schema_auth_rls_security_changes_allowed_false');
mustHave(
  combinedDocs,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'combined P3 planning docs',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
mustHave(
  combinedDocs,
  'billing_payment_automation_allowed | false',
  'combined P3 planning docs',
);
passAssertion('billing_payment_automation_allowed_false');
mustHave(
  combinedDocs,
  'public_go_live_or_production_copy_changes_allowed | false',
  'combined P3 planning docs',
);
passAssertion('public_go_live_or_production_copy_changes_allowed_false');
mustHave(
  combinedDocs,
  'real_demo_sandbox_live_testing_allowed | false',
  'combined P3 planning docs',
);
passAssertion('real_demo_sandbox_live_testing_allowed_false');

mustHave(
  combinedDocs,
  'old 90-day plan cannot override current source-of-truth direction',
  'combined P3 planning docs',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(combinedDocs, 'This is **not** approval to activate anything', 'combined P3 planning docs');
mustHave(combinedDocs, 'does **not** approve live activation', 'combined P3 planning docs');
mustHave(
  combinedDocs,
  'does **not** approve sandbox/test-mode activation',
  'combined P3 planning docs',
);
passAssertion('does_not_approve_activation');

mustHave(serviceMatrixDoc, 'Twilio', 'service matrix doc');
mustHave(serviceMatrixDoc, 'webhook', 'service matrix doc');
mustHave(serviceMatrixDoc, 'scheduler', 'service matrix doc');
mustHave(serviceMatrixDoc, 'billing', 'service matrix doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(combinedDocs, 'public_website_go_live_copy_changed | false', 'combined P3 planning docs');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(
  sandboxApprovalDoc,
  'does **not** run the final activation command',
  'sandbox approval draft',
);
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be db9ece3');
}
if (fixture.packet_status !== 'review_only') fail('fixture packet_status must be review_only');
if (fixture.p3_planning_status !== 'completed') {
  fail('fixture p3_planning_status must be completed');
}
if (fixture.p1_polish_status !== 'completed') fail('fixture p1_polish_status must be completed');
if (fixture.p2_refinement_status !== 'completed') {
  fail('fixture p2_refinement_status must be completed');
}
if (fixture.evidence_chain_status !== 'passed') {
  fail('fixture evidence_chain_status must be passed');
}
if (fixture.current_recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('fixture current_recommended_next_step mismatch');
}
if (fixture.p0_blockers_count !== 0) fail('fixture p0_blockers_count must be 0');
if (fixture.service_matrix_rows_count !== 11) {
  fail('fixture service_matrix_rows_count must be 11');
}
if (fixture.rollback_checklist_items_count !== 20) {
  fail('fixture rollback_checklist_items_count must be 20');
}
for (const item of P3_ITEMS_COMPLETED) {
  if (!fixture.p3_items_completed.includes(item)) {
    fail(`fixture p3_items_completed missing ${item}`);
  }
}
if (fixture.standing_local_build_approval_recorded !== true) {
  fail('fixture standing_local_build_approval_recorded must be true');
}
if (
  fixture.standing_local_build_approval_scope !==
  'local-only fake-data read-only dry-run review-only larger batches'
) {
  fail('fixture standing_local_build_approval_scope mismatch');
}
if (fixture.activation_approval_status !== 'not_granted') {
  fail('fixture activation_approval_status must be not_granted');
}
if (fixture.sandbox_test_mode_approval_status !== 'not_granted') {
  fail('fixture sandbox_test_mode_approval_status must be not_granted');
}
if (fixture.live_activation_approval_status !== 'not_granted') {
  fail('fixture live_activation_approval_status must be not_granted');
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
if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 12) {
  fail('fixture evidence_chain_commits must contain 12 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}
passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(combinedDocs, phrase, 'combined P3 planning docs forbidden language');
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
  'verify-native-workflow-fixture-p3-future-approval-planning-packet-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Native Workflow Fixture P3 Future Approval Planning Packet', 'aggregate readiness');
mustHave(verifierIndex, sandboxApprovalDocPath, 'verifier index');
mustHave(verifierIndex, liveActivationDocPath, 'verifier index');
mustHave(verifierIndex, commandTemplateDocPath, 'verifier index');
mustHave(verifierIndex, serviceMatrixDocPath, 'verifier index');
mustHave(verifierIndex, rollbackChecklistDocPath, 'verifier index');
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
mustHave(wrapper, 'P3', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(sandboxApprovalDoc, liveActivationDocPath, 'sandbox approval draft');
mustHave(sandboxApprovalDoc, commandTemplateDocPath, 'sandbox approval draft');
mustHave(sandboxApprovalDoc, serviceMatrixDocPath, 'sandbox approval draft');
mustHave(sandboxApprovalDoc, rollbackChecklistDocPath, 'sandbox approval draft');
mustHave(sandboxApprovalDoc, fixturePath, 'sandbox approval draft');

if (REQUIRED_ASSERTIONS.length !== 134) {
  fail(`REQUIRED_ASSERTIONS must contain 134 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture P3 Future Approval Planning Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);