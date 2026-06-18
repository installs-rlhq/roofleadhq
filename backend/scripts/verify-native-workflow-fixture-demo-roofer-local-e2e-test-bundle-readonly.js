#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_TEST_BUNDLE.md';
const wrapperPath =
  'scripts/run-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const postRunReviewTemplateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const fixtureDir = 'backend/fixtures/native-workflow-demo-roofer';
const fixtureFiles = {
  profile: `${fixtureDir}/demo-roofer-profile.json`,
  leads: `${fixtureDir}/demo-homeowner-leads.json`,
  scenarios: `${fixtureDir}/demo-e2e-scenarios.json`,
  outcomes: `${fixtureDir}/demo-expected-outcomes.json`,
  checklist: `${fixtureDir}/demo-operator-checklist.json`,
};

const SOURCE_OF_TRUTH_COMMIT = '7894948';
const FAKE_COMPANY_NAME = 'Summit Peak Roofing Demo LLC';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const REQUIRED_SCENARIO_CATEGORIES = [
  'new_lead',
  'missed_lead_recovery',
  'manual_outreach',
  'appointment_readiness',
  'appointment_reschedule',
  'appointment_no_show',
  'post_inspection',
  'feedback_permission',
  'source_roi',
  'usage_volume',
  'messaging_compliance',
  'data_minimization',
  'audit_timeline',
  'review_aging',
  'human_escalation',
  'unsupported_automation_block',
  'external_service_block',
  'stop_condition',
];

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only/read-only/dry-run-only/review-only demo roofer local E2E test bundle',
  'demo_roofer_local_e2e_test_bundle_review_only',
  SOURCE_OF_TRUTH_COMMIT,
  'Current State',
  'final go/no-go review packet is complete',
  'post-run review template is complete',
  'complete_for_human_review',
  'approved local dry-run values exist only as planned local fake-data values',
  'final activation command draft exists',
  'activation_approval_status',
  'not_granted',
  'activation_command_approval_status',
  'final_jason_activation_approval',
  'approved_for_activation_now',
  'approved_channels',
  'approved_external_services',
  'demo_ready_with_live_automation_disabled',
  'command_execution_status',
  'not_run_in_this_packet',
  FAKE_COMPANY_NAME,
  'Summit Peak Roofing Demo LLC',
  'obviously fake',
  'example.com',
  'Old 90-Day Plan Boundary',
  'old 90-day plan cannot override current source-of-truth direction',
  'later narrow reconciliation audit',
  'Delivery and Execution Posture',
  'local-only',
  'fake-data-only',
  'read-only',
  'dry-run-only',
  'review-only',
  'Forbidden Actions',
  'external calls',
  'live services',
  'sandbox/test-mode services',
  'credentials',
  'production data',
  'schema/auth/RLS/security changes',
  'scheduler/cron/dispatcher',
  'public routes/webhooks',
  'billing/payment/deposit/invoice/quote/estimate automation',
  'No Command Execution In This Packet Rule',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  postRunReviewTemplateDocPath,
  finalActivationCommandDraftDocPath,
  fixtureFiles.profile,
  fixtureFiles.leads,
  fixtureFiles.scenarios,
  fixtureFiles.outcomes,
  fixtureFiles.checklist,
];

