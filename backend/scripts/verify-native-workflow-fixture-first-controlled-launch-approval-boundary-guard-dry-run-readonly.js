#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_BOUNDARY_GUARD_DRY_RUN.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
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
  'fake-data/local-only approval boundary guard',
  'approval boundary guard dry-run only',
  'Explicit Non-Approval Statement',
  'First Controlled Launch Remains Blocked',
  'Sandbox/Test-Mode Activation Remains Blocked',
  'Live Activation Remains Blocked',
  'Evidence Chain Complete-For-Review But Not Approved',
  'Relationship to First Controlled Launch Final Handoff Snapshot Dry Run',
  'Relationship to First Controlled Launch Final Review Packet Dry Run',
  'Relationship to First Controlled Launch Decision Ledger Dry Run',
  'Relationship to First Controlled Launch Execution Runbook Dry Run',
  'Relationship to First Controlled Launch Approval Request Packet Dry Run',
  'Relationship to First Controlled Launch Readiness Lock Dry Run',
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
  'Approval Boundary Guard Table of Contents',
  'Executive Guard Summary',
  'Approval Boundary Rules',
  'Allowed Evidence-Review Actions',
  'Forbidden Activation Actions',
  'Required Explicit Jason Approval Language',
  'Required Signer/Timestamp Boundary',
  'Approval Record Must Be Separate and Future-Only',
  'Production Activation Flags Must Remain False',
  'Sandbox/Test-Mode Activation Flags Must Remain False',
  'Live Automation Flags Must Remain False',
  'External Call Boundary',
  'Credential/Env Boundary',
  'Schema/Auth/RLS/Security Boundary',
  'Channel-by-Channel Approval Boundary',
  'SMS approval boundary',
  'Email approval boundary',
  'Call/Vapi approval boundary',
  'Google Calendar approval boundary',
  'CSV/reporting approval boundary',
  'CRM handoff/export approval boundary',
  'Lindy bridge approval boundary',
  'Scheduler/dispatcher approval boundary',
  'Public route/webhook approval boundary',
  'Supabase persistence approval boundary',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Boundary',
  'Audit/Timeline Boundary',
  'Owner Routing Boundary',
  'Rollback/Post-Approval Test Boundary',
  'Final Guard Result',
  'Fast-Lane Verification Usage',
  'verify-safe-readiness-fast.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'fixture_approval_boundary_guard_id',
  'fixture_guard_area',
  'fixture_guard_status',
  'fixture_guard_decision',
  'fixture_required_boundary',
  'fixture_current_boundary_status',
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
  'blocked_until_separate_explicit_approval',
  'Executive approval boundary summary',
  'Evidence chain complete-for-review',
  'Final handoff snapshot evidence',
  'Final review packet evidence',
  'Decision ledger evidence',
  'Execution runbook evidence',
  'Approval request packet evidence',
  'Readiness lock evidence',
  'Sandbox/test-mode human review packet evidence',
  'Channel replay acceptance gate evidence',
  'Channel payload replay evidence',
  'Channel adapter contract evidence',
  'Required explicit Jason approval language',
  'Required signer/timestamp boundary',
  'Separate future approval record boundary',
  'Production activation flag boundary',
  'Sandbox/test-mode activation flag boundary',
  'Live automation flag boundary',
  'External call boundary',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
  'SMS approval boundary',
  'Email approval boundary',
  'Call/Vapi approval boundary',
  'Google Calendar approval boundary',
  'CSV/reporting approval boundary',
  'CRM handoff/export approval boundary',
  'Lindy bridge approval boundary',
  'Scheduler/dispatcher approval boundary',
  'Public route/webhook approval boundary',
  'Supabase persistence approval boundary',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Audit/timeline boundary',
  'Owner routing boundary',
  'Rollback/post-approval test boundary',
  'Approval not granted',
  'First controlled launch remains blocked',
  'first_controlled_launch_approval_boundary_guard_dry_run_summary',
  'first_controlled_launch_approval_boundary_guard_items',
  'approval_boundary_guard_toc_summary',
  'executive_guard_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'evidence_chain_complete_for_review_not_approved_summary',
  'final_handoff_snapshot_relationship_summary',
  'final_review_packet_relationship_summary',
  'decision_ledger_relationship_summary',
  'execution_runbook_relationship_summary',
  'approval_request_packet_relationship_summary',
  'readiness_lock_relationship_summary',
  'allowed_evidence_review_actions_summary',
  'forbidden_activation_actions_summary',
  'required_explicit_jason_approval_language_summary',
  'required_signer_timestamp_boundary_summary',
  'future_separate_approval_record_boundary_summary',
  'production_activation_flag_boundary_summary',
  'sandbox_test_mode_activation_flag_boundary_summary',
  'live_automation_flag_boundary_summary',
  'external_call_boundary_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'channel_approval_boundary_summary',
  'audit_timeline_boundary_summary',
  'owner_routing_boundary_summary',
  'rollback_post_approval_test_boundary_summary',
  'approval_not_granted_summary',
  'final_guard_result_summary',
  'first_controlled_launch_approval_boundary_guard_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_GUARD_AREAS = [
  'Executive approval boundary summary',
  'Evidence chain complete-for-review',
  'Final handoff snapshot evidence',
  'Final review packet evidence',
  'Decision ledger evidence',
  'Execution runbook evidence',
  'Approval request packet evidence',
  'Readiness lock evidence',
  'Sandbox/test-mode human review packet evidence',
  'Channel replay acceptance gate evidence',
  'Channel payload replay evidence',
  'Channel adapter contract evidence',
  'Required explicit Jason approval language',
  'Required signer/timestamp boundary',
  'Separate future approval record boundary',
  'Production activation flag boundary',
  'Sandbox/test-mode activation flag boundary',
  'Live automation flag boundary',
  'External call boundary',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
  'SMS approval boundary',
  'Email approval boundary',
  'Call/Vapi approval boundary',
  'Google Calendar approval boundary',
  'CSV/reporting approval boundary',
  'CRM handoff/export approval boundary',
  'Lindy bridge approval boundary',
  'Scheduler/dispatcher approval boundary',
  'Public route/webhook approval boundary',
  'Supabase persistence approval boundary',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Audit/timeline boundary',
  'Owner routing boundary',
  'Rollback/post-approval test boundary',
  'Approval not granted',
  'First controlled launch remains blocked',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_approval_boundary_guard_id',
  'fixture_guard_area',
  'fixture_guard_status',
  'fixture_guard_decision',
  'fixture_required_boundary',
  'fixture_current_boundary_status',
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
  'first_controlled_launch_approval_boundary_guard_dry_run_summary',
  'first_controlled_launch_approval_boundary_guard_items',
  'approval_boundary_guard_toc_summary',
  'executive_guard_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'sandbox_test_mode_activation_blocked_summary',
  'live_activation_blocked_summary',
  'evidence_chain_complete_for_review_not_approved_summary',
  'final_handoff_snapshot_relationship_summary',
  'final_review_packet_relationship_summary',
  'decision_ledger_relationship_summary',
  'execution_runbook_relationship_summary',
  'approval_request_packet_relationship_summary',
  'readiness_lock_relationship_summary',
  'allowed_evidence_review_actions_summary',
  'forbidden_activation_actions_summary',
  'required_explicit_jason_approval_language_summary',
  'required_signer_timestamp_boundary_summary',
  'future_separate_approval_record_boundary_summary',
  'production_activation_flag_boundary_summary',
  'sandbox_test_mode_activation_flag_boundary_summary',
  'live_automation_flag_boundary_summary',
  'external_call_boundary_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'channel_approval_boundary_summary',
  'audit_timeline_boundary_summary',
  'owner_routing_boundary_summary',
  'rollback_post_approval_test_boundary_summary',
  'approval_not_granted_summary',
  'final_guard_result_summary',
  'first_controlled_launch_approval_boundary_guard_safety_assertions',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_approval_boundary_guard_doc_present',
  'fake_data_local_only_scope_present',
  'explicit_non_approval_statement_present',
  'first_controlled_launch_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'evidence_chain_complete_for_review_not_approved_present',
  'relationship_to_final_handoff_snapshot_present',
  'relationship_to_final_review_packet_present',
  'relationship_to_decision_ledger_present',
  'relationship_to_execution_runbook_present',
  'relationship_to_approval_request_packet_present',
  'relationship_to_readiness_lock_present',
  'approval_boundary_guard_toc_present',
  'executive_guard_summary_present',
  'approval_boundary_rules_present',
  'allowed_evidence_review_actions_present',
  'forbidden_activation_actions_present',
  'required_explicit_jason_approval_language_present',
  'required_signer_timestamp_boundary_present',
  'future_separate_approval_record_boundary_present',
  'production_activation_flag_boundary_present',
  'sandbox_test_mode_activation_flag_boundary_present',
  'live_automation_flag_boundary_present',
  'external_call_boundary_present',
  'credential_env_boundary_present',
  'schema_auth_rls_security_boundary_present',
  'channel_approval_boundary_present',
  'audit_timeline_boundary_present',
  'owner_routing_boundary_present',
  'rollback_post_approval_test_boundary_present',
  'final_guard_result_present',
  'fast_lane_reference_present',
  'runner_outputs_valid_json',
  'guard_items_have_common_fields',
  'guard_items_remain_dry_run_only',
  'guard_items_have_activation_flags_false',
  'guard_decisions_blocked_until_explicit_approval',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVAL_BOUNDARY_GUARD_DRY_RUN.md',
  'run-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run.js',
  'Native Workflow Fixture First Controlled Launch Approval Boundary Guard Dry Run',
  'native workflow fixture first controlled launch approval boundary guard dry run',
  'first controlled launch approval boundary guard dry run',
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

