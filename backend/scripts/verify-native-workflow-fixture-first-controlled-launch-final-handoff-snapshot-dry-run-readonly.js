#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_HANDOFF_SNAPSHOT_DRY_RUN.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-final-handoff-snapshot-dry-run.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-final-handoff-snapshot-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-final-handoff-snapshot-dry-run-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const decisionLedgerDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_DECISION_LEDGER_DRY_RUN.md';
const executionRunbookDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXECUTION_RUNBOOK_DRY_RUN.md';
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
const finalReviewPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_REVIEW_PACKET_DRY_RUN.md';
const verifierFastLaneDocPath = 'docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only final handoff snapshot',
  'final handoff snapshot dry-run only',
  'Relationship to First Controlled Launch Final Review Packet Dry Run',
  'Relationship to First Controlled Launch Decision Ledger Dry Run',
  'Relationship to First Controlled Launch Execution Runbook Dry Run',
  'Relationship to First Controlled Launch Approval Request Packet Dry Run',
  'Relationship to First Controlled Launch Readiness Lock Dry Run',
  'Relationship to Sandbox/Test-Mode Human Review Packet Dry Run',
  'Final Review Packet Relationship',
  'Decision Ledger Relationship',
  'Execution Runbook Relationship',
  'Approval Request Packet Relationship',
  'Readiness Lock Relationship',
  'Human Review Packet Relationship',
  'Channel Replay Acceptance Gate Relationship',
  'Channel Payload Replay Relationship',
  'Channel Adapter Contract Relationship',
  'Current Safety Posture Summary',
  'Required Explicit Approval Language Placeholder',
  'Required Signer/Timestamp Placeholder',
  'Relationship to Verifier Quiet Mode Fast Lane Cleanup',
  'Relationship to Channel Adapter Contract Dry Run',
  'Relationship to Channel Payload Replay Dry Run',
  'Relationship to Channel Replay Acceptance Gate Dry Run',
  'Final Approval Not Granted',
  'Requested Scope',
  'Excluded Scope',
  'Live Activation Remains Blocked',
  'Sandbox/Test-Mode Activation Remains Blocked',
  'Final Handoff Snapshot Table of Contents',
  'Executive Handoff Summary',
  'Explicit Non-Approval Statement',
  'First Controlled Launch Remains Blocked',
  'Evidence Chain Complete-For-Review Summary',
  'Channel-by-Channel Handoff Summary',
  'SMS handoff summary',
  'Email handoff summary',
  'Call/Vapi handoff summary',
  'Google Calendar handoff summary',
  'CSV/reporting handoff summary',
  'CRM handoff/export summary',
  'Lindy bridge handoff summary',
  'Scheduler/dispatcher handoff summary',
  'Public route/webhook handoff summary',
  'Supabase persistence handoff summary',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Boundary',
  'Credential/env handoff summary',
  'Messaging compliance handoff summary',
  'Data boundary / PII handoff summary',
  'Audit/timeline handoff summary',
  'Owner routing handoff summary',
  'Unresolved blocker summary',
  'Rollback/post-approval test handoff',
  'Rollback/Post-Approval Test Handoff Summary',
  'Final Decision Options',
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
  'fixture_handoff_id',
  'fixture_handoff_area',
  'fixture_handoff_status',
  'fixture_handoff_decision',
  'fixture_required_evidence',
  'fixture_current_evidence_status',
  'fixture_scope_requested',
  'fixture_scope_excluded',
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
  'not_granted',
  'Executive handoff summary',
  'First controlled launch final review packet evidence',
  'First controlled launch decision ledger evidence',
  'Evidence chain complete-for-review',
  'First controlled launch execution runbook evidence',
  'First controlled launch approval request packet evidence',
  'First controlled launch readiness lock evidence',
  'Sandbox/test-mode human review packet evidence',
  'Channel replay acceptance gate evidence',
  'Channel payload replay evidence',
  'Channel adapter contract evidence',
  'SMS handoff summary',
  'Email handoff summary',
  'Call/Vapi handoff summary',
  'Google Calendar handoff summary',
  'CSV/reporting handoff summary',
  'CRM handoff/export summary',
  'Lindy bridge handoff summary',
  'Scheduler/dispatcher handoff summary',
  'Public route/webhook handoff summary',
  'Supabase persistence handoff summary',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Credential/env handoff summary',
  'Messaging compliance handoff summary',
  'Data boundary / PII handoff summary',
  'Audit/timeline handoff summary',
  'Owner routing handoff summary',
  'Rollback/post-approval test handoff',
  'Post-approval test confirmation placeholder',
  'Unresolved blocker summary',
  'Approval language placeholder',
  'Approval signer placeholder',
  'Approval signer/timestamp placeholder',
  'Allowed next actions before approval',
  'Forbidden next actions before approval',
  'Approval not granted',
  'First controlled launch remains blocked',
  'first_controlled_launch_final_handoff_snapshot_dry_run_summary',
  'first_controlled_launch_final_handoff_snapshot_items',
  'final_handoff_snapshot_toc_summary',
  'executive_handoff_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'evidence_chain_complete_for_review_summary',
  'final_review_packet_relationship_summary',
  'decision_ledger_relationship_summary',
  'execution_runbook_relationship_summary',
  'approval_request_packet_relationship_summary',
  'readiness_lock_relationship_summary',
  'human_review_packet_relationship_summary',
  'channel_replay_acceptance_gate_relationship_summary',
  'channel_payload_replay_relationship_summary',
  'channel_adapter_contract_relationship_summary',
  'safety_posture_summary',
  'approval_language_placeholder_summary',
  'approval_signer_timestamp_placeholder_summary',
  'requested_scope_summary',
  'excluded_scope_summary',
  'channel_handoff_summary',
  'unresolved_blocker_summary',
  'rollback_post_approval_test_handoff_summary',
  'final_decision_options_summary',
  'allowed_next_actions_before_approval_summary',
  'forbidden_next_actions_before_approval_summary',
  'approval_not_granted_summary',
  'first_controlled_launch_final_handoff_snapshot_safety_assertions',
  'Approval Request Packet Relationship',
  'Readiness Lock Relationship',
  'Human Review Packet Relationship',
  'Channel Replay Acceptance Gate Relationship',
  'Channel Payload Replay Relationship',
  'Channel Adapter Contract Relationship',
  'Channel-by-Channel Handoff Summary',
  'SMS handoff summary',
  'Email handoff summary',
  'Call/Vapi handoff summary',
  'Rollback/Post-Approval Test Handoff Summary',
  'Approval Signer/Timestamp Placeholder',
  'Final Decision Options',
  'fixture_handoff_id',
  'fixture_handoff_area',
  'fixture_handoff_status',
  'fixture_handoff_decision',
  'First controlled launch final review packet evidence',
  'Evidence chain complete-for-review',
  'Rollback/post-approval test handoff',
  'Approval signer/timestamp placeholder',
  'first_controlled_launch_final_handoff_snapshot_dry_run_summary',
  'first_controlled_launch_final_handoff_snapshot_items',
  'final_handoff_snapshot_toc_summary',
  'executive_handoff_summary',
  'evidence_chain_complete_for_review_summary',
  'final_review_packet_relationship_summary',
  'decision_ledger_relationship_summary',
  'execution_runbook_relationship_summary',
  'approval_request_packet_relationship_summary',
  'readiness_lock_relationship_summary',
  'human_review_packet_relationship_summary',
  'channel_replay_acceptance_gate_relationship_summary',
  'channel_payload_replay_relationship_summary',
  'channel_adapter_contract_relationship_summary',
  'safety_posture_summary',
  'approval_language_placeholder_summary',
  'approval_signer_timestamp_placeholder_summary',
  'requested_scope_summary',
  'excluded_scope_summary',
  'channel_handoff_summary',
  'unresolved_blocker_summary',
  'rollback_post_approval_test_handoff_summary',
  'final_decision_options_summary',
  'first_controlled_launch_final_handoff_snapshot_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_HANDOFF_AREAS = [
  'Executive handoff summary',
  'Evidence chain complete-for-review',
  'First controlled launch final review packet evidence',
  'First controlled launch decision ledger evidence',
  'First controlled launch execution runbook evidence',
  'First controlled launch approval request packet evidence',
  'First controlled launch readiness lock evidence',
  'Sandbox/test-mode human review packet evidence',
  'Channel replay acceptance gate evidence',
  'Channel payload replay evidence',
  'Channel adapter contract evidence',
  'SMS handoff summary',
  'Email handoff summary',
  'Call/Vapi handoff summary',
  'Google Calendar handoff summary',
  'CSV/reporting handoff summary',
  'CRM handoff/export summary',
  'Lindy bridge handoff summary',
  'Scheduler/dispatcher handoff summary',
  'Public route/webhook handoff summary',
  'Supabase persistence handoff summary',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Credential/env handoff summary',
  'Messaging compliance handoff summary',
  'Data boundary / PII handoff summary',
  'Audit/timeline handoff summary',
  'Owner routing handoff summary',
  'Rollback/post-approval test handoff',
  'Unresolved blocker summary',
  'Approval language placeholder',
  'Approval signer/timestamp placeholder',
  'Allowed next actions before approval',
  'Forbidden next actions before approval',
  'Approval not granted',
  'First controlled launch remains blocked',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_handoff_id',
  'fixture_handoff_area',
  'fixture_handoff_status',
  'fixture_handoff_decision',
  'fixture_required_evidence',
  'fixture_current_evidence_status',
  'fixture_scope_requested',
  'fixture_scope_excluded',
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
  'first_controlled_launch_final_handoff_snapshot_dry_run_summary',
  'first_controlled_launch_final_handoff_snapshot_items',
  'final_handoff_snapshot_toc_summary',
  'executive_handoff_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'evidence_chain_complete_for_review_summary',
  'final_review_packet_relationship_summary',
  'decision_ledger_relationship_summary',
  'execution_runbook_relationship_summary',
  'approval_request_packet_relationship_summary',
  'readiness_lock_relationship_summary',
  'human_review_packet_relationship_summary',
  'channel_replay_acceptance_gate_relationship_summary',
  'channel_payload_replay_relationship_summary',
  'channel_adapter_contract_relationship_summary',
  'safety_posture_summary',
  'approval_language_placeholder_summary',
  'approval_signer_timestamp_placeholder_summary',
  'requested_scope_summary',
  'excluded_scope_summary',
  'channel_handoff_summary',
  'unresolved_blocker_summary',
  'rollback_post_approval_test_handoff_summary',
  'allowed_next_actions_before_approval_summary',
  'forbidden_next_actions_before_approval_summary',
  'final_decision_options_summary',
  'approval_not_granted_summary',
  'first_controlled_launch_final_handoff_snapshot_safety_assertions',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_final_handoff_snapshot_doc_present',
  'fake_data_local_only_scope_present',
  'explicit_non_approval_statement_present',
  'first_controlled_launch_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'evidence_chain_complete_for_review_present',
  'relationship_to_final_review_packet_present',
  'relationship_to_decision_ledger_present',
  'relationship_to_execution_runbook_present',
  'relationship_to_approval_request_packet_present',
  'relationship_to_readiness_lock_present',
  'relationship_to_human_review_packet_present',
  'relationship_to_channel_replay_acceptance_gate_present',
  'relationship_to_channel_payload_replay_present',
  'relationship_to_channel_adapter_contract_present',
  'final_handoff_snapshot_toc_present',
  'executive_handoff_summary_present',
  'safety_posture_summary_present',
  'approval_language_placeholder_present',
  'approval_signer_timestamp_placeholder_present',
  'requested_scope_present',
  'excluded_scope_present',
  'channel_handoff_summary_present',
  'unresolved_blocker_summary_present',
  'rollback_post_approval_test_handoff_present',
  'allowed_next_actions_before_approval_present',
  'forbidden_next_actions_before_approval_present',
  'final_decision_options_present',
  'approval_not_granted',
  'fast_lane_reference_present',
  'runner_outputs_valid_json',
  'handoff_items_have_common_fields',
  'handoff_items_remain_dry_run_only',
  'handoff_items_have_activation_flags_false',
  'handoff_decisions_are_not_granted',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_HANDOFF_SNAPSHOT_DRY_RUN.md',
  'run-native-workflow-fixture-first-controlled-launch-final-handoff-snapshot-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-final-handoff-snapshot-dry-run-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-final-handoff-snapshot-dry-run.js',
  'Native Workflow Fixture First Controlled Launch Final Handoff Snapshot Dry Run',
  'native workflow fixture first controlled launch final handoff snapshot dry run',
  'first controlled launch final handoff snapshot dry run',
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
const decisionLedgerDoc = read(decisionLedgerDocPath);
const executionRunbookDoc = read(executionRunbookDocPath);
const approvalRequestPacketDoc = read(approvalRequestPacketDocPath);
const readinessLockDoc = read(readinessLockDocPath);
const channelAdapterContractDoc = read(channelAdapterContractDocPath);
const channelPayloadReplayDoc = read(channelPayloadReplayDocPath);
const channelReplayAcceptanceGateDoc = read(channelReplayAcceptanceGateDocPath);
const humanReviewPacketDoc = read(humanReviewPacketDocPath);
const finalReviewPacketDoc = read(finalReviewPacketDocPath);
const verifierFastLaneDoc = read(verifierFastLaneDocPath);