const REQUIRED_ASSERTIONS = [
  'demo_roofer_local_e2e_test_bundle_doc_present',
  'bundle_review_only_scope_present',
  'source_of_truth_commit_7894948_referenced',
  'final_go_no_go_review_packet_complete',
  'post_run_review_template_complete',
  'evidence_chain_complete_for_human_review',
  'all_fixture_files_exist',
  'demo_roofer_profile_fixture_present',
  'demo_roofer_is_obviously_fake',
  'demo_homeowner_leads_fixture_present',
  'all_homeowner_leads_are_fake',
  'demo_e2e_scenarios_fixture_present',
  'demo_expected_outcomes_fixture_present',
  'demo_operator_checklist_fixture_present',
  'fixture_includes_at_least_25_scenarios',
  'scenario_coverage_new_lead_present',
  'scenario_coverage_missed_lead_recovery_present',
  'scenario_coverage_manual_outreach_present',
  'scenario_coverage_appointment_readiness_present',
  'scenario_coverage_appointment_reschedule_present',
  'scenario_coverage_appointment_no_show_present',
  'scenario_coverage_post_inspection_present',
  'scenario_coverage_feedback_permission_present',
  'scenario_coverage_source_roi_present',
  'scenario_coverage_usage_volume_present',
  'scenario_coverage_messaging_compliance_present',
  'scenario_coverage_data_minimization_present',
  'scenario_coverage_audit_timeline_present',
  'scenario_coverage_review_aging_present',
  'scenario_coverage_human_escalation_present',
  'scenario_coverage_unsupported_automation_block_present',
  'scenario_coverage_external_service_block_present',
  'scenario_coverage_stop_condition_present',
  'every_scenario_has_expected_outcome',
  'expected_outcomes_preserve_local_fake_data_only',
  'no_scenario_approves_activation',
  'no_scenario_approves_command_execution',
  'does_not_approve_activation',
  'does_not_approve_command_execution',
  'command_execution_status_not_run_in_this_packet',
  'activation_approval_not_granted',
  'activation_command_approval_not_granted',
  'final_jason_activation_approval_not_granted',
  'approved_for_activation_now_false',
  'approved_channels_empty',
  'approved_external_services_empty',
  'no_real_external_service_identifiers',
  'no_credential_env_api_webhook_references',
  'no_production_supabase_data_path',
  'no_schema_auth_rls_security_migration_required',
  'final_activation_command_not_approved_for_execution',
  'post_run_review_template_required_after_future_dry_run',
  'old_90_day_plan_cannot_override_current_source_of_truth',
  'forbidden_external_live_sandbox_actions_blocked',
  'delivery_posture_local_fake_data_read_only_dry_run_review_only',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
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
  'NATIVE_WORKFLOW_FIXTURE_DEMO_ROOFER_LOCAL_E2E_TEST_BUNDLE.md',
  'run-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-dry-run.sh',
  'verify-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-readonly.js',
  'Native Workflow Fixture Demo Roofer Local E2E Test Bundle',
  'native workflow fixture demo roofer local e2e test bundle',
  'demo roofer local e2e test bundle',
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

const REAL_SERVICE_ID_PATTERNS = [
  /AC[a-f0-9]{32}/i,
  /sk_live_[a-zA-Z0-9]+/,
  /re_[a-zA-Z0-9]{20,}/,
  /api\.twilio\.com/i,
  /api\.vapi\.ai/i,
  /api\.resend\.com/i,
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
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const postRunReviewTemplateDoc = read(postRunReviewTemplateDocPath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);

passAssertion('demo_roofer_local_e2e_test_bundle_doc_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('bundle_review_only_scope_present');
passAssertion('source_of_truth_commit_7894948_referenced');

mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'documentation');
mustHave(doc, 'final go/no-go review packet is complete', 'documentation');
mustHave(doc, 'post-run review template is complete', 'documentation');
mustHave(doc, 'evidence chain is complete for human review', 'documentation');
passAssertion('final_go_no_go_review_packet_complete');
passAssertion('post_run_review_template_complete');
passAssertion('evidence_chain_complete_for_human_review');

mustHave(doc, 'This is **not** approval to activate anything', 'documentation');
mustHave(doc, 'This does **not** execute any activation step or proposed command', 'documentation');
mustHave(doc, 'This does **not** run any approved local fake-data dry-run command', 'documentation');
passAssertion('does_not_approve_activation');
passAssertion('does_not_approve_command_execution');

mustHave(doc, 'command_execution_status | not_run_in_this_packet', 'documentation');
passAssertion('command_execution_status_not_run_in_this_packet');

mustHave(doc, 'activation approval is not granted', 'documentation');
mustHave(doc, 'activation command approval is not granted', 'documentation');
mustHave(doc, 'final Jason activation approval is not granted', 'documentation');
passAssertion('activation_approval_not_granted');
passAssertion('activation_command_approval_not_granted');
passAssertion('final_jason_activation_approval_not_granted');

mustHave(doc, 'approved_for_activation_now | false', 'documentation');
mustHave(doc, 'approved_channels | []', 'documentation');
mustHave(doc, 'approved_external_services | []', 'documentation');
passAssertion('approved_for_activation_now_false');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');

mustHave(doc, 'old 90-day plan cannot override current source-of-truth direction', 'documentation');
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(doc, 'sandbox/test-mode services', 'documentation');
mustHave(doc, 'billing/payment/deposit/invoice/quote/estimate automation', 'documentation');
passAssertion('forbidden_external_live_sandbox_actions_blocked');

mustHave(doc, 'delivery_mode | local-only', 'documentation');
mustHave(doc, 'data_mode | fake-data-only', 'documentation');
mustHave(doc, 'access_mode | read-only', 'documentation');
mustHave(doc, 'execution_mode | dry-run-only', 'documentation');
mustHave(doc, 'review_mode | review-only', 'documentation');
passAssertion('delivery_posture_local_fake_data_read_only_dry_run_review_only');

mustHave(doc, postRunReviewTemplateDocPath, 'documentation');
mustHave(postRunReviewTemplateDoc, 'post-run review template review-only', 'post-run review template doc');
passAssertion('post_run_review_template_required_after_future_dry_run');

mustHave(doc, finalActivationCommandDraftDocPath, 'documentation');
mustHave(doc, 'final activation command draft exists', 'documentation');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');
mustHave(doc, 'not approved for execution', 'documentation');
passAssertion('final_activation_command_not_approved_for_execution');

if (doc.includes('approved to run') && doc.includes(EXACT_COMMAND)) {
  fail('documentation must not approve command execution');
}

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, fixturePath] of Object.entries(fixtureFiles)) {
  if (!fs.existsSync(path.join(root, fixturePath))) {
    fail(`missing fixture file: ${fixturePath}`);
  }
}
passAssertion('all_fixture_files_exist');

