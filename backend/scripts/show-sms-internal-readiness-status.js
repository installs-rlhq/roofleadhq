#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const repoRoot = path.join(__dirname, '..', '..');
const staleFollowUpId = '997ce1f8-3145-439f-a0c3-d042f803059f';
function currentSourceOfTruthCommit() {
  try {
    return childProcess
      .execSync('git log -1 --oneline', { cwd: repoRoot, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] })
      .trim();
  } catch {
    return 'unknown';
  }
}

const files = {
  dbWriteCompletedVerifier: 'backend/scripts/verify-sms-dispatcher-db-write-completed-readonly.js',
  workflowEventCompletedVerifier: 'backend/scripts/verify-sms-dispatcher-workflow-event-completed-readonly.js',
  workflowEventLiveVerifier: 'backend/scripts/verify-sms-dispatcher-workflow-event-live-test-write.js',
  twilioAdapterService: 'backend/src/services/sms-' + 'twilio-send-adapter.service.ts',
  twilioAdapterVerifier: 'backend/scripts/verify-sms-twilio-send-adapter.js',
  productionRunnerService: 'backend/src/services/sms-dispatcher-' + 'production-runner.service.ts',
  productionRunnerVerifier: 'backend/scripts/verify-sms-dispatcher-production-runner.js',
  liveSmsApprovalPackage: 'docs/LIVE_SMS_APPROVAL_PACKAGE.md',
  dailyChecklist: 'docs/DAILY_PILOT_OPERATIONS_CHECKLIST.md'
};

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function read(relativePath) {
  return fs.readFileSync(absolute(relativePath), 'utf8');
}

function exists(relativePath) {
  return fs.existsSync(absolute(relativePath));
}

function listFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return listFiles(fullPath);
    return [fullPath];
  });
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function sourceFiles() {
  return [
    ...listFiles(path.join(repoRoot, 'backend/src')).filter((file) => /\.(ts|js)$/.test(file)),
    ...listFiles(path.join(repoRoot, 'backend/scripts')).filter((file) => /\.js$/.test(file))
  ];
}

function hasTwilioAdapterWiring() {
  const adapterImportSignature = 'sms-' + 'twilio-send-adapter.service';
  const adapterCallSignature = 'sendSmsWith' + 'TwilioAdapter';
  const allowed = new Set([
    files.twilioAdapterService,
    files.twilioAdapterVerifier,
    'backend/scripts/show-sms-internal-readiness-status.js'
  ]);

  return sourceFiles()
    .filter((file) => !allowed.has(relative(file)))
    .some((file) => {
      const source = fs.readFileSync(file, 'utf8');
      return (
        source.includes(adapterImportSignature) ||
        source.includes(adapterCallSignature)
      );
    });
}

function hasProductionRunnerAutomation() {
  const source = [
    read(files.productionRunnerService),
    fs.existsSync(absolute('backend/scripts/run-sms-dispatcher-' + 'production-runner.js'))
      ? read('backend/scripts/run-sms-dispatcher-' + 'production-runner.js')
      : ''
  ].join('\n');

  return /app\.(get|post|put|patch|delete)\s*\(|setInterval\s*\(|setTimeout\s*\(|scheduleJob\s*\(|cron\./.test(source);
}

function statusItem(name, ok, detail) {
  return {
    name,
    status: ok ? 'ok' : 'attention',
    detail
  };
}

function buildStatus() {
  const dbWriteVerifierExists = exists(files.dbWriteCompletedVerifier);
  const workflowEventVerifierExists =
    exists(files.workflowEventCompletedVerifier) && exists(files.workflowEventLiveVerifier);
  const twilioAdapterWired = hasTwilioAdapterWiring();
  const productionRunnerAutomated = hasProductionRunnerAutomation();
  const approvalPackage = read(files.liveSmsApprovalPackage);
  const liveSmsApprovalPackageStale =
    /Status:\s*stale/i.test(approvalPackage) && approvalPackage.includes(staleFollowUpId);

  const homeownerSmsLive =
    twilioAdapterWired ||
    productionRunnerAutomated ||
    !liveSmsApprovalPackageStale;

  const checks = [
    statusItem(
      'DB write verifier',
      dbWriteVerifierExists,
      dbWriteVerifierExists
        ? `${files.dbWriteCompletedVerifier} exists`
        : `${files.dbWriteCompletedVerifier} is missing`
    ),
    statusItem(
      'workflow_events verifier',
      workflowEventVerifierExists,
      workflowEventVerifierExists
        ? 'Completed and live-test workflow_events verifiers exist'
        : 'workflow_events verifier package is incomplete'
    ),
    statusItem(
      'Twilio adapter wiring',
      !twilioAdapterWired,
      twilioAdapterWired
        ? 'Twilio adapter appears wired outside its verifier/service'
        : 'Twilio adapter is not wired into app, routes, scripts, or production runner'
    ),
    statusItem(
      'Production runner',
      !productionRunnerAutomated,
      productionRunnerAutomated
        ? 'Production runner appears attached to route, cron, or scheduler'
        : 'Production runner remains gated CLI/service code with no route, cron, or scheduler'
    ),
    statusItem(
      'Live SMS approval package',
      liveSmsApprovalPackageStale,
      liveSmsApprovalPackageStale
        ? `Approval package is stale and references skipped follow-up ${staleFollowUpId}`
        : 'Approval package is not marked stale for the skipped follow-up'
    ),
    statusItem(
      'Homeowner SMS live state',
      !homeownerSmsLive,
      homeownerSmsLive
        ? 'Homeowner SMS may be live; review immediately'
        : 'Homeowner SMS is not live'
    )
  ];

  return {
    generated_at: new Date().toISOString(),
    source_of_truth_commit: currentSourceOfTruthCommit(),
    homeowner_sms_live: homeownerSmsLive,
    stale_follow_up_id: staleFollowUpId,
    summary: homeownerSmsLive
      ? 'attention_required'
      : 'safe_demo_readiness_status',
    checks,
    safety: {
      no_sms_sent: true,
      no_twilio_import_or_call: true,
      no_supabase_writes: true,
      no_supabase_client_created: true,
      no_route_cron_scheduler_or_dispatcher_activation: true,
      no_secrets_exposed: true
    }
  };
}

function printText(status) {
  console.log('=== RoofLeadHQ Internal SMS Readiness Status ===');
  console.log(`Generated at: ${status.generated_at}`);
  console.log(`Source of truth: ${status.source_of_truth_commit}`);
  console.log(`Homeowner SMS live: ${status.homeowner_sms_live ? 'YES' : 'NO'}`);
  console.log('');

  for (const check of status.checks) {
    console.log(`${check.status.toUpperCase()}: ${check.name}`);
    console.log(`  ${check.detail}`);
  }

  console.log('');
  console.log('Safety: no SMS sent, no Twilio import/call, no Supabase writes, no route/cron/scheduler/dispatcher activation.');
}

const status = buildStatus();

if (process.argv.includes('--json')) {
  console.log(JSON.stringify(status, null, 2));
} else {
  printText(status);
}
