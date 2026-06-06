# Vapi Raw Payload Capture Plan

Date: 2026-06-06

## Purpose

This document defines the future safe capture process for raw Vapi post-call payloads. It is strictly a planning artifact. No webhook route, no Vapi integration, and no production automation exists at this time.

**Current Safety Posture:** No Vapi webhook endpoint is implemented. No Vapi API calls are made from this repository. All production paths remain disabled.

## Future Capture Architecture (Planning Only)

When explicitly approved, the following components will be added in a narrow, gated, test-only manner:

### 1. Webhook Endpoint Location (Future)
- Route path: `POST /webhooks/vapi/post-call` (or similar)
- Protected by:
  - `VAPI_WEBHOOK_SECRET` environment variable
  - Signature verification against `X-Vapi-Signature` header (or Vapi's documented auth mechanism)
  - Explicit `VAPI_CAPTURE_TEST_MODE=1` gate
- The route will **never** be added without a separate approved task.

### 2. Signature / Secret Validation (Future)
- Verify incoming request using Vapi-provided signature header.
- Reject requests that fail signature validation.
- Log only non-sensitive metadata on failure (never full payload on auth failure).

### 3. Storage Strategy (Future)
- Target: Supabase table `raw_vapi_payloads` (or local file store during early testing)
- Every row must include:
  - `test_only: true`
  - `captured_at`
  - `source: 'vapi'`
  - Full original payload stored as JSONB
- No production leads, appointments, or automation will be triggered from this table.

### 4. Payload Sanitization Rules (Before Any Commit)
Before any sample payload is committed to the repository:
- Redact all real phone numbers → replace with `+1555XXXXXXX`
- Redact all real email addresses → `redacted@example.com`
- Redact all real names → `Test Homeowner`
- Redact all real addresses → `123 Fake Street, Test City, TS 00000`
- Redact any insurance policy/claim numbers
- Remove or mask any PII fields not required for discovery

Only fully sanitized fake payloads may be stored in `docs/samples/`.

## Sample Payload Location (Future)

`docs/samples/vapi-post-call-sample.fake.json` — will contain only fake data meeting the sanitization rules above.

## Safety Rules (Non-Negotiable)

- No live Vapi webhook route exists in this commit.
- No Vapi API calls or SDK usage.
- No Supabase writes from any Vapi-related script.
- No SMS, Twilio, Calendar, Resend, or Lindy activation.
- No cron, scheduler, or dispatcher activation.
- Retell remains deprecated and disabled.
- All future capture work must be explicitly approved in a separate task before implementation.

## Status

**Current:** Planning document created. No implementation started. Ready for controlled, gated capture phase when approved.