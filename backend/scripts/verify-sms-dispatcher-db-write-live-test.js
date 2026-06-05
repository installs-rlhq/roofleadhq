#!/usr/bin/env node

const fs = require('fs');

const scriptPath = __filename;

const MESSAGES_TABLE = 'messages';
const FOLLOW_UPS_TABLE = 'follow_ups';
const LIVE_WRITE_TARGET = 'messages_follow_ups';
const VERIFIER = 'verify-sms-dispatcher-db-write-live-test';
const TEST_PROVIDER = 'test_only_dispatcher_verifier';
const TEST_FOLLOW_UP_START_STATUS = 'scheduled';
const TEST_FOLLOW_UP_END_STATUS = 'skipped';

console.log('=== RoofLeadHQ SMS Dispatcher DB Write Live Test Verification ===');
console.log('Default run is fail-closed and performs no live write.');
console.log('No live Supabase writes performed unless all explicit gates are present.');
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

function getArgValue(flag, argv = process.argv) {
  const index = argv.indexOf(flag);
  if (index === -1) return null;
  return argv[index + 1] || null;
}

function buildProviderMessageId(runId) {
  return `sms-dispatcher-test-${runId}`;
}

function buildMessagePayload({ runId, rooferId, leadId, now }) {
  return {
    roofer_id: rooferId,
    lead_id: leadId,
    direction: 'outbound',
    channel: 'sms',
    from_number: null,
    to_number: '+15550001000',
    message_body: `TEST ONLY SMS dispatcher verifier ${runId}. This row is not a sent SMS.`,
    provider: TEST_PROVIDER,
    provider_message_id: buildProviderMessageId(runId),
    status: 'planned',
    sent_at: null,
    error_message: null,
    created_at: now
  };
}

function buildFollowUpUpdatePayload(runId, now) {
  return {
    status: TEST_FOLLOW_UP_END_STATUS,
    skipped_reason: `test_only_sms_dispatcher_${runId}`,
    sent_at: null,
    updated_at: now
  };
}

function gateStatus(env = process.env, argv = process.argv) {
  const envRunId = env.SMS_LIVE_TEST_RUN_ID || null;
  const envRooferId = env.SMS_LIVE_TEST_ROOFER_ID || null;
  const envLeadId = env.SMS_LIVE_TEST_LEAD_ID || null;
  const envFollowUpId = env.SMS_LIVE_TEST_FOLLOW_UP_ID || null;
  const cliRunId = getArgValue('--run-id', argv);
  const cliRooferId = getArgValue('--roofer-id', argv);
  const cliLeadId = getArgValue('--lead-id', argv);
  const cliFollowUpId = getArgValue('--follow-up-id', argv);

  const checks = [
    {
      name: 'SMS_DISPATCHER_DB_LIVE_TEST_WRITE=true',
      passed: env.SMS_DISPATCHER_DB_LIVE_TEST_WRITE === 'true'
    },
    {
      name: 'SMS_LIVE_WRITE_TARGET=messages_follow_ups',
      passed: env.SMS_LIVE_WRITE_TARGET === LIVE_WRITE_TARGET
    },
    { name: 'SMS_LIVE_TEST_RUN_ID present', passed: Boolean(envRunId) },
    { name: 'SMS_LIVE_TEST_ROOFER_ID present', passed: Boolean(envRooferId) },
    { name: 'SMS_LIVE_TEST_LEAD_ID present', passed: Boolean(envLeadId) },
    { name: 'SMS_LIVE_TEST_FOLLOW_UP_ID present', passed: Boolean(envFollowUpId) },
    { name: '--allow-live-supabase-write', passed: argv.includes('--allow-live-supabase-write') },
    { name: '--messages-follow-ups-only', passed: argv.includes('--messages-follow-ups-only') },
    { name: '--test-only', passed: argv.includes('--test-only') },
    {
      name: '--run-id matches SMS_LIVE_TEST_RUN_ID',
      passed: Boolean(cliRunId && envRunId && cliRunId === envRunId)
    },
    {
      name: '--roofer-id matches SMS_LIVE_TEST_ROOFER_ID',
      passed: Boolean(cliRooferId && envRooferId && cliRooferId === envRooferId)
    },
    {
      name: '--lead-id matches SMS_LIVE_TEST_LEAD_ID',
      passed: Boolean(cliLeadId && envLeadId && cliLeadId === envLeadId)
    },
    {
      name: '--follow-up-id matches SMS_LIVE_TEST_FOLLOW_UP_ID',
      passed: Boolean(cliFollowUpId && envFollowUpId && cliFollowUpId === envFollowUpId)
    }
  ];

  return {
    allPassed: checks.every((check) => check.passed),
    checks,
    runId: envRunId,
    rooferId: envRooferId,
    leadId: envLeadId,
    followUpId: envFollowUpId,
    cliRunId,
    cliRooferId,
    cliLeadId,
    cliFollowUpId
  };
}

