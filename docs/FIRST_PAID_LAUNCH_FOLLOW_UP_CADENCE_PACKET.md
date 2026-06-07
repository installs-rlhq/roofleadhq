# First Paid Launch Follow-Up Cadence Packet

This packet turns first-paid contractor intake and booking preferences into clear follow-up rules while keeping SMS/Twilio automation disabled.

## 1. Packet Purpose

Use this packet to document how RoofLeadHQ should handle homeowner follow-up during the first paid launch.

This packet is operator-facing and safety-gated. It does not activate live SMS, Twilio, dispatcher, cron, scheduler, or automated follow-up.

Connected docs:

- `docs/FIRST_PAID_LAUNCH_CUSTOMER_INTAKE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md`
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

## 3. Follow-Up Language Rules

Use approved RoofLeadHQ language:

- book inspections
- book appointments
- schedule an inspection
- confirm an appointment
- homeowner follow-up
- missed-call recovery
- speed-to-lead

Avoid prohibited language:

- book jobs
- guaranteed jobs
- guaranteed revenue
- 7-day pilot
- 5 qualified appointments in 7 days

## 4. Lead Status Definitions

Document follow-up handling by lead status:

| Lead Status | Meaning | Follow-Up Mode | Notes |
| --- | --- | --- | --- |
| New lead | Homeowner inquiry received | Manual only until approved | TBD |
| Contacted | Initial response sent or call made | Manual only until approved | TBD |
| Needs response | Homeowner has not replied | Manual only until approved | TBD |
| Appointment requested | Homeowner wants inspection/appointment | Manual only until approved | TBD |
| Appointment booked | Appointment manually confirmed | Manual only until approved | TBD |
| Reschedule needed | Homeowner or contractor needs a new time | Manual only until approved | TBD |
| Closed/lost | Homeowner declined or became inactive | Manual only until approved | TBD |
| Opt-out | Homeowner requested no contact | Manual only until approved | Respect immediately |

## 5. Initial Response Rules

Capture:

- Target response window.
- Manual response owner.
- Approved greeting.
- Required qualification questions.
- Required emergency triage question.
- Required appointment language.
- Required opt-out language if applicable.
- Contractor escalation criteria.

No live SMS/Twilio sends are allowed without explicit approval.

## 6. Missed-Call Recovery Rules

Document:

- Missed-call owner.
- Callback timing.
- Manual text/email option if approved.
- Emergency callback escalation.
- After-hours callback policy.
- Repeat missed-call handling.
- Manual notes process.

Missed-call recovery remains manual until live automation is explicitly approved.

## 7. Standard Follow-Up Cadence

Define the expected manual cadence:

| Attempt | Timing | Channel | Owner | Message Goal |
| --- | --- | --- | --- | --- |
| Attempt 1 | TBD | Manual call/text/email | TBD | Respond and qualify |
| Attempt 2 | TBD | Manual call/text/email | TBD | Re-engage |
| Attempt 3 | TBD | Manual call/text/email | TBD | Offer appointment |
| Attempt 4 | TBD | Manual call/text/email | TBD | Final helpful follow-up |
| Close-out | TBD | Manual note | TBD | Mark status |

## 8. Appointment Reminder Rules

Document:

- Reminder timing.
- Reminder channel.
- Manual reminder owner.
- Confirmation wording.
- Reschedule wording.
- Cancellation wording.
- No-show process.
- Contractor notification process.

No automated reminders may be activated without explicit approval.

## 9. Emergency Follow-Up Rules

Define manual escalation for:

- Active leaks.
- Interior water intrusion.
- Storm damage.
- Tarp requests.
- Unsafe roof access.
- Elderly or vulnerable homeowner situations.
- After-hours emergencies.
- Insurance claim deadlines.

Emergency follow-up remains manual until explicitly approved.

## 10. Opt-Out and Do-Not-Contact Rules

Confirm:

- Stop, unsubscribe, cancel, remove, and do-not-contact requests are honored.
- Opt-out status is recorded manually until automation is approved.
- No additional follow-up happens after opt-out except legally/operationally required confirmation if approved.
- Operator escalates unclear opt-out language for review.

## 11. Channel Rules

Document approved day-one use for:

- Phone call.
- Manual SMS only if explicitly approved for the exact customer/workflow.
- Manual email.
- Contractor internal alert.
- Operator note.
- Future automation candidate.

Live SMS/Twilio, Resend, Lindy, Vapi, cron, scheduler, dispatcher, and production Supabase write flows remain disabled unless explicitly approved.

## 12. Reporting Tie-In

Document how follow-up should appear in reports:

- New leads.
- Contacted leads.
- Follow-up attempts.
- Appointments requested.
- Appointments booked.
- Missed-call recovery.
- Emergency escalations.
- Opt-outs.
- Closed/lost leads.
- Recommended actions.

## 13. Manual Operator Handoff

Until live follow-up automation is approved, operator must know:

- Who sends manual follow-up.
- Which channel is approved.
- Which message language is approved.
- Where notes are recorded.
- How opt-outs are handled.
- How emergency leads are escalated.
- How contractor updates are sent.
- How reporting inputs are captured.

## 14. Explicit Approval Gates

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

## 15. Completion Criteria

This packet is complete only when:

- Follow-up language rules are confirmed.
- Lead status definitions are documented.
- Initial response rules are documented.
- Missed-call recovery rules are documented.
- Standard follow-up cadence is documented.
- Appointment reminder rules are documented.
- Emergency follow-up rules are documented.
- Opt-out and do-not-contact rules are documented.
- Channel rules are documented.
- Reporting tie-in is documented.
- Manual operator handoff is complete.
- SMS/Twilio automation remains disabled.
- Explicit approval gates remain intact.
