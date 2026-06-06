#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const repoRoot = path.join(__dirname, '..', '..');

const files = {
  smsReadinessScript: 'backend/scripts/show-sms-internal-readiness-status.js',
  dashboardRoute: 'backend/src/routes/dashboard.ts',
  dashboardPage: 'website/dashboard/index.html',
  internalAdminRoute: 'backend/src/routes/internal-admin.ts',
  internalAdminErrorsService: 'backend/src/services/internal-admin-errors.service.ts',
  internalAdminErrorsPage: 'website/dashboard/internal-errors.html',
  manualOutreachRoute: 'backend/src/routes/manual-outreach.ts',
  manualOutreachService: 'backend/src/services/manual-outreach.service.ts',
  vapiWebhookRoute: 'backend/src/routes/vapi-webhooks.ts',
  vapiWebhookService: 'backend/src/services/vapi-webhook.service.ts',
  vapiIntegration: 'backend/src/integrations/vapi.ts',
  calendarDryRunService: 'backend/src/services/vapi-calendar-sync.service.ts',
  resendClient: 'backend/src/integrations/resend_client.py',
  reportGenerator: 'backend/src/services/reports/generators.py',
  reportSender: 'backend/src/services/reports/sender.py',
  staleSmsApprovalPackage: 'docs/LIVE_SMS_APPROVAL_PACKAGE.md'
};

