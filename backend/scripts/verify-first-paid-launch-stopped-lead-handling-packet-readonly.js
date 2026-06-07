#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_STOPPED_LEAD_HANDLING_PACKET.md');

const requiredStrings = [
  'First Paid Launch Stopped Lead Handling Packet',
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
  'Current Stop-Handling Gap',
  'Stopped Lead Definition',
  'opted_out Tie-In',
  'stopped_reason Tie-In',
  'Manual Review Queue Tie-In',
  'Follow-Up Cadence Tie-In',
  'Missing Information Recovery Tie-In',
  'Contractor Notification Readiness Tie-In',
  'Reporting Tie-In',
  'Do-Not-Contact Handling',
  'Stopped Follow-Up Handling',
  'Founder/Operator Review',
  'Recommended Actions',
  'Explicit Approval Gates',
  'What Not to Touch',
  'Safety Confirmation',
  'stopped lead handling',
  'opted_out',
  'stopped_reason',
  'do-not-contact',
  'stopped follow-up',
  'founder/operator review',
  'manual review queue',
  'follow-up cadence',
  'missing information recovery',
  'contractor notification readiness',
  'weekly leads report',
  'monthly leads report',
  'recommended actions',
  'safe manual review',
  'book inspections',
  'book appointments',
  'PASS: First Paid Launch stopped lead handling packet completed successfully'
];

if (!fs.existsSync(packetPath)) {
  console.error('FAIL: FIRST_PAID_LAUNCH_STOPPED_LEAD_HANDLING_PACKET.md does not exist');
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
  console.log('PASS: First Paid Launch stopped lead handling packet completed successfully');
  process.exit(0);
} else {
  process.exit(1);
}
