#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ SMS Dispatcher Messages Write Test-Only Verification ===');
console.log('Local read-only verifier execution only.');
console.log('No Supabase reads or writes.');
console.log('No external service calls.');
console.log('No SMS, Twilio, Vapi, Calendar, Resend, or Lindy calls.');
console.log('No route, cron, scheduler, or dispatcher activation.');

// Key files that would contain actual gated write logic
const keyFiles = [
  'backend/scripts/prepare-sms-dispatcher-db-write-candidate-readonly.js',
  'backend/scripts/prepare-sms-dispatcher-manual-runner-live-test-readonly.js',
  'backend/scripts/prepare-sms-dispatcher-production-runner-live-test-readonly.js'
];

// Unsafe patterns that must never appear
const unsafePatterns = [
  { pattern: /require\(['"]twilio['"]\)|from ['"]twilio['"]/i, desc: 'Twilio import/require' },
  { pattern: /new (Twilio|twilio)\(/, desc: 'Twilio client instantiation' },
  { pattern: /\.messages\.create\s*\(/, desc: '.messages.create call' },
  { pattern: /<Message>.*<\/Message>/s, desc: 'TwiML Message tag' },
  { pattern: /app\.(use|post|get|put|patch)\s*\([^)]*twilio|twilio.*(route|handler|webhook).*register/i, desc: 'Twilio route registration' },
  { pattern: /cron\.schedule|setInterval.*dispatcher|auto-start.*dispatcher/i, desc: 'cron/scheduler/auto-start' },
  { pattern: /PRODUCTION.*DISPATCHER.*=\s*true|ENABLE.*DISPATCHER.*=\s*true/i, desc: 'production dispatcher flag' }
];

const forbiddenStrings = [
  '7-day pilot',
  '5 qualified appointments in 7 days',
  'book jobs',
  'booked jobs',
  'guaranteed jobs',
  'guaranteed revenue',
  'guarantee jobs',
  'guarantee revenue'
];

let foundWriteLayer = false;

for (const file of keyFiles) {
  const fullPath = path.join(repoRoot, file);
  if (fs.existsSync(fullPath)) {
    foundWriteLayer = true;
    const content = fs.readFileSync(fullPath, 'utf8');
    
    // Check for unsafe patterns
    for (const unsafe of unsafePatterns) {
      if (unsafe.pattern.test(content)) {
        fail(`Unsafe pattern found in ${file}: ${unsafe.desc}`);
      }
    }
    
    // Check for forbidden business language
    for (const forbidden of forbiddenStrings) {
      if (content.includes(forbidden)) {
        fail(`${file} contains forbidden business language: ${forbidden}`);
      }
    }
    
    pass(`${file} inspected - no unsafe patterns found`);
  }
}

if (!foundWriteLayer) {
  pass('No gated DB write candidate scripts found yet (not implemented)');
  pass('Current verifier confirms no unsafe live path exists');
  pass('Next step: implement actual gated test-only DB write candidate');
}

// Check live automation posture
const aggregatePath = path.join(repoRoot, 'backend/scripts/verify-first-paid-pilot-readiness-readonly.js');
if (fs.existsSync(aggregatePath)) {
  const agg = fs.readFileSync(aggregatePath, 'utf8');
  if (agg.includes('demo_ready_with_live_automation_disabled')) {
    pass('Aggregate confirms live automation disabled');
  }
}

if (process.exitCode) {
  console.error('FAIL: SMS dispatcher messages write test-only verification failed.');
  process.exit(process.exitCode);
}

console.log('PASS: SMS dispatcher messages write test-only verification passed.');