#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ts = require('typescript');
const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const repoRoot = path.join(__dirname, '..', '..');
const serviceTs = path.join(repoRoot, 'backend/src/services/sms-dispatcher-planner.service.ts');
const safetyTs = path.join(repoRoot, 'backend/src/services/sms-safety.service.ts');
const compiledPlannerJs = '/tmp/sms-dispatcher-planner.execution-readonly.js';
const compiledSafetyJs = '/tmp/sms-safety.execution-readonly.js';

console.log('=== RoofLeadHQ SMS Dispatcher Execution Plan Read-Only Verification ===');
console.log('No writes are performed.');
console.log('No SMS is sent.');
console.log('No Twilio calls are made.');

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  console.error('FAIL: Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

function compile(sourcePath, outputPath) {
  const source = fs.readFileSync(sourcePath, 'utf8');
  const output = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true
    }
  }).outputText;

  fs.writeFileSync(outputPath, output);
}

compile(safetyTs, compiledSafetyJs);
compile(serviceTs, compiledPlannerJs);

const Module = require('module');
const originalLoad = Module._load;

Module._load = function patchedLoad(request, parent, isMain) {
  if (request === './sms-safety.service') {
    return require(compiledSafetyJs);
  }

  return originalLoad(request, parent, isMain);
};

const { planSmsDispatch } = require(compiledPlannerJs);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function detectDuplicateSend(supabaseClient, followUp) {
  const followUpId = followUp?.id;

  if (!followUpId || !followUp?.roofer_id || !followUp?.lead_id) {
    return {
      duplicateSendExists: true,
      lookupError: 'missing follow-up duplicate lookup fields',
      lookupSource: 'missing_required_field'
    };
  }

  const { data: workflowEvents, error: workflowEventError } = await supabaseClient
    .from('workflow_events')
    .select('id')
    .eq('roofer_id', followUp.roofer_id)
    .eq('lead_id', followUp.lead_id)
    .contains('metadata', { follow_up_id: followUpId })
    .or('event_type.ilike.%sms%,event_source.ilike.%sms%,description.ilike.%sms%')
    .limit(1);

  if (workflowEventError) {
    return {
      duplicateSendExists: true,
      lookupError: workflowEventError.message,
      lookupSource: 'workflow_events'
    };
  }

  if (workflowEvents.length > 0) {
    return {
      duplicateSendExists: true,
      lookupSource: 'workflow_events.metadata.follow_up_id'
    };
  }

  let messageQuery = supabaseClient
    .from('messages')
    .select('id')
    .eq('roofer_id', followUp.roofer_id)
    .eq('lead_id', followUp.lead_id)
    .eq('channel', 'sms')
    .eq('direction', 'outbound')
    .not('sent_at', 'is', null)
    .limit(1);

  if (followUp.message_body) {
    messageQuery = messageQuery.eq('message_body', followUp.message_body);
  }

  const { data: messages, error: messageError } = await messageQuery;

  if (messageError) {
    return {
      duplicateSendExists: true,
      lookupError: messageError.message,
      lookupSource: 'messages'
    };
  }

  return {
    duplicateSendExists: messages.length > 0,
    lookupSource: followUp.message_body
      ? 'messages.roofer_id.lead_id.message_body.sent_at'
      : 'messages.roofer_id.lead_id.sent_at'
  };
}

(async () => {
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
      leads(id, phone, status),
      roofers(id, business_name, sms_confirmation_enabled, timezone)
    `)
    .eq('status', 'scheduled')
    .lte('scheduled_for', now)
    .not('roofer_id', 'is', null)
    .not('lead_id', 'is', null)
    .limit(10);

  if (error) {
    console.error(`FAIL: ${error.message}`);
    process.exit(1);
  }

  console.log(`Due scheduled follow-ups planned: ${data.length}`);

  let missingRelationCount = 0;
  let sendCount = 0;
  let skipCount = 0;
  let rescheduleCount = 0;

  for (const row of data) {
    const lead = row.leads;
    const roofer = row.roofers;

    if (!lead || !roofer) {
      missingRelationCount += 1;
      console.log({
        follow_up_id: row.id,
        action: 'skip',
        reason: 'missing_relation'
      });
      continue;
    }

    const duplicateLookup = await detectDuplicateSend(supabase, row);

    const plan = planSmsDispatch({
      followUp: {
        id: row.id,
        roofer_id: row.roofer_id,
        lead_id: row.lead_id,
        status: row.status,
        followup_type: row.followup_type,
        scheduled_for: row.scheduled_for,
        message_body: row.message_body
      },
      lead: {
        id: lead.id,
        phone: lead.phone,
        status: lead.status
      },
      roofer: {
        id: roofer.id,
        sms_confirmation_enabled: roofer.sms_confirmation_enabled,
        timezone: roofer.timezone
      },
      currentTime: now,
      duplicateSendExists: duplicateLookup.duplicateSendExists
    });

    if (plan.action === 'send') sendCount += 1;
    if (plan.action === 'skip') skipCount += 1;
    if (plan.action === 'reschedule') rescheduleCount += 1;

    console.log({
      follow_up_id: row.id,
      roofer: roofer.business_name,
      sms_enabled: roofer.sms_confirmation_enabled,
      lead_status: lead.status,
      followup_type: row.followup_type,
      template_type: plan.templateType || null,
      action: plan.action,
      reason: plan.reason,
      should_send: plan.shouldSend,
      duplicate_send_exists: duplicateLookup.duplicateSendExists,
      duplicate_lookup_source: duplicateLookup.lookupSource,
      duplicate_lookup_error: duplicateLookup.lookupError || null,
      rescheduled_for: plan.rescheduledFor || null
    });
  }

  if (missingRelationCount > 0) {
    console.error(`FAIL: ${missingRelationCount} inspected follow-up row(s) are missing lead or roofer relation data`);
    process.exit(1);
  }

  console.log('=== PLAN SUMMARY ===');
  console.log(`send: ${sendCount}`);
  console.log(`skip: ${skipCount}`);
  console.log(`reschedule: ${rescheduleCount}`);
  console.log('PASS: SMS dispatcher execution plan read-only verification passed.');
  console.log('No writes performed.');
  console.log('No SMS sent.');
  console.log('No Twilio calls made.');
})();
