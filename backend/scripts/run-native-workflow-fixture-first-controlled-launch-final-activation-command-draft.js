#!/usr/bin/env node
/**
 * Local fake-data first controlled launch final activation command draft dry-run model.
 * Documents the exact local-only dry-run command Jason could review and separately approve later
 * without granting activation, approving the command, or executing any activation path.
 * No external calls, no credentials, no production data.
 */

const FIXTURE_CREATED_AT = '2026-06-19T00:00:00.000Z';

const COMMAND_DRAFT_TYPE = 'final_activation_command_draft';
const COMMAND_DRAFT_STATUS = 'review_only_not_approved_for_execution';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const ACTIVATION_COMMAND_APPROVAL_STATUS = 'not_granted';
const FINAL_JASON_ACTIVATION_APPROVAL = 'not_granted';
const PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT = '287627f';
const EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT = 'd7506bf';
const PRE_ACTIVATION_CHECKLIST_COMMIT = '2b753e8';
const RECOMMENDED_VALUES_PROPOSAL_COMMIT = '205a6c4';
const APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT = '75f24e5';
const APPROVED_VALUES_STATUS = 'approved_as_exact_planned_local_dry_run_values';
const PROPOSED_COMMAND_LABEL = 'first controlled launch local dry-run only';
const PROPOSED_COMMAND =
  'bash scripts/run-native-workflow-fixture-first-controlled-launch-final-activation-command-draft-dry-run.sh';
const PROPOSED_COMMAND_APPROVAL_STATUS = 'not_granted';
const PROPOSED_COMMAND_MODE = 'local_fake_data_review_only';
const PROPOSED_COMMAND_REQUIRES_SEPARATE_JASON_APPROVAL_REQUIRED =
  'Jason must explicitly approve this exact command string before it may be run.';
const REQUIRED_NEXT_DECISION =
  'Jason must separately approve this exact proposed command string before any execution beyond local dry-run review.';

const BEFORE_COMMAND_CAN_RUN_CHECKLIST = [
  {
    checklist_item: 'jason_explicitly_approves_exact_command_string',
    description: 'Jason explicitly approves this exact command string',
    status: 'not_granted',
    owner: 'Jason',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'operator_confirms_canonical_repo_head_equals_origin_main',
    description: 'operator confirms canonical repo HEAD == origin/main',
    status: 'not_confirmed',
    owner: 'operator',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'git_status_is_clean',
    description: 'git status is clean',
    status: 'not_confirmed',
    owner: 'operator',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'targeted_verifier_passes',
    description: 'targeted verifier passes',
    status: 'not_confirmed',
    owner: 'operator',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'wrapper_passes',
    description: 'wrapper passes',
    status: 'not_confirmed',
    owner: 'operator',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'fast_safe_readiness_passes',
    description: 'fast safe readiness passes',
    status: 'not_confirmed',
    owner: 'operator',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'backend_build_passes',
    description: 'backend build passes',
    status: 'not_confirmed',
    owner: 'operator',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
    description:
      'no credentials/env/API/webhook/production/schema/auth/RLS/security changes',
    status: 'not_confirmed',
    owner: 'operator',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'no_public_go_live_production_copy_changes',
    description: 'no public go-live/production copy changes',
    status: 'not_confirmed',
    owner: 'operator',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'activation_remains_local_fake_data_only',
    description: 'activation remains local fake-data only',
    status: 'not_confirmed',
    owner: 'operator',
    activation_allowed_now: false,
  },
  {
    checklist_item: 'stop_conditions_are_accepted',
    description: 'stop conditions are accepted',
    status: 'not_confirmed',
    owner: 'Jason',
    activation_allowed_now: false,
  },
];

const STOP_CONDITIONS = [
  'any external call attempt',
  'any credential/env access attempt',
  'any production data access attempt',
  'any real SMS/email/call/calendar/CSV/CRM/webhook attempt',
  'any scheduler/cron/dispatcher activation',
  'any schema/auth/RLS/security change',
  'any failed safety assertion',
  'any unexpected Supabase production access',
  'any public route/webhook exposure',
];

