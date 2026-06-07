#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md');

const requiredStrings = [
  'First Paid Launch Appointment Outcome Packet',
  'Safety remains demo-ready with live automation disabled',
  'Appointment Outcome Categories',
  'Required Outcome Fields',
  'Manual Review Rules',
  'Follow-Up Rules',
  'Contractor Notification Tie-In',
  'Emergency Escalation Tie-In',
  'Weekly/Monthly Reporting Tie-In',
  'Recommended Actions',
  'appointment completed',
  'homeowner no-show',
  'contractor no-show',
  'rescheduled',
  'canceled',
  'inspection completed',
  'estimate requested',
  'estimate sent',
  'job won',
  'job lost',
  'outcome unknown',
  'follow-up needed',
  'manual review required',
  'book inspections',
  'book appointments',
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
  'PASS: First Paid Launch appointment outcome packet completed successfully'
];

if (!fs.existsSync(packetPath)) {
  console.error('FAIL: FIRST_PAID_LAUNCH_APPOINTMENT_OUTCOME_PACKET.md does not exist');
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
  console.log('PASS: First Paid Launch appointment outcome packet completed successfully');
  process.exit(0);
} else {
  process.exit(1);
}
