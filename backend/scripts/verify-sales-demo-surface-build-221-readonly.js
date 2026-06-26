#!/usr/bin/env node
/**
 * Build 221 Read-Only Verifier — Sanitized Sales-Demo Surface.
 *
 * Read-only. Node built-ins + on-the-fly tsc compile of the native modules (to a temp dir) so it can
 * INDEPENDENTLY exercise the native binding/recognition logic and confirm the generated demo surface
 * reflects real native output (not a hand-typed page). No network, no secret-value access, no
 * credentials, no phone numbers, no email addresses, no production data, no SMS, no email, no
 * Twilio/provider call, no retry. Does NOT construct a provider client; does NOT call messages.create;
 * does NOT arm a confirm token. Verifying this build is NOT a send.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const backendRoot = path.join(root, 'backend');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';

const htmlPath = 'website/demo/sales-demo.html';
const contentPath = `${FIXTURE_DIR}/sales-demo-surface-content-build-221.json`;
const statePath = `${FIXTURE_DIR}/sales-demo-surface-state-build-221.json`;
const readinessPath = `${FIXTURE_DIR}/sales-demo-surface-readiness-build-221.json`;
const generatorPath = 'backend/scripts/build-sales-demo-surface-build-221.js';
const wrapperPath = 'scripts/run-build-221-sales-demo-surface-dry-run.sh';
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_SANITIZED_SALES_DEMO_SURFACE_BUILD_221.md';

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

function loadNativeModules() {
  const outDir = path.join(os.tmpdir(), 'roofleadhq-b221-verify-native');
  fs.mkdirSync(outDir, { recursive: true });
  const serviceFiles = [
    'lead-intake-recognition.service.ts',
    'roofer-alert-binding.service.ts'
  ].map((f) => path.join(backendRoot, 'src/services', f));
  execFileSync(
    path.join(backendRoot, 'node_modules/.bin/tsc'),
    [...serviceFiles, '--target', 'ES2020', '--module', 'commonjs', '--esModuleInterop', '--skipLibCheck', '--outDir', outDir],
    { stdio: 'inherit' }
  );
  return {
    recognition: require(path.join(outDir, 'lead-intake-recognition.service.js')),
    binding: require(path.join(outDir, 'roofer-alert-binding.service.js'))
  };
}

console.log('== Build 221 Sanitized Sales-Demo Surface Verification (local-only) ==');

// 1. Files exist + valid JSON.
const html = read(htmlPath);
const content = readJson(contentPath);
const state = readJson(statePath);
const readiness = readJson(readinessPath);
read(generatorPath);
read(docPath);
if (!Array.isArray(content.proof_bullets) || content.proof_bullets.length === 0) fail('content fixture missing proof_bullets');
pass('demo surface, content, state, readiness, generator, and doc all present (JSON artifacts valid)');

// 2. Independently re-exercise native modules and confirm they match what was emitted.
const native = loadNativeModules();
const recog = native.recognition.recognizeLeadIntake({
  issueText: 'New roof inspection request from the website form; homeowner reports a possible roof leak after a storm.',
  sourceLabel: 'website_form',
  serviceAreaMatch: true
});
const m1 = native.binding.bindRooferAlert('new_roof_inspection_lead_alert');
const m2 = native.binding.bindRooferAlert('missed_or_slow_lead_follow_up_nudge');
const recap = native.binding.buildDailyOpenLeadRecap(3);
const homeowner = native.binding.prepareHomeownerOutreach();
const guardedM1 = native.binding.prepareGuardedFutureSend('new_roof_inspection_lead_alert', null);
const guardedM2 = native.binding.prepareGuardedFutureSend('missed_or_slow_lead_follow_up_nudge', null);

if (m1.boundBody !== EXACT_M1) fail('native M1 != exact approved copy');
if (m2.boundBody !== EXACT_M2) fail('native M2 != exact approved copy');
if (recog.recognizedType !== 'roof_inspection_request') fail('native recognizedType mismatch');
if (recog.routedFor !== 'roof_inspection_follow_up') fail('native routing mismatch');
if (homeowner.status !== 'blocked_approval_required') fail('homeowner not blocked');
if (guardedM1.permitted !== false || guardedM2.permitted !== false) fail('guarded future send not fail-closed');
pass('native modules independently produce exact M1/M2, roof-inspection recognition, follow-up routing, homeowner block, and fail-closed guarded send');

// 3. State JSON reflects native output.
if (state.native_m1_alert.bound_body !== EXACT_M1) fail('state M1 mismatch');
if (state.native_m2_follow_up.bound_body !== EXACT_M2) fail('state M2 mismatch');
if (state.native_daily_recap.body !== recap.body) fail('state recap mismatch');
if (state.native_homeowner_block.status !== 'blocked_approval_required') fail('state homeowner block mismatch');
if (state.native_guarded_future_send_fail_closed.m1_permitted !== false) fail('state guarded M1 not blocked');
if (state.safety_attestations.synthetic_data_only !== true) fail('state not synthetic-only');
pass('state JSON reflects native-produced M1/M2/recap/homeowner-block/fail-closed output');

// 4. HTML surface contains exact native copy + required story.
function htmlHas(needle, label) { if (!html.includes(needle)) fail('demo surface missing ' + label); }
htmlHas(EXACT_M1, 'exact native M1 copy');
htmlHas(EXACT_M2, 'exact native M2 copy');
htmlHas(recap.body, 'native daily recap copy');
pass('demo surface embeds the exact native M1, M2, and recap copy');

// 5. Required marketing/safety copy lines.
const requiredCopy = [
  'RoofLeadHQ helps roofing contractors respond faster to roof inspection leads and avoid letting open leads sit without follow-up.',
  'Manual approval pilot first.',
  'No autonomous customer contact.',
  'No homeowner outreach without consent and separate approval.',
  '$399-$799/mo + $499 setup',
  '14-day trial after go-live',
  'I can test this with your inbound leads under manual approval first.'
];
for (const c of requiredCopy) htmlHas(c, 'required copy: ' + c);
pass('demo surface contains all required positioning, offer, and safety copy lines');

// 6. Required synthetic-lead labels present; clearly labeled demo.
for (const c of ['Demo Homeowner', 'Demo Service Area', 'Website form', 'Roof inspection', 'New / awaiting first reply', 'Follow-up recommended']) {
  htmlHas(c, 'synthetic lead label: ' + c);
}
for (const c of ['SAMPLE / DEMO', 'synthetic data only', 'Not a live production automation screen']) {
  htmlHas(c, 'demo labeling: ' + c);
}
pass('demo surface uses the required synthetic lead and is clearly labeled as a demo (not a live screen)');

// 7. Sanitized proof bullets present in surface.
for (const c of [
  'Build 217 local integrated scenarios passed',
  'M1 live exact-copy proof passed',
  'M2 live exact-copy proof passed',
  'Lindy in safe pilot mode only',
  'No autonomous external automation',
  'No homeowner contact',
  'No unrestricted launch'
]) htmlHas(c, 'proof bullet: ' + c);
pass('demo surface includes the sanitized proof bullets (217, M1, M2, Lindy, no autonomous automation, no homeowner contact, no unrestricted launch)');

// 8. Forbidden claim language must be absent from the surface.
const forbidden = [/guarantee/i, /booked job/i, /\binvoice\b/i, /\bquote\b/i, /\bestimate\b/i, /\bdeposit\b/i, /\bpayment\b/i];
for (const re of forbidden) {
  if (re.test(html)) fail('demo surface contains forbidden claim language: ' + re);
}
pass('demo surface contains no guarantee / booked-jobs / estimate / quote / invoice / payment / deposit language');

// 9. No secret / phone / email / raw-SID-shaped values anywhere in surface, state, or readiness.
const scanTargets = [html, read(contentPath), read(statePath), read(readinessPath)];
const secretRe = /(?<![0-9a-f])[0-9a-f]{32}(?![0-9a-f])|\b(?:AC|SM|MM|SK)[0-9a-f]{32}\b|AUTH_TOKEN=|auth_token:|BEGIN (RSA )?PRIVATE KEY|Bearer |[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}|(?<!\d)\+?\d{10,15}(?!\d)/;
for (const t of scanTargets) {
  if (secretRe.test(t)) fail('secret/phone/email/raw-SID-shaped content found in a Build 221 artifact');
}
pass('no secret/phone/email/raw-SID-shaped values in surface, state, or readiness (labels/booleans/sanitized prose only)');

// 10. Readiness decision + safety booleans.
const expect = {
  demo_surface_created: true,
  synthetic_data_only: true,
  native_workflow_logic_used: true,
  m1_m2_proof_summarized: true,
  no_sensitive_values: true,
  sales_demo_ready: true,
  decision: 'SANITIZED_SALES_DEMO_SURFACE_READY_FOR_MANUAL_ROOFER_OUTREACH',
  recommended_next_option: 'prepare_roofer_outreach_list_and_start_manual_sales_conversations',
  authorizes_send_now: false,
  homeowner_contact_authorized: false,
  real_roofer_contact_authorized: false,
  unrestricted_launch: false,
  live_automation_remains_disabled: true,
  sales_demo_surface_ready: true,
  m1_m2_live_validation_complete: true
};
for (const [k, v] of Object.entries(expect)) {
  if (readiness[k] !== v) fail(`readiness.${k} expected ${JSON.stringify(v)} got ${JSON.stringify(readiness[k])}`);
}
if (readiness.remaining_blocker !== null) fail('readiness.remaining_blocker must be null when sales_demo_ready=true');
pass('readiness artifact records SANITIZED_SALES_DEMO_SURFACE_READY_FOR_MANUAL_ROOFER_OUTREACH with correct safety booleans');

// 11. Global safety posture preserved.
const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('global summary not demo_ready_with_live_automation_disabled');
for (const k of ['sms', 'calendar', 'vapi_outbound', 'resend', 'lindy']) {
  if (status.live_automation[k] !== false) fail('live_automation.' + k + ' is not disabled');
}
pass('global safety posture preserved: demo_ready_with_live_automation_disabled; all live automation disabled');

console.log(`\nPASS: Build 221 verification passed (${passCount} checks). Sanitized sales-demo surface is native-produced, synthetic-only, no send, no secrets.`);
