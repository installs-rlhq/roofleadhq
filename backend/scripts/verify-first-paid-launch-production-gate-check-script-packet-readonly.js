#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const root = path.resolve(__dirname, '../..');

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing required file: ${relativePath}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

function assertIncludes(relativePath, expected) {
  const content = read(relativePath);
  if (!content.includes(expected)) {
    throw new Error(`Expected ${relativePath} to include: ${expected}`);
  }
}

function assertExecutable(relativePath) {
  const fullPath = path.join(root, relativePath);
  const mode = fs.statSync(fullPath).mode;
  if ((mode & 0o111) === 0) {
    throw new Error(`Expected executable script: ${relativePath}`);
  }
}

function assertNotFound(relativePath, blocked) {
  const content = read(relativePath);
  for (const phrase of blocked) {
    if (content.includes(phrase)) {
      throw new Error(`Blocked phrase found in ${relativePath}: ${phrase}`);
    }
  }
}

const packet = 'docs/FIRST_PAID_LAUNCH_PRODUCTION_GATE_CHECK_SCRIPT_PACKET.md';
const gateScript = 'scripts/check-production-gates.sh';
const nextContext = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';
const verifierIndex = 'docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md';
const guide = 'docs/ROOFLEADHQ_BUSINESS_BUILDOUT_DAILY_GUIDE.md';
const aggregate = 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js';

[
  packet,
  gateScript,
  nextContext,
  verifierIndex,
  guide,
  aggregate,
  'backend/scripts/verify-sms-production-send-intent-bridge.js',
  'backend/src/services/sms-production-send-intent-bridge.service.ts',
  'scripts/onboard-roofer.sh',
  'scripts/verify-roofer-dry-run-onboarding-workspace.sh',
  'scripts/verify-roofer-onboarding-readiness.sh',
].forEach(read);

assertExecutable(gateScript);

[
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
  'Step 66',
  '9ddfebd',
  'a01693d',
  'production send intent bridge',
  'does not authorize live SMS sends',
].forEach((expected) => assertIncludes(packet, expected));

[
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
  'Production gate check passed',
].forEach((expected) => assertIncludes(gateScript, expected));

assertIncludes(nextContext, 'Production Gate Check Script Packet');
assertIncludes(nextContext, 'scripts/check-production-gates.sh');
assertIncludes(nextContext, 'verify-first-paid-launch-production-gate-check-script-packet-readonly.js');

assertIncludes(verifierIndex, 'verify-first-paid-launch-production-gate-check-script-packet-readonly.js');
assertIncludes(verifierIndex, 'scripts/check-production-gates.sh');

assertIncludes(guide, 'Production Gate Check Script Packet');
assertIncludes(guide, 'founder-led launch');

assertIncludes(aggregate, 'verify-first-paid-launch-production-gate-check-script-packet-readonly.js');

const blocked = [
  'SMS_ACTIVATION=true',
  'CALENDAR_ACTIVATION=true',
  'VAPI_ACTIVATION=true',
  'SUPABASE_WRITES=true',
  'CONTRACTOR_NOTIFICATION=true',
  'HOMEOWNER_NOTIFICATION=true',
  'CRON_ACTIVATION=true',
  'SCHEDULER_ACTIVATION=true',
  'DISPATCHER_ACTIVATION=true',
  'PUBLIC_ROUTE_ACTIVATION=true',
  'live Twilio send enabled',
  'production Supabase writes enabled',
  'Vapi production webhook enabled',
  'Retell route enabled',
];

[
  packet,
  nextContext,
  verifierIndex,
  guide,
].forEach((relativePath) => assertNotFound(relativePath, blocked));

execFileSync(path.join(root, gateScript), {
  cwd: root,
  stdio: 'inherit',
});

console.log('Production gate check script packet verifier passed.');
