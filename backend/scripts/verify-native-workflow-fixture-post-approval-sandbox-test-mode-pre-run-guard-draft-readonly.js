#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const guardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_PRE_RUN_GUARD_DRAFT.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_PRE_RUN_GUARD_NO_GO_REVIEW.md';
const operatorRunbookDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_RUNBOOK_DRAFT.md';
const operatorNoGoChecklistDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_NO_GO_CHECKLIST.md';
const pilotReadinessMasterDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_PILOT_READINESS_MASTER_NO_GO_APPROVAL_DEPENDENCY_SUMMARY.md';
const stopRollbackDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_STOP_ROLLBACK_CHECKLIST.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/post-approval-sandbox-test-mode-pre-run-guard-draft.json';
const operatorRunbookFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/post-approval-sandbox-test-mode-operator-runbook-draft.json';
const pilotReadinessMasterFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/pilot-readiness-master-no-go-approval-dependency-summary.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-post-approval-sandbox-test-mode-pre-run-guard-draft-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-post-approval-sandbox-test-mode-pre-run-guard-draft-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '7f57e7d';
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
];

const BLOCKED_PRE_RUN_CHECKS = [
  'source-of-truth HEAD equals approved HEAD',
  'exact signed Jason approval is captured',
  'approval timestamp is captured',
  'approval scope is captured',
  'all 19 exact values are accepted',
  'all 19 exact values are approved',
  'approval capture completeness gate passes',
  'allowed services/channels match approval scope',
  'environment matches approved environment',
  'working directory matches approved working directory',
  'command matches exact approved command',
  'stop conditions are present',
  'rollback owner is present',
  'evidence owner is present',
  'approval is not expired',
  'one-time-use limitation has not been consumed',
  'full pre-run safety state is demo_ready_with_live_automation_disabled',
  'no unauthorized external services are enabled',
  'no production data access is enabled',
  'no live activation path is enabled',
];

const RECOMMENDED_NEXT_STEP =
  'JASON_COMPLETE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_AND_ALL_19_EXACT_VALUES_BEFORE_PRE_RUN_GUARD_CLEARANCE_AND_COMMAND_EXECUTION';

