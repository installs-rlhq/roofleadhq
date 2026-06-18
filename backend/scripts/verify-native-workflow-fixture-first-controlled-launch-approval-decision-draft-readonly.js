#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_DECISION_DRAFT.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-approval-decision-draft.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-approval-decision-draft-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-approval-decision-draft-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const approvalBoundaryGuardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_BOUNDARY_GUARD_DRY_RUN.md';
const finalHandoffSnapshotDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_HANDOFF_SNAPSHOT_DRY_RUN.md';
const finalReviewPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_REVIEW_PACKET_DRY_RUN.md';
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
const verifierFastLaneDocPath = 'docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only approval decision draft',
  'approval decision draft dry-run only',
  'approval_decision_draft_only',
  'Explicit Non-Approval Statement',
  'First Controlled Launch Remains Blocked',
  'Sandbox/Test-Mode Activation Remains Blocked',
  'Live Activation Remains Blocked',
  'Evidence Chain Complete-For-Review But Not Approved',
  'Relationship to First Controlled Launch Approval Boundary Guard Dry Run',
  'Relationship to First Controlled Launch Final Handoff Snapshot Dry Run',
  'Relationship to First Controlled Launch Final Review Packet Dry Run',
  'Relationship to First Controlled Launch Decision Ledger Dry Run',
  'Relationship to First Controlled Launch Execution Runbook Dry Run',
  'Relationship to First Controlled Launch Approval Request Packet Dry Run',
  'Relationship to First Controlled Launch Readiness Lock Dry Run',
  'Approval Boundary Guard Relationship',
  'Final Handoff Snapshot Relationship',
  'Final Review Packet Relationship',
  'Decision Ledger Relationship',
  'Execution Runbook Relationship',
  'Approval Request Packet Relationship',
  'Readiness Lock Relationship',
  'Relationship to Verifier Quiet Mode Fast Lane Cleanup',
  'Relationship to Channel Adapter Contract Dry Run',
  'Relationship to Channel Payload Replay Dry Run',
  'Relationship to Channel Replay Acceptance Gate Dry Run',
  'Approval Decision Draft Table of Contents',
  'Executive Decision Draft Summary',
  'Approval Decision Draft Rules',
  'Approval Decision Record',
  'Allowed Evidence-Review Actions',
  'Forbidden Activation Actions',
  'Required Explicit Jason Approval Language',
  'Required Signer/Timestamp Placeholder',
  'Approval Record Must Be Separate and Future-Only',
  'Activation Flags Boundary',
  'Approval Scope Placeholder Only',
  'Excluded Scope Boundary',
  'Approved Channels Empty',
  'Production Activation Flags Must Remain False',
  'Sandbox/Test-Mode Activation Flags Must Remain False',
  'Live Automation Flags Must Remain False',
  'External Call Boundary',
  'Credential/Env Boundary',
  'Schema/Auth/RLS/Security Boundary',
  'Channel-by-Channel Decision Draft',
  'SMS channel decision draft',
  'Email channel decision draft',
  'Call/Vapi channel decision draft',
  'Google Calendar channel decision draft',
  'CSV/reporting channel decision draft',
  'CRM handoff/export channel decision draft',
  'Lindy bridge channel decision draft',
  'Scheduler/dispatcher channel decision draft',
  'Public route/webhook channel decision draft',
  'Supabase persistence channel decision draft',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Boundary',
  'Audit/Timeline Boundary',
  'Owner Routing Boundary',
  'Rollback/Post-Approval Test Boundary',
  'Final Decision Draft Result',
  'Fast-Lane Verification Usage',
  'verify-safe-readiness-fast.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'fixture_approval_decision_draft_id',
  'fixture_decision_draft_area',
  'fixture_decision_draft_status',
  'fixture_approval_decision',
  'fixture_required_decision_field',
  'fixture_current_decision_status',
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
  'blank_placeholder',
  'separate explicit Jason approval required',
  'placeholder_only',
  'approval_decision_record',
  'Executive approval decision draft summary',
  'Evidence chain complete-for-review',
  'Approval boundary guard evidence',
  'Final handoff',
  'Final review',
  'Decision ledger',
  'Execution runbook',
  'Approval request',
  'Readiness lock',
  'Human review',
  'Acceptance gate',
  'Payload replay',
  'Adapter contract',
  'Approval decision record structure',
  'Approval decision field (not_granted)',
  'Approval status field (not_approved)',
  'Launch status field (blocked)',
  'Activation flags boundary (sandbox/live/external false)',
  'Approval scope placeholder_only',
  'Excluded scope boundary',
  'Approved channels empty',
  'Approval signer blank_placeholder',
  'Approval timestamp blank_placeholder',
  'Approved operator blank_placeholder',
  'Rollback owner blank_placeholder',
  'Required future action (separate explicit Jason approval required)',
  'SMS channel decision draft',
  'Email channel decision draft',
  'Call/Vapi channel decision draft',
  'Google Calendar channel decision draft',
  'CSV/reporting channel decision draft',
  'CRM handoff/export channel decision draft',
  'Lindy bridge channel decision draft',
  'Scheduler/dispatcher channel decision draft',
  'Public route/webhook channel decision draft',
  'Supabase persistence channel decision draft',
  'Billing boundary channel decision draft',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
  'Audit/timeline',
  'Owner routing',
  'Rollback/post-approval test',
  'Approval not granted',
  'First controlled launch remains blocked',
  'first_controlled_launch_approval_decision_draft_dry_run_summary',
  'first_controlled_launch_approval_decision_draft_items',
  'approval_decision_draft_toc_summary',
  'executive_decision_draft_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'evidence_chain_complete_for_review_not_approved_summary',
  'approval_boundary_guard_relationship_summary',
  'final_handoff_snapshot_relationship_summary',
  'final_review_packet_relationship_summary',
  'decision_ledger_relationship_summary',
  'execution_runbook_relationship_summary',
  'approval_request_packet_relationship_summary',
  'readiness_lock_relationship_summary',
  'allowed_evidence_review_actions_summary',
  'forbidden_activation_actions_summary',
  'required_explicit_jason_approval_language_summary',
  'required_signer_timestamp_placeholder_summary',
  'future_separate_approval_record_boundary_summary',
  'activation_flags_boundary_summary',
  'approval_scope_placeholder_only_summary',
  'excluded_scope_boundary_summary',
  'approved_channels_empty_summary',
  'production_activation_flag_boundary_summary',
  'sandbox_test_mode_activation_flag_boundary_summary',
  'live_automation_flag_boundary_summary',
  'external_call_boundary_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'channel_decision_draft_summary',
  'audit_timeline_summary',
  'owner_routing_summary',
  'rollback_post_approval_test_summary',
  'approval_not_granted_summary',
  'first_controlled_launch_remains_blocked_summary',
  'approval_decision_draft_rules_summary',
  'final_decision_draft_result_summary',
  'first_controlled_launch_approval_decision_draft_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_DECISION_DRAFT_AREAS = [
  'Executive approval decision draft summary',
  'Evidence chain complete-for-review',
  'Approval boundary guard evidence',
  'Final handoff',
  'Final review',
  'Decision ledger',
  'Execution runbook',
  'Approval request',
  'Readiness lock',
  'Human review',
  'Acceptance gate',
  'Payload replay',
  'Adapter contract',
  'Approval decision record structure',
  'Approval decision field (not_granted)',
  'Approval status field (not_approved)',
  'Launch status field (blocked)',
  'Activation flags boundary (sandbox/live/external false)',
  'Approval scope placeholder_only',
  'Excluded scope boundary',
  'Approved channels empty',
  'Approval signer blank_placeholder',
  'Approval timestamp blank_placeholder',
  'Approved operator blank_placeholder',
  'Rollback owner blank_placeholder',
  'Required future action (separate explicit Jason approval required)',
  'SMS channel decision draft',
  'Email channel decision draft',
  'Call/Vapi channel decision draft',
  'Google Calendar channel decision draft',
  'CSV/reporting channel decision draft',
  'CRM handoff/export channel decision draft',
  'Lindy bridge channel decision draft',
  'Scheduler/dispatcher channel decision draft',
  'Public route/webhook channel decision draft',
  'Supabase persistence channel decision draft',
  'Billing boundary channel decision draft',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
  'Audit/timeline',
  'Owner routing',
  'Rollback/post-approval test',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_approval_decision_draft_id',
  'fixture_decision_draft_area',
  'fixture_decision_draft_status',
  'fixture_approval_decision',
  'fixture_required_decision_field',
  'fixture_current_decision_status',
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
  'first_controlled_launch_approval_decision_draft_dry_run_summary',
  'approval_decision_record',
  'first_controlled_launch_approval_decision_draft_items',
  'approval_decision_draft_toc_summary',
  'executive_decision_draft_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'evidence_chain_complete_for_review_not_approved_summary',
  'approval_boundary_guard_relationship_summary',
  'final_handoff_snapshot_relationship_summary',
  'final_review_packet_relationship_summary',
  'decision_ledger_relationship_summary',
  'execution_runbook_relationship_summary',
  'approval_request_packet_relationship_summary',
  'readiness_lock_relationship_summary',
  'allowed_evidence_review_actions_summary',
  'forbidden_activation_actions_summary',
  'required_explicit_jason_approval_language_summary',
  'required_signer_timestamp_placeholder_summary',
  'future_separate_approval_record_boundary_summary',
  'activation_flags_boundary_summary',
  'approval_scope_placeholder_only_summary',
  'excluded_scope_boundary_summary',
  'approved_channels_empty_summary',
  'production_activation_flag_boundary_summary',
  'sandbox_test_mode_activation_flag_boundary_summary',
  'live_automation_flag_boundary_summary',
  'external_call_boundary_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'channel_decision_draft_summary',
  'audit_timeline_summary',
  'owner_routing_summary',
  'rollback_post_approval_test_summary',
  'approval_not_granted_summary',
  'first_controlled_launch_remains_blocked_summary',
  'approval_decision_draft_rules_summary',
  'final_decision_draft_result_summary',
  'first_controlled_launch_approval_decision_draft_safety_assertions',
  'common_decision_draft_fields_summary',
];

