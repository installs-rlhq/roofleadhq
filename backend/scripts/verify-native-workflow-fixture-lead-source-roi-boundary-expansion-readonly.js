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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_LEAD_SOURCE_ROI_BOUNDARY_EXPANSION.md';
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
const usageVolumeVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-usage-volume-plan-limit-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-lead-source-roi-boundary-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-lead-source-roi-boundary-expansion-readonly.js';
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

const REQUIRED_LEAD_SOURCE_ITEM_FIELDS = [
  'lead_source_item_id',
  'scenario_id',
  'lead_id',
  'roofer_account_id',
  'plan_profile',
  'report_period',
  'lead_source',
  'lead_source_detail',
  'campaign_or_ad_source_if_known',
  'lead_source_status',
  'lead_source_unknown_marker_used',
  'source_attribution_confidence',
  'source_attribution_review_needed',
  'source_attribution_review_reason',
  'total_count_from_source',
  'booked_inspection_from_source',
  'inspection_completed_from_source',
  'won_from_source',
  'lost_from_source',
  'still_open_from_source',
  'missed_lead_recovery_from_source',
  'feedback_captured_from_source',
  'ad_spend_if_provided',
  'cost_per_lead_if_provided',
  'cost_per_booked_inspection_if_provided',
  'roi_notes',
  'roi_calculation_allowed',
  'exact_roi_promised',
  'native_crm_sync_allowed',
  'pushes_data_back_to_roofleadhq',
  'production_data_touched',
  'external_services_called',
  'live_csv_delivery_performed',
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
  'lead_source_roi_expansion_summary_present',
  'lead_source_attribution_items_present',
  'lead_source_item_required_fields_present',
  'required_lead_source_categories_present',
  'website_form_source_present',
  'google_ads_source_present',
  'google_business_profile_source_present',
  'google_local_services_ads_source_present',
  'facebook_lead_ads_source_present',
  'angi_homeadvisor_source_present',
  'thumbtack_source_present',
  'referrals_source_present',
  'manual_outreach_list_source_present',
  'other_source_present',
  'unknown_source_requires_unknown_marker_or_review',
  'conflicting_source_routes_to_review',
  'source_attribution_issue_routes_to_system_quality_review',
  'campaign_or_ad_source_optional_and_marked_when_missing',
  'roi_depends_on_customer_provided_spend_source_data',
  'exact_roi_not_promised',
  'missing_spend_data_blocks_exact_roi_claim',
  'cost_per_lead_only_when_spend_and_count_present',
  'cost_per_booked_inspection_only_when_spend_and_booked_count_present',
  'no_ad_platform_api_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'csv_export_is_one_directional',
  'csv_does_not_push_data_back',
  'csv_does_not_auto_update_after_download',
  'homeowner_personal_information_warning_present',
  'customer_responsible_for_downloaded_exported_data',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'source_roi_decisions_are_audited',
  'public_roi_or_pricing_copy_not_changed_without_approval',
];

const CATEGORY_ASSERTION_MAP = {
  website_form_source_present: 'Website form',
  google_ads_source_present: 'Google Ads',
  google_business_profile_source_present: 'Google Business Profile',
  google_local_services_ads_source_present: 'Google Local Services Ads',
  facebook_lead_ads_source_present: 'Facebook Lead Ads',
  angi_homeadvisor_source_present: 'Angi / HomeAdvisor',
  thumbtack_source_present: 'Thumbtack',
  referrals_source_present: 'Referrals',
  manual_outreach_list_source_present: 'Manual outreach list',
  other_source_present: 'Other',
};