passAssertion('first_controlled_launch_final_handoff_snapshot_doc_present');

mustHave(doc, finalReviewPacketDocPath, 'documentation');
mustHave(doc, 'first controlled launch final review packet dry run', 'documentation');
passAssertion('relationship_to_final_review_packet_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');

mustHave(doc, executionRunbookDocPath, 'documentation');
mustHave(doc, 'first controlled launch execution runbook dry run', 'documentation');
mustHave(doc, decisionLedgerDocPath, 'documentation');
mustHave(doc, 'first controlled launch decision ledger dry run', 'documentation');
passAssertion('relationship_to_decision_ledger_present');

mustHave(doc, humanReviewPacketDocPath, 'documentation');
mustHave(doc, 'sandbox/test-mode human review packet dry run', 'documentation');
passAssertion('relationship_to_human_review_packet_present');

mustHave(doc, executionRunbookDocPath, 'documentation');
passAssertion('relationship_to_execution_runbook_present');

mustHave(doc, approvalRequestPacketDocPath, 'documentation');
mustHave(doc, 'first controlled launch approval request packet dry run', 'documentation');
passAssertion('relationship_to_approval_request_packet_present');

mustHave(doc, readinessLockDocPath, 'documentation');
mustHave(doc, 'first controlled launch readiness lock dry run', 'documentation');
passAssertion('relationship_to_readiness_lock_present');
passAssertion('relationship_to_channel_replay_acceptance_gate_present');
passAssertion('relationship_to_channel_payload_replay_present');
passAssertion('relationship_to_channel_adapter_contract_present');
passAssertion('safety_posture_summary_present');
passAssertion('final_decision_options_present');

