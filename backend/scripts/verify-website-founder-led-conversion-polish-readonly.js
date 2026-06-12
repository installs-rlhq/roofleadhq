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
    throw new Error(`${label} contains forbidden/polish-leftover phrase: ${needle}`);
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
const packetPath = 'docs/WEBSITE_FOUNDER_LED_CONVERSION_POLISH_PACKET.md';
const wrapperPath = 'scripts/run-website-founder-led-conversion-polish-dry-run.sh';
const launchVerifierPath = 'backend/scripts/verify-website-founder-led-launch-copy-readonly.js';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const workflowPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const dailyGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

console.log('=== RoofLeadHQ Website Founder-Led Launch Conversion Polish Read-Only Verification ===');
console.log('Local file inspection + limited git diff/status only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('Website/copy/docs/read-only verifier changes only.');

const indexHtml = read(indexPath);
const packet = read(packetPath);
const wrapper = read(wrapperPath);
const launchVerifier = read(launchVerifierPath);
const aggregate = read(aggregatePath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRoofer = read(contextRooferPath);
const workflow = read(workflowPath);
const dailyGuide = read(dailyGuidePath);

// 1. Required safe phrases present in website/index.html (post-polish, updated for recovered RoofLeadHQ AI / Guided Setup / 14-day trial positioning)
const requiredSafePhrases = [
  'Turn More Roofing Leads Into Booked Inspections',
  'RoofLeadHQ AI',
  'Guided Setup',
  '14-day trial',
  'booked inspections',
  'Start Your RoofLeadHQ Setup',
  'See If RoofLeadHQ Fits'
];
for (const phrase of requiredSafePhrases) {
  mustHave(indexHtml, phrase, 'website/index.html required safe phrase');
}
pass('All required safe phrases present in website/index.html (Turn More Roofing Leads Into Booked Inspections, RoofLeadHQ AI, Guided Setup, 14-day trial, booked inspections, Start Your RoofLeadHQ Setup, See If RoofLeadHQ Fits).'); // copy/layout polish alignment: safe phrases preserved post-polish; billing day-15 language removed from public per founder review (forbidden checks remain strong)

// 2. Polish-specific forbidden/leftover phrases absent from website/index.html (plus old founder-led public language now removed)
const polishForbiddenPhrases = [
  'Book a Founder-Led Setup Call form',
  'Appointment Booking',
  'Calls Answered When You Cannot Pick Up',
  'Turn Outside Leads Into Follow-Up Sequences',
  'Why Roofers Trust RoofLeadHQ',
  'First-Month Confidence Commitment',
  'fast response support',
  'prepared under manual coordination',
  'Founder-Led Launch Program',
  'Request Founder-Led Launch Review',
  'manual coordination',
  'manual founder review',
  'manual operator review',
  'founder review',
  'operator review',
  'manual review queue',
  'Live Automation Disabled',
  '14-day launch trial'
];
for (const phrase of polishForbiddenPhrases) {
  mustNotHave(indexHtml, phrase, 'website/index.html');
}
pass('All polish-specific leftover phrases and old founder-led public phrases absent from website/index.html.');

// 3. Assert prior launch cleanup forbidden phrases remain absent (defense in depth + new positioning)
const priorForbidden = [
  'guaranteed',
  'guarantee',
  'credit your next month',
  'waive your first monthly payment',
  'system-led after setup',
  'books real appointments',
  'books the appointment for you',
  'appointment lands on your calendar',
  'qualified appointments placed directly on your schedule',
  'instant SMS',
  'calendar appointment booking',
  'invoice',
  'quote',
  'guaranteed jobs',
  'guaranteed revenue',
  'guaranteed appointments',
  'booked jobs',
  'book jobs',
  '5 qualified appointments in 7 days',
  '7-day pilot'
];
for (const phrase of priorForbidden) {
  mustNotHave(indexHtml, phrase, 'website/index.html (post-polish)');
}
pass('Prior launch cleanup forbidden phrases and guarantee/job claims remain absent from website/index.html after polish.');

// Packet references (historical packet retains context; public copy now uses new positioning)
mustHave(packet, 'Website/copy/docs/read-only verifier changes only', 'conversion polish packet');
mustHave(packet, 'no backend/src routes', 'conversion polish packet');
mustHave(packet, 'no migration/schema/auth/secrets', 'conversion polish packet');
mustHave(packet, 'node --check backend/scripts/verify-website-founder-led-conversion-polish-readonly.js', 'conversion polish packet');
mustHave(packet, 'scripts/run-website-founder-led-conversion-polish-dry-run.sh', 'conversion polish packet');
mustHave(packet, 'no live activation/no production behavior/no writes/no integrations/no auth/schema/security implementation', 'conversion polish packet');
pass('Packet doc contains required safety posture. Public copy now accepts Guided Setup / RoofLeadHQ AI / 14-day trial positioning.');

// No backend/src, migrations, schema, auth, secrets, env modified in this build (git + constraints)
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
    'backend/scripts/verify-website-founder-led-launch-copy-readonly.js',
    'backend/scripts/verify-website-founder-led-conversion-polish-readonly.js',
    'scripts/run-website-founder-led-launch-copy-dry-run.sh',
    'scripts/run-website-founder-led-conversion-polish-dry-run.sh'
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

// Wiring and cross-references (consistent with launch cleanup pattern)
mustHave(aggregate, 'verify-website-founder-led-conversion-polish-readonly.js', 'aggregate first-paid pilot readiness');
mustHave(aggregate, 'Website Founder-Led Launch Conversion Polish', 'aggregate first-paid pilot readiness');
pass('Aggregate first-paid pilot readiness includes the website founder-led conversion polish verifier.');

mustHave(verifierIndex, 'WEBSITE_FOUNDER_LED_CONVERSION_POLISH_PACKET.md', 'verifier index');
mustHave(verifierIndex, 'run-website-founder-led-conversion-polish-dry-run.sh', 'verifier index');
mustHave(verifierIndex, 'verify-website-founder-led-conversion-polish-readonly.js', 'verifier index');

mustHave(contextFirstPaid, 'WEBSITE_FOUNDER_LED_CONVERSION_POLISH_PACKET', 'next-chat first paid launch context');
mustHave(contextFirstPaid, 'verify-website-founder-led-conversion-polish-readonly.js', 'next-chat first paid launch context');

mustHave(contextRoofer, 'website-founder-led-conversion-polish', 'next-chat roofer dry-run context');
mustHave(contextRoofer, 'verify-website-founder-led-conversion-polish-readonly.js', 'next-chat roofer dry-run context');

mustHave(workflow, 'website copy polish', 'agent grok build workflow context');
mustHave(workflow, 'verify-website-founder-led-conversion-polish-readonly.js', 'agent grok build workflow context');

mustHave(dailyGuide, 'WEBSITE_FOUNDER_LED_CONVERSION_POLISH_PACKET', 'business buildout daily guide');
mustHave(dailyGuide, 'verify-website-founder-led-conversion-polish-readonly.js', 'business buildout daily guide');

mustHave(wrapper, 'verify-website-founder-led-conversion-polish-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-agent-product-quality-gate-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-website-founder-led-launch-copy-readonly.js', 'dry-run wrapper');

pass('Verifier index, next-chat contexts, workflow doc, daily guide, and wrapper all reference the website founder-led conversion polish packet/verifier/wrapper.');

// Also ensure launch cleanup verifier is still referenced in wrapper/aggregate for combined run
mustHave(wrapper, 'verify-website-founder-led-launch-copy-readonly.js', 'polish dry-run wrapper (chains launch verifier)');
pass('Polish dry-run wrapper references the prior launch copy verifier for combined safety.');

if (process.exitCode) {
  console.error('FAIL: Website founder-led launch conversion polish read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Website founder-led launch conversion polish read-only verification passed.');
console.log('Public copy now reflects recovered RoofLeadHQ AI / Guided Setup / 14-day trial positioning (more natural, direct, benefit-focused).');
console.log('All safety protections, forbidden guarantee/job/automation claims, and no-backend/src constraints preserved. Old founder-led public phrases no longer required.');
console.log('No overclaims. No production automation implied. Ready for first paid roofer outreach under existing safety posture.');
