#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '../..');

const requiredFiles = [
  'docs/FIRST_PAID_LAUNCH_AUTOMATION_FOUNDATION_PACKET.md',
  'scripts/verify-source-of-truth.sh',
  'scripts/verify-safe-readiness.sh',
  'scripts/show-diff-proof.sh',
  'scripts/record-milestone.sh'
];

const requiredDocStrings = [
  'First Paid Launch Automation Foundation Packet',
  'Terminal 1 in `/root/roofleadhq` is the source of truth',
  'agent-reported commits, pushes, and completion claims are not trusted',
  'scripts/verify-source-of-truth.sh',
  'scripts/verify-safe-readiness.sh',
  'scripts/show-diff-proof.sh',
  'scripts/record-milestone.sh',
  'roofer onboarding scripts',
  'per-roofer readiness checks',
  'production gate checks',
  'No production Calendar/SMS activation',
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
  'No destructive operations'
];

const requiredScriptStrings = {
  'scripts/verify-source-of-truth.sh': [
    'git fetch origin main',
    'git status --short',
    'git log --oneline',
    'HEAD and origin/main match'
  ],
  'scripts/verify-safe-readiness.sh': [
    'verify-next-chat-context-package-first-paid-launch-readonly.js',
    'verify-next-chat-context-latest-milestones-readonly.js',
    'verify-latest-milestone-self-check-readonly.js',
    'verify-first-paid-pilot-readiness-readonly.js',
    'npm --prefix backend run build'
  ],
  'scripts/show-diff-proof.sh': [
    'git status --short',
    'git diff --stat',
    'git diff'
  ],
  'scripts/record-milestone.sh': [
    'verify-next-chat-context-latest-milestones-readonly.js',
    'verify-latest-milestone-self-check-readonly.js',
    'NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md',
    'Terminal 1 remains the source of truth'
  ]
};

let failed = false;

function fail(message) {
  failed = true;
  console.error(`FAIL: ${message}`);
}

for (const file of requiredFiles) {
  const fullPath = path.join(repoRoot, file);
  if (!fs.existsSync(fullPath)) {
    fail(`Missing required file: ${file}`);
  }
}

const docPath = path.join(repoRoot, 'docs/FIRST_PAID_LAUNCH_AUTOMATION_FOUNDATION_PACKET.md');
const doc = fs.existsSync(docPath) ? fs.readFileSync(docPath, 'utf8') : '';

for (const required of requiredDocStrings) {
  if (!doc.includes(required)) {
    fail(`Missing required doc string: ${required}`);
  }
}

for (const [script, strings] of Object.entries(requiredScriptStrings)) {
  const scriptPath = path.join(repoRoot, script);
  const text = fs.existsSync(scriptPath) ? fs.readFileSync(scriptPath, 'utf8') : '';
  for (const required of strings) {
    if (!text.includes(required)) {
      fail(`Missing required script string in ${script}: ${required}`);
    }
  }
}

if (failed) {
  process.exit(1);
}

console.log('PASS: First Paid Launch automation foundation packet verification passed.');
