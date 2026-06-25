# RoofLeadHQ — All-Inclusive Context Package (after Build 187)

> Paste this whole document into a brand-new ChatGPT/Claude chat to continue RoofLeadHQ with full context.
> It contains **no secret values, no phone numbers, no recipient number, no tokens, no SIDs, no credentials** — only names, codes, booleans, and decisions.

---

## 0. Source of truth

- **Repo path (source of truth):** `/root/roofleadhq`
- **Branch:** `main`
- **Build 187 closeout commit (code/evidence state):** `0d0c68b15252cbd254f9e375580ad4eaf46e1386` (`0d0c68b`)
- **HEAD == origin/main:** verified equal at Build 187 closeout.
- **Source-of-truth verification:** PASS (`scripts/verify-source-of-truth.sh`).
- **Final git status:** blank (clean working tree).
- **Safety posture:** `demo_ready_with_live_automation_disabled` (preserved at every build).

> Note: this context-package document is committed on top of `0d0c68b` as a docs-only commit
> (`docs(workflow): add all-inclusive context package after build 187`). It changes no code or evidence.

---

## 1. What RoofLeadHQ is (orientation)

RoofLeadHQ is a roofing-lead automation system. Current work is a long, deliberately **safety-gated**
march toward a **first controlled live launch**, executed as many small "Builds," each of which:
- commits + pushes to `main`,
- keeps live automation disabled,
- records names/booleans-only evidence (never secret values),
- and is verified by a read-only verifier plus a source-of-truth check.

The channel under test is **SMS only**. All other live automation (calendar, VAPI outbound, Resend
email, Lindy) remains disabled.

---

## 2. Build history summary (local fake-data runner → Build 187)

Builds before 181 established the runner/guard/approval scaffolding (fail-closed command wrappers,
pre-run guards, signed-approval capture, and the demo-roofer fixture chain). The material execution
chain is Builds 181–187:

| Build | What it did | Result |
| --- | --- | --- |
| **181** | Local fake-data **30-scenario executor** (replaces the old fail-closed stub). | **30/30 PASS**, local fake data only. |
| **182** | **Mock-backed channel-adapter** execution engine over the 30 scenarios. | **30/30 PASS**, executed through adapter, local fake data only. |
| **183** | **Sandbox/test-mode execution readiness gate** + runbook. | `SANDBOX_EXECUTION_PERMITTED`, `sandbox_execution_ready=true`. |
| **184** | **Supervised sandbox/test-mode SMS** execution (one capped run). | `sms_actually_sent=false`, `sms_simulated_by_twilio_test_credentials=true`, 1 execution — **simulated, no live delivery**. |
| **185** | **Controlled live SMS readiness gate** (one message only) + one-message approval packet. | `CONTROLLED_LIVE_SMS_BLOCKED` by design (approval unsigned, live creds not provisioned). Names only. |
| **186** | **Controlled live SMS one-message** attempt, under signed one-time approval. | Gate `CONTROLLED_LIVE_SMS_PERMITTED`; **1 attempt; SMS NOT sent; failed; no retry**; approval consumed. `CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY`. |
| **187** | **Failed-attempt diagnosis** + **readiness-verifier state reconciliation**; unsigned corrected-retry template. | Diagnosed Twilio auth rejection (401 / code 20003); reconciled stale Build 185 verifier via versioned snapshot; **no send, no retry**. |

---

## 3. Per-build detail (181–187)

### Build 181 — local 30-scenario executor
- File: `backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-local-validation-result.json`
- `data_classification=local_fake_data_only`, `passed_count=30`, `total_scenarios_count=30`.
- Decision: **PASS LOCAL FAKE-DATA 30-SCENARIO VALIDATION**.
- Finding: the original "actual external/sandbox 30-scenario runner" was a **fail-closed stub/placard**, not a real scenario executor. Build 181 replaced it with a real local executor that passes 30/30.

### Build 182 — mock-backed channel adapter
- File: `backend/fixtures/native-workflow-demo-roofer/channel-adapter-execution-engine-mock-result.json`
- `passed_count=30`, `total_scenarios_count=30`, `executed_through_adapter_count=30`, `local_fake_data_only`.
- Decision: **PASS LOCAL MOCK-BACKED CHANNEL-ADAPTER 30-SCENARIO EXECUTION**.

### Build 183 — sandbox/live readiness gate + runbook
- File: `backend/fixtures/native-workflow-demo-roofer/sandbox-execution-readiness-gate-result.json`
- `gate_decision=SANDBOX_EXECUTION_PERMITTED`, `sandbox_execution_ready=true`, names only.

