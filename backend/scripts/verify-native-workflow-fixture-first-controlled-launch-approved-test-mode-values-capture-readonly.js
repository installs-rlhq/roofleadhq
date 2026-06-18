#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVED_TEST_MODE_VALUES_CAPTURE.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-approved-test-mode-values-capture.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-approved-test-mode-values-capture-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-approved-test-mode-values-capture-readonly.js';
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
const recommendedValuesProposalDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_RECOMMENDED_TEST_MODE_VALUES_PROPOSAL.md';

const PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT = '287627f';
const EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT = 'd7506bf';
const PRE_ACTIVATION_CHECKLIST_COMMIT = '2b753e8';
const RECOMMENDED_VALUES_PROPOSAL_COMMIT = '205a6c4';
const CAPTURE_TYPE = 'approved_test_mode_values_capture';
const APPROVED_VALUES_STATUS = 'approved_as_exact_planned_local_dry_run_values';
const APPROVAL_INTERPRETATION = 'approved_recommended_values_for_local_dry_run_planning_only';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const ACTIVATION_COMMAND_APPROVAL_STATUS = 'not_granted';
const FINAL_JASON_ACTIVATION_APPROVAL = 'not_granted';
const JASON_APPROVAL_STATEMENT = "Approve. Let's finish everything we can. Let's go!";
const ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED =
  'Activation command must be separately approved after Jason grants final activation approval.';
const REQUIRED_NEXT_DECISION =
  'Jason must separately approve the final activation/runner command before any execution beyond local dry-run review.';

const APPROVED_PLANNED_CHANNEL_SCOPE = 'local fake channel adapters only';
const APPROVED_PLANNED_SERVICE_SCOPE = 'no external services';
const APPROVED_PLANNED_FAKE_TEST_ACCOUNT_BOUNDARIES =
  'fake/local-only account fixtures; no real homeowner, roofer, customer, production, or external account data';
const APPROVED_PLANNED_ALLOWED_TEST_LEAD_DATA_SHAPE =
  'seeded fake roofing homeowner leads with fake name, fake phone, fake email, fake address, fake source, fake appointment preference, fake consent/contact flags, and fake review/escalation outcomes';
const APPROVED_PLANNED_START_WINDOW =
  'operator-selected manual window, not scheduled, not activation-approved';
const APPROVED_PLANNED_OPERATOR = 'Jason or designated operator placeholder';
const APPROVED_PLANNED_REVIEWER_ON_CALL_OWNER = 'Jason placeholder';
const APPROVED_PLANNED_ROLLBACK_OWNER = 'Jason placeholder';
const APPROVED_PLANNED_STOP_CONDITIONS =
  'any attempted external call, credential/env access, production data access, real send, real webhook, real scheduler/cron/dispatcher activation, unexpected Supabase access, schema/auth/RLS/security change, failed safety assertion, or unexpected channel delivery attempt';
const APPROVED_PLANNED_OBSERVATION_WINDOW =
  'short manual observation window after local dry-run only';
const APPROVED_PLANNED_EVIDENCE_CAPTURE =
  'terminal output, targeted verifier result, wrapper result, fast safe readiness result, backend build result, source-of-truth verification after commit only';
const APPROVED_PLANNED_POST_RUN_REVIEW =
  'confirm no activation, no external calls, no production data access, no credentials, no public copy changes, no unexpected files, and clean git status';
