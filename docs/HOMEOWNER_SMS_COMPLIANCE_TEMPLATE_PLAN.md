# Homeowner SMS Compliance Template Plan

Date: 2026-06-02

## Purpose

Plan homeowner SMS safely before any production SMS is enabled.

This document is planning only.

No SMS sending is enabled by this document.

## Current Decision

Homeowner SMS remains disabled until templates, opt-out handling, quiet hours, and dispatcher safety are approved and verified.

## Required Before Homeowner SMS Activation

- Approved first response templates
- Approved follow-up templates
- Opt-out handling
- STOP/UNSUBSCRIBE detection
- Quiet-hour rules
- Failed message logging
- Follow-up skip rules
- Per-roofer activation flag
- Test-only verification
- Explicit approval before production use

## SMS Safety Rules

Messages must be:

- Short
- Human
- Roofing-specific
- Clear about the roofing company
- One question at a time
- No pressure
- No guaranteed outcome
- No claim of emergency service unless roofer provides it
- No AI/weird automation language

## Required Opt-Out Language

At minimum, first homeowner SMS should include:

Reply STOP to opt out.

## Quiet Hours

Do not send homeowner SMS between:

- 9:00 PM and 8:00 AM local time

If a follow-up is due during quiet hours:

- Do not send
- Reschedule to next allowed window
- Log the reason

## Manual Outreach First SMS Draft

Hi, this is {{roofer_business_name}}. We received your roofing request and wanted to follow up. Are you still looking for help with your roof? Reply STOP to opt out.

## Digital Lead First SMS Draft

Hi {{homeowner_first_name}}, this is {{roofer_business_name}}. Thanks for reaching out about your roof. What is the best time for us to follow up? Reply STOP to opt out.

## Phone Lead Follow-Up Draft

Hi {{homeowner_first_name}}, this is {{roofer_business_name}}. Thanks for calling about your roof. Are you still available to talk about scheduling an inspection? Reply STOP to opt out.

## 2-Hour Follow-Up Draft

Just checking back from {{roofer_business_name}}. Would you like help scheduling a roof inspection?

## 12-Hour Follow-Up Draft

Hi, this is {{roofer_business_name}} following up on your roofing request. Do you still need help with this?

## 24-Hour Follow-Up Draft

Final follow-up from {{roofer_business_name}}. If you still need help with your roof, reply here and we can help with next steps.

## Booking Confirmation Draft

You are scheduled with {{roofer_business_name}} for {{appointment_time}}. Address: {{property_address}}. Reply here if anything needs to change.

## Reminder Draft

Reminder: {{roofer_business_name}} is scheduled for your roof inspection at {{appointment_time}}. Reply here if anything changed.

## Wrong Number Draft

Sorry about that. We will stop contacting this number. Reply STOP to opt out.

## Required System Behavior

When homeowner replies STOP:

- Update lead status to opted_out
- Skip pending follow-ups
- Log workflow_event
- Do not send additional SMS

When homeowner replies:

- Log inbound message
- Update lead status to responded or needs_attention
- Skip automated follow-ups if appropriate
- Surface lead in dashboard

## Not Approved Yet

- Production SMS sending
- Follow-up dispatcher
- Automatic appointment confirmations
- Automatic reminders
- Roofer SMS alerts

## Next Step

Create implementation plan for SMS opt-out and quiet-hour safety before enabling any send logic.
