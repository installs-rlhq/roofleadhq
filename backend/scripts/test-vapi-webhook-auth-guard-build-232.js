#!/usr/bin/env node
/**
 * Build 232 Focused Behavioral Test — Vapi webhook fail-closed auth guard.
 *
 * Local-only. No network, no live HTTP, no Supabase, no provider call, no real credentials.
 * Compiles the backend (tsc → dist/, which is git-ignored) and exercises the REAL compiled
 * middleware `requireVapiWebhookSecret` with mocked Express req/res/next objects.
 *
 * Proves the five required behaviors:
 *   1. missing secret env  -> fails closed (no next, no handler/service reached)
 *   2. missing request secret -> fails closed
 *   3. wrong request secret   -> fails closed
 *   4. correct secret via `Authorization: Bearer`     -> reaches handler path (next called)
 *   5. correct secret via `x-vapi-webhook-secret`      -> reaches handler path (next called)
 * And the safety property: on every UNauthorized case, next() is never called, so the route
 * handler — and therefore `processVapiCallCompleted` and all Supabase writes — is never reached.
 *
 * The configured secret is injected via process.env.VAPI_WEBHOOK_SECRET and never printed.
 */

const path = require('path');
const fs = require('fs');
const { execFileSync } = require('child_process');

const backendRoot = path.resolve(__dirname, '..');

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function assert(cond, message) { if (!cond) fail(message); }

// A non-secret, test-only token. Not a real credential.
const TEST_SECRET = 'build232-test-shared-secret-value';
const WRONG_SECRET = 'build232-test-shared-secret-WRONG';

// Build a fresh module instance with a given configured secret. We clear the require cache and set
// the env var the config reads, so config.vapiWebhookSecret reflects each scenario. (config reads
// process.env at module load.)
function loadGuard(configuredSecret) {
  for (const key of Object.keys(require.cache)) {
    if (key.includes(path.join('dist', 'middleware', 'vapi-webhook-auth')) ||
        key.includes(path.join('dist', 'config', 'config'))) {
      delete require.cache[key];
    }
  }
  if (configuredSecret === undefined) {
    delete process.env.VAPI_WEBHOOK_SECRET;
  } else {
    process.env.VAPI_WEBHOOK_SECRET = configuredSecret;
  }
  return require(path.join(backendRoot, 'dist', 'middleware', 'vapi-webhook-auth.js'));
}

// Minimal Express res mock; records status + json body, never reaches a real socket.
function makeRes() {
  const res = {
    statusCode: null,
    body: null,
    status(code) { this.statusCode = code; return this; },
    json(payload) { this.body = payload; return this; },
  };
  return res;
}

// Run the middleware against a header set; returns { nextCalled, res }.
function runGuard(guard, headers) {
  const req = { headers };
  const res = makeRes();
  let nextCalled = false;
  guard.requireVapiWebhookSecret(req, res, () => { nextCalled = true; });
  return { nextCalled, res };
}

function assertNoSecretLeak(res) {
  const serialized = JSON.stringify(res.body || {});
  assert(!serialized.includes(TEST_SECRET), 'response body must not echo the configured secret');
  assert(!serialized.includes(WRONG_SECRET), 'response body must not echo the provided secret');
}

