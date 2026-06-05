#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const routeFile = 'backend/src/routes/internal-admin.ts';

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

function endpointSource(routeSource) {
  const start = routeSource.indexOf("router.get('/pilot-readiness-status'");
  const nextRoute = routeSource.indexOf("router.get('/admin-errors'", start);

  if (start === -1) return '';
  return routeSource.slice(start, nextRoute === -1 ? undefined : nextRoute);
}

function checkEndpointContract(source) {
  assertSourceIncludes(
    source,
    /router\.get\(['"]\/pilot-readiness-status['"]/,
    'pilot-readiness-status endpoint exists',
    'pilot-readiness-status endpoint is missing'
  );

  assertSourceIncludesText(
    source,
    'authorizeInternalAdmin(req, res)',
    'Endpoint requires authorizeInternalAdmin(req, res)',
    'Endpoint does not require authorizeInternalAdmin(req, res)'
  );

  assertSourceIncludesText(
    source,
    'summary: readiness.summary',
    'Endpoint returns readiness summary',
    'Endpoint does not return readiness summary'
  );

  assertSourceIncludesText(
    source,
    'smoke',
    'Endpoint returns smoke verifier statuses',
    'Endpoint does not return smoke verifier statuses'
  );

  assertSourceIncludesText(
    source,
    'live_automation: readiness.live_automation',
    'Endpoint returns live_automation status',
    'Endpoint does not return live_automation status'
  );

  assertSourceIncludes(
    source,
    /read_only:\s*true/,
    'Endpoint returns read_only true',
    'Endpoint does not return read_only true'
  );

  assertSourceIncludes(
    source,
    /actions_available:\s*false/,
    'Endpoint returns actions_available false',
    'Endpoint does not return actions_available false'
  );
}

function checkNoUnsafeEndpointBehavior(source) {
  const forbidden = [
    { name: 'Supabase write', pattern: /\.(insert|update|upsert|delete|rpc)\s*\(/ },
    { name: 'external fetch', pattern: /\bfetch\s*\(/ },
    { name: 'HTTP client call', pattern: /\baxios\./ },
    { name: 'live action button/control HTML', pattern: /<button\b|<input\b|<form\b/i },
    { name: 'Twilio client import', pattern: /require\(['"]twilio['"]\)|from ['"]twilio['"]/i },
    { name: 'Twilio messages.create', pattern: /\.messages\.create\s*\(/ },
    { name: 'Vapi API key usage', pattern: /VAPI_API_KEY/ },
    { name: 'Vapi API host usage', pattern: /api\.vapi\.ai/i },
    { name: 'Google Calendar event mutation', pattern: /calendar\.events\.(insert|patch|update|delete)\s*\(/i },
    { name: 'Resend email send', pattern: /Emails\.send\s*\(|send_email\s*\(/ },
    { name: `${providerNames.workflowAssistant} trigger`, pattern: /LINDY_API_KEY|lindy\.ai|api\.lindy/i },
    { name: 'cron or scheduler activation', pattern: /scheduleJob\s*\(|setInterval\s*\(|cron\s*\./i },
    { name: 'dispatcher activation', pattern: /runSmsDispatcher\s*\(|executeSmsDispatcher\s*\(|startSmsDispatcher\s*\(/i }
  ];

  for (const check of forbidden) {
    assertSourceExcludes(
      source,
      check.pattern,
      `Endpoint has no ${check.name}`,
      `Endpoint contains ${check.name}`
    );
  }
}

function checkScriptSafety() {
  const source = read('backend/scripts/verify-pilot-operator-status-endpoint-readonly.js');
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

console.log('=== RoofLeadHQ Pilot Operator Status Endpoint Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log(`No SMS, ${providerNames.twilio}, ${providerNames.vapi}, ${providerNames.calendar}, ${providerNames.resend}, or ${providerNames.workflowAssistant} calls.`);
console.log('No route, cron, scheduler, or dispatcher activation.');

if (requireFile(routeFile)) {
  const routeSource = read(routeFile);
  const source = endpointSource(routeSource);

  if (!source) {
    fail('pilot-readiness-status endpoint source could not be isolated');
  } else {
    pass('pilot-readiness-status endpoint source isolated');
    checkEndpointContract(source);
    checkNoUnsafeEndpointBehavior(source);
  }
}

checkScriptSafety();

if (process.exitCode) {
  console.error('FAIL: Pilot operator status endpoint read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Pilot operator status endpoint read-only verification passed.');
