#!/usr/bin/env node
/**
 * Build 276 Verifier — First-Roofer E2E Persistence Evidence Correction (repo-only, offline, in-process).
 *
 * Strategic goal: CORRECT the Build 274 interpretation and DIAGNOSE the booking gap — without any live
 * call/SMS/provider/deploy/DB read. Jason's new masked webhook-response evidence for the one Build 274
 * first-roofer PSTN E2E call showed: ok:true, dry_run:false, inserted:true, duplicate:false, call_id
 * present, provider_call_id present, matched_lead_id present, booking_id=null, roofer matched (clean
 * Vapi last-4 0389), appointment_booked=false, appointment_requested=false, appointment_time=null.
 * => Build 274 was NOT a Build 268 no-op; it was the persisting `inserted:true` branch. Lead + call
 * persisted; only the booking did not (booking_id=null), because the normalized appointment fields were
 * false/null.
 *
 * What this verifier proves (all offline, no network, no real Supabase):
 *
 *   1. STATIC grounding of:
 *        - the route HTTP contract (200 iff ok:true) — shared with Build 275,
 *        - the persisting success return shape (inserted:true + matched_lead_id + call_id + booking_id),
 *        - the booking gate `!normalized.appointment_booked || !normalized.appointment_time` in
 *          createVapiBooking (booking_id=null when either is falsy),
 *        - the appointment-field extraction reading STRUCTURED fields ONLY (no transcript/summary
 *          fallback), so firstBooleanValue defaults to false and firstTimestampValue to null.
 *
 *   2. CASE 1 — corrected Build 274 symptom, reproduced offline against the REAL compiled service with a
 *      new fixture whose transcript/summary VERBALLY schedule a site visit but which carries NO
 *      structured appointment fields:
 *        -> normalized appointment_booked=false, appointment_requested=false, appointment_time=null,
 *        -> processVapiCallCompleted returns ok:true, inserted:true, duplicate:false, matched_lead_id
 *           present, call_id present, booking_id=null.
 *      This is the exact masked shape Jason reported: lead + call persist, booking not created.
 *
 *   3. CASE 2 — control: the Build 271 fixture WITH structured appointment fields
 *      (structuredData.appointment_booked=true + appointment_time) -> booking_id present. Proves the
 *      booking gate + insert path work when the structured fields ARE present, isolating the Build 274
 *      gap to appointment-field EXTRACTION, not booking creation.
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no
 * call, no SMS, no Twilio, no Retell, no Vapi API, no deploy, no config change, no schema/RLS change,
 * no secret read, no env persisted beyond this process. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Reserved fictional 555-01xx numbers only; no real phone
 * number, no real UUID, no real call id, no PII. Non-mutating: asserts git status is unchanged (the tsc
 * dist build is gitignored).
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
const ROUTE_SRC = 'backend/src/routes/vapi-webhooks.ts';
const DOC = 'docs/FIRST_ROOFER_E2E_PERSISTENCE_EVIDENCE_CORRECTION_BUILD_276.md';
const B275_DOC = 'docs/MAPPED_ROOFER_PERSISTENCE_GAP_DIAGNOSIS_BUILD_275.md';
const B274_DOC = 'docs/FIRST_ROOFER_PSTN_E2E_BUILD_274.md';

const SAMPLES = 'docs/samples';
const FIX_VERBAL = `${SAMPLES}/vapi-event-mapped-eocr-verbal-appointment-no-structured.fake.json`;
const FIX_STRUCTURED = `${SAMPLES}/vapi-event-mapped-clean-eocr.fake.json`;

const B275_COMMIT = '85da8e3';
const B274_COMMIT = 'dd1c1b8';
const B271_COMMIT = '4d36bdf';
const B268_COMMIT = '4c08b5e';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

/**
 * Fake Supabase client (same shape as Build 275's): roofers is eq-AWARE (byte-exact twilio_number
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
  calls: { select: { data: null, error: null }, insert: { data: { id: 'call-new-276' }, error: null } },
  leads: { select: { data: [], error: null }, insert: { data: { id: 'lead-new-276' }, error: null } },
  bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-276' }, error: null } },
});

(async function main() {
  const before = gitStatus();
  console.log('=== Build 276 First-Roofer E2E Persistence Evidence Correction (repo-only, in-process, fake Supabase) ===');
  console.log('No call. No SMS. No Vapi Test/Talk/webCall. No Vapi rerun. No curl. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No config change. No deploy. No schema/RLS change. No secret file read. No production DB read. Corrects Build 274 (NOT a no-op; lead+call persisted, booking not created) and diagnoses the booking gap offline.');

  // --- 1. Static grounding: route contract, persisting success shape, booking gate, structured-only extraction. ---
  const route = read(ROUTE_SRC);
  assert(/return res\.status\(200\)\.json\(result\)/.test(route),
    'route returns 200 ONLY on an ok:true result');
  pass('route HTTP contract grounded: 200 iff ok:true');

  const service = read(SERVICE_SRC);

  // Persisting success return shape: inserted:true + matched_lead_id + call_id + booking_id.
  assert(/inserted:\s*true[\s\S]*?matched_lead_id:\s*matchedLeadId[\s\S]*?booking_id:\s*bookingId/.test(service),
    'service success return carries inserted:true + matched_lead_id + booking_id (the persisting 200 shape Jason saw)');
  assert(/const bookingId\s*=\s*matchedLeadId[\s\S]*?createVapiBooking\(supabase,\s*roofer\.id,\s*matchedLeadId,\s*normalized\)/.test(service),
    'service computes bookingId via createVapiBooking only when a lead matched');
  pass('service persisting success return + bookingId derivation grounded');

  // Booking gate: null when appointment_booked falsy OR appointment_time falsy.
  assert(/if\s*\(!normalized\.appointment_booked\s*\|\|\s*!normalized\.appointment_time\)\s*\{\s*return null;/.test(service),
    'createVapiBooking gates on !appointment_booked || !appointment_time -> returns null (booking_id=null)');
  pass('booking gate grounded: booking_id=null when appointment_booked=false OR appointment_time=null');

  // Structured-only extraction (no transcript/summary fallback) + defaults.
  const bookedBlock = service.match(/const appointmentBooked = firstBooleanValue\(([\s\S]*?)\);/);
  assert(bookedBlock && !/transcript|summary/.test(bookedBlock[1]),
    'appointment_booked is extracted from structured fields only (no transcript/summary fallback)');
  const requestedBlock = service.match(/const appointmentRequested = firstBooleanValue\(([\s\S]*?)\);/);
  assert(requestedBlock && !/transcript|summary/.test(requestedBlock[1]),
    'appointment_requested is extracted from structured fields only (no transcript/summary fallback)');
  const timeBlock = service.match(/const appointmentTime = firstTimestampValue\(([\s\S]*?)\);/);
  assert(timeBlock && !/transcript|summary/.test(timeBlock[1]),
    'appointment_time is extracted from structured fields only (no transcript/summary fallback)');
  assert(/function firstBooleanValue[\s\S]*?\n {2}return false;\n}/.test(service),
    'firstBooleanValue defaults to false when no structured field matches');
  const tsFn = service.match(/function firstTimestampValue\([\s\S]*?\n}/);
  assert(tsFn && /return null;/.test(tsFn[0]),
    'firstTimestampValue returns null when no valid structured timestamp is present');
  pass('appointment extraction grounded: structured-fields-only, defaults false/null, no transcript/summary fallback');

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

  // === CASE 1 — CORRECTED Build 274 symptom: verbal appointment, NO structured fields. ===
  {
    const verbal = readJson(FIX_VERBAL);
    const nz = svc.normalizeVapiCallCompletedPayload(verbal);
    assert(nz.roofer_destination_number && /^\+1\d{10}$/.test(nz.roofer_destination_number),
      'verbal fixture normalizes a strict-E.164 PSTN destination');
    assert(nz.caller_phone && nz.provider_call_id,
      'verbal fixture normalizes caller_phone + provider_call_id (required-field gate satisfied)');
    assert(nz.transcript && nz.summary,
      'verbal fixture normalizes a transcript + summary that describe a scheduled visit');
    assert(nz.appointment_booked === false,
      'verbal fixture (no structured fields) -> appointment_booked normalizes to false');
    assert(nz.appointment_requested === false,
      'verbal fixture (no structured fields) -> appointment_requested normalizes to false');
    assert(nz.appointment_time === null,
      'verbal fixture (no structured fields) -> appointment_time normalizes to null');

    const dest = nz.roofer_destination_number;
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-276', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(verbal);
    assert(r.ok === true && r.inserted === true && r.duplicate === false,
      'CASE 1 -> ok:true, inserted:true, duplicate:false (the persisting branch, NOT a no-op)');
    assert(r.reason !== 'unknown_roofer_destination_unmapped' && !r.acknowledged && !r.error,
      'CASE 1 -> NOT the Build 268 no-op and carries no error');
    assert(r.roofer_id === 'roofer-276', 'CASE 1 -> mapped roofer resolved');
    assert(r.matched_lead_id === 'lead-new-276', 'CASE 1 -> lead persisted (matched_lead_id present)');
    assert(r.call_id === 'call-new-276', 'CASE 1 -> call persisted (call_id present)');
    assert(r.booking_id === null, 'CASE 1 -> booking NOT created (booking_id=null), matching Jason\'s masked evidence');
    assert(r.normalized.appointment_booked === false && r.normalized.appointment_time === null,
      'CASE 1 -> returned normalized appointment fields are false/null (the booking-gate cause)');
  }
  pass('CASE 1: verbal-appointment EOCR with NO structured fields -> mapped, lead+call persist, booking_id=null (reproduces the corrected Build 274 symptom offline)');

  // === CASE 2 — CONTROL: structured appointment fields present -> booking IS created. ===
  {
    const structured = readJson(FIX_STRUCTURED);
    const nz = svc.normalizeVapiCallCompletedPayload(structured);
    assert(nz.appointment_booked === true && nz.appointment_time,
      'control fixture (structured fields present) -> appointment_booked=true + appointment_time set');
    const dest = nz.roofer_destination_number;
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-276', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(structured);
    assert(r.ok === true && r.inserted === true, 'control -> ok:true, inserted:true (persisting branch)');
    assert(r.matched_lead_id === 'lead-new-276' && r.call_id === 'call-new-276',
      'control -> lead + call persist');
    assert(r.booking_id === 'booking-new-276',
      'control -> booking IS created when structured appointment fields are present');
  }
  pass('CASE 2: control fixture WITH structured appointment fields -> booking_id present (isolates the gap to appointment-field extraction, not booking creation)');

  // --- 3. Correction doc grounding (status tokens, corrected result, gated fix, masking). ---
  const doc = read(DOC);
  const DOC_TOKENS = [
    'build_276_evidence_correction_status = completed',
    'build_274_noop_hypothesis_status = ruled_out_by_webhook_response',
    'mapped_roofer_match_status = passed',
    'lead_persistence_status = passed_or_matched',
    'call_persistence_status = passed',
    'booking_persistence_status = failed_or_not_created',
    'corrected_first_roofer_e2e_result = partial_pass_lead_and_call_persisted_booking_not_created',
    'remaining_gap = booking_appointment_extraction_or_creation',
    'production_safe_fix_added = false',
    'source_fix_made = false',
    'source_fix_proposed = true',
    'no_second_call = true',
    'retry_count = 0',
    'no_sms_sent = true',
    'no_homeowner_contact = true',
    'no_roofer_contact = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_vapi_config_changed = true',
    'no_railway_config_changed = true',
    'no_backend_deploy = true',
    'no_env_var_changed = true',
    'no_schema_auth_rls_changed = true',
    'no_secret_printing = true',
    'full_clean_vapi_number_recorded_in_repo = false',
  ];
  for (const t of DOC_TOKENS) assert(doc.includes(t), `B276 doc missing status token: ${t}`);
  assert(/verify-first-roofer-e2e-persistence-evidence-correction-build-276-readonly\.js/.test(doc),
    'B276 doc references this verifier');
  assert(/run-first-roofer-e2e-persistence-evidence-correction-build-276-dry-run\.sh/.test(doc),
    'B276 doc references its dry-run');
  assert(/vapi-event-mapped-eocr-verbal-appointment-no-structured\.fake\.json/.test(doc),
    'B276 doc references the new verbal-appointment fixture');
  assert(/requires? separate approval/i.test(doc), 'B276 doc marks the proposed code fix as requiring separate approval');
  assert(/0389/.test(doc), 'B276 doc references the masked clean-number last4 (0389)');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not read/i.test(doc),
    'B276 doc states the local secret file was not read');

  // No secret / PII / raw-number leakage. "Launch Test Roofing 1780434363" is Jason's chosen row LABEL.
  const scrubbed = doc.replace(/Launch Test Roofing 1780434363/g, 'ROW_LABEL');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B276 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B276 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B276 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc), 'B276 doc contains no raw UUID');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed), 'B276 doc contains no phone-number-shaped value');
  pass('B276 correction doc grounds the corrected statuses, the booking-gap cause, the gated fix, and carries no secret/PII');

  // Fixture masking: reserved 555 numbers only; no real UUID/secret.
  const fixRaw = read(FIX_VERBAL);
  assert(/\+1555555\d{4}/.test(fixRaw), 'verbal fixture uses reserved fictional 555 numbers');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(fixRaw), 'verbal fixture contains no raw UUID');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(fixRaw), 'verbal fixture contains no JWT-shaped secret');
  pass('new verbal-appointment fixture is sanitized (reserved 555 numbers, no UUID/secret)');

  // --- 4. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B275_COMMIT), 'Build 275 prerequisite commit 85da8e3 present in git history');
  assert(commitPresent(B274_COMMIT), 'Build 274 prerequisite commit dd1c1b8 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(commitPresent(B268_COMMIT), 'Build 268 prerequisite commit 4c08b5e present in git history');
  for (const d of [B275_DOC, B274_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  pass('Build 275 + 274 + 271 + 268 prerequisite commits present and predecessor docs exist');

  // --- 5. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 276 First-Roofer E2E Persistence Evidence Correction verified (${passCount} checks).`);
  console.log('build_mode=first_roofer_e2e_persistence_evidence_correction_repo_only  build_276_evidence_correction_status=completed  build_274_noop_hypothesis_status=ruled_out_by_webhook_response  mapped_roofer_match_status=passed  lead_persistence_status=passed_or_matched  call_persistence_status=passed  booking_persistence_status=failed_or_not_created  corrected_first_roofer_e2e_result=partial_pass_lead_and_call_persisted_booking_not_created  booking_not_created_cause=normalized_appointment_fields_false_or_null  appointment_extraction=structured_fields_only_no_transcript_summary_fallback  remaining_gap=booking_appointment_extraction_or_creation  verbal_appointment_without_structured_fields_reproduces_symptom=true  control_structured_appointment_creates_booking=true  production_safe_fix_added=false  source_fix_made=false  source_fix_proposed=true  no_second_call=true  retry_count=0  no_sms_sent=true  no_homeowner_contact=true  no_roofer_contact=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  config_changed=false  secret_file_read=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