const APPROVED_PLANNED_EXCLUDED_SCOPE =
  'all live/test-mode/external/service/production actions, real homeowners, real roofers, real sends, real calendars, CRM sync, live CSV, billing/payment/deposit/invoice/quote/estimate automation';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only/read-only/dry-run-only approved test-mode values capture',
  'approved test-mode values capture dry-run only',
  'approved_test_mode_values_capture_only',
  'Jason Approval Statement Captured',
  "Approve. Let's finish everything we can. Let's go!",
  'Approval Interpretation',
  'approved_recommended_values_for_local_dry_run_planning_only',
  '287627f',
  'd7506bf',
  '2b753e8',
  '205a6c4',
  'Capture Type and Status',
  'approved_test_mode_values_capture',
  'approved_as_exact_planned_local_dry_run_values',
  'not_granted',
  'Activation Remains Blocked',
  'first_controlled_launch_activation_allowed',
  'sandbox_test_mode_activation_allowed',
  'live_activation_allowed',
  'external_call_allowed',
  'Activation Boundary',
  'approved_for_activation_now',
  'activation_command_required',
  'activation_command_approval_status',
  'Finish Everything We Can',
  'Safe to finish now',
  'Not safe without separate approval',
  'Approved Planned Values Table',
  'approved planned item',
  'approved planned value',
  'what remains blocked',
  'evidence required',
  'activation allowed now',
  'Required Next Decision',
  'Activation Command Separately Approved',
  'approved_test_mode_values_capture_record',
  'approved_planned_values_table',
  'first_controlled_launch_approved_test_mode_values_capture_dry_run_summary',
  'first_controlled_launch_approved_test_mode_values_capture_items',
  'executive_approved_values_capture_summary',
  'jason_approval_statement_captured_summary',
  'approval_interpretation_summary',
  'prior_scoped_approval_capture_reference_summary',
  'exact_scope_authorization_draft_reference_summary',
  'pre_activation_checklist_reference_summary',
  'recommended_values_proposal_reference_summary',
  'approved_values_status_summary',
  'activation_blocked_summary',
  'activation_not_granted_boundary_summary',
  'activation_command_not_granted_boundary_summary',
  'activation_boundary_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'approved_planned_values_summary',
  'finish_everything_we_can_summary',
  'required_next_decision_summary',
  'activation_command_separate_approval_summary',
  'approved_planned_values_table_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_approved_test_mode_values_capture_safety_assertions',
  'fixture_approved_values_capture_id',
  'fixture_capture_area',
  'fixture_capture_status',
  'fixture_capture_type',
  'fixture_approval_interpretation',
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

const REQUIRED_CAPTURE_AREAS = [
  'Executive approved values capture summary',
  'Jason approval statement captured',
  'Approval interpretation (local dry-run planning only)',
  'Prior scoped approval capture reference',
  'Exact scope authorization draft reference',
  'Pre-activation checklist reference',
  'Recommended values proposal reference (205a6c4)',
  'Approved values status',
  'Activation approval status (not_granted)',
  'Activation command approval status (not_granted)',
  'First controlled launch activation blocked',
  'Sandbox/test-mode activation blocked',
  'Live activation blocked',
  'External call blocked',
  'Approved channels empty',
  'Approved external services empty',
  'Approved planned channel scope (local fake channel adapters only)',
  'Approved planned service scope (no external services)',
  'Approved planned fake/test account boundaries',
  'Approved planned allowed test lead data shape',
  'Approved planned start window',
  'Approved planned operator',
  'Approved planned reviewer/on-call owner',
  'Approved planned rollback owner',
  'Approved planned stop conditions',
  'Approved planned observation window',
  'Approved planned evidence capture',
  'Approved planned post-run review',
  'Approved planned excluded scope',
  'Required next decision (activation command)',
  'Activation not granted boundary',
  'Activation command not granted boundary',
  'Activation boundary (approved_for_activation_now false)',
  'Finish everything we can',
  'Approved planned values table',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_approved_values_capture_id',
  'fixture_capture_area',
  'fixture_capture_status',
  'fixture_capture_type',
  'fixture_approval_interpretation',
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
  'first_controlled_launch_approved_test_mode_values_capture_dry_run_summary',
  'approved_test_mode_values_capture_record',
  'approved_planned_values_table',
  'first_controlled_launch_approved_test_mode_values_capture_items',
  'executive_approved_values_capture_summary',
  'jason_approval_statement_captured_summary',
  'approval_interpretation_summary',
  'prior_scoped_approval_capture_reference_summary',
  'exact_scope_authorization_draft_reference_summary',
  'pre_activation_checklist_reference_summary',
  'recommended_values_proposal_reference_summary',
  'approved_values_status_summary',
  'activation_blocked_summary',
  'activation_not_granted_boundary_summary',
  'activation_command_not_granted_boundary_summary',
  'activation_boundary_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'approved_planned_values_summary',
  'finish_everything_we_can_summary',
  'required_next_decision_summary',
  'activation_command_separate_approval_summary',
  'approved_planned_values_table_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_approved_test_mode_values_capture_safety_assertions',
  'common_capture_fields_summary',
];

