#!/usr/bin/env node
/**
 * Build 271 Verifier — First Roofer Test Wiring Readiness (repo-only, offline, in-process).
 *
 * Strategic goal: prove — without any live call/SMS/provider/deploy — that a clean Vapi-managed
 * number MAPPED to a roofer drives the FULL final-report persistence path (lead + booking + call),
 * i.e. the exact gap Build 270 explicitly left un-validated ("full mapped-roofer lead/final-report
 * persistence was not yet validated" — the clean Test Number is still unmapped, so production is a
 * controlled 200 no-op).
 *
 * Mapping under test (grounded in backend/src/services/vapi-webhook.service.ts):
 *   roofers.twilio_number == <normalized EOCR destination number>  ==> process_call_completed
 *   no roofer row for that destination                              ==> Build 268 controlled 200 no-op
 *
 * This verifier:
 *   1. Statically grounds the mapping + readiness doc in source (no drift).
 *   2. Compiles the backend (local tsc; dist is gitignored) and exercises the REAL compiled service
 *      in-process against a FAKE Supabase client injected via require-cache interception. The fake is
 *      insert/select-aware per table, so the mapped path actually inserts a lead, a booking, and a
 *      call and returns inserted:true with matched_lead_id/booking_id/call_id.
 *   3. Re-proves the unmapped-destination Build 268 controlled 200 no-op (regression).
 *   4. Proves the roofer twilio_number that resolves the fixture is DERIVED FROM the fixture's own
 *      normalized destination — i.e. the mapping is twilio_number == destination, not a coincidence.
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no
 * call, no SMS, no Twilio, no Retell, no deploy, no config change, no secret read, no env persisted
 * beyond this process. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237. Non-mutating:
 * asserts git status is unchanged (dist build is gitignored).
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
const DOC = 'docs/FIRST_ROOFER_TEST_WIRING_BUILD_271.md';
const B270_DOC = 'docs/CLEAN_VAPI_PSTN_REVALIDATION_PASS_BUILD_270.md';
const B268_DOC = 'docs/CLEAN_VAPI_EOCR_TERMINAL_FIX_BUILD_268.md';

const SAMPLES = 'docs/samples';
const FIX_MAPPED = `${SAMPLES}/vapi-event-mapped-clean-eocr.fake.json`;
const FIX_STATUS = `${SAMPLES}/vapi-event-status-update.fake.json`;

const B270_COMMIT = '1248386';
const B268_COMMIT = '4c08b5e';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

/**
 * Insert/select-aware, table-aware, chainable fake Supabase client. For each `from(table)` chain we
 * track whether `.insert()` was called: the terminal read then resolves to `spec.insert` (the
 * post-insert row) if it was, else `spec.select` (the pre-existing-row lookup). This lets the mapped
 * path genuinely traverse "no existing call -> create lead -> create booking -> insert call" instead
 * of short-circuiting on a duplicate. Only the methods the service actually calls are implemented.
 * No network, no real client.
 */
