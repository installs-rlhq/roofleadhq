# Vapi-Originated Synthetic/Controlled Webhook Validation — Approval & Guard Packet (Build 239)

Decision token: `VAPI_ORIGINATED_SYNTHETIC_VALIDATION_APPROVED_AND_GUARDED_NOT_YET_EXECUTED`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `077716e` (Build 238 closeout), HEAD == origin/main.

## What this build is

Build 239 is an **approval-capture and fail-closed guard packet**. It does **two** things and **only**
these two:

1. Records the **explicit user approval** Jason granted for exactly **one** Vapi-originated
   synthetic/controlled webhook validation, captured verbatim with its exact scope and limits.
2. Establishes the **fail-closed guard / readiness state** for that next step.

Build 239 does **NOT** perform the Vapi-originated validation. No Vapi Talk was clicked or used, no
real call was placed, no `curl` was run against the live webhook, no SMS was sent, no Twilio was used,
no homeowner or roofer was contacted, no secret was read or printed, and
`/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.

## Prerequisite validated states (already proven)

Build 239 is gated on two already-closed, validated predecessor builds:

- **Build 237** (commit `48bb25d`) — webhook auth gate pair proven against the live runtime using the
  final 64-character Build 237 `VAPI_WEBHOOK_SECRET`:
  - Unauthenticated POST → **HTTP 401 unauthorized** (traffic blocked).
  - Authorized `x-vapi-webhook-secret` POST → **HTTP 400 `missing_required_field`** (auth passed into
    normal app validation).
- **Build 238** (commit `077716e`) — Vapi credential + Bearer-header format validated:
  - Vapi Test Roofing Assistant explicitly uses credential **RoofLeadHQ Production Webhook Secret**.
  - Credential type **Bearer Token**, Header Name **Authorization**, Include Bearer Prefix **ON**,
    assistant **published**.
  - Direct `Authorization: Bearer <final Build 237 secret>` POST → **HTTP 400
    `missing_required_field`** — the exact Bearer format Vapi will send passes backend auth into app
    validation.

**No Vapi-originated webhook has been tested yet. No real call has been tested yet.**

## Explicit user approval (captured verbatim)

Jason explicitly approved the following exact scope:

> "I approve one Vapi-originated synthetic/controlled webhook validation for RoofLeadHQ Build 239 using the Test Roofing Assistant only, with sanitized evidence capture only, no real homeowner traffic, no real roofer traffic, no SMS, no Twilio call, no production data export, no schema/auth/RLS changes, no billing/CRM automation, and no public/live automation."

### Approval scope (machine-checkable)

- `approval_captured = true`
- `approval_scope = one Vapi-originated synthetic/controlled webhook validation`
- `approval_count_limit = 1` (exactly one validation)
- `approved_assistant = Test Roofing Assistant only`
- `evidence_mode = sanitized evidence capture only`
- `no_real_homeowner_traffic = true`
- `no_real_roofer_traffic = true`
- `no_sms = true`
- `no_twilio_call = true`
- `no_production_data_export = true`
- `no_schema_auth_rls_change = true`
- `no_billing_crm_automation = true`
- `no_public_live_automation = true`

## Status fields (machine-checkable)

- `build_237_prerequisite_status = validated`
- `build_238_prerequisite_status = validated`
- `vapi_originated_validation_status = approved_not_yet_executed`
- `vapi_originated_action_performed_by_this_packet = false`
- `real_call_test_status = not_started`
- `full_payload_processing_status = not_yet_validated`
- `secret_value_recorded = false` / `value_redacted = true`

## Interpretation

- Build 239 **captures explicit approval** for exactly **one** Vapi-originated synthetic/controlled
  webhook validation, scoped to the **Test Roofing Assistant only**, with **sanitized evidence
  capture only**.
- Build 239 **does not execute** that validation. `vapi_originated_validation_status =
  approved_not_yet_executed` and `vapi_originated_action_performed_by_this_packet = false`.
- `real_call_test_status` remains **not_started** and `full_payload_processing_status` remains
  **not_yet_validated** — neither is advanced by this build.
- **No** real call, SMS, homeowner contact, roofer contact, Twilio use, production data export,
  schema/auth/RLS change, billing/CRM automation, or public/live automation occurred or is authorized
  beyond the single scoped, sanitized validation.

## Fail-closed guard for the next step

When the separately-gated next step is run, it must hold **all** of the following invariants. Any
violation must fail closed (abort, capture nothing):

- Use the **Test Roofing Assistant only** — no production assistant, no other assistant.
- Drive **one** Vapi-originated synthetic/controlled webhook event only — not a batch, not a loop.
- Capture **sanitized output only**: status code + sanitized row summary of ids/booleans. Record
  `configured=true / value_redacted=true`.
- **Never** capture or print the secret, real PII, phone numbers, tokens, SIDs, call-ids, or
  API-keys.
- **No real homeowner traffic.** No real homeowner Vapi call traffic accepted.
- **No real roofer traffic.** No real roofer contacted or routed to.
- **No SMS sent.**
- **No Twilio call** placed or routed; no Twilio config change.
- **No real call** placed or received (a first real call is a later, separately-approved gate).
- **No production data export.**
- **No schema / auth / RLS / security-policy change.**
- **No billing automation, no CRM integration.**
- **No public / live automation expansion.**
- **No Railway variable set, no deploy/redeploy/restart.**
- **No secret read, printed, or committed**; `/tmp/roofleadhq-vapi-webhook-secret-build237` not read.
- A **fresh pre-run command/guard** must pass immediately before the validation is performed.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 077716e`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `077716e`.

