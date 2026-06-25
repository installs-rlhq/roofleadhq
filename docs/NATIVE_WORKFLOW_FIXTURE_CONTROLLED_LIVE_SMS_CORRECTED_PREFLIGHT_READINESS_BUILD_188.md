# Native Workflow Fixture — Corrected Live-SMS Pre-Flight Readiness (Build 188)

**Status:** `CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_BLOCKED` (fail-closed, by design)
**Safety posture:** `demo_ready_with_live_automation_disabled`
**Channel:** SMS only. **No SMS sent. No retry. No external Twilio call. No live execution.**
**Data classification:** names / metadata / booleans only — **no secret VALUES anywhere.**

---

## 1. Why Build 188 exists

In **Build 186**, the single signed, permitted controlled live SMS attempt was rejected by Twilio at
the authentication layer (**HTTP 401 / code 20003**) before any message was accepted for delivery.
Nothing was sent; no retry was performed; the one-time Build 184 approval was consumed.

The **Build 187** diagnosis classified this as a *credential validity / configuration fault* in
Jason's controlled secret store — **not** a workflow, gate, cap, consent, or recipient fault. The key
lesson: the pre-186 readiness gate treated a credential **NAME-present** marker as sufficient. It is
not. A name being present does **not** prove the underlying **VALUE** is valid, current, and matched
to the same active Twilio account and an SMS-capable from-number.

Build 188 hardens the pre-send path so this failure mode is caught *before* any future attempt.

---

## 2. What Build 188 adds (all local-only)

| Artifact | Path | Role |
|---|---|---|
| Credential revalidation marker | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-credential-revalidation-marker.json` | Names/booleans-only record of post-186 revalidation state (currently **not** revalidated). |
| Credential-readiness **self-check** runner | `backend/scripts/run-native-workflow-fixture-controlled-live-sms-credential-readiness-self-check.js` | Fail-closed self-check. Passes only when NAMES present **AND** values independently revalidated after the 401. |
| Self-check result | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-credential-readiness-self-check-result.json` | `CREDENTIAL_READINESS_SELF_CHECK_BLOCKED`. |
| Corrected one-message **pre-flight gate** runner | `backend/scripts/run-native-workflow-fixture-controlled-live-sms-corrected-preflight-gate.js` | Fail-closed gate. Supersedes the pre-186 readiness gate. |
| Pre-flight gate result | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-preflight-gate-result.json` | `CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_BLOCKED`. |
| Fresh **unsigned** approval capture template | `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-one-message-retry-approval-build-188-template.json` | `TEMPLATE_ONLY_NOT_GRANTED_NOT_SIGNED_NOT_APPROVED`. |
| Read-only verifier | `backend/scripts/verify-native-workflow-fixture-controlled-live-sms-corrected-preflight-readiness-build-188-readonly.js` | Proves all of the above. |
| Dry-run wrapper | `scripts/run-native-workflow-fixture-controlled-live-sms-corrected-preflight-readiness-build-188-dry-run.sh` | Local-only orchestration; runs self-check + gate (expect BLOCKED) + verifier + inline secret scan. |

---

## 3. The corrected pre-flight gate logic

The gate returns `CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_PERMITTED` **only when every one** of the
following holds (otherwise it is `CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_BLOCKED`):

1. **Credential self-check passes** — names present **and** credential VALUES independently
   revalidated by Jason in his controlled store after the Build 186 failure.
2. **Fresh approval is signed** — the Build 188 template is signed/granted (it does **not** carry over
   the consumed Build 184 approval or the prior Build 187 template).
3. **One-message cap confirmed** at exactly `1`.
4. **Recipient is Jason's own consenting test identity** — by marker only (no real homeowner, consent
   on file, recipient number never recorded).
5. **Retry count is zero** — a single fresh send, never a retry-loop.
6. **All other live automation remains disabled** — SMS-only channel; no production Supabase/data,
   no real homeowner contact, no billing/payment/deposit/quote/estimate/invoice automation.

In Build 188, conditions **1 and 2 are not met** (credentials not revalidated; fresh approval
unsigned), so the gate is **BLOCKED**. Conditions 3–6 are already satisfied and encoded as `true`.

---

## 4. STOP / rollback

- **STOP / rollback owner:** Jason Lohse.
- **Rollback status:** no send performed — nothing to roll back.
- Any future attempt requires a *fresh* signed approval; no prior approval carries over.

---

## 5. Runbook — how to run the Build 188 dry run (local-only)

```bash
bash scripts/run-native-workflow-fixture-controlled-live-sms-corrected-preflight-readiness-build-188-dry-run.sh
```

Expected: self-check **BLOCKED** (nonzero), gate **BLOCKED** (nonzero), verifier **PASS** (exit 0),
inline secret scan **PASS**. **No SMS is sent. No external Twilio call is made. No retry occurs.**

---

## 6. What must happen before a corrected live retry is even considered (human steps, not builds)

1. Jason **independently revalidates the live Twilio credential VALUES** in his controlled secret
   store (never in the repo): account SID, auth token, and from-number confirmed to belong to the
   same active account, with the from-number SMS-capable and authorized for the destination.
2. Jason sets the post-186 revalidation booleans to `true` in the revalidation marker.
3. Jason **signs the fresh Build 188 one-message approval** template.

Only after all three is a future build permitted to attempt exactly one corrected controlled live
SMS (cap 1, no retry).

---

## 7. Hard guarantees preserved in Build 188

- Local-only build. No public routes, cron, scheduler, webhook, production DB, schema, auth, RLS,
  billing, quote, invoice, deposit, CRM, email, call, or calendar automation.
- No secret VALUES read, printed, logged, or committed — names / metadata / booleans only.
- Live automation remains disabled. `demo_ready_with_live_automation_disabled` preserved.
