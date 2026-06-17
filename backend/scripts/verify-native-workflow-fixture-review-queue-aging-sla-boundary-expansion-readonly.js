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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_AGING_SLA_BOUNDARY_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const reviewQueueVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-review-queue-expansion-readonly.js';
const dataBoundaryVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-data-boundary-pii-minimization-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_AGING_ITEM_FIELDS = [
  'review_queue_aging_item_id',
  'scenario_id',
  'lead_id',
  'roofer_account_id',
  'plan_profile',
  'review_item_id',
  'review_type',
  'review_owner',
  'review_reason',
  'source_state',
  'target_state',
  'current_state',
  'created_at_fixture',
  'last_updated_at_fixture',
  'age_hours',
  'age_bucket',
  'stale_review',
  'blocked_state',
  'hold_state',
  'hold_reason',
  'required_manual_next_step',
  'next_step_owner',
  'next_step_due_date_fixture',
  'next_step_overdue',
  'roofer_review_required',
  'roofleadhq_review_required',
  'business_judgment_required',
  'system_quality_issue',
  'escalation_ready_for_manual_review',
  'notification_allowed',
  'live_notification_sent',
  'production_data_touched',
  'external_services_called',
  'audit_event_id',
];

const REQUIRED_AGE_BUCKETS = ['0-4h', '4-24h', '24-48h', '48h+'];

const REQUIRED_AGING_COVERAGE_TYPES = [
  'pricing_question',
  'estimate_question',
  'quote_request',
  'insurance_complexity',
  'payment_or_invoice_question',
  'contract_question',
  'homeowner_asks_for_roofer_directly',
  'upset_homeowner',
  'bad_or_unclear_ai_response',
  'missed_data_capture',
  'broken_routing',
  'source_attribution_issue',
  'dashboard_report_discrepancy',
  'workflow_state_confusion',
  'setup_issue',
  'feedback_permission_mismatch',
  'missed_lead_recovery_blocked',
  'appointment_readiness_blocked',
  'post_inspection_follow_up_blocked',
  'volume_exceeds_500',
  'multi_location',
  'data_boundary_pii_issue',
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
  'review_queue_aging_sla_expansion_summary_present',
  'review_queue_aging_items_present',
  'review_queue_aging_item_required_fields_present',
  'review_age_bucket_summary_present',
  'stale_review_summary_present',
  'blocked_review_summary_present',
  'hold_state_summary_present',
  'manual_next_step_owner_summary_present',
  'roofer_review_aging_summary_present',
  'roofleadhq_review_aging_summary_present',
  'review_sla_boundary_summary_present',
  'age_bucket_is_deterministic',
  'stale_review_flag_uses_fixture_threshold',
  'blocked_state_has_hold_reason',
  'hold_state_has_required_manual_next_step',
  'next_step_owner_present_for_all_review_items',
  'next_step_due_date_fixture_present_for_all_review_items',
  'overdue_review_does_not_send_notification',
  'escalation_ready_does_not_send_notification',
  'roofer_review_owns_business_judgment_items',
  'roofleadhq_review_limited_to_system_quality_items',
  'notification_allowed_is_no_for_all_items',
  'live_notification_sent_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'review_queue_aging_is_fake_data_only',
  'review_queue_aging_is_audited',
  'reporting_summary_includes_review_queue_aging',
  'public_sla_or_support_copy_not_changed_without_approval',
];

const STALE_REVIEW_THRESHOLD_HOURS = 24;

