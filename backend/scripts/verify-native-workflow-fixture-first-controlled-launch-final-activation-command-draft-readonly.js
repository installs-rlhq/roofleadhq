#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';
const runnerPath =
  'backend/scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft.js';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-readonly.js';
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
const approvedTestModeValuesCaptureDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_APPROVED_TEST_MODE_VALUES_CAPTURE.md';

const PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT = '287627f';
const EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT = 'd7506bf';
const PRE_ACTIVATION_CHECKLIST_COMMIT = '2b753e8';
const RECOMMENDED_VALUES_PROPOSAL_COMMIT = '205a6c4';
const APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT = '75f24e5';
const COMMAND_DRAFT_TYPE = 'final_activation_command_draft';
const COMMAND_DRAFT_STATUS = 'review_only_not_approved_for_execution';
const APPROVED_VALUES_STATUS = 'approved_as_exact_planned_local_dry_run_values';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const ACTIVATION_COMMAND_APPROVAL_STATUS = 'not_granted';
const FINAL_JASON_ACTIVATION_APPROVAL = 'not_granted';
const PROPOSED_COMMAND_LABEL = 'first controlled launch local dry-run only';
const PROPOSED_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';
const PROPOSED_COMMAND_APPROVAL_STATUS = 'not_granted';
const PROPOSED_COMMAND_MODE = 'local_fake_data_review_only';
const REQUIRED_NEXT_DECISION =
  'Jason must separately approve this exact proposed command string before any execution beyond local dry-run review.';

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only/read-only/dry-run-only final activation command draft',
  'final activation command draft dry-run only',
  'final_activation_command_draft_only',
  '287627f',
  'd7506bf',
  '2b753e8',
  '205a6c4',
  '75f24e5',
  'Command Draft Type and Status',
  'final_activation_command_draft',
  'review_only_not_approved_for_execution',
  'not_granted',
  'Proposed Exact Command',
  'first controlled launch local dry-run only',
  'proposed_command_approval_status',
  'proposed_command_execution_allowed_now',
  'proposed_command_requires_separate_jason_approval',
  'local_fake_data_review_only',
  'proposed_command_external_calls_allowed',
  'proposed_command_production_data_allowed',
  'proposed_command_credentials_allowed',
  'Before This Command Can Be Run',
  'Jason explicitly approves this exact command string',
  'operator confirms canonical repo HEAD == origin/main',
  'git status is clean',
  'targeted verifier passes',
  'wrapper passes',
  'fast safe readiness passes',
  'backend build passes',
  'no credentials/env/API/webhook/production/schema/auth/RLS/security changes',
  'no public go-live/production copy changes',
  'activation remains local fake-data only',
  'stop conditions are accepted',
  'Stop Conditions',
  'any external call attempt',
  'any credential/env access attempt',
  'any production data access attempt',
  'any real SMS/email/call/calendar/CSV/CRM/webhook attempt',
  'any scheduler/cron/dispatcher activation',
  'any schema/auth/RLS/security change',
  'any failed safety assertion',
  'any unexpected Supabase production access',
  'any public route/webhook exposure',
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
  'command draft',
  'final no-go/go review packet',
  'post-run review template',
  'Not safe without separate explicit approval',
  'run command as activation',
  'call external services',
  'use credentials',
  'touch production data',
  'send real messages',
  'schedule cron/dispatcher',
  'expose public routes/webhooks',
  'final_activation_command_draft_record',
  'proposed_command_record',
  'before_command_can_run_checklist',
  'stop_conditions',
  'post_run_review_template',
  'first_controlled_launch_final_activation_command_draft_dry_run_summary',
  'first_controlled_launch_final_activation_command_draft_items',
  'executive_command_draft_summary',
  'prior_scoped_approval_capture_reference_summary',
  'exact_scope_authorization_draft_reference_summary',
  'pre_activation_checklist_reference_summary',
  'recommended_values_proposal_reference_summary',
  'approved_test_mode_values_capture_reference_summary',
  'command_draft_status_summary',
  'activation_blocked_summary',
  'activation_not_granted_boundary_summary',
  'activation_command_not_granted_boundary_summary',
  'activation_boundary_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'proposed_command_summary',
  'before_command_can_run_checklist_summary',
  'stop_conditions_summary',
  'finish_everything_we_can_summary',
  'post_run_review_template_summary',
  'required_next_decision_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_final_activation_command_draft_safety_assertions',
  'fixture_command_draft_id',
  'fixture_command_draft_area',
  'fixture_command_draft_status',
  'fixture_command_draft_type',
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
  'demo_ready_with_live_automation_disabled',
  'scripts/verify-safe-readiness.sh',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
];

