#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXECUTION_RUNBOOK_DRY_RUN.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-execution-runbook-dry-run.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-execution-runbook-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-execution-runbook-dry-run-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const approvalRequestPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_REQUEST_PACKET_DRY_RUN.md';
const readinessLockDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md';
const channelAdapterContractDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md';
const channelPayloadReplayDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_PAYLOAD_REPLAY_DRY_RUN.md';
const channelReplayAcceptanceGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_REPLAY_ACCEPTANCE_GATE_DRY_RUN.md';
const humanReviewPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_HUMAN_REVIEW_PACKET_DRY_RUN.md';
const verifierFastLaneDocPath = 'docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only execution runbook',
  'execution runbook dry-run only',
  'Relationship to First Controlled Launch Approval Request Packet Dry Run',
  'Relationship to First Controlled Launch Readiness Lock Dry Run',
  'Relationship to Verifier Quiet Mode Fast Lane Cleanup',
  'Relationship to Channel Adapter Contract Dry Run',
  'Relationship to Channel Payload Replay Dry Run',
  'Relationship to Channel Replay Acceptance Gate Dry Run',
  'Relationship to Sandbox/Test-Mode Human Review Packet Dry Run',
  'Final Approval Still Not Granted',
  'Call/Vapi Execution Sequence',
  'Email Execution Sequence',
  'SMS Execution Sequence',
  'Live Activation Remains Blocked',
  'Sandbox/Test-Mode Activation Remains Blocked',
  'Execution Runbook Table of Contents',
  'Executive Execution Summary',
  'Explicit Non-Approval Statement',
  'First Controlled Launch Remains Blocked',
  'Required Explicit Approval Checkpoint',
  'Pre-Approval State',
  'Preflight Checklist',
  'Operator Roles and Ownership',
  'Channel-by-Channel Execution Sequence',
  'Messaging Compliance Checkpoint',
  'Google Calendar Execution Sequence',
  'CSV/Reporting Execution Sequence',
  'CRM Handoff/Export Execution Sequence',
  'Lindy Bridge Execution Sequence',
  'Scheduler/Dispatcher Execution Sequence',
  'Public Route/Webhook Execution Sequence',
  'Supabase Persistence Execution Sequence',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Boundary',
  'Credential/Env Review Checkpoint',
  'Data Boundary / PII Checkpoint',
  'Audit/Timeline Expectations',
  'Owner Routing for Issues',
  'Monitoring Checklist',
  'Stop Conditions',
  'Rollback Sequence',
  'Homeowner/Customer Communication Boundary',
  'Observation Window',
  'Post-Run Review Checklist',
  'Allowed Actions Before Approval',
  'Forbidden Actions Before Approval',
  'Fast-Lane Verification Usage',
  'verify-safe-readiness-fast.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'fixture_execution_step_id',
  'fixture_execution_area',
  'fixture_execution_step',
  'fixture_execution_status',
  'fixture_execution_decision',
  'blocked_until_explicit_approval',
  'fixture_required_approval',
  'fixture_required_evidence',
  'fixture_blocking_reason',
  'fixture_owner_for_next_step',
  'fixture_approval_status',
  'not_approved',
  'fixture_delivery_mode',
  'dry_run_only',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_audit_event_id',
  'fixture_created_at',
  'Executive execution summary',
  'Required explicit approval checkpoint',
  'Preflight checklist',
  'Operator roles and ownership',
  'SMS execution sequence',
  'Email execution sequence',
  'Call/Vapi execution sequence',
  'Google Calendar execution sequence',
  'CSV/reporting execution sequence',
  'CRM handoff/export execution sequence',
  'Lindy bridge execution sequence',
  'Scheduler/dispatcher execution sequence',
  'Public route/webhook execution sequence',
  'Supabase persistence execution sequence',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Messaging compliance checkpoint',
  'Credential/env review checkpoint',
  'Data boundary / PII checkpoint',
  'Audit/timeline checkpoint',
  'Monitoring checklist',
  'Stop conditions',
  'Rollback sequence',
  'Owner routing for issues',
  'Observation window',
  'Post-run review checklist',
  'Allowed actions before approval',
  'Forbidden actions before approval',
  'Approval not granted',
  'First controlled launch remains blocked',
  'first_controlled_launch_execution_runbook_dry_run_summary',
  'first_controlled_launch_execution_runbook_items',
  'execution_runbook_toc_summary',
  'executive_execution_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'required_approval_checkpoint_summary',
  'preflight_checklist_summary',
  'operator_roles_ownership_summary',
  'channel_execution_sequence_summary',
  'sms_execution_summary',
  'email_execution_summary',
  'call_vapi_execution_summary',
  'approval_not_granted_summary',
  'google_calendar_execution_summary',
  'csv_reporting_execution_summary',
  'crm_handoff_export_execution_summary',
  'lindy_bridge_execution_summary',
  'scheduler_dispatcher_execution_summary',
  'public_route_webhook_execution_summary',
  'supabase_persistence_execution_summary',
  'billing_payment_quote_boundary_blocked_summary',
  'monitoring_checklist_summary',
  'stop_conditions_summary',
  'rollback_sequence_summary',
  'audit_timeline_expectations_summary',
  'owner_routing_issues_summary',
  'observation_window_summary',
  'post_run_review_checklist_summary',
  'allowed_actions_before_approval_summary',
  'forbidden_actions_before_approval_summary',
  'first_controlled_launch_execution_runbook_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_EXECUTION_AREAS = [
  'Executive execution summary',
  'Required explicit approval checkpoint',
  'Preflight checklist',
  'Operator roles and ownership',
  'SMS execution sequence',
  'Email execution sequence',
  'Call/Vapi execution sequence',
  'Google Calendar execution sequence',
  'CSV/reporting execution sequence',
  'CRM handoff/export execution sequence',
  'Lindy bridge execution sequence',
  'Scheduler/dispatcher execution sequence',
  'Public route/webhook execution sequence',
  'Supabase persistence execution sequence',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Messaging compliance checkpoint',
  'Credential/env review checkpoint',
  'Data boundary / PII checkpoint',
  'Audit/timeline checkpoint',
  'Monitoring checklist',
  'Stop conditions',
  'Rollback sequence',
  'Owner routing for issues',
  'Observation window',
  'Post-run review checklist',
  'Allowed actions before approval',
  'Forbidden actions before approval',
  'Approval not granted',
  'First controlled launch remains blocked',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_execution_step_id',
  'fixture_execution_area',
  'fixture_execution_step',
  'fixture_execution_status',
  'fixture_execution_decision',
  'fixture_required_approval',
  'fixture_required_evidence',
  'fixture_blocking_reason',
  'fixture_owner_for_next_step',
  'fixture_approval_status',
  'fixture_delivery_mode',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_audit_event_id',
  'fixture_created_at',
];

