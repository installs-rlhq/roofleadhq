#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_SCHEMA_BLOCKERS_PACKET.md');

const requiredStrings = [
  'First Paid Launch Schema Blockers Packet',
  'Safety remains demo-ready with live automation disabled',
  'No live SMS/Twilio sends',
  'No production Supabase writes',
  'No Supabase schema mutation',
  'No Vapi production webhook ingestion',
  'No live Vapi webhook route',
  'No Calendar booking activation',
  'No Resend production activation',
  'No Lindy production activation',
  'No cron activation',
  'No scheduler activation',
  'No dispatcher activation',
  'No public production route activation',
  'No secrets exposure',
  'No destructive operations',
  'Current Blocker',
  'Why opted_out Is Needed',
  'Why stopped_reason Is Needed',
  'Expected Field Names',
  'Expected Field Types',
  'Suggested Default Values',
  'Safe Migration Notes',
  'Read-Only Verification Expectations',
  'Explicit Approval Gates',
  'What Not to Touch',
  'Future Operations Support',
  'Open Questions',
  'Safety Confirmation',
  'opted_out',
  'stopped_reason',
  'PASS: First Paid Launch schema blockers packet completed successfully'
];

if (!fs.existsSync(packetPath)) {
  console.error('FAIL: FIRST_PAID_LAUNCH_SCHEMA_BLOCKERS_PACKET.md does not exist');
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
  console.log('PASS: First Paid Launch schema blockers packet completed successfully');
  process.exit(0);
} else {
  process.exit(1);
}
