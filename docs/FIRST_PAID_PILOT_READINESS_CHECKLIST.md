# First Paid Pilot Readiness Checklist

Date: 2026-06-02

## Current Status

Manual Outreach is verified for backend hardening, operational QA, and dashboard visibility.

Dashboard token auth is working.

SMS safety, opt-out workflow, dispatcher planner, dispatcher data shape, and dispatcher execution planning are verified in test-only/read-only mode.

Onboarding script creates dashboard access tokens and keeps production action flags disabled.

No live homeowner SMS, roofer SMS, Calendar, Vapi, Resend, or Lindy production triggers are enabled.

## Pilot Goal

Prepare RoofLeadHQ for the first real paid roofing contractor using a founder-led launch model.

The goal is a safe, monitored, semi-managed pilot before scalable automation.

## Must Be Ready Before First Paid Pilot

### 1. Client Onboarding

- Confirm roofer business name
- Confirm owner name and email
- Confirm service area
- Confirm Twilio number assignment
- Confirm dashboard access token creation
- Confirm dashboard URL delivery process
- Confirm billing/setup payment process

Status: Not fully verified for real client

### 2. Dashboard Access

- Token-based dashboard auth works
- No-token request returns Unauthorized
- Roofer resolves from token
- Manual Outreach section displays real data
- Dashboard remains read-only

Status: Verified with test roofer

### 3. Manual Outreach

- Roofer can text homeowner phone number to dedicated Twilio number
- Source keywords map correctly
- Lead/workflow data is created
- Duplicate Twilio retries are protected
- Twilio signature validation is active
- Dashboard shows manual activity
- No customer-facing SMS is sent yet

Status: Verified for safe non-SMS pilot use

### 4. Homeowner SMS

- First outreach templates approved
- Follow-up templates approved
- Opt-out handling approved
- Quiet-hour rules approved
- Dispatcher safety verified in test-only/read-only mode
- Dispatcher execution planner verified with no writes and no SMS sent
- Failed message logging not live-enabled

Status: Planning/test-only verified; production SMS still disabled

### 5. Vapi Phone Lead Path

- Vapi webhook dry-run exists
- Roofer lookup works by destination number
- Payload shapes tested
- Duplicate provider_call_id protection exists
- Supabase write path not enabled
- No live Vapi production actions enabled

Status: Prep only / not pilot-ready for live phone automation

### 6. Calendar Booking

- Booking rules approved
- Calendar connection path approved
- Per-roofer flag required before activation
- No production Calendar creation enabled

Status: Not ready / disabled

### 7. Reports

- Weekly report format approved
- Report data source defined
- Manual report process available if automation is not ready
- Resend production report sending not enabled without approval
- Read-only reporting smoke verifier: `node backend/scripts/verify-reporting-smoke-readonly.js`

Status: Manual report acceptable for first pilot

### 8. Internal Monitoring

- Manual Outreach QA docs exist
- Dashboard visibility QA documented
- Need daily pilot monitoring checklist
- Need failure/escalation process

Status: Partially ready

## Current Pilot-Safe Capabilities

- Onboard roofer record
- Generate dashboard token
- Keep production flags disabled
- Receive Manual Outreach command
- Create backend records
- Track activity in dashboard
- Manually monitor and follow up as founder

## Current Pilot Blockers

1. Homeowner SMS templates are not approved for live sending.
2. Follow-up dispatcher is verified only in test/read-only mode and is not live-enabled.
3. Calendar booking automation is not enabled.
4. Vapi write path is not enabled.
5. Internal pilot monitoring checklist is documented and ready for founder-led use.
6. Client-facing setup/payment flow is documented; per-client payment/waiver must be confirmed before go-live.

## Recommended First Paid Pilot Model

Use a founder-led, controlled pilot:

- Roofer gets dashboard access.
- Manual Outreach can be tested safely.
- Jason manually monitors leads and dashboard.
- Homeowner outreach remains manual or explicitly approved before activation.
- Calendar/SMS/Vapi production actions remain disabled until separately approved.

## Next Recommended Task

Finalize internal pilot monitoring and client-facing setup/payment flow.

Purpose:
Make sure the first paid pilot can be monitored safely while SMS, Calendar, Vapi, Resend, and Lindy production actions remain disabled unless explicitly approved.
