# Vapi Test-Only Payload Ingestion Plan

Date: 2026-06-06

## Purpose

This document defines the planned future test-only ingestion pipeline for sanitized Vapi post-call payloads. It is strictly a planning artifact. No ingestion code, no webhook route, and no Supabase writes exist at this time.

**Current Safety Posture:** No Vapi webhook endpoint is implemented. No Vapi API calls are made from this repository. All production paths remain disabled. Retell remains deprecated and disabled.

## Required Gates (Future Implementation)

Any future test-only ingestion script must enforce:

- Environment variable: `VAPI_INGESTION_TEST_MODE=1`
- CLI flag: `--allow-vapi-test-ingestion`
- Payload source must be either:
  - The fake sample at `docs/samples/vapi-post-call-sample.fake.json`, **or**
  - A sanitized real payload that has been explicitly approved by the founder for test use
- Default behavior = dry-run only (no writes)
- All Supabase, SMS, Twilio, Calendar, Resend, and Lindy actions must be explicitly disabled

## Future Pipeline Steps (Dry-Run Only)

When the gates above are satisfied, the planned pipeline will:

1. Read the sanitized payload file (JSON)
2. Run the missing-fields readiness gate (`VAPI_MISSING_FIELDS_READINESS_GATE.md`)
3. If gate passes, apply the field mapping defined in `VAPI_SAMPLE_PAYLOAD_MAPPING.md`
4. Generate an operator review summary containing:
   - Readiness gate result (pass/fail + missing fields)
   - Mapped lead / call / booking / follow_up / workflow_event structures (dry-run)
   - Recommended next operator action
5. Output the summary to stdout / log file only
6. **Never** write to Supabase
7. **Never** trigger SMS, Twilio, Calendar booking, Resend, or Lindy
8. **Never** activate any route, cron, scheduler, or dispatcher

## Output Format (Planned)

The ingestion script will produce a structured JSON summary suitable for operator review, including:

- `payload_source`
- `readiness_gate_result`
- `missing_fields`
- `mapped_entities` (dry-run only)
- `recommended_action`
- `safety_flags` (all production actions disabled)

## Rollback / Disable Rules

- Removing `VAPI_INGESTION_TEST_MODE=1` or the CLI flag must immediately disable all ingestion behavior.
- Any future real sanitized payload ingestion must be explicitly approved in a separate task and logged.
- The ingestion script must support a `--dry-run` mode that is the default.

## Approval Gates for Moving Beyond Dry-Run

Before any non-dry-run execution is permitted:

- [ ] At least 3 sanitized real Vapi payloads have been collected and reviewed using the operator checklist.
- [ ] Founder has given explicit written approval for the specific test payload(s).
- [ ] The ingestion script has passed all safety verifiers.
- [ ] A rollback/disable plan has been documented and tested.
- [ ] Retell remains fully deprecated.

## Safety Rules (Non-Negotiable)

- No live Vapi webhook route exists in this commit.
- No Vapi API calls or SDK usage from RoofLeadHQ code.
- Never write to Supabase from any Vapi-related script.
- No SMS, Twilio, Calendar, Resend, or Lindy activation.
- No cron, scheduler, or dispatcher activation.
- Retell remains deprecated and disabled.
- All future ingestion work requires explicit approval in a separate task.

## Status

**Current:** Planning document created. No ingestion script exists. Ready for controlled, gated implementation only after explicit founder approval.

## Verifier Required Exact Safety Language

- read the sanitized payload file
- Never trigger SMS, Twilio, Calendar booking, or messaging actions
