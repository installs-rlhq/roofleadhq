#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-scoped-approval-capture.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-scoped-approval-capture-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-scoped-approval-capture-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const approvalDecisionDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_DECISION_DRAFT.md';

const JASON_APPROVAL_STATEMENT = 'Approved to move forward.';
const PLANNING_ONLY_INTERPRETATION = 'move_forward_to_next_controlled_planning_step_only';
const APPROVAL_SCOPE = 'prepare_controlled_test_mode_activation_plan_only';
const APPROVAL_DECISION_STATUS = 'scoped_planning_approved';
const REQUIRED_NEXT_DECISION =
  'exact controlled test-mode channel/start/operator/rollback approval';
const FORBIDDEN_SCOPE =
  'all live/test-mode/external/service/production actions until separately approved';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only scoped approval capture',
  'scoped approval capture dry-run only',
  'scoped_approval_capture_only',
  'Jason Approval Statement Captured',
  'Approved to move forward.',
  'Planning-Only Interpretation',
  'move_forward_to_next_controlled_planning_step_only',
  'prepare_controlled_test_mode_activation_plan_only',
  'scoped_planning_approved',
  'Activation Remains Blocked',
  'first_controlled_launch_activation_allowed',
  'sandbox_test_mode_activation_allowed',
  'live_activation_allowed',
  'external_call_allowed',
  'Approved channels empty',
  'Approved external services empty',
  'blank_placeholder',
  'Required Next Decision',
  'exact controlled test-mode channel/start/operator/rollback approval',
  'Forbidden Scope',
  'all live/test-mode/external/service/production actions until separately approved',
  'Not Activation Approval Boundary',
  'Relationship to Approval Decision Draft',
  'first controlled launch approval decision draft',
  'scoped_approval_capture_record',
  'first_controlled_launch_scoped_approval_capture_dry_run_summary',
  'first_controlled_launch_scoped_approval_capture_items',
  'executive_scoped_approval_capture_summary',
  'jason_approval_statement_captured_summary',
  'planning_only_interpretation_summary',
  'activation_blocked_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'placeholder_fields_summary',
  'required_next_decision_summary',
  'forbidden_scope_summary',
  'not_activation_approval_boundary_summary',
  'approval_decision_draft_relationship_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_scoped_approval_capture_safety_assertions',
  'fixture_scoped_approval_capture_id',
  'fixture_capture_area',
  'fixture_capture_status',
  'fixture_approval_interpretation',
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
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
];

const REQUIRED_CAPTURE_AREAS = [
  'Executive scoped approval capture summary',
  'Jason approval statement captured',
  'Planning-only interpretation boundary',
  'Approval scope (prepare plan only)',
  'Approval decision status (scoped_planning_approved)',
  'First controlled launch activation blocked',
  'Sandbox/test-mode activation blocked',
  'Live activation blocked',
  'External call blocked',
  'Approved channels empty',
  'Approved external services empty',
  'Approved start time blank_placeholder',
  'Approved operator blank_placeholder',
  'Rollback owner blank_placeholder',
  'Required next decision (exact activation approval)',
  'Forbidden scope boundary',
  'Relationship to approval decision draft',
  'Not activation approval boundary',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_scoped_approval_capture_id',
  'fixture_capture_area',
  'fixture_capture_status',
  'fixture_approval_interpretation',
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
  'first_controlled_launch_scoped_approval_capture_dry_run_summary',
  'scoped_approval_capture_record',
  'first_controlled_launch_scoped_approval_capture_items',
  'executive_scoped_approval_capture_summary',
  'jason_approval_statement_captured_summary',
  'planning_only_interpretation_summary',
  'activation_blocked_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'placeholder_fields_summary',
  'required_next_decision_summary',
  'forbidden_scope_summary',
  'not_activation_approval_boundary_summary',
  'approval_decision_draft_relationship_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_scoped_approval_capture_safety_assertions',
  'common_capture_fields_summary',
];

