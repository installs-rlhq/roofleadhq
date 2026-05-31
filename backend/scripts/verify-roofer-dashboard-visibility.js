#!/usr/bin/env node

require('dotenv').config({ path: '/root/roofleadhq/backend/.env' });

const { createClient } = require('@supabase/supabase-js');

function getArg(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length).trim() : '';
}

async function main() {
  console.log('=== RoofLeadHQ Roofer Dashboard Visibility Check ===');

  const rooferId = getArg('roofer_id');

  if (!rooferId) {
    console.error('FAIL: Missing required input: roofer_id');
    process.exit(1);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('FAIL: Missing Supabase environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: roofer, error } = await supabase
    .from('roofers')
    .select(`
      id,
      business_name,
      owner_email,
      twilio_number,
      timezone,
      service_area,
      status,
      plan,
      calendar_sync_enabled,
      sms_confirmation_enabled
    `)
    .eq('id', rooferId)
    .maybeSingle();

  if (error) {
    console.error('FAIL: Supabase read failed');
    console.error(error.message);
    process.exit(1);
  }

  if (!roofer) {
    console.error('FAIL: Roofer not found');
    process.exit(1);
  }

  const requiredFields = [
  'business_name',
  'owner_email',
  'twilio_number',
  'timezone',
  'status',
  'plan',
];

const missingRequiredFields = requiredFields.filter((field) => !roofer[field]);

if (missingRequiredFields.length > 0) {
  console.error(`FAIL: Missing required dashboard fields: ${missingRequiredFields.join(', ')}`);
  process.exit(1);
}

const warningFields = ['service_area'];
const missingWarningFields = warningFields.filter((field) => !roofer[field]);

if (missingWarningFields.length > 0) {
  console.log(`WARN: Missing recommended dashboard fields: ${missingWarningFields.join(', ')}`);
}

  if (roofer.status !== 'active') {
    console.error(`FAIL: Roofer status is not active: ${roofer.status}`);
    process.exit(1);
  }

  if (roofer.calendar_sync_enabled === true) {
    console.error('FAIL: calendar_sync_enabled is true');
    process.exit(1);
  }

  if (roofer.sms_confirmation_enabled === true) {
    console.error('FAIL: sms_confirmation_enabled is true');
    process.exit(1);
  }

  console.log('');
  console.log('---- Dashboard Visibility Verification ----');
  console.log(`Roofer ID: ${roofer.id}`);
  console.log(`Business: ${roofer.business_name}`);
  console.log(`Owner email: ${roofer.owner_email}`);
  console.log(`Twilio number: ${roofer.twilio_number}`);
  console.log(`Status: ${roofer.status}`);
  console.log(`Plan: ${roofer.plan}`);
  console.log(`Timezone: ${roofer.timezone}`);
  console.log(`Service area: ${roofer.service_area}`);
  console.log(`Calendar sync enabled: ${roofer.calendar_sync_enabled}`);
  console.log(`SMS confirmation enabled: ${roofer.sms_confirmation_enabled}`);
  console.log('Dashboard visibility: pass');
  console.log('Writes performed: no');
  console.log('SMS sent: no');
  console.log('Calendar events created: no');
  console.log('Vapi triggered: no');
  console.log('=== Dashboard Visibility Check Complete ===');
}

main().catch((err) => {
  console.error('FAIL: unexpected error');
  console.error(err.message);
  process.exit(1);
});
