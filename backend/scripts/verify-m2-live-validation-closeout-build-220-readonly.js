#!/usr/bin/env node
/**
 * Build 220 Read-Only Verifier (1 of 3) — M2 Live-Validation Closeout.
 *
 * Read-only. Node built-ins + on-the-fly tsc compile of the native binding module so it can
 * INDEPENDENTLY exercise the native M2 production and the runner's fail-closed guard, and PROVE that
 * the single-use M2 approval is now permanently consumed/expired. No network, no secret-value access,
 * no credentials, no phone numbers, no email addresses, no destination values, no production data, no
 * SMS, no Twilio/provider call, no retry. Does NOT construct a provider client; does NOT call
 * messages.create; does NOT arm a confirm token. Verifying is NOT a send.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');
const runner = require('./run-native-workflow-fixture-m2-guarded-live-validation-execution-build-219.js');

const root = path.resolve(__dirname, '../..');
const backendRoot = path.join(root, 'backend');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const closeoutPath = `${FIXTURE_DIR}/m2-live-validation-closeout-evidence-build-220.json`;
const approvalPath = `${FIXTURE_DIR}/m2-live-validation-signed-approval-build-219.json`;
const m1CloseoutPath = `${FIXTURE_DIR}/m1-live-validation-closeout-evidence-build-219.json`;
const m1ApprovalPath = `${FIXTURE_DIR}/m1-live-validation-signed-approval-build-218.json`;
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_M2_LIVE_VALIDATION_CLOSEOUT_AND_SALES_DEMO_BUILD_220.md';

const EXACT_M1 =
  "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out.";
const EXACT_M2 =
  'RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.';

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

console.log('== Build 220 M2 Live-Validation Closeout Verification (local-only, no send) ==');

const closeout = readJson(closeoutPath);
const approval = readJson(approvalPath);
const m1Closeout = readJson(m1CloseoutPath);
const m1Approval = readJson(m1ApprovalPath);
const doc = read(docPath);

// -------------------------------------------------------------------------------------------------
// Independent native-module execution — proves the M2 body is produced by native workflow logic.
// -------------------------------------------------------------------------------------------------
function loadNativeBinding() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b220-verify-native');
  fs.mkdirSync(outDir, { recursive: true });
  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [path.join(backendRoot, 'src/services/roofer-alert-binding.service.ts'), '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck', '--outDir', outDir],
    { stdio: 'inherit' }
  );
  return require(path.join(outDir, 'roofer-alert-binding.service.js'));
}
const binding = loadNativeBinding();
const m2Bind = binding.bindRooferAlert('missed_or_slow_lead_follow_up_nudge');
if (!m2Bind.ok || m2Bind.boundBody !== EXACT_M2 || m2Bind.messageId !== 'M2') fail('native M2 binding must equal exact approved M2');
if (binding.bindRooferAlert('missed_or_slow_lead_follow_up_nudge', { requestedBody: EXACT_M1 }).ok !== false) fail('native binding must fail closed on substituted M1 copy');
if (binding.bindRooferAlert('missed_or_slow_lead_follow_up_nudge', { requestedBody: '' }).ok !== false) fail('native binding must fail closed on empty copy');
pass('build_220_native_workflow_produces_exact_m2_and_fails_closed_on_substituted_m1_and_empty');

const produced = runner.produceM2BodyViaNativeWorkflow();
if (!produced.ok || produced.body !== EXACT_M2) fail('runner native production helper must produce exact M2');
if (runner.assertProducedBodyMatchesSignedM2(produced.body, EXACT_M2).length !== 0) fail('runner binding guard must accept exact native M2');
if (runner.assertProducedBodyMatchesSignedM2(EXACT_M1, EXACT_M2).length === 0) fail('runner binding guard must reject M1 substituted for M2');
pass('build_220_runner_native_production_and_binding_guard_consistent');

// -------------------------------------------------------------------------------------------------
// M2 CLOSEOUT EVIDENCE artifact.
// -------------------------------------------------------------------------------------------------
if (closeout.build !== 220) fail('closeout build must be 220');
if (closeout.source_of_truth_commit !== '8d92939' || closeout.verified_build_218_commit !== '21b840b' || closeout.verified_build_219_commit !== '2fe42d3') fail('closeout must bind to 8d92939 + 21b840b + 2fe42d3');

const attempt = closeout.m2_authorized_live_attempt || {};
const requiredAttempt = {
  send_attempt_count: 1,
  retry_performed: false,
  sms_sent: true,
  approval_consumed: true,
  approval_expired: true,
  send_exit_status: 0,
  one_attempt_only: true,
  native_m2_message_binding_validated_live: true,
  exact_signed_m2_body_sent: true,
  m1_or_generic_or_substituted_or_wrong_scenario_copy_sent: false,
  empty_copy_sent: false
};
for (const [k, v] of Object.entries(requiredAttempt)) { if (attempt[k] !== v) fail('closeout m2_authorized_live_attempt ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(attempt[k]) + ')'); }

const rc = closeout.recipient_confirmation || {};
const requiredRc = {
  recipient_confirmed_sms_received: true,
  recipient_confirmed_actual_text_matches_m2: true,
  recipient_confirmed_wrong_or_generic_copy_received: false,
  received_text_matches_signed_m2_exactly: true,
  received_text_recorded_verbatim_in_evidence: false
};
for (const [k, v] of Object.entries(requiredRc)) { if (rc[k] !== v) fail('closeout recipient_confirmation ' + k + ' must be ' + JSON.stringify(v)); }

const env = closeout.post_attempt_environment_clearing || {};
for (const k of ['twilio_live_account_sid_cleared', 'twilio_live_auth_token_cleared', 'twilio_live_from_number_cleared', 'm2_live_validation_to_number_cleared', 'm2_live_validation_confirm_cleared', 'raw_number_cleared', 'clean_number_cleared', 'all_live_env_values_cleared_after_attempt']) { if (env[k] !== true) fail('closeout env clearing ' + k + ' must be true'); }

const perm = closeout.m2_permanent_consumption || {};
for (const k of ['m2_approval_consumed', 'm2_approval_expired', 'm2_approval_single_use', 'm2_approval_permanently_consumed_and_never_reusable', 'm2_cannot_be_reauthorized_by_any_later_packet', 'm2_approval_never_authorized_m1']) { if (perm[k] !== true) fail('closeout m2_permanent_consumption ' + k + ' must be true'); }

const m1perm = closeout.m1_remains_permanently_consumed || {};
for (const k of ['m1_approval_consumed', 'm1_approval_expired', 'm1_approval_permanently_consumed_and_never_reusable', 'm1_cannot_be_reauthorized_by_any_later_packet']) { if (m1perm[k] !== true) fail('closeout m1_remains_permanently_consumed ' + k + ' must be true'); }

const csa = closeout.closeout_safety_attestations || {};
for (const k of ['sms_sent_during_build_220', 'twilio_called_during_build_220', 'twilio_client_constructed_during_build_220', 'messages_create_called_during_build_220', 'credentials_loaded_or_inspected_during_build_220', 'destination_value_recorded', 'phone_number_recorded', 'email_address_recorded', 'raw_sid_recorded', 'secret_values_recorded', 'network_or_external_call_made_during_build_220', 'retry_performed', 'homeowner_contacted', 'real_roofer_contacted', 'production_data_used', 'unrestricted_launch']) { if (csa[k] !== false) fail('closeout safety attestation must be false: ' + k); }
if (csa.other_live_automation_remains_disabled !== true) fail('closeout other_live_automation_remains_disabled must be true');
if (closeout.decision !== 'M2_LIVE_VALIDATION_CONFIRMED_CLOSED_OUT_APPROVAL_PERMANENTLY_CONSUMED') fail('closeout decision mismatch');
pass('build_220_m2_closeout_evidence_truthful_one_attempt_recipient_match_consumed_env_cleared_sanitized');

// -------------------------------------------------------------------------------------------------
// On-disk M2 approval is now PERMANENTLY consumed/expired (preserved authorized-runner mutation).
// -------------------------------------------------------------------------------------------------
const a = approval.signed_m2_approval || {};
if (a.approval_consumed !== true || a.approval_expired !== true) fail('on-disk Build 219 M2 approval must now be consumed AND expired');
if (a.approval_single_use !== true) fail('M2 approval must remain single-use');
if ((approval.next_decision_packet || {}).m2_approval_consumed !== true) fail('on-disk M2 approval next_decision_packet.m2_approval_consumed must be true');
// The runner approval guard must now REJECT the permanently consumed approval (no reuse possible).
const consumedReasons = runner.assertSignedApprovalValid(approval);
if (!consumedReasons.includes('approval_already_consumed') || !consumedReasons.includes('approval_already_expired')) fail('runner approval guard must now REJECT the permanently consumed M2 approval (reasons: ' + consumedReasons.join(', ') + ')');
pass('build_220_m2_approval_on_disk_permanently_consumed_and_runner_guard_now_rejects_it');

// -------------------------------------------------------------------------------------------------
// M1 remains permanently consumed (prior chain truth preserved) and its closeout is intact.
// -------------------------------------------------------------------------------------------------
const m1a = m1Approval.signed_m1_approval || {};
if (m1a.approval_consumed !== true || m1a.approval_expired !== true) fail('Build 218 M1 approval must remain consumed and expired');
if (runner.assertM1RemainsConsumed(m1Approval).length !== 0) fail('runner M1-consumption guard must accept the consumed Build 218 M1 approval');
if (m1Closeout.build !== 219 || m1Closeout.decision !== 'M1_LIVE_VALIDATION_CONFIRMED_CLOSED_OUT_APPROVAL_PERMANENTLY_CONSUMED') fail('Build 219 M1 closeout must remain intact');
if ((m1Closeout.m1_authorized_live_attempt || {}).sms_sent !== true) fail('Build 219 M1 closeout must still record sms_sent=true');
pass('build_220_m1_remains_permanently_consumed_and_m1_closeout_preserved');

// -------------------------------------------------------------------------------------------------
// Secret / phone / email / raw-SID scan over the closeout artifact + doc.
// -------------------------------------------------------------------------------------------------
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(closeout), doc].join('\n');
for (const needle of secretLikePatterns) { if (dataArtifactText.includes(needle)) fail('possible secret value pattern found: ' + needle); }
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(dataArtifactText)) fail('an email-address-shaped value appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|send_attempt_count|send_exit_status|exit_status|removed_trigger_count|remaining_auto_customer_contact_paths|remaining_auto_roofer_contact_paths|remaining_auto_homeowner_contact_paths|validated_scenario_count)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('build_220_no_secret_values_phone_numbers_email_addresses_or_raw_sids_in_m2_closeout');

// -------------------------------------------------------------------------------------------------
// Verifier self-read-only + safety posture preserved.
// -------------------------------------------------------------------------------------------------
const messagesCreateCall = 'messages' + '.create' + '(';
const selfText = read('backend/scripts/verify-m2-live-validation-closeout-build-220-readonly.js');
const selfSendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (selfSendLines.length > 0) fail('verifier must not call messages.create');

const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
for (const [k, v] of Object.entries(status.live_automation)) { if (v !== false) fail('pilot readiness live_automation must be false: ' + k); }
pass('build_220_verifier_read_only_and_demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Build 220 truthfully closes out the M2 live validation (native workflow path validated live, exact');
console.log('      signed M2 body sent, ONE attempt, recipient confirmed receipt + exact copy match, no retry, approval');
console.log('      consumed/expired permanently, env values cleared). M1 remains permanently consumed. No send/Twilio/');
console.log('      client/credential/destination/network action. demo_ready_with_live_automation_disabled preserved.');
console.log('PASS: Build 220 M2 closeout verifier passed (' + passCount + ' assertions).');
