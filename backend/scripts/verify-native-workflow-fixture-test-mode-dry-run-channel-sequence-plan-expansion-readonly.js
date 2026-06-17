#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '../..');

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

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_TEST_MODE_DRY_RUN_CHANNEL_SEQUENCE_PLAN_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const e2eVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-readonly.js';
const readinessGateVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-integration-readiness-gate-expansion-readonly.js';
const approvalRunbookVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-approval-runbook-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_SEQUENCE_ITEM_FIELDS = [
  'sequence_item_id',
  'sequence_order',
  'scenario_id',
  'roofer_account_id',
  'plan_profile',
  'channel',
  'integration_name',
  'sequence_stage',
  'prerequisite_stage',
  'prerequisite_status',
  'approval_required',
  'explicit_approval_present',
  'approval_evidence_present',
  'sandbox_credentials_required',
  'sandbox_credentials_present',
  'production_credentials_present',
  'env_values_logged',
  'public_route_required',
  'public_route_enabled',
  'scheduler_required',
  'scheduler_enabled',
  'dispatcher_required',
  'dispatcher_enabled',
  'live_activation_flag_name',
  'live_activation_flag_value',
  'test_mode_activation_allowed',
  'live_activation_allowed',
  'dry_run_rehearsal_allowed',
  'external_call_allowed',
  'prerequisite_blocker_reason',
  'required_manual_next_step',
  'next_step_owner',
  'rollback_plan_required',
  'rollback_plan_present',
  'post_approval_test_plan_required',
  'post_approval_test_plan_present',
  'audit_event_id',
  'production_data_touched',
  'external_services_called',
  'notification_sent',
  'live_action_performed',
];

const REQUIRED_SEQUENCE_INTEGRATIONS = [
  'fixture_only_sequence_rehearsal',
  'messaging_compliance_prerequisite_review',
  'twilio',
  'resend',
  'vapi',
  'google_calendar',
  'csv_delivery',
  'crm_handoff_export',
  'lindy_bridge',
  'scheduler_cron',
  'dispatcher',
  'public_webhook',
  'supabase',
  'billing_payment_invoice_estimate_quote',
];

const SEQUENCE_MESSAGING_INTEGRATIONS = new Set(['twilio', 'resend', 'vapi']);
const SEQUENCE_DATA_BOUNDARY_INTEGRATIONS = new Set(['csv_delivery', 'crm_handoff_export']);
const SEQUENCE_ACTIVATION_INTEGRATIONS = new Set([
  'twilio',
  'resend',
  'vapi',
  'google_calendar',
  'csv_delivery',
  'crm_handoff_export',
  'lindy_bridge',
  'scheduler_cron',
  'dispatcher',
  'public_webhook',
  'supabase',
  'billing_payment_invoice_estimate_quote',
]);

