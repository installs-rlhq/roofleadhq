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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-guard-assertions-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const dryRunDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_STATE_MODEL_DRY_RUN.md';

const REQUIRED_GUARD_CATEGORIES = [
  'contact_permission_guards',
  'do_not_contact_guards',
  'required_contact_data_guards',
  'service_area_guards',
  'lead_source_guards',
  'plan_profile_guards',
  'custom_review_trigger_guards',
  'appointment_readiness_guards',
  'review_ownership_guards',
  'feedback_permission_guards',
  'csv_reporting_guards',
  'activation_flag_guards',
  'unsupported_request_guards',
  'lindy_bridge_safety_guards',
];

const REQUIRED_CONTACT_PERMISSION_GUARDS = [
  'contact_permission_known_or_reviewed',
  'contact_permission_unknown_routes_to_hold_or_review',
];

const REQUIRED_DO_NOT_CONTACT_GUARDS = [
  'do_not_contact_respected',
  'do_not_contact_blocks_follow_up',
];

const REQUIRED_CONTACT_DATA_GUARDS = [
  'missing_required_contact_data_routes_to_missing_info_or_hold',
];

const REQUIRED_SERVICE_AREA_GUARDS = [
  'service_area_checked',
  'excluded_service_area_routes_to_bad_fit_or_excluded',
];

const REQUIRED_LEAD_SOURCE_GUARDS = [
  'lead_source_captured_or_marked_unknown',
  'lead_source_unknown_allowed_only_with_review_or_unknown_marker',
  'duplicate_lead_routes_to_duplicate_review',
];

const REQUIRED_PLAN_CUSTOM_REVIEW_GUARDS = [
  'plan_profile_known',
  'starter_volume_limit_enforced',
  'growth_volume_limit_enforced',
  'elite_volume_limit_enforced',
  'custom_review_trigger_500_plus_leads',
  'custom_review_trigger_two_plus_locations',
  'custom_review_trigger_multiple_calendars',
  'custom_review_trigger_multiple_phone_numbers',
  'custom_review_trigger_multiple_sales_reps',
];

const REQUIRED_APPOINTMENT_READINESS_GUARDS = [
  'appointment_calendar_preferences_required_before_appointment_ready',
  'calendar_owner_required_before_appointment_ready',
  'service_area_fit_required_before_appointment_ready',
  'appointment_ready_blocked_when_required_fields_missing',
  'no_live_calendar_creation_when_appointment_booked',
];

const REQUIRED_REVIEW_OWNERSHIP_GUARDS = [
  'roofer_review_required_for_pricing',
  'roofer_review_required_for_estimate_or_quote',
  'roofer_review_required_for_insurance_complexity',
  'roofer_review_required_for_payment_or_contract_questions',
  'roofleadhq_review_limited_to_system_workflow_data_routing_quality',
  'roofleadhq_review_required_for_broken_routing_or_data_issue',
];

const REQUIRED_FEEDBACK_PERMISSION_GUARDS = [
  'estimate_tracking_does_not_generate_estimate',
  'post_inspection_follow_up_draft_or_manual_only',
  'feedback_public_use_permission_checked',
  'permission_to_use_publicly_allows_only_yes_no_not_asked',
  'no_fake_reviews',
  'no_review_farming',
  'no_automatic_public_review_generation',
];

const REQUIRED_CSV_REPORTING_GUARDS = [
  'csv_generated_only_from_fake_or_approved_records',
  'csv_export_is_one_directional',
  'csv_not_native_crm_sync',
  'csv_contains_homeowner_personal_information_warning',
  'customer_responsible_for_downloaded_exported_data',
  'roi_depends_on_customer_provided_spend_source_data',
];

const REQUIRED_ACTIVATION_FLAG_GUARDS = [
  'activation_flags_default_false',
  'live_sms_blocked_when_flag_false',
  'live_vapi_blocked_when_flag_false',
  'live_resend_blocked_when_flag_false',
  'live_calendar_blocked_when_flag_false',
  'live_lindy_bridge_blocked_when_flag_false',
  'live_scheduler_blocked_when_flag_false',
  'live_csv_delivery_blocked_when_flag_false',
  'live_crm_handoff_blocked_when_flag_false',
  'live_payment_or_invoice_blocked_when_flag_false',
  'blocked_by_activation_flag_audit_event_present',
];

