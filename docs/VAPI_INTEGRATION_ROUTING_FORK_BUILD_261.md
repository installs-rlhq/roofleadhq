# Vapi Integration/Connection Inspection — Read-Only Findings & Twilio Routing Fork (Build 261)

Decision token: `VAPI_TWILIO_INTEGRATION_ROUTING_FORK_CAPTURED_TARGET_NOT_VISIBLE_IMPORT_BINDING_UNKNOWN_SIP_PATH_POSSIBLE_NOT_CONFIGURED_CUTOVER_NOT_READY_REPO_ONLY_NO_CUTOVER_NO_CONFIG_CHANGE_NO_CALL_WITHOUT_NEW_SEPARATE_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `caef83c` (Build 260 closeout), HEAD == origin/main.

## What this build is

Build 261 is a **repo-only evidence/decision packet** that captures the findings of the next **read-only**
human Vapi **Integrations / connection** inspection (Vapi → Integrations, Phone Number Providers, Server
Configuration, and back to Phone Numbers) and records the **Twilio routing fork** that follows. It
**documents only**. It **performs no cutover** and makes **no** Twilio, Vapi, Retell, Railway, DNS,
webhook, or environment change. It writes only this doc, a read-only verifier, and a dry-run wrapper.

Build 261 places **no** call, dials **no** phone number, uses **no** Vapi **Test**, uses **no** Vapi
**Talk**, performs **no** browser/webCall, runs **no** `curl`, calls **no** live webhook, sends **no**
SMS, uses **no** Twilio CLI/API, uses **no** Retell API, contacts **no** homeowner or roofer, changes
**no** Railway/Vapi/Twilio/Retell config, publishes **no** Vapi assistant, triggers **no** deploy,
reads/prints **no** secret, and does **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`.

- `build_mode = vapi_integration_routing_fork_capture_repo_only`
- `runtime_action_performed_by_build_261 = false`
- `fix_or_config_change_performed_by_build_261 = false`
- `remediation_status = inspection_captured_not_executed`
- `twilio_voice_cutover_status = not_started`
- `vapi_twilio_target_status = not_visible_in_ui_or_integrations`
- `vapi_import_binding_status = unknown_not_visible`
- `sip_trunk_path_status = possible_but_not_configured_or_confirmed`
- `cutover_approval_status = not_requested`
- `pstn_validation_status = blocked_until_target_or_import_binding_confirmed`

## Prerequisite state (carried forward, preserved)

- **Build 260** (commit `caef83c`) — repo-only read-only inspection capture of **Vapi → Phone Numbers →
  Test Roofing number record**: record present, provider **Twilio**, assistant **Test Roofing Assistant**,
  Server URL empty/placeholder, **no** TwiML App SID / SIP endpoint / Vapi inbound webhook URL / exact
  Twilio voice target visible. Concluded cutover **NOT ready** and recommended a further **read-only**
  inspection of the Vapi/Twilio **import/connection** details.
  - `build_260_prerequisite_commit = caef83c`
  - `build_260_prerequisite_status = validated`
  - `build_260_recommended_readonly_import_connection_inspection = true`
- **Build 259** (commit `2dc484b`) — repo-only Retell→Vapi voice-cutover remediation **plan**; executed
  nothing.
