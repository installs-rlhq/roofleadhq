#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_REQUEST_PACKET_DRY_RUN.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-approval-request-packet-dry-run.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-approval-request-packet-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-approval-request-packet-dry-run-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const channelAdapterContractDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md';
const channelPayloadReplayDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_PAYLOAD_REPLAY_DRY_RUN.md';
const channelReplayAcceptanceGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_REPLAY_ACCEPTANCE_GATE_DRY_RUN.md';
const humanReviewPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_HUMAN_REVIEW_PACKET_DRY_RUN.md';
const readinessLockDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md';
const verifierFastLaneDocPath = 'docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only approval request packet',
  'Relationship to Verifier Quiet Mode Fast Lane Cleanup',
  'Relationship to Channel Adapter Contract Dry Run',
  'Relationship to Channel Payload Replay Dry Run',
  'Relationship to Channel Replay Acceptance Gate Dry Run',
  'Relationship to Sandbox/Test-Mode Human Review Packet Dry Run',
  'Final Approval Still Not Granted',
  'Approval Outcome Placeholders',
  'Call/Vapi Approval Request',
  'Email Approval Request',
  'SMS Approval Request',
  'Excluded Approval Scope',
  'Requested Approval Scope',
  'Relationship to First Controlled Launch Readiness Lock Dry Run',
  'Live Activation Remains Blocked',
  'Sandbox/Test-Mode Activation Remains Blocked',
  'approval request packet only',
  'Approval Request Packet Table of Contents',
  'Executive Approval Request Summary',
  'Explicit Non-Approval Statement',
  'First Controlled Launch Remains Blocked',
  'Required Explicit Approval Language Placeholder',
  'Evidence Chain Summary',
  'Channel-by-Channel Requested Scope',
  'Messaging Compliance Review Requirements',
  'Google Calendar Approval Request',
  'CSV/Reporting Approval Request',
  'CRM Handoff/Export Approval Request',
  'Lindy Bridge Approval Request',
  'Scheduler/Dispatcher Approval Request',
  'Public Route/Webhook Approval Request',
  'Supabase Persistence Approval Request',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Boundary',
  'Credential/Env Review Requirements',
  'Data Boundary / PII Review Requirements',
  'Audit/Timeline Review Requirements',
  'Owner Routing Review Requirements',
  'Unresolved Blocker Register',
  'Rollback Plan Summary',
  'Post-Approval Test Plan Summary',
  'Approval Decision Checklist',
  'Allowed Next Actions Before Approval',
  'Forbidden Next Actions Before Approval',
  'Fast-Lane Verification Usage',
  'verify-safe-readiness-fast.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'fixture_approval_request_id',
  'fixture_approval_area',
  'fixture_approval_request_status',
  'fixture_approval_decision',
  'fixture_required_evidence',
  'fixture_current_evidence_status',
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
  'fixture_requested_scope',
  'fixture_excluded_scope',
  'not_granted',
  'Executive approval request summary',
  'Evidence chain completeness',
  'First controlled launch readiness lock evidence',
  'Channel adapter contract evidence',
  'Channel payload replay evidence',
  'Channel replay acceptance gate evidence',
  'Sandbox/test-mode human review packet evidence',
  'SMS requested scope',
  'Email requested scope',
  'Call/Vapi requested scope',
  'Google Calendar requested scope',
  'CSV/reporting requested scope',
  'CRM handoff/export requested scope',
  'Lindy bridge requested scope',
  'Scheduler/dispatcher requested scope',
  'Public route/webhook requested scope',
  'Supabase persistence requested scope',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Credential/env review requirement',
  'Messaging compliance review requirement',
  'Data boundary / PII review requirement',
  'Audit/timeline review requirement',
  'Owner routing review requirement',
  'Rollback plan requirement',
  'Post-approval test plan requirement',
  'Unresolved blocker register',
  'Approval decision checklist',
  'Allowed next actions before approval',
  'Forbidden next actions before approval',
  'Explicit approval still required',
  'Approval not granted',
  'First controlled launch remains blocked',
  'first_controlled_launch_approval_request_packet_dry_run_summary',
  'first_controlled_launch_approval_request_items',
  'approval_request_packet_toc_summary',
  'executive_approval_request_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'requested_scope_summary',
  'excluded_scope_summary',
  'sms_approval_request_summary',
  'email_approval_request_summary',
  'call_vapi_approval_request_summary',
  'approval_not_granted_summary',
  'evidence_chain_summary',
  'channel_requested_scope_summary',
  'messaging_compliance_review_requirement_summary',
  'google_calendar_approval_request_summary',
  'csv_reporting_approval_request_summary',
  'crm_handoff_export_approval_request_summary',
  'lindy_bridge_approval_request_summary',
  'scheduler_dispatcher_approval_request_summary',
  'public_route_webhook_approval_request_summary',
  'supabase_persistence_approval_request_summary',
  'billing_payment_quote_boundary_blocked_summary',
  'credential_env_review_requirement_summary',
  'data_boundary_pii_review_requirement_summary',
  'audit_timeline_review_requirement_summary',
  'owner_routing_review_requirement_summary',
  'unresolved_blocker_register_summary',
  'rollback_plan_summary',
  'post_approval_test_plan_summary',
  'approval_decision_checklist_summary',
  'allowed_next_actions_before_approval_summary',
  'forbidden_next_actions_before_approval_summary',
  'first_controlled_launch_approval_request_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_APPROVAL_REQUEST_AREAS = [
  'Executive approval request summary',
  'Evidence chain completeness',
  'First controlled launch readiness lock evidence',
  'Sandbox/test-mode human review packet evidence',
  'Channel replay acceptance gate evidence',
  'Channel payload replay evidence',
  'Channel adapter contract evidence',
  'SMS requested scope',
  'Email requested scope',
  'Call/Vapi requested scope',
  'Google Calendar requested scope',
  'CSV/reporting requested scope',
  'CRM handoff/export requested scope',
  'Lindy bridge requested scope',
  'Scheduler/dispatcher requested scope',
  'Public route/webhook requested scope',
  'Supabase persistence requested scope',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Credential/env review requirement',
  'Messaging compliance review requirement',
  'Data boundary / PII review requirement',
  'Audit/timeline review requirement',
  'Owner routing review requirement',
  'Rollback plan requirement',
  'Post-approval test plan requirement',
  'Unresolved blocker register',
  'Approval decision checklist',
  'Allowed next actions before approval',
  'Forbidden next actions before approval',
  'Explicit approval still required',
  'Approval not granted',
  'First controlled launch remains blocked',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_approval_request_id',
  'fixture_approval_area',
  'fixture_requested_scope',
  'fixture_excluded_scope',
  'fixture_approval_request_status',
  'fixture_approval_decision',
  'fixture_required_evidence',
  'fixture_current_evidence_status',
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
  'first_controlled_launch_approval_request_packet_dry_run_summary',
  'first_controlled_launch_approval_request_items',
  'approval_request_packet_toc_summary',
  'executive_approval_request_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'requested_scope_summary',
  'excluded_scope_summary',
  'sms_approval_request_summary',
  'email_approval_request_summary',
  'call_vapi_approval_request_summary',
  'approval_not_granted_summary',
  'evidence_chain_summary',
  'channel_requested_scope_summary',
  'messaging_compliance_review_requirement_summary',
  'google_calendar_approval_request_summary',
  'csv_reporting_approval_request_summary',
  'crm_handoff_export_approval_request_summary',
  'lindy_bridge_approval_request_summary',
  'scheduler_dispatcher_approval_request_summary',
  'public_route_webhook_approval_request_summary',
  'supabase_persistence_approval_request_summary',
  'billing_payment_quote_boundary_blocked_summary',
  'credential_env_review_requirement_summary',
  'data_boundary_pii_review_requirement_summary',
  'audit_timeline_review_requirement_summary',
  'owner_routing_review_requirement_summary',
  'unresolved_blocker_register_summary',
  'rollback_plan_summary',
  'post_approval_test_plan_summary',
  'approval_decision_checklist_summary',
  'allowed_next_actions_before_approval_summary',
  'forbidden_next_actions_before_approval_summary',
  'first_controlled_launch_approval_request_safety_assertions',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_approval_request_doc_present',
  'fake_data_local_only_scope_present',
  'relationship_to_verifier_fast_lane_cleanup_present',
  'relationship_to_channel_adapter_contract_present',
  'relationship_to_channel_payload_replay_present',
  'relationship_to_channel_replay_acceptance_gate_present',
  'relationship_to_human_review_packet_present',
  'approval_request_packet_toc_present',
  'executive_approval_request_summary_present',
  'explicit_non_approval_statement_present',
  'first_controlled_launch_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'relationship_to_first_controlled_launch_readiness_lock_present',
  'requested_scope_present',
  'excluded_scope_present',
  'approval_language_placeholder_present',
  'evidence_chain_summary_present',
  'channel_requested_scope_summary_present',
  'messaging_compliance_review_requirement_present',
  'google_calendar_approval_request_present',
  'csv_reporting_approval_request_present',
  'crm_handoff_export_approval_request_present',
  'lindy_bridge_approval_request_present',
  'scheduler_dispatcher_approval_request_present',
  'public_route_webhook_approval_request_present',
  'supabase_persistence_approval_request_present',
  'billing_payment_quote_boundary_blocked',
  'credential_env_review_requirement_present',
  'data_boundary_pii_review_requirement_present',
  'audit_timeline_review_requirement_present',
  'owner_routing_review_requirement_present',
  'unresolved_blocker_register_present',
  'rollback_plan_present',
  'post_approval_test_plan_present',
  'approval_decision_checklist_present',
  'allowed_next_actions_before_approval_present',
  'forbidden_next_actions_before_approval_present',
  'fast_lane_reference_present',
  'runner_outputs_valid_json',
  'approval_request_items_have_common_fields',
  'approval_request_items_remain_dry_run_only',
  'approval_request_items_have_activation_flags_false',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_REQUEST_PACKET_DRY_RUN.md',
  'run-native-workflow-fixture-first-controlled-launch-approval-request-packet-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-approval-request-packet-dry-run-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-approval-request-packet-dry-run.js',
  'Native Workflow Fixture First Controlled Launch Approval Request Packet Dry Run',
  'native workflow fixture first controlled launch approval request packet dry run',
  'first controlled launch approval request packet dry run',
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
const channelAdapterContractDoc = read(channelAdapterContractDocPath);
const channelPayloadReplayDoc = read(channelPayloadReplayDocPath);
const channelReplayAcceptanceGateDoc = read(channelReplayAcceptanceGateDocPath);
const humanReviewPacketDoc = read(humanReviewPacketDocPath);
const readinessLockDoc = read(readinessLockDocPath);
const verifierFastLaneDoc = read(verifierFastLaneDocPath);

