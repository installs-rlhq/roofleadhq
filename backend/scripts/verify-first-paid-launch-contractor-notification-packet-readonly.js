#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md');

const requiredStrings = [
  'First Paid Launch Contractor Notification Packet',
  'Safety remains demo-ready with live automation disabled',
  'No live SMS/Twilio sends',
  'No production Supabase writes',
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
  'Connected Launch Packets',
  'Contractor Notification Summary Format',
  'Minimum Contractor Notification Fields',
  'Manual Notification Rules',
  'Emergency Tie-In',
  'Reporting Tie-In',
  'Founder-Led Launch Rules',
  'Explicit Approval Gates',
  'Launch Readiness Outcome',
  'book inspection',
  'book appointment',
  'founder-led launch',
  'first-paid launch',
  'manual review',
  'roofing contractors',
  'weekly/monthly reporting',
  'recommended actions',
  'PASS: First Paid Launch contractor notification packet completed successfully'
];

if (!fs.existsSync(packetPath)) {
  console.error('FAIL: FIRST_PAID_LAUNCH_CONTRACTOR_NOTIFICATION_PACKET.md does not exist');
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
  console.log('PASS: First Paid Launch contractor notification packet completed successfully');
  process.exit(0);
} else {
  process.exit(1);
}
