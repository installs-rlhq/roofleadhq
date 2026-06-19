#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const boardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FINAL_SANDBOX_TEST_MODE_APPROVAL_DECISION_BOARD.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FINAL_SANDBOX_TEST_MODE_APPROVAL_DECISION_BOARD_NO_GO_REVIEW.md';
const preRunGuardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_PRE_RUN_GUARD_DRAFT.md';
const operatorRunbookDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_RUNBOOK_DRAFT.md';
const pilotReadinessMasterDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_PILOT_READINESS_MASTER_NO_GO_APPROVAL_DEPENDENCY_SUMMARY.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/final-sandbox-test-mode-approval-decision-board.json';
const preRunGuardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/post-approval-sandbox-test-mode-pre-run-guard-draft.json';
const operatorRunbookFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/post-approval-sandbox-test-mode-operator-runbook-draft.json';
const pilotReadinessMasterFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/pilot-readiness-master-no-go-approval-dependency-summary.json';
const recommendedDefaultsFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-recommended-defaults-proposal.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-final-sandbox-test-mode-approval-decision-board-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-final-sandbox-test-mode-approval-decision-board-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = 'e96ff0e';
const FUTURE_APPROVED_COMMAND =
  'bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';
const FINAL_ACTIVATION_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

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
  'f36a247',
  '7f57e7d',
  'e96ff0e',
];

const DEPENDENCY_LADDER = [
  'Jason exact signed sandbox/test-mode approval captured',
  'all 19 exact values accepted and approved',
  'approval capture completeness gate passes',
  'pre-run guard passes',
  'sandbox/test-mode channel validation evidence captured and passed',
  'controlled real roofer setup evidence captured and passed',
  'controlled real roofer limited validation evidence captured and passed',
  'separate later live activation approval, if ever pursued',
];

const EXACT_VALUE_FIELDS = [
  'exact_services',
  'exact_test_accounts',
  'exact_environment',
  'exact_command',
  'exact_working_directory',
  'exact_credentials_env_api_webhook_boundary',
  'exact_external_call_boundary',
  'exact_production_data_boundary',
  'exact_schema_auth_rls_security_boundary',
  'exact_public_route_webhook_scheduler_cron_dispatcher_boundary',
  'exact_messaging_contact_permission_boundary',
  'exact_calendar_appointment_boundary',
  'exact_reporting_csv_boundary',
  'exact_stop_conditions',
  'exact_rollback_owner',
  'exact_evidence_owner',
  'exact_log_path',
  'exact_approval_expiration',
  'exact_one_time_use_limitation',
];

const RECOMMENDED_NEXT_STEP =
  'JASON_REVIEW_FINAL_SANDBOX_TEST_MODE_APPROVAL_DECISION_BOARD_BEFORE_ANY_APPROVAL_CAPTURE_OR_ACTIVATION_CONSIDERATION';

