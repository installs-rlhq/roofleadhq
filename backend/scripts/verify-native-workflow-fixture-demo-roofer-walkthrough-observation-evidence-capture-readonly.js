#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const evidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_WALKTHROUGH_OBSERVATION_EVIDENCE_CAPTURE.md';
const evidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/demo-walkthrough-observation-evidence-capture.json';
const walkthroughDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_WALKTHROUGH_SCRIPT.md';
const observationTriageDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OBSERVATION_TRIAGE_PACKET.md';
const triageFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/demo-local-e2e-walkthrough-observation-triage.json';
const triageVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-readonly.js';
const triageWrapperPath =
  'scripts/run-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-dry-run.sh';
const wrapperPath =
  'scripts/run-native-workflow-fixture-demo-roofer-walkthrough-observation-evidence-capture-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-demo-roofer-walkthrough-observation-evidence-capture-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = 'c6df554';
const PRIOR_COMMITS = [
  '17abae0',
  'cf566ae',
  '728ad03',
  '401bfc7',
  'edceb29',
  'df388f4',
  '3800512',
  'c6df554',
];
const DEMO_ROOFER_NAME = 'Summit Peak Roofing Demo LLC';
const RECOMMENDED_NEXT_STEP = 'PASS_WITH_NOTES_CONTINUE_LOCAL_REFINEMENT';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

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

