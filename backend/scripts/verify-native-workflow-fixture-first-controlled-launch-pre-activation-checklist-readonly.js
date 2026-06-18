#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_PRE_ACTIVATION_CHECKLIST.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-pre-activation-checklist.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-pre-activation-checklist-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-pre-activation-checklist-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const scopedApprovalCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md';
const exactScopeDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXACT_TEST_MODE_SCOPE_AUTHORIZATION_DRAFT.md';

const PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT = '287627f';
const EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT = 'd7506bf';
const CHECKLIST_TYPE = 'pre_activation_checklist';
const CHECKLIST_STATUS = 'approval_ready_draft_only';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL = 'not_granted';
const NOT_FILLED = 'not_filled';
const ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED =
  'Activation command must be separately approved after all checklist fields are filled and Jason grants final activation approval.';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only pre-activation checklist',
  'pre-activation checklist dry-run only',
  'pre_activation_checklist_only',
  'Prior Scoped Approval Capture Reference',
  '287627f',
  'Exact Scope Authorization Draft Reference',
  'd7506bf',
  'Checklist Type and Status',
  'pre_activation_checklist',
  'approval_ready_draft_only',
  'not_granted',
  'Activation Remains Blocked',
  'first_controlled_launch_activation_allowed',
  'sandbox_test_mode_activation_allowed',
  'live_activation_allowed',
  'external_call_allowed',
  'Approved channels empty',
  'Approved external services empty',
  'not_filled',
  'Final Approval Checklist Table',
  'required_value_before_approval',
  'evidence needed',
  'activation allowed now',
  'Approval Cannot Be Inferred',
  'completion of this checklist packet is not approval',
  'exact values must be filled',
  'Jason must explicitly approve the final activation decision',
  'activation command must be separately approved',
  'rollback/stop conditions must be ready before any activation',
  'pre_activation_checklist_record',
  'final_approval_checklist_table',
  'first_controlled_launch_pre_activation_checklist_dry_run_summary',
  'first_controlled_launch_pre_activation_checklist_items',
  'executive_pre_activation_checklist_summary',
  'prior_scoped_approval_capture_reference_summary',
  'exact_scope_authorization_draft_reference_summary',
  'checklist_status_summary',
  'activation_blocked_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'required_checklist_fields_summary',
  'approval_cannot_be_inferred_summary',
  'activation_command_separate_approval_summary',
  'final_approval_checklist_table_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_pre_activation_checklist_safety_assertions',
  'fixture_pre_activation_checklist_id',
  'fixture_checklist_area',
  'fixture_checklist_status',
  'fixture_checklist_type',
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
  'required_final_jason_activation_approval',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
];

const REQUIRED_CHECKLIST_AREAS = [
  'Executive pre-activation checklist summary',
  'Prior scoped approval capture reference',
  'Exact scope authorization draft reference',
  'Checklist type and status (approval_ready_draft_only)',
  'Activation approval status (not_granted)',
  'First controlled launch activation blocked',
  'Sandbox/test-mode activation blocked',
  'Live activation blocked',
  'External call blocked',
  'Approved channels empty',
  'Approved external services empty',
  'Required channel scope not_filled',
  'Required service scope not_filled',
  'Required fake/test account boundaries not_filled',
  'Required allowed test lead data shape not_filled',
  'Required start window not_filled',
  'Required operator not_filled',
  'Required reviewer/on-call owner not_filled',
  'Required rollback owner not_filled',
  'Required stop conditions not_filled',
  'Required observation window not_filled',
  'Required evidence capture not_filled',
  'Required post-run review not_filled',
  'Required excluded scope confirmation not_filled',
  'Required final Jason activation approval not_granted',
  'Approval cannot be inferred boundary',
  'Activation command separately approved boundary',
  'Final approval checklist table (all not_filled)',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_pre_activation_checklist_id',
  'fixture_checklist_area',
  'fixture_checklist_status',
  'fixture_checklist_type',
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
  'first_controlled_launch_pre_activation_checklist_dry_run_summary',
  'pre_activation_checklist_record',
  'final_approval_checklist_table',
  'first_controlled_launch_pre_activation_checklist_items',
  'executive_pre_activation_checklist_summary',
  'prior_scoped_approval_capture_reference_summary',
  'exact_scope_authorization_draft_reference_summary',
  'checklist_status_summary',
  'activation_blocked_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'required_checklist_fields_summary',
  'approval_cannot_be_inferred_summary',
  'activation_command_separate_approval_summary',
  'final_approval_checklist_table_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_pre_activation_checklist_safety_assertions',
  'common_checklist_fields_summary',
];

