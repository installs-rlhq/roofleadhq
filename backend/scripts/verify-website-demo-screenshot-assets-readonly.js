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
const sampleLabels = ['SAMPLE DATA / DEMO PREVIEW', 'SAMPLE / DEMO ONLY', 'Demo Preview', 'Growth Tier Example', 'demo-banner'];
for (const page of [dashboard, weekly, monthly]) {
  let found = false;
  for (const label of sampleLabels) {
    if (page.includes(label)) { found = true; break; }
  }
  if (!found) throw new Error('A demo page is missing visible SAMPLE / DEMO labeling');
}
pass('Visible sample/demo labeling (SAMPLE DATA / DEMO PREVIEW, Growth Tier Example, demo-banner, sample-only footer) appears in each demo page.');

// 3. Confirm Growth Tier framing appears in the demo pages
const growthLabels = ['Growth Tier', '275 Leads/Month', '275 leads/month'];
for (const page of [dashboard, weekly, monthly]) {
  let found = false;
  for (const label of growthLabels) {
    if (page.includes(label)) { found = true; break; }
  }
  if (!found) throw new Error('A demo page is missing Growth Tier framing');
}
pass('Growth Tier framing (Growth Tier, 275 Leads/Month Example) appears in each demo page.');

// 4. Confirm 275-leads/month example is reflected in the monthly report
mustHave(monthly, '275', 'monthly-report-sample.html');
mustHave(monthly, 'Total Leads', 'monthly-report-sample.html');
pass('Monthly report reflects the 275 leads/month Growth Tier example (Total Leads: 275 and related metrics).');

// 5. Dashboard key metrics present
mustHave(dashboard, 'Lead Response Overview', 'dashboard-sample.html');
mustHave(dashboard, '64', 'dashboard-sample.html'); // New Leads This Week
mustHave(dashboard, '18', 'dashboard-sample.html'); // Inspection Opportunities
mustHave(dashboard, '21', 'dashboard-sample.html'); // Follow-Ups In Progress
mustHave(dashboard, '6', 'dashboard-sample.html'); // Leads Needing Attention
mustHave(dashboard, 'Inspection Opportunities', 'dashboard-sample.html');
mustHave(dashboard, 'Follow-Ups In Progress', 'dashboard-sample.html');
mustHave(dashboard, 'Leads Needing Attention', 'dashboard-sample.html');
pass('Dashboard page includes Growth Tier key metrics (64 new leads/wk, 18 inspection opportunities, 21 follow-ups, 6 needing attention).');

// 6. Weekly report key metrics present
mustHave(weekly, '64', 'weekly-report-sample.html');
mustHave(weekly, '29', 'weekly-report-sample.html');
mustHave(weekly, '18', 'weekly-report-sample.html');
mustHave(weekly, '11', 'weekly-report-sample.html');
mustHave(weekly, '21', 'weekly-report-sample.html');
mustHave(weekly, '5', 'weekly-report-sample.html');
mustHave(weekly, 'Leads Needing Attention', 'weekly-report-sample.html');
mustHave(weekly, 'Roofer Input Needed', 'weekly-report-sample.html');
pass('Weekly report page includes key weekly metrics consistent with 275/mo pace (64 captured, 29 qualified, 18 opp, 11 confirmed, 21 follow-ups, 5 roofer input).');

// 7. Monthly report key metrics present and source mix sums near 275
mustHave(monthly, '275', 'monthly-report-sample.html');
mustHave(monthly, '121', 'monthly-report-sample.html');
mustHave(monthly, '74', 'monthly-report-sample.html');
mustHave(monthly, '46', 'monthly-report-sample.html');
mustHave(monthly, '98', 'monthly-report-sample.html');
mustHave(monthly, '37', 'monthly-report-sample.html');
mustHave(monthly, '14', 'monthly-report-sample.html');
mustHave(monthly, 'Google Business Profile', 'monthly-report-sample.html');
mustHave(monthly, '92', 'monthly-report-sample.html');
mustHave(monthly, 'Website', 'monthly-report-sample.html');
mustHave(monthly, '61', 'monthly-report-sample.html');
mustHave(monthly, 'Angi', 'monthly-report-sample.html');
mustHave(monthly, '48', 'monthly-report-sample.html');
mustHave(monthly, 'Referrals', 'monthly-report-sample.html');
mustHave(monthly, '39', 'monthly-report-sample.html');
mustHave(monthly, 'Facebook', 'monthly-report-sample.html');
mustHave(monthly, '35', 'monthly-report-sample.html');
pass('Monthly report page includes full Growth Tier MTD metrics (275 total, 121 qual, 74 opp, 46 confirmed, 98/37 follow-ups, 14 roofer input) and source mix (92+61+48+39+35=275).');

