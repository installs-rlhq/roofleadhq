#!/usr/bin/env node

const fs = require('fs');

const scriptPath = __filename;

const ROOFERS_TABLE = 'roofers';
const TARGET = 'known_test_roofer_sms_enable';
const TEST_ROOFER_ID = 'be7efc94-bd68-43af-81b2-dc7b869b42df';

console.log('=== RoofLeadHQ Test Roofer SMS Enable Live Test Verification ===');
console.log('Default run is fail-closed and performs no live write.');
console.log('No live Supabase writes performed unless all explicit gates are present.');
console.log('Only allowed live write: roofers.sms_confirmation_enabled=true for the known test roofer.');
console.log('No SMS sent');
console.log('No Twilio calls made');
console.log('No route, cron, or production dispatcher activation');

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exit(1);
  }
  console.log(`PASS: ${message}`);
}

function gateStatus(env = process.env, argv = process.argv) {
  const checks = [
    {
      name: 'SMS_TEST_ROOFER_ENABLE_SMS_WRITE=true',
      passed: env.SMS_TEST_ROOFER_ENABLE_SMS_WRITE === 'true'
    },
    {
      name: `SMS_TEST_ROOFER_TARGET=${TARGET}`,
      passed: env.SMS_TEST_ROOFER_TARGET === TARGET
    },
    {
      name: `SMS_TEST_ROOFER_ID=${TEST_ROOFER_ID}`,
      passed: env.SMS_TEST_ROOFER_ID === TEST_ROOFER_ID
    },
    {
      name: '--allow-live-supabase-write',
      passed: argv.includes('--allow-live-supabase-write')
    },
    {
      name: '--known-test-roofer-only',
      passed: argv.includes('--known-test-roofer-only')
    },
    {
      name: '--enable-sms-confirmation',
      passed: argv.includes('--enable-sms-confirmation')
    }
  ];

  return {
    allPassed: checks.every((check) => check.passed),
    checks,
    rooferId: env.SMS_TEST_ROOFER_ID || null
  };
}

function createFakeSupabase(seedRows = []) {
  const calls = [];
  const rows = [...seedRows];

  function matchingRows(filters) {
    return rows.filter((row) => {
      return Object.entries(filters).every(([column, value]) => row[column] === value);
    });
  }

  return {
    calls,
    rows,
    client: {
      from(table) {
        calls.push({ method: 'from', table });
        if (table !== ROOFERS_TABLE) {
          throw new Error(`Unexpected table: ${table}`);
        }

        const query = {
          filters: {},
          mode: 'select',
          payload: null,
          select(columns) {
            calls.push({ method: 'select', table, columns });
            return query;
          },
          eq(column, value) {
            calls.push({ method: 'eq', table, column, value });
            query.filters[column] = value;
            return query;
          },
          limit(count) {
            calls.push({ method: 'limit', table, count });
            return Promise.resolve({ data: matchingRows(query.filters).slice(0, count), error: null });
          },
          update(payload) {
            calls.push({ method: 'update', table, payload });
            query.mode = 'update';
            query.payload = payload;
            return query;
          },
          single() {
            calls.push({ method: 'single', table });

            if (query.mode === 'update') {
              const matches = matchingRows(query.filters);
              if (matches.length !== 1) {
                return Promise.resolve({
                  data: null,
                  error: { message: `Expected one row, got ${matches.length}` }
                });
              }
              Object.assign(matches[0], query.payload);
              return Promise.resolve({ data: matches[0], error: null });
            }

            const matches = matchingRows(query.filters);
            return Promise.resolve({
              data: matches[0] || null,
              error: matches.length === 1 ? null : { message: `Expected one row, got ${matches.length}` }
            });
          }
        };

        return query;
      }
    }
  };
}

async function findTargetRoofer(supabase, rooferId) {
  return supabase
    .from(ROOFERS_TABLE)
    .select('id,business_name,status,sms_confirmation_enabled')
    .eq('id', rooferId)
    .limit(2);
}

