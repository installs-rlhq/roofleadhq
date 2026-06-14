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
    name: 'First Paid Roofer Prospect Pipeline / Tracker Packet (docs/FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md + scripts/run-first-paid-roofer-prospect-pipeline-tracker-packet-dry-run.sh) -- product-moving prospect pipeline tracker packet for identifying, scoring, contacting, following up, demo-qualifying, and handing off the first paid roofer prospect into the Sales Outreach and Launch packets: 1. prospect source list template (prioritized channels + entry template, Go/No-Go health gate), 2. ideal first roofer fit filters (core must-be-true + bonus signals + CLEAR FIT gate), 3. bad-fit/disqualifier filters (hard BLOCKED list + soft HOLD triggers with status gate), 4. prospect tracker table (21 concrete columns: Prospect name, Company, Location, Website, Source, Contact name, Contact channel, Lead volume estimate, Fit score, Pain signal, Outreach status, Follow-up count, Demo status, Objection, Decision status, Handoff status, Next action, Next action date, Owner, Notes, Evidence link/reference; sample rows + update rules), 5. outreach status stages (NOT CONTACTED, OUTREACH SENT warm/cold, REPLIED variants, CLOSED / NO RESPONSE), 6. follow-up status stages (manual 3-touch cadence with exact timing, no cron/Lindy, count column rules), 7. demo status stages (NOT SCHEDULED through COMPLETED - STRONG FIT / HOLD / NOT FIT + full pre-demo internal checklist using only allowed language), 8. fit scorecard summary fields (8 categories 0-50, scoring guidance, early thresholds 35+ for CLEAR FIT), 9. evidence log (append-only per-event template with verbatim quotes + safety re-confirm line), 10. next action queue (prioritized daily snapshot template + health rules), 11. handoff readiness checklist (9 preconditions + full handoff artifact template to Sales Outreach System Packet + post-handoff tracker rules), 12. no-go / not-now / nurture handling (pre-contact BLOCKED, post-touch BLOCKED, NOT-NOW to nurture list + 45-day rules, required log + tracker updates), 13. weekly pipeline review checklist (verifier run + tracker audit + nurture sweep + safety + health gate), 14. founder/operator daily pipeline command center (daily snapshot + morning/EOD routines + command center gates), 15. explicit safety guardrails (15+ disabled items including CRM automation, 18+ markers, re-confirmation protocol at every gate, forbidden public phrases list with strict enforcement); concrete copy-paste tracker, stages, templates, PASS/HOLD/BLOCKED gates, decision log; product-moving and operationally usable for Jason to run first paid roofer prospect pipeline upstream of sales; dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation; hands off cleanly to FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md and Launch System Packet',
    script: 'backend/scripts/verify-first-paid-roofer-prospect-pipeline-tracker-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Outreach Execution Kit (docs/FIRST_PAID_ROOFER_OUTREACH_EXECUTION_KIT.md + scripts/run-first-paid-roofer-outreach-execution-kit-dry-run.sh) -- practical day-one manual execution kit for Jason to find, qualify, contact, follow up, and hand off the first paid roofer prospect into the Sales Outreach System Packet and Launch System Packet: 1. day-one outreach operating plan (morning setup checklist, prospect sourcing block, qualification/scoring block, message preparation block, manual send block, follow-up review block, end-of-day pipeline review, next-day handoff), 2. first 20 prospect sourcing worksheet (manual-only channels, required fields, evidence fields, exclusion/disqualifier fields, fit notes, next action, 20-row copy-paste table), 3. prospect qualification gate (must-have criteria, strong-fit signals, soft HOLD, hard BLOCKED, service-area/roofing niche fit, lead-volume estimate, paid-lead pain signal, response-speed pain signal, owner/founder accessibility signal, PASS/HOLD/BLOCKED), 4. first-contact message preparation queue (warm/cold/referral draft templates, call opener script, voicemail script, LinkedIn/short version — all using only RoofLeadHQ AI + booked homeowner appointments + Guided Setup first + 14-day trial after setup goes live + automated email 2 days before first monthly payment + cancel anytime + no long-term contract), 5. follow-up execution queue (manual touch 1/2/3, timing guidance, templates, stop rules, not-now/nurture handling, no cron/Lindy/automation), 6. demo-call readiness handoff (when to offer, prep checklist, pre-demo evidence, discovery questions, objection notes, handoff artifact to FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md), 7. sales-to-launch handoff trigger (criteria for moving into FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md, required evidence, trial language confirmation, setup readiness notes, go-live assumptions, payment/trial expectations, cancellation/no-go, handoff artifact), 8. manual tracker templates (9 copy-paste-ready tables: Prospect Source List, Outreach Queue, Follow-up Queue, Demo Readiness Queue, Objection Log, Evidence Log, Daily Operator Review, Weekly Pipeline Review, Handoff Summary), 9. safety guardrails (manual-only outreach, draft-only prep, no live send, no automated follow-up, no CRM automation, no calendar booking automation, no payment automation, no external service calls, no production Supabase writes, no public routes, no contractor portal, no auth/RLS/security, no estimates/quotes/invoices/payments, no guarantee language, no booked-jobs language, full 15+ disabled list + safety markers), 10. public-vs-internal language boundary (prospect-facing must use only allowed public phrasing; internal founder/operator/manual language labeled and restricted to dry-run sections only; verifier enforces forbidden phrases absent from prospect-facing content); references FIRST_PAID_ROOFER_PROSPECT_PIPELINE_TRACKER_PACKET.md + FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md; concrete worksheets, gates, templates, queues, artifacts, trackers; product-moving and operationally usable for day-one founder/operator manual execution; dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-first-paid-roofer-outreach-execution-kit-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Sales Outreach System Packet (docs/FIRST_PAID_ROOFER_SALES_OUTREACH_SYSTEM_PACKET.md + scripts/run-first-paid-roofer-sales-outreach-system-packet-dry-run.sh) -- product-moving sales outreach packet for securing the first paid roofer: 1. ideal first roofer profile (core criteria, bonus signals, evidence capture), 2. disqualifiers / bad-fit criteria (hard BLOCKED and soft HOLD with exact triggers), 3. warm outreach message (email/LinkedIn/call templates using only RoofLeadHQ AI + booked homeowner appointments + 14-day trial + cancel anytime language), 4. cold outreach message (LinkedIn/email/call), 5. referral ask message, 6. short follow-up sequence (max 3-4 manual touches, no automation), 7. demo call checklist (pre/during/post with allowed framing only), 8. discovery questions (10 concrete questions), 9. objection handling (6+ scripts using only allowed trial/Guided Setup language), 10. pricing/trial explanation (Guided Setup + 14-day trial + automated email 2 days before first monthly payment + cancel anytime, no day-15 language), 11. fit decision scorecard (8 categories scored 1-5, 32+ threshold for PASS, evidence requirements), 12. handoff to First Paid Roofer Launch System Packet (preconditions, handoff artifact template, checklist), 13. no-go / not-now handling (scripts for all paths + tracker update rules), 14. evidence log and prospect tracker (columns, per-event log template, audit fields), 15. explicit safety guardrails (full 15 disabled items, 18+ markers, re-confirmation protocol at every gate, forbidden public phrases list); concrete templates, scorecards, trackers, PASS/HOLD/BLOCKED gates, decision log; product-moving and operationally usable for Jason to run first paid roofer sales outreach end-to-end; dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation; hands off cleanly to Launch System Packet',
    script: 'backend/scripts/verify-first-paid-roofer-sales-outreach-system-packet-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Demo + Close Execution Kit (docs/FIRST_PAID_ROOFER_DEMO_CLOSE_EXECUTION_KIT.md + scripts/run-first-paid-roofer-demo-close-execution-kit-dry-run.sh) -- practical manual execution kit for Jason after a roofer replies or agrees to talk: prepare for the demo call, run the demo, qualify fit, explain the offer/trial clearly, handle objections, decide PASS/HOLD/BLOCKED, close the first paid roofer or route to no-go/not-now, and hand off into the Launch System Packet; 1. demo-call readiness checklist (replied/intro/call requested, company/service-area fit, lead source context, paid-lead pain, response-speed pain, lead volume estimate, owner/decision-maker status, outreach/objection history, evidence refs, PASS/HOLD/BLOCKED gate before demo), 2. pre-demo preparation worksheet (roofer summary, current lead sources, response process, missed-lead symptoms, follow-up gap, calendar/inspection booking friction, current tools, trial-fit notes, questions to ask, red flags, demo outcome objective), 3. demo call agenda (opening frame through why RoofLeadHQ exists, problem framing paid leads leak on slow response/follow-up, AI positioning, what it does + does not promise, Guided Setup, 14-day trial after setup goes live, automated email 2 days before first monthly payment, cancel anytime, no long-term contract, fit questions, next-step close), 4. demo script (prospect-facing only: exact RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response/automated follow-up/missed-lead recovery + Guided Setup first + 14-day trial after setup goes live + automated email 2 days before first monthly payment + cancel anytime + no long-term contract), 5. discovery question bank (20+ specific across lead sources/volume/missed leads/speed-to-lead/follow-up/inspection booking/CRM/tooling/seasonality/service area/decision-maker authority/trial expectations/bad-fit signs), 6. fit decision scorecard (12 dimensions: lead volume/quality, missed-lead pain, speed-to-lead pain, follow-up gap, inspection booking fit, owner/DM fit, setup readiness, trial expectations, payment readiness, safety/no-overclaim risk + PASS >=42 + no 1s + trial lang confirmed / HOLD 32-41 or key gaps / BLOCKED <32 or hard disqualifiers + evidence required for every score), 7. objection handling playbook (concise prospect-facing responses for 11 common objections using only allowed trial/Guided Setup language, no guarantees), 8. trial and payment explanation (Guided Setup first, 14-day trial after setup goes live, automated email 2 days before first monthly payment, cancel anytime, no long-term contract + explicit confirmation check; no day-15 phrasing), 9. close/no-close decision tree (close now, demo complete needs follow-up, 4x HOLD variants, 4x BLOCKED variants, not-now/nurture, no-go + required next action for each), 10. sales-to-launch handoff artifact (prospect/company/contact, decision status, fit score, trial terms confirmed, setup readiness, lead source/booking/follow-up/reporting notes known/unknown, objections resolved/unresolved, evidence refs, go-live assumptions, next action owner/date), 11. manual tracker templates (9 copy-paste-ready tables: Demo Readiness Queue, Pre-demo Prep Worksheet, Discovery Notes, Fit Scorecard, Objection Log, Trial/Payment Explanation Confirmation, Close/No-Close Decision Log, Sales-to-Launch Handoff Summary, Follow-up/Nurture Queue), 12. safety guardrails (manual-only demo prep, draft-only follow-up, no live send/automation/CRM/calendar/payment/external calls/Supabase writes/public routes/portal/auth/RLS/estimates/quotes/invoices/payment workflows/guarantees/booked-jobs + full re-confirmation protocol), 13. public-vs-internal language boundary (prospect-facing uses only approved strings; internal founder/operator/manual allowed only in labeled internal-only dry-run sections); references prospect pipeline + outreach execution + sales outreach + launch packets; verifier is read-only/non-executable; enforces all 13 sections + 9 tables + exact prospect-facing language + forbidden phrases absent from prospect sections + wiring + no unsafe code; wired into aggregate + verifier index + next-chat contexts + daily guide + quality gate; dry-run/internal-only/founder-operator-only; no backend/src, no migrations/schema/auth/secrets/env, no external calls, no production activation, no live sends',
    script: 'backend/scripts/verify-first-paid-roofer-demo-close-execution-kit-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Guided Setup Execution Kit (docs/FIRST_PAID_ROOFER_GUIDED_SETUP_EXECUTION_KIT.md + scripts/run-first-paid-roofer-guided-setup-execution-kit-dry-run.sh) -- practical manual execution kit for Jason after the first paid roofer says yes: collect setup information, confirm lead sources, define response/follow-up preferences, capture booking/calendar preferences, confirm reporting expectations, identify go-live blockers, and hand off into the existing First Paid Roofer Launch System Packet; 1. Guided Setup intake checklist (closed/won confirmation, decision-maker confirmation, trial terms confirmed with exact language, Guided Setup first, 14-day trial begins only after setup goes live, automated email 2 days before first monthly payment, cancel anytime, no long-term contract, setup owner, setup target date, missing information gate, PASS/HOLD/BLOCKED setup status), 2. roofer business profile worksheet (company name, owner/contact, service area, roofing services offered, lead types accepted/rejected, office hours, emergency/storm response, preferred homeowner contact style, brand/tone notes, bad-fit scenarios, notes/evidence), 3. lead source setup worksheet (sources used, monthly volume, paid/organic mix, quality notes, formats, required fields, missing-field handling, source owner, access status, manual-only access notes, HOLD/BLOCKED conditions), 4. response and follow-up preferences worksheet (initial response style, urgency framing, cadence, max attempts, stop conditions, do-not-contact, consent, escalation, owner review, draft approval, manual-only guardrails), 5. booking and calendar preferences worksheet (inspection goal, appointment windows, travel constraints, same/next-day rules, weather/storm constraints, homeowner info req, contractor confirm req, calendar access, manual calendar handling only, no calendar automation, unknowns/blockers), 6. reporting preferences worksheet (weekly/monthly expectations, key metrics, lead/appt status cats, missed recovery, trial success indicators, reporting contact/cadence, manual notes), 7. setup risk and blocker register (explicit PASS/HOLD/BLOCKED rules for: decision-maker not confirmed, trial terms unclear, lead sources unknown, lead access not available, lead fields incomplete, response/follow-up prefs unclear, booking/calendar unclear, data protection unresolved, guarantee-seeking, wants auto quote/invoice/payment, wants live automation before approval), 8. Guided Setup call agenda (10 steps: opening, re-confirm close/yes + public language, explain setup-before-trial, gather profile/lead sources/response/follow-up/booking/reporting, confirm safety/go-live criteria, next action), 9. Guided Setup script (customer-facing only: exact RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response/automated follow-up/missed-lead recovery + Guided Setup happens first + 14-day trial begins after setup goes live + automated email 2 days before first monthly payment + cancel anytime + no long-term contract + "Setup is used to understand your leads, booking preferences, follow-up preferences, and reporting expectations before go-live"), 10. go-live readiness checklist (required fields complete, lead src/response/follow-up/booking/reporting complete enough, trial lang confirmed, data prot checkpoint, no guarantee/auto-claims, no live auto activated, PASS/HOLD/BLOCKED gate), 11. setup-to-launch handoff artifact (16 fields: roofer/contact, close ref, fit score, trial terms, setup owner, completion status, lead src summary, response/follow-up/booking/reporting prefs, open blockers, data prot notes, go-live assumptions/readiness, next action owner/date, evidence refs), 12. manual tracker templates (exactly 9 copy-paste-ready tables: Guided Setup Intake Queue, Roofer Business Profile, Lead Source Setup Worksheet, Response and Follow-up Preferences, Booking and Calendar Preferences, Reporting Preferences, Setup Blocker Register, Go-live Readiness Checklist, Setup-to-Launch Handoff Summary), 13. safety guardrails (manual-only setup prep, draft-only notes, no live send, no automated follow-up, no CRM/calendar/payment automation, no external calls, no prod Supabase writes, no public routes/portal/auth/RLS, no estimates/quotes/invoices/payments, no guarantee or booked-jobs language; full disabled list + markers + re-confirmation at every gate), 14. public-vs-internal language boundary (customer-facing uses only approved public strings; internal founder/operator/manual language confined to explicitly labeled internal-only dry-run sections); product-moving and operationally usable for Jason to run first paid roofer Guided Setup end-to-end; dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation; hands off cleanly to Launch System Packet; references Demo Close, Launch, Prospect Pipeline Tracker, and Data Protection/Tenant Isolation packets',
    script: 'backend/scripts/verify-first-paid-roofer-guided-setup-execution-kit-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Go-Live Readiness Execution Kit (docs/FIRST_PAID_ROOFER_GO_LIVE_READINESS_EXECUTION_KIT.md + scripts/run-first-paid-roofer-go-live-readiness-execution-kit-dry-run.sh) -- practical manual execution system Jason (founder/operator) can use after Guided Setup is complete but before RoofLeadHQ AI setup goes live and before the 14-day trial begins: confirm setup completeness, lead source readiness, response/follow-up readiness, booking/calendar readiness, reporting readiness, approved trial/payment language, data protection checkpoint, blocker status, and PASS/HOLD/BLOCKED go-live readiness; hands off into the First Paid Roofer Launch System Packet and trial day-one operations; 1. Internal-only dry-run scope, 2. Go-live readiness purpose, 3. Inputs from Guided Setup (filled worksheets + handoff draft + safety log), 4. Setup completion review checklist (business/lead/response/booking/reporting completeness gates), 5. Lead source readiness checklist (format evidence, access path for manual, volume, quality), 6. Response and follow-up readiness checklist (tone/cadence/stop/escalation/manual review plan), 7. Booking and calendar readiness checklist (windows/constraints/manual-only/no auto expectation), 8. Reporting readiness checklist (metrics/cadence/contact/manual compile), 9. Trial/payment language confirmation (exact 6 approved strings: RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract), 10. Data protection and tenant isolation checkpoint (refs WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md; single-tenant manual controls), 11. Go-live blocker register (14 explicit PASS/HOLD/BLOCKED rules including data prot unresolved, guarantee-seeking, auto-estimate, live auto before approval), 12. PASS/HOLD/BLOCKED go-live decision gate (all areas PASS + verifiers green + safety re-confirm + only PASS advances), 13. Setup-to-trial handoff artifact (16+ fields for Launch Packet + day-one), 14. Trial day-one readiness handoff (into Launch section 6 + FIRST_ROOFER_DAY_ONE_COMMAND_CENTER), 15. Safety guardrails (full disabled list + markers + no backend/src/migrations/schema/auth/RLS/secrets/env/production routes/external calls), 16. Public-vs-internal language boundary (approved strings only in customer sections; internal-only labels on all execution sections), 17. 9 copy-paste-ready manual tracker tables (Setup Completion Review Tracker, Lead Source Readiness Tracker, Response Follow-Up Readiness Tracker, Booking Calendar Readiness Tracker, Reporting Readiness Tracker, Trial Payment Language Confirmation Tracker, Data Protection Checkpoint Tracker, Go-Live Blocker Register, Setup-to-Trial Handoff Tracker with owner/status/evidence/next-action columns); references Guided Setup + Launch + Demo Close + Prospect Pipeline + Trial Direction Regression + Data Protection packets; explicit wiring; read-only verifier; dry-run/internal-only/founder-operator-only; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation; hands off cleanly on PASS only',
    script: 'backend/scripts/verify-first-paid-roofer-go-live-readiness-execution-kit-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Trial Day-One Operating Kit (docs/FIRST_PAID_ROOFER_TRIAL_DAY_ONE_OPERATING_KIT.md + scripts/run-first-paid-roofer-trial-day-one-operating-kit-dry-run.sh) -- practical manual operating system Jason (founder/operator) can use on Trial Day One after Go-Live Readiness has passed and RoofLeadHQ AI setup goes live: guide manual day-one monitoring, first lead handling, response/follow-up review, booked homeowner appointment readiness, missed-lead recovery review, blocker handling, daily reporting, trial health status, and handoff into ongoing 14-day trial operations; 1. Internal-only dry-run scope, 2. Trial day-one purpose, 3. Preconditions from Go-Live Readiness, 4. Trial day-one command center, 5. First lead intake review, 6. Response and follow-up monitoring, 7. Missed-lead recovery review, 8. Booked homeowner appointment readiness review, 9. Contractor/roofer communication readiness, 10. Homeowner communication draft-review checklist, 11. Day-one blocker and escalation register, 12. Trial health PASS/HOLD/BLOCKED gate, 13. Day-one reporting snapshot, 14. End-of-day handoff into 14-day trial operations, 15. Safety guardrails, 16. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Trial Day-One Command Center Tracker, First Lead Intake Review Tracker, Response Follow-Up Monitoring Tracker, Missed-Lead Recovery Tracker, Booked Homeowner Appointment Readiness Tracker, Contractor Roofer Communication Tracker, Homeowner Communication Draft Review Tracker, Day-One Blocker Register, End-of-Day Trial Handoff Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; references Go-Live Readiness + Guided Setup + Launch System + First Roofer Day-One Command Center + Lead-to-Inspection Ops + Trial Direction Regression + Data Protection/Tenant Isolation packets; internal founder/operator language only for safety/ops; dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-first-paid-roofer-trial-day-one-operating-kit-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Trial Reporting + Success Review Kit (docs/FIRST_PAID_ROOFER_TRIAL_REPORTING_SUCCESS_REVIEW_KIT.md + scripts/run-first-paid-roofer-trial-reporting-success-review-kit-dry-run.sh) -- practical manual reporting and success review system Jason (founder/operator) can use during and at the end of the 14-day trial after Trial Day One: guide manual trial reporting, lead/appointment outcome tracking, missed-lead recovery review, booked homeowner appointment tracking, trial health scoring, blocker review, pre-payment email readiness, cancellation/no-go handling, first monthly payment handoff readiness, and success review with the roofer; 1. Internal-only dry-run scope, 2. Trial reporting and success review purpose, 3. Inputs from Trial Day One and Launch System, 4. Daily trial reporting rhythm, 5. Lead intake and source performance review, 6. Response and follow-up outcome review, 7. Missed-lead recovery outcome review, 8. Booked homeowner appointment tracking, 9. Roofer communication and feedback review, 10. Trial health scorecard, 11. Blocker and risk review, 12. Pre-payment email readiness checklist, 13. Cancellation/no-go handling, 14. First monthly payment handoff readiness, 15. Success review call agenda and script, 16. End-of-trial PASS/HOLD/BLOCKED decision gate, 17. Safety guardrails, 18. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Daily Trial Reporting Tracker, Lead Source Performance Tracker, Response Follow-Up Outcome Tracker, Missed-Lead Recovery Outcome Tracker, Booked Homeowner Appointment Tracker, Roofer Feedback Review Tracker, Trial Health Scorecard Tracker, Pre-Payment Email Readiness Tracker, End-of-Trial Decision Handoff Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; references Trial Day One Operating Kit + Go-Live Readiness + Guided Setup + Launch System + First Roofer Day-One Command Center + Lead-to-Inspection Ops Pack + Trial Direction Regression + Data Protection packets, wiring, non-exec verifier, wrapper calls node--check + quality gate, product-depth, no unsafe/impl strings, no backend/src/migrations/schema/auth/secrets/env/external calls/production routes/live sends/integrations, no forbidden customer phrases, asserts no forbidden impl files changed.',
    script: 'backend/scripts/verify-first-paid-roofer-trial-reporting-success-review-kit-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Trial Conversion / Payment Handoff Kit (docs/FIRST_PAID_ROOFER_TRIAL_CONVERSION_PAYMENT_HANDOFF_KIT.md + scripts/run-first-paid-roofer-trial-conversion-payment-handoff-kit-dry-run.sh) -- practical manual conversion and payment handoff system Jason (founder/operator) can use after the 14-day trial success review: guide manual trial closeout, proceed/cancel decision capture, first monthly payment readiness, pre-payment email confirmation, roofer approval evidence, cancellation/no-go handling, payment handoff readiness, first-month operating expectations, and post-trial customer status tracking; 1. Internal-only dry-run scope, 2. Trial conversion and payment handoff purpose, 3. Inputs from Trial Reporting + Success Review, 4. Trial closeout evidence checklist, 5. Proceed/cancel decision capture, 6. Roofer approval evidence log, 7. Pre-payment email confirmation review, 8. First monthly payment readiness checklist, 9. Payment handoff readiness artifact, 10. Cancellation/no-go handling, 11. First-month operating expectations, 12. Post-trial customer status tracker, 13. Payment and billing blocker register, 14. Conversion PASS/HOLD/BLOCKED decision gate, 15. Safety guardrails, 16. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Trial Closeout Evidence Tracker, Proceed Cancel Decision Tracker, Roofer Approval Evidence Tracker, Pre-Payment Email Confirmation Tracker, First Monthly Payment Readiness Tracker, Payment Handoff Readiness Tracker, Cancellation No-Go Handling Tracker, First-Month Operating Expectations Tracker, Post-Trial Customer Status Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; references Trial Reporting + Success Review (primary input) + Trial Day One Operating Kit + Go-Live Readiness + Guided Setup + Launch System + Trial Direction Regression + Data Protection/Tenant Isolation packets; dry-run/internal-only/founder-operator-only; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-first-paid-roofer-trial-conversion-payment-handoff-kit-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer First-Month Operating Kit (docs/FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md + scripts/run-first-paid-roofer-first-month-operating-kit-dry-run.sh) -- practical manual first-month operating system Jason (founder/operator) can use after the first paid roofer converts from trial into paid status: guide first-month kickoff, ongoing lead/appointment tracking, missed-lead recovery review, weekly value reporting, roofer feedback, blocker handling, cancellation-risk monitoring, support boundaries, monthly success review, and handoff into ongoing monthly operations; 1. Internal-only dry-run scope, 2. First-month operating purpose, 3. Inputs from Trial Conversion / Payment Handoff, 4. First-month kickoff checklist, 5. Paid customer status confirmation, 6. Lead intake operating rhythm, 7. Response and follow-up monitoring rhythm, 8. Missed-lead recovery review rhythm, 9. Booked homeowner appointment tracking, 10. Weekly value report preparation, 11. Roofer feedback and support review, 12. Cancellation-risk and blocker review, 13. First-month issue escalation register, 14. Monthly success review agenda and script, 15. Ongoing monthly operations handoff, 16. First-month PASS/HOLD/BLOCKED decision gate, 17. Safety guardrails, 18. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (First-Month Kickoff Tracker, Paid Customer Status Tracker, Lead Intake Operating Tracker, Response Follow-Up Monitoring Tracker, Missed-Lead Recovery Review Tracker, Booked Homeowner Appointment Tracker, Weekly Value Report Tracker, Roofer Feedback Support Tracker, First-Month Success Review Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; references Trial Conversion / Payment Handoff Kit (primary), Trial Reporting + Success Review, Trial Day One Operating Kit, Go-Live Readiness, Guided Setup, Launch System, Trial Direction Regression, Data Protection/Tenant Isolation packets; dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-first-paid-roofer-first-month-operating-kit-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Monthly Success / Retention Kit (docs/FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md + scripts/run-first-paid-roofer-monthly-success-retention-kit-dry-run.sh) -- practical manual monthly success and retention operating system Jason (founder/operator) can use after the first paid roofer completes the first month and moves into ongoing monthly operations: guide monthly value reporting, roofer feedback review, appointment/lead trend review, missed-lead recovery review, retention-risk detection, blocker handling, support boundaries, next-month operating plan, cancellation-risk handling, and ongoing customer success handoff; 1. Internal-only dry-run scope, 2. Monthly success and retention purpose, 3. Inputs from First-Month Operating Kit, 4. Monthly customer status confirmation, 5. Monthly lead and appointment trend review, 6. Response and follow-up performance review, 7. Missed-lead recovery performance review, 8. Monthly value report preparation, 9. Roofer feedback and satisfaction review, 10. Retention-risk and cancellation-risk review, 11. Support boundary and scope review, 12. Blocker and issue escalation register, 13. Next-month operating plan, 14. Monthly success review agenda and script, 15. Ongoing customer success handoff, 16. Monthly PASS/HOLD/BLOCKED retention gate, 17. Safety guardrails, 18. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Monthly Customer Status Tracker, Lead Appointment Trend Review Tracker, Response Follow-Up Performance Tracker, Missed-Lead Recovery Performance Tracker, Monthly Value Report Tracker, Roofer Feedback Satisfaction Tracker, Retention Risk Review Tracker, Monthly Issue Escalation Tracker, Next-Month Operating Plan Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; references First-Month Operating Kit (primary input) + Trial Conversion / Payment Handoff + Trial Reporting + Success Review + Trial Day One Operating Kit + Go-Live Readiness + Guided Setup + Launch System + Website Trial Direction Regression + Data Protection/Tenant Isolation packets; dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-first-paid-roofer-monthly-success-retention-kit-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Proof / Referral / Expansion Kit (docs/FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md + scripts/run-first-paid-roofer-proof-referral-expansion-kit-dry-run.sh) -- practical manual success proof capture, referral request readiness (without pressure), testimonial/case-study readiness (customer-approved only), and safe expansion/plan-fit review (non-pushy) system Jason (founder/operator) can use after the first paid roofer has completed the first month and monthly success review: guide customer proof evidence review, lead and booked homeowner appointment outcome summary, missed-lead recovery proof summary, value narrative preparation, roofer approval and consent checklist, testimonial readiness checklist, case-study readiness checklist, referral request readiness checklist, referral ask script and follow-up tracker, expansion / plan-fit review, non-pushy upgrade boundary, cancellation-risk and trust-risk guardrails, proof asset handoff, ongoing monthly operations handoff, and PASS/HOLD/BLOCKED proof/referral/expansion gate; 1. Internal-only dry-run scope, 2. Proof / referral / expansion purpose, 3. Inputs from Monthly Success / Retention Kit, 4. Customer proof evidence review, 5. Lead and booked homeowner appointment outcome summary, 6. Missed-lead recovery proof summary, 7. Value narrative preparation, 8. Roofer approval and consent checklist, 9. Testimonial readiness checklist, 10. Case-study readiness checklist, 11. Referral request readiness checklist, 12. Referral ask script and follow-up tracker, 13. Expansion / plan-fit review, 14. Non-pushy upgrade boundary, 15. Cancellation-risk and trust-risk guardrails, 16. Proof asset handoff, 17. Ongoing monthly operations handoff, 18. PASS/HOLD/BLOCKED proof/referral/expansion gate, 19. Safety guardrails, 20. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Proof Evidence Tracker, Lead Appointment Outcome Summary Tracker, Missed-Lead Recovery Proof Tracker, Value Narrative Tracker, Roofer Consent Approval Tracker, Testimonial Readiness Tracker, Case Study Readiness Tracker, Referral Request Tracker, Expansion Plan-Fit Review Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; references Monthly Success / Retention Kit (primary input) + First-Month Operating Kit + Trial Conversion / Payment Handoff + Trial Reporting + Success Review + Launch System + Trial Direction Regression + Data Protection/Tenant Isolation packets; no live SMS/Twilio/Vapi/Calendar/Resend/Lindy/cron/scheduler/dispatcher/CRM/prod writes/public routes/auth/RLS/contractor portal/payment/estimate/quote/invoice/external calls/credentials/secrets/migrations/backend-src changes; internal-only / dry-run / founder-operator-only; no customer proof publication without explicit roofer consent; no pressure referral language; no guarantees',
    script: 'backend/scripts/verify-first-paid-roofer-proof-referral-expansion-kit-readonly.js',
    args: []
  },
  {
    name: 'Second Paid Roofer Repeatable Launch Kit (docs/SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md + scripts/run-second-paid-roofer-repeatable-launch-kit-dry-run.sh) -- practical manual repeatable launch system Jason (founder/operator) can use to repeat the first paid roofer launch process for a second paid roofer using the completed first paid roofer operating sequence (post proof/referral/expansion) as template: qualify the second roofer, reuse safe setup patterns, confirm offer/language, prepare Guided Setup, prepare go-live/trial/first-month/monthly retention/ proof-referral handoffs, and prevent ad-hoc scaling before production security and tenant isolation are approved; 1. Internal-only dry-run scope, 2. Second paid roofer repeatable launch purpose, 3. Inputs from first paid roofer proof/referral/expansion kit, 4. Second roofer qualification checklist, 5. Referral/source intake review, 6. Offer and public language confirmation, 7. Guided Setup reuse checklist, 8. Go-live readiness reuse checklist, 9. Trial day-one reuse checklist, 10. Trial reporting and success review reuse checklist, 11. Trial conversion and payment handoff reuse checklist, 12. First-month operating reuse checklist, 13. Monthly retention reuse checklist, 14. Proof/referral/expansion reuse checklist, 15. Multi-roofer safety and tenant-isolation boundary, 16. Second roofer blocker and readiness register, 17. Repeatable launch handoff artifact, 18. PASS/HOLD/BLOCKED second-roofer launch gate, 19. Safety guardrails, 20. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Second Roofer Qualification Tracker, Referral Source Intake Tracker, Offer Language Confirmation Tracker, Guided Setup Reuse Tracker, Go-Live Readiness Reuse Tracker, Trial Operations Reuse Tracker, First-Month Monthly Handoff Tracker, Multi-Roofer Safety Boundary Tracker, Second Roofer Launch Gate Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; references Proof / Referral / Expansion Kit (primary input) + Monthly Success / Retention Kit + First-Month Operating Kit + Trial Conversion / Payment Handoff + Trial Reporting + Success Review + Trial Day-One Operating Kit + Go-Live Readiness + Guided Setup + Launch System + Trial Direction Regression + Data Protection/Tenant Isolation packets; dry-run/internal-only/founder-operator-only; Repeatable launch is manual, single-roofer-at-a-time only and does not imply or authorize production multi-tenant scale, production data writes, contractor portal access, auth/RLS/security implementation, or live automation; prevents ad-hoc scaling before production security and tenant isolation approved; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-second-paid-roofer-repeatable-launch-kit-readonly.js',
    args: []
  },
  {
    name: 'Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (docs/MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md + scripts/run-multi-roofer-safety-tenant-isolation-acceptance-gate-dry-run.sh) -- practical manual acceptance gate and readiness packet Jason (founder/operator) must pass before moving beyond one-at-a-time dry-run roofer operations into any multi-roofer production-scale work: turns prior Data Protection / Tenant Isolation planning into a concrete PASS/HOLD/BLOCKED gate preventing accidental production scale, production data writes, contractor portal exposure, auth/RLS/security changes, or live automation before explicit approval; 1. Internal-only dry-run scope, 2. Multi-roofer safety acceptance purpose, 3. Inputs from Second Paid Roofer Repeatable Launch Kit, 4. Data protection readiness review, 5. Tenant-isolation readiness review, 6. Production auth/RLS/security hold gate, 7. Production schema/migration hold gate, 8. Production data-write hold gate, 9. Contractor portal exposure hold gate, 10. Live automation hold gate, 11. External integration hold gate, 12. Multi-roofer operating boundary, 13. One-at-a-time dry-run operating rule, 14. Approval evidence checklist, 15. Risk and blocker register, 16. Pre-production implementation handoff artifact, 17. PASS/HOLD/BLOCKED multi-roofer safety gate, 18. Safety guardrails, 19. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Data Protection Readiness Tracker, Tenant Isolation Readiness Tracker, Auth RLS Security Hold Tracker, Schema Migration Hold Tracker, Production Data Write Hold Tracker, Contractor Portal Exposure Hold Tracker, Live Automation Hold Tracker, External Integration Hold Tracker, Multi-Roofer Safety Gate Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; references SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md (canonical 137574f) + FIRST_PAID_ROOFER_PROOF_REFERRAL_EXPANSION_KIT.md + FIRST_PAID_ROOFER_MONTHLY_SUCCESS_RETENTION_KIT.md + FIRST_PAID_ROOFER_FIRST_MONTH_OPERATING_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md; internal-only / dry-run / founder-operator-only; acceptance/readiness packet only; does not implement auth/RLS/security, schema, migrations, production writes, contractor portal, live automation, or external integrations; asserts no forbidden implementation files were changed (backend/src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation); wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-multi-roofer-safety-tenant-isolation-acceptance-gate-readonly.js',
    args: []
  },
  {
    name: 'Production Security / Auth / RLS / Schema Readiness Plan (docs/PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md + scripts/run-production-security-auth-rls-schema-readiness-plan-dry-run.sh) -- practical planning and acceptance packet Jason (founder/operator) must use before any production security/auth/RLS/schema implementation begins: converts the multi-roofer safety / tenant-isolation acceptance gate (cc80caf) into a concrete implementation-readiness plan with clear hold gates, required decisions, risks, acceptance criteria, and handoff artifacts; 1. Internal-only dry-run scope, 2. Production security readiness purpose, 3. Inputs from Multi-Roofer Safety / Tenant-Isolation Acceptance Gate, 4. Auth readiness decision log, 5. RLS readiness decision log, 6. Schema readiness decision log, 7. Migration readiness decision log, 8. Tenant isolation acceptance criteria, 9. Data access boundary acceptance criteria, 10. Contractor portal hold boundary, 11. Production write hold boundary, 12. Live automation hold boundary, 13. Security implementation prerequisite checklist, 14. Risk and blocker register, 15. Approval evidence checklist, 16. Implementation handoff artifact, 17. PASS/HOLD/BLOCKED production security readiness gate, 18. Safety guardrails, 19. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Auth Readiness Decision Tracker, RLS Readiness Decision Tracker, Schema Readiness Decision Tracker, Migration Readiness Decision Tracker, Tenant Isolation Acceptance Tracker, Data Access Boundary Tracker, Production Write Hold Tracker, Contractor Portal Hold Tracker, Security Readiness Gate Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract. Planning/readiness/acceptance only. Does not implement auth, RLS, schema, migrations, production writes, contractor portal, live automation, credentials, env changes, or backend/src changes. References MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md (cc80caf) + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md. Dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-production-security-auth-rls-schema-readiness-plan-readonly.js',
    args: []
  },
  {
    name: 'Live Integration Activation Readiness Plan (docs/LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md + scripts/run-live-integration-activation-readiness-plan-dry-run.sh) -- practical planning and acceptance packet Jason (founder/operator) must use before any live integration activation begins: converts the production security / auth / rls / schema readiness plan (at e494f4b) into a concrete live-activation readiness plan with hold gates, approval evidence, rollback requirements, dry-run proof, owner checklist, and PASS/HOLD/BLOCKED activation gate; 1. Internal-only dry-run scope, 2. Live integration readiness purpose, 3. Inputs from Production Security / Auth / RLS / Schema Readiness Plan, 4. Twilio/SMS activation hold gate, 5. Vapi/calling activation hold gate, 6. Calendar booking activation hold gate, 7. Resend/email activation hold gate, 8. Lindy/automation activation hold gate, 9. Cron/scheduler/dispatcher activation hold gate, 10. CRM automation activation hold gate, 11. Payment automation activation hold gate, 12. Production Supabase write activation hold gate, 13. Credentials and env-change hold gate, 14. Dry-run proof checklist, 15. Rollback and kill-switch readiness checklist, 16. Owner approval evidence checklist, 17. Risk and blocker register, 18. Implementation handoff artifact, 19. PASS/HOLD/BLOCKED live integration readiness gate, 20. Safety guardrails, 21. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (SMS Activation Hold Tracker, Calling Activation Hold Tracker, Calendar Activation Hold Tracker, Email Activation Hold Tracker, Automation Scheduler Hold Tracker, CRM Payment Hold Tracker, Production Write Hold Tracker, Rollback Kill-Switch Tracker, Live Integration Readiness Gate Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; internal-only / dry-run / founder-operator-only; planning/readiness/acceptance only; rollback/kill-switch readiness required before future activation; no live SMS, Twilio, Vapi, Calendar, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migrations, auth/RLS/security, contractor portal, or backend/src changes; references PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md (e494f4b) + MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md (cc80caf) + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md; dry-run/internal-only/founder-operator-only',
    script: 'backend/scripts/verify-live-integration-activation-readiness-plan-readonly.js',
    args: []
  },
  {
    name: 'Final Production Go-Live Acceptance Gate (docs/FINAL_PRODUCTION_GO_LIVE_ACCEPTANCE_GATE.md + scripts/run-final-production-go-live-acceptance-gate-dry-run.sh) -- master final go-live acceptance gate Jason (founder/operator) must use before any future approval to start production implementation or live integration activation: combines the prior first-paid launch system, second paid repeatability, multi-roofer safety, production security/auth/rls/schema readiness, and live integration activation readiness into one final PASS/HOLD/BLOCKED go-live decision artifact; 1. Internal-only dry-run scope, 2. Final go-live acceptance purpose, 3. Source-of-truth prerequisite, 4. First paid roofer launch readiness gate, 5. Second paid roofer repeatability readiness gate, 6. Multi-roofer safety / tenant isolation gate, 7. Production security / auth / RLS / schema gate, 8. Live integration activation gate, 9. Data protection and access boundary gate, 10. Customer-facing language and offer boundary gate, 11. Rollback and kill-switch readiness gate, 12. Credential and environment-change hold gate, 13. Production write hold gate, 14. Contractor portal / dashboard hold gate, 15. External integration hold gate, 16. Founder/operator approval evidence checklist, 17. Risk and blocker register, 18. Final implementation handoff artifact, 19. PASS/HOLD/BLOCKED final go-live decision, 20. Safety guardrails, 21. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (First Paid Launch Readiness Tracker, Second Paid Repeatability Tracker, Multi-Roofer Safety Tracker, Production Security Readiness Tracker, Live Integration Readiness Tracker, Data Protection Access Boundary Tracker, Rollback Kill-Switch Tracker, Founder Approval Evidence Tracker, Final Go-Live Decision Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; canonical source of truth before this worktree verified at a11bfbd; references LIVE_INTEGRATION_ACTIVATION_READINESS_PLAN.md (a11bfbd) + PRODUCTION_SECURITY_AUTH_RLS_SCHEMA_READINESS_PLAN.md (e494f4b) + MULTI_ROOFER_SAFETY_TENANT_ISOLATION_ACCEPTANCE_GATE.md (cc80caf) + ROOFER_DATA_PROTECTION_TENANT_ISOLATION_PLAN_PLACEMENT_PACKET.md + SECOND_PAID_ROOFER_REPEATABLE_LAUNCH_KIT.md + FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md; verifier is read-only, asserts required files exist, wrapper executable, all wiring targets include the new packet/verifier/wrapper where appropriate, all required sections exist, all 9 tracker tables exist, references to Live Integration Activation Readiness Plan (a11bfbd) + Production Security / Auth / RLS / Schema Readiness Plan (e494f4b) + Multi-Roofer Safety / Tenant-Isolation Acceptance Gate (cc80caf) + Data Protection/Tenant Isolation packet + Second Paid Roofer Repeatable Launch Kit + Launch System + Trial Direction Regression packet, asserts this packet is final readiness/acceptance only and does not implement or activate live SMS, Twilio, Vapi, Calendar booking, Resend, Lindy, cron, scheduler, dispatcher, CRM automation, payment automation, production Supabase writes, public routes, credentials, env changes, migrations, auth/RLS/security implementation, contractor portal, external integrations, or backend/src changes, asserts rollback/kill-switch readiness, owner approval evidence, source-of-truth verification at a11bfbd, and PASS/HOLD/BLOCKED final decision are required before any future activation or implementation approval, asserts no forbidden implementation files were changed (backend/src, migrations, schema, auth/RLS/security implementation, env/secrets, production routes, external call activation, live send activation, scheduler/cron/dispatcher activation), asserts customer-facing sections use only approved public language and forbidden public phrases absent from customer-facing template sections, asserts internal founder/operator/manual language confined to labeled internal-only dry-run sections, prints clear PASS; wrapper executable, strict bash, calls node --check + this verifier + agent product quality gate; after impl run the exact checks listed in task (no push); all customer-facing uses only approved language; dry-run/internal-only/founder-operator-only',
    script: 'backend/scripts/verify-final-production-go-live-acceptance-gate-readonly.js',
    args: []
  },
  {
    name: 'Production Implementation Sequencing and Approval Plan (docs/PRODUCTION_IMPLEMENTATION_SEQUENCING_AND_APPROVAL_PLAN.md + scripts/run-production-implementation-sequencing-and-approval-plan-dry-run.sh) -- next safest product-moving RoofLeadHQ packet after the final production go-live acceptance gate: implementation sequencing and approval plan Jason (founder/operator) must use before any production implementation slice begins; converts the Final Production Go-Live Acceptance Gate (at f3c3e80) into an ordered implementation roadmap with approval checkpoints, risk controls, rollback requirements, verifier expectations, and PASS/HOLD/BLOCKED decision points for each future slice; 1. Internal-only dry-run scope, 2. Implementation sequencing purpose, 3. Source-of-truth prerequisite, 4. Final go-live gate input summary, 5. Implementation slice approval model, 6. Slice 1: production configuration inventory / env readiness audit, 7. Slice 2: tenant/account model implementation readiness, 8. Slice 3: schema/migration implementation readiness, 9. Slice 4: auth/RLS/security implementation readiness, 10. Slice 5: production write boundary readiness, 11. Slice 6: integration adapter readiness, 12. Slice 7: live communication activation readiness, 13. Slice 8: calendar booking activation readiness, 14. Slice 9: contractor dashboard/portal readiness, 15. Slice 10: payment/billing automation readiness, 16. Required verifier model for each slice, 17. Rollback and kill-switch requirements, 18. Owner approval evidence checklist, 19. Risk and blocker register, 20. PASS/HOLD/BLOCKED implementation sequencing decision, 21. Safety guardrails, 22. Public-vs-internal language boundary; 9 copy-paste-ready manual tracker tables (Source-of-Truth Readiness Tracker, Implementation Slice Approval Tracker, Config Env Readiness Tracker, Tenant Schema Auth Readiness Tracker, Production Write Boundary Tracker, Integration Activation Hold Tracker, Rollback Kill-Switch Tracker, Owner Approval Evidence Tracker, Implementation Sequencing Decision Tracker); uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response, automated follow-up, and missed-lead recovery + Guided Setup happens first + The 14-day trial begins after RoofLeadHQ AI setup goes live + An automated email is sent 2 days before the first monthly payment + Cancel anytime + No long-term contract; internal founder/operator language only for safety/ops/sequencing; concrete slice definitions, per-slice hold gates, verifier model, rollback requirements, owner evidence, risk register, decision tracker; sequencing/readiness/approval only; product-moving and operationally usable for Jason to gate future production implementation slices; dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation, no backend/src, no migrations, no credentials, no env changes, no contractor portal',
    script: 'backend/scripts/verify-production-implementation-sequencing-and-approval-plan-readonly.js',
    args: []
  },
  {
    name: 'First Paid Roofer Launch System Packet (docs/FIRST_PAID_ROOFER_LAUNCH_SYSTEM_PACKET.md + scripts/run-first-paid-roofer-launch-system-packet-dry-run.sh) -- biggest safe first paid roofer launch system packet covering 1. first paid roofer launch readiness checklist, 2. prospect-to-setup handoff, 3. sales/demo call checklist, 4. Guided Setup intake packet, 5. go-live readiness checklist, 6. 14-day trial operating checklist, 7. automated pre-billing email readiness checklist, 8. first monthly payment handoff checklist, 9. cancellation/no-go handling, 10. founder/operator internal launch command center, 11. explicit safety guardrails showing no live SMS, Vapi, Calendar, Resend, Lindy, cron, production Supabase writes, production data mutation, public route activation, contractor portal exposure, auth/RLS/security implementation, or payment automation is activated; uses only RoofLeadHQ AI turns roofing leads into booked homeowner appointments through fast response/automated follow-up/missed-lead recovery + Guided Setup (config only) + 14-day trial + automated email 2 days before first monthly payment + cancel anytime + no long-term contract; internal founder/operator language only for safety/ops; concrete checklists, decision gates, handoff sections, evidence logs, go/no-go status fields; product-moving and operationally usable for Jason to run first paid roofer launch; dry-run/internal-only/founder-operator-only; wired for read-only verification; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-first-paid-roofer-launch-system-packet-readonly.js',
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
    name: 'Website Demo Screenshot Assets (docs/WEBSITE_DEMO_SCREENSHOT_ASSETS_PACKET.md + scripts/run-website-demo-screenshot-assets-dry-run.sh + backend/scripts/verify-website-demo-screenshot-assets-readonly.js) -- static screenshot-ready demo pages (Dashboard, Weekly Report, Monthly Report) using sample data only for marketing under Founder-Led Launch Program (visible SAMPLE/Demo labels, Front Range Roofing Co., manual review/inspection coordination/manual coordination framing, live automation disabled notes, no production language); read-only verifier asserts pages exist with required labels and safe phrases, forbidden phrases absent, no backend/src and no migration/schema/auth/secrets/env modified, no external call strings, wires into aggregate + index + next-chat + daily guide; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-website-demo-screenshot-assets-readonly.js',
    args: []
  },
  {
    name: 'Website Homepage Screenshot Placement (docs/WEBSITE_HOMEPAGE_SCREENSHOT_PLACEMENT_PACKET.md + scripts/run-website-homepage-screenshot-placement-dry-run.sh + backend/scripts/verify-website-homepage-screenshot-placement-readonly.js) -- place final Growth Tier screenshots (dashboard-sample.png, weekly-report-sample.png, monthly-report-sample.png) into public homepage Inside RoofLeadHQ / dashboard/reporting section (replaces placeholders with actual final assets; headings aligned to Dashboard/Weekly Reports/Monthly Reports; exact alt text used); read-only verifier asserts references + PNG existence + alt text in website/index.html, asserts no backend/src and no migration/schema/auth/secrets/env modified, no external call strings added, wires into aggregate + index + next-chat + daily guide; website/copy/static-asset/reference changes only; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-website-homepage-screenshot-placement-readonly.js',
    args: []
  },
  {
    name: 'Website Positioning Recovery (docs/WEBSITE_POSITIONING_RECOVERY_PACKET.md + scripts/run-website-positioning-recovery-dry-run.sh + backend/scripts/verify-website-positioning-recovery-readonly.js) -- recover clear public RoofLeadHQ AI positioning on the website: H1 Turn More Roofing Leads Into Booked Inspections, core insight You do not always need more leads, Guided Setup (onboarding/config only), 14-day trial with automated check-in email before first monthly payment; RoofLeadHQ AI handles fast response/automated follow-up/missed lead recovery/qualification to calendar; remove all public founder-led babysitting/manual coordination/founder review/review queue/Live Automation Disabled/guarantee language; preserve the three Growth Tier screenshots exactly; read-only verifier asserts required phrases present and all forbidden public phrases absent in website/index.html, asserts no backend/src and no migration/schema/auth/secrets/env modified, no external call strings added, wires into aggregate + index + next-chat + daily guide; website/copy/docs/read-only verifier changes only; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-website-positioning-recovery-readonly.js',
    args: []
  },
  {
    name: 'Website Copy/Layout Polish (docs/WEBSITE_COPY_LAYOUT_POLISH_PACKET.md + scripts/run-website-copy-layout-polish-dry-run.sh + backend/scripts/verify-website-copy-layout-polish-readonly.js) -- public website copy and layout polish pass (founder review corrections): stronger "books homeowner appointments on your calendar" and "Qualified leads booked on your calendar"; all day-15/monthly billing start phrasing removed in favor of 14-day trial + automated email 2 days before first monthly payment; "A typical custom setup process can be completed within 48 hours" + support note; outside leads restructure + visual polish (icons, centers, contrast); phone sentence move + polish; comparison title/dividers/check icon; Inside RoofLeadHQ report cards centered + top-justified images; all KPI titles centered; pricing cleaned (no Starter 100 leads pill, no removed sentence, borders, sizes, caret, centered checks, green pill text); My Story genuine rewrite + customization title/para; FAQ/contact aligned; required phrases present, forbidden absent, table check present, no backend/src/schema/auth/secrets/external/prod changes; read-only verifier + packet + wrapper; website-only + docs/verifier changes; preserve three Growth Tier screenshots exactly; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation',
    script: 'backend/scripts/verify-website-copy-layout-polish-readonly.js',
    args: []
  },
  {
    name: 'Website Trial Direction Regression (docs/WEBSITE_TRIAL_DIRECTION_REGRESSION_PACKET.md + scripts/run-website-trial-direction-regression-dry-run.sh + backend/scripts/verify-website-trial-direction-regression-readonly.js) -- dedicated read-only regression guard to audit and protect the revised public direction (RoofLeadHQ AI turns roofing leads into booked inspections / booked homeowner appointments; Guided Setup first; 14-day trial begins after RoofLeadHQ AI setup goes live; automated email 2 days before first monthly payment; first monthly payment after trial; cancel anytime; no long-term contract; public website must not position as Founder-Led Launch Program or ongoing founder/manual babysitting); verifier passes only on presence of revised trial/AI/booked-appointment language in website/index.html and fails on any forbidden phrases in public-facing website files (index.html + demo/*.html); explicitly distinguishes public website/sales-facing copy from internal safety docs (internal founder/operator/manual language permitted only in dry-run safety artifacts with context docs stating it is internal-only/not public); fails if wrapper missing or non-executable or wiring missing; read-only; website/docs/verifier-only; no live activation, no production behavior, no writes, no integrations, no auth/schema/security implementation; wired into aggregate + verifier index + next-chat contexts + daily guide with boundary clarifications',
    script: 'backend/scripts/verify-website-trial-direction-regression-readonly.js',
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
