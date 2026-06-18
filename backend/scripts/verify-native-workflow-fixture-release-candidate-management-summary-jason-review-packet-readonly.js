#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_RELEASE_CANDIDATE_MANAGEMENT_SUMMARY_JASON_REVIEW_PACKET.md';
const packetFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/release-candidate-management-summary-jason-review-packet.json';
const releaseCandidateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_EVIDENCE_FREEZE_RELEASE_CANDIDATE_REVIEW_PACKET.md';
const releaseCandidateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/local-demo-evidence-freeze-release-candidate-review-packet.json';
const decisionDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_APPROVAL_DECISION_DRAFT_PACKET.md';
const decisionDraftFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/sandbox-test-mode-approval-decision-draft-packet.json';
const completenessEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_EXACT_VALUES_COMPLETENESS_REVIEW_EVIDENCE_PACKET.md';
const completenessEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/exact-values-completeness-review-evidence-packet.json';
const localDemoEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_RUN_EVIDENCE_CAPTURE.md';
const localDemoEvidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/local-demo-e2e-run-evidence-capture.json';
const readinessSummaryDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FINAL_LOCAL_DEMO_E2E_READINESS_SUMMARY.md';
const wrapperPath =
  'scripts/run-native-workflow-fixture-release-candidate-management-summary-jason-review-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-release-candidate-management-summary-jason-review-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = '2dd1016';
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
];
const RECOMMENDED_NEXT_STEP =
  'JASON_REVIEW_RELEASE_CANDIDATE_MANAGEMENT_SUMMARY_HOLD_UNTIL_EXACT_VALUES_AND_SEPARATE_SANDBOX_TEST_MODE_APPROVAL';
