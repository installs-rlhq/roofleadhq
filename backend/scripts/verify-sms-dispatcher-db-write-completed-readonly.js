#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const EXPECTED = {
  runId: 'db-write-candidate-2026-06-05T20-50-10-103z',
  messageId: '1882cdb3-5aa6-4906-807d-58d43216a103',
  followUpId: '997ce1f8-3145-439f-a0c3-d042f803059f',
  rooferId: 'be7efc94-bd68-43af-81b2-dc7b869b42df',
  leadId: '6b0b07a6-cab4-4207-9160-197180006812',
  direction: 'outbound',
  channel: 'sms',
  provider: 'test_only_dispatcher_verifier',
  providerMessageId: 'sms-dispatcher-test-db-write-candidate-2026-06-05T20-50-10-103z',
  messageStatus: 'planned',
  followUpStatus: 'skipped',
  skippedReason: 'test_only_sms_dispatcher_db-write-candidate-2026-06-05T20-50-10-103z'
};

console.log('=== RoofLeadHQ SMS Dispatcher Completed DB Write Read-Only Verification ===');
console.log('No Supabase writes are performed.');
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

function assertEqual(actual, expected, label) {
  if (actual !== expected) {
    fail(`${label} mismatch`, { expected, actual });
  }
  pass(`${label} matches`);
}

function assertNull(actual, label) {
  if (actual !== null) {
    fail(`${label} must be null`, { actual });
  }
  pass(`${label} is null`);
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
    { pattern: /runSmsDispatcher\s*\(|executeSmsDispatcher\s*\(|dispatchSms\s*\(|sendSms\s*\(|startSmsDispatcher\s*\(/i, label: 'dispatcher activation' }
  ];

  for (const check of forbidden) {
    if (check.pattern.test(source)) {
      fail(`Static safety check found forbidden ${check.label}`);
    }
  }

  pass('static safety checks found no writes, Twilio, SMS send, routes, cron, scheduler, or dispatcher activation');
}

async function selectExactlyOne(query, label) {
  const { data, error } = await query.limit(2);
  if (error) fail(`${label} lookup failed`, { message: error.message });
  if ((data || []).length !== 1) {
    fail(`${label} must exist exactly once`, { count: (data || []).length });
  }
  return data[0];
}

function verifyMessage(row) {
  assertEqual(row.id, EXPECTED.messageId, 'message id');
  assertEqual(row.roofer_id, EXPECTED.rooferId, 'message roofer_id');
  assertEqual(row.lead_id, EXPECTED.leadId, 'message lead_id');
  assertEqual(row.direction, EXPECTED.direction, 'message direction');
  assertEqual(row.channel, EXPECTED.channel, 'message channel');
  assertEqual(row.provider, EXPECTED.provider, 'message provider');
  assertEqual(row.provider_message_id, EXPECTED.providerMessageId, 'message provider_message_id');
  assertEqual(row.status, EXPECTED.messageStatus, 'message status');
  assertNull(row.sent_at, 'message sent_at');
}

function verifyFollowUp(row) {
  assertEqual(row.id, EXPECTED.followUpId, 'follow_up id');
  assertEqual(row.roofer_id, EXPECTED.rooferId, 'follow_up roofer_id');
  assertEqual(row.lead_id, EXPECTED.leadId, 'follow_up lead_id');
  assertEqual(row.status, EXPECTED.followUpStatus, 'follow_up status');
  assertEqual(row.skipped_reason, EXPECTED.skippedReason, 'follow_up skipped_reason');
  assertNull(row.sent_at, 'follow_up sent_at');
}

async function main() {
  runStaticSafetyChecks();

  if (process.argv.includes('--static-only')) {
    console.log('PASS: static-only completed DB write verification passed.');
    console.log('No Supabase reads or writes performed.');
    console.log('No SMS sent.');
    console.log('No Twilio calls made.');
    console.log('No route, cron, scheduler, or dispatcher activation.');
    return;
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    fail('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const message = await selectExactlyOne(
    supabase
      .from('messages')
      .select('id,roofer_id,lead_id,direction,channel,provider,provider_message_id,status,sent_at')
      .eq('id', EXPECTED.messageId),
    'completed test-only message row'
  );
  verifyMessage(message);

  const duplicateScopedMessage = await selectExactlyOne(
    supabase
      .from('messages')
      .select('id,roofer_id,lead_id,provider,provider_message_id,status,sent_at')
      .eq('roofer_id', EXPECTED.rooferId)
      .eq('lead_id', EXPECTED.leadId)
      .eq('provider', EXPECTED.provider)
      .eq('provider_message_id', EXPECTED.providerMessageId),
    'duplicate-scoped test-only message row'
  );
  assertEqual(duplicateScopedMessage.id, EXPECTED.messageId, 'duplicate-scoped message id');

  const followUp = await selectExactlyOne(
    supabase
      .from('follow_ups')
      .select('id,roofer_id,lead_id,status,skipped_reason,sent_at')
      .eq('id', EXPECTED.followUpId),
    'completed test-only follow_up row'
  );
  verifyFollowUp(followUp);

  console.log('=== SAFETY STATEMENT ===');
  console.log(`PASS: completed gated test-only DB write verified for run id ${EXPECTED.runId}.`);
  console.log('No Supabase writes performed.');
  console.log('No SMS sent.');
  console.log('No Twilio import or call made.');
  console.log('No route, cron, scheduler, or dispatcher activation added.');
}

main().catch((error) => {
  fail('Unexpected completed DB write read-only verifier failure', { message: error.message });
});
