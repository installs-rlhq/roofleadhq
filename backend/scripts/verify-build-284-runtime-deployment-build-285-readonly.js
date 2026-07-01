#!/usr/bin/env node
/**
 * Build 285 Verifier — Build 284 Runtime Deployment Evidence (repo-only, offline).
 *
 * Strategic goal: under Jason's explicit backend/API deploy approval, confirm that Railway service
 * roofleadhq-api is running Build 284 HEAD commit 44ed7cd (unauthenticated GET /health ->
 * commit_short=44ed7cd, environment=production), which means the Build 284 conservative summary/transcript
 * booking fallback is LIVE. Production was already at 44ed7cd when checked, so no redeploy was performed by
 * the agent (safest outcome). This build neither creates nor consumes any live-call approval.
 *
 * This verifier (in-process, real compiled backend + eq-aware fake Supabase; non-mutating):
 *   0. Source-of-truth: Build 284 commit 44ed7cd is an ancestor of / equal to HEAD.
 *   1. Build 284 fallback fix source still present (deriveBookingTimeFromText + date/time extractors, wired
 *      AFTER the structured reads, gated to run only when structured did not book with a time).
 *   2. Build 282 /health commit marker source present (config.gitCommitSha from RAILWAY_GIT_COMMIT_SHA;
 *      /health surfaces commit + commit_short) — what makes the runtime evidence readable with no secret.
 *   3. Behavioral: commit marker resolves RAILWAY_GIT_COMMIT_SHA=44ed7cd... -> full SHA + short 44ed7cd;
 *      unset -> unknown (the captured live /health is the DEPLOYED-SHA case, not unknown).
 *   4. Behavioral: the now-deployed Build 284 fallback still works (summary/transcript-only live-shape ->
 *      mapped roofer resolves, lead+call persist, booking created with 2026-07-02T14:00:00.000Z) AND the
 *      structured path still books (precedence preserved).
 *   5. Build 285 evidence doc grounds honest DEPLOYED statuses + the captured /health values, records that
 *      the agent performed no redeploy (already current) and no env/config/schema/provider change, and does
 *      NOT create/consume a live-call approval.
 *   6. Doc carries no secret / PII / raw phone / UUID / email.
 *   7. Prerequisite commits present (Build 284/283/282/281/280/279/271); predecessor docs present.
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

const EVIDENCE_DOC = 'docs/BUILD_284_RUNTIME_DEPLOYMENT_EVIDENCE_BUILD_285.md';
const B284_DOC = 'docs/BUILD_283_LIVE_BOOKING_OBSERVATION_GAP_AND_FALLBACK_FIX_BUILD_284.md';
const B283_DOC = 'docs/BUILD_282_RUNTIME_DEPLOYMENT_EVIDENCE_BUILD_283.md';

const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';
const CONFIG_SRC = 'backend/src/config/config.ts';
const INDEX_SRC = 'backend/src/index.ts';

const SAMPLES = 'docs/samples';
const FIX_LIVE_SUMMARY = `${SAMPLES}/vapi-event-mapped-eocr-summary-booking-no-structured-build-284.fake.json`;
const FIX_STRUCTURED_OUTPUTS = `${SAMPLES}/vapi-event-structured-outputs-appointment-live-shape.fake.json`;

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
  calls: { select: { data: null, error: null }, insert: { data: { id: 'call-new-285' }, error: null } },
  leads: { select: { data: [], error: null }, insert: { data: { id: 'lead-new-285' }, error: null } },
  bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-285' }, error: null } },
});

(async function main() {
  const before = gitStatus();
  console.log('=== Build 285 Build-284 Runtime Deployment Evidence (repo-only, in-process, fake Supabase) ===');
  console.log('No call. No retry. No SMS. No Vapi Test/Talk/webCall. No curl in verifier. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No deploy by verifier. No config change. No schema/RLS change. No secret file read. No production DB read/export. Confirms Build 284 (44ed7cd) is DEPLOYED on roofleadhq-api and its conservative summary/transcript fallback is LIVE; creates/consumes NO live-call approval.');

  // --- 0. Source-of-truth: Build 284 commit is an ancestor of / equal to HEAD. ---
  assert(isAncestorOrEqual(B284_COMMIT),
    'Build 284 commit 44ed7cd is an ancestor of (or equal to) HEAD — building on 44ed7cd or later');
  pass('source-of-truth: HEAD is at Build 284 (44ed7cd) or later');

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

  // --- 2. Build 282 /health commit marker source present. ---
  const cfgSrc = read(CONFIG_SRC);
  assert(/gitCommitSha/.test(cfgSrc) && /RAILWAY_GIT_COMMIT_SHA/.test(cfgSrc),
    'config.ts sources gitCommitSha from RAILWAY_GIT_COMMIT_SHA (with fallbacks)');
  const idxSrc = read(INDEX_SRC);
  assert(/\/health/.test(idxSrc) && /commit/.test(idxSrc) && /commit_short/.test(idxSrc) &&
    /config\.gitCommitSha/.test(idxSrc),
    '/health route reports commit + commit_short from config.gitCommitSha');
  pass('Build 282 /health commit marker source present (config.gitCommitSha + /health commit fields)');

  // --- 3. Compile the CURRENT backend (dist is gitignored: no tracked-file churn). ---
  const tscBin = path.join(backendRoot, 'node_modules/.bin/tsc');
  assert(fs.existsSync(tscBin), 'local tsc is available for the behavioral build');
  execFileSync(tscBin, [], { cwd: backendRoot, stdio: 'pipe' });
  assert(fs.existsSync(DIST_SERVICE) && fs.existsSync(DIST_CONFIG), 'compiled service + config exist after build');
  pass('backend compiled (tsc) for in-process behavioral verification');

  // --- 4. Behavioral: /health commit marker resolves to the DEPLOYED SHA + short form. ---
  {
    const cfgResolved = require.resolve(DIST_CONFIG);
    const commitEnvKeys = ['RAILWAY_GIT_COMMIT_SHA', 'GIT_COMMIT_SHA', 'SOURCE_VERSION', 'SOURCE_COMMIT'];
    const saved = {};
    for (const k of commitEnvKeys) saved[k] = process.env[k];

    // Case A: Railway injects the deployed Build 284 commit SHA -> /health reports it.
    for (const k of commitEnvKeys) delete process.env[k];
    process.env.RAILWAY_GIT_COMMIT_SHA = B284_COMMIT_FULL;
    delete require.cache[cfgResolved];
    let cfg = require(DIST_CONFIG).default;
    const commitA = cfg.gitCommitSha || 'unknown';
    assert(commitA === B284_COMMIT_FULL, 'commit marker reflects the deployed Build 284 SHA when injected');
    assert(commitA.slice(0, 7) === B284_COMMIT, `commit_short resolves to the deployed short SHA (${B284_COMMIT})`);

    // Case B: no commit env -> unknown (a build predating the marker). The live /health is NOT this case.
    for (const k of commitEnvKeys) delete process.env[k];
    delete require.cache[cfgResolved];
    cfg = require(DIST_CONFIG).default;
    const commitB = cfg.gitCommitSha || 'unknown';
    assert(commitB === 'unknown', 'commit marker resolves to unknown when no commit env is present');

    for (const k of commitEnvKeys) { if (saved[k] === undefined) delete process.env[k]; else process.env[k] = saved[k]; }
    delete require.cache[cfgResolved];
  }
  pass(`commit marker behavior: deployed SHA -> full + short ${B284_COMMIT}; unset -> unknown (matches the captured live /health)`);

  // --- 5. Behavioral: the now-deployed Build 284 fallback still works; structured still precedes it. ---
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
      roofers: { rows: [{ id: 'roofer-285', business_name: 'Launch Test Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
  };
  {
    const live = readJson(FIX_LIVE_SUMMARY);
    const nz = svc.normalizeVapiCallCompletedPayload(live);
    assert(nz.appointment_booked === true && nz.appointment_requested === true &&
      nz.appointment_time === '2026-07-02T14:00:00.000Z',
      'DEPLOYED fallback -> summary/transcript-only live-shape normalizes booked=true, requested=true, time=2026-07-02T14:00:00.000Z');
    withRoofer(nz.roofer_destination_number);
    const r = await svc.processVapiCallCompleted(live);
    assert(r.ok === true && r.inserted === true && r.duplicate === false &&
      r.matched_lead_id === 'lead-new-285' && r.call_id === 'call-new-285' && r.booking_id === 'booking-new-285',
      'DEPLOYED fallback -> mapped roofer resolves, lead+call persist, booking created (booking_id present)');

    const so = readJson(FIX_STRUCTURED_OUTPUTS);
    const nzS = svc.normalizeVapiCallCompletedPayload(so);
    assert(nzS.appointment_booked === true && nzS.appointment_requested === true &&
      typeof nzS.appointment_time === 'string' && nzS.appointment_time.length > 0,
      'REGRESSION -> Build 281 structuredOutputs live-shape still normalizes booked=true + time (structured precedence preserved)');
    withRoofer(nzS.roofer_destination_number);
    const rS = await svc.processVapiCallCompleted(so);
    assert(rS.ok === true && rS.inserted === true && rS.booking_id === 'booking-new-285',
      'REGRESSION -> structured path still creates the booking (fallback not reached)');
  }
  pass('Build 284 fallback behaviorally intact at HEAD (the now-deployed code books from summary/transcript AND still honors structured precedence)');

  // --- 6. Build 285 evidence doc grounding: honest DEPLOYED statuses + captured /health values. ---
  const edoc = read(EVIDENCE_DOC);
  const EVIDENCE_TOKENS = [
    'build_284_fix_status = offline_replay_passed',
    'build_284_runtime_deployment_status = deployed',
    'deployed_commit_short = 44ed7cd',
    'deploy_scope = railway_roofleadhq_api_backend_only',
    'redeploy_performed_by_agent = false',
    'env_config_schema_provider_changes = false',
    'live_booking_observation_approval_status = not_created_in_this_build',
    'no_call_placed = true',
    'no_retry_performed = true',
    'no_sms_sent = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_vapi_config_changed = true',
    'no_phone_number_changed = true',
    'no_railway_env_or_config_changed = true',
    'no_schema_auth_rls_changed = true',
    'no_production_data_export = true',
    'no_secret_printing = true',
    'full_clean_vapi_number_recorded_in_repo = false',
  ];
  for (const t of EVIDENCE_TOKENS) assert(edoc.includes(t), `B285 evidence doc missing status token: ${t}`);
  assert(/roofleadhq-api/.test(edoc), 'B285 evidence doc names the Railway service roofleadhq-api');
  assert(edoc.includes(B284_COMMIT_FULL), 'B285 evidence doc records the full deployed commit SHA');
  assert(/environment\s*=\s*production/.test(edoc), 'B285 evidence doc records /health environment=production');
  assert(/status\s*=\s*ok/.test(edoc), 'B285 evidence doc records /health status=ok');
  assert(/commit_short\s*=\s*44ed7cd/.test(edoc), 'B285 evidence doc records /health commit_short=44ed7cd');
  assert(/deriveBookingTimeFromText/.test(edoc), 'B285 evidence doc references the Build 284 fallback function');
  assert(/summary/i.test(edoc) && /transcript/i.test(edoc), 'B285 evidence doc names the summary + transcript fallback');
  assert(/2026-07-02T14:00:00\.000Z/.test(edoc), 'B285 evidence doc records the offline-replay appointment_time');
  // Honest gating: no live booking observed this build; no approval created/consumed.
  assert(!/booking_persistence_status = passed\b/.test(edoc),
    'B285 evidence doc must NOT claim live booking persistence is observed (that requires a separately approved call)');
  assert(/not read/i.test(edoc) && /\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(edoc),
    'B285 evidence doc states the local secret file was not read');
  pass('B285 evidence doc grounds honest deployed statuses, captured /health values, and the no-redeploy/no-approval posture');

  // --- 7. Doc carries no secret / PII / raw phone / UUID / email. ---
  assertNoSecretsPiiPhone(edoc, 'B285 evidence doc');
  pass('B285 evidence doc carries no secret / PII / raw phone / UUID / email');

  // --- 8. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B284_COMMIT), 'Build 284 prerequisite commit 44ed7cd present in git history');
  assert(commitPresent(B283_COMMIT), 'Build 283 prerequisite commit 8ba1c18 present in git history');
  assert(commitPresent(B282_COMMIT), 'Build 282 prerequisite commit 613ce56 present in git history');
  assert(commitPresent(B281_COMMIT), 'Build 281 prerequisite commit 72f834f present in git history');
  assert(commitPresent(B280_COMMIT), 'Build 280 prerequisite commit dc66c9b present in git history');
  assert(commitPresent(B279_COMMIT), 'Build 279 prerequisite commit fa04692 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(fs.existsSync(path.join(repoRoot, B284_DOC)), 'Build 284 booking-gap/fallback doc still present');
  assert(fs.existsSync(path.join(repoRoot, B283_DOC)), 'Build 283 runtime-deployment doc still present');
  pass('Build 284 + 283 + 282 + 281 + 280 + 279 + 271 prerequisite commits present and predecessor docs exist');

  // --- 9. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 285 Build-284 Runtime Deployment Evidence verified (${passCount} checks).`);
  console.log('build_mode=build_284_runtime_deployment_evidence_repo_only  build_285_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_282_redone=false  build_283_redone=false  build_284_redone=false  build_284_fix_status=offline_replay_passed  build_284_runtime_deployment_status=deployed  deployed_commit_short=44ed7cd  deploy_scope=railway_roofleadhq_api_backend_only  redeploy_performed_by_agent=false  env_config_schema_provider_changes=false  live_booking_observation_approval_status=not_created_in_this_build  no_call_placed=true  no_retry_performed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_phone_number_changed=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  real_supabase_used=false  production_db_read=false  deploy=false  full_clean_vapi_number_recorded_in_repo=false  clean_vapi_number_last4=0389  next_step=jason_places_exactly_one_separately_approved_live_booking_observation_pstn_call_to_the_clean_vapi_test_number_last4_0389_no_retry_then_a_later_build_captures_sanitized_lead_call_and_booking_persistence_evidence');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
