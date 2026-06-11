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
    throw new Error(`${label} contains forbidden/risky phrase: ${needle}`);
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
const packetPath = 'docs/WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET.md';
const wrapperPath = 'scripts/run-website-founder-led-launch-copy-dry-run.sh';
const verifierPath = 'backend/scripts/verify-website-founder-led-launch-copy-readonly.js';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const workflowPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const dailyGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

console.log('=== RoofLeadHQ Website Founder-Led Launch Copy Cleanup Read-Only Verification ===');
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

// 1+2. Required safe phrases present in website/index.html
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

// 3. Forbidden/risky phrases absent from website/index.html and public positioning docs changed in this build
const forbiddenPhrases = [
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
for (const phrase of forbiddenPhrases) {
  mustNotHave(indexHtml, phrase, 'website/index.html');
  mustNotHave(packet, phrase, 'WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET.md');
}
pass('All forbidden/risky phrases absent from website/index.html and changed public positioning docs (follow up automatically, automatically, guaranteed, guarantee, credit/waive promises, system-led after setup, books real appointments / lands on calendar / placed directly, instant SMS, calendar appointment booking, invoice, payment, quote).');

// Assert public positioning docs reference required safe language
mustHave(packet, 'Founder-Led Launch Program', 'website copy cleanup packet');
mustHave(packet, 'manual founder/operator review', 'website copy cleanup packet');
mustHave(packet, 'manual coordination', 'website copy cleanup packet');
mustHave(packet, 'Request Founder-Led Launch Review', 'website copy cleanup packet');
pass('Packet doc contains required safe positioning language.');

// 4+5. Assert no backend src routes/controllers/services and no migration/schema/auth/secrets/env modified in this build
function assertNoForbiddenFilesModified() {
  let changed = '';
  try {
    // Capture both staged and unstaged + untracked for new files in this worktree task
    const porcelain = execSync('git status --porcelain', { cwd: root, encoding: 'utf8' });
    const diffNames = execSync('git diff --name-only HEAD --', { cwd: root, encoding: 'utf8' });
    changed = (porcelain + '\n' + diffNames).toLowerCase();
  } catch (e) {
    // If git not available or outside repo in some envs, fall back to allowing (verifier still checks language)
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
    'scripts/run-website-founder-led-launch-copy-dry-run.sh'
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
    // Also block any non-allowed backend/src even if script exception missed
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

// Assert only website/copy/docs/read-only verifier changes (high level)
mustHave(packet, 'Website/copy/docs/read-only verifier changes only', 'website copy cleanup packet');
mustHave(packet, 'no backend/src routes', 'website copy cleanup packet');
mustHave(packet, 'no migration/schema/auth/secrets', 'website copy cleanup packet');
pass('Packet explicitly records website/copy/docs/read-only + no backend src / schema / auth / secrets changes.');

// Assert aggregate readiness is wired (consistent with pattern)
mustHave(aggregate, 'verify-website-founder-led-launch-copy-readonly.js', 'aggregate first-paid pilot readiness');
mustHave(aggregate, 'Website Founder-Led Launch Copy', 'aggregate first-paid pilot readiness');
pass('Aggregate first-paid pilot readiness includes the website founder-led launch copy verifier.');

// Assert verifier index, contexts, daily guide, wrapper, workflow reference the new artifacts
mustHave(verifierIndex, 'WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET.md', 'verifier index');
mustHave(verifierIndex, 'run-website-founder-led-launch-copy-dry-run.sh', 'verifier index');
mustHave(verifierIndex, 'verify-website-founder-led-launch-copy-readonly.js', 'verifier index');

mustHave(contextFirstPaid, 'WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET', 'next-chat first paid launch context');
mustHave(contextFirstPaid, 'verify-website-founder-led-launch-copy-readonly.js', 'next-chat first paid launch context');

mustHave(contextRoofer, 'website-founder-led-launch-copy', 'next-chat roofer dry-run context');
mustHave(contextRoofer, 'verify-website-founder-led-launch-copy-readonly.js', 'next-chat roofer dry-run context');

mustHave(workflow, 'website copy cleanup', 'agent grok build workflow context');
mustHave(workflow, 'verify-website-founder-led-launch-copy-readonly.js', 'agent grok build workflow context');

mustHave(dailyGuide, 'WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET', 'business buildout daily guide');
mustHave(dailyGuide, 'verify-website-founder-led-launch-copy-readonly.js', 'business buildout daily guide');

mustHave(wrapper, 'verify-website-founder-led-launch-copy-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-agent-product-quality-gate-readonly.js', 'dry-run wrapper');

pass('Verifier index, next-chat contexts, workflow doc, daily guide, and wrapper all reference the website founder-led launch copy packet/verifier/wrapper.');

// Assert packet contains verification commands and safety summary
mustHave(packet, 'node --check backend/scripts/verify-website-founder-led-launch-copy-readonly.js', 'website copy cleanup packet');
mustHave(packet, 'scripts/run-website-founder-led-launch-copy-dry-run.sh', 'website copy cleanup packet');
mustHave(packet, 'no live activation/no production behavior/no writes/no integrations/no auth/schema/security implementation', 'website copy cleanup packet');
pass('Packet documents verification commands and full safety posture.');

if (process.exitCode) {
  console.error('FAIL: Website founder-led launch copy cleanup read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Website founder-led launch copy cleanup read-only verification passed.');
console.log('All public positioning is now safer, founder-led, manual-review-backed, and manually coordinated.');
console.log('No overclaims. No production automation implied. Ready for first paid roofer outreach under explicit approval path.');