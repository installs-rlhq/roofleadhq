# Native Workflow — M1 Live-Validation Closeout + M2 Guarded Signed Approval (Build 219)

**Type:** LOCAL-ONLY build that **truthfully closes out the one authorized M1 live-validation send**
and **captures Jason's signed, single-use, scenario-specific M2 approval**, finalizing the guarded M2
live-execution path (future live runner + fail-closed, **non-mutating** send-time preflight).
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`M1_LIVE_VALIDATION_CONFIRMED_M2_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED`**

This build performs **no send**: no SMS, no Twilio/provider call, no Twilio client, no
`messages.create`, no network/external call, no credential load/inspection, no destination value
recorded, no confirm-token arming, no retry, no homeowner contact, no real roofer contact, no live
automation, no unrestricted launch. **This M2 approval authorizes M2 ONLY and never authorizes M1.**
**M1 remains permanently consumed and can never be reauthorized.**

## Source-of-truth binding

The M2 chain binds to the **verified Build 217 source commit `8d92939`** (the foundational
integrated-workflow commit) and the **verified Build 218 commit `21b840b`** (which captured and then
consumed the M1 approval). Because a commit cannot contain its own final hash, **Build 219 is
validated dynamically at send time** by its commit subject
(`test(workflow): close m1 and capture m2 approval build 219`) — its future hash is never hardcoded.

## M1 live-validation closeout (truthful)

Outside this build, Jason ran the guarded M1 runner: the **fully-armed preflight** confirmed the
native body equalled the signed M1 exactly and that a live send would be permitted, then exactly **one**
Jason-operated, SMS-only attempt was made. Recorded in
`backend/fixtures/native-workflow-demo-roofer/m1-live-validation-closeout-evidence-build-219.json`:

- **M1 native workflow path validated live**; the **exact signed M1 body** was sent.
- **One attempt only** (`send_attempt_count=1`, `retry_performed=false`); **SMS sent successfully**.
- **Recipient (Jason) confirmed receipt** and that the **received text matched M1 exactly** — **no
  generic or substituted copy** was received.
- **Approval consumed and expired** — permanently; M1 can never be reused.
- **Environment values cleared** after the attempt (live SIDs, token, from-number, destination,
  confirm token, raw/clean number).
- **No secrets, phone numbers, email addresses, raw SIDs, or destination values** recorded. **No
  homeowner or real-roofer contact. No unrestricted launch. All other live automation remains disabled.**

## What this build delivers

1. **Signed M2 approval** —
   `backend/fixtures/native-workflow-demo-roofer/m2-live-validation-signed-approval-build-219.json`.
   Records `approval_signed=true`, `approval_granted=true`, `signer_label=jason_operator`,
   `signed_date=2026-06-25`, `signed_timezone=America/Denver`, `exact_clock_time_recorded=false`,
   `scenario_key=missed_or_slow_lead_follow_up_nudge`, `message_id=M2`, `channel=sms`, the exact
   signed M2 text, `max_message_count=1`, `retry_allowed=false`, `approval_single_use=true`,
   `approval_consumed=false`, `approval_expired=false`, `authorizes_m2=true`, `authorizes_m1=false`,
   `m1_remains_consumed=true`, `destination_value_recorded=false`,
   `bound_build_217_source_commit=8d92939`, `verified_build_218_commit=21b840b`,
   `authorizes_send_during_build_219=false`. The exact signed statement is preserved verbatim.

2. **Guarded M2 execution path (future live runner)** —
   `backend/scripts/run-native-workflow-fixture-m2-guarded-live-validation-execution-build-219.js`.
   - Executes **M2 only**.
   - Produces the outbound body through the **Build 217 native workflow** (`bindRooferAlert`),
     not a separate literal, generic fallback, or environment-provided body.
   - Verifies the produced body **equals the signed M2 text exactly**, and **fails closed** on M1,
     empty, generic, substituted, modified, environment-overridden, or wrong-scenario copy.
   - **Requires M1 to remain consumed** and refuses to reuse or reauthorize M1.
   - Requires the signed Build 219 M2 approval, a **scenario-specific** send-time confirmation token
     (`M2_LIVE_VALIDATION_CONFIRM=SEND_ONE_M2_LIVE_VALIDATION_SMS`), and a destination
     (`M2_LIVE_VALIDATION_TO_NUMBER`) entered **silently** at execution time (never printed/persisted).
   - Permits **exactly one** attempt, **never retries**, and **consumes/expires** the approval before
     any attempted provider call.
   - The Twilio SDK is required **lazily** only inside the live-send path; the live path is gated
     behind explicit `--arm-live-send`. **Build 219 only ever runs the preflight.**

3. **Non-mutating send-time preflight (corrects the Build 218 defect)** — the M2 preflight emits its
   sanitized result to **stdout** (and optionally to a `/tmp` file via `--write-tmp`); it **never
   writes a tracked repository file** and leaves **`git status` byte-for-byte unchanged**. The same
   correction is applied to the Build 218 M1 runner's preflight (its now-consumed approval stays
   permanently blocked). A dedicated test
   (`backend/scripts/verify-m2-preflight-no-mutation-build-219-readonly.js`) proves the worktree is
   identical before and after the preflight (default and `--write-tmp`).

4. **Negative guard tests** —
   `backend/scripts/verify-m2-guarded-live-validation-negative-guards-build-219-readonly.js` proves
   the runner blocks: M1 body, generic delivery-test copy, empty body, modified M2, environment-
   overridden body, missing/unsigned/consumed approval, wrong source chain (`8a7ad6b`), wrong Build
   218 binding, M1-authorizing approval, **any attempt to reuse M1**, missing M1-consumption proof,
   dirty worktree, wrong branch/HEAD/subject, missing/wrong confirmation token (including the M1
   token), missing/multiple destination, missing credential names, and retry/multi-attempt — all
   **without any send**.

## Next step (not executed here)

Jason runs the M2 **non-mutating send-time preflight** (which never sends and never modifies a tracked
file); then, only after it passes **and** a scenario-specific confirmation token is deliberately
supplied, runs **at most one** guarded, Jason-operated M2 SMS attempt with **no retry**, entering the
destination **silently** at execution time. The single-use approval is consumed/expired after any
attempt. **Not send now, not unrestricted launch.** Lindy remains in safe pilot mode; no homeowner or
real-roofer contact is authorized; `demo_ready_with_live_automation_disabled` preserved.

After the guarded M2 attempt closes the last Jason-owned SMS scenario, the remaining product gap is
**genuine UI/demo packaging** and then **first real-roofer pilot recruitment**.