(function main() {
  console.log('=== Build 232 Vapi webhook auth-guard behavioral test (local-only) ===');
  console.log('No network. No live HTTP. No Supabase. No provider call. No real credentials. Secret never printed.');

  // Ensure compiled middleware exists; build if absent. tsc writes only to git-ignored dist/.
  const compiled = path.join(backendRoot, 'dist', 'middleware', 'vapi-webhook-auth.js');
  if (!fs.existsSync(compiled)) {
    console.log('dist middleware missing — running `npm run build` (writes git-ignored dist/ only)...');
    execFileSync('npm', ['run', 'build'], { cwd: backendRoot, stdio: 'inherit' });
  }
  assert(fs.existsSync(compiled), 'compiled guard middleware exists in dist/');

  // --- 1. Missing secret env -> fail closed (even with a "valid-looking" request). ---
  {
    const guard = loadGuard(undefined);
    const { nextCalled, res } = runGuard(guard, {
      authorization: 'Bearer ' + TEST_SECRET,
    });
    assert(nextCalled === false, '[missing env] next() must NOT be called');
    assert(res.statusCode === 503, '[missing env] must reject with 503 (auth not configured)');
    assert(res.body && res.body.ok === false, '[missing env] must return ok:false');
    assertNoSecretLeak(res);
    pass('missing VAPI_WEBHOOK_SECRET env fails closed (503, handler/service never reached)');
  }

  // --- 2. Missing request secret -> fail closed. ---
  {
    const guard = loadGuard(TEST_SECRET);
    const { nextCalled, res } = runGuard(guard, {});
    assert(nextCalled === false, '[no request secret] next() must NOT be called');
    assert(res.statusCode === 401, '[no request secret] must reject with 401');
    assert(res.body && res.body.error === 'unauthorized', '[no request secret] must return unauthorized');
    assertNoSecretLeak(res);
    pass('missing request secret fails closed (401, handler/service never reached)');
  }

  // --- 3. Wrong request secret -> fail closed (both header forms). ---
  {
    const guard = loadGuard(TEST_SECRET);
    const viaBearer = runGuard(guard, { authorization: 'Bearer ' + WRONG_SECRET });
    assert(viaBearer.nextCalled === false, '[wrong bearer] next() must NOT be called');
    assert(viaBearer.res.statusCode === 401, '[wrong bearer] must reject with 401');
    assertNoSecretLeak(viaBearer.res);

    const viaShared = runGuard(guard, { 'x-vapi-webhook-secret': WRONG_SECRET });
    assert(viaShared.nextCalled === false, '[wrong shared header] next() must NOT be called');
    assert(viaShared.res.statusCode === 401, '[wrong shared header] must reject with 401');
    assertNoSecretLeak(viaShared.res);
    pass('wrong request secret fails closed via both headers (401, handler/service never reached)');
  }

  // --- 4. Correct secret via Authorization: Bearer -> reaches handler path. ---
  {
    const guard = loadGuard(TEST_SECRET);
    const { nextCalled, res } = runGuard(guard, { authorization: 'Bearer ' + TEST_SECRET });
    assert(nextCalled === true, '[correct bearer] next() MUST be called (handler reached)');
    assert(res.statusCode === null, '[correct bearer] guard must not short-circuit the response');
    pass('correct secret via Authorization: Bearer reaches the existing handler path');
  }

  // --- 5. Correct secret via x-vapi-webhook-secret -> reaches handler path. ---
  {
    const guard = loadGuard(TEST_SECRET);
    const { nextCalled, res } = runGuard(guard, { 'x-vapi-webhook-secret': TEST_SECRET });
    assert(nextCalled === true, '[correct shared header] next() MUST be called (handler reached)');
    assert(res.statusCode === null, '[correct shared header] guard must not short-circuit the response');
    pass('correct secret via x-vapi-webhook-secret reaches the existing handler path');
  }

  // --- 6. Pure-logic decision function fails closed across the matrix (defense-in-depth check). ---
  {
    const guard = loadGuard(TEST_SECRET);
    assert(guard.evaluateVapiWebhookAuth('', { authorization: 'Bearer ' + TEST_SECRET }) === 'missing_secret_config',
      'evaluate: empty configured secret -> missing_secret_config');
    assert(guard.evaluateVapiWebhookAuth(TEST_SECRET, {}) === 'missing_request_secret',
      'evaluate: no header -> missing_request_secret');
    assert(guard.evaluateVapiWebhookAuth(TEST_SECRET, { authorization: 'Bearer ' + WRONG_SECRET }) === 'invalid_secret',
      'evaluate: wrong secret -> invalid_secret');
    assert(guard.evaluateVapiWebhookAuth(TEST_SECRET, { authorization: 'Bearer ' + TEST_SECRET }) === null,
      'evaluate: correct bearer -> authorized (null)');
    assert(guard.evaluateVapiWebhookAuth(TEST_SECRET, { 'x-vapi-webhook-secret': TEST_SECRET }) === null,
      'evaluate: correct shared header -> authorized (null)');
    // Empty/whitespace provided values must not authorize.
    assert(guard.evaluateVapiWebhookAuth(TEST_SECRET, { authorization: 'Bearer    ' }) === 'missing_request_secret',
      'evaluate: empty bearer token -> missing_request_secret');
    assert(guard.secretsMatch(TEST_SECRET, TEST_SECRET) === true, 'secretsMatch: identical -> true');
    assert(guard.secretsMatch(TEST_SECRET, TEST_SECRET + 'x') === false, 'secretsMatch: length mismatch -> false (no throw)');
    assert(guard.secretsMatch('', '') === false, 'secretsMatch: empty -> false');
    pass('pure decision/compare logic fails closed across the full matrix');
  }

  // Clean up the env var we set, regardless.
  delete process.env.VAPI_WEBHOOK_SECRET;

  console.log('\nPASS: Build 232 Vapi webhook auth-guard behavioral test (' + passCount + ' checks).');
  console.log('unauthorized_next_calls=0  service_reached_on_unauthorized=false  live_http=false  supabase_calls=0  secrets_printed=0');
})();
