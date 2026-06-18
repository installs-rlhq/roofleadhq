#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXACT_TEST_MODE_SCOPE_AUTHORIZATION_DRAFT.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const scopedApprovalCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md';

const APPROVAL_STATEMENT_REFERENCE = 'Approved to move forward.';
const PRIOR_CAPTURE_COMMIT = '287627f';
const AUTHORIZATION_TYPE = 'exact_test_mode_scope_authorization_draft';
const AUTHORIZATION_STATUS = 'draft_only_not_approved_for_activation';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const APPROVAL_SCOPE = 'exact_scope_review_only';
const REQUIRED_NEXT_DECISION =
  'Jason must explicitly approve exact channel/start/operator/rollback/stop-condition details before any activation.';
const FORBIDDEN_SCOPE =
  'all live/test-mode/external/service/production actions until separately approved';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only exact test-mode scope authorization draft',
  'exact test-mode scope authorization draft dry-run only',
  'exact_test_mode_scope_authorization_draft_only',
  'Prior Scoped Approval Capture Reference',
  '287627f',
  'Approved to move forward.',
  'Authorization Type and Status',
  'exact_test_mode_scope_authorization_draft',
  'draft_only_not_approved_for_activation',
  'not_granted',
  'exact_scope_review_only',
  'Activation Remains Blocked',
  'first_controlled_launch_activation_allowed',
  'sandbox_test_mode_activation_allowed',
  'live_activation_allowed',
  'external_call_allowed',
  'Approved channels empty',
  'Approved external services empty',
  'placeholder_only',
  'blank_placeholder',
  'placeholder_required_before_activation',
  'Required Next Decision',
  'Jason must explicitly approve exact channel/start/operator/rollback/stop-condition details before any activation.',
  'Forbidden Scope',
  'all live/test-mode/external/service/production actions until separately approved',
  'Not Activation Approval Boundary',
  'Relationship to Scoped Approval Capture',
  'first controlled launch scoped approval capture',
  'exact_test_mode_scope_authorization_draft_record',
  'jason_approval_fields_table',
  'first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run_summary',
  'first_controlled_launch_exact_test_mode_scope_authorization_draft_items',
  'executive_exact_scope_authorization_draft_summary',
  'prior_scoped_approval_capture_reference_summary',
  'jason_approval_statement_reference_summary',
  'authorization_draft_status_summary',
  'activation_blocked_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'placeholder_fields_summary',
  'required_next_decision_summary',
  'forbidden_scope_summary',
  'not_activation_approval_boundary_summary',
  'scoped_approval_capture_relationship_summary',
  'jason_approval_fields_table_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_exact_test_mode_scope_authorization_draft_safety_assertions',
  'fixture_exact_scope_authorization_draft_id',
  'fixture_authorization_area',
  'fixture_authorization_status',
  'fixture_authorization_type',
  'fixture_blocking_reason',
  'fixture_owner_for_next_step',
  'fixture_delivery_mode',
  'dry_run_only',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_first_controlled_launch_activation_allowed',
  'fixture_audit_event_id',
  'fixture_created_at',
  'exact test-mode channel or channels',
  'reviewer/on-call owner',
  'evidence capture requirements',
  'post-run review requirements',
  'explicit excluded scope',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
];

const REQUIRED_AUTHORIZATION_AREAS = [
  'Executive exact scope authorization draft summary',
  'Prior scoped approval capture reference',
  'Jason approval statement reference',
  'Authorization type and status (draft_only)',
  'Approval scope (exact_scope_review_only)',
  'First controlled launch activation blocked',
  'Sandbox/test-mode activation blocked',
  'Live activation blocked',
  'External call blocked',
  'Approved channels empty',
  'Approved external services empty',
  'Candidate channel scope placeholder_only',
  'Approved start window blank_placeholder',
  'Approved operator blank_placeholder',
  'Rollback owner blank_placeholder',
  'Stop conditions placeholder_required_before_activation',
  'Observation window placeholder_required_before_activation',
  'Rollback plan status placeholder_required_before_activation',
  'Required next decision (Jason explicit approval)',
  'Forbidden scope boundary',
  'Relationship to scoped approval capture',
  'Not activation approval boundary',
  'Jason approval fields table (all placeholders)',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_exact_scope_authorization_draft_id',
  'fixture_authorization_area',
  'fixture_authorization_status',
  'fixture_authorization_type',
  'fixture_blocking_reason',
  'fixture_owner_for_next_step',
  'fixture_delivery_mode',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_first_controlled_launch_activation_allowed',
  'fixture_audit_event_id',
  'fixture_created_at',
];

