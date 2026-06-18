#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_REPLAY_ACCEPTANCE_GATE_DRY_RUN.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-channel-replay-acceptance-gate-dry-run.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-channel-replay-acceptance-gate-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-channel-replay-acceptance-gate-dry-run-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const channelAdapterContractDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md';
const channelPayloadReplayDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_PAYLOAD_REPLAY_DRY_RUN.md';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only channel replay acceptance gate',
  'Relationship to Channel Adapter Contract Dry Run',
  'Relationship to Channel Payload Replay Dry Run',
  'Acceptance Gate Matrix',
  'Go/No-Go Decision Model',
  'Channel Contract Readiness Checks',
  'Payload Replay Readiness Checks',
  'Blocked Delivery Readiness Checks',
  'Audit Event Readiness Checks',
  'Owner Routing Readiness Checks',
  'Approval Prerequisite Readiness Checks',
  'Credential/Env Boundary Readiness Checks',
  'Messaging Compliance Readiness Checks',
  'Calendar Preference Readiness Checks',
  'CSV/Reporting Data Handling Readiness Checks',
  'CRM Handoff/Export Readiness Checks',
  'Lindy Bridge Readiness Checks',
  'Scheduler/Dispatcher Readiness Checks',
  'Public Route/Webhook Readiness Checks',
  'Supabase Persistence Readiness Checks',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Boundary Readiness Checks',
  'Rollback Readiness Checks',
  'Post-Approval Test Readiness Checks',
  'Final Human Review Packet Expectations',
  'fixture_acceptance_gate_id',
  'fixture_gate_area',
  'fixture_gate_status',
  'fixture_gate_decision',
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
  'Channel adapter contracts',
  'Channel payload replay',
  'SMS outbound/inbound readiness',
  'Email outbound/inbound readiness',
  'Call intent/result readiness',
  'Calendar request/result readiness',
  'CSV/reporting export readiness',
  'CRM handoff/export readiness',
  'Lindy bridge handoff readiness',
  'Scheduler/dispatcher queued action readiness',
  'Public route/webhook received-event readiness',
  'Supabase persistence handoff readiness',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Malformed payload handling',
  'Activation violation handling',
  'Credential/env leakage handling',
  'Audit event coverage',
  'Owner routing coverage',
  'Rollback readiness',
  'Post-approval test readiness',
  'Human review packet readiness',
  'Final sandbox/test-mode approval remains blocked',
  'Fast-Lane Verification Usage',
  'verify-safe-readiness-fast.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'channel_replay_acceptance_gate_dry_run_summary',
  'channel_replay_acceptance_gate_items',
  'acceptance_gate_matrix_summary',
  'go_no_go_decision_summary',
  'channel_contract_readiness_summary',
  'payload_replay_readiness_summary',
  'blocked_delivery_readiness_summary',
  'audit_event_readiness_summary',
  'owner_routing_readiness_summary',
  'approval_prerequisite_readiness_summary',
  'credential_env_boundary_readiness_summary',
  'messaging_compliance_readiness_summary',
  'calendar_preference_readiness_summary',
  'csv_reporting_data_handling_readiness_summary',
  'crm_handoff_export_readiness_summary',
  'lindy_bridge_readiness_summary',
  'scheduler_dispatcher_readiness_summary',
  'public_route_webhook_readiness_summary',
  'supabase_persistence_readiness_summary',
  'billing_payment_quote_boundary_readiness_summary',
  'rollback_readiness_summary',
  'post_approval_test_readiness_summary',
  'human_review_packet_readiness_summary',
  'channel_replay_acceptance_gate_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_GATE_AREAS = [
  'Channel adapter contracts',
  'Channel payload replay',
  'SMS outbound/inbound readiness',
  'Email outbound/inbound readiness',
  'Call intent/result readiness',
  'Calendar request/result readiness',
  'CSV/reporting export readiness',
  'CRM handoff/export readiness',
  'Lindy bridge handoff readiness',
  'Scheduler/dispatcher queued action readiness',
  'Public route/webhook received-event readiness',
  'Supabase persistence handoff readiness',
  'Billing/payment/quote/estimate/invoice blocked boundary',
  'Malformed payload handling',
  'Activation violation handling',
  'Credential/env leakage handling',
  'Audit event coverage',
  'Owner routing coverage',
  'Rollback readiness',
  'Post-approval test readiness',
  'Human review packet readiness',
  'Final sandbox/test-mode approval remains blocked',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_acceptance_gate_id',
  'fixture_gate_area',
  'fixture_gate_status',
  'fixture_gate_decision',
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
  'channel_replay_acceptance_gate_dry_run_summary',
  'channel_replay_acceptance_gate_items',
  'acceptance_gate_matrix_summary',
  'go_no_go_decision_summary',
  'channel_contract_readiness_summary',
  'payload_replay_readiness_summary',
  'blocked_delivery_readiness_summary',
  'audit_event_readiness_summary',
  'owner_routing_readiness_summary',
  'approval_prerequisite_readiness_summary',
  'credential_env_boundary_readiness_summary',
  'messaging_compliance_readiness_summary',
  'calendar_preference_readiness_summary',
  'csv_reporting_data_handling_readiness_summary',
  'crm_handoff_export_readiness_summary',
  'lindy_bridge_readiness_summary',
  'scheduler_dispatcher_readiness_summary',
  'public_route_webhook_readiness_summary',
  'supabase_persistence_readiness_summary',
  'billing_payment_quote_boundary_readiness_summary',
  'rollback_readiness_summary',
  'post_approval_test_readiness_summary',
  'human_review_packet_readiness_summary',
  'channel_replay_acceptance_gate_safety_assertions',
];

