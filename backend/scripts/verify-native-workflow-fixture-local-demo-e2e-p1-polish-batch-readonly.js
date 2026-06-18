#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const operatorReadabilityDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_OPERATOR_READABILITY_POLISH.md';
const scenarioWordingDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_SCENARIO_WORDING_CLARITY_REVIEW.md';
const observationNoteExamplesDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_OBSERVATION_NOTE_EXAMPLES.md';
const compressedEvidenceSummaryDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_COMPRESSED_EVIDENCE_SUMMARY.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/local-demo-e2e-p1-polish-batch.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-local-demo-e2e-p1-polish-batch-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-local-demo-e2e-p1-polish-batch-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '0d7ae0d';
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
];
const DEMO_ROOFER_NAME = 'Summit Peak Roofing Demo LLC';
const RECOMMENDED_NEXT_STEP = 'CONTINUE_LOCAL_REFINEMENT_OR_HOLD_FOR_REVIEW';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const P1_ITEMS_COMPLETED = [
  'operator_readability_polish',
  'scenario_wording_clarity',
  'observation_note_capture_examples',
  'demo_evidence_summary_compression',
];

const SCENARIO_IDS = [
  'scenario-001-new-paid-lead-qualified-appointment-ready',
  'scenario-002-new-lead-missing-contact-review-queue',
  'scenario-003-new-lead-no-contact-permission',
  'scenario-004-missed-lead-recovery',
  'scenario-005-manual-outreach',
  'scenario-006-appointment-readiness',
  'scenario-007-appointment-scheduled-placeholder',
  'scenario-008-appointment-reschedule-request',
  'scenario-009-missed-appointment-no-show',
  'scenario-010-post-inspection-estimate-pending',
  'scenario-011-post-inspection-estimate-sent',
  'scenario-012-feedback-permission-not-asked',
  'scenario-013-feedback-permission-yes',
  'scenario-014-feedback-permission-no',
  'scenario-015-lead-source-roi-attribution',
  'scenario-016-usage-volume-plan-limit-boundary',
  'scenario-017-messaging-compliance-contact-permission',
  'scenario-018-data-minimization-pii-boundary',
  'scenario-019-audit-timeline-event-expectation',
  'scenario-020-review-queue-aging-sla-boundary',
  'scenario-021-human-escalation-roofer-judgment',
  'scenario-022-roofleadhq-escalation-system-review',
  'scenario-023-unsupported-automation-blocked',
  'scenario-024-external-service-boundary-blocked',
  'scenario-025-stop-condition-boundary',
];

const SCENARIO_REQUIRED_FIELDS = [
  '**Operator-friendly title:**',
  '**What this scenario proves:**',
  '**Expected outcome (plain English):**',
  '**Possible confusion point:**',
  '**Safer wording recommendation:**',
];

const ISSUE_CATEGORIES = [
  'fake data clarity',
  'scenario wording',
  'expected outcome mismatch',
  'review queue ambiguity',
  'escalation ambiguity',
  'compliance/messaging concern',
  'post-inspection concern',
  'feedback permission concern',
  'reporting/CSV concern',
  'source ROI concern',
  'safety boundary concern',
  'old 90-day plan reconciliation candidate',
  'other',
];