const REQUIRED_ASSERTIONS = [
  'board_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_pre_run_guard_fixture_present',
  'upstream_operator_runbook_fixture_present',
  'upstream_pilot_readiness_master_fixture_present',
  'upstream_recommended_defaults_fixture_present',
  'source_of_truth_commit_e96ff0e_referenced',
  'post_approval_sandbox_test_mode_operator_runbook_draft_status_completed',
  'post_approval_sandbox_test_mode_pre_run_guard_draft_status_completed',
  'pilot_readiness_master_gate_decision_no_go_or_hold',
  'decision_board_status_blocked',
  'decision_board_gate_decision_no_go_or_hold',
  'final_decision_board_does_not_equal_approval',
  'final_decision_board_no_go_review_does_not_equal_approval',
  'recommended_defaults_are_not_approval',
  'acceptance_boundary_does_not_equal_approval',
  'approval_request_packet_does_not_equal_approval',
  'approval_capture_worksheet_does_not_equal_approval',
  'approval_capture_completeness_gate_does_not_equal_approval',
  'operator_runbook_draft_does_not_equal_approval',
  'pre_run_guard_draft_does_not_equal_approval',
  'packet_does_not_approve_anything',
  'packet_does_not_capture_approval',
  'packet_does_not_execute_command',
  'packet_does_not_contact_roofer_or_homeowner',
  'packet_does_not_activate_sandbox_test_mode',
  'packet_does_not_activate_live_automation',
  'exact_values_required_count_19',
  'accepted_exact_values_count_0',
  'approved_exact_values_filled_count_0',
  'all_19_exact_values_not_approved_in_board',
  'fixture_exact_values_decision_board_all_19_not_approved',
  'approval_capture_status_not_captured',
  'jason_signed_approval_status_not_signed',
  'sandbox_test_mode_channel_validation_scenarios_count_30',
  'captured_sandbox_test_mode_channel_validation_scenarios_count_0',
  'missing_sandbox_test_mode_channel_validation_scenarios_count_30',
  'controlled_real_roofer_setup_steps_count_12',
  'captured_controlled_real_roofer_setup_steps_count_0',
  'missing_controlled_real_roofer_setup_steps_count_12',
  'controlled_real_roofer_limited_validation_scenarios_count_5',
  'captured_controlled_real_roofer_limited_validation_scenarios_count_0',
  'missing_controlled_real_roofer_limited_validation_scenarios_count_5',
  'dependency_ladder_all_8_steps_present',
  'fixture_dependency_ladder_all_steps_not_complete',
  'approval_status_not_granted',
  'sandbox_test_mode_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'controlled_real_roofer_validation_approval_status_not_granted',
  'future_command_status_blocked_until_exact_signed_approval_and_gate_pass',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'approved_channels_empty',
  'approved_external_services_empty',
  'sandbox_test_mode_activation_blocked',
  'live_activation_blocked',
  'real_roofer_onboarding_contact_blocked',
  'controlled_real_roofer_validation_blocked',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'does_not_approve_activation',
  'verifier_file_present',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_FINAL_SANDBOX_TEST_MODE_APPROVAL_DECISION_BOARD.md',
  'NATIVE_WORKFLOW_FIXTURE_FINAL_SANDBOX_TEST_MODE_APPROVAL_DECISION_BOARD_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-final-sandbox-test-mode-approval-decision-board-dry-run.sh',
  'verify-native-workflow-fixture-final-sandbox-test-mode-approval-decision-board-readonly.js',
  'final-sandbox-test-mode-approval-decision-board.json',
  'Native Workflow Fixture Final Sandbox/Test-Mode Approval Decision Board',
  'native workflow fixture final sandbox test mode approval decision board',
  'final sandbox test mode approval decision board',
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

const boardDoc = read(boardDocPath);
const noGoReviewDoc = read(noGoReviewDocPath);
read(preRunGuardDocPath);
read(operatorRunbookDocPath);
read(pilotReadinessMasterDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${boardDoc}\n${noGoReviewDoc}`;

passAssertion('board_doc_present');
passAssertion('no_go_review_doc_present');

mustHave(
  boardDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/not-approved/non-executing',
  'board doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/not-approved/non-executing',
  'no-go review',
);
mustHave(boardDoc, SOURCE_OF_TRUTH_COMMIT, 'board doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_e96ff0e_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(boardDoc, commit, 'board doc');
}

mustHave(
  boardDoc,
  'post_approval_sandbox_test_mode_operator_runbook_draft_status | completed',
  'board doc',
);
passAssertion('post_approval_sandbox_test_mode_operator_runbook_draft_status_completed');
mustHave(
  boardDoc,
  'post_approval_sandbox_test_mode_pre_run_guard_draft_status | completed',
  'board doc',
);
passAssertion('post_approval_sandbox_test_mode_pre_run_guard_draft_status_completed');
mustHave(boardDoc, 'pilot_readiness_master_gate_decision | NO_GO', 'board doc');
passAssertion('pilot_readiness_master_gate_decision_no_go_or_hold');

mustHave(boardDoc, 'decision_board_status | blocked', 'board doc');
mustHave(boardDoc, 'decision_board_gate_decision | NO_GO', 'board doc');
passAssertion('decision_board_status_blocked');
passAssertion('decision_board_gate_decision_no_go_or_hold');

mustHave(boardDoc, 'This final decision board does **not** equal approval', 'board doc');
mustHave(noGoReviewDoc, 'This final decision board does **not** equal approval', 'no-go review');
passAssertion('final_decision_board_does_not_equal_approval');
mustHave(
  noGoReviewDoc,
  'This final decision board no-go review does **not** equal approval',
  'no-go review',
);
passAssertion('final_decision_board_no_go_review_does_not_equal_approval');

mustHave(boardDoc, 'Recommended defaults do **not** equal approval', 'board doc');
passAssertion('recommended_defaults_are_not_approval');
mustHave(boardDoc, 'Acceptance boundary does **not** equal approval', 'board doc');
passAssertion('acceptance_boundary_does_not_equal_approval');
mustHave(boardDoc, 'Approval request packet does **not** equal approval', 'board doc');
passAssertion('approval_request_packet_does_not_equal_approval');
mustHave(boardDoc, 'Approval capture worksheet does **not** equal approval', 'board doc');
passAssertion('approval_capture_worksheet_does_not_equal_approval');
mustHave(boardDoc, 'Approval capture completeness gate does **not** equal approval', 'board doc');
passAssertion('approval_capture_completeness_gate_does_not_equal_approval');
mustHave(boardDoc, 'Operator runbook draft does **not** equal approval', 'board doc');
passAssertion('operator_runbook_draft_does_not_equal_approval');
mustHave(boardDoc, 'Pre-run guard draft does **not** equal approval', 'board doc');
passAssertion('pre_run_guard_draft_does_not_equal_approval');

mustHave(boardDoc, 'This packet does **not** approve anything', 'board doc');
passAssertion('packet_does_not_approve_anything');
mustHave(boardDoc, 'This packet does **not** capture approval', 'board doc');
passAssertion('packet_does_not_capture_approval');
mustHave(boardDoc, 'This packet does **not** execute any command', 'board doc');
passAssertion('packet_does_not_execute_command');
mustHave(boardDoc, 'This packet does **not** contact any real roofer or homeowner', 'board doc');
passAssertion('packet_does_not_contact_roofer_or_homeowner');
mustHave(boardDoc, 'This packet does **not** activate sandbox/test-mode', 'board doc');
passAssertion('packet_does_not_activate_sandbox_test_mode');
mustHave(boardDoc, 'This packet does **not** activate live automation', 'board doc');
passAssertion('packet_does_not_activate_live_automation');

mustHave(boardDoc, 'exact_values_required_count | 19', 'board doc');
mustHave(boardDoc, 'accepted_exact_values_count | 0', 'board doc');
mustHave(boardDoc, 'approved_exact_values_filled_count | 0', 'board doc');
passAssertion('exact_values_required_count_19');
passAssertion('accepted_exact_values_count_0');
passAssertion('approved_exact_values_filled_count_0');

for (const field of EXACT_VALUE_FIELDS) {
  mustHave(boardDoc, `| ${field} | true | false | false | not_approved |`, 'board doc exact values');
}
passAssertion('all_19_exact_values_not_approved_in_board');

for (const dep of DEPENDENCY_LADDER) {
  mustHave(boardDoc, dep, 'board doc dependency ladder');
}
passAssertion('dependency_ladder_all_8_steps_present');

mustHave(boardDoc, 'approval_capture_status | not_captured', 'board doc');
mustHave(boardDoc, 'jason_signed_approval_status | not_signed', 'board doc');
passAssertion('approval_capture_status_not_captured');
passAssertion('jason_signed_approval_status_not_signed');

mustHave(boardDoc, 'sandbox_test_mode_channel_validation_scenarios_count | 30', 'board doc');
mustHave(boardDoc, 'captured_sandbox_test_mode_channel_validation_scenarios_count | 0', 'board doc');
mustHave(boardDoc, 'missing_sandbox_test_mode_channel_validation_scenarios_count | 30', 'board doc');
passAssertion('sandbox_test_mode_channel_validation_scenarios_count_30');
passAssertion('captured_sandbox_test_mode_channel_validation_scenarios_count_0');
passAssertion('missing_sandbox_test_mode_channel_validation_scenarios_count_30');

mustHave(boardDoc, 'controlled_real_roofer_setup_steps_count | 12', 'board doc');
mustHave(boardDoc, 'captured_controlled_real_roofer_setup_steps_count | 0', 'board doc');
mustHave(boardDoc, 'missing_controlled_real_roofer_setup_steps_count | 12', 'board doc');
passAssertion('controlled_real_roofer_setup_steps_count_12');
passAssertion('captured_controlled_real_roofer_setup_steps_count_0');
passAssertion('missing_controlled_real_roofer_setup_steps_count_12');

mustHave(boardDoc, 'controlled_real_roofer_limited_validation_scenarios_count | 5', 'board doc');
mustHave(
  boardDoc,
  'captured_controlled_real_roofer_limited_validation_scenarios_count | 0',
  'board doc',
);
mustHave(
  boardDoc,
  'missing_controlled_real_roofer_limited_validation_scenarios_count | 5',
  'board doc',
);
passAssertion('controlled_real_roofer_limited_validation_scenarios_count_5');
passAssertion('captured_controlled_real_roofer_limited_validation_scenarios_count_0');
passAssertion('missing_controlled_real_roofer_limited_validation_scenarios_count_5');

mustHave(boardDoc, 'approval_status | not_granted', 'board doc');
mustHave(boardDoc, 'sandbox_test_mode_approval_status | not_granted', 'board doc');
mustHave(boardDoc, 'live_activation_approval_status | not_granted', 'board doc');
mustHave(boardDoc, 'controlled_real_roofer_validation_approval_status | not_granted', 'board doc');
passAssertion('approval_status_not_granted');
passAssertion('sandbox_test_mode_approval_status_not_granted');
passAssertion('live_activation_approval_status_not_granted');
passAssertion('controlled_real_roofer_validation_approval_status_not_granted');

mustHave(boardDoc, 'future_command_status | blocked_until_exact_signed_approval_and_gate_pass', 'board doc');
mustHave(boardDoc, FUTURE_APPROVED_COMMAND, 'board doc');
passAssertion('future_command_status_blocked_until_exact_signed_approval_and_gate_pass');

mustHave(boardDoc, 'approved_for_activation_now | false', 'board doc');
mustHave(boardDoc, 'command_execution_status | not_run_by_this_packet', 'board doc');
mustHave(boardDoc, 'approved_channels | []', 'board doc');
mustHave(boardDoc, 'approved_external_services | []', 'board doc');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');

mustHave(boardDoc, 'pilot_readiness_summary | demo_ready_with_live_automation_disabled', 'board doc');
mustHave(boardDoc, 'Sandbox/test-mode activation remains blocked', 'board doc');
mustHave(boardDoc, 'Live activation remains blocked', 'board doc');
mustHave(boardDoc, 'Real roofer onboarding/contact remains blocked', 'board doc');
mustHave(boardDoc, 'Controlled real roofer validation remains blocked', 'board doc');
passAssertion('sandbox_test_mode_activation_blocked');
passAssertion('live_activation_blocked');
passAssertion('real_roofer_onboarding_contact_blocked');
passAssertion('controlled_real_roofer_validation_blocked');

mustHave(boardDoc, 'This is **not** approval to activate anything', 'board doc');
passAssertion('does_not_approve_activation');

mustHave(boardDoc, 'demo_ready_with_live_automation_disabled', 'board doc');
mustHave(noGoReviewDoc, 'demo_ready_with_live_automation_disabled', 'no-go review');
mustHave(noGoReviewDoc, 'NO_GO_KEEP_BLOCKED', 'no-go review');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

for (const upstreamFixturePath of [
  preRunGuardFixturePath,
  operatorRunbookFixturePath,
  pilotReadinessMasterFixturePath,
  recommendedDefaultsFixturePath,
]) {
  if (!fs.existsSync(path.join(root, upstreamFixturePath))) {
    fail(`missing upstream fixture: ${upstreamFixturePath}`);
  }
}
passAssertion('upstream_pre_run_guard_fixture_present');
passAssertion('upstream_operator_runbook_fixture_present');
passAssertion('upstream_pilot_readiness_master_fixture_present');
passAssertion('upstream_recommended_defaults_fixture_present');

const fixture = readJson(fixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be e96ff0e');
}
if (fixture.packet_status !== 'review_only') {
  fail('fixture packet_status must be review_only');
}
if (fixture.review_status !== 'final_sandbox_test_mode_approval_decision_board_review_only') {
  fail('fixture review_status mismatch');
}
if (fixture.decision_board_status !== 'blocked') {
  fail('fixture decision_board_status must be blocked');
}
if (fixture.decision_board_gate_decision !== 'NO_GO') {
  fail('fixture decision_board_gate_decision must be NO_GO');
}
if (fixture.final_decision_board_does_not_equal_approval !== true) {
  fail('fixture final_decision_board_does_not_equal_approval must be true');
}
if (fixture.post_approval_sandbox_test_mode_operator_runbook_draft_status !== 'completed') {
  fail('fixture post_approval_sandbox_test_mode_operator_runbook_draft_status must be completed');
}
if (fixture.post_approval_sandbox_test_mode_pre_run_guard_draft_status !== 'completed') {
  fail('fixture post_approval_sandbox_test_mode_pre_run_guard_draft_status must be completed');
}
if (fixture.pilot_readiness_master_gate_decision !== 'NO_GO') {
  fail('fixture pilot_readiness_master_gate_decision must be NO_GO');
}
if (fixture.approval_capture_status !== 'not_captured') {
  fail('fixture approval_capture_status must be not_captured');
}
if (fixture.jason_signed_approval_status !== 'not_signed') {
  fail('fixture jason_signed_approval_status must be not_signed');
}
if (fixture.exact_values_required_count !== 19) {
  fail('fixture exact_values_required_count must be 19');
}
if (fixture.accepted_exact_values_count !== 0) {
  fail('fixture accepted_exact_values_count must be 0');
}
if (fixture.approved_exact_values_filled_count !== 0) {
  fail('fixture approved_exact_values_filled_count must be 0');
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
if (fixture.future_command_status !== 'blocked_until_exact_signed_approval_and_gate_pass') {
  fail('fixture future_command_status mismatch');
}
if (fixture.future_approved_command !== FUTURE_APPROVED_COMMAND) {
  fail('fixture future_approved_command mismatch');
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
if (fixture.sandbox_test_mode_activation_allowed !== false) {
  fail('fixture sandbox_test_mode_activation_allowed must be false');
}
if (fixture.live_activation_allowed !== false) {
  fail('fixture live_activation_allowed must be false');
}
if (fixture.real_roofer_onboarding_contact_allowed !== false) {
  fail('fixture real_roofer_onboarding_contact_allowed must be false');
}
if (fixture.controlled_real_roofer_validation_allowed !== false) {
  fail('fixture controlled_real_roofer_validation_allowed must be false');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}
if (fixture.current_recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('fixture current_recommended_next_step mismatch');
}

if (!Array.isArray(fixture.dependency_ladder) || fixture.dependency_ladder.length !== 8) {
  fail('fixture dependency_ladder must contain 8 steps');
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

if (!Array.isArray(fixture.exact_values_decision_board) || fixture.exact_values_decision_board.length !== 19) {
  fail('fixture exact_values_decision_board must contain 19 items');
}
for (let i = 0; i < EXACT_VALUE_FIELDS.length; i += 1) {
  const item = fixture.exact_values_decision_board[i];
  if (item.field !== EXACT_VALUE_FIELDS[i]) {
    fail(`fixture exact_values_decision_board field ${i + 1} mismatch`);
  }
  if (item.recommended_default_exists !== true) {
    fail(`fixture exact_values_decision_board ${item.field} recommended_default_exists must be true`);
  }
  if (item.accepted_by_jason !== false) {
    fail(`fixture exact_values_decision_board ${item.field} accepted_by_jason must be false`);
  }
  if (item.approved_by_jason !== false) {
    fail(`fixture exact_values_decision_board ${item.field} approved_by_jason must be false`);
  }
  if (item.status !== 'not_approved') {
    fail(`fixture exact_values_decision_board ${item.field} status must be not_approved`);
  }
}
passAssertion('fixture_exact_values_decision_board_all_19_not_approved');

if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 34) {
  fail('fixture evidence_chain_commits must contain 34 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}

passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(boardDoc, phrase, 'board doc forbidden language');
  mustNotHave(noGoReviewDoc, phrase, 'no-go review forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(boardDoc)) fail(`unsafe pattern ${pattern} found in board doc`);
  if (pattern.test(noGoReviewDoc)) fail(`unsafe pattern ${pattern} found in no-go review`);
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

mustHave(fullReadiness, 'verify-first-paid-pilot-readiness-readonly.js', 'full safe readiness');
mustHave(fullReadiness, 'npm --prefix backend run build', 'full safe readiness');
passAssertion('full_safe_readiness_lane_preserved');

mustHave(aggregate, verifierPath, 'aggregate readiness');
mustHave(
  aggregate,
  'Native Workflow Fixture Final Sandbox/Test-Mode Approval Decision Board',
  'aggregate readiness',
);
mustHave(verifierIndex, boardDocPath, 'verifier index');
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
mustHave(wrapper, 'planning-only', 'wrapper mode');
mustHave(wrapper, 'not approval', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'Final decision board does not equal approval', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'no SMS/email/calls/calendar booking', 'wrapper mode');
mustHave(wrapper, 'future_command_status is blocked_until_exact_signed_approval_and_gate_pass', 'wrapper mode');
mustHave(wrapper, 'NOT CAPTURED / NOT SIGNED / NOT GRANTED', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, FUTURE_APPROVED_COMMAND, 'wrapper must not execute future approved command');
mustNotHave(wrapper, FINAL_ACTIVATION_COMMAND, 'wrapper must not execute final activation command');
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(boardDoc, noGoReviewDocPath, 'board doc');
mustHave(boardDoc, fixturePath, 'board doc');
mustHave(boardDoc, verifierPath, 'board doc');
mustHave(boardDoc, wrapperPath, 'board doc');
mustHave(boardDoc, preRunGuardDocPath, 'board doc');
mustHave(boardDoc, operatorRunbookDocPath, 'board doc');
mustHave(boardDoc, pilotReadinessMasterDocPath, 'board doc');
mustHave(finalActivationCommandDraftDoc, FINAL_ACTIVATION_COMMAND, 'final activation command draft doc');

if (REQUIRED_ASSERTIONS.length !== 66) {
  fail(`REQUIRED_ASSERTIONS must contain 66 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Final Sandbox/Test-Mode Approval Decision Board verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);