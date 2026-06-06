# Vapi Sample Payload Mapping (Fake Data Only)

Date: 2026-06-06

## Purpose

This document defines the planned field mapping from a Vapi post-call payload to future RoofLeadHQ entities. It uses **only** the fake sample payload at `docs/samples/vapi-post-call-sample.fake.json`. No live Vapi integration exists.

**Safety Posture:** All work is read-only and planning-only. No webhook routes, no Vapi calls, no Supabase writes, and no production automation are present.

## Fake Sample Payload Source

`docs/samples/vapi-post-call-sample.fake.json`

All values below are fake/sanitized.

## Planned Entity Mapping

### leads
| Vapi Field                    | RoofLeadHQ Field          | Notes |
|-------------------------------|---------------------------|-------|
| `analysis.homeowner_name`     | `name`                    | Fake: "Test Homeowner" |
| `analysis.email`              | `email`                   | Fake: "redacted@example.com" |
| `analysis.property_address`   | `address`                 | Fake: "123 Fake Street, Test City, TS 00000" |
| `call.from`                   | `phone`                   | Fake: "+15555550123" |
| `analysis.roof_issue`         | `roof_issue`              | Fake: "Leak in roof" |
| `analysis.urgency`            | `urgency`                 | Fake: "medium" |
| `analysis.insurance_claim`    | `has_insurance_claim`     | Fake: false |
| `call.id`                     | `source_call_id`          | Vapi call ID for traceability |

### calls (audit / raw storage)
| Vapi Field          | RoofLeadHQ Field     | Notes |
|---------------------|----------------------|-------|
| `event`             | `event_type`         | "call.completed" |
| `call.id`           | `vapi_call_id`       | Full Vapi call ID |
| `call.from` / `to`  | `from_number` / `to_number` | Phone pair |
| `started_at` / `ended_at` | `started_at` / `ended_at` | Timestamps |
| Full payload        | `raw_payload`        | Stored as JSONB (test_only) |

### bookings
| Vapi Field                       | RoofLeadHQ Field          | Notes |
|----------------------------------|---------------------------|-------|
| `analysis.appointment_suggested` | `proposed_time`           | ISO timestamp |
| `analysis.outcome`               | `status`                  | "appointment_requested" |
| `analysis.homeowner_name` + address | `notes`                | Combined for context |

### follow_ups
| Vapi Field             | RoofLeadHQ Field     | Notes |
|------------------------|----------------------|-------|
| `analysis.outcome`     | `type`               | Derived follow-up type |
| `call.ended_at` + 24h  | `scheduled_at`       | Default follow-up timing |
| `summary`              | `notes`              | Call summary as context |

### workflow_events
| Vapi Field       | RoofLeadHQ Field     | Notes |
|------------------|----------------------|-------|
| `event`          | `event_type`         | "vapi_call_completed" |
| `call.id`        | `source_id`          | Vapi call reference |
| Full mapping     | `payload`            | Sanitized mapped data |
| `call.ended_at`  | `occurred_at`        | Event timestamp |

## Mapping Rules (Future Implementation)

- All inserts will carry `test_only: true` until explicitly approved for production.
- Phone numbers and emails will be validated/normalized before any lead creation.
- Duplicate detection will use `source_call_id` + phone + address.
- No automation (SMS, calendar booking, etc.) will be triggered from mapped data without explicit gates.

## Safety Confirmation

- Input file: fake-only sample
- No live Vapi webhook route exists
- No Vapi API calls are made
- No Supabase writes occur
- No SMS/Twilio, Calendar, Resend, or Lindy activation
- No cron/scheduler/dispatcher activation
- Retell remains deprecated and disabled

**Status:** Planning artifact only. Ready for controlled mapping implementation when separately approved.