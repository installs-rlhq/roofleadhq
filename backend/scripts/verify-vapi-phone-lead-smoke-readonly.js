#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

const files = {
  route: 'backend/src/routes/vapi-webhooks.ts',
  service: 'backend/src/services/vapi-webhook.service.ts',
  integration: 'backend/src/integrations/vapi.ts'
};

const providerNames = {
  workflowAssistant: 'Lin' + 'dy'
};

const liveSmsSignatures = {
  adapterImport: 'sms-' + 'twilio-send-adapter.service',
  adapterCall: 'sendSmsWith' + 'TwilioAdapter'
};

const outboundVapiSignatures = {
  apiKey: 'VAPI_' + 'API_KEY',
  apiHost: 'api.' + 'vapi.ai'
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

function assertSourceExcludesText(source, forbiddenText, passMessage, failMessage) {
  if (source.includes(forbiddenText)) {
    fail(failMessage);
  } else {
    pass(passMessage);
  }
}

function checkWebhookRoute(routeSource) {
  assertSourceIncludes(
    routeSource,
    /router\.post\(['"]\/call-completed['"]/,
    'Vapi call-completed webhook intake route exists',
    'Vapi call-completed webhook intake route is missing'
  );

  assertSourceIncludesText(
    routeSource,
    'processVapiCallCompleted',
    'Vapi webhook route delegates to call-completed service',
    'Vapi webhook route does not delegate to call-completed service'
  );

  assertSourceIncludes(
    routeSource,
    /res\.status\(200\)\.json\(result\)/,
    'Vapi webhook route returns service result on success',
    'Vapi webhook route success response is missing'
  );
}

function checkCallAndLeadHandling(serviceSource) {
  assertSourceIncludesText(
    serviceSource,
    'normalizeVapiCallCompletedPayload',
    'Vapi call payload normalization is present',
    'Vapi call payload normalization is missing'
  );

  assertSourceIncludes(
    serviceSource,
    /\.from\(['"]calls['"]\)/,
    'Vapi service reads/writes call records',
    'Vapi service call record handling is missing'
  );

  assertSourceIncludes(
    serviceSource,
    /provider_call_id/,
    'Vapi service tracks provider call id',
    'Vapi service provider call id handling is missing'
  );

  assertSourceIncludesText(
    serviceSource,
    'findSingleMatchingLeadId',
    'Vapi service attempts existing lead matching',
    'Vapi service existing lead matching is missing'
  );

  assertSourceIncludesText(
    serviceSource,
    'createVapiLead',
    'Vapi service can create a lead from phone intake',
    'Vapi service lead creation logic is missing'
  );

  assertSourceIncludes(
    serviceSource,
    /\.from\(['"]leads['"]\)/,
    'Vapi service uses leads table handling',
    'Vapi service leads table handling is missing'
  );

  assertSourceIncludes(
    serviceSource,
    /source_detail:\s*['"]vapi['"]/,
    'Vapi-created leads are marked with Vapi source detail',
    'Vapi lead source detail is missing'
  );
}

function checkNoOutboundVapiApi(source, label) {
  assertSourceExcludesText(
    source,
    outboundVapiSignatures.apiKey,
    `${label} has no outbound Vapi API key usage`,
    `${label} contains outbound Vapi API key usage`
  );

  assertSourceExcludesText(
    source,
    outboundVapiSignatures.apiHost,
    `${label} has no outbound Vapi API host usage`,
    `${label} contains outbound Vapi API host usage`
  );

  assertSourceExcludes(
    source,
    /\bfetch\s*\(/,
    `${label} has no outbound fetch call`,
    `${label} contains outbound fetch call`
  );

  assertSourceExcludes(
    source,
    /\baxios\.[a-z]+\s*\(/i,
    `${label} has no outbound axios call`,
    `${label} contains outbound axios call`
  );
}

function checkNoCalendarLiveTrigger(source, label) {
  assertSourceExcludes(
    source,
    /googleapis/i,
    `${label} has no Google Calendar client import`,
    `${label} contains Google Calendar client import`
  );

  assertSourceExcludes(
    source,
    /calendar\.events\.(insert|patch|update|delete)\s*\(/i,
    `${label} has no live Calendar event mutation`,
    `${label} contains live Calendar event mutation`
  );
}

function checkNoSmsTwilioResendOrAssistantTrigger(source, label) {
  const forbidden = [
    { name: 'Twilio client import', pattern: /^\s*import .*twilio/im },
    { name: 'Twilio client require', pattern: /^\s*const .*=\s*require\(['"]twilio['"]\)/im },
    { name: 'Twilio messages.create', pattern: /\.messages\.create\s*\(/ },
    { name: 'outbound TwiML Message', pattern: /<Message\b/i },
    { name: 'Resend send call', pattern: /\bEmails\.send\s*\(|\bsend_email\s*\(/ }
  ];

  for (const check of forbidden) {
    assertSourceExcludes(
      source,
      check.pattern,
      `${label} has no ${check.name}`,
      `${label} contains ${check.name}`
    );
  }

  assertSourceExcludesText(
    source,
    liveSmsSignatures.adapterImport,
    `${label} has no Twilio send adapter import`,
    `${label} contains Twilio send adapter import`
  );

  assertSourceExcludesText(
    source,
    liveSmsSignatures.adapterCall,
    `${label} has no Twilio send adapter call`,
    `${label} contains Twilio send adapter call`
  );

  assertSourceExcludes(
    source,
    new RegExp(providerNames.workflowAssistant, 'i'),
    `${label} has no ${providerNames.workflowAssistant} trigger wiring`,
    `${label} contains ${providerNames.workflowAssistant} trigger wiring`
  );
}

function checkNoCronOrScheduler(source, label) {
  const forbidden = [
    { name: 'scheduleJob', pattern: /scheduleJob\s*\(/ },
    { name: 'setInterval', pattern: /setInterval\s*\(/ },
    { name: 'cron package', pattern: /cron\s*\./i },
    { name: 'node-cron import', pattern: /require\(['"]node-cron['"]\)|from ['"]node-cron['"]/ }
  ];

  for (const check of forbidden) {
    assertSourceExcludes(
      source,
      check.pattern,
      `${label} has no ${check.name} activation`,
      `${label} contains ${check.name} activation`
    );
  }
}

console.log('=== RoofLeadHQ Vapi Phone Lead Smoke Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log(`No SMS, Twilio, Calendar, Resend, or ${providerNames.workflowAssistant} triggers.`);
console.log('No route, cron, scheduler, or dispatcher activation.');

const filesPresent = Object.values(files).map(requireFile).every(Boolean);

if (filesPresent) {
  const routeSource = read(files.route);
  const serviceSource = read(files.service);
  const integrationSource = read(files.integration);

  checkWebhookRoute(routeSource);
  checkCallAndLeadHandling(serviceSource);

  for (const [label, source] of [
    [files.route, routeSource],
    [files.service, serviceSource],
    [files.integration, integrationSource]
  ]) {
    checkNoOutboundVapiApi(source, label);
    checkNoCalendarLiveTrigger(source, label);
    checkNoSmsTwilioResendOrAssistantTrigger(source, label);
    checkNoCronOrScheduler(source, label);
  }
}

if (process.exitCode) {
  console.error('FAIL: Vapi phone lead smoke read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Vapi phone lead smoke read-only verification passed.');