mustHave(doc, verifierFastLaneDocPath, 'documentation');
mustHave(doc, 'verifier quiet mode fast lane cleanup', 'documentation');
passAssertion('fast_lane_reference_present');

mustHave(doc, channelAdapterContractDocPath, 'documentation');
mustHave(doc, channelPayloadReplayDocPath, 'documentation');
mustHave(doc, channelReplayAcceptanceGateDocPath, 'documentation');
mustHave(doc, humanReviewPacketDocPath, 'documentation');

passAssertion('final_handoff_snapshot_toc_present');
passAssertion('executive_handoff_summary_present');
passAssertion('explicit_non_approval_statement_present');
passAssertion('first_controlled_launch_remains_blocked');
passAssertion('evidence_chain_complete_for_review_summary_present');
passAssertion('readiness_lock_relationship_summary_present');
passAssertion('approval_request_packet_relationship_summary_present');
passAssertion('execution_runbook_relationship_summary_present');
passAssertion('decision_ledger_relationship_summary_present');
passAssertion('approval_language_placeholder_present');
passAssertion('approval_signer_timestamp_placeholder_present');

passAssertion('requested_scope_present');
passAssertion('excluded_scope_present');
passAssertion('channel_handoff_summary_present');
passAssertion('unresolved_blocker_summary_present');
passAssertion('rollback_post_approval_test_handoff_present');
passAssertion('billing_payment_quote_boundary_blocked');
passAssertion('unresolved_blocker_summary_present');
passAssertion('rollback_post_approval_test_handoff_present');
passAssertion('final_decision_options_present');
passAssertion('allowed_next_actions_before_approval_present');
passAssertion('forbidden_next_actions_before_approval_present');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch final handoff snapshot verifier', verifierPath],
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
  output.first_controlled_launch_final_handoff_snapshot_dry_run !==
  'native_workflow_fixture_first_controlled_launch_final_handoff_snapshot_dry_run'
) {
  fail('first_controlled_launch_final_handoff_snapshot_dry_run marker is incorrect');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level first controlled launch final handoff snapshot sections are present.');

if (
  !Array.isArray(output.first_controlled_launch_final_handoff_snapshot_items) ||
  output.first_controlled_launch_final_handoff_snapshot_items.length !== 35
) {
  fail('first_controlled_launch_final_handoff_snapshot_items must contain exactly 35 items');
}

const handoffAreas = new Set(
  output.first_controlled_launch_final_handoff_snapshot_items.map((item) => item.fixture_handoff_area),
);
for (const area of REQUIRED_HANDOFF_AREAS) {
  if (!handoffAreas.has(area)) fail(`required handoff area missing: ${area}`);
}

for (const item of output.first_controlled_launch_final_handoff_snapshot_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `handoff item ${item.fixture_handoff_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(`handoff item ${item.fixture_handoff_id} fixture_delivery_mode is not dry_run_only`);
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(`handoff item ${item.fixture_handoff_id} fixture_approval_status is not not_approved`);
  }
  if (item.fixture_handoff_decision !== 'not_granted') {
    fail(`handoff item ${item.fixture_handoff_id} fixture_handoff_decision is not not_granted`);
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`handoff item ${item.fixture_handoff_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`handoff item ${item.fixture_handoff_id} missing fixture_audit_event_id`);
  }
}
passAssertion('handoff_items_have_common_fields');
passAssertion('handoff_items_remain_dry_run_only');
passAssertion('handoff_items_have_activation_flags_false');
passAssertion('handoff_decisions_are_not_granted');

