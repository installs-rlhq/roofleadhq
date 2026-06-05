# First Paid Contractor Onboarding Runbook

Date: 2026-06-05

## Purpose

Use this runbook to onboard the first paid contractor into the RoofLeadHQ Founder-Led Launch Program.

This process is intentionally founder-led. Jason monitors setup, reviews lead quality, and coordinates follow-up before any production automation is approved.

Reference readiness docs and tools:

- Final readiness summary: `docs/FIRST_PAID_PILOT_FINAL_READINESS_SUMMARY.md`
- Aggregate verifier: `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Operator status page: `website/dashboard/pilot-status.html`

## 1. Pre-Call Prep

Before the onboarding call:

- Run `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`.
- Confirm the summary remains `demo_ready_with_live_automation_disabled`.
- Open `website/dashboard/pilot-status.html` and confirm the operator view is available.
- Review `docs/FIRST_PAID_PILOT_FINAL_READINESS_SUMMARY.md`.
- Prepare a short explanation of the Founder-Led Launch Program.
- Confirm that production SMS, Calendar, Vapi outbound actions, Resend emails, and Lindy automations remain disabled.

Call framing:

- RoofLeadHQ is being launched in a controlled founder-led workflow.
- The goal is to help the contractor respond faster, track lead flow, and book inspections / book appointments.
- Jason reviews the operational flow before additional automation is enabled.
- Do not make hard outcome promises about jobs, revenue, or fixed appointment volume.

## 2. Contractor Intake Info Needed

Collect and confirm:

- Business name
- Owner name
- Owner email
- Primary phone number
- Service area
- Timezone
- Website URL
- Preferred lead sources to track
- Existing CRM or lead inbox process
- Current appointment booking process
- Dedicated Twilio number assignment, if applicable
- Dashboard recipient email
- Billing/setup status and any founder-approved terms

Operational notes to capture:

- What counts as a good roofing lead
- When the contractor wants a homeowner contacted
- When a lead should be paused, ignored, or escalated
- Preferred language for homeowner follow-up
- Business hours and off-hours handling expectations

## 3. Dashboard Access

Setup and verify:

- Create or confirm the roofer record.
- Generate or confirm dashboard access token.
- Confirm dashboard access is enabled.
- Confirm the dashboard URL is ready for the contractor.
- Confirm the dashboard link to `First Paid Pilot Status` remains present.
- Confirm the operator view at `website/dashboard/pilot-status.html` is for internal use only.

Founder-led handoff:

- Show the contractor the dashboard overview.
- Explain that the dashboard is read-only from the contractor view.
- Explain that Jason is monitoring the first launch phase.
- Avoid presenting disabled automations as live.

## 4. Manual Outreach Setup And Check

Manual Outreach is the safest first workflow to validate with a contractor.

Before testing:

- Confirm the contractor understands the Manual Outreach command format.
- Confirm source keywords that should be used.
- Confirm the dedicated number mapping, if applicable.
- Confirm no customer-facing SMS automation is enabled.

Smoke check:

- Run the aggregate verifier.
- Confirm Manual Outreach smoke status passes in the operator status page.
- Confirm dashboard Manual Outreach visibility is available.

Founder review:

- Review any manually entered lead before contacting the homeowner.
- Check phone number, source, issue, urgency, and whether the lead is appropriate for the contractor.
- Confirm the contractor has not already contacted the homeowner through another channel.

## 5. Vapi Phone Lead Intake Check

Vapi phone lead intake is prepared as an intake path, not a fully automated outbound workflow.

Before use:

- Confirm the Vapi phone lead smoke verifier passes through the aggregate verifier.
- Confirm no outbound Vapi live API trigger is active.
- Confirm Vapi write/automation behavior remains disabled unless separately approved.
- Confirm how phone leads should be reviewed before any homeowner follow-up.

Review before homeowner contact:

- Caller name, phone number, and call summary
- Roofing issue or requested service
- Service area fit
- Appointment intent or requested time
- Duplicate lead risk
- Whether the contractor should contact the homeowner manually

## 6. Reporting Expectations

For the first paid contractor, reporting should remain founder-led unless production email sending is explicitly approved.

Set expectations:

- Weekly/monthly report templates and placeholders are available.
- Reporting smoke verifier passes through the aggregate verifier.
- Resend production report sending is not wired to a route, cron, or scheduler.
- Jason may prepare manual status updates during the Founder-Led Launch Program.

Recommended report topics:

- New leads received
- Leads needing attention
- Manual Outreach activity
- Phone lead intake activity
- Booked inspections / booked appointments
- Follow-up recommendations
- Safety notes or operational blockers

## 7. Daily Monitoring Checklist

Daily founder-led review:

- Run `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`.
- Open `website/dashboard/pilot-status.html`.
- Confirm all live automation statuses are disabled.
- Review dashboard leads needing attention.
- Review Manual Outreach activity.
- Review any Vapi phone lead intake items.
- Review upcoming booked inspections / booked appointments.
- Check for duplicate or stale leads.
- Decide which homeowner leads are safe to contact manually.
- Record any contractor feedback or workflow issue.

## 8. Before Contacting Homeowner Leads

Review each lead before outreach:

- Homeowner name and phone number
- Lead source
- Roofing issue or requested service
- Urgency and timing
- Service area fit
- Whether the contractor has already contacted the homeowner
- Whether the homeowner opted out or requested no contact
- Whether the message is inside approved contact expectations
- Whether the contractor should contact manually instead

Do not contact a homeowner through automated production SMS unless that path has separate explicit approval.

## 9. Escalation And Safety Boundaries

Escalate to founder review before:

- Enabling homeowner SMS
- Enabling roofer SMS
- Enabling follow-up dispatcher live sending
- Creating Calendar events automatically
- Enabling Vapi outbound actions
- Sending Resend production emails
- Triggering Lindy production automations
- Changing contractor-facing promises or launch terms

Stop and review if:

- A lead looks duplicated
- A homeowner asks not to be contacted
- A contractor reports an incorrect lead
- A workflow status looks inconsistent
- The operator status page shows any live automation as active
- The aggregate verifier reports anything other than `demo_ready_with_live_automation_disabled`

## 10. Closeout After Onboarding Call

After the call:

- Confirm contractor info is complete.
- Confirm dashboard access was delivered.
- Confirm the contractor understands the Founder-Led Launch Program.
- Confirm what Jason will monitor daily.
- Confirm Manual Outreach expectations.
- Confirm whether Vapi phone lead intake is being observed only or used in a controlled way.
- Confirm reporting cadence and format.
- Re-run the aggregate verifier.
- Record any next steps before broader automation is considered.
