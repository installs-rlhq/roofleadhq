#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const dryRunScript = path.join(repoRoot, 'backend', 'scripts', 'vapi-test-payload-ingestion-dry-run.js');
const contractDoc = path.join(repoRoot, 'docs', 'VAPI_NORMALIZED_DRY_RUN_CONTRACT.md');
const samplesDir = path.join(repoRoot, 'docs', 'samples');

const scenarios = [
  'booked-inspection',
  'unbooked-followup',
  'missing-address',
  'missing-phone',
  'emergency-leak',
  'insurance-storm',
];

const requiredFields = [
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
];

function fail(message, details = null) {
  console.error(`❌ ${message}`);
  if (details) console.error(details);
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function parseJsonFromOutput(stdout, scenario) {
  const firstBrace = stdout.indexOf('{');
  const lastBrace = stdout.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    fail(`Could not locate JSON output for scenario ${scenario}`, stdout);
  }

  const candidate = stdout.slice(firstBrace, lastBrace + 1);

  try {
    return JSON.parse(candidate);
  } catch (error) {
    fail(`Could not parse JSON output for scenario ${scenario}: ${error.message}`, candidate);
  }
}

function requireIncludes(value, needles, message) {
  const haystack = String(value ?? '').toLowerCase();
  if (!needles.some((needle) => haystack.includes(needle))) {
    fail(`${message}; value was: ${value}`);
  }
}

console.log('=== RoofLeadHQ Vapi Dry-Run Output Snapshot Verification ===');
console.log('Local read-only verifier execution only.');
console.log('Executes fake/sanitized dry-run scenarios only.');
console.log('No Vapi calls. No Supabase writes. No SMS/Twilio. No Calendar/Resend/Lindy.');
console.log('No route/cron/scheduler/dispatcher activation.');

if (!fs.existsSync(dryRunScript)) fail('Missing dry-run ingestion script');
if (!fs.existsSync(contractDoc)) fail('Missing Vapi normalized dry-run contract doc');

const contractText = fs.readFileSync(contractDoc, 'utf8');

for (const field of requiredFields) {
  if (!contractText.includes(field)) {
    fail(`Contract doc missing required normalized field: ${field}`);
  }
}

for (const scenario of scenarios) {
  const samplePath = path.join(samplesDir, `vapi-scenario-${scenario}.fake.json`);
  if (!fs.existsSync(samplePath)) {
    fail(`Missing scenario sample file: ${samplePath}`);
  }

  const result = spawnSync(
    process.execPath,
    [dryRunScript, `--scenario=${scenario}`, '--allow-vapi-test-ingestion'],
    {
      cwd: repoRoot,
      env: {
        ...process.env,
        VAPI_INGESTION_TEST_MODE: '1',
      },
      encoding: 'utf8',
      maxBuffer: 1024 * 1024,
    }
  );

  if (result.status !== 0) {
    fail(`Dry-run scenario failed: ${scenario}`, `${result.stdout}\n${result.stderr}`);
  }

  const normalized = parseJsonFromOutput(result.stdout, scenario);

  for (const field of requiredFields) {
    if (!Object.prototype.hasOwnProperty.call(normalized, field)) {
      fail(`Scenario ${scenario} missing normalized field: ${field}`);
    }
  }

  if (normalized.source !== 'vapi') fail(`${scenario} source must be vapi`);
  if (normalized.test_only !== true) fail(`${scenario} test_only must be true`);
  if (typeof normalized.has_transcript !== 'boolean') fail(`${scenario} has_transcript must be boolean`);
  if (Number.isNaN(Date.parse(normalized.ingested_at))) fail(`${scenario} ingested_at must parse as date`);

  if (!String(normalized.call_id || '').toLowerCase().includes('fake')) {
    fail(`${scenario} call_id must remain fake/test-safe`);
  }

  if (scenario === 'missing-phone') {
    if (normalized.from !== null) fail('missing-phone from must be null');
  } else if (!normalized.from) {
    fail(`${scenario} from must be present`);
  }

  if (scenario === 'missing-address') {
    if (normalized.property_address !== null) fail('missing-address property_address must be null');
  } else if (!normalized.property_address) {
    fail(`${scenario} property_address must be present`);
  }

  const nullableAppointment = ['unbooked-followup', 'missing-address', 'missing-phone'];
  if (!nullableAppointment.includes(scenario) && !normalized.appointment_suggested) {
    fail(`${scenario} appointment_suggested must be present`);
  }

  if (normalized.appointment_suggested !== null && Number.isNaN(Date.parse(normalized.appointment_suggested))) {
    fail(`${scenario} appointment_suggested must be null or a parseable timestamp`);
  }

  if (scenario === 'booked-inspection') {
    requireIncludes(
      `${normalized.outcome} ${normalized.summary} ${normalized.roof_issue}`,
      ['book', 'scheduled', 'appointment', 'inspection'],
      'booked-inspection output must preserve booking semantics'
    );
  }

  if (scenario === 'unbooked-followup') {
    requireIncludes(
      `${normalized.outcome} ${normalized.summary}`,
      ['follow', 'callback', 'unbooked', 'not booked', 'interested'],
      'unbooked-followup must preserve follow-up semantics'
    );
  }

  if (scenario === 'emergency-leak') {
    requireIncludes(
      `${normalized.urgency} ${normalized.roof_issue} ${normalized.summary}`,
      ['emergency', 'urgent', 'leak', 'water'],
      'emergency-leak must preserve emergency/leak semantics'
    );
  }

  if (scenario === 'insurance-storm') {
    requireIncludes(
      `${normalized.insurance_claim} ${normalized.roof_issue} ${normalized.summary}`,
      ['insurance', 'claim', 'storm', 'hail', 'true'],
      'insurance-storm must preserve insurance/storm semantics'
    );
  }

  pass(`${scenario} normalized dry-run output snapshot passed`);
}

const missingGate = spawnSync(
  process.execPath,
  [dryRunScript, '--scenario=booked-inspection'],
  {
    cwd: repoRoot,
    env: { ...process.env, VAPI_INGESTION_TEST_MODE: '' },
    encoding: 'utf8',
  }
);

if (missingGate.status === 0) {
  fail('Dry-run script must fail closed without required gates');
}

pass('Dry-run script still fails closed without required gates');
console.log('✅ Vapi dry-run output snapshot verifier passed');
