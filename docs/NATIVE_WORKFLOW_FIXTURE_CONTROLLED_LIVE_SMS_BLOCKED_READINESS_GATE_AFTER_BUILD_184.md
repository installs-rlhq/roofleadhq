# Controlled Live SMS Readiness Gate + One-Message Approval Packet (Build 185)

**Status:** `CONTROLLED_LIVE_SMS_BLOCKED` — blocked by design.
**Scope:** Readiness and approval materials only. **No SMS is sent. No external Twilio call is made. No live execution occurs in Build 185.**
**Source-of-truth chain entering Build 185:** `037af7f` (Build 184 supervised sandbox SMS evidence).

This document is the **one-message approval packet/template** for a single future controlled **live** SMS test message to Jason's own consenting test identity. It does not authorize a send. A send becomes possible only in a later build after every prerequisite below is satisfied and the signature block is completed.

---

## What Build 185 adds

| File | Role |
| --- | --- |
| `backend/scripts/run-native-workflow-fixture-controlled-live-sms-readiness-gate.js` | Fail-closed readiness gate for ONE live SMS message. Names/booleans only; no secret values; no send; no external call. |
| `backend/scripts/verify-native-workflow-fixture-controlled-live-sms-readiness-gate-readonly.js` | Read-only verifier of the gate, marker, and this packet. |
| `scripts/run-native-workflow-fixture-controlled-live-sms-readiness-gate-dry-run.sh` | Local-only dry-run wrapper (runs gate expecting BLOCKED, then verifier). |
| `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-provisioning-marker.json` | Names/booleans-only input marker. |
| `backend/fixtures/native-workflow-demo-roofer/controlled-live-sms-readiness-gate-result.json` | Gate output (decision + blocked reasons). |
| `docs/NATIVE_WORKFLOW_FIXTURE_CONTROLLED_LIVE_SMS_BLOCKED_READINESS_GATE_AFTER_BUILD_184.md` | This approval packet/template. |

## Prior verified chain (confirmed by the gate)

- **Build 181** — local fake-data 30-scenario validation: 30/30 pass.
- **Build 182** — mock-backed channel-adapter execution engine: 30/30 pass.
- **Build 183** — sandbox-execution readiness gate: `SANDBOX_EXECUTION_PERMITTED`.
- **Build 184** — supervised sandbox/test-mode SMS evidence: `sms_actually_sent=false`, `sms_simulated_by_twilio_test_credentials=true`, one capped execution, no external Twilio delivery.

---

## Why the gate is BLOCKED in Build 185

Two hard prerequisites are intentionally not satisfied:

1. **`explicit_controlled_live_sms_one_message_approval_not_signed`** — the one-message live approval below is unsigned.
2. **`live_twilio_credentials_not_provisioned_in_jason_controlled_store`** — `TWILIO_LIVE_ACCOUNT_SID`, `TWILIO_LIVE_AUTH_TOKEN`, `TWILIO_LIVE_FROM_NUMBER` are tracked by **name only** and are not provisioned.

The gate inspects configuration **names** and boolean readiness flags only. It never reads, prints, or logs any secret value, and it performs no network or Twilio call.

---

## One-Message Approval Packet (to be completed in a FUTURE build, not now)

**Approved action (single):** Send exactly **one** live SMS message.
**Recipient:** Jason's own approved consenting test identity (`Jason Lohse / Test Roofing`). Not a real homeowner.
**Channel:** SMS only.
**Cap (`one_message_cap`):** 1 message. No retry, no batch, no broadcast.
**STOP / rollback owner:** Jason Lohse.
**STOP / rollback procedure:** Abort before send on any anomaly; after the single send, disable the one-message path and revoke live credentials from the controlled store. One message leaves no persistent automation enabled.

### Requirements that must ALL hold before any real SMS is sent

- [ ] Explicit signed one-message controlled-live SMS approval (signature block below completed).
- [ ] Live Twilio credentials provisioned **only** in Jason's controlled secret store / environment — never committed to the repo.
- [ ] Recipient remains Jason's own consenting test identity.
- [ ] One-message cap of exactly 1 enforced.
- [ ] STOP/rollback owner and procedure in place.
- [ ] No production Supabase or production data.
- [ ] No real homeowner contact.
- [ ] No billing / payment / deposit / quote / estimate / invoice automation.
- [ ] All other live automation remains disabled.

### Signature (leave blank in Build 185)

```
Approved by (name):        ____________________
One-message scope string:  controlled_live_sms_one_message_only_to_jason_own_consenting_test_identity_after_build_184
Date / time (with zone):   ____________________
Signature:                 ____________________
```

---

## Hard stops honored in Build 185

No SMS sent · no external Twilio call · no env/secret/API-key/credential/webhook-token values read or exposed · no production data · no real homeowner contact · no schema/auth/RLS/security changes · no public/live routes, webhooks, cron jobs, schedulers, or dispatchers · no billing/payment/deposit/quote/estimate/invoice automation · no step beyond readiness/approval materials.

**Safety posture:** `demo_ready_with_live_automation_disabled` preserved.
