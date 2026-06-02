# Founder-Led Pilot Runbook

Date: 2026-06-02

## Purpose

Operational runbook for running the first paid RoofLeadHQ pilot safely before full automation is enabled.

## Pilot Model

RoofLeadHQ is founder-led during launch.

Jason monitors the system daily, handles exceptions manually, and only enables automation after explicit approval and verification.

## What Is Active

Allowed during pilot:

- Roofer onboarding record
- Dashboard access token
- Read-only dashboard
- Manual Outreach tracking
- Backend workflow records
- Daily founder review
- Manual client updates

## What Is Not Active Unless Approved

Do not enable:

- homeowner SMS
- roofer SMS
- Google Calendar creation
- live Vapi production actions
- Resend production emails
- Lindy production automations

## Daily Operating Flow

### Morning

1. Check backend health.
2. Check dashboard token access.
3. Review leads needing attention.
4. Review Manual Outreach activity.
5. Review upcoming booked inspections.
6. Note urgent follow-ups.

### Midday

1. Check for new Manual Outreach activity.
2. Check for homeowner replies or manual updates.
3. Review workflow errors.
4. Send manual client update if useful.

### End Of Day

1. Review unresolved leads.
2. Record issues.
3. Record client feedback.
4. Identify next-day follow-ups.
5. Document product blockers.

## Manual Outreach Handling

When roofer submits a lead:

1. Confirm lead appears in dashboard.
2. Confirm source is correct when provided.
3. Confirm homeowner phone is masked in dashboard.
4. Confirm no SMS was sent automatically.
5. Decide whether Jason should manually follow up.

Example roofer command:

+15557778888 Angi

## Leads Needing Attention Handling

Priority order:

1. Urgent leak or storm damage
2. Homeowner replied but not booked
3. Missing address
4. Manual Outreach lead not contacted
5. Failed workflow or unclear status

## Client Communication

Use short updates.

Template:

Quick RoofLeadHQ update:

- New leads:
- Manual Outreach activity:
- Leads needing attention:
- Booked inspections:
- Recommended next step:

## Incident Handling

If something unexpected happens:

1. Stop and document it.
2. Do not enable automation to fix it.
3. Confirm no unwanted SMS, Calendar, Vapi, Resend, or Lindy action happened.
4. Add notes to the appropriate pilot checklist.
5. Fix only the narrow blocker.

## Go-Live Expansion Gates

Do not move beyond founder-led pilot until these are approved:

- homeowner SMS templates
- opt-out handling
- quiet-hour rules
- follow-up dispatcher
- Calendar booking rules
- Vapi write path
- report sending process

## Success Criteria

The pilot is successful if:

- Leads are captured reliably.
- Manual Outreach is understandable.
- Dashboard gives useful visibility.
- Jason can monitor and intervene daily.
- Roofer sees value before full automation.
- No unsafe automation fires unexpectedly.
