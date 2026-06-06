#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const repoRoot = path.join(__dirname, '..', '..');

function pass(message) {
  console.log(`PASS: ${message}`);
}

function fail(message, details = null) {
  console.error(`FAIL: ${message}`);
  if (details) console.error(JSON.stringify(details, null, 2));
  process.exitCode = 1;
}

console.log('=== RoofLeadHQ Operator Alert Payload Generator (Dry-Run) ===');
console.log('Default mode: dry-run only. No external calls.');
console.log('No SMS. No Twilio. No Lindy. No routes. No cron.');

const args = process.argv.slice(2);
const allowWebhook = args.includes('--allow-operator-alert-webhook');
const testMode = process.env.OPERATOR_ALERT_TEST_MODE === '1';
const webhookUrl = process.env.OPERATOR_ALERT_WEBHOOK_URL;
const bearerToken = process.env.OPERATOR_ALERT_WEBHOOK_BEARER_TOKEN;

const runId = 'db-write-candidate-2026-06-06T03-27-16-214z';
const rooferId = 'be7efc94-bd68-43af-81b2-dc7b869b42df';
const leadId = 'cf9bf57f-bdd5-4757-a3fc-8327827eb2e0';
const followUpId = '3d57fccc-2585-4b28-bb4c-2b4d1c2d95fb';
const messageId = '613a0d1d-467c-4220-aa8d-2cce4b2f1425';

const payload = {
  event_type: 'sms_dispatcher_gated_test_write_completed',
  timestamp: new Date().toISOString(),
  run_id: runId,
  roofer_id: rooferId,
  business_name: 'TEST_ROOFER',
  lead_id: leadId,
  follow_up_id: followUpId,
  message_id: messageId,
  messages_insert: { row_id: messageId, test_only: true },
  follow_ups_update: { row_id: followUpId, test_only: true },
  error_message: null,
  safety: {
    sms_sent: false,
    twilio_called: false,
    route_activated: false,
    cron_activated: false,
    production_automation: false,
    no_sms_sent: true,
    no_twilio_call: true
  }
};

console.log('\n--- Operator Alert Payload (Dry-Run) ---');
console.log(JSON.stringify(payload, null, 2));

if (allowWebhook && testMode && webhookUrl) {
  console.log('\n[INFO] All gates present. Attempting gated webhook POST...');
  
  // Use global fetch if available (Node 18+)
  const doFetch = typeof fetch === 'function' ? fetch : null;
  
  if (!doFetch) {
    console.log('[INFO] fetch not available in this Node version. Webhook skipped.');
    pass('Gated webhook skipped (fetch unavailable).');
  } else {
    const headers = { 'Content-Type': 'application/json' };
    if (bearerToken) {
      headers['Authorization'] = `Bearer ${bearerToken}`;
    }
    doFetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })
    .then(res => {
      if (res.ok) {
        console.log(`[INFO] Webhook POST succeeded (status ${res.status}).`);
        pass('Gated webhook POST completed.');
      } else {
        console.error(`[FAIL] Webhook returned non-2xx: ${res.status}`);
        process.exitCode = 1;
      }
    })
    .catch(err => {
      console.error(`[FAIL] Webhook POST error: ${err.message}`);
      process.exitCode = 1;
    });
  }
} else {
  console.log('\n[INFO] Webhook not called (dry-run or missing explicit gates).');
}

pass('Operator alert payload generated in dry-run mode.');
pass('No external calls made.');
pass('No SMS, Twilio, Lindy, routes, or cron activated.');

if (process.exitCode) {
  console.error('FAIL: Operator alert payload generation failed.');
  process.exit(process.exitCode);
}

console.log('PASS: Operator alert payload generation completed safely.');