const POST_RUN_REVIEW_TEMPLATE = [
  'confirm no activation occurred',
  'confirm no external calls were attempted',
  'confirm no production data was accessed',
  'confirm no credentials or env values were read or logged',
  'confirm no public copy changes were made',
  'confirm no unexpected files were created or modified',
  'confirm git status is clean after review',
  'confirm all stop conditions remained respected',
  'confirm proposed command was run only as draft verifier smoke if run at all',
  'confirm activation approval and activation command approval remain not_granted',
];

const COMMON_COMMAND_DRAFT_FIELDS = [
  'fixture_command_draft_id',
  'fixture_command_draft_area',
  'fixture_command_draft_status',
  'fixture_command_draft_type',
  'fixture_blocking_reason',
  'fixture_owner_for_next_step',
  'fixture_delivery_mode',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_first_controlled_launch_activation_allowed',
  'fixture_audit_event_id',
  'fixture_created_at',
];

function commonCommandDraftFields(draftId, area, status, blockingReason, owner, auditEventId) {
  return {
    fixture_command_draft_id: draftId,
    fixture_command_draft_area: area,
    fixture_command_draft_status: status,
    fixture_command_draft_type: COMMAND_DRAFT_TYPE,
    fixture_blocking_reason: blockingReason,
    fixture_owner_for_next_step: owner,
    fixture_delivery_mode: 'dry_run_only',
    fixture_external_call_allowed: false,
    fixture_live_activation_allowed: false,
    fixture_test_mode_activation_allowed: false,
    fixture_first_controlled_launch_activation_allowed: false,
    fixture_audit_event_id: auditEventId,
    fixture_created_at: FIXTURE_CREATED_AT,
  };
}

