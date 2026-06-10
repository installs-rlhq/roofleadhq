# Agent Task Template

## Objective

Describe one clear outcome.

## Repo

Work only inside `/root/roofleadhq` or an approved worktree under `/root/roofleadhq-worktrees`.

## Allowed Files

List exact files or directories the task may modify.

## Forbidden Files

- `.env*`
- production secrets
- production deployment credentials
- live automation routes/config unless explicitly approved

## Safety Constraints

- dry-run only by default
- no production writes
- no SMS sends
- no calls
- no emails
- no contractor/homeowner notifications
- no cron/scheduler/dispatcher activation
- no public route enablement
- no credential/secret exposure

## Acceptance Criteria

- expected files added/changed
- targeted wrapper/verifier added where applicable
- aggregate verifier wired where applicable
- docs/context updated where applicable
- gates pass

## Required Verification

Run `scripts/agent-diff-proof.sh` and `scripts/agent-run-gates.sh`.

## Stop Condition

Stop after showing diff proof and passing gates. Do not merge or push to `main`.
