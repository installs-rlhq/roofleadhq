# Jason-Operated Real-Customer Pilot One-Message Send — Command Runbook (Build 204)

**Audience:** Jason Lohse only. **Operated by:** Jason, in his own controlled environment.
**Build environment / Claude:** must NOT run this. This repo neither runs the send nor sets the
confirm token. This Build 204 approval does **not** authorize Claude or the build environment to send
SMS or make external calls.
**Scope:** **first real-customer pilot** — one consenting real roofer/customer, **SMS only**, **one
message maximum**, **no retry**, **no homeowner contact**, **no production automation**.
**Safety posture:** `demo_ready_with_live_automation_disabled` (preserved by the repo; the actual
send is a separate Jason-operated action outside the repo).

This runbook is **documentation only**. Running it is a deliberate, manual, **one-time** action that
Jason performs in his own shell with his own live credentials and the approved destination. Nothing in
this repository performs the send, and Build 204 arms **no** confirm token.

## Preconditions (all must be true, confirmed by Jason)

- Consent/readiness markers captured:
  `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-consent-readiness-build-204.json`
  (`real_roofer_customer_consent_marker_present=true`, `approved_destination_marker_present=true`,
  `approved_destination_number_recorded=false`, `stop_opt_out_language_finalized=true`,
  `homeowner_contact_authorized=false`, `sms_only=true`, `max_message_count=1`, `retry_allowed=false`).
- Final signed one-message approval captured:
  `backend/fixtures/native-workflow-demo-roofer/real-customer-pilot-final-one-message-approval-build-204-signed.json`
  (`approval_signed=true`, `authorizes_jason_operated_one_message_send=true`,
  `authorizes_build_environment_send=false`, `authorizes_homeowner_contact=false`,
  `authorizes_unrestricted_launch=false`).
- Send-time preflight gate is
  `READY_FOR_JASON_OPERATED_REAL_CUSTOMER_PILOT_ONE_MESSAGE_SEND`
  (`send_attempt_count=0`, `sms_sent=false`, `live_send_executed_by_build=false`).
- **One** consenting real roofer/customer only; **SMS only**; **one message maximum**; **no retry**;
  **no homeowner contact**; **no production data**; **no non-SMS channel**.
- The approved destination is the consenting real roofer/customer identity (E.164), supplied **only**
  in Jason's shell — **never** stored in the repo, a fixture, chat, or a fictional placeholder number.

## The existing fail-closed runner

The send uses the existing fail-closed one-message runner — no new send code is added by Build 204:

`backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js`

It is fail-closed: it blocks unless the readiness gate reports `CONTROLLED_LIVE_SMS_PERMITTED`, the
required live credential env vars and the approved destination env var are present **in the shell**,
and the deliberate confirm token is set. It makes **exactly one** `messages.create` call and performs
**no retry** on failure, ambiguity, or error.

## Required environment variables (set in Jason's shell only — never in repo/chat)

Set these in your own shell. They are **names only** here; supply the real values yourself. Do not
echo, log, paste, or commit any value. Source your local Twilio secret file if you keep one:

```bash
# In Jason's own shell, source a LOCAL secret file if present (path is illustrative; keep it OUTSIDE the repo):
[ -f "$HOME/.roofleadhq/twilio.env" ] && source "$HOME/.roofleadhq/twilio.env"
```

- `TWILIO_LIVE_ACCOUNT_SID`
- `TWILIO_LIVE_AUTH_TOKEN`  *(value supplied only in your shell; never written here)*
- `TWILIO_LIVE_FROM_NUMBER`
- `CONTROLLED_LIVE_SMS_TO_NUMBER`  *(the approved consenting real roofer/customer destination, E.164)*

Enter the approved destination **silently** (no echo, no paste into chat/logs):

```bash
# Prompt yourself for the approved destination without echoing it to the terminal:
read -rs CONTROLLED_LIVE_SMS_TO_NUMBER && export CONTROLLED_LIVE_SMS_TO_NUMBER
```

Names-only env check (confirms the variables are SET without printing any value):

```bash
for v in TWILIO_LIVE_ACCOUNT_SID TWILIO_LIVE_AUTH_TOKEN TWILIO_LIVE_FROM_NUMBER CONTROLLED_LIVE_SMS_TO_NUMBER; do
  if [ -n "${!v:-}" ]; then echo "SET: $v"; else echo "MISSING: $v"; fi
done
```

## Run exactly once (Jason's controlled environment only)

First re-run the readiness gate so it reports `CONTROLLED_LIVE_SMS_PERMITTED`, then arm the deliberate
confirm token and run the fail-closed runner **once**:

```bash
# In Jason's own shell, with the four env vars above already exported (values never shown/committed):
CONTROLLED_LIVE_SMS_CONFIRM=SEND_ONE_LIVE_SMS \
  node backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js
```

- The confirm token `CONTROLLED_LIVE_SMS_CONFIRM` must equal `SEND_ONE_LIVE_SMS`; without it the
  runner blocks (`live_send_not_armed`).
- Run it **exactly one time**. Do **not** loop. Do **not** re-run on failure — there is **no retry**.
- If the runner blocks for any reason, STOP and review the blocked reason; do not work around it.

## After the run (preserve evidence — names/codes only)

- Preserve the runner's execution evidence recording the outcome as **names/booleans/codes only**:
  the gate decision, `send_attempt_count`, whether the SMS was sent, and the final decision code
  (`CONTROLLED_LIVE_SMS_ONE_MESSAGE_SENT` or `CONTROLLED_LIVE_SMS_SEND_ATTEMPTED_FAILED_NO_RETRY`).
- Do **not** record the recipient phone number, any SID value, token, or secret value.
- Hand the result back for a separate LOCAL-ONLY real-customer pilot closeout build (no live action),
  mirroring the Build 196 / Build 199 / Build 202 closeout pattern.

## Hard stops

- One message. No retry. SMS only. **One** consenting real roofer/customer. **No homeowner contact.**
  No production data. No non-SMS channel. No broader live automation.
- This runs under the **signed Build 204** one-message approval, which is **one-time / per-attempt**.
- The build environment / Claude must never run this command or set the confirm token.
- This is **not** unrestricted launch. Launch remains **pilot-gated**.
- STOP / rollback owner: **Jason Lohse**.
