#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.resolve(__dirname, '..', '..');
const serviceTs = path.join(repoRoot, 'backend/src/services/sms-safety.service.ts');
const compiledJs = '/tmp/sms-safety.service.optout.js';

console.log('=== RoofLeadHQ SMS Opt-Out Workflow Verification ===');
console.log('No writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio calls are made.');

const source = fs.readFileSync(serviceTs, 'utf8');
const output = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    esModuleInterop: true
  }
});

fs.writeFileSync(compiledJs, output.outputText);

const { planSmsOptOutWorkflow } = require(compiledJs);

function assertCase(label, input, expected) {
  const result = planSmsOptOutWorkflow(input);

  for (const [key, value] of Object.entries(expected)) {
    if (JSON.stringify(result[key]) !== JSON.stringify(value)) {
      console.error(`FAIL: ${label}`);
      console.error(`Expected ${key}:`, value);
      console.error(`Actual ${key}:`, result[key]);
      process.exit(1);
    }
  }

  console.log(`PASS: ${label} -> ${result.reason}`);
  return result;
}

const baseInput = {
  rooferId: 'roofer-test-1',
  leadId: 'lead-test-1',
  homeownerPhone: '+15557778888',
  inboundBody: 'STOP',
  messageSid: 'SM_TEST_OPTOUT_001',
  pendingFollowUpIds: ['followup-1', 'followup-2']
};

const stopPlan = assertCase('STOP plans lead opted_out', baseInput, {
  shouldProcess: true,
  reason: 'opt_out_detected',
  keyword: 'STOP',
  leadUpdate: {
    id: 'lead-test-1',
    status: 'opted_out'
  },
  followUpUpdates: [
    {
      id: 'followup-1',
      status: 'skipped',
      stopped_reason: 'homeowner_opted_out'
    },
    {
      id: 'followup-2',
      status: 'skipped',
      stopped_reason: 'homeowner_opted_out'
    }
  ]
});

if (!stopPlan.workflowEvent) {
  console.error('FAIL: STOP workflow event plan missing');
  process.exit(1);
}

if (
  stopPlan.workflowEvent.event_type !== 'homeowner_opted_out' ||
  stopPlan.workflowEvent.event_source !== 'sms_safety_service' ||
  stopPlan.workflowEvent.event_status !== 'planned' ||
  stopPlan.workflowEvent.metadata.keyword !== 'STOP' ||
  stopPlan.workflowEvent.metadata.message_sid !== 'SM_TEST_OPTOUT_001' ||
  stopPlan.workflowEvent.metadata.homeowner_phone !== '+15557778888'
) {
  console.error('FAIL: STOP workflow event metadata incorrect');
  console.error(stopPlan.workflowEvent);
  process.exit(1);
}

console.log('PASS: workflow event plan includes keyword/message_sid/homeowner_phone');

assertCase('lowercase stop plans lead opted_out', {
  ...baseInput,
  inboundBody: ' stop '
}, {
  shouldProcess: true,
  reason: 'opt_out_detected',
  keyword: 'STOP'
});

assertCase('UNSUBSCRIBE plans lead opted_out', {
  ...baseInput,
  inboundBody: 'UNSUBSCRIBE'
}, {
  shouldProcess: true,
  reason: 'opt_out_detected',
  keyword: 'UNSUBSCRIBE'
});

assertCase('normal reply does nothing', {
  ...baseInput,
  inboundBody: 'Yes, please call me tomorrow'
}, {
  shouldProcess: false,
  reason: 'not_opt_out',
  followUpUpdates: []
});

assertCase('invalid phone is blocked', {
  ...baseInput,
  homeownerPhone: '5557778888'
}, {
  shouldProcess: false,
  reason: 'invalid_phone',
  followUpUpdates: []
});

assertCase('missing roofer data is blocked', {
  ...baseInput,
  rooferId: undefined
}, {
  shouldProcess: false,
  reason: 'missing_required_field',
  followUpUpdates: []
});

assertCase('missing lead data is blocked', {
  ...baseInput,
  leadId: undefined
}, {
  shouldProcess: false,
  reason: 'missing_required_field',
  followUpUpdates: []
});

console.log('OK: SMS opt-out workflow verification passed.');
console.log('No writes performed.');
console.log('No SMS sent.');
