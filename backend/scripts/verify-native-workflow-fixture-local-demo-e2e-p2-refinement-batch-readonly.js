#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const fakeDataEdgeCaseDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_FAKE_DATA_EDGE_CASE_EXPANSION.md';
const old90DayPlanAuditDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_OLD_90_DAY_PLAN_RECONCILIATION_AUDIT.md';
const dashboardAdminChecklistDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_DASHBOARD_ADMIN_SCREENSHOT_CHECKLIST.md';
const csvReportingReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_CSV_REPORTING_EXAMPLE_REVIEW.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/local-demo-e2e-p2-refinement-batch.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-local-demo-e2e-p2-refinement-batch-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-local-demo-e2e-p2-refinement-batch-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '5ef9ef5';
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
];
const DEMO_ROOFER_NAME = 'Summit Peak Roofing Demo LLC';
const RECOMMENDED_NEXT_STEP = 'CONTINUE_LOCAL_REFINEMENT_OR_HOLD_FOR_REVIEW';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const P2_ITEMS_COMPLETED = [
  'fake_data_edge_case_expansion',
  'old_90_day_plan_reconciliation_audit_non_overriding',
  'local_dashboard_admin_screenshot_checklist_documentation_only',
  'local_csv_reporting_example_review_fake_data_only',
];

const EDGE_CASE_CATEGORIES = [
  'duplicate homeowner lead',
  'missing phone but email present',
  'phone present but no SMS permission',
  'ambiguous roof issue',
  'emergency/unsafe request',
  'renter/non-owner ambiguity',
  'out-of-service-area lead',
  'already has contractor',
  'reschedule repeated',
  'no-show repeated',
  'post-inspection stalled',
  'feedback permission unclear',
  'source attribution missing',
  'plan/usage boundary near limit',
  'unsupported quote/estimate/payment request',
];

const EDGE_CASE_REQUIRED_FIELDS = [
  '**Fake input example**',
  '**Expected local handling**',
  '**Review/escalation owner**',
  '**Blocked actions**',
  '**Verifier expectation**',
];

const DASHBOARD_CHECKLIST_ITEMS = [
  'Dashboard lead list',
  'Lead detail',
  'Review queue',
  'Appointment readiness',
  'Missed lead recovery',
  'Post-inspection follow-up',
  'Feedback permission',
  'Reporting/CSV',
  'Source ROI',
  'Usage/plan boundary',
  'Safety/status banner',
];

const DASHBOARD_REQUIRED_FIELDS = [
  '**What to look for**',
  '**Fake-data requirement**',
  '**Concern flag**',
  '**Screenshot filename placeholder**',
  '**No-production-data reminder**',
];

const CSV_REVIEW_GROUPS = [
  'Lead identity fields',
  'Contact permission fields',
  'Source attribution fields',
  'Appointment/inspection fields',
  'Review queue/escalation fields',
  'Post-inspection fields',
  'Feedback permission fields',
  'Source ROI fields',
  'Usage/plan fields',
  'Safety/status fields',
];

