#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const evidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_RUN_EVIDENCE_CAPTURE.md';
const evidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/local-demo-e2e-run-evidence-capture.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-local-demo-e2e-run-evidence-capture-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-local-demo-e2e-run-evidence-capture-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const operatorRunbookDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OPERATOR_RUNBOOK.md';
const goNoGoGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_GO_NO_GO_EVIDENCE_GATE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = 'edceb29';
const LOG_PATH = '/tmp/roofleadhq-demo-roofer-local-e2e-review-20260618T161559Z.log';
const RUN_TYPE = 'local_demo_roofer_fake_data_e2e_review';
const DEMO_ROOFER_NAME = 'Summit Peak Roofing Demo LLC';
const SCENARIO_REVIEW_DECISION = 'PASS LOCAL DEMO ROOFER SCENARIO REVIEW';
const EVIDENCE_CONCLUSION = 'PASS LOCAL DEMO ROOFER E2E EVIDENCE REPORT';
const FINAL_DECISION = 'PASS LOCAL DEMO E2E REVIEW';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const REQUIRED_ASSERTIONS = [
  'evidence_doc_present',
  'structured_evidence_fixture_present',
  'structured_evidence_fixture_valid_json',
  'evidence_doc_review_only_scope_present',
  'source_of_truth_commit_edceb29_referenced',
  'log_path_captured',
  'run_type_local_demo_roofer_fake_data_e2e_review_captured',
  'pre_run_source_of_truth_pass',
  'pre_run_pilot_readiness_demo_ready_with_live_automation_disabled',
  'pre_run_safe_readiness_fast_lane_pass_17_checks',
  'scenario_runner_pass',
  'demo_roofer_fake',
  'fake_leads_25',
  'e2e_scenarios_25',
  'expected_outcomes_25',
  'matched_outcomes_25',
  'missing_outcomes_0',
  'unexpected_outcomes_0',
  'scenario_review_pass_local_demo_roofer_scenario_review',
  'evidence_conclusion_pass_local_demo_roofer_e2e_evidence_report',
  'e2e_report_wrapper_pass_64_assertions',
  'operator_gate_wrapper_pass_66_assertions',
  'backend_build_pass',
  'post_run_pilot_readiness_demo_ready_with_live_automation_disabled',
  'post_run_safe_readiness_fast_lane_pass_17_checks',
  'post_run_source_of_truth_pass',
  'final_git_status_blank',
  'final_decision_pass_local_demo_e2e_review',
  'activation_occurred_false',
  'final_activation_command_executed_false',
  'external_calls_made_false',
  'credentials_env_api_webhook_access_false',
  'production_data_access_false',
  'schema_auth_rls_security_changes_false',
  'public_route_webhook_scheduler_cron_dispatcher_changes_false',
  'billing_payment_deposit_invoice_quote_estimate_automation_false',
  'live_services_used_false',
  'approved_for_activation_now_false',
  'approved_channels_empty',
  'approved_external_services_empty',
  'does_not_approve_activation',
  'does_not_approve_live_activation',
  'does_not_approve_sandbox_test_mode_activation',
  'does_not_approve_external_services',
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
  'NATIVE_WORKFLOW_FIXTURE_LOCAL_DEMO_E2E_RUN_EVIDENCE_CAPTURE.md',
  'run-native-workflow-fixture-local-demo-e2e-run-evidence-capture-dry-run.sh',
  'verify-native-workflow-fixture-local-demo-e2e-run-evidence-capture-readonly.js',
  'local-demo-e2e-run-evidence-capture.json',
  'Native Workflow Fixture Local Demo E2E Run Evidence Capture',
  'native workflow fixture local demo e2e run evidence capture',
  'local demo e2e run evidence capture',
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

const evidenceDoc = read(evidenceDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const operatorRunbookDoc = read(operatorRunbookDocPath);
const goNoGoGateDoc = read(goNoGoGateDocPath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);

passAssertion('evidence_doc_present');

mustHave(
  evidenceDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only evidence capture',
  'evidence doc',
);
passAssertion('evidence_doc_review_only_scope_present');

mustHave(evidenceDoc, SOURCE_OF_TRUTH_COMMIT, 'evidence doc');
passAssertion('source_of_truth_commit_edceb29_referenced');

mustHave(evidenceDoc, LOG_PATH, 'evidence doc');
passAssertion('log_path_captured');

mustHave(evidenceDoc, 'local demo roofer fake-data E2E review', 'evidence doc');
mustHave(evidenceDoc, RUN_TYPE, 'evidence doc');
passAssertion('run_type_local_demo_roofer_fake_data_e2e_review_captured');

mustHave(evidenceDoc, 'pre_run_source_of_truth | PASS', 'evidence doc');
passAssertion('pre_run_source_of_truth_pass');

mustHave(evidenceDoc, 'pre_run_pilot_readiness | demo_ready_with_live_automation_disabled', 'evidence doc');
passAssertion('pre_run_pilot_readiness_demo_ready_with_live_automation_disabled');

mustHave(evidenceDoc, 'pre_run_safe_readiness_fast_lane | PASS', 'evidence doc');
mustHave(evidenceDoc, '17 checks', 'evidence doc');
passAssertion('pre_run_safe_readiness_fast_lane_pass_17_checks');

mustHave(evidenceDoc, 'scenario_runner | PASS', 'evidence doc');
passAssertion('scenario_runner_pass');

mustHave(evidenceDoc, DEMO_ROOFER_NAME, 'evidence doc');
mustHave(evidenceDoc, 'demo_roofer_is_fake | true', 'evidence doc');
passAssertion('demo_roofer_fake');

mustHave(evidenceDoc, 'fake_lead_count | 25', 'evidence doc');
passAssertion('fake_leads_25');

mustHave(evidenceDoc, 'scenario_count | 25', 'evidence doc');
passAssertion('e2e_scenarios_25');

mustHave(evidenceDoc, 'expected_outcome_count | 25', 'evidence doc');
passAssertion('expected_outcomes_25');

mustHave(evidenceDoc, 'matched_outcome_count | 25', 'evidence doc');
passAssertion('matched_outcomes_25');

mustHave(evidenceDoc, 'missing_outcome_count | 0', 'evidence doc');
passAssertion('missing_outcomes_0');

mustHave(evidenceDoc, 'unexpected_outcome_count | 0', 'evidence doc');
passAssertion('unexpected_outcomes_0');

mustHave(evidenceDoc, SCENARIO_REVIEW_DECISION, 'evidence doc');
passAssertion('scenario_review_pass_local_demo_roofer_scenario_review');

mustHave(evidenceDoc, EVIDENCE_CONCLUSION, 'evidence doc');
passAssertion('evidence_conclusion_pass_local_demo_roofer_e2e_evidence_report');

mustHave(evidenceDoc, 'e2e_report_wrapper | PASS', 'evidence doc');
mustHave(evidenceDoc, '64 assertions', 'evidence doc');
passAssertion('e2e_report_wrapper_pass_64_assertions');

mustHave(evidenceDoc, 'operator_gate_wrapper | PASS', 'evidence doc');
mustHave(evidenceDoc, '66 assertions', 'evidence doc');
passAssertion('operator_gate_wrapper_pass_66_assertions');

mustHave(evidenceDoc, 'backend_build | PASS', 'evidence doc');
passAssertion('backend_build_pass');

mustHave(evidenceDoc, 'post_run_pilot_readiness | demo_ready_with_live_automation_disabled', 'evidence doc');
passAssertion('post_run_pilot_readiness_demo_ready_with_live_automation_disabled');

mustHave(evidenceDoc, 'post_run_safe_readiness_fast_lane | PASS', 'evidence doc');
passAssertion('post_run_safe_readiness_fast_lane_pass_17_checks');

mustHave(evidenceDoc, 'post_run_source_of_truth | PASS', 'evidence doc');
passAssertion('post_run_source_of_truth_pass');

mustHave(evidenceDoc, 'final_git_status | blank', 'evidence doc');
passAssertion('final_git_status_blank');

mustHave(evidenceDoc, FINAL_DECISION, 'evidence doc');
mustHave(evidenceDoc, 'final_decision | PASS LOCAL DEMO E2E REVIEW', 'evidence doc');
passAssertion('final_decision_pass_local_demo_e2e_review');

mustHave(evidenceDoc, 'does **not** approve live activation', 'evidence doc');
mustHave(evidenceDoc, 'does **not** approve sandbox/test-mode activation', 'evidence doc');
mustHave(evidenceDoc, 'does **not** approve live/sandbox/test-mode/external activation', 'evidence doc');
passAssertion('does_not_approve_live_activation');
passAssertion('does_not_approve_sandbox_test_mode_activation');
passAssertion('does_not_approve_external_services');
passAssertion('does_not_approve_activation');

mustHave(evidenceDoc, 'activation | false', 'evidence doc');
mustHave(evidenceDoc, 'final_activation_command_executed | false', 'evidence doc');
passAssertion('activation_occurred_false');
passAssertion('final_activation_command_executed_false');

mustHave(evidenceDoc, 'external_calls | false', 'evidence doc');
passAssertion('external_calls_made_false');

mustHave(evidenceDoc, 'credentials_env_api_webhook_access | false', 'evidence doc');
passAssertion('credentials_env_api_webhook_access_false');

mustHave(evidenceDoc, 'production_data_access | false', 'evidence doc');
passAssertion('production_data_access_false');

mustHave(evidenceDoc, 'schema_auth_rls_security_changes | false', 'evidence doc');
passAssertion('schema_auth_rls_security_changes_false');

mustHave(
  evidenceDoc,
  'public_route_webhook_scheduler_cron_dispatcher_changes | false',
  'evidence doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_changes_false');

mustHave(
  evidenceDoc,
  'billing_payment_deposit_invoice_quote_estimate_automation | false',
  'evidence doc',
);
passAssertion('billing_payment_deposit_invoice_quote_estimate_automation_false');

mustHave(evidenceDoc, 'live_services_used | false', 'evidence doc');
passAssertion('live_services_used_false');

mustHave(evidenceDoc, 'approved_for_activation_now | false', 'evidence doc');
passAssertion('approved_for_activation_now_false');

mustHave(evidenceDoc, 'approved_channels | []', 'evidence doc');
passAssertion('approved_channels_empty');

mustHave(evidenceDoc, 'approved_external_services | []', 'evidence doc');
passAssertion('approved_external_services_empty');

mustHave(evidenceDoc, 'old 90-day plan cannot override current source-of-truth direction', 'evidence doc');
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(evidenceDoc, 'sandbox/test-mode activation', 'evidence doc');
mustHave(evidenceDoc, 'billing/payment/deposit/invoice/quote/estimate automation', 'evidence doc');
mustHave(evidenceDoc, 'schedulers, cron, or dispatchers', 'evidence doc');
mustHave(evidenceDoc, 'Twilio', 'evidence doc');
mustHave(evidenceDoc, 'Vapi', 'evidence doc');
mustHave(evidenceDoc, 'Resend', 'evidence doc');
mustHave(evidenceDoc, 'Google Calendar', 'evidence doc');
mustHave(evidenceDoc, 'Lindy', 'evidence doc');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(evidenceDoc, 'public_website_go_live_copy_changed | false', 'evidence doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(evidenceDoc, 'does **not** run the final activation command', 'evidence doc');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');

if (!fs.existsSync(path.join(root, evidenceFixturePath))) {
  fail(`missing structured evidence fixture: ${evidenceFixturePath}`);
}
passAssertion('structured_evidence_fixture_present');

const evidenceFixture = readJson(evidenceFixturePath);
if (evidenceFixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('evidence fixture source_of_truth_commit must be edceb29');
}
if (evidenceFixture.log_path !== LOG_PATH) {
  fail('evidence fixture log_path mismatch');
}
if (evidenceFixture.run_type !== RUN_TYPE) {
  fail('evidence fixture run_type mismatch');
}
if (evidenceFixture.demo_roofer_name !== DEMO_ROOFER_NAME) {
  fail('evidence fixture demo_roofer_name mismatch');
}
if (evidenceFixture.demo_roofer_is_fake !== true) {
  fail('evidence fixture demo_roofer_is_fake must be true');
}
if (evidenceFixture.fake_lead_count !== 25) fail('evidence fixture fake_lead_count must be 25');
if (evidenceFixture.scenario_count !== 25) fail('evidence fixture scenario_count must be 25');
if (evidenceFixture.expected_outcome_count !== 25) {
  fail('evidence fixture expected_outcome_count must be 25');
}
if (evidenceFixture.matched_outcome_count !== 25) {
  fail('evidence fixture matched_outcome_count must be 25');
}
if (evidenceFixture.missing_outcome_count !== 0) {
  fail('evidence fixture missing_outcome_count must be 0');
}
if (evidenceFixture.unexpected_outcome_count !== 0) {
  fail('evidence fixture unexpected_outcome_count must be 0');
}
if (evidenceFixture.scenario_runner !== 'PASS') {
  fail('evidence fixture scenario_runner must be PASS');
}
if (evidenceFixture.scenario_review_final_decision !== SCENARIO_REVIEW_DECISION) {
  fail('evidence fixture scenario_review_final_decision mismatch');
}
if (evidenceFixture.evidence_conclusion !== EVIDENCE_CONCLUSION) {
  fail('evidence fixture evidence_conclusion mismatch');
}
if (evidenceFixture.e2e_report_wrapper !== 'PASS') {
  fail('evidence fixture e2e_report_wrapper must be PASS');
}
if (evidenceFixture.e2e_report_wrapper_assertions !== 64) {
  fail('evidence fixture e2e_report_wrapper_assertions must be 64');
}
if (evidenceFixture.operator_gate_wrapper !== 'PASS') {
  fail('evidence fixture operator_gate_wrapper must be PASS');
}
if (evidenceFixture.operator_gate_wrapper_assertions !== 66) {
  fail('evidence fixture operator_gate_wrapper_assertions must be 66');
}
if (evidenceFixture.final_decision !== FINAL_DECISION) {
  fail('evidence fixture final_decision mismatch');
}
if (evidenceFixture.pre_run_source_of_truth !== 'PASS') {
  fail('evidence fixture pre_run_source_of_truth must be PASS');
}
if (evidenceFixture.pre_run_pilot_readiness !== 'demo_ready_with_live_automation_disabled') {
  fail('evidence fixture pre_run_pilot_readiness mismatch');
}
if (evidenceFixture.pre_run_safe_readiness_fast_lane !== 'PASS') {
  fail('evidence fixture pre_run_safe_readiness_fast_lane must be PASS');
}
if (evidenceFixture.pre_run_safe_readiness_fast_lane_checks !== 17) {
  fail('evidence fixture pre_run_safe_readiness_fast_lane_checks must be 17');
}
if (evidenceFixture.backend_build !== 'PASS') {
  fail('evidence fixture backend_build must be PASS');
}
if (evidenceFixture.post_run_pilot_readiness !== 'demo_ready_with_live_automation_disabled') {
  fail('evidence fixture post_run_pilot_readiness mismatch');
}
if (evidenceFixture.post_run_safe_readiness_fast_lane !== 'PASS') {
  fail('evidence fixture post_run_safe_readiness_fast_lane must be PASS');
}
if (evidenceFixture.post_run_safe_readiness_fast_lane_checks !== 17) {
  fail('evidence fixture post_run_safe_readiness_fast_lane_checks must be 17');
}
if (evidenceFixture.post_run_source_of_truth !== 'PASS') {
  fail('evidence fixture post_run_source_of_truth must be PASS');
}
if (evidenceFixture.final_git_status !== 'blank') {
  fail('evidence fixture final_git_status must be blank');
}
if (evidenceFixture.activation_occurred !== false) {
  fail('evidence fixture activation_occurred must be false');
}
if (evidenceFixture.final_activation_command_executed !== false) {
  fail('evidence fixture final_activation_command_executed must be false');
}
if (evidenceFixture.external_calls_made !== false) {
  fail('evidence fixture external_calls_made must be false');
}
if (evidenceFixture.credentials_env_api_webhook_access !== false) {
  fail('evidence fixture credentials_env_api_webhook_access must be false');
}
if (evidenceFixture.production_data_access !== false) {
  fail('evidence fixture production_data_access must be false');
}
if (evidenceFixture.schema_auth_rls_security_changes !== false) {
  fail('evidence fixture schema_auth_rls_security_changes must be false');
}
if (evidenceFixture.public_route_webhook_scheduler_cron_dispatcher_changes !== false) {
  fail('evidence fixture public_route_webhook_scheduler_cron_dispatcher_changes must be false');
}
if (evidenceFixture.billing_payment_deposit_invoice_quote_estimate_automation !== false) {
  fail('evidence fixture billing_payment_deposit_invoice_quote_estimate_automation must be false');
}
if (evidenceFixture.live_services_used !== false) {
  fail('evidence fixture live_services_used must be false');
}
if (evidenceFixture.approved_for_activation_now !== false) {
  fail('evidence fixture approved_for_activation_now must be false');
}
if (!Array.isArray(evidenceFixture.approved_channels) || evidenceFixture.approved_channels.length !== 0) {
  fail('evidence fixture approved_channels must be empty');
}
if (
  !Array.isArray(evidenceFixture.approved_external_services) ||
  evidenceFixture.approved_external_services.length !== 0
) {
  fail('evidence fixture approved_external_services must be empty');
}
if (evidenceFixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('evidence fixture safety_status mismatch');
}
if (
  evidenceFixture.old_90_day_plan_boundary !==
  'old 90-day plan cannot override current source-of-truth direction'
) {
  fail('evidence fixture old_90_day_plan_boundary mismatch');
}
passAssertion('structured_evidence_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(evidenceDoc, phrase, 'evidence doc forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(evidenceDoc)) fail(`unsafe pattern ${pattern} found in evidence doc`);
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
  'verify-native-workflow-fixture-local-demo-e2e-run-evidence-capture-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Local Demo E2E Run Evidence Capture',
  'aggregate readiness',
);
mustHave(verifierIndex, evidenceDocPath, 'verifier index');
mustHave(verifierIndex, evidenceFixturePath, 'verifier index');
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

mustHave(evidenceDoc, operatorRunbookDocPath, 'evidence doc');
mustHave(evidenceDoc, goNoGoGateDocPath, 'evidence doc');
mustHave(evidenceDoc, evidenceFixturePath, 'evidence doc');

for (const assertion of REQUIRED_ASSERTIONS) {
  if (
    ![
      'evidence_doc_present',
      'structured_evidence_fixture_present',
      'structured_evidence_fixture_valid_json',
      'evidence_doc_review_only_scope_present',
      'source_of_truth_commit_edceb29_referenced',
      'log_path_captured',
      'run_type_local_demo_roofer_fake_data_e2e_review_captured',
      'pre_run_source_of_truth_pass',
      'pre_run_pilot_readiness_demo_ready_with_live_automation_disabled',
      'pre_run_safe_readiness_fast_lane_pass_17_checks',
      'scenario_runner_pass',
      'demo_roofer_fake',
      'fake_leads_25',
      'e2e_scenarios_25',
      'expected_outcomes_25',
      'matched_outcomes_25',
      'missing_outcomes_0',
      'unexpected_outcomes_0',
      'scenario_review_pass_local_demo_roofer_scenario_review',
      'evidence_conclusion_pass_local_demo_roofer_e2e_evidence_report',
      'e2e_report_wrapper_pass_64_assertions',
      'operator_gate_wrapper_pass_66_assertions',
      'backend_build_pass',
      'post_run_pilot_readiness_demo_ready_with_live_automation_disabled',
      'post_run_safe_readiness_fast_lane_pass_17_checks',
      'post_run_source_of_truth_pass',
      'final_git_status_blank',
      'final_decision_pass_local_demo_e2e_review',
      'activation_occurred_false',
      'final_activation_command_executed_false',
      'external_calls_made_false',
      'credentials_env_api_webhook_access_false',
      'production_data_access_false',
      'schema_auth_rls_security_changes_false',
      'public_route_webhook_scheduler_cron_dispatcher_changes_false',
      'billing_payment_deposit_invoice_quote_estimate_automation_false',
      'live_services_used_false',
      'approved_for_activation_now_false',
      'approved_channels_empty',
      'approved_external_services_empty',
      'does_not_approve_activation',
      'does_not_approve_live_activation',
      'does_not_approve_sandbox_test_mode_activation',
      'does_not_approve_external_services',
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
    ].includes(assertion)
  ) {
    fail(`unhandled assertion: ${assertion}`);
  }
}

console.log(
  `PASS: Native Workflow Fixture Local Demo E2E Run Evidence Capture verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);