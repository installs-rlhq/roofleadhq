#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');

const packetDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_PACKET.md';
const noGoReviewDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_PACKET_NO_GO_REVIEW.md';
const copyPastePacketDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_FINAL_JASON_EXACT_SANDBOX_TEST_MODE_APPROVAL_COPY_PASTE_PACKET.md';
const preRunGuardDocPath =
  'docs/NATIVE_WORKFLOW_FIXTURE_POST_APPROVAL_SANDBOX_TEST_MODE_PRE_RUN_GUARD_DRAFT.md';
const fixturePath =
  'backend/fixtures/native-workflow-demo-roofer/signed-sandbox-test-mode-approval-capture-packet.json';
const copyPasteFixturePath =
  'backend/fixtures/native-workflow-demo-roofer/final-jason-exact-sandbox-test-mode-approval-copy-paste-packet.json';
const wrapperPath =
  'scripts/run-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-dry-run.sh';
const fullReadinessPath = 'scripts/verify-safe-readiness.sh';
const verifierPath =
  'backend/scripts/verify-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-readonly.js';
const aggregateReadinessPath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextAgentGrokPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const SOURCE_OF_TRUTH_COMMIT = '06529ab';
const APPROVED_EXACT_COMMAND =
  'bash scripts/run-native-workflow-fixture-sandbox-test-mode-channel-validation-dry-run.sh';
const APPROVED_EXACT_WORKING_DIRECTORY = '/root/roofleadhq';
const APPROVAL_SIGNATURE_NAME = 'Jason Lohse';
const APPROVAL_TIMESTAMP = '06/18/2026 10:00PM MST';
const APPROVAL_EXPIRATION =
  '7 calendar days from timestamp OR upon completion of 30-scenario validation run, whichever comes first';

const EVIDENCE_CHAIN_COMMITS = [
  '17abae0',
  'cf566ae',
  '728ad03',
  '401bfc7',
  'edceb29',
  'df388f4',
  '3800512',
  'c6df554',
  'f752452',
  '0d7ae0d',
  '5ef9ef5',
  'db9ece3',
  '04e0de6',
  'ae9154b',
  '6b2fe60',
  '816dfc2',
  'ef79784',
  '2dd1016',
  '11e74d4',
  '0cceb00',
  'b6d852c',
  '7f375a4',
  '878fc77',
  'f56340f',
  'aa3f818',
  '15644fa',
  'cc67563',
  '0159faf',
  'dbb30a7',
  '436813f',
  '32c2c8b',
  'f36a247',
  '7f57e7d',
  'e96ff0e',
  '1c04c0c',
  '06529ab',
];

const EXACT_VALUE_FIELDS = [
  'exact_services',
  'exact_test_accounts',
  'exact_environment',
  'exact_command',
  'exact_working_directory',
  'exact_credentials_env_api_webhook_boundary',
  'exact_external_call_boundary',
  'exact_production_data_boundary',
  'exact_schema_auth_rls_security_boundary',
  'exact_public_route_webhook_scheduler_cron_dispatcher_boundary',
  'exact_messaging_contact_permission_boundary',
  'exact_calendar_appointment_boundary',
  'exact_reporting_csv_boundary',
  'exact_stop_conditions',
  'exact_rollback_owner',
  'exact_evidence_owner',
  'exact_log_path',
  'exact_approval_expiration',
  'exact_one_time_use_limitation',
];

