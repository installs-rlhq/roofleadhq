#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_VOICE_PATH_CLEANUP_PACKET.md');

const requiredStrings = [
  'First Paid Launch Voice Path Cleanup Packet',
  'Retell is deprecated/disabled',
  'Vapi is the current phone/voice path',
  'Vapi dry-run/read-only only',
  'Vapi normalized dry-run contract',
  'post-call payload discovery',
  'raw payload capture plan',
  'sample payload mapping',
  'missing-fields readiness gate',
  'real payload collection runbook',
  'operator payload review checklist',
  'test payload ingestion plan',
  'dry-run CLI contract',
  'scenario registry consistency',
  'emergency-leak scenario',
  'insurance-storm scenario',
  'guard layer coverage',
  'aggregate verifier coverage',
  'lingering Retell references',
  'old Retell webhook triggers',
  'old Retell post-call workflow references',
  'Retell payload assumptions',
  'no Vapi production webhook ingestion',
  'no live Vapi webhook route',
  'no Vapi calls from code',
  'no Retell route activation',
  'no webhook activation',
  'no production ingestion',
  'no production workflow activation',
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
  'No destructive operations',
  'PASS: First Paid Launch voice path cleanup packet completed successfully'
];

if (!fs.existsSync(packetPath)) {
  console.error('FAIL: FIRST_PAID_LAUNCH_VOICE_PATH_CLEANUP_PACKET.md does not exist');
  process.exit(1);
}

const content = fs.readFileSync(packetPath, 'utf8');
let allFound = true;

for (const str of requiredStrings) {
  if (!content.includes(str)) {
    console.error(`FAIL: Missing required string: ${str}`);
    allFound = false;
  }
}

if (allFound) {
  console.log('PASS: First Paid Launch voice path cleanup packet completed successfully');
  process.exit(0);
} else {
  process.exit(1);
}
