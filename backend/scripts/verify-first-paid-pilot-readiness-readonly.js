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
    name: 'First Paid Launch roofer dry-run first roofer manual setup final go/no-go',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-final-go-no-go-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup execution readiness',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-execution-readiness-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session runbook',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-runbook-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session notes',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-notes-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session qa',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-qa-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session qa acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-qa-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session closeout',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-closeout-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session handoff',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-handoff-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session handoff acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-handoff-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session next action',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-next-action-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session next action acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-next-action-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session outcome',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-outcome-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session outcome acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-outcome-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session final summary',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session final summary acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-summary-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session archive',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session archive acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch roofer dry-run first roofer manual setup session archive final check',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-final-check-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session archive final check acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-archive-final-check-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session completion lock',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-completion-lock-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session completion lock acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-completion-lock-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session final lock',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-lock-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session final lock acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-final-lock-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session preservation snapshot',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-preservation-snapshot-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session operator handoff freeze',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-operator-handoff-freeze-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock preservation snapshot',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock preservation snapshot operator handoff freeze',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-operator-handoff-freeze-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock preservation snapshot operator handoff freeze archive',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-reopen-guard-final-lock-acceptance-preservation-snapshot-operator-handoff-freeze-archive-acceptance-final-check-completion-lock-preservation-snapshot-operator-handoff-freeze-archive-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session reopen guard final lock acceptance preservation snapshot operator handoff freeze archive acceptance final check completion lock preservation snapshot operator handoff freeze archive acceptance',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-acceptance-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session extended archive final check',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-final-check-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session extended archive completion lock',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-completion-lock-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session extended archive preservation snapshot',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-preservation-snapshot-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session extended archive operator handoff freeze',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-operator-handoff-freeze-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session extended archive acceptance final check',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-acceptance-final-check-readonly.js',
    args: []
  },
  {
    name: 'First roofer manual setup session extended archive completion final lock',
    script: 'backend/scripts/verify-roofer-dry-run-first-roofer-manual-setup-session-extended-archive-completion-final-lock-readonly.js',
    args: []
  },
  {
    name: 'First Paid Launch production gate check script packet',
    script: 'backend/scripts/verify-first-paid-launch-production-gate-check-script-packet-readonly.js',
    args: []
  },
  {
    name: 'Agent Product Quality Gate (docs/AGENT_PRODUCT_QUALITY_GATE.md + scripts/check-agent-product-quality-gate.sh + backend/scripts/verify-agent-product-quality-gate-readonly.js) -- reusable product-depth standard for future agent builds',
    script: 'backend/scripts/verify-agent-product-quality-gate-readonly.js',
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
    name: 'First Roofer Execution Day Runbook (docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md + scripts/run-first-roofer-execution-day-dry-run.sh) -- first-roofer execution-day runbook',
    script: 'backend/scripts/verify-first-roofer-execution-day-runbook-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Lead-to-Inspection Ops Pack (docs/FIRST_ROOFER_LEAD_TO_INSPECTION_OPS_PACK.md + scripts/run-first-roofer-lead-to-inspection-ops-pack-dry-run.sh) -- first-roofer lead-to-inspection workflow for manual founder/operator review and coordination',
    script: 'backend/scripts/verify-first-roofer-lead-to-inspection-ops-pack-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Day-One Command Center (docs/FIRST_ROOFER_DAY_ONE_COMMAND_CENTER.md + scripts/run-first-roofer-day-one-command-center-dry-run.sh) -- first-roofer founder/operator day-one command center cockpit for manual lead intake through inspection/appointment readiness and end-of-day reporting',
    script: 'backend/scripts/verify-first-roofer-day-one-command-center-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Manual Communication Command Packet (docs/FIRST_ROOFER_MANUAL_COMMUNICATION_COMMAND_PACKET.md + scripts/run-first-roofer-manual-communication-command-packet-dry-run.sh) -- first-roofer manual communication command packet for founder/operator manual prepare/review/approve/track of homeowner and contractor communication (draft-only, no live send, inspection/appointment readiness via manual coordination only)',
    script: 'backend/scripts/verify-first-roofer-manual-communication-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Inspection Coordination Command Packet (docs/FIRST_ROOFER_INSPECTION_COORDINATION_COMMAND_PACKET.md + scripts/run-first-roofer-inspection-coordination-command-packet-dry-run.sh) -- first-roofer inspection coordination command packet for founder/operator manual coordination of inspection readiness, homeowner/contractor availability, service-area/route fit, inspection windows, manual confirmations, HOLD/BLOCKED decisions (draft-only, no live booking, Calendar booking performed: no, external notification sent: no, production system touched: no)',
    script: 'backend/scripts/verify-first-roofer-inspection-coordination-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Appointment Readiness Command Packet (docs/FIRST_ROOFER_APPOINTMENT_READINESS_COMMAND_PACKET.md + scripts/run-first-roofer-appointment-readiness-command-packet-dry-run.sh) -- first-roofer appointment readiness command packet for founder/operator manual determination of appointment readiness after inspection coordination review, homeowner/contractor confirmation review, inspection window readiness comparison, manual appointment-readiness decisions, HOLD/BLOCKED rules (missing confirmation, conflicting windows, contractor/service-area, consent/safety, prod risk), no live booking (draft-only, Calendar booking performed: no, external notification sent: no, production system touched: no)',
    script: 'backend/scripts/verify-first-roofer-appointment-readiness-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Appointment Outcome Command Packet (docs/FIRST_ROOFER_APPOINTMENT_OUTCOME_COMMAND_PACKET.md + scripts/run-first-roofer-appointment-outcome-command-packet-dry-run.sh) -- first-roofer appointment outcome command packet for founder/operator manual capture/classify/prepare follow-up for appointment/inspection outcomes after appointment readiness and manual coordination (completed/not completed/reschedule/no-show/unable-to-access, homeowner/contractor follow-up status, estimate/next-step prep, HOLD/BLOCKED rules for missing outcome info/unclear ownership/reschedule conflict/consent/safety/prod risk, draft-only, outcome ready for manual follow-up, Calendar booking performed: no, external notification sent: no, production system touched: no, Follow-up sent: no)',
    script: 'backend/scripts/verify-first-roofer-appointment-outcome-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Manual Follow-Up Command Packet (docs/FIRST_ROOFER_MANUAL_FOLLOW_UP_COMMAND_PACKET.md + scripts/run-first-roofer-manual-follow-up-command-packet-dry-run.sh) -- first-roofer manual follow-up command packet for founder/operator manual prepare/approve/track/report follow-up after appointment/inspection outcomes (follow-up ownership, homeowner/contractor follow-up preparation, reschedule/estimate/next-step/no-show/completed/cancelled/hold/blocked worksheets, HOLD/BLOCKED rules for missing follow-up owner/incomplete outcome details/conflicting next steps/consent/safety/prod risk, draft-only, approved for manual follow-up, Calendar booking performed: no, external notification sent: no, production system touched: no, Follow-up sent: no)',
    script: 'backend/scripts/verify-first-roofer-manual-follow-up-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Estimate / Next-Step Readiness Command Packet (docs/FIRST_ROOFER_ESTIMATE_NEXT_STEP_READINESS_COMMAND_PACKET.md + scripts/run-first-roofer-estimate-next-step-readiness-command-packet-dry-run.sh) -- first-roofer estimate / next-step readiness command packet for founder/operator manual decision of estimate / next-step readiness after appointment outcomes and manual follow-up preparation (estimate readiness, contractor next-step coordination, homeowner additional-information, reschedule, insurance/photos/damage-detail, completed/no-show/cancelled/hold/blocked next-step worksheets, HOLD/BLOCKED rules for missing estimate prep owner/missing contractor next-step owner/incomplete homeowner information/incomplete photos/insurance/damage details/unresolved appointment or manual follow-up state/conflicting next steps/consent/safety/prod risk, draft-only, ready for manual estimate prep, ready for manual next step, Estimate created: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no)',
    script: 'backend/scripts/verify-first-roofer-estimate-next-step-readiness-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Estimate Prep Command Packet (docs/FIRST_ROOFER_ESTIMATE_PREP_COMMAND_PACKET.md + scripts/run-first-roofer-estimate-prep-command-packet-dry-run.sh) -- first-roofer estimate prep command packet for founder/operator manual preparation of estimate inputs after estimate / next-step readiness (inspection notes capture, contractor estimate-input, homeowner constraints and preferences, roof/damage/service-scope, photos/insurance/documentation, estimate assumptions and unknowns, contractor/homeowner questions worksheets, HOLD/BLOCKED rules for missing estimate prep owner/missing inspection notes/missing contractor notes/incomplete homeowner constraints/incomplete roof/damage/service-scope details/incomplete photos/insurance/documentation/unresolved estimate / next-step readiness state/unresolved contractor or homeowner questions/consent/safety/prod risk, draft-only, ready for manual estimate prep, ready for manual next step, READY FOR FOUNDER REVIEW, READY FOR CONTRACTOR REVIEW, Estimate created: no, Quote generated: no, Quote sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no)',
    script: 'backend/scripts/verify-first-roofer-estimate-prep-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Contractor Estimate Review Command Packet (docs/FIRST_ROOFER_CONTRACTOR_ESTIMATE_REVIEW_COMMAND_PACKET.md + scripts/run-first-roofer-contractor-estimate-review-command-packet-dry-run.sh) -- first-roofer contractor estimate review command packet for founder/operator manual packaging and review of estimate-prep inputs for contractor estimate review after estimate prep (contractor review package worksheet, scope summary worksheet, photos/documentation review worksheet, insurance context review worksheet, contractor/founder/homeowner clarification worksheets, HOLD/BLOCKED rules for missing contractor review owner/missing estimate prep state/unresolved estimate / next-step readiness state/missing inspection notes/missing contractor notes/incomplete roof/damage/service-scope details/incomplete homeowner constraints/incomplete photos/documentation review/incomplete insurance context review/unresolved estimate assumptions/unresolved estimate unknowns/unresolved contractor questions/unresolved homeowner questions/contractor match not confirmed/contractor service-area fit not confirmed/consent/safety/prod risk, draft-only, READY FOR FOUNDER REVIEW, READY FOR CONTRACTOR REVIEW, READY FOR MANUAL CONTRACTOR REVIEW, Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no)',
    script: 'backend/scripts/verify-first-roofer-contractor-estimate-review-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Homeowner Clarification Command Packet (docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_COMMAND_PACKET.md + scripts/run-first-roofer-homeowner-clarification-command-packet-dry-run.sh) -- first-roofer homeowner clarification command packet for founder/operator manual packaging and review of homeowner clarification needs after contractor estimate review (and upstream estimate prep / estimate next-step readiness / manual follow-up / appointment outcome) for unresolved homeowner-facing gaps (homeowner clarification package worksheet, missing homeowner constraints worksheet, photos/documentation request-prep worksheet, insurance context clarification worksheet, roof/damage/service-scope clarification worksheet, access and scheduling clarification worksheet, contractor question translation worksheet, founder/operator clarification questions worksheet, homeowner clarification readiness worksheet, manual clarification draft-prep worksheet, HOLD/BLOCKED rules for missing homeowner clarification owner/missing contact permission status/do-not-contact or unclear permission/missing homeowner preferred channel/missing contractor review state/unresolved contractor estimate review state/missing estimate prep state/unresolved estimate / next-step readiness state/incomplete homeowner constraints/incomplete photos/documentation request-prep/incomplete insurance context clarification/incomplete roof/damage/service-scope clarification/unresolved access issue/unresolved scheduling constraint/unresolved estimate assumptions/unresolved estimate unknowns/unresolved contractor questions/unresolved founder/operator questions/unresolved homeowner questions/contractor match not confirmed/contractor service-area fit not confirmed/consent/safety/prod risk, draft-only, READY FOR FOUNDER REVIEW, READY FOR CONTRACTOR REVIEW, READY FOR MANUAL CONTRACTOR REVIEW, READY FOR MANUAL HOMEOWNER CLARIFICATION, Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no)',
    script: 'backend/scripts/verify-first-roofer-homeowner-clarification-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Homeowner Clarification Response Review Command Packet (docs/FIRST_ROOFER_HOMEOWNER_CLARIFICATION_RESPONSE_REVIEW_COMMAND_PACKET.md + scripts/run-first-roofer-homeowner-clarification-response-review-command-packet-dry-run.sh) -- first-roofer homeowner clarification response review command packet for founder/operator manual review of a homeowner clarification response captured manually outside the system after the First Roofer Homeowner Clarification Command Packet (and upstream) (homeowner response capture summary worksheet, response completeness review worksheet, missing homeowner constraints resolution worksheet, photos/documentation received review worksheet, insurance context response review worksheet, roof/damage/service-scope response review worksheet, access and scheduling response review worksheet, contractor questions answered review worksheet, founder/operator questions answered review worksheet, homeowner questions and concerns review worksheet, estimate assumptions resolution worksheet, estimate unknowns resolution worksheet, downstream readiness routing worksheet, manual response-review decision worksheet, HOLD/BLOCKED rules for missing response-review owner/response not captured outside system/missing response captured by/missing response captured timestamp/missing response source/channel/missing contact permission status/do-not-contact or unclear permission/missing homeowner preferred channel/missing First Roofer Homeowner Clarification Command Packet reference/missing prior manual homeowner clarification state/unresolved prior homeowner clarification decision/missing contractor review state/unresolved contractor estimate review state/missing estimate prep state/unresolved estimate / next-step readiness state/response completeness PARTIAL/NEEDS INFO without owner/homeowner constraints still incomplete/photos/documentation still incomplete/insurance context still incomplete/roof/damage/service-scope details still incomplete/access issue unresolved/scheduling constraint unresolved/estimate assumptions unresolved/estimate unknowns unresolved/contractor questions unanswered/founder/operator questions unanswered/homeowner questions/concerns unresolved/contractor match not confirmed/contractor service-area fit not confirmed/recommended downstream route unclear/consent/safety/prod risk, draft-only, READY FOR FOUNDER REVIEW, READY TO ROUTE MANUALLY, RETURN TO CONTRACTOR ESTIMATE REVIEW / RETURN TO MANUAL ESTIMATE PREP / RETURN TO ESTIMATE NEXT-STEP READINESS / RETURN TO MANUAL FOLLOW-UP / RETURN TO APPOINTMENT OR ACCESS COORDINATION, Estimate created: no, Quote generated: no, Quote sent: no, Contractor notification sent: no, Homeowner notification sent: no, Follow-up sent: no, Calendar booking performed: no, external notification sent: no, production system touched: no)',
    script: 'backend/scripts/verify-first-roofer-homeowner-clarification-response-review-command-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Manual Downstream Routing Command Packet (docs/FIRST_ROOFER_MANUAL_DOWNSTREAM_ROUTING_COMMAND_PACKET.md + scripts/run-first-roofer-manual-downstream-routing-command-packet-dry-run.sh) -- first-roofer manual downstream routing command packet for founder/operator manual routing after the reviewed result of the First Roofer Homeowner Clarification Response Review Command Packet (and upstream) (lead routing intake checklist, upstream state reconciliation worksheet, homeowner clarification response review status worksheet, remaining gap classification worksheet, route eligibility matrix with RETURN TO CONTRACTOR ESTIMATE REVIEW / RETURN TO MANUAL ESTIMATE PREP / RETURN TO ESTIMATE NEXT-STEP READINESS / RETURN TO MANUAL FOLLOW-UP / RETURN TO APPOINTMENT OR ACCESS COORDINATION / READY FOR FOUNDER REVIEW / HOLD / BLOCKED rules, per-route worksheets, route conflict resolution worksheet, manual routing owner assignment worksheet, manual next-action checklist, HOLD/BLOCKED rules for missing owner/reviewer/timestamp/reason/evidence/contact/permission/channel/contractor issues/prior states/response review not PASS/gaps without owner/unresolved items/conflicts/consent/safety/prod/live risks/payment/invoice risk, tracker, founder/operator routing decision log, end-of-day manual downstream routing report, next-operator handoff, no-send/no-estimate-create/no-quote-generate/no-calendar/no-booking safety with Estimate created: no / Quote generated: no / all other markers no, dry-run/internal-only/founder-operator-only, Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, manual downstream routing, READY TO ROUTE MANUALLY, ROUTED MANUALLY)',
    script: 'backend/scripts/verify-first-roofer-manual-downstream-routing-command-packet-readonly.js',
    args: []
  },
  {
    name: 'Roofer Data Protection and Tenant Isolation Plan Placement Packet (docs/ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + scripts/run-roofer-data-protection-tenant-isolation-plan-placement-packet-dry-run.sh) -- planning-only packet capturing founder requirement that every roofer’s information and leads must be protected as much as possible from data-breach concerns; places Roofer Data Protection and Tenant Isolation Readiness Milestone into 90-day build plan as BLOCKER BEFORE MULTI-ROOFER PRODUCTION SCALE, BLOCKER BEFORE CONTRACTOR PORTAL OR DASHBOARD EXPOSURE, BLOCKER BEFORE BROADER PRODUCTION LEAD DATA WRITES, BLOCKER BEFORE LIVE PRODUCTION WORKFLOWS; records future scope for tenant isolation, lead data boundary, least-privilege access, row-level/data-boundary controls, secrets, encryption, audit logging, retention/deletion/export, backup/recovery, breach-response runbook, access review, contractor portal security, vendor data-sharing, and security/privacy readiness gate; all concrete fields, safety markers (Planning-only packet: yes, Auth changed: no, Database schema changed: no, RLS policy changed: no, Production data touched: no, etc.), HOLD/BLOCKED cases, dependency map, pre-production security gate checklist, multi-roofer scale blocker checklist, decision log, 90-day plan insertion tracker, and next-operator handoff; wired for dry-run/internal-only/founder-operator-only planning posture with Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only; no implementation of auth/schema/RLS/secrets/access-control; no production writes or live automation',
    script: 'backend/scripts/verify-roofer-data-protection-tenant-isolation-plan-placement-packet-readonly.js',
    args: []
  },
  {
    name: 'First Roofer Founder Review Queue Command Packet (docs/FIRST_ROOFER_FOUNDER_REVIEW_QUEUE_COMMAND_PACKET.md + scripts/run-first-roofer-founder-review-queue-command-packet-dry-run.sh) -- first-roofer founder review queue command packet for founder/operator manual structured review of leads marked READY FOR FOUNDER REVIEW by the First Roofer Manual Downstream Routing Command Packet (and upstream) (founder review queue intake, READY FOR FOUNDER REVIEW eligibility, evidence checklist, homeowner/property/lead summary, contractor/roofer fit summary, appointment and access summary, estimate and next-step readiness summary, homeowner clarification and response-review summary, manual downstream routing summary, data protection and privacy checkpoint, founder decision criteria, manual founder review worksheet, route decision matrix, PASS/HOLD/BLOCKED decision rules, return-to-packet routing options, manual next-action assignment, manual communication draft-review checklist, no-send/no-booking/no-estimate safety confirmation, founder/operator decision log, review queue tracker, end-of-day founder review report, next-chat handoff, explicit dry-run/internal-only/founder-operator-only confirmation; required fields include Queue item ID, Lead ID, homeowner name, property address, lead source, source detail, service type, roofer/contractor name, all prior * states, founder review owner/reviewer, review queue timestamp, review priority, evidence completeness, remaining information gaps with owner/due date, resolved questions/assumptions/constraints, consent/safety, data protection checkpoint, privacy/lead boundary notes, founder decision/reason/evidence, final manual route, next manual action/owner/due, manual communication draft reviewed, ready-for flags, HOLD/BLOCKED reason, notes; values: PASS/HOLD/BLOCKED, HIGH/NORMAL/LOW, COMPLETE/NEEDS INFO/INCONSISTENT/BLOCKED, DRAFT/QUEUED FOR FOUNDER REVIEW/IN FOUNDER REVIEW/REVIEWED/ROUTED MANUALLY/HOLD/BLOCKED, all READY FOR MANUAL ... and RETURN TO ... routes; eligibility: manual downstream route READY FOR FOUNDER REVIEW + prior state ROUTED MANUALLY/REVIEWED + response-review PASS or not required + gaps owned with due dates + contractor fit confirmed or NEEDS INFO + contact permission known + consent/safety clear + data protection reviewed + no prod action required + founder/operator manual review only; HOLD/BLOCKED cases: missing Queue item ID/Lead ID/homeowner name/property address/lead source/source detail/service type/roofer name/founder review owner/reviewer/review queue timestamp, manual downstream route not READY FOR FOUNDER REVIEW, prior state not reviewed, unresolved response-review, missing/inconsistent evidence, missing contact permission, unresolved consent/safety, missing contractor service-area fit, unresolved questions/assumptions/constraints without owner, data protection not reviewed, gaps without owner/due, missing final route/next action/owner/due, comm needed but draft not reviewed, any send/booking/estimate/quote/invoice attempted, any prod/external/live risk; route matrix: evidence complete/manual message only -> READY FOR MANUAL SEND REVIEW, inspection/access next -> READY FOR MANUAL APPOINTMENT COORDINATION, estimate next-step next -> READY FOR MANUAL ESTIMATE NEXT-STEP, contractor confirmation needed -> READY FOR MANUAL CONTRACTOR REVIEW, homeowner clarification needed -> READY FOR MANUAL HOMEOWNER CLARIFICATION, routing unclear -> RETURN TO MANUAL DOWNSTREAM ROUTING, response review correction -> RETURN TO HOMEOWNER CLARIFICATION RESPONSE REVIEW, clarification prep -> RETURN TO HOMEOWNER CLARIFICATION, contractor estimate correction -> RETURN TO CONTRACTOR ESTIMATE REVIEW, estimate prep correction -> RETURN TO MANUAL ESTIMATE PREP, estimate next-step readiness correction -> RETURN TO ESTIMATE NEXT-STEP READINESS, manual follow-up needed -> RETURN TO MANUAL FOLLOW-UP, appointment/access must resolve -> RETURN TO APPOINTMENT OR ACCESS COORDINATION, more info no safety -> HOLD, safety/consent/prod/data risk -> BLOCKED; tracker/decision log/EOD report/handoff; all safety markers no; dry-run/internal-only/founder-operator-only, Founder-Led Launch Program, book inspections, book appointments, manual founder/operator review, manual coordination only, READY FOR FOUNDER REVIEW, data protection checkpoint, privacy / lead boundary notes; no forbidden business language, no impl-risk strings; wired into aggregate/index/contexts/workflow/daily guide with corrected closeout lesson preserved)',
    script: 'backend/scripts/verify-first-roofer-founder-review-queue-command-packet-readonly.js',
    args: []
  },
  {
    name: 'Website Founder-Led Launch Copy Cleanup (docs/WEBSITE_FOUNDER_LED_LAUNCH_COPY_CLEANUP_PACKET.md + scripts/run-website-founder-led-launch-copy-dry-run.sh + backend/scripts/verify-website-founder-led-launch-copy-readonly.js) -- website-only public copy/positioning/flow/conversion cleanup for Founder-Led Launch Program (safer CTAs, manual review/manual coordination framing, forbidden auto/guarantee/quote/invoice/booking language removal, FAQ now-vs-later + explicit approval safety copy); read-only verifier asserts required safe phrases present and forbidden absent in website/index.html + changed public docs, asserts no backend/src and no migration/schema/auth/secrets/env modified, wires into aggregate + index + next-chat + daily guide; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-website-founder-led-launch-copy-readonly.js',
    args: []
  },
  {
    name: 'Website Founder-Led Launch Conversion Polish (docs/WEBSITE_FOUNDER_LED_CONVERSION_POLISH_PACKET.md + scripts/run-website-founder-led-conversion-polish-dry-run.sh + backend/scripts/verify-website-founder-led-conversion-polish-readonly.js) -- website-only public copy polish after cleanup for first paid roofer outreach (natural/credible/conversion-oriented language, hero/FAQ clarity, reduced awkward repetition; required safe phrases preserved, polish leftovers and prior risky phrases absent, founder-led/manual-review-backed/manual coordination positioning kept); read-only verifier asserts required safe phrases present and polish-forbidden absent in website/index.html, asserts no backend/src and no migration/schema/auth/secrets/env modified, wires into aggregate + index + next-chat + daily guide; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-website-founder-led-conversion-polish-readonly.js',
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
      pass(`Live workflow activation ${key} is not active`);
    } else {
      fail(`Live workflow activation ${key} is active or unknown`, {
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
