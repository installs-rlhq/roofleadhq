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
    name: 'First Paid Launch emergency escalation packet',
    script: 'backend/scripts/verify-first-paid-launch-emergency-escalation-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch contractor notification packet',
    script: 'backend/scripts/verify-first-paid-launch-contractor-notification-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch appointment outcome packet',
    script: 'backend/scripts/verify-first-paid-launch-appointment-outcome-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch lead source quality packet',
    script: 'backend/scripts/verify-first-paid-launch-lead-source-quality-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch missing information recovery packet',
    script: 'backend/scripts/verify-first-paid-launch-missing-information-recovery-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch manual review queue packet',
    script: 'backend/scripts/verify-first-paid-launch-manual-review-queue-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch schema blockers packet',
    script: 'backend/scripts/verify-first-paid-launch-schema-blockers-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch stopped lead handling packet',
    script: 'backend/scripts/verify-first-paid-launch-stopped-lead-handling-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch voice path cleanup packet',
    script: 'backend/scripts/verify-first-paid-launch-voice-path-cleanup-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch automation foundation packet',
    script: 'backend/scripts/verify-first-paid-launch-automation-foundation-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer onboarding script packet',
    script: 'backend/scripts/verify-first-paid-launch-roofer-onboarding-script-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run intake packet',
    script: 'backend/scripts/verify-first-paid-launch-roofer-dry-run-intake-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run workspace template packet',
    script: 'backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-template-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer onboarding template copy',
    script: 'backend/scripts/verify-first-paid-launch-roofer-onboarding-template-copy-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run workspace smoke',
    script: 'backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-smoke-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run workspace sample packet',
    script: 'backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-sample-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run workspace comparison',
    script: 'backend/scripts/verify-first-paid-launch-roofer-dry-run-workspace-comparison-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run onboarding operator runbook',
    script: 'backend/scripts/verify-roofer-dry-run-onboarding-operator-runbook-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run onboarding QA wrapper',
    script: 'backend/scripts/verify-roofer-dry-run-onboarding-qa-wrapper-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run operator acceptance checklist',
    script: 'backend/scripts/verify-roofer-dry-run-operator-acceptance-checklist-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer setup packet',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-setup-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer readiness packet QA',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-readiness-packet-qa-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual follow-up packet',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-follow-up-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer internal handoff summary packet',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-internal-handoff-summary-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer founder review decision packet',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-founder-review-decision-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup planning packet',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup planning QA',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-planning-qa-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup rehearsal',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-rehearsal-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup operator runbook',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-runbook-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup operator acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-operator-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup founder approval',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup founder approval evidence',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup founder approval evidence QA',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-founder-approval-evidence-qa-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch production gate check script packet',
    script: 'backend/scripts/verify-first-paid-launch-production-gate-check-script-packet-readonly.js',
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
      name: 'First Paid Launch operator day-one checklist',
      script: 'backend/scripts/verify-first-paid-launch-operator-day-one-checklist-readonly.js',
      args: []
    },
    {
      name: 'First Paid Launch customer intake packet',
      script: 'backend/scripts/verify-first-paid-launch-customer-intake-packet-readonly.js',
      args: []
    },
    {
      name: 'First Paid Launch booking preferences packet',
      script: 'backend/scripts/verify-first-paid-launch-booking-preferences-packet-readonly.js',
      args: []
    },
    {
      name: 'First Paid Launch follow-up cadence packet',
      script: 'backend/scripts/verify-first-paid-launch-follow-up-cadence-packet-readonly.js',
      args: []
    },
    {
      name: 'First Paid Launch reporting preferences packet',
      script: 'backend/scripts/verify-first-paid-launch-reporting-preferences-packet-readonly.js',
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
      name: 'Vapi test payload ingestion plan',
      script: 'backend/scripts/verify-vapi-test-payload-ingestion-plan-readonly.js',
      args: []
    },
    {
      name: 'Vapi test payload ingestion dry-run',
      script: 'backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js',
      args: []
    },
    {
      name: 'Vapi normalized contract documentation',
      script: 'backend/scripts/verify-vapi-normalized-contract-doc-readonly.js',
      args: []
    },
    {
      name: 'Vapi scenario sample files',
      script: 'backend/scripts/verify-vapi-scenario-samples-readonly.js',
      args: []
    },
    {
      name: 'Vapi dry-run output snapshots',
      script: 'backend/scripts/verify-vapi-dry-run-output-snapshots-readonly.js',
      args: []
    },
    {
      name: 'Vapi dry-run CLI contract',
      script: 'backend/scripts/verify-vapi-dry-run-cli-contract-readonly.js',
      args: []
    },
    {
      name: 'Vapi scenario registry consistency',
      script: 'backend/scripts/verify-vapi-scenario-registry-readonly.js',
      args: []
    },
    {
      name: 'Vapi aggregate verifier coverage',
      script: 'backend/scripts/verify-vapi-aggregate-coverage-readonly.js',
      args: []
    },
  {
    name: 'Vapi guard layer coverage',
    script: 'backend/scripts/verify-vapi-guard-layer-readonly.js',
    args: []
  },
  {
    name: 'Critical file format integrity',
    script: 'backend/scripts/verify-critical-file-format-integrity-readonly.js',
    args: []
  },
  {
    name: 'Next-chat latest milestones context',
    script: 'backend/scripts/verify-next-chat-context-latest-milestones-readonly.js',
    args: []
  },
  {
    name: 'Handoff integrity aggregate',
    script: 'backend/scripts/verify-handoff-integrity-readonly.js',
    args: []
  },
  {
    name: 'Handoff integrity context',
    script: 'backend/scripts/verify-handoff-integrity-context-readonly.js',
    args: []
  },
  {
    name: 'Source-of-truth commit chain',
    script: 'backend/scripts/verify-source-of-truth-commit-chain-readonly.js',
    args: []
  },
  {
    name: 'Launch safety meta verifier',
    script: 'backend/scripts/verify-launch-safety-meta-readonly.js',
    args: []
  },
  {
    name: 'Latest milestone self-check',
    script: 'backend/scripts/verify-latest-milestone-self-check-readonly.js',
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
