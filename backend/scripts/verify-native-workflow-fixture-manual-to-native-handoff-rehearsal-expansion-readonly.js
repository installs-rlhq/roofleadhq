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

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_TO_NATIVE_HANDOFF_REHEARSAL_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const reviewQueueAgingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_HANDOFF_ITEM_FIELDS = [
  'manual_handoff_item_id',
  'scenario_id',
  'lead_id',
  'roofer_account_id',
  'plan_profile',
  'manual_record_source',
  'manual_record_type',
  'manual_record_status',
  'native_entity_target',
  'native_state_target',
  'source_manual_status',
  'mapped_native_state',
  'mapping_confidence',
  'handoff_ready',
  'handoff_blocked',
  'handoff_block_reason',
  'required_manual_next_step',
  'next_step_owner',
  'roofer_review_required',
  'roofleadhq_review_required',
  'review_reason',
  'business_judgment_required',
  'system_quality_issue',
  'data_boundary_checked',
  'pii_minimization_checked',
  'audit_event_id',
  'production_persistence_allowed',
  'schema_change_allowed',
  'live_action_allowed',
  'notification_sent',
  'production_data_touched',
  'external_services_called',
];

const REQUIRED_MANUAL_RECORD_SOURCES = [
  'founder_manual_tracker',
  'guided_setup_intake_worksheet',
  'lead_source_setup_worksheet',
  'response_follow_up_preferences_worksheet',
  'booking_calendar_preferences_worksheet',
  'review_queue_tracker',
  'missed_lead_recovery_tracker',
  'manual_outreach_tracker',
  'appointment_readiness_tracker',
  'booked_inspection_tracker',
  'post_inspection_follow_up_tracker',
  'feedback_capture_tracker',
  'reporting_snapshot_tracker',
  'csv_export_snapshot_tracker',
];

const REQUIRED_NATIVE_ENTITY_TARGETS = [
  'roofer_account',
  'plan_profile',
  'lead_record',
  'lead_source',
  'homeowner_contact',
  'message_thread',
  'follow_up_state',
  'manual_outreach_record',
  'missed_lead_recovery_state',
  'appointment_readiness_record',
  'booked_inspection_record',
  'post_inspection_record',
  'feedback_record',
  'review_queue_item',
  'report_snapshot',
  'csv_export_snapshot',
  'usage_volume_record',
  'safety_gate_record',
  'audit_event',
];

const REQUIRED_HANDOFF_COVERAGE_AREAS = [
  'setup_preference_handoff',
  'lead_intake_handoff',
  'contact_permission_handoff',
  'follow_up_state_handoff',
  'missed_lead_recovery_handoff',
  'manual_outreach_handoff',
  'appointment_readiness_handoff',
  'review_queue_handoff',
  'post_inspection_handoff',
  'feedback_permission_handoff',
  'reporting_snapshot_handoff',
  'csv_export_snapshot_handoff',
  'usage_volume_handoff',
  'lead_source_roi_handoff',
  'audit_event_timeline_handoff',
  'data_boundary_pii_minimization_handoff',
  'review_aging_sla_handoff',
];