const REQUIRED_OUTPUT_SECTIONS = [
  'first_controlled_launch_execution_runbook_dry_run_summary',
  'first_controlled_launch_execution_runbook_items',
  'execution_runbook_toc_summary',
  'executive_execution_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'required_approval_checkpoint_summary',
  'preflight_checklist_summary',
  'operator_roles_ownership_summary',
  'channel_execution_sequence_summary',
  'sms_execution_summary',
  'email_execution_summary',
  'call_vapi_execution_summary',
  'google_calendar_execution_summary',
  'csv_reporting_execution_summary',
  'crm_handoff_export_execution_summary',
  'lindy_bridge_execution_summary',
  'scheduler_dispatcher_execution_summary',
  'public_route_webhook_execution_summary',
  'supabase_persistence_execution_summary',
  'billing_payment_quote_boundary_blocked_summary',
  'monitoring_checklist_summary',
  'stop_conditions_summary',
  'rollback_sequence_summary',
  'audit_timeline_expectations_summary',
  'owner_routing_issues_summary',
  'observation_window_summary',
  'post_run_review_checklist_summary',
  'allowed_actions_before_approval_summary',
  'forbidden_actions_before_approval_summary',
  'approval_not_granted_summary',
  'first_controlled_launch_execution_runbook_safety_assertions',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_execution_runbook_doc_present',
  'fake_data_local_only_scope_present',
  'explicit_non_approval_statement_present',
  'first_controlled_launch_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'relationship_to_approval_request_packet_present',
  'relationship_to_readiness_lock_present',
  'execution_runbook_toc_present',
  'executive_execution_summary_present',
  'required_approval_checkpoint_present',
  'preflight_checklist_present',
  'operator_roles_ownership_present',
  'channel_execution_sequence_present',
  'sms_execution_present',
  'email_execution_present',
  'call_vapi_execution_present',
  'google_calendar_execution_present',
  'csv_reporting_execution_present',
  'crm_handoff_export_execution_present',
  'lindy_bridge_execution_present',
  'scheduler_dispatcher_execution_present',
  'public_route_webhook_execution_present',
  'supabase_persistence_execution_present',
  'billing_payment_quote_boundary_blocked',
  'monitoring_checklist_present',
  'stop_conditions_present',
  'rollback_sequence_present',
  'audit_timeline_expectations_present',
  'owner_routing_issues_present',
  'observation_window_present',
  'post_run_review_checklist_present',
  'allowed_actions_before_approval_present',
  'forbidden_actions_before_approval_present',
  'approval_not_granted',
  'fast_lane_reference_present',
  'runner_outputs_valid_json',
  'execution_items_have_common_fields',
  'execution_items_remain_dry_run_only',
  'execution_items_have_activation_flags_false',
  'execution_decisions_blocked_until_explicit_approval',
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
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXECUTION_RUNBOOK_DRY_RUN.md',
  'run-native-workflow-fixture-first-controlled-launch-execution-runbook-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-execution-runbook-dry-run-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-execution-runbook-dry-run.js',
  'Native Workflow Fixture First Controlled Launch Execution Runbook Dry Run',
  'native workflow fixture first controlled launch execution runbook dry run',
  'first controlled launch execution runbook dry run',
  'verify-safe-readiness-fast.sh',
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
const fastReadiness = read(fastReadinessPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const approvalRequestPacketDoc = read(approvalRequestPacketDocPath);
const readinessLockDoc = read(readinessLockDocPath);
const channelAdapterContractDoc = read(channelAdapterContractDocPath);
const channelPayloadReplayDoc = read(channelPayloadReplayDocPath);
const channelReplayAcceptanceGateDoc = read(channelReplayAcceptanceGateDocPath);
const humanReviewPacketDoc = read(humanReviewPacketDocPath);
const verifierFastLaneDoc = read(verifierFastLaneDocPath);

passAssertion('first_controlled_launch_execution_runbook_doc_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');

mustHave(doc, approvalRequestPacketDocPath, 'documentation');
mustHave(doc, 'first controlled launch approval request packet dry run', 'documentation');
passAssertion('relationship_to_approval_request_packet_present');

mustHave(doc, readinessLockDocPath, 'documentation');
mustHave(doc, 'first controlled launch readiness lock dry run', 'documentation');
passAssertion('relationship_to_readiness_lock_present');

mustHave(doc, verifierFastLaneDocPath, 'documentation');
mustHave(doc, 'verifier quiet mode fast lane cleanup', 'documentation');
passAssertion('fast_lane_reference_present');

mustHave(doc, channelAdapterContractDocPath, 'documentation');
mustHave(doc, channelPayloadReplayDocPath, 'documentation');
mustHave(doc, channelReplayAcceptanceGateDocPath, 'documentation');
mustHave(doc, humanReviewPacketDocPath, 'documentation');

passAssertion('execution_runbook_toc_present');
passAssertion('executive_execution_summary_present');
passAssertion('explicit_non_approval_statement_present');
passAssertion('first_controlled_launch_remains_blocked');
passAssertion('required_approval_checkpoint_present');
passAssertion('preflight_checklist_present');
passAssertion('operator_roles_ownership_present');
passAssertion('channel_execution_sequence_present');
passAssertion('sms_execution_present');
passAssertion('email_execution_present');
passAssertion('call_vapi_execution_present');
passAssertion('google_calendar_execution_present');
passAssertion('csv_reporting_execution_present');
passAssertion('crm_handoff_export_execution_present');
passAssertion('lindy_bridge_execution_present');
passAssertion('scheduler_dispatcher_execution_present');
passAssertion('public_route_webhook_execution_present');
passAssertion('supabase_persistence_execution_present');
passAssertion('billing_payment_quote_boundary_blocked');
passAssertion('monitoring_checklist_present');
passAssertion('stop_conditions_present');
passAssertion('rollback_sequence_present');
passAssertion('audit_timeline_expectations_present');
passAssertion('owner_routing_issues_present');
passAssertion('observation_window_present');
passAssertion('post_run_review_checklist_present');
passAssertion('allowed_actions_before_approval_present');
passAssertion('forbidden_actions_before_approval_present');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch execution runbook verifier', verifierPath],
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
  output.first_controlled_launch_execution_runbook_dry_run !==
  'native_workflow_fixture_first_controlled_launch_execution_runbook_dry_run'
) {
  fail('first_controlled_launch_execution_runbook_dry_run marker is incorrect');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level first controlled launch execution runbook sections are present.');

if (
  !Array.isArray(output.first_controlled_launch_execution_runbook_items) ||
  output.first_controlled_launch_execution_runbook_items.length !== 29
) {
  fail('first_controlled_launch_execution_runbook_items must contain exactly 29 items');
}

const executionAreas = new Set(
  output.first_controlled_launch_execution_runbook_items.map((item) => item.fixture_execution_area),
);
for (const area of REQUIRED_EXECUTION_AREAS) {
  if (!executionAreas.has(area)) fail(`required execution area missing: ${area}`);
}

for (const item of output.first_controlled_launch_execution_runbook_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `execution item ${item.fixture_execution_step_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(`execution item ${item.fixture_execution_step_id} fixture_delivery_mode is not dry_run_only`);
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(`execution item ${item.fixture_execution_step_id} fixture_approval_status is not not_approved`);
  }
  if (item.fixture_execution_decision !== 'blocked_until_explicit_approval') {
    fail(`execution item ${item.fixture_execution_step_id} fixture_execution_decision is not blocked_until_explicit_approval`);
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`execution item ${item.fixture_execution_step_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`execution item ${item.fixture_execution_step_id} missing fixture_audit_event_id`);
  }
}
passAssertion('execution_items_have_common_fields');
passAssertion('execution_items_remain_dry_run_only');
passAssertion('execution_items_have_activation_flags_false');
passAssertion('execution_decisions_blocked_until_explicit_approval');

if (!output.common_execution_fields_summary.all_items_include_common_fields) {
  fail('common_execution_fields_summary.all_items_include_common_fields must be true');
}
if (!output.first_controlled_launch_execution_runbook_dry_run_summary.all_items_remain_dry_run_only) {
  fail('first_controlled_launch_execution_runbook_dry_run_summary.all_items_remain_dry_run_only must be true');
}
if (output.billing_payment_quote_boundary_blocked_summary.automation_forbidden !== true) {
  fail('billing boundary must remain automation forbidden');
}
if (output.crm_handoff_export_execution_summary.bidirectional_crm_sync_allowed !== false) {
  fail('crm handoff must remain not bidirectional sync');
}
if (output.lindy_bridge_execution_summary.live_lindy_bridge_enabled !== false) {
  fail('live_lindy_bridge_enabled must remain false');
}
if (output.scheduler_dispatcher_execution_summary.scheduler_enabled !== false) {
  fail('scheduler must remain disabled');
}
if (output.public_route_webhook_execution_summary.public_route_enabled !== false) {
  fail('public route must remain disabled');
}
if (output.supabase_persistence_execution_summary.production_write_allowed !== false) {
  fail('supabase production writes must remain blocked');
}
if (output.executive_execution_summary.first_controlled_launch_allowed !== false) {
  fail('first_controlled_launch_allowed must remain false');
}
if (output.executive_execution_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.explicit_non_approval_summary.fixture_first_controlled_launch_approval_granted !== false) {
  fail('fixture_first_controlled_launch_approval_granted must remain false');
}
if (!output.first_controlled_launch_blocked_summary.first_controlled_launch_remains_blocked) {
  fail('first_controlled_launch_remains_blocked must be true');
}
if (!output.sandbox_test_mode_activation_blocked_summary.sandbox_test_mode_activation_remains_blocked) {
  fail('sandbox_test_mode_activation_remains_blocked must be true');
}
passAssertion('sandbox_test_mode_activation_remains_blocked');
if (!output.live_activation_blocked_summary.live_activation_remains_blocked) {
  fail('live_activation_remains_blocked must be true');
}
passAssertion('live_activation_remains_blocked');
if (!output.approval_not_granted_summary.approval_not_granted) {
  fail('approval_not_granted_summary.approval_not_granted must be true');
}
passAssertion('approval_not_granted');
if (!output.required_approval_checkpoint_summary.halt_all_execution_until_approval) {
  fail('required_approval_checkpoint_summary.halt_all_execution_until_approval must be true');
}
if (!output.audit_timeline_expectations_summary.all_items_have_audit_event_id) {
  fail('all execution items must have audit event id');
}
if (!output.owner_routing_issues_summary.all_failures_routed_to_safe_owner) {
  fail('all failures must be routed to safe owner');
}
if (output.execution_runbook_toc_summary.total_areas !== 29) {
  fail('execution_runbook_toc_summary must have 29 areas');
}
if (!output.allowed_actions_before_approval_summary.allowed_action_count) {
  fail('allowed_actions_before_approval_summary must document allowed actions');
}
if (!output.forbidden_actions_before_approval_summary.forbidden_action_count) {
  fail('forbidden_actions_before_approval_summary must document forbidden actions');
}
if (output.observation_window_summary.observation_window_active !== false) {
  fail('observation_window_active must remain false');
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

mustHave(fullReadiness, 'verify-first-paid-pilot-readiness-readonly.js', 'full safe readiness');
mustHave(fullReadiness, 'npm --prefix backend run build', 'full safe readiness');
passAssertion('full_safe_readiness_lane_preserved');

mustHave(fastReadiness, 'verify-safe-readiness.sh', 'fast readiness');
mustHave(fastReadiness, 'demo_ready_with_live_automation_disabled', 'fast readiness');
mustHave(fastReadiness, 'NOT a substitute for full aggregate regression', 'fast readiness');

mustHave(
  aggregate,
  'verify-native-workflow-fixture-first-controlled-launch-execution-runbook-dry-run-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Execution Runbook Dry Run',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');
mustHave(verifierIndex, runnerPath, 'verifier index');
mustHave(verifierIndex, fastReadinessPath, 'verifier index');

for (const ref of PACKET_REFS) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
passAssertion('docs_and_context_wiring_present');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, verifierPath, 'wrapper verifier');
mustHave(wrapper, runnerPath, 'wrapper runner');
mustHave(wrapper, fastReadinessPath, 'wrapper fast readiness');
mustHave(wrapper, 'verify-safe-readiness.sh', 'wrapper full lane reference');
mustHave(wrapper, 'npm --prefix backend run build', 'wrapper backend build');
mustNotHave(
  wrapper,
  'Terminal 1 should run full regression',
  'wrapper must not require full regression before merge',
);

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}
passAssertion('dry_run_wrapper_present_and_safe');
passAssertion('public_go_live_or_production_copy_not_changed_without_approval');

for (const assertion of REQUIRED_ASSERTIONS) {
  if (
    ![
      'first_controlled_launch_execution_runbook_doc_present',
      'fake_data_local_only_scope_present',
      'explicit_non_approval_statement_present',
      'first_controlled_launch_remains_blocked',
      'sandbox_test_mode_activation_remains_blocked',
      'live_activation_remains_blocked',
      'relationship_to_approval_request_packet_present',
      'relationship_to_readiness_lock_present',
      'execution_runbook_toc_present',
      'executive_execution_summary_present',
      'required_approval_checkpoint_present',
      'preflight_checklist_present',
      'operator_roles_ownership_present',
      'channel_execution_sequence_present',
      'sms_execution_present',
      'email_execution_present',
      'call_vapi_execution_present',
      'google_calendar_execution_present',
      'csv_reporting_execution_present',
      'crm_handoff_export_execution_present',
      'lindy_bridge_execution_present',
      'scheduler_dispatcher_execution_present',
      'public_route_webhook_execution_present',
      'supabase_persistence_execution_present',
      'billing_payment_quote_boundary_blocked',
      'monitoring_checklist_present',
      'stop_conditions_present',
      'rollback_sequence_present',
      'audit_timeline_expectations_present',
      'owner_routing_issues_present',
      'observation_window_present',
      'post_run_review_checklist_present',
      'allowed_actions_before_approval_present',
      'forbidden_actions_before_approval_present',
      'approval_not_granted',
      'fast_lane_reference_present',
      'runner_outputs_valid_json',
      'execution_items_have_common_fields',
      'execution_items_remain_dry_run_only',
      'execution_items_have_activation_flags_false',
      'execution_decisions_blocked_until_explicit_approval',
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
      'demo_ready_with_live_automation_disabled_preserved',
      'full_safe_readiness_lane_preserved',
      'docs_and_context_wiring_present',
      'dry_run_wrapper_present_and_safe',
      'public_go_live_or_production_copy_not_changed_without_approval',
    ].includes(assertion)
  ) {
    fail(`unhandled assertion: ${assertion}`);
  }
}

console.log(
  `PASS: Native Workflow Fixture First Controlled Launch Execution Runbook Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);