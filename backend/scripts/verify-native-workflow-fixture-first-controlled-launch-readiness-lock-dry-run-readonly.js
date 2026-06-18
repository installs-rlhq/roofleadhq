#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run-readonly.js';
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
const verifierFastLaneDocPath = 'docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only first controlled launch readiness lock',
  'Relationship to Verifier Quiet Mode Fast Lane Cleanup',
  'Relationship to Channel Adapter Contract Dry Run',
  'Relationship to Channel Payload Replay Dry Run',
  'Relationship to Channel Replay Acceptance Gate Dry Run',
  'Relationship to Sandbox/Test-Mode Human Review Packet Dry Run',
  'Final Readiness Lock Table of Contents',
  'Executive Readiness Status',
  'Explicit Non-Approval Statement',
  'First Controlled Launch Remains Blocked',
  'Required Approval Placeholder',
  'Final Evidence Chain Summary',
  'Channel Readiness Lock',
  'Messaging Compliance Readiness Lock',
  'Calendar Readiness Lock',
  'CSV/Reporting Readiness Lock',
  'CRM Handoff/Export Readiness Lock',
  'Lindy Bridge Readiness Lock',
  'Scheduler/Dispatcher Readiness Lock',
  'Public Route/Webhook Readiness Lock',
  'Supabase Persistence Readiness Lock',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Boundary Lock',
  'Credential/Env Boundary Lock',
  'Data Boundary / PII Lock',
  'Audit/Timeline Lock',
  'Owner Routing Lock',
  'Unresolved Blocker Register',
  'Rollback Readiness Lock',
  'Post-Approval Test Readiness Lock',
  'Final Decision Checklist',
  'Allowed Next Actions',
  'Forbidden Next Actions',
  'Fast-Lane Verification Usage',
  'verify-safe-readiness-fast.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'fixture_readiness_lock_id',
  'fixture_readiness_area',
  'fixture_readiness_status',
  'fixture_lock_decision',
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
  'Executive readiness status',
  'Evidence chain completeness',
  'Channel adapter contract evidence',
  'Channel payload replay evidence',
  'Channel replay acceptance gate evidence',
  'Sandbox/test-mode human review packet evidence',
  'SMS readiness lock',
  'Email readiness lock',
  'Call/Vapi readiness lock',
  'Google Calendar readiness lock',
  'CSV/reporting readiness lock',
  'CRM handoff/export readiness lock',
  'Lindy bridge readiness lock',
  'Scheduler/dispatcher readiness lock',
  'Public route/webhook readiness lock',
  'Supabase persistence readiness lock',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Messaging compliance readiness lock',
  'Credential/env boundary lock',
  'Data boundary / PII lock',
  'Audit/timeline lock',
  'Owner routing lock',
  'Rollback readiness lock',
  'Post-approval test readiness lock',
  'Unresolved blocker register',
  'Final decision checklist',
  'Allowed next actions',
  'Forbidden next actions',
  'Explicit approval still required',
  'First controlled launch remains blocked',
  'first_controlled_launch_readiness_lock_dry_run_summary',
  'first_controlled_launch_readiness_lock_items',
  'final_readiness_lock_toc_summary',
  'executive_readiness_status_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'evidence_chain_summary',
  'channel_readiness_lock_summary',
  'messaging_compliance_readiness_lock_summary',
  'calendar_readiness_lock_summary',
  'csv_reporting_readiness_lock_summary',
  'crm_handoff_export_readiness_lock_summary',
  'lindy_bridge_readiness_lock_summary',
  'scheduler_dispatcher_readiness_lock_summary',
  'public_route_webhook_readiness_lock_summary',
  'supabase_persistence_readiness_lock_summary',
  'billing_payment_quote_boundary_lock_summary',
  'credential_env_boundary_lock_summary',
  'data_boundary_pii_lock_summary',
  'audit_timeline_lock_summary',
  'owner_routing_lock_summary',
  'unresolved_blocker_register_summary',
  'rollback_readiness_lock_summary',
  'post_approval_test_readiness_lock_summary',
  'final_decision_checklist_summary',
  'allowed_next_actions_summary',
  'forbidden_next_actions_summary',
  'first_controlled_launch_readiness_lock_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_LOCK_AREAS = [
  'Executive readiness status',
  'Evidence chain completeness',
  'Channel adapter contract evidence',
  'Channel payload replay evidence',
  'Channel replay acceptance gate evidence',
  'Sandbox/test-mode human review packet evidence',
  'SMS readiness lock',
  'Email readiness lock',
  'Call/Vapi readiness lock',
  'Google Calendar readiness lock',
  'CSV/reporting readiness lock',
  'CRM handoff/export readiness lock',
  'Lindy bridge readiness lock',
  'Scheduler/dispatcher readiness lock',
  'Public route/webhook readiness lock',
  'Supabase persistence readiness lock',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Messaging compliance readiness lock',
  'Credential/env boundary lock',
  'Data boundary / PII lock',
  'Audit/timeline lock',
  'Owner routing lock',
  'Rollback readiness lock',
  'Post-approval test readiness lock',
  'Unresolved blocker register',
  'Final decision checklist',
  'Allowed next actions',
  'Forbidden next actions',
  'Explicit approval still required',
  'First controlled launch remains blocked',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_readiness_lock_id',
  'fixture_readiness_area',
  'fixture_readiness_status',
  'fixture_lock_decision',
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
  'first_controlled_launch_readiness_lock_dry_run_summary',
  'first_controlled_launch_readiness_lock_items',
  'final_readiness_lock_toc_summary',
  'executive_readiness_status_summary',
  'explicit_non_approval_summary',
  'first_controlled_launch_blocked_summary',
  'evidence_chain_summary',
  'channel_readiness_lock_summary',
  'messaging_compliance_readiness_lock_summary',
  'calendar_readiness_lock_summary',
  'csv_reporting_readiness_lock_summary',
  'crm_handoff_export_readiness_lock_summary',
  'lindy_bridge_readiness_lock_summary',
  'scheduler_dispatcher_readiness_lock_summary',
  'public_route_webhook_readiness_lock_summary',
  'supabase_persistence_readiness_lock_summary',
  'billing_payment_quote_boundary_lock_summary',
  'credential_env_boundary_lock_summary',
  'data_boundary_pii_lock_summary',
  'audit_timeline_lock_summary',
  'owner_routing_lock_summary',
  'unresolved_blocker_register_summary',
  'rollback_readiness_lock_summary',
  'post_approval_test_readiness_lock_summary',
  'final_decision_checklist_summary',
  'allowed_next_actions_summary',
  'forbidden_next_actions_summary',
  'first_controlled_launch_readiness_lock_safety_assertions',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_readiness_lock_doc_present',
  'fake_data_local_only_scope_present',
  'relationship_to_verifier_fast_lane_cleanup_present',
  'relationship_to_channel_adapter_contract_present',
  'relationship_to_channel_payload_replay_present',
  'relationship_to_channel_replay_acceptance_gate_present',
  'relationship_to_human_review_packet_present',
  'final_readiness_lock_toc_present',
  'executive_readiness_status_present',
  'explicit_non_approval_statement_present',
  'first_controlled_launch_remains_blocked',
  'approval_placeholder_present',
  'evidence_chain_summary_present',
  'channel_readiness_lock_present',
  'messaging_compliance_readiness_lock_present',
  'calendar_readiness_lock_present',
  'csv_reporting_readiness_lock_present',
  'crm_handoff_export_readiness_lock_present',
  'lindy_bridge_readiness_lock_present',
  'scheduler_dispatcher_readiness_lock_present',
  'public_route_webhook_readiness_lock_present',
  'supabase_persistence_readiness_lock_present',
  'billing_payment_quote_boundary_blocked',
  'credential_env_boundary_lock_present',
  'data_boundary_pii_lock_present',
  'audit_timeline_lock_present',
  'owner_routing_lock_present',
  'unresolved_blocker_register_present',
  'rollback_readiness_lock_present',
  'post_approval_test_readiness_lock_present',
  'final_decision_checklist_present',
  'allowed_next_actions_present',
  'forbidden_next_actions_present',
  'fast_lane_reference_present',
  'runner_outputs_valid_json',
  'readiness_items_have_common_fields',
  'readiness_items_remain_dry_run_only',
  'readiness_items_have_activation_flags_false',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_READINESS_LOCK_DRY_RUN.md',
  'run-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run.js',
  'Native Workflow Fixture First Controlled Launch Readiness Lock Dry Run',
  'native workflow fixture first controlled launch readiness lock dry run',
  'first controlled launch readiness lock dry run',
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
const verifierFastLaneDoc = read(verifierFastLaneDocPath);

