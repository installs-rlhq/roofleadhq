#!/usr/bin/env node
/**
 * Build 268 Verifier — Clean Vapi EOCR terminal-path FIX (repo-only, test-first, offline).
 *
 * Context (grounded in the Build 266/267 evidence chain):
 *   A single controlled true-PSTN validation call reached a clean Vapi-managed Test Number, and Vapi
 *   POSTed the terminal End-Of-Call Report to /webhooks/vapi/call-completed. Non-terminal events on
 *   the SAME deployment / SAME path returned 200, but the terminal EOCR returned HTTP 404. Railway
 *   HTTP logs for the deployment active during the EOCR window (removed deployment 53cf00e5) confirm:
 *   the route/path was reachable, method/path were correct, and non-terminal POSTs to the same path
 *   returned 200 while the terminal EOCR returned 404. So the 404 is APPLICATION-LEVEL, not a missing
 *   Railway route.
 *
 * Root cause (repo inspection): the terminal EOCR classifies to `process_call_completed`, passes the
 * phone-keyed required-field gate, then the roofer lookup keys on `roofers.twilio_number == destination`.
 * The clean Vapi-managed Test Number is not mapped to any roofer row, so the lookup returns no roofer
 * and the service returned `error: 'unknown_roofer'` → route → HTTP 404. Vapi treats a 404 EOCR as a
 * failed delivery and retries.
 *
 * Build 268 fix: an unmapped destination is not an error — acknowledge it as a controlled no-op
 * (ok:true, acknowledged:true, processed:false, reason:'unknown_roofer_destination_unmapped') so the
 * route returns 200 and Vapi stops retrying, while a genuinely mapped roofer still processes normally.
 *
 * This verifier compiles the backend (local tsc) and exercises the ACTUAL compiled service in-process
 * with a FAKE Supabase client injected via require-cache interception. It is fully offline: no network,
 * no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no call, no SMS, no Twilio, no
 * Retell, no deploy, no secret read, no env persisted beyond this process. The fake client's config
 * values are placeholders; createClient never builds a real client.
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

const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';
const ROUTE_SRC = 'backend/src/routes/vapi-webhooks.ts';
const AUTH_SRC = 'backend/src/middleware/vapi-webhook-auth.ts';
const DOC = 'docs/CLEAN_VAPI_EOCR_TERMINAL_FIX_BUILD_268.md';

const SAMPLES = 'docs/samples';
const FIX_EOCR_PSTN = `${SAMPLES}/vapi-event-end-of-call-report.fake.json`;
const FIX_STATUS = `${SAMPLES}/vapi-event-status-update.fake.json`;
const FIX_WEBCALL = `${SAMPLES}/vapi-event-webcall-end-of-call-report.fake.json`;

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

/**
 * Minimal table-aware, chainable fake Supabase client. Every query builder method returns the chain;
 * the terminal reads (maybeSingle/single/limit) resolve to the configured per-table result. Only the
 * methods the service actually calls are implemented. No network, no real client.
 */
function makeFakeSupabase(routes) {
  return {
    from(table) {
      const result = routes[table] ?? { data: null, error: null };
      const chain = {
        select() { return chain; },
        eq() { return chain; },
        insert() { return chain; },
        limit() { return Promise.resolve(result); },
        maybeSingle() { return Promise.resolve(result); },
        single() { return Promise.resolve(result); },
      };
      return chain;
    },
  };
}

