#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');
const packetPath = path.join(repoRoot, 'docs', 'FIRST_PAID_LAUNCH_LEAD_SOURCE_QUALITY_PACKET.md');

const requiredStrings = [
  'First Paid Launch Lead Source Quality Packet',
  'Safety remains demo-ready with live automation disabled',
  'Lead Source Categories',
  'Source Detail Rules',
  'Source Confidence Rules',
  'Lead Quality Categories',
  'Manual Review Rules',
  'Contractor Notification Tie-In',
  'Appointment Outcome Tie-In',
  'Weekly/Monthly Reporting Tie-In',
  'Recommended Actions',
  'website leads',
  'Google Business Profile / GBP leads',
  'Angi leads',
  'Thumbtack leads',
  'Facebook leads',
  'referral leads',
  'manual entry leads',
  'Vapi / phone leads',
  'missed-call recovery leads',
  'repeat caller leads',
  'unknown source leads',
  'high-intent leads',
  'medium-intent leads',
  'low-intent leads',
  'spam / bad-fit leads',
  'duplicate leads',
  'emergency source patterns',
  'source detail',
  'source confidence',
  'lead source quality',
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
  'PASS: First Paid Launch lead source quality packet completed successfully'
];

if (!fs.existsSync(packetPath)) {
  console.error('FAIL: FIRST_PAID_LAUNCH_LEAD_SOURCE_QUALITY_PACKET.md does not exist');
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
  console.log('PASS: First Paid Launch lead source quality packet completed successfully');
  process.exit(0);
} else {
  process.exit(1);
}
