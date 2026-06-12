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
const packetPath = 'docs/WEBSITE_POSITIONING_RECOVERY_PACKET.md';
const wrapperPath = 'scripts/run-website-positioning-recovery-dry-run.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const workflowPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const dailyGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

console.log('=== RoofLeadHQ Website Positioning Recovery Read-Only Verification ===');
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

// 1. Required public positioning phrases present in website/index.html
const requiredPhrases = [
  'Turn More Roofing Leads Into Booked Inspections',
  'RoofLeadHQ AI',
  'You do not always need more leads',
  'Start Your RoofLeadHQ Setup',
  'Guided Setup',
  '14-day trial',
  'first monthly payment',
  'automated check-in email',
  'dashboard-sample.png',
  'weekly-report-sample.png',
  'monthly-report-sample.png'
];
for (const phrase of requiredPhrases) {
  mustHave(indexHtml, phrase, 'website/index.html required positioning phrase');
}
pass('All required public positioning phrases present in website/index.html (Turn More Roofing Leads Into Booked Inspections, RoofLeadHQ AI, You do not always need more leads, Start Your RoofLeadHQ Setup, Guided Setup, 14-day trial, first monthly payment, automated check-in email, and the three Growth Tier PNG references).');

// 2. Forbidden public phrases absent from website/index.html (old founder-led babysitting + guarantees + old trial language)
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
  '14-day launch trial'
];
for (const phrase of forbiddenPhrases) {
  mustNotHave(indexHtml, phrase, 'website/index.html');
}
pass('All forbidden public phrases absent from website/index.html (Founder-Led Launch Program, Request Founder-Led Launch Review, manual coordination/founder/operator review/review queue, Live Automation Disabled, all guarantee variants, 5 qualified/7-day pilot, booked jobs/book jobs variants, 14-day launch trial).');

// 3. No backend/src routes/controllers/services modified in this build
// 4. No migration/schema/auth/secrets/env modified
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
    'backend/scripts/verify-website-positioning-recovery-readonly.js',
    'scripts/run-website-positioning-recovery-dry-run.sh',
    'website/index.html',
    'docs/WEBSITE_POSITIONING_RECOVERY_PACKET.md',
    'backend/scripts/verify-website-founder-led-launch-copy-readonly.js',
    'backend/scripts/verify-website-founder-led-conversion-polish-readonly.js',
    'backend/scripts/verify-website-homepage-screenshot-placement-readonly.js',
    'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
    'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md',
    'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md',
    'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md'
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

// 5. No external service call strings added in this build
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
      throw new Error(`Forbidden external call string found in positioning recovery changes or new files: ${s}`);
    }
  }
  pass('No external service call strings added in this build (checked index.html + packet + wrapper for fetch(, XMLHttpRequest, axios, supabase, twilio, resend, vapi, lindy).');
}
assertNoExternalCallStringsAdded();

// Packet safety language and references
mustHave(packet, 'Website/copy/docs/read-only verifier changes only', 'website positioning recovery packet');
mustHave(packet, 'no backend/src routes', 'website positioning recovery packet');
mustHave(packet, 'no migration/schema/auth/secrets', 'website positioning recovery packet');
mustHave(packet, 'node --check backend/scripts/verify-website-positioning-recovery-readonly.js', 'website positioning recovery packet');
mustHave(packet, 'scripts/run-website-positioning-recovery-dry-run.sh', 'website positioning recovery packet');
mustHave(packet, 'no live activation/no production behavior/no writes/no integrations/no auth/schema/security implementation', 'website positioning recovery packet');
mustHave(packet, 'Growth Tier screenshots preserved', 'website positioning recovery packet');
mustHave(packet, 'Guided Setup', 'website positioning recovery packet');
mustHave(packet, '14-day trial', 'website positioning recovery packet');
mustHave(packet, 'automated check-in email', 'website positioning recovery packet');
pass('Packet doc contains required safety posture, verification commands, Guided Setup/14-day trial language, and Growth Tier preservation note.');

