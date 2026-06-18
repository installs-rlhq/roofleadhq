#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const approvalRequestDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SEPARATE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_PACKET.md';
const scopeChecklistDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_SCOPE_CHECKLIST.md';
const noGoStopConditionDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md';
const evidenceRequirementsDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EVIDENCE_REQUIREMENTS.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/separate-sandbox-test-mode-approval-request-packet.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-separate-sandbox-test-mode-approval-request-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-separate-sandbox-test-mode-approval-request-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '04e0de6';
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
];
const RECOMMENDED_NEXT_STEP = 'JASON_REVIEW_SEPARATE_SANDBOX_TEST_MODE_APPROVAL_REQUEST';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const SCOPE_CHECKLIST_SECTIONS = [
  'Services in Scope',
  'Services out of Scope',
  'Test Accounts in Scope',
  'Environments in Scope',
  'Credentials/Env Vars in Scope',
  'Commands in Scope',
  'External Calls in Scope',
  'Data Boundaries',
  'Messaging/Contact Permission Boundaries',
  'Appointment/Calendar Boundaries',
  'Reporting/CSV Boundaries',
  'Rollback Owner',
  'Evidence Owner',
  'Log Path',
  'Approval Expiry',
];

const NO_GO_STOP_CONDITIONS = [
  { condition: 'missing exact command', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'missing exact environment', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'missing test account', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'missing credential boundary', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'missing external service boundary', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'missing production data boundary', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'missing rollback owner', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'missing evidence owner', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'source-of-truth mismatch', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'dirty git status', decision: 'NO_GO_KEEP_BLOCKED' },
  {
    condition: 'pilot readiness not demo_ready_with_live_automation_disabled',
    decision: 'NO_GO_KEEP_BLOCKED',
  },
  { condition: 'safe readiness failure', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'backend build failure', decision: 'NO_GO_KEEP_BLOCKED' },
  { condition: 'unexpected live service indicator', decision: 'STOP_AND_ROLL_BACK' },
  { condition: 'unexpected production data access', decision: 'STOP_AND_ROLL_BACK' },
  { condition: 'unexpected external call', decision: 'STOP_AND_ROLL_BACK' },
  { condition: 'unexpected schema/auth/RLS/security change', decision: 'STOP_AND_ROLL_BACK' },
  {
    condition: 'unexpected public route/webhook/scheduler/cron/dispatcher change',
    decision: 'STOP_AND_ROLL_BACK',
  },
  {
    condition: 'unexpected billing/payment/quote/estimate/invoice behavior',
    decision: 'STOP_AND_ROLL_BACK',
  },
  { condition: 'any homeowner/roofer real-data ambiguity', decision: 'STOP_AND_ROLL_BACK' },
  { condition: 'any approval ambiguity', decision: 'STOP_AND_ROLL_BACK' },
];

const EVIDENCE_REQUIREMENTS = [
  'pre-run source-of-truth verification',
  'pre-run clean git status',
  'pre-run pilot readiness',
  'pre-run safe readiness fast lane',
  'pre-run backend build',
  'exact command echo',
  'run timestamp',
  'log path',
  'service status before/after',
  'external call evidence',
  'credential access evidence',
  'production data evidence',
  'schema/auth/RLS/security evidence',
  'public route/webhook/scheduler/cron/dispatcher evidence',
  'billing/payment/quote/estimate/invoice evidence',
  'stop-condition evidence',
  'rollback evidence',
  'post-run pilot readiness',
  'post-run safe readiness',
  'post-run backend build',
  'post-run source-of-truth verification',
  'final clean status',
  'final Jason review decision',
];

const APPROVAL_REQUEST_PLACEHOLDERS = [
  'exact_approval_statement_placeholder',
  'exact_services_placeholder',
  'exact_test_accounts_placeholder',
  'exact_environment_placeholder',
  'exact_command_placeholder',
  'exact_credentials_boundary_placeholder',
  'exact_external_call_boundary_placeholder',
  'exact_production_data_boundary_placeholder',
  'exact_schema_auth_rls_security_boundary_placeholder',
  'exact_public_route_webhook_scheduler_cron_dispatcher_boundary_placeholder',
  'exact_stop_conditions_placeholder',
  'exact_rollback_owner_placeholder',
  'exact_evidence_owner_placeholder',
  'exact_log_path_placeholder',
  'approval_expiry_placeholder',
];

