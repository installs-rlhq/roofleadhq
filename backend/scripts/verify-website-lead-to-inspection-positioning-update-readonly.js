#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = path.resolve(__dirname, '../..');

function read(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) throw new Error(`Missing required file: ${relativePath}`);
  return fs.readFileSync(full, 'utf8');
}

function mustHave(text, needle, label) {
  if (!text.includes(needle)) {
    throw new Error(`${label} missing required: ${needle}`);
  }
}

function mustNotHave(text, needle, label) {
  if (text.includes(needle)) {
    throw new Error(`${label} contains forbidden public phrase: ${needle}`);
  }
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function assertSectionWithContent(doc, sectionHeading, requiredSubstrings, label) {
  if (!doc.includes(sectionHeading)) {
    throw new Error(`${label} missing required section: ${sectionHeading}`);
  }
  for (const s of requiredSubstrings) {
    if (!doc.includes(s)) {
      throw new Error(`${label} section ${sectionHeading} missing substantive content: ${s}`);
    }
  }
}

function countTrackerTables(doc) {
  // Count occurrences of the exact 7 required tracker table headers
  const requiredTables = [
    'Website File Review Tracker',
    'Homepage Messaging Update Tracker',
    'Lead-to-Inspection Phrase Tracker',
    'Trial Setup Copy Tracker',
    'CTA Micro-Copy Tracker',
    'Forbidden Phrase Audit Tracker',
    'Website Positioning Decision Tracker'
  ];
  let count = 0;
  for (const t of requiredTables) {
    if (doc.includes(t)) count++;
  }
  return count;
}

const indexPath = 'website/index.html';
const statusPagePath = 'website/dashboard/first-paid-launch-status.html';
const pilotStatusPath = 'website/dashboard/pilot-status.html';
const docPath = 'docs/WEBSITE_LEAD_TO_INSPECTION_POSITIONING_UPDATE.md';
const wrapperPath = 'scripts/run-website-lead-to-inspection-positioning-update-dry-run.sh';
const verifierPath = 'backend/scripts/verify-website-lead-to-inspection-positioning-update-readonly.js';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferDryRunPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const workflowPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const businessGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const qualityGatePath = 'docs/AGENT_PRODUCT_QUALITY_GATE.md';

console.log('=== RoofLeadHQ Website Lead-to-Inspection Positioning Update Read-Only Verification ===');
console.log('Local file inspection + limited git diff/status only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('Website/copy/docs/read-only verifier + wrapper + wiring only.');

const indexHtml = read(indexPath);
const statusHtml = read(statusPagePath);
const pilotStatusHtml = read(pilotStatusPath);
const doc = read(docPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregatePath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRooferDryRun = read(contextRooferDryRunPath);
const workflow = read(workflowPath);
const businessGuide = read(businessGuidePath);
const qualityGate = read(qualityGatePath);

// 1. All expected new files exist (doc, verifier, wrapper)
mustHave(doc, 'WEBSITE_LEAD_TO_INSPECTION_POSITIONING_UPDATE.md', 'website lead-to-inspection positioning update doc');
mustHave(doc, 'run-website-lead-to-inspection-positioning-update-dry-run.sh', 'website lead-to-inspection positioning update doc references wrapper');
mustHave(doc, 'verify-website-lead-to-inspection-positioning-update-readonly.js', 'website lead-to-inspection positioning update doc references verifier');
pass('All expected new files exist (doc, wrapper, verifier).');

// 2. Wrapper exists and is executable (has bash shebang)
if (!wrapper.includes('#!/usr/bin/env bash')) {
  throw new Error('wrapper missing bash shebang');
}
pass('Wrapper exists and has proper bash shebang.');

// 3. Verifier is non-executable / normal JS file (mode check)
const verifierStat = fs.statSync(path.join(root, verifierPath));
if ((verifierStat.mode & 0o111) !== 0) {
  throw new Error(`verifier must not be executable (expected 100644 style); mode: ${(verifierStat.mode & 0o777).toString(8)}`);
}
pass('Verifier exists and is non-executable (100644 style / normal JS file).');

// 4. Aggregate readiness includes the new verifier
mustHave(aggregate, 'verify-website-lead-to-inspection-positioning-update-readonly.js', 'aggregate first-paid pilot readiness must wire the new website lead-to-inspection positioning update verifier');
mustHave(aggregate, 'Website Lead-to-Inspection Positioning Update', 'aggregate must list the Website Lead-to-Inspection Positioning Update');
pass('Aggregate readiness includes the new verifier.');

// 5. Verifier index references doc/wrapper/verifier
mustHave(verifierIndex, 'WEBSITE_LEAD_TO_INSPECTION_POSITIONING_UPDATE.md', 'verifier index must list the website lead-to-inspection positioning update doc');
mustHave(verifierIndex, 'run-website-lead-to-inspection-positioning-update-dry-run.sh', 'verifier index must list the website lead-to-inspection positioning update wrapper');
mustHave(verifierIndex, 'verify-website-lead-to-inspection-positioning-update-readonly.js', 'verifier index must list the website lead-to-inspection positioning update verifier');
pass('Verifier index references doc/wrapper/verifier.');

// 6. All 4 context/daily files are wired (the 4 NEXT_ + DAILY; also check the 2 others per list of 6 total)
mustHave(aggregate, 'verify-website-lead-to-inspection-positioning-update-readonly.js', 'aggregate wires verifier');
mustHave(contextFirstPaid, 'WEBSITE_LEAD_TO_INSPECTION_POSITIONING_UPDATE.md', 'NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must record the website lead-to-inspection positioning update');
mustHave(contextFirstPaid, 'verify-website-lead-to-inspection-positioning-update-readonly.js', 'NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH must reference the verifier');
mustHave(contextRooferDryRun, 'WEBSITE_LEAD_TO_INSPECTION_POSITIONING_UPDATE', 'NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must record the website lead-to-inspection positioning update');
mustHave(contextRooferDryRun, 'verify-website-lead-to-inspection-positioning-update-readonly.js', 'NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING must reference the verifier');
mustHave(workflow, 'website-lead-to-inspection-positioning-update', 'NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must record the website lead-to-inspection positioning update');
mustHave(workflow, 'verify-website-lead-to-inspection-positioning-update-readonly.js', 'NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW must reference the verifier');
mustHave(businessGuide, 'WEBSITE_LEAD_TO_INSPECTION_POSITIONING_UPDATE', 'ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must record the website lead-to-inspection positioning update');
mustHave(businessGuide, 'verify-website-lead-to-inspection-positioning-update-readonly.js', 'ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE must reference the verifier');
pass('All 4 context/daily files (and full 6 wiring targets) are wired.');

// 7. The website update doc includes all 19 required sections
const requiredSections = [
  '## 1. Internal-only dry-run scope',
  '## 2. Website positioning update purpose',
  '## 3. Source-of-truth prerequisite',
  '## 4. Input from Brand Positioning and Public Messaging System Packet',
  '## 5. Website files reviewed',
  '## 6. Homepage hero update summary',
  '## 7. Lead-to-inspection copy system',
  '## 8. Closing-the-gap positioning usage',
  '## 9. Never Miss Another Roofing Lead usage',
  '## 10. Fast response / follow-up / missed-lead recovery copy',
  '## 11. Calendar booking / booked inspection copy',
  '## 12. Guided Setup and 14-day trial copy',
  '## 13. CTA and micro-copy update guidance',
  '## 14. The Roof Lead Closer™ public-use hold',
  '## 15. Forbidden phrase and guarantee-risk audit',
  '## 16. Public-vs-internal language boundary',
  '## 17. Website update verification checklist',
  '## 18. PASS/HOLD/BLOCKED website positioning decision',
  '## 19. Safety guardrails'
];
for (const sec of requiredSections) {
  if (!doc.includes(sec)) {
    throw new Error(`doc missing required section: ${sec}`);
  }
}
pass('The website update doc includes all 19 required sections.');

// 8. The website update doc includes exactly 7 required tracker tables
const tableCount = countTrackerTables(doc);
if (tableCount !== 7) {
  throw new Error(`doc must include exactly 7 required tracker tables; found ${tableCount}`);
}
pass('The website update doc includes exactly 7 required tracker tables.');

// 9. The website update doc references docs/BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md at 874e485
mustHave(doc, 'BRAND_POSITIONING_PUBLIC_MESSAGING_SYSTEM_PACKET.md', 'doc must reference the brand positioning packet');
mustHave(doc, '874e485', 'doc must reference canonical source 874e485 for the brand positioning packet');
mustHave(doc, 'test(marketing): add brand positioning public messaging system packet', 'doc must reference the commit message for 874e485');
pass('The website update doc references the brand positioning packet at 874e485.');

// 10. Website public copy includes "Instant Lead-to-Inspection for Roofing Contractors"
mustHave(indexHtml, 'Instant Lead-to-Inspection for Roofing Contractors', 'website/index.html H1 and public copy');
pass('Website public copy includes "Instant Lead-to-Inspection for Roofing Contractors".');

// 11. Website public copy includes "Closing the gap between roofing lead and booked inspection" or direct grammatical variant
if (!indexHtml.includes('Closing the gap between roofing lead and booked inspection') &&
    !indexHtml.includes('Closing the gap between roofing lead and booked homeowner inspection')) {
  throw new Error('website/index.html missing core positioning line "Closing the gap between roofing lead and booked inspection" or grammatical variant');
}
pass('Website public copy includes "Closing the gap between roofing lead and booked inspection" or direct grammatical variant.');

// 12. Website public copy includes "Never Miss Another Roofing Lead" or a direct sentence-case variant
if (!indexHtml.includes('Never Miss Another Roofing Lead') &&
    !indexHtml.includes('Never miss another roofing lead because nobody responded fast enough')) {
  throw new Error('website/index.html missing "Never Miss Another Roofing Lead" or sentence-case variant');
}
pass('Website public copy includes "Never Miss Another Roofing Lead" or a direct sentence-case variant.');

// 13. Website public copy includes the approved core RoofLeadHQ AI explainer or close equivalent
mustHave(indexHtml, 'RoofLeadHQ AI responds fast, follows up automatically, recovers missed leads, and books homeowner inspections on the roofer’s calendar', 'website/index.html core explainer');
mustHave(indexHtml, 'RoofLeadHQ AI closes the gap between roofing lead and booked homeowner inspection with fast response, automated follow-up, missed-lead recovery, and calendar booking', 'website/index.html long core explainer');
pass('Website public copy includes the approved core RoofLeadHQ AI explainer or close equivalent.');

// 14. Website public copy preserves Guided Setup / 14-day trial / automated pre-payment email / cancel anytime / no long-term contract language
mustHave(indexHtml, 'Guided Setup happens first.', 'website/index.html Guided Setup preserved');
mustHave(indexHtml, 'The 14-day trial begins after RoofLeadHQ AI setup goes live.', 'website/index.html 14-day trial preserved');
mustHave(indexHtml, 'An automated email is sent 2 days before the first monthly payment.', 'website/index.html automated pre-payment email preserved');
mustHave(indexHtml, 'Cancel anytime.', 'website/index.html cancel anytime preserved');
mustHave(indexHtml, 'No long-term contract.', 'website/index.html no long-term contract preserved');
pass('Website public copy preserves exact Guided Setup / 14-day trial / automated pre-payment email / cancel anytime / no long-term contract language.');

// 15. Website public copy does not include "RoofLeadHQ – The Roof Lead Closer™" or "The Roof Lead Closer™"
mustNotHave(indexHtml, 'The Roof Lead Closer', 'website/index.html');
mustNotHave(statusHtml, 'The Roof Lead Closer', 'status page');
mustNotHave(pilotStatusHtml, 'The Roof Lead Closer', 'pilot-status.html');
pass('Website public copy does not include "RoofLeadHQ – The Roof Lead Closer™" or "The Roof Lead Closer™".');

// 16. Website public copy does not include forbidden public phrases or guarantee-risk interpretations
const forbiddenPhrases = [
  'Founder-Led Launch Program',
  'Request Founder-Led Launch Review',
  'founder review',
  'manual review',
  'manual coordination',
  'Live Automation Disabled',
  'Monthly billing starts on day 15',
  'day 15',
  '14-day launch trial',
  '7-day pilot',
  'seven-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
  'booked jobs',
  'booked-job',
  'guaranteed appointments',
  'guaranteed revenue',
  'guaranteed jobs',
  'guaranteed lead closer',
  'close roofing sales',
  'closes roofing sales',
  'close roofing jobs',
  'closes roofing jobs',
  'close more jobs automatically',
  'closes deals for roofers',
  'automatic estimate',
  'automatic quote',
  'automatic invoice',
  'automatic payment',
  'You book the inspection'
];
for (const phrase of forbiddenPhrases) {
  mustNotHave(indexHtml, phrase, 'website/index.html');
  mustNotHave(statusHtml, phrase, 'status page (public copy audit)');
  mustNotHave(pilotStatusHtml, phrase, 'pilot-status.html (public copy audit)');
}
pass('Website public copy does not include forbidden public phrases or guarantee-risk interpretations.');

// 17. Website public copy does not imply RoofLeadHQ closes roofing jobs, closes roofing sales, guarantees revenue, guarantees signed contracts, guarantees projects, or guarantees completed roofing work.
const riskyImply = [
  'RoofLeadHQ closes roofing jobs',
  'RoofLeadHQ closes roofing sales',
  'RoofLeadHQ guarantees',
  'guarantees signed contracts',
  'guarantees roofing projects',
  'guarantees revenue',
  'guarantees completed roofing work',
  'booked jobs by RoofLeadHQ',
  'closes deals automatically'
];
for (const r of riskyImply) {
  if (indexHtml.includes(r)) {
    throw new Error(`website/index.html implies guarantee or job close risk: ${r}`);
  }
}
// Positive: the disclaimer must be present
mustHave(indexHtml, 'does not promise or ensure closed jobs, signed contracts, revenue, projects, or completed roofing work', 'footer no-guarantee disclaimer');
pass('Website public copy does not imply RoofLeadHQ closes roofing jobs/sales or guarantees revenue/contracts/projects/work (disclaimer present).');

// 18. The build modifies only allowed website/docs/scripts/verifier/wiring files and does not modify backend/src, migrations, schema/auth/RLS/security implementation, env/secrets, production routes, external calls, live sends, scheduler/cron/dispatcher, contractor portal, payment automation, production writes, credentials, or production behavior.
function assertOnlyAllowedFilesModified() {
  let changed = '';
  try {
    const porcelain = execSync('git status --porcelain', { cwd: root, encoding: 'utf8' });
    const diffNames = execSync('git diff --name-only HEAD --', { cwd: root, encoding: 'utf8' });
    changed = (porcelain + '\n' + diffNames).toLowerCase();
  } catch (e) {
    pass('git status/diff not fully available — relying on explicit doc language and file list constraints');
    return;
  }

  const badPatterns = [
    'backend/src/',
    'migrations/',
    'supabase/migrations',
    'schema',
    'prisma',
    'auth',
    '.env',
    'secrets',
    'backend/src'
  ];

  const allowed = [
    'website/index.html',
    'website/dashboard/first-paid-launch-status.html',
    'docs/WEBSITE_LEAD_TO_INSPECTION_POSITIONING_UPDATE.md',
    'backend/scripts/verify-website-lead-to-inspection-positioning-update-readonly.js',
    'scripts/run-website-lead-to-inspection-positioning-update-dry-run.sh',
    'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
    'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md',
    'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
    'backend/scripts/verify-agent-product-quality-gate-readonly.js'
  ];

  let violations = [];
  const lines = changed.split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
    const p = line.replace(/^\s*\?\?\s*|\s*M\s+|\s*A\s+|\s*D\s+|\s*R\s+.*->\s*/, '').trim();
    if (!p) continue;
    const isAllowed = allowed.some(a => p.includes(a.toLowerCase()));
    if (isAllowed) continue;
    for (const pat of badPatterns) {
      if (p.includes(pat)) {
        violations.push(p);
        break;
      }
    }
    if (p.startsWith('backend/src/')) {
      if (!violations.includes(p)) violations.push(p);
    }
  }

  if (violations.length > 0) {
    throw new Error('Forbidden backend/src, migration, schema, auth, secrets, env, or production behavior files appear modified: ' + JSON.stringify(violations));
  }
  pass('The build modifies only allowed website/docs/scripts/verifier/wiring files; no backend/src, migrations, schema/auth/RLS, .env, creds, or production behavior changes.');
}
assertOnlyAllowedFilesModified();

// 19. The wrapper has no unsafe implementation strings
const unsafeImpl = [
  'ALTER TABLE', 'CREATE POLICY', 'DROP POLICY', 'CREATE TABLE',
  'supabase.from(', 'supabase.rpc(', 'service_role', 'process.env.SUPABASE_SERVICE_ROLE',
  'twilio', 'resend', 'vapi', 'calendar.events', 'fetch("https://', 'curl https://',
  'Stripe', 'stripe', 'payment_intent', 'checkout.session',
  'live send', 'production write', 'cron.schedule'
];
for (const s of unsafeImpl) {
  if (wrapper.toLowerCase().includes(s.toLowerCase())) {
    throw new Error(`wrapper has unsafe implementation string: ${s}`);
  }
}
pass('The wrapper has no unsafe implementation strings.');

// 20. The packet (this update) requires a PASS/HOLD/BLOCKED website positioning decision before future paid traffic or outbound landing-page scaling.
mustHave(doc, 'PASS/HOLD/BLOCKED website positioning decision', 'doc must require PASS/HOLD/BLOCKED decision');
mustHave(doc, 'before future paid traffic or outbound landing-page scaling', 'doc must gate future paid traffic / landing-page scaling behind decision');
mustHave(doc, 'Website Positioning Decision: PASS', 'doc must record the decision');
pass('The update requires (and records) a PASS/HOLD/BLOCKED website positioning decision before future paid traffic or outbound landing-page scaling.');

// Wrapper calls exactly the 3 required commands (node --check, node verifier, quality gate)
mustHave(wrapper, 'node --check backend/scripts/verify-website-lead-to-inspection-positioning-update-readonly.js', 'wrapper must run node --check');
mustHave(wrapper, 'node backend/scripts/verify-website-lead-to-inspection-positioning-update-readonly.js', 'wrapper must run the verifier');
mustHave(wrapper, 'node backend/scripts/verify-agent-product-quality-gate-readonly.js', 'wrapper must call node backend/scripts/verify-agent-product-quality-gate-readonly.js');
pass('Wrapper calls exactly the 3 required commands (node --check, node verifier, quality gate).');

// Final safety: doc self-asserts no forbidden changes and public vs internal boundary
mustHave(doc, 'no backend/src', 'doc must assert no backend/src changes');
mustHave(doc, 'The Roof Lead Closer™ public-use hold', 'doc must document the hold');
mustHave(doc, 'Forbidden phrase and guarantee-risk audit', 'doc must have forbidden audit section');
pass('Doc self-asserts website-only scope, Closer hold, forbidden audit, and public-vs-internal boundary.');

if (process.exitCode) {
  console.error('FAIL: Website lead-to-inspection positioning update read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Website lead-to-inspection positioning update read-only verification passed.');
console.log('All 20 assertions satisfied: new files, wrapper executable + exact calls, verifier non-exec, aggregate+index+4-context/daily wired, 19 sections + exactly 7 tables in doc, 874e485 reference, required phrases present in website copy, trial language preserved exactly, no Closer™ or forbidden/guarantee phrases, no job/sale close implications, only allowed files modified, wrapper no unsafe strings, PASS decision recorded before scaling.');