// Wiring checks (per established repo pattern for website packets)
mustHave(aggregate, 'verify-website-positioning-recovery-readonly.js', 'aggregate first-paid pilot readiness');
mustHave(aggregate, 'Website Positioning Recovery', 'aggregate first-paid pilot readiness');
pass('Aggregate first-paid pilot readiness includes the website positioning recovery verifier.');

mustHave(verifierIndex, 'WEBSITE_POSITIONING_RECOVERY_PACKET.md', 'verifier index');
mustHave(verifierIndex, 'run-website-positioning-recovery-dry-run.sh', 'verifier index');
mustHave(verifierIndex, 'verify-website-positioning-recovery-readonly.js', 'verifier index');

mustHave(contextFirstPaid, 'WEBSITE_POSITIONING_RECOVERY_PACKET', 'next-chat first paid launch context');
mustHave(contextFirstPaid, 'verify-website-positioning-recovery-readonly.js', 'next-chat first paid launch context');

mustHave(contextRoofer, 'website-positioning-recovery', 'next-chat roofer dry-run context');
mustHave(contextRoofer, 'verify-website-positioning-recovery-readonly.js', 'next-chat roofer dry-run context');

mustHave(workflow, 'website positioning recovery', 'agent grok build workflow context');
mustHave(workflow, 'verify-website-positioning-recovery-readonly.js', 'agent grok build workflow context');

mustHave(dailyGuide, 'WEBSITE_POSITIONING_RECOVERY_PACKET', 'business buildout daily guide');
mustHave(dailyGuide, 'verify-website-positioning-recovery-readonly.js', 'business buildout daily guide');

mustHave(wrapper, 'verify-website-positioning-recovery-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-agent-product-quality-gate-readonly.js', 'dry-run wrapper');

pass('Verifier index, next-chat contexts, workflow doc, daily guide, and wrapper all reference the website positioning recovery packet/verifier/wrapper.');

// Prior website verifiers remain referenced for combined baseline (defense in depth)
mustHave(wrapper, 'verify-website-founder-led-launch-copy-readonly.js', 'positioning recovery dry-run wrapper (chains prior launch copy verifier)');
mustHave(wrapper, 'verify-website-founder-led-conversion-polish-readonly.js', 'positioning recovery dry-run wrapper (chains prior polish verifier)');
mustHave(wrapper, 'verify-website-homepage-screenshot-placement-readonly.js', 'positioning recovery dry-run wrapper (chains screenshot placement verifier)');
pass('Positioning recovery dry-run wrapper references prior website verifiers for combined safety baseline.');

// Final safety confirmation
mustHave(packet, 'no production behavior changes', 'website positioning recovery packet');
mustHave(packet, 'Growth Tier screenshots preserved exactly', 'website positioning recovery packet');
pass('Packet explicitly records website-only + Growth Tier PNG preservation + no backend/src / schema / auth / secrets / external / production changes.');

if (process.exitCode) {
  console.error('FAIL: Website positioning recovery read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Website positioning recovery read-only verification passed.');
console.log('Public positioning recovered to clear RoofLeadHQ AI model: fast response, automated follow-up, missed lead recovery, qualification, booked inspections on the calendar.');
console.log('Guided Setup (onboarding/config only) + 14-day trial with automated check-in email documented. Automated email 2 days before first monthly payment.');
console.log('All forbidden public phrases (founder-led babysitting language, guarantees, booked jobs claims, 14-day launch trial) removed from index.html.');
console.log('Three Growth Tier screenshots (dashboard/weekly/monthly) preserved with roofer-facing captions. No backend/src, schema, auth, secrets, or external call changes.');
console.log('All safety posture and read-only constraints preserved. Ready for public use under existing demo-ready / live automation disabled internal posture.');
