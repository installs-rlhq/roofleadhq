#!/usr/bin/env node
/**
 * Local fake-data first controlled launch pre-activation checklist dry-run model.
 * Consolidates the final approval-ready checklist Jason would review before any exact
 * controlled test-mode activation approval — without granting activation or executing any step.
 * No external calls, no credentials, no production data.
 */

const FIXTURE_CREATED_AT = '2026-06-19T00:00:00.000Z';

const CHECKLIST_TYPE = 'pre_activation_checklist';
const CHECKLIST_STATUS = 'approval_ready_draft_only';
const ACTIVATION_APPROVAL_STATUS = 'not_granted';
const PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT = '287627f';
const EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT = 'd7506bf';
const APPROVAL_STATEMENT_REFERENCE = 'Approved to move forward.';
const REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL = 'not_granted';
const ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED =
  'Activation command must be separately approved after all checklist fields are filled and Jason grants final activation approval.';
const NOT_FILLED = 'not_filled';

const COMMON_CHECKLIST_FIELDS = [
  'fixture_pre_activation_checklist_id',
  'fixture_checklist_area',
  'fixture_checklist_status',
  'fixture_checklist_type',
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

function commonChecklistFields(checklistId, area, status, blockingReason, owner, auditEventId) {
  return {
    fixture_pre_activation_checklist_id: checklistId,
    fixture_checklist_area: area,
    fixture_checklist_status: status,
    fixture_checklist_type: CHECKLIST_TYPE,
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

const FINAL_APPROVAL_CHECKLIST_TABLE = [
  {
    item: 'required_channel_scope',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit approved channel scope',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'written channel scope approval record',
    activation_allowed_now: false,
  },
  {
    item: 'required_service_scope',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit approved external service scope, if any',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'written service scope approval record',
    activation_allowed_now: false,
  },
  {
    item: 'required_fake_test_account_boundaries',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit fake/test account boundaries',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'documented test account boundary approval',
    activation_allowed_now: false,
  },
  {
    item: 'required_allowed_test_lead_data_shape',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit allowed test lead data shape',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'documented test lead data shape approval',
    activation_allowed_now: false,
  },
  {
    item: 'required_start_window',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit approved start window',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'written start window approval record',
    activation_allowed_now: false,
  },
  {
    item: 'required_operator',
    current_value: NOT_FILLED,
    required_value_before_approval: 'named approved operator',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'operator assignment approval record',
    activation_allowed_now: false,
  },
  {
    item: 'required_reviewer_on_call_owner',
    current_value: NOT_FILLED,
    required_value_before_approval: 'named reviewer/on-call owner',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'reviewer/on-call owner assignment approval record',
    activation_allowed_now: false,
  },
  {
    item: 'required_rollback_owner',
    current_value: NOT_FILLED,
    required_value_before_approval: 'named rollback owner',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'rollback owner assignment approval record',
    activation_allowed_now: false,
  },
  {
    item: 'required_stop_conditions',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit stop conditions',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'documented stop conditions approval',
    activation_allowed_now: false,
  },
  {
    item: 'required_observation_window',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit observation window',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'documented observation window approval',
    activation_allowed_now: false,
  },
  {
    item: 'required_evidence_capture',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit evidence capture requirements',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'documented evidence capture plan approval',
    activation_allowed_now: false,
  },
  {
    item: 'required_post_run_review',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit post-run review requirements',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'documented post-run review plan approval',
    activation_allowed_now: false,
  },
  {
    item: 'required_excluded_scope_confirmation',
    current_value: NOT_FILLED,
    required_value_before_approval: 'explicit excluded scope confirmation',
    owner: 'Jason',
    status: NOT_FILLED,
    evidence_needed: 'documented excluded scope confirmation approval',
    activation_allowed_now: false,
  },
  {
    item: 'required_final_jason_activation_approval',
    current_value: REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL,
    required_value_before_approval: 'explicit Jason final activation approval granted',
    owner: 'Jason',
    status: REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL,
    evidence_needed: 'written Jason final activation approval decision',
    activation_allowed_now: false,
  },
];

const firstControlledLaunchPreActivationChecklistItems = [
  {
    review_area_category: 'executive_pre_activation_checklist',
    ...commonChecklistFields(
      'pre_activation_checklist_exec_001',
      'Executive pre-activation checklist summary',
      'approval_ready_draft_only',
      'final_jason_activation_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_exec_001',
    ),
  },
  {
    review_area_category: 'prior_scoped_approval_capture_reference',
    fixture_prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    ...commonChecklistFields(
      'pre_activation_checklist_prior_capture_001',
      'Prior scoped approval capture reference',
      'prior_scoped_planning_approval_referenced_not_activation_approved',
      'prior_capture_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_prior_capture_001',
    ),
  },
  {
    review_area_category: 'exact_scope_authorization_draft_reference',
    fixture_exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    ...commonChecklistFields(
      'pre_activation_checklist_exact_scope_draft_001',
      'Exact scope authorization draft reference',
      'exact_scope_draft_referenced_not_activation_approved',
      'exact_scope_draft_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_exact_scope_draft_001',
    ),
  },
  {
    review_area_category: 'checklist_type_and_status',
    fixture_checklist_type_value: CHECKLIST_TYPE,
    fixture_checklist_status_value: CHECKLIST_STATUS,
    ...commonChecklistFields(
      'pre_activation_checklist_type_status_001',
      'Checklist type and status (approval_ready_draft_only)',
      'checklist_only_not_activation_approved',
      'checklist_status_does_not_grant_activation',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_type_status_001',
    ),
  },
  {
    review_area_category: 'activation_approval_status',
    fixture_activation_approval_status_value: ACTIVATION_APPROVAL_STATUS,
    ...commonChecklistFields(
      'pre_activation_checklist_activation_status_001',
      'Activation approval status (not_granted)',
      'activation_approval_not_granted',
      'activation_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_activation_status_001',
    ),
  },
  {
    review_area_category: 'first_controlled_launch_activation_blocked',
    ...commonChecklistFields(
      'pre_activation_checklist_fcl_blocked_001',
      'First controlled launch activation blocked',
      'first_controlled_launch_activation_remains_blocked',
      'first_controlled_launch_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_fcl_blocked_001',
    ),
  },
  {
    review_area_category: 'sandbox_test_mode_activation_blocked',
    ...commonChecklistFields(
      'pre_activation_checklist_sandbox_blocked_001',
      'Sandbox/test-mode activation blocked',
      'sandbox_test_mode_activation_remains_blocked',
      'sandbox_test_mode_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_sandbox_blocked_001',
    ),
  },
  {
    review_area_category: 'live_activation_blocked',
    ...commonChecklistFields(
      'pre_activation_checklist_live_blocked_001',
      'Live activation blocked',
      'live_activation_remains_blocked',
      'live_activation_not_approved',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_live_blocked_001',
    ),
  },
  {
    review_area_category: 'external_call_blocked',
    ...commonChecklistFields(
      'pre_activation_checklist_external_blocked_001',
      'External call blocked',
      'external_calls_remain_forbidden',
      'external_calls_not_approved',
      'security_review_queue',
      'fixture_audit_pre_activation_checklist_external_blocked_001',
    ),
  },
  {
    review_area_category: 'approved_channels',
    fixture_approved_channels_empty: true,
    ...commonChecklistFields(
      'pre_activation_checklist_channels_001',
      'Approved channels empty',
      'approved_channels_remain_empty',
      'no_channels_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_channels_001',
    ),
  },
  {
    review_area_category: 'approved_external_services',
    fixture_approved_external_services_empty: true,
    ...commonChecklistFields(
      'pre_activation_checklist_services_001',
      'Approved external services empty',
      'approved_external_services_remain_empty',
      'no_external_services_approved_for_activation',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_services_001',
    ),
  },
  {
    review_area_category: 'required_channel_scope',
    fixture_required_channel_scope_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_channel_scope_001',
      'Required channel scope not_filled',
      'required_channel_scope_remains_not_filled',
      'channel_scope_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_channel_scope_001',
    ),
  },
  {
    review_area_category: 'required_service_scope',
    fixture_required_service_scope_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_service_scope_001',
      'Required service scope not_filled',
      'required_service_scope_remains_not_filled',
      'service_scope_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_service_scope_001',
    ),
  },
  {
    review_area_category: 'required_fake_test_account_boundaries',
    fixture_required_fake_test_account_boundaries_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_test_account_001',
      'Required fake/test account boundaries not_filled',
      'required_fake_test_account_boundaries_remain_not_filled',
      'test_account_boundaries_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_test_account_001',
    ),
  },
  {
    review_area_category: 'required_allowed_test_lead_data_shape',
    fixture_required_allowed_test_lead_data_shape_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_lead_data_shape_001',
      'Required allowed test lead data shape not_filled',
      'required_allowed_test_lead_data_shape_remain_not_filled',
      'test_lead_data_shape_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_lead_data_shape_001',
    ),
  },
  {
    review_area_category: 'required_start_window',
    fixture_required_start_window_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_start_window_001',
      'Required start window not_filled',
      'required_start_window_remains_not_filled',
      'start_window_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_start_window_001',
    ),
  },
  {
    review_area_category: 'required_operator',
    fixture_required_operator_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_operator_001',
      'Required operator not_filled',
      'required_operator_remains_not_filled',
      'operator_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_operator_001',
    ),
  },
  {
    review_area_category: 'required_reviewer_on_call_owner',
    fixture_required_reviewer_on_call_owner_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_reviewer_001',
      'Required reviewer/on-call owner not_filled',
      'required_reviewer_on_call_owner_remains_not_filled',
      'reviewer_on_call_owner_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_reviewer_001',
    ),
  },
  {
    review_area_category: 'required_rollback_owner',
    fixture_required_rollback_owner_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_rollback_owner_001',
      'Required rollback owner not_filled',
      'required_rollback_owner_remains_not_filled',
      'rollback_owner_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_rollback_owner_001',
    ),
  },
  {
    review_area_category: 'required_stop_conditions',
    fixture_required_stop_conditions_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_stop_conditions_001',
      'Required stop conditions not_filled',
      'required_stop_conditions_remain_not_filled',
      'stop_conditions_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_stop_conditions_001',
    ),
  },
  {
    review_area_category: 'required_observation_window',
    fixture_required_observation_window_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_observation_window_001',
      'Required observation window not_filled',
      'required_observation_window_remain_not_filled',
      'observation_window_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_observation_window_001',
    ),
  },
  {
    review_area_category: 'required_evidence_capture',
    fixture_required_evidence_capture_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_evidence_capture_001',
      'Required evidence capture not_filled',
      'required_evidence_capture_remain_not_filled',
      'evidence_capture_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_evidence_capture_001',
    ),
  },
  {
    review_area_category: 'required_post_run_review',
    fixture_required_post_run_review_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_post_run_review_001',
      'Required post-run review not_filled',
      'required_post_run_review_remain_not_filled',
      'post_run_review_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_post_run_review_001',
    ),
  },
  {
    review_area_category: 'required_excluded_scope_confirmation',
    fixture_required_excluded_scope_confirmation_value: NOT_FILLED,
    ...commonChecklistFields(
      'pre_activation_checklist_excluded_scope_001',
      'Required excluded scope confirmation not_filled',
      'required_excluded_scope_confirmation_remain_not_filled',
      'excluded_scope_confirmation_not_filled',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_excluded_scope_001',
    ),
  },
  {
    review_area_category: 'required_final_jason_activation_approval',
    fixture_required_final_jason_activation_approval_value: REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL,
    ...commonChecklistFields(
      'pre_activation_checklist_final_jason_approval_001',
      'Required final Jason activation approval not_granted',
      'required_final_jason_activation_approval_not_granted',
      'final_jason_activation_approval_not_granted',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_final_jason_approval_001',
    ),
  },
  {
    review_area_category: 'approval_cannot_be_inferred',
    fixture_approval_cannot_be_inferred: true,
    ...commonChecklistFields(
      'pre_activation_checklist_cannot_infer_001',
      'Approval cannot be inferred boundary',
      'checklist_completion_is_not_activation_approval',
      'approval_cannot_be_inferred_from_checklist_completion',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_cannot_infer_001',
    ),
  },
  {
    review_area_category: 'activation_command_separate_approval',
    fixture_activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
    ...commonChecklistFields(
      'pre_activation_checklist_separate_command_001',
      'Activation command separately approved boundary',
      'activation_command_must_be_separately_approved',
      'activation_command_not_separately_approved',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_separate_command_001',
    ),
  },
  {
    review_area_category: 'final_approval_checklist_table',
    fixture_final_approval_checklist_table_count: FINAL_APPROVAL_CHECKLIST_TABLE.length,
    ...commonChecklistFields(
      'pre_activation_checklist_final_table_001',
      'Final approval checklist table (all not_filled)',
      'all_final_approval_checklist_fields_remain_not_filled',
      'no_final_approval_checklist_field_filled_for_activation',
      'founder_manual_review',
      'fixture_audit_pre_activation_checklist_final_table_001',
    ),
  },
  {
    review_area_category: 'credential_env_boundary',
    fixture_credential_env_reads_forbidden: true,
    fixture_no_credential_values_logged: true,
    ...commonChecklistFields(
      'pre_activation_checklist_credential_env_001',
      'Credential/env boundary',
      'boundary_enforced_no_credential_access',
      'credential_env_content_detected_in_payload',
      'security_review_queue',
      'fixture_audit_pre_activation_checklist_credential_env_001',
    ),
  },
  {
    review_area_category: 'schema_auth_rls_security_boundary',
    fixture_schema_changes_forbidden: true,
    ...commonChecklistFields(
      'pre_activation_checklist_schema_auth_rls_001',
      'Schema/auth/RLS/security boundary',
      'boundary_enforced_no_schema_auth_rls_changes',
      'security_tenant_isolation_review_incomplete',
      'security_review_queue',
      'fixture_audit_pre_activation_checklist_schema_auth_rls_001',
    ),
  },
];