const REQUIRED_CHECKLIST_RECORD_FIELDS = {
  prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
  exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
  checklist_type: CHECKLIST_TYPE,
  checklist_status: CHECKLIST_STATUS,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  required_channel_scope: NOT_FILLED,
  required_service_scope: NOT_FILLED,
  required_fake_test_account_boundaries: NOT_FILLED,
  required_allowed_test_lead_data_shape: NOT_FILLED,
  required_start_window: NOT_FILLED,
  required_operator: NOT_FILLED,
  required_reviewer_on_call_owner: NOT_FILLED,
  required_rollback_owner: NOT_FILLED,
  required_stop_conditions: NOT_FILLED,
  required_observation_window: NOT_FILLED,
  required_evidence_capture: NOT_FILLED,
  required_post_run_review: NOT_FILLED,
  required_excluded_scope_confirmation: NOT_FILLED,
  required_final_jason_activation_approval: REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL,
  activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
};

const REQUIRED_FINAL_APPROVAL_TABLE_ITEMS = [
  'required_channel_scope',
  'required_service_scope',
  'required_fake_test_account_boundaries',
  'required_allowed_test_lead_data_shape',
  'required_start_window',
  'required_operator',
  'required_reviewer_on_call_owner',
  'required_rollback_owner',
  'required_stop_conditions',
  'required_observation_window',
  'required_evidence_capture',
  'required_post_run_review',
  'required_excluded_scope_confirmation',
  'required_final_jason_activation_approval',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_pre_activation_checklist_doc_present',
  'fake_data_local_only_scope_present',
  'checklist_only_not_activation_approved',
  'prior_scoped_approval_capture_referenced',
  'exact_scope_authorization_draft_referenced',
  'activation_approval_not_granted',
  'approved_channels_empty',
  'approved_external_services_empty',
  'all_required_checklist_fields_remain_not_filled',
  'final_jason_activation_approval_not_granted',
  'activation_command_must_be_separately_approved',
  'no_launch_or_channel_activation_allowed',
  'approval_cannot_be_inferred_boundary_present',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'checklist_items_have_common_fields',
  'checklist_items_remain_dry_run_only',
  'checklist_items_have_activation_flags_false',
  'first_controlled_launch_activation_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'external_call_remains_blocked',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_PRE_ACTIVATION_CHECKLIST.md',
  'run-native-workflow-fixture-first-controlled-launch-pre-activation-checklist-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-pre-activation-checklist-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-pre-activation-checklist.js',
  'Native Workflow Fixture First Controlled Launch Pre-Activation Checklist Dry Run',
  'native workflow fixture first controlled launch pre-activation checklist dry run',
  'first controlled launch pre-activation checklist dry run',
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
const exactScopeDraftDoc = read(exactScopeDraftDocPath);

passAssertion('first_controlled_launch_pre_activation_checklist_doc_present');

mustHave(doc, scopedApprovalCaptureDocPath, 'documentation');
mustHave(doc, exactScopeDraftDocPath, 'documentation');
mustHave(doc, 'first controlled launch scoped approval capture', 'documentation');
mustHave(doc, 'exact test-mode scope authorization draft', 'documentation');
mustHave(doc, PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT, 'documentation');
mustHave(doc, EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT, 'documentation');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');
passAssertion('prior_scoped_approval_capture_referenced');
passAssertion('exact_scope_authorization_draft_referenced');
passAssertion('checklist_only_not_activation_approved');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch pre-activation checklist verifier', verifierPath],
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
  output.first_controlled_launch_pre_activation_checklist_dry_run !==
  'native_workflow_fixture_first_controlled_launch_pre_activation_checklist_dry_run'
) {
  fail('first_controlled_launch_pre_activation_checklist_dry_run marker is incorrect');
}

