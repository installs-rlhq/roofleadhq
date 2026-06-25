#!/usr/bin/env node
/**
 * Build 203 Read-Only Verifier — Real-Customer Pilot Decision + Consent/Onboarding Packet.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no production data, no live
 * activation, no SMS, no external Twilio call, no retry, no real contacts. Does NOT invoke any live
 * runner; does NOT construct a Twilio client; does NOT call messages.create.
 *
 * Proves:
 *  - The Build 203 decision packet records decision=REAL_CUSTOMER_PILOT_REVIEW_REQUIRED with
 *    unrestricted_launch=false, live_automation_remains_disabled=true,
 *    real_customer_pilot_authorized_now=false, homeowner_contact_authorized_now=false, and no live action.
 *  - The pilot scope recommendation is narrow (one consenting roofer, one manual lead, Jason-coordinated,
 *    SMS-only after fresh approval, no retry by default, no production/billing automation).
 *  - The consent/onboarding checklist and go/no-go checklist are present and complete, with no numbers
 *    or secret values stored in the repo.
 *  - The UNSIGNED approval template authorizes nothing: approval_signed=false, approval_granted=false,
 *    authorizes_real_customer_pilot_now=false.
 *  - The launch-readiness summary records the three controlled-send successes and that the next step is a
 *    real-customer pilot decision/consent (NOT unrestricted launch); broader automation disabled.
 *  - Names/metadata/booleans/codes only; no secret values or phone numbers; safety posture preserved.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const decisionPath = `${FIXTURE_DIR}/real-customer-pilot-decision-build-203.json`;
const templatePath = `${FIXTURE_DIR}/real-customer-pilot-unsigned-approval-template-build-203.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-203.json`;
const priorCloseoutPath = `${FIXTURE_DIR}/controlled-roofer-pilot-expansion-retry-closeout-build-202.json`;
const priorSummaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-202.json`;
const wrapperPath = 'scripts/run-real-customer-pilot-decision-build-203-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_REAL_CUSTOMER_PILOT_DECISION_BUILD_203.md';

const DECISION = 'REAL_CUSTOMER_PILOT_REVIEW_REQUIRED';

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function fullPath(rel) { return path.join(root, rel); }
function read(rel) {
  const target = fullPath(rel);
  if (!fs.existsSync(target)) fail('missing file: ' + rel);
  return fs.readFileSync(target, 'utf8');
}
function readJson(rel) { return JSON.parse(read(rel)); }
function isExecutable(rel) {
  try { fs.accessSync(fullPath(rel), fs.constants.X_OK); return true; } catch { return false; }
}

console.log('== Build 203 Real-Customer Pilot Decision + Consent/Onboarding Packet Verification (local-only) ==');

const decision = readJson(decisionPath);
const template = readJson(templatePath);
const summary = readJson(summaryPath);
const priorCloseout = readJson(priorCloseoutPath);
const priorSummary = readJson(priorSummaryPath);
const wrapper = read(wrapperPath);
const doc = read(docPath);

// --- Decision evidence: required markers ---
if (decision.build !== 203) fail('decision build must be 203');
const requiredDecision = {
  decision: DECISION,
  unrestricted_launch: false,
  live_automation_remains_disabled: true,
  real_customer_pilot_authorized_now: false,
  homeowner_contact_authorized_now: false,
  no_live_action_during_decision: true,
  no_secret_values_recorded: true,
  no_phone_number_recorded: true,
  next_step_is_unrestricted_launch: false,
  next_step_is_real_customer_pilot_decision_and_consent: true,
  launch_status: 'pilot_gated_not_unrestricted',
  safety_posture: 'demo_ready_with_live_automation_disabled'
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (decision[k] !== v) fail('decision ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(decision[k]) + ')');
}
pass('build_203_decision_requires_real_customer_pilot_review_authorizes_nothing_no_live_action');

// --- Pilot scope recommendation: narrow ---
const scope = decision.pilot_scope_recommendation || {};
const requiredScope = {
  one_consenting_roofer: true,
  one_manually_selected_lead: true,
  jason_coordinated_workflow: true,
  sms_only: true,
  sms_only_after_fresh_approval: true,
  no_retry_by_default: true,
  no_production_automation: true,
  no_billing_quote_invoice_deposit_automation: true
};
for (const [k, v] of Object.entries(requiredScope)) {
  if (scope[k] !== v) fail('pilot scope ' + k + ' must be ' + JSON.stringify(v));
}
pass('build_203_pilot_scope_is_narrow_one_roofer_one_lead_jason_coordinated_sms_only_after_approval');

// --- Consent / onboarding checklist ---
const consent = decision.consent_onboarding_checklist || {};
const requiredConsent = {
  roofer_consent_captured_outside_repo: true,
  permitted_sms_recipient_identified_outside_repo: true,
  homeowner_consent_rules_reviewed_before_any_homeowner_message: true,
  stop_opt_out_language_finalized_before_homeowner_facing_sms: true,
  consent_values_recorded_in_repo: false,
  recipient_number_recorded_in_repo: false
};
for (const [k, v] of Object.entries(requiredConsent)) {
  if (consent[k] !== v) fail('consent checklist ' + k + ' must be ' + JSON.stringify(v));
}
if (consent.rollback_stop_owner !== 'Jason Lohse') fail('consent checklist rollback_stop_owner must be Jason Lohse');
pass('build_203_consent_onboarding_checklist_present_consent_and_number_outside_repo');

// --- Go / no-go checklist ---
const gng = decision.go_no_go_checklist || {};
const requiredGng = {
  consent_marker_present: true,
  approved_destination_marker_present_no_number_stored: true,
  fresh_signed_approval_required_before_any_live_send: true,
  no_homeowner_message_without_separate_approval: true,
  no_production_data_until_separately_approved: true
};
for (const [k, v] of Object.entries(requiredGng)) {
  if (gng[k] !== v) fail('go/no-go checklist ' + k + ' must be ' + JSON.stringify(v));
}
pass('build_203_go_no_go_checklist_present_fresh_approval_and_separate_homeowner_approval_required');

// --- Unsigned approval template authorizes nothing ---
if (template.build !== 203) fail('template build must be 203');
const requiredTemplate = {
  approval_signed: false,
  approval_granted: false,
  authorizes_real_customer_pilot_now: false,
  authorizes_build_environment_send: false,
  authorizes_claude_to_send: false,
  authorizes_homeowner_message: false,
  authorizes_live_automation: false,
  authorizes_production_data: false,
  recipient_number_recorded: false,
  secret_values_recorded: false
};
for (const [k, v] of Object.entries(requiredTemplate)) {
  if (template[k] !== v) fail('approval template ' + k + ' must be ' + JSON.stringify(v));
}
const mustFalse = template.must_remain_false_in_this_build || {};
for (const k of Object.keys(mustFalse)) {
  if (mustFalse[k] !== false) fail('approval template must_remain_false_in_this_build.' + k + ' must be false');
}
if (decision.unsigned_approval_template_reference !== templatePath) fail('decision must reference the unsigned approval template');
pass('build_203_unsigned_approval_template_authorizes_nothing');

// --- Decision safety attestations ---
const att = decision.decision_safety_attestations;
if (!att) fail('decision missing safety attestations');
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent', 'network_or_external_call_made',
  'retry_performed', 'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase',
  'channel_expanded_beyond_sms', 'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added',
  'email_call_calendar_automation_added', 'schema_auth_rls_security_changes'];
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('decision safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('decision other_live_automation_remains_disabled must be true');
pass('build_203_decision_local_only_no_send_no_network_no_retry_no_secrets_no_automation');

// --- Prior controlled successes preserved (reference integrity) ---
if (priorCloseout.sms_was_sent !== true || priorCloseout.final_decision !== 'CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT') {
  fail('Build 202 closeout must record the successful expansion retry');
}
if (priorSummary.build !== 202) fail('prior summary must be build 202');
pass('build_203_references_build_202_successful_expansion_retry_closeout');

// --- Launch-readiness summary records successes + keeps launch pilot-gated ---
if (summary.build !== 203) fail('summary build must be 203');
const lanes = summary.readiness_lanes || {};
const jasonLane = lanes.controlled_live_sms_to_jason || {};
if (jasonLane.one_message_succeeded !== true) fail('summary must record controlled live SMS to Jason succeeded');
const firstPilot = lanes.first_controlled_roofer_pilot_one_message_sms || {};
if (firstPilot.first_controlled_roofer_pilot_succeeded !== true) fail('summary must record first controlled roofer pilot succeeded');
const retryLane = lanes.controlled_pilot_expansion_retry_send || {};
if (retryLane.controlled_pilot_expansion_retry_succeeded !== true) fail('summary must record controlled expansion retry succeeded');
const decLane = lanes.real_customer_pilot_decision || {};
if (decLane.decision !== DECISION) fail('summary decision lane must record ' + DECISION);
if (decLane.real_customer_pilot_authorized_now !== false) fail('summary decision lane must record pilot not authorized now');
if (decLane.approval_signed !== false || decLane.approval_granted !== false) fail('summary decision lane must record approval unsigned/ungranted');
const narrative = summary.narrative || {};
for (const k of ['controlled_live_sms_to_jason_succeeded', 'first_controlled_roofer_pilot_succeeded',
  'controlled_expansion_retry_succeeded', 'broader_live_automation_remains_disabled',
  'next_step_is_real_customer_pilot_decision_and_consent_not_unrestricted_launch']) {
  if (narrative[k] !== true) fail('summary narrative must record: ' + k);
}
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary must record all broader live automation remains disabled');
for (const k of ['sms_blast_automation_enabled', 'calendar_live_enabled', 'vapi_outbound_live_enabled', 'resend_live_enabled',
  'lindy_live_enabled', 'cron_scheduler_dispatcher_enabled', 'public_live_routes_webhooks_enabled',
  'crm_sync_automation_enabled', 'billing_payment_deposit_quote_estimate_invoice_automation_enabled']) {
  if (broader[k] !== false) fail('summary broader automation flag must be false: ' + k);
}
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.next_step_is_unrestricted_launch !== false) fail('summary next_step_is_unrestricted_launch must be false');
if (summary.next_step_is_real_customer_pilot_decision_and_consent !== true) fail('summary next step must be a real-customer pilot decision/consent');
pass('build_203_launch_readiness_summary_records_successes_and_keeps_launch_pilot_gated');

// --- No secret values / phone numbers anywhere in Build 203 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(decision), JSON.stringify(template), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|send_attempt_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_203_artifact');

// --- Dry-run wrapper: local-only; never runs or arms any live send ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-real-customer-pilot-decision-build-203-readonly.js')) fail('wrapper must run the Build 203 verifier');
pass('build_203_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke any live runner or messages.create ---
const selfText = read('backend/scripts/verify-real-customer-pilot-decision-build-203-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
pass('build_203_verifier_is_read_only_does_not_send');

// --- Doc present and labeled with required markers ---
for (const needle of ['Build 203', DECISION, 'real-customer pilot', 'consent', 'go/no-go', 'unsigned',
  'fresh', 'no retry', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_203_decision_runbook_doc_present_and_labeled');

// --- Safety posture preserved (artifacts + pilot readiness helper) ---
for (const [label, obj] of [['decision', decision], ['template', template], ['summary', summary]]) {
  if (obj.safety_status !== 'demo_ready_with_live_automation_disabled') fail(label + ' safety_status must be demo_ready_with_live_automation_disabled');
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 203 records decision REAL_CUSTOMER_PILOT_REVIEW_REQUIRED and authorizes nothing.');
console.log('PASS: Real-customer pilot is NOT authorized now; homeowner contact is NOT authorized now.');
console.log('PASS: Narrow pilot scope, consent/onboarding checklist, go/no-go checklist, and UNSIGNED approval template captured.');
console.log('PASS: Summary records the three controlled-send successes; next step = real-customer pilot decision/consent, NOT unrestricted launch.');
console.log('PASS: Build 203 is local-only — no live action, no SMS, no Twilio, no retry, no real contact, no secrets/numbers, no automation.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); broader automation disabled; posture preserved.');
console.log('PASS: Build 203 verifier passed (' + passCount + ' assertions).');
