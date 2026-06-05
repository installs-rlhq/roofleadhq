#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const WORKFLOW_EVENTS_TABLE = 'workflow_events';
const EVENT_TYPE = 'sms_live_test_audit_insert';
const EVENT_SOURCE = 'sms_dispatcher_test_audit_writer';
const EVENT_STATUS = 'test_only';

console.log('=== RoofLeadHQ SMS Dispatcher Completed Workflow Event Read-Only Verification ===');
console.log('No Supabase writes are performed.');
console.log('No messages are written.');
console.log('No follow_ups are updated.');
console.log('No SMS is sent.');
console.log('No Twilio import or call is made.');
console.log('No route, cron, scheduler, or dispatcher activation is added.');

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) {
    console.error(JSON.stringify(details, null, 2));
  }
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function runStaticSafetyChecks() {
  const source = fs.readFileSync(__filename, 'utf8');
  const forbidden = [
    { pattern: /\.insert\s*\(/, label: 'Supabase insert call' },
    { pattern: /\.update\s*\(/, label: 'Supabase update call' },
    { pattern: /\.upsert\s*\(/, label: 'Supabase upsert call' },
    { pattern: /\.delete\s*\(/, label: 'Supabase delete call' },
    { pattern: /\.rpc\s*\(/, label: 'Supabase RPC call' },
    { pattern: /require\(['"]twilio['"]\)|from ['"]twilio['"]/, label: 'Twilio import' },
    { pattern: /new\s+Twilio|twilio\s*\(/i, label: 'Twilio client call' },
    { pattern: /\.messages\.create\s*\(/, label: 'SMS send call' },
    { pattern: /\bapp\.(get|post|put|patch|delete)\s*\(/, label: 'route registration' },
    { pattern: /scheduleJob\s*\(|setInterval\s*\(|setTimeout\s*\(|cron\s*\./i, label: 'cron or scheduler activation' },
    { pattern: /runSmsDispatcher\s*\(|executeSmsDispatcher\s*\(|dispatchSms\s*\(|sendSms\s*\(|startSmsDispatcher\s*\(/i, label: 'dispatcher activation' },
    { pattern: /from\(['"]messages['"]\)|from\(['"]follow_ups['"]\)/, label: 'messages or follow_ups table access' }
  ];

  for (const check of forbidden) {
    if (check.pattern.test(source)) {
      fail(`Static safety check found forbidden ${check.label}`);
    }
  }

  const workflowEventsLiteral = /const WORKFLOW_EVENTS_TABLE = 'workflow_events';/.test(source);
  if (!workflowEventsLiteral) {
    fail('Static safety check did not find literal workflow_events table target');
  }

  pass('static safety checks found no writes, Twilio, SMS send, routes, cron, scheduler, dispatcher activation, messages access, or follow_ups access');
}

async function selectCompletedWorkflowEvent(supabase, runId) {
  return supabase
    .from(WORKFLOW_EVENTS_TABLE)
    .select('id,roofer_id,lead_id,event_type,event_source,event_status,description,metadata,created_at')
    .eq('event_source', EVENT_SOURCE)
    .eq('event_type', EVENT_TYPE)
    .filter('metadata->>run_id', 'eq', runId)
    .limit(2);
}

function verifyRow(row, expected) {
  const metadata = row.metadata || {};

  if (row.roofer_id !== expected.rooferId) {
    fail('workflow_event roofer_id mismatch', { expected: expected.rooferId, actual: row.roofer_id });
  }
  pass('workflow_event roofer_id matches');

  if (row.lead_id !== null) {
    fail('workflow_event lead_id must be null for workflow_events-only audit', { actual: row.lead_id });
  }
  pass('workflow_event lead_id is null');

  if (row.event_type !== EVENT_TYPE) {
    fail('workflow_event event_type mismatch', { expected: EVENT_TYPE, actual: row.event_type });
  }
  pass('workflow_event event_type matches');

  if (row.event_source !== EVENT_SOURCE) {
    fail('workflow_event event_source mismatch', { expected: EVENT_SOURCE, actual: row.event_source });
  }
  pass('workflow_event event_source matches');

  if (row.event_status !== EVENT_STATUS) {
    fail('workflow_event event_status mismatch', { expected: EVENT_STATUS, actual: row.event_status });
  }
  pass('workflow_event event_status matches');

  const requiredMetadata = {
    test_only: true,
    live_test: true,
    run_id: expected.runId,
    roofer_id: expected.rooferId,
    writes_allowed: [WORKFLOW_EVENTS_TABLE],
    messages_written: false,
    follow_ups_updated: false,
    sms_sent: false,
    twilio_called: false
  };

  for (const [key, value] of Object.entries(requiredMetadata)) {
    const actual = metadata[key];
    const matches = Array.isArray(value)
      ? JSON.stringify(actual) === JSON.stringify(value)
      : actual === value;

    if (!matches) {
      fail(`workflow_event metadata.${key} mismatch`, { expected: value, actual });
    }
    pass(`workflow_event metadata.${key} matches`);
  }
}

async function main() {
  runStaticSafetyChecks();

  if (process.argv.includes('--static-only')) {
    console.log('PASS: static-only completed workflow_event verification passed.');
    console.log('No Supabase reads or writes performed.');
    console.log('No messages written.');
    console.log('No follow_ups updated.');
    console.log('No SMS sent.');
    console.log('No Twilio calls made.');
    console.log('No route, cron, scheduler, or dispatcher activation.');
    return;
  }

  const runId = getArgValue('--run-id') || process.env.SMS_LIVE_TEST_RUN_ID || null;
  const rooferId = getArgValue('--roofer-id') || process.env.SMS_LIVE_TEST_ROOFER_ID || null;

  if (!runId) {
    fail('Missing --run-id or SMS_LIVE_TEST_RUN_ID');
  }

  if (!rooferId) {
    fail('Missing --roofer-id or SMS_LIVE_TEST_ROOFER_ID');
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    fail('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const { data, error } = await selectCompletedWorkflowEvent(supabase, runId);

  if (error) {
    fail('completed workflow_event lookup failed', { message: error.message });
  }

  const rows = data || [];
  if (rows.length !== 1) {
    fail('completed workflow_event must exist exactly once', { count: rows.length, run_id: runId });
  }

  verifyRow(rows[0], { runId, rooferId });

  console.log('=== SAFETY STATEMENT ===');
  console.log(`PASS: completed workflow_events-only audit row verified for run id ${runId}.`);
  console.log('No Supabase writes performed.');
  console.log('No messages written.');
  console.log('No follow_ups updated.');
  console.log('No SMS sent.');
  console.log('No Twilio import or call made.');
  console.log('No route, cron, scheduler, or dispatcher activation added.');
}

main().catch((error) => {
  fail('Unexpected completed workflow_event read-only verifier failure', { message: error.message });
});
