#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_PILOT_READINESS_MASTER_NO_GO_APPROVAL_DEPENDENCY_SUMMARY.md';
const approvalCaptureCompletenessGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_COMPLETENESS_GATE.md';
const channelValidationCompletenessGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_COMPLETENESS_GATE.md';
const setupCompletenessGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_PILOT_SETUP_COMPLETENESS_GATE.md';
const limitedValidationCompletenessGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_REAL_ROOFER_LIMITED_VALIDATION_COMPLETENESS_GATE.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/pilot-readiness-master-no-go-approval-dependency-summary.json';
const approvalCaptureCompletenessGateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-approval-capture-completeness-gate.json';
const channelValidationCompletenessGateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-channel-validation-completeness-gate.json';
const setupCompletenessGateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/controlled-real-roofer-pilot-setup-completeness-gate.json';
const limitedValidationCompletenessGateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/controlled-real-roofer-limited-validation-completeness-gate.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-pilot-readiness-master-no-go-approval-dependency-summary-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-pilot-readiness-master-no-go-approval-dependency-summary-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '32c2c8b';
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
  '32c2c8b',
];

const DEPENDENCY_LADDER = [
  'Jason exact signed sandbox/test-mode approval captured',
  'all 19 exact values accepted and approved',
  'sandbox/test-mode channel validation evidence captured and passed',
  'controlled real roofer setup evidence captured and passed',
  'controlled real roofer limited validation evidence captured and passed',
  'separate later live activation approval, if ever pursued',
];

const RECOMMENDED_NEXT_STEP =
  'JASON_COMPLETE_APPROVAL_DEPENDENCY_LADDER_STEP_1_SIGNED_SANDBOX_TEST_MODE_APPROVAL_BEFORE_ANY_ACTIVATION_CONSIDERATION';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'approval_capture_completeness_gate_doc_present',
  'channel_validation_completeness_gate_doc_present',
  'setup_completeness_gate_doc_present',
  'limited_validation_completeness_gate_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_approval_capture_completeness_gate_fixture_present',
  'upstream_channel_validation_completeness_gate_fixture_present',
  'upstream_setup_completeness_gate_fixture_present',
  'upstream_limited_validation_completeness_gate_fixture_present',
  'source_of_truth_commit_32c2c8b_referenced',
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
  'prior_commit_32c2c8b_referenced',
  'local_demo_e2e_evidence_chain_status_passed',
  'local_demo_evidence_freeze_release_candidate_review_status_completed',
  'local_demo_release_candidate_management_summary_jason_review_status_completed',
  'roofer_pilot_essentials_planning_batch_status_completed',
  'approval_capture_completeness_gate_status_completed',
  'channel_validation_completeness_gate_status_completed',
  'controlled_real_roofer_pilot_setup_completeness_gate_status_completed',
  'controlled_real_roofer_limited_validation_completeness_gate_status_completed',
  'approval_capture_gate_decision_no_go_or_hold',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'master_summary_does_not_equal_approval',
  'dependency_summary_does_not_equal_approval',
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
  'sandbox_test_mode_channel_validation_scenarios_count_30',
  'captured_sandbox_test_mode_channel_validation_scenarios_count_0',
  'missing_sandbox_test_mode_channel_validation_scenarios_count_30',
  'channel_validation_gate_decision_no_go_or_hold',
  'controlled_real_roofer_setup_steps_count_12',
  'captured_controlled_real_roofer_setup_steps_count_0',
  'missing_controlled_real_roofer_setup_steps_count_12',
  'controlled_real_roofer_setup_gate_decision_no_go_or_hold',
  'controlled_real_roofer_limited_validation_scenarios_count_5',
  'captured_controlled_real_roofer_limited_validation_scenarios_count_0',
  'missing_controlled_real_roofer_limited_validation_scenarios_count_5',
  'controlled_real_roofer_limited_validation_gate_decision_no_go_or_hold',
  'pilot_readiness_master_gate_decision_no_go_or_hold',
  'dependency_ladder_all_6_steps_present',
  'fixture_dependency_ladder_all_steps_not_complete',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'approved_channels_empty',
  'approved_external_services_empty',
  'live_activation_allowed_false',
  'sandbox_test_mode_activation_allowed_false',
  'real_roofer_onboarding_contact_allowed_false',
  'real_roofer_contact_allowed_false',
  'controlled_real_roofer_validation_allowed_false',
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
  'NATIVE_WORKFLOW_FIXTURE_PILOT_READINESS_MASTER_NO_GO_APPROVAL_DEPENDENCY_SUMMARY.md',
  'run-native-workflow-fixture-pilot-readiness-master-no-go-approval-dependency-summary-dry-run.sh',
  'verify-native-workflow-fixture-pilot-readiness-master-no-go-approval-dependency-summary-readonly.js',
  'pilot-readiness-master-no-go-approval-dependency-summary.json',
  'Native Workflow Fixture Pilot Readiness Master NO-GO / Approval Dependency Summary',
  'native workflow fixture pilot readiness master no go approval dependency summary',
  'pilot readiness master no go approval dependency summary',
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
read(approvalCaptureCompletenessGateDocPath);
read(channelValidationCompletenessGateDocPath);
read(setupCompletenessGateDocPath);
read(limitedValidationCompletenessGateDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);

