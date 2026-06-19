#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FINAL_JASON_EXACT_SANDBOX_TEST_MODE_APPROVAL_COPY_PASTE_PACKET.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FINAL_JASON_EXACT_SANDBOX_TEST_MODE_APPROVAL_COPY_PASTE_PACKET_NO_GO_REVIEW.md';
const finalDecisionBoardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FINAL_SANDBOX_TEST_MODE_APPROVAL_DECISION_BOARD.md';
const preRunGuardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_PRE_RUN_GUARD_DRAFT.md';
const operatorRunbookDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_RUNBOOK_DRAFT.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/final-jason-exact-sandbox-test-mode-approval-copy-paste-packet.json';
const finalDecisionBoardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/final-sandbox-test-mode-approval-decision-board.json';
const preRunGuardFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/post-approval-sandbox-test-mode-pre-run-guard-draft.json';
const operatorRunbookFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/post-approval-sandbox-test-mode-operator-runbook-draft.json';
const recommendedDefaultsFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-recommended-defaults-proposal.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-final-jason-exact-sandbox-test-mode-approval-copy-paste-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-final-jason-exact-sandbox-test-mode-approval-copy-paste-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '1c04c0c';
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
  '1c04c0c',
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

const VAGUE_APPROVAL_PHRASES = [
  '“go,”',
  '“ok,”',
  '“looks good,”',
  '“approved,”',
  '“all approved,”',
  '“let’s do it,”',
  '“continue”',
];

const REQUIRED_APPROVAL_LANGUAGE = [
  'I, Jason Lohse, explicitly approve the exact scoped sandbox/test-mode run described below.',
  'This approval is sandbox/test-mode only.',
  'This approval does not approve live activation.',
  'This approval does not approve real homeowner contact.',
  'This approval does not approve real roofer contact unless separately approved.',
  'This approval does not approve production Supabase writes.',
  'This approval does not approve schema/auth/RLS/security changes.',
  'This approval does not approve billing/payment/deposit/invoice/quote/estimate automation.',
  'This approval is one-time-use only.',
  'Signature:',
  'Timestamp:',
  'Expiration:',
];