(async function main() {
  const before = gitStatus();
  console.log('=== Build 268 Clean Vapi EOCR terminal-path FIX verification (local-only, in-process, fake Supabase) ===');
  console.log('No call. No Vapi Test/Talk/webCall. No Vapi rerun. No curl. No live HTTP. No real Supabase. No SMS. No Twilio. No Retell. No credentials. No secret file read. No deploy. Offline behavioral test of the fix.');

  // --- Static grounding: the fix really exists in source (unmapped roofer -> controlled no-op). ---
  const service = read(SERVICE_SRC);
  assert(/unknown_roofer_destination_unmapped/.test(service),
    'service source returns the controlled no-op reason unknown_roofer_destination_unmapped');
  // The unmapped-roofer branch must NOT return `error: 'unknown_roofer'` anymore (that produced the 404).
  assert(!/error:\s*'unknown_roofer'/.test(service),
    "service source no longer returns error: 'unknown_roofer' (the former 404 cause)");
  // The phone-keyed required-field gate is preserved (real PSTN protection).
  assert(/error:\s*'missing_required_field'/.test(service) &&
    /!normalized\.provider_call_id/.test(service) &&
    /!normalized\.caller_phone/.test(service) &&
    /!normalized\.roofer_destination_number/.test(service),
    'service source still enforces the phone-keyed required-field gate (400)');
  // Missing Supabase config still fails to lookup_failed (not weakened).
  assert(/error:\s*'lookup_failed'/.test(service), 'service source still surfaces lookup_failed on missing config / lookup error');
  pass('service source: unmapped roofer -> controlled no-op (not unknown_roofer 404); required-field gate + lookup_failed preserved');

  // --- Route contract preserved: 400 only on missing_required_field, 200 on ok, defensive 404 branch kept. ---
  const route = read(ROUTE_SRC);
  assert(/error\s*===\s*'missing_required_field'/.test(route) && /status\(400\)/.test(route),
    'route still returns 400 only on missing_required_field');
  assert(/res\.status\(200\)\.json\(result\)/.test(route), 'route returns 200 on ok result (controlled no-op included)');
  assert(/error\s*===\s*'unknown_roofer'[\s\S]*status\(404\)/.test(route),
    'route retains its defensive unknown_roofer -> 404 branch (now unreached from the unmapped path)');
  assert(/requireVapiWebhookSecret/.test(route), 'route runs the fail-closed secret guard before the handler');
  // Auth layer: 401 unauthorized, 503 missing runtime secret (never weakened, never 404).
  const auth = read(AUTH_SRC);
  assert(/status\(401\)/.test(auth) && /unauthorized/.test(auth), 'auth middleware returns 401 on unauthorized');
  assert(/status\(503\)/.test(auth) && /webhook_auth_not_configured/.test(auth),
    'auth middleware returns 503 when the runtime webhook secret is missing');
  pass('route/auth contract preserved: 400 missing-field, 200 ok, defensive 404, 401 unauthorized, 503 missing runtime secret');

  // --- Fixtures exist. ---
  for (const f of [FIX_EOCR_PSTN, FIX_STATUS, FIX_WEBCALL]) {
    assert(fs.existsSync(path.join(repoRoot, f)), `fixture exists: ${f}`);
  }
  pass('required Vapi event fixtures exist (PSTN eocr, status update, webCall eocr)');

  // --- Compile the backend so we test the CURRENT source (dist is gitignored: no tracked-file churn). ---
  const tscBin = path.join(backendRoot, 'node_modules/.bin/tsc');
  assert(fs.existsSync(tscBin), 'local tsc is available for the behavioral build');
  execFileSync(tscBin, [], { cwd: backendRoot, stdio: 'pipe' });
  assert(fs.existsSync(DIST_SERVICE) && fs.existsSync(DIST_CONFIG), 'compiled service + config exist after build');
  pass('backend compiled (tsc) for in-process behavioral testing');

  // --- Give config non-empty Supabase placeholders so the process path passes the config gate, then
  //     intercept @supabase/supabase-js in the require cache so createClient returns our FAKE client.
  //     No real client is ever constructed; placeholders are never used to reach the network. ---
  process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://fake.local.invalid';
  process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-service-role-key-offline';

  let fakeRoutes = {};
  const supabaseModPath = require.resolve('@supabase/supabase-js', { paths: [backendRoot] });
  require.cache[supabaseModPath] = {
    id: supabaseModPath,
    filename: supabaseModPath,
    loaded: true,
    exports: { createClient: () => makeFakeSupabase(fakeRoutes) },
  };

  const svc = require(DIST_SERVICE);

  // === CORE FIX: terminal PSTN EOCR whose destination maps to NO roofer -> controlled 200 no-op. ===
  {
    fakeRoutes = { roofers: { data: null, error: null } }; // lookup finds no roofer
    const payload = readJson(FIX_EOCR_PSTN);
    // Sanity: this fixture DOES enter the full processing path (it is a terminal phone EOCR).
    const c = svc.classifyVapiWebhookEvent(payload);
    assert(c.decision === 'process_call_completed', 'PSTN eocr fixture enters the full processing path');
    const r = await svc.processVapiCallCompleted(payload);
    assert(r.ok === true, 'unmapped-roofer EOCR -> ok:true (route returns 200, not 404)');
    assert(r.acknowledged === true && r.processed === false, 'unmapped-roofer EOCR -> controlled no-op (acknowledged, not processed)');
    assert(r.reason === 'unknown_roofer_destination_unmapped', 'unmapped-roofer EOCR -> explicit sanitized reason');
    assert(!r.error, 'unmapped-roofer EOCR -> carries no error (was unknown_roofer/404)');
    assert(r.error !== 'unknown_roofer', 'unmapped-roofer EOCR -> not unknown_roofer');
    assert(!r.inserted && !r.call_id && !r.matched_lead_id && !r.booking_id,
      'unmapped-roofer EOCR -> no call/lead/booking created');
    // Sanitized: the no-op reason must not embed a phone number.
    assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(String(r.reason)),
      'no-op reason contains no phone-number-shaped value');
  }
  pass('CORE: clean Vapi PSTN EOCR with an unmapped destination -> controlled 200 no-op (reason unknown_roofer_destination_unmapped), no lead/booking, no 404');

  // === Mapped roofer still processes normally (fix does not break real routed roofers). ===
  {
    fakeRoutes = {
      roofers: { data: { id: 'roofer-1', business_name: 'Test Roofing', twilio_number: '+15555550100' }, error: null },
      // existing call found -> duplicate path returns ok without needing lead/booking/insert stubs
      calls: { data: { id: 'call-existing-1' }, error: null },
    };
    const r = await svc.processVapiCallCompleted(readJson(FIX_EOCR_PSTN));
    assert(r.ok === true, 'mapped roofer EOCR -> ok:true (processes)');
    assert(r.duplicate === true && r.call_id === 'call-existing-1', 'mapped roofer EOCR -> reaches full processing path (duplicate recognized)');
    assert(r.roofer_id === 'roofer-1', 'mapped roofer EOCR -> resolves the roofer');
    assert(r.reason !== 'unknown_roofer_destination_unmapped', 'mapped roofer EOCR -> NOT the unmapped no-op');
  }
  pass('mapped roofer EOCR still enters full processing (fix is scoped to the unmapped-destination case only)');

  // === Required-field gate still returns missing_required_field for a terminal phone EOCR missing a field. ===
  {
    fakeRoutes = { roofers: { data: null, error: null } };
    // A terminal payload with a roofer destination (so it's classified phone/process) but no caller phone.
    const partial = { message: { type: 'end-of-call-report' }, call: { to: '+15555550100', id: 'abc' } };
    const c = svc.classifyVapiWebhookEvent(partial);
    assert(c.decision === 'process_call_completed', 'terminal phone EOCR missing caller phone still enters processing');
    const r = await svc.processVapiCallCompleted(partial);
    assert(r.ok === false && r.error === 'missing_required_field', 'terminal phone EOCR missing caller phone -> 400 missing_required_field (unchanged)');
  }
  pass('required-field gate unchanged: terminal phone EOCR missing a required field still returns missing_required_field (400)');

  // === Non-terminal + webCall no-ops preserved (do not reach the roofer lookup). ===
  {
    fakeRoutes = { roofers: { data: { id: 'should-not-be-read' }, error: null } };
    const nonTerminal = await svc.processVapiCallCompleted(readJson(FIX_STATUS));
    assert(nonTerminal.ok === true && nonTerminal.acknowledged === true && nonTerminal.processed === false && !nonTerminal.error,
      'non-terminal status-update still ok no-op (200), no error');
    const webCall = await svc.processVapiCallCompleted(readJson(FIX_WEBCALL));
    assert(webCall.ok === true && webCall.acknowledged === true && webCall.web_call === true && !webCall.error,
      'browser/webCall eocr still ok no-op (200), web_call:true, no error');
  }
  pass('prior no-op contracts preserved: non-terminal + browser/webCall EOCR remain ok 200 no-ops');

  // --- Doc grounding + no secret/PII leakage. ---
  const doc = read(DOC);
  assert(/unknown_roofer_destination_unmapped/.test(doc), 'doc records the controlled no-op reason token');
  assert(/[Bb]uild 26[67]/.test(doc), 'doc references the Build 266/267 evidence chain');
  assert(/200/.test(doc) && /404/.test(doc), 'doc records the 404 -> controlled 200 no-op transition');
  assert(/[Nn]ot deployed|not_deployed|repo[- ]only/.test(doc), 'doc records that the fix is repo-only / not deployed');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'doc contains no phone-number-shaped value');
  pass('Build 268 doc records the root cause, the 404 -> controlled-200 fix, repo-only status, and carries no secret/phone value');

  // --- Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier did not mutate tracked files (dist build is gitignored)');

  console.log(`\nPASS: Build 268 Clean Vapi EOCR terminal-path FIX verified (${passCount} checks).`);
  console.log('live_http_called=false  vapi_test_used=false  vapi_talk_used=false  vapi_webcall_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  retell_used=false  real_supabase_used=false  supabase_write=false  deploy=false  secret_file_read=false  eocr_unmapped_roofer_now_200_noop=true  eocr_former_404_removed_from_unmapped_path=true  mapped_roofer_still_processes=true  required_field_gate_preserved_400=true  nonterminal_and_webcall_noops_preserved=true  auth_401_503_preserved=true  route_defensive_404_branch_retained=true  lead_or_booking_created_for_noop=false  tracked_files_unchanged=true');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