const REQUIRED_APPROVAL_DECISION_RECORD_FIELDS = {
  approval_decision: 'not_granted',
  approval_status: 'not_approved',
  launch_status: 'blocked',
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approval_scope: 'placeholder_only',
  excluded_scope: 'all live/test-mode/external/service/production actions',
  approval_signer: 'blank_placeholder',
  approval_timestamp: 'blank_placeholder',
  approved_operator: 'blank_placeholder',
  rollback_owner: 'blank_placeholder',
  required_future_action: 'separate explicit Jason approval required',
};

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_approval_decision_draft_doc_present',
  'fake_data_local_only_scope_present',
  'explicit_non_approval_statement_present',
  'first_controlled_launch_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'evidence_chain_complete_for_review_not_approved_present',
  'relationship_to_approval_boundary_guard_present',
  'relationship_to_final_handoff_snapshot_present',
  'relationship_to_final_review_packet_present',
  'relationship_to_decision_ledger_present',
  'relationship_to_execution_runbook_present',
  'relationship_to_approval_request_packet_present',
  'relationship_to_readiness_lock_present',
  'approval_decision_draft_toc_present',
  'executive_decision_draft_summary_present',
  'approval_decision_draft_rules_present',
  'approval_decision_record_present',
  'allowed_evidence_review_actions_present',
  'forbidden_activation_actions_present',
  'required_explicit_jason_approval_language_present',
  'required_signer_timestamp_placeholder_present',
  'future_separate_approval_record_boundary_present',
  'activation_flags_boundary_present',
  'approval_scope_placeholder_only_present',
  'excluded_scope_boundary_present',
  'approved_channels_empty_present',
  'production_activation_flag_boundary_present',
  'sandbox_test_mode_activation_flag_boundary_present',
  'live_automation_flag_boundary_present',
  'external_call_boundary_present',
  'credential_env_boundary_present',
  'schema_auth_rls_security_boundary_present',
  'channel_decision_draft_present',
  'audit_timeline_present',
  'owner_routing_present',
  'rollback_post_approval_test_present',
  'final_decision_draft_result_present',
  'fast_lane_reference_present',
  'runner_outputs_valid_json',
  'decision_draft_items_have_common_fields',
  'decision_draft_items_remain_dry_run_only',
  'decision_draft_items_have_activation_flags_false',
  'decision_draft_approval_decisions_not_granted',
  'approval_not_granted',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_DECISION_DRAFT.md',
  'run-native-workflow-fixture-first-controlled-launch-approval-decision-draft-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-approval-decision-draft-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-approval-decision-draft.js',
  'Native Workflow Fixture First Controlled Launch Approval Decision Draft Dry Run',
  'native workflow fixture first controlled launch approval decision draft dry run',
  'first controlled launch approval decision draft dry run',
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
const approvalBoundaryGuardDoc = read(approvalBoundaryGuardDocPath);
const finalHandoffSnapshotDoc = read(finalHandoffSnapshotDocPath);
const finalReviewPacketDoc = read(finalReviewPacketDocPath);
const decisionLedgerDoc = read(decisionLedgerDocPath);
const executionRunbookDoc = read(executionRunbookDocPath);
const approvalRequestPacketDoc = read(approvalRequestPacketDocPath);
const readinessLockDoc = read(readinessLockDocPath);
const channelAdapterContractDoc = read(channelAdapterContractDocPath);
const channelPayloadReplayDoc = read(channelPayloadReplayDocPath);
const channelReplayAcceptanceGateDoc = read(channelReplayAcceptanceGateDocPath);
const humanReviewPacketDoc = read(humanReviewPacketDocPath);
const verifierFastLaneDoc = read(verifierFastLaneDocPath);