passAssertion('packet_doc_present');
passAssertion('approval_capture_completeness_gate_doc_present');
passAssertion('channel_validation_completeness_gate_doc_present');
passAssertion('setup_completeness_gate_doc_present');
passAssertion('limited_validation_completeness_gate_doc_present');

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
passAssertion('source_of_truth_commit_32c2c8b_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc');
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
passAssertion('prior_commit_32c2c8b_referenced');

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
mustHave(packetDoc, 'channel_validation_completeness_gate_status | completed', 'packet doc');
passAssertion('channel_validation_completeness_gate_status_completed');
mustHave(
  packetDoc,
  'controlled_real_roofer_pilot_setup_completeness_gate_status | completed',
  'packet doc',
);
passAssertion('controlled_real_roofer_pilot_setup_completeness_gate_status_completed');
mustHave(
  packetDoc,
  'controlled_real_roofer_limited_validation_completeness_gate_status | completed',
  'packet doc',
);
passAssertion('controlled_real_roofer_limited_validation_completeness_gate_status_completed');

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

mustHave(packetDoc, 'Master summary does **not** equal approval', 'packet doc');
passAssertion('master_summary_does_not_equal_approval');
mustHave(packetDoc, 'Dependency summary does **not** equal approval', 'packet doc');
passAssertion('dependency_summary_does_not_equal_approval');

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

mustHave(packetDoc, 'sandbox_test_mode_channel_validation_scenarios_count | 30', 'packet doc');
mustHave(packetDoc, 'captured_sandbox_test_mode_channel_validation_scenarios_count | 0', 'packet doc');
mustHave(packetDoc, 'missing_sandbox_test_mode_channel_validation_scenarios_count | 30', 'packet doc');
passAssertion('sandbox_test_mode_channel_validation_scenarios_count_30');
passAssertion('captured_sandbox_test_mode_channel_validation_scenarios_count_0');
passAssertion('missing_sandbox_test_mode_channel_validation_scenarios_count_30');
mustHave(packetDoc, 'channel_validation_gate_decision | NO_GO', 'packet doc');
passAssertion('channel_validation_gate_decision_no_go_or_hold');

mustHave(packetDoc, 'controlled_real_roofer_setup_steps_count | 12', 'packet doc');
mustHave(packetDoc, 'captured_controlled_real_roofer_setup_steps_count | 0', 'packet doc');
mustHave(packetDoc, 'missing_controlled_real_roofer_setup_steps_count | 12', 'packet doc');
passAssertion('controlled_real_roofer_setup_steps_count_12');
passAssertion('captured_controlled_real_roofer_setup_steps_count_0');
passAssertion('missing_controlled_real_roofer_setup_steps_count_12');
mustHave(packetDoc, 'controlled_real_roofer_setup_gate_decision | NO_GO', 'packet doc');
passAssertion('controlled_real_roofer_setup_gate_decision_no_go_or_hold');

