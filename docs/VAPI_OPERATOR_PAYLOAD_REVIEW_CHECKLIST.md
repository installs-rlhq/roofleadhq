# Vapi Operator Payload Review Checklist

Date: 2026-06-06

## Purpose

This checklist is for operators to review a **sanitized** real Vapi post-call payload before any future implementation work. It is a planning and review artifact only.

**Safety Posture:** No Vapi webhook route exists. No Vapi calls are made. No Supabase writes. No SMS/Twilio/Calendar/Resend/Lindy activation. Retell remains deprecated and disabled.

## Pre-Review Requirements

- Payload must be fully sanitized per `VAPI_REAL_PAYLOAD_COLLECTION_RUNBOOK.md` redaction checklist.
- No real PII, secrets, or signatures may be present.
- Review must be performed on a copy of the sanitized file only.

## Operator Review Checklist

### 1. Required Fields Presence
- [ ] `event` or `type` present and recognizable
- [ ] `call.id` present
- [ ] `call.from` (caller phone) present
- [ ] `call.to` (called number) present
- [ ] `transcript` **or** `summary` present
- [ ] `analysis.homeowner_name` present
- [ ] `analysis.property_address` present
- [ ] `analysis.roof_issue` present
- [ ] `analysis.urgency` present

### 2. Field Name & Mapping Alignment
- [ ] Field names match expected mapping in `VAPI_SAMPLE_PAYLOAD_MAPPING.md`
- [ ] `analysis.*` fields are present under the `analysis` object
- [ ] Phone numbers follow consistent format (`call.from` / `call.to`)
- [ ] Timestamps are ISO 8601 (`started_at`, `ended_at`, `appointment_suggested`)

### 3. Transcript / Summary Quality
- [ ] Transcript or summary contains usable conversation content
- [ ] Roof issue description is clear
- [ ] Homeowner intent (inspection request, callback, etc.) is detectable
- [ ] No obvious transcription errors that would break automation

### 4. Appointment Requested vs Booked Distinction
- [ ] `analysis.outcome` clearly indicates:
  - `appointment_requested` (proposed but not confirmed)
  - `appointment_booked` (confirmed booking)
  - `callback_requested` / `no_answer` / other
- [ ] If booking requested, `analysis.appointment_suggested` is present

### 5. Missing Field Fallback Review
- [ ] Any missing critical fields are noted
- [ ] Payload would correctly trigger `needs_human_review: true` per `VAPI_MISSING_FIELDS_READINESS_GATE.md`
- [ ] No automatic booking or SMS would be attempted on incomplete data

### 6. PII / Secrets / Retell Safety
- [ ] No real names, phones, emails, or addresses remain
- [ ] No webhook secrets, signatures, or auth tokens present
- [ ] No Retell references or dependencies
- [ ] Call IDs and assistant IDs are fake or redacted

### 7. Overall Readiness Decision
- [ ] Payload passes all critical field checks → **Ready for future mapping implementation**
- [ ] Payload fails one or more critical checks → **Return for re-sanitization or additional test calls**
- [ ] Notes / concerns recorded for future implementation task

## Recommended Next Action After Review

- Record review timestamp and reviewer name in this checklist (or a linked log).
- If approved, reference this checklist in the next explicit founder-approval task for Vapi route implementation.
- Keep all production paths disabled until that approval is granted.

## Status

**Current:** Operator review checklist created. No real payloads collected. All Vapi work remains in discovery/planning phase.