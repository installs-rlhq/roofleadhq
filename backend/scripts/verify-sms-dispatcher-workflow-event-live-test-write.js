#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const scriptPath = __filename;

const WORKFLOW_EVENTS_TABLE = 'workflow_events';
const EVENT_TYPE = 'sms_live_test_audit_insert';
const EVENT_SOURCE = 'sms_dispatcher_test_audit_writer';
const EVENT_STATUS = 'test_only';
const VERIFIER = 'verify-sms-dispatcher-workflow-event-live-test-write';

console.log('=== RoofLeadHQ SMS Dispatcher Workflow Event Live Test Write Verification ===');
console.log('Default run is fail-closed and performs no live write.');
console.log('No live Supabase writes performed unless all explicit gates are present.');
console.log('No messages written');
console.log('No follow_ups updated');
console.log('No SMS sent');
console.log('No Twilio calls made');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

function getArgValue(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return null;
  return process.argv[index + 1] || null;
}

function buildPayload(runId) {
  return {
    roofer_id: null,
    lead_id: null,
    event_type: EVENT_TYPE,
    event_source: EVENT_SOURCE,
    event_status: EVENT_STATUS,
    description: 'Test-only live workflow_events insert for SMS dispatcher audit writer verification',
    metadata: {
      test_only: true,
      live_test: true,
      run_id: runId,
      verifier: VERIFIER,
      writes_allowed: [WORKFLOW_EVENTS_TABLE],
      messages_written: false,
      follow_ups_updated: false,
      sms_sent: false,
      twilio_called: false
    }
  };
}

function gateStatus(env = process.env, argv = process.argv) {
  const cliRunIdIndex = argv.indexOf('--run-id');
  const cliRunId = cliRunIdIndex === -1 ? null : argv[cliRunIdIndex + 1] || null;
  const envRunId = env.SMS_LIVE_TEST_RUN_ID || null;
  const checks = [
    {
      name: 'SMS_WORKFLOW_EVENTS_LIVE_TEST_WRITE=true',
      passed: env.SMS_WORKFLOW_EVENTS_LIVE_TEST_WRITE === 'true'
    },
    {
      name: 'SMS_LIVE_WRITE_TARGET=workflow_events',
      passed: env.SMS_LIVE_WRITE_TARGET === WORKFLOW_EVENTS_TABLE
    },
    {
      name: 'SMS_LIVE_TEST_RUN_ID present',
      passed: Boolean(envRunId)
    },
    {
      name: '--allow-live-supabase-write',
      passed: argv.includes('--allow-live-supabase-write')
    },
    {
      name: '--workflow-events-only',
      passed: argv.includes('--workflow-events-only')
    },
    {
      name: '--test-only',
      passed: argv.includes('--test-only')
    },
    {
      name: '--run-id matches SMS_LIVE_TEST_RUN_ID',
      passed: Boolean(cliRunId && envRunId && cliRunId === envRunId)
    }
  ];

  return {
    allPassed: checks.every((check) => check.passed),
    checks,
    runId: envRunId,
    cliRunId
  };
}

function createFakeSupabase(existingRows = []) {
  const calls = [];
  const rows = [...existingRows];

  return {
    calls,
    rows,
    client: {
      from(table) {
        calls.push({ method: 'from', table });

        if (table !== WORKFLOW_EVENTS_TABLE) {
          throw new Error(`Unexpected table: ${table}`);
        }

        const query = {
          filters: {},
          select(columns) {
            calls.push({ method: 'select', table, columns });
            return query;
          },
          eq(column, value) {
            calls.push({ method: 'eq', table, column, value });
            query.filters[column] = value;
            return query;
          },
          filter(column, operator, value) {
            calls.push({ method: 'filter', table, column, operator, value });
            query.filters[column] = value;
            return query;
          },
          limit(count) {
            calls.push({ method: 'limit', table, count });
            const data = rows.filter((row) => {
              return (
                row.event_source === query.filters.event_source &&
                row.event_type === query.filters.event_type &&
                row.metadata?.run_id === query.filters['metadata->>run_id']
              );
            }).slice(0, count);
            return Promise.resolve({ data, error: null });
          },
          insert(payload) {
            calls.push({ method: 'insert', table, payload });
            rows.push({ id: `fake-${rows.length + 1}`, ...payload });
            return Promise.resolve({ data: [{ id: `fake-${rows.length}` }], error: null });
          }
        };

        return query;
      }
    }
  };
}

