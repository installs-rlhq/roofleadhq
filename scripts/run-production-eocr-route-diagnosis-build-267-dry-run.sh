#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

echo "== RoofLeadHQ Build 267 — Production EOCR-404 Route & Deployment Diagnosis (repo-only, read-only) Dry-Run =="
echo "Mode: local-only. Read-only static verifier + Build 266 EOCR-404 verifier + Vapi phone-lead smoke regression."
echo "Repo-only DIAGNOSIS/readiness packet for the terminal End Of Call Report 404 at /webhooks/vapi/call-completed. No call placed. No PSTN retry. No Vapi Test/Talk/browser/webCall. No SMS. No Twilio API/CLI. No Retell API. No live webhook POST/curl. No live runtime probe beyond existing read-only checks. No Railway/backend config change. No deploy/redeploy/restart. No env var change. No schema/auth/RLS change. No production data export. No homeowner/roofer contact. No public/live automation. No secret read or printed. No backend source or config file changed (docs + read-only verifier + wrapper only)."
echo "Inspects repo-only deployment config + backend routing to identify likely mismatch points: no repo deploy descriptor exists (no Dockerfile/Procfile/railway.*/nixpacks/.buildpacks/root package.json) so Railway build/start/root/deployed-commit are DASHBOARD-ONLY and the repo cannot pin what production runs; the build->start chain is internally consistent (build=tsc src->dist, start=node dist/index.js, dist gitignored so prod must compile from source) => no repo bug; the route POST /webhooks/vapi/call-completed IS registered at HEAD (index.ts:23 mounts /webhooks/vapi + vapi-webhooks.ts:9 registers POST /call-completed), unconditionally, in the SAME app/file as /health (index.ts:29). Decisive deduction: production /health returns 200 while the webhook returns 404, which is impossible for a correctly-built current-HEAD index.ts (same file, same app, both unconditional) => production runtime is NOT current HEAD. Decision routing: Path A (repo fix) NOT triggered (no repo bug); Path B RECOMMENDED = separately-approved READ-ONLY Railway deployment inspection (confirm deployed commit vs 9c637ed, build log ran tsc + emitted dist/index.js, start command, service root, domain->service mapping); Path C (narrow redeploy approval) only AFTER Path B confirms a stale runtime. Creates NO deploy approval and NO new-call approval. eocr_404_status=diagnosis_packet_captured; repo_route_registration_status=expected_route_present_at_head; production_runtime_status=unknown_requires_readonly_railway_inspection. Build 267 performs NO runtime action."

echo ""
echo "== Syntax check (node --check) =="
node --check backend/scripts/verify-production-eocr-route-diagnosis-build-267-readonly.js
echo "PASS: Build 267 production-EOCR-route-diagnosis script syntax check succeeded."

echo ""
echo "== Build 267 production EOCR-404 route & deployment diagnosis read-only static verifier (non-mutating; no live HTTP; no call; no config change; no runtime/external action) =="
node backend/scripts/verify-production-eocr-route-diagnosis-build-267-readonly.js

echo ""
echo "== Regression: Build 266 clean-Vapi-PSTN-EOCR-404 evidence + diagnosis read-only verifier =="
node backend/scripts/verify-clean-vapi-pstn-eocr-404-build-266-readonly.js

echo ""
echo "== Regression: existing Vapi phone-lead smoke read-only verifier =="
node backend/scripts/verify-vapi-phone-lead-smoke-readonly.js

echo ""
echo "PASS: Build 267 production EOCR-404 route & deployment diagnosis dry-run passed."
echo "build_mode=production_eocr_route_deployment_diagnosis_repo_only  runtime_action_performed_by_build_267=false  fix_or_config_change_performed_by_build_267=false  backend_source_or_config_touched=false  build_266_prerequisite_commit=9c637ed  build_266_prerequisite_status=validated  eocr_404_status=diagnosis_packet_captured  pstn_to_clean_vapi_status=passed  vapi_eocr_delivery_status=passed_to_expected_path  backend_eocr_response_status=404  repo_route_registration_status=expected_route_present_at_head  expected_route=POST_/webhooks/vapi/call-completed  route_mount_conditional=false_unconditional  health_and_webhook_same_app=true  repo_deploy_config_present=false_dashboard_only  repo_build_start_chain_status=internally_consistent_no_repo_bug  repo_bug_found=false  production_not_current_head_deduction=health_200_plus_webhook_404_same_app_impossible_under_correct_head_build  production_runtime_status=unknown_requires_readonly_railway_inspection  decision_path=B_readonly_railway_inspection  deploy_approval_status=not_requested  retry_call_approval_status=not_requested  next_step=separate_readonly_railway_deployment_inspection_confirm_deployed_commit_build_log_start_root  no_call_placed=true  no_sms_sent=true  no_twilio_config_changed=true  no_retell_config_changed=true  no_backend_deploy=true  live_webhook_called=false  curl_used=false  deploy=false  secret_file_read=false  repo_unchanged=true"
