# RoofLeadHQ — Build 201: Fastest Path to Live (Assessment + Recommendation)

**Type:** LOCAL-ONLY application assessment. No live action. No SMS, Twilio, network calls, secrets,
production data, or schema/auth changes.
**Safety posture:** `demo_ready_with_live_automation_disabled` (preserved).
**Source-of-truth commit at assessment:** `fce6035` (Build 200).
**Bottom line:** The core app is small and capable; the **build process itself is the bottleneck**.
Stop the per-state fixture ceremony, have Jason do the one already-approved controlled send, onboard
**one** real roofer, and run **one** real lead end-to-end manually. That is the fastest, safest path
to a useful live pilot.

---

## 0. Repo scale snapshot (why this matters)

| Thing | Approx. count |
| --- | --- |
| Backend app source | **~4,500 LOC** (Express/TypeScript + a few Python report helpers) |
| `docs/` | **~496** files |
| `scripts/` (root) | **~321** |
| `backend/scripts/` | **~458** |
| Native-workflow fixtures | **~185** |
| Workflow "build" commits | **~79** |

A ~4.5k-LOC application is wrapped in **~1,100 scripts/docs/fixtures and 79 build commits**. Most of the
recent arc (Builds ~193–200) produced JSON fixtures + a bespoke verifier + a dry-run wrapper + 1–2 docs
**per state transition** of a *single* controlled SMS to *one* test identity. That ceremony — not the
product — is what is slowing launch.

---

## 1. Executive assessment

### Already proven
- Local suite **30/30**; mock-adapter suite **30/30**.
- Sandbox/test SMS simulated safely (no live send).
- A controlled live SMS to **Jason's own** number: one message succeeded.
- A "first controlled roofer pilot" one-message send to a **consenting test identity**: succeeded,
  Jason-operated, one message, no retry.
- Real safety primitives exist in code: **opt-out, quiet hours, duplicate-send detection, template
  approval, invalid-phone guard, missing-field guard** (`sms-safety.service.ts`).
- Mock **and** live SMS adapters, a **fail-closed one-message runner**, roofer onboarding scaffolding
  (`scripts/onboard-roofer.sh`), and legal **Privacy/ToS** PDFs are present.
- Safety gating has held across **79 builds** with zero secrets committed.

### Not proven
- **No real/paying roofer** has been onboarded or validated.
- **No end-to-end live flow** (real lead → qualification → outreach → real homeowner) has run.
- Production Supabase writes, Vapi voice, calendar, and email (Resend) have **never** run live.
- The **Build 200 expansion retry send has not been executed** (it is approved + preflighted, awaiting
  Jason).

### Blocked
- **Nothing is technically blocked.** The only gate is the deliberate **Jason-operated** live send —
  that is the safety posture by design, not a defect.

### Over-engineered / slowing launch
- The **build-ceremony loop**: each build emits fixtures + a one-off verifier + a wrapper + docs.
- Many near-duplicate `FIRST_PAID_LAUNCH_*` doc packets and **extremely long chained filenames**
  (`...reopen-guard-final-lock-...-archive-...-freeze-...`).
- Verifier + wrapper are recreated per build instead of being **parameterized over a manifest**.

### Truly required before a first real pilot
1. **One** successful Jason-operated controlled send (already approved — just run it).
2. Onboard **one** real consenting roofer (scaffold exists).
3. Run **one** real lead through manual qualification + one approved SMS.
4. Finalize homeowner **SMS consent / opt-out** language.

---

## 2. Fastest path to live

**Minimum viable live pilot:** one real roofer + Jason-operated manual lead qualification + one approved
SMS template + the existing opt-out/quiet-hours safety + manual booking. **No new automation.**

**Next 3–7 steps:**
1. **(Jason, human)** Run the already-approved Build 200 one-message send in your shell (fail-closed
   runner, one message, no retry) with the validated destination.
2. **(Claude, build)** **One** LOCAL-ONLY closeout capturing that outcome (names/codes only) — *not*
   three builds.
3. **(Jason, human)** Onboard **one** real consenting roofer; confirm SMS template + opt-out/quiet-hours.
4. **(Jason, human)** Take **one** real homeowner lead, qualify manually, send **one** approved SMS via
   the same controlled path.
