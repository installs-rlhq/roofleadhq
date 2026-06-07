#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');

const requiredFiles = [
  'docs/FIRST_PAID_LAUNCH_ROOFER_ONBOARDING_SCRIPT_PACKET.md',
  'scripts/onboard-roofer.sh',
  'scripts/verify-roofer-dry-run-onboarding-workspace.sh',
  'scripts/verify-roofer-onboarding-readiness.sh'
];

const requiredDocStrings = [
  'First Paid Launch Roofer Onboarding Script Packet',
  'repeatable, repo-controlled roofer onboarding',
  'scripts/onboard-roofer.sh',
  'scripts/verify-roofer-dry-run-onboarding-workspace.sh',
  'scripts/verify-roofer-onboarding-readiness.sh',
  'Existing Readiness Script Preservation',
  'must not be overwritten by this packet',
  'SMS activation disabled',
  'Calendar activation disabled',
  'Vapi activation disabled',
  'Supabase writes disabled',
  'book inspections',
  'book appointments',
  'Safety remains demo-ready with live automation disabled',
  'No live SMS/Twilio sends',
  'No production Supabase writes',
  'No Supabase schema mutation',
  'No Vapi production webhook ingestion',
  'No live Vapi webhook route',
  'No Vapi calls from code',
  'No Retell route activation',
  'No Calendar booking activation',
  'No Resend production activation',
  'No Lindy production activation',
  'No cron activation',
  'No scheduler activation',
  'No dispatcher activation',
  'No public production route activation',
  'No secrets exposure',
  'No destructive operations'
];

const requiredScriptStrings = {
  'scripts/onboard-roofer.sh': [
    'activation-flags.env',
    'SMS_ACTIVATION=false',
    'CALENDAR_ACTIVATION=false',
    'VAPI_ACTIVATION=false',
    'SUPABASE_WRITES=false',
    'CONTRACTOR_NOTIFICATION=false',
    'HOMEOWNER_NOTIFICATION=false',
    'CRON_ACTIVATION=false',
    'SCHEDULER_ACTIVATION=false',
    'DISPATCHER_ACTIVATION=false',
    'PUBLIC_ROUTE_ACTIVATION=false',
    'No production action was activated'
  ],
  'scripts/verify-roofer-dry-run-onboarding-workspace.sh': [
    'SMS_ACTIVATION=false',
    'CALENDAR_ACTIVATION=false',
    'VAPI_ACTIVATION=false',
    'SUPABASE_WRITES=false',
    'PASS: roofer dry-run onboarding workspace verified',
    'PASS: all production activation flags remain disabled'
  ],
  'scripts/verify-roofer-onboarding-readiness.sh': [
    'RoofLeadHQ Roofer Onboarding Readiness Check',
    'Repo Check',
    'Git Status',
    'Backend Build Check'
  ]
};

let failed = false;

function fail(message) {
  failed = true;
  console.error(`FAIL: ${message}`);
}

for (const file of requiredFiles) {
  const fullPath = path.join(repoRoot, file);
  if (!fs.existsSync(fullPath)) {
    fail(`Missing required file: ${file}`);
  }
}

const docPath = path.join(repoRoot, 'docs/FIRST_PAID_LAUNCH_ROOFER_ONBOARDING_SCRIPT_PACKET.md');
const doc = fs.existsSync(docPath) ? fs.readFileSync(docPath, 'utf8') : '';

for (const required of requiredDocStrings) {
  if (!doc.includes(required)) {
    fail(`Missing required doc string: ${required}`);
  }
}

for (const [script, strings] of Object.entries(requiredScriptStrings)) {
  const scriptPath = path.join(repoRoot, script);
  const text = fs.existsSync(scriptPath) ? fs.readFileSync(scriptPath, 'utf8') : '';
  for (const required of strings) {
    if (!text.includes(required)) {
      fail(`Missing required script string in ${script}: ${required}`);
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log('PASS: First Paid Launch roofer onboarding script packet verification passed.');