const REQUIRED_CAPTURE_RECORD_FIELDS = {
  prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
  exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
  pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
  recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
  jason_approval_statement: JASON_APPROVAL_STATEMENT,
  approval_interpretation: APPROVAL_INTERPRETATION,
  approved_values_status: APPROVED_VALUES_STATUS,
  capture_type: CAPTURE_TYPE,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
  final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approved_planned_channel_scope: APPROVED_PLANNED_CHANNEL_SCOPE,
  approved_planned_service_scope: APPROVED_PLANNED_SERVICE_SCOPE,
  approved_planned_fake_test_account_boundaries: APPROVED_PLANNED_FAKE_TEST_ACCOUNT_BOUNDARIES,
  approved_planned_allowed_test_lead_data_shape: APPROVED_PLANNED_ALLOWED_TEST_LEAD_DATA_SHAPE,
  approved_planned_start_window: APPROVED_PLANNED_START_WINDOW,
  approved_planned_operator: APPROVED_PLANNED_OPERATOR,
  approved_planned_reviewer_on_call_owner: APPROVED_PLANNED_REVIEWER_ON_CALL_OWNER,
  approved_planned_rollback_owner: APPROVED_PLANNED_ROLLBACK_OWNER,
  approved_planned_stop_conditions: APPROVED_PLANNED_STOP_CONDITIONS,
  approved_planned_observation_window: APPROVED_PLANNED_OBSERVATION_WINDOW,
  approved_planned_evidence_capture: APPROVED_PLANNED_EVIDENCE_CAPTURE,
  approved_planned_post_run_review: APPROVED_PLANNED_POST_RUN_REVIEW,
  approved_planned_excluded_scope: APPROVED_PLANNED_EXCLUDED_SCOPE,
  approved_for_activation_now: false,
  activation_command_required: true,
  required_next_decision: REQUIRED_NEXT_DECISION,
  activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
};

const REQUIRED_TABLE_ITEMS = [
  'approved_planned_channel_scope',
  'approved_planned_service_scope',
  'approved_planned_fake_test_account_boundaries',
  'approved_planned_allowed_test_lead_data_shape',
  'approved_planned_start_window',
  'approved_planned_operator',
  'approved_planned_reviewer_on_call_owner',
  'approved_planned_rollback_owner',
  'approved_planned_stop_conditions',
  'approved_planned_observation_window',
  'approved_planned_evidence_capture',
  'approved_planned_post_run_review',
  'approved_planned_excluded_scope',
  'required_next_decision',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_approved_test_mode_values_capture_doc_present',
  'fake_data_local_only_scope_present',
  'jason_approval_statement_captured',
  'recommended_values_proposal_commit_205a6c4_referenced',
  'values_approved_only_as_exact_planned_local_dry_run_values',
  'activation_approval_not_granted',
  'activation_command_approval_not_granted',
  'final_jason_activation_approval_not_granted',
  'local_fake_channel_adapters_only_approved_as_planned_scope',
  'no_external_services_approved',
  'approved_for_activation_now_false',
  'activation_command_must_be_separately_approved',
  'prior_scoped_approval_capture_referenced',
  'exact_scope_authorization_draft_referenced',
  'pre_activation_checklist_referenced',
  'approved_channels_empty',
  'approved_external_services_empty',
  'no_launch_or_channel_activation_allowed',
  'activation_not_granted_boundary_present',
  'activation_command_not_granted_boundary_present',
  'finish_everything_we_can_boundary_present',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'capture_items_have_common_fields',
  'capture_items_remain_dry_run_only',
  'capture_items_have_activation_flags_false',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVED_TEST_MODE_VALUES_CAPTURE.md',
  'run-native-workflow-fixture-first-controlled-launch-approved-test-mode-values-capture-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-approved-test-mode-values-capture-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-approved-test-mode-values-capture.js',
  'Native Workflow Fixture First Controlled Launch Approved Test-Mode Values Capture Dry Run',
  'native workflow fixture first controlled launch approved test-mode values capture dry run',
  'first controlled launch approved test-mode values capture dry run',
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
const recommendedValuesProposalDoc = read(recommendedValuesProposalDocPath);

passAssertion('first_controlled_launch_approved_test_mode_values_capture_doc_present');

mustHave(doc, scopedApprovalCaptureDocPath, 'documentation');
mustHave(doc, exactScopeDraftDocPath, 'documentation');
mustHave(doc, preActivationChecklistDocPath, 'documentation');
mustHave(doc, recommendedValuesProposalDocPath, 'documentation');
mustHave(doc, 'first controlled launch scoped approval capture', 'documentation');
mustHave(doc, 'exact test-mode scope authorization draft', 'documentation');
mustHave(doc, 'pre-activation checklist', 'documentation');
mustHave(doc, 'recommended test-mode values proposal', 'documentation');
mustHave(doc, PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT, 'documentation');
mustHave(doc, EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT, 'documentation');
mustHave(doc, PRE_ACTIVATION_CHECKLIST_COMMIT, 'documentation');
mustHave(doc, RECOMMENDED_VALUES_PROPOSAL_COMMIT, 'documentation');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');
passAssertion('jason_approval_statement_captured');
passAssertion('recommended_values_proposal_commit_205a6c4_referenced');
passAssertion('values_approved_only_as_exact_planned_local_dry_run_values');
passAssertion('prior_scoped_approval_capture_referenced');
passAssertion('exact_scope_authorization_draft_referenced');
passAssertion('pre_activation_checklist_referenced');
passAssertion('finish_everything_we_can_boundary_present');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(runnerSource)) fail(`unsafe pattern ${pattern} found in runner`);
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

