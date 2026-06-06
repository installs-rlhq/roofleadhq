#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const docPath = path.join(repoRoot, 'docs', 'VAPI_NORMALIZED_DRY_RUN_CONTRACT.md');

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function requireIncludes(content, needle, label = needle) {
  if (!content.includes(needle)) {
    fail(`Missing ${label}`);
  }
}

function requireAny(content, needles, label) {
  if (!needles.some((needle) => content.includes(needle))) {
    fail(`Missing ${label}: expected one of ${needles.join(' | ')}`);
  }
}

if (!fs.existsSync(docPath)) {
  fail('docs/VAPI_NORMALIZED_DRY_RUN_CONTRACT.md does not exist');
}

const content = fs.readFileSync(docPath, 'utf8');

[
  'source',
  'call_id',
  'from',
  'to',
  'started_at',
  'ended_at',
  'homeowner_name',
  'email',
  'property_address',
  'roof_issue',
  'urgency',
  'insurance_claim',
  'outcome',
  'appointment_suggested',
  'summary',
  'has_transcript',
  'test_only',
  'ingested_at',
].forEach((field) => requireIncludes(content, field, `normalized field ${field}`));

[
  'booked-inspection',
  'unbooked-followup',
  'missing-address',
  'missing-phone',
  'emergency-leak',
  'insurance-storm',
].forEach((scenario) => requireIncludes(content, scenario, `scenario ${scenario}`));

requireIncludes(content, 'scenario-specific', 'scenario-specific contract language');
requireIncludes(content, 'emergency-leak', 'emergency-leak semantics');
requireIncludes(content, 'insurance-storm', 'insurance-storm semantics');

requireAny(content, ['from may be null only for `missing-phone`', '`from` may be null only for `missing-phone`'], 'missing-phone nullable phone rule');
requireAny(content, ['property_address may be null only for `missing-address`', '`property_address` may be null only for `missing-address`'], 'missing-address nullable address rule');
requireAny(content, ['appointment_suggested may be null only for `unbooked-followup`, `missing-address`, or `missing-phone`', '`appointment_suggested` may be null only for `unbooked-followup`, `missing-address`, or `missing-phone`'], 'appointment_suggested nullable rule');

[
  ['no live Vapi calls', 'live Vapi calls'],
  ['no Supabase writes', 'Supabase writes'],
  ['no SMS', 'SMS'],
  ['no Twilio', 'Twilio'],
  ['no Calendar', 'Calendar'],
  ['no Resend', 'Resend'],
  ['no Lindy', 'Lindy'],
  ['no routes', 'routes'],
  ['no cron', 'cron'],
  ['no scheduler', 'scheduler'],
  ['no dispatcher', 'dispatcher'],
].forEach(([preferred, fallback]) => {
  if (!content.includes(preferred) && !content.includes(fallback)) {
    fail(`Missing safety posture: ${preferred}`);
  }
});

requireIncludes(content, 'test_only', 'test-only contract marker');

console.log('✅ Vapi normalized dry-run contract doc verifier passed');
