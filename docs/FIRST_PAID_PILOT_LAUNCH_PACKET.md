# First Paid Pilot Launch Packet

Date: 2026-06-05

## Purpose

This packet is the launch index for the RoofLeadHQ Founder-Led Launch Program.

It collects the documents and checks needed to onboard the first paid contractor, monitor daily operations, and keep production automation disabled unless separately approved.

## Launch Readiness Status

Current readiness summary: [docs/FIRST_PAID_PILOT_FINAL_READINESS_SUMMARY.md](./FIRST_PAID_PILOT_FINAL_READINESS_SUMMARY.md)

Current aggregate verifier: [node backend/scripts/verify-first-paid-pilot-readiness-readonly.js](../backend/scripts/verify-first-paid-pilot-readiness-readonly.js)

Operator status page: [website/dashboard/pilot-status.html](../website/dashboard/pilot-status.html)

Launch position:

- Founder-Led Launch Program is the operating model.
- The contractor can book inspections / book appointments with founder oversight.
- Production automations remain disabled until explicitly approved.
- No hard outcome promises are made about jobs, revenue, or fixed appointment volume.

## Primary References

- Final readiness summary: [docs/FIRST_PAID_PILOT_FINAL_READINESS_SUMMARY.md](./FIRST_PAID_PILOT_FINAL_READINESS_SUMMARY.md)
- Contractor onboarding runbook: [docs/FIRST_PAID_CONTRACTOR_ONBOARDING_RUNBOOK.md](./FIRST_PAID_CONTRACTOR_ONBOARDING_RUNBOOK.md)
- Daily operations checklist: [docs/FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md](./FIRST_PAID_PILOT_DAILY_OPERATIONS_CHECKLIST.md)
- Contractor intake worksheet: [docs/FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md](./FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md)
- Readiness verifier: [node backend/scripts/verify-first-paid-pilot-readiness-readonly.js](../backend/scripts/verify-first-paid-pilot-readiness-readonly.js)
- Operator status page: [website/dashboard/pilot-status.html](../website/dashboard/pilot-status.html)

## Required Pre-Launch Checks

- Run the aggregate read-only verifier.
- Confirm the readiness summary still reports `demo_ready_with_live_automation_disabled`.
- Open the operator status page and confirm it is available.
- Complete the contractor intake worksheet.
- Finish the contractor onboarding runbook steps.
- Confirm dashboard access delivery for the contractor.
- Confirm manual outreach expectations and homeowner contact rules.
- Confirm reporting preferences and safety notes.
- Confirm production SMS, Calendar, Vapi, Resend, and Lindy remain disabled.

## First Contractor Onboarding Flow

1. Review the final readiness summary and operator status page.
2. Complete the contractor intake worksheet.
3. Run the onboarding runbook with the contractor.
4. Deliver dashboard access and explain the read-only view.
5. Confirm manual outreach setup and review process.
6. Confirm Vapi phone lead intake handling and review rules.
7. Confirm reporting cadence and manual update expectations.
8. Record safety approvals and any launch blockers.

## Daily Operating Rhythm

- Start the day by running the aggregate read-only verifier.
- Open the operator status page and confirm live automation remains disabled.
- Review the contractor dashboard for leads needing attention.
- Review Manual Outreach activity.
- Review Vapi phone lead intake items.
- Check booked inspections / booked appointments.
- Record any blockers, duplicates, or contact-rule questions.
- Carry unresolved issues into the next daily review.

## Safety Boundaries

- The contractor dashboard remains read-only.
- The operator status page is internal only.
- Founder review is required before homeowner contact where the workflow calls for it.
- No automated production outreach is used without separate explicit approval.
- No service calls are made as part of the readiness verifier documentation workflow.

## Not Live Without Explicit Approval

- Homeowner SMS outreach
- Roofer SMS notifications
- Follow-up dispatcher live sending
- Calendar event creation or synchronization
- Vapi outbound actions
- Resend production emails
- Lindy production automations
- Any automation that attempts to book inspections or book appointments without founder review

## Notes

- Use this packet as the index for launch coordination.
- Use the linked runbook, checklist, and intake worksheet as the working documents for the first paid contractor.
- Keep the launch framed as a controlled Founder-Led Launch Program, not as a guaranteed outcome program.
