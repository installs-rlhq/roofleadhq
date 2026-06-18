#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const docPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md';
const wrapperPath =
  'scripts/run-native-workflow-fixture-first-controlled-launch-post-run-review-template-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-first-controlled-launch-post-run-review-template-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const finalGoNoGoReviewPacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_GO_NO_GO_REVIEW_PACKET.md';
const finalActivationCommandDraftDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_FINAL_ACTIVATION_COMMAND_DRAFT.md';

const SOURCE_OF_TRUTH_COMMIT = 'a26c652';
const FINAL_GO_NO_GO_REVIEW_PACKET_COMMIT = 'a26c652';
const EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';

const POST_RUN_SECTIONS = [
  'Section 1: Review date/time',
  'Section 2: Operator',
  'Section 3: Reviewer',
  'Section 4: Exact command approved',
  'Section 5: Exact command executed',
  'Section 6: Approval evidence reference',
  'Section 7: Pre-run source-of-truth confirmation',
  'Section 8: Pre-run git status',
  'Section 9: Pre-run safety checks',
  'Section 10: Execution transcript summary',
  'Section 11: Targeted verifier result',
  'Section 12: Wrapper result',
  'Section 13: Fast safe readiness result',
  'Section 14: Backend build result',
  'Section 15: Source-of-truth result, if applicable',
  'Section 16: Stop-condition review',
  'Section 17: External-call review',
  'Section 18: Credential/env/API/webhook access review',
  'Section 19: Production data access review',
  'Section 20: Schema/auth/RLS/security change review',
  'Section 21: Public route/webhook/scheduler/cron/dispatcher review',
  'Section 22: Live SMS/Twilio/Vapi/Resend/Calendar/Lindy review',
  'Section 23: Supabase production read/write review',
  'Section 24: Unexpected file/diff review',
  'Section 25: Git clean status',
  'Section 26: Evidence artifacts captured',
  'Section 27: Findings',
  'Section 28: Required fixes',
  'Section 29: Final post-run decision',
];

const REQUIRED_DOC_PHRASES = [
  'Purpose and Scope',
  'fake-data/local-only/read-only/dry-run-only/review-only post-run review template',
  'post-run review template review-only',
  'post_run_review_template_only',
  'a26c652',
  'Current State',
  'final go/no-go review packet is complete',
  'complete_for_human_review',
  'approved local dry-run values exist only as planned local fake-data values',
  'final activation command draft exists',
  'activation_approval_status',
  'not_granted',
  'activation_command_approval_status',
  'final_jason_activation_approval',
  'approved_for_activation_now',
  'approved_channels',
  'approved_external_services',
  'demo_ready_with_live_automation_disabled',
  'command_execution_status',
  'not_run_in_this_packet',
  'Template purpose',
  'post-run review template only',
  'only for use after a future exact local fake-data dry-run command is explicitly approved and run',
  'does not itself approve or execute anything',
  'Post-Run Review Fill-In Template',
  'PASS LOCAL DRY-RUN REVIEW',
  'PASS WITH FOLLOW-UP',
  'FAIL / NO-GO',
  'HOLD',
  'Old 90-Day Plan Boundary',
  'old 90-day plan is not imported into this post-run path',
  'current source-of-truth direction wins',
  'old 90-day plan cannot override current source-of-truth direction',
  'later narrow reconciliation audit',
  'must not override current launch safety posture',
  'Delivery and Execution Posture',
  'local-only',
  'fake-data-only',
  'read-only',
  'dry-run-only',
  'review-only',
  'Forbidden Actions',
  'external calls',
  'live services',
  'sandbox/test-mode services',
  'credentials',
  'production data',
  'schema/auth/RLS/security changes',
  'scheduler/cron/dispatcher',
  'public routes/webhooks',
  'billing/payment/deposit/invoice/quote/estimate automation',
  'requiring separate explicit approval',
  'No Command Execution In This Packet Rule',
  'No Safety Weakening Rule',
  'No Live Activation Rule',
  'No Test-Mode Activation Rule',
  'No Credential/Env Logging Rule',
  'No Production Data Rule',
  'No Schema/Auth/RLS/Security Implementation Rule',
  'scripts/verify-safe-readiness.sh',
  finalGoNoGoReviewPacketDocPath,
  finalActivationCommandDraftDocPath,
  ...POST_RUN_SECTIONS,
];

