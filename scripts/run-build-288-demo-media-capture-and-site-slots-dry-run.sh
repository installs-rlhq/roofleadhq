#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 288 — Demo Media Capture & Site Slots (repo-only) Dry-Run =="
echo "Mode: local-only, static-site + docs + read-only verifier. Prepares the site/demo-media integration path WITHOUT requiring the two phone screen-recording files yet, on top of the Build 287 first pilot sales package (5dc1728) and the Build 286 first-roofer end-to-end live pass."
echo "This build makes NO code/env/config/schema/provider change, NO Vapi/Twilio/Retell change, NO phone-number change, NO change to the existing Twilio->Retell route, NO call, NO SMS, NO email send, NO real roofer/homeowner contact, NO deploy, NO production data export, NO secret read. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read. The website phone-demo section is added as a DISABLED (commented-out) scaffold so the live site is unchanged and cannot break while the video files are absent. Clean Vapi number masked as last-4 0389."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-build-288-demo-media-capture-and-site-slots-readonly.js
echo "PASS: Build 288 verifier syntax check succeeded."

echo ""
echo "== Build 288 demo-media capture & site-slots read-only verifier (docs grounding; disabled scaffold; guardrails; no PII/secret; non-mutating) =="
node backend/scripts/verify-build-288-demo-media-capture-and-site-slots-readonly.js

echo ""
echo "== Regression: Build 287 first-pilot-sales-package verifier (business-readiness package intact; Builds 286/287 not redone) =="
node backend/scripts/verify-build-287-first-pilot-sales-package-readonly.js

echo ""
echo "PASS: Build 288 demo-media capture & site-slots dry-run passed."
echo "build_mode=demo_media_capture_and_site_slots_repo_only  build_288_status=completed  builds_271_to_287_redone=false  first_roofer_e2e_status=passed  real_roofer_outreach_status=not_started  demo_media_capture_plan_status=created  text_demo_capture_script_status=created  voice_demo_capture_script_status=created  site_demo_media_slots_status=prepared_deferred_scaffold  actual_video_files_status=not_yet_provided  no_call_placed=true  no_sms_sent=true  no_email_sent=true  no_real_roofer_contact=true  no_real_homeowner_contact=true  no_provider_config_changed=true  no_phone_number_changed=true  no_twilio_retell_route_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  clean_vapi_number_last4=0389  next_step=jason_captures_and_uploads_the_two_sanitized_phone_screen_recordings_text_and_voice_plus_poster_frames_into_website_then_a_later_build_enables_the_phone_demos_scaffold_and_verifies_the_cards_render"
