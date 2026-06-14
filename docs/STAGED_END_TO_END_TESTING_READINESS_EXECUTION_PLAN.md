# Staged End-to-End Testing Readiness + Execution Plan

## Purpose

Move RoofLeadHQ from static readiness into safe staged end-to-end testing.
Prove the full lead-to-inspection workflow before any live production activation.

## Scope

Internal-only. Founder-operator-only. Dry-run/test-mode only.
This packet does not activate live automation, external sends, production writes, public routes, credentials, scheduler, dispatcher, cron, CRM automation, calendar booking automation, payment automation, Twilio, Vapi, Resend, Lindy, or production Supabase workflows.

## Safety posture

Current posture remains: demo_ready_with_live_automation_disabled.

## Flow under test

Fixture/sample lead intake -> AI response generation -> AI follow-up generation -> lead qualification -> missed-lead recovery path -> appointment/inspection readiness -> roofer calendar handoff simulation -> homeowner/roofer communication review -> reporting snapshot -> trial/payment language handling -> operator visibility and review -> PASS/HOLD/BLOCKED result.

## Stage 1 - Fixture dry-run

Use sample leads only. No external sends. No real homeowner or roofer communication.

Required scenarios:
- Fast new lead: homeowner requests roof inspection; expected response, qualification, and appointment readiness.
- Missed lead: older or previously unanswered lead; expected safe recovery message and qualification path.
- Unqualified lead: outside service area or wrong service type; expected safe decline or clarification path.
- Needs clarification: missing issue, timing, location, or contact detail; expected clarification prompt.
- Urgent lead: active leak or storm issue; expected priority handling and operator review without live send.

## Stage 2 - Local/test-mode full-flow

Required evidence:
- Lead intake payload captured.
- AI response generated.
- Follow-up generated.
- Qualification state recorded.
- Missed-lead recovery branch tested.
- Appointment readiness result produced.
- Calendar handoff simulated.
- Reporting snapshot generated.
- Operator review result recorded.
- No live sends occurred.
- No production writes occurred.

## Stage 3 - Sandbox integration testing

Only where safe sandbox/test-mode integrations exist.
- SMS provider sandbox: no real SMS.
- Email sandbox: no real recipient sends.
- Calendar sandbox: no real customer calendar booking.
- Test database: no production Supabase writes.
- Payment test mode: readiness only; no charge, invoice, or payment automation.

## Stage 4 - Founder-approved limited live test

This stage is not approved by this packet.
A limited live test requires explicit Jason approval after Stage 1 through Stage 3 evidence is reviewed.

## PASS/HOLD/BLOCKED gate

- PASS: full safe staged flow produces expected evidence with no live automation.
- HOLD: minor gaps exist but no safety breach occurred.
- BLOCKED: missing critical flow evidence, unsafe behavior, production write, live send, or unapproved activation risk.

## Operator checklist

- Confirm test uses fixture/sample leads only.
- Confirm live automation remains disabled.
- Confirm no production credentials are used.
- Confirm no external sends are enabled.
- Confirm no production Supabase writes occur.
- Confirm operator review is required before any real-world communication.

## Result tracker

- 001 Fast new lead / Fixture dry-run / Pending / TBD.
- 002 Missed lead / Fixture dry-run / Pending / TBD.
- 003 Unqualified lead / Fixture dry-run / Pending / TBD.
- 004 Needs clarification / Fixture dry-run / Pending / TBD.
- 005 Urgent lead / Fixture dry-run / Pending / TBD.

## Non-negotiable no-live-activation markers

This packet does not permit live SMS, Twilio activation, Vapi live calling, Calendar booking automation, Resend live sends, Lindy activation, cron activation, scheduler activation, dispatcher activation, CRM automation, payment automation, production Supabase writes, public route activation, contractor portal production exposure, production credentials, automated estimates, automated quotes, automated invoices, or automated payments.

## Next implementation step after this packet

Build or identify the actual safe local/test-mode E2E runner that executes fixture lead scenarios and writes evidence artifacts without external side effects.

Safety confirmation: No production Supabase writes.
