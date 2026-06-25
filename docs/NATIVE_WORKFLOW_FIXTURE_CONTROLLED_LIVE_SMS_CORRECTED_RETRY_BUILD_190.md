# Controlled Live SMS — Corrected Retry Closeout / Runbook (Build 190)

**Gate decision:** `CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_PERMITTED`
**Send result in build environment:** **No SMS sent — 0 send attempts — no retry** (send not armable here)
**Safety posture:** `demo_ready_with_live_automation_disabled` (preserved)
**Classification:** local-only, names/metadata/booleans/codes only — no secret VALUES, no phone numbers.

## What Build 190 captured

1. **Fresh signed approval** (`...corrected-one-message-approval-signed-build-190.json`):
   Jason Lohse's explicit, signed approval for **exactly one** controlled live SMS retry — SMS only,
   to his own consenting test identity by existing marker, retry **0**, expiring after one attempt or
   any gate failure. It does **not** carry over the Build 184 approval (consumed by Build 186).
2. **Credential revalidation attestation** (`...credential-revalidation-attestation-build-190.json`):
   Jason attests he **independently revalidated the live Twilio credential VALUES** in his controlled
   secret store after the Build 186 `401 / 20003` failure. Revalidation is a **human step, not a build
   step**; the assistant did **not** (and cannot) independently verify the secret values.
3. **Corrected credential self-check** → `CREDENTIAL_READINESS_SELF_CHECK_PASSED`.
4. **Corrected pre-flight gate** → `CONTROLLED_LIVE_SMS_CORRECTED_PREFLIGHT_PERMITTED` (all
   preconditions true; no blocked reasons).
5. **Execution evidence** + **closeout** capturing the outcome below.

## Why no SMS was sent during this build

The corrected pre-flight gate **PERMITS** exactly one attempt, but the actual live send is a
**human-operated step performed by Jason in his controlled environment**. By design, the live Twilio
credentials, the approved recipient destination number, the Twilio SDK, and the deliberate confirm
token live **only** in Jason's controlled environment — never in the repo or the build/assistant
environment. A names-only arming check in the build environment found **all absent**:

| Item (names only) | Build environment |
|---|---|
| `TWILIO_LIVE_ACCOUNT_SID` | absent |
| `TWILIO_LIVE_AUTH_TOKEN` | absent |
| `TWILIO_LIVE_FROM_NUMBER` | absent |
| `CONTROLLED_LIVE_SMS_TO_NUMBER` | absent |
| `CONTROLLED_LIVE_SMS_CONFIRM` token | absent |
| Twilio SDK installed | no |

Performing the send here would require the assistant to obtain/handle secrets, credentials, and a
phone number — which is prohibited. Therefore: **`send_attempt_count = 0`, `sms_was_sent = false`,
`retry_performed = false`**, and the single approved attempt is **pending Jason's controlled execution**.

## STOP — how Jason fires the single approved attempt (in his controlled environment only)

Run the existing, fail-closed one-message execution runner **in Jason's controlled environment**,
where the live credentials and recipient number are provisioned (never in the repo):

```bash
# In Jason's controlled environment ONLY (credentials/recipient never committed):
#   TWILIO_LIVE_ACCOUNT_SID, TWILIO_LIVE_AUTH_TOKEN, TWILIO_LIVE_FROM_NUMBER,
#   CONTROLLED_LIVE_SMS_TO_NUMBER  (the approved consenting test-identity destination, E.164)
CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS \
  node backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js
```

The runner re-gates **fail-closed** at send time, makes **exactly one** `messages.create` call,
performs **no retry** under any outcome, and records names/codes-only evidence (no secret values, no
recipient number). If credentials are still rejected (e.g. another `401 / 20003`), that consumes the
one approved attempt with **no retry**; a further attempt would require a fresh signed approval.

## Hard rules honored

- SMS only; exactly one attempt maximum; **no retry** under any condition.
- No secrets/tokens/SIDs/credential values/phone numbers printed or committed.
- No real homeowner contact; no production Supabase/data.
- No schema/auth/RLS/security changes; no public routes/webhooks/cron/schedulers/dispatchers.
- All other live automation remains disabled; `demo_ready_with_live_automation_disabled` preserved.

## Artifacts (Build 190)

- Signed approval: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-one-message-approval-signed-build-190.json`
- Revalidation attestation: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-credential-revalidation-attestation-build-190.json`
- Corrected self-check: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-credential-readiness-self-check-result-build-190.json`
- Corrected pre-flight gate: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-corrected-preflight-gate-result-build-190.json`
- Execution evidence: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-execution-evidence-build-190.json`
- Closeout: `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-one-message-build-190-closeout.json`
- Read-only verifier: `backend/scripts/verify-native-workflow-fixture-controlled-live-sms-corrected-retry-build-190-readonly.js`
- Dry-run/closeout wrapper: `scripts/run-native-workflow-fixture-controlled-live-sms-corrected-retry-build-190-dry-run.sh`

## How to verify (read-only)

```bash
bash scripts/run-native-workflow-fixture-controlled-live-sms-corrected-retry-build-190-dry-run.sh
# or just the verifier:
node backend/scripts/verify-native-workflow-fixture-controlled-live-sms-corrected-retry-build-190-readonly.js
```

Both are read-only and make **no** network, SMS, retry, Twilio, or production-data calls.