5. **(Claude, build)** **One** consolidated pilot-result evidence build (intake → outreach → outcome).
6. **(Jason + Claude, decision)** Go/No-Go: widen to a second roofer or harden automation.

**Stop building now:** more approval/preflight/closeout fixture trios for the same single send; new
near-duplicate launch doc packets; new per-build verifier+wrapper pairs; longer chained-filename
session/lock/archive docs.

**Can wait until after first customer validation:** live Supabase writes at scale, Vapi voice, calendar
sync, email sequences, cron/scheduler/dispatcher automation, public webhook routes, billing/quote/
invoice/deposit, multi-roofer blast.

---

## 3. Risk assessment

- **Operational:** Jason is the sole operator and rollback owner; manual steps need a **one-page**
  runbook; build ceremony creates a false sense of progress without a real customer.
- **Compliance / SMS consent:** finalize homeowner consent + opt-out language before any real-homeowner
  SMS; verify quiet-hours against the real roofer timezone; keep a per-homeowner consent record.
- **Secret handling:** keep secrets in Jason's shell only — this has held for 79 builds; never commit
  SID/token/phone/number.
- **Repo / process:** doc/script/fixture sprawl raises navigation and maintenance cost; very long
  filenames risk tooling/path limits. Source-of-truth discipline is **strong — keep it**.
- **Product / customer:** no real customer has validated value yet; the real risk is polishing safety
  ceremony instead of selling outcomes.

---

## 4. Recommended architecture path

- **Stay local/manual for now:** lead qualification decisioning, SMS send trigger (Jason-operated),
  booking confirmation, roofer onboarding.
- **Move to production later:** Supabase persistence of leads/outcomes, inbound lead webhook intake,
  automated follow-up cadence — **after** one roofer proves value.
- **Do not automate yet:** outbound SMS blast, Vapi outbound voice, calendar auto-booking, email
  sequences, billing/invoice/deposit, cron/schedulers/dispatchers.

---

## 5. Launch gating recommendation

**Controlled pilot launch criteria:** one real controlled send succeeded · one real roofer onboarded &
consenting · approved SMS template + opt-out language final · homeowner consent capture defined · Jason
available as operator/rollback owner.

**Go/No-Go checklist:** safety posture `demo_ready_with_live_automation_disabled` preserved · no secrets
in repo · opt-out + quiet-hours verified · one-message/no-retry discipline intact · rollback owner
identified.

**Rollback/stop procedure:** stop sending immediately; do **not** retry; preserve outcome as names/codes
only; capture a LOCAL-ONLY closeout. **Stop/rollback owner: Jason Lohse.**

**Owners:** Operator = Jason · Rollback owner = Jason · Builder = Claude (local-only artifacts only).

---

## 6. Token / time / cost reduction

- **Reduce build count:** one build per **real event**, not per approval/preflight/send/closeout state.
- **Stop per-build verifier+wrapper proliferation:** parameterize **one** reusable verifier over a
  fixtures manifest.
- **Batch future work:** one pilot-result build instead of intake/outreach/outcome as three; one living
  readiness doc instead of new packets.
- **Reduce prompts/interruptions:** keep autonomy-authorization blocks like this build's; predeclare
  allowed local-only commands; avoid new long chained filenames.
- **Jason manual vs Claude build:** Jason does live sends, real onboarding, secret handling, real
  homeowner consent. Claude does local-only evidence capture, verifiers, docs, safety checks.

---

## 7. Build recommendation

- **Single best next build (Build 202):** ONE consolidated LOCAL-ONLY closeout of the Jason-operated
  Build 200 expansion retry send — capture outcome (names/codes only), update launch-readiness, single
  verifier + wrapper — **only after Jason actually runs the send.**
- **Estimated builds remaining until a useful live pilot:** **2–4.**
- **Unrestricted launch:** treat as a **business decision gated on real-customer validation + compliance
  sign-off**, *not* a build milestone. Do not chase it with more fixtures.

---

## Top 5 recommendations