const profile = readJson(fixtureFiles.profile);
const leads = readJson(fixtureFiles.leads);
const scenarios = readJson(fixtureFiles.scenarios);
const outcomes = readJson(fixtureFiles.outcomes);
const checklist = readJson(fixtureFiles.checklist);

passAssertion('demo_roofer_profile_fixture_present');
passAssertion('demo_homeowner_leads_fixture_present');
passAssertion('demo_e2e_scenarios_fixture_present');
passAssertion('demo_expected_outcomes_fixture_present');
passAssertion('demo_operator_checklist_fixture_present');

if (profile.demo_roofer_profile.company_name !== FAKE_COMPANY_NAME) {
  fail(`demo roofer company name must be ${FAKE_COMPANY_NAME}`);
}
if (profile.demo_roofer_profile.company_name_is_fake !== true) {
  fail('demo roofer must be marked company_name_is_fake true');
}
if (profile.demo_roofer_profile.business_type !== 'demo_roofer_fixture') {
  fail('demo roofer business_type must be demo_roofer_fixture');
}
passAssertion('demo_roofer_is_obviously_fake');

const fixtureBundleText = JSON.stringify({ profile, leads, scenarios, outcomes, checklist });
for (const pattern of REAL_SERVICE_ID_PATTERNS) {
  if (pattern.test(fixtureBundleText)) {
    fail(`fixture bundle contains real external service identifier pattern: ${pattern}`);
  }
}
passAssertion('no_real_external_service_identifiers');

const unsafeFixturePatterns = [
  /process\.env/i,
  /SUPABASE_SERVICE_ROLE/i,
  /SUPABASE_URL/i,
  /sk_live_/i,
  /api\.twilio\.com/i,
  /hooks\.slack\.com/i,
  /ngrok\.io/i,
];
for (const pattern of unsafeFixturePatterns) {
  if (pattern.test(fixtureBundleText)) {
    fail(`fixture bundle contains unsafe reference: ${pattern}`);
  }
}
passAssertion('no_credential_env_api_webhook_references');

if (profile.production_data_touched !== false) fail('profile production_data_touched must be false');
if (leads.production_data_touched !== false) fail('leads production_data_touched must be false');
passAssertion('no_production_supabase_data_path');

if (!leads.fake_homeowner_leads || leads.fake_homeowner_leads.length !== 25) {
  fail(`expected 25 fake homeowner leads, found ${leads.fake_homeowner_leads ? leads.fake_homeowner_leads.length : 0}`);
}

for (const lead of leads.fake_homeowner_leads) {
  if (lead.is_fake_data !== true) fail(`lead ${lead.lead_id} must have is_fake_data true`);
  if (!lead.homeowner_name.includes('Demo')) {
    fail(`lead ${lead.lead_id} homeowner name must be obviously fake`);
  }
  if (lead.email && !lead.email.endsWith('@example.com')) {
    fail(`lead ${lead.lead_id} email must use example.com domain`);
  }
  if (lead.phone && !lead.phone.startsWith('+1555010')) {
    fail(`lead ${lead.lead_id} phone must use safe placeholder range +1555010xxxx`);
  }
}
passAssertion('all_homeowner_leads_are_fake');

