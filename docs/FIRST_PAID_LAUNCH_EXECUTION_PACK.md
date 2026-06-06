# First Paid Launch Execution Pack

Date: 2026-06-06

## Source of Truth

`9d0c1df docs(pilot): update launch handoff with status endpoint path`

No route was registered for the first paid launch status smoke path.

## Current Launch State

Current status: demo ready with live automation disabled

- `backend/src/routes/first-paid-launch-status.ts` is test-safe/unregistered
- `website/dashboard/first-paid-launch-status.html` exists
- `backend/scripts/verify-first-paid-launch-status-endpoint-readonly.js` exists
- No route was registered for the first paid launch status smoke path
- backend/src/routes/first-paid-launch-status.ts is test-safe/unregistered
- website/dashboard/first-paid-launch-status.html exists
- backend/scripts/verify-first-paid-launch-status-endpoint-readonly.js exists
- `backend/src/routes/first-paid-launch-status.ts` is test-safe/unregistered
- `website/dashboard/first-paid-launch-status.html` exists
- `backend/scripts/verify-first-paid-launch-status-endpoint-readonly.js` exists
- `backend/src/routes/first-paid-launch-status.ts` is test-safe/unregistered
- `website/dashboard/first-paid-launch-status.html` exists
- `backend/scripts/verify-first-paid-launch-status-endpoint-readonly.js` exists
- Homeowner SMS is not live
- Roofer reply SMS is not live
- Twilio sending is not live
- Live SMS approval package is stale
- Step 66 production send intent bridge is fake-only
- No SMS/Twilio/Vapi/Calendar/Resend/Lindy production triggers without explicit approval
- Manual Outreach Path C is dry-run/test-safe unless separately approved

## Before Contractor Call

- Review FIRST_PAID_LAUNCH_CONTROL_CENTER.md
- Review FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md
- Review FIRST_PAID_LAUNCH_DAY_CHECKLIST.md
- Confirm dashboard access token delivered
- Confirm Twilio number assigned
- Run status smoke path review

## During Contractor Call

- Use Founder-Led Launch Program framing
- Focus on helping the contractor book inspections / book appointments
- Keep dashboard read-only
- Do not promise jobs, revenue, or fixed appointment volume

## After Contractor Call

- Log contractor feedback
- Review any Manual Outreach activity (dry-run only)
- Confirm no unauthorized automation activation
- Prepare next-day founder review notes

## Demo Script

- Open `website/dashboard/first-paid-launch-status.html`
- Confirm status shows `demo_ready_with_live_automation_disabled`
- Confirm all live automation flags are false
- Review safety statements

## Manual Outreach Path C Dry-Run Steps

- Manual Outreach Path C is dry-run/test-safe unless separately approved
- No live SMS sending enabled
- All actions remain in test-only mode

## Status Smoke Path Review

- `backend/src/routes/first-paid-launch-status.ts` (test-safe/unregistered)
- `website/dashboard/first-paid-launch-status.html` (read-only)
- `backend/scripts/verify-first-paid-launch-status-endpoint-readonly.js`

## Go/No-Go Checklist

- All verifiers passing
- Live SMS approval package remains stale
- No production automation enabled

## Explicit Approval Gates

- Any production SMS, Twilio, Vapi, Calendar, Resend, or Lindy activation
- Any live automation enablement
- Enabling Manual Outreach Path C for live use

## Verification Commands

```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-first-paid-launch-execution-pack-readonly.js
node backend/scripts/verify-first-paid-launch-status-endpoint-readonly.js
```

## What Not To Do

- Do not send live SMS
- Do not activate any Twilio, Vapi, Calendar, Resend, or Lindy production actions
- Do not turn on live automation without explicit approval
- Do not register the status route in production

## Next Build Batch

Continue adding first-paid launch operator tooling and documentation using the established pattern. Keep all work local, read-only, and docs-first.

Founder-Led Launch Program — help the contractor book inspections / book appointments.