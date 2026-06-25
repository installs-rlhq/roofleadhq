#!/usr/bin/env node
/**
 * Build 220 Read-Only Verifier (3 of 3) — Sales-Demo Readiness Packet.
 *
 * Read-only. Node built-ins only. Validates the sanitized sales-demo readiness packet contract:
 * demo story, proof bullets, sales positioning, offer, sales next-step line, and the truthful
 * demo-surface status (a real product demo UI does NOT yet exist; no screenshot fabricated). Scans
 * the marketing prose for forbidden guarantee / booked-jobs / estimates-quotes-invoices-payments-
 * deposits language and the artifact for secret / phone / email / raw-SID patterns. No network, no
 * secret access, no SMS, no provider call. Verifying is NOT a send.
 */

const fs = require('fs');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const root = path.resolve(__dirname, '../..');
const FIXTURE_DIR = 'backend/fixtures/native-workflow-demo-roofer';
const packetPath = `${FIXTURE_DIR}/sales-demo-readiness-packet-build-220.json`;
const docPath = 'docs/NATIVE_WORKFLOW_FIXTURE_M2_LIVE_VALIDATION_CLOSEOUT_AND_SALES_DEMO_BUILD_220.md';

let passCount = 0;
function pass(name) { passCount += 1; console.log('PASS: ' + name); }
function fail(message) { console.error('FAIL: ' + message); process.exit(1); }
function fullPath(rel) { return path.join(root, rel); }
function read(rel) {
  const target = fullPath(rel);
  if (!fs.existsSync(target)) fail('missing file: ' + rel);
  return fs.readFileSync(target, 'utf8');
}
function readJson(rel) { return JSON.parse(read(rel)); }

console.log('== Build 220 Sales-Demo Readiness Packet Verification (local-only, no send) ==');

const packet = readJson(packetPath);
const doc = read(docPath);

if (packet.build !== 220) fail('packet build must be 220');
if (packet.source_of_truth_commit !== '8d92939' || packet.verified_build_219_commit !== '2fe42d3') fail('packet must bind to 8d92939 + 2fe42d3');

// Demo story — exact seven required steps, in order.
const requiredStory = [
  'A roof inspection lead comes in.',
  'RoofLeadHQ recognizes and organizes it.',
  'An M1 alert is prepared from native workflow logic and was validated live.',
  'If the lead remains unanswered, an M2 follow-up is prepared from native workflow logic and was validated live.',
  'Open leads can be summarized in a daily recap locally.',
  'Source and routing information remains visible locally.',
  'Homeowner outreach remains blocked pending consent and separate approval.'
];
const story = packet.demo_story || [];
if (!Array.isArray(story) || story.length !== requiredStory.length) fail('demo_story must contain exactly ' + requiredStory.length + ' steps');
for (let i = 0; i < requiredStory.length; i++) { if (story[i] !== requiredStory[i]) fail('demo_story step ' + (i + 1) + ' mismatch: ' + JSON.stringify(story[i])); }
pass('build_220_sales_demo_story_present_and_correct');

// Proof bullets.
const pb = packet.proof_bullets || {};
for (const [k, v] of Object.entries({ local_integrated_scenarios_passed: true, m1_live_exact_copy_proof_passed: true, m2_live_exact_copy_proof_passed: true, no_autonomous_external_automation: true, lindy_safe_pilot_mode: true, no_homeowner_contact: true, no_unrestricted_launch: true })) {
  if (pb[k] !== v) fail('proof_bullets ' + k + ' must be ' + JSON.stringify(v));
}
pass('build_220_sales_demo_proof_bullets_present_and_correct');

// Sales positioning + offer + next-step line.
const sp = packet.sales_positioning || {};
if (sp.positioning_statement !== 'RoofLeadHQ helps roofing contractors respond faster to roof inspection leads and avoid letting open leads sit without follow-up.') fail('positioning_statement mismatch');
if (sp.avoid_guarantee_language !== true || sp.avoid_booked_jobs_claims !== true || sp.avoid_estimates_quotes_invoices_payments_deposits_claims !== true) fail('sales_positioning must record the avoidance flags');
const offer = packet.offer || {};
if (offer.monthly_price_range_usd !== '399-799' || offer.setup_fee_usd !== '499' || offer.trial !== '14-day trial after go-live' || offer.pilot_terms !== 'manual-approval pilot first') fail('offer mismatch');
if (packet.sales_next_step_line !== 'I can test this with your inbound leads under manual approval first.') fail('sales_next_step_line mismatch');
pass('build_220_sales_positioning_offer_and_next_step_line_present_and_correct');

// Truthful demo-surface status (no fabrication).
const ds = packet.demo_surface_status || {};
if (ds.true_product_demo_ui_wired_to_native_workflow_exists !== false) fail('packet must truthfully record that a true product demo UI does NOT yet exist');
if (ds.ui_screenshot_fabricated_in_this_build !== false) fail('packet must record that no UI screenshot was fabricated');
if (typeof ds.next_strategic_build_target !== 'string' || ds.next_strategic_build_target.length === 0) fail('packet must identify the next strategic build target (demo surface)');
pass('build_220_sales_demo_surface_status_truthful_no_fabricated_ui');

