#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const routePath = path.join(repoRoot, 'backend', 'src', 'routes', 'first-paid-launch-status.ts');
const htmlPath = path.join(repoRoot, 'website', 'dashboard', 'first-paid-launch-status.html');
const contractPath = path.join(repoRoot, 'backend', 'src', 'services', 'first-paid-launch-status-contract.service.ts');

const requiredStrings = [
  'first-paid-launch-status-contract.service.ts',
  'demo_ready_with_live_automation_disabled',
  '32d675a feat(pilot): add first paid launch status contract',
  'sms: false',
  'twilio: false',
  'calendar: false',
  'vapiOutbound: false',
  'resend: false',
  'lindy: false',
  'Homeowner SMS is not live',
  'Roofer reply SMS is not live',
  'Twilio sending is not live',
  'Live SMS approval package is stale',
  'Step 66 production send intent bridge is fake-only',
  'Manual Outreach Path C is dry-run/test-safe unless separately approved',
  'No SMS/Twilio/Vapi/Calendar/Resend/Lindy production triggers without explicit approval',
  'Founder-Led Launch Program',
  'book inspections / book appointments'
];

const forbiddenStrings = [
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
  'booked jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  'guarantee jobs',
  'guarantee revenue',
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

console.log('=== RoofLeadHQ First Paid Launch Status Endpoint Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

if (!fs.existsSync(routePath)) {
  fail('first-paid-launch-status.ts does not exist', { path: routePath });
  process.exit(process.exitCode || 1);
}
pass('first-paid-launch-status.ts exists');

if (!fs.existsSync(htmlPath)) {
  fail('first-paid-launch-status.html does not exist', { path: htmlPath });
  process.exit(process.exitCode || 1);
}
pass('first-paid-launch-status.html exists');

const routeContent = fs.readFileSync(routePath, 'utf8');
const htmlContent = fs.readFileSync(htmlPath, 'utf8');
const contractContent = fs.readFileSync(contractPath, 'utf8');

for (const required of requiredStrings) {
  const inRoute = routeContent.includes(required);
  const inHtml = htmlContent.includes(required);
  const inContract = contractContent.includes(required);
  
  if (inRoute || inHtml || inContract) {
    pass(`Status endpoint includes required string: ${required}`);
  } else {
    fail(`Status endpoint is missing required string: ${required}`);
  }
}

for (const forbidden of forbiddenStrings) {
  const inRoute = routeContent.includes(forbidden);
  const inHtml = htmlContent.includes(forbidden);
  
  if (inRoute || inHtml) {
    fail(`Status endpoint contains forbidden string: ${forbidden}`);
  } else {
    pass(`Status endpoint does not contain forbidden string: ${forbidden}`);
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid launch status endpoint verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid launch status endpoint verification passed.');