const REQUIRED_ASSERTIONS = [
  'evidence_doc_present',
  'structured_evidence_fixture_present',
  'structured_evidence_fixture_valid_json',
  'evidence_doc_review_only_scope_present',
  'source_of_truth_commit_c6df554_referenced',
  'prior_commit_17abae0_referenced',
  'prior_commit_cf566ae_referenced',
  'prior_commit_728ad03_referenced',
  'prior_commit_401bfc7_referenced',
  'prior_commit_edceb29_referenced',
  'prior_commit_df388f4_referenced',
  'prior_commit_3800512_referenced',
  'prior_commit_c6df554_referenced',
  'walkthrough_triage_packet_passed',
  'walkthrough_triage_verifier_passed_91_assertions',
  'walkthrough_triage_wrapper_passed',
  'pilot_readiness_demo_ready_with_live_automation_disabled',
  'safe_readiness_fast_lane_pass_17_checks',
  'backend_build_pass',
  'source_of_truth_pass',
  'final_clean_check_blank',
  'observation_triage_all_25_scenario_ids_present',
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
  'triage_decision_pass_local_demo_walkthrough_present',
  'triage_decision_pass_with_notes_continue_local_refinement_present',
  'triage_decision_hold_for_review_present',
  'triage_decision_fail_no_go_keep_blocked_present',
  'recommended_next_step_pass_with_notes_continue_local_refinement',
  'demo_roofer_fake',
  'scenario_count_25',
  'matched_outcome_count_25',
  'walkthrough_sections_count_25',
  'activation_approval_status_not_granted',
  'command_execution_status_not_run_by_this_packet',
  'approved_for_activation_now_false',
  'approved_channels_empty',
  'approved_external_services_empty',
  'activation_occurred_false',
  'external_calls_made_false',
  'credentials_env_api_webhook_access_false',
  'production_data_access_false',
  'schema_auth_rls_security_changes_false',
  'public_route_webhook_scheduler_cron_dispatcher_changes_false',
  'billing_payment_deposit_invoice_quote_estimate_automation_false',
  'live_services_used_false',
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
  'NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_WALKTHROUGH_OBSERVATION_EVIDENCE_CAPTURE.md',
  'run-native-workflow-fixture-demo-roofer-walkthrough-observation-evidence-capture-dry-run.sh',
  'verify-native-workflow-fixture-demo-roofer-walkthrough-observation-evidence-capture-readonly.js',
  'demo-walkthrough-observation-evidence-capture.json',
  'Native Workflow Fixture Demo Roofer Walkthrough Observation Evidence Capture',
  'native workflow fixture demo roofer walkthrough observation evidence capture',
  'demo roofer walkthrough observation evidence capture',
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

const evidenceDoc = read(evidenceDocPath);
const walkthroughDoc = read(walkthroughDocPath);
const observationTriageDoc = read(observationTriageDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);

passAssertion('evidence_doc_present');

mustHave(
  evidenceDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only evidence capture',
  'evidence doc',
);
passAssertion('evidence_doc_review_only_scope_present');

mustHave(evidenceDoc, SOURCE_OF_TRUTH_COMMIT, 'evidence doc');
passAssertion('source_of_truth_commit_c6df554_referenced');

for (const commit of PRIOR_COMMITS) {
  mustHave(evidenceDoc, commit, 'evidence doc');
}
passAssertion('prior_commit_17abae0_referenced');
passAssertion('prior_commit_cf566ae_referenced');
passAssertion('prior_commit_728ad03_referenced');
passAssertion('prior_commit_401bfc7_referenced');
passAssertion('prior_commit_edceb29_referenced');
passAssertion('prior_commit_df388f4_referenced');
passAssertion('prior_commit_3800512_referenced');
passAssertion('prior_commit_c6df554_referenced');

mustHave(evidenceDoc, 'walkthrough_triage_packet | PASS', 'evidence doc');
passAssertion('walkthrough_triage_packet_passed');

mustHave(evidenceDoc, '91 assertions', 'evidence doc');
mustHave(evidenceDoc, 'walkthrough_triage_verifier | PASS', 'evidence doc');
passAssertion('walkthrough_triage_verifier_passed_91_assertions');

mustHave(evidenceDoc, 'walkthrough_triage_wrapper | PASS', 'evidence doc');
passAssertion('walkthrough_triage_wrapper_passed');

mustHave(evidenceDoc, 'pilot_readiness | demo_ready_with_live_automation_disabled', 'evidence doc');
passAssertion('pilot_readiness_demo_ready_with_live_automation_disabled');

mustHave(evidenceDoc, 'safe_readiness_fast_lane | PASS', 'evidence doc');
mustHave(evidenceDoc, '17 checks', 'evidence doc');
passAssertion('safe_readiness_fast_lane_pass_17_checks');

mustHave(evidenceDoc, 'backend_build | PASS', 'evidence doc');
passAssertion('backend_build_pass');

mustHave(evidenceDoc, 'source_of_truth | PASS', 'evidence doc');
mustHave(evidenceDoc, 'HEAD == origin/main at c6df554', 'evidence doc');
passAssertion('source_of_truth_pass');

mustHave(evidenceDoc, 'final_clean_check | blank', 'evidence doc');
passAssertion('final_clean_check_blank');

for (const scenarioId of SCENARIO_IDS) {
  mustHave(walkthroughDoc, scenarioId, 'walkthrough doc');
  mustHave(observationTriageDoc, scenarioId, 'observation triage doc');
}
mustHave(evidenceDoc, 'scenario_ids | 25', 'evidence doc');
passAssertion('observation_triage_all_25_scenario_ids_present');

mustHave(evidenceDoc, 'PASS_WITH_NOTE', 'evidence doc');
mustHave(evidenceDoc, 'REVIEW_NEEDED', 'evidence doc');
mustHave(evidenceDoc, 'FAIL_NO_GO', 'evidence doc');
passAssertion('observation_status_pass_present');
passAssertion('observation_status_pass_with_note_present');
passAssertion('observation_status_review_needed_present');
passAssertion('observation_status_fail_no_go_present');

mustHave(evidenceDoc, 'INFO', 'evidence doc');
mustHave(evidenceDoc, 'LOW', 'evidence doc');
mustHave(evidenceDoc, 'MEDIUM', 'evidence doc');
mustHave(evidenceDoc, 'HIGH', 'evidence doc');
mustHave(evidenceDoc, 'BLOCKER', 'evidence doc');
passAssertion('severity_info_present');
passAssertion('severity_low_present');
passAssertion('severity_medium_present');
passAssertion('severity_high_present');
passAssertion('severity_blocker_present');

mustHave(evidenceDoc, 'Jason', 'evidence doc');
mustHave(evidenceDoc, 'Roofer', 'evidence doc');
mustHave(evidenceDoc, 'Engineering', 'evidence doc');
mustHave(evidenceDoc, 'Product', 'evidence doc');
mustHave(evidenceDoc, 'Legal/Compliance', 'evidence doc');
mustHave(evidenceDoc, 'Hold', 'evidence doc');
passAssertion('owner_jason_present');
passAssertion('owner_roofer_present');
passAssertion('owner_engineering_present');
passAssertion('owner_product_present');
passAssertion('owner_legal_compliance_present');
passAssertion('owner_hold_present');

mustHave(evidenceDoc, 'fake data clarity', 'evidence doc');
mustHave(evidenceDoc, 'scenario wording', 'evidence doc');
mustHave(evidenceDoc, 'expected outcome mismatch', 'evidence doc');
mustHave(evidenceDoc, 'review queue ambiguity', 'evidence doc');
mustHave(evidenceDoc, 'escalation ambiguity', 'evidence doc');
mustHave(evidenceDoc, 'compliance/messaging concern', 'evidence doc');
mustHave(evidenceDoc, 'post-inspection concern', 'evidence doc');
mustHave(evidenceDoc, 'feedback permission concern', 'evidence doc');
mustHave(evidenceDoc, 'reporting/CSV concern', 'evidence doc');
mustHave(evidenceDoc, 'source ROI concern', 'evidence doc');
mustHave(evidenceDoc, 'safety boundary concern', 'evidence doc');
mustHave(evidenceDoc, 'old 90-day plan reconciliation candidate', 'evidence doc');
mustHave(evidenceDoc, 'other', 'evidence doc');
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

mustHave(evidenceDoc, 'PASS_LOCAL_DEMO_WALKTHROUGH', 'evidence doc');
mustHave(evidenceDoc, 'HOLD_FOR_REVIEW', 'evidence doc');
mustHave(evidenceDoc, 'FAIL_NO_GO_KEEP_BLOCKED', 'evidence doc');
passAssertion('triage_decision_pass_local_demo_walkthrough_present');
passAssertion('triage_decision_pass_with_notes_continue_local_refinement_present');
passAssertion('triage_decision_hold_for_review_present');
passAssertion('triage_decision_fail_no_go_keep_blocked_present');

mustHave(evidenceDoc, RECOMMENDED_NEXT_STEP, 'evidence doc');
passAssertion('recommended_next_step_pass_with_notes_continue_local_refinement');

mustHave(evidenceDoc, DEMO_ROOFER_NAME, 'evidence doc');
mustHave(evidenceDoc, 'demo_roofer_is_fake | true', 'evidence doc');
passAssertion('demo_roofer_fake');

mustHave(evidenceDoc, 'scenario_count | 25', 'evidence doc');
passAssertion('scenario_count_25');

mustHave(evidenceDoc, 'matched_outcome_count | 25', 'evidence doc');
passAssertion('matched_outcome_count_25');

mustHave(evidenceDoc, 'walkthrough_sections_count | 25', 'evidence doc');
const sectionMatches = walkthroughDoc.match(/## Walkthrough Section \d+:/g) || [];
if (sectionMatches.length !== 25) {
  fail(`walkthrough doc must have 25 narrative sections (found ${sectionMatches.length})`);
}
passAssertion('walkthrough_sections_count_25');

mustHave(evidenceDoc, 'activation_approval_status | not_granted', 'evidence doc');
passAssertion('activation_approval_status_not_granted');
mustHave(evidenceDoc, 'command_execution_status | not_run_by_this_packet', 'evidence doc');
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(evidenceDoc, 'approved_for_activation_now | false', 'evidence doc');
passAssertion('approved_for_activation_now_false');
mustHave(evidenceDoc, 'approved_channels | []', 'evidence doc');
passAssertion('approved_channels_empty');
mustHave(evidenceDoc, 'approved_external_services | []', 'evidence doc');
passAssertion('approved_external_services_empty');

mustHave(evidenceDoc, 'activation | false', 'evidence doc');
passAssertion('activation_occurred_false');

mustHave(evidenceDoc, 'external_calls | false', 'evidence doc');
passAssertion('external_calls_made_false');

mustHave(evidenceDoc, 'credentials_env_api_webhook_access | false', 'evidence doc');
passAssertion('credentials_env_api_webhook_access_false');

mustHave(evidenceDoc, 'production_data_access | false', 'evidence doc');
passAssertion('production_data_access_false');

mustHave(evidenceDoc, 'schema_auth_rls_security_changes | false', 'evidence doc');
passAssertion('schema_auth_rls_security_changes_false');

mustHave(
  evidenceDoc,
  'public_route_webhook_scheduler_cron_dispatcher_changes | false',
  'evidence doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_changes_false');

mustHave(
  evidenceDoc,
  'billing_payment_deposit_invoice_quote_estimate_automation | false',
  'evidence doc',
);
passAssertion('billing_payment_deposit_invoice_quote_estimate_automation_false');

mustHave(evidenceDoc, 'live_services_used | false', 'evidence doc');
passAssertion('live_services_used_false');

mustHave(evidenceDoc, 'old 90-day plan cannot override current source-of-truth direction', 'evidence doc');
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(evidenceDoc, 'does **not** approve live activation', 'evidence doc');
mustHave(evidenceDoc, 'does **not** approve sandbox/test-mode activation', 'evidence doc');
mustHave(evidenceDoc, 'does **not** approve live/sandbox/test-mode/external activation', 'evidence doc');
mustHave(evidenceDoc, 'This is **not** approval to activate anything', 'evidence doc');
passAssertion('does_not_approve_activation');

mustHave(evidenceDoc, 'sandbox/test-mode activation', 'evidence doc');
mustHave(evidenceDoc, 'billing/payment/deposit/invoice/quote/estimate automation', 'evidence doc');
mustHave(evidenceDoc, 'schedulers, cron, or dispatchers', 'evidence doc');
mustHave(evidenceDoc, 'Twilio', 'evidence doc');
mustHave(evidenceDoc, 'Vapi', 'evidence doc');
mustHave(evidenceDoc, 'Resend', 'evidence doc');
mustHave(evidenceDoc, 'Google Calendar', 'evidence doc');
mustHave(evidenceDoc, 'Lindy', 'evidence doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(evidenceDoc, 'public_website_go_live_copy_changed | false', 'evidence doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(evidenceDoc, 'does **not** run the final activation command', 'evidence doc');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, evidenceFixturePath))) {
  fail(`missing structured evidence fixture: ${evidenceFixturePath}`);
}
passAssertion('structured_evidence_fixture_present');