// Recommended smallest next steps A-F.
const ns = packet.recommended_smallest_next_steps_to_selling || {};
for (const k of ['A_stop_building_new_sms_proof_unless_a_defect_appears', 'B_create_or_confirm_one_usable_sales_demo_surface_existing_sanitized_ui_or_evidence_report', 'C_prepare_real_roofer_outreach_list', 'D_conduct_sales_conversations_manually', 'E_for_any_real_roofer_pilot_capture_consent_and_run_manual_approval_workflow_only', 'F_do_not_contact_homeowners_until_separate_consent_and_approval_exists']) {
  if (ns[k] !== true) fail('recommended_smallest_next_steps_to_selling ' + k + ' must be true');
}
pass('build_220_sales_demo_recommended_next_steps_present');

// Packet safety attestations.
const psa = packet.packet_safety_attestations || {};
for (const k of ['phone_number_recorded', 'email_address_recorded', 'secret_values_recorded', 'raw_sid_recorded', 'credential_values_recorded', 'production_data_used', 'destination_value_recorded', 'guarantee_language_used', 'booked_jobs_claim_used', 'estimates_quotes_invoices_payments_deposits_claim_used', 'ui_screenshot_fabricated']) {
  if (psa[k] !== false) fail('packet safety attestation must be false: ' + k);
}
if (psa.other_live_automation_remains_disabled !== true) fail('packet other_live_automation_remains_disabled must be true');
if (packet.decision !== 'SALES_DEMO_READINESS_PACKET_READY') fail('packet decision mismatch');
pass('build_220_sales_demo_packet_safety_attestations_correct');

// Forbidden marketing language scan over the customer-facing PROSE only (not attestation keys).
const marketingProse = [
  sp.positioning_statement,
  packet.sales_next_step_line,
  ...(packet.demo_story || [])
].join(' \n ').toLowerCase();
const forbiddenWords = ['guarantee', 'guaranteed', 'booked job', 'booked jobs', 'estimate', 'quote', 'invoice', 'payment', 'deposit'];
for (const w of forbiddenWords) { if (marketingProse.includes(w)) fail('forbidden marketing claim word found in customer-facing prose: ' + w); }
pass('build_220_sales_demo_prose_avoids_guarantee_booked_jobs_estimates_quotes_invoices_payments_deposits');

// Secret / phone / email / raw-SID scan over the packet + doc.
const secretLikePatterns = ['AC0', 'AC1', 'SK0', 'SK1', 'AUTH_TOKEN=', 'auth_token:', 'password', 'Bearer ', 'BEGIN PRIVATE KEY', 'BEGIN RSA'];
const dataArtifactText = [JSON.stringify(packet), doc].join('\n');
for (const needle of secretLikePatterns) { if (dataArtifactText.includes(needle)) fail('possible secret value pattern found: ' + needle); }
if (/\b(?:AC|SM|MM|SK)[0-9a-fA-F]{32}\b/.test(dataArtifactText)) fail('a Twilio-SID-shaped token appears in artifacts');
if (/(?<![0-9a-fA-F])[0-9a-fA-F]{32}(?![0-9a-fA-F])/.test(dataArtifactText)) fail('a standalone 32-hex-char run (secret-shaped) appears in artifacts');
if (/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(dataArtifactText)) fail('an email-address-shaped value appears in artifacts');
// Note: offer fields (399-799, 499) are hyphen-separated 3-digit values; no 10-15 digit run appears.
if (/(?<!\d)\+?\d{10,15}(?!\d)/.test(dataArtifactText.replace(/"(?:build)"\s*:\s*\d+/g, ''))) fail('a phone-number-shaped digit run appears in artifacts');
pass('build_220_no_secret_values_phone_numbers_email_addresses_or_raw_sids_in_sales_demo_packet');

const status = buildStatus();
if (status.summary !== 'demo_ready_with_live_automation_disabled') fail('pilot readiness summary changed: ' + status.summary);
for (const [k, v] of Object.entries(status.live_automation)) { if (v !== false) fail('pilot readiness live_automation must be false: ' + k); }
pass('build_220_demo_ready_with_live_automation_disabled_preserved');

console.log('PASS: Build 220 sales-demo readiness packet is sanitized and immediately usable: demo story, proof bullets,');
console.log('      sales positioning, offer ($399-$799/mo + $499 setup, 14-day trial, manual-approval pilot first), and');
console.log('      sales next-step line. A true product demo UI does NOT yet exist (next strategic build target); no UI');
console.log('      screenshot was fabricated. No guarantee/booked-jobs/estimates language; no secrets/phones/emails/SIDs.');
console.log('PASS: Build 220 sales-demo readiness verifier passed (' + passCount + ' assertions).');
