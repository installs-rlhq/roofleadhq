# Vapi-Originated Synthetic/Controlled Browser Test — Ambiguous / Not-Confirmed Evidence (Build 241)

Decision token: `VAPI_ORIGINATED_VALIDATION_RESULT_AMBIGUOUS_NOT_CONFIRMED`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `9b5f8ff` (Build 240 closeout), HEAD == origin/main.

## What this build is

Build 241 is a **repo-only evidence packet** that captures the outcome of the single,
already-approved (Build 239) Vapi-originated synthetic/controlled browser test that was executed
under the Build 240 fresh pre-run guard. It does **one** thing and **only** this one thing:

1. Records — as sanitized, repo-only evidence — that the one approved Vapi-originated browser
   Talk/webCall action was **performed once** using the Test Roofing Assistant only, that its
   observed result is **ambiguous / not confirmed** (not a pass), and that the single approval is now
   **consumed**.

Build 241 itself performs **no** runtime action. No Vapi Talk was clicked in this build, no real call
was placed, no `curl` was run against the live webhook, no SMS was sent, no Twilio was used, no
homeowner or roofer was contacted, no secret was read or printed, and
`/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. This build is **evidence-capture-only**.

## The one approved action that was performed (Build 239 approval, consumed)

Under the Build 240 fresh pre-run guard (which passed immediately beforehand), the single approved
Vapi-originated synthetic/controlled browser test was performed exactly once:

- The Vapi browser **Talk / webCall** was run **once** using the **Test Roofing Assistant only**.
- The spoken test phrase was **synthetic / no-real-contact only**.
- **No phone number was dialed.**
- **No Twilio call** was placed.
- **No SMS** was sent.
- **No real homeowner or roofer traffic** occurred.
- The browser test was **ended once**.
- This action is **not to be run again** without a new, separate approval.

## Build 240 pre-run guard re-run immediately before the action (passed)

Immediately before the approved action, the Build 240 dry-run guard was rerun and passed:

- `pre_run_guard_status = ready`
- `approval_count_limit = 1`
- `approved_assistant = test_roofing_assistant_only`
- `evidence_mode = sanitized_only`
- `vapi_originated_validation = approved_not_yet_executed` (state at guard time)
- `repo_unchanged = true`

## Observed evidence (sanitized)

- A **Vapi call record exists** for a browser webCall using the Test Roofing Assistant.
- Vapi exported call logs show **call / transcriber / model** activity.
- Vapi exported call logs **did not show** a server / webhook / call-completed / roofleadhq request
  row.
- **Railway logs** reviewed around the test window **did not confirm** a webhook receipt; the visible
  lines were container restart / startup logs.
- **Backend receipt was not confirmed.**
- The webhook HTTP status from the Vapi-originated action **was not observed**.
- The result is therefore **ambiguous / not_confirmed**, **not** pass.

## Status fields (machine-checkable)

- `build_237_prerequisite_status = validated`
- `build_238_prerequisite_status = validated`
- `build_239_prerequisite_status = validated`
- `build_240_prerequisite_status = validated`
- `build_240_prerequisite_commit = 9b5f8ff`
- `build_240_guard_passed_before_action = true`
- `approval_count_limit = 1`
- `approved_assistant = Test Roofing Assistant only`
- `evidence_mode = sanitized evidence capture only`
- `vapi_originated_action_performed = true`
- `vapi_originated_action_count = 1`
- `phone_number_dialed = false`
- `twilio_call_placed = false`
- `sms_sent = false`
- `real_homeowner_traffic = false`
- `real_roofer_traffic = false`
- `vapi_call_record_observed = true`
- `vapi_log_export_showed_server_webhook_request = false`
- `railway_log_review_confirmed_backend_receipt = false`
- `webhook_http_status_observed = false`
- `backend_receipt_confirmed = false`
- `vapi_originated_validation_result = ambiguous_not_confirmed`
- `full_payload_processing_status = not_yet_validated`
- `real_call_test_status = not_started`
- `approval_consumed = true`
- `rerun_permitted_without_new_approval = false`
- `secret_value_recorded = false` / `value_redacted = true`

## Prerequisite validated/approved states (already proven)

- **Build 237** (commit `48bb25d`) — webhook auth gate-pair PASS: unauthenticated POST → HTTP 401;
  authorized `x-vapi-webhook-secret` POST → HTTP 400 `missing_required_field`.
- **Build 238** (commit `077716e`) — Vapi Bearer credential format PASS: `Authorization: Bearer
  <secret>` POST → HTTP 400 `missing_required_field`.
- **Build 239** (commit `a17d6f9`) — explicit user approval captured for exactly **one**
  Vapi-originated synthetic/controlled webhook validation (Test Roofing Assistant only, sanitized
  evidence only). Build 239 did not execute the validation.
- **Build 240** (commit `9b5f8ff`) — fresh pre-run guard PASS for that single approved validation;
  Build 240 did not execute the validation.

## Interpretation

- The **one approved** Vapi-originated browser test action was **consumed** by performing it exactly
  once.
- **Do NOT rerun** the Vapi-originated browser test (or any Vapi-originated / real-call action)
  **without a new, separate approval**.
- **Vapi-originated webhook receipt remains not confirmed** — the Vapi-originated validation result is
  **ambiguous / not_confirmed**, not a pass.
- **Full payload processing remains `not_yet_validated`.**
- **Real call test remains `not_started`** — a first real call is a later, separately-approved gate.
- **No** real call, SMS, Twilio call, homeowner contact, roofer contact, production data export,
  schema/auth/RLS change, or billing/CRM/public automation occurred.

## What was NOT done in this build

- **No Vapi Talk** clicked or used **by this build** (the approved one-time action was performed
  earlier, under the Build 240 guard; this build only records its sanitized evidence).
- **No real call** placed, received, or routed.
- **No `curl`** run against the live webhook.
- **No SMS** sent.
- **No Twilio** used; no Twilio config change.
- **No homeowner or roofer contact** of any kind.
- **No phone number dialed.**
- **No secret value** read, typed, printed, or committed;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. Only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded.
- **No phone numbers, raw call IDs, tokens, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data export, billing, CRM, or public/live automation change.**
- **No Railway variable set, no deploy/redeploy/restart** triggered by this build.

## Safety invariants (held by Build 241)

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
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Evidence summary table

| Item | Value | Captured |
|---|---|---|
| Build 237 prerequisite | validated (401 unauth / 400 authorized) | ✅ `48bb25d` |
| Build 238 prerequisite | validated (Bearer credential + 400 authorized) | ✅ `077716e` |
| Build 239 prerequisite | approval captured (one validation, scoped) | ✅ `a17d6f9` |
| Build 240 prerequisite | fresh pre-run guard PASS | ✅ `9b5f8ff` |
| Build 240 guard before action | passed | ✅ |
| Approved assistant | Test Roofing Assistant only | ✅ |
| Vapi-originated action performed | yes — exactly once | ✅ consumed |
| Phone dialed / Twilio / SMS | none | ✅ |
| Vapi call record observed | yes | ✅ |
| Vapi log export server/webhook row | not shown | ⛔ |
| Railway backend receipt confirmed | no | ⛔ |
| Backend receipt confirmed | false | ⛔ |
| Vapi-originated validation result | ambiguous_not_confirmed | ⛔ not pass |
| Full payload processing | not_yet_validated | ⛔ gated |
| Real call test | not_started | ⛔ later separate gate |
| Approval | consumed; no rerun without new approval | ✅ |

## Exact next recommended step

**Diagnose Vapi webhook delivery observability / configuration before any further Vapi-originated or
real-call action.** Because the Vapi-originated webhook receipt could not be confirmed (no
server/webhook/call-completed/roofleadhq row in the Vapi log export; only container restart/startup
lines in Railway around the test window; webhook HTTP status not observed), the next step is to
establish reliable delivery observability — confirm the assistant's server/webhook URL and event
configuration, and a way to observe the backend's receipt and HTTP response — **before** spending
another (separately-approved) Vapi-originated or real-call action. A first real call remains a later,
separately-approved gate.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 9b5f8ff`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main at `9b5f8ff`.

## Files added in Build 241

- `docs/VAPI_ORIGINATED_VALIDATION_AMBIGUOUS_EVIDENCE_BUILD_241.md` (this doc)
- `backend/scripts/verify-vapi-originated-validation-ambiguous-evidence-build-241-readonly.js`
- `scripts/run-vapi-originated-validation-ambiguous-evidence-build-241-dry-run.sh`