if (
  output.first_controlled_launch_pre_activation_checklist_dry_run_summary.packet_type !==
  'pre_activation_checklist_only'
) {
  fail('packet_type must be pre_activation_checklist_only');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log(
  'PASS: top-level first controlled launch pre-activation checklist sections are present.',
);

if (!output.pre_activation_checklist_record) {
  fail('pre_activation_checklist_record must be present');
}
for (const [field, expected] of Object.entries(REQUIRED_CHECKLIST_RECORD_FIELDS)) {
  if (output.pre_activation_checklist_record[field] !== expected) {
    fail(`pre_activation_checklist_record.${field} must be ${JSON.stringify(expected)}`);
  }
}
if (
  !Array.isArray(output.pre_activation_checklist_record.approved_channels) ||
  output.pre_activation_checklist_record.approved_channels.length !== 0
) {
  fail('pre_activation_checklist_record.approved_channels must be an empty array');
}
if (
  !Array.isArray(output.pre_activation_checklist_record.approved_external_services) ||
  output.pre_activation_checklist_record.approved_external_services.length !== 0
) {
  fail('pre_activation_checklist_record.approved_external_services must be an empty array');
}
passAssertion('activation_approval_not_granted');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');
passAssertion('all_required_checklist_fields_remain_not_filled');
passAssertion('final_jason_activation_approval_not_granted');

if (!Array.isArray(output.final_approval_checklist_table) || output.final_approval_checklist_table.length !== 14) {
  fail('final_approval_checklist_table must contain exactly 14 rows');
}
const tableItems = new Set(output.final_approval_checklist_table.map((row) => row.item));
for (const item of REQUIRED_FINAL_APPROVAL_TABLE_ITEMS) {
  if (!tableItems.has(item)) fail(`final_approval_checklist_table missing item: ${item}`);
}
for (const row of output.final_approval_checklist_table) {
  if (row.activation_allowed_now !== false) {
    fail(`final_approval_checklist_table row ${row.item} activation_allowed_now must be false`);
  }
  if (!('required_value_before_approval' in row)) {
    fail(`final_approval_checklist_table row ${row.item} missing required_value_before_approval`);
  }
  if (!('evidence_needed' in row)) {
    fail(`final_approval_checklist_table row ${row.item} missing evidence_needed`);
  }
  if (!('owner' in row)) {
    fail(`final_approval_checklist_table row ${row.item} missing owner`);
  }
  if (row.item === 'required_final_jason_activation_approval') {
    if (row.current_value !== REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL) {
      fail('required_final_jason_activation_approval current_value must be not_granted');
    }
    if (row.status !== REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL) {
      fail('required_final_jason_activation_approval status must be not_granted');
    }
  } else if (row.current_value !== NOT_FILLED || row.status !== NOT_FILLED) {
    fail(`final_approval_checklist_table row ${row.item} must have not_filled current_value and status`);
  }
}

if (
  output.prior_scoped_approval_capture_reference_summary.prior_scoped_approval_capture_commit !==
  PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT
) {
  fail('prior_scoped_approval_capture_commit must be 287627f');
}
if (!output.prior_scoped_approval_capture_reference_summary.prior_capture_does_not_grant_activation) {
  fail('prior_capture_does_not_grant_activation must be true');
}

if (
  output.exact_scope_authorization_draft_reference_summary.exact_scope_authorization_draft_commit !==
  EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT
) {
  fail('exact_scope_authorization_draft_commit must be d7506bf');
}
if (!output.exact_scope_authorization_draft_reference_summary.exact_scope_draft_does_not_grant_activation) {
  fail('exact_scope_draft_does_not_grant_activation must be true');
}

if (output.checklist_status_summary.checklist_type !== CHECKLIST_TYPE) {
  fail('checklist_type must be pre_activation_checklist');
}
if (output.checklist_status_summary.checklist_status !== CHECKLIST_STATUS) {
  fail('checklist_status must be approval_ready_draft_only');
}
if (output.checklist_status_summary.activation_approval_status !== ACTIVATION_APPROVAL_STATUS) {
  fail('activation_approval_status must be not_granted');
}
if (!output.checklist_status_summary.checklist_only_not_activation_approved) {
  fail('checklist_only_not_activation_approved must be true');
}

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
if (!output.activation_blocked_summary.activation_command_must_be_separately_approved) {
  fail('activation_command_must_be_separately_approved must be true');
}
passAssertion('no_launch_or_channel_activation_allowed');
passAssertion('activation_command_must_be_separately_approved');

if (!output.approved_channels_empty_summary.approved_channels_must_remain_empty) {
  fail('approved_channels_must_remain_empty must be true');
}

if (!output.approved_external_services_empty_summary.approved_external_services_must_remain_empty) {
  fail('approved_external_services_must_remain_empty must be true');
}

if (!output.required_checklist_fields_summary.all_required_checklist_fields_remain_not_filled) {
  fail('all_required_checklist_fields_remain_not_filled must be true');
}
for (const [field, expected] of [
  ['required_channel_scope', NOT_FILLED],
  ['required_service_scope', NOT_FILLED],
  ['required_fake_test_account_boundaries', NOT_FILLED],
  ['required_allowed_test_lead_data_shape', NOT_FILLED],
  ['required_start_window', NOT_FILLED],
  ['required_operator', NOT_FILLED],
  ['required_reviewer_on_call_owner', NOT_FILLED],
  ['required_rollback_owner', NOT_FILLED],
  ['required_stop_conditions', NOT_FILLED],
  ['required_observation_window', NOT_FILLED],
  ['required_evidence_capture', NOT_FILLED],
  ['required_post_run_review', NOT_FILLED],
  ['required_excluded_scope_confirmation', NOT_FILLED],
  ['required_final_jason_activation_approval', REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL],
]) {
  if (output.required_checklist_fields_summary[field] !== expected) {
    fail(`required_checklist_fields_summary.${field} must be ${expected}`);
  }
}

if (!output.approval_cannot_be_inferred_summary.approval_cannot_be_inferred) {
  fail('approval_cannot_be_inferred must be true');
}
if (!output.approval_cannot_be_inferred_summary.checklist_completion_is_not_activation_approval) {
  fail('checklist_completion_is_not_activation_approval must be true');
}
if (!output.approval_cannot_be_inferred_summary.jason_must_explicitly_approve_final_activation_decision) {
  fail('jason_must_explicitly_approve_final_activation_decision must be true');
}
if (!output.approval_cannot_be_inferred_summary.activation_command_must_be_separately_approved) {
  fail('approval_cannot_be_inferred_summary.activation_command_must_be_separately_approved must be true');
}
passAssertion('approval_cannot_be_inferred_boundary_present');

if (!output.activation_command_separate_approval_summary.activation_command_must_be_separately_approved) {
  fail('activation_command_separate_approval_summary.activation_command_must_be_separately_approved must be true');
}
if (
  output.activation_command_separate_approval_summary.activation_command_separate_approval_required !==
  ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED
) {
  fail('activation_command_separate_approval_required must match expected value');
}

if (!output.final_approval_checklist_table_summary.all_rows_activation_allowed_now_false) {
  fail('all_rows_activation_allowed_now_false must be true');
}
if (!output.final_approval_checklist_table_summary.no_field_approved_for_activation) {
  fail('no_field_approved_for_activation must be true');
}

if (
  !Array.isArray(output.first_controlled_launch_pre_activation_checklist_items) ||
  output.first_controlled_launch_pre_activation_checklist_items.length !== 30
) {
  fail('first_controlled_launch_pre_activation_checklist_items must contain exactly 30 items');
}

const checklistAreas = new Set(
  output.first_controlled_launch_pre_activation_checklist_items.map(
    (item) => item.fixture_checklist_area,
  ),
);
for (const area of REQUIRED_CHECKLIST_AREAS) {
  if (!checklistAreas.has(area)) fail(`required checklist area missing: ${area}`);
}

for (const item of output.first_controlled_launch_pre_activation_checklist_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `checklist item ${item.fixture_pre_activation_checklist_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(
      `checklist item ${item.fixture_pre_activation_checklist_id} fixture_delivery_mode is not dry_run_only`,
    );
  }
  if (item.fixture_checklist_type !== CHECKLIST_TYPE) {
    fail(
      `checklist item ${item.fixture_pre_activation_checklist_id} fixture_checklist_type is not pre_activation_checklist`,
    );
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
    'fixture_first_controlled_launch_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`checklist item ${item.fixture_pre_activation_checklist_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`checklist item ${item.fixture_pre_activation_checklist_id} missing fixture_audit_event_id`);
  }
}
passAssertion('checklist_items_have_common_fields');
passAssertion('checklist_items_remain_dry_run_only');
passAssertion('checklist_items_have_activation_flags_false');