const REQUIRED_SAFETY_ASSERTIONS = [
  'test_mode_channel_sequence_plan_expansion_summary_present',
  'test_mode_channel_sequence_items_present',
  'test_mode_channel_sequence_item_required_fields_present',
  'required_channels_present',
  'sequence_order_present_and_deterministic',
  'channel_sequence_order_summary_present',
  'prerequisite_gate_summary_present',
  'approval_dependency_summary_present',
  'dry_run_rehearsal_scope_summary_present',
  'channel_isolation_summary_present',
  'rollback_dependency_summary_present',
  'data_boundary_sequence_summary_present',
  'messaging_compliance_sequence_summary_present',
  'calendar_booking_sequence_summary_present',
  'reporting_csv_sequence_summary_present',
  'crm_handoff_sequence_summary_present',
  'scheduler_dispatcher_sequence_summary_present',
  'public_route_sequence_summary_present',
  'supabase_persistence_sequence_summary_present',
  'billing_payment_quote_sequence_summary_present',
  'sequence_audit_summary_present',
  'approval_required_is_yes_for_activation_items',
  'explicit_approval_present_is_no_for_all_items',
  'approval_evidence_present_is_no_for_all_items',
  'sandbox_credentials_present_is_no_for_all_items',
  'production_credentials_present_is_no_for_all_items',
  'env_values_logged_is_no_for_all_items',
  'public_route_enabled_is_no_for_all_items',
  'scheduler_enabled_is_no_for_all_items',
  'dispatcher_enabled_is_no_for_all_items',
  'live_activation_flags_remain_false_for_all_items',
  'test_mode_activation_allowed_is_no_for_all_items',
  'live_activation_allowed_is_no_for_all_items',
  'external_call_allowed_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'live_action_performed_is_no_for_all_items',
  'fixture_only_dry_run_sequence_allowed_without_external_calls',
  'messaging_compliance_prerequisite_before_messaging_channels',
  'data_boundary_prerequisite_before_csv_and_crm_delivery',
  'calendar_preferences_prerequisite_before_calendar_booking',
  'missing_explicit_approval_blocks_test_mode_activation',
  'missing_rollback_plan_blocks_test_mode_activation',
  'missing_post_approval_test_plan_blocks_test_mode_activation',
  'missing_security_tenant_isolation_review_blocks_persistence',
  'no_supabase_calls',
  'no_schema_migrations_auth_rls_security_changes',
  'no_twilio_calls',
  'no_vapi_calls',
  'no_resend_calls',
  'no_lindy_live_workflow_execution',
  'no_google_calendar_calls',
  'no_crm_sync',
  'no_live_csv_delivery',
  'no_billing_or_payment_action',
  'no_estimate_quote_invoice_payment_generation',
  'safe_lindy_bridge_reference_not_live_activation',
  'real_lindy_activation_patterns_remain_forbidden',
  'test_mode_channel_sequence_plan_is_fake_data_only',
  'test_mode_channel_sequence_plan_is_audited',
  'reporting_summary_includes_test_mode_channel_sequence_plan',
  'public_go_live_or_production_copy_not_changed_without_approval',
];

const doc = read(docPath);
const runner = read(runnerPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);

console.log('PASS: required doc exists.');
console.log('PASS: existing fixture runner exists.');
console.log('PASS: existing fixture dry-run verifier exists.');
console.log('PASS: e2e acceptance rehearsal verifier exists.');
console.log('PASS: sandbox test-mode readiness gate verifier exists.');
console.log('PASS: sandbox test-mode approval runbook verifier exists.');
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['channel sequence plan verifier', verifierPath],
  ['existing fixture verifier', existingVerifierPath],
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
console.log('PASS: new verifier syntax check succeeded.');