function absolute(relativePath) {
  return path.join(repoRoot, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(absolute(relativePath));
}

function readIfExists(relativePath) {
  return exists(relativePath) ? fs.readFileSync(absolute(relativePath), 'utf8') : '';
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function sourceFiles() {
  return [
    ...walk(path.join(repoRoot, 'backend/src')),
    ...walk(path.join(repoRoot, 'backend/scripts'))
  ].filter((file) => /\.(ts|js|py|sh)$/.test(file));
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function isSafeReadOnlyOrTestArtifact(relativePath) {
  return (
    relativePath.startsWith('docs/') ||
    /^backend\/scripts\/verify-.*\.(js|sh)$/.test(relativePath) ||
    /^backend\/scripts\/prepare-.*-readonly\.js$/.test(relativePath) ||
    /^backend\/scripts\/test-.*\.(js|sh)$/.test(relativePath)
  );
}

function currentCommit() {
  try {
    return childProcess
      .execSync('git log -1 --oneline', {
        cwd: repoRoot,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'ignore']
      })
      .trim();
  } catch {
    return 'unknown';
  }
}

function item(name, ok, detail, extra = {}) {
  return {
    name,
    status: ok ? 'ok' : 'attention',
    detail,
    ...extra
  };
}

function allExist(paths) {
  return paths.every(exists);
}

function findMatches(patterns, options = {}) {
  const exclude = new Set(options.exclude || []);
  const excludeSafeReadOnlyOrTestArtifacts = Boolean(options.excludeSafeReadOnlyOrTestArtifacts);
  const matches = [];

  for (const file of sourceFiles()) {
    const rel = relative(file);
    if (exclude.has(rel)) continue;
    if (excludeSafeReadOnlyOrTestArtifacts && isSafeReadOnlyOrTestArtifact(rel)) continue;
    const source = fs.readFileSync(file, 'utf8');

    for (const pattern of patterns) {
      if (pattern.test(source)) {
        matches.push(rel);
        break;
      }
    }
  }

  return Array.from(new Set(matches)).sort();
}

function hasSmsLiveActivation() {
  const smsStatus = readIfExists(files.smsReadinessScript);
  const approvalPackage = readIfExists(files.staleSmsApprovalPackage);

  return !(
    smsStatus.includes('homeowner_sms_live') &&
    approvalPackage.includes('Status: stale')
  );
}

function liveTriggerMatches() {
  const schedulerPatterns = [
    /scheduleJob\s*\(/,
    /setInterval\s*\(/,
    /cron\s*\./,
    /require\(['"]node-cron['"]\)/,
    /from ['"]node-cron['"]/
  ];

  const calendarPatterns = [
    /googleapis/,
    /calendar\.events\.(insert|patch|update|delete)\s*\(/
  ];

  const vapiOutboundPatterns = [
    /VAPI_API_KEY/,
    /api\.vapi\.ai/,
    /fetch\s*\([^)]*vapi/i,
    /axios\.[a-z]+\([^)]*vapi/i
  ];

  const resendSendPatterns = [
    /Emails\.send\s*\(/,
    /send_email\s*\(/
  ];

  const lindyPatterns = [
    /LINDY/i,
    /lindy\.ai/i,
    /api\.lindy/i
  ];

  const routeOrSchedulerPatterns = [
    /\bapp\.(get|post|put|patch|delete)\s*\(/,
    ...schedulerPatterns
  ];

  return {
    calendar: findMatches([...schedulerPatterns, ...calendarPatterns], {
      exclude: ['backend/scripts/show-pilot-readiness-status.js']
    }).filter((file) => /calendar|vapi-calendar/i.test(file)),
    vapi: findMatches(vapiOutboundPatterns, {
      exclude: [
        'backend/scripts/show-pilot-readiness-status.js',
        'backend/src/config/config.ts'
      ],
      excludeSafeReadOnlyOrTestArtifacts: true
    }),
    resend: findMatches(resendSendPatterns, {
      exclude: ['backend/scripts/show-pilot-readiness-status.js']
    }),
    lindy: findMatches(lindyPatterns, {
      exclude: [
        'backend/scripts/show-pilot-readiness-status.js',
        'backend/src/services/first-paid-launch-status-contract.service.ts'
      ],
      excludeSafeReadOnlyOrTestArtifacts: true
    }),
    automation: findMatches(routeOrSchedulerPatterns, {
      exclude: ['backend/scripts/show-pilot-readiness-status.js']
    }).filter((file) => /calendar|resend|lindy|report|sync/i.test(file))
  };
}

function buildStatus() {
  const dashboardFiles = [
    files.dashboardRoute,
    files.dashboardPage,
    files.internalAdminRoute,
    files.internalAdminErrorsService,
    files.internalAdminErrorsPage
  ];
  const manualOutreachFiles = [files.manualOutreachRoute, files.manualOutreachService];
  const vapiFiles = [files.vapiWebhookRoute, files.vapiWebhookService, files.vapiIntegration];
  const reportingFiles = [files.reportGenerator, files.reportSender, files.resendClient];
  const triggers = liveTriggerMatches();
  const liveSmsActive = hasSmsLiveActivation();

  const calendarLiveTriggerFound = triggers.calendar.length > 0 || triggers.automation.some((file) => /calendar/i.test(file));
  const vapiLiveTriggerFound = triggers.vapi.length > 0;
  const resendLiveTriggerFound =
    triggers.resend.some((file) => file !== files.resendClient && file !== files.reportSender) ||
    triggers.automation.some((file) => /resend|report/i.test(file));
  const lindyLiveTriggerFound = triggers.lindy.length > 0;

  const checks = [
    item(
      'SMS readiness',
      exists(files.smsReadinessScript) && !liveSmsActive,
      exists(files.smsReadinessScript)
        ? 'SMS readiness script exists and homeowner SMS is reported not live'
        : 'SMS readiness script is missing',
      { files: [files.smsReadinessScript] }
    ),
    item(
      'Dashboard and internal admin',
      allExist(dashboardFiles),
      allExist(dashboardFiles)
        ? 'Dashboard and protected internal admin files are present'
        : 'One or more dashboard/internal admin files are missing',
      { files: dashboardFiles }
    ),
    item(
      'Manual Outreach',
      allExist(manualOutreachFiles),
      allExist(manualOutreachFiles)
        ? 'Manual Outreach route and service files are present'
        : 'Manual Outreach route or service file is missing',
      { files: manualOutreachFiles }
    ),
    item(
      'Vapi webhook intake',
      allExist(vapiFiles),
      allExist(vapiFiles)
        ? 'Vapi webhook route/service/integration files are present'
        : 'Vapi webhook files are incomplete',
      { files: vapiFiles }
    ),
    item(
      'Reporting',
      reportingFiles.some(exists),
      reportingFiles.filter(exists).length > 0
        ? 'Reporting-related files are present'
        : 'No reporting files found',
      { files: reportingFiles.filter(exists) }
    ),
    item(
      'Live SMS activation',
      !liveSmsActive,
      liveSmsActive ? 'Live SMS may be active; review SMS status immediately' : 'Live SMS is not active'
    ),
    item(
      'Calendar live trigger',
      !calendarLiveTriggerFound,
      calendarLiveTriggerFound
        ? 'Calendar live trigger or scheduler-like code found'
        : 'No Calendar live trigger activation found',
      { matches: triggers.calendar }
    ),
    item(
      'Vapi outbound live trigger',
      !vapiLiveTriggerFound,
      vapiLiveTriggerFound
        ? 'Outbound Vapi API trigger-like code found'
        : 'No outbound Vapi live API trigger found'
    ),
    item(
      'Resend live trigger',
      !resendLiveTriggerFound,
      resendLiveTriggerFound
        ? 'Resend automation trigger found'
        : 'No Resend cron/route automation trigger found',
      { provider_files_present: triggers.resend }
    ),
    item(
      'Lindy live trigger',
      !lindyLiveTriggerFound,
      lindyLiveTriggerFound
        ? 'Lindy integration trigger found'
        : 'No Lindy live trigger found',
      { matches: triggers.lindy }
    )
  ];

  return {
    generated_at: new Date().toISOString(),
    source_of_truth_commit: currentCommit(),
    summary: checks.every((check) => check.status === 'ok')
      ? 'demo_ready_with_live_automation_disabled'
      : 'attention_required',
    live_automation: {
      sms: liveSmsActive,
      calendar: calendarLiveTriggerFound,
      vapi_outbound: vapiLiveTriggerFound,
      resend: resendLiveTriggerFound,
      lindy: lindyLiveTriggerFound
    },
    checks,
    safety: {
      local_repo_inspection_only: true,
      no_supabase_reads_or_writes: true,
      no_sms_sent: true,
      no_twilio_import_or_call: true,
      no_vapi_calendar_resend_lindy_calls: true,
      no_route_cron_scheduler_or_dispatcher_activation_added: true,
      no_secrets_exposed: true
    }
  };
}

function printText(status) {
  console.log('=== RoofLeadHQ Pilot Readiness Status ===');
  console.log(`Generated at: ${status.generated_at}`);
  console.log(`Source of truth: ${status.source_of_truth_commit}`);
  console.log(`Summary: ${status.summary}`);
  console.log('');

  for (const check of status.checks) {
    console.log(`${check.status.toUpperCase()}: ${check.name}`);
    console.log(`  ${check.detail}`);
  }

  console.log('');
  console.log('Live automation:');
  for (const [name, active] of Object.entries(status.live_automation)) {
    console.log(`  ${name}: ${active ? 'FOUND' : 'not active'}`);
  }

  console.log('');
  console.log('Safety: local repo inspection only; no Supabase, SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
}

if (require.main === module) {
  const status = buildStatus();

  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(status, null, 2));
  } else {
    printText(status);
  }
}

module.exports = {
  buildStatus
};