async function findExistingAuditRows(supabase, runId) {
  return supabase
    .from(WORKFLOW_EVENTS_TABLE)
    .select('id,event_type,event_source,event_status,metadata')
    .eq('event_source', EVENT_SOURCE)
    .eq('event_type', EVENT_TYPE)
    .filter('metadata->>run_id', 'eq', runId)
    .limit(2);
}

async function performWorkflowEventLiveTestWrite(supabase, runId) {
  const existing = await findExistingAuditRows(supabase, runId);

  if (existing.error) {
    return { applied: false, failedClosed: true, reason: 'duplicate_lookup_failed', error: existing.error };
  }

  if ((existing.data || []).length > 0) {
    return { applied: false, failedClosed: true, reason: 'duplicate_test_audit_row_found' };
  }

  const payload = buildPayload(runId);
  const inserted = await supabase.from(WORKFLOW_EVENTS_TABLE).insert(payload);

  if (inserted.error) {
    return { applied: false, failedClosed: true, reason: 'insert_failed', error: inserted.error };
  }

  const verification = await findExistingAuditRows(supabase, runId);

  if (verification.error) {
    return { applied: false, failedClosed: true, reason: 'post_insert_lookup_failed', error: verification.error };
  }

  const rows = verification.data || [];

  if (rows.length !== 1) {
    return { applied: false, failedClosed: true, reason: 'post_insert_row_count_not_one', rowCount: rows.length };
  }

  const metadata = rows[0].metadata || {};

  if (
    metadata.test_only !== true ||
    metadata.messages_written !== false ||
    metadata.follow_ups_updated !== false ||
    metadata.sms_sent !== false ||
    metadata.twilio_called !== false
  ) {
    return { applied: false, failedClosed: true, reason: 'post_insert_metadata_invalid' };
  }

  return { applied: true, failedClosed: false, reason: 'applied', row: rows[0] };
}

