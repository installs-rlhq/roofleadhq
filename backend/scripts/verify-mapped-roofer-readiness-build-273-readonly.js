#!/usr/bin/env node
/**
 * Build 273 Verifier — Mapped Roofer Readiness: Runtime Mapping Evidence Captured
 * (repo-only, read-only, offline).
 *
 * Build 272 stopped safely because the runtime mapping (set one roofers.twilio_number == the clean
 * Vapi-managed Test Number) required private values the agent could not safely obtain. Jason then
 * performed that mapping out-of-band via a single Supabase row update and reported the result in
 * masked form only. Build 273 captures that completed-mapping evidence, confirms the Build 272
 * blocker is cleared, and stages the first-roofer PSTN E2E test for a SEPARATE single-call approval.
 *
 * This verifier checks REPO EVIDENCE ONLY. It does not connect to production, Supabase, Vapi, Twilio,
 * Retell, or any provider; it performs no write; it reads no secret; it prints no full phone number.
 * It asserts the doc records the cleared blocker, the masked mapping evidence, the readiness
 * determination, the separate-approval next step, the full status block, and that no runtime/config/
 * provider/deploy/secret action occurred and the full clean Vapi number is absent. Non-mutating.
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

const DOC = 'docs/MAPPED_ROOFER_READINESS_BUILD_273.md';
const SERVICE_SRC = 'backend/src/services/vapi-webhook.service.ts';
const B272_DOC = 'docs/CONTROLLED_ROOFER_RUNTIME_MAPPING_BUILD_272.md';
const B271_DOC = 'docs/FIRST_ROOFER_TEST_WIRING_BUILD_271.md';
const B271_VERIFIER = 'backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js';

const B272_COMMIT = '0930813';
const B271_COMMIT = '4d36bdf';
const B270_COMMIT = '1248386';
const B268_COMMIT = '4c08b5e';

// The single sanctioned long-digit token in the doc — Jason's mapped roofer label, not a phone number.
const SANCTIONED_IDENTIFIER = 'Launch Test Roofing 1780434363';

(function main() {
  const before = gitStatus();
  console.log('=== Build 273 Mapped Roofer Readiness — runtime mapping evidence captured (repo-only) ===');
  console.log('No production connection. No Supabase/Vapi/Twilio/Retell call. No roofer row written. No live call. No SMS. No deploy. No config change. No secret read/printed. No full phone number. Read-only, non-mutating.');

  const doc = read(DOC);

  // 1. Doc exists + decision token + evidence-only build mode + no runtime action by this build.
  assert(doc.includes('RUNTIME_MAPPING_BLOCKER_FROM_BUILD_272_CLEARED_BY_MANUAL_SUPABASE_UPDATE'),
    'B273 doc carries the cleared-blocker decision token');
  assert(/build_mode\s*=\s*mapped_roofer_readiness_evidence_repo_only/.test(doc),
    'B273 doc records the evidence-only repo-only build mode');
  assert(/runtime_update_performed_by_build_273\s*=\s*false/.test(doc),
    'B273 doc records no runtime update performed by this build');
  assert(/runtime_update_performed_out_of_band_by_jason\s*=\s*true/.test(doc),
    'B273 doc records the mapping was performed out-of-band by Jason');
  pass('B273 doc exists, carries the cleared-blocker token, and records mapping done out-of-band (not by this build)');

  // 2. Build 272 blocker cleared.
  assert(/build_272_runtime_mapping_blocker_status\s*=\s*cleared/.test(doc),
    'B273 doc records the Build 272 runtime mapping blocker cleared');
  assert(/runtime_mapping_blocker_from_build_272\s*=\s*cleared_by_manual_supabase_update/.test(doc),
    'B273 doc records the blocker was cleared by the manual Supabase update');
  pass('B273 doc records the Build 272 runtime mapping blocker is cleared by the manual Supabase update');

  // 3. Mapping requirement re-grounded against real service source (single-field equality, unchanged).
  const service = read(SERVICE_SRC);
  assert(/\.eq\('twilio_number',\s*normalized\.roofer_destination_number\)/.test(service),
    'service still maps roofer via roofers.twilio_number == normalized destination (Build 271 invariant intact)');
  assert(/roofers\.twilio_number\s*==\s*<normalized clean Vapi EOCR destination \(E\.164\)>/.test(doc),
    'B273 doc states the exact single-field mapping requirement');
  assert(/mapping_requirement_status\s*=\s*confirmed_repo_only/.test(doc) &&
    /mapping_code_behavior_preserved\s*=\s*true/.test(doc),
    'B273 doc records the mapping requirement confirmed and code behavior preserved');
  pass('B273 doc re-grounds the mapping requirement against real service source and preserves 268/271 behavior');

  // 4. Masked runtime mapping evidence captured.
  assert(doc.includes('mapped_roofer_identifier = ' + SANCTIONED_IDENTIFIER),
    'B273 doc records the mapped roofer identifier (Launch Test Roofing 1780434363)');
  assert(/clean_vapi_number_last4\s*=\s*0389/.test(doc),
    'B273 doc records the clean Vapi number last-4 = 0389 (masked)');
  assert(/mapped_roofer_count\s*=\s*1/.test(doc),
    'B273 doc records exactly one mapped roofer row (mapped_roofer_count=1)');
  assert(/vapi_test_number_assigned_to_test_roofing_assistant\s*=\s*confirmed_by_jason/.test(doc),
    'B273 doc records the Vapi Test Number assigned to Test Roofing Assistant (confirmed by Jason)');
  assert(/clean_vapi_number_assignment_status\s*=\s*confirmed_by_jason/.test(doc),
    'B273 doc records clean Vapi number assignment status confirmed by Jason');
  pass('B273 doc captures the masked runtime mapping evidence (identifier, last4 0389, count 1, assignment confirmed)');

  // 5. Readiness determination + separate-approval next step, route untouched, E2E NOT approved.
  assert(/mapped_clean_vapi_eocr_path_status\s*=\s*ready_for_separate_single_call_approval/.test(doc),
    'B273 doc records the mapped clean-Vapi EOCR path ready for separate single-call approval');
  assert(/first_roofer_e2e_test_readiness\s*=\s*ready_for_separate_single_call_approval/.test(doc),
    'B273 doc records first-roofer E2E readiness = ready_for_separate_single_call_approval');
  assert(/first_roofer_e2e_test_approval_status\s*=\s*not_approved/.test(doc),
    'B273 doc records first-roofer E2E approval status = not_approved');
  assert(/next_step\s*=\s*request_separate_approval_for_exactly_one_controlled_pstn_first_roofer_e2e_test/.test(doc),
    'B273 doc records the separate-approval next step');
  assert(/existing Twilio\s*→?\s*Retell route[\s\S]*?(untouched|preserved untouched)/i.test(doc),
    'B273 doc keeps the existing Twilio -> Retell route untouched');
  assert(/does not approve or place that call|First PSTN E2E test still NOT approved/i.test(doc),
    'B273 doc states it does not approve/place the first PSTN E2E test call');
  pass('B273 doc records readiness for a SEPARATE single-call approval, route untouched, E2E not approved');

  // 6. Full expected status block present with the readiness values.
  const STATUS = [
    'build_272_runtime_mapping_blocker_status = cleared',
    'mapped_roofer_count = 1',
    'mapped_roofer_identifier = Launch Test Roofing 1780434363',
    'clean_vapi_number_last4 = 0389',
    'clean_vapi_number_assignment_status = confirmed_by_jason',
    'vapi_test_number_assigned_to_test_roofing_assistant = confirmed_by_jason',
    'mapped_clean_vapi_eocr_path_status = ready_for_separate_single_call_approval',
    'first_roofer_e2e_test_readiness = ready_for_separate_single_call_approval',
    'first_roofer_e2e_test_approval_status = not_approved',
    'no_call_placed = true',
    'no_sms_sent = true',
    'no_homeowner_contact = true',
    'no_roofer_contact = true',
    'no_twilio_config_changed = true',
    'no_retell_config_changed = true',
    'no_vapi_config_changed = true',
    'no_railway_config_changed = true',
    'no_backend_deploy = true',
    'no_schema_auth_rls_changed = true',
    'no_secret_printing = true',
    'full_clean_vapi_number_recorded_in_repo = false',
  ];
  for (const s of STATUS) assert(doc.includes(s), `B273 doc missing status line: ${s}`);
  pass('B273 doc contains the full expected status block (blocker cleared, count 1, readiness, E2E not approved, all no_* invariants)');

  // 7. Prerequisite commits present + predecessor artifacts exist.
  assert(commitPresent(B272_COMMIT), 'Build 272 prerequisite commit 0930813 present in git history');
  assert(commitPresent(B271_COMMIT), 'Build 271 prerequisite commit 4d36bdf present in git history');
  assert(commitPresent(B270_COMMIT), 'Build 270 prerequisite commit 1248386 present in git history');
  assert(commitPresent(B268_COMMIT), 'Build 268 prerequisite commit 4c08b5e present in git history');
  assert(fs.existsSync(path.join(repoRoot, B272_DOC)), 'Build 272 doc exists (blocker this build clears)');
  assert(fs.existsSync(path.join(repoRoot, B271_DOC)) && fs.existsSync(path.join(repoRoot, B271_VERIFIER)),
    'Build 271 doc + verifier exist (fixture-proven persistence this build builds on)');
  assert(/build_272_prerequisite_commit\s*=\s*0930813/.test(doc), 'B273 doc records the Build 272 prerequisite commit');
  pass('Build 272/271/270/268 prerequisite commits present and predecessor artifacts exist');

  // 8. No secret / token / raw-id / full-phone-number leakage in the doc.
  //    Strip the single sanctioned roofer-identifier token first (Jason's label, not a phone number),
  //    then assert no phone-shaped value and no >=7-digit run remains anywhere in the doc.
  assert(doc.includes(SANCTIONED_IDENTIFIER), 'sanctioned identifier present (expected) before leak scan');
  // Whitespace-flexible scrub so a line-wrapped occurrence of the label is still removed.
  const scrubbed = doc.replace(/Launch Test Roofing\s+1780434363/g, ' [ROOFER_LABEL] ');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(scrubbed), 'B273 doc contains no JWT-shaped secret');
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(scrubbed), 'B273 doc contains no sk- API-key-shaped secret');
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(scrubbed), 'B273 doc contains no token-shaped secret');
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(scrubbed),
    'B273 doc contains no raw UUID-shaped id');
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed),
    'B273 doc contains no phone-number-shaped value (clean Vapi number never written; only last-4 0389)');
  // The clean-number last-4 "0389" must only ever appear as a standalone token, never embedded in a
  // longer digit run (which would mean a fuller/full number leaked). Commit short-SHAs are unaffected.
  assert(!/\d0389|0389\d/.test(scrubbed),
    'B273 doc keeps 0389 as a standalone last-4 (no longer digit run containing the clean Vapi number)');
  assert(/full_clean_vapi_number_recorded_in_repo\s*=\s*false/.test(doc),
    'B273 doc explicitly records the full clean Vapi number is not in the repo');
  assert(/\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(doc) && /not[- ]read/i.test(doc),
    'B273 doc states the local secret file was not read');
  pass('B273 doc carries no secret/token/raw-id/full-phone leakage; only last-4 0389 present; secret file not read');

  // 9. Non-mutating proof.
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate the repo (git status before === after)');
  pass('verifier is read-only and non-mutating (before/after git status equal)');

  console.log(`\nPASS: Build 273 Mapped Roofer Readiness runtime-mapping evidence verified (${passCount} checks).`);
  console.log('build_mode=mapped_roofer_readiness_evidence_repo_only  runtime_update_performed_by_build_273=false  build_272_runtime_mapping_blocker_status=cleared  runtime_mapping_blocker_from_build_272=cleared_by_manual_supabase_update  mapped_roofer_count=1  mapped_roofer_identifier=Launch Test Roofing 1780434363  clean_vapi_number_last4=0389  clean_vapi_number_assignment_status=confirmed_by_jason  vapi_test_number_assigned_to_test_roofing_assistant=confirmed_by_jason  mapped_clean_vapi_eocr_path_status=ready_for_separate_single_call_approval  first_roofer_e2e_test_readiness=ready_for_separate_single_call_approval  first_roofer_e2e_test_approval_status=not_approved  mapping_requirement_status=confirmed_repo_only  mapping_code_behavior_preserved=true  build_272_prerequisite_commit=0930813  build_271_prerequisite_commit=4d36bdf  build_270_prerequisite_commit=1248386  build_268_prerequisite_commit=4c08b5e  no_call_placed=true  no_sms_sent=true  no_homeowner_contact=true  no_roofer_contact=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_vapi_config_changed=true  no_railway_config_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_secret_printing=true  full_clean_vapi_number_recorded_in_repo=false  roofer_row_written=false  production_connected=false  secret_file_read=false  tracked_files_unchanged=true');
})();