passAssertion('first_controlled_launch_approval_decision_draft_doc_present');

mustHave(doc, approvalBoundaryGuardDocPath, 'documentation');
mustHave(doc, 'first controlled launch approval boundary guard dry run', 'documentation');
passAssertion('relationship_to_approval_boundary_guard_present');

mustHave(doc, finalHandoffSnapshotDocPath, 'documentation');
mustHave(doc, 'first controlled launch final handoff snapshot dry run', 'documentation');
passAssertion('relationship_to_final_handoff_snapshot_present');

mustHave(doc, finalReviewPacketDocPath, 'documentation');
mustHave(doc, 'first controlled launch final review packet dry run', 'documentation');
passAssertion('relationship_to_final_review_packet_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');

mustHave(doc, decisionLedgerDocPath, 'documentation');
mustHave(doc, 'first controlled launch decision ledger dry run', 'documentation');
passAssertion('relationship_to_decision_ledger_present');

mustHave(doc, executionRunbookDocPath, 'documentation');
mustHave(doc, 'first controlled launch execution runbook dry run', 'documentation');
passAssertion('relationship_to_execution_runbook_present');

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

passAssertion('approval_decision_draft_toc_present');
passAssertion('executive_decision_draft_summary_present');
passAssertion('explicit_non_approval_statement_present');
passAssertion('first_controlled_launch_remains_blocked');
passAssertion('evidence_chain_complete_for_review_not_approved_present');
passAssertion('approval_decision_draft_rules_present');
passAssertion('approval_decision_record_present');
passAssertion('allowed_evidence_review_actions_present');
passAssertion('forbidden_activation_actions_present');
passAssertion('required_explicit_jason_approval_language_present');
passAssertion('required_signer_timestamp_placeholder_present');
passAssertion('future_separate_approval_record_boundary_present');
passAssertion('activation_flags_boundary_present');
passAssertion('approval_scope_placeholder_only_present');
passAssertion('excluded_scope_boundary_present');
passAssertion('approved_channels_empty_present');
passAssertion('production_activation_flag_boundary_present');
passAssertion('sandbox_test_mode_activation_flag_boundary_present');
passAssertion('live_automation_flag_boundary_present');
passAssertion('external_call_boundary_present');
passAssertion('credential_env_boundary_present');
passAssertion('schema_auth_rls_security_boundary_present');
passAssertion('channel_decision_draft_present');
passAssertion('audit_timeline_present');
passAssertion('owner_routing_present');
passAssertion('rollback_post_approval_test_present');
passAssertion('final_decision_draft_result_present');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch approval decision draft verifier', verifierPath],
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
  output.first_controlled_launch_approval_decision_draft_dry_run !==
  'native_workflow_fixture_first_controlled_launch_approval_decision_draft_dry_run'
) {
  fail('first_controlled_launch_approval_decision_draft_dry_run marker is incorrect');
}

