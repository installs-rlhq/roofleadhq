#!/usr/bin/env node
/**
 * Build 286 Verifier — First Controlled Roofer E2E Live Pass Evidence (repo-only, offline).
 *
 * Strategic goal: capture that the single Build 285-approved live booking-observation PSTN call (consumed once,
 * no retry) was a FULL first-roofer end-to-end PASS: mapped roofer resolved, lead persisted, call persisted,
 * AND the booking persisted (booking_id NON-NULL) live. The live webhook shape carried no usable structured
 * appointment fields, so the Build 284 conservative summary/transcript fallback (deployed + confirmed live in
 * Build 285) is what booked it — while the Build 281 structuredOutputs support remains preserved (precedence).
 * This build performs no call/retry/SMS/provider action/config change/deploy and creates/consumes no approval.
 *
 * This verifier (in-process, real compiled backend + eq-aware fake Supabase; non-mutating):
 *   0. Source-of-truth: Build 285 (ef2467d) and Build 284 (44ed7cd) are ancestors of / equal to HEAD.
 *   1. Build 284 fallback fix source still present (deriveBookingTimeFromText + date/time extractors, wired
 *      AFTER the structured reads, gated to run only when structured did not book with a time).
 *   2. Build 281 structuredOutputs support still present (structuredData -> structuredOutputs read precedence).
 *   3. Behavioral: the deployed Build 284 fallback books the live-pass shape (summary/transcript-only, no
 *      usable structured fields -> mapped roofer resolves, lead+call persist, booking created with
 *      2026-07-02T14:00:00.000Z), AND the structured live-shape still books (precedence preserved).
 *   4. Build 286 evidence doc grounds the FINAL live PASS statuses + masked evidence (booking_id NON-NULL,
 *      appointment fields true), records the one-call/no-retry posture, and creates/consumes no approval.
 *   5. Build 286 pilot readiness packet present with the pilot guardrails (no Twilio->Retell number change,
 *      clean Vapi-managed number path, no expansion/contact without separate approval).
 *   6. Docs carry no secret / PII / raw phone / UUID / email.
 *   7. Prerequisite commits present (Build 285/284/283/282/281/280/279/271); predecessor docs present.
 *   8. Non-mutating (tracked files unchanged; dist is gitignored).
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no call,
 * no SMS, no Twilio, no Retell, no Vapi API, no deploy, no config change, no schema/RLS change, no secret
 * read, no production DB read/export. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237.
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
function isAncestorOrEqual(sha, ref) {
  try {
    execFileSync('git', ['merge-base', '--is-ancestor', sha, ref || 'HEAD'], { cwd: repoRoot, encoding: 'utf8' });
    return true;
  } catch (_e) { return false; }
}

const EVIDENCE_DOC = 'docs/FIRST_ROOFER_E2E_LIVE_BOOKING_PASS_EVIDENCE_BUILD_286.md';
const PACKET_DOC = 'docs/FIRST_PILOT_ROOFER_OUTREACH_ONBOARDING_READINESS_PACKET_BUILD_286.md';
const B285_DOC = 'docs/BUILD_284_RUNTIME_DEPLOYMENT_EVIDENCE_BUILD_285.md';
const B284_DOC = 'docs/BUILD_283_LIVE_BOOKING_OBSERVATION_GAP_AND_FALLBACK_FIX_BUILD_284.md';

const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';

const SAMPLES = 'docs/samples';
const FIX_LIVE_SUMMARY = `${SAMPLES}/vapi-event-mapped-eocr-summary-booking-no-structured-build-284.fake.json`;
const FIX_STRUCTURED_OUTPUTS = `${SAMPLES}/vapi-event-structured-outputs-appointment-live-shape.fake.json`;

const B285_COMMIT = 'ef2467d';
const B284_COMMIT = '44ed7cd';
const B284_COMMIT_FULL = '44ed7cd3a9e0e6e124a49f9e4b1f351ddcfddde9';
const B283_COMMIT = '8ba1c18';
const B282_COMMIT = '613ce56';
const B281_COMMIT = '72f834f';
const B280_COMMIT = 'dc66c9b';
const B279_COMMIT = 'fa04692';
const B271_COMMIT = '4d36bdf';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

function assertNoSecretsPiiPhone(doc, label) {
  const scrubbed = doc
    .replace(/Launch Test Roofing 1780434363/g, 'ROW_LABEL')
    .replace(new RegExp(B284_COMMIT_FULL, 'g'), 'COMMIT_SHA');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), `${label} contains no JWT-shaped secret`);
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), `${label} contains no sk- API-key-shaped secret`);
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), `${label} contains no token-shaped secret`);
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc), `${label} contains no raw UUID`);
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed), `${label} contains no phone-number-shaped value`);
  assert(!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(doc), `${label} contains no email address`);
}

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
  calls: { select: { data: null, error: null }, insert: { data: { id: 'call-new-286' }, error: null } },
  leads: { select: { data: [], error: null }, insert: { data: { id: 'lead-new-286' }, error: null } },
  bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-286' }, error: null } },
});

(async function main() {
  const before = gitStatus();
  console.log('=== Build 286 First Controlled Roofer E2E Live Pass Evidence (repo-only, in-process, fake Supabase) ===');
  console.log('No call. No retry. No SMS. No Vapi Test/Talk/webCall. No curl in verifier. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No deploy. No config change. No schema/RLS change. No secret file read. No production DB read/export. Captures the FINAL first-roofer E2E FULL PASS (mapped roofer + lead + call + BOOKING persisted live from one Build 285-approved call, no retry); creates/consumes NO approval.');

  // --- 0. Source-of-truth: Build 285 + Build 284 commits are ancestors of / equal to HEAD. ---
  assert(isAncestorOrEqual(B285_COMMIT),
    'Build 285 commit ef2467d is an ancestor of (or equal to) HEAD — building on 285 or later');
  assert(isAncestorOrEqual(B284_COMMIT),
    'Build 284 commit 44ed7cd is an ancestor of (or equal to) HEAD — fallback fix present in history');
  pass('source-of-truth: HEAD is at Build 285 (ef2467d) or later, on top of Build 284 (44ed7cd)');

  // --- 1. Build 284 fallback fix source still present (wired after structured reads, gated). ---
  const svcSrc = read(SERVICE_SRC);
  assert(/function\s+deriveBookingTimeFromText/.test(svcSrc),
    'service source defines the conservative deriveBookingTimeFromText fallback (fix not reverted)');
  assert(/function\s+extractCalendarDateFromText/.test(svcSrc) && /function\s+extractClockTimeFromText/.test(svcSrc),
    'service source defines the calendar-date + clock-time extractors');
  assert(/deriveBookingTimeFromText\(summary,\s*anchorIso\)/.test(svcSrc) &&
    /deriveBookingTimeFromText\(transcript,\s*anchorIso\)/.test(svcSrc),
    'fallback reads summary first, then transcript');
  assert(svcSrc.indexOf("extractStructuredOutputValue(structuredOutputs, 'appointment_time')") <
    svcSrc.indexOf('deriveBookingTimeFromText(summary'),
    'structured (structuredData -> structuredOutputs) candidates still precede the Build 284 text fallback');
  assert(/!finalAppointmentBooked\s*\|\|\s*!finalAppointmentTime/.test(svcSrc),
    'fallback is gated to run ONLY when the structured signal did not book with a time');
  pass('Build 284 conservative summary/transcript fallback source still present (precedence preserved, gated)');

  // --- 2. Build 281 structuredOutputs support still present. ---
  assert(/structuredOutputs/.test(svcSrc) && /structuredData/.test(svcSrc) &&
    /extractStructuredOutputValue/.test(svcSrc),
    'service source still reads Vapi structuredData -> structuredOutputs (Build 281 support preserved)');
  pass('Build 281 structuredOutputs support still present (structured precedence preserved)');

  // --- 3. Compile the CURRENT backend (dist is gitignored: no tracked-file churn). ---
  const tscBin = path.join(backendRoot, 'node_modules/.bin/tsc');
  assert(fs.existsSync(tscBin), 'local tsc is available for the behavioral build');
  execFileSync(tscBin, [], { cwd: backendRoot, stdio: 'pipe' });
  assert(fs.existsSync(DIST_SERVICE) && fs.existsSync(DIST_CONFIG), 'compiled service + config exist after build');
  pass('backend compiled (tsc) for in-process behavioral verification');

  // --- 4. Behavioral: the deployed Build 284 fallback books the live-pass shape; structured still precedes. ---
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
      roofers: { rows: [{ id: 'roofer-286', business_name: 'Launch Test Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
  };
  {
    // Live-pass shape: summary/transcript describe the July 2nd 2 PM site visit; NO usable structured fields.
    const live = readJson(FIX_LIVE_SUMMARY);
    const nz = svc.normalizeVapiCallCompletedPayload(live);
    assert(nz.appointment_booked === true && nz.appointment_requested === true &&
      nz.appointment_time === '2026-07-02T14:00:00.000Z',
      'DEPLOYED fallback -> live-pass summary/transcript shape normalizes booked=true, requested=true, time=2026-07-02T14:00:00.000Z');
    withRoofer(nz.roofer_destination_number);
    const r = await svc.processVapiCallCompleted(live);
    assert(r.ok === true && r.inserted === true && r.duplicate === false &&
      r.matched_lead_id === 'lead-new-286' && r.call_id === 'call-new-286' && r.booking_id === 'booking-new-286',
      'DEPLOYED fallback -> mapped roofer resolves, lead+call persist, booking created (booking_id NON-NULL) — the live PASS path');

    // Regression: structured live-shape still books via the structured path (fallback not reached).
    const so = readJson(FIX_STRUCTURED_OUTPUTS);
    const nzS = svc.normalizeVapiCallCompletedPayload(so);
    assert(nzS.appointment_booked === true && nzS.appointment_requested === true &&
      typeof nzS.appointment_time === 'string' && nzS.appointment_time.length > 0,
      'REGRESSION -> Build 281 structuredOutputs live-shape still normalizes booked=true + time (structured precedence preserved)');
    withRoofer(nzS.roofer_destination_number);
    const rS = await svc.processVapiCallCompleted(so);
    assert(rS.ok === true && rS.inserted === true && rS.booking_id === 'booking-new-286',
      'REGRESSION -> structured path still creates the booking (fallback not reached)');
  }
  pass('live-pass path behaviorally intact at HEAD (summary/transcript books the live shape AND structured precedence preserved)');

  // --- 5. Build 286 evidence doc grounding: FINAL live PASS statuses + masked evidence. ---
  const edoc = read(EVIDENCE_DOC);
  const EVIDENCE_TOKENS = [
    'build_285_one_call_approval_consumed = true',
    'no_new_call_placed = true',
    'no_retry_performed = true',
    'controlled_live_booking_observation_status = completed_once_no_retry',
    'webhook_backend_delivery_status = completed_200_ok',
    'mapped_roofer_status = passed',
    'lead_persistence_status = passed',
    'call_persistence_status = passed',
    'booking_persistence_status = passed',
    'live_call_booking_id_status = non_null',
    'first_roofer_e2e_status = passed',
    'build_284_fallback_live_status = validated',
    'live_roofer_testing_sales_readiness_status = ready_for_pilot_package',
    'no_sms_sent = true',
    'no_phone_number_changed = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_vapi_config_changed = true',
    'no_railway_config_changed = true',
    'no_backend_deploy = true',
    'no_schema_auth_rls_changed = true',
    'no_production_data_export = true',
  ];
  for (const t of EVIDENCE_TOKENS) assert(edoc.includes(t), `B286 evidence doc missing status token: ${t}`);
  // Positive live evidence must be present and masked.
  assert(/HTTP status\s*\|\s*`200`/.test(edoc), 'B286 evidence doc records HTTP 200');
  assert(/`booking_\*\*\*\*`/.test(edoc) && /NON-NULL/.test(edoc), 'B286 evidence doc records a masked, NON-NULL booking_id');
  assert(/`call_\*\*\*\*`/.test(edoc) && /`vapi_\*\*\*\*`/.test(edoc) &&
    /`lead_\*\*\*\*`/.test(edoc) && /`roofer_\*\*\*\*`/.test(edoc),
    'B286 evidence doc records masked call_id / provider_call_id / matched_lead_id / roofer_id');
  assert(/last-4 `0389`/.test(edoc), 'B286 evidence doc records the clean Vapi Test Number destination as last-4 0389');
  assert(/normalized\.appointment_booked/.test(edoc) && /`true`/.test(edoc),
    'B286 evidence doc records normalized.appointment_booked=true');
  assert(/2026-07-02T14:00:00\.000Z/.test(edoc), 'B286 evidence doc records the populated appointment_time');
  assert(/Thursday,?\s*July 2nd/.test(edoc) && /2 PM/.test(edoc),
    'B286 evidence doc summarizes the Thursday July 2nd 2 PM site visit');
  assert(/deriveBookingTimeFromText/.test(edoc), 'B286 evidence doc references the Build 284 fallback function');
  assert(/Build 281 structuredOutputs support remains preserved/.test(edoc),
    'B286 evidence doc states Build 281 structuredOutputs support remains preserved');
  assert(/not read/i.test(edoc) && /\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(edoc),
    'B286 evidence doc states the local secret file was not read');
  pass('B286 evidence doc grounds the FINAL first-roofer E2E live PASS with masked evidence and honest posture');

  // --- 6. Build 286 pilot readiness packet grounding: the pilot guardrails. ---
  const pdoc = read(PACKET_DOC);
  assert(/live_roofer_testing_sales_readiness_status = ready_for_pilot_package/.test(pdoc),
    'B286 packet marks readiness = ready_for_pilot_package');
  assert(/Twilio.?Retell number/i.test(pdoc) && /existing_twilio_retell_number_changed = false/.test(pdoc),
    'B286 packet forbids changing the existing Twilio->Retell number');
  assert(/clean Vapi-managed number path/i.test(pdoc) && /0389/.test(pdoc),
    'B286 packet uses the clean Vapi-managed number path (last-4 0389) for the controlled pilot');
  assert(/without separate approval/i.test(pdoc) &&
    /public_live_automation_expansion = none_without_separate_approval/.test(pdoc) &&
    /real_homeowner_or_roofer_contact = none_without_separate_approval/.test(pdoc),
    'B286 packet blocks public/live automation expansion and real homeowner/roofer contact without separate approval');
  assert(/first (real )?pilot roofer outreach/i.test(pdoc) && /onboarding/i.test(pdoc),
    'B286 packet identifies preparing the first real pilot roofer outreach/onboarding package');
  pass('B286 pilot readiness packet grounds the pilot guardrails and next material business step');

  // --- 7. Docs carry no secret / PII / raw phone / UUID / email. ---
  assertNoSecretsPiiPhone(edoc, 'B286 evidence doc');
  assertNoSecretsPiiPhone(pdoc, 'B286 pilot readiness packet');
  pass('B286 docs carry no secret / PII / raw phone / UUID / email');

  // --- 8. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B285_COMMIT), 'Build 285 prerequisite commit ef2467d present in git history');
  assert(commitPresent(B284_COMMIT), 'Build 284 prerequisite commit 44ed7cd present in git history');
  assert(commitPresent(B283_COMMIT), 'Build 283 prerequisite commit 8ba1c18 present in git history');
  assert(commitPresent(B282_COMMIT), 'Build 282 prerequisite commit 613ce56 present in git history');
  assert(commitPresent(B281_COMMIT), 'Build 281 prerequisite commit 72f834f present in git history');
  assert(commitPresent(B280_COMMIT), 'Build 280 prerequisite commit dc66c9b present in git history');
  assert(commitPresent(B279_COMMIT), 'Build 279 prerequisite commit fa04692 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(fs.existsSync(path.join(repoRoot, B285_DOC)), 'Build 285 runtime-deployment doc still present');
  assert(fs.existsSync(path.join(repoRoot, B284_DOC)), 'Build 284 booking-gap/fallback doc still present');
  pass('Build 285 + 284 + 283 + 282 + 281 + 280 + 279 + 271 prerequisite commits present and predecessor docs exist');

  // --- 9. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 286 First Controlled Roofer E2E Live Pass Evidence verified (${passCount} checks).`);
  console.log('build_mode=first_roofer_e2e_live_pass_evidence_repo_only  build_286_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_282_redone=false  build_283_redone=false  build_284_redone=false  build_285_redone=false  build_285_one_call_approval_consumed=true  no_new_call_placed=true  no_retry_performed=true  controlled_live_booking_observation_status=completed_once_no_retry  webhook_backend_delivery_status=completed_200_ok  mapped_roofer_status=passed  lead_persistence_status=passed  call_persistence_status=passed  booking_persistence_status=passed  live_call_booking_id_status=non_null  first_roofer_e2e_status=passed  build_284_fallback_live_status=validated  live_roofer_testing_sales_readiness_status=ready_for_pilot_package  no_sms_sent=true  no_phone_number_changed=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=prepare_first_real_pilot_roofer_outreach_onboarding_draft_bundle_then_obtain_separate_approval_before_any_real_contact_using_the_clean_vapi_managed_number_path_without_changing_the_existing_twilio_retell_number');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
