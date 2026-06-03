#!/usr/bin/env node

require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

(async () => {
  console.log('=== RoofLeadHQ SMS Dispatcher Data Shape Read-Only Verification ===');
  console.log('No writes are performed.');
  console.log('No SMS is sent.');
  console.log('No Twilio calls are made.');

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('FAIL: Missing Supabase environment variables');
    process.exit(1);
  }

  const now = new Date().toISOString();

  const { data, error } = await supabase
    .from('follow_ups')
    .select(`
      id,
      roofer_id,
      lead_id,
      status,
      followup_type,
      scheduled_for,
      message_body,
      leads(id, phone, status, homeowner_name),
      roofers(id, business_name, sms_confirmation_enabled, timezone)
    `)
    .eq('status', 'scheduled')
    .lte('scheduled_for', now)
    .limit(10);

  if (error) {
    console.error(`FAIL: ${error.message}`);
    process.exit(1);
  }

  console.log(`Due scheduled follow-ups inspected: ${data.length}`);

  let missingRelationCount = 0;

  for (const row of data) {
    const missingRelation = !row.leads || !row.roofers;
    if (missingRelation) missingRelationCount += 1;

    console.log({
      follow_up_id: row.id,
      followup_type: row.followup_type,
      scheduled_for: row.scheduled_for,
      lead_status: row.leads?.status || null,
      has_phone: Boolean(row.leads?.phone),
      roofer: row.roofers?.business_name || null,
      sms_enabled: row.roofers?.sms_confirmation_enabled ?? null,
      timezone: row.roofers?.timezone || null,
      missing_relation: missingRelation
    });
  }

  if (missingRelationCount > 0) {
    console.error(`FAIL: ${missingRelationCount} inspected follow-up row(s) are missing lead or roofer relation data`);
    process.exit(1);
  }

  console.log('PASS: SMS dispatcher data shape read-only verification passed.');
})();
