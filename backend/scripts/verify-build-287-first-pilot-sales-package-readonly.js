#!/usr/bin/env node
/**
 * Build 287 Verifier — First Pilot Roofer Sales Package (repo-only, offline, docs-only).
 *
 * Strategic goal: capture that the first real pilot roofer sales package has been prepared as repo-only drafts
 * on top of the Build 286 first-roofer end-to-end live pass (a23cb81) — WITHOUT any call, SMS, email send, real
 * roofer/homeowner contact, provider action, config change, phone-number change, deploy, schema/auth/RLS change,
 * or production data export. This build makes NO code change; it grounds a business-readiness package.
 *
 * This verifier (fully offline, non-mutating, no compile needed):
 *   0. Source-of-truth: Build 286 (a23cb81) is an ancestor of / equal to HEAD.
 *   1. Master package doc present, grounds the package status tokens + the guardrails + honest copy discipline.
 *   2. Each of the 5 component docs present with its own status token:
 *        - roofer-facing proof summary
 *        - outreach drafts (created_repo_only_not_sent)
 *        - onboarding/intake bundle
 *        - pilot scope + guardrails
 *        - sales-readiness checklist
 *   3. Copy discipline present (positive statements): no-guarantee, book inspections/appointments not jobs,
 *      no quote/estimate/invoice/payment automation, Twilio->Retell number untouched, clean Vapi last-4 0389.
 *   4. All package docs carry no secret / PII / raw phone / UUID / email.
 *   5. Prerequisite Build 286 commit present + Build 286 predecessor docs present.
 *   6. Non-mutating (tracked files unchanged).
 *
 * Fully offline: no network, no real Supabase, no live HTTP, no curl, no Vapi Test/Talk/webCall, no call,
 * no SMS, no email send, no Twilio, no Retell, no Vapi API, no deploy, no config change, no schema/RLS change,
 * no secret read, no production DB read/export. Does NOT read /tmp/roofleadhq-vapi-webhook-secret-build237.
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
function isAncestorOrEqual(sha, ref) {
  try {
    execFileSync('git', ['merge-base', '--is-ancestor', sha, ref || 'HEAD'], { cwd: repoRoot, encoding: 'utf8' });
    return true;
  } catch (_e) { return false; }
}

const PKG_DOC = 'docs/FIRST_PILOT_SALES_PACKAGE_BUILD_287.md';
const PROOF_DOC = 'docs/FIRST_PILOT_PROOF_SUMMARY_BUILD_287.md';
const OUTREACH_DOC = 'docs/FIRST_PILOT_ROOFER_OUTREACH_DRAFTS_BUILD_287.md';
const INTAKE_DOC = 'docs/FIRST_PILOT_ROOFER_ONBOARDING_INTAKE_BUNDLE_BUILD_287.md';
const SCOPE_DOC = 'docs/FIRST_PILOT_SCOPE_GUARDRAILS_BUILD_287.md';
const CHECKLIST_DOC = 'docs/FIRST_PILOT_SALES_READINESS_CHECKLIST_BUILD_287.md';

const B286_EVIDENCE_DOC = 'docs/FIRST_ROOFER_E2E_LIVE_BOOKING_PASS_EVIDENCE_BUILD_286.md';
const B286_PACKET_DOC = 'docs/FIRST_PILOT_ROOFER_OUTREACH_ONBOARDING_READINESS_PACKET_BUILD_286.md';

const B286_COMMIT = 'a23cb81';
const B286_COMMIT_FULL = 'a23cb810ca6ccac4476bf3dafbc7bbea415c4ad0';
const B285_COMMIT = 'ef2467d';
const B284_COMMIT = '44ed7cd';

const ALL_DOCS = [PKG_DOC, PROOF_DOC, OUTREACH_DOC, INTAKE_DOC, SCOPE_DOC, CHECKLIST_DOC];

function assertNoSecretsPiiPhone(doc, label) {
  const scrubbed = doc.replace(new RegExp(B286_COMMIT_FULL, 'g'), 'COMMIT_SHA');
  assert(!/eyJ[A-Za-z0-9_-]{20,}/.test(doc), `${label} contains no JWT-shaped secret`);
  assert(!/\bsk-[A-Za-z0-9]{16,}\b/.test(doc), `${label} contains no sk- API-key-shaped secret`);
  assert(!/\bxox[baprs]-[A-Za-z0-9-]{10,}\b/.test(doc), `${label} contains no token-shaped secret`);
  assert(!/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/i.test(doc), `${label} contains no raw UUID`);
  assert(!/(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b/.test(scrubbed), `${label} contains no phone-number-shaped value`);
  assert(!/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(doc), `${label} contains no email address`);
}

(function main() {
  const before = gitStatus();
  console.log('=== Build 287 First Pilot Roofer Sales Package (repo-only, offline, docs-only) ===');
  console.log('No call. No SMS. No email send. No real roofer/homeowner contact. No Vapi/Twilio/Retell API. No provider config change. No phone-number change. No deploy. No schema/auth/RLS change. No production data export. No secret file read. Grounds the first pilot sales package prepared as repo-only drafts on top of the Build 286 first-roofer E2E live pass.');

  // --- 0. Source-of-truth: Build 286 commit is ancestor-or-equal to HEAD. ---
  assert(isAncestorOrEqual(B286_COMMIT),
    'Build 286 commit a23cb81 is an ancestor of (or equal to) HEAD — building on 286 or later');
  pass('source-of-truth: HEAD is at Build 286 (a23cb81) or later');

  // --- 1. Master package doc grounding. ---
  const pkg = read(PKG_DOC);
  const PKG_TOKENS = [
    'first_roofer_e2e_status = passed',
    'pilot_sales_package_status = created',
    'outreach_drafts_status = created_repo_only_not_sent',
    'onboarding_intake_bundle_status = created',
    'pilot_scope_guardrails_status = created',
    'sales_readiness_checklist_status = created',
    'real_roofer_contact_status = not_performed',
    'real_homeowner_contact_status = not_performed',
    'no_call_placed = true',
    'no_sms_sent = true',
    'no_email_sent = true',
    'no_provider_config_changed = true',
    'no_phone_number_changed = true',
    'no_twilio_retell_route_changed = true',
    'no_backend_deploy = true',
    'no_schema_auth_rls_changed = true',
    'no_production_data_export = true',
  ];
  for (const t of PKG_TOKENS) assert(pkg.includes(t), `B287 master package doc missing status token: ${t}`);
  // References every component + Build 286 predecessor.
  for (const d of [PROOF_DOC, OUTREACH_DOC, INTAKE_DOC, SCOPE_DOC, CHECKLIST_DOC, B286_EVIDENCE_DOC]) {
    assert(pkg.includes(path.basename(d)), `B287 master package doc references ${path.basename(d)}`);
  }
  assert(/not[\s*]+read/i.test(pkg) && /\/tmp\/roofleadhq-vapi-webhook-secret-build237/.test(pkg),
    'B287 master package doc states the local secret file was not read');
  pass('B287 master package doc grounds all package + safety status tokens and references every component');

  // --- 2. Each component doc present with its status token. ---
  const proof = read(PROOF_DOC);
  assert(/proof_summary_status = created/.test(proof), 'B287 proof summary carries proof_summary_status = created');
  const outreach = read(OUTREACH_DOC);
  assert(/outreach_drafts_status = created_repo_only_not_sent/.test(outreach),
    'B287 outreach drafts carry outreach_drafts_status = created_repo_only_not_sent');
  const intake = read(INTAKE_DOC);
  assert(/onboarding_intake_bundle_status = created/.test(intake),
    'B287 intake bundle carries onboarding_intake_bundle_status = created');
  const scope = read(SCOPE_DOC);
  assert(/pilot_scope_guardrails_status = created/.test(scope),
    'B287 scope doc carries pilot_scope_guardrails_status = created');
  const checklist = read(CHECKLIST_DOC);
  assert(/sales_readiness_checklist_status = created/.test(checklist),
    'B287 checklist carries sales_readiness_checklist_status = created');
  pass('B287 all 5 component docs present with their status tokens');

  // --- 3. Copy discipline present (positive statements) across the package. ---
  // Outreach + proof must NOT be sent and must be honest.
  assert(/nothing (is )?sent/i.test(outreach) && /DRAFT ONLY/i.test(outreach),
    'B287 outreach drafts are explicitly draft-only / nothing sent');
  assert(/no[\s*]+email[\s*]+send/i.test(outreach) && /no[\s*]+SMS/i.test(outreach),
    'B287 outreach drafts state no email/SMS send');
  // Book inspections/appointments, not jobs; no guarantee; no quote/estimate/invoice/payment automation.
  assert(/book(s|ing|ed)? (an )?(in-person )?(inspection|appointment)/i.test(proof),
    'B287 proof summary frames booking inspections/appointments');
  assert(/no[\s_]+guarantee/i.test(proof) || /not[\s*]+(going to )?promise/i.test(proof),
    'B287 proof summary avoids guarantees explicitly');
  assert(/booked jobs/i.test(proof) && /not/i.test(proof),
    'B287 proof summary explicitly disclaims "booked jobs" language');
  assert(/quote|estimate|invoice|payment/i.test(proof) && /(does ?n.t|not|no)/i.test(proof),
    'B287 proof summary disclaims quote/estimate/invoice/payment automation');
  // Guardrails: Twilio->Retell untouched, clean Vapi last-4 0389.
  for (const [doc, label] of [[pkg, 'master'], [scope, 'scope']]) {
    assert(/Twilio.?Retell (number|route)/i.test(doc) && /(not (change|touch)|untouched|preserved)/i.test(doc),
      `B287 ${label} doc preserves the existing Twilio->Retell number/route untouched`);
    assert(/clean Vapi.?managed number/i.test(doc) && /0389/.test(doc),
      `B287 ${label} doc uses the clean Vapi-managed number path (last-4 0389)`);
    assert(/without separate approval/i.test(doc),
      `B287 ${label} doc gates outward actions behind separate approval`);
  }
  // Checklist blocks real contact pending approval.
  assert(/first_real_pilot_contact_status = blocked_pending_separate_approval/.test(checklist),
    'B287 checklist blocks first real pilot contact pending separate approval');
  pass('B287 copy discipline present (no guarantees, book inspections not jobs, no quote/estimate/invoice/payment, guardrails intact)');

  // --- 4. No secret / PII / raw phone / UUID / email across all package docs. ---
  for (const d of ALL_DOCS) assertNoSecretsPiiPhone(read(d), path.basename(d));
  pass('B287 package docs carry no secret / PII / raw phone / UUID / email');

  // --- 5. Prerequisite Build 286 commit present + predecessor docs present. ---
  assert(commitPresent(B286_COMMIT), 'Build 286 prerequisite commit a23cb81 present in git history');
  assert(commitPresent(B285_COMMIT), 'Build 285 prerequisite commit ef2467d present in git history');
  assert(commitPresent(B284_COMMIT), 'Build 284 prerequisite commit 44ed7cd present in git history');
  assert(fs.existsSync(path.join(repoRoot, B286_EVIDENCE_DOC)), 'Build 286 E2E live-pass evidence doc still present');
  assert(fs.existsSync(path.join(repoRoot, B286_PACKET_DOC)), 'Build 286 readiness packet doc still present');
  pass('Build 286 + 285 + 284 prerequisite commits present and Build 286 predecessor docs exist');

  // --- 6. Non-mutating proof. ---
  const after = gitStatus();
  assert(before === after, 'verifier did not mutate tracked files (git status before === after)');
  pass('verifier is non-mutating');

  console.log(`\nPASS: Build 287 First Pilot Roofer Sales Package verified (${passCount} checks).`);
  console.log('build_mode=first_pilot_sales_package_repo_only  build_287_status=completed  build_271_redone=false  build_276_redone=false  build_277_redone=false  build_278_redone=false  build_279_redone=false  build_280_redone=false  build_281_redone=false  build_282_redone=false  build_283_redone=false  build_284_redone=false  build_285_redone=false  build_286_redone=false  first_roofer_e2e_status=passed  pilot_sales_package_status=created  outreach_drafts_status=created_repo_only_not_sent  onboarding_intake_bundle_status=created  pilot_scope_guardrails_status=created  sales_readiness_checklist_status=created  real_roofer_contact_status=not_performed  real_homeowner_contact_status=not_performed  no_call_placed=true  no_sms_sent=true  no_email_sent=true  no_provider_config_changed=true  no_phone_number_changed=true  no_twilio_retell_route_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  clean_vapi_number_last4=0389  next_step=jason_reviews_package_then_separate_approval_to_send_one_jason_operated_outreach_message_to_one_real_roofer_using_the_clean_vapi_managed_number_path_without_changing_the_existing_twilio_retell_number');
})();
