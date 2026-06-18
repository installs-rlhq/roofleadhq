#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const operatorRunbookDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OPERATOR_RUNBOOK.md';
const goNoGoGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_GO_NO_GO_EVIDENCE_GATE.md';
const wrapperPath =
  'scripts/run-native-workflow-fixture-demo-roofer-local-e2e-operator-runbook-go-no-go-gate-dry-run.sh';
const gateFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/demo-local-e2e-go-no-go-gate.json';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-operator-runbook-go-no-go-gate-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const postRunReviewTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';
const evidenceReportDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_E2E_EVIDENCE_REPORT.md';
const scenarioReviewRunnerDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_SCENARIO_REVIEW_RUNNER.md';

const fixtureDir = 'backend/fixtures/native-workflow-demo-roofer';
const fixtureFiles = {
  profile: `${fixtureDir}/demo-roofer-profile.json`,
  leads: `${fixtureDir}/demo-homeowner-leads.json`,
  scenarios: `${fixtureDir}/demo-e2e-scenarios.json`,
  outcomes: `${fixtureDir}/demo-expected-outcomes.json`,
  checklist: `${fixtureDir}/demo-operator-checklist.json`,
  evidence: `${fixtureDir}/post-run-evidence-capture.json`,
  scenarioReviewSummary: `${fixtureDir}/demo-scenario-review-expected-summary.json`,
  evidenceSummary: `${fixtureDir}/demo-e2e-evidence-report-summary.json`,
  gateFixture: gateFixturePath,
};

const SOURCE_OF_TRUTH_COMMIT = '401bfc7';
const DEMO_ROOFER_BUNDLE_COMMIT = '17abae0';
const POST_RUN_EVIDENCE_COMMIT = 'cf566ae';
const SCENARIO_REVIEW_RUNNER_COMMIT = '728ad03';
const E2E_EVIDENCE_REPORT_COMMIT = '401bfc7';
const EVIDENCE_CONCLUSION = 'PASS LOCAL DEMO ROOFER E2E EVIDENCE REPORT';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const REQUIRED_REVIEW_COMMANDS = [
  'node backend/scripts/run-native-workflow-fixture-demo-roofer-scenario-review-runner.js',
  'node backend/scripts/generate-native-workflow-fixture-demo-roofer-e2e-evidence-report.js',
  'bash scripts/run-native-workflow-fixture-demo-roofer-e2e-evidence-report-dry-run.sh',
  'node backend/scripts/show-pilot-readiness-status.js',
  'bash scripts/verify-safe-readiness-fast.sh',
  'npm --prefix backend run build',
];

