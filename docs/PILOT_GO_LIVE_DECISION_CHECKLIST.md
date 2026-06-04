# Pilot Go-Live Decision Checklist

Date: 2026-06-02

## Purpose

Final yes/no checklist before allowing the first paid RoofLeadHQ pilot client to go live.

## Required Go-Live Status

### Client Setup

- Pilot client details collected
- Roofer record created
- Dashboard slug created
- Dashboard access token generated
- Dashboard access enabled
- Twilio number assigned
- Twilio number mapped to roofer

Status: Pending per client

### Dashboard

- Token auth works
- No-token request returns Unauthorized
- Metrics load
- Leads Needing Attention loads
- Manual Outreach data loads
- Dashboard remains read-only

Status: Required before go-live

### Manual Outreach

- Roofer understands how to text in a lead
- Source keyword examples provided
- Manual Outreach creates backend records
- Duplicate webhook protection verified
- Twilio signature validation verified
- Dashboard visibility verified

Status: Required before go-live

### Production Safety

These must remain disabled unless separately approved:

- homeowner SMS
- roofer SMS
- Calendar creation
- live Vapi actions
- Resend production emails
- Lindy production automations

Status: Required before go-live

### Daily Monitoring

- Daily operations checklist exists
- Jason has review cadence
- Escalation process is manual/founder-led
- Known blockers are documented

Status: Required before go-live

### Billing / Agreement

- Setup payment status documented, including paid, waived, or deferred terms
- Pilot billing terms documented, including plan, waived period, deferred start, or non-billable pilot status
- Payment method/process documented, if applicable
- Founder-led launch expectations explained
- First-Month Confidence Promise explained
- No hard appointment guarantee promised

Status: Required before go-live

## Go-Live Decision

The pilot is approved for go-live only if:

- Client setup is complete
- Dashboard access works
- Manual Outreach path is verified
- Safety flags remain disabled
- Jason can monitor daily
- Client understands what is automated and what is founder-led

## Not Approved For Go-Live If

- Dashboard token does not work
- Twilio number is not mapped
- Safety flags are unknown
- Client expects automatic homeowner SMS before approval
- Client expects Calendar booking before approval
- Client expects guaranteed jobs or revenue

## Go-Live Notes

Use this checklist together with:

- docs/PILOT_CLIENT_SETUP_CHECKLIST.md
- docs/DAILY_PILOT_OPERATIONS_CHECKLIST.md
- docs/FIRST_PAID_PILOT_READINESS_CHECKLIST.md
