#!/usr/bin/env node
/**
 * Build 272 Verifier — Controlled Demo/Pilot Roofer Runtime Mapping: BLOCKED / Gap Evidence
 * (repo-only, read-only, offline).
 *
 * Build 272's approved scope was to perform exactly ONE controlled runtime data update setting one
 * demo/pilot roofers.twilio_number equal to the clean Vapi-managed Test Number — but ONLY "if all
 * required values are known". They were not: the clean Vapi number is deliberately redacted repo-wide
 * (Blocker A), the intended production roofer row is not identifiable from the repo (Blocker B), and
 * there is no safe agent write path within the established out-of-band pattern (Blocker C). So the
 * build captured a blocked/gap evidence packet with the smallest next action instead of forcing or
 * guessing the update.
 *
 * This verifier checks REPO EVIDENCE ONLY. It does not connect to production, Supabase, Vapi, Twilio,
 * Retell, or any provider; it performs no write; it reads no secret; it prints no full phone number.
 * It asserts the doc records the correct blocked determination, the re-grounded mapping requirement,
 * all three blockers, the next-step options, the full status block, and that no runtime action or
 * secret/number leakage occurred. Non-mutating (git status before === after).
 */

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '../..');

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
function commitPresent(sha) {
  try {
    execFileSync('git', ['rev-parse', '--verify', '--quiet', `${sha}^{commit}`],
      { cwd: repoRoot, encoding: 'utf8' });
    return true;
  } catch (_e) { return false; }
}

const DOC = 'docs/CONTROLLED_ROOFER_RUNTIME_MAPPING_BUILD_272.md';
const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';
const B271_DOC = 'docs/FIRST_ROOFER_TEST_WIRING_BUILD_271.md';
const B271_VERIFIER = 'backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js';

const B271_COMMIT = '4d36bdf';
const B270_COMMIT = '1248386';
const B268_COMMIT = '4c08b5e';