const APPROVED_EXACT_VALUES = {
  exact_services:
    'Twilio Sandbox SMS API (inbound/outbound stubs to sandbox numbers only); Vapi test assistant API (call stub, no live outbound); Resend test mode API (test inbox only, no live sends); RoofLeadHQ sandbox/staging Supabase project (scoped tables only)',
  exact_test_accounts:
    'Twilio sandbox test number (Jason-designated); Vapi test assistant ID (Jason-designated); Resend test inbox address (Jason-designated); Summit Peak Roofing Demo LLC operator sandbox login (fake demo roofer scope only)',
  exact_environment:
    'Local dev workstation at RoofLeadHQ repository root; RoofLeadHQ sandbox/staging Supabase project (explicitly not production)',
  exact_command: APPROVED_EXACT_COMMAND,
  exact_working_directory: APPROVED_EXACT_WORKING_DIRECTORY,
  exact_credentials_env_api_webhook_boundary:
    'Named vars only (no values logged): TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_TEST_NUMBER, VAPI_API_KEY, VAPI_ASSISTANT_ID, RESEND_API_KEY, SUPABASE_SANDBOX_URL, SUPABASE_SANDBOX_ANON_KEY, SUPABASE_SANDBOX_SERVICE_ROLE_KEY — sandbox/staging only; production vars forbidden',
  exact_external_call_boundary:
    'Twilio Sandbox SMS API (send/receive to sandbox numbers only); Vapi test API (assistant stub calls only); Resend test API (test inbox only); Supabase sandbox project REST/RPC only — no production endpoints, no CRM, no billing',
  exact_production_data_boundary:
    'No production Supabase reads/writes; no production homeowner/roofer PII; sandbox/staging tables scoped to Summit Peak Roofing Demo LLC test data only; local fake demo fixtures allowed',
  exact_schema_auth_rls_security_boundary:
    'No schema migrations; no auth changes; no RLS policy changes; no security config changes — read/write sandbox data only within existing schema',
  exact_public_route_webhook_scheduler_cron_dispatcher_boundary:
    'No new public routes; no webhook exposure; no scheduler/cron/dispatcher activation; no inbound webhook handlers — local dry-run and sandbox API stubs only',
  exact_messaging_contact_permission_boundary:
    'Sandbox test numbers only; explicit opt-in for Jason-designated test contacts; STOP/opt-out honored immediately; no live homeowner SMS/email/calls; compliance hold before any send',
  exact_calendar_appointment_boundary:
    'Calendar stub events in sandbox only; no live Google/Outlook integration; manual coordination fallback required; inspection/appointment records in sandbox DB only',
  exact_reporting_csv_boundary:
    'Local fake-data CSV exports and sandbox admin dashboard views only; no live CSV delivery to external systems; no production reporting emails; audit logs in sandbox scope only',
  exact_stop_conditions:
    'unexpected live service indicator; unexpected production data access; unexpected external call outside boundary; unexpected schema/auth/RLS change; unexpected public route/webhook/scheduler; unexpected billing/payment behavior; real-data ambiguity; approval ambiguity; safe readiness failure; backend build failure (per NO_GO_STOP_CONDITION_CHECKLIST)',
  exact_rollback_owner: 'Jason Lohse (founder/operator)',
  exact_evidence_owner: 'Jason Lohse (founder/operator)',
  exact_log_path:
    'logs/sandbox-test-mode-channel-validation/{YYYY-MM-DD-HHMMSS}.log under repo root',
  exact_approval_expiration:
    '7 calendar days from explicit Jason sandbox/test-mode approval timestamp OR upon completion of 30-scenario validation run, whichever comes first',
  exact_one_time_use_limitation:
    'Single-use approval per sandbox/test-mode validation batch; invalidated after 30 scenarios complete, any STOP_AND_ROLL_BACK, or approval expiration; reuse requires new explicit Jason approval with refreshed exact values',
};

const REQUIRED_APPROVAL_LANGUAGE = [
  'I, Jason Lohse, explicitly approve the exact scoped sandbox/test-mode run described below.',
  'This approval is sandbox/test-mode only.',
  'This approval does not approve live activation.',
  'This approval does not approve real homeowner contact.',
  'This approval does not approve real roofer contact unless separately approved.',
  'This approval does not approve production Supabase writes.',
  'This approval does not approve schema/auth/RLS/security changes.',
  'This approval does not approve billing/payment/deposit/invoice/quote/estimate automation.',
  'This approval is one-time-use only.',
  'Signature: Jason Lohse',
  'Timestamp: 06/18/2026 10:00PM MST',
  'Expiration: 7 calendar days from timestamp OR upon completion of 30-scenario validation run, whichever comes first',
];

