# Live SMS Approval Package

Status: approval required before live send
Current source-of-truth commit before this doc: `906a25f test(sms): add post live send verifier`

## Hard rule

Do not run the live SMS command unless explicit approval is given.

This package does not enable live SMS, Twilio sends, routes, cron, scheduler, auto-start, or production runner automation.

## Exact approved test candidate

- Roofer ID: `be7efc94-bd68-43af-81b2-dc7b869b42df`
- Roofer business name: `Test Roofing`
- Lead ID: `6b0b07a6-cab4-4207-9160-197180006812`
- Follow-up ID: `997ce1f8-3145-439f-a0c3-d042f803059f`
- Twilio from-number: `+18175874990`
- Destination phone: `+15550100001`
- Message body: `Just following up on your roofing request. Would you like to schedule an inspection?`
- Max batch size: `1`

## Exact approval language required

I approve sending exactly one live SMS for RoofLeadHQ using Terminal 1 only.

Approved roofer id: be7efc94-bd68-43af-81b2-dc7b869b42df
Approved lead id: 6b0b07a6-cab4-4207-9160-197180006812
Approved follow-up id: 997ce1f8-3145-439f-a0c3-d042f803059f
Approved Twilio from-number: +18175874990
Approved destination phone: +15550100001
Approved message body: Just following up on your roofing request. Would you like to schedule an inspection?
Approved max batch size: 1

I understand this is a one-time live SMS test only.
Do not enable cron, routes, scheduler, auto-start, or background production runner automation.

## Required pre-send verification

Run before approval:

cd /root/roofleadhq
git fetch origin main
git status --short
git log --oneline -8
node backend/scripts/verify-sms-live-candidate-readiness-readonly.js --static-only
node backend/scripts/verify-sms-live-candidate-readiness-readonly.js
node backend/scripts/verify-sms-twilio-send-adapter.js
node backend/scripts/verify-sms-production-send-intent-bridge.js
node backend/scripts/verify-sms-dispatcher-production-runner.js
npm --prefix backend run build

## Future live-send command

Do not run without explicit approval.

export SMS_DISPATCHER_PRODUCTION_USE_LIVE_SUPABASE=true
export SMS_DISPATCHER_PRODUCTION_RUNNER=true
export SMS_DISPATCHER_PRODUCTION_TARGET=sms_dispatcher_production_runner
export SMS_DISPATCHER_PRODUCTION_ALLOWED_ROOFER_IDS=be7efc94-bd68-43af-81b2-dc7b869b42df
export SMS_DISPATCHER_PRODUCTION_APPROVED_FOLLOW_UP_ID=997ce1f8-3145-439f-a0c3-d042f803059f
export SMS_DISPATCHER_PRODUCTION_MAX_BATCH_SIZE=1
export SMS_DISPATCHER_PRODUCTION_LIVE_TEST_RUN_ID=approved-live-candidate-readiness-997ce1f8-3145-439f-a0c3-d042f803059f
export SMS_DISPATCHER_DB_EXECUTOR_WRITE=true
export SMS_DB_EXECUTOR_TARGET=sms_dispatcher_db_executor
export SMS_DB_EXECUTOR_CONFIRM_WRITE_PLAN=true
node backend/scripts/run-sms-dispatcher-production-runner.js --allow-live-supabase-production-runner --production-runner --approved-follow-up-id 997ce1f8-3145-439f-a0c3-d042f803059f

## Required post-send verification

node backend/scripts/verify-sms-post-live-send-readonly.js
