# Vapi API Phone-Number Metadata Lookup — Executed, Returned 401 Invalid Key (Build 262)

Decision token: `VAPI_API_METADATA_LOOKUP_EXECUTED_RETURNED_401_INVALID_KEY_STOP_API_LOOKUPS_FRESH_PRIVATE_KEY_FROM_CORRECT_WORKSPACE_REQUIRED_REPO_ONLY_NO_CUTOVER_NO_CONFIG_CHANGE_NO_CALL_WITHOUT_NEW_SEPARATE_APPROVAL`

Date: 2026-06-30
Branch: `main`
Source-of-truth commit at packet creation: `575668a` (Build 261 closeout), HEAD == origin/main.

## What this build is

Build 262 is the **executed option A** from Build 261: a **single read-only authenticated GET** of the Vapi
**phone-number** resource (`GET https://api.vapi.ai/phone-number`) intended to surface the record's
`provider` / `status` / `credentialId` / `server` fields and resolve whether the Test Roofing number is
import-managed and what — if anything — the Twilio Console voice target must be.

This build is the **first** in the Twilio→Vapi voice chain to perform a live outward action. It performed
**exactly one** read-only HTTP GET against the Vapi API using the sandbox-provided `VAPI_API_KEY` env var.
**The lookup returned HTTP 401 Unauthorized ("Invalid Key").** No metadata was obtained. This packet records
that result and applies the Build 261 decision tree's 401 branch.

- `build_mode = vapi_api_metadata_lookup_executed_401_repo_only_evidence`
- `read_only_api_lookup_executed = true`
- `lookup_http_method = GET`
- `lookup_http_status = 401`
- `lookup_result = invalid_key_unauthorized`
- `metadata_obtained = false`
- `runtime_action_performed_by_build_262 = read_only_get_only`
- `fix_or_config_change_performed_by_build_262 = false`
- `cutover_ready = false`
- `twilio_voice_cutover_status = not_started`
- `vapi_twilio_target_status = not_visible_api_lookup_unauthorized`
- `vapi_import_binding_status = unknown_not_resolved`
- `pstn_validation_status = blocked_until_target_or_import_binding_confirmed`

This build placed **no** call, dialed **no** number, used **no** Vapi Test/Talk, performed **no**
browser/webCall, sent **no** SMS, called **no** live RoofLeadHQ webhook, used **no** Twilio/Retell API,
made **no** Twilio/Vapi/Retell/Railway/DNS/webhook/env/config change, imported **no** number, connected
**no** provider, entered **no** credential, triggered **no** deploy, and read/printed/committed **no**
secret value. It did **not** read `/tmp/roofleadhq-vapi-webhook-secret-build237`.

## Prerequisite state (carried forward, preserved)

- **Build 261** (commit `575668a`) — repo-only Vapi Integrations/connection inspection + Twilio routing
  fork. Concluded cutover **NOT ready** (no Twilio provider card / credential binding / import panel / exact
  voice target visible) and recommended **option A**: a read-only Vapi API phone-number metadata lookup,
  with fallbacks B (Vapi support/docs) and C (explicit Vapi SIP-trunk path).
  - `build_261_prerequisite_commit = 575668a`
  - `build_261_prerequisite_status = validated`
  - `build_261_recommended_option_A_readonly_api_lookup = true`
- **Build 258** (commit `c8a8adb`) — confirmed (read-only Twilio Console) inbound voice routes to the Sip
  Trunk **"Retell Trunk"** (`TK`-prefixed SID, redacted), i.e. PSTN hits Retell, not Vapi.
  - `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- **Build 256** (commit `1f9dd92`) — single approved true PSTN dial stop-condition; `approval_consumed = true`.

The Build 256 PSTN-dial approval is **consumed**. No new call, retry, or config change is authorized by this
build. The Build 262 lookup was performed under a **new, separate, explicit approval** for **exactly one
read-only API GET** (recorded below), and that approval is now **consumed**.

---

## 1. Approval (verbatim scope) — consumed by this build

Jason approved exactly one action for Build 262: **execute the Build 261 option-A read-only Vapi API
metadata lookup now** — a single read-only `GET` of the phone-number resource (`provider` / `status` /
`credentialId` / `server`), with **no secret printed/committed**, **no config change**, and **no call**;
capture sanitized findings and branch per the Build 261 decision tree.

- `approval_scope = exactly_one_read_only_vapi_api_phone_number_metadata_get`
- `approval_consumed = true`
- `approval_consumed_outcome = executed_returned_401_invalid_key_no_metadata_obtained`
- `no_retry_without_new_approval = true`

## 2. Action performed (read-only) — exactly one GET

- `endpoint = GET https://api.vapi.ai/phone-number` (Vapi phone-number list/metadata resource)
- `auth = Authorization: Bearer <VAPI_API_KEY>` — key sourced **only** from the sandbox `VAPI_API_KEY`
  env var, passed to `curl` via the env var (never typed, never echoed, never written to a file, never
  committed).
