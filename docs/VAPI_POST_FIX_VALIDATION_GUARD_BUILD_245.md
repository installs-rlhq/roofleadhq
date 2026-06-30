# Post-Fix Vapi-Originated Synthetic Browser/webCall Validation — Approval & Fresh Guard (Build 245)

Decision token: `POST_FIX_VAPI_BROWSER_WEBCALL_VALIDATION_APPROVED_AND_GUARDED_NOT_YET_EXECUTED`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `7342539` (Build 244 closeout), HEAD == origin/main.

## What this build is

Build 245 is an **approval-capture and fail-closed fresh-guard packet** for the single post-fix
Vapi-originated synthetic **browser/webCall** validation. It does **two** things and **only** these
two:

1. Records the **explicit user approval** Jason granted for exactly **one** post-fix Vapi-originated
   synthetic browser/webCall validation, captured verbatim with its exact scope and limits.
2. Establishes the **fresh fail-closed pre-run guard / readiness state** that must pass immediately
   before that single browser/webCall validation is performed.

Build 245 does **NOT** perform the Vapi browser/webCall validation. No Vapi Talk was clicked or used,
no call was placed, no phone number was dialed, no `curl` was run against production, no SMS was sent,
no Twilio was used, no homeowner or roofer was contacted, no Railway/Vapi config was changed, no
secret was read or printed, and `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. This build
is **approval + guard only**.

## Prerequisite validated state (already proven)

Build 245 is gated on the already-closed, validated fix build:

- **Build 244** (commit `7342539`) — Vapi webhook **payload-shape fix** (repo-only, test-first),
  validated by an in-process behavioral verifier:
  - Known non-terminal Vapi events (status / conversation / speech update) → **HTTP 200 no-op**
    (`acknowledged`, `processed:false`), no lead/booking.
  - Browser/**webCall** end-of-call-report with null PSTN phone fields → **HTTP 200 no-op**
    (`web_call:true`), no lead/booking — it no longer returns `400 missing_required_field`.
  - PSTN final-report behavior remains protected by the existing phone-keyed required-field gate.
  - Missing/invalid webhook secret remains **HTTP 401** (fail closed) before any handling.

**No post-fix Vapi-originated runtime validation has been performed yet. No real call has been tested
yet.**

## Build 244 fix evidence (carried forward, machine-checkable)

- `build_244_prerequisite_status = validated`
- `build_244_prerequisite_commit = 7342539`
- `build_244_fix_evidence_doc = docs/VAPI_WEBHOOK_PAYLOAD_SHAPE_FIX_BUILD_244.md`
- `build_244_webcall_noop_behavior = 200_no_op_not_400`
- `build_244_unauth_behavior = 401`

## Explicit user approval (captured verbatim)

Jason explicitly approved the following exact scope:

> "I approve one post-fix Vapi-originated synthetic browser/webCall validation for RoofLeadHQ Build 245 using the Test Roofing Assistant only, with sanitized evidence capture only, no real homeowner traffic, no real roofer traffic, no phone number dialed, no SMS, no Twilio call, no production data export, no schema/auth/RLS changes, no billing/CRM automation, and no public/live automation."

### Approval scope (machine-checkable)

- `approval_captured = true`
- `approval_scope = one post-fix Vapi-originated synthetic browser/webCall validation`
- `approval_count_limit = 1` (exactly one validation)
- `approved_assistant = Test Roofing Assistant only`
- `evidence_mode = sanitized evidence capture only`
- `no_real_homeowner_traffic = true`
- `no_real_roofer_traffic = true`
- `no_phone_number_dialed = true`
- `no_sms = true`
- `no_twilio_call = true`
- `no_production_data_export = true`
- `no_schema_auth_rls_change = true`
- `no_billing_crm_automation = true`
- `no_public_live_automation = true`

## Status fields (machine-checkable)

- `post_fix_vapi_validation_status = approved_not_yet_executed`
- `vapi_originated_action_performed_by_build_245 = false`
- `pre_run_guard_status = ready`
- `real_call_test_status = not_started`
- `full_payload_processing_status = not_yet_validated`
- `secret_value_recorded = false` / `value_redacted = true`

## Interpretation

- Build 245 **captures explicit approval** for exactly **one** post-fix Vapi-originated synthetic
  browser/webCall validation, scoped to the **Test Roofing Assistant only**, with **sanitized evidence
  capture only**.
- Build 245 **does not execute** that validation. `post_fix_vapi_validation_status =
  approved_not_yet_executed` and `vapi_originated_action_performed_by_build_245 = false`.
- The approval remains limited to **exactly one** post-fix Vapi-originated synthetic browser/webCall
  validation. It is **not** a real call test and **not** a full payload processing pass.
- `real_call_test_status` remains **not_started** and `full_payload_processing_status` remains
  **not_yet_validated** — neither is advanced by this build.
- **No** real call, dialed phone number, SMS, homeowner contact, roofer contact, Twilio use,
  production data export, schema/auth/RLS change, billing/CRM automation, or public/live automation
  occurred or is authorized beyond the single scoped, sanitized browser/webCall validation.

## Fresh fail-closed pre-run guard for the next step

When the separately-gated next step is run, **this guard must be re-run and pass immediately
beforehand**, holding **all** of the following invariants. Any violation must fail closed (abort,
capture nothing):

- Repo is `/root/roofleadhq`, branch `main`, tree clean, HEAD == origin/main, prerequisite commit
  `7342539` (Build 244) present.
- Use the **Test Roofing Assistant only** — no production assistant, no other assistant.
- Drive **one** Vapi-originated synthetic **browser/webCall** event only — not a batch, not a loop.
- The action is a **browser-only Vapi Talk / webCall** — **no phone number is dialed**, no PSTN call.
- Expected post-fix result: the browser/webCall end-of-call-report is acknowledged with **HTTP 200
  no-op** (`web_call:true`), **not** `400 missing_required_field`; no lead/booking is created.
- Capture **sanitized output only**: status code + sanitized row summary of ids/booleans. Record
  `configured=true / value_redacted=true`.
- **Never** capture or print the secret, real PII, phone numbers, tokens, SIDs, call-ids, or
  API-keys.
- **No real homeowner traffic.** No real homeowner Vapi call traffic accepted.
- **No real roofer traffic.** No real roofer contacted or routed to.
- **No phone number dialed.**
- **No SMS sent.**
- **No Twilio call** placed or routed; no Twilio config change.
- **No real call** placed or received (a first real call is a later, separately-approved gate).
- **No production data export.**
- **No schema / auth / RLS / security-policy change.**
- **No billing automation, no CRM integration.**
- **No public / live automation expansion.**
- **No Railway variable set, no deploy/redeploy/restart.**
- **No secret read, printed, or committed**; `/tmp/roofleadhq-vapi-webhook-secret-build237` not read.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 7342539`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `7342539`.

