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
  'docs/NATIVE_WORKFLOW_FIXTURE_MESSAGING_COMPLIANCE_CONTACT_PERMISSION_EXPANSION.md';
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
const leadSourceRoiVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-lead-source-roi-boundary-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-messaging-compliance-contact-permission-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-messaging-compliance-contact-permission-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_CONTACT_PERMISSION_ITEM_FIELDS = [
  'contact_permission_item_id',
  'scenario_id',
  'lead_id',
  'roofer_account_id',
  'plan_profile',
  'lead_source',
  'homeowner_phone_present',
  'homeowner_email_present',
  'homeowner_contact_ready',
  'contact_permission_status',
  'contact_permission_source',
  'permission_evidence',
  'homeowner_contacted_business',
  'homeowner_gave_permission',
  'do_not_contact_status',
  'sms_eligible',
  'email_eligible',
  'call_eligible',
  'channel_eligibility_reason',
  'messaging_allowed_in_fixture',
  'messaging_hold_required',
  'messaging_hold_reason',
  'roofer_review_required',
  'roofleadhq_review_required',
  'review_reason',
  'required_manual_next_step',
  'audit_event_id',
  'live_sms_allowed',
  'live_email_allowed',
  'live_call_allowed',
  'notification_sent',
  'production_data_touched',
  'external_services_called',
];

const VALID_PERMISSION_STATUSES = new Set([
  'permission_confirmed',
  'contacted_business',
  'permission_unknown',
  'permission_missing',
  'permission_denied',
  'do_not_contact',
  'needs_review',
]);

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
  'messaging_compliance_expansion_summary_present',
  'contact_permission_items_present',
  'contact_permission_item_required_fields_present',
  'permission_confirmed_allows_fixture_messaging_only',
  'contacted_business_allows_fixture_messaging_only',
  'permission_unknown_routes_to_hold_or_review',
  'permission_missing_routes_to_hold_or_review',
  'permission_denied_blocks_outreach',
  'do_not_contact_blocks_all_outreach',
  'missing_phone_blocks_sms_and_call',
  'missing_email_blocks_email',
  'missing_usable_contact_data_routes_to_missing_info_or_hold',
  'permission_uncertainty_fails_closed',
  'roofer_review_required_for_permission_source_clarification',
  'roofleadhq_review_limited_to_system_quality_permission_issues',
  'live_sms_allowed_is_no_for_all_items',
  'live_email_allowed_is_no_for_all_items',
  'live_call_allowed_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'messaging_compliance_decisions_are_audited',
  'reporting_summary_includes_messaging_compliance',
  'public_terms_or_compliance_copy_not_changed_without_approval',
];

