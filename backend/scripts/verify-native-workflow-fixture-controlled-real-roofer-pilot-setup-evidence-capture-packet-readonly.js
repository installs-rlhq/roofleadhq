#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_EVIDENCE_CAPTURE_PACKET.md';
const evidenceTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_EVIDENCE_TEMPLATE.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_NO_GO_REVIEW.md';
const completenessGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_COMPLETENESS_GATE.md';
const setupChecklistDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REAL_ROOFER_PILOT_SETUP_CHECKLIST.md';
const validationPlanDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_VALIDATION_PLAN.md';
const noGoStopDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/controlled-real-roofer-pilot-setup-evidence-capture-packet.json';
const completenessGateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-channel-validation-completeness-gate.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-controlled-real-roofer-pilot-setup-evidence-capture-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-controlled-real-roofer-pilot-setup-evidence-capture-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = 'cc67563';
const UPSTREAM_COMPLETENESS_GATE_COMMIT = '15644fa';
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
];

const ALL_SETUP_STEP_IDS = [
  'CRPS-01',
  'CRPS-02',
  'CRPS-03',
  'CRPS-04',
  'CRPS-05',
  'CRPS-06',
  'CRPS-07',
  'CRPS-08',
  'CRPS-09',
  'CRPS-10',
  'CRPS-11',
  'CRPS-12',
];

const EVIDENCE_FIELDS = [
  'setup_step_id',
  'roofer_test_account_reference',
  'approved_scope_reference',
  'expected_setup_artifact',
  'observed_setup_artifact',
  'owner',
  'timestamp',
  'artifact_path',
  'pass_fail_result',
  'reviewer_signoff',
];

const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';
const RECOMMENDED_COMMAND =
  'bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'evidence_template_doc_present',
  'no_go_review_doc_present',
  'completeness_gate_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_completeness_gate_fixture_present',
  'source_of_truth_commit_cc67563_referenced',
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
  'local_demo_e2e_evidence_chain_status_passed',
  'local_demo_evidence_freeze_release_candidate_review_status_completed',
  'local_demo_release_candidate_management_summary_jason_review_status_completed',
  'roofer_pilot_essentials_planning_batch_status_completed',
  'channel_validation_completeness_gate_status_completed',
  'channel_validation_gate_decision_no_go_or_hold',
  'approval_capture_completeness_gate_status_completed',
  'approval_capture_gate_decision_no_go_or_hold',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'recommended_setup_step_counts_are_not_approval',
  'setup_evidence_capture_packet_does_not_equal_approval',
  'setup_evidence_template_does_not_equal_approval',
  'setup_no_go_review_does_not_equal_approval',
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
  'approval_capture_status_not_captured',
  'jason_signed_approval_status_not_signed',
  'setup_evidence_capture_status_not_captured',
  'controlled_real_roofer_setup_status_incomplete',
  'controlled_real_roofer_setup_gate_decision_no_go_or_hold',
  'controlled_real_roofer_setup_steps_count_12',
  'captured_setup_steps_count_0',
  'passed_setup_steps_count_0',
  'failed_setup_steps_count_0',
  'missing_setup_evidence_steps_count_12',
  'all_12_setup_step_ids_present',
  'all_12_setup_steps_evidence_capture_status_not_captured',
  'all_12_setup_steps_all_10_evidence_fields_blank',
  'fixture_all_10_evidence_fields_required_per_setup_step',
  'upstream_completeness_gate_status_completed',
  'packet_does_not_approve_sandbox_test_mode_activation',
  'packet_live_activation_remains_not_granted',
  'packet_blocks_controlled_real_roofer_setup_execution',
  'packet_blocks_real_roofer_onboarding_contact',
  'controlled_real_roofer_setup_blocked_until_sandbox_test_mode_evidence_complete',
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
  'NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_EVIDENCE_CAPTURE_PACKET.md',
  'NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_EVIDENCE_TEMPLATE.md',
  'NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-controlled-real-roofer-pilot-setup-evidence-capture-packet-dry-run.sh',
  'verify-native-workflow-fixture-controlled-real-roofer-pilot-setup-evidence-capture-packet-readonly.js',
  'controlled-real-roofer-pilot-setup-evidence-capture-packet.json',
  'Native Workflow Fixture Controlled Real Roofer Pilot Setup Evidence Capture Packet',
  'native workflow fixture controlled real roofer pilot setup evidence capture packet',
  'controlled real roofer pilot setup evidence capture packet',
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
const evidenceTemplateDoc = read(evidenceTemplateDocPath);
const noGoReviewDoc = read(noGoReviewDocPath);
const completenessGateDoc = read(completenessGateDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const combinedDocs = `${packetDoc}\n${evidenceTemplateDoc}\n${noGoReviewDoc}`;

passAssertion('packet_doc_present');
passAssertion('evidence_template_doc_present');
passAssertion('no_go_review_doc_present');
passAssertion('completeness_gate_doc_present');

for (const doc of [packetDoc, evidenceTemplateDoc, noGoReviewDoc]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'packet/template/no-go docs');
}
passAssertion('source_of_truth_commit_cc67563_referenced');

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

