#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_HUMAN_REVIEW_PACKET_DRY_RUN.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run.sh';
const fastReadinessPath = 'scripts/verify-safe-readiness-fast.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const channelAdapterContractDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_ADAPTER_CONTRACT_DRY_RUN.md';
const channelPayloadReplayDocPath = 'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_PAYLOAD_REPLAY_DRY_RUN.md';
const channelReplayAcceptanceGateDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_CHANNEL_REPLAY_ACCEPTANCE_GATE_DRY_RUN.md';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only human review packet',
  'Relationship to Channel Adapter Contract Dry Run',
  'Relationship to Channel Payload Replay Dry Run',
  'Relationship to Channel Replay Acceptance Gate Dry Run',
  'Human Review Packet Table of Contents',
  'Executive Go/No-Go Summary',
  'Explicit Non-Approval Statement',
  'Required Approval Placeholder',
  'Channel-by-Channel Evidence Summary',
  'SMS Review Section',
  'Email Review Section',
  'Call/Vapi Review Section',
  'Google Calendar Review Section',
  'CSV/Reporting Review Section',
  'CRM Handoff/Export Review Section',
  'Lindy Bridge Review Section',
  'Scheduler/Dispatcher Review Section',
  'Public Route/Webhook Review Section',
  'Supabase Persistence Review Section',
  'Billing/Payment/Quote/Estimate/Invoice Blocked Boundary Review Section',
  'Messaging Compliance Review Section',
  'Credential/Env Boundary Review Section',
  'Data Boundary / PII Review Section',
  'Audit/Timeline Review Section',
  'Owner Routing Review Section',
  'Unresolved Blocker Register',
  'Rollback Readiness Section',
  'Post-Approval Test Plan Section',
  'Final Decision Checklist',
  'Final sandbox/test-mode approval remains blocked',
  'Fast-Lane Verification Usage',
  'verify-safe-readiness-fast.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'fixture_review_packet_id',
  'fixture_review_section',
  'fixture_review_status',
  'fixture_review_decision',
  'fixture_required_evidence',
  'fixture_evidence_status',
  'fixture_unresolved_blocker',
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
  'Executive go/no-go summary',
  'Channel adapter contract evidence',
  'Channel payload replay evidence',
  'Channel replay acceptance gate evidence',
  'SMS evidence',
  'Email evidence',
  'Call/Vapi evidence',
  'Google Calendar evidence',
  'CSV/reporting evidence',
  'CRM handoff/export evidence',
  'Lindy bridge evidence',
  'Scheduler/dispatcher evidence',
  'Public route/webhook evidence',
  'Supabase persistence evidence',
  'Billing/payment/quote/estimate/invoice blocked boundary evidence',
  'Messaging compliance evidence',
  'Credential/env boundary evidence',
  'Data boundary / PII evidence',
  'Audit/timeline evidence',
  'Owner routing evidence',
  'Rollback readiness evidence',
  'Post-approval test plan evidence',
  'Unresolved blocker register',
  'Final decision checklist',
  'Explicit approval still required',
  'Sandbox/test-mode activation remains blocked',
  'sandbox_test_mode_human_review_packet_dry_run_summary',
  'sandbox_test_mode_human_review_packet_items',
  'human_review_packet_toc_summary',
  'executive_go_no_go_summary',
  'explicit_non_approval_summary',
  'channel_evidence_summary',
  'sms_review_summary',
  'email_review_summary',
  'call_vapi_review_summary',
  'google_calendar_review_summary',
  'csv_reporting_review_summary',
  'crm_handoff_export_review_summary',
  'lindy_bridge_review_summary',
  'scheduler_dispatcher_review_summary',
  'public_route_webhook_review_summary',
  'supabase_persistence_review_summary',
  'billing_payment_quote_boundary_review_summary',
  'messaging_compliance_review_summary',
  'credential_env_boundary_review_summary',
  'data_boundary_pii_review_summary',
  'audit_timeline_review_summary',
  'owner_routing_review_summary',
  'unresolved_blocker_register_summary',
  'rollback_readiness_summary',
  'post_approval_test_plan_summary',
  'final_decision_checklist_summary',
  'sandbox_test_mode_human_review_packet_safety_assertions',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
];

