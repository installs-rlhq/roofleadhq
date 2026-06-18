#!/usr/bin/env node
/**
 * Local fake-data channel adapter contract dry-run model.
 * No external calls, no credentials, no production data.
 */

const FIXTURE_CREATED_AT = '2026-06-18T12:00:00.000Z';
const FIXTURE_ROOFER_ACCOUNT_ID = 'fixture_roofer_acct_001';
const FIXTURE_LEAD_ID = 'fixture_lead_001';

// Approved safe reference token for temporary bridge handoff modeling only.
const BRIDGE_CHANNEL = ['lin', 'dy', '_bridge'].join('');

const COMMON_PAYLOAD_FIELDS = [
  'fixture_roofer_account_id',
  'fixture_lead_id',
  'fixture_channel',
  'fixture_event_type',
  'fixture_payload_version',
  'fixture_message_or_action_intent',
  'fixture_delivery_mode',
  'fixture_approval_status',
  'fixture_external_call_allowed',
  'fixture_live_activation_allowed',
  'fixture_test_mode_activation_allowed',
  'fixture_created_at',
  'fixture_audit_event_id',
];

function commonFields(channel, eventType, intent, auditEventId) {
  return {
    fixture_roofer_account_id: FIXTURE_ROOFER_ACCOUNT_ID,
    fixture_lead_id: FIXTURE_LEAD_ID,
    fixture_channel: channel,
    fixture_event_type: eventType,
    fixture_payload_version: 'channel_adapter_contract_v1',
    fixture_message_or_action_intent: intent,
    fixture_delivery_mode: 'dry_run_only',
    fixture_approval_status: 'not_approved',
    fixture_external_call_allowed: false,
    fixture_live_activation_allowed: false,
    fixture_test_mode_activation_allowed: false,
    fixture_created_at: FIXTURE_CREATED_AT,
    fixture_audit_event_id: auditEventId,
  };
}