const RECOMMENDED_NEXT_STEP =
  'JASON_REVIEW_FINAL_JASON_EXACT_SANDBOX_TEST_MODE_APPROVAL_COPY_PASTE_PACKET_BEFORE_ANY_SIGNED_APPROVAL_OR_ACTIVATION_CONSIDERATION';

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_final_decision_board_fixture_present',
  'upstream_pre_run_guard_fixture_present',
  'upstream_operator_runbook_fixture_present',
  'upstream_recommended_defaults_fixture_present',
  'source_of_truth_commit_1c04c0c_referenced',
  'final_sandbox_test_mode_approval_decision_board_status_completed',
  'post_approval_sandbox_test_mode_operator_runbook_draft_status_completed',
  'post_approval_sandbox_test_mode_pre_run_guard_draft_status_completed',
  'pilot_readiness_master_gate_decision_no_go_or_hold',
  'copy_paste_packet_does_not_equal_approval',
  'copy_paste_packet_no_go_review_does_not_equal_approval',
  'template_presence_does_not_equal_approval',
  'recommended_defaults_are_not_approval',
  'final_decision_board_does_not_equal_approval',
  'operator_runbook_draft_does_not_equal_approval',
  'pre_run_guard_draft_does_not_equal_approval',
  'packet_does_not_approve_anything',
  'packet_does_not_capture_approval',
  'packet_does_not_execute_command',
  'packet_does_not_contact_roofer_or_homeowner',
  'packet_does_not_activate_sandbox_test_mode',
  'packet_does_not_activate_live_automation',
  'vague_approval_phrases_explicitly_rejected',
  'approval_cannot_be_inferred_from_build_progress',
  'approval_cannot_be_inferred_from_closeout',
  'approval_cannot_be_inferred_from_passed_verifier',
  'approval_cannot_be_inferred_from_packet_committed',
  'exact_values_required_count_19',
  'accepted_exact_values_count_0',
  'approved_exact_values_filled_count_0',
  'all_19_exact_values_not_approved_in_packet',
  'fixture_all_19_accepted_exact_values_blank',
  'fixture_all_19_approved_exact_values_blank',
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
  'template_labeled_template_only_not_signed_not_approved_do_not_execute',
  'template_all_19_exact_value_fields_present',
  'template_all_required_approval_language_present',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'does_not_approve_activation',
  'verifier_file_present',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_FINAL_JASON_EXACT_SANDBOX_TEST_MODE_APPROVAL_COPY_PASTE_PACKET.md',
  'NATIVE_WORKFLOW_FIXTURE_FINAL_JASON_EXACT_SANDBOX_TEST_MODE_APPROVAL_COPY_PASTE_PACKET_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-final-jason-exact-sandbox-test-mode-approval-copy-paste-packet-dry-run.sh',
  'verify-native-workflow-fixture-final-jason-exact-sandbox-test-mode-approval-copy-paste-packet-readonly.js',
  'final-jason-exact-sandbox-test-mode-approval-copy-paste-packet.json',
  'Native Workflow Fixture Final Jason Exact Sandbox/Test-Mode Approval Copy/Paste Packet',
  'native workflow fixture final jason exact sandbox test mode approval copy paste packet',
  'final jason exact sandbox test mode approval copy paste packet',
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
read(finalDecisionBoardDocPath);
read(preRunGuardDocPath);
read(operatorRunbookDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${packetDoc}\n${noGoReviewDoc}`;

passAssertion('packet_doc_present');
passAssertion('no_go_review_doc_present');

mustHave(
  packetDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/template-only/not-approved/non-executing',
  'packet doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/template-only/not-approved/non-executing',
  'no-go review',
);
mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_1c04c0c_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc');
}

mustHave(
  packetDoc,
  'final_sandbox_test_mode_approval_decision_board_status | completed',
  'packet doc',
);
passAssertion('final_sandbox_test_mode_approval_decision_board_status_completed');
mustHave(
  packetDoc,
  'post_approval_sandbox_test_mode_operator_runbook_draft_status | completed',
  'packet doc',
);
passAssertion('post_approval_sandbox_test_mode_operator_runbook_draft_status_completed');
mustHave(
  packetDoc,
  'post_approval_sandbox_test_mode_pre_run_guard_draft_status | completed',
  'packet doc',
);
passAssertion('post_approval_sandbox_test_mode_pre_run_guard_draft_status_completed');
mustHave(packetDoc, 'pilot_readiness_master_gate_decision | NO_GO', 'packet doc');
passAssertion('pilot_readiness_master_gate_decision_no_go_or_hold');

mustHave(packetDoc, 'This copy/paste packet does **not** equal approval', 'packet doc');
mustHave(noGoReviewDoc, 'This copy/paste packet does **not** equal approval', 'no-go review');
passAssertion('copy_paste_packet_does_not_equal_approval');
mustHave(
  noGoReviewDoc,
  'This copy/paste packet no-go review does **not** equal approval',
  'no-go review',
);
passAssertion('copy_paste_packet_no_go_review_does_not_equal_approval');
mustHave(packetDoc, 'The presence of a template does **not** equal approval', 'packet doc');
mustHave(noGoReviewDoc, 'The presence of a template does **not** equal approval', 'no-go review');
passAssertion('template_presence_does_not_equal_approval');

mustHave(packetDoc, 'Recommended defaults do **not** equal approval', 'packet doc');
passAssertion('recommended_defaults_are_not_approval');
mustHave(packetDoc, 'Final decision board does **not** equal approval', 'packet doc');
passAssertion('final_decision_board_does_not_equal_approval');
mustHave(packetDoc, 'Operator runbook draft does **not** equal approval', 'packet doc');
passAssertion('operator_runbook_draft_does_not_equal_approval');
mustHave(packetDoc, 'Pre-run guard draft does **not** equal approval', 'packet doc');
passAssertion('pre_run_guard_draft_does_not_equal_approval');

mustHave(packetDoc, 'This packet does **not** approve anything', 'packet doc');
passAssertion('packet_does_not_approve_anything');
mustHave(packetDoc, 'This packet does **not** capture approval', 'packet doc');
passAssertion('packet_does_not_capture_approval');
mustHave(packetDoc, 'This packet does **not** execute any command', 'packet doc');
passAssertion('packet_does_not_execute_command');
mustHave(packetDoc, 'This packet does **not** contact any real roofer or homeowner', 'packet doc');
passAssertion('packet_does_not_contact_roofer_or_homeowner');
mustHave(packetDoc, 'This packet does **not** activate sandbox/test-mode', 'packet doc');
passAssertion('packet_does_not_activate_sandbox_test_mode');
mustHave(packetDoc, 'This packet does **not** activate live automation', 'packet doc');
passAssertion('packet_does_not_activate_live_automation');

mustHave(
  packetDoc,
  'Vague statements like “go,” “ok,” “looks good,” “approved,” “all approved,” “let’s do it,” or “continue” do **not** count as approval.',
  'packet doc',
);
for (const phrase of VAGUE_APPROVAL_PHRASES) {
  mustHave(packetDoc, phrase, 'packet doc vague phrase');
  mustHave(noGoReviewDoc, phrase, 'no-go review vague phrase');
}
passAssertion('vague_approval_phrases_explicitly_rejected');

mustHave(packetDoc, 'Approval cannot be inferred from build progress.', 'packet doc');
passAssertion('approval_cannot_be_inferred_from_build_progress');
mustHave(packetDoc, 'Approval cannot be inferred from closeout.', 'packet doc');
passAssertion('approval_cannot_be_inferred_from_closeout');
mustHave(packetDoc, 'Approval cannot be inferred from a passed verifier.', 'packet doc');
passAssertion('approval_cannot_be_inferred_from_passed_verifier');
mustHave(packetDoc, 'Approval cannot be inferred from this packet being committed.', 'packet doc');
passAssertion('approval_cannot_be_inferred_from_packet_committed');

mustHave(packetDoc, 'exact_values_required_count | 19', 'packet doc');
mustHave(packetDoc, 'accepted_exact_values_count | 0', 'packet doc');
mustHave(packetDoc, 'approved_exact_values_filled_count | 0', 'packet doc');
passAssertion('exact_values_required_count_19');
passAssertion('accepted_exact_values_count_0');
passAssertion('approved_exact_values_filled_count_0');

for (const field of EXACT_VALUE_FIELDS) {
  mustHave(packetDoc, `| ${field} | false | false | not_approved |`, 'packet doc exact values');
}
passAssertion('all_19_exact_values_not_approved_in_packet');

mustHave(packetDoc, 'approval_capture_status | not_captured', 'packet doc');
mustHave(packetDoc, 'jason_signed_approval_status | not_signed', 'packet doc');
passAssertion('approval_capture_status_not_captured');
passAssertion('jason_signed_approval_status_not_signed');

mustHave(packetDoc, 'sandbox_test_mode_channel_validation_scenarios_count | 30', 'packet doc');
mustHave(packetDoc, 'captured_sandbox_test_mode_channel_validation_scenarios_count | 0', 'packet doc');
mustHave(packetDoc, 'missing_sandbox_test_mode_channel_validation_scenarios_count | 30', 'packet doc');
passAssertion('sandbox_test_mode_channel_validation_scenarios_count_30');
passAssertion('captured_sandbox_test_mode_channel_validation_scenarios_count_0');
passAssertion('missing_sandbox_test_mode_channel_validation_scenarios_count_30');

mustHave(packetDoc, 'controlled_real_roofer_setup_steps_count | 12', 'packet doc');
mustHave(packetDoc, 'captured_controlled_real_roofer_setup_steps_count | 0', 'packet doc');
mustHave(packetDoc, 'missing_controlled_real_roofer_setup_steps_count | 12', 'packet doc');
passAssertion('controlled_real_roofer_setup_steps_count_12');
passAssertion('captured_controlled_real_roofer_setup_steps_count_0');
passAssertion('missing_controlled_real_roofer_setup_steps_count_12');

mustHave(packetDoc, 'controlled_real_roofer_limited_validation_scenarios_count | 5', 'packet doc');
mustHave(
  packetDoc,
  'captured_controlled_real_roofer_limited_validation_scenarios_count | 0',
  'packet doc',
);
mustHave(
  packetDoc,
  'missing_controlled_real_roofer_limited_validation_scenarios_count | 5',
  'packet doc',
);
passAssertion('controlled_real_roofer_limited_validation_scenarios_count_5');
passAssertion('captured_controlled_real_roofer_limited_validation_scenarios_count_0');
passAssertion('missing_controlled_real_roofer_limited_validation_scenarios_count_5');

mustHave(packetDoc, 'approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'sandbox_test_mode_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'live_activation_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'controlled_real_roofer_validation_approval_status | not_granted', 'packet doc');
passAssertion('approval_status_not_granted');
passAssertion('sandbox_test_mode_approval_status_not_granted');
passAssertion('live_activation_approval_status_not_granted');
passAssertion('controlled_real_roofer_validation_approval_status_not_granted');

mustHave(packetDoc, 'future_command_status | blocked_until_exact_signed_approval_and_gate_pass', 'packet doc');
mustHave(packetDoc, FUTURE_APPROVED_COMMAND, 'packet doc');
passAssertion('future_command_status_blocked_until_exact_signed_approval_and_gate_pass');

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(packetDoc, 'approved_channels | []', 'packet doc');
mustHave(packetDoc, 'approved_external_services | []', 'packet doc');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');

mustHave(packetDoc, 'pilot_readiness_summary | demo_ready_with_live_automation_disabled', 'packet doc');
mustHave(packetDoc, 'Sandbox/test-mode activation remains blocked', 'packet doc');
mustHave(packetDoc, 'Live activation remains blocked', 'packet doc');
mustHave(packetDoc, 'Real roofer onboarding/contact remains blocked', 'packet doc');
mustHave(packetDoc, 'Controlled real roofer validation remains blocked', 'packet doc');
passAssertion('sandbox_test_mode_activation_blocked');
passAssertion('live_activation_blocked');
passAssertion('real_roofer_onboarding_contact_blocked');
passAssertion('controlled_real_roofer_validation_blocked');

mustHave(packetDoc, 'TEMPLATE ONLY — NOT SIGNED — NOT APPROVED — DO NOT EXECUTE', 'packet doc');
mustHave(
  packetDoc,
  'copy_paste_approval_template_status | TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE',
  'packet doc',
);
passAssertion('template_labeled_template_only_not_signed_not_approved_do_not_execute');

for (let i = 0; i < EXACT_VALUE_FIELDS.length; i += 1) {
  const field = EXACT_VALUE_FIELDS[i];
  const rowNum = i + 1;
  mustHave(packetDoc, `${rowNum}. ${field}: [FILL OR ACCEPT EXACT VALUE]`, 'packet doc template');
}
passAssertion('template_all_19_exact_value_fields_present');

for (const line of REQUIRED_APPROVAL_LANGUAGE) {
  mustHave(packetDoc, line, 'packet doc template approval language');
}
passAssertion('template_all_required_approval_language_present');

mustHave(packetDoc, 'This is **not** approval to activate anything', 'packet doc');
passAssertion('does_not_approve_activation');

mustHave(packetDoc, 'demo_ready_with_live_automation_disabled', 'packet doc');
mustHave(noGoReviewDoc, 'demo_ready_with_live_automation_disabled', 'no-go review');
mustHave(noGoReviewDoc, 'NO_GO_KEEP_BLOCKED', 'no-go review');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

for (const upstreamFixturePath of [
  finalDecisionBoardFixturePath,
  preRunGuardFixturePath,
  operatorRunbookFixturePath,
  recommendedDefaultsFixturePath,
]) {
  if (!fs.existsSync(path.join(root, upstreamFixturePath))) {
    fail(`missing upstream fixture: ${upstreamFixturePath}`);
  }
}
passAssertion('upstream_final_decision_board_fixture_present');
passAssertion('upstream_pre_run_guard_fixture_present');
passAssertion('upstream_operator_runbook_fixture_present');
passAssertion('upstream_recommended_defaults_fixture_present');

const fixture = readJson(fixturePath);
const finalDecisionBoardFixture = readJson(finalDecisionBoardFixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 1c04c0c');
}
if (fixture.packet_status !== 'review_only') {
  fail('fixture packet_status must be review_only');
}
if (fixture.review_status !== 'final_jason_exact_sandbox_test_mode_approval_copy_paste_review_only') {
  fail('fixture review_status mismatch');
}
if (fixture.copy_paste_packet_status !== 'template_only_blocked') {
  fail('fixture copy_paste_packet_status must be template_only_blocked');
}
if (fixture.copy_paste_packet_gate_decision !== 'NO_GO') {
  fail('fixture copy_paste_packet_gate_decision must be NO_GO');
}
if (fixture.copy_paste_packet_does_not_equal_approval !== true) {
  fail('fixture copy_paste_packet_does_not_equal_approval must be true');
}
if (fixture.template_presence_does_not_equal_approval !== true) {
  fail('fixture template_presence_does_not_equal_approval must be true');
}
if (fixture.final_sandbox_test_mode_approval_decision_board_status !== 'completed') {
  fail('fixture final_sandbox_test_mode_approval_decision_board_status must be completed');
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
if (fixture.copy_paste_approval_template.status !== 'TEMPLATE_ONLY_NOT_SIGNED_NOT_APPROVED_DO_NOT_EXECUTE') {
  fail('fixture copy_paste_approval_template.status mismatch');
}
if (fixture.copy_paste_approval_template.signed !== false) {
  fail('fixture copy_paste_approval_template.signed must be false');
}
if (fixture.copy_paste_approval_template.approved !== false) {
  fail('fixture copy_paste_approval_template.approved must be false');
}
if (fixture.copy_paste_approval_template.captured !== false) {
  fail('fixture copy_paste_approval_template.captured must be false');
}
if (fixture.copy_paste_approval_template.template_only !== true) {
  fail('fixture copy_paste_approval_template.template_only must be true');
}

if (!fixture.accepted_exact_values || typeof fixture.accepted_exact_values !== 'object') {
  fail('fixture accepted_exact_values object missing');
}
if (!fixture.approved_exact_values || typeof fixture.approved_exact_values !== 'object') {
  fail('fixture approved_exact_values object missing');
}
for (const field of EXACT_VALUE_FIELDS) {
  if (!(field in fixture.accepted_exact_values)) {
    fail(`fixture accepted_exact_values missing ${field}`);
  }
  const accepted = fixture.accepted_exact_values[field];
  if (typeof accepted !== 'string' || accepted.trim() !== '') {
    fail(`fixture accepted_exact_values.${field} must be blank`);
  }
  if (!(field in fixture.approved_exact_values)) {
    fail(`fixture approved_exact_values missing ${field}`);
  }
  const approved = fixture.approved_exact_values[field];
  if (typeof approved !== 'string' || approved.trim() !== '') {
    fail(`fixture approved_exact_values.${field} must be blank`);
  }
}
passAssertion('fixture_all_19_accepted_exact_values_blank');
passAssertion('fixture_all_19_approved_exact_values_blank');

if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 35) {
  fail('fixture evidence_chain_commits must contain 35 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}

if (finalDecisionBoardFixture.source_of_truth_commit !== 'e96ff0e') {
  fail('upstream final decision board fixture source_of_truth_commit must be e96ff0e');
}
if (finalDecisionBoardFixture.decision_board_status !== 'blocked') {
  fail('upstream final decision board fixture decision_board_status must be blocked');
}

passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(packetDoc, phrase, 'packet doc forbidden language');
  mustNotHave(noGoReviewDoc, phrase, 'no-go review forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(packetDoc)) fail(`unsafe pattern ${pattern} found in packet doc`);
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
  'Native Workflow Fixture Final Jason Exact Sandbox/Test-Mode Approval Copy/Paste Packet',
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
mustHave(wrapper, 'planning-only', 'wrapper mode');
mustHave(wrapper, 'template-only', 'wrapper mode');
mustHave(wrapper, 'not approval', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'Copy/paste packet does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Template presence does not equal approval', 'wrapper mode');
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

mustHave(packetDoc, noGoReviewDocPath, 'packet doc');
mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, finalDecisionBoardDocPath, 'packet doc');
mustHave(packetDoc, preRunGuardDocPath, 'packet doc');
mustHave(packetDoc, operatorRunbookDocPath, 'packet doc');
mustHave(finalActivationCommandDraftDoc, FINAL_ACTIVATION_COMMAND, 'final activation command draft doc');

if (REQUIRED_ASSERTIONS.length !== 70) {
  fail(`REQUIRED_ASSERTIONS must contain 70 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Final Jason Exact Sandbox/Test-Mode Approval Copy/Paste Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);