const REQUIRED_LINDY_BRIDGE_SAFETY_GUARDS = [
  'safe_lindy_bridge_reference_not_live_activation',
  'live_lindy_bridge_enabled_false_not_counted_as_active',
  'lindy_not_source_of_truth',
  'lindy_not_final_reporting_authority',
  'no_live_lindy_workflow_execution',
];

const REQUIRED_UNSUPPORTED_REQUEST_GUARDS = [
  'automatic_estimate_request_routes_to_hold_or_review',
  'automatic_quote_request_routes_to_hold_or_review',
  'automatic_invoice_request_routes_to_hold_or_review',
  'payment_or_deposit_request_routes_to_hold_or_review',
  'native_crm_sync_request_routes_to_later_only_or_review',
  'unsupported_feature_does_not_trigger_live_action',
];

const REQUIRED_SCENARIO_IDS = [
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
console.log('PASS: new dry-run wrapper exists.');

if (!fs.existsSync(path.join(root, existingVerifierPath))) {
  fail(`missing existing fixture dry-run verifier: ${existingVerifierPath}`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['guard verifier', verifierPath],
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

if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log('PASS: output includes guard_assertion_summary.');

if (typeof output.total_guard_assertions !== 'number' || output.total_guard_assertions <= 0) {
  fail('output missing or invalid total_guard_assertions');
}
if (typeof output.passed_guard_assertions !== 'number') {
  fail('output missing passed_guard_assertions');
}
if (typeof output.failed_guard_assertions !== 'number') {
  fail('output missing failed_guard_assertions');
}
console.log('PASS: output includes total/passed/failed guard assertion counts.');

if (output.guard_assertion_summary.unexpected_failures !== 0) {
  fail('guard assertion summary has unexpected failures');
}
if (!output.guard_assertion_summary.all_failures_safely_routed) {
  fail('not all guard failures are safely routed');
}
console.log(
  'PASS: failed guard assertion count is zero unexpected; expected failures safely routed.',
);

if (!output.guard_categories) {
  fail('output missing guard_categories');
}
for (const category of REQUIRED_GUARD_CATEGORIES) {
  if (!(category in output.guard_categories)) {
    fail(`output missing guard category: ${category}`);
  }
}
console.log('PASS: required guard categories are present.');

function assertGuardsInOutput(guardIds, label) {
  const outputText = JSON.stringify(output);
  for (const guardId of guardIds) {
    if (!outputText.includes(guardId)) {
      fail(`${label} missing guard assertion: ${guardId}`);
    }
  }
}

assertGuardsInOutput(REQUIRED_CONTACT_PERMISSION_GUARDS, 'contact/permission guards');
console.log('PASS: required contact/permission guards are present.');

assertGuardsInOutput(REQUIRED_DO_NOT_CONTACT_GUARDS, 'do-not-contact guards');
console.log('PASS: required do-not-contact guards are present.');

assertGuardsInOutput(REQUIRED_CONTACT_DATA_GUARDS, 'contact data guards');
console.log('PASS: required contact data guards are present.');

assertGuardsInOutput(REQUIRED_SERVICE_AREA_GUARDS, 'service area guards');
console.log('PASS: required service area guards are present.');

assertGuardsInOutput(REQUIRED_LEAD_SOURCE_GUARDS, 'lead source guards');
console.log('PASS: required lead source guards are present.');

assertGuardsInOutput(REQUIRED_PLAN_CUSTOM_REVIEW_GUARDS, 'plan/custom review guards');
console.log('PASS: required plan/custom review guards are present.');

assertGuardsInOutput(REQUIRED_APPOINTMENT_READINESS_GUARDS, 'appointment readiness guards');
console.log('PASS: required appointment readiness guards are present.');

assertGuardsInOutput(REQUIRED_REVIEW_OWNERSHIP_GUARDS, 'review ownership guards');
console.log('PASS: required review ownership guards are present.');

assertGuardsInOutput(REQUIRED_FEEDBACK_PERMISSION_GUARDS, 'feedback permission guards');
console.log('PASS: required feedback permission guards are present.');

assertGuardsInOutput(REQUIRED_CSV_REPORTING_GUARDS, 'CSV/reporting guards');
console.log('PASS: required CSV/reporting guards are present.');

assertGuardsInOutput(REQUIRED_ACTIVATION_FLAG_GUARDS, 'activation flag guards');
console.log('PASS: required activation flag guards are present.');

assertGuardsInOutput(REQUIRED_LINDY_BRIDGE_SAFETY_GUARDS, 'Lindy bridge safety guards');
console.log('PASS: required Lindy bridge safety guards are present.');

assertGuardsInOutput(REQUIRED_UNSUPPORTED_REQUEST_GUARDS, 'unsupported request guards');
console.log('PASS: required unsupported request guards are present.');

const byId = {};
for (const scenario of output.scenarios) {
  byId[scenario.scenario_id] = scenario;
}

for (const id of REQUIRED_SCENARIO_IDS) {
  if (!byId[id]) fail(`missing required scenario_id: ${id}`);
}

for (const scenario of output.scenarios) {
  if (!scenario.guard_assertions || !scenario.guard_assertions.length) {
    fail(`scenario ${scenario.scenario_id} missing guard_assertions`);
  }
  if (!Array.isArray(scenario.failed_guards)) {
    fail(`scenario ${scenario.scenario_id} missing failed_guards array`);
  }
  if (!scenario.audit_events || !scenario.audit_events.length) {
    fail(`scenario ${scenario.scenario_id} missing audit_events`);
  }
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (scenario.production_data_touched !== 'no') {
    fail(`scenario ${scenario.scenario_id} production_data_touched is not no`);
  }
  if (scenario.external_services_called !== 'no') {
    fail(`scenario ${scenario.scenario_id} external_services_called is not no`);
  }
  if (scenario.result !== 'PASS') {
    fail(`scenario ${scenario.scenario_id} result is not PASS`);
  }

  for (const failed of scenario.failed_guards) {
    if (!failed.safely_routed) {
      fail(`scenario ${scenario.scenario_id} failed guard ${failed.assertion_id} not safely routed`);
    }
  }
}
console.log('PASS: every scenario includes guard_assertions, failed_guards, audit_events, and safety fields.');

const dncScenario = byId.stopped_do_not_contact_path;
const dncGuards = JSON.stringify(dncScenario.guard_assertions);
if (
  !dncGuards.includes('do_not_contact_blocks_follow_up') ||
  dncScenario.final_state !== 'STOPPED_DO_NOT_CONTACT'
) {
  fail('do-not-contact scenario does not block follow-up');
}
console.log('PASS: do-not-contact scenario blocks follow-up.');

const missingScenario = byId.missing_information_path;
if (
  missingScenario.final_state !== 'MISSING_INFO' &&
  missingScenario.final_state !== 'HOLD'
) {
  fail(`missing info scenario final state is ${missingScenario.final_state}`);
}
const missingGuards = JSON.stringify(missingScenario.guard_assertions);
if (!missingGuards.includes('missing_required_contact_data_routes_to_missing_info_or_hold')) {
  fail('missing info scenario missing required contact data guard');
}
console.log('PASS: missing info scenario routes safely.');

const appointmentReady = byId.normal_lead_to_appointment_readiness;
const readyGuards = JSON.stringify(appointmentReady.guard_assertions);
const requiredReadyGuards = [
  'appointment_calendar_preferences_required_before_appointment_ready',
  'calendar_owner_required_before_appointment_ready',
  'service_area_fit_required_before_appointment_ready',
];
for (const g of requiredReadyGuards) {
  const assertion = appointmentReady.guard_assertions.find((a) => a.assertion_id === g);
  if (!assertion || assertion.result !== 'pass') {
    fail(`appointment-ready scenario missing passing guard: ${g}`);
  }
}
if (appointmentReady.final_state !== 'APPOINTMENT_READY') {
  fail('appointment-ready scenario final state is not APPOINTMENT_READY');
}
console.log('PASS: appointment-ready scenario requires appointment/calendar preferences.');

const bookedScenario = byId.appointment_booked_path;
const bookedAudit = JSON.stringify(bookedScenario.audit_events);
if (!bookedAudit.includes('google_calendar_created') || bookedAudit.includes('"google_calendar_created": true')) {
  if (bookedAudit.includes('"google_calendar_created": true')) {
    fail('appointment booked scenario created live calendar event');
  }
}
const bookedGuard = bookedScenario.guard_assertions.find(
  (a) => a.assertion_id === 'no_live_calendar_creation_when_appointment_booked',
);
if (!bookedGuard || bookedGuard.result !== 'pass') {
  fail('appointment booked scenario missing no_live_calendar_creation guard pass');
}
console.log('PASS: appointment booked scenario does not create live Calendar event.');

const rooferReview = byId.roofer_review_needed_path;
if (!rooferReview.owner || rooferReview.owner !== 'roofer') {
  const hasRooferQueue = (rooferReview.review_queue_items || []).some(
    (item) => item.review_owner === 'roofer',
  );
  if (!hasRooferQueue) fail('roofer review scenario missing roofer/contractor owner');
}
console.log('PASS: roofer review scenario uses roofer/contractor owner.');

const systemReview = byId.roofleadhq_system_review_needed_path;
const systemGuard = systemReview.guard_assertions.find(
  (a) => a.assertion_id === 'roofleadhq_review_limited_to_system_workflow_data_routing_quality',
);
if (!systemGuard || systemGuard.result !== 'pass') {
  fail('RoofLeadHQ review scenario missing system/workflow/data/routing/quality guard');
}
console.log('PASS: RoofLeadHQ review scenario is limited to system/workflow/data/routing/quality.');

for (const id of [
  'feedback_permission_yes_path',
  'feedback_permission_no_path',
  'feedback_permission_not_asked_path',
]) {
  const scenario = byId[id];
  const summary = JSON.stringify(scenario.input_fixture_summary);
  if (!summary.includes('permission_to_use_publicly')) {
    fail(`feedback scenario ${id} missing permission_to_use_publicly`);
  }
}
const feedbackJson = JSON.stringify([
  byId.feedback_permission_yes_path,
  byId.feedback_permission_no_path,
  byId.feedback_permission_not_asked_path,
]);
if (
  !feedbackJson.includes('"yes"') ||
  !feedbackJson.includes('"no"') ||
  !feedbackJson.includes('not_asked')
) {
  fail('feedback scenarios missing permission_to_use_publicly yes/no/not_asked');
}
if (feedbackJson.includes('permissiontousepublicly')) {
  fail('permissiontousepublicly must be absent');
}
console.log('PASS: feedback scenarios use permission_to_use_publicly yes/no/not_asked.');

const csvScenario = byId.csv_report_snapshot_fake_data_path;
const csvGuards = JSON.stringify(csvScenario.guard_assertions);
if (
  !csvGuards.includes('csv_export_is_one_directional') ||
  !csvGuards.includes('csv_not_native_crm_sync')
) {
  fail('CSV scenario missing one-directional export or no native CRM sync guards');
}
console.log('PASS: CSV scenario documents one-directional export and no native CRM sync.');

const activationScenario = byId.activation_flag_false_blocks_live_action_path;
const activationAudit = JSON.stringify(activationScenario.audit_events);
if (!activationAudit.includes('blocked_by_activation_flag')) {
  fail('activation flag false scenario missing blocked_by_activation_flag audit');
}
console.log('PASS: activation flag false scenario includes blocked_by_activation_flag audit.');

const readiness = buildStatus();
if (readiness.live_automation?.lindy !== false) {
  fail('live_lindy_bridge_enabled false must not be counted as live Lindy activation');
}
const lindyCheck = readiness.checks.find((check) => check.name === 'Lindy live trigger');
if ((lindyCheck?.matches || []).includes(runnerPath)) {
  fail('fixture dry-run runner must not appear in Lindy live trigger matches');
}
console.log('PASS: Lindy bridge false flag is not treated as live activation.');

mustHave(doc, 'Local E2E Fixture Runner', 'documentation');
mustHave(doc, 'LOCAL_E2E_FIXTURE_RUNNER_PACKET.md', 'documentation');
console.log('PASS: documentation includes Local E2E runner relationship.');

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

mustHave(aggregate, 'verify-native-workflow-fixture-guard-assertions-expansion-readonly.js', 'aggregate readiness');
mustHave(aggregate, 'Native Workflow Fixture Guard Assertions Expansion', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_GUARD_ASSERTIONS_EXPANSION.md',
  'run-native-workflow-fixture-guard-assertions-expansion-dry-run.sh',
  'verify-native-workflow-fixture-guard-assertions-expansion-readonly.js',
  'Native Workflow Fixture Guard Assertions Expansion',
  'native workflow fixture guard assertions expansion',
  'guard assertions expansion',
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
console.log('PASS: dry-run wrapper references runner and verifiers.');

console.log(
  'PASS: Native Workflow Fixture Guard Assertions Expansion is fixture-only, deterministic, and dry-run safe.',
);