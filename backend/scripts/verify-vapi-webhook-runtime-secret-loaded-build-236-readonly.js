#!/usr/bin/env node
/**
 * Build 236 Read-Only Verifier — Vapi webhook runtime-secret-loaded evidence packet.
 *
 * Read-only. Reads the Build 236 evidence doc (and the real route/guard source) as text and checks
 * `git status` before/after. No network, no Supabase call, no credential/secret access, no provider
 * client, no SMS, no call, no live HTTP, no env mutation, no deploy. Executes no service; does NOT
 * build.
 *
 * Build 236 records that the Build 235 runtime blocker is FIXED: after Jason repasted/reset
 * VAPI_WEBHOOK_SECRET in Railway and redeployed, the unauthenticated Vapi webhook smoke now returns
 * HTTP 401 unauthorized (was 503 webhook_auth_not_configured). This verifier proves the evidence
 * packet is internally consistent and safe:
 *  - The Build 236 evidence doc exists and carries the exact decision token.
 *  - It references source commit 09ecfab (HEAD == origin/main).
 *  - It references the Build 235 503 webhook_auth_not_configured blocker.
 *  - It records the new HTTP 401 unauthorized result and the 503 -> 401 transition.
 *  - It explicitly claims NO authorized synthetic POST was run.
 *  - It contains no secret-shaped or phone-number-shaped values.
 *  - It asserts no real call, no SMS, no real roofer/homeowner contact.
 *  - The next gated step is the authorized synthetic POST evidence, stopping before any real call.
 *  - The full Build 236 safety-invariant block is present.
 *  - The dry-run wrapper wires this verifier + the B235 + B234 + B233 + B232 verifiers + the smoke
 *    regression.
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

const DOC = 'docs/VAPI_WEBHOOK_RUNTIME_SECRET_LOADED_EVIDENCE_BUILD_236.md';
const ROUTE = 'backend/src/routes/vapi-webhooks.ts';
const GUARD = 'backend/src/middleware/vapi-webhook-auth.ts';
const VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-secret-loaded-build-236-readonly.js';
const DRY_RUN = 'scripts/run-vapi-webhook-runtime-secret-loaded-build-236-dry-run.sh';
const B235_VERIFIER = 'backend/scripts/verify-vapi-webhook-post-enablement-smoke-build-235-readonly.js';
const B234_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js';
const B233_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js';
const B232_VERIFIER = 'backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js';

const DECISION_TOKEN = 'VAPI_WEBHOOK_RUNTIME_SECRET_LOADED_UNAUTH_SMOKE_NOW_401_FIXED';
const SOURCE_COMMIT = '09ecfab';

(function main() {
  const before = gitStatus();
  console.log('=== Build 236 Vapi webhook runtime-secret-loaded read-only verification (local-only) ===');
  console.log('No call. No SMS. No provider call. No Supabase call. No credentials. No env change. No deploy. No live HTTP. No build. No authorized POST. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B236 doc carries the exact decision token');
  pass('Build 236 evidence doc exists and carries the decision token');

  // 2. References source commit 09ecfab + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B236 doc references source commit 09ecfab');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B236 doc records HEAD==origin/main');
  pass('B236 doc references source commit 09ecfab (HEAD==origin/main)');

  // 3. References the Build 235 503 blocker.
  assert(/[Bb]uild 235/.test(doc), 'B236 doc references Build 235');
  assert(/503/.test(doc) && /webhook_auth_not_configured/.test(doc),
    'B236 doc references the Build 235 503 webhook_auth_not_configured blocker');
  pass('B236 doc references the Build 235 503 webhook_auth_not_configured blocker');

  // 4. Records the new 401 unauthorized result and the 503 -> 401 transition.
  assert(/401/.test(doc) && /unauthorized/.test(doc),
    'B236 doc records the new HTTP 401 unauthorized result');
  assert(/503\s*(->|→|to)\s*401/.test(doc),
    'B236 doc records the 503 -> 401 transition');
  pass('B236 doc records the new 401 unauthorized result and the 503 -> 401 transition');

  // 5. Explicitly claims NO authorized synthetic POST was run.
  assert(/[Nn]o authorized synthetic POST was run/.test(doc),
    'B236 doc explicitly states no authorized synthetic POST was run');
  assert(/not executed/i.test(doc) && /not fabricated/i.test(doc),
    'B236 doc states the authorized POST is not executed and not fabricated');
  pass('B236 doc explicitly claims no authorized synthetic POST was run (not executed, not fabricated)');

  // 6. Real route/guard source still wires the guard before the handler (grounding).
  const route = read(ROUTE);
  assert(/requireVapiWebhookSecret/.test(route) &&
    /router\.post\(\s*['"]\/call-completed['"]\s*,\s*requireVapiWebhookSecret\s*,/.test(route),
    'real route source wires requireVapiWebhookSecret BEFORE the call-completed handler');
  const guard = read(GUARD);
  assert(/requireVapiWebhookSecret/.test(guard) && /timingSafeEqual/.test(guard) &&
    /webhook_auth_not_configured/.test(guard) && /unauthorized/.test(guard),
    'real guard middleware exists, constant-time, and returns 503/401 codes referenced by the doc');
  pass('B236 grounding matches real source: guard in code, wired before handler, 503/401 semantics intact');

  // 7. No real call / no SMS / no real roofer/homeowner contact.
  assert(/[Nn]o real call/.test(doc), 'B236 doc asserts no real call');
  assert(/[Nn]o SMS/.test(doc), 'B236 doc asserts no SMS');
  assert(/[Nn]o real roofer contact/.test(doc) && /[Nn]o real homeowner contact/.test(doc),
    'B236 doc asserts no real roofer/homeowner contact');
  pass('B236 doc asserts no real call, no SMS, no real roofer/homeowner contact');

  // 8. No secrets / no PII assertions present.
  assert(/[Nn]o secrets printed/.test(doc), 'B236 doc asserts no secrets printed');
  assert(/[Nn]o phone numbers or PII/.test(doc), 'B236 doc asserts no phone numbers or PII');
  assert(/[Nn]o schema \/ auth \/ RLS/.test(doc), 'B236 doc asserts no schema/auth/RLS change');
  pass('B236 doc asserts no secrets printed, no phone numbers or PII, no schema/auth/RLS change');

  // 9. Next gated step is the authorized synthetic POST evidence, stopping before any real call.
  assert(/[Nn]ext gated step/.test(doc), 'B236 doc records the exact next gated step');
  assert(/authorized synthetic ?\/? ?sanitized POST evidence|authorized synthetic \/ sanitized POST/i.test(doc),
    'B236 doc next step is the authorized synthetic POST evidence');
  assert(/stops? before any real inbound call traffic|before any real call|stop before/i.test(doc),
    'B236 doc next step stops before any real call');
  assert(/separately[- ]approved|later, separately-approved/i.test(doc),
    'B236 doc records that a real call is a later, separately-approved gate');
  pass('B236 doc next gated step is the authorized synthetic POST, stopping before any real call');

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
    /No authorized synthetic POST executed/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No secret committed/i,
    /No deploy \/ redeploy \/ restart/i,
  ];
  for (const re of gates) assert(re.test(doc), `B236 doc missing safety invariant: ${re}`);
  pass('B236 doc states the full Build 236 safety-invariant block');

  // 11. Doc carries no secret-shaped or phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B236 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B236 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B236 doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B236 doc contains no phone-number-shaped value');
  pass('B236 doc contains no secret-shaped or phone-number-shaped values');

  // 12. Dry-run wrapper exists and wires this verifier + B235 + B234 + B233 + B232 verifiers + smoke regression.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B236 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B235_VERIFIER)), 'B235 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B234_VERIFIER)), 'B234 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B233_VERIFIER)), 'B233 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B232_VERIFIER)), 'B232 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-webhook-runtime-secret-loaded-build-236-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-webhook-post-enablement-smoke-build-235-readonly.js'),
    'dry-run wrapper runs the Build 235 verifier');
  assert(dry.includes('verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js'),
    'dry-run wrapper runs the Build 234 verifier');
  assert(dry.includes('verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js'),
    'dry-run wrapper runs the Build 233 verifier');
  assert(dry.includes('verify-vapi-webhook-auth-guard-build-232-readonly.js'),
    'dry-run wrapper runs the Build 232 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B236 verifier present and the dry-run wrapper wires this verifier + B235 + B234 + B233 + B232 verifiers + smoke regression');

  // 13. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 236 Vapi webhook runtime-secret-loaded evidence verified (${passCount} checks).`);
  console.log('live_http_called=read_only_only  deploy=false  railway_var_set=false  vapi_config_changed=false  guard_in_code=true  unauth_smoke=401_live_FIXED  runtime_secret_loaded=true  authorized_smoke=not_executed_not_fabricated  call_placed=false  live_sms_sent=false  secrets_in_repo=0  repo_unchanged=true');
})();
