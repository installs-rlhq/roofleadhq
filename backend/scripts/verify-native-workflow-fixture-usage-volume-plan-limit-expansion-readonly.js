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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_USAGE_VOLUME_PLAN_LIMIT_EXPANSION.md';
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
const feedbackPermissionVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-feedback-permission-expansion-readonly.js';
const manualOutreachVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-manual-outreach-expansion-readonly.js';
const missedLeadRecoveryVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-missed-lead-recovery-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-usage-volume-plan-limit-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-usage-volume-plan-limit-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_USAGE_VOLUME_ITEM_FIELDS = [
  'usage_volume_item_id',
  'scenario_id',
  'roofer_account_id',
  'plan_profile',
  'report_period',
  'included_lead_volume',
  'current_period_lead_count',
  'prior_period_lead_count',
  'projected_period_lead_count',
  'volume_band',
  'plan_limit_status',
  'usage_over_limit',
  'overage_count',
  'overage_block_count_if_applicable',
  'plan_upgrade_recommended',
  'custom_review_required',
  'custom_review_reason',
  'billing_action_allowed',
  'automatic_plan_change_allowed',
  'live_billing_action_performed',
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
  'usage_volume_expansion_summary_present',
  'usage_volume_items_present',
  'usage_volume_item_required_fields_present',
  'starter_limit_100_leads_enforced_in_fixture',
  'growth_limit_300_leads_enforced_in_fixture',
  'elite_limit_500_leads_enforced_in_fixture',
  'five_hundred_plus_leads_routes_to_custom_review',
  'two_plus_locations_routes_to_custom_review',
  'multiple_calendars_routes_to_custom_review',
  'multiple_phone_numbers_routes_to_custom_review',
  'multiple_sales_reps_routes_to_custom_review',
  'complex_routing_routes_to_custom_review',
  'advanced_custom_reporting_routes_to_custom_review',
  'overage_tracking_is_fake_data_only',
  'overage_does_not_trigger_live_billing',
  'overage_does_not_auto_upgrade_plan',
  'plan_upgrade_recommendation_is_manual_review_only',
  'billing_action_allowed_is_no_for_all_items',
  'automatic_plan_change_allowed_is_no_for_all_items',
  'live_billing_action_performed_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'usage_volume_does_not_touch_production_data',
  'usage_volume_does_not_call_external_services',
  'usage_volume_does_not_change_customer_plan',
  'usage_volume_does_not_send_notifications',
  'usage_volume_decisions_are_audited',
  'reporting_summary_includes_usage_volume',
  'csv_snapshot_preserves_plan_and_usage_context_if_applicable',
  'public_pricing_copy_not_changed_without_approval',
];

