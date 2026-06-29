# Call-Path Inspection & Jason-Owned Call-Test Readiness — Build 231

Decision token: `CALL_PATH_INSPECTED_JASON_OWNED_INBOUND_CALL_TEST_READY_AWAITING_SEPARATE_VOICE_TEST_APPROVAL`

Date: 2026-06-29
Branch: `main`
Source-of-truth commit at packet creation: `5e43162` (Build 230 closeout), HEAD == origin/main.

## What this build is

A **repo-only** inspection slice. Build 231 reads the existing RoofLeadHQ code to map the
voice/call paths, identifies the safest possible Jason-owned inbound call test, and records what
would need separate approval later. **It makes no call, sends no SMS, calls no provider, and changes
no runtime/Twilio/Railway configuration.** It is the call-path analogue of the SMS-path validation
chain (Builds 217–230): inspect and prepare first, act only under a later, separately-approved,
explicitly-gated step.

This build adds NEW files only. No existing source, doc, verifier, schema, or config is modified.

## Source-of-truth preflight (run before authoring)

- `pwd` → `/root/roofleadhq`
- `git rev-parse --show-toplevel` → `/root/roofleadhq`
- `git branch --show-current` → `main`
- `git status --short` → clean
- `git fetch origin main` → ok
- `scripts/verify-source-of-truth.sh` → `PASS: HEAD and origin/main match at 5e43162`

Fail-closed: this packet is only valid when repo is `/root/roofleadhq`, branch `main`, tree clean,
and HEAD == origin/main.

## Call-path map (from repo code)

### 1. Twilio inbound VOICE — currently routed to a Retell Trunk (external, deprecated)

- The current production Twilio number's **voice** configuration points at a **Retell Trunk**
  (configured at the Twilio-number level, outside this repo).
- **Retell is deprecated/disabled** throughout the repo (`docs/FIRST_PAID_LAUNCH_OPERATOR_DAY_ONE_CHECKLIST.md`,
  `docs/VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md`, several operator-acceptance docs). The only Retell
  reference in code is a single static report label string in `backend/src/services/reports/generators.py`.
- **There is no Twilio voice webhook in this repository.** No TwiML `<Voice>`/`<Dial>` handler, no
  `/voice` route. The only Twilio route in code is the SMS inbound path
  `POST /webhooks/twilio/manual-outreach` (`backend/src/routes/webhooks.ts`), which validates
  `X-Twilio-Signature` against `TWILIO_AUTH_TOKEN` and is dry-run/manual-outreach only — it does not
  handle voice.
- **Conclusion:** Inbound voice to the production Twilio number is handled entirely by the external
  Retell Trunk today; RoofLeadHQ code does not receive or shape that call.

### 2. RoofLeadHQ's EXPECTED call handling — Vapi post-call webhook (implemented, live)

What the repo actually expects for call handling is **Vapi**, not Twilio voice:

- `POST /webhooks/vapi/call-completed` is mounted in `backend/src/index.ts`
  (`app.use('/webhooks/vapi', vapiWebhooksRouter)`), routed by `backend/src/routes/vapi-webhooks.ts`,
  and implemented in `backend/src/services/vapi-webhook.service.ts`.
- On a Vapi `call-completed` payload it normalizes the payload, looks up the roofer, and performs
  **mutating Supabase writes**: inserts into `calls` (provider `vapi`), and conditionally creates a
  `leads` row and a `bookings` row when the call indicates a booked appointment.
- This route is part of the backend now **live on Railway** (`roofleadhq-api`,
  `https://roofleadhq-api-production.up.railway.app`).
- **Security gap (finding):** the implemented `/webhooks/vapi/call-completed` route performs **no
  signature/secret validation** — there is no `VAPI_WEBHOOK_SECRET` check in the code. The runbook
  (`docs/VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md`) names `VAPI_WEBHOOK_SECRET` as a prerequisite, but
  the live route does not enforce it. Any unauthenticated POST that matches a known roofer would
  write rows. This must be closed before the route accepts real Vapi traffic.

### 3. Generic call-log writer — `POST /api/calls/webhook` (thin, unauthenticated)

- `backend/src/routes/calls.ts` mounts `GET /api/calls` and `POST /api/calls/webhook`
  (`callController.logCall` → `callService.logCall`), a thin writer that inserts a row into the
  `calls` table. It has no signature/auth check and no provider coupling. It is a legacy/simple call
  log surface, distinct from the Vapi webhook.

### 4. Stub integration

- `backend/src/integrations/vapi.ts` `handleVapiWebhook` is an unused console-log stub
  (`// TODO: Process call data and trigger follow-ups`); the real logic lives in
  `vapi-webhook.service.ts`.

### Env vars required for call handling (names only — no secrets printed)

- `VAPI_API_KEY` — Vapi API key (`backend/src/config/config.ts` → `config.vapiApiKey`); outbound Vapi.
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — required by `vapi-webhook.service.ts` to persist
  `calls`/`leads`/`bookings` from a call-completed payload.
