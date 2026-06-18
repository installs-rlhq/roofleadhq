#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_RECOMMENDED_TEST_MODE_VALUES_PROPOSAL.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const scopedApprovalCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_SCOPED_APPROVAL_CAPTURE.md';
const exactScopeDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_EXACT_TEST_MODE_SCOPE_AUTHORIZATION_DRAFT.md';
const preActivationChecklistDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_PRE_ACTIVATION_CHECKLIST.md';

const PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT = '287627f';
const EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT = 'd7506bf';
const PRE_ACTIVATION_CHECKLIST_COMMIT = '2b753e8';
const PROPOSAL_TYPE = 'recommended_test_mode_values_proposal';
const PROPOSAL_STATUS = 'proposed_only_not_approved';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const FINAL_JASON_ACTIVATION_APPROVAL = 'not_granted';
const ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED =
  'Activation command must be separately approved after Jason grants final activation approval of exact proposed values.';
const REQUIRED_NEXT_DECISION =
  'Jason must explicitly approve exact proposed values and separately approve any activation command before activation.';

const PROPOSED_CHANNEL_SCOPE = 'local fake channel adapters only';
const PROPOSED_SERVICE_SCOPE = 'no external services';
const PROPOSED_FAKE_TEST_ACCOUNT_BOUNDARIES =
  'fake/local-only account fixtures; no real homeowner, roofer, customer, production, or external account data';
const PROPOSED_ALLOWED_TEST_LEAD_DATA_SHAPE =
  'one or more seeded fake roofing homeowner leads with fake name, fake phone, fake email, fake address, fake source, fake appointment preference, fake consent/contact flags, and fake review/escalation outcomes';
const PROPOSED_START_WINDOW = 'operator-selected manual window, not scheduled, not approved';
const PROPOSED_OPERATOR = 'Jason or designated operator placeholder';
const PROPOSED_REVIEWER_ON_CALL_OWNER = 'Jason placeholder';
const PROPOSED_ROLLBACK_OWNER = 'Jason placeholder';
const PROPOSED_STOP_CONDITIONS =
  'any attempted external call, credential/env access, production data access, real send, real webhook, real scheduler/cron/dispatcher activation, unexpected Supabase access, schema/auth/RLS/security change, failed safety assertion, or unexpected channel delivery attempt';
const PROPOSED_OBSERVATION_WINDOW =
  'short manual observation window placeholder after local dry-run only';
const PROPOSED_EVIDENCE_CAPTURE =
  'terminal output, targeted verifier result, wrapper result, fast safe readiness result, backend build result, source-of-truth verification after commit only';
const PROPOSED_POST_RUN_REVIEW =
  'confirm no activation, no external calls, no production data access, no credentials, no public copy changes, no unexpected files, and clean git status';
const PROPOSED_EXCLUDED_SCOPE =
  'all live/test-mode/external/service/production actions, real homeowners, real roofers, real sends, real calendars, CRM sync, live CSV, billing/payment/deposit/invoice/quote/estimate automation';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only/read-only/dry-run-only recommended test-mode values proposal',
  'recommended test-mode values proposal dry-run only',
  'recommended_test_mode_values_proposal_only',
  'Prior Scoped Approval Capture Reference',
  '287627f',
  'Exact Scope Authorization Draft Reference',
  'd7506bf',
  'Pre-Activation Checklist Reference',
  '2b753e8',
  'Proposal Type and Status',
  'recommended_test_mode_values_proposal',
  'proposed_only_not_approved',
  'not_granted',
  'Activation Remains Blocked',
  'first_controlled_launch_activation_allowed',
  'sandbox_test_mode_activation_allowed',
  'live_activation_allowed',
  'external_call_allowed',
  'Approved channels empty',
  'Approved external services empty',
  'Proposed Values Are Not Approved',
  'Operator Questions Deferred',
  'no blocking questions are required to create this proposal',
  'questions become required only before a real external/test-mode service is selected',
  'Recommended Values Checklist Table',
  'why this is the safest default',
  'evidence needed before future approval',
  'activation allowed now',
  'Required Next Decision',
  'Activation Command Separately Approved',
  'recommended_test_mode_values_proposal_record',
  'recommended_values_checklist_table',
  'first_controlled_launch_recommended_test_mode_values_proposal_dry_run_summary',
  'first_controlled_launch_recommended_test_mode_values_proposal_items',
  'executive_recommended_values_proposal_summary',
  'prior_scoped_approval_capture_reference_summary',
  'exact_scope_authorization_draft_reference_summary',
  'pre_activation_checklist_reference_summary',
  'proposal_status_summary',
  'activation_blocked_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'proposed_values_summary',
  'proposed_values_not_approved_summary',
  'required_next_decision_summary',
  'operator_questions_deferred_summary',
  'activation_command_separate_approval_summary',
  'recommended_values_checklist_table_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_recommended_test_mode_values_proposal_safety_assertions',
  'fixture_recommended_values_proposal_id',
  'fixture_proposal_area',
  'fixture_proposal_status',
  'fixture_proposal_type',
  'fixture_blocking_reason',
  'fixture_owner_for_next_step',
  'fixture_delivery_mode',
  'dry_run_only',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_first_controlled_launch_activation_allowed',
  'fixture_audit_event_id',
  'fixture_created_at',
  'local fake channel adapters only',
  'no external services',
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
];

