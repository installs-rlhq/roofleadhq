# RoofLeadHQ Agent Acceleration and Harness Plan

This document is the repo-controlled source of truth for accelerating RoofLeadHQ development with autonomous agent assistance while preserving Terminal 1 verification, dry-run safety, and production gate discipline.

## Current Source of Truth

Terminal 1 at `/root/roofleadhq` is the only trusted repo source of truth.

Latest verified source-of-truth commit at the time this plan was introduced:

- `8e1d87d test(pilot): record first roofer manual setup session extended archive completion final lock milestone`

Terminal 1 confirmed:

- `HEAD -> main`
- `origin/main`
- `HEAD` and `origin/main` matched
- source-of-truth verification passed
- safety remained demo-ready with live automation disabled

## Why This Plan Exists

Development has become too slow because too much work is being done manually and serially, and prior autonomous agents failed source-of-truth discipline by saving work in the wrong repo, not finishing work, or claiming completion without verified diffs and gates.

The solution is not to trust agents more. The solution is to constrain agents with a repo-safe harness, isolated worktrees, required verification gates, branch/PR discipline, and Terminal 1 final authority.

## Operating Principles

1. Terminal 1 remains the merge captain.
2. Agents may assist with implementation, docs, tests, and verifiers, but cannot be trusted without proof.
3. Agents may not push directly to `main`.
4. Agents may not write outside `/root/roofleadhq` or an approved worktree created from it.
5. Every task must produce a visible diff.
6. Every task must pass required gates before commit or PR.
7. Live automation remains disabled unless explicitly approved by the founder/operator.
8. No production sends, production writes, public route enablement, live calls, external notifications, credential exposure, secret exposure, or destructive actions are allowed by default.

## Approved Stack Roles

### GitHub

GitHub is the canonical remote repository and should be used for:

- branches
- pull requests
- CI checks
- branch protection
- issue-based agent tasking
- source-controlled documentation

### Hostinger / Terminal 1

Hostinger Terminal 1 is the trusted operating environment for:

- `/root/roofleadhq`
- Docker and local tooling
- source-of-truth verification
- final verification
- final commit/push where appropriate
- agent harness execution
- isolated worktree creation

### xAI / Grok

xAI API tokens remain the default cost-effective autonomous implementation resource.

Approved use:

- implementation drafts
- docs/tests/read-only verifiers
- repetitive safe refactors
- task-based worktree changes

Not approved:

- direct pushes to `main`
- production activation
- work outside approved repo/worktree
- claiming completion without gates

### ChatGPT Plus / Codex

ChatGPT Plus / Codex should be used for higher-quality review, debugging, planning, and hard implementation tasks.

Approved use:

- reviewing agent diffs
- debugging failed gates
- writing harness scripts
- planning feature batches
- checking safety logic

### Optional Claude Code / GitHub Copilot Agent

Optional future agent lanes may be added after the harness is proven.

Approved use:

- PR-based implementation
- GitHub issue/PR task execution
- independent review lane

Not approved:

- direct production credential access
- direct `main` pushes
- bypassing CI or Terminal 1 source-of-truth verification

### Vercel

Vercel may be used for frontend preview deployments.

Default safety posture:

- preview only
- production deployment requires manual approval
- no live automation credentials in preview
- no production route enablement by agents

### Railway

Railway may be used for backend staging/preview.

Default safety posture:

- staging/preview only
- no production scheduler activation
- no production dispatcher activation
- no production sends
- no production writes unless explicitly approved

### Supabase

Supabase must be separated by environment.

Default safety posture:

- local/test/staging writes only
- production service role keys unavailable to agents
- production writes blocked unless explicitly approved
- write paths guarded by environment flags

### Vapi

Vapi remains disabled by default.

Approved modes:

- fake payloads
- dry-run contract tests
- manual payload review

Not approved:

- live calls
- live call scheduling
- production activation
- agent access to live call credentials

### Lindy

Lindy remains internal/manual by default.

Approved modes:

- internal-only review
- manual-trigger workflow
- dry-run lead review

Not approved:

- contractor notification
- homeowner notification
- production workflow activation
- external sends

## Required Harness Scripts

The acceleration harness should add the following scripts:

- `scripts/agent-preflight.sh`
- `scripts/agent-create-worktree.sh`
- `scripts/agent-run-gates.sh`
- `scripts/agent-diff-proof.sh`
- `scripts/agent-finalize-branch.sh`
- `scripts/agent-clean-worktrees.sh`

## Harness Requirements

### `scripts/agent-preflight.sh`

Must verify:

- current directory resolves to `/root/roofleadhq`
- repo root is `/root/roofleadhq`
- `git fetch origin main` succeeds
- `HEAD` and `origin/main` match
- working tree is clean
- source-of-truth verifier passes

Required checks:

- `pwd`
- `git rev-parse --show-toplevel`
- `git fetch origin main`
- `git status --short`
- `git log --oneline -8`
- `scripts/verify-source-of-truth.sh`

### `scripts/agent-create-worktree.sh`

Must create an isolated worktree under:

- `/root/roofleadhq-worktrees/<task-name>`

Branch format:

- `agent/<task-name>`

Must start from:

- `origin/main`

Must reject:

- missing task name
- unsafe task name
- existing dirty source repo
- existing duplicate worktree unless explicitly cleaned

### `scripts/agent-run-gates.sh`

Must run:

