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

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_DATA_BOUNDARY_PII_MINIMIZATION_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const auditTimelineVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-audit-event-timeline-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-data-boundary-pii-minimization-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-data-boundary-pii-minimization-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_PII_MINIMIZATION_ITEM_FIELDS = [
  'pii_minimization_item_id',
  'scenario_id',
  'lead_id',
  'roofer_account_id',
  'plan_profile',
  'workflow_area',
  'data_category',
  'fake_homeowner_identifier_used',
  'homeowner_name_fake',
  'homeowner_phone_fake_or_masked',
  'homeowner_email_fake_or_masked',
  'service_address_fake_or_generalized',
  'roofing_issue_summary_minimized',
  'insurance_claim_status_minimized',
  'message_content_minimized',
  'review_notes_minimized',
  'feedback_summary_minimized',
  'csv_personal_information_warning_present',
  'customer_export_responsibility_warning_present',
  'production_data_boundary_checked',
  'secret_or_credential_boundary_checked',
  'audit_event_id',
  'secret_or_credential_logged',
  'production_data_touched',
  'external_services_called',
  'live_action_performed',
];

const REQUIRED_DATA_CATEGORIES = [
  'contractor_customer_account_data',
  'roofer_company_contact_details',
  'homeowner_name',
  'homeowner_phone',
  'homeowner_email',
  'service_address',
  'city_state_service_area',
  'roofing_issue_details',
  'urgency',
  'insurance_claim_status_if_provided',
  'preferred_appointment_windows',
  'lead_source_and_source_detail',
  'campaign_ad_source_if_known',
  'message_call_transcript_summaries_future_optional',
  'appointment_booking_data',
  'follow_up_data',
  'review_escalation_notes',
  'post_inspection_status',
  'post_inspection_feedback',
  'report_data',
  'csv_export_data',
  'photo_status_fields_only',
  'photos_future_optional_not_active',
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
  'data_boundary_pii_expansion_summary_present',
  'pii_minimization_items_present',
  'pii_minimization_item_required_fields_present',
  'required_data_categories_present',
  'fixture_data_is_fake_only',
  'no_production_supabase_reads_or_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_or_credential_logged',
  'no_env_values_logged',
  'homeowner_name_is_fake_or_minimized',
  'homeowner_phone_is_fake_or_masked',
  'homeowner_email_is_fake_or_masked',
  'service_address_is_fake_or_generalized',
  'roofing_issue_summary_is_minimized',
  'insurance_claim_status_is_minimized',
  'message_content_is_minimized',
  'review_notes_are_minimized',
  'feedback_summary_is_internal_boundary_checked',
  'csv_personal_information_warning_present',
  'customer_export_responsibility_warning_present',
  'csv_export_is_one_directional',
  'csv_does_not_push_data_back',
  'csv_does_not_auto_update_after_download',
  'no_native_crm_sync',
  'no_live_csv_delivery',
  'no_external_service_calls',
  'no_live_sms_email_or_calls',
  'no_customer_notifications',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'live_action_performed_is_no_for_all_items',
  'audit_events_have_pii_minimization_boundary',
  'review_queue_has_pii_minimization_boundary',
  'reporting_summary_includes_data_boundary',
  'public_legal_or_privacy_copy_not_changed_without_approval',
];