## What was NOT done in this build

- **No post-fix Vapi-originated browser/webCall validation executed.** This build only captures
  approval and the fresh guard.
- **No Vapi Talk** clicked or used.
- **No call** placed, received, or routed; **no phone number dialed**.
- **No `curl`** run against production.
- **No SMS** sent.
- **No Twilio** used; no Twilio config change.
- **No homeowner or roofer contact** of any kind.
- **No secret value** read, typed, printed, or committed; `/tmp/roofleadhq-vapi-webhook-secret-build237`
  was not read. Only `value_redacted=true` / `secret_value_recorded=false` markers are recorded.
- **No phone numbers or PII** appear in this packet.
- **No Railway / Vapi config change**; no deploy/redeploy/restart.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 245)

This build, its verifier, and its dry-run wrapper guarantee:

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
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
| Build 244 prerequisite | validated (webCall → 200 no-op, not 400; unauth → 401) | ✅ `7342539` |
| Explicit approval | one post-fix Vapi-originated synthetic browser/webCall validation | ✅ verbatim |
| Approved assistant | Test Roofing Assistant only | ✅ |
| Evidence mode | sanitized only | ✅ |
| Browser-only / no phone dialed | required | ✅ |
| Post-fix validation | approved, NOT yet executed | ⛔ not performed by this packet |
| Real call test | not_started | ⛔ later separate gate |
| Full payload processing | not_yet_validated | ⛔ gated |

## Exact next gated step

**Re-run this Build 245 guard immediately beforehand**, then — only if it passes — perform the
**single separately-approved post-fix Vapi-originated synthetic browser/webCall validation** using the
**Test Roofing Assistant only**, as a **browser-only Vapi Talk / webCall** (**no phone number
dialed**). Capture **sanitized status/output only** (status code + sanitized row summary of
ids/booleans; `configured=true / value_redacted=true`); expect **HTTP 200 no-op** (`web_call:true`),
not `400 missing_required_field`. **Never** the secret, real PII, phone numbers, tokens, SIDs,
call-ids, or API-keys. **No real homeowner traffic, no real roofer traffic, no phone number dialed, no
SMS, no Twilio call, no real call.** A first real call remains a later, separately-approved gate.

## Files added in Build 245

- `docs/VAPI_POST_FIX_VALIDATION_GUARD_BUILD_245.md` (this doc)
- `backend/scripts/verify-vapi-post-fix-validation-guard-build-245-readonly.js`
- `scripts/run-vapi-post-fix-validation-guard-build-245-dry-run.sh`
