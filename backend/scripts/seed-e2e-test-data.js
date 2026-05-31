#!/usr/bin/env node

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { createClient } = require('@supabase/supabase-js');

const CONFIRM = process.argv.includes('--confirm_write=true');

if (!CONFIRM) {
  console.log('Dry-run only. Add --confirm_write=true to create E2E test data.');
  console.log('Writes performed: no');
  console.log('SMS sent: no');
  console.log('Calendar events created: no');
  console.log('Vapi triggered: no');
  process.exit(0);
}

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const ROOFER_ID = 'be7efc94-bd68-43af-81b2-dc7b869b42df';
const NOW = new Date();
const iso = (minutesOffset = 0) => new Date(NOW.getTime() + minutesOffset * 60000).toISOString();
const runId = `e2e-${Date.now()}`;

async function insertOrFail(table, payload) {
  const { data, error } = await supabase.from(table).insert(payload).select('*').single();
  if (error) {
    console.error(`FAIL inserting ${table}:`, error);
    process.exit(1);
  }
  return data;
}

(async () => {
  console.log('=== RoofLeadHQ E2E Test Data Seed ===');

  const { data: roofer, error: rooferError } = await supabase
    .from('roofers')
    .select('id,business_name,owner_email,twilio_number,calendar_sync_enabled,sms_confirmation_enabled')
    .eq('id', ROOFER_ID)
    .single();

  if (rooferError) {
    console.error('FAIL loading roofer:', rooferError);
    process.exit(1);
  }

  console.log('---- Roofer ----');
  console.log(JSON.stringify(roofer, null, 2));

  if (roofer.calendar_sync_enabled !== false || roofer.sms_confirmation_enabled !== false) {
    console.error('FAIL: Calendar/SMS flags must remain disabled.');
    process.exit(1);
  }

  const lead1 = await insertOrFail('leads', {
    roofer_id: ROOFER_ID,
    source_path: 'digital',
    source_detail: 'website_form',
    date_received: iso(-180),
    homeowner_name: 'E2E Website Lead',
    phone: '+15550100001',
    email: 'website-lead@example.com',
    address: '101 Demo Roof Ave, Austin, TX',
    issue_description: 'Homeowner submitted website form for roof leak inspection.',
    urgency: 'normal',
    insurance_claim: false,
    status: 'contacted',
    is_eligible: true,
    service_area_match: true,
    owner_notified: false,
    reminder_sent: false,
    created_at: iso(-180),
    updated_at: iso(-170)
  });

  const lead2 = await insertOrFail('leads', {
    roofer_id: ROOFER_ID,
    source_path: 'manual',
    source_detail: 'angi',
    date_received: iso(-120),
    homeowner_name: 'E2E Manual Outreach Lead',
    phone: '+15550100002',
    email: null,
    address: '202 Manual Lead St, Austin, TX',
    issue_description: 'Angi lead manually entered for storm damage estimate.',
    urgency: 'normal',
    insurance_claim: true,
    status: 'needs_attention',
    is_eligible: true,
    service_area_match: true,
    owner_notified: false,
    reminder_sent: false,
    created_at: iso(-120),
    updated_at: iso(-90)
  });

  const lead3 = await insertOrFail('leads', {
    roofer_id: ROOFER_ID,
    source_path: 'phone',
    source_detail: 'vapi',
    date_received: iso(-90),
    homeowner_name: 'E2E Phone Booked Lead',
    phone: '+15550100003',
    email: 'phone-booked@example.com',
    address: '303 Vapi Call Rd, Austin, TX',
    issue_description: 'Homeowner called about hail damage and requested inspection.',
    urgency: 'high',
    insurance_claim: true,
    status: 'booked',
    appointment_type: 'site_visit',
    appointment_date: iso(1440),
    is_eligible: true,
    service_area_match: true,
    owner_notified: false,
    reminder_sent: false,
    created_at: iso(-90),
    updated_at: iso(-60)
  });

  const lead4 = await insertOrFail('leads', {
    roofer_id: ROOFER_ID,
    source_path: 'phone',
    source_detail: 'vapi',
    date_received: iso(-60),
    homeowner_name: 'E2E Phone Callback Lead',
    phone: '+15550100004',
    email: null,
    address: '404 Callback Ct, Austin, TX',
    issue_description: 'Homeowner called after hours and requested a callback.',
    urgency: 'normal',
    insurance_claim: null,
    status: 'needs_attention',
    is_eligible: true,
    service_area_match: true,
    owner_notified: false,
    reminder_sent: false,
    created_at: iso(-60),
    updated_at: iso(-30)
  });

  await insertOrFail('messages', {
    roofer_id: ROOFER_ID,
    lead_id: lead1.id,
    direction: 'outbound',
    channel: 'sms',
    from_number: roofer.twilio_number,
    to_number: lead1.phone,
    message_body: 'Hi, this is Test Roofing. We received your roofing request and can help schedule an inspection.',
    provider: 'test_seed',
    status: 'sent',
    sent_at: iso(-165),
    created_at: iso(-165)
  });

  await insertOrFail('messages', {
    roofer_id: ROOFER_ID,
    lead_id: lead2.id,
    direction: 'inbound',
    channel: 'sms',
    from_number: '+15127123200',
    to_number: roofer.twilio_number,
    message_body: '+15550100002 Angi',
    provider: 'test_seed',
    status: 'received',
    received_at: iso(-120),
    created_at: iso(-120)
  });

  await insertOrFail('calls', {
    roofer_id: ROOFER_ID,
    lead_id: lead3.id,
    provider: 'vapi',
    provider_call_id: `${runId}-booked-call`,
    caller_phone: lead3.phone,
    call_started_at: iso(-90),
    call_ended_at: iso(-84),
    duration_seconds: 360,
    transcript: 'E2E test transcript. Homeowner requested hail damage inspection.',
    summary: 'Homeowner reported hail damage and booked a roof inspection.',
    outcome: 'qualified',
    appointment_requested: true,
    appointment_booked: true,
    raw_payload: { test: true, source: 'seed-e2e-test-data', run_id: runId },
    created_at: iso(-84),
    updated_at: iso(-84)
  });

  await insertOrFail('calls', {
    roofer_id: ROOFER_ID,
    lead_id: lead4.id,
    provider: 'vapi',
    provider_call_id: `${runId}-callback-call`,
    caller_phone: lead4.phone,
    call_started_at: iso(-60),
    call_ended_at: iso(-56),
    duration_seconds: 240,
    transcript: 'E2E test transcript. Homeowner asked for callback.',
    summary: 'Homeowner requested a callback before scheduling.',
    outcome: 'callback_requested',
    appointment_requested: false,
    appointment_booked: false,
    raw_payload: { test: true, source: 'seed-e2e-test-data', run_id: runId },
    created_at: iso(-56),
    updated_at: iso(-56)
  });

  await insertOrFail('bookings', {
    roofer_id: ROOFER_ID,
    lead_id: lead3.id,
    appointment_type: 'site_visit',
    booked_time: iso(1440),
    calendar_event_id: null,
    calendar_provider: 'test',
    status: 'scheduled',
    is_qualified: true,
    qualification_status: 'qualified',
    qualification_reason: 'E2E test homeowner is in service area and requested inspection.',
    counts_toward_confidence_promise: true,
    notes: 'E2E test booking. No calendar event created.',
    calendar_sync_status: 'pending',
    sms_confirmation_status: 'pending',
    created_at: iso(-55),
    updated_at: iso(-55)
  });

  for (const lead of [lead1, lead2, lead4]) {
    await insertOrFail('follow_ups', {
      roofer_id: ROOFER_ID,
      lead_id: lead.id,
      followup_type: '2h',
      scheduled_for: iso(120),
      status: 'scheduled',
      message_body: 'Just following up on your roofing request. Would you like to schedule an inspection?',
      attempt_number: 1,
      created_at: iso(),
      updated_at: iso()
    });
  }

  for (const lead of [lead1, lead2, lead3, lead4]) {
    await insertOrFail('workflow_events', {
      roofer_id: ROOFER_ID,
      lead_id: lead.id,
      event_type: 'lead_created',
      event_source: 'seed_e2e_test_data',
      event_status: 'success',
      description: `E2E test lead created from ${lead.source_path}/${lead.source_detail}`,
      metadata: {
        test: true,
        run_id: runId,
        source_path: lead.source_path,
        source_detail: lead.source_detail
      },
      created_at: iso()
    });
  }

  console.log('---- Created Leads ----');
  console.log(JSON.stringify([lead1.id, lead2.id, lead3.id, lead4.id], null, 2));

  console.log('Writes performed: yes');
  console.log('SMS sent: no');
  console.log('Calendar events created: no');
  console.log('Vapi triggered: no');
  console.log('=== E2E Test Data Seed Complete ===');
})();