const REQUIRED_REVIEW_SECTIONS = [
  'Executive go/no-go summary',
  'Channel adapter contract evidence',
  'Channel payload replay evidence',
  'Channel replay acceptance gate evidence',
  'SMS evidence',
  'Email evidence',
  'Call/Vapi evidence',
  'Google Calendar evidence',
  'CSV/reporting evidence',
  'CRM handoff/export evidence',
  'Lindy bridge evidence',
  'Scheduler/dispatcher evidence',
  'Public route/webhook evidence',
  'Supabase persistence evidence',
  'Billing/payment/quote/estimate/invoice blocked boundary evidence',
  'Messaging compliance evidence',
  'Credential/env boundary evidence',
  'Data boundary / PII evidence',
  'Audit/timeline evidence',
  'Owner routing evidence',
  'Rollback readiness evidence',
  'Post-approval test plan evidence',
  'Unresolved blocker register',
  'Final decision checklist',
  'Explicit approval still required',
  'Sandbox/test-mode activation remains blocked',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_review_packet_id',
  'fixture_review_section',
  'fixture_review_status',
  'fixture_review_decision',
  'fixture_required_evidence',
  'fixture_evidence_status',
  'fixture_unresolved_blocker',
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
  'sandbox_test_mode_human_review_packet_dry_run_summary',
  'sandbox_test_mode_human_review_packet_items',
  'human_review_packet_toc_summary',
  'executive_go_no_go_summary',
  'explicit_non_approval_summary',
  'channel_evidence_summary',
  'sms_review_summary',
  'email_review_summary',
  'call_vapi_review_summary',
  'google_calendar_review_summary',
  'csv_reporting_review_summary',
  'crm_handoff_export_review_summary',
  'lindy_bridge_review_summary',
  'scheduler_dispatcher_review_summary',
  'public_route_webhook_review_summary',
  'supabase_persistence_review_summary',
  'billing_payment_quote_boundary_review_summary',
  'messaging_compliance_review_summary',
  'credential_env_boundary_review_summary',
  'data_boundary_pii_review_summary',
  'audit_timeline_review_summary',
  'owner_routing_review_summary',
  'unresolved_blocker_register_summary',
  'rollback_readiness_summary',
  'post_approval_test_plan_summary',
  'final_decision_checklist_summary',
  'sandbox_test_mode_human_review_packet_safety_assertions',
];