const REQUIRED_SCOPED_APPROVAL_CAPTURE_RECORD_FIELDS = {
  approval_statement_received: JASON_APPROVAL_STATEMENT,
  approval_interpretation: PLANNING_ONLY_INTERPRETATION,
  approval_scope: APPROVAL_SCOPE,
  approval_decision_status: APPROVAL_DECISION_STATUS,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approved_start_time: 'blank_placeholder',
  approved_operator: 'blank_placeholder',
  rollback_owner: 'blank_placeholder',
  required_next_decision: REQUIRED_NEXT_DECISION,
  forbidden_scope: FORBIDDEN_SCOPE,
};

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_scoped_approval_capture_doc_present',
  'fake_data_local_only_scope_present',
  'jason_approval_statement_captured',
  'planning_only_interpretation_present',
  'no_launch_or_channel_activation_allowed',
  'approved_channels_empty',
  'approved_external_services_empty',
  'start_operator_rollback_remain_placeholders',
  'exact_next_approval_still_required',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'capture_items_have_common_fields',
  'capture_items_remain_dry_run_only',
  'capture_items_have_activation_flags_false',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md',
  'run-native-workflow-fixture-first-controlled-launch-scoped-approval-capture-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-scoped-approval-capture-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-scoped-approval-capture.js',
  'Native Workflow Fixture First Controlled Launch Scoped Approval Capture Dry Run',
  'native workflow fixture first controlled launch scoped approval capture dry run',
  'first controlled launch scoped approval capture dry run',
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
const approvalDecisionDraftDoc = read(approvalDecisionDraftDocPath);

passAssertion('first_controlled_launch_scoped_approval_capture_doc_present');

mustHave(doc, approvalDecisionDraftDocPath, 'documentation');
mustHave(doc, 'first controlled launch approval decision draft', 'documentation');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');
passAssertion('jason_approval_statement_captured');
passAssertion('planning_only_interpretation_present');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch scoped approval capture verifier', verifierPath],
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
  output.first_controlled_launch_scoped_approval_capture_dry_run !==
  'native_workflow_fixture_first_controlled_launch_scoped_approval_capture_dry_run'
) {
  fail('first_controlled_launch_scoped_approval_capture_dry_run marker is incorrect');
}

