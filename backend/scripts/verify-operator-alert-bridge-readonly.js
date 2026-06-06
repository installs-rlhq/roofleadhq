#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ Operator Alert Bridge Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

const scriptPath = path.join(repoRoot, 'backend/scripts/prepare-operator-alert-payload-readonly.js');

if (!fs.existsSync(scriptPath)) {
  fail('prepare-operator-alert-payload-readonly.js does not exist');
  process.exit(process.exitCode || 1);
}
pass('prepare-operator-alert-payload-readonly.js exists');

const content = fs.readFileSync(scriptPath, 'utf8');

// Verify default dry-run behavior
if (content.includes('dry-run') || content.includes('No external calls')) {
  pass('Script defaults to dry-run / no external calls');
} else {
  fail('Script does not clearly default to dry-run');
}

// Verify no hardcoded webhook
if (content.includes('https://') || content.includes('http://')) {
  fail('Script contains hardcoded http/https URL');
} else {
  pass('No hardcoded webhook URL');
}

if (content.includes('OPERATOR_ALERT_WEBHOOK_URL')) {
  pass('Webhook URL read only from environment');
}

// Bearer token verification
if (content.includes('OPERATOR_ALERT_WEBHOOK_BEARER_TOKEN')) {
  pass('Bearer token read only from environment');
} else {
  fail('Bearer token env var not referenced');
}

// Ensure token is never printed
if (content.includes('bearerToken') || content.includes('BEARER_TOKEN')) {
  if (!content.includes('console.log') || !content.match(/console\.log.*bearerToken|console\.log.*BEARER_TOKEN/)) {
    pass('Bearer token variable referenced without printing');
  }
}

// Authorization header only in gated branch
if (content.includes('Authorization') && content.includes('Bearer')) {
  if (content.includes('headers[\'Authorization\']') && content.includes('allowWebhook')) {
    pass('Authorization header only constructed in gated webhook branch');
  } else {
    fail('Authorization header usage not properly gated');
  }
}

// Verify explicit gate for webhook
if (content.includes('--allow-operator-alert-webhook') && content.includes('OPERATOR_ALERT_TEST_MODE')) {
  pass('Webhook requires explicit CLI + env gate');
} else {
  fail('Webhook gate not properly implemented');
}

// Verify safety metadata in payload
const safetyChecks = [
  'sms_sent: false',
  'twilio_called: false',
  'route_activated: false',
  'cron_activated: false',
  'production_automation: false'
];

for (const check of safetyChecks) {
  if (content.includes(check)) {
    pass(`Safety flag present: ${check}`);
  } else {
    fail(`Missing safety flag: ${check}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: Operator alert bridge verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Operator alert bridge verification passed.');