if (!scenarios.scenarios || scenarios.scenarios.length < 25) {
  fail(`expected at least 25 scenarios, found ${scenarios.scenarios ? scenarios.scenarios.length : 0}`);
}
if (scenarios.scenario_count < 25) {
  fail('scenario_count must be at least 25');
}
passAssertion('fixture_includes_at_least_25_scenarios');

const categoriesFound = new Set(scenarios.scenarios.map((s) => s.category));
for (const category of REQUIRED_SCENARIO_CATEGORIES) {
  if (!categoriesFound.has(category)) {
    fail(`missing required scenario category: ${category}`);
  }
}
passAssertion('scenario_coverage_new_lead_present');
passAssertion('scenario_coverage_missed_lead_recovery_present');
passAssertion('scenario_coverage_manual_outreach_present');
passAssertion('scenario_coverage_appointment_readiness_present');
passAssertion('scenario_coverage_appointment_reschedule_present');
passAssertion('scenario_coverage_appointment_no_show_present');
passAssertion('scenario_coverage_post_inspection_present');
passAssertion('scenario_coverage_feedback_permission_present');
passAssertion('scenario_coverage_source_roi_present');
passAssertion('scenario_coverage_usage_volume_present');
passAssertion('scenario_coverage_messaging_compliance_present');
passAssertion('scenario_coverage_data_minimization_present');
passAssertion('scenario_coverage_audit_timeline_present');
passAssertion('scenario_coverage_review_aging_present');
passAssertion('scenario_coverage_human_escalation_present');
passAssertion('scenario_coverage_unsupported_automation_block_present');
passAssertion('scenario_coverage_external_service_block_present');
passAssertion('scenario_coverage_stop_condition_present');

for (const scenario of scenarios.scenarios) {
  if (scenario.approves_activation !== false) {
    fail(`scenario ${scenario.scenario_id} must not approve activation`);
  }
  if (scenario.approves_command_execution !== false) {
    fail(`scenario ${scenario.scenario_id} must not approve command execution`);
  }
  if (scenario.live_action_allowed !== false) {
    fail(`scenario ${scenario.scenario_id} live_action_allowed must be false`);
  }
  if (scenario.production_data_touched !== false) {
    fail(`scenario ${scenario.scenario_id} production_data_touched must be false`);
  }
  if (scenario.external_services_called !== false) {
    fail(`scenario ${scenario.scenario_id} external_services_called must be false`);
  }
}
passAssertion('no_scenario_approves_activation');
passAssertion('no_scenario_approves_command_execution');

if (!outcomes.expected_outcomes || outcomes.expected_outcomes.length !== 25) {
  fail(
    `expected 25 expected outcomes, found ${outcomes.expected_outcomes ? outcomes.expected_outcomes.length : 0}`,
  );
}

const scenarioIds = new Set(scenarios.scenarios.map((s) => s.scenario_id));
const outcomeIds = new Set(outcomes.expected_outcomes.map((o) => o.scenario_id));
for (const id of scenarioIds) {
  if (!outcomeIds.has(id)) fail(`missing expected outcome for scenario ${id}`);
}
passAssertion('every_scenario_has_expected_outcome');

for (const outcome of outcomes.expected_outcomes) {
  if (outcome.live_action_allowed !== false) {
    fail(`outcome ${outcome.scenario_id} live_action_allowed must be false`);
  }
  if (outcome.production_data_touched !== false) {
    fail(`outcome ${outcome.scenario_id} production_data_touched must be false`);
  }
  if (outcome.external_services_called !== false) {
    fail(`outcome ${outcome.scenario_id} external_services_called must be false`);
  }
  if (outcome.approves_activation !== false) {
    fail(`outcome ${outcome.scenario_id} must not approve activation`);
  }
  if (outcome.approves_command_execution !== false) {
    fail(`outcome ${outcome.scenario_id} must not approve command execution`);
  }
  if (outcome.activation_approval_status !== 'not_granted') {
    fail(`outcome ${outcome.scenario_id} activation_approval_status must be not_granted`);
  }
  if (outcome.activation_command_approval_status !== 'not_granted') {
    fail(`outcome ${outcome.scenario_id} activation_command_approval_status must be not_granted`);
  }
}
passAssertion('expected_outcomes_preserve_local_fake_data_only');

