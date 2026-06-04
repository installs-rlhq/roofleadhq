#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const TEST_ROOFER_ID = 'be7efc94-bd68-43af-81b2-dc7b869b42df';
const TEST_PROVIDER = 'test_only_dispatcher_verifier';
const APPROVED_FOLLOW_UP_TYPES = new Set([
  'initial',
  '2h',
  '12h',
  '24h',
  'manual_outreach',
  'manual_outreach_initial',
  'digital_initial',
  'phone_followup',
  'followup_2h',
  'followup_12h',
  'followup_24h',
  'booking_confirmation',
  'appointment_reminder'
]);

console.log('=== RoofLeadHQ SMS Dispatcher DB Live Test Prep Read-Only Verification ===');
console.log('No writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio import or call is made.');
console.log('No route, cron, or production dispatcher is activated.');

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

function getArgValue(flag, argv = process.argv) {
  const index = argv.indexOf(flag);
  if (index === -1) return null;
  return argv[index + 1] || null;
}

function isValidE164(phone) {
  return /^\+[1-9]\d{1,14}$/.test(phone || '');
}

function suggestedRunId(now = new Date()) {
  return `db-live-prep-${now.toISOString().replace(/[:.]/g, '-').replace('Z', 'z')}`;
}

function buildProviderMessageId(runId) {
  return `sms-dispatcher-test-${runId}`;
}

