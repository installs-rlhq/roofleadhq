# Demo Capture Script — TEXT interaction — Build 288

A short, sanitized script for recording a **text (SMS) conversation** with the Test
Roofing Assistant on a phone, for the marketing site. **Fictional data only.** This is a
capture guide for Jason to perform out of band — this build places **no call, no SMS, and
no message of any kind**.

- text_demo_capture_script_status=created
- Target length on screen: ~20–35 seconds. Portrait 9:16. Mute audio (silent UI).
- Companion specs & sanitization rules: `DEMO_MEDIA_CAPTURE_AND_SITE_SLOTS_BUILD_288.md`.
- Output file: `website/demo-text-conversation.mp4` (+ poster `demo-text-conversation-poster.jpg`).

## Sanitization checklist (do BEFORE recording)
- [ ] Do Not Disturb ON; status bar clean; no other-app notifications.
- [ ] Homeowner persona is fictional (below). No real name/address/email.
- [ ] No real phone numbers visible. Use a fictional `555-01xx` number or crop the header.
- [ ] Roofer shown only as generic demo brand "Summit Ridge Roofing" / "Test Roofing Assistant".
- [ ] Clean Vapi number (last-4 0389) NOT shown anywhere.

## Fictional persona
- Homeowner: **Dana Miller**
- Fictional callback number if a number must appear: **(555) 010-4827**
- Property (say general area only, no real street): **north side of town**
- Issue: a few missing shingles + a small ceiling stain after last week's wind.

## What to demonstrate (missed-call capture → fast text response → qualification → inspection booked)
The story: homeowner's call was missed, RoofLeadHQ AI follows up by text, asks roofing
qualification questions, and gets a homeowner inspection onto the calendar.

## Suggested message thread (record scrolling through this)

1. **RoofLeadHQ AI (auto follow-up after a missed call):**
   > Hi, this is the assistant for Summit Ridge Roofing. Sorry we missed your call! I can
   > help you get a roof inspection set up. What's going on with your roof?

2. **Homeowner (Dana):**
   > Hi — we lost a few shingles in the wind last week and now there's a small stain on
   > the ceiling.

3. **RoofLeadHQ AI:**
   > Thanks Dana. Is this for a home you own, and roughly what part of town are you in?

4. **Homeowner:**
   > Yes, we own it — north side of town.

5. **RoofLeadHQ AI:**
   > Got it. Is this something you'd want looked at soon, and have you filed an insurance
   > claim yet?

6. **Homeowner:**
   > Pretty soon if possible. No claim yet.

7. **RoofLeadHQ AI:**
   > No problem. I can get one of our roofers out for a free inspection. Does Thursday at
   > 2:00 PM work, or would morning be better?

8. **Homeowner:**
   > Thursday at 2 works.

9. **RoofLeadHQ AI:**
   > You're booked — inspection Thursday at 2:00 PM. You'll get a reminder beforehand.
   > Thanks Dana!

## Capture notes
- Scroll slowly and evenly so each bubble is readable.
- End on the confirmation bubble (message 9) — that is the payoff frame; use it (or a
  clean earlier frame) as the poster.
- Keep it conversational and honest: this is a **demo** of RoofLeadHQ **booking an
  inspection** — do not add any claim about closed jobs, quotes, estimates, invoices, or
  guaranteed results.