const REQUIRED_ASSERTIONS = [
  'operator_readability_doc_present',
  'scenario_wording_clarity_doc_present',
  'observation_note_examples_doc_present',
  'compressed_evidence_summary_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'operator_readability_review_only_scope_present',
  'source_of_truth_commit_0d7ae0d_referenced',
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
  'p1_polish_status_completed',
  'p1_item_operator_readability_polish_completed',
  'p1_item_scenario_wording_clarity_completed',
  'p1_item_observation_note_capture_examples_completed',
  'p1_item_demo_evidence_summary_compression_completed',
  'operator_flow_step_1_confirm_clean_source_of_truth',
  'operator_flow_step_2_confirm_safety_posture',
  'operator_flow_step_3_run_scenario_review',
  'operator_flow_step_4_run_evidence_report',
  'operator_flow_step_5_run_operator_gate',
  'operator_flow_step_6_review_walkthrough_sections',
  'operator_flow_step_7_capture_notes',
  'operator_flow_step_8_decide_pass_pass_with_notes_hold_no_go',
  'plain_english_definitions_present',
  'do_not_infer_live_readiness',
  'do_not_infer_sandbox_test_mode_approval',
  'do_not_infer_external_service_approval',
  'do_not_infer_production_data_readiness',
  'do_not_infer_quote_estimate_payment_automation',
  'scenario_wording_all_25_scenario_ids_present',
  'scenario_wording_required_fields_per_scenario_present',
  'scenario_wording_no_public_customer_promise',
  'scenario_wording_fake_data_local_only_note',
  'observation_all_25_scenario_ids_present',
  'observation_status_pass_present',
  'observation_status_pass_with_note_present',
  'observation_status_review_needed_present',
  'observation_status_fail_no_go_present',
  'severity_info_present',
  'severity_low_present',
  'severity_medium_present',
  'severity_high_present',
  'severity_blocker_present',
  'owner_jason_present',
  'owner_roofer_present',
  'owner_engineering_present',
  'owner_product_present',
  'owner_legal_compliance_present',
  'owner_hold_present',
  'issue_category_fake_data_clarity_present',
  'issue_category_scenario_wording_present',
  'issue_category_expected_outcome_mismatch_present',
  'issue_category_review_queue_ambiguity_present',
  'issue_category_escalation_ambiguity_present',
  'issue_category_compliance_messaging_concern_present',
  'issue_category_post_inspection_concern_present',
  'issue_category_feedback_permission_concern_present',
  'issue_category_reporting_csv_concern_present',
  'issue_category_source_roi_concern_present',
  'issue_category_safety_boundary_concern_present',
  'issue_category_old_90_day_plan_reconciliation_candidate_present',
  'issue_category_other_present',
  'compressed_evidence_one_page_summary_present',
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
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_OPERATOR_READABILITY_POLISH.md',
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_SCENARIO_WORDING_CLARITY_REVIEW.md',
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_OBSERVATION_NOTE_EXAMPLES.md',
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_COMPRESSED_EVIDENCE_SUMMARY.md',
  'run-native-workflow-fixture-local-demo-e2e-p1-polish-batch-dry-run.sh',
  'verify-native-workflow-fixture-local-demo-e2e-p1-polish-batch-readonly.js',
  'local-demo-e2e-p1-polish-batch.json',
  'Native Workflow Fixture Local Demo E2E P1 Polish Batch',
  'native workflow fixture local demo e2e p1 polish batch',
  'local demo e2e p1 polish batch',
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

const operatorReadabilityDoc = read(operatorReadabilityDocPath);
const scenarioWordingDoc = read(scenarioWordingDocPath);
const observationNoteExamplesDoc = read(observationNoteExamplesDocPath);
const compressedEvidenceSummaryDoc = read(compressedEvidenceSummaryDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${operatorReadabilityDoc}\n${scenarioWordingDoc}\n${observationNoteExamplesDoc}\n${compressedEvidenceSummaryDoc}`;

passAssertion('operator_readability_doc_present');
passAssertion('scenario_wording_clarity_doc_present');
passAssertion('observation_note_examples_doc_present');
passAssertion('compressed_evidence_summary_doc_present');

mustHave(
  operatorReadabilityDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only',
  'operator readability doc',
);
passAssertion('operator_readability_review_only_scope_present');

for (const doc of [
  operatorReadabilityDoc,
  scenarioWordingDoc,
  observationNoteExamplesDoc,
  compressedEvidenceSummaryDoc,
]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'P1 polish doc');
}
passAssertion('source_of_truth_commit_0d7ae0d_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(combinedDocs, commit, 'combined P1 polish docs');
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

for (const item of P1_ITEMS_COMPLETED) {
  mustHave(combinedDocs, item, 'combined P1 polish docs');
}
passAssertion('p1_polish_status_completed');
passAssertion('p1_item_operator_readability_polish_completed');
passAssertion('p1_item_scenario_wording_clarity_completed');
passAssertion('p1_item_observation_note_capture_examples_completed');
passAssertion('p1_item_demo_evidence_summary_compression_completed');

mustHave(operatorReadabilityDoc, 'Confirm clean source-of-truth', 'operator readability doc');
passAssertion('operator_flow_step_1_confirm_clean_source_of_truth');
mustHave(operatorReadabilityDoc, 'Confirm safety posture', 'operator readability doc');
passAssertion('operator_flow_step_2_confirm_safety_posture');
mustHave(operatorReadabilityDoc, 'Run scenario review', 'operator readability doc');
passAssertion('operator_flow_step_3_run_scenario_review');
mustHave(operatorReadabilityDoc, 'Run evidence report', 'operator readability doc');
passAssertion('operator_flow_step_4_run_evidence_report');
mustHave(operatorReadabilityDoc, 'Run operator gate', 'operator readability doc');
passAssertion('operator_flow_step_5_run_operator_gate');
mustHave(operatorReadabilityDoc, 'Review walkthrough sections', 'operator readability doc');
passAssertion('operator_flow_step_6_review_walkthrough_sections');
mustHave(operatorReadabilityDoc, 'Capture notes', 'operator readability doc');
passAssertion('operator_flow_step_7_capture_notes');
mustHave(
  operatorReadabilityDoc,
  'Decide pass / pass-with-notes / hold / no-go',
  'operator readability doc',
);
passAssertion('operator_flow_step_8_decide_pass_pass_with_notes_hold_no_go');

mustHave(operatorReadabilityDoc, '## 3. Plain-English Definitions', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Scenario**', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Expected outcome**', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Matched outcome**', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Review queue**', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Escalation**', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Blocked path**', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Stop condition**', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Local-only**', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Fake-data-only**', 'operator readability doc');
passAssertion('plain_english_definitions_present');

mustHave(operatorReadabilityDoc, '## 4. What Not to Infer', 'operator readability doc');
mustHave(operatorReadabilityDoc, '**Live readiness**', 'operator readability doc');
passAssertion('do_not_infer_live_readiness');
mustHave(operatorReadabilityDoc, '**Sandbox/test-mode approval**', 'operator readability doc');
passAssertion('do_not_infer_sandbox_test_mode_approval');
mustHave(operatorReadabilityDoc, '**External-service approval**', 'operator readability doc');
passAssertion('do_not_infer_external_service_approval');
mustHave(operatorReadabilityDoc, '**Production data readiness**', 'operator readability doc');
passAssertion('do_not_infer_production_data_readiness');
mustHave(
  operatorReadabilityDoc,
  '**Quote/estimate/payment automation**',
  'operator readability doc',
);
passAssertion('do_not_infer_quote_estimate_payment_automation');

for (const scenarioId of SCENARIO_IDS) {
  mustHave(scenarioWordingDoc, scenarioId, 'scenario wording doc');
}
passAssertion('scenario_wording_all_25_scenario_ids_present');

for (const scenarioId of SCENARIO_IDS) {
  const sectionStart = scenarioWordingDoc.indexOf(`### ${scenarioId}`);
  if (sectionStart === -1) fail(`scenario wording section missing: ${scenarioId}`);
  const section = scenarioWordingDoc.slice(sectionStart, sectionStart + 2000);
  for (const field of SCENARIO_REQUIRED_FIELDS) {
    mustHave(section, field, `scenario wording ${scenarioId}`);
  }
}
passAssertion('scenario_wording_required_fields_per_scenario_present');

mustHave(
  scenarioWordingDoc,
  'No scenario creates a public/customer-facing promise',
  'scenario wording doc',
);
mustHave(scenarioWordingDoc, 'All scenarios remain fake-data/local-only', 'scenario wording doc');
passAssertion('scenario_wording_no_public_customer_promise');
passAssertion('scenario_wording_fake_data_local_only_note');

for (const scenarioId of SCENARIO_IDS) {
  mustHave(observationNoteExamplesDoc, scenarioId, 'observation note examples doc');
}
passAssertion('observation_all_25_scenario_ids_present');

mustHave(observationNoteExamplesDoc, 'Status | PASS', 'observation note examples doc');
passAssertion('observation_status_pass_present');
mustHave(observationNoteExamplesDoc, 'PASS_WITH_NOTE', 'observation note examples doc');
passAssertion('observation_status_pass_with_note_present');
mustHave(observationNoteExamplesDoc, 'REVIEW_NEEDED', 'observation note examples doc');
passAssertion('observation_status_review_needed_present');
mustHave(observationNoteExamplesDoc, 'FAIL_NO_GO', 'observation note examples doc');
passAssertion('observation_status_fail_no_go_present');

mustHave(observationNoteExamplesDoc, '| INFO |', 'observation note examples doc');
passAssertion('severity_info_present');
mustHave(observationNoteExamplesDoc, '| LOW |', 'observation note examples doc');
passAssertion('severity_low_present');
mustHave(observationNoteExamplesDoc, '| MEDIUM |', 'observation note examples doc');
passAssertion('severity_medium_present');
mustHave(observationNoteExamplesDoc, '| HIGH |', 'observation note examples doc');
passAssertion('severity_high_present');
mustHave(observationNoteExamplesDoc, '| BLOCKER |', 'observation note examples doc');
passAssertion('severity_blocker_present');

mustHave(observationNoteExamplesDoc, '| Jason |', 'observation note examples doc');
passAssertion('owner_jason_present');
mustHave(observationNoteExamplesDoc, '| Roofer |', 'observation note examples doc');
passAssertion('owner_roofer_present');
mustHave(observationNoteExamplesDoc, '| Engineering |', 'observation note examples doc');
passAssertion('owner_engineering_present');
mustHave(observationNoteExamplesDoc, '| Product |', 'observation note examples doc');
passAssertion('owner_product_present');
mustHave(observationNoteExamplesDoc, '| Legal/Compliance |', 'observation note examples doc');
passAssertion('owner_legal_compliance_present');
mustHave(observationNoteExamplesDoc, '| Hold |', 'observation note examples doc');
passAssertion('owner_hold_present');

for (const category of ISSUE_CATEGORIES) {
  mustHave(observationNoteExamplesDoc, category, 'observation note examples doc');
}
passAssertion('issue_category_fake_data_clarity_present');
passAssertion('issue_category_scenario_wording_present');
passAssertion('issue_category_expected_outcome_mismatch_present');
passAssertion('issue_category_review_queue_ambiguity_present');
passAssertion('issue_category_escalation_ambiguity_present');
passAssertion('issue_category_compliance_messaging_concern_present');
passAssertion('issue_category_post_inspection_concern_present');
passAssertion('issue_category_feedback_permission_concern_present');
passAssertion('issue_category_reporting_csv_concern_present');
passAssertion('issue_category_source_roi_concern_present');
passAssertion('issue_category_safety_boundary_concern_present');
passAssertion('issue_category_old_90_day_plan_reconciliation_candidate_present');
passAssertion('issue_category_other_present');

mustHave(compressedEvidenceSummaryDoc, '## One-Page Summary', 'compressed evidence summary doc');
passAssertion('compressed_evidence_one_page_summary_present');
mustHave(compressedEvidenceSummaryDoc, 'evidence_chain_status | passed', 'compressed evidence summary doc');
passAssertion('evidence_chain_status_passed');
mustHave(compressedEvidenceSummaryDoc, 'demo_roofer_is_fake | true', 'compressed evidence summary doc');
passAssertion('demo_roofer_fake');
mustHave(compressedEvidenceSummaryDoc, 'scenario_count | 25', 'compressed evidence summary doc');
passAssertion('scenario_count_25');
mustHave(compressedEvidenceSummaryDoc, 'expected_outcome_count | 25', 'compressed evidence summary doc');
passAssertion('expected_outcome_count_25');
mustHave(compressedEvidenceSummaryDoc, 'matched_outcome_count | 25', 'compressed evidence summary doc');
passAssertion('matched_outcome_count_25');
mustHave(compressedEvidenceSummaryDoc, 'missing_outcome_count | 0', 'compressed evidence summary doc');
passAssertion('missing_outcome_count_0');
mustHave(compressedEvidenceSummaryDoc, 'unexpected_outcome_count | 0', 'compressed evidence summary doc');
passAssertion('unexpected_outcome_count_0');
mustHave(compressedEvidenceSummaryDoc, 'p0_blockers_count | 0', 'compressed evidence summary doc');
passAssertion('p0_blockers_count_0');
mustHave(compressedEvidenceSummaryDoc, RECOMMENDED_NEXT_STEP, 'compressed evidence summary doc');
passAssertion('current_recommended_next_step_continue_local_refinement_or_hold_for_review');

mustHave(combinedDocs, 'standing_local_build_approval_recorded | true', 'combined P1 polish docs');
passAssertion('standing_local_build_approval_recorded');
mustHave(
  combinedDocs,
  'local-only fake-data read-only dry-run review-only larger batches',
  'combined P1 polish docs',
);
passAssertion('standing_local_build_approval_scope_limited');

mustHave(combinedDocs, 'activation_approval_status | not_granted', 'combined P1 polish docs');
passAssertion('activation_approval_status_not_granted');
mustHave(combinedDocs, 'command_execution_status | not_run_by_this_packet', 'combined P1 polish docs');
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(combinedDocs, 'approved_for_activation_now | false', 'combined P1 polish docs');
passAssertion('approved_for_activation_now_false');
mustHave(combinedDocs, 'approved_channels | []', 'combined P1 polish docs');
passAssertion('approved_channels_empty');
mustHave(combinedDocs, 'approved_external_services | []', 'combined P1 polish docs');
passAssertion('approved_external_services_empty');

mustHave(compressedEvidenceSummaryDoc, 'live_activation_allowed | false', 'compressed evidence summary doc');
passAssertion('live_activation_allowed_false');
mustHave(
  compressedEvidenceSummaryDoc,
  'sandbox_test_mode_activation_allowed | false',
  'compressed evidence summary doc',
);
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(compressedEvidenceSummaryDoc, 'external_calls_allowed | false', 'compressed evidence summary doc');
passAssertion('external_calls_allowed_false');
mustHave(
  compressedEvidenceSummaryDoc,
  'credentials_access_allowed | false',
  'compressed evidence summary doc',
);
passAssertion('credentials_access_allowed_false');
mustHave(
  compressedEvidenceSummaryDoc,
  'production_data_access_allowed | false',
  'compressed evidence summary doc',
);
passAssertion('production_data_access_allowed_false');
mustHave(
  compressedEvidenceSummaryDoc,
  'schema_auth_rls_security_changes_allowed | false',
  'compressed evidence summary doc',
);
passAssertion('schema_auth_rls_security_changes_allowed_false');
mustHave(
  compressedEvidenceSummaryDoc,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'compressed evidence summary doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
mustHave(
  compressedEvidenceSummaryDoc,
  'billing_payment_automation_allowed | false',
  'compressed evidence summary doc',
);
passAssertion('billing_payment_automation_allowed_false');
mustHave(
  compressedEvidenceSummaryDoc,
  'public_go_live_or_production_copy_changes_allowed | false',
  'compressed evidence summary doc',
);
passAssertion('public_go_live_or_production_copy_changes_allowed_false');

mustHave(
  combinedDocs,
  'old 90-day plan cannot override current source-of-truth direction',
  'combined P1 polish docs',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(combinedDocs, 'This is **not** approval to activate anything', 'combined P1 polish docs');
mustHave(combinedDocs, 'does **not** approve live activation', 'combined P1 polish docs');
mustHave(combinedDocs, 'does **not** approve sandbox/test-mode activation', 'combined P1 polish docs');
passAssertion('does_not_approve_activation');

mustHave(compressedEvidenceSummaryDoc, 'Twilio', 'compressed evidence summary doc');
mustHave(compressedEvidenceSummaryDoc, 'billing', 'compressed evidence summary doc');
mustHave(compressedEvidenceSummaryDoc, 'scheduler', 'compressed evidence summary doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(combinedDocs, 'public_website_go_live_copy_changed | false', 'combined P1 polish docs');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(operatorReadabilityDoc, 'does **not** run the final activation command', 'operator readability doc');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

const fixture = readJson(fixturePath);
if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 0d7ae0d');
}
if (fixture.packet_status !== 'review_only') fail('fixture packet_status must be review_only');
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
for (const item of P1_ITEMS_COMPLETED) {
  if (!fixture.p1_items_completed.includes(item)) {
    fail(`fixture p1_items_completed missing ${item}`);
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
if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 10) {
  fail('fixture evidence_chain_commits must contain 10 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}
passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(combinedDocs, phrase, 'combined P1 polish docs forbidden language');
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
  'verify-native-workflow-fixture-local-demo-e2e-p1-polish-batch-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Native Workflow Fixture Local Demo E2E P1 Polish Batch', 'aggregate readiness');
mustHave(verifierIndex, operatorReadabilityDocPath, 'verifier index');
mustHave(verifierIndex, scenarioWordingDocPath, 'verifier index');
mustHave(verifierIndex, observationNoteExamplesDocPath, 'verifier index');
mustHave(verifierIndex, compressedEvidenceSummaryDocPath, 'verifier index');
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
mustHave(wrapper, 'P1', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(operatorReadabilityDoc, scenarioWordingDocPath, 'operator readability doc');
mustHave(operatorReadabilityDoc, observationNoteExamplesDocPath, 'operator readability doc');
mustHave(operatorReadabilityDoc, compressedEvidenceSummaryDocPath, 'operator readability doc');
mustHave(operatorReadabilityDoc, fixturePath, 'operator readability doc');

if (REQUIRED_ASSERTIONS.length !== 115) {
  fail(`REQUIRED_ASSERTIONS must contain 115 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Local Demo E2E P1 Polish Batch verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);