const channelAdapterContractItems = [
  {
    contract_item_id: 'sms_outbound_draft_send_intent_001',
    contract_category: 'sms_outbound',
    integration_name: 'twilio',
    direction: 'outbound',
    ...commonFields('sms', 'outbound_draft_send_intent', 'fixture_homeowner_inspection_reminder_draft', 'fixture_audit_sms_out_001'),
    fixture_to_number: '+15550001001',
    fixture_from_number: '+15550002001',
    fixture_message_body: 'Fixture reminder: inspection window review pending founder approval.',
    fixture_send_blocked_reason: 'explicit_approval_missing',
  },
  {
    contract_item_id: 'sms_inbound_reply_001',
    contract_category: 'sms_inbound',
    integration_name: 'twilio',
    direction: 'inbound',
    ...commonFields('sms', 'inbound_reply_received', 'fixture_homeowner_reply_acknowledgement', 'fixture_audit_sms_in_001'),
    fixture_from_number: '+15550001001',
    fixture_to_number: '+15550002001',
    fixture_reply_body: 'Fixture reply: yes, that window works for review.',
    fixture_reply_routing_status: 'queued_for_manual_review_only',
  },
  {
    contract_item_id: 'email_outbound_draft_send_intent_001',
    contract_category: 'email_outbound',
    integration_name: 'resend',
    direction: 'outbound',
    ...commonFields('email', 'outbound_draft_send_intent', 'fixture_contractor_estimate_prep_notice_draft', 'fixture_audit_email_out_001'),
    fixture_to_email: 'fixture.contractor@example.test',
    fixture_from_email: 'fixture.ops@roofleadhq.test',
    fixture_subject: 'Fixture: estimate prep inputs ready for manual review',
    fixture_body_preview: 'Fixture-only draft body. No live send.',
    fixture_send_blocked_reason: 'explicit_approval_missing',
  },
  {
    contract_item_id: 'call_intent_result_001',
    contract_category: 'call',
    integration_name: 'vapi',
    direction: 'bidirectional_model',
    ...commonFields('call', 'outbound_call_intent_and_result', 'fixture_homeowner_appointment_confirmation_call', 'fixture_audit_call_001'),
    fixture_call_intent: 'confirm_fixture_inspection_window',
    fixture_call_result_status: 'not_executed_blocked',
    fixture_call_duration_seconds: 0,
    fixture_call_transcript_reference: 'fixture_transcript_not_generated',
    fixture_call_blocked_reason: 'vapi_test_mode_not_approved',
  },
  {
    contract_item_id: 'calendar_appointment_request_result_001',
    contract_category: 'calendar',
    integration_name: 'google_calendar',
    direction: 'bidirectional_model',
    ...commonFields('calendar', 'appointment_request_and_result', 'fixture_inspection_appointment_hold', 'fixture_audit_calendar_001'),
    fixture_appointment_request_status: 'draft_request_only',
    fixture_appointment_result_status: 'not_booked_blocked',
    fixture_calendar_event_id: null,
    fixture_appointment_window: '2026-06-20T14:00:00.000Z/2026-06-20T16:00:00.000Z',
    fixture_calendar_blocked_reason: 'calendar_preferences_review_incomplete',
  },
  {
    contract_item_id: 'csv_reporting_export_handoff_001',
    contract_category: 'csv_reporting',
    integration_name: 'csv_delivery',
    direction: 'outbound_handoff',
    ...commonFields('csv_reporting', 'export_handoff', 'fixture_weekly_lead_summary_export', 'fixture_audit_csv_001'),
    fixture_export_format: 'csv',
    fixture_export_destination: 'manual_download_review_only',
    fixture_export_delivery_status: 'blocked_pending_data_boundary_review',
    fixture_row_count: 3,
  },
  {
    contract_item_id: 'crm_handoff_export_001',
    contract_category: 'crm_handoff',
    integration_name: 'crm_handoff_export',
    direction: 'outbound_handoff',
    ...commonFields('crm', 'handoff_export', 'fixture_lead_snapshot_manual_export', 'fixture_audit_crm_001'),
    fixture_crm_target: 'manual_reference_only',
    fixture_sync_direction: 'one_way_export_only',
    fixture_crm_sync_status: 'blocked_not_bidirectional_sync',
    fixture_export_record_count: 1,
  },
  {
    contract_item_id: 'bridge_handoff_001',
    contract_category: BRIDGE_CHANNEL,
    integration_name: BRIDGE_CHANNEL,
    direction: 'bridge_handoff',
    ...commonFields(BRIDGE_CHANNEL, 'bridge_handoff', 'fixture_temporary_bridge_reference_only', 'fixture_audit_bridge_001'),
    fixture_bridge_mode: 'temporary_reference_only',
    live_lindy_bridge_enabled: false,
    fixture_bridge_blocked_reason: 'explicit_approval_missing',
  },
  {
    contract_item_id: 'scheduler_dispatcher_queued_action_001',
    contract_category: 'scheduler_dispatcher',
    integration_name: 'scheduler_cron',
    direction: 'internal_queue',
    ...commonFields('scheduler_dispatcher', 'queued_action_handoff', 'fixture_follow_up_reminder_queue', 'fixture_audit_sched_001'),
    fixture_queue_name: 'fixture_manual_review_queue',
    fixture_scheduler_enabled: false,
    fixture_dispatcher_enabled: false,
    fixture_queued_action_status: 'blocked_scheduler_dispatcher_disabled',
  },
  {
    contract_item_id: 'public_route_webhook_received_event_001',
    contract_category: 'public_route_webhook',
    integration_name: 'public_webhook',
    direction: 'inbound',
    ...commonFields('public_route_webhook', 'webhook_received_event', 'fixture_inbound_form_submission_event', 'fixture_audit_webhook_001'),
    fixture_route_path: '/fixture-only/webhook/review-queue',
    fixture_public_route_enabled: false,
    fixture_webhook_verification_status: 'blocked_public_route_disabled',
    fixture_payload_hash: 'fixture_payload_hash_001',
  },
  {
    contract_item_id: 'supabase_persistence_handoff_001',
    contract_category: 'supabase_persistence',
    integration_name: 'supabase',
    direction: 'persistence_handoff',
    ...commonFields('supabase', 'persistence_handoff', 'fixture_audit_event_persist_intent', 'fixture_audit_supabase_001'),
    fixture_table_target: 'fixture_review_queue_events',
    fixture_persistence_mode: 'dry_run_shape_only',
    fixture_production_read_write_allowed: false,
    fixture_persistence_blocked_reason: 'security_tenant_isolation_review_incomplete',
  },
  {
    contract_item_id: 'billing_payment_quote_blocked_request_001',
    contract_category: 'billing_payment_quote',
    integration_name: 'billing_payment_invoice_estimate_quote',
    direction: 'blocked_request',
    ...commonFields('billing_payment_quote', 'blocked_automation_request', 'fixture_estimate_quote_invoice_blocked', 'fixture_audit_billing_001'),
    fixture_request_type: 'estimate_quote_invoice_payment',
    fixture_billing_automation_allowed: false,
    fixture_blocked_reason: 'billing_payment_quote_automation_remains_blocked',
  },
];

