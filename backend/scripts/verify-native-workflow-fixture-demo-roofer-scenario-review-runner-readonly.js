#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_SCENARIO_REVIEW_RUNNER.md';
const wrapperPath =
  'scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner-dry-run.sh';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-demo-roofer-scenario-review-runner-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const postRunEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_LOCAL_DRY_RUN_POST_RUN_EVIDENCE.md';
const demoE2eReadinessDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_E2E_EXECUTION_READINESS_PACKET.md';
const demoRooferBundleDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_TEST_BUNDLE.md';
const postRunReviewTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';
const expectedSummaryFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/demo-scenario-review-expected-summary.json';

const fixtureDir = 'backend/fixtures/native-workflow-demo-roofer';
const fixtureFiles = {
  profile: `${fixtureDir}/demo-roofer-profile.json`,
  leads: `${fixtureDir}/demo-homeowner-leads.json`,
  scenarios: `${fixtureDir}/demo-e2e-scenarios.json`,
  outcomes: `${fixtureDir}/demo-expected-outcomes.json`,
  checklist: `${fixtureDir}/demo-operator-checklist.json`,
  evidence: `${fixtureDir}/post-run-evidence-capture.json`,
  expectedSummary: expectedSummaryFixturePath,
};

const SOURCE_OF_TRUTH_COMMIT = 'cf566ae';
const DEMO_ROOFER_BUNDLE_COMMIT = '17abae0';
const FAKE_COMPANY_NAME = 'Summit Peak Roofing Demo LLC';
const FINAL_DECISION = 'PASS LOCAL DEMO ROOFER SCENARIO REVIEW';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const REQUIRED_ASSERTIONS = [
  'scenario_review_runner_doc_present',
  'scenario_review_runner_review_only_scope_present',
  'source_of_truth_commit_cf566ae_referenced',
  'demo_roofer_bundle_commit_17abae0_referenced',
  'post_run_evidence_readiness_commit_cf566ae_referenced',
  'runner_file_present',
  'verifier_file_present',
  'dry_run_wrapper_present_and_safe',
  'all_fixture_files_exist',
  'expected_summary_fixture_present',
  'runner_outputs_valid_json',
  'runner_reports_25_fake_leads',
  'runner_reports_25_scenarios',
  'runner_reports_25_expected_outcomes',
  'runner_reports_all_expected_outcomes_matched',
  'runner_reports_no_missing_expected_outcomes',
  'runner_reports_no_unexpected_expected_outcomes',
  'final_decision_pass_local_demo_roofer_scenario_review',
  'activation_approval_not_granted',
  'command_execution_status_not_run_by_this_runner',
  'approved_for_activation_now_false',
  'approved_channels_empty',
  'approved_external_services_empty',
  'no_external_calls_made',
  'no_credentials_env_api_webhook_references_used',
  'no_production_supabase_data_path_used',
  'no_schema_auth_rls_security_migration_required',
  'unsupported_automation_blocked',
  'stop_condition_boundary_preserved',
  'human_escalation_routes_to_roofer_for_judgment',
  'roofleadhq_escalation_limited_to_system_review_cases',
  'does_not_approve_activation',
  'does_not_approve_live_activation',
  'does_not_approve_sandbox_test_mode_activation',
  'does_not_approve_external_services',
  'does_not_run_final_activation_command',
  'post_run_review_template_required_after_future_demo_e2e_run',
  'old_90_day_plan_cannot_override_current_source_of_truth',
  'forbidden_live_external_sandbox_paths_remain_blocked',
  'delivery_posture_local_fake_data_read_only_dry_run_review_only',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'public_go_live_or_production_copy_not_changed',
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
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_SCENARIO_REVIEW_RUNNER.md',
  'run-native-workflow-fixture-demo-roofer-scenario-review-runner-dry-run.sh',
  'run-native-workflow-fixture-demo-roofer-scenario-review-runner.js',
  'verify-native-workflow-fixture-demo-roofer-scenario-review-runner-readonly.js',
  'Native Workflow Fixture Demo Roofer Scenario Review Runner',
  'native workflow fixture demo roofer scenario review runner',
  'demo roofer scenario review runner',
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

const doc = read(docPath);
const wrapper = read(wrapperPath);
const runner = read(runnerPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const postRunReviewTemplateDoc = read(postRunReviewTemplateDocPath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);

passAssertion('scenario_review_runner_doc_present');

mustHave(doc, 'Purpose and Scope', 'documentation');
mustHave(
  doc,
  'fake-data/local-only/read-only/dry-run-only/review-only demo roofer scenario review runner',
  'documentation',
);
mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'documentation');
mustHave(doc, DEMO_ROOFER_BUNDLE_COMMIT, 'documentation');
mustHave(doc, 'post-run evidence and demo E2E readiness exists from cf566ae', 'documentation');
mustHave(doc, 'demo roofer E2E bundle exists from 17abae0', 'documentation');
passAssertion('scenario_review_runner_review_only_scope_present');
passAssertion('source_of_truth_commit_cf566ae_referenced');
passAssertion('demo_roofer_bundle_commit_17abae0_referenced');
passAssertion('post_run_evidence_readiness_commit_cf566ae_referenced');

mustHave(doc, 'This is **not** approval to activate anything', 'documentation');
mustHave(doc, 'This does **not** approve live activation', 'documentation');
mustHave(doc, 'This does **not** approve sandbox/test-mode activation', 'documentation');
mustHave(doc, 'This does **not** approve external services', 'documentation');
mustHave(doc, 'This does **not** run the final activation command', 'documentation');
passAssertion('does_not_approve_activation');
passAssertion('does_not_approve_live_activation');
passAssertion('does_not_approve_sandbox_test_mode_activation');
passAssertion('does_not_approve_external_services');
passAssertion('does_not_run_final_activation_command');

mustHave(doc, 'activation_approval_status | not_granted', 'documentation');
mustHave(doc, 'command_execution_status | not_run_by_this_runner', 'documentation');
mustHave(doc, 'approved_for_activation_now | false', 'documentation');
mustHave(doc, 'approved_channels | []', 'documentation');
mustHave(doc, 'approved_external_services | []', 'documentation');
mustHave(doc, FINAL_DECISION, 'documentation');
passAssertion('activation_approval_not_granted');
passAssertion('command_execution_status_not_run_by_this_runner');
passAssertion('approved_for_activation_now_false');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');
passAssertion('final_decision_pass_local_demo_roofer_scenario_review');

mustHave(doc, 'old 90-day plan cannot override current source-of-truth direction', 'documentation');
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(doc, 'sandbox/test-mode services', 'documentation');
mustHave(doc, 'billing/payment/deposit/invoice/quote/estimate automation', 'documentation');
mustHave(doc, 'scheduler/cron/dispatcher', 'documentation');
mustHave(doc, 'public routes/webhooks', 'documentation');
mustHave(doc, 'Twilio', 'documentation');
mustHave(doc, 'Vapi', 'documentation');
mustHave(doc, 'Resend', 'documentation');
mustHave(doc, 'Google Calendar', 'documentation');
mustHave(doc, 'Lindy', 'documentation');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(doc, 'delivery_mode | local-only', 'documentation');
mustHave(doc, 'data_mode | fake-data-only', 'documentation');
mustHave(doc, 'access_mode | read-only', 'documentation');
mustHave(doc, 'execution_mode | dry-run-only', 'documentation');
mustHave(doc, 'review_mode | review-only', 'documentation');
passAssertion('delivery_posture_local_fake_data_read_only_dry_run_review_only');

mustHave(doc, postRunReviewTemplateDocPath, 'documentation');
mustHave(postRunReviewTemplateDoc, 'post-run review template review-only', 'post-run review template doc');
passAssertion('post_run_review_template_required_after_future_demo_e2e_run');

mustHave(doc, finalActivationCommandDraftDocPath, 'documentation');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');
mustHave(doc, 'not approved for execution', 'documentation');

mustHave(doc, 'public_website_go_live_copy_changed | false', 'documentation');
passAssertion('public_go_live_or_production_copy_not_changed');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
  if (pattern.test(runner)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}

if (!fs.existsSync(path.join(root, runnerPath))) fail(`missing runner: ${runnerPath}`);
passAssertion('runner_file_present');

if (!fs.existsSync(path.join(root, verifierPath))) fail(`missing verifier: ${verifierPath}`);
passAssertion('verifier_file_present');

for (const [label, fixturePath] of Object.entries(fixtureFiles)) {
  if (!fs.existsSync(path.join(root, fixturePath))) {
    fail(`missing fixture file (${label}): ${fixturePath}`);
  }
}
passAssertion('all_fixture_files_exist');
passAssertion('expected_summary_fixture_present');

const expectedSummary = readJson(expectedSummaryFixturePath);
if (expectedSummary.final_decision !== FINAL_DECISION) {
  fail('expected summary fixture final_decision mismatch');
}
if (expectedSummary.fake_lead_count !== 25) fail('expected summary fake_lead_count must be 25');
if (expectedSummary.scenario_count !== 25) fail('expected summary scenario_count must be 25');
if (expectedSummary.expected_outcome_count !== 25) {
  fail('expected summary expected_outcome_count must be 25');
}

const runnerSyntax = spawnSync(process.execPath, ['--check', path.join(root, runnerPath)], {
  cwd: root,
  encoding: 'utf8',
});
if (runnerSyntax.status !== 0) {
  fail(`runner syntax check failed: ${runnerSyntax.stderr || runnerSyntax.stdout}`);
}

const verifierSyntax = spawnSync(process.execPath, ['--check', path.join(root, verifierPath)], {
  cwd: root,
  encoding: 'utf8',
});
if (verifierSyntax.status !== 0) {
  fail(`verifier syntax check failed: ${verifierSyntax.stderr || verifierSyntax.stdout}`);
}
console.log('PASS: runner and verifier syntax checks succeeded.');

const runnerResult = spawnSync(process.execPath, [path.join(root, runnerPath)], {
  cwd: root,
  encoding: 'utf8',
});
if (runnerResult.status !== 0) {
  fail(`runner execution failed: ${runnerResult.stderr || runnerResult.stdout}`);
}

let output;
try {
  output = JSON.parse(runnerResult.stdout);
} catch (err) {
  fail(`runner did not output valid JSON: ${err.message}`);
}
passAssertion('runner_outputs_valid_json');

if (output.fake_lead_count !== 25) fail('runner fake_lead_count must be 25');
passAssertion('runner_reports_25_fake_leads');

if (output.scenario_count !== 25) fail('runner scenario_count must be 25');
passAssertion('runner_reports_25_scenarios');

if (output.expected_outcome_count !== 25) fail('runner expected_outcome_count must be 25');
passAssertion('runner_reports_25_expected_outcomes');

if (output.matched_expected_outcomes !== 25) {
  fail('runner matched_expected_outcomes must be 25');
}
passAssertion('runner_reports_all_expected_outcomes_matched');

if (!Array.isArray(output.missing_expected_outcomes) || output.missing_expected_outcomes.length !== 0) {
  fail('runner missing_expected_outcomes must be empty');
}
passAssertion('runner_reports_no_missing_expected_outcomes');

if (
  !Array.isArray(output.unexpected_expected_outcomes) ||
  output.unexpected_expected_outcomes.length !== 0
) {
  fail('runner unexpected_expected_outcomes must be empty');
}
passAssertion('runner_reports_no_unexpected_expected_outcomes');

if (output.final_decision !== FINAL_DECISION) {
  fail(`runner final_decision must be ${FINAL_DECISION}`);
}

if (output.activation_approval_status !== 'not_granted') {
  fail('runner activation_approval_status must be not_granted');
}

if (
  output.command_execution_status !== 'not_run_by_this_runner' &&
  output.command_execution_status !== 'not_run_in_this_packet'
) {
  fail('runner command_execution_status must be not_run_by_this_runner or equivalent');
}

if (output.approved_for_activation_now !== false) {
  fail('runner approved_for_activation_now must be false');
}

if (!Array.isArray(output.approved_channels) || output.approved_channels.length !== 0) {
  fail('runner approved_channels must be empty');
}

if (!Array.isArray(output.approved_external_services) || output.approved_external_services.length !== 0) {
  fail('runner approved_external_services must be empty');
}

if (output.external_calls_made !== false) fail('runner external_calls_made must be false');
passAssertion('no_external_calls_made');

if (output.credentials_env_api_webhook_references_used !== false) {
  fail('runner credentials_env_api_webhook_references_used must be false');
}
passAssertion('no_credentials_env_api_webhook_references_used');

if (output.production_supabase_data_path_used !== false) {
  fail('runner production_supabase_data_path_used must be false');
}
passAssertion('no_production_supabase_data_path_used');

if (output.schema_auth_rls_security_migration_required !== false) {
  fail('runner schema_auth_rls_security_migration_required must be false');
}
passAssertion('no_schema_auth_rls_security_migration_required');

if (
  !Array.isArray(output.blocked_unsupported_automation_scenarios) ||
  output.blocked_unsupported_automation_scenarios.length !== 1 ||
  output.blocked_unsupported_automation_scenarios[0] !== 'scenario-023-unsupported-automation-blocked'
) {
  fail('unsupported automation must remain blocked');
}
passAssertion('unsupported_automation_blocked');

if (
  !Array.isArray(output.blocked_external_service_scenarios) ||
  output.blocked_external_service_scenarios.length !== 1 ||
  output.blocked_external_service_scenarios[0] !== 'scenario-024-external-service-boundary-blocked'
) {
  fail('external service block must remain blocked');
}

if (!Array.isArray(output.human_escalation_scenarios) || output.human_escalation_scenarios.length !== 2) {
  fail('human escalation scenarios must include roofer and roofleadhq paths');
}
if (!output.human_escalation_scenarios.includes('scenario-021-human-escalation-roofer-judgment')) {
  fail('human escalation must route to roofer for judgment');
}
passAssertion('human_escalation_routes_to_roofer_for_judgment');

if (!output.human_escalation_scenarios.includes('scenario-022-roofleadhq-escalation-system-review')) {
  fail('roofleadhq escalation scenario must be present');
}
passAssertion('roofleadhq_escalation_limited_to_system_review_cases');

const scenarios = readJson(fixtureFiles.scenarios);
const outcomes = readJson(fixtureFiles.outcomes);
const stopScenarioFixture = scenarios.scenarios.find((s) => s.category === 'stop_condition');
const stopOutcomeFixture = outcomes.expected_outcomes.find(
  (o) => o.scenario_id === stopScenarioFixture.scenario_id,
);
if (stopScenarioFixture.target_state !== 'stop_condition_triggered_fixture_review') {
  fail('stop-condition scenario must remain blocked');
}
if (stopOutcomeFixture.final_state !== 'stop_condition_triggered_fixture_review') {
  fail('stop-condition outcome must remain blocked');
}
passAssertion('stop_condition_boundary_preserved');

const summaryKeysToMatch = [
  'runner_name',
  'source_of_truth_commit',
  'demo_roofer_name',
  'fake_lead_count',
  'scenario_count',
  'expected_outcome_count',
  'matched_expected_outcomes',
  'blocked_external_service_scenarios',
  'blocked_unsupported_automation_scenarios',
  'review_queue_scenarios',
  'human_escalation_scenarios',
  'post_inspection_scenarios',
  'feedback_permission_scenarios',
  'final_decision',
];
for (const key of summaryKeysToMatch) {
  if (JSON.stringify(output[key]) !== JSON.stringify(expectedSummary[key])) {
    fail(`runner output ${key} does not match expected summary fixture`);
  }
}

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
  'verify-native-workflow-fixture-demo-roofer-scenario-review-runner-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Demo Roofer Scenario Review Runner',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, runnerPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

for (const ref of PACKET_REFS) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
passAssertion('docs_and_context_wiring_present');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, 'set -euo pipefail', 'wrapper strict mode');
mustHave(wrapper, runnerPath, 'wrapper runner');
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