const runResult = spawnSync(process.execPath, [path.join(root, runnerPath)], {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
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
console.log('PASS: output preserves demo_ready_with_live_automation_disabled.');

if (!output.scenarios || output.scenarios.length !== 25) {
  fail(
    `output must include exactly 25 scenarios (found ${output.scenarios ? output.scenarios.length : 0})`,
  );
}
console.log('PASS: output includes all 25 required scenarios.');

if (!output.test_mode_channel_sequence_plan_expansion) {
  fail('output missing test_mode_channel_sequence_plan_expansion marker');
}
if (
  output.test_mode_channel_sequence_plan_expansion !==
  'native_workflow_fixture_test_mode_dry_run_channel_sequence_plan_expansion'
) {
  fail('test_mode_channel_sequence_plan_expansion marker is incorrect');
}
console.log('PASS: output includes test_mode_channel_sequence_plan_expansion marker.');

for (const section of [
  'test_mode_channel_sequence_plan_expansion_summary',
  'test_mode_channel_sequence_items',
  'channel_sequence_order_summary',
  'prerequisite_gate_summary',
  'approval_dependency_summary',
  'dry_run_rehearsal_scope_summary',
  'channel_isolation_summary',
  'rollback_dependency_summary',
  'data_boundary_sequence_summary',
  'messaging_compliance_sequence_summary',
  'calendar_booking_sequence_summary',
  'reporting_csv_sequence_summary',
  'crm_handoff_sequence_summary',
  'scheduler_dispatcher_sequence_summary',
  'public_route_sequence_summary',
  'supabase_persistence_sequence_summary',
  'billing_payment_quote_sequence_summary',
  'sequence_audit_summary',
  'test_mode_channel_sequence_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level test-mode channel sequence plan sections are present.');

if (
  !Array.isArray(output.test_mode_channel_sequence_items) ||
  !output.test_mode_channel_sequence_items.length
) {
  fail('test_mode_channel_sequence_items must be a non-empty array');
}
console.log(
  `PASS: test_mode_channel_sequence_items (${output.test_mode_channel_sequence_items.length}) are present.`,
);

const integrationNames = new Set(
  output.test_mode_channel_sequence_items.map((item) => item.integration_name),
);
for (const integration of REQUIRED_SEQUENCE_INTEGRATIONS) {
  if (!integrationNames.has(integration)) {
    fail(`required integration missing: ${integration}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SEQUENCE_INTEGRATIONS.length} required sequence integrations are present.`,
);

const sequenceOrders = output.test_mode_channel_sequence_items.map((item) => item.sequence_order);
const expectedOrders = Array.from(
  { length: output.test_mode_channel_sequence_items.length },
  (_, index) => index + 1,
);
if (sequenceOrders.length !== expectedOrders.length) {
  fail('sequence order count mismatch');
}
for (let i = 0; i < expectedOrders.length; i += 1) {
  if (sequenceOrders[i] !== expectedOrders[i]) {
    fail(`sequence order not deterministic at position ${i}: expected ${expectedOrders[i]}, got ${sequenceOrders[i]}`);
  }
}
console.log('PASS: sequence order is present and deterministic (1..14).');

const messagingComplianceOrder = output.test_mode_channel_sequence_items.find(
  (item) => item.integration_name === 'messaging_compliance_prerequisite_review',
)?.sequence_order;
for (const integration of SEQUENCE_MESSAGING_INTEGRATIONS) {
  const item = output.test_mode_channel_sequence_items.find(
    (entry) => entry.integration_name === integration,
  );
  if (!item) fail(`messaging channel missing: ${integration}`);
  if (item.sequence_order <= messagingComplianceOrder) {
    fail(`${integration} must follow messaging compliance prerequisite in sequence order`);
  }
  if (item.prerequisite_stage !== 'messaging_compliance_prerequisite_review') {
    fail(`${integration} prerequisite_stage must be messaging_compliance_prerequisite_review`);
  }
}
console.log('PASS: messaging compliance prerequisite precedes messaging channels.');

const calendarItem = output.test_mode_channel_sequence_items.find(
  (item) => item.integration_name === 'google_calendar',
);
if (!calendarItem) fail('google_calendar sequence item missing');
if (calendarItem.prerequisite_stage !== 'calendar_booking_preferences_review') {
  fail('google_calendar prerequisite_stage must be calendar_booking_preferences_review');
}
console.log('PASS: calendar preferences prerequisite precedes calendar booking.');

for (const integration of SEQUENCE_DATA_BOUNDARY_INTEGRATIONS) {
  const item = output.test_mode_channel_sequence_items.find(
    (entry) => entry.integration_name === integration,
  );
  if (!item) fail(`data boundary channel missing: ${integration}`);
  if (item.prerequisite_stage !== 'data_boundary_review') {
    fail(`${integration} prerequisite_stage must be data_boundary_review`);
  }
}
console.log('PASS: data boundary prerequisite precedes CSV and CRM delivery.');

for (const item of output.test_mode_channel_sequence_items) {
  for (const field of REQUIRED_SEQUENCE_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(`sequence item ${item.sequence_item_id || 'unknown'} missing field: ${field}`);
    }
  }
  if (SEQUENCE_ACTIVATION_INTEGRATIONS.has(item.integration_name) && item.approval_required !== 'yes') {
    fail(`activation item ${item.sequence_item_id} approval_required is not yes`);
  }
  for (const safetyField of [
    'explicit_approval_present',
    'approval_evidence_present',
    'sandbox_credentials_present',
    'production_credentials_present',
    'env_values_logged',
    'public_route_enabled',
    'scheduler_enabled',
    'dispatcher_enabled',
    'test_mode_activation_allowed',
    'live_activation_allowed',
    'external_call_allowed',
    'production_data_touched',
    'external_services_called',
    'notification_sent',
    'live_action_performed',
  ]) {
    if (item[safetyField] !== 'no') {
      fail(`sequence item ${item.sequence_item_id} ${safetyField} is not no`);
    }
  }
  if (item.live_activation_flag_value !== false) {
    fail(`sequence item ${item.sequence_item_id} live_activation_flag_value is not false`);
  }
  if (!item.audit_event_id) {
    fail(`sequence item ${item.sequence_item_id} missing audit_event_id`);
  }
  if (!item.next_step_owner) {
    fail(`sequence item ${item.sequence_item_id} missing next_step_owner`);
  }
  if (SEQUENCE_ACTIVATION_INTEGRATIONS.has(item.integration_name)) {
    if (!item.prerequisite_blocker_reason.includes('missing_explicit_approval_blocks_test_mode_activation')) {
      fail(`activation item ${item.sequence_item_id} missing explicit approval blocker`);
    }
    if (!item.prerequisite_blocker_reason.includes('missing_rollback_plan_blocks_test_mode_activation')) {
      fail(`activation item ${item.sequence_item_id} missing rollback plan blocker`);
    }
    if (
      !item.prerequisite_blocker_reason.includes(
        'missing_post_approval_test_plan_blocks_test_mode_activation',
      )
    ) {
      fail(`activation item ${item.sequence_item_id} missing post-approval test plan blocker`);
    }
    if (item.rollback_plan_required !== 'yes' || item.rollback_plan_present !== 'no') {
      fail(`activation item ${item.sequence_item_id} rollback plan fields incorrect`);
    }
    if (
      item.post_approval_test_plan_required !== 'yes' ||
      item.post_approval_test_plan_present !== 'no'
    ) {
      fail(`activation item ${item.sequence_item_id} post-approval test plan fields incorrect`);
    }
  }
  if (SEQUENCE_MESSAGING_INTEGRATIONS.has(item.integration_name)) {
    if (
      !item.prerequisite_blocker_reason.includes(
        'missing_messaging_compliance_review_blocks_messaging_test_mode',
      )
    ) {
      fail(`messaging channel ${item.sequence_item_id} missing messaging compliance blocker`);
    }
  }
  if (item.integration_name === 'google_calendar') {
    if (
      !item.prerequisite_blocker_reason.includes(
        'missing_calendar_booking_preferences_review_blocks_calendar_test_mode',
      )
    ) {
      fail(`calendar item ${item.sequence_item_id} missing calendar preferences blocker`);
    }
  }
  if (SEQUENCE_DATA_BOUNDARY_INTEGRATIONS.has(item.integration_name)) {
    if (
      !item.prerequisite_blocker_reason.includes(
        'missing_data_boundary_review_blocks_csv_or_crm_delivery_test_mode',
      )
    ) {
      fail(`data boundary item ${item.sequence_item_id} missing data boundary blocker`);
    }
  }
  if (item.integration_name === 'supabase') {
    if (
      !item.prerequisite_blocker_reason.includes(
        'missing_security_tenant_isolation_review_blocks_persistence',
      )
    ) {
      fail(`supabase item ${item.sequence_item_id} missing security/tenant isolation blocker`);
    }
  }
  if (item.integration_name === 'fixture_only_sequence_rehearsal') {
    if (item.dry_run_rehearsal_allowed !== 'yes') {
      fail('fixture-only sequence item dry_run_rehearsal_allowed must be yes');
    }
    if (item.external_call_allowed !== 'no') {
      fail('fixture-only sequence item external_call_allowed must be no');
    }
  } else if (item.dry_run_rehearsal_allowed !== 'no') {
    fail(`sequence item ${item.sequence_item_id} dry_run_rehearsal_allowed must be no`);
  }
}
console.log('PASS: every test-mode channel sequence item has required fields and safety values.');

if (!output.test_mode_channel_sequence_plan_expansion_summary.all_required_channels_present) {
  fail(
    'test_mode_channel_sequence_plan_expansion_summary.all_required_channels_present must be true',
  );
}
if (
  output.test_mode_channel_sequence_plan_expansion_summary.total_sequence_items !==
  REQUIRED_SEQUENCE_INTEGRATIONS.length
) {
  fail(
    `expected ${REQUIRED_SEQUENCE_INTEGRATIONS.length} sequence items, found ${output.test_mode_channel_sequence_plan_expansion_summary.total_sequence_items}`,
  );
}
if (!output.test_mode_channel_sequence_plan_expansion_summary.sequence_order_deterministic) {
  fail('test_mode_channel_sequence_plan_expansion_summary.sequence_order_deterministic must be true');
}
console.log('PASS: test-mode channel sequence plan expansion summary verified.');

if (!output.channel_sequence_order_summary.sequence_order_deterministic) {
  fail('channel_sequence_order_summary.sequence_order_deterministic must be true');
}
if (!output.channel_sequence_order_summary.fixture_only_sequence_first) {
  fail('channel_sequence_order_summary.fixture_only_sequence_first must be true');
}
if (!output.channel_sequence_order_summary.messaging_compliance_prerequisite_second) {
  fail('channel_sequence_order_summary.messaging_compliance_prerequisite_second must be true');
}
if (!output.channel_sequence_order_summary.reporting_summary_includes_test_mode_channel_sequence_plan) {
  fail(
    'channel_sequence_order_summary.reporting_summary_includes_test_mode_channel_sequence_plan must be true',
  );
}
console.log('PASS: channel sequence order summary verified.');

if (!output.prerequisite_gate_summary.messaging_compliance_prerequisite_before_messaging_channels) {
  fail(
    'prerequisite_gate_summary.messaging_compliance_prerequisite_before_messaging_channels must be true',
  );
}
if (!output.prerequisite_gate_summary.calendar_preferences_prerequisite_before_calendar_booking) {
  fail(
    'prerequisite_gate_summary.calendar_preferences_prerequisite_before_calendar_booking must be true',
  );
}
if (!output.prerequisite_gate_summary.data_boundary_prerequisite_before_csv_and_crm_delivery) {
  fail(
    'prerequisite_gate_summary.data_boundary_prerequisite_before_csv_and_crm_delivery must be true',
  );
}
if (!output.prerequisite_gate_summary.security_tenant_isolation_prerequisite_before_persistence) {
  fail(
    'prerequisite_gate_summary.security_tenant_isolation_prerequisite_before_persistence must be true',
  );
}
console.log('PASS: prerequisite gate summary verified.');

if (!output.approval_dependency_summary.missing_explicit_approval_blocks_test_mode_activation) {
  fail('approval_dependency_summary.missing_explicit_approval_blocks_test_mode_activation must be true');
}
if (!output.approval_dependency_summary.test_mode_activation_requires_explicit_approval) {
  fail('approval_dependency_summary.test_mode_activation_requires_explicit_approval must be true');
}
console.log('PASS: approval dependency summary verified.');

if (
  !output.dry_run_rehearsal_scope_summary.fixture_only_dry_run_sequence_allowed_without_external_calls
) {
  fail(
    'dry_run_rehearsal_scope_summary.fixture_only_dry_run_sequence_allowed_without_external_calls must be true',
  );
}
if (output.dry_run_rehearsal_scope_summary.test_mode_activation_allowed_for_all_items !== 'no') {
  fail('dry_run_rehearsal_scope_summary.test_mode_activation_allowed_for_all_items must be no');
}
console.log('PASS: dry-run rehearsal scope summary verified.');

if (!output.channel_isolation_summary.channels_isolated_in_sequence) {
  fail('channel_isolation_summary.channels_isolated_in_sequence must be true');
}
if (!output.channel_isolation_summary.safe_lindy_bridge_reference_not_live_activation) {
  fail('channel_isolation_summary.safe_lindy_bridge_reference_not_live_activation must be true');
}
if (!output.channel_isolation_summary.crm_handoff_not_native_crm_sync) {
  fail('channel_isolation_summary.crm_handoff_not_native_crm_sync must be true');
}
console.log('PASS: channel isolation summary verified.');

if (!output.rollback_dependency_summary.missing_rollback_plan_blocks_test_mode_activation) {
  fail('rollback_dependency_summary.missing_rollback_plan_blocks_test_mode_activation must be true');
}
console.log('PASS: rollback dependency summary verified.');

if (!output.data_boundary_sequence_summary.data_boundary_prerequisite_before_csv_and_crm_delivery) {
  fail(
    'data_boundary_sequence_summary.data_boundary_prerequisite_before_csv_and_crm_delivery must be true',
  );
}
if (!output.data_boundary_sequence_summary.crm_handoff_not_native_crm_sync) {
  fail('data_boundary_sequence_summary.crm_handoff_not_native_crm_sync must be true');
}
console.log('PASS: data boundary sequence summary verified.');

if (
  !output.messaging_compliance_sequence_summary.messaging_compliance_prerequisite_before_messaging_channels
) {
  fail(
    'messaging_compliance_sequence_summary.messaging_compliance_prerequisite_before_messaging_channels must be true',
  );
}
console.log('PASS: messaging compliance sequence summary verified.');

if (
  !output.calendar_booking_sequence_summary.calendar_preferences_prerequisite_before_calendar_booking
) {
  fail(
    'calendar_booking_sequence_summary.calendar_preferences_prerequisite_before_calendar_booking must be true',
  );
}
console.log('PASS: calendar booking sequence summary verified.');

if (!output.reporting_csv_sequence_summary.no_live_csv_delivery) {
  fail('reporting_csv_sequence_summary.no_live_csv_delivery must be true');
}
console.log('PASS: reporting CSV sequence summary verified.');

if (!output.crm_handoff_sequence_summary.crm_handoff_not_native_crm_sync) {
  fail('crm_handoff_sequence_summary.crm_handoff_not_native_crm_sync must be true');
}
if (!output.crm_handoff_sequence_summary.no_crm_sync) {
  fail('crm_handoff_sequence_summary.no_crm_sync must be true');
}
console.log('PASS: CRM handoff sequence summary verified.');

if (output.scheduler_dispatcher_sequence_summary.scheduler_enabled !== 'no') {
  fail('scheduler_dispatcher_sequence_summary.scheduler_enabled must be no');
}
if (output.scheduler_dispatcher_sequence_summary.dispatcher_enabled !== 'no') {
  fail('scheduler_dispatcher_sequence_summary.dispatcher_enabled must be no');
}
console.log('PASS: scheduler/dispatcher sequence summary verified.');

if (output.public_route_sequence_summary.public_route_enabled !== 'no') {
  fail('public_route_sequence_summary.public_route_enabled must be no');
}
console.log('PASS: public route sequence summary verified.');

if (!output.supabase_persistence_sequence_summary.supabase_persistence_blocked_until_review) {
  fail('supabase_persistence_sequence_summary.supabase_persistence_blocked_until_review must be true');
}
if (
  !output.supabase_persistence_sequence_summary.missing_security_tenant_isolation_review_blocks_persistence
) {
  fail(
    'supabase_persistence_sequence_summary.missing_security_tenant_isolation_review_blocks_persistence must be true',
  );
}
console.log('PASS: Supabase persistence sequence summary verified.');

if (!output.billing_payment_quote_sequence_summary.billing_automation_blocked) {
  fail('billing_payment_quote_sequence_summary.billing_automation_blocked must be true');
}
if (!output.billing_payment_quote_sequence_summary.no_billing_or_payment_action) {
  fail('billing_payment_quote_sequence_summary.no_billing_or_payment_action must be true');
}
console.log('PASS: billing/payment/quote sequence summary verified.');

if (!output.sequence_audit_summary.all_items_have_audit_event_id) {
  fail('sequence_audit_summary.all_items_have_audit_event_id must be true');
}
console.log('PASS: sequence audit summary verified.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.test_mode_channel_sequence_safety_assertions.includes(assertion)) {
    fail(`test_mode_channel_sequence_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required test-mode channel sequence safety assertions are present.`,
);

if (
  output.test_mode_channel_sequence_plan_expansion_summary.public_go_live_or_production_copy_changed !==
  false
) {
  fail('public_go_live_or_production_copy_changed must be false in expansion summary');
}
console.log('PASS: public copy unchanged guard verified.');

for (const scenario of output.scenarios) {
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (!Array.isArray(scenario.test_mode_channel_sequence_items)) {
    fail(
      `scenario ${scenario.scenario_id} missing per-scenario test_mode_channel_sequence_items array`,
    );
  }
}
console.log(
  'PASS: every scenario preserves safety fields and per-scenario test-mode channel sequence items.',
);

if (!output.sandbox_test_mode_approval_runbook_expansion) {
  fail('output missing sandbox_test_mode_approval_runbook_expansion — prior approval runbook must remain');
}
if (!output.sandbox_test_mode_readiness_expansion) {
  fail('output missing sandbox_test_mode_readiness_expansion — prior readiness gate must remain');
}
if (!output.e2e_acceptance_rehearsal_expansion) {
  fail('output missing e2e_acceptance_rehearsal_expansion — prior e2e expansion must remain');
}
if (!output.guard_assertion_summary) {
  fail('output missing guard_assertion_summary');
}
console.log('PASS: prior expansion summaries remain present.');

const existingVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, existingVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);
if (existingVerifierRun.status !== 0) {
  fail(
    `existing fixture dry-run verifier failed: ${existingVerifierRun.stderr || existingVerifierRun.stdout}`,
  );
}
console.log('PASS: existing fixture dry-run verifier still passes.');

const e2eVerifierRun = spawnSync(process.execPath, [path.join(root, e2eVerifierPath)], {
  cwd: root,
  encoding: 'utf8',
  maxBuffer: 64 * 1024 * 1024,
});
if (e2eVerifierRun.status !== 0) {
  fail(`e2e acceptance verifier failed: ${e2eVerifierRun.stderr || e2eVerifierRun.stdout}`);
}
console.log('PASS: e2e acceptance rehearsal verifier still passes.');

const readinessGateVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, readinessGateVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);
if (readinessGateVerifierRun.status !== 0) {
  fail(
    `sandbox test-mode readiness gate verifier failed: ${readinessGateVerifierRun.stderr || readinessGateVerifierRun.stdout}`,
  );
}
console.log('PASS: sandbox test-mode readiness gate verifier still passes.');

const approvalRunbookVerifierRun = spawnSync(
  process.execPath,
  [path.join(root, approvalRunbookVerifierPath)],
  { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
);
if (approvalRunbookVerifierRun.status !== 0) {
  fail(
    `sandbox test-mode approval runbook verifier failed: ${approvalRunbookVerifierRun.stderr || approvalRunbookVerifierRun.stdout}`,
  );
}
console.log('PASS: sandbox test-mode approval runbook verifier still passes.');

mustHave(doc, 'Local E2E Fixture Runner', 'documentation');
mustHave(doc, 'LOCAL_E2E_FIXTURE_RUNNER_PACKET.md', 'documentation');
console.log('PASS: documentation includes local E2E runner relationship.');

mustHave(doc, 'first paid roofer', 'documentation');
console.log('PASS: documentation includes first paid roofer relationship.');

const forbiddenPublic = [
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
for (const phrase of forbiddenPublic) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}
console.log('PASS: forbidden public language is absent from documentation.');

const unsafePatterns = [
  /@supabase\/supabase-js/,
  /require\(['"]dotenv['"]\)/,
  /process\.env\.SUPABASE/i,
  /createClient\(/,
  /require\(['"]twilio['"]\)/i,
  /require\(['"]https['"]\)/,
  /require\(['"]http['"]\)/,
  /fetch\(/,
  /ALTER TABLE/,
  /CREATE TABLE/,
  /CREATE POLICY/,
];
for (const [label, file] of [
  ['runner', runner],
  ['wrapper', wrapper],
  ['documentation', doc],
]) {
  for (const pattern of unsafePatterns) {
    if (pattern.test(file)) {
      fail(`unsafe pattern ${pattern} found in ${label}`);
    }
  }
}
console.log('PASS: no unsafe imports or strings in runner/verifier/wrapper/docs.');

const safetyDocPhrases = [
  'no Supabase',
  'no schema',
  'no migrations',
  'no auth/RLS',
  'no production data',
  'no live automation',
  'no integrations',
  'no external calls',
  'local fake-data dry-run only',
];
for (const phrase of safetyDocPhrases) {
  mustHave(doc, phrase, 'documentation safety boundaries');
}
console.log('PASS: safety/no-live/no-production/no-schema/no-integration boundaries documented.');

mustHave(
  aggregate,
  'verify-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Test-Mode Dry-Run Channel Sequence Plan Expansion',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_TEST_MODE_DRY_RUN_CHANNEL_SEQUENCE_PLAN_EXPANSION.md',
  'run-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-dry-run.sh',
  'verify-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-readonly.js',
  'Native Workflow Fixture Test-Mode Dry-Run Channel Sequence Plan Expansion',
  'native workflow fixture test-mode dry-run channel sequence plan expansion',
  'test-mode dry-run channel sequence plan expansion',
];
for (const ref of packetRefs) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextRooferDryRun, ref, 'next chat roofer dry run onboarding context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
console.log('PASS: required wiring into aggregate readiness and context docs is present.');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, 'run-native-workflow-fixture-state-model-dry-run.js', 'wrapper runner');
mustHave(wrapper, 'verify-native-workflow-fixture-state-model-dry-run-readonly.js', 'wrapper existing verifier');
mustHave(
  wrapper,
  'verify-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-readonly.js',
  'wrapper e2e acceptance verifier',
);
mustHave(
  wrapper,
  'verify-native-workflow-fixture-sandbox-test-mode-integration-readiness-gate-expansion-readonly.js',
  'wrapper sandbox test-mode readiness gate verifier',
);
mustHave(
  wrapper,
  'verify-native-workflow-fixture-sandbox-test-mode-approval-runbook-expansion-readonly.js',
  'wrapper sandbox test-mode approval runbook verifier',
);
mustHave(
  wrapper,
  'verify-native-workflow-fixture-test-mode-dry-run-channel-sequence-plan-expansion-readonly.js',
  'wrapper test-mode channel sequence plan verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + REQUIRED_SEQUENCE_INTEGRATIONS.length;

console.log(
  `PASS: Native Workflow Fixture Test-Mode Dry-Run Channel Sequence Plan Expansion verified (${assertionCount}+ assertions, ${output.test_mode_channel_sequence_items.length} test-mode channel sequence items).`,
);
console.log(
  'PASS: Native Workflow Fixture Test-Mode Dry-Run Channel Sequence Plan Expansion is fixture-only, deterministic, and dry-run safe.',
);