## What was NOT done in this build

- **No Vapi-originated webhook validation executed.** This build only captures approval and the guard.
- **No Vapi Talk** clicked or used.
- **No real call** placed, received, or routed.
- **No `curl`** run against the live webhook.
- **No SMS** sent.
- **No Twilio** used; no Twilio config change.
- **No homeowner or roofer contact** of any kind.
- **No secret value** read, typed, printed, or committed; `/tmp/roofleadhq-vapi-webhook-secret-build237`
  was not read. Only `value_redacted=true` / `secret_value_recorded=false` markers are recorded.
- **No phone numbers or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**
- **No Railway variable set, no deploy/redeploy/restart** triggered by this build.

## Safety invariants (held by Build 239)

This build, its verifier, and its dry-run wrapper guarantee:

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No SMS sent.
- No Twilio call placed or routed.
- No Twilio configuration change.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No unrelated Vapi configuration change (no Vapi change by this build at all).
- No Vapi-originated webhook validation executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded; `/tmp/roofleadhq-vapi-webhook-secret-build237`
  was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Approval & guard summary table

| Item | Value | Captured |
|---|---|---|
| Build 237 prerequisite | validated (401 unauth / 400 authorized) | ✅ |
| Build 238 prerequisite | validated (Bearer credential + 400 authorized) | ✅ |
| Explicit approval | one Vapi-originated synthetic/controlled validation | ✅ verbatim |
| Approved assistant | Test Roofing Assistant only | ✅ |
| Evidence mode | sanitized only | ✅ |
| Vapi-originated validation | approved, NOT yet executed | ⛔ not performed by this packet |
| Real call test | not_started | ⛔ later separate gate |
| Full payload processing | not_yet_validated | ⛔ gated |

## Exact next gated step

Perform the **separately approved one Vapi-originated synthetic/controlled webhook validation** —
using the **Test Roofing Assistant only** — **only after a fresh pre-run command/guard** passes
immediately beforehand, capturing **sanitized status/output only** (status code + sanitized row
summary of ids/booleans; `configured=true / value_redacted=true`). **Never** the secret, real PII,
phone numbers, tokens, SIDs, call-ids, or API-keys. **No real homeowner traffic, no real roofer
traffic, no SMS, no Twilio call, no real call.** A first real call remains a later, separately-approved
gate.

## Files added in Build 239

- `docs/VAPI_ORIGINATED_VALIDATION_APPROVAL_GUARD_BUILD_239.md` (this doc)
- `backend/scripts/verify-vapi-originated-validation-approval-guard-build-239-readonly.js`
- `scripts/run-vapi-originated-validation-approval-guard-build-239-dry-run.sh`
