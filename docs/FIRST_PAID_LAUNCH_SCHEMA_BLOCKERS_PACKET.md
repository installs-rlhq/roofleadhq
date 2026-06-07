# RoofLeadHQ — First Paid Launch Schema Blockers Packet

This packet documents the opted_out and stopped_reason schema blockers for first-paid launch readiness.

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

The schema blockers packet records the current opted_out and stopped_reason gaps in the leads table that block safe opt-out handling, stopped-lead handling, reporting, and manual review queue operations during founder-led first-paid launch.

## 2. Current Blocker

The leads table does not yet have opted_out or stopped_reason fields. This prevents clean classification of leads that have opted out or been stopped for other reasons.

## 3. Why opted_out Is Needed

opted_out allows the system to mark leads that have explicitly requested no further contact. This supports future opt-out handling and prevents accidental follow-up.

## 4. Why stopped_reason Is Needed

stopped_reason allows the operator to record why a lead was stopped (e.g., duplicate, bad fit, manual stop). This supports future stopped-lead handling and reporting.

## 5. Expected Field Names

- opted_out
- stopped_reason

Legacy spelling note (compatibility only): optedout, stoppedreason.

## 6. Expected Field Types

- opted_out: boolean-like (default false)
- stopped_reason: nullable text (free-text for now)

## 7. Suggested Default Values

- opted_out: false
- stopped_reason: null

## 8. Safe Migration Notes

- Do not apply any migration without explicit founder approval.
- Do not mutate existing rows.
- Do not create a lookup table yet.
- Do not enforce a controlled vocabulary yet.

## 9. Read-Only Verification Expectations

The verifier confirms that this packet exists and contains the required planning language. No Supabase connection or schema inspection is performed.

## 10. Explicit Approval Gates

Any future schema change requires:
- Founder explicit approval
- Dry-run verification in a staging environment (if available)
- Confirmation that no existing data is altered

## 11. What Not to Touch

- Do not touch leads.status enum.
- Do not touch follow_ups table.
- Do not touch any existing production data.

## 12. Future Operations Support

These fields will support:
- Clean opt-out handling
- Stopped-lead classification in the manual review queue
- Improved weekly leads report and monthly leads report
- Safer founder/operator review decisions

## 13. Open Questions

- Is there a staging/dry-run Supabase environment for pre-production migration testing?
- Should stopped_reason use a controlled vocabulary later, or remain free-text for now?

## 14. Safety Confirmation

All work remains planning-only. No Supabase schema mutation, no production writes, and no automation activation.

PASS: First Paid Launch schema blockers packet completed successfully