- **Build 258** (commit `c8a8adb`) — confirmed via read-only Twilio Console inspection that the number's
  inbound voice handling is a **Sip Trunk named "Retell Trunk"** (a `TK`-prefixed trunk SID, value
  redacted), so inbound PSTN voice routes to **Retell**, not Vapi.
  - `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- **Build 256** (commit `1f9dd92`) — captured the stop-condition evidence from the single approved true
  PSTN dial; `approval_consumed = true`, `no_retry_without_new_approval = true`.

The Build 256 approval is **consumed**. No new call, retry, or config change is authorized.

---

## 1. Inspection scope (read-only, completed by the human operator)

The operator opened **Vapi → Integrations** and the connected/available provider sections, the **Server
Configuration** details, the **Resources/Files** screen, and returned to **Phone Numbers**. The inspection
was **view-only** — no field was edited, no provider was connected, no number was imported, no call was
placed, no SMS was sent, and no configuration was changed.

- `inspection_scope = vapi_integrations_connection_and_phone_number_providers`
- `inspection_method = read_only_dashboard_view`
- `inspection_completed = true`

## 2. Findings — sanitized evidence (no raw numbers, IDs, URLs, SIP URIs, or secrets)

**Integrations page**
- Shows a connected **Server Configuration** only.
- **Voice Providers** section is visible but collapsed; **no connected Twilio voice provider** is visible.
- **Model / Transcriber / Tool / Cloud / Observability** providers are visible but **not relevant** to
  Twilio inbound voice.

**Phone Number Providers (visible cards)**
- **SIP Trunk**
- **Telnyx**
- **Vonage**
- **No Twilio Phone Number Provider card** is visible in the inspected area.

**Server Configuration details**
- Shows **RoofLeadHQ Production Webhook Secret** as a **Bearer Token** credential (value redacted, not
  recorded).
- **No Twilio credential binding** is visible.

**Resources / Files**
- Empty and unrelated.

**Back to Phone Numbers**
- Confirms the same **Twilio-provider** Test Roofing number assigned to **Test Roofing Assistant**.
- **No phone number connection/import panel** is visible.
- **No exact Twilio Console voice target** is visible.

**What was NOT visible (the gap)**
- **No Twilio integration / voice provider** connection visible. `VAPI_TWILIO_INTEGRATION_FOUND = false_or_not_visible`
- **No Twilio credential binding** visible. `TWILIO_CREDENTIAL_BINDING_VISIBLE = false`
- **No phone number connection/import panel** visible. `PHONE_NUMBER_CONNECTION_PANEL_FOUND = false`
- **No exact Twilio voice target** (TwiML App SID / SIP endpoint / Vapi inbound webhook URL) visible.
  `EXACT_TWILIO_VOICE_TARGET_VISIBLE = false`

- `NUMBER_IMPORT_STATUS = twilio_provider_record_exists_but_import_binding_not_visible`
- `TARGET_TYPE = unknown`
- `NATIVE_IMPORT_MANAGED_BY_VAPI = unknown_not_proven`
- `MANUAL_TWILIO_CONSOLE_TARGET_NEEDED = unknown`
- `SANITIZED_TARGET_DESCRIPTION = Vapi shows a Twilio-provider phone number assigned to Test Roofing Assistant, but Integrations shows only Server Configuration connected. Phone Number Providers visible are SIP Trunk, Telnyx, and Vonage. No Twilio provider card, Twilio credential binding, TwiML App SID, SIP endpoint, or exact Twilio Console voice target is visible.`

## 3. Interpretation

- Vapi **owns/represents** the Test Roofing number as a **Twilio-provider** number assigned to **Test
  Roofing Assistant**, but the **Integrations** surface exposes only the connected **Server Configuration**
  (event-delivery Bearer credential), **not** any Twilio voice-provider connection or credential binding.
- The visible **Phone Number Providers** are **SIP Trunk, Telnyx, Vonage** — **Twilio is not a visible
  provider card** in the inspected area. There is **no visible import/connection panel** for the existing
  number.
- Therefore the existing Twilio-provider record is **either** an import-managed binding whose target Vapi
  manages internally (and does not surface), **or** a binding whose Twilio-side voice target is set
  elsewhere. **Which one cannot be proven from the UI.** `NATIVE_IMPORT_MANAGED_BY_VAPI = unknown_not_proven`

## 4. Docs-based routing fork (documented; no live action)

Two Vapi-supported connection paths exist per docs; **neither is configured or confirmed** for this number:

- **A) Native Twilio import** — Vapi docs describe importing a Twilio number by entering the phone number
  and Twilio credentials in the Vapi **Phone Numbers import** flow; Vapi then uses those Twilio credentials
  to verify/configure the number with Vapi services. **The inspected UI does not expose an import-managed
  binding or a Twilio credential**, so we cannot confirm the existing record was created this way.
- **B) SIP trunking** — Vapi docs describe pointing a **Twilio SIP Trunk Origination** at a Vapi SIP URI
  shaped like `sip:<phone_number>@<credential_id>.sip.vapi.ai` (or the EU equivalent). The Vapi **SIP Trunk**
  Phone Number Provider card **is** visible, so this path is **possible**, but **no Vapi SIP credential,
  credential_id, or SIP URI is configured or visible**.

- `routing_fork_documented = true`
- `import_path_status = not_confirmed_no_credential_binding_visible`
- `sip_trunk_path_status = possible_but_not_configured_or_confirmed`

## 5. Twilio cutover readiness decision

**Cutover is NOT ready.** Neither the **exact Twilio voice target** nor the **import binding mechanism** is
visible or confirmed, so no cutover can be defined, approved, or executed without guessing — which the
safety rules forbid.

- `cutover_ready = false`
- `cutover_blocked_reason = exact_target_unknown_and_import_binding_unconfirmed`
- `twilio_voice_cutover_status = not_started`
- `vapi_twilio_target_status = not_visible_in_ui_or_integrations`
- `vapi_import_binding_status = unknown_not_visible`

## 6. Rollback target (preserved)

The rollback target remains the **Build-258-confirmed Twilio Sip Trunk "Retell Trunk"** (`TK`-prefixed SID,
redacted). Any future cutover must be a single reversible Twilio Voice setting whose prior value is the
Retell Trunk, so rollback is a one-step revert.

- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`

