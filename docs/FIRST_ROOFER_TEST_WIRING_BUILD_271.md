# First Roofer Test Wiring — Readiness (Build 271, repo-only)

decision_token = FIRST_ROOFER_TEST_WIRING_READINESS_REPO_ONLY_MAPPED_CLEAN_VAPI_EOCR_FINAL_REPORT_PERSISTENCE_VALIDATED_BY_FIXTURE_RUNTIME_MAPPING_GAP_IDENTIFIED_NO_LIVE_TEST_APPROVAL_BUILD_271

Build 271 is a **strategic, repo-only readiness build**. It does not place a call, send an SMS,
touch any provider (Twilio / Retell / Vapi / Railway), change schema/auth/RLS, export production
data, or create any first-roofer live-test approval. It documents exactly how a clean Vapi-managed
number maps to a roofer, proves the mapped final-report persistence path with an offline fixture +
fake-Supabase behavioral test, and states the one remaining runtime gap before a first controlled
roofer end-to-end test.

build_mode = first_roofer_test_wiring_readiness_repo_only
runtime_action_performed_by_build_271 = false
fix_or_config_change_performed_by_build_271 = false
build_270_prerequisite_commit = 1248386
build_268_prerequisite_commit = 4c08b5e

---

## 1. Predecessor state carried forward (Builds 266 → 270)

The technical voice path is validated end-to-end to backend HTTP 200:

    true PSTN → clean Vapi-managed Test Number → Test Roofing Assistant → End Of Call Report →
    POST /webhooks/vapi/call-completed → backend HTTP 200

Build 268 (commit 4c08b5e) fixed the terminal EOCR 404: an End Of Call Report whose destination is
**not mapped** to any roofer is now a controlled 200 no-op (reason
`unknown_roofer_destination_unmapped`) instead of an `unknown_roofer` 404 that Vapi retried. Build
270 (commit 1248386) captured the sanitized PASS evidence and confirmed the fix is live.

Build 270 deliberately did **not** overclaim: because the clean Vapi Test Number is still unmapped,
production final processing for that number is a controlled 200 no-op — **full mapped-roofer lead /
final-report persistence was not yet validated.** Closing that validation gap (offline, repo-only)
is the core of Build 271.

---

## 2. The mapping: how a clean Vapi number resolves to a roofer

Source of truth: `backend/src/services/vapi-webhook.service.ts` (`processVapiCallCompleted` +
`normalizeVapiCallCompletedPayload` + `classifyVapiWebhookEvent`) and the route
`backend/src/routes/vapi-webhooks.ts`.

The mapping key is a **single field equality**:

    roofers.twilio_number  ==  <EOCR destination number>

where the EOCR destination number is normalized (E.164) from the Vapi payload — primarily
`message.call.phoneNumber.number` (the number the homeowner dialed, i.e. the clean Vapi-managed
number assigned to that roofer), with a broad set of documented fallbacks in
`normalizeVapiCallCompletedPayload`.

End-to-end control flow for a terminal PSTN End Of Call Report:

1. **Normalize** the payload → `caller_phone`, `roofer_destination_number`, `provider_call_id`,
   `appointment_booked`, `appointment_time`, transcript, summary, outcome, timestamps.
2. **Classify** (`classifyVapiWebhookEvent`, pure/no-DB): a terminal `end-of-call-report` carrying a
   PSTN destination → decision `process_call_completed`. (Non-terminal events and browser/webCall
   reports with no destination are acknowledged as no-ops earlier and never reach the lookup.)
3. **Required-field gate:** `provider_call_id` + `caller_phone` + `roofer_destination_number` must
   all be present, else HTTP 400 `missing_required_field` (protects real phone-lead behavior).
4. **Roofer lookup:** `roofers.select(...).eq('twilio_number', roofer_destination_number).maybeSingle()`.
   - **No roofer row** → Build 268 controlled 200 no-op (`acknowledged:true`, `processed:false`,
     reason `unknown_roofer_destination_unmapped`). No lead / booking / call written. **This is the
     current state for the clean Vapi Test Number.**
   - **Roofer row found** → full final-report persistence path (§3).

So: **a clean Vapi number is "mapped to a roofer" precisely when some `roofers` row has its
`twilio_number` set equal to that clean Vapi number.** There is no separate mapping table; the
roofer row is the map.

clean_vapi_number_mapping_status = defined_via_roofers_twilio_number_equality_runtime_seeding_gap

---

## 3. Mapped final-report persistence path (validated by fixture in Build 271)

When the roofer lookup resolves, `processVapiCallCompleted` performs, in order:

1. **Call dedup** — `findExistingCallId` (`calls` by `provider='vapi'` + `provider_call_id`). An
   existing call short-circuits to a `duplicate` result (idempotent replay-safe).
2. **Lead resolve/create** — `findSingleMatchingLeadId` (exactly one `leads` row for
   `roofer_id`+`phone`); otherwise `createVapiLead` inserts a lead
   (`source_path:'phone'`, `source_detail:'vapi'`, `status:'booked'` when the appointment was
   booked else `'needs_attention'`, issue/summary + transcript notes).
