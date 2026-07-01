# Build 282 — Build 281 Deployment Readiness + Narrow Backend Deploy Approval

Repo-only, offline. No call, no retry, no SMS, no Vapi/Twilio/Retell config, no phone-number change, no
schema/auth/RLS change, no production data export, no secret read, no deploy. The local secret file
`/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**. This build makes NO Railway
deploy/redeploy/restart (no separate explicit approval for that exists yet).

## 1. Where Build 281 stands

- `build_281_fix_status = offline_replay_passed` — the normalizer now ingests Vapi "Structured Outputs"
  (`message.analysis.structuredOutputs`) in addition to legacy `message.analysis.structuredData`; offline
  fake-Supabase replay proved lead + call persist AND booking is created for the live-shape payload, with
  regressions preserved. Source of truth: commit **`72f834f`** (`fix(workflow): ingest live vapi
  structured appointment fields build 281`).
- The Build 281 fix is **source-committed and pushed to `main`** but there is no evidence it is **running
  in production**.

## 2. Deployment status determination (honest)

`build_281_runtime_deployment_status = unknown`

Basis:

- **No Railway tooling is available to this agent** and provider APIs / secrets are out of scope, so the
  agent cannot query the Railway service `roofleadhq-api` active deployment.
- **No sanitized Railway evidence** (dashboard deployment SHA, build log, or active-commit screenshot) was
  provided by Jason this turn.
- **The running backend had no commit marker to interrogate.** Before this build, `GET /health` returned
  only `{status, message, environment}` — it did NOT report the deployed commit — and the only in-source
  `source_of_truth_commit` string is a stale hardcoded value (`19d0272 …`), not the live git SHA. So even a
  successful auto-deploy could not be *confirmed* from the outside. This is the same blind spot that forced
  Build 267 to diagnose "prod ≠ HEAD" indirectly.

Because deployment is unknown, per plan step 5 this build does **not** deploy, creates the narrow deploy
approval packet below, and **withholds** the next live-call approval:

- `live_booking_observation_retest_approval_status = withheld` (until runtime deployment is confirmed)
- `first_roofer_e2e_status = partial_pass_booking_gap_until_runtime_fix_verified`

## 3. Build 282 change — a secretless runtime deploy-verification marker (`GET /health.commit`)

To make deployment status *knowable* from now on (and specifically to confirm the Build 281 fix is live),
Build 282 adds a **read-only** commit marker to the existing health endpoint. This is the material,
reusable step that unblocks the whole "confirm runtime readiness" frontier.

- `backend/src/config/config.ts` — added `gitCommitSha`, sourced from the commit-hash env var Railway
  injects automatically: `RAILWAY_GIT_COMMIT_SHA` (with generic fallbacks `GIT_COMMIT_SHA` /
  `SOURCE_VERSION` / `SOURCE_COMMIT`). A git commit hash is **not a secret**; reading it changes no
  config/schema/provider setting and requires no new env to be set by anyone.
- `backend/src/index.ts` — `GET /health` now also returns `commit` (full SHA or `"unknown"`) and
  `commit_short` (first 7). `"unknown"` means the running build predates this marker.

Effect after deploy: an **unauthenticated** `GET /health` reveals exactly which commit is live — no
dashboard, no secret. Offline proof (in-process): with `RAILWAY_GIT_COMMIT_SHA` set, `/health` reports the
full SHA and 7-char short form; with it unset, it reports `unknown`.

The deploy target therefore becomes **Build 282 HEAD**, which contains the Build 281 normalizer fix
(`72f834f`) unchanged **plus** this read-only `/health` marker. No provider/env/schema change is bundled.

## 4. NARROW BACKEND DEPLOY APPROVAL PACKET (for Jason)

Requesting exactly one narrowly scoped action. Nothing here runs until Jason approves and performs it
out-of-band (or explicitly authorizes it in chat).

- **Service:** Railway backend service `roofleadhq-api` **only** (no frontend, no other service).
- **Action:** deploy/redeploy the service to **`main` HEAD (Build 282)**, which contains the Build 281
  normalizer fix (`72f834f`) plus the read-only `/health` commit marker.
- **Explicitly NOT in scope:** no environment-variable changes, no config changes, no schema/auth/RLS
  changes, no Vapi/Twilio/Retell/phone-number/provider changes, no new secrets, no calls, no SMS, no
  outbound automation toggles. Live-automation flags stay exactly as they are.
- **Post-deploy runtime verification (secretless, no call):**
  1. `GET https://<roofleadhq-api-host>/health` → confirm `commit_short` equals the deployed Build 282 SHA
     (and is no longer `unknown`). This proves the new build — and therefore the Build 281 normalizer fix —
     is live.
  2. Optionally, Jason confirms the same SHA in the Railway dashboard active deployment (sanitized).
- **Rollback:** redeploy the previous deployment in Railway if `/health` does not report the expected SHA.

`deployment_approval_status = created`

## 5. What happens after deployment is confirmed (not before)

Only once runtime deployment is confirmed (via §4 verification, flipping the status from `unknown` to
`deployed`) does the NEXT single approved action become warranted: a separately-approved **one**
live-booking observation. The
cheapest confirmation first is **no new call at all** — Jason inspects the persisted `raw_payload` of the
already-completed Build 280 call row out-of-band (the backend stores `raw_payload: payload` on the calls
insert) to confirm the live `structuredOutputs` shape matches one the Build 281 reader handles. Only if a
fresh live signal is still required is a further separately-approved single PSTN retest justified — never
before deployment is confirmed.

## 6. Guardrails / non-actions attested

- `no_new_call_placed = true`
- `no_retry_performed = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_vapi_config_changed = true`
- `no_phone_number_changed = true`
- `no_schema_auth_rls_changed = true`
- `no_production_data_export = true`
- `no_env_var_changed = true` (the `/health` marker only *reads* a Railway-injected commit hash)
- `no_backend_deploy_by_agent = true`
- `no_secret_printing = true`
- `full_clean_vapi_number_recorded_in_repo = false` (masked as last-4 0389 only)

## 7. Single material next step toward live roofer testing and selling

Jason deploys Railway service `roofleadhq-api` to `main` HEAD (Build 282) per the §4 packet, then confirms
via `GET /health` that `commit_short` equals the deployed SHA — proving the Build 281 Structured-Outputs
normalizer fix is live. That flips `build_281_runtime_deployment_status` to `deployed` and unblocks the
next (separately approved) live-booking observation.
