#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md');

const requiredStrings = [
  'First Paid Launch Manual Review Queue Packet',
  'Safety remains demo-ready with live automation disabled',
  'Manual Review Queue',
  'Founder/Operator Review',
  'Emergency Escalation Review',
  'Contractor Notification Review',
  'Appointment Outcome Review',
  'Lead Source Quality Review',
  'Missing Information Recovery Review',
  'Lindy Internal Lead Review Summary Tie-In',
  'Follow-Up Cadence Review',
  'Reporting Review',
  'Incomplete Lead Review',
  'High-Intent Lead Review',
  'Emergency Lead Review',
  'Duplicate Lead Review',
  'Spam / Bad-Fit Lead Review',
  'Source Confidence Review',
  'Recommended Actions',
  'weekly leads report',
  'monthly leads report',
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
  'PASS: First Paid Launch manual review queue packet completed successfully'
];

if (!fs.existsSync(packetPath)) {
  console.error('FAIL: FIRST_PAID_LAUNCH_MANUAL_REVIEW_QUEUE_PACKET.md does not exist');
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
  console.log('PASS: First Paid Launch manual review queue packet completed successfully');
  process.exit(0);
} else {
  process.exit(1);
}
