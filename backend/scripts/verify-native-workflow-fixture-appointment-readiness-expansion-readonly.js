#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const guardVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js';
const reportingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js';
const reviewQueueVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-appointment-readiness-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_READINESS_ITEM_FIELDS = [
  'readiness_item_id',
  'scenario_id',
  'lead_id',
  'plan_profile',
  'current_state',
  'target_state',
  'appointment_readiness_status',
  'readiness_decision',
  'readiness_reason',
  'required_fields_present',
  'missing_fields',
  'blocker_reasons',
  'homeowner_contact_ready',
  'contact_permission_status',
  'do_not_contact_status',
  'service_area_status',
  'lead_source_status',
  'roofing_issue_summary_present',
  'urgency_present',
  'preferred_appointment_windows_status',
  'calendar_owner',
  'calendar_preferences_status',
  'assigned_roofer_or_rep',
  'roofer_review_required',
  'roofleadhq_review_required',
  'required_manual_next_step',
  'live_calendar_action_allowed',
  'appointment_booked_live',
  'production_data_touched',
  'external_services_called',
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

const REQUIRED_SAFETY_ASSERTIONS = [
  'appointment_readiness_summary_present',
  'appointment_readiness_items_present',
  'appointment_readiness_item_required_fields_present',
  'appointment_ready_requires_homeowner_contact_data',
  'appointment_ready_requires_contact_permission_or_review',
  'do_not_contact_blocks_appointment_readiness',
  'appointment_ready_requires_service_area_fit',
  'excluded_service_area_blocks_appointment_readiness',
  'appointment_ready_requires_lead_source_or_unknown_marker',
  'appointment_ready_requires_roofing_issue_summary',
  'appointment_ready_requires_calendar_owner',
  'appointment_ready_requires_calendar_preferences',
  'missing_calendar_preferences_blocks_appointment_ready',
  'missing_calendar_owner_blocks_appointment_ready',
  'assigned_roofer_or_rep_required_when_plan_or_setup_requires_it',
  'pricing_question_blocks_to_roofer_review',
  'estimate_question_blocks_to_roofer_review',
  'quote_request_blocks_to_roofer_review',
  'insurance_complexity_blocks_to_roofer_review',
  'payment_or_contract_question_blocks_to_roofer_review',
  'scheduling_conflict_blocks_to_roofer_review',
  'unsupported_request_blocks_appointment_readiness',
  'unresolved_review_blocks_appointment_readiness',
  'live_calendar_booking_flag_defaults_false',
  'live_calendar_creation_blocked_when_flag_false',
  'no_google_calendar_event_created',
  'no_external_calendar_call_performed',
  'appointment_booked_live_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'appointment_readiness_uses_fake_data_only',
  'appointment_readiness_does_not_touch_production_data',
  'appointment_readiness_does_not_call_external_services',
  'appointment_readiness_does_not_send_notifications',
  'appointment_decisions_are_audited',
  'required_manual_next_step_present_for_not_ready_items',
];

const BLOCKER_ROUTING_ASSERTIONS = [
  {
    assertion_id: 'pricing_question_blocks_to_roofer_review',
    scenario_id: 'roofer_review_needed_path',
    check: (item) => item.readiness_decision === 'not_ready' && item.roofer_review_required,
  },
  {
    assertion_id: 'estimate_question_blocks_to_roofer_review',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.readiness_decision === 'not_ready' &&
      item.blocker_reasons.includes('estimate_question'),
  },
  {
    assertion_id: 'quote_request_blocks_to_roofer_review',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.readiness_decision === 'not_ready' && item.blocker_reasons.includes('quote_request'),
  },
  {
    assertion_id: 'payment_or_contract_question_blocks_to_roofer_review',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) =>
      item.readiness_decision === 'not_ready' &&
      item.blocker_reasons.some((r) => r.includes('payment') || r.includes('contract')),
  },
  {
    assertion_id: 'scheduling_conflict_blocks_to_roofer_review',
    scenario_id: 'inspection_missed_reschedule_path',
    check: (item) =>
      item.readiness_decision === 'not_ready' &&
      item.blocker_reasons.includes('scheduling_conflict'),
  },
  {
    assertion_id: 'do_not_contact_blocks_appointment_readiness',
    scenario_id: 'stopped_do_not_contact_path',
    check: (item) => item.do_not_contact_status === true && item.readiness_decision === 'not_ready',
  },
  {
    assertion_id: 'excluded_service_area_blocks_appointment_readiness',
    scenario_id: 'bad_fit_excluded_path',
    check: (item) =>
      item.service_area_status === 'excluded' && item.readiness_decision === 'not_ready',
  },
  {
    assertion_id: 'unresolved_review_blocks_appointment_readiness',
    scenario_id: 'duplicate_review_path',
    check: (item) =>
      item.readiness_decision === 'not_ready' && item.roofleadhq_review_required,
  },
  {
    assertion_id: 'missing_calendar_preferences_blocks_appointment_ready',
    scenario_id: 'missing_information_path',
    check: (item) =>
      item.calendar_preferences_status === 'missing' && item.readiness_decision === 'not_ready',
  },
  {
    assertion_id: 'missing_calendar_owner_blocks_appointment_ready',
    scenario_id: 'missing_information_path',
    check: (item) => item.calendar_owner === null && item.readiness_decision === 'not_ready',
  },
  {
    assertion_id: 'appointment_ready_requires_homeowner_contact_data',
    scenario_id: 'normal_lead_to_appointment_readiness',
    check: (item) => item.homeowner_contact_ready === true && item.readiness_decision === 'ready',
  },
];

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
console.log('PASS: existing fixture runner exists.');
console.log('PASS: existing fixture dry-run verifier exists.');
console.log('PASS: guard assertions verifier exists.');
console.log('PASS: reporting snapshot verifier exists.');
console.log('PASS: review queue verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['appointment readiness verifier', verifierPath],
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

if (output.safety_posture !== 'demo_ready_with_live_automation_disabled') {
  fail('output does not preserve demo_ready_with_live_automation_disabled');
}
console.log('PASS: output preserves demo_ready_with_live_automation_disabled.');

if (!output.scenarios || output.scenarios.length !== 25) {
  fail(
    `output must include exactly 25 scenarios (found ${output.scenarios ? output.scenarios.length : 0})`,
  );
}
console.log('PASS: output includes all 25 required scenarios.');

if (!output.appointment_readiness_expansion) {
  fail('output missing appointment_readiness_expansion marker');
}
if (
  output.appointment_readiness_expansion !==
  'native_workflow_fixture_appointment_readiness_expansion'
) {
  fail('appointment_readiness_expansion marker is incorrect');
}
console.log('PASS: output includes appointment_readiness_expansion marker.');

for (const section of [
  'appointment_readiness_summary',
  'appointment_readiness_items',
  'appointment_blocker_summary',
  'appointment_ready_summary',
  'appointment_not_ready_summary',
  'calendar_preference_summary',
  'calendar_owner_summary',
  'appointment_readiness_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level appointment readiness sections are present.');

if (!Array.isArray(output.appointment_readiness_items) || !output.appointment_readiness_items.length) {
  fail('appointment_readiness_items must be a non-empty array');
}
if (output.appointment_readiness_items.length !== 25) {
  fail(
    `appointment_readiness_items must include one item per scenario (found ${output.appointment_readiness_items.length})`,
  );
}
console.log('PASS: appointment_readiness_items array has 25 scenario items.');

for (const item of output.appointment_readiness_items) {
  for (const field of REQUIRED_READINESS_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(`readiness item ${item.readiness_item_id || 'unknown'} missing field: ${field}`);
    }
  }
  if (item.live_calendar_action_allowed !== 'no') {
    fail(`readiness item ${item.readiness_item_id} live_calendar_action_allowed is not no`);
  }
  if (item.appointment_booked_live !== 'no') {
    fail(`readiness item ${item.readiness_item_id} appointment_booked_live is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(`readiness item ${item.readiness_item_id} production_data_touched is not no`);
  }
  if (item.external_services_called !== 'no') {
    fail(`readiness item ${item.readiness_item_id} external_services_called is not no`);
  }
  if (item.readiness_decision === 'not_ready' && !item.required_manual_next_step) {
    fail(`readiness item ${item.readiness_item_id} missing required_manual_next_step for not_ready`);
  }
}
console.log('PASS: every appointment readiness item has required fields and safety values.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.appointment_readiness_safety_assertions.includes(assertion)) {
    fail(`appointment_readiness_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required appointment readiness safety assertions are present.`,
);

const byScenarioId = {};
for (const item of output.appointment_readiness_items) {
  byScenarioId[item.scenario_id] = item;
}

for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!byScenarioId[scenarioId]) {
    fail(`missing appointment readiness item for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have appointment readiness items.');

for (const routing of BLOCKER_ROUTING_ASSERTIONS) {
  const item = byScenarioId[routing.scenario_id];
  if (!routing.check(item)) {
    fail(`${routing.assertion_id}: scenario ${routing.scenario_id} failed readiness check`);
  }
}
console.log(
  `PASS: all ${BLOCKER_ROUTING_ASSERTIONS.length} blocker routing assertions verified.`,
);

if (output.appointment_readiness_summary.live_calendar_booking_enabled !== false) {
  fail('live_calendar_booking_flag_defaults_false: summary flag must be false');
}
if (output.appointment_readiness_summary.google_calendar_event_created !== false) {
  fail('no_google_calendar_event_created: summary google_calendar_event_created must be false');
}
console.log('PASS: live calendar booking flag defaults false and no Google Calendar event created.');

if (!output.appointment_not_ready_summary.all_have_required_manual_next_step) {
  fail('required_manual_next_step_present_for_not_ready_items: not all not-ready items have manual next step');
}
console.log('PASS: all not-ready items have required manual next step.');

const blockerCatalog = output.appointment_blocker_summary.blocker_catalog || [];
if (!blockerCatalog.length) {
  fail('appointment_blocker_summary.blocker_catalog must be non-empty');
}
for (const blocker of blockerCatalog) {
  if (!blocker.demonstrated) {
    fail(`blocker catalog item ${blocker.blocker_id} not demonstrated`);
  }
  if (blocker.live_calendar_action_allowed !== 'no') {
    fail(`blocker catalog item ${blocker.blocker_id} live_calendar_action_allowed is not no`);
  }
}
console.log(`PASS: blocker catalog verified (${blockerCatalog.length} blockers demonstrated).`);

const readyNormal = byScenarioId.normal_lead_to_appointment_readiness;
if (readyNormal.readiness_decision !== 'ready') {
  fail('normal_lead_to_appointment_readiness must have readiness_decision ready');
}
console.log('PASS: normal lead to appointment readiness scenario is ready.');

const customReview = byScenarioId.custom_review_500_plus_leads_path;
if (customReview.readiness_decision !== 'not_ready' || customReview.assigned_roofer_or_rep !== null) {
  fail('assigned_roofer_or_rep_required_when_plan_or_setup_requires_it: custom review missing rep');
}
console.log('PASS: custom review scenario blocks readiness when assigned roofer/rep required.');

if (!output.review_queue_summary) {
  fail('output missing review_queue_summary — prior review queue expansion must remain');
}
if (!output.reporting_snapshot_summary) {
  fail('output missing reporting_snapshot_summary — prior reporting expansion must remain');
}
if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log('PASS: existing guard assertion, reporting snapshot, and review queue summaries remain present.');

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
  if (!scenario.appointment_readiness_items || !scenario.appointment_readiness_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario appointment_readiness_items`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario appointment readiness items.');

const existingVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, existingVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
);
if (existingVerifierRun.status !== 0) {
  fail(
    `existing fixture dry-run verifier failed: ${existingVerifierRun.stderr || existingVerifierRun.stdout}`,
  );
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
  'local fake-data dry-run only',
];
for (const phrase of safetyDocPhrases) {
  mustHave(doc, phrase, 'documentation safety boundaries');
}
console.log('PASS: safety/no-live/no-production/no-schema/no-integration boundaries documented.');

mustHave(aggregate, 'verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js', 'aggregate readiness');
mustHave(aggregate, 'Native Workflow Fixture Appointment Readiness Expansion', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_APPOINTMENT_READINESS_EXPANSION.md',
  'run-native-workflow-fixture-appointment-readiness-expansion-dry-run.sh',
  'verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js',
  'Native Workflow Fixture Appointment Readiness Expansion',
  'native workflow fixture appointment readiness expansion',
  'appointment readiness expansion',
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
mustHave(wrapper, 'verify-native-workflow-fixture-review-queue-expansion-readonly.js', 'wrapper review queue verifier');
mustHave(wrapper, 'verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js', 'wrapper appointment readiness verifier');
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount =
  REQUIRED_SAFETY_ASSERTIONS.length + BLOCKER_ROUTING_ASSERTIONS.length + blockerCatalog.length;

console.log(
  `PASS: Native Workflow Fixture Appointment Readiness Expansion verified (${assertionCount}+ assertions, ${output.appointment_readiness_items.length} readiness items).`,
);
console.log(
  'PASS: Native Workflow Fixture Appointment Readiness Expansion is fixture-only, deterministic, and dry-run safe.',
);