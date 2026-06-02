#!/usr/bin/env node

require('dotenv').config({ path: '/root/roofleadhq/backend/.env' });

const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

function getArg(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((item) => item.startsWith(prefix));
  return arg ? arg.slice(prefix.length).trim() : '';
}

function isE164(value) {
  return /^\+[1-9]\d{7,14}$/.test(value);
}

function splitName(fullName) {
  const parts = fullName.trim().split(/\s+/);
  return {
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
  };
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function createDashboardToken() {
  return `rlhq_dash_${crypto.randomBytes(32).toString('hex')}`;
}

function hashDashboardToken(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

async function main() {
  console.log('=== RoofLeadHQ Roofer Onboarding Write Script ===');

  const confirmWrite = getArg('confirm_write');

  const required = {
    business_name: getArg('business_name'),
    owner_full_name: getArg('owner_full_name'),
    owner_email: getArg('owner_email'),
    owner_cell_phone: getArg('owner_cell_phone'),
    business_phone: getArg('business_phone'),
    twilio_number: getArg('twilio_number'),
    timezone: getArg('timezone'),
    service_area: getArg('service_area'),
    city: getArg('city'),
    state: getArg('state'),
  };

  const missing = Object.entries(required)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    console.error(`FAIL: Missing required inputs: ${missing.join(', ')}`);
    process.exit(1);
  }

  if (!isE164(required.owner_cell_phone)) {
    console.error('FAIL: owner_cell_phone must be E.164, example +15125551234');
    process.exit(1);
  }

  if (!isE164(required.business_phone)) {
    console.error('FAIL: business_phone must be E.164, example +15125551234');
    process.exit(1);
  }

  if (!isE164(required.twilio_number)) {
    console.error('FAIL: twilio_number must be E.164, example +15125551234');
    process.exit(1);
  }

  if (confirmWrite !== 'true') {
    console.error('Dry-run only. Add --confirm_write=true to create the roofer.');
    process.exit(1);
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('FAIL: Missing Supabase environment variables');
    process.exit(1);
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey);

  const { data: existingTwilio, error: twilioCheckError } = await supabase
    .from('roofers')
    .select('id,business_name,twilio_number')
    .eq('twilio_number', required.twilio_number)
    .maybeSingle();

  if (twilioCheckError) {
    console.error('FAIL: Could not check existing Twilio number');
    console.error(twilioCheckError.message);
    process.exit(1);
  }

  if (existingTwilio) {
    console.error('FAIL: Twilio number already belongs to:');
    console.error(`Business: ${existingTwilio.business_name}`);
    console.error(`Roofer ID: ${existingTwilio.id}`);
    process.exit(1);
  }

    const { data: existingEmail, error: emailCheckError } = await supabase
    .from('roofers')
    .select('id,business_name,owner_email')
    .eq('owner_email', required.owner_email)
    .maybeSingle();

  if (emailCheckError) {
    console.error('FAIL: Could not check existing owner email');
    console.error(emailCheckError.message);
    process.exit(1);
  }

  if (existingEmail) {
    console.error('FAIL: Owner email already belongs to:');
    console.error(`Business: ${existingEmail.business_name}`);
    console.error(`Roofer ID: ${existingEmail.id}`);
    process.exit(1);
  }

  const { data: existingBusiness, error: businessCheckError } = await supabase
    .from('roofers')
    .select('id,business_name,owner_email')
    .eq('business_name', required.business_name)
    .maybeSingle();

  if (businessCheckError) {
    console.error('FAIL: Could not check existing business name');
    console.error(businessCheckError.message);
    process.exit(1);
  }

  if (existingBusiness) {
    console.error('FAIL: Business name already exists:');
    console.error(`Business: ${existingBusiness.business_name}`);
    console.error(`Owner email: ${existingBusiness.owner_email}`);
    console.error(`Roofer ID: ${existingBusiness.id}`);
    process.exit(1);
  }
  
  const { firstName, lastName } = splitName(required.owner_full_name);
  const dashboardToken = createDashboardToken();
  const dashboardSlug = slugify(required.business_name);
  const now = new Date().toISOString();

  const { data: existingSlug, error: slugCheckError } = await supabase
    .from('roofers')
    .select('id,business_name,dashboard_slug')
    .eq('dashboard_slug', dashboardSlug)
    .maybeSingle();

  if (slugCheckError) {
    console.error('FAIL: Could not check existing dashboard slug');
    console.error(slugCheckError.message);
    process.exit(1);
  }

  if (existingSlug) {
    console.error('FAIL: Dashboard slug already belongs to:');
    console.error(`Business: ${existingSlug.business_name}`);
    console.error(`Roofer ID: ${existingSlug.id}`);
    console.error(`Dashboard slug: ${existingSlug.dashboard_slug}`);
    process.exit(1);
  }

  const payload = {
    business_name: required.business_name,
    owner_full_name: required.owner_full_name,
    owner_first_name: firstName,
    owner_last_name: lastName,
    owner_email: required.owner_email,
    owner_cell_phone: required.owner_cell_phone,
    business_phone: required.business_phone,
    twilio_number: required.twilio_number,
    timezone: required.timezone,
    service_area: required.service_area,
    city: required.city,
    state: required.state,
    status: 'active',
    plan: 'starter',
    calendar_sync_enabled: false,
    sms_confirmation_enabled: false,
    twilio_number_purchased: false,
    confidence_promise_enabled: true,
    lead_volume_limit: 100,
    dashboard_access_token_hash: hashDashboardToken(dashboardToken),
    dashboard_access_enabled: true,
    dashboard_slug: dashboardSlug,
    dashboard_token_created_at: now,
    dashboard_token_last_rotated_at: now,
    notes: 'Created by backend/scripts/onboard-roofer.js',
  };

  console.log('');
  console.log('---- Creating Roofer ----');
  console.log(`Business: ${payload.business_name}`);
  console.log(`Owner: ${payload.owner_full_name}`);
  console.log(`Email: ${payload.owner_email}`);
  console.log(`Owner cell phone: ${payload.owner_cell_phone}`);
  console.log(`Business phone: ${payload.business_phone}`);
  console.log(`Twilio number: ${payload.twilio_number}`);
  console.log(`Timezone: ${payload.timezone}`);
  console.log(`Service area: ${payload.service_area}`);
  console.log(`Calendar sync enabled: ${payload.calendar_sync_enabled}`);
  console.log(`SMS confirmation enabled: ${payload.sms_confirmation_enabled}`);

  const { data: created, error: insertError } = await supabase
    .from('roofers')
    .insert(payload)
    .select('id,business_name,owner_email,twilio_number,timezone,service_area,calendar_sync_enabled,sms_confirmation_enabled,status,plan,dashboard_access_enabled,dashboard_slug')
    .single();

  if (insertError) {
    console.error('FAIL: Supabase insert failed');
    console.error(insertError.message);
    process.exit(1);
  }

  console.log('');
  console.log('---- Created Roofer Verification ----');
  console.log(`Roofer ID: ${created.id}`);
  console.log(`Business: ${created.business_name}`);
  console.log(`Owner email: ${created.owner_email}`);
  console.log(`Twilio number: ${created.twilio_number}`);
  console.log(`Timezone: ${created.timezone}`);
  console.log(`Service area: ${created.service_area}`);
  console.log(`Calendar sync enabled: ${created.calendar_sync_enabled}`);
  console.log(`SMS confirmation enabled: ${created.sms_confirmation_enabled}`);
  console.log(`Status: ${created.status}`);
  console.log(`Plan: ${created.plan}`);
  console.log(`Dashboard access enabled: ${created.dashboard_access_enabled}`);
  console.log(`Dashboard slug: ${created.dashboard_slug}`);

  console.log('');
  console.log('---- Dashboard Access Token ----');
  console.log('SAVE THIS TOKEN PRIVATELY. It will not be shown again.');
  console.log(dashboardToken);

  console.log('');
  console.log('Writes performed: yes');
  console.log('SMS sent: no');
  console.log('Calendar events created: no');
  console.log('Vapi triggered: no');
  console.log('=== Roofer Onboarding Complete ===');
}

main().catch((err) => {
  console.error('FAIL: unexpected error');
  console.error(err.message);
  process.exit(1);
});