- targeted wrapper/verifier if provided
- `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `scripts/check-production-gates.sh`
- `scripts/verify-safe-readiness.sh`
- `npm --prefix backend run build`

### `scripts/agent-diff-proof.sh`

Must print:

- repo root
- branch
- `git status --short`
- `git diff --stat`
- `git diff`

### `scripts/agent-finalize-branch.sh`

Must:

- refuse to run on `main`
- run gates
- show diff proof
- commit to the agent branch only
- push the agent branch to origin
- not merge
- not push to `main`

### `scripts/agent-clean-worktrees.sh`

Must:

- list agent worktrees
- optionally remove completed worktrees
- never remove `/root/roofleadhq`

## Required Documentation

The harness build should add or later add:

- `docs/AGENT_WORKFLOW_CONTRACT.md`
- `docs/AGENT_TASK_TEMPLATE.md`
- `docs/AGENT_MODEL_STACK.md`
- `docs/AGENT_COST_CONTROL.md`
- `docs/AGENT_PR_REVIEW_CHECKLIST.md`
- `docs/ENVIRONMENT_SAFETY_MATRIX.md`
- `docs/FIRST_ROOFER_EXECUTION_READINESS_PLAN.md`

## Agent Task Template

Every agent task should define:

- objective
- allowed files
- forbidden files
- safety constraints
- acceptance criteria
- required verification
- expected commit message
- stop condition

Standard stop condition:

The agent must stop after showing:

- `git status --short`
- `git diff --stat`
- `git diff`
- passing targeted and aggregate gates

## Default Safety Flags

All agent-created docs, scripts, verifiers, runbooks, and execution packets must preserve these defaults unless explicitly approved otherwise:

- `WORKSPACE_MODE=dry-run`
- `LIVE_AUTOMATION_ENABLED=false`
- `SMS_ACTIVATION=false`
- `CALENDAR_ACTIVATION=false`
- `VAPI_ACTIVATION=false`
- `SUPABASE_WRITES=false`
- `CONTRACTOR_NOTIFICATION=false`
- `HOMEOWNER_NOTIFICATION=false`
- `CRON_ACTIVATION=false`
- `SCHEDULER_ACTIVATION=false`
- `DISPATCHER_ACTIVATION=false`
- `PUBLIC_ROUTE_ACTIVATION=false`

## Forbidden Agent Behavior

Agents may not:

- save files outside the approved repo/worktree
- claim completion without a diff
- skip verification
- push directly to `main`
- enable live automation
- access production secrets
- mutate production data
- send SMS
- send email
- place calls
- notify contractors
- notify homeowners
- enable booking routes
- enable cron/scheduler/dispatcher routes
- expose credentials or secrets
- perform destructive actions

## Environment Safety Matrix

| Environment | Production Writes | SMS | Vapi | Lindy | Calendar | Deployment |
|---|---|---|---|---|---|---|
| Local | Blocked by default | Off | Fake/test only | Off/internal only | Off | None |
| Agent Worktree | Blocked | Off | Fake/test only | Off/internal only | Off | None |
| PR Preview | Blocked | Off | Fake/test only | Internal only | Off | Preview only |
| Staging | Staging only | Off unless test-only approved | Test only | Internal only | Off | Staging only |
| Production | Explicit approval only | Explicit approval only | Explicit approval only | Explicit approval only | Explicit approval only | Manual approval only |

## Branch and PR Rules

Recommended GitHub branch protection:

- protect `main`
- disallow force pushes
- disallow branch deletion
- require status checks
- require CI gates
- require PR review for agent branches
- require branch to be up to date before merge

Agent branches should use:

- `agent/<task-name>`

Manual safe-build branches may use:

- `safe/<task-name>`

## CI Gate Requirements

GitHub CI should eventually run:

- `npm --prefix backend run build`
- `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `scripts/check-production-gates.sh`
- `scripts/verify-safe-readiness.sh`

## Development Direction Change

The default next build should no longer be another archive/lock/check layer unless there is a specific reason.

The default next build should be a shippable first-paid-launch capability, such as:

- agent harness foundation
- first-roofer execution-day runbook
- production activation preflight
- staging environment audit
- customer-facing onboarding assets
- operator dashboard final review
- manual first-roofer launch packet

## Immediate Implementation Plan

Phase 1: Commit this plan.

Phase 2: Build the harness foundation:

- `scripts/agent-preflight.sh`
- `scripts/agent-create-worktree.sh`
- `scripts/agent-run-gates.sh`
- `scripts/agent-diff-proof.sh`
- `scripts/agent-finalize-branch.sh`
- `scripts/agent-clean-worktrees.sh`
- `docs/AGENT_WORKFLOW_CONTRACT.md`
- `docs/AGENT_TASK_TEMPLATE.md`

Phase 3: Verify harness with a safe no-op/dry-run task.

Phase 4: Use the harness for the first shippable product task:

- `docs/FIRST_ROOFER_EXECUTION_DAY_RUNBOOK.md`

Phase 5: Add GitHub CI/PR branch protections after local harness is proven.

## Required Verification Before Committing This Plan

Run:

- `node backend/scripts/verify-first-paid-pilot-readiness-readonly.js`
- `scripts/check-production-gates.sh`
- `scripts/verify-safe-readiness.sh`
- `npm --prefix backend run build`
- `git diff --stat`
- `git diff`

## Safety Confirmation

This plan is documentation only.

It does not activate production, create production records, mutate Supabase, send messages, send emails, place calls, notify contractors, notify homeowners, enable booking, enable routes, expose credentials, expose secrets, run destructive actions, or perform external sends.

Safety remains dry-run/demo-ready with live automation disabled.
