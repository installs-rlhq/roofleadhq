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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_MANUAL_OUTREACH_EXPANSION.md';
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
const wrapperPath =
  'scripts/run-native-workflow-fixture-manual-outreach-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-manual-outreach-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_MANUAL_OUTREACH_ITEM_FIELDS = [
  'manual_outreach_item_id',
  'scenario_id',
  'lead_id',
  'appointment_id',
  'post_inspection_item_id',
  'feedback_permission_item_id',
  'plan_profile',
  'current_state',
  'target_state',
  'outreach_needed',
  'outreach_status',
  'outreach_reason',
  'outreach_owner',
  'outreach_channel_allowed',
  'contact_permission_status',
  'do_not_contact_status',
  'homeowner_contact_ready',
  'roofer_review_required',
  'roofleadhq_review_required',
  'business_judgment_required',
  'system_quality_issue',
  'prior_follow_up_count',
  'max_follow_up_attempts_reached',
  'missed_lead_recovery_used',
  'manual_next_step',
  'next_step_owner',
  'next_step_due_date',
  'last_manual_outreach_attempt_date',
  'manual_outreach_attempt_count',
  'manual_outreach_notes',
  'hold_or_block_reason',
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
  'manual_outreach_expansion_summary_present',
  'manual_outreach_items_present',
  'manual_outreach_item_required_fields_present',
  'missed_lead_recovery_can_route_to_manual_outreach',
  'max_follow_up_attempts_can_route_to_manual_outreach',
  'missing_contact_data_blocks_manual_outreach_or_routes_to_review',
  'unclear_contact_permission_blocks_manual_outreach_or_routes_to_review',
  'do_not_contact_blocks_manual_outreach',
  'homeowner_contact_ready_required_for_manual_outreach',
  'roofer_review_required_before_business_judgment_outreach',
  'roofleadhq_review_required_before_system_quality_outreach',
  'pricing_question_routes_to_roofer_review_before_outreach',
  'estimate_question_routes_to_roofer_review_before_outreach',
  'quote_request_routes_to_roofer_review_before_outreach',
  'insurance_complexity_routes_to_roofer_review_before_outreach',
  'payment_or_invoice_routes_to_roofer_review_before_outreach',
  'contract_question_routes_to_roofer_review_before_outreach',
  'homeowner_asks_for_roofer_routes_to_roofer_review_before_outreach',
  'upset_homeowner_routes_to_roofer_review_before_outreach',
  'negative_or_disputed_feedback_routes_to_roofer_review_before_outreach',
  'broken_routing_routes_to_roofleadhq_review_before_outreach',
  'missed_data_capture_routes_to_roofleadhq_review_before_outreach',
  'source_attribution_issue_routes_to_roofleadhq_review_before_outreach',
  'feedback_permission_capture_mismatch_routes_to_roofleadhq_review_before_outreach',
  'manual_outreach_owner_required',
  'manual_next_step_required',
  'next_step_owner_required',
  'next_step_due_date_required_when_outreach_needed',
  'outreach_attempt_count_present',
  'manual_outreach_decisions_are_audited',
  'live_sms_blocked_when_flag_false',
  'live_email_blocked_when_flag_false',
  'live_call_blocked_when_flag_false',
  'notification_sent_is_no_for_all_items',
  'live_sms_allowed_is_no_for_all_items',
  'live_email_allowed_is_no_for_all_items',
  'live_call_allowed_is_no_for_all_items',
  'no_twilio_call_performed',
  'no_vapi_call_performed',
  'no_resend_call_performed',
  'no_lindy_live_workflow_performed',
  'no_google_calendar_event_created',
  'no_external_services_called',
  'manual_outreach_uses_fake_data_only',
  'manual_outreach_does_not_touch_production_data',
  'manual_outreach_does_not_send_notifications',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'unsupported_request_routes_to_review_or_later_only',
  'unsupported_request_does_not_trigger_live_outreach',
];

