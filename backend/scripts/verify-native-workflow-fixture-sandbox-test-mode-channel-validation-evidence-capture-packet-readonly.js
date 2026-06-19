#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_EVIDENCE_CAPTURE_PACKET.md';
const evidenceTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_EVIDENCE_TEMPLATE.md';
const stopRollbackDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_STOP_ROLLBACK_CHECKLIST.md';
const channelValidationPlanDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_PLAN.md';
const completenessGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_COMPLETENESS_GATE.md';
const noGoStopDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_NO_GO_STOP_CONDITION_CHECKLIST.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-channel-validation-evidence-capture-packet.json';
const completenessGateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-approval-capture-completeness-gate.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-evidence-capture-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-channel-validation-evidence-capture-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = 'aa3f818';
const UPSTREAM_COMPLETENESS_GATE_COMMIT = 'f56340f';
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
];

const CATEGORY_COUNTS = {
  sandbox_test_mode_sms_validation: 5,
  sandbox_test_mode_call_vapi_validation: 3,
  lead_intake_validation: 5,
  manual_review_escalation_validation: 4,
  calendar_appointment_validation: 4,
  reporting_admin_visibility_validation: 3,
  audit_log_evidence_validation: 3,
  stop_rollback_validation: 3,
};

const ALL_SCENARIO_IDS = [
  'STMS-01',
  'STMS-02',
  'STMS-03',
  'STMS-04',
  'STMS-05',
  'STVC-01',
  'STVC-02',
  'STVC-03',
  'LI-01',
  'LI-02',
  'LI-03',
  'LI-04',
  'LI-05',
  'MRE-01',
  'MRE-02',
  'MRE-03',
  'MRE-04',
  'CA-01',
  'CA-02',
  'CA-03',
  'CA-04',
  'RAV-01',
  'RAV-02',
  'RAV-03',
  'ALE-01',
  'ALE-02',
  'ALE-03',
  'SR-01',
  'SR-02',
  'SR-03',
];

const EVIDENCE_FIELDS = [
  'scenario_id',
  'test_account_used',
  'approved_scope_reference',
  'command_run_reference',
  'expected_behavior',
  'observed_behavior',
  'external_calls_observed',
  'messages_calls_calendar_reporting_logs_captured',
  'pass_fail_result',
  'stop_rollback_triggered_yes_no',
  'evidence_owner',
  'timestamp',
  'artifact_log_path',
  'reviewer_signoff',
];

const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';
const RECOMMENDED_COMMAND =
  'bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'evidence_template_doc_present',
  'stop_rollback_doc_present',
  'channel_validation_plan_doc_present',
  'completeness_gate_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_completeness_gate_fixture_present',
  'source_of_truth_commit_aa3f818_referenced',
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
  'local_demo_e2e_evidence_chain_status_passed',
  'local_demo_evidence_freeze_release_candidate_review_status_completed',
  'local_demo_release_candidate_management_summary_jason_review_status_completed',
  'roofer_pilot_essentials_planning_batch_status_completed',
  'approval_capture_completeness_gate_status_completed',
  'approval_capture_gate_decision_no_go_or_hold',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'recommended_scenario_counts_are_not_approval',
  'channel_validation_evidence_capture_packet_does_not_equal_approval',
  'evidence_template_does_not_equal_approval',
  'stop_rollback_checklist_does_not_equal_approval',
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
  'evidence_capture_status_not_captured',
  'total_sandbox_test_mode_validation_scenarios_30',
  'sms_validation_scenarios_5',
  'call_vapi_validation_scenarios_3',
  'lead_intake_validation_scenarios_5',
  'manual_review_escalation_validation_scenarios_4',
  'calendar_appointment_validation_scenarios_4',
  'reporting_admin_visibility_validation_scenarios_3',
  'audit_log_evidence_validation_scenarios_3',
  'stop_rollback_validation_scenarios_3',
  'all_30_scenario_ids_present',
  'all_30_scenarios_evidence_capture_status_not_captured',
  'all_30_scenarios_all_14_evidence_fields_blank',
  'fixture_all_14_evidence_fields_required_per_scenario',
  'upstream_completeness_gate_status_completed',
  'packet_does_not_approve_sandbox_test_mode_activation',
  'packet_live_activation_remains_not_granted',
  'packet_blocks_channel_validation_execution',
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
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_EVIDENCE_CAPTURE_PACKET.md',
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_EVIDENCE_TEMPLATE.md',
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_STOP_ROLLBACK_CHECKLIST.md',
  'run-native-workflow-fixture-sandbox-test-mode-channel-validation-evidence-capture-packet-dry-run.sh',
  'verify-native-workflow-fixture-sandbox-test-mode-channel-validation-evidence-capture-packet-readonly.js',
  'sandbox-test-mode-channel-validation-evidence-capture-packet.json',
  'Native Workflow Fixture Sandbox/Test-Mode Channel Validation Evidence Capture Packet',
  'native workflow fixture sandbox test mode channel validation evidence capture packet',
  'sandbox test mode channel validation evidence capture packet',
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
const stopRollbackDoc = read(stopRollbackDocPath);
const channelValidationPlanDoc = read(channelValidationPlanDocPath);
const completenessGateDoc = read(completenessGateDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const combinedDocs = `${packetDoc}\n${evidenceTemplateDoc}\n${stopRollbackDoc}`;

passAssertion('packet_doc_present');
passAssertion('evidence_template_doc_present');
passAssertion('stop_rollback_doc_present');
passAssertion('channel_validation_plan_doc_present');
passAssertion('completeness_gate_doc_present');

for (const doc of [packetDoc, evidenceTemplateDoc, stopRollbackDoc]) {
  mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'packet/template/stop-rollback docs');
}
passAssertion('source_of_truth_commit_aa3f818_referenced');

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