const evidenceFixture = readJson(evidenceFixturePath);
if (evidenceFixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('evidence fixture source_of_truth_commit must be c6df554');
}
if (evidenceFixture.evidence_status !== 'passed') {
  fail('evidence fixture evidence_status must be passed');
}
if (evidenceFixture.demo_roofer_name !== DEMO_ROOFER_NAME) {
  fail('evidence fixture demo_roofer_name mismatch');
}
if (evidenceFixture.demo_roofer_is_fake !== true) {
  fail('evidence fixture demo_roofer_is_fake must be true');
}
if (evidenceFixture.walkthrough_sections_count !== 25) {
  fail('evidence fixture walkthrough_sections_count must be 25');
}
if (evidenceFixture.scenario_count !== 25) fail('evidence fixture scenario_count must be 25');
if (evidenceFixture.matched_outcome_count !== 25) {
  fail('evidence fixture matched_outcome_count must be 25');
}
if (evidenceFixture.verifier_assertions !== 91) {
  fail('evidence fixture verifier_assertions must be 91');
}
if (evidenceFixture.wrapper_result !== 'PASS') {
  fail('evidence fixture wrapper_result must be PASS');
}
if (evidenceFixture.pilot_readiness !== 'demo_ready_with_live_automation_disabled') {
  fail('evidence fixture pilot_readiness mismatch');
}
if (evidenceFixture.safe_readiness_fast_lane !== 'PASS') {
  fail('evidence fixture safe_readiness_fast_lane must be PASS');
}
if (evidenceFixture.safe_readiness_fast_lane_checks !== 17) {
  fail('evidence fixture safe_readiness_fast_lane_checks must be 17');
}
if (evidenceFixture.backend_build !== 'PASS') {
  fail('evidence fixture backend_build must be PASS');
}
if (evidenceFixture.source_of_truth !== 'PASS') {
  fail('evidence fixture source_of_truth must be PASS');
}
if (evidenceFixture.final_clean_check !== 'blank') {
  fail('evidence fixture final_clean_check must be blank');
}
if (evidenceFixture.recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('evidence fixture recommended_next_step mismatch');
}
if (evidenceFixture.activation_approval_status !== 'not_granted') {
  fail('evidence fixture activation_approval_status must be not_granted');
}
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
if (evidenceFixture.activation_occurred !== false) {
  fail('evidence fixture activation_occurred must be false');
}
if (evidenceFixture.external_calls_made !== false) {
  fail('evidence fixture external_calls_made must be false');
}
if (evidenceFixture.credentials_env_api_webhook_access !== false) {
  fail('evidence fixture credentials_env_api_webhook_access must be false');
}
if (evidenceFixture.production_data_access !== false) {
  fail('evidence fixture production_data_access must be false');
}
if (evidenceFixture.schema_auth_rls_security_changes !== false) {
  fail('evidence fixture schema_auth_rls_security_changes must be false');
}
if (evidenceFixture.public_route_webhook_scheduler_cron_dispatcher_changes !== false) {
  fail('evidence fixture public_route_webhook_scheduler_cron_dispatcher_changes must be false');
}
if (evidenceFixture.billing_payment_deposit_invoice_quote_estimate_automation !== false) {
  fail('evidence fixture billing_payment_deposit_invoice_quote_estimate_automation must be false');
}
if (evidenceFixture.live_services_used !== false) {
  fail('evidence fixture live_services_used must be false');
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
passAssertion('structured_evidence_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(evidenceDoc, phrase, 'evidence doc forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(evidenceDoc)) fail(`unsafe pattern ${pattern} found in evidence doc`);
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
  'verify-native-workflow-fixture-demo-roofer-walkthrough-observation-evidence-capture-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Demo Roofer Walkthrough Observation Evidence Capture',
  'aggregate readiness',
);
mustHave(verifierIndex, evidenceDocPath, 'verifier index');
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
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(evidenceDoc, walkthroughDocPath, 'evidence doc');
mustHave(evidenceDoc, observationTriageDocPath, 'evidence doc');
mustHave(evidenceDoc, triageFixturePath, 'evidence doc');
mustHave(evidenceDoc, evidenceFixturePath, 'evidence doc');
mustHave(evidenceDoc, triageVerifierPath, 'evidence doc');
mustHave(evidenceDoc, triageWrapperPath, 'evidence doc');

if (REQUIRED_ASSERTIONS.length !== 91) {
  fail(`REQUIRED_ASSERTIONS must contain 91 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Demo Roofer Walkthrough Observation Evidence Capture verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);