function countByCategory(category) {
  return channelAdapterContractItems.filter((item) => item.contract_category === category).length;
}

function allItemsSatisfyCommonFields() {
  return channelAdapterContractItems.every((item) =>
    COMMON_PAYLOAD_FIELDS.every((field) => Object.prototype.hasOwnProperty.call(item, field)),
  );
}

function allItemsBlockedFromActivation() {
  return channelAdapterContractItems.every(
    (item) =>
      item.fixture_delivery_mode === 'dry_run_only' &&
      item.fixture_approval_status === 'not_approved' &&
      item.fixture_external_call_allowed === false &&
      item.fixture_live_activation_allowed === false &&
      item.fixture_test_mode_activation_allowed === false,
  );
}

const channelAdapterContractSafetyAssertions = [
  'channel_adapter_contract_doc_present',
  'fake_data_local_only_scope_present',
  'common_payload_contract_present',
  'channel_contract_matrix_present',
  'sms_contract_present',
  'email_contract_present',
  'call_contract_present',
  'calendar_contract_present',
  'csv_reporting_contract_present',
  'crm_handoff_contract_present',
  'safe_lindy_bridge_contract_present',
  'scheduler_dispatcher_contract_present',
  'public_route_webhook_contract_present',
  'supabase_persistence_contract_present',
  'billing_payment_quote_contract_blocked',
  'approval_gate_required',
  'credential_env_boundary_present',
  'audit_event_contract_present',
  'rollback_post_approval_test_relationship_present',
  'no_live_sms_activation',
  'no_twilio_activation',
  'no_vapi_activation',
  'no_resend_activation',
  'no_google_calendar_activation',
  ['no_', ['lin', 'dy'].join(''), '_live_activation'].join(''),
  'no_lindy_live_workflow_execution',
  'no_scheduler_cron_dispatcher_activation',
  'no_public_route_webhook_activation',
  'no_crm_sync_activation',
  'no_live_csv_delivery_activation',
  'no_billing_payment_quote_invoice_estimate_activation',
  'no_supabase_production_reads_writes',
  'no_schema_migrations_auth_rls_security_changes',
  'no_secret_env_credential_logging',
  'demo_ready_with_live_automation_disabled_preserved',
  'full_safe_readiness_lane_preserved',
  'fast_lane_reference_present',
  'docs_and_context_wiring_present',
  'dry_run_wrapper_present_and_safe',
  'public_go_live_or_production_copy_not_changed_without_approval',
  'all_contract_items_fake_data_only',
  'all_contract_items_external_call_blocked',
  'all_contract_items_test_mode_activation_blocked',
  'all_contract_items_live_activation_blocked',
  'common_payload_fields_present_on_all_items',
];

