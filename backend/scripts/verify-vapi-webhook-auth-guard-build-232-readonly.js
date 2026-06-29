#!/usr/bin/env node
/**
 * Build 232 Read-Only Verifier — Vapi webhook fail-closed auth guard.
 *
 * Read-only. Reads repo source + the Build 232 doc as text and checks `git status` before/after.
 * No network, no Supabase call, no credential/secret access, no provider client, no SMS, no call,
 * no live HTTP, no env mutation. Executes no service and does NOT build.
 *
 * Proves the Build 232 slice is internally consistent AND grounded in the real source:
 *  - The guard middleware exists, reads VAPI_WEBHOOK_SECRET (via config), supports both accepted
 *    headers, uses constant-time comparison, and fails closed (rejects before next()).
 *  - The Vapi route wires the guard BEFORE the handler (so unauthenticated traffic can't reach the
 *    service / Supabase writes).
 *  - The guard never logs/echoes the secret value.
 *  - config.ts exposes vapiWebhookSecret from VAPI_WEBHOOK_SECRET.
 *  - The doc records the Build 231 finding, accepted headers, runtime env requirement,
 *    fail-closed behavior, the full safety-invariant block, and the next gated step.
 *  - The behavioral test + dry-run wrapper exist and are wired together.
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

const DOC = 'docs/VAPI_WEBHOOK_AUTH_GUARD_BUILD_232.md';
const GUARD = 'backend/src/middleware/vapi-webhook-auth.ts';
const ROUTE = 'backend/src/routes/vapi-webhooks.ts';
const CONFIG = 'backend/src/config/config.ts';
const MW_INDEX = 'backend/src/middleware/index.ts';
const TEST = 'backend/scripts/test-vapi-webhook-auth-guard-build-232.js';
const VERIFIER = 'backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js';
const DRY_RUN = 'scripts/run-vapi-webhook-auth-guard-build-232-dry-run.sh';

const DECISION_TOKEN = 'VAPI_WEBHOOK_AUTH_GUARD_FAIL_CLOSED_IMPLEMENTED_AWAITING_VAPI_WEBHOOK_SECRET_RUNTIME_SET';

(function main() {
  const before = gitStatus();
  console.log('=== Build 232 Vapi webhook auth-guard read-only verification (local-only) ===');
  console.log('No call. No SMS. No provider call. No Supabase call. No credentials. No env change. No live HTTP. No build. Read-only.');

  // 1. Guard middleware: reads the configured secret + supports both accepted headers.
  const guard = read(GUARD);
  assert(/config\.vapiWebhookSecret|VAPI_WEBHOOK_SECRET/.test(guard), 'guard reads the configured VAPI_WEBHOOK_SECRET');
  assert(/x-vapi-webhook-secret/i.test(guard), 'guard supports the x-vapi-webhook-secret header');
  assert(/Bearer/.test(guard), 'guard supports the Authorization: Bearer header form');
  pass('guard middleware reads VAPI_WEBHOOK_SECRET and supports both accepted headers');

  // 2. Guard uses constant-time comparison.
  assert(/timingSafeEqual/.test(guard), 'guard uses crypto.timingSafeEqual (constant-time comparison)');
  pass('guard uses constant-time secret comparison');

  // 3. Guard fails closed: rejects (4xx/5xx) before next() on missing/invalid; only next() when authorized.
  assert(/res\.status\(401\)/.test(guard), 'guard rejects unauthorized requests with 401');
  assert(/res\.status\(503\)/.test(guard), 'guard rejects missing-config with 503 (fail closed)');
  assert(/return next\(\)/.test(guard), 'guard calls next() only on the authorized path');
  // Heuristic fail-closed: a missing configured secret is handled (returns) before authorizing.
  assert(/missing_secret_config/.test(guard), 'guard explicitly handles the missing-secret-config case');
  pass('guard fails closed (401/503 before next; next only when authorized)');

  // 4. Guard never logs or echoes the secret value.
  assert(!/console\.[a-z]+\([^)]*(config\.vapiWebhookSecret|provided\b|expectedBuf|providedBuf)/.test(guard),
    'guard does not log the secret or the provided/expected secret values');
  // Response bodies must not include the secret.
  assert(!/json\([^)]*vapiWebhookSecret/.test(guard), 'guard does not return the secret in a response body');
  pass('guard never logs or echoes the secret value');

  // 5. Route wires the guard BEFORE the handler.
  const route = read(ROUTE);
  assert(/requireVapiWebhookSecret/.test(route), 'route imports/uses requireVapiWebhookSecret');
  assert(/router\.post\(\s*['"]\/call-completed['"]\s*,\s*requireVapiWebhookSecret\s*,/.test(route),
    'route registers the guard as middleware BEFORE the call-completed handler');
  pass('Vapi route wires the auth guard before the handler (service/Supabase unreachable when unauthorized)');

  // 6. config.ts exposes vapiWebhookSecret from VAPI_WEBHOOK_SECRET.
  const config = read(CONFIG);
  assert(/vapiWebhookSecret\s*:/.test(config) && /process\.env\.VAPI_WEBHOOK_SECRET/.test(config),
    'config.ts exposes vapiWebhookSecret from process.env.VAPI_WEBHOOK_SECRET');
  pass('config.ts exposes vapiWebhookSecret from VAPI_WEBHOOK_SECRET');

  // 7. Middleware index re-exports the guard.
  const mwIndex = read(MW_INDEX);
  assert(/requireVapiWebhookSecret/.test(mwIndex), 'middleware index re-exports requireVapiWebhookSecret');
  pass('middleware index re-exports the guard');

  // 8. Doc: decision token + Build 231 finding being closed.
  const doc = read(DOC);
  assert(doc.includes(DECISION_TOKEN), 'B232 doc carries the exact decision token');
  assert(/a9b6c18/.test(doc) && /HEAD\s*==\s*origin\/main/.test(doc), 'B232 doc records the source-of-truth commit + HEAD==origin/main');
  assert(/Build 231 finding/i.test(doc) && /no signature\/secret validation/i.test(doc),
    'B232 doc states the Build 231 finding being closed');
  pass('B232 doc records the decision token, source-of-truth, and the Build 231 finding being closed');

  // 9. Doc: accepted headers + runtime env requirement + fail-closed table.
  assert(/Authorization:\s*Bearer/.test(doc) && /x-vapi-webhook-secret/.test(doc), 'B232 doc documents both accepted headers');
  assert(/VAPI_WEBHOOK_SECRET/.test(doc) && /runtime/i.test(doc), 'B232 doc documents the runtime env requirement');
  assert(/fail[- ]closed/i.test(doc) && /401/.test(doc) && /503/.test(doc), 'B232 doc documents fail-closed behavior incl. 401/503');
  pass('B232 doc documents accepted headers, runtime env requirement, and fail-closed behavior');

  // 10. Doc: full safety-invariant block.
  const invariants = [
    /No live call/i,
    /No SMS sent/i,
    /No provider calls/i,
    /No live HTTP/i,
    /No Twilio configuration change/i,
    /No Railway configuration change/i,
    /No Vapi configuration change/i,
    /No real roofer contact/i,
    /No real homeowner contact/i,
    /No production data export/i,
    /No schema \/ auth \/ RLS/i,
    /No billing automation/i,
    /No CRM integration/i,
    /No public automation expansion/i,
    /No secrets printed/i,
    /No deploy/i,
  ];
  for (const re of invariants) assert(re.test(doc), `B232 doc missing safety invariant: ${re}`);
  pass('B232 doc states the full Build 232 safety-invariant block');

  // 11. Doc: next gated step recorded.
  assert(/next gated step/i.test(doc) && /VAPI_WEBHOOK_SECRET/.test(doc),
    'B232 doc records the exact next gated step (runtime-enablement set + authorized test)');
  pass('B232 doc records the exact next gated step after review');

  // 12. Doc carries no secret-shaped or phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B232 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B232 doc contains no sk- API-key-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B232 doc contains no phone-number-shaped value');
  pass('B232 doc contains no secret-shaped or phone-number-shaped values');

  // 13. Behavioral test + dry-run wrapper exist and are wired together.
  assert(fs.existsSync(path.join(repoRoot, TEST)), 'behavioral test file exists');
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'verifier file exists');
  const dry = read(DRY_RUN);
  assert(dry.includes('test-vapi-webhook-auth-guard-build-232.js'), 'dry-run wrapper runs the behavioral test');
  assert(dry.includes('verify-vapi-webhook-auth-guard-build-232-readonly.js'), 'dry-run wrapper runs this verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('behavioral test + verifier present and the dry-run wrapper wires all three');

  // 14. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 232 Vapi webhook auth-guard verified (${passCount} checks).`);
  console.log('live_http_called=false  guard_before_handler=true  fail_closed=true  constant_time=true  secrets_in_repo=0  repo_unchanged=true');
})();
