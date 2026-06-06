# Vapi Normalized Dry-Run Contract

Date: 2026-06-06

## Purpose

This document defines the exact normalized internal object emitted by `backend/scripts/vapi-test-payload-ingestion-dry-run.js` when processing a sanitized Vapi post-call payload. It serves as the contract between the ingestion script and any future operator review or mapping logic.

## Normalized Output Fields

The dry-run script always emits an object with the following fields:

| Field                | Type      | Nullable | Notes |
|----------------------|-----------|----------|-------|
| `source`             | string    | No       | Always `"vapi"` |
| `call_id`            | string    | No       | Must start with `call_fake` in test mode |
| `from`               | string    | Yes      | May be `null` only for `missing-phone` scenario |
| `to`                 | string    | No       | Must start with `+1555555` in test mode |
| `started_at`         | string    | No       | ISO 8601 timestamp |
| `ended_at`           | string    | No       | ISO 8601 timestamp |
| `homeowner_name`     | string    | No       | - |
| `email`              | string    | No       | - |
| `property_address`   | string    | Yes      | May be `null` only for `missing-address` scenario |
| `roof_issue`         | string    | No       | - |
| `urgency`            | string    | No       | - |
| `insurance_claim`    | boolean   | No       | - |
| `outcome`            | string    | No       | - |
| `appointment_suggested` | string | Yes   | May be `null` for unbooked or missing-field scenarios |
| `summary`            | string    | No       | - |
| `has_transcript`     | boolean   | No       | - |
| `test_only`          | boolean   | No       | Always `true` in test mode |
| `ingested_at`        | string    | No       | ISO 8601 timestamp of ingestion |

## Nullable Rules (Strict)

- `from` may be `null` **only** when `--scenario=missing-phone`
- `property_address` may be `null` **only** when `--scenario=missing-address`
- `appointment_suggested` may be `null` for any scenario where no appointment was proposed

Any other null value in a required field is considered invalid.

## Verifier Requirements

`backend/scripts/verify-vapi-test-payload-ingestion-dry-run-readonly.js` must:

1. Execute the dry-run script for all six scenarios with gates present.
2. For each scenario, confirm the emitted object contains **all** fields listed above.
3. Confirm nullable rules are respected per scenario.
4. Confirm invalid scenario (`--scenario=not-real`) exits non-zero.
5. Confirm valid scenario without gates exits non-zero.

## Safety Guarantees (Enforced by Verifier)

- No live Vapi calls or SDK usage
- No Supabase client or writes
- No Twilio import or calls
- No route registration
- No cron/scheduler activation
- No Calendar/Resend/Lindy activation
- No secrets or webhook URLs printed

## Supported Scenarios

- `booked-inspection`
- `unbooked-followup`
- `missing-address`
- `missing-phone`
- `emergency-leak`
- `insurance-storm`

All scenarios must produce output that conforms to this contract when gates are satisfied.