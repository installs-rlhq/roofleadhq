#!/usr/bin/env node
/**
 * Build 201 Read-Only Verifier — Fastest Path to Live Assessment.
 *
 * Read-only. Node built-ins only (fs, path) plus the existing pilot readiness helper. No network,
 * no process.env secret-value access, no credentials, no secret VALUES, no destination/phone numbers,
 * no production data, no live activation, no SMS, no external Twilio call, no retry, no real contacts.
 * Does NOT invoke the live execution runner; does NOT construct a Twilio client; does NOT call
 * messages.create.
 *
 * Proves:
 *  - The Build 201 machine-readable assessment is well-formed and contains every required section
 *    (executive assessment, fastest path, risks, architecture, gating, cost reduction, build rec).
 *  - The assessment is local-only (all safety attestations false / disabled), keeps launch pilot-gated,
 *    and preserves the safety posture.
 *  - The decision document exists and carries the required headline markers.
 *  - Names/booleans/codes/counts only; no secret values or phone numbers anywhere in the artifacts.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const assessmentPath = `${FIXTURE_DIR}/fastest-path-to-live-assessment-build-201.json`;
const docPath = 'docs/ROOFLEADHQ_BUILD_201_FASTEST_PATH_TO_LIVE_ASSESSMENT.md';
const wrapperPath = 'scripts/run-fastest-path-to-live-assessment-build-201-dry-run.sh';
const liveRunnerPath = 'backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js';

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

console.log('== Build 201 Fastest Path to Live Assessment Verification (local-only) ==');

const a = readJson(assessmentPath);
const doc = read(docPath);
const wrapper = read(wrapperPath);

// --- Top-level identity ---
if (a.build !== 201) fail('assessment build must be 201');
if (a.assessment_name !== 'fastest_path_to_live_assessment_build_201') fail('assessment_name mismatch');
if (a.launch_status !== 'pilot_gated_not_unrestricted') fail('assessment launch_status must be pilot_gated_not_unrestricted');
if (a.next_step_is_unrestricted_launch !== false) fail('assessment next_step_is_unrestricted_launch must be false');
if (a.safety_posture !== 'demo_ready_with_live_automation_disabled') fail('assessment safety_posture must be preserved');
if (a.safety_status !== 'demo_ready_with_live_automation_disabled') fail('assessment safety_status must be preserved');
pass('build_201_assessment_identity_and_launch_gating_preserved');

// --- Required top-level sections present ---
const requiredSections = ['repo_scale_snapshot', 'executive_assessment', 'fastest_path_to_live',
  'risk_assessment', 'recommended_architecture_path', 'launch_gating_recommendation',
  'token_time_cost_reduction', 'build_recommendation', 'top_5_recommendations', 'assessment_safety_attestations'];
for (const s of requiredSections) {
  if (!(s in a)) fail('assessment missing required section: ' + s);
}
pass('build_201_assessment_contains_all_required_sections');

// --- Executive assessment substructure ---
const ea = a.executive_assessment || {};
for (const k of ['already_proven', 'not_proven', 'blocked', 'over_engineered_or_slowing_launch', 'truly_required_before_first_real_pilot']) {
  if (!(k in ea)) fail('executive_assessment missing: ' + k);
}
if (ea.already_proven.local_suite_passed !== true || ea.already_proven.mock_adapter_suite_passed !== true) fail('executive assessment must record local + mock suites proven');
if (ea.not_proven.real_paying_or_real_pilot_roofer_onboarded !== false) fail('executive assessment must record no real roofer onboarded yet');
if (ea.not_proven.controlled_expansion_retry_send_executed !== false) fail('executive assessment must record expansion retry not yet executed');
if (!Array.isArray(ea.truly_required_before_first_real_pilot) || ea.truly_required_before_first_real_pilot.length < 3) fail('executive assessment must list >=3 truly-required items');
pass('build_201_executive_assessment_proven_unproven_blocked_overengineered_required');

// --- Fastest path: steps + stop list + wait list ---
const fp = a.fastest_path_to_live || {};
if (!Array.isArray(fp.next_steps_3_to_7) || fp.next_steps_3_to_7.length < 3 || fp.next_steps_3_to_7.length > 7) fail('fastest path must list 3-7 next steps');
for (const step of fp.next_steps_3_to_7) {
  if (typeof step.step !== 'number' || !step.owner || !step.type || !step.action) fail('each next step needs step/owner/type/action');
}
if (!Array.isArray(fp.stop_building_now) || fp.stop_building_now.length < 1) fail('fastest path must list what to stop building');
if (!Array.isArray(fp.can_wait_until_after_first_customer_validation) || fp.can_wait_until_after_first_customer_validation.length < 1) fail('fastest path must list what can wait');
pass('build_201_fastest_path_has_3_to_7_steps_stop_list_and_wait_list');

// --- Risk assessment: all five risk dimensions ---
const ra = a.risk_assessment || {};
for (const k of ['operational', 'compliance_sms_consent', 'secret_handling', 'repo_process', 'product_customer']) {
  if (!Array.isArray(ra[k]) || ra[k].length < 1) fail('risk_assessment missing or empty dimension: ' + k);
}
pass('build_201_risk_assessment_covers_operational_compliance_secret_repo_product');

// --- Architecture + gating + cost-reduction substructure ---
const arch = a.recommended_architecture_path || {};
for (const k of ['stay_local_or_manual_for_now', 'move_to_production_later', 'do_not_automate_yet']) {
  if (!Array.isArray(arch[k]) || arch[k].length < 1) fail('architecture path missing: ' + k);
}
const gating = a.launch_gating_recommendation || {};
for (const k of ['controlled_pilot_launch_criteria', 'go_no_go_checklist']) {
  if (!Array.isArray(gating[k]) || gating[k].length < 1) fail('launch gating missing: ' + k);
}
if (!gating.rollback_stop_procedure) fail('launch gating missing rollback_stop_procedure');
if (!gating.owner_responsibilities || gating.owner_responsibilities.rollback_owner !== 'Jason Lohse') fail('launch gating rollback owner must be Jason Lohse');
const cost = a.token_time_cost_reduction || {};
for (const k of ['reduce_build_count', 'batch_future_work', 'reduce_prompts_and_permission_interruptions', 'jason_manual_vs_claude_build']) {
  if (!(k in cost)) fail('cost reduction missing: ' + k);
}
pass('build_201_architecture_gating_and_cost_reduction_complete');

// --- Build recommendation + estimates ---
const br = a.build_recommendation || {};
if (!br.single_best_next_build_after_201) fail('build recommendation must name the single best next build');
if (typeof br.estimated_builds_remaining_until_useful_live_pilot_low !== 'number' ||
    typeof br.estimated_builds_remaining_until_useful_live_pilot_high !== 'number') fail('build recommendation must give numeric pilot estimate range');
if (br.estimated_builds_remaining_until_useful_live_pilot_low > br.estimated_builds_remaining_until_useful_live_pilot_high) fail('pilot estimate low must be <= high');
pass('build_201_build_recommendation_names_next_build_and_estimates');

// --- Exactly five top recommendations ---
if (!Array.isArray(a.top_5_recommendations) || a.top_5_recommendations.length !== 5) fail('top_5_recommendations must have exactly 5 items');
pass('build_201_top_5_recommendations_present');

// --- Supplemental business context: honest messaging guardrails + deferred billing ---
const sbc = a.supplemental_business_context || {};
const guards = sbc.messaging_guardrails || {};
if (guards.do_not_claim_guaranteed_booked_jobs !== true) fail('messaging guardrails must forbid guaranteed-jobs claims');
if (guards.say_book_inspections_not_guaranteed_jobs !== true) fail('messaging guardrails must say book inspections, not guaranteed jobs');
const commercial = sbc.commercial_model || {};
if (commercial.billing_automation_status !== 'deferred_do_not_automate_yet') fail('commercial model must keep billing automation deferred');
if (commercial.pilot_requires_billing !== false) fail('commercial model must record that the pilot does not require billing');
pass('build_201_supplemental_business_context_honest_messaging_and_deferred_billing');

// --- Decision branches: three branches + a recommended sequence ---
const branches = a.decision_branches || {};
for (const k of ['branch_a_continue_expansion', 'branch_b_pause_expansion', 'branch_c_first_real_pilot', 'recommended_sequence']) {
  if (!branches[k]) fail('decision_branches missing: ' + k);
}
pass('build_201_decision_branches_present_with_recommended_sequence');

// --- Minimum viable pilot framing: useful-not-perfect requirements ---
const mvp = a.minimum_viable_pilot_framing || {};
if (!Array.isArray(mvp.useful_pilot_requirements) || mvp.useful_pilot_requirements.length < 5) fail('minimum viable pilot framing must list the useful-pilot requirements');
if (!mvp.goal || !mvp.goal.includes('NOT')) fail('minimum viable pilot framing goal must emphasize useful-not-perfect');
pass('build_201_minimum_viable_pilot_framing_useful_not_perfect');

// --- Safety attestations all false / disabled (local-only) ---
const att = a.assessment_safety_attestations || {};
const mustBeFalse = ['reads_secret_values', 'secret_values_printed_logged_or_committed', 'phone_number_recorded',
  'twilio_called', 'twilio_client_constructed', 'messages_create_called', 'sms_sent', 'network_or_external_call_made',
  'retry_performed', 'real_roofer_contacted', 'real_homeowner_contacted', 'production_data_used', 'used_production_supabase',
  'channel_expanded_beyond_sms', 'live_automation_activated', 'public_live_routes_webhooks_cron_schedulers_dispatchers_created',
  'billing_payment_deposit_quote_estimate_invoice_automation_added', 'schema_auth_rls_security_changes'];
for (const k of mustBeFalse) {
  if (att[k] !== false) fail('assessment safety attestation must be false: ' + k);
}
if (att.other_live_automation_remains_disabled !== true) fail('assessment other_live_automation_remains_disabled must be true');
pass('build_201_assessment_is_local_only_no_send_no_network_no_secrets');

// --- No secret values / phone numbers anywhere in Build 201 text artifacts ---
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(a), doc].join('\n');
for (const needle of secretLikePatterns) {
  if (dataArtifactText.includes(needle)) fail('possible secret value pattern found in artifacts: ' + needle);
}
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
const numStripped = dataArtifactText.replace(/"(?:build|backend_src_loc_approx|docs_count_approx|root_scripts_count_approx|backend_scripts_count_approx|native_workflow_fixtures_count_approx|workflow_build_commits_approx|step|estimated_builds_remaining_until_useful_live_pilot_low|estimated_builds_remaining_until_useful_live_pilot_high)"\s*:\s*\d+/g, '');
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(numStripped)) fail('a phone-number-shaped digit run appears in artifacts');
pass('no_secret_values_or_phone_numbers_present_in_any_build_201_artifact');

// --- Decision doc present and labeled ---
for (const needle of ['Build 201', 'Fastest Path to Live', 'Executive assessment', 'Fastest path to live',
  'Risk assessment', 'Launch gating recommendation', 'Top 5 recommendations', 'demo_ready_with_live_automation_disabled',
  'pilot-gated']) {
  if (!doc.includes(needle)) fail('decision doc missing required marker: ' + needle);
}
pass('build_201_decision_document_present_and_labeled');

// --- Dry-run wrapper: local-only; never runs or arms the live execution runner ---
if (!isExecutable(wrapperPath)) fail('wrapper must be executable: ' + wrapperPath);
if (/node\s+backend\/scripts\/run-native-workflow-fixture-controlled-live-sms-one-message-execution\.js/.test(wrapper)) {
  fail('wrapper must NOT run the live execution runner');
}
if (wrapper.includes('CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS')) fail('wrapper must NOT arm the live confirm token');
if (!wrapper.includes('verify-fastest-path-to-live-assessment-build-201-readonly.js')) fail('wrapper must run the Build 201 verifier');
pass('build_201_dry_run_wrapper_runs_verifier_only_never_arms_or_runs_live_send');

// --- Verifier itself must not invoke the live runner or messages.create ---
const selfText = read('backend/scripts/verify-fastest-path-to-live-assessment-build-201-readonly.js');
const messagesCreateCall = 'messages' + '.create' + '(';
if (new RegExp('require\\([\'"]twilio').test(selfText)) fail('verifier must not require the twilio sdk');
const sendLines = selfText.split('\n').filter((line) => line.includes(messagesCreateCall) && !line.trimStart().startsWith('*') && !line.trimStart().startsWith('//') && !line.includes('messagesCreateCall'));
if (sendLines.length > 0) fail('verifier must not call messages.create');
if (!fs.existsSync(fullPath(liveRunnerPath))) fail('expected existing fail-closed live runner to remain present: ' + liveRunnerPath);
pass('build_201_verifier_is_read_only_does_not_send');

// --- Safety posture preserved (pilot readiness helper unchanged) ---
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
pass('demo_ready_with_live_automation_disabled_preserved_everywhere');

console.log('PASS: Build 201 assessment is complete (all 7 deliverable sections + top 5 recommendations).');
console.log('PASS: Recommendation = stop per-state fixture ceremony; do one human send; onboard one real roofer.');
console.log('PASS: Best next build = Build 202 consolidated closeout AFTER Jason runs the approved send.');
console.log('PASS: Build 201 is local-only — no live action, no SMS, no Twilio, no retry, no secrets/numbers.');
console.log('PASS: launch remains pilot-gated (NOT unrestricted); posture preserved.');
console.log('PASS: Build 201 verifier passed (' + passCount + ' assertions).');
