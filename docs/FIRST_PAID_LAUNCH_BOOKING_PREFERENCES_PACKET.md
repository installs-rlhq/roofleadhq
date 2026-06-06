# First Paid Launch Appointment Booking Preferences Packet

This packet turns first-paid contractor intake into clear appointment booking rules while keeping Calendar activation disabled.

## 1. Packet Purpose

Use this packet to document how RoofLeadHQ should handle booking preferences for the first paid roofing contractor.

This packet is operator-facing and safety-gated. It does not activate live Calendar booking.

Connected docs:

- `docs/FIRST_PAID_LAUNCH_CUSTOMER_INTAKE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md`
- `docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md`
- `docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md`
- `docs/FIRST_PAID_LAUNCH_DAY_CHECKLIST.md`

## 2. Source-of-Truth Workflow

Before using or editing this packet, verify Terminal 1 source of truth:

- `cd /root/roofleadhq`
- `pwd`
- `git rev-parse --show-toplevel`
- `git fetch origin main`
- `git status --short`
- `git log --oneline -12`

Required state:

- Work only in `/root/roofleadhq`.
- Do not use `/root/.openclaw/workspace`.
- HEAD and origin/main must match.
- OpenClaw summaries alone are not trusted.

## 3. Appointment Language Rules

Use approved RoofLeadHQ language:

- book inspections
- book appointments
- inspection request
- appointment request
- homeowner appointment
- roofing inspection

Avoid prohibited language:

- book jobs
- guaranteed jobs
- guaranteed revenue
- 7-day pilot
- 5 qualified appointments in 7 days

## 4. Appointment Types

Document approved appointment types:

| Appointment Type | Duration | Manual/Automated Status | Notes |
| --- | --- | --- | --- |
| Roof inspection | TBD | Manual only until approved | TBD |
| Leak inspection | TBD | Manual only until approved | TBD |
| Storm damage inspection | TBD | Manual only until approved | TBD |
| Insurance claim inspection | TBD | Manual only until approved | TBD |
| Follow-up appointment | TBD | Manual only until approved | TBD |

## 5. Availability Rules

Capture:

- Available days.
- Available hours.
- Time zone.
- Earliest appointment window.
- Latest appointment window.
- Same-day appointment rules.
- Next-day appointment rules.
- Weekend appointment rules.
- Holiday blackout rules.
- Weather-related scheduling limits.

## 6. Service Area Rules

Document:

- Primary service cities.
- Secondary service cities.
- Counties served.
- Zip codes served.
- Out-of-area handling.
- Minimum travel threshold.
- Emergency service area exceptions.
- Storm-season service area changes.

## 7. Assignment Rules

Capture how appointments should be assigned:

- Owner/operator assignment.
- Sales rep assignment.
- Estimator assignment.
- Crew/territory assignment.
- Emergency escalation contact.
- Backup contact.
- After-hours contact.

## 8. Buffer and Capacity Rules

Document:

- Buffer time between appointments.
- Max inspections per day.
- Max inspections per rep per day.
- Max emergency appointments per day.
- Travel buffer.
- Weather buffer.
- Manual override policy.

## 9. Emergency Booking Rules

Define how to handle:

- Active leaks.
- Interior water intrusion.
- Storm damage.
- Tarp requests.
- Unsafe roof access.
- Elderly or vulnerable homeowner situations.
- After-hours emergencies.
- Insurance claim deadlines.

Emergency booking remains manual until explicitly approved.

## 10. Confirmation and Reminder Rules

Document:

- Confirmation language.
- Reminder timing.
- Reminder channel.
- Reschedule instructions.
- Cancellation instructions.
- No-show handling.
- Manual operator follow-up.

No live SMS/Twilio sends are allowed without explicit approval.

## 11. Calendar Integration Readiness

Capture readiness only:

- Calendar owner.
- Calendar platform.
- Calendar access status.
- Appointment calendar name.
- Time zone.
- Booking conflict policy.
- Manual review owner.
- Future activation approval owner.

Calendar booking activation is prohibited without explicit approval.

## 12. Manual Booking Handoff

Until live booking is approved, operator must know:

- Who manually creates the appointment.
- Where appointment details are recorded.
- How homeowner confirmation is handled.
- How contractor confirmation is handled.
- How reschedules are handled.
- How cancellations are handled.
- How exceptions are escalated.

## 13. Explicit Approval Gates

The following are prohibited unless explicitly approved:

- no live SMS/Twilio sends
- no production Supabase writes
- no Vapi production webhook ingestion
- no live Vapi webhook route
- no Calendar booking activation
- no Resend production activation
- no Lindy production activation
- no cron activation
- no scheduler activation
- no dispatcher activation
- no public production route activation
- no secrets exposure
- no destructive operations

## 14. Completion Criteria

This packet is complete only when:

- Appointment language rules are confirmed.
- Appointment types are documented.
- Availability rules are documented.
- Service area rules are documented.
- Assignment rules are documented.
- Buffer and capacity rules are documented.
- Emergency booking rules are documented.
- Confirmation and reminder rules are documented.
- Calendar readiness is documented without activation.
- Manual booking handoff is complete.
- Explicit approval gates remain intact.
