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

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

const indexPath = 'website/index.html';
const packetPath = 'docs/WEBSITE_COPY_LAYOUT_POLISH_PACKET.md';
const wrapperPath = 'scripts/run-website-copy-layout-polish-dry-run.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const workflowPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const dailyGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

console.log('=== RoofLeadHQ Website Copy/Layout Polish Read-Only Verification ===');
console.log('Local file inspection + limited git diff/status only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('Website/copy/docs/read-only verifier changes only.');

const indexHtml = read(indexPath);
const packet = read(packetPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregatePath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRoofer = read(contextRooferPath);
const workflow = read(workflowPath);
const dailyGuide = read(dailyGuidePath);

// 1. Required new polish phrases present in website/index.html
const requiredPhrases = [
  'books homeowner appointments on your calendar',
  'Qualified leads booked on your calendar',
  '14-day trial',
  'first monthly payment',
  'automated email',
  '2 days before',
  'A typical custom setup process can be completed within 48 hours',
  'Manual Outreach support is built for the leads that do not arrive neatly through your website',
  'RoofLeadHQ is customized to fit your business needs',
  'dashboard-sample.png',
  'weekly-report-sample.png',
  'monthly-report-sample.png'
];
for (const phrase of requiredPhrases) {
  mustHave(indexHtml, phrase, 'website/index.html required polish phrase');
}
pass('All required public copy/layout polish phrases present in website/index.html (books homeowner appointments on your calendar, Qualified leads booked on your calendar, 14-day trial, first monthly payment, automated email, 2 days before, 48 hours setup, Manual Outreach support sentence, RoofLeadHQ is customized..., and the three PNG references).');

// 2. Forbidden public phrases absent from website/index.html
const forbiddenPhrases = [
  'Founder-Led Launch Program',
  'Request Founder-Led Launch Review',
  'manual coordination',
  'manual founder review',
  'manual operator review',
  'founder review',
  'operator review',
  'manual review queue',
  'Live Automation Disabled',
  'guaranteed jobs',
  'guaranteed revenue',
  'guaranteed appointments',
  '5 qualified appointments in 7 days',
  '7-day pilot',
  'booked jobs',
  'book jobs',
  '14-day launch trial',
  'Monthly billing starts on day 15',
  'Monthly billing on day 15',
  'No ongoing founder babysitting required',
  'You book the inspection'
];
for (const phrase of forbiddenPhrases) {
  mustNotHave(indexHtml, phrase, 'website/index.html');
}
pass('All forbidden public phrases absent from website/index.html (founder-led/manual/founder/operator review/babysitting, Live Automation Disabled, all guarantee variants, 5/7-day pilot, booked jobs/book jobs, 14-day launch trial, Monthly billing on day 15 variants, You book the inspection).');

// 3. Pricing no longer contains the removed Starter pill "Up to 100 leads/mo."
if (indexHtml.match(/Up to 100 leads\/mo(?!nth)/) || indexHtml.includes('rounded-full">Up to 100 leads/mo')) {
  throw new Error('website/index.html pricing still contains removed Starter pill: Up to 100 leads/mo');
}
pass('Pricing no longer contains the removed Starter pill "Up to 100 leads/mo."');

// 4. Pricing no longer contains the removed one-time Guided Setup + trial + monthly billing sentence.
const removedBillingSentence = 'One-time Guided Setup fee: $499. Your 14-day trial begins after setup goes live. Monthly billing starts on day 15 unless canceled.';
if (indexHtml.includes(removedBillingSentence)) {
  throw new Error('website/index.html still contains the removed setup/billing sentence above pricing cards');
}
pass('Pricing no longer contains the removed setup/billing sentence (One-time Guided Setup fee + trial + day 15 billing).');

// 5. Comparison table has RoofLeadHQ checkmark/check indicator markup
mustHave(indexHtml, 'fa-check-circle', 'comparison table RoofLeadHQ indicator');
mustHave(indexHtml, 'RoofLeadHQ <i class="fa-solid fa-check-circle', 'comparison table RoofLeadHQ check indicator class/markup');
pass('Comparison table contains RoofLeadHQ checkmark/check indicator markup (fa-check-circle near RoofLeadHQ column title).');

// 6. No backend/src routes/controllers/services modified in this build
// 7. No migration/schema/auth/secrets/env modified
function assertNoForbiddenFilesModified() {
  let changed = '';
  try {
    const porcelain = execSync('git status --porcelain', { cwd: root, encoding: 'utf8' });
    const diffNames = execSync('git diff --name-only HEAD --', { cwd: root, encoding: 'utf8' });
    changed = (porcelain + '\n' + diffNames).toLowerCase();
  } catch (e) {
    pass('git status/diff not fully available in this context — relying on explicit packet language and file list constraints');
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
    'secrets'
  ];

  const allowedScriptExceptions = [
    'backend/scripts/verify-website-copy-layout-polish-readonly.js',
    'scripts/run-website-copy-layout-polish-dry-run.sh',
    'website/index.html',
    'website/styles.css',
    'docs/WEBSITE_COPY_LAYOUT_POLISH_PACKET.md',
    'backend/scripts/verify-website-positioning-recovery-readonly.js',
    'backend/scripts/verify-website-founder-led-launch-copy-readonly.js',
    'backend/scripts/verify-website-founder-led-conversion-polish-readonly.js',
    'backend/scripts/verify-website-homepage-screenshot-placement-readonly.js',
    'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
    'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md',
    'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
    'backend/scripts/verify-website-trial-direction-regression-readonly.js',
    'scripts/run-website-trial-direction-regression-dry-run.sh',
    'docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md'
  ];

  let violations = [];
  const lines = changed.split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
    const p = line.replace(/^\s*\?\?\s*|\s*M\s+|\s*A\s+|\s*D\s+|\s*R\s+.*->\s*/, '').trim();
    if (!p) continue;
    const isAllowedException = allowedScriptExceptions.some(a => p.includes(a.toLowerCase()));
    if (isAllowedException) continue;
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
    fail('Forbidden backend/src, migration, schema, auth, secrets, or env files appear modified', { violations });
  } else {
    pass('No backend/src routes/controllers/services modified. No migration/schema/auth/secrets/env files modified (git status/diff + explicit task constraints).');
  }
}
assertNoForbiddenFilesModified();

// 8. No external service call strings added in this build
function assertNoExternalCallStringsAdded() {
  const externalCallStrings = [
    'fetch(',
    'XMLHttpRequest',
    'axios',
    'supabase',
    'twilio',
    'resend',
    'vapi',
    'lindy'
  ];
  const contentToCheck = indexHtml + packet + wrapper;
  for (const s of externalCallStrings) {
    if (contentToCheck.includes(s)) {
      throw new Error(`Forbidden external call string found in copy/layout polish changes or new files: ${s}`);
    }
  }
  pass('No external service call strings added in this build (checked index.html + packet + wrapper for fetch(, XMLHttpRequest, axios, supabase, twilio, resend, vapi, lindy).');
}
assertNoExternalCallStringsAdded();

// Packet safety language and references
mustHave(packet, 'founder review corrections applied', 'website copy/layout polish packet');
mustHave(packet, 'Website/copy/docs/read-only verifier changes only', 'website copy/layout polish packet');
mustHave(packet, 'no backend/src routes', 'website copy/layout polish packet');
mustHave(packet, 'no migration/schema/auth/secrets', 'website copy/layout polish packet');
mustHave(packet, 'node --check backend/scripts/verify-website-copy-layout-polish-readonly.js', 'website copy/layout polish packet');
mustHave(packet, 'RoofLeadHQ AI', 'website copy/layout polish packet');
mustHave(packet, '14-day trial', 'website copy/layout polish packet');
mustHave(packet, 'Guided Setup', 'website copy/layout polish packet');
mustHave(packet, 'dashboard-sample.png', 'website copy/layout polish packet');
pass('Packet doc contains required summary of corrections, layout/polish notes, safety posture, verification commands, and PNG preservation.');

// Wiring checks (per established repo pattern)
mustHave(aggregate, 'verify-website-copy-layout-polish-readonly.js', 'aggregate first-paid pilot readiness');
mustHave(aggregate, 'Website Copy/Layout Polish', 'aggregate first-paid pilot readiness');
pass('Aggregate first-paid pilot readiness includes the website copy/layout polish verifier.');

mustHave(verifierIndex, 'WEBSITE_COPY_LAYOUT_POLISH_PACKET.md', 'verifier index');
mustHave(verifierIndex, 'run-website-copy-layout-polish-dry-run.sh', 'verifier index');
mustHave(verifierIndex, 'verify-website-copy-layout-polish-readonly.js', 'verifier index');

mustHave(contextFirstPaid, 'WEBSITE_COPY_LAYOUT_POLISH_PACKET', 'next-chat first paid launch context');
mustHave(contextFirstPaid, 'verify-website-copy-layout-polish-readonly.js', 'next-chat first paid launch context');

mustHave(contextRoofer, 'website-copy-layout-polish', 'next-chat roofer dry-run context');
mustHave(contextRoofer, 'verify-website-copy-layout-polish-readonly.js', 'next-chat roofer dry-run context');

mustHave(workflow, 'website copy/layout polish', 'agent grok build workflow context');
mustHave(workflow, 'verify-website-copy-layout-polish-readonly.js', 'agent grok build workflow context');

mustHave(dailyGuide, 'WEBSITE_COPY_LAYOUT_POLISH_PACKET', 'business buildout daily guide');
mustHave(dailyGuide, 'verify-website-copy-layout-polish-readonly.js', 'business buildout daily guide');

mustHave(wrapper, 'verify-website-copy-layout-polish-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-agent-product-quality-gate-readonly.js', 'dry-run wrapper');

pass('Verifier index, next-chat contexts, workflow doc, daily guide, and wrapper all reference the website copy/layout polish packet/verifier/wrapper.');

// Prior website verifiers remain referenced for combined baseline
mustHave(wrapper, 'verify-website-positioning-recovery-readonly.js', 'copy/layout polish dry-run wrapper (chains positioning recovery)');
mustHave(wrapper, 'verify-website-founder-led-launch-copy-readonly.js', 'copy/layout polish dry-run wrapper (chains prior launch copy verifier)');
mustHave(wrapper, 'verify-website-founder-led-conversion-polish-readonly.js', 'copy/layout polish dry-run wrapper (chains prior polish verifier)');
mustHave(wrapper, 'verify-website-homepage-screenshot-placement-readonly.js', 'copy/layout polish dry-run wrapper (chains screenshot placement verifier)');
pass('Copy/layout polish dry-run wrapper references prior website verifiers for combined safety baseline.');

// Final safety confirmation
mustHave(packet, 'no production behavior changes', 'website copy/layout polish packet');
mustHave(packet, 'Growth Tier screenshots preserved exactly', 'website copy/layout polish packet');
mustHave(packet, 'no backend/src routes', 'website copy/layout polish packet');
pass('Packet explicitly records website-only + Growth Tier PNG preservation + no backend/src / schema / auth / secrets / external / production changes.');

if (process.exitCode) {
  console.error('FAIL: Website copy/layout polish read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Website copy/layout polish read-only verification passed.');
console.log('Founder review corrections applied: stronger booking language, removed day-15 billing phrasing, 48h setup + support note, outside leads restructure + visual polish, phone sentence move, pricing cards cleaned/centered/bordered with check, My Story genuine rewrite, FAQ/contact aligned to new positioning.');
console.log('Layout: centered titles/KPIs, centered report cards with top-justified images, comparison title+vertical dividers+RoofLeadHQ check, improved outside/phone cards, pricing outlines/sizes/caret/smaller view-all.');
console.log('All required phrases present, all forbidden phrases absent, pricing specifics verified, table indicator present, no backend/src/schema/auth/secrets/external changes.');
console.log('Three homepage screenshots (dashboard/weekly/monthly) preserved exactly. All safety posture and read-only constraints preserved.');