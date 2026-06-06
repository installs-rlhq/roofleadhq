#!/usr/bin/env node

/**
 * Vapi Test Payload Ingestion Dry-Run Script
 *
 * Purpose: Parse and normalize a sanitized Vapi post-call payload in dry-run mode only.
 * Safety: This script performs NO external calls, NO database writes, and NO production actions.
 */

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

console.log('=== RoofLeadHQ Vapi Test Payload Ingestion Dry-Run ===');
console.log('Default mode: dry-run only. No external calls. No writes.');

// Gate checks
const args = process.argv.slice(2);
const allowIngestion = args.includes('--allow-vapi-test-ingestion');
const testMode = process.env.VAPI_INGESTION_TEST_MODE === '1';

if (!testMode || !allowIngestion) {
  console.error('FAIL: Both VAPI_INGESTION_TEST_MODE=1 and --allow-vapi-test-ingestion are required.');
  console.error('Script is running in fail-closed mode.');
  process.exit(1);
}

pass('Both required gates present (env + CLI flag)');

// Scenario support
const scenarioEqualsArg = args.find(a => a.startsWith('--scenario='));
const scenarioFlagIndex = args.indexOf('--scenario');
const scenario =
  scenarioEqualsArg
    ? scenarioEqualsArg.split('=')[1]
    : scenarioFlagIndex !== -1
      ? args[scenarioFlagIndex + 1]
      : null;

const scenarioMap = {
  'booked-inspection': 'vapi-scenario-booked-inspection.fake.json',
  'unbooked-followup': 'vapi-scenario-unbooked-followup.fake.json',
  'missing-address': 'vapi-scenario-missing-address.fake.json',
  'missing-phone': 'vapi-scenario-missing-phone.fake.json',
  'emergency-leak': 'vapi-scenario-emergency-leak.fake.json',
  'insurance-storm': 'vapi-scenario-insurance-storm.fake.json'
};

let samplePath;
if (scenario) {
  if (!scenarioMap[scenario]) {
    console.error(`FAIL: Unknown scenario. Allowed scenarios: ${Object.keys(scenarioMap).join(', ')}`);
    process.exit(1);
  }
  samplePath = path.join(repoRoot, 'docs/samples', scenarioMap[scenario]);
} else {
  samplePath = path.join(repoRoot, 'docs/samples/vapi-post-call-sample.fake.json');
}

if (!fs.existsSync(samplePath)) {
  fail('Fake sample payload not found');
  process.exit(process.exitCode || 1);
}

let payload;
try {
  payload = JSON.parse(fs.readFileSync(samplePath, 'utf8'));
} catch (e) {
  fail('Failed to parse sample payload', { error: e.message });
  process.exit(process.exitCode || 1);
}

pass('Fake sample payload loaded successfully');

// Basic safety check on payload (allow missing-phone scenario where from is intentionally null)
const isFakePayload =
  payload.call &&
  (payload.call.id && payload.call.id.startsWith('call_fake')) &&
  (payload.call.to && payload.call.to.startsWith('+1555555')) &&
  (scenario === 'missing-phone' || (payload.call.from && payload.call.from.startsWith('+1555555')));

if (!isFakePayload) {
  fail('Payload does not appear to be a valid fake/sanitized test payload');
  process.exit(process.exitCode || 1);
}

// Normalize into internal structure (dry-run only)
const normalized = {
  source: 'vapi',
  call_id: payload.call.id,
  from: payload.call.from,
  to: payload.call.to,
  started_at: payload.call.started_at,
  ended_at: payload.call.ended_at,
  homeowner_name: payload.analysis?.homeowner_name || null,
  email: payload.analysis?.email || null,
  property_address: payload.analysis?.property_address || null,
  roof_issue: payload.analysis?.roof_issue || null,
  urgency: payload.analysis?.urgency || null,
  insurance_claim: payload.analysis?.insurance_claim || false,
  outcome: payload.analysis?.outcome || null,
  appointment_suggested: payload.analysis?.appointment_suggested || null,
  summary: payload.summary || null,
  has_transcript: !!payload.transcript,
  test_only: true,
  ingested_at: new Date().toISOString()
};

console.log('\n--- Normalized Dry-Run Output (No writes performed) ---');
console.log(JSON.stringify(normalized, null, 2));

pass('Payload normalized in dry-run mode only');
pass('No Supabase writes performed');
pass('No SMS/Twilio/Calendar/Resend/Lindy actions triggered');
pass('No route/cron/scheduler/dispatcher activation');
pass('Fake/sanitized payload only');

if (process.exitCode) {
  console.error('FAIL: Vapi test payload ingestion dry-run failed.');
  process.exit(process.exitCode);
}

console.log('\nPASS: Vapi test payload ingestion dry-run completed safely.');