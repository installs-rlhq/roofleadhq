#!/usr/bin/env node
/**
 * Build 279 Verifier — Structured Appointment Config Evidence Captured (repo-only, offline, in-process).
 *
 * Strategic goal: close the Build 278 gap. Build 278 recorded that the frontier was waiting on Vapi Test
 * Roofing Assistant structured-data config evidence and WITHHELD the one-controlled-PSTN-retest approval.
 * Jason has now configured the assistant out-of-band (within the Build 277 §5 boundary) and supplied
 * SANITIZED Vapi UI screenshot evidence. This verifier:
 *
 *   1. Re-asserts the Build 277/278 offline booking proof against the REAL compiled backend + a fake
 *      in-process Supabase, with NO code change:
 *        CASE 1 — verbal EOCR with NO structured fields -> mapped roofer resolves, lead+call persist,
 *                 booking_id=null (frontier reproduced).
 *        CASE 2 — SAME verbal call now EMITTING structured appointment fields under
 *                 message.analysis.structuredData -> booking IS created (booking_id present).
 *   2. Grounds the Build 279 evidence doc: config evidence CAPTURED, the three fields evidenced
 *      (appointment_requested Boolean / appointment_time String / appointment_booked Boolean), assistant
 *      status Published, expected payload location message.analysis.structuredData.
 *   3. PRESENCE proof: the one-controlled-PSTN-retest approval packet now EXISTS and is scoped to exactly
 *      one call to the clean Vapi test number (last-4 0389), no retry / no SMS / no provider-config change.
 *   4. Both Build 279 docs carry no secret / PII / raw phone number / UUID.
 *   5. Prerequisite commits present (Build 278 / 277 / 276 / 271); Build 277 + 278 docs still present.
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

const EVIDENCE_DOC = 'docs/VAPI_STRUCTURED_APPOINTMENT_CONFIG_EVIDENCE_BUILD_279.md';
const APPROVAL_DOC = 'docs/CONTROLLED_PSTN_BOOKING_REVALIDATION_APPROVAL_BUILD_279.md';
const B278_DOC = 'docs/VAPI_STRUCTURED_APPOINTMENT_CONFIG_GAP_BUILD_278.md';
const B277_DOC = 'docs/VAPI_STRUCTURED_APPOINTMENT_FIELDS_APPROVAL_BUILD_277.md';

const SAMPLES = 'docs/samples';
const FIX_VERBAL = `${SAMPLES}/vapi-event-mapped-eocr-verbal-appointment-no-structured.fake.json`;
const FIX_POST_CONFIG = `${SAMPLES}/vapi-event-structured-appointment-post-config.fake.json`;

const B278_COMMIT = '2c98570';
const B277_COMMIT = '5b723f8';
const B276_COMMIT = 'b642e93';
const B271_COMMIT = '4d36bdf';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

/**
 * Fake Supabase client (same shape as Build 275/276/277/278's): roofers is eq-AWARE (byte-exact
 * twilio_number match, mirroring Postgres text equality); calls/leads/bookings resolve to spec.insert
 * after .insert() else spec.select. Only the methods the service calls are implemented. No network.
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
  calls: { select: { data: null, error: null }, insert: { data: { id: 'call-new-279' }, error: null } },
  leads: { select: { data: [], error: null }, insert: { data: { id: 'lead-new-279' }, error: null } },
  bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-279' }, error: null } },
});

(async function main() {
  const before = gitStatus();
  console.log('=== Build 279 Structured Appointment Config Evidence Captured (repo-only, in-process, fake Supabase) ===');
  console.log('No call. No SMS. No Vapi Test/Talk/webCall. No Vapi rerun. No curl. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No config change. No deploy. No schema/RLS change. No secret file read. No production DB read. Re-asserts the Build 277/278 offline booking proof, grounds the CAPTURED structured-config evidence, and confirms the one controlled PSTN retest approval now exists.');

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

  // === CASE 1 — regression / the gap: verbal EOCR with NO structured fields -> booking_id=null. ===
  {
    const verbal = readJson(FIX_VERBAL);
    const nz = svc.normalizeVapiCallCompletedPayload(verbal);
    assert(nz.appointment_booked === false && nz.appointment_time === null,
      'CASE 1 -> verbal-only EOCR normalizes appointment_booked=false, appointment_time=null');
    const dest = nz.roofer_destination_number;
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-279', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(verbal);
    assert(r.ok === true && r.inserted === true && r.duplicate === false,
      'CASE 1 -> ok:true, inserted:true, duplicate:false (mapped roofer, persisting branch)');
    assert(r.matched_lead_id === 'lead-new-279' && r.call_id === 'call-new-279', 'CASE 1 -> lead + call persist');
    assert(r.booking_id === null,
      'CASE 1 -> booking_id=null (frontier reproduced without structured appointment fields)');
  }
  pass('CASE 1 (regression): verbal EOCR without structured fields -> lead+call persist, booking_id=null');

  // === CASE 2 — Build 277/278 offline proof reconfirmed: same call WITH structured fields -> booking. ===
  {
    const postConfig = readJson(FIX_POST_CONFIG);
    const nz = svc.normalizeVapiCallCompletedPayload(postConfig);
    assert(nz.appointment_booked === true && typeof nz.appointment_time === 'string' && nz.appointment_time.length > 0,
      'CASE 2 -> post-config EOCR normalizes appointment_booked=true + appointment_time set (from structuredData)');
    const dest = nz.roofer_destination_number;
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-279', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(postConfig);
    assert(r.ok === true && r.inserted === true && r.duplicate === false,
      'CASE 2 -> ok:true, inserted:true, duplicate:false (same mapped-roofer persisting branch)');
    assert(r.matched_lead_id === 'lead-new-279' && r.call_id === 'call-new-279', 'CASE 2 -> lead + call persist');
    assert(r.booking_id === 'booking-new-279',
      'CASE 2 -> booking IS created once the assistant emits the structured appointment fields — NO code change');
  }
  pass('CASE 2 (Build 277/278 proof reconfirmed): SAME verbal call emitting structured fields -> booking_id present, NO code change');

  // --- 2. Build 279 evidence-doc grounding (config evidence CAPTURED + the exact fields evidenced). ---
  const doc = read(EVIDENCE_DOC);
  const DOC_TOKENS = [
    'build_271_redone = false',
    'build_276_redone = false',
    'build_277_redone = false',
    'build_278_redone = false',
    'current_frontier = one_controlled_pstn_retest_after_structured_config_evidence',
    'preferred_path = structured_vapi_appointment_fields',
    'opt2_code_fallback_status = deferred',
    'structured_fields_expected_under = message.analysis.structuredData',
    'appointment_booked_field_evidence = captured',
    'appointment_time_field_evidence = captured',
    'appointment_requested_field_evidence = captured',
    'assistant_status_visible = published',
    'offline_booking_case2_status = passed',
    'vapi_structured_config_evidence_status = captured',
    'controlled_pstn_retest_approval_status = created',
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
  for (const t of DOC_TOKENS) assert(doc.includes(t), `B279 evidence doc missing status token: ${t}`);
  assert(/message\.analysis\.structuredData/.test(doc), 'B279 doc names the message.analysis.structuredData source path');
  assert(/Test Roofing Assistant/.test(doc), 'B279 doc scopes to the Test Roofing Assistant');
  assert(/Analysis/.test(doc), 'B279 doc names the Analysis page');
  assert(/Structured Outputs/i.test(doc), 'B279 doc names the Structured Outputs section');
  assert(/Published/.test(doc), 'B279 doc records the assistant status was visible as Published');
  // The three fields with their evidenced types.
  assert(/appointment_requested`?\s*\|\s*Boolean/i.test(doc) || /appointment_requested[^\n]*Boolean/i.test(doc),
    'B279 doc evidences appointment_requested as Boolean');
  assert(/appointment_time[^\n]*String/i.test(doc), 'B279 doc evidences appointment_time as String');
  assert(/appointment_booked[^\n]*Boolean/i.test(doc), 'B279 doc evidences appointment_booked as Boolean');
  assert(/ISO 8601/.test(doc), 'B279 doc specifies appointment_time is ISO 8601');
  assert(/0389/.test(doc), 'B279 doc keeps the clean Vapi number (last-4 0389); masked');
  assert(/No secrets|no secret/i.test(doc) && /API keys|api key/i.test(doc),
    'B279 doc attests no secrets/API keys were captured');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not read/i.test(doc),
    'B279 doc states the local secret file was not read');
  pass('B279 evidence doc grounds the CAPTURED config evidence, the three evidenced fields, Published status, and the source path');

  // --- 3. PRESENCE proof: the one-controlled-PSTN-retest approval packet now EXISTS and is scoped. ---
  const approval = read(APPROVAL_DOC);
  const APPROVAL_TOKENS = [
    'controlled_pstn_retest_approval_status = created',
    'approved_call_count = 1',
    'approved_target = clean_vapi_test_number_last4_0389',
    'no_retry_without_separate_approval = true',
    'no_sms = true',
    'no_twilio_change = true',
    'no_retell_change = true',
    'no_vapi_config_change_during_test = true',
    'no_railway_or_backend_config_env_deploy_restart = true',
    'no_schema_auth_rls_change = true',
    'no_production_data_export = true',
    'no_real_homeowner_contact = true',
    'no_call_placed = true',
  ];
  for (const t of APPROVAL_TOKENS) assert(approval.includes(t), `B279 approval packet missing token: ${t}`);
  assert(/exactly one/i.test(approval), 'B279 approval scopes to exactly one call');
  assert(/0389/.test(approval), 'B279 approval targets the clean Vapi test number (last-4 0389)');
  assert(/booking/i.test(approval) && /persist/i.test(approval),
    'B279 approval states the purpose is lead + call + booking persistence validation');
  pass('presence proof: one-controlled-PSTN-retest approval packet exists and is narrowly scoped (one call, no retry, no SMS, no provider/config/deploy change)');

  // --- 4. Both Build 279 docs carry no secret / PII / raw-number leakage. ---
  for (const [label, body] of [['evidence', doc], ['approval', approval]]) {
    const scrubbed = body.replace(/Launch Test Roofing 1780434363/g, 'ROW_LABEL');
    assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(body), `B279 ${label} doc contains no JWT-shaped secret`);
    assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(body), `B279 ${label} doc contains no sk- API-key-shaped secret`);
    assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(body), `B279 ${label} doc contains no token-shaped secret`);
    assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(body), `B279 ${label} doc contains no raw UUID`);
    assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed), `B279 ${label} doc contains no phone-number-shaped value`);
  }
  pass('B279 evidence + approval docs carry no secret / PII / raw phone number / UUID');

  // --- 5. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B278_COMMIT), 'Build 278 prerequisite commit 2c98570 present in git history');
  assert(commitPresent(B277_COMMIT), 'Build 277 prerequisite commit 5b723f8 present in git history');
  assert(commitPresent(B276_COMMIT), 'Build 276 prerequisite commit b642e93 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(fs.existsSync(path.join(repoRoot, B278_DOC)), 'Build 278 gap doc still present');
  assert(fs.existsSync(path.join(repoRoot, B277_DOC)), 'Build 277 approval packet doc still present');
  pass('Build 278 + 277 + 276 + 271 prerequisite commits present and predecessor docs exist');

  // --- 6. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 279 Structured Appointment Config Evidence Captured verified (${passCount} checks).`);
  console.log('build_mode=structured_appointment_config_evidence_repo_only  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  current_frontier=one_controlled_pstn_retest_after_structured_config_evidence  preferred_path=structured_vapi_appointment_fields  opt2_code_fallback_status=deferred  structured_fields_expected_under=message.analysis.structuredData  appointment_booked_field_evidence=captured  appointment_time_field_evidence=captured  appointment_requested_field_evidence=captured  assistant_status_visible=published  offline_booking_case2_status=passed  build_277_offline_proof_reconfirmed_in_build_279=true  vapi_structured_config_evidence_status=captured  controlled_pstn_retest_approval_status=created  live_pstn_retest_call_placed=false  backend_code_change=false  no_call_placed=true  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed_by_this_build=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
