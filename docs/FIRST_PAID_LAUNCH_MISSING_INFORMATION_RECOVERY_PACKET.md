# RoofLeadHQ — First Paid Launch Missing Information Recovery Packet

This packet defines how RoofLeadHQ identifies incomplete lead records during the founder-led first-paid launch and turns missing information into manual recommended actions, operator review, contractor notification readiness, follow-up readiness, and weekly/monthly reporting.

Safety posture:

- Safety remains demo-ready with live automation disabled.
- No live SMS/Twilio sends.
- No production Supabase writes.
- No Vapi production webhook ingestion.
- No live Vapi webhook route.
- No Calendar booking activation.
- No Resend production activation.
- No Lindy production activation.
- No cron activation.
- No scheduler activation.
- No dispatcher activation.
- No public production route activation.
- No secrets exposure.
- No destructive operations.

## 1. Purpose

The missing information recovery packet identifies incomplete lead records and provides a structured manual process for recovering the minimum data needed to support contractor notification, follow-up, and reporting during founder-led first-paid launch.

## 2. Connected Launch Packets

This packet connects:

- First Paid Launch Operator Day-One Checklist
- First Paid Launch Customer Intake Packet
- First Paid Launch Booking Preferences Packet
- First Paid Launch Follow-Up Cadence Packet
- First Paid Launch Reporting Preferences Packet
- First Paid Launch Emergency Escalation Packet
- First Paid Launch Contractor Notification Packet
- First Paid Launch Appointment Outcome Packet
- First Paid Launch Lead Source Quality Packet
- First Paid Client Launch Readiness Gate
- First Paid Launch Day Checklist

## 3. Missing Information Categories

Supported missing information categories:

- missing homeowner name
- missing phone number
- missing email
- missing property address
- missing city/state/ZIP
- missing roof issue description
- missing roof type
- missing urgency/timeline
- missing insurance claim status
- missing appointment preference
- missing lead source
- missing source detail
- missing contractor routing preference
- missing emergency escalation status
- missing appointment outcome
- missing follow-up status
- incomplete lead classification

## 4. Incomplete Lead Classification

Any lead missing one or more of the above categories is classified as an incomplete lead and flagged for manual review.

## 5. Manual Review Rules

All incomplete leads require manual review by the founder or operator before contractor notification or follow-up actions are prepared.

## 6. Founder/Operator Recovery Actions

Founder/operator recovery actions include direct outreach to obtain the missing fields using approved manual channels only.

## 7. Contractor Notification Tie-In

Contractor notification summaries must clearly flag any missing information categories and note that the lead is incomplete until recovery is complete.

## 8. Follow-Up Cadence Tie-In

Follow-up cadence is paused for incomplete leads until the minimum required fields are recovered or the lead is marked for manual review.

## 9. Emergency Escalation Tie-In

Emergency escalation leads with missing information are prioritized for immediate founder review and recovery.

## 10. Lead Source Quality Tie-In

Missing information recovery status is cross-referenced with lead source quality to identify patterns in incomplete leads by source.

## 11. Appointment Outcome Tie-In

Appointment outcomes for incomplete leads are not recorded until the minimum information is recovered.

## 12. Weekly/Monthly Reporting Tie-In

Missing information recovery activity is captured in weekly leads report and monthly leads report under recommended actions, including counts of incomplete leads and recovery status.

## 13. Recommended Actions

- book inspections
- book appointments
- manual review
- follow-up needed

## 14. Explicit Approval Gates

Before acting on any incomplete lead:
- Founder has reviewed the missing information classification.
- Safety posture confirmed.
- Lead remains in demo-ready state.

## 15. Launch Readiness Outcome

When this packet is complete and verified:
- Missing information recovery process is documented and connected to all prior packets.
- Operator knows the exact missing information categories and recovery workflow.
- Founder remains the single point of manual control.
- All safety rules remain explicit and enforced.

PASS: First Paid Launch missing information recovery packet completed successfully

## 16. Exact Phrase Verification

founder-led launch
first-paid launch
missing information recovery
incomplete lead
recommended actions
book inspections
book appointments
manual review
weekly leads report
monthly leads report

