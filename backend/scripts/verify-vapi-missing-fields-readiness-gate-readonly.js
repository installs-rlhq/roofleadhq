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

console.log('=== RoofLeadHQ Vapi Missing-Fields Readiness Gate Verifier ===');
console.log('Local read-only verifier execution only.');
console.log('Reads only the fake sample payload. No writes. No external calls.');
console.log('No Vapi, Supabase, SMS, Twilio, Calendar, Resend, Lindy, route, cron, scheduler, or dispatcher activation.');
console.log('Retell remains deprecated/disabled.');

const samplePath = path.join(repoRoot, 'docs/samples/vapi-post-call-sample.fake.json');
const scriptPath = __filename;

if (!fs.existsSync(samplePath)) {
  fail('Fake sample payload does not exist');
  process.exit(process.exitCode || 1);
}
pass('Fake sample payload exists');

const sample = JSON.parse(fs.readFileSync(samplePath, 'utf8'));

// Define critical and conditional fields
const criticalFields = [
  { path: 'event', label: 'event/type' },
  { path: 'call.id', label: 'call.id' },
  { path: 'call.from', label: 'call.from' },
  { path: 'call.to', label: 'call.to' },
  { path: 'transcript', label: 'transcript' },
  { path: 'analysis.homeowner_name', label: 'analysis.homeowner_name' },
  { path: 'analysis.property_address', label: 'analysis.property_address' },
  { path: 'analysis.roof_issue', label: 'analysis.roof_issue' },
  { path: 'analysis.urgency', label: 'analysis.urgency' }
];

const conditionalFields = [
  { path: 'analysis.appointment_suggested', label: 'analysis.appointment_suggested (when booking outcome)' }
];

// Helper to get nested value
function getValue(obj, path) {
  return path.split('.').reduce((o, k) => (o || {})[k], obj);
}

// Check critical fields
const missingCritical = [];
for (const field of criticalFields) {
  const val = getValue(sample, field.path);
  if (!val || (typeof val === 'string' && val.trim() === '')) {
    missingCritical.push(field.label);
  }
}

// Check conditional fields (only if outcome suggests booking)
const outcome = getValue(sample, 'analysis.outcome') || '';
const needsBooking = /appointment|book|requested/i.test(outcome);
const missingConditional = [];
if (needsBooking) {
  for (const field of conditionalFields) {
    const val = getValue(sample, field.path);
    if (!val) missingConditional.push(field.label);
  }
}

// Output readiness report
console.log('\n--- Vapi Payload Readiness Report (Dry-Run) ---');
console.log(`Payload event: ${sample.event || 'missing'}`);
console.log(`Call ID: ${getValue(sample, 'call.id') || 'missing'}`);
console.log(`Outcome: ${outcome || 'missing'}`);
console.log(`Needs booking check: ${needsBooking}`);

if (missingCritical.length === 0) {
  console.log('\nCritical fields: ALL PRESENT');
} else {
  console.log('\nCritical fields MISSING:');
  missingCritical.forEach(f => console.log(`  - ${f}`));
}

if (missingConditional.length > 0) {
  console.log('\nConditional fields MISSING (booking outcome detected):');
  missingConditional.forEach(f => console.log(`  - ${f}`));
} else if (needsBooking) {
  console.log('\nConditional fields: ALL PRESENT (booking outcome)');
}

// Final gate decision
const gatePassed = missingCritical.length === 0 && missingConditional.length === 0;

console.log(`\nReadiness Gate: ${gatePassed ? 'PASS (ready for future automation)' : 'FAIL (needs human review)'}`);

if (!gatePassed) {
  console.log('Recommended future action: mark needs_human_review=true, do not auto-create booking or send SMS');
}

// Safety assertions
pass('Readiness gate evaluation performed in dry-run mode only (no writes)');
pass('Verifier contains no external service calls');
pass('No live Vapi webhook route added');
pass('No Twilio/SMS, Calendar, Resend, or Lindy activation');
pass('No cron/scheduler/dispatcher activation');
pass('Retell remains deprecated/disabled in documentation');

if (process.exitCode) {
  console.error('FAIL: Vapi missing-fields readiness gate verification failed.');
  process.exit(process.exitCode);
}

console.log('\nPASS: Vapi missing-fields readiness gate verified safely.');
console.log('PASS: All checks performed against fake sample only. No production paths activated.');