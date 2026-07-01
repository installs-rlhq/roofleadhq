# Build 285 — Build 284 Runtime Deployment Evidence (conservative summary/transcript fallback is live)

Backend/API deploy verification only. Under Jason's explicit deploy approval (§1), this build confirms the
Railway backend/API service `roofleadhq-api` is running **Build 284 HEAD commit `44ed7cd`** and captures
sanitized runtime evidence. No env/config/schema/provider change. No Vapi/Twilio/Retell change. No phone-
number change. No call, no retry, no SMS, no homeowner/roofer contact, no production data export, no secret
read. The local secret file `/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**. This build
neither creates nor consumes any live-call approval.

## 1. Jason approval text and scope (this deploy)

> "I approve deploying/redeploying Railway service roofleadhq-api only to main HEAD Build 284 commit
> 44ed7cd. Scope is backend/API deploy only. No env/config/schema/provider changes, no Vapi/Twilio/Retell
> changes, no calls, no SMS, no homeowner/roofer contact, no production data export."

`deploy_scope = railway_roofleadhq_api_backend_only`. The approval permits a deploy/redeploy but does not
require one when production is already at the approved commit.

## 2. Source-of-truth commit

- Actual repo/log/health commit (source of truth): **`44ed7cd3a9e0e6e124a49f9e4b1f351ddcfddde9`**
- `commit_short = 44ed7cd`
- `git log --oneline -1` → `44ed7cd fix(workflow): add conservative booking fallback build 284`
- HEAD `== origin/main == 44ed7cd…` (source-of-truth verifier: `PASS`), working tree clean.

Build 284 HEAD contains the conservative summary/transcript booking fallback in
`backend/src/services/vapi-webhook.service.ts` (`deriveBookingTimeFromText`, wired **after** the
`structuredData -> structuredOutputs` structured reads so structured precedence is preserved) and the
Build 282 read-only `/health` commit marker (`backend/src/config/config.ts` `gitCommitSha` from
`RAILWAY_GIT_COMMIT_SHA`, surfaced by `backend/src/index.ts` `GET /health`).

## 3. Deploy action taken (already current — no redeploy)

Per the Build 285 work plan, production `/health` was checked first (unauthenticated, no secret). It already
reported the approved commit, so **no redeploy was performed by the agent** — the safest outcome consistent
with the approval. Railway auto-deploys `main` on push, so the Build 284 push (`44ed7cd`) was already the
active deployment by the time this build ran. The agent triggered no new deploy/redeploy/restart and changed
no env/config/schema/provider setting.

- `redeploy_performed_by_agent = false` (production already at `44ed7cd`)
- `env_config_schema_provider_changes = false`

## 4. Sanitized runtime deployment evidence (live `/health`)

An unauthenticated `GET https://roofleadhq-api-production.up.railway.app/health` returned (stable across
three consecutive polls this build):

    status        = ok
    message       = RoofLeadHQ backend is running
    environment   = production
    commit        = 44ed7cd3a9e0e6e124a49f9e4b1f351ddcfddde9
    commit_short  = 44ed7cd

This is exactly the response the Build 282 `/health` marker emits when Railway injects
`RAILWAY_GIT_COMMIT_SHA = 44ed7cd3a9e0e6e124a49f9e4b1f351ddcfddde9`. `commit_short` is neither `unknown`
(a build predating the marker) nor any earlier commit. Therefore the running production build **is** Build
284 HEAD `44ed7cd`.

## 5. Why this proves the Build 284 fallback fix is live

The Build 284 conservative summary/transcript fallback is part of commit `44ed7cd` itself (HEAD). Because the
running production commit is confirmed to be `44ed7cd`, the fallback code — structured fields still take
precedence; the fallback fires only when the structured signal does not book with a time; summary preferred,
transcript second; requires confident booking/scheduled language, an appointment/site-visit/inspection noun,
an explicit month-day calendar date, and a clock time; rejects vague interest, callback-only, no-noun,
emergency-without-scheduled-visit, and bare-weekday cases — is now **running in production**.

- `build_284_fix_status = offline_replay_passed` (re-confirmed offline in this build)
- `build_284_runtime_deployment_status = deployed`
- `deployed_commit_short = 44ed7cd`

The Build 284 offline replay (live-shape summary/transcript payload → `appointment_booked/requested=true`,
`appointment_time = 2026-07-02T14:00:00.000Z`, mapped roofer resolves, lead+call persist, booking created)
remains passing at HEAD and is re-run by this build's verifier against the now-deployed code path. The
first-roofer end-to-end booking result remains a **partial pass** (lead + call persisted, live booking not
yet observed) until a **separately approved** single live booking-observation call is placed with the
fallback deployed — which this build does not create or consume.

## 6. Attestations (this build)

- `no_call_placed = true`
- `no_retry_performed = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_vapi_config_changed = true`
- `no_phone_number_changed = true`
- `no_railway_env_or_config_changed = true`
- `no_schema_auth_rls_changed = true`
- `no_production_data_export = true`
- `no_secret_printing = true`
- `live_booking_observation_approval_status = not_created_in_this_build`
- `secret_file_/tmp/roofleadhq-vapi-webhook-secret-build237 not read`
- `full_clean_vapi_number_recorded_in_repo = false` (masked as last-4 0389 only)

## 7. Single material next step toward live roofer testing and selling

With runtime deployment of the Build 284 fallback confirmed, the next single material step is a **separately
approved one-call live booking observation**: exactly one Jason-owned physical-phone PSTN call to the clean
Vapi Test Number ending `0389`, with no retry / no SMS / no config change during the test, to observe live
`lead + call + booking` persistence now that the fallback is live — closing the last first-roofer end-to-end
booking gap before pilot selling. That approval is intentionally **not** created or consumed in this build.
