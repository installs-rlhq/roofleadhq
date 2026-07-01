#!/usr/bin/env node
/**
 * Build 284 Verifier — Second Live Booking Observation Gap + Conservative Summary/Transcript Fallback
 * (repo-only, offline).
 *
 * Strategic goal: capture the sanitized backend response from the SECOND live booking-observation call
 * (Build 283-approved, consumed once, no retry), which — even with the Build 281 structuredOutputs fix
 * DEPLOYED (proved live by Build 283) — again normalized appointment_booked=false / appointment_requested=
 * false / appointment_time=null (booking_id=null) while the summary + transcript clearly described a
 * Thursday, July 2nd, 2 PM in-person site visit. Diagnose: the live call-completed payload carried NO
 * usable structured appointment fields at processing time (neither structuredData nor structuredOutputs),
 * so the structured-only path is insufficient live. Validate the smallest safe fix: a conservative
 * summary/transcript booking fallback that fires ONLY when the structured signal is absent and only on
 * confident booking language + appointment noun + an EXPLICIT calendar date + a clock time.
 *
 * This verifier (in-process, real compiled backend + eq-aware fake Supabase):
 *   0. Proves the SOURCE fix is present (deriveBookingTimeFromText fallback wired after structured reads).
 *   1. LIVE-SHAPE FIX PROOF: the sanitized second-live fixture (summary/transcript describe "Thursday,
 *      July 2nd, at 2 PM"; NO structured fields) -> mapped roofer resolves, lead+call persist, booking
 *      IS created (booking_id present) with the correct 2026-07-02T14:00:00.000Z time. Closes the gap.
 *   2. NEGATIVE — callback-with-date: explicit date/time but no appointment noun -> booking_id=null.
 *   3. NEGATIVE — weekday-only verbal (Build 276/281 FIX_VERBAL): still false/false/null -> booking_id=null
 *      (the Build 277-281 invariant is preserved unchanged; a bare weekday must NOT auto-book).
 *   4. NEGATIVE — vague/callback + emergency scenarios -> no booking.
 *   5. REGRESSION: legacy structuredData AND Build 281 structuredOutputs live-shape both still create the
 *      booking via the structured path (fallback not reached; precedence preserved).
 *   6. Evidence-doc grounding: exact sanitized statuses; masked IDs only; 0389; honest non-overclaim.
 *   7. Doc + new fixtures carry no secret / PII / raw phone / UUID / email / recording URL.
 *   8. Prerequisite commits present (Build 283/282/281/280/279/271); predecessor docs present.
 *   9. Non-mutating (tracked files unchanged; dist is gitignored).
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no call,
 * no SMS, no Twilio, no Retell, no Vapi API, no deploy, no config change, no schema/RLS change, no secret
 * read, no production DB read/export, no env persisted beyond this process. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Reserved fictional 555-01xx numbers only.
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

const EVIDENCE_DOC = 'docs/BUILD_283_LIVE_BOOKING_OBSERVATION_GAP_AND_FALLBACK_FIX_BUILD_284.md';
const B283_DOC = 'docs/BUILD_282_RUNTIME_DEPLOYMENT_EVIDENCE_BUILD_283.md';
const B281_DOC = 'docs/BUILD_280_BOOKING_PERSISTENCE_GAP_AND_FIX_BUILD_281.md';
const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';

const SAMPLES = 'docs/samples';
const FIX_LIVE_SUMMARY = `${SAMPLES}/vapi-event-mapped-eocr-summary-booking-no-structured-build-284.fake.json`;
const FIX_CALLBACK_DATE = `${SAMPLES}/vapi-event-mapped-eocr-callback-with-date-no-booking-build-284.fake.json`;
const FIX_VERBAL = `${SAMPLES}/vapi-event-mapped-eocr-verbal-appointment-no-structured.fake.json`;
const FIX_LEGACY_STRUCTURED = `${SAMPLES}/vapi-event-structured-appointment-post-config.fake.json`;
const FIX_STRUCTURED_OUTPUTS = `${SAMPLES}/vapi-event-structured-outputs-appointment-live-shape.fake.json`;
const FIX_UNBOOKED = `${SAMPLES}/vapi-scenario-unbooked-followup.fake.json`;
const FIX_EMERGENCY = `${SAMPLES}/vapi-scenario-emergency-leak.fake.json`;

const B283_COMMIT = '8ba1c18';
const B282_COMMIT = '613ce56';
const B281_COMMIT = '72f834f';
const B280_COMMIT = 'dc66c9b';
const B279_COMMIT = 'fa04692';
const B271_COMMIT = '4d36bdf';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

/**
 * Fake Supabase client (same shape as Build 275-281's): roofers is eq-AWARE (byte-exact twilio_number
 * match, mirroring Postgres text equality); calls/leads/bookings resolve to spec.insert after .insert()
 * else spec.select. Only the methods the service calls are implemented. No network.
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

const persistTables = () => ({
  calls: { select: { data: null, error: null }, insert: { data: { id: 'call-new-284' }, error: null } },
  leads: { select: { data: [], error: null }, insert: { data: { id: 'lead-new-284' }, error: null } },
  bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-284' }, error: null } },
});

(async function main() {
  const before = gitStatus();
  console.log('=== Build 284 Second Live Booking Observation Gap + Conservative Summary/Transcript Fallback (repo-only, in-process, fake Supabase) ===');
  console.log('No call. No additional call. No retry. No SMS. No Vapi Test/Talk/webCall. No Vapi rerun. No curl. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No config change. No deploy. No schema/RLS change. No secret file read. No production DB read/export. Captures the sanitized SECOND live backend response, diagnoses the missing/unreadable structured appointment fields, and proves the conservative summary/transcript fallback offline.');

  // --- 0. Source fix present (fallback wired AFTER structured reads, precedence preserved). ---
  const src = read(SERVICE_SRC);
  assert(/function\s+deriveBookingTimeFromText/.test(src),
    'service source defines the conservative deriveBookingTimeFromText fallback');
  assert(/function\s+extractCalendarDateFromText/.test(src) && /function\s+extractClockTimeFromText/.test(src),
    'service source defines the calendar-date + clock-time extractors');
  assert(/deriveBookingTimeFromText\(summary,\s*anchorIso\)/.test(src) &&
    /deriveBookingTimeFromText\(transcript,\s*anchorIso\)/.test(src),
    'fallback reads summary first, then transcript');
  // Precedence: the fallback block runs only after the structuredData/structuredOutputs candidates.
  assert(src.indexOf("extractStructuredOutputValue(structuredOutputs, 'appointment_time')") <
    src.indexOf('deriveBookingTimeFromText(summary'),
    'structured (structuredData -> structuredOutputs) candidates still precede the Build 284 text fallback');
  assert(/!finalAppointmentBooked\s*\|\|\s*!finalAppointmentTime/.test(src),
    'fallback is gated to run ONLY when the structured signal did not book with a time');
  pass('source fix present: conservative summary/transcript fallback wired after structured reads (precedence preserved)');

  // --- 1. Compile the CURRENT backend (dist is gitignored: no tracked-file churn). ---
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

  const withRoofer = (dest) => {
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-284', business_name: 'Launch Test Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
  };

  // === 1. LIVE-SHAPE FIX PROOF: summary/transcript booking (no structured fields) -> booking created. ===
  {
    const live = readJson(FIX_LIVE_SUMMARY);
    const nz = svc.normalizeVapiCallCompletedPayload(live);
    assert(nz.appointment_booked === true && nz.appointment_requested === true,
      'LIVE-SHAPE -> fallback normalizes appointment_booked=true, appointment_requested=true from summary/transcript');
    assert(nz.appointment_time === '2026-07-02T14:00:00.000Z',
      `LIVE-SHAPE -> appointment_time derived to 2026-07-02T14:00:00.000Z (got ${nz.appointment_time})`);
    withRoofer(nz.roofer_destination_number);
    const r = await svc.processVapiCallCompleted(live);
    assert(r.ok === true && r.inserted === true && r.duplicate === false,
      'LIVE-SHAPE -> ok:true, inserted:true, duplicate:false (mapped roofer persisting branch)');
    assert(r.matched_lead_id === 'lead-new-284' && r.call_id === 'call-new-284', 'LIVE-SHAPE -> lead + call persist');
    assert(r.booking_id === 'booking-new-284',
      'LIVE-SHAPE -> booking IS created from the summary/transcript fallback (second live booking gap closed offline)');
  }
  pass('LIVE-SHAPE fix proof: summary/transcript-only live payload -> lead+call persist AND booking created (booking_id present)');

  // === 2. NEGATIVE — callback-with-date: explicit date/time but no appointment noun -> no booking. ===
  {
    const cb = readJson(FIX_CALLBACK_DATE);
    const nz = svc.normalizeVapiCallCompletedPayload(cb);
    assert(nz.appointment_booked === false && nz.appointment_requested === false && nz.appointment_time === null,
      'NEGATIVE callback-with-date -> false/false/null (no appointment noun, so no auto-book despite a date+time)');
    withRoofer(nz.roofer_destination_number);
    const r = await svc.processVapiCallCompleted(cb);
    assert(r.ok === true && r.inserted === true && r.booking_id === null,
      'NEGATIVE callback-with-date -> lead+call persist, booking_id=null (fallback does not over-book callbacks)');
  }
  pass('NEGATIVE: callback-only conversation with a date+time but no appointment noun -> booking_id=null');

  // === 3. NEGATIVE — weekday-only verbal (Build 276/281 FIX_VERBAL): still no booking (invariant preserved). ===
  {
    const verbal = readJson(FIX_VERBAL);
    const nz = svc.normalizeVapiCallCompletedPayload(verbal);
    assert(nz.appointment_booked === false && nz.appointment_requested === false && nz.appointment_time === null,
      'NEGATIVE weekday-only -> false/false/null (a bare weekday like "Thursday" is NOT an explicit calendar date; Build 277-281 invariant preserved)');
    withRoofer(nz.roofer_destination_number);
    const r = await svc.processVapiCallCompleted(verbal);
    assert(r.ok === true && r.inserted === true && r.booking_id === null,
      'NEGATIVE weekday-only -> booking_id=null (no bare-weekday auto-book; prior builds not disturbed)');
  }
  pass('NEGATIVE: weekday-only verbal fixture still yields booking_id=null (Build 277-281 FIX_VERBAL invariant preserved)');

  // === 4. NEGATIVE — vague callback + emergency scenarios -> no booking. ===
  {
    for (const [relPath, label] of [[FIX_UNBOOKED, 'unbooked-followup'], [FIX_EMERGENCY, 'emergency-leak']]) {
      const nz = svc.normalizeVapiCallCompletedPayload(readJson(relPath));
      assert(nz.appointment_booked === false && nz.appointment_time === null,
        `NEGATIVE ${label} -> appointment_booked=false, appointment_time=null (no confident scheduled visit)`);
    }
  }
  pass('NEGATIVE: vague callback + emergency scenarios do not create a booking');

  // === 5. REGRESSION: structured paths still create the booking (fallback not reached). ===
  {
    const legacy = readJson(FIX_LEGACY_STRUCTURED);
    const nzL = svc.normalizeVapiCallCompletedPayload(legacy);
    assert(nzL.appointment_booked === true && typeof nzL.appointment_time === 'string' && nzL.appointment_time.length > 0,
      'REGRESSION -> legacy analysis.structuredData still normalizes booked=true + time (unchanged)');
    withRoofer(nzL.roofer_destination_number);
    const rL = await svc.processVapiCallCompleted(legacy);
    assert(rL.ok === true && rL.inserted === true && rL.booking_id === 'booking-new-284',
      'REGRESSION -> legacy structuredData path still creates the booking');

    const so = readJson(FIX_STRUCTURED_OUTPUTS);
    const nzS = svc.normalizeVapiCallCompletedPayload(so);
    assert(nzS.appointment_booked === true && nzS.appointment_requested === true &&
      typeof nzS.appointment_time === 'string' && nzS.appointment_time.length > 0,
      'REGRESSION -> Build 281 structuredOutputs live-shape still normalizes booked=true + time (unchanged)');
    withRoofer(nzS.roofer_destination_number);
    const rS = await svc.processVapiCallCompleted(so);
    assert(rS.ok === true && rS.inserted === true && rS.booking_id === 'booking-new-284',
      'REGRESSION -> Build 281 structuredOutputs path still creates the booking');
  }
  pass('REGRESSION: legacy structuredData AND Build 281 structuredOutputs both still create the booking (structured precedence preserved)');

  // --- 6. Evidence-doc grounding: exact sanitized statuses. ---
  const doc = read(EVIDENCE_DOC);
  const DOC_TOKENS = [
    'build_283_one_call_approval_consumed = true',
    'no_new_call_placed = true',
    'no_retry_performed = true',
    'controlled_live_booking_observation_status = completed_once_no_retry',
    'webhook_backend_delivery_status = completed_200_ok',
    'mapped_roofer_status = passed',
    'lead_persistence_status = passed',
    'call_persistence_status = passed',
    'booking_persistence_status = failed_again_after_deployed_build_281_fix',
    'first_roofer_e2e_status = partial_pass_booking_gap',
    'summary_transcript_fallback_status = implemented',
    'actual_gap = live_webhook_missing_or_unreadable_structured_appointment_fields',
    'no_sms_sent = true',
    'no_phone_number_changed = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_vapi_config_changed = true',
    'no_railway_config_changed = true',
    'no_backend_deploy = true',
    'no_schema_auth_rls_changed = true',
    'no_production_data_export = true',
    'no_secret_printing = true',
    'full_clean_vapi_number_recorded_in_repo = false',
  ];
  for (const t of DOC_TOKENS) assert(doc.includes(t), `B284 evidence doc missing status token: ${t}`);
  assert(/HTTP status\s*\|\s*`200`/.test(doc), 'B284 doc records HTTP 200');
  assert(/`ok`\s*\|\s*`true`/.test(doc), 'B284 doc records ok:true');
  assert(/`inserted`\s*\|\s*`true`/.test(doc), 'B284 doc records inserted:true');
  assert(/`duplicate`\s*\|\s*`false`/.test(doc), 'B284 doc records duplicate:false');
  assert(/`booking_id`\s*\|\s*`null`/.test(doc), 'B284 doc records booking_id=null');
  assert(/`normalized\.appointment_booked`\s*\|\s*`false`/.test(doc), 'B284 doc records normalized.appointment_booked=false');
  assert(/`normalized\.appointment_requested`\s*\|\s*`false`/.test(doc), 'B284 doc records normalized.appointment_requested=false');
  assert(/`normalized\.appointment_time`\s*\|\s*`null`/.test(doc), 'B284 doc records normalized.appointment_time=null');
  assert(/structuredOutputs/.test(doc) && /structuredData/.test(doc),
    'B284 doc names both the structuredOutputs and structuredData structured paths');
  assert(/summary/i.test(doc) && /transcript/i.test(doc), 'B284 doc names the summary + transcript fallback');
  assert(/0389/.test(doc), 'B284 doc references the clean Vapi test number (last-4 0389), masked');
  assert(/July 2/.test(doc) && /2 PM/.test(doc), 'B284 doc records the Thursday July 2nd 2 PM scheduled visit (sanitized)');
  assert(/masked/i.test(doc), 'B284 doc records IDs as masked');
  // Honest non-overclaim: the LIVE call must NOT be recorded as booking passed.
  assert(!/booking_persistence_status = passed\b/.test(doc),
    'B284 doc must NOT overclaim live booking persistence as passed (live booking_id was null)');
  assert(/NOT committed/i.test(doc) || /not committed/i.test(doc),
    'B284 doc states the raw transcript/body is not committed');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not read/i.test(doc),
    'B284 doc states the local secret file was not read');
  pass('B284 evidence doc grounds the exact sanitized backend response, diagnosis, fix, and honest non-overclaim');

  // --- 7. Evidence doc + new fixtures carry no secret / PII / raw phone / UUID / email / recording URL. ---
  {
    const noSecretScan = (text, label) => {
      assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(text), `${label} contains no JWT-shaped secret`);
      assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(text), `${label} contains no sk- API-key-shaped secret`);
      assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(text), `${label} contains no token-shaped secret`);
      assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(text), `${label} contains no raw UUID`);
      assert(!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(text), `${label} contains no email address`);
      assert(!/https?:\/\/\S*recording\S*/i.test(text), `${label} contains no recording URL`);
    };
    // Doc: also no bare phone-number-shaped values.
    noSecretScan(doc, 'B284 doc');
    assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B284 doc contains no phone-number-shaped value');

    for (const rel of [FIX_LIVE_SUMMARY, FIX_CALLBACK_DATE]) {
      const raw = read(rel);
      noSecretScan(raw, `fixture ${rel}`);
      assert(!/https?:\/\//.test(raw), `fixture ${rel} has no URL`);
      const phones = raw.match(/\+1\d{10}/g) || [];
      for (const p of phones) assert(/^\+1555555\d{4}$/.test(p), `fixture ${rel} uses reserved fictional 555 numbers only (found ${p})`);
    }
  }
  pass('B284 evidence doc + new fixtures carry no secret / PII / raw phone / UUID / email / recording URL');

  // --- 8. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B283_COMMIT), 'Build 283 prerequisite commit 8ba1c18 present in git history');
  assert(commitPresent(B282_COMMIT), 'Build 282 prerequisite commit 613ce56 present in git history');
  assert(commitPresent(B281_COMMIT), 'Build 281 prerequisite commit 72f834f present in git history');
  assert(commitPresent(B280_COMMIT), 'Build 280 prerequisite commit dc66c9b present in git history');
  assert(commitPresent(B279_COMMIT), 'Build 279 prerequisite commit fa04692 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(fs.existsSync(path.join(repoRoot, B283_DOC)), 'Build 283 runtime-deployment doc still present');
  assert(fs.existsSync(path.join(repoRoot, B281_DOC)), 'Build 281 booking-gap doc still present');
  pass('Build 283 + 282 + 281 + 280 + 279 + 271 prerequisite commits present and predecessor docs exist');

  // --- 9. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 284 Second Live Booking Observation Gap + Conservative Summary/Transcript Fallback verified (${passCount} checks).`);
  console.log('build_mode=build_283_live_booking_gap_and_summary_transcript_fallback_repo_only  build_284_status=completed  build_271_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_282_redone=false  build_283_redone=false  build_283_one_call_approval_consumed=true  no_new_call_placed=true  no_retry_performed=true  controlled_live_booking_observation_status=completed_once_no_retry  webhook_backend_delivery_status=completed_200_ok  mapped_roofer_status=passed  lead_persistence_status=passed  call_persistence_status=passed  booking_persistence_status=failed_again_after_deployed_build_281_fix_or_fixed_by_offline_replay  live_call_booking_id_status=null  actual_gap=live_webhook_missing_or_unreadable_structured_appointment_fields  summary_transcript_fallback_status=implemented  offline_fallback_replay_status=passed  first_roofer_e2e_status=partial_pass_booking_gap_or_offline_fix_ready  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_deploys_build_284_fallback_then_places_exactly_one_separately_approved_live_booking_observation_call_to_last4_0389_no_retry');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