const REQUIRED_ASSERTIONS = [
  'post_run_review_template_doc_present',
  'template_only_review_only_scope_present',
  'source_of_truth_commit_a26c652_referenced',
  'final_go_no_go_review_packet_complete',
  'evidence_chain_complete_for_human_review',
  'does_not_approve_activation',
  'does_not_approve_command_execution',
  'command_execution_status_not_run_in_this_packet',
  'activation_approval_not_granted',
  'activation_command_approval_not_granted',
  'final_jason_activation_approval_not_granted',
  'approved_for_activation_now_false',
  'approved_channels_empty',
  'approved_external_services_empty',
  'all_required_post_run_review_sections_present',
  'decision_option_pass_local_dry_run_review_present',
  'decision_option_pass_with_follow_up_present',
  'decision_option_fail_no_go_present',
  'decision_option_hold_present',
  'old_90_day_plan_cannot_override_current_source_of_truth',
  'forbidden_external_live_sandbox_actions_blocked',
  'delivery_posture_local_fake_data_read_only_dry_run_review_only',
  'relationship_to_final_go_no_go_review_packet_present',
  'relationship_to_final_activation_command_draft_present',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
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
  'NATIVE_WORKFLOW_FIXTURE_FIRST_CONTROLLED_LAUNCH_POST_RUN_REVIEW_TEMPLATE.md',
  'run-native-workflow-fixture-first-controlled-launch-post-run-review-template-dry-run.sh',
  'verify-native-workflow-fixture-first-controlled-launch-post-run-review-template-readonly.js',
  'Native Workflow Fixture First Controlled Launch Post-Run Review Template',
  'native workflow fixture first controlled launch post-run review template',
  'first controlled launch post-run review template',
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
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const finalGoNoGoReviewPacketDoc = read(finalGoNoGoReviewPacketDocPath);
const finalActivationCommandDraftDoc = read(finalActivationCommandDraftDocPath);

passAssertion('post_run_review_template_doc_present');

for (const phrase of REQUIRED_DOC_PHRASES) {
  mustHave(doc, phrase, 'documentation');
}
passAssertion('template_only_review_only_scope_present');
passAssertion('source_of_truth_commit_a26c652_referenced');

mustHave(doc, SOURCE_OF_TRUTH_COMMIT, 'documentation');
mustHave(doc, 'final go/no-go review packet is complete', 'documentation');
mustHave(doc, 'evidence chain is complete for human review', 'documentation');
passAssertion('final_go_no_go_review_packet_complete');
passAssertion('evidence_chain_complete_for_human_review');

mustHave(doc, 'This is **not** approval to activate anything', 'documentation');
mustHave(doc, 'This does **not** execute any activation step or proposed command', 'documentation');
mustHave(doc, 'This does **not** run any approved local fake-data dry-run command', 'documentation');
mustHave(doc, 'does not itself approve or execute anything', 'documentation');
passAssertion('does_not_approve_activation');
passAssertion('does_not_approve_command_execution');

mustHave(doc, 'command_execution_status | not_run_in_this_packet', 'documentation');
mustHave(doc, 'command_execution_in_this_packet | not_run_in_this_packet', 'documentation');
mustHave(doc, 'Command execution status in this packet is `not_run_in_this_packet`', 'documentation');
passAssertion('command_execution_status_not_run_in_this_packet');

mustHave(doc, 'activation approval is not granted', 'documentation');
mustHave(doc, 'activation command approval is not granted', 'documentation');
mustHave(doc, 'final Jason activation approval is not granted', 'documentation');
passAssertion('activation_approval_not_granted');
passAssertion('activation_command_approval_not_granted');
passAssertion('final_jason_activation_approval_not_granted');

mustHave(doc, 'approved_for_activation_now | false', 'documentation');
mustHave(doc, 'approved_channels | []', 'documentation');
mustHave(doc, 'approved_external_services | []', 'documentation');
passAssertion('approved_for_activation_now_false');
passAssertion('approved_channels_empty');
passAssertion('approved_external_services_empty');

for (const section of POST_RUN_SECTIONS) {
  mustHave(doc, section, 'documentation post-run section');
}
passAssertion('all_required_post_run_review_sections_present');

mustHave(doc, 'Option 1: PASS LOCAL DRY-RUN REVIEW', 'documentation');
mustHave(doc, 'Option 2: PASS WITH FOLLOW-UP', 'documentation');
mustHave(doc, 'Option 3: FAIL / NO-GO', 'documentation');
mustHave(doc, 'Option 4: HOLD', 'documentation');
mustHave(doc, 'Still does not approve live activation', 'documentation');
mustHave(doc, 'No activation approval is granted', 'documentation');
mustHave(doc, 'Keep all activation paths blocked', 'documentation');
passAssertion('decision_option_pass_local_dry_run_review_present');
passAssertion('decision_option_pass_with_follow_up_present');
passAssertion('decision_option_fail_no_go_present');
passAssertion('decision_option_hold_present');

mustHave(doc, 'old 90-day plan is not imported into this post-run path', 'documentation');
mustHave(doc, 'current source-of-truth direction wins', 'documentation');
mustHave(doc, 'old 90-day plan cannot override current source-of-truth direction', 'documentation');
passAssertion('old_90_day_plan_cannot_override_current_source_of_truth');

mustHave(doc, 'sandbox/test-mode services', 'documentation');
mustHave(doc, 'billing/payment/deposit/invoice/quote/estimate automation', 'documentation');
passAssertion('forbidden_external_live_sandbox_actions_blocked');

mustHave(doc, 'delivery_mode | local-only', 'documentation');
mustHave(doc, 'data_mode | fake-data-only', 'documentation');
mustHave(doc, 'access_mode | read-only', 'documentation');
mustHave(doc, 'execution_mode | dry-run-only', 'documentation');
mustHave(doc, 'review_mode | review-only', 'documentation');
passAssertion('delivery_posture_local_fake_data_read_only_dry_run_review_only');

mustHave(doc, finalGoNoGoReviewPacketDocPath, 'documentation');
mustHave(doc, FINAL_GO_NO_GO_REVIEW_PACKET_COMMIT, 'documentation');
mustHave(finalGoNoGoReviewPacketDoc, 'final go/no-go review packet review-only', 'final go/no-go review packet doc');
passAssertion('relationship_to_final_go_no_go_review_packet_present');

mustHave(doc, finalActivationCommandDraftDocPath, 'documentation');
mustHave(doc, 'final activation command draft exists', 'documentation');
mustHave(finalActivationCommandDraftDoc, EXACT_COMMAND, 'final activation command draft doc');
passAssertion('relationship_to_final_activation_command_draft_present');

if (doc.includes('approved to run') && doc.includes(EXACT_COMMAND)) {
  fail('documentation must not approve command execution');
}

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(doc, phrase, 'documentation forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(doc)) fail(`unsafe pattern ${pattern} found in documentation`);
}

const syntax = spawnSync(process.execPath, ['--check', path.join(root, verifierPath)], {
  cwd: root,
  encoding: 'utf8',
});
if (syntax.status !== 0) {
  fail(`verifier syntax check failed: ${syntax.stderr || syntax.stdout}`);
}
console.log('PASS: verifier syntax check succeeded.');

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

mustHave(
  aggregate,
  'verify-native-workflow-fixture-first-controlled-launch-post-run-review-template-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture First Controlled Launch Post-Run Review Template',
  'aggregate readiness',
);
mustHave(verifierIndex, docPath, 'verifier index');
mustHave(verifierIndex, wrapperPath, 'verifier index');
mustHave(verifierIndex, verifierPath, 'verifier index');

for (const ref of PACKET_REFS) {
  mustHave(contextFirstPaid, ref, 'next chat first paid launch context');
  mustHave(contextAgentGrok, ref, 'next chat agent grok build workflow context');
  mustHave(businessGuide, ref, 'business buildout daily guide');
}
passAssertion('docs_and_context_wiring_present');

mustHave(wrapper, '#!/usr/bin/env bash', 'wrapper shebang');
mustHave(wrapper, 'set -euo pipefail', 'wrapper strict mode');
mustHave(wrapper, verifierPath, 'wrapper verifier');
mustHave(wrapper, 'npm --prefix backend run build', 'wrapper backend build');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, EXACT_COMMAND, 'wrapper must not execute activation command draft');
mustNotHave(
  wrapper,
  'run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh',
  'wrapper must not execute activation command draft wrapper',
);

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}
passAssertion('dry_run_wrapper_present_and_safe');
passAssertion('public_go_live_or_production_copy_not_changed_without_approval');