const REQUIRED_PROPOSAL_AREAS = [
  'Executive recommended values proposal summary',
  'Prior scoped approval capture reference',
  'Exact scope authorization draft reference',
  'Pre-activation checklist reference',
  'Proposal type and status (proposed_only_not_approved)',
  'Activation approval status (not_granted)',
  'First controlled launch activation blocked',
  'Sandbox/test-mode activation blocked',
  'Live activation blocked',
  'External call blocked',
  'Approved channels empty',
  'Approved external services empty',
  'Proposed channel scope (local fake channel adapters only)',
  'Proposed service scope (no external services)',
  'Proposed fake/test account boundaries',
  'Proposed allowed test lead data shape',
  'Proposed start window',
  'Proposed operator',
  'Proposed reviewer/on-call owner',
  'Proposed rollback owner',
  'Proposed stop conditions',
  'Proposed observation window',
  'Proposed evidence capture',
  'Proposed post-run review',
  'Proposed excluded scope',
  'Required next decision (Jason explicit approval)',
  'Proposed values are not approved boundary',
  'Activation command separately approved boundary',
  'Recommended values checklist table',
  'Operator questions deferred',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_recommended_values_proposal_id',
  'fixture_proposal_area',
  'fixture_proposal_status',
  'fixture_proposal_type',
  'fixture_blocking_reason',
  'fixture_owner_for_next_step',
  'fixture_delivery_mode',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_first_controlled_launch_activation_allowed',
  'fixture_audit_event_id',
  'fixture_created_at',
];

const REQUIRED_OUTPUT_SECTIONS = [
  'first_controlled_launch_recommended_test_mode_values_proposal_dry_run_summary',
  'recommended_test_mode_values_proposal_record',
  'recommended_values_checklist_table',
  'first_controlled_launch_recommended_test_mode_values_proposal_items',
  'executive_recommended_values_proposal_summary',
  'prior_scoped_approval_capture_reference_summary',
  'exact_scope_authorization_draft_reference_summary',
  'pre_activation_checklist_reference_summary',
  'proposal_status_summary',
  'activation_blocked_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'proposed_values_summary',
  'proposed_values_not_approved_summary',
  'required_next_decision_summary',
  'operator_questions_deferred_summary',
  'activation_command_separate_approval_summary',
  'recommended_values_checklist_table_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_recommended_test_mode_values_proposal_safety_assertions',
  'common_proposal_fields_summary',
];

