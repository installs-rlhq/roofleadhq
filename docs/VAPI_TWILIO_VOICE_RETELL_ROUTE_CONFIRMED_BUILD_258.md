# Twilio Voice Routing → Retell SIP Trunk Confirmed — Repo-Only Read-Only Evidence (Build 258)

Decision token: `TWILIO_VOICE_ROUTE_CONFIRMED_RETELL_SIP_TRUNK_NOT_VAPI_EXPLAINS_RETELL_CALL_NO_VAPI_RECORD_READONLY_REMEDIATION_PLAN_NEXT_NO_CONFIG_CHANGE_WITHOUT_NEW_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `915855a` (Build 257 closeout), HEAD == origin/main.

## What this build is

Build 258 **captures the sanitized read-only Twilio Console evidence** that Jason gathered after Build
257. It records what the Twilio number's **Voice and emergency calling** configuration actually shows for
inbound call handling, and confirms the Build 257 primary hypothesis: the dialed number's inbound PSTN
**voice** routing points at **Retell**, not Vapi. This **explains** why the single Build 256 true PSTN
dial surfaced as a "NEW RETELL CALL — RoofLeadHQ" and never appeared in Vapi logs.

Build 258 is a **repo-only, read-only evidence-capture build.** It **fixes nothing, changes nothing, and
performs no runtime/external action.** It writes only this doc, a read-only verifier, and a dry-run
wrapper. The Twilio Console inspection itself was performed **read-only and out-of-band by Jason**; this
build only records the sanitized result.

Build 258 places **no** call, dials **no** phone number, uses **no** Vapi **Test**, uses **no** Vapi
**Talk**, performs **no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no**
SMS, uses **no** Twilio CLI/API, uses **no** Retell API, contacts **no** homeowner or roofer, changes
**no** Railway/Vapi/Twilio/Retell config, publishes **no** Vapi assistant, triggers **no** deploy,
reads/prints **no** secret, and does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = twilio_voice_retell_route_confirmed_repo_only_readonly_evidence_capture`
- `runtime_action_performed_by_build_258 = false`
- `fix_or_config_change_performed_by_build_258 = false`
- `twilio_console_inspection_performed_readonly_out_of_band_by_jason = true`

## Prerequisite state (carried forward, preserved)

- **Build 257** (commit `915855a`) — repo-only read-only diagnosis that classified the most likely cause
  as Twilio inbound voice still routing to Retell rather than Vapi.
  - `build_257_prerequisite_commit = 915855a`
  - `build_257_prerequisite_status = validated`
- **Build 256** (commit `1f9dd92`) — captured the stop-condition evidence from the single approved true
  PSTN dial. Its state is **preserved unchanged** here:
  - `build_256_prerequisite_commit = 1f9dd92`
  - `true_pstn_dial_performed = true`
  - `true_pstn_dial_count = 1`
  - `approved_attempt_consumed = true`
  - `approval_consumed = true`
  - `no_retry_without_new_approval = true`
  - `vapi_call_record_observed = false`
  - `retell_notification_observed = true`
  - `likely_path_was_retell_twilio_not_vapi = true`
  - `full_final_report_processing_status = not_validated`
  - `real_pstn_vapi_call_path_status = not_validated`
  - `stop_condition_triggered = true`

The Build 256 approval is **consumed**. No retry, no new dial, no new call, and no config change are
authorized without a new, separate, explicit approval.

---

## Read-only Twilio Console evidence (sanitized)

Jason performed a **read-only** inspection of the dialed Twilio number's **Voice and emergency calling**
configuration in the Twilio Console. No configuration was changed. The sanitized findings:

- **Twilio number found.** `twilio_number_found = true` (raw E.164 number deliberately **not** recorded.)
- **Voice and emergency calling configuration was visible.** `voice_configuration_visible = true`
- **Handling for incoming calls → Method for handling automatic responses = `Sip Trunk`.**
  `voice_configuration_type = sip_trunk`
- **Sip Trunk name = `Retell Trunk`.** `voice_sip_trunk_name = Retell Trunk`
- **Sip Trunk value was visible but is redacted here.** Recorded only as a **`TK`-prefixed trunk
  identifier** (the canonical Twilio Trunk SID prefix). The actual SID value is **not** recorded.
  `voice_sip_trunk_value_redacted = true`, `voice_sip_trunk_value_format = TK_prefixed_trunk_identifier`
- **Conclusion: inbound PSTN voice routing points to Retell, not Vapi.**
  `voice_points_to_retell = true`, `voice_points_to_vapi = false`, `retell_route_confirmed = true`

### Messaging tab (separate, not the voice-routing cause)

- The **Messaging** tab separately showed messaging webhook/service details. That configuration governs
  the **SMS/messaging** leg, **not** inbound voice routing, and is **not** the cause of the PSTN dial
  surfacing as a Retell call. It is recorded here only to note it was inspected and set aside.
  `messaging_config_separate_from_voice_routing = true`,
  `messaging_config_is_voice_routing_cause = false`
- The messaging webhook/service **values are not recorded** (no secrets, no raw identifiers).

---

## Why this explains Build 256

The expected inbound chain (Build 257 Q1) was: carrier delivers the PSTN call to the number → **Vapi**
answers with Test Roofing Assistant → Vapi emits an end-of-call-report → assistant-level Bearer
`POST /webhooks/vapi/call-completed`.

