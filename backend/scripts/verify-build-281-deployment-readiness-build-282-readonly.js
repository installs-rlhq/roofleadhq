#!/usr/bin/env node
/**
 * Build 282 Verifier — Build 281 Deployment Readiness + Narrow Backend Deploy Approval (repo-only, offline).
 *
 * Strategic goal: without triggering another PSTN call, determine runtime-deployment readiness for the
 * Build 281 Structured-Outputs normalizer fix and prepare the exact narrow approval needed to deploy it.
 * Deployment status is UNKNOWN this turn (no Railway tooling available to the agent, no sanitized Railway
 * evidence supplied, and — until this build — no runtime commit marker to interrogate). So this build does
 * NOT deploy; it adds a secretless deploy-verification marker to GET /health and grounds a narrow deploy
 * approval packet, withholding the next live-call approval until deployment is confirmed.
 *
 * This verifier (in-process, real compiled backend; non-mutating):
 *   1. Confirms Build 281 fix source is still present (structuredOutputs reader) AND behaviorally intact
 *      (live-shape structuredOutputs payload normalizes appointment_booked=true + time populated).
 *   2. Confirms the Build 282 /health commit marker source is present (config.gitCommitSha + /health commit
 *      fields) and behaves: with RAILWAY_GIT_COMMIT_SHA set -> full SHA + 7-char short; unset -> 'unknown'.
 *   3. Confirms /health exposes NO secret (no supabase/vapi keys in the health response source).
 *   4. Confirms source-of-truth: commit 72f834f (Build 281) is an ancestor of / equal to HEAD.
 *   5. Grounds the Build 282 doc: honest deployment_status=unknown, deploy approval created, live-call
 *      approval withheld, and the narrow approval scope (roofleadhq-api only; no env/config/schema change).
 *   6. Doc carries no secret / PII / raw phone / UUID / email.
 *   7. Prerequisite commits present (Build 281/280/279/278/277/276/271); predecessor docs present.
 *   8. Non-mutating (tracked files unchanged; dist is gitignored).
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no call,
 * no SMS, no Twilio, no Retell, no Vapi API, no deploy, no config change, no schema/RLS change, no secret
 * read, no production DB read/export. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Reserved
 * fictional 555-01xx numbers only.
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
function isAncestorOrEqual(sha) {
  try {
    execFileSync('git', ['merge-base', '--is-ancestor', sha, 'HEAD'], { cwd: repoRoot, encoding: 'utf8' });
    return true;
  } catch (_e) { return false; }
}

const DOC = 'docs/BUILD_281_DEPLOYMENT_READINESS_AND_BACKEND_DEPLOY_APPROVAL_BUILD_282.md';
const B281_EVIDENCE_DOC = 'docs/BUILD_280_BOOKING_PERSISTENCE_GAP_AND_FIX_BUILD_281.md';
const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';
const CONFIG_SRC = 'backend/src/config/config.ts';
const INDEX_SRC = 'backend/src/index.ts';

const SAMPLES = 'docs/samples';
const FIX_LIVE_SHAPE = `${SAMPLES}/vapi-event-structured-outputs-appointment-live-shape.fake.json`;

const B281_COMMIT = '72f834f';
const B280_COMMIT = 'dc66c9b';
const B279_COMMIT = 'fa04692';
const B278_COMMIT = '2c98570';
const B277_COMMIT = '5b723f8';
const B276_COMMIT = 'b642e93';
const B271_COMMIT = '4d36bdf';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

(async function main() {
  const before = gitStatus();
  console.log('=== Build 282 Build-281 Deployment Readiness + Narrow Backend Deploy Approval (repo-only, in-process) ===');
  console.log('No call. No retry. No SMS. No Vapi Test/Talk/webCall. No curl. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No deploy. No config change. No schema/RLS change. No secret file read. No production DB read/export. Determines runtime-deployment readiness for the Build 281 fix and grounds a narrow deploy approval packet; adds a secretless /health commit marker.');

  // --- 0. Source-of-truth: Build 281 commit is an ancestor of / equal to HEAD. ---
  assert(isAncestorOrEqual(B281_COMMIT),
    'Build 281 commit 72f834f is an ancestor of (or equal to) HEAD — building on 72f834f or later');
  pass('source-of-truth: HEAD is at Build 281 (72f834f) or later');

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

  // --- 3. /health exposes NO secret (health response references no secret config field). ---
  {
    // Isolate the /health handler block and assert it references none of the secret config fields.
    const m = idxSrc.match(/app\.get\('\/health'[\s\S]*?\}\);/);
    assert(m, '/health handler block located');
    const healthBlock = m[0];
    for (const secretField of ['supabaseServiceRoleKey', 'supabaseKey', 'vapiApiKey', 'vapiWebhookSecret']) {
      assert(!healthBlock.includes(secretField), `/health handler does not expose config.${secretField}`);
    }
    pass('/health handler exposes no secret config field (supabase/vapi keys never returned)');
  }

  // --- 4. Compile the CURRENT backend (dist is gitignored: no tracked-file churn). ---
  const tscBin = path.join(backendRoot, 'node_modules/.bin/tsc');
  assert(fs.existsSync(tscBin), 'local tsc is available for the behavioral build');
  execFileSync(tscBin, [], { cwd: backendRoot, stdio: 'pipe' });
  assert(fs.existsSync(DIST_SERVICE) && fs.existsSync(DIST_CONFIG), 'compiled service + config exist after build');
  pass('backend compiled (tsc) for in-process behavioral verification');

  // --- 5. Behavioral: commit marker resolves both ways. ---
  {
    const cfgResolved = require.resolve(DIST_CONFIG);
    const commitEnvKeys = ['RAILWAY_GIT_COMMIT_SHA', 'GIT_COMMIT_SHA', 'SOURCE_VERSION', 'SOURCE_COMMIT'];
    const saved = {};
    for (const k of commitEnvKeys) saved[k] = process.env[k];

    // Case A: Railway injects the commit SHA.
    for (const k of commitEnvKeys) delete process.env[k];
    process.env.RAILWAY_GIT_COMMIT_SHA = '72f834f093363f8af547b651640c843ffc765e8a';
    delete require.cache[cfgResolved];
    let cfg = require(DIST_CONFIG).default;
    const commitA = cfg.gitCommitSha || 'unknown';
    assert(commitA === '72f834f093363f8af547b651640c843ffc765e8a',
      'commit marker reflects RAILWAY_GIT_COMMIT_SHA when injected');
    assert(commitA.slice(0, 7) === '72f834f', 'commit_short would be the 7-char prefix (72f834f)');

    // Case B: no commit env (a build predating the marker / no injection).
    for (const k of commitEnvKeys) delete process.env[k];
    delete require.cache[cfgResolved];
    cfg = require(DIST_CONFIG).default;
    const commitB = cfg.gitCommitSha || 'unknown';
    assert(commitB === 'unknown', 'commit marker resolves to unknown when no commit env is present');

    for (const k of commitEnvKeys) { if (saved[k] === undefined) delete process.env[k]; else process.env[k] = saved[k]; }
    delete require.cache[cfgResolved];
  }
  pass('commit marker behavior: injected SHA -> full+short; unset -> unknown (secretless deploy verification)');

  // --- 6. Behavioral: Build 281 fix still works (live-shape structuredOutputs -> booked=true + time). ---
  {
    const svc = require(DIST_SERVICE);
    const live = readJson(FIX_LIVE_SHAPE);
    const nz = svc.normalizeVapiCallCompletedPayload(live);
    assert(nz.appointment_booked === true && nz.appointment_requested === true &&
      typeof nz.appointment_time === 'string' && nz.appointment_time.length > 0,
      'live-shape structuredOutputs still normalizes booked=true, requested=true, time populated');
  }
  pass('Build 281 fix behaviorally intact at HEAD (structuredOutputs still ingested)');

  // --- 7. Build 282 doc grounding: honest statuses + narrow approval scope. ---
  const doc = read(DOC);
  const DOC_TOKENS = [
    'build_281_fix_status = offline_replay_passed',
    'build_281_runtime_deployment_status = unknown',
    'deployment_approval_status = created',
    'live_booking_observation_retest_approval_status = withheld',
    'first_roofer_e2e_status = partial_pass_booking_gap_until_runtime_fix_verified',
    'no_new_call_placed = true',
    'no_retry_performed = true',
    'no_sms_sent = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_vapi_config_changed = true',
    'no_phone_number_changed = true',
    'no_schema_auth_rls_changed = true',
    'no_production_data_export = true',
    'no_env_var_changed = true',
    'no_backend_deploy_by_agent = true',
    'no_secret_printing = true',
    'full_clean_vapi_number_recorded_in_repo = false',
  ];
  for (const t of DOC_TOKENS) assert(doc.includes(t), `B282 doc missing status token: ${t}`);
  assert(/roofleadhq-api/.test(doc), 'B282 doc names the narrow Railway service scope (roofleadhq-api)');
  assert(/72f834f/.test(doc), 'B282 doc references the Build 281 fix commit 72f834f');
  assert(/GET\s+.*\/health/.test(doc) && /commit_short/.test(doc),
    'B282 doc documents the /health commit_short post-deploy verification');
  assert(/NARROW BACKEND DEPLOY APPROVAL/i.test(doc), 'B282 doc contains the narrow deploy approval packet');
  assert(/withheld/i.test(doc), 'B282 doc records the live-call approval is withheld until deployment confirmed');
  // Honest non-overclaim: must NOT assert the fix is deployed.
  assert(!/build_281_runtime_deployment_status = deployed\b/.test(doc),
    'B282 doc must NOT overclaim the Build 281 fix as deployed (no runtime evidence)');
  assert(/\bno deploy\b|does not deploy|makes no railway\s+deploy|not deploy/i.test(doc),
    'B282 doc states this build does not deploy');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not read/i.test(doc),
    'B282 doc states the local secret file was not read');
  pass('B282 doc grounds honest deployment_status=unknown, deploy approval created, live-call approval withheld, narrow scope');

  // --- 8. Doc carries no secret / PII / raw phone / UUID / email. ---
  {
    assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B282 doc contains no JWT-shaped secret');
    assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B282 doc contains no sk- API-key-shaped secret');
    assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B282 doc contains no token-shaped secret');
    // The Build 281 commit hash 72f834f appears intentionally; a full 40-hex is fine (a commit SHA, not a UUID).
    assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc), 'B282 doc contains no raw UUID');
    assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B282 doc contains no phone-number-shaped value');
    assert(!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(doc), 'B282 doc contains no email address');
  }
  pass('B282 doc carries no secret / PII / raw phone / UUID / email');

  // --- 9. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B281_COMMIT), 'Build 281 prerequisite commit 72f834f present in git history');
  assert(commitPresent(B280_COMMIT), 'Build 280 prerequisite commit dc66c9b present in git history');
  assert(commitPresent(B279_COMMIT), 'Build 279 prerequisite commit fa04692 present in git history');
  assert(commitPresent(B278_COMMIT), 'Build 278 prerequisite commit 2c98570 present in git history');
  assert(commitPresent(B277_COMMIT), 'Build 277 prerequisite commit 5b723f8 present in git history');
  assert(commitPresent(B276_COMMIT), 'Build 276 prerequisite commit b642e93 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(fs.existsSync(path.join(repoRoot, B281_EVIDENCE_DOC)), 'Build 281 evidence/fix doc still present');
  pass('Build 281 + 280 + 279 + 278 + 277 + 276 + 271 prerequisite commits present and Build 281 doc exists');

  // --- 10. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 282 Build-281 Deployment Readiness + Narrow Backend Deploy Approval verified (${passCount} checks).`);
  console.log('build_mode=build_281_deployment_readiness_and_deploy_approval_repo_only  build_282_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_281_fix_status=offline_replay_passed  build_281_runtime_deployment_status=unknown  deployment_approval_status=created  live_booking_observation_retest_approval_status=withheld  first_roofer_e2e_status=partial_pass_booking_gap_until_runtime_fix_verified  health_commit_marker_added=true  health_commit_marker_secretless=true  no_new_call_placed=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_phone_number_changed=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_env_var_changed=true  no_backend_deploy_by_agent=true  no_secret_printing=true  real_supabase_used=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
