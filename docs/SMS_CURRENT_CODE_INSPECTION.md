# SMS Current Code Inspection

Date: 2026-06-02

## Purpose

Record current SMS/follow-up code state before any SMS implementation work.

This document is inspection only.

No SMS sending is enabled by this document.

## Current Findings

No active homeowner SMS sender is currently implemented.

No Twilio outbound SMS send call was found in inspected backend code.

The current Twilio webhook path is for inbound Manual Outreach only.

Manual Outreach currently:

- validates Twilio signature
- checks duplicate MessageSid
- resolves roofer by Twilio number
- parses homeowner phone/source
- creates or finds a lead
- creates follow_up records
- creates workflow_events
- returns empty TwiML
- does not send homeowner SMS
- does not send roofer SMS

## followUpService Current State

`backend/src/services/followUpService.ts` is currently a simple helper.

It can:

- insert follow_up records
- read pending follow_up records

It does not:

- send SMS
- enforce opt-out
- enforce quiet hours
- check per-roofer SMS flags
- mark sends failed/sent
- create outbound message records

## Booking Service Current State

`backend/src/services/bookingService.ts` can create and confirm booking records.

It does not send SMS confirmations or reminders.

## Important Safety Confirmation

Current code remains safe because:

- SMS confirmation flags are disabled by onboarding/default verification scripts
- no outbound Twilio SMS sender was found
- Manual Outreach returns empty TwiML
- production SMS is not enabled

## Before SMS Implementation

Create a dedicated SMS safety service plan before writing code.

Required future components:

- opt-out parser
- quiet-hour checker
- send eligibility checker
- template selector
- outbound message logger
- failed-send logger
- per-roofer SMS flag gate
- dry-run verification script
- test-only execution mode

## Not Approved Yet

- Production homeowner SMS
- Roofer SMS
- SMS dispatcher
- Calendar confirmation SMS
- Reminder SMS

