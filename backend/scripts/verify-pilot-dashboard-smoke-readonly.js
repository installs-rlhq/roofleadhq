#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

const requiredFiles = [
  'website/dashboard/index.html',
  'website/dashboard/internal-errors.html',
  'backend/src/routes/dashboard.ts',
  'backend/src/routes/internal-admin.ts',
  'backend/src/services/internal-admin-errors.service.ts'
];

const dashboardFiles = [
  'website/dashboard/index.html',
  'website/dashboard/internal-errors.html'
];

const providerNames = {
  sms: 'sms',
  twilio: 'twilio',
  calendar: 'calendar',
  vapi: 'vapi',
  resend: 'resend',
  workflowAssistant: 'Lin' + 'dy'
};

const unsafeLiveActionPatterns = [
  {
    label: 'SMS live action button',
    pattern: /<(button|a)\b[^>]*(send|trigger|start|run|enable|retry)[^>]*(sms|text|twilio)|<(button|a)\b[^>]*(sms|text|twilio)[^>]*(send|trigger|start|run|enable|retry)/i
  },
  {
    label: 'Calendar live action button',
    pattern: /<(button|a)\b[^>]*(create|sync|trigger|start|run|enable|retry)[^>]*(calendar|appointment)|<(button|a)\b[^>]*(calendar|appointment)[^>]*(create|sync|trigger|start|run|enable|retry)/i
  },
  {
    label: 'Vapi live action button',
    pattern: /<(button|a)\b[^>]*(call|trigger|start|run|enable|retry)[^>]*vapi|<(button|a)\b[^>]*vapi[^>]*(call|trigger|start|run|enable|retry)/i
  },
  {
    label: 'Resend live action button',
    pattern: /<(button|a)\b[^>]*(send|trigger|start|run|enable|retry)[^>]*(email|resend)|<(button|a)\b[^>]*(email|resend)[^>]*(send|trigger|start|run|enable|retry)/i
  },
  {
    label: `${providerNames.workflowAssistant} live action button`,
    pattern: new RegExp(
      '<(button|a)\\b[^>]*(trigger|start|run|enable|retry)[^>]*' +
        providerNames.workflowAssistant +
        '|<(button|a)\\b[^>]*' +
        providerNames.workflowAssistant +
        '[^>]*(trigger|start|run|enable|retry)',
      'i'
    )
  },
  {
    label: 'inline provider activation handler',
    pattern: new RegExp(
      'on(click|submit)=["\'][^"\']*(' +
        [
          providerNames.sms,
          providerNames.twilio,
          providerNames.calendar,
          providerNames.vapi,
          providerNames.resend,
          providerNames.workflowAssistant
        ].join('|') +
        ')[^"\']*(send|trigger|start|run|enable|retry)|on(click|submit)=["\'][^"\']*(send|trigger|start|run|enable|retry)[^"\']*(' +
        [
          providerNames.sms,
          providerNames.twilio,
          providerNames.calendar,
          providerNames.vapi,
          providerNames.resend,
          providerNames.workflowAssistant
        ].join('|') +
        ')',
      'i'
    )
  }
];

const forbiddenMarketingPhrases = [
  {
    label: 'book jobs wording',
    pattern: /\bbook\s+jobs\b/i
  },
  {
    label: '7-day pilot wording',
    pattern: /\b7[-\s]?day\s+pilot\b/i
  },
  {
    label: '5 qualified appointments in 7 days wording',
    pattern: /\b5\s+qualified\s+appointments\s+in\s+7\s+days\b/i
  }
];

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

function checkRequiredFiles() {
  for (const file of requiredFiles) {
    if (fs.existsSync(absolute(file))) {
      pass(`${file} exists`);
    } else {
      fail(`${file} is missing`);
    }
  }
}

function checkDashboardContent() {
  for (const file of dashboardFiles) {
    if (!fs.existsSync(absolute(file))) continue;

    const source = read(file);

    for (const check of unsafeLiveActionPatterns) {
      if (check.pattern.test(source)) {
        fail(`${file} has unsafe inline ${check.label}`);
      } else {
        pass(`${file} has no unsafe inline ${check.label}`);
      }
    }

    for (const check of forbiddenMarketingPhrases) {
      if (check.pattern.test(source)) {
        fail(`${file} contains forbidden ${check.label}`);
      } else {
        pass(`${file} has no forbidden ${check.label}`);
      }
    }
  }
}

function checkScriptSafety() {
  const source = read('backend/scripts/verify-pilot-dashboard-smoke-readonly.js');
  const forbidden = [
    { label: 'Supabase client construction', pattern: /createClient\s*\(/ },
    { label: 'Supabase write', pattern: /\.(insert|update|upsert|delete|rpc)\s*\(/ },
    { label: 'Twilio import or client', pattern: /require\(['"]twilio['"]\)|from ['"]twilio['"]|new\s+Twilio|twilio\s*\(/i },
    { label: 'external fetch', pattern: /\bfetch\s*\(/ },
    { label: 'HTTP client call', pattern: /\baxios\./ },
    { label: 'route registration', pattern: /\bapp\.(get|post|put|patch|delete)\s*\(/ },
    { label: 'cron or scheduler activation', pattern: /scheduleJob\s*\(|setInterval\s*\(|setTimeout\s*\(|cron\s*\./i },
    { label: 'dispatcher activation', pattern: /runSmsDispatcher\s*\(|executeSmsDispatcher\s*\(|startSmsDispatcher\s*\(/i }
  ];

  for (const check of forbidden) {
    if (check.pattern.test(source)) {
      fail(`smoke script contains forbidden ${check.label}`);
    } else {
      pass(`smoke script has no ${check.label}`);
    }
  }
}

console.log('=== RoofLeadHQ Pilot Dashboard Smoke Read-Only Verification ===');
console.log('Local file inspection only.');
console.log('No Supabase reads or writes.');
console.log(`No SMS, Twilio, Calendar, Vapi, Resend, or ${providerNames.workflowAssistant} calls.`);
console.log('No route, cron, scheduler, or dispatcher activation.');

checkRequiredFiles();
checkDashboardContent();
checkScriptSafety();

if (process.exitCode) {
  console.error('FAIL: Pilot dashboard smoke read-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Pilot dashboard smoke read-only verification passed.');