function createFakeSupabase(seed = {}) {
  const calls = [];
  const rows = {
    [MESSAGES_TABLE]: [...(seed[MESSAGES_TABLE] || [])],
    [FOLLOW_UPS_TABLE]: [...(seed[FOLLOW_UPS_TABLE] || [])]
  };

  function makeQuery(table) {
    const query = {
      table,
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
        return Promise.resolve({ data: matchingRows(table, query.filters).slice(0, count), error: null });
      },
      single() {
        calls.push({ method: 'single', table });
        if (query.mode === 'insert') {
          const row = { id: `fake-message-${rows[MESSAGES_TABLE].length + 1}`, ...query.payload };
          rows[MESSAGES_TABLE].push(row);
          return Promise.resolve({ data: row, error: null });
        }

        if (query.mode === 'update') {
          const matches = matchingRows(table, query.filters);
          if (matches.length !== 1) {
            return Promise.resolve({ data: null, error: { message: `Expected one row, got ${matches.length}` } });
          }
          Object.assign(matches[0], query.payload);
          return Promise.resolve({ data: matches[0], error: null });
        }

        const matches = matchingRows(table, query.filters);
        return Promise.resolve({ data: matches[0] || null, error: matches.length === 1 ? null : { message: 'Row count is not one' } });
      },
      insert(payload) {
        calls.push({ method: 'insert', table, payload });
        query.mode = 'insert';
        query.payload = payload;
        return query;
      },
      update(payload) {
        calls.push({ method: 'update', table, payload });
        query.mode = 'update';
        query.payload = payload;
        return query;
      }
    };

    return query;
  }

  function matchingRows(table, filters) {
    return rows[table].filter((row) => {
      return Object.entries(filters).every(([column, value]) => row[column] === value);
    });
  }

  return {
    calls,
    rows,
    client: {
      from(table) {
        calls.push({ method: 'from', table });
        if (table !== MESSAGES_TABLE && table !== FOLLOW_UPS_TABLE) {
          throw new Error(`Unexpected table: ${table}`);
        }
        return makeQuery(table);
      }
    }
  };
}

async function findDuplicateMessage(supabase, runId, rooferId, leadId) {
  return supabase
    .from(MESSAGES_TABLE)
    .select('id,roofer_id,lead_id,direction,channel,provider,provider_message_id,status,sent_at')
    .eq('roofer_id', rooferId)
    .eq('lead_id', leadId)
    .eq('provider', TEST_PROVIDER)
    .eq('provider_message_id', buildProviderMessageId(runId))
    .limit(2);
}

async function findTargetFollowUp(supabase, followUpId, rooferId, leadId) {
  return supabase
    .from(FOLLOW_UPS_TABLE)
    .select('id,roofer_id,lead_id,status,skipped_reason,sent_at,scheduled_for')
    .eq('id', followUpId)
    .eq('roofer_id', rooferId)
    .eq('lead_id', leadId)
    .limit(2);
}