const REQUIRED_ASSERTIONS = [
  'guard_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_operator_runbook_fixture_present',
  'upstream_pilot_readiness_master_fixture_present',
  'source_of_truth_commit_7f57e7d_referenced',
  'post_approval_sandbox_test_mode_operator_runbook_draft_status_completed',
  'pilot_readiness_master_no_go_approval_dependency_summary_status_completed',
  'pilot_readiness_master_gate_decision_no_go_or_hold',
  'pre_run_guard_status_blocked',
  'pre_run_guard_decision_no_go_or_hold',
  'pre_run_guard_draft_does_not_equal_approval',
  'pre_run_guard_no_go_review_does_not_equal_approval',
  'operator_runbook_draft_does_not_equal_approval',
  'post_approval_runbook_draft_does_not_equal_approval',
  'blocked_pre_run_checks_all_20_checks_present',
  'fixture_blocked_pre_run_checks_all_checks_blocked_until_prerequisites',
  'exact_values_required_count_19',
  'accepted_exact_values_count_0',
  'approved_exact_values_filled_count_0',
  'approval_capture_status_not_captured',
  'jason_signed_approval_status_not_signed',
  'approval_capture_gate_decision_no_go_or_hold',
  'sandbox_test_mode_channel_validation_scenarios_count_30',
  'captured_sandbox_test_mode_channel_validation_scenarios_count_0',
  'missing_sandbox_test_mode_channel_validation_scenarios_count_30',
  'channel_validation_gate_decision_no_go_or_hold',
  'controlled_real_roofer_setup_gate_decision_no_go_or_hold',
  'controlled_real_roofer_limited_validation_gate_decision_no_go_or_hold',
  'default_sandbox_test_mode_decision_hold',
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
  'NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_PRE_RUN_GUARD_DRAFT.md',
  'NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_PRE_RUN_GUARD_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-post-approval-sandbox-test-mode-pre-run-guard-draft-dry-run.sh',
  'verify-native-workflow-fixture-post-approval-sandbox-test-mode-pre-run-guard-draft-readonly.js',
  'post-approval-sandbox-test-mode-pre-run-guard-draft.json',
  'Native Workflow Fixture Post-Approval Sandbox/Test-Mode Pre-Run Guard Draft',
  'native workflow fixture post approval sandbox test mode pre run guard draft',
  'post approval sandbox test mode pre run guard draft',
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

const guardDoc = read(guardDocPath);
const noGoReviewDoc = read(noGoReviewDocPath);
read(operatorRunbookDocPath);
read(operatorNoGoChecklistDocPath);
read(pilotReadinessMasterDocPath);
read(stopRollbackDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);

passAssertion('guard_doc_present');
passAssertion('no_go_review_doc_present');

mustHave(
  guardDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/not-approved/non-executing',
  'guard doc',
);
mustHave(
  noGoReviewDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/not-approved/non-executing',
  'no-go review',
);
mustHave(guardDoc, SOURCE_OF_TRUTH_COMMIT, 'guard doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_7f57e7d_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(guardDoc, commit, 'guard doc');
}

mustHave(
  guardDoc,
  'post_approval_sandbox_test_mode_operator_runbook_draft_status | completed',
  'guard doc',
);
passAssertion('post_approval_sandbox_test_mode_operator_runbook_draft_status_completed');
mustHave(
  guardDoc,
  'pilot_readiness_master_no_go_approval_dependency_summary_status | completed',
  'guard doc',
);
passAssertion('pilot_readiness_master_no_go_approval_dependency_summary_status_completed');
mustHave(guardDoc, 'pilot_readiness_master_gate_decision | NO_GO', 'guard doc');
passAssertion('pilot_readiness_master_gate_decision_no_go_or_hold');

mustHave(guardDoc, 'pre_run_guard_status | blocked', 'guard doc');
mustHave(guardDoc, 'pre_run_guard_decision | NO_GO', 'guard doc');
passAssertion('pre_run_guard_status_blocked');
passAssertion('pre_run_guard_decision_no_go_or_hold');

mustHave(guardDoc, 'Pre-run guard draft does **not** equal approval', 'guard doc');
mustHave(guardDoc, 'Pre-run guard no-go review does **not** equal approval', 'guard doc');
mustHave(guardDoc, 'Operator runbook draft does **not** equal approval', 'guard doc');
mustHave(guardDoc, 'Post-approval runbook draft does **not** equal approval', 'guard doc');
passAssertion('pre_run_guard_draft_does_not_equal_approval');
passAssertion('pre_run_guard_no_go_review_does_not_equal_approval');
passAssertion('operator_runbook_draft_does_not_equal_approval');
passAssertion('post_approval_runbook_draft_does_not_equal_approval');

for (const check of BLOCKED_PRE_RUN_CHECKS) {
  mustHave(guardDoc, check, 'guard doc blocked pre-run checks');
}
passAssertion('blocked_pre_run_checks_all_20_checks_present');

mustHave(guardDoc, 'blocked_until_prerequisites', 'guard doc');
mustHave(guardDoc, 'exact_values_required_count | 19', 'guard doc');
mustHave(guardDoc, 'accepted_exact_values_count | 0', 'guard doc');
mustHave(guardDoc, 'approved_exact_values_filled_count | 0', 'guard doc');
passAssertion('exact_values_required_count_19');
passAssertion('accepted_exact_values_count_0');
passAssertion('approved_exact_values_filled_count_0');

mustHave(guardDoc, 'approval_capture_status | not_captured', 'guard doc');
mustHave(guardDoc, 'jason_signed_approval_status | not_signed', 'guard doc');
mustHave(guardDoc, 'approval_capture_gate_decision | NO_GO', 'guard doc');
passAssertion('approval_capture_status_not_captured');
passAssertion('jason_signed_approval_status_not_signed');
passAssertion('approval_capture_gate_decision_no_go_or_hold');

mustHave(guardDoc, 'sandbox_test_mode_channel_validation_scenarios_count | 30', 'guard doc');
mustHave(guardDoc, 'captured_sandbox_test_mode_channel_validation_scenarios_count | 0', 'guard doc');
mustHave(guardDoc, 'missing_sandbox_test_mode_channel_validation_scenarios_count | 30', 'guard doc');
passAssertion('sandbox_test_mode_channel_validation_scenarios_count_30');
passAssertion('captured_sandbox_test_mode_channel_validation_scenarios_count_0');
passAssertion('missing_sandbox_test_mode_channel_validation_scenarios_count_30');
mustHave(guardDoc, 'channel_validation_gate_decision | NO_GO', 'guard doc');
passAssertion('channel_validation_gate_decision_no_go_or_hold');
mustHave(guardDoc, 'controlled_real_roofer_setup_gate_decision | NO_GO', 'guard doc');
passAssertion('controlled_real_roofer_setup_gate_decision_no_go_or_hold');
mustHave(guardDoc, 'controlled_real_roofer_limited_validation_gate_decision | NO_GO', 'guard doc');
passAssertion('controlled_real_roofer_limited_validation_gate_decision_no_go_or_hold');

mustHave(guardDoc, 'default_sandbox_test_mode_decision | HOLD', 'guard doc');
mustHave(guardDoc, 'Default sandbox/test-mode decision remains **HOLD**', 'guard doc');
passAssertion('default_sandbox_test_mode_decision_hold');

mustHave(guardDoc, 'approval_status | not_granted', 'guard doc');
mustHave(guardDoc, 'sandbox_test_mode_approval_status | not_granted', 'guard doc');
mustHave(guardDoc, 'live_activation_approval_status | not_granted', 'guard doc');
mustHave(guardDoc, 'controlled_real_roofer_validation_approval_status | not_granted', 'guard doc');
passAssertion('approval_status_not_granted');
passAssertion('sandbox_test_mode_approval_status_not_granted');
passAssertion('live_activation_approval_status_not_granted');
passAssertion('controlled_real_roofer_validation_approval_status_not_granted');

mustHave(guardDoc, 'future_command_status | blocked_until_exact_signed_approval_and_gate_pass', 'guard doc');
mustHave(guardDoc, FUTURE_APPROVED_COMMAND, 'guard doc');
passAssertion('future_command_status_blocked_until_exact_signed_approval_and_gate_pass');

mustHave(guardDoc, 'approved_for_activation_now | false', 'guard doc');
mustHave(guardDoc, 'command_execution_status | not_run_by_this_packet', 'guard doc');
mustHave(guardDoc, 'approved_channels | []', 'guard doc');
mustHave(guardDoc, 'approved_external_services | []', 'guard doc');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');

mustHave(guardDoc, 'Sandbox/test-mode activation remains blocked', 'guard doc');
mustHave(guardDoc, 'Live activation remains blocked', 'guard doc');
mustHave(guardDoc, 'Real roofer onboarding/contact remains blocked', 'guard doc');
mustHave(guardDoc, 'Controlled real roofer validation remains blocked', 'guard doc');
passAssertion('sandbox_test_mode_activation_blocked');
passAssertion('live_activation_blocked');
passAssertion('real_roofer_onboarding_contact_blocked');
passAssertion('controlled_real_roofer_validation_blocked');

mustHave(guardDoc, 'This packet does **not** approve sandbox/test-mode activation', 'guard doc');
mustHave(guardDoc, 'This packet does **not** approve live activation', 'guard doc');
mustHave(guardDoc, 'This packet does **not** approve controlled real roofer validation', 'guard doc');
mustHave(guardDoc, 'This is **not** approval to activate anything', 'guard doc');
passAssertion('does_not_approve_activation');

mustHave(guardDoc, 'demo_ready_with_live_automation_disabled', 'guard doc');
mustHave(noGoReviewDoc, 'demo_ready_with_live_automation_disabled', 'no-go review');

mustHave(noGoReviewDoc, 'NO_GO_KEEP_BLOCKED', 'no-go review');
mustHave(noGoReviewDoc, 'future_command_status | blocked_until_exact_signed_approval_and_gate_pass', 'no-go review');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

for (const upstreamFixturePath of [
  operatorRunbookFixturePath,
  pilotReadinessMasterFixturePath,
]) {
  if (!fs.existsSync(path.join(root, upstreamFixturePath))) {
    fail(`missing upstream fixture: ${upstreamFixturePath}`);
  }
}
passAssertion('upstream_operator_runbook_fixture_present');
passAssertion('upstream_pilot_readiness_master_fixture_present');

const fixture = readJson(fixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 7f57e7d');
}
if (fixture.packet_status !== 'review_only') {
  fail('fixture packet_status must be review_only');
}
if (fixture.review_status !== 'post_approval_sandbox_test_mode_pre_run_guard_draft_review_only') {
  fail('fixture review_status mismatch');
}
if (fixture.pre_run_guard_status !== 'blocked') {
  fail('fixture pre_run_guard_status must be blocked');
}
if (fixture.pre_run_guard_decision !== 'NO_GO') {
  fail('fixture pre_run_guard_decision must be NO_GO');
}
if (fixture.pre_run_guard_draft_gate_decision !== 'NO_GO') {
  fail('fixture pre_run_guard_draft_gate_decision must be NO_GO');
}
if (fixture.pre_run_guard_draft_does_not_equal_approval !== true) {
  fail('fixture pre_run_guard_draft_does_not_equal_approval must be true');
}
if (fixture.pre_run_guard_no_go_review_does_not_equal_approval !== true) {
  fail('fixture pre_run_guard_no_go_review_does_not_equal_approval must be true');
}
if (fixture.operator_runbook_draft_does_not_equal_approval !== true) {
  fail('fixture operator_runbook_draft_does_not_equal_approval must be true');
}
if (fixture.post_approval_runbook_draft_does_not_equal_approval !== true) {
  fail('fixture post_approval_runbook_draft_does_not_equal_approval must be true');
}
if (fixture.post_approval_sandbox_test_mode_operator_runbook_draft_status !== 'completed') {
  fail('fixture post_approval_sandbox_test_mode_operator_runbook_draft_status must be completed');
}
if (fixture.pilot_readiness_master_no_go_approval_dependency_summary_status !== 'completed') {
  fail('fixture pilot_readiness_master_no_go_approval_dependency_summary_status must be completed');
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
if (fixture.approval_capture_gate_decision !== 'NO_GO') {
  fail('fixture approval_capture_gate_decision must be NO_GO');
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
if (fixture.channel_validation_gate_decision !== 'NO_GO') {
  fail('fixture channel_validation_gate_decision must be NO_GO');
}
if (fixture.controlled_real_roofer_setup_gate_decision !== 'NO_GO') {
  fail('fixture controlled_real_roofer_setup_gate_decision must be NO_GO');
}
if (fixture.controlled_real_roofer_limited_validation_gate_decision !== 'NO_GO') {
  fail('fixture controlled_real_roofer_limited_validation_gate_decision must be NO_GO');
}
if (fixture.default_sandbox_test_mode_decision !== 'HOLD') {
  fail('fixture default_sandbox_test_mode_decision must be HOLD');
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

if (!Array.isArray(fixture.blocked_pre_run_checks) || fixture.blocked_pre_run_checks.length !== 20) {
  fail('fixture blocked_pre_run_checks must contain 20 checks');
}
for (let i = 0; i < BLOCKED_PRE_RUN_CHECKS.length; i += 1) {
  if (fixture.blocked_pre_run_checks[i].check !== i + 1) {
    fail(`fixture blocked_pre_run_checks check ${i + 1} number mismatch`);
  }
  if (fixture.blocked_pre_run_checks[i].name !== BLOCKED_PRE_RUN_CHECKS[i]) {
    fail(`fixture blocked_pre_run_checks check ${i + 1} name mismatch`);
  }
  if (fixture.blocked_pre_run_checks[i].status !== 'blocked_until_prerequisites') {
    fail(`fixture blocked_pre_run_checks check ${i + 1} status must be blocked_until_prerequisites`);
  }
}
passAssertion('fixture_blocked_pre_run_checks_all_checks_blocked_until_prerequisites');

if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 33) {
  fail('fixture evidence_chain_commits must contain 33 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}

passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(guardDoc, phrase, 'guard doc forbidden language');
  mustNotHave(noGoReviewDoc, phrase, 'no-go review forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(guardDoc)) fail(`unsafe pattern ${pattern} found in guard doc`);
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
  'Native Workflow Fixture Post-Approval Sandbox/Test-Mode Pre-Run Guard Draft',
  'aggregate readiness',
);
mustHave(verifierIndex, guardDocPath, 'verifier index');
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
mustHave(wrapper, 'Pre-run guard draft does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Pre-run guard no-go review does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Operator runbook draft does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Default sandbox/test-mode decision remains HOLD', 'wrapper mode');
mustHave(wrapper, 'future_command_status is blocked_until_exact_signed_approval_and_gate_pass', 'wrapper mode');
mustHave(wrapper, 'Sandbox/test-mode activation remains blocked', 'wrapper mode');
mustHave(wrapper, 'Live activation remains blocked', 'wrapper mode');
mustHave(wrapper, 'Real roofer onboarding/contact remains blocked', 'wrapper mode');
mustHave(wrapper, 'Controlled real roofer validation remains blocked', 'wrapper mode');
mustHave(wrapper, 'NOT CAPTURED / NOT SIGNED / NOT GRANTED', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, FUTURE_APPROVED_COMMAND, 'wrapper must not execute future approved command');
mustNotHave(wrapper, FINAL_ACTIVATION_COMMAND, 'wrapper must not execute final activation command');
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(guardDoc, operatorRunbookDocPath, 'guard doc');
mustHave(guardDoc, pilotReadinessMasterDocPath, 'guard doc');
mustHave(guardDoc, stopRollbackDocPath, 'guard doc');
mustHave(guardDoc, noGoReviewDocPath, 'guard doc');
mustHave(guardDoc, fixturePath, 'guard doc');
mustHave(guardDoc, verifierPath, 'guard doc');
mustHave(guardDoc, wrapperPath, 'guard doc');
mustHave(finalActivationCommandDraftDoc, FINAL_ACTIVATION_COMMAND, 'final activation command draft doc');

if (REQUIRED_ASSERTIONS.length !== 50) {
  fail(`REQUIRED_ASSERTIONS must contain 50 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Post-Approval Sandbox/Test-Mode Pre-Run Guard Draft verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);