const REQUIRED_COMMAND_DRAFT_AREAS = [
  'Executive final activation command draft summary',
  'Prior scoped approval capture reference',
  'Exact scope authorization draft reference',
  'Pre-activation checklist reference',
  'Recommended values proposal reference (205a6c4)',
  'Approved test-mode values capture reference (75f24e5)',
  'Command draft type and status',
  'Activation approval status (not_granted)',
  'Activation command approval status (not_granted)',
  'First controlled launch activation blocked',
  'Sandbox/test-mode activation blocked',
  'Live activation blocked',
  'External call blocked',
  'Approved channels empty',
  'Approved external services empty',
  'Proposed command documented',
  'Proposed command not approved for execution',
  'Proposed command requires separate Jason approval',
  'Proposed command local fake-data review-only',
  'Before this command can be run checklist',
  'Stop conditions',
  'Activation not granted boundary',
  'Activation command not granted boundary',
  'Activation boundary (approved_for_activation_now false)',
  'Finish everything we can',
  'Post-run review template',
  'Credential/env boundary',
  'Schema/auth/RLS/security boundary',
];

const REQUIRED_COMMON_FIELDS = [
  'fixture_command_draft_id',
  'fixture_command_draft_area',
  'fixture_command_draft_status',
  'fixture_command_draft_type',
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
  'first_controlled_launch_final_activation_command_draft_dry_run_summary',
  'final_activation_command_draft_record',
  'proposed_command_record',
  'before_command_can_run_checklist',
  'stop_conditions',
  'post_run_review_template',
  'first_controlled_launch_final_activation_command_draft_items',
  'executive_command_draft_summary',
  'prior_scoped_approval_capture_reference_summary',
  'exact_scope_authorization_draft_reference_summary',
  'pre_activation_checklist_reference_summary',
  'recommended_values_proposal_reference_summary',
  'approved_test_mode_values_capture_reference_summary',
  'command_draft_status_summary',
  'activation_blocked_summary',
  'activation_not_granted_boundary_summary',
  'activation_command_not_granted_boundary_summary',
  'activation_boundary_summary',
  'approved_channels_empty_summary',
  'approved_external_services_empty_summary',
  'proposed_command_summary',
  'before_command_can_run_checklist_summary',
  'stop_conditions_summary',
  'finish_everything_we_can_summary',
  'post_run_review_template_summary',
  'required_next_decision_summary',
  'credential_env_boundary_summary',
  'schema_auth_rls_security_boundary_summary',
  'first_controlled_launch_final_activation_command_draft_safety_assertions',
  'common_command_draft_fields_summary',
];

const REQUIRED_COMMAND_DRAFT_RECORD_FIELDS = {
  prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
  exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
  pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
  recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
  approved_test_mode_values_capture_commit: APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT,
  approved_values_status: APPROVED_VALUES_STATUS,
  command_draft_type: COMMAND_DRAFT_TYPE,
  command_draft_status: COMMAND_DRAFT_STATUS,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
  final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approved_for_activation_now: false,
  activation_command_required: true,
  proposed_command_label: PROPOSED_COMMAND_LABEL,
  proposed_command: PROPOSED_COMMAND,
  proposed_command_approval_status: PROPOSED_COMMAND_APPROVAL_STATUS,
  proposed_command_execution_allowed_now: false,
  proposed_command_requires_separate_jason_approval: true,
  proposed_command_mode: PROPOSED_COMMAND_MODE,
  proposed_command_external_calls_allowed: false,
  proposed_command_production_data_allowed: false,
  proposed_command_credentials_allowed: false,
  required_next_decision: REQUIRED_NEXT_DECISION,
};

const REQUIRED_BEFORE_RUN_ITEMS = [
  'jason_explicitly_approves_exact_command_string',
  'operator_confirms_canonical_repo_head_equals_origin_main',
  'git_status_is_clean',
  'targeted_verifier_passes',
  'wrapper_passes',
  'fast_safe_readiness_passes',
  'backend_build_passes',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'no_public_go_live_production_copy_changes',
  'activation_remains_local_fake_data_only',
  'stop_conditions_are_accepted',
];

const REQUIRED_STOP_CONDITIONS = [
  'any external call attempt',
  'any credential/env access attempt',
  'any production data access attempt',
  'any real SMS/email/call/calendar/CSV/CRM/webhook attempt',
  'any scheduler/cron/dispatcher activation',
  'any schema/auth/RLS/security change',
  'any failed safety assertion',
  'any unexpected Supabase production access',
  'any public route/webhook exposure',
];