The Twilio **Voice** configuration shows the number's inbound-call handling is a **Sip Trunk** named
**Retell Trunk** (a `TK`-prefixed trunk SID). That means the carrier hands the inbound PSTN call to the
**Retell** SIP trunk, so **Retell answers the call and Vapi never receives it**. This is the direct,
now-confirmed reason that:

- the dial surfaced as a **"NEW RETELL CALL — RoofLeadHQ"** notification (`retell_notification_observed = true`), and
- **no Vapi call record** appeared (`vapi_call_record_observed = false`), and therefore
- no Vapi end-of-call-report was produced and the validated assistant-level Bearer webhook leg received
  nothing for this dial.

- `explanation_links_retell_notification_to_twilio_voice_routing = true`
- `explanation_links_no_vapi_call_record_to_twilio_voice_routing = true`
- `vapi_pstn_validation_result = blocked_by_twilio_voice_routing_to_retell`

This **upgrades** the Build 257 primary hypothesis
(`inbound_voice_routing_still_retell_twilio_trunk_not_vapi`) from "most likely" to **confirmed by
read-only Twilio Console evidence**.

---

## Status fields (machine-checkable)

- `build_mode = twilio_voice_retell_route_confirmed_repo_only_readonly_evidence_capture`
- `runtime_action_performed_by_build_258 = false`
- `fix_or_config_change_performed_by_build_258 = false`
- `build_257_prerequisite_commit = 915855a`
- `build_257_prerequisite_status = validated`
- `build_256_prerequisite_commit = 1f9dd92`
- `true_pstn_dial_performed = true`
- `true_pstn_dial_count = 1`
- `approved_attempt_consumed = true`
- `approval_consumed = true`
- `no_retry_without_new_approval = true`
- `vapi_call_record_observed = false`
- `retell_notification_observed = true`
- `likely_path_was_retell_twilio_not_vapi = true`
- `stop_condition_triggered = true`
- `twilio_number_found = true`
- `voice_configuration_visible = true`
- `voice_configuration_type = sip_trunk`
- `voice_sip_trunk_name = Retell Trunk`
- `voice_sip_trunk_value_redacted = true`
- `voice_sip_trunk_value_format = TK_prefixed_trunk_identifier`
- `voice_points_to_retell = true`
- `voice_points_to_vapi = false`
- `retell_route_confirmed = true`
- `explanation_links_retell_notification_to_twilio_voice_routing = true`
- `explanation_links_no_vapi_call_record_to_twilio_voice_routing = true`
- `messaging_config_separate_from_voice_routing = true`
- `messaging_config_is_voice_routing_cause = false`
- `vapi_pstn_validation_result = blocked_by_twilio_voice_routing_to_retell`
- `full_final_report_processing_status = not_validated`
- `real_pstn_vapi_call_path_status = not_validated`
- `safest_next_step = repo_only_remediation_plan_to_move_twilio_voice_route_from_retell_to_vapi_no_config_change_without_new_approval`
- `stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No fix and no config change of any kind.** Evidence capture only.
- **No runtime/external action of any kind by Build 258.**
- **No call placed.** **No phone number dialed.** **No new call requested.**
- **No retry** of the consumed Build 256 approval. **No new approval** assumed or fabricated.
- **No Vapi Test** used; **no Vapi Talk** used; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio CLI/API** used; **no Twilio config change**.
- **No Retell API** used; **no Retell config change**.
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy /
  restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the Sip Trunk SID **value** was not recorded;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 258)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No new call requested or placed.
- No retry of any prior consumed approval.
- No Vapi Test used.
- No Vapi Talk used.
- No browser/webCall performed.
- No SMS sent.
- No Twilio call placed or routed.
- No Twilio CLI/API used.
- No Twilio configuration change.
- No Retell API used.
- No Retell configuration change.
- No `curl` executed.
- No live webhook called.
- No unrelated Railway configuration change (no Railway variable set by this build at all).
- No Vapi configuration change by this build.
- No Vapi publish.
- No Vapi-originated webhook action executed by this build.
- No full Vapi payload processing pass executed.
- No real call test executed by this build.
- No production data export.
- No schema / auth / RLS / security-policy change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (no secret value exists in this packet; only `value_redacted=true` /
  `secret_value_recorded=false` markers are recorded; the Sip Trunk SID is recorded only as a
  `TK`-prefixed format note; `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 915855a`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `915855a` before edits.

## Next recommended step

Create a **repo-only remediation plan** for safely moving the Twilio inbound **voice** route off the
**Retell Trunk** and onto **Vapi** for the dialed number — documented only, with **no config change**
until separately approved. That plan should:

- be repo-only/read-only (a plan document + verifier), performing no Twilio/Vapi/Retell change;
- specify the exact read-only confirmations to re-check (Twilio Voice config = Retell `TK` trunk; Vapi
  phone-number record; Retell ownership) before any cutover;
- specify the precise, reversible cutover steps (repoint the number's Twilio Voice handling away from the
  Retell Sip Trunk to the Vapi-intended target) and a rollback;
- keep the **stop rule in force**: the Build 256 approval is consumed; **no retry, no new call, and no
  config change** (including the voice-route cutover, which is itself a Twilio + possibly Vapi config
  change) without a **new, separate, explicit approval** captured as its own build artifact.

## Files added in Build 258

- `docs/VAPI_TWILIO_VOICE_RETELL_ROUTE_CONFIRMED_BUILD_258.md` (this doc)
- `backend/scripts/verify-vapi-twilio-voice-retell-route-confirmed-build-258-readonly.js`
- `scripts/run-vapi-twilio-voice-retell-route-confirmed-build-258-dry-run.sh`
