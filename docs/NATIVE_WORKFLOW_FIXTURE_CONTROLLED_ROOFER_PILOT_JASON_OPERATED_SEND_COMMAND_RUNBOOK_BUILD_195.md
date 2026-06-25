# Jason-Operated Controlled Roofer Pilot One-Message Send — Command Runbook (Build 195)

**Audience:** Jason Lohse only. **Operated by:** Jason, in his own controlled environment.
**Build environment / Claude:** must NOT run this. This repo neither runs the send nor sets the
confirm token.
**Safety posture:** `demo_ready_with_live_automation_disabled` (preserved by the repo; the actual
send is a separate Jason-operated action outside the repo).

This runbook is **documentation only**. Running it is a deliberate, manual, **one-time** action that
Jason performs in his own shell with his own live credentials and the approved destination. Nothing in
this repository performs the send.

## Preconditions (all must be true, confirmed by Jason)

- Final signed send approval captured: `controlled-roofer-pilot-final-send-approval-build-195-signed.json`
  (`approval_signed=true`, `authorizes_jason_operated_one_message_send=true`,
  `authorizes_build_environment_send=false`).
- Send-time preflight is `READY_FOR_JASON_OPERATED_ONE_MESSAGE_SEND`.
- One consenting test roofer only; **SMS only**; **one message maximum**; **no retry**; **no
  homeowner contact**; **no production data**; **no non-SMS channel**.
- The approved destination is the consenting test identity (E.164), supplied **only** in Jason's
  shell — **never** stored in the repo, a fixture, chat, or a fictional placeholder number.

## The existing fail-closed runner

The send uses the existing fail-closed one-message runner — no new send code is added by Build 195:

`backend/scripts/run-native-workflow-fixture-controlled-live-sms-one-message-execution.js`

It is fail-closed: it blocks unless the readiness gate reports `CONTROLLED_LIVE_SMS_PERMITTED`, the
required live credential env vars and the approved destination env var are present **in the shell**,
and the deliberate confirm token is set. It makes **exactly one** `messages.create` call and performs
**no retry** on failure, ambiguity, or error.

## Required environment variables (set in Jason's shell only — never in repo/chat)

Set these in your own shell. They are **names only** here; supply the real values yourself. Do not
echo, log, paste, or commit any value.

- `TWILIO_LIVE_ACCOUNT_SID`
- `TWILIO_LIVE_AUTH_TOKEN`  *(value supplied only in your shell; never written here)*
- `TWILIO_LIVE_FROM_NUMBER`
- `CONTROLLED_LIVE_SMS_TO_NUMBER`  *(the approved consenting test-identity destination, E.164)*

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
- Hand the result back for a separate LOCAL-ONLY closeout build (no live action), mirroring the
  Build 192 one-message closeout pattern.

## Hard stops

- One message. No retry. SMS only. One consenting test roofer. No homeowner contact. No production
  data. No non-SMS channel. No broader live automation.
- The build environment / Claude must never run this command or set the confirm token.
- STOP / rollback owner: **Jason Lohse**.
