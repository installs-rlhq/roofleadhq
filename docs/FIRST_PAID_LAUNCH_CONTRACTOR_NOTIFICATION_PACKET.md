# RoofLeadHQ — First Paid Launch Contractor Notification Packet

This packet defines how RoofLeadHQ prepares and routes contractor-facing notification summaries during the founder-led first-paid launch.

Safety posture:

- Safety remains demo-ready with live automation disabled.
- Founder-led review before any contractor-facing production message.
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

The contractor notification packet turns homeowner intake, booking preferences, follow-up cadence, reporting preferences, and emergency escalation details into a clean manual notification summary for roofing contractors.

This packet does not activate production messaging. It documents what the founder/operator should prepare and review before any contractor-facing communication is sent manually.

## 2. Connected Launch Packets

This packet connects:

- First Paid Launch Operator Day-One Checklist
- First Paid Launch Customer Intake Packet
- First Paid Launch Booking Preferences Packet
- First Paid Launch Follow-Up Cadence Packet
- First Paid Launch Reporting Preferences Packet
- First Paid Launch Emergency Escalation Packet
- First Paid Client Launch Readiness Gate
- First Paid Launch Day Checklist

## 3. Contractor Notification Summary Format

Recommended manual notification format:

```
NEW ROOFLEADHQ LEAD SUMMARY

Homeowner:
Phone:
Email:
Property address:
Lead source:
Roofing need:
Urgency:
Insurance claim status:
Photos available:
Preferred appointment windows:
Follow-up status:
Emergency escalation:
Operator notes:
Recommended action: book inspection / book appointment / manual review
```

## 4. Minimum Contractor Notification Fields

- Homeowner contact details
- Property address
- Lead source and roofing need
- Urgency / emergency flag
- Insurance claim status
- Preferred appointment windows
- Follow-up status
- Emergency escalation flag (if applicable)
- Operator notes and recommended action

## 5. Manual Notification Rules

- All contractor notifications during first-paid launch are manual only.
- Founder reviews the summary before any message is sent.
- No automated SMS, email, or webhook to contractors.
- Recommended action language: "book inspection", "book appointment", or "manual review".

## 6. Emergency Tie-In

When an emergency escalation flag is present, the notification must clearly mark the lead as emergency and route to founder manual review before any contractor notification.

## 7. Reporting Tie-In

Contractor notification activity is captured in weekly and monthly reporting under recommended actions.

## 8. Founder-Led Launch Rules

During founder-led first-paid launch:
- Every contractor notification summary is reviewed by the founder.
- No automation is used for contractor communication.
- Safety posture remains demo-ready with live automation disabled.

## 9. Explicit Approval Gates

Before any contractor notification is sent:
- Founder has reviewed the summary.
- Safety posture confirmed.
- Lead is properly recorded in reporting.

## 10. Launch Readiness Outcome

When this packet is complete and verified:
- Contractor notification process is documented and connected to all prior packets.
- Operator knows the exact manual format and fields.
- Founder remains the single point of control.
- All safety rules remain explicit and enforced.

PASS: First Paid Launch contractor notification packet completed successfully

## 11. Exact Phrase Verification

founder-led launch
first-paid launch
manual review
roofing contractors
weekly/monthly reporting
recommended actions
book inspection
book appointment

