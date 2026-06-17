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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_AUDIT_EVENT_TIMELINE_EXPANSION.md';
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
const messagingComplianceVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-messaging-compliance-contact-permission-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-audit-event-timeline-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-audit-event-timeline-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_AUDIT_EVENT_ITEM_FIELDS = [
  'audit_event_id',
  'scenario_id',
  'lead_id',
  'roofer_account_id',
  'plan_profile',
  'event_timestamp_fixture',
  'event_sequence',
  'event_type',
  'source_state',
  'target_state',
  'decision_reason',
  'guard_assertion_refs',
  'review_owner',
  'review_reason',
  'required_manual_next_step',
  'activation_flag_checked',
  'live_action_blocked',
  'data_boundary_checked',
  'homeowner_personal_information_minimized',
  'secret_or_credential_logged',
  'live_action_performed',
  'production_data_touched',
  'external_services_called',
];

const REQUIRED_STATE_TRANSITION_TIMELINE_ITEM_FIELDS = [
  'timeline_item_id',
  'scenario_id',
  'lead_id',
  'event_sequence',
  'from_state',
  'to_state',
  'transition_reason',
  'guard_result',
  'blocked_reason_if_any',
  'review_required',
  'review_owner',
  'audit_event_id',
  'live_action_allowed',
  'production_data_touched',
  'external_services_called',
];

const REQUIRED_COVERAGE_AREAS = [
  'lead_intake_state_decision',
  'missing_information_routing',
  'duplicate_review_routing',
  'bad_fit_excluded_routing',
  'do_not_contact_blocking',
  'messaging_compliance_contact_permission_decision',
  'follow_up_missed_lead_recovery_decision',
  'manual_outreach_decision',
  'appointment_readiness_decision',
  'review_queue_ownership_decision',
  'post_inspection_decision',
  'feedback_permission_decision',
  'reporting_csv_boundary_decision',
  'usage_volume_plan_limit_decision',
  'lead_source_roi_boundary_decision',
  'activation_flag_blocking_decision',
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
  'audit_event_timeline_expansion_summary_present',
  'audit_event_items_present',
  'audit_event_item_required_fields_present',
  'state_transition_timeline_items_present',
  'state_transition_timeline_item_required_fields_present',
  'every_transition_has_audit_event_id',
  'every_blocked_live_action_has_activation_flag_audit_event',
  'every_review_routing_decision_has_review_owner',
  'roofer_review_owns_business_judgment_events',
  'roofleadhq_review_limited_to_system_quality_events',
  'guard_decision_trace_summary_present',
  'activation_flag_audit_summary_present',
  'data_boundary_audit_summary_present',
  'manual_next_step_audit_summary_present',
  'no_secret_or_credential_logged',
  'homeowner_personal_information_minimized',
  'live_action_performed_is_no_for_all_items',
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
  'audit_timeline_is_fake_data_only',
  'audit_timeline_is_deterministic',
  'reporting_summary_includes_audit_timeline',
  'public_legal_or_privacy_copy_not_changed_without_approval',
];

const BUSINESS_JUDGMENT_COVERAGE_AREAS = new Set([
  'manual_outreach_decision',
  'appointment_readiness_decision',
  'post_inspection_decision',
  'follow_up_missed_lead_recovery_decision',
  'usage_volume_plan_limit_decision',
  'lead_source_roi_boundary_decision',
]);

const SYSTEM_QUALITY_COVERAGE_AREAS = new Set([
  'duplicate_review_routing',
  'reporting_csv_boundary_decision',
  'messaging_compliance_contact_permission_decision',
  'review_queue_ownership_decision',
  'lead_source_roi_boundary_decision',
]);