passAssertion('first_controlled_launch_readiness_lock_doc_present');

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
passAssertion('final_readiness_lock_toc_present');
passAssertion('executive_readiness_status_present');
passAssertion('explicit_non_approval_statement_present');
passAssertion('first_controlled_launch_remains_blocked');
passAssertion('approval_placeholder_present');
passAssertion('evidence_chain_summary_present');
passAssertion('channel_readiness_lock_present');
passAssertion('messaging_compliance_readiness_lock_present');
passAssertion('calendar_readiness_lock_present');
passAssertion('csv_reporting_readiness_lock_present');
passAssertion('crm_handoff_export_readiness_lock_present');
passAssertion('lindy_bridge_readiness_lock_present');
passAssertion('scheduler_dispatcher_readiness_lock_present');
passAssertion('public_route_webhook_readiness_lock_present');
passAssertion('supabase_persistence_readiness_lock_present');
passAssertion('billing_payment_quote_boundary_blocked');
passAssertion('credential_env_boundary_lock_present');
passAssertion('data_boundary_pii_lock_present');
passAssertion('audit_timeline_lock_present');
passAssertion('owner_routing_lock_present');
passAssertion('unresolved_blocker_register_present');
passAssertion('rollback_readiness_lock_present');
passAssertion('post_approval_test_readiness_lock_present');
passAssertion('final_decision_checklist_present');
passAssertion('allowed_next_actions_present');
passAssertion('forbidden_next_actions_present');
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
  ['first controlled launch readiness lock verifier', verifierPath],
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
  output.first_controlled_launch_readiness_lock_dry_run !==
  'native_workflow_fixture_first_controlled_launch_readiness_lock_dry_run'
) {
  fail('first_controlled_launch_readiness_lock_dry_run marker is incorrect');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level first controlled launch readiness lock sections are present.');

if (
  !Array.isArray(output.first_controlled_launch_readiness_lock_items) ||
  output.first_controlled_launch_readiness_lock_items.length !== 30
) {
  fail('first_controlled_launch_readiness_lock_items must contain exactly 30 items');
}

const lockAreas = new Set(
  output.first_controlled_launch_readiness_lock_items.map((item) => item.fixture_readiness_area),
);
for (const area of REQUIRED_LOCK_AREAS) {
  if (!lockAreas.has(area)) fail(`required readiness lock area missing: ${area}`);
}

for (const item of output.first_controlled_launch_readiness_lock_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `readiness lock item ${item.fixture_readiness_lock_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(`readiness lock item ${item.fixture_readiness_lock_id} fixture_delivery_mode is not dry_run_only`);
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(`readiness lock item ${item.fixture_readiness_lock_id} fixture_approval_status is not not_approved`);
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`readiness lock item ${item.fixture_readiness_lock_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`readiness lock item ${item.fixture_readiness_lock_id} missing fixture_audit_event_id`);
  }
}
passAssertion('readiness_items_have_common_fields');
passAssertion('readiness_items_remain_dry_run_only');
passAssertion('readiness_items_have_activation_flags_false');

