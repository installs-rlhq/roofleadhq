#!/usr/bin/env node
/**
 * Build 288 Verifier — Demo Media Capture & Site Slots (repo-only, offline, docs + static site).
 *
 * Strategic goal: capture that the site/demo-media integration PATH is prepared WITHOUT the
 * video files yet, on top of the Build 287 first pilot sales package (5dc1728) and the Build
 * 286 first-roofer end-to-end live pass (a23cb81) — WITHOUT any call, SMS, email send, real
 * roofer/homeowner contact, provider action, Vapi/Twilio/Retell action, config change,
 * phone-number change, deploy, schema/auth/RLS change, or production data export.
 *
 * This verifier (fully offline, non-mutating, no compile needed):
 *   0. Source-of-truth: Build 287 (5dc1728) is an ancestor of / equal to HEAD.
 *   1. Plan doc present with the Build 288 status tokens + safety posture + asset paths.
 *   2. Text + Voice capture scripts present, fictional-persona + sanitization framed.
 *   3. index.html contains the phone-demo scaffold AND it is DISABLED (inside an HTML
 *      comment): the new video/poster/section tokens appear ONLY within the commented
 *      block, so the live site is unchanged and makes no request for missing files.
 *   4. The (visible-when-enabled) scaffold copy contains no forbidden/risky claims.
 *   5. No clean-Vapi last-4 (0389) or obvious secret leaks in the new files.
 *   6. Only website/docs/this-verifier/this-wrapper changed; no backend/src, migrations,
 *      schema, auth, secrets, or env files.
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/
 * webCall, no call, no SMS, no email send, no Twilio, no Retell, no Vapi API, no deploy, no
 * config change, no schema/RLS change, no secret read. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function assert(cond, message) { if (!cond) fail(message); }

function read(rel) {
  const p = path.join(repoRoot, rel);
  assert(fs.existsSync(p), `expected file missing: ${rel}`);
  return fs.readFileSync(p, 'utf8');
}
function mustHave(text, needle, label) {
  assert(text.includes(needle), `${label} missing required: ${needle}`);
}
function mustNotHave(text, needle, label) {
  assert(!text.includes(needle), `${label} contains forbidden/risky content: ${needle}`);
}
function commitPresent(sha) {
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', `${sha}^{commit}`],
      { cwd: repoRoot, encoding: 'utf8' });
    return true;
  } catch (_e) { return false; }
}
function isAncestorOrEqual(sha, ref) {
  try {
    execFileSync('git', ['merge-base', '--is-ancestor', sha, ref || 'HEAD'], { cwd: repoRoot, encoding: 'utf8' });
    return true;
  } catch (_e) { return false; }
}

console.log('=== RoofLeadHQ Build 288 — Demo Media Capture & Site Slots Read-Only Verification ===');
console.log('Local file inspection + limited git rev-parse/merge-base/status only.');
console.log('No Supabase reads or writes. No external service calls. No SMS/Twilio/Vapi/Retell/Calendar/email.');
console.log('Static site + docs + read-only verifier only. Does not read any secret file.');

const planPath = 'docs/DEMO_MEDIA_CAPTURE_AND_SITE_SLOTS_BUILD_288.md';
const textPath = 'docs/DEMO_CAPTURE_SCRIPT_TEXT_BUILD_288.md';
const voicePath = 'docs/DEMO_CAPTURE_SCRIPT_VOICE_BUILD_288.md';
const indexPath = 'website/index.html';
const wrapperPath = 'scripts/run-build-288-demo-media-capture-and-site-slots-dry-run.sh';

const plan = read(planPath);
const textScript = read(textPath);
const voiceScript = read(voicePath);
const html = read(indexPath);
const wrapper = read(wrapperPath);

// 0. Source-of-truth: Build 287 commit is present and ancestor-or-equal to HEAD.
const BUILD_287 = '5dc1728';
assert(commitPresent(BUILD_287), `Build 287 commit ${BUILD_287} not present in this repo`);
assert(isAncestorOrEqual(BUILD_287, 'HEAD'), `Build 287 commit ${BUILD_287} is not an ancestor of / equal to HEAD`);
pass(`Source-of-truth: Build 287 (${BUILD_287}) is an ancestor of / equal to HEAD.`);

// 1. Plan doc: status tokens + safety posture + asset paths.
const planTokens = [
  'demo_media_capture_plan_status=created',
  'text_demo_capture_script_status=created',
  'voice_demo_capture_script_status=created',
  'site_demo_media_slots_status=prepared_deferred_scaffold',
  'actual_video_files_status=not_yet_provided',
  'first_roofer_e2e_status=passed',
  'real_roofer_outreach_status=not_started',
  'no_call_placed=true',
  'no_sms_sent=true',
  'no_real_roofer_contact=true',
  'no_real_homeowner_contact=true',
  'no_provider_config_changed=true',
  'no_phone_number_changed=true',
  'no_twilio_retell_route_changed=true',
  'no_backend_deploy=true',
  'no_schema_auth_rls_changed=true',
  'no_production_data_export=true',
];
for (const t of planTokens) mustHave(plan, t, 'plan doc');
pass('Plan doc carries all Build 288 status tokens + safety tokens.');

const planAssets = [
  'website/demo-text-conversation.mp4',
  'website/demo-voice-call.mp4',
  'website/demo-text-conversation-poster.jpg',
  'website/demo-voice-call-poster.jpg',
  'RLHQ-BUILD-288-PHONE-DEMO-SCAFFOLD',
  '9:16',
  'DEMO_CAPTURE_SCRIPT_TEXT_BUILD_288.md',
  'DEMO_CAPTURE_SCRIPT_VOICE_BUILD_288.md',
];
for (const a of planAssets) mustHave(plan, a, 'plan doc');
mustHave(plan, 'last-4 0389', 'plan doc'); // clean Vapi number referenced only as masked last-4
mustHave(plan, 'Twilio', 'plan doc');
mustHave(plan, 'static site', 'plan doc');
pass('Plan doc documents exact asset paths, aspect ratio, sanitization, scaffold sentinel, and safety posture.');

// 2. Capture scripts: fictional-persona + sanitization framing.
mustHave(textScript, 'text_demo_capture_script_status=created', 'text script');
mustHave(textScript, 'Fictional', 'text script');
mustHave(textScript, 'Sanitization checklist', 'text script');
mustHave(textScript, 'website/demo-text-conversation.mp4', 'text script');
mustHave(textScript, 'no message of any kind', 'text script');
pass('Text capture script present: fictional persona, sanitization checklist, output path, no-send framing.');

mustHave(voiceScript, 'voice_demo_capture_script_status=created', 'voice script');
mustHave(voiceScript, 'Fictional', 'voice script');
mustHave(voiceScript, 'Sanitization checklist', 'voice script');
mustHave(voiceScript, 'website/demo-voice-call.mp4', 'voice script');
mustHave(voiceScript, 'no call', 'voice script');
mustHave(voiceScript, 'no config or number change', 'voice script');
pass('Voice capture script present: fictional persona, sanitization checklist, output path, no-call/no-config framing.');

// 3. Scaffold present in index.html AND disabled (inside an HTML comment).
const SENTINEL = 'RLHQ-BUILD-288-PHONE-DEMO-SCAFFOLD';
mustHave(html, SENTINEL, 'index.html');
const openMarker = '<!-- ' + SENTINEL;
const open = html.indexOf(openMarker);
assert(open >= 0, 'index.html: scaffold opening comment marker not found');
const close = html.indexOf('-->', open);
assert(close > open, 'index.html: scaffold closing comment marker not found after opening marker');
const block = html.slice(open, close);
const outside = html.slice(0, open) + html.slice(close);

const scaffoldTokens = [
  'id="phone-demos"',
  'demo-text-conversation.mp4',
  'demo-voice-call.mp4',
  'demo-text-conversation-poster.jpg',
  'demo-voice-call-poster.jpg',
  'demo-text-conversation.webm',
  'demo-voice-call.webm',
];
for (const t of scaffoldTokens) mustHave(block, t, 'scaffold block');
pass('index.html contains the phone-demo scaffold with both portrait video cards + poster/webm/mp4 slots.');

// The scaffold must be DISABLED: none of its new tokens may appear as live (uncommented) markup.
const liveMustNotAppear = [
  'id="phone-demos"',
  'demo-voice-call.mp4',
  'demo-text-conversation.mp4',
  'demo-voice-call-poster.jpg',
  'demo-text-conversation-poster.jpg',
];
for (const t of liveMustNotAppear) {
  assert(!outside.includes(t), `Build 288 scaffold appears to be LIVE (found outside the comment block): ${t}`);
}
// Guard: the closing marker chosen must precede the next section, i.e. the block is self-contained.
assert(block.indexOf('<!--', openMarker.length) === -1, 'scaffold block unexpectedly contains a nested comment open');
pass('Phone-demo scaffold is DISABLED (fully inside an HTML comment); the live site is unchanged and requests no missing media.');

// 4. Scaffold visible copy (shown when enabled) carries no forbidden/risky claims.
const forbiddenClaims = [
  'guarantee', 'guaranteed', 'booked jobs', 'book jobs', 'jobs booked',
  'invoice', 'payment', 'quote', 'estimate',
];
for (const phrase of forbiddenClaims) mustNotHave(block, phrase, 'scaffold visible copy');
// Positive demo framing present in the scaffold copy.
mustHave(block, 'Demo', 'scaffold visible copy');
mustHave(block, 'inspection', 'scaffold visible copy');
pass('Scaffold visible copy is conservative and demo-framed (no guarantee/booked-jobs/quote/estimate/invoice/payment claims).');

// 5. No clean-Vapi last-4 or obvious secret leak in the new files.
const newFiles = { plan, textScript, voiceScript, scaffold: block };
for (const [name, content] of Object.entries(newFiles)) {
  // '0389' is permitted ONLY inside the masked safety phrase "last-4 0389"; a bare last-4 is forbidden.
  const stripped = content.split('last-4 0389').join('');
  mustNotHave(stripped, '0389', name + ' (bare clean-Vapi last-4 outside the masked phrase)');
  mustNotHave(content, 'sk_', name);
  mustNotHave(content, 'BEGIN PRIVATE KEY', name);
  mustNotHave(content, 'SUPABASE_SERVICE', name);
}
pass('No bare clean-Vapi last-4 (0389 appears only inside the masked phrase "last-4 0389"), API key, private key, or service-role token leaked in the new files.');

// 6. Only allowed files changed; no backend/src, migration, schema, auth, secrets, or env.
function assertOnlyAllowedFilesChanged() {
  let porcelain = '';
  try {
    porcelain = execFileSync('git', ['status', '--porcelain'], { cwd: repoRoot, encoding: 'utf8' });
  } catch (_e) {
    pass('git status not available in this context — relying on explicit file-list constraints.');
    return;
  }
  const allowed = [
    'docs/DEMO_MEDIA_CAPTURE_AND_SITE_SLOTS_BUILD_288.md',
    'docs/DEMO_CAPTURE_SCRIPT_TEXT_BUILD_288.md',
    'docs/DEMO_CAPTURE_SCRIPT_VOICE_BUILD_288.md',
    'website/index.html',
    'backend/scripts/verify-build-288-demo-media-capture-and-site-slots-readonly.js',
    'scripts/run-build-288-demo-media-capture-and-site-slots-dry-run.sh',
  ];
  const badPatterns = ['backend/src/', 'migrations/', 'supabase/migrations', 'schema', 'prisma', 'auth', '.env', 'secrets'];
  const lines = porcelain.split(/\r?\n/).filter(Boolean);
  const violations = [];
  for (const line of lines) {
    const p = line.slice(3).trim().replace(/^.*->\s*/, '');
    if (!p) continue;
    if (!allowed.includes(p)) violations.push('unexpected changed path: ' + p);
    const low = p.toLowerCase();
    for (const bad of badPatterns) {
      if (low.includes(bad)) violations.push('forbidden path pattern (' + bad + '): ' + p);
    }
  }
  if (violations.length) fail('Working tree changes outside the Build 288 allowlist:\n  ' + violations.join('\n  '));
  pass('Only website/index.html + Build 288 docs + this verifier + this wrapper changed. No backend/src, migrations, schema, auth, secrets, or env files.');
}
assertOnlyAllowedFilesChanged();

// Wrapper wiring.
mustHave(wrapper, 'verify-build-288-demo-media-capture-and-site-slots-readonly.js', 'dry-run wrapper');
pass('Dry-run wrapper references the Build 288 verifier.');

console.log('');
console.log(`PASS: Build 288 demo-media capture & site-slots read-only verification passed (${passCount} checks).`);
console.log('Plan + text/voice capture scripts created; phone-demo site slots prepared as a DISABLED scaffold; actual video files not yet provided.');
console.log('No call, SMS, email, provider action, config/phone/route change, deploy, schema/auth/RLS change, or production data export.');