async function performDispatcherDbLiveTestWrite(supabase, input) {
  const { runId, rooferId, leadId, followUpId } = input;
  const missingField = ['runId', 'rooferId', 'leadId', 'followUpId'].find((field) => !input[field]);

  if (missingField) {
    return { applied: false, failedClosed: true, reason: `missing_${missingField}` };
  }

  const existingMessage = await findDuplicateMessage(supabase, runId, rooferId, leadId);

  if (existingMessage.error) {
    return { applied: false, failedClosed: true, reason: 'duplicate_lookup_failed', error: existingMessage.error };
  }

  if ((existingMessage.data || []).length > 0) {
    return { applied: false, failedClosed: true, reason: 'duplicate_test_message_found' };
  }

  const existingFollowUp = await findTargetFollowUp(supabase, followUpId, rooferId, leadId);

  if (existingFollowUp.error) {
    return { applied: false, failedClosed: true, reason: 'follow_up_lookup_failed', error: existingFollowUp.error };
  }

  if ((existingFollowUp.data || []).length !== 1) {
    return {
      applied: false,
      failedClosed: true,
      reason: 'follow_up_target_count_not_one',
      rowCount: (existingFollowUp.data || []).length
    };
  }

  const targetFollowUp = existingFollowUp.data[0];
  if (
    targetFollowUp.status !== TEST_FOLLOW_UP_START_STATUS ||
    targetFollowUp.sent_at !== null ||
    targetFollowUp.skipped_reason === `test_only_sms_dispatcher_${runId}`
  ) {
    return {
      applied: false,
      failedClosed: true,
      reason: 'follow_up_not_test_safe',
      status: targetFollowUp.status,
      sentAt: targetFollowUp.sent_at,
      skippedReason: targetFollowUp.skipped_reason
    };
  }

  const now = input.now || new Date().toISOString();
  const messagePayload = buildMessagePayload({ runId, rooferId, leadId, now });
  const inserted = await supabase
    .from(MESSAGES_TABLE)
    .insert(messagePayload)
    .select('id,roofer_id,lead_id,direction,channel,provider,provider_message_id,status,sent_at')
    .single();

  if (inserted.error) {
    return { applied: false, failedClosed: true, reason: 'message_insert_failed', error: inserted.error };
  }

  const followUpPayload = buildFollowUpUpdatePayload(runId, now);
  const updated = await supabase
    .from(FOLLOW_UPS_TABLE)
    .update(followUpPayload)
    .eq('id', followUpId)
    .eq('roofer_id', rooferId)
    .eq('lead_id', leadId)
    .select('id,roofer_id,lead_id,status,skipped_reason,sent_at,scheduled_for')
    .single();

  if (updated.error) {
    return { applied: false, failedClosed: true, reason: 'follow_up_update_failed', error: updated.error };
  }

  const messageVerification = await findDuplicateMessage(supabase, runId, rooferId, leadId);
  const followUpVerification = await findTargetFollowUp(supabase, followUpId, rooferId, leadId);

  if (messageVerification.error) {
    return { applied: false, failedClosed: true, reason: 'post_message_lookup_failed', error: messageVerification.error };
  }

  if (followUpVerification.error) {
    return { applied: false, failedClosed: true, reason: 'post_follow_up_lookup_failed', error: followUpVerification.error };
  }

  const verifiedMessages = messageVerification.data || [];
  const verifiedFollowUps = followUpVerification.data || [];

  if (verifiedMessages.length !== 1) {
    return { applied: false, failedClosed: true, reason: 'post_message_count_not_one', rowCount: verifiedMessages.length };
  }

  if (verifiedFollowUps.length !== 1) {
    return { applied: false, failedClosed: true, reason: 'post_follow_up_count_not_one', rowCount: verifiedFollowUps.length };
  }

  if (
    verifiedMessages[0].roofer_id !== rooferId ||
    verifiedMessages[0].lead_id !== leadId ||
    verifiedMessages[0].direction !== 'outbound' ||
    verifiedMessages[0].channel !== 'sms' ||
    verifiedMessages[0].provider !== TEST_PROVIDER ||
    verifiedMessages[0].provider_message_id !== buildProviderMessageId(runId) ||
    verifiedMessages[0].status !== 'planned' ||
    verifiedMessages[0].sent_at !== null
  ) {
    return { applied: false, failedClosed: true, reason: 'post_message_verification_failed' };
  }

  if (
    verifiedFollowUps[0].id !== followUpId ||
    verifiedFollowUps[0].roofer_id !== rooferId ||
    verifiedFollowUps[0].lead_id !== leadId ||
    verifiedFollowUps[0].status !== TEST_FOLLOW_UP_END_STATUS ||
    verifiedFollowUps[0].skipped_reason !== `test_only_sms_dispatcher_${runId}` ||
    verifiedFollowUps[0].sent_at !== null
  ) {
    return { applied: false, failedClosed: true, reason: 'post_follow_up_verification_failed' };
  }

  return {
    applied: true,
    failedClosed: false,
    reason: 'applied',
    message: verifiedMessages[0],
    followUp: verifiedFollowUps[0],
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
    /scheduleJob\s*\(/i.test(source) ||
    /cron\s*\./i.test(source) ||
    source.includes("require('node-" + "cron')") ||
    source.includes('require("node-' + 'cron")');
  assert(!hasScheduledIntegration, 'script has no cron or scheduler integration');
  const hasProductionDispatcherActivation =
    source.includes('execute' + 'SmsDispatcher') ||
    source.includes('run' + 'SmsDispatcher') ||
    source.includes('start' + 'SmsDispatcher') ||
    /dispatchSms\s*\(/i.test(source) ||
    /sendSms\s*\(/i.test(source);
  assert(!hasProductionDispatcherActivation, 'script has no production dispatcher activation');
  assert(!/\.(upsert|delete)\s*\(/.test(source), 'script has no upsert/delete calls');

  const insertCalls = source.split('.' + 'insert(').length - 1;
  const updateCalls = source.split('.' + 'update(').length - 1;
  assert(insertCalls === 1, 'script has only one live-branch insert call site');
  assert(updateCalls === 1, 'script has only one live-branch update call site');
  assert(/const MESSAGES_TABLE = 'messages';/.test(source), 'messages target is a literal constant');
  assert(/const FOLLOW_UPS_TABLE = 'follow_ups';/.test(source), 'follow_ups target is a literal constant');
}

async function runSafeVerification() {
  const closed = gateStatus({}, ['node', scriptPath]);
  assert(closed.allPassed === false, 'default gates fail closed');
  assert(closed.checks.some((check) => !check.passed), 'default run has missing gates');

  const envRunId = 'safe-run-id';
  const envRooferId = 'roofer-1';
  const envLeadId = 'lead-1';
  const envFollowUpId = 'followup-1';
  const baseEnv = {
    SMS_DISPATCHER_DB_LIVE_TEST_WRITE: 'true',
    SMS_LIVE_WRITE_TARGET: LIVE_WRITE_TARGET,
    SMS_LIVE_TEST_RUN_ID: envRunId,
    SMS_LIVE_TEST_ROOFER_ID: envRooferId,
    SMS_LIVE_TEST_LEAD_ID: envLeadId,
    SMS_LIVE_TEST_FOLLOW_UP_ID: envFollowUpId
  };
  const baseArgv = [
    'node',
    scriptPath,
    '--allow-live-supabase-write',
    '--messages-follow-ups-only',
    '--test-only',
    '--run-id',
    envRunId,
    '--roofer-id',
    envRooferId,
    '--lead-id',
    envLeadId,
    '--follow-up-id',
    envFollowUpId
  ];

  assert(gateStatus(baseEnv, baseArgv).allPassed === true, 'all explicit gates can be satisfied');
  assert(gateStatus({ ...baseEnv, SMS_LIVE_WRITE_TARGET: MESSAGES_TABLE }, baseArgv).allPassed === false, 'wrong target fails closed');
  assert(gateStatus(baseEnv, baseArgv.filter((arg) => arg !== '--test-only')).allPassed === false, 'missing test-only CLI flag fails closed');
  assert(gateStatus(baseEnv, baseArgv.map((arg) => (arg === envLeadId ? 'different-lead' : arg))).allPassed === false, 'lead-id mismatch fails closed');
  assert(gateStatus(baseEnv, baseArgv.map((arg) => (arg === envFollowUpId ? 'different-followup' : arg))).allPassed === false, 'follow-up-id mismatch fails closed');

  const missingResult = await performDispatcherDbLiveTestWrite(createFakeSupabase().client, {
    runId: envRunId,
    rooferId: envRooferId,
    leadId: envLeadId,
    followUpId: null
  });
  assert(missingResult.failedClosed === true, 'missing follow_up id fails closed');
  assert(missingResult.reason === 'missing_followUpId', 'missing follow_up id returns missing_followUpId');

  const duplicateFake = createFakeSupabase({
    [MESSAGES_TABLE]: [
      {
        id: 'existing-message-1',
        roofer_id: envRooferId,
        lead_id: envLeadId,
        provider: TEST_PROVIDER,
        provider_message_id: buildProviderMessageId(envRunId),
        status: 'planned',
        sent_at: null
      }
    ],
    [FOLLOW_UPS_TABLE]: [
      {
        id: envFollowUpId,
        roofer_id: envRooferId,
        lead_id: envLeadId,
        status: 'scheduled',
        skipped_reason: null,
        sent_at: null
      }
    ]
  });
  const duplicateResult = await performDispatcherDbLiveTestWrite(duplicateFake.client, {
    runId: envRunId,
    rooferId: envRooferId,
    leadId: envLeadId,
    followUpId: envFollowUpId
  });
  assert(duplicateResult.failedClosed === true, 'duplicate test message fails closed');
  assert(duplicateResult.reason === 'duplicate_test_message_found', 'duplicate protection prevents insert');
  assert(duplicateFake.calls.every((call) => call.method !== 'insert' && call.method !== 'update'), 'duplicate path performs no writes');

  const missingFollowUpFake = createFakeSupabase({ [FOLLOW_UPS_TABLE]: [] });
  const missingFollowUpResult = await performDispatcherDbLiveTestWrite(missingFollowUpFake.client, {
    runId: envRunId,
    rooferId: envRooferId,
    leadId: envLeadId,
    followUpId: envFollowUpId
  });
  assert(missingFollowUpResult.failedClosed === true, 'missing follow_up row fails closed');
  assert(missingFollowUpResult.reason === 'follow_up_target_count_not_one', 'missing follow_up row returns target count failure');

  const alreadySentFollowUpFake = createFakeSupabase({
    [FOLLOW_UPS_TABLE]: [
      {
        id: envFollowUpId,
        roofer_id: envRooferId,
        lead_id: envLeadId,
        status: 'sent',
        skipped_reason: null,
        sent_at: '2026-06-04T00:00:00.000Z'
      }
    ]
  });
  const alreadySentFollowUpResult = await performDispatcherDbLiveTestWrite(alreadySentFollowUpFake.client, {
    runId: envRunId,
    rooferId: envRooferId,
    leadId: envLeadId,
    followUpId: envFollowUpId
  });
  assert(alreadySentFollowUpResult.failedClosed === true, 'already sent follow_up row fails closed');
  assert(alreadySentFollowUpResult.reason === 'follow_up_not_test_safe', 'unsafe follow_up state reports follow_up_not_test_safe');
  assert(alreadySentFollowUpFake.calls.every((call) => call.method !== 'insert' && call.method !== 'update'), 'unsafe follow_up state performs no writes');

  const alreadyTestSkippedFollowUpFake = createFakeSupabase({
    [FOLLOW_UPS_TABLE]: [
      {
        id: envFollowUpId,
        roofer_id: envRooferId,
        lead_id: envLeadId,
        status: TEST_FOLLOW_UP_END_STATUS,
        skipped_reason: `test_only_sms_dispatcher_${envRunId}`,
        sent_at: null
      }
    ]
  });
  const alreadyTestSkippedFollowUpResult = await performDispatcherDbLiveTestWrite(alreadyTestSkippedFollowUpFake.client, {
    runId: envRunId,
    rooferId: envRooferId,
    leadId: envLeadId,
    followUpId: envFollowUpId
  });
  assert(alreadyTestSkippedFollowUpResult.failedClosed === true, 'already test-skipped follow_up row fails closed');
  assert(alreadyTestSkippedFollowUpResult.reason === 'follow_up_not_test_safe', 'duplicate follow_up update state reports follow_up_not_test_safe');
  assert(alreadyTestSkippedFollowUpFake.calls.every((call) => call.method !== 'insert' && call.method !== 'update'), 'duplicate follow_up update state performs no writes');

  const fake = createFakeSupabase({
    [FOLLOW_UPS_TABLE]: [
      {
        id: envFollowUpId,
        roofer_id: envRooferId,
        lead_id: envLeadId,
        status: 'scheduled',
        skipped_reason: null,
        sent_at: null
      }
    ]
  });
  const fakeResult = await performDispatcherDbLiveTestWrite(fake.client, {
    runId: envRunId,
    rooferId: envRooferId,
    leadId: envLeadId,
    followUpId: envFollowUpId,
    now: '2026-06-04T00:00:00.000Z'
  });
  assert(fakeResult.applied === true, 'valid gated path applies to fake Supabase');
  assert(fakeResult.failedClosed === false, 'valid gated fake path does not fail closed');
  assert(fake.calls.filter((call) => call.method === 'insert').length === 1, 'fake path performs one messages insert');
  assert(fake.calls.filter((call) => call.method === 'update').length === 1, 'fake path performs one follow_ups update');
  assert(fake.calls.every((call) => call.table === MESSAGES_TABLE || call.table === FOLLOW_UPS_TABLE), 'fake path only targets messages and follow_ups');
  assert(fake.rows[MESSAGES_TABLE].length === 1, 'fake path records one test message row');
  assert(fake.rows[MESSAGES_TABLE][0].channel === 'sms', 'fake message row is sms channel');
  assert(fake.rows[MESSAGES_TABLE][0].direction === 'outbound', 'fake message row is outbound');
  assert(fake.rows[MESSAGES_TABLE][0].status === 'planned', 'fake message row is planned, not sent');
  assert(fake.rows[MESSAGES_TABLE][0].sent_at === null, 'fake message row has no sent_at');
  assert(fake.rows[FOLLOW_UPS_TABLE][0].status === 'skipped', 'fake follow_up row is marked skipped');
  assert(fake.rows[FOLLOW_UPS_TABLE][0].skipped_reason === `test_only_sms_dispatcher_${envRunId}`, 'fake follow_up row has test-only skipped reason');
  assert(fakeResult.noSmsSent === true, 'result reports no SMS sent');
  assert(fakeResult.noTwilioCallsMade === true, 'result reports no Twilio calls');
  assert(fakeResult.noRouteAdded === true, 'result reports no route added');
  assert(fakeResult.noCronAdded === true, 'result reports no cron added');
  assert(fakeResult.noProductionDispatcherActivation === true, 'result reports no production dispatcher activation');

  runStaticSafetyChecks();
}

async function runLiveWriteIfGated() {
  if (process.argv.includes('--static-only')) {
    await runSafeVerification();
    console.log('PASS: static-only DB live test verifier checks passed.');
    console.log('No live Supabase writes performed');
    console.log('No SMS sent');
    console.log('No Twilio calls made');
    console.log('No route, cron, or production dispatcher activation');
    return;
  }

  const gates = gateStatus();

  if (!gates.allPassed) {
    console.log('SAFE EXIT: live messages/follow_ups test write gates are not fully present.');
    for (const check of gates.checks) {
      console.log(`${check.passed ? 'PASS' : 'MISSING'}: ${check.name}`);
    }
    await runSafeVerification();
    console.log('PASS: fail-closed DB live test write verification passed.');
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
  const result = await performDispatcherDbLiveTestWrite(supabase, {
    runId: gates.runId,
    rooferId: gates.rooferId,
    leadId: gates.leadId,
    followUpId: gates.followUpId
  });

  if (!result.applied) {
    console.error(`FAIL: live messages/follow_ups test write failed closed: ${result.reason}`);
    if (result.error) console.error(result.error);
    process.exit(1);
  }

  console.log('PASS: one gated test-only messages row inserted and one follow_ups row updated and verified.');
  console.log(`Message id: ${result.message.id}`);
  console.log(`Follow-up id: ${result.followUp.id}`);
  console.log('No SMS sent');
  console.log('No Twilio calls made');
  console.log('No route, cron, or production dispatcher activation');
}

runLiveWriteIfGated().catch((error) => {
  console.error('FAIL: DB live test write verifier failed');
  console.error(error);
  process.exit(1);
});
