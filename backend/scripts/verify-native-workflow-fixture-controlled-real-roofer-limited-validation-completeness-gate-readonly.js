#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_LIMITED_VALIDATION_COMPLETENESS_GATE.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_LIMITED_VALIDATION_COMPLETENESS_NO_GO_REVIEW.md';
const evidenceCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_LIMITED_VALIDATION_EVIDENCE_CAPTURE_PACKET.md';
const evidenceTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_LIMITED_VALIDATION_EVIDENCE_TEMPLATE.md';
const setupCompletenessGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_COMPLETENESS_GATE.md';
const setupChecklistDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REAL_ROOFER_PILOT_SETUP_CHECKLIST.md';
const validationPlanDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_VALIDATION_PLAN.md';
const channelValidationCompletenessGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_COMPLETENESS_GATE.md';
const noGoStopDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/controlled-real-roofer-limited-validation-completeness-gate.json';
const evidenceCaptureFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/controlled-real-roofer-limited-validation-evidence-capture-packet.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-controlled-real-roofer-limited-validation-completeness-gate-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-controlled-real-roofer-limited-validation-completeness-gate-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '436813f';
const UPSTREAM_EVIDENCE_CAPTURE_SOURCE_COMMIT = 'dbb30a7';
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
  'f56340f',
  'aa3f818',
  '15644fa',
  'cc67563',
  '0159faf',
  'dbb30a7',
  '436813f',
];

const ALL_SCENARIO_IDS = ['CRLV-01', 'CRLV-02', 'CRLV-03', 'CRLV-04', 'CRLV-05'];

const EVIDENCE_FIELDS = [
  'scenario_id',
  'roofer_test_account_reference',
  'approved_scope_reference',
  'approved_channel_reference',
  'expected_behavior',
  'observed_behavior',
  'homeowner_contact_permission_status',
  'roofer_handoff_escalation_result',
  'appointment_outcome_result',
  'messages_calls_calendar_reporting_log_artifacts',
  'stop_rollback_result',
  'pass_fail_result',
  'evidence_owner',
  'timestamp',
  'reviewer_signoff',
];

const RECOMMENDED_NEXT_STEP =
  'JASON_COMPLETE_ALL_5_CONTROLLED_REAL_ROOFER_LIMITED_VALIDATION_EVIDENCE_BEFORE_VALIDATION_APPROVAL_CONSIDERATION';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';
const RECOMMENDED_COMMAND =
  'bash scripts/run-native-workflow-fixture-controlled-real-roofer-limited-validation-evidence-capture-packet-dry-run.sh';

const NO_GO_MISSING_ITEMS = [
  'all 5 limited validation scenario IDs completed',
  'all 15 evidence fields filled per scenario',
  'controlled lead arrival evidence captured',
  'RoofLeadHQ response path evidence captured',
  'text/call routing evidence captured',
  'handoff/escalation evidence captured',
  'appointment/outcome/reporting evidence captured',
  'homeowner/contact permission status captured',
  'artifacts/log paths captured',
  'stop/rollback result captured',
  'pass/fail result captured',
  'evidence owner captured',
  'timestamp captured',
  'reviewer signoff captured',
  'final post-validation safety state verified',
];