### Build 184 — supervised sandbox/test-mode SMS
- File: `backend/fixtures/native-workflow-demo-roofer/supervised-sandbox-sms-execution-evidence.json`
- `sms_actually_sent=false`, `sms_simulated_by_twilio_test_credentials=true`, `executions_performed=1`.
- Decision: **PASS ONE-TIME SUPERVISED SANDBOX/TEST-MODE SMS EXECUTION (SIMULATED, NO LIVE DELIVERY)**.

### Build 185 — controlled live SMS readiness gate + one-message approval packet
- Gate runner: `backend/scripts/run-native-workflow-fixture-controlled-live-sms-readiness-gate.js`
- Marker: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-provisioning-marker.json` (names/booleans only)
- Approval packet doc: `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_BLOCKED_READINESS_GATE_AFTER_BUILD_184.md`
- In Build 185 the gate was `CONTROLLED_LIVE_SMS_BLOCKED` by design: one-message approval unsigned and live Twilio credentials not provisioned. Channel SMS only; one-message cap = 1; recipient = Jason's own consenting test identity; STOP/rollback owner = Jason Lohse.

### Build 186 — controlled live SMS one-message attempted-failed / no-retry
- Evidence: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json`
- Closeout: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-build-186-closeout.json`
- Gate decision before execution: `CONTROLLED_LIVE_SMS_PERMITTED` (under signed one-time approval, after Build 184).
- Pre-flight: permitted. **Send attempts: 1. SMS sent: false. Auto-retry: false (none performed).**
- Captured error metadata (names/codes only): `name=Error`, `code=20003`, `status=401`. No secret values, no recipient number recorded.
- Final decision: `CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY`.
- One-time approval: **consumed** — no further controlled live SMS permitted under it.

### Build 187 — failed-attempt diagnosis + verifier reconciliation
- Diagnosis: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-failed-attempt-build-187-diagnosis.json`
  - Root cause class: `twilio_authentication_rejection_at_transport_layer`.
  - HTTP `401` + Twilio code `20003` (authenticate / permission denied) ⇒ the live Twilio credentials presented were **not accepted by Twilio**. Evidence records only credential **names** as present; a name-present marker does not prove the value is valid/current/account-matched. ⇒ credential validity/configuration fault in Jason's controlled store, **not** a gate/cap/consent/recipient/retry/data fault.
  - Ruled out: gate misfire, missing consent, cap breach, retry loop, real-homeowner contact, production data, secret leak.
