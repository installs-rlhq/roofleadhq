#!/usr/bin/env node
/**
 * Build 274 Verifier — First Roofer PSTN E2E: One Approved Call Executed, Backend 200,
 * Persistence Not Observed (repo-only, read-only, offline).
 *
 * Build 273 staged exactly one controlled PSTN first-roofer E2E test for a SEPARATE single-call
 * approval. That separate approval was granted for one call only. Jason then placed exactly one true
 * PSTN call to the clean Vapi-managed Test Number (last-4 0389), mapped to the single roofer row
 * "Launch Test Roofing 1780434363" and answered by the Test Roofing Assistant. The EOCR reached the
 * backend and returned HTTP 200, but lead / booking / call persistence in Supabase was NOT observed.
 * Build 274 captures that outcome honestly: the result is inconclusive (backend 200, persistence not
 * proven) — NOT a full pass.
 *
 * This verifier checks REPO EVIDENCE ONLY. It does not connect to production, Supabase, Vapi, Twilio,
 * Retell, or any provider; it performs no write; it places no call; it requests no retry; it reads no
 * secret; it prints no full phone number, UUID, call id, or email. It asserts the doc records the one
 * executed call, retry 0, backend 200, the inconclusive persistence determination, the diagnose-first
 * next step (no new call), the full status block, and every no_* invariant, and that the full clean
 * Vapi number is absent. Non-mutating.
 *
 * Leak-safety note: the mapped roofer identifier "Launch Test Roofing 1780434363" is Jason's chosen
 * label for the mapped test row (NOT a phone number). It is the single sanctioned long-digit token;
 * the phone-number-shaped scan strips it first, then asserts no other phone-shaped / long-digit value
 * remains, so a real full phone number could not hide in the doc.
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

const DOC = 'docs/FIRST_ROOFER_PSTN_E2E_BUILD_274.md';
const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';
const B273_DOC = 'docs/MAPPED_ROOFER_READINESS_BUILD_273.md';
const B273_VERIFIER = 'backend/scripts/verify-mapped-roofer-readiness-build-273-readonly.js';
const B271_DOC = 'docs/FIRST_ROOFER_TEST_WIRING_BUILD_271.md';
const B271_VERIFIER = 'backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js';

const B273_COMMIT = '0cfa8cf';
const B272_COMMIT = '0930813';
const B271_COMMIT = '4d36bdf';
const B270_COMMIT = '1248386';
const B268_COMMIT = '4c08b5e';

// The single sanctioned long-digit token in the doc — Jason's mapped roofer label, not a phone number.
const SANCTIONED_IDENTIFIER = 'Launch Test Roofing 1780434363';

(function main() {
  const before = gitStatus();
  console.log('=== Build 274 First Roofer PSTN E2E — one approved call, backend 200, persistence not observed (repo-only) ===');
  console.log('No production connection. No Supabase/Vapi/Twilio/Retell call. No call placed by this build. No retry. No SMS. No deploy. No config change. No secret read/printed. No full phone number/UUID/call-id/email. Read-only, non-mutating.');

  const doc = read(DOC);

  // 1. Doc exists + decision token + closeout evidence-only build mode + no call by this build.
  assert(doc.includes('FIRST_ROOFER_PSTN_E2E_EXECUTED_EXACTLY_ONE_APPROVED_CALL'),
    'B274 doc carries the one-approved-call decision token');
  assert(/build_mode\s*=\s*first_roofer_pstn_e2e_closeout_evidence_repo_only/.test(doc),
    'B274 doc records the closeout evidence-only repo-only build mode');
  assert(/call_performed_by_build_274\s*=\s*false/.test(doc),
    'B274 doc records no call performed by this build');
  assert(/call_performed_out_of_band_by_jason\s*=\s*true/.test(doc),
    'B274 doc records the one call was performed out-of-band by Jason');
  pass('B274 doc exists, carries the one-approved-call token, and records the call was placed out-of-band (not by this build)');

  // 2. Exactly one call, retry 0, no second call.
  assert(/first_roofer_pstn_e2e_execution_status\s*=\s*completed_one_call/.test(doc),
    'B274 doc records first_roofer_pstn_e2e_execution_status = completed_one_call');
  assert(/true_pstn_call_count\s*=\s*1/.test(doc),
    'B274 doc records exactly one true PSTN call (true_pstn_call_count = 1)');
  assert(/retry_count\s*=\s*0/.test(doc),
    'B274 doc records retry_count = 0');
  assert(/second_call_placed\s*=\s*false/.test(doc) && /second_call_requested\s*=\s*false/.test(doc),
    'B274 doc records no second call placed or requested');
  pass('B274 doc records exactly one PSTN call, retry_count 0, and no second call placed/requested');

  // 3. Call/assistant observed conservatively; masked call facts.
  assert(/call_completion_status\s*=\s*observed_via_vapi_record_and_eocr/.test(doc),
    'B274 doc records call completion observed via vapi record and eocr (conservative phrasing)');
  assert(/assistant_answered_status\s*=\s*observed_test_roofing_assistant_used/.test(doc),
    'B274 doc records assistant answered observed via test roofing assistant used (conservative phrasing)');
  assert(/assistant_used\s*=\s*Test Roofing Assistant/.test(doc),
    'B274 doc records assistant_used = Test Roofing Assistant');
  assert(/clean_vapi_number_last4\s*=\s*0389/.test(doc),
    'B274 doc records the clean Vapi number last-4 = 0389 (masked)');
  assert(doc.includes('mapped_roofer_identifier = ' + SANCTIONED_IDENTIFIER),
    'B274 doc records the mapped roofer identifier (Launch Test Roofing 1780434363)');
  pass('B274 doc records conservative call/assistant observations and masked call facts (assistant, last4 0389, mapped roofer)');

  // 4. Backend reached 200 but persistence NOT observed — the core honest finding.
  assert(/eocr_to_backend_status\s*=\s*200/.test(doc),
    'B274 doc records eocr_to_backend_status = 200');
  assert(/mapped_roofer_path_status\s*=\s*attempted_backend_200/.test(doc),
    'B274 doc records mapped_roofer_path_status = attempted_backend_200');
  assert(/lead_persistence_status\s*=\s*inconclusive_or_not_observed/.test(doc),
    'B274 doc records lead_persistence_status = inconclusive_or_not_observed');
  assert(/booking_persistence_status\s*=\s*inconclusive_or_not_observed/.test(doc),
    'B274 doc records booking_persistence_status = inconclusive_or_not_observed');
  assert(/call_persistence_status\s*=\s*inconclusive_or_not_observed/.test(doc),
    'B274 doc records call_persistence_status = inconclusive_or_not_observed');
  assert(/first_roofer_e2e_result\s*=\s*inconclusive_backend_200_persistence_not_observed/.test(doc),
    'B274 doc records first_roofer_e2e_result = inconclusive_backend_200_persistence_not_observed');
  assert(/first_roofer_e2e_full_pass_claimed\s*=\s*false/.test(doc),
    'B274 doc explicitly does NOT claim a full pass (first_roofer_e2e_full_pass_claimed = false)');
  pass('B274 doc records backend 200 but lead/booking/call persistence NOT observed, result inconclusive, no full pass claimed');

  // 5. Backend 200 explicitly distinguished from persistence (268 no-op vs 271 mapped-persist).
  assert(/necessary but \*\*not\s*\n?\s*sufficient\*\*|necessary but \*\*not sufficient\*\*/i.test(doc) ||
    /200 alone therefore cannot distinguish/i.test(doc),
    'B274 doc explains a 200 alone cannot distinguish mapped-persist from the Build 268 no-op');
  assert(/Build 268/.test(doc) && /no-op/.test(doc) && /Build 271/.test(doc),
    'B274 doc references the Build 268 no-op and Build 271 fixture proof when reasoning about the 200');
  pass('B274 doc distinguishes backend 200 from persistence (268 no-op vs 271 mapped-persist), justifying inconclusive');

  // 6. Mapping requirement re-grounded against real service source (single-field equality, unchanged).
  const service = read(SERVICE_SRC);
  assert(/\.eq\('twilio_number',\s*normalized\.roofer_destination_number\)/.test(service),
    'service still maps roofer via roofers.twilio_number == normalized destination (Build 271 invariant intact)');
  assert(/mapping_requirement_status\s*=\s*confirmed_repo_only/.test(doc) &&
    /mapping_code_behavior_preserved\s*=\s*true/.test(doc),
    'B274 doc records the mapping requirement confirmed and code behavior preserved');
  assert(/mapped_roofer_count\s*=\s*1/.test(doc),
    'B274 doc records exactly one mapped roofer row (mapped_roofer_count = 1)');
  pass('B274 doc re-grounds the mapping requirement against real service source and preserves 268/271 behavior');

  // 7. Diagnose-first next step with NO new call unless separately approved.
  assert(/next_step\s*=\s*diagnose_backend_200_without_visible_persistence_for_mapped_roofer_no_new_call_unless_separately_approved/.test(doc),
    'B274 doc records the diagnose-first next step (no new call unless separately approved)');
  assert(/without placing another call|without another call|no new call/i.test(doc),
    'B274 doc states the next step requires no new call');
  assert(/existing Twilio\s*→?\s*Retell route[\s\S]*?(untouched|preserved untouched)/i.test(doc),
    'B274 doc keeps the existing Twilio -> Retell route untouched');
  pass('B274 doc records the diagnose-first next step with no new call unless separately approved, route untouched');

  // 8. Full expected status block present with all Build 274 values.
  const STATUS = [
    'build_mode = first_roofer_pstn_e2e_closeout_evidence_repo_only',
    'call_performed_by_build_274 = false',
    'first_roofer_pstn_e2e_execution_status = completed_one_call',
    'true_pstn_call_count = 1',
    'retry_count = 0',
    'clean_vapi_number_last4 = 0389',
    'assistant_used = Test Roofing Assistant',
    'mapped_roofer_identifier = Launch Test Roofing 1780434363',
    'call_completion_status = observed_via_vapi_record_and_eocr',
    'assistant_answered_status = observed_test_roofing_assistant_used',
    'eocr_to_backend_status = 200',
    'mapped_roofer_path_status = attempted_backend_200',
    'mapped_roofer_count = 1',
    'lead_persistence_status = inconclusive_or_not_observed',
    'booking_persistence_status = inconclusive_or_not_observed',
    'call_persistence_status = inconclusive_or_not_observed',
    'first_roofer_e2e_result = inconclusive_backend_200_persistence_not_observed',
    'first_roofer_e2e_full_pass_claimed = false',
    'no_retry = true',
    'no_second_call = true',
    'no_sms_sent = true',
    'no_homeowner_contact = true',
    'no_real_roofer_contact = true',
    'no_config_deploy_schema_changes = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_vapi_config_changed = true',
    'no_railway_config_changed = true',
    'no_backend_deploy = true',
    'no_schema_auth_rls_changed = true',
    'no_env_var_changed = true',
    'no_production_data_export = true',
    'no_secret_printing = true',
    'full_clean_vapi_number_recorded_in_repo = false',
  ];
  for (const s of STATUS) assert(doc.includes(s), `B274 doc missing status line: ${s}`);
  pass('B274 doc contains the full expected status block (one call, retry 0, backend 200, inconclusive persistence, no full pass, all no_* invariants)');

  // 9. Prerequisite commits present + predecessor artifacts exist.
  assert(commitPresent(B273_COMMIT), 'Build 273 prerequisite commit 0cfa8cf present in git history');
  assert(commitPresent(B272_COMMIT), 'Build 272 prerequisite commit 0930813 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(commitPresent(B270_COMMIT), 'Build 270 prerequisite commit 1248386 present in git history');
  assert(commitPresent(B268_COMMIT), 'Build 268 prerequisite commit 4c08b5e present in git history');
  assert(fs.existsSync(path.join(repoRoot, B273_DOC)) && fs.existsSync(path.join(repoRoot, B273_VERIFIER)),
    'Build 273 doc + verifier exist (staged this one-call approval)');
  assert(fs.existsSync(path.join(repoRoot, B271_DOC)) && fs.existsSync(path.join(repoRoot, B271_VERIFIER)),
    'Build 271 doc + verifier exist (fixture-proven mapped persistence this build reasons against)');
  assert(/build_273_prerequisite_commit\s*=\s*0cfa8cf/.test(doc), 'B274 doc records the Build 273 prerequisite commit');
  pass('Build 273/272/271/270/268 prerequisite commits present and predecessor artifacts exist');

  // 10. No secret / token / raw-id / full-phone-number leakage in the doc.
  //     Strip the single sanctioned roofer-identifier token first (Jason's label, not a phone number),
  //     then assert no phone-shaped value and no >=7-digit run remains anywhere in the doc.
  assert(doc.includes(SANCTIONED_IDENTIFIER), 'sanctioned identifier present (expected) before leak scan');
  // Whitespace-flexible scrub so a line-wrapped occurrence of the label is still removed.
  const scrubbed = doc.replace(/Launch Test Roofing\s+1780434363/g, ' [ROOFER_LABEL] ');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(scrubbed), 'B274 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(scrubbed), 'B274 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(scrubbed), 'B274 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(scrubbed),
    'B274 doc contains no raw UUID-shaped id (no call id / lead id leaked)');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed),
    'B274 doc contains no phone-number-shaped value (clean Vapi number never written; only last-4 0389)');
  // The clean-number last-4 "0389" must only ever appear as a standalone token, never embedded in a
  // longer digit run (which would mean a fuller/full number leaked). Commit short-SHAs are unaffected.
  assert(!/\d0389|0389\d/.test(scrubbed),
    'B274 doc keeps 0389 as a standalone last-4 (no longer digit run containing the clean Vapi number)');
  assert(!/@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(scrubbed), 'B274 doc contains no email address');
  assert(/full_clean_vapi_number_recorded_in_repo\s*=\s*false/.test(doc),
    'B274 doc explicitly records the full clean Vapi number is not in the repo');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B274 doc states the local secret file was not read');
  pass('B274 doc carries no secret/token/raw-id/full-phone/email leakage; only last-4 0389 present; secret file not read');

  // 11. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 274 First Roofer PSTN E2E closeout evidence verified (${passCount} checks).`);
  console.log('build_mode=first_roofer_pstn_e2e_closeout_evidence_repo_only  call_performed_by_build_274=false  first_roofer_pstn_e2e_execution_status=completed_one_call  true_pstn_call_count=1  retry_count=0  clean_vapi_number_last4=0389  assistant_used=Test Roofing Assistant  mapped_roofer_identifier=Launch Test Roofing 1780434363  call_completion_status=observed_via_vapi_record_and_eocr  assistant_answered_status=observed_test_roofing_assistant_used  eocr_to_backend_status=200  mapped_roofer_path_status=attempted_backend_200  mapped_roofer_count=1  mapping_requirement_status=confirmed_repo_only  mapping_code_behavior_preserved=true  lead_persistence_status=inconclusive_or_not_observed  booking_persistence_status=inconclusive_or_not_observed  call_persistence_status=inconclusive_or_not_observed  first_roofer_e2e_result=inconclusive_backend_200_persistence_not_observed  first_roofer_e2e_full_pass_claimed=false  second_call_placed=false  second_call_requested=false  build_273_prerequisite_commit=0cfa8cf  build_272_prerequisite_commit=0930813  build_271_prerequisite_commit=4d36bdf  build_270_prerequisite_commit=1248386  build_268_prerequisite_commit=4c08b5e  no_retry=true  no_second_call=true  no_sms_sent=true  no_homeowner_contact=true  no_real_roofer_contact=true  no_config_deploy_schema_changes=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_env_var_changed=true  no_production_data_export=true  no_secret_printing=true  full_clean_vapi_number_recorded_in_repo=false  roofer_row_written=false  production_connected=false  secret_file_read=false  tracked_files_unchanged=true  next_step=diagnose_backend_200_without_visible_persistence_for_mapped_roofer_no_new_call_unless_separately_approved');
})();
