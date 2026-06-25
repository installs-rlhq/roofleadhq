#!/usr/bin/env node
/**
 * Build 220 Read-Only Verifier (2 of 3) — Jason-Owned M1/M2 Live-Validation Milestone.
 *
 * Read-only. Node built-ins + on-the-fly tsc compile of the native binding module so it can
 * INDEPENDENTLY prove the native workflow produces the exact M1 AND M2 bodies. No network, no
 * secret-value access, no credentials, no phone numbers, no email addresses, no destination values,
 * no production data, no SMS, no Twilio/provider call, no retry. Verifying is NOT a send.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const backendRoot = path.join(root, 'backend');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const milestonePath = `${FIXTURE_DIR}/jason-owned-m1-m2-live-validation-milestone-build-220.json`;
const m1CloseoutPath = `${FIXTURE_DIR}/m1-live-validation-closeout-evidence-build-219.json`;
const m2CloseoutPath = `${FIXTURE_DIR}/m2-live-validation-closeout-evidence-build-220.json`;
const priorPacketPath = `${FIXTURE_DIR}/jason-owned-integrated-workflow-build-217.json`;
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

console.log('== Build 220 Jason-Owned M1/M2 Live-Validation Milestone Verification (local-only, no send) ==');

const milestone = readJson(milestonePath);
const m1Closeout = readJson(m1CloseoutPath);
const m2Closeout = readJson(m2CloseoutPath);
const priorPacket = readJson(priorPacketPath);
const doc = read(docPath);

// Independent native-module execution — proves exact M1 AND M2 are produced by native workflow logic.
function loadNativeBinding() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b220-milestone-native');
  fs.mkdirSync(outDir, { recursive: true });
  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [path.join(backendRoot, 'src/services/roofer-alert-binding.service.ts'), '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck', '--outDir', outDir],
    { stdio: 'inherit' }
  );
  return require(path.join(outDir, 'roofer-alert-binding.service.js'));
}
const binding = loadNativeBinding();
const m1Bind = binding.bindRooferAlert('new_roof_inspection_lead_alert');
const m2Bind = binding.bindRooferAlert('missed_or_slow_lead_follow_up_nudge');
if (!m1Bind.ok || m1Bind.boundBody !== EXACT_M1 || m1Bind.messageId !== 'M1') fail('native M1 binding must equal exact approved M1');
if (!m2Bind.ok || m2Bind.boundBody !== EXACT_M2 || m2Bind.messageId !== 'M2') fail('native M2 binding must equal exact approved M2');
pass('build_220_native_workflow_produces_exact_m1_and_exact_m2_live_proven_binding');

// Milestone artifact.
if (milestone.build !== 220) fail('milestone build must be 220');
if (milestone.source_of_truth_commit !== '8d92939' || milestone.verified_build_218_commit !== '21b840b' || milestone.verified_build_219_commit !== '2fe42d3') fail('milestone must bind to 8d92939 + 21b840b + 2fe42d3');

const b217 = milestone.build_217_local_validation || {};
if (b217.validated_scenario_count !== 5 || b217.five_native_workflow_scenarios_validated_locally !== true || b217.m1_exact_binding_proven_locally !== true || b217.m2_exact_binding_proven_locally !== true) fail('milestone must record Build 217 five-scenario local validation with M1+M2 binding');

const m1 = milestone.m1_live_validation || {};
for (const [k, v] of Object.entries({ scenario_key: 'new_roof_inspection_lead_alert', message_id: 'M1', native_workflow_path_validated_live: true, exact_signed_m1_body_sent: true, sms_sent: true, recipient_confirmed_sms_received: true, recipient_confirmed_actual_text_matches_m1: true, recipient_confirmed_wrong_or_generic_copy_received: false, one_attempt_only: true, retry_performed: false, m1_approval_consumed: true, m1_approval_expired: true, m1_approval_permanently_consumed_and_never_reusable: true })) {
  if (m1[k] !== v) fail('milestone m1_live_validation ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(m1[k]) + ')');
}
const m2 = milestone.m2_live_validation || {};
for (const [k, v] of Object.entries({ scenario_key: 'missed_or_slow_lead_follow_up_nudge', message_id: 'M2', native_workflow_path_validated_live: true, exact_signed_m2_body_sent: true, sms_sent: true, recipient_confirmed_sms_received: true, recipient_confirmed_actual_text_matches_m2: true, recipient_confirmed_wrong_or_generic_copy_received: false, one_attempt_only: true, retry_performed: false, m2_approval_consumed: true, m2_approval_expired: true, m2_approval_permanently_consumed_and_never_reusable: true })) {
  if (m2[k] !== v) fail('milestone m2_live_validation ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(m2[k]) + ')');
}
const proven = milestone.native_workflow_message_binding_proven_live || {};
if (proven.new_roof_inspection_lead_alert_m1 !== true || proven.missed_or_slow_lead_follow_up_nudge_m2 !== true || proven.both_m1_and_m2_live_exact_copy_validations_complete !== true) fail('milestone must record both M1 and M2 binding proven live');
pass('build_220_milestone_records_m1_and_m2_live_exact_copy_validation_complete_and_consumed');

// Remaining scenarios locally validated only.
const rem = milestone.remaining_scenarios_locally_validated_only || {};
for (const k of ['daily_open_lead_recap', 'lead_source_routing_flag', 'homeowner_consent_boundary_reminder']) { if (rem[k] !== true) fail('milestone remaining_scenarios_locally_validated_only ' + k + ' must be true'); }

// Lindy + authorization boundaries.
const lindy = milestone.lindy_status || {};
if (lindy.lindy_safe_for_pilot_mode !== true || lindy.lindy_owns_product_workflow !== false || lindy.lindy_live_enabled !== false) fail('milestone must record Lindy safe pilot mode, not owning workflow, not live');
const auth = milestone.authorization_boundaries || {};
for (const [k, v] of Object.entries({ authorizes_send_now: false, homeowner_contact_authorized: false, real_roofer_contact_authorized: false, unrestricted_launch: false, live_automation_remains_disabled: true })) {
  if (auth[k] !== v) fail('milestone authorization_boundaries ' + k + ' must be ' + JSON.stringify(v));
}
const msa = milestone.milestone_safety_attestations || {};
for (const k of ['sms_sent_during_build_220', 'twilio_called_during_build_220', 'credentials_loaded_or_inspected_during_build_220', 'destination_value_recorded', 'phone_number_recorded', 'email_address_recorded', 'raw_sid_recorded', 'secret_values_recorded', 'network_or_external_call_made_during_build_220', 'production_data_used']) { if (msa[k] !== false) fail('milestone safety attestation must be false: ' + k); }
if (msa.other_live_automation_remains_disabled !== true) fail('milestone other_live_automation_remains_disabled must be true');
if (milestone.decision !== 'JASON_OWNED_M1_M2_LIVE_VALIDATION_COMPLETE') fail('milestone decision mismatch');
if (milestone.recommended_next_option !== 'prepare_sales_demo_surface_and_recruit_real_roofer_pilots') fail('milestone recommended_next_option mismatch');
pass('build_220_milestone_lindy_safe_boundaries_enforced_and_decision_correct');

// Cross-consistency with the two closeouts and the Build 217 foundation.
if ((m1Closeout.m1_authorized_live_attempt || {}).sms_sent !== true || (m2Closeout.m2_authorized_live_attempt || {}).sms_sent !== true) fail('both M1 and M2 closeouts must record sms_sent=true');
if ((m1Closeout.m1_permanent_consumption || m1Closeout.m1_authorized_live_attempt || {}).approval_consumed !== true && (m1Closeout.m1_authorized_live_attempt || {}).approval_consumed !== true) fail('M1 closeout must record approval consumed');
if ((m2Closeout.m2_permanent_consumption || {}).m2_approval_consumed !== true) fail('M2 closeout must record approval consumed');
if (priorPacket.build !== 217 || (priorPacket.next_decision_packet || {}).decision !== 'JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_AVAILABLE') fail('Build 217 foundation must be preserved unchanged');
pass('build_220_milestone_consistent_with_m1_m2_closeouts_and_build_217_foundation');

// Secret / phone / email / raw-SID scan over milestone + doc.
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(milestone), doc].join('\n');
for (const needle of secretLikePatterns) { if (dataArtifactText.includes(needle)) fail('possible secret value pattern found: ' + needle); }
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(dataArtifactText)) fail('an email-address-shaped value appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|validated_scenario_count|removed_trigger_count|remaining_auto_customer_contact_paths|remaining_auto_roofer_contact_paths|remaining_auto_homeowner_contact_paths)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('build_220_no_secret_values_phone_numbers_email_addresses_or_raw_sids_in_milestone');

// Doc markers + safety posture.
for (const needle of ['Build 220', 'JASON_OWNED_M1_M2_LIVE_VALIDATION_COMPLETE_SALES_DEMO_PACKET_READY', '8d92939', '2fe42d3', 'no send', 'pilot-gated', 'demo_ready_with_live_automation_disabled']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
for (const [k, v] of Object.entries(status.live_automation)) { if (v !== false) fail('pilot readiness live_automation must be false: ' + k); }
pass('build_220_milestone_doc_present_and_demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Build 220 records the Jason-owned live SMS validation milestone: Build 217 validated five native');
console.log('      workflow scenarios locally; M1 and M2 are each live-validated with exact-copy match and permanently');
console.log('      consumed; both native workflow SMS bindings are proven live; Lindy is in safe pilot mode; no homeowner');
console.log('      or real-roofer contact authorized; unrestricted launch remains false.');
console.log('PASS: Build 220 Jason-owned M1/M2 milestone verifier passed (' + passCount + ' assertions).');
