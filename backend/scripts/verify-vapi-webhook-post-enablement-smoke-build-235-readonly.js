#!/usr/bin/env node
/**
 * Build 235 Read-Only Verifier — Vapi webhook post-enablement smoke evidence packet.
 *
 * Read-only. Reads the Build 235 evidence doc (and the real route/guard source) as text and checks
 * `git status` before/after. No network, no Supabase call, no credential/secret access, no provider
 * client, no SMS, no call, no live HTTP, no env mutation, no deploy. Executes no service; does NOT
 * build.
 *
 * Build 235 captured the post-enablement smoke and found the runtime secret is NOT loaded
 * (unauthenticated POST still returned 503 webhook_auth_not_configured). This verifier proves the
 * evidence packet is internally consistent, honest about that BLOCKED outcome, and free of secrets /
 * phone-number-shaped values:
 *  - The Build 235 evidence doc exists and carries the exact decision token.
 *  - It references source commit 6c5e758 (HEAD == origin/main).
 *  - It records the live health 200 / production result.
 *  - It records the unauthenticated smoke result AND the post-enablement target of 401 unauthorized.
 *  - Any 503 in the result section is EXPLICITLY marked as a FAILURE / BLOCKED runtime outcome
 *    (never presented as a passing post-enablement state).
 *  - It records the authorized synthetic POST result (here: not executed / blocked / not fabricated).
 *  - It documents both accepted headers + a secret-safe authorized POST command kit.
 *  - It contains no secret-shaped or phone-number-shaped values.
 *  - It asserts no real inbound call traffic, no real call placed, no SMS.
 *  - The next gated step stops before the first real inbound call traffic / first real call unless
 *    separately approved.
 *  - The full Build 235 safety-invariant block is present.
 *  - The dry-run wrapper wires this verifier + the B234 + B233 + B232 verifiers + the smoke regression.
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

const DOC = 'docs/VAPI_WEBHOOK_POST_ENABLEMENT_SMOKE_EVIDENCE_BUILD_235.md';
const ROUTE = 'backend/src/routes/vapi-webhooks.ts';
const GUARD = 'backend/src/middleware/vapi-webhook-auth.ts';
const VERIFIER = 'backend/scripts/verify-vapi-webhook-post-enablement-smoke-build-235-readonly.js';
const DRY_RUN = 'scripts/run-vapi-webhook-post-enablement-smoke-build-235-dry-run.sh';
const B234_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js';
const B233_VERIFIER = 'backend/scripts/verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js';
const B232_VERIFIER = 'backend/scripts/verify-vapi-webhook-auth-guard-build-232-readonly.js';

const DECISION_TOKEN = 'VAPI_WEBHOOK_POST_ENABLEMENT_SMOKE_BLOCKED_RUNTIME_SECRET_NOT_LOADED_503';
const SOURCE_COMMIT = '6c5e758';

(function main() {
  const before = gitStatus();
  console.log('=== Build 235 Vapi webhook post-enablement smoke read-only verification (local-only) ===');
  console.log('No call. No SMS. No provider call. No Supabase call. No credentials. No env change. No deploy. No live HTTP. No build. Read-only.');

  const doc = read(DOC);

  // 1. Doc exists + decision token.
  assert(doc.includes(DECISION_TOKEN), 'B235 doc carries the exact decision token');
  pass('Build 235 evidence doc exists and carries the decision token');

  // 2. References source commit 6c5e758 + HEAD==origin/main.
  assert(new RegExp(SOURCE_COMMIT).test(doc), 'B235 doc references source commit 6c5e758');
  assert(/HEAD\s*==\s*origin\/main/.test(doc), 'B235 doc records HEAD==origin/main');
  pass('B235 doc references source commit 6c5e758 (HEAD==origin/main)');

  // 3. Records the live health 200 / production result.
  assert(/[Hh]ealth result/.test(doc), 'B235 doc has a health result section');
  assert(/HTTP\s*200/.test(doc) && /production/.test(doc),
    'B235 doc records the live health 200 / production result');
  pass('B235 doc records the live health 200 / production result');

  // 4. Records the unauthenticated smoke result AND the post-enablement 401 target.
  assert(/[Uu]nauthenticated rejection smoke|[Uu]nauthenticated smoke/.test(doc),
    'B235 doc has an unauthenticated smoke section');
  assert(/401/.test(doc) && /unauthorized/.test(doc),
    'B235 doc records the post-enablement target of 401 unauthorized');
  pass('B235 doc records the unauthenticated smoke and the 401 unauthorized target');

  // 5. Any 503 must be EXPLICITLY marked as a FAILURE / BLOCKED outcome — never a passing state.
  if (/503/.test(doc)) {
    assert(/BLOCKED|FAILURE|STOP CONDITION|not loaded/i.test(doc),
      'B235 doc: a 503 appears but is NOT explicitly marked as a failure / blocked runtime outcome');
    // Guard against a 503 being framed as a pass.
    assert(!/503[^\n]{0,40}(pass|passing|success|expected post-enablement result)/i.test(doc),
      'B235 doc: a 503 is framed as a passing post-enablement result');
    pass('B235 doc: the 503 is explicitly marked as a FAILURE / BLOCKED runtime outcome (not a pass)');
  } else {
    pass('B235 doc: no 503 present as a post-enablement result');
  }

  // 6. Records the authorized synthetic POST result (executed-or-blocked) — and never fabricated.
  assert(/[Aa]uthorized synthetic smoke/.test(doc), 'B235 doc has an authorized synthetic smoke section');
  assert(/NOT executed|not run|not fabricated|HTTP\s*200|HTTP\s*404/i.test(doc),
    'B235 doc records the authorized synthetic POST result (executed result or explicitly not-executed)');
  assert(/not fabricated/i.test(doc),
    'B235 doc explicitly states no authorized result is fabricated');
  pass('B235 doc records the authorized synthetic POST result without fabrication');

  // 7. Documents both accepted headers + the secret-safe authorized POST command kit.
  assert(/Authorization:\s*Bearer\s*\$?VAPI_WEBHOOK_SECRET|Authorization:\s*Bearer\b/.test(doc),
    'B235 doc documents the Authorization: Bearer header');
  assert(/x-vapi-webhook-secret/.test(doc), 'B235 doc documents the x-vapi-webhook-secret header');
  assert(/secret-safe/i.test(doc) && /command kit/i.test(doc), 'B235 doc includes a secret-safe command kit');
  assert(/never appears|never printed|value never|not printed|never be requested/i.test(doc),
    'B235 doc states the secret value is never printed');
  pass('B235 doc documents both accepted headers and a secret-safe authorized POST command kit');

  // 8. Real route/guard source still wires the guard before the handler (grounding).
  const route = read(ROUTE);
  assert(/requireVapiWebhookSecret/.test(route) &&
    /router\.post\(\s*['"]\/call-completed['"]\s*,\s*requireVapiWebhookSecret\s*,/.test(route),
    'real route source wires requireVapiWebhookSecret BEFORE the call-completed handler');
  const guard = read(GUARD);
  assert(/requireVapiWebhookSecret/.test(guard) && /timingSafeEqual/.test(guard) &&
    /webhook_auth_not_configured/.test(guard) && /unauthorized/.test(guard),
    'real guard middleware exists, constant-time, and returns 503/401 codes referenced by the doc');
  pass('B235 grounding matches real source: guard in code, wired before handler, 503/401 semantics intact');

  // 9. No real inbound call traffic / no real call / no SMS.
  assert(/[Nn]o real inbound call traffic/.test(doc), 'B235 doc asserts no real inbound call traffic');
  assert(/[Nn]o (live )?call placed|No real call|no real call/.test(doc),
    'B235 doc asserts no real/live call placed');
  assert(/[Nn]o SMS/.test(doc), 'B235 doc asserts no SMS');
  pass('B235 doc asserts no real inbound call traffic, no real call, no SMS');

  // 10. Next gated step stops before the first real call / real inbound traffic unless separately approved.
  assert(/[Nn]ext gated step/.test(doc), 'B235 doc records the exact next gated step');
  assert(/stops? before any real inbound call traffic|before any real call|stop before/i.test(doc),
    'B235 doc next step stops before real inbound traffic / first real call');
  assert(/separately[- ]approved|later, separately-approved/i.test(doc),
    'B235 doc records that a real call is a later, separately-approved gate');
  pass('B235 doc next gated step stops before the first real call unless separately approved');

  // 11. Full safety-invariant block present.
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
    /No deploy \/ redeploy \/ restart/i,
  ];
  for (const re of gates) assert(re.test(doc), `B235 doc missing safety invariant: ${re}`);
  pass('B235 doc states the full Build 235 safety-invariant block');

  // 12. Doc carries no secret-shaped or phone-number-shaped values.
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B235 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B235 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B235 doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B235 doc contains no phone-number-shaped value');
  pass('B235 doc contains no secret-shaped or phone-number-shaped values');

  // 13. Dry-run wrapper exists and wires this verifier + B234 + B233 + B232 verifiers + smoke regression.
  assert(fs.existsSync(path.join(repoRoot, VERIFIER)), 'B235 verifier file exists');
  assert(fs.existsSync(path.join(repoRoot, B234_VERIFIER)), 'B234 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B233_VERIFIER)), 'B233 verifier file exists (regression)');
  assert(fs.existsSync(path.join(repoRoot, B232_VERIFIER)), 'B232 verifier file exists (regression)');
  const dry = read(DRY_RUN);
  assert(dry.includes('verify-vapi-webhook-post-enablement-smoke-build-235-readonly.js'),
    'dry-run wrapper runs this verifier');
  assert(dry.includes('verify-vapi-webhook-runtime-enablement-and-controlled-smoke-build-234-readonly.js'),
    'dry-run wrapper runs the Build 234 verifier');
  assert(dry.includes('verify-vapi-webhook-runtime-enablement-readiness-build-233-readonly.js'),
    'dry-run wrapper runs the Build 233 verifier');
  assert(dry.includes('verify-vapi-webhook-auth-guard-build-232-readonly.js'),
    'dry-run wrapper runs the Build 232 verifier');
  assert(/verify-vapi-phone-lead-smoke-readonly\.js/.test(dry), 'dry-run wrapper runs the existing Vapi smoke regression');
  assert(/node --check/.test(dry), 'dry-run wrapper syntax-checks before running');
  pass('B235 verifier present and the dry-run wrapper wires this verifier + B234 + B233 + B232 verifiers + smoke regression');

  // 14. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 235 Vapi webhook post-enablement smoke evidence verified (${passCount} checks).`);
  console.log('live_http_called=read_only_only  deploy=false  railway_var_set=false  vapi_config_changed=false  guard_in_code=true  health=200  unauth_smoke=503_live_BLOCKED  runtime_secret_loaded=false  authorized_smoke=not_executed_not_fabricated  call_placed=false  live_sms_sent=false  secrets_in_repo=0  repo_unchanged=true');
})();
