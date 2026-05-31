#!/usr/bin/env node

require('dotenv').config({ path: '/root/roofleadhq/backend/.env' });

const { createClient } = require('@supabase/supabase-js');

async function main() {
  console.log('=== RoofLeadHQ Roofer Flags Read-Only Check ===');

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('FAIL: Missing Supabase environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data, error } = await supabase
    .from('roofers')
    .select('id,business_name,twilio_number,calendar_sync_enabled,sms_confirmation_enabled')
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('FAIL: Could not read roofers table');
    console.error(error.message);
    process.exit(1);
  }

  console.log(`Roofers checked: ${data.length}`);

  for (const roofer of data) {
    console.log('---');
    console.log(`Business: ${roofer.business_name}`);
    console.log(`Roofer ID: ${roofer.id}`);
    console.log(`Twilio number: ${roofer.twilio_number || 'not set'}`);
    console.log(`Calendar sync enabled: ${roofer.calendar_sync_enabled}`);
    console.log(`SMS confirmation enabled: ${roofer.sms_confirmation_enabled}`);
  }

  const unsafe = data.filter(
    (roofer) =>
      roofer.calendar_sync_enabled === true ||
      roofer.sms_confirmation_enabled === true
  );

  if (unsafe.length > 0) {
    console.error('FAIL: One or more roofers have Calendar/SMS flags enabled');
    process.exit(1);
  }

  console.log('OK: all checked roofers have Calendar/SMS disabled');
  console.log('No writes performed.');
}

main().catch((err) => {
  console.error('FAIL: unexpected error');
  console.error(err.message);
  process.exit(1);
});
