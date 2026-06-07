# First Paid Launch Reporting Preferences Packet

This packet turns first-paid customer intake, booking preferences, and follow-up cadence into clear reporting rules while keeping Resend, Lindy, and live report automation disabled.

## 1. Packet Purpose

Use this packet to document how RoofLeadHQ should prepare weekly and monthly reporting for the first paid roofing contractor.

This packet is operator-facing and safety-gated. It does not activate Resend, Lindy, cron, scheduler, dispatcher, or automated report delivery.

Connected docs:

- `docs/FIRST_PAID_LAUNCH_CUSTOMER_INTAKE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_BOOKING_PREFERENCES_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_FOLLOW_UP_CADENCE_PACKET.md`
- `docs/FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md`
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

## 3. Reporting Language Rules

Use approved RoofLeadHQ language:

- lead response
- follow-up
- booking
- reporting
- book inspections
- book appointments
- missed-call recovery
- speed-to-lead
- recommended actions
- storm season readiness

Avoid prohibited language:

- book jobs
- guaranteed jobs
- guaranteed revenue
- 7-day pilot
- 5 qualified appointments in 7 days

## 4. Report Recipients

Capture:

- Primary report recipient.
- Secondary report recipient.
- Internal operator recipient.
- Weekly report recipient.
- Monthly report recipient.
- Escalation recipient.
- Preferred delivery channel.
- Manual delivery owner.

No Resend or Lindy production activation is allowed without explicit approval.

## 5. Weekly Report Preferences

Document weekly reporting expectations:

- Report day.
- Report time.
- Reporting period.
- Lead source summary.
- New leads count.
- Contacted leads count.
- Follow-up attempts.
- Appointment requests.
- Booked inspections or booked appointments.
- Missed-call recovery.
- Emergency escalations.
- Opt-outs.
- Closed/lost leads.
- Recommended actions.

## 6. Monthly Report Preferences

Document monthly reporting expectations:

- Report day.
- Report time.
- Reporting period.
- Lead source trends.
- Booking trend.
- Follow-up trend.
- Missed-call recovery trend.
- Emergency lead trend.
- Service area trend.
- Storm/weather context.
- Roofing news/trends context.
- Recommended actions.
- Next-month priorities.

## 7. KPI Definitions

Define report KPIs:

| KPI | Meaning | Source | Manual/Automated Status |
| --- | --- | --- | --- |
| New leads | New homeowner inquiries | TBD | Manual/read-only until approved |
| Contacted leads | Leads with initial response | TBD | Manual/read-only until approved |
| Appointment requests | Leads requesting inspection/appointment | TBD | Manual/read-only until approved |
| Booked inspections | Inspections manually booked | TBD | Manual/read-only until approved |
| Follow-up attempts | Manual follow-up actions | TBD | Manual/read-only until approved |
| Missed-call recovery | Missed calls manually recovered | TBD | Manual/read-only until approved |
| Emergency escalations | Urgent leads escalated | TBD | Manual/read-only until approved |
| Opt-outs | Do-not-contact requests | TBD | Manual/read-only until approved |

## 8. Lead Source Reporting

Document how to report:

- Website form leads.
- Google Business Profile leads.
- Phone call leads.
- Text message leads.
- Email leads.
- Facebook/Meta leads.
- Third-party vendor leads.
- Manual referral leads.
- Unknown source leads.

## 9. Appointment Reporting

Document how to report:

- Appointment requests.
- Booked inspections.
- Booked appointments.
- Reschedules.
- Cancellations.
- No-shows.
- Emergency appointments.
- Insurance/storm inspections.
- Out-of-area requests.

Use “booked inspections” or “booked appointments,” not “booked jobs.”

## 10. Follow-Up Reporting

Document how to report:

- Attempt count.
- Channel used.
- Response status.
- Follow-up age.
- Leads needing attention.
- Leads ready for appointment.
- Leads needing contractor review.
- Opt-out status.
- Closed/lost status.

No live SMS/Twilio sends or production Supabase writes are allowed without explicit approval.

## 11. Weather, Trends, and Recommended Actions

Document the final report section expectations:

- Roofing news.
- Roofing trends.
- Weather context.
- Storm season readiness.
- Local market notes.
- Recommended actions.
- Contractor next steps.
- Operator notes.

This section is advisory and must not promise guaranteed jobs or guaranteed revenue.

## 12. Manual Report Assembly

Until live report automation is approved, operator must know:

- Who gathers reporting inputs.
- Where report inputs are reviewed.
- Who drafts the report.
- Who reviews the report.
- Who sends the report manually.
- How corrections are handled.
- How customer feedback is captured.
- What cannot be automated yet.

## 13. Report Delivery Readiness

Capture readiness only:

- Delivery channel.
- Email sender identity.
- Report template status.
- Review owner.
- Approval owner.
- Future Resend activation owner.
- Future Lindy activation owner.
- Future scheduler activation owner.

Resend, Lindy, cron, scheduler, dispatcher, and automated report delivery remain disabled unless explicitly approved.

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

- Reporting language rules are confirmed.
- Report recipients are documented.
- Weekly report preferences are documented.
- Monthly report preferences are documented.
- KPI definitions are documented.
- Lead source reporting is documented.
- Appointment reporting is documented.
- Follow-up reporting is documented.
- Weather, trends, and recommended actions expectations are documented.
- Manual report assembly is documented.
- Report delivery readiness is documented without activation.
- Explicit approval gates remain intact.
