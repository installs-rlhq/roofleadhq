# Vapi Real Payload Collection Runbook

Date: 2026-06-06

## Purpose

This runbook defines the **only** approved process for collecting the first real Vapi post-call payload. It is strictly a planning document. No webhook route, no Vapi integration, and no production automation exists in this repository.

**Current Safety Posture:** No Vapi webhook endpoint is implemented. No Vapi API calls are made from this codebase. All production paths remain disabled. Retell remains deprecated and disabled.

## Prerequisites (Mandatory)

- Explicit written approval from the founder (Jason) for the specific test window.
- A separate, temporary, non-committed capture environment (e.g., a private ngrok + minimal Express server **outside** this repo).
- A dedicated test Vapi phone number and test assistant configured **only** for this capture.
- No production Vapi assistants or phone numbers may be used.

## Step-by-Step Collection Process (Future Only)

1. **Create Temporary Capture Endpoint (Outside Repo)**
   - Spin up a minimal, private server (ngrok + Express or similar).
   - Endpoint: `POST /capture/vapi` (temporary only).
   - Implement basic signature validation using `VAPI_WEBHOOK_SECRET` (never commit the secret).
   - Log the **complete raw JSON body** to a local file or private bucket.
   - Do **not** forward the payload to any RoofLeadHQ code.

2. **Trigger Approved Test Call Only**
   - Use a test Vapi assistant and test phone number.
   - Make one or more short test calls with fake homeowner data.
   - Do not use real customer data.

3. **Save Raw Payload Privately**
   - Store the full raw payload in a private location (local disk, private S3, or encrypted note).
   - Name the file with timestamp and test identifier (e.g., `vapi-raw-2026-06-06T18-30-00Z.json`).
   - Do not commit this file to the repository.

4. **Sanitize Before Any Commit**
   - Apply the redaction checklist below to create a sanitized version.
   - Only the sanitized version may be committed to `docs/samples/`.
   - Delete or securely wipe the original raw file after sanitization is verified.

5. **Compare Against Existing Documentation**
   - Verify all fields listed in `VAPI_POST_CALL_PAYLOAD_DISCOVERY.md` and `VAPI_SAMPLE_PAYLOAD_MAPPING.md`.
   - Note any new or unexpected fields for future mapping updates.

6. **Cleanup and Disable**
   - Immediately delete/disable the temporary capture endpoint after collection.
   - Revoke or rotate any test secrets used.
   - Confirm no route remains active in any environment.
   - Update this runbook with the collection timestamp and sanitized sample filename.

## Redaction Checklist (Mandatory Before Commit)

Redact or replace the following in any committed sample:

- **Names** → "Test Homeowner", "Test Roofer"
- **Phone numbers** → "+1555555xxxx" pattern
- **Email addresses** → "redacted@example.com"
- **Physical addresses** → "123 Fake Street, Test City, TS 00000"
- **Transcripts** → Replace real conversation text with generic placeholder or heavily redacted version
- **Call IDs / Assistant IDs** → Replace with fake IDs (e.g., `call_fake_1234567890`)
- **Webhook secrets / signatures** → Never include; remove all `X-Vapi-Signature` or auth headers
- **Any other PII** → Remove or replace with clearly fake values

## Go / No-Go Checklist Before Any Future Route Implementation

Before any Vapi webhook route is added to the codebase, the following must be true:

- [ ] At least 3 real sanitized Vapi payloads have been collected and reviewed.
- [ ] All required fields from `VAPI_MISSING_FIELDS_READINESS_GATE.md` are present in the collected samples.
- [ ] Signature validation strategy is documented and approved.
- [ ] Storage table (`raw_vapi_payloads`) schema is reviewed and approved.
- [ ] `needs_human_review` and readiness gate logic is implemented and tested.
- [ ] Explicit founder approval for route implementation has been recorded.
- [ ] Temporary capture endpoint has been fully decommissioned.
- [ ] Retell integration remains deprecated and disabled.

## Safety Rules (Non-Negotiable)

- No Vapi webhook route exists in this commit.
- No Vapi API calls or SDK usage from RoofLeadHQ code.
- No Supabase writes from any Vapi-related script.
- No SMS, Twilio, Calendar, Resend, or Lindy activation.
- No cron, scheduler, or dispatcher activation.
- Retell remains deprecated and disabled.
- All future capture work requires explicit approval in a separate task.

## Status

**Current:** Runbook created. No implementation started. No real payloads collected. Ready for controlled collection phase only after explicit approval.