const REQUIRED_ASSERTIONS = [
  'operator_runbook_doc_present',
  'go_no_go_evidence_gate_doc_present',
  'operator_runbook_review_only_scope_present',
  'go_no_go_gate_review_only_scope_present',
  'source_of_truth_commit_401bfc7_referenced',
  'prior_commit_17abae0_referenced',
  'prior_commit_cf566ae_referenced',
  'prior_commit_728ad03_referenced',
  'prior_commit_401bfc7_referenced',
  'gate_fixture_present',
  'gate_fixture_valid_json',
  'all_fixture_files_exist',
  'operator_runbook_includes_all_required_review_commands',
  'decision_option_go_local_demo_e2e_review_only_present',
  'decision_option_no_go_keep_blocked_present',
  'decision_option_hold_for_review_present',
  'go_does_not_approve_activation',
  'go_does_not_approve_external_services',
  'go_does_not_run_final_activation_command',
  'pass_criteria_25_fake_leads_present',
  'pass_criteria_25_scenarios_present',
  'pass_criteria_25_expected_outcomes_present',
  'pass_criteria_25_matched_outcomes_present',
  'pass_criteria_no_missing_outcomes',
  'pass_criteria_no_unexpected_outcomes',
  'pass_criteria_evidence_conclusion_pass_local_demo_roofer_e2e_evidence_report',
  'fail_criteria_external_calls',
  'fail_criteria_credentials',
  'fail_criteria_production_data',
  'fail_criteria_schema_auth_rls_security_changes',
  'fail_criteria_public_routes_webhooks_schedulers_cron_dispatchers',
  'fail_criteria_failed_checks',
  'fail_criteria_real_data',
  'fail_criteria_activation_approval',
  'fail_criteria_final_activation_command_execution',
  'gate_fixture_current_recommended_decision_go_local_demo_e2e_review_only',
  'activation_approval_status_not_granted',
  'command_execution_status_not_run_by_this_gate',
  'approved_for_activation_now_false',
  'approved_channels_empty',
  'approved_external_services_empty',
  'safety_status_demo_ready_with_live_automation_disabled',
  'old_90_day_plan_cannot_override_current_source_of_truth',
  'forbidden_live_external_sandbox_paths_remain_blocked',
  'delivery_posture_local_fake_data_read_only_dry_run_review_only',
  'post_run_review_template_required_after_future_demo_e2e_run',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
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
  'verifier_file_present',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_OPERATOR_RUNBOOK.md',
  'NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_GO_NO_GO_EVIDENCE_GATE.md',
  'run-native-workflow-fixture-demo-roofer-local-e2e-operator-runbook-go-no-go-gate-dry-run.sh',
  'verify-native-workflow-fixture-demo-roofer-local-e2e-operator-runbook-go-no-go-gate-readonly.js',
  'demo-local-e2e-go-no-go-gate.json',
  'Native Workflow Fixture Demo Roofer Local E2E Operator Runbook + Go/No-Go Evidence Gate',
  'native workflow fixture demo roofer local e2e operator runbook go no go gate',
  'demo roofer local e2e operator runbook go no go gate',
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

const operatorRunbookDoc = read(operatorRunbookDocPath);
const goNoGoGateDoc = read(goNoGoGateDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const postRunReviewTemplateDoc = read(postRunReviewTemplateDocPath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);
const evidenceReportDoc = read(evidenceReportDocPath);
const scenarioReviewRunnerDoc = read(scenarioReviewRunnerDocPath);

passAssertion('operator_runbook_doc_present');
passAssertion('go_no_go_evidence_gate_doc_present');

mustHave(
  operatorRunbookDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only operator runbook',
  'operator runbook',
);
mustHave(
  goNoGoGateDoc,
  'fake-data/local-only/read-only/dry-run-only/review-only go/no-go evidence gate',
  'go/no-go gate',
);
passAssertion('operator_runbook_review_only_scope_present');
passAssertion('go_no_go_gate_review_only_scope_present');

mustHave(operatorRunbookDoc, SOURCE_OF_TRUTH_COMMIT, 'operator runbook');
mustHave(goNoGoGateDoc, SOURCE_OF_TRUTH_COMMIT, 'go/no-go gate');
mustHave(operatorRunbookDoc, DEMO_ROOFER_BUNDLE_COMMIT, 'operator runbook');
mustHave(operatorRunbookDoc, POST_RUN_EVIDENCE_COMMIT, 'operator runbook');
mustHave(operatorRunbookDoc, SCENARIO_REVIEW_RUNNER_COMMIT, 'operator runbook');
mustHave(operatorRunbookDoc, E2E_EVIDENCE_REPORT_COMMIT, 'operator runbook');
mustHave(goNoGoGateDoc, DEMO_ROOFER_BUNDLE_COMMIT, 'go/no-go gate');
mustHave(goNoGoGateDoc, POST_RUN_EVIDENCE_COMMIT, 'go/no-go gate');
mustHave(goNoGoGateDoc, SCENARIO_REVIEW_RUNNER_COMMIT, 'go/no-go gate');
mustHave(goNoGoGateDoc, E2E_EVIDENCE_REPORT_COMMIT, 'go/no-go gate');
passAssertion('source_of_truth_commit_401bfc7_referenced');
passAssertion('prior_commit_17abae0_referenced');
passAssertion('prior_commit_cf566ae_referenced');
passAssertion('prior_commit_728ad03_referenced');
passAssertion('prior_commit_401bfc7_referenced');

mustHave(operatorRunbookDoc, 'HEAD == origin/main', 'operator runbook');
mustHave(operatorRunbookDoc, 'git status blank', 'operator runbook');
mustHave(operatorRunbookDoc, 'demo_ready_with_live_automation_disabled', 'operator runbook');
mustHave(operatorRunbookDoc, 'verify-safe-readiness-fast.sh', 'operator runbook');

for (const cmd of REQUIRED_REVIEW_COMMANDS) {
  mustHave(operatorRunbookDoc, cmd, 'operator runbook required review command');
}
passAssertion('operator_runbook_includes_all_required_review_commands');

mustHave(goNoGoGateDoc, 'GO — Local Demo E2E Review Only', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'NO-GO — Keep Blocked', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'HOLD — Pause for Review', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'GO_LOCAL_DEMO_E2E_REVIEW_ONLY', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'NO_GO_KEEP_BLOCKED', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'HOLD_FOR_REVIEW', 'go/no-go gate');
passAssertion('decision_option_go_local_demo_e2e_review_only_present');
passAssertion('decision_option_no_go_keep_blocked_present');
passAssertion('decision_option_hold_for_review_present');

mustHave(goNoGoGateDoc, 'This GO does **not** approve activation', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'This GO does **not** approve external services', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'This GO does **not** run the final activation command', 'go/no-go gate');
mustHave(operatorRunbookDoc, 'This does **not** run the final activation command', 'operator runbook');
mustHave(operatorRunbookDoc, 'This does **not** approve live activation', 'operator runbook');
mustHave(operatorRunbookDoc, 'This does **not** approve sandbox/test-mode activation', 'operator runbook');
mustHave(operatorRunbookDoc, 'This does **not** approve external services', 'operator runbook');
passAssertion('go_does_not_approve_activation');
passAssertion('go_does_not_approve_external_services');
passAssertion('go_does_not_run_final_activation_command');

mustHave(goNoGoGateDoc, '25 fake leads present', 'go/no-go gate pass criteria');
mustHave(goNoGoGateDoc, '25 scenarios present', 'go/no-go gate pass criteria');
mustHave(goNoGoGateDoc, '25 expected outcomes present', 'go/no-go gate pass criteria');
mustHave(goNoGoGateDoc, '25 matched outcomes', 'go/no-go gate pass criteria');
mustHave(goNoGoGateDoc, 'no missing outcomes', 'go/no-go gate pass criteria');
mustHave(goNoGoGateDoc, 'no unexpected outcomes', 'go/no-go gate pass criteria');
mustHave(goNoGoGateDoc, EVIDENCE_CONCLUSION, 'go/no-go gate pass criteria');
mustHave(goNoGoGateDoc, 'demo_ready_with_live_automation_disabled', 'go/no-go gate pass criteria');
passAssertion('pass_criteria_25_fake_leads_present');
passAssertion('pass_criteria_25_scenarios_present');
passAssertion('pass_criteria_25_expected_outcomes_present');
passAssertion('pass_criteria_25_matched_outcomes_present');
passAssertion('pass_criteria_no_missing_outcomes');
passAssertion('pass_criteria_no_unexpected_outcomes');
passAssertion('pass_criteria_evidence_conclusion_pass_local_demo_roofer_e2e_evidence_report');

mustHave(goNoGoGateDoc, 'any attempted external call', 'go/no-go gate fail criteria');
mustHave(goNoGoGateDoc, 'credential/env/API/webhook access', 'go/no-go gate fail criteria');
mustHave(goNoGoGateDoc, 'production data access', 'go/no-go gate fail criteria');
mustHave(goNoGoGateDoc, 'schema/auth/RLS/security change', 'go/no-go gate fail criteria');
mustHave(
  goNoGoGateDoc,
  'scheduler/cron/dispatcher/public route/webhook activation',
  'go/no-go gate fail criteria',
);
mustHave(goNoGoGateDoc, 'failed verifier/wrapper/build/safety check', 'go/no-go gate fail criteria');
mustHave(goNoGoGateDoc, 'any real homeowner/roofer data', 'go/no-go gate fail criteria');
mustHave(goNoGoGateDoc, 'any activation approval implied by artifact', 'go/no-go gate fail criteria');
mustHave(goNoGoGateDoc, 'any final activation command execution', 'go/no-go gate fail criteria');
passAssertion('fail_criteria_external_calls');
passAssertion('fail_criteria_credentials');
passAssertion('fail_criteria_production_data');
passAssertion('fail_criteria_schema_auth_rls_security_changes');
passAssertion('fail_criteria_public_routes_webhooks_schedulers_cron_dispatchers');
passAssertion('fail_criteria_failed_checks');
passAssertion('fail_criteria_real_data');
passAssertion('fail_criteria_activation_approval');
passAssertion('fail_criteria_final_activation_command_execution');

mustHave(
  goNoGoGateDoc,
  'old 90-day plan cannot override current source-of-truth direction',
  'go/no-go gate',
);
mustHave(goNoGoGateDoc, 'later narrow reconciliation audit only', 'go/no-go gate');
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(goNoGoGateDoc, 'sandbox/test-mode services', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'billing/payment/deposit/invoice/quote/estimate automation', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'scheduler/cron/dispatcher', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'public routes/webhooks', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'Twilio', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'Vapi', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'Resend', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'Google Calendar', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'Lindy', 'go/no-go gate');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(goNoGoGateDoc, 'delivery_mode | local-only', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'data_mode | fake-data-only', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'access_mode | read-only', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'execution_mode | dry-run-only', 'go/no-go gate');
mustHave(goNoGoGateDoc, 'review_mode | review-only', 'go/no-go gate');
passAssertion('delivery_posture_local_fake_data_read_only_dry_run_review_only');

mustHave(operatorRunbookDoc, postRunReviewTemplateDocPath, 'operator runbook');
mustHave(postRunReviewTemplateDoc, 'post-run review template review-only', 'post-run review template doc');
passAssertion('post_run_review_template_required_after_future_demo_e2e_run');

mustHave(operatorRunbookDoc, finalActivationCommandDraftDocPath, 'operator runbook');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');
mustHave(operatorRunbookDoc, 'not run the final activation command', 'operator runbook');

mustHave(goNoGoGateDoc, 'public_website_go_live_copy_changed | false', 'go/no-go gate');
passAssertion('public_go_live_or_production_copy_not_changed');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(operatorRunbookDoc, phrase, 'operator runbook forbidden language');
  mustNotHave(goNoGoGateDoc, phrase, 'go/no-go gate forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(operatorRunbookDoc)) {
    fail(`unsafe pattern ${pattern} found in operator runbook`);
  }
  if (pattern.test(goNoGoGateDoc)) fail(`unsafe pattern ${pattern} found in go/no-go gate`);
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}

if (!fs.existsSync(path.join(root, verifierPath))) fail(`missing verifier: ${verifierPath}`);
passAssertion('verifier_file_present');

for (const [label, fixturePath] of Object.entries(fixtureFiles)) {
  if (!fs.existsSync(path.join(root, fixturePath))) {
    fail(`missing fixture file (${label}): ${fixturePath}`);
  }
}
passAssertion('all_fixture_files_exist');
passAssertion('gate_fixture_present');

const gateFixture = readJson(gateFixturePath);
if (gateFixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('gate fixture source_of_truth_commit must be 401bfc7');
}
if (gateFixture.gate_status !== 'review_only') {
  fail('gate fixture gate_status must be review_only');
}
if (gateFixture.current_recommended_decision !== 'GO_LOCAL_DEMO_E2E_REVIEW_ONLY') {
  fail('gate fixture current_recommended_decision must be GO_LOCAL_DEMO_E2E_REVIEW_ONLY');
}
if (gateFixture.activation_approval_status !== 'not_granted') {
  fail('gate fixture activation_approval_status must be not_granted');
}
if (gateFixture.command_execution_status !== 'not_run_by_this_gate') {
  fail('gate fixture command_execution_status must be not_run_by_this_gate');
}
if (gateFixture.approved_for_activation_now !== false) {
  fail('gate fixture approved_for_activation_now must be false');
}
if (!Array.isArray(gateFixture.approved_channels) || gateFixture.approved_channels.length !== 0) {
  fail('gate fixture approved_channels must be empty');
}
if (
  !Array.isArray(gateFixture.approved_external_services) ||
  gateFixture.approved_external_services.length !== 0
) {
  fail('gate fixture approved_external_services must be empty');
}
if (gateFixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('gate fixture safety_status must be demo_ready_with_live_automation_disabled');
}
if (gateFixture.required_counts.fake_leads !== 25) fail('gate fixture fake_leads must be 25');
if (gateFixture.required_counts.scenarios !== 25) fail('gate fixture scenarios must be 25');
if (gateFixture.required_counts.expected_outcomes !== 25) {
  fail('gate fixture expected_outcomes must be 25');
}
if (gateFixture.required_counts.matched_outcomes !== 25) {
  fail('gate fixture matched_outcomes must be 25');
}
if (gateFixture.evidence_conclusion !== EVIDENCE_CONCLUSION) {
  fail('gate fixture evidence_conclusion mismatch');
}
if (gateFixture.blockers.external_calls !== false) fail('gate fixture blockers.external_calls must be false');
if (gateFixture.blockers.credentials !== false) fail('gate fixture blockers.credentials must be false');
if (gateFixture.blockers.production_data !== false) {
  fail('gate fixture blockers.production_data must be false');
}
if (gateFixture.blockers.schema_auth_rls_security_changes !== false) {
  fail('gate fixture blockers.schema_auth_rls_security_changes must be false');
}
if (gateFixture.blockers.public_routes_webhooks !== false) {
  fail('gate fixture blockers.public_routes_webhooks must be false');
}
if (gateFixture.blockers.schedulers_cron_dispatchers !== false) {
  fail('gate fixture blockers.schedulers_cron_dispatchers must be false');
}
if (gateFixture.blockers.billing_payment_automation !== false) {
  fail('gate fixture blockers.billing_payment_automation must be false');
}
if (gateFixture.blockers.live_services !== false) {
  fail('gate fixture blockers.live_services must be false');
}
passAssertion('gate_fixture_valid_json');
passAssertion('gate_fixture_current_recommended_decision_go_local_demo_e2e_review_only');
passAssertion('activation_approval_status_not_granted');
passAssertion('command_execution_status_not_run_by_this_gate');
passAssertion('approved_for_activation_now_false');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');
passAssertion('safety_status_demo_ready_with_live_automation_disabled');

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
  'verify-native-workflow-fixture-demo-roofer-local-e2e-operator-runbook-go-no-go-gate-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Demo Roofer Local E2E Operator Runbook + Go/No-Go Evidence Gate',
  'aggregate readiness',
);
mustHave(verifierIndex, operatorRunbookDocPath, 'verifier index');
mustHave(verifierIndex, goNoGoGateDocPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, gateFixturePath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

for (const ref of PACKET_REFS) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
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

mustHave(operatorRunbookDoc, evidenceReportDocPath, 'operator runbook');
mustHave(operatorRunbookDoc, scenarioReviewRunnerDocPath, 'operator runbook');
mustHave(goNoGoGateDoc, operatorRunbookDocPath, 'go/no-go gate');
mustHave(goNoGoGateDoc, gateFixturePath, 'go/no-go gate');

for (const assertion of REQUIRED_ASSERTIONS) {
  if (
    ![
      'operator_runbook_doc_present',
      'go_no_go_evidence_gate_doc_present',
      'operator_runbook_review_only_scope_present',
      'go_no_go_gate_review_only_scope_present',
      'source_of_truth_commit_401bfc7_referenced',
      'prior_commit_17abae0_referenced',
      'prior_commit_cf566ae_referenced',
      'prior_commit_728ad03_referenced',
      'prior_commit_401bfc7_referenced',
      'gate_fixture_present',
      'gate_fixture_valid_json',
      'all_fixture_files_exist',
      'operator_runbook_includes_all_required_review_commands',
      'decision_option_go_local_demo_e2e_review_only_present',
      'decision_option_no_go_keep_blocked_present',
      'decision_option_hold_for_review_present',
      'go_does_not_approve_activation',
      'go_does_not_approve_external_services',
      'go_does_not_run_final_activation_command',
      'pass_criteria_25_fake_leads_present',
      'pass_criteria_25_scenarios_present',
      'pass_criteria_25_expected_outcomes_present',
      'pass_criteria_25_matched_outcomes_present',
      'pass_criteria_no_missing_outcomes',
      'pass_criteria_no_unexpected_outcomes',
      'pass_criteria_evidence_conclusion_pass_local_demo_roofer_e2e_evidence_report',
      'fail_criteria_external_calls',
      'fail_criteria_credentials',
      'fail_criteria_production_data',
      'fail_criteria_schema_auth_rls_security_changes',
      'fail_criteria_public_routes_webhooks_schedulers_cron_dispatchers',
      'fail_criteria_failed_checks',
      'fail_criteria_real_data',
      'fail_criteria_activation_approval',
      'fail_criteria_final_activation_command_execution',
      'gate_fixture_current_recommended_decision_go_local_demo_e2e_review_only',
      'activation_approval_status_not_granted',
      'command_execution_status_not_run_by_this_gate',
      'approved_for_activation_now_false',
      'approved_channels_empty',
      'approved_external_services_empty',
      'safety_status_demo_ready_with_live_automation_disabled',
      'old_90_day_plan_cannot_override_current_source_of_truth',
      'forbidden_live_external_sandbox_paths_remain_blocked',
      'delivery_posture_local_fake_data_read_only_dry_run_review_only',
      'post_run_review_template_required_after_future_demo_e2e_run',
      'demo_ready_with_live_automation_disabled_preserved',
      'full_safe_readiness_lane_preserved',
      'docs_and_context_wiring_present',
      'dry_run_wrapper_present_and_safe',
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
      'verifier_file_present',
    ].includes(assertion)
  ) {
    fail(`unhandled assertion: ${assertion}`);
  }
}

console.log(
  `PASS: Native Workflow Fixture Demo Roofer Local E2E Operator Runbook + Go/No-Go Evidence Gate verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);