const REQUIRED_ASSERTIONS = [
  'first_controlled_launch_final_activation_command_draft_doc_present',
  'fake_data_local_only_scope_present',
  'command_draft_only_packet',
  'approved_test_mode_values_capture_commit_75f24e5_referenced',
  'activation_approval_not_granted',
  'activation_command_approval_not_granted',
  'final_jason_activation_approval_not_granted',
  'approved_for_activation_now_false',
  'proposed_command_documented_not_approved_for_execution',
  'proposed_command_requires_separate_jason_approval',
  'proposed_command_local_fake_data_review_only',
  'no_external_services_approved',
  'approved_channels_empty',
  'approved_external_services_empty',
  'first_controlled_launch_activation_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'external_call_remains_blocked',
  'before_command_can_run_checklist_present',
  'stop_conditions_present',
  'finish_everything_we_can_boundary_present',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'command_draft_items_have_common_fields',
  'command_draft_items_remain_dry_run_only',
  'command_draft_items_have_activation_flags_false',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md',
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-readonly.js',
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft.js',
  'Native Workflow Fixture First Controlled Launch Final Activation Command Draft Dry Run',
  'native workflow fixture first controlled launch final activation command draft dry run',
  'first controlled launch final activation command draft dry run',
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
const approvedTestModeValuesCaptureDoc = read(approvedTestModeValuesCaptureDocPath);

passAssertion('first_controlled_launch_final_activation_command_draft_doc_present');

mustHave(doc, scopedApprovalCaptureDocPath, 'documentation');
mustHave(doc, exactScopeDraftDocPath, 'documentation');
mustHave(doc, preActivationChecklistDocPath, 'documentation');
mustHave(doc, recommendedValuesProposalDocPath, 'documentation');
mustHave(doc, approvedTestModeValuesCaptureDocPath, 'documentation');
mustHave(doc, 'first controlled launch scoped approval capture', 'documentation');
mustHave(doc, 'exact test-mode scope authorization draft', 'documentation');
mustHave(doc, 'pre-activation checklist', 'documentation');
mustHave(doc, 'recommended test-mode values proposal', 'documentation');
mustHave(doc, 'approved test-mode values capture', 'documentation');
mustHave(doc, PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT, 'documentation');
mustHave(doc, EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT, 'documentation');
mustHave(doc, PRE_ACTIVATION_CHECKLIST_COMMIT, 'documentation');
mustHave(doc, RECOMMENDED_VALUES_PROPOSAL_COMMIT, 'documentation');
mustHave(doc, APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT, 'documentation');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('fake_data_local_only_scope_present');
passAssertion('command_draft_only_packet');
passAssertion('approved_test_mode_values_capture_commit_75f24e5_referenced');
passAssertion('before_command_can_run_checklist_present');
passAssertion('stop_conditions_present');
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
  ['first controlled launch final activation command draft verifier', verifierPath],
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
  output.first_controlled_launch_final_activation_command_draft_dry_run !==
  'native_workflow_fixture_first_controlled_launch_final_activation_command_draft_dry_run'
) {
  fail('first_controlled_launch_final_activation_command_draft_dry_run marker is incorrect');
}

if (
  output.first_controlled_launch_final_activation_command_draft_dry_run_summary.packet_type !==
  'final_activation_command_draft_only'
) {
  fail('packet_type must be final_activation_command_draft_only');
}

for (const section of REQUIRED_OUTPUT_SECTIONS) {
  if (!output[section]) fail(`output missing ${section}`);
}
console.log(
  'PASS: top-level first controlled launch final activation command draft sections are present.',
);

if (!output.final_activation_command_draft_record) {
  fail('final_activation_command_draft_record must be present');
}
for (const [field, expected] of Object.entries(REQUIRED_COMMAND_DRAFT_RECORD_FIELDS)) {
  if (output.final_activation_command_draft_record[field] !== expected) {
    fail(`final_activation_command_draft_record.${field} must be ${JSON.stringify(expected)}`);
  }
}
if (
  !Array.isArray(output.final_activation_command_draft_record.approved_channels) ||
  output.final_activation_command_draft_record.approved_channels.length !== 0
) {
  fail('final_activation_command_draft_record.approved_channels must be an empty array');
}
if (
  !Array.isArray(output.final_activation_command_draft_record.approved_external_services) ||
  output.final_activation_command_draft_record.approved_external_services.length !== 0
) {
  fail('final_activation_command_draft_record.approved_external_services must be an empty array');
}
passAssertion('activation_approval_not_granted');
passAssertion('activation_command_approval_not_granted');
passAssertion('final_jason_activation_approval_not_granted');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');
passAssertion('approved_for_activation_now_false');
passAssertion('no_external_services_approved');

