#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const decisionDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_DECISION_DRAFT_PACKET.md';
const decisionDraftFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-approval-decision-draft-packet.json';
const completenessEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_VALUES_COMPLETENESS_REVIEW_EVIDENCE_PACKET.md';
const completenessEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/exact-values-completeness-review-evidence-packet.json';
const captureDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_CAPTURE_DRAFT.md';
const worksheetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_WORKSHEET.md';
const completenessReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_EXACT_VALUES_COMPLETENESS_REVIEW.md';
const captureDraftFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-exact-values-capture-draft.json';
const completenessEvidenceVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-exact-values-completeness-review-evidence-packet-readonly.js';
const completenessEvidenceWrapperPath =
  'scripts/run-native-workflow-fixture-exact-values-completeness-review-evidence-packet-dry-run.sh';
const wrapperPath =
  'scripts/run-native-workflow-fixture-sandbox-test-mode-approval-decision-draft-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-approval-decision-draft-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '816dfc2';
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
];
const RECOMMENDED_NEXT_STEP =
  'JASON_REVIEW_SANDBOX_TEST_MODE_APPROVAL_DECISION_DRAFT_HOLD_UNTIL_EXACT_VALUES_COMPLETE';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

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

const REQUIRED_ASSERTIONS = [
  'decision_draft_doc_present',
  'completeness_evidence_doc_present',
  'capture_draft_doc_present',
  'worksheet_doc_present',
  'completeness_review_doc_present',
  'structured_decision_draft_fixture_present',
  'completeness_evidence_fixture_present',
  'capture_draft_fixture_present',
  'structured_decision_draft_fixture_valid_json',
  'source_of_truth_commit_816dfc2_referenced',
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
  'completeness_status_incomplete',
  'approval_status_not_granted',
  'sandbox_test_mode_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'local_evidence_chain_status_passed',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'blank_placeholders_are_not_approval',
  'all_approved_insufficient_without_exact_values',
  'evidence_review_does_not_equal_approval',
  'decision_draft_does_not_equal_approval',
  'sandbox_test_mode_approval_requires_separate_jason_approval',
  'live_activation_requires_separate_later_approval',
  'exact_values_required_count_19',
  'exact_values_filled_count_0',
  'all_exact_values_filled_false',
  'go_ho_no_go_decision_options_present',
  'default_decision_hold',
  'go_unavailable_until_exact_values_complete',
  'go_not_available_by_default',
  'decision_draft_does_not_approve_sandbox_test_mode_activation',
  'decision_draft_live_activation_remains_not_granted',
  'capture_draft_all_19_exact_values_blank',
  'capture_draft_capture_status_blank_draft_only',
  'completeness_evidence_status_incomplete',
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
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_DECISION_DRAFT_PACKET.md',
  'run-native-workflow-fixture-sandbox-test-mode-approval-decision-draft-packet-dry-run.sh',
  'verify-native-workflow-fixture-sandbox-test-mode-approval-decision-draft-packet-readonly.js',
  'sandbox-test-mode-approval-decision-draft-packet.json',
  'Native Workflow Fixture Sandbox/Test-Mode Approval Decision Draft Packet',
  'native workflow fixture sandbox test mode approval decision draft packet',
  'sandbox test mode approval decision draft packet',
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

const decisionDraftDoc = read(decisionDraftDocPath);
const completenessEvidenceDoc = read(completenessEvidenceDocPath);
const captureDraftDoc = read(captureDraftDocPath);
const worksheetDoc = read(worksheetDocPath);
const completenessReviewDoc = read(completenessReviewDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${decisionDraftDoc}\n${completenessEvidenceDoc}\n${captureDraftDoc}\n${worksheetDoc}\n${completenessReviewDoc}`;

passAssertion('decision_draft_doc_present');
passAssertion('completeness_evidence_doc_present');
passAssertion('capture_draft_doc_present');
passAssertion('worksheet_doc_present');
passAssertion('completeness_review_doc_present');

mustHave(decisionDraftDoc, SOURCE_OF_TRUTH_COMMIT, 'decision draft doc');
mustHave(completenessEvidenceDoc, '6b2fe60', 'completeness evidence doc');
passAssertion('source_of_truth_commit_816dfc2_referenced');

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

mustHave(decisionDraftDoc, 'completeness_status | incomplete', 'decision draft doc');
passAssertion('completeness_status_incomplete');
mustHave(decisionDraftDoc, 'approval_status | not_granted', 'decision draft doc');
passAssertion('approval_status_not_granted');
mustHave(
  decisionDraftDoc,
  'sandbox_test_mode_approval_status | not_granted',
  'decision draft doc',
);
passAssertion('sandbox_test_mode_approval_status_not_granted');
mustHave(
  decisionDraftDoc,
  'live_activation_approval_status | not_granted',
  'decision draft doc',
);
passAssertion('live_activation_approval_status_not_granted');
mustHave(decisionDraftDoc, 'local_evidence_chain_status | passed', 'decision draft doc');
passAssertion('local_evidence_chain_status_passed');
mustHave(decisionDraftDoc, 'p0_blockers_count | 0', 'decision draft doc');
passAssertion('p0_blockers_count_0');
mustHave(decisionDraftDoc, 'p1_polish_status | completed', 'decision draft doc');
passAssertion('p1_polish_status_completed');
mustHave(decisionDraftDoc, 'p2_refinement_status | completed', 'decision draft doc');
passAssertion('p2_refinement_status_completed');
mustHave(decisionDraftDoc, 'p3_planning_status | completed', 'decision draft doc');
passAssertion('p3_planning_status_completed');

mustHave(decisionDraftDoc, 'Blank placeholders are **not** approval', 'decision draft doc');
mustHave(captureDraftDoc, 'Blank placeholders are **not** approval', 'capture draft doc');
passAssertion('blank_placeholders_are_not_approval');

mustHave(
  decisionDraftDoc,
  '"All approved" is **insufficient** for execution without exact scoped values',
  'decision draft doc',
);
mustHave(
  captureDraftDoc,
  '"All approved" is **insufficient** for execution without exact values',
  'capture draft doc',
);
passAssertion('all_approved_insufficient_without_exact_values');

mustHave(
  decisionDraftDoc,
  'Evidence review does **not** equal approval',
  'decision draft doc',
);
passAssertion('evidence_review_does_not_equal_approval');

mustHave(
  decisionDraftDoc,
  'Decision draft does **not** equal approval',
  'decision draft doc',
);
passAssertion('decision_draft_does_not_equal_approval');

mustHave(
  decisionDraftDoc,
  'Sandbox/test-mode approval still requires separate exact Jason approval',
  'decision draft doc',
);
passAssertion('sandbox_test_mode_approval_requires_separate_jason_approval');

mustHave(
  decisionDraftDoc,
  'Live activation still requires separate later approval',
  'decision draft doc',
);
passAssertion('live_activation_requires_separate_later_approval');

mustHave(decisionDraftDoc, 'exact_values_required_count | 19', 'decision draft doc');
mustHave(decisionDraftDoc, 'exact_values_filled_count | 0', 'decision draft doc');
mustHave(decisionDraftDoc, 'all_exact_values_filled | false', 'decision draft doc');
passAssertion('exact_values_required_count_19');
passAssertion('exact_values_filled_count_0');
passAssertion('all_exact_values_filled_false');

mustHave(decisionDraftDoc, 'GO / HOLD / NO-GO', 'decision draft doc');
mustHave(decisionDraftDoc, '| GO |', 'decision draft doc');
mustHave(decisionDraftDoc, '| HOLD |', 'decision draft doc');
mustHave(decisionDraftDoc, '| NO-GO |', 'decision draft doc');
passAssertion('go_ho_no_go_decision_options_present');

mustHave(decisionDraftDoc, 'default_decision | HOLD', 'decision draft doc');
mustHave(decisionDraftDoc, 'Default decision is HOLD', 'decision draft doc');
passAssertion('default_decision_hold');

mustHave(decisionDraftDoc, 'go_available | false', 'decision draft doc');
mustHave(decisionDraftDoc, 'go_unavailable_until_exact_values_complete | true', 'decision draft doc');
mustHave(
  decisionDraftDoc,
  'GO is unavailable until all 19 exact values are filled',
  'decision draft doc',
);
passAssertion('go_unavailable_until_exact_values_complete');
passAssertion('go_not_available_by_default');

mustHave(
  decisionDraftDoc,
  'does **not** approve sandbox/test-mode activation',
  'decision draft doc',
);
passAssertion('decision_draft_does_not_approve_sandbox_test_mode_activation');
mustHave(decisionDraftDoc, 'Live activation remains **not granted**', 'decision draft doc');
passAssertion('decision_draft_live_activation_remains_not_granted');

mustHave(decisionDraftDoc, 'capture_draft_capture_status | blank_draft_only', 'decision draft doc');
passAssertion('capture_draft_capture_status_blank_draft_only');

mustHave(decisionDraftDoc, 'approved_for_activation_now | false', 'decision draft doc');
passAssertion('approved_for_activation_now_false');
mustHave(
  decisionDraftDoc,
  'command_execution_status | not_run_by_this_packet',
  'decision draft doc',
);
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(decisionDraftDoc, 'approved_channels | []', 'decision draft doc');
passAssertion('approved_channels_empty');
mustHave(decisionDraftDoc, 'approved_external_services | []', 'decision draft doc');
passAssertion('approved_external_services_empty');
mustHave(decisionDraftDoc, 'live_activation_allowed | false', 'decision draft doc');
passAssertion('live_activation_allowed_false');
mustHave(
  decisionDraftDoc,
  'sandbox_test_mode_activation_allowed | false',
  'decision draft doc',
);
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(decisionDraftDoc, 'external_calls_allowed | false', 'decision draft doc');
passAssertion('external_calls_allowed_false');
mustHave(decisionDraftDoc, 'credentials_access_allowed | false', 'decision draft doc');
passAssertion('credentials_access_allowed_false');
mustHave(decisionDraftDoc, 'production_data_access_allowed | false', 'decision draft doc');
passAssertion('production_data_access_allowed_false');
mustHave(
  decisionDraftDoc,
  'schema_auth_rls_security_changes_allowed | false',
  'decision draft doc',
);
passAssertion('schema_auth_rls_security_changes_allowed_false');
mustHave(
  decisionDraftDoc,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'decision draft doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');
mustHave(decisionDraftDoc, 'billing_payment_automation_allowed | false', 'decision draft doc');
passAssertion('billing_payment_automation_allowed_false');
mustHave(
  decisionDraftDoc,
  'public_go_live_or_production_copy_changes_allowed | false',
  'decision draft doc',
);
passAssertion('public_go_live_or_production_copy_changes_allowed_false');
mustHave(
  decisionDraftDoc,
  'real_demo_sandbox_live_testing_allowed | false',
  'decision draft doc',
);
passAssertion('real_demo_sandbox_live_testing_allowed_false');

mustHave(
  decisionDraftDoc,
  'old 90-day plan cannot override current source-of-truth direction',
  'decision draft doc',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(decisionDraftDoc, 'This is **not** approval to activate anything', 'decision draft doc');
mustHave(
  decisionDraftDoc,
  'does **not** approve sandbox/test-mode activation',
  'decision draft doc',
);
passAssertion('does_not_approve_activation');

mustHave(decisionDraftDoc, 'Twilio', 'decision draft doc');
mustHave(decisionDraftDoc, 'webhook', 'decision draft doc');
mustHave(decisionDraftDoc, 'scheduler', 'decision draft doc');
mustHave(decisionDraftDoc, 'billing', 'decision draft doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(decisionDraftDoc, 'public_website_go_live_copy_changed | false', 'decision draft doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(
  decisionDraftDoc,
  'does **not** run the final activation command',
  'decision draft doc',
);
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, decisionDraftFixturePath))) {
  fail(`missing structured decision draft fixture: ${decisionDraftFixturePath}`);
}
passAssertion('structured_decision_draft_fixture_present');

if (!fs.existsSync(path.join(root, completenessEvidenceFixturePath))) {
  fail(`missing completeness evidence fixture: ${completenessEvidenceFixturePath}`);
}
passAssertion('completeness_evidence_fixture_present');

if (!fs.existsSync(path.join(root, captureDraftFixturePath))) {
  fail(`missing capture draft fixture: ${captureDraftFixturePath}`);
}
passAssertion('capture_draft_fixture_present');

const decisionDraftFixture = readJson(decisionDraftFixturePath);
const completenessEvidenceFixture = readJson(completenessEvidenceFixturePath);
const captureDraftFixture = readJson(captureDraftFixturePath);

if (decisionDraftFixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('decision draft fixture source_of_truth_commit must be 816dfc2');
}
if (decisionDraftFixture.packet_status !== 'review_only') {
  fail('decision draft fixture packet_status must be review_only');
}
if (decisionDraftFixture.review_status !== 'approval_decision_draft_only') {
  fail('decision draft fixture review_status must be approval_decision_draft_only');
}
if (decisionDraftFixture.completeness_status !== 'incomplete') {
  fail('decision draft fixture completeness_status must be incomplete');
}
if (decisionDraftFixture.approval_status !== 'not_granted') {
  fail('decision draft fixture approval_status must be not_granted');
}
if (decisionDraftFixture.sandbox_test_mode_approval_status !== 'not_granted') {
  fail('decision draft fixture sandbox_test_mode_approval_status must be not_granted');
}
if (decisionDraftFixture.live_activation_approval_status !== 'not_granted') {
  fail('decision draft fixture live_activation_approval_status must be not_granted');
}
if (decisionDraftFixture.local_evidence_chain_status !== 'passed') {
  fail('decision draft fixture local_evidence_chain_status must be passed');
}
if (decisionDraftFixture.p1_polish_status !== 'completed') {
  fail('decision draft fixture p1_polish_status must be completed');
}
if (decisionDraftFixture.p2_refinement_status !== 'completed') {
  fail('decision draft fixture p2_refinement_status must be completed');
}
if (decisionDraftFixture.p3_planning_status !== 'completed') {
  fail('decision draft fixture p3_planning_status must be completed');
}
if (decisionDraftFixture.current_recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('decision draft fixture current_recommended_next_step mismatch');
}
if (decisionDraftFixture.p0_blockers_count !== 0) {
  fail('decision draft fixture p0_blockers_count must be 0');
}
if (decisionDraftFixture.exact_values_required_count !== 19) {
  fail('decision draft fixture exact_values_required_count must be 19');
}
if (decisionDraftFixture.exact_values_filled_count !== 0) {
  fail('decision draft fixture exact_values_filled_count must be 0');
}
if (decisionDraftFixture.all_exact_values_filled !== false) {
  fail('decision draft fixture all_exact_values_filled must be false');
}
if (decisionDraftFixture.blank_placeholders_are_not_approval !== true) {
  fail('decision draft fixture blank_placeholders_are_not_approval must be true');
}
if (decisionDraftFixture.all_approved_insufficient_without_exact_values !== true) {
  fail('decision draft fixture all_approved_insufficient_without_exact_values must be true');
}
if (decisionDraftFixture.evidence_review_does_not_equal_approval !== true) {
  fail('decision draft fixture evidence_review_does_not_equal_approval must be true');
}
if (decisionDraftFixture.decision_draft_does_not_equal_approval !== true) {
  fail('decision draft fixture decision_draft_does_not_equal_approval must be true');
}
if (decisionDraftFixture.sandbox_test_mode_approval_requires_separate_jason_approval !== true) {
  fail(
    'decision draft fixture sandbox_test_mode_approval_requires_separate_jason_approval must be true',
  );
}
if (decisionDraftFixture.live_activation_requires_separate_later_approval !== true) {
  fail('decision draft fixture live_activation_requires_separate_later_approval must be true');
}
if (decisionDraftFixture.reviewed_completeness_evidence_status !== 'incomplete') {
  fail('decision draft fixture reviewed_completeness_evidence_status must be incomplete');
}

const decisionDraft = decisionDraftFixture.jason_sandbox_test_mode_approval_decision_draft;
if (!decisionDraft || typeof decisionDraft !== 'object') {
  fail('decision draft fixture jason_sandbox_test_mode_approval_decision_draft missing');
}
if (!Array.isArray(decisionDraft.decision_options) || decisionDraft.decision_options.length !== 3) {
  fail('decision draft fixture decision_options must contain exactly 3 items');
}
const goOption = decisionDraft.decision_options.find((o) => o.option === 'GO');
const holdOption = decisionDraft.decision_options.find((o) => o.option === 'HOLD');
const noGoOption = decisionDraft.decision_options.find((o) => o.option === 'NO_GO');
if (!goOption || goOption.available !== false) {
  fail('decision draft fixture GO option must exist and be unavailable');
}
if (!holdOption || holdOption.available !== true || holdOption.default_selected !== true) {
  fail('decision draft fixture HOLD option must exist, be available, and be default selected');
}
if (!noGoOption || noGoOption.available !== true) {
  fail('decision draft fixture NO_GO option must exist and be available');
}
if (decisionDraft.default_decision !== 'HOLD') {
  fail('decision draft fixture default_decision must be HOLD');
}
if (decisionDraft.go_available !== false) {
  fail('decision draft fixture go_available must be false');
}
if (decisionDraft.go_unavailable_until_exact_values_complete !== true) {
  fail('decision draft fixture go_unavailable_until_exact_values_complete must be true');
}
if (decisionDraft.go_unavailable_until_separate_jason_approval !== true) {
  fail('decision draft fixture go_unavailable_until_separate_jason_approval must be true');
}
if (decisionDraft.jason_decision !== '') {
  fail('decision draft fixture jason_decision must be blank');
}
if (decisionDraft.jason_decision_date !== '') {
  fail('decision draft fixture jason_decision_date must be blank');
}
if (decisionDraft.jason_decision_notes !== '') {
  fail('decision draft fixture jason_decision_notes must be blank');
}

if (completenessEvidenceFixture.completeness_status !== 'incomplete') {
  fail('completeness evidence fixture completeness_status must be incomplete');
}
if (completenessEvidenceFixture.exact_values_filled_count !== 0) {
  fail('completeness evidence fixture exact_values_filled_count must be 0');
}
passAssertion('completeness_evidence_status_incomplete');

if (!captureDraftFixture.exact_values || typeof captureDraftFixture.exact_values !== 'object') {
  fail('capture draft fixture exact_values object missing');
}
for (const field of EXACT_VALUE_FIELDS) {
  if (!(field in captureDraftFixture.exact_values)) {
    fail(`capture draft fixture exact_values missing ${field}`);
  }
  if (captureDraftFixture.exact_values[field] !== '') {
    fail(`capture draft fixture exact_values.${field} must be blank`);
  }
}
passAssertion('capture_draft_all_19_exact_values_blank');

if (decisionDraftFixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('decision draft fixture command_execution_status must be not_run_by_this_packet');
}
if (decisionDraftFixture.approved_for_activation_now !== false) {
  fail('decision draft fixture approved_for_activation_now must be false');
}
if (
  !Array.isArray(decisionDraftFixture.approved_channels) ||
  decisionDraftFixture.approved_channels.length !== 0
) {
  fail('decision draft fixture approved_channels must be empty');
}
if (
  !Array.isArray(decisionDraftFixture.approved_external_services) ||
  decisionDraftFixture.approved_external_services.length !== 0
) {
  fail('decision draft fixture approved_external_services must be empty');
}
if (decisionDraftFixture.live_activation_allowed !== false) {
  fail('decision draft fixture live_activation_allowed must be false');
}
if (decisionDraftFixture.sandbox_test_mode_activation_allowed !== false) {
  fail('decision draft fixture sandbox_test_mode_activation_allowed must be false');
}
if (decisionDraftFixture.external_calls_allowed !== false) {
  fail('decision draft fixture external_calls_allowed must be false');
}
if (decisionDraftFixture.credentials_access_allowed !== false) {
  fail('decision draft fixture credentials_access_allowed must be false');
}
if (decisionDraftFixture.production_data_access_allowed !== false) {
  fail('decision draft fixture production_data_access_allowed must be false');
}
if (decisionDraftFixture.schema_auth_rls_security_changes_allowed !== false) {
  fail('decision draft fixture schema_auth_rls_security_changes_allowed must be false');
}
if (decisionDraftFixture.public_route_webhook_scheduler_cron_dispatcher_allowed !== false) {
  fail(
    'decision draft fixture public_route_webhook_scheduler_cron_dispatcher_allowed must be false',
  );
}
if (decisionDraftFixture.billing_payment_automation_allowed !== false) {
  fail('decision draft fixture billing_payment_automation_allowed must be false');
}
if (decisionDraftFixture.public_go_live_or_production_copy_changes_allowed !== false) {
  fail('decision draft fixture public_go_live_or_production_copy_changes_allowed must be false');
}
if (decisionDraftFixture.real_demo_sandbox_live_testing_allowed !== false) {
  fail('decision draft fixture real_demo_sandbox_live_testing_allowed must be false');
}
if (decisionDraftFixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('decision draft fixture safety_status mismatch');
}
if (
  decisionDraftFixture.old_90_day_plan_boundary !==
  'old 90-day plan cannot override current source-of-truth direction'
) {
  fail('decision draft fixture old_90_day_plan_boundary mismatch');
}
if (
  !Array.isArray(decisionDraftFixture.evidence_chain_commits) ||
  decisionDraftFixture.evidence_chain_commits.length !== 16
) {
  fail('decision draft fixture evidence_chain_commits must contain 16 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!decisionDraftFixture.evidence_chain_commits.includes(commit)) {
    fail(`decision draft fixture evidence_chain_commits missing ${commit}`);
  }
}
passAssertion('structured_decision_draft_fixture_valid_json');

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

mustHave(
  aggregate,
  'verify-native-workflow-fixture-sandbox-test-mode-approval-decision-draft-packet-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Sandbox/Test-Mode Approval Decision Draft Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, decisionDraftDocPath, 'verifier index');
mustHave(verifierIndex, decisionDraftFixturePath, 'verifier index');
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
mustHave(wrapper, 'approval decision draft packet', 'wrapper mode');
mustHave(wrapper, 'Blank placeholders are not approval', 'wrapper mode');
mustHave(wrapper, 'Default decision is HOLD', 'wrapper mode');
mustHave(wrapper, 'GO is unavailable', 'wrapper mode');
mustHave(wrapper, 'Decision draft does not equal approval', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(decisionDraftDoc, completenessEvidenceDocPath, 'decision draft doc');
mustHave(decisionDraftDoc, completenessEvidenceFixturePath, 'decision draft doc');
mustHave(decisionDraftDoc, completenessEvidenceVerifierPath, 'decision draft doc');
mustHave(decisionDraftDoc, completenessEvidenceWrapperPath, 'decision draft doc');
mustHave(decisionDraftDoc, captureDraftDocPath, 'decision draft doc');
mustHave(decisionDraftDoc, worksheetDocPath, 'decision draft doc');
mustHave(decisionDraftDoc, completenessReviewDocPath, 'decision draft doc');
mustHave(decisionDraftDoc, captureDraftFixturePath, 'decision draft doc');

if (REQUIRED_ASSERTIONS.length !== 86) {
  fail(`REQUIRED_ASSERTIONS must contain 86 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Sandbox/Test-Mode Approval Decision Draft Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);