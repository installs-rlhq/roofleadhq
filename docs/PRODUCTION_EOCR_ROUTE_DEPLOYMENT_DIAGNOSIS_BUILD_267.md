# Production EOCR-404 Route & Deployment Diagnosis — Repo-Only Readiness Packet (Build 267)

## What this build is

Build 266 (`9c637ed`) captured that the one approved true PSTN call reached the clean Vapi-managed
Test Number and worked end-to-end **until** the terminal End Of Call Report POST to
`/webhooks/vapi/call-completed` returned **HTTP 404 body `{}`**. Build 267 is a **repo-only,
read-only deployment diagnosis**: it inspects the backend's build/start/route wiring to (a) confirm
the route is correct at HEAD, (b) determine whether any **repo** bug could explain the 404, and (c)
prepare the exact next decision. It **places no call, sends no SMS, runs no live probe/curl, changes
no config, and deploys nothing.** See [[roofleadhq-live-validation-chain]].

## Carried-forward evidence (Build 266)

- One approved true PSTN call → **clean Vapi-managed Test Number**; no retry.
- Vapi **inbound** call record present; Test Roofing Assistant associated; webhook stream present;
  non-terminal events returned **200**.
- End Of Call Report **observed** and **POSTed** to
  `https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed`
  (sanitized path `/webhooks/vapi/call-completed`) → **404**, body `{}`, 1.09s.
- Existing Twilio → Retell route untouched; no Twilio/Retell config change; no backend/Railway deploy.

## 1. Repo-only deployment configuration inspection

### 1a. There is NO deployment config in the repo

A tracked-file sweep for deployment descriptors found **none**:

| Descriptor | Present in repo? |
| --- | --- |
| `Dockerfile` (root or `backend/`) | ❌ absent |
| `Procfile` | ❌ absent |
| `railway.json` / `railway.toml` | ❌ absent |
| `nixpacks.toml` / `.nixpacks` | ❌ absent |
| `.buildpacks` | ❌ absent |
| root `package.json` | ❌ absent (only `backend/package.json`) |

**Implication (the crux):** Railway's **deployed commit, build command, start command, service
root, and healthcheck are configured in the Railway dashboard, not in the repo.** The repo therefore
**cannot** pin or prove what production is actually running. Any build/deploy mismatch lives in that
**off-repo** dashboard surface — which is exactly what a read-only Railway inspection must confirm.

### 1b. The build → start artifact chain is internally consistent (no repo bug)

From `backend/package.json` + `backend/tsconfig.json`:

- `build` = `tsc` → `tsconfig.json` compiles `rootDir: ./src` to `outDir: ./dist`.
- `start` = `node dist/index.js`.
- `dist/` is **gitignored** (`backend/.gitignore` lists both `dist/` and `backend/dist/`); no
  compiled `dist/*` is committed. **Production must run `npm run build` (tsc) to produce
  `dist/index.js` before `npm run start`.**
- Per Build 228 the Railway service is: root `/backend`, build `npm install && npm run build`, start
  `npm run start`, healthcheck `/health`.

This chain is **correct and self-consistent**: a successful `npm run build` from `/backend` compiles
`src/index.ts` (with the route mount) into `dist/index.js`, which `npm run start` then serves. **No
repo-level route/start/build bug is present.**

### 1c. Single app, single entrypoint, unconditional route mount

- `backend/src/index.ts` is the **only** file that calls `express()` and `.listen()` — one app, one
  entrypoint.
- The webhook mount is **unconditional** — no feature flag, no env gate:
  - `backend/src/index.ts:7` — `import vapiWebhooksRouter from './routes/vapi-webhooks'`
  - `backend/src/index.ts:23` — `app.use('/webhooks/vapi', vapiWebhooksRouter)`
  - `backend/src/routes/vapi-webhooks.ts:9` — `router.post('/call-completed', requireVapiWebhookSecret, …)`
  - Composed route = **`POST /webhooks/vapi/call-completed`** — exact match for the Vapi target.
- The `/health` route (`backend/src/index.ts:29`) lives in the **same file, same app**, mounted
  **four lines below** the webhook mount, also unconditionally.

### 1d. The route has been in the repo since 2026-05-30

- Route mount added: commit `cd3a9d5` (2026-05-30) "Update index.ts".
- Route file created: commit `7d380e9` (2026-05-30) "Create vapi-webhooks.ts".

The route predates the live tests that observed **401/400** at this URL (Builds 237/242/243,
2026-06-30) and the **404** (Build 266, 2026-07-01). The repo has continuously carried the route.

## 2. The decisive deduction — production is not running current HEAD

`/health` and `POST /webhooks/vapi/call-completed` are registered in the **same Express app, in the
same file, both unconditionally**. Production's `/health` returns **200** (verified read-only in
Build 228) while the webhook returns **404**. **No correctly-built current-HEAD `index.ts` can serve
`/health` and simultaneously 404 the webhook** — they are compiled from the same source into the same
`dist/index.js` and mounted together.

Therefore the production runtime is **not** serving current-HEAD `index.ts`. The 404 is a
**production runtime / deployment mismatch**, consistent with the Build 266 diagnosis and with the
observed empty-`{}` 404 (a framework/edge "no matching handler", not the app's populated
`unknown_roofer` 404). It is **not** a Vapi delivery failure (Vapi delivered and got an HTTP response
in 1.09s) and it is **not** a repo bug (build/start/route wiring is correct at HEAD).

Repo-supported candidate causes (to be narrowed by read-only Railway inspection — none confirmable
from the repo):

1. Railway is serving an **older commit/build** deployed before the route was added or from a stale
   image (auto-deploy off, or last manual deploy predates `cd3a9d5`).