const ROUTING_ASSERTIONS = [
  {
    assertion_id: 'permission_confirmed_allows_fixture_messaging_only',
    scenario_id: 'normal_lead_to_appointment_readiness',
    check: (item) =>
      item.contact_permission_status === 'permission_confirmed' &&
      item.messaging_allowed_in_fixture === true &&
      (item.sms_eligible || item.email_eligible || item.call_eligible) &&
      item.live_sms_allowed === 'no' &&
      item.live_email_allowed === 'no' &&
      item.live_call_allowed === 'no',
  },
  {
    assertion_id: 'contacted_business_allows_fixture_messaging_only',
    scenario_id: 'missed_lead_recovery_path',
    check: (item) =>
      item.contact_permission_status === 'contacted_business' &&
      item.homeowner_contacted_business === true &&
      item.messaging_allowed_in_fixture === true &&
      item.live_sms_allowed === 'no',
  },
  {
    assertion_id: 'permission_unknown_routes_to_hold_or_review',
    scenario_id: 'missing_information_path',
    check: (item) =>
      item.contact_permission_status === 'permission_unknown' &&
      (item.messaging_hold_required ||
        item.roofer_review_required ||
        item.roofleadhq_review_required) &&
      !item.messaging_allowed_in_fixture,
  },
  {
    assertion_id: 'permission_missing_routes_to_hold_or_review',
    scenario_id: 'feedback_permission_not_asked_path',
    check: (item) =>
      item.contact_permission_status === 'permission_missing' &&
      (item.messaging_hold_required ||
        item.roofer_review_required ||
        item.roofleadhq_review_required) &&
      !item.messaging_allowed_in_fixture,
  },
  {
    assertion_id: 'permission_denied_blocks_outreach',
    scenario_id: 'feedback_permission_no_path',
    check: (item) =>
      item.contact_permission_status === 'permission_denied' &&
      !item.sms_eligible &&
      !item.email_eligible &&
      !item.call_eligible &&
      !item.messaging_allowed_in_fixture,
  },
  {
    assertion_id: 'do_not_contact_blocks_all_outreach',
    scenario_id: 'stopped_do_not_contact_path',
    check: (item) =>
      item.contact_permission_status === 'do_not_contact' &&
      item.do_not_contact_status === true &&
      !item.sms_eligible &&
      !item.email_eligible &&
      !item.call_eligible &&
      !item.messaging_allowed_in_fixture,
  },
  {
    assertion_id: 'missing_phone_blocks_sms_and_call',
    scenario_id: 'missing_information_path',
    check: (item) =>
      !item.homeowner_phone_present && !item.sms_eligible && !item.call_eligible,
  },
  {
    assertion_id: 'missing_email_blocks_email',
    scenario_id: 'csv_report_snapshot_fake_data_path',
    check: (item) => !item.homeowner_email_present && !item.email_eligible,
  },
  {
    assertion_id: 'missing_usable_contact_data_routes_to_missing_info_or_hold',
    scenario_id: 'missing_information_path',
    check: (item) =>
      !item.homeowner_contact_ready &&
      (item.messaging_hold_required || !item.messaging_allowed_in_fixture),
  },
  {
    assertion_id: 'permission_uncertainty_fails_closed',
    scenario_id: 'duplicate_review_path',
    check: (item) =>
      item.contact_permission_status === 'needs_review' &&
      !item.sms_eligible &&
      !item.email_eligible &&
      !item.call_eligible &&
      !item.messaging_allowed_in_fixture,
  },
  {
    assertion_id: 'roofer_review_required_for_permission_source_clarification',
    scenario_id: 'custom_review_500_plus_leads_path',
    check: (item) =>
      item.contact_permission_status === 'permission_unknown' &&
      item.roofer_review_required === true &&
      item.roofleadhq_review_required === false,
  },
  {
    assertion_id: 'roofleadhq_review_limited_to_system_quality_permission_issues',
    scenario_id: 'roofleadhq_system_review_needed_path',
    check: (item) =>
      item.roofleadhq_review_required === true &&
      item.roofer_review_required === false &&
      item.messaging_hold_required === true,
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
console.log('PASS: lead source ROI verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['messaging compliance verifier', verifierPath],
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

if (!output.messaging_compliance_expansion) {
  fail('output missing messaging_compliance_expansion marker');
}
if (
  output.messaging_compliance_expansion !==
  'native_workflow_fixture_messaging_compliance_contact_permission_expansion'
) {
  fail('messaging_compliance_expansion marker is incorrect');
}
console.log('PASS: output includes messaging_compliance_expansion marker.');

for (const section of [
  'messaging_compliance_expansion_summary',
  'contact_permission_items',
  'contact_permission_status_summary',
  'do_not_contact_summary',
  'channel_eligibility_summary',
  'consent_source_summary',
  'messaging_hold_summary',
  'messaging_review_summary',
  'messaging_compliance_reporting_summary',
  'messaging_compliance_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level messaging compliance sections are present.');

if (!Array.isArray(output.contact_permission_items) || !output.contact_permission_items.length) {
  fail('contact_permission_items must be a non-empty array');
}
if (output.contact_permission_items.length !== 25) {
  fail(
    `contact_permission_items must include one item per scenario (found ${output.contact_permission_items.length})`,
  );
}
console.log('PASS: contact_permission_items array has 25 scenario items.');

for (const item of output.contact_permission_items) {
  for (const field of REQUIRED_CONTACT_PERMISSION_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `contact permission item ${item.contact_permission_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  if (!VALID_PERMISSION_STATUSES.has(item.contact_permission_status)) {
    fail(
      `contact permission item ${item.contact_permission_item_id} has invalid contact_permission_status: ${item.contact_permission_status}`,
    );
  }
  if (item.live_sms_allowed !== 'no') {
    fail(`contact permission item ${item.contact_permission_item_id} live_sms_allowed is not no`);
  }
  if (item.live_email_allowed !== 'no') {
    fail(`contact permission item ${item.contact_permission_item_id} live_email_allowed is not no`);
  }
  if (item.live_call_allowed !== 'no') {
    fail(`contact permission item ${item.contact_permission_item_id} live_call_allowed is not no`);
  }
  if (item.notification_sent !== 'no') {
    fail(`contact permission item ${item.contact_permission_item_id} notification_sent is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(
      `contact permission item ${item.contact_permission_item_id} production_data_touched is not no`,
    );
  }
  if (item.external_services_called !== 'no') {
    fail(
      `contact permission item ${item.contact_permission_item_id} external_services_called is not no`,
    );
  }
  if (
    item.messaging_allowed_in_fixture &&
    !(item.homeowner_contacted_business || item.homeowner_gave_permission)
  ) {
    fail(
      `contact permission item ${item.contact_permission_item_id} allows fixture messaging without contacted business or permission`,
    );
  }
  if (
    ['permission_unknown', 'permission_missing', 'needs_review'].includes(
      item.contact_permission_status,
    ) &&
    (item.sms_eligible || item.email_eligible || item.call_eligible)
  ) {
    fail(
      `contact permission item ${item.contact_permission_item_id} permission uncertainty must fail closed on channels`,
    );
  }
  if (
    (item.contact_permission_status === 'permission_denied' ||
      item.contact_permission_status === 'do_not_contact' ||
      item.do_not_contact_status) &&
    (item.sms_eligible || item.email_eligible || item.call_eligible || item.messaging_allowed_in_fixture)
  ) {
    fail(
      `contact permission item ${item.contact_permission_item_id} denied/dnc must block all outreach`,
    );
  }
  if (!item.homeowner_phone_present && (item.sms_eligible || item.call_eligible)) {
    fail(
      `contact permission item ${item.contact_permission_item_id} missing phone must block sms and call`,
    );
  }
  if (!item.homeowner_email_present && item.email_eligible) {
    fail(
      `contact permission item ${item.contact_permission_item_id} missing email must block email`,
    );
  }
  if (!item.audit_event_id) {
    fail(`contact permission item ${item.contact_permission_item_id} missing audit_event_id`);
  }
  const needsManualStep =
    item.messaging_hold_required ||
    item.roofer_review_required ||
    item.roofleadhq_review_required ||
    item.contact_permission_status === 'permission_denied' ||
    item.contact_permission_status === 'do_not_contact';
  if (needsManualStep && !item.required_manual_next_step) {
    fail(
      `contact permission item ${item.contact_permission_item_id} missing required_manual_next_step for hold/review/denied/dnc item`,
    );
  }
}
console.log('PASS: every contact permission item has required fields and safety values.');

for (const status of VALID_PERMISSION_STATUSES) {
  const count = output.contact_permission_items.filter(
    (i) => i.contact_permission_status === status,
  ).length;
  if (count < 1) {
    fail(`contact_permission_items missing demonstration of status: ${status}`);
  }
}
console.log('PASS: all required permission statuses are demonstrated.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.messaging_compliance_safety_assertions.includes(assertion)) {
    fail(`messaging_compliance_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required messaging compliance safety assertions are present.`,
);

const byScenarioId = {};
for (const item of output.contact_permission_items) {
  byScenarioId[item.scenario_id] = item;
}

for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!byScenarioId[scenarioId]) {
    fail(`missing contact permission item for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have contact permission items.');

for (const routing of ROUTING_ASSERTIONS) {
  const item = byScenarioId[routing.scenario_id];
  if (!routing.check(item)) {
    fail(
      `${routing.assertion_id}: scenario ${routing.scenario_id} failed messaging compliance check`,
    );
  }
}
console.log(
  `PASS: all ${ROUTING_ASSERTIONS.length} messaging compliance routing assertions verified.`,
);

if (output.messaging_compliance_expansion_summary.public_terms_or_compliance_copy_changed !== false) {
  fail('public_terms_or_compliance_copy_changed must be false in expansion summary');
}
if (output.messaging_compliance_expansion_summary.live_sms_email_call_allowed !== false) {
  fail('live_sms_email_call_allowed must be false in expansion summary');
}
console.log('PASS: messaging compliance expansion summary verified.');

if (!output.do_not_contact_summary.do_not_contact_blocks_all_outreach) {
  fail('do_not_contact_blocks_all_outreach: do_not_contact_summary must confirm');
}
if (!output.do_not_contact_summary.stopped_do_not_contact_path_demonstrated) {
  fail('stopped_do_not_contact_path must be demonstrated in do_not_contact_summary');
}
console.log('PASS: do-not-contact summary verified.');

if (!output.channel_eligibility_summary.missing_phone_blocks_sms_and_call) {
  fail('missing_phone_blocks_sms_and_call: channel_eligibility_summary must confirm');
}
if (!output.channel_eligibility_summary.missing_email_blocks_email) {
  fail('missing_email_blocks_email: channel_eligibility_summary must confirm');
}
if (!output.channel_eligibility_summary.permission_uncertainty_fails_closed) {
  fail('permission_uncertainty_fails_closed: channel_eligibility_summary must confirm');
}
console.log('PASS: channel eligibility summary verified.');

if (!output.consent_source_summary.follow_up_allowed_only_when_contacted_or_permission_given) {
  fail(
    'follow_up_allowed_only_when_contacted_or_permission_given: consent_source_summary must confirm',
  );
}
console.log('PASS: consent source summary verified.');

if (!output.messaging_hold_summary.permission_unknown_routes_to_hold_or_review) {
  fail('permission_unknown_routes_to_hold_or_review: messaging_hold_summary must confirm');
}
if (!output.messaging_hold_summary.permission_missing_routes_to_hold_or_review) {
  fail('permission_missing_routes_to_hold_or_review: messaging_hold_summary must confirm');
}
if (
  !output.messaging_hold_summary.missing_usable_contact_data_routes_to_missing_info_or_hold
) {
  fail(
    'missing_usable_contact_data_routes_to_missing_info_or_hold: messaging_hold_summary must confirm',
  );
}
console.log('PASS: messaging hold summary verified.');

if (
  !output.messaging_review_summary.roofer_review_required_for_permission_source_clarification
) {
  fail(
    'roofer_review_required_for_permission_source_clarification: messaging_review_summary must confirm',
  );
}
if (
  !output.messaging_review_summary.roofleadhq_review_limited_to_system_quality_permission_issues
) {
  fail(
    'roofleadhq_review_limited_to_system_quality_permission_issues: messaging_review_summary must confirm',
  );
}
if (!output.messaging_review_summary.does_not_route_business_judgment_to_roofleadhq) {
  fail('does_not_route_business_judgment_to_roofleadhq: messaging_review_summary must confirm');
}
console.log('PASS: messaging review summary verified.');

if (!output.messaging_compliance_reporting_summary.reporting_summary_includes_messaging_compliance) {
  fail('reporting_summary_includes_messaging_compliance: reporting summary must confirm');
}
if (!output.messaging_compliance_reporting_summary.live_reporting_delivery_blocked) {
  fail('live_reporting_delivery_blocked: reporting summary must confirm');
}
console.log('PASS: messaging compliance reporting summary verified.');

if (!output.lead_source_roi_expansion) {
  fail('output missing lead_source_roi_expansion — prior lead source ROI expansion must remain');
}
if (!output.usage_volume_expansion) {
  fail('output missing usage_volume_expansion — prior usage volume expansion must remain');
}
if (!output.reporting_snapshot_summary) {
  fail('output missing reporting_snapshot_summary — prior reporting expansion must remain');
}
if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log(
  'PASS: existing guard assertion, reporting snapshot, usage volume, and lead source ROI summaries remain present.',
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
  if (!scenario.contact_permission_items || !scenario.contact_permission_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario contact_permission_items`);
  }
}
console.log(
  'PASS: every scenario preserves safety fields and per-scenario contact_permission_items.',
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

const leadSourceRoiVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, leadSourceRoiVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
);
if (leadSourceRoiVerifierRun.status !== 0) {
  fail(
    `lead source ROI verifier failed: ${leadSourceRoiVerifierRun.stderr || leadSourceRoiVerifierRun.stdout}`,
  );
}
console.log('PASS: lead source ROI verifier still passes.');

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
  'verify-native-workflow-fixture-messaging-compliance-contact-permission-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Messaging Compliance / Contact Permission Expansion',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_MESSAGING_COMPLIANCE_CONTACT_PERMISSION_EXPANSION.md',
  'run-native-workflow-fixture-messaging-compliance-contact-permission-expansion-dry-run.sh',
  'verify-native-workflow-fixture-messaging-compliance-contact-permission-expansion-readonly.js',
  'Native Workflow Fixture Messaging Compliance / Contact Permission Expansion',
  'native workflow fixture messaging compliance contact permission expansion',
  'messaging compliance contact permission expansion',
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
mustHave(
  wrapper,
  'verify-native-workflow-fixture-messaging-compliance-contact-permission-expansion-readonly.js',
  'wrapper messaging compliance verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + ROUTING_ASSERTIONS.length;

console.log(
  `PASS: Native Workflow Fixture Messaging Compliance / Contact Permission Expansion verified (${assertionCount}+ assertions, ${output.contact_permission_items.length} contact permission items).`,
);
console.log(
  'PASS: Native Workflow Fixture Messaging Compliance / Contact Permission Expansion is fixture-only, deterministic, and dry-run safe.',
);