## 7. Safety guardrails (held)

- No production homeowner/roofer traffic.
- No SMS change (messaging routing untouched and out of scope).
- No Retell deletion (rollback depends on the Retell Trunk remaining intact).
- No releasing/porting/deleting the phone number.
- No connecting a provider, importing a number, or entering a credential.
- No irreversible action.
- No call, no cutover, and no config change until the exact target/import binding is known **and** a new,
  separate, explicit approval exists.
- `safety_guardrails_documented = true`

## 8. Stop conditions

Halt immediately and capture sanitized evidence (no retry without a new, separate approval) on any of:

- Any prompt to guess the Twilio voice target, enter a Twilio credential, import the number, or change a
  Twilio/Vapi field with the target/binding still unknown.
- Unexpected SMS.
- Any real homeowner/roofer traffic.
- Any request to place a call / dial / use Vapi Test / Vapi Talk / browser webCall while readiness is
  `false`.
- `stop_conditions_documented = true`
- `no_retry_without_new_approval = true`

## 9. Decision tree

- If neither the **exact Vapi inbound voice target** nor the **import binding** is visible (current state)
  → **stop**; resolve the binding via a **read-only Vapi API metadata lookup** (option A below) or **Vapi
  support/docs confirmation** (option B), each only under a new separate approval.
- If a lookup/confirmation **surfaces the exact target or proves native-import management** → proceed to an
  **approval/guard packet** for a narrow, reversible Twilio Voice cutover (or record that the native-import
  path manages it and design the cutover accordingly).
- If Vapi import **cannot be confirmed** → create a new **explicit Vapi SIP-trunk connection path** (option
  C) and cut Twilio Voice over from the Retell Trunk to the Vapi SIP URI **only after separate approval**.
- No path proceeds to a call, cutover, or config change without the target/mechanism known **and** a new
  separate approval.
- `decision_tree_documented = true`

## 10. Explicit recommendation (next strategic step)

The **next build** should be **option A**: a **read-only Vapi API metadata lookup** of the phone-number
resource to inspect its **provider / status / credentialId / server** fields — **only if separately
approved** and **only if it can be done without exposing secrets** (no secret read, no secret printed, no
secret committed). This is the smallest concrete step that can resolve whether the record is import-managed
and what — if anything — the Twilio Console voice setting must be.

Fallback ordering if A is not approved or is inconclusive:
- **B)** Vapi support/docs confirmation of whether this Twilio-provider record is import-managed and what
  Twilio Console voice setting, if any, is required.
- **C)** If Vapi import cannot be confirmed, create a new explicit **Vapi SIP-trunk connection path** and
  then cut over Twilio Voice from the Retell Trunk to that Vapi SIP URI **only after separate approval**.

**No** Twilio cutover approval and **no** call/PSTN validation approval are created in Build 261.

