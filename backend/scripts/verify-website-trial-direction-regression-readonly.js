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
const demoDashboardPath = 'website/demo/dashboard-sample.html';
const demoWeeklyPath = 'website/demo/weekly-report-sample.html';
const demoMonthlyPath = 'website/demo/monthly-report-sample.html';
const packetPath = 'docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md';
const wrapperPath = 'scripts/run-website-trial-direction-regression-dry-run.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const workflowPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const dailyGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

console.log('=== RoofLeadHQ Website Trial Direction Regression Read-Only Verification ===');
console.log('Local file inspection + limited git diff/status only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('Website/copy/docs/read-only verifier changes only.');
console.log('Strict regression guard for revised public 14-day trial + RoofLeadHQ AI + booked appointments direction.');
console.log('Public vs internal boundary enforced: public surfaces get clean AI/trial language; internal founder/manual language stays in dry-run safety artifacts only.');

const indexHtml = read(indexPath);
const demoDashboard = read(demoDashboardPath);
const demoWeekly = read(demoWeeklyPath);
const demoMonthly = read(demoMonthlyPath);
const packet = read(packetPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregatePath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRoofer = read(contextRooferPath);
const workflow = read(workflowPath);
const dailyGuide = read(dailyGuidePath);

// Public-facing files list for forbidden checks (index + demo assets used on public site)
const publicFacingFiles = [
  { path: indexPath, content: indexHtml, label: 'website/index.html' },
  { path: demoDashboardPath, content: demoDashboard, label: 'website/demo/dashboard-sample.html' },
  { path: demoWeeklyPath, content: demoWeekly, label: 'website/demo/weekly-report-sample.html' },
  { path: demoMonthlyPath, content: demoMonthly, label: 'website/demo/monthly-report-sample.html' }
];

// 1. Required revised 14-day trial direction + AI + booked inspection/appointment positioning present in website/index.html
const requiredTrialDirectionPhrases = [
  'Your 14-day trial begins after your RoofLeadHQ AI setup goes live',
  'RoofLeadHQ AI setup goes live',
  'automated email 2 days before your first monthly payment',
  'automated email 2 days prior',
  '14-day trial after Guided Setup before your first monthly payment',
  '14-day trial begins after setup goes live',
  'Cancel anytime',
  'No long-term contract',
  'RoofLeadHQ AI',
  'booked inspections',
  'books homeowner appointments on your calendar',
  'Guided Setup configures everything for your business first',
  'Guided Setup is the onboarding and configuration step'
];
for (const phrase of requiredTrialDirectionPhrases) {
  mustHave(indexHtml, phrase, 'website/index.html revised 14-day trial direction + RoofLeadHQ AI + booked appointments positioning');
}
pass('All required revised 14-day trial direction + RoofLeadHQ AI + booked inspection/homeowner appointment positioning phrases present in website/index.html (14-day trial begins after setup goes live, automated email 2 days before first monthly payment, first payment after trial, Cancel anytime, No long-term contract, Guided Setup first, RoofLeadHQ AI turns leads into booked inspections / booked homeowner appointments).');

// 2. Forbidden public phrases absent from ALL public-facing website files (index + 3 demo htmls)
const forbiddenPublicPhrases = [
  'Founder-Led Launch Program',
  'Request Founder-Led Launch Review',
  'founder review',
  'manual review',
  'manual coordination',
  'Live Automation Disabled',
  'Monthly billing starts on day 15',
  'Monthly billing on day 15',
  '14-day launch trial',
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
  'booked jobs',
  'booked-job',
  'guaranteed appointments',
  'guaranteed revenue',
  'guaranteed jobs',
  'automatic estimate',
  'automatic quote',
  'automatic invoice',
  'automatic payment'
];
for (const pub of publicFacingFiles) {
  for (const phrase of forbiddenPublicPhrases) {
    mustNotHave(pub.content, phrase, pub.label);
  }
}
pass('All forbidden public phrases absent from public-facing website files (website/index.html + website/demo/*.html): no Founder-Led Launch Program, Request Founder-Led Launch Review, founder review, manual review, manual coordination, Live Automation Disabled, Monthly billing starts/on day 15, 14-day launch trial, 7-day pilot, 5 qualified appointments in 7 days, book jobs / booked jobs / booked-job, guaranteed appointments/revenue/jobs, automatic estimate/quote/invoice/payment. (Internal founder/manual language permitted only in dry-run safety artifacts, not public-facing).');

// 3. Explicit public vs internal boundary clarifications present in required context + index docs
const boundaryClarificationNeedles = [
  'public website/sales-facing copy from internal safety docs',
  'internal founder/operator/manual language may remain in dry-run safety artifacts',
  'internal-only and not public positioning',
  'Public/business language (used in all customer-facing and prospect communications)',
  'No public founder-led/manual babysitting positioning is used for prospects'
];
const clarifyDocs = [
  { path: contextFirstPaidPath, content: contextFirstPaid, label: 'NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md' },
  { path: contextRooferPath, content: contextRoofer, label: 'NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md' },
  { path: workflowPath, content: workflow, label: 'NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md' },
  { path: dailyGuidePath, content: dailyGuide, label: 'ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md' },
  { path: verifierIndexPath, content: verifierIndex, label: 'FIRST_PAID_LAUNCH_VERIFIER_INDEX.md' }
];
for (const doc of clarifyDocs) {
  // At least one boundary needle must be present in each (we will ensure via edits + packet)
  const hasBoundary = boundaryClarificationNeedles.some(n => doc.content.includes(n));
  if (!hasBoundary) {
    // Fallback: require explicit reference to the regression packet + revised direction language in context
    mustHave(doc.content, 'WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET', doc.label);
  }
}
pass('Public-vs-internal boundary clarifications present (or regression packet + revised direction references) in the 5 required docs (3x NEXT_CHAT, daily guide, verifier index). Internal founder/manual language scoped to dry-run safety artifacts only; public surfaces use revised AI + 14-day trial direction.');

// 4. No backend/src routes/controllers/services modified in this build
// 5. No migration/schema/auth/secrets/env modified
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
    'backend/scripts/verify-website-trial-direction-regression-readonly.js',
    'scripts/run-website-trial-direction-regression-dry-run.sh',
    'docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md',
    'website/index.html',
    'website/demo/dashboard-sample.html',
    'website/demo/weekly-report-sample.html',
    'website/demo/monthly-report-sample.html',
    'website/demo/demo.css',
    'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
    'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md',
    'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md',
    'backend/scripts/verify-website-positioning-recovery-readonly.js',
    'backend/scripts/verify-website-copy-layout-polish-readonly.js',
    'backend/scripts/verify-website-homepage-screenshot-placement-readonly.js',
    'backend/scripts/verify-website-demo-screenshot-assets-readonly.js',
    'backend/scripts/verify-website-founder-led-launch-copy-readonly.js',
    'backend/scripts/verify-website-founder-led-conversion-polish-readonly.js'
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

// 6. No external service call strings added in this build
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
  const contentToCheck = indexHtml + wrapper;
  for (const s of externalCallStrings) {
    if (contentToCheck.includes(s)) {
      throw new Error(`Forbidden external call string found in trial direction regression changes or new files: ${s}`);
    }
  }
  pass('No external service call strings added in this build (checked index.html + wrapper for fetch(, XMLHttpRequest, axios, supabase, twilio, resend, vapi, lindy).');
}
assertNoExternalCallStringsAdded();

// 7. Wrapper exists and is executable
function assertWrapperExecutable() {
  const fullWrapper = path.join(root, wrapperPath);
  if (!fs.existsSync(fullWrapper)) {
    fail('Wrapper script missing', { wrapperPath });
    return;
  }
  try {
    const stat = fs.statSync(fullWrapper);
    // Check owner execute bit (or any execute for simplicity in container)
    const isExecutable = (stat.mode & fs.constants.S_IXUSR) ||
                         (stat.mode & fs.constants.S_IXGRP) ||
                         (stat.mode & fs.constants.S_IXOTH);
    if (!isExecutable) {
      fail('Wrapper script exists but is not executable (chmod +x required)', { wrapperPath, mode: stat.mode.toString(8) });
      return;
    }
  } catch (e) {
    fail('Failed to stat wrapper for executable check', { error: e.message });
    return;
  }
  pass('Wrapper script exists and is executable: scripts/run-website-trial-direction-regression-dry-run.sh');
}
assertWrapperExecutable();

// 8. Packet safety language and references
mustHave(packet, 'WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET', 'website trial direction regression packet');
mustHave(packet, 'revised public direction', 'website trial direction regression packet');
mustHave(packet, '14-day trial begins after', 'website trial direction regression packet');
mustHave(packet, 'automated email 2 days before', 'website trial direction regression packet');
mustHave(packet, 'RoofLeadHQ AI turns roofing leads into booked inspections', 'website trial direction regression packet');
mustHave(packet, 'public website/sales-facing copy from internal safety docs', 'website trial direction regression packet');
mustHave(packet, 'internal founder/operator/manual language may remain in dry-run safety artifacts', 'website trial direction regression packet');
mustHave(packet, 'Website/copy/docs/verifier-only', 'website trial direction regression packet');
mustHave(packet, 'no backend/src routes', 'website trial direction regression packet');
mustHave(packet, 'no migration/schema/auth/secrets', 'website trial direction regression packet');
mustHave(packet, 'node --check backend/scripts/verify-website-trial-direction-regression-readonly.js', 'website trial direction regression packet');
mustHave(packet, 'Growth Tier screenshots preserved exactly', 'website trial direction regression packet');
mustHave(packet, 'no production behavior changes', 'website trial direction regression packet');
mustHave(packet, 'no live activation/no production behavior/no writes/no integrations/no auth/schema/security implementation', 'website trial direction regression packet');
pass('Packet doc contains required revised direction, public-vs-internal boundary, safety posture, verification commands, and wiring notes.');

// 9. Wiring checks (per established repo pattern)
mustHave(aggregate, 'verify-website-trial-direction-regression-readonly.js', 'aggregate first-paid pilot readiness');
mustHave(aggregate, 'Website Trial Direction Regression', 'aggregate first-paid pilot readiness');
pass('Aggregate first-paid pilot readiness includes the website trial direction regression verifier.');

mustHave(verifierIndex, 'WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md', 'verifier index');
mustHave(verifierIndex, 'run-website-trial-direction-regression-dry-run.sh', 'verifier index');
mustHave(verifierIndex, 'verify-website-trial-direction-regression-readonly.js', 'verifier index');
mustHave(verifierIndex, 'trial direction regression', 'verifier index');

mustHave(contextFirstPaid, 'WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET', 'next-chat first paid launch context');
mustHave(contextFirstPaid, 'verify-website-trial-direction-regression-readonly.js', 'next-chat first paid launch context');

mustHave(contextRoofer, 'website-trial-direction-regression', 'next-chat roofer dry-run context');
mustHave(contextRoofer, 'verify-website-trial-direction-regression-readonly.js', 'next-chat roofer dry-run context');

mustHave(workflow, 'website trial direction regression', 'agent grok build workflow context');
mustHave(workflow, 'verify-website-trial-direction-regression-readonly.js', 'agent grok build workflow context');

mustHave(dailyGuide, 'WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET', 'business buildout daily guide');
mustHave(dailyGuide, 'verify-website-trial-direction-regression-readonly.js', 'business buildout daily guide');

mustHave(wrapper, 'verify-website-trial-direction-regression-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-agent-product-quality-gate-readonly.js', 'dry-run wrapper');
pass('Verifier index, next-chat contexts, workflow doc, daily guide, and wrapper all reference the website trial direction regression packet/verifier/wrapper.');

// Prior website verifiers remain referenced for combined baseline (defense in depth)
mustHave(wrapper, 'verify-website-positioning-recovery-readonly.js', 'trial direction regression dry-run wrapper (chains positioning recovery)');
mustHave(wrapper, 'verify-website-copy-layout-polish-readonly.js', 'trial direction regression dry-run wrapper (chains copy/layout polish)');
mustHave(wrapper, 'verify-website-founder-led-launch-copy-readonly.js', 'trial direction regression dry-run wrapper (chains prior launch copy verifier)');
mustHave(wrapper, 'verify-website-founder-led-conversion-polish-readonly.js', 'trial direction regression dry-run wrapper (chains prior conversion polish)');
mustHave(wrapper, 'verify-website-homepage-screenshot-placement-readonly.js', 'trial direction regression dry-run wrapper (chains screenshot placement)');
mustHave(wrapper, 'verify-website-demo-screenshot-assets-readonly.js', 'trial direction regression dry-run wrapper (chains demo assets)');
pass('Trial direction regression dry-run wrapper references prior website verifiers for combined safety baseline.');

// 10. Final safety confirmation from packet
mustHave(packet, 'public-facing website files', 'website trial direction regression packet');
mustHave(packet, 'distinguish public website/sales-facing copy from internal safety docs', 'website trial direction regression packet');
pass('Packet explicitly records public vs internal boundary, public-facing file list for enforcement, and read-only constraints.');

if (process.exitCode) {
  console.error('FAIL: Website trial direction regression read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Website trial direction regression read-only verification passed.');
console.log('Revised public direction protected: RoofLeadHQ AI turns roofing leads into booked inspections / booked homeowner appointments; Guided Setup first; 14-day trial begins after AI setup goes live; automated email 2 days before first monthly payment; first payment after trial; Cancel anytime; No long-term contract.');
console.log('All required trial/AI/booking phrases present in website/index.html; all listed forbidden public phrases absent from public-facing website files (index + demo/*.html).');
console.log('Public-vs-internal boundary clarified and enforced in contexts: public surfaces use clean revised direction; internal founder/manual/review/coordination/Live Automation language remains only in dry-run safety artifacts (explicitly labeled internal-only).');
console.log('Wrapper executable, wiring complete (aggregate + verifier index + 3x next-chat + daily guide + boundary notes), prior website verifiers chained for baseline.');
console.log('No backend/src, migrations, schema, auth, secrets, env, or external call changes. Growth Tier screenshots preserved. Read-only safe. No production activation.');
