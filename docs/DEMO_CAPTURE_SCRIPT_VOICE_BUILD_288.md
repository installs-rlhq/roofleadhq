# Demo Capture Script — VOICE call — Build 288

A short, sanitized script for recording a **voice call** with the Test Roofing Assistant
on a phone, for the marketing site. **Fictional data only.** This is a capture guide for
Jason to perform out of band. This build places **no call** and makes **no provider,
Vapi, Twilio, or Retell action**; Jason performs the recording separately under his own
prior approval and the existing phone/number setup — with **no config or number change**.

- voice_demo_capture_script_status=created
- Target length on screen: ~25–45 seconds. Portrait 9:16. Keep audio; add captions if easy.
- Companion specs & sanitization rules: `DEMO_MEDIA_CAPTURE_AND_SITE_SLOTS_BUILD_288.md`.
- Output file: `website/demo-voice-call.mp4` (+ poster `demo-voice-call-poster.jpg`).

## Sanitization checklist (do BEFORE recording)
- [ ] Do Not Disturb ON; status bar clean; no other-app notifications.
- [ ] Homeowner persona is fictional (below). No real name/address/email.
- [ ] The dialed number is NOT shown, OR is cropped/blurred. **Never show the clean Vapi
      number (last-4 0389)** or any real line on screen.
- [ ] Roofer referred to only as generic demo brand "Summit Ridge Roofing" / "Test Roofing Assistant".
- [ ] No dashboard with real data on screen; screen shows only the in-call UI.

## Fictional persona
- Homeowner (caller, voiced by Jason for the demo): **Chris Alvarez**
- Property (say general area only, no real street): **east side, near the high school**
- Issue: a small leak around a vent after the last storm; wants an inspection.

## What to demonstrate (AI answers → qualifies → books a homeowner inspection)
Record the phone's screen during the call (call UI + on-screen captions if used). The
story: homeowner calls, the assistant answers, asks roofing qualification questions, and
books an inspection.

## Suggested call flow (spoken)

1. **Assistant:**
   > Thanks for calling Summit Ridge Roofing, this is the scheduling assistant. How can I
   > help with your roof today?

2. **Homeowner (Chris):**
   > Hi, I've got a small leak around a vent after that last storm and I'd like someone to
   > take a look.

3. **Assistant:**
   > I'm sorry to hear that. I can set up a free inspection. Can I get your first name and
   > roughly what part of town you're in?

4. **Homeowner:**
   > Chris — east side, near the high school.

5. **Assistant:**
   > Thanks Chris. Is this the home you own, and how soon would you like someone out?

6. **Homeowner:**
   > Yes, we own it. As soon as you can.

7. **Assistant:**
   > Understood. Have you started an insurance claim, or is this the first look?

8. **Homeowner:**
   > First look, no claim yet.

9. **Assistant:**
   > Great. I have Friday at 10:00 AM open for an inspection — does that work?

10. **Homeowner:**
    > Friday at 10 is perfect.

11. **Assistant:**
    > You're all set — inspection Friday at 10:00 AM. You'll get a text reminder before
    > then. Thanks for calling Summit Ridge Roofing!

## Capture notes
- Keep the clip tight: trim ringing/dead air at the start and end.
- The confirmation moment (step 11) is the payoff; use a clean frame as the poster.
- Honest demo framing only: this shows RoofLeadHQ **answering a call and booking an
  inspection**. Do not add claims about closed jobs, quotes, estimates, invoices,
  payments, or guaranteed results.