const ROUTING_ASSERTIONS = [
  {
    assertion_id: 'missed_lead_recovery_can_route_to_manual_outreach',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) =>
      item.missed_lead_recovery_used === true &&
      item.outreach_needed === true &&
      item.outreach_channel_allowed === 'manual_only',
  },
  {
    assertion_id: 'max_follow_up_attempts_can_route_to_manual_outreach',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) =>
      item.max_follow_up_attempts_reached === true &&
      item.outreach_needed === true &&
      item.outreach_status === 'needed_manual_only',
  },
  {
    assertion_id: 'missing_contact_data_blocks_manual_outreach_or_routes_to_review',
    scenario_id: 'missing_information_path',
    check: (item) =>
      !item.homeowner_contact_ready && !item.outreach_needed && item.outreach_status.includes('review'),
  },
  {
    assertion_id: 'unclear_contact_permission_blocks_manual_outreach_or_routes_to_review',
    scenario_id: 'missing_information_path',
    check: (item) =>
      item.contact_permission_status === 'unknown' && !item.outreach_needed,
  },
  {
    assertion_id: 'do_not_contact_blocks_manual_outreach',
    scenario_id: 'stopped_do_not_contact_path',
    check: (item) =>
      item.do_not_contact_status === true &&
      !item.outreach_needed &&
      item.outreach_status === 'blocked',
  },
  {
    assertion_id: 'pricing_question_routes_to_roofer_review_before_outreach',
    scenario_id: 'roofer_review_needed_path',
    check: (item) =>
      item.pricing_question === true && item.roofer_review_required === true && !item.outreach_needed,
  },
  {
    assertion_id: 'estimate_question_routes_to_roofer_review_before_outreach',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.estimate_question === true && item.roofer_review_required === true && !item.outreach_needed,
  },
  {
    assertion_id: 'quote_request_routes_to_roofer_review_before_outreach',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.quote_request === true && item.roofer_review_required === true && !item.outreach_needed,
  },
  {
    assertion_id: 'insurance_complexity_routes_to_roofer_review_before_outreach',
    scenario_id: 'roofer_review_needed_path',
    check: (item) => item.insurance_complexity === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'payment_or_invoice_routes_to_roofer_review_before_outreach',
    scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    check: (item) =>
      item.payment_or_invoice_question === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'contract_question_routes_to_roofer_review_before_outreach',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) => item.contract_question === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'homeowner_asks_for_roofer_routes_to_roofer_review_before_outreach',
    scenario_id: 'homeowner_follow_up_needed_path',
    check: (item) =>
      item.homeowner_asks_for_roofer_directly === true &&
      (item.roofer_review_required === true || item.outreach_owner === 'roofer'),
  },
  {
    assertion_id: 'upset_homeowner_routes_to_roofer_review_before_outreach',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) => item.upset_homeowner === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'negative_or_disputed_feedback_routes_to_roofer_review_before_outreach',
    scenario_id: 'roofer_follow_up_needed_path',
    check: (item) =>
      item.negative_or_disputed_feedback === true && item.roofer_review_required === true,
  },
  {
    assertion_id: 'broken_routing_routes_to_roofleadhq_review_before_outreach',
    scenario_id: 'roofleadhq_system_review_needed_path',
    check: (item) =>
      item.broken_routing === true && item.roofleadhq_review_required === true && !item.outreach_needed,
  },
  {
    assertion_id: 'missed_data_capture_routes_to_roofleadhq_review_before_outreach',
    scenario_id: 'roofleadhq_system_review_needed_path',
    check: (item) =>
      item.missed_data_capture === true && item.roofleadhq_review_required === true && !item.outreach_needed,
  },
  {
    assertion_id: 'source_attribution_issue_routes_to_roofleadhq_review_before_outreach',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    check: (item) =>
      item.source_attribution_issue === true && item.roofleadhq_review_required === true,
  },
  {
    assertion_id: 'feedback_permission_capture_mismatch_routes_to_roofleadhq_review_before_outreach',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    check: (item) =>
      item.feedback_permission_capture_mismatch === true && item.roofleadhq_review_required === true,
  },
  {
    assertion_id: 'unsupported_request_routes_to_review_or_later_only',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) =>
      item.unsupported_request === true &&
      !item.outreach_needed === false &&
      item.live_sms_allowed === 'no',
  },
  {
    assertion_id: 'unsupported_request_does_not_trigger_live_outreach',
    scenario_id: 'activation_flag_false_blocks_live_action_path',
    check: (item) =>
      item.unsupported_request === true &&
      item.live_sms_allowed === 'no' &&
      item.live_email_allowed === 'no' &&
      item.live_call_allowed === 'no',
  },
  {
    assertion_id: 'homeowner_contact_ready_required_for_manual_outreach',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) => item.outreach_needed !== true || item.homeowner_contact_ready === true,
  },
  {
    assertion_id: 'next_step_due_date_required_when_outreach_needed',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) => !item.outreach_needed || item.next_step_due_date,
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
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['manual outreach verifier', verifierPath],
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

