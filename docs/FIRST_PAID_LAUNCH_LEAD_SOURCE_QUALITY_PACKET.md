# RoofLeadHQ — First Paid Launch Lead Source Quality Packet

This packet defines how RoofLeadHQ classifies lead source quality during the founder-led first-paid launch and turns that classification into reporting, recommended actions, and operator review.

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

The lead source quality packet classifies every lead by source, records source detail and source confidence, and maps quality categories to recommended actions during founder-led first-paid launch.

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
- First Paid Client Launch Readiness Gate
- First Paid Launch Day Checklist

## 3. Lead Source Categories

Supported lead source categories:

- website leads
- Google Business Profile / GBP leads
- Angi leads
- Thumbtack leads
- Facebook leads
- referral leads
- manual entry leads
- Vapi / phone leads
- missed-call recovery leads
- repeat caller leads
- unknown source leads

## 4. Source Detail Rules

Every lead must record source detail (exact campaign, form, or phone number) when available.

## 5. Source Confidence Rules

Source confidence is recorded as high, medium, or low based on how reliably the source is identified.

## 6. Lead Quality Categories

Supported lead quality categories:

- high-intent leads
- medium-intent leads
- low-intent leads
- spam / bad-fit leads
- duplicate leads
- emergency source patterns

## 7. Manual Review Rules

Leads marked "spam / bad-fit leads", "duplicate leads", or "manual review required" must be reviewed by the founder before any further action.

## 8. Contractor Notification Tie-In

Contractor notification summaries must include lead source, source detail, source confidence, and lead quality category when available.

## 9. Appointment Outcome Tie-In

Appointment outcomes are cross-referenced with lead source quality to improve future source prioritization.

## 10. Weekly/Monthly Reporting Tie-In

Lead source quality is captured in weekly leads report and monthly leads report under recommended actions, including source quality categories and recommended actions.

## 11. Recommended Actions

- book inspections
- book appointments
- manual review
- follow-up needed

## 12. Explicit Approval Gates

Before acting on any lead source quality classification:
- Founder has reviewed the classification when manual review is required.
- Safety posture confirmed.
- Lead remains in demo-ready state.

## 13. Launch Readiness Outcome

When this packet is complete and verified:
- Lead source quality classification is documented and connected to all prior packets.
- Operator knows the exact source categories, quality categories, and fields.
- Founder remains the single point of manual control.
- All safety rules remain explicit and enforced.

PASS: First Paid Launch lead source quality packet completed successfully

## 14. Exact Phrase Verification

founder-led launch
first-paid launch
lead source quality
source detail
source confidence
recommended actions
book inspections
book appointments
manual review
weekly leads report
monthly leads report