mustHave(packetDoc, 'channel_validation_completeness_gate_status | completed', 'packet doc');
passAssertion('channel_validation_completeness_gate_status_completed');
mustHave(packetDoc, 'channel_validation_gate_decision | NO_GO', 'packet doc');
mustHave(noGoReviewDoc, 'channel_validation_gate_decision | NO_GO', 'no-go review doc');
passAssertion('channel_validation_gate_decision_no_go_or_hold');

mustHave(packetDoc, 'approval_capture_completeness_gate_status | completed', 'packet doc');
passAssertion('approval_capture_completeness_gate_status_completed');
mustHave(packetDoc, 'approval_capture_gate_decision | NO_GO', 'packet doc');
passAssertion('approval_capture_gate_decision_no_go_or_hold');

mustHave(packetDoc, 'p0_blockers_count | 0', 'packet doc');
passAssertion('p0_blockers_count_0');
mustHave(packetDoc, 'p1_polish_status | completed', 'packet doc');
passAssertion('p1_polish_status_completed');
mustHave(packetDoc, 'p2_refinement_status | completed', 'packet doc');
passAssertion('p2_refinement_status_completed');
mustHave(packetDoc, 'p3_planning_status | completed', 'packet doc');
passAssertion('p3_planning_status_completed');

mustHave(packetDoc, 'Recommended setup step counts are **not** approval', 'packet doc');
mustHave(evidenceTemplateDoc, 'Recommended setup step counts are **not** approval', 'evidence template doc');
passAssertion('recommended_setup_step_counts_are_not_approval');

mustHave(
  packetDoc,
  'Setup evidence capture packet does **not** equal approval',
  'packet doc',
);
passAssertion('setup_evidence_capture_packet_does_not_equal_approval');

mustHave(packetDoc, 'Setup evidence template does **not** equal approval', 'packet doc');
mustHave(evidenceTemplateDoc, 'Setup evidence template does **not** equal approval', 'evidence template doc');
passAssertion('setup_evidence_template_does_not_equal_approval');

mustHave(packetDoc, 'Setup no-go review does **not** equal approval', 'packet doc');
mustHave(noGoReviewDoc, 'Setup no-go review does **not** equal approval', 'no-go review doc');
passAssertion('setup_no_go_review_does_not_equal_approval');

mustHave(packetDoc, 'Recommended defaults are **not** approval', 'packet doc');
passAssertion('recommended_defaults_are_not_approval');

mustHave(packetDoc, 'Recommended defaults are **not** accepted exact values', 'packet doc');
passAssertion('recommended_defaults_are_not_accepted_exact_values');

mustHave(packetDoc, 'exact_values_required_count | 19', 'packet doc');
mustHave(packetDoc, 'accepted_exact_values_count | 0', 'packet doc');
mustHave(packetDoc, 'accepted_exact_values_filled_count | 0', 'packet doc');
mustHave(packetDoc, 'approved_exact_values_filled_count | 0', 'packet doc');
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
mustHave(packetDoc, 'approval_capture_status | not_captured', 'packet doc');
passAssertion('approval_capture_status_not_captured');
mustHave(packetDoc, 'jason_signed_approval_status | not_signed', 'packet doc');
passAssertion('jason_signed_approval_status_not_signed');
mustHave(packetDoc, 'setup_evidence_capture_status | not_captured', 'packet doc');
passAssertion('setup_evidence_capture_status_not_captured');
mustHave(packetDoc, 'controlled_real_roofer_setup_status | incomplete', 'packet doc');
passAssertion('controlled_real_roofer_setup_status_incomplete');
mustHave(packetDoc, 'controlled_real_roofer_setup_gate_decision | NO_GO', 'packet doc');
passAssertion('controlled_real_roofer_setup_gate_decision_no_go_or_hold');

