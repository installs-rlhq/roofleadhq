#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const APPROVED_ROOFER_ID = 'be7efc94-bd68-43af-81b2-dc7b869b42df';
const APPROVED_LEAD_ID = '6b0b07a6-cab4-4207-9160-197180006812';
const APPROVED_FOLLOW_UP_ID = '997ce1f8-3145-439f-a0c3-d042f803059f';
const APPROVED_MAX_BATCH_SIZE = 1;
const PRODUCTION_RUNNER_TARGET = 'sms_dispatcher_production_runner';
const DB_EXECUTOR_TARGET = 'sms_dispatcher_db_executor';
const RUN_ID = `approved-live-candidate-readiness-${APPROVED_FOLLOW_UP_ID}`;

console.log('=== RoofLeadHQ SMS Live Candidate Readiness Read-Only Verification ===');
console.log('No writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio import or call is made.');
console.log('No route, cron, scheduler, or auto-start is activated.');

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exit(1);
}

function pass(message) {
  console.log(`PASS: ${message}`);
}

function isValidE164(phone) {
  return /^\+[1-9]\d{1,14}$/.test(phone || '');
}

function runStaticSafetyChecks() {
  const source = fs.readFileSync(__filename, 'utf8');
  const forbiddenChecks = [
    { found: source.includes('.' + 'insert' + '('), label: 'Supabase insert call' },
    { found: source.includes('.' + 'update' + '('), label: 'Supabase update call' },
    { found: source.includes('.' + 'upsert' + '('), label: 'Supabase upsert call' },
    { found: source.includes('.' + 'delete' + '('), label: 'Supabase delete call' },
    { found: source.includes('.' + 'rpc' + '('), label: 'Supabase RPC call' },
    { found: /require\(['"]twilio['"]\)|from ['"]twilio['"]/i.test(source), label: 'Twilio import' },
    { found: /messages\.create\s*\(/i.test(source), label: 'SMS provider send call' },
    { found: /\bapp\.(get|post|put|patch|delete)\s*\(/.test(source), label: 'route registration' },
    { found: /scheduleJob\s*\(|setInterval\s*\(|cron\s*\./i.test(source), label: 'cron or scheduler activation' }
  ];

  for (const check of forbiddenChecks) {
    if (check.found) fail(`Static safety check found forbidden ${check.label}`);
  }

  pass('static safety checks found no writes, Twilio, SMS send, routes, cron, or scheduler activation');
}

async function main() {
  runStaticSafetyChecks();

  if (process.argv.includes('--static-only')) {
    pass('static-only candidate readiness verification completed');
    return;
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    fail('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const followUpResult = await supabase
    .from('follow_ups')
    .select(`
      id,
      roofer_id,
      lead_id,
      status,
      followup_type,
      scheduled_for,
      created_at,
      sent_at,
      skipped_reason,
      stopped_reason,
      message_body,
      leads(id, roofer_id, phone, status, homeowner_name),
      roofers(id, business_name, status, sms_confirmation_enabled, timezone, twilio_number)
    `)
    .eq('id', APPROVED_FOLLOW_UP_ID)
    .limit(2);

  if (followUpResult.error) fail('approved follow_up lookup failed', { message: followUpResult.error.message });

  const rows = followUpResult.data || [];
  if (rows.length !== 1) fail('approved follow_up must resolve exactly once', { count: rows.length });

  const candidate = rows[0];
  const lead = candidate.leads;
  const roofer = candidate.roofers;

  if (candidate.roofer_id !== APPROVED_ROOFER_ID) fail('approved follow_up roofer_id changed', { expected: APPROVED_ROOFER_ID, received: candidate.roofer_id });
  if (candidate.lead_id !== APPROVED_LEAD_ID) fail('approved follow_up lead_id changed', { expected: APPROVED_LEAD_ID, received: candidate.lead_id });
  if (candidate.status !== 'scheduled') fail('approved follow_up is no longer scheduled', { status: candidate.status });
  if (candidate.sent_at !== null) fail('approved follow_up has already been sent', { sent_at: candidate.sent_at });
  if (candidate.skipped_reason !== null) fail('approved follow_up has skipped_reason', { skipped_reason: candidate.skipped_reason });
  if (candidate.stopped_reason !== null) fail('approved follow_up has stopped_reason', { stopped_reason: candidate.stopped_reason });
  if (!candidate.message_body) fail('approved follow_up is missing message_body');

  if (!lead) fail('approved candidate is missing lead relation');
  if (lead.id !== APPROVED_LEAD_ID) fail('approved lead relation changed', { expected: APPROVED_LEAD_ID, received: lead.id });
  if (lead.roofer_id !== APPROVED_ROOFER_ID) fail('approved lead roofer_id changed', { expected: APPROVED_ROOFER_ID, received: lead.roofer_id });
  if (!isValidE164(lead.phone)) fail('approved lead phone is not valid E.164');
  if (['opted_out', 'booked', 'cancelled', 'lost'].includes(lead.status)) fail('approved lead status is blocked', { status: lead.status });

  if (!roofer) fail('approved candidate is missing roofer relation');
  if (roofer.id !== APPROVED_ROOFER_ID) fail('approved roofer relation changed', { expected: APPROVED_ROOFER_ID, received: roofer.id });
  if (roofer.status !== 'active') fail('approved roofer is not active', { status: roofer.status });
  if (roofer.sms_confirmation_enabled !== true) fail('approved roofer SMS confirmation is not enabled');
  if (!isValidE164(roofer.twilio_number)) fail('approved roofer Twilio from-number is not valid E.164');

  const duplicateByBody = await supabase
    .from('messages')
    .select('id,roofer_id,lead_id,channel,direction,message_body,provider_message_id')
    .eq('roofer_id', APPROVED_ROOFER_ID)
    .eq('lead_id', APPROVED_LEAD_ID)
    .eq('channel', 'sms')
    .eq('direction', 'outbound')
    .eq('message_body', candidate.message_body)
    .limit(2);

  if (duplicateByBody.error) fail('duplicate body lookup failed', { message: duplicateByBody.error.message });

  const duplicateProviderId = `sms-dispatcher-production-runner-test-${RUN_ID}`;
  const duplicateByProvider = await supabase
    .from('messages')
    .select('id,roofer_id,lead_id,provider_message_id')
    .eq('roofer_id', APPROVED_ROOFER_ID)
    .eq('lead_id', APPROVED_LEAD_ID)
    .eq('provider_message_id', duplicateProviderId)
    .limit(2);

  if (duplicateByProvider.error) fail('duplicate provider lookup failed', { message: duplicateByProvider.error.message });

  if ((duplicateByBody.data || []).length > 0) fail('duplicate message body already exists', { count: duplicateByBody.data.length });
  if ((duplicateByProvider.data || []).length > 0) fail('duplicate provider test id already exists', { count: duplicateByProvider.data.length });

  pass('approved live candidate is unchanged and duplicate scope is clean');

  console.log('=== EXACT APPROVAL SUMMARY ===');
  console.log(JSON.stringify({
    roofer_id: APPROVED_ROOFER_ID,
    roofer_business_name: roofer.business_name,
    lead_id: APPROVED_LEAD_ID,
    lead_status: lead.status,
    follow_up_id: APPROVED_FOLLOW_UP_ID,
    followup_type: candidate.followup_type,
    scheduled_for: candidate.scheduled_for,
    twilio_from_number: roofer.twilio_number,
    destination_phone: lead.phone,
    message_body: candidate.message_body,
    max_batch_size: APPROVED_MAX_BATCH_SIZE,
    duplicate_message_body_count: 0,
    duplicate_provider_test_id: duplicateProviderId,
    duplicate_provider_test_id_count: 0
  }, null, 2));

  console.log('=== FUTURE COMMAND - DO NOT RUN WITHOUT EXPLICIT APPROVAL ===');
  console.log('export SMS_DISPATCHER_PRODUCTION_USE_LIVE_SUPABASE=true');
  console.log('export SMS_DISPATCHER_PRODUCTION_RUNNER=true');
  console.log(`export SMS_DISPATCHER_PRODUCTION_TARGET=${PRODUCTION_RUNNER_TARGET}`);
  console.log(`export SMS_DISPATCHER_PRODUCTION_ALLOWED_ROOFER_IDS=${APPROVED_ROOFER_ID}`);
  console.log(`export SMS_DISPATCHER_PRODUCTION_APPROVED_FOLLOW_UP_ID=${APPROVED_FOLLOW_UP_ID}`);
  console.log(`export SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE=${APPROVED_MAX_BATCH_SIZE}`);
  console.log(`export SMS_DISPATCHER_PRODUCTION_LIVE_TEST_RUN_ID=${RUN_ID}`);
  console.log('export SMS_DISPATCHER_DB_EXECUTOR_WRITE=true');
  console.log(`export SMS_DB_EXECUTOR_TARGET=${DB_EXECUTOR_TARGET}`);
  console.log('export SMS_DB_EXECUTOR_CONFIRM_WRITE_PLAN=true');
  console.log('node backend/scripts/run-sms-dispatcher-production-runner.js --allow-live-supabase-production-runner --production-runner --approved-follow-up-id ' + APPROVED_FOLLOW_UP_ID);

  pass('read-only approved live candidate readiness verification completed');
}

main().catch((error) => {
  fail('Unexpected approved live candidate readiness verification failure', { message: error.message });
});