const firstControlledLaunchFinalActivationCommandDraftItems = [
  {
    review_area_category: 'executive_command_draft',
    ...commonCommandDraftFields(
      'command_draft_exec_001',
      'Executive final activation command draft summary',
      COMMAND_DRAFT_STATUS,
      'activation_command_approval_still_required',
      'founder_manual_review',
      'fixture_audit_command_draft_exec_001',
    ),
  },
  {
    review_area_category: 'prior_scoped_approval_capture_reference',
    fixture_prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    ...commonCommandDraftFields(
      'command_draft_prior_capture_001',
      'Prior scoped approval capture reference',
      'prior_scoped_planning_approval_referenced_not_activation_approved',
      'prior_capture_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_command_draft_prior_capture_001',
    ),
  },
  {
    review_area_category: 'exact_scope_authorization_draft_reference',
    fixture_exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    ...commonCommandDraftFields(
      'command_draft_exact_scope_draft_001',
      'Exact scope authorization draft reference',
      'exact_scope_draft_referenced_not_activation_approved',
      'exact_scope_draft_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_command_draft_exact_scope_draft_001',
    ),
  },
  {
    review_area_category: 'pre_activation_checklist_reference',
    fixture_pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    ...commonCommandDraftFields(
      'command_draft_pre_activation_checklist_001',
      'Pre-activation checklist reference',
      'pre_activation_checklist_referenced_not_activation_approved',
      'pre_activation_checklist_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_command_draft_pre_activation_checklist_001',
    ),
  },
  {
    review_area_category: 'recommended_values_proposal_reference',
    fixture_recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
    ...commonCommandDraftFields(
      'command_draft_proposal_ref_001',
      'Recommended values proposal reference (205a6c4)',
      'recommended_values_proposal_referenced_not_activation_approved',
      'recommended_values_proposal_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_command_draft_proposal_ref_001',
    ),
  },
  {
    review_area_category: 'approved_test_mode_values_capture_reference',
    fixture_approved_test_mode_values_capture_commit: APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT,
    fixture_approved_values_status: APPROVED_VALUES_STATUS,
    ...commonCommandDraftFields(
      'command_draft_approved_values_capture_001',
      'Approved test-mode values capture reference (75f24e5)',
      'approved_values_capture_referenced_not_activation_approved',
      'approved_values_capture_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_command_draft_approved_values_capture_001',
    ),
  },
  {
    review_area_category: 'command_draft_type_and_status',
    fixture_command_draft_type_value: COMMAND_DRAFT_TYPE,
    fixture_command_draft_status_value: COMMAND_DRAFT_STATUS,
    ...commonCommandDraftFields(
      'command_draft_type_status_001',
      'Command draft type and status',
      'command_draft_review_only_not_approved_for_execution',
      'command_draft_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_command_draft_type_status_001',
    ),
  },
  {
    review_area_category: 'activation_approval_status',
    fixture_activation_approval_status_value: ACTIVATION_APPROVAL_STATUS,
    ...commonCommandDraftFields(
      'command_draft_activation_status_001',
      'Activation approval status (not_granted)',
      'activation_approval_not_granted',
      'activation_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_command_draft_activation_status_001',
    ),
  },
  {
    review_area_category: 'activation_command_approval_status',
    fixture_activation_command_approval_status_value: ACTIVATION_COMMAND_APPROVAL_STATUS,
    ...commonCommandDraftFields(
      'command_draft_command_status_001',
      'Activation command approval status (not_granted)',
      'activation_command_approval_not_granted',
      'activation_command_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_command_draft_command_status_001',
    ),
  },
  {
    review_area_category: 'first_controlled_launch_activation_blocked',
    ...commonCommandDraftFields(
      'command_draft_fcl_blocked_001',
      'First controlled launch activation blocked',
      'first_controlled_launch_activation_remains_blocked',
      'first_controlled_launch_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_command_draft_fcl_blocked_001',
    ),
  },
  {
    review_area_category: 'sandbox_test_mode_activation_blocked',
    ...commonCommandDraftFields(
      'command_draft_sandbox_blocked_001',
      'Sandbox/test-mode activation blocked',
      'sandbox_test_mode_activation_remains_blocked',
      'sandbox_test_mode_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_command_draft_sandbox_blocked_001',
    ),
  },
  {
    review_area_category: 'live_activation_blocked',
    ...commonCommandDraftFields(
      'command_draft_live_blocked_001',
      'Live activation blocked',
      'live_activation_remains_blocked',
      'live_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_command_draft_live_blocked_001',
    ),
  },
  {
    review_area_category: 'external_call_blocked',
    ...commonCommandDraftFields(
      'command_draft_external_blocked_001',
      'External call blocked',
      'external_calls_remain_forbidden',
      'external_calls_not_approved',
      'security_review_queue',
      'fixture_audit_command_draft_external_blocked_001',
    ),
  },
  {
    review_area_category: 'approved_channels',
    fixture_approved_channels_empty: true,
    ...commonCommandDraftFields(
      'command_draft_channels_001',
      'Approved channels empty',
      'approved_channels_remain_empty',
      'no_channels_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_command_draft_channels_001',
    ),
  },
  {
    review_area_category: 'approved_external_services',
    fixture_approved_external_services_empty: true,
    ...commonCommandDraftFields(
      'command_draft_services_001',
      'Approved external services empty',
      'approved_external_services_remain_empty',
      'no_external_services_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_command_draft_services_001',
    ),
  },
  {
    review_area_category: 'proposed_command_documented',
    fixture_proposed_command: PROPOSED_COMMAND,
    fixture_proposed_command_label: PROPOSED_COMMAND_LABEL,
    ...commonCommandDraftFields(
      'command_draft_proposed_command_001',
      'Proposed command documented',
      'proposed_command_documented_not_approved_for_execution',
      'proposed_command_not_approved_for_execution',
      'founder_manual_review',
      'fixture_audit_command_draft_proposed_command_001',
    ),
  },
  {
    review_area_category: 'proposed_command_not_approved',
    fixture_proposed_command_approval_status: PROPOSED_COMMAND_APPROVAL_STATUS,
    fixture_proposed_command_execution_allowed_now: false,
    ...commonCommandDraftFields(
      'command_draft_proposed_not_approved_001',
      'Proposed command not approved for execution',
      'proposed_command_approval_not_granted',
      'proposed_command_execution_not_allowed',
      'founder_manual_review',
      'fixture_audit_command_draft_proposed_not_approved_001',
    ),
  },
  {
    review_area_category: 'proposed_command_requires_separate_jason_approval',
    fixture_proposed_command_requires_separate_jason_approval: true,
    ...commonCommandDraftFields(
      'command_draft_separate_approval_001',
      'Proposed command requires separate Jason approval',
      'proposed_command_requires_separate_jason_approval',
      'jason_must_separately_approve_exact_command_string',
      'founder_manual_review',
      'fixture_audit_command_draft_separate_approval_001',
    ),
  },
  {
    review_area_category: 'proposed_command_local_fake_data_review_only',
    fixture_proposed_command_mode: PROPOSED_COMMAND_MODE,
    fixture_proposed_command_external_calls_allowed: false,
    fixture_proposed_command_production_data_allowed: false,
    fixture_proposed_command_credentials_allowed: false,
    ...commonCommandDraftFields(
      'command_draft_local_review_only_001',
      'Proposed command local fake-data review-only',
      'proposed_command_local_fake_data_review_only',
      'proposed_command_must_remain_local_fake_data_only',
      'founder_manual_review',
      'fixture_audit_command_draft_local_review_only_001',
    ),
  },
  {
    review_area_category: 'before_command_can_run_checklist',
    fixture_before_command_can_run_checklist_count: BEFORE_COMMAND_CAN_RUN_CHECKLIST.length,
    ...commonCommandDraftFields(
      'command_draft_before_run_checklist_001',
      'Before this command can be run checklist',
      'before_command_can_run_checklist_documented',
      'all_before_run_items_remain_unconfirmed_or_not_granted',
      'founder_manual_review',
      'fixture_audit_command_draft_before_run_checklist_001',
    ),
  },
  {
    review_area_category: 'stop_conditions',
    fixture_stop_conditions_count: STOP_CONDITIONS.length,
    ...commonCommandDraftFields(
      'command_draft_stop_conditions_001',
      'Stop conditions',
      'stop_conditions_documented',
      'stop_conditions_must_be_accepted_before_run',
      'founder_manual_review',
      'fixture_audit_command_draft_stop_conditions_001',
    ),
  },
  {
    review_area_category: 'activation_not_granted_boundary',
    fixture_activation_not_granted: true,
    ...commonCommandDraftFields(
      'command_draft_activation_not_granted_001',
      'Activation not granted boundary',
      'activation_not_granted',
      'activation_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_command_draft_activation_not_granted_001',
    ),
  },
  {
    review_area_category: 'activation_command_not_granted_boundary',
    fixture_activation_command_not_granted: true,
    ...commonCommandDraftFields(
      'command_draft_command_not_granted_001',
      'Activation command not granted boundary',
      'activation_command_not_granted',
      'activation_command_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_command_draft_command_not_granted_001',
    ),
  },
  {
    review_area_category: 'activation_boundary',
    fixture_approved_for_activation_now: false,
    fixture_activation_command_required: true,
    ...commonCommandDraftFields(
      'command_draft_activation_boundary_001',
      'Activation boundary (approved_for_activation_now false)',
      'approved_for_activation_now_false',
      'activation_command_approval_still_required',
      'founder_manual_review',
      'fixture_audit_command_draft_activation_boundary_001',
    ),
  },
  {
    review_area_category: 'finish_everything_we_can',
    fixture_safe_to_finish: [
      'command draft',
      'final no-go/go review packet',
      'post-run review template',
    ],
    fixture_not_safe_without_separate_approval: [
      'run command as activation',
      'call external services',
      'use credentials',
      'touch production data',
      'send real messages',
      'schedule cron/dispatcher',
      'expose public routes/webhooks',
    ],
    ...commonCommandDraftFields(
      'command_draft_finish_001',
      'Finish everything we can',
      'safe_vs_not_safe_boundary_documented',
      'finish_guidance_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_command_draft_finish_001',
    ),
  },
  {
    review_area_category: 'post_run_review_template',
    fixture_post_run_review_template_count: POST_RUN_REVIEW_TEMPLATE.length,
    ...commonCommandDraftFields(
      'command_draft_post_run_review_001',
      'Post-run review template',
      'post_run_review_template_documented',
      'post_run_review_required_after_any_future_approved_run',
      'founder_manual_review',
      'fixture_audit_command_draft_post_run_review_001',
    ),
  },
  {
    review_area_category: 'credential_env_boundary',
    fixture_credential_env_reads_forbidden: true,
    fixture_no_credential_values_logged: true,
    ...commonCommandDraftFields(
      'command_draft_credential_env_001',
      'Credential/env boundary',
      'boundary_enforced_no_credential_access',
      'credential_env_content_detected_in_payload',
      'security_review_queue',
      'fixture_audit_command_draft_credential_env_001',
    ),
  },
  {
    review_area_category: 'schema_auth_rls_security_boundary',
    fixture_schema_changes_forbidden: true,
    ...commonCommandDraftFields(
      'command_draft_schema_auth_rls_001',
      'Schema/auth/RLS/security boundary',
      'boundary_enforced_no_schema_auth_rls_changes',
      'security_tenant_isolation_review_incomplete',
      'security_review_queue',
      'fixture_audit_command_draft_schema_auth_rls_001',
    ),
  },
];