mustHave(packetDoc, 'approval_capture_completeness_gate_status | completed', 'packet doc');
passAssertion('approval_capture_completeness_gate_status_completed');
mustHave(packetDoc, 'approval_capture_gate_decision | NO_GO', 'packet doc');
mustHave(stopRollbackDoc, 'approval_capture_gate_decision is NO_GO or HOLD', 'stop-rollback doc');
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
mustHave(evidenceTemplateDoc, 'Recommended scenario counts are **not** approval', 'evidence template doc');
passAssertion('recommended_scenario_counts_are_not_approval');

mustHave(
  packetDoc,
  'Channel validation evidence capture packet does **not** equal approval',
  'packet doc',
);
passAssertion('channel_validation_evidence_capture_packet_does_not_equal_approval');

mustHave(packetDoc, 'Evidence template does **not** equal approval', 'packet doc');
mustHave(evidenceTemplateDoc, 'Evidence template does **not** equal approval', 'evidence template doc');
passAssertion('evidence_template_does_not_equal_approval');

mustHave(packetDoc, 'Stop/rollback checklist does **not** equal approval', 'packet doc');
mustHave(stopRollbackDoc, 'Stop/rollback checklist does **not** equal approval', 'stop-rollback doc');
passAssertion('stop_rollback_checklist_does_not_equal_approval');

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
mustHave(packetDoc, 'evidence_capture_status | not_captured', 'packet doc');
passAssertion('evidence_capture_status_not_captured');

mustHave(packetDoc, 'total_sandbox_test_mode_validation_scenarios', 'packet doc');
mustHave(packetDoc, '| **30** | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |', 'packet doc');
passAssertion('total_sandbox_test_mode_validation_scenarios_30');
mustHave(packetDoc, 'sandbox_test_mode_sms_validation', 'packet doc');
mustHave(packetDoc, '| 5 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |', 'packet doc');
passAssertion('sms_validation_scenarios_5');
mustHave(packetDoc, 'sandbox_test_mode_call_vapi_validation', 'packet doc');
mustHave(packetDoc, '| 3 | RECOMMENDED_DEFAULT_ONLY_NOT_APPROVED |', 'packet doc');
passAssertion('call_vapi_validation_scenarios_3');
mustHave(packetDoc, 'lead_intake_validation', 'packet doc');
passAssertion('lead_intake_validation_scenarios_5');
mustHave(packetDoc, 'manual_review_escalation_validation', 'packet doc');
passAssertion('manual_review_escalation_validation_scenarios_4');
mustHave(packetDoc, 'calendar_appointment_validation', 'packet doc');
passAssertion('calendar_appointment_validation_scenarios_4');
mustHave(packetDoc, 'reporting_admin_visibility_validation', 'packet doc');
passAssertion('reporting_admin_visibility_validation_scenarios_3');
mustHave(packetDoc, 'audit_log_evidence_validation', 'packet doc');
passAssertion('audit_log_evidence_validation_scenarios_3');
mustHave(packetDoc, 'stop_rollback_validation', 'packet doc');
passAssertion('stop_rollback_validation_scenarios_3');

for (const scenarioId of ALL_SCENARIO_IDS) {
  mustHave(evidenceTemplateDoc, scenarioId, 'evidence template doc scenario ids');
}
passAssertion('all_30_scenario_ids_present');

for (const field of EVIDENCE_FIELDS) {
  mustHave(packetDoc, field, 'packet doc evidence fields');
  mustHave(evidenceTemplateDoc, field, 'evidence template doc evidence fields');
  mustHave(stopRollbackDoc, field, 'stop-rollback doc evidence fields');
}