const REQUIRED_ASSERTIONS = [
  'packet_doc_present',
  'no_go_review_doc_present',
  'structured_fixture_present',
  'structured_fixture_valid_json',
  'upstream_copy_paste_fixture_present',
  'source_of_truth_commit_06529ab_referenced',
  'signed_approval_text_present',
  'approval_signature_jason_lohse_present',
  'approval_timestamp_present',
  'all_19_exact_values_present_and_approved',
  'accepted_exact_values_count_19',
  'approved_exact_values_filled_count_19',
  'approval_capture_status_captured',
  'jason_signed_approval_status_signed',
  'sandbox_test_mode_approval_status_granted_scoped_one_time_pending_pre_run_guard',
  'live_activation_approval_status_not_granted',
  'real_homeowner_contact_approval_status_not_granted',
  'real_roofer_contact_approval_status_not_granted',
  'production_supabase_write_approval_status_not_granted',
  'schema_auth_rls_security_change_approval_status_not_granted',
  'billing_payment_automation_approval_status_not_granted',
  'approved_for_activation_now_false',
  'command_execution_status_not_run_by_this_packet',
  'future_command_status_blocked_until_pre_run_guard_passes',
  'approved_exact_command_byte_for_byte',
  'approved_exact_working_directory_byte_for_byte',
  'packet_captures_signed_approval_evidence_only',
  'packet_does_not_execute_approved_command',
  'packet_does_not_pass_pre_run_guard',
  'packet_does_not_activate_sandbox_test_mode',
  'packet_does_not_approve_live_activation',
  'packet_does_not_approve_real_homeowner_contact',
  'packet_does_not_approve_real_roofer_contact',
  'packet_does_not_approve_production_data_access',
  'next_step_pre_run_guard_required',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'no_live_sms_activation',
  'no_twilio_activation',
  'no_vapi_activation',
  'no_resend_activation',
  'no_scheduler_cron_dispatcher_activation',
  'no_public_route_webhook_activation',
  'no_billing_payment_quote_invoice_estimate_activation',
  'no_supabase_production_reads_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_env_credential_logging',
  'verifier_file_present',
];