if (!output.proposed_command_record) {
  fail('proposed_command_record must be present');
}
if (output.proposed_command_record.proposed_command !== PROPOSED_COMMAND) {
  fail('proposed_command must match documented draft command');
}
if (output.proposed_command_record.proposed_command_approval_status !== PROPOSED_COMMAND_APPROVAL_STATUS) {
  fail('proposed_command_approval_status must be not_granted');
}
if (output.proposed_command_record.proposed_command_execution_allowed_now !== false) {
  fail('proposed_command_execution_allowed_now must be false');
}
if (output.proposed_command_record.proposed_command_requires_separate_jason_approval !== true) {
  fail('proposed_command_requires_separate_jason_approval must be true');
}
if (output.proposed_command_record.proposed_command_mode !== PROPOSED_COMMAND_MODE) {
  fail('proposed_command_mode must be local_fake_data_review_only');
}
if (!output.proposed_command_record.proposed_command_documented_not_approved_for_execution) {
  fail('proposed_command_documented_not_approved_for_execution must be true');
}
passAssertion('proposed_command_documented_not_approved_for_execution');
passAssertion('proposed_command_requires_separate_jason_approval');
passAssertion('proposed_command_local_fake_data_review_only');

if (!Array.isArray(output.before_command_can_run_checklist) || output.before_command_can_run_checklist.length !== 11) {
  fail('before_command_can_run_checklist must contain exactly 11 items');
}
const beforeRunItems = new Set(
  output.before_command_can_run_checklist.map((item) => item.checklist_item),
);
for (const item of REQUIRED_BEFORE_RUN_ITEMS) {
  if (!beforeRunItems.has(item)) fail(`before_command_can_run_checklist missing item: ${item}`);
}
for (const item of output.before_command_can_run_checklist) {
  if (item.activation_allowed_now !== false) {
    fail(`before_command_can_run_checklist item ${item.checklist_item} activation_allowed_now must be false`);
  }
}

if (!Array.isArray(output.stop_conditions) || output.stop_conditions.length !== 9) {
  fail('stop_conditions must contain exactly 9 items');
}
for (const condition of REQUIRED_STOP_CONDITIONS) {
  if (!output.stop_conditions.includes(condition)) {
    fail(`stop_conditions missing: ${condition}`);
  }
}

if (
  output.approved_test_mode_values_capture_reference_summary.approved_test_mode_values_capture_commit !==
  APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT
) {
  fail('approved_test_mode_values_capture_commit must be 75f24e5');
}
if (!output.approved_test_mode_values_capture_reference_summary.builds_on_approved_test_mode_values_capture) {
  fail('builds_on_approved_test_mode_values_capture must be true');
}

