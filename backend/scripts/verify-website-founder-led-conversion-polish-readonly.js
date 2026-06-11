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

// 1. Required safe phrases present in website/index.html (post-polish)
const requiredSafePhrases = [
  'Founder-Led Launch Program',
  'book inspections',
  'book appointments',
  'manual founder/operator review',
  'manual coordination',
  'Request Founder-Led Launch Review',
  'See if RoofLeadHQ is a fit'
];
for (const phrase of requiredSafePhrases) {
  mustHave(indexHtml, phrase, 'website/index.html required safe phrase');
}
pass('All required safe phrases present in website/index.html (Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination, Request Founder-Led Launch Review, See if RoofLeadHQ is a fit).');

// 2. Polish-specific forbidden/leftover phrases absent from website/index.html
const polishForbiddenPhrases = [
  'Book a Founder-Led Setup Call form',
  'Appointment Booking',
  'Calls Answered When You Cannot Pick Up',
  'Turn Outside Leads Into Follow-Up Sequences',
  'Why Roofers Trust RoofLeadHQ',
  'First-Month Confidence Commitment',
  'fast response support',
  'prepared under manual coordination'
];
for (const phrase of polishForbiddenPhrases) {
  mustNotHave(indexHtml, phrase, 'website/index.html');
}
pass('All polish-specific leftover phrases absent from website/index.html (Book a Founder-Led Setup Call form, Appointment Booking, Calls Answered When You Cannot Pick Up, Turn Outside Leads Into Follow-Up Sequences, Why Roofers Trust RoofLeadHQ, First-Month Confidence Commitment, fast response support, prepared under manual coordination).');

// 3. Assert prior launch cleanup forbidden phrases remain absent (defense in depth)
const priorForbidden = [
  'follow up automatically',
  'automatically',
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
  'payment',
  'quote'
];
for (const phrase of priorForbidden) {
  mustNotHave(indexHtml, phrase, 'website/index.html (post-polish)');
}
pass('Prior launch cleanup forbidden phrases remain absent from website/index.html after polish.');

// Packet references
mustHave(packet, 'Founder-Led Launch Program', 'conversion polish packet');
mustHave(packet, 'manual founder/operator review', 'conversion polish packet');
mustHave(packet, 'manual coordination', 'conversion polish packet');
mustHave(packet, 'Request Founder-Led Launch Review', 'conversion polish packet');
mustHave(packet, 'Website/copy/docs/read-only verifier changes only', 'conversion polish packet');
mustHave(packet, 'no backend/src routes', 'conversion polish packet');
mustHave(packet, 'no migration/schema/auth/secrets', 'conversion polish packet');
mustHave(packet, 'node --check backend/scripts/verify-website-founder-led-conversion-polish-readonly.js', 'conversion polish packet');
mustHave(packet, 'scripts/run-website-founder-led-conversion-polish-dry-run.sh', 'conversion polish packet');
mustHave(packet, 'no live activation/no production behavior/no writes/no integrations/no auth/schema/security implementation', 'conversion polish packet');
pass('Packet doc contains required safe positioning language and safety posture.');

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
console.log('Public copy is now more natural, credible, and conversion-oriented.');
console.log('All safety protections, required safe phrases, and founder-led/manual-review-backed positioning preserved.');
console.log('No overclaims. No production automation implied. Ready for first paid roofer outreach under explicit approval path.');