const REQUIRED_ASSERTIONS = [
  'sandbox_test_mode_human_review_packet_doc_present',
  'fake_data_local_only_scope_present',
  'relationship_to_channel_adapter_contract_present',
  'relationship_to_channel_payload_replay_present',
  'relationship_to_channel_replay_acceptance_gate_present',
  'human_review_packet_toc_present',
  'executive_go_no_go_summary_present',
  'explicit_non_approval_statement_present',
  'approval_placeholder_present',
  'sms_review_present',
  'email_review_present',
  'call_vapi_review_present',
  'google_calendar_review_present',
  'csv_reporting_review_present',
  'crm_handoff_export_review_present',
  'lindy_bridge_review_present',
  'scheduler_dispatcher_review_present',
  'public_route_webhook_review_present',
  'supabase_persistence_review_present',
  'billing_payment_quote_boundary_blocked',
  'messaging_compliance_review_present',
  'credential_env_boundary_review_present',
  'data_boundary_pii_review_present',
  'audit_timeline_review_present',
  'owner_routing_review_present',
  'unresolved_blocker_register_present',
  'rollback_readiness_present',
  'post_approval_test_plan_present',
  'final_decision_checklist_present',
  'final_sandbox_test_mode_approval_remains_blocked',
  'fast_lane_reference_present',
  'runner_outputs_valid_json',
  'review_items_have_common_fields',
  'review_items_remain_dry_run_only',
  'review_items_have_activation_flags_false',
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
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_HUMAN_REVIEW_PACKET_DRY_RUN.md',
  'run-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run.sh',
  'verify-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run-readonly.js',
  'run-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run.js',
  'Native Workflow Fixture Sandbox/Test-Mode Human Review Packet Dry Run',
  'native workflow fixture sandbox test mode human review packet dry run',
  'sandbox test mode human review packet dry run',
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

passAssertion('sandbox_test_mode_human_review_packet_doc_present');

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

mustHave(doc, channelReplayAcceptanceGateDocPath, 'documentation');
mustHave(doc, 'channel replay acceptance gate dry run', 'documentation');
passAssertion('relationship_to_channel_replay_acceptance_gate_present');
passAssertion('human_review_packet_toc_present');
passAssertion('executive_go_no_go_summary_present');
passAssertion('explicit_non_approval_statement_present');
passAssertion('approval_placeholder_present');
passAssertion('sms_review_present');
passAssertion('email_review_present');
passAssertion('call_vapi_review_present');
passAssertion('google_calendar_review_present');
passAssertion('csv_reporting_review_present');
passAssertion('crm_handoff_export_review_present');
passAssertion('lindy_bridge_review_present');
passAssertion('scheduler_dispatcher_review_present');
passAssertion('public_route_webhook_review_present');
passAssertion('supabase_persistence_review_present');
passAssertion('billing_payment_quote_boundary_blocked');
passAssertion('messaging_compliance_review_present');
passAssertion('credential_env_boundary_review_present');
passAssertion('data_boundary_pii_review_present');
passAssertion('audit_timeline_review_present');
passAssertion('owner_routing_review_present');
passAssertion('unresolved_blocker_register_present');
passAssertion('rollback_readiness_present');
passAssertion('post_approval_test_plan_present');
passAssertion('final_decision_checklist_present');
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
  ['sandbox test mode human review packet verifier', verifierPath],
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
  output.sandbox_test_mode_human_review_packet_dry_run !==
  'native_workflow_fixture_sandbox_test_mode_human_review_packet_dry_run'
) {
  fail('sandbox_test_mode_human_review_packet_dry_run marker is incorrect');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level sandbox test mode human review packet sections are present.');

if (
  !Array.isArray(output.sandbox_test_mode_human_review_packet_items) ||
  output.sandbox_test_mode_human_review_packet_items.length !== 26
) {
  fail('sandbox_test_mode_human_review_packet_items must contain exactly 26 items');
}

const reviewSections = new Set(
  output.sandbox_test_mode_human_review_packet_items.map((item) => item.fixture_review_section),
);
for (const section of REQUIRED_REVIEW_SECTIONS) {
  if (!reviewSections.has(section)) fail(`required review section missing: ${section}`);
}

for (const item of output.sandbox_test_mode_human_review_packet_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `review item ${item.fixture_review_packet_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(`review item ${item.fixture_review_packet_id} fixture_delivery_mode is not dry_run_only`);
  }
  if (item.fixture_approval_status !== 'not_approved') {
    fail(`review item ${item.fixture_review_packet_id} fixture_approval_status is not not_approved`);
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`review item ${item.fixture_review_packet_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`review item ${item.fixture_review_packet_id} missing fixture_audit_event_id`);
  }
}
passAssertion('review_items_have_common_fields');
passAssertion('review_items_remain_dry_run_only');
passAssertion('review_items_have_activation_flags_false');

