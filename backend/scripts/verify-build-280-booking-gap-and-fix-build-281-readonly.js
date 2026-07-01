#!/usr/bin/env node
/**
 * Build 281 Verifier — Build 280 Booking-Persistence Gap + Structured-Outputs Fix (repo-only, offline).
 *
 * Strategic goal: capture the sanitized backend-side response evidence from the SAME already-completed
 * Build 280 controlled PSTN call, diagnose the exact booking gap, and validate the source-only fix that
 * makes the normalizer ingest Vapi "Structured Outputs" (message.analysis.structuredOutputs) in addition
 * to the legacy "Structured Data" (message.analysis.structuredData). No new call, no retry, no provider
 * action.
 *
 * Build 280 backend response (sanitized, supplied by Jason from the same completed call): HTTP 200, ok:true,
 * inserted:true, duplicate:false; call_id / provider_call_id / matched_lead_id / roofer_id present; mapped
 * destination = clean Vapi Test Number last-4 0389; booking_id=null; normalized.appointment_booked=false,
 * appointment_requested=false, appointment_time=null; transcript/summary indicated a Thursday 2 PM visit.
 * => lead persistence PASSED, call persistence PASSED, mapped roofer PASSED, booking persistence FAILED.
 *
 * Root cause: the assistant emits appointment fields via Vapi Structured Outputs (analysis.structuredOutputs),
 * a container the pre-Build-281 normalizer never read (it read only structuredData). Build 281 adds a
 * shape-tolerant structuredOutputs reader, appended AFTER the existing structuredData candidates so legacy
 * behavior is preserved.
 *
 * This verifier (in-process, real compiled backend + eq-aware fake Supabase):
 *   1. Proves the SOURCE fix is present (structuredOutputs read + extractStructuredOutputValue).
 *   2. LIVE-SHAPE FIX PROOF: the sanitized live-shape fixture (appointment fields under
 *      analysis.structuredOutputs, keyed-by-output-id {name,result}) -> mapped roofer resolves, lead+call
 *      persist, booking IS created (booking_id present). Closes the Build 280 gap offline.
 *   3. SHAPE TOLERANCE: array-shaped and keyed-by-name structuredOutputs also normalize booked=true+time.
 *   4. REGRESSION A: verbal EOCR with NO structured fields still normalizes false/false/null ->
 *      booking_id=null (NO transcript parsing introduced).
 *   5. REGRESSION B: legacy structuredData EOCR still normalizes true/time -> booking created.
 *   6. Evidence-doc grounding: exact sanitized statuses; masked IDs only; 0389; honest non-overclaim
 *      (booking not claimed passed for the live call).
 *   7. Doc carries no secret / PII / raw phone / UUID / email / recording URL.
 *   8. Prerequisite commits present (Build 280/279/278/277/276/271); predecessor docs present.
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

const EVIDENCE_DOC = 'docs/BUILD_280_BOOKING_PERSISTENCE_GAP_AND_FIX_BUILD_281.md';
const B280_DOC = 'docs/CONTROLLED_PSTN_BOOKING_REVALIDATION_OUTCOME_BUILD_280.md';
const B279_EVIDENCE_DOC = 'docs/VAPI_STRUCTURED_APPOINTMENT_CONFIG_EVIDENCE_BUILD_279.md';
const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';

const SAMPLES = 'docs/samples';
const FIX_LIVE_SHAPE = `${SAMPLES}/vapi-event-structured-outputs-appointment-live-shape.fake.json`;
const FIX_VERBAL = `${SAMPLES}/vapi-event-mapped-eocr-verbal-appointment-no-structured.fake.json`;
const FIX_LEGACY_STRUCTURED = `${SAMPLES}/vapi-event-structured-appointment-post-config.fake.json`;

const B280_COMMIT = 'dc66c9b';
const B279_COMMIT = 'fa04692';
const B278_COMMIT = '2c98570';
const B277_COMMIT = '5b723f8';
const B276_COMMIT = 'b642e93';
const B271_COMMIT = '4d36bdf';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

/**
 * Fake Supabase client (same shape as Build 275-280's): roofers is eq-AWARE (byte-exact twilio_number
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
  calls: { select: { data: null, error: null }, insert: { data: { id: 'call-new-281' }, error: null } },
  leads: { select: { data: [], error: null }, insert: { data: { id: 'lead-new-281' }, error: null } },
  bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-281' }, error: null } },
});

(async function main() {
  const before = gitStatus();
  console.log('=== Build 281 Build-280 Booking-Persistence Gap + Structured-Outputs Fix (repo-only, in-process, fake Supabase) ===');
  console.log('No call. No additional call. No retry. No SMS. No Vapi Test/Talk/webCall. No Vapi rerun. No curl. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No config change. No deploy. No schema/RLS change. No secret file read. No production DB read/export. Captures sanitized Build 280 backend evidence, diagnoses the structuredOutputs path mismatch, and proves the source-only fix offline.');

  // --- 0. Source fix present. ---
  const src = read(SERVICE_SRC);
  assert(/structuredOutputs/.test(src) && /structured_outputs/.test(src),
    'service source reads the Vapi structuredOutputs container (analysis/message/payload)');
  assert(/function\s+extractStructuredOutputValue/.test(src),
    'service source defines the shape-tolerant extractStructuredOutputValue reader');
  assert(/extractStructuredOutputValue\(structuredOutputs, 'appointment_booked'\)/.test(src) &&
    /extractStructuredOutputValue\(structuredOutputs, 'appointment_time'\)/.test(src) &&
    /extractStructuredOutputValue\(structuredOutputs, 'appointment_requested'\)/.test(src),
    'structuredOutputs values are wired into all three appointment chains');
  // Preservation: structuredData candidates still precede the structuredOutputs fallbacks.
  assert(src.indexOf('structuredData.appointment_booked') < src.indexOf("extractStructuredOutputValue(structuredOutputs, 'appointment_booked')"),
    'legacy structuredData candidate still precedes the structuredOutputs fallback (existing behavior preserved)');
  pass('source fix present: shape-tolerant structuredOutputs reader wired after structuredData (additive)');

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

  // === 2. LIVE-SHAPE FIX PROOF: structuredOutputs (keyed-by-output-id {name,result}) -> booking created. ===
  {
    const live = readJson(FIX_LIVE_SHAPE);
    const nz = svc.normalizeVapiCallCompletedPayload(live);
    assert(nz.appointment_booked === true && nz.appointment_requested === true &&
      typeof nz.appointment_time === 'string' && nz.appointment_time.length > 0,
      'LIVE-SHAPE -> normalizer reads booked=true, requested=true, time populated from analysis.structuredOutputs');
    const dest = nz.roofer_destination_number;
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-281', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(live);
    assert(r.ok === true && r.inserted === true && r.duplicate === false,
      'LIVE-SHAPE -> ok:true, inserted:true, duplicate:false (mapped roofer persisting branch)');
    assert(r.matched_lead_id === 'lead-new-281' && r.call_id === 'call-new-281', 'LIVE-SHAPE -> lead + call persist');
    assert(r.booking_id === 'booking-new-281',
      'LIVE-SHAPE -> booking IS created from structuredOutputs (Build 280 booking gap closed offline by the fix)');
  }
  pass('LIVE-SHAPE fix proof: structuredOutputs live payload -> lead+call persist AND booking created (booking_id present)');

  // === 3. SHAPE TOLERANCE: array + keyed-by-name structuredOutputs both normalize booked=true + time. ===
  {
    const base = readJson(FIX_LIVE_SHAPE);
    const call = base.message.call;

    const arrayShape = { message: { type: 'end-of-call-report', call, analysis: { structuredOutputs: [
      { name: 'appointment_booked', result: true },
      { name: 'appointment_time', result: '2026-07-02T14:00:00Z' },
      { name: 'appointment_requested', result: true },
    ] } } };
    const nzA = svc.normalizeVapiCallCompletedPayload(arrayShape);
    assert(nzA.appointment_booked === true && nzA.appointment_time && nzA.appointment_requested === true,
      'SHAPE A (array of {name,result}) -> booked=true, time populated, requested=true');

    const keyedByName = { message: { type: 'end-of-call-report', call, analysis: { structuredOutputs: {
      appointment_booked: true,
      appointment_time: '2026-07-02T14:00:00Z',
      appointment_requested: true,
    } } } };
    const nzB = svc.normalizeVapiCallCompletedPayload(keyedByName);
    assert(nzB.appointment_booked === true && nzB.appointment_time && nzB.appointment_requested === true,
      'SHAPE B (object keyed by field name) -> booked=true, time populated, requested=true');
  }
  pass('shape tolerance: array-shaped and keyed-by-name structuredOutputs both ingested correctly');

  // === 4. REGRESSION A: verbal EOCR, NO structured fields -> false/false/null -> booking_id=null. ===
  {
    const verbal = readJson(FIX_VERBAL);
    const nz = svc.normalizeVapiCallCompletedPayload(verbal);
    assert(nz.appointment_booked === false && nz.appointment_requested === false && nz.appointment_time === null,
      'REGRESSION A -> verbal-only EOCR still normalizes false/false/null (NO transcript parsing introduced)');
    const dest = nz.roofer_destination_number;
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-281', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(verbal);
    assert(r.ok === true && r.inserted === true && r.booking_id === null,
      'REGRESSION A -> lead+call persist, booking_id=null (no structured signal, no transcript fallback)');
  }
  pass('REGRESSION A: verbal EOCR without structured fields still yields booking_id=null (opt2 transcript fallback deferred)');

  // === 5. REGRESSION B: legacy structuredData EOCR still normalizes true/time -> booking created. ===
  {
    const legacy = readJson(FIX_LEGACY_STRUCTURED);
    const nz = svc.normalizeVapiCallCompletedPayload(legacy);
    assert(nz.appointment_booked === true && typeof nz.appointment_time === 'string' && nz.appointment_time.length > 0,
      'REGRESSION B -> legacy analysis.structuredData still normalizes booked=true + time (unchanged behavior)');
    const dest = nz.roofer_destination_number;
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-281', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(legacy);
    assert(r.ok === true && r.inserted === true && r.booking_id === 'booking-new-281',
      'REGRESSION B -> legacy structuredData path still creates the booking (no regression)');
  }
  pass('REGRESSION B: legacy structuredData EOCR still creates the booking (existing path preserved)');

  // --- 6. Evidence-doc grounding: exact sanitized statuses. ---
  const doc = read(EVIDENCE_DOC);
  const DOC_TOKENS = [
    'build_279_one_call_approval_consumed = true',
    'no_new_call_placed = true',
    'no_retry_performed = true',
    'controlled_pstn_retest_execution_status = already_completed_once_no_retry',
    'webhook_backend_delivery_status = completed_200_ok',
    'mapped_roofer_status = passed',
    'lead_persistence_status = passed',
    'call_persistence_status = passed',
    'booking_persistence_status = failed',
    'first_roofer_e2e_status = partial_pass_booking_gap',
    'live_call_booking_id_status = null_in_build_280_response',
    'actual_gap = backend_structured_appointment_ingestion_or_payload_path_mismatch',
    'opt2_code_fallback_status = deferred_unless_structured_output_unavailable',
    'booking_persistence_status = failed_or_fixed_by_offline_replay',
    'first_roofer_e2e_status = partial_pass_booking_gap_or_offline_fix_ready',
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
  for (const t of DOC_TOKENS) assert(doc.includes(t), `B281 evidence doc missing status token: ${t}`);
  assert(/HTTP status \| `200`/.test(doc) || /HTTP status\s*\|\s*`200`/.test(doc), 'B281 doc records HTTP 200');
  assert(/`ok` \| `true`/.test(doc), 'B281 doc records ok:true');
  assert(/`inserted` \| `true`/.test(doc), 'B281 doc records inserted:true');
  assert(/`duplicate` \| `false`/.test(doc), 'B281 doc records duplicate:false');
  assert(/`booking_id` \| `null`/.test(doc), 'B281 doc records booking_id=null');
  assert(/`normalized\.appointment_booked` \| `false`/.test(doc), 'B281 doc records normalized.appointment_booked=false');
  assert(/`normalized\.appointment_requested` \| `false`/.test(doc), 'B281 doc records normalized.appointment_requested=false');
  assert(/`normalized\.appointment_time` \| `null`/.test(doc), 'B281 doc records normalized.appointment_time=null');
  assert(/structuredOutputs/.test(doc) && /structuredData/.test(doc),
    'B281 doc names both the structuredOutputs (live) and structuredData (legacy) paths in the diagnosis');
  assert(/0389/.test(doc), 'B281 doc references the clean Vapi test number (last-4 0389), masked');
  assert(/Thursday 2/.test(doc), 'B281 doc records the transcript indicated a Thursday 2 PM visit (sanitized)');
  assert(/masked/i.test(doc) && /call_\*+/.test(doc), 'B281 doc records IDs as masked');
  // Honest non-overclaim: the LIVE call must NOT be recorded as booking passed.
  assert(!/booking_persistence_status = passed\b/.test(doc),
    'B281 doc must NOT overclaim live booking persistence as passed (live booking_id was null)');
  assert(/does NOT commit/i.test(doc) || /not committed/i.test(doc) || /NOT committed/.test(doc),
    'B281 doc states the raw transcript/body is not committed');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not read/i.test(doc),
    'B281 doc states the local secret file was not read');
  pass('B281 evidence doc grounds the exact sanitized backend response, diagnosis, fix, and honest non-overclaim');

  // --- 7. Evidence doc carries no secret / PII / raw phone / UUID / email / recording URL leakage. ---
  {
    assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B281 doc contains no JWT-shaped secret');
    assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B281 doc contains no sk- API-key-shaped secret');
    assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B281 doc contains no token-shaped secret');
    assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc), 'B281 doc contains no raw UUID');
    assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B281 doc contains no phone-number-shaped value');
    assert(!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(doc), 'B281 doc contains no email address');
    assert(!/https?:\/\/\S*recording\S*/i.test(doc), 'B281 doc contains no recording URL');
  }
  pass('B281 evidence doc carries no secret / PII / raw phone / UUID / email / recording URL');

  // --- 8. Live-shape fixture carries no PII beyond reserved fictional 555-01xx values. ---
  {
    const raw = read(FIX_LIVE_SHAPE);
    assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(raw), 'live-shape fixture has no raw UUID');
    assert(!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(raw), 'live-shape fixture has no email');
    assert(!/https?:\/\//.test(raw), 'live-shape fixture has no URL (no recording URL)');
    const phones = raw.match(/\+1\d{10}/g) || [];
    for (const p of phones) assert(/^\+1555555\d{4}$/.test(p), `live-shape fixture uses reserved fictional 555 numbers only (found ${p})`);
  }
  pass('live-shape fixture uses reserved fictional 555-01xx values only; no PII, no UUID, no email, no URL');

  // --- 9. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B280_COMMIT), 'Build 280 prerequisite commit dc66c9b present in git history');
  assert(commitPresent(B279_COMMIT), 'Build 279 prerequisite commit fa04692 present in git history');
  assert(commitPresent(B278_COMMIT), 'Build 278 prerequisite commit 2c98570 present in git history');
  assert(commitPresent(B277_COMMIT), 'Build 277 prerequisite commit 5b723f8 present in git history');
  assert(commitPresent(B276_COMMIT), 'Build 276 prerequisite commit b642e93 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(fs.existsSync(path.join(repoRoot, B280_DOC)), 'Build 280 outcome doc still present');
  assert(fs.existsSync(path.join(repoRoot, B279_EVIDENCE_DOC)), 'Build 279 evidence doc still present');
  pass('Build 280 + 279 + 278 + 277 + 276 + 271 prerequisite commits present and predecessor docs exist');

  // --- 10. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 281 Build-280 Booking-Persistence Gap + Structured-Outputs Fix verified (${passCount} checks).`);
  console.log('build_mode=build_280_booking_gap_and_structured_outputs_fix_repo_only  build_281_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_279_one_call_approval_consumed=true  no_new_call_placed=true  no_retry_performed=true  controlled_pstn_retest_execution_status=already_completed_once_no_retry  webhook_backend_delivery_status=completed_200_ok  mapped_roofer_status=passed  lead_persistence_status=passed  call_persistence_status=passed  booking_persistence_status=failed_or_fixed_by_offline_replay  first_roofer_e2e_status=partial_pass_booking_gap_or_offline_fix_ready  live_call_booking_id_status=null_in_build_280_response  actual_gap=backend_structured_appointment_ingestion_or_payload_path_mismatch  structured_outputs_offline_fix_status=passed  opt2_code_fallback_status=deferred_unless_structured_output_unavailable  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
