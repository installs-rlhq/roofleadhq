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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_E2E_ACCEPTANCE_REHEARSAL_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const handoffVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_ACCEPTANCE_ITEM_FIELDS = [
  'e2e_acceptance_item_id',
  'scenario_id',
  'lead_id',
  'roofer_account_id',
  'plan_profile',
  'starting_state',
  'final_state',
  'lead_source',
  'contact_permission_status',
  'homeowner_contact_ready',
  'follow_up_state',
  'missed_lead_recovery_status',
  'manual_outreach_needed',
  'appointment_readiness_status',
  'appointment_booked',
  'inspection_status',
  'post_inspection_status',
  'feedback_status',
  'permission_to_use_publicly',
  'report_snapshot_ready',
  'csv_snapshot_ready',
  'usage_volume_status',
  'source_roi_boundary_status',
  'review_queue_status',
  'review_age_bucket',
  'manual_to_native_handoff_ready',
  'audit_event_count',
  'guard_assertion_count',
  'safety_assertion_count',
  'required_manual_next_step',
  'next_step_owner',
  'roofer_review_required',
  'roofleadhq_review_required',
  'business_judgment_required',
  'system_quality_issue',
  'data_boundary_checked',
  'pii_minimization_checked',
  'live_activation_flags_all_false',
  'live_action_allowed',
  'notification_sent',
  'production_data_touched',
  'external_services_called',
  'result',
];

const REQUIRED_ACCEPTANCE_PATHS = [
  'normal_lead_to_appointment_readiness',
  'missing_information_path',
  'duplicate_review_path',
  'bad_fit_excluded_path',
  'stopped_do_not_contact_path',
  'missed_lead_recovery_path',
  'manual_outreach_path',
  'roofer_review_path',
  'roofleadhq_system_quality_review_path',
  'appointment_booked_tracking_path',
  'inspection_completed_path',
  'inspection_missed_reschedule_path',
  'post_inspection_still_open_path',
  'estimate_needed_estimate_sent_tracking_path',
  'homeowner_follow_up_needed_path',
  'roofer_follow_up_needed_path',
  'feedback_permission_yes_path',
  'feedback_permission_no_path',
  'feedback_permission_not_asked_path',
  'csv_reporting_snapshot_path',
  'starter_plan_profile_path',
  'growth_plan_profile_path',
  'elite_plan_profile_path',
  'custom_review_500_plus_leads_path',
  'custom_review_two_plus_locations_path',
  'usage_volume_plan_limit_path',
  'lead_source_roi_boundary_path',
  'messaging_compliance_contact_permission_path',
  'audit_timeline_path',
  'data_boundary_pii_minimization_path',
  'review_aging_sla_boundary_path',
  'manual_to_native_handoff_rehearsal_path',
  'activation_flag_false_blocks_live_action_path',
];

