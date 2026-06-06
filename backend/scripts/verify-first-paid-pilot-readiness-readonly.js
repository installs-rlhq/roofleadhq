#!/usr/bin/env node

const childProcess = require('child_process');
const path = require('path');
const { buildStatus } = require('./show-pilot-readiness-status');

const repoRoot = path.join(__dirname, '..', '..');

const expectedSummary = 'demo_ready_with_live_automation_disabled';
const liveAutomationKeys = ['sms', 'calendar', 'vapi_outbound', 'resend', 'lindy'];

const commands = [
  {
    name: 'Pilot readiness status',
    script: 'backend/scripts/show-pilot-readiness-status.js',
    args: ['--json'],
    checkReadinessStatus: true
  },
  {
    name: 'First Paid Pilot launch packet',
    script: 'backend/scripts/verify-first-paid-pilot-launch-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Contractor kickoff email',
    script: 'backend/scripts/verify-first-paid-contractor-kickoff-email-readonly.js',
    args: []
  },
  {
    name: 'First Paid Contractor setup checklist',
    script: 'backend/scripts/verify-first-paid-contractor-setup-checklist-readonly.js',
    args: []
  },
  {
    name: 'First Paid Client launch readiness gate',
    script: 'backend/scripts/verify-first-paid-client-launch-readiness-gate-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch verifier index',
    script: 'backend/scripts/verify-first-paid-launch-verifier-index-readonly.js',
    args: []
  },
  {
    name: 'Pilot dashboard smoke',
    script: 'backend/scripts/verify-pilot-dashboard-smoke-readonly.js',
    args: []
  },
  {
    name: 'Manual Outreach smoke',
    script: 'backend/scripts/verify-manual-outreach-smoke-readonly.js',
    args: []
  },
  {
    name: 'Vapi phone lead smoke',
    script: 'backend/scripts/verify-vapi-phone-lead-smoke-readonly.js',
    args: []
  },
  {
    name: 'Reporting smoke',
    script: 'backend/scripts/verify-reporting-smoke-readonly.js',
    args: []
  },
  {
    name: 'Pilot operator status page smoke',
    script: 'backend/scripts/verify-pilot-operator-status-page-readonly.js',
    args: []
  },
  {
    name: 'Pilot operator status endpoint smoke',
    script: 'backend/scripts/verify-pilot-operator-status-endpoint-readonly.js',
    args: []
  },
  {
    name: 'Dashboard navigation smoke',
    script: 'backend/scripts/verify-dashboard-navigation-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch operator handoff note',
    script: 'backend/scripts/verify-first-paid-launch-operator-handoff-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch day checklist',
    script: 'backend/scripts/verify-first-paid-launch-day-checklist-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch ready recap',
    script: 'backend/scripts/verify-first-paid-launch-ready-recap-readonly.js',
    args: []
  },
  {
    name: 'Next Chat context package first paid launch',
    script: 'backend/scripts/verify-next-chat-context-package-first-paid-launch-readonly.js',
    args: []
  },
  {
    name: 'Live SMS approval package stale guard',
    script: 'backend/scripts/verify-live-sms-approval-package-stale-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch go/no-go snapshot',
    script: 'backend/scripts/verify-first-paid-launch-go-no-go-snapshot-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch control center',
    script: 'backend/scripts/verify-first-paid-launch-control-center-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch status contract',
    script: 'backend/scripts/verify-first-paid-launch-status-contract-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch status endpoint',
    script: 'backend/scripts/verify-first-paid-launch-status-endpoint-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch execution pack',
    script: 'backend/scripts/verify-first-paid-launch-execution-pack-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch operator dashboard QA',
    script: 'backend/scripts/verify-first-paid-launch-operator-dashboard-qa-readonly.js',
    args: []
  },
  {
    name: 'SMS dispatcher messages write test-only',
    script: 'backend/scripts/verify-sms-dispatcher-messages-write-testonly.js',
    args: []
  },
  {
    name: 'Vapi post-call payload discovery',
    script: 'backend/scripts/verify-vapi-post-call-payload-discovery-readonly.js',
    args: []
  },
  {
    name: 'Vapi raw payload capture plan',
    script: 'backend/scripts/verify-vapi-raw-payload-capture-plan-readonly.js',
    args: []
  },
  {
    name: 'Vapi sample payload mapping',
    script: 'backend/scripts/verify-vapi-sample-payload-mapping-readonly.js',
    args: []
  },
  {
    name: 'Vapi missing-fields readiness gate',
    script: 'backend/scripts/verify-vapi-missing-fields-readiness-gate-readonly.js',
    args: []
  },
  {
    name: 'Vapi real payload collection runbook',
    script: 'backend/scripts/verify-vapi-real-payload-collection-runbook-readonly.js',
    args: []
  },
  {
    name: 'Vapi operator payload review checklist',
    script: 'backend/scripts/verify-vapi-operator-payload-review-checklist-readonly.js',
    args: []
  },
  {
    name: 'Vapi test payload ingestion dry-run',
    script: 'backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js',
    args: []
  },
  {
    name: 'SMS dispatcher follow-ups update test-only',
    script: 'backend/scripts/verify-sms-dispatcher-followups-update-testonly.js',
    args: []
  }
];

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

function runNodeScript(command) {
  const result = childProcess.spawnSync(
    process.execPath,
    [command.script, ...command.args],
    {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: 'ignore',
      timeout: 120000
    }
  );

  if (result.error) {
    fail(`${command.name} failed to run`, {
      script: command.script,
      error: result.error.message
    });
    return null;
  }

  if (result.status !== 0) {
    fail(`${command.name} exited nonzero`, {
      script: command.script,
      status: result.status,
    });
    return null;
  }

  pass(`${command.name} completed successfully`);
  return true;
}

function checkReadinessStatus(status) {
  if (!status) return;

  if (status.summary === expectedSummary) {
    pass(`Pilot readiness summary is ${expectedSummary}`);
  } else {
    fail('Pilot readiness summary is not demo-ready with live automation disabled', {
      expected: expectedSummary,
      actual: status.summary
    });
  }

  for (const key of liveAutomationKeys) {
    const value = status.live_automation ? status.live_automation[key] : undefined;

    if (value === false) {
      pass(`Live automation ${key} is not active`);
    } else {
      fail(`Live automation ${key} is active or unknown`, {
        key,
        value
      });
    }
  }
}

console.log('=== RoofLeadHQ First Paid Pilot Readiness Aggregate Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

for (const command of commands) {
  const completed = runNodeScript(command);

  if (completed && command.checkReadinessStatus) {
    checkReadinessStatus(buildStatus());
  }
}

if (process.exitCode) {
  console.error('FAIL: First paid pilot readiness aggregate verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: First paid pilot readiness aggregate verification passed.');
