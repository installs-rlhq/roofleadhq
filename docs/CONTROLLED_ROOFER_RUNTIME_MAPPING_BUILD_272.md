# Controlled Demo/Pilot Roofer Runtime Mapping — BLOCKED / Gap Evidence (Build 272, repo-only)

decision_token = CONTROLLED_ROOFER_RUNTIME_MAPPING_BLOCKED_REQUIRED_VALUES_NOT_SAFELY_KNOWN_CLEAN_VAPI_NUMBER_REDACTED_AND_TARGET_PROD_ROOFER_ROW_UNCONFIRMED_NEXT_SINGLE_OUT_OF_BAND_UPDATE_BUILD_272

Build 272 is the approved controlled runtime data-mapping step that would set exactly one
demo/pilot `roofers.twilio_number` equal to the clean Vapi-managed Test Number (validated end to
end through Build 270), closing the runtime gap Build 271 identified. **The mapping could NOT be
safely completed in this build.** Per the approved scope's own gate — "perform exactly one
controlled runtime data update **if all required values are known**" — the required values are not
safely known, so this build stops, does not guess, and captures the exact blocker plus the smallest
next action. No row was written. No provider or production system was contacted.

build_mode = controlled_roofer_runtime_mapping_blocked_gap_evidence_repo_only
runtime_update_performed_by_build_272 = false
build_271_prerequisite_commit = 4d36bdf
build_270_prerequisite_commit = 1248386
build_268_prerequisite_commit = 4c08b5e

---

## 1. The mapping requirement (re-grounded against Build 271 code)

Source of truth: `backend/src/services/vapi-webhook.service.ts`. The roofer lookup is a single-field
equality (line ~749):

    .eq('twilio_number', normalized.roofer_destination_number)

So the runtime mapping needed is, precisely:

    exactly one roofers row  WHERE  roofers.twilio_number == <normalized clean Vapi EOCR destination (E.164)>

Behavior to preserve (already proven by Build 268 fix + Build 271 fixture):
- Unmapped destination → controlled 200 no-op (`unknown_roofer_destination_unmapped`), no writes.
- Mapped destination → full persistence path: call-dedup → lead resolve/create → booking create
  (when appointment booked + time) → call insert.

This build changes NO code and does NOT alter that behavior. It is a data-wiring gap, not a code gap.

mapping_requirement_status = confirmed_repo_only
mapping_code_behavior_preserved = true

---

## 2. What blocks a safe controlled update in this build