const ROUTING_ASSERTIONS = [
  {
    assertion_id: 'starter_limit_100_leads_enforced_in_fixture',
    scenario_id: 'starter_plan_profile_path',
    check: (item) =>
      item.plan_profile === 'starter' &&
      item.included_lead_volume === 100 &&
      item.current_period_lead_count <= 100 &&
      !item.custom_review_required,
  },
  {
    assertion_id: 'growth_limit_300_leads_enforced_in_fixture',
    scenario_id: 'growth_plan_profile_path',
    check: (item) =>
      item.plan_profile === 'growth' &&
      item.included_lead_volume === 300 &&
      item.current_period_lead_count <= 300 &&
      !item.usage_over_limit,
  },
  {
    assertion_id: 'elite_limit_500_leads_enforced_in_fixture',
    scenario_id: 'elite_plan_profile_path',
    check: (item) =>
      item.plan_profile === 'elite' &&
      item.included_lead_volume === 500 &&
      item.current_period_lead_count <= 500 &&
      !item.custom_review_required,
  },
  {
    assertion_id: 'five_hundred_plus_leads_routes_to_custom_review',
    scenario_id: 'custom_review_500_plus_leads_path',
    check: (item) =>
      item.current_period_lead_count >= 500 &&
      item.custom_review_required === true &&
      item.custom_review_reason === 'volume_exceeds_500',
  },
  {
    assertion_id: 'two_plus_locations_routes_to_custom_review',
    scenario_id: 'custom_review_two_plus_locations_path',
    check: (item) =>
      item.custom_review_required === true && item.custom_review_reason === 'multi_location',
  },
  {
    assertion_id: 'multiple_calendars_routes_to_custom_review',
    scenario_id: 'appointment_booked_path',
    check: (item) =>
      item.custom_review_required === true && item.custom_review_reason === 'multiple_calendars',
  },
  {
    assertion_id: 'multiple_phone_numbers_routes_to_custom_review',
    scenario_id: 'roofer_review_needed_path',
    check: (item) =>
      item.custom_review_required === true &&
      item.custom_review_reason === 'multiple_phone_numbers',
  },
  {
    assertion_id: 'multiple_sales_reps_routes_to_custom_review',
    scenario_id: 'inspection_completed_path',
    check: (item) =>
      item.custom_review_required === true && item.custom_review_reason === 'multiple_sales_reps',
  },
  {
    assertion_id: 'complex_routing_routes_to_custom_review',
    scenario_id: 'duplicate_review_path',
    check: (item) =>
      item.custom_review_required === true && item.custom_review_reason === 'complex_routing',
  },
  {
    assertion_id: 'advanced_custom_reporting_routes_to_custom_review',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    check: (item) =>
      item.custom_review_required === true &&
      item.custom_review_reason === 'advanced_custom_reporting',
  },
  {
    assertion_id: 'overage_tracking_is_fake_data_only',
    scenario_id: 'post_inspection_still_open_path',
    check: (item) =>
      item.usage_over_limit === true &&
      item.overage_count > 0 &&
      item.live_billing_action_performed === 'no' &&
      item.billing_action_allowed === 'no',
  },
  {
    assertion_id: 'overage_does_not_trigger_live_billing',
    scenario_id: 'post_inspection_still_open_path',
    check: (item) =>
      item.usage_over_limit === true && item.live_billing_action_performed === 'no',
  },
  {
    assertion_id: 'overage_does_not_auto_upgrade_plan',
    scenario_id: 'post_inspection_still_open_path',
    check: (item) =>
      item.usage_over_limit === true && item.automatic_plan_change_allowed === 'no',
  },
  {
    assertion_id: 'plan_upgrade_recommendation_is_manual_review_only',
    scenario_id: 'post_inspection_still_open_path',
    check: (item) =>
      item.plan_upgrade_recommended === true && item.automatic_plan_change_allowed === 'no',
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
console.log('PASS: feedback permission verifier exists.');
console.log('PASS: manual outreach verifier exists.');
console.log('PASS: missed lead recovery verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['usage volume verifier', verifierPath],
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
  maxBuffer: 32 * 1024 * 1024,
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

if (!output.usage_volume_expansion) {
  fail('output missing usage_volume_expansion marker');
}
if (
  output.usage_volume_expansion !== 'native_workflow_fixture_usage_volume_plan_limit_expansion'
) {
  fail('usage_volume_expansion marker is incorrect');
}
console.log('PASS: output includes usage_volume_expansion marker.');

for (const section of [
  'usage_volume_expansion_summary',
  'usage_volume_items',
  'plan_limit_summary',
  'starter_volume_summary',
  'growth_volume_summary',
  'elite_volume_summary',
  'custom_review_volume_summary',
  'overage_tracking_summary',
  'plan_upgrade_recommendation_summary',
  'usage_volume_reporting_summary',
  'usage_volume_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level usage volume sections are present.');

if (!Array.isArray(output.usage_volume_items) || !output.usage_volume_items.length) {
  fail('usage_volume_items must be a non-empty array');
}
if (output.usage_volume_items.length !== 25) {
  fail(
    `usage_volume_items must include one item per scenario (found ${output.usage_volume_items.length})`,
  );
}
console.log('PASS: usage_volume_items array has 25 scenario items.');

for (const item of output.usage_volume_items) {
  for (const field of REQUIRED_USAGE_VOLUME_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `usage volume item ${item.usage_volume_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  if (item.billing_action_allowed !== 'no') {
    fail(`usage volume item ${item.usage_volume_item_id} billing_action_allowed is not no`);
  }
  if (item.automatic_plan_change_allowed !== 'no') {
    fail(
      `usage volume item ${item.usage_volume_item_id} automatic_plan_change_allowed is not no`,
    );
  }
  if (item.live_billing_action_performed !== 'no') {
    fail(
      `usage volume item ${item.usage_volume_item_id} live_billing_action_performed is not no`,
    );
  }
  if (item.production_data_touched !== 'no') {
    fail(
      `usage volume item ${item.usage_volume_item_id} production_data_touched is not no`,
    );
  }
  if (item.external_services_called !== 'no') {
    fail(
      `usage volume item ${item.usage_volume_item_id} external_services_called is not no`,
    );
  }
}
console.log('PASS: every usage volume item has required fields and safety values.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.usage_volume_safety_assertions.includes(assertion)) {
    fail(`usage_volume_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required usage volume safety assertions are present.`,
);

const byScenarioId = {};
for (const item of output.usage_volume_items) {
  byScenarioId[item.scenario_id] = item;
}

for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!byScenarioId[scenarioId]) {
    fail(`missing usage volume item for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have usage volume items.');

for (const routing of ROUTING_ASSERTIONS) {
  const item = byScenarioId[routing.scenario_id];
  if (!routing.check(item)) {
    fail(`${routing.assertion_id}: scenario ${routing.scenario_id} failed usage volume check`);
  }
}
console.log(
  `PASS: all ${ROUTING_ASSERTIONS.length} usage volume routing assertions verified.`,
);

if (!output.plan_limit_summary.starter_limit_100_leads_enforced_in_fixture) {
  fail('starter_limit_100_leads_enforced_in_fixture: plan_limit_summary must confirm');
}
if (!output.plan_limit_summary.growth_limit_300_leads_enforced_in_fixture) {
  fail('growth_limit_300_leads_enforced_in_fixture: plan_limit_summary must confirm');
}
if (!output.plan_limit_summary.elite_limit_500_leads_enforced_in_fixture) {
  fail('elite_limit_500_leads_enforced_in_fixture: plan_limit_summary must confirm');
}
console.log('PASS: plan limit summaries verified.');

if (!output.custom_review_volume_summary.five_hundred_plus_leads_routes_to_custom_review) {
  fail('five_hundred_plus_leads_routes_to_custom_review: custom_review_volume_summary must confirm');
}
if (!output.custom_review_volume_summary.two_plus_locations_routes_to_custom_review) {
  fail('two_plus_locations_routes_to_custom_review: custom_review_volume_summary must confirm');
}
if (!output.custom_review_volume_summary.multiple_calendars_routes_to_custom_review) {
  fail('multiple_calendars_routes_to_custom_review: custom_review_volume_summary must confirm');
}
if (!output.custom_review_volume_summary.multiple_phone_numbers_routes_to_custom_review) {
  fail('multiple_phone_numbers_routes_to_custom_review: custom_review_volume_summary must confirm');
}
if (!output.custom_review_volume_summary.multiple_sales_reps_routes_to_custom_review) {
  fail('multiple_sales_reps_routes_to_custom_review: custom_review_volume_summary must confirm');
}
if (!output.custom_review_volume_summary.complex_routing_routes_to_custom_review) {
  fail('complex_routing_routes_to_custom_review: custom_review_volume_summary must confirm');
}
if (!output.custom_review_volume_summary.advanced_custom_reporting_routes_to_custom_review) {
  fail(
    'advanced_custom_reporting_routes_to_custom_review: custom_review_volume_summary must confirm',
  );
}
console.log('PASS: custom review volume summary verified.');

if (!output.overage_tracking_summary.overage_tracking_is_fake_data_only) {
  fail('overage_tracking_is_fake_data_only: overage_tracking_summary must confirm');
}
if (!output.overage_tracking_summary.overage_does_not_trigger_live_billing) {
  fail('overage_does_not_trigger_live_billing: overage_tracking_summary must confirm');
}
if (!output.overage_tracking_summary.overage_does_not_auto_upgrade_plan) {
  fail('overage_does_not_auto_upgrade_plan: overage_tracking_summary must confirm');
}
if (
  output.overage_tracking_summary.draft_overage_fee_concept.billing_approval_status !==
  'draft_internal_not_approved'
) {
  fail('draft overage fee concept must be draft_internal_not_approved');
}
console.log('PASS: overage tracking summary verified.');

if (!output.plan_upgrade_recommendation_summary.plan_upgrade_recommendation_is_manual_review_only) {
  fail('plan_upgrade_recommendation_is_manual_review_only: summary must confirm');
}
console.log('PASS: plan upgrade recommendation summary verified.');

if (!output.usage_volume_reporting_summary.reporting_summary_includes_usage_volume) {
  fail('reporting_summary_includes_usage_volume: reporting summary must confirm');
}
if (
  !output.usage_volume_reporting_summary.csv_snapshot_preserves_plan_and_usage_context_if_applicable
) {
  fail('csv_snapshot_preserves_plan_and_usage_context_if_applicable: reporting summary must confirm');
}
if (!output.usage_volume_reporting_summary.public_pricing_copy_not_changed_without_approval) {
  fail('public_pricing_copy_not_changed_without_approval: reporting summary must confirm');
}

const csvSnapshot = output.csv_export_snapshot_summary;
if (!csvSnapshot || !csvSnapshot.header_row.includes('plan_profile')) {
  fail('csv header missing plan_profile field');
}
if (!csvSnapshot.header_row.includes('included_lead_volume')) {
  fail('csv header missing included_lead_volume field');
}
if (!csvSnapshot.header_row.includes('current_period_lead_count')) {
  fail('csv header missing current_period_lead_count field');
}
if (!csvSnapshot.header_row.includes('usage_over_limit')) {
  fail('csv header missing usage_over_limit field');
}
if (!csvSnapshot.header_row.includes('plan_limit_status')) {
  fail('csv header missing plan_limit_status field');
}
const overageCsvRow = (csvSnapshot.sample_rows || []).find(
  (row) => row.usage_over_limit === 'yes',
);
if (!overageCsvRow) {
  fail('csv sample rows missing usage_over_limit=yes fixture row');
}
console.log('PASS: reporting and CSV usage volume compatibility verified.');

if (!output.missed_lead_recovery_expansion) {
  fail('output missing missed_lead_recovery_expansion — prior missed lead recovery expansion must remain');
}
if (!output.manual_outreach_expansion) {
  fail('output missing manual_outreach_expansion — prior manual outreach expansion must remain');
}
if (!output.feedback_permission_expansion) {
  fail('output missing feedback_permission_expansion — prior feedback permission expansion must remain');
}
if (!output.post_inspection_expansion) {
  fail('output missing post_inspection_expansion — prior post-inspection expansion must remain');
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
  'PASS: existing guard assertion, reporting snapshot, review queue, appointment readiness, post-inspection, feedback permission, manual outreach, and missed lead recovery summaries remain present.',
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
  if (!scenario.usage_volume_items || !scenario.usage_volume_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario usage_volume_items`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario usage_volume_items.');

if (output.usage_volume_expansion_summary.public_pricing_copy_changed !== false) {
  fail('public_pricing_copy_changed must be false');
}
console.log('PASS: public pricing copy unchanged.');

const existingVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, existingVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
);
if (existingVerifierRun.status !== 0) {
  fail(
    `existing fixture dry-run verifier failed: ${existingVerifierRun.stderr || existingVerifierRun.stdout}`,
  );
}
console.log('PASS: existing fixture dry-run verifier still passes.');

const missedLeadRecoveryVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, missedLeadRecoveryVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
);
if (missedLeadRecoveryVerifierRun.status !== 0) {
  fail(
    `missed lead recovery verifier failed: ${missedLeadRecoveryVerifierRun.stderr || missedLeadRecoveryVerifierRun.stdout}`,
  );
}
console.log('PASS: missed lead recovery verifier still passes.');

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
  'native CRM sync',
  'fully autonomous',
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
  'verify-native-workflow-fixture-usage-volume-plan-limit-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Usage Volume Plan Limit Expansion',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_USAGE_VOLUME_PLAN_LIMIT_EXPANSION.md',
  'run-native-workflow-fixture-usage-volume-plan-limit-expansion-dry-run.sh',
  'verify-native-workflow-fixture-usage-volume-plan-limit-expansion-readonly.js',
  'Native Workflow Fixture Usage Volume Plan Limit Expansion',
  'native workflow fixture usage volume plan limit expansion',
  'usage volume plan limit expansion',
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
mustHave(
  wrapper,
  'verify-native-workflow-fixture-manual-outreach-expansion-readonly.js',
  'wrapper manual outreach verifier',
);
mustHave(
  wrapper,
  'verify-native-workflow-fixture-missed-lead-recovery-expansion-readonly.js',
  'wrapper missed lead recovery verifier',
);
mustHave(
  wrapper,
  'verify-native-workflow-fixture-usage-volume-plan-limit-expansion-readonly.js',
  'wrapper usage volume verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + ROUTING_ASSERTIONS.length;

console.log(
  `PASS: Native Workflow Fixture Usage Volume Plan Limit Expansion verified (${assertionCount}+ assertions, ${output.usage_volume_items.length} usage volume items).`,
);
console.log(
  'PASS: Native Workflow Fixture Usage Volume Plan Limit Expansion is fixture-only, deterministic, and dry-run safe.',
);