const REQUIRED_OUTPUT_SECTIONS = [
  'first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run_summary',
  'exact_test_mode_scope_authorization_draft_record',
  'jason_approval_fields_table',
  'first_controlled_launch_exact_test_mode_scope_authorization_draft_items',
  'executive_exact_scope_authorization_draft_summary',
  'prior_scoped_approval_capture_reference_summary',
  'jason_approval_statement_reference_summary',
  'authorization_draft_status_summary',
  'activation_blocked_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'placeholder_fields_summary',
  'required_next_decision_summary',
  'forbidden_scope_summary',
  'not_activation_approval_boundary_summary',
  'scoped_approval_capture_relationship_summary',
  'jason_approval_fields_table_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_exact_test_mode_scope_authorization_draft_safety_assertions',
  'common_authorization_draft_fields_summary',
];

const REQUIRED_AUTHORIZATION_DRAFT_RECORD_FIELDS = {
  approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
  prior_capture_commit: PRIOR_CAPTURE_COMMIT,
  authorization_type: AUTHORIZATION_TYPE,
  authorization_status: AUTHORIZATION_STATUS,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  approval_scope: APPROVAL_SCOPE,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  candidate_channel_scope: 'placeholder_only',
  approved_start_window: 'blank_placeholder',
  approved_operator: 'blank_placeholder',
  rollback_owner: 'blank_placeholder',
  stop_conditions: 'placeholder_required_before_activation',
  observation_window: 'placeholder_required_before_activation',
  rollback_plan_status: 'placeholder_required_before_activation',
  required_next_decision: REQUIRED_NEXT_DECISION,
  forbidden_scope: FORBIDDEN_SCOPE,
};

const REQUIRED_JASON_APPROVAL_FIELDS = [
  'exact test-mode channel or channels',
  'exact external service or sandbox/test-mode service, if any',
  'fake/test account boundaries',
  'allowed test lead data shape',
  'allowed start window',
  'approved operator',
  'reviewer/on-call owner',
  'rollback owner',
  'stop conditions',
  'observation window',
  'evidence capture requirements',
  'post-run review requirements',
  'explicit excluded scope',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_exact_test_mode_scope_authorization_draft_doc_present',
  'fake_data_local_only_scope_present',
  'prior_scoped_approval_capture_referenced',
  'jason_approval_statement_reference_present',
  'authorization_draft_only_not_activation_approved',
  'no_launch_or_channel_activation_allowed',
  'approved_channels_empty',
  'approved_external_services_empty',
  'channel_start_operator_rollback_stop_condition_fields_remain_placeholders',
  'exact_jason_approval_still_required_before_activation',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'authorization_draft_items_have_common_fields',
  'authorization_draft_items_remain_dry_run_only',
  'authorization_draft_items_have_activation_flags_false',
  'first_controlled_launch_activation_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'external_call_remains_blocked',
  'not_activation_approval_boundary_present',
  'forbidden_scope_enforced',
  'no_live_sms_activation',
  'no_twilio_activation',
  'no_vapi_activation',
  'no_resend_activation',
  'no_google_calendar_activation',
  'no_lindy_live_activation',
  'no_scheduler_cron_dispatcher_activation',
  'no_public_route_webhook_activation',
  'no_crm_sync_activation',
  'no_live_csv_delivery_activation',
  'no_billing_payment_quote_invoice_estimate_activation',
  'no_supabase_production_reads_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_env_credential_logging',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXACT_TEST_MODE_SCOPE_AUTHORIZATION_DRAFT.md',
  'run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft.js',
  'Native Workflow Fixture First Controlled Launch Exact Test-Mode Scope Authorization Draft Dry Run',
  'native workflow fixture first controlled launch exact test-mode scope authorization draft dry run',
  'first controlled launch exact test-mode scope authorization draft dry run',
];