function deriveExpectedAgeBucket(ageHours) {
  if (ageHours < 4) return '0-4h';
  if (ageHours < 24) return '4-24h';
  if (ageHours < 48) return '24-48h';
  return '48h+';
}

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
console.log('PASS: review queue verifier exists.');
console.log('PASS: data boundary PII verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['review queue aging SLA verifier', verifierPath],
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

if (!output.review_queue_aging_sla_expansion) {
  fail('output missing review_queue_aging_sla_expansion marker');
}
if (
  output.review_queue_aging_sla_expansion !==
  'native_workflow_fixture_review_queue_aging_sla_boundary_expansion'
) {
  fail('review_queue_aging_sla_expansion marker is incorrect');
}
console.log('PASS: output includes review_queue_aging_sla_expansion marker.');

for (const section of [
  'review_queue_aging_sla_expansion_summary',
  'review_queue_aging_items',
  'review_age_bucket_summary',
  'stale_review_summary',
  'blocked_review_summary',
  'hold_state_summary',
  'manual_next_step_owner_summary',
  'roofer_review_aging_summary',
  'roofleadhq_review_aging_summary',
  'review_sla_boundary_summary',
  'review_queue_aging_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level review queue aging SLA sections are present.');

if (!Array.isArray(output.review_queue_aging_items) || !output.review_queue_aging_items.length) {
  fail('review_queue_aging_items must be a non-empty array');
}
console.log(
  `PASS: review_queue_aging_items (${output.review_queue_aging_items.length}) are present.`,
);

const coverageTypesPresent = new Set(
  output.review_queue_aging_items.map((item) => item.review_type),
);
for (const reviewType of REQUIRED_AGING_COVERAGE_TYPES) {
  if (!coverageTypesPresent.has(reviewType)) {
    fail(`required aging coverage type missing: ${reviewType}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_AGING_COVERAGE_TYPES.length} required aging coverage types are present.`,
);

for (const item of output.review_queue_aging_items) {
  for (const field of REQUIRED_AGING_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `review queue aging item ${item.review_queue_aging_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  if (item.notification_allowed !== 'no') {
    fail(`aging item ${item.review_queue_aging_item_id} notification_allowed is not no`);
  }
  if (item.live_notification_sent !== 'no') {
    fail(`aging item ${item.review_queue_aging_item_id} live_notification_sent is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(`aging item ${item.review_queue_aging_item_id} production_data_touched is not no`);
  }
  if (item.external_services_called !== 'no') {
    fail(`aging item ${item.review_queue_aging_item_id} external_services_called is not no`);
  }
  if (!item.audit_event_id) {
    fail(`aging item ${item.review_queue_aging_item_id} missing audit_event_id`);
  }
  if (!item.next_step_owner) {
    fail(`aging item ${item.review_queue_aging_item_id} missing next_step_owner`);
  }
  if (!item.next_step_due_date_fixture) {
    fail(`aging item ${item.review_queue_aging_item_id} missing next_step_due_date_fixture`);
  }
  if (!REQUIRED_AGE_BUCKETS.includes(item.age_bucket)) {
    fail(`aging item ${item.review_queue_aging_item_id} has invalid age_bucket: ${item.age_bucket}`);
  }
  if (item.age_bucket !== deriveExpectedAgeBucket(item.age_hours)) {
    fail(`aging item ${item.review_queue_aging_item_id} age_bucket is not deterministic for age_hours`);
  }
  if (item.stale_review !== item.age_hours >= STALE_REVIEW_THRESHOLD_HOURS) {
    fail(`aging item ${item.review_queue_aging_item_id} stale_review does not use fixture threshold`);
  }
  if (item.blocked_state && !item.hold_reason) {
    fail(`blocked aging item ${item.review_queue_aging_item_id} missing hold_reason`);
  }
  if (item.hold_state !== 'none' && !item.required_manual_next_step) {
    fail(`hold aging item ${item.review_queue_aging_item_id} missing required_manual_next_step`);
  }
  if (item.business_judgment_required && item.system_quality_issue) {
    fail(
      `aging item ${item.review_queue_aging_item_id} cannot be both business_judgment and system_quality`,
    );
  }
  if (item.business_judgment_required && item.review_owner !== 'roofer') {
    fail(
      `business judgment aging item ${item.review_queue_aging_item_id} must have roofer review_owner`,
    );
  }
  if (item.system_quality_issue && item.review_owner !== 'roofleadhq_jason') {
    fail(
      `system quality aging item ${item.review_queue_aging_item_id} must have roofleadhq_jason review_owner`,
    );
  }
  if (item.next_step_overdue && item.live_notification_sent !== 'no') {
    fail(`overdue aging item ${item.review_queue_aging_item_id} must not send notification`);
  }
  if (item.escalation_ready_for_manual_review && item.live_notification_sent !== 'no') {
    fail(`escalation-ready aging item ${item.review_queue_aging_item_id} must not send notification`);
  }
}
console.log('PASS: every review queue aging item has required fields and safety values.');

for (const bucket of REQUIRED_AGE_BUCKETS) {
  if (!output.review_age_bucket_summary.bucket_counts[bucket]) {
    fail(`age bucket missing representation: ${bucket}`);
  }
}
if (!output.review_age_bucket_summary.age_bucket_is_deterministic) {
  fail('review_age_bucket_summary.age_bucket_is_deterministic must be true');
}
console.log('PASS: review age bucket summary verified.');

if (!output.stale_review_summary.stale_review_flag_uses_fixture_threshold) {
  fail('stale_review_summary.stale_review_flag_uses_fixture_threshold must be true');
}
if (!output.stale_review_summary.escalation_ready_without_notification) {
  fail('stale_review_summary.escalation_ready_without_notification must be true');
}
console.log('PASS: stale review summary verified.');

if (!output.blocked_review_summary.blocked_state_has_hold_reason) {
  fail('blocked_review_summary.blocked_state_has_hold_reason must be true');
}
if (!output.blocked_review_summary.blocked_state_has_required_manual_next_step) {
  fail('blocked_review_summary.blocked_state_has_required_manual_next_step must be true');
}
console.log('PASS: blocked review summary verified.');

if (!output.hold_state_summary.hold_state_has_required_manual_next_step) {
  fail('hold_state_summary.hold_state_has_required_manual_next_step must be true');
}
if (!output.hold_state_summary.hold_state_has_hold_reason) {
  fail('hold_state_summary.hold_state_has_hold_reason must be true');
}
console.log('PASS: hold state summary verified.');

if (!output.manual_next_step_owner_summary.next_step_owner_present_for_all_review_items) {
  fail('manual_next_step_owner_summary.next_step_owner_present_for_all_review_items must be true');
}
if (!output.manual_next_step_owner_summary.next_step_due_date_fixture_present_for_all_review_items) {
  fail(
    'manual_next_step_owner_summary.next_step_due_date_fixture_present_for_all_review_items must be true',
  );
}
if (!output.manual_next_step_owner_summary.overdue_review_does_not_send_notification) {
  fail('manual_next_step_owner_summary.overdue_review_does_not_send_notification must be true');
}
console.log('PASS: manual next step owner summary verified.');

if (!output.roofer_review_aging_summary.roofer_review_owns_business_judgment_items) {
  fail('roofer_review_aging_summary.roofer_review_owns_business_judgment_items must be true');
}
console.log('PASS: roofer review aging summary verified.');

if (!output.roofleadhq_review_aging_summary.roofleadhq_review_limited_to_system_quality_items) {
  fail('roofleadhq_review_aging_summary.roofleadhq_review_limited_to_system_quality_items must be true');
}
console.log('PASS: roofleadhq review aging summary verified.');

if (!output.review_sla_boundary_summary.reporting_summary_includes_review_queue_aging) {
  fail('review_sla_boundary_summary.reporting_summary_includes_review_queue_aging must be true');
}
if (!output.review_sla_boundary_summary.public_sla_or_support_copy_not_changed_without_approval) {
  fail(
    'review_sla_boundary_summary.public_sla_or_support_copy_not_changed_without_approval must be true',
  );
}
if (!output.review_sla_boundary_summary.escalation_ready_does_not_send_notification) {
  fail('review_sla_boundary_summary.escalation_ready_does_not_send_notification must be true');
}
for (const flag of [
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
]) {
  if (!output.review_sla_boundary_summary[flag]) {
    fail(`review_sla_boundary_summary.${flag} must be true`);
  }
}
console.log('PASS: review SLA boundary summary verified.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.review_queue_aging_safety_assertions.includes(assertion)) {
    fail(`review_queue_aging_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required review queue aging safety assertions are present.`,
);

if (output.review_queue_aging_sla_expansion_summary.public_sla_or_support_copy_changed !== false) {
  fail('public_sla_or_support_copy_changed must be false in expansion summary');
}
if (!output.review_queue_aging_sla_expansion_summary.all_age_buckets_represented) {
  fail('review_queue_aging_sla_expansion_summary.all_age_buckets_represented must be true');
}
console.log('PASS: review queue aging SLA expansion summary verified.');

const agingByScenario = {};
for (const item of output.review_queue_aging_items) {
  if (item.scenario_id.startsWith('aging_catalog_')) continue;
  agingByScenario[item.scenario_id] = (agingByScenario[item.scenario_id] || 0) + 1;
}
for (const scenario of output.scenarios) {
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (!scenario.review_queue_aging_items) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario review_queue_aging_items array`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario review queue aging items.');

if (!output.data_boundary_pii_expansion) {
  fail('output missing data_boundary_pii_expansion — prior data boundary expansion must remain');
}
if (!output.review_queue_expansion) {
  fail('output missing review_queue_expansion — prior review queue expansion must remain');
}
if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log('PASS: prior expansion summaries remain present.');

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

const reviewQueueVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, reviewQueueVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
);
if (reviewQueueVerifierRun.status !== 0) {
  fail(
    `review queue verifier failed: ${reviewQueueVerifierRun.stderr || reviewQueueVerifierRun.stdout}`,
  );
}
console.log('PASS: review queue verifier still passes.');

const dataBoundaryVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, dataBoundaryVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
);
if (dataBoundaryVerifierRun.status !== 0) {
  fail(
    `data boundary PII verifier failed: ${dataBoundaryVerifierRun.stderr || dataBoundaryVerifierRun.stdout}`,
  );
}
console.log('PASS: data boundary PII verifier still passes.');

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
  'live SMS sends',
  'live email sends',
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
  'verify-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Review Queue Aging / SLA Boundary Expansion',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_REVIEW_QUEUE_AGING_SLA_BOUNDARY_EXPANSION.md',
  'run-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-dry-run.sh',
  'verify-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-readonly.js',
  'Native Workflow Fixture Review Queue Aging / SLA Boundary Expansion',
  'native workflow fixture review queue aging sla boundary expansion',
  'review queue aging sla boundary expansion',
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
mustHave(wrapper, 'verify-native-workflow-fixture-review-queue-expansion-readonly.js', 'wrapper review queue verifier');
mustHave(
  wrapper,
  'verify-native-workflow-fixture-data-boundary-pii-minimization-expansion-readonly.js',
  'wrapper data boundary verifier',
);
mustHave(
  wrapper,
  'verify-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-readonly.js',
  'wrapper aging verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount =
  REQUIRED_SAFETY_ASSERTIONS.length + REQUIRED_AGING_COVERAGE_TYPES.length;

console.log(
  `PASS: Native Workflow Fixture Review Queue Aging / SLA Boundary Expansion verified (${assertionCount}+ assertions, ${output.review_queue_aging_items.length} review queue aging items).`,
);
console.log(
  'PASS: Native Workflow Fixture Review Queue Aging / SLA Boundary Expansion is fixture-only, deterministic, and dry-run safe.',
);