const ROUTING_ASSERTIONS = [
  {
    assertion_id: 'unknown_source_requires_unknown_marker_or_review',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) =>
      item.lead_source_unknown_marker_used === true &&
      item.source_attribution_review_needed === true &&
      item.lead_source_status === 'unknown',
  },
  {
    assertion_id: 'conflicting_source_routes_to_review',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) =>
      item.lead_source_status === 'conflicting' && item.source_attribution_review_needed === true,
  },
  {
    assertion_id: 'source_attribution_issue_routes_to_system_quality_review',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) =>
      item.source_attribution_issue === true && item.source_attribution_review_needed === true,
  },
  {
    assertion_id: 'campaign_or_ad_source_optional_and_marked_when_missing',
    scenario_id: 'normal_lead_to_appointment_readiness',
    check: (item) => item.campaign_or_ad_source_if_known === 'not_provided',
  },
  {
    assertion_id: 'roi_depends_on_customer_provided_spend_source_data',
    scenario_id: 'missing_information_path',
    check: (item) =>
      typeof item.ad_spend_if_provided === 'number' &&
      item.roi_calculation_allowed === true &&
      item.exact_roi_promised === 'no',
  },
  {
    assertion_id: 'missing_spend_data_blocks_exact_roi_claim',
    scenario_id: 'normal_lead_to_appointment_readiness',
    check: (item) =>
      item.ad_spend_if_provided === null &&
      item.roi_calculation_allowed === false &&
      item.exact_roi_promised === 'no',
  },
  {
    assertion_id: 'cost_per_lead_only_when_spend_and_count_present',
    scenario_id: 'missing_information_path',
    check: (item) =>
      typeof item.ad_spend_if_provided === 'number' &&
      item.total_count_from_source > 0 &&
      typeof item.cost_per_lead_if_provided === 'number',
  },
  {
    assertion_id: 'cost_per_booked_inspection_only_when_spend_and_booked_count_present',
    scenario_id: 'missing_information_path',
    check: (item) =>
      typeof item.ad_spend_if_provided === 'number' &&
      item.booked_inspection_from_source > 0 &&
      typeof item.cost_per_booked_inspection_if_provided === 'number',
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
console.log('PASS: usage volume verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['lead source ROI verifier', verifierPath],
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

if (!output.lead_source_roi_expansion) {
  fail('output missing lead_source_roi_expansion marker');
}
if (
  output.lead_source_roi_expansion !==
  'native_workflow_fixture_lead_source_roi_boundary_expansion'
) {
  fail('lead_source_roi_expansion marker is incorrect');
}
console.log('PASS: output includes lead_source_roi_expansion marker.');

for (const section of [
  'lead_source_roi_expansion_summary',
  'lead_source_attribution_items',
  'lead_source_quality_summary',
  'lead_source_unknown_summary',
  'campaign_ad_source_summary',
  'source_conversion_summary',
  'source_roi_boundary_summary',
  'customer_provided_spend_summary',
  'source_reporting_summary',
  'source_csv_export_summary',
  'lead_source_review_summary',
  'lead_source_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level lead source ROI sections are present.');

if (!Array.isArray(output.lead_source_attribution_items) || !output.lead_source_attribution_items.length) {
  fail('lead_source_attribution_items must be a non-empty array');
}
if (output.lead_source_attribution_items.length !== 25) {
  fail(
    `lead_source_attribution_items must include one item per scenario (found ${output.lead_source_attribution_items.length})`,
  );
}
console.log('PASS: lead_source_attribution_items array has 25 scenario items.');

for (const item of output.lead_source_attribution_items) {
  for (const field of REQUIRED_LEAD_SOURCE_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `lead source item ${item.lead_source_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  if (item.exact_roi_promised !== 'no') {
    fail(`lead source item ${item.lead_source_item_id} exact_roi_promised is not no`);
  }
  if (item.native_crm_sync_allowed !== 'no') {
    fail(`lead source item ${item.lead_source_item_id} native_crm_sync_allowed is not no`);
  }
  if (item.pushes_data_back_to_roofleadhq !== 'no') {
    fail(`lead source item ${item.lead_source_item_id} pushes_data_back_to_roofleadhq is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(`lead source item ${item.lead_source_item_id} production_data_touched is not no`);
  }
  if (item.external_services_called !== 'no') {
    fail(`lead source item ${item.lead_source_item_id} external_services_called is not no`);
  }
  if (item.live_csv_delivery_performed !== 'no') {
    fail(`lead source item ${item.lead_source_item_id} live_csv_delivery_performed is not no`);
  }
}
console.log('PASS: every lead source attribution item has required fields and safety values.');

const sourceNames = output.lead_source_attribution_items.map((row) => row.lead_source);
for (const source of REQUIRED_LEAD_SOURCES) {
  if (!sourceNames.includes(source)) {
    fail(`lead_source_attribution_items missing required category: ${source}`);
  }
}
console.log('PASS: all required lead source categories are present.');

for (const [assertionId, sourceName] of Object.entries(CATEGORY_ASSERTION_MAP)) {
  if (!sourceNames.includes(sourceName)) {
    fail(`${assertionId}: missing lead source category ${sourceName}`);
  }
}
console.log('PASS: per-category lead source presence assertions verified.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.lead_source_safety_assertions.includes(assertion)) {
    fail(`lead_source_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required lead source safety assertions are present.`,
);

const byScenarioId = {};
for (const item of output.lead_source_attribution_items) {
  byScenarioId[item.scenario_id] = item;
}

for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!byScenarioId[scenarioId]) {
    fail(`missing lead source attribution item for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have lead source attribution items.');

for (const routing of ROUTING_ASSERTIONS) {
  const item = byScenarioId[routing.scenario_id];
  if (!routing.check(item)) {
    fail(`${routing.assertion_id}: scenario ${routing.scenario_id} failed lead source check`);
  }
}
console.log(
  `PASS: all ${ROUTING_ASSERTIONS.length} lead source routing assertions verified.`,
);

if (!output.lead_source_roi_expansion_summary.required_lead_source_categories_present) {
  fail('required_lead_source_categories_present must be true in expansion summary');
}
if (output.lead_source_roi_expansion_summary.public_roi_or_pricing_copy_changed !== false) {
  fail('public_roi_or_pricing_copy_changed must be false');
}
console.log('PASS: lead source ROI expansion summary verified.');

if (!output.lead_source_unknown_summary.unknown_source_requires_unknown_marker_or_review) {
  fail('unknown_source_requires_unknown_marker_or_review: lead_source_unknown_summary must confirm');
}
console.log('PASS: lead source unknown summary verified.');

if (!output.campaign_ad_source_summary.campaign_or_ad_source_optional_and_marked_when_missing) {
  fail(
    'campaign_or_ad_source_optional_and_marked_when_missing: campaign_ad_source_summary must confirm',
  );
}
if (!output.campaign_ad_source_summary.no_ad_platform_api_calls) {
  fail('no_ad_platform_api_calls: campaign_ad_source_summary must confirm');
}
console.log('PASS: campaign/ad source summary verified.');

if (!output.source_roi_boundary_summary.roi_depends_on_customer_provided_spend_source_data) {
  fail('roi_depends_on_customer_provided_spend_source_data: source_roi_boundary_summary must confirm');
}
if (!output.source_roi_boundary_summary.exact_roi_not_promised) {
  fail('exact_roi_not_promised: source_roi_boundary_summary must confirm');
}
if (!output.source_roi_boundary_summary.missing_spend_data_blocks_exact_roi_claim) {
  fail('missing_spend_data_blocks_exact_roi_claim: source_roi_boundary_summary must confirm');
}
if (!output.source_roi_boundary_summary.cost_per_lead_only_when_spend_and_count_present) {
  fail('cost_per_lead_only_when_spend_and_count_present: source_roi_boundary_summary must confirm');
}
if (
  !output.source_roi_boundary_summary.cost_per_booked_inspection_only_when_spend_and_booked_count_present
) {
  fail(
    'cost_per_booked_inspection_only_when_spend_and_booked_count_present: source_roi_boundary_summary must confirm',
  );
}
if (!output.source_roi_boundary_summary.no_crm_sync) {
  fail('no_crm_sync: source_roi_boundary_summary must confirm');
}
console.log('PASS: source ROI boundary summary verified.');

if (!output.customer_provided_spend_summary.does_not_infer_real_customer_ad_spend) {
  fail('does_not_infer_real_customer_ad_spend: customer_provided_spend_summary must confirm');
}
if (!output.customer_provided_spend_summary.does_not_call_ad_platforms) {
  fail('does_not_call_ad_platforms: customer_provided_spend_summary must confirm');
}
console.log('PASS: customer-provided spend summary verified.');

const csvExport = output.source_csv_export_summary;
if (!csvExport.csv_export_is_one_directional) {
  fail('csv_export_is_one_directional: source_csv_export_summary must confirm');
}
if (!csvExport.csv_does_not_push_data_back) {
  fail('csv_does_not_push_data_back: source_csv_export_summary must confirm');
}
if (!csvExport.csv_does_not_auto_update_after_download) {
  fail('csv_does_not_auto_update_after_download: source_csv_export_summary must confirm');
}
if (!csvExport.homeowner_personal_information_warning_present) {
  fail('homeowner_personal_information_warning_present: source_csv_export_summary must confirm');
}
if (!csvExport.customer_responsible_for_downloaded_exported_data) {
  fail('customer_responsible_for_downloaded_exported_data: source_csv_export_summary must confirm');
}
if (!csvExport.no_live_csv_delivery) {
  fail('no_live_csv_delivery: source_csv_export_summary must confirm');
}
console.log('PASS: source CSV export summary verified.');

if (!output.lead_source_review_summary.conflicting_source_routes_to_review) {
  fail('conflicting_source_routes_to_review: lead_source_review_summary must confirm');
}
if (!output.lead_source_review_summary.source_attribution_issue_routes_to_system_quality_review) {
  fail(
    'source_attribution_issue_routes_to_system_quality_review: lead_source_review_summary must confirm',
  );
}
console.log('PASS: lead source review summary verified.');

if (!output.usage_volume_expansion) {
  fail('output missing usage_volume_expansion — prior usage volume expansion must remain');
}
if (!output.missed_lead_recovery_expansion) {
  fail('output missing missed_lead_recovery_expansion — prior missed lead recovery expansion must remain');
}
if (!output.manual_outreach_expansion) {
  fail('output missing manual_outreach_expansion — prior manual outreach expansion must remain');
}
if (!output.reporting_snapshot_summary) {
  fail('output missing reporting_snapshot_summary — prior reporting expansion must remain');
}
if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log(
  'PASS: existing guard assertion, reporting snapshot, manual outreach, missed lead recovery, and usage volume summaries remain present.',
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
  if (!scenario.lead_source_attribution_items || !scenario.lead_source_attribution_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario lead_source_attribution_items`);
  }
}
console.log(
  'PASS: every scenario preserves safety fields and per-scenario lead_source_attribution_items.',
);

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

const usageVolumeVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, usageVolumeVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
);
if (usageVolumeVerifierRun.status !== 0) {
  fail(
    `usage volume verifier failed: ${usageVolumeVerifierRun.stderr || usageVolumeVerifierRun.stdout}`,
  );
}
console.log('PASS: usage volume verifier still passes.');

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
  'verify-native-workflow-fixture-lead-source-roi-boundary-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Lead Source Attribution / ROI Boundary Expansion',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_LEAD_SOURCE_ROI_BOUNDARY_EXPANSION.md',
  'run-native-workflow-fixture-lead-source-roi-boundary-expansion-dry-run.sh',
  'verify-native-workflow-fixture-lead-source-roi-boundary-expansion-readonly.js',
  'Native Workflow Fixture Lead Source Attribution / ROI Boundary Expansion',
  'native workflow fixture lead source roi boundary expansion',
  'lead source roi boundary expansion',
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
mustHave(
  wrapper,
  'verify-native-workflow-fixture-lead-source-roi-boundary-expansion-readonly.js',
  'wrapper lead source ROI verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + ROUTING_ASSERTIONS.length;

console.log(
  `PASS: Native Workflow Fixture Lead Source Attribution / ROI Boundary Expansion verified (${assertionCount}+ assertions, ${output.lead_source_attribution_items.length} lead source attribution items).`,
);
console.log(
  'PASS: Native Workflow Fixture Lead Source Attribution / ROI Boundary Expansion is fixture-only, deterministic, and dry-run safe.',
);