- Reconciliation (versioned): the live gate-result file legitimately advanced BLOCKED→PERMITTED in Build 186, which made the Build 185 verifier's hard `CONTROLLED_LIVE_SMS_BLOCKED` assertion stale (exit 1).
  - Historical BLOCKED state preserved verbatim in a versioned snapshot: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-readiness-gate-result-build-185-blocked.json`.
  - Build 185 verifier retargeted to the snapshot **and** now asserts the live file holds the legitimate PERMITTED advance (two distinct states; no stale failing assertion).
  - New Build 187 verifier: `backend/scripts/verify-native-workflow-fixture-controlled-live-sms-failed-attempt-reconciliation-readonly.js`.
- Corrected-retry approval template (unsigned, NOT granted): `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-retry-approval-template.json` — `approval_granted=false`, `approval_signed=false`, `authorizes_retry_now=false`; consumed Build 186 approval does **not** carry over.
- Verifier results: reconciled Build 185 verifier PASS (14 assertions, was exit 1), Build 187 verifier PASS (11 assertions), dry-run wrapper PASS, safe readiness fast lane PASS (incl. backend build), source-of-truth PASS.

---

## 4. Important findings (cumulative)

- The original "actual external/sandbox 30-scenario runner" was a **fail-closed stub/placard**, not a real scenario executor.
- **Local 30-scenario execution now passes** (30/30, Build 181).
- **Mock-backed channel-adapter execution now passes** (30/30, Build 182).
- **Sandbox/test-mode SMS did not send a real SMS** — simulated/test-mode only (Build 184).
- **Controlled live SMS gate reached `PERMITTED`** under signed one-time approval (Build 186).
- **Exactly one** controlled live SMS attempt was made (Build 186).
- **SMS was NOT sent.**
- **No retry** was performed.
- **Evidence was captured** (names/codes/booleans only).
- The failure cause is a **Twilio authentication rejection** (HTTP 401 / code 20003) — a credential validity/configuration issue, not a workflow/safety fault (Build 187).
- Throughout: **no** production Supabase/data, **no** real homeowner contact, **no** billing/payment/deposit/quote/estimate/invoice automation, **no** schema/auth/RLS/security changes, **no** public routes, webhooks, cron jobs, schedulers, or dispatchers were introduced.
- **No secret values and no recipient number** were recorded or committed at any point.

---

## 5. Standing hard stops & safety rules (always in force)

- **No live SMS / call / email / calendar action without a fresh, explicit, signed approval.**
- **No retry of Build 186 is approved.** The Build 184/186 one-time approval is consumed.
- **No Twilio/external call without fresh scoped approval.**
- **No secret values** pasted into chat, logged, printed, or committed. Do not ask Jason to paste secrets.
- **No real homeowner contact.**
- **No production Supabase / production data.**
- **No schema/auth/RLS/security changes.**
- **No public/live routes, webhooks, cron jobs, schedulers, or dispatchers.**
- **No billing/payment/deposit/quote/estimate/invoice automation.**
- **Keep safety posture `demo_ready_with_live_automation_disabled`.**

---

## 6. Next recommended path

1. **Diagnosis is already captured in Build 187** using only non-secret metadata and local evidence (Twilio 401 / code 20003 = authentication rejection). Re-read it before acting: `controlled-live-sms-failed-attempt-build-187-diagnosis.json`.
2. **A future corrected-retry decision/approval template already exists, unsigned / not granted** (`controlled-live-sms-corrected-retry-approval-template.json`). Do not sign it on Jason's behalf.
3. **Do NOT run another live attempt** until Jason: (a) independently revalidates the live Twilio credential **values** in his own controlled secret store (never in the repo), confirms SID/auth-token/from-number belong to the same active account and the from-number is SMS-capable/authorized; and (b) **signs a fresh explicit one-message approval**.
4. **Prioritize the fastest safe path toward controlled launch** — advance safe, local-only readiness work while the live retry stays gated behind Jason's fresh approval.

---

## 7. Jason's workflow preferences

- Use **`/root/roofleadhq`** as the source of truth.
- Commands should begin with **`cd /root/roofleadhq`**.
- Prefer the **biggest safe local-only builds**.
- Use **Claude Code / Terminal 1** by default.
- When asking Jason to run Claude, include the **setup command plus the prompt**.
- After each build, **report builds completed and estimated builds remaining until launch**.

---

## 8. Exact files that matter now

**Build 186 (attempt + closeout)**
- `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json`
- `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-build-186-closeout.json`
- `backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js` (DO NOT rerun)

**Build 187 (diagnosis + reconciliation)**
- `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-failed-attempt-build-187-diagnosis.json`
- `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-readiness-gate-result-build-185-blocked.json` (versioned historical BLOCKED snapshot)
- `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-retry-approval-template.json` (unsigned)
- `backend/scripts/verify-native-workflow-fixture-controlled-live-sms-failed-attempt-reconciliation-readonly.js`
- `scripts/run-native-workflow-fixture-controlled-live-sms-failed-attempt-reconciliation-dry-run.sh`
- `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_FAILED_ATTEMPT_RECONCILIATION_AFTER_BUILD_186.md`

**Readiness gate / verifier (live SMS one-message)**
- `backend/scripts/run-native-workflow-fixture-controlled-live-sms-readiness-gate.js`
- `backend/scripts/verify-native-workflow-fixture-controlled-live-sms-readiness-gate-readonly.js` (reconciled in Build 187)
- `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-readiness-gate-result.json` (live state: `CONTROLLED_LIVE_SMS_PERMITTED`)
- `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-provisioning-marker.json` (names/booleans only)
- `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_BLOCKED_READINESS_GATE_AFTER_BUILD_184.md`

**Prior chain (181–184)**
- `backend/fixtures/native-workflow-demo-roofer/actual-external-sandbox-30-scenario-local-validation-result.json`
- `backend/fixtures/native-workflow-demo-roofer/channel-adapter-execution-engine-mock-result.json`
- `backend/fixtures/native-workflow-demo-roofer/sandbox-execution-readiness-gate-result.json`
- `backend/fixtures/native-workflow-demo-roofer/supervised-sandbox-sms-execution-evidence.json`

**Safe verification harness**
- `scripts/verify-source-of-truth.sh`
- `scripts/verify-safe-readiness-fast.sh` (fast lane; includes backend build)
- `scripts/verify-safe-readiness.sh` (full aggregate regression)

---

## 9. Current Launch State

**Proven**
- Local 30/30 scenario execution (181) and 30/30 mock-backed channel-adapter execution (182).
- Sandbox/test-mode SMS path works and **does not** deliver a real message (184, simulated).
- The controlled live SMS gate can reach `PERMITTED` under a signed one-time approval (186).
- The end-to-end live send path actually reaches Twilio (the request was made and Twilio responded).

**Not yet proven**
- A **successful live SMS delivery**. The one attempt failed at Twilio authentication; no message was sent.
- That the live Twilio credential **values** are valid/current/account-matched (only names are tracked).

**Blocked**
- Any further controlled live SMS under the Build 186 approval (consumed).
- Any retry of the Build 186 send.

**Requires fresh approval**
- Independent revalidation of live Twilio credential values by Jason in his controlled store, **plus** a fresh explicit signed one-message approval, before any corrected retry.

**What the next chat should do first**
- Re-read the Build 187 diagnosis, confirm the failure is the Twilio 401/20003 auth rejection, present the corrected-retry template to Jason as **unsigned/not granted**, and advance the **fastest safe local-only** readiness work. Do **not** attempt a live send.

---

## 10. Do Not Do (next chat)

- **Do not retry the live SMS** (Build 186 retry is not approved).
- **Do not ask Jason for secrets** or to paste any credential/token/SID/phone number.
- **Do not infer or assume approval** — approval must be explicit and signed by Jason.
- **Do not treat the failed send as a successful delivery** — no SMS was sent.
- **Do not expand channels** beyond SMS.
- **Do not activate live automation** — keep `demo_ready_with_live_automation_disabled`.

---

## 11. First Prompt for New Chat

Paste this as your first message in the new chat:

```
You are continuing RoofLeadHQ. Source of truth is the local repo at /root/roofleadhq on branch main;
all commands must begin with cd /root/roofleadhq. Build 187 is closed out at commit 0d0c68b
(HEAD == origin/main, source-of-truth PASS, git status clean, safety posture
demo_ready_with_live_automation_disabled).

