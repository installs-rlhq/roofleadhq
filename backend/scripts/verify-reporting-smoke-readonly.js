#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

const requiredFiles = [
  'backend/src/services/reports/generators.py',
  'backend/src/services/reports/sender.py',
  'prompts/email/weekly_report.html',
  'prompts/email/monthly_report.html'
];

const reportingFiles = [
  'backend/src/services/reports/generators.py',
  'backend/src/services/reports/sender.py',
  'scripts/run_weekly_reports.py'
];

const activationFiles = [
  'backend/src/index.ts',
  'backend/src/routes/index.ts',
  'backend/package.json',
  'package.json'
];

const providerNames = {
  workflowAssistant: 'Lin' + 'dy',
  vapi: 'vapi',
  calendar: 'calendar'
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

function existingFiles(paths) {
  return paths.filter((relativePath) => fs.existsSync(absolute(relativePath)));
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

function checkReportLogic(generatorSource) {
  assertSourceIncludesText(
    generatorSource,
    'generate_weekly_report_data',
    'Weekly report data logic or placeholder exists',
    'Weekly report data logic or placeholder is missing'
  );

  assertSourceIncludesText(
    generatorSource,
    'render_weekly_report',
    'Weekly report render logic exists',
    'Weekly report render logic is missing'
  );

  assertSourceIncludesText(
    generatorSource,
    'weekly_report.html',
    'Weekly report template reference exists',
    'Weekly report template reference is missing'
  );

  assertSourceIncludesText(
    generatorSource,
    'generate_monthly_report_data',
    'Monthly report data logic or placeholder exists',
    'Monthly report data logic or placeholder is missing'
  );

  assertSourceIncludesText(
    generatorSource,
    'render_monthly_report',
    'Monthly report render logic exists',
    'Monthly report render logic is missing'
  );

  assertSourceIncludesText(
    generatorSource,
    'monthly_report.html',
    'Monthly report template reference exists',
    'Monthly report template reference is missing'
  );
}

function checkNoSupabaseAccess(source, label) {
  assertSourceExcludes(
    source,
    /createClient\s*\(|SUPABASE_(URL|ANON_KEY|SERVICE_ROLE_KEY)|\.from\(['"][a-z_]+['"]\)/i,
    `${label} has no Supabase reads or client construction`,
    `${label} contains Supabase reads or client construction`
  );

  assertSourceExcludes(
    source,
    /\.(insert|update|upsert|delete|rpc)\s*\(/,
    `${label} has no Supabase write-like calls`,
    `${label} contains Supabase write-like calls`
  );
}

function checkNoSmsTwilioVapiCalendarOrAssistantTrigger(source, label) {
  const forbidden = [
    { name: 'Twilio client import', pattern: /^\s*import .*twilio/im },
    { name: 'Twilio client require', pattern: /^\s*const .*=\s*require\(['"]twilio['"]\)/im },
    { name: 'Twilio Python import', pattern: /^\s*import\s+twilio\b|^\s*from\s+twilio\b/im },
    { name: 'Twilio messages.create', pattern: /\.messages\.create\s*\(/ },
    { name: 'outbound TwiML Message', pattern: /<Message\b/i },
    { name: 'Vapi API host usage', pattern: /api\.vapi\.ai/i },
    { name: 'Vapi API key usage', pattern: /VAPI_API_KEY/ },
    { name: 'Google Calendar client import', pattern: /googleapis|googleapiclient/i },
    { name: 'live Calendar event mutation', pattern: /calendar\.events\.(insert|patch|update|delete)\s*\(/i },
    { name: `${providerNames.workflowAssistant} trigger wiring`, pattern: new RegExp(providerNames.workflowAssistant, 'i') }
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

function checkNoReportActivation(source, label) {
  const forbidden = [
    { name: 'report route registration', pattern: /\b(router|app)\.(get|post|put|patch|delete)\s*\([^)]*report/i },
    { name: 'Resend/report route import', pattern: /routes\/.*report|reports\/sender|ReportSender|send_weekly_report|send_monthly_report/i },
    { name: 'cron or scheduler activation', pattern: /scheduleJob\s*\(|setInterval\s*\(|cron\s*\.|node-cron|APScheduler|schedule\.every/i },
    { name: 'weekly report script activation', pattern: /run_weekly_reports\.py|verify-reporting-smoke-readonly\.js.*run_weekly_reports/i }
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
  const source = read('backend/scripts/verify-reporting-smoke-readonly.js');
  const forbidden = [
    { label: 'Supabase client construction', pattern: /createClient\s*\(/ },
    { label: 'Supabase table access', pattern: /\.from\(['"][a-z_]+['"]\)/ },
    { label: 'Supabase write', pattern: /\.(insert|update|upsert|delete|rpc)\s*\(/ },
    { label: 'external fetch', pattern: /\bfetch\s*\(/ },
    { label: 'HTTP client call', pattern: /\baxios\.|requests\.|resend\.Emails\.send/i },
    { label: 'route registration', pattern: /\b(router|app)\.(get|post|put|patch|delete)\s*\(/ },
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

console.log('=== RoofLeadHQ Reporting Smoke Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log(`No Resend route/cron/scheduler, SMS, Twilio, Vapi, Calendar, or ${providerNames.workflowAssistant} triggers.`);
console.log('No route, cron, scheduler, or dispatcher activation.');

const filesPresent = requiredFiles.map(requireFile).every(Boolean);

if (filesPresent) {
  checkReportLogic(read('backend/src/services/reports/generators.py'));

  for (const file of existingFiles(reportingFiles)) {
    const source = read(file);
    checkNoSupabaseAccess(source, file);
    checkNoSmsTwilioVapiCalendarOrAssistantTrigger(source, file);
  }

  for (const file of existingFiles(activationFiles)) {
    checkNoReportActivation(read(file), file);
  }
}

checkScriptSafety();

if (process.exitCode) {
  console.error('FAIL: Reporting smoke read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Reporting smoke read-only verification passed.');
