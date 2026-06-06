#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const samplesDir = path.join(repoRoot, 'docs', 'samples');

const scenarios = {
  'booked-inspection': {
    file: 'vapi-scenario-booked-inspection.fake.json',
    any: ['book', 'booked', 'appointment', 'inspection', 'scheduled'],
  },
  'unbooked-followup': {
    file: 'vapi-scenario-unbooked-followup.fake.json',
    any: ['follow', 'follow-up', 'callback', 'call back', 'unbooked', 'no appointment'],
  },
  'missing-address': {
    file: 'vapi-scenario-missing-address.fake.json',
    any: ['missing', 'address', 'location', 'property'],
  },
  'missing-phone': {
    file: 'vapi-scenario-missing-phone.fake.json',
    any: ['missing', 'phone', 'number', 'callback'],
  },
  'emergency-leak': {
    file: 'vapi-scenario-emergency-leak.fake.json',
    any: ['emergency', 'urgent', 'leak', 'water'],
  },
  'insurance-storm': {
    file: 'vapi-scenario-insurance-storm.fake.json',
    any: ['insurance', 'claim', 'storm', 'hail'],
  },
};

const forbiddenPatterns = [
  /sk_live/i,
  /service_role_key/i,
  /supabase_service_role/i,
  /authorization:\s*bearer/i,
  /api[_-]?key/i,
  /secret/i,
  /password/i,
  /localhost:\d+/i,
];

function fail(message) {
  console.error(`❌ ${message}`);
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function flatten(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) return value.map(flatten).join(' ');
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([key, nested]) => `${key} ${flatten(nested)}`)
      .join(' ');
  }
  return '';
}

console.log('=== RoofLeadHQ Vapi Scenario Sample Files Verification ===');
console.log('Local read-only verifier execution only.');
console.log('Validates fake/sanitized JSON samples only. No external calls. No writes.');

if (!fs.existsSync(samplesDir)) {
  fail('docs/samples directory does not exist');
}

const seenFiles = new Set();

for (const [scenario, config] of Object.entries(scenarios)) {
  const filePath = path.join(samplesDir, config.file);
  seenFiles.add(config.file);

  if (!fs.existsSync(filePath)) {
    fail(`Missing sample file for ${scenario}: ${config.file}`);
  }

  if (!config.file.endsWith('.fake.json')) {
    fail(`Scenario sample file must use .fake.json suffix: ${config.file}`);
  }

  const raw = fs.readFileSync(filePath, 'utf8');

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    fail(`Invalid JSON in ${config.file}: ${error.message}`);
  }

  const haystack = `${config.file} ${flatten(parsed)}`.toLowerCase();

  if (!haystack.includes(scenario)) {
    fail(`${config.file} must include scenario marker ${scenario}`);
  }

  if (!/(fake|test|sanitized|sample|example|555|\+1555|example\.com)/i.test(haystack)) {
    fail(`${config.file} must include a fake/test/sanitized/sample marker`);
  }

  const semanticHit = config.any.some((needle) => haystack.includes(needle.toLowerCase()));
  if (!semanticHit) {
    fail(`${config.file} does not preserve expected ${scenario} semantics`);
  }

  for (const pattern of forbiddenPatterns) {
    if (pattern.test(raw)) {
      fail(`${config.file} contains forbidden production-looking token: ${pattern}`);
    }
  }

  pass(`${scenario} sample exists, parses, is fake/sanitized, and preserves scenario semantics`);
}

const sampleFiles = fs.readdirSync(samplesDir)
  .filter((file) => file.startsWith('vapi-scenario-') && file.endsWith('.json'));

for (const file of sampleFiles) {
  if (!file.endsWith('.fake.json')) {
    fail(`Unexpected non-fake Vapi scenario JSON file: ${file}`);
  }
}

for (const expected of Object.values(scenarios).map((scenario) => scenario.file)) {
  if (!sampleFiles.includes(expected)) {
    fail(`Expected scenario sample not found in docs/samples listing: ${expected}`);
  }
}

const dryRunScriptPath = path.join(repoRoot, 'backend', 'scripts', 'vapi-test-payload-ingestion-dry-run.js');
if (!fs.existsSync(dryRunScriptPath)) {
  fail('vapi-test-payload-ingestion-dry-run.js does not exist');
}

const dryRunScript = fs.readFileSync(dryRunScriptPath, 'utf8');
for (const [scenario, config] of Object.entries(scenarios)) {
  if (!dryRunScript.includes(scenario) && !dryRunScript.includes(config.file)) {
    fail(`Dry-run ingestion script does not reference ${scenario} or ${config.file}`);
  }
}

pass('All six Vapi fake/sanitized scenario sample files are guarded directly');
console.log('✅ Vapi scenario sample files verifier passed');
