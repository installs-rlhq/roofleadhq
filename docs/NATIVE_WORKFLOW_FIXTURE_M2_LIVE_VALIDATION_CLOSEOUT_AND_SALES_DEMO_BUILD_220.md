# Native Workflow — M2 Live-Validation Closeout + Jason-Owned M1/M2 Milestone + Sales-Demo Readiness (Build 220)

**Type:** LOCAL-ONLY build that **truthfully closes out the one authorized M2 live-validation send**,
records the **Jason-owned M1/M2 live-validation milestone**, and produces the **sanitized sales-demo
readiness packet**.
**Status:** `demo_ready_with_live_automation_disabled` (preserved).
**Launch status:** **pilot-gated, NOT unrestricted.**
**Decision:** **`JASON_OWNED_M1_M2_LIVE_VALIDATION_COMPLETE_SALES_DEMO_PACKET_READY`**

This build performs **no send**: no SMS, no Twilio/provider call, no Twilio client, no
`messages.create`, no network/external call, no credential load/inspection, no destination value
recorded, no confirm-token arming, no retry, no homeowner contact, no real roofer contact, no live
automation, no unrestricted launch. **M1 and M2 are both permanently consumed and can never be
reauthorized.**

## Source-of-truth binding

This build binds to the **verified Build 217 source commit `8d92939`** (the foundational
integrated-workflow commit), the **verified Build 218 commit `21b840b`** (captured then consumed the
M1 approval), and the **verified Build 219 commit `2fe42d3`** (closed out M1 and captured the M2
approval). The starting HEAD for Build 220 is `2fe42d3`.

## Expected runtime mutation (preserved)

Between Build 219 and Build 220, Jason ran the guarded M2 runner exactly once. The single-use M2
approval at
`backend/fixtures/native-workflow-demo-roofer/m2-live-validation-signed-approval-build-219.json` was
**consumed and expired** by that one authorized attempt (`approval_consumed=true`,
`approval_expired=true`, `approval_consumed_outcome="attempted"`,
`next_decision_packet.m2_approval_consumed=true`). Build 220 **preserves and incorporates** this
runtime mutation; it is the only preexisting worktree change and contains no secret, phone, email,
SID, token, or destination value.

## M2 live-validation closeout (truthful)

Outside this build, Jason ran the guarded M2 runner: the **non-mutating send-time preflight** passed,
then exactly **one** Jason-operated, SMS-only attempt was made with the native-workflow-produced body.
Recorded in
`backend/fixtures/native-workflow-demo-roofer/m2-live-validation-closeout-evidence-build-220.json`:

- **M2 native workflow path validated live**; the **exact signed M2 body** was sent.
- **One attempt only** (`send_attempt_count=1`, `retry_performed=false`); **SMS sent successfully**
  (`send_exit_status=0`).
- **Recipient (Jason) confirmed receipt** and that the **received text matched M2 exactly** — **no
  M1, generic, empty, substituted, or wrong-scenario copy** was received.
- **Approval consumed and expired** — permanently; M2 can never be reused and never authorized M1.
- **Environment values cleared** after the attempt (live SIDs, token, from-number, destination,
  confirm token, raw/clean number).
- **No secrets, phone numbers, email addresses, raw SIDs, or destination values** recorded. **No
  homeowner or real-roofer contact. No unrestricted launch. All other live automation remains disabled.**

## Jason-owned M1/M2 live-validation milestone

Recorded in
`backend/fixtures/native-workflow-demo-roofer/jason-owned-m1-m2-live-validation-milestone-build-220.json`:

- Build 217 validated **five** native workflow scenarios locally through the actual native modules.
- **M1 live validation succeeded** and the exact copy matched; **M1 approval consumed and expired**.
- **M2 live validation succeeded** and the exact copy matched; **M2 approval consumed and expired**.
- Native workflow message binding is **proven live** for both `new_roof_inspection_lead_alert` / M1
  and `missed_or_slow_lead_follow_up_nudge` / M2.
- Daily recap, routing flag, and the homeowner-consent boundary remain **locally validated only**.
- Lindy remains in **safe pilot mode** and does not own the product workflow.
- **No homeowner contact** and **no real-roofer contact** is authorized. **Unrestricted launch
  remains false.**

## Sales-demo readiness packet

Recorded in
`backend/fixtures/native-workflow-demo-roofer/sales-demo-readiness-packet-build-220.json`. It is the
smallest useful sanitized packet Jason can use immediately: a demo story, proof bullets, sales
positioning, the offer (`$399-$799/mo + $499 setup`, 14-day trial after go-live, manual-approval
pilot first), and the sales next-step line ("I can test this with your inbound leads under manual
approval first."). It contains **no phone numbers, email addresses, secrets, raw SIDs, credential
values, or production data**, and uses **no guarantee, booked-jobs, or estimates/quotes/invoices/
payments/deposits language**.

### Demo-surface status (truthful, no fabrication)

A **true product demo UI wired to the live native M1/M2 workflow does NOT yet exist.** What exists
today is a sanitized marketing website, **static sample/mockup pages** under `website/demo`, and
sanitized evidence reports/runners that prove the workflow. **No UI screenshot was fabricated in this
build.** Standing up a genuine demo surface that shows the native workflow on synthetic data (or
finalizing the sanitized evidence report as the demo surface) is the **next strategic build target**.

## Fewest next steps to selling

A. Stop building new SMS proof unless a defect appears.
B. Create/confirm one usable sales demo surface (sanitized UI/screenshot if real, or the sanitized
   evidence report if no real product UI exists yet).
C. Prepare a real-roofer outreach list.
D. Conduct sales conversations manually.
E. For any real roofer pilot, capture consent and run the manual-approval workflow only.
F. Do not contact homeowners until separate consent/approval exists.

## Final decision

`decision = JASON_OWNED_M1_M2_LIVE_VALIDATION_COMPLETE_SALES_DEMO_PACKET_READY`;
`recommended_next_option = prepare_sales_demo_surface_and_recruit_real_roofer_pilots`;
`authorizes_send_now=false`; `m1_sms_sent=true`; `m1_recipient_match=true`; `m1_approval_consumed=true`;
`m2_sms_sent=true`; `m2_recipient_match=true`; `m2_approval_consumed=true`;
`homeowner_contact_authorized=false`; `real_roofer_contact_authorized=false`;
`unrestricted_launch=false`; `live_automation_remains_disabled=true`. Launch remains **pilot-gated,
NOT unrestricted**; `demo_ready_with_live_automation_disabled` preserved. **No send** occurred during
Build 220.
