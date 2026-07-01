# Demo Media Capture & Site Slots — Build 288

Repo-only implementation plan for adding two sanitized phone screen-recording demos
to the RoofLeadHQ marketing site. This build prepares the placement path and capture
specs **without requiring the video files yet**. No live call, SMS, email, provider
action, config change, phone-number change, deploy, schema/auth/RLS change, or
production data export was performed.

## Status tokens
- first_roofer_e2e_status=passed
- real_roofer_outreach_status=not_started
- demo_media_capture_plan_status=created
- text_demo_capture_script_status=created
- voice_demo_capture_script_status=created
- site_demo_media_slots_status=prepared_deferred_scaffold
- actual_video_files_status=not_yet_provided
- no_call_placed=true
- no_sms_sent=true
- no_real_roofer_contact=true
- no_real_homeowner_contact=true
- no_provider_config_changed=true
- no_phone_number_changed=true
- no_twilio_retell_route_changed=true
- no_backend_deploy=true
- no_schema_auth_rls_changed=true
- no_production_data_export=true

## Prerequisite
- Build 287 (5dc1728) first pilot sales package complete. Build 286 (a23cb81) first
  controlled roofer end-to-end live pass complete. Builds 271–287 are NOT redone here.

---

## 1. What the site is (source of truth)

- The public site is a **static site** in `website/` (plain HTML + Tailwind via CDN,
  `styles.css`, `script.js`), deployed by Vercel (`website/vercel.json`). There is **no
  website build or lint step** — files are served as-is.
- Existing media convention: media lives **directly in `website/`** (e.g.
  `happy-contractors.png`, `screenshot-*.png`, `RoofLeadHQ-Roofer-2.jpg`). Filenames are
  lowercase kebab-case.
- There is already a **general landscape demo** slot in the `#demo-video` section
  (`website/index.html`) and in the hero, both pointing at `hero-ai-demo.mp4` (a file
  that is not yet in the repo; the `poster` image degrades gracefully). The two Build 288
  clips are **new and separate** from that general landscape slot — they are **portrait
  phone screen recordings** of the Test Roofing Assistant.

## 2. Where the demo media will live on the site

A new, dedicated **"See it on your phone"** section (`id="phone-demos"`) with **two
portrait video cards**:

1. **Text card** — screen recording of a text (SMS) interaction with the Test Roofing
   Assistant.
2. **Voice card** — screen recording of a voice call with the Test Roofing Assistant.

For Build 288 the section is added to `website/index.html` as a **commented-out,
ready-to-enable scaffold** (sentinel `RLHQ-BUILD-288-PHONE-DEMO-SCAFFOLD`). It renders
nothing and makes no network request until enabled, so the live site is unchanged and
cannot break if the video files are absent. Enable steps are in section 6.

Placement: immediately after the existing `#demo-video` section, so the "watch it work"
story flows landscape overview → phone-level proof.

## 3. Exact asset paths & formats Jason should provide

All files go in `website/` (root), lowercase kebab-case, matching existing convention.

| Purpose | Required file | Optional smaller alt | Poster (first frame) |
|---|---|---|---|
| Text demo | `website/demo-text-conversation.mp4` | `website/demo-text-conversation.webm` | `website/demo-text-conversation-poster.jpg` |
| Voice demo | `website/demo-voice-call.mp4` | `website/demo-voice-call.webm` | `website/demo-voice-call-poster.jpg` |

Notes:
- `.mp4` (H.264 + AAC) is the required baseline (plays everywhere). `.webm` (VP9) is an
  optional smaller companion; if provided, list it first in `<source>` order.
- The poster `.jpg` is what shows before play and if a file is ever missing — always
  provide it so the card never looks broken.
- The existing `website/demo-text-conversation.webp` is a still image used elsewhere
  ("Inside RoofLeadHQ" cards); the `.mp4`/`.jpg` above are distinct files and do not
  collide with it.

## 4. Recommended capture & compression specs

**Recording (on the phone):**
- Orientation: **portrait**, aspect ratio **9:16**.
- Resolution: capture at native (e.g. 1080×1920); deliver **720×1280** to keep size down.
- Frame rate: 30 fps.
- Duration: keep each clip **short — target 20–40 seconds**, hard max 60s. Trim dead time.
- Turn on **Do Not Disturb**; clean the status bar; close other apps/notifications.