function runStaticSafetyChecks() {
  const source = fs.readFileSync(scriptPath, 'utf8');

  const hasSmsProviderClientUsage =
    source.includes("require('" + "twilio" + "')") ||
    source.includes('require("' + 'twilio' + '")') ||
    source.includes("from '" + "twilio" + "'") ||
    source.includes('from "' + 'twilio' + '"') ||
    source.includes('new ' + 'Twilio') ||
    source.includes('twilio' + '(');
  assert(!hasSmsProviderClientUsage, 'script has no reachable Twilio client usage');
  assert(!/from\(['"]messages['"]\)|from\(['"]follow_ups['"]\)/.test(source), 'script has no messages or follow_ups table access');
  assert(!/\.(update|upsert|delete)\s*\(/.test(source), 'script has no update/upsert/delete calls');
  assert(!/app\.(get|post|put|patch|delete)\s*\(/.test(source), 'script has no route integration');
  const hasScheduledIntegration =
    source.includes('set' + 'Interval(') ||
    source.includes('set' + 'Timeout(') ||
    source.includes("require('node-" + "cron')") ||
    source.includes('require("node-' + 'cron")');
  assert(!hasScheduledIntegration, 'script has no scheduled integration');

  const insertCalls = Array.from(source.matchAll(/\.insert\(/g));
  assert(insertCalls.length === 1, 'script has exactly one insert call');

  const literalForbiddenTables = /['"](messages|follow_ups)['"]/.test(source);
  assert(!literalForbiddenTables, 'script has no literal messages or follow_ups table target');

  const workflowEventsLiteral = /const WORKFLOW_EVENTS_TABLE = 'workflow_events';/.test(source);
  assert(workflowEventsLiteral, 'script workflow_events target is a literal constant');
}

async function runSafeVerification() {
  const closed = gateStatus({}, ['node', scriptPath]);
  assert(closed.allPassed === false, 'default gates fail closed');
  assert(closed.checks.some((check) => !check.passed), 'default run has missing gates');

  const envRunId = 'safe-run-id';
  const mismatch = gateStatus(
    {
      SMS_WORKFLOW_EVENTS_LIVE_TEST_WRITE: 'true',
      SMS_LIVE_WRITE_TARGET: WORKFLOW_EVENTS_TABLE,
      SMS_LIVE_TEST_RUN_ID: envRunId
    },
    [
      'node',
      scriptPath,
      '--allow-live-supabase-write',
      '--workflow-events-only',
      '--test-only',
      '--run-id',
      'different-run-id'
    ]
  );
  assert(mismatch.allPassed === false, 'run-id mismatch fails closed');

  const open = gateStatus(
    {
      SMS_WORKFLOW_EVENTS_LIVE_TEST_WRITE: 'true',
      SMS_LIVE_WRITE_TARGET: WORKFLOW_EVENTS_TABLE,
      SMS_LIVE_TEST_RUN_ID: envRunId
    },
    [
      'node',
      scriptPath,
      '--allow-live-supabase-write',
      '--workflow-events-only',
      '--test-only',
      '--run-id',
      envRunId
    ]
  );
  assert(open.allPassed === true, 'all explicit gates can be satisfied');

  const duplicateFake = createFakeSupabase([{ id: 'existing-1', ...buildPayload(envRunId) }]);
  const duplicateResult = await performWorkflowEventLiveTestWrite(duplicateFake.client, envRunId);
  assert(duplicateResult.failedClosed === true, 'duplicate test audit row fails closed');
  assert(duplicateResult.reason === 'duplicate_test_audit_row_found', 'duplicate row prevents insert');
  assert(duplicateFake.calls.every((call) => call.method !== 'insert'), 'duplicate path performs no insert');

  const fake = createFakeSupabase();
  const fakeResult = await performWorkflowEventLiveTestWrite(fake.client, envRunId);
  assert(fakeResult.applied === true, 'valid gated path applies to fake Supabase');
  assert(fakeResult.failedClosed === false, 'valid gated fake path does not fail closed');
  assert(fake.calls.filter((call) => call.method === 'insert').length === 1, 'fake path performs one workflow_events insert');
  assert(fake.calls.every((call) => call.table === WORKFLOW_EVENTS_TABLE), 'fake path only targets workflow_events');
  assert(fake.rows.length === 1, 'fake path records one test audit row');
  assert(fake.rows[0].metadata.test_only === true, 'fake inserted row is test-only');
  assert(fake.rows[0].metadata.messages_written === false, 'fake inserted row records no messages written');
  assert(fake.rows[0].metadata.follow_ups_updated === false, 'fake inserted row records no follow_ups updated');
  assert(fake.rows[0].metadata.sms_sent === false, 'fake inserted row records no SMS sent');
  assert(fake.rows[0].metadata.twilio_called === false, 'fake inserted row records no Twilio calls');

  runStaticSafetyChecks();
}

async function runLiveWriteIfGated() {
  const gates = gateStatus();

  if (!gates.allPassed) {
    console.log('SAFE EXIT: live workflow_events test write gates are not fully present.');
    for (const check of gates.checks) {
      console.log(`${check.passed ? 'PASS' : 'MISSING'}: ${check.name}`);
    }
    await runSafeVerification();
    console.log('PASS: fail-closed live test write verification passed.');
    console.log('No live Supabase writes performed');
    console.log('No messages written');
    console.log('No follow_ups updated');
    console.log('No SMS sent');
    console.log('No Twilio calls made');
    return;
  }

  runStaticSafetyChecks();

  const runId = getArgValue('--run-id');
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('FAIL: Supabase credentials are required after live-write gates pass.');
    process.exit(1);
  }

  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);
  const result = await performWorkflowEventLiveTestWrite(supabase, runId);

  if (!result.applied) {
    console.error(`FAIL: live workflow_events test write failed closed: ${result.reason}`);
    if (result.error) console.error(result.error);
    process.exit(1);
  }

  console.log('PASS: one gated test-only workflow_events row inserted and verified.');
  console.log('No messages written');
  console.log('No follow_ups updated');
  console.log('No SMS sent');
  console.log('No Twilio calls made');
}

runLiveWriteIfGated().catch((error) => {
  console.error('FAIL: workflow_events live test write verifier failed');
  console.error(error);
  process.exit(1);
});
