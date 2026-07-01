# Mapped-Roofer Persistence Gap Diagnosis — Backend 200 Without Visible Lead/Booking/Call (Build 275, repo-only)

decision_token = MAPPED_ROOFER_PSTN_E2E_RETURNED_BACKEND_200_BUT_NO_VISIBLE_LEAD_BOOKING_CALL_DIAGNOSED_OFFLINE_MOST_LIKELY_BUILD_268_CONTROLLED_NO_OP_FROM_A_TWILIO_NUMBER_FORMAT_MISMATCH_AGAINST_STRICT_E164_DESTINATION_PROVEN_VIA_EQ_AWARE_FAKE_SUPABASE_NO_CALL_NO_RETRY_NO_DEPLOY_FIX_CAPTURED_BUT_NOT_APPLIED_ONE_MASKED_EVIDENCE_NEEDED_BUILD_275

Build 275 diagnoses — with **no call, no retry, no provider/DB access, no deploy** — why the Build 274
mapped-roofer PSTN E2E returned backend **HTTP 200** yet did **not** visibly persist a lead + booking +
call in Supabase. It is repo-only: it exercises the **real compiled backend service** against an
in-process fake Supabase and statically grounds the route's HTTP mapping. No source runtime behavior is
changed. A candidate fix is captured but explicitly **not applied** (requires separate approval).

build_mode = mapped_roofer_persistence_gap_diagnosis_repo_only
call_performed_by_build_275 = false
retry_count = 0
build_274_prerequisite_commit = dd1c1b8
build_271_prerequisite_commit = 4d36bdf
build_268_prerequisite_commit = 4c08b5e

---

## 1. The gap being diagnosed

Build 274 (commit `dd1c1b8`) recorded, honestly and masked, that exactly one approved PSTN call to the
clean Vapi Test Number (last-4 `0389`), mapped to the single roofer row `Launch Test Roofing 1780434363`
and answered by the Test Roofing Assistant, produced a **visible Vapi call record + EOCR**, the EOCR
**reached the backend and the webhook returned HTTP 200** — but Supabase lead / booking / call records
did **not** appear to have been created. Result: `inconclusive_backend_200_persistence_not_observed`.

The question Build 275 answers: **which HTTP-200-producing code path most plausibly ran, and why did it
write nothing?**

first_roofer_e2e_gap = backend_200_persistence_not_observed

---

## 2. Every path that returns HTTP 200 (grounded in source)

Source of truth: `backend/src/routes/vapi-webhooks.ts` returns **200 if and only if `result.ok === true`**
(missing field → 400; the defensive, no-longer-reached `unknown_roofer` → 404; any other `ok:false` →
500). So enumerating the 200s means enumerating every `ok:true` return of
`processVapiCallCompleted` in `backend/src/services/vapi-webhook.service.ts`:

| # | Branch | `ok` | Persists? | Trigger |
|---|--------|------|-----------|---------|
| 1 | `acknowledge_non_terminal` | true | **No** | interim status/conversation/speech-update, or any unrecognized non-terminal type |
| 2 | `acknowledge_web_call` | true | **No** | terminal report, no PSTN roofer destination, transport not phone |
| 3 | `unknown_roofer_destination_unmapped` (Build 268 no-op) | true | **No** | terminal + destination present + required fields present, but **no roofer row** has `twilio_number == destination` |
| 4 | `duplicate` (pre-insert existing call) | true | **No (new)** | a `calls` row already exists for `provider_call_id` |
| 5 | `duplicate` (23505 on insert) | true | **No (new)** | unique-constraint race on the call insert |
| 6 | `inserted: true` | true | **YES** | the mapped roofer resolved and a new call row was inserted |

