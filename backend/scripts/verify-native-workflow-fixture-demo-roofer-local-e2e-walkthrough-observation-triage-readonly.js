#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const walkthroughDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_WALKTHROUGH_SCRIPT.md';
const observationTriageDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OBSERVATION_TRIAGE_PACKET.md';
const triageFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/demo-local-e2e-walkthrough-observation-triage.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '3800512';
const PRIOR_COMMITS = ['17abae0', 'cf566ae', '728ad03', '401bfc7', 'edceb29', 'df388f4', '3800512'];
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

const REQUIRED_REVIEW_COMMANDS = [
  'node backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js',
  'node backend/scripts/generate-native-workflow-fixture-demo-roofer-e2e-evidence-report.js',
  'bash scripts/run-native-workflow-fixture-demo-roofer-e2e-evidence-report-dry-run.sh',
  'bash scripts/run-native-workflow-fixture-demo-roofer-local-e2e-operator-runbook-go-no-go-gate-dry-run.sh',
  'node backend/scripts/show-pilot-readiness-status.js',
  'bash scripts/verify-safe-readiness-fast.sh',
  'npm --prefix backend run build',
];

const REQUIRED_ASSERTIONS = [
  'walkthrough_doc_present',
  'observation_triage_doc_present',
  'walkthrough_review_only_scope_present',
  'observation_triage_review_only_scope_present',
  'structured_triage_fixture_present',
  'structured_triage_fixture_valid_json',
  'source_of_truth_commit_3800512_referenced',
  'prior_commit_17abae0_referenced',
  'prior_commit_cf566ae_referenced',
  'prior_commit_728ad03_referenced',
  'prior_commit_401bfc7_referenced',
  'prior_commit_edceb29_referenced',
  'prior_commit_df388f4_referenced',
  'prior_commit_3800512_referenced',
  'walkthrough_required_local_review_commands_present',
  'walkthrough_25_narrative_sections_present',
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
  'expected_outcome_count_25',
  'matched_outcome_count_25',
  'walkthrough_sections_count_25',
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
  'old_90_day_plan_cannot_override_current_source_of_truth',
  'triage_decision_does_not_approve_activation',
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
  'no_google_calendar_activation',
  'no_lindy_live_activation',
  'no_scheduler_cron_dispatcher_activation',
  'no_public_route_webhook_activation',
  'no_crm_sync_activation',
  'no_live_csv_delivery_activation',
  'no_billing_payment_quote_invoice_estimate_activation',
  'no_supabase_production_reads_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_env_credential_logging',
  'verifier_file_present',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_WALKTHROUGH_SCRIPT.md',
  'NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OBSERVATION_TRIAGE_PACKET.md',
  'run-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-dry-run.sh',
  'verify-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-readonly.js',
  'demo-local-e2e-walkthrough-observation-triage.json',
  'Native Workflow Fixture Demo Roofer Local E2E Walkthrough Script + Observation/Triage Packet',
  'native workflow fixture demo roofer local e2e walkthrough observation triage',
  'demo roofer local e2e walkthrough observation triage',
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

passAssertion('walkthrough_doc_present');
passAssertion('observation_triage_doc_present');

mustHave(
  walkthroughDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only demo walkthrough script',
  'walkthrough doc',
);
passAssertion('walkthrough_review_only_scope_present');

mustHave(
  observationTriageDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only observation and triage packet',
  'observation triage doc',
);
passAssertion('observation_triage_review_only_scope_present');

mustHave(walkthroughDoc, SOURCE_OF_TRUTH_COMMIT, 'walkthrough doc');
mustHave(observationTriageDoc, SOURCE_OF_TRUTH_COMMIT, 'observation triage doc');
passAssertion('source_of_truth_commit_3800512_referenced');

for (const commit of PRIOR_COMMITS) {
  mustHave(walkthroughDoc, commit, 'walkthrough doc');
  mustHave(observationTriageDoc, commit, 'observation triage doc');
}
passAssertion('prior_commit_17abae0_referenced');
passAssertion('prior_commit_cf566ae_referenced');
passAssertion('prior_commit_728ad03_referenced');
passAssertion('prior_commit_401bfc7_referenced');
passAssertion('prior_commit_edceb29_referenced');
passAssertion('prior_commit_df388f4_referenced');
passAssertion('prior_commit_3800512_referenced');

for (const cmd of REQUIRED_REVIEW_COMMANDS) {
  mustHave(walkthroughDoc, cmd, 'walkthrough doc');
}
passAssertion('walkthrough_required_local_review_commands_present');

const sectionMatches = walkthroughDoc.match(/## Walkthrough Section \d+:/g) || [];
if (sectionMatches.length !== 25) {
  fail(`walkthrough doc must have 25 narrative sections (found ${sectionMatches.length})`);
}
passAssertion('walkthrough_25_narrative_sections_present');

for (const scenarioId of SCENARIO_IDS) {
  mustHave(walkthroughDoc, scenarioId, 'walkthrough doc');
  mustHave(observationTriageDoc, scenarioId, 'observation triage doc');
}
passAssertion('observation_triage_all_25_scenario_ids_present');

mustHave(observationTriageDoc, 'PASS', 'observation triage doc');
mustHave(observationTriageDoc, 'PASS_WITH_NOTE', 'observation triage doc');
mustHave(observationTriageDoc, 'REVIEW_NEEDED', 'observation triage doc');
mustHave(observationTriageDoc, 'FAIL_NO_GO', 'observation triage doc');
passAssertion('observation_status_pass_present');
passAssertion('observation_status_pass_with_note_present');
passAssertion('observation_status_review_needed_present');
passAssertion('observation_status_fail_no_go_present');

mustHave(observationTriageDoc, 'INFO', 'observation triage doc');
mustHave(observationTriageDoc, 'LOW', 'observation triage doc');
mustHave(observationTriageDoc, 'MEDIUM', 'observation triage doc');
mustHave(observationTriageDoc, 'HIGH', 'observation triage doc');
mustHave(observationTriageDoc, 'BLOCKER', 'observation triage doc');
passAssertion('severity_info_present');
passAssertion('severity_low_present');
passAssertion('severity_medium_present');
passAssertion('severity_high_present');
passAssertion('severity_blocker_present');

mustHave(observationTriageDoc, 'Jason', 'observation triage doc');
mustHave(observationTriageDoc, 'Roofer', 'observation triage doc');
mustHave(observationTriageDoc, 'Engineering', 'observation triage doc');
mustHave(observationTriageDoc, 'Product', 'observation triage doc');
mustHave(observationTriageDoc, 'Legal/Compliance', 'observation triage doc');
mustHave(observationTriageDoc, 'Hold', 'observation triage doc');
passAssertion('owner_jason_present');
passAssertion('owner_roofer_present');
passAssertion('owner_engineering_present');
passAssertion('owner_product_present');
passAssertion('owner_legal_compliance_present');
passAssertion('owner_hold_present');

mustHave(observationTriageDoc, 'fake data clarity', 'observation triage doc');
mustHave(observationTriageDoc, 'scenario wording', 'observation triage doc');
mustHave(observationTriageDoc, 'expected outcome mismatch', 'observation triage doc');
mustHave(observationTriageDoc, 'review queue ambiguity', 'observation triage doc');
mustHave(observationTriageDoc, 'escalation ambiguity', 'observation triage doc');
mustHave(observationTriageDoc, 'compliance/messaging concern', 'observation triage doc');
mustHave(observationTriageDoc, 'post-inspection concern', 'observation triage doc');
mustHave(observationTriageDoc, 'feedback permission concern', 'observation triage doc');
mustHave(observationTriageDoc, 'reporting/CSV concern', 'observation triage doc');
mustHave(observationTriageDoc, 'source ROI concern', 'observation triage doc');
mustHave(observationTriageDoc, 'safety boundary concern', 'observation triage doc');
mustHave(observationTriageDoc, 'old 90-day plan reconciliation candidate', 'observation triage doc');
mustHave(observationTriageDoc, 'other', 'observation triage doc');
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

mustHave(observationTriageDoc, 'PASS_LOCAL_DEMO_WALKTHROUGH', 'observation triage doc');
mustHave(observationTriageDoc, 'PASS_WITH_NOTES_CONTINUE_LOCAL_REFINEMENT', 'observation triage doc');
mustHave(observationTriageDoc, 'HOLD_FOR_REVIEW', 'observation triage doc');
mustHave(observationTriageDoc, 'FAIL_NO_GO_KEEP_BLOCKED', 'observation triage doc');
passAssertion('triage_decision_pass_local_demo_walkthrough_present');
passAssertion('triage_decision_pass_with_notes_continue_local_refinement_present');
passAssertion('triage_decision_hold_for_review_present');
passAssertion('triage_decision_fail_no_go_keep_blocked_present');

mustHave(observationTriageDoc, RECOMMENDED_NEXT_STEP, 'observation triage doc');
mustHave(walkthroughDoc, DEMO_ROOFER_NAME, 'walkthrough doc');
mustHave(walkthroughDoc, 'demo_roofer_is_fake | true', 'walkthrough doc');
passAssertion('recommended_next_step_pass_with_notes_continue_local_refinement');
passAssertion('demo_roofer_fake');

mustHave(walkthroughDoc, 'scenario_count | 25', 'walkthrough doc');
passAssertion('scenario_count_25');
mustHave(walkthroughDoc, 'expected_outcome_count | 25', 'walkthrough doc');
passAssertion('expected_outcome_count_25');
mustHave(walkthroughDoc, 'matched_outcome_count | 25', 'walkthrough doc');
passAssertion('matched_outcome_count_25');
mustHave(walkthroughDoc, 'walkthrough_sections_count | 25', 'walkthrough doc');
passAssertion('walkthrough_sections_count_25');

mustHave(observationTriageDoc, 'activation_approval_status | not_granted', 'observation triage doc');
passAssertion('activation_approval_status_not_granted');
mustHave(observationTriageDoc, 'command_execution_status | not_run_by_this_packet', 'observation triage doc');
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(observationTriageDoc, 'approved_for_activation_now | false', 'observation triage doc');
passAssertion('approved_for_activation_now_false');
mustHave(observationTriageDoc, 'approved_channels | []', 'observation triage doc');
passAssertion('approved_channels_empty');
mustHave(observationTriageDoc, 'approved_external_services | []', 'observation triage doc');
passAssertion('approved_external_services_empty');
mustHave(observationTriageDoc, 'live_activation_allowed | false', 'observation triage doc');
passAssertion('live_activation_allowed_false');
mustHave(observationTriageDoc, 'sandbox_test_mode_activation_allowed | false', 'observation triage doc');
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(observationTriageDoc, 'external_calls_allowed | false', 'observation triage doc');
passAssertion('external_calls_allowed_false');
mustHave(observationTriageDoc, 'credentials_access_allowed | false', 'observation triage doc');
passAssertion('credentials_access_allowed_false');
mustHave(observationTriageDoc, 'production_data_access_allowed | false', 'observation triage doc');
passAssertion('production_data_access_allowed_false');
mustHave(observationTriageDoc, 'schema_auth_rls_security_changes_allowed | false', 'observation triage doc');
passAssertion('schema_auth_rls_security_changes_allowed_false');
mustHave(
  observationTriageDoc,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'observation triage doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
mustHave(observationTriageDoc, 'billing_payment_automation_allowed | false', 'observation triage doc');
passAssertion('billing_payment_automation_allowed_false');

mustHave(
  walkthroughDoc,
  'old 90-day plan cannot override current source-of-truth direction',
  'walkthrough doc',
);
mustHave(
  observationTriageDoc,
  'old 90-day plan cannot override current source-of-truth direction',
  'observation triage doc',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(
  observationTriageDoc,
  'No triage decision in this packet approves activation, external services, sandbox/test-mode, live services, credentials, production data, schema/auth/RLS/security changes, scheduler/cron/dispatcher, public route/webhook, billing/payment/quote/estimate/invoice automation, or final activation command execution.',
  'observation triage doc',
);
mustHave(observationTriageDoc, 'Does **not** approve activation', 'observation triage doc');
mustHave(observationTriageDoc, 'Does **not** approve live activation', 'observation triage doc');
mustHave(observationTriageDoc, 'Does **not** approve sandbox/test-mode activation', 'observation triage doc');
passAssertion('triage_decision_does_not_approve_activation');

mustHave(observationTriageDoc, 'sandbox/test-mode activation', 'observation triage doc');
mustHave(observationTriageDoc, 'billing/payment/quote/estimate/invoice automation', 'observation triage doc');
mustHave(observationTriageDoc, 'scheduler/cron/dispatcher', 'observation triage doc');
mustHave(observationTriageDoc, 'Twilio', 'observation triage doc');
mustHave(observationTriageDoc, 'Vapi', 'observation triage doc');
mustHave(observationTriageDoc, 'Resend', 'observation triage doc');
mustHave(observationTriageDoc, 'Google Calendar', 'observation triage doc');
mustHave(observationTriageDoc, 'Lindy', 'observation triage doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(walkthroughDoc, 'not public copy', 'walkthrough doc');
mustHave(walkthroughDoc, 'not a customer promise', 'walkthrough doc');
mustHave(walkthroughDoc, 'not live activation', 'walkthrough doc');
mustHave(observationTriageDoc, 'public_website_go_live_copy_changed | false', 'observation triage doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(walkthroughDoc, 'does **not** run the final activation command', 'walkthrough doc');
mustHave(observationTriageDoc, 'does **not** run the final activation command', 'observation triage doc');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, triageFixturePath))) {
  fail(`missing structured triage fixture: ${triageFixturePath}`);
}
passAssertion('structured_triage_fixture_present');

const triageFixture = readJson(triageFixturePath);
if (triageFixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('triage fixture source_of_truth_commit must be 3800512');
}
if (triageFixture.packet_status !== 'review_only') {
  fail('triage fixture packet_status must be review_only');
}
if (triageFixture.recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('triage fixture recommended_next_step mismatch');
}
if (triageFixture.demo_roofer_name !== DEMO_ROOFER_NAME) {
  fail('triage fixture demo_roofer_name mismatch');
}
if (triageFixture.demo_roofer_is_fake !== true) {
  fail('triage fixture demo_roofer_is_fake must be true');
}
if (triageFixture.scenario_count !== 25) fail('triage fixture scenario_count must be 25');
if (triageFixture.expected_outcome_count !== 25) {
  fail('triage fixture expected_outcome_count must be 25');
}
if (triageFixture.matched_outcome_count !== 25) {
  fail('triage fixture matched_outcome_count must be 25');
}
if (triageFixture.walkthrough_sections_count !== 25) {
  fail('triage fixture walkthrough_sections_count must be 25');
}
const observationStatusOptions = ['PASS', 'PASS_WITH_NOTE', 'REVIEW_NEEDED', 'FAIL_NO_GO'];
if (JSON.stringify(triageFixture.observation_status_options) !== JSON.stringify(observationStatusOptions)) {
  fail('triage fixture observation_status_options mismatch');
}
const severityOptions = ['INFO', 'LOW', 'MEDIUM', 'HIGH', 'BLOCKER'];
if (JSON.stringify(triageFixture.severity_options) !== JSON.stringify(severityOptions)) {
  fail('triage fixture severity_options mismatch');
}
const ownerOptions = ['Jason', 'Roofer', 'Engineering', 'Product', 'Legal/Compliance', 'Hold'];
if (JSON.stringify(triageFixture.owner_options) !== JSON.stringify(ownerOptions)) {
  fail('triage fixture owner_options mismatch');
}
const finalTriageDecisionOptions = [
  'PASS_LOCAL_DEMO_WALKTHROUGH',
  'PASS_WITH_NOTES_CONTINUE_LOCAL_REFINEMENT',
  'HOLD_FOR_REVIEW',
  'FAIL_NO_GO_KEEP_BLOCKED',
];
if (JSON.stringify(triageFixture.final_triage_decision_options) !== JSON.stringify(finalTriageDecisionOptions)) {
  fail('triage fixture final_triage_decision_options mismatch');
}
if (JSON.stringify(triageFixture.scenario_ids) !== JSON.stringify(SCENARIO_IDS)) {
  fail('triage fixture scenario_ids mismatch');
}
if (triageFixture.activation_approval_status !== 'not_granted') {
  fail('triage fixture activation_approval_status must be not_granted');
}
if (triageFixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('triage fixture command_execution_status must be not_run_by_this_packet');
}
if (triageFixture.approved_for_activation_now !== false) {
  fail('triage fixture approved_for_activation_now must be false');
}
if (!Array.isArray(triageFixture.approved_channels) || triageFixture.approved_channels.length !== 0) {
  fail('triage fixture approved_channels must be empty');
}
if (
  !Array.isArray(triageFixture.approved_external_services) ||
  triageFixture.approved_external_services.length !== 0
) {
  fail('triage fixture approved_external_services must be empty');
}
if (triageFixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('triage fixture safety_status mismatch');
}
if (triageFixture.live_activation_allowed !== false) {
  fail('triage fixture live_activation_allowed must be false');
}
if (triageFixture.sandbox_test_mode_activation_allowed !== false) {
  fail('triage fixture sandbox_test_mode_activation_allowed must be false');
}
if (triageFixture.external_calls_allowed !== false) {
  fail('triage fixture external_calls_allowed must be false');
}
if (triageFixture.credentials_access_allowed !== false) {
  fail('triage fixture credentials_access_allowed must be false');
}
if (triageFixture.production_data_access_allowed !== false) {
  fail('triage fixture production_data_access_allowed must be false');
}
if (triageFixture.schema_auth_rls_security_changes_allowed !== false) {
  fail('triage fixture schema_auth_rls_security_changes_allowed must be false');
}
if (triageFixture.public_route_webhook_scheduler_cron_dispatcher_allowed !== false) {
  fail('triage fixture public_route_webhook_scheduler_cron_dispatcher_allowed must be false');
}
if (triageFixture.billing_payment_automation_allowed !== false) {
  fail('triage fixture billing_payment_automation_allowed must be false');
}
if (
  triageFixture.old_90_day_plan_boundary !==
  'old 90-day plan cannot override current source-of-truth direction'
) {
  fail('triage fixture old_90_day_plan_boundary mismatch');
}
passAssertion('structured_triage_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(walkthroughDoc, phrase, 'walkthrough doc forbidden language');
  mustNotHave(observationTriageDoc, phrase, 'observation triage doc forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(walkthroughDoc)) {
    fail(`unsafe pattern ${pattern} found in walkthrough doc`);
  }
  if (pattern.test(observationTriageDoc)) {
    fail(`unsafe pattern ${pattern} found in observation triage doc`);
  }
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
passAssertion('no_google_calendar_activation');
passAssertion('no_lindy_live_activation');
passAssertion('no_scheduler_cron_dispatcher_activation');
passAssertion('no_public_route_webhook_activation');
passAssertion('no_crm_sync_activation');
passAssertion('no_live_csv_delivery_activation');
passAssertion('no_billing_payment_quote_invoice_estimate_activation');
passAssertion('no_supabase_production_reads_writes');
passAssertion('no_schema_migrations_auth_rls_security_changes');
passAssertion('no_secret_env_credential_logging');

mustHave(fullReadiness, 'verify-first-paid-pilot-readiness-readonly.js', 'full safe readiness');
mustHave(fullReadiness, 'npm --prefix backend run build', 'full safe readiness');
passAssertion('full_safe_readiness_lane_preserved');

mustHave(
  aggregate,
  'verify-native-workflow-fixture-demo-roofer-local-e2e-walkthrough-observation-triage-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Demo Roofer Local E2E Walkthrough Script + Observation/Triage Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, walkthroughDocPath, 'verifier index');
mustHave(verifierIndex, observationTriageDocPath, 'verifier index');
mustHave(verifierIndex, triageFixturePath, 'verifier index');
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

mustHave(walkthroughDoc, observationTriageDocPath, 'walkthrough doc');
mustHave(walkthroughDoc, triageFixturePath, 'walkthrough doc');
mustHave(observationTriageDoc, walkthroughDocPath, 'observation triage doc');
mustHave(observationTriageDoc, triageFixturePath, 'observation triage doc');

mustHave(walkthroughDoc, 'HEAD == origin/main', 'walkthrough doc');
mustHave(walkthroughDoc, 'git status blank', 'walkthrough doc');
mustHave(walkthroughDoc, 'demo_ready_with_live_automation_disabled', 'walkthrough doc');
mustHave(walkthroughDoc, '17 checks', 'walkthrough doc');

for (const assertion of REQUIRED_ASSERTIONS) {
  if (!REQUIRED_ASSERTIONS.includes(assertion)) {
    fail(`unhandled assertion: ${assertion}`);
  }
}

console.log(
  `PASS: Native Workflow Fixture Demo Roofer Local E2E Walkthrough Script + Observation/Triage Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);