#!/usr/bin/env node

const fs = require('fs');

const contextPath = 'docs/NEXT_CHAT_CONTEXT_PACKAGE_FIRST_PAID_LAUNCH.md';

function read(path) {
  if (!fs.existsSync(path)) {
    throw new Error(`Missing required file: ${path}`);
  }
  return fs.readFileSync(path, 'utf8');
}

function requireIncludes(label, text, needle) {
  if (!text.includes(needle)) {
    throw new Error(`${label} missing required text: ${needle}`);
  }
}

const context = read(contextPath);

const requiredContextText = [
  'Terminal 1',
  '/root/roofleadhq',
  '/root/.openclaw/workspace',
  'OpenClaw summaries alone are not trusted',
  'git diff --stat',
  'git diff',
  'staged diff review',
  'targeted greps/assertions',
  'node --check',
  'read-only verifiers',
  'aggregate readiness verifier',
  'backend build',
  'Safe verified doc/test/read-only verifier changes may be committed and pushed without repeated approval',
  'Explicit approval is still required before',
  'live SMS/Twilio',
  'production Supabase writes',
  'Vapi production webhook ingestion',
  'Calendar booking activation',
  'Resend/Lindy production activation',
  'public routes, cron/schedulers/dispatchers',
  'secrets exposure',
  'destructive operations',
  'Safety posture remains demo-ready with live automation disabled',
];

for (const needle of requiredContextText) {
  requireIncludes(contextPath, context, needle);
}

console.log('PASS verify-next-safe-build-operating-workflow-readonly');