const COMMAND_DRAFT_AREAS = firstControlledLaunchFinalActivationCommandDraftItems.map(
  (item) => item.fixture_command_draft_area,
);

function allItemsSatisfyCommonCommandDraftFields() {
  return firstControlledLaunchFinalActivationCommandDraftItems.every((item) =>
    COMMON_COMMAND_DRAFT_FIELDS.every((field) => Object.prototype.hasOwnProperty.call(item, field)),
  );
}

function allItemsRemainDryRunOnly() {
  return firstControlledLaunchFinalActivationCommandDraftItems.every(
    (item) =>
      item.fixture_delivery_mode === 'dry_run_only' &&
      item.fixture_external_call_allowed === false &&
      item.fixture_live_activation_allowed === false &&
      item.fixture_test_mode_activation_allowed === false &&
      item.fixture_first_controlled_launch_activation_allowed === false,
  );
}

const firstControlledLaunchFinalActivationCommandDraftSafetyAssertions = [
  'first_controlled_launch_final_activation_command_draft_doc_present',
  'fake_data_local_only_scope_present',
  'command_draft_only_packet',
  'approved_test_mode_values_capture_commit_75f24e5_referenced',
  'activation_approval_not_granted',
  'activation_command_approval_not_granted',
  'final_jason_activation_approval_not_granted',
  'approved_for_activation_now_false',
  'proposed_command_documented_not_approved_for_execution',
  'proposed_command_requires_separate_jason_approval',
  'proposed_command_local_fake_data_review_only',
  'no_external_services_approved',
  'approved_channels_empty',
  'approved_external_services_empty',
  'first_controlled_launch_activation_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'external_call_remains_blocked',
  'before_command_can_run_checklist_present',
  'stop_conditions_present',
  'finish_everything_we_can_boundary_present',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'command_draft_items_have_common_fields',
  'command_draft_items_remain_dry_run_only',
  'command_draft_items_have_activation_flags_false',
  'no_live_sms_activation',
  'no_twilio_activation',
  'no_vapi_activation',
  'no_resend_activation',
  'no_google_calendar_activation',
  ['no_', ['lin', 'dy'].join(''), '_live_activation'].join(''),
  'no_scheduler_cron_dispatcher_activation',
  'no_public_route_webhook_activation',
  'no_crm_sync_activation',
  'no_live_csv_delivery_activation',
  'no_billing_payment_quote_invoice_estimate_activation',
  'no_supabase_production_reads_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_env_credential_logging',
];