1. **Stop the per-state fixture-ceremony loop** — **one consolidated pilot packet per controlled
   milestone**, not many micro-builds for the same narrow SMS use case.
2. **Jason runs the already-approved Build 200 send** (or explicitly decides to stop expansion) to turn
   a sunk approval into a real learning, then closes out **once** locally.
3. **Onboard one consenting roofer/test participant and run one real SMS interaction end-to-end
   manually** before building more automation.
4. **Finalize homeowner SMS consent/opt-out language and keep messaging honest** — "book inspections,"
   not "guaranteed jobs"; no live billing/CRM/quote claims — before any real-homeowner message.
5. **Cut build/token/permission overhead** — one reusable verifier over a manifest, one living readiness
   doc, run Claude in `--permission-mode auto` scoped to `/root/roofleadhq`, and keep secrets in a local
   secret file outside the repo.

---

## 8. Business framing (folds into the above)

**Core promise (keep it honest):** close the gap between a roofing lead and a **booked inspection** —
respond fast, qualify, route/flag, move toward an inspection appointment, and give the contractor
reporting/visibility. **Say "book inspections/appointments," not "guaranteed jobs."** Do **not** claim
estimates, quotes, invoices, payments, deposits, CRM sync, or calendar booking as live until they are
actually implemented and approved.

**Target customer:** small-to-mid roofing contractors who miss leads, respond slowly, lack follow-up
discipline, or want better intake/reporting. **Initial pilot stays very narrow:** one consenting
roofer/test identity, SMS only, one controlled interaction at a time.

**Commercial model (exists on paper — billing correctly deferred):** $399–$799/mo tiers + $499 setup;
14-day trial starting at go-live; pre-payment email ~2 days before the first charge; first billing on
day 15 unless canceled; cancel anytime in trial. **The pilot does not require billing — do not automate
payment/billing yet.** This is a commercial-readiness item, not a technical blocker to a learning pilot.

### Minimum viable pilot (useful, not perfect)

A useful live pilot does **not** require unrestricted launch. It requires: one clearly consenting
roofer/test participant · a valid SMS destination controlled by Jason (never stored in repo/chat) · one
SMS interaction at a time · no retry unless separately approved · manual/Jason-operated send while gates
stay fail-closed · a local-only closeout after each live action · a simple observation loop (delivered?
responded? useful? what to change?). **Shortest path to learning from a roofer:** run one controlled SMS
interaction, observe, capture feedback manually, then decide proceed/pause.

### Decision branches (pick one; do not run all three as separate build trios)

- **A — Continue expansion:** Jason runs the already-approved Build 200 retry once → **one** consolidated
  local-only closeout (Build 202).
- **B — Pause expansion:** stop expansion; build **one** post-pilot customer-feedback + product-priority
  backlog packet instead of more send scaffolding.
- **C — First real pilot:** build **one** consolidated pilot launch packet (consent + one-message scope +
  manual send + observation form + rollback rules + go/no-go).

**Recommended sequence: A → C.** Run the already-approved send to bank a real result and close it out in
one build, then go straight to one consolidated pilot packet. Use **B** only if the controlled send
shows the workflow needs product changes first. **Do not** re-run approve/preflight/closeout as separate
builds for the same narrow SMS use case.

---

## Artifacts

| Artifact | Path |
| --- | --- |
| This assessment | `docs/ROOFLEADHQ_BUILD_201_FASTEST_PATH_TO_LIVE_ASSESSMENT.md` |
| Machine-readable evidence summary | `backend/fixtures/native-workflow-demo-roofer/fastest-path-to-live-assessment-build-201.json` |
| Read-only verifier | `backend/scripts/verify-fastest-path-to-live-assessment-build-201-readonly.js` |
| Dry-run wrapper | `scripts/run-fastest-path-to-live-assessment-build-201-dry-run.sh` |

## How to run (local-only, read-only)

```bash
bash scripts/run-fastest-path-to-live-assessment-build-201-dry-run.sh
node backend/scripts/verify-fastest-path-to-live-assessment-build-201-readonly.js
```

Launch remains **pilot-gated, not unrestricted**; safety posture stays
`demo_ready_with_live_automation_disabled`. This assessment authorizes no live action.
