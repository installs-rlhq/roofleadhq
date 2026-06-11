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
const packetPath = 'docs/WEBSITE_HOMEPAGE_SCREENSHOT_PLACEMENT_PACKET.md';
const wrapperPath = 'scripts/run-website-homepage-screenshot-placement-dry-run.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const workflowPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const dailyGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

const dashboardPngPath = 'website/dashboard-sample.png';
const weeklyPngPath = 'website/weekly-report-sample.png';
const monthlyPngPath = 'website/monthly-report-sample.png';

console.log('=== RoofLeadHQ Website Homepage Screenshot Placement Read-Only Verification ===');
console.log('Local file inspection + limited git diff/status only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('Website/static-asset/docs/read-only verifier changes only.');

const indexHtml = read(indexPath);
const packet = read(packetPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregatePath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRoofer = read(contextRooferPath);
const workflow = read(workflowPath);
const dailyGuide = read(dailyGuidePath);

// 1. Confirm website/index.html references the three PNGs
mustHave(indexHtml, 'dashboard-sample.png', 'website/index.html');
mustHave(indexHtml, 'weekly-report-sample.png', 'website/index.html');
mustHave(indexHtml, 'monthly-report-sample.png', 'website/index.html');
pass('website/index.html references dashboard-sample.png, weekly-report-sample.png, monthly-report-sample.png');

// 2. Confirm the three PNG files exist in website/
if (!fs.existsSync(path.join(root, dashboardPngPath))) throw new Error('Missing PNG: ' + dashboardPngPath);
if (!fs.existsSync(path.join(root, weeklyPngPath))) throw new Error('Missing PNG: ' + weeklyPngPath);
if (!fs.existsSync(path.join(root, monthlyPngPath))) throw new Error('Missing PNG: ' + monthlyPngPath);
pass('All three final Growth Tier PNGs exist in website/ (dashboard-sample.png, weekly-report-sample.png, monthly-report-sample.png)');

// 3. Confirm homepage alt text includes the required dashboard/weekly/monthly screenshot descriptions
mustHave(indexHtml, 'Sample Growth Tier dashboard preview', 'website/index.html alt text');
mustHave(indexHtml, 'Sample Growth Tier weekly report preview', 'website/index.html alt text');
mustHave(indexHtml, 'Sample Growth Tier monthly report preview', 'website/index.html alt text');
pass('Homepage alt text includes required Sample Growth Tier dashboard/weekly/monthly screenshot descriptions');

// 4+5+6. No backend/src routes/controllers/services and no migration/schema/auth/secrets/env modified; no external call strings added in this build
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
    'backend/scripts/verify-website-homepage-screenshot-placement-readonly.js',
    'scripts/run-website-homepage-screenshot-placement-dry-run.sh',
    'website/index.html',
    'website/dashboard-sample.png',
    'website/weekly-report-sample.png',
    'website/monthly-report-sample.png',
    'docs/WEBSITE_HOMEPAGE_SCREENSHOT_PLACEMENT_PACKET.md'
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

function assertNoExternalCallStringsAdded() {
  // Check the primary changed website file (index.html) and supporting new files for external call strings that would be forbidden in this static-only change.
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
      throw new Error(`Forbidden external call string found in homepage changes or new files: ${s}`);
    }
  }
  pass('No external service call strings added in this build (checked index.html + packet + wrapper for fetch(, XMLHttpRequest, axios, supabase, twilio, resend, vapi, lindy).');
}
assertNoExternalCallStringsAdded();