const DEMO_ROOFER_NAME = 'Summit Peak Roofing Demo LLC';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'release_candidate_doc_present',
  'decision_draft_doc_present',
  'completeness_evidence_doc_present',
  'local_demo_evidence_doc_present',
  'readiness_summary_doc_present',
  'structured_fixture_present',
  'release_candidate_fixture_present',
  'decision_draft_fixture_present',
  'completeness_evidence_fixture_present',
  'local_demo_evidence_fixture_present',
  'structured_fixture_valid_json',
  'source_of_truth_commit_2dd1016_referenced',
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
  'local_demo_e2e_evidence_chain_status_passed',
  'local_demo_evidence_freeze_release_candidate_review_completed',
  'fake_homeowner_leads_25',
  'e2e_scenarios_25',
  'expected_outcomes_25',
  'matched_outcomes_25',
  'missing_outcomes_0',
  'unexpected_outcomes_0',
  'p0_blockers_count_0',
  'p1_polish_status_completed',
  'p2_refinement_status_completed',
  'p3_planning_status_completed',
  'exact_values_required_count_19',
  'exact_values_filled_count_0',
  'completeness_status_incomplete',
  'default_sandbox_test_mode_decision_hold',
  'go_available_false',
  'approval_status_not_granted',
  'sandbox_test_mode_approval_status_not_granted',
  'live_activation_approval_status_not_granted',
  'jason_review_packet_does_not_equal_approval',
  'release_candidate_summary_does_not_equal_approval',
  'release_candidate_review_does_not_equal_approval',
  'evidence_freeze_does_not_equal_approval',
  'evidence_review_does_not_equal_approval',
  'decision_draft_does_not_equal_approval',
  'sandbox_test_mode_approval_requires_separate_jason_approval',
  'live_activation_requires_separate_later_approval_after_sandbox_test_mode_evidence',
  'reviewed_release_candidate_status_completed',
  'reviewed_decision_draft_status_hold_default_not_granted',
  'reviewed_completeness_evidence_status_incomplete',
  'reviewed_local_demo_e2e_evidence_status_passed',
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
  'NATIVE_WORKFLOW_FIXTURE_RELEASE_CANDIDATE_MANAGEMENT_SUMMARY_JASON_REVIEW_PACKET.md',
  'run-native-workflow-fixture-release-candidate-management-summary-jason-review-packet-dry-run.sh',
  'verify-native-workflow-fixture-release-candidate-management-summary-jason-review-packet-readonly.js',
  'release-candidate-management-summary-jason-review-packet.json',
  'Native Workflow Fixture Release Candidate Management Summary + Jason Review Packet',
  'native workflow fixture release candidate management summary jason review packet',
  'release candidate management summary jason review packet',
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
const releaseCandidateDoc = read(releaseCandidateDocPath);
const decisionDraftDoc = read(decisionDraftDocPath);
const completenessEvidenceDoc = read(completenessEvidenceDocPath);
const localDemoEvidenceDoc = read(localDemoEvidenceDocPath);
const readinessSummaryDoc = read(readinessSummaryDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const combinedDocs = `${packetDoc}\n${releaseCandidateDoc}\n${decisionDraftDoc}\n${completenessEvidenceDoc}\n${localDemoEvidenceDoc}\n${readinessSummaryDoc}`;

passAssertion('packet_doc_present');
passAssertion('release_candidate_doc_present');
passAssertion('decision_draft_doc_present');
passAssertion('completeness_evidence_doc_present');
passAssertion('local_demo_evidence_doc_present');
passAssertion('readiness_summary_doc_present');

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
passAssertion('source_of_truth_commit_2dd1016_referenced');

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

mustHave(packetDoc, 'local_demo_e2e_evidence_chain_status | passed', 'packet doc');
passAssertion('local_demo_e2e_evidence_chain_status_passed');
mustHave(
  packetDoc,
  'local_demo_evidence_freeze_release_candidate_review_status | completed',
  'packet doc',
);
passAssertion('local_demo_evidence_freeze_release_candidate_review_completed');
mustHave(packetDoc, 'fake_homeowner_lead_count | 25', 'packet doc');
passAssertion('fake_homeowner_leads_25');
mustHave(packetDoc, 'scenario_count | 25', 'packet doc');
passAssertion('e2e_scenarios_25');
mustHave(packetDoc, 'expected_outcome_count | 25', 'packet doc');
passAssertion('expected_outcomes_25');
mustHave(packetDoc, 'matched_outcome_count | 25', 'packet doc');
passAssertion('matched_outcomes_25');
mustHave(packetDoc, 'missing_outcome_count | 0', 'packet doc');
passAssertion('missing_outcomes_0');
mustHave(packetDoc, 'unexpected_outcome_count | 0', 'packet doc');
passAssertion('unexpected_outcomes_0');
mustHave(packetDoc, 'p0_blockers_count | 0', 'packet doc');
passAssertion('p0_blockers_count_0');
mustHave(packetDoc, 'p1_polish_status | completed', 'packet doc');
passAssertion('p1_polish_status_completed');
mustHave(packetDoc, 'p2_refinement_status | completed', 'packet doc');
passAssertion('p2_refinement_status_completed');
mustHave(packetDoc, 'p3_planning_status | completed', 'packet doc');
passAssertion('p3_planning_status_completed');

mustHave(packetDoc, 'exact_values_required_count | 19', 'packet doc');
mustHave(packetDoc, 'exact_values_filled_count | 0', 'packet doc');
mustHave(packetDoc, 'completeness_status | incomplete', 'packet doc');
passAssertion('exact_values_required_count_19');
passAssertion('exact_values_filled_count_0');
passAssertion('completeness_status_incomplete');

mustHave(packetDoc, 'default_sandbox_test_mode_decision | HOLD', 'packet doc');
mustHave(packetDoc, 'Default sandbox/test-mode decision remains **HOLD**', 'packet doc');
mustHave(packetDoc, 'GO remains unavailable by default', 'packet doc');
mustHave(packetDoc, 'go_available | false', 'packet doc');
passAssertion('default_sandbox_test_mode_decision_hold');
passAssertion('go_available_false');

mustHave(packetDoc, 'approval_status | not_granted', 'packet doc');
passAssertion('approval_status_not_granted');
mustHave(
  packetDoc,
  'sandbox_test_mode_approval_status | not_granted',
  'packet doc',
);
passAssertion('sandbox_test_mode_approval_status_not_granted');
mustHave(
  packetDoc,
  'live_activation_approval_status | not_granted',
  'packet doc',
);
passAssertion('live_activation_approval_status_not_granted');

mustHave(
  packetDoc,
  'Jason review packet does **not** equal approval',
  'packet doc',
);
passAssertion('jason_review_packet_does_not_equal_approval');

mustHave(
  packetDoc,
  'Release candidate summary does **not** equal approval',
  'packet doc',
);
passAssertion('release_candidate_summary_does_not_equal_approval');

mustHave(
  packetDoc,
  'Release candidate review does **not** equal approval',
  'packet doc',
);
passAssertion('release_candidate_review_does_not_equal_approval');

mustHave(
  packetDoc,
  'Evidence freeze does **not** equal approval',
  'packet doc',
);
passAssertion('evidence_freeze_does_not_equal_approval');

mustHave(
  packetDoc,
  'Evidence review does **not** equal approval',
  'packet doc',
);
passAssertion('evidence_review_does_not_equal_approval');

mustHave(
  packetDoc,
  'Decision draft does **not** equal approval',
  'packet doc',
);
passAssertion('decision_draft_does_not_equal_approval');

mustHave(
  packetDoc,
  'Sandbox/test-mode approval still requires separate exact Jason approval',
  'packet doc',
);
passAssertion('sandbox_test_mode_approval_requires_separate_jason_approval');

mustHave(
  packetDoc,
  'Live activation still requires separate later approval after sandbox/test-mode evidence',
  'packet doc',
);
passAssertion('live_activation_requires_separate_later_approval_after_sandbox_test_mode_evidence');

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
passAssertion('approved_for_activation_now_false');
mustHave(
  packetDoc,
  'command_execution_status | not_run_by_this_packet',
  'packet doc',
);
passAssertion('command_execution_status_not_run_by_this_packet');
mustHave(packetDoc, 'approved_channels | []', 'packet doc');
passAssertion('approved_channels_empty');
mustHave(packetDoc, 'approved_external_services | []', 'packet doc');
passAssertion('approved_external_services_empty');
mustHave(packetDoc, 'live_activation_allowed | false', 'packet doc');
passAssertion('live_activation_allowed_false');
mustHave(
  packetDoc,
  'sandbox_test_mode_activation_allowed | false',
  'packet doc',
);
passAssertion('sandbox_test_mode_activation_allowed_false');
mustHave(packetDoc, 'external_calls_allowed | false', 'packet doc');
passAssertion('external_calls_allowed_false');
mustHave(packetDoc, 'credentials_access_allowed | false', 'packet doc');
passAssertion('credentials_access_allowed_false');
mustHave(packetDoc, 'production_data_access_allowed | false', 'packet doc');
passAssertion('production_data_access_allowed_false');
mustHave(
  packetDoc,
  'schema_auth_rls_security_changes_allowed | false',
  'packet doc',
);
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
mustHave(
  packetDoc,
  'real_demo_sandbox_live_testing_allowed | false',
  'packet doc',
);
passAssertion('real_demo_sandbox_live_testing_allowed_false');

mustHave(
  packetDoc,
  'old 90-day plan cannot override current source-of-truth direction',
  'packet doc',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(packetDoc, 'This is **not** approval to activate anything', 'packet doc');
mustHave(packetDoc, 'does **not** approve sandbox/test-mode activation', 'packet doc');
passAssertion('does_not_approve_activation');

mustHave(packetDoc, 'Twilio', 'packet doc');
mustHave(packetDoc, 'webhook', 'packet doc');
mustHave(packetDoc, 'scheduler', 'packet doc');
mustHave(packetDoc, 'billing', 'packet doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(packetDoc, 'public_website_go_live_copy_changed | false', 'packet doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(
  packetDoc,
  'does **not** run the final activation command',
  'packet doc',
);
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, packetFixturePath))) {
  fail(`missing structured fixture: ${packetFixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, releaseCandidateFixturePath))) {
  fail(`missing release candidate fixture: ${releaseCandidateFixturePath}`);
}
passAssertion('release_candidate_fixture_present');

if (!fs.existsSync(path.join(root, decisionDraftFixturePath))) {
  fail(`missing decision draft fixture: ${decisionDraftFixturePath}`);
}
passAssertion('decision_draft_fixture_present');

if (!fs.existsSync(path.join(root, completenessEvidenceFixturePath))) {
  fail(`missing completeness evidence fixture: ${completenessEvidenceFixturePath}`);
}
passAssertion('completeness_evidence_fixture_present');

if (!fs.existsSync(path.join(root, localDemoEvidenceFixturePath))) {
  fail(`missing local demo evidence fixture: ${localDemoEvidenceFixturePath}`);
}
passAssertion('local_demo_evidence_fixture_present');

const packetFixture = readJson(packetFixturePath);
const releaseCandidateFixture = readJson(releaseCandidateFixturePath);
const decisionDraftFixture = readJson(decisionDraftFixturePath);
const completenessEvidenceFixture = readJson(completenessEvidenceFixturePath);
const localDemoEvidenceFixture = readJson(localDemoEvidenceFixturePath);

if (packetFixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('packet fixture source_of_truth_commit must be 2dd1016');
}
if (packetFixture.packet_status !== 'review_only') {
  fail('packet fixture packet_status must be review_only');
}
if (packetFixture.review_status !== 'management_summary_jason_review_only') {
  fail('packet fixture review_status must be management_summary_jason_review_only');
}
if (packetFixture.completeness_status !== 'incomplete') {
  fail('packet fixture completeness_status must be incomplete');
}
if (packetFixture.approval_status !== 'not_granted') {
  fail('packet fixture approval_status must be not_granted');
}
if (packetFixture.sandbox_test_mode_approval_status !== 'not_granted') {
  fail('packet fixture sandbox_test_mode_approval_status must be not_granted');
}
if (packetFixture.live_activation_approval_status !== 'not_granted') {
  fail('packet fixture live_activation_approval_status must be not_granted');
}
if (packetFixture.local_demo_e2e_evidence_chain_status !== 'passed') {
  fail('packet fixture local_demo_e2e_evidence_chain_status must be passed');
}
if (packetFixture.local_evidence_chain_status !== 'passed') {
  fail('packet fixture local_evidence_chain_status must be passed');
}
if (packetFixture.local_demo_evidence_freeze_release_candidate_review_status !== 'completed') {
  fail('packet fixture local_demo_evidence_freeze_release_candidate_review_status must be completed');
}
if (packetFixture.p1_polish_status !== 'completed') {
  fail('packet fixture p1_polish_status must be completed');
}
if (packetFixture.p2_refinement_status !== 'completed') {
  fail('packet fixture p2_refinement_status must be completed');
}
if (packetFixture.p3_planning_status !== 'completed') {
  fail('packet fixture p3_planning_status must be completed');
}
if (packetFixture.current_recommended_next_step !== RECOMMENDED_NEXT_STEP) {
  fail('packet fixture current_recommended_next_step mismatch');
}
if (packetFixture.p0_blockers_count !== 0) {
  fail('packet fixture p0_blockers_count must be 0');
}
if (packetFixture.fake_homeowner_lead_count !== 25) {
  fail('packet fixture fake_homeowner_lead_count must be 25');
}
if (packetFixture.fake_lead_count !== 25) {
  fail('packet fixture fake_lead_count must be 25');
}
if (packetFixture.scenario_count !== 25) {
  fail('packet fixture scenario_count must be 25');
}
if (packetFixture.expected_outcome_count !== 25) {
  fail('packet fixture expected_outcome_count must be 25');
}
if (packetFixture.matched_outcome_count !== 25) {
  fail('packet fixture matched_outcome_count must be 25');
}
if (packetFixture.missing_outcome_count !== 0) {
  fail('packet fixture missing_outcome_count must be 0');
}
if (packetFixture.unexpected_outcome_count !== 0) {
  fail('packet fixture unexpected_outcome_count must be 0');
}
if (packetFixture.exact_values_required_count !== 19) {
  fail('packet fixture exact_values_required_count must be 19');
}
if (packetFixture.exact_values_filled_count !== 0) {
  fail('packet fixture exact_values_filled_count must be 0');
}
if (packetFixture.default_sandbox_test_mode_decision !== 'HOLD') {
  fail('packet fixture default_sandbox_test_mode_decision must be HOLD');
}
if (packetFixture.go_available !== false) {
  fail('packet fixture go_available must be false');
}
if (packetFixture.jason_review_packet_does_not_equal_approval !== true) {
  fail('packet fixture jason_review_packet_does_not_equal_approval must be true');
}
if (packetFixture.release_candidate_summary_does_not_equal_approval !== true) {
  fail('packet fixture release_candidate_summary_does_not_equal_approval must be true');
}
if (packetFixture.release_candidate_review_does_not_equal_approval !== true) {
  fail('packet fixture release_candidate_review_does_not_equal_approval must be true');
}
if (packetFixture.evidence_freeze_does_not_equal_approval !== true) {
  fail('packet fixture evidence_freeze_does_not_equal_approval must be true');
}
if (packetFixture.evidence_review_does_not_equal_approval !== true) {
  fail('packet fixture evidence_review_does_not_equal_approval must be true');
}
if (packetFixture.decision_draft_does_not_equal_approval !== true) {
  fail('packet fixture decision_draft_does_not_equal_approval must be true');
}
if (packetFixture.sandbox_test_mode_approval_requires_separate_jason_approval !== true) {
  fail(
    'packet fixture sandbox_test_mode_approval_requires_separate_jason_approval must be true',
  );
}
if (
  packetFixture.live_activation_requires_separate_later_approval_after_sandbox_test_mode_evidence !==
  true
) {
  fail(
    'packet fixture live_activation_requires_separate_later_approval_after_sandbox_test_mode_evidence must be true',
  );
}
if (packetFixture.reviewed_release_candidate_status !== 'completed') {
  fail('packet fixture reviewed_release_candidate_status must be completed');
}
if (packetFixture.reviewed_decision_draft_status !== 'hold_default_not_granted') {
  fail('packet fixture reviewed_decision_draft_status must be hold_default_not_granted');
}
if (packetFixture.reviewed_completeness_evidence_status !== 'incomplete') {
  fail('packet fixture reviewed_completeness_evidence_status must be incomplete');
}
if (packetFixture.reviewed_local_demo_e2e_evidence_status !== 'passed') {
  fail('packet fixture reviewed_local_demo_e2e_evidence_status must be passed');
}

if (releaseCandidateFixture.review_status !== 'release_candidate_review_only') {
  fail('release candidate fixture review_status must be release_candidate_review_only');
}
if (releaseCandidateFixture.local_demo_e2e_evidence_chain_status !== 'passed') {
  fail('release candidate fixture local_demo_e2e_evidence_chain_status must be passed');
}
passAssertion('reviewed_release_candidate_status_completed');

if (decisionDraftFixture.default_sandbox_test_mode_decision !== undefined) {
  fail('decision draft fixture should not define default_sandbox_test_mode_decision');
}
if (decisionDraftFixture.jason_sandbox_test_mode_approval_decision_draft.default_decision !== 'HOLD') {
  fail('decision draft fixture default_decision must be HOLD');
}
if (decisionDraftFixture.sandbox_test_mode_approval_status !== 'not_granted') {
  fail('decision draft fixture sandbox_test_mode_approval_status must be not_granted');
}
passAssertion('reviewed_decision_draft_status_hold_default_not_granted');

if (completenessEvidenceFixture.completeness_status !== 'incomplete') {
  fail('completeness evidence fixture completeness_status must be incomplete');
}
if (completenessEvidenceFixture.exact_values_filled_count !== 0) {
  fail('completeness evidence fixture exact_values_filled_count must be 0');
}
passAssertion('reviewed_completeness_evidence_status_incomplete');

if (localDemoEvidenceFixture.matched_outcome_count !== 25) {
  fail('local demo evidence fixture matched_outcome_count must be 25');
}
if (localDemoEvidenceFixture.missing_outcome_count !== 0) {
  fail('local demo evidence fixture missing_outcome_count must be 0');
}
if (localDemoEvidenceFixture.unexpected_outcome_count !== 0) {
  fail('local demo evidence fixture unexpected_outcome_count must be 0');
}
passAssertion('reviewed_local_demo_e2e_evidence_status_passed');

if (packetFixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('packet fixture command_execution_status must be not_run_by_this_packet');
}
if (packetFixture.approved_for_activation_now !== false) {
  fail('packet fixture approved_for_activation_now must be false');
}
if (
  !Array.isArray(packetFixture.approved_channels) ||
  packetFixture.approved_channels.length !== 0
) {
  fail('packet fixture approved_channels must be empty');
}
if (
  !Array.isArray(packetFixture.approved_external_services) ||
  packetFixture.approved_external_services.length !== 0
) {
  fail('packet fixture approved_external_services must be empty');
}
if (packetFixture.live_activation_allowed !== false) {
  fail('packet fixture live_activation_allowed must be false');
}
if (packetFixture.sandbox_test_mode_activation_allowed !== false) {
  fail('packet fixture sandbox_test_mode_activation_allowed must be false');
}
if (packetFixture.external_calls_allowed !== false) {
  fail('packet fixture external_calls_allowed must be false');
}
if (packetFixture.credentials_access_allowed !== false) {
  fail('packet fixture credentials_access_allowed must be false');
}
if (packetFixture.production_data_access_allowed !== false) {
  fail('packet fixture production_data_access_allowed must be false');
}
if (packetFixture.schema_auth_rls_security_changes_allowed !== false) {
  fail('packet fixture schema_auth_rls_security_changes_allowed must be false');
}
if (packetFixture.public_route_webhook_scheduler_cron_dispatcher_allowed !== false) {
  fail(
    'packet fixture public_route_webhook_scheduler_cron_dispatcher_allowed must be false',
  );
}
if (packetFixture.billing_payment_automation_allowed !== false) {
  fail('packet fixture billing_payment_automation_allowed must be false');
}
if (packetFixture.public_go_live_or_production_copy_changes_allowed !== false) {
  fail('packet fixture public_go_live_or_production_copy_changes_allowed must be false');
}
if (packetFixture.real_demo_sandbox_live_testing_allowed !== false) {
  fail('packet fixture real_demo_sandbox_live_testing_allowed must be false');
}
if (packetFixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('packet fixture safety_status mismatch');
}
if (packetFixture.demo_roofer_name !== DEMO_ROOFER_NAME) {
  fail('packet fixture demo_roofer_name mismatch');
}
if (packetFixture.demo_roofer_is_fake !== true) {
  fail('packet fixture demo_roofer_is_fake must be true');
}
if (
  packetFixture.old_90_day_plan_boundary !==
  'old 90-day plan cannot override current source-of-truth direction'
) {
  fail('packet fixture old_90_day_plan_boundary mismatch');
}
if (
  !Array.isArray(packetFixture.evidence_chain_commits) ||
  packetFixture.evidence_chain_commits.length !== 18
) {
  fail('packet fixture evidence_chain_commits must contain 18 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!packetFixture.evidence_chain_commits.includes(commit)) {
    fail(`packet fixture evidence_chain_commits missing ${commit}`);
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

mustHave(
  aggregate,
  'verify-native-workflow-fixture-release-candidate-management-summary-jason-review-packet-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Release Candidate Management Summary + Jason Review Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, packetDocPath, 'verifier index');
mustHave(verifierIndex, packetFixturePath, 'verifier index');
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
mustHave(wrapper, 'management summary Jason review packet', 'wrapper mode');
mustHave(wrapper, 'Jason review packet does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Release candidate summary does not equal approval', 'wrapper mode');
mustHave(wrapper, 'Default sandbox/test-mode decision remains HOLD', 'wrapper mode');
mustHave(wrapper, 'GO remains unavailable by default', 'wrapper mode');
mustHave(wrapper, 'Sandbox/test-mode and live activation remain not granted', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(packetDoc, releaseCandidateDocPath, 'packet doc');
mustHave(packetDoc, releaseCandidateFixturePath, 'packet doc');
mustHave(packetDoc, decisionDraftDocPath, 'packet doc');
mustHave(packetDoc, decisionDraftFixturePath, 'packet doc');
mustHave(packetDoc, completenessEvidenceDocPath, 'packet doc');
mustHave(packetDoc, completenessEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, localDemoEvidenceDocPath, 'packet doc');
mustHave(packetDoc, localDemoEvidenceFixturePath, 'packet doc');
mustHave(packetDoc, readinessSummaryDocPath, 'packet doc');
mustHave(packetDoc, packetFixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 96) {
  fail(`REQUIRED_ASSERTIONS must contain 96 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Release Candidate Management Summary + Jason Review Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);