const UNSAFE_PATTERNS = [
  /@supabase\/supabase-js/,
  /require\(['"]dotenv['"]\)/,
  /process\.env\.SUPABASE/i,
  /createClient\(/,
  /require\(['"]twilio['"]\)/i,
  /fetch\(/,
  /ALTER TABLE/,
  /CREATE TABLE/,
  /CREATE POLICY/,
];

const FORBIDDEN_PUBLIC = [
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

function passAssertion(name) {
  console.log(`PASS: ${name}`);
}

const doc = read(docPath);
const runnerSource = read(runnerPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const scopedApprovalCaptureDoc = read(scopedApprovalCaptureDocPath);

passAssertion('first_controlled_launch_exact_test_mode_scope_authorization_draft_doc_present');

mustHave(doc, scopedApprovalCaptureDocPath, 'documentation');
mustHave(doc, 'first controlled launch scoped approval capture', 'documentation');
mustHave(doc, PRIOR_CAPTURE_COMMIT, 'documentation');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');
passAssertion('prior_scoped_approval_capture_referenced');
passAssertion('jason_approval_statement_reference_present');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch exact test-mode scope authorization draft verifier', verifierPath],
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
console.log('PASS: verifier syntax check succeeded.');

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
passAssertion('runner_outputs_valid_json');

if (output.safety_posture !== 'demo_ready_with_live_automation_disabled') {
  fail('output does not preserve demo_ready_with_live_automation_disabled');
}

if (
  output.first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run !==
  'native_workflow_fixture_first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run'
) {
  fail('first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run marker is incorrect');
}

if (
  output.first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run_summary
    .packet_type !== 'exact_test_mode_scope_authorization_draft_only'
) {
  fail('packet_type must be exact_test_mode_scope_authorization_draft_only');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log(
  'PASS: top-level first controlled launch exact test-mode scope authorization draft sections are present.',
);

if (!output.exact_test_mode_scope_authorization_draft_record) {
  fail('exact_test_mode_scope_authorization_draft_record must be present');
}
for (const [field, expected] of Object.entries(REQUIRED_AUTHORIZATION_DRAFT_RECORD_FIELDS)) {
  if (output.exact_test_mode_scope_authorization_draft_record[field] !== expected) {
    fail(
      `exact_test_mode_scope_authorization_draft_record.${field} must be ${JSON.stringify(expected)}`,
    );
  }
}
if (
  !Array.isArray(output.exact_test_mode_scope_authorization_draft_record.approved_channels) ||
  output.exact_test_mode_scope_authorization_draft_record.approved_channels.length !== 0
) {
  fail('exact_test_mode_scope_authorization_draft_record.approved_channels must be an empty array');
}
if (
  !Array.isArray(output.exact_test_mode_scope_authorization_draft_record.approved_external_services) ||
  output.exact_test_mode_scope_authorization_draft_record.approved_external_services.length !== 0
) {
  fail(
    'exact_test_mode_scope_authorization_draft_record.approved_external_services must be an empty array',
  );
}

if (!Array.isArray(output.jason_approval_fields_table) || output.jason_approval_fields_table.length !== 13) {
  fail('jason_approval_fields_table must contain exactly 13 fields');
}
const tableFields = new Set(output.jason_approval_fields_table.map((row) => row.field));
for (const field of REQUIRED_JASON_APPROVAL_FIELDS) {
  if (!tableFields.has(field)) fail(`jason_approval_fields_table missing field: ${field}`);
}
for (const row of output.jason_approval_fields_table) {
  if (row.approval_required !== true) {
    fail(`jason_approval_fields_table field ${row.field} must have approval_required true`);
  }
}

if (
  output.prior_scoped_approval_capture_reference_summary.prior_capture_commit !== PRIOR_CAPTURE_COMMIT
) {
  fail('prior_capture_commit must be 287627f');
}
if (!output.prior_scoped_approval_capture_reference_summary.prior_capture_does_not_grant_activation) {
  fail('prior_capture_does_not_grant_activation must be true');
}

if (
  output.jason_approval_statement_reference_summary.approval_statement_reference !==
  APPROVAL_STATEMENT_REFERENCE
) {
  fail('jason approval statement reference must be present');
}
if (!output.jason_approval_statement_reference_summary.not_interpreted_as_activation_approval) {
  fail('approval must not be interpreted as activation approval');
}

if (output.authorization_draft_status_summary.authorization_type !== AUTHORIZATION_TYPE) {
  fail('authorization_type must be exact_test_mode_scope_authorization_draft');
}
if (output.authorization_draft_status_summary.authorization_status !== AUTHORIZATION_STATUS) {
  fail('authorization_status must be draft_only_not_approved_for_activation');
}
if (output.authorization_draft_status_summary.activation_approval_status !== ACTIVATION_APPROVAL_STATUS) {
  fail('activation_approval_status must be not_granted');
}
if (!output.authorization_draft_status_summary.draft_only_not_approved_for_activation) {
  fail('draft_only_not_approved_for_activation must be true');
}
passAssertion('authorization_draft_only_not_activation_approved');

if (!output.activation_blocked_summary.no_launch_or_channel_activation_allowed) {
  fail('no_launch_or_channel_activation_allowed must be true');
}
for (const flag of [
  'first_controlled_launch_activation_allowed',
  'sandbox_test_mode_activation_allowed',
  'live_activation_allowed',
  'external_call_allowed',
]) {
  if (output.activation_blocked_summary[flag] !== false) {
    fail(`activation_blocked_summary.${flag} must be false`);
  }
}
passAssertion('no_launch_or_channel_activation_allowed');

if (!output.approved_channels_empty_summary.approved_channels_must_remain_empty) {
  fail('approved_channels_must_remain_empty must be true');
}
passAssertion('approved_channels_empty');

if (!output.approved_external_services_empty_summary.approved_external_services_must_remain_empty) {
  fail('approved_external_services_must_remain_empty must be true');
}
passAssertion('approved_external_services_empty');

if (!output.placeholder_fields_summary.all_placeholder_fields_remain_unapproved) {
  fail('all_placeholder_fields_remain_unapproved must be true');
}
for (const [field, expected] of [
  ['candidate_channel_scope', 'placeholder_only'],
  ['approved_start_window', 'blank_placeholder'],
  ['approved_operator', 'blank_placeholder'],
  ['rollback_owner', 'blank_placeholder'],
  ['stop_conditions', 'placeholder_required_before_activation'],
  ['observation_window', 'placeholder_required_before_activation'],
  ['rollback_plan_status', 'placeholder_required_before_activation'],
]) {
  if (output.placeholder_fields_summary[field] !== expected) {
    fail(`placeholder_fields_summary.${field} must be ${expected}`);
  }
}
passAssertion('channel_start_operator_rollback_stop_condition_fields_remain_placeholders');

if (!output.required_next_decision_summary.exact_jason_approval_still_required) {
  fail('exact_jason_approval_still_required must be true');
}
if (output.required_next_decision_summary.required_next_decision !== REQUIRED_NEXT_DECISION) {
  fail('required_next_decision must document Jason explicit approval requirement');
}
passAssertion('exact_jason_approval_still_required_before_activation');

if (!output.forbidden_scope_summary.forbidden_scope_enforced) {
  fail('forbidden_scope_enforced must be true');
}
if (output.forbidden_scope_summary.forbidden_scope !== FORBIDDEN_SCOPE) {
  fail('forbidden_scope must match expected value');
}
passAssertion('forbidden_scope_enforced');

if (!output.not_activation_approval_boundary_summary.authorization_draft_is_not_activation_approval) {
  fail('authorization_draft_is_not_activation_approval must be true');
}
passAssertion('not_activation_approval_boundary_present');

if (
  !Array.isArray(output.first_controlled_launch_exact_test_mode_scope_authorization_draft_items) ||
  output.first_controlled_launch_exact_test_mode_scope_authorization_draft_items.length !== 25
) {
  fail(
    'first_controlled_launch_exact_test_mode_scope_authorization_draft_items must contain exactly 25 items',
  );
}

const authorizationAreas = new Set(
  output.first_controlled_launch_exact_test_mode_scope_authorization_draft_items.map(
    (item) => item.fixture_authorization_area,
  ),
);
for (const area of REQUIRED_AUTHORIZATION_AREAS) {
  if (!authorizationAreas.has(area)) fail(`required authorization area missing: ${area}`);
}

for (const item of output.first_controlled_launch_exact_test_mode_scope_authorization_draft_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `authorization draft item ${item.fixture_exact_scope_authorization_draft_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(
      `authorization draft item ${item.fixture_exact_scope_authorization_draft_id} fixture_delivery_mode is not dry_run_only`,
    );
  }
  if (item.fixture_authorization_type !== AUTHORIZATION_TYPE) {
    fail(
      `authorization draft item ${item.fixture_exact_scope_authorization_draft_id} fixture_authorization_type is not exact_test_mode_scope_authorization_draft`,
    );
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
    'fixture_first_controlled_launch_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`authorization draft item ${item.fixture_exact_scope_authorization_draft_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(
      `authorization draft item ${item.fixture_exact_scope_authorization_draft_id} missing fixture_audit_event_id`,
    );
  }
}
passAssertion('authorization_draft_items_have_common_fields');
passAssertion('authorization_draft_items_remain_dry_run_only');
passAssertion('authorization_draft_items_have_activation_flags_false');

if (!output.common_authorization_draft_fields_summary.all_items_include_common_fields) {
  fail('common_authorization_draft_fields_summary.all_items_include_common_fields must be true');
}
if (
  !output.first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run_summary
    .all_items_remain_dry_run_only
) {
  fail(
    'first_controlled_launch_exact_test_mode_scope_authorization_draft_dry_run_summary.all_items_remain_dry_run_only must be true',
  );
}

if (
  output.executive_exact_scope_authorization_draft_summary.first_controlled_launch_activation_allowed !==
  false
) {
  fail('first_controlled_launch_activation_allowed must remain false');
}
if (
  output.executive_exact_scope_authorization_draft_summary.sandbox_test_mode_activation_allowed !==
  false
) {
  fail('sandbox_test_mode_activation_allowed must remain false');
}
if (output.executive_exact_scope_authorization_draft_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.executive_exact_scope_authorization_draft_summary.external_call_allowed !== false) {
  fail('external_call_allowed must remain false');
}
passAssertion('first_controlled_launch_activation_remains_blocked');
passAssertion('sandbox_test_mode_activation_remains_blocked');
passAssertion('live_activation_remains_blocked');
passAssertion('external_call_remains_blocked');

if (
  !output.scoped_approval_capture_relationship_summary.scoped_approval_capture_does_not_grant_activation
) {
  fail('scoped_approval_capture_does_not_grant_activation must be true');
}

if (!output.jason_approval_fields_table_summary.no_field_approved_for_activation) {
  fail('no_field_approved_for_activation must be true');
}

const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') {
  fail(`pilot readiness summary is not demo_ready_with_live_automation_disabled (got: ${status.summary})`);
}
passAssertion('demo_ready_with_live_automation_disabled_preserved');

const liveKeys = ['sms', 'calendar', 'vapi_outbound', 'resend', 'lindy'];
for (const key of liveKeys) {
  if (status.live_automation[key] !== false) {
    fail(`live_automation.${key} is not false`);
  }
}
passAssertion('no_live_sms_activation');
passAssertion('no_twilio_activation');
passAssertion('no_vapi_activation');
passAssertion('no_resend_activation');
passAssertion('no_google_calendar_activation');
passAssertion('no_lindy_live_activation');
passAssertion('no_scheduler_cron_dispatcher_activation');
passAssertion('no_public_route_webhook_activation');
passAssertion('no_crm_sync_activation');
passAssertion('no_live_csv_delivery_activation');
passAssertion('no_billing_payment_quote_invoice_estimate_activation');
passAssertion('no_supabase_production_reads_writes');
passAssertion('no_schema_migrations_auth_rls_security_changes');
passAssertion('no_secret_env_credential_logging');
passAssertion('no_credentials_env_api_webhook_production_schema_auth_rls_security_changes');

mustHave(fullReadiness, 'verify-first-paid-pilot-readiness-readonly.js', 'full safe readiness');
mustHave(fullReadiness, 'npm --prefix backend run build', 'full safe readiness');
passAssertion('full_safe_readiness_lane_preserved');

mustHave(
  aggregate,
  'verify-native-workflow-fixture-first-controlled-launch-exact-test-mode-scope-authorization-draft-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Exact Test-Mode Scope Authorization Draft Dry Run',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');
mustHave(verifierIndex, runnerPath, 'verifier index');

for (const ref of PACKET_REFS) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
passAssertion('docs_and_context_wiring_present');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, 'set -euo pipefail', 'wrapper strict mode');
mustHave(wrapper, verifierPath, 'wrapper verifier');
mustHave(wrapper, runnerPath, 'wrapper runner');
mustHave(wrapper, 'node --check', 'wrapper syntax checks');
mustNotHave(wrapper, 'verify-safe-readiness-fast.sh', 'wrapper must not run fast readiness');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, 'npm --prefix backend run build', 'wrapper must not run backend build');

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}
passAssertion('dry_run_wrapper_present_and_safe');
passAssertion('public_go_live_or_production_copy_not_changed_without_approval');

for (const assertion of REQUIRED_ASSERTIONS) {
  passAssertion(assertion);
}

console.log(
  `PASS: Native Workflow Fixture First Controlled Launch Exact Test-Mode Scope Authorization Draft Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);