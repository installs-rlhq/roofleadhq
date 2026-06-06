# First Paid Launch Operator Day-One Checklist

This checklist protects RoofLeadHQ first-paid launch execution while keeping the system demo-ready with live automation disabled.

## 1. Terminal 1 Source-of-Truth Verification

Run from Terminal 1 only:

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

## 2. Environment Sanity Check

Confirm:

- Supabase is the source of truth.
- Retell is deprecated/disabled.
- Vapi is a future phone lead source only.
- Lindy is internal/back-office only.
- Production activation remains explicitly gated.

## 3. Demo-Mode Confirmation

Confirm:

- Safety remains demo-ready with live automation disabled.
- No customer-impacting live automation is active.
- Demo, dry-run, read-only, and manual review steps are clearly labeled.

## 4. First Paid Customer Readiness Review

Confirm:

- business name
- main contact
- service area
- phone number
- email
- website
- calendar or booking preference
- lead source list
- emergency or urgent lead policy
- reporting expectations

## 5. Roofer Business Info Checklist

Capture:

- company name
- owner/operator name
- office phone
- approved mobile phone if applicable
- public website
- Google Business Profile link if available
- service area cities/counties
- roofing services offered
- insurance/storm damage handling preferences
- preferred appointment language

Use “book inspections” or “book appointments,” not “book jobs.”

## 6. Lead Source Intake Checklist

Review:

- website forms
- Google Business Profile
- Facebook/Meta leads
- phone calls
- text messages
- email inboxes
- third-party lead vendors
- manual referrals

Document which sources are manual on day one and which are future automation candidates.

## 7. Calendar and Booking Preferences Checklist

Confirm:

- appointment types
- inspection duration
- available days
- available hours
- buffer time
- service area limits
- emergency appointment rules
- reschedule/cancel policy
- manual operator handoff process

Calendar automation may not be activated without explicit approval.

## 8. Emergency or Urgent Lead Handling Policy

Define operator handling for:

- active leaks
- storm damage
- interior water intrusion
- elderly or vulnerable homeowner situations
- unsafe roof access
- after-hours requests
- insurance claim urgency

Emergency leads should be escalated manually until live automation is explicitly approved.

## 9. Follow-Up Cadence Review

Confirm:

- initial response timing
- first follow-up
- second follow-up
- reminder timing
- missed appointment handling
- closed/lost handling
- opt-out handling

No live SMS/Twilio sends may occur without explicit approval.

## 10. Reporting Expectations

Confirm:

- weekly leads report
- monthly leads report
- lead source summary
- appointment summary
- missed-call recovery summary
- follow-up summary
- recommended actions
- roofing news, trends, and weather context where appropriate

## 11. Operator Manual Handoff

The operator must know:

- what is manual
- what is demo-only
- what is read-only
- what requires approval
- what is not yet enabled
- how to escalate a lead
- how to record customer feedback
- how to stop if unexpected production behavior appears

## 12. Explicit Approval Gates Before Live Activation

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

## 13. Day-One Stop Conditions

Stop immediately if:

- HEAD and origin/main do not match.
- Work is not happening in `/root/roofleadhq`.
- A live route, cron, scheduler, dispatcher, webhook, or sender is about to be activated.
- A command would write to production Supabase.
- A command would send SMS/Twilio, Vapi, Calendar, Resend, or Lindy production traffic.
- Secrets would be exposed.
- The work moves outside the named safe scope.

## 14. Day-One Completion Criteria

Day-one readiness is complete only when:

- customer information is complete
- lead sources are documented
- booking preferences are documented
- emergency handling is documented
- follow-up expectations are documented
- reporting expectations are documented
- operator handoff is complete
- live automation remains disabled
- approval gates remain intact
