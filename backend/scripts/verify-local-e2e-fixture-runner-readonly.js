#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.resolve(__dirname, '../..');
const runnerPath = path.join(root, 'backend/scripts/run-local-e2e-fixture-runner.js');
const docPath = path.join(root, 'docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md');
const wrapperPath = path.join(root, 'scripts/run-local-e2e-fixture-runner-dry-run.sh');

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function read(filePath) {
  if (!fs.existsSync(filePath)) fail(`Missing required file: ${path.relative(root, filePath)}`);
  return fs.readFileSync(filePath, 'utf8');
}

const runner = read(runnerPath);
const doc = read(docPath);
const wrapper = read(wrapperPath);

const requiredDocPhrases = [
  'Local E2E Fixture Runner Packet',
  'Staged End-to-End Testing Readiness + Execution Plan',
  'Stage 1 - Fixture dry-run',
  'fixture/sample lead intake',
  'AI response generation',
  'AI follow-up generation',
  'lead qualification',
  'missed-lead recovery path',
  'appointment/inspection readiness',
  'roofer calendar handoff simulation',
  'homeowner/roofer communication review',
  'reporting snapshot',
  'trial/payment language handling',
  'operator visibility and review',
  'PASS/HOLD/BLOCKED',
  'No live sends occurred.',
  'No production writes occurred.',
  'No production Supabase writes occurred.',
  'No calendar event created.',
  'No payment automation occurred.',
  'No credentials or env values read.',
  'Next implementation step after this packet'
];

for (const phrase of requiredDocPhrases) {
  if (!doc.includes(phrase)) fail(`Document missing required phrase: ${phrase}`);
}

const requiredRunnerPhrases = [
  'RoofLeadHQ Local E2E Fixture Runner',
  'LOCAL FIXTURE ONLY',
  'fixture-fast-response-ready',
  'fixture-missed-lead-recovery',
  'fixture-hold-not-service-area',
  'local-e2e-fixture-results.json',
  'local-e2e-fixture-evidence.md',
  'No live SMS',
  'No external sends',
  'No production writes',
  'No production Supabase writes',
  'No calendar booking automation',
  'No payment automation',
  'PASS: local E2E fixture runner completed safely'
];

for (const phrase of requiredRunnerPhrases) {
  if (!runner.includes(phrase)) fail(`Runner missing required phrase: ${phrase}`);
}

const forbiddenRunnerPatterns = [
  /@supabase\/supabase-js/,
  /require\(['"]dotenv['"]\)/,
  /process\.env\.SUPABASE/i,
  /createClient\(/,
  /require\(['"]twilio['"]\)/i,
  /require\(['"]https['"]\)/,
  /require\(['"]http['"]\)/,
  /fetch\(/,
  /axios/i,
  /calendar_event_id/i,
  /confirm_write=true/i,
  /insertOrFail/i,
  /\.from\(['"]/,
  /send real/i,
  /enable live sms/i,
  /send live sms/i,
  /live sms activation/i
];

for (const pattern of forbiddenRunnerPatterns) {
  if (pattern.test(runner)) fail(`Runner contains forbidden implementation pattern: ${pattern}`);
}

const requiredWrapperPhrases = [
  'DRY RUN ONLY',
  'run-local-e2e-fixture-runner.js',
  'verify-local-e2e-fixture-runner-readonly.js',
  'No live SMS',
  'No external sends',
  'No production writes'
];

for (const phrase of requiredWrapperPhrases) {
  if (!wrapper.includes(phrase)) fail(`Wrapper missing required phrase: ${phrase}`);
}

const wiringTargets = [
  'backend/scripts/verify-first-paid-pilot-readiness-readonly.js',
  'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_ROOFER_DRY_RUN_ONBOARDING.md',
  'docs/NEXT_CHAT_CONTEXT_PACKAGE_AGENT_GROK_BUILD_WORKFLOW.md',
  'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md'
];

const commonWiringNeedles = [
  'LOCAL_E2E_FIXTURE_RUNNER_PACKET.md',
  'run-local-e2e-fixture-runner-dry-run.sh',
  'verify-local-e2e-fixture-runner-readonly.js'
];

const fullDocWiringNeedles = [
  ...commonWiringNeedles,
  'run-local-e2e-fixture-runner.js'
];

for (const target of wiringTargets) {
  const content = read(path.join(root, target));
  const needles = target === 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js'
    ? commonWiringNeedles
    : fullDocWiringNeedles;
  for (const needle of needles) {
    if (!content.includes(needle)) fail(`Wiring target ${target} missing ${needle}`);
  }
}

if (!wrapper.includes('verify-agent-product-quality-gate-readonly.js')) {
  fail('Wrapper must invoke agent product quality gate');
}

const outDir = fs.mkdtempSync('/tmp/roofleadhq-local-e2e-verifier-');
const result = spawnSync(process.execPath, [runnerPath], {
  cwd: root,
  env: { ...process.env, ROOFLEADHQ_LOCAL_E2E_OUT_DIR: outDir },
  encoding: 'utf8'
});

if (result.status !== 0) {
  console.error(result.stdout);
  console.error(result.stderr);
  fail('Local E2E fixture runner exited nonzero during verifier execution');
}

if (!result.stdout.includes('PASS: local E2E fixture runner completed safely')) {
  fail('Runner output missing PASS summary');
}

const runDirs = fs.readdirSync(outDir).filter((name) => name.startsWith('local-e2e-fixture-'));
if (runDirs.length !== 1) fail('Expected exactly one local E2E fixture evidence directory');

const evidenceDir = path.join(outDir, runDirs[0]);
const jsonPath = path.join(evidenceDir, 'local-e2e-fixture-results.json');
const mdPath = path.join(evidenceDir, 'local-e2e-fixture-evidence.md');

if (!fs.existsSync(jsonPath)) fail('Missing local E2E JSON evidence artifact');
if (!fs.existsSync(mdPath)) fail('Missing local E2E markdown evidence artifact');

const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

if (json.mode !== 'local_fixture_only') fail('Evidence mode is not local_fixture_only');
if (json.scenario_count !== 3) fail('Expected exactly 3 fixture scenarios');
if (json.safety.external_sends !== false) fail('Evidence says external sends occurred');
if (json.safety.production_writes !== false) fail('Evidence says production writes occurred');
if (json.safety.production_supabase_writes !== false) fail('Evidence says production Supabase writes occurred');
if (json.safety.calendar_events_created !== false) fail('Evidence says calendar events were created');
if (json.safety.payment_automation !== false) fail('Evidence says payment automation occurred');
if (json.safety.credentials_or_env_read !== false) fail('Evidence says credentials/env were read');
if (!json.results.some((item) => item.status === 'PASS')) fail('Expected at least one PASS fixture');
if (!json.results.some((item) => item.status === 'HOLD')) fail('Expected at least one HOLD fixture');

console.log('PASS: local E2E fixture runner is present, safe, executable, and evidence-producing');