function sortCandidates(left, right) {
  const leftScheduled = new Date(left.scheduled_for).getTime();
  const rightScheduled = new Date(right.scheduled_for).getTime();

  if (leftScheduled !== rightScheduled) {
    return leftScheduled - rightScheduled;
  }

  const leftCreated = left.created_at ? new Date(left.created_at).getTime() : Number.MAX_SAFE_INTEGER;
  const rightCreated = right.created_at ? new Date(right.created_at).getTime() : Number.MAX_SAFE_INTEGER;

  if (leftCreated !== rightCreated) {
    return leftCreated - rightCreated;
  }

  return String(left.id).localeCompare(String(right.id));
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
    { pattern: /\.messages\.create\s*\(/, label: 'Twilio send call' },
    { pattern: /\bapp\.(get|post|put|patch|delete)\s*\(/, label: 'route registration' },
    { pattern: /scheduleJob\s*\(|setInterval\s*\(/i, label: 'cron or scheduler activation' },
    { pattern: /runSmsDispatcher\s*\(|dispatchSms\s*\(|sendSms\s*\(/i, label: 'production dispatcher activation' }
  ];

  for (const check of forbidden) {
    if (check.pattern.test(source)) {
      fail(`Static safety check found forbidden ${check.label}`);
    }
  }

  pass('static safety checks found no writes, Twilio, routes, cron, or dispatcher activation');
}

async function selectExactlyOne(client, table, queryBuilder, label) {
  const { data, error } = await queryBuilder(client.from(table)).limit(2);
  if (error) fail(`${label} lookup failed`, { message: error.message });
  if ((data || []).length !== 1) {
    fail(`${label} count must be exactly one`, { count: (data || []).length });
  }
  return data[0];
}

function createdAtUnavailable(error) {
  return /created_at/i.test(error?.message || '');
}

function followUpSelectColumns(includeCreatedAt) {
  return `
      id,
      roofer_id,
      lead_id,
      status,
      followup_type,
      scheduled_for,
      ${includeCreatedAt ? 'created_at,' : ''}
      sent_at,
      skipped_reason,
      stopped_reason,
      message_body,
      leads(id, roofer_id, phone, status, homeowner_name)
    `;
}

async function fetchScheduledFollowUps(supabase, rooferId) {
  const baseQuery = (includeCreatedAt) => {
    let query = supabase
      .from('follow_ups')
      .select(followUpSelectColumns(includeCreatedAt))
      .eq('roofer_id', rooferId)
      .eq('status', 'scheduled')
      .not('lead_id', 'is', null)
      .order('scheduled_for', { ascending: true });

    if (includeCreatedAt) {
      query = query.order('created_at', { ascending: true });
    }

    return query.limit(50);
  };

  const withCreatedAt = await baseQuery(true);
  if (!withCreatedAt.error) {
    return { data: withCreatedAt.data || [], error: null, createdAtAvailable: true };
  }

  if (!createdAtUnavailable(withCreatedAt.error)) {
    return { data: null, error: withCreatedAt.error, createdAtAvailable: true };
  }

  const withoutCreatedAt = await baseQuery(false);
  return {
    data: withoutCreatedAt.data || [],
    error: withoutCreatedAt.error,
    createdAtAvailable: false
  };
}

async function main() {
  runStaticSafetyChecks();

  if (process.argv.includes('--static-only')) {
    console.log('PASS: static-only read-only prep verification completed.');
    return;
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    fail('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const rooferId = getArgValue('--roofer-id') || process.env.SMS_LIVE_TEST_ROOFER_ID || TEST_ROOFER_ID;
  if (rooferId !== TEST_ROOFER_ID) {
    fail('Only the current verified test roofer is allowed', {
      expected: TEST_ROOFER_ID,
      received: rooferId
    });
  }

  const runId = getArgValue('--run-id') || process.env.SMS_LIVE_TEST_RUN_ID || suggestedRunId();
  const now = new Date().toISOString();
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const roofer = await selectExactlyOne(
    supabase,
    'roofers',
    (query) => query
      .select('id,business_name,status,sms_confirmation_enabled,timezone,twilio_number')
      .eq('id', rooferId),
    'test roofer'
  );
  pass('known test roofer resolved exactly once');

  const { data: rows, error, createdAtAvailable } = await fetchScheduledFollowUps(supabase, rooferId);

  if (error) fail('scheduled follow_ups lookup failed', { message: error.message });
  console.log(`created_at ordering available: ${createdAtAvailable}`);

  const candidates = [];
  const rejected = [];

  for (const row of rows || []) {
    const lead = row.leads;
    const reasons = [];

    if (!row.id) reasons.push('missing_follow_up_id');
    if (!row.lead_id) reasons.push('missing_follow_up_lead_id');
    if (row.roofer_id !== rooferId) reasons.push('follow_up_roofer_mismatch');
    if (row.status !== 'scheduled') reasons.push('follow_up_not_scheduled');
    if (row.sent_at !== null) reasons.push('follow_up_sent_at_not_null');
    if (row.skipped_reason !== null) reasons.push('follow_up_skipped_reason_not_null');
    if (row.stopped_reason !== null) reasons.push('follow_up_stopped_reason_not_null');
    if (!row.scheduled_for) reasons.push('missing_scheduled_for');
    if (!APPROVED_FOLLOW_UP_TYPES.has(row.followup_type)) reasons.push('follow_up_type_not_approved');
    if (!lead) reasons.push('missing_lead_relation');
    if (lead && lead.id !== row.lead_id) reasons.push('lead_id_relation_mismatch');
    if (lead && lead.roofer_id !== rooferId) reasons.push('lead_roofer_mismatch');
    if (lead && !isValidE164(lead.phone)) reasons.push('lead_phone_not_e164');
    if (lead && ['opted_out', 'booked', 'cancelled', 'lost'].includes(lead.status)) {
      reasons.push(`lead_status_blocked_${lead.status}`);
    }

    if (reasons.length === 0) {
      candidates.push(row);
    } else {
      rejected.push({ follow_up_id: row.id, lead_id: row.lead_id, reasons });
    }
  }

  console.log(`Scheduled follow-ups inspected for test roofer: ${(rows || []).length}`);
  console.log(`Safe candidates after filters: ${candidates.length}`);

  if (rejected.length > 0) {
    console.log('Rejected scheduled follow-ups:');
    for (const row of rejected) {
      console.log(JSON.stringify(row));
    }
  }

  if (candidates.length < 1) {
    fail('Must select exactly one deterministic candidate, but no safe candidates were found', {
      safe_candidate_count: candidates.length,
      inspected_scheduled_follow_up_count: (rows || []).length
    });
  }

  candidates.sort(sortCandidates);
  const candidate = candidates[0];
  const lead = candidate.leads;
  pass('selected exactly one deterministic safe candidate follow_up');

  const duplicateProviderMessageId = buildProviderMessageId(runId);
  const { data: duplicateMessages, error: duplicateError } = await supabase
    .from('messages')
    .select('id,roofer_id,lead_id,provider,provider_message_id,status,sent_at')
    .eq('roofer_id', rooferId)
    .eq('lead_id', lead.id)
    .eq('provider', TEST_PROVIDER)
    .eq('provider_message_id', duplicateProviderMessageId)
    .limit(2);

  if (duplicateError) fail('duplicate verifier message lookup failed', { message: duplicateError.message });
  if ((duplicateMessages || []).length !== 0) {
    fail('Suggested run id already has a duplicate verifier message', {
      run_id: runId,
      provider_message_id: duplicateProviderMessageId,
      duplicate_count: duplicateMessages.length
    });
  }
  pass('suggested run id has no duplicate verifier message');

  console.log('=== CANDIDATE ===');
  console.log(JSON.stringify({
    roofer: {
      id: roofer.id,
      business_name: roofer.business_name,
      status: roofer.status,
      sms_confirmation_enabled: roofer.sms_confirmation_enabled,
      timezone: roofer.timezone,
      has_twilio_number: Boolean(roofer.twilio_number)
    },
    lead: {
      id: lead.id,
      status: lead.status,
      has_phone: Boolean(lead.phone)
    },
    follow_up: {
      id: candidate.id,
      status: candidate.status,
      followup_type: candidate.followup_type,
      scheduled_for: candidate.scheduled_for,
      created_at: candidate.created_at || null,
      sent_at: candidate.sent_at,
      skipped_reason: candidate.skipped_reason,
      stopped_reason: candidate.stopped_reason
    },
    selection: {
      inspected_scheduled_follow_up_count: (rows || []).length,
      safe_candidate_count: candidates.length,
      created_at_ordering_available: createdAtAvailable,
      selected_reason: 'earliest scheduled_for ascending, then earliest created_at ascending when available, then id ascending',
      selected_first_after_deterministic_sort: true
    },
    verifier_duplicate_check: {
      provider: TEST_PROVIDER,
      provider_message_id: duplicateProviderMessageId,
      duplicate_count: 0
    },
    inspected_at: now
  }, null, 2));

  console.log('=== TERMINAL 1 EXPORTS FOR EXISTING GATED VERIFIER ===');
  console.log(`export SMS_LIVE_TEST_ROOFER_ID=${rooferId}`);
  console.log(`export SMS_LIVE_TEST_LEAD_ID=${lead.id}`);
  console.log(`export SMS_LIVE_TEST_FOLLOW_UP_ID=${candidate.id}`);
  console.log(`export SMS_LIVE_TEST_RUN_ID=${runId}`);
  console.log('PASS: read-only live test prep verification completed.');
}

main().catch((error) => {
  fail('Unexpected read-only prep failure', { message: error.message });
});
