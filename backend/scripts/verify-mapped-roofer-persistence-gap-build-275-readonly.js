#!/usr/bin/env node
/**
 * Build 275 Verifier — Mapped-Roofer Persistence Gap Diagnosis (repo-only, offline, in-process).
 *
 * Strategic goal: DIAGNOSE — without any live call/SMS/provider/deploy/DB read — why the Build 274
 * mapped-roofer PSTN E2E returned backend HTTP 200 yet did NOT visibly persist a lead + booking +
 * call in Supabase. The determination is done purely by exercising the REAL compiled backend service
 * against a fake, in-process Supabase client, and by statically grounding the route's HTTP mapping.
 *
 * What this verifier proves (all offline, no network, no real Supabase):
 *
 *   1. ENUMERATION — every ok:true (HTTP 200) result of processVapiCallCompleted, and that EXACTLY
 *      ONE of them persists (inserted:true). The other five 200 results write nothing:
 *        - acknowledge_non_terminal   (interim status/conversation/speech update)
 *        - acknowledge_web_call        (terminal report, no PSTN roofer destination, non-phone)
 *        - unknown_roofer_destination_unmapped  (Build 268 controlled no-op)  <-- prime suspect
 *        - duplicate (pre-insert existing call)
 *        - duplicate (23505 on insert)
 *        - inserted:true               (the ONLY persisting 200)
 *
 *   2. NON-SWALLOW — a roofer-lookup error and a calls-insert error both return ok:false (which the
 *      route maps to HTTP 500, NOT 200), and a missing required field returns ok:false (HTTP 400).
 *      => A visible HTTP 200 CANNOT be a swallowed calls-insert failure or a swallowed roofer-lookup
 *      failure. This RULES OUT "insert failed but acknowledged 200" for the call record itself.
 *
 *   3. NEAR-MISS (the leading hypothesis, made concrete) — using an eq-AWARE fake Supabase whose
 *      roofers `.eq('twilio_number', X)` performs a real byte-exact match (mirroring Postgres text
 *      equality), the SAME terminal PSTN EOCR:
 *        - persists fully (inserted + lead + booking + call) when a roofer row stores the destination
 *          in strict E.164 exactly equal to the normalized destination, BUT
 *        - falls into the Build 268 controlled 200 no-op (NO lead/booking/call) when a roofer row for
 *          the SAME number is stored in any non-E.164 format variant (missing '+', missing country
 *          code, separators, or surrounding whitespace).
 *      => A format/normalization mismatch between the real EOCR destination (normalized to strict
 *         E.164 by the service) and the stored roofers.twilio_number sends the lookup to the 200
 *         no-op with zero persistence — exactly the Build 274 symptom.
 *
 *   4. PARTIAL-PERSIST — when the roofer resolves and the call inserts but the LEAD insert errors,
 *      the service swallows the lead error and still returns 200 inserted:true with a NULL lead_id and
 *      NULL booking_id while the CALL row is created. => A 200 can also mean "a call row exists but no
 *      lead/booking", which a leads-table-only Supabase check would not see.
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no
 * call, no SMS, no Twilio, no Retell, no Vapi API, no deploy, no config change, no schema/RLS change,
 * no secret read, no env persisted beyond this process. Does NOT read
 * /tmp/roofleadhq-vapi-webhook-secret-build237. Reserved fictional 555-01xx / 555-55xx numbers only;
 * no real phone number, no real UUID, no real call id, no PII. Non-mutating: asserts git status is
 * unchanged (the tsc dist build is gitignored).
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
const DOC = 'docs/MAPPED_ROOFER_PERSISTENCE_GAP_DIAGNOSIS_BUILD_275.md';
const B274_DOC = 'docs/FIRST_ROOFER_PSTN_E2E_BUILD_274.md';
const B271_DOC = 'docs/FIRST_ROOFER_TEST_WIRING_BUILD_271.md';

const SAMPLES = 'docs/samples';
const FIX_MAPPED = `${SAMPLES}/vapi-event-mapped-clean-eocr.fake.json`;
const FIX_STATUS = `${SAMPLES}/vapi-event-status-update.fake.json`;

const B274_COMMIT = 'dd1c1b8';
const B271_COMMIT = '4d36bdf';
const B268_COMMIT = '4c08b5e';

const DIST_SERVICE = path.join(backendRoot, 'dist/services/vapi-webhook.service.js');
const DIST_CONFIG = path.join(backendRoot, 'dist/config/config.js');

/**
 * Fake Supabase client with two table behaviors:
 *
 *  - roofers: eq-AWARE. `.eq(col, val)` accumulates a filter; `.maybeSingle()` returns the single
 *    provided row that byte-matches ALL filters (mirrors Postgres text `.eq()`), else null. This is
 *    what makes the near-miss diagnosis real: a stored twilio_number that is not byte-equal to the
 *    normalized destination does NOT match, so the service takes the Build 268 no-op. `config.roofers`
 *    may instead carry `{ error }` to exercise the lookup_failed (HTTP 500) path.
 *  - calls / leads / bookings: insert/select-aware per Build 271 — the terminal read resolves to
 *    `spec.insert` (post-insert row / insert error) if `.insert()` was called on that chain, else
 *    `spec.select` (pre-existing-row lookup). This lets the mapped path genuinely traverse
 *    "no existing call -> create lead -> create booking -> insert call".
 *
 * No network, no real client. Only the methods the service actually calls are implemented.
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

(async function main() {
  const before = gitStatus();
  console.log('=== Build 275 Mapped-Roofer Persistence Gap Diagnosis (repo-only, in-process, fake Supabase) ===');
  console.log('No call. No SMS. No Vapi Test/Talk/webCall. No Vapi rerun. No curl. No live HTTP. No real Supabase. No Twilio. No Retell. No Vapi API. No config change. No deploy. No schema/RLS change. No secret file read. No production DB read. Offline behavioral diagnosis of why a mapped-roofer PSTN EOCR returned backend 200 without visible lead/booking/call persistence.');

  // --- 1. Static grounding: the route's HTTP mapping and the service's 200-yielding branches. ---
  const route = read(ROUTE_SRC);
  assert(/error\s*===\s*'missing_required_field'[\s\S]*status\(400\)/.test(route),
    'route maps missing_required_field -> 400');
  assert(/error\s*===\s*'unknown_roofer'[\s\S]*status\(404\)/.test(route),
    'route maps the (defensive, no-longer-reached) unknown_roofer error -> 404');
  assert(/if\s*\(!result\.ok\)\s*\{\s*return res\.status\(500\)/.test(route),
    'route maps any other ok:false -> 500');
  assert(/return res\.status\(200\)\.json\(result\)/.test(route),
    'route returns 200 ONLY on an ok:true result');
  pass('route HTTP contract grounded: 200 iff ok:true; 400 missing field; 404 unknown_roofer; 500 otherwise');

  const service = read(SERVICE_SRC);
  assert(/\.eq\('twilio_number',\s*normalized\.roofer_destination_number\)/.test(service),
    'service resolves the roofer by exact roofers.twilio_number == normalized (E.164) destination equality');
  assert(/unknown_roofer_destination_unmapped/.test(service),
    'service returns the Build 268 controlled no-op (unknown_roofer_destination_unmapped) for an unmapped destination');
  assert(/error:\s*'insert_failed'/.test(service) && /error:\s*'lookup_failed'/.test(service),
    'service returns ok:false insert_failed / lookup_failed (route -> 500), NOT a swallowed 200');
  pass('service source grounds the single-field equality lookup, the 268 no-op, and the ok:false (500) DB-failure paths');

  // --- 2. Compile the CURRENT backend (dist is gitignored: no tracked-file churn). ---
  const tscBin = path.join(backendRoot, 'node_modules/.bin/tsc');
  assert(fs.existsSync(tscBin), 'local tsc is available for the behavioral build');
  execFileSync(tscBin, [], { cwd: backendRoot, stdio: 'pipe' });
  assert(fs.existsSync(DIST_SERVICE) && fs.existsSync(DIST_CONFIG), 'compiled service + config exist after build');
  pass('backend compiled (tsc) for in-process behavioral diagnosis');

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

  const mapped = readJson(FIX_MAPPED);
  const normalized = svc.normalizeVapiCallCompletedPayload(mapped);
  assert(normalized.roofer_destination_number && /^\+1\d{10}$/.test(normalized.roofer_destination_number),
    'mapped fixture normalizes a strict-E.164 PSTN destination number');
  assert(normalized.caller_phone && normalized.provider_call_id,
    'mapped fixture normalizes caller_phone + provider_call_id (required-field gate satisfied)');
  const dest = normalized.roofer_destination_number; // strict E.164, e.g. +1555XXXXXXX

  // Convenient reusable table specs for the persist path.
  const persistTables = () => ({
    calls: { select: { data: null, error: null }, insert: { data: { id: 'call-new-275' }, error: null } },
    leads: { select: { data: [], error: null }, insert: { data: { id: 'lead-new-275' }, error: null } },
    bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-275' }, error: null } },
  });

  // === CASE A — CORE: exact-E.164 roofer row -> FULL persistence (the ONLY persisting 200). ===
  {
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-275', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(mapped);
    assert(r.ok === true && r.inserted === true && r.duplicate !== true,
      'exact-E.164 mapping -> ok:true and a NEW call inserted (full persistence)');
    assert(r.roofer_id === 'roofer-275' && r.matched_lead_id === 'lead-new-275'
      && r.booking_id === 'booking-new-275' && r.call_id === 'call-new-275',
      'exact-E.164 mapping -> roofer resolved + lead + booking + call all persisted');
    assert(r.reason !== 'unknown_roofer_destination_unmapped' && !r.error,
      'exact-E.164 mapping -> NOT the Build 268 no-op, carries no error');
  }
  pass('CASE A: exact-E.164 roofers.twilio_number == destination -> full lead+booking+call persistence (200 WITH persistence)');

  // === CASE B — NEAR-MISS: a roofer row exists for the SAME number but in a non-E.164 format
  //     variant -> byte-exact eq fails -> Build 268 controlled 200 no-op -> ZERO persistence. ===
  // dest is like "+1555XXXXXXX". Build variants that are NOT byte-equal to strict E.164.
  const bare11 = dest.replace('+', '');             // 1555XXXXXXX (no '+')
  const bare10 = dest.replace('+1', '');            // 555XXXXXXX  (no country code)
  const dashed = `+1 ${bare10.slice(0, 3)}-${bare10.slice(3, 6)}-${bare10.slice(6)}`; // +1 555-XXX-XXXX
  const paren = `(${bare10.slice(0, 3)}) ${bare10.slice(3, 6)}-${bare10.slice(6)}`;    // (555) XXX-XXXX
  const padded = ` ${dest} `;                        // surrounding whitespace
  const formatVariants = [
    ['no_plus_prefix', bare11],
    ['no_country_code', bare10],
    ['separator_dashes_space', dashed],
    ['parenthesized', paren],
    ['surrounding_whitespace', padded],
  ];
  for (const [label, stored] of formatVariants) {
    assert(stored !== dest, `format variant ${label} must differ byte-wise from strict E.164 destination`);
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-275', business_name: 'Demo Pilot Roofing', twilio_number: stored }] },
      ...persistTables(),
    };
    const r = await svc.processVapiCallCompleted(mapped);
    assert(r.ok === true && r.acknowledged === true && r.processed === false,
      `near-miss (${label}) -> controlled 200 no-op (ok:true, acknowledged, not processed)`);
    assert(r.reason === 'unknown_roofer_destination_unmapped',
      `near-miss (${label}) -> Build 268 unmapped-destination reason`);
    assert(!r.inserted && !r.call_id && !r.matched_lead_id && !r.booking_id && !r.error,
      `near-miss (${label}) -> NO lead/booking/call persisted, no error (looks identical to Build 274)`);
  }
  pass(`CASE B: a roofer row stored in ANY of ${formatVariants.length} non-E.164 formats -> Build 268 200 no-op, zero persistence (reproduces the Build 274 symptom offline)`);

  // === CASE C — the remaining ok:true (200) branches all write nothing. ===
  // C1: non-terminal status update -> acknowledge_non_terminal (no lookup, no persistence).
  {
    fakeConfig = { roofers: { rows: [{ id: 'should-not-read', twilio_number: dest }] } };
    const r = await svc.processVapiCallCompleted(readJson(FIX_STATUS));
    assert(r.ok === true && r.acknowledged === true && r.processed === false && !r.inserted && !r.error,
      'non-terminal status-update -> 200 no-op, no persistence');
  }
  // C2: terminal report, no PSTN destination, non-phone transport -> acknowledge_web_call.
  {
    const webCall = { message: { type: 'end-of-call-report', call: { id: 'call_fake_web_275', type: 'webCall' } } };
    const nz = svc.normalizeVapiCallCompletedPayload(webCall);
    assert(!nz.roofer_destination_number, 'synthetic web fixture has no roofer destination');
    fakeConfig = { roofers: { rows: [{ id: 'should-not-read', twilio_number: dest }] } };
    const r = await svc.processVapiCallCompleted(webCall);
    assert(r.ok === true && r.web_call === true && r.processed === false && !r.inserted && !r.error,
      'terminal web-call with no destination -> 200 acknowledge_web_call, no persistence');
  }
  // C3: mapped + an EXISTING call for the provider_call_id -> duplicate (idempotent, no new persistence).
  {
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-275', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      calls: { select: { data: { id: 'call-existing-275' }, error: null } },
    };
    const r = await svc.processVapiCallCompleted(mapped);
    assert(r.ok === true && r.duplicate === true && r.inserted === false && r.call_id === 'call-existing-275',
      'mapped + existing call -> 200 duplicate, no second persistence');
  }
  pass('CASE C: acknowledge_non_terminal, acknowledge_web_call, and duplicate are all ok:true (200) with NO new persistence');

  // === CASE D — NON-SWALLOW: DB failures are ok:false (route -> 500/400), NOT a 200. ===
  // D1: roofer lookup error -> lookup_failed (ok:false -> 500).
  {
    fakeConfig = { roofers: { error: { code: 'PGRST500', message: 'fake lookup error' } } };
    const r = await svc.processVapiCallCompleted(mapped);
    assert(r.ok === false && r.error === 'lookup_failed',
      'roofer lookup error -> ok:false lookup_failed (route -> 500, never 200)');
  }
  // D2: calls insert error -> insert_failed (ok:false -> 500). Proves a failed CALL insert is NOT a 200.
  {
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-275', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      calls: { select: { data: null, error: null }, insert: { data: null, error: { code: 'XX000', message: 'fake insert error' } } },
      leads: { select: { data: [], error: null }, insert: { data: { id: 'lead-new-275' }, error: null } },
      bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-275' }, error: null } },
    };
    const r = await svc.processVapiCallCompleted(mapped);
    assert(r.ok === false && r.error === 'insert_failed',
      'calls insert error -> ok:false insert_failed (route -> 500, never 200)');
  }
  // D3: missing required field (no caller phone) -> missing_required_field (ok:false -> 400).
  {
    const noCaller = { message: { type: 'end-of-call-report', call: { id: 'call_fake_nocaller_275', type: 'inboundPhoneCall', phoneNumber: { number: dest } } } };
    fakeConfig = { roofers: { rows: [{ id: 'roofer-275', twilio_number: dest }] } };
    const r = await svc.processVapiCallCompleted(noCaller);
    assert(r.ok === false && r.error === 'missing_required_field',
      'terminal phone EOCR missing caller_phone -> ok:false missing_required_field (route -> 400, never 200)');
  }
  pass('CASE D: roofer-lookup error, calls-insert error, and missing field all return ok:false (HTTP 500/400) -> a visible 200 is NOT a swallowed call-insert/lookup failure');

  // === CASE E — PARTIAL-PERSIST: roofer resolves, call inserts, but the LEAD insert errors ->
  //     200 inserted:true with NULL lead_id/booking_id and a CALL row created (leads-only check misses it). ===
  {
    fakeConfig = {
      roofers: { rows: [{ id: 'roofer-275', business_name: 'Demo Pilot Roofing', twilio_number: dest }] },
      calls: { select: { data: null, error: null }, insert: { data: { id: 'call-new-275' }, error: null } },
      leads: { select: { data: [], error: null }, insert: { data: null, error: { code: 'XX000', message: 'fake lead insert error' } } },
      bookings: { select: { data: null, error: null }, insert: { data: { id: 'booking-new-275' }, error: null } },
    };
    const r = await svc.processVapiCallCompleted(mapped);
    assert(r.ok === true && r.inserted === true && r.call_id === 'call-new-275',
      'lead insert error is swallowed -> still 200 with the call row inserted');
    assert(r.matched_lead_id === null && r.booking_id === null,
      'swallowed lead insert -> null lead_id and null booking_id (a leads-table-only check sees nothing)');
  }
  pass('CASE E: a swallowed lead-insert error yields 200 + a call row but null lead/booking -> a 200 can mean "call persisted, lead/booking absent"');

  // --- 3. Diagnosis doc grounding (status tokens, ranked cause, proposed fix gated, evidence needed). ---
  const doc = read(DOC);
  const DOC_TOKENS = [
    'build_275_diagnosis_status = completed',
    'first_roofer_e2e_gap = backend_200_persistence_not_observed',
    'suspected_branch_identified = true',
    'most_likely_200_without_persistence_branch = build_268_controlled_no_op_unmapped_destination',
    'fixture_gap_identified = true',
    'production_safe_fix_added = false',
    'mapped_roofer_persistence_readiness = blocked_pending_specific_masked_evidence',
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
  for (const t of DOC_TOKENS) assert(doc.includes(t), `B275 doc missing status token: ${t}`);
  assert(/verify-mapped-roofer-persistence-gap-build-275-readonly\.js/.test(doc), 'B275 doc references this verifier');
  assert(/run-mapped-roofer-persistence-gap-build-275-dry-run\.sh/.test(doc), 'B275 doc references its dry-run');
  assert(/unknown_roofer_destination_unmapped/.test(doc), 'B275 doc names the Build 268 no-op branch');
  assert(/requires? separate approval/i.test(doc), 'B275 doc marks the proposed fix as requiring separate approval');
  assert(/0389/.test(doc), 'B275 doc references the masked clean-number last4 (0389)');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not read/i.test(doc),
    'B275 doc states the local secret file was not read');
  // No secret / PII / raw-number leakage. "Launch Test Roofing 1780434363" is Jason's chosen row
  // LABEL (not a phone number) — strip it before the phone-shaped scan, as Build 274 does.
  const scrubbed = doc.replace(/Launch Test Roofing 1780434363/g, 'ROW_LABEL');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B275 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B275 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B275 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc), 'B275 doc contains no raw UUID');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed), 'B275 doc contains no phone-number-shaped value');
  pass('B275 diagnosis doc grounds the completed status, the ranked cause, the gated proposed fix, the exact evidence needed, and carries no secret/PII');

  // --- 4. Prerequisite commits + predecessor docs present. ---
  assert(commitPresent(B274_COMMIT), 'Build 274 prerequisite commit dd1c1b8 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(commitPresent(B268_COMMIT), 'Build 268 prerequisite commit 4c08b5e present in git history');
  for (const d of [B274_DOC, B271_DOC]) {
    assert(fs.existsSync(path.join(repoRoot, d)), `predecessor doc exists: ${d}`);
  }
  pass('Build 274 + 271 + 268 prerequisite commits present and predecessor docs exist');

  // --- 5. Non-mutating proof (tracked files unchanged; dist is gitignored). ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating (dist build is gitignored)');

  console.log(`\nPASS: Build 275 Mapped-Roofer Persistence Gap Diagnosis verified (${passCount} checks).`);
  console.log('build_mode=mapped_roofer_persistence_gap_diagnosis_repo_only  build_275_diagnosis_status=completed  first_roofer_e2e_gap=backend_200_persistence_not_observed  suspected_branch_identified=true  most_likely_200_without_persistence_branch=build_268_controlled_no_op_unmapped_destination  fixture_gap_identified=true  production_safe_fix_added=false  mapped_roofer_persistence_readiness=blocked_pending_specific_masked_evidence  only_persisting_200_branch=inserted_true  noop_200_branches=acknowledge_non_terminal|acknowledge_web_call|unknown_roofer_destination_unmapped|duplicate  db_failure_is_500_not_200=true  near_miss_format_mismatch_reproduces_symptom=true  no_second_call=true  retry_count=0  no_call=true  no_sms_sent=true  no_homeowner_contact=true  no_roofer_contact=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_env_var_changed=true  no_schema_auth_rls_changed=true  no_secret_printing=true  real_supabase_used=false  supabase_write=false  production_db_read=false  deploy=false  config_changed=false  secret_file_read=false  full_clean_vapi_number_recorded_in_repo=false  tracked_files_unchanged=true');
})().catch((err) => { console.error('FAIL: unexpected verifier error:', err && err.stack || err); process.exit(1); });
