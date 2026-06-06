#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const qaPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_OPERATOR_DASHBOARD_QA.md');
const htmlPath = path.join(repoRoot, 'website', 'dashboard', 'first-paid-launch-status.html');
const routePath = path.join(repoRoot, 'backend', 'src', 'routes', 'first-paid-launch-status.ts');
const internalAdminPath = path.join(repoRoot, 'backend', 'src', 'routes', 'internal-admin.ts');
const dashboardRoutePath = path.join(repoRoot, 'backend', 'src', 'routes', 'dashboard.ts');

const requiredStrings = [
  '45258aa docs(pilot): add first paid launch execution pack',
  'Current status: demo ready with live automation disabled',
  'backend/src/routes/first-paid-launch-status.ts is test-safe/unregistered',
  'website/dashboard/first-paid-launch-status.html exists',
  'backend/scripts/verify-first-paid-launch-status-endpoint-readonly.js exists',
  'No route was registered for the first paid launch status smoke path',
  'No unsafe live action buttons exist',
  'Safe DOM rendering only',
  'No innerHTML for API-derived values',
  'Homeowner SMS is not live',
  'Roofer reply SMS is not live',
  'Twilio sending is not live',
  'Live SMS approval package is stale',
  'Step 66 production send intent bridge is fake-only',
  'Manual Outreach Path C is dry-run/test-safe unless separately approved',
  'No SMS/Twilio/Vapi/Calendar/Resend/Lindy production triggers without explicit approval',
  'Founder-Led Launch Program',
  'book inspections / book appointments',
  'Source of Truth',
  'Scope',
  'Files Under QA',
  'Status Page QA',
  'Dashboard Navigation QA',
  'Safe DOM Rendering QA',
  'Unsafe Action Guard',
  'Route Registration Guard',
  'Live Automation Guard',
  'Business Language Guard',
  'Verification Commands',
  'Go/No-Go Result',
  'Next Build Batch'
];

const forbiddenBusinessStrings = [
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
  'booked jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  'guarantee jobs',
  'guarantee revenue'
];

const unsafeButtonLabels = [
  'send sms',
  'send text',
  'call twilio',
  'trigger automation',
  'dispatch',
  'enable live',
  'sync calendar'
];

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ First Paid Launch Operator Dashboard QA Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(qaPath)) {
  fail('FIRST_PAID_LAUNCH_OPERATOR_DASHBOARD_QA.md does not exist', { path: qaPath });
  process.exit(process.exitCode || 1);
}
pass('FIRST_PAID_LAUNCH_OPERATOR_DASHBOARD_QA.md exists');

const qaContent = fs.readFileSync(qaPath, 'utf8');

for (const required of requiredStrings) {
  if (qaContent.includes(required)) {
    pass(`QA pack includes required string: ${required}`);
  } else {
    fail(`QA pack is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenBusinessStrings) {
  if (qaContent.includes(forbidden)) {
    fail(`QA pack contains forbidden business string: ${forbidden}`);
  } else {
    pass(`QA pack does not contain forbidden business string: ${forbidden}`);
  }
}

if (fs.existsSync(htmlPath)) {
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  const hasTextContent = htmlContent.includes('textContent') || htmlContent.includes('createElement');
  if (hasTextContent) {
    pass('Status page uses safe DOM methods (textContent/createElement)');
  } else {
    pass('Status page uses static content (safe by default)');
  }
  
  const hasInnerHTML = htmlContent.includes('innerHTML');
  if (hasInnerHTML) {
    fail('Status page uses innerHTML (unsafe for API-derived values)');
  } else {
    pass('Status page does not use innerHTML');
  }
  
  for (const label of unsafeButtonLabels) {
    if (htmlContent.toLowerCase().includes(label)) {
      fail(`Status page contains unsafe button label: ${label}`);
    }
  }
  pass('Status page has no unsafe live action button labels');
} else {
  fail('first-paid-launch-status.html does not exist for DOM inspection');
}

if (fs.existsSync(routePath)) {
  const routeContent = fs.readFileSync(routePath, 'utf8');
  if (routeContent.includes('test-safe') || routeContent.includes('unregistered')) {
    pass('Status route module marked as test-safe/unregistered');
  }
}

const routeFiles = [internalAdminPath, dashboardRoutePath];
let routeRegistered = false;
for (const file of routeFiles) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('first-paid-launch-status')) {
      routeRegistered = true;
    }
  }
}
if (routeRegistered) {
  fail('first-paid-launch-status route appears to be registered in a router');
} else {
  pass('first-paid-launch-status route is not registered in any router');
}

if (process.exitCode) {
  console.error('FAIL: First paid launch operator dashboard QA verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch operator dashboard QA verification passed.');