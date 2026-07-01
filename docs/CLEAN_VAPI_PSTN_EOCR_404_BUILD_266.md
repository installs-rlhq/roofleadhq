# Clean Vapi-Managed Test-Number — One-Call True PSTN Validation Evidence + Terminal End-Of-Call-Report 404 Diagnosis (Build 266)

## What this build is

Build 266 captures the **sanitized evidence** from the single controlled true PSTN validation call
Jason placed (approved in Build 265) to the clean Vapi-managed Test Number, and **diagnoses the one
terminal blocker**: the End Of Call Report POST to the backend returned **HTTP 404** with body `{}`.

This is a **repo-only evidence + read-only diagnosis** build. It places **no call**, dials nothing,
retries nothing, sends no SMS, touches no Twilio/Retell/Vapi/Railway/backend config, and performs no
deploy. It reads repo source files only (no secrets) to determine whether the 404 is a Vapi delivery
failure or a production runtime/routing mismatch. See [[roofleadhq-live-validation-chain]].

The honest headline: **the call path worked end-to-end up to the backend hand-off; the backend
terminal ingestion returned 404, so final-report processing is BLOCKED, not completed.** We do not
overclaim backend processing.

## Prerequisite state (carried forward, preserved)

- Build 265 (`1f27d35`) captured Jason's approval for **exactly one** controlled true PSTN call and
  the sanitized evidence template; execution was `awaiting_human_single_call`.
- Build 264 (`8e36101`) confirmed the clean Vapi-managed Test Number is provisioned/assigned to the
  Test Roofing Assistant.
- The existing Twilio → Retell number/route remains the untouched rollback and was **not** used.

## 1. Human single-call evidence (Jason-reported, sanitized)

- Exactly **one** true PSTN call was placed from Jason's own physical phone (iPhone Phone app).
- Target was the **clean Vapi-managed Test Number only**. The existing Twilio/Retell-routed number
  was not used or changed.
- **No retry.** No SMS. No Twilio config change. No Retell config/API. No backend/Railway deploy.
- No homeowner or roofer contacted. No public/live automation activated.

## 2. Vapi Calls evidence (Logs → Calls)

- A call record existed for **Test Roofing Assistant**.
- Assistant phone number was the **clean Vapi-managed Test Number**.
- Type showed **Inbound**.
- Call ID was present (redacted — suffix-only if ever referenced; not recorded here).
- Customer phone number was visible in the UI and is deliberately **not recorded**.
- Start time displayed in Vapi UI as **Jun 30, 2026 ~17:57 MDT**. The export filename used a UTC
  **Jul 1** timestamp — this is a timezone display difference, not a wrong-date issue.

## 3. Vapi Webhooks evidence (Logs → Webhooks, filtered to the clean number)

Non-terminal events returned **HTTP 200** (backend acknowledged them as no-ops per Build 244 routing):

| Event | HTTP |
| --- | --- |
| Assistant.started | 200 |
| Status Update | 200 |
| Conversation Update | 200 |
| Speech Update | 200 |

**Terminal event — the blocker:**

| Field | Value |
| --- | --- |
| Event | End Of Call Report |
| Method | POST |
| Target URL | `https://roofleadhq-api-production.up.railway.app/webhooks/vapi/call-completed` |
| Sanitized path | `/webhooks/vapi/call-completed` |
| Started At | `2026-06-30 23:58:18.299 UTC` |
| Finished At | `2026-06-30 23:58:19.384 UTC` |
| Duration | `1.09 s` |
| Response Code | **404** |
| Response Body | `{}` (empty JSON object) |

Headers shown included `Content-Type: application/json` and `Accept-Encoding: identity`. No secrets
or sensitive header values are recorded.

## 4. Major pass (what genuinely worked)

- ✅ A true PSTN call reached the **clean Vapi-managed Test Number**.
- ✅ The **Test Roofing Assistant** answered / was associated with the call.
- ✅ A Vapi **inbound** call record existed (Call ID present).
- ✅ A Vapi **webhook stream** existed for the call.
- ✅ **Non-terminal** Vapi webhook events returned **200**.
- ✅ The **End Of Call Report was observed** and **POSTed** to the exact configured backend
  URL/path `/webhooks/vapi/call-completed`.

Vapi did its job: it delivered the terminal report to the configured endpoint and received an HTTP
response in **1.09 seconds**. This is **not** a Vapi delivery failure.

## 5. Blocker (the terminal 404)

The terminal **End Of Call Report POST** to `/webhooks/vapi/call-completed` returned **HTTP 404**
with body `{}`. Because the terminal report is the event that drives lead/call/booking persistence,
**final-report processing is BLOCKED**. No claim is made that the backend processed, persisted, or
created any lead/call/booking record from this call.

- `LEAD_OR_FINAL_REPORT_PROCESSING_STATUS = failed_end_of_call_report_404`
- `STOP_CONDITION_TRIGGERED = true_backend_eocr_404`

