#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_MISSING_INFORMATION_RECOVERY_PACKET.md');

const requiredStrings = [
  'First Paid Launch Missing Information Recovery Packet',
  'Safety remains demo-ready with live automation disabled',
  'Missing Information Categories',
  'Incomplete Lead Classification',
  'Manual Review Rules',
  'Founder/Operator Recovery Actions',
  'Contractor Notification Tie-In',
  'Follow-Up Cadence Tie-In',
  'Emergency Escalation Tie-In',
  'Lead Source Quality Tie-In',
  'Appointment Outcome Tie-In',
  'Weekly/Monthly Reporting Tie-In',
  'Recommended Actions',
  'missing homeowner name',
  'missing phone number',
  'missing email',
  'missing property address',
  'missing city/state/ZIP',
  'missing roof issue description',
  'missing roof type',
  'missing urgency/timeline',
  'missing insurance claim status',
  'missing appointment preference',
  'missing lead source',
  'missing source detail',
  'missing contractor routing preference',
  'missing emergency escalation status',
  'missing appointment outcome',
  'missing follow-up status',
  'incomplete lead classification',
  'missing information recovery',
  'incomplete lead',
  'book inspections',
  'book appointments',
  'founder-led launch',
  'first-paid launch',
  'recommended actions',
  'weekly leads report',
  'monthly leads report',
  'manual review',
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
  'PASS: First Paid Launch missing information recovery packet completed successfully'
];

if (!fs.existsSync(packetPath)) {
  console.error('FAIL: FIRST_PAID_LAUNCH_MISSING_INFORMATION_RECOVERY_PACKET.md does not exist');
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
  console.log('PASS: First Paid Launch missing information recovery packet completed successfully');
  process.exit(0);
} else {
  process.exit(1);
}
