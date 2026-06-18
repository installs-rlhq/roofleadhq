#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-channel-adapter-contract-dry-run.js';
const wrapperPath = 'scripts/run-native-workflow-fixture-channel-adapter-contract-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-channel-adapter-contract-dry-run-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only channel adapter contract dry-run',
  'Channel Contract Matrix',
  'Outbound SMS Contract Shape',
  'Inbound SMS Reply Contract Shape',
  'Outbound Email Contract Shape',
  'Inbound Email / Reply Contract Shape',
  'Outbound Call Intent / Vapi Test Contract Shape',
  'Call Result Contract Shape',
  'Google Calendar Appointment Request Contract Shape',
  'Google Calendar Appointment Result Contract Shape',
  'CSV/Reporting Export Handoff Contract Shape',
  'CRM Handoff/Export Contract Shape',
  'Lindy Bridge Handoff Contract Shape',
  'Scheduler/Dispatcher Handoff Contract Shape',
  'Public Route/Webhook Contract Shape',
  'Supabase Persistence Handoff Contract Shape',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Contract Boundary',
  'Required Common Fields Across All Channel Payloads',
  'fixture_roofer_account_id',
  'fixture_lead_id',
  'fixture_channel',
  'fixture_event_type',
  'fixture_payload_version',
  'fixture_message_or_action_intent',
  'fixture_delivery_mode',
  'dry_run_only',
  'fixture_approval_status',
  'not_approved',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_created_at',
  'fixture_audit_event_id',
  'Blocked Fields / Forbidden Payload Content',
  'Channel Isolation Rules',
  'Approval Gate Requirements',
  'Credential/Env Boundary Rules',
  'Payload Audit Event Expectations',
  'Rollback and Post-Approval Test Relationship',
  'Fast-Lane Verification Usage',
  'verify-safe-readiness-fast.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'channel_adapter_contract_dry_run_summary',
  'channel_adapter_contract_items',
  'common_payload_contract_summary',
  'sms_contract_summary',
  'email_contract_summary',
  'call_contract_summary',
  'calendar_contract_summary',
  'csv_reporting_contract_summary',
  'crm_handoff_contract_summary',
  'lindy_bridge_contract_summary',
  'scheduler_dispatcher_contract_summary',
  'public_route_webhook_contract_summary',
  'supabase_persistence_contract_summary',
  'billing_payment_quote_contract_summary',
  'channel_isolation_summary',
  'approval_gate_summary',
  'credential_env_boundary_summary',
  'audit_event_contract_summary',
  'rollback_post_approval_test_summary',
  'channel_adapter_contract_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_CONTRACT_CATEGORIES = [
  'sms_outbound',
  'sms_inbound',
  'email_outbound',
  'call',
  'calendar',
  'csv_reporting',
  'crm_handoff',
  'lindy_bridge',
  'scheduler_dispatcher',
  'public_route_webhook',
  'supabase_persistence',
  'billing_payment_quote',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_roofer_account_id',
  'fixture_lead_id',
  'fixture_channel',
  'fixture_event_type',
  'fixture_payload_version',
  'fixture_message_or_action_intent',
  'fixture_delivery_mode',
  'fixture_approval_status',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_created_at',
  'fixture_audit_event_id',
];

const REQUIRED_OUTPUT_SECTIONS = [
  'channel_adapter_contract_dry_run_summary',
  'channel_adapter_contract_items',
  'common_payload_contract_summary',
  'sms_contract_summary',
  'email_contract_summary',
  'call_contract_summary',
  'calendar_contract_summary',
  'csv_reporting_contract_summary',
  'crm_handoff_contract_summary',
  'lindy_bridge_contract_summary',
  'scheduler_dispatcher_contract_summary',
  'public_route_webhook_contract_summary',
  'supabase_persistence_contract_summary',
  'billing_payment_quote_contract_summary',
  'channel_isolation_summary',
  'approval_gate_summary',
  'credential_env_boundary_summary',
  'audit_event_contract_summary',
  'rollback_post_approval_test_summary',
  'channel_adapter_contract_safety_assertions',
];

