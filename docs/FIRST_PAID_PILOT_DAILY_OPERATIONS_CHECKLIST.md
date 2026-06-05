# First Paid Pilot Daily Operations Checklist

Date: 2026-06-05

## Purpose

Use this checklist each day during the RoofLeadHQ Founder-Led Launch Program.

The daily goal is to keep the first paid contractor monitored, review lead activity, help book inspections / book appointments, and confirm production automations remain disabled unless explicitly approved.

Reference docs and tools:

- Contractor onboarding runbook: `docs/FIRST_PAID_CONTRACTOR_ONBOARDING_RUNBOOK.md`
- Final readiness summary: `docs/FIRST_PAID_PILOT_FINAL_READINESS_SUMMARY.md`
- Aggregate verifier: `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- Operator status page: `website/dashboard/pilot-status.html`

## Daily Start

- Run `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`.
- Confirm the readiness summary is `demo_ready_with_live_automation_disabled`.
- Open `website/dashboard/pilot-status.html`.
- Confirm all live automation statuses are disabled.
- Stop and investigate before contacting leads if any status is active or unknown.

## Dashboard Review

- Open the contractor dashboard.
- Review leads needing attention.
- Review upcoming booked inspections / booked appointments.
- Check source mix and recent lead activity.
- Note stale, duplicate, or unclear leads.
- Confirm the dashboard remains read-only for the contractor.

## Manual Outreach Review

- Review Manual Outreach activity.
- Confirm new manual leads have expected source details.
- Check paused or stopped follow-up states.
- Confirm no customer-facing SMS automation was enabled.
- Decide which Manual Outreach leads need founder review before homeowner contact.

## Vapi Phone Lead Intake Review

- Review Vapi phone lead intake items.
- Check caller name, phone number, requested service, and appointment intent.
- Check whether the lead fits the contractor service area.
- Check for duplicates against existing leads.
- Confirm no outbound Vapi live API trigger is active.
- Decide whether the contractor should contact the homeowner manually.

## Reporting And Manual Updates

- Review any reporting notes from the prior day.
- Prepare manual update notes if needed.
- Include lead count, leads needing attention, Manual Outreach activity, phone lead intake, and booked inspections / booked appointments.
- Confirm Resend production report sending is not wired to a route, cron, or scheduler.
- Save contractor feedback or operational blockers for the next check-in.

## Before Contacting Homeowner Leads

Review each homeowner lead before outreach:

- Homeowner name and phone number
- Lead source
- Roofing issue or requested service
- Urgency and requested timing
- Service area fit
- Duplicate lead risk
- Whether the contractor already contacted the homeowner
- Whether the homeowner requested no contact or opted out
- Whether manual contractor follow-up is better than founder-led contact

Do not use automated production SMS unless that path has separate explicit approval.

## Live Automation Safety Check

Confirm these remain disabled:

- Homeowner SMS
- Roofer SMS
- Follow-up dispatcher live sending
- Calendar event creation or synchronization
- Vapi outbound actions
- Resend production emails
- Lindy production automations

Stop work and investigate if any live automation appears active.

## Record Blockers And Feedback

Record:

- Contractor feedback
- Lead quality concerns
- Missed or unclear homeowner details
- Manual follow-up decisions
- Duplicate or stale lead issues
- Dashboard or operator status issues
- Reporting questions
- Any request to enable additional automation

Escalate before changing launch terms, enabling automation, or making promises about jobs, revenue, or fixed appointment volume.

## Daily Closeout

- Re-run `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js` if any operational issue was found.
- Confirm all live automation remains disabled.
- Confirm next contractor follow-up step.
- Confirm any homeowner contact decisions are documented.
- Carry unresolved blockers into the next daily review.