const REQUIRED_SAFETY_ASSERTIONS = [
  'manual_to_native_handoff_expansion_summary_present',
  'manual_handoff_items_present',
  'manual_handoff_item_required_fields_present',
  'required_manual_record_sources_present',
  'required_native_entity_targets_present',
  'manual_record_mapping_summary_present',
  'native_state_mapping_summary_present',
  'handoff_gap_summary_present',
  'handoff_review_summary_present',
  'handoff_blocker_summary_present',
  'handoff_owner_summary_present',
  'handoff_audit_summary_present',
  'setup_preferences_required_before_handoff_ready',
  'contact_permission_uncertainty_blocks_messaging_handoff',
  'do_not_contact_blocks_outreach_handoff',
  'appointment_handoff_requires_calendar_owner_and_booking_preferences',
  'appointment_handoff_does_not_create_calendar_event',
  'post_inspection_handoff_does_not_generate_estimate_quote_invoice_payment',
  'feedback_handoff_preserves_permission_values_yes_no_not_asked',
  'feedback_handoff_does_not_publish_feedback_or_testimonial',
  'csv_handoff_is_one_directional',
  'csv_handoff_is_not_crm_sync',
  'usage_volume_handoff_does_not_trigger_live_billing',
  'source_roi_handoff_does_not_promise_exact_roi',
  'source_roi_handoff_does_not_call_ad_platforms',
  'roofer_review_owns_business_judgment_handoff_items',
  'roofleadhq_review_limited_to_system_quality_handoff_items',
  'handoff_ready_requires_data_boundary_check',
  'handoff_ready_requires_pii_minimization_check',
  'handoff_ready_requires_audit_event',
  'production_persistence_allowed_is_no_for_all_items',
  'schema_change_allowed_is_no_for_all_items',
  'live_action_allowed_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'no_supabase_calls',
  'no_schema_migrations_auth_rls_security_changes',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'manual_to_native_handoff_is_fake_data_only',
  'manual_to_native_handoff_is_audited',
  'reporting_summary_includes_manual_to_native_handoff',
  'public_implementation_or_go_live_copy_not_changed_without_approval',
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
console.log('PASS: review queue aging SLA verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['manual-to-native handoff verifier', verifierPath],
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
  maxBuffer: 64 * 1024 * 1024,
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

if (!output.manual_to_native_handoff_rehearsal_expansion) {
  fail('output missing manual_to_native_handoff_rehearsal_expansion marker');
}
if (
  output.manual_to_native_handoff_rehearsal_expansion !==
  'native_workflow_fixture_manual_to_native_handoff_rehearsal_expansion'
) {
  fail('manual_to_native_handoff_rehearsal_expansion marker is incorrect');
}
console.log('PASS: output includes manual_to_native_handoff_rehearsal_expansion marker.');

for (const section of [
  'manual_to_native_handoff_expansion_summary',
  'manual_handoff_items',
  'manual_record_mapping_summary',
  'native_state_mapping_summary',
  'handoff_gap_summary',
  'handoff_review_summary',
  'handoff_blocker_summary',
  'handoff_owner_summary',
  'handoff_audit_summary',
  'handoff_reporting_summary',
  'manual_to_native_handoff_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level manual-to-native handoff sections are present.');

if (!Array.isArray(output.manual_handoff_items) || !output.manual_handoff_items.length) {
  fail('manual_handoff_items must be a non-empty array');
}
console.log(`PASS: manual_handoff_items (${output.manual_handoff_items.length}) are present.`);

const manualSourcesPresent = new Set(
  output.manual_handoff_items.map((item) => item.manual_record_source),
);
for (const source of REQUIRED_MANUAL_RECORD_SOURCES) {
  if (!manualSourcesPresent.has(source)) {
    fail(`required manual record source missing: ${source}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_MANUAL_RECORD_SOURCES.length} required manual record sources are present.`,
);

const nativeTargetsPresent = new Set(
  output.manual_handoff_items.map((item) => item.native_entity_target),
);
for (const target of REQUIRED_NATIVE_ENTITY_TARGETS) {
  if (!nativeTargetsPresent.has(target)) {
    fail(`required native entity target missing: ${target}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_NATIVE_ENTITY_TARGETS.length} required native entity targets are present.`,
);

const coverageAreasPresent = new Set(
  output.manual_handoff_items.map((item) => item.coverage_area).filter(Boolean),
);
for (const area of REQUIRED_HANDOFF_COVERAGE_AREAS) {
  if (!coverageAreasPresent.has(area)) {
    fail(`required handoff coverage area missing: ${area}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_HANDOFF_COVERAGE_AREAS.length} required handoff coverage areas are present.`,
);

for (const item of output.manual_handoff_items) {
  for (const field of REQUIRED_HANDOFF_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `manual handoff item ${item.manual_handoff_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  for (const safetyField of [
    'production_persistence_allowed',
    'schema_change_allowed',
    'live_action_allowed',
    'notification_sent',
    'production_data_touched',
    'external_services_called',
  ]) {
    if (item[safetyField] !== 'no') {
      fail(`handoff item ${item.manual_handoff_item_id} ${safetyField} is not no`);
    }
  }
  if (!item.audit_event_id) {
    fail(`handoff item ${item.manual_handoff_item_id} missing audit_event_id`);
  }
  if (!item.next_step_owner) {
    fail(`handoff item ${item.manual_handoff_item_id} missing next_step_owner`);
  }
  if (item.business_judgment_required && item.system_quality_issue) {
    fail(
      `handoff item ${item.manual_handoff_item_id} cannot be both business_judgment and system_quality`,
    );
  }
  if (item.business_judgment_required && item.roofer_review_required !== true) {
    fail(
      `business judgment handoff item ${item.manual_handoff_item_id} must require roofer review`,
    );
  }
  if (item.system_quality_issue && item.roofleadhq_review_required !== true) {
    fail(
      `system quality handoff item ${item.manual_handoff_item_id} must require roofleadhq review`,
    );
  }
  if (item.handoff_ready) {
    if (!item.data_boundary_checked) {
      fail(`handoff-ready item ${item.manual_handoff_item_id} missing data_boundary_checked`);
    }
    if (!item.pii_minimization_checked) {
      fail(`handoff-ready item ${item.manual_handoff_item_id} missing pii_minimization_checked`);
    }
    if (!item.audit_event_id) {
      fail(`handoff-ready item ${item.manual_handoff_item_id} missing audit_event_id`);
    }
  }
  if (item.handoff_block_reason === 'missing_required_setup_preferences' && item.handoff_ready) {
    fail(`setup-blocked item ${item.manual_handoff_item_id} must not be handoff_ready`);
  }
  if (
    item.handoff_block_reason === 'contact_permission_uncertainty_blocks_messaging_handoff' &&
    item.handoff_ready
  ) {
    fail(`messaging-blocked item ${item.manual_handoff_item_id} must not be handoff_ready`);
  }
  if (
    item.handoff_block_reason === 'do_not_contact_blocks_outreach_handoff' &&
    item.handoff_ready
  ) {
    fail(`outreach-blocked item ${item.manual_handoff_item_id} must not be handoff_ready`);
  }
  if (item.appointment_related && item.calendar_event_created === true) {
    fail(`appointment handoff item ${item.manual_handoff_item_id} must not create calendar event`);
  }
  if (item.post_inspection_related && item.generates_estimate_quote_invoice_payment === true) {
    fail(
      `post-inspection handoff item ${item.manual_handoff_item_id} must not generate estimate/quote/invoice/payment`,
    );
  }
  if (
    item.feedback_related &&
    item.permission_to_use_publicly &&
    !['yes', 'no', 'not_asked'].includes(item.permission_to_use_publicly)
  ) {
    fail(
      `feedback handoff item ${item.manual_handoff_item_id} has invalid permission_to_use_publicly`,
    );
  }
  if (item.feedback_related && item.publishes_feedback_or_testimonial === true) {
    fail(
      `feedback handoff item ${item.manual_handoff_item_id} must not publish feedback or testimonial`,
    );
  }
  if (item.csv_related && item.csv_one_directional !== true) {
    fail(`csv handoff item ${item.manual_handoff_item_id} must be one-directional`);
  }
  if (item.csv_related && item.csv_is_crm_sync === true) {
    fail(`csv handoff item ${item.manual_handoff_item_id} must not be CRM sync`);
  }
  if (item.usage_volume_related && item.triggers_live_billing === true) {
    fail(`usage volume handoff item ${item.manual_handoff_item_id} must not trigger live billing`);
  }
  if (item.source_roi_related && item.promises_exact_roi === true) {
    fail(`source ROI handoff item ${item.manual_handoff_item_id} must not promise exact ROI`);
  }
  if (item.source_roi_related && item.calls_ad_platforms === true) {
    fail(`source ROI handoff item ${item.manual_handoff_item_id} must not call ad platforms`);
  }
}
console.log('PASS: every manual handoff item has required fields and safety values.');

if (!output.manual_record_mapping_summary.all_manual_record_sources_represented) {
  fail('manual_record_mapping_summary.all_manual_record_sources_represented must be true');
}
if (!output.native_state_mapping_summary.all_native_entity_targets_represented) {
  fail('native_state_mapping_summary.all_native_entity_targets_represented must be true');
}
if (!output.handoff_gap_summary.all_coverage_areas_represented) {
  fail('handoff_gap_summary.all_coverage_areas_represented must be true');
}
console.log('PASS: manual record mapping and native state mapping summaries verified.');

if (!output.handoff_review_summary.roofer_review_owns_business_judgment_handoff_items) {
  fail('handoff_review_summary.roofer_review_owns_business_judgment_handoff_items must be true');
}
if (!output.handoff_review_summary.roofleadhq_review_limited_to_system_quality_handoff_items) {
  fail(
    'handoff_review_summary.roofleadhq_review_limited_to_system_quality_handoff_items must be true',
  );
}
console.log('PASS: handoff review summary verified.');

if (!output.handoff_blocker_summary.contact_permission_uncertainty_blocks_messaging_handoff) {
  fail(
    'handoff_blocker_summary.contact_permission_uncertainty_blocks_messaging_handoff must be true',
  );
}
if (!output.handoff_blocker_summary.do_not_contact_blocks_outreach_handoff) {
  fail('handoff_blocker_summary.do_not_contact_blocks_outreach_handoff must be true');
}
if (!output.handoff_blocker_summary.setup_preferences_required_before_handoff_ready) {
  fail('handoff_blocker_summary.setup_preferences_required_before_handoff_ready must be true');
}
console.log('PASS: handoff blocker summary verified.');

if (!output.handoff_owner_summary.handoff_ready_requires_data_boundary_check) {
  fail('handoff_owner_summary.handoff_ready_requires_data_boundary_check must be true');
}
if (!output.handoff_owner_summary.handoff_ready_requires_pii_minimization_check) {
  fail('handoff_owner_summary.handoff_ready_requires_pii_minimization_check must be true');
}
if (!output.handoff_owner_summary.handoff_ready_requires_audit_event) {
  fail('handoff_owner_summary.handoff_ready_requires_audit_event must be true');
}
if (!output.handoff_owner_summary.roofer_review_owns_business_judgment_handoff_items) {
  fail('handoff_owner_summary.roofer_review_owns_business_judgment_handoff_items must be true');
}
if (!output.handoff_owner_summary.roofleadhq_review_limited_to_system_quality_handoff_items) {
  fail(
    'handoff_owner_summary.roofleadhq_review_limited_to_system_quality_handoff_items must be true',
  );
}
console.log('PASS: handoff owner summary verified.');

if (!output.handoff_audit_summary.manual_to_native_handoff_is_audited) {
  fail('handoff_audit_summary.manual_to_native_handoff_is_audited must be true');
}
console.log('PASS: handoff audit summary verified.');

if (!output.handoff_reporting_summary.reporting_summary_includes_manual_to_native_handoff) {
  fail('handoff_reporting_summary.reporting_summary_includes_manual_to_native_handoff must be true');
}
if (!output.handoff_reporting_summary.appointment_handoff_does_not_create_calendar_event) {
  fail('handoff_reporting_summary.appointment_handoff_does_not_create_calendar_event must be true');
}
if (
  !output.handoff_reporting_summary
    .post_inspection_handoff_does_not_generate_estimate_quote_invoice_payment
) {
  fail(
    'handoff_reporting_summary.post_inspection_handoff_does_not_generate_estimate_quote_invoice_payment must be true',
  );
}
if (
  !output.handoff_reporting_summary.feedback_handoff_preserves_permission_values_yes_no_not_asked
) {
  fail(
    'handoff_reporting_summary.feedback_handoff_preserves_permission_values_yes_no_not_asked must be true',
  );
}
if (!output.handoff_reporting_summary.feedback_handoff_does_not_publish_feedback_or_testimonial) {
  fail(
    'handoff_reporting_summary.feedback_handoff_does_not_publish_feedback_or_testimonial must be true',
  );
}
if (!output.handoff_reporting_summary.csv_handoff_is_one_directional) {
  fail('handoff_reporting_summary.csv_handoff_is_one_directional must be true');
}
if (!output.handoff_reporting_summary.csv_handoff_is_not_crm_sync) {
  fail('handoff_reporting_summary.csv_handoff_is_not_crm_sync must be true');
}
if (!output.handoff_reporting_summary.usage_volume_handoff_does_not_trigger_live_billing) {
  fail('handoff_reporting_summary.usage_volume_handoff_does_not_trigger_live_billing must be true');
}
if (!output.handoff_reporting_summary.source_roi_handoff_does_not_promise_exact_roi) {
  fail('handoff_reporting_summary.source_roi_handoff_does_not_promise_exact_roi must be true');
}
if (!output.handoff_reporting_summary.source_roi_handoff_does_not_call_ad_platforms) {
  fail('handoff_reporting_summary.source_roi_handoff_does_not_call_ad_platforms must be true');
}
if (
  !output.handoff_reporting_summary.public_implementation_or_go_live_copy_not_changed_without_approval
) {
  fail(
    'handoff_reporting_summary.public_implementation_or_go_live_copy_not_changed_without_approval must be true',
  );
}
for (const flag of [
  'no_supabase_calls',
  'no_schema_migrations_auth_rls_security_changes',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
]) {
  if (!output.handoff_reporting_summary[flag]) {
    fail(`handoff_reporting_summary.${flag} must be true`);
  }
}
console.log('PASS: handoff reporting summary verified.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.manual_to_native_handoff_safety_assertions.includes(assertion)) {
    fail(`manual_to_native_handoff_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required manual-to-native handoff safety assertions are present.`,
);

if (
  output.manual_to_native_handoff_expansion_summary.public_implementation_or_go_live_copy_changed !==
  false
) {
  fail('public_implementation_or_go_live_copy_changed must be false in expansion summary');
}
if (!output.manual_to_native_handoff_expansion_summary.all_manual_record_sources_represented) {
  fail('manual_to_native_handoff_expansion_summary.all_manual_record_sources_represented must be true');
}
if (!output.manual_to_native_handoff_expansion_summary.all_native_entity_targets_represented) {
  fail('manual_to_native_handoff_expansion_summary.all_native_entity_targets_represented must be true');
}
if (!output.manual_to_native_handoff_expansion_summary.all_coverage_areas_represented) {
  fail('manual_to_native_handoff_expansion_summary.all_coverage_areas_represented must be true');
}
console.log('PASS: manual-to-native handoff expansion summary verified.');

for (const scenario of output.scenarios) {
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (!scenario.manual_handoff_items) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario manual_handoff_items array`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario manual handoff items.');

if (!output.review_queue_aging_sla_expansion) {
  fail('output missing review_queue_aging_sla_expansion — prior review aging expansion must remain');
}
if (!output.data_boundary_pii_expansion) {
  fail('output missing data_boundary_pii_expansion — prior data boundary expansion must remain');
}
if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log('PASS: prior expansion summaries remain present.');

const existingVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, existingVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);
if (existingVerifierRun.status !== 0) {
  fail(
    `existing fixture dry-run verifier failed: ${existingVerifierRun.stderr || existingVerifierRun.stdout}`,
  );
}
console.log('PASS: existing fixture dry-run verifier still passes.');

const reviewQueueAgingVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, reviewQueueAgingVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);
if (reviewQueueAgingVerifierRun.status !== 0) {
  fail(
    `review queue aging verifier failed: ${reviewQueueAgingVerifierRun.stderr || reviewQueueAgingVerifierRun.stdout}`,
  );
}
console.log('PASS: review queue aging SLA verifier still passes.');

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
  'verify-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Manual-to-Native Handoff Rehearsal Expansion',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_MANUAL_TO_NATIVE_HANDOFF_REHEARSAL_EXPANSION.md',
  'run-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-dry-run.sh',
  'verify-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-readonly.js',
  'Native Workflow Fixture Manual-to-Native Handoff Rehearsal Expansion',
  'native workflow fixture manual to native handoff rehearsal expansion',
  'manual to native handoff rehearsal expansion',
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
mustHave(
  wrapper,
  'verify-native-workflow-fixture-review-queue-aging-sla-boundary-expansion-readonly.js',
  'wrapper review queue aging verifier',
);
mustHave(
  wrapper,
  'verify-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-readonly.js',
  'wrapper handoff verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount =
  REQUIRED_SAFETY_ASSERTIONS.length +
  REQUIRED_MANUAL_RECORD_SOURCES.length +
  REQUIRED_NATIVE_ENTITY_TARGETS.length;

console.log(
  `PASS: Native Workflow Fixture Manual-to-Native Handoff Rehearsal Expansion verified (${assertionCount}+ assertions, ${output.manual_handoff_items.length} manual handoff items).`,
);
console.log(
  'PASS: Native Workflow Fixture Manual-to-Native Handoff Rehearsal Expansion is fixture-only, deterministic, and dry-run safe.',
);