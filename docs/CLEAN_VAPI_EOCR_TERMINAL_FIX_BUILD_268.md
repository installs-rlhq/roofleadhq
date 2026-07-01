# Build 268 — Clean Vapi EOCR terminal-path FIX (repo-only, not deployed)

Strategic build. Turns the Build 266/267 diagnosis into a narrow, fail-controlled backend fix so a
clean Vapi PSTN End-Of-Call Report (EOCR) no longer returns HTTP 404 solely because the test/destination
number is not yet mapped to a roofer. **Repo-only. Not deployed.** No call, no SMS, no config change.

## 1. Evidence / diagnosis packet (Railway HTTP logs)

Railway read-only inspection (no deploy, no restart, no config change, no secret read, no live HTTP):

- Project `victorious-caring` / environment `production` / service `roofleadhq-api` (online).
- The EOCR occurred on **removed deployment `53cf00e5`**, which was active during the EOCR window
  (started ~Jun 30 17:53 MDT, stopped ~Jun 30 18:13 MDT). Its logs showed the expected runtime shape
  (`npm run start` → `node dist/index.js`, port 8080, environment production).
- Railway **HTTP Logs for deployment `53cf00e5`** on the **same POST path** `/webhooks/vapi/call-completed`:
  - multiple **non-terminal** POSTs at 17:57–17:58 MDT returned **200**
  - one **terminal EOCR** POST at 17:58 MDT returned **404**

Conclusion from the logs: the route/path was **reachable**, method/path were **correct**, and
deployment/runtime/root/start/route-registration were **not** the problem. The terminal EOCR 404 is
**application-level behavior**, triggered by the terminal end-of-call-report payload — the same
deployment returned 200 for non-terminal events on the identical path.

Sanitized evidence tokens:

```
RAILWAY_LOGS_AROUND_EOCR_TIME_VISIBLE=true
RAILWAY_DEPLOYMENT_ACTIVE_AT_EOCR_TIME=removed_deployment_53cf00e5
RAILWAY_DEPLOYMENT_TIME_RELATIVE_TO_EOCR=started_before_eocr_and_stopped_after_eocr
RAILWAY_LOG_POST_VAPI_CALL_COMPLETED_OBSERVED=true
RAILWAY_LOG_RESPONSE_STATUS_FOR_EOCR=404
RAILWAY_NONTERMINAL_POSTS_SAME_PATH_STATUS=200
RAILWAY_RUNTIME_APP_HINT=npm_run_start_node_dist_index_js_port_8080_environment_production
LIKELY_CAUSE=application_level_eocr_terminal_payload_handling_or_lookup_not_found
```

## 2. Root cause (repo inspection)

Trace of the terminal EOCR through `backend/src/services/vapi-webhook.service.ts` +
`backend/src/routes/vapi-webhooks.ts`:

1. `classifyVapiWebhookEvent` classifies a terminal `end-of-call-report` that carries a PSTN roofer
   destination as `process_call_completed` (non-terminal status/conversation/speech events short-circuit
   to `acknowledge_non_terminal` → 200 **before** any DB access — which is exactly why the non-terminal
   POSTs on the same path returned 200).
2. The phone-keyed required-field gate passes (provider_call_id + caller_phone +
   roofer_destination_number all present for a real PSTN EOCR).
3. The roofer lookup keys on `roofers.twilio_number == roofer_destination_number`. The **clean
   Vapi-managed Test Number** used for pre-launch PSTN validation is **not mapped to any roofer row**,
   so the lookup returns no roofer.
4. Before Build 268 the service then returned the `unknown_roofer` error, which the route mapped to
   **HTTP 404**. Vapi treats a 404 EOCR response as a failed delivery and retries it.

So the EOCR-only 404 is the route's application-level `unknown_roofer` branch, hit because the clean
Vapi test number has no roofer mapping — not a missing Railway route and not a Vapi delivery failure.

`eocr_404_root_cause_status=application_level_terminal_payload_handling_identified` (unmapped
destination → unknown_roofer → 404).

## 3. The fix (narrow, fail-controlled)

Changed **only** the unmapped-roofer branch in
`backend/src/services/vapi-webhook.service.ts`. An unmapped destination is not an error — the report
simply isn't routable to a roofer yet. It is now acknowledged as a **controlled no-op** so the route
returns **200** and Vapi stops retrying:

```
ok: true, acknowledged: true, processed: false,
reason: 'unknown_roofer_destination_unmapped'
```

No lead/booking/call is written. A single sanitized `console.warn` records the condition (no phone
value logged).

Deliberately preserved (contract unchanged):

- Non-terminal events → **200** ok no-op.
- Browser/webCall EOCR with no PSTN destination → **200** ok no-op (`web_call:true`).
- Terminal phone EOCR missing a required phone field → **400** `missing_required_field`.
- Missing Supabase config / lookup error → `lookup_failed` (500).
- Invalid auth → **401**; missing runtime webhook secret → **503** (auth middleware, untouched).
- The route's `unknown_roofer` → **404** branch is **retained defensively** (now unreached from the
  unmapped path), so the Build 266/267 evidence verifiers that assert the route's populated-404 branch
  still pass.

A genuinely routed roofer whose destination number **is** mapped still processes normally.

## 4. Validation (offline, repo-only)

- `backend/scripts/verify-clean-vapi-eocr-terminal-fix-build-268.js` — compiles the backend and drives
  the **actual compiled service in-process** with a **fake Supabase client** injected via require-cache
  interception (no network, no real Supabase). Proves:
  - unmapped-roofer PSTN EOCR → `ok:true`, `acknowledged`, `processed:false`,
    `reason:unknown_roofer_destination_unmapped`, no error, no lead/booking/call (route → 200, not 404);
  - mapped roofer EOCR still enters full processing;
  - required-field gate still returns `missing_required_field`;
  - non-terminal + webCall no-ops preserved;
  - route/auth contract (400/200/404-defensive/401/503) intact; no tracked-file mutation.
- `scripts/run-clean-vapi-eocr-terminal-fix-build-268-dry-run.sh` — wrapper: syntax check + Build 268
  verifier + Build 266/267 diagnosis regressions + Vapi phone-lead smoke.
- Safe readiness fast lane (`scripts/verify-safe-readiness-fast.sh`) — live automation stays disabled.
- Backend build (`tsc`) — clean.

## 5. Status

```
eocr_404_root_cause_status=application_level_terminal_payload_handling_identified
eocr_404_fix_status=implemented_repo_only_not_deployed
production_route_status=reachable_same_path_nonterminal_200
deploy_status=not_approved_not_performed
retry_call_status=not_approved_not_performed
no_call_placed=true
no_sms_sent=true
no_config_changed=true
no_deploy=true
```

**Next strategic step:** with the fix in the repo, the remaining gap is that production was serving a
build without this handling (Build 266/267: `/health` 200 while webhook 404 on the same app ⇒ production
was not current HEAD). The next build is a **separately-approved narrow production redeploy** of current
HEAD to `roofleadhq-api`, followed by a single re-validation EOCR to confirm the terminal report returns
200. No deploy or call is approved by Build 268.
