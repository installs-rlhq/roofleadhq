# RoofLeadHQ Error Handling & Logging Strategy

## Philosophy
- Fail fast on config/validation errors
- Retry transient issues (Twilio, Stripe, network)
- Log everything with context for observability
- Never lose a lead due to transient failure

## Pipeline Error Handling Patterns

### 1. Validation Errors (Fail Fast)
- Invalid config → pipeline stops immediately
- Missing required fields → return clear error + exit

### 2. Transient Failures (Retry)
- Twilio SMS send fails → retry 3x with exponential backoff
- Supabase insert timeout → retry once
- Retell/Vapi API hiccup → queue for later

### 3. Permanent Failures (Dead Letter)
- Invalid phone number → mark lead as error + notify
- Duplicate detected after enrichment → archive with reason

## Logging Standard

All pipelines should emit structured logs:

```json
{
  "event": "lead_intake",
  "lead_id": "uuid",
  "client_id": "acme-roofing",
  "status": "success|failed|skipped",
  "duration_ms": 1240,
  "error": null,
  "timestamp": "2026-05-21T04:45:00Z"
}
```

## Recommended Next Improvements
- Add retry decorator for external calls
- Centralized error notification (Slack/Email on critical failures)
- Dead letter queue table in Supabase

This document will be expanded as the system matures.