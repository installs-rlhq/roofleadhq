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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_MISSED_LEAD_RECOVERY_EXPANSION.md';
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
const wrapperPath =
  'scripts/run-native-workflow-fixture-missed-lead-recovery-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-missed-lead-recovery-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_MISSED_LEAD_RECOVERY_ITEM_FIELDS = [
  'missed_lead_recovery_item_id',
  'scenario_id',
  'lead_id',
  'plan_profile',
  'current_state',
  'target_state',
  'missed_lead_recovery_used',
  'missed_lead_recovery_status',
  'missed_lead_recovery_reason',
  'recovery_eligible',
  'recovery_blocked',
  'recovery_block_reason',
  'original_lead_source',
  'first_response_sent',
  'first_response_time_minutes',
  'homeowner_replied',
  'prior_follow_up_count',
  'max_follow_up_attempts',
  'max_follow_up_attempts_reached',
  'last_contact_channel',
  'last_follow_up_date',
  'contact_permission_status',
  'do_not_contact_status',
  'homeowner_contact_ready',
  'homeowner_phone_present',
  'homeowner_email_present',
  'service_area_status',
  'lead_source_status',
  'roofing_issue_summary_present',
  'urgency_present',
  'manual_outreach_needed',
  'manual_outreach_owner',
  'roofer_review_required',
  'roofleadhq_review_required',
  'business_judgment_required',
  'system_quality_issue',
  'required_manual_next_step',
  'next_step_owner',
  'next_step_due_date',
  'audit_event_id',
  'live_sms_allowed',
  'live_email_allowed',
  'live_call_allowed',
  'notification_sent',
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
  'missed_lead_recovery_expansion_summary_present',
  'missed_lead_recovery_items_present',
  'missed_lead_recovery_item_required_fields_present',
  'missed_lead_recovery_status_summary_present',
  'missed_lead_recovery_eligibility_summary_present',
  'missed_lead_recovery_blocker_summary_present',
  'missed_lead_recovery_attempt_summary_present',
  'missed_lead_recovery_can_mark_eligible_when_contact_and_permission_safe',
  'missed_lead_recovery_requires_homeowner_contact_ready',
  'missed_lead_recovery_requires_contact_permission_or_review',
  'do_not_contact_blocks_missed_lead_recovery',
  'missing_contact_data_blocks_recovery_or_routes_to_review',
  'unclear_contact_permission_blocks_recovery_or_routes_to_review',
  'max_follow_up_attempts_blocks_additional_recovery',
  'bad_fit_or_excluded_blocks_recovery',
  'excluded_service_area_blocks_recovery',
  'lead_source_required_or_unknown_marker_present',
  'first_response_time_tracked',
  'prior_follow_up_count_tracked',
  'max_follow_up_attempts_tracked',
  'homeowner_replied_status_tracked',
  'missed_lead_recovery_manual_outreach_handoff_present_when_needed',
  'manual_outreach_owner_required_when_manual_outreach_needed',
  'required_manual_next_step_present_for_blocked_or_review_items',
  'next_step_owner_required_for_recovery_items',
  'next_step_due_date_required_for_open_recovery_items',
  'roofer_review_required_before_business_judgment_recovery',
  'pricing_question_routes_to_roofer_review_before_recovery',
  'estimate_question_routes_to_roofer_review_before_recovery',
  'quote_request_routes_to_roofer_review_before_recovery',
  'insurance_complexity_routes_to_roofer_review_before_recovery',
  'payment_or_invoice_routes_to_roofer_review_before_recovery',
  'contract_question_routes_to_roofer_review_before_recovery',
  'upset_homeowner_routes_to_roofer_review_before_recovery',
  'roofleadhq_review_required_before_system_quality_recovery',
  'broken_routing_routes_to_roofleadhq_review_before_recovery',
  'missed_data_capture_routes_to_roofleadhq_review_before_recovery',
  'source_attribution_issue_routes_to_roofleadhq_review_before_recovery',
  'recovery_state_mismatch_routes_to_roofleadhq_review',
  'activation_flags_default_false',
  'live_sms_blocked_when_flag_false',
  'live_email_blocked_when_flag_false',
  'live_call_blocked_when_flag_false',
  'notification_sent_is_no_for_all_recovery_items',
  'live_sms_allowed_is_no_for_all_recovery_items',
  'live_email_allowed_is_no_for_all_recovery_items',
  'live_call_allowed_is_no_for_all_recovery_items',
  'no_twilio_call_performed',
  'no_vapi_call_performed',
  'no_resend_call_performed',
  'no_lindy_live_workflow_performed',
  'no_google_calendar_event_created',
  'no_external_services_called',
  'missed_lead_recovery_uses_fake_data_only',
  'missed_lead_recovery_does_not_touch_production_data',
  'missed_lead_recovery_does_not_send_notifications',
  'missed_lead_recovery_decisions_are_audited',
  'production_data_touched_is_no_for_all_recovery_items',
  'external_services_called_is_no_for_all_recovery_items',
  'unsupported_request_routes_to_review_or_later_only',
  'unsupported_request_does_not_trigger_live_recovery',
  'reporting_summary_includes_missed_lead_recovery',
  'csv_snapshot_preserves_missed_lead_recovery_field',
];