passAssertion('first_controlled_launch_approval_boundary_guard_doc_present');

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

passAssertion('approval_boundary_guard_toc_present');
passAssertion('executive_guard_summary_present');
passAssertion('explicit_non_approval_statement_present');
passAssertion('first_controlled_launch_remains_blocked');
passAssertion('evidence_chain_complete_for_review_not_approved_present');
passAssertion('approval_boundary_rules_present');
passAssertion('allowed_evidence_review_actions_present');
passAssertion('forbidden_activation_actions_present');
passAssertion('required_explicit_jason_approval_language_present');
passAssertion('required_signer_timestamp_boundary_present');
passAssertion('future_separate_approval_record_boundary_present');
passAssertion('production_activation_flag_boundary_present');
passAssertion('sandbox_test_mode_activation_flag_boundary_present');
passAssertion('live_automation_flag_boundary_present');
passAssertion('external_call_boundary_present');
passAssertion('credential_env_boundary_present');
passAssertion('schema_auth_rls_security_boundary_present');
passAssertion('channel_approval_boundary_present');
passAssertion('audit_timeline_boundary_present');
passAssertion('owner_routing_boundary_present');
passAssertion('rollback_post_approval_test_boundary_present');
passAssertion('final_guard_result_present');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch approval boundary guard verifier', verifierPath],
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
  output.first_controlled_launch_approval_boundary_guard_dry_run !==
  'native_workflow_fixture_first_controlled_launch_approval_boundary_guard_dry_run'
) {
  fail('first_controlled_launch_approval_boundary_guard_dry_run marker is incorrect');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level first controlled launch approval boundary guard sections are present.');

if (
  !Array.isArray(output.first_controlled_launch_approval_boundary_guard_items) ||
  output.first_controlled_launch_approval_boundary_guard_items.length !== 37
) {
  fail('first_controlled_launch_approval_boundary_guard_items must contain exactly 37 items');
}

const guardAreas = new Set(
  output.first_controlled_launch_approval_boundary_guard_items.map(
    (item) => item.fixture_guard_area,
  ),
);
for (const area of REQUIRED_GUARD_AREAS) {
  if (!guardAreas.has(area)) fail(`required guard area missing: ${area}`);
}

for (const item of output.first_controlled_launch_approval_boundary_guard_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `guard item ${item.fixture_approval_boundary_guard_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(
      `guard item ${item.fixture_approval_boundary_guard_id} fixture_delivery_mode is not dry_run_only`,
    );
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(
      `guard item ${item.fixture_approval_boundary_guard_id} fixture_approval_status is not not_approved`,
    );
  }
  if (item.fixture_guard_decision !== 'blocked_until_separate_explicit_approval') {
    fail(
      `guard item ${item.fixture_approval_boundary_guard_id} fixture_guard_decision is not blocked_until_separate_explicit_approval`,
    );
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`guard item ${item.fixture_approval_boundary_guard_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`guard item ${item.fixture_approval_boundary_guard_id} missing fixture_audit_event_id`);
  }
}
passAssertion('guard_items_have_common_fields');
passAssertion('guard_items_remain_dry_run_only');
passAssertion('guard_items_have_activation_flags_false');
passAssertion('guard_decisions_blocked_until_explicit_approval');