if (!output.command_draft_status_summary.command_draft_only) {
  fail('command_draft_only must be true');
}
if (!output.command_draft_status_summary.command_draft_does_not_approve_command_for_execution) {
  fail('command_draft_does_not_approve_command_for_execution must be true');
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
if (!output.activation_blocked_summary.proposed_command_must_be_separately_approved) {
  fail('proposed_command_must_be_separately_approved must be true');
}

if (!output.activation_not_granted_boundary_summary.activation_not_granted) {
  fail('activation_not_granted must be true');
}

if (!output.activation_command_not_granted_boundary_summary.activation_command_not_granted) {
  fail('activation_command_not_granted must be true');
}
if (!output.activation_command_not_granted_boundary_summary.proposed_command_not_approved_for_execution) {
  fail('proposed_command_not_approved_for_execution must be true');
}

if (output.activation_boundary_summary.approved_for_activation_now !== false) {
  fail('approved_for_activation_now must be false');
}
if (output.activation_boundary_summary.activation_command_required !== true) {
  fail('activation_command_required must be true');
}

if (!output.proposed_command_summary.proposed_command_local_fake_data_review_only) {
  fail('proposed_command_local_fake_data_review_only must be true');
}

if (!output.before_command_can_run_checklist_summary.jason_explicit_approval_required) {
  fail('jason_explicit_approval_required must be true');
}

if (!output.stop_conditions_summary.stop_conditions_must_be_accepted_before_run) {
  fail('stop_conditions_must_be_accepted_before_run must be true');
}

if (!output.finish_everything_we_can_summary.finish_everything_we_can_boundary_documented) {
  fail('finish_everything_we_can_boundary_documented must be true');
}
if (!output.finish_everything_we_can_summary.finish_guidance_does_not_grant_activation) {
  fail('finish_guidance_does_not_grant_activation must be true');
}

if (!output.required_next_decision_summary.jason_must_separately_approve_exact_command_string) {
  fail('jason_must_separately_approve_exact_command_string must be true');
}

if (
  !Array.isArray(output.first_controlled_launch_final_activation_command_draft_items) ||
  output.first_controlled_launch_final_activation_command_draft_items.length !== 28
) {
  fail('first_controlled_launch_final_activation_command_draft_items must contain exactly 28 items');
}

const commandDraftAreas = new Set(
  output.first_controlled_launch_final_activation_command_draft_items.map(
    (item) => item.fixture_command_draft_area,
  ),
);
for (const area of REQUIRED_COMMAND_DRAFT_AREAS) {
  if (!commandDraftAreas.has(area)) fail(`required command draft area missing: ${area}`);
}

for (const item of output.first_controlled_launch_final_activation_command_draft_items) {
  for (const field of REQUIRED_COMMON_FIELDS) {
    if (!(field in item)) {
      fail(
        `command draft item ${item.fixture_command_draft_id || 'unknown'} missing common field: ${field}`,
      );
    }
  }
  if (item.fixture_delivery_mode !== 'dry_run_only') {
    fail(
      `command draft item ${item.fixture_command_draft_id} fixture_delivery_mode is not dry_run_only`,
    );
  }
  if (item.fixture_command_draft_type !== COMMAND_DRAFT_TYPE) {
    fail(
      `command draft item ${item.fixture_command_draft_id} fixture_command_draft_type is not final_activation_command_draft`,
    );
  }
  for (const flag of [
    'fixture_external_call_allowed',
    'fixture_live_activation_allowed',
    'fixture_test_mode_activation_allowed',
    'fixture_first_controlled_launch_activation_allowed',
  ]) {
    if (item[flag] !== false) {
      fail(`command draft item ${item.fixture_command_draft_id} ${flag} is not false`);
    }
  }
  if (!item.fixture_audit_event_id) {
    fail(`command draft item ${item.fixture_command_draft_id} missing fixture_audit_event_id`);
  }
}
passAssertion('command_draft_items_have_common_fields');
passAssertion('command_draft_items_remain_dry_run_only');
passAssertion('command_draft_items_have_activation_flags_false');

if (!output.common_command_draft_fields_summary.all_items_include_common_fields) {
  fail('common_command_draft_fields_summary.all_items_include_common_fields must be true');
}
if (
  !output.first_controlled_launch_final_activation_command_draft_dry_run_summary.all_items_remain_dry_run_only
) {
  fail(
    'first_controlled_launch_final_activation_command_draft_dry_run_summary.all_items_remain_dry_run_only must be true',
  );
}

if (output.executive_command_draft_summary.first_controlled_launch_activation_allowed !== false) {
  fail('first_controlled_launch_activation_allowed must remain false');
}
if (output.executive_command_draft_summary.sandbox_test_mode_activation_allowed !== false) {
  fail('sandbox_test_mode_activation_allowed must remain false');
}
if (output.executive_command_draft_summary.live_activation_allowed !== false) {
  fail('live_activation_allowed must remain false');
}
if (output.executive_command_draft_summary.external_call_allowed !== false) {
  fail('external_call_allowed must remain false');
}
if (output.executive_command_draft_summary.approved_for_activation_now !== false) {
  fail('approved_for_activation_now must remain false');
}
if (output.executive_command_draft_summary.proposed_command_execution_allowed_now !== false) {
  fail('proposed_command_execution_allowed_now must remain false');
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
  'verify-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Final Activation Command Draft Dry Run',
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
mustNotHave(wrapper, 'verify-safe-readiness-fast.sh', 'wrapper must not run fast readiness');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, 'npm --prefix backend run build', 'wrapper must not run backend build');
mustNotHave(wrapper, runnerPath, 'wrapper must not execute runner as activation path');

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}
passAssertion('dry_run_wrapper_present_and_safe');
passAssertion('public_go_live_or_production_copy_not_changed_without_approval');

for (const assertion of REQUIRED_ASSERTIONS) {
  passAssertion(assertion);
}

console.log(
  `PASS: Native Workflow Fixture First Controlled Launch Final Activation Command Draft Dry Run verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);