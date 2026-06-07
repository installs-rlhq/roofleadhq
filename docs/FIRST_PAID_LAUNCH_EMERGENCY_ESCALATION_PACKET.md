# RoofLeadHQ — First Paid Launch Emergency Escalation Packet

This packet defines how RoofLeadHQ handles urgent homeowner situations during the founder-led first-paid launch.

Safety posture:

- Demo-ready with live automation disabled.
- Founder-led review before any production action.
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

The emergency escalation packet helps the operator identify urgent roofing leads, stop normal follow-up when needed, and route the situation to manual founder-led review.

This packet connects:

- First Paid Launch Operator Day-One Checklist
- First Paid Launch Customer Intake Packet
- First Paid Launch Booking Preferences Packet
- First Paid Launch Follow-Up Cadence Packet
- First Paid Launch Reporting Preferences Packet
- First Paid Client Launch Readiness Gate
- First Paid Launch Day Checklist

## 2. Emergency Escalation Triggers

Escalate manually when a homeowner mentions any of the following:

- Active leak
- Interior water intrusion
- Water entering a ceiling, wall, attic, bedroom, kitchen, or electrical area
- Recent hail, wind, or storm damage
- Tarp request
- Tree impact or visible structural damage
- Unsafe roof access
- Elderly or vulnerable homeowner situation
- After-hours emergency
- Insurance claim deadline
- Repeat urgent caller
- Angry or escalated homeowner
- Homeowner says they already called multiple roofers
- Homeowner says the damage is getting worse
- Homeowner asks for same-day help

## 3. Operator Stop Conditions

When an emergency trigger appears, the operator should stop treating the lead as a routine appointment request.

The operator should not:

- Promise availability
- Promise same-day service
- Promise claim approval
- Promise repair outcome
- Promise pricing
- Book a live appointment automatically
- Send live SMS automatically
- Write to production Supabase automatically
- Trigger Vapi, Resend, Lindy, Calendar, cron, scheduler, or dispatcher automation

The operator should:

- Capture the emergency details
- Mark the lead for manual review
- Notify the founder/operator through the approved manual path
- Recommend direct contractor review before any automation is activated

## 4. Minimum Emergency Intake Fields

Capture these fields when an emergency trigger is detected:

- Homeowner name and phone
- Property address
- Description of the emergency (leak, water intrusion, storm damage, etc.)
- Time sensitivity (after-hours, insurance deadline, worsening condition)
- Vulnerable homeowner flag (elderly, disabled, etc.)
- Current tarp status or roof access safety

## 5. Manual Escalation Owner

Founder is the manual escalation owner for all emergency leads during first-paid launch.

All escalations route to founder review before any automated follow-up, booking, or contractor notification is activated.

## 6. Contractor Notification Rules

Contractor notification occurs only after founder manual review and explicit approval.

No automated contractor notification for emergency leads.

## 7. Emergency Follow-Up Tie-In

Emergency leads bypass the normal follow-up cadence packet.

They are held for manual founder review and do not receive automated SMS or Vapi follow-up.

## 8. Reporting Tie-In

Emergency escalations are recorded in weekly and monthly reporting.

Recommended actions section of the report must flag emergency leads separately with founder review status.

## 9. Founder-Led Launch Rules

During founder-led first-paid launch:

- Every emergency lead receives founder review
- No automation is activated on emergency leads without explicit founder approval
- Safety posture remains demo-ready with live automation disabled

## 10. Explicit Approval Gates

Before any emergency lead moves beyond manual review, the following gates must pass:

- Founder has reviewed the lead details
- Safety posture confirmed (no live automation)
- Contractor has been notified manually if appropriate
- Lead is marked in reporting for follow-up tracking

## 11. Launch Readiness Outcome

When this packet is complete and verified:

- Emergency escalation handling is documented and connected to all prior packets
- Operator knows exactly when to stop normal flow and escalate
- Founder remains the single point of manual control
- All safety rules remain explicit and enforced

PASS: First Paid Launch emergency escalation packet completed successfully

## 12. Business Language Requirements

All documentation and operator guidance must use approved language:

- Help roofing contractors book inspections and book appointments
- Founder-led launch and first-paid launch framing
- Emergency escalation requires manual review
- Weekly and monthly reporting includes recommended actions


## 13. Exact Phrase Verification

This section ensures exact required phrases for verifier:

founder-led launch
first-paid launch
emergency escalation
manual review
roofing contractors
weekly/monthly reporting
recommended actions
book inspections
book appointments

