#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const repoRoot = path.join(__dirname, '..', '..');
const writerTs = path.join(
  repoRoot,
  'backend/src/services/sms-dispatcher-workflow-event-audit-writer.service.ts'
);
const compiledWriterJs = '/tmp/sms-dispatcher-workflow-event-audit-writer.verify.js';

console.log('=== RoofLeadHQ SMS Dispatcher Workflow Event Audit Writer Verification ===');
console.log('No live Supabase writes performed');
console.log('No messages written');
console.log('No follow_ups updated');
console.log('No SMS sent');
console.log('No Twilio calls made');

function compile(sourcePath, outputPath) {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;

  fs.writeFileSync(outputPath, output);
}

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

function createFakeSupabase(options = {}) {
  const calls = [];
  const allowedTable = options.allowedTable || 'workflow_events';

  return {
    calls,
    client: {
      from(table) {
        calls.push({ method: 'from', table });

        if (table !== allowedTable) {
          throw new Error(`Unexpected table: ${table}`);
        }

        return {
          async insert(payload) {
            calls.push({ method: 'insert', table, payload });
            return options.insertResult || { data: [{ id: 'fake-workflow-event-1' }], error: null };
          }
        };
      }
    }
  };
}

compile(writerTs, compiledWriterJs);

const {
  SMS_DISPATCHER_TEST_AUDIT_EVENT_SOURCE,
  writeSmsDispatcherWorkflowEventAuditTestOnly
} = require(compiledWriterJs);

const validWorkflowEvent = {
  roofer_id: 'roofer-1',
  lead_id: 'lead-1',
  event_type: 'sms_test_audit_planned',
  event_source: SMS_DISPATCHER_TEST_AUDIT_EVENT_SOURCE,
  event_status: 'planned',
  description: 'SMS dispatcher test-only workflow event audit writer verification',
  metadata: {
    test_only: true,
    follow_up_id: 'followup-1',
    verifier: 'verify-sms-dispatcher-workflow-event-audit-writer'
  }
};

async function expectFailClosed(name, input, reason) {
  const fake = createFakeSupabase();
  const result = await writeSmsDispatcherWorkflowEventAuditTestOnly({
    supabase: fake.client,
    workflowEventInsertPlan: validWorkflowEvent,
    ...input
  });

  assert(result.failedClosed === true, `${name} fails closed`);
  assert(result.applied === false, `${name} is not applied`);
  assert(result.reason === reason, `${name} returns ${reason}`);
  assert(fake.calls.every((call) => call.method !== 'insert'), `${name} performs no insert`);
}

async function main() {
  const fake = createFakeSupabase();
  const validResult = await writeSmsDispatcherWorkflowEventAuditTestOnly({
    supabase: fake.client,
    tableName: 'workflow_events',
    workflowEventInsertPlan: validWorkflowEvent
  });

  assert(validResult.testOnly === true, 'writer result is test-only');
  assert(validResult.fakeSupabaseOnly === true, 'writer result is fake Supabase only');
  assert(validResult.noLiveSupabaseWrites === true, 'writer reports no live Supabase writes');
  assert(validResult.noMessagesWritten === true, 'writer reports no messages written');
  assert(validResult.noFollowUpsUpdated === true, 'writer reports no follow_ups updated');
  assert(validResult.noSmsSent === true, 'writer reports no SMS sent');
  assert(validResult.noTwilioCallsMade === true, 'writer reports no Twilio calls');
  assert(validResult.applied === true, 'valid workflow event insert is applied to fake Supabase');
  assert(validResult.failedClosed === false, 'valid workflow event does not fail closed');
  assert(validResult.reason === 'applied', 'valid workflow event returns applied');
  assert(fake.calls.length === 2, 'fake Supabase records one from call and one insert call');
  assert(fake.calls[0].table === 'workflow_events', 'writer targets workflow_events table only');
  assert(fake.calls[1].method === 'insert', 'writer calls insert on fake Supabase');
  assert(fake.calls[1].payload.metadata.test_only === true, 'insert payload preserves test_only metadata');

  await expectFailClosed('missing Supabase gate', { supabase: null }, 'missing_fake_supabase');
  await expectFailClosed('wrong table gate', { tableName: 'messages' }, 'wrong_table');
  await expectFailClosed(
    'full dispatcher write plan',
    {
      messageInsertPlan: { channel: 'sms' },
      followUpUpdatePlan: { status: 'sent' }
    },
    'full_dispatcher_write_plan_rejected'
  );
  await expectFailClosed(
    'message insert payload',
    { messageInsertPlan: { channel: 'sms' } },
    'message_payload_rejected'
  );
  await expectFailClosed(
    'follow_up update payload',
    { followUpUpdatePlan: { status: 'sent' } },
    'follow_up_payload_rejected'
  );
  await expectFailClosed(
    'missing workflow event payload',
    { workflowEventInsertPlan: null },
    'missing_workflow_event_plan'
  );
  await expectFailClosed(
    'missing test_only metadata',
    {
      workflowEventInsertPlan: {
        ...validWorkflowEvent,
        metadata: { verifier: 'missing-test-only' }
      }
    },
    'missing_test_only_metadata'
  );
  await expectFailClosed(
    'invalid event_source',
    {
      workflowEventInsertPlan: {
        ...validWorkflowEvent,
        event_source: 'sms_dispatcher_write_plan'
      }
    },
    'invalid_event_source'
  );
  await expectFailClosed(
    'message_body field',
    {
      workflowEventInsertPlan: {
        ...validWorkflowEvent,
        message_body: 'Forbidden SMS body'
      }
    },
    'forbidden_payload_field'
  );
  await expectFailClosed(
    'provider field',
    {
      workflowEventInsertPlan: {
        ...validWorkflowEvent,
        provider: 'twilio'
      }
    },
    'forbidden_payload_field'
  );
  await expectFailClosed(
    'provider_message_id field',
    {
      workflowEventInsertPlan: {
        ...validWorkflowEvent,
        provider_message_id: 'SM123'
      }
    },
    'forbidden_payload_field'
  );

  const source = fs.readFileSync(writerTs, 'utf8');
  assert(!/createClient/.test(source), 'writer has no createClient');
  assert(!/require\(['"]twilio['"]\)|from ['"]twilio['"]|new Twilio|twilio\(/i.test(source), 'writer has no Twilio references');
  assert(!/from\(['"]messages['"]\)|from\(['"]follow_ups['"]\)/.test(source), 'writer has no messages or follow_ups table access');
  assert(!/\.(update|upsert|delete)\s*\(/.test(source), 'writer has no update/upsert/delete calls');

  const fromCalls = Array.from(source.matchAll(/\.from\(([^)]+)\)/g)).map((match) => match[1]);
  assert(fromCalls.length === 1, 'writer has exactly one .from call');
  assert(fromCalls[0] === 'WORKFLOW_EVENTS_TABLE', 'writer .from call uses workflow_events constant');
  assert(/const WORKFLOW_EVENTS_TABLE = 'workflow_events';/.test(source), 'workflow_events table constant is literal');

  const insertCalls = Array.from(source.matchAll(/\.insert\(/g));
  assert(insertCalls.length === 1, 'writer has exactly one insert call');

  console.log('PASS: SMS dispatcher workflow event audit writer verification passed.');
  console.log('No live Supabase writes performed');
  console.log('No messages written');
  console.log('No follow_ups updated');
  console.log('No SMS sent');
  console.log('No Twilio calls made');
}

main().catch((error) => {
  console.error('FAIL: SMS dispatcher workflow event audit writer verification failed');
  console.error(error);
  process.exit(1);
});
