# First Paid Launch Automation Foundation Packet

## Purpose

The First Paid Launch Automation Foundation Packet defines the shift from agent improvisation to repeatable, repo-controlled Terminal scripts for RoofLeadHQ first-paid launch work.

The purpose is to reduce founder bottleneck, preserve momentum, and make safe build steps repeatable without relying on OpenClaw or any agent as the source of truth.

## Operating Model

Terminal 1 in `/root/roofleadhq` is the source of truth.

Agents may help draft docs, inspect files, suggest changes, and propose scripts, but agent-reported commits, pushes, and completion claims are not trusted unless Terminal 1 verifies them.

Required source-of-truth proof:

- `git fetch origin main`
- `git status --short`
- `git log --oneline`
- `test "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)"`

## Added Scripts

This packet adds these repo-controlled scripts:

- `scripts/verify-source-of-truth.sh`
- `scripts/verify-safe-readiness.sh`
- `scripts/show-diff-proof.sh`
- `scripts/record-milestone.sh`

## Script Responsibilities

### verify-source-of-truth.sh

Confirms the repo path, fetches origin/main, shows status and recent log, and verifies local HEAD matches origin/main.

### verify-safe-readiness.sh

Runs the current safe read-only verification stack:

- next-chat context package verifier
- latest milestones verifier
- latest milestone self-check
- aggregate first-paid pilot readiness verifier
- backend build

### show-diff-proof.sh

Shows status, diff stat, and full diff before staging or committing.

### record-milestone.sh

Adds a milestone string to the latest milestone guard files and appends a source-of-truth milestone section to the next-chat context package.

## Why This Matters

RoofLeadHQ cannot depend on fragile agent memory or unverified agent completion reports.

This packet creates a safer foundation for larger future builds, including:

- roofer onboarding scripts
- per-roofer readiness checks
- production gate checks
- verified packet creation flows
- safer milestone recording

## OpenClaw Limitation

OpenClaw and similar agents may still be useful for drafting and inspection, but they are not trusted for source-of-truth commit or push status.

Terminal 1 must verify every real commit and push.

## Future Direction

Preferred future scripts include:

- `scripts/onboard-roofer.sh`
- `scripts/verify-roofer-onboarding-readiness.sh`
- `scripts/check-production-gates.sh`
- `scripts/create-first-paid-packet.sh`
- `scripts/commit-safe-build.sh`

These should be built incrementally with explicit safety gates.

## Production Gate Posture

No production behavior may be activated by these scripts.

No production Calendar/SMS activation is allowed without explicit flag changes and Terminal 1 verification.

## Safety Confirmation

Safety remains demo-ready with live automation disabled.

No live SMS/Twilio sends.

No production Supabase writes.

No Supabase schema mutation.

No Vapi production webhook ingestion.

No live Vapi webhook route.

No Vapi calls from code.

No Retell route activation.

No Calendar booking activation.

No Resend production activation.

No Lindy production activation.

No cron activation.

No scheduler activation.

No dispatcher activation.

No public production route activation.

No secrets exposure.

No destructive operations.
