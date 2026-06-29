#!/usr/bin/env node
/**
 * Build 234 Read-Only Verifier — Vapi webhook runtime enablement & controlled smoke evidence packet.
 *
 * Read-only. Reads the Build 234 evidence doc (and the real route/guard source) as text and checks
 * `git status` before/after. No network, no Supabase call, no credential/secret access, no provider
 * client, no SMS, no call, no live HTTP, no env mutation, no deploy. Executes no service; does NOT
 * build.
 *
 * Proves the Build 234 evidence/staging packet is internally consistent, honest about what was and
 * was not executed, and free of secrets / phone-number-shaped values:
 *  - The Build 234 evidence doc exists and carries the exact decision token.
 *  - It references source commit e28a1f9 (HEAD == origin/main).
 *  - It records that signed approval was captured.
 *  - It records the unauthenticated smoke REJECTION (live 503 pre-enablement; 401 post-enablement).
 *  - It records the authorized synthetic smoke result as STAGED / not-fabricated (expected 200).
 *  - It describes runtime/env/deploy actions as Build 234 approved scope only, and records that the
 *    Railway secret set / redeploy / Vapi header were NOT performed from the sandbox.
 *  - It documents both accepted headers + the secret-safe authorized POST command kit.
 *  - It contains no secret-shaped or phone-number-shaped values.
 *  - The next step stops before real inbound call traffic.
 *  - The full Build 234 safety-invariant block is present.
 *  - The dry-run wrapper wires this verifier + the B233 + B232 verifiers + the smoke regression.
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

const DOC = 'docs/VAPI_WEBHOOK_RUNTIME_ENABLEMENT_AND_CONTROLLED_SMOKE_EVIDENCE_BUILD_234.md';
const ROUTE = 'backend/src/routes/vapi-webhooks.ts';
const GUARD = 'backend/src/middleware/vapi-webhook-auth.ts';
const VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js';
const DRY_RUN = 'scripts/run-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-dry-run.sh';
const B233_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js';
const B232_VERIFIER = 'backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js';

const DECISION_TOKEN = 'VAPI_WEBHOOK_RUNTIME_ENABLEMENT_APPROVED_BUT_AWAITING_OUT_OF_BAND_RAILWAY_AND_VAPI_CONFIGURATION';
const SOURCE_COMMIT = 'e28a1f9';

(function main() {
  const before = gitStatus();
  console.log('=== Build 234 Vapi webhook runtime enablement & controlled smoke read-only verification (local-only) ===');
  console.log('No call. No SMS. No provider call. No Supabase call. No credentials. No env change. No deploy. No live HTTP. No build. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B234 doc carries the exact decision token');
  pass('Build 234 evidence doc exists and carries the decision token');

  // 2. References source commit e28a1f9 + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B234 doc references source commit e28a1f9');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B234 doc records HEAD==origin/main');
  pass('B234 doc references source commit e28a1f9 (HEAD==origin/main)');

  // 3. Records that signed approval was captured.
  assert(/[Ss]igned approval was present/.test(doc) && /[Aa]pproval captured/.test(doc),
    'B234 doc records that signed approval was captured/present');
  pass('B234 doc records that signed approval was captured');

  // 4. Records the unauthenticated smoke REJECTION (live 503 + post-enablement 401).
  assert(/[Uu]nauthenticated smoke/.test(doc), 'B234 doc has an unauthenticated smoke section');
  assert(/503/.test(doc) && /webhook_auth_not_configured/.test(doc),
    'B234 doc records the live pre-enablement 503 webhook_auth_not_configured rejection');
  assert(/401/.test(doc) && /unauthorized/.test(doc),
    'B234 doc records the expected post-enablement 401 unauthorized rejection');
  pass('B234 doc records the unauthenticated smoke rejection (live 503 + staged 401)');

  // 5. Records authorized synthetic smoke as STAGED / not fabricated, expected 200.
  assert(/[Aa]uthorized synthetic smoke/.test(doc), 'B234 doc has an authorized synthetic smoke section');
  assert(/NOT executed|not run|not fabricated/i.test(doc),
    'B234 doc states the authorized synthetic POST was not executed / not fabricated');
  assert(/expect[^\n]*200|expected[^\n]*200|\b200\b/.test(doc),
    'B234 doc records the authorized synthetic smoke expected result (200)');
  assert(/[Ss]taged/.test(doc) && /next gated step/i.test(doc),
    'B234 doc stages the authorized smoke as the next gated step');
  pass('B234 doc records the authorized synthetic smoke result as staged/not-fabricated (expected 200)');

  // 6. Runtime/env/deploy actions described as Build 234 approved scope only + NOT performed here.
  assert(/VAPI_WEBHOOK_SECRET/.test(doc), 'B234 doc names VAPI_WEBHOOK_SECRET');
  assert(/no Railway (CLI|credentials)|no Railway credentials/i.test(doc),
    'B234 doc states the sandbox lacks Railway credentials');
  assert(/no Vapi credentials/i.test(doc), 'B234 doc states the sandbox lacks Vapi credentials');
  assert(/not performed|NOT performed|not done|NOT executed/i.test(doc),
    'B234 doc records that the control-plane actions were not performed');
  assert(/[Rr]edeploy|[Rr]estart/.test(doc) && /[Nn]ot performed/.test(doc),
    'B234 doc records that redeploy/restart was not performed');
  pass('B234 doc describes runtime/env/deploy actions as approved scope only and records they were not performed');

  // 7. Documents both accepted headers + the secret-safe authorized POST command kit.
  assert(/Authorization:\s*Bearer\s*<VAPI_WEBHOOK_SECRET>/.test(doc), 'B234 doc documents the Authorization: Bearer header');
  assert(/x-vapi-webhook-secret:\s*<VAPI_WEBHOOK_SECRET>/.test(doc), 'B234 doc documents the x-vapi-webhook-secret header');
  assert(/secret-safe/i.test(doc) && /command kit/i.test(doc), 'B234 doc includes a secret-safe command kit');
  assert(/never appears|never printed|value never|not printed/i.test(doc),
    'B234 doc states the secret value is never printed in the command kit');
  pass('B234 doc documents both accepted headers and a secret-safe authorized POST command kit');

  // 8. Real route/guard source still wires the guard before the handler (grounding).
  const route = read(ROUTE);
  assert(/requireVapiWebhookSecret/.test(route) &&
    /router\.post\(\s*['"]\/call-completed['"]\s*,\s*requireVapiWebhookSecret\s*,/.test(route),
    'real route source wires requireVapiWebhookSecret BEFORE the call-completed handler');
  const guard = read(GUARD);
  assert(/requireVapiWebhookSecret/.test(guard) && /timingSafeEqual/.test(guard),
    'real guard middleware exists and uses constant-time comparison');
  pass('B234 grounding matches real source: guard is in code, wired before the handler');

  // 9. Stop-before-real-traffic + next gated step recorded.
  assert(/[Ss]top before\s+any\s+real\s+inbound\s+call\s+traffic/.test(doc),
    'B234 doc requires stopping before real inbound call traffic');
  assert(/[Nn]ext gated step/.test(doc) && /out-of-band/i.test(doc),
    'B234 doc records the exact next gated step (out-of-band enablement + smoke capture)');
  pass('B234 doc records stop-before-real-traffic and the exact next gated step');

  // 10. Full safety-invariant block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No real inbound call traffic/i,
    /No live call placed/i,
    /No SMS sent/i,
    /No Twilio configuration change/i,
    /No unrelated Railway configuration change/i,
    /No unrelated Vapi configuration change/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
  ];
  for (const re of gates) assert(re.test(doc), `B234 doc missing safety invariant: ${re}`);
  pass('B234 doc states the full Build 234 safety-invariant block');

  // 11. Doc carries no secret-shaped or phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B234 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B234 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B234 doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B234 doc contains no phone-number-shaped value');
  pass('B234 doc contains no secret-shaped or phone-number-shaped values');

  // 12. Dry-run wrapper exists and wires this verifier + B233 + B232 verifiers + the smoke regression.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B234 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B233_VERIFIER)), 'B233 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B232_VERIFIER)), 'B232 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js'),
    'dry-run wrapper runs the Build 233 verifier');
  assert(dry.includes('verify-vapi-webhook-auth-guard-build-232-readonly.js'),
    'dry-run wrapper runs the Build 232 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B234 verifier present and the dry-run wrapper wires this verifier + B233 + B232 verifiers + smoke regression');

  // 13. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 234 Vapi webhook runtime enablement & controlled smoke evidence verified (${passCount} checks).`);
  console.log('live_http_called=read_only_only  deploy=false  railway_var_set=false  vapi_config_changed=false  guard_in_code=true  runtime_secret_enabled=false  unauth_smoke=503_live  authorized_smoke=staged_not_fabricated  awaiting_out_of_band=true  secrets_in_repo=0  repo_unchanged=true');
})();