async function enableKnownTestRooferSms(supabase, rooferId) {
  if (rooferId !== TEST_ROOFER_ID) {
    return { applied: false, failedClosed: true, reason: 'unknown_roofer_id' };
  }

  const before = await findTargetRoofer(supabase, rooferId);
  if (before.error) {
    return { applied: false, failedClosed: true, reason: 'pre_lookup_failed', error: before.error };
  }

  const beforeRows = before.data || [];
  if (beforeRows.length !== 1) {
    return { applied: false, failedClosed: true, reason: 'pre_roofer_count_not_one', rowCount: beforeRows.length };
  }

  const oldValue = beforeRows[0].sms_confirmation_enabled;
  const updated = await supabase
    .from(ROOFERS_TABLE)
    .update({ sms_confirmation_enabled: true })
    .eq('id', TEST_ROOFER_ID)
    .select('id,business_name,status,sms_confirmation_enabled')
    .single();

  if (updated.error) {
    return { applied: false, failedClosed: true, reason: 'update_failed', error: updated.error, oldValue };
  }

  const after = await findTargetRoofer(supabase, rooferId);
  if (after.error) {
    return { applied: false, failedClosed: true, reason: 'post_lookup_failed', error: after.error, oldValue };
  }

  const afterRows = after.data || [];
  if (afterRows.length !== 1) {
    return { applied: false, failedClosed: true, reason: 'post_roofer_count_not_one', rowCount: afterRows.length, oldValue };
  }

  if (afterRows[0].id !== TEST_ROOFER_ID || afterRows[0].sms_confirmation_enabled !== true) {
    return { applied: false, failedClosed: true, reason: 'post_verification_failed', oldValue, newValue: afterRows[0].sms_confirmation_enabled };
  }

  return {
    applied: true,
    failedClosed: false,
    reason: 'applied',
    roofer: afterRows[0],
    oldValue,
    newValue: afterRows[0].sms_confirmation_enabled,
    noSmsSent: true,
    noTwilioCallsMade: true,
    noRouteAdded: true,
    noCronAdded: true,
    noProductionDispatcherActivation: true
  };
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
  assert(!hasSmsProviderClientUsage, 'script has no Twilio import or client call');
  assert(!/\.messages\.create\s*\(/.test(source), 'script has no SMS send call');
  assert(!/app\.(get|post|put|patch|delete)\s*\(/.test(source), 'script has no route integration');

  const hasScheduledIntegration =
    source.includes('set' + 'Interval(') ||
    source.includes('set' + 'Timeout(') ||
    source.includes("require('node-" + "cron')") ||
    source.includes('require("node-' + 'cron")');
  assert(!hasScheduledIntegration, 'script has no cron or scheduler integration');

  const hasProductionDispatcherActivation =
    source.includes('execute' + 'SmsDispatcher') ||
    source.includes('run' + 'SmsDispatcher') ||
    source.includes('start' + 'SmsDispatcher');
  assert(!hasProductionDispatcherActivation, 'script has no production dispatcher activation');

  const insertCalls = source.split('.' + 'insert(').length - 1;
  const updateCalls = source.split('.' + 'update(').length - 1;
  const upsertCalls = source.split('.' + 'upsert(').length - 1;
  const deleteCalls = source.split('.' + 'delete(').length - 1;
  assert(insertCalls === 0, 'script has no insert call sites');
  assert(updateCalls === 1, 'script has exactly one update call site');
  assert(upsertCalls === 0, 'script has no upsert call sites');
  assert(deleteCalls === 0, 'script has no delete call sites');
  assert(/const ROOFERS_TABLE = 'roofers';/.test(source), 'roofers target is a literal constant');
  assert(!/from\(['"](messages|follow_ups|workflow_events)['"]\)/.test(source), 'script has no messages/follow_ups/workflow_events table target');
  assert(/\.update\(\{ sms_confirmation_enabled: true \}\)/.test(source), 'only update payload sets sms_confirmation_enabled true');
  assert(new RegExp(`\\.eq\\('id', ${'TEST_ROOFER_ID'}\\)`).test(source), 'update is scoped to TEST_ROOFER_ID');
}

async function runSafeVerification() {
  const closed = gateStatus({}, ['node', scriptPath]);
  assert(closed.allPassed === false, 'default gates fail closed');
  assert(closed.checks.some((check) => !check.passed), 'default run has missing gates');

  const openEnv = {
    SMS_TEST_ROOFER_ENABLE_SMS_WRITE: 'true',
    SMS_TEST_ROOFER_TARGET: TARGET,
    SMS_TEST_ROOFER_ID: TEST_ROOFER_ID
  };
  const openArgv = [
    'node',
    scriptPath,
    '--allow-live-supabase-write',
    '--known-test-roofer-only',
    '--enable-sms-confirmation'
  ];

  assert(gateStatus(openEnv, openArgv).allPassed === true, 'all explicit gates can be satisfied');
  assert(gateStatus({ ...openEnv, SMS_TEST_ROOFER_TARGET: 'wrong-target' }, openArgv).allPassed === false, 'wrong target fails closed');
  assert(gateStatus({ ...openEnv, SMS_TEST_ROOFER_ID: 'wrong-roofer' }, openArgv).allPassed === false, 'wrong roofer id fails closed');
  assert(gateStatus(openEnv, openArgv.filter((arg) => arg !== '--known-test-roofer-only')).allPassed === false, 'missing known test roofer flag fails closed');
  assert(gateStatus(openEnv, openArgv.filter((arg) => arg !== '--enable-sms-confirmation')).allPassed === false, 'missing enable CLI flag fails closed');

  const wrongRooferResult = await enableKnownTestRooferSms(createFakeSupabase().client, 'wrong-roofer');
  assert(wrongRooferResult.failedClosed === true, 'wrong roofer write path fails closed');
  assert(wrongRooferResult.reason === 'unknown_roofer_id', 'wrong roofer returns unknown_roofer_id');

  const missingFake = createFakeSupabase();
  const missingResult = await enableKnownTestRooferSms(missingFake.client, TEST_ROOFER_ID);
  assert(missingResult.failedClosed === true, 'missing test roofer row fails closed');
  assert(missingResult.reason === 'pre_roofer_count_not_one', 'missing test roofer row returns count failure');
  assert(missingFake.calls.every((call) => call.method !== 'update'), 'missing row path performs no update');

  const fake = createFakeSupabase([
    {
      id: TEST_ROOFER_ID,
      business_name: 'Test Roofing',
      status: 'active',
      sms_confirmation_enabled: false
    }
  ]);
  const fakeResult = await enableKnownTestRooferSms(fake.client, TEST_ROOFER_ID);
  assert(fakeResult.applied === true, 'valid gated path applies to fake Supabase');
  assert(fakeResult.failedClosed === false, 'valid gated fake path does not fail closed');
  assert(fakeResult.oldValue === false, 'fake path records old sms_confirmation_enabled false');
  assert(fakeResult.newValue === true, 'fake path records new sms_confirmation_enabled true');
  assert(fake.calls.filter((call) => call.method === 'update').length === 1, 'fake path performs exactly one roofers update');
  assert(fake.calls.every((call) => call.table === ROOFERS_TABLE), 'fake path only targets roofers');
  assert(fake.rows[0].id === TEST_ROOFER_ID, 'fake path updates known test roofer row');
  assert(fake.rows[0].sms_confirmation_enabled === true, 'fake path sets sms_confirmation_enabled true');
  assert(fakeResult.noSmsSent === true, 'result reports no SMS sent');
  assert(fakeResult.noTwilioCallsMade === true, 'result reports no Twilio calls');
  assert(fakeResult.noRouteAdded === true, 'result reports no route added');
  assert(fakeResult.noCronAdded === true, 'result reports no cron added');
  assert(fakeResult.noProductionDispatcherActivation === true, 'result reports no production dispatcher activation');

  runStaticSafetyChecks();
}

async function runLiveWriteIfGated() {
  const gates = gateStatus();

  if (!gates.allPassed) {
    console.log('SAFE EXIT: test roofer SMS enable live-write gates are not fully present.');
    for (const check of gates.checks) {
      console.log(`${check.passed ? 'PASS' : 'MISSING'}: ${check.name}`);
    }
    await runSafeVerification();
    console.log('PASS: fail-closed test roofer SMS enable verification passed.');
    console.log('No live Supabase writes performed');
    console.log('No SMS sent');
    console.log('No Twilio calls made');
    console.log('No route, cron, or production dispatcher activation');
    return;
  }

  runStaticSafetyChecks();

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('FAIL: Supabase credentials are required after live-write gates pass.');
    process.exit(1);
  }

  const { createClient } = require('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseKey);
  const result = await enableKnownTestRooferSms(supabase, gates.rooferId);

  if (!result.applied) {
    console.error(`FAIL: test roofer SMS enable live write failed closed: ${result.reason}`);
    if (result.error) console.error(result.error);
    process.exit(1);
  }

  console.log('PASS: known test roofer sms_confirmation_enabled updated and verified.');
  console.log(`Roofer id: ${result.roofer.id}`);
  console.log(`Old sms_confirmation_enabled: ${result.oldValue}`);
  console.log(`New sms_confirmation_enabled: ${result.newValue}`);
  console.log('No SMS sent');
  console.log('No Twilio calls made');
  console.log('No route, cron, or production dispatcher activation');
}

runLiveWriteIfGated().catch((error) => {
  console.error('FAIL: test roofer SMS enable verifier failed');
  console.error(error);
  process.exit(1);
});
