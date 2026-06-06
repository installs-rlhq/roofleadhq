# Vapi Missing-Fields Readiness Gate

Date: 2026-06-06

## Purpose

This document defines the required-field readiness rules for any future Vapi post-call payload before it can trigger automation in RoofLeadHQ. It is a planning and verification artifact only.

**Safety Posture:** No Vapi webhook route exists. No Vapi calls are made. No Supabase writes, SMS, Twilio, Calendar, Resend, Lindy, cron, scheduler, or dispatcher activation. Retell remains deprecated and disabled.

## Required Fields for Automation

The following fields must be present and non-empty in a Vapi post-call payload before any automation (lead creation, booking, SMS, etc.) is allowed:

### Critical (Block Automation if Missing)
- `event` or `type` (must be a recognized call event)
- `call.id` (Vapi call identifier)
- `call.from` (caller phone number)
- `call.to` (called number)
- `transcript` **or** `summary` (conversation content)
- `analysis.homeowner_name`
- `analysis.property_address`
- `analysis.roof_issue`
- `analysis.urgency`

### Conditional (Required if Outcome Involves Booking)
- `analysis.appointment_suggested` or `analysis.appointment_date/time` — required when `analysis.outcome` indicates booking requested or appointment proposed

### Recommended (Do Not Block, But Log Warning)
- `analysis.email`
- `analysis.insurance_claim`
- `call.started_at` / `call.ended_at`

## Readiness Gate Rules

1. If any **Critical** field is missing or empty → **Block automation**
   - Mark payload as `needs_human_review: true`
   - Do not create lead, booking, or follow-up automatically
   - Future workflow_error log only after approved implementation

2. If **Conditional** field is missing when booking outcome is detected → **Block booking automation**
   - Allow lead creation with `needs_human_review: true`
   - Do not create booking or send confirmation SMS

3. All future automation paths must first pass this readiness gate.

## Safe Fallback Actions (Future)

When a payload fails the readiness gate:
- Mark the record with `needs_human_review: true`
- Do not create booking automatically
- Do not send SMS automatically
- Log to `workflow_errors` table only after explicit approval of the error-logging implementation
- Surface to operator dashboard for manual review

## Current Status

**Current:** Readiness gate defined. No implementation exists. All Vapi work remains in discovery/planning phase. Retell deprecated.