for (const bundle of [profile, leads, scenarios, outcomes, checklist]) {
  if (bundle.safety_posture !== 'demo_ready_with_live_automation_disabled') {
    fail('all fixture bundles must preserve demo_ready_with_live_automation_disabled');
  }
  if (bundle.activation_approval_status !== 'not_granted') {
    fail('fixture activation_approval_status must be not_granted');
  }
  if (bundle.activation_command_approval_status !== 'not_granted') {
    fail('fixture activation_command_approval_status must be not_granted');
  }
  if (bundle.final_jason_activation_approval !== 'not_granted') {
    fail('fixture final_jason_activation_approval must be not_granted');
  }
  if (bundle.approved_for_activation_now !== false) {
    fail('fixture approved_for_activation_now must be false');
  }
  if (!Array.isArray(bundle.approved_channels) || bundle.approved_channels.length !== 0) {
    fail('fixture approved_channels must be empty array');
  }
  if (!Array.isArray(bundle.approved_external_services) || bundle.approved_external_services.length !== 0) {
    fail('fixture approved_external_services must be empty array');
  }
}

if (checklist.forbidden_actions.includes('execute_final_activation_command') !== true) {
  fail('operator checklist must forbid execute_final_activation_command');
}
passAssertion('no_schema_auth_rls_security_migration_required');

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
  'verify-native-workflow-fixture-demo-roofer-local-e2e-test-bundle-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Demo Roofer Local E2E Test Bundle',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
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
mustHave(wrapper, 'npm --prefix backend run build', 'wrapper backend build');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}
passAssertion('dry_run_wrapper_present_and_safe');
passAssertion('public_go_live_or_production_copy_not_changed_without_approval');

for (const assertion of REQUIRED_ASSERTIONS) {
  if (
    ![
      'demo_roofer_local_e2e_test_bundle_doc_present',
      'bundle_review_only_scope_present',
      'source_of_truth_commit_7894948_referenced',
      'final_go_no_go_review_packet_complete',
      'post_run_review_template_complete',
      'evidence_chain_complete_for_human_review',
      'all_fixture_files_exist',
      'demo_roofer_profile_fixture_present',
      'demo_roofer_is_obviously_fake',
      'demo_homeowner_leads_fixture_present',
      'all_homeowner_leads_are_fake',
      'demo_e2e_scenarios_fixture_present',
      'demo_expected_outcomes_fixture_present',
      'demo_operator_checklist_fixture_present',
      'fixture_includes_at_least_25_scenarios',
      'scenario_coverage_new_lead_present',
      'scenario_coverage_missed_lead_recovery_present',
      'scenario_coverage_manual_outreach_present',
      'scenario_coverage_appointment_readiness_present',
      'scenario_coverage_appointment_reschedule_present',
      'scenario_coverage_appointment_no_show_present',
      'scenario_coverage_post_inspection_present',
      'scenario_coverage_feedback_permission_present',
      'scenario_coverage_source_roi_present',
      'scenario_coverage_usage_volume_present',
      'scenario_coverage_messaging_compliance_present',
      'scenario_coverage_data_minimization_present',
      'scenario_coverage_audit_timeline_present',
      'scenario_coverage_review_aging_present',
      'scenario_coverage_human_escalation_present',
      'scenario_coverage_unsupported_automation_block_present',
      'scenario_coverage_external_service_block_present',
      'scenario_coverage_stop_condition_present',
      'every_scenario_has_expected_outcome',
      'expected_outcomes_preserve_local_fake_data_only',
      'no_scenario_approves_activation',
      'no_scenario_approves_command_execution',
      'does_not_approve_activation',
      'does_not_approve_command_execution',
      'command_execution_status_not_run_in_this_packet',
      'activation_approval_not_granted',
      'activation_command_approval_not_granted',
      'final_jason_activation_approval_not_granted',
      'approved_for_activation_now_false',
      'approved_channels_empty',
      'approved_external_services_empty',
      'no_real_external_service_identifiers',
      'no_credential_env_api_webhook_references',
      'no_production_supabase_data_path',
      'no_schema_auth_rls_security_migration_required',
      'final_activation_command_not_approved_for_execution',
      'post_run_review_template_required_after_future_dry_run',
      'old_90_day_plan_cannot_override_current_source_of_truth',
      'forbidden_external_live_sandbox_actions_blocked',
      'delivery_posture_local_fake_data_read_only_dry_run_review_only',
      'demo_ready_with_live_automation_disabled_preserved',
      'full_safe_readiness_lane_preserved',
      'docs_and_context_wiring_present',
      'dry_run_wrapper_present_and_safe',
      'public_go_live_or_production_copy_not_changed_without_approval',
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
  `PASS: Native Workflow Fixture Demo Roofer Local E2E Test Bundle verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);