# Vapi Inbound Target Inspection — Read-Only Findings & Twilio Cutover Readiness Decision (Build 260)

Decision token: `VAPI_INBOUND_TARGET_INSPECTION_CAPTURED_TARGET_NOT_VISIBLE_CUTOVER_NOT_READY_REPO_ONLY_NO_CUTOVER_NO_CONFIG_CHANGE_NO_CALL_WITHOUT_NEW_SEPARATE_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `2dc484b` (Build 259 closeout), HEAD == origin/main.

## What this build is

Build 260 is a **repo-only evidence packet** that captures the findings of the next **read-only** human
Vapi dashboard inspection (Vapi → Phone Numbers → the Test Roofing number record) and records the
**Twilio cutover readiness decision** that follows from them. It **documents only**. It **performs no
cutover** and makes **no** Twilio, Vapi, Retell, Railway, DNS, webhook, or environment change. It writes
only this doc, a read-only verifier, and a dry-run wrapper.

Build 260 places **no** call, dials **no** phone number, uses **no** Vapi **Test**, uses **no** Vapi
**Talk**, performs **no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no**
SMS, uses **no** Twilio CLI/API, uses **no** Retell API, contacts **no** homeowner or roofer, changes
**no** Railway/Vapi/Twilio/Retell config, publishes **no** Vapi assistant, triggers **no** deploy,
reads/prints **no** secret, and does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = vapi_inbound_target_inspection_capture_repo_only`
- `runtime_action_performed_by_build_260 = false`
- `fix_or_config_change_performed_by_build_260 = false`
- `remediation_status = inspection_captured_not_executed`
- `twilio_voice_cutover_status = not_started`
- `vapi_twilio_target_status = not_visible_in_phone_number_screen`
- `cutover_approval_status = not_requested`
- `pstn_validation_status = blocked_until_exact_target_or_connection_method_known`

## Prerequisite state (carried forward, preserved)

- **Build 259** (commit `2dc484b`) — repo-only remediation **plan** for moving the test number's Twilio
  inbound voice routing off the **Retell Trunk** onto **Vapi / Test Roofing Assistant**. Planned only;
  executed nothing. Recommended the next build be a **read-only inspection of the Vapi/Twilio cutover
  target** before any approval.
  - `build_259_prerequisite_commit = 2dc484b`
  - `build_259_prerequisite_status = validated`
  - `build_259_recommended_readonly_target_inspection = true`