const ROUTING_ASSERTIONS = [
  {
    assertion_id: 'missed_lead_recovery_can_mark_eligible_when_contact_and_permission_safe',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) =>
      item.recovery_eligible === true &&
      item.homeowner_contact_ready === true &&
      item.contact_permission_status === 'known' &&
      !item.do_not_contact_status,
  },
  {
    assertion_id: 'missed_lead_recovery_requires_homeowner_contact_ready',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) => item.recovery_eligible !== true || item.homeowner_contact_ready === true,
  },
  {
    assertion_id: 'missed_lead_recovery_requires_contact_permission_or_review',
    scenario_id: 'feedback_permission_not_asked_path',
    check: (item) =>
      item.contact_permission_status === 'unknown' && item.recovery_blocked === true,
  },
  {
    assertion_id: 'do_not_contact_blocks_missed_lead_recovery',
    scenario_id: 'stopped_do_not_contact_path',
    check: (item) =>
      item.do_not_contact_status === true && item.recovery_blocked === true && !item.recovery_eligible,
  },
  {
    assertion_id: 'missing_contact_data_blocks_recovery_or_routes_to_review',
    scenario_id: 'missing_information_path',
    check: (item) =>
      !item.homeowner_contact_ready &&
      item.recovery_blocked === true &&
      item.missed_lead_recovery_status.includes('review'),
  },
  {
    assertion_id: 'unclear_contact_permission_blocks_recovery_or_routes_to_review',
    scenario_id: 'feedback_permission_not_asked_path',
    check: (item) =>
      item.recovery_blocked === true && item.missed_lead_recovery_status.includes('review'),
  },
  {
    assertion_id: 'max_follow_up_attempts_blocks_additional_recovery',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) =>
      item.max_follow_up_attempts_reached === true &&
      item.recovery_blocked === true &&
      item.missed_lead_recovery_status === 'stopped_max_attempts',
  },
  {
    assertion_id: 'bad_fit_or_excluded_blocks_recovery',
    scenario_id: 'bad_fit_excluded_path',
    check: (item) =>
      item.recovery_blocked === true && item.recovery_block_reason === 'bad_fit_or_excluded',
  },
  {
    assertion_id: 'excluded_service_area_blocks_recovery',
    scenario_id: 'bad_fit_excluded_path',
    check: (item) => item.service_area_status === 'excluded' && item.recovery_blocked === true,
  },
  {
    assertion_id: 'lead_source_required_or_unknown_marker_present',
    scenario_id: 'starter_plan_profile_path',
    check: (item) => item.lead_source_status === 'unknown' && item.original_lead_source === 'unknown',
  },
  {
    assertion_id: 'first_response_time_tracked',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) => item.first_response_sent === false && item.first_response_time_minutes === null,
  },
  {
    assertion_id: 'prior_follow_up_count_tracked',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) => item.prior_follow_up_count >= 1,
  },
  {
    assertion_id: 'max_follow_up_attempts_tracked',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) => item.max_follow_up_attempts === 4,
  },
  {
    assertion_id: 'homeowner_replied_status_tracked',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) => item.homeowner_replied === false,
  },
  {
    assertion_id: 'missed_lead_recovery_manual_outreach_handoff_present_when_needed',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) =>
      item.manual_outreach_needed === true &&
      item.required_manual_next_step &&
      item.next_step_owner,
  },
  {
    assertion_id: 'manual_outreach_owner_required_when_manual_outreach_needed',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) => !item.manual_outreach_needed || item.manual_outreach_owner === 'roofer',
  },
  {
    assertion_id: 'required_manual_next_step_present_for_blocked_or_review_items',
    scenario_id: 'roofleadhq_system_review_needed_path',
    check: (item) => item.recovery_blocked === true && item.required_manual_next_step,
  },
  {
    assertion_id: 'next_step_owner_required_for_recovery_items',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) => item.missed_lead_recovery_used === true && item.next_step_owner,
  },
  {
    assertion_id: 'next_step_due_date_required_for_open_recovery_items',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) =>
      item.missed_lead_recovery_used === true &&
      item.missed_lead_recovery_status === 'active' &&
      item.next_step_due_date,
  },
  {
    assertion_id: 'pricing_question_routes_to_roofer_review_before_recovery',
    scenario_id: 'roofer_review_needed_path',
    check: (item) =>
      item.pricing_question === true && item.roofer_review_required === true && item.recovery_blocked,
  },
  {
    assertion_id: 'estimate_question_routes_to_roofer_review_before_recovery',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.estimate_question === true && item.roofer_review_required === true && item.recovery_blocked,
  },
  {
    assertion_id: 'quote_request_routes_to_roofer_review_before_recovery',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.quote_request === true && item.roofer_review_required === true && item.recovery_blocked,
  },
  {
    assertion_id: 'insurance_complexity_routes_to_roofer_review_before_recovery',
    scenario_id: 'roofer_review_needed_path',
    check: (item) => item.insurance_complexity === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'payment_or_invoice_routes_to_roofer_review_before_recovery',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.payment_or_invoice_question === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'contract_question_routes_to_roofer_review_before_recovery',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) => item.contract_question === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'upset_homeowner_routes_to_roofer_review_before_recovery',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) => item.upset_homeowner === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'broken_routing_routes_to_roofleadhq_review_before_recovery',
    scenario_id: 'roofleadhq_system_review_needed_path',
    check: (item) =>
      item.broken_routing === true && item.roofleadhq_review_required === true && item.recovery_blocked,
  },
  {
    assertion_id: 'missed_data_capture_routes_to_roofleadhq_review_before_recovery',
    scenario_id: 'roofleadhq_system_review_needed_path',
    check: (item) =>
      item.missed_data_capture === true && item.roofleadhq_review_required === true,
  },
  {
    assertion_id: 'source_attribution_issue_routes_to_roofleadhq_review_before_recovery',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    check: (item) =>
      item.source_attribution_issue === true && item.roofleadhq_review_required === true,
  },
  {
    assertion_id: 'recovery_state_mismatch_routes_to_roofleadhq_review',
    scenario_id: 'roofleadhq_system_review_needed_path',
    check: (item) =>
      item.recovery_state_mismatch === true && item.roofleadhq_review_required === true,
  },
  {
    assertion_id: 'unsupported_request_routes_to_review_or_later_only',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) =>
      item.unsupported_request === true &&
      (item.recovery_blocked === true || item.missed_lead_recovery_status.includes('review')),
  },
  {
    assertion_id: 'unsupported_request_does_not_trigger_live_recovery',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) =>
      item.unsupported_request === true &&
      item.live_sms_allowed === 'no' &&
      item.live_email_allowed === 'no' &&
      item.live_call_allowed === 'no',
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
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['missed lead recovery verifier', verifierPath],
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