const PACKET_REFS = [
  'NATIVE_WORKFLOW_FIXTURE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_PACKET.md',
  'NATIVE_WORKFLOW_FIXTURE_SIGNED_SANDBOX_TEST_MODE_APPROVAL_CAPTURE_PACKET_NO_GO_REVIEW.md',
  'run-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-dry-run.sh',
  'verify-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-readonly.js',
  'signed-sandbox-test-mode-approval-capture-packet.json',
  'Native Workflow Fixture Signed Sandbox/Test-Mode Approval Capture Packet',
  'native workflow fixture signed sandbox test mode approval capture packet',
  'signed sandbox test mode approval capture packet',
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

function readJson(p) {
  return JSON.parse(read(p));
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

const packetDoc = read(packetDocPath);
const noGoReviewDoc = read(noGoReviewDocPath);
read(copyPastePacketDocPath);
read(preRunGuardDocPath);
const wrapper = read(wrapperPath);
const fullReadiness = read(fullReadinessPath);
const aggregate = read(aggregateReadinessPath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextAgentGrok = read(contextAgentGrokPath);
const businessGuide = read(businessGuidePath);
const combinedDocs = `${packetDoc}\n${noGoReviewDoc}`;

passAssertion('packet_doc_present');
passAssertion('no_go_review_doc_present');

mustHave(packetDoc, SOURCE_OF_TRUTH_COMMIT, 'packet doc');
mustHave(noGoReviewDoc, SOURCE_OF_TRUTH_COMMIT, 'no-go review');
passAssertion('source_of_truth_commit_06529ab_referenced');

for (const commit of EVIDENCE_CHAIN_COMMITS) {
  mustHave(packetDoc, commit, 'packet doc');
}

for (const line of REQUIRED_APPROVAL_LANGUAGE) {
  mustHave(packetDoc, line, 'packet doc signed approval');
}
passAssertion('signed_approval_text_present');
mustHave(packetDoc, APPROVAL_SIGNATURE_NAME, 'packet doc');
passAssertion('approval_signature_jason_lohse_present');
mustHave(packetDoc, APPROVAL_TIMESTAMP, 'packet doc');
passAssertion('approval_timestamp_present');

mustHave(packetDoc, 'approval_capture_status | captured', 'packet doc');
mustHave(packetDoc, 'jason_signed_approval_status | signed', 'packet doc');
mustHave(
  packetDoc,
  'sandbox_test_mode_approval_status | granted_scoped_one_time_pending_pre_run_guard',
  'packet doc',
);
mustHave(packetDoc, 'live_activation_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_homeowner_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'real_roofer_contact_approval_status | not_granted', 'packet doc');
mustHave(packetDoc, 'production_supabase_write_approval_status | not_granted', 'packet doc');
mustHave(
  packetDoc,
  'schema_auth_rls_security_change_approval_status | not_granted',
  'packet doc',
);
mustHave(packetDoc, 'billing_payment_automation_approval_status | not_granted', 'packet doc');
passAssertion('approval_capture_status_captured');
passAssertion('jason_signed_approval_status_signed');
passAssertion('sandbox_test_mode_approval_status_granted_scoped_one_time_pending_pre_run_guard');
passAssertion('live_activation_approval_status_not_granted');
passAssertion('real_homeowner_contact_approval_status_not_granted');
passAssertion('real_roofer_contact_approval_status_not_granted');
passAssertion('production_supabase_write_approval_status_not_granted');
passAssertion('schema_auth_rls_security_change_approval_status_not_granted');
passAssertion('billing_payment_automation_approval_status_not_granted');

mustHave(packetDoc, 'exact_values_required_count | 19', 'packet doc');
mustHave(packetDoc, 'accepted_exact_values_count | 19', 'packet doc');
mustHave(packetDoc, 'approved_exact_values_filled_count | 19', 'packet doc');
mustHave(
  packetDoc,
  'all_19_exact_values_status | accepted_and_approved_for_exact_scoped_sandbox_test_mode_only',
  'packet doc',
);
passAssertion('accepted_exact_values_count_19');
passAssertion('approved_exact_values_filled_count_19');

for (const field of EXACT_VALUE_FIELDS) {
  mustHave(packetDoc, `| ${field} | true | true | accepted_and_approved |`, 'packet doc exact values');
  mustHave(packetDoc, APPROVED_EXACT_VALUES[field], 'packet doc exact value text');
}
passAssertion('all_19_exact_values_present_and_approved');

mustHave(packetDoc, `approved_exact_command | ${APPROVED_EXACT_COMMAND}`, 'packet doc');
mustHave(packetDoc, `approved_exact_working_directory | ${APPROVED_EXACT_WORKING_DIRECTORY}`, 'packet doc');
passAssertion('approved_exact_command_byte_for_byte');
passAssertion('approved_exact_working_directory_byte_for_byte');

mustHave(packetDoc, 'approved_for_activation_now | false', 'packet doc');
mustHave(packetDoc, 'command_execution_status | not_run_by_this_packet', 'packet doc');
mustHave(packetDoc, 'future_command_status | blocked_until_pre_run_guard_passes', 'packet doc');
passAssertion('approved_for_activation_now_false');
passAssertion('command_execution_status_not_run_by_this_packet');
passAssertion('future_command_status_blocked_until_pre_run_guard_passes');

mustHave(packetDoc, 'This packet captures signed approval evidence **only**', 'packet doc');
passAssertion('packet_captures_signed_approval_evidence_only');
mustHave(packetDoc, 'This packet does **not** execute the approved command', 'packet doc');
passAssertion('packet_does_not_execute_approved_command');
mustHave(packetDoc, 'This packet does **not** pass the pre-run guard by itself', 'packet doc');
passAssertion('packet_does_not_pass_pre_run_guard');
mustHave(packetDoc, 'This packet does **not** activate sandbox/test-mode by itself', 'packet doc');
passAssertion('packet_does_not_activate_sandbox_test_mode');
mustHave(packetDoc, 'This packet does **not** approve live activation', 'packet doc');
passAssertion('packet_does_not_approve_live_activation');
mustHave(packetDoc, 'This packet does **not** approve real homeowner contact', 'packet doc');
passAssertion('packet_does_not_approve_real_homeowner_contact');
mustHave(packetDoc, 'This packet does **not** approve real roofer contact', 'packet doc');
passAssertion('packet_does_not_approve_real_roofer_contact');
mustHave(packetDoc, 'This packet does **not** approve production data access', 'packet doc');
passAssertion('packet_does_not_approve_production_data_access');
mustHave(packetDoc, 'separate pre-run guard pass', 'packet doc');
passAssertion('next_step_pre_run_guard_required');

mustHave(packetDoc, 'Twilio Sandbox SMS API only', 'packet doc');
mustHave(packetDoc, 'no live Twilio', 'packet doc');
mustHave(packetDoc, 'no production Supabase', 'packet doc');
mustHave(packetDoc, 'demo_ready_with_live_automation_disabled', 'packet doc');

if (!fs.existsSync(path.join(root, fixturePath))) {
  fail(`missing structured fixture: ${fixturePath}`);
}
passAssertion('structured_fixture_present');

if (!fs.existsSync(path.join(root, copyPasteFixturePath))) {
  fail(`missing upstream copy/paste fixture: ${copyPasteFixturePath}`);
}
passAssertion('upstream_copy_paste_fixture_present');

const fixture = readJson(fixturePath);

if (fixture.source_of_truth_commit !== SOURCE_OF_TRUTH_COMMIT) {
  fail('fixture source_of_truth_commit must be 06529ab');
}
if (fixture.packet_status !== 'review_only') {
  fail('fixture packet_status must be review_only');
}
if (fixture.approval_capture_status !== 'captured') {
  fail('fixture approval_capture_status must be captured');
}
if (fixture.jason_signed_approval_status !== 'signed') {
  fail('fixture jason_signed_approval_status must be signed');
}
if (fixture.approval_signature_name !== APPROVAL_SIGNATURE_NAME) {
  fail('fixture approval_signature_name mismatch');
}
if (fixture.approval_timestamp !== APPROVAL_TIMESTAMP) {
  fail('fixture approval_timestamp mismatch');
}
if (fixture.approval_expiration !== APPROVAL_EXPIRATION) {
  fail('fixture approval_expiration mismatch');
}
if (fixture.exact_values_required_count !== 19) {
  fail('fixture exact_values_required_count must be 19');
}
if (fixture.accepted_exact_values_count !== 19) {
  fail('fixture accepted_exact_values_count must be 19');
}
if (fixture.approved_exact_values_filled_count !== 19) {
  fail('fixture approved_exact_values_filled_count must be 19');
}
if (
  fixture.all_19_exact_values_status !==
  'accepted_and_approved_for_exact_scoped_sandbox_test_mode_only'
) {
  fail('fixture all_19_exact_values_status mismatch');
}
if (fixture.sandbox_test_mode_approval_status !== 'granted_scoped_one_time_pending_pre_run_guard') {
  fail('fixture sandbox_test_mode_approval_status mismatch');
}
if (fixture.live_activation_approval_status !== 'not_granted') {
  fail('fixture live_activation_approval_status must be not_granted');
}
if (fixture.real_homeowner_contact_approval_status !== 'not_granted') {
  fail('fixture real_homeowner_contact_approval_status must be not_granted');
}
if (fixture.real_roofer_contact_approval_status !== 'not_granted') {
  fail('fixture real_roofer_contact_approval_status must be not_granted');
}
if (fixture.production_supabase_write_approval_status !== 'not_granted') {
  fail('fixture production_supabase_write_approval_status must be not_granted');
}
if (fixture.schema_auth_rls_security_change_approval_status !== 'not_granted') {
  fail('fixture schema_auth_rls_security_change_approval_status must be not_granted');
}
if (fixture.billing_payment_automation_approval_status !== 'not_granted') {
  fail('fixture billing_payment_automation_approval_status must be not_granted');
}
if (fixture.approved_exact_command !== APPROVED_EXACT_COMMAND) {
  fail('fixture approved_exact_command mismatch');
}
if (fixture.approved_exact_working_directory !== APPROVED_EXACT_WORKING_DIRECTORY) {
  fail('fixture approved_exact_working_directory mismatch');
}
if (fixture.future_command_status !== 'blocked_until_pre_run_guard_passes') {
  fail('fixture future_command_status mismatch');
}
if (fixture.approved_for_activation_now !== false) {
  fail('fixture approved_for_activation_now must be false');
}
if (fixture.command_execution_status !== 'not_run_by_this_packet') {
  fail('fixture command_execution_status must be not_run_by_this_packet');
}
if (fixture.safety_status !== 'demo_ready_with_live_automation_disabled') {
  fail('fixture safety_status mismatch');
}
if (fixture.live_activation_allowed !== false) {
  fail('fixture live_activation_allowed must be false');
}
if (fixture.sandbox_test_mode_activation_allowed !== false) {
  fail('fixture sandbox_test_mode_activation_allowed must be false');
}
if (fixture.external_calls_allowed !== false) {
  fail('fixture external_calls_allowed must be false');
}
if (fixture.credentials_access_allowed !== false) {
  fail('fixture credentials_access_allowed must be false');
}
if (fixture.production_data_access_allowed !== false) {
  fail('fixture production_data_access_allowed must be false');
}

for (const field of EXACT_VALUE_FIELDS) {
  const accepted = fixture.accepted_exact_values[field];
  const approved = fixture.approved_exact_values[field];
  const expected = APPROVED_EXACT_VALUES[field];
  if (accepted !== expected) {
    fail(`fixture accepted_exact_values.${field} mismatch`);
  }
  if (approved !== expected) {
    fail(`fixture approved_exact_values.${field} mismatch`);
  }
}

if (!fixture.captured_jason_signed_approval_statement) {
  fail('fixture captured_jason_signed_approval_statement missing');
}
if (fixture.captured_jason_signed_approval_statement.captured !== true) {
  fail('fixture captured_jason_signed_approval_statement.captured must be true');
}
if (fixture.captured_jason_signed_approval_statement.signed !== true) {
  fail('fixture captured_jason_signed_approval_statement.signed must be true');
}
if (fixture.captured_jason_signed_approval_statement.activation_granted !== false) {
  fail('fixture captured_jason_signed_approval_statement.activation_granted must be false');
}

if (
  !Array.isArray(fixture.evidence_chain_commits) ||
  fixture.evidence_chain_commits.length !== 36
) {
  fail('fixture evidence_chain_commits must contain 36 commits');
}
for (const commit of EVIDENCE_CHAIN_COMMITS) {
  if (!fixture.evidence_chain_commits.includes(commit)) {
    fail(`fixture evidence_chain_commits missing ${commit}`);
  }
}

passAssertion('structured_fixture_valid_json');

for (const phrase of FORBIDDEN_PUBLIC) {
  mustNotHave(combinedDocs, phrase, 'combined packet docs forbidden language');
}

for (const pattern of UNSAFE_PATTERNS) {
  if (pattern.test(combinedDocs)) fail(`unsafe pattern ${pattern} found in combined docs`);
  if (pattern.test(wrapper)) fail(`unsafe pattern ${pattern} found in wrapper`);
}

if (!fs.existsSync(path.join(root, verifierPath))) fail(`missing verifier: ${verifierPath}`);
passAssertion('verifier_file_present');

const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') {
  fail(
    `pilot readiness summary is not demo_ready_with_live_automation_disabled (got: ${status.summary})`,
  );
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
passAssertion('no_scheduler_cron_dispatcher_activation');
passAssertion('no_public_route_webhook_activation');
passAssertion('no_billing_payment_quote_invoice_estimate_activation');
passAssertion('no_supabase_production_reads_writes');
passAssertion('no_schema_migrations_auth_rls_security_changes');
passAssertion('no_secret_env_credential_logging');

mustHave(fullReadiness, 'verify-first-paid-pilot-readiness-readonly.js', 'full safe readiness');
mustHave(fullReadiness, 'npm --prefix backend run build', 'full safe readiness');
passAssertion('full_safe_readiness_lane_preserved');

mustHave(
  aggregate,
  'verify-native-workflow-fixture-signed-sandbox-test-mode-approval-capture-packet-readonly.js',
  'aggregate readiness',
);
mustHave(
  aggregate,
  'Native Workflow Fixture Signed Sandbox/Test-Mode Approval Capture Packet',
  'aggregate readiness',
);
mustHave(verifierIndex, packetDocPath, 'verifier index');
mustHave(verifierIndex, noGoReviewDocPath, 'verifier index');
mustHave(verifierIndex, fixturePath, 'verifier index');
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
mustHave(wrapper, 'node --check', 'wrapper syntax checks');
mustHave(wrapper, 'local approval-capture only', 'wrapper mode');
mustHave(wrapper, 'not activation', 'wrapper mode');
mustHave(wrapper, 'non-executing', 'wrapper mode');
mustHave(wrapper, 'No external calls', 'wrapper mode');
mustHave(wrapper, 'no credentials', 'wrapper mode');
mustHave(wrapper, 'no production data', 'wrapper mode');
mustHave(wrapper, 'no roofer/homeowner contact', 'wrapper mode');
mustHave(wrapper, 'pre-run guard pass', 'wrapper mode');
mustNotHave(wrapper, 'verify-source-of-truth.sh', 'wrapper must not run source-of-truth check');
mustNotHave(wrapper, 'verify-safe-readiness.sh', 'wrapper must not run full aggregate');
mustNotHave(wrapper, APPROVED_EXACT_COMMAND, 'wrapper must not execute approved command');
passAssertion('dry_run_wrapper_present_and_safe');

mustHave(packetDoc, fixturePath, 'packet doc');
mustHave(packetDoc, verifierPath, 'packet doc');
mustHave(packetDoc, wrapperPath, 'packet doc');
mustHave(packetDoc, noGoReviewDocPath, 'packet doc');

if (REQUIRED_ASSERTIONS.length !== 50) {
  fail(`REQUIRED_ASSERTIONS must contain 50 items (found ${REQUIRED_ASSERTIONS.length})`);
}

console.log(
  `PASS: Native Workflow Fixture Signed Sandbox/Test-Mode Approval Capture Packet verified (${REQUIRED_ASSERTIONS.length} assertions).`,
);
console.log(
  'PASS: Full aggregate regression lane preserved via scripts/verify-safe-readiness.sh.',
);