# Native Workflow — M1 Guarded Signed Approval + Guarded Execution Path (Build 218)

**Type:** LOCAL-ONLY build that **captures Jason's signed, single-use, scenario-specific M1 approval**
and **finalizes the guarded M1 live-execution path** (future live runner + fail-closed send-time
source guard), with a **send-time preflight that never sends**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`M1_GUARDED_SIGNED_APPROVAL_CAPTURED_SEND_TIME_PREFLIGHT_REQUIRED`**

This build performs **no send**: no SMS, no Twilio/provider call, no Twilio client, no
`messages.create`, no network/external call, no credential load/inspection, no destination value
recorded, no confirm-token arming, no retry, no homeowner contact, no real roofer contact, no live
automation, no unrestricted launch. **This approval authorizes M1 ONLY and never authorizes M2.**

## Source-of-truth binding correction

The Build 217 unsigned approval-ready artifact recorded `source_of_truth_commit=8a7ad6b`, which was
the **Build 216 base commit** used to *build* Build 217. That value must **not** bind this signed
approval or any future execution. This signed approval and the future send-time guard bind to the
**verified Build 217 source commit `8d92939`**. Because a commit cannot contain its own final hash,
**Build 218 is validated dynamically at send time** by its commit subject
(`test(workflow): capture m1 live validation approval build 218`) — its future hash is never
hardcoded.

## What this build delivers

1. **Signed M1 approval** —
   `backend/fixtures/native-workflow-demo-roofer/m1-live-validation-signed-approval-build-218.json`.
   Records `approval_signed=true`, `approval_granted=true`, `signer_label=jason_operator`,
   `signed_date=2026-06-25`, `signed_timezone=America/Denver`, `exact_clock_time_recorded=false`,
   `scenario_key=new_roof_inspection_lead_alert`, `message_id=M1`, `channel=sms`, the exact signed
   M1 text, `max_message_count=1`, `retry_allowed=false`, `approval_single_use=true`,
   `approval_consumed=false`, `approval_expired=false`, `authorizes_m1=true`, `authorizes_m2=false`,
   `m2_approved=false`, `destination_value_recorded=false`, `bound_build_217_source_commit=8d92939`,
   `authorizes_send_during_build_218=false`. The exact signed statement is preserved verbatim.

2. **Guarded M1 execution path (future live runner)** —
   `backend/scripts/run-native-workflow-fixture-m1-guarded-live-validation-execution-build-218.js`.
   - Executes **M1 only**.
   - Produces the outbound body through the **Build 217 native workflow** (`bindRooferAlert`),
     not a separate literal, generic fallback, or environment-provided body.
   - Verifies the produced body **equals the signed M1 text exactly**, and **fails closed** on M2,
     empty, generic, substituted, modified, or wrong-scenario copy.
   - Requires the signed Build 218 approval, a **scenario-specific** send-time confirmation token,
     and a destination entered **silently** at execution time (never printed or persisted).
   - Permits **exactly one** attempt, **never retries**, and **consumes/expires** the approval after
     any attempt — successful, failed, or blocked.
   - Produces sanitized evidence (no secret, SID, phone, email, or destination values).
   - The Twilio SDK is required **lazily** only inside the live-send path; the live path is gated
     behind explicit `--arm-live-send`. **Build 218 only ever runs the preflight.**

3. **Send-time source guard** — fails closed unless current branch is `main`, `HEAD == origin/main`,
   the worktree is clean, the HEAD subject equals the Build 218 commit subject, the signed Build 218
   approval exists and binds to `8d92939`, M1 is approved and unconsumed, M2 remains unapproved,
   exact M1 binding passes, exactly one valid destination is present, required credential **names**
   are present (values never read), and the scenario-specific confirmation token matches exactly.

4. **Negative guard tests** —
   `backend/scripts/verify-m1-guarded-live-validation-negative-guards-build-218-readonly.js` proves
   the runner blocks: M2, generic delivery-test copy, empty body, modified M1, environment-overridden
   body, missing/unsigned/consumed approval, wrong source chain (`8a7ad6b`), dirty worktree, wrong
   branch/HEAD/subject, missing/wrong confirmation token, missing/multiple destination, missing
   credential names, and retry/multi-attempt requests — all **without any send**.

## Send-time preflight (never sends)

`backend/fixtures/native-workflow-demo-roofer/m1-guarded-send-time-preflight-result-build-218.json`
records the computed, fail-closed guard decision. During Build 218 `would_permit_live_send=false`
(the confirmation token is never armed), the native-workflow body equals the signed M1 exactly, and
the approval is valid, M1-only, bound to `8d92939`, and unconsumed. **A dry-run/preflight never sends.**

## Next step (not executed here)

Jason runs the M1 **send-time preflight** (which never sends); then, only after it passes **and** a
scenario-specific confirmation token is deliberately supplied, runs **at most one** guarded,
Jason-operated M1 SMS attempt with **no retry**, entering the destination **silently** at execution
time. The single-use approval is consumed/expired after any attempt. **Not send now, not unrestricted
launch.** Lindy remains in safe pilot mode; no homeowner or real-roofer contact is authorized;
`demo_ready_with_live_automation_disabled` preserved.
