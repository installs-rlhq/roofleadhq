#!/usr/bin/env node
/**
 * Build 277 Verifier — Structured Appointment Fields Readiness after Build 276 (repo-only, offline, in-process).
 *
 * Strategic goal: MOVE the first-roofer E2E frontier from "lead + call persisted, booking not created"
 * (Build 276) to "booking extraction ready for one controlled retest" — WITHOUT any live call/SMS/
 * provider/deploy/DB read, and WITHOUT changing production code behavior. Build 276 proved (against the
 * real compiled service + a fake in-process Supabase) that the mapped-roofer first-roofer PSTN EOCR
 * persisted lead + call but produced booking_id=null because the normalized appointment fields were
 * false/null — the Vapi Test Roofing Assistant's End Of Call Report carried NO structured appointment
 * fields, and the backend normalizer reads appointment signals from STRUCTURED fields only (no
 * transcript/summary fallback).
 *
 * Preferred path forward is Option 1: configure the Test Roofing Assistant's structured-data / analysis
 * schema to EMIT the appointment fields the backend already reads. This verifier proves — offline —
 * that once the assistant emits that schema, the SAME verbal-appointment call that produced
 * booking_id=null in Build 274/276 will instead CREATE the booking, with NO backend code change.
 *
 * What this verifier proves (all offline, no network, no real Supabase):
 *
 *   1. STATIC grounding of the exact structured-data paths Jason must configure the assistant to emit,
 *      as READ by the current compiled normalizer (normalizeVapiCallCompletedPayload):
 *        - appointment_booked  <- analysis.structuredData.appointment_booked (boolean)
 *        - appointment_time    <- analysis.structuredData.appointment_time   (ISO 8601 datetime)
 *        - appointment_requested <- analysis.structuredData.appointment_requested (boolean)
 *      and the booking gate `!normalized.appointment_booked || !normalized.appointment_time` in
 *      createVapiBooking (booking_id created iff BOTH are truthy). No code change is made or required.
 *
 *   2. CASE 1 — REGRESSION / the gap: the Build 276 verbal-appointment EOCR fixture that carries NO
 *      structured appointment fields -> normalizes appointment_booked=false / appointment_time=null ->
 *      booking_id=null (mapped roofer resolves, lead + call still persist). Confirms the frontier is
 *      unchanged until the assistant emits the schema.
 *
 *   3. CASE 2 — the POST-CONFIG offline proof: a new fixture
 *      (docs/samples/vapi-event-structured-appointment-post-config.fake.json) that MIRRORS the same
 *      Build 276 verbal call (same homeowner intent: a Thursday 2 PM site visit) but now EMITS the
 *      structured appointment fields under message.analysis.structuredData -> normalizes
 *      appointment_booked=true / appointment_time set / appointment_requested=true -> the mapped roofer
 *      resolves, lead + call persist, and createVapiBooking now CREATES the booking (booking_id present)
 *      -- with NO backend code change. This is the exact "reconfirm offline" step the Build 276 doc
 *      called for (step 9): it demonstrates that the same call that gave booking_id=null will create a
 *      booking once the assistant emits this schema.
 *
 *   4. Approval/readiness doc grounding: the Build 277 approval packet documents the exact fields,
 *      the exact config boundary, and the deferral of the Option 2 code fallback.
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no
 * call, no SMS, no Twilio, no Retell, no Vapi API, no deploy, no config change, no schema/RLS change,
 * no secret read, no env persisted beyond this process. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Reserved fictional 555-01xx numbers only; no real phone
 * number, no real UUID, no real call id, no PII, no real clean Vapi number. Non-mutating: asserts git
 * status is unchanged (the tsc dist build is gitignored).
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

const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';
const DOC = 'docs/VAPI_STRUCTURED_APPOINTMENT_FIELDS_APPROVAL_BUILD_277.md';
const B276_DOC = 'docs/FIRST_ROOFER_E2E_PERSISTENCE_EVIDENCE_CORRECTION_BUILD_276.md';

const SAMPLES = 'docs/samples';
const FIX_VERBAL = `${SAMPLES}/vapi-event-mapped-eocr-verbal-appointment-no-structured.fake.json`;
const FIX_POST_CONFIG = `${SAMPLES}/vapi-event-structured-appointment-post-config.fake.json`;

const B276_COMMIT = 'b642e93';
const B271_COMMIT = '4d36bdf';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

/**
 * Fake Supabase client (same shape as Build 275/276's): roofers is eq-AWARE (byte-exact twilio_number
 * match, mirroring Postgres text equality); calls/leads/bookings resolve to spec.insert after
 * .insert() else spec.select. Only the methods the service calls are implemented. No network.
 */