const NO_GO_MISSING_KEYS = [
  'all_5_limited_validation_scenario_ids_completed',
  'all_15_evidence_fields_filled_per_scenario',
  'controlled_lead_arrival_evidence_captured',
  'roofleadhq_response_path_evidence_captured',
  'text_call_routing_evidence_captured',
  'handoff_escalation_evidence_captured',
  'appointment_outcome_reporting_evidence_captured',
  'homeowner_contact_permission_status_captured',
  'artifacts_log_paths_captured',
  'stop_rollback_result_captured',
  'pass_fail_result_captured',
  'evidence_owner_captured',
  'timestamp_captured',
  'reviewer_signoff_captured',
  'final_post_validation_safety_state_verified',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'evidence_capture_doc_present',
  'evidence_template_doc_present',
  'setup_checklist_doc_present',
  'validation_plan_doc_present',
  'channel_validation_completeness_gate_doc_present',
  'no_go_stop_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_evidence_capture_fixture_present',
  'setup_completeness_gate_doc_present',
  'source_of_truth_commit_436813f_referenced',
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
  'prior_commit_f56340f_referenced',
  'prior_commit_aa3f818_referenced',
  'prior_commit_15644fa_referenced',
  'prior_commit_cc67563_referenced',
  'prior_commit_0159faf_referenced',
  'prior_commit_dbb30a7_referenced',
  'prior_commit_436813f_referenced',
  'local_demo_e2e_evidence_chain_status_passed',
  'local_demo_evidence_freeze_release_candidate_review_status_completed',
  'local_demo_release_candidate_management_summary_jason_review_status_completed',
  'roofer_pilot_essentials_planning_batch_status_completed',
  'limited_validation_evidence_capture_packet_status_completed',
  'controlled_real_roofer_pilot_setup_completeness_gate_status_completed',
  'setup_evidence_capture_packet_status_completed',
  'channel_validation_completeness_gate_status_completed',
  'approval_capture_completeness_gate_status_completed',
  'approval_capture_gate_decision_no_go_or_hold',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'recommended_scenario_counts_are_not_approval',
  'limited_validation_evidence_capture_packet_does_not_equal_approval',
  'limited_validation_evidence_template_does_not_equal_approval',
  'limited_validation_completeness_gate_does_not_equal_approval',
  'limited_validation_completeness_no_go_review_does_not_equal_approval',
  'recommended_defaults_are_not_approval',
  'recommended_defaults_are_not_accepted_exact_values',
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
  'controlled_real_roofer_validation_approval_status_not_granted',
  'approval_capture_status_not_captured',
  'jason_signed_approval_status_not_signed',
  'limited_validation_evidence_capture_status_not_captured',
  'controlled_real_roofer_limited_validation_completeness_status_incomplete',
  'controlled_real_roofer_limited_validation_gate_decision_no_go_or_hold',
  'controlled_real_roofer_setup_gate_decision_no_go_or_hold',
  'channel_validation_gate_decision_no_go_or_hold',
  'controlled_real_roofer_limited_validation_scenarios_count_5',
  'captured_limited_validation_scenarios_count_0',
  'passed_limited_validation_scenarios_count_0',
  'failed_limited_validation_scenarios_count_0',
  'missing_limited_validation_evidence_scenarios_count_5',
  'no_go_missing_items_checklist_all_15_present',
  'fixture_all_15_no_go_missing_items_marked_missing',
  'fixture_all_15_evidence_fields_required_per_limited_validation_scenario',
  'upstream_evidence_capture_all_5_scenarios_not_captured',
  'upstream_limited_validation_evidence_capture_packet_status_completed',
  'gate_does_not_approve_sandbox_test_mode_activation',
  'gate_does_not_approve_live_activation',
  'gate_does_not_approve_controlled_real_roofer_validation',
  'gate_live_activation_remains_not_granted',
  'gate_blocks_controlled_real_roofer_limited_validation_completeness',
  'controlled_real_roofer_validation_blocked_until_sandbox_setup_and_limited_validation_evidence_complete',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'approved_channels_empty',
  'approved_external_services_empty',
  'live_activation_allowed_false',
  'sandbox_test_mode_activation_allowed_false',
  'real_roofer_onboarding_contact_allowed_false',
  'real_roofer_contact_allowed_false',
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
  'NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_LIMITED_VALIDATION_COMPLETENESS_GATE.md',
  'NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_LIMITED_VALIDATION_COMPLETENESS_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-controlled-real-roofer-limited-validation-completeness-gate-dry-run.sh',
  'verify-native-workflow-fixture-controlled-real-roofer-limited-validation-completeness-gate-readonly.js',
  'controlled-real-roofer-limited-validation-completeness-gate.json',
  'Native Workflow Fixture Controlled Real Roofer Limited Validation Completeness Gate',
  'native workflow fixture controlled real roofer limited validation completeness gate',
  'controlled real roofer limited validation completeness gate',
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
const noGoReviewDoc = read(noGoReviewDocPath);
const evidenceCaptureDoc = read(evidenceCaptureDocPath);
const evidenceTemplateDoc = read(evidenceTemplateDocPath);
const setupChecklistDoc = read(setupChecklistDocPath);
const validationPlanDoc = read(validationPlanDocPath);
read(setupCompletenessGateDocPath);
const channelValidationCompletenessGateDoc = read(channelValidationCompletenessGateDocPath);
const noGoStopDoc = read(noGoStopDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${packetDoc}\n${noGoReviewDoc}\n${evidenceCaptureDoc}`;

passAssertion('packet_doc_present');
passAssertion('no_go_review_doc_present');
passAssertion('evidence_capture_doc_present');
passAssertion('evidence_template_doc_present');
passAssertion('setup_checklist_doc_present');
passAssertion('validation_plan_doc_present');
passAssertion('channel_validation_completeness_gate_doc_present');
passAssertion('no_go_stop_doc_present');
passAssertion('setup_completeness_gate_doc_present');

for (const doc of [packetDoc, noGoReviewDoc]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'packet/no-go docs');
}
passAssertion('source_of_truth_commit_436813f_referenced');

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
passAssertion('prior_commit_f56340f_referenced');
passAssertion('prior_commit_aa3f818_referenced');
passAssertion('prior_commit_15644fa_referenced');
passAssertion('prior_commit_cc67563_referenced');
passAssertion('prior_commit_0159faf_referenced');
passAssertion('prior_commit_dbb30a7_referenced');
passAssertion('prior_commit_436813f_referenced');

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
mustHave(packetDoc, 'roofer_pilot_essentials_planning_batch_status | completed', 'packet doc');
passAssertion('roofer_pilot_essentials_planning_batch_status_completed');

mustHave(packetDoc, 'limited_validation_evidence_capture_packet_status | completed', 'packet doc');
passAssertion('limited_validation_evidence_capture_packet_status_completed');
mustHave(
  packetDoc,
  'controlled_real_roofer_pilot_setup_completeness_gate_status | completed',
  'packet doc',
);
passAssertion('controlled_real_roofer_pilot_setup_completeness_gate_status_completed');
mustHave(packetDoc, 'setup_evidence_capture_packet_status | completed', 'packet doc');
passAssertion('setup_evidence_capture_packet_status_completed');
mustHave(packetDoc, 'channel_validation_completeness_gate_status | completed', 'packet doc');
passAssertion('channel_validation_completeness_gate_status_completed');
mustHave(packetDoc, 'approval_capture_completeness_gate_status | completed', 'packet doc');
passAssertion('approval_capture_completeness_gate_status_completed');
mustHave(packetDoc, 'approval_capture_gate_decision | NO_GO', 'packet doc');
mustHave(noGoReviewDoc, 'approval_capture_gate_decision | NO_GO', 'no-go review doc');
passAssertion('approval_capture_gate_decision_no_go_or_hold');

mustHave(packetDoc, 'p0_blockers_count | 0', 'packet doc');
passAssertion('p0_blockers_count_0');
mustHave(packetDoc, 'p1_polish_status | completed', 'packet doc');
passAssertion('p1_polish_status_completed');
mustHave(packetDoc, 'p2_refinement_status | completed', 'packet doc');
passAssertion('p2_refinement_status_completed');
mustHave(packetDoc, 'p3_planning_status | completed', 'packet doc');
passAssertion('p3_planning_status_completed');

mustHave(packetDoc, 'Recommended scenario counts are **not** approval', 'packet doc');
mustHave(noGoReviewDoc, 'Recommended scenario counts are **not** approval', 'no-go review doc');
passAssertion('recommended_scenario_counts_are_not_approval');

mustHave(
  packetDoc,
  'Limited validation evidence capture packet does **not** equal approval',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'Limited validation evidence capture packet does **not** equal approval',
  'no-go review doc',
);
passAssertion('limited_validation_evidence_capture_packet_does_not_equal_approval');

mustHave(packetDoc, 'Limited validation evidence template does **not** equal approval', 'packet doc');
mustHave(
  noGoReviewDoc,
  'Limited validation evidence template does **not** equal approval',
  'no-go review doc',
);
passAssertion('limited_validation_evidence_template_does_not_equal_approval');

mustHave(packetDoc, 'Limited validation completeness gate does **not** equal approval', 'packet doc');
mustHave(
  noGoReviewDoc,
  'Limited validation completeness gate does **not** equal approval',
  'no-go review doc',
);
passAssertion('limited_validation_completeness_gate_does_not_equal_approval');

mustHave(packetDoc, 'Limited validation completeness no-go review does **not** equal approval', 'packet doc');
mustHave(
  noGoReviewDoc,
  'Limited validation completeness no-go review does **not** equal approval',
  'no-go review doc',
);
passAssertion('limited_validation_completeness_no_go_review_does_not_equal_approval');

mustHave(packetDoc, 'Recommended defaults are **not** approval', 'packet doc');
passAssertion('recommended_defaults_are_not_approval');

mustHave(packetDoc, 'Recommended defaults are **not** accepted exact values', 'packet doc');
passAssertion('recommended_defaults_are_not_accepted_exact_values');

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
mustHave(packetDoc, 'controlled_real_roofer_validation_approval_status | not_granted', 'packet doc');
passAssertion('controlled_real_roofer_validation_approval_status_not_granted');
mustHave(packetDoc, 'approval_capture_status | not_captured', 'packet doc');
passAssertion('approval_capture_status_not_captured');
mustHave(packetDoc, 'jason_signed_approval_status | not_signed', 'packet doc');
passAssertion('jason_signed_approval_status_not_signed');
mustHave(packetDoc, 'limited_validation_evidence_capture_status | not_captured', 'packet doc');
passAssertion('limited_validation_evidence_capture_status_not_captured');

mustHave(
  packetDoc,
  'controlled_real_roofer_limited_validation_completeness_status | incomplete',
  'packet doc',
);
passAssertion('controlled_real_roofer_limited_validation_completeness_status_incomplete');
mustHave(packetDoc, 'controlled_real_roofer_limited_validation_gate_decision | NO_GO', 'packet doc');
mustHave(
  noGoReviewDoc,
  'controlled_real_roofer_limited_validation_gate_decision | NO_GO',
  'no-go review doc',
);
passAssertion('controlled_real_roofer_limited_validation_gate_decision_no_go_or_hold');
mustHave(packetDoc, 'controlled_real_roofer_setup_gate_decision | NO_GO', 'packet doc');
mustHave(noGoReviewDoc, 'controlled_real_roofer_setup_gate_decision | NO_GO', 'no-go review doc');
passAssertion('controlled_real_roofer_setup_gate_decision_no_go_or_hold');
mustHave(packetDoc, 'channel_validation_gate_decision | NO_GO', 'packet doc');
mustHave(noGoReviewDoc, 'channel_validation_gate_decision | NO_GO', 'no-go review doc');
passAssertion('channel_validation_gate_decision_no_go_or_hold');

mustHave(packetDoc, 'controlled_real_roofer_limited_validation_scenarios_count | 5', 'packet doc');
mustHave(packetDoc, 'captured_limited_validation_scenarios_count | 0', 'packet doc');
mustHave(packetDoc, 'passed_limited_validation_scenarios_count | 0', 'packet doc');
mustHave(packetDoc, 'failed_limited_validation_scenarios_count | 0', 'packet doc');
mustHave(packetDoc, 'missing_limited_validation_evidence_scenarios_count | 5', 'packet doc');
passAssertion('controlled_real_roofer_limited_validation_scenarios_count_5');
passAssertion('captured_limited_validation_scenarios_count_0');
passAssertion('passed_limited_validation_scenarios_count_0');
passAssertion('failed_limited_validation_scenarios_count_0');
passAssertion('missing_limited_validation_evidence_scenarios_count_5');

for (const scenarioId of ALL_SCENARIO_IDS) {
  mustHave(packetDoc, scenarioId, 'packet doc scenario ids');
}
for (const field of EVIDENCE_FIELDS) {
  mustHave(packetDoc, field, 'packet doc evidence fields');
}

for (const item of NO_GO_MISSING_ITEMS) {
  mustHave(noGoReviewDoc, item, 'no-go review doc missing items checklist');
}
passAssertion('no_go_missing_items_checklist_all_15_present');

mustHave(packetDoc, 'does **not** approve sandbox/test-mode activation', 'packet doc');
passAssertion('gate_does_not_approve_sandbox_test_mode_activation');
mustHave(packetDoc, 'This packet does **not** approve live activation', 'packet doc');
passAssertion('gate_does_not_approve_live_activation');
mustHave(packetDoc, 'This packet does **not** approve controlled real roofer validation', 'packet doc');
passAssertion('gate_does_not_approve_controlled_real_roofer_validation');
mustHave(packetDoc, 'Live activation remains **not granted**', 'packet doc');
passAssertion('gate_live_activation_remains_not_granted');

mustHave(
  packetDoc,
  'No future controlled real roofer limited validation can be marked complete',
  'packet doc',
);
passAssertion('gate_blocks_controlled_real_roofer_limited_validation_completeness');

mustHave(
  packetDoc,
  'Controlled real roofer validation remains blocked until sandbox/test-mode evidence, setup evidence, and limited validation evidence are complete and separately approved',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'Controlled real roofer validation remains blocked until sandbox/test-mode evidence, setup evidence, and limited validation evidence are complete and separately approved',
  'no-go review doc',
);
passAssertion(
  'controlled_real_roofer_validation_blocked_until_sandbox_setup_and_limited_validation_evidence_complete',
);

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
mustHave(combinedDocs, 'real_roofer_onboarding_contact_allowed | false', 'combined packet docs');
passAssertion('real_roofer_onboarding_contact_allowed_false');
mustHave(combinedDocs, 'real_roofer_contact_allowed | false', 'combined packet docs');
passAssertion('real_roofer_contact_allowed_false');
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

mustHave(packetDoc, 'webhook', 'packet doc');
mustHave(packetDoc, 'scheduler', 'packet doc');
mustHave(packetDoc, 'billing', 'packet doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(combinedDocs, 'public_website_go_live_copy_changed | false', 'combined packet docs');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(packetDoc, 'does **not** run the final activation command', 'packet doc');
mustHave(
  packetDoc,
  'does **not** run the upstream limited validation evidence capture packet command',
  'packet doc',
);
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, evidenceCaptureFixturePath))) {
  fail(`missing upstream evidence capture fixture: ${evidenceCaptureFixturePath}`);
}
passAssertion('upstream_evidence_capture_fixture_present');

const fixture = readJson(fixturePath);
const evidenceCaptureFixture = readJson(evidenceCaptureFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 436813f');
}
if (fixture.packet_status !== 'review_only') {
  fail('fixture packet_status must be review_only');
}
if (fixture.review_status !== 'controlled_real_roofer_limited_validation_completeness_gate_review_only') {
  fail(
    'fixture review_status must be controlled_real_roofer_limited_validation_completeness_gate_review_only',
  );
}
if (fixture.controlled_real_roofer_limited_validation_completeness_status !== 'incomplete') {
  fail('fixture controlled_real_roofer_limited_validation_completeness_status must be incomplete');
}
if (fixture.controlled_real_roofer_limited_validation_gate_decision !== 'NO_GO') {
  fail('fixture controlled_real_roofer_limited_validation_gate_decision must be NO_GO');
}
if (fixture.limited_validation_completeness_gate_does_not_equal_approval !== true) {
  fail('fixture limited_validation_completeness_gate_does_not_equal_approval must be true');
}
if (fixture.limited_validation_completeness_no_go_review_does_not_equal_approval !== true) {
  fail('fixture limited_validation_completeness_no_go_review_does_not_equal_approval must be true');
}
if (fixture.limited_validation_evidence_capture_packet_does_not_equal_approval !== true) {
  fail('fixture limited_validation_evidence_capture_packet_does_not_equal_approval must be true');
}
if (fixture.limited_validation_evidence_template_does_not_equal_approval !== true) {
  fail('fixture limited_validation_evidence_template_does_not_equal_approval must be true');
}
if (fixture.recommended_scenario_counts_are_not_approval !== true) {
  fail('fixture recommended_scenario_counts_are_not_approval must be true');
}
if (fixture.limited_validation_evidence_capture_packet_status !== 'completed') {
  fail('fixture limited_validation_evidence_capture_packet_status must be completed');
}
if (fixture.controlled_real_roofer_pilot_setup_completeness_gate_status !== 'completed') {
  fail('fixture controlled_real_roofer_pilot_setup_completeness_gate_status must be completed');
}
if (fixture.channel_validation_completeness_gate_status !== 'completed') {
  fail('fixture channel_validation_completeness_gate_status must be completed');
}
if (fixture.channel_validation_gate_decision !== 'NO_GO') {
  fail('fixture channel_validation_gate_decision must be NO_GO');
}
if (fixture.approval_capture_completeness_gate_status !== 'completed') {
  fail('fixture approval_capture_completeness_gate_status must be completed');
}
if (fixture.approval_capture_gate_decision !== 'NO_GO') {
  fail('fixture approval_capture_gate_decision must be NO_GO');
}
if (fixture.approval_capture_status !== 'not_captured') {
  fail('fixture approval_capture_status must be not_captured');
}
if (fixture.jason_signed_approval_status !== 'not_signed') {
  fail('fixture jason_signed_approval_status must be not_signed');
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
if (fixture.controlled_real_roofer_validation_approval_status !== 'not_granted') {
  fail('fixture controlled_real_roofer_validation_approval_status must be not_granted');
}
if (fixture.limited_validation_evidence_capture_status !== 'not_captured') {
  fail('fixture limited_validation_evidence_capture_status must be not_captured');
}
if (fixture.controlled_real_roofer_setup_gate_decision !== 'NO_GO') {
  fail('fixture controlled_real_roofer_setup_gate_decision must be NO_GO');
}
if (fixture.local_demo_e2e_evidence_chain_status !== 'passed') {
  fail('fixture local_demo_e2e_evidence_chain_status must be passed');
}
if (fixture.current_recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('fixture current_recommended_next_step mismatch');
}
if (fixture.p0_blockers_count !== 0) fail('fixture p0_blockers_count must be 0');
if (fixture.exact_values_required_count !== 19) {
  fail('fixture exact_values_required_count must be 19');
}
if (fixture.accepted_exact_values_count !== 0) {
  fail('fixture accepted_exact_values_count must be 0');
}
if (fixture.approved_exact_values_filled_count !== 0) {
  fail('fixture approved_exact_values_filled_count must be 0');
}
if (fixture.default_sandbox_test_mode_decision !== 'HOLD') {
  fail('fixture default_sandbox_test_mode_decision must be HOLD');
}
if (fixture.controlled_real_roofer_limited_validation_scenarios_count !== 5) {
  fail('fixture controlled_real_roofer_limited_validation_scenarios_count must be 5');
}
if (fixture.captured_limited_validation_scenarios_count !== 0) {
  fail('fixture captured_limited_validation_scenarios_count must be 0');
}
if (fixture.passed_limited_validation_scenarios_count !== 0) {
  fail('fixture passed_limited_validation_scenarios_count must be 0');
}
if (fixture.failed_limited_validation_scenarios_count !== 0) {
  fail('fixture failed_limited_validation_scenarios_count must be 0');
}
if (fixture.missing_limited_validation_evidence_scenarios_count !== 5) {
  fail('fixture missing_limited_validation_evidence_scenarios_count must be 5');
}

if (!fixture.no_go_missing_items || typeof fixture.no_go_missing_items !== 'object') {
  fail('fixture no_go_missing_items object missing');
}
for (const key of NO_GO_MISSING_KEYS) {
  if (!(key in fixture.no_go_missing_items)) {
    fail(`fixture no_go_missing_items missing ${key}`);
  }
  if (fixture.no_go_missing_items[key] !== 'missing') {
    fail(`fixture no_go_missing_items.${key} must be missing`);
  }
}
passAssertion('fixture_all_15_no_go_missing_items_marked_missing');

if (
  !Array.isArray(fixture.evidence_fields_required_per_limited_validation_scenario) ||
  fixture.evidence_fields_required_per_limited_validation_scenario.length !== 15
) {
  fail('fixture evidence_fields_required_per_limited_validation_scenario must contain 15 fields');
}
for (const field of EVIDENCE_FIELDS) {
  if (!fixture.evidence_fields_required_per_limited_validation_scenario.includes(field)) {
    fail(`fixture evidence_fields_required_per_limited_validation_scenario missing ${field}`);
  }
}
passAssertion('fixture_all_15_evidence_fields_required_per_limited_validation_scenario');

if (evidenceCaptureFixture.source_of_truth_commit !== UPSTREAM_EVIDENCE_CAPTURE_SOURCE_COMMIT) {
  fail('upstream evidence capture fixture source_of_truth_commit must be dbb30a7');
}
if (evidenceCaptureFixture.packet_status !== 'review_only') {
  fail('upstream evidence capture fixture packet_status must be review_only');
}
passAssertion('upstream_limited_validation_evidence_capture_packet_status_completed');

if (
  !Array.isArray(evidenceCaptureFixture.controlled_real_roofer_limited_validation_scenarios) ||
  evidenceCaptureFixture.controlled_real_roofer_limited_validation_scenarios.length !== 5
) {
  fail(
    'upstream evidence capture fixture controlled_real_roofer_limited_validation_scenarios must contain 5 scenarios',
  );
}
for (const scenario of evidenceCaptureFixture.controlled_real_roofer_limited_validation_scenarios) {
  if (scenario.evidence_capture_status !== 'not_captured') {
    fail(
      `upstream scenario ${scenario.scenario_id} evidence_capture_status must be not_captured`,
    );
  }
  for (const field of EVIDENCE_FIELDS) {
    if (scenario.evidence_capture[field] !== '') {
      fail(`upstream scenario ${scenario.scenario_id} evidence field ${field} must be blank`);
    }
  }
}
passAssertion('upstream_evidence_capture_all_5_scenarios_not_captured');

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
if (fixture.real_roofer_onboarding_contact_allowed !== false) {
  fail('fixture real_roofer_onboarding_contact_allowed must be false');
}
if (fixture.real_roofer_contact_allowed !== false) {
  fail('fixture real_roofer_contact_allowed must be false');
}
if (fixture.external_calls_allowed !== false) {
  fail('fixture external_calls_allowed must be false');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}

if (
  !Array.isArray(fixture.evidence_chain_commits) ||
  fixture.evidence_chain_commits.length !== 30
) {
  fail('fixture evidence_chain_commits must contain 30 commits');
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

mustHave(aggregate, verifierPath, 'aggregate readiness');
mustHave(
  aggregate,
  'Native Workflow Fixture Controlled Real Roofer Limited Validation Completeness Gate',
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
mustHave(wrapper, 'npm --prefix backend run build', 'wrapper backend build');
mustHave(wrapper, 'local fake-data', 'wrapper mode');
mustHave(wrapper, 'review-only', 'wrapper mode');
mustHave(wrapper, 'Recommended scenario counts are not approval', 'wrapper mode');
mustHave(
  wrapper,
  'Limited validation evidence capture packet does not equal approval',
  'wrapper mode',
);
mustHave(wrapper, 'Limited validation evidence template does not equal approval', 'wrapper mode');
mustHave(
  wrapper,
  'Limited validation completeness gate does not equal approval',
  'wrapper mode',
);
mustHave(
  wrapper,
  'Limited validation completeness no-go review does not equal approval',
  'wrapper mode',
);
mustHave(wrapper, 'Default sandbox/test-mode decision remains HOLD', 'wrapper mode');
mustHave(wrapper, 'Channel validation gate decision is NO_GO', 'wrapper mode');
mustHave(wrapper, 'Controlled real roofer setup gate decision is NO_GO', 'wrapper mode');
mustHave(wrapper, 'Controlled real roofer limited validation gate decision is NO_GO', 'wrapper mode');
mustHave(
  wrapper,
  'Controlled real roofer validation blocked until sandbox/test-mode evidence, setup evidence, and limited validation evidence are complete and separately approved',
  'wrapper mode',
);
mustHave(wrapper, 'Sandbox/test-mode and live activation remain not granted', 'wrapper mode');
mustHave(wrapper, 'Real roofer onboarding/contact remains blocked', 'wrapper mode');
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

mustHave(packetDoc, noGoReviewDocPath, 'packet doc');
mustHave(packetDoc, evidenceCaptureDocPath, 'packet doc');
mustHave(packetDoc, evidenceTemplateDocPath, 'packet doc');
mustHave(packetDoc, setupCompletenessGateDocPath, 'packet doc');
mustHave(packetDoc, setupChecklistDocPath, 'packet doc');
mustHave(packetDoc, validationPlanDocPath, 'packet doc');
mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, channelValidationCompletenessGateDocPath, 'packet doc');
mustHave(packetDoc, noGoStopDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 135) {
  fail(`REQUIRED_ASSERTIONS must contain 135 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Controlled Real Roofer Limited Validation Completeness Gate verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);