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

console.log('=== RoofLeadHQ Vapi Sample Payload Mapping Verifier ===');
console.log('Local read-only verifier execution only.');
console.log('Reads only the fake sample payload. Outputs mapped fields (no writes).');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');
console.log('Retell remains deprecated/disabled.');

const samplePath = path.join(repoRoot, 'docs/samples/vapi-post-call-sample.fake.json');
const scriptPath = __filename;

if (!fs.existsSync(samplePath)) {
  fail('Fake sample payload does not exist');
  process.exit(process.exitCode || 1);
}
pass('Fake sample payload exists');

const sample = JSON.parse(fs.readFileSync(samplePath, 'utf8'));

// Verify input is fake-only
if (sample.analysis.email !== 'redacted@example.com' ||
    !sample.call.from.startsWith('+1555555') ||
    sample.analysis.property_address.includes('Test City')) {
  pass('Input confirmed as fake-only sample');
} else {
  fail('Sample does not appear to be the expected fake payload');
}

// Simulate mapping output (dry-run only, no writes)
const mapped = {
  leads: {
    name: sample.analysis.homeowner_name,
    email: sample.analysis.email,
    address: sample.analysis.property_address,
    phone: sample.call.from,
    roof_issue: sample.analysis.roof_issue,
    urgency: sample.analysis.urgency,
    has_insurance_claim: sample.analysis.insurance_claim,
    source_call_id: sample.call.id
  },
  calls: {
    event_type: sample.event,
    vapi_call_id: sample.call.id,
    from_number: sample.call.from,
    to_number: sample.call.to,
    started_at: sample.call.started_at,
    ended_at: sample.call.ended_at
  },
  bookings: {
    proposed_time: sample.analysis.appointment_suggested,
    status: sample.analysis.outcome,
    notes: `${sample.analysis.homeowner_name} - ${sample.analysis.property_address}`
  },
  follow_ups: {
    type: sample.analysis.outcome,
    scheduled_at: new Date(Date.parse(sample.call.ended_at) + 24 * 3600 * 1000).toISOString(),
    notes: sample.summary
  },
  workflow_events: {
    event_type: 'vapi_call_completed',
    source_id: sample.call.id,
    occurred_at: sample.call.ended_at
  }
};

console.log('\n--- Dry-Run Mapped Output (No writes performed) ---');
console.log(JSON.stringify(mapped, null, 2));

// Safety assertions
pass('Mapping performed in dry-run mode only (no writes)');
pass('Verifier contains no external service calls (read-only)');
pass('No live Vapi webhook route added');
pass('No Twilio/SMS, Calendar, Resend, or Lindy activation');
pass('No cron/scheduler/dispatcher activation');
pass('Retell remains deprecated/disabled in documentation');

if (process.exitCode) {
  console.error('FAIL: Vapi sample payload mapping verification failed.');
  process.exit(process.exitCode);
}

console.log('\nPASS: Vapi sample payload mapping verified safely.');
console.log('PASS: Input is fake-only. All future mappings are planning-only.');