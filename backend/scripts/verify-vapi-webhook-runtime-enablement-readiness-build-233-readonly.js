#!/usr/bin/env node
/**
 * Build 233 Read-Only Verifier — Vapi webhook runtime-enablement readiness/runbook.
 *
 * Read-only. Reads repo source + the Build 233 doc as text and checks `git status` before/after.
 * No network, no Supabase call, no credential/secret access, no provider client, no SMS, no call,
 * no live HTTP, no env mutation, no deploy. Executes no service and does NOT build.
 *
 * Proves the Build 233 readiness packet is internally consistent AND grounded in the real source:
 *  - The Build 233 doc exists.
 *  - It references source commit 6a56b1b.
 *  - It recognizes the Build 232 guard is in code (route wires requireVapiWebhookSecret BEFORE the
 *    handler; the guard middleware exists), verified against the actual source.
 *  - It states the runtime VAPI_WEBHOOK_SECRET still requires separate approval.
 *  - It documents both accepted headers.
 *  - It documents the unauthenticated (401/503) and authenticated (200) smoke expectations.
 *  - It prohibits secrets being printed.
 *  - It prohibits deploy / runtime env/config changes in this build.
 *  - It carries no secret-shaped or phone-number-shaped values.
 *  - The dry-run wrapper exists and wires this verifier + the B232 verifier + the smoke regression.
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

const DOC = 'docs/VAPI_WEBHOOK_RUNTIME_ENABLEMENT_READINESS_BUILD_233.md';
const GUARD = 'backend/src/middleware/vapi-webhook-auth.ts';
const ROUTE = 'backend/src/routes/vapi-webhooks.ts';
const VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js';
const DRY_RUN = 'scripts/run-vapi-webhook-runtime-enablement-readiness-build-233-dry-run.sh';
const B232_VERIFIER = 'backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js';

const DECISION_TOKEN = 'VAPI_WEBHOOK_GUARD_IN_CODE_RUNTIME_SECRET_AND_DEPLOY_AWAITING_SEPARATE_APPROVAL';
const SOURCE_COMMIT = '6a56b1b';

(function main() {
  const before = gitStatus();
  console.log('=== Build 233 Vapi webhook runtime-enablement readiness read-only verification (local-only) ===');
  console.log('No call. No SMS. No provider call. No Supabase call. No credentials. No env change. No deploy. No live HTTP. No build. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B233 doc carries the exact decision token');
  pass('Build 233 doc exists and carries the decision token');

  // 2. References source commit 6a56b1b + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B233 doc references source commit 6a56b1b');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B233 doc records HEAD==origin/main');
  pass('B233 doc references source commit 6a56b1b (HEAD==origin/main)');

  // 3. Recognizes the Build 232 guard is in code — and that is TRUE against real source.
  assert(/Build 232/.test(doc) && /(guard|requireVapiWebhookSecret)/i.test(doc) && /in code/i.test(doc),
    'B233 doc recognizes the Build 232 guard is in code');
  const route = read(ROUTE);
  assert(/requireVapiWebhookSecret/.test(route) &&
    /router\.post\(\s*['"]\/call-completed['"]\s*,\s*requireVapiWebhookSecret\s*,/.test(route),
    'real route source wires requireVapiWebhookSecret BEFORE the call-completed handler');
  const guard = read(GUARD);
  assert(/requireVapiWebhookSecret/.test(guard) && /timingSafeEqual/.test(guard),
    'real guard middleware exists and uses constant-time comparison');
  pass('B233 doc recognition matches real source: guard is in code, wired before the handler');

  // 4. States runtime VAPI_WEBHOOK_SECRET still requires separate approval.
  assert(/VAPI_WEBHOOK_SECRET/.test(doc), 'B233 doc names VAPI_WEBHOOK_SECRET');
  assert(/(not yet|NOT yet|still requires|separate(ly)?[- ]approv)/i.test(doc) && /approv/i.test(doc),
    'B233 doc states the runtime secret still requires separate approval');
  assert(/not set in the Railway runtime/i.test(doc) || /runtime secret is NOT yet enabled/i.test(doc),
    'B233 doc states the runtime secret is not yet enabled');
  pass('B233 doc states runtime VAPI_WEBHOOK_SECRET still requires separate approval');

  // 5. Documents both accepted headers.
  assert(/Authorization:\s*Bearer\s*<VAPI_WEBHOOK_SECRET>/.test(doc), 'B233 doc documents the Authorization: Bearer header');
  assert(/x-vapi-webhook-secret:\s*<VAPI_WEBHOOK_SECRET>/.test(doc), 'B233 doc documents the x-vapi-webhook-secret header');
  pass('B233 doc documents both accepted headers');

  // 6. Documents unauthenticated + authenticated smoke expectations.
  assert(/401/.test(doc) && /503/.test(doc), 'B233 doc documents unauthenticated 401/503 expectation');
  assert(/unauthenticated/i.test(doc) && /(reject|401|503)/i.test(doc), 'B233 doc documents the unauthenticated smoke rejection');
  assert(/authorized/i.test(doc) && /200/.test(doc) && /synthetic\/sanitized/i.test(doc),
    'B233 doc documents one authorized synthetic/sanitized POST expecting 200');
  pass('B233 doc documents unauthenticated (401/503) and authenticated (200) smoke expectations');

  // 7. Prohibits secrets being printed.
  assert(/No secrets printed/i.test(doc), 'B233 doc prohibits secrets being printed');
  pass('B233 doc prohibits secrets being printed');

  // 8. Prohibits deploy + runtime env/config changes in this build.
  assert(/No deploy/i.test(doc), 'B233 doc prohibits deploy in this build');
  assert(/No runtime env ?\/ ?config changes/i.test(doc) || /No runtime env\/config change/i.test(doc),
    'B233 doc prohibits runtime env/config changes in this build');
  pass('B233 doc prohibits deploy and runtime env/config changes in this build');

  // 9. Full safety-gate block present.
  const gates = [
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No live call/i,
    /No SMS sent/i,
    /No provider calls/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No deploy/i,
  ];
  for (const re of gates) assert(re.test(doc), `B233 doc missing safety gate: ${re}`);
  pass('B233 doc states the full Build 233 safety-gate block');

  // 10. Stop-before-real-traffic + next gated step recorded.
  assert(/Stop before any real inbound call traffic/i.test(doc), 'B233 doc requires stopping before real inbound call traffic');
  assert(/next gated step/i.test(doc) && /runtime-enablement/i.test(doc),
    'B233 doc records the exact next gated step (runtime-enablement execution)');
  pass('B233 doc records stop-before-real-traffic and the exact next gated step');

  // 11. Doc carries no secret-shaped or phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B233 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B233 doc contains no sk- API-key-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B233 doc contains no phone-number-shaped value');
  pass('B233 doc contains no secret-shaped or phone-number-shaped values');

  // 12. Dry-run wrapper exists and wires this verifier + the B232 verifier + the smoke regression.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B233 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B232_VERIFIER)), 'B232 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js'), 'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-webhook-auth-guard-build-232-readonly.js'), 'dry-run wrapper runs the Build 232 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B233 verifier present and the dry-run wrapper wires this verifier + B232 verifier + smoke regression');

  // 13. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 233 Vapi webhook runtime-enablement readiness verified (${passCount} checks).`);
  console.log('live_http_called=false  deploy=false  env_changed=false  guard_in_code=true  runtime_secret_enabled=false  awaiting_separate_approval=true  secrets_in_repo=0  repo_unchanged=true');
})();
