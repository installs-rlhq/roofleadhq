#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_EMERGENCY_ESCALATION_PACKET.md');

const requiredStrings = [
  'First Paid Launch Emergency Escalation Packet',
  'Demo-ready with live automation disabled',
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
  'Emergency Escalation Triggers',
  'Operator Stop Conditions',
  'Minimum Emergency Intake Fields',
  'Manual Escalation Owner',
  'Contractor Notification Rules',
  'Emergency Follow-Up Tie-In',
  'Reporting Tie-In',
  'Founder-Led Launch Rules',
  'Explicit Approval Gates',
  'Launch Readiness Outcome',
  'book inspections',
  'book appointments',
  'founder-led launch',
  'first-paid launch',
  'emergency escalation',
  'manual review',
  'roofing contractors',
  'weekly/monthly reporting',
  'recommended actions',
  'PASS: First Paid Launch emergency escalation packet completed successfully'
];

let allFound = true;

if (!fs.existsSync(packetPath)) {
  console.error('FAIL: FIRST_PAID_LAUNCH_EMERGENCY_ESCALATION_PACKET.md does not exist');
  process.exit(1);
}

const content = fs.readFileSync(packetPath, 'utf8');

for (const str of requiredStrings) {
  if (!content.includes(str)) {
    console.error(`FAIL: Missing required string: ${str}`);
    allFound = false;
  }
}

if (allFound) {
  console.log('PASS: First Paid Launch emergency escalation packet completed successfully');
  process.exit(0);
} else {
  process.exit(1);
}
