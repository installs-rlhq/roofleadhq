# Verifier Quiet Mode + Fast-Lane Performance Cleanup

Date: 2026-06-18

**Internal-only / dry-run / founder-operator-only.** This packet is NOT public positioning, NOT for sales copy, NOT for customer materials, and NOT to be copied into `website/index.html` or outward-facing scripts.

## Purpose

RoofLeadHQ's safe-readiness and aggregate verifier chain is correct but too slow for normal fixture/readiness builds. Targeted packet verifiers recursively re-run prior expansion verifiers and print long PASS summaries for many historical packets. The Test-Mode Channel Preflight Evidence targeted verifier took about 1m58 because of this chain. Safe readiness also showed a prior `ETIMEDOUT` inside aggregate before later passing when rerun/logged.

This packet adds a documented **quiet mode** and **fast lane** verification approach that preserves the full aggregate regression lane for milestone/high-risk checks — without weakening safety.

## Current Bottleneck

1. **Recursive historical verifier chains:** Targeted packet verifiers (e.g. test-mode channel preflight evidence) spawn prior expansion verifiers, each printing dozens of PASS lines.
2. **Full aggregate on every dry-run wrapper:** Many `scripts/run-*-dry-run.sh` wrappers end with `scripts/verify-safe-readiness.sh`, which runs the entire `verify-first-paid-pilot-readiness-readonly.js` aggregate (100+ verifiers).
3. **Verbose stdout:** Every historical packet PASS description is printed to the terminal during normal builds, adding noise and time.
4. **Aggregate timeout risk:** Individual verifiers inside aggregate use a 120s timeout; long chains can hit `ETIMEDOUT` under load.

## Why repeated historical PASS Output Slows Normal Builds

- Each targeted verifier re-executes prior packet verifiers to prove wiring still holds.
- Dry-run wrappers then run full safe readiness, re-running the entire aggregate again.
- Terminal I/O for hundreds of PASS lines adds measurable latency.
- Operators cannot quickly see whether the **current** packet passed; signal is buried in historical noise.

## Fast Lane vs Full Regression Lane

### Fast Lane (normal fixture/readiness builds)

Use for day-to-day agent worktree builds, targeted packet verification, and pre-commit local checks:

1. targeted packet verifier — `node backend/scripts/verify-<packet>-readonly.js`
2. packet dry-run wrapper — `bash scripts/run-<packet>-dry-run.sh` (when present; may use fast lane internally)
3. quiet safe readiness / safety smoke — `bash scripts/verify-safe-readiness-fast.sh`
4. backend build — `npm --prefix backend run build`
5. commit/push/fetch — Terminal 1 only, after local gates pass
6. source-of-truth verification — Terminal 1 canonical repo only
7. cleanup — worktree hygiene, diff proof

Fast lane is **additive**. fast lane does not replace full regression.

### Full Regression Lane (milestone/high-risk builds)

Use before merge to main, milestone acceptance, production-adjacent changes, or when aggregate timeout/history is in doubt:

1. full aggregate readiness — `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js` or `bash scripts/verify-safe-readiness.sh`
2. historical fixture expansion checks — all wired packet verifiers in aggregate
3. verbose output redirected to log file — see below
4. targeted grep for FAIL/ETIMEDOUT — scan log, not terminal scrollback
5. backend build — `npm --prefix backend run build`
6. source-of-truth verification — Terminal 1 canonical repo

## When to Use Fast Lane

- Normal Grok Build agent worktree iteration
- Targeted fixture packet dry-runs during development
- Quick safety smoke before requesting Terminal 1 review
- Verifier quiet-mode performance cleanup validation itself

## When to Use Full Regression Lane

- Milestone acceptance (first paid launch gates, go/no-go)
- High-risk changes (website public copy, activation-adjacent code paths)
- Before merge to `main` / source-of-truth promotion
- After any `ETIMEDOUT` or aggregate failure (rerun with logging)
- When adding new fixture packets that must prove full historical wiring

## Preserve Safety While Reducing Normal Output

- Fast lane still checks `demo_ready_with_live_automation_disabled` via `show-pilot-readiness-status.js`
- Fast lane still runs `scripts/check-production-gates.sh` (quiet)
- Fast lane still runs backend build
- Fast lane exits nonzero on unsafe activation patterns
- Full aggregate path remains untouched in `scripts/verify-safe-readiness.sh`
- No checks removed; only **which checks run** and **how much prints** changes for normal builds

