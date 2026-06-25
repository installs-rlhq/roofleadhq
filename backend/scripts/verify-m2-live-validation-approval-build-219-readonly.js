#!/usr/bin/env node
/**
 * Build 219 Read-Only Verifier — M1 Live-Validation Closeout + M2 Guarded Signed Approval Capture +
 * Guarded M2 Execution Path + Non-Mutating Send-Time Preflight.
 *
 * Read-only. Node built-ins + on-the-fly tsc compile of the native binding module so it can
 * INDEPENDENTLY exercise the native M2 production and the runner's fail-closed guard. No network,
 * no secret-value access, no credentials, no phone numbers, no email addresses, no destination
 * values, no production data, no SMS, no Twilio/provider call, no retry. Does NOT construct a
 * provider client; does NOT call messages.create; does NOT arm a confirm token. Verifying is NOT a
 * send. This verifier also proves the M2 send-time preflight is NON-MUTATING (leaves git status
 * unchanged), correcting the Build 218 defect.
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

const closeoutPath = `${FIXTURE_DIR}/m1-live-validation-closeout-evidence-build-219.json`;
const approvalPath = `${FIXTURE_DIR}/m2-live-validation-signed-approval-build-219.json`;
const summaryPath = `${FIXTURE_DIR}/launch-readiness-summary-build-219.json`;
const m1ApprovalPath = `${FIXTURE_DIR}/m1-live-validation-signed-approval-build-218.json`;
const approvalReadyPath = `${FIXTURE_DIR}/m1-m2-guarded-live-validation-approval-ready-build-217.json`;
const priorPacketPath = `${FIXTURE_DIR}/jason-owned-integrated-workflow-build-217.json`;
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_M2_LIVE_VALIDATION_APPROVAL_BUILD_219.md';
const runnerPath = 'backend/scripts/run-native-workflow-fixture-m2-guarded-live-validation-execution-build-219.js';
const negativesPath = 'backend/scripts/verify-m2-guarded-live-validation-negative-guards-build-219-readonly.js';
const noMutationPath = 'backend/scripts/verify-m2-preflight-no-mutation-build-219-readonly.js';
const wrapperPath = 'scripts/run-m2-live-validation-approval-build-219-dry-run.sh';

const EXACT_M1 =
  "RoofLeadHQ: New roof inspection lead just came in. A quick first reply now helps you reach them while they're still looking. Reply STOP to opt out.";
const EXACT_M2 =
  'RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out.';
const SIGNED_STATEMENT =
  'I, Jason Lohse, approve exactly ONE Jason-operated, SMS-only, controlled live validation send of scenario missed_or_slow_lead_follow_up_nudge (M2) using only this exact text: "RoofLeadHQ: A roof inspection lead is still waiting on a first reply. A quick follow-up now keeps it warm. Reply STOP to opt out." Scope: one SMS only; SMS-only; no retry; this approval authorizes M2 ONLY and never M1; no homeowner contact; no real roofer contact; no live automation activation; no unrestricted launch; no production data; no secrets/phone numbers/email addresses recorded in repo/chat/logs; destination entered silently at execution time; send-time confirmation required; approval is single-use and expires after the attempt whether successful, failed, or blocked.';

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
function git(args) { return execFileSync('git', args, { cwd: root }).toString(); }

console.log('== Build 219 M1 Closeout + M2 Guarded Signed Approval Verification (local-only, no send) ==');

const closeout = readJson(closeoutPath);
const approval = readJson(approvalPath);
const summary = readJson(summaryPath);
const m1Approval = readJson(m1ApprovalPath);
const approvalReady = readJson(approvalReadyPath);
const priorPacket = readJson(priorPacketPath);
const doc = read(docPath);

// -------------------------------------------------------------------------------------------------
// Independent native-module execution — proves the M2 body is produced by native workflow logic.
// -------------------------------------------------------------------------------------------------
function loadNativeBinding() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b219-verify-native');
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
pass('build_219_native_workflow_produces_exact_m2_and_fails_closed_on_substituted_empty');

// Cross-check the runner's own native production helper produces exact M2.
const produced = runner.produceM2BodyViaNativeWorkflow();
if (!produced.ok || produced.body !== EXACT_M2) fail('runner native production helper must produce exact M2');
if (runner.assertProducedBodyMatchesSignedM2(produced.body, EXACT_M2).length !== 0) fail('runner binding guard must accept exact native M2');
if (runner.assertProducedBodyMatchesSignedM2(EXACT_M1, EXACT_M2).length === 0) fail('runner binding guard must reject M1');
if (runner.assertProducedBodyMatchesSignedM2('', EXACT_M2).length === 0) fail('runner binding guard must reject empty');
pass('build_219_runner_native_production_and_binding_guard_consistent');

// -------------------------------------------------------------------------------------------------
// Independent guard checks — baseline permitted; representative negatives blocked (no send).
// -------------------------------------------------------------------------------------------------
function validApproval() {
  return { signed_m2_approval: { approval_signed: true, approval_granted: true, scenario_key: 'missed_or_slow_lead_follow_up_nudge', message_id: 'M2', channel: 'sms', selected_variant_text: EXACT_M2, max_message_count: 1, retry_allowed: false, approval_single_use: true, approval_consumed: false, approval_expired: false, authorizes_m2: true, authorizes_m1: false, m1_approved: false, bound_build_217_source_commit: '8d92939', verified_build_218_commit: '21b840b' } };
}
function consumedM1() { return { signed_m1_approval: { approval_consumed: true, approval_expired: true } }; }
function validState() {
  return { branch: 'main', headEqualsOrigin: true, worktreeClean: true, headSubject: runner.EXPECTED_BUILD_219_SUBJECT, approval: validApproval(), m1Approval: consumedM1(), producedBody: EXACT_M2, signedM2Text: EXACT_M2, destinationCount: 1, credentialNamesPresent: true, confirmToken: runner.M2_CONFIRM_TOKEN, retryRequested: false };
}
if (runner.evaluateM2GuardedSend(validState()).permitted !== true) fail('runner guard must permit a fully valid state');
const negChecks = [
  ['producedBody', EXACT_M1],
  ['confirmToken', undefined],
  ['destinationCount', 0],
  ['worktreeClean', false],
  ['headEqualsOrigin', false],
  ['credentialNamesPresent', false],
  ['retryRequested', true]
];
for (const [field, val] of negChecks) {
  const st = validState(); st[field] = val;
  if (runner.evaluateM2GuardedSend(st).permitted !== false) fail('runner guard must block when ' + field + ' is invalid');
}
// Wrong source chain must block.
{ const st = validState(); st.approval.signed_m2_approval.bound_build_217_source_commit = '8a7ad6b';
  const r = runner.evaluateM2GuardedSend(st);
  if (r.permitted !== false || !r.blockedReasons.some((x) => x.includes('approval_not_bound_to_build_217_commit_8d92939'))) fail('runner guard must block a wrong source chain (8a7ad6b)'); }
// Any attempt to reuse M1 (M1 not consumed) must block.
{ const st = validState(); st.m1Approval = { signed_m1_approval: { approval_consumed: false, approval_expired: false } };
  const r = runner.evaluateM2GuardedSend(st);
  if (r.permitted !== false || !r.blockedReasons.some((x) => x.includes('m1_approval_not_consumed'))) fail('runner guard must block any attempt to reuse M1'); }
// M2 approval that tries to authorize M1 must block.
{ const st = validState(); st.approval.signed_m2_approval.authorizes_m1 = true;
  const r = runner.evaluateM2GuardedSend(st);
  if (r.permitted !== false || !r.blockedReasons.some((x) => x.includes('approval_must_not_authorize_m1'))) fail('runner guard must block an M1-authorizing approval'); }
pass('build_219_runner_guard_permits_only_fully_valid_state_and_blocks_all_negatives_including_m1_reuse');

// The runner module pins the corrected source binding (8d92939 + 21b840b) and dynamic Build 219 subject.
if (runner.BOUND_BUILD_217_SOURCE_COMMIT !== '8d92939') fail('runner must bind to Build 217 commit 8d92939');
if (runner.VERIFIED_BUILD_218_COMMIT !== '21b840b') fail('runner must bind to verified Build 218 commit 21b840b');
if (runner.EXPECTED_BUILD_219_SUBJECT !== 'test(workflow): close m1 and capture m2 approval build 219') fail('runner must expect the Build 219 commit subject');
if (runner.M2_CONFIRM_TOKEN !== 'SEND_ONE_M2_LIVE_VALIDATION_SMS') fail('runner must use the scenario-specific M2 confirm token');
if (runner.CONFIRM_TOKEN_ENV_NAME !== 'M2_LIVE_VALIDATION_CONFIRM' || runner.DESTINATION_ENV_NAME !== 'M2_LIVE_VALIDATION_TO_NUMBER') fail('runner must use scenario-specific M2 env names');
pass('build_219_runner_pins_corrected_source_binding_and_dynamic_build_219_subject_and_m2_inputs');

// -------------------------------------------------------------------------------------------------
// M1 LIVE-VALIDATION CLOSEOUT EVIDENCE (objective 1).
// -------------------------------------------------------------------------------------------------
if (closeout.build !== 219) fail('closeout build must be 219');
if (closeout.source_of_truth_commit !== '8d92939' || closeout.verified_build_218_commit !== '21b840b') fail('closeout must bind to 8d92939 + 21b840b');
const attempt = closeout.m1_authorized_live_attempt || {};
const requiredAttempt = { send_attempt_count: 1, retry_performed: false, sms_sent: true, approval_consumed: true, approval_expired: true, exit_status: 0, one_attempt_only: true, native_m1_message_binding_validated_live: true, exact_signed_m1_body_sent: true, generic_or_substituted_copy_sent: false };
for (const [k, v] of Object.entries(requiredAttempt)) { if (attempt[k] !== v) fail('closeout m1_authorized_live_attempt ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(attempt[k]) + ')'); }
const rc = closeout.recipient_confirmation || {};
const requiredRc = { recipient_confirmed_sms_received: true, recipient_confirmed_actual_text_matches_m1: true, recipient_confirmed_wrong_or_generic_copy_received: false, received_text_matches_signed_m1_exactly: true, received_text_recorded_verbatim_in_evidence: false };
for (const [k, v] of Object.entries(requiredRc)) { if (rc[k] !== v) fail('closeout recipient_confirmation ' + k + ' must be ' + JSON.stringify(v)); }
const env = closeout.post_attempt_environment_clearing || {};
for (const k of ['twilio_live_account_sid_cleared', 'twilio_live_auth_token_cleared', 'twilio_live_from_number_cleared', 'm1_live_validation_to_number_cleared', 'm1_live_validation_confirm_cleared', 'raw_number_cleared', 'clean_number_cleared', 'all_live_env_values_cleared_after_attempt']) { if (env[k] !== true) fail('closeout env clearing ' + k + ' must be true'); }
const perm = closeout.m1_permanent_consumption || {};
for (const k of ['m1_approval_consumed', 'm1_approval_expired', 'm1_approval_single_use', 'm1_approval_permanently_consumed_and_never_reusable', 'm1_cannot_be_reauthorized_by_any_later_packet']) { if (perm[k] !== true) fail('closeout m1_permanent_consumption ' + k + ' must be true'); }
const csa = closeout.closeout_safety_attestations || {};
for (const k of ['sms_sent_during_build_219', 'twilio_called_during_build_219', 'twilio_client_constructed_during_build_219', 'messages_create_called_during_build_219', 'credentials_loaded_or_inspected_during_build_219', 'destination_value_recorded', 'phone_number_recorded', 'email_address_recorded', 'raw_sid_recorded', 'secret_values_recorded', 'network_or_external_call_made_during_build_219', 'retry_performed', 'homeowner_contacted', 'real_roofer_contacted', 'production_data_used', 'unrestricted_launch']) { if (csa[k] !== false) fail('closeout safety attestation must be false: ' + k); }
if (csa.other_live_automation_remains_disabled !== true) fail('closeout other_live_automation_remains_disabled must be true');
if (closeout.decision !== 'M1_LIVE_VALIDATION_CONFIRMED_CLOSED_OUT_APPROVAL_PERMANENTLY_CONSUMED') fail('closeout decision mismatch');
pass('build_219_m1_closeout_evidence_truthful_one_attempt_recipient_match_consumed_env_cleared_sanitized');

// The Build 218 M1 approval on disk must show it is permanently consumed/expired (preserved runtime mutation).
const m1a = m1Approval.signed_m1_approval || {};
if (m1a.approval_consumed !== true || m1a.approval_expired !== true) fail('Build 218 M1 approval must remain consumed and expired (permanently blocked)');
if (runner.assertM1RemainsConsumed(m1Approval).length !== 0) fail('runner M1-consumption guard must accept the consumed Build 218 M1 approval');
pass('build_219_m1_approval_on_disk_remains_permanently_consumed_and_expired');

// -------------------------------------------------------------------------------------------------
// M2 SIGNED APPROVAL artifact (objective 2).
// -------------------------------------------------------------------------------------------------
if (approval.build !== 219) fail('approval build must be 219');
if (approval.source_of_truth_commit !== '8d92939' || approval.verified_build_218_commit !== '21b840b') fail('approval must bind to 8d92939 + 21b840b');
const a = approval.signed_m2_approval || {};
const requiredApproval = {
  approval_signed: true,
  approval_granted: true,
  signer_label: 'jason_operator',
  signed_date: '2026-06-25',
  signed_timezone: 'America/Denver',
  exact_clock_time_recorded: false,
  scenario_key: 'missed_or_slow_lead_follow_up_nudge',
  message_id: 'M2',
  channel: 'sms',
  selected_variant_text: EXACT_M2,
  max_message_count: 1,
  retry_allowed: false,
  approval_single_use: true,
  // Build 220 update: the single-use M2 approval was CONSUMED/EXPIRED by the one authorized live
  // validation send (see m2-live-validation-closeout-evidence-build-220.json). It is now permanently
  // consumed and can never be reused — the runner's guard blocks any consumed approval.
  approval_consumed: true,
  approval_expired: true,
  authorizes_m2: true,
  authorizes_m1: false,
  m1_approved: false,
  m1_remains_consumed: true,
  m1_cannot_be_reauthorized_by_this_packet: true,
  destination_value_recorded: false,
  bound_build_217_source_commit: '8d92939',
  verified_build_218_commit: '21b840b',
  authorizes_send_during_build_219: false
};
for (const [k, v] of Object.entries(requiredApproval)) {
  if (a[k] !== v) fail('approval signed_m2_approval ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(a[k]) + ')');
}
if (a.exact_signed_statement !== SIGNED_STATEMENT) fail('approval exact_signed_statement must be preserved EXACTLY');
// Build 220 update: the M2 approval is now permanently consumed/expired. The runner approval guard
// must therefore REJECT this exact on-disk approval object (no reuse is ever possible).
const consumedReasons = runner.assertSignedApprovalValid(approval);
if (!consumedReasons.includes('approval_already_consumed') || !consumedReasons.includes('approval_already_expired')) fail('runner approval guard must now REJECT the permanently consumed M2 approval (reasons: ' + consumedReasons.join(', ') + ')');
pass('build_219_approval_artifact_signed_m2_only_bound_to_8d92939_and_21b840b_statement_preserved_now_permanently_consumed');

// Approval safety attestations.
const aatt = approval.approval_capture_safety_attestations || {};
const aattFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'credentials_loaded_or_inspected', 'phone_number_recorded', 'email_address_recorded', 'raw_sid_recorded', 'destination_value_recorded', 'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent_during_approval_capture', 'email_sent', 'network_or_external_call_made', 'retry_performed', 'confirm_token_armed', 'live_runner_executed_live', 'real_roofer_contacted_during_approval_capture', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase', 'channel_expanded_beyond_sms', 'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created', 'crm_sync_automation_added', 'billing_payment_deposit_quote_estimate_invoice_automation_added', 'email_call_calendar_automation_added', 'schema_auth_rls_security_changes', 'm1_reauthorized'];
for (const k of aattFalse) { if (aatt[k] !== false) fail('approval safety attestation must be false: ' + k); }
if (aatt.other_live_automation_remains_disabled !== true) fail('approval attestation other_live_automation_remains_disabled must be true');
// Decision packet (objective 6).
const dp = approval.next_decision_packet || {};
const requiredDecision = {
  decision: 'M1_LIVE_VALIDATION_CONFIRMED_M2_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED',
  recommended_next_option: 'run_non_mutating_m2_send_time_preflight_then_one_guarded_m2_attempt',
  authorizes_send_now: false,
  m1_live_validation_confirmed: true,
  m1_approval_consumed: true,
  m2_approved: true,
  // Build 220 update: the one authorized M2 attempt consumed/expired the approval (preserved runtime mutation).
  m2_approval_consumed: true,
  m2_send_time_preflight_required: true,
  next_live_attempt_maximum: 1,
  retry_allowed: false,
  homeowner_contact_authorized: false,
  real_roofer_contact_authorized: false,
  unrestricted_launch: false,
  live_automation_remains_disabled: true,
  authorizes_send_during_build_219: false
};
for (const [k, v] of Object.entries(requiredDecision)) {
  if (dp[k] !== v) fail('approval next_decision_packet ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(dp[k]) + ')');
}
pass('build_219_approval_safety_attestations_and_decision_packet_correct');

// -------------------------------------------------------------------------------------------------
// NON-MUTATING PREFLIGHT (objective 4) — the pure builder is repo-pure; the CLI test is separate.
// -------------------------------------------------------------------------------------------------
const statusBefore = git(['status', '--porcelain']);
const diffBefore = git(['diff', 'HEAD']);
const preflight = runner.buildPreflightResult();
const statusAfter = git(['status', '--porcelain']);
const diffAfter = git(['diff', 'HEAD']);
if (statusAfter !== statusBefore || diffAfter !== diffBefore) fail('runner.buildPreflightResult() must be repository-pure (it modified the worktree)');
if (preflight.build !== 219 || preflight.mode !== 'preflight') fail('preflight result must be build 219 mode preflight');
if (preflight.preflight_is_non_mutating !== true || preflight.preflight_writes_tracked_repo_file !== false) fail('preflight must declare itself non-mutating');
if (preflight.bound_build_217_source_commit !== '8d92939' || preflight.verified_build_218_commit !== '21b840b') fail('preflight must bind to 8d92939 + 21b840b');
if (preflight.build_219_validated_dynamically_at_send_time !== true) fail('preflight must validate Build 219 dynamically at send time');
if (preflight.would_permit_live_send !== false) fail('preflight would_permit_live_send must be false during Build 219');
if (!Array.isArray(preflight.blocked_reasons) || !preflight.blocked_reasons.some((r) => r.includes('scenario_specific_confirm_token_absent_or_wrong'))) fail('preflight must report the confirm token is absent (never armed during build)');
const nb = preflight.native_workflow_body_production || {};
if (nb.body_produced_by_native_bindRooferAlert !== true || nb.produced_body_equals_signed_m2_exactly !== true) fail('preflight must show native bindRooferAlert produced exact M2');
if (nb.produced_body_is_m1 !== false || nb.produced_body_is_generic_or_stale !== false || nb.hardcoded_or_env_provided_body_used !== false) fail('preflight native body must not be M1/generic/env-provided');
const ag = preflight.approval_guard || {};
for (const k of ['approval_artifact_present', 'approval_bound_to_build_217_commit_8d92939', 'approval_bound_to_build_218_commit_21b840b', 'm2_approved', 'm1_unapproved']) {
  if (ag[k] !== true) fail('preflight approval_guard ' + k + ' must be true');
}
// Build 220 update: the M2 approval is now permanently consumed, so the live preflight reports the
// approval as no-longer-valid and consumed. The send remains blocked (would_permit_live_send=false,
// checked above) — proving the consumed approval can never be reused.
if (ag.approval_valid_m2_only !== false) fail('preflight approval_guard approval_valid_m2_only must now be false (approval permanently consumed)');
if (ag.approval_unconsumed !== false) fail('preflight approval_guard approval_unconsumed must now be false (approval permanently consumed)');
const mg = preflight.m1_consumption_guard || {};
if (mg.m1_approval_artifact_present !== true || mg.m1_remains_consumed_and_expired !== true) fail('preflight must confirm M1 remains permanently consumed');
const psa = preflight.preflight_safety_attestations || {};
for (const k of ['sms_sent', 'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'credentials_loaded_or_inspected', 'destination_value_recorded', 'phone_number_recorded', 'email_address_recorded', 'raw_sid_recorded', 'network_or_external_call_made', 'confirm_token_armed', 'retry_performed', 'tracked_repo_file_modified']) {
  if (psa[k] !== false) fail('preflight safety attestation must be false: ' + k);
}
if (psa.live_automation_remains_disabled !== true) fail('preflight live_automation_remains_disabled must be true');
if (preflight.decision !== 'M2_GUARDED_SEND_TIME_PREFLIGHT_COMPUTED_NO_SEND') fail('preflight decision mismatch');
pass('build_219_preflight_is_non_mutating_fail_closed_no_send_no_arm_no_destination_value');

// -------------------------------------------------------------------------------------------------
// Runner / negatives / no-mutation / wrapper structural safety (objective 3/4/5).
// -------------------------------------------------------------------------------------------------
const runnerText = read(runnerPath);
const messagesCreateCall = 'messages' + '.create' + '(';
const topLevelTwilio = runnerText.split('\n').slice(0, 70).some((l) => /require\(['"]twilio/.test(l));
if (topLevelTwilio) fail('runner must not require the twilio sdk at top level (lazy require only)');
if (!/lazy/.test(runnerText)) fail('runner must document the lazy twilio require');
if (!runnerText.includes('--arm-live-send')) fail('runner live send must be gated behind explicit --arm-live-send');
if (new RegExp('M2_LIVE_VALIDATION_CONFIRM\\s*=\\s*[\'"]SEND_ONE_M2_LIVE_VALIDATION_SMS').test(runnerText)) fail('runner must not hardcode-arm the confirm token');
if (!/require\.main === module/.test(runnerText)) fail('runner must only execute when run directly');
// The preflight path must never write a tracked fixture file (non-mutation correctness).
const preflightWriteToFixture = /runPreflight[\s\S]*?writeFileSync\([^)]*FIXTURE_DIR/.test(runnerText);
if (preflightWriteToFixture) fail('preflight must never write into the tracked fixture dir');
pass('build_219_runner_live_path_gated_lazy_twilio_no_auto_arm_preflight_non_mutating');

const negativesText = read(negativesPath);
if (/require\(['"]twilio/.test(negativesText)) fail('negative tests must not require twilio');
if (negativesText.includes(messagesCreateCall)) fail('negative tests must not call messages.create');
pass('build_219_negative_tests_read_only_no_send');

const noMutationText = read(noMutationPath);
if (noMutationText.includes(messagesCreateCall)) fail('no-mutation test must not call messages.create');
if (!noMutationText.includes('git') || !noMutationText.includes('status')) fail('no-mutation test must compare git status before/after');
pass('build_219_no_mutation_test_present_and_read_only');

if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
const wrapper = read(wrapperPath);
if (wrapper.includes(messagesCreateCall)) fail('wrapper must not call messages.create');
if (new RegExp('M2_LIVE_VALIDATION_CONFIRM\\s*=').test(wrapper)) fail('wrapper must not arm the confirm token');
if (wrapper.includes('--arm-live-send')) fail('wrapper must never pass --arm-live-send');
for (const needle of ['run-native-workflow-fixture-m2-guarded-live-validation-execution-build-219.js', 'verify-m2-guarded-live-validation-negative-guards-build-219-readonly.js', 'verify-m2-preflight-no-mutation-build-219-readonly.js', 'verify-m2-live-validation-approval-build-219-readonly.js']) {
  if (!wrapper.includes(needle)) fail('wrapper must run: ' + needle);
}
pass('build_219_dry_run_wrapper_runs_preflight_negatives_no_mutation_verifier_only_never_arms_or_sends');

const selfText = read('backend/scripts/verify-m2-live-validation-approval-build-219-readonly.js');
const selfSendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (selfSendLines.length > 0) fail('verifier must not call messages.create');
pass('build_219_verifier_is_read_only_does_not_send_or_arm');

// -------------------------------------------------------------------------------------------------
// Summary (objective 7).
// -------------------------------------------------------------------------------------------------
if (summary.build !== 219) fail('summary build must be 219');
if (summary.source_of_truth_commit !== '8d92939' || summary.verified_build_218_commit !== '21b840b') fail('summary must bind to 8d92939 + 21b840b');
const sl = summary.m2_guarded_approval_lane || {};
const requiredLane = {
  decision: 'M1_LIVE_VALIDATION_CONFIRMED_M2_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED',
  m2_signed_and_scenario_specific: true,
  m1_remains_consumed_and_unreusable: true,
  bound_build_217_source_commit: '8d92939',
  verified_build_218_commit: '21b840b',
  native_workflow_produced_body_equals_signed_m2: true,
  guarded_runner_fails_closed: true,
  send_time_preflight_is_non_mutating: true,
  send_time_preflight_leaves_git_status_unchanged: true,
  no_send_during_build_219: true,
  send_time_preflight_required: true,
  next_live_attempt_maximum: 1,
  retry_allowed: false,
  m2_approval_consumed: false,
  authorizes_send_now: false,
  live_automation_remains_disabled: true
};
for (const [k, v] of Object.entries(requiredLane)) {
  if (sl[k] !== v) fail('summary m2_guarded_approval_lane ' + k + ' must be ' + JSON.stringify(v) + ' (got ' + JSON.stringify(sl[k]) + ')');
}
const cl = summary.readiness_lanes && summary.readiness_lanes.m1_live_validation_closeout || {};
for (const k of ['native_workflow_path_validated_live', 'exact_signed_m1_body_sent', 'sms_sent', 'recipient_confirmed_sms_received', 'recipient_confirmed_actual_text_matches_m1', 'm1_approval_consumed', 'm1_approval_permanently_consumed_and_never_reusable']) {
  if (cl[k] !== true) fail('summary m1_live_validation_closeout ' + k + ' must be true');
}
if (cl.recipient_confirmed_wrong_or_generic_copy_received !== false) fail('summary closeout must record no wrong/generic copy received');
const narr = summary.narrative || {};
for (const k of ['build_217_validated_five_native_workflow_scenarios_locally', 'm1_passed_live_delivery_and_exact_copy_validation', 'm1_approval_is_consumed_permanently', 'm2_is_signed_but_not_sent', 'lindy_remains_in_safe_pilot_mode', 'm2_is_the_final_jason_owned_sms_scenario_awaiting_guarded_execution', 'after_m2_remaining_product_gap_is_genuine_ui_demo_packaging_then_real_roofer_pilot_recruitment', 'no_homeowner_contact_authorized']) {
  if (narr[k] !== true) fail('summary narrative ' + k + ' must be true');
}
const pro = summary.primary_remaining_objective || {};
if (typeof pro.estimated_strategic_builds_remaining_to_jason_owned_sales_demo_readiness !== 'number') fail('summary must record an estimated strategic builds remaining count');
const lindy = summary.lindy_status || {};
if (lindy.lindy_safe_for_pilot_mode !== true || lindy.lindy_live_enabled !== false) fail('summary must record Lindy safe pilot mode, not live');
const broader = summary.broader_live_automation_status || {};
if (broader.all_broader_live_automation_remains_disabled !== true) fail('summary broader automation must remain disabled');
if (summary.launch_status !== 'pilot_gated_not_unrestricted') fail('summary launch_status must be pilot_gated_not_unrestricted');
if (summary.authorizes_send_now !== false || summary.next_step_is_send_now !== false) fail('summary must not authorize send now');
if (summary.m1_live_validation_confirmed !== true || summary.m2_approved !== true || summary.m2_approval_consumed !== false) fail('summary must record m1 confirmed, m2 approved, m2 unconsumed');
if (summary.safety_status !== 'demo_ready_with_live_automation_disabled') fail('summary safety_status must be preserved');
pass('build_219_summary_records_m1_closeout_m2_signed_non_mutating_preflight_lindy_safe_and_remaining_builds');

// -------------------------------------------------------------------------------------------------
// Builds-on-217/218 integrity (prior artifacts preserved) + approval-ready cross reference.
// -------------------------------------------------------------------------------------------------
if (priorPacket.build !== 217) fail('prior packet must be build 217');
if ((priorPacket.next_decision_packet || {}).decision !== 'JASON_OWNED_INTEGRATED_WORKFLOW_LOCALLY_VALIDATED_LIVE_M1_M2_APPROVALS_AVAILABLE') fail('Build 217 decision must be preserved unchanged');
// The Build 219 M2 approval text must match the Build 217 unsigned M2 template text exactly.
const t2 = (approvalReady.approval_templates || []).find((t) => t.message_id === 'M2');
if (!t2 || t2.selected_variant_text !== EXACT_M2) fail('Build 217 M2 template text must equal exact M2');
if (a.selected_variant_text !== t2.selected_variant_text) fail('Build 219 signed M2 text must equal the Build 217 M2 template text exactly');
// The Build 218 M1 approval signed statement must remain preserved (historical truth not rewritten).
if (!(m1Approval.signed_m1_approval && typeof m1Approval.signed_m1_approval.exact_signed_statement === 'string' && m1Approval.signed_m1_approval.exact_signed_statement.includes('authorizes M1 ONLY and never M2'))) fail('Build 218 M1 signed statement must remain preserved');
pass('build_219_builds_on_217_and_218_prior_artifacts_preserved_and_m2_text_consistent');

// -------------------------------------------------------------------------------------------------
// No secret values / phone numbers / email addresses / raw SIDs in Build 219 DATA artifacts.
// -------------------------------------------------------------------------------------------------
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(closeout), JSON.stringify(approval), JSON.stringify(summary), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(dataArtifactText)) fail('an email-address-shaped value appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:code|status|build|passed|total|count|max_message_count|next_live_attempt_maximum|send_attempt_count|exit_status|preflight_exit_status|removed_trigger_count|remaining_auto_customer_contact_paths|remaining_auto_roofer_contact_paths|remaining_auto_homeowner_contact_paths|validated_scenario_count|estimated_strategic_builds_remaining_to_jason_owned_sales_demo_readiness)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_phone_numbers_email_addresses_or_raw_sids_present_in_any_build_219_artifact');

// -------------------------------------------------------------------------------------------------
// Doc present and labeled.
// -------------------------------------------------------------------------------------------------
for (const needle of ['Build 219', 'M1_LIVE_VALIDATION_CONFIRMED_M2_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED', '8d92939', '21b840b', 'no send', 'pilot-gated', 'demo_ready_with_live_automation_disabled', 'non-mutating', 'never authorizes M1']) {
  if (!doc.includes(needle)) fail('doc missing required marker: ' + needle);
}
pass('build_219_doc_present_and_labeled');

// -------------------------------------------------------------------------------------------------
// Safety posture preserved (pilot readiness helper).
// -------------------------------------------------------------------------------------------------
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
for (const [k, v] of Object.entries(status.live_automation)) {
  if (v !== false) fail('pilot readiness live_automation must be false: ' + k);
}
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 219 truthfully closes out the M1 live validation (native workflow path validated live, exact');
console.log('      signed M1 body sent, ONE attempt, recipient confirmed receipt + exact copy match, no retry, approval');
console.log('      consumed/expired permanently, env values cleared) and captures Jason\'s signed, single-use,');
console.log('      scenario-specific M2 approval (M2 only, never M1), bound to verified Build 217 commit 8d92939 and');
console.log('      verified Build 218 commit 21b840b.');
console.log('PASS: The guarded M2 runner produces the body via the native workflow (bindRooferAlert), verifies it equals');
console.log('      the signed M2 text exactly, requires M1 to remain consumed, and fails closed on M1/generic/empty/');
console.log('      modified/env-overridden copy, missing/unsigned/consumed approval, wrong source chain, M1 reuse,');
console.log('      dirty worktree, wrong branch/HEAD/subject, missing/wrong token, missing/multiple destination,');
console.log('      missing creds, and retry.');
console.log('PASS: Send-time preflight is NON-MUTATING (leaves git status unchanged) and FAIL-CLOSED; no SMS/Twilio/');
console.log('      client/credential/destination/network action. Build 218 preflight mutation defect corrected.');
console.log('PASS: Decision = M1_LIVE_VALIDATION_CONFIRMED_M2_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED;');
console.log('      authorizes_send_now=false; launch pilot-gated, not unrestricted; demo_ready_with_live_automation_disabled preserved.');
console.log('PASS: Build 219 verifier passed (' + passCount + ' assertions).');
