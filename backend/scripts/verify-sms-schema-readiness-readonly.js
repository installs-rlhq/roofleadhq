#!/usr/bin/env node

const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({
  path: path.join(__dirname, '..', '.env')
});

const supabaseUrl = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('FAIL: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function check(label, query) {
  const { error } = await query;
  if (error) {
    console.log(`FAIL: ${label}`);
    console.log(error.message);
    return false;
  }

  console.log(`PASS: ${label}`);
  return true;
}

async function main() {
  console.log('=== RoofLeadHQ SMS Schema Readiness Read-Only Verification ===');
  console.log('No writes are performed.');
  console.log('No SMS is sent.');
  console.log('No Twilio calls are made.');

  let ok = true;

  ok = await check(
    'roofers SMS safety columns exist',
    supabase
      .from('roofers')
      .select('id,business_name,sms_confirmation_enabled,timezone,twilio_number,status')
      .limit(1)
  ) && ok;

  ok = await check(
    'leads SMS safety columns exist',
    supabase
      .from('leads')
      .select('id,roofer_id,phone,status,source_path,source_detail')
      .limit(1)
  ) && ok;

  ok = await check(
    'follow_ups SMS safety columns exist',
    supabase
      .from('follow_ups')
      .select('id,roofer_id,lead_id,status,followup_type,scheduled_for,sent_at,skipped_reason,stopped_reason,message_body')
      .limit(1)
  ) && ok;

  ok = await check(
    'messages SMS audit columns exist',
    supabase
      .from('messages')
      .select('id,roofer_id,lead_id,channel,direction,status,provider,provider_message_id,error_message,from_number,to_number,sent_at,received_at,message_body')
      .limit(1)
  ) && ok;

  ok = await check(
    'workflow_events SMS audit columns exist',
    supabase
      .from('workflow_events')
      .select('id,roofer_id,lead_id,event_type,event_status,event_source,description,metadata')
      .limit(1)
  ) && ok;

  const { data: smsEnabledRoofers, error: rooferFlagError } = await supabase
    .from('roofers')
    .select('id,business_name,sms_confirmation_enabled')
    .eq('sms_confirmation_enabled', true);

  if (rooferFlagError) {
    console.log('FAIL: Could not verify sms_confirmation_enabled flags');
    console.log(rooferFlagError.message);
    ok = false;
  } else if (smsEnabledRoofers.length > 0) {
    console.log('WARN: Some roofers have sms_confirmation_enabled=true');
    console.log(smsEnabledRoofers.map((roofer) => `${roofer.business_name} (${roofer.id})`).join('\n'));
  } else {
    console.log('PASS: No roofers have sms_confirmation_enabled=true');
  }

  console.log('=== RESULT ===');
  console.log(ok ? 'PASS: SMS schema readiness read-only verification passed' : 'FAIL: SMS schema readiness read-only verification found blockers');

  process.exit(ok ? 0 : 1);
}

main().catch((error) => {
  console.error('FAIL: Unexpected verifier error');
  console.error(error);
  process.exit(1);
});
