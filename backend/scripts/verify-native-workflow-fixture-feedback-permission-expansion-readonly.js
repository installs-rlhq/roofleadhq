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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_FEEDBACK_PERMISSION_EXPANSION.md';
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
const postInspectionVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-post-inspection-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-feedback-permission-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-feedback-permission-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_FEEDBACK_PERMISSION_ITEM_FIELDS = [
  'feedback_permission_item_id',
  'scenario_id',
  'lead_id',
  'appointment_id',
  'post_inspection_item_id',
  'plan_profile',
  'current_state',
  'target_state',
  'feedback_requested',
  'feedback_captured',
  'feedback_summary',
  'feedback_issue_flag',
  'testimonial_candidate',
  'permission_to_use_publicly',
  'public_use_allowed',
  'public_use_block_reason',
  'internal_only',
  'homeowner_wants_follow_up',
  'roofer_showed_up_as_expected',
  'roofer_helpful_professional',
  'roofer_review_required',
  'roofleadhq_review_required',
  'required_manual_next_step',
  'csv_permission_value',
  'reporting_permission_value',
  'automatic_public_review_generated',
  'testimonial_published_publicly',
  'incentivized_positive_feedback_requested',
  'fake_review_generated',
  'review_farming_detected',
  'live_feedback_request_allowed',
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
  'feedback_permission_expansion_summary_present',
  'feedback_permission_items_present',
  'feedback_permission_item_required_fields_present',
  'permission_to_use_publicly_values_are_valid',
  'permissiontousepublicly_absent',
  'public_use_allowed_only_when_permission_yes',
  'public_use_blocked_when_permission_no',
  'public_use_blocked_when_permission_not_asked',
  'missing_permission_fails_closed_or_routes_to_review',
  'testimonial_candidate_does_not_publish_publicly',
  'testimonial_candidate_without_permission_remains_internal',
  'feedback_internal_unless_permission_obtained',
  'feedback_issue_flag_routes_to_review',
  'homeowner_wants_follow_up_routes_to_roofer_review',
  'negative_or_disputed_feedback_routes_to_roofer_review',
  'pricing_estimate_quote_feedback_routes_to_roofer_review',
  'payment_or_contract_feedback_routes_to_roofer_review',
  'roofleadhq_review_limited_to_system_quality',
  'feedback_permission_capture_mismatch_routes_to_roofleadhq_review',
  'csv_permission_value_matches_permission_to_use_publicly',
  'reporting_permission_value_matches_permission_to_use_publicly',
  'no_fake_reviews',
  'no_review_farming',
  'no_incentivized_positive_feedback_request',
  'no_automatic_public_review_generation',
  'no_automatic_testimonial_publication',
  'live_feedback_request_blocked_when_flag_false',
  'feedback_permission_uses_fake_data_only',
  'feedback_permission_does_not_touch_production_data',
  'feedback_permission_does_not_call_external_services',
  'feedback_permission_does_not_send_notifications',
  'feedback_permission_decisions_are_audited',
  'required_manual_next_step_present_for_issue_or_review_items',
  'automatic_public_review_generated_is_no_for_all_items',
  'testimonial_published_publicly_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
];

const VALID_PERMISSION_VALUES = new Set(['yes', 'no', 'not_asked', null]);

function resolvePermissionReportingValue(permission) {
  if (permission === 'yes' || permission === 'no' || permission === 'not_asked') {
    return permission;
  }
  return 'not_applicable';
}