const REQUIRED_ASSERTIONS = [
  'channel_replay_acceptance_gate_doc_present',
  'fake_data_local_only_scope_present',
  'relationship_to_channel_adapter_contract_present',
  'relationship_to_channel_payload_replay_present',
  'acceptance_gate_matrix_present',
  'go_no_go_decision_model_present',
  'channel_contract_readiness_present',
  'payload_replay_readiness_present',
  'blocked_delivery_readiness_present',
  'audit_event_readiness_present',
  'owner_routing_readiness_present',
  'approval_prerequisite_readiness_present',
  'credential_env_boundary_readiness_present',
  'messaging_compliance_readiness_present',
  'calendar_preference_readiness_present',
  'csv_reporting_data_handling_readiness_present',
  'crm_handoff_export_readiness_present',
  'lindy_bridge_readiness_present',
  'scheduler_dispatcher_readiness_present',
  'public_route_webhook_readiness_present',
  'supabase_persistence_readiness_present',
  'billing_payment_quote_boundary_blocked',
  'rollback_readiness_present',
  'post_approval_test_readiness_present',
  'human_review_packet_readiness_present',
  'final_sandbox_test_mode_approval_remains_blocked',
  'fast_lane_reference_present',
  'runner_outputs_valid_json',
  'acceptance_items_have_common_fields',
  'acceptance_items_remain_dry_run_only',
  'acceptance_items_have_activation_flags_false',
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
  'NATIVE_WORKFLOW_FIXTURE_CHANNEL_REPLAY_ACCEPTANCE_GATE_DRY_RUN.md',
  'run-native-workflow-fixture-channel-replay-acceptance-gate-dry-run.sh',
  'verify-native-workflow-fixture-channel-replay-acceptance-gate-dry-run-readonly.js',
  'run-native-workflow-fixture-channel-replay-acceptance-gate-dry-run.js',
  'Native Workflow Fixture Channel Replay Acceptance Gate Dry Run',
  'native workflow fixture channel replay acceptance gate dry run',
  'channel replay acceptance gate dry run',
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

passAssertion('channel_replay_acceptance_gate_doc_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');

mustHave(doc, channelAdapterContractDocPath, 'documentation');
mustHave(doc, 'channel adapter contract dry run', 'documentation');
passAssertion('relationship_to_channel_adapter_contract_present');

mustHave(doc, channelPayloadReplayDocPath, 'documentation');
mustHave(doc, 'channel payload replay dry run', 'documentation');
passAssertion('relationship_to_channel_payload_replay_present');
passAssertion('acceptance_gate_matrix_present');
passAssertion('go_no_go_decision_model_present');
passAssertion('channel_contract_readiness_present');
passAssertion('payload_replay_readiness_present');
passAssertion('blocked_delivery_readiness_present');
passAssertion('audit_event_readiness_present');
passAssertion('owner_routing_readiness_present');
passAssertion('approval_prerequisite_readiness_present');
passAssertion('credential_env_boundary_readiness_present');
passAssertion('messaging_compliance_readiness_present');
passAssertion('calendar_preference_readiness_present');
passAssertion('csv_reporting_data_handling_readiness_present');
passAssertion('crm_handoff_export_readiness_present');
passAssertion('lindy_bridge_readiness_present');
passAssertion('scheduler_dispatcher_readiness_present');
passAssertion('public_route_webhook_readiness_present');
passAssertion('supabase_persistence_readiness_present');
passAssertion('billing_payment_quote_boundary_blocked');
passAssertion('rollback_readiness_present');
passAssertion('post_approval_test_readiness_present');
passAssertion('human_review_packet_readiness_present');
passAssertion('final_sandbox_test_mode_approval_remains_blocked');
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
  ['channel replay acceptance gate verifier', verifierPath],
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
  output.channel_replay_acceptance_gate_dry_run !==
  'native_workflow_fixture_channel_replay_acceptance_gate_dry_run'
) {
  fail('channel_replay_acceptance_gate_dry_run marker is incorrect');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level channel replay acceptance gate sections are present.');

if (
  !Array.isArray(output.channel_replay_acceptance_gate_items) ||
  output.channel_replay_acceptance_gate_items.length !== 22
) {
  fail('channel_replay_acceptance_gate_items must contain exactly 22 items');
}

const gateAreas = new Set(
  output.channel_replay_acceptance_gate_items.map((item) => item.fixture_gate_area),
);
for (const gateArea of REQUIRED_GATE_AREAS) {
  if (!gateAreas.has(gateArea)) fail(`required gate area missing: ${gateArea}`);
}

for (const item of output.channel_replay_acceptance_gate_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(`acceptance item ${item.fixture_acceptance_gate_id || 'unknown'} missing common field: ${field}`);
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(`acceptance item ${item.fixture_acceptance_gate_id} fixture_delivery_mode is not dry_run_only`);
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(`acceptance item ${item.fixture_acceptance_gate_id} fixture_approval_status is not not_approved`);
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`acceptance item ${item.fixture_acceptance_gate_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`acceptance item ${item.fixture_acceptance_gate_id} missing fixture_audit_event_id`);
  }
}
passAssertion('acceptance_items_have_common_fields');
passAssertion('acceptance_items_remain_dry_run_only');
passAssertion('acceptance_items_have_activation_flags_false');

if (!output.common_gate_fields_summary.all_items_include_common_fields) {
  fail('common_gate_fields_summary.all_items_include_common_fields must be true');
}
if (!output.channel_replay_acceptance_gate_dry_run_summary.all_items_remain_dry_run_only) {
  fail('channel_replay_acceptance_gate_dry_run_summary.all_items_remain_dry_run_only must be true');
}
if (output.billing_payment_quote_boundary_readiness_summary.automation_forbidden !== true) {
  fail('billing boundary must remain automation forbidden');
}
if (output.crm_handoff_export_readiness_summary.bidirectional_crm_sync_allowed !== false) {
  fail('crm handoff must remain not bidirectional sync');
}
if (output.lindy_bridge_readiness_summary.live_lindy_bridge_enabled !== false) {
  fail('live_lindy_bridge_enabled must remain false');
}
if (output.scheduler_dispatcher_readiness_summary.scheduler_enabled !== false) {
  fail('scheduler must remain disabled');
}
if (output.public_route_webhook_readiness_summary.public_route_enabled !== false) {
  fail('public route must remain disabled');
}
if (output.supabase_persistence_readiness_summary.production_write_allowed !== false) {
  fail('supabase production writes must remain blocked');
}
if (output.go_no_go_decision_summary.sandbox_test_mode_activation_allowed !== false) {
  fail('sandbox_test_mode_activation_allowed must remain false');
}
if (output.go_no_go_decision_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
const finalGate = output.channel_replay_acceptance_gate_items.find(
  (item) => item.fixture_gate_area === 'Final sandbox/test-mode approval remains blocked',
);
if (!finalGate || finalGate.fixture_gate_decision !== 'no_go_sandbox_test_mode_blocked') {
  fail('final sandbox/test-mode gate must have no_go_sandbox_test_mode_blocked decision');
}
if (!output.audit_event_readiness_summary.all_items_have_audit_event_id) {
  fail('all acceptance items must have audit event id');
}
if (!output.owner_routing_readiness_summary.all_failures_routed_to_safe_owner) {
  fail('all failures must be routed to safe owner');
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
  'verify-native-workflow-fixture-channel-replay-acceptance-gate-dry-run-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Channel Replay Acceptance Gate Dry Run',
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

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}
passAssertion('dry_run_wrapper_present_and_safe');
passAssertion('public_go_live_or_production_copy_not_changed_without_approval');

for (const assertion of REQUIRED_ASSERTIONS) {
  if (
    ![
      'channel_replay_acceptance_gate_doc_present',
      'fake_data_local_only_scope_present',
      'relationship_to_channel_adapter_contract_present',
      'relationship_to_channel_payload_replay_present',
      'acceptance_gate_matrix_present',
      'go_no_go_decision_model_present',
      'channel_contract_readiness_present',
      'payload_replay_readiness_present',
      'blocked_delivery_readiness_present',
      'audit_event_readiness_present',
      'owner_routing_readiness_present',
      'approval_prerequisite_readiness_present',
      'credential_env_boundary_readiness_present',
      'messaging_compliance_readiness_present',
      'calendar_preference_readiness_present',
      'csv_reporting_data_handling_readiness_present',
      'crm_handoff_export_readiness_present',
      'lindy_bridge_readiness_present',
      'scheduler_dispatcher_readiness_present',
      'public_route_webhook_readiness_present',
      'supabase_persistence_readiness_present',
      'billing_payment_quote_boundary_blocked',
      'rollback_readiness_present',
      'post_approval_test_readiness_present',
      'human_review_packet_readiness_present',
      'final_sandbox_test_mode_approval_remains_blocked',
      'fast_lane_reference_present',
      'runner_outputs_valid_json',
      'acceptance_items_have_common_fields',
      'acceptance_items_remain_dry_run_only',
      'acceptance_items_have_activation_flags_false',
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
  `PASS: Native Workflow Fixture Channel Replay Acceptance Gate Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);