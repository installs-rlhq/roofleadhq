# First Paid Launch Control Center

Date: 2026-06-06

## Status

Current status: demo ready with live automation disabled

## Source of Truth

`a79f04a docs(pilot): update next chat context with go no go snapshot`

## Launch Readiness Snapshot

- All first-paid launch documentation verified
- All local read-only verifiers passing
- Dashboard Manual Outreach verified read-only
- Vapi phone lead intake verified in test-only mode
- Reporting verified in test-only mode
- Operator status page available internally
- Live SMS approval package stale guard enforced

## Operator Pre-Launch Checklist

- Review FIRST_PAID_LAUNCH_GO_NO_GO_SNAPSHOT.md
- Review FIRST_PAID_LAUNCH_DAY_CHECKLIST.md
- Review FIRST_PAID_LAUNCH_OPERATOR_HANDOFF_NOTE.md
- Confirm dashboard access token delivered
- Confirm Twilio number assigned
- Confirm service area and contractor details verified

## Contractor Setup Checklist

- Dashboard access token created and delivered
- Twilio number assigned
- Service area confirmed
- Billing/setup payment received
- Kickoff email sent and acknowledged

## Manual Outreach Path C Checklist

- Manual Outreach flows verified in test-only mode
- No live SMS dispatch enabled
- Manual Outreach Path C is dry-run/test-safe unless separately approved

## Demo Flow Checklist

- Vapi phone lead intake verified in test-only mode
- Reporting verified in test-only mode
- Dashboard navigation verified
- Operator status page verified

## Safety Gates

- Homeowner SMS is not live
- Roofer reply SMS is not live
- Twilio sending is not live
- Live SMS approval package is stale
- Step 66 production send intent bridge is fake-only
- No SMS/Twilio/Vapi/Calendar/Resend/Lindy production triggers without explicit approval

## Explicit Approval Gates

- Any production SMS, Twilio, Vapi, Calendar, Resend, or Lindy activation
- Any live automation enablement
- Any change to the stale Live SMS approval package status
- Enabling Manual Outreach Path C for live use

## Verification Commands

```bash
node backend/scripts/verify-first-paid-pilot-readiness-readonly.js
node backend/scripts/verify-first-paid-launch-go-no-go-snapshot-readonly.js
node backend/scripts/verify-first-paid-launch-control-center-readonly.js
node backend/scripts/verify-live-sms-approval-package-stale-readonly.js
```

## Go/No-Go Decision

Current status: demo ready with live automation disabled.

The system is prepared for a controlled Founder-Led Launch Program.

The contractor can book inspections / book appointments with founder oversight.

The dashboard stays read-only for the contractor.

## Next Build Batch

Continue adding first-paid launch operator tooling and documentation using the established pattern of new doc + read-only verifier + aggregate integration. Keep all work local, read-only, and docs-first.

Founder-Led Launch Program — help the contractor book inspections / book appointments.