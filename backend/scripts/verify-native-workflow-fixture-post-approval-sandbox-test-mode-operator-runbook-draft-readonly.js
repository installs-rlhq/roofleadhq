#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const runbookDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_RUNBOOK_DRAFT.md';
const noGoChecklistDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_NO_GO_CHECKLIST.md';
const pilotReadinessMasterDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_PILOT_READINESS_MASTER_NO_GO_APPROVAL_DEPENDENCY_SUMMARY.md';
const channelValidationEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_EVIDENCE_CAPTURE_PACKET.md';
const stopRollbackDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_CHANNEL_VALIDATION_STOP_ROLLBACK_CHECKLIST.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/post-approval-sandbox-test-mode-operator-runbook-draft.json';
const pilotReadinessMasterFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/pilot-readiness-master-no-go-approval-dependency-summary.json';
const channelValidationEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-channel-validation-evidence-capture-packet.json';
const channelValidationCompletenessGateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-channel-validation-completeness-gate.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-post-approval-sandbox-test-mode-operator-runbook-draft-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-post-approval-sandbox-test-mode-operator-runbook-draft-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = 'f36a247';
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
];

const BLOCKED_OPERATOR_SEQUENCE = [
  'confirm source-of-truth HEAD',
  'confirm exact signed Jason approval captured',
  'confirm all 19 exact values accepted and approved',
  'confirm approval capture completeness gate passes',
  'confirm allowed services/channels match approval scope',
  'confirm environment and working directory',
  'confirm command matches exact approved command',
  'confirm stop conditions and rollback owner',
  'run only the approved sandbox/test-mode command',
  'capture evidence for all 30 channel validation scenarios',
  'run post-run safety/readiness checks',
  'record pass/fail, artifacts, reviewer signoff, and final safety state',
];

const RECOMMENDED_NEXT_STEP =
  'JASON_COMPLETE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_AND_ALL_19_EXACT_VALUES_BEFORE_POST_APPROVAL_OPERATOR_RUNBOOK_EXECUTION';