**Exactly one of the six 200s persists (#6).** The Build 275 verifier reproduces all six behaviorally
against the real compiled service and asserts that #1–#5 write no lead/booking/call and #6 is the sole
persisting path.

only_persisting_200_branch = inserted_true
noop_200_branches = acknowledge_non_terminal | acknowledge_web_call | unknown_roofer_destination_unmapped | duplicate

---

## 3. What a 200 RULES OUT (non-swallow proof)

A DB failure does **not** masquerade as a 200:

- Roofer-lookup error → `ok:false error:'lookup_failed'` → route **500**.
- Calls-insert error → `ok:false error:'insert_failed'` → route **500**.
- Missing required field (e.g. no caller phone) → `ok:false error:'missing_required_field'` → route **400**.

The verifier proves all three return `ok:false` (never 200). Therefore Build 274's visible **200 cannot
be a swallowed CALL-insert failure or a swallowed roofer-lookup failure.** This eliminates the
"Supabase insert failed but was acknowledged as 200" hypothesis **for the call record itself**.

(One nuance — see §5: the LEAD and BOOKING inserts *are* swallowed and do not fail the request.)

db_failure_is_500_not_200 = true

---

## 4. Ranked hypotheses for Build 274

Given the 200 rules out #6-with-failed-call-insert and rules out lookup failure, and given retry_count=0
(so the `duplicate` branches are unlikely on a first call), the field narrows sharply:

1. **MOST LIKELY — Build 268 controlled no-op (#3) from a destination/`twilio_number` format mismatch.**
   The service normalizes the EOCR destination to **strict E.164** (`+1XXXXXXXXXX`) via `normalizePhone`,
   then does a **byte-exact** `.eq('twilio_number', <normalized>)`. If the roofer row's stored
   `twilio_number` (entered out-of-band in Build 273) is **not byte-identical** to strict E.164 — missing
   `+`, missing country code, separators, or surrounding whitespace — the lookup returns null and the
   service takes the Build 268 200 no-op, writing nothing. This yields **exactly** the Build 274 symptom:
   200, and no lead/booking/call. Build 275 **reproduces this offline** (§6, CASE B).

2. **PLAUSIBLE — `acknowledge_web_call` (#2)** if the real Vapi EOCR did not expose the destination number
   in a field the normalizer reads AND carried no phone-transport marker. Then `roofer_destination_number`
   is null and transport ≠ phone → web-call no-op (200, no persistence). Less likely than #1 because a
   real `inboundPhoneCall` EOCR normally exposes the dialed number and a phone-ish `call.type`; and if the
   destination were truly absent on a phone-transport call the required-field gate would have returned
   **400**, not 200.

3. **POSSIBLE — persisted-but-not-where-checked (#6 with swallowed lead/booking).** If the mapped branch
   *did* run, a lead-insert error is swallowed: the CALL row still inserts (200 `inserted:true`) but with
   `lead_id = null` and `booking_id = null`. A Supabase check of the **leads** table alone would then show
   nothing even though a **calls** row exists. Build 275 reproduces this too (§6, CASE E). Distinguishable
   only by checking the `calls` table for the mapped roofer.

4. **UNLIKELY — non-terminal (#1)** would require the real EOCR to classify as a non-terminal type; the
   EOCR was described as visible/final. **UNLIKELY — duplicate (#4/#5)** requires a pre-existing call row;
   retry_count=0 and this was the first mapped call.

suspected_branch_identified = true
most_likely_200_without_persistence_branch = build_268_controlled_no_op_unmapped_destination

---

## 5. Fixture-gap finding

Build 271's offline verifier proved the mapped path persists — but its fake Supabase **ignored `.eq()`
arguments** (any `from('roofers')` returned the injected row regardless of the queried number). That fake
could confirm "row present → persist / row absent → no-op", but it **could not surface a near-miss**: a
row that exists but whose stored `twilio_number` does not byte-match the normalized destination. That is
precisely the most-likely Build 274 failure mode, so it sat in the fixtures' blind spot.

Build 275 closes this with an **eq-aware** fake Supabase whose roofers `.eq('twilio_number', X)` performs
real byte-exact matching (mirroring Postgres text equality), making the format-mismatch no-op observable
offline.

fixture_gap_identified = true

---

## 6. Offline behavioral proof added (Build 275 verifier)

`backend/scripts/verify-mapped-roofer-persistence-gap-build-275-readonly.js` compiles the current backend
and drives the **real** `processVapiCallCompleted` against the eq-aware fake:

- **CASE A** — roofer row stores the destination in strict E.164 exactly → full persistence
  (`inserted` + lead + booking + call). The sole persisting 200.
- **CASE B** — a roofer row for the SAME number stored in **5 non-E.164 formats** (no `+`, no country
  code, dashed, parenthesized, surrounding whitespace) → **Build 268 200 no-op, zero persistence**.
  Reproduces the Build 274 symptom.
- **CASE C** — `acknowledge_non_terminal`, `acknowledge_web_call`, and `duplicate` are each `ok:true`
  (200) with no new persistence.
- **CASE D** — roofer-lookup error, calls-insert error, and missing field each return `ok:false`
  (route → 500/400), never 200.
- **CASE E** — swallowed lead-insert error → 200 `inserted:true` with a CALL row but null lead/booking.

All reserved fictional 555 numbers; no real number, UUID, call id, or PII. Numbers are masked as last-4
only in this doc (`0389`). Run via `scripts/run-mapped-roofer-persistence-gap-build-275-dry-run.sh`.

near_miss_format_mismatch_reproduces_symptom = true

---

## 7. Proposed fix — captured, NOT applied (requires separate approval)

The cleanest, lowest-risk remediation is a **DATA** fix, not a code change:

- **Option 1 (preferred, data-only):** re-store the one roofer row's `twilio_number` (last-4 `0389`) in
  strict E.164 (`+1` + 10 digits, no spaces/separators/whitespace) so it byte-matches the normalized EOCR
  destination. This is a single-row, out-of-band Supabase UPDATE performed by Jason (masked), touching no
  code, no route, no deploy. It preserves the Build 268 no-op and the Build 271/275 persist path exactly.

- **Option 2 (code, higher blast radius):** normalize BOTH sides of the roofer lookup (e.g. match on a
  normalized/E.164 representation rather than raw stored text). This changes production matching behavior
  for **every** roofer row and therefore is a runtime backend behavior change. It must not be applied
  silently; it **requires separate approval** and its own validation, and even then Option 1 is the safer
  first move.

Build 275 applies **neither**. No runtime/backend source behavior is changed here.

production_safe_fix_added = false
proposed_fix_option_1 = data_only_restore_roofer_twilio_number_to_strict_e164_out_of_band_by_jason_masked
proposed_fix_option_2 = code_normalize_both_sides_of_roofer_lookup_requires_separate_approval

---

## 8. Exact next masked evidence needed (to confirm #1 vs #2 vs #3)

One small, masked, read-only piece of evidence decides it — **no new call required**:

- **A. Stored-format check (settles #1):** the **shape** (not value) of the mapped roofer's stored
  `twilio_number` — does it start with `+`? does it contain any non-digit separators or whitespace? how
  many digits? Report masked as e.g. `starts_with_plus=Y/N, has_separators=Y/N, digit_count=NN, last4=0389`.
  If it is anything other than `+` followed by 11 digits with no separators, hypothesis #1 is confirmed.

- **B. Branch/reason from the backend log (settles #1 vs #2 vs #3 directly):** the sanitized `reason`
  field the webhook logged/returned for that one EOCR — `unknown_roofer_destination_unmapped` confirms
  #1/#2 (no-op); an `inserted`/`duplicate` result points to #3 (check the `calls` table).

- **C. calls-table check for the mapped roofer (settles #3):** whether a `calls` row exists for the mapped
  roofer around the call time (a leads-only check would miss a call row created with a null lead).

Any of A/B/C is sufficient to convert this diagnosis into a targeted fix. All are read-only and masked;
none requires a call, SMS, deploy, config, schema, or secret print.

mapped_roofer_persistence_readiness = blocked_pending_specific_masked_evidence

---

## 9. Is another controlled PSTN retest justified now?

**Not yet.** A retest before the format/branch evidence would likely reproduce the same 200 no-op and burn
the one-call budget. The correct sequence is: (1) obtain masked evidence A or B; (2) if #1 confirmed,
apply Option-1 data fix out-of-band (masked); (3) THEN a single separately-approved PSTN retest to prove
end-to-end persistence. A retest is technically justified **only after** the mapping byte-match is
corrected and re-confirmed.

another_pstn_retest_justified = only_after_masked_evidence_and_mapping_fix

---

## 10. Safety invariants (Build 275)

- No call. No retry. No second call. No SMS. No homeowner contact. No roofer contact.
- This build placed no call and requested none. No Vapi Test/Talk/browserWebCall. No Twilio CLI/API. No
  Retell API. No Vapi API. No curl / live HTTP. No real Supabase connection. No production DB read/export.
- No roofer row written or modified by this build. No Twilio/Retell/Vapi/Railway config change. No env var
  change. No schema/auth/RLS change. No backend deploy/redeploy/restart.
- No secret read or printed. `backend/.env` values not read. The local secret file
  `/tmp/roofleadhq-vapi-webhook-secret-build237` was not read.
- Full clean Vapi number never written to the repo (last-4 `0389` only). No full UUID, call id, or email
  written. Existing Twilio → Retell route preserved untouched.

no_call = true
no_second_call = true
no_sms_sent = true
no_homeowner_contact = true
no_roofer_contact = true
no_twilio_config_changed = true
no_retell_config_changed = true
no_vapi_config_changed = true
no_railway_config_changed = true
no_backend_deploy = true
no_env_var_changed = true
no_schema_auth_rls_changed = true
no_production_data_export = true
no_secret_printing = true
full_clean_vapi_number_recorded_in_repo = false

---

## 11. Final status block

    build_mode = mapped_roofer_persistence_gap_diagnosis_repo_only
    build_275_diagnosis_status = completed
    first_roofer_e2e_gap = backend_200_persistence_not_observed
    call_performed_by_build_275 = false
    retry_count = 0
    no_second_call = true
    only_persisting_200_branch = inserted_true
    noop_200_branches = acknowledge_non_terminal|acknowledge_web_call|unknown_roofer_destination_unmapped|duplicate
    db_failure_is_500_not_200 = true
    suspected_branch_identified = true
    most_likely_200_without_persistence_branch = build_268_controlled_no_op_unmapped_destination
    fixture_gap_identified = true
    near_miss_format_mismatch_reproduces_symptom = true
    production_safe_fix_added = false
    proposed_fix_option_1 = data_only_restore_roofer_twilio_number_to_strict_e164_out_of_band_by_jason_masked
    proposed_fix_option_2 = code_normalize_both_sides_of_roofer_lookup_requires_separate_approval
    mapped_roofer_persistence_readiness = blocked_pending_specific_masked_evidence
    another_pstn_retest_justified = only_after_masked_evidence_and_mapping_fix
    clean_vapi_number_last4 = 0389
    mapped_roofer_identifier = Launch Test Roofing 1780434363
    no_call = true
    no_sms_sent = true
    no_homeowner_contact = true
    no_roofer_contact = true
    no_twilio_config_changed = true
    no_retell_config_changed = true
    no_vapi_config_changed = true
    no_railway_config_changed = true
    no_backend_deploy = true
    no_env_var_changed = true
    no_schema_auth_rls_changed = true
    no_production_data_export = true
    no_secret_printing = true
    full_clean_vapi_number_recorded_in_repo = false
    build_274_prerequisite_commit = dd1c1b8
    build_271_prerequisite_commit = 4d36bdf
    build_268_prerequisite_commit = 4c08b5e
    next_step = obtain_masked_stored_twilio_number_format_or_backend_reason_then_apply_option_1_data_fix_then_one_separately_approved_pstn_retest
