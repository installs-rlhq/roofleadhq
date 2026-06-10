# Agent Workflow Contract

Terminal 1 at `/root/roofleadhq` is the only trusted source of truth.

Agents may work only inside `/root/roofleadhq` or an approved worktree created from it.

Agents may not:
- write outside the approved repo/worktree
- push directly to `main`
- enable live automation
- access or expose production secrets
- mutate production data
- send SMS, email, calls, contractor notifications, homeowner notifications, or external messages
- enable public routes, booking routes, cron, scheduler, dispatcher, Vapi, Lindy, Calendar, Resend, Twilio, or Supabase production writes
- claim completion without diff proof and passing gates

Every agent task must end with:
- `git status --short`
- `git diff --stat`
- `git diff`
- required targeted verifier/wrapper where applicable
- aggregate readiness
- production gates
- safe readiness
- backend build

For product-moving tasks, also run the Agent Product Quality Gate before final review:
- `scripts/check-agent-product-quality-gate.sh`
- `node backend/scripts/verify-agent-product-quality-gate-readonly.js`
- The gate (docs/AGENT_PRODUCT_QUALITY_GATE.md) enforces product-depth (operational usefulness, not just string presence), the reusable checklist (product outcome, operator workflows, data fields, decision logs, templates, PASS/HOLD/BLOCKED, safety, forbidden language, wiring, diff proof, Terminal 1 SOT), shallow-check avoidance, stronger field-under-section checks, the archive/lock-only rule, and full dry-run safety posture.
- Agents must not pass product-moving tasks via only archive/lock/preservation layers.

Safety remains dry-run/demo-ready with live automation disabled unless explicitly approved by the founder/operator.