3. **Booking create** — when `appointment_booked` and `appointment_time` are present,
   `createVapiBooking` inserts a `bookings` row (`appointment_type:'site_visit'`,
   `calendar_provider:'vapi'`, `status:'scheduled'`, qualified, counts toward the confidence
   promise) — deduped against an existing booking at the same `booked_time`.
4. **Call insert** — inserts the `calls` row (roofer_id, lead_id, provider `vapi`, provider_call_id,
   caller_phone, timestamps, duration, transcript, summary, outcome, appointment flags, raw payload)
   → result `inserted:true` with `roofer_id`, `matched_lead_id`, `booking_id`, `call_id`.

These `leads` / `bookings` / `calls` rows are the persistence substrate the roofer-facing reporting
/ admin views and lead/booking exports read from. Proving they are created for a mapped clean Vapi
EOCR is what makes the roofer-visible "lead + booked appointment" outcome real end-to-end.

**Build 271 proves this offline.** Fixture `docs/samples/vapi-event-mapped-clean-eocr.fake.json`
is a terminal PSTN End Of Call Report (appointment booked) whose destination stands in for a clean
Vapi-managed number mapped to a demo/pilot roofer. The verifier
`backend/scripts/verify-first-roofer-test-wiring-build-271-readonly.js` compiles the real backend and
runs the real compiled `processVapiCallCompleted` in-process against a **fake Supabase client** (no
network, no real DB), injecting a roofer row whose `twilio_number` equals the fixture's normalized
destination — proving the mapping equality — and asserting the full path creates a **lead, a
booking, and a call** (`inserted:true`, `matched_lead_id`, `booking_id`, `call_id` all set,
`roofer_id` resolved). It also re-proves the unmapped destination still yields the Build 268
controlled 200 no-op.

mapped_roofer_final_report_path_status = validated_by_fixture

---

## 4. Current gap and readiness verdict

The **code path is repo-ready**: mapping is defined and the mapped persistence path is proven by
fixture. The remaining gap is a **runtime data-wiring step**, intentionally NOT performed in this
repo-only build:

- **Gap (runtime, not code):** no `roofers` row yet has `twilio_number` set to the clean
  Vapi-managed number. Until a demo/pilot roofer is wired to a clean Vapi number, every EOCR for
  that number is the correct Build 268 controlled 200 no-op — never a persisted lead.
- Wiring the first roofer therefore requires a controlled runtime step to set a pilot roofer's
  `twilio_number` to a clean Vapi-managed number (a data change on an existing column — **no schema,
  auth, or RLS change**), followed by a separate, explicitly approved single controlled end-to-end
  test.

first_roofer_test_wiring_status = repo_ready_persistence_proven_runtime_mapping_gap_identified

---

## 5. Next controlled test requirements (for a SEPARATE future build)

1. Pick/create a **demo or pilot roofer** record (not a real production roofer, unless the roofer
   has explicitly consented to a pilot).
2. Assign a **clean Vapi-managed number + Test Roofing Assistant** to that roofer and set the
   roofer's `twilio_number` to that clean Vapi number (controlled runtime data step; existing
   column only).
3. Confirm the reporting / lead-persistence path surfaces the resulting lead + booking + call for
   that roofer (the rows §3 creates).
4. Request a **separate, explicit** first-roofer single controlled true-PSTN end-to-end test
   approval (one call, from an owned/consented phone), mirroring the Build 269 approval discipline.
5. Keep the existing Twilio → Retell route untouched as rollback throughout.

live_first_roofer_test_approval_status = not_requested
first_roofer_live_test_approval_created = false

---

## 6. Safety invariants (Build 271)

- No call placed. No SMS sent. No second call. No retry.
- No Vapi Test. No Vapi Talk. No browser/webCall. No Vapi publish. No curl. No live webhook.
- No Twilio CLI/API. No Retell API. No production provider API. No outbound provider request.
- No Twilio config change. No Retell config change. No Vapi config change. No Railway/backend
  deploy, redeploy, restart, or env/config change.
- No schema / auth / RLS change. No production data export. No real homeowner or roofer contact.
- No secret read. The local secret file `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
  No secrets printed. No secret committed. No phone-number-shaped, token-shaped, or raw-id value in
  this doc.
- Existing Twilio → Retell route preserved untouched.
- No first-roofer live-test approval created by this build.

no_call_placed = true
no_sms_sent = true
no_twilio_config_changed = true
no_retell_config_changed = true
no_vapi_config_changed = true
no_railway_config_changed = true
no_backend_deploy = true

---

## 7. Final status block

    first_roofer_test_wiring_status = repo_ready_persistence_proven_runtime_mapping_gap_identified
    clean_vapi_number_mapping_status = defined_via_roofers_twilio_number_equality_runtime_seeding_gap
    mapped_roofer_final_report_path_status = validated_by_fixture
    live_first_roofer_test_approval_status = not_requested
    no_call_placed = true
    no_sms_sent = true
    no_twilio_config_changed = true
    no_retell_config_changed = true
    no_vapi_config_changed = true
    no_railway_config_changed = true
    no_backend_deploy = true
    next_step = wire_one_demo_or_pilot_roofer_twilio_number_to_a_clean_vapi_number_then_request_separate_first_roofer_e2e_test_approval