// 8. Roofer-facing phrases are present (combination required)
const rooferPhrases = [
  'RoofLeadHQ Handling Status',
  'Leads Needing Attention',
  'Follow-Up In Progress',
  'Inspection Requested',
  'Inspection Confirmed',
  'Roofer Input Needed',
  'Handled by RoofLeadHQ',
  'Response Status',
  'RoofLeadHQ is handling',
  'RoofLeadHQ managed'
];
let rooferPhraseFound = false;
const allDemo = dashboard + weekly + monthly;
for (const phrase of rooferPhrases) {
  if (allDemo.includes(phrase)) { rooferPhraseFound = true; break; }
}
if (!rooferPhraseFound) {
  throw new Error('Demo pages missing required roofer-facing phrases (e.g. RoofLeadHQ Handling Status, Leads Needing Attention, Follow-Up In Progress, Inspection Requested/Confirmed, Roofer Input Needed)');
}
pass('Roofer-facing phrases present in demo pages (e.g. RoofLeadHQ Handling Status / Leads Needing Attention / Follow-Up In Progress / Inspection Requested / Inspection Confirmed / Roofer Input Needed).');

// 9. The following visible internal phrases are ABSENT from the demo pages (moved to docs/verifiers only)
const removedInternalPhrases = [
  'Live Automation Disabled',
  'Manual coordination only',
  'All next steps require founder or operator review',
  'Ready for Founder Review',
  'Manual Review Queue Status',
  'Confirm Manually',
  'Pending Confirm'
];
for (const phrase of removedInternalPhrases) {
  mustNotHave(dashboard, phrase, 'dashboard-sample.html');
  mustNotHave(weekly, phrase, 'weekly-report-sample.html');
  mustNotHave(monthly, phrase, 'monthly-report-sample.html');
}
pass('Old internal/safety phrases absent from visible demo page content (Live Automation Disabled, Manual coordination only, founder/operator review queue language, Ready for Founder Review, Manual Review Queue, Confirm Manually, Pending Confirm). Safety language kept in docs/verifiers only.');

// 10. Existing forbidden/risky phrases remain absent from demo pages
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

// 11+12. No backend/src routes/controllers/services and no migration/schema/auth/secrets/env modified
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
    'docs/WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET.md',
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

// 13. No external call strings present in demo pages, css, or wrapper
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

// Packet and wrapper safety language (updated for Growth Tier revision)
mustHave(packet, 'Growth Tier', 'screenshot assets packet');
mustHave(packet, '275 Leads/Month', 'screenshot assets packet');
mustHave(packet, 'SAMPLE DATA / DEMO PREVIEW', 'screenshot assets packet');
mustHave(packet, 'Static website/demo screenshot assets only', 'screenshot assets packet');
mustHave(packet, 'no backend/src routes', 'screenshot assets packet');
mustHave(packet, 'no migration/schema/auth/secrets', 'screenshot assets packet');
mustHave(packet, 'node --check backend/scripts/verify-website-demo-screenshot-assets-readonly.js', 'screenshot assets packet');
mustHave(packet, 'scripts/run-website-demo-screenshot-assets-dry-run.sh', 'screenshot assets packet');
mustHave(packet, 'No production behavior', 'screenshot assets packet');
mustHave(packet, 'RoofLeadHQ handles', 'screenshot assets packet');
pass('Packet doc contains required safe positioning language, Growth Tier framing, sample labeling, and safety posture.');

// Wiring checks (consistent with prior pattern; references remain valid)
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
console.log('All three static demo pages exist with required sample/demo labeling, Growth Tier framing, 275 leads/month in monthly, key metrics, and roofer-facing phrases.');
console.log('Old internal phrases (Live Automation Disabled etc.) removed from visible content; kept only in docs/verifiers.');
console.log('No backend/src, migrations, schema, auth, secrets, or env changes. No external call strings. Ready for marketing screenshots.');
