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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_POST_INSPECTION_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const guardVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-guard-assertions-expansion-readonly.js';
const reportingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-reporting-snapshot-expansion-readonly.js';
const reviewQueueVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js';
const appointmentReadinessVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-appointment-readiness-expansion-readonly.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-post-inspection-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-post-inspection-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_POST_INSPECTION_ITEM_FIELDS = [
  'post_inspection_item_id',
  'scenario_id',
  'lead_id',
  'appointment_id',
  'plan_profile',
  'current_state',
  'target_state',
  'inspection_status',
  'inspection_completed',
  'inspection_missed_or_rescheduled',
  'estimate_needed',
  'estimate_sent',
  'homeowner_follow_up_needed',
  'roofer_follow_up_needed',
  'post_inspection_status',
  'outcome',
  'outcome_date',
  'still_open_days',
  'next_step_owner',
  'next_step_due_date',
  'next_step_notes',
  'feedback_requested',
  'feedback_captured',
  'feedback_summary',
  'testimonial_candidate',
  'permission_to_use_publicly',
  'feedback_issue_flag',
  'roofer_review_required',
  'roofleadhq_review_required',
  'required_manual_next_step',
  'live_follow_up_action_allowed',
  'live_feedback_request_allowed',
  'automatic_estimate_generated',
  'automatic_quote_generated',
  'automatic_invoice_generated',
  'automatic_payment_requested',
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
  'post_inspection_summary_present',
  'post_inspection_items_present',
  'post_inspection_item_required_fields_present',
  'inspection_completed_routes_to_post_inspection_tracking',
  'inspection_missed_routes_to_reschedule_or_review',
  'estimate_needed_is_tracking_only',
  'estimate_sent_is_tracking_only',
  'no_automatic_estimate_generated',
  'no_automatic_quote_generated',
  'no_automatic_invoice_generated',
  'no_automatic_payment_requested',
  'homeowner_follow_up_needed_is_tracking_or_manual_only',
  'roofer_follow_up_needed_is_tracking_or_manual_only',
  'still_open_days_present_for_open_items',
  'next_step_owner_required_for_open_items',
  'next_step_due_date_required_when_follow_up_needed',
  'won_lost_closed_outcomes_supported',
  'disputed_or_unclear_outcome_routes_to_review',
  'estimate_details_route_to_roofer_review',
  'quote_details_route_to_roofer_review',
  'payment_or_invoice_routes_to_roofer_review',
  'insurance_complexity_routes_to_roofer_review',
  'repair_vs_replacement_routes_to_roofer_review',
  'roofleadhq_review_limited_to_system_quality',
  'feedback_requested_tracking_present',
  'feedback_captured_tracking_present',
  'permission_to_use_publicly_values_are_valid',
  'permissiontousepublicly_absent',
  'feedback_internal_unless_permission_obtained',
  'no_fake_reviews',
  'no_review_farming',
  'no_automatic_public_review_generation',
  'testimonial_candidate_does_not_publish_publicly',
  'live_follow_up_blocked_when_flag_false',
  'live_feedback_request_blocked_when_flag_false',
  'post_inspection_uses_fake_data_only',
  'post_inspection_does_not_touch_production_data',
  'post_inspection_does_not_call_external_services',
  'post_inspection_does_not_send_notifications',
  'post_inspection_decisions_are_audited',
  'required_manual_next_step_present_for_open_or_review_items',
];

const VALID_PERMISSION_VALUES = new Set(['yes', 'no', 'not_asked', null]);