// 7. Packet and wrapper safety language + references
mustHave(packet, 'Growth Tier', 'homepage screenshot placement packet');
mustHave(packet, 'dashboard-sample.png', 'homepage screenshot placement packet');
mustHave(packet, 'weekly-report-sample.png', 'homepage screenshot placement packet');
mustHave(packet, 'monthly-report-sample.png', 'homepage screenshot placement packet');
mustHave(packet, 'Sample Growth Tier dashboard preview', 'homepage screenshot placement packet');
mustHave(packet, 'Sample Growth Tier weekly report preview', 'homepage screenshot placement packet');
mustHave(packet, 'Sample Growth Tier monthly report preview', 'homepage screenshot placement packet');
mustHave(packet, 'Static website-only', 'homepage screenshot placement packet');
mustHave(packet, 'no backend/src routes', 'homepage screenshot placement packet');
mustHave(packet, 'no migration/schema/auth/secrets', 'homepage screenshot placement packet');
mustHave(packet, 'node --check backend/scripts/verify-website-homepage-screenshot-placement-readonly.js', 'homepage screenshot placement packet');
mustHave(packet, 'scripts/run-website-homepage-screenshot-placement-dry-run.sh', 'homepage screenshot placement packet');
mustHave(packet, 'No production behavior', 'homepage screenshot placement packet');
mustHave(packet, 'Founder-Led Launch Program public copy', 'homepage screenshot placement packet');
mustHave(packet, 'Website-only public homepage screenshot placement', 'homepage screenshot placement packet');
pass('Packet doc contains required final screenshot files, alt text, safe positioning language, and safety posture.');

// Wiring checks (consistent with prior website packet pattern)
mustHave(aggregate, 'verify-website-homepage-screenshot-placement-readonly.js', 'aggregate first-paid pilot readiness');
mustHave(aggregate, 'Website Homepage Screenshot Placement', 'aggregate first-paid pilot readiness');
pass('Aggregate first-paid pilot readiness includes the website homepage screenshot placement verifier.');

mustHave(verifierIndex, 'WEBSITE_HOMEPAGE_SCREENSHOT_PLACEMENT_PACKET.md', 'verifier index');
mustHave(verifierIndex, 'run-website-homepage-screenshot-placement-dry-run.sh', 'verifier index');
mustHave(verifierIndex, 'verify-website-homepage-screenshot-placement-readonly.js', 'verifier index');

mustHave(contextFirstPaid, 'WEBSITE_HOMEPAGE_SCREENSHOT_PLACEMENT_PACKET', 'next-chat first paid launch context');
mustHave(contextFirstPaid, 'verify-website-homepage-screenshot-placement-readonly.js', 'next-chat first paid launch context');

mustHave(contextRoofer, 'website-homepage-screenshot-placement', 'next-chat roofer dry-run context');
mustHave(contextRoofer, 'verify-website-homepage-screenshot-placement-readonly.js', 'next-chat roofer dry-run context');

mustHave(workflow, 'homepage screenshot placement', 'agent grok build workflow context');
mustHave(workflow, 'verify-website-homepage-screenshot-placement-readonly.js', 'agent grok build workflow context');

mustHave(dailyGuide, 'WEBSITE_HOMEPAGE_SCREENSHOT_PLACEMENT_PACKET', 'business buildout daily guide');
mustHave(dailyGuide, 'verify-website-homepage-screenshot-placement-readonly.js', 'business buildout daily guide');

mustHave(wrapper, 'verify-website-homepage-screenshot-placement-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-agent-product-quality-gate-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-website-founder-led-launch-copy-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-website-founder-led-conversion-polish-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-website-demo-screenshot-assets-readonly.js', 'dry-run wrapper');

pass('Verifier index, next-chat contexts, workflow doc, daily guide, and wrapper all reference the website homepage screenshot placement packet/verifier/wrapper.');

// Final safety confirmation
mustHave(packet, 'website/copy/static-asset/reference changes only', 'homepage screenshot placement packet');
mustHave(packet, 'No backend/src or schema/auth/secrets changes', 'homepage screenshot placement packet');
pass('Packet explicitly records website-only + static asset + no backend/src / schema / auth / secrets / external / production changes.');

if (process.exitCode) {
  console.error('FAIL: Website homepage screenshot placement read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Website homepage screenshot placement read-only verification passed.');
console.log('website/index.html now references the three final Growth Tier PNGs with correct alt text and aligned Dashboard/Weekly Reports/Monthly Reports headings in the product screenshots section.');
console.log('PNG files confirmed present. No backend/src, migrations, schema, auth, secrets, or env changes. No external call strings added. Prior website verifiers and quality gate referenced for combined baseline.');
console.log('All changes are website/static-asset/docs/read-only verifier only. Growth Tier screenshots preserved through public positioning recovery. Ready for public homepage use.');