for (const [label, scriptPath] of [
  ['runner', runnerPath],
  ['first controlled launch approved test-mode values capture verifier', verifierPath],
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
  output.first_controlled_launch_approved_test_mode_values_capture_dry_run !==
  'native_workflow_fixture_first_controlled_launch_approved_test_mode_values_capture_dry_run'
) {
  fail('first_controlled_launch_approved_test_mode_values_capture_dry_run marker is incorrect');
}

if (
  output.first_controlled_launch_approved_test_mode_values_capture_dry_run_summary.packet_type !==
  'approved_test_mode_values_capture_only'
) {
  fail('packet_type must be approved_test_mode_values_capture_only');
}

if (
  output.first_controlled_launch_approved_test_mode_values_capture_dry_run_summary.jason_approval_statement !==
  JASON_APPROVAL_STATEMENT
) {
  fail('jason_approval_statement must match captured statement');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log(
  'PASS: top-level first controlled launch approved test-mode values capture sections are present.',
);

if (!output.approved_test_mode_values_capture_record) {
  fail('approved_test_mode_values_capture_record must be present');
}
for (const [field, expected] of Object.entries(REQUIRED_CAPTURE_RECORD_FIELDS)) {
  if (output.approved_test_mode_values_capture_record[field] !== expected) {
    fail(`approved_test_mode_values_capture_record.${field} must be ${JSON.stringify(expected)}`);
  }
}
if (
  !Array.isArray(output.approved_test_mode_values_capture_record.approved_channels) ||
  output.approved_test_mode_values_capture_record.approved_channels.length !== 0
) {
  fail('approved_test_mode_values_capture_record.approved_channels must be an empty array');
}
if (
  !Array.isArray(output.approved_test_mode_values_capture_record.approved_external_services) ||
  output.approved_test_mode_values_capture_record.approved_external_services.length !== 0
) {
  fail('approved_test_mode_values_capture_record.approved_external_services must be an empty array');
}
passAssertion('activation_approval_not_granted');
passAssertion('activation_command_approval_not_granted');
passAssertion('final_jason_activation_approval_not_granted');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');
passAssertion('local_fake_channel_adapters_only_approved_as_planned_scope');
passAssertion('no_external_services_approved');
passAssertion('approved_for_activation_now_false');

if (!Array.isArray(output.approved_planned_values_table) || output.approved_planned_values_table.length !== 14) {
  fail('approved_planned_values_table must contain exactly 14 rows');
}
const tableItems = new Set(output.approved_planned_values_table.map((row) => row.approved_planned_item));
for (const item of REQUIRED_TABLE_ITEMS) {
  if (!tableItems.has(item)) fail(`approved_planned_values_table missing item: ${item}`);
}
for (const row of output.approved_planned_values_table) {
  if (row.activation_allowed_now !== false) {
    fail(`approved_planned_values_table row ${row.approved_planned_item} activation_allowed_now must be false`);
  }
  if (!('approved_planned_value' in row)) {
    fail(`approved_planned_values_table row ${row.approved_planned_item} missing approved_planned_value`);
  }
  if (!('what_remains_blocked' in row)) {
    fail(`approved_planned_values_table row ${row.approved_planned_item} missing what_remains_blocked`);
  }
  if (!('evidence_required' in row)) {
    fail(`approved_planned_values_table row ${row.approved_planned_item} missing evidence_required`);
  }
}

if (
  output.jason_approval_statement_captured_summary.jason_approval_statement !== JASON_APPROVAL_STATEMENT
) {
  fail('jason_approval_statement_captured_summary must capture Jason approval statement');
}
if (!output.jason_approval_statement_captured_summary.statement_captured) {
  fail('statement_captured must be true');
}
if (!output.jason_approval_statement_captured_summary.interpretation_does_not_grant_activation) {
  fail('interpretation_does_not_grant_activation must be true');
}
if (!output.jason_approval_statement_captured_summary.interpretation_does_not_grant_activation_command) {
  fail('interpretation_does_not_grant_activation_command must be true');
}

if (
  output.recommended_values_proposal_reference_summary.recommended_values_proposal_commit !==
  RECOMMENDED_VALUES_PROPOSAL_COMMIT
) {
  fail('recommended_values_proposal_commit must be 205a6c4');
}
if (!output.recommended_values_proposal_reference_summary.builds_on_recommended_values_proposal) {
  fail('builds_on_recommended_values_proposal must be true');
}

if (output.approved_values_status_summary.approved_values_status !== APPROVED_VALUES_STATUS) {
  fail('approved_values_status must be approved_as_exact_planned_local_dry_run_values');
}
if (!output.approved_values_status_summary.values_approved_only_as_exact_planned_local_dry_run_values) {
  fail('values_approved_only_as_exact_planned_local_dry_run_values must be true');
}

if (
  output.prior_scoped_approval_capture_reference_summary.prior_scoped_approval_capture_commit !==
  PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT
) {
  fail('prior_scoped_approval_capture_commit must be 287627f');
}

if (
  output.exact_scope_authorization_draft_reference_summary.exact_scope_authorization_draft_commit !==
  EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT
) {
  fail('exact_scope_authorization_draft_commit must be d7506bf');
}

if (
  output.pre_activation_checklist_reference_summary.pre_activation_checklist_commit !==
  PRE_ACTIVATION_CHECKLIST_COMMIT
) {
  fail('pre_activation_checklist_commit must be 2b753e8');
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

if (!output.activation_not_granted_boundary_summary.activation_not_granted) {
  fail('activation_not_granted must be true');
}
passAssertion('activation_not_granted_boundary_present');

if (!output.activation_command_not_granted_boundary_summary.activation_command_not_granted) {
  fail('activation_command_not_granted must be true');
}
passAssertion('activation_command_not_granted_boundary_present');

if (output.activation_boundary_summary.approved_for_activation_now !== false) {
  fail('approved_for_activation_now must be false');
}
if (output.activation_boundary_summary.activation_command_required !== true) {
  fail('activation_command_required must be true');
}

if (!output.approved_channels_empty_summary.local_fake_channel_adapters_only_approved_as_planned_scope) {
  fail('local_fake_channel_adapters_only_approved_as_planned_scope must be true');
}

if (!output.approved_external_services_empty_summary.no_external_services_approved) {
  fail('no_external_services_approved must be true');
}

if (!output.approved_planned_values_summary.all_approved_planned_values_populated) {
  fail('all_approved_planned_values_populated must be true');
}
if (output.approved_planned_values_summary.approved_planned_channel_scope !== APPROVED_PLANNED_CHANNEL_SCOPE) {
  fail('approved_planned_channel_scope must be local fake channel adapters only');
}
if (output.approved_planned_values_summary.approved_planned_service_scope !== APPROVED_PLANNED_SERVICE_SCOPE) {
  fail('approved_planned_service_scope must be no external services');
}

if (!output.finish_everything_we_can_summary.finish_everything_we_can_boundary_documented) {
  fail('finish_everything_we_can_boundary_documented must be true');
}
if (!output.finish_everything_we_can_summary.finish_guidance_does_not_grant_activation) {
  fail('finish_guidance_does_not_grant_activation must be true');
}

if (!output.required_next_decision_summary.jason_must_separately_approve_activation_command) {
  fail('jason_must_separately_approve_activation_command must be true');
}

if (!output.activation_command_separate_approval_summary.activation_command_must_be_separately_approved) {
  fail('activation_command_separate_approval_summary.activation_command_must_be_separately_approved must be true');
}

if (!output.approved_planned_values_table_summary.all_rows_activation_allowed_now_false) {
  fail('all_rows_activation_allowed_now_false must be true');
}
if (!output.approved_planned_values_table_summary.no_planned_value_approved_for_activation) {
  fail('no_planned_value_approved_for_activation must be true');
}

if (
  !Array.isArray(output.first_controlled_launch_approved_test_mode_values_capture_items) ||
  output.first_controlled_launch_approved_test_mode_values_capture_items.length !== 37
) {
  fail('first_controlled_launch_approved_test_mode_values_capture_items must contain exactly 37 items');
}

const captureAreas = new Set(
  output.first_controlled_launch_approved_test_mode_values_capture_items.map(
    (item) => item.fixture_capture_area,
  ),
);
for (const area of REQUIRED_CAPTURE_AREAS) {
  if (!captureAreas.has(area)) fail(`required capture area missing: ${area}`);
}

for (const item of output.first_controlled_launch_approved_test_mode_values_capture_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `capture item ${item.fixture_approved_values_capture_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(
      `capture item ${item.fixture_approved_values_capture_id} fixture_delivery_mode is not dry_run_only`,
    );
  }
  if (item.fixture_capture_type !== CAPTURE_TYPE) {
    fail(
      `capture item ${item.fixture_approved_values_capture_id} fixture_capture_type is not approved_test_mode_values_capture`,
    );
  }
  if (item.fixture_approval_interpretation !== APPROVAL_INTERPRETATION) {
    fail(
      `capture item ${item.fixture_approved_values_capture_id} fixture_approval_interpretation is incorrect`,
    );
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
    'fixture_first_controlled_launch_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`capture item ${item.fixture_approved_values_capture_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`capture item ${item.fixture_approved_values_capture_id} missing fixture_audit_event_id`);
  }
}
passAssertion('capture_items_have_common_fields');
passAssertion('capture_items_remain_dry_run_only');
passAssertion('capture_items_have_activation_flags_false');

if (!output.common_capture_fields_summary.all_items_include_common_fields) {
  fail('common_capture_fields_summary.all_items_include_common_fields must be true');
}
if (
  !output.first_controlled_launch_approved_test_mode_values_capture_dry_run_summary.all_items_remain_dry_run_only
) {
  fail(
    'first_controlled_launch_approved_test_mode_values_capture_dry_run_summary.all_items_remain_dry_run_only must be true',
  );
}

if (output.executive_approved_values_capture_summary.first_controlled_launch_activation_allowed !== false) {
  fail('first_controlled_launch_activation_allowed must remain false');
}
if (output.executive_approved_values_capture_summary.sandbox_test_mode_activation_allowed !== false) {
  fail('sandbox_test_mode_activation_allowed must remain false');
}
if (output.executive_approved_values_capture_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.executive_approved_values_capture_summary.external_call_allowed !== false) {
  fail('external_call_allowed must remain false');
}
if (output.executive_approved_values_capture_summary.approved_for_activation_now !== false) {
  fail('approved_for_activation_now must remain false');
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
  'verify-native-workflow-fixture-first-controlled-launch-approved-test-mode-values-capture-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Approved Test-Mode Values Capture Dry Run',
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
  `PASS: Native Workflow Fixture First Controlled Launch Approved Test-Mode Values Capture Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);