#!/usr/bin/env node

require('dotenv').config({ path: '/root/roofleadhq/backend/.env' });

const { createClient } = require('@supabase/supabase-js');

function getArg(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length).trim() : '';
}

function isE164(value) {
  return /^\+[1-9]\d{7,14}$/.test(value);
}

async function main() {
  console.log('=== RoofLeadHQ Roofer Onboarding Dry Run ===');

  const required = {
    business_name: getArg('business_name'),
    owner_name: getArg('owner_name'),
    owner_email: getArg('owner_email'),
    owner_phone: getArg('owner_phone'),
    twilio_number: getArg('twilio_number'),
    timezone: getArg('timezone'),
    service_area: getArg('service_area'),
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error(`FAIL: Missing required inputs: ${missing.join(', ')}`);
    process.exit(1);
  }

  if (!isE164(required.owner_phone)) {
    console.error('FAIL: owner_phone must be E.164, example +15125551234');
    process.exit(1);
  }

  if (!isE164(required.twilio_number)) {
    console.error('FAIL: twilio_number must be E.164, example +15125551234');
    process.exit(1);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('FAIL: Missing Supabase environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: existingTwilio, error } = await supabase
    .from('roofers')
    .select('id,business_name,twilio_number')
    .eq('twilio_number', required.twilio_number)
    .maybeSingle();

  if (error) {
    console.error('FAIL: Could not check existing Twilio number');
    console.error(error.message);
    process.exit(1);
  }

  console.log('');
  console.log('---- Proposed Roofer Payload ----');
  console.log(`Business: ${required.business_name}`);
  console.log(`Owner: ${required.owner_name}`);
  console.log(`Email: ${required.owner_email}`);
  console.log(`Owner phone: ${required.owner_phone}`);
  console.log(`Twilio number: ${required.twilio_number}`);
  console.log(`Timezone: ${required.timezone}`);
  console.log(`Service area: ${required.service_area}`);
  console.log('Calendar sync enabled: false');
  console.log('SMS confirmation enabled: false');

  console.log('');
  console.log('---- Existing Twilio Number Check ----');

  if (existingTwilio) {
    console.log('MATCH FOUND: Twilio number already belongs to:');
    console.log(`Business: ${existingTwilio.business_name}`);
    console.log(`Roofer ID: ${existingTwilio.id}`);
  } else {
    console.log('OK: Twilio number is not currently assigned');
  }

  console.log('');
  console.log('Writes performed: no');
  console.log('SMS sent: no');
  console.log('Calendar events created: no');
  console.log('Vapi triggered: no');
  console.log('=== Dry Run Complete ===');
}

main().catch((err) => {
  console.error('FAIL: unexpected error');
  console.error(err.message);
  process.exit(1);
});