- **Build 258** (commit `c8a8adb`) — confirmed via read-only Twilio Console inspection that the number's
  inbound voice handling is a **Sip Trunk named "Retell Trunk"** (a `TK`-prefixed trunk SID, value
  redacted), so inbound PSTN voice routes to **Retell**, not Vapi.
  - `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- **Build 256** (commit `1f9dd92`) — captured the stop-condition evidence from the single approved true
  PSTN dial: `true_pstn_dial_count = 1`, `approval_consumed = true`, `vapi_call_record_observed = false`,
  `retell_notification_observed = true`, `no_retry_without_new_approval = true`.

The Build 256 approval is **consumed**. No new call, retry, or config change is authorized.

---

## 1. Inspection scope (read-only, completed by the human operator)

The operator opened **Vapi → Phone Numbers** and inspected the **Test Roofing** number record and its
details panes (Phone Number Details, Server URL, Inbound Settings). The inspection was **view-only** — no
field was edited, no call was placed, no SMS was sent, and no configuration was changed.

- `inspection_scope = vapi_phone_numbers_test_roofing_record`
- `inspection_method = read_only_dashboard_view`
- `inspection_completed = true`

## 2. Findings — sanitized evidence (no raw numbers, IDs, URLs, SIP URIs, or secrets)

**Phone number record**
- A **Test Roofing** number record **is present** in Vapi Phone Numbers. `VAPI_NUMBER_RECORD_FOUND = true`
- Left-list label: **"Twilio · Test Roofing"**.
- Provider: **Twilio**. `VAPI_NUMBER_PROVIDER = Twilio`
- SMS Enabled: **enabled** (messaging is out of scope for the voice cutover and is unchanged).

**Server URL section**
- Server URL field appears **empty/placeholder only** — no custom Vapi server URL target is visible.
- Authorization credential shown: **RoofLeadHQ Production Webhook Secret (Bearer Token)** (value
  redacted, not recorded).
- **Authentication Enabled** is visible.
- HTTP Headers: **none configured**.
- Static IP Addresses toggle: **off**.

**Inbound Settings**
- Inbound Phone Number field shows the inspected number (value redacted, not recorded).
- Assistant assigned: **Test Roofing Assistant**. `VAPI_NUMBER_ASSIGNED_ASSISTANT = Test Roofing Assistant`
- No squads available. No workflows available.
- Fallback Destination: a placeholder/example-style value is visible (no real destination configured).

**What was NOT visible (the gap)**
- **No TwiML App SID** visible.
- **No SIP endpoint / SIP URI** visible.
- **No Vapi inbound webhook / call-routing URL** visible.
- **No exact Twilio Console voice target value** visible.
- The mechanism that connects the Twilio number to Vapi (TwiML App / webhook URL / SIP endpoint /
  native-import binding) is **represented but its concrete target is not exposed** on this screen.

- `VAPI_INBOUND_CONNECTION_METHOD = twilio_number_record_visible_target_not_exposed`
- `VAPI_TWILIO_TARGET_VALUE_VISIBLE = false`
- `TARGET_VALUE_TYPE = unknown`
- `SANITIZED_TARGET_DESCRIPTION = Vapi Phone Numbers shows a Twilio-provisioned/represented Test Roofing number assigned to Test Roofing Assistant. Server URL field appears empty/placeholder. No TwiML App SID, SIP endpoint, Vapi inbound webhook URL, or exact Twilio voice target is visible in the inspected screen.`

## 3. Interpretation

- Vapi clearly **owns/represents** the Test Roofing number as a **Twilio-provider** number assigned to the
  **Test Roofing Assistant**, with the Production Webhook Secret Bearer credential attached and
  authentication enabled. This is consistent with an **imported/BYO Twilio number** managed inside Vapi.
- However, the **exact voice target** that a Twilio inbound call must be pointed at to reach this Vapi
  number — a TwiML App SID, a SIP URI, or a Vapi inbound webhook URL — is **not visible** on the Phone
  Numbers screen. The Server URL field (which governs **event delivery**, not inbound call routing) is
  empty/placeholder, so it does not supply that target either.
- Build 258 already confirmed the live Twilio number's inbound **voice** handling is the **Retell Trunk**
  Sip Trunk. To cut over, we must know the **precise Vapi-side target** (or confirm that Vapi's
  native-import path manages the Twilio binding directly and exposes no manual target). **That value is
  still unknown.**

## 4. Twilio cutover readiness decision

**Cutover is NOT ready.** The exact Twilio voice target for Vapi is **still unknown / not visible**, so no
cutover can be defined, approved, or executed without guessing — which the safety rules forbid.

- `cutover_ready = false`
- `cutover_blocked_reason = exact_twilio_voice_target_unknown_not_visible`
- `twilio_voice_cutover_status = not_started`
- `vapi_twilio_target_status = not_visible_in_phone_number_screen`

## 5. Rollback target (preserved)

The rollback target remains the **Build-258-confirmed Twilio Sip Trunk "Retell Trunk"** (`TK`-prefixed
SID, redacted). Any future cutover must be a single reversible Twilio Voice setting whose prior value is
the Retell Trunk, so rollback is a one-step revert.

- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`

## 6. Safety guardrails (held)

- No production homeowner/roofer traffic.
- No SMS change (messaging routing untouched and out of scope).
- No Retell deletion (rollback depends on the Retell Trunk remaining intact).
- No releasing/porting/deleting the phone number.
- No irreversible action.
- No call, no cutover, and no config change until the exact target/connection method is known **and** a
  new, separate, explicit approval exists.
- `safety_guardrails_documented = true`

## 7. Stop conditions

Halt immediately and capture sanitized evidence (no retry without a new, separate approval) on any of:

- Any prompt to guess the Twilio voice target or to change a Twilio/Vapi field with the target still
  unknown.
- Unexpected SMS.
- Any real homeowner/roofer traffic.
- Any request to place a call / dial / use Vapi Test / Vapi Talk / browser webCall while readiness is
  `false`.
- `stop_conditions_documented = true`
- `no_retry_without_new_approval = true`

## 8. Decision tree

- If the **exact Vapi inbound voice target is not visible** (current state) → **stop**; do a further
  **read-only** inspection focused on the Vapi/Twilio **import/connection** details (not the call routing
  itself).
- If a further read-only inspection **surfaces the exact target** (TwiML App SID / SIP URI / webhook URL)
  → proceed to an **approval/guard packet** for a narrow, reversible Twilio Voice cutover.
- If a further read-only inspection **confirms Vapi's native-import path manages the binding and exposes
  no manual target** → record that as the connection mechanism and design the cutover around the
  native-import path (still under a new, separate approval).
- No path proceeds to a call, cutover, or config change without the target/mechanism known **and** a new
  separate approval.
- `decision_tree_documented = true`

## 9. Explicit recommendation (next strategic step)

The **next build** should be a **further read-only inspection** focused specifically on the **Vapi/Twilio
import connection details** — e.g. Vapi → Phone Numbers → the number's **import/provider/connection**
panel, Vapi **Integrations** (the Twilio integration/credential binding), and/or the **Vapi↔Twilio number
connection mechanism** — to either:

- find the **exact Twilio voice target** (TwiML App SID / SIP URI / Vapi inbound webhook URL), **or**
- **confirm the Vapi-native/import path manages the binding directly and exposes no manual voice target**.

Only **after** that is resolved should a **narrow, reversible Twilio Voice cutover approval/guard packet**
be created. **No** Twilio cutover approval and **no** call/PSTN validation approval are created in Build
260.

- `explicit_recommendation_documented = true`
- `next_step = readonly_inspection_vapi_twilio_import_connection_details`

---

## Status fields (machine-checkable)

- `build_mode = vapi_inbound_target_inspection_capture_repo_only`
- `runtime_action_performed_by_build_260 = false`
- `fix_or_config_change_performed_by_build_260 = false`
- `build_259_prerequisite_commit = 2dc484b`
- `build_259_prerequisite_status = validated`
- `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- `inspection_completed = true`
- `VAPI_NUMBER_RECORD_FOUND = true`
- `VAPI_NUMBER_PROVIDER = Twilio`
- `VAPI_NUMBER_ASSIGNED_ASSISTANT = Test Roofing Assistant`
- `VAPI_INBOUND_CONNECTION_METHOD = twilio_number_record_visible_target_not_exposed`
- `VAPI_TWILIO_TARGET_VALUE_VISIBLE = false`
- `TARGET_VALUE_TYPE = unknown`
- `cutover_ready = false`
- `cutover_blocked_reason = exact_twilio_voice_target_unknown_not_visible`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `safety_guardrails_documented = true`
- `stop_conditions_documented = true`
- `decision_tree_documented = true`
- `explicit_recommendation_documented = true`
- `next_step = readonly_inspection_vapi_twilio_import_connection_details`
- `remediation_status = inspection_captured_not_executed`
- `twilio_voice_cutover_status = not_started`
- `vapi_twilio_target_status = not_visible_in_phone_number_screen`
- `cutover_approval_status = not_requested`
- `pstn_validation_status = blocked_until_exact_target_or_connection_method_known`
- `no_call_placed = true`
- `no_sms_sent = true`
- `no_config_changed = true`
- `NO_CONFIG_CHANGED = true`
- `NO_CALL_PLACED = true`
- `NO_SMS_SENT = true`
- `no_retry_without_new_approval = true`
- `stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was NOT done in this build

- **No cutover and no config change of any kind.** Inspection capture only.
- **No runtime/external action of any kind by Build 260.**
- **No Twilio, Vapi, Retell, Railway, DNS, webhook, or environment change.**
- **No call placed.** **No phone number dialed.** **No new call requested.**
- **No Twilio cutover approval created.** **No call/PSTN validation approval created.**
- **No retry** of the consumed Build 256 approval. **No new approval** assumed or fabricated.
- **No Vapi Test** used; **no Vapi Talk** used; **no browser/webCall**; **no call** placed or received.
- **No `curl`** run; **no live webhook called**; **no live HTTP**; **no Supabase write**.
- **No SMS** sent; **no Twilio CLI/API** used; **no Twilio config change**.
- **No Retell API** used; **no Retell config change**; **no Retell deletion**.
- **No number released, ported, or deleted.**
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy /
  restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the inspected number, the Bearer credential
  value, and any IDs/URLs/SIP URIs were **not recorded**;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, URLs, SIP URIs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 260)

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
- No SMS/messaging route change.
- No Twilio call placed or routed.
- No Twilio CLI/API used.
- No Twilio configuration change.
- No Twilio Voice cutover executed.
- No Twilio cutover approval created.
- No call/PSTN validation approval created.
- No Retell API used.
- No Retell configuration change.
- No Retell deletion.
- No number released, ported, or deleted.
- No `curl` executed.
- No live webhook called.
- No DNS change.
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
  `secret_value_recorded=false` markers are recorded;
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read).
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 2dc484b`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `2dc484b` before edits.

## Next recommended step

Create the **next build** as a **further read-only inspection** of the **Vapi/Twilio import connection
details** (the number's import/provider/connection panel, Vapi Integrations / Twilio credential binding,
and/or the Vapi↔Twilio number connection mechanism) to surface the **exact Twilio voice target** or
confirm the **native-import path exposes no manual target**. Only after that is known should a **narrow,
reversible Twilio Voice cutover approval/guard packet** be created. The Build 256 approval is consumed;
**no cutover, no new call, and no config change without a new, separate, explicit approval** captured as
its own build artifact.

## Files added in Build 260

- `docs/VAPI_INBOUND_TARGET_INSPECTION_BUILD_260.md` (this doc)
- `backend/scripts/verify-vapi-inbound-target-inspection-build-260-readonly.js`
- `scripts/run-vapi-inbound-target-inspection-build-260-dry-run.sh`