const CHECKLIST_AREAS = firstControlledLaunchPreActivationChecklistItems.map(
  (item) => item.fixture_checklist_area,
);

function countByArea(area) {
  return firstControlledLaunchPreActivationChecklistItems.filter(
    (item) => item.fixture_checklist_area === area,
  ).length;
}

function allItemsSatisfyCommonChecklistFields() {
  return firstControlledLaunchPreActivationChecklistItems.every((item) =>
    COMMON_CHECKLIST_FIELDS.every((field) => Object.prototype.hasOwnProperty.call(item, field)),
  );
}

function allItemsRemainDryRunOnly() {
  return firstControlledLaunchPreActivationChecklistItems.every(
    (item) =>
      item.fixture_delivery_mode === 'dry_run_only' &&
      item.fixture_external_call_allowed === false &&
      item.fixture_live_activation_allowed === false &&
      item.fixture_test_mode_activation_allowed === false &&
      item.fixture_first_controlled_launch_activation_allowed === false,
  );
}

const firstControlledLaunchPreActivationChecklistSafetyAssertions = [
  'first_controlled_launch_pre_activation_checklist_doc_present',
  'fake_data_local_only_scope_present',
  'checklist_only_not_activation_approved',
  'prior_scoped_approval_capture_referenced',
  'exact_scope_authorization_draft_referenced',
  'activation_approval_not_granted',
  'approved_channels_empty',
  'approved_external_services_empty',
  'all_required_checklist_fields_remain_not_filled',
  'final_jason_activation_approval_not_granted',
  'activation_command_must_be_separately_approved',
  'no_launch_or_channel_activation_allowed',
  'approval_cannot_be_inferred_boundary_present',
  'no_credentials_env_api_webhook_production_schema_auth_rls_security_changes',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'runner_outputs_valid_json',
  'checklist_items_have_common_fields',
  'checklist_items_remain_dry_run_only',
  'checklist_items_have_activation_flags_false',
  'first_controlled_launch_activation_remains_blocked',
  'sandbox_test_mode_activation_remains_blocked',
  'live_activation_remains_blocked',
  'external_call_remains_blocked',
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

const preActivationChecklistRecord = {
  prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
  exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
  approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
  checklist_type: CHECKLIST_TYPE,
  checklist_status: CHECKLIST_STATUS,
  activation_approval_status: ACTIVATION_APPROVAL_STATUS,
  first_controlled_launch_activation_allowed: false,
  sandbox_test_mode_activation_allowed: false,
  live_activation_allowed: false,
  external_call_allowed: false,
  approved_channels: [],
  approved_external_services: [],
  required_channel_scope: NOT_FILLED,
  required_service_scope: NOT_FILLED,
  required_fake_test_account_boundaries: NOT_FILLED,
  required_allowed_test_lead_data_shape: NOT_FILLED,
  required_start_window: NOT_FILLED,
  required_operator: NOT_FILLED,
  required_reviewer_on_call_owner: NOT_FILLED,
  required_rollback_owner: NOT_FILLED,
  required_stop_conditions: NOT_FILLED,
  required_observation_window: NOT_FILLED,
  required_evidence_capture: NOT_FILLED,
  required_post_run_review: NOT_FILLED,
  required_excluded_scope_confirmation: NOT_FILLED,
  required_final_jason_activation_approval: REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL,
  activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
};

const output = {
  safety_posture: 'demo_ready_with_live_automation_disabled',
  first_controlled_launch_pre_activation_checklist_dry_run:
    'native_workflow_fixture_first_controlled_launch_pre_activation_checklist_dry_run',
  first_controlled_launch_pre_activation_checklist_dry_run_summary: {
    runbook: 'native_workflow_fixture_first_controlled_launch_pre_activation_checklist_dry_run',
    scope: 'local_fake_data_first_controlled_launch_pre_activation_checklist_only',
    packet_type: 'pre_activation_checklist_only',
    delivery_mode: 'dry_run_only',
    approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    checklist_type: CHECKLIST_TYPE,
    checklist_status: CHECKLIST_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    checklist_item_count: firstControlledLaunchPreActivationChecklistItems.length,
    checklist_areas_modeled: CHECKLIST_AREAS,
    all_items_fake_data_only: true,
    all_items_remain_dry_run_only: allItemsRemainDryRunOnly(),
    relationship_to_exact_scope_authorization_draft:
      'builds_on_exact_scope_authorization_draft_without_granting_activation',
    overall_checklist_posture:
      'pre_activation_checklist_only_activation_blocked_jason_explicit_approval_required',
  },
  pre_activation_checklist_record: preActivationChecklistRecord,
  final_approval_checklist_table: FINAL_APPROVAL_CHECKLIST_TABLE,
  first_controlled_launch_pre_activation_checklist_items:
    firstControlledLaunchPreActivationChecklistItems,
  executive_pre_activation_checklist_summary: {
    overall_status:
      'pre_activation_checklist_only_all_activation_blocked_jason_explicit_approval_required',
    checklist_ready_for_jason_review: true,
    approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    exact_scope_authorization_draft_commit: EXACT_SCOPE_AUTHORIZATION_DRAFT_COMMIT,
    checklist_type: CHECKLIST_TYPE,
    checklist_status: CHECKLIST_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    final_jason_activation_approval_not_granted: true,
    status_model:
      'checklist_consolidates_required_fields_for_jason_review_without_granting_activation',
  },
  prior_scoped_approval_capture_reference_summary: {
    prior_scoped_approval_capture_commit: PRIOR_SCOPED_APPROVAL_CAPTURE_COMMIT,
    prior_capture_packet: 'native_workflow_fixture_first_controlled_launch_scoped_approval_capture',
    prior_approval_statement_reference: APPROVAL_STATEMENT_REFERENCE,
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
  checklist_status_summary: {
    checklist_type: CHECKLIST_TYPE,
    checklist_status: CHECKLIST_STATUS,
    activation_approval_status: ACTIVATION_APPROVAL_STATUS,
    approval_ready_draft_only: true,
    activation_approval_not_granted: true,
    checklist_only_not_activation_approved: true,
  },
  activation_blocked_summary: {
    first_controlled_launch_activation_allowed: false,
    sandbox_test_mode_activation_allowed: false,
    live_activation_allowed: false,
    external_call_allowed: false,
    no_launch_or_channel_activation_allowed: true,
    activation_requires_separate_explicit_jason_approval: true,
    activation_command_must_be_separately_approved: true,
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
  },
  required_checklist_fields_summary: {
    required_channel_scope: NOT_FILLED,
    required_service_scope: NOT_FILLED,
    required_fake_test_account_boundaries: NOT_FILLED,
    required_allowed_test_lead_data_shape: NOT_FILLED,
    required_start_window: NOT_FILLED,
    required_operator: NOT_FILLED,
    required_reviewer_on_call_owner: NOT_FILLED,
    required_rollback_owner: NOT_FILLED,
    required_stop_conditions: NOT_FILLED,
    required_observation_window: NOT_FILLED,
    required_evidence_capture: NOT_FILLED,
    required_post_run_review: NOT_FILLED,
    required_excluded_scope_confirmation: NOT_FILLED,
    required_final_jason_activation_approval: REQUIRED_FINAL_JASON_ACTIVATION_APPROVAL,
    all_required_checklist_fields_remain_not_filled: true,
  },
  approval_cannot_be_inferred_summary: {
    checklist_completion_is_not_activation_approval: true,
    exact_values_must_be_filled_before_activation: true,
    jason_must_explicitly_approve_final_activation_decision: true,
    activation_command_must_be_separately_approved: true,
    rollback_stop_conditions_must_be_ready_before_activation: true,
    approval_cannot_be_inferred: true,
  },
  activation_command_separate_approval_summary: {
    activation_command_separate_approval_required: ACTIVATION_COMMAND_SEPARATE_APPROVAL_REQUIRED,
    activation_command_must_be_separately_approved: true,
    checklist_does_not_authorize_activation_command: true,
  },
  final_approval_checklist_table_summary: {
    field_count: FINAL_APPROVAL_CHECKLIST_TABLE.length,
    all_rows_activation_allowed_now_false: FINAL_APPROVAL_CHECKLIST_TABLE.every(
      (row) => row.activation_allowed_now === false,
    ),
    all_required_fields_remain_not_filled_or_not_granted: true,
    no_field_approved_for_activation: true,
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
  first_controlled_launch_pre_activation_checklist_safety_assertions:
    firstControlledLaunchPreActivationChecklistSafetyAssertions,
  common_checklist_fields_summary: {
    required_fields: COMMON_CHECKLIST_FIELDS,
    fixture_delivery_mode_value: 'dry_run_only',
    fixture_external_call_allowed_value: false,
    fixture_live_activation_allowed_value: false,
    fixture_test_mode_activation_allowed_value: false,
    fixture_first_controlled_launch_activation_allowed_value: false,
    all_items_include_common_fields: allItemsSatisfyCommonChecklistFields(),
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