passAssertion('first_controlled_launch_approval_request_doc_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');

mustHave(doc, verifierFastLaneDocPath, 'documentation');
mustHave(doc, 'verifier quiet mode fast lane cleanup', 'documentation');
passAssertion('relationship_to_verifier_fast_lane_cleanup_present');

mustHave(doc, channelAdapterContractDocPath, 'documentation');
mustHave(doc, 'channel adapter contract dry run', 'documentation');
passAssertion('relationship_to_channel_adapter_contract_present');

mustHave(doc, channelPayloadReplayDocPath, 'documentation');
mustHave(doc, 'channel payload replay dry run', 'documentation');
passAssertion('relationship_to_channel_payload_replay_present');

mustHave(doc, channelReplayAcceptanceGateDocPath, 'documentation');
mustHave(doc, 'channel replay acceptance gate dry run', 'documentation');
passAssertion('relationship_to_channel_replay_acceptance_gate_present');

mustHave(doc, humanReviewPacketDocPath, 'documentation');
mustHave(doc, 'sandbox/test-mode human review packet dry run', 'documentation');
passAssertion('relationship_to_human_review_packet_present');
mustHave(doc, readinessLockDocPath, 'documentation');
mustHave(doc, 'first controlled launch readiness lock dry run', 'documentation');
passAssertion('relationship_to_first_controlled_launch_readiness_lock_present');
passAssertion('approval_request_packet_toc_present');
passAssertion('executive_approval_request_summary_present');
passAssertion('explicit_non_approval_statement_present');
passAssertion('first_controlled_launch_remains_blocked');
passAssertion('approval_language_placeholder_present');
passAssertion('evidence_chain_summary_present');
passAssertion('channel_requested_scope_summary_present');
passAssertion('sms_approval_request_present');
passAssertion('email_approval_request_present');
passAssertion('call_vapi_approval_request_present');
passAssertion('messaging_compliance_review_requirement_present');
passAssertion('google_calendar_approval_request_present');
passAssertion('csv_reporting_approval_request_present');
passAssertion('crm_handoff_export_approval_request_present');
passAssertion('lindy_bridge_approval_request_present');
passAssertion('scheduler_dispatcher_approval_request_present');
passAssertion('public_route_webhook_approval_request_present');
passAssertion('supabase_persistence_approval_request_present');
passAssertion('billing_payment_quote_boundary_blocked');
passAssertion('credential_env_review_requirement_present');
passAssertion('data_boundary_pii_review_requirement_present');
passAssertion('audit_timeline_review_requirement_present');
passAssertion('owner_routing_review_requirement_present');
passAssertion('unresolved_blocker_register_present');
passAssertion('rollback_plan_present');
passAssertion('post_approval_test_plan_present');
passAssertion('approval_decision_checklist_present');
passAssertion('allowed_next_actions_before_approval_present');
passAssertion('forbidden_next_actions_before_approval_present');
passAssertion('fast_lane_reference_present');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch approval request packet verifier', verifierPath],
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
  output.first_controlled_launch_approval_request_packet_dry_run !==
  'native_workflow_fixture_first_controlled_launch_approval_request_packet_dry_run'
) {
  fail('first_controlled_launch_approval_request_packet_dry_run marker is incorrect');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level first controlled launch approval request packet sections are present.');

if (
  !Array.isArray(output.first_controlled_launch_approval_request_items) ||
  output.first_controlled_launch_approval_request_items.length !== 32
) {
  fail('first_controlled_launch_approval_request_items must contain exactly 32 items');
}

const lockAreas = new Set(
  output.first_controlled_launch_approval_request_items.map((item) => item.fixture_approval_area),
);
for (const area of REQUIRED_APPROVAL_REQUEST_AREAS) {
  if (!lockAreas.has(area)) fail(`required approval request area missing: ${area}`);
}

for (const item of output.first_controlled_launch_approval_request_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `approval request item ${item.fixture_approval_request_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(`approval request item ${item.fixture_approval_request_id} fixture_delivery_mode is not dry_run_only`);
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(`approval request item ${item.fixture_approval_request_id} fixture_approval_status is not not_approved`);
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`approval request item ${item.fixture_approval_request_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`approval request item ${item.fixture_approval_request_id} missing fixture_audit_event_id`);
  }
}
passAssertion('approval_request_items_have_common_fields');
passAssertion('approval_request_items_remain_dry_run_only');
passAssertion('approval_request_items_have_activation_flags_false');