2. The deployed **build did not recompile `dist/`** (build step skipped/failed/cached) so `node
   dist/index.js` serves an older `index.ts`.
3. The Railway **service/root/start command** points at a different app or root than
   `/backend` + `npm run build`/`npm run start`.
4. The public domain `roofleadhq-api-production.up.railway.app` maps to a **different service** than
   the one built from this repo/branch.
5. The webhook route bundle is **absent from the deployed artifact** even though `/health` is present
   (i.e. a build snapshot from before the route existed).

All five reduce to the same statement: **the deployed runtime is not current HEAD.** The repo cannot
say which one it is — that requires read-only inspection of the Railway deployment.

## 3. Decision routing

- **Path A — narrow repo route/start/build fix build:** **NOT triggered.** Repo inspection found no
  route-registration, start-command, or build bug. The build→start→route chain is correct at HEAD.
  **No backend source or config was changed in this build.**
- **Path B — read-only Railway production deployment inspection (RECOMMENDED next):** Because no repo
  bug exists and the mismatch surface is off-repo (dashboard-only), the next step is a **separately
  approved, read-only** inspection of the Railway deployment to confirm the deployed commit, build
  log, start command, and service root. No POST/curl, no config change, no redeploy.
- **Path C — narrow redeploy approval:** **Only after** Path B confirms a stale/mismatched runtime.
  A redeploy of current HEAD is its **own future build** with its **own separate approval**. **No
  deploy approval is created here.**

**No deploy approval and no new-call approval are created by this build.**

## 4. Read-only Railway inspection checklist (Path B — dashboard-only, no mutation)

For the service serving `roofleadhq-api-production.up.railway.app` (expected `roofleadhq-api`):

1. **Deployed commit SHA** — does the active deployment == `9c637ed` (current HEAD)? If older,
   confirm whether it predates route commit `cd3a9d5` (2026-05-30).
2. **Source branch/repo** — deploying `installs-rlhq/roofleadhq`, branch `main`?
3. **Auto-deploy on push** — enabled? If not, when was the last manual deploy relative to HEAD?
4. **Build command** — `npm install && npm run build`; **build log shows `tsc` ran and emitted
   `dist/index.js`** (no build failure/cache that skipped compilation)?
5. **Start command** — `npm run start` (`node dist/index.js`)?
6. **Service root** — `/backend`?
7. **Healthcheck** — `/health` (this is what returns 200 today).
8. **Domain → service mapping** — the public domain maps to the intended service (not a second/older
   service).

Read-only only: dashboard viewing (and, if used, `GET /health` which is already an existing
read-only smoke check via `scripts/run-railway-live-runtime-smoke-test.sh`). **No live webhook POST,
no curl against the webhook, no env/config change, no redeploy, no restart.**

## 5. Status fields (machine-checkable)

```
eocr_404_status=diagnosis_packet_captured
pstn_to_clean_vapi_status=passed
vapi_eocr_delivery_status=passed_to_expected_path
backend_eocr_response_status=404
repo_route_registration_status=expected_route_present_at_head
expected_route=POST /webhooks/vapi/call-completed
repo_deploy_config_present=false_dashboard_only
repo_build_start_chain_status=internally_consistent_no_repo_bug
route_mount_conditional=false_unconditional
health_and_webhook_same_app=true
production_runtime_status=unknown_requires_readonly_railway_inspection
production_not_current_head_deduction=health_200_plus_webhook_404_same_app_impossible_under_correct_head_build
repo_bug_found=false
decision_path=B_readonly_railway_inspection
deploy_approval_status=not_requested
retry_call_approval_status=not_requested
backend_source_or_config_touched=false
no_call_placed=true
no_sms_sent=true
no_twilio_config_changed=true
no_retell_config_changed=true
no_backend_deploy=true
```

## 6. What was NOT done in this build

- No call placed / dialed / retried. No Vapi Test / Talk / browser / webCall.
- No SMS. No Twilio API/CLI. No Retell API. No live webhook POST/curl. No live runtime probe beyond
  existing read-only checks.
- No Railway/backend config change. No deploy / redeploy / restart. No env var change.
- No schema/auth/RLS change. No production data export. No homeowner/roofer contact. No public/live
  automation. No secret read or printed. **No backend source or config file changed** (docs +
  read-only verifier + wrapper only).

## 7. Files added in Build 267

- `docs/PRODUCTION_EOCR_ROUTE_DEPLOYMENT_DIAGNOSIS_BUILD_267.md` (this packet)
- `backend/scripts/verify-production-eocr-route-diagnosis-build-267-readonly.js` (read-only verifier;
  grounds every claim against real `package.json`/`tsconfig.json`/`index.ts`/route/`.gitignore` and
  the absence of deploy descriptors; non-mutating)
- `scripts/run-production-eocr-route-diagnosis-build-267-dry-run.sh` (dry-run wrapper; wires this
  verifier + the Build 266 EOCR-404 verifier + the Vapi phone-lead smoke regression)

## 8. Exact next strategic step

Obtain a **separate approval for a read-only Railway production deployment inspection** (Path B, §4):
confirm the deployed commit SHA vs `9c637ed`, that the build log ran `tsc` and emitted
`dist/index.js`, the start command (`npm run start`), and the service root (`/backend`) for the
service behind `roofleadhq-api-production`. **If** that inspection confirms a stale/mismatched runtime
(the expected finding), the follow-on is a **narrow, separately-approved redeploy of current HEAD**
(its own future build), after which the webhook route should answer a past-route status (401/400) and
one separately-approved PSTN call can confirm end-to-end persistence.