- `request_body = none` (GET)
- `timeout = 30s`, single attempt, no retry.
- Output written to a scratchpad file **outside** the repo; only the **status code**, **byte count**, and a
  **sanitized** view of the JSON error envelope were inspected.

- `lookup_executed = true`
- `lookup_attempts = 1`
- `curl_used = true_read_only_get_only`
- `live_http_performed = true_read_only_get_only`
- `secret_value_read = false`
- `secret_value_printed = false`
- `secret_value_committed = false`

## 3. Result — sanitized

- **HTTP status: `401`.**
- Response body bytes: `150`.
- Sanitized JSON envelope (no secret present in the response; non-sensitive auth-error text only):
  - `statusCode = 401`
  - `error = Unauthorized`
  - `message = Invalid Key. Hot tip, you may be using the private key instead of the public key, or vice versa.`
- No `phone-number` records, `provider`, `status`, `credentialId`, or `server` fields were returned —
  the request never authenticated.

- `lookup_http_status = 401`
- `lookup_result = invalid_key_unauthorized`
- `metadata_obtained = false`
- `provider_field_observed = false`
- `credentialId_field_observed = false`
- `server_field_observed = false`
- `vapi_response_contained_secret = false`

## 4. Interpretation

- The key currently present in the sandbox (`VAPI_API_KEY`) is **not a valid Private API key for the
  workspace that owns the Test Roofing phone number** — the Vapi API rejected it with **401 Invalid Key**.
- Vapi's own error hint — *"you may be using the private key instead of the public key, or vice versa"* —
  indicates a **key-type or workspace mismatch**: the present value is likely a **public** key (or a key
  from the wrong workspace), whereas the phone-number metadata endpoint requires the **Private API key**
  for the owning workspace.
- Because the request never authenticated, the lookup **cannot** resolve the import binding or the exact
  Twilio voice target. The Build 261 gap (`vapi_import_binding_status = unknown`, exact target not visible)
  is **unchanged**.

- `key_type_mismatch_suspected = true`
- `wrong_workspace_suspected = true`
- `import_binding_resolved = false`
- `exact_twilio_voice_target_resolved = false`

## 5. Decision-tree branch applied (Build 261 §9 / §10)

Build 261's decision tree branches on the lookup outcome. The observed outcome is the **401 branch**:

> If valid key still returns 401 → **Stop API lookup attempts. Wait for Vapi support, or generate a fresh
> Private API key from the correct workspace.**

Therefore:

- **Stop API metadata-lookup attempts** with the current key. No retry of the GET without a new key **and**
  a new separate approval.
- The smallest unblocking step is **non-code, founder-led**: obtain a **fresh Private API key from the
  correct Vapi workspace** (the workspace that owns the Test Roofing number), provided to the sandbox as
  `VAPI_API_KEY` (replacing the current value), **or** pursue Build 261 fallback **B** (Vapi support/docs
  confirmation of whether the record is import-managed) and then **C** (define an explicit Vapi SIP-trunk
  connection path).

- `decision_branch_applied = 401_stop_api_lookups_need_fresh_private_key_or_support_or_sip_path`
- `next_step = obtain_fresh_private_vapi_api_key_correct_workspace_then_rerun_readonly_lookup_under_new_approval`
- `next_step_fallbacks = B_vapi_support_docs_confirmation_then_C_explicit_vapi_sip_trunk_path`

## 6. Twilio cutover readiness decision (unchanged)

**Cutover remains NOT ready.** The 401 means the lookup added no new binding/target evidence; neither the
exact Twilio voice target nor the import-binding mechanism is resolved.

- `cutover_ready = false`
- `cutover_blocked_reason = exact_target_unknown_and_import_binding_unconfirmed_api_lookup_unauthorized`
- `twilio_voice_cutover_status = not_started`
- `vapi_twilio_target_status = not_visible_api_lookup_unauthorized`
- `vapi_import_binding_status = unknown_not_resolved`

