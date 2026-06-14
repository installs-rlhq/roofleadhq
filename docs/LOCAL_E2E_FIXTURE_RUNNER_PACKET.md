# Local E2E Fixture Runner Packet

Status: internal-only / local fixture-only / dry-run / founder-operator-only.

## Purpose

This packet implements the next safe step after the Staged End-to-End Testing Readiness + Execution Plan: a local/test-mode E2E fixture runner that executes sample lead scenarios and writes evidence artifacts without live sends, production writes, production Supabase writes, calendar booking automation, payment automation, credentials/env reads, public route activation, or external service calls.

## Scope

The runner covers fixture/sample lead intake, AI response generation, AI follow-up generation, lead qualification, missed-lead recovery path, appointment/inspection readiness, roofer calendar handoff simulation, homeowner/roofer communication review, reporting snapshot, trial/payment language handling, operator visibility and review, and PASS/HOLD/BLOCKED evidence.

## Files

- `backend/scripts/run-local-e2e-fixture-runner.js`
- `backend/scripts/verify-local-e2e-fixture-runner-readonly.js`
- `scripts/run-local-e2e-fixture-runner-dry-run.sh`
- `docs/LOCAL_E2E_FIXTURE_RUNNER_PACKET.md`

## Execution model

The runner is a local Node.js script. It does not import Supabase, Twilio, Vapi, Calendar, Resend, Lindy, dotenv, https, http, or fetch. It uses hardcoded fixture/sample leads only and writes local evidence artifacts under `/tmp/roofleadhq-local-e2e-fixture-runner`.

## Fixture scenarios

1. `fixture-fast-response-ready`: in-service-area lead with enough inspection-readiness details.
2. `fixture-missed-lead-recovery`: eligible missed lead requiring follow-up and operator review.
3. `fixture-hold-not-service-area`: service-area mismatch requiring HOLD.

## Required evidence artifacts

Each run writes:

- `local-e2e-fixture-results.json`
- `local-e2e-fixture-evidence.md`

## PASS/HOLD/BLOCKED gate

- PASS means the fixture scenario can move through response/follow-up/qualification/appointment-readiness/calendar-handoff simulation safely.
- HOLD means operator review is required before simulated next step.
- BLOCKED is reserved for fixture validation failure or safety-rule failure.

## Safety guardrails

- Fixture/sample leads only.
- No live sends occurred.
- No production writes occurred.
- No production Supabase writes occurred.
- No calendar event created.
- No payment automation occurred.
- No credentials or env values read.
- No public route activation occurred.
- No external service calls occurred.
- No backend production behavior changed.

## Relationship to staged readiness plan

This packet implements Stage 1 - Fixture dry-run from `docs/STAGED_END_TO_END_TESTING_READINESS_EXECUTION_PLAN.md`. It does not approve Stage 2, Stage 3, or Stage 4 activation.

## Next implementation step after this packet

After this packet passes, the next safe implementation step is to connect the local fixture runner to existing read-only local transformation functions, if available, while preserving fixture-only inputs and `/tmp` evidence output.
