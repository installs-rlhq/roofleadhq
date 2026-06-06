# First Paid Launch Customer Intake Packet

This packet gives RoofLeadHQ a single operator-ready intake package for onboarding the first paid roofing contractor while keeping live automation disabled.

## 1. Packet Purpose

Use this packet to collect, review, and confirm all customer-specific information before any first-paid launch operation begins.

This packet connects:

- `docs/FIRST_PAID_CONTRACTOR_INTAKE_WORKSHEET.md`
- `docs/FIRST_PAID_CONTRACTOR_SETUP_CHECKLIST.md`
- `docs/FIRST_PAID_CONTRACTOR_ONBOARDING_RUNBOOK.md`
- `docs/FIRST_PAID_CLIENT_LAUNCH_READINESS_GATE.md`
- `docs/FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md`

## 2. Required Source-of-Truth Workflow

Before using this packet, verify Terminal 1 source of truth:

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

## 3. Business Identity Intake

Capture:

- Roofing company legal/public name.
- Owner/operator name.
- Main contact name.
- Main contact phone.
- Main contact email.
- Office phone.
- Website.
- Google Business Profile link.
- Primary service area.
- Secondary service areas.
- License or registration notes if supplied by customer.
- Insurance/storm restoration positioning notes.

## 4. Offer and Language Confirmation

Confirm the customer understands RoofLeadHQ positioning:

- Founder-led during launch.
- System-led after setup.
- Focused on lead response, follow-up, booking, and reporting.
- Designed to help book inspections or book appointments.
- Not a guaranteed job or revenue offer.

Language rules:

- Use “book inspections” or “book appointments.”
- Do not say “book jobs.”
- Do not promise guaranteed jobs.
- Do not promise guaranteed revenue.
- Do not use “7-day pilot.”
- Do not use “5 qualified appointments in 7 days.”

## 5. Lead Source Intake

Document each lead source and day-one handling mode:

| Lead Source | Active? | Day-One Handling | Future Automation Candidate? | Notes |
| --- | --- | --- | --- | --- |
| Website form | TBD | Manual/demo-safe | TBD | TBD |
| Google Business Profile | TBD | Manual/demo-safe | TBD | TBD |
| Phone calls | TBD | Manual/demo-safe | TBD | TBD |
| Text messages | TBD | Manual/demo-safe | TBD | TBD |
| Email inbox | TBD | Manual/demo-safe | TBD | TBD |
| Facebook/Meta leads | TBD | Manual/demo-safe | TBD | TBD |
| Third-party lead vendor | TBD | Manual/demo-safe | TBD | TBD |
| Manual referrals | TBD | Manual/demo-safe | TBD | TBD |

## 6. Lead Qualification Fields

Capture preferred intake fields:

- Homeowner name.
- Homeowner phone.
- Homeowner email.
- Property address.
- City/state/zip.
- Roof issue type.
- Leak/storm/emergency status.
- Insurance claim status.
- Timeline/urgency.
- Roof material if known.
- Roof age if known.
- Access notes.
- Photo availability.
- Preferred appointment window.
- Consent/opt-out notes where applicable.

## 7. Emergency and Urgent Lead Policy

Define how the operator handles:

- Active leak.
- Interior water intrusion.
- Storm damage.
- Tarp request.
- Unsafe roof access.
- Elderly or vulnerable homeowner.
- After-hours request.
- Insurance claim deadline.
- Repeat caller.
- Angry or escalated homeowner.

Until explicitly approved, emergency escalation is manual only.

## 8. Booking Preferences

Capture:

- Appointment types.
- Inspection duration.
- Available days.
- Available hours.
- Buffer time.
- Service area limits.
- Crew/sales rep assignment rules.
- Emergency inspection policy.
- Reschedule policy.
- Cancellation policy.
- Manual operator handoff instructions.

Calendar booking activation is prohibited without explicit approval.

## 9. Follow-Up Preferences

Confirm:

- First response standard.
- Follow-up cadence.
- Number of attempts.
- Reminder timing.
- Missed appointment process.
- Closed/lost process.
- Opt-out handling.
- Tone and voice.
- Escalation rules.

Live SMS/Twilio sends are prohibited without explicit approval.

## 10. Reporting Preferences

Confirm:

- Weekly report recipient.
- Monthly report recipient.
- Report delivery day.
- Lead source summary expectations.
- Appointment summary expectations.
- Missed-call recovery summary expectations.
- Recommended action expectations.
- Roofing news/trends/weather section expectations.
- Customer-specific KPIs.

## 11. Manual Operator Handoff

Before day-one operation, confirm:

- What is manual.
- What is demo-only.
- What is read-only.
- What is not enabled.
- What requires explicit approval.
- Who receives urgent escalations.
- Who reviews intake exceptions.
- Who approves future automation activation.

## 12. Explicit Approval Gates

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

## 13. Customer Intake Completion Criteria

The intake packet is complete only when:

- Business identity is captured.
- Offer/language rules are confirmed.
- Lead sources are documented.
- Lead qualification fields are confirmed.
- Emergency policy is documented.
- Booking preferences are documented.
- Follow-up preferences are documented.
- Reporting preferences are documented.
- Manual operator handoff is complete.
- Live automation remains disabled.
- Explicit approval gates remain intact.