**Compression / delivery (per clip):**
- Codec: H.264 High profile, `.mp4`, `yuv420p` (universally playable).
- Quality: CRF ~23–28; **target under ~8 MB per clip** (these autoplay/scroll on mobile).
- Audio: **text demo — mute / strip audio** (it is silent UI). **Voice demo — keep audio**,
  and add on-screen captions if convenient (accessibility + sound-off viewing).
- Poster: export the first clean frame as `.jpg`, **under ~150 KB**.
- Reference ffmpeg (Jason runs locally, out of band — not run by this build):
  - `ffmpeg -i in.mov -vf "scale=720:-2" -c:v libx264 -crf 26 -pix_fmt yuv420p -an out-text.mp4`
  - `ffmpeg -i in.mov -vf "scale=720:-2" -c:v libx264 -crf 26 -pix_fmt yuv420p -c:a aac -b:a 96k out-voice.mp4`
  - `ffmpeg -i out-voice.mp4 -vframes 1 -q:v 3 demo-voice-call-poster.jpg`

## 5. Privacy / sanitization rules (MANDATORY before any file is added)

- **Fictional homeowner only.** Use the personas in the capture scripts (Dana Miller /
  Chris Alvarez). No real homeowner name, address, phone, or email.
- **No real roofer identity.** Show the generic demo brand ("Summit Ridge Roofing" /
  "Test Roofing Assistant"). No real pilot roofer name, logo, or address.
- **No real phone numbers anywhere on screen.** If a number is visible, it must be a
  fictional `555-01xx` number (the 555-0100–555-0199 range reserved for fiction), or
  cropped/blurred. **Never show the clean Vapi number (last-4 0389)** or any real line.
- **No PII / no secrets.** No dashboards containing real roofer/homeowner data, no
  account emails, no API keys, no billing info, no tokens.
- **Clean frame.** Crop to the conversation / call UI; remove contact photos, unrelated
  notifications, and personal apps in the status bar.
- Sanitization is Jason's responsibility at capture time; this build only documents it.

## 6. How to enable the site slots (one step, later build)

After the four+ files in section 3 exist in `website/`:
1. In `website/index.html`, find the block marked `RLHQ-BUILD-288-PHONE-DEMO-SCAFFOLD`.
2. Remove the opening `<!-- RLHQ-BUILD-288-PHONE-DEMO-SCAFFOLD ... ` marker and the
   closing `--` `>` so the `<section id="phone-demos">` becomes live markup.
3. (Optional) add a nav link `<a href="#phone-demos">Phone Demo</a>` alongside the
   existing Demo link.
4. Re-run the Build 288 verifier and open the page locally to confirm both cards render.

Because the scaffold uses `<video>` with a `poster`, a missing `.mp4` would still show the
poster rather than a broken element — but do not enable until at least the `.mp4` +
`.jpg` poster for each card are present.

## 7. Capture scripts

- Text interaction script: `docs/DEMO_CAPTURE_SCRIPT_TEXT_BUILD_288.md`
- Voice call script: `docs/DEMO_CAPTURE_SCRIPT_VOICE_BUILD_288.md`

Both use fictional homeowner data only, no real roofer/homeowner data, and avoid showing
full phone numbers, real emails, or PII.

## 8. Safety posture

Website/docs/read-only-verifier changes only. No backend/src routes, controllers, or
services. No migration/schema/auth/RLS/secrets/env changes. No external calls. No Vapi /
Twilio / Retell action. The existing Twilio→Retell route and all phone numbers are
untouched. Clean Vapi number referenced only as masked last-4 0389.

## 9. Verify

- `node --check backend/scripts/verify-build-288-demo-media-capture-and-site-slots-readonly.js`
- `node backend/scripts/verify-build-288-demo-media-capture-and-site-slots-readonly.js`
- `bash scripts/run-build-288-demo-media-capture-and-site-slots-dry-run.sh`

## 10. Next single material step

Jason captures and uploads the two sanitized phone screen recordings (text + voice) plus
their poster frames into `website/`, following the specs above; a later build enables the
`#phone-demos` scaffold and verifies the cards render.
