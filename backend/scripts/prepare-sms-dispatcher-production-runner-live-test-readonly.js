#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const TEST_ROOFER_ID = 'be7efc94-bd68-43af-81b2-dc7b869b42df';
const PRODUCTION_RUNNER_TARGET = 'sms_dispatcher_production_runner';
const DB_EXECUTOR_TARGET = 'sms_dispatcher_db_executor';
const MAX_BATCH_SIZE = 1;
const BLOCKED_LEAD_STATUSES = new Set(['opted_out', 'booked', 'cancelled', 'lost']);
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

console.log('=== RoofLeadHQ Production Dispatcher Runner Live Test Prep Read-Only ===');
console.log('No writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio import or call is made.');
console.log('No route, cron, scheduler, or production dispatcher auto-start is activated.');

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
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
  return `production-runner-live-prep-${now.toISOString().replace(/[:.]/g, '-').replace('Z', 'z')}`;
}

function buildProviderTestId(runId) {
  return `sms-dispatcher-production-runner-test-${runId}`;
}

function sortCandidates(left, right) {
  const leftScheduled = new Date(left.scheduled_for).getTime();
  const rightScheduled = new Date(right.scheduled_for).getTime();

  if (leftScheduled !== rightScheduled) return leftScheduled - rightScheduled;

  const leftCreated = left.created_at ? new Date(left.created_at).getTime() : Number.MAX_SAFE_INTEGER;
  const rightCreated = right.created_at ? new Date(right.created_at).getTime() : Number.MAX_SAFE_INTEGER;

  if (leftCreated !== rightCreated) return leftCreated - rightCreated;

  return String(left.id).localeCompare(String(right.id));
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
      leads(id, roofer_id, phone, status, homeowner_name),
      roofers(id, business_name, status, sms_confirmation_enabled, timezone, twilio_number)
    `;
}

function runStaticSafetyChecks() {
  const source = fs.readFileSync(__filename, 'utf8');
  const twilioImportPattern = new RegExp("require\\(['\"]" + 'twilio' + "['\"]\\)|from ['\"]" + 'twilio' + "['\"]");
  const twilioClientPattern = new RegExp('new ' + 'Twilio|' + 'twilio' + '\\(', 'i');
  const productionRunnerPattern = new RegExp('executeSmsDispatcher' + 'ProductionRunner\\s*\\(');
  const forbidden = [
    { pattern: /\.insert\s*\(/, label: 'Supabase insert call' },
    { pattern: /\.update\s*\(/, label: 'Supabase update call' },
    { pattern: /\.upsert\s*\(/, label: 'Supabase upsert call' },
    { pattern: /\.delete\s*\(/, label: 'Supabase delete call' },
    { pattern: /\.rpc\s*\(/, label: 'Supabase RPC call' },
    { pattern: twilioImportPattern, label: 'Twilio import' },
    { pattern: twilioClientPattern, label: 'Twilio client usage' },
    { pattern: /\.messages\.create\s*\(/, label: 'SMS provider send call' },
    { pattern: /\bapp\.(get|post|put|patch|delete)\s*\(/, label: 'route registration' },
    { pattern: /scheduleJob\s*\(|setInterval\s*\(|cron\s*\./i, label: 'cron or scheduler activation' },
    { pattern: productionRunnerPattern, label: 'production runner invocation' },
    { pattern: /runProductionSmsDispatcher\s*\(/i, label: 'production dispatcher auto-start' }
  ];

  for (const check of forbidden) {
    if (check.pattern.test(source)) {
      fail(`Static safety check found forbidden ${check.label}`);
    }
  }

  pass('static safety checks found no writes, Twilio, SMS send, routes, cron, or production auto-start');
}

async function selectExactlyOne(client, table, queryBuilder, label) {
  const { data, error } = await queryBuilder(client.from(table)).limit(2);
  if (error) fail(`${label} lookup failed`, { message: error.message });
  if ((data || []).length !== 1) {
    fail(`${label} count must be exactly one`, { count: (data || []).length });
  }
  return data[0];
}

async function fetchDueFollowUps(supabase, rooferId, now) {
  const baseQuery = (includeCreatedAt) => {
    let query = supabase
      .from('follow_ups')
      .select(followUpSelectColumns(includeCreatedAt))
      .eq('roofer_id', rooferId)
      .eq('status', 'scheduled')
      .lte('scheduled_for', now)
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

async function findDuplicateByBody(supabase, candidate) {
  return supabase
    .from('messages')
    .select('id,roofer_id,lead_id,channel,direction,message_body,provider_message_id')
    .eq('roofer_id', candidate.roofer_id)
    .eq('lead_id', candidate.lead_id)
    .eq('channel', 'sms')
    .eq('direction', 'outbound')
    .eq('message_body', candidate.message_body)
    .limit(2);
}

async function findDuplicateByProviderTestId(supabase, candidate, providerTestId) {
  return supabase
    .from('messages')
    .select('id,roofer_id,lead_id,channel,direction,message_body,provider_message_id')
    .eq('roofer_id', candidate.roofer_id)
    .eq('lead_id', candidate.lead_id)
    .eq('provider_message_id', providerTestId)
    .limit(2);
}

function validateRoofer(roofer) {
  const reasons = [];
  if (roofer.id !== TEST_ROOFER_ID) reasons.push('roofer_id_mismatch');
  if (roofer.sms_confirmation_enabled !== true) reasons.push('sms_confirmation_enabled_not_true');
  if (Object.prototype.hasOwnProperty.call(roofer, 'status') && roofer.status !== 'active') {
    reasons.push(`roofer_status_not_active_${roofer.status}`);
  }
  return reasons;
}

function candidateRejectionReasons(row, rooferId) {
  const lead = row.leads;
  const roofer = row.roofers;
  const reasons = [];

  if (!row.id) reasons.push('missing_follow_up_id');
  if (row.roofer_id !== rooferId) reasons.push('follow_up_roofer_mismatch');
  if (!row.lead_id) reasons.push('missing_follow_up_lead_id');
  if (row.status !== 'scheduled') reasons.push('follow_up_not_scheduled');
  if (row.sent_at !== null) reasons.push('follow_up_sent_at_not_null');
  if (row.skipped_reason !== null) reasons.push('follow_up_skipped_reason_not_null');
  if (row.stopped_reason !== null) reasons.push('follow_up_stopped_reason_not_null');
  if (!row.scheduled_for) reasons.push('missing_scheduled_for');
  if (!APPROVED_FOLLOW_UP_TYPES.has(row.followup_type)) reasons.push('follow_up_type_not_approved');
  if (!row.message_body) reasons.push('missing_message_body_for_duplicate_scope');
  if (!lead) reasons.push('missing_lead_relation');
  if (lead && lead.id !== row.lead_id) reasons.push('lead_id_relation_mismatch');
  if (lead && lead.roofer_id !== rooferId) reasons.push('lead_roofer_mismatch');
  if (lead && !isValidE164(lead.phone)) reasons.push('lead_phone_not_e164');
  if (lead && BLOCKED_LEAD_STATUSES.has(lead.status)) reasons.push(`lead_status_blocked_${lead.status}`);
  if (!roofer) reasons.push('missing_roofer_relation');
  if (roofer && roofer.id !== rooferId) reasons.push('roofer_relation_mismatch');
  if (roofer && roofer.sms_confirmation_enabled !== true) reasons.push('roofer_sms_confirmation_not_enabled');

  return reasons;
}

async function main() {
  runStaticSafetyChecks();

  if (process.argv.includes('--static-only')) {
    console.log('PASS: static-only read-only production runner prep verification completed.');
    return;
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    fail('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const rooferId = getArgValue('--roofer-id') || process.env.SMS_DISPATCHER_PRODUCTION_ALLOWED_ROOFER_IDS || TEST_ROOFER_ID;
  if (rooferId !== TEST_ROOFER_ID) {
    fail('Only the current verified test roofer is allowed', {
      expected: TEST_ROOFER_ID,
      received: rooferId
    });
  }

  const now = new Date().toISOString();
  const runId = getArgValue('--run-id') || process.env.SMS_DISPATCHER_PRODUCTION_LIVE_TEST_RUN_ID || suggestedRunId();
  const providerTestId = buildProviderTestId(runId);
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

  const roofer = await selectExactlyOne(
    supabase,
    'roofers',
    (query) => query
      .select('id,business_name,status,sms_confirmation_enabled,timezone,twilio_number')
      .eq('id', rooferId),
    'known test roofer'
  );
  pass('known test roofer resolved exactly once');

  const rooferRejections = validateRoofer(roofer);
  if (rooferRejections.length > 0) {
    fail('Known test roofer is not eligible for production runner live prep', {
      roofer_id: roofer.id,
      reasons: rooferRejections
    });
  }
  pass('known test roofer SMS/status metadata is eligible');

  const { data: rows, error, createdAtAvailable } = await fetchDueFollowUps(supabase, rooferId, now);
  if (error) fail('due scheduled follow_ups lookup failed', { message: error.message });

  const candidates = [];
  const rejected = [];

  for (const row of rows || []) {
    const reasons = candidateRejectionReasons(row, rooferId);

    if (reasons.length === 0) {
      candidates.push(row);
    } else {
      rejected.push({ follow_up_id: row.id, lead_id: row.lead_id, reasons });
    }
  }

  console.log(`Due scheduled follow-ups inspected for test roofer: ${(rows || []).length}`);
  console.log(`Safe candidates after filters: ${candidates.length}`);
  console.log(`created_at ordering available: ${createdAtAvailable}`);

  if (rejected.length > 0) {
    console.log('Rejected due scheduled follow-ups:');
    for (const row of rejected) console.log(JSON.stringify(row));
  }

  if (candidates.length < 1) {
    fail('Must select exactly one deterministic candidate, but no safe candidates were found', {
      inspected_due_follow_up_count: (rows || []).length,
      safe_candidate_count: candidates.length
    });
  }

  candidates.sort(sortCandidates);
  const candidate = candidates[0];
  const lead = candidate.leads;
  pass('selected exactly one deterministic safe candidate follow_up');

  const duplicateByBody = await findDuplicateByBody(supabase, candidate);
  if (duplicateByBody.error) {
    fail('duplicate message body lookup failed', { message: duplicateByBody.error.message });
  }

  const duplicateByProviderTestId = await findDuplicateByProviderTestId(supabase, candidate, providerTestId);
  if (duplicateByProviderTestId.error) {
    fail('duplicate provider test id lookup failed', { message: duplicateByProviderTestId.error.message });
  }

  const duplicateBodyCount = (duplicateByBody.data || []).length;
  const duplicateProviderTestIdCount = (duplicateByProviderTestId.data || []).length;

  if (duplicateBodyCount > 0 || duplicateProviderTestIdCount > 0) {
    fail('Duplicate protection scope is not clean for selected candidate', {
      duplicate_body_count: duplicateBodyCount,
      duplicate_provider_test_id_count: duplicateProviderTestIdCount,
      provider_test_id: providerTestId
    });
  }
  pass('duplicate protection scope is clean for selected candidate');

  console.log('=== SELECTED PRODUCTION RUNNER LIVE TEST CANDIDATE ===');
  console.log(JSON.stringify({
    roofer: {
      id: roofer.id,
      business_name: roofer.business_name,
      status: roofer.status,
      sms_confirmation_enabled: roofer.sms_confirmation_enabled,
      timezone: roofer.timezone,
      has_twilio_number_metadata: Boolean(roofer.twilio_number)
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
      stopped_reason: candidate.stopped_reason,
      has_message_body: Boolean(candidate.message_body)
    },
    selection: {
      inspected_due_follow_up_count: (rows || []).length,
      safe_candidate_count: candidates.length,
      selected_reason: 'earliest scheduled_for ascending, then earliest created_at ascending when available, then id ascending',
      created_at_ordering_available: createdAtAvailable,
      selected_first_after_deterministic_sort: true
    },
    duplicate_scope: {
      message_body_duplicate_count: duplicateBodyCount,
      provider_test_id: providerTestId,
      provider_test_id_duplicate_count: duplicateProviderTestIdCount
    },
    inspected_at: now
  }, null, 2));

  console.log('=== FUTURE PRODUCTION RUNNER LIVE TEST ENV ===');
  console.log('export SMS_DISPATCHER_PRODUCTION_USE_LIVE_SUPABASE=true');
  console.log('export SMS_DISPATCHER_PRODUCTION_RUNNER=true');
  console.log(`export SMS_DISPATCHER_PRODUCTION_TARGET=${PRODUCTION_RUNNER_TARGET}`);
  console.log(`export SMS_DISPATCHER_PRODUCTION_ALLOWED_ROOFER_IDS=${TEST_ROOFER_ID}`);
  console.log(`export SMS_DISPATCHER_PRODUCTION_APPROVED_FOLLOW_UP_ID=${candidate.id}`);
  console.log(`export SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE=${MAX_BATCH_SIZE}`);
  console.log(`export SMS_DISPATCHER_PRODUCTION_LIVE_TEST_RUN_ID=${runId}`);
  console.log('export SMS_DISPATCHER_DB_EXECUTOR_WRITE=true');
  console.log(`export SMS_DB_EXECUTOR_TARGET=${DB_EXECUTOR_TARGET}`);
  console.log('export SMS_DB_EXECUTOR_CONFIRM_WRITE_PLAN=true');

  console.log('=== FUTURE PRODUCTION RUNNER LIVE TEST COMMAND - DO NOT RUN WITHOUT APPROVAL ===');
  console.log('node backend/scripts/run-sms-dispatcher-production-runner.js \\');
  console.log('  --allow-live-supabase-production-runner \\');
  console.log('  --production-runner \\');
  console.log(`  --approved-follow-up-id ${candidate.id}`);
  console.log('PASS: read-only production runner live test prep completed.');
}

main().catch((error) => {
  fail('Unexpected read-only production runner prep failure', { message: error.message });
});