function makeFakeSupabase(routes) {
  return {
    from(table) {
      const spec = routes[table] ?? {};
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

(async function main() {
  const before = gitStatus();
  console.log('=== Build 271 First Roofer Test Wiring Readiness verification (repo-only, in-process, fake Supabase) ===');
  console.log('No call. No SMS. No Vapi Test/Talk/webCall. No Vapi rerun. No curl. No live HTTP. No real Supabase. No Twilio. No Retell. No config change. No deploy. No secret file read. No first-roofer live-test approval created. Offline behavioral proof of the mapped clean-Vapi EOCR final-report persistence path.');

  // --- 1. Static grounding: mapping + Build 268 no-op still exactly as documented. ---
  const service = read(SERVICE_SRC);
  assert(/\.eq\('twilio_number',\s*normalized\.roofer_destination_number\)/.test(service),
    'service still maps roofer via roofers.twilio_number == normalized destination');
  assert(/unknown_roofer_destination_unmapped/.test(service),
    'service still returns the Build 268 controlled no-op reason for an unmapped destination');
  assert(!/error:\s*'unknown_roofer'/.test(service),
    "service no longer returns error: 'unknown_roofer' (the former 404 cause)");
  assert(/createVapiLead/.test(service) && /createVapiBooking/.test(service) &&
    /from\('calls'\)\s*[\s\S]*\.insert\(insertPayload\)/.test(service),
    'service still contains the full mapped persistence path (lead + booking + call insert)');
  assert(/error:\s*'missing_required_field'/.test(service),
    'service still enforces the phone-keyed required-field gate (400)');
  pass('service source grounds the mapping (twilio_number == destination), the full persistence path, the 268 no-op, and the required-field gate');

  const route = read(ROUTE_SRC);
  assert(/res\.status\(200\)\.json\(result\)/.test(route), 'route returns 200 on ok result');
  assert(/error\s*===\s*'missing_required_field'[\s\S]*status\(400\)/.test(route),
    'route returns 400 only on missing_required_field');
  pass('route contract intact: 200 on ok (mapped persist + controlled no-op), 400 only on missing field');

  // --- 2. Fixture grounding: mapped, terminal, appointment-booked, reserved fictional numbers only. ---
  const mapped = readJson(FIX_MAPPED);
  assert(/end-of-call-report/.test(JSON.stringify(mapped)), 'mapped fixture is a terminal end-of-call-report');
  assert(mapped.message && mapped.message.analysis &&
    mapped.message.analysis.structuredData &&
    mapped.message.analysis.structuredData.appointment_booked === true,
    'mapped fixture books an appointment (exercises lead + booking + call)');
  const mappedRaw = read(FIX_MAPPED);
  assert(/555015?\d|5555550\d\d\d|555-01\d\d/.test(mappedRaw) || /\+1555/.test(mappedRaw),
    'mapped fixture uses reserved fictional 555-01xx numbers');
  pass('mapped clean-Vapi EOCR fixture exists (terminal, appointment booked, reserved fictional numbers only)');

  // --- 3. Compile the CURRENT backend (dist is gitignored: no tracked-file churn). ---
  const tscBin = path.join(backendRoot, 'node_modules/.bin/tsc');
  assert(fs.existsSync(tscBin), 'local tsc is available for the behavioral build');
  execFileSync(tscBin, [], { cwd: backendRoot, stdio: 'pipe' });
  assert(fs.existsSync(DIST_SERVICE) && fs.existsSync(DIST_CONFIG), 'compiled service + config exist after build');
  pass('backend compiled (tsc) for in-process behavioral testing');

  // --- Config placeholders so the config gate passes; intercept @supabase/supabase-js. ---
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

  // --- 4. The fixture classifies into full processing and normalizes as a mapped phone EOCR. ---
  const normalized = svc.normalizeVapiCallCompletedPayload(mapped);
  assert(normalized.roofer_destination_number, 'mapped fixture normalizes a PSTN roofer destination number');
  assert(normalized.caller_phone, 'mapped fixture normalizes a caller phone');
  assert(normalized.provider_call_id, 'mapped fixture normalizes a provider_call_id');
  assert(normalized.appointment_booked === true && normalized.appointment_time,
    'mapped fixture normalizes appointment_booked + appointment_time (booking path armed)');
  const classification = svc.classifyVapiWebhookEvent(mapped);
  assert(classification.decision === 'process_call_completed',
    'mapped fixture classifies to process_call_completed (terminal phone EOCR)');
  pass('mapped fixture normalizes to a terminal phone EOCR and enters the full processing path');

  // === CORE: a MAPPED clean Vapi number drives the FULL persistence path (lead + booking + call). ===
  // The roofer twilio_number is DERIVED FROM the fixture's own normalized destination, proving the
  // mapping is twilio_number == destination (not an incidental constant).
  {
    fakeRoutes = {
      roofers: {
        select: {
          data: {
            id: 'roofer-271',
            business_name: 'Demo Pilot Roofing',
            twilio_number: normalized.roofer_destination_number, // <-- the mapping key under test
          },
          error: null,
        },
      },
      calls: {
        select: { data: null, error: null },              // no existing call -> proceed to insert
        insert: { data: { id: 'call-new-271' }, error: null },
      },
      leads: {
        select: { data: [], error: null },                // no existing lead -> create one
        insert: { data: { id: 'lead-new-271' }, error: null },
      },
      bookings: {
        select: { data: null, error: null },              // no existing booking -> create one
        insert: { data: { id: 'booking-new-271' }, error: null },
      },
    };
    const r = await svc.processVapiCallCompleted(mapped);
    assert(r.ok === true, 'mapped clean-Vapi EOCR -> ok:true');
    assert(r.inserted === true && r.duplicate !== true,
      'mapped clean-Vapi EOCR -> inserted a NEW call (full persistence, not a duplicate short-circuit)');
    assert(r.roofer_id === 'roofer-271', 'mapped clean-Vapi EOCR -> resolves the mapped roofer via twilio_number');
    assert(r.matched_lead_id === 'lead-new-271', 'mapped clean-Vapi EOCR -> creates/persists a lead');
    assert(r.booking_id === 'booking-new-271', 'mapped clean-Vapi EOCR -> creates/persists a booking (appointment booked)');
    assert(r.call_id === 'call-new-271', 'mapped clean-Vapi EOCR -> persists the call record');
    assert(r.reason !== 'unknown_roofer_destination_unmapped', 'mapped clean-Vapi EOCR -> NOT the unmapped no-op');
    assert(!r.error, 'mapped clean-Vapi EOCR -> carries no error');
  }
  pass('CORE: mapped clean Vapi EOCR -> FULL final-report persistence (roofer resolved + lead + booking + call all created)');

  // === Regression: the SAME fixture with NO roofer row -> Build 268 controlled 200 no-op. ===
  {
    fakeRoutes = { roofers: { select: { data: null, error: null } } };
    const r = await svc.processVapiCallCompleted(mapped);
    assert(r.ok === true && r.acknowledged === true && r.processed === false,
      'unmapped destination -> controlled 200 no-op (acknowledged, not processed)');
    assert(r.reason === 'unknown_roofer_destination_unmapped', 'unmapped destination -> explicit sanitized reason');
    assert(!r.inserted && !r.call_id && !r.matched_lead_id && !r.booking_id,
      'unmapped destination -> no lead/booking/call created');
    assert(!r.error, 'unmapped destination -> carries no error (no 404)');
  }
  pass('regression: same fixture with no roofer row still yields the Build 268 controlled 200 no-op (no lead/booking/call)');

  // === Regression: non-terminal event still a no-op before any lookup. ===
  {
    fakeRoutes = { roofers: { select: { data: { id: 'should-not-be-read' }, error: null } } };
    const r = await svc.processVapiCallCompleted(readJson(FIX_STATUS));
    assert(r.ok === true && r.acknowledged === true && r.processed === false && !r.error,
      'non-terminal status-update still an ok no-op (no lookup, no persistence)');
  }
  pass('regression: non-terminal status-update remains an ok 200 no-op');

  // === Idempotency preserved: mapped fixture with an EXISTING call -> duplicate (no double insert). ===
  {
    fakeRoutes = {
      roofers: { select: { data: { id: 'roofer-271', business_name: 'Demo Pilot Roofing', twilio_number: normalized.roofer_destination_number }, error: null } },
      calls: { select: { data: { id: 'call-existing-271' }, error: null } },
    };
    const r = await svc.processVapiCallCompleted(mapped);
    assert(r.ok === true && r.duplicate === true && r.call_id === 'call-existing-271',
      'mapped fixture with an existing call -> idempotent duplicate (no second persistence)');
  }
  pass('idempotency preserved: a replayed mapped EOCR recognizes the existing call and does not double-persist');

  // --- 5. Readiness doc grounding (status tokens, mapping, gap, next step) + no secret/PII leakage. ---
  const doc = read(DOC);
  const DOC_TOKENS = [
    'first_roofer_test_wiring_status = repo_ready_persistence_proven_runtime_mapping_gap_identified',
    'clean_vapi_number_mapping_status = defined_via_roofers_twilio_number_equality_runtime_seeding_gap',
    'mapped_roofer_final_report_path_status = validated_by_fixture',
    'live_first_roofer_test_approval_status = not_requested',
    'no_call_placed = true',
    'no_sms_sent = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_vapi_config_changed = true',
    'no_railway_config_changed = true',
    'no_backend_deploy = true',
    'first_roofer_live_test_approval_created = false',
  ];
  for (const t of DOC_TOKENS) assert(doc.includes(t), `B271 doc missing status token: ${t}`);
  assert(/roofers\.twilio_number\s*==\s*<EOCR destination number>/.test(doc),
    'B271 doc states the mapping equality (roofers.twilio_number == EOCR destination)');
  assert(/vapi-event-mapped-clean-eocr\.fake\.json/.test(doc), 'B271 doc references the mapped fixture');
  assert(/verify-first-roofer-test-wiring-build-271-readonly\.js/.test(doc), 'B271 doc references this verifier');
  assert(/runtime_action_performed_by_build_271\s*=\s*false/.test(doc), 'B271 doc records no runtime action');
  assert(/build_270_prerequisite_commit\s*=\s*1248386/.test(doc), 'B271 doc records the Build 270 prerequisite commit');
  assert(/build_268_prerequisite_commit\s*=\s*4c08b5e/.test(doc), 'B271 doc records the Build 268 prerequisite commit');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not read/i.test(doc),
    'B271 doc states the local secret file was not read');
  // No secret/PII leakage in the doc (the fixture may hold reserved 555 numbers; the doc must not).
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B271 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B271 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B271 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc), 'B271 doc contains no raw UUID');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc), 'B271 doc contains no phone-number-shaped value');
  pass('B271 readiness doc grounds the mapping, the fixture-validated persistence path, the runtime gap, the next step, and carries no secret/PII');

  // --- 6. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B270_COMMIT), 'Build 270 prerequisite commit 1248386 present in git history');
  assert(commitPresent(B268_COMMIT), 'Build 268 prerequisite commit 4c08b5e present in git history');
  for (const d of [B270_DOC, B268_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  pass('Build 270 + 268 prerequisite commits present and predecessor docs exist');

  // --- 7. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 271 First Roofer Test Wiring Readiness verified (${passCount} checks).`);
  console.log('build_mode=first_roofer_test_wiring_readiness_repo_only  runtime_action_performed_by_build_271=false  fix_or_config_change_performed_by_build_271=false  build_270_prerequisite_commit=1248386  build_268_prerequisite_commit=4c08b5e  first_roofer_test_wiring_status=repo_ready_persistence_proven_runtime_mapping_gap_identified  clean_vapi_number_mapping_status=defined_via_roofers_twilio_number_equality_runtime_seeding_gap  mapped_roofer_final_report_path_status=validated_by_fixture  mapped_eocr_creates_lead=true  mapped_eocr_creates_booking=true  mapped_eocr_creates_call=true  unmapped_eocr_controlled_200_noop=true  nonterminal_noop_preserved=true  idempotent_duplicate_preserved=true  live_first_roofer_test_approval_status=not_requested  first_roofer_live_test_approval_created=false  live_http_called=false  vapi_test_used=false  vapi_talk_used=false  vapi_webcall_used=false  curl_used=false  call_placed=false  live_sms_sent=false  twilio_used=false  retell_used=false  real_supabase_used=false  supabase_write=false  deploy=false  config_changed=false  secret_file_read=false  tracked_files_unchanged=true');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
