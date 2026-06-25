# Controlled Live SMS Failed-Attempt Diagnosis + Readiness-Verifier Reconciliation (Build 187)

**Status:** `CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY` (Build 186 outcome) — diagnosed and reconciled, **no new send**.
**Scope:** Inspection, diagnosis, and verifier state reconciliation only. **No SMS is sent. No retry. No external Twilio call. No live execution. No secret values are read, printed, or committed.**
**Source-of-truth chain entering Build 187:** `0d3ceff` (Build 186 controlled live SMS failed-attempt evidence).
**Safety posture:** `demo_ready_with_live_automation_disabled` preserved.

---

## What happened in Build 186

The single signed one-message controlled live SMS attempt was permitted by the gate, made exactly once, and **failed** at the Twilio transport layer. No retry was performed and **no message was sent**.

| Field | Value |
| --- | --- |
| Gate decision before execution | `CONTROLLED_LIVE_SMS_PERMITTED` |
| Pre-flight | permitted |
| Send attempts | 1 |
| SMS sent | false |
| Captured error metadata (names/codes only) | `name=Error`, `code=20003`, `status=401` |
| Final decision | `CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY` |
| One-time approval | consumed — no further controlled live SMS permitted |

## Diagnosis (Build 187)

**Root cause class:** `twilio_authentication_rejection_at_transport_layer`.

HTTP `401` with Twilio error code `20003` (authenticate / permission denied) means the live Twilio credentials presented by the runner were **not accepted by Twilio**. The evidence records only the credential **names** as present (`TWILIO_LIVE_ACCOUNT_SID`, `TWILIO_LIVE_AUTH_TOKEN`, `TWILIO_LIVE_FROM_NUMBER`); a name-present marker does **not** prove the underlying value is valid, current, and matched to the account / from-number. The fault is therefore a **credential validity/configuration** issue in Jason's controlled secret store — **not** a workflow, gate, cap, consent, or recipient fault.

**Ruled out:** safety-gate misfire, missing recipient consent, one-message cap breach, auto-retry loop, real-homeowner contact, production data/Supabase, secret-value leak.

**What held correctly:** gate permitted only under the signed one-time approval, pre-flight permitted, one-message cap = 1, exactly one attempt, no retry, no secret values recorded, recipient was the approved consenting test identity, approval consumed after the attempt.

Full packet: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-failed-attempt-build-187-diagnosis.json`.

---

## Readiness-verifier divergence and reconciliation (versioned)

**The divergence:** Build 186 mutated the single shared gate-result file
`controlled-live-sms-readiness-gate-result.json` in place from `CONTROLLED_LIVE_SMS_BLOCKED`
→ `CONTROLLED_LIVE_SMS_PERMITTED` (a legitimate advance under the signed one-time approval). The
Build 185 read-only verifier hard-asserted `CONTROLLED_LIVE_SMS_BLOCKED` against that same live
file, so it began exiting `1` — a **stale** assertion, not a real safety regression.

**The reconciliation (versioning, not history rewrite):**

1. The historical Build 185 BLOCKED state is preserved verbatim in a versioned snapshot:
   `controlled-live-sms-readiness-gate-result-build-185-blocked.json`.
2. The Build 185 verifier now verifies its BLOCKED assertions against that **snapshot**, and
   additionally asserts the **live** file holds the legitimate Build 186 `PERMITTED` advance and that
   the two states are **distinct**. Both states are representable; no stale failing assertion remains.
3. A new Build 187 verifier
   (`verify-native-workflow-fixture-controlled-live-sms-failed-attempt-reconciliation-readonly.js`)
   verifies the diagnosis, the reconciliation, and that the corrected-retry template is unsigned.

| State | File | Decision |
| --- | --- | --- |
| Historical Build 185 | `...-readiness-gate-result-build-185-blocked.json` | `CONTROLLED_LIVE_SMS_BLOCKED` |
| Current (Build 186 advance) | `...-readiness-gate-result.json` | `CONTROLLED_LIVE_SMS_PERMITTED` |

---

## Corrected-retry approval template — UNSIGNED, NOT GRANTED

`backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-retry-approval-template.json`
is a local template only. It authorizes nothing. The Build 184 one-message approval consumed by
Build 186 **does not carry over**; any future corrected retry requires a fresh explicit signed
one-message approval **and** independent revalidation of the live credential values in Jason's
controlled store (never in the repo). `approval_granted=false`, `approval_signed=false`,
`authorizes_retry_now=false`.

---

## Files

| File | Role |
| --- | --- |
| `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-failed-attempt-build-187-diagnosis.json` | Local-only diagnosis packet (names/codes only). |
| `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-readiness-gate-result-build-185-blocked.json` | Versioned historical Build 185 BLOCKED snapshot. |
| `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-retry-approval-template.json` | Unsigned, not-granted corrected-retry approval template. |
| `backend/scripts/verify-native-workflow-fixture-controlled-live-sms-failed-attempt-reconciliation-readonly.js` | New Build 187 read-only verifier. |
| `backend/scripts/verify-native-workflow-fixture-controlled-live-sms-readiness-gate-readonly.js` | Build 185 verifier, retargeted to the snapshot + PERMITTED-advance acknowledgment. |
| `scripts/run-native-workflow-fixture-controlled-live-sms-failed-attempt-reconciliation-dry-run.sh` | Local-only dry-run wrapper. |

## Hard stops honored in Build 187

No SMS sent · no retry · no external Twilio call · no env/secret/API-key/credential values read or exposed · no production data or production Supabase · no real homeowner contact · no schema/auth/RLS/security changes · no public/live routes, webhooks, cron jobs, schedulers, or dispatchers · no billing/payment/deposit/quote/estimate/invoice automation · no step beyond diagnosis and verifier reconciliation.