for (const assertion of REQUIRED_ASSERTIONS) {
  if (
    ![
      'scenario_review_runner_doc_present',
      'scenario_review_runner_review_only_scope_present',
      'source_of_truth_commit_cf566ae_referenced',
      'demo_roofer_bundle_commit_17abae0_referenced',
      'post_run_evidence_readiness_commit_cf566ae_referenced',
      'runner_file_present',
      'verifier_file_present',
      'dry_run_wrapper_present_and_safe',
      'all_fixture_files_exist',
      'expected_summary_fixture_present',
      'runner_outputs_valid_json',
      'runner_reports_25_fake_leads',
      'runner_reports_25_scenarios',
      'runner_reports_25_expected_outcomes',
      'runner_reports_all_expected_outcomes_matched',
      'runner_reports_no_missing_expected_outcomes',
      'runner_reports_no_unexpected_expected_outcomes',
      'final_decision_pass_local_demo_roofer_scenario_review',
      'activation_approval_not_granted',
      'command_execution_status_not_run_by_this_runner',
      'approved_for_activation_now_false',
      'approved_channels_empty',
      'approved_external_services_empty',
      'no_external_calls_made',
      'no_credentials_env_api_webhook_references_used',
      'no_production_supabase_data_path_used',
      'no_schema_auth_rls_security_migration_required',
      'unsupported_automation_blocked',
      'stop_condition_boundary_preserved',
      'human_escalation_routes_to_roofer_for_judgment',
      'roofleadhq_escalation_limited_to_system_review_cases',
      'does_not_approve_activation',
      'does_not_approve_live_activation',
      'does_not_approve_sandbox_test_mode_activation',
      'does_not_approve_external_services',
      'does_not_run_final_activation_command',
      'post_run_review_template_required_after_future_demo_e2e_run',
      'old_90_day_plan_cannot_override_current_source_of_truth',
      'forbidden_live_external_sandbox_paths_remain_blocked',
      'delivery_posture_local_fake_data_read_only_dry_run_review_only',
      'demo_ready_with_live_automation_disabled_preserved',
      'full_safe_readiness_lane_preserved',
      'docs_and_context_wiring_present',
      'public_go_live_or_production_copy_not_changed',
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
    ].includes(assertion)
  ) {
    fail(`unhandled assertion: ${assertion}`);
  }
}

console.log(
  `PASS: Native Workflow Fixture Demo Roofer Scenario Review Runner verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);