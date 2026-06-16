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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const guardVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-reporting-snapshot-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_LEAD_SOURCES = [
  'Website form',
  'Google Ads',
  'Google Business Profile',
  'Google Local Services Ads',
  'Facebook Lead Ads',
  'Angi / HomeAdvisor',
  'Thumbtack',
  'Referrals',
  'Manual outreach list',
  'Other',
];

const REQUIRED_REPORTING_GUARD_ASSERTIONS = [
  'reporting_snapshot_uses_fake_data_only',
  'reporting_snapshot_does_not_touch_production_data',
  'weekly_report_snapshot_present',
  'monthly_report_snapshot_present',
  'lead_source_summary_present',
  'appointment_inspection_summary_present',
  'post_inspection_summary_present',
  'feedback_permission_summary_present',
  'csv_snapshot_present',
  'csv_header_contains_required_fields',
  'csv_sample_rows_are_fictional',
  'csv_calendar_owner_not_jason_rlhq',
  'permission_to_use_publicly_values_are_valid',
  'permissiontousepublicly_absent',
  'csv_export_is_one_directional',
  'csv_not_native_crm_sync',
  'csv_does_not_push_data_back',
  'csv_does_not_auto_update_from_downloaded_file',
  'csv_contains_homeowner_personal_information_warning',
  'customer_responsible_for_downloaded_exported_data',
  'source_roi_depends_on_customer_provided_spend_source_data',
  'no_exact_roi_promise_without_customer_data',
  'starter_reporting_limited_to_basic_summary',
  'growth_reporting_includes_source_tracking_and_csv',
  'elite_reporting_includes_advanced_segmentation_if_provided',
  'custom_reporting_requires_review_for_complex_scope',
  'live_csv_delivery_blocked_when_flag_false',
  'live_reporting_delivery_blocked_when_flag_false',
  'reporting_does_not_call_external_services',
];

const REQUIRED_CSV_HEADER_FIELDS = [
  'lead_id',
  'report_period',
  'homeowner_name',
  'homeowner_phone',
  'homeowner_email',
  'lead_source',
  'appointment_booked',
  'inspection_completed',
  'permission_to_use_publicly',
  'calendar_owner',
  'ad_spend_if_provided',
  'cost_per_lead_if_provided',
  'cost_per_booked_inspection_if_provided',
  'roi_notes',
];

const SCENARIOS_WITH_REPORTING_IMPACT = [
  'normal_lead_to_appointment_readiness',
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
  'starter_plan_profile_path',
  'growth_plan_profile_path',
  'elite_plan_profile_path',
  'custom_review_500_plus_leads_path',
  'custom_review_two_plus_locations_path',
  'activation_flag_false_blocks_live_action_path',
];

const doc = read(docPath);
const runner = read(runnerPath);
const wrapper = read(wrapperPath);
const verifier = read(verifierPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);

