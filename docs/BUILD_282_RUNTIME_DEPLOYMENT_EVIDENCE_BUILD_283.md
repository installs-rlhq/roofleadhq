# Build 283 — Build 282 Runtime Deployment Evidence (Build 281 booking fix is live)

Repo-only, offline. No call, no retry, no SMS, no Vapi/Twilio/Retell config, no phone-number change, no
schema/auth/RLS change, no production data export, no secret read, no deploy/redeploy/restart. The local
secret file `/tmp/roofleadhq-vapi-webhook-secret-build237` was **not read**. This build makes NO Railway
deploy/redeploy/restart and changes NO env/config/schema/provider setting; it only **captures sanitized
evidence** Jason provided that the Build 282 commit is already deployed.

## 1. What changed since Build 282

Build 282 (§4 of `docs/BUILD_281_DEPLOYMENT_READINESS_AND_BACKEND_DEPLOY_APPROVAL_BUILD_282.md`) created a
**narrow backend deploy approval packet** and added a secretless `GET /health` commit marker so that
runtime deployment could be confirmed from outside with no dashboard and no secret. At that time
`build_281_runtime_deployment_status = unknown` and the live-booking retest approval was **withheld**.

Under that approval, **Jason manually deployed/redeployed the Railway backend service `roofleadhq-api`**
to `main` HEAD (Build 282, commit `613ce56`). Build 282 HEAD contains the Build 281 Structured-Outputs
normalizer fix (`72f834f`) unchanged **plus** the read-only `/health` commit marker. This build captures
that outcome.

## 2. Source-of-truth commit (typo resolved)

- Actual repo/log/health commit (source of truth): **`613ce56a115e8b5ebb089d751958a7a09b2b2605`**
- `commit_short = 613ce56`
- Any earlier text transposing the short hash as `613ec56` is a typo; the repo `git log`, the source-of-
  truth verifier, and the live `/health` response all agree on **`613ce56`**. This build uses the actual
  value as the single source of truth.

`git log --oneline -1` → `613ce56 feat(workflow): add health commit marker and prepare build 281 deploy
approval build 282`. HEAD `== origin/main == 613ce56…` (source-of-truth verifier: `PASS`).

## 3. Sanitized runtime deployment evidence (Jason-provided)

The Railway dashboard showed an **active, successful deployment** of service `roofleadhq-api` for the
Build 282 health-marker commit. An unauthenticated `GET /health` against the production backend returned:

    status        = ok
    message       = RoofLeadHQ backend is running
    environment   = production
    commit        = 613ce56a115e8b5ebb089d751958a7a09b2b2605
    commit_short  = 613ce56

This is exactly the response the Build 282 `/health` marker emits when Railway injects
`RAILWAY_GIT_COMMIT_SHA = 613ce56a115e8b5ebb089d751958a7a09b2b2605` (see `backend/src/index.ts` `GET
/health` and `backend/src/config/config.ts` `gitCommitSha`). `commit_short` is no longer `unknown`, which
would only occur on a build predating the marker. Therefore the running production build **is** Build 282
HEAD.

## 4. Why this proves the Build 281 booking fix is live

The Build 281 Structured-Outputs normalizer fix is commit `72f834f`, which is an **ancestor of** Build 282
HEAD `613ce56` (it is the immediate parent in `git log`). Because the running production commit is
confirmed to be `613ce56`, everything included before it — including `72f834f` — is necessarily part of the
running build. So the fix that makes the normalizer ingest `message.analysis.structuredOutputs` (in
addition to legacy `structuredData`) and thereby lets `createVapiBooking` create the booking is now
**running in production**.

- `build_281_fix_status = offline_replay_passed` (unchanged; re-confirmed offline in this build)
- `build_281_runtime_deployment_status = deployed`
- `build_282_health_marker_status = deployed_and_verified`
- `deployed_commit_short = 613ce56`
- `first_roofer_e2e_status = partial_pass_booking_gap_until_live_fix_observed`

The first-roofer end-to-end result remains a **partial pass** (Build 276: mapped roofer matched, lead +
call persisted, booking not created) until a **live** booking is observed with the fix deployed. Runtime
deployment being confirmed is the precondition that now makes that single live observation warranted — see
the separate approval packet `docs/LIVE_BOOKING_OBSERVATION_RETEST_APPROVAL_BUILD_283.md`.

## 5. Attestations (this build)

- `no_new_call_placed = true`
- `no_retry_performed = true`
- `no_sms_sent = true`
- `no_twilio_config_changed = true`
- `no_retell_config_changed = true`
- `no_vapi_config_changed = true`
- `no_phone_number_changed = true`
- `no_railway_env_or_config_changed = true`
- `no_backend_deploy_by_agent = true`
- `no_schema_auth_rls_changed = true`
- `no_production_data_export = true`
- `no_secret_printing = true`
- `secret_file_/tmp/roofleadhq-vapi-webhook-secret-build237 not read`
- `full_clean_vapi_number_recorded_in_repo = false` (masked as last-4 0389 only)

## 6. Single material next step toward live roofer testing and selling

With runtime deployment confirmed, the next single material step is the **separately approved one-call
live booking observation** defined in `docs/LIVE_BOOKING_OBSERVATION_RETEST_APPROVAL_BUILD_283.md`: exactly
one Jason-owned physical-phone PSTN call to the clean Vapi Test Number ending `0389`, to observe live
`lead + call + booking` persistence now that the Build 281 fix is live — closing the last first-roofer
end-to-end gap before pilot selling.