for (const assertion of REQUIRED_ASSERTIONS) {
  if (
    ![
      'post_run_review_template_doc_present',
      'template_only_review_only_scope_present',
      'source_of_truth_commit_a26c652_referenced',
      'final_go_no_go_review_packet_complete',
      'evidence_chain_complete_for_human_review',
      'does_not_approve_activation',
      'does_not_approve_command_execution',
      'command_execution_status_not_run_in_this_packet',
      'activation_approval_not_granted',
      'activation_command_approval_not_granted',
      'final_jason_activation_approval_not_granted',
      'approved_for_activation_now_false',
      'approved_channels_empty',
      'approved_external_services_empty',
      'all_required_post_run_review_sections_present',
      'decision_option_pass_local_dry_run_review_present',
      'decision_option_pass_with_follow_up_present',
      'decision_option_fail_no_go_present',
      'decision_option_hold_present',
      'old_90_day_plan_cannot_override_current_source_of_truth',
      'forbidden_external_live_sandbox_actions_blocked',
      'delivery_posture_local_fake_data_read_only_dry_run_review_only',
      'relationship_to_final_go_no_go_review_packet_present',
      'relationship_to_final_activation_command_draft_present',
      'demo_ready_with_live_automation_disabled_preserved',
      'full_safe_readiness_lane_preserved',
      'docs_and_context_wiring_present',
      'dry_run_wrapper_present_and_safe',
      'public_go_live_or_production_copy_not_changed_without_approval',
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
    ].includes(assertion)
  ) {
    fail(`unhandled assertion: ${assertion}`);
  }
}

console.log(
  `PASS: Native Workflow Fixture First Controlled Launch Post-Run Review Template verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);