Context: the controlled live SMS one-message attempt in Build 186 was made exactly once, the SMS was
NOT sent, it failed, and no retry was performed. Build 187 diagnosed the failure as a Twilio
authentication rejection (HTTP 401 / code 20003 — a credential validity/configuration issue, not a
workflow or safety fault) and produced an UNSIGNED, NOT-GRANTED corrected-retry approval template.
The Build 186 one-time approval is consumed and does not carry over.

Start Build 188 as the biggest safe, LOCAL-ONLY build. Do NOT send or retry any live SMS, do NOT make
any Twilio/external call, do NOT ask me to paste secrets, do NOT infer approval, do NOT treat the
failed send as delivered, do NOT expand channels, and keep all live automation disabled.

For Build 188, first re-read these and confirm them back to me:
- backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-failed-attempt-build-187-diagnosis.json
- backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-retry-approval-template.json
- backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence.json

Then propose the fastest safe local-only path toward a controlled live launch that does NOT require a
live attempt (e.g., a pre-send credential-validity self-check using NAMES/metadata only, a corrected
one-message pre-flight readiness gate, and a fresh signed-approval capture template that stays
unsigned until I sign it). Implement it as a local-only build with a read-only verifier, run the safe
local verification (targeted verifier, source-of-truth, secret scan, safe readiness fast lane, backend
build), commit with a test(workflow): ... message, push, and verify HEAD == origin/main with a blank
git status. At the end, report builds completed and estimated builds remaining until launch.
```

**To run this in Claude Code / Terminal 1:**

```
cd /root/roofleadhq && claude
```

Then paste the prompt above.

---

## 12. Builds completed / remaining

- **Builds completed through Build 187:** the full 181→187 controlled-launch chain above (plus the pre-181 scaffolding builds).
- **Estimated builds remaining until controlled launch:** ~**2–4** safe builds, gated on Jason's actions, not code:
  1. Build 188 — corrected pre-send credential-validity self-check (names/metadata only) + corrected one-message pre-flight gate + fresh unsigned approval capture template.
  2. Jason independently revalidates live Twilio credential values in his controlled store and signs the fresh one-message approval (human step, not a build).
  3. Build 189 (only after a signed fresh approval) — single corrected controlled live SMS attempt, capped at 1, no retry.
  4. Build 190 — closeout/evidence + launch-readiness summary.
- This estimate assumes the corrected retry succeeds on the first attempt after credentials are revalidated. Live activation remains disabled until then.
