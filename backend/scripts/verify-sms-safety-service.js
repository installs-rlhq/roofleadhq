#!/usr/bin/env node

const path = require('path');
const { execFileSync } = require('child_process');

const repoRoot = '/root/roofleadhq';
const serviceTs = path.join(repoRoot, 'backend/src/services/sms-safety.service.ts');
const compiledJs = '/tmp/sms-safety.service.js';

execFileSync(
  path.join(repoRoot, 'backend/node_modules/.bin/tsc'),
  [
    serviceTs,
    '--target',
    'ES2020',
    '--module',
    'commonjs',
    '--esModuleInterop',
    '--skipLibCheck',
    '--outDir',
    '/tmp'
  ],
  { stdio: 'inherit' }
);

const { evaluateSmsSafety, parseSmsOptOut, planSmsOptOutWorkflow } = require(compiledJs);

function assertCase(name, input, expected) {
  const result = evaluateSmsSafety(input);
  const pass = Object.entries(expected).every(([key, value]) => result[key] === value);

  if (!pass) {
    console.error(`FAIL: ${name}`);
    console.error('Expected:', expected);
    console.error('Received:', result);
    process.exit(1);
  }

  console.log(`PASS: ${name} -> ${result.action}/${result.reason}`);
}

const base = {
  rooferSmsEnabled: true,
  homeownerPhone: '+15551234567',
  leadStatus: 'new',
  followUpStatus: 'scheduled',
  scheduledFor: '2026-06-02T16:00:00.000Z',
  currentTime: '2026-06-02T16:05:00.000Z',
  rooferTimezone: 'America/Chicago',
  templateType: 'followup_2h',
  duplicateSendExists: false
};

console.log('=== RoofLeadHQ SMS Safety Service Verification ===');
console.log('No Twilio calls are made by this script.');
console.log('No SMS is sent.');

assertCase('SMS disabled blocks sends', { ...base, rooferSmsEnabled: false }, {
  allowed: false,
  action: 'skip',
  reason: 'sms_disabled'
});

assertCase('Invalid phone blocks sends', { ...base, homeownerPhone: '5551234567' }, {
  allowed: false,
  action: 'skip',
  reason: 'invalid_phone'
});

assertCase('Opted out lead blocks sends', { ...base, leadStatus: 'opted_out' }, {
  allowed: false,
  action: 'skip',
  reason: 'opted_out'
});

assertCase('Booked lead blocks sends', { ...base, leadStatus: 'booked' }, {
  allowed: false,
  action: 'skip',
  reason: 'booked'
});

assertCase('Cancelled lead blocks sends', { ...base, leadStatus: 'cancelled' }, {
  allowed: false,
  action: 'skip',
  reason: 'cancelled'
});

assertCase('Lost lead blocks sends', { ...base, leadStatus: 'lost' }, {
  allowed: false,
  action: 'skip',
  reason: 'lost'
});

assertCase('Missing required field blocks sends', { ...base, homeownerPhone: '' }, {
  allowed: false,
  action: 'skip',
  reason: 'missing_required_field'
});

assertCase('Future follow-up blocks sends', { ...base, scheduledFor: '2026-06-02T18:00:00.000Z' }, {
  allowed: false,
  action: 'skip',
  reason: 'follow_up_not_due'
});

assertCase('Unapproved template blocks sends', { ...base, templateType: 'random_template' }, {
  allowed: false,
  action: 'skip',
  reason: 'template_not_approved'
});

assertCase('Duplicate send blocks sends', { ...base, duplicateSendExists: true }, {
  allowed: false,
  action: 'skip',
  reason: 'duplicate_send'
});

assertCase('Quiet hours reschedule sends', { ...base, currentTime: '2026-06-03T03:30:00.000Z' }, {
  allowed: false,
  action: 'reschedule',
  reason: 'quiet_hours'
});

assertCase('Allowed window permits eligible sends', base, {
  allowed: true,
  action: 'send',
  reason: 'eligible'
});

function assertOptOut(name, body, expected) {
  const result = parseSmsOptOut(body);
  if (result.isOptOut !== expected.isOptOut || result.keyword !== expected.keyword) {
    console.error(`FAIL: ${name}`);
    console.error('Expected:', expected);
    console.error('Received:', result);
    process.exit(1);
  }

  console.log(`PASS: ${name} -> optOut=${result.isOptOut}${result.keyword ? '/' + result.keyword : ''}`);
}

assertOptOut('STOP opt-out detected', 'STOP', { isOptOut: true, keyword: 'STOP' });
assertOptOut('lowercase stop opt-out detected', 'stop', { isOptOut: true, keyword: 'STOP' });
assertOptOut('UNSUBSCRIBE opt-out detected', ' UNSUBSCRIBE ', { isOptOut: true, keyword: 'UNSUBSCRIBE' });
assertOptOut('normal reply is not opt-out', 'Yes, tomorrow works', { isOptOut: false });


function assertOptOutWorkflow(name, input, expected) {
  const result = planSmsOptOutWorkflow(input);
  const pass = Object.entries(expected).every(([key, value]) => result[key] === value);

  if (!pass) {
    console.error(`FAIL: ${name}`);
    console.error('Expected:', expected);
    console.error('Received:', result);
    process.exit(1);
  }

  console.log(`PASS: ${name} -> ${result.reason}`);
}

assertOptOutWorkflow('Opt-out workflow planned without writes', {
  rooferId: 'roofer-test',
  leadId: 'lead-test',
  homeownerPhone: '+15551234567',
  inboundBody: 'STOP',
  messageSid: 'SM-test',
  pendingFollowUpIds: ['fu-1', 'fu-2']
}, {
  shouldProcess: true,
  reason: 'opt_out_detected',
  keyword: 'STOP'
});

assertOptOutWorkflow('Non-opt-out workflow ignored', {
  rooferId: 'roofer-test',
  leadId: 'lead-test',
  homeownerPhone: '+15551234567',
  inboundBody: 'Yes, tomorrow works',
  pendingFollowUpIds: ['fu-1']
}, {
  shouldProcess: false,
  reason: 'not_opt_out'
});

assertOptOutWorkflow('Invalid phone opt-out workflow blocked', {
  rooferId: 'roofer-test',
  leadId: 'lead-test',
  homeownerPhone: '5551234567',
  inboundBody: 'STOP',
  pendingFollowUpIds: ['fu-1']
}, {
  shouldProcess: false,
  reason: 'invalid_phone'
});

console.log('OK: SMS safety service verification passed.');
console.log('No writes performed.');
console.log('No SMS sent.');
