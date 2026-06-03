# Pilot Client Setup Checklist

Date: 2026-06-02

## Purpose

Checklist for setting up the first paid RoofLeadHQ pilot client safely.

## Client Details To Collect

- Business name
- Owner name
- Owner email
- Owner phone
- Website
- Service area
- Time zone
- Main office address
- Preferred inspection scheduling hours

## Lead Source Setup

Confirm which sources are included in the pilot:

- Website form
- Google Business Profile
- Phone calls
- Text messages
- Email leads
- Angi
- Thumbtack
- HomeAdvisor
- Referrals
- Other marketplace leads

## RoofLeadHQ Setup

Required before go-live:

- Roofer record created
- Dashboard slug created
- Dashboard access token generated
- Dashboard access enabled
- Twilio number assigned
- Twilio number mapped to roofer
- Safe production flags verified disabled unless approved

## Required Safety Flags

These must remain disabled unless explicitly approved:

- calendar_sync_enabled=false
- sms_confirmation_enabled=false
- homeowner SMS disabled
- roofer SMS disabled
- live Vapi production actions disabled
- Resend production emails disabled
- Lindy production automations disabled

## Dashboard Verification

Confirm:

- Dashboard token works
- No-token request returns Unauthorized
- Metrics load
- Leads needing attention load
- Manual Outreach section loads
- Dashboard remains read-only

## Manual Outreach Verification

Confirm roofer understands:

- Text homeowner number to RoofLeadHQ-connected number
- Add source keyword if known
- Example: +15557778888 Angi
- This creates tracking records
- This does not automatically text homeowner unless separately approved

## Billing / Agreement

Confirm:

- Setup payment completed or intentionally waived
- Monthly plan selected or pilot billing terms documented
- Payment method/process documented
- Founder-led launch expectations explained
- First-Month Confidence Promise explained
- No hard appointment guarantee promised

## Go-Live Decision

Pilot can go live when:

- Client record is created
- Dashboard access works
- Twilio mapping is verified
- Safety flags are confirmed
- Daily monitoring checklist is ready
- Client knows what is and is not automated

## Post-Go-Live Monitoring

Use:

- docs/DAILY_PILOT_OPERATIONS_CHECKLIST.md
- docs/FIRST_PAID_PILOT_READINESS_CHECKLIST.md

