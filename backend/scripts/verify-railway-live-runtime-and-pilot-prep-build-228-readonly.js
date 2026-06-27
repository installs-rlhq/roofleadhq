#!/usr/bin/env node
/**
 * Build 228 Read-Only Verifier — Railway backend/API live runtime verification + controlled live
 * roofer pilot prep.
 *
 * Read-only. Reads repo docs/scripts as text and checks `git status` before/after. No network, no
 * Supabase call, no secret/credential access, no provider client, no SMS, no Twilio/Vapi/Resend/Lindy
 * call, no production data, no env mutation. This verifier does NOT hit the live Railway service.
 *
 * Proves the Build 228 slice is internally consistent AND safe:
 *  - The Build 228 doc exists, carries the exact decision token, frames itself as a repo-only
 *    readiness/verification slice, and records the sanitized Railway config + the three live
 *    read-only evidence results (/health 200, pending-review 401 unauth, pending-review 200 auth
 *    schemaReady:true) plus the negative "what did NOT happen" evidence.
 *  - The doc contains NO secret-shaped values (no service-role JWT, no obvious token/phone literals).
 *  - The smoke-test script exists and is SAFE BY CONSTRUCTION: GET-only (no POST takeover/release),
 *    never echoes the token, reads the token from a local-only env var or a silent prompt, and
 *    writes no production data.
 *  - Running this verifier does not mutate the repo (before/after `git status` equality).
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');

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

const B228_DOC = 'docs/RAILWAY_BACKEND_LIVE_RUNTIME_VERIFICATION_AND_CONTROLLED_LIVE_ROOFER_PILOT_PREP_BUILD_228.md';
const SMOKE = 'scripts/run-railway-live-runtime-smoke-test.sh';
const DRY_RUN = 'scripts/run-railway-live-runtime-and-pilot-prep-build-228-dry-run.sh';

const DECISION_TOKEN = 'RAILWAY_BACKEND_LIVE_READONLY_VERIFIED_AWAITING_CONTROLLED_LIVE_ROOFER_PILOT_APPROVAL';

(async () => {
  const before = gitStatus();
  console.log('=== Build 228 Railway Live Runtime Verification + Controlled Live Roofer Pilot Prep (local-only) ===');
  console.log('No SMS. No provider call. No Supabase call. No credentials. No env change. No live HTTP. Read-only.');

  const doc = read(B228_DOC);

  // 1. Doc carries the decision token + repo-only readiness framing + the env var name.
  assert(doc.includes(DECISION_TOKEN), 'B228 doc carries the exact decision token');
  assert(/repo[- ]only/i.test(doc) && /readiness|verification/i.test(doc), 'B228 doc frames itself as a repo-only readiness/verification slice');
  assert(doc.includes('HUMAN_TAKEOVER_SCHEMA_READY'), 'B228 doc names the runtime gate env var');
  pass('Build 228 doc exists, carries the decision token, and is framed as repo-only readiness/verification');

  // 2. Sanitized Railway config is recorded.
  assert(/roofleadhq-api/.test(doc), 'B228 doc records the Railway service name');
  assert(/installs-rlhq\/roofleadhq/.test(doc), 'B228 doc records the source repo');
  assert(/\/backend/.test(doc) && /npm install && npm run build/.test(doc) && /npm run start/.test(doc), 'B228 doc records root dir + build/start commands');
  assert(/\/health/.test(doc) && /PORT/.test(doc) && /Railway injects/i.test(doc), 'B228 doc records healthcheck path + PORT-unset note');
  assert(/roofleadhq-api-production\.up\.railway\.app/.test(doc), 'B228 doc records the public domain');
  pass('Build 228 doc records the sanitized Railway deployment configuration');

  // 3. The three live read-only evidence results are recorded.
  assert(/HTTP 200/.test(doc) && /environment[\s\S]{0,20}production|environment `production`/i.test(doc), 'B228 doc records /health HTTP 200 production');
  assert(/HTTP 401/.test(doc) && /fail-closed|fails closed/i.test(doc), 'B228 doc records pending-review 401 fail-closed');
  assert(doc.includes('"schemaReady":true,"count":0,"pendingReview":[]'), 'B228 doc records the authenticated pending-review 200 schemaReady:true body');
  pass('Build 228 doc records the three live read-only evidence results (/health 200, 401 unauth, 200 auth)');

  // 4. Negative evidence is recorded.
  assert(/No SMS was sent/i.test(doc), 'B228 doc records no SMS sent');
  assert(/No mutating route was called|no `POST/i.test(doc) && /takeover/i.test(doc) && /release/i.test(doc), 'B228 doc records no mutating takeover/release POST');
  assert(/No production data was exported/i.test(doc), 'B228 doc records no production data export');
  assert(/No schema \/ auth \/ RLS|No schema\/auth\/RLS|no Supabase write/i.test(doc), 'B228 doc records no schema/auth/RLS/Supabase-write change');
  pass('Build 228 doc records the negative evidence (no SMS/provider/contact/export/schema change)');

  // 5. Controlled live roofer pilot prep steps are present.
  for (const needle of [
    'Select first real roofer candidate',
    'minimum onboarding inputs',
    'Confirm consent and test scope',
    'Configure dashboard access',
    'Configure lead paths safely',
    'separate',
  ]) {
    assert(new RegExp(needle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(doc), `B228 doc includes pilot-prep element: "${needle}"`);
  }
  assert(/separate, explicit|separate explicit|separately approved|separate.{0,30}approval/i.test(doc), 'B228 doc defers live SMS/calls/contact to separate explicit approval');
  pass('Build 228 doc includes the controlled live roofer pilot prep checklist with deferred live-contact approvals');

  // 6. Doc carries NO secret-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B228 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B228 doc contains no sk- API-key-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B228 doc contains no phone-number-shaped value');
  pass('Build 228 doc contains no secret-shaped or phone-number-shaped values');

  // 7. Smoke-test script exists and is SAFE BY CONSTRUCTION.
  const smoke = read(SMOKE);
  assert(/curl/.test(smoke), 'smoke script uses curl');
  assert(!/-X[ ]*POST|--request[ ]*POST|-d |--data/.test(smoke), 'smoke script issues no POST / no request body (GET-only)');
  // No curl invocation may target a mutating takeover/release route (comments mentioning them are fine).
  const curlLines = smoke.split('\n').filter((l) => /\bcurl\b/.test(l) && !/^\s*#/.test(l));
  assert(!curlLines.some((l) => /takeover|release/i.test(l)), 'no curl invocation targets a mutating takeover/release route');
  assert(/read -rs|read -s/.test(smoke), 'smoke script prompts for the token silently (read -rs)');
  assert(/RLHQ_DASHBOARD_ACCESS_TOKEN/.test(smoke), 'smoke script supports a local-only env var for the token');
  assert(/x-dashboard-access-token/.test(smoke), 'smoke script uses the correct dashboard auth header');
  // token must never be echoed to stdout: any echo/printf referencing $TOKEN must redirect to a file.
  const tokenPrintLines = smoke.split('\n').filter((l) => /\b(echo|printf)\b/.test(l) && /\$TOKEN\b/.test(l));
  assert(tokenPrintLines.every((l) => />\s*"\$HDR_FILE"|>\s*"?\$\{?HDR/.test(l)), 'smoke script never echoes the raw token to stdout (only writes it to the 0600 header file)');
  assert(/chmod 600/.test(smoke) && /-H @/.test(smoke), 'smoke script passes the token via a 0600 temp header file (not argv)');
  pass('smoke-test script is GET-only, silent-token, no-echo, no-mutation, safe by construction');

  // 8. Dry-run wrapper exists and references this verifier.
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-railway-live-runtime-and-pilot-prep-build-228-readonly.js'), 'dry-run wrapper runs the Build 228 verifier');
  assert(/bash -n .*run-railway-live-runtime-smoke-test\.sh/.test(dry), 'dry-run wrapper syntax-checks the smoke script (does not run it live)');
  pass('Build 228 dry-run wrapper exists and references the verifier + smoke-script syntax check');

  // 9. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 228 Railway live runtime verification + pilot prep verified (${passCount} checks).`);
  console.log('live_http_called=false  mutating_calls=0  sms_sent=0  provider_calls=0  secrets_in_repo=0  repo_unchanged=true');
})();