const REQUIRED_ASSERTIONS = [
  'runbook_doc_present',
  'no_go_checklist_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_pilot_readiness_master_fixture_present',
  'upstream_channel_validation_evidence_fixture_present',
  'upstream_channel_validation_completeness_gate_fixture_present',
  'source_of_truth_commit_f36a247_referenced',
  'pilot_readiness_master_no_go_approval_dependency_summary_status_completed',
  'pilot_readiness_master_gate_decision_no_go_or_hold',
  'post_approval_runbook_draft_does_not_equal_approval',
  'operator_runbook_does_not_equal_approval',
  'no_go_checklist_does_not_equal_approval',
  'blocked_operator_sequence_all_12_steps_present',
  'fixture_blocked_operator_sequence_all_steps_blocked_until_prerequisites',
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
  'NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_RUNBOOK_DRAFT.md',
  'NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_OPERATOR_NO_GO_CHECKLIST.md',
  'run-native-workflow-fixture-post-approval-sandbox-test-mode-operator-runbook-draft-dry-run.sh',
  'verify-native-workflow-fixture-post-approval-sandbox-test-mode-operator-runbook-draft-readonly.js',
  'post-approval-sandbox-test-mode-operator-runbook-draft.json',
  'Native Workflow Fixture Post-Approval Sandbox/Test-Mode Operator Runbook Draft',
  'native workflow fixture post approval sandbox test mode operator runbook draft',
  'post approval sandbox test mode operator runbook draft',
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

const runbookDoc = read(runbookDocPath);
const noGoChecklistDoc = read(noGoChecklistDocPath);
read(pilotReadinessMasterDocPath);
read(channelValidationEvidenceDocPath);
read(stopRollbackDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);

passAssertion('runbook_doc_present');
passAssertion('no_go_checklist_doc_present');

mustHave(
  runbookDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/not-approved/non-executing',
  'runbook doc',
);
mustHave(
  noGoChecklistDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only/planning-only/not-approved/non-executing',
  'no-go checklist',
);
mustHave(runbookDoc, SOURCE_OF_TRUTH_COMMIT, 'runbook doc');
mustHave(noGoChecklistDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go checklist');
passAssertion('source_of_truth_commit_f36a247_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(runbookDoc, commit, 'runbook doc');
}

mustHave(
  runbookDoc,
  'pilot_readiness_master_no_go_approval_dependency_summary_status | completed',
  'runbook doc',
);
passAssertion('pilot_readiness_master_no_go_approval_dependency_summary_status_completed');
mustHave(runbookDoc, 'pilot_readiness_master_gate_decision | NO_GO', 'runbook doc');
passAssertion('pilot_readiness_master_gate_decision_no_go_or_hold');

mustHave(runbookDoc, 'Post-approval runbook draft does **not** equal approval', 'runbook doc');
mustHave(runbookDoc, 'Operator runbook does **not** equal approval', 'runbook doc');
mustHave(runbookDoc, 'No-go checklist does **not** equal approval', 'runbook doc');
passAssertion('post_approval_runbook_draft_does_not_equal_approval');
passAssertion('operator_runbook_does_not_equal_approval');
passAssertion('no_go_checklist_does_not_equal_approval');

for (const step of BLOCKED_OPERATOR_SEQUENCE) {
  mustHave(runbookDoc, step, 'runbook doc blocked operator sequence');
}
passAssertion('blocked_operator_sequence_all_12_steps_present');

mustHave(runbookDoc, 'blocked_until_prerequisites', 'runbook doc');
mustHave(runbookDoc, 'exact_values_required_count | 19', 'runbook doc');
mustHave(runbookDoc, 'accepted_exact_values_count | 0', 'runbook doc');
mustHave(runbookDoc, 'approved_exact_values_filled_count | 0', 'runbook doc');
passAssertion('exact_values_required_count_19');
passAssertion('accepted_exact_values_count_0');
passAssertion('approved_exact_values_filled_count_0');

mustHave(runbookDoc, 'approval_capture_status | not_captured', 'runbook doc');
mustHave(runbookDoc, 'jason_signed_approval_status | not_signed', 'runbook doc');
mustHave(runbookDoc, 'approval_capture_gate_decision | NO_GO', 'runbook doc');
passAssertion('approval_capture_status_not_captured');
passAssertion('jason_signed_approval_status_not_signed');
passAssertion('approval_capture_gate_decision_no_go_or_hold');

mustHave(runbookDoc, 'sandbox_test_mode_channel_validation_scenarios_count | 30', 'runbook doc');
mustHave(runbookDoc, 'captured_sandbox_test_mode_channel_validation_scenarios_count | 0', 'runbook doc');
mustHave(runbookDoc, 'missing_sandbox_test_mode_channel_validation_scenarios_count | 30', 'runbook doc');
passAssertion('sandbox_test_mode_channel_validation_scenarios_count_30');
passAssertion('captured_sandbox_test_mode_channel_validation_scenarios_count_0');
passAssertion('missing_sandbox_test_mode_channel_validation_scenarios_count_30');
mustHave(runbookDoc, 'channel_validation_gate_decision | NO_GO', 'runbook doc');
passAssertion('channel_validation_gate_decision_no_go_or_hold');
mustHave(runbookDoc, 'controlled_real_roofer_setup_gate_decision | NO_GO', 'runbook doc');
passAssertion('controlled_real_roofer_setup_gate_decision_no_go_or_hold');
mustHave(runbookDoc, 'controlled_real_roofer_limited_validation_gate_decision | NO_GO', 'runbook doc');
passAssertion('controlled_real_roofer_limited_validation_gate_decision_no_go_or_hold');

mustHave(runbookDoc, 'default_sandbox_test_mode_decision | HOLD', 'runbook doc');
mustHave(runbookDoc, 'Default sandbox/test-mode decision remains **HOLD**', 'runbook doc');
passAssertion('default_sandbox_test_mode_decision_hold');

mustHave(runbookDoc, 'approval_status | not_granted', 'runbook doc');
mustHave(runbookDoc, 'sandbox_test_mode_approval_status | not_granted', 'runbook doc');
mustHave(runbookDoc, 'live_activation_approval_status | not_granted', 'runbook doc');
mustHave(runbookDoc, 'controlled_real_roofer_validation_approval_status | not_granted', 'runbook doc');
passAssertion('approval_status_not_granted');
passAssertion('sandbox_test_mode_approval_status_not_granted');
passAssertion('live_activation_approval_status_not_granted');
passAssertion('controlled_real_roofer_validation_approval_status_not_granted');

mustHave(runbookDoc, 'future_command_status | blocked_until_exact_signed_approval_and_gate_pass', 'runbook doc');
mustHave(runbookDoc, FUTURE_APPROVED_COMMAND, 'runbook doc');
passAssertion('future_command_status_blocked_until_exact_signed_approval_and_gate_pass');

mustHave(runbookDoc, 'approved_for_activation_now | false', 'runbook doc');
mustHave(runbookDoc, 'command_execution_status | not_run_by_this_packet', 'runbook doc');
mustHave(runbookDoc, 'approved_channels | []', 'runbook doc');
mustHave(runbookDoc, 'approved_external_services | []', 'runbook doc');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');

mustHave(runbookDoc, 'Sandbox/test-mode activation remains blocked', 'runbook doc');
mustHave(runbookDoc, 'Live activation remains blocked', 'runbook doc');
mustHave(runbookDoc, 'Real roofer onboarding/contact remains blocked', 'runbook doc');
mustHave(runbookDoc, 'Controlled real roofer validation remains blocked', 'runbook doc');
passAssertion('sandbox_test_mode_activation_blocked');
passAssertion('live_activation_blocked');
passAssertion('real_roofer_onboarding_contact_blocked');
passAssertion('controlled_real_roofer_validation_blocked');

mustHave(runbookDoc, 'This packet does **not** approve sandbox/test-mode activation', 'runbook doc');
mustHave(runbookDoc, 'This packet does **not** approve live activation', 'runbook doc');
mustHave(runbookDoc, 'This packet does **not** approve controlled real roofer validation', 'runbook doc');
mustHave(runbookDoc, 'This is **not** approval to activate anything', 'runbook doc');
passAssertion('does_not_approve_activation');

mustHave(runbookDoc, 'demo_ready_with_live_automation_disabled', 'runbook doc');
mustHave(noGoChecklistDoc, 'demo_ready_with_live_automation_disabled', 'no-go checklist');

mustHave(noGoChecklistDoc, 'NO_GO_KEEP_BLOCKED', 'no-go checklist');
mustHave(noGoChecklistDoc, 'future_command_status | blocked_until_exact_signed_approval_and_gate_pass', 'no-go checklist');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

for (const upstreamFixturePath of [
  pilotReadinessMasterFixturePath,
  channelValidationEvidenceFixturePath,
  channelValidationCompletenessGateFixturePath,
]) {
  if (!fs.existsSync(path.join(root, upstreamFixturePath))) {
    fail(`missing upstream fixture: ${upstreamFixturePath}`);
  }
}
passAssertion('upstream_pilot_readiness_master_fixture_present');
passAssertion('upstream_channel_validation_evidence_fixture_present');
passAssertion('upstream_channel_validation_completeness_gate_fixture_present');

const fixture = readJson(fixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be f36a247');
}
if (fixture.packet_status !== 'review_only') {
  fail('fixture packet_status must be review_only');
}
if (fixture.review_status !== 'post_approval_sandbox_test_mode_operator_runbook_draft_review_only') {
  fail('fixture review_status mismatch');
}
if (fixture.post_approval_runbook_draft_gate_decision !== 'NO_GO') {
  fail('fixture post_approval_runbook_draft_gate_decision must be NO_GO');
}
if (fixture.post_approval_runbook_draft_does_not_equal_approval !== true) {
  fail('fixture post_approval_runbook_draft_does_not_equal_approval must be true');
}
if (fixture.operator_runbook_does_not_equal_approval !== true) {
  fail('fixture operator_runbook_does_not_equal_approval must be true');
}
if (fixture.no_go_checklist_does_not_equal_approval !== true) {
  fail('fixture no_go_checklist_does_not_equal_approval must be true');
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

if (!Array.isArray(fixture.blocked_operator_sequence) || fixture.blocked_operator_sequence.length !== 12) {
  fail('fixture blocked_operator_sequence must contain 12 steps');
}
for (let i = 0; i < BLOCKED_OPERATOR_SEQUENCE.length; i += 1) {
  if (fixture.blocked_operator_sequence[i].step !== i + 1) {
    fail(`fixture blocked_operator_sequence step ${i + 1} number mismatch`);
  }
  if (fixture.blocked_operator_sequence[i].action !== BLOCKED_OPERATOR_SEQUENCE[i]) {
    fail(`fixture blocked_operator_sequence step ${i + 1} action mismatch`);
  }
  if (fixture.blocked_operator_sequence[i].status !== 'blocked_until_prerequisites') {
    fail(`fixture blocked_operator_sequence step ${i + 1} status must be blocked_until_prerequisites`);
  }
}
passAssertion('fixture_blocked_operator_sequence_all_steps_blocked_until_prerequisites');

if (!Array.isArray(fixture.evidence_chain_commits) || fixture.evidence_chain_commits.length !== 32) {
  fail('fixture evidence_chain_commits must contain 32 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}

passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(runbookDoc, phrase, 'runbook doc forbidden language');
  mustNotHave(noGoChecklistDoc, phrase, 'no-go checklist forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runbookDoc)) fail(`unsafe pattern ${pattern} found in runbook doc`);
  if (pattern.test(noGoChecklistDoc)) fail(`unsafe pattern ${pattern} found in no-go checklist`);
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
  'Native Workflow Fixture Post-Approval Sandbox/Test-Mode Operator Runbook Draft',
  'aggregate readiness',
);
mustHave(verifierIndex, runbookDocPath, 'verifier index');
mustHave(verifierIndex, noGoChecklistDocPath, 'verifier index');
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
mustHave(wrapper, 'Post-approval runbook draft does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Operator runbook does not equal approval', 'wrapper mode');
mustHave(wrapper, 'No-go checklist does not equal approval', 'wrapper mode');
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

mustHave(runbookDoc, pilotReadinessMasterDocPath, 'runbook doc');
mustHave(runbookDoc, channelValidationEvidenceDocPath, 'runbook doc');
mustHave(runbookDoc, stopRollbackDocPath, 'runbook doc');
mustHave(runbookDoc, noGoChecklistDocPath, 'runbook doc');
mustHave(runbookDoc, fixturePath, 'runbook doc');
mustHave(runbookDoc, verifierPath, 'runbook doc');
mustHave(runbookDoc, wrapperPath, 'runbook doc');
mustHave(finalActivationCommandDraftDoc, FINAL_ACTIVATION_COMMAND, 'final activation command draft doc');

if (REQUIRED_ASSERTIONS.length !== 47) {
  fail(`REQUIRED_ASSERTIONS must contain 47 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Post-Approval Sandbox/Test-Mode Operator Runbook Draft verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);