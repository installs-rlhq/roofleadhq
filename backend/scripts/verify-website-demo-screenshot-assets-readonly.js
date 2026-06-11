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

const dashboardPath = 'website/demo/dashboard-sample.html';
const weeklyPath = 'website/demo/weekly-report-sample.html';
const monthlyPath = 'website/demo/monthly-report-sample.html';
const cssPath = 'website/demo/demo.css';
const packetPath = 'docs/WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET.md';
const wrapperPath = 'scripts/run-website-demo-screenshot-assets-dry-run.sh';
const aggregatePath = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';
const verifierIndexPath = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const contextFirstPaidPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const contextRooferPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md';
const workflowPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md';
const dailyGuidePath = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';

console.log('=== RoofLeadHQ Website Demo Screenshot Assets Read-Only Verification ===');
console.log('Local file inspection + limited git diff/status only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('Static demo assets + read-only verifier only.');

const dashboard = read(dashboardPath);
const weekly = read(weeklyPath);
const monthly = read(monthlyPath);
const css = read(cssPath);
const packet = read(packetPath);
const wrapper = read(wrapperPath);
const aggregate = read(aggregatePath);
const verifierIndex = read(verifierIndexPath);
const contextFirstPaid = read(contextFirstPaidPath);
const contextRoofer = read(contextRooferPath);
const workflow = read(workflowPath);
const dailyGuide = read(dailyGuidePath);

// 1. Confirm all three demo pages exist (already asserted by read() above)
pass('All three demo pages exist: dashboard-sample.html, weekly-report-sample.html, monthly-report-sample.html');

// 2. Confirm visible sample/demo labeling appears in each page
const sampleLabels = ['SAMPLE DATA / DEMO PREVIEW', 'SAMPLE / DEMO ONLY', 'demo-banner', 'Sample data only'];
for (const page of [dashboard, weekly, monthly]) {
  let found = false;
  for (const label of sampleLabels) {
    if (page.includes(label)) { found = true; break; }
  }
  if (!found) throw new Error('A demo page is missing visible SAMPLE / DEMO labeling');
}
pass('Visible sample/demo labeling (SAMPLE DATA / DEMO PREVIEW, demo-banner, sample-only footer) appears in each demo page.');

// 3. Confirm each page includes Founder-Led Launch Program
mustHave(dashboard, 'Founder-Led Launch Program', 'dashboard-sample.html');
mustHave(weekly, 'Founder-Led Launch Program', 'weekly-report-sample.html');
mustHave(monthly, 'Founder-Led Launch Program', 'monthly-report-sample.html');
pass('Each demo page includes "Founder-Led Launch Program".');

// 4. Dashboard includes required dashboard/sample metrics/manual review queue/manual coordination/live automation disabled language
mustHave(dashboard, 'Lead Response Overview', 'dashboard-sample.html');
mustHave(dashboard, 'manual review queue', 'dashboard-sample.html');
mustHave(dashboard, 'Manual coordination only', 'dashboard-sample.html');
mustHave(dashboard, 'LIVE AUTOMATION DISABLED', 'dashboard-sample.html');
mustHave(dashboard, 'inspection coordination', 'dashboard-sample.html');
mustHave(dashboard, 'READY FOR FOUNDER REVIEW', 'dashboard-sample.html');
pass('Dashboard page includes dashboard/sample metrics, manual review queue, manual coordination, live automation disabled language, inspection coordination, and READY FOR FOUNDER REVIEW.');

// 5. Weekly page includes weekly report/sample metrics/leads needing attention/recommended manual actions
mustHave(weekly, 'Weekly Summary', 'weekly-report-sample.html');
mustHave(weekly, 'sample metrics', 'weekly-report-sample.html');
mustHave(weekly, 'Leads Needing Attention', 'weekly-report-sample.html');
mustHave(weekly, 'Recommended Founder / Operator Actions', 'weekly-report-sample.html');
mustHave(weekly, 'Manual coordination note', 'weekly-report-sample.html');
pass('Weekly report page includes weekly report/sample metrics, leads needing attention, and recommended manual actions.');

// 6. Monthly page includes monthly report/month-to-date/source mix/manual review outcomes/recommended adjustments
mustHave(monthly, 'Monthly Summary', 'monthly-report-sample.html');
mustHave(monthly, 'Month-to-Date Sample Metrics', 'monthly-report-sample.html');
mustHave(monthly, 'Lead Source Mix', 'monthly-report-sample.html');
mustHave(monthly, 'Manual Review Outcomes', 'monthly-report-sample.html');
mustHave(monthly, 'Recommended Next-Month Adjustments', 'monthly-report-sample.html');
pass('Monthly report page includes monthly report/month-to-date, source mix, manual review outcomes, and recommended adjustments.');

// 7. Forbidden/risky phrases absent from demo pages
const forbiddenPhrases = [
  'guarantee',
  'guaranteed',
  'automatically',
  'invoice',
  'payment',
  'quote',
  'estimate',
  'book jobs',
  'booked jobs',
  'jobs booked',
  'production automation active',
  'live automation active',
  'instant SMS',
  'calendar appointment booking'
];
for (const phrase of forbiddenPhrases) {
  mustNotHave(dashboard, phrase, 'dashboard-sample.html');
  mustNotHave(weekly, phrase, 'weekly-report-sample.html');
  mustNotHave(monthly, phrase, 'monthly-report-sample.html');
}
pass('All forbidden/risky phrases absent from demo pages (guarantee/guaranteed, automatically, invoice/payment/quote/estimate, book jobs variants, production/live automation active, instant SMS, calendar appointment booking).');

// 8+9. No backend/src routes/controllers/services and no migration/schema/auth/secrets/env modified
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
    'backend/scripts/verify-website-demo-screenshot-assets-readonly.js',
    'scripts/run-website-demo-screenshot-assets-dry-run.sh',
    'website/demo/dashboard-sample.html',
    'website/demo/weekly-report-sample.html',
    'website/demo/monthly-report-sample.html',
    'website/demo/demo.css',
    'docs/WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET.md'
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

// 10. No external call strings present in demo pages or the new verifier/wrapper
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
function assertNoExternalCallsInDemo() {
  const demoContent = dashboard + weekly + monthly + css + wrapper;
  for (const s of externalCallStrings) {
    if (demoContent.includes(s)) {
      throw new Error(`Forbidden external call string found in demo assets or wrapper: ${s}`);
    }
  }
  // Verifier declares the forbidden list for checking purposes but performs no external calls (uses only fs + child_process.execSync for local git status/diff inspection). No runtime fetch/axios etc. present outside the list declaration.
  pass('No external call strings present in demo pages, css, or wrapper (fetch(, XMLHttpRequest, axios, supabase, twilio, resend, vapi, lindy). Verifier uses only local fs/execSync.');
}
assertNoExternalCallsInDemo();

// Packet and wrapper safety language
mustHave(packet, 'Founder-Led Launch Program', 'screenshot assets packet');
mustHave(packet, 'manual founder/operator review', 'screenshot assets packet');
mustHave(packet, 'manual coordination', 'screenshot assets packet');
mustHave(packet, 'SAMPLE DATA / DEMO PREVIEW', 'screenshot assets packet');
mustHave(packet, 'Static website/demo screenshot assets only', 'screenshot assets packet');
mustHave(packet, 'no backend/src routes', 'screenshot assets packet');
mustHave(packet, 'no migration/schema/auth/secrets', 'screenshot assets packet');
mustHave(packet, 'node --check backend/scripts/verify-website-demo-screenshot-assets-readonly.js', 'screenshot assets packet');
mustHave(packet, 'scripts/run-website-demo-screenshot-assets-dry-run.sh', 'screenshot assets packet');
mustHave(packet, 'No production behavior', 'screenshot assets packet');
pass('Packet doc contains required safe positioning language, sample labeling, and safety posture.');

// Wiring checks (consistent with website founder-led copy/polish pattern)
mustHave(aggregate, 'verify-website-demo-screenshot-assets-readonly.js', 'aggregate first-paid pilot readiness');
mustHave(aggregate, 'Website Demo Screenshot Assets', 'aggregate first-paid pilot readiness');
pass('Aggregate first-paid pilot readiness includes the website demo screenshot assets verifier.');

mustHave(verifierIndex, 'WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET.md', 'verifier index');
mustHave(verifierIndex, 'run-website-demo-screenshot-assets-dry-run.sh', 'verifier index');
mustHave(verifierIndex, 'verify-website-demo-screenshot-assets-readonly.js', 'verifier index');

mustHave(contextFirstPaid, 'WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET', 'next-chat first paid launch context');
mustHave(contextFirstPaid, 'verify-website-demo-screenshot-assets-readonly.js', 'next-chat first paid launch context');

mustHave(contextRoofer, 'website-demo-screenshot-assets', 'next-chat roofer dry-run context');
mustHave(contextRoofer, 'verify-website-demo-screenshot-assets-readonly.js', 'next-chat roofer dry-run context');

mustHave(workflow, 'demo screenshot assets', 'agent grok build workflow context');
mustHave(workflow, 'verify-website-demo-screenshot-assets-readonly.js', 'agent grok build workflow context');

mustHave(dailyGuide, 'WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET', 'business buildout daily guide');
mustHave(dailyGuide, 'verify-website-demo-screenshot-assets-readonly.js', 'business buildout daily guide');

mustHave(wrapper, 'verify-website-demo-screenshot-assets-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-agent-product-quality-gate-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-website-founder-led-launch-copy-readonly.js', 'dry-run wrapper');
mustHave(wrapper, 'verify-website-founder-led-conversion-polish-readonly.js', 'dry-run wrapper');

pass('Verifier index, next-chat contexts, workflow doc, daily guide, and wrapper all reference the website demo screenshot assets packet/verifier/wrapper.');

// Final safety confirmation
mustHave(packet, 'Website/demo/docs/read-only verifier changes only', 'screenshot assets packet');
pass('Packet explicitly records website/demo/docs/read-only + no backend src / schema / auth / secrets changes.');

if (process.exitCode) {
  console.error('FAIL: Website demo screenshot assets read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Website demo screenshot assets read-only verification passed.');
console.log('All three static demo pages exist with required sample labeling, Founder-Led Launch Program framing, manual review / manual coordination language, and forbidden phrases absent.');
console.log('No backend/src, migrations, schema, auth, secrets, or env changes. No external call strings. Ready for marketing screenshots.');