if (
  output.first_controlled_launch_scoped_approval_capture_dry_run_summary.packet_type !==
  'scoped_approval_capture_only'
) {
  fail('packet_type must be scoped_approval_capture_only');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level first controlled launch scoped approval capture sections are present.');

if (!output.scoped_approval_capture_record) {
  fail('scoped_approval_capture_record must be present');
}
for (const [field, expected] of Object.entries(REQUIRED_SCOPED_APPROVAL_CAPTURE_RECORD_FIELDS)) {
  if (output.scoped_approval_capture_record[field] !== expected) {
    fail(`scoped_approval_capture_record.${field} must be ${JSON.stringify(expected)}`);
  }
}
if (
  !Array.isArray(output.scoped_approval_capture_record.approved_channels) ||
  output.scoped_approval_capture_record.approved_channels.length !== 0
) {
  fail('scoped_approval_capture_record.approved_channels must be an empty array');
}
if (
  !Array.isArray(output.scoped_approval_capture_record.approved_external_services) ||
  output.scoped_approval_capture_record.approved_external_services.length !== 0
) {
  fail('scoped_approval_capture_record.approved_external_services must be an empty array');
}

if (
  output.jason_approval_statement_captured_summary.approval_statement_received !==
  JASON_APPROVAL_STATEMENT
) {
  fail('jason approval statement must be captured');
}
if (!output.jason_approval_statement_captured_summary.statement_captured) {
  fail('statement_captured must be true');
}
if (!output.jason_approval_statement_captured_summary.not_interpreted_as_activation_approval) {
  fail('approval must not be interpreted as activation approval');
}

if (
  output.planning_only_interpretation_summary.approval_interpretation !==
  PLANNING_ONLY_INTERPRETATION
) {
  fail('approval_interpretation must be move_forward_to_next_controlled_planning_step_only');
}
if (!output.planning_only_interpretation_summary.interpretation_is_planning_only) {
  fail('interpretation_is_planning_only must be true');
}
if (!output.planning_only_interpretation_summary.interpretation_is_next_step_only) {
  fail('interpretation_is_next_step_only must be true');
}
if (!output.planning_only_interpretation_summary.interpretation_does_not_grant_activation) {
  fail('interpretation_does_not_grant_activation must be true');
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
passAssertion('no_launch_or_channel_activation_allowed');

if (!output.approved_channels_empty_summary.approved_channels_must_remain_empty) {
  fail('approved_channels_must_remain_empty must be true');
}
passAssertion('approved_channels_empty');

if (!output.approved_external_services_empty_summary.approved_external_services_must_remain_empty) {
  fail('approved_external_services_must_remain_empty must be true');
}
passAssertion('approved_external_services_empty');

if (!output.placeholder_fields_summary.all_placeholder_fields_remain_blank) {
  fail('all_placeholder_fields_remain_blank must be true');
}
for (const field of ['approved_start_time', 'approved_operator', 'rollback_owner']) {
  if (output.placeholder_fields_summary[field] !== 'blank_placeholder') {
    fail(`placeholder_fields_summary.${field} must be blank_placeholder`);
  }
}
passAssertion('start_operator_rollback_remain_placeholders');

if (!output.required_next_decision_summary.exact_activation_approval_still_required) {
  fail('exact_activation_approval_still_required must be true');
}
if (
  output.required_next_decision_summary.required_next_decision !== REQUIRED_NEXT_DECISION
) {
  fail('required_next_decision must document exact controlled test-mode approval');
}
passAssertion('exact_next_approval_still_required');

if (!output.forbidden_scope_summary.forbidden_scope_enforced) {
  fail('forbidden_scope_enforced must be true');
}
if (output.forbidden_scope_summary.forbidden_scope !== FORBIDDEN_SCOPE) {
  fail('forbidden_scope must match expected value');
}
passAssertion('forbidden_scope_enforced');

if (!output.not_activation_approval_boundary_summary.scoped_approval_is_not_activation_approval) {
  fail('scoped_approval_is_not_activation_approval must be true');
}
passAssertion('not_activation_approval_boundary_present');

if (
  !Array.isArray(output.first_controlled_launch_scoped_approval_capture_items) ||
  output.first_controlled_launch_scoped_approval_capture_items.length !== 20
) {
  fail('first_controlled_launch_scoped_approval_capture_items must contain exactly 20 items');
}

const captureAreas = new Set(
  output.first_controlled_launch_scoped_approval_capture_items.map(
    (item) => item.fixture_capture_area,
  ),
);
for (const area of REQUIRED_CAPTURE_AREAS) {
  if (!captureAreas.has(area)) fail(`required capture area missing: ${area}`);
}

for (const item of output.first_controlled_launch_scoped_approval_capture_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `capture item ${item.fixture_scoped_approval_capture_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(
      `capture item ${item.fixture_scoped_approval_capture_id} fixture_delivery_mode is not dry_run_only`,
    );
  }
  if (item.fixture_approval_interpretation !== PLANNING_ONLY_INTERPRETATION) {
    fail(
      `capture item ${item.fixture_scoped_approval_capture_id} fixture_approval_interpretation is not planning-only`,
    );
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
    'fixture_first_controlled_launch_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`capture item ${item.fixture_scoped_approval_capture_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(
      `capture item ${item.fixture_scoped_approval_capture_id} missing fixture_audit_event_id`,
    );
  }
}
passAssertion('capture_items_have_common_fields');
passAssertion('capture_items_remain_dry_run_only');
passAssertion('capture_items_have_activation_flags_false');

if (!output.common_capture_fields_summary.all_items_include_common_fields) {
  fail('common_capture_fields_summary.all_items_include_common_fields must be true');
}
if (
  !output.first_controlled_launch_scoped_approval_capture_dry_run_summary.all_items_remain_dry_run_only
) {
  fail(
    'first_controlled_launch_scoped_approval_capture_dry_run_summary.all_items_remain_dry_run_only must be true',
  );
}

if (output.executive_scoped_approval_capture_summary.first_controlled_launch_activation_allowed !== false) {
  fail('first_controlled_launch_activation_allowed must remain false');
}
if (output.executive_scoped_approval_capture_summary.sandbox_test_mode_activation_allowed !== false) {
  fail('sandbox_test_mode_activation_allowed must remain false');
}
if (output.executive_scoped_approval_capture_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.executive_scoped_approval_capture_summary.external_call_allowed !== false) {
  fail('external_call_allowed must remain false');
}
passAssertion('first_controlled_launch_activation_remains_blocked');
passAssertion('sandbox_test_mode_activation_remains_blocked');
passAssertion('live_activation_remains_blocked');
passAssertion('external_call_remains_blocked');

if (
  !output.approval_decision_draft_relationship_summary.approval_decision_draft_does_not_grant_activation
) {
  fail('approval_decision_draft_does_not_grant_activation must be true');
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
  'verify-native-workflow-fixture-first-controlled-launch-scoped-approval-capture-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Scoped Approval Capture Dry Run',
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
  `PASS: Native Workflow Fixture First Controlled Launch Scoped Approval Capture Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);