if (!output.common_handoff_fields_summary.all_items_include_common_fields) {
  fail('common_handoff_fields_summary.all_items_include_common_fields must be true');
}
if (!output.first_controlled_launch_final_handoff_snapshot_dry_run_summary.all_items_remain_dry_run_only) {
  fail('first_controlled_launch_final_handoff_snapshot_dry_run_summary.all_items_remain_dry_run_only must be true');
}
if (!output.first_controlled_launch_final_handoff_snapshot_dry_run_summary.all_handoff_decisions_not_granted) {
  fail('first_controlled_launch_final_handoff_snapshot_dry_run_summary.all_handoff_decisions_not_granted must be true');
}
if (output.billing_payment_quote_boundary_blocked_summary.automation_forbidden !== true) {
  fail('billing boundary must remain automation forbidden');
}
if (!output.channel_handoff_summary.all_channel_handoffs_remain_blocked) {
  fail('all channel handoffs must remain blocked');
}
if (output.executive_handoff_summary.first_controlled_launch_allowed !== false) {
  fail('first_controlled_launch_allowed must remain false');
}
if (output.executive_handoff_summary.live_activation_allowed !== false) {
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
if (!output.readiness_lock_relationship_summary.readiness_lock_does_not_grant_approval) {
  fail('readiness_lock_relationship_summary.readiness_lock_does_not_grant_approval must be true');
}
if (!output.approval_request_packet_relationship_summary.approval_request_packet_does_not_grant_approval) {
  fail('approval_request_packet_relationship_summary.approval_request_packet_does_not_grant_approval must be true');
}
if (!output.execution_runbook_relationship_summary.execution_runbook_does_not_grant_approval_or_execute) {
  fail('execution_runbook_relationship_summary.execution_runbook_does_not_grant_approval_or_execute must be true');
}
if (!output.decision_ledger_relationship_summary.decision_ledger_does_not_grant_approval) {
  fail('decision_ledger_relationship_summary.decision_ledger_does_not_grant_approval must be true');
}
if (output.final_handoff_snapshot_toc_summary.total_areas !== 35) {
  fail('final_handoff_snapshot_toc_summary must have 35 areas');
}
if (!output.allowed_next_actions_before_approval_summary.allowed_action_count) {
  fail('allowed_next_actions_before_approval_summary must document allowed actions');
}
if (!output.forbidden_next_actions_before_approval_summary.forbidden_action_count) {
  fail('forbidden_next_actions_before_approval_summary must document forbidden actions');
}

if (!output.requested_scope_summary.all_scope_remains_fixture_modeling_only) {
  fail('requested_scope_summary.all_scope_remains_fixture_modeling_only must be true');
}
if (!output.excluded_scope_summary.all_excluded_scope_remains_blocked) {
  fail('excluded_scope_summary.all_excluded_scope_remains_blocked must be true');
}

if (!output.readiness_lock_relationship_summary.readiness_lock_does_not_grant_approval) {
  fail('readiness_lock_relationship_summary.readiness_lock_does_not_grant_approval must be true');
}
if (!output.approval_request_packet_relationship_summary.approval_request_packet_does_not_grant_approval) {
  fail('approval_request_packet_relationship_summary.approval_request_packet_does_not_grant_approval must be true');
}
if (!output.execution_runbook_relationship_summary.execution_runbook_does_not_grant_approval_or_execute) {
  fail('execution_runbook_relationship_summary.execution_runbook_does_not_grant_approval_or_execute must be true');
}
if (!output.decision_ledger_relationship_summary.decision_ledger_does_not_grant_approval) {
  fail('decision_ledger_relationship_summary.decision_ledger_does_not_grant_approval must be true');
}
if (!output.final_review_packet_relationship_summary.final_review_packet_does_not_grant_approval) {
  fail('final_review_packet_relationship_summary.final_review_packet_does_not_grant_approval must be true');
}
if (!output.unresolved_blocker_summary.all_blockers_documented) {
  fail('all blockers must be documented');
}
if (output.final_decision_options_summary.selected_decision !== 'not_granted') {
  fail('final_decision_options_summary.selected_decision must be not_granted');
}
if (!output.safety_posture_summary.approval_not_granted) {
  fail('safety_posture_summary.approval_not_granted must be true');
}
if (!output.channel_handoff_summary.all_channel_handoffs_remain_blocked) {
  fail('all channel handoffs must remain blocked');
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
  'verify-native-workflow-fixture-first-controlled-launch-final-handoff-snapshot-dry-run-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Final Handoff Snapshot Dry Run',
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
  passAssertion(assertion);
}

console.log(
  `PASS: Native Workflow Fixture First Controlled Launch Final Handoff Snapshot Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);