### Blocker A — the exact clean Vapi-managed Test Number is not safely available
The entire Build 262 → 270 chain **deliberately kept the clean Vapi number out of the repo**: every
evidence packet records `value_redacted = true` / "sanitized, not recorded raw" and the read-only
verifiers ban phone-number-shaped values. The exact E.164 value required for
`roofers.twilio_number` therefore does not exist in the repo in usable form, and it is not present
in this environment's shell (SUPABASE/Vapi identifiers are not exported here). Per the approved
scope step 3 ("If the exact clean Vapi number is not safely available, stop and report the blocker
instead of guessing"), the build stops rather than reconstruct or guess the number.

clean_vapi_number_value_available_in_repo = false
clean_vapi_number_guessed = false

### Blocker B — the intended production demo/pilot roofer row is not identifiable from the repo
The only demo/pilot roofer artifact in the repo is
`backend/fixtures/native-workflow-demo-roofer/demo-roofer-profile.json`, which is explicitly
`fixture_delivery_mode: local_fake_data_review_only`, `data_classification: fake_demo_data_only`,
`production_data_touched: false`, `company_name_is_fake: true`. It is a **local fake fixture, not a
row in the production `roofers` table.** The repo does not record which real production `roofers`
row (id/slug) is the intended demo/pilot **test** record. The approved scope forbids altering a real
roofer "unless it is clearly the intended pilot/demo test record" — that identity requires Jason's
explicit confirmation and cannot be safely inferred here.

target_production_roofer_row_identified = false
demo_roofer_repo_artifact_is_local_fake_only = true

### Blocker C — no safe agent write path within the established pattern
Production `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` exist only as secrets in the git-ignored
`backend/.env` (must not be read or printed) and are not exported to this shell. A direct write to
the production `roofers` table is a hard-to-reverse production data mutation. Across this project,
every runtime step (Supabase schema application in Build 226, Railway env vars, Vapi header config,
all PSTN calls) has been performed **out-of-band by Jason**, with the agent producing repo-only
evidence. Executing the write from this agent would depart from that pattern and require secret use
this scope explicitly restricts.

agent_production_write_path_safe = false
secret_read_or_printed = false

---

## 3. Determination

controlled_runtime_mapping_status = blocked_with_known_gap
mapped_roofer_count = 0
mapped_roofer_count_target_if_completed = 1
clean_vapi_number_to_roofer_mapping_status = blocked
clean_vapi_number_assignment_status = pending_safe_confirmation
first_roofer_e2e_test_readiness = blocked_pending_runtime_mapping
first_roofer_e2e_test_approval_status = not_approved

The gate "if all required values are known" is not met (Blockers A + B), and the safe execution path
is not established (Blocker C). This build forces nothing and guesses nothing.

---

## 4. Next smallest action (out-of-band, Jason-led) — two equivalent options

The mapping is a single-row update on an existing column (no schema/auth/RLS change). Choose ONE:

**Option 1 — Jason performs the one-row update out-of-band (recommended; mirrors Build 226).**
In the Supabase SQL editor / dashboard for the production project, update exactly one intended
demo/pilot roofer row so its `twilio_number` equals the clean Vapi-managed Test Number, e.g.
(fill the two masked values; do not paste them back into the repo):

    UPDATE roofers
       SET twilio_number = '<CLEAN_VAPI_TEST_NUMBER_E164>'   -- keep private
     WHERE id = '<INTENDED_DEMO_PILOT_ROOFER_ID>'            -- exactly one row
       AND twilio_number IS DISTINCT FROM '<CLEAN_VAPI_TEST_NUMBER_E164>';
    -- verify exactly one row updated; do not touch other rows; no schema/auth/RLS change.

Then confirm back, in masked form only: mapped_roofer_count=1, masked roofer identity (e.g.
slug or last-4 of id), and clean-number last-4 — so a future build can record
`controlled_runtime_mapping_status=completed` without exposing sensitive values.

**Option 2 — Jason safely supplies the two required values through a secure channel** (the clean
Vapi Test Number in E.164, and the intended demo/pilot roofer id/slug), plus explicit confirmation
that that row is the intended test record, so a future separately-approved controlled agent step can
perform the exactly-one-row update via the app's existing Supabase service path. Values must not be
committed to the repo.

Either option keeps the existing Twilio → Retell route untouched and does NOT approve the first
PSTN E2E test call.

---

## 5. Vapi assignment confirmation

The clean Vapi-managed Test Number was validated end to end through Build 270 (true PSTN → clean
Vapi number → Test Roofing Assistant → EOCR → backend HTTP 200), which evidences that the number was
assigned to the Test Roofing Assistant at that time. This build performed no Vapi API call and no
Vapi dashboard change, so it re-confirms assignment only from prior sanitized evidence, not by fresh
inspection.

clean_vapi_number_assignment_evidence = build_270_end_to_end_pass_sanitized
clean_vapi_number_assignment_reconfirmed_this_build = false
vapi_config_changed_by_build_272 = false

---

## 6. Safety invariants (Build 272)

- No live call. No SMS. No homeowner contact. No unapproved roofer contact.
- No roofer row written or modified. No production data mutation. No unrelated rows touched.
- No production data export (only the narrowest repo inspection was used to reach this
  determination; no production `roofers` rows were queried or dumped).
- No Twilio config change. No Retell config change. No Vapi config change. No Vapi API call.
- No schema / auth / RLS change. No backend/Railway deploy, redeploy, or restart.
- No secret read or printed. `backend/.env` values not read. The local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read. No full phone number in this doc.
- Existing Twilio → Retell route preserved untouched.
- First PSTN E2E test still NOT approved by this build.

no_call_placed = true
no_sms_sent = true
no_homeowner_contact = true
no_unapproved_roofer_contact = true
no_twilio_config_changed = true
no_retell_config_changed = true
no_schema_auth_rls_changed = true
no_backend_deploy = true
no_railway_restart = true
no_production_data_export = true
no_secret_printing = true

---

## 7. Final status block

    controlled_runtime_mapping_status = blocked_with_known_gap
    mapped_roofer_count = 0
    mapped_roofer_count_target_if_completed = 1
    clean_vapi_number_to_roofer_mapping_status = blocked
    clean_vapi_number_assignment_status = pending_safe_confirmation
    first_roofer_e2e_test_readiness = blocked_pending_runtime_mapping
    first_roofer_e2e_test_approval_status = not_approved
    no_call_placed = true
    no_sms_sent = true
    no_homeowner_contact = true
    no_unapproved_roofer_contact = true
    no_twilio_config_changed = true
    no_retell_config_changed = true
    no_schema_auth_rls_changed = true
    no_backend_deploy = true
    no_railway_restart = true
    no_production_data_export = true
    no_secret_printing = true
    next_step = jason_out_of_band_single_row_update_or_safely_supply_clean_vapi_number_and_target_roofer_id_then_future_build_records_completed