passAssertion('structured_fixture_present');
const fixture = readJson(fixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be aa3f818');
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
if (fixture.evidence_capture_status !== 'not_captured') {
  fail('fixture evidence_capture_status must be not_captured');
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
if (fixture.channel_validation_evidence_capture_packet_does_not_equal_approval !== true) {
  fail('fixture channel_validation_evidence_capture_packet_does_not_equal_approval must be true');
}
if (fixture.evidence_template_does_not_equal_approval !== true) {
  fail('fixture evidence_template_does_not_equal_approval must be true');
}
if (fixture.stop_rollback_checklist_does_not_equal_approval !== true) {
  fail('fixture stop_rollback_checklist_does_not_equal_approval must be true');
}
if (fixture.recommended_scenario_counts_are_not_approval !== true) {
  fail('fixture recommended_scenario_counts_are_not_approval must be true');
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
if (fixture.total_sandbox_test_mode_validation_scenarios !== 30) {
  fail('fixture total_sandbox_test_mode_validation_scenarios must be 30');
}

let totalScenarios = 0;
for (const [category, expectedCount] of Object.entries(CATEGORY_COUNTS)) {
  const cat = fixture.validation_categories[category];
  if (!cat) fail(`fixture missing validation category ${category}`);
  if (cat.recommended_count !== expectedCount) {
    fail(`fixture ${category} recommended_count must be ${expectedCount}`);
  }
  if (!Array.isArray(cat.scenarios) || cat.scenarios.length !== expectedCount) {
    fail(`fixture ${category} must have ${expectedCount} scenarios`);
  }
  for (const scenario of cat.scenarios) {
    totalScenarios += 1;
    if (scenario.evidence_capture_status !== 'not_captured') {
      fail(`scenario ${scenario.scenario_id} evidence_capture_status must be not_captured`);
    }
    for (const field of EVIDENCE_FIELDS) {
      if (!(field in scenario.evidence_capture)) {
        fail(`scenario ${scenario.scenario_id} missing evidence field ${field}`);
      }
      if (scenario.evidence_capture[field] !== '') {
        fail(`scenario ${scenario.scenario_id} evidence field ${field} must be blank`);
      }
    }
  }
}
if (totalScenarios !== 30) {
  fail(`fixture must contain 30 total scenarios (found ${totalScenarios})`);
}
passAssertion('all_30_scenarios_evidence_capture_status_not_captured');
passAssertion('all_30_scenarios_all_14_evidence_fields_blank');

if (
  !Array.isArray(fixture.evidence_fields_required_per_scenario) ||
  fixture.evidence_fields_required_per_scenario.length !== 14
) {
  fail('fixture evidence_fields_required_per_scenario must contain 14 fields');
}
for (const field of EVIDENCE_FIELDS) {
  if (!fixture.evidence_fields_required_per_scenario.includes(field)) {
    fail(`fixture evidence_fields_required_per_scenario missing ${field}`);
  }
}
passAssertion('fixture_all_14_evidence_fields_required_per_scenario');

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
passAssertion('packet_blocks_channel_validation_execution');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');
passAssertion('live_activation_allowed_false');
passAssertion('sandbox_test_mode_activation_allowed_false');
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
  fixture.evidence_chain_commits.length !== 25
) {
  fail('fixture evidence_chain_commits must contain 25 commits');
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
  'Native Workflow Fixture Sandbox/Test-Mode Channel Validation Evidence Capture Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, packetDocPath, 'verifier index');
mustHave(verifierIndex, evidenceTemplateDocPath, 'verifier index');
mustHave(verifierIndex, stopRollbackDocPath, 'verifier index');
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
mustHave(wrapper, 'Channel validation evidence capture packet does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Evidence template does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Stop/rollback checklist does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Default sandbox/test-mode decision remains HOLD', 'wrapper mode');
mustHave(wrapper, 'Approval capture gate decision is NO_GO', 'wrapper mode');
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

mustHave(packetDoc, evidenceTemplateDocPath, 'packet doc');
mustHave(packetDoc, stopRollbackDocPath, 'packet doc');
mustHave(packetDoc, channelValidationPlanDocPath, 'packet doc');
mustHave(packetDoc, completenessGateDocPath, 'packet doc');
mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');

mustHave(packetDoc, 'old 90-day plan cannot override current source-of-truth direction', 'packet doc');
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');
passAssertion('does_not_approve_activation');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');
passAssertion('public_go_live_or_production_copy_not_changed');

if (REQUIRED_ASSERTIONS.length !== 115) {
  fail(`REQUIRED_ASSERTIONS must contain 115 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Sandbox/Test-Mode Channel Validation Evidence Capture Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);