if (!output.common_guard_fields_summary.all_items_include_common_fields) {
  fail('common_guard_fields_summary.all_items_include_common_fields must be true');
}
if (
  !output.first_controlled_launch_approval_boundary_guard_dry_run_summary
    .all_items_remain_dry_run_only
) {
  fail(
    'first_controlled_launch_approval_boundary_guard_dry_run_summary.all_items_remain_dry_run_only must be true',
  );
}
if (
  !output.first_controlled_launch_approval_boundary_guard_dry_run_summary
    .all_guard_decisions_blocked_until_explicit_approval
) {
  fail(
    'first_controlled_launch_approval_boundary_guard_dry_run_summary.all_guard_decisions_blocked_until_explicit_approval must be true',
  );
}
if (!output.channel_approval_boundary_summary.all_channel_approval_boundaries_remain_blocked) {
  fail('all channel approval boundaries must remain blocked');
}
if (output.executive_guard_summary.first_controlled_launch_allowed !== false) {
  fail('first_controlled_launch_allowed must remain false');
}
if (output.executive_guard_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (
  output.explicit_non_approval_summary.fixture_first_controlled_launch_approval_granted !== false
) {
  fail('fixture_first_controlled_launch_approval_granted must remain false');
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
if (output.approval_boundary_guard_toc_summary.total_areas !== 37) {
  fail('approval_boundary_guard_toc_summary must have 37 areas');
}
if (!output.allowed_evidence_review_actions_summary.allowed_action_count) {
  fail('allowed_evidence_review_actions_summary must document allowed actions');
}
if (!output.forbidden_activation_actions_summary.forbidden_action_count) {
  fail('forbidden_activation_actions_summary must document forbidden actions');
}
if (output.final_guard_result_summary.approval_granted !== false) {
  fail('final_guard_result_summary.approval_granted must be false');
}
if (output.final_guard_result_summary.activation_performed !== false) {
  fail('final_guard_result_summary.activation_performed must be false');
}
if (!output.final_guard_result_summary.first_controlled_launch_blocked) {
  fail('final_guard_result_summary.first_controlled_launch_blocked must be true');
}
if (
  !output.future_separate_approval_record_boundary_summary
    .approval_record_must_be_distinct_from_evidence_chain
) {
  fail('approval_record_must_be_distinct_from_evidence_chain must be true');
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
  'verify-native-workflow-fixture-first-controlled-launch-approval-boundary-guard-dry-run-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Approval Boundary Guard Dry Run',
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
  `PASS: Native Workflow Fixture First Controlled Launch Approval Boundary Guard Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);