const REQUIRED_PROPOSAL_RECORD_FIELDS = {
  prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
  exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
  pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
  proposal_type: PROPOSAL_TYPE,
  proposal_status: PROPOSAL_STATUS,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  proposed_channel_scope: PROPOSED_CHANNEL_SCOPE,
  proposed_service_scope: PROPOSED_SERVICE_SCOPE,
  proposed_fake_test_account_boundaries: PROPOSED_FAKE_TEST_ACCOUNT_BOUNDARIES,
  proposed_allowed_test_lead_data_shape: PROPOSED_ALLOWED_TEST_LEAD_DATA_SHAPE,
  proposed_start_window: PROPOSED_START_WINDOW,
  proposed_operator: PROPOSED_OPERATOR,
  proposed_reviewer_on_call_owner: PROPOSED_REVIEWER_ON_CALL_OWNER,
  proposed_rollback_owner: PROPOSED_ROLLBACK_OWNER,
  proposed_stop_conditions: PROPOSED_STOP_CONDITIONS,
  proposed_observation_window: PROPOSED_OBSERVATION_WINDOW,
  proposed_evidence_capture: PROPOSED_EVIDENCE_CAPTURE,
  proposed_post_run_review: PROPOSED_POST_RUN_REVIEW,
  proposed_excluded_scope: PROPOSED_EXCLUDED_SCOPE,
  required_next_decision: REQUIRED_NEXT_DECISION,
  activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
};

const REQUIRED_CHECKLIST_TABLE_ITEMS = [
  'proposed_channel_scope',
  'proposed_service_scope',
  'proposed_fake_test_account_boundaries',
  'proposed_allowed_test_lead_data_shape',
  'proposed_start_window',
  'proposed_operator',
  'proposed_reviewer_on_call_owner',
  'proposed_rollback_owner',
  'proposed_stop_conditions',
  'proposed_observation_window',
  'proposed_evidence_capture',
  'proposed_post_run_review',
  'proposed_excluded_scope',
  'required_next_decision',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_recommended_test_mode_values_proposal_doc_present',
  'fake_data_local_only_scope_present',
  'proposal_only_not_activation_approved',
  'prior_scoped_approval_capture_referenced',
  'exact_scope_authorization_draft_referenced',
  'pre_activation_checklist_referenced',
  'activation_approval_not_granted',
  'final_jason_activation_approval_not_granted',
  'approved_channels_empty',
  'approved_external_services_empty',
  'proposed_values_exist_but_not_approved',
  'local_fake_channel_adapters_only_proposed',
  'no_external_services_proposed_as_approved',
  'exact_next_jason_approval_still_required_before_activation',
  'activation_command_must_be_separately_approved',
  'no_launch_or_channel_activation_allowed',
  'proposed_values_not_approved_boundary_present',
  'operator_questions_deferred_boundary_present',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'proposal_items_have_common_fields',
  'proposal_items_remain_dry_run_only',
  'proposal_items_have_activation_flags_false',
  'first_controlled_launch_activation_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'external_call_remains_blocked',
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
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_RECOMMENDED_TEST_MODE_VALUES_PROPOSAL.md',
  'run-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal.js',
  'Native Workflow Fixture First Controlled Launch Recommended Test-Mode Values Proposal Dry Run',
  'native workflow fixture first controlled launch recommended test-mode values proposal dry run',
  'first controlled launch recommended test-mode values proposal dry run',
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
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const scopedApprovalCaptureDoc = read(scopedApprovalCaptureDocPath);
const exactScopeDraftDoc = read(exactScopeDraftDocPath);
const preActivationChecklistDoc = read(preActivationChecklistDocPath);

passAssertion('first_controlled_launch_recommended_test_mode_values_proposal_doc_present');

mustHave(doc, scopedApprovalCaptureDocPath, 'documentation');
mustHave(doc, exactScopeDraftDocPath, 'documentation');
mustHave(doc, preActivationChecklistDocPath, 'documentation');
mustHave(doc, 'first controlled launch scoped approval capture', 'documentation');
mustHave(doc, 'exact test-mode scope authorization draft', 'documentation');
mustHave(doc, 'pre-activation checklist', 'documentation');
mustHave(doc, PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT, 'documentation');
mustHave(doc, EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT, 'documentation');
mustHave(doc, PRE_ACTIVATION_CHECKLIST_COMMIT, 'documentation');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');
passAssertion('prior_scoped_approval_capture_referenced');
passAssertion('exact_scope_authorization_draft_referenced');
passAssertion('pre_activation_checklist_referenced');
passAssertion('proposal_only_not_activation_approved');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch recommended test-mode values proposal verifier', verifierPath],
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
  output.first_controlled_launch_recommended_test_mode_values_proposal_dry_run !==
  'native_workflow_fixture_first_controlled_launch_recommended_test_mode_values_proposal_dry_run'
) {
  fail('first_controlled_launch_recommended_test_mode_values_proposal_dry_run marker is incorrect');
}