- `TWILIO_AUTH_TOKEN` — used only by the SMS inbound `manual-outreach` signature check, **not** voice.
- `VAPI_WEBHOOK_SECRET` — referenced only in the runbook doc as a future prerequisite; **not read by
  any code today** (the signature-validation gap above).

### Stale-doc finding (worth surfacing)

`docs/VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md` (2026-06-06) and `docs/VAPI_MISSING_FIELDS_READINESS_GATE.md`
both still state "No Vapi webhook endpoint is implemented / No Vapi webhook route exists." That is now
**stale**: `routes/vapi-webhooks.ts` + `vapi-webhook.service.ts` exist, are mounted, and are live on
Railway. Build 231 does not edit those docs (NEW files only), but flags the drift so a later approved
build can reconcile them.

## Safest possible Jason-owned inbound call test path

Ordered from lowest to higher blast radius. Build 231 itself runs **none** of these — they are the
map for a later, separately-approved step.

1. **Zero-network static check (already available, fully safe):** run the read-only Vapi smoke
   verifier `backend/scripts/verify-vapi-phone-lead-smoke-readonly.js`, which statically asserts the
   route/service/integration wiring without any call, network, or write. This is the only call-path
   exercise that is safe to run today, and Build 231's dry-run wrapper includes it as a regression.

2. **Safest actual inbound CALL test (Jason-owned, out-of-repo capture):** per the runbook,
   provision a **separate TEST Vapi assistant + TEST Vapi phone number** (NOT the production Twilio
   number, NOT the Retell Trunk). Jason calls that test number from his own phone using fake
   homeowner data, and the call-completed payload is captured by a **temporary endpoint outside this
   repo** (private ngrok + minimal Express). The payload is **never** pointed at the live Railway
   `/webhooks/vapi/call-completed` for first capture. Blast radius on production: zero. This requires
   its own explicit approval because it involves a real (test) phone call.

3. **NOT recommended yet — POST to the live webhook:** sending even a synthetic/sanitized
   call-completed payload to the live `/webhooks/vapi/call-completed` is a **mutating, currently
   unauthenticated** write (creates `calls`/`leads`/`bookings`). This is not a "safe" test and must
   wait until the signature-validation gap is closed and it is separately approved.

## What needs separate approval later (not in this build)

- Repointing the production Twilio number's voice config away from the Retell Trunk to any
  Vapi/voice path (Twilio + Railway config change).
- Closing the signature-validation gap: implement and enforce `VAPI_WEBHOOK_SECRET` on
  `/webhooks/vapi/call-completed` before it accepts real traffic (a code + env change → its own build).
- Enabling/accepting live Vapi call-completed traffic against the live Railway webhook (mutating).
- Any real phone call, any real homeowner data, any real roofer contact.
- Reconciling the stale "no Vapi route" docs with current code.

Each of the above must be captured as its own approved build artifact, exactly as the SMS path and
the human-takeover schema/runtime-gate chain were gated (Builds 225–228).

## Safety invariants (Build 231)

This build, and the verifier and dry-run wrapper it ships, guarantee:

- No live call placed or received.
- No SMS sent.
- No provider calls (no Vapi / Twilio / Retell / Resend / Lindy API call).
- No Twilio configuration change.
- No Railway configuration change.
- No real roofer contact.
- No real homeowner contact.
- No production data export.
- No schema / auth / RLS / security change.
- No billing automation.
- No CRM integration.
- No public automation expansion.
- No secrets printed (env vars referenced by name only).

The build itself takes **no live action**; it is a repo-only inspection + readiness packet.

## Files added in Build 231

- `docs/CALL_PATH_INSPECTION_AND_JASON_OWNED_CALL_TEST_READINESS_BUILD_231.md` (this doc)
- `backend/scripts/verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js`
- `scripts/run-call-path-inspection-and-jason-owned-call-test-readiness-build-231-dry-run.sh`

## Verification

- `node backend/scripts/verify-call-path-inspection-and-jason-owned-call-test-readiness-build-231-readonly.js`
  — read-only, non-mutating (before/after `git status` equality), asserts the call-path facts above
  against the actual repo source and this doc.
- `scripts/run-call-path-inspection-and-jason-owned-call-test-readiness-build-231-dry-run.sh` — syntax
  check + the Build 231 verifier + the existing Vapi smoke verifier regression.
- `cd backend && npm run build` — TypeScript compiles.

## Exact next gated step after review

The next step is **not a code build**: a separately-approved, Jason-owned inbound CALL test using a
**dedicated TEST Vapi assistant + TEST Vapi number** (path #2 above), with payload captured by a
temporary out-of-repo endpoint — never the production Twilio/Retell-Trunk number and never the live
Railway webhook for first capture. Approval for that test must be captured as its own build artifact.