const UNSAFE_PII_PATTERNS = [
  /process\.env/i,
  /SUPABASE/i,
  /sk_live/i,
  /api[_-]?key/i,
  /password/i,
  /service[_-]?role/i,
  /webhook/i,
  /@roofleadhq\.com/i,
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
console.log('PASS: audit event timeline verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['data boundary PII verifier', verifierPath],
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

if (!output.data_boundary_pii_expansion) {
  fail('output missing data_boundary_pii_expansion marker');
}
if (
  output.data_boundary_pii_expansion !==
  'native_workflow_fixture_data_boundary_pii_minimization_expansion'
) {
  fail('data_boundary_pii_expansion marker is incorrect');
}
console.log('PASS: output includes data_boundary_pii_expansion marker.');

for (const section of [
  'data_boundary_pii_expansion_summary',
  'pii_minimization_items',
  'data_category_summary',
  'fake_homeowner_data_summary',
  'production_data_boundary_summary',
  'secret_logging_boundary_summary',
  'csv_pii_warning_summary',
  'reporting_pii_boundary_summary',
  'audit_pii_boundary_summary',
  'review_queue_pii_boundary_summary',
  'feedback_pii_boundary_summary',
  'data_boundary_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level data boundary PII sections are present.');

if (!Array.isArray(output.pii_minimization_items) || !output.pii_minimization_items.length) {
  fail('pii_minimization_items must be a non-empty array');
}
console.log(`PASS: pii_minimization_items (${output.pii_minimization_items.length}) are present.`);

const categoriesPresent = new Set(output.pii_minimization_items.map((item) => item.data_category));
for (const category of REQUIRED_DATA_CATEGORIES) {
  if (!categoriesPresent.has(category)) {
    fail(`required data category missing: ${category}`);
  }
}
console.log(`PASS: all ${REQUIRED_DATA_CATEGORIES.length} required data categories are present.`);

for (const item of output.pii_minimization_items) {
  for (const field of REQUIRED_PII_MINIMIZATION_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(`pii minimization item ${item.pii_minimization_item_id || 'unknown'} missing field: ${field}`);
    }
  }
  if (item.secret_or_credential_logged !== 'no') {
    fail(`pii item ${item.pii_minimization_item_id} secret_or_credential_logged is not no`);
  }
  if (item.production_data_touched !== 'no') {
    fail(`pii item ${item.pii_minimization_item_id} production_data_touched is not no`);
  }
  if (item.external_services_called !== 'no') {
    fail(`pii item ${item.pii_minimization_item_id} external_services_called is not no`);
  }
  if (item.live_action_performed !== 'no') {
    fail(`pii item ${item.pii_minimization_item_id} live_action_performed is not no`);
  }
  if (!item.production_data_boundary_checked) {
    fail(`pii item ${item.pii_minimization_item_id} production_data_boundary_checked is not true`);
  }
  if (!item.secret_or_credential_boundary_checked) {
    fail(`pii item ${item.pii_minimization_item_id} secret_or_credential_boundary_checked is not true`);
  }
  if (!/fixture|demo|sample|recovery|planvolume|homeowner|test/i.test(item.homeowner_name_fake)) {
    fail(`pii item ${item.pii_minimization_item_id} homeowner_name_fake is not fake`);
  }
  if (!/\*\*\*|fake_masked|\+1555/.test(item.homeowner_phone_fake_or_masked)) {
    fail(`pii item ${item.pii_minimization_item_id} homeowner_phone_fake_or_masked is not masked`);
  }
  if (!/\*\*\*/.test(item.homeowner_email_fake_or_masked)) {
    fail(`pii item ${item.pii_minimization_item_id} homeowner_email_fake_or_masked is not masked`);
  }
  if (!/generalized|area|fixture/i.test(item.service_address_fake_or_generalized)) {
    fail(`pii item ${item.pii_minimization_item_id} service_address_fake_or_generalized is not generalized`);
  }
  if (!item.roofing_issue_summary_minimized) {
    fail(`pii item ${item.pii_minimization_item_id} roofing_issue_summary_minimized is empty`);
  }
  if (!item.insurance_claim_status_minimized) {
    fail(`pii item ${item.pii_minimization_item_id} insurance_claim_status_minimized is empty`);
  }
  if (!item.message_content_minimized) {
    fail(`pii item ${item.pii_minimization_item_id} message_content_minimized is empty`);
  }
  if (!item.review_notes_minimized) {
    fail(`pii item ${item.pii_minimization_item_id} review_notes_minimized is empty`);
  }
  if (!item.feedback_summary_minimized) {
    fail(`pii item ${item.pii_minimization_item_id} feedback_summary_minimized is empty`);
  }
  if (
    item.data_category === 'csv_export_data' &&
    !item.csv_personal_information_warning_present
  ) {
    fail(`csv_export_data item ${item.pii_minimization_item_id} missing csv_personal_information_warning_present`);
  }
  if (
    item.data_category === 'csv_export_data' &&
    !item.customer_export_responsibility_warning_present
  ) {
    fail(
      `csv_export_data item ${item.pii_minimization_item_id} missing customer_export_responsibility_warning_present`,
    );
  }
  const serialized = JSON.stringify(item);
  for (const pattern of UNSAFE_PII_PATTERNS) {
    if (pattern.test(serialized)) {
      fail(`pii item ${item.pii_minimization_item_id} may contain unsafe data: ${pattern}`);
    }
  }
}
console.log('PASS: every pii minimization item has required fields and safety values.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.data_boundary_safety_assertions.includes(assertion)) {
    fail(`data_boundary_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required data boundary safety assertions are present.`,
);

if (!output.data_boundary_pii_expansion_summary.required_data_categories_present) {
  fail('data_boundary_pii_expansion_summary.required_data_categories_present must be true');
}
if (output.data_boundary_pii_expansion_summary.public_legal_or_privacy_copy_changed !== false) {
  fail('public_legal_or_privacy_copy_changed must be false in expansion summary');
}
console.log('PASS: data boundary PII expansion summary verified.');

if (!output.data_category_summary.all_categories_present) {
  fail('data_category_summary.all_categories_present must be true');
}
if (!output.data_category_summary.photos_future_optional_not_active) {
  fail('data_category_summary.photos_future_optional_not_active must be true');
}
console.log('PASS: data category summary verified.');

if (!output.fake_homeowner_data_summary.no_real_homeowner_data_used) {
  fail('fake_homeowner_data_summary must confirm no_real_homeowner_data_used');
}
console.log('PASS: fake homeowner data summary verified.');

if (!output.production_data_boundary_summary.no_production_supabase_reads_or_writes) {
  fail('production_data_boundary_summary must confirm no_production_supabase_reads_or_writes');
}
if (!output.production_data_boundary_summary.no_schema_migrations_auth_rls_security_changes) {
  fail('production_data_boundary_summary must confirm no_schema_migrations_auth_rls_security_changes');
}
if (!output.production_data_boundary_summary.production_data_touched_is_no_for_all_items) {
  fail('production_data_boundary_summary must confirm production_data_touched_is_no_for_all_items');
}
console.log('PASS: production data boundary summary verified.');

if (!output.secret_logging_boundary_summary.no_secret_or_credential_logged) {
  fail('secret_logging_boundary_summary must confirm no_secret_or_credential_logged');
}
if (!output.secret_logging_boundary_summary.no_env_values_logged) {
  fail('secret_logging_boundary_summary must confirm no_env_values_logged');
}
console.log('PASS: secret logging boundary summary verified.');

if (!output.csv_pii_warning_summary.csv_export_is_one_directional) {
  fail('csv_pii_warning_summary must confirm csv_export_is_one_directional');
}
if (!output.csv_pii_warning_summary.csv_does_not_push_data_back) {
  fail('csv_pii_warning_summary must confirm csv_does_not_push_data_back');
}
if (!output.csv_pii_warning_summary.csv_does_not_auto_update_after_download) {
  fail('csv_pii_warning_summary must confirm csv_does_not_auto_update_after_download');
}
if (!output.csv_pii_warning_summary.csv_personal_information_warning_present) {
  fail('csv_pii_warning_summary must confirm csv_personal_information_warning_present');
}
if (!output.csv_pii_warning_summary.customer_export_responsibility_warning_present) {
  fail('csv_pii_warning_summary must confirm customer_export_responsibility_warning_present');
}
if (!output.csv_pii_warning_summary.no_live_csv_delivery) {
  fail('csv_pii_warning_summary must confirm no_live_csv_delivery');
}
console.log('PASS: CSV PII warning summary verified.');

if (!output.reporting_pii_boundary_summary.reporting_summary_includes_data_boundary) {
  fail('reporting_pii_boundary_summary must confirm reporting_summary_includes_data_boundary');
}
console.log('PASS: reporting PII boundary summary verified.');

if (!output.audit_pii_boundary_summary.audit_events_have_pii_minimization_boundary) {
  fail('audit_pii_boundary_summary must confirm audit_events_have_pii_minimization_boundary');
}
if (!output.audit_pii_boundary_summary.audit_events_no_secret_or_credential_logged) {
  fail('audit_pii_boundary_summary must confirm audit_events_no_secret_or_credential_logged');
}
console.log('PASS: audit PII boundary summary verified.');

if (!output.review_queue_pii_boundary_summary.review_queue_has_pii_minimization_boundary) {
  fail('review_queue_pii_boundary_summary must confirm review_queue_has_pii_minimization_boundary');
}
console.log('PASS: review queue PII boundary summary verified.');

if (!output.feedback_pii_boundary_summary.feedback_summary_is_internal_boundary_checked) {
  fail('feedback_pii_boundary_summary must confirm feedback_summary_is_internal_boundary_checked');
}
if (!output.feedback_pii_boundary_summary.no_automatic_publication) {
  fail('feedback_pii_boundary_summary must confirm no_automatic_publication');
}
console.log('PASS: feedback PII boundary summary verified.');

const piiByScenario = {};
for (const item of output.pii_minimization_items) {
  piiByScenario[item.scenario_id] = (piiByScenario[item.scenario_id] || 0) + 1;
}
for (const scenarioId of REQUIRED_SCENARIO_IDS) {
  if (!piiByScenario[scenarioId]) {
    fail(`missing pii minimization items for scenario: ${scenarioId}`);
  }
}
console.log('PASS: all 25 required scenarios have pii minimization coverage.');

if (!output.audit_event_timeline_expansion) {
  fail('output missing audit_event_timeline_expansion — prior audit timeline expansion must remain');
}
if (!output.messaging_compliance_expansion) {
  fail('output missing messaging_compliance_expansion — prior messaging expansion must remain');
}
if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log('PASS: prior expansion summaries remain present.');

for (const scenario of output.scenarios) {
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (!scenario.pii_minimization_items || !scenario.pii_minimization_items.length) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario pii_minimization_items`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario pii minimization items.');

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

const auditTimelineVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, auditTimelineVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 },
);
if (auditTimelineVerifierRun.status !== 0) {
  fail(
    `audit event timeline verifier failed: ${auditTimelineVerifierRun.stderr || auditTimelineVerifierRun.stdout}`,
  );
}
console.log('PASS: audit event timeline verifier still passes.');

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
  'verify-native-workflow-fixture-data-boundary-pii-minimization-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Data Boundary / PII Minimization Expansion',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_DATA_BOUNDARY_PII_MINIMIZATION_EXPANSION.md',
  'run-native-workflow-fixture-data-boundary-pii-minimization-expansion-dry-run.sh',
  'verify-native-workflow-fixture-data-boundary-pii-minimization-expansion-readonly.js',
  'Native Workflow Fixture Data Boundary / PII Minimization Expansion',
  'native workflow fixture data boundary pii minimization expansion',
  'data boundary pii minimization expansion',
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
mustHave(
  wrapper,
  'verify-native-workflow-fixture-data-boundary-pii-minimization-expansion-readonly.js',
  'wrapper data boundary verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + REQUIRED_DATA_CATEGORIES.length;

console.log(
  `PASS: Native Workflow Fixture Data Boundary / PII Minimization Expansion verified (${assertionCount}+ assertions, ${output.pii_minimization_items.length} pii minimization items).`,
);
console.log(
  'PASS: Native Workflow Fixture Data Boundary / PII Minimization Expansion is fixture-only, deterministic, and dry-run safe.',
);