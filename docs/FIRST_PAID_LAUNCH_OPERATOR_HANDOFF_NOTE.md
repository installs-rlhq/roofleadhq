# First Paid Launch Operator Handoff Note

Date: 2026-06-06

## Purpose

This note is the operator handoff reference for the RoofLeadHQ Founder-Led Launch Program.

It collects the verified launch artifacts, launch control paths, and final safety posture for the first paid contractor launch.

## Source Of Truth

Current verified source-of-truth commit:

`1fb11d7 test(pilot): add launch verifier index verifier`

Current aggregate verifier:

`node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`

## Launch Control Paths

- Operator status page path: `website/dashboard/pilot-status.html`
- Launch packet path: `docs/FIRST_PAID_PILOT_LAUNCH_PACKET.md`
- Client launch readiness gate path: `docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md`
- Setup checklist path: `docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md`
- Kickoff email draft path: `docs/FIRST_PAID_CONTRACTOR_KICKOFF_EMAIL_DRAFT.md`
- Daily operations checklist path: `docs/FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md`
- Launch verifier index path: `docs/FIRST_PAID_LAUNCH_VERIFIER_INDEX.md`

## Final Launch Operating Posture

- The operating model is the Founder-Led Launch Program.
- The contractor can book inspections / book appointments with founder oversight.
- The dashboard stays read-only for the contractor.
- The operator status page stays internal and read-only.
- Production automations remain disabled unless separately approved.
- The launch remains a controlled, monitored, human-reviewed process.
- No hard outcome promises are made about jobs, revenue, or fixed appointment volume.

## Disabled Live Automation Reminder

The following remain disabled:

- Homeowner SMS outreach
- Roofer SMS notifications
- Follow-up dispatcher live sending
- Calendar event creation or synchronization
- Vapi outbound actions
- Resend production emails
- Lindy production automations
- Any automation that attempts to book inspections or book appointments without founder review

## Approval Reminder Before Production Automation

Do not enable any production automation without explicit approval.

Before any live automation is turned on, confirm the approval, the launch scope, and the operator follow-up plan in writing.

No Supabase/SMS/Twilio/Vapi/Calendar/Resend/Lindy production calls should be made as part of this handoff note or its review workflow.

## Operator Use

Use this note as the final pre-launch and day-of-launch reference.

Review the launch packet, setup checklist, kickoff email draft, client launch readiness gate, and daily operations checklist together before the first paid contractor launch begins.

Keep the launch framed as a controlled Founder-Led Launch Program, not as a guaranteed outcome program.