## 6. Read-only repo diagnosis — why the 404 means production runtime/routing mismatch, not Vapi failure

All facts below are from **read-only repo inspection at HEAD** (`1f27d35`). No secrets were read.

### 6a. The route IS correctly registered in repo HEAD

- `backend/src/index.ts:23` mounts the router: `app.use('/webhooks/vapi', vapiWebhooksRouter);`
  (imported at `backend/src/index.ts:7`).
- `backend/src/routes/vapi-webhooks.ts:9` defines the handler:
  `router.post('/call-completed', requireVapiWebhookSecret, …)`.
- Composed path = `POST /webhooks/vapi/call-completed` — an **exact match** for the URL Vapi POSTed.

So the source of truth **does** contain the route. A 404 is therefore **not** explained by the repo
missing the route.

### 6b. The observed 404 body `{}` does NOT match the repo's own application-level 404

The repo route can only emit these responses (see `vapi-webhooks.ts` + `vapi-webhook-auth.ts`):

| Layer | Status | Body shape |
| --- | --- | --- |
| Auth middleware — missing secret config | 503 | `{ok:false, error:"webhook_auth_not_configured"}` |
| Auth middleware — missing/invalid secret | 401 | `{ok:false, error:"unauthorized"}` |
| Handler — `missing_required_field` | 400 | populated `{ok:false, error:"missing_required_field", normalized:{…}}` |
| Handler — `unknown_roofer` | **404** | **populated** `{ok:false, dry_run:false, error:"unknown_roofer", normalized:{…13 fields…}}` |
| Handler — lookup/insert failure | 500 | populated `{ok:false, error:…, normalized:{…}}` |
| Handler — success / non-terminal / web-call / duplicate | 200 | populated object |

The repo's **only** 404 path is `unknown_roofer` (`vapi-webhooks.ts:17-19`), and it returns a
**populated** JSON body via `res.status(404).json(result)`. The production response body was an
**empty `{}`**. An empty-object 404 is **not producible** by the application route. It is the shape of
a **framework/edge/platform "no matching handler"** response — i.e. the POST reached a runtime that
has **no registered handler** for `POST /webhooks/vapi/call-completed`.

### 6c. Historical proof the route WAS live in earlier production deploys

The same URL previously returned **past-route** statuses in earlier live tests:

- Build 237 — unauthenticated POST → **401**, authorized POST → **400 missing_required_field**
  (route reached, auth gate live, handler validating).
- Build 242 — delivery confirmed at `/webhooks/vapi/call-completed`.
- Build 243 — payloads returned **HTTP 400** at the same path.

A route that previously answered **401/400** and now answers **404** has **regressed at the runtime
layer** — the handler is no longer reachable in the currently-served production build.

### 6d. Diagnosis conclusion + candidate causes (read-only; not yet confirmed against prod)

**Conclusion:** The 404 + empty `{}` body, contrasted with (a) the route being correctly registered
at HEAD and (b) the same URL historically returning 401/400, indicates a **production runtime /
routing / deployment mismatch** — the deployed production runtime is not exposing the route the way
HEAD does. It is **not** a Vapi delivery failure (Vapi delivered and got a response in 1.09s), and it
is **not** the application's `unknown_roofer` 404 (that body would be populated).

Candidate causes, to be narrowed by a follow-up **read-only production diagnosis** (none confirmed
here; we do not overclaim which one it is):

1. Production deployment/router does not include the route (Railway serving a **build older than
   HEAD**, from before the route/mount existed, or a stale image).
2. Path/method mismatch at runtime (mount base-path or route path differs in the deployed build).
3. Backend app mount/base-path mismatch (`/webhooks/vapi` not mounted, or mounted under a different
   prefix, in the running build).
4. Service/deployment mismatch (the production URL points at a **different service/app** than the one
   built from this repo).
5. Railway serving a different app/build than expected (wrong root/start command, wrong `dist`, or a
   crash-looping process falling back to a default 404 responder).
6. Route present in repo but **not registered in the current production runtime** (e.g. a build that
   compiled without this router, or an env/entrypoint that loads a different app).

## 7. Do not overclaim

- Backend receipt at the app layer is **NOT** confirmed. Vapi received a **404 from the configured
  backend target**; the app handler did not run.
- `BACKEND_WEBHOOK_RECEIVED = true_or_vapi_received_404_from_configured_backend_target` — recorded as
  the honest, ambiguous form: the POST reached the host and got a 404; the application handler was not
  demonstrated to have executed.
- Final-report processing = **failed / blocked by EOCR 404**. No lead/call/booking is claimed.

## 8. Status fields (machine-checkable)