const ROUTING_ASSERTIONS = [
  {
    assertion_id: 'public_use_allowed_only_when_permission_yes',
    scenario_id: 'feedback_permission_yes_path',
    check: (item) =>
      item.permission_to_use_publicly === 'yes' &&
      item.public_use_allowed === true &&
      item.testimonial_candidate === true,
  },
  {
    assertion_id: 'public_use_blocked_when_permission_no',
    scenario_id: 'feedback_permission_no_path',
    check: (item) =>
      item.permission_to_use_publicly === 'no' &&
      item.public_use_allowed === false &&
      item.internal_only === true,
  },
  {
    assertion_id: 'public_use_blocked_when_permission_not_asked',
    scenario_id: 'feedback_permission_not_asked_path',
    check: (item) =>
      item.permission_to_use_publicly === 'not_asked' &&
      item.public_use_allowed === false &&
      item.internal_only === true,
  },
  {
    assertion_id: 'feedback_internal_unless_permission_obtained',
    scenario_id: 'feedback_permission_no_path',
    check: (item) => item.feedback_captured === true && item.internal_only === true,
  },
  {
    assertion_id: 'testimonial_candidate_does_not_publish_publicly',
    scenario_id: 'feedback_permission_yes_path',
    check: (item) =>
      item.testimonial_candidate === true &&
      item.testimonial_published_publicly === 'no' &&
      item.automatic_public_review_generated === 'no',
  },
  {
    assertion_id: 'testimonial_candidate_without_permission_remains_internal',
    scenario_id: 'feedback_permission_not_asked_path',
    check: (item) => item.testimonial_candidate === false && item.internal_only === true,
  },
  {
    assertion_id: 'feedback_issue_flag_routes_to_review',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) =>
      item.feedback_issue_flag === true &&
      item.roofer_review_required === true &&
      item.internal_only === true,
  },
  {
    assertion_id: 'homeowner_wants_follow_up_routes_to_roofer_review',
    scenario_id: 'homeowner_follow_up_needed_path',
    check: (item) =>
      item.homeowner_wants_follow_up === true && item.required_manual_next_step,
  },
  {
    assertion_id: 'negative_or_disputed_feedback_routes_to_roofer_review',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) =>
      item.negative_or_disputed_feedback === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'pricing_estimate_quote_feedback_routes_to_roofer_review',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.pricing_estimate_quote_feedback === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'payment_or_contract_feedback_routes_to_roofer_review',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) =>
      item.payment_or_contract_feedback === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'roofleadhq_review_limited_to_system_quality',
    scenario_id: 'roofleadhq_system_review_needed_path',
    check: (item) =>
      item.roofleadhq_review_required === true && item.roofer_review_required === false,
  },
  {
    assertion_id: 'feedback_permission_capture_mismatch_routes_to_roofleadhq_review',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    check: (item) =>
      item.feedback_permission_capture_mismatch === true &&
      item.roofleadhq_review_required === true,
  },
  {
    assertion_id: 'live_feedback_request_blocked_when_flag_false',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) => item.live_feedback_request_allowed === 'no',
  },
  {
    assertion_id: 'missing_permission_fails_closed_or_routes_to_review',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    check: (item) =>
      item.permission_to_use_publicly === 'not_asked' &&
      !item.public_use_allowed &&
      item.internal_only === true,
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
console.log('PASS: post-inspection verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['feedback permission verifier', verifierPath],
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

if (!output.feedback_permission_expansion) {
  fail('output missing feedback_permission_expansion marker');
}
if (
  output.feedback_permission_expansion !==
  'native_workflow_fixture_feedback_permission_expansion'
) {
  fail('feedback_permission_expansion marker is incorrect');
}
console.log('PASS: output includes feedback_permission_expansion marker.');

for (const section of [
  'feedback_permission_expansion_summary',
  'feedback_permission_items',
  'feedback_permission_status_summary',
  'testimonial_candidate_summary',
  'feedback_issue_summary',
  'public_use_permission_summary',
  'feedback_csv_reporting_summary',
  'feedback_review_boundary_summary',
  'feedback_permission_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level feedback permission sections are present.');

if (!Array.isArray(output.feedback_permission_items) || !output.feedback_permission_items.length) {
  fail('feedback_permission_items must be a non-empty array');
}
if (output.feedback_permission_items.length !== 25) {
  fail(
    `feedback_permission_items must include one item per scenario (found ${output.feedback_permission_items.length})`,
  );
}
console.log('PASS: feedback_permission_items array has 25 scenario items.');

for (const item of output.feedback_permission_items) {
  for (const field of REQUIRED_FEEDBACK_PERMISSION_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `feedback permission item ${item.feedback_permission_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  if (!VALID_PERMISSION_VALUES.has(item.permission_to_use_publicly)) {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} has invalid permission_to_use_publicly: ${item.permission_to_use_publicly}`,
    );
  }
  if ('permissiontousepublicly' in item) {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} has forbidden field permissiontousepublicly`,
    );
  }
  if (item.automatic_public_review_generated !== 'no') {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} automatic_public_review_generated is not no`,
    );
  }
  if (item.testimonial_published_publicly !== 'no') {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} testimonial_published_publicly is not no`,
    );
  }
  if (item.incentivized_positive_feedback_requested !== 'no') {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} incentivized_positive_feedback_requested is not no`,
    );
  }
  if (item.fake_review_generated !== 'no') {
    fail(`feedback permission item ${item.feedback_permission_item_id} fake_review_generated is not no`);
  }
  if (item.review_farming_detected !== 'no') {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} review_farming_detected is not no`,
    );
  }
  if (item.live_feedback_request_allowed !== 'no') {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} live_feedback_request_allowed is not no`,
    );
  }
  if (item.production_data_touched !== 'no') {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} production_data_touched is not no`,
    );
  }
  if (item.external_services_called !== 'no') {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} external_services_called is not no`,
    );
  }
  if (item.csv_permission_value !== resolvePermissionReportingValue(item.permission_to_use_publicly)) {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} csv_permission_value does not match permission_to_use_publicly`,
    );
  }
  if (
    item.reporting_permission_value !==
    resolvePermissionReportingValue(item.permission_to_use_publicly)
  ) {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} reporting_permission_value does not match permission_to_use_publicly`,
    );
  }
  if (item.permission_to_use_publicly === 'yes' && !item.public_use_allowed) {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} permission yes but public_use_allowed is false`,
    );
  }
  if (item.permission_to_use_publicly === 'no' && item.public_use_allowed) {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} permission no but public_use_allowed is true`,
    );
  }
  if (item.permission_to_use_publicly === 'not_asked' && item.public_use_allowed) {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} permission not_asked but public_use_allowed is true`,
    );
  }
  if (item.testimonial_candidate && item.permission_to_use_publicly !== 'yes' && !item.internal_only) {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} testimonial candidate without permission must remain internal`,
    );
  }
  const needsManualStep =
    item.feedback_issue_flag ||
    item.roofer_review_required ||
    item.roofleadhq_review_required ||
    item.feedback_permission_capture_mismatch;
  if (needsManualStep && !item.required_manual_next_step) {
    fail(
      `feedback permission item ${item.feedback_permission_item_id} missing required_manual_next_step for issue/review item`,
    );
  }
}
console.log('PASS: every feedback permission item has required fields and safety values.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.feedback_permission_safety_assertions.includes(assertion)) {
    fail(`feedback_permission_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required feedback permission safety assertions are present.`,
);

const byScenarioId = {};
for (const item of output.feedback_permission_items) {
  byScenarioId[item.scenario_id] = item;
}

for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!byScenarioId[scenarioId]) {
    fail(`missing feedback permission item for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have feedback permission items.');

for (const routing of ROUTING_ASSERTIONS) {
  const item = byScenarioId[routing.scenario_id];
  if (!routing.check(item)) {
    fail(`${routing.assertion_id}: scenario ${routing.scenario_id} failed feedback permission check`);
  }
}
console.log(
  `PASS: all ${ROUTING_ASSERTIONS.length} feedback permission routing assertions verified.`,
);

if (!output.public_use_permission_summary.permissiontousepublicly_absent) {
  fail('permissiontousepublicly_absent: public use permission summary must confirm field absent');
}
console.log('PASS: permission_to_use_publicly values are valid and permissiontousepublicly is absent.');

if (!output.feedback_csv_reporting_summary.csv_permission_values_match) {
  fail('csv_permission_value_matches_permission_to_use_publicly: csv values must match');
}
if (!output.feedback_csv_reporting_summary.reporting_permission_values_match) {
  fail('reporting_permission_value_matches_permission_to_use_publicly: reporting values must match');
}
console.log('PASS: CSV and reporting permission values match permission_to_use_publicly.');

if (output.testimonial_candidate_summary.testimonial_published_publicly !== 'no') {
  fail('no_automatic_testimonial_publication: testimonial summary must block publication');
}
console.log('PASS: testimonial candidate boundaries verified (no automatic publication).');

if (!output.feedback_review_boundary_summary.all_review_or_issue_have_manual_next_step) {
  fail(
    'required_manual_next_step_present_for_issue_or_review_items: not all issue/review items have manual next step',
  );
}
console.log('PASS: all issue or review items have required manual next step.');

if (!output.post_inspection_expansion) {
  fail('output missing post_inspection_expansion — prior post-inspection expansion must remain');
}
if (!output.post_inspection_summary) {
  fail('output missing post_inspection_summary — prior post-inspection expansion must remain');
}
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
  'PASS: existing guard assertion, reporting snapshot, review queue, appointment readiness, and post-inspection summaries remain present.',
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
  if (!scenario.feedback_permission_items || !scenario.feedback_permission_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario feedback_permission_items`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario feedback_permission_items.');

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

const postInspectionVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, postInspectionVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
);
if (postInspectionVerifierRun.status !== 0) {
  fail(
    `post-inspection verifier failed: ${postInspectionVerifierRun.stderr || postInspectionVerifierRun.stdout}`,
  );
}
console.log('PASS: post-inspection verifier still passes.');

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
  'incentivized positive feedback',
  'native CRM sync',
  'fully autonomous',
  'fake reviews',
  'review farming',
  'automatic public review generation',
  'automatic testimonial publication',
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

mustHave(
  aggregate,
  'verify-native-workflow-fixture-feedback-permission-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Native Workflow Fixture Feedback Permission Expansion', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_FEEDBACK_PERMISSION_EXPANSION.md',
  'run-native-workflow-fixture-feedback-permission-expansion-dry-run.sh',
  'verify-native-workflow-fixture-feedback-permission-expansion-readonly.js',
  'Native Workflow Fixture Feedback Permission Expansion',
  'native workflow fixture feedback permission expansion',
  'feedback permission expansion',
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
mustHave(
  wrapper,
  'verify-native-workflow-fixture-feedback-permission-expansion-readonly.js',
  'wrapper feedback permission verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + ROUTING_ASSERTIONS.length;

console.log(
  `PASS: Native Workflow Fixture Feedback Permission Expansion verified (${assertionCount}+ assertions, ${output.feedback_permission_items.length} feedback permission items).`,
);
console.log(
  'PASS: Native Workflow Fixture Feedback Permission Expansion is fixture-only, deterministic, and dry-run safe.',
);