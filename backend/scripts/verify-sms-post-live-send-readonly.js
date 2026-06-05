#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const APPROVED_ROOFER_ID = 'be7efc94-bd68-43af-81b2-dc7b869b42df';
const APPROVED_LEAD_ID = '6b0b07a6-cab4-4207-9160-197180006812';
const APPROVED_FOLLOW_UP_ID = '997ce1f8-3145-439f-a0c3-d042f803059f';

console.log('=== RoofLeadHQ Post-Live SMS Send Read-Only Verification ===');
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
    pass('static-only post-live verification completed');
    return;
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    fail('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const followUp = await supabase
    .from('follow_ups')
    .select('id,roofer_id,lead_id,status,sent_at,skipped_reason,stopped_reason,message_body')
    .eq('id', APPROVED_FOLLOW_UP_ID)
    .limit(2);

  if (followUp.error) fail('follow_up lookup failed', { message: followUp.error.message });
  if ((followUp.data || []).length !== 1) fail('follow_up must resolve exactly once', { count: (followUp.data || []).length });

  const candidate = followUp.data[0];

  if (candidate.roofer_id !== APPROVED_ROOFER_ID) fail('follow_up roofer_id changed');
  if (candidate.lead_id !== APPROVED_LEAD_ID) fail('follow_up lead_id changed');

  const messages = await supabase
    .from('messages')
    .select('id,roofer_id,lead_id,channel,direction,status,message_body,provider,provider_message_id,created_at')
    .eq('roofer_id', APPROVED_ROOFER_ID)
    .eq('lead_id', APPROVED_LEAD_ID)
    .eq('channel', 'sms')
    .eq('direction', 'outbound')
    .eq('message_body', candidate.message_body)
    .limit(5);

  if (messages.error) fail('messages lookup failed', { message: messages.error.message });

  const messageRows = messages.data || [];
  if (messageRows.length !== 1) {
    fail('exactly one outbound SMS message row must exist after live send', {
      count: messageRows.length
    });
  }

  const message = messageRows[0];

  if (!message.provider_message_id) fail('message provider_message_id is missing');
  if (message.status !== 'sent') fail('message status is not sent', { status: message.status });

  const workflowEvents = await supabase
    .from('workflow_events')
    .select('id,roofer_id,lead_id,event_type,event_status,event_source,metadata,created_at')
    .eq('roofer_id', APPROVED_ROOFER_ID)
    .eq('lead_id', APPROVED_LEAD_ID)
    .limit(10);

  if (workflowEvents.error) fail('workflow_events lookup failed', { message: workflowEvents.error.message });

  pass('post-live read-only verification found exactly one sent outbound SMS message row');

  console.log('=== POST-LIVE VERIFICATION SUMMARY ===');
  console.log(JSON.stringify({
    follow_up: {
      id: candidate.id,
      status: candidate.status,
      sent_at: candidate.sent_at,
      skipped_reason: candidate.skipped_reason,
      stopped_reason: candidate.stopped_reason
    },
    message: {
      id: message.id,
      status: message.status,
      provider: message.provider || null,
      provider_message_id: message.provider_message_id,
      created_at: message.created_at
    },
    workflow_event_count_for_lead: (workflowEvents.data || []).length,
    no_duplicate_sms_message_rows: true
  }, null, 2));

  pass('read-only post-live SMS verification completed');
}

main().catch((error) => {
  fail('Unexpected post-live verification failure', { message: error.message });
});
