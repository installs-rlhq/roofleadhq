#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 287 — First Pilot Roofer Sales Package (repo-only drafts) Dry-Run =="
echo "Mode: local-only, docs-only. Prepares the first real pilot roofer outreach + onboarding + sales-readiness package as REPO-ONLY drafts on top of the Build 286 first-roofer end-to-end live pass. This is a BUSINESS readiness build, not another live technical test."
echo "This build makes NO code/env/config/schema/provider change, NO Vapi/Twilio/Retell change, NO phone-number change, NO call, NO SMS, NO email send, NO real roofer/homeowner contact, NO deploy, NO production data export, NO secret read. The local secret file /tmp/roofleadhq-vapi-webhook-secret-build237 was not read. It neither creates nor consumes any live-call approval. Every outward action is a draft gated behind a separate explicit approval. Clean Vapi number masked as last-4 0389."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-build-287-first-pilot-sales-package-readonly.js
echo "PASS: Build 287 first-pilot-sales-package verifier syntax check succeeded."

echo ""
echo "== Build 287 first-pilot-sales-package read-only verifier (docs grounding; guardrails; no PII/secret; non-mutating) =="
node backend/scripts/verify-build-287-first-pilot-sales-package-readonly.js

echo ""
echo "== Regression: Build 286 first-roofer-e2e live-pass verifier (mapped roofer + lead + call + BOOKING persisted; fallback books live shape; structured precedence preserved) =="
node backend/scripts/verify-build-285-first-roofer-e2e-live-pass-build-286-readonly.js

echo ""
echo "PASS: Build 287 first-pilot-sales-package dry-run passed."
echo "build_mode=first_pilot_sales_package_repo_only  build_287_status=completed  build_286_redone=false  first_roofer_e2e_status=passed  pilot_sales_package_status=created  outreach_drafts_status=created_repo_only_not_sent  onboarding_intake_bundle_status=created  pilot_scope_guardrails_status=created  sales_readiness_checklist_status=created  real_roofer_contact_status=not_performed  real_homeowner_contact_status=not_performed  no_call_placed=true  no_sms_sent=true  no_email_sent=true  no_provider_config_changed=true  no_phone_number_changed=true  no_twilio_retell_route_changed=true  no_backend_deploy=true  no_schema_auth_rls_changed=true  no_production_data_export=true  no_secret_printing=true  clean_vapi_number_last4=0389  next_step=jason_reviews_package_then_separate_approval_to_send_one_jason_operated_outreach_message_to_one_real_roofer_using_the_clean_vapi_managed_number_path_without_changing_the_existing_twilio_retell_number"
