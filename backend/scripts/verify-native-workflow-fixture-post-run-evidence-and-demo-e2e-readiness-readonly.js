#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const postRunEvidenceDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_LOCAL_DRY_RUN_POST_RUN_EVIDENCE.md';
const demoE2eReadinessDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_E2E_EXECUTION_READINESS_PACKET.md';
const wrapperPath =
  'scripts/run-native-workflow-fixture-post-run-evidence-and-demo-e2e-readiness-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-post-run-evidence-and-demo-e2e-readiness-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const demoRooferBundleDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_TEST_BUNDLE.md';
const postRunReviewTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md';
const evidenceFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/post-run-evidence-capture.json';

const fixtureDir = 'backend/fixtures/native-workflow-demo-roofer';
const fixtureFiles = {
  profile: `${fixtureDir}/demo-roofer-profile.json`,
  leads: `${fixtureDir}/demo-homeowner-leads.json`,
  scenarios: `${fixtureDir}/demo-e2e-scenarios.json`,
  outcomes: `${fixtureDir}/demo-expected-outcomes.json`,
  checklist: `${fixtureDir}/demo-operator-checklist.json`,
  evidence: evidenceFixturePath,
};

const SOURCE_OF_TRUTH_COMMIT = '17abae0';
const FAKE_COMPANY_NAME = 'Summit Peak Roofing Demo LLC';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';
const COMMAND_EXECUTION_TYPE = 'local fake-data verifier smoke wrapper only';
const DECISION = 'PASS LOCAL DRY-RUN REVIEW';