if (!output.common_review_fields_summary.all_items_include_common_fields) {
  fail('common_review_fields_summary.all_items_include_common_fields must be true');
}
if (!output.sandbox_test_mode_human_review_packet_dry_run_summary.all_items_remain_dry_run_only) {
  fail('sandbox_test_mode_human_review_packet_dry_run_summary.all_items_remain_dry_run_only must be true');
}
if (output.billing_payment_quote_boundary_review_summary.automation_forbidden !== true) {
  fail('billing boundary must remain automation forbidden');
}
if (output.crm_handoff_export_review_summary.bidirectional_crm_sync_allowed !== false) {
  fail('crm handoff must remain not bidirectional sync');
}
if (output.lindy_bridge_review_summary.live_lindy_bridge_enabled !== false) {
  fail('live_lindy_bridge_enabled must remain false');
}
if (output.scheduler_dispatcher_review_summary.scheduler_enabled !== false) {
  fail('scheduler must remain disabled');
}
if (output.public_route_webhook_review_summary.public_route_enabled !== false) {
  fail('public route must remain disabled');
}
if (output.supabase_persistence_review_summary.production_write_allowed !== false) {
  fail('supabase production writes must remain blocked');
}
if (output.executive_go_no_go_summary.sandbox_test_mode_activation_allowed !== false) {
  fail('sandbox_test_mode_activation_allowed must remain false');
}
if (output.executive_go_no_go_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.explicit_non_approval_summary.fixture_sandbox_test_mode_approval_granted !== false) {
  fail('fixture_sandbox_test_mode_approval_granted must remain false');
}
if (!output.explicit_non_approval_summary.approval_placeholder_present) {
  fail('approval_placeholder_present must be true');
}
const finalReview = output.sandbox_test_mode_human_review_packet_items.find(
  (item) => item.fixture_review_section === 'Sandbox/test-mode activation remains blocked',
);
if (!finalReview || finalReview.fixture_review_decision !== 'no_go_sandbox_test_mode_blocked') {
  fail('final sandbox/test-mode review must have no_go_sandbox_test_mode_blocked decision');
}
const approvalReview = output.sandbox_test_mode_human_review_packet_items.find(
  (item) => item.fixture_review_section === 'Explicit approval still required',
);
if (!approvalReview || approvalReview.fixture_review_decision !== 'no_go_approval_not_granted') {
  fail('explicit approval review must have no_go_approval_not_granted decision');
}
if (!output.audit_timeline_review_summary.all_items_have_audit_event_id) {
  fail('all review items must have audit event id');
}
if (!output.owner_routing_review_summary.all_failures_routed_to_safe_owner) {
  fail('all failures must be routed to safe owner');
}
if (!output.unresolved_blocker_register_summary.all_blockers_have_owner) {
  fail('all blockers must have owner');
}
if (output.human_review_packet_toc_summary.total_sections !== 26) {
  fail('human_review_packet_toc_summary must have 26 sections');
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
  'verify-native-workflow-fixture-sandbox-test-mode-human-review-packet-dry-run-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Sandbox/Test-Mode Human Review Packet Dry Run',
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
      'sandbox_test_mode_human_review_packet_doc_present',
      'fake_data_local_only_scope_present',
      'relationship_to_channel_adapter_contract_present',
      'relationship_to_channel_payload_replay_present',
      'relationship_to_channel_replay_acceptance_gate_present',
      'human_review_packet_toc_present',
      'executive_go_no_go_summary_present',
      'explicit_non_approval_statement_present',
      'approval_placeholder_present',
      'sms_review_present',
      'email_review_present',
      'call_vapi_review_present',
      'google_calendar_review_present',
      'csv_reporting_review_present',
      'crm_handoff_export_review_present',
      'lindy_bridge_review_present',
      'scheduler_dispatcher_review_present',
      'public_route_webhook_review_present',
      'supabase_persistence_review_present',
      'billing_payment_quote_boundary_blocked',
      'messaging_compliance_review_present',
      'credential_env_boundary_review_present',
      'data_boundary_pii_review_present',
      'audit_timeline_review_present',
      'owner_routing_review_present',
      'unresolved_blocker_register_present',
      'rollback_readiness_present',
      'post_approval_test_plan_present',
      'final_decision_checklist_present',
      'final_sandbox_test_mode_approval_remains_blocked',
      'fast_lane_reference_present',
      'runner_outputs_valid_json',
      'review_items_have_common_fields',
      'review_items_remain_dry_run_only',
      'review_items_have_activation_flags_false',
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
  `PASS: Native Workflow Fixture Sandbox/Test-Mode Human Review Packet Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Fast lane is additive; full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);