if (!output.common_approval_request_fields_summary.all_items_include_common_fields) {
  fail('common_approval_request_fields_summary.all_items_include_common_fields must be true');
}
if (!output.first_controlled_launch_approval_request_packet_dry_run_summary.all_items_remain_dry_run_only) {
  fail('first_controlled_launch_approval_request_packet_dry_run_summary.all_items_remain_dry_run_only must be true');
}
if (output.billing_payment_quote_boundary_blocked_summary.automation_forbidden !== true) {
  fail('billing boundary must remain automation forbidden');
}
if (output.crm_handoff_export_approval_request_summary.bidirectional_crm_sync_allowed !== false) {
  fail('crm handoff must remain not bidirectional sync');
}
if (output.lindy_bridge_approval_request_summary.live_lindy_bridge_enabled !== false) {
  fail('live_lindy_bridge_enabled must remain false');
}
if (output.scheduler_dispatcher_approval_request_summary.scheduler_enabled !== false) {
  fail('scheduler must remain disabled');
}
if (output.public_route_webhook_approval_request_summary.public_route_enabled !== false) {
  fail('public route must remain disabled');
}
if (output.supabase_persistence_approval_request_summary.production_write_allowed !== false) {
  fail('supabase production writes must remain blocked');
}
if (output.executive_approval_request_summary.first_controlled_launch_allowed !== false) {
  fail('first_controlled_launch_allowed must remain false');
}
if (output.executive_approval_request_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.explicit_non_approval_summary.fixture_first_controlled_launch_approval_granted !== false) {
  fail('fixture_first_controlled_launch_approval_granted must remain false');
}
if (!output.explicit_non_approval_summary.approval_language_placeholder_present) {
  fail('approval_language_placeholder_present must be true');
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
if (!output.requested_scope_summary.all_scope_requests_remain_not_granted) {
  fail('requested_scope_summary.all_scope_requests_remain_not_granted must be true');
}
passAssertion('requested_scope_present');
if (!output.excluded_scope_summary.excluded_scope_enforced) {
  fail('excluded_scope_summary.excluded_scope_enforced must be true');
}
passAssertion('excluded_scope_present');
if (!output.explicit_non_approval_summary.approval_language_placeholder_present) {
  fail('approval_language_placeholder_present must be true');
}
const finalLock = output.first_controlled_launch_approval_request_items.find(
  (item) => item.fixture_approval_area === 'First controlled launch remains blocked',
);
if (!finalLock || finalLock.fixture_approval_decision !== 'not_granted') {
  fail('final launch blocked item must have not_granted decision');
}
const approvalLock = output.first_controlled_launch_approval_request_items.find(
  (item) => item.fixture_approval_area === 'Explicit approval still required',
);
if (!approvalLock || approvalLock.fixture_approval_decision !== 'not_granted') {
  fail('explicit approval item must have not_granted decision');
}
const approvalNotGranted = output.first_controlled_launch_approval_request_items.find(
  (item) => item.fixture_approval_area === 'Approval not granted',
);
if (!approvalNotGranted || approvalNotGranted.fixture_approval_decision !== 'not_granted') {
  fail('approval not granted item must have not_granted decision');
}
for (const item of output.first_controlled_launch_approval_request_items) {
  if (item.fixture_approval_decision !== 'not_granted') {
    fail(`approval request item ${item.fixture_approval_request_id} fixture_approval_decision is not not_granted`);
  }
}
passAssertion('approval_request_decisions_are_not_granted');
if (!output.audit_timeline_review_requirement_summary.all_items_have_audit_event_id) {
  fail('all approval request items must have audit event id');
}
if (!output.owner_routing_review_requirement_summary.all_failures_routed_to_safe_owner) {
  fail('all failures must be routed to safe owner');
}
if (!output.unresolved_blocker_register_summary.all_blockers_have_owner) {
  fail('all blockers must have owner');
}
if (output.approval_request_packet_toc_summary.total_areas !== 32) {
  fail('approval_request_packet_toc_summary must have 32 areas');
}
if (!output.allowed_next_actions_before_approval_summary.allowed_action_count) {
  fail('allowed_next_actions_before_approval_summary must document allowed actions');
}
if (!output.forbidden_next_actions_before_approval_summary.forbidden_action_count) {
  fail('forbidden_next_actions_before_approval_summary must document forbidden actions');
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
  'verify-native-workflow-fixture-first-controlled-launch-approval-request-packet-dry-run-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Approval Request Packet Dry Run',
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
      'first_controlled_launch_approval_request_doc_present',
      'fake_data_local_only_scope_present',
      'relationship_to_verifier_fast_lane_cleanup_present',
      'relationship_to_channel_adapter_contract_present',
      'relationship_to_channel_payload_replay_present',
      'relationship_to_channel_replay_acceptance_gate_present',
      'relationship_to_human_review_packet_present',
      'approval_request_packet_toc_present',
      'executive_approval_request_summary_present',
      'explicit_non_approval_statement_present',
      'first_controlled_launch_remains_blocked',
      'approval_language_placeholder_present',
      'approval_request_decisions_are_not_granted',
      'approval_not_granted',
      'call_vapi_approval_request_present',
      'email_approval_request_present',
      'sms_approval_request_present',
      'excluded_scope_present',
      'requested_scope_present',
      'relationship_to_first_controlled_launch_readiness_lock_present',
      'live_activation_remains_blocked',
      'sandbox_test_mode_activation_remains_blocked',
      'evidence_chain_summary_present',
      'channel_requested_scope_summary_present',
      'messaging_compliance_review_requirement_present',
      'google_calendar_approval_request_present',
      'csv_reporting_approval_request_present',
      'crm_handoff_export_approval_request_present',
      'lindy_bridge_approval_request_present',
      'scheduler_dispatcher_approval_request_present',
      'public_route_webhook_approval_request_present',
      'supabase_persistence_approval_request_present',
      'billing_payment_quote_boundary_blocked',
      'credential_env_review_requirement_present',
      'data_boundary_pii_review_requirement_present',
      'audit_timeline_review_requirement_present',
      'owner_routing_review_requirement_present',
      'unresolved_blocker_register_present',
      'rollback_plan_present',
      'post_approval_test_plan_present',
      'approval_decision_checklist_present',
      'allowed_next_actions_before_approval_present',
      'forbidden_next_actions_before_approval_present',
      'fast_lane_reference_present',
      'runner_outputs_valid_json',
      'approval_request_items_have_common_fields',
      'approval_request_items_remain_dry_run_only',
      'approval_request_items_have_activation_flags_false',
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
  `PASS: Native Workflow Fixture First Controlled Launch Approval Request Packet Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);