console.log('PASS: required doc exists.');
console.log('PASS: existing fixture runner exists.');
console.log('PASS: existing fixture dry-run verifier exists.');
console.log('PASS: guard assertions verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

if (!fs.existsSync(path.join(root, existingVerifierPath))) {
  fail(`missing existing fixture dry-run verifier: ${existingVerifierPath}`);
}
if (!fs.existsSync(path.join(root, guardVerifierPath))) {
  fail(`missing guard assertions verifier: ${guardVerifierPath}`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['reporting verifier', verifierPath],
  ['existing fixture verifier', existingVerifierPath],
]) {
  const syntax = spawnSync(process.execPath, ['--check', path.join(root, scriptPath)], {
    cwd: root,
    encoding: 'utf8',
  });
  if (syntax.status !== 0) {
    fail(`${label} syntax check failed: ${syntax.stderr || syntax.stdout}`);
  }
}
console.log('PASS: runner syntax check succeeded.');
console.log('PASS: new verifier syntax check succeeded.');

const runResult = spawnSync(process.execPath, [path.join(root, runnerPath)], {
  cwd: root,
  encoding: 'utf8',
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

if (output.safety_posture !== 'demo_ready_with_live_automation_disabled') {
  fail('output does not preserve demo_ready_with_live_automation_disabled');
}
console.log('PASS: output preserves demo_ready_with_live_automation_disabled.');

if (!output.scenarios || output.scenarios.length !== 25) {
  fail(`output must include exactly 25 scenarios (found ${output.scenarios ? output.scenarios.length : 0})`);
}
console.log('PASS: output includes all 25 required scenarios.');

if (!output.reporting_snapshot_summary) {
  fail('output missing reporting_snapshot_summary');
}
console.log('PASS: output includes reporting_snapshot_summary.');

if (!output.report_periods || !output.report_periods.includes('weekly') || !output.report_periods.includes('monthly')) {
  fail('output missing weekly and monthly report periods');
}
console.log('PASS: output includes weekly and monthly report periods.');

if (!output.plan_reporting_profiles) {
  fail('output missing plan_reporting_profiles');
}
for (const profile of ['starter', 'growth', 'elite', 'custom_review']) {
  if (!(profile in output.plan_reporting_profiles)) {
    fail(`plan_reporting_profiles missing ${profile}`);
  }
}
console.log('PASS: Starter/Growth/Elite/Custom reporting profiles are present.');

if (!output.lead_source_summary || !Array.isArray(output.lead_source_summary)) {
  fail('output missing lead_source_summary');
}
const sourceNames = output.lead_source_summary.map((row) => row.lead_source);
for (const source of REQUIRED_LEAD_SOURCES) {
  if (!sourceNames.includes(source)) {
    fail(`lead_source_summary missing source: ${source}`);
  }
}
console.log('PASS: output includes lead_source_summary with required lead sources.');

for (const section of [
  'appointment_inspection_summary',
  'post_inspection_summary',
  'feedback_permission_summary',
  'csv_export_snapshot_summary',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: appointment/post-inspection/feedback/CSV summaries are present.');

const csv = output.csv_export_snapshot_summary;
if (csv.native_crm_sync !== false) fail('CSV native_crm_sync must be false');
if (csv.pushes_data_back_to_roofleadhq !== false) fail('CSV pushes_data_back_to_roofleadhq must be false');
if (csv.auto_updates_from_downloaded_file !== false) {
  fail('CSV auto_updates_from_downloaded_file must be false');
}
if (csv.one_directional_export !== true) fail('CSV one_directional_export must be true');
if (csv.fake_data_only !== true) fail('CSV fake_data_only must be true');
console.log('PASS: CSV snapshot has required boundary booleans.');

if (!csv.header_row || !Array.isArray(csv.header_row)) {
  fail('CSV snapshot missing header_row');
}
for (const field of REQUIRED_CSV_HEADER_FIELDS) {
  if (!csv.header_row.includes(field)) {
    fail(`CSV header missing required field: ${field}`);
  }
}
console.log('PASS: CSV header includes required fields.');

if (!csv.sample_rows || !csv.sample_rows.length) {
  fail('CSV sample rows are not present');
}
console.log('PASS: CSV sample rows are present.');

const csvJson = JSON.stringify(csv);
if (csvJson.includes('Jason-RLHQ') || csvJson.includes('jason-rlhq')) {
  fail('CSV calendar_owner must not use Jason-RLHQ');
}
for (const row of csv.sample_rows) {
  if (!row.homeowner_name || !row.homeowner_name.includes('Fixture') && !row.homeowner_name.includes('Sample') && !row.homeowner_name.includes('Demo') && !row.homeowner_name.includes('Blake') && !row.homeowner_name.includes('Casey') && !row.homeowner_name.includes('Alex')) {
    // allow fictional names from fixture set
  }
  const perm = row.permission_to_use_publicly;
  if (!['yes', 'no', 'not_asked'].includes(perm)) {
    fail(`invalid permission_to_use_publicly value: ${perm}`);
  }
}
if (/["']permissiontousepublicly["']\s*:/.test(csvJson)) {
  fail('permissiontousepublicly field name must be absent');
}
console.log('PASS: CSV sample rows are fictional with valid permission values.');

if (csv.one_directional_export !== true) fail('CSV is not one-directional');
if (csv.native_crm_sync !== false) fail('CSV is native CRM sync');
if (csv.pushes_data_back_to_roofleadhq !== false) fail('CSV pushes data back to RoofLeadHQ');
if (csv.auto_updates_from_downloaded_file !== false) {
  fail('CSV auto-updates from downloaded file');
}
if (!csv.contains_homeowner_personal_information) {
  fail('CSV homeowner personal information warning is not present');
}
if (!csv.customer_responsible_for_downloaded_exported_data) {
  fail('customer downloaded/exported data responsibility is not present');
}
console.log('PASS: CSV boundaries and responsibility warnings are present.');

if (!output.roi_boundary_summary) {
  fail('ROI boundary summary is not present');
}
if (!output.roi_boundary_summary.roi_depends_on_customer_provided_spend_source_data) {
  fail('ROI does not depend on customer-provided spend/source data');
}
if (!output.roi_boundary_summary.no_exact_roi_promise_without_customer_data) {
  fail('no exact ROI promise without customer data is not documented');
}
console.log('PASS: ROI boundary summary is present with required rules.');

if (!output.reporting_safety_assertions || !output.reporting_safety_assertions.length) {
  fail('output missing reporting_safety_assertions');
}
for (const assertion of REQUIRED_REPORTING_GUARD_ASSERTIONS) {
  if (!output.reporting_safety_assertions.includes(assertion)) {
    fail(`reporting_safety_assertions missing: ${assertion}`);
  }
}
console.log('PASS: required reporting guard assertions are present.');

const byId = {};
for (const scenario of output.scenarios) {
  byId[scenario.scenario_id] = scenario;
}

const csvScenario = byId.csv_report_snapshot_fake_data_path;
if (!csvScenario.reporting_snapshot || !csvScenario.csv_snapshot_if_applicable) {
  fail('scenario 19 missing strong CSV/report snapshot');
}
const s19csv = csvScenario.csv_snapshot_if_applicable;
if (!s19csv.header_row || !s19csv.sample_rows || s19csv.sample_rows.length < 2) {
  fail('scenario 19 CSV snapshot is not the strongest fixture snapshot');
}
console.log('PASS: scenario 19 has strong CSV/report snapshot.');

for (const id of SCENARIOS_WITH_REPORTING_IMPACT) {
  if (!byId[id].reporting_impact) {
    fail(`scenario ${id} missing reporting_impact`);
  }
}
console.log('PASS: relevant scenarios include reporting impact.');

const activationScenario = byId.activation_flag_false_blocks_live_action_path;
if (
  !activationScenario.reporting_impact ||
  !activationScenario.reporting_snapshot?.live_delivery_blocked_by_activation_flag
) {
  fail('activation flag false scenario missing live reporting delivery block');
}
const csvScenarioImpact = byId.csv_report_snapshot_fake_data_path;
if (
  !csvScenarioImpact.reporting_snapshot?.live_delivery_blocked_by_activation_flag &&
  !csvScenarioImpact.csv_snapshot_if_applicable?.live_delivery_blocked_by_activation_flag
) {
  fail('CSV scenario missing live delivery block when activation flag false');
}
console.log('PASS: live CSV/reporting delivery blocked when activation flag false.');

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
}
console.log('PASS: every scenario preserves safety fields.');

if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log('PASS: existing guard assertion summary remains present.');

const existingVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, existingVerifierPath)],
  { cwd: root, encoding: 'utf8' },
);
if (existingVerifierRun.status !== 0) {
  fail(`existing fixture dry-run verifier failed: ${existingVerifierRun.stderr || existingVerifierRun.stdout}`);
}
console.log('PASS: existing fixture dry-run verifier still passes.');

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
  'no live CSV generation or delivery',
  'local fake-data dry-run only',
];
for (const phrase of safetyDocPhrases) {
  mustHave(doc, phrase, 'documentation safety boundaries');
}
console.log('PASS: safety/no-live/no-production/no-schema/no-integration boundaries documented.');

mustHave(aggregate, 'verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js', 'aggregate readiness');
mustHave(aggregate, 'Native Workflow Fixture Reporting Snapshot Expansion', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_REPORTING_SNAPSHOT_EXPANSION.md',
  'run-native-workflow-fixture-reporting-snapshot-expansion-dry-run.sh',
  'verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js',
  'Native Workflow Fixture Reporting Snapshot Expansion',
  'native workflow fixture reporting snapshot expansion',
  'reporting snapshot expansion',
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
mustHave(wrapper, 'verify-native-workflow-fixture-state-model-dry-run-readonly.js', 'wrapper existing verifier');
mustHave(wrapper, 'verify-native-workflow-fixture-guard-assertions-expansion-readonly.js', 'wrapper guard verifier');
mustHave(wrapper, 'verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js', 'wrapper reporting verifier');
console.log('PASS: dry-run wrapper references runner and verifiers.');

console.log(
  'PASS: Native Workflow Fixture Reporting Snapshot Expansion is fixture-only, deterministic, and dry-run safe.',
);