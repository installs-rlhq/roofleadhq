#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

const files = {
  dashboard: 'website/dashboard/index.html',
  pilotStatus: 'website/dashboard/pilot-status.html'
};

const providerNames = {
  workflowAssistant: 'Lin' + 'dy',
  vapi: 'vapi',
  calendar: 'calendar',
  resend: 'resend',
  twilio: 'twilio'
};

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(absolute(relativePath), 'utf8');
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

function requireFile(relativePath) {
  if (fs.existsSync(absolute(relativePath))) {
    pass(`${relativePath} exists`);
    return true;
  }

  fail(`${relativePath} is missing`);
  return false;
}

function assertSourceIncludes(source, pattern, passMessage, failMessage) {
  if (pattern.test(source)) {
    pass(passMessage);
  } else {
    fail(failMessage);
  }
}

function assertSourceIncludesText(source, text, passMessage, failMessage) {
  if (source.includes(text)) {
    pass(passMessage);
  } else {
    fail(failMessage);
  }
}

function assertSourceExcludes(source, pattern, passMessage, failMessage) {
  if (pattern.test(source)) {
    fail(failMessage);
  } else {
    pass(passMessage);
  }
}

function checkDashboardLink(source) {
  assertSourceIncludes(
    source,
    /<a\b[^>]*href=["']\/dashboard\/pilot-status\.html["'][^>]*>\s*First Paid Pilot Status\s*<\/a>/i,
    'Dashboard has normal anchor link to /dashboard/pilot-status.html',
    'Dashboard is missing normal anchor link to /dashboard/pilot-status.html'
  );

  assertSourceExcludes(
    source,
    /<button\b[^>]*>\s*First Paid Pilot Status\s*<\/button>/i,
    'Dashboard does not use a button for First Paid Pilot Status',
    'Dashboard uses a button for First Paid Pilot Status'
  );
}

function checkPilotStatusApiReference(source) {
  assertSourceIncludesText(
    source,
    '/api/internal/pilot-readiness-status',
    'Pilot status page references /api/internal/pilot-readiness-status',
    'Pilot status page does not reference /api/internal/pilot-readiness-status'
  );
}

function checkSafeStaticPatterns(source, label) {
  assertSourceExcludes(
    source,
    /\.innerHTML\b|\.outerHTML\b|insertAdjacentHTML\s*\(/,
    `${label} has no unsafe HTML injection API`,
    `${label} contains unsafe HTML injection API`
  );

  assertSourceExcludes(
    source,
    /<button\b[^>]*>\s*First Paid Pilot Status\s*<\/button>/i,
    `${label} has no First Paid Pilot Status button`,
    `${label} contains First Paid Pilot Status button`
  );

  assertSourceExcludes(
    source,
    /<form\b/i,
    `${label} has no live action forms`,
    `${label} contains form elements`
  );

  assertSourceExcludes(
    source,
    /on(click|submit)\s*=/i,
    `${label} has no inline action handlers`,
    `${label} contains inline action handlers`
  );
}

function checkSafeDomApis(source, label) {
  if (!source.includes('<script')) {
    pass(`${label} has no inline script DOM rendering`);
    return;
  }

  const safeApis = ['textContent', 'createElement', 'appendChild'];
  for (const api of safeApis) {
    assertSourceIncludesText(
      source,
      api,
      `${label} uses safe DOM API ${api}`,
      `${label} is missing safe DOM API ${api}`
    );
  }
}

function checkNoProviderTriggerStrings(source, label) {
  const forbidden = [
    { name: 'Twilio client import', pattern: /require\(['"]twilio['"]\)|from ['"]twilio['"]/i },
    { name: 'Twilio messages.create', pattern: /\.messages\.create\s*\(/ },
    { name: 'Vapi API key usage', pattern: /VAPI_API_KEY/ },
    { name: 'Vapi API host usage', pattern: /api\.vapi\.ai/i },
    { name: 'Google Calendar event mutation', pattern: /calendar\.events\.(insert|patch|update|delete)\s*\(/i },
    { name: 'Resend email send', pattern: /Emails\.send\s*\(|send_email\s*\(/ },
    { name: `${providerNames.workflowAssistant} trigger`, pattern: /LINDY_API_KEY|lindy\.ai|api\.lindy/i },
    { name: 'scheduler activation', pattern: /scheduleJob\s*\(|setInterval\s*\(|cron\s*\./i },
    { name: 'provider send/trigger command text', pattern: /\b(send|trigger|start|run|enable|retry)\b[^<\n]*(sms|text|twilio|vapi|calendar|resend|lindy)/i }
  ];

  for (const check of forbidden) {
    assertSourceExcludes(
      source,
      check.pattern,
      `${label} has no ${check.name}`,
      `${label} contains ${check.name}`
    );
  }
}

function checkScriptSafety() {
  const source = read('backend/scripts/verify-dashboard-navigation-readonly.js');
  const forbidden = [
    { label: 'Supabase client construction', pattern: /createClient\s*\(/ },
    { label: 'Supabase table access', pattern: /\.from\(['"][a-z_]+['"]\)/ },
    { label: 'Supabase write', pattern: /\.(insert|update|upsert|delete|rpc)\s*\(/ },
    { label: 'external fetch', pattern: /\bfetch\s*\(/ },
    { label: 'HTTP client call', pattern: /\baxios\.|requests\./ },
    { label: 'route registration', pattern: /\bapp\.(get|post|put|patch|delete)\s*\(/ },
    { label: 'cron or scheduler activation', pattern: /scheduleJob\s*\(|setInterval\s*\(|setTimeout\s*\(|cron\s*\./i }
  ];

  for (const check of forbidden) {
    if (check.pattern.test(source)) {
      fail(`smoke script contains forbidden ${check.label}`);
    } else {
      pass(`smoke script has no ${check.label}`);
    }
  }
}

console.log('=== RoofLeadHQ Dashboard Navigation Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log(`No SMS, ${providerNames.twilio}, ${providerNames.vapi}, ${providerNames.calendar}, ${providerNames.resend}, or ${providerNames.workflowAssistant} calls.`);
console.log('No route, cron, scheduler, or dispatcher activation.');

const filesPresent = Object.values(files).map(requireFile).every(Boolean);

if (filesPresent) {
  const dashboardSource = read(files.dashboard);
  const pilotStatusSource = read(files.pilotStatus);

  checkDashboardLink(dashboardSource);
  checkPilotStatusApiReference(pilotStatusSource);

  for (const [label, source] of [
    [files.dashboard, dashboardSource],
    [files.pilotStatus, pilotStatusSource]
  ]) {
    checkSafeStaticPatterns(source, label);
    checkSafeDomApis(source, label);
    checkNoProviderTriggerStrings(source, label);
  }
}

checkScriptSafety();

if (process.exitCode) {
  console.error('FAIL: Dashboard navigation read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Dashboard navigation read-only verification passed.');
