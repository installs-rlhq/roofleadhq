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
  'docs/NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_INTEGRATION_READINESS_GATE_EXPANSION.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-state-model-dry-run.js';
const existingVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-state-model-dry-run-readonly.js';
const e2eVerifierPath =
  'backend/scripts/verify-native-workflow-fixture-e2e-acceptance-rehearsal-expansion-readonly.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-sandbox-test-mode-integration-readiness-gate-expansion-dry-run.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-sandbox-test-mode-integration-readiness-gate-expansion-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const REQUIRED_READINESS_ITEM_FIELDS = [
  'sandbox_test_mode_item_id',
  'scenario_id',
  'roofer_account_id',
  'plan_profile',
  'channel',
  'integration_name',
  'test_mode_supported',
  'test_mode_requested',
  'approval_required',
  'explicit_approval_present',
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
  'readiness_status',
  'blocker_reason',
  'required_manual_next_step',
  'next_step_owner',
  'audit_event_id',
  'production_data_touched',
  'external_services_called',
  'notification_sent',
  'live_action_performed',
];

const REQUIRED_INTEGRATIONS = [
  'twilio',
  'vapi',
  'resend',
  'google_calendar',
  'lindy_bridge',
  'csv_delivery',
  'crm_handoff_export',
  'scheduler_cron',
  'dispatcher',
  'public_webhook',
  'supabase',
  'billing_payment_invoice_estimate_quote',
];