if (!output.manual_outreach_expansion) {
  fail('output missing manual_outreach_expansion marker');
}
if (output.manual_outreach_expansion !== 'native_workflow_fixture_manual_outreach_expansion') {
  fail('manual_outreach_expansion marker is incorrect');
}
console.log('PASS: output includes manual_outreach_expansion marker.');

for (const section of [
  'manual_outreach_expansion_summary',
  'manual_outreach_items',
  'manual_outreach_status_summary',
  'manual_outreach_owner_summary',
  'manual_outreach_reason_summary',
  'manual_outreach_attempt_summary',
  'missed_lead_manual_outreach_summary',
  'post_inspection_manual_outreach_summary',
  'feedback_manual_outreach_summary',
  'manual_outreach_review_boundary_summary',
  'manual_outreach_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level manual outreach sections are present.');

if (!Array.isArray(output.manual_outreach_items) || !output.manual_outreach_items.length) {
  fail('manual_outreach_items must be a non-empty array');
}
if (output.manual_outreach_items.length !== 25) {
  fail(
    `manual_outreach_items must include one item per scenario (found ${output.manual_outreach_items.length})`,
  );
}
console.log('PASS: manual_outreach_items array has 25 scenario items.');

for (const item of output.manual_outreach_items) {
  for (const field of REQUIRED_MANUAL_OUTREACH_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `manual outreach item ${item.manual_outreach_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  if (item.live_sms_allowed !== 'no') {
    fail(`manual outreach item ${item.manual_outreach_item_id} live_sms_allowed is not no`);
  }
  if (item.live_email_allowed !== 'no') {
    fail(`manual outreach item ${item.manual_outreach_item_id} live_email_allowed is not no`);
  }
  if (item.live_call_allowed !== 'no') {
    fail(`manual outreach item ${item.manual_outreach_item_id} live_call_allowed is not no`);
  }
  if (item.notification_sent !== 'no') {
    fail(`manual outreach item ${item.manual_outreach_item_id} notification_sent is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(`manual outreach item ${item.manual_outreach_item_id} production_data_touched is not no`);
  }
  if (item.external_services_called !== 'no') {
    fail(`manual outreach item ${item.manual_outreach_item_id} external_services_called is not no`);
  }
  if (!item.audit_event_id) {
    fail(`manual outreach item ${item.manual_outreach_item_id} missing audit_event_id`);
  }
  if (item.outreach_needed && !item.outreach_owner) {
    fail(`manual outreach item ${item.manual_outreach_item_id} outreach_needed but missing outreach_owner`);
  }
  if (item.outreach_needed && !item.manual_next_step) {
    fail(`manual outreach item ${item.manual_outreach_item_id} outreach_needed but missing manual_next_step`);
  }
  if (item.outreach_needed && !item.next_step_owner) {
    fail(`manual outreach item ${item.manual_outreach_item_id} outreach_needed but missing next_step_owner`);
  }
  if (item.outreach_needed && !item.next_step_due_date) {
    fail(
      `manual outreach item ${item.manual_outreach_item_id} outreach_needed but missing next_step_due_date`,
    );
  }
  if (item.outreach_needed && !item.homeowner_contact_ready) {
    fail(
      `manual outreach item ${item.manual_outreach_item_id} outreach_needed but homeowner_contact_ready is false`,
    );
  }
  if (item.do_not_contact_status && item.outreach_needed) {
    fail(
      `manual outreach item ${item.manual_outreach_item_id} do_not_contact but outreach_needed is true`,
    );
  }
  if (
    item.manual_outreach_attempt_count === undefined ||
    item.manual_outreach_attempt_count === null
  ) {
    fail(`manual outreach item ${item.manual_outreach_item_id} missing outreach_attempt_count`);
  }
}
console.log('PASS: every manual outreach item has required fields and safety values.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.manual_outreach_safety_assertions.includes(assertion)) {
    fail(`manual_outreach_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required manual outreach safety assertions are present.`,
);

const byScenarioId = {};
for (const item of output.manual_outreach_items) {
  byScenarioId[item.scenario_id] = item;
}

for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!byScenarioId[scenarioId]) {
    fail(`missing manual outreach item for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have manual outreach items.');

for (const routing of ROUTING_ASSERTIONS) {
  const item = byScenarioId[routing.scenario_id];
  if (!routing.check(item)) {
    fail(`${routing.assertion_id}: scenario ${routing.scenario_id} failed manual outreach check`);
  }
}
console.log(
  `PASS: all ${ROUTING_ASSERTIONS.length} manual outreach routing assertions verified.`,
);

if (!output.manual_outreach_review_boundary_summary.all_needed_items_have_manual_next_step) {
  fail('manual_next_step_required: not all needed items have manual_next_step');
}
if (!output.manual_outreach_review_boundary_summary.all_needed_items_have_next_step_owner) {
  fail('next_step_owner_required: not all needed items have next_step_owner');
}
if (!output.manual_outreach_review_boundary_summary.all_needed_items_have_due_date) {
  fail('next_step_due_date_required_when_outreach_needed: not all needed items have due date');
}
console.log('PASS: all needed items have owner, manual next step, and due date.');

if (!output.missed_lead_manual_outreach_summary.missed_lead_recovery_can_route_to_manual_outreach) {
  fail('missed_lead_recovery_can_route_to_manual_outreach: summary must confirm routing');
}
if (!output.manual_outreach_attempt_summary.all_items_have_attempt_count) {
  fail('outreach_attempt_count_present: not all items have attempt count');
}
console.log('PASS: missed lead recovery and attempt count summaries verified.');

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
  'PASS: existing guard assertion, reporting snapshot, review queue, appointment readiness, post-inspection, and feedback permission summaries remain present.',
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
  if (!scenario.manual_outreach_items || !scenario.manual_outreach_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario manual_outreach_items`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario manual_outreach_items.');

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

const feedbackPermissionVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, feedbackPermissionVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024 },
);
if (feedbackPermissionVerifierRun.status !== 0) {
  fail(
    `feedback permission verifier failed: ${feedbackPermissionVerifierRun.stderr || feedbackPermissionVerifierRun.stdout}`,
  );
}
console.log('PASS: feedback permission verifier still passes.');

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
  'verify-native-workflow-fixture-manual-outreach-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Native Workflow Fixture Manual Outreach Expansion', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_MANUAL_OUTREACH_EXPANSION.md',
  'run-native-workflow-fixture-manual-outreach-expansion-dry-run.sh',
  'verify-native-workflow-fixture-manual-outreach-expansion-readonly.js',
  'Native Workflow Fixture Manual Outreach Expansion',
  'native workflow fixture manual outreach expansion',
  'manual outreach expansion',
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
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + ROUTING_ASSERTIONS.length;

console.log(
  `PASS: Native Workflow Fixture Manual Outreach Expansion verified (${assertionCount}+ assertions, ${output.manual_outreach_items.length} manual outreach items).`,
);
console.log(
  'PASS: Native Workflow Fixture Manual Outreach Expansion is fixture-only, deterministic, and dry-run safe.',
);