if (
  output.first_controlled_launch_recommended_test_mode_values_proposal_dry_run_summary.packet_type !==
  'recommended_test_mode_values_proposal_only'
) {
  fail('packet_type must be recommended_test_mode_values_proposal_only');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log(
  'PASS: top-level first controlled launch recommended test-mode values proposal sections are present.',
);

if (!output.recommended_test_mode_values_proposal_record) {
  fail('recommended_test_mode_values_proposal_record must be present');
}
for (const [field, expected] of Object.entries(REQUIRED_PROPOSAL_RECORD_FIELDS)) {
  if (output.recommended_test_mode_values_proposal_record[field] !== expected) {
    fail(`recommended_test_mode_values_proposal_record.${field} must be ${JSON.stringify(expected)}`);
  }
}
if (
  !Array.isArray(output.recommended_test_mode_values_proposal_record.approved_channels) ||
  output.recommended_test_mode_values_proposal_record.approved_channels.length !== 0
) {
  fail('recommended_test_mode_values_proposal_record.approved_channels must be an empty array');
}
if (
  !Array.isArray(output.recommended_test_mode_values_proposal_record.approved_external_services) ||
  output.recommended_test_mode_values_proposal_record.approved_external_services.length !== 0
) {
  fail('recommended_test_mode_values_proposal_record.approved_external_services must be an empty array');
}
passAssertion('activation_approval_not_granted');
passAssertion('final_jason_activation_approval_not_granted');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');
passAssertion('proposed_values_exist_but_not_approved');
passAssertion('local_fake_channel_adapters_only_proposed');
passAssertion('no_external_services_proposed_as_approved');

if (!Array.isArray(output.recommended_values_checklist_table) || output.recommended_values_checklist_table.length !== 14) {
  fail('recommended_values_checklist_table must contain exactly 14 rows');
}
const tableItems = new Set(output.recommended_values_checklist_table.map((row) => row.checklist_item));
for (const item of REQUIRED_CHECKLIST_TABLE_ITEMS) {
  if (!tableItems.has(item)) fail(`recommended_values_checklist_table missing item: ${item}`);
}
for (const row of output.recommended_values_checklist_table) {
  if (row.activation_allowed_now !== false) {
    fail(`recommended_values_checklist_table row ${row.checklist_item} activation_allowed_now must be false`);
  }
  if (row.approval_status !== PROPOSAL_STATUS) {
    fail(`recommended_values_checklist_table row ${row.checklist_item} approval_status must be proposed_only_not_approved`);
  }
  if (!('recommended_value' in row)) {
    fail(`recommended_values_checklist_table row ${row.checklist_item} missing recommended_value`);
  }
  if (!('why_safest_default' in row)) {
    fail(`recommended_values_checklist_table row ${row.checklist_item} missing why_safest_default`);
  }
  if (!('evidence_needed_before_future_approval' in row)) {
    fail(`recommended_values_checklist_table row ${row.checklist_item} missing evidence_needed_before_future_approval`);
  }
}

if (
  output.prior_scoped_approval_capture_reference_summary.prior_scoped_approval_capture_commit !==
  PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT
) {
  fail('prior_scoped_approval_capture_commit must be 287627f');
}
if (!output.prior_scoped_approval_capture_reference_summary.prior_capture_does_not_grant_activation) {
  fail('prior_capture_does_not_grant_activation must be true');
}

if (
  output.exact_scope_authorization_draft_reference_summary.exact_scope_authorization_draft_commit !==
  EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT
) {
  fail('exact_scope_authorization_draft_commit must be d7506bf');
}
if (!output.exact_scope_authorization_draft_reference_summary.exact_scope_draft_does_not_grant_activation) {
  fail('exact_scope_draft_does_not_grant_activation must be true');
}

if (
  output.pre_activation_checklist_reference_summary.pre_activation_checklist_commit !==
  PRE_ACTIVATION_CHECKLIST_COMMIT
) {
  fail('pre_activation_checklist_commit must be 2b753e8');
}
if (!output.pre_activation_checklist_reference_summary.pre_activation_checklist_does_not_grant_activation) {
  fail('pre_activation_checklist_does_not_grant_activation must be true');
}

if (output.proposal_status_summary.proposal_type !== PROPOSAL_TYPE) {
  fail('proposal_type must be recommended_test_mode_values_proposal');
}
if (output.proposal_status_summary.proposal_status !== PROPOSAL_STATUS) {
  fail('proposal_status must be proposed_only_not_approved');
}
if (output.proposal_status_summary.activation_approval_status !== ACTIVATION_APPROVAL_STATUS) {
  fail('activation_approval_status must be not_granted');
}
if (!output.proposal_status_summary.proposal_only_not_activation_approved) {
  fail('proposal_only_not_activation_approved must be true');
}

if (!output.activation_blocked_summary.no_launch_or_channel_activation_allowed) {
  fail('no_launch_or_channel_activation_allowed must be true');
}
for (const flag of [
  'first_controlled_launch_activation_allowed',
  'sandbox_test_mode_activation_allowed',
  'live_activation_allowed',
  'external_call_allowed',
]) {
  if (output.activation_blocked_summary[flag] !== false) {
    fail(`activation_blocked_summary.${flag} must be false`);
  }
}
if (!output.activation_blocked_summary.activation_command_must_be_separately_approved) {
  fail('activation_command_must_be_separately_approved must be true');
}
passAssertion('no_launch_or_channel_activation_allowed');
passAssertion('activation_command_must_be_separately_approved');
passAssertion('exact_next_jason_approval_still_required_before_activation');

if (!output.approved_channels_empty_summary.approved_channels_must_remain_empty) {
  fail('approved_channels_must_remain_empty must be true');
}

if (!output.approved_external_services_empty_summary.approved_external_services_must_remain_empty) {
  fail('approved_external_services_must_remain_empty must be true');
}

if (!output.proposed_values_summary.all_proposed_values_populated) {
  fail('all_proposed_values_populated must be true');
}
if (!output.proposed_values_summary.local_fake_channel_adapters_only_proposed) {
  fail('local_fake_channel_adapters_only_proposed must be true');
}
if (!output.proposed_values_summary.no_external_services_proposed_as_approved) {
  fail('no_external_services_proposed_as_approved must be true');
}
if (output.proposed_values_summary.proposed_channel_scope !== PROPOSED_CHANNEL_SCOPE) {
  fail('proposed_channel_scope must be local fake channel adapters only');
}
if (output.proposed_values_summary.proposed_service_scope !== PROPOSED_SERVICE_SCOPE) {
  fail('proposed_service_scope must be no external services');
}

if (!output.proposed_values_not_approved_summary.proposed_values_are_not_approved) {
  fail('proposed_values_are_not_approved must be true');
}
if (!output.proposed_values_not_approved_summary.proposed_values_must_not_be_treated_as_approved) {
  fail('proposed_values_must_not_be_treated_as_approved must be true');
}
if (!output.proposed_values_not_approved_summary.exact_next_jason_approval_still_required_before_activation) {
  fail('exact_next_jason_approval_still_required_before_activation must be true');
}
passAssertion('proposed_values_not_approved_boundary_present');

if (!output.operator_questions_deferred_summary.no_blocking_questions_required_to_create_proposal) {
  fail('no_blocking_questions_required_to_create_proposal must be true');
}
if (!output.operator_questions_deferred_summary.operator_questions_deferred) {
  fail('operator_questions_deferred must be true');
}
passAssertion('operator_questions_deferred_boundary_present');

if (!output.required_next_decision_summary.jason_must_explicitly_approve_exact_proposed_values) {
  fail('jason_must_explicitly_approve_exact_proposed_values must be true');
}
if (!output.required_next_decision_summary.jason_must_separately_approve_activation_command) {
  fail('jason_must_separately_approve_activation_command must be true');
}

if (!output.activation_command_separate_approval_summary.activation_command_must_be_separately_approved) {
  fail('activation_command_separate_approval_summary.activation_command_must_be_separately_approved must be true');
}
if (
  output.activation_command_separate_approval_summary.activation_command_separate_approval_required !==
  ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED
) {
  fail('activation_command_separate_approval_required must match expected value');
}

if (!output.recommended_values_checklist_table_summary.all_rows_activation_allowed_now_false) {
  fail('all_rows_activation_allowed_now_false must be true');
}
if (!output.recommended_values_checklist_table_summary.all_rows_approval_status_proposed_only_not_approved) {
  fail('all_rows_approval_status_proposed_only_not_approved must be true');
}
if (!output.recommended_values_checklist_table_summary.no_proposed_value_approved_for_activation) {
  fail('no_proposed_value_approved_for_activation must be true');
}

if (
  !Array.isArray(output.first_controlled_launch_recommended_test_mode_values_proposal_items) ||
  output.first_controlled_launch_recommended_test_mode_values_proposal_items.length !== 32
) {
  fail('first_controlled_launch_recommended_test_mode_values_proposal_items must contain exactly 32 items');
}

const proposalAreas = new Set(
  output.first_controlled_launch_recommended_test_mode_values_proposal_items.map(
    (item) => item.fixture_proposal_area,
  ),
);
for (const area of REQUIRED_PROPOSAL_AREAS) {
  if (!proposalAreas.has(area)) fail(`required proposal area missing: ${area}`);
}

for (const item of output.first_controlled_launch_recommended_test_mode_values_proposal_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `proposal item ${item.fixture_recommended_values_proposal_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(
      `proposal item ${item.fixture_recommended_values_proposal_id} fixture_delivery_mode is not dry_run_only`,
    );
  }
  if (item.fixture_proposal_type !== PROPOSAL_TYPE) {
    fail(
      `proposal item ${item.fixture_recommended_values_proposal_id} fixture_proposal_type is not recommended_test_mode_values_proposal`,
    );
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
    'fixture_first_controlled_launch_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`proposal item ${item.fixture_recommended_values_proposal_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`proposal item ${item.fixture_recommended_values_proposal_id} missing fixture_audit_event_id`);
  }
}
passAssertion('proposal_items_have_common_fields');
passAssertion('proposal_items_remain_dry_run_only');
passAssertion('proposal_items_have_activation_flags_false');

