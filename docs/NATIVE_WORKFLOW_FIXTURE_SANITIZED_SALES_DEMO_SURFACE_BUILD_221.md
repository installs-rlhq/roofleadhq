# Native Workflow — Sanitized Sales-Demo Surface (Build 221)

**Type:** LOCAL-ONLY build that generates **one usable sanitized sales-demo surface** Jason can open
locally and screenshot/share in manual roofer selling conversations.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`SANITIZED_SALES_DEMO_SURFACE_READY_FOR_MANUAL_ROOFER_OUTREACH`**

This build performs **no send**: no SMS, no email, no Twilio/provider call, no provider client, no
`messages.create`, no network/external call, no credential load/inspection, no destination value
recorded, no confirm-token arming, no retry, no homeowner contact, no real-roofer contact, no live
automation, no unrestricted launch. **M1 and M2 remain permanently consumed and are not reauthorized.**

## Source-of-truth binding

Starting HEAD for Build 221 is the verified Build 220 commit `1a8c700`
(`test(workflow): close m2 and package demo readiness build 220`).

## What was built

Build 220 identified the next strategic target: stand up a genuine demo surface that shows the native
M1/M2 workflow on synthetic data. Build 221 does exactly that.

### Demo surface (real static route in the website)

- **Path / route:** `website/demo/sales-demo.html`
- **Type:** static HTML demo surface, **generated from the native workflow modules** on synthetic
  data. It is **not** a live production automation screen and is clearly labeled `SAMPLE / DEMO`.
- It is a real, openable page that Jason can screenshot or share immediately.

### Native workflow logic used (not hand-typed copy)

The generator (`backend/scripts/build-sales-demo-surface-build-221.js`) compiles and calls the actual
production TypeScript service modules, then renders the page from their output:

- `lead-intake-recognition.service` — recognizes the synthetic inbound as a
  `roof_inspection_request`, normalizes the `website_form` source label, and routes it for
  `roof_inspection_follow_up`.
- `roofer-alert-binding.service` — produces the exact **M1** alert, the exact **M2** follow-up, the
  internal **M3** daily recap, the **homeowner-consent block** (`blocked_approval_required`,
  draft-only, no send prepared), and the **fail-closed guarded future send** (permission-only; no
  approval supplied; `permitted=false`; no send performed).

The read-only verifier (`backend/scripts/verify-sales-demo-surface-build-221-readonly.js`)
**independently** re-compiles and re-exercises the same native modules and asserts the page embeds
their exact output — so "native workflow logic used" is verifiable, not asserted.

### The demo story shown (eight steps)

1. A new roof inspection lead arrives.
2. RoofLeadHQ recognizes/organizes it as a roof inspection lead.
3. An M1 alert is prepared from native workflow logic.
4. If unanswered, an M2 follow-up is prepared from native workflow logic.
5. Open leads appear in a simple recap.
6. Source/routing label stays visible.
7. Homeowner outreach is blocked pending consent and separate approval.
8. Manual approval pilot is clear.

### Synthetic lead (labels only; contact fields hidden)

- Homeowner label: **Demo Homeowner**
- Property area: **Demo Service Area**
- Lead source: **Website form**
- Request type: **Roof inspection**
- Status: **New / awaiting first reply**
- Follow-up status: **Follow-up recommended**
- Contact phone/email: hidden, label-only placeholders (no real values)

### Sanitized proof shown on the surface

- Build 217 local integrated scenarios passed
- M1 live exact-copy proof passed
- M2 live exact-copy proof passed
- Lindy in safe pilot mode only
- No autonomous external automation
- No homeowner contact
- No unrestricted launch

### Offer and positioning shown on the surface

- Positioning: "RoofLeadHQ helps roofing contractors respond faster to roof inspection leads and
  avoid letting open leads sit without follow-up."
- Offer: **$399-$799/mo + $499 setup**, **14-day trial after go-live**, manual approval pilot first.
- Sales next-step line: "I can test this with your inbound leads under manual approval first."
- No guarantee, booked-jobs, or estimates/quotes/invoices/payments/deposits language; no production
  data; no implication that live customers have used it; no implication that homeowner contact is
  approved.

## Artifacts

- `website/demo/sales-demo.html` — the demo surface.
- `backend/fixtures/native-workflow-demo-roofer/sales-demo-surface-state-build-221.json` — the native
  output state the page was rendered from.
- `backend/fixtures/native-workflow-demo-roofer/sales-demo-surface-readiness-build-221.json` — the
  Build 221 readiness artifact.
- `backend/scripts/build-sales-demo-surface-build-221.js` — generator (exercises native modules).
- `backend/scripts/verify-sales-demo-surface-build-221-readonly.js` — read-only verifier.
- `scripts/run-build-221-sales-demo-surface-dry-run.sh` — dry-run wrapper.

## Readiness summary

- `demo_surface_created = true`
- `demo_surface_type = static_html_demo_surface_generated_from_native_workflow_modules_on_synthetic_data`
- `demo_surface_path_or_route = website/demo/sales-demo.html`
- `synthetic_data_only = true`
- `native_workflow_logic_used = true`
- `m1_m2_proof_summarized = true`
- `no_sensitive_values = true`
- `sales_demo_ready = true` (no remaining blocker)
- `recommended_next_option = prepare_roofer_outreach_list_and_start_manual_sales_conversations`

## Final decision

`decision = SANITIZED_SALES_DEMO_SURFACE_READY_FOR_MANUAL_ROOFER_OUTREACH`;
`recommended_next_option = prepare_roofer_outreach_list_and_start_manual_sales_conversations`;
`authorizes_send_now=false`; `homeowner_contact_authorized=false`;
`real_roofer_contact_authorized=false`; `unrestricted_launch=false`;
`live_automation_remains_disabled=true`; `sales_demo_surface_ready=true`;
`m1_m2_live_validation_complete=true`. Launch remains **pilot-gated, NOT unrestricted**;
`demo_ready_with_live_automation_disabled` preserved. **No send** occurred during Build 221.