if (!output.common_lock_fields_summary.all_items_include_common_fields) {
  fail('common_lock_fields_summary.all_items_include_common_fields must be true');
}
if (!output.first_controlled_launch_readiness_lock_dry_run_summary.all_items_remain_dry_run_only) {
  fail('first_controlled_launch_readiness_lock_dry_run_summary.all_items_remain_dry_run_only must be true');
}
if (output.billing_payment_quote_boundary_lock_summary.automation_forbidden !== true) {
  fail('billing boundary must remain automation forbidden');
}
if (output.crm_handoff_export_readiness_lock_summary.bidirectional_crm_sync_allowed !== false) {
  fail('crm handoff must remain not bidirectional sync');
}
if (output.lindy_bridge_readiness_lock_summary.live_lindy_bridge_enabled !== false) {
  fail('live_lindy_bridge_enabled must remain false');
}
if (output.scheduler_dispatcher_readiness_lock_summary.scheduler_enabled !== false) {
  fail('scheduler must remain disabled');
}
if (output.public_route_webhook_readiness_lock_summary.public_route_enabled !== false) {
  fail('public route must remain disabled');
}
if (output.supabase_persistence_readiness_lock_summary.production_write_allowed !== false) {
  fail('supabase production writes must remain blocked');
}
if (output.executive_readiness_status_summary.first_controlled_launch_allowed !== false) {
  fail('first_controlled_launch_allowed must remain false');
}
if (output.executive_readiness_status_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.explicit_non_approval_summary.fixture_first_controlled_launch_approval_granted !== false) {
  fail('fixture_first_controlled_launch_approval_granted must remain false');
}
if (!output.explicit_non_approval_summary.approval_placeholder_present) {
  fail('approval_placeholder_present must be true');
}
if (!output.first_controlled_launch_blocked_summary.first_controlled_launch_remains_blocked) {
  fail('first_controlled_launch_remains_blocked must be true');
}
const finalLock = output.first_controlled_launch_readiness_lock_items.find(
  (item) => item.fixture_readiness_area === 'First controlled launch remains blocked',
);
if (!finalLock || finalLock.fixture_lock_decision !== 'no_go_first_controlled_launch_blocked') {
  fail('final launch lock must have no_go_first_controlled_launch_blocked decision');
}
const approvalLock = output.first_controlled_launch_readiness_lock_items.find(
  (item) => item.fixture_readiness_area === 'Explicit approval still required',
);
if (!approvalLock || approvalLock.fixture_lock_decision !== 'no_go_approval_not_granted') {
  fail('explicit approval lock must have no_go_approval_not_granted decision');
}
if (!output.audit_timeline_lock_summary.all_items_have_audit_event_id) {
  fail('all readiness lock items must have audit event id');
}
if (!output.owner_routing_lock_summary.all_failures_routed_to_safe_owner) {
  fail('all failures must be routed to safe owner');
}
if (!output.unresolved_blocker_register_summary.all_blockers_have_owner) {
  fail('all blockers must have owner');
}
if (output.final_readiness_lock_toc_summary.total_areas !== 30) {
  fail('final_readiness_lock_toc_summary must have 30 areas');
}
if (!output.allowed_next_actions_summary.allowed_action_count) {
  fail('allowed_next_actions_summary must document allowed actions');
}
if (!output.forbidden_next_actions_summary.forbidden_action_count) {
  fail('forbidden_next_actions_summary must document forbidden actions');
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
  'verify-native-workflow-fixture-first-controlled-launch-readiness-lock-dry-run-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Readiness Lock Dry Run',
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
      'first_controlled_launch_readiness_lock_doc_present',
      'fake_data_local_only_scope_present',
      'relationship_to_verifier_fast_lane_cleanup_present',
      'relationship_to_channel_adapter_contract_present',
      'relationship_to_channel_payload_replay_present',
      'relationship_to_channel_replay_acceptance_gate_present',
      'relationship_to_human_review_packet_present',
      'final_readiness_lock_toc_present',
      'executive_readiness_status_present',
      'explicit_non_approval_statement_present',
      'first_controlled_launch_remains_blocked',
      'approval_placeholder_present',
      'evidence_chain_summary_present',
      'channel_readiness_lock_present',
      'messaging_compliance_readiness_lock_present',
      'calendar_readiness_lock_present',
      'csv_reporting_readiness_lock_present',
      'crm_handoff_export_readiness_lock_present',
      'lindy_bridge_readiness_lock_present',
      'scheduler_dispatcher_readiness_lock_present',
      'public_route_webhook_readiness_lock_present',
      'supabase_persistence_readiness_lock_present',
      'billing_payment_quote_boundary_blocked',
      'credential_env_boundary_lock_present',
      'data_boundary_pii_lock_present',
      'audit_timeline_lock_present',
      'owner_routing_lock_present',
      'unresolved_blocker_register_present',
      'rollback_readiness_lock_present',
      'post_approval_test_readiness_lock_present',
      'final_decision_checklist_present',
      'allowed_next_actions_present',
      'forbidden_next_actions_present',
      'fast_lane_reference_present',
      'runner_outputs_valid_json',
      'readiness_items_have_common_fields',
      'readiness_items_remain_dry_run_only',
      'readiness_items_have_activation_flags_false',
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
  `PASS: Native Workflow Fixture First Controlled Launch Readiness Lock Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);