function makeFakeSupabase(config) {
  return {
    from(table) {
      if (table === 'roofers' && config.roofers && (config.roofers.rows || config.roofers.error)) {
        const rows = config.roofers.rows ?? [];
        const error = config.roofers.error ?? null;
        const filters = [];
        const chain = {
          select() { return chain; },
          eq(col, val) { filters.push([col, val]); return chain; },
          maybeSingle() {
            if (error) return Promise.resolve({ data: null, error });
            const match = rows.find((r) => filters.every(([c, v]) => r[c] === v)) ?? null;
            return Promise.resolve({ data: match, error: null });
          },
        };
        return chain;
      }

      const spec = config[table] ?? {};
      const selectResult = spec.select ?? { data: null, error: null };
      const insertResult = spec.insert ?? { data: null, error: null };
      let inserted = false;
      const resolve = () => Promise.resolve(inserted ? insertResult : selectResult);
      const chain = {
        select() { return chain; },
        eq() { return chain; },
        insert() { inserted = true; return chain; },
        limit() { return resolve(); },
        maybeSingle() { return resolve(); },
        single() { return resolve(); },
      };
      return chain;
    },
  };
}

// Reusable table specs for the persist path (roofer resolves, no existing call, lead+booking creatable).
const persistTables = () => ({
  calls: { select: { data: null, error: null }, insert: { data: { id: 'call-new-277' }, error: null } },
  leads: { select: { data: [], error: null }, insert: { data: { id: 'lead-new-277' }, error: null } },
  bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-277' }, error: null } },
});