const REQUIRED_ASSERTIONS = [
  'approval_request_doc_present',
  'scope_checklist_doc_present',
  'no_go_stop_condition_doc_present',
  'evidence_requirements_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'source_of_truth_commit_04e0de6_referenced',
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
  'request_status_draft_only',
  'approval_status_not_granted',
  'sandbox_test_mode_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'local_evidence_chain_status_passed',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'approval_request_exact_approval_statement_placeholder',
  'approval_request_exact_services_placeholder',
  'approval_request_exact_test_accounts_placeholder',
  'approval_request_exact_environment_placeholder',
  'approval_request_exact_command_placeholder',
  'approval_request_exact_credentials_boundary_placeholder',
  'approval_request_exact_external_call_boundary_placeholder',
  'approval_request_exact_production_data_boundary_placeholder',
  'approval_request_exact_schema_auth_rls_security_boundary_placeholder',
  'approval_request_exact_public_route_webhook_scheduler_cron_dispatcher_boundary_placeholder',
  'approval_request_exact_stop_conditions_placeholder',
  'approval_request_exact_rollback_owner_placeholder',
  'approval_request_exact_evidence_owner_placeholder',
  'approval_request_exact_log_path_placeholder',
  'approval_request_approval_expiry_placeholder',
  'approval_request_does_not_approve_sandbox_test_mode_activation',
  'approval_request_live_activation_remains_not_granted',
  'approval_request_if_approved_later_must_be_exact_and_scoped',
  'scope_checklist_services_in_scope_section',
  'scope_checklist_services_out_of_scope_section',
  'scope_checklist_test_accounts_in_scope_section',
  'scope_checklist_environments_in_scope_section',
  'scope_checklist_credentials_env_vars_in_scope_section',
  'scope_checklist_commands_in_scope_section',
  'scope_checklist_external_calls_in_scope_section',
  'scope_checklist_data_boundaries_section',
  'scope_checklist_messaging_contact_permission_boundaries_section',
  'scope_checklist_appointment_calendar_boundaries_section',
  'scope_checklist_reporting_csv_boundaries_section',
  'scope_checklist_rollback_owner_section',
  'scope_checklist_evidence_owner_section',
  'scope_checklist_log_path_section',
  'scope_checklist_approval_expiry_section',
  'scope_checklist_all_sections_not_approved_until_completed',
  'no_go_missing_exact_command_maps_to_no_go_keep_blocked',
  'no_go_missing_exact_environment_maps_to_no_go_keep_blocked',
  'no_go_missing_test_account_maps_to_no_go_keep_blocked',
  'no_go_missing_credential_boundary_maps_to_no_go_keep_blocked',
  'no_go_missing_external_service_boundary_maps_to_no_go_keep_blocked',
  'no_go_missing_production_data_boundary_maps_to_no_go_keep_blocked',
  'no_go_missing_rollback_owner_maps_to_no_go_keep_blocked',
  'no_go_missing_evidence_owner_maps_to_no_go_keep_blocked',
  'no_go_source_of_truth_mismatch_maps_to_no_go_keep_blocked',
  'no_go_dirty_git_status_maps_to_no_go_keep_blocked',
  'no_go_pilot_readiness_not_demo_ready_maps_to_no_go_keep_blocked',
  'no_go_safe_readiness_failure_maps_to_no_go_keep_blocked',
  'no_go_backend_build_failure_maps_to_no_go_keep_blocked',
  'stop_unexpected_live_service_indicator_maps_to_stop_and_roll_back',
  'stop_unexpected_production_data_access_maps_to_stop_and_roll_back',
  'stop_unexpected_external_call_maps_to_stop_and_roll_back',
  'stop_unexpected_schema_auth_rls_security_change_maps_to_stop_and_roll_back',
  'stop_unexpected_public_route_webhook_scheduler_cron_dispatcher_change_maps_to_stop_and_roll_back',
  'stop_unexpected_billing_payment_quote_estimate_invoice_behavior_maps_to_stop_and_roll_back',
  'stop_homeowner_roofer_real_data_ambiguity_maps_to_stop_and_roll_back',
  'stop_approval_ambiguity_maps_to_stop_and_roll_back',
  'evidence_pre_run_source_of_truth_verification',
  'evidence_pre_run_clean_git_status',
  'evidence_pre_run_pilot_readiness',
  'evidence_pre_run_safe_readiness_fast_lane',
  'evidence_pre_run_backend_build',
  'evidence_exact_command_echo',
  'evidence_run_timestamp',
  'evidence_log_path',
  'evidence_service_status_before_after',
  'evidence_external_call_evidence',
  'evidence_credential_access_evidence',
  'evidence_production_data_evidence',
  'evidence_schema_auth_rls_security_evidence',
  'evidence_public_route_webhook_scheduler_cron_dispatcher_evidence',
  'evidence_billing_payment_quote_estimate_invoice_evidence',
  'evidence_stop_condition_evidence',
  'evidence_rollback_evidence',
  'evidence_post_run_pilot_readiness',
  'evidence_post_run_safe_readiness',
  'evidence_post_run_backend_build',
  'evidence_post_run_source_of_truth_verification',
  'evidence_final_clean_status',
  'evidence_final_jason_review_decision',
  'evidence_capture_does_not_equal_live_approval',
  'exact_approval_statement_required_true',
  'exact_services_required_true',
  'exact_test_accounts_required_true',
  'exact_environment_required_true',
  'exact_command_required_true',
  'exact_credentials_boundary_required_true',
  'exact_external_call_boundary_required_true',
  'exact_production_data_boundary_required_true',
  'exact_schema_auth_rls_security_boundary_required_true',
  'exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required_true',
  'exact_stop_conditions_required_true',
  'rollback_owner_required_true',
  'evidence_owner_required_true',
  'log_path_required_true',
  'approval_expiry_required_true',
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
  'NATIVE_WORKFLOW_FIXTURE_SEPARATE_SANDBOX_TEST_MODE_APPROVAL_REQUEST_PACKET.md',
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_SCOPE_CHECKLIST.md',
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md',
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EVIDENCE_REQUIREMENTS.md',
  'run-native-workflow-fixture-separate-sandbox-test-mode-approval-request-packet-dry-run.sh',
  'verify-native-workflow-fixture-separate-sandbox-test-mode-approval-request-packet-readonly.js',
  'separate-sandbox-test-mode-approval-request-packet.json',
  'Native Workflow Fixture Separate Sandbox/Test-Mode Approval Request Packet',
  'native workflow fixture separate sandbox test mode approval request packet',
  'separate sandbox test mode approval request packet',
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

const approvalRequestDoc = read(approvalRequestDocPath);
const scopeChecklistDoc = read(scopeChecklistDocPath);
const noGoStopConditionDoc = read(noGoStopConditionDocPath);
const evidenceRequirementsDoc = read(evidenceRequirementsDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${approvalRequestDoc}\n${scopeChecklistDoc}\n${noGoStopConditionDoc}\n${evidenceRequirementsDoc}`;

passAssertion('approval_request_doc_present');
passAssertion('scope_checklist_doc_present');
passAssertion('no_go_stop_condition_doc_present');
passAssertion('evidence_requirements_doc_present');

for (const doc of [
  approvalRequestDoc,
  scopeChecklistDoc,
  noGoStopConditionDoc,
  evidenceRequirementsDoc,
]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
}
passAssertion('source_of_truth_commit_04e0de6_referenced');

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

mustHave(approvalRequestDoc, 'request_status | draft_only', 'approval request doc');
passAssertion('request_status_draft_only');
mustHave(approvalRequestDoc, 'approval_status | not_granted', 'approval request doc');
passAssertion('approval_status_not_granted');
mustHave(
  approvalRequestDoc,
  'sandbox_test_mode_approval_status | not_granted',
  'approval request doc',
);
passAssertion('sandbox_test_mode_approval_status_not_granted');
mustHave(
  approvalRequestDoc,
  'live_activation_approval_status | not_granted',
  'approval request doc',
);
passAssertion('live_activation_approval_status_not_granted');
mustHave(approvalRequestDoc, 'local_evidence_chain_status | passed', 'approval request doc');
passAssertion('local_evidence_chain_status_passed');
mustHave(approvalRequestDoc, 'p0_blockers_count | 0', 'approval request doc');
passAssertion('p0_blockers_count_0');
mustHave(approvalRequestDoc, 'p1_polish_status | completed', 'approval request doc');
passAssertion('p1_polish_status_completed');
mustHave(approvalRequestDoc, 'p2_refinement_status | completed', 'approval request doc');
passAssertion('p2_refinement_status_completed');
mustHave(approvalRequestDoc, 'p3_planning_status | completed', 'approval request doc');
passAssertion('p3_planning_status_completed');

for (const placeholder of APPROVAL_REQUEST_PLACEHOLDERS) {
  mustHave(approvalRequestDoc, placeholder, 'approval request doc');
}
passAssertion('approval_request_exact_approval_statement_placeholder');
passAssertion('approval_request_exact_services_placeholder');
passAssertion('approval_request_exact_test_accounts_placeholder');
passAssertion('approval_request_exact_environment_placeholder');
passAssertion('approval_request_exact_command_placeholder');
passAssertion('approval_request_exact_credentials_boundary_placeholder');
passAssertion('approval_request_exact_external_call_boundary_placeholder');
passAssertion('approval_request_exact_production_data_boundary_placeholder');
passAssertion('approval_request_exact_schema_auth_rls_security_boundary_placeholder');
passAssertion('approval_request_exact_public_route_webhook_scheduler_cron_dispatcher_boundary_placeholder');
passAssertion('approval_request_exact_stop_conditions_placeholder');
passAssertion('approval_request_exact_rollback_owner_placeholder');
passAssertion('approval_request_exact_evidence_owner_placeholder');
passAssertion('approval_request_exact_log_path_placeholder');
passAssertion('approval_request_approval_expiry_placeholder');

mustHave(
  approvalRequestDoc,
  'does **not** approve sandbox/test-mode activation',
  'approval request doc',
);
passAssertion('approval_request_does_not_approve_sandbox_test_mode_activation');
mustHave(approvalRequestDoc, 'Live activation remains **not granted**', 'approval request doc');
passAssertion('approval_request_live_activation_remains_not_granted');
mustHave(
  approvalRequestDoc,
  'approval must be **exact and scoped**',
  'approval request doc',
);
passAssertion('approval_request_if_approved_later_must_be_exact_and_scoped');

for (const section of SCOPE_CHECKLIST_SECTIONS) {
  mustHave(scopeChecklistDoc, section, 'scope checklist doc');
}
passAssertion('scope_checklist_services_in_scope_section');
passAssertion('scope_checklist_services_out_of_scope_section');
passAssertion('scope_checklist_test_accounts_in_scope_section');
passAssertion('scope_checklist_environments_in_scope_section');
passAssertion('scope_checklist_credentials_env_vars_in_scope_section');
passAssertion('scope_checklist_commands_in_scope_section');
passAssertion('scope_checklist_external_calls_in_scope_section');
passAssertion('scope_checklist_data_boundaries_section');
passAssertion('scope_checklist_messaging_contact_permission_boundaries_section');
passAssertion('scope_checklist_appointment_calendar_boundaries_section');
passAssertion('scope_checklist_reporting_csv_boundaries_section');
passAssertion('scope_checklist_rollback_owner_section');
passAssertion('scope_checklist_evidence_owner_section');
passAssertion('scope_checklist_log_path_section');
passAssertion('scope_checklist_approval_expiry_section');

for (const section of SCOPE_CHECKLIST_SECTIONS) {
  const sectionStart = scopeChecklistDoc.indexOf(`## ${section}`);
  if (sectionStart === -1) fail(`scope checklist section missing: ${section}`);
  const nextSection = scopeChecklistDoc.indexOf('\n## ', sectionStart + 1);
  const sectionText =
    nextSection === -1
      ? scopeChecklistDoc.slice(sectionStart)
      : scopeChecklistDoc.slice(sectionStart, nextSection);
  mustHave(sectionText, 'not approved until completed', `scope checklist section ${section}`);
}
passAssertion('scope_checklist_all_sections_not_approved_until_completed');

for (const item of NO_GO_STOP_CONDITIONS) {
  mustHave(noGoStopConditionDoc, item.condition, 'no-go/stop-condition doc');
  const rowStart = noGoStopConditionDoc.indexOf(item.condition);
  const rowSlice = noGoStopConditionDoc.slice(rowStart, rowStart + 200);
  mustHave(rowSlice, item.decision, `no-go/stop-condition row ${item.condition}`);
}
passAssertion('no_go_missing_exact_command_maps_to_no_go_keep_blocked');
passAssertion('no_go_missing_exact_environment_maps_to_no_go_keep_blocked');
passAssertion('no_go_missing_test_account_maps_to_no_go_keep_blocked');
passAssertion('no_go_missing_credential_boundary_maps_to_no_go_keep_blocked');
passAssertion('no_go_missing_external_service_boundary_maps_to_no_go_keep_blocked');
passAssertion('no_go_missing_production_data_boundary_maps_to_no_go_keep_blocked');
passAssertion('no_go_missing_rollback_owner_maps_to_no_go_keep_blocked');
passAssertion('no_go_missing_evidence_owner_maps_to_no_go_keep_blocked');
passAssertion('no_go_source_of_truth_mismatch_maps_to_no_go_keep_blocked');
passAssertion('no_go_dirty_git_status_maps_to_no_go_keep_blocked');
passAssertion('no_go_pilot_readiness_not_demo_ready_maps_to_no_go_keep_blocked');
passAssertion('no_go_safe_readiness_failure_maps_to_no_go_keep_blocked');
passAssertion('no_go_backend_build_failure_maps_to_no_go_keep_blocked');
passAssertion('stop_unexpected_live_service_indicator_maps_to_stop_and_roll_back');
passAssertion('stop_unexpected_production_data_access_maps_to_stop_and_roll_back');
passAssertion('stop_unexpected_external_call_maps_to_stop_and_roll_back');
passAssertion('stop_unexpected_schema_auth_rls_security_change_maps_to_stop_and_roll_back');
passAssertion('stop_unexpected_public_route_webhook_scheduler_cron_dispatcher_change_maps_to_stop_and_roll_back');
passAssertion('stop_unexpected_billing_payment_quote_estimate_invoice_behavior_maps_to_stop_and_roll_back');
passAssertion('stop_homeowner_roofer_real_data_ambiguity_maps_to_stop_and_roll_back');
passAssertion('stop_approval_ambiguity_maps_to_stop_and_roll_back');

for (const item of EVIDENCE_REQUIREMENTS) {
  mustHave(evidenceRequirementsDoc, item, 'evidence requirements doc');
}
passAssertion('evidence_pre_run_source_of_truth_verification');
passAssertion('evidence_pre_run_clean_git_status');
passAssertion('evidence_pre_run_pilot_readiness');
passAssertion('evidence_pre_run_safe_readiness_fast_lane');
passAssertion('evidence_pre_run_backend_build');
passAssertion('evidence_exact_command_echo');
passAssertion('evidence_run_timestamp');
passAssertion('evidence_log_path');
passAssertion('evidence_service_status_before_after');
passAssertion('evidence_external_call_evidence');
passAssertion('evidence_credential_access_evidence');
passAssertion('evidence_production_data_evidence');
passAssertion('evidence_schema_auth_rls_security_evidence');
passAssertion('evidence_public_route_webhook_scheduler_cron_dispatcher_evidence');
passAssertion('evidence_billing_payment_quote_estimate_invoice_evidence');
passAssertion('evidence_stop_condition_evidence');
passAssertion('evidence_rollback_evidence');
passAssertion('evidence_post_run_pilot_readiness');
passAssertion('evidence_post_run_safe_readiness');
passAssertion('evidence_post_run_backend_build');
passAssertion('evidence_post_run_source_of_truth_verification');
passAssertion('evidence_final_clean_status');
passAssertion('evidence_final_jason_review_decision');
mustHave(
  evidenceRequirementsDoc,
  'Evidence capture does **not** equal live approval',
  'evidence requirements doc',
);
passAssertion('evidence_capture_does_not_equal_live_approval');

mustHave(combinedDocs, 'exact_approval_statement_required | true', 'combined packet docs');
passAssertion('exact_approval_statement_required_true');
mustHave(combinedDocs, 'exact_services_required | true', 'combined packet docs');
passAssertion('exact_services_required_true');
mustHave(combinedDocs, 'exact_test_accounts_required | true', 'combined packet docs');
passAssertion('exact_test_accounts_required_true');
mustHave(combinedDocs, 'exact_environment_required | true', 'combined packet docs');
passAssertion('exact_environment_required_true');
mustHave(combinedDocs, 'exact_command_required | true', 'combined packet docs');
passAssertion('exact_command_required_true');
mustHave(combinedDocs, 'exact_credentials_boundary_required | true', 'combined packet docs');
passAssertion('exact_credentials_boundary_required_true');
mustHave(combinedDocs, 'exact_external_call_boundary_required | true', 'combined packet docs');
passAssertion('exact_external_call_boundary_required_true');
mustHave(combinedDocs, 'exact_production_data_boundary_required | true', 'combined packet docs');
passAssertion('exact_production_data_boundary_required_true');
mustHave(
  combinedDocs,
  'exact_schema_auth_rls_security_boundary_required | true',
  'combined packet docs',
);
passAssertion('exact_schema_auth_rls_security_boundary_required_true');
mustHave(
  combinedDocs,
  'exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required | true',
  'combined packet docs',
);
passAssertion('exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required_true');
mustHave(combinedDocs, 'exact_stop_conditions_required | true', 'combined packet docs');
passAssertion('exact_stop_conditions_required_true');
mustHave(combinedDocs, 'rollback_owner_required | true', 'combined packet docs');
passAssertion('rollback_owner_required_true');
mustHave(combinedDocs, 'evidence_owner_required | true', 'combined packet docs');
passAssertion('evidence_owner_required_true');
mustHave(combinedDocs, 'log_path_required | true', 'combined packet docs');
passAssertion('log_path_required_true');
mustHave(combinedDocs, 'approval_expiry_required | true', 'combined packet docs');
passAssertion('approval_expiry_required_true');

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

mustHave(noGoStopConditionDoc, 'Twilio', 'no-go/stop-condition doc');
mustHave(noGoStopConditionDoc, 'webhook', 'no-go/stop-condition doc');
mustHave(noGoStopConditionDoc, 'scheduler', 'no-go/stop-condition doc');
mustHave(noGoStopConditionDoc, 'billing', 'no-go/stop-condition doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(combinedDocs, 'public_website_go_live_copy_changed | false', 'combined packet docs');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(
  approvalRequestDoc,
  'does **not** run the final activation command',
  'approval request doc',
);
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 04e0de6');
}
if (fixture.packet_status !== 'review_only') fail('fixture packet_status must be review_only');
if (fixture.request_status !== 'draft_only') fail('fixture request_status must be draft_only');
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
if (fixture.scope_checklist_sections_count !== 15) {
  fail('fixture scope_checklist_sections_count must be 15');
}
if (fixture.no_go_stop_condition_items_count !== 21) {
  fail('fixture no_go_stop_condition_items_count must be 21');
}
if (fixture.evidence_requirement_items_count !== 23) {
  fail('fixture evidence_requirement_items_count must be 23');
}
if (fixture.exact_approval_statement_required !== true) {
  fail('fixture exact_approval_statement_required must be true');
}
if (fixture.exact_services_required !== true) fail('fixture exact_services_required must be true');
if (fixture.exact_test_accounts_required !== true) {
  fail('fixture exact_test_accounts_required must be true');
}
if (fixture.exact_environment_required !== true) {
  fail('fixture exact_environment_required must be true');
}
if (fixture.exact_command_required !== true) fail('fixture exact_command_required must be true');
if (fixture.exact_credentials_boundary_required !== true) {
  fail('fixture exact_credentials_boundary_required must be true');
}
if (fixture.exact_external_call_boundary_required !== true) {
  fail('fixture exact_external_call_boundary_required must be true');
}
if (fixture.exact_production_data_boundary_required !== true) {
  fail('fixture exact_production_data_boundary_required must be true');
}
if (fixture.exact_schema_auth_rls_security_boundary_required !== true) {
  fail('fixture exact_schema_auth_rls_security_boundary_required must be true');
}
if (fixture.exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required !== true) {
  fail(
    'fixture exact_public_route_webhook_scheduler_cron_dispatcher_boundary_required must be true',
  );
}
if (fixture.exact_stop_conditions_required !== true) {
  fail('fixture exact_stop_conditions_required must be true');
}
if (fixture.rollback_owner_required !== true) fail('fixture rollback_owner_required must be true');
if (fixture.evidence_owner_required !== true) fail('fixture evidence_owner_required must be true');
if (fixture.log_path_required !== true) fail('fixture log_path_required must be true');
if (fixture.approval_expiry_required !== true) {
  fail('fixture approval_expiry_required must be true');
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
if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 13) {
  fail('fixture evidence_chain_commits must contain 13 commits');
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
  'verify-native-workflow-fixture-separate-sandbox-test-mode-approval-request-packet-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Separate Sandbox/Test-Mode Approval Request Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, approvalRequestDocPath, 'verifier index');
mustHave(verifierIndex, scopeChecklistDocPath, 'verifier index');
mustHave(verifierIndex, noGoStopConditionDocPath, 'verifier index');
mustHave(verifierIndex, evidenceRequirementsDocPath, 'verifier index');
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
mustHave(wrapper, 'separate sandbox/test-mode approval request', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(approvalRequestDoc, scopeChecklistDocPath, 'approval request doc');
mustHave(approvalRequestDoc, noGoStopConditionDocPath, 'approval request doc');
mustHave(approvalRequestDoc, evidenceRequirementsDocPath, 'approval request doc');
mustHave(approvalRequestDoc, fixturePath, 'approval request doc');

if (REQUIRED_ASSERTIONS.length !== 156) {
  fail(`REQUIRED_ASSERTIONS must contain 156 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Separate Sandbox/Test-Mode Approval Request Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);