if (!output.common_checklist_fields_summary.all_items_include_common_fields) {
  fail('common_checklist_fields_summary.all_items_include_common_fields must be true');
}
if (
  !output.first_controlled_launch_pre_activation_checklist_dry_run_summary.all_items_remain_dry_run_only
) {
  fail(
    'first_controlled_launch_pre_activation_checklist_dry_run_summary.all_items_remain_dry_run_only must be true',
  );
}

if (
  output.executive_pre_activation_checklist_summary.first_controlled_launch_activation_allowed !== false
) {
  fail('first_controlled_launch_activation_allowed must remain false');
}
if (
  output.executive_pre_activation_checklist_summary.sandbox_test_mode_activation_allowed !== false
) {
  fail('sandbox_test_mode_activation_allowed must remain false');
}
if (output.executive_pre_activation_checklist_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.executive_pre_activation_checklist_summary.external_call_allowed !== false) {
  fail('external_call_allowed must remain false');
}
passAssertion('first_controlled_launch_activation_remains_blocked');
passAssertion('sandbox_test_mode_activation_remains_blocked');
passAssertion('live_activation_remains_blocked');
passAssertion('external_call_remains_blocked');

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
  'verify-native-workflow-fixture-first-controlled-launch-pre-activation-checklist-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Pre-Activation Checklist Dry Run',
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
  `PASS: Native Workflow Fixture First Controlled Launch Pre-Activation Checklist Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);