(function main() {
  const before = gitStatus();
  console.log('=== Build 272 Controlled Demo/Pilot Roofer Runtime Mapping — BLOCKED/gap evidence verification (repo-only) ===');
  console.log('No production connection. No Supabase/Vapi/Twilio/Retell call. No roofer row written. No live call. No SMS. No deploy. No config change. No secret read/printed. No full phone number. Read-only, non-mutating.');

  const doc = read(DOC);

  // 1. Doc exists + decision token + blocked build mode.
  assert(doc.includes('CONTROLLED_ROOFER_RUNTIME_MAPPING_BLOCKED_REQUIRED_VALUES_NOT_SAFELY_KNOWN'),
    'B272 doc carries the blocked decision token');
  assert(/build_mode\s*=\s*controlled_roofer_runtime_mapping_blocked_gap_evidence_repo_only/.test(doc),
    'B272 doc records the blocked/gap repo-only build mode');
  assert(/runtime_update_performed_by_build_272\s*=\s*false/.test(doc),
    'B272 doc records no runtime update performed');
  pass('B272 doc exists, carries the blocked decision token, and records no runtime update performed');

  // 2. Mapping requirement re-grounded against real Build 271 code (single-field equality).
  const service = read(SERVICE_SRC);
  assert(/\.eq\('twilio_number',\s*normalized\.roofer_destination_number\)/.test(service),
    'service still maps roofer via roofers.twilio_number == normalized destination (Build 271 invariant intact)');
  assert(/roofers\.twilio_number\s*==\s*<normalized clean Vapi EOCR destination \(E\.164\)>/.test(doc),
    'B272 doc states the exact single-field mapping requirement');
  assert(/mapping_requirement_status\s*=\s*confirmed_repo_only/.test(doc) &&
    /mapping_code_behavior_preserved\s*=\s*true/.test(doc),
    'B272 doc records the mapping requirement confirmed and code behavior preserved');
  assert(/unknown_roofer_destination_unmapped/.test(doc),
    'B272 doc references the preserved Build 268 controlled-200 no-op behavior for the unmapped case');
  pass('B272 doc re-grounds the mapping requirement against real service source and preserves 268/271 behavior');

  // 3. All three blockers documented.
  assert(/Blocker A[\s\S]*clean Vapi[\s\S]*not safely available/i.test(doc) &&
    /clean_vapi_number_value_available_in_repo\s*=\s*false/.test(doc) &&
    /clean_vapi_number_guessed\s*=\s*false/.test(doc),
    'B272 doc records Blocker A (clean Vapi number not safely available; not guessed)');
  assert(/Blocker B[\s\S]*production[\s\S]*roofer row[\s\S]*not identifiable/i.test(doc) &&
    /target_production_roofer_row_identified\s*=\s*false/.test(doc) &&
    /demo_roofer_repo_artifact_is_local_fake_only\s*=\s*true/.test(doc),
    'B272 doc records Blocker B (intended production roofer row not identifiable; repo artifact is local fake only)');
  assert(/Blocker C[\s\S]*no safe agent write path/i.test(doc) &&
    /agent_production_write_path_safe\s*=\s*false/.test(doc) &&
    /secret_read_or_printed\s*=\s*false/.test(doc),
    'B272 doc records Blocker C (no safe agent write path; no secret read/printed)');
  pass('B272 doc records all three blockers (A: number redacted, B: row unidentified, C: no safe write path)');

  // 4. Next smallest action documented (both out-of-band options), keeping route untouched + no E2E approval.
  assert(/Option 1[\s\S]*UPDATE roofers[\s\S]*SET twilio_number/i.test(doc),
    'B272 doc gives Option 1 (Jason out-of-band single-row UPDATE, masked values)');
  assert(/exactly one row/i.test(doc), 'B272 doc constrains the update to exactly one row');
  assert(/Option 2[\s\S]*safely supplies the two required values/i.test(doc),
    'B272 doc gives Option 2 (Jason safely supplies values for a future controlled step)');
  assert(/existing Twilio\s*→?\s*Retell route[\s\S]*untouched/i.test(doc),
    'B272 doc keeps the existing Twilio -> Retell route untouched');
  assert(/does NOT approve the first[\s\S]*PSTN E2E test/i.test(doc),
    'B272 doc states it does not approve the first PSTN E2E test');
  pass('B272 doc documents the smallest next action (two out-of-band options), route untouched, no E2E approval');

  // 5. Full expected status block present with the blocked values.
  const STATUS = [
    'controlled_runtime_mapping_status = blocked_with_known_gap',
    'mapped_roofer_count = 0',
    'mapped_roofer_count_target_if_completed = 1',
    'clean_vapi_number_to_roofer_mapping_status = blocked',
    'clean_vapi_number_assignment_status = pending_safe_confirmation',
    'first_roofer_e2e_test_readiness = blocked_pending_runtime_mapping',
    'first_roofer_e2e_test_approval_status = not_approved',
    'no_call_placed = true',
    'no_sms_sent = true',
    'no_homeowner_contact = true',
    'no_unapproved_roofer_contact = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_schema_auth_rls_changed = true',
    'no_backend_deploy = true',
    'no_railway_restart = true',
    'no_production_data_export = true',
    'no_secret_printing = true',
  ];
  for (const s of STATUS) assert(doc.includes(s), `B272 doc missing status line: ${s}`);
  pass('B272 doc contains the full expected status block (blocked mapping, count 0/target 1, E2E not approved, all no_* invariants)');

  // 6. Prerequisite commits present + predecessor artifacts exist.
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(commitPresent(B270_COMMIT), 'Build 270 prerequisite commit 1248386 present in git history');
  assert(commitPresent(B268_COMMIT), 'Build 268 prerequisite commit 4c08b5e present in git history');
  assert(fs.existsSync(path.join(repoRoot, B271_DOC)) && fs.existsSync(path.join(repoRoot, B271_VERIFIER)),
    'Build 271 doc + verifier exist (readiness this build builds on)');
  assert(/build_271_prerequisite_commit\s*=\s*4d36bdf/.test(doc), 'B272 doc records the Build 271 prerequisite commit');
  pass('Build 271/270/268 prerequisite commits present and Build 271 artifacts exist');

  // 7. No secret / token / raw-id / full-phone-number leakage in the doc.
  //    (The SQL template uses masked placeholders like <CLEAN_VAPI_TEST_NUMBER_E164>, not real values.)
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), 'B272 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), 'B272 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), 'B272 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc),
    'B272 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(doc),
    'B272 doc contains no phone-number-shaped value (clean Vapi number never written)');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B272 doc states the local secret file was not read');
  pass('B272 doc carries no secret-shaped, token-shaped, raw-id, or phone-number-shaped value; secret file not read');

  // 8. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 272 Controlled Roofer Runtime Mapping BLOCKED/gap evidence verified (${passCount} checks).`);
  console.log('build_mode=controlled_roofer_runtime_mapping_blocked_gap_evidence_repo_only  runtime_update_performed_by_build_272=false  controlled_runtime_mapping_status=blocked_with_known_gap  mapped_roofer_count=0  mapped_roofer_count_target_if_completed=1  clean_vapi_number_to_roofer_mapping_status=blocked  clean_vapi_number_value_available_in_repo=false  clean_vapi_number_guessed=false  target_production_roofer_row_identified=false  agent_production_write_path_safe=false  clean_vapi_number_assignment_status=pending_safe_confirmation  first_roofer_e2e_test_readiness=blocked_pending_runtime_mapping  first_roofer_e2e_test_approval_status=not_approved  mapping_requirement_status=confirmed_repo_only  mapping_code_behavior_preserved=true  build_271_prerequisite_commit=4d36bdf  build_270_prerequisite_commit=1248386  build_268_prerequisite_commit=4c08b5e  no_call_placed=true  no_sms_sent=true  no_homeowner_contact=true  no_unapproved_roofer_contact=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_schema_auth_rls_changed=true  no_backend_deploy=true  no_railway_restart=true  no_production_data_export=true  no_secret_printing=true  roofer_row_written=false  production_connected=false  secret_file_read=false  tracked_files_unchanged=true');
})();
