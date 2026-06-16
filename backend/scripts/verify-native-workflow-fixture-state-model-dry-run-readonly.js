#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

function read(p) {
  const full = path.join(root, p);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: ${p}`);
  return fs.readFileSync(full, 'utf8');
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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-state-model-dry-run.sh';
const verifierPath = 'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const doc = read(docPath);
const runner = read(runnerPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);

console.log('PASS: required doc exists.');
console.log('PASS: runner exists.');
console.log('PASS: dry-run wrapper exists.');

const syntaxRunner = spawnSync(process.execPath, ['--check', path.join(root, runnerPath)], {
  cwd: root,
  encoding: 'utf8',
});
if (syntaxRunner.status !== 0) {
  fail(`runner syntax check failed: ${syntaxRunner.stderr || syntaxRunner.stdout}`);
}
console.log('PASS: runner syntax check succeeded.');

const runResult = spawnSync(process.execPath, [path.join(root, runnerPath)], {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 16 * 1024 * 1024,
});
if (runResult.status !== 0) {
  fail(`runner execution failed: ${runResult.stderr || runResult.stdout}`);
}

let output;
try {
  output = JSON.parse(runResult.stdout);
} catch (err) {
  fail(`runner did not produce valid JSON: ${err.message}`);
}
console.log('PASS: runner produces valid JSON.');

mustHave(JSON.stringify(output), 'native_workflow_fixture_state_model_dry_run', 'runner output');
console.log('PASS: output includes dry_run_name.');

if (output.safety_posture !== 'demo_ready_with_live_automation_disabled') {
  fail('output does not preserve demo_ready_with_live_automation_disabled');
}
console.log('PASS: output preserves demo_ready_with_live_automation_disabled.');

const requiredFlags = [
  'live_sms_enabled',
  'live_vapi_calls_enabled',
  'live_resend_email_enabled',
  'live_calendar_booking_enabled',
  'live_lindy_bridge_enabled',
  'live_scheduler_enabled',
  'live_csv_export_enabled',
  'live_crm_handoff_enabled',
  'live_payment_or_invoice_enabled',
];
for (const flag of requiredFlags) {
  if (!(flag in (output.activation_flags || {}))) {
    fail(`output missing activation flag: ${flag}`);
  }
  if (output.activation_flags[flag] !== false) {
    fail(`activation flag ${flag} is not false by default`);
  }
}
console.log('PASS: output includes all required activation flags default false.');

if (!output.scenarios || output.scenarios.length < 25) {
  fail(`output must include at least 25 scenarios (found ${output.scenarios ? output.scenarios.length : 0})`);
}
console.log('PASS: output includes at least 25 scenarios.');

const requiredScenarioIds = [
  'normal_lead_to_appointment_readiness',
  'missing_information_path',
  'duplicate_review_path',
  'bad_fit_excluded_path',
  'stopped_do_not_contact_path',
  'missed_lead_recovery_path',
  'roofer_review_needed_path',
  'roofleadhq_system_review_needed_path',
  'appointment_booked_path',
  'inspection_completed_path',
  'inspection_missed_reschedule_path',
  'post_inspection_still_open_path',
  'estimate_needed_estimate_sent_tracking_path',
  'homeowner_follow_up_needed_path',
  'roofer_follow_up_needed_path',
  'feedback_permission_yes_path',
  'feedback_permission_no_path',
  'feedback_permission_not_asked_path',
  'csv_report_snapshot_fake_data_path',
  'starter_plan_profile_path',
  'growth_plan_profile_path',
  'elite_plan_profile_path',
  'custom_review_500_plus_leads_path',
  'custom_review_two_plus_locations_path',
  'activation_flag_false_blocks_live_action_path',
];

const byId = {};
for (const scenario of output.scenarios) {
  byId[scenario.scenario_id] = scenario;
}

for (const id of requiredScenarioIds) {
  if (!byId[id]) fail(`missing required scenario_id: ${id}`);
}
console.log('PASS: all 25 required scenario IDs are present.');

for (const scenario of output.scenarios) {
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (scenario.production_data_touched !== 'no') {
    fail(`scenario ${scenario.scenario_id} production_data_touched is not no`);
  }
  if (scenario.external_services_called !== 'no') {
    fail(`scenario ${scenario.scenario_id} external_services_called is not no`);
  }
  if (!scenario.final_state) fail(`scenario ${scenario.scenario_id} missing final_state`);
  if (!scenario.transition_log || !scenario.transition_log.length) {
    fail(`scenario ${scenario.scenario_id} missing transition_log`);
  }
  if (!scenario.guard_results || !scenario.guard_results.length) {
    fail(`scenario ${scenario.scenario_id} missing guard_results`);
  }
  if (!scenario.audit_events || !scenario.audit_events.length) {
    fail(`scenario ${scenario.scenario_id} missing audit_events`);
  }
  if (!scenario.guard_assertions || !scenario.guard_assertions.length) {
    fail(`scenario ${scenario.scenario_id} missing guard_assertions`);
  }
  if (!Array.isArray(scenario.failed_guards)) {
    fail(`scenario ${scenario.scenario_id} missing failed_guards array`);
  }
  if (scenario.result !== 'PASS') {
    fail(`scenario ${scenario.scenario_id} result is not PASS`);
  }
}
console.log('PASS: every scenario has required safety fields and PASS result.');

if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
if (typeof output.total_guard_assertions !== 'number' || output.total_guard_assertions <= 0) {
  fail('output missing or invalid total_guard_assertions');
}
if (typeof output.passed_guard_assertions !== 'number') {
  fail('output missing passed_guard_assertions');
}
if (typeof output.failed_guard_assertions !== 'number') {
  fail('output missing failed_guard_assertions');
}
if (!output.guard_categories) {
  fail('output missing guard_categories');
}
console.log('PASS: output includes guard assertion summary and aggregate guard fields.');

if (byId.normal_lead_to_appointment_readiness.final_state !== 'APPOINTMENT_READY') {
  fail('normal lead path final state is not APPOINTMENT_READY');
}
console.log('PASS: normal lead path final state is APPOINTMENT_READY.');

const missingFinal = byId.missing_information_path.final_state;
if (missingFinal !== 'MISSING_INFO' && missingFinal !== 'HOLD') {
  fail(`missing info path final state is ${missingFinal}, expected MISSING_INFO or HOLD`);
}
console.log('PASS: missing info path routes to MISSING_INFO or HOLD.');

if (byId.stopped_do_not_contact_path.final_state !== 'STOPPED_DO_NOT_CONTACT') {
  fail('do-not-contact path does not route to STOPPED_DO_NOT_CONTACT');
}
console.log('PASS: do-not-contact path routes to STOPPED_DO_NOT_CONTACT.');

const custom500 = byId.custom_review_500_plus_leads_path.final_state;
if (custom500 !== 'CUSTOM_REVIEW_REQUIRED' && custom500 !== 'HOLD') {
  fail(`custom review 500+ path final state is ${custom500}`);
}
const customLoc = byId.custom_review_two_plus_locations_path.final_state;
if (customLoc !== 'CUSTOM_REVIEW_REQUIRED' && customLoc !== 'HOLD') {
  fail(`custom review 2+ locations path final state is ${customLoc}`);
}
console.log('PASS: custom review paths route to CUSTOM_REVIEW_REQUIRED or HOLD.');

const activationScenario = byId.activation_flag_false_blocks_live_action_path;
const activationFinal = activationScenario.final_state;
if (activationFinal !== 'HOLD' && activationFinal !== 'BLOCKED') {
  fail(`activation flag false path final state is ${activationFinal}`);
}
const auditText = JSON.stringify(activationScenario.audit_events);
if (!auditText.includes('blocked_by_activation_flag')) {
  fail('activation flag false path missing blocked_by_activation_flag audit note');
}
console.log('PASS: activation flag false path blocks live action.');

const rooferReview = byId.roofer_review_needed_path.review_queue_items || [];
if (!rooferReview.some((item) => item.review_owner === 'roofer')) {
  fail('roofer review scenario missing roofer/contractor review item');
}
console.log('PASS: roofer review scenario creates roofer review item.');

const systemReview = byId.roofleadhq_system_review_needed_path.review_queue_items || [];
if (!systemReview.some((item) => item.review_owner === 'roofleadhq_jason')) {
  fail('RoofLeadHQ system review scenario missing RoofLeadHQ/Jason review item');
}
console.log('PASS: RoofLeadHQ system review scenario creates system review item.');

for (const id of [
  'feedback_permission_yes_path',
  'feedback_permission_no_path',
  'feedback_permission_not_asked_path',
]) {
  if (!byId[id]) fail(`missing feedback scenario: ${id}`);
}
const feedbackJson = JSON.stringify([
  byId.feedback_permission_yes_path,
  byId.feedback_permission_no_path,
  byId.feedback_permission_not_asked_path,
]);
if (
  !feedbackJson.includes('permission_to_use_publicly') ||
  !feedbackJson.includes('yes') ||
  !feedbackJson.includes('no') ||
  !feedbackJson.includes('not_asked')
) {
  fail('feedback scenarios missing permission_to_use_publicly yes/no/not_asked');
}
if (/["']permissiontousepublicly["']\s*:/.test(feedbackJson)) {
  fail('permissiontousepublicly field name must be absent');
}
console.log('PASS: feedback yes/no/not_asked scenarios and permission field naming.');

const csvScenario = byId.csv_report_snapshot_fake_data_path;
if (!csvScenario.reporting_snapshot || !csvScenario.csv_snapshot_if_applicable) {
  fail('CSV/report fake snapshot is not present');
}
const reportingFields = [
  'report_period',
  'generated_from',
  'fake_data_only',
  'total_leads',
  'appointment_booked',
  'inspection_completed',
  'still_open',
  'roofer_review_needed',
  'roofleadhq_review_needed',
  'feedback_captured',
  'csv_export_state',
  'live_delivery_blocked_by_activation_flag',
  'production_data_touched',
  'external_services_called',
];
for (const field of reportingFields) {
  if (!(field in csvScenario.reporting_snapshot)) {
    fail(`reporting snapshot missing ${field}`);
  }
}
const csvSnap = csvScenario.csv_snapshot_if_applicable;
if (!csvSnap.header_row || !csvSnap.sample_rows || !csvSnap.sample_rows.length) {
  fail('csv snapshot missing header_row or sample_rows');
}
const csvBoundaryFields = [
  'one_directional_export',
  'native_crm_sync',
  'pushes_data_back_to_roofleadhq',
  'auto_updates_from_downloaded_file',
  'fake_data_only',
  'contains_homeowner_personal_information',
  'customer_responsible_for_downloaded_exported_data',
];
for (const field of csvBoundaryFields) {
  if (!(field in csvSnap)) {
    fail(`csv snapshot missing boundary field ${field}`);
  }
}
if (csvSnap.native_crm_sync !== false) fail('csv native_crm_sync must be false');
if (csvSnap.one_directional_export !== true) fail('csv one_directional_export must be true');
const sampleRow = csvSnap.sample_rows[0];
const csvRowFields = [
  'lead_id',
  'homeowner_name',
  'permission_to_use_publicly',
  'calendar_owner',
];
for (const field of csvRowFields) {
  if (!(field in sampleRow)) {
    fail(`csv sample row missing ${field}`);
  }
}
if (JSON.stringify(sampleRow).includes('Jason-RLHQ')) {
  fail('csv calendar_owner must not use Jason-RLHQ');
}
console.log('PASS: CSV/report fake snapshot is present.');

mustHave(doc, 'CSV is one-directional reporting', 'documentation');
mustHave(doc, 'not bidirectional CRM integration', 'documentation');
console.log('PASS: CSV not bidirectional CRM integration boundary documented.');

mustHave(doc, 'Local E2E Fixture Runner', 'documentation');
mustHave(doc, 'LOCAL_E2E_FIXTURE_RUNNER_PACKET.md', 'documentation');
console.log('PASS: documentation includes local E2E runner relationship.');

mustHave(doc, 'first paid roofer', 'documentation');
console.log('PASS: documentation includes first paid roofer relationship.');

const forbiddenPublic = [
  'booked jobs',
  'book jobs',
  'close jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  'guaranteed appointments',
  'automatic estimate',
  'automatic quote',
  'automatic invoice',
  'automatic payment',
  'native CRM sync',
  'fully autonomous',
  'fake reviews',
  'review farming',
  'automatic public review generation',
];
for (const phrase of forbiddenPublic) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}
console.log('PASS: forbidden public language is absent from documentation.');

const unsafePatterns = [
  /@supabase\/supabase-js/,
  /require\(['"]dotenv['"]\)/,
  /process\.env\.SUPABASE/i,
  /createClient\(/,
  /require\(['"]twilio['"]\)/i,
  /require\(['"]https['"]\)/,
  /require\(['"]http['"]\)/,
  /fetch\(/,
  /ALTER TABLE/,
  /CREATE TABLE/,
  /CREATE POLICY/,
];
for (const [label, file] of [
  ['runner', runner],
  ['wrapper', wrapper],
  ['documentation', doc],
]) {
  for (const pattern of unsafePatterns) {
    if (pattern.test(file)) {
      fail(`unsafe pattern ${pattern} found in ${label}`);
    }
  }
}
console.log('PASS: no unsafe imports or strings in runner/verifier/wrapper/docs.');

const safetyDocPhrases = [
  'no Supabase',
  'no schema',
  'no migrations',
  'no auth/RLS',
  'no production data',
  'no live automation',
  'no integrations',
  'no external calls',
  'no bidirectional CRM integration',
  'local fake-data dry-run only',
];
for (const phrase of safetyDocPhrases) {
  mustHave(doc, phrase, 'documentation safety boundaries');
}
console.log('PASS: safety/no-live/no-production/no-schema/no-integration boundaries documented.');

mustHave(aggregate, 'verify-native-workflow-fixture-state-model-dry-run-readonly.js', 'aggregate readiness');
mustHave(aggregate, 'Native Workflow Fixture State Model Dry-Run', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md',
  'run-native-workflow-fixture-state-model-dry-run.sh',
  'verify-native-workflow-fixture-state-model-dry-run-readonly.js',
  'Native Workflow Fixture State Model Dry-Run',
  'native workflow fixture state model dry-run',
  'fixture state model dry-run',
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextRooferDryRun, ref, 'next chat roofer dry run onboarding context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
console.log('PASS: required wiring into aggregate readiness and context docs is present.');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, 'run-native-workflow-fixture-state-model-dry-run.js', 'wrapper runner');
mustHave(wrapper, 'verify-native-workflow-fixture-state-model-dry-run-readonly.js', 'wrapper verifier');
console.log('PASS: dry-run wrapper references runner and verifier.');

const readiness = buildStatus();
const lindyCheck = readiness.checks.find((check) => check.name === 'Lindy live trigger');
if (readiness.live_automation?.lindy !== false) {
  fail('fixture dry-run must not be counted as live Lindy activation');
}
if ((lindyCheck?.matches || []).includes(runnerPath)) {
  fail('fixture dry-run runner must not appear in Lindy live trigger matches');
}
console.log('PASS: fixture dry-run runner is not counted as live Lindy activation.');

console.log('PASS: Native Workflow Fixture State Model Dry-Run is fixture-only, deterministic, and dry-run safe.');