mustHave(packetDoc, 'controlled_real_roofer_limited_validation_scenarios_count | 5', 'packet doc');
mustHave(packetDoc, 'captured_controlled_real_roofer_limited_validation_scenarios_count | 0', 'packet doc');
mustHave(packetDoc, 'missing_controlled_real_roofer_limited_validation_scenarios_count | 5', 'packet doc');
passAssertion('controlled_real_roofer_limited_validation_scenarios_count_5');
passAssertion('captured_controlled_real_roofer_limited_validation_scenarios_count_0');
passAssertion('missing_controlled_real_roofer_limited_validation_scenarios_count_5');
mustHave(packetDoc, 'controlled_real_roofer_limited_validation_gate_decision | NO_GO', 'packet doc');
passAssertion('controlled_real_roofer_limited_validation_gate_decision_no_go_or_hold');

mustHave(packetDoc, 'pilot_readiness_master_gate_decision | NO_GO', 'packet doc');
passAssertion('pilot_readiness_master_gate_decision_no_go_or_hold');

for (const step of DEPENDENCY_LADDER) {
  mustHave(packetDoc, step, 'packet doc dependency ladder');
}
passAssertion('dependency_ladder_all_6_steps_present');

mustHave(packetDoc, 'does **not** approve sandbox/test-mode activation', 'packet doc');
mustHave(packetDoc, 'This packet does **not** approve live activation', 'packet doc');
mustHave(packetDoc, 'This packet does **not** approve controlled real roofer validation', 'packet doc');
mustHave(packetDoc, 'Sandbox/test-mode activation remains blocked', 'packet doc');
mustHave(packetDoc, 'Live activation remains blocked', 'packet doc');
mustHave(packetDoc, 'Real roofer onboarding/contact remains blocked', 'packet doc');
mustHave(packetDoc, 'Controlled real roofer validation remains blocked', 'packet doc');

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
passAssertion('approved_for_activation_now_false');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(packetDoc, 'approved_channels | []', 'packet doc');
passAssertion('approved_channels_empty');
mustHave(packetDoc, 'approved_external_services | []', 'packet doc');
passAssertion('approved_external_services_empty');
mustHave(packetDoc, 'live_activation_allowed | false', 'packet doc');
passAssertion('live_activation_allowed_false');
mustHave(packetDoc, 'sandbox_test_mode_activation_allowed | false', 'packet doc');
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(packetDoc, 'real_roofer_onboarding_contact_allowed | false', 'packet doc');
passAssertion('real_roofer_onboarding_contact_allowed_false');
mustHave(packetDoc, 'real_roofer_contact_allowed | false', 'packet doc');
passAssertion('real_roofer_contact_allowed_false');
mustHave(packetDoc, 'controlled_real_roofer_validation_allowed | false', 'packet doc');
passAssertion('controlled_real_roofer_validation_allowed_false');
mustHave(packetDoc, 'external_calls_allowed | false', 'packet doc');
passAssertion('external_calls_allowed_false');
mustHave(packetDoc, 'credentials_access_allowed | false', 'packet doc');
passAssertion('credentials_access_allowed_false');
mustHave(packetDoc, 'production_data_access_allowed | false', 'packet doc');
passAssertion('production_data_access_allowed_false');
mustHave(packetDoc, 'schema_auth_rls_security_changes_allowed | false', 'packet doc');
passAssertion('schema_auth_rls_security_changes_allowed_false');
mustHave(
  packetDoc,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'packet doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
mustHave(packetDoc, 'billing_payment_automation_allowed | false', 'packet doc');
passAssertion('billing_payment_automation_allowed_false');
mustHave(
  packetDoc,
  'public_go_live_or_production_copy_changes_allowed | false',
  'packet doc',
);
passAssertion('public_go_live_or_production_copy_changes_allowed_false');
mustHave(packetDoc, 'real_demo_sandbox_live_testing_allowed | false', 'packet doc');
passAssertion('real_demo_sandbox_live_testing_allowed_false');

mustHave(
  packetDoc,
  'old 90-day plan cannot override current source-of-truth direction',
  'packet doc',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(packetDoc, 'This is **not** approval to activate anything', 'packet doc');
passAssertion('does_not_approve_activation');

mustHave(packetDoc, 'webhook', 'packet doc');
mustHave(packetDoc, 'scheduler', 'packet doc');
mustHave(packetDoc, 'billing', 'packet doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(packetDoc, 'public_website_go_live_copy_changed | false', 'packet doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(packetDoc, 'does **not** run the final activation command', 'packet doc');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

for (const upstreamFixturePath of [
  approvalCaptureCompletenessGateFixturePath,
  channelValidationCompletenessGateFixturePath,
  setupCompletenessGateFixturePath,
  limitedValidationCompletenessGateFixturePath,
]) {
  if (!fs.existsSync(path.join(root, upstreamFixturePath))) {
    fail(`missing upstream fixture: ${upstreamFixturePath}`);
  }
}
passAssertion('upstream_approval_capture_completeness_gate_fixture_present');
passAssertion('upstream_channel_validation_completeness_gate_fixture_present');
passAssertion('upstream_setup_completeness_gate_fixture_present');
passAssertion('upstream_limited_validation_completeness_gate_fixture_present');

const fixture = readJson(fixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 32c2c8b');
}
if (fixture.packet_status !== 'review_only') {
  fail('fixture packet_status must be review_only');
}
if (
  fixture.review_status !== 'pilot_readiness_master_no_go_approval_dependency_summary_review_only'
) {
  fail(
    'fixture review_status must be pilot_readiness_master_no_go_approval_dependency_summary_review_only',
  );
}
if (fixture.pilot_readiness_master_gate_decision !== 'NO_GO') {
  fail('fixture pilot_readiness_master_gate_decision must be NO_GO');
}
if (fixture.master_summary_does_not_equal_approval !== true) {
  fail('fixture master_summary_does_not_equal_approval must be true');
}
if (fixture.dependency_summary_does_not_equal_approval !== true) {
  fail('fixture dependency_summary_does_not_equal_approval must be true');
}
if (fixture.approval_capture_completeness_gate_status !== 'completed') {
  fail('fixture approval_capture_completeness_gate_status must be completed');
}
if (fixture.channel_validation_completeness_gate_status !== 'completed') {
  fail('fixture channel_validation_completeness_gate_status must be completed');
}
if (fixture.controlled_real_roofer_pilot_setup_completeness_gate_status !== 'completed') {
  fail('fixture controlled_real_roofer_pilot_setup_completeness_gate_status must be completed');
}
if (fixture.controlled_real_roofer_limited_validation_completeness_gate_status !== 'completed') {
  fail(
    'fixture controlled_real_roofer_limited_validation_completeness_gate_status must be completed',
  );
}
if (fixture.approval_capture_gate_decision !== 'NO_GO') {
  fail('fixture approval_capture_gate_decision must be NO_GO');
}
if (fixture.channel_validation_gate_decision !== 'NO_GO') {
  fail('fixture channel_validation_gate_decision must be NO_GO');
}
if (fixture.controlled_real_roofer_setup_gate_decision !== 'NO_GO') {
  fail('fixture controlled_real_roofer_setup_gate_decision must be NO_GO');
}
if (fixture.controlled_real_roofer_limited_validation_gate_decision !== 'NO_GO') {
  fail('fixture controlled_real_roofer_limited_validation_gate_decision must be NO_GO');
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
if (fixture.sandbox_test_mode_channel_validation_scenarios_count !== 30) {
  fail('fixture sandbox_test_mode_channel_validation_scenarios_count must be 30');
}
if (fixture.captured_sandbox_test_mode_channel_validation_scenarios_count !== 0) {
  fail('fixture captured_sandbox_test_mode_channel_validation_scenarios_count must be 0');
}
if (fixture.missing_sandbox_test_mode_channel_validation_scenarios_count !== 30) {
  fail('fixture missing_sandbox_test_mode_channel_validation_scenarios_count must be 30');
}
if (fixture.controlled_real_roofer_setup_steps_count !== 12) {
  fail('fixture controlled_real_roofer_setup_steps_count must be 12');
}
if (fixture.captured_controlled_real_roofer_setup_steps_count !== 0) {
  fail('fixture captured_controlled_real_roofer_setup_steps_count must be 0');
}
if (fixture.missing_controlled_real_roofer_setup_steps_count !== 12) {
  fail('fixture missing_controlled_real_roofer_setup_steps_count must be 12');
}
if (fixture.controlled_real_roofer_limited_validation_scenarios_count !== 5) {
  fail('fixture controlled_real_roofer_limited_validation_scenarios_count must be 5');
}
if (fixture.captured_controlled_real_roofer_limited_validation_scenarios_count !== 0) {
  fail('fixture captured_controlled_real_roofer_limited_validation_scenarios_count must be 0');
}
if (fixture.missing_controlled_real_roofer_limited_validation_scenarios_count !== 5) {
  fail('fixture missing_controlled_real_roofer_limited_validation_scenarios_count must be 5');
}

if (!Array.isArray(fixture.dependency_ladder) || fixture.dependency_ladder.length !== 6) {
  fail('fixture dependency_ladder must contain 6 steps');
}
for (let i = 0; i < DEPENDENCY_LADDER.length; i += 1) {
  if (fixture.dependency_ladder[i].step !== i + 1) {
    fail(`fixture dependency_ladder step ${i + 1} number mismatch`);
  }
  if (fixture.dependency_ladder[i].dependency !== DEPENDENCY_LADDER[i]) {
    fail(`fixture dependency_ladder step ${i + 1} dependency mismatch`);
  }
  if (fixture.dependency_ladder[i].status !== 'not_complete') {
    fail(`fixture dependency_ladder step ${i + 1} status must be not_complete`);
  }
}
passAssertion('fixture_dependency_ladder_all_steps_not_complete');

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
if (fixture.controlled_real_roofer_validation_allowed !== false) {
  fail('fixture controlled_real_roofer_validation_allowed must be false');
}
if (fixture.external_calls_allowed !== false) {
  fail('fixture external_calls_allowed must be false');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}

if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 31) {
  fail('fixture evidence_chain_commits must contain 31 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}

passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(packetDoc, phrase, 'packet doc forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(packetDoc)) fail(`unsafe pattern ${pattern} found in packet doc`);
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
  'Native Workflow Fixture Pilot Readiness Master NO-GO / Approval Dependency Summary',
  'aggregate readiness',
);
mustHave(verifierIndex, packetDocPath, 'verifier index');
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
mustHave(wrapper, 'Master summary does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Dependency summary does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Default sandbox/test-mode decision remains HOLD', 'wrapper mode');
mustHave(wrapper, 'Channel validation gate decision is NO_GO', 'wrapper mode');
mustHave(wrapper, 'Controlled real roofer setup gate decision is NO_GO', 'wrapper mode');
mustHave(
  wrapper,
  'Controlled real roofer limited validation gate decision is NO_GO',
  'wrapper mode',
);
mustHave(wrapper, 'Approval capture gate decision is NO_GO', 'wrapper mode');
mustHave(wrapper, 'Sandbox/test-mode activation remains blocked', 'wrapper mode');
mustHave(wrapper, 'Live activation remains blocked', 'wrapper mode');
mustHave(wrapper, 'Real roofer onboarding/contact remains blocked', 'wrapper mode');
mustHave(wrapper, 'Controlled real roofer validation remains blocked', 'wrapper mode');
mustHave(wrapper, 'NOT CAPTURED / NOT SIGNED / NOT GRANTED', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(packetDoc, approvalCaptureCompletenessGateDocPath, 'packet doc');
mustHave(packetDoc, channelValidationCompletenessGateDocPath, 'packet doc');
mustHave(packetDoc, setupCompletenessGateDocPath, 'packet doc');
mustHave(packetDoc, limitedValidationCompletenessGateDocPath, 'packet doc');
mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 126) {
  fail(`REQUIRED_ASSERTIONS must contain 126 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Pilot Readiness Master NO-GO / Approval Dependency Summary verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);