const REQUIRED_SAFETY_ASSERTIONS = [
  'e2e_acceptance_rehearsal_expansion_summary_present',
  'e2e_acceptance_rehearsal_items_present',
  'e2e_acceptance_item_required_fields_present',
  'all_required_acceptance_paths_present',
  'lead_to_inspection_acceptance_summary_present',
  'missed_lead_recovery_acceptance_summary_present',
  'manual_outreach_acceptance_summary_present',
  'appointment_readiness_acceptance_summary_present',
  'review_queue_acceptance_summary_present',
  'post_inspection_acceptance_summary_present',
  'feedback_permission_acceptance_summary_present',
  'reporting_csv_acceptance_summary_present',
  'usage_volume_acceptance_summary_present',
  'source_roi_acceptance_summary_present',
  'audit_timeline_acceptance_summary_present',
  'data_boundary_acceptance_summary_present',
  'review_aging_acceptance_summary_present',
  'manual_to_native_handoff_acceptance_summary_present',
  'live_activation_boundary_summary_present',
  'every_acceptance_item_has_audit_events',
  'every_acceptance_item_has_guard_assertions',
  'every_acceptance_item_has_safety_assertions',
  'live_activation_flags_all_false_for_all_items',
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
  'no_estimate_quote_invoice_payment_generation',
  'roofer_review_owns_business_judgment_acceptance_items',
  'roofleadhq_review_limited_to_system_quality_acceptance_items',
  'feedback_permission_values_are_yes_no_not_asked',
  'feedback_not_published',
  'csv_acceptance_is_one_directional',
  'usage_volume_does_not_trigger_live_billing',
  'source_roi_does_not_promise_exact_roi',
  'manual_to_native_handoff_does_not_create_database_records',
  'e2e_acceptance_rehearsal_is_fake_data_only',
  'e2e_acceptance_rehearsal_is_deterministic',
  'reporting_summary_includes_e2e_acceptance',
  'public_go_live_or_production_copy_not_changed_without_approval',
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
console.log('PASS: manual-to-native handoff verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['e2e acceptance verifier', verifierPath],
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

if (!output.e2e_acceptance_rehearsal_expansion) {
  fail('output missing e2e_acceptance_rehearsal_expansion marker');
}
if (
  output.e2e_acceptance_rehearsal_expansion !==
  'native_workflow_fixture_e2e_acceptance_rehearsal_expansion'
) {
  fail('e2e_acceptance_rehearsal_expansion marker is incorrect');
}
console.log('PASS: output includes e2e_acceptance_rehearsal_expansion marker.');

for (const section of [
  'e2e_acceptance_rehearsal_expansion_summary',
  'e2e_acceptance_rehearsal_items',
  'lead_to_inspection_acceptance_summary',
  'missed_lead_recovery_acceptance_summary',
  'manual_outreach_acceptance_summary',
  'appointment_readiness_acceptance_summary',
  'review_queue_acceptance_summary',
  'post_inspection_acceptance_summary',
  'feedback_permission_acceptance_summary',
  'reporting_csv_acceptance_summary',
  'usage_volume_acceptance_summary',
  'source_roi_acceptance_summary',
  'audit_timeline_acceptance_summary',
  'data_boundary_acceptance_summary',
  'review_aging_acceptance_summary',
  'manual_to_native_handoff_acceptance_summary',
  'live_activation_boundary_summary',
  'e2e_acceptance_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level e2e acceptance sections are present.');

if (!Array.isArray(output.e2e_acceptance_rehearsal_items) || !output.e2e_acceptance_rehearsal_items.length) {
  fail('e2e_acceptance_rehearsal_items must be a non-empty array');
}
console.log(
  `PASS: e2e_acceptance_rehearsal_items (${output.e2e_acceptance_rehearsal_items.length}) are present.`,
);

const acceptancePathIds = new Set(
  output.e2e_acceptance_rehearsal_items.map((item) => item.acceptance_path_id || item.scenario_id),
);
for (const pathId of REQUIRED_ACCEPTANCE_PATHS) {
  const found = output.e2e_acceptance_rehearsal_items.some(
    (item) =>
      item.acceptance_path_id === pathId ||
      (item.scenario_id === pathId && !item.acceptance_path_id),
  );
  if (!found && !acceptancePathIds.has(pathId)) {
    fail(`required acceptance path missing: ${pathId}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_ACCEPTANCE_PATHS.length} required acceptance paths are present.`,
);

for (const item of output.e2e_acceptance_rehearsal_items) {
  for (const field of REQUIRED_ACCEPTANCE_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `e2e acceptance item ${item.e2e_acceptance_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  for (const safetyField of [
    'live_action_allowed',
    'notification_sent',
    'production_data_touched',
    'external_services_called',
  ]) {
    if (item[safetyField] !== 'no') {
      fail(`acceptance item ${item.e2e_acceptance_item_id} ${safetyField} is not no`);
    }
  }
  if (item.live_activation_flags_all_false !== true) {
    fail(`acceptance item ${item.e2e_acceptance_item_id} live_activation_flags_all_false is not true`);
  }
  if (item.audit_event_count <= 0) {
    fail(`acceptance item ${item.e2e_acceptance_item_id} missing audit events`);
  }
  if (item.guard_assertion_count <= 0) {
    fail(`acceptance item ${item.e2e_acceptance_item_id} missing guard assertions`);
  }
  if (item.safety_assertion_count <= 0) {
    fail(`acceptance item ${item.e2e_acceptance_item_id} missing safety assertions`);
  }
  if (!item.next_step_owner) {
    fail(`acceptance item ${item.e2e_acceptance_item_id} missing next_step_owner`);
  }
  if (!['yes', 'no', 'not_asked'].includes(item.permission_to_use_publicly)) {
    fail(
      `acceptance item ${item.e2e_acceptance_item_id} has invalid permission_to_use_publicly`,
    );
  }
  if (item.business_judgment_required && item.system_quality_issue) {
    fail(
      `acceptance item ${item.e2e_acceptance_item_id} cannot be both business_judgment and system_quality`,
    );
  }
  if (item.business_judgment_required && item.roofer_review_required !== true) {
    fail(
      `business judgment acceptance item ${item.e2e_acceptance_item_id} must require roofer review`,
    );
  }
  if (item.system_quality_issue && item.roofleadhq_review_required !== true) {
    fail(
      `system quality acceptance item ${item.e2e_acceptance_item_id} must require roofleadhq review`,
    );
  }
}
console.log('PASS: every e2e acceptance item has required fields and safety values.');

if (!output.e2e_acceptance_rehearsal_expansion_summary.all_required_acceptance_paths_present) {
  fail('e2e_acceptance_rehearsal_expansion_summary.all_required_acceptance_paths_present must be true');
}
if (output.e2e_acceptance_rehearsal_expansion_summary.total_acceptance_items !== REQUIRED_ACCEPTANCE_PATHS.length) {
  fail(
    `expected ${REQUIRED_ACCEPTANCE_PATHS.length} acceptance items, found ${output.e2e_acceptance_rehearsal_expansion_summary.total_acceptance_items}`,
  );
}
console.log('PASS: e2e acceptance expansion summary verified.');

if (!output.review_queue_acceptance_summary.roofer_review_owns_business_judgment_acceptance_items) {
  fail('review_queue_acceptance_summary.roofer_review_owns_business_judgment_acceptance_items must be true');
}
if (!output.review_queue_acceptance_summary.roofleadhq_review_limited_to_system_quality_acceptance_items) {
  fail(
    'review_queue_acceptance_summary.roofleadhq_review_limited_to_system_quality_acceptance_items must be true',
  );
}
console.log('PASS: review queue acceptance summary verified.');

if (!output.feedback_permission_acceptance_summary.feedback_permission_values_are_yes_no_not_asked) {
  fail(
    'feedback_permission_acceptance_summary.feedback_permission_values_are_yes_no_not_asked must be true',
  );
}
if (!output.feedback_permission_acceptance_summary.feedback_not_published) {
  fail('feedback_permission_acceptance_summary.feedback_not_published must be true');
}
console.log('PASS: feedback permission acceptance summary verified.');

if (!output.reporting_csv_acceptance_summary.reporting_summary_includes_e2e_acceptance) {
  fail('reporting_csv_acceptance_summary.reporting_summary_includes_e2e_acceptance must be true');
}
if (!output.reporting_csv_acceptance_summary.csv_acceptance_is_one_directional) {
  fail('reporting_csv_acceptance_summary.csv_acceptance_is_one_directional must be true');
}
console.log('PASS: reporting CSV acceptance summary verified.');

if (!output.usage_volume_acceptance_summary.usage_volume_does_not_trigger_live_billing) {
  fail('usage_volume_acceptance_summary.usage_volume_does_not_trigger_live_billing must be true');
}
if (!output.source_roi_acceptance_summary.source_roi_does_not_promise_exact_roi) {
  fail('source_roi_acceptance_summary.source_roi_does_not_promise_exact_roi must be true');
}
if (!output.manual_to_native_handoff_acceptance_summary.manual_to_native_handoff_does_not_create_database_records) {
  fail(
    'manual_to_native_handoff_acceptance_summary.manual_to_native_handoff_does_not_create_database_records must be true',
  );
}
if (!output.audit_timeline_acceptance_summary.every_acceptance_item_has_audit_events) {
  fail('audit_timeline_acceptance_summary.every_acceptance_item_has_audit_events must be true');
}
if (!output.live_activation_boundary_summary.live_activation_flags_all_false_for_all_items) {
  fail('live_activation_boundary_summary.live_activation_flags_all_false_for_all_items must be true');
}
if (!output.live_activation_boundary_summary.live_action_allowed_is_no_for_all_items) {
  fail('live_activation_boundary_summary.live_action_allowed_is_no_for_all_items must be true');
}
console.log('PASS: domain acceptance summaries verified.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.e2e_acceptance_safety_assertions.includes(assertion)) {
    fail(`e2e_acceptance_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required e2e acceptance safety assertions are present.`,
);

if (
  output.e2e_acceptance_rehearsal_expansion_summary.public_go_live_or_production_copy_changed !==
  false
) {
  fail('public_go_live_or_production_copy_changed must be false in expansion summary');
}
console.log('PASS: public copy unchanged guard verified.');

for (const scenario of output.scenarios) {
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (!scenario.e2e_acceptance_rehearsal_items) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario e2e_acceptance_rehearsal_items array`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario e2e acceptance items.');

if (!output.manual_to_native_handoff_rehearsal_expansion) {
  fail('output missing manual_to_native_handoff_rehearsal_expansion — prior handoff expansion must remain');
}
if (!output.review_queue_aging_sla_expansion) {
  fail('output missing review_queue_aging_sla_expansion — prior review aging expansion must remain');
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

const handoffVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, handoffVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);
if (handoffVerifierRun.status !== 0) {
  fail(
    `manual-to-native handoff verifier failed: ${handoffVerifierRun.stderr || handoffVerifierRun.stdout}`,
  );
}
console.log('PASS: manual-to-native handoff verifier still passes.');

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
  'verify-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture E2E Acceptance Rehearsal Expansion',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_E2E_ACCEPTANCE_REHEARSAL_EXPANSION.md',
  'run-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-dry-run.sh',
  'verify-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-readonly.js',
  'Native Workflow Fixture E2E Acceptance Rehearsal Expansion',
  'native workflow fixture e2e acceptance rehearsal expansion',
  'e2e acceptance rehearsal expansion',
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
  'verify-native-workflow-fixture-manual-to-native-handoff-rehearsal-expansion-readonly.js',
  'wrapper handoff verifier',
);
mustHave(
  wrapper,
  'verify-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-readonly.js',
  'wrapper e2e acceptance verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + REQUIRED_ACCEPTANCE_PATHS.length;

console.log(
  `PASS: Native Workflow Fixture E2E Acceptance Rehearsal Expansion verified (${assertionCount}+ assertions, ${output.e2e_acceptance_rehearsal_items.length} e2e acceptance items).`,
);
console.log(
  'PASS: Native Workflow Fixture E2E Acceptance Rehearsal Expansion is fixture-only, deterministic, and dry-run safe.',
);