const REQUIRED_ASSERTIONS = [
  'post_run_evidence_doc_present',
  'demo_e2e_readiness_doc_present',
  'structured_evidence_fixture_present',
  'source_of_truth_commit_17abae0_referenced',
  'exact_command_captured',
  'command_execution_type_local_fake_data_verifier_smoke_wrapper_only',
  'pre_run_source_of_truth_pass_captured',
  'pre_run_git_clean_status_blank_captured',
  'pre_run_safe_readiness_fast_lane_pass_17_checks_captured',
  'command_wrapper_pass_captured',
  'final_activation_command_draft_verifier_45_assertions_captured',
  'post_run_safe_readiness_fast_lane_pass_17_checks_captured',
  'backend_build_pass_captured',
  'post_run_source_of_truth_pass_captured',
  'post_run_git_clean_status_blank_captured',
  'decision_pass_local_dry_run_review_present',
  'does_not_approve_live_activation',
  'does_not_approve_sandbox_test_mode_activation',
  'does_not_approve_external_services',
  'activation_occurred_false',
  'live_activation_occurred_false',
  'sandbox_test_mode_activation_occurred_false',
  'external_calls_occurred_false',
  'credentials_env_api_webhook_access_false',
  'production_data_access_false',
  'schema_auth_rls_security_changes_false',
  'public_route_webhook_scheduler_cron_dispatcher_changes_false',
  'billing_payment_deposit_invoice_quote_estimate_automation_false',
  'demo_roofer_bundle_reference_present',
  'fake_homeowner_leads_25_referenced',
  'e2e_scenarios_25_referenced',
  'expected_outcomes_25_referenced',
  'summit_peak_roofing_demo_llc_fake_identified',
  'next_step_local_only_fake_data_read_only_dry_run_review_only',
  'post_run_review_template_required_after_future_demo_e2e_run',
  'old_90_day_plan_cannot_override_current_source_of_truth',
  'forbidden_live_external_sandbox_paths_remain_blocked',
  'public_go_live_or_production_copy_not_changed',
  'does_not_approve_activation',
  'activation_approval_not_granted',
  'activation_command_approval_not_granted',
  'final_jason_activation_approval_not_granted',
  'approved_for_activation_now_false',
  'approved_channels_empty',
  'approved_external_services_empty',
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
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_LOCAL_DRY_RUN_POST_RUN_EVIDENCE.md',
  'NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_E2E_EXECUTION_READINESS_PACKET.md',
  'run-native-workflow-fixture-post-run-evidence-and-demo-e2e-readiness-dry-run.sh',
  'verify-native-workflow-fixture-post-run-evidence-and-demo-e2e-readiness-readonly.js',
  'Native Workflow Fixture Post-Run Evidence and Demo E2E Readiness',
  'native workflow fixture post-run evidence and demo e2e readiness',
  'post-run evidence and demo e2e readiness',
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

const postRunEvidenceDoc = read(postRunEvidenceDocPath);
const demoE2eReadinessDoc = read(demoE2eReadinessDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const demoRooferBundleDoc = read(demoRooferBundleDocPath);
const postRunReviewTemplateDoc = read(postRunReviewTemplateDocPath);

passAssertion('post_run_evidence_doc_present');
passAssertion('demo_e2e_readiness_doc_present');

const combinedDocs = `${postRunEvidenceDoc}\n${demoE2eReadinessDoc}`;

mustHave(combinedDocs, 'Purpose and Scope', 'documentation');
mustHave(
  combinedDocs,
  'fake-data/local-only/read-only/dry-run-only/review-only',
  'documentation',
);
mustHave(combinedDocs, SOURCE_OF_TRUTH_COMMIT, 'documentation');
passAssertion('source_of_truth_commit_17abae0_referenced');

mustHave(postRunEvidenceDoc, EXACT_COMMAND, 'post-run evidence doc');
passAssertion('exact_command_captured');

mustHave(postRunEvidenceDoc, COMMAND_EXECUTION_TYPE, 'post-run evidence doc');
mustHave(postRunEvidenceDoc, 'command_execution_type | local fake-data verifier smoke wrapper only', 'post-run evidence doc');
passAssertion('command_execution_type_local_fake_data_verifier_smoke_wrapper_only');

mustHave(postRunEvidenceDoc, 'pre_run_source_of_truth | PASS', 'post-run evidence doc');
passAssertion('pre_run_source_of_truth_pass_captured');

mustHave(postRunEvidenceDoc, 'pre_run_git_clean_status | blank', 'post-run evidence doc');
passAssertion('pre_run_git_clean_status_blank_captured');

mustHave(postRunEvidenceDoc, 'pre_run_safe_readiness_fast_lane | PASS', 'post-run evidence doc');
mustHave(postRunEvidenceDoc, '17 checks', 'post-run evidence doc');
passAssertion('pre_run_safe_readiness_fast_lane_pass_17_checks_captured');

mustHave(postRunEvidenceDoc, 'command_wrapper_result | PASS', 'post-run evidence doc');
passAssertion('command_wrapper_pass_captured');

mustHave(postRunEvidenceDoc, '45 assertions', 'post-run evidence doc');
passAssertion('final_activation_command_draft_verifier_45_assertions_captured');

mustHave(postRunEvidenceDoc, 'post_run_safe_readiness_fast_lane | PASS', 'post-run evidence doc');
passAssertion('post_run_safe_readiness_fast_lane_pass_17_checks_captured');

mustHave(postRunEvidenceDoc, 'backend_build | PASS', 'post-run evidence doc');
passAssertion('backend_build_pass_captured');

mustHave(postRunEvidenceDoc, 'post_run_source_of_truth | PASS', 'post-run evidence doc');
passAssertion('post_run_source_of_truth_pass_captured');

mustHave(postRunEvidenceDoc, 'post_run_git_clean_status | blank', 'post-run evidence doc');
passAssertion('post_run_git_clean_status_blank_captured');

mustHave(postRunEvidenceDoc, DECISION, 'post-run evidence doc');
mustHave(postRunEvidenceDoc, 'decision | PASS LOCAL DRY-RUN REVIEW', 'post-run evidence doc');
passAssertion('decision_pass_local_dry_run_review_present');

mustHave(postRunEvidenceDoc, 'does **not** approve live activation', 'post-run evidence doc');
mustHave(postRunEvidenceDoc, 'does **not** approve sandbox/test-mode activation', 'post-run evidence doc');
passAssertion('does_not_approve_live_activation');
passAssertion('does_not_approve_sandbox_test_mode_activation');

mustHave(postRunEvidenceDoc, 'approves_external_services | false', 'post-run evidence doc');
mustHave(demoE2eReadinessDoc, 'does **not** approve live activation', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'does **not** approve sandbox/test-mode activation', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'does **not** approve external services', 'demo e2e readiness doc');
passAssertion('does_not_approve_external_services');
passAssertion('does_not_approve_activation');

mustHave(postRunEvidenceDoc, 'activation_occurred | false', 'post-run evidence doc');
mustHave(postRunEvidenceDoc, 'live_activation_occurred | false', 'post-run evidence doc');
mustHave(postRunEvidenceDoc, 'sandbox_test_mode_activation_occurred | false', 'post-run evidence doc');
passAssertion('activation_occurred_false');
passAssertion('live_activation_occurred_false');
passAssertion('sandbox_test_mode_activation_occurred_false');

mustHave(postRunEvidenceDoc, 'external_calls_occurred | false', 'post-run evidence doc');
passAssertion('external_calls_occurred_false');

mustHave(postRunEvidenceDoc, 'credentials_env_api_webhook_access_occurred | false', 'post-run evidence doc');
passAssertion('credentials_env_api_webhook_access_false');

mustHave(postRunEvidenceDoc, 'production_data_access_occurred | false', 'post-run evidence doc');
passAssertion('production_data_access_false');

mustHave(postRunEvidenceDoc, 'schema_auth_rls_security_changes_occurred | false', 'post-run evidence doc');
passAssertion('schema_auth_rls_security_changes_false');

mustHave(
  postRunEvidenceDoc,
  'public_route_webhook_scheduler_cron_dispatcher_changes_occurred | false',
  'post-run evidence doc',
);
passAssertion('public_route_webhook_scheduler_cron_dispatcher_changes_false');

mustHave(
  postRunEvidenceDoc,
  'billing_payment_deposit_invoice_quote_estimate_automation_occurred | false',
  'post-run evidence doc',
);
passAssertion('billing_payment_deposit_invoice_quote_estimate_automation_false');

mustHave(postRunEvidenceDoc, demoRooferBundleDocPath, 'post-run evidence doc');
mustHave(demoE2eReadinessDoc, demoRooferBundleDocPath, 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'demo roofer fixture bundle', 'demo e2e readiness doc');
passAssertion('demo_roofer_bundle_reference_present');

mustHave(demoE2eReadinessDoc, 'fake homeowner leads | 25', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, '25 fake homeowner leads', 'demo e2e readiness doc');
passAssertion('fake_homeowner_leads_25_referenced');

mustHave(demoE2eReadinessDoc, 'E2E scenarios | 25', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, '25 E2E scenarios', 'demo e2e readiness doc');
passAssertion('e2e_scenarios_25_referenced');

mustHave(demoE2eReadinessDoc, 'expected outcomes | 25', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, '25 expected outcomes', 'demo e2e readiness doc');
passAssertion('expected_outcomes_25_referenced');

mustHave(demoE2eReadinessDoc, FAKE_COMPANY_NAME, 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'obviously fake', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'company_name_is_fake | true', 'demo e2e readiness doc');
passAssertion('summit_peak_roofing_demo_llc_fake_identified');

mustHave(demoE2eReadinessDoc, 'delivery_mode | local-only', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'data_mode | fake-data-only', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'access_mode | read-only', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'execution_mode | dry-run-only', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'review_mode | review-only', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'demo roofer fake-data scenario review', 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'Use fake fixtures only', 'demo e2e readiness doc');
passAssertion('next_step_local_only_fake_data_read_only_dry_run_review_only');

mustHave(demoE2eReadinessDoc, postRunReviewTemplateDocPath, 'demo e2e readiness doc');
mustHave(demoE2eReadinessDoc, 'post-run review template/evidence capture', 'demo e2e readiness doc');
passAssertion('post_run_review_template_required_after_future_demo_e2e_run');

mustHave(combinedDocs, 'old 90-day plan cannot override current source-of-truth direction', 'documentation');
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(combinedDocs, 'sandbox/test-mode services', 'documentation');
mustHave(combinedDocs, 'billing/payment/deposit/invoice/quote/estimate automation', 'documentation');
mustHave(combinedDocs, 'scheduler/cron/dispatcher', 'documentation');
mustHave(combinedDocs, 'public routes/webhooks', 'documentation');
passAssertion('forbidden_live_external_sandbox_paths_remain_blocked');

mustHave(demoE2eReadinessDoc, 'public_website_go_live_copy_changed | false', 'demo e2e readiness doc');
passAssertion('public_go_live_or_production_copy_not_changed');

mustHave(postRunEvidenceDoc, 'activation_approval_status', 'post-run evidence doc');
mustHave(postRunEvidenceDoc, 'not_granted', 'post-run evidence doc');
mustHave(demoE2eReadinessDoc, 'activation_approval_status | not_granted', 'demo e2e readiness doc');
passAssertion('activation_approval_not_granted');

mustHave(demoE2eReadinessDoc, 'activation_command_approval_status | not_granted', 'demo e2e readiness doc');
passAssertion('activation_command_approval_not_granted');

mustHave(demoE2eReadinessDoc, 'final_jason_activation_approval | not_granted', 'demo e2e readiness doc');
passAssertion('final_jason_activation_approval_not_granted');

mustHave(demoE2eReadinessDoc, 'approved_for_activation_now | false', 'demo e2e readiness doc');
passAssertion('approved_for_activation_now_false');

mustHave(demoE2eReadinessDoc, 'approved_channels | []', 'demo e2e readiness doc');
passAssertion('approved_channels_empty');

mustHave(demoE2eReadinessDoc, 'approved_external_services | []', 'demo e2e readiness doc');
passAssertion('approved_external_services_empty');

if (!fs.existsSync(path.join(root, evidenceFixturePath))) {
  fail(`missing structured evidence fixture: ${evidenceFixturePath}`);
}
passAssertion('structured_evidence_fixture_present');

const evidenceFixture = readJson(evidenceFixturePath);
if (evidenceFixture.source_of_truth_before_run !== SOURCE_OF_TRUTH_COMMIT) {
  fail('evidence fixture source_of_truth_before_run must be 17abae0');
}
if (evidenceFixture.exact_command_approved_by_jason !== EXACT_COMMAND) {
  fail('evidence fixture exact_command_approved_by_jason mismatch');
}
if (evidenceFixture.command_execution_type !== COMMAND_EXECUTION_TYPE) {
  fail('evidence fixture command_execution_type mismatch');
}
if (evidenceFixture.decision.decision !== DECISION) {
  fail('evidence fixture decision must be PASS LOCAL DRY-RUN REVIEW');
}
if (evidenceFixture.safety_boundary.activation_occurred !== false) {
  fail('evidence fixture activation_occurred must be false');
}
if (evidenceFixture.safety_boundary.external_calls_occurred !== false) {
  fail('evidence fixture external_calls_occurred must be false');
}
if (evidenceFixture.demo_roofer_bundle_reference.fake_homeowner_lead_count !== 25) {
  fail('evidence fixture fake_homeowner_lead_count must be 25');
}
if (evidenceFixture.demo_roofer_bundle_reference.e2e_scenario_count !== 25) {
  fail('evidence fixture e2e_scenario_count must be 25');
}
if (evidenceFixture.demo_roofer_bundle_reference.expected_outcome_count !== 25) {
  fail('evidence fixture expected_outcome_count must be 25');
}
if (evidenceFixture.demo_roofer_bundle_reference.fake_company_name !== FAKE_COMPANY_NAME) {
  fail('evidence fixture fake_company_name mismatch');
}
if (evidenceFixture.activation_approval_status !== 'not_granted') {
  fail('evidence fixture activation_approval_status must be not_granted');
}
if (evidenceFixture.production_data_touched !== false) {
  fail('evidence fixture production_data_touched must be false');
}

for (const [label, fixturePath] of Object.entries(fixtureFiles)) {
  if (!fs.existsSync(path.join(root, fixturePath))) {
    fail(`missing fixture file (${label}): ${fixturePath}`);
  }
}

const leads = readJson(fixtureFiles.leads);
const scenarios = readJson(fixtureFiles.scenarios);
const outcomes = readJson(fixtureFiles.outcomes);
if (!leads.fake_homeowner_leads || leads.fake_homeowner_leads.length !== 25) {
  fail('demo roofer bundle must have 25 fake homeowner leads');
}
if (!scenarios.scenarios || scenarios.scenarios.length < 25) {
  fail('demo roofer bundle must have at least 25 E2E scenarios');
}
if (!outcomes.expected_outcomes || outcomes.expected_outcomes.length !== 25) {
  fail('demo roofer bundle must have 25 expected outcomes');
}

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(combinedDocs, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(combinedDocs)) fail(`unsafe pattern ${pattern} found in documentation`);
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}

const syntax = spawnSync(process.execPath, ['--check', path.join(root, verifierPath)], {
  cwd: root,
  encoding: 'utf8',
});
if (syntax.status !== 0) {
  fail(`verifier syntax check failed: ${syntax.stderr || syntax.stdout}`);
}
console.log('PASS: verifier syntax check succeeded.');

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
  'verify-native-workflow-fixture-post-run-evidence-and-demo-e2e-readiness-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Post-Run Evidence and Demo E2E Readiness',
  'aggregate readiness',
);
mustHave(verifierIndex, postRunEvidenceDocPath, 'verifier index');
mustHave(verifierIndex, demoE2eReadinessDocPath, 'verifier index');
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
mustHave(wrapper, 'local fake-data', 'wrapper mode');
mustHave(wrapper, 'review-only', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}
passAssertion('dry_run_wrapper_present_and_safe');

console.log(
  `PASS: Native Workflow Fixture Post-Run Evidence and Demo E2E Readiness verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);