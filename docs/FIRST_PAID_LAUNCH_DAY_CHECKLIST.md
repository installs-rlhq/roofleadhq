# First Paid Launch Day Checklist

Date: 2026-06-06

Source-of-truth commit: `07977be test(pilot): add launch operator handoff verifier`

Pre-launch verification command: `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`

Operator status page: `website/dashboard/pilot-status.html`

## Required Docs to Review

- `docs/FIRST_PAID_PILOT_LAUNCH_PACKET.md`
- `docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md`
- `docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md`
- `docs/FIRST_PAID_CONTRACTOR_KICKOFF_EMAIL_DRAFT.md`
- `docs/FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md`
- `docs/FIRST_PAID_LAUNCH_OPERATOR_HANDOFF_NOTE.md`

## Contractor Setup Confirmation

- Dashboard access token created and delivered
- Twilio number assigned
- Service area confirmed
- Billing/setup payment received

## Kickoff Email Confirmation

- Kickoff email sent to contractor
- Contractor has acknowledged receipt

## Dashboard Access Confirmation

- Contractor can log in to dashboard
- Manual Outreach section visible and read-only
- No production automation controls exposed

## Manual Outreach Check

- Manual Outreach flows verified in test-only mode
- No live SMS dispatch enabled

## Vapi Phone Lead Intake Check

- Vapi phone lead intake verified in test-only mode
- No live Vapi outbound actions enabled

## Reporting Check

- Daily/weekly reporting verified in test-only mode
- No live Resend production emails enabled

## Disabled Automation Check

All production automations remain disabled:

- Homeowner SMS outreach
- Roofer SMS notifications
- Follow-up dispatcher live sending
- Calendar event creation or synchronization
- Vapi outbound actions
- Resend production emails
- Lindy production automations

## Explicit Approval Required Before Live Automation

Do not enable any production automation without explicit approval.

Before any live automation is turned on, confirm the approval, the launch scope, and the operator follow-up plan in writing.

No Supabase/SMS/Twilio/Vapi/Calendar/Resend/Lindy production calls should be made.

## Day-One Operating Rhythm

This is a Founder-Led Launch Program.

The contractor can book inspections / book appointments with founder oversight.

The dashboard stays read-only for the contractor.

The operator status page stays internal and read-only.

All activity is monitored and human-reviewed.

## End-of-Day Closeout

- Review all Manual Outreach activity
- Review all Vapi phone lead intake activity
- Confirm no unauthorized automation activation
- Log any issues or contractor feedback
- Prepare next-day founder review notes

Keep the launch framed as a controlled Founder-Led Launch Program, not as a guaranteed outcome program.