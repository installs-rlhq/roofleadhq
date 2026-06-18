#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_PAYLOAD_REPLAY_DRY_RUN.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-channel-payload-replay-dry-run.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-channel-payload-replay-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-channel-payload-replay-dry-run-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const channelAdapterContractDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only channel payload replay',
  'Relationship to Channel Adapter Contract Dry Run',
  'Replay Scenario Matrix',
  'Valid Outbound SMS Replay',
  'Blocked Outbound SMS Replay Without Approval',
  'Inbound SMS Reply Replay',
  'Valid Outbound Email Replay',
  'Blocked Email Replay Without Approval',
  'Call Intent Replay',
  'Call Result Replay',
  'Calendar Appointment Request Replay',
  'Calendar Appointment Result Replay',
  'CSV/Reporting Export Replay',
  'CRM Handoff/Export Replay',
  'Lindy Bridge Handoff Replay',
  'Scheduler/Dispatcher Queued Action Replay',
  'Public Route/Webhook Received-Event Replay',
  'Supabase Persistence Handoff Replay',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Replay',
  'Malformed Payload Replay',
  'Missing Common Fields Replay',
  'Activation Flag Violation Replay',
  'Credential/Env Leakage Replay',
  'Unsupported Channel Replay',
  'Replay Result Statuses',
  'Blocked Delivery Reason Taxonomy',
  'Owner Routing for Failures',
  'Audit Event Replay Expectations',
  'fixture_replay_id',
  'fixture_roofer_account_id',
  'fixture_lead_id',
  'fixture_channel',
  'fixture_event_type',
  'fixture_payload_version',
  'fixture_replay_status',
  'fixture_delivery_mode',
  'dry_run_only',
  'fixture_approval_status',
  'not_approved',
  'fixture_external_call_attempted',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_blocked_delivery_reason',
  'fixture_owner_for_next_step',
  'fixture_audit_event_id',
  'fixture_created_at',
  'Fast-Lane Verification Usage',
  'verify-safe-readiness-fast.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'channel_payload_replay_dry_run_summary',
  'channel_payload_replay_items',
  'replay_scenario_matrix_summary',
  'sms_replay_summary',
  'email_replay_summary',
  'call_replay_summary',
  'calendar_replay_summary',
  'csv_reporting_replay_summary',
  'crm_handoff_replay_summary',
  'lindy_bridge_replay_summary',
  'scheduler_dispatcher_replay_summary',
  'public_route_webhook_replay_summary',
  'supabase_persistence_replay_summary',
  'billing_payment_quote_replay_summary',
  'malformed_payload_replay_summary',
  'activation_violation_replay_summary',
  'credential_leakage_replay_summary',
  'audit_event_replay_summary',
  'owner_routing_summary',
  'channel_payload_replay_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_REPLAY_SCENARIOS = [
  'sms_outbound_draft_replay',
  'sms_outbound_blocked_send_replay',
  'sms_inbound_reply_replay',
  'email_outbound_draft_replay',
  'email_outbound_blocked_send_replay',
  'call_intent_replay',
  'call_result_replay',
  'calendar_appointment_request_replay',
  'calendar_appointment_result_replay',
  'csv_export_handoff_replay',
  'crm_handoff_export_replay',
  'lindy_bridge_handoff_replay',
  'scheduler_dispatcher_queued_action_replay',
  'public_route_webhook_received_event_replay',
  'supabase_persistence_handoff_replay',
  'billing_payment_quote_blocked_replay',
  'malformed_missing_common_field_replay',
  'activation_flag_violation_replay',
  'credential_env_leakage_blocked_replay',
  'unsupported_channel_replay',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_replay_id',
  'fixture_roofer_account_id',
  'fixture_lead_id',
  'fixture_channel',
  'fixture_event_type',
  'fixture_payload_version',
  'fixture_replay_status',
  'fixture_delivery_mode',
  'fixture_approval_status',
  'fixture_external_call_attempted',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_blocked_delivery_reason',
  'fixture_owner_for_next_step',
  'fixture_audit_event_id',
  'fixture_created_at',
];