const REQUIRED_ASSERTIONS = [
  'channel_adapter_contract_doc_present',
  'fake_data_local_only_scope_present',
  'common_payload_contract_present',
  'channel_contract_matrix_present',
  'sms_contract_present',
  'email_contract_present',
  'call_contract_present',
  'calendar_contract_present',
  'csv_reporting_contract_present',
  'crm_handoff_contract_present',
  'lindy_bridge_contract_present',
  'scheduler_dispatcher_contract_present',
  'public_route_webhook_contract_present',
  'supabase_persistence_contract_present',
  'billing_payment_quote_contract_blocked',
  'approval_gate_required',
  'credential_env_boundary_present',
  'audit_event_contract_present',
  'rollback_post_approval_test_relationship_present',
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
  'fast_lane_reference_present',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md',
  'run-native-workflow-fixture-channel-adapter-contract-dry-run.sh',
  'verify-native-workflow-fixture-channel-adapter-contract-dry-run-readonly.js',
  'run-native-workflow-fixture-channel-adapter-contract-dry-run.js',
  'Native Workflow Fixture Channel Adapter Contract Dry Run',
  'native workflow fixture channel adapter contract dry run',
  'channel adapter contract dry run',
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

passAssertion('channel_adapter_contract_doc_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');
passAssertion('common_payload_contract_present');
passAssertion('channel_contract_matrix_present');
passAssertion('sms_contract_present');
passAssertion('email_contract_present');
passAssertion('call_contract_present');
passAssertion('calendar_contract_present');
passAssertion('csv_reporting_contract_present');
passAssertion('crm_handoff_contract_present');
passAssertion('lindy_bridge_contract_present');
passAssertion('scheduler_dispatcher_contract_present');
passAssertion('public_route_webhook_contract_present');
passAssertion('supabase_persistence_contract_present');
passAssertion('billing_payment_quote_contract_blocked');
passAssertion('approval_gate_required');
passAssertion('credential_env_boundary_present');
passAssertion('audit_event_contract_present');
passAssertion('rollback_post_approval_test_relationship_present');
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
  ['channel adapter contract verifier', verifierPath],
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
console.log('PASS: runner produces valid JSON.');

if (output.safety_posture !== 'demo_ready_with_live_automation_disabled') {
  fail('output does not preserve demo_ready_with_live_automation_disabled');
}

if (
  output.channel_adapter_contract_dry_run !== 'native_workflow_fixture_channel_adapter_contract_dry_run'
) {
  fail('channel_adapter_contract_dry_run marker is incorrect');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level channel adapter contract sections are present.');

if (!Array.isArray(output.channel_adapter_contract_items) || output.channel_adapter_contract_items.length !== 12) {
  fail('channel_adapter_contract_items must contain exactly 12 items');
}

const categories = new Set(output.channel_adapter_contract_items.map((item) => item.contract_category));
for (const category of REQUIRED_CONTRACT_CATEGORIES) {
  if (!categories.has(category)) fail(`required contract category missing: ${category}`);
}

for (const item of output.channel_adapter_contract_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(`contract item ${item.contract_item_id || 'unknown'} missing common field: ${field}`);
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(`contract item ${item.contract_item_id} fixture_delivery_mode is not dry_run_only`);
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(`contract item ${item.contract_item_id} fixture_approval_status is not not_approved`);
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`contract item ${item.contract_item_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`contract item ${item.contract_item_id} missing fixture_audit_event_id`);
  }
}

if (!output.common_payload_contract_summary.all_items_include_common_fields) {
  fail('common_payload_contract_summary.all_items_include_common_fields must be true');
}
if (!output.channel_adapter_contract_dry_run_summary.all_items_blocked_from_activation) {
  fail('channel_adapter_contract_dry_run_summary.all_items_blocked_from_activation must be true');
}
if (output.billing_payment_quote_contract_summary.billing_items !== 1) {
  fail('billing_payment_quote contract must model blocked boundary');
}
if (output.crm_handoff_contract_summary.bidirectional_crm_sync_allowed !== false) {
  fail('crm_handoff must remain not bidirectional sync');
}
if (output.lindy_bridge_contract_summary.live_lindy_bridge_enabled !== false) {
  fail('live_lindy_bridge_enabled must remain false');
}
if (output.scheduler_dispatcher_contract_summary.scheduler_enabled !== false) {
  fail('scheduler must remain disabled');
}
if (output.public_route_webhook_contract_summary.public_route_enabled !== false) {
  fail('public route must remain disabled');
}
if (output.supabase_persistence_contract_summary.production_write_allowed !== false) {
  fail('supabase production writes must remain blocked');
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
  'verify-native-workflow-fixture-channel-adapter-contract-dry-run-readonly.js',
  'aggregate readiness',
);
mustHave(aggregate, 'Native Workflow Fixture Channel Adapter Contract Dry Run', 'aggregate readiness');
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
      'channel_adapter_contract_doc_present',
      'fake_data_local_only_scope_present',
      'common_payload_contract_present',
      'channel_contract_matrix_present',
      'sms_contract_present',
      'email_contract_present',
      'call_contract_present',
      'calendar_contract_present',
      'csv_reporting_contract_present',
      'crm_handoff_contract_present',
      'lindy_bridge_contract_present',
      'scheduler_dispatcher_contract_present',
      'public_route_webhook_contract_present',
      'supabase_persistence_contract_present',
      'billing_payment_quote_contract_blocked',
      'approval_gate_required',
      'credential_env_boundary_present',
      'audit_event_contract_present',
      'rollback_post_approval_test_relationship_present',
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
      'fast_lane_reference_present',
      'docs_and_context_wiring_present',
      'dry_run_wrapper_present_and_safe',
      'public_go_live_or_production_copy_not_changed_without_approval',
    ].includes(assertion)
  ) {
    fail(`unhandled assertion: ${assertion}`);
  }
}

console.log(
  `PASS: Native Workflow Fixture Channel Adapter Contract Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);