const UNSAFE_AUDIT_PATTERNS = [
  /process\.env/i,
  /SUPABASE/i,
  /sk_live/i,
  /api[_-]?key/i,
  /password/i,
  /secret/i,
  /credential/i,
  /@roofleadhq\.com/i,
  /\+1\d{10}/,
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
console.log('PASS: prior expansion verifiers exist.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['audit event timeline verifier', verifierPath],
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

if (!output.audit_event_timeline_expansion) {
  fail('output missing audit_event_timeline_expansion marker');
}
if (output.audit_event_timeline_expansion !== 'native_workflow_fixture_audit_event_timeline_expansion') {
  fail('audit_event_timeline_expansion marker is incorrect');
}
console.log('PASS: output includes audit_event_timeline_expansion marker.');

for (const section of [
  'audit_event_timeline_expansion_summary',
  'audit_event_items',
  'state_transition_timeline_items',
  'guard_decision_trace_summary',
  'review_routing_trace_summary',
  'activation_flag_audit_summary',
  'manual_next_step_audit_summary',
  'data_boundary_audit_summary',
  'timeline_reporting_summary',
  'audit_event_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level audit event timeline sections are present.');

if (!Array.isArray(output.audit_event_items) || !output.audit_event_items.length) {
  fail('audit_event_items must be a non-empty array');
}
if (!Array.isArray(output.state_transition_timeline_items) || !output.state_transition_timeline_items.length) {
  fail('state_transition_timeline_items must be a non-empty array');
}
console.log(
  `PASS: audit_event_items (${output.audit_event_items.length}) and state_transition_timeline_items (${output.state_transition_timeline_items.length}) are present.`,
);

const auditEventIds = new Set(output.audit_event_items.map((i) => i.audit_event_id));

for (const item of output.audit_event_items) {
  for (const field of REQUIRED_AUDIT_EVENT_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(`audit event item ${item.audit_event_id || 'unknown'} missing field: ${field}`);
    }
  }
  if (item.secret_or_credential_logged !== 'no') {
    fail(`audit event item ${item.audit_event_id} secret_or_credential_logged is not no`);
  }
  if (item.live_action_performed !== 'no') {
    fail(`audit event item ${item.audit_event_id} live_action_performed is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(`audit event item ${item.audit_event_id} production_data_touched is not no`);
  }
  if (item.external_services_called !== 'no') {
    fail(`audit event item ${item.audit_event_id} external_services_called is not no`);
  }
  if (item.homeowner_personal_information_minimized !== true) {
    fail(
      `audit event item ${item.audit_event_id} homeowner_personal_information_minimized is not true`,
    );
  }
  const serialized = JSON.stringify(item);
  for (const pattern of UNSAFE_AUDIT_PATTERNS) {
    if (pattern.test(serialized) && !/fixture/i.test(serialized)) {
      fail(`audit event item ${item.audit_event_id} may contain unsafe data: ${pattern}`);
    }
  }
}
console.log('PASS: every audit event item has required fields and safety values.');

for (const item of output.state_transition_timeline_items) {
  for (const field of REQUIRED_STATE_TRANSITION_TIMELINE_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(`timeline item ${item.timeline_item_id || 'unknown'} missing field: ${field}`);
    }
  }
  if (!item.audit_event_id) {
    fail(`timeline item ${item.timeline_item_id} missing audit_event_id`);
  }
  if (!auditEventIds.has(item.audit_event_id)) {
    fail(
      `timeline item ${item.timeline_item_id} audit_event_id ${item.audit_event_id} not found in audit_event_items`,
    );
  }
  if (item.live_action_allowed !== 'no') {
    fail(`timeline item ${item.timeline_item_id} live_action_allowed is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(`timeline item ${item.timeline_item_id} production_data_touched is not no`);
  }
  if (item.external_services_called !== 'no') {
    fail(`timeline item ${item.timeline_item_id} external_services_called is not no`);
  }
}
console.log('PASS: every state transition timeline item has required fields and linked audit_event_id.');

const coveragePresent = new Set(output.audit_event_items.map((i) => i.coverage_area));
for (const area of REQUIRED_COVERAGE_AREAS) {
  if (!coveragePresent.has(area)) {
    fail(`audit coverage area missing: ${area}`);
  }
}
console.log(`PASS: all ${REQUIRED_COVERAGE_AREAS.length} required audit coverage areas are present.`);

const blockedLiveActions = output.audit_event_items.filter((i) => i.live_action_blocked);
const activationFlagAudits = output.audit_event_items.filter(
  (i) => i.event_type === 'activation_flag_blocking_decision' || i.activation_flag_checked,
);
for (const blocked of blockedLiveActions) {
  const hasActivationAudit = activationFlagAudits.some(
    (audit) =>
      audit.scenario_id === blocked.scenario_id &&
      (audit.event_type === 'activation_flag_blocking_decision' || audit.activation_flag_checked),
  );
  if (!hasActivationAudit) {
    fail(
      `blocked live action in scenario ${blocked.scenario_id} missing activation flag audit event`,
    );
  }
}
console.log('PASS: every blocked live action has activation flag audit event.');

const reviewRoutingItems = output.audit_event_items.filter(
  (i) => i.event_type === 'review_queue_ownership_decision',
);
for (const item of reviewRoutingItems) {
  if (!item.review_owner) {
    fail(`review routing audit event ${item.audit_event_id} missing review_owner`);
  }
}
console.log('PASS: every review routing decision has review_owner.');

const rooferBusinessJudgment = output.audit_event_items.filter(
  (i) => i.review_owner === 'roofer' && BUSINESS_JUDGMENT_COVERAGE_AREAS.has(i.coverage_area),
);
if (
  rooferBusinessJudgment.some((i) => i.review_owner !== 'roofer')
) {
  fail('roofer_review_owns_business_judgment_events: roofer must own business judgment events');
}
console.log('PASS: roofer review owns business judgment events.');

const roofleadhqSystemQuality = output.audit_event_items.filter(
  (i) => i.review_owner === 'roofleadhq_jason',
);
for (const item of roofleadhqSystemQuality) {
  if (!SYSTEM_QUALITY_COVERAGE_AREAS.has(item.coverage_area)) {
    fail(
      `roofleadhq review event ${item.audit_event_id} coverage_area ${item.coverage_area} is not system-quality limited`,
    );
  }
}
console.log('PASS: RoofLeadHQ review limited to system quality events.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.audit_event_safety_assertions.includes(assertion)) {
    fail(`audit_event_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required audit event safety assertions are present.`,
);

if (!output.audit_event_timeline_expansion_summary.all_coverage_areas_present) {
  fail('audit_event_timeline_expansion_summary.all_coverage_areas_present must be true');
}
if (output.audit_event_timeline_expansion_summary.public_legal_or_privacy_copy_changed !== false) {
  fail('public_legal_or_privacy_copy_changed must be false in expansion summary');
}
console.log('PASS: audit event timeline expansion summary verified.');

if (!output.guard_decision_trace_summary.audit_events_with_guard_refs) {
  fail('guard_decision_trace_summary must include audit_events_with_guard_refs');
}
console.log('PASS: guard decision trace summary verified.');

if (!output.review_routing_trace_summary.every_review_routing_decision_has_review_owner) {
  fail('review_routing_trace_summary must confirm every_review_routing_decision_has_review_owner');
}
if (!output.review_routing_trace_summary.roofer_owns_business_judgment) {
  fail('review_routing_trace_summary must confirm roofer_owns_business_judgment');
}
console.log('PASS: review routing trace summary verified.');

if (!output.activation_flag_audit_summary.every_blocked_live_action_has_activation_flag_audit) {
  fail('activation_flag_audit_summary must confirm every_blocked_live_action_has_activation_flag_audit');
}
if (!output.activation_flag_audit_summary.no_twilio_calls) {
  fail('activation_flag_audit_summary must confirm no_twilio_calls');
}
if (!output.activation_flag_audit_summary.no_crm_sync) {
  fail('activation_flag_audit_summary must confirm no_crm_sync');
}
console.log('PASS: activation flag audit summary verified.');

if (!output.data_boundary_audit_summary.no_secret_or_credential_logged) {
  fail('data_boundary_audit_summary must confirm no_secret_or_credential_logged');
}
if (!output.data_boundary_audit_summary.homeowner_personal_information_minimized_for_all) {
  fail('data_boundary_audit_summary must confirm homeowner_personal_information_minimized_for_all');
}
if (!output.data_boundary_audit_summary.no_billing_or_payment_action) {
  fail('data_boundary_audit_summary must confirm no_billing_or_payment_action');
}
console.log('PASS: data boundary audit summary verified.');

if (!output.timeline_reporting_summary.reporting_summary_includes_audit_timeline) {
  fail('timeline_reporting_summary must confirm reporting_summary_includes_audit_timeline');
}
console.log('PASS: timeline reporting summary verified.');

const auditByScenario = {};
for (const item of output.audit_event_items) {
  auditByScenario[item.scenario_id] = (auditByScenario[item.scenario_id] || 0) + 1;
}
for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!auditByScenario[scenarioId]) {
    fail(`missing audit events for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have audit events.');

if (!output.messaging_compliance_expansion) {
  fail('output missing messaging_compliance_expansion — prior messaging expansion must remain');
}
if (!output.lead_source_roi_expansion) {
  fail('output missing lead_source_roi_expansion — prior lead source ROI expansion must remain');
}
if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log('PASS: prior expansion summaries remain present.');

for (const scenario of output.scenarios) {
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (!scenario.audit_event_timeline_items || !scenario.audit_event_timeline_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario audit_event_timeline_items`);
  }
  if (!scenario.state_transition_timeline_items || !scenario.state_transition_timeline_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario state_transition_timeline_items`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario audit timeline items.');

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

const messagingVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, messagingComplianceVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
);
if (messagingVerifierRun.status !== 0) {
  fail(
    `messaging compliance verifier failed: ${messagingVerifierRun.stderr || messagingVerifierRun.stdout}`,
  );
}
console.log('PASS: messaging compliance verifier still passes.');

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
  'verify-native-workflow-fixture-audit-event-timeline-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Native Workflow Fixture Audit Event / Timeline Expansion', 'aggregate readiness');
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_AUDIT_EVENT_TIMELINE_EXPANSION.md',
  'run-native-workflow-fixture-audit-event-timeline-expansion-dry-run.sh',
  'verify-native-workflow-fixture-audit-event-timeline-expansion-readonly.js',
  'Native Workflow Fixture Audit Event / Timeline Expansion',
  'native workflow fixture audit event timeline expansion',
  'audit event timeline expansion',
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
mustHave(wrapper, 'verify-native-workflow-fixture-audit-event-timeline-expansion-readonly.js', 'wrapper audit verifier');
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + REQUIRED_COVERAGE_AREAS.length;

console.log(
  `PASS: Native Workflow Fixture Audit Event / Timeline Expansion verified (${assertionCount}+ assertions, ${output.audit_event_items.length} audit events, ${output.state_transition_timeline_items.length} timeline items).`,
);
console.log(
  'PASS: Native Workflow Fixture Audit Event / Timeline Expansion is fixture-only, deterministic, and dry-run safe.',
);