## Redirect Verbose Output to Logs

For full regression lane:

```bash
LOG=logs/aggregate-readiness-$(date +%Y%m%d-%H%M%S).log
mkdir -p logs
bash scripts/verify-safe-readiness.sh > "$LOG" 2>&1
grep -E 'FAIL|ETIMEDOUT|error' "$LOG" || echo "No FAIL/ETIMEDOUT in aggregate log"
tail -20 "$LOG"
```

For targeted packet verifiers with recursive history:

```bash
LOG=logs/packet-verifier-$(date +%Y%m%d-%H%M%S).log
node backend/scripts/verify-<packet>-readonly.js > "$LOG" 2>&1
grep -E 'FAIL|ETIMEDOUT' "$LOG" || echo "Packet verifier clean"
tail -30 "$LOG"
```

Quiet mode principle: **grep for failures; summarize passes.**

## Timeout Handling Guidelines

1. If aggregate reports `ETIMEDOUT`, rerun full regression lane with output redirected to a log file.
2. Do not disable or extend timeouts in verifiers without explicit approval.
3. Do not skip verifiers to "fix" timeout — use fast lane for iteration, full lane for proof.
4. If timeout persists, check system load; run aggregate from Terminal 1 canonical repo.
5. Log the failing script name from aggregate output before retry.

## Safety Rules (Non-Negotiable)

### No Safety Weakening Rule

Fast lane and quiet mode must never remove, bypass, or weaken existing safety checks. Additive wrappers only.

### No Live Activation Rule

No live SMS, Twilio, Vapi, Resend, Google Calendar, Lindy, CRM sync, live CSV delivery, billing, payments, invoices, estimates, quotes, customer notifications, routes, webhooks, scheduler, cron, dispatcher, or production Supabase reads/writes. No sandbox/test-mode sends or external calls.

### No Credential/Env Logging Rule

Do not add, read, print, validate, or infer real credentials, tokens, API keys, webhook secrets, service-role keys, or env values.

### No Production Data Rule

Local read-only / dry-run / fixture-only. No production data touches.

### No Schema/Auth/RLS/Security Implementation Rule

Do not modify production credentials, env files, secrets, schema, migrations, auth, RLS, security implementation, live routes, scheduler, cron, or dispatcher.

## Artifacts

| Artifact | Path |
|----------|------|
| This doc | `docs/VERIFIER_QUIET_MODE_FAST_LANE_PERFORMANCE_CLEANUP.md` |
| Read-only verifier | `backend/scripts/verify-verifier-quiet-mode-fast-lane-performance-cleanup-readonly.js` |
| Dry-run wrapper | `scripts/run-verifier-quiet-mode-fast-lane-performance-cleanup-dry-run.sh` |
| Fast safe readiness | `scripts/verify-safe-readiness-fast.sh` |
| Full safe readiness (preserved) | `scripts/verify-safe-readiness.sh` |

## Recommended Finalization Workflow After Cleanup

1. Run fast lane locally in worktree:
   - `node backend/scripts/verify-verifier-quiet-mode-fast-lane-performance-cleanup-readonly.js`
   - `bash scripts/run-verifier-quiet-mode-fast-lane-performance-cleanup-dry-run.sh`
   - `bash scripts/verify-safe-readiness-fast.sh`
   - `npm --prefix backend run build`
2. Request Terminal 1 full regression lane before merge:
   - `bash scripts/verify-safe-readiness.sh` (with log redirection)
   - Source-of-truth commit chain verification
3. Confirm `demo_ready_with_live_automation_disabled` in both lanes.
4. Grep aggregate log for `FAIL` / `ETIMEDOUT` only.
5. Run `scripts/agent-diff-proof.sh` from Terminal 1.
6. Do not commit/push from agent worktrees unless explicitly directed.

## Safety Summary

- local read-only verifier only
- dry-run/internal-only
- no production data
- no credentials
- no env logging
- no external service calls
- no live automation
- no test-mode automation activation
- no public routes
- no scheduler/cron/dispatcher
- no CRM sync
- no live CSV
- no billing/payment/deposit/invoice/estimate/quote automation
- no public website/pricing/legal/privacy/terms publication changes
- no schema/migrations/auth/RLS/security implementation
- `demo_ready_with_live_automation_disabled` preserved
- full aggregate regression lane preserved via `scripts/verify-safe-readiness.sh`