if (
  output.first_controlled_launch_approval_decision_draft_dry_run_summary.packet_type !==
  'approval_decision_draft_only'
) {
  fail('packet_type must be approval_decision_draft_only');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level first controlled launch approval decision draft sections are present.');

if (!output.approval_decision_record) {
  fail('approval_decision_record must be present');
}
for (const [field, expected] of Object.entries(REQUIRED_APPROVAL_DECISION_RECORD_FIELDS)) {
  if (output.approval_decision_record[field] !== expected) {
    fail(`approval_decision_record.${field} must be ${JSON.stringify(expected)}`);
  }
}
if (
  !Array.isArray(output.approval_decision_record.approved_channels) ||
  output.approval_decision_record.approved_channels.length !== 0
) {
  fail('approval_decision_record.approved_channels must be an empty array');
}
passAssertion('approval_decision_record_present');

if (
  !Array.isArray(output.first_controlled_launch_approval_decision_draft_items) ||
  output.first_controlled_launch_approval_decision_draft_items.length !== 42
) {
  fail('first_controlled_launch_approval_decision_draft_items must contain exactly 42 items');
}

const decisionDraftAreas = new Set(
  output.first_controlled_launch_approval_decision_draft_items.map(
    (item) => item.fixture_decision_draft_area,
  ),
);
for (const area of REQUIRED_DECISION_DRAFT_AREAS) {
  if (!decisionDraftAreas.has(area)) fail(`required decision draft area missing: ${area}`);
}

for (const item of output.first_controlled_launch_approval_decision_draft_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `decision draft item ${item.fixture_approval_decision_draft_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(
      `decision draft item ${item.fixture_approval_decision_draft_id} fixture_delivery_mode is not dry_run_only`,
    );
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(
      `decision draft item ${item.fixture_approval_decision_draft_id} fixture_approval_status is not not_approved`,
    );
  }
  if (item.fixture_approval_decision !== 'not_granted') {
    fail(
      `decision draft item ${item.fixture_approval_decision_draft_id} fixture_approval_decision is not not_granted`,
    );
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`decision draft item ${item.fixture_approval_decision_draft_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(
      `decision draft item ${item.fixture_approval_decision_draft_id} missing fixture_audit_event_id`,
    );
  }
}
passAssertion('decision_draft_items_have_common_fields');
passAssertion('decision_draft_items_remain_dry_run_only');
passAssertion('decision_draft_items_have_activation_flags_false');
passAssertion('decision_draft_approval_decisions_not_granted');

if (!output.common_decision_draft_fields_summary.all_items_include_common_fields) {
  fail('common_decision_draft_fields_summary.all_items_include_common_fields must be true');
}
if (
  !output.first_controlled_launch_approval_decision_draft_dry_run_summary.all_items_remain_dry_run_only
) {
  fail(
    'first_controlled_launch_approval_decision_draft_dry_run_summary.all_items_remain_dry_run_only must be true',
  );
}
if (
  !output.first_controlled_launch_approval_decision_draft_dry_run_summary
    .all_approval_decisions_not_granted
) {
  fail(
    'first_controlled_launch_approval_decision_draft_dry_run_summary.all_approval_decisions_not_granted must be true',
  );
}
if (!output.channel_decision_draft_summary.all_channel_decision_drafts_remain_blocked) {
  fail('all channel decision drafts must remain blocked');
}
if (output.executive_decision_draft_summary.first_controlled_launch_allowed !== false) {
  fail('first_controlled_launch_allowed must remain false');
}
if (output.executive_decision_draft_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (
  output.explicit_non_approval_summary.fixture_first_controlled_launch_approval_granted !== false
) {
  fail('fixture_first_controlled_launch_approval_granted must remain false');
}
if (output.explicit_non_approval_summary.packet_type !== 'approval_decision_draft_only') {
  fail('explicit_non_approval_summary.packet_type must be approval_decision_draft_only');
}
if (!output.first_controlled_launch_blocked_summary.first_controlled_launch_remains_blocked) {
  fail('first_controlled_launch_remains_blocked must be true');
}
if (
  !output.sandbox_test_mode_activation_blocked_summary.sandbox_test_mode_activation_remains_blocked
) {
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
if (
  !output.evidence_chain_complete_for_review_not_approved_summary.evidence_chain_complete_for_review
) {
  fail('evidence_chain_complete_for_review must be true');
}
if (output.evidence_chain_complete_for_review_not_approved_summary.evidence_chain_approved) {
  fail('evidence_chain_approved must be false');
}
if (
  !output.approval_boundary_guard_relationship_summary.approval_boundary_guard_does_not_grant_approval
) {
  fail('approval_boundary_guard_does_not_grant_approval must be true');
}
if (!output.final_handoff_snapshot_relationship_summary.final_handoff_snapshot_does_not_grant_approval) {
  fail('final_handoff_snapshot_does_not_grant_approval must be true');
}
if (!output.final_review_packet_relationship_summary.final_review_packet_does_not_grant_approval) {
  fail('final_review_packet_does_not_grant_approval must be true');
}
if (!output.decision_ledger_relationship_summary.decision_ledger_does_not_grant_approval) {
  fail('decision_ledger_does_not_grant_approval must be true');
}
if (
  !output.execution_runbook_relationship_summary.execution_runbook_does_not_grant_approval_or_execute
) {
  fail('execution_runbook_does_not_grant_approval_or_execute must be true');
}
if (
  !output.approval_request_packet_relationship_summary.approval_request_packet_does_not_grant_approval
) {
  fail('approval_request_packet_does_not_grant_approval must be true');
}
if (!output.readiness_lock_relationship_summary.readiness_lock_does_not_grant_approval) {
  fail('readiness_lock_does_not_grant_approval must be true');
}
if (output.approval_decision_draft_toc_summary.total_areas !== 42) {
  fail('approval_decision_draft_toc_summary must have 42 areas');
}
if (!output.allowed_evidence_review_actions_summary.allowed_action_count) {
  fail('allowed_evidence_review_actions_summary must document allowed actions');
}
if (!output.forbidden_activation_actions_summary.forbidden_action_count) {
  fail('forbidden_activation_actions_summary must document forbidden actions');
}
if (output.final_decision_draft_result_summary.approval_granted !== false) {
  fail('final_decision_draft_result_summary.approval_granted must be false');
}
if (output.final_decision_draft_result_summary.activation_performed !== false) {
  fail('final_decision_draft_result_summary.activation_performed must be false');
}
if (!output.final_decision_draft_result_summary.first_controlled_launch_blocked) {
  fail('final_decision_draft_result_summary.first_controlled_launch_blocked must be true');
}
if (
  !output.future_separate_approval_record_boundary_summary
    .approval_record_must_be_distinct_from_evidence_chain
) {
  fail('approval_record_must_be_distinct_from_evidence_chain must be true');
}
if (output.required_signer_timestamp_placeholder_summary.approval_signer !== 'blank_placeholder') {
  fail('required_signer_timestamp_placeholder_summary.approval_signer must be blank_placeholder');
}
if (
  output.required_signer_timestamp_placeholder_summary.approval_timestamp !== 'blank_placeholder'
) {
  fail('required_signer_timestamp_placeholder_summary.approval_timestamp must be blank_placeholder');
}
if (!output.approved_channels_empty_summary.approved_channels_must_remain_empty) {
  fail('approved_channels_must_remain_empty must be true');
}
if (!output.excluded_scope_boundary_summary.excluded_scope_documented) {
  fail('excluded_scope_boundary_summary.excluded_scope_documented must be true');
}
if (!output.approval_scope_placeholder_only_summary.approval_scope_must_remain_placeholder_only) {
  fail('approval_scope_must_remain_placeholder_only must be true');
}
if (!output.activation_flags_boundary_summary.all_activation_flags_must_remain_false) {
  fail('all_activation_flags_must_remain_false must be true');
}

const requiredFutureActionItem = output.first_controlled_launch_approval_decision_draft_items.find(
  (item) =>
    item.fixture_decision_draft_area ===
    'Required future action (separate explicit Jason approval required)',
);
if (
  !requiredFutureActionItem ||
  requiredFutureActionItem.fixture_required_future_action !==
    'separate explicit Jason approval required'
) {
  fail('required future action item must document separate explicit Jason approval required');
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
  'verify-native-workflow-fixture-first-controlled-launch-approval-decision-draft-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Approval Decision Draft Dry Run',
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
mustHave(wrapper, 'set -euo pipefail', 'wrapper strict mode');
mustHave(wrapper, verifierPath, 'wrapper verifier');
mustHave(wrapper, runnerPath, 'wrapper runner');
mustHave(wrapper, 'node --check', 'wrapper syntax checks');
mustNotHave(wrapper, fastReadinessPath, 'wrapper must not run fast readiness');
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
  `PASS: Native Workflow Fixture First Controlled Launch Approval Decision Draft Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);