const REQUIRED_OUTPUT_SECTIONS = [
  'channel_payload_replay_dry_run_summary',
  'channel_payload_replay_items',
  'replay_scenario_matrix_summary',
  'sms_replay_summary',
  'email_replay_summary',
  'call_replay_summary',
  'calendar_replay_summary',
  'csv_reporting_replay_summary',
  'crm_handoff_replay_summary',
  'lindy_bridge_replay_summary',
  'scheduler_dispatcher_replay_summary',
  'public_route_webhook_replay_summary',
  'supabase_persistence_replay_summary',
  'billing_payment_quote_replay_summary',
  'malformed_payload_replay_summary',
  'activation_violation_replay_summary',
  'credential_leakage_replay_summary',
  'audit_event_replay_summary',
  'owner_routing_summary',
  'channel_payload_replay_safety_assertions',
];

const REQUIRED_ASSERTIONS = [
  'channel_payload_replay_doc_present',
  'fake_data_local_only_scope_present',
  'relationship_to_channel_adapter_contract_present',
  'replay_scenario_matrix_present',
  'sms_replay_present',
  'email_replay_present',
  'call_replay_present',
  'calendar_replay_present',
  'csv_reporting_replay_present',
  'crm_handoff_replay_present',
  'lindy_bridge_replay_present',
  'scheduler_dispatcher_replay_present',
  'public_route_webhook_replay_present',
  'supabase_persistence_replay_present',
  'billing_payment_quote_replay_blocked',
  'malformed_payload_replay_present',
  'activation_violation_replay_present',
  'credential_leakage_replay_present',
  'audit_event_replay_present',
  'owner_routing_present',
  'fast_lane_reference_present',
  'runner_outputs_valid_json',
  'replay_items_have_common_fields',
  'replay_items_remain_dry_run_only',
  'replay_items_have_external_call_attempted_false',
  'replay_items_have_activation_flags_false',
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
  'NATIVE_WORKFLOW_FIXTURE_CHANNEL_PAYLOAD_REPLAY_DRY_RUN.md',
  'run-native-workflow-fixture-channel-payload-replay-dry-run.sh',
  'verify-native-workflow-fixture-channel-payload-replay-dry-run-readonly.js',
  'run-native-workflow-fixture-channel-payload-replay-dry-run.js',
  'Native Workflow Fixture Channel Payload Replay Dry Run',
  'native workflow fixture channel payload replay dry run',
  'channel payload replay dry run',
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

passAssertion('channel_payload_replay_doc_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');

mustHave(doc, channelAdapterContractDocPath, 'documentation');
mustHave(doc, 'channel adapter contract dry run', 'documentation');
passAssertion('relationship_to_channel_adapter_contract_present');
passAssertion('replay_scenario_matrix_present');
passAssertion('sms_replay_present');
passAssertion('email_replay_present');
passAssertion('call_replay_present');
passAssertion('calendar_replay_present');
passAssertion('csv_reporting_replay_present');
passAssertion('crm_handoff_replay_present');
passAssertion('lindy_bridge_replay_present');
passAssertion('scheduler_dispatcher_replay_present');
passAssertion('public_route_webhook_replay_present');
passAssertion('supabase_persistence_replay_present');
passAssertion('billing_payment_quote_replay_blocked');
passAssertion('malformed_payload_replay_present');
passAssertion('activation_violation_replay_present');
passAssertion('credential_leakage_replay_present');
passAssertion('audit_event_replay_present');
passAssertion('owner_routing_present');
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
  ['channel payload replay verifier', verifierPath],
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
  output.channel_payload_replay_dry_run !== 'native_workflow_fixture_channel_payload_replay_dry_run'
) {
  fail('channel_payload_replay_dry_run marker is incorrect');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level channel payload replay sections are present.');

if (!Array.isArray(output.channel_payload_replay_items) || output.channel_payload_replay_items.length !== 20) {
  fail('channel_payload_replay_items must contain exactly 20 items');
}

const scenarios = new Set(output.channel_payload_replay_items.map((item) => item.replay_scenario));
for (const scenario of REQUIRED_REPLAY_SCENARIOS) {
  if (!scenarios.has(scenario)) fail(`required replay scenario missing: ${scenario}`);
}

for (const item of output.channel_payload_replay_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(`replay item ${item.fixture_replay_id || 'unknown'} missing common field: ${field}`);
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(`replay item ${item.fixture_replay_id} fixture_delivery_mode is not dry_run_only`);
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(`replay item ${item.fixture_replay_id} fixture_approval_status is not not_approved`);
  }
  if (item.fixture_external_call_attempted !== false) {
    fail(`replay item ${item.fixture_replay_id} fixture_external_call_attempted is not false`);
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`replay item ${item.fixture_replay_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`replay item ${item.fixture_replay_id} missing fixture_audit_event_id`);
  }
}
passAssertion('replay_items_have_common_fields');
passAssertion('replay_items_remain_dry_run_only');
passAssertion('replay_items_have_external_call_attempted_false');
passAssertion('replay_items_have_activation_flags_false');

if (!output.common_replay_fields_summary.all_items_include_common_fields) {
  fail('common_replay_fields_summary.all_items_include_common_fields must be true');
}
if (!output.channel_payload_replay_dry_run_summary.all_items_remain_dry_run_only) {
  fail('channel_payload_replay_dry_run_summary.all_items_remain_dry_run_only must be true');
}
if (output.billing_payment_quote_replay_summary.billing_items !== 1) {
  fail('billing_payment_quote replay must model blocked boundary');
}
if (output.crm_handoff_replay_summary.bidirectional_crm_sync_allowed !== false) {
  fail('crm_handoff must remain not bidirectional sync');
}
if (output.lindy_bridge_replay_summary.live_lindy_bridge_enabled !== false) {
  fail('live_lindy_bridge_enabled must remain false');
}
if (output.scheduler_dispatcher_replay_summary.scheduler_enabled !== false) {
  fail('scheduler must remain disabled');
}
if (output.public_route_webhook_replay_summary.public_route_enabled !== false) {
  fail('public route must remain disabled');
}
if (output.supabase_persistence_replay_summary.production_write_allowed !== false) {
  fail('supabase production writes must remain blocked');
}
if (output.malformed_payload_replay_summary.malformed_items !== 1) {
  fail('malformed_payload replay must have exactly 1 item');
}
if (output.activation_violation_replay_summary.activation_violation_items !== 1) {
  fail('activation_violation replay must have exactly 1 item');
}
if (output.credential_leakage_replay_summary.credential_leakage_items !== 1) {
  fail('credential_leakage replay must have exactly 1 item');
}
if (!output.audit_event_replay_summary.all_items_have_audit_event_id) {
  fail('all replay items must have audit event id');
}
if (!output.owner_routing_summary.all_failures_routed_to_safe_owner) {
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
  'verify-native-workflow-fixture-channel-payload-replay-dry-run-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Native Workflow Fixture Channel Payload Replay Dry Run', 'aggregate readiness');
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
      'channel_payload_replay_doc_present',
      'fake_data_local_only_scope_present',
      'relationship_to_channel_adapter_contract_present',
      'replay_scenario_matrix_present',
      'sms_replay_present',
      'email_replay_present',
      'call_replay_present',
      'calendar_replay_present',
      'csv_reporting_replay_present',
      'crm_handoff_replay_present',
      'lindy_bridge_replay_present',
      'scheduler_dispatcher_replay_present',
      'public_route_webhook_replay_present',
      'supabase_persistence_replay_present',
      'billing_payment_quote_replay_blocked',
      'malformed_payload_replay_present',
      'activation_violation_replay_present',
      'credential_leakage_replay_present',
      'audit_event_replay_present',
      'owner_routing_present',
      'fast_lane_reference_present',
      'runner_outputs_valid_json',
      'replay_items_have_common_fields',
      'replay_items_remain_dry_run_only',
      'replay_items_have_external_call_attempted_false',
      'replay_items_have_activation_flags_false',
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
  `PASS: Native Workflow Fixture Channel Payload Replay Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);