const REQUIRED_ASSERTIONS = [
  'fake_data_edge_case_expansion_doc_present',
  'old_90_day_plan_reconciliation_audit_doc_present',
  'dashboard_admin_screenshot_checklist_doc_present',
  'csv_reporting_example_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'source_of_truth_commit_5ef9ef5_referenced',
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
  'p2_refinement_status_completed',
  'p2_item_fake_data_edge_case_expansion_completed',
  'p2_item_old_90_day_plan_reconciliation_audit_non_overriding_completed',
  'p2_item_local_dashboard_admin_screenshot_checklist_documentation_only_completed',
  'p2_item_local_csv_reporting_example_review_fake_data_only_completed',
  'edge_case_category_duplicate_homeowner_lead_present',
  'edge_case_category_missing_phone_but_email_present_present',
  'edge_case_category_phone_present_but_no_sms_permission_present',
  'edge_case_category_ambiguous_roof_issue_present',
  'edge_case_category_emergency_unsafe_request_present',
  'edge_case_category_renter_non_owner_ambiguity_present',
  'edge_case_category_out_of_service_area_lead_present',
  'edge_case_category_already_has_contractor_present',
  'edge_case_category_reschedule_repeated_present',
  'edge_case_category_no_show_repeated_present',
  'edge_case_category_post_inspection_stalled_present',
  'edge_case_category_feedback_permission_unclear_present',
  'edge_case_category_source_attribution_missing_present',
  'edge_case_category_plan_usage_boundary_near_limit_present',
  'edge_case_category_unsupported_quote_estimate_payment_request_present',
  'edge_case_required_fields_per_category_present',
  'edge_case_no_new_live_routes_services_dispatch_behavior',
  'old_90_day_audit_audit_only_non_overriding',
  'current_source_of_truth_direction_wins',
  'reconciliation_category_keep_aligned_present',
  'reconciliation_category_defer_later_present',
  'reconciliation_category_reject_out_of_scope_present',
  'reconciliation_category_needs_jason_review_present',
  'no_implementation_changes_from_old_90_day_plan',
  'preserve_lead_to_inspection_positioning',
  'preserve_local_fake_data_testing_before_activation',
  'preserve_no_photo_collection_near_term_core',
  'preserve_no_generic_ai_receptionist_positioning',
  'preserve_no_instant_quote_estimate_payment_automation',
  'preserve_no_broad_crm_sync_near_term_core',
  'preserve_roofer_first_human_escalation',
  'preserve_guided_setup_before_trial',
  'preserve_hybrid_pricing_lead_volume_guardrail',
  'dashboard_checklist_item_dashboard_lead_list_present',
  'dashboard_checklist_item_lead_detail_present',
  'dashboard_checklist_item_review_queue_present',
  'dashboard_checklist_item_appointment_readiness_present',
  'dashboard_checklist_item_missed_lead_recovery_present',
  'dashboard_checklist_item_post_inspection_follow_up_present',
  'dashboard_checklist_item_feedback_permission_present',
  'dashboard_checklist_item_reporting_csv_present',
  'dashboard_checklist_item_source_roi_present',
  'dashboard_checklist_item_usage_plan_boundary_present',
  'dashboard_checklist_item_safety_status_banner_present',
  'dashboard_required_fields_per_item_present',
  'dashboard_documentation_only_unless_existing_files_present',
  'csv_review_group_lead_identity_fields_present',
  'csv_review_group_contact_permission_fields_present',
  'csv_review_group_source_attribution_fields_present',
  'csv_review_group_appointment_inspection_fields_present',
  'csv_review_group_review_queue_escalation_fields_present',
  'csv_review_group_post_inspection_fields_present',
  'csv_review_group_feedback_permission_fields_present',
  'csv_review_group_source_roi_fields_present',
  'csv_review_group_usage_plan_fields_present',
  'csv_review_group_safety_status_fields_present',
  'csv_reporting_one_directional_not_crm_sync',
  'permission_to_use_publicly_yes_no_not_asked_preserved',
  'no_live_csv_delivery',
  'no_external_crm_sync',
  'no_production_export',
  'p1_polish_status_completed',
  'evidence_chain_status_passed',
  'demo_roofer_fake',
  'scenario_count_25',
  'expected_outcome_count_25',
  'matched_outcome_count_25',
  'missing_outcome_count_0',
  'unexpected_outcome_count_0',
  'p0_blockers_count_0',
  'current_recommended_next_step_continue_local_refinement_or_hold_for_review',
  'standing_local_build_approval_recorded',
  'standing_local_build_approval_scope_limited',
  'activation_approval_status_not_granted',
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
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_FAKE_DATA_EDGE_CASE_EXPANSION.md',
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_OLD_90_DAY_PLAN_RECONCILIATION_AUDIT.md',
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_DASHBOARD_ADMIN_SCREENSHOT_CHECKLIST.md',
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_CSV_REPORTING_EXAMPLE_REVIEW.md',
  'run-native-workflow-fixture-local-demo-e2e-p2-refinement-batch-dry-run.sh',
  'verify-native-workflow-fixture-local-demo-e2e-p2-refinement-batch-readonly.js',
  'local-demo-e2e-p2-refinement-batch.json',
  'Native Workflow Fixture Local Demo E2E P2 Refinement Batch',
  'native workflow fixture local demo e2e p2 refinement batch',
  'local demo e2e p2 refinement batch',
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

const fakeDataEdgeCaseDoc = read(fakeDataEdgeCaseDocPath);
const old90DayPlanAuditDoc = read(old90DayPlanAuditDocPath);
const dashboardAdminChecklistDoc = read(dashboardAdminChecklistDocPath);
const csvReportingReviewDoc = read(csvReportingReviewDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${fakeDataEdgeCaseDoc}\n${old90DayPlanAuditDoc}\n${dashboardAdminChecklistDoc}\n${csvReportingReviewDoc}`;

passAssertion('fake_data_edge_case_expansion_doc_present');
passAssertion('old_90_day_plan_reconciliation_audit_doc_present');
passAssertion('dashboard_admin_screenshot_checklist_doc_present');
passAssertion('csv_reporting_example_review_doc_present');

for (const doc of [
  fakeDataEdgeCaseDoc,
  old90DayPlanAuditDoc,
  dashboardAdminChecklistDoc,
  csvReportingReviewDoc,
]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'P2 refinement doc');
}
passAssertion('source_of_truth_commit_5ef9ef5_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(combinedDocs, commit, 'combined P2 refinement docs');
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

for (const item of P2_ITEMS_COMPLETED) {
  mustHave(combinedDocs, item, 'combined P2 refinement docs');
}
passAssertion('p2_refinement_status_completed');
passAssertion('p2_item_fake_data_edge_case_expansion_completed');
passAssertion('p2_item_old_90_day_plan_reconciliation_audit_non_overriding_completed');
passAssertion('p2_item_local_dashboard_admin_screenshot_checklist_documentation_only_completed');
passAssertion('p2_item_local_csv_reporting_example_review_fake_data_only_completed');

for (const category of EDGE_CASE_CATEGORIES) {
  mustHave(fakeDataEdgeCaseDoc, category, 'fake data edge case doc');
}
passAssertion('edge_case_category_duplicate_homeowner_lead_present');
passAssertion('edge_case_category_missing_phone_but_email_present_present');
passAssertion('edge_case_category_phone_present_but_no_sms_permission_present');
passAssertion('edge_case_category_ambiguous_roof_issue_present');
passAssertion('edge_case_category_emergency_unsafe_request_present');
passAssertion('edge_case_category_renter_non_owner_ambiguity_present');
passAssertion('edge_case_category_out_of_service_area_lead_present');
passAssertion('edge_case_category_already_has_contractor_present');
passAssertion('edge_case_category_reschedule_repeated_present');
passAssertion('edge_case_category_no_show_repeated_present');
passAssertion('edge_case_category_post_inspection_stalled_present');
passAssertion('edge_case_category_feedback_permission_unclear_present');
passAssertion('edge_case_category_source_attribution_missing_present');
passAssertion('edge_case_category_plan_usage_boundary_near_limit_present');
passAssertion('edge_case_category_unsupported_quote_estimate_payment_request_present');

for (let i = 0; i < EDGE_CASE_CATEGORIES.length; i++) {
  const sectionStart = fakeDataEdgeCaseDoc.indexOf(`### Edge Case ${i + 1}:`);
  if (sectionStart === -1) fail(`edge case section missing: Edge Case ${i + 1}`);
  const section = fakeDataEdgeCaseDoc.slice(sectionStart, sectionStart + 2500);
  for (const field of EDGE_CASE_REQUIRED_FIELDS) {
    mustHave(section, field, `edge case ${i + 1}`);
  }
}
passAssertion('edge_case_required_fields_per_category_present');

mustHave(
  fakeDataEdgeCaseDoc,
  'No new live routes/services/dispatch behavior',
  'fake data edge case doc',
);
passAssertion('edge_case_no_new_live_routes_services_dispatch_behavior');

mustHave(old90DayPlanAuditDoc, 'audit-only, non-overriding', 'old 90-day plan audit doc');
passAssertion('old_90_day_audit_audit_only_non_overriding');
mustHave(
  old90DayPlanAuditDoc,
  'current source-of-truth direction wins',
  'old 90-day plan audit doc',
);
passAssertion('current_source_of_truth_direction_wins');
mustHave(old90DayPlanAuditDoc, 'keep/aligned', 'old 90-day plan audit doc');
passAssertion('reconciliation_category_keep_aligned_present');
mustHave(old90DayPlanAuditDoc, 'defer/later', 'old 90-day plan audit doc');
passAssertion('reconciliation_category_defer_later_present');
mustHave(old90DayPlanAuditDoc, 'reject/out-of-scope', 'old 90-day plan audit doc');
passAssertion('reconciliation_category_reject_out_of_scope_present');
mustHave(old90DayPlanAuditDoc, 'needs Jason review', 'old 90-day plan audit doc');
passAssertion('reconciliation_category_needs_jason_review_present');
mustHave(
  old90DayPlanAuditDoc,
  'No implementation changes from old 90-day plan',
  'old 90-day plan audit doc',
);
passAssertion('no_implementation_changes_from_old_90_day_plan');

mustHave(old90DayPlanAuditDoc, 'Lead-to-inspection positioning', 'old 90-day plan audit doc');
passAssertion('preserve_lead_to_inspection_positioning');
mustHave(
  old90DayPlanAuditDoc,
  'Local fake-data testing before activation',
  'old 90-day plan audit doc',
);
passAssertion('preserve_local_fake_data_testing_before_activation');
mustHave(
  old90DayPlanAuditDoc,
  'No photo collection as near-term core workflow',
  'old 90-day plan audit doc',
);
passAssertion('preserve_no_photo_collection_near_term_core');
mustHave(
  old90DayPlanAuditDoc,
  'No generic AI receptionist positioning',
  'old 90-day plan audit doc',
);
passAssertion('preserve_no_generic_ai_receptionist_positioning');
mustHave(
  old90DayPlanAuditDoc,
  'No instant quote/estimate/payment automation',
  'old 90-day plan audit doc',
);
passAssertion('preserve_no_instant_quote_estimate_payment_automation');
mustHave(
  old90DayPlanAuditDoc,
  'No broad CRM sync as near-term core workflow',
  'old 90-day plan audit doc',
);
passAssertion('preserve_no_broad_crm_sync_near_term_core');
mustHave(old90DayPlanAuditDoc, 'Roofer-first human escalation', 'old 90-day plan audit doc');
passAssertion('preserve_roofer_first_human_escalation');
mustHave(old90DayPlanAuditDoc, 'Guided setup before trial', 'old 90-day plan audit doc');
passAssertion('preserve_guided_setup_before_trial');
mustHave(
  old90DayPlanAuditDoc,
  'Hybrid pricing/lead volume guardrail',
  'old 90-day plan audit doc',
);
passAssertion('preserve_hybrid_pricing_lead_volume_guardrail');

for (const item of DASHBOARD_CHECKLIST_ITEMS) {
  mustHave(dashboardAdminChecklistDoc, item, 'dashboard admin checklist doc');
}
passAssertion('dashboard_checklist_item_dashboard_lead_list_present');
passAssertion('dashboard_checklist_item_lead_detail_present');
passAssertion('dashboard_checklist_item_review_queue_present');
passAssertion('dashboard_checklist_item_appointment_readiness_present');
passAssertion('dashboard_checklist_item_missed_lead_recovery_present');
passAssertion('dashboard_checklist_item_post_inspection_follow_up_present');
passAssertion('dashboard_checklist_item_feedback_permission_present');
passAssertion('dashboard_checklist_item_reporting_csv_present');
passAssertion('dashboard_checklist_item_source_roi_present');
passAssertion('dashboard_checklist_item_usage_plan_boundary_present');
passAssertion('dashboard_checklist_item_safety_status_banner_present');

for (let i = 0; i < DASHBOARD_CHECKLIST_ITEMS.length; i++) {
  const sectionStart = dashboardAdminChecklistDoc.indexOf(
    `### Checklist Item ${i + 1}:`,
  );
  if (sectionStart === -1) fail(`dashboard checklist section missing: Item ${i + 1}`);
  const section = dashboardAdminChecklistDoc.slice(sectionStart, sectionStart + 2000);
  for (const field of DASHBOARD_REQUIRED_FIELDS) {
    mustHave(section, field, `dashboard checklist item ${i + 1}`);
  }
}
passAssertion('dashboard_required_fields_per_item_present');

mustHave(
  dashboardAdminChecklistDoc,
  'documentation-only checklist unless existing files are present',
  'dashboard admin checklist doc',
);
passAssertion('dashboard_documentation_only_unless_existing_files_present');

for (const group of CSV_REVIEW_GROUPS) {
  mustHave(csvReportingReviewDoc, group, 'csv reporting review doc');
}
passAssertion('csv_review_group_lead_identity_fields_present');
passAssertion('csv_review_group_contact_permission_fields_present');
passAssertion('csv_review_group_source_attribution_fields_present');
passAssertion('csv_review_group_appointment_inspection_fields_present');
passAssertion('csv_review_group_review_queue_escalation_fields_present');
passAssertion('csv_review_group_post_inspection_fields_present');
passAssertion('csv_review_group_feedback_permission_fields_present');
passAssertion('csv_review_group_source_roi_fields_present');
passAssertion('csv_review_group_usage_plan_fields_present');
passAssertion('csv_review_group_safety_status_fields_present');

mustHave(
  csvReportingReviewDoc,
  'one-directional reporting/reference, not CRM sync',
  'csv reporting review doc',
);
passAssertion('csv_reporting_one_directional_not_crm_sync');
mustHave(csvReportingReviewDoc, 'permission_to_use_publicly', 'csv reporting review doc');
mustHave(csvReportingReviewDoc, 'yes', 'csv reporting review doc');
mustHave(csvReportingReviewDoc, 'no', 'csv reporting review doc');
mustHave(csvReportingReviewDoc, 'not_asked', 'csv reporting review doc');
passAssertion('permission_to_use_publicly_yes_no_not_asked_preserved');
mustHave(csvReportingReviewDoc, 'No live CSV delivery', 'csv reporting review doc');
passAssertion('no_live_csv_delivery');
mustHave(csvReportingReviewDoc, 'No external CRM sync', 'csv reporting review doc');
passAssertion('no_external_crm_sync');
mustHave(csvReportingReviewDoc, 'No production export', 'csv reporting review doc');
passAssertion('no_production_export');

mustHave(combinedDocs, 'p1_polish_status | completed', 'combined P2 refinement docs');
passAssertion('p1_polish_status_completed');
mustHave(combinedDocs, 'evidence_chain_status | passed', 'combined P2 refinement docs');
passAssertion('evidence_chain_status_passed');
mustHave(combinedDocs, 'demo_roofer_is_fake | true', 'combined P2 refinement docs');
passAssertion('demo_roofer_fake');
mustHave(combinedDocs, 'scenario_count | 25', 'combined P2 refinement docs');
passAssertion('scenario_count_25');
mustHave(combinedDocs, 'expected_outcome_count | 25', 'combined P2 refinement docs');
passAssertion('expected_outcome_count_25');
mustHave(combinedDocs, 'matched_outcome_count | 25', 'combined P2 refinement docs');
passAssertion('matched_outcome_count_25');
mustHave(combinedDocs, 'missing_outcome_count | 0', 'combined P2 refinement docs');
passAssertion('missing_outcome_count_0');
mustHave(combinedDocs, 'unexpected_outcome_count | 0', 'combined P2 refinement docs');
passAssertion('unexpected_outcome_count_0');
mustHave(combinedDocs, 'p0_blockers_count | 0', 'combined P2 refinement docs');
passAssertion('p0_blockers_count_0');
mustHave(combinedDocs, RECOMMENDED_NEXT_STEP, 'combined P2 refinement docs');
passAssertion('current_recommended_next_step_continue_local_refinement_or_hold_for_review');

mustHave(
  combinedDocs,
  'standing_local_build_approval_recorded | true',
  'combined P2 refinement docs',
);
passAssertion('standing_local_build_approval_recorded');
mustHave(
  combinedDocs,
  'local-only fake-data read-only dry-run review-only larger batches',
  'combined P2 refinement docs',
);
passAssertion('standing_local_build_approval_scope_limited');

mustHave(combinedDocs, 'activation_approval_status | not_granted', 'combined P2 refinement docs');
passAssertion('activation_approval_status_not_granted');
mustHave(
  combinedDocs,
  'command_execution_status | not_run_by_this_packet',
  'combined P2 refinement docs',
);
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(combinedDocs, 'approved_for_activation_now | false', 'combined P2 refinement docs');
passAssertion('approved_for_activation_now_false');
mustHave(combinedDocs, 'approved_channels | []', 'combined P2 refinement docs');
passAssertion('approved_channels_empty');
mustHave(combinedDocs, 'approved_external_services | []', 'combined P2 refinement docs');
passAssertion('approved_external_services_empty');

mustHave(combinedDocs, 'live_activation_allowed | false', 'combined P2 refinement docs');
passAssertion('live_activation_allowed_false');
mustHave(
  combinedDocs,
  'sandbox_test_mode_activation_allowed | false',
  'combined P2 refinement docs',
);
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(combinedDocs, 'external_calls_allowed | false', 'combined P2 refinement docs');
passAssertion('external_calls_allowed_false');
mustHave(combinedDocs, 'credentials_access_allowed | false', 'combined P2 refinement docs');
passAssertion('credentials_access_allowed_false');
mustHave(
  combinedDocs,
  'production_data_access_allowed | false',
  'combined P2 refinement docs',
);
passAssertion('production_data_access_allowed_false');
mustHave(
  combinedDocs,
  'schema_auth_rls_security_changes_allowed | false',
  'combined P2 refinement docs',
);
passAssertion('schema_auth_rls_security_changes_allowed_false');
mustHave(
  combinedDocs,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'combined P2 refinement docs',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
mustHave(
  combinedDocs,
  'billing_payment_automation_allowed | false',
  'combined P2 refinement docs',
);
passAssertion('billing_payment_automation_allowed_false');
mustHave(
  combinedDocs,
  'public_go_live_or_production_copy_changes_allowed | false',
  'combined P2 refinement docs',
);
passAssertion('public_go_live_or_production_copy_changes_allowed_false');

mustHave(
  combinedDocs,
  'old 90-day plan cannot override current source-of-truth direction',
  'combined P2 refinement docs',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(combinedDocs, 'This is **not** approval to activate anything', 'combined P2 refinement docs');
mustHave(combinedDocs, 'does **not** approve live activation', 'combined P2 refinement docs');
mustHave(
  combinedDocs,
  'does **not** approve sandbox/test-mode activation',
  'combined P2 refinement docs',
);
passAssertion('does_not_approve_activation');

mustHave(fakeDataEdgeCaseDoc, 'Twilio', 'fake data edge case doc');
mustHave(csvReportingReviewDoc, 'billing', 'csv reporting review doc');
mustHave(fakeDataEdgeCaseDoc, 'scheduler', 'fake data edge case doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(combinedDocs, 'public_website_go_live_copy_changed | false', 'combined P2 refinement docs');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(
  fakeDataEdgeCaseDoc,
  'does **not** run the final activation command',
  'fake data edge case doc',
);
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 5ef9ef5');
}
if (fixture.packet_status !== 'review_only') fail('fixture packet_status must be review_only');
if (fixture.p2_refinement_status !== 'completed') {
  fail('fixture p2_refinement_status must be completed');
}
if (fixture.p1_polish_status !== 'completed') fail('fixture p1_polish_status must be completed');
if (fixture.evidence_chain_status !== 'passed') {
  fail('fixture evidence_chain_status must be passed');
}
if (fixture.current_recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('fixture current_recommended_next_step mismatch');
}
if (fixture.demo_roofer_name !== DEMO_ROOFER_NAME) fail('fixture demo_roofer_name mismatch');
if (fixture.demo_roofer_is_fake !== true) fail('fixture demo_roofer_is_fake must be true');
if (fixture.scenario_count !== 25) fail('fixture scenario_count must be 25');
if (fixture.expected_outcome_count !== 25) fail('fixture expected_outcome_count must be 25');
if (fixture.matched_outcome_count !== 25) fail('fixture matched_outcome_count must be 25');
if (fixture.missing_outcome_count !== 0) fail('fixture missing_outcome_count must be 0');
if (fixture.unexpected_outcome_count !== 0) fail('fixture unexpected_outcome_count must be 0');
if (fixture.p0_blockers_count !== 0) fail('fixture p0_blockers_count must be 0');
if (fixture.p2_edge_case_categories_count !== 15) {
  fail('fixture p2_edge_case_categories_count must be 15');
}
if (fixture.dashboard_admin_checklist_items_count !== 11) {
  fail('fixture dashboard_admin_checklist_items_count must be 11');
}
if (fixture.csv_reporting_review_groups_count !== 10) {
  fail('fixture csv_reporting_review_groups_count must be 10');
}
for (const item of P2_ITEMS_COMPLETED) {
  if (!fixture.p2_items_completed.includes(item)) {
    fail(`fixture p2_items_completed missing ${item}`);
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
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}
if (
  fixture.old_90_day_plan_boundary !==
  'old 90-day plan cannot override current source-of-truth direction'
) {
  fail('fixture old_90_day_plan_boundary mismatch');
}
if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 11) {
  fail('fixture evidence_chain_commits must contain 11 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}
passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(combinedDocs, phrase, 'combined P2 refinement docs forbidden language');
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
  'verify-native-workflow-fixture-local-demo-e2e-p2-refinement-batch-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Native Workflow Fixture Local Demo E2E P2 Refinement Batch', 'aggregate readiness');
mustHave(verifierIndex, fakeDataEdgeCaseDocPath, 'verifier index');
mustHave(verifierIndex, old90DayPlanAuditDocPath, 'verifier index');
mustHave(verifierIndex, dashboardAdminChecklistDocPath, 'verifier index');
mustHave(verifierIndex, csvReportingReviewDocPath, 'verifier index');
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
mustHave(wrapper, 'P2', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(fakeDataEdgeCaseDoc, old90DayPlanAuditDocPath, 'fake data edge case doc');
mustHave(fakeDataEdgeCaseDoc, dashboardAdminChecklistDocPath, 'fake data edge case doc');
mustHave(fakeDataEdgeCaseDoc, csvReportingReviewDocPath, 'fake data edge case doc');
mustHave(fakeDataEdgeCaseDoc, fixturePath, 'fake data edge case doc');

if (REQUIRED_ASSERTIONS.length !== 129) {
  fail(`REQUIRED_ASSERTIONS must contain 129 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Local Demo E2E P2 Refinement Batch verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);