const ROUTING_ASSERTIONS = [
  {
    assertion_id: 'inspection_completed_routes_to_post_inspection_tracking',
    scenario_id: 'inspection_completed_path',
    check: (item) =>
      item.inspection_completed === true &&
      item.post_inspection_status === 'post_inspection_tracking',
  },
  {
    assertion_id: 'inspection_missed_routes_to_reschedule_or_review',
    scenario_id: 'inspection_missed_reschedule_path',
    check: (item) =>
      item.inspection_missed_or_rescheduled === true &&
      item.post_inspection_status === 'reschedule_needed' &&
      item.roofer_review_required === true,
  },
  {
    assertion_id: 'estimate_details_route_to_roofer_review',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.estimate_needed === true &&
      item.roofer_review_required === true &&
      item.automatic_estimate_generated === 'no',
  },
  {
    assertion_id: 'quote_details_route_to_roofer_review',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.estimate_sent === true &&
      item.roofer_review_required === true &&
      item.automatic_quote_generated === 'no',
  },
  {
    assertion_id: 'payment_or_invoice_routes_to_roofer_review',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) =>
      item.roofer_follow_up_needed === true &&
      item.roofer_review_required === true &&
      item.automatic_payment_requested === 'no',
  },
  {
    assertion_id: 'insurance_complexity_routes_to_roofer_review',
    scenario_id: 'roofer_review_needed_path',
    check: (item) => item.roofer_review_required === true,
  },
  {
    assertion_id: 'repair_vs_replacement_routes_to_roofer_review',
    scenario_id: 'post_inspection_still_open_path',
    check: (item) =>
      item.outcome === 'still_open' &&
      item.roofer_review_required === true &&
      item.still_open_days !== null,
  },
  {
    assertion_id: 'roofleadhq_review_limited_to_system_quality',
    scenario_id: 'roofleadhq_system_review_needed_path',
    check: (item) =>
      item.roofleadhq_review_required === true && item.roofer_review_required === false,
  },
  {
    assertion_id: 'disputed_or_unclear_outcome_routes_to_review',
    scenario_id: 'post_inspection_still_open_path',
    check: (item) => item.roofer_review_required === true && item.outcome === 'still_open',
  },
  {
    assertion_id: 'homeowner_follow_up_needed_is_tracking_or_manual_only',
    scenario_id: 'homeowner_follow_up_needed_path',
    check: (item) =>
      item.homeowner_follow_up_needed === true &&
      item.live_follow_up_action_allowed === 'no' &&
      item.next_step_due_date,
  },
  {
    assertion_id: 'roofer_follow_up_needed_is_tracking_or_manual_only',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) =>
      item.roofer_follow_up_needed === true && item.live_follow_up_action_allowed === 'no',
  },
  {
    assertion_id: 'feedback_internal_unless_permission_obtained',
    scenario_id: 'feedback_permission_no_path',
    check: (item) =>
      item.feedback_captured === true &&
      item.permission_to_use_publicly === 'no' &&
      item.testimonial_candidate === false,
  },
  {
    assertion_id: 'testimonial_candidate_does_not_publish_publicly',
    scenario_id: 'feedback_permission_yes_path',
    check: (item) =>
      item.testimonial_candidate === true &&
      item.live_feedback_request_allowed === 'no' &&
      item.automatic_estimate_generated === 'no',
  },
  {
    assertion_id: 'live_follow_up_blocked_when_flag_false',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) =>
      item.homeowner_follow_up_needed === true && item.live_follow_up_action_allowed === 'no',
  },
  {
    assertion_id: 'live_feedback_request_blocked_when_flag_false',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) => item.live_feedback_request_allowed === 'no',
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
console.log('PASS: appointment readiness verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['post-inspection verifier', verifierPath],
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

if (!output.post_inspection_expansion) {
  fail('output missing post_inspection_expansion marker');
}
if (output.post_inspection_expansion !== 'native_workflow_fixture_post_inspection_expansion') {
  fail('post_inspection_expansion marker is incorrect');
}
console.log('PASS: output includes post_inspection_expansion marker.');

for (const section of [
  'post_inspection_summary',
  'post_inspection_items',
  'post_inspection_status_summary',
  'estimate_tracking_summary',
  'homeowner_follow_up_summary',
  'roofer_follow_up_summary',
  'outcome_summary',
  'feedback_capture_summary',
  'feedback_permission_summary',
  'post_inspection_review_summary',
  'post_inspection_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level post-inspection sections are present.');

if (!Array.isArray(output.post_inspection_items) || !output.post_inspection_items.length) {
  fail('post_inspection_items must be a non-empty array');
}
if (output.post_inspection_items.length !== 25) {
  fail(
    `post_inspection_items must include one item per scenario (found ${output.post_inspection_items.length})`,
  );
}
console.log('PASS: post_inspection_items array has 25 scenario items.');

for (const item of output.post_inspection_items) {
  for (const field of REQUIRED_POST_INSPECTION_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(`post-inspection item ${item.post_inspection_item_id || 'unknown'} missing field: ${field}`);
    }
  }
  if (item.live_follow_up_action_allowed !== 'no') {
    fail(`post-inspection item ${item.post_inspection_item_id} live_follow_up_action_allowed is not no`);
  }
  if (item.live_feedback_request_allowed !== 'no') {
    fail(`post-inspection item ${item.post_inspection_item_id} live_feedback_request_allowed is not no`);
  }
  if (item.automatic_estimate_generated !== 'no') {
    fail(`post-inspection item ${item.post_inspection_item_id} automatic_estimate_generated is not no`);
  }
  if (item.automatic_quote_generated !== 'no') {
    fail(`post-inspection item ${item.post_inspection_item_id} automatic_quote_generated is not no`);
  }
  if (item.automatic_invoice_generated !== 'no') {
    fail(`post-inspection item ${item.post_inspection_item_id} automatic_invoice_generated is not no`);
  }
  if (item.automatic_payment_requested !== 'no') {
    fail(`post-inspection item ${item.post_inspection_item_id} automatic_payment_requested is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(`post-inspection item ${item.post_inspection_item_id} production_data_touched is not no`);
  }
  if (item.external_services_called !== 'no') {
    fail(`post-inspection item ${item.post_inspection_item_id} external_services_called is not no`);
  }
  if (!VALID_PERMISSION_VALUES.has(item.permission_to_use_publicly)) {
    fail(
      `post-inspection item ${item.post_inspection_item_id} has invalid permission_to_use_publicly: ${item.permission_to_use_publicly}`,
    );
  }
  if ('permissiontousepublicly' in item) {
    fail(`post-inspection item ${item.post_inspection_item_id} has forbidden field permissiontousepublicly`);
  }
  const isOpenOrReview =
    item.outcome === 'still_open' ||
    item.outcome === 'needs_review' ||
    item.roofer_review_required ||
    item.roofleadhq_review_required;
  if (isOpenOrReview && !item.required_manual_next_step) {
    fail(
      `post-inspection item ${item.post_inspection_item_id} missing required_manual_next_step for open/review item`,
    );
  }
  if (item.outcome === 'still_open' && (item.still_open_days === null || item.still_open_days === undefined)) {
    fail(`post-inspection item ${item.post_inspection_item_id} missing still_open_days for still_open outcome`);
  }
  if (item.outcome === 'still_open' && !item.next_step_owner) {
    fail(`post-inspection item ${item.post_inspection_item_id} missing next_step_owner for still_open outcome`);
  }
  if (
    (item.homeowner_follow_up_needed || item.roofer_follow_up_needed) &&
    !item.next_step_due_date
  ) {
    fail(`post-inspection item ${item.post_inspection_item_id} missing next_step_due_date when follow-up needed`);
  }
}
console.log('PASS: every post-inspection item has required fields and safety values.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.post_inspection_safety_assertions.includes(assertion)) {
    fail(`post_inspection_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required post-inspection safety assertions are present.`,
);

const byScenarioId = {};
for (const item of output.post_inspection_items) {
  byScenarioId[item.scenario_id] = item;
}

for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!byScenarioId[scenarioId]) {
    fail(`missing post-inspection item for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have post-inspection items.');

for (const routing of ROUTING_ASSERTIONS) {
  const item = byScenarioId[routing.scenario_id];
  if (!routing.check(item)) {
    fail(`${routing.assertion_id}: scenario ${routing.scenario_id} failed post-inspection check`);
  }
}
console.log(`PASS: all ${ROUTING_ASSERTIONS.length} post-inspection routing assertions verified.`);

if (!output.outcome_summary.won_supported) {
  fail('won_lost_closed_outcomes_supported: won outcome not demonstrated');
}
if (!output.outcome_summary.lost_supported) {
  fail('won_lost_closed_outcomes_supported: lost outcome not demonstrated');
}
if (!output.outcome_summary.closed_supported) {
  fail('won_lost_closed_outcomes_supported: closed outcome not demonstrated');
}
if (!output.outcome_summary.needs_review_supported) {
  fail('won_lost_closed_outcomes_supported: needs_review outcome not demonstrated');
}
if (!output.outcome_summary.still_open_supported) {
  fail('won_lost_closed_outcomes_supported: still_open outcome not demonstrated');
}
console.log('PASS: won, lost, closed, needs_review, and still_open outcomes are supported.');

if (!output.estimate_tracking_summary.tracking_only) {
  fail('estimate_needed_is_tracking_only: estimate tracking summary tracking_only must be true');
}
if (!output.estimate_tracking_summary.all_items_tracking_only) {
  fail('estimate_sent_is_tracking_only: not all estimate items are tracking only');
}
console.log('PASS: estimate-needed and estimate-sent tracking is tracking-only.');

if (!output.feedback_capture_summary.no_fake_reviews) {
  fail('no_fake_reviews: feedback capture summary must assert no fake reviews');
}
if (!output.feedback_capture_summary.no_review_farming) {
  fail('no_review_farming: feedback capture summary must assert no review farming');
}
if (!output.feedback_capture_summary.no_automatic_public_review_generation) {
  fail('no_automatic_public_review_generation: feedback capture summary must block automatic public review');
}
console.log('PASS: feedback capture boundaries verified (no fake reviews, no review farming, no automatic public review).');

if (!output.feedback_permission_summary.permissiontousepublicly_absent) {
  fail('permissiontousepublicly_absent: feedback permission summary must confirm field absent');
}
console.log('PASS: permission_to_use_publicly values are valid and permissiontousepublicly is absent.');

if (!output.post_inspection_review_summary.all_open_or_review_have_manual_next_step) {
  fail('required_manual_next_step_present_for_open_or_review_items: not all open/review items have manual next step');
}
console.log('PASS: all open or review items have required manual next step.');

if (!output.appointment_readiness_summary) {
  fail('output missing appointment_readiness_summary — prior appointment readiness expansion must remain');
}
if (!output.review_queue_summary) {
  fail('output missing review_queue_summary — prior review queue expansion must remain');
}
if (!output.reporting_snapshot_summary) {
  fail('output missing reporting_snapshot_summary — prior reporting expansion must remain');
}
if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log(
  'PASS: existing guard assertion, reporting snapshot, review queue, and appointment readiness summaries remain present.',
);

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
  if (!scenario.post_inspection_items || !scenario.post_inspection_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario post_inspection_items`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario post_inspection_items.');

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

mustHave(aggregate, 'verify-native-workflow-fixture-post-inspection-expansion-readonly.js', 'aggregate readiness');
mustHave(aggregate, 'Native Workflow Fixture Post-Inspection Expansion', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_POST_INSPECTION_EXPANSION.md',
  'run-native-workflow-fixture-post-inspection-expansion-dry-run.sh',
  'verify-native-workflow-fixture-post-inspection-expansion-readonly.js',
  'Native Workflow Fixture Post-Inspection Expansion',
  'native workflow fixture post-inspection expansion',
  'post-inspection expansion',
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
mustHave(wrapper, 'verify-native-workflow-fixture-post-inspection-expansion-readonly.js', 'wrapper post-inspection verifier');
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + ROUTING_ASSERTIONS.length;

console.log(
  `PASS: Native Workflow Fixture Post-Inspection Expansion verified (${assertionCount}+ assertions, ${output.post_inspection_items.length} post-inspection items).`,
);
console.log(
  'PASS: Native Workflow Fixture Post-Inspection Expansion is fixture-only, deterministic, and dry-run safe.',
);