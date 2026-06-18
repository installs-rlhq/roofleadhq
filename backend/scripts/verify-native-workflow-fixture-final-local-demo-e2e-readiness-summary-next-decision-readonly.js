#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const readinessSummaryDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FINAL_LOCAL_DEMO_E2E_READINESS_SUMMARY.md';
const nextDecisionDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FINAL_LOCAL_DEMO_E2E_NEXT_DECISION_PACKET.md';
const decisionFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/final-local-demo-e2e-next-decision.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-final-local-demo-e2e-readiness-summary-next-decision-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-final-local-demo-e2e-readiness-summary-next-decision-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const evidenceCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_RUN_EVIDENCE_CAPTURE.md';
const operatorGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_GO_NO_GO_EVIDENCE_GATE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = 'df388f4';
const PRIOR_COMMITS = ['17abae0', 'cf566ae', '728ad03', '401bfc7', 'edceb29', 'df388f4'];
const DEMO_ROOFER_NAME = 'Summit Peak Roofing Demo LLC';
const SCENARIO_REVIEW_DECISION = 'PASS LOCAL DEMO ROOFER SCENARIO REVIEW';
const EVIDENCE_CONCLUSION = 'PASS LOCAL DEMO ROOFER E2E EVIDENCE REPORT';
const OPERATOR_GATE_STATUS = 'PASS';
const EVIDENCE_CAPTURE_DECISION = 'PASS LOCAL DEMO E2E REVIEW';
const CURRENT_RECOMMENDED_DECISION = 'GO_CONTINUE_LOCAL_FAKE_DATA_DEMO_E2E_REFINEMENT_ONLY';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const REQUIRED_ASSERTIONS = [
  'readiness_summary_doc_present',
  'next_decision_doc_present',
  'readiness_summary_review_only_scope_present',
  'next_decision_review_only_scope_present',
  'structured_decision_fixture_present',
  'structured_decision_fixture_valid_json',
  'source_of_truth_commit_df388f4_referenced',
  'prior_commit_17abae0_referenced',
  'prior_commit_cf566ae_referenced',
  'prior_commit_728ad03_referenced',
  'prior_commit_401bfc7_referenced',
  'prior_commit_edceb29_referenced',
  'prior_commit_df388f4_referenced',
  'local_demo_e2e_evidence_status_passed',
  'demo_roofer_fake',
  'fake_leads_25',
  'e2e_scenarios_25',
  'expected_outcomes_25',
  'matched_outcomes_25',
  'missing_outcomes_0',
  'unexpected_outcomes_0',
  'scenario_review_pass_local_demo_roofer_scenario_review',
  'evidence_conclusion_pass_local_demo_roofer_e2e_evidence_report',
  'operator_gate_pass',
  'local_demo_e2e_evidence_capture_pass',
  'pre_run_pilot_readiness_demo_ready_with_live_automation_disabled',
  'post_run_pilot_readiness_demo_ready_with_live_automation_disabled',
  'pre_run_safe_readiness_fast_lane_pass_17_checks',
  'post_run_safe_readiness_fast_lane_pass_17_checks',
  'backend_build_pass',
  'pre_run_source_of_truth_pass',
  'post_run_source_of_truth_pass',
  'final_git_status_blank',
  'decision_option_go_continue_local_fake_data_demo_e2e_refinement_only_present',
  'decision_option_hold_for_review_present',
  'decision_option_no_go_keep_blocked_present',
  'decision_option_separate_future_approval_required_present',
  'current_recommended_decision_go_continue_local_fake_data_demo_e2e_refinement_only',
  'go_does_not_approve_activation',
  'hold_does_not_approve_activation',
  'no_go_keeps_blocked',
  'separate_future_approval_required_for_sandbox_or_live',
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
  'NATIVE_WORKFLOW_FIXTURE_FINAL_LOCAL_DEMO_E2E_READINESS_SUMMARY.md',
  'NATIVE_WORKFLOW_FIXTURE_FINAL_LOCAL_DEMO_E2E_NEXT_DECISION_PACKET.md',
  'run-native-workflow-fixture-final-local-demo-e2e-readiness-summary-next-decision-dry-run.sh',
  'verify-native-workflow-fixture-final-local-demo-e2e-readiness-summary-next-decision-readonly.js',
  'final-local-demo-e2e-next-decision.json',
  'Native Workflow Fixture Final Local Demo E2E Readiness Summary + Next Decision Packet',
  'native workflow fixture final local demo e2e readiness summary next decision',
  'final local demo e2e readiness summary next decision',
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

const readinessSummaryDoc = read(readinessSummaryDocPath);
const nextDecisionDoc = read(nextDecisionDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const evidenceCaptureDoc = read(evidenceCaptureDocPath);
const operatorGateDoc = read(operatorGateDocPath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);

passAssertion('readiness_summary_doc_present');
passAssertion('next_decision_doc_present');

mustHave(
  readinessSummaryDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only final readiness summary',
  'readiness summary doc',
);
passAssertion('readiness_summary_review_only_scope_present');

mustHave(
  nextDecisionDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only next decision packet',
  'next decision doc',
);
passAssertion('next_decision_review_only_scope_present');

mustHave(readinessSummaryDoc, SOURCE_OF_TRUTH_COMMIT, 'readiness summary doc');
mustHave(nextDecisionDoc, SOURCE_OF_TRUTH_COMMIT, 'next decision doc');
passAssertion('source_of_truth_commit_df388f4_referenced');

for (const commit of PRIOR_COMMITS) {
  mustHave(readinessSummaryDoc, commit, 'readiness summary doc');
  mustHave(nextDecisionDoc, commit, 'next decision doc');
}
passAssertion('prior_commit_17abae0_referenced');
passAssertion('prior_commit_cf566ae_referenced');
passAssertion('prior_commit_728ad03_referenced');
passAssertion('prior_commit_401bfc7_referenced');
passAssertion('prior_commit_edceb29_referenced');
passAssertion('prior_commit_df388f4_referenced');

mustHave(readinessSummaryDoc, 'local_demo_e2e_evidence_status | passed', 'readiness summary doc');
mustHave(nextDecisionDoc, 'local_demo_e2e_evidence_status | passed', 'next decision doc');
passAssertion('local_demo_e2e_evidence_status_passed');

mustHave(readinessSummaryDoc, DEMO_ROOFER_NAME, 'readiness summary doc');
mustHave(readinessSummaryDoc, 'demo_roofer_is_fake | true', 'readiness summary doc');
passAssertion('demo_roofer_fake');

mustHave(readinessSummaryDoc, 'fake_lead_count | 25', 'readiness summary doc');
passAssertion('fake_leads_25');

mustHave(readinessSummaryDoc, 'scenario_count | 25', 'readiness summary doc');
passAssertion('e2e_scenarios_25');

mustHave(readinessSummaryDoc, 'expected_outcome_count | 25', 'readiness summary doc');
passAssertion('expected_outcomes_25');

mustHave(readinessSummaryDoc, 'matched_outcome_count | 25', 'readiness summary doc');
passAssertion('matched_outcomes_25');

mustHave(readinessSummaryDoc, 'missing_outcome_count | 0', 'readiness summary doc');
passAssertion('missing_outcomes_0');

mustHave(readinessSummaryDoc, 'unexpected_outcome_count | 0', 'readiness summary doc');
passAssertion('unexpected_outcomes_0');

mustHave(readinessSummaryDoc, SCENARIO_REVIEW_DECISION, 'readiness summary doc');
passAssertion('scenario_review_pass_local_demo_roofer_scenario_review');

mustHave(readinessSummaryDoc, EVIDENCE_CONCLUSION, 'readiness summary doc');
passAssertion('evidence_conclusion_pass_local_demo_roofer_e2e_evidence_report');

mustHave(readinessSummaryDoc, 'operator_gate_status | PASS', 'readiness summary doc');
passAssertion('operator_gate_pass');

mustHave(readinessSummaryDoc, EVIDENCE_CAPTURE_DECISION, 'readiness summary doc');
mustHave(readinessSummaryDoc, 'local_demo_e2e_evidence_capture | PASS LOCAL DEMO E2E REVIEW', 'readiness summary doc');
passAssertion('local_demo_e2e_evidence_capture_pass');

mustHave(readinessSummaryDoc, 'pre_run_pilot_readiness | demo_ready_with_live_automation_disabled', 'readiness summary doc');
passAssertion('pre_run_pilot_readiness_demo_ready_with_live_automation_disabled');

mustHave(readinessSummaryDoc, 'post_run_pilot_readiness | demo_ready_with_live_automation_disabled', 'readiness summary doc');
passAssertion('post_run_pilot_readiness_demo_ready_with_live_automation_disabled');

mustHave(readinessSummaryDoc, 'pre_run_safe_readiness_fast_lane | PASS', 'readiness summary doc');
mustHave(readinessSummaryDoc, '17 checks', 'readiness summary doc');
passAssertion('pre_run_safe_readiness_fast_lane_pass_17_checks');

mustHave(readinessSummaryDoc, 'post_run_safe_readiness_fast_lane | PASS', 'readiness summary doc');
passAssertion('post_run_safe_readiness_fast_lane_pass_17_checks');

mustHave(readinessSummaryDoc, 'backend_build | PASS', 'readiness summary doc');
passAssertion('backend_build_pass');

mustHave(readinessSummaryDoc, 'pre_run_source_of_truth | PASS', 'readiness summary doc');
passAssertion('pre_run_source_of_truth_pass');

mustHave(readinessSummaryDoc, 'post_run_source_of_truth | PASS', 'readiness summary doc');
passAssertion('post_run_source_of_truth_pass');

mustHave(readinessSummaryDoc, 'final_git_status | blank', 'readiness summary doc');
passAssertion('final_git_status_blank');

mustHave(nextDecisionDoc, 'GO — continue local fake-data demo E2E refinement only', 'next decision doc');
mustHave(nextDecisionDoc, 'GO_CONTINUE_LOCAL_FAKE_DATA_DEMO_E2E_REFINEMENT_ONLY', 'next decision doc');
passAssertion('decision_option_go_continue_local_fake_data_demo_e2e_refinement_only_present');

mustHave(nextDecisionDoc, 'HOLD — pause for product/business/legal/compliance/operator review', 'next decision doc');
mustHave(nextDecisionDoc, 'HOLD_FOR_REVIEW', 'next decision doc');
passAssertion('decision_option_hold_for_review_present');

mustHave(nextDecisionDoc, 'NO-GO — keep all launch and external paths blocked', 'next decision doc');
mustHave(nextDecisionDoc, 'NO_GO_KEEP_BLOCKED', 'next decision doc');
passAssertion('decision_option_no_go_keep_blocked_present');

mustHave(
  nextDecisionDoc,
  'SEPARATE FUTURE APPROVAL REQUIRED — sandbox/test-mode or live activation planning',
  'next decision doc',
);
mustHave(
  nextDecisionDoc,
  'SEPARATE_FUTURE_APPROVAL_REQUIRED_FOR_SANDBOX_OR_LIVE',
  'next decision doc',
);
passAssertion('decision_option_separate_future_approval_required_present');

mustHave(nextDecisionDoc, CURRENT_RECOMMENDED_DECISION, 'next decision doc');
passAssertion('current_recommended_decision_go_continue_local_fake_data_demo_e2e_refinement_only');

mustHave(nextDecisionDoc, 'Does **not** approve activation', 'next decision doc');
mustHave(nextDecisionDoc, 'Does **not** approve live activation', 'next decision doc');
mustHave(nextDecisionDoc, 'Does **not** approve sandbox/test-mode activation', 'next decision doc');
passAssertion('go_does_not_approve_activation');
passAssertion('hold_does_not_approve_activation');

mustHave(nextDecisionDoc, 'All launch and external paths remain blocked', 'next decision doc');
passAssertion('no_go_keeps_blocked');

mustHave(
  nextDecisionDoc,
  'Separate future approval is required for sandbox/test-mode or live activation planning',
  'next decision doc',
);
mustHave(nextDecisionDoc, 'Not granted by this packet', 'next decision doc');
passAssertion('separate_future_approval_required_for_sandbox_or_live');

mustHave(nextDecisionDoc, 'activation_approval_status | not_granted', 'next decision doc');
passAssertion('activation_approval_status_not_granted');

mustHave(nextDecisionDoc, 'command_execution_status | not_run_by_this_packet', 'next decision doc');
passAssertion('command_execution_status_not_run_by_this_packet');

mustHave(nextDecisionDoc, 'approved_for_activation_now | false', 'next decision doc');
passAssertion('approved_for_activation_now_false');

mustHave(nextDecisionDoc, 'approved_channels | []', 'next decision doc');
passAssertion('approved_channels_empty');

mustHave(nextDecisionDoc, 'approved_external_services | []', 'next decision doc');
passAssertion('approved_external_services_empty');

mustHave(nextDecisionDoc, 'live_activation_allowed | false', 'next decision doc');
passAssertion('live_activation_allowed_false');

mustHave(nextDecisionDoc, 'sandbox_test_mode_activation_allowed | false', 'next decision doc');
passAssertion('sandbox_test_mode_activation_allowed_false');

mustHave(nextDecisionDoc, 'external_calls_allowed | false', 'next decision doc');
passAssertion('external_calls_allowed_false');

mustHave(nextDecisionDoc, 'credentials_access_allowed | false', 'next decision doc');
passAssertion('credentials_access_allowed_false');

mustHave(nextDecisionDoc, 'production_data_access_allowed | false', 'next decision doc');
passAssertion('production_data_access_allowed_false');

mustHave(nextDecisionDoc, 'schema_auth_rls_security_changes_allowed | false', 'next decision doc');
passAssertion('schema_auth_rls_security_changes_allowed_false');

mustHave(
  nextDecisionDoc,
  'public_route_webhook_scheduler_cron_dispatcher_allowed | false',
  'next decision doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_allowed_false');

mustHave(nextDecisionDoc, 'billing_payment_automation_allowed | false', 'next decision doc');
passAssertion('billing_payment_automation_allowed_false');

mustHave(
  readinessSummaryDoc,
  'old 90-day plan cannot override current source-of-truth direction',
  'readiness summary doc',
);
mustHave(
  nextDecisionDoc,
  'old 90-day plan cannot override current source-of-truth direction',
  'next decision doc',
);
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(nextDecisionDoc, 'sandbox/test-mode activation', 'next decision doc');
mustHave(nextDecisionDoc, 'billing/payment/deposit/invoice/quote/estimate automation', 'next decision doc');
mustHave(nextDecisionDoc, 'schedulers, cron, or dispatchers', 'next decision doc');
mustHave(nextDecisionDoc, 'Twilio', 'next decision doc');
mustHave(nextDecisionDoc, 'Vapi', 'next decision doc');
mustHave(nextDecisionDoc, 'Resend', 'next decision doc');
mustHave(nextDecisionDoc, 'Google Calendar', 'next decision doc');
mustHave(nextDecisionDoc, 'Lindy', 'next decision doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(readinessSummaryDoc, 'public_website_go_live_copy_changed | false', 'readiness summary doc');
mustHave(nextDecisionDoc, 'public_website_go_live_copy_changed | false', 'next decision doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(readinessSummaryDoc, 'does **not** run the final activation command', 'readiness summary doc');
mustHave(nextDecisionDoc, 'does **not** run the final activation command', 'next decision doc');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, decisionFixturePath))) {
  fail(`missing structured decision fixture: ${decisionFixturePath}`);
}
passAssertion('structured_decision_fixture_present');

const decisionFixture = readJson(decisionFixturePath);
if (decisionFixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('decision fixture source_of_truth_commit must be df388f4');
}
if (decisionFixture.packet_status !== 'review_only') {
  fail('decision fixture packet_status must be review_only');
}
if (decisionFixture.local_demo_e2e_evidence_status !== 'passed') {
  fail('decision fixture local_demo_e2e_evidence_status must be passed');
}
if (decisionFixture.current_recommended_decision !== CURRENT_RECOMMENDED_DECISION) {
  fail('decision fixture current_recommended_decision mismatch');
}
const allowedDecisions = [
  'GO_CONTINUE_LOCAL_FAKE_DATA_DEMO_E2E_REFINEMENT_ONLY',
  'HOLD_FOR_REVIEW',
  'NO_GO_KEEP_BLOCKED',
  'SEPARATE_FUTURE_APPROVAL_REQUIRED_FOR_SANDBOX_OR_LIVE',
];
if (JSON.stringify(decisionFixture.allowed_decisions) !== JSON.stringify(allowedDecisions)) {
  fail('decision fixture allowed_decisions mismatch');
}
if (decisionFixture.demo_roofer_name !== DEMO_ROOFER_NAME) {
  fail('decision fixture demo_roofer_name mismatch');
}
if (decisionFixture.demo_roofer_is_fake !== true) {
  fail('decision fixture demo_roofer_is_fake must be true');
}
if (decisionFixture.fake_lead_count !== 25) fail('decision fixture fake_lead_count must be 25');
if (decisionFixture.scenario_count !== 25) fail('decision fixture scenario_count must be 25');
if (decisionFixture.expected_outcome_count !== 25) {
  fail('decision fixture expected_outcome_count must be 25');
}
if (decisionFixture.matched_outcome_count !== 25) {
  fail('decision fixture matched_outcome_count must be 25');
}
if (decisionFixture.missing_outcome_count !== 0) {
  fail('decision fixture missing_outcome_count must be 0');
}
if (decisionFixture.unexpected_outcome_count !== 0) {
  fail('decision fixture unexpected_outcome_count must be 0');
}
if (decisionFixture.scenario_review_final_decision !== SCENARIO_REVIEW_DECISION) {
  fail('decision fixture scenario_review_final_decision mismatch');
}
if (decisionFixture.evidence_conclusion !== EVIDENCE_CONCLUSION) {
  fail('decision fixture evidence_conclusion mismatch');
}
if (decisionFixture.operator_gate_status !== OPERATOR_GATE_STATUS) {
  fail('decision fixture operator_gate_status must be PASS');
}
if (decisionFixture.local_demo_e2e_evidence_capture !== EVIDENCE_CAPTURE_DECISION) {
  fail('decision fixture local_demo_e2e_evidence_capture mismatch');
}
if (decisionFixture.pre_run_pilot_readiness !== 'demo_ready_with_live_automation_disabled') {
  fail('decision fixture pre_run_pilot_readiness mismatch');
}
if (decisionFixture.post_run_pilot_readiness !== 'demo_ready_with_live_automation_disabled') {
  fail('decision fixture post_run_pilot_readiness mismatch');
}
if (decisionFixture.pre_run_safe_readiness_fast_lane !== 'PASS') {
  fail('decision fixture pre_run_safe_readiness_fast_lane must be PASS');
}
if (decisionFixture.pre_run_safe_readiness_fast_lane_checks !== 17) {
  fail('decision fixture pre_run_safe_readiness_fast_lane_checks must be 17');
}
if (decisionFixture.post_run_safe_readiness_fast_lane !== 'PASS') {
  fail('decision fixture post_run_safe_readiness_fast_lane must be PASS');
}
if (decisionFixture.post_run_safe_readiness_fast_lane_checks !== 17) {
  fail('decision fixture post_run_safe_readiness_fast_lane_checks must be 17');
}
if (decisionFixture.backend_build !== 'PASS') {
  fail('decision fixture backend_build must be PASS');
}
if (decisionFixture.pre_run_source_of_truth !== 'PASS') {
  fail('decision fixture pre_run_source_of_truth must be PASS');
}
if (decisionFixture.post_run_source_of_truth !== 'PASS') {
  fail('decision fixture post_run_source_of_truth must be PASS');
}
if (decisionFixture.final_git_status !== 'blank') {
  fail('decision fixture final_git_status must be blank');
}
if (decisionFixture.activation_approval_status !== 'not_granted') {
  fail('decision fixture activation_approval_status must be not_granted');
}
if (decisionFixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('decision fixture command_execution_status must be not_run_by_this_packet');
}
if (decisionFixture.approved_for_activation_now !== false) {
  fail('decision fixture approved_for_activation_now must be false');
}
if (!Array.isArray(decisionFixture.approved_channels) || decisionFixture.approved_channels.length !== 0) {
  fail('decision fixture approved_channels must be empty');
}
if (
  !Array.isArray(decisionFixture.approved_external_services) ||
  decisionFixture.approved_external_services.length !== 0
) {
  fail('decision fixture approved_external_services must be empty');
}
if (decisionFixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('decision fixture safety_status mismatch');
}
if (decisionFixture.live_activation_allowed !== false) {
  fail('decision fixture live_activation_allowed must be false');
}
if (decisionFixture.sandbox_test_mode_activation_allowed !== false) {
  fail('decision fixture sandbox_test_mode_activation_allowed must be false');
}
if (decisionFixture.external_calls_allowed !== false) {
  fail('decision fixture external_calls_allowed must be false');
}
if (decisionFixture.credentials_access_allowed !== false) {
  fail('decision fixture credentials_access_allowed must be false');
}
if (decisionFixture.production_data_access_allowed !== false) {
  fail('decision fixture production_data_access_allowed must be false');
}
if (decisionFixture.schema_auth_rls_security_changes_allowed !== false) {
  fail('decision fixture schema_auth_rls_security_changes_allowed must be false');
}
if (decisionFixture.public_route_webhook_scheduler_cron_dispatcher_allowed !== false) {
  fail('decision fixture public_route_webhook_scheduler_cron_dispatcher_allowed must be false');
}
if (decisionFixture.billing_payment_automation_allowed !== false) {
  fail('decision fixture billing_payment_automation_allowed must be false');
}
if (
  decisionFixture.old_90_day_plan_boundary !==
  'old 90-day plan cannot override current source-of-truth direction'
) {
  fail('decision fixture old_90_day_plan_boundary mismatch');
}
passAssertion('structured_decision_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(readinessSummaryDoc, phrase, 'readiness summary doc forbidden language');
  mustNotHave(nextDecisionDoc, phrase, 'next decision doc forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(readinessSummaryDoc)) {
    fail(`unsafe pattern ${pattern} found in readiness summary doc`);
  }
  if (pattern.test(nextDecisionDoc)) fail(`unsafe pattern ${pattern} found in next decision doc`);
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
  'verify-native-workflow-fixture-final-local-demo-e2e-readiness-summary-next-decision-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Final Local Demo E2E Readiness Summary + Next Decision Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, readinessSummaryDocPath, 'verifier index');
mustHave(verifierIndex, nextDecisionDocPath, 'verifier index');
mustHave(verifierIndex, decisionFixturePath, 'verifier index');
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

mustHave(readinessSummaryDoc, evidenceCaptureDocPath, 'readiness summary doc');
mustHave(readinessSummaryDoc, operatorGateDocPath, 'readiness summary doc');
mustHave(readinessSummaryDoc, decisionFixturePath, 'readiness summary doc');
mustHave(nextDecisionDoc, readinessSummaryDocPath, 'next decision doc');
mustHave(nextDecisionDoc, decisionFixturePath, 'next decision doc');

for (const assertion of REQUIRED_ASSERTIONS) {
  if (!REQUIRED_ASSERTIONS.includes(assertion)) {
    fail(`unhandled assertion: ${assertion}`);
  }
}

console.log(
  `PASS: Native Workflow Fixture Final Local Demo E2E Readiness Summary + Next Decision Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);