- `explicit_recommendation_documented = true`
- `next_step = readonly_vapi_api_phone_number_metadata_lookup_then_confirm_import_binding_or_define_sip_path`
- `next_step_option = A_readonly_vapi_api_metadata_lookup`
- `next_step_fallbacks = B_vapi_support_docs_confirmation_then_C_explicit_vapi_sip_trunk_path`

---

## Status fields (machine-checkable)

- `build_mode = vapi_integration_routing_fork_capture_repo_only`
- `runtime_action_performed_by_build_261 = false`
- `fix_or_config_change_performed_by_build_261 = false`
- `build_260_prerequisite_commit = caef83c`
- `build_260_prerequisite_status = validated`
- `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- `inspection_completed = true`
- `VAPI_TWILIO_INTEGRATION_FOUND = false_or_not_visible`
- `TWILIO_CREDENTIAL_BINDING_VISIBLE = false`
- `PHONE_NUMBER_CONNECTION_PANEL_FOUND = false`
- `NUMBER_IMPORT_STATUS = twilio_provider_record_exists_but_import_binding_not_visible`
- `EXACT_TWILIO_VOICE_TARGET_VISIBLE = false`
- `TARGET_TYPE = unknown`
- `NATIVE_IMPORT_MANAGED_BY_VAPI = unknown_not_proven`
- `MANUAL_TWILIO_CONSOLE_TARGET_NEEDED = unknown`
- `routing_fork_documented = true`
- `import_path_status = not_confirmed_no_credential_binding_visible`
- `sip_trunk_path_status = possible_but_not_configured_or_confirmed`
- `cutover_ready = false`
- `cutover_blocked_reason = exact_target_unknown_and_import_binding_unconfirmed`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `safety_guardrails_documented = true`
- `stop_conditions_documented = true`
- `decision_tree_documented = true`
- `explicit_recommendation_documented = true`
- `next_step = readonly_vapi_api_phone_number_metadata_lookup_then_confirm_import_binding_or_define_sip_path`
- `remediation_status = inspection_captured_not_executed`
- `twilio_voice_cutover_status = not_started`
- `vapi_twilio_target_status = not_visible_in_ui_or_integrations`
- `vapi_import_binding_status = unknown_not_visible`
- `cutover_approval_status = not_requested`
- `pstn_validation_status = blocked_until_target_or_import_binding_confirmed`
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
- **No runtime/external action of any kind by Build 261.**
- **No Twilio, Vapi, Retell, Railway, DNS, webhook, or environment change.**
- **No provider connected, no number imported, no credential entered.**
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

## Safety invariants (held by Build 261)

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
- No number imported into Vapi.
- No provider connected in Vapi.
- No credential entered in Vapi.
- No Retell API used.
- No Retell configuration change.
- No Retell deletion.
- No number released, ported, or deleted.
- No `curl` executed.
- No live webhook called.
- No DNS change.
- No unrelated Railway configuration change.
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
- No secrets printed.
- No secret committed.
- No deploy / redeploy / restart triggered by this build.

## Source-of-truth preflight (passed)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at caef83c`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `caef83c` before edits.

## Next recommended step

Create the **next build** as **option A** — a **read-only Vapi API metadata lookup** of the phone-number
resource (`provider` / `status` / `credentialId` / `server` fields) **under a new, separate approval** and
**without exposing secrets** — to resolve whether the record is import-managed and what Twilio Console voice
setting, if any, is required. If A is unavailable or inconclusive, fall back to **B** (Vapi support/docs
confirmation) and then **C** (define an explicit Vapi SIP-trunk connection path, then cut Twilio Voice over
from the Retell Trunk to the Vapi SIP URI only after separate approval). The Build 256 approval is
consumed; **no cutover, no new call, and no config change without a new, separate, explicit approval**
captured as its own build artifact.

## Files added in Build 261

- `docs/VAPI_INTEGRATION_ROUTING_FORK_BUILD_261.md` (this doc)
- `backend/scripts/verify-vapi-integration-routing-fork-build-261-readonly.js`
- `scripts/run-vapi-integration-routing-fork-build-261-dry-run.sh`