(async function main() {
  const before = gitStatus();
  console.log('=== Build 277 Structured Appointment Fields Readiness after Build 276 (repo-only, in-process, fake Supabase) ===');
  console.log('No call. No SMS. No Vapi Test/Talk/webCall. No Vapi rerun. No curl. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No config change. No deploy. No schema/RLS change. No secret file read. No production DB read. Proves offline that once the Test Roofing Assistant emits the structured appointment schema the backend already reads, the same verbal-appointment call that produced booking_id=null in Build 274/276 will CREATE the booking with NO code change.');

  // --- 1. Static grounding: the exact structured-data paths the assistant must emit (as READ today) + booking gate. ---
  const service = read(SERVICE_SRC);

  // appointment_booked read from analysis.structuredData.appointment_booked (structured only).
  const bookedBlock = service.match(/const appointmentBooked = firstBooleanValue\(([\s\S]*?)\);/);
  assert(bookedBlock, 'normalizer defines appointment_booked via firstBooleanValue');
  assert(/structuredData\.appointment_booked/.test(bookedBlock[1]),
    'normalizer reads structuredData.appointment_booked (the exact field Jason must configure the assistant to emit)');
  assert(!/transcript|summary/.test(bookedBlock[1]),
    'appointment_booked is structured-only (no transcript/summary fallback) — confirms the Vapi-config path is the fix');

  // appointment_time read from analysis.structuredData.appointment_time.
  const timeBlock = service.match(/const appointmentTime = firstTimestampValue\(([\s\S]*?)\);/);
  assert(timeBlock, 'normalizer defines appointment_time via firstTimestampValue');
  assert(/structuredData\.appointment_time/.test(timeBlock[1]),
    'normalizer reads structuredData.appointment_time (ISO 8601 datetime the assistant must emit)');
  assert(!/transcript|summary/.test(timeBlock[1]),
    'appointment_time is structured-only (no transcript/summary fallback)');

  // appointment_requested read from analysis.structuredData.appointment_requested.
  const requestedBlock = service.match(/const appointmentRequested = firstBooleanValue\(([\s\S]*?)\);/);
  assert(requestedBlock, 'normalizer defines appointment_requested via firstBooleanValue');
  assert(/structuredData\.appointment_requested/.test(requestedBlock[1]),
    'normalizer reads structuredData.appointment_requested (the boolean the assistant should emit when supported)');

  // structuredData source path: analysis.structuredData.
  assert(/analysis\.structuredData\s*\?\?/.test(service),
    'normalizer sources structuredData from analysis.structuredData (message.analysis.structuredData on an EOCR)');
  pass('static grounding: normalizer reads structuredData.appointment_booked / appointment_time / appointment_requested — the exact assistant-emitted schema');

  // Booking gate: booking created iff appointment_booked AND appointment_time both truthy.
  assert(/if\s*\(!normalized\.appointment_booked\s*\|\|\s*!normalized\.appointment_time\)\s*\{\s*return null;/.test(service),
    'createVapiBooking gates on !appointment_booked || !appointment_time — booking created iff BOTH structured fields arrive');
  pass('static grounding: booking gate requires appointment_booked=true AND appointment_time set');

  // --- 2. Compile the CURRENT backend (dist is gitignored: no tracked-file churn). ---
  const tscBin = path.join(backendRoot, 'node_modules/.bin/tsc');
  assert(fs.existsSync(tscBin), 'local tsc is available for the behavioral build');
  execFileSync(tscBin, [], { cwd: backendRoot, stdio: 'pipe' });
  assert(fs.existsSync(DIST_SERVICE) && fs.existsSync(DIST_CONFIG), 'compiled service + config exist after build');
  pass('backend compiled (tsc) for in-process behavioral verification');

  process.env.SUPABASE_URL = process.env.SUPABASE_URL || 'https://fake.local.invalid';
  process.env.SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'fake-service-role-key-offline';

  let fakeConfig = {};
  const supabaseModPath = require.resolve('@supabase/supabase-js', { paths: [backendRoot] });
  require.cache[supabaseModPath] = {
    id: supabaseModPath,
    filename: supabaseModPath,
    loaded: true,
    exports: { createClient: () => makeFakeSupabase(fakeConfig) },
  };

  const svc = require(DIST_SERVICE);

  // === CASE 1 — REGRESSION / the gap: verbal EOCR with NO structured fields -> booking_id=null. ===
  {
    const verbal = readJson(FIX_VERBAL);
    const nz = svc.normalizeVapiCallCompletedPayload(verbal);
    assert(nz.appointment_booked === false && nz.appointment_time === null,
      'CASE 1 -> verbal-only EOCR normalizes appointment_booked=false, appointment_time=null (no structured fields)');
    const dest = nz.roofer_destination_number;
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-277', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(verbal);
    assert(r.ok === true && r.inserted === true && r.duplicate === false,
      'CASE 1 -> ok:true, inserted:true, duplicate:false (mapped roofer, persisting branch)');
    assert(r.matched_lead_id === 'lead-new-277' && r.call_id === 'call-new-277',
      'CASE 1 -> lead + call persist');
    assert(r.booking_id === null,
      'CASE 1 -> booking_id=null (frontier unchanged until the assistant emits structured appointment fields)');
  }
  pass('CASE 1 (regression): verbal EOCR without structured fields -> lead+call persist, booking_id=null (Build 276 frontier reproduced)');

  // === CASE 2 — POST-CONFIG offline proof: same call, now WITH structured fields -> booking created. ===
  {
    const postConfig = readJson(FIX_POST_CONFIG);
    const nz = svc.normalizeVapiCallCompletedPayload(postConfig);
    assert(nz.appointment_booked === true,
      'CASE 2 -> post-config EOCR normalizes appointment_booked=true (from structuredData.appointment_booked)');
    assert(typeof nz.appointment_time === 'string' && nz.appointment_time.length > 0,
      'CASE 2 -> post-config EOCR normalizes appointment_time to a non-empty ISO datetime (from structuredData.appointment_time)');
    assert(nz.appointment_requested === true,
      'CASE 2 -> post-config EOCR normalizes appointment_requested=true (from structuredData.appointment_requested)');
    const dest = nz.roofer_destination_number;
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-277', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(postConfig);
    assert(r.ok === true && r.inserted === true && r.duplicate === false,
      'CASE 2 -> ok:true, inserted:true, duplicate:false (same mapped-roofer persisting branch)');
    assert(r.roofer_id === 'roofer-277', 'CASE 2 -> mapped roofer resolved');
    assert(r.matched_lead_id === 'lead-new-277' && r.call_id === 'call-new-277',
      'CASE 2 -> lead + call persist');
    assert(r.booking_id === 'booking-new-277',
      'CASE 2 -> booking IS created (booking_id present) once the assistant emits the structured appointment fields — NO code change');
    assert(r.normalized.appointment_booked === true && r.normalized.appointment_time,
      'CASE 2 -> returned normalized appointment fields are true/set (the booking-gate inputs are satisfied)');
  }
  pass('CASE 2 (post-config proof): SAME verbal call now emitting structured appointment fields -> booking_id present with NO backend code change');

  // --- 3. Approval/readiness doc grounding (status tokens, exact fields, config boundary, Opt-2 deferral). ---
  const doc = read(DOC);
  const DOC_TOKENS = [
    'build_271_redone = false',
    'build_276_redone = false',
    'current_frontier = booking_extraction_after_build_276',
    'preferred_path = structured_vapi_appointment_fields',
    'opt2_code_fallback_status = deferred',
    'appointment_booked_field_defined = true',
    'appointment_time_field_defined = true',
    'appointment_requested_field_defined_if_supported = true',
    'structured_fields_config_approval_status = new_packet_created',
    'offline_booking_case2_status = passed',
    'live_pstn_retest_approval_status = not_requested_until_offline_passes',
    'no_call_placed = true',
    'no_sms_sent = true',
    'no_phone_number_changed = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_railway_config_changed = true',
    'no_backend_deploy = true',
    'no_vapi_config_changed_by_this_build = true',
    'no_secret_printing = true',
    'full_clean_vapi_number_recorded_in_repo = false',
  ];
  for (const t of DOC_TOKENS) assert(doc.includes(t), `B277 doc missing status token: ${t}`);

  // Exact structured field names must appear in the approval doc.
  assert(/analysis\.structuredData\.appointment_booked/.test(doc), 'B277 doc names structuredData.appointment_booked');
  assert(/analysis\.structuredData\.appointment_time/.test(doc), 'B277 doc names structuredData.appointment_time');
  assert(/analysis\.structuredData\.appointment_requested/.test(doc), 'B277 doc names structuredData.appointment_requested');
  assert(/ISO 8601/.test(doc), 'B277 doc specifies appointment_time is ISO 8601');

  // Config boundary: Test Roofing Assistant only; keep number 0389; no provider/deploy/schema changes.
  assert(/Test Roofing Assistant/.test(doc), 'B277 doc scopes the config to the Test Roofing Assistant only');
  assert(/0389/.test(doc), 'B277 doc keeps the clean Vapi number (last-4 0389) assigned; masked');
  assert(/no phone number change/i.test(doc), 'B277 doc forbids any phone number change');
  assert(/Option 2/.test(doc) && /defer/i.test(doc), 'B277 doc defers the Option 2 code fallback');
  assert(/verify-structured-appointment-fields-build-277-readonly\.js/.test(doc),
    'B277 doc references this verifier');
  assert(/run-structured-appointment-fields-build-277-dry-run\.sh/.test(doc),
    'B277 doc references its dry-run');
  assert(/vapi-event-structured-appointment-post-config\.fake\.json/.test(doc),
    'B277 doc references the post-config fixture');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not read/i.test(doc),
    'B277 doc states the local secret file was not read');

  // No secret / PII / raw-number leakage. "Launch Test Roofing 1780434363" is Jason's chosen row LABEL.
  const scrubbed = doc.replace(/Launch Test Roofing 1780434363/g, 'ROW_LABEL');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B277 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B277 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B277 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc), 'B277 doc contains no raw UUID');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed), 'B277 doc contains no phone-number-shaped value');
  pass('B277 approval/readiness doc grounds the frontier, the exact fields, the config boundary, the Opt-2 deferral, and carries no secret/PII');

  // --- 4. Post-config fixture masking: reserved 555 numbers only; structured schema present; no UUID/secret. ---
  const fixRaw = read(FIX_POST_CONFIG);
  const fix = JSON.parse(fixRaw);
  assert(/\+1555555\d{4}/.test(fixRaw), 'post-config fixture uses reserved fictional 555 numbers');
  assert(fix.message?.analysis?.structuredData?.appointment_booked === true,
    'post-config fixture emits structuredData.appointment_booked=true');
  assert(typeof fix.message?.analysis?.structuredData?.appointment_time === 'string',
    'post-config fixture emits structuredData.appointment_time (ISO datetime)');
  assert(fix.message?.analysis?.structuredData?.appointment_requested === true,
    'post-config fixture emits structuredData.appointment_requested=true');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(fixRaw), 'post-config fixture contains no raw UUID');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(fixRaw), 'post-config fixture contains no JWT-shaped secret');
  pass('post-config fixture is sanitized (reserved 555 numbers, structured appointment schema present, no UUID/secret)');

  // --- 5. Prerequisite commits + predecessor doc present. ---
  assert(commitPresent(B276_COMMIT), 'Build 276 prerequisite commit b642e93 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(fs.existsSync(path.join(repoRoot, B276_DOC)), 'Build 276 predecessor doc exists');
  pass('Build 276 + 271 prerequisite commits present and Build 276 predecessor doc exists');

  // --- 6. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 277 Structured Appointment Fields Readiness verified (${passCount} checks).`);
  console.log('build_mode=structured_appointment_fields_readiness_repo_only  build_271_redone=false  build_276_redone=false  current_frontier=booking_extraction_after_build_276  preferred_path=structured_vapi_appointment_fields  opt2_code_fallback_status=deferred  appointment_booked_field_defined=true  appointment_time_field_defined=true  appointment_requested_field_defined_if_supported=true  structured_fields_config_approval_status=new_packet_created  offline_booking_case2_status=passed  verbal_without_structured_fields_still_booking_null=true  post_config_structured_fields_create_booking=true  backend_code_change=false  live_pstn_retest_approval_status=not_requested_until_offline_passes  no_call_placed=true  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed_by_this_build=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
