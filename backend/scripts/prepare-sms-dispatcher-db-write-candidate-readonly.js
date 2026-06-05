#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const TEST_PROVIDER = 'test_only_dispatcher_verifier';
const LIVE_WRITE_TARGET = 'messages_follow_ups';

console.log('=== RoofLeadHQ SMS Dispatcher DB Write Candidate Read-Only Verification ===');
console.log('No Supabase writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio import or call is made.');
console.log('No route, cron, scheduler, or dispatcher activation is added.');

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

function suggestedRunId(now = new Date()) {
  return `db-write-candidate-${now.toISOString().replace(/[:.]/g, '-').replace('Z', 'z')}`;
}

function buildProviderMessageId(runId) {
  return `sms-dispatcher-test-${runId}`;
}

function hasTestOnlySkippedReason(value) {
  return typeof value === 'string' && value.startsWith('test_only_sms_dispatcher_');
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
    { pattern: /new\s+Twilio|twilio\s*\(/i, label: 'Twilio client call' },
    { pattern: /\.messages\.create\s*\(/, label: 'SMS send call' },
    { pattern: /\bapp\.(get|post|put|patch|delete)\s*\(/, label: 'route registration' },
    { pattern: /scheduleJob\s*\(|setInterval\s*\(|setTimeout\s*\(|cron\s*\./i, label: 'cron or scheduler activation' },
    { pattern: /runSmsDispatcher\s*\(|executeSmsDispatcher\s*\(|dispatchSms\s*\(|sendSms\s*\(|startSmsDispatcher\s*\(/i, label: 'dispatcher activation' }
  ];

  for (const check of forbidden) {
    if (check.pattern.test(source)) {
      fail(`Static safety check found forbidden ${check.label}`);
    }
  }

  pass('static safety checks found no writes, Twilio, SMS send, routes, cron, scheduler, or dispatcher activation');
}

async function selectRows(query, label, limit) {
  const { data, error } = await query.limit(limit);
  if (error) fail(`${label} lookup failed`, { message: error.message });
  return data || [];
}

async function selectAtMostTwo(query, label) {
  return selectRows(query, label, 2);
}

async function selectExactlyOne(query, label) {
  const rows = await selectAtMostTwo(query, label);
  if (rows.length !== 1) {
    fail(`${label} must exist exactly once`, { count: rows.length });
  }
  return rows[0];
}

function validateFollowUpShape(row, expected = {}) {
  const reasons = [];

  if (!row.id) reasons.push('missing_follow_up_id');
  if (!row.roofer_id) reasons.push('missing_roofer_id');
  if (!row.lead_id) reasons.push('missing_lead_id');
  if (expected.rooferId && row.roofer_id !== expected.rooferId) reasons.push('roofer_id_mismatch');
  if (expected.leadId && row.lead_id !== expected.leadId) reasons.push('lead_id_mismatch');
  if (expected.followUpId && row.id !== expected.followUpId) reasons.push('follow_up_id_mismatch');
  if (row.status !== 'scheduled') reasons.push('status_not_scheduled');
  if (row.sent_at !== null) reasons.push('sent_at_not_null');
  if (hasTestOnlySkippedReason(row.skipped_reason)) reasons.push('already_test_only_skipped');

  return reasons;
}

async function findDuplicateTestMessage(supabase, candidate, runId) {
  return selectAtMostTwo(
    supabase
      .from('messages')
      .select('id,roofer_id,lead_id,provider,provider_message_id,status,sent_at')
      .eq('roofer_id', candidate.roofer_id)
      .eq('lead_id', candidate.lead_id)
      .eq('provider', TEST_PROVIDER)
      .eq('provider_message_id', buildProviderMessageId(runId)),
    'duplicate test-only message'
  );
}

async function validateCandidateRelations(supabase, candidate, runId) {
  const checked = await checkCandidateRelations(supabase, candidate, runId);
  if (checked.reasons.length > 0) {
    fail('candidate relation validation failed', {
      follow_up_id: candidate.id,
      roofer_id: candidate.roofer_id,
      lead_id: candidate.lead_id,
      reasons: checked.reasons
    });
  }

  return { lead: checked.lead, roofer: checked.roofer };
}

async function checkCandidateRelations(supabase, candidate, runId) {
  const reasons = [];
  const leads = await selectAtMostTwo(
    supabase
      .from('leads')
      .select('id,roofer_id')
      .eq('id', candidate.lead_id),
    'matching lead'
  );

  if (leads.length !== 1) {
    reasons.push(`matching_lead_count_${leads.length}`);
  }

  const lead = leads[0] || null;
  if (lead && lead.roofer_id && lead.roofer_id !== candidate.roofer_id) {
    reasons.push('lead_roofer_id_mismatch');
  }

  const roofers = await selectAtMostTwo(
    supabase
      .from('roofers')
      .select('id')
      .eq('id', candidate.roofer_id),
    'matching roofer'
  );

  if (roofers.length !== 1) {
    reasons.push(`matching_roofer_count_${roofers.length}`);
  }

  const duplicates = await findDuplicateTestMessage(supabase, candidate, runId);
  if (duplicates.length !== 0) {
    reasons.push(`duplicate_test_message_count_${duplicates.length}`);
  }

  return { reasons, lead, roofer: roofers[0] || null };
}

async function validateExactCandidate(supabase, input, runId) {
  const candidate = await selectExactlyOne(
    supabase
      .from('follow_ups')
      .select('id,roofer_id,lead_id,status,sent_at,skipped_reason')
      .eq('id', input.followUpId)
      .eq('roofer_id', input.rooferId)
      .eq('lead_id', input.leadId),
    'exact follow_ups candidate'
  );

  const reasons = validateFollowUpShape(candidate, input);
  if (reasons.length > 0) {
    fail('exact follow_ups candidate is not safe for gated DB-write test', {
      follow_up_id: candidate.id,
      reasons
    });
  }

  const relations = await validateCandidateRelations(supabase, candidate, runId);
  pass('validated exact follow_up + lead + roofer combo');
  return { candidate, ...relations, mode: 'exact_ids' };
}

async function selectSingleSafeCandidate(supabase, runId) {
  const rows = await selectRows(
    supabase
      .from('follow_ups')
      .select('id,roofer_id,lead_id,status,sent_at,skipped_reason')
      .eq('status', 'scheduled')
      .is('sent_at', null)
      .order('id', { ascending: true }),
    'scheduled follow_ups candidates',
    51
  );

  if (rows.length > 50) {
    fail('too many scheduled follow_ups to safely auto-select; provide exact IDs', {
      inspected_limit: 50
    });
  }

  const safeCandidates = [];
  const rejected = [];

  for (const row of rows) {
    const reasons = validateFollowUpShape(row);
    if (reasons.length > 0) {
      rejected.push({ follow_up_id: row.id, reasons });
      continue;
    }

    const relationCheck = await checkCandidateRelations(supabase, row, runId);
    if (relationCheck.reasons.length === 0) {
      safeCandidates.push(row);
    } else {
      rejected.push({ follow_up_id: row.id, reasons: relationCheck.reasons });
    }
  }

  if (safeCandidates.length !== 1) {
    fail('read-only candidate selection must find exactly one safe candidate', {
      safe_candidate_count: safeCandidates.length,
      inspected_candidate_count: rows.length,
      rejected
    });
  }

  const candidate = safeCandidates[0];
  const relations = await validateCandidateRelations(supabase, candidate, runId);
  pass('selected one safe follow_up + lead + roofer combo');
  return { candidate, ...relations, mode: 'selected_single_candidate' };
}

function printLaterCommand({ candidate, runId }) {
  console.log('=== REVIEWED CANDIDATE ===');
  console.log(`reviewed_roofer_id=${candidate.roofer_id}`);
  console.log(`reviewed_lead_id=${candidate.lead_id}`);
  console.log(`reviewed_follow_up_id=${candidate.id}`);
  console.log(`fresh_run_id=${runId}`);

  console.log('=== LATER GATED DB-WRITE COMMAND FOR TERMINAL 1 REVIEW ===');
  console.log('Do not run this command without explicit approval.');
  console.log(`export SMS_DISPATCHER_DB_LIVE_TEST_WRITE=true
export SMS_LIVE_WRITE_TARGET=${LIVE_WRITE_TARGET}
export SMS_LIVE_TEST_RUN_ID=${runId}
export SMS_LIVE_TEST_ROOFER_ID=${candidate.roofer_id}
export SMS_LIVE_TEST_LEAD_ID=${candidate.lead_id}
export SMS_LIVE_TEST_FOLLOW_UP_ID=${candidate.id}
node backend/scripts/verify-sms-dispatcher-db-write-live-test.js \\
  --allow-live-supabase-write \\
  --messages-follow-ups-only \\
  --test-only \\
  --run-id "$SMS_LIVE_TEST_RUN_ID" \\
  --roofer-id "$SMS_LIVE_TEST_ROOFER_ID" \\
  --lead-id "$SMS_LIVE_TEST_LEAD_ID" \\
  --follow-up-id "$SMS_LIVE_TEST_FOLLOW_UP_ID"`);
}

async function main() {
  runStaticSafetyChecks();

  if (process.argv.includes('--static-only')) {
    console.log('PASS: static-only read-only candidate verification completed.');
    console.log('No Supabase writes performed.');
    console.log('No SMS sent.');
    console.log('No Twilio calls made.');
    console.log('No route, cron, scheduler, or dispatcher activation.');
    return;
  }

  const rooferId = getArgValue('--roofer-id');
  const leadId = getArgValue('--lead-id');
  const followUpId = getArgValue('--follow-up-id');
  const providedIds = [rooferId, leadId, followUpId].filter(Boolean);

  if (providedIds.length > 0 && providedIds.length !== 3) {
    fail('exact validation requires --roofer-id, --lead-id, and --follow-up-id together');
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    fail('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  }

  const runId = suggestedRunId();
  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
  const result = providedIds.length === 3
    ? await validateExactCandidate(supabase, { rooferId, leadId, followUpId }, runId)
    : await selectSingleSafeCandidate(supabase, runId);

  printLaterCommand({ candidate: result.candidate, runId });

  console.log('=== SAFETY STATEMENT ===');
  console.log('PASS: read-only candidate verifier completed.');
  console.log('No Supabase writes performed.');
  console.log('No SMS sent.');
  console.log('No Twilio import or call made.');
  console.log('No route, cron, scheduler, or dispatcher activation added.');
}

main().catch((error) => {
  fail('Unexpected read-only candidate verifier failure', { message: error.message });
});
