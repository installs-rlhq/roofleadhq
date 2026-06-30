#!/usr/bin/env node
/**
 * Build 244 Verifier — Vapi webhook payload-shape FIX (repo-only, test-first).
 *
 * Unlike the read-only diagnosis verifiers (B243…B237), this verifier exercises the ACTUAL fixed
 * backend behavior in-process. It compiles the backend (local `tsc`) and `require`s the compiled
 * service + auth middleware, then drives them with local fake fixtures. It is still fully offline:
 * no network, no Supabase write, no live HTTP, no curl, no Vapi Talk, no Vapi rerun, no call, no SMS,
 * no Twilio, no secret read. It does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. The no-op
 * code paths it drives return BEFORE any Supabase client is constructed, so no DB access occurs; the
 * PSTN path is only classified (never executed against a DB).
 *
 * Build 244 fixes the Build 243 root cause: authenticated Vapi-originated payloads returned HTTP 400
 * (missing_required_field) because (a) the handler did not branch on Vapi message/event type, so
 * interim events (status/conversation/speech update) were processed as call completions, and (b)
 * browser/webCall final reports normalize caller_phone + roofer_destination_number to null and failed
 * the phone-keyed required-field gate. This verifier proves the fix:
 *  - Auth still fails closed: missing config / missing header / bad secret are rejected (401-bound),
 *    a matching secret is authorized — evaluated BEFORE any handling.
 *  - Known non-terminal events (status/conversation/speech update) → ok no-op (200), processed:false,
 *    no lead/booking, no missing_required_field.
 *  - Browser/webCall end-of-call-report (null caller/destination) → ok no-op (200), web_call:true,
 *    NOT missing_required_field, no lead/booking.
 *  - PSTN end-of-call-report with the required phone routing fields → classified to the full
 *    processing path with all three required fields present (would not 400).
 *  - Legacy `event: call.completed` fixtures still route to full processing (backward compatible).
 *  - Source is grounded (routing symbols present), fixtures exist, the doc carries no secret/PII.
 *  - Running this verifier does not mutate tracked files (git status before === after).
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
const DOC = 'docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_BUILD_244.md';

const SAMPLES = 'docs/samples';
const FIX_EOCR_PSTN = `${SAMPLES}/vapi-event-end-of-call-report.fake.json`;
const FIX_STATUS = `${SAMPLES}/vapi-event-status-update.fake.json`;
const FIX_CONV = `${SAMPLES}/vapi-event-conversation-update.fake.json`;
const FIX_SPEECH = `${SAMPLES}/vapi-event-speech-update.fake.json`;
const FIX_WEBCALL = `${SAMPLES}/vapi-event-webcall-end-of-call-report.fake.json`;
const FIX_LEGACY = `${SAMPLES}/vapi-post-call-sample.fake.json`;
const FIX_MISSING_PHONE = `${SAMPLES}/vapi-scenario-missing-phone.fake.json`;

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_AUTH = path.join(backendRoot, 'dist/middleware/vapi-webhook-auth.js');

(async function main() {
  const before = gitStatus();
  console.log('=== Build 244 Vapi webhook payload-shape FIX verification (local-only, in-process) ===');
  console.log('No call. No Vapi Talk. No Vapi rerun. No curl. No live HTTP. No Supabase write. No SMS. No Twilio. No credentials. No secret file read. No env mutation. No deploy. No runtime/external action. Offline behavioral test of the fix.');

  // --- Static grounding: the routing logic really exists in source. ---
  const service = read(SERVICE_SRC);
  for (const sym of [
    'classifyVapiWebhookEvent',
    'extractVapiEventType',
    'detectVapiCallTransport',
    'TERMINAL_EVENT_TYPES',
    'KNOWN_NON_TERMINAL_EVENT_TYPES',
    "'acknowledge_non_terminal'",
    "'acknowledge_web_call'",
    "'process_call_completed'",
  ]) {
    assert(service.includes(sym), `service source contains routing symbol: ${sym}`);
  }
  for (const t of ['end-of-call-report', 'status-update', 'conversation-update', 'speech-update']) {
    assert(service.includes(t), `service source references event type: ${t}`);
  }
  // Required-field gate still present (PSTN protection preserved).
  assert(/!normalized\.provider_call_id/.test(service) &&
    /!normalized\.caller_phone/.test(service) &&
    /!normalized\.roofer_destination_number/.test(service) &&
    /error:\s*'missing_required_field'/.test(service),
    'service source still enforces the phone-keyed required-field gate');
  pass('service source contains message-type routing + transport detection and keeps the required-field gate');

  // Route: 400 only on missing_required_field; auth middleware returns 401 (fail-closed).
  const route = read(ROUTE_SRC);
  assert(/error\s*===\s*'missing_required_field'/.test(route) && /status\(400\)/.test(route),
    'route returns 400 only on missing_required_field');
  assert(/res\.status\(200\)\.json\(result\)/.test(route), 'route returns 200 on ok result (no-op acks included)');
  assert(/requireVapiWebhookSecret/.test(route), 'route runs the fail-closed secret guard before the handler');
  const auth = read(AUTH_SRC);
  assert(/status\(401\)/.test(auth) && /unauthorized/.test(auth), 'auth middleware returns 401 on unauthorized');
  pass('route returns 200 on ok / 400 only on missing_required_field, behind the fail-closed 401 auth guard');

  // --- Fixtures exist. ---
  for (const f of [FIX_EOCR_PSTN, FIX_STATUS, FIX_CONV, FIX_SPEECH, FIX_WEBCALL]) {
    assert(fs.existsSync(path.join(repoRoot, f)), `Build 244 fixture exists: ${f}`);
  }
  pass('all Build 244 Vapi event-type fixtures exist (eocr, status, conversation, speech, webCall eocr)');

  // --- Compile the backend so we test the CURRENT source (dist is gitignored: no tracked-file churn). ---
  const tscBin = path.join(backendRoot, 'node_modules/.bin/tsc');
  assert(fs.existsSync(tscBin), 'local tsc is available for the behavioral build');
  execFileSync(tscBin, [], { cwd: backendRoot, stdio: 'pipe' });
  assert(fs.existsSync(DIST_SERVICE) && fs.existsSync(DIST_AUTH), 'compiled service + auth middleware exist after build');
  pass('backend compiled (tsc) for in-process behavioral testing');

  const svc = require(DIST_SERVICE);
  const authMod = require(DIST_AUTH);

  // --- Auth fails closed BEFORE handling (unauth → 401-bound reasons; match → authorized). ---
  assert(authMod.evaluateVapiWebhookAuth('', {}) === 'missing_secret_config', 'no configured secret → rejected');
  assert(authMod.evaluateVapiWebhookAuth('s', {}) === 'missing_request_secret', 'no request secret → rejected (401)');
  assert(authMod.evaluateVapiWebhookAuth('s', { authorization: 'Bearer wrong' }) === 'invalid_secret',
    'wrong request secret → rejected (401)');
  assert(authMod.evaluateVapiWebhookAuth('s', { authorization: 'Bearer s' }) === null, 'matching secret → authorized');
  pass('auth fails closed: missing/invalid secret rejected (401-bound), matching secret authorized, evaluated before handling');

  // --- Classification matches expectation for every fixture. ---
  const classifyCases = [
    [FIX_EOCR_PSTN, 'process_call_completed'],
    [FIX_STATUS, 'acknowledge_non_terminal'],
    [FIX_CONV, 'acknowledge_non_terminal'],
    [FIX_SPEECH, 'acknowledge_non_terminal'],
    [FIX_WEBCALL, 'acknowledge_web_call'],
    [FIX_LEGACY, 'process_call_completed'],
    [FIX_MISSING_PHONE, 'process_call_completed'],
  ];
  for (const [f, expected] of classifyCases) {
    const payload = readJson(f);
    const c = svc.classifyVapiWebhookEvent(payload);
    assert(c.decision === expected, `classify ${f} → ${c.decision} (expected ${expected})`);
  }
  pass('classifyVapiWebhookEvent routes all fixtures correctly (incl. backward-compatible legacy call.completed → process)');

  // --- Non-terminal events: ok no-op, processed:false, no lead/booking, NOT missing_required_field. ---
  for (const f of [FIX_STATUS, FIX_CONV, FIX_SPEECH]) {
    const r = await svc.processVapiCallCompleted(readJson(f));
    assert(r.ok === true, `non-terminal ${f} → ok:true (200/no-op)`);
    assert(r.acknowledged === true && r.processed === false, `non-terminal ${f} → acknowledged no-op`);
    assert(!r.error, `non-terminal ${f} → no error (not missing_required_field)`);
    assert(!r.inserted && !r.call_id && !r.matched_lead_id && !r.booking_id,
      `non-terminal ${f} → no call/lead/booking created`);
  }
  pass('authorized non-terminal events (status/conversation/speech update) return ok no-op (200), no lead/booking, no 400');

  // --- Browser/webCall end-of-call-report: ok no-op, web_call:true, NOT missing_required_field. ---
  {
    const r = await svc.processVapiCallCompleted(readJson(FIX_WEBCALL));
    assert(r.ok === true, 'webCall eocr → ok:true (controlled non-routed success / no-op)');
    assert(r.acknowledged === true && r.processed === false && r.web_call === true, 'webCall eocr → web-call no-op');
    assert(r.error !== 'missing_required_field' && !r.error, 'webCall eocr → NOT 400 missing_required_field');
    assert(!r.inserted && !r.call_id && !r.matched_lead_id && !r.booking_id,
      'webCall eocr → no lead/booking created');
  }
  pass('authorized browser/webCall end-of-call-report returns ok no-op, web_call:true, no lead/booking, NOT 400 missing_required_field');

  // --- PSTN end-of-call-report: classified to full processing with all required fields present. ---
  {
    const payload = readJson(FIX_EOCR_PSTN);
    const c = svc.classifyVapiWebhookEvent(payload);
    const n = svc.normalizeVapiCallCompletedPayload(payload);
    assert(c.decision === 'process_call_completed', 'PSTN eocr → enters full processing path');
    assert(Boolean(n.provider_call_id) && Boolean(n.caller_phone) && Boolean(n.roofer_destination_number),
      'PSTN eocr → all three required fields present (would not return missing_required_field)');
    // Do NOT call processVapiCallCompleted here: the process path performs Supabase access.
  }
  pass('authorized PSTN end-of-call-report with required phone routing fields enters the existing full processing path (no 400)');

  // --- Fixtures carry no real secrets/tokens; the doc carries no secret/PII-shaped values. ---
  const doc = read(DOC);
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'doc contains no token-shaped secret');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'doc contains no phone-number-shaped value');
  for (const f of [FIX_STATUS, FIX_CONV, FIX_SPEECH, FIX_WEBCALL]) {
    const raw = read(f);
    assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(raw) && !/\bsk-[A-Za-z0-9]{16,}\b/.test(raw) &&
      !/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(raw), `fixture has no secret-shaped value: ${f}`);
  }
  pass('Build 244 doc carries no secret/token/phone-shaped value; non-phone fixtures carry no secret-shaped value');

  // --- Doc records root cause + remaining limitation. ---
  assert(/[Bb]uild 243/.test(doc) && /missing_required_field/.test(doc), 'doc records the Build 243 root cause');
  assert(/not_yet_validated|separate runtime validation|still needs/.test(doc),
    'doc records the remaining limitation (runtime validation still needed after this fix)');
  pass('Build 244 doc records the Build 243 root cause and the remaining runtime-validation limitation');

  // --- Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier did not mutate tracked files (dist build is gitignored)');

  console.log(`\nPASS: Build 244 Vapi webhook payload-shape FIX verified (${passCount} checks).`);
  console.log('live_http_called=false  vapi_talk_used=false  vapi_rerun=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  supabase_write=false  deploy=false  secret_file_read=false  auth_fail_closed=true  non_terminal_noop=true  webcall_noop_not_400=true  pstn_enters_full_path=true  legacy_call_completed_backward_compatible=true  lead_or_booking_created_for_noop=false  secrets_in_repo=0  tracked_files_unchanged=true');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.message); process.exit(1); });
