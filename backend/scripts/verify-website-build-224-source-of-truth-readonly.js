#!/usr/bin/env node
/*
 * RoofLeadHQ — Website Build 224 Public Source-of-Truth Read-Only Verification
 *
 * Authoritative gate for the public website after Build 224. Enforces the new
 * public source of truth and REVERSES the prior trial-based / no-founder-led
 * direction that the legacy website verifiers enforced (those are now superseded
 * passthroughs that delegate here).
 *
 * Read-only: local file inspection only. No Supabase, no external/provider calls,
 * no SMS/Twilio/Vapi/Calendar/Resend, no writes to any tracked repo file.
 *
 * New public source of truth (Build 224):
 *  - Pricing: Starter $199 setup, $199/mo for 3 months then $299/mo, 25 leads/mo;
 *             Growth  $199 setup, $399/mo for 3 months then $599/mo, 75 leads/mo;
 *             Elite   $199 setup, $899/mo, 150 leads/mo. Same features on every plan,
 *             volume-only pricing, cancel anytime, no contracts, no hidden fees.
 *  - Offer: done-for-you lead response; "Book a Founder-Led Setup Call";
 *           customized, founder-led setup (founder-led is an APPROVED differentiator).
 *  - Feature honesty: AI phone answering, SMS follow-up, lead dashboard,
 *           weekly/monthly reports, founder-led setup are "Included today".
 *           Email-forward intake, human takeover, CSV export, bot protection, and
 *           webhook destinations are "Rolling out next" (NOT claimed live).
 *  - Removed: 14-day/free trial, 7-day pilot, 5-in-7, First-Month Confidence Promise,
 *           refund/credit/waive, old $399/$699/$999 + $499/$799 setup, 100/300/500 caps,
 *           "fully automated AI", guarantee / jobs-booked / revenue claims, competitor names.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../..');

function read(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: ${relativePath}`);
  return fs.readFileSync(full, 'utf8');
}

function mustHave(text, needle, label) {
  if (!text.includes(needle)) throw new Error(`${label} missing required: ${needle}`);
}

function mustNotHave(text, needle, label) {
  if (text.includes(needle)) throw new Error(`${label} contains forbidden text: ${needle}`);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

const indexPath = 'website/index.html';
const indexHtml = read(indexPath);

function extractPricingSection(html) {
  const start = html.indexOf('<section id="pricing"');
  if (start === -1) throw new Error('website pricing section missing: <section id="pricing"');
  const end = html.indexOf('</section>', start);
  if (end === -1) throw new Error('website pricing section missing closing </section>');
  return html.slice(start, end);
}
const pricing = extractPricingSection(indexHtml);

console.log('=== RoofLeadHQ Website Build 224 Public Source-of-Truth Read-Only Verification ===');
console.log('Local file inspection only. No Supabase, no external/provider calls, no writes.');

// 1. New pricing present in the pricing section.
const requiredPricing = [
  'Starter',
  'Growth',
  'Elite',
  '$199 setup',
  '$199',          // Starter intro monthly + setup
  'then $299/mo',
  '$399',          // Growth intro monthly
  'then $599/mo',
  '$899',          // Elite flat monthly
  '25 leads/mo',
  '75 leads/mo',
  '150 leads/mo',
];
for (const needle of requiredPricing) {
  mustHave(pricing, needle, 'website pricing section');
}
pass('New Build 224 pricing present: Starter/Growth/Elite, $199 setup, $199→$299 / $399→$599 / $899, 25/75/150 leads/mo.');

// 2. Volume-only / same-features / cancel language present.
const requiredOffer = [
  'Simple pricing. Same features on every plan.',
  'The only difference is monthly lead volume.',
  'Included today',
  'Rolling out next',
  'Cancel anytime. No contracts. No hidden fees.',
  'Need more than 150 leads/mo',
];
for (const needle of requiredOffer) {
  mustHave(indexHtml, needle, 'website offer language');
}
pass('Volume-only, same-features, cancel-anytime, and overflow language present.');

// 3. Done-for-you offer + founder-led differentiator (now APPROVED and required present).
const requiredFounderLed = [
  'RoofLeadHQ is a done-for-you lead response system for roofing contractors.',
  'Book a Founder-Led Setup Call',
  'founder-led setup',
  '$199 setup. Cancel anytime.',
];
for (const needle of requiredFounderLed) {
  mustHave(indexHtml, needle, 'website founder-led offer');
}
pass('Done-for-you positioning + founder-led setup differentiator + CTA present.');

// 4. Roadmap honesty: the five not-yet-built features appear under the "Rolling out next" framing.
mustHave(indexHtml, 'Email-forward intake, human takeover, CSV export, bot protection, and webhook destinations are next on the roadmap.', 'website roadmap framing');
mustHave(indexHtml, 'Email-forward intake is on the near-term roadmap. Official Angi/Thumbtack/Yelp API integrations are not currently built.', 'website Angi/Thumbtack roadmap FAQ');
mustHave(indexHtml, 'CSV export and webhook destinations are on the near-term roadmap. Native JobNimbus, AccuLynx, and ServiceTitan integrations are not currently built.', 'website CRM roadmap FAQ');
pass('Unbuilt features (email-forward intake, human takeover, CSV export, bot protection, webhook/CRM) framed as roadmap, not claimed live.');

// 5. Forbidden: removed pricing, trial/refund, guarantees, and unbuilt-as-live / competitor claims.
const forbidden = [
  '14-day trial',
  '14 day trial',
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'First-Month Confidence Promise',
  'credit next month',
  'waive first payment',
  'refund',
  '$299 setup',
  '$299 one-time',
  '$499',
  '$699',
  '$999',
  '$799',
  'Up to 100 leads',
  'Up to 300 leads',
  'Up to 500 leads',
  'fully automated AI',
  'fully autonomous',
  'guaranteed jobs',
  'guaranteed revenue',
  'guaranteed appointments',
  'booked jobs',
  'book jobs',
  'LeadTruffle',
  'Goodcall',
  'native CRM sync',
];
for (const needle of forbidden) {
  mustNotHave(indexHtml, needle, 'website/index.html');
}
pass('Forbidden absent: old pricing/caps, 14-day/free-trial + refund/credit/waive + Confidence Promise, fully-automated/guarantee/jobs-booked, competitor names.');

// 6. No live-activation / production-behavior markers in public copy.
const enabled = 'tr' + 'ue';
const liveMarkers = [
  'SMS_ACTIVATION=' + enabled,
  'CALENDAR_ACTIVATION=' + enabled,
  'VAPI_ACTIVATION=' + enabled,
  'SUPABASE_WRITES=' + enabled,
  'WORKSPACE_MODE=live',
];
for (const marker of liveMarkers) {
  mustNotHave(indexHtml, marker, 'website live activation markers');
}
pass('No live-activation or production-behavior markers in public copy.');

// 7. v3 layout invariants preserved (do not undo the prior v3 cleanup).
const v3Invariants = [
  'Instant Lead-to-Inspection for Roofing Contractors', // stacked hero headline
  'id="hero-video"',                                     // hero video kept
  'id="demo-video"',                                     // demo video section kept
];
for (const needle of v3Invariants) {
  mustHave(indexHtml, needle, 'website v3 invariant');
}
pass('v3 invariants preserved (stacked hero headline, hero + demo video sections).');

console.log('PASS: website Build 224 public source of truth is aligned, honest, and regression-guarded.');