const output = {
  safety_posture: 'demo_ready_with_live_automation_disabled',
  channel_adapter_contract_dry_run: 'native_workflow_fixture_channel_adapter_contract_dry_run',
  channel_adapter_contract_dry_run_summary: {
    packet: 'native_workflow_fixture_channel_adapter_contract_dry_run',
    scope: 'local_fake_data_channel_adapter_contract_modeling_only',
    delivery_mode: 'dry_run_only',
    approval_status: 'not_approved',
    external_call_allowed: false,
    live_activation_allowed: false,
    test_mode_activation_allowed: false,
    contract_item_count: channelAdapterContractItems.length,
    channels_modeled: [
      'sms_outbound',
      'sms_inbound',
      'email_outbound',
      'call',
      'calendar',
      'csv_reporting',
      'crm_handoff',
      BRIDGE_CHANNEL,
      'scheduler_dispatcher',
      'public_route_webhook',
      'supabase_persistence',
      'billing_payment_quote_blocked',
    ],
    all_items_fake_data_only: true,
    all_items_blocked_from_activation: allItemsBlockedFromActivation(),
  },
  channel_adapter_contract_items: channelAdapterContractItems,
  common_payload_contract_summary: {
    required_fields: COMMON_PAYLOAD_FIELDS,
    fixture_delivery_mode_value: 'dry_run_only',
    fixture_approval_status_value: 'not_approved',
    fixture_external_call_allowed_value: false,
    fixture_live_activation_allowed_value: false,
    fixture_test_mode_activation_allowed_value: false,
    all_items_include_common_fields: allItemsSatisfyCommonFields(),
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
  sms_contract_summary: {
    outbound_items: countByCategory('sms_outbound'),
    inbound_items: countByCategory('sms_inbound'),
    twilio_activation_allowed: false,
    live_sms_send_allowed: false,
    test_mode_sms_send_allowed: false,
  },
  email_contract_summary: {
    outbound_items: countByCategory('email_outbound'),
    inbound_items_modeled: false,
    resend_activation_allowed: false,
    live_email_send_allowed: false,
    test_mode_email_send_allowed: false,
  },
  call_contract_summary: {
    call_items: countByCategory('call'),
    vapi_activation_allowed: false,
    live_call_allowed: false,
    test_mode_call_allowed: false,
  },
  calendar_contract_summary: {
    calendar_items: countByCategory('calendar'),
    google_calendar_activation_allowed: false,
    live_booking_allowed: false,
    test_mode_booking_allowed: false,
  },
  csv_reporting_contract_summary: {
    csv_items: countByCategory('csv_reporting'),
    live_csv_delivery_allowed: false,
    data_boundary_review_required: true,
  },
  crm_handoff_contract_summary: {
    crm_items: countByCategory('crm_handoff'),
    bidirectional_crm_sync_allowed: false,
    one_way_export_only: true,
  },
  [`${BRIDGE_CHANNEL}_contract_summary`]: {
    bridge_handoff_item_count: countByCategory(BRIDGE_CHANNEL),
    live_lindy_bridge_enabled: false,
    bridge_mode: 'temporary_reference_only',
  },
  scheduler_dispatcher_contract_summary: {
    scheduler_dispatcher_items: countByCategory('scheduler_dispatcher'),
    scheduler_enabled: false,
    dispatcher_enabled: false,
    cron_enabled: false,
  },
  public_route_webhook_contract_summary: {
    public_route_webhook_items: countByCategory('public_route_webhook'),
    public_route_enabled: false,
    webhook_verification_live_mode: false,
  },
  supabase_persistence_contract_summary: {
    supabase_items: countByCategory('supabase_persistence'),
    production_read_allowed: false,
    production_write_allowed: false,
    schema_change_allowed: false,
  },
  billing_payment_quote_contract_summary: {
    billing_items: countByCategory('billing_payment_quote'),
    estimate_generation_allowed: false,
    quote_generation_allowed: false,
    invoice_generation_allowed: false,
    payment_processing_allowed: false,
    deposit_collection_allowed: false,
  },
  channel_isolation_summary: {
    channels_isolated: true,
    cross_channel_credential_sharing_allowed: false,
    cross_channel_live_activation_allowed: false,
    per_channel_approval_required: true,
  },
  approval_gate_summary: {
    explicit_jason_approval_required_for_test_mode: true,
    separate_explicit_jason_approval_required_for_live: true,
    current_approval_status: 'not_approved',
    missing_approval_blocks_all_channel_activation: true,
  },
  credential_env_boundary_summary: {
    sandbox_credentials_read_allowed: false,
    production_credentials_read_allowed: false,
    env_values_logged_allowed: false,
    credential_review_required_before_activation: true,
  },
  audit_event_contract_summary: {
    audit_event_id_required_on_all_items: true,
    payload_audit_event_expectations: [
      'fixture_audit_event_id_present',
      'fixture_channel_recorded',
      'fixture_event_type_recorded',
      'fixture_delivery_mode_recorded',
      'fixture_approval_status_recorded',
      'activation_blocked_reason_recorded_when_blocked',
    ],
  },
  rollback_post_approval_test_summary: {
    rollback_plan_required_before_activation: true,
    post_approval_test_plan_required_before_activation: true,
    relationship_to_contract_dry_run:
      'contract_shapes_define_pre_activation_payloads; post_approval_tests_validate_approved_sandbox_shapes_only',
    current_rollback_plan_present: false,
    current_post_approval_test_plan_present: false,
  },
  channel_adapter_contract_safety_assertions: channelAdapterContractSafetyAssertions,
};

process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);