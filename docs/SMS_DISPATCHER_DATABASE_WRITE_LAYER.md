# SMS Dispatcher Database Write Layer

Date: 2026-06-06

## Purpose

This document records the gated/test-only database write layer for the SMS dispatcher in the RoofLeadHQ Founder-Led Launch Program.

## Current Posture

- All production SMS/Twilio activity remains disabled.
- Live SMS approval package is stale.
- Step 66 production send intent bridge is fake-only.
- Any database write path is test-only, duplicate-protected, and requires explicit environment gates.

## Files

- `backend/scripts/verify-sms-dispatcher-messages-write-testonly.js`
- `backend/scripts/verify-sms-dispatcher-followups-update-testonly.js`
- `backend/scripts/prepare-sms-dispatcher-db-write-candidate-readonly.js`
- `backend/scripts/prepare-sms-dispatcher-manual-runner-live-test-readonly.js`
- `backend/scripts/prepare-sms-dispatcher-production-runner-live-test-readonly.js`

## Safety Rules

- Default mode is read-only/fake-only.
- No Twilio import or call.
- No SMS send.
- No route registration.
- No cron/scheduler/dispatcher auto-start.
- Live automation remains disabled.
- Live SMS approval package remains stale unless explicitly refreshed.

## Business Language

- Founder-Led Launch Program
- book inspections / book appointments

## Next Steps

Any real database write requires explicit approval, narrow scope, duplicate protection, and gated environment variables before execution.

## Verification Commands

```bash
node backend/scripts/verify-sms-dispatcher-messages-write-testonly.js
node backend/scripts/verify-sms-dispatcher-followups-update-testonly.js
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
```