if (!output.missed_lead_recovery_expansion) {
  fail('output missing missed_lead_recovery_expansion marker');
}
if (
  output.missed_lead_recovery_expansion !== 'native_workflow_fixture_missed_lead_recovery_expansion'
) {
  fail('missed_lead_recovery_expansion marker is incorrect');
}
console.log('PASS: output includes missed_lead_recovery_expansion marker.');

for (const section of [
  'missed_lead_recovery_expansion_summary',
  'missed_lead_recovery_items',
  'missed_lead_recovery_status_summary',
  'missed_lead_recovery_eligibility_summary',
  'missed_lead_recovery_blocker_summary',
  'missed_lead_recovery_attempt_summary',
  'missed_lead_recovery_owner_summary',
  'missed_lead_recovery_manual_outreach_summary',
  'missed_lead_recovery_review_boundary_summary',
  'missed_lead_recovery_reporting_summary',
  'missed_lead_recovery_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level missed lead recovery sections are present.');

if (!Array.isArray(output.missed_lead_recovery_items) || !output.missed_lead_recovery_items.length) {
  fail('missed_lead_recovery_items must be a non-empty array');
}
if (output.missed_lead_recovery_items.length !== 25) {
  fail(
    `missed_lead_recovery_items must include one item per scenario (found ${output.missed_lead_recovery_items.length})`,
  );
}
console.log('PASS: missed_lead_recovery_items array has 25 scenario items.');

for (const item of output.missed_lead_recovery_items) {
  for (const field of REQUIRED_MISSED_LEAD_RECOVERY_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `missed lead recovery item ${item.missed_lead_recovery_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  if (item.live_sms_allowed !== 'no') {
    fail(`missed lead recovery item ${item.missed_lead_recovery_item_id} live_sms_allowed is not no`);
  }
  if (item.live_email_allowed !== 'no') {
    fail(`missed lead recovery item ${item.missed_lead_recovery_item_id} live_email_allowed is not no`);
  }
  if (item.live_call_allowed !== 'no') {
    fail(`missed lead recovery item ${item.missed_lead_recovery_item_id} live_call_allowed is not no`);
  }
  if (item.notification_sent !== 'no') {
    fail(`missed lead recovery item ${item.missed_lead_recovery_item_id} notification_sent is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(
      `missed lead recovery item ${item.missed_lead_recovery_item_id} production_data_touched is not no`,
    );
  }
  if (item.external_services_called !== 'no') {
    fail(
      `missed lead recovery item ${item.missed_lead_recovery_item_id} external_services_called is not no`,
    );
  }
  if (!item.audit_event_id) {
    fail(`missed lead recovery item ${item.missed_lead_recovery_item_id} missing audit_event_id`);
  }
  if (item.manual_outreach_needed && !item.manual_outreach_owner) {
    fail(
      `missed lead recovery item ${item.missed_lead_recovery_item_id} manual_outreach_needed but missing manual_outreach_owner`,
    );
  }
  if (item.do_not_contact_status && item.recovery_eligible) {
    fail(
      `missed lead recovery item ${item.missed_lead_recovery_item_id} do_not_contact but recovery_eligible is true`,
    );
  }
  if (
    item.missed_lead_recovery_used &&
    item.missed_lead_recovery_status === 'active' &&
    !item.next_step_due_date
  ) {
    fail(
      `missed lead recovery item ${item.missed_lead_recovery_item_id} active recovery missing next_step_due_date`,
    );
  }
}
console.log('PASS: every missed lead recovery item has required fields and safety values.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.missed_lead_recovery_safety_assertions.includes(assertion)) {
    fail(`missed_lead_recovery_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required missed lead recovery safety assertions are present.`,
);

const byScenarioId = {};
for (const item of output.missed_lead_recovery_items) {
  byScenarioId[item.scenario_id] = item;
}

for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!byScenarioId[scenarioId]) {
    fail(`missing missed lead recovery item for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have missed lead recovery items.');

for (const routing of ROUTING_ASSERTIONS) {
  const item = byScenarioId[routing.scenario_id];
  if (!routing.check(item)) {
    fail(`${routing.assertion_id}: scenario ${routing.scenario_id} failed missed lead recovery check`);
  }
}
console.log(
  `PASS: all ${ROUTING_ASSERTIONS.length} missed lead recovery routing assertions verified.`,
);

if (
  !output.missed_lead_recovery_eligibility_summary
    .missed_lead_recovery_can_mark_eligible_when_contact_and_permission_safe
) {
  fail('missed_lead_recovery_can_mark_eligible_when_contact_and_permission_safe: summary must confirm');
}
if (!output.missed_lead_recovery_manual_outreach_summary.missed_lead_recovery_manual_outreach_handoff_present) {
  fail('missed_lead_recovery_manual_outreach_handoff_present_when_needed: summary must confirm');
}
if (!output.missed_lead_recovery_review_boundary_summary.all_blocked_or_review_have_manual_next_step) {
  fail('required_manual_next_step_present_for_blocked_or_review_items: not all blocked/review items have next step');
}
if (!output.missed_lead_recovery_review_boundary_summary.all_open_recovery_have_next_step_owner) {
  fail('next_step_owner_required_for_recovery_items: not all open recovery items have owner');
}
if (!output.missed_lead_recovery_review_boundary_summary.all_open_recovery_have_due_date) {
  fail('next_step_due_date_required_for_open_recovery_items: not all open recovery items have due date');
}
console.log('PASS: missed lead recovery eligibility, handoff, and next-step summaries verified.');

if (!output.missed_lead_recovery_reporting_summary.reporting_summary_includes_missed_lead_recovery) {
  fail('reporting_summary_includes_missed_lead_recovery: reporting summary must confirm');
}
if (!output.missed_lead_recovery_reporting_summary.csv_snapshot_preserves_missed_lead_recovery_field) {
  fail('csv_snapshot_preserves_missed_lead_recovery_field: reporting summary must confirm');
}

const csvSnapshot = output.csv_export_snapshot_summary;
if (!csvSnapshot || !csvSnapshot.header_row.includes('missed_lead_recovery_used')) {
  fail('csv header missing missed_lead_recovery_used field');
}
const recoveryCsvRow = (csvSnapshot.sample_rows || []).find(
  (row) => row.missed_lead_recovery_used === 'yes',
);
if (!recoveryCsvRow) {
  fail('csv sample rows missing missed_lead_recovery_used=yes fixture row');
}
console.log('PASS: reporting and CSV missed lead recovery compatibility verified.');

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
  'PASS: existing guard assertion, reporting snapshot, review queue, appointment readiness, post-inspection, feedback permission, and manual outreach summaries remain present.',
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
  if (!scenario.missed_lead_recovery_items || !scenario.missed_lead_recovery_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario missed_lead_recovery_items`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario missed_lead_recovery_items.');

if (!output.activation_flags || output.activation_flags.live_sms_enabled !== false) {
  fail('activation_flags_default_false: live_sms_enabled must be false');
}
console.log('PASS: activation flags default false.');

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

const manualOutreachVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, manualOutreachVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
);
if (manualOutreachVerifierRun.status !== 0) {
  fail(
    `manual outreach verifier failed: ${manualOutreachVerifierRun.stderr || manualOutreachVerifierRun.stdout}`,
  );
}
console.log('PASS: manual outreach verifier still passes.');

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
  'verify-native-workflow-fixture-missed-lead-recovery-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Native Workflow Fixture Missed Lead Recovery Expansion', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_MISSED_LEAD_RECOVERY_EXPANSION.md',
  'run-native-workflow-fixture-missed-lead-recovery-expansion-dry-run.sh',
  'verify-native-workflow-fixture-missed-lead-recovery-expansion-readonly.js',
  'Native Workflow Fixture Missed Lead Recovery Expansion',
  'native workflow fixture missed lead recovery expansion',
  'missed lead recovery expansion',
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
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + ROUTING_ASSERTIONS.length;

console.log(
  `PASS: Native Workflow Fixture Missed Lead Recovery Expansion verified (${assertionCount}+ assertions, ${output.missed_lead_recovery_items.length} missed lead recovery items).`,
);
console.log(
  'PASS: Native Workflow Fixture Missed Lead Recovery Expansion is fixture-only, deterministic, and dry-run safe.',
);