mustHave(packetDoc, 'controlled_real_roofer_setup_steps_count | 12', 'packet doc');
mustHave(packetDoc, 'captured_setup_steps_count | 0', 'packet doc');
mustHave(packetDoc, 'passed_setup_steps_count | 0', 'packet doc');
mustHave(packetDoc, 'failed_setup_steps_count | 0', 'packet doc');
mustHave(packetDoc, 'missing_setup_evidence_steps_count | 12', 'packet doc');
passAssertion('controlled_real_roofer_setup_steps_count_12');
passAssertion('captured_setup_steps_count_0');
passAssertion('passed_setup_steps_count_0');
passAssertion('failed_setup_steps_count_0');
passAssertion('missing_setup_evidence_steps_count_12');

for (const stepId of ALL_SETUP_STEP_IDS) {
  mustHave(evidenceTemplateDoc, stepId, 'evidence template doc setup step ids');
}
passAssertion('all_12_setup_step_ids_present');

for (const field of EVIDENCE_FIELDS) {
  mustHave(packetDoc, field, 'packet doc evidence fields');
  mustHave(evidenceTemplateDoc, field, 'evidence template doc evidence fields');
  mustHave(noGoReviewDoc, field, 'no-go review doc evidence fields');
}

mustHave(
  packetDoc,
  'Controlled real roofer setup is blocked until sandbox/test-mode channel validation evidence is complete and separately approved',
  'packet doc',
);
passAssertion('controlled_real_roofer_setup_blocked_until_sandbox_test_mode_evidence_complete');

