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

Safety remains dry-run/demo-ready with live automation disabled unless explicitly approved by the founder/operator.
