#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

const files = {
  route: 'backend/src/routes/manual-outreach.ts',
  service: 'backend/src/services/manual-outreach.service.ts',
  webhooks: 'backend/src/routes/webhooks.ts'
};

const providerNames = {
  vapi: 'vapi',
  calendar: 'calendar',
  resend: 'resend',
  workflowAssistant: 'Lin' + 'dy'
};

const liveSmsSignatures = {
  adapterImport: 'sms-' + 'twilio-send-adapter.service',
  adapterCall: 'sendSmsWith' + 'TwilioAdapter'
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

function checkDryRunRoute(routeSource) {
  assertSourceIncludes(
    routeSource,
    /router\.post\(['"]\/test['"]/,
    'Manual Outreach exposes test endpoint',
    'Manual Outreach test endpoint is missing'
  );

  assertSourceIncludes(
    routeSource,
    /dry_run:\s*boolean/,
    'Manual Outreach request contract includes dry_run',
    'Manual Outreach request contract is missing dry_run'
  );

  assertSourceIncludes(
    routeSource,
    /if\s*\(\s*!body\.dry_run\s*\)/,
    'Manual Outreach test endpoint rejects non-dry-run requests',
    'Manual Outreach test endpoint does not reject non-dry-run requests'
  );

  assertSourceIncludes(
    routeSource,
    /This endpoint only accepts dry_run:\s*true/,
    'Manual Outreach non-dry-run rejection message is explicit',
    'Manual Outreach non-dry-run rejection message is missing'
  );

  assertSourceIncludes(
    routeSource,
    /dry_run:\s*true/,
    'Manual Outreach test response reports dry_run true',
    'Manual Outreach test response does not report dry_run true'
  );
}

function checkTwilioWebhook(webhookSource) {
  const emptyTwiMlPattern = /<Response><\/Response>/;

  assertSourceIncludes(
    webhookSource,
    /\/twilio\/manual-outreach/,
    'Twilio Manual Outreach webhook route exists',
    'Twilio Manual Outreach webhook route is missing'
  );

  assertSourceIncludes(
    webhookSource,
    emptyTwiMlPattern,
    'Twilio webhook returns empty TwiML responses',
    'Twilio webhook empty TwiML response is missing'
  );

  assertSourceExcludes(
    webhookSource,
    /<Message\b/i,
    'Twilio webhook has no outbound TwiML Message',
    'Twilio webhook contains outbound TwiML Message'
  );

  assertSourceExcludes(
    webhookSource,
    /\.messages\.create\s*\(/,
    'Twilio webhook has no provider SMS send call',
    'Twilio webhook contains provider SMS send call'
  );
}

function checkNoLiveSmsSend(source, label) {
  const forbidden = [
    { name: 'Twilio messages.create', pattern: /\.messages\.create\s*\(/ },
    { name: 'outbound TwiML Message', pattern: /<Message\b/i }
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
}

function checkNoProviderTriggers(source, label) {
  const providers = [
    providerNames.vapi,
    providerNames.calendar,
    providerNames.resend,
    providerNames.workflowAssistant
  ];

  for (const provider of providers) {
    const pattern = new RegExp(provider, 'i');
    assertSourceExcludes(
      source,
      pattern,
      `${label} has no ${provider} trigger wiring`,
      `${label} contains ${provider} trigger wiring`
    );
  }
}

console.log('=== RoofLeadHQ Manual Outreach Smoke Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log(`No external service calls, SMS sends, or ${providerNames.workflowAssistant} triggers.`);
console.log('No route, cron, scheduler, or dispatcher activation.');

const filesPresent = Object.values(files).map(requireFile).every(Boolean);

if (filesPresent) {
  const routeSource = read(files.route);
  const serviceSource = read(files.service);
  const webhookSource = read(files.webhooks);

  checkDryRunRoute(routeSource);
  checkTwilioWebhook(webhookSource);

  checkNoLiveSmsSend(routeSource, files.route);
  checkNoLiveSmsSend(serviceSource, files.service);
  checkNoLiveSmsSend(webhookSource, files.webhooks);

  checkNoProviderTriggers(routeSource, files.route);
  checkNoProviderTriggers(serviceSource, files.service);
}

if (process.exitCode) {
  console.error('FAIL: Manual Outreach smoke read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Manual Outreach smoke read-only verification passed.');