passAssertion('structured_fixture_present');
const fixture = readJson(fixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be cc67563');
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
if (fixture.setup_evidence_capture_status !== 'not_captured') {
  fail('fixture setup_evidence_capture_status must be not_captured');
}
if (fixture.controlled_real_roofer_setup_status !== 'incomplete') {
  fail('fixture controlled_real_roofer_setup_status must be incomplete');
}
if (fixture.controlled_real_roofer_setup_gate_decision !== 'NO_GO') {
  fail('fixture controlled_real_roofer_setup_gate_decision must be NO_GO');
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
if (fixture.setup_evidence_capture_packet_does_not_equal_approval !== true) {
  fail('fixture setup_evidence_capture_packet_does_not_equal_approval must be true');
}
if (fixture.setup_evidence_template_does_not_equal_approval !== true) {
  fail('fixture setup_evidence_template_does_not_equal_approval must be true');
}
if (fixture.setup_no_go_review_does_not_equal_approval !== true) {
  fail('fixture setup_no_go_review_does_not_equal_approval must be true');
}
if (fixture.recommended_setup_step_counts_are_not_approval !== true) {
  fail('fixture recommended_setup_step_counts_are_not_approval must be true');
}
if (fixture.exact_values_required_count !== 19) {
  fail('fixture exact_values_required_count must be 19');
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
if (fixture.default_sandbox_test_mode_decision !== 'HOLD') {
  fail('fixture default_sandbox_test_mode_decision must be HOLD');
}
if (fixture.controlled_real_roofer_setup_steps_count !== 12) {
  fail('fixture controlled_real_roofer_setup_steps_count must be 12');
}
if (fixture.captured_setup_steps_count !== 0) {
  fail('fixture captured_setup_steps_count must be 0');
}
if (fixture.passed_setup_steps_count !== 0) {
  fail('fixture passed_setup_steps_count must be 0');
}
if (fixture.failed_setup_steps_count !== 0) {
  fail('fixture failed_setup_steps_count must be 0');
}
if (fixture.missing_setup_evidence_steps_count !== 12) {
  fail('fixture missing_setup_evidence_steps_count must be 12');
}

if (!Array.isArray(fixture.controlled_real_roofer_setup_steps) || fixture.controlled_real_roofer_setup_steps.length !== 12) {
  fail('fixture controlled_real_roofer_setup_steps must contain 12 steps');
}
for (const step of fixture.controlled_real_roofer_setup_steps) {
  if (step.evidence_capture_status !== 'not_captured') {
    fail(`setup step ${step.setup_step_id} evidence_capture_status must be not_captured`);
  }
  for (const field of EVIDENCE_FIELDS) {
    if (!(field in step.evidence_capture)) {
      fail(`setup step ${step.setup_step_id} missing evidence field ${field}`);
    }
    if (step.evidence_capture[field] !== '') {
      fail(`setup step ${step.setup_step_id} evidence field ${field} must be blank`);
    }
  }
}
passAssertion('all_12_setup_steps_evidence_capture_status_not_captured');
passAssertion('all_12_setup_steps_all_10_evidence_fields_blank');

if (
  !Array.isArray(fixture.evidence_fields_required_per_setup_step) ||
  fixture.evidence_fields_required_per_setup_step.length !== 10
) {
  fail('fixture evidence_fields_required_per_setup_step must contain 10 fields');
}
for (const field of EVIDENCE_FIELDS) {
  if (!fixture.evidence_fields_required_per_setup_step.includes(field)) {
    fail(`fixture evidence_fields_required_per_setup_step missing ${field}`);
  }
}
passAssertion('fixture_all_10_evidence_fields_required_per_setup_step');

if (!fs.existsSync(path.join(root, completenessGateFixturePath))) {
  fail(`missing upstream completeness gate fixture: ${completenessGateFixturePath}`);
}
const completenessGateFixture = readJson(completenessGateFixturePath);
if (completenessGateFixture.packet_status !== 'review_only') {
  fail('upstream completeness gate fixture packet_status must be review_only');
}
passAssertion('upstream_completeness_gate_fixture_present');
passAssertion('upstream_completeness_gate_status_completed');

if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
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

passAssertion('packet_does_not_approve_sandbox_test_mode_activation');
passAssertion('packet_live_activation_remains_not_granted');
passAssertion('packet_blocks_controlled_real_roofer_setup_execution');
passAssertion('packet_blocks_real_roofer_onboarding_contact');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');
passAssertion('live_activation_allowed_false');
passAssertion('sandbox_test_mode_activation_allowed_false');
passAssertion('real_roofer_onboarding_contact_allowed_false');
passAssertion('real_roofer_contact_allowed_false');
passAssertion('external_calls_allowed_false');
passAssertion('credentials_access_allowed_false');
passAssertion('production_data_access_allowed_false');
passAssertion('schema_auth_rls_security_changes_allowed_false');
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
passAssertion('billing_payment_automation_allowed_false');
passAssertion('public_go_live_or_production_copy_changes_allowed_false');
passAssertion('real_demo_sandbox_live_testing_allowed_false');

if (
  !Array.isArray(fixture.evidence_chain_commits) ||
  fixture.evidence_chain_commits.length !== 27
) {
  fail('fixture evidence_chain_commits must contain 27 commits');
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
  'Native Workflow Fixture Controlled Real Roofer Pilot Setup Evidence Capture Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, packetDocPath, 'verifier index');
mustHave(verifierIndex, evidenceTemplateDocPath, 'verifier index');
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
mustHave(wrapper, 'Recommended setup step counts are not approval', 'wrapper mode');
mustHave(wrapper, 'Setup evidence capture packet does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Setup evidence template does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Setup no-go review does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Default sandbox/test-mode decision remains HOLD', 'wrapper mode');
mustHave(wrapper, 'Channel validation gate decision is NO_GO', 'wrapper mode');
mustHave(
  wrapper,
  'Controlled real roofer setup blocked until sandbox/test-mode evidence is complete and separately approved',
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

mustHave(packetDoc, evidenceTemplateDocPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');
mustHave(packetDoc, completenessGateDocPath, 'packet doc');
mustHave(packetDoc, setupChecklistDocPath, 'packet doc');
mustHave(packetDoc, validationPlanDocPath, 'packet doc');
mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');

mustHave(packetDoc, 'old 90-day plan cannot override current source-of-truth direction', 'packet doc');
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');
passAssertion('does_not_approve_activation');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');
passAssertion('public_go_live_or_production_copy_not_changed');

if (REQUIRED_ASSERTIONS.length !== 120) {
  fail(`REQUIRED_ASSERTIONS must contain 120 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Controlled Real Roofer Pilot Setup Evidence Capture Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);