if (!output.common_proposal_fields_summary.all_items_include_common_fields) {
  fail('common_proposal_fields_summary.all_items_include_common_fields must be true');
}
if (
  !output.first_controlled_launch_recommended_test_mode_values_proposal_dry_run_summary.all_items_remain_dry_run_only
) {
  fail(
    'first_controlled_launch_recommended_test_mode_values_proposal_dry_run_summary.all_items_remain_dry_run_only must be true',
  );
}

if (
  output.executive_recommended_values_proposal_summary.first_controlled_launch_activation_allowed !== false
) {
  fail('first_controlled_launch_activation_allowed must remain false');
}
if (
  output.executive_recommended_values_proposal_summary.sandbox_test_mode_activation_allowed !== false
) {
  fail('sandbox_test_mode_activation_allowed must remain false');
}
if (output.executive_recommended_values_proposal_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.executive_recommended_values_proposal_summary.external_call_allowed !== false) {
  fail('external_call_allowed must remain false');
}
passAssertion('first_controlled_launch_activation_remains_blocked');
passAssertion('sandbox_test_mode_activation_remains_blocked');
passAssertion('live_activation_remains_blocked');
passAssertion('external_call_remains_blocked');

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
passAssertion('no_credentials_env_api_webhook_production_schema_auth_rls_security_changes');

mustHave(fullReadiness, 'verify-first-paid-pilot-readiness-readonly.js', 'full safe readiness');
mustHave(fullReadiness, 'npm --prefix backend run build', 'full safe readiness');
passAssertion('full_safe_readiness_lane_preserved');

mustHave(
  aggregate,
  'verify-native-workflow-fixture-first-controlled-launch-recommended-test-mode-values-proposal-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Recommended Test-Mode Values Proposal Dry Run',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');
mustHave(verifierIndex, runnerPath, 'verifier index');

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
mustNotHave(wrapper, 'verify-safe-readiness-fast.sh', 'wrapper must not run fast readiness');
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
  `PASS: Native Workflow Fixture First Controlled Launch Recommended Test-Mode Values Proposal Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);