const REQUIRED_SAFETY_ASSERTIONS = [
  'sandbox_test_mode_readiness_expansion_summary_present',
  'sandbox_test_mode_readiness_items_present',
  'sandbox_test_mode_readiness_item_required_fields_present',
  'required_channels_present',
  'twilio_test_mode_readiness_summary_present',
  'vapi_test_mode_readiness_summary_present',
  'resend_test_mode_readiness_summary_present',
  'google_calendar_test_mode_readiness_summary_present',
  'lindy_bridge_test_mode_readiness_summary_present',
  'csv_delivery_test_mode_readiness_summary_present',
  'crm_handoff_test_mode_readiness_summary_present',
  'scheduler_dispatcher_readiness_summary_present',
  'public_route_readiness_summary_present',
  'env_credential_boundary_summary_present',
  'approval_gate_summary_present',
  'test_mode_activation_requires_explicit_approval',
  'live_activation_requires_separate_explicit_approval',
  'sandbox_credentials_present_is_no_for_all_items',
  'production_credentials_present_is_no_for_all_items',
  'env_values_logged_is_no_for_all_items',
  'public_route_enabled_is_no_for_all_items',
  'scheduler_enabled_is_no_for_all_items',
  'dispatcher_enabled_is_no_for_all_items',
  'live_activation_flags_remain_false_for_all_items',
  'test_mode_activation_allowed_is_no_for_all_items',
  'live_activation_allowed_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'notification_sent_is_no_for_all_items',
  'live_action_performed_is_no_for_all_items',
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
  'sandbox_test_mode_readiness_is_fake_data_only',
  'sandbox_test_mode_readiness_is_audited',
  'reporting_summary_includes_sandbox_test_mode_readiness',
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
console.log('PASS: new dry-run wrapper exists.');

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['sandbox test-mode verifier', verifierPath],
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

if (!output.sandbox_test_mode_readiness_expansion) {
  fail('output missing sandbox_test_mode_readiness_expansion marker');
}
if (
  output.sandbox_test_mode_readiness_expansion !==
  'native_workflow_fixture_sandbox_test_mode_integration_readiness_gate_expansion'
) {
  fail('sandbox_test_mode_readiness_expansion marker is incorrect');
}
console.log('PASS: output includes sandbox_test_mode_readiness_expansion marker.');

for (const section of [
  'sandbox_test_mode_readiness_expansion_summary',
  'sandbox_test_mode_readiness_items',
  'channel_readiness_summary',
  'twilio_test_mode_readiness_summary',
  'vapi_test_mode_readiness_summary',
  'resend_test_mode_readiness_summary',
  'google_calendar_test_mode_readiness_summary',
  'lindy_bridge_test_mode_readiness_summary',
  'csv_delivery_test_mode_readiness_summary',
  'crm_handoff_test_mode_readiness_summary',
  'scheduler_dispatcher_readiness_summary',
  'public_route_readiness_summary',
  'env_credential_boundary_summary',
  'approval_gate_summary',
  'sandbox_test_mode_safety_assertions',
]) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log('PASS: top-level sandbox test-mode readiness sections are present.');

if (
  !Array.isArray(output.sandbox_test_mode_readiness_items) ||
  !output.sandbox_test_mode_readiness_items.length
) {
  fail('sandbox_test_mode_readiness_items must be a non-empty array');
}
console.log(
  `PASS: sandbox_test_mode_readiness_items (${output.sandbox_test_mode_readiness_items.length}) are present.`,
);

const integrationNames = new Set(
  output.sandbox_test_mode_readiness_items.map((item) => item.integration_name),
);
for (const integration of REQUIRED_INTEGRATIONS) {
  if (!integrationNames.has(integration)) {
    fail(`required integration missing: ${integration}`);
  }
}
console.log(`PASS: all ${REQUIRED_INTEGRATIONS.length} required channels/integrations are present.`);

for (const item of output.sandbox_test_mode_readiness_items) {
  for (const field of REQUIRED_READINESS_ITEM_FIELDS) {
    if (!(field in item)) {
      fail(
        `sandbox test-mode item ${item.sandbox_test_mode_item_id || 'unknown'} missing field: ${field}`,
      );
    }
  }
  for (const safetyField of [
    'explicit_approval_present',
    'sandbox_credentials_present',
    'production_credentials_present',
    'env_values_logged',
    'public_route_enabled',
    'scheduler_enabled',
    'dispatcher_enabled',
    'test_mode_activation_allowed',
    'live_activation_allowed',
    'production_data_touched',
    'external_services_called',
    'notification_sent',
    'live_action_performed',
  ]) {
    if (item[safetyField] !== 'no') {
      fail(`readiness item ${item.sandbox_test_mode_item_id} ${safetyField} is not no`);
    }
  }
  if (item.live_activation_flag_value !== false) {
    fail(`readiness item ${item.sandbox_test_mode_item_id} live_activation_flag_value is not false`);
  }
  if (!['BLOCKED', 'HOLD', 'NEEDS_APPROVAL'].includes(item.readiness_status)) {
    fail(`readiness item ${item.sandbox_test_mode_item_id} has invalid readiness_status`);
  }
  if (!item.audit_event_id) {
    fail(`readiness item ${item.sandbox_test_mode_item_id} missing audit_event_id`);
  }
  if (!item.next_step_owner) {
    fail(`readiness item ${item.sandbox_test_mode_item_id} missing next_step_owner`);
  }
}
console.log('PASS: every sandbox test-mode readiness item has required fields and safety values.');

if (!output.sandbox_test_mode_readiness_expansion_summary.all_required_channels_present) {
  fail('sandbox_test_mode_readiness_expansion_summary.all_required_channels_present must be true');
}
if (
  output.sandbox_test_mode_readiness_expansion_summary.total_readiness_items !==
  REQUIRED_INTEGRATIONS.length
) {
  fail(
    `expected ${REQUIRED_INTEGRATIONS.length} readiness items, found ${output.sandbox_test_mode_readiness_expansion_summary.total_readiness_items}`,
  );
}
console.log('PASS: sandbox test-mode readiness expansion summary verified.');

if (!output.approval_gate_summary.test_mode_activation_requires_explicit_approval) {
  fail('approval_gate_summary.test_mode_activation_requires_explicit_approval must be true');
}
if (!output.approval_gate_summary.live_activation_requires_separate_explicit_approval) {
  fail('approval_gate_summary.live_activation_requires_separate_explicit_approval must be true');
}
if (output.approval_gate_summary.test_mode_activation_allowed_for_all_items !== 'no') {
  fail('approval_gate_summary.test_mode_activation_allowed_for_all_items must be no');
}
if (output.approval_gate_summary.live_activation_allowed_for_all_items !== 'no') {
  fail('approval_gate_summary.live_activation_allowed_for_all_items must be no');
}
console.log('PASS: approval gate summary verified.');

if (!output.env_credential_boundary_summary.all_items_sandbox_credentials_present_no) {
  fail('env_credential_boundary_summary.all_items_sandbox_credentials_present_no must be true');
}
if (!output.env_credential_boundary_summary.all_items_production_credentials_present_no) {
  fail('env_credential_boundary_summary.all_items_production_credentials_present_no must be true');
}
if (!output.env_credential_boundary_summary.all_items_env_values_logged_no) {
  fail('env_credential_boundary_summary.all_items_env_values_logged_no must be true');
}
console.log('PASS: env/credential boundary summary verified.');

if (!output.lindy_bridge_test_mode_readiness_summary.safe_lindy_bridge_reference_not_live_activation) {
  fail('lindy_bridge_test_mode_readiness_summary.safe_lindy_bridge_reference_not_live_activation must be true');
}
if (
  !output.lindy_bridge_test_mode_readiness_summary
    .real_lindy_client_api_webhook_live_workflow_activation_forbidden
) {
  fail(
    'lindy_bridge_test_mode_readiness_summary.real_lindy_client_api_webhook_live_workflow_activation_forbidden must be true',
  );
}
console.log('PASS: Lindy bridge readiness summary verified.');

if (output.scheduler_dispatcher_readiness_summary.scheduler_enabled !== 'no') {
  fail('scheduler_dispatcher_readiness_summary.scheduler_enabled must be no');
}
if (output.scheduler_dispatcher_readiness_summary.dispatcher_enabled !== 'no') {
  fail('scheduler_dispatcher_readiness_summary.dispatcher_enabled must be no');
}
if (output.public_route_readiness_summary.public_route_enabled !== 'no') {
  fail('public_route_readiness_summary.public_route_enabled must be no');
}
if (!output.channel_readiness_summary.reporting_summary_includes_sandbox_test_mode_readiness) {
  fail('channel_readiness_summary.reporting_summary_includes_sandbox_test_mode_readiness must be true');
}
console.log('PASS: channel, scheduler/dispatcher, and public route summaries verified.');

for (const assertion of REQUIRED_SAFETY_ASSERTIONS) {
  if (!output.sandbox_test_mode_safety_assertions.includes(assertion)) {
    fail(`sandbox_test_mode_safety_assertions missing: ${assertion}`);
  }
}
console.log(
  `PASS: all ${REQUIRED_SAFETY_ASSERTIONS.length} required sandbox test-mode safety assertions are present.`,
);

if (
  output.sandbox_test_mode_readiness_expansion_summary.public_go_live_or_production_copy_changed !==
  false
) {
  fail('public_go_live_or_production_copy_changed must be false in expansion summary');
}
console.log('PASS: public copy unchanged guard verified.');

for (const scenario of output.scenarios) {
  if (scenario.live_actions_performed !== 'no') {
    fail(`scenario ${scenario.scenario_id} live_actions_performed is not no`);
  }
  if (!Array.isArray(scenario.sandbox_test_mode_readiness_items)) {
    fail(`scenario ${scenario.scenario_id} missing per-scenario sandbox_test_mode_readiness_items array`);
  }
}
console.log('PASS: every scenario preserves safety fields and per-scenario sandbox test-mode items.');

if (!output.e2e_acceptance_rehearsal_expansion) {
  fail('output missing e2e_acceptance_rehearsal_expansion — prior e2e expansion must remain');
}
if (!output.manual_to_native_handoff_rehearsal_expansion) {
  fail('output missing manual_to_native_handoff_rehearsal_expansion — prior handoff expansion must remain');
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
  'verify-native-workflow-fixture-sandbox-test-mode-integration-readiness-gate-expansion-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Sandbox/Test-Mode Integration Readiness Gate Expansion',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

const packetRefs = [
  'NATIVE_WORKFLOW_FIXTURE_SANDBOX_TEST_MODE_INTEGRATION_READINESS_GATE_EXPANSION.md',
  'run-native-workflow-fixture-sandbox-test-mode-integration-readiness-gate-expansion-dry-run.sh',
  'verify-native-workflow-fixture-sandbox-test-mode-integration-readiness-gate-expansion-readonly.js',
  'Native Workflow Fixture Sandbox/Test-Mode Integration Readiness Gate Expansion',
  'native workflow fixture sandbox test-mode integration readiness gate expansion',
  'sandbox test-mode integration readiness gate expansion',
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
  'wrapper sandbox test-mode verifier',
);
console.log('PASS: dry-run wrapper references runner and verifiers.');

const assertionCount = REQUIRED_SAFETY_ASSERTIONS.length + REQUIRED_INTEGRATIONS.length;

console.log(
  `PASS: Native Workflow Fixture Sandbox/Test-Mode Integration Readiness Gate Expansion verified (${assertionCount}+ assertions, ${output.sandbox_test_mode_readiness_items.length} sandbox test-mode readiness items).`,
);
console.log(
  'PASS: Native Workflow Fixture Sandbox/Test-Mode Integration Readiness Gate Expansion is fixture-only, deterministic, and dry-run safe.',
);