## 7. Rollback target (preserved)

The rollback target remains the **Build-258-confirmed Twilio Sip Trunk "Retell Trunk"** (`TK`-prefixed SID,
redacted). Any future cutover must be a single reversible Twilio Voice setting whose prior value is the
Retell Trunk, so rollback is a one-step revert.

- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`

## 8. Safety guardrails (held)

- No production homeowner/roofer traffic.
- No SMS change (messaging routing untouched and out of scope).
- No Retell deletion (rollback depends on the Retell Trunk remaining intact).
- No releasing/porting/deleting the phone number.
- No connecting a provider, importing a number, or entering a credential.
- No irreversible action — the only outward action was a single read-only GET that returned 401.
- No call, no cutover, and no config change until the exact target/import binding is known **and** a new,
  separate, explicit approval exists.
- `safety_guardrails_documented = true`

## 9. Stop conditions

Halt immediately and capture sanitized evidence (no retry without a new, separate approval) on any of:

- Any prompt to retry the API GET, brute-force keys, or try other keys without a new approval.
- Any prompt to guess the Twilio voice target, enter a Twilio credential, import the number, or change a
  Twilio/Vapi field with the target/binding still unknown.
- Unexpected SMS.
- Any real homeowner/roofer traffic.
- Any request to place a call / dial / use Vapi Test / Vapi Talk / browser webCall while readiness is
  `false`.
- `stop_conditions_documented = true`
- `no_retry_without_new_approval = true`

## 10. Explicit recommendation (next strategic step)

The **next step is non-code and founder-led**: provision a **fresh Private API key from the correct Vapi
workspace** (the one that owns the Test Roofing number) into the sandbox as `VAPI_API_KEY`. Once present, a
**new, separately-approved** Build 263 can re-run the same read-only GET and, on a 200, capture the
`provider` / `status` / `credentialId` / `server` fields to resolve the import binding. If a valid Private
key still cannot surface the target/binding, fall back to **B** (Vapi support/docs confirmation) and then
**C** (define an explicit Vapi SIP-trunk connection path), cutting Twilio Voice over from the Retell Trunk
to the Vapi SIP URI **only after a separate approval**.

- `explicit_recommendation_documented = true`
- `next_step = obtain_fresh_private_vapi_api_key_correct_workspace_then_rerun_readonly_lookup_under_new_approval`

**No** Twilio cutover approval and **no** call/PSTN validation approval are created in Build 262.

---

## Status fields (machine-checkable)

- `build_mode = vapi_api_metadata_lookup_executed_401_repo_only_evidence`
- `read_only_api_lookup_executed = true`
- `lookup_http_method = GET`
- `lookup_http_status = 401`
- `lookup_result = invalid_key_unauthorized`
- `metadata_obtained = false`
- `lookup_attempts = 1`
- `runtime_action_performed_by_build_262 = read_only_get_only`
- `fix_or_config_change_performed_by_build_262 = false`
- `build_261_prerequisite_commit = 575668a`
- `build_261_prerequisite_status = validated`
- `build_258_confirmed_twilio_voice_routes_to_retell_trunk = true`
- `approval_scope = exactly_one_read_only_vapi_api_phone_number_metadata_get`
- `approval_consumed = true`
- `approval_consumed_outcome = executed_returned_401_invalid_key_no_metadata_obtained`
- `key_type_mismatch_suspected = true`
- `wrong_workspace_suspected = true`
- `import_binding_resolved = false`
- `exact_twilio_voice_target_resolved = false`
- `decision_branch_applied = 401_stop_api_lookups_need_fresh_private_key_or_support_or_sip_path`
- `cutover_ready = false`
- `cutover_blocked_reason = exact_target_unknown_and_import_binding_unconfirmed_api_lookup_unauthorized`
- `rollback_target = twilio_sip_trunk_retell_trunk`
- `ROLLBACK_TARGET_RETELL_TRUNK_CONFIRMED = true`
- `safety_guardrails_documented = true`
- `stop_conditions_documented = true`
- `decision_tree_documented = true`
- `explicit_recommendation_documented = true`
- `next_step = obtain_fresh_private_vapi_api_key_correct_workspace_then_rerun_readonly_lookup_under_new_approval`
- `next_step_fallbacks = B_vapi_support_docs_confirmation_then_C_explicit_vapi_sip_trunk_path`
- `twilio_voice_cutover_status = not_started`
- `vapi_twilio_target_status = not_visible_api_lookup_unauthorized`
- `vapi_import_binding_status = unknown_not_resolved`
- `cutover_approval_status = not_requested`
- `pstn_validation_status = blocked_until_target_or_import_binding_confirmed`
- `no_call_placed = true`
- `no_sms_sent = true`
- `no_config_changed = true`
- `NO_CONFIG_CHANGED = true`
- `NO_CALL_PLACED = true`
- `NO_SMS_SENT = true`
- `secret_value_read = false`
- `secret_value_printed = false`
- `secret_value_committed = false`
- `vapi_response_contained_secret = false`
- `secret_file_read = false`
- `no_retry_without_new_approval = true`
- `stop_rule_in_force = no_retry_no_new_call_no_config_change_without_new_separate_approval`
- `value_redacted = true`
- `secret_value_recorded = false`

## What was done in this build (exactly one outward action)

- **Exactly one read-only authenticated GET** to `https://api.vapi.ai/phone-number`, which returned **401
  Unauthorized ("Invalid Key")**. Nothing else was sent or changed.

## What was NOT done in this build

- **No second API attempt, no retry, no key brute-forcing, no other endpoint.**
- **No cutover and no config change of any kind.**
- **No Twilio, Vapi, Retell, Railway, DNS, webhook, or environment change.**
- **No provider connected, no number imported, no credential entered.**
- **No call placed.** **No phone number dialed.** **No new call requested.**
- **No Twilio cutover approval created.** **No call/PSTN validation approval created.**
- **No retry** of the consumed Build 256 PSTN-dial approval.
- **No Vapi Test** used; **no Vapi Talk** used; **no browser/webCall**; **no call** placed or received.
- **No call to the live RoofLeadHQ webhook** (`/webhooks/vapi/call-completed`); **no Supabase write**.
- **No SMS** sent; **no Twilio CLI/API** used; **no Twilio config change**.
- **No Retell API** used; **no Retell config change**; **no Retell deletion**.
- **No number released, ported, or deleted.**
- **No Vapi config change**; **no Vapi publish**; **no Railway config change**; **no deploy / redeploy /
  restart**; **no Railway variable set**.
- **No homeowner or roofer contact.**
- **No secret value** read, typed, printed, or committed; the `VAPI_API_KEY` value was used only as a
  `curl` Bearer header sourced from the env var; the Vapi response carried no secret; any IDs/URLs/SIP URIs
  were **not recorded**; `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- **No raw call IDs, phone numbers, tokens, SIDs, URLs, SIP URIs, or PII** appear in this packet.
- **No schema / auth / RLS / security-policy change.**
- **No production data, billing, CRM, or public/live automation change.**

## Safety invariants (held by Build 262)

- No real roofer contact.
- No real homeowner contact.
- No real inbound call traffic.
- No live call placed or received.
- No phone number dialed.
- No new call requested or placed.
- No second API lookup or retry.
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
- No live RoofLeadHQ webhook called.
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
- `git status --short` → clean (before edits)
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 575668a`

Fail-closed: this packet is valid only when repo is `/root/roofleadhq`, branch `main`, tree clean, and
HEAD == origin/main at `575668a` before edits.

## Next recommended step

**Non-code, founder-led:** provision a **fresh Private API key from the correct Vapi workspace** into the
sandbox as `VAPI_API_KEY` (replacing the current public/wrong-workspace value). Then, under a **new,
separate approval**, a Build 263 can re-run the identical read-only GET; on a 200 it captures the
`provider` / `status` / `credentialId` / `server` fields and resolves the import binding. If a valid
Private key still cannot surface the target/binding, fall back to **B** (Vapi support/docs) then **C**
(explicit Vapi SIP-trunk path). The Build 256 approval is consumed; **no cutover, no new call, no config
change, and no further API attempt without a new, separate, explicit approval** captured as its own build
artifact.

## Files added in Build 262

- `docs/VAPI_API_METADATA_LOOKUP_401_BUILD_262.md` (this doc)
- `backend/scripts/verify-vapi-api-metadata-lookup-401-build-262-readonly.js`
- `scripts/run-vapi-api-metadata-lookup-401-build-262-dry-run.sh`