```
PSTN_VALIDATION_APPROVAL_STATUS=captured
CALL_ATTEMPT_COUNT=1
CALL_PLACED_FROM=jason_owned_physical_phone
CALL_TARGET=clean_vapi_managed_test_number
EXISTING_TWILIO_RETELL_NUMBER_UNTOUCHED=true
VAPI_CALL_RECORD_FOUND=true
VAPI_CALL_TYPE=inbound_phone_pstn
VAPI_CALL_ID_PRESENT=true
END_OF_CALL_REPORT_OBSERVED=true
VAPI_WEBHOOK_LOG_OBSERVED=true
EOCR_WEBHOOK_TARGET_PATH_SHAPE=/webhooks/vapi/call-completed
BACKEND_WEBHOOK_RECEIVED=true_or_vapi_received_404_from_configured_backend_target
BACKEND_WEBHOOK_RESPONSE_STATUS=404
EOCR_WEBHOOK_RESPONSE_BODY_SHAPE=empty_json_object
LEAD_OR_FINAL_REPORT_PROCESSING_STATUS=failed_end_of_call_report_404
STOP_CONDITION_TRIGGERED=true_backend_eocr_404
NO_RETRY_PERFORMED=true
NO_SMS_SENT=true
NO_TWILIO_CONFIG_CHANGED=true
NO_RETELL_CONFIG_CHANGED=true
NO_BACKEND_DEPLOY=true

pstn_validation_execution_status=completed_sanitized_evidence_captured
pstn_to_clean_vapi_status=passed
vapi_inbound_call_record_status=passed
vapi_nonterminal_webhook_status=passed_200
vapi_eocr_delivery_status=observed_posted_to_expected_path
backend_eocr_response_status=404
final_report_processing_status=blocked_by_backend_404
stop_condition_triggered=true_backend_eocr_404
existing_twilio_retell_route_status=preserved_untouched

repo_route_registered_at_head=true
repo_route_mount=backend/src/index.ts:app.use('/webhooks/vapi', vapiWebhooksRouter)
repo_route_handler=backend/src/routes/vapi-webhooks.ts:router.post('/call-completed', ...)
repo_app_404_body_shape=populated_unknown_roofer_not_empty_object
observed_404_body_shape=empty_json_object
diagnosis=production_runtime_routing_deploy_mismatch_not_vapi_delivery_failure
vapi_delivery_status=succeeded_got_http_response_1.09s
```

## 9. Decision logic / next strategic step

The repo route is correct; the gap is between **repo HEAD** and **what production is actually
serving**. The safe, highest-signal next step is a **read-only production route/deployment
diagnosis** — *before* any deploy or config approval:

1. Confirm which commit/build Railway is currently serving for
   `roofleadhq-api-production.up.railway.app` (deploy metadata / dashboard — read-only).
2. Probe a **read-only** GET (e.g. `/health`, defined at `backend/src/index.ts:29`) to confirm the
   service is up and identify whether the running app is this repo's app at all.
3. Compare the running build's mounted routes against HEAD (`/webhooks/vapi/call-completed`).

**If** production is behind HEAD or serving a different/older build, the remedy is a **narrow,
approved backend redeploy** of the current HEAD (its own future build, with a separate deploy
approval). **No deploy or config change is approved by this build.** A future-decision template only:
redeploy current HEAD → re-verify the route answers a past-route status (401/400) → optionally one
new approved PSTN call to confirm end-to-end persistence.

This build creates **no** approval for another call and **no** approval for a deploy/config change.

## 10. What was NOT done in this build

- No call placed. No number dialed. No PSTN retry. No Vapi Test / Talk / browser / webCall.
- No SMS. No Twilio API/CLI. No Retell API. No Twilio/Retell/Vapi/Railway/backend config change.
- No deploy / redeploy / restart. No schema/auth/RLS change. No production data export.
- No homeowner/roofer contact. No public/live automation. No secret read or printed. No invented
  evidence. No live HTTP against production (no curl). Read-only repo inspection only.

## 11. Safety invariants (held by Build 266)

- Build 266 performs no runtime/external action; it captures sanitized evidence and diagnoses via
  read-only repo inspection.
- Exactly one human physical-phone PSTN call occurred (Jason), with no retry.
- The existing Twilio → Retell route is preserved untouched.
- No secrets printed. No secret committed. No config/deploy performed.

## 12. Source-of-truth preflight (passed)

- `pwd` = `/root/roofleadhq`; branch = `main`; `scripts/verify-source-of-truth.sh` = PASS at
  `1f27d35`; working tree clean before edits; HEAD == origin/main confirmed.

## 13. Files added in Build 266

- `docs/CLEAN_VAPI_PSTN_EOCR_404_BUILD_266.md` (this packet)
- `backend/scripts/verify-clean-vapi-pstn-eocr-404-build-266-readonly.js` (read-only verifier;
  confirms repo route registration + this packet's internal consistency + non-mutation)
- `scripts/run-clean-vapi-pstn-eocr-404-build-266-dry-run.sh` (dry-run wrapper; wires this verifier
  + Build 265/264 verifiers + Vapi smoke regression)
