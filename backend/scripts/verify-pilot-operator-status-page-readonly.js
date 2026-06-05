#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

const files = {
  page: 'website/dashboard/pilot-status.html',
  internalAdminRoute: 'backend/src/routes/internal-admin.ts'
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

function checkProtectedEndpoint(routeSource) {
  assertSourceIncludes(
    routeSource,
    /router\.get\(['"]\/pilot-readiness-status['"]/,
    'Internal admin route exposes pilot-readiness-status endpoint',
    'Internal admin route is missing pilot-readiness-status endpoint'
  );

  assertSourceIncludesText(
    routeSource,
    'authorizeInternalAdmin(req, res)',
    'Pilot readiness endpoint uses internal admin authorization helper',
    'Pilot readiness endpoint does not use internal admin authorization helper'
  );

  assertSourceIncludesText(
    routeSource,
    'INTERNAL_ADMIN_TOKEN',
    'Internal admin route checks INTERNAL_ADMIN_TOKEN',
    'Internal admin route does not check INTERNAL_ADMIN_TOKEN'
  );

  assertSourceIncludesText(
    routeSource,
    'x-internal-admin-token',
    'Internal admin route accepts protected admin token header',
    'Internal admin route does not accept protected admin token header'
  );
}

function checkSafeDomRendering(pageSource) {
  const requiredDomApis = ['textContent', 'createElement', 'appendChild', 'replaceChildren'];

  for (const api of requiredDomApis) {
    assertSourceIncludesText(
      pageSource,
      api,
      `Operator status page uses safe DOM API ${api}`,
      `Operator status page is missing safe DOM API ${api}`
    );
  }

  assertSourceExcludes(
    pageSource,
    /\.innerHTML\b|\.outerHTML\b|insertAdjacentHTML\s*\(/,
    'Operator status page has no unsafe HTML injection API',
    'Operator status page contains unsafe HTML injection API'
  );

  assertSourceExcludes(
    pageSource,
    /<button\b/i,
    'Operator status page has no live action buttons',
    'Operator status page contains button elements'
  );

  assertSourceExcludes(
    pageSource,
    /on(click|submit)\s*=/i,
    'Operator status page has no inline action handlers',
    'Operator status page contains inline action handlers'
  );
}

function checkNoProviderTriggerStrings(pageSource) {
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
      pageSource,
      check.pattern,
      `Operator status page has no ${check.name}`,
      `Operator status page contains ${check.name}`
    );
  }
}

function checkScriptSafety() {
  const source = read('backend/scripts/verify-pilot-operator-status-page-readonly.js');
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

console.log('=== RoofLeadHQ Pilot Operator Status Page Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log(`No SMS, ${providerNames.twilio}, ${providerNames.vapi}, ${providerNames.calendar}, ${providerNames.resend}, or ${providerNames.workflowAssistant} calls.`);
console.log('No route, cron, scheduler, or dispatcher activation.');

const filesPresent = Object.values(files).map(requireFile).every(Boolean);

if (filesPresent) {
  const pageSource = read(files.page);
  const routeSource = read(files.internalAdminRoute);

  checkProtectedEndpoint(routeSource);
  checkSafeDomRendering(pageSource);
  checkNoProviderTriggerStrings(pageSource);
}

checkScriptSafety();

if (process.exitCode) {
  console.error('FAIL: Pilot operator status page read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Pilot operator status page read-only verification passed.');
