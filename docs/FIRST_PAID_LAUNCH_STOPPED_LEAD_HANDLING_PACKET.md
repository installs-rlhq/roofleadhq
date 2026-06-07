# RoofLeadHQ — First Paid Launch Stopped Lead Handling Packet

This packet defines how RoofLeadHQ safely handles stopped leads during founder-led first-paid launch.

Safety posture:

- Safety remains demo-ready with live automation disabled.
- No live SMS/Twilio sends.
- No production Supabase writes.
- No Supabase schema mutation.
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

The stopped lead handling packet defines the manual process for managing leads that have been stopped due to opted_out status, stopped_reason, or other manual review decisions during founder-led first-paid launch.

## 2. Current Stop-Handling Gap

The current system lacks explicit stopped lead handling rules that connect opted_out, stopped_reason, the manual review queue, and follow-up cadence.

## 3. Stopped Lead Definition

A stopped lead is any lead that has been marked opted_out = true or has a non-null stopped_reason, or has been manually placed in a stopped state by founder/operator review.

## 4. opted_out Tie-In

When opted_out is true, the lead is treated as do-not-contact. No follow-up cadence, contractor notification, or homeowner communication is prepared.

## 5. stopped_reason Tie-In

When stopped_reason is populated, the lead is held for founder/operator review. The reason is recorded for reporting and future manual review queue decisions.

## 6. Manual Review Queue Tie-In

Stopped leads are surfaced in the manual review queue for founder/operator review before any further action is considered.

## 7. Follow-Up Cadence Tie-In

Follow-up cadence is permanently paused for stopped leads. No automated or manual follow-up is prepared while opted_out or stopped_reason is active.

## 8. Missing Information Recovery Tie-In

Stopped leads with missing information are still reviewed for data completeness, but recovery actions are paused until the stop status is cleared by founder/operator decision.

## 9. Contractor Notification Readiness Tie-In

Stopped leads are excluded from contractor notification readiness. No manual notification summary is prepared while the lead is stopped.

## 10. Reporting Tie-In

Stopped leads are tracked in weekly leads report and monthly leads report under recommended actions, including opted_out and stopped_reason counts.

## 11. Do-Not-Contact Handling

Any lead with opted_out = true is treated as do-not-contact. No homeowner communication of any kind is prepared.

## 12. Stopped Follow-Up Handling

Any lead with a non-null stopped_reason has follow-up permanently paused. No follow-up cadence actions are prepared.

## 13. Founder/Operator Review

All stopped leads require explicit founder/operator review before the stop status can be cleared or any follow-up/notification action is considered.

## 14. Recommended Actions

- book inspections
- book appointments
- manual review
- follow-up needed

## 15. Explicit Approval Gates

No stopped lead is cleared for follow-up or contractor notification without explicit founder/operator approval.

## 16. What Not to Touch

- Do not touch opted_out or stopped_reason fields without explicit approval.
- Do not mutate existing stopped leads.
- Do not prepare any homeowner or contractor communication for stopped leads.

## 17. Safety Confirmation

All stopped lead handling remains planning-only. No Supabase writes, no schema mutation, and no live automation are activated.

PASS: First Paid Launch stopped lead handling packet completed successfully

## 18. Exact Phrase Verification

stopped follow-up
missing information recovery
safe manual review

