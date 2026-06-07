# RoofLeadHQ — First Paid Launch Voice Path Cleanup Packet

This packet documents and guards the voice path cleanup posture for founder-led first-paid launch.

Safety posture:

- Safety remains demo-ready with live automation disabled.
- No live SMS/Twilio sends.
- No production Supabase writes.
- No Supabase schema mutation.
- No Vapi production webhook ingestion.
- No live Vapi webhook route.
- No Vapi calls from code.
- No Retell route activation.
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

The voice path cleanup packet confirms that Retell is deprecated/disabled and Vapi is the current phone/voice path, with all Vapi work remaining in dry-run/read-only state only.

## 2. Current Retell Status

Retell is deprecated/disabled. All Retell routes, webhooks, and post-call workflows are removed or guarded.

## 3. Retell Items to Confirm Deprecated/Disabled

- old Retell webhook triggers
- old Retell post-call workflow references
- Retell payload assumptions
- lingering Retell references

## 4. Possible Lingering Retell References

Repo documentation areas to check later in VPS Terminal 1 for any lingering Retell references.

## 5. Vapi Current Role

Vapi is the current phone/voice path. All Vapi work remains Vapi dry-run/read-only only.

## 6. Vapi Dry-Run Readiness Checklist

- Vapi normalized dry-run contract
- post-call payload discovery
- raw payload capture plan
- sample payload mapping
- missing-fields readiness gate
- real payload collection runbook
- operator payload review checklist
- test payload ingestion plan
- dry-run CLI contract
- scenario registry consistency
- emergency-leak scenario
- insurance-storm scenario
- guard layer coverage
- aggregate verifier coverage

## 7. Vapi Items Not to Activate Yet

- no Vapi production webhook ingestion
- no live Vapi webhook route
- no Vapi calls from code
- no webhook activation
- no production ingestion
- no production workflow activation

## 8. Repo Documentation Areas to Check Later in VPS Terminal 1

- Any lingering Retell references
- Any old Retell webhook triggers
- Any old Retell post-call workflow references
- Any Retell payload assumptions

## 9. Read-Only Verification Expectations

The verifier confirms that this packet exists and contains the required planning language. No Vapi or Retell connections are made.

## 10. Explicit Approval Gates

Any future Vapi production activation or Retell route reactivation requires explicit founder approval.

## 11. What Not to Touch

- Do not activate any Vapi production webhook.
- Do not activate any Retell route.
- Do not enable any production ingestion or workflow.

## 12. Recommended Next Repo Packet

Next packet after this one will be defined in VPS Terminal 1.

## 13. Safety Confirmation

All voice path work remains planning-only. No Vapi production webhook ingestion, no live Vapi webhook route, no Vapi calls from code, no Retell route activation, and no production workflow activation.

PASS: First Paid Launch voice path cleanup packet completed successfully

## Business Language

This packet preserves first-paid launch language around lead response, voice-path readiness, and contractor-facing review without making production claims.

Use book inspections and book appointments as the approved appointment language.