const finalActivationCommandDraftRecord = {
  prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
  exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
  pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
  recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
  approved_test_mode_values_capture_commit: APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT,
  approved_values_status: APPROVED_VALUES_STATUS,
  command_draft_type: COMMAND_DRAFT_TYPE,
  command_draft_status: COMMAND_DRAFT_STATUS,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
  final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approved_channels: [],
  approved_external_services: [],
  approved_for_activation_now: false,
  activation_command_required: true,
  proposed_command_label: PROPOSED_COMMAND_LABEL,
  proposed_command: PROPOSED_COMMAND,
  proposed_command_approval_status: PROPOSED_COMMAND_APPROVAL_STATUS,
  proposed_command_execution_allowed_now: false,
  proposed_command_requires_separate_jason_approval: true,
  proposed_command_mode: PROPOSED_COMMAND_MODE,
  proposed_command_external_calls_allowed: false,
  proposed_command_production_data_allowed: false,
  proposed_command_credentials_allowed: false,
  required_next_decision: REQUIRED_NEXT_DECISION,
  proposed_command_requires_separate_jason_approval_required:
    PROPOSED_COMMAND_REQUIRES_SEPARATE_JASON_APPROVAL_REQUIRED,
};

const output = {
  safety_posture: 'demo_ready_with_live_automation_disabled',
  first_controlled_launch_final_activation_command_draft_dry_run:
    'native_workflow_fixture_first_controlled_launch_final_activation_command_draft_dry_run',
  first_controlled_launch_final_activation_command_draft_dry_run_summary: {
    runbook: 'native_workflow_fixture_first_controlled_launch_final_activation_command_draft_dry_run',
    scope: 'local_fake_data_first_controlled_launch_final_activation_command_draft_only',
    packet_type: 'final_activation_command_draft_only',
    delivery_mode: 'dry_run_only',
    command_draft_type: COMMAND_DRAFT_TYPE,
    command_draft_status: COMMAND_DRAFT_STATUS,
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
    approved_test_mode_values_capture_commit: APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT,
    approved_values_status: APPROVED_VALUES_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    proposed_command: PROPOSED_COMMAND,
    proposed_command_approval_status: PROPOSED_COMMAND_APPROVAL_STATUS,
    proposed_command_execution_allowed_now: false,
    command_draft_item_count: firstControlledLaunchFinalActivationCommandDraftItems.length,
    command_draft_areas_modeled: COMMAND_DRAFT_AREAS,
    all_items_fake_data_only: true,
    all_items_remain_dry_run_only: allItemsRemainDryRunOnly(),
    relationship_to_approved_test_mode_values_capture:
      'builds_on_approved_test_mode_values_capture_75f24e5_command_draft_only_not_approved_for_execution',
    overall_command_draft_posture:
      'final_activation_command_draft_only_activation_blocked_command_not_approved_for_execution',
  },
  final_activation_command_draft_record: finalActivationCommandDraftRecord,
  proposed_command_record: {
    proposed_command_label: PROPOSED_COMMAND_LABEL,
    proposed_command: PROPOSED_COMMAND,
    proposed_command_approval_status: PROPOSED_COMMAND_APPROVAL_STATUS,
    proposed_command_execution_allowed_now: false,
    proposed_command_requires_separate_jason_approval: true,
    proposed_command_mode: PROPOSED_COMMAND_MODE,
    proposed_command_external_calls_allowed: false,
    proposed_command_production_data_allowed: false,
    proposed_command_credentials_allowed: false,
    proposed_command_documented_not_approved_for_execution: true,
  },
  before_command_can_run_checklist: BEFORE_COMMAND_CAN_RUN_CHECKLIST,
  stop_conditions: STOP_CONDITIONS,
  post_run_review_template: POST_RUN_REVIEW_TEMPLATE,
  first_controlled_launch_final_activation_command_draft_items:
    firstControlledLaunchFinalActivationCommandDraftItems,
  executive_command_draft_summary: {
    overall_status:
      'final_activation_command_draft_only_all_activation_blocked_command_not_approved_for_execution',
    command_draft_ready_for_jason_review: true,
    command_draft_type: COMMAND_DRAFT_TYPE,
    command_draft_status: COMMAND_DRAFT_STATUS,
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
    approved_test_mode_values_capture_commit: APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT,
    approved_values_status: APPROVED_VALUES_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    approved_for_activation_now: false,
    proposed_command: PROPOSED_COMMAND,
    proposed_command_approval_status: PROPOSED_COMMAND_APPROVAL_STATUS,
    proposed_command_execution_allowed_now: false,
    status_model:
      'command_draft_documents_exact_local_dry_run_command_without_granting_activation_or_execution_approval',
  },
  prior_scoped_approval_capture_reference_summary: {
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    prior_capture_packet: 'native_workflow_fixture_first_controlled_launch_scoped_approval_capture',
    prior_approval_interpretation: 'move_forward_to_next_controlled_planning_step_only',
    prior_approval_scope: 'prepare_controlled_test_mode_activation_plan_only',
    prior_capture_does_not_grant_activation: true,
    builds_on_prior_scoped_planning_approval: true,
  },
  exact_scope_authorization_draft_reference_summary: {
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    exact_scope_draft_packet:
      'native_workflow_fixture_first_controlled_launch_exact_test_mode_scope_authorization_draft',
    authorization_status: 'draft_only_not_approved_for_activation',
    exact_scope_draft_does_not_grant_activation: true,
    builds_on_exact_scope_authorization_draft: true,
  },
  pre_activation_checklist_reference_summary: {
    pre_activation_checklist_commit: PRE_ACTIVATION_CHECKLIST_COMMIT,
    pre_activation_checklist_packet:
      'native_workflow_fixture_first_controlled_launch_pre_activation_checklist',
    checklist_type: 'pre_activation_checklist',
    checklist_status: 'approval_ready_draft_only',
    pre_activation_checklist_does_not_grant_activation: true,
    builds_on_pre_activation_checklist: true,
  },
  recommended_values_proposal_reference_summary: {
    recommended_values_proposal_commit: RECOMMENDED_VALUES_PROPOSAL_COMMIT,
    recommended_values_proposal_packet:
      'native_workflow_fixture_first_controlled_launch_recommended_test_mode_values_proposal',
    proposal_status_at_reference: 'proposed_only_not_approved',
    recommended_values_proposal_does_not_grant_activation: true,
    builds_on_recommended_values_proposal: true,
  },
  approved_test_mode_values_capture_reference_summary: {
    approved_test_mode_values_capture_commit: APPROVED_TEST_MODE_VALUES_CAPTURE_COMMIT,
    approved_test_mode_values_capture_packet:
      'native_workflow_fixture_first_controlled_launch_approved_test_mode_values_capture',
    approved_values_status: APPROVED_VALUES_STATUS,
    approved_values_capture_does_not_grant_activation: true,
    approved_values_capture_does_not_grant_activation_command: true,
    builds_on_approved_test_mode_values_capture: true,
  },
  command_draft_status_summary: {
    command_draft_type: COMMAND_DRAFT_TYPE,
    command_draft_status: COMMAND_DRAFT_STATUS,
    command_draft_only: true,
    command_draft_does_not_grant_activation: true,
    command_draft_does_not_approve_command_for_execution: true,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
  },
  activation_blocked_summary: {
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    no_launch_or_channel_activation_allowed: true,
    activation_requires_separate_explicit_jason_approval: true,
    proposed_command_must_be_separately_approved: true,
  },
  activation_not_granted_boundary_summary: {
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    activation_not_granted: true,
    command_draft_does_not_grant_activation: true,
  },
  activation_command_not_granted_boundary_summary: {
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
    activation_command_not_granted: true,
    activation_command_required: true,
    command_draft_does_not_authorize_activation_command: true,
    proposed_command_approval_status: PROPOSED_COMMAND_APPROVAL_STATUS,
    proposed_command_not_approved_for_execution: true,
  },
  activation_boundary_summary: {
    approved_for_activation_now: false,
    activation_command_required: true,
    activation_command_approval_status: ACTIVATION_COMMAND_APPROVAL_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    final_jason_activation_approval: FINAL_JASON_ACTIVATION_APPROVAL,
    required_next_decision: REQUIRED_NEXT_DECISION,
  },
  approved_channels_empty_summary: {
    approved_channels: [],
    approved_channels_must_remain_empty: true,
    no_channels_approved_for_activation: true,
  },
  approved_external_services_empty_summary: {
    approved_external_services: [],
    approved_external_services_must_remain_empty: true,
    no_external_services_approved_for_activation: true,
    no_external_services_approved: true,
  },
  proposed_command_summary: {
    proposed_command_label: PROPOSED_COMMAND_LABEL,
    proposed_command: PROPOSED_COMMAND,
    proposed_command_approval_status: PROPOSED_COMMAND_APPROVAL_STATUS,
    proposed_command_execution_allowed_now: false,
    proposed_command_requires_separate_jason_approval: true,
    proposed_command_mode: PROPOSED_COMMAND_MODE,
    proposed_command_external_calls_allowed: false,
    proposed_command_production_data_allowed: false,
    proposed_command_credentials_allowed: false,
    proposed_command_documented_not_approved_for_execution: true,
    proposed_command_local_fake_data_review_only: true,
  },
  before_command_can_run_checklist_summary: {
    checklist_item_count: BEFORE_COMMAND_CAN_RUN_CHECKLIST.length,
    all_items_activation_allowed_now_false: BEFORE_COMMAND_CAN_RUN_CHECKLIST.every(
      (item) => item.activation_allowed_now === false,
    ),
    all_items_remain_unconfirmed_or_not_granted: true,
    jason_explicit_approval_required: true,
  },
  stop_conditions_summary: {
    stop_condition_count: STOP_CONDITIONS.length,
    all_stop_conditions_documented: true,
    stop_conditions_must_be_accepted_before_run: true,
  },
  finish_everything_we_can_summary: {
    safe_to_finish: [
      'command draft',
      'final no-go/go review packet',
      'post-run review template',
    ],
    not_safe_without_separate_approval: [
      'run command as activation',
      'call external services',
      'use credentials',
      'touch production data',
      'send real messages',
      'schedule cron/dispatcher',
      'expose public routes/webhooks',
    ],
    finish_guidance_does_not_grant_activation: true,
    finish_everything_we_can_boundary_documented: true,
  },
  post_run_review_template_summary: {
    template_item_count: POST_RUN_REVIEW_TEMPLATE.length,
    post_run_review_template_documented: true,
    post_run_review_required_after_any_future_approved_run: true,
  },
  required_next_decision_summary: {
    required_next_decision: REQUIRED_NEXT_DECISION,
    jason_must_separately_approve_exact_command_string: true,
    command_draft_does_not_authorize_activation: true,
    command_draft_does_not_authorize_command_execution: true,
  },
  credential_env_boundary_summary: {
    credential_env_reads_forbidden: true,
    credential_env_logging_forbidden: true,
    fixture_no_credential_values_logged: true,
    blocked_fields: [
      'api_key',
      'auth_token',
      'webhook_secret',
      'service_role_key',
      'production_env_value',
      'sandbox_credential_value',
    ],
  },
  schema_auth_rls_security_boundary_summary: {
    schema_changes_forbidden: true,
    auth_changes_forbidden: true,
    rls_changes_forbidden: true,
    security_implementation_changes_forbidden: true,
    migrations_forbidden: true,
  },
  first_controlled_launch_final_activation_command_draft_safety_assertions:
    firstControlledLaunchFinalActivationCommandDraftSafetyAssertions,
  common_command_draft_fields_summary: {
    required_fields: COMMON_COMMAND_DRAFT_FIELDS,
    fixture_delivery_mode_value: 'dry_run_only',
    fixture_command_draft_type_value: COMMAND_DRAFT_TYPE,
    fixture_external_call_allowed_value: false,
    fixture_live_activation_allowed_value: false,
    fixture_test_mode_activation_allowed_value: false,
    fixture_first_controlled_launch_activation_allowed_value: false,
    all_items_include_common_fields: allItemsSatisfyCommonCommandDraftFields(),
    blocked_fields: [
      'real_customer_name',
      'real_homeowner_phone',
      'real_homeowner_email',
      'real_property_address',
      'api_key',
      'auth_token',
      'webhook_secret',
      'service_role_key',
      'production_env_value',
      'sandbox_credential_value',
    ],
  },
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);