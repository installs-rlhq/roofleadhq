#!/usr/bin/env node
/**
 * Build 283 Verifier — Build 282 Runtime Deployment Evidence + One-Call Live Booking Observation Approval
 * (repo-only, offline).
 *
 * Strategic goal: capture sanitized evidence that Build 282 commit 613ce56 is DEPLOYED on Railway service
 * roofleadhq-api (unauthenticated GET /health -> commit_short=613ce56, environment=production), which means
 * the Build 281 Structured-Outputs booking fix (72f834f, an ancestor of 613ce56) is LIVE — and, only
 * because runtime deployment is now confirmed, create the separate narrow one-call live booking observation
 * retest approval that Build 282 explicitly withheld.
 *
 * This verifier (in-process, real compiled backend; non-mutating):
 *   1. Source-of-truth: Build 282 commit 613ce56 is an ancestor of / equal to HEAD (and Build 281 72f834f
 *      is an ancestor of 613ce56 — i.e. the fix is included before the deployed commit).
 *   2. Build 281 fix source still present AND behaviorally intact (live-shape structuredOutputs payload
 *      normalizes appointment_booked=true + time populated) — proving the fix that is now deployed works.
 *   3. Build 282 /health commit marker source present and behaves: RAILWAY_GIT_COMMIT_SHA=613ce56... ->
 *      full SHA + commit_short 613ce56; unset -> unknown. This is exactly what makes the runtime evidence
 *      readable with no secret and no dashboard.
 *   4. Build 283 evidence doc grounds honest DEPLOYED statuses (deployed / deployed_and_verified /
 *      613ce56 / partial_pass_booking_gap_until_live_fix_observed) and records the sanitized /health values,
 *      with no env/config/schema/provider change and no call/SMS/contact.
 *   5. Build 283 approval packet grounds: live_booking_observation_retest_approval_status=created, exactly
 *      one Jason-owned physical-phone PSTN call, target clean Vapi Test Number last-4 0389 only, and the
 *      full NOT-ALLOWED boundary (no retry/SMS/Twilio/Retell/Vapi/Railway/schema/export/deploy-during-test).
 *   6. Both docs carry no secret / PII / raw phone / UUID / email (roofer row label + commit SHA scrubbed).
 *   7. Prerequisite commits present (Build 282/281/280/279/278/277/276/271); predecessor docs present.
 *   8. Non-mutating (tracked files unchanged; dist is gitignored).
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no call,
 * no SMS, no Twilio, no Retell, no Vapi API, no deploy, no config change, no schema/RLS change, no secret
 * read, no production DB read/export. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237.
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');
const backendRoot = path.resolve(__dirname, '..');

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function assert(cond, message) { if (!cond) fail(message); }

function gitStatus() {
  return execFileSync('git', ['status', '--porcelain'], { cwd: repoRoot, encoding: 'utf8' });
}
function read(rel) {
  const p = path.join(repoRoot, rel);
  assert(fs.existsSync(p), `expected file missing: ${rel}`);
  return fs.readFileSync(p, 'utf8');
}
function readJson(rel) { return JSON.parse(read(rel)); }
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

const EVIDENCE_DOC = 'docs/BUILD_282_RUNTIME_DEPLOYMENT_EVIDENCE_BUILD_283.md';
const APPROVAL_DOC = 'docs/LIVE_BOOKING_OBSERVATION_RETEST_APPROVAL_BUILD_283.md';
const B282_DOC = 'docs/BUILD_281_DEPLOYMENT_READINESS_AND_BACKEND_DEPLOY_APPROVAL_BUILD_282.md';
const B279_APPROVAL_DOC = 'docs/CONTROLLED_PSTN_BOOKING_REVALIDATION_APPROVAL_BUILD_279.md';

const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';
const CONFIG_SRC = 'backend/src/config/config.ts';
const INDEX_SRC = 'backend/src/index.ts';

const SAMPLES = 'docs/samples';
const FIX_LIVE_SHAPE = `${SAMPLES}/vapi-event-structured-outputs-appointment-live-shape.fake.json`;

const B282_COMMIT = '613ce56';
const B282_COMMIT_FULL = '613ce56a115e8b5ebb089d751958a7a09b2b2605';
const B281_COMMIT = '72f834f';
const B280_COMMIT = 'dc66c9b';
const B279_COMMIT = 'fa04692';
const B278_COMMIT = '2c98570';
const B277_COMMIT = '5b723f8';
const B276_COMMIT = 'b642e93';
const B271_COMMIT = '4d36bdf';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

function assertNoSecretsPiiPhone(doc, label) {
  // Scrub the known-safe roofer row label (10-digit roofer id) and the intentional commit SHA before the
  // phone/UUID sweep — same approach as the Build 280 verifier.
  const scrubbed = doc
    .replace(/Launch Test Roofing 1780434363/g, 'ROW_LABEL')
    .replace(new RegExp(B282_COMMIT_FULL, 'g'), 'COMMIT_SHA');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), `${label} contains no JWT-shaped secret`);
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), `${label} contains no sk- API-key-shaped secret`);
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), `${label} contains no token-shaped secret`);
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc), `${label} contains no raw UUID`);
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed), `${label} contains no phone-number-shaped value`);
  assert(!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(doc), `${label} contains no email address`);
}

(async function main() {
  const before = gitStatus();
  console.log('=== Build 283 Build-282 Runtime Deployment Evidence + One-Call Live Booking Observation Approval (repo-only, in-process) ===');
  console.log('No call. No retry. No SMS. No Vapi Test/Talk/webCall. No curl. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No deploy. No config change. No schema/RLS change. No secret file read. No production DB read/export. Captures sanitized runtime-deployment evidence for Build 282 (613ce56) and grounds the narrow one-call live booking observation approval.');

  // --- 0. Source-of-truth: Build 282 commit is an ancestor of / equal to HEAD, and Build 281 is before it. ---
  assert(isAncestorOrEqual(B282_COMMIT),
    'Build 282 commit 613ce56 is an ancestor of (or equal to) HEAD — building on 613ce56 or later');
  pass('source-of-truth: HEAD is at Build 282 (613ce56) or later');
  assert(isAncestorOrEqual(B281_COMMIT, B282_COMMIT_FULL),
    'Build 281 fix commit 72f834f is an ancestor of the deployed Build 282 commit 613ce56 (fix included before deploy)');
  pass('Build 281 fix (72f834f) is included before the deployed Build 282 commit (613ce56)');

  // --- 1. Build 281 fix source still present. ---
  const svcSrc = read(SERVICE_SRC);
  assert(/structuredOutputs/.test(svcSrc) && /function\s+extractStructuredOutputValue/.test(svcSrc),
    'Build 281 structuredOutputs reader still present in the service source (fix not reverted)');
  pass('Build 281 Structured-Outputs normalizer fix source still present');

  // --- 2. Build 282 /health commit marker source present. ---
  const cfgSrc = read(CONFIG_SRC);
  assert(/gitCommitSha/.test(cfgSrc) && /RAILWAY_GIT_COMMIT_SHA/.test(cfgSrc),
    'config.ts sources gitCommitSha from RAILWAY_GIT_COMMIT_SHA (with fallbacks)');
  const idxSrc = read(INDEX_SRC);
  assert(/\/health/.test(idxSrc) && /commit/.test(idxSrc) && /commit_short/.test(idxSrc) &&
    /config\.gitCommitSha/.test(idxSrc),
    '/health route reports commit + commit_short from config.gitCommitSha');
  pass('Build 282 /health commit marker source present (config.gitCommitSha + /health commit fields)');

  // --- 3. Compile the CURRENT backend (dist is gitignored: no tracked-file churn). ---
  const tscBin = path.join(backendRoot, 'node_modules/.bin/tsc');
  assert(fs.existsSync(tscBin), 'local tsc is available for the behavioral build');
  execFileSync(tscBin, [], { cwd: backendRoot, stdio: 'pipe' });
  assert(fs.existsSync(DIST_SERVICE) && fs.existsSync(DIST_CONFIG), 'compiled service + config exist after build');
  pass('backend compiled (tsc) for in-process behavioral verification');

  // --- 4. Behavioral: /health commit marker resolves to the DEPLOYED SHA + short form. ---
  {
    const cfgResolved = require.resolve(DIST_CONFIG);
    const commitEnvKeys = ['RAILWAY_GIT_COMMIT_SHA', 'GIT_COMMIT_SHA', 'SOURCE_VERSION', 'SOURCE_COMMIT'];
    const saved = {};
    for (const k of commitEnvKeys) saved[k] = process.env[k];

    // Case A: Railway injects the deployed Build 282 commit SHA -> /health reports it.
    for (const k of commitEnvKeys) delete process.env[k];
    process.env.RAILWAY_GIT_COMMIT_SHA = B282_COMMIT_FULL;
    delete require.cache[cfgResolved];
    let cfg = require(DIST_CONFIG).default;
    const commitA = cfg.gitCommitSha || 'unknown';
    assert(commitA === B282_COMMIT_FULL, 'commit marker reflects the deployed Build 282 SHA when injected');
    assert(commitA.slice(0, 7) === B282_COMMIT, `commit_short resolves to the deployed short SHA (${B282_COMMIT})`);

    // Case B: no commit env -> unknown (a build predating the marker). The live /health is NOT this case.
    for (const k of commitEnvKeys) delete process.env[k];
    delete require.cache[cfgResolved];
    cfg = require(DIST_CONFIG).default;
    const commitB = cfg.gitCommitSha || 'unknown';
    assert(commitB === 'unknown', 'commit marker resolves to unknown when no commit env is present');

    for (const k of commitEnvKeys) { if (saved[k] === undefined) delete process.env[k]; else process.env[k] = saved[k]; }
    delete require.cache[cfgResolved];
  }
  pass(`commit marker behavior: deployed SHA -> full + short ${B282_COMMIT}; unset -> unknown (matches the captured live /health)`);

  // --- 5. Behavioral: Build 281 fix still works (live-shape structuredOutputs -> booked=true + time). ---
  {
    const svc = require(DIST_SERVICE);
    const live = readJson(FIX_LIVE_SHAPE);
    const nz = svc.normalizeVapiCallCompletedPayload(live);
    assert(nz.appointment_booked === true && nz.appointment_requested === true &&
      typeof nz.appointment_time === 'string' && nz.appointment_time.length > 0,
      'live-shape structuredOutputs still normalizes booked=true, requested=true, time populated');
  }
  pass('Build 281 fix behaviorally intact at HEAD (the now-deployed structuredOutputs reader works)');

  // --- 6. Build 283 evidence doc grounding: honest DEPLOYED statuses + captured /health values. ---
  const edoc = read(EVIDENCE_DOC);
  const EVIDENCE_TOKENS = [
    'build_281_fix_status = offline_replay_passed',
    'build_281_runtime_deployment_status = deployed',
    'build_282_health_marker_status = deployed_and_verified',
    'deployed_commit_short = 613ce56',
    'first_roofer_e2e_status = partial_pass_booking_gap_until_live_fix_observed',
    'no_new_call_placed = true',
    'no_retry_performed = true',
    'no_sms_sent = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_vapi_config_changed = true',
    'no_phone_number_changed = true',
    'no_railway_env_or_config_changed = true',
    'no_backend_deploy_by_agent = true',
    'no_schema_auth_rls_changed = true',
    'no_production_data_export = true',
    'no_secret_printing = true',
    'full_clean_vapi_number_recorded_in_repo = false',
  ];
  for (const t of EVIDENCE_TOKENS) assert(edoc.includes(t), `B283 evidence doc missing status token: ${t}`);
  assert(/roofleadhq-api/.test(edoc), 'B283 evidence doc names the Railway service roofleadhq-api');
  assert(edoc.includes(B282_COMMIT_FULL), 'B283 evidence doc records the full deployed commit SHA');
  assert(/environment\s*=\s*production/.test(edoc), 'B283 evidence doc records /health environment=production');
  assert(/status\s*=\s*ok/.test(edoc), 'B283 evidence doc records /health status=ok');
  assert(/commit_short\s*=\s*613ce56/.test(edoc), 'B283 evidence doc records /health commit_short=613ce56');
  assert(/72f834f/.test(edoc), 'B283 evidence doc references the Build 281 fix commit 72f834f');
  assert(/613ec56/.test(edoc), 'B283 evidence doc explicitly resolves the 613ec56 short-hash typo');
  assert(/not read/i.test(edoc) && /\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(edoc),
    'B283 evidence doc states the local secret file was not read');
  pass('B283 evidence doc grounds honest deployed statuses, captured /health values, and typo resolution');

  // --- 7. Build 283 approval packet grounding: created + narrow one-call boundary. ---
  const adoc = read(APPROVAL_DOC);
  const APPROVAL_TOKENS = [
    'live_booking_observation_retest_approval_status = created',
    'approval_type = one_live_booking_observation_pstn_call',
    'approved_call_count = 1',
    'approved_target = clean_vapi_test_number_last4_0389',
    'precondition_build_282_runtime_deployment_status = deployed',
    'precondition_build_281_fix_runtime_status = live',
    'deployed_commit_short = 613ce56',
    'no_retry_without_separate_approval = true',
    'no_sms = true',
    'no_twilio_change = true',
    'no_retell_change = true',
    'no_vapi_config_change_during_test = true',
    'no_railway_or_backend_config_env_deploy_restart_during_test = true',
    'no_schema_auth_rls_change = true',
    'no_production_data_export = true',
    'no_real_homeowner_contact = true',
    'no_real_roofer_contact_beyond_controlled_pilot = true',
    'no_call_placed = true',
    'full_clean_vapi_number_recorded_in_repo = false',
  ];
  for (const t of APPROVAL_TOKENS) assert(adoc.includes(t), `B283 approval doc missing status token: ${t}`);
  assert(/exactly one/i.test(adoc) && /physical-phone/i.test(adoc), 'B283 approval doc scopes exactly one physical-phone call');
  assert(/0389/.test(adoc), 'B283 approval doc targets the clean Vapi test number last-4 0389');
  assert(/observe live/i.test(adoc) || /live booking/i.test(adoc), 'B283 approval doc purpose is live booking observation');
  assert(/non-null\s+`?booking_id`?/i.test(adoc), 'B283 approval doc states the success criterion (non-null booking_id)');
  // Honest gating: the approval must be predicated on confirmed deployment, not overclaim an observed booking.
  assert(!/booking_persistence_status = passed/.test(adoc),
    'B283 approval doc must NOT claim booking persistence is already observed (that requires the call)');
  assert(/\bno\b[^.\n]*\bcall\b[^.\n]*\bthis build\b/i.test(adoc) || /no_call_placed_by_this_build = true/.test(adoc),
    'B283 approval doc states this build places no call');
  pass('B283 approval doc grounds live_booking_observation_retest_approval_status=created within the narrow one-call boundary');

  // --- 8. Both docs carry no secret / PII / raw phone / UUID / email. ---
  assertNoSecretsPiiPhone(edoc, 'B283 evidence doc');
  assertNoSecretsPiiPhone(adoc, 'B283 approval doc');
  pass('B283 evidence + approval docs carry no secret / PII / raw phone / UUID / email');

  // --- 9. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B282_COMMIT), 'Build 282 prerequisite commit 613ce56 present in git history');
  assert(commitPresent(B281_COMMIT), 'Build 281 prerequisite commit 72f834f present in git history');
  assert(commitPresent(B280_COMMIT), 'Build 280 prerequisite commit dc66c9b present in git history');
  assert(commitPresent(B279_COMMIT), 'Build 279 prerequisite commit fa04692 present in git history');
  assert(commitPresent(B278_COMMIT), 'Build 278 prerequisite commit 2c98570 present in git history');
  assert(commitPresent(B277_COMMIT), 'Build 277 prerequisite commit 5b723f8 present in git history');
  assert(commitPresent(B276_COMMIT), 'Build 276 prerequisite commit b642e93 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(fs.existsSync(path.join(repoRoot, B282_DOC)), 'Build 282 deploy-readiness/approval doc still present');
  assert(fs.existsSync(path.join(repoRoot, B279_APPROVAL_DOC)), 'Build 279 controlled-PSTN approval doc still present');
  pass('Build 282 + 281 + 280 + 279 + 278 + 277 + 276 + 271 prerequisite commits present and predecessor docs exist');

  // --- 10. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 283 Build-282 Runtime Deployment Evidence + One-Call Live Booking Observation Approval verified (${passCount} checks).`);
  console.log('build_mode=build_282_runtime_deployment_evidence_and_live_booking_observation_approval_repo_only  build_283_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_282_redone=false  build_281_fix_status=offline_replay_passed  build_281_runtime_deployment_status=deployed  build_282_health_marker_status=deployed_and_verified  deployed_commit_short=613ce56  live_booking_observation_retest_approval_status=created  first_roofer_e2e_status=partial_pass_booking_gap_until_live_fix_observed  no_new_call_placed=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_phone_number_changed=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_env_var_changed=true  no_backend_deploy_by_agent=true  no_secret_printing=true  real_supabase_used=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
