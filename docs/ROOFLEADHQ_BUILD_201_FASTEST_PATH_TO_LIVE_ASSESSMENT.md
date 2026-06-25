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

1. **Stop the per-state fixture-ceremony loop** — one build per real event.
2. **Jason runs the already-approved Build 200 send** to prove a real controlled send succeeds.
3. **Onboard one real roofer and run one real lead end-to-end manually** before building more automation.
4. **Finalize homeowner SMS consent/opt-out language** before any real-homeowner message.
5. **Consolidate verifiers/docs** (one reusable verifier over a manifest; one living readiness doc) to
   cut build count, tokens, and maintenance.

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
