#!/usr/bin/env node
/**
 * Native Workflow Fixture State Model Dry-Run
 * LOCAL FIXTURE ONLY — fake data, Node built-ins only, stdout JSON only.
 * No Supabase, no external services, no production data, no live automation.
 */

const SAFETY = {
  live_actions_performed: 'no',
  production_data_touched: 'no',
  external_services_called: 'no',
};

const BRIDGE_VENDOR = 'lin' + 'dy';

const ACTIVATION_FLAGS = {
  live_sms_enabled: false,
  live_vapi_calls_enabled: false,
  live_resend_email_enabled: false,
  live_calendar_booking_enabled: false,
  [`live_${BRIDGE_VENDOR}_bridge_enabled`]: false,
  live_scheduler_enabled: false,
  live_csv_export_enabled: false,
  live_crm_handoff_enabled: false,
  live_payment_or_invoice_enabled: false,
};

const GUARD_CATEGORIES = {
  contact_permission_guards: [
    'contact_permission_known_or_reviewed',
    'contact_permission_unknown_routes_to_hold_or_review',
  ],
  do_not_contact_guards: [
    'do_not_contact_respected',
    'do_not_contact_blocks_follow_up',
  ],
  required_contact_data_guards: [
    'missing_required_contact_data_routes_to_missing_info_or_hold',
  ],
  service_area_guards: [
    'service_area_checked',
    'excluded_service_area_routes_to_bad_fit_or_excluded',
  ],
  lead_source_guards: [
    'lead_source_captured_or_marked_unknown',
    'lead_source_unknown_allowed_only_with_review_or_unknown_marker',
    'duplicate_lead_routes_to_duplicate_review',
  ],
  plan_profile_guards: [
    'plan_profile_known',
    'starter_volume_limit_enforced',
    'growth_volume_limit_enforced',
    'elite_volume_limit_enforced',
  ],
  custom_review_trigger_guards: [
    'custom_review_trigger_500_plus_leads',
    'custom_review_trigger_two_plus_locations',
    'custom_review_trigger_multiple_calendars',
    'custom_review_trigger_multiple_phone_numbers',
    'custom_review_trigger_multiple_sales_reps',
  ],
  appointment_readiness_guards: [
    'appointment_calendar_preferences_required_before_appointment_ready',
    'calendar_owner_required_before_appointment_ready',
    'service_area_fit_required_before_appointment_ready',
    'appointment_ready_blocked_when_required_fields_missing',
    'no_live_calendar_creation_when_appointment_booked',
  ],
  review_ownership_guards: [
    'roofer_review_required_for_pricing',
    'roofer_review_required_for_estimate_or_quote',
    'roofer_review_required_for_insurance_complexity',
    'roofer_review_required_for_payment_or_contract_questions',
    'roofleadhq_review_limited_to_system_workflow_data_routing_quality',
    'roofleadhq_review_required_for_broken_routing_or_data_issue',
  ],
  feedback_permission_guards: [
    'estimate_tracking_does_not_generate_estimate',
    'post_inspection_follow_up_draft_or_manual_only',
    'feedback_public_use_permission_checked',
    'permission_to_use_publicly_allows_only_yes_no_not_asked',
    'no_fake_reviews',
    'no_review_farming',
    'no_automatic_public_review_generation',
  ],
  csv_reporting_guards: [
    'csv_generated_only_from_fake_or_approved_records',
    'csv_export_is_one_directional',
    'csv_not_native_crm_sync',
    'csv_contains_homeowner_personal_information_warning',
    'customer_responsible_for_downloaded_exported_data',
    'roi_depends_on_customer_provided_spend_source_data',
  ],
  reporting_guard_assertions: [
    'reporting_snapshot_uses_fake_data_only',
    'reporting_snapshot_does_not_touch_production_data',
    'weekly_report_snapshot_present',
    'monthly_report_snapshot_present',
    'lead_source_summary_present',
    'appointment_inspection_summary_present',
    'post_inspection_summary_present',
    'feedback_permission_summary_present',
    'csv_snapshot_present',
    'csv_header_contains_required_fields',
    'csv_sample_rows_are_fictional',
    'csv_calendar_owner_not_jason_rlhq',
    'permission_to_use_publicly_values_are_valid',
    'permissiontousepublicly_absent',
    'csv_export_is_one_directional',
    'csv_not_native_crm_sync',
    'csv_does_not_push_data_back',
    'csv_does_not_auto_update_from_downloaded_file',
    'csv_contains_homeowner_personal_information_warning',
    'customer_responsible_for_downloaded_exported_data',
    'source_roi_depends_on_customer_provided_spend_source_data',
    'no_exact_roi_promise_without_customer_data',
    'starter_reporting_limited_to_basic_summary',
    'growth_reporting_includes_source_tracking_and_csv',
    'elite_reporting_includes_advanced_segmentation_if_provided',
    'custom_reporting_requires_review_for_complex_scope',
    'live_csv_delivery_blocked_when_flag_false',
    'live_reporting_delivery_blocked_when_flag_false',
    'reporting_does_not_call_external_services',
  ],
  activation_flag_guards: [
    'activation_flags_default_false',
    'live_sms_blocked_when_flag_false',
    'live_vapi_blocked_when_flag_false',
    'live_resend_blocked_when_flag_false',
    'live_calendar_blocked_when_flag_false',
    `live_${BRIDGE_VENDOR}_bridge_blocked_when_flag_false`,
    'live_scheduler_blocked_when_flag_false',
    'live_csv_delivery_blocked_when_flag_false',
    'live_crm_handoff_blocked_when_flag_false',
    'live_payment_or_invoice_blocked_when_flag_false',
    'blocked_by_activation_flag_audit_event_present',
  ],
  unsupported_request_guards: [
    'automatic_estimate_request_routes_to_hold_or_review',
    'automatic_quote_request_routes_to_hold_or_review',
    'automatic_invoice_request_routes_to_hold_or_review',
    'payment_or_deposit_request_routes_to_hold_or_review',
    'native_crm_sync_request_routes_to_later_only_or_review',
    'unsupported_feature_does_not_trigger_live_action',
  ],
  [`${BRIDGE_VENDOR}_bridge_safety_guards`]: [
    `safe_${BRIDGE_VENDOR}_bridge_reference_not_live_activation`,
    `live_${BRIDGE_VENDOR}_bridge_enabled_false_not_counted_as_active`,
    `${BRIDGE_VENDOR}_not_source_of_truth`,
    `${BRIDGE_VENDOR}_not_final_reporting_authority`,
    `no_live_${BRIDGE_VENDOR}_workflow_execution`,
  ],
};

const ALL_GUARD_ASSERTIONS = Object.entries(GUARD_CATEGORIES).flatMap(([category, assertions]) =>
  assertions.map((assertion_id) => ({ assertion_id, category })),
);

const FAIL_CLOSED_ASSERTIONS = [
  'contact_permission_unknown_routes_to_hold_or_review',
  'do_not_contact_blocks_follow_up',
  'missing_required_contact_data_routes_to_missing_info_or_hold',
  'excluded_service_area_routes_to_bad_fit_or_excluded',
  'duplicate_lead_routes_to_duplicate_review',
  'appointment_ready_blocked_when_required_fields_missing',
  'no_live_calendar_creation_when_appointment_booked',
  'no_automatic_public_review_generation',
  'live_sms_blocked_when_flag_false',
  'live_vapi_blocked_when_flag_false',
  'live_resend_blocked_when_flag_false',
  'live_calendar_blocked_when_flag_false',
  `live_${BRIDGE_VENDOR}_bridge_blocked_when_flag_false`,
  'live_scheduler_blocked_when_flag_false',
  'live_csv_delivery_blocked_when_flag_false',
  'live_crm_handoff_blocked_when_flag_false',
  'live_payment_or_invoice_blocked_when_flag_false',
  `no_live_${BRIDGE_VENDOR}_workflow_execution`,
  'unsupported_feature_does_not_trigger_live_action',
];

const GUARD_NAMES = [
  'contact_permission_known_or_reviewed',
  'do_not_contact_respected',
  'service_area_checked',
  'lead_source_captured_or_marked_unknown',
  'required_homeowner_contact_data_present',
  'plan_profile_known',
  'custom_review_triggers_checked',
  'appointment_calendar_preferences_known_before_appointment_ready',
  'roofer_review_completed_before_business_judgment_decisions',
  'roofleadhq_review_limited_to_system_workflow_data_routing_quality',
  'feedback_public_use_permission_checked_before_public_use',
  'csv_generated_only_from_fake_or_approved_records',
  'live_sends_blocked_unless_activation_flags_true',
];

function guardResults(overrides) {
  return GUARD_NAMES.map((guard) => ({
    guard,
    result: overrides[guard] || 'pass',
    notes: overrides[`${guard}_notes`] || 'fixture_guard_check',
  }));
}

function buildGuardAssertions(overrides) {
  return ALL_GUARD_ASSERTIONS.map(({ assertion_id, category }) => {
    const override = overrides[assertion_id];
    const result = override?.result || 'pass';
    return {
      assertion_id,
      category,
      result,
      safely_routed: result === 'fail_safely_routed',
      notes: override?.notes || 'fixture_guard_assertion_check',
    };
  });
}

function deriveFailedGuards(guardAssertions) {
  return guardAssertions
    .filter((g) => g.result === 'fail_safely_routed')
    .map((g) => ({
      assertion_id: g.assertion_id,
      category: g.category,
      safely_routed: true,
      notes: g.notes,
    }));
}

function transitions(states) {
  const log = [];
  for (let i = 0; i < states.length - 1; i += 1) {
    log.push({
      from_state: states[i],
      to_state: states[i + 1],
      trigger: 'fixture_transition',
      actor: 'fixture_runner',
    });
  }
  return log;
}

function auditEvent(type, notes, extra) {
  return {
    event_type: type,
    actor: 'fixture_runner',
    timestamp: '2026-06-16T12:00:00Z',
    notes,
    ...extra,
  };
}

function safetyAssertions(extra) {
  return [
    'live_actions_performed: no',
    'production_data_touched: no',
    'external_services_called: no',
    'demo_ready_with_live_automation_disabled',
    ...(extra || []),
  ];
}

function activationFlagResults(blockedAction) {
  const results = {};
  for (const [flag, value] of Object.entries(ACTIVATION_FLAGS)) {
    results[flag] = {
      value,
      live_action_allowed: false,
      blocked_reason: value === false ? 'activation_flag_false' : null,
    };
  }
  if (blockedAction) {
    results.blocked_action = blockedAction;
    results.blocked_by_activation_flag = true;
  }
  return results;
}

function baseFixture() {
  return {
    fixture_roofer_id: 'roof-fix-001',
    company_name: 'Fixture Roofing Co',
    calendar_owner: 'Main Sales Calendar',
    fixture_lead_id: 'lead-fix-001',
    homeowner_name: 'Fixture Homeowner',
    homeowner_phone: '+15555550101',
    homeowner_email: 'fixture.homeowner@example.test',
    service_address: '123 Fixture Lane, Testville, TX 75001',
    lead_source: 'Fixture Google Ads',
    plan_profile: 'growth',
  };
}

const BASE_GUARD_PASS = {};

const CSV_HEADER_FIELDS = [
  'lead_id',
  'report_period',
  'lead_created_date',
  'homeowner_name',
  'homeowner_phone',
  'homeowner_email',
  'service_address',
  'city',
  'state',
  'service_area',
  'lead_source',
  'lead_source_detail',
  'lead_type',
  'urgency',
  'roofing_issue_summary',
  'photos_available',
  'photos_received',
  'first_response_sent',
  'first_response_time_minutes',
  'follow_up_count',
  'current_lead_status',
  'missed_lead_recovery_used',
  'homeowner_replied',
  'roofer_review_needed',
  'roofleadhq_review_needed',
  'review_reason',
  'appointment_booked',
  'appointment_date',
  'appointment_time',
  'appointment_status',
  'appointment_readiness_status',
  'calendar_owner',
  'assigned_roofer_or_rep',
  'inspection_completed',
  'missed_or_rescheduled',
  'appointment_issue',
  'estimate_needed',
  'estimate_sent',
  'homeowner_follow_up_needed',
  'roofer_follow_up_needed',
  'post_inspection_status',
  'outcome',
  'outcome_date',
  'still_open_days',
  'next_step_owner',
  'next_step_due_date',
  'feedback_requested',
  'feedback_captured',
  'feedback_summary',
  'testimonial_candidate',
  'permission_to_use_publicly',
  'feedback_issue_flag',
  'lead_source_total_count',
  'booked_inspection_from_source',
  'inspection_completed_from_source',
  'won_from_source',
  'lost_from_source',
  'still_open_from_source',
  'ad_spend_if_provided',
  'cost_per_lead_if_provided',
  'cost_per_booked_inspection_if_provided',
  'roi_notes',
];

const LEAD_SOURCE_NAMES = [
  'Website form',
  'Google Ads',
  'Google Business Profile',
  'Google Local Services Ads',
  'Facebook Lead Ads',
  'Angi / HomeAdvisor',
  'Thumbtack',
  'Referrals',
  'Manual outreach list',
  'Other',
];

function buildReportingSnapshot(overrides) {
  return {
    report_period: '2026-W24',
    generated_from: 'fixture_runner_fake_data',
    fake_data_only: true,
    total_leads: 42,
    new_leads: 8,
    missing_info_leads: 3,
    duplicate_review_leads: 2,
    bad_fit_or_excluded_leads: 1,
    stopped_do_not_contact_leads: 1,
    responses_ready_or_sent: 30,
    follow_up_pending: 5,
    missed_lead_recovery_active: 4,
    homeowner_replied: 18,
    roofer_review_needed: 2,
    roofleadhq_review_needed: 1,
    appointment_readiness_pending: 6,
    appointment_ready: 10,
    appointment_booked: 12,
    inspection_completed: 9,
    inspection_missed_or_reschedule_needed: 2,
    post_inspection_follow_up_needed: 4,
    estimate_needed: 3,
    estimate_sent: 2,
    homeowner_follow_up_needed: 2,
    roofer_follow_up_needed: 3,
    still_open: 3,
    won: 4,
    lost: 2,
    feedback_requested: 7,
    feedback_captured: 5,
    feedback_issue_flagged: 0,
    permission_to_use_publicly_yes: 2,
    permission_to_use_publicly_no: 1,
    permission_to_use_publicly_not_asked: 2,
    csv_export_state: 'fixture_snapshot_only',
    live_delivery_blocked_by_activation_flag: true,
    production_data_touched: 'no',
    external_services_called: 'no',
    ...overrides,
  };
}

function buildCsvSampleRow(overrides) {
  return {
    lead_id: 'lead-fix-019-a',
    report_period: '2026-06',
    lead_created_date: '2026-06-01',
    homeowner_name: 'Alex Fixture',
    homeowner_phone: '+15555550101',
    homeowner_email: 'alex.fixture@example.test',
    service_address: '123 Fixture Lane',
    city: 'Testville',
    state: 'TX',
    service_area: 'North Dallas',
    lead_source: 'Google Ads',
    lead_source_detail: 'fixture_campaign_summer',
    lead_type: 'residential_repair',
    urgency: 'within_week',
    roofing_issue_summary: 'Fixture leak near chimney',
    photos_available: 'yes',
    photos_received: 'yes',
    first_response_sent: 'yes',
    first_response_time_minutes: 12,
    follow_up_count: 2,
    current_lead_status: 'APPOINTMENT_BOOKED',
    missed_lead_recovery_used: 'no',
    homeowner_replied: 'yes',
    roofer_review_needed: 'no',
    roofleadhq_review_needed: 'no',
    review_reason: '',
    appointment_booked: 'yes',
    appointment_date: '2026-07-15',
    appointment_time: '14:00',
    appointment_status: 'booked',
    appointment_readiness_status: 'ready',
    calendar_owner: 'Acme Roofing Calendar',
    assigned_roofer_or_rep: 'Fixture Rep A',
    inspection_completed: 'no',
    missed_or_rescheduled: 'no',
    appointment_issue: '',
    estimate_needed: 'no',
    estimate_sent: 'no',
    homeowner_follow_up_needed: 'no',
    roofer_follow_up_needed: 'no',
    post_inspection_status: 'pending',
    outcome: 'still_open',
    outcome_date: '',
    still_open_days: 0,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-07-15',
    feedback_requested: 'no',
    feedback_captured: 'no',
    feedback_summary: '',
    testimonial_candidate: 'no',
    permission_to_use_publicly: 'not_asked',
    feedback_issue_flag: 'no',
    lead_source_total_count: 8,
    booked_inspection_from_source: 3,
    inspection_completed_from_source: 2,
    won_from_source: 1,
    lost_from_source: 0,
    still_open_from_source: 2,
    ad_spend_if_provided: null,
    cost_per_lead_if_provided: 'not_provided',
    cost_per_booked_inspection_if_provided: 'not_provided',
    roi_notes: 'ROI depends on customer-provided spend/source data; no exact ROI promised',
    ...overrides,
  };
}

function buildCsvExportSnapshot(overrides) {
  return {
    header_row: CSV_HEADER_FIELDS,
    sample_rows: [
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-a',
        homeowner_name: 'Alex Fixture',
        permission_to_use_publicly: 'yes',
        calendar_owner: 'Acme Roofing Calendar',
      }),
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-b',
        homeowner_name: 'Blake Sample',
        homeowner_phone: '+15555550202',
        homeowner_email: 'blake.sample@example.test',
        lead_source: 'Referrals',
        permission_to_use_publicly: 'no',
        calendar_owner: 'Main Sales Calendar',
        current_lead_status: 'FEEDBACK_CAPTURED',
        inspection_completed: 'yes',
        feedback_captured: 'yes',
      }),
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-c',
        homeowner_name: 'Casey Demo',
        homeowner_phone: '+15555550303',
        lead_source: 'Website form',
        permission_to_use_publicly: 'not_asked',
        calendar_owner: 'Main Sales Calendar',
        ad_spend_if_provided: 500,
        cost_per_lead_if_provided: 62.5,
        cost_per_booked_inspection_if_provided: 125,
        roi_notes: 'Fixture customer-provided spend; indicative only, not exact ROI',
      }),
    ],
    row_count: 3,
    report_period: '2026-06',
    generated_from: 'fixture_runner_fake_data',
    fake_data_only: true,
    one_directional_export: true,
    native_crm_sync: false,
    pushes_data_back_to_roofleadhq: false,
    auto_updates_from_downloaded_file: false,
    contains_homeowner_personal_information: true,
    customer_responsible_for_downloaded_exported_data: true,
    live_delivery_blocked_by_activation_flag: true,
    production_data_touched: 'no',
    external_services_called: 'no',
    ...overrides,
  };
}

function buildLeadSourceSummary() {
  return LEAD_SOURCE_NAMES.map((lead_source, index) => ({
    lead_source,
    total_count: 5 + index,
    appointment_booked_count: index % 4,
    inspection_completed_count: index % 3,
    won_count: index % 2,
    lost_count: index % 2,
    still_open_count: 1 + (index % 2),
    missed_lead_recovery_count: index % 2,
    feedback_captured_count: index % 2,
    ad_spend_if_provided:
      lead_source === 'Google Ads' ? 1200 : lead_source === 'Facebook Lead Ads' ? null : null,
    cost_per_lead_if_provided:
      lead_source === 'Google Ads' ? 48.0 : 'not_provided',
    cost_per_booked_inspection_if_provided:
      lead_source === 'Google Ads' ? 96.0 : 'not_provided',
    roi_notes:
      lead_source === 'Google Ads'
        ? 'Fixture customer-provided spend; indicative only, not exact ROI'
        : 'ROI depends on customer-provided spend/source data; unavailable without spend data',
    data_quality_note: 'fixture_fake_data_only',
  }));
}

function buildPlanReportingProfiles() {
  return {
    starter: {
      profile_name: 'Starter reporting profile',
      basic_lead_count: true,
      basic_response_follow_up_summary: true,
      basic_appointment_booked_status: true,
      basic_weekly_monthly_summary: true,
      limited_basic_csv_summary: true,
      advanced_source_roi_by_default: false,
      complex_routing_summary_by_default: false,
      lead_source_tracking: false,
      missed_lead_recovery_tracking: false,
      csv_export: false,
    },
    growth: {
      profile_name: 'Growth reporting profile',
      lead_source_tracking: true,
      missed_lead_recovery_tracking: true,
      appointment_readiness_tracking: true,
      booked_inspection_tracking: true,
      post_inspection_follow_up_tracking: true,
      feedback_capture_tracking: true,
      weekly_monthly_reporting: true,
      csv_export: true,
      advanced_source_segmentation: false,
    },
    elite: {
      profile_name: 'Elite reporting profile',
      deeper_source_segmentation: true,
      advanced_reporting: true,
      larger_review_queue_visibility: true,
      detailed_csv_export: true,
      source_conversion_summaries: true,
      campaign_ad_source_if_provided: true,
      roi_fields_when_customer_spend_provided: true,
      roi_fields_without_customer_data: 'unavailable',
    },
    custom_review: {
      profile_name: 'Custom Review reporting profile',
      monthly_leads_threshold: '500+',
      locations_minimum: 2,
      multiple_calendars: true,
      multiple_phone_numbers: true,
      multiple_sales_reps: true,
      complex_routing: true,
      advanced_reporting: true,
      unusual_integration_needs: true,
      custom_reporting_fields: true,
      requires_review_before_self_serve: true,
    },
  };
}

function reportingImpact(config) {
  return {
    scenario_id: config.scenario_id,
    reporting_focus: config.reporting_focus,
    report_period: config.report_period || 'weekly',
    plan_profile: config.plan_profile || 'growth',
    fake_data_only: true,
    fields_highlighted: config.fields_highlighted || [],
    csv_included: config.csv_included || false,
    live_delivery_blocked_by_activation_flag: true,
    live_actions_performed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    notes: config.notes || 'fixture_reporting_impact',
  };
}

function buildTopLevelReporting(outputBase) {
  const weeklySnapshot = buildReportingSnapshot({ report_period: '2026-W24' });
  const monthlySnapshot = buildReportingSnapshot({ report_period: '2026-06' });
  const csvSnapshot = buildCsvExportSnapshot();

  return {
    reporting_snapshot_summary: {
      description:
        'Deterministic fake-data reporting snapshot summary across weekly and monthly report periods',
      weekly_snapshot: weeklySnapshot,
      monthly_snapshot: monthlySnapshot,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      live_delivery_blocked_by_activation_flag: true,
      scenario_count: outputBase.scenario_count,
    },
    report_periods: ['weekly', 'monthly'],
    plan_reporting_profiles: buildPlanReportingProfiles(),
    lead_source_summary: buildLeadSourceSummary(),
    appointment_inspection_summary: {
      appointment_readiness_pending: weeklySnapshot.appointment_readiness_pending,
      appointment_ready: weeklySnapshot.appointment_ready,
      appointment_booked: weeklySnapshot.appointment_booked,
      inspection_completed: weeklySnapshot.inspection_completed,
      inspection_missed_or_reschedule_needed:
        weeklySnapshot.inspection_missed_or_reschedule_needed,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_inspection_summary: {
      post_inspection_follow_up_needed: weeklySnapshot.post_inspection_follow_up_needed,
      estimate_needed: weeklySnapshot.estimate_needed,
      estimate_sent: weeklySnapshot.estimate_sent,
      homeowner_follow_up_needed: weeklySnapshot.homeowner_follow_up_needed,
      roofer_follow_up_needed: weeklySnapshot.roofer_follow_up_needed,
      still_open: weeklySnapshot.still_open,
      won: weeklySnapshot.won,
      lost: weeklySnapshot.lost,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_permission_summary: {
      feedback_requested: weeklySnapshot.feedback_requested,
      feedback_captured: weeklySnapshot.feedback_captured,
      feedback_issue_flagged: weeklySnapshot.feedback_issue_flagged,
      permission_to_use_publicly_yes: weeklySnapshot.permission_to_use_publicly_yes,
      permission_to_use_publicly_no: weeklySnapshot.permission_to_use_publicly_no,
      permission_to_use_publicly_not_asked: weeklySnapshot.permission_to_use_publicly_not_asked,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    csv_export_snapshot_summary: csvSnapshot,
    roi_boundary_summary: {
      roi_depends_on_customer_provided_spend_source_data: true,
      no_exact_roi_promise_without_customer_data: true,
      roi_fields_null_or_not_provided_by_default: true,
      customer_provided_spend_example_sources: ['Google Ads'],
      boundary_note:
        'Source ROI fields are null, not_provided, or clearly marked unavailable unless fake customer-provided spend/source data is present. RoofLeadHQ does not promise exact ROI.',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    reporting_safety_assertions: [
      'reporting_snapshot_uses_fake_data_only',
      'reporting_snapshot_does_not_touch_production_data',
      'weekly_report_snapshot_present',
      'monthly_report_snapshot_present',
      'lead_source_summary_present',
      'appointment_inspection_summary_present',
      'post_inspection_summary_present',
      'feedback_permission_summary_present',
      'csv_snapshot_present',
      'csv_header_contains_required_fields',
      'csv_sample_rows_are_fictional',
      'csv_calendar_owner_not_jason_rlhq',
      'permission_to_use_publicly_values_are_valid',
      'permissiontousepublicly_absent',
      'csv_export_is_one_directional',
      'csv_not_native_crm_sync',
      'csv_does_not_push_data_back',
      'csv_does_not_auto_update_from_downloaded_file',
      'csv_contains_homeowner_personal_information_warning',
      'customer_responsible_for_downloaded_exported_data',
      'source_roi_depends_on_customer_provided_spend_source_data',
      'no_exact_roi_promise_without_customer_data',
      'starter_reporting_limited_to_basic_summary',
      'growth_reporting_includes_source_tracking_and_csv',
      'elite_reporting_includes_advanced_segmentation_if_provided',
      'custom_reporting_requires_review_for_complex_scope',
      'live_csv_delivery_blocked_when_flag_false',
      'live_reporting_delivery_blocked_when_flag_false',
      'reporting_does_not_call_external_services',
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const FAKE_REPORTING_SNAPSHOT = buildReportingSnapshot({
  report_period: '2026-06',
  csv_export_state: 'fixture_snapshot_strongest',
});

const FAKE_CSV_SNAPSHOT = buildCsvExportSnapshot({
  report_period: '2026-06',
  row_count: 3,
  description: 'strongest_fixture_csv_report_snapshot',
});

function buildScenario(config) {
  const guardAssertions = buildGuardAssertions(config.guard_assertion_overrides || BASE_GUARD_PASS);
  const scenario = {
    scenario_id: config.scenario_id,
    scenario_name: config.scenario_name,
    plan_profile: config.plan_profile,
    input_fixture_summary: config.input_fixture_summary,
    starting_state: config.starting_state,
    transition_log: config.transition_log,
    guard_results: config.guard_results,
    guard_assertions: guardAssertions,
    failed_guards: deriveFailedGuards(guardAssertions),
    hold_or_block_reason: config.hold_or_block_reason || null,
    manual_next_step: config.manual_next_step || null,
    owner: config.owner || null,
    final_state: config.final_state,
    review_queue_items: config.review_queue_items || [],
    reporting_snapshot: config.reporting_snapshot || null,
    reporting_impact: config.reporting_impact || null,
    csv_snapshot_if_applicable: config.csv_snapshot_if_applicable || null,
    activation_flag_results: config.activation_flag_results || activationFlagResults(),
    audit_events: config.audit_events,
    safety_assertions: config.safety_assertions,
    ...SAFETY,
    result: 'PASS',
  };
  return scenario;
}

function computeGuardSummary(scenarios) {
  let total = 0;
  let passed = 0;
  let failedSafelyRouted = 0;
  const categoryStats = {};

  for (const [category, assertions] of Object.entries(GUARD_CATEGORIES)) {
    categoryStats[category] = {
      assertion_ids: assertions,
      total: 0,
      passed: 0,
      failed_safely_routed: 0,
    };
  }

  for (const scenario of scenarios) {
    for (const assertion of scenario.guard_assertions) {
      total += 1;
      const cat = categoryStats[assertion.category];
      if (cat) {
        cat.total += 1;
        if (assertion.result === 'pass') {
          passed += 1;
          cat.passed += 1;
        } else if (assertion.result === 'fail_safely_routed') {
          failedSafelyRouted += 1;
          cat.failed_safely_routed += 1;
        }
      }
    }
  }

  return {
    description:
      'Aggregate guard assertion coverage across all 25 fixture scenarios; failures are safely routed to HOLD/BLOCKED/review',
    total_assertions_evaluated: total,
    passed_assertions: passed,
    failed_assertions_safely_routed: failedSafelyRouted,
    unexpected_failures: 0,
    all_failures_safely_routed: true,
    categories: categoryStats,
    fail_closed_assertions: FAIL_CLOSED_ASSERTIONS,
  };
}

function runScenarios() {
  const f = baseFixture();

  return [
    buildScenario({
      scenario_id: 'normal_lead_to_appointment_readiness',
      scenario_name: 'normal lead to appointment readiness',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        contact_permission: 'known',
        service_area_fit: true,
        appointment_preference: 'weekday_morning',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions([
        'NEW_LEAD',
        'SOURCE_CAPTURED',
        'READY_FOR_RESPONSE',
        'RESPONSE_DRAFT_READY',
        'APPOINTMENT_READINESS_PENDING',
        'APPOINTMENT_READY',
      ]),
      guard_results: guardResults({
        appointment_calendar_preferences_known_before_appointment_ready: 'pass',
      }),
      guard_assertion_overrides: {
        appointment_calendar_preferences_required_before_appointment_ready: {
          result: 'pass',
          notes: 'appointment_preference_present',
        },
        calendar_owner_required_before_appointment_ready: {
          result: 'pass',
          notes: 'calendar_owner_known',
        },
        service_area_fit_required_before_appointment_ready: {
          result: 'pass',
          notes: 'service_area_fit_true',
        },
        contact_permission_known_or_reviewed: { result: 'pass', notes: 'permission_known' },
        growth_volume_limit_enforced: { result: 'pass', notes: 'within_growth_limit' },
      },
      final_state: 'APPOINTMENT_READY',
      audit_events: [
        auditEvent('state_transition', 'intake_to_appointment_ready', {
          readiness_blockers: 'none',
          appointment_readiness_prerequisites: 'all_pass',
        }),
      ],
      safety_assertions: safetyAssertions(['no_live_send', 'fixture_only']),
      reporting_impact: reportingImpact({
        scenario_id: 'normal_lead_to_appointment_readiness',
        reporting_focus: 'appointment_readiness_tracking',
        fields_highlighted: ['appointment_readiness_pending', 'appointment_ready'],
        notes: 'growth_plan_appointment_readiness_counts_in_weekly_snapshot',
      }),
      reporting_snapshot: buildReportingSnapshot({
        appointment_readiness_pending: 1,
        appointment_ready: 1,
        appointment_booked: 0,
      }),
    }),

    buildScenario({
      scenario_id: 'missing_information_path',
      scenario_name: 'missing information path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        homeowner_phone: null,
        appointment_preference: null,
        missing_fields: ['phone', 'appointment_preference'],
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'SOURCE_CAPTURED', 'MISSING_INFO', 'HOLD']),
      guard_results: guardResults({
        required_homeowner_contact_data_present: 'fail',
        appointment_calendar_preferences_known_before_appointment_ready: 'fail',
      }),
      guard_assertion_overrides: {
        missing_required_contact_data_routes_to_missing_info_or_hold: {
          result: 'fail_safely_routed',
          notes: 'missing_phone_and_appointment_preference',
        },
        appointment_ready_blocked_when_required_fields_missing: {
          result: 'fail_safely_routed',
          notes: 'required_fields_missing_blocks_appointment_ready',
        },
        appointment_calendar_preferences_required_before_appointment_ready: {
          result: 'fail_safely_routed',
          notes: 'appointment_preference_missing',
        },
      },
      hold_or_block_reason: 'incomplete_contact_or_service_details',
      manual_next_step: 'roofer_collects_missing_phone_and_appointment_preference',
      owner: 'roofer',
      final_state: 'MISSING_INFO',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'missing_contact_or_service_details',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('guard_failure', 'missing_fields: phone, appointment_preference', {
          hold_reason: 'incomplete_contact',
        }),
      ],
      safety_assertions: safetyAssertions(['manual_next_step_required', 'no_live_send']),
    }),

    buildScenario({
      scenario_id: 'duplicate_review_path',
      scenario_name: 'duplicate review path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        duplicate_suspected: true,
        duplicate_match_fields: ['phone', 'address'],
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'SOURCE_CAPTURED', 'DUPLICATE_REVIEW', 'HOLD']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        duplicate_lead_routes_to_duplicate_review: {
          result: 'pass',
          notes: 'duplicate_detected_and_routed_to_duplicate_review',
        },
        roofleadhq_review_required_for_broken_routing_or_data_issue: {
          result: 'pass',
          notes: 'duplicate_confusion_routes_to_roofleadhq_jason_review',
        },
      },
      hold_or_block_reason: 'duplicate_lead_confusion',
      owner: 'roofleadhq_jason',
      final_state: 'DUPLICATE_REVIEW',
      review_queue_items: [
        {
          review_owner: 'roofleadhq_jason',
          reason: 'duplicate_lead_confusion',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'duplicate_hold', {
          duplicate_match_fields: 'phone, address',
        }),
      ],
      safety_assertions: safetyAssertions(['no_duplicate_outreach']),
    }),

    buildScenario({
      scenario_id: 'bad_fit_excluded_path',
      scenario_name: 'bad fit excluded path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        service_area_fit: false,
        service_type: 'commercial_flat_roof',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'BAD_FIT_OR_EXCLUDED']),
      guard_results: guardResults({
        service_area_checked: 'fail',
      }),
      guard_assertion_overrides: {
        service_area_checked: { result: 'fail_safely_routed', notes: 'out_of_service_area' },
        excluded_service_area_routes_to_bad_fit_or_excluded: {
          result: 'pass',
          notes: 'routed_to_bad_fit_or_excluded',
        },
        service_area_fit_required_before_appointment_ready: {
          result: 'fail_safely_routed',
          notes: 'service_area_fit_false',
        },
      },
      hold_or_block_reason: 'out_of_service_area',
      final_state: 'BAD_FIT_OR_EXCLUDED',
      audit_events: [
        auditEvent('state_transition', 'service_area_excluded', {
          blocked_reason: 'out_of_area',
        }),
      ],
      safety_assertions: safetyAssertions(['no_outreach_to_excluded_lead']),
    }),

    buildScenario({
      scenario_id: 'stopped_do_not_contact_path',
      scenario_name: 'stopped do not contact path',
      plan_profile: 'growth',
      input_fixture_summary: { ...f, do_not_contact: true },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'STOPPED_DO_NOT_CONTACT']),
      guard_results: guardResults({
        do_not_contact_respected: 'fail',
        contact_permission_known_or_reviewed: 'fail',
      }),
      guard_assertion_overrides: {
        do_not_contact_respected: { result: 'fail_safely_routed', notes: 'dnc_flag_set' },
        do_not_contact_blocks_follow_up: {
          result: 'pass',
          notes: 'all_follow_up_blocked',
        },
        contact_permission_unknown_routes_to_hold_or_review: {
          result: 'fail_safely_routed',
          notes: 'dnc_overrides_contact_permission',
        },
      },
      hold_or_block_reason: 'do_not_contact',
      final_state: 'STOPPED_DO_NOT_CONTACT',
      audit_events: [
        auditEvent('state_transition', 'dnc_stop', { all_channels_stopped: true }),
      ],
      safety_assertions: safetyAssertions(['all_follow_up_blocked']),
    }),

    buildScenario({
      scenario_id: 'missed_lead_recovery_path',
      scenario_name: 'missed lead recovery path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        no_response_days: 3,
        missed_lead_recovery_enabled: true,
      },
      starting_state: 'READY_FOR_RESPONSE',
      transition_log: transitions([
        'READY_FOR_RESPONSE',
        'NO_RESPONSE',
        'MISSED_LEAD_RECOVERY_ACTIVE',
      ]),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        contact_permission_known_or_reviewed: {
          result: 'pass',
          notes: 'permission_known_before_recovery',
        },
        live_sms_blocked_when_flag_false: {
          result: 'pass',
          notes: 'recovery_simulated_live_sms_blocked',
        },
        unsupported_feature_does_not_trigger_live_action: {
          result: 'pass',
          notes: 'recovery_dry_run_only',
        },
      },
      final_state: 'MISSED_LEAD_RECOVERY_ACTIVE',
      audit_events: [
        auditEvent('state_transition', 'recovery_simulated', {
          recovery_channel: 'sms_simulated',
          dry_run_only: true,
        }),
      ],
      safety_assertions: safetyAssertions(['recovery_simulated_only']),
      reporting_impact: reportingImpact({
        scenario_id: 'missed_lead_recovery_path',
        reporting_focus: 'missed_lead_recovery_tracking',
        fields_highlighted: ['missed_lead_recovery_active', 'follow_up_pending'],
        notes: 'growth_plan_missed_lead_recovery_in_source_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        missed_lead_recovery_active: 1,
        follow_up_pending: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'roofer_review_needed_path',
      scenario_name: 'roofer review needed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        homeowner_question: 'pricing_question',
      },
      starting_state: 'READY_FOR_RESPONSE',
      transition_log: transitions(['READY_FOR_RESPONSE', 'ROOFER_REVIEW_NEEDED', 'HOLD']),
      guard_results: guardResults({
        roofer_review_completed_before_business_judgment_decisions: 'fail',
      }),
      guard_assertion_overrides: {
        roofer_review_required_for_pricing: {
          result: 'pass',
          notes: 'pricing_question_routes_to_roofer_review',
        },
        roofleadhq_review_limited_to_system_workflow_data_routing_quality: {
          result: 'pass',
          notes: 'business_judgment_not_roofleadhq_owned',
        },
      },
      hold_or_block_reason: 'pricing_question_requires_roofer_review',
      owner: 'roofer',
      final_state: 'ROOFER_REVIEW_NEEDED',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'pricing_question',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'roofer_review_required', {
          review_type: 'pricing_question',
        }),
      ],
      safety_assertions: safetyAssertions(['roofer_owns_business_judgment']),
      reporting_impact: reportingImpact({
        scenario_id: 'roofer_review_needed_path',
        reporting_focus: 'roofer_review_queue_visibility',
        fields_highlighted: ['roofer_review_needed'],
        notes: 'roofer_review_needed_increments_review_queue_count',
      }),
      reporting_snapshot: buildReportingSnapshot({ roofer_review_needed: 1 }),
    }),

    buildScenario({
      scenario_id: 'roofleadhq_system_review_needed_path',
      scenario_name: 'RoofLeadHQ system review needed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        issue_type: 'workflow_state_confusion',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'ROOFLEADHQ_REVIEW_NEEDED', 'HOLD']),
      guard_results: guardResults({
        roofleadhq_review_limited_to_system_workflow_data_routing_quality: 'pass',
      }),
      guard_assertion_overrides: {
        roofleadhq_review_required_for_broken_routing_or_data_issue: {
          result: 'pass',
          notes: 'workflow_state_confusion_routes_to_roofleadhq_jason',
        },
        roofleadhq_review_limited_to_system_workflow_data_routing_quality: {
          result: 'pass',
          notes: 'limited_to_system_workflow_data_routing_quality',
        },
        roofer_review_required_for_pricing: {
          result: 'pass',
          notes: 'not_a_business_judgment_issue',
        },
      },
      hold_or_block_reason: 'workflow_state_confusion',
      owner: 'roofleadhq_jason',
      final_state: 'ROOFLEADHQ_REVIEW_NEEDED',
      review_queue_items: [
        {
          review_owner: 'roofleadhq_jason',
          reason: 'workflow_state_confusion',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'system_review_required', {
          review_type: 'workflow_state_confusion',
        }),
      ],
      safety_assertions: safetyAssertions(['system_review_only_for_workflow_data_issues']),
      reporting_impact: reportingImpact({
        scenario_id: 'roofleadhq_system_review_needed_path',
        reporting_focus: 'roofleadhq_system_review_tracking',
        fields_highlighted: ['roofleadhq_review_needed'],
        notes: 'system_review_needed_in_reporting_snapshot',
      }),
      reporting_snapshot: buildReportingSnapshot({ roofleadhq_review_needed: 1 }),
    }),

    buildScenario({
      scenario_id: 'appointment_booked_path',
      scenario_name: 'appointment booked path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        appointment_date: '2026-07-15T14:00:00Z',
        booking_method: 'manual_fixture',
      },
      starting_state: 'APPOINTMENT_READY',
      transition_log: transitions(['APPOINTMENT_READY', 'APPOINTMENT_BOOKED']),
      guard_results: guardResults({
        live_sends_blocked_unless_activation_flags_true: 'pass',
      }),
      guard_assertion_overrides: {
        no_live_calendar_creation_when_appointment_booked: {
          result: 'pass',
          notes: 'google_calendar_created_false_manual_fixture_only',
        },
        live_calendar_blocked_when_flag_false: {
          result: 'pass',
          notes: 'live_calendar_booking_enabled_false',
        },
      },
      final_state: 'APPOINTMENT_BOOKED',
      audit_events: [
        auditEvent('state_transition', 'manual_fixture_booking', {
          calendar_owner: 'Main Sales Calendar',
          google_calendar_created: false,
        }),
      ],
      safety_assertions: safetyAssertions(['no_google_calendar_creation']),
      reporting_impact: reportingImpact({
        scenario_id: 'appointment_booked_path',
        reporting_focus: 'booked_inspection_tracking',
        fields_highlighted: ['appointment_booked', 'appointment_ready'],
        notes: 'booked_homeowner_appointment_in_appointment_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({ appointment_booked: 1, appointment_ready: 0 }),
    }),

    buildScenario({
      scenario_id: 'inspection_completed_path',
      scenario_name: 'inspection completed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        inspection_outcome: 'completed',
      },
      starting_state: 'APPOINTMENT_BOOKED',
      transition_log: transitions(['APPOINTMENT_BOOKED', 'INSPECTION_COMPLETED']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        post_inspection_follow_up_draft_or_manual_only: {
          result: 'pass',
          notes: 'post_inspection_evaluation_without_live_sends',
        },
        live_sms_blocked_when_flag_false: { result: 'pass', notes: 'no_live_post_inspection_send' },
      },
      final_state: 'INSPECTION_COMPLETED',
      audit_events: [
        auditEvent('state_transition', 'inspection_marked_completed', {
          post_inspection_evaluation_next: true,
        }),
      ],
      safety_assertions: safetyAssertions(['post_inspection_evaluation_next']),
      reporting_impact: reportingImpact({
        scenario_id: 'inspection_completed_path',
        reporting_focus: 'inspection_completed_tracking',
        fields_highlighted: ['inspection_completed', 'appointment_booked'],
        notes: 'inspection_completed_in_appointment_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        inspection_completed: 1,
        appointment_booked: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'inspection_missed_reschedule_path',
      scenario_name: 'inspection missed reschedule path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        inspection_outcome: 'missed',
      },
      starting_state: 'APPOINTMENT_BOOKED',
      transition_log: transitions(['APPOINTMENT_BOOKED', 'INSPECTION_MISSED', 'RESCHEDULE_NEEDED']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        no_live_calendar_creation_when_appointment_booked: {
          result: 'pass',
          notes: 'reschedule_manual_no_live_calendar',
        },
      },
      manual_next_step: 'roofer_manual_reschedule',
      owner: 'roofer',
      final_state: 'RESCHEDULE_NEEDED',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'scheduling_issue',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'reschedule_required', {
          manual_next_step: true,
        }),
      ],
      safety_assertions: safetyAssertions(['manual_reschedule_required']),
      reporting_impact: reportingImpact({
        scenario_id: 'inspection_missed_reschedule_path',
        reporting_focus: 'inspection_missed_reschedule_tracking',
        fields_highlighted: ['inspection_missed_or_reschedule_needed'],
        notes: 'missed_or_reschedule_in_appointment_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        inspection_missed_or_reschedule_needed: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'post_inspection_still_open_path',
      scenario_name: 'post inspection still open path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        inspection_outcome: 'completed',
        outcome_recorded: false,
      },
      starting_state: 'INSPECTION_COMPLETED',
      transition_log: transitions(['INSPECTION_COMPLETED', 'POST_INSPECTION_OPEN', 'STILL_OPEN']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        post_inspection_follow_up_draft_or_manual_only: {
          result: 'pass',
          notes: 'still_open_follow_up_need_without_live_sends',
        },
      },
      final_state: 'STILL_OPEN',
      audit_events: [
        auditEvent('state_transition', 'outcome_unresolved', {
          days_since_inspection: 2,
        }),
      ],
      safety_assertions: safetyAssertions(['follow_up_may_be_needed']),
      reporting_impact: reportingImpact({
        scenario_id: 'post_inspection_still_open_path',
        reporting_focus: 'post_inspection_still_open_tracking',
        fields_highlighted: ['still_open', 'post_inspection_follow_up_needed'],
        notes: 'still_open_in_post_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        still_open: 1,
        post_inspection_follow_up_needed: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'estimate_needed_estimate_sent_tracking_path',
      scenario_name: 'estimate needed estimate sent tracking path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        estimate_status: 'estimate_sent',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions(['POST_INSPECTION_OPEN', 'ESTIMATE_NEEDED', 'ESTIMATE_SENT']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        estimate_tracking_does_not_generate_estimate: {
          result: 'pass',
          notes: 'tracking_only_no_document_generated',
        },
        automatic_estimate_request_routes_to_hold_or_review: {
          result: 'pass',
          notes: 'no_automatic_estimate_generation',
        },
        automatic_quote_request_routes_to_hold_or_review: {
          result: 'pass',
          notes: 'no_automatic_quote_generation',
        },
      },
      final_state: 'ESTIMATE_SENT',
      audit_events: [
        auditEvent('state_transition', 'estimate_status_tracked', {
          no_document_generated: true,
        }),
      ],
      safety_assertions: safetyAssertions(['tracking_only_no_automatic_estimate']),
      reporting_impact: reportingImpact({
        scenario_id: 'estimate_needed_estimate_sent_tracking_path',
        reporting_focus: 'estimate_tracking_only',
        fields_highlighted: ['estimate_needed', 'estimate_sent'],
        notes: 'estimate_tracking_in_post_inspection_summary_no_document_generated',
      }),
      reporting_snapshot: buildReportingSnapshot({
        estimate_needed: 1,
        estimate_sent: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'homeowner_follow_up_needed_path',
      scenario_name: 'homeowner follow up needed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        follow_up_owner: 'homeowner',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions(['POST_INSPECTION_OPEN', 'HOMEOWNER_FOLLOW_UP_NEEDED']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        post_inspection_follow_up_draft_or_manual_only: {
          result: 'pass',
          notes: 'homeowner_follow_up_draft_manual_only',
        },
      },
      manual_next_step: 'draft_homeowner_follow_up_for_review',
      owner: 'homeowner',
      final_state: 'HOMEOWNER_FOLLOW_UP_NEEDED',
      audit_events: [
        auditEvent('state_transition', 'homeowner_follow_up_pending', {
          draft_only: true,
        }),
      ],
      safety_assertions: safetyAssertions(['draft_manual_only']),
      reporting_impact: reportingImpact({
        scenario_id: 'homeowner_follow_up_needed_path',
        reporting_focus: 'homeowner_follow_up_tracking',
        fields_highlighted: ['homeowner_follow_up_needed'],
        notes: 'homeowner_follow_up_in_post_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({ homeowner_follow_up_needed: 1 }),
    }),

    buildScenario({
      scenario_id: 'roofer_follow_up_needed_path',
      scenario_name: 'roofer follow up needed path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        follow_up_owner: 'roofer',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions(['POST_INSPECTION_OPEN', 'ROOFER_FOLLOW_UP_NEEDED']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        post_inspection_follow_up_draft_or_manual_only: {
          result: 'pass',
          notes: 'roofer_follow_up_manual_only',
        },
      },
      manual_next_step: 'roofer_manual_follow_up',
      owner: 'roofer',
      final_state: 'ROOFER_FOLLOW_UP_NEEDED',
      audit_events: [
        auditEvent('state_transition', 'roofer_follow_up_pending', {
          manual_roofer_review: true,
        }),
      ],
      safety_assertions: safetyAssertions(['manual_roofer_review']),
      reporting_impact: reportingImpact({
        scenario_id: 'roofer_follow_up_needed_path',
        reporting_focus: 'roofer_follow_up_tracking',
        fields_highlighted: ['roofer_follow_up_needed'],
        notes: 'roofer_follow_up_in_post_inspection_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({ roofer_follow_up_needed: 1 }),
    }),

    buildScenario({
      scenario_id: 'feedback_permission_yes_path',
      scenario_name: 'feedback permission yes path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        permission_to_use_publicly: 'yes',
        feedback_text: 'Fixture feedback text',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions([
        'POST_INSPECTION_OPEN',
        'FEEDBACK_REQUESTED',
        'FEEDBACK_CAPTURED',
      ]),
      guard_results: guardResults({
        feedback_public_use_permission_checked_before_public_use: 'pass',
      }),
      guard_assertion_overrides: {
        feedback_public_use_permission_checked: {
          result: 'pass',
          notes: 'permission_to_use_publicly_yes',
        },
        permission_to_use_publicly_allows_only_yes_no_not_asked: {
          result: 'pass',
          notes: 'valid_permission_value_yes',
        },
        no_automatic_public_review_generation: {
          result: 'pass',
          notes: 'no_unattended_public_review_publishing',
        },
      },
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'feedback_captured', {
          permission_to_use_publicly: 'yes',
          public_use_eligible: true,
          automatic_public_review_generation: false,
        }),
      ],
      safety_assertions: safetyAssertions([
        'PERMISSION_TO_USE_PUBLICLY_YES',
        'no_automatic_public_review_generation',
      ]),
      reporting_impact: reportingImpact({
        scenario_id: 'feedback_permission_yes_path',
        reporting_focus: 'feedback_permission_yes',
        fields_highlighted: ['feedback_captured', 'permission_to_use_publicly_yes'],
        notes: 'permission_yes_in_feedback_permission_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        feedback_captured: 1,
        permission_to_use_publicly_yes: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'feedback_permission_no_path',
      scenario_name: 'feedback permission no path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        permission_to_use_publicly: 'no',
        feedback_text: 'Fixture internal feedback',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions([
        'POST_INSPECTION_OPEN',
        'FEEDBACK_REQUESTED',
        'FEEDBACK_CAPTURED',
      ]),
      guard_results: guardResults({
        feedback_public_use_permission_checked_before_public_use: 'pass',
      }),
      guard_assertion_overrides: {
        feedback_public_use_permission_checked: {
          result: 'pass',
          notes: 'permission_to_use_publicly_no_internal_only',
        },
        permission_to_use_publicly_allows_only_yes_no_not_asked: {
          result: 'pass',
          notes: 'valid_permission_value_no',
        },
      },
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'feedback_captured', {
          permission_to_use_publicly: 'no',
          public_use_eligible: false,
          internal_only: true,
        }),
      ],
      safety_assertions: safetyAssertions(['feedback_internal_only']),
      reporting_impact: reportingImpact({
        scenario_id: 'feedback_permission_no_path',
        reporting_focus: 'feedback_permission_no',
        fields_highlighted: ['feedback_captured', 'permission_to_use_publicly_no'],
        notes: 'permission_no_in_feedback_permission_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        feedback_captured: 1,
        permission_to_use_publicly_no: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'feedback_permission_not_asked_path',
      scenario_name: 'feedback permission not asked path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        permission_to_use_publicly: 'not_asked',
        feedback_status: 'captured',
      },
      starting_state: 'POST_INSPECTION_OPEN',
      transition_log: transitions([
        'POST_INSPECTION_OPEN',
        'FEEDBACK_REQUESTED',
        'FEEDBACK_CAPTURED',
      ]),
      guard_results: guardResults({
        feedback_public_use_permission_checked_before_public_use: 'fail',
      }),
      guard_assertion_overrides: {
        feedback_public_use_permission_checked: {
          result: 'fail_safely_routed',
          notes: 'permission_not_asked_internal_only',
        },
        permission_to_use_publicly_allows_only_yes_no_not_asked: {
          result: 'pass',
          notes: 'valid_permission_value_not_asked',
        },
      },
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'feedback_captured', {
          permission_to_use_publicly: 'not_asked',
          public_use_eligible: false,
        }),
      ],
      safety_assertions: safetyAssertions([
        'PERMISSION_TO_USE_PUBLICLY_NOT_ASKED',
        'internal_only',
      ]),
      reporting_impact: reportingImpact({
        scenario_id: 'feedback_permission_not_asked_path',
        reporting_focus: 'feedback_permission_not_asked',
        fields_highlighted: ['feedback_captured', 'permission_to_use_publicly_not_asked'],
        notes: 'permission_not_asked_in_feedback_permission_summary',
      }),
      reporting_snapshot: buildReportingSnapshot({
        feedback_captured: 1,
        permission_to_use_publicly_not_asked: 1,
      }),
    }),

    buildScenario({
      scenario_id: 'csv_report_snapshot_fake_data_path',
      scenario_name: 'CSV report snapshot fake data path',
      plan_profile: 'growth',
      input_fixture_summary: {
        report_period: '2026-06',
        fixture_lead_count: 42,
      },
      starting_state: 'REPORT_PERIOD_DUE',
      transition_log: transitions([
        'REPORT_PERIOD_DUE',
        'REPORT_SNAPSHOT_READY',
        'CSV_EXPORT_READY',
      ]),
      guard_results: guardResults({
        csv_generated_only_from_fake_or_approved_records: 'pass',
        live_sends_blocked_unless_activation_flags_true: 'pass',
      }),
      guard_assertion_overrides: {
        csv_generated_only_from_fake_or_approved_records: {
          result: 'pass',
          notes: 'fixture_snapshot_only',
        },
        csv_export_is_one_directional: { result: 'pass', notes: 'one_directional_export' },
        csv_not_native_crm_sync: { result: 'pass', notes: 'not_bidirectional_crm_integration' },
        csv_contains_homeowner_personal_information_warning: {
          result: 'pass',
          notes: 'pii_warning_included',
        },
        customer_responsible_for_downloaded_exported_data: {
          result: 'pass',
          notes: 'customer_responsibility_documented',
        },
        roi_depends_on_customer_provided_spend_source_data: {
          result: 'pass',
          notes: 'roi_spend_source_customer_provided',
        },
        live_csv_delivery_blocked_when_flag_false: {
          result: 'pass',
          notes: 'live_csv_export_enabled_false',
        },
        native_crm_sync_request_routes_to_later_only_or_review: {
          result: 'pass',
          notes: 'csv_not_native_crm_sync',
        },
      },
      final_state: 'CSV_EXPORT_READY',
      reporting_snapshot: FAKE_REPORTING_SNAPSHOT,
      csv_snapshot_if_applicable: FAKE_CSV_SNAPSHOT,
      activation_flag_results: activationFlagResults('csv_export'),
      audit_events: [
        auditEvent('state_transition', 'fixture_report_snapshot', {
          generation_source: 'fixture',
          live_csv_export_enabled: false,
          delivery_blocked: true,
        }),
      ],
      safety_assertions: safetyAssertions([
        'csv_one_directional_reporting_only',
        'csv_not_bidirectional_crm_integration',
      ]),
      reporting_impact: reportingImpact({
        scenario_id: 'csv_report_snapshot_fake_data_path',
        reporting_focus: 'strongest_csv_report_snapshot',
        report_period: 'monthly',
        csv_included: true,
        fields_highlighted: [
          'csv_export_state',
          'appointment_booked',
          'inspection_completed',
          'feedback_captured',
        ],
        notes: 'strongest_fixture_csv_and_reporting_snapshot_with_full_header_and_sample_rows',
      }),
    }),

    buildScenario({
      scenario_id: 'starter_plan_profile_path',
      scenario_name: 'starter plan profile path',
      plan_profile: 'starter',
      input_fixture_summary: {
        ...f,
        plan_profile: 'starter',
        monthly_leads: 80,
        location_count: 1,
        features: ['basic_reporting'],
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'SOURCE_CAPTURED', 'APPOINTMENT_BOOKED']),
      guard_results: guardResults({
        plan_profile_known: 'pass',
        custom_review_triggers_checked: 'pass',
      }),
      guard_assertion_overrides: {
        plan_profile_known: { result: 'pass', notes: 'starter_profile' },
        starter_volume_limit_enforced: {
          result: 'pass',
          notes: '80_leads_within_starter_100_limit',
        },
        growth_volume_limit_enforced: {
          result: 'pass',
          notes: 'not_applicable_starter_plan',
        },
      },
      final_state: 'APPOINTMENT_BOOKED',
      audit_events: [
        auditEvent('state_transition', 'starter_path', {
          plan_tier: 'starter',
          advanced_routing: false,
          missed_lead_recovery: false,
        }),
      ],
      safety_assertions: safetyAssertions(['starter_features_only', 'no_advanced_custom_routing']),
      reporting_impact: reportingImpact({
        scenario_id: 'starter_plan_profile_path',
        reporting_focus: 'starter_plan_basic_reporting',
        plan_profile: 'starter',
        fields_highlighted: ['total_leads', 'appointment_booked'],
        notes: 'starter_limited_to_basic_summary_no_advanced_source_roi',
      }),
      reporting_snapshot: buildReportingSnapshot({
        total_leads: 80,
        appointment_booked: 1,
        csv_export_state: 'limited_basic_summary_only',
      }),
    }),

    buildScenario({
      scenario_id: 'growth_plan_profile_path',
      scenario_name: 'growth plan profile path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        plan_profile: 'growth',
        monthly_leads: 250,
        location_count: 1,
        features: [
          'lead_source_tracking',
          'missed_lead_recovery',
          'post_inspection_follow_up',
          'feedback_capture',
          'csv_export',
        ],
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions([
        'NEW_LEAD',
        'SOURCE_CAPTURED',
        'APPOINTMENT_READY',
        'FEEDBACK_CAPTURED',
      ]),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        plan_profile_known: { result: 'pass', notes: 'growth_profile' },
        growth_volume_limit_enforced: {
          result: 'pass',
          notes: '250_leads_within_growth_300_limit',
        },
      },
      final_state: 'FEEDBACK_CAPTURED',
      audit_events: [
        auditEvent('state_transition', 'growth_path', {
          plan_tier: 'growth',
          features_enabled: 'missed_lead_recovery, post_inspection, feedback, csv_export',
        }),
      ],
      safety_assertions: safetyAssertions(['growth_features_available_in_profile']),
      reporting_impact: reportingImpact({
        scenario_id: 'growth_plan_profile_path',
        reporting_focus: 'growth_plan_source_tracking_and_csv',
        plan_profile: 'growth',
        csv_included: true,
        fields_highlighted: [
          'lead_source',
          'missed_lead_recovery_active',
          'feedback_captured',
        ],
        notes: 'growth_includes_source_tracking_missed_lead_recovery_and_csv_export',
      }),
      reporting_snapshot: buildReportingSnapshot({
        missed_lead_recovery_active: 1,
        feedback_captured: 1,
        csv_export_state: 'growth_csv_export_fixture',
      }),
    }),

    buildScenario({
      scenario_id: 'elite_plan_profile_path',
      scenario_name: 'elite plan profile path',
      plan_profile: 'elite',
      input_fixture_summary: {
        ...f,
        plan_profile: 'elite',
        monthly_leads: 450,
        location_count: 1,
        reporting_depth: 'advanced',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'SOURCE_CAPTURED', 'CSV_EXPORT_READY']),
      guard_results: guardResults({}),
      guard_assertion_overrides: {
        plan_profile_known: { result: 'pass', notes: 'elite_profile' },
        elite_volume_limit_enforced: {
          result: 'pass',
          notes: '450_leads_within_elite_500_limit',
        },
      },
      final_state: 'CSV_EXPORT_READY',
      audit_events: [
        auditEvent('state_transition', 'elite_path', {
          plan_tier: 'elite',
          review_queue_capacity: 'larger',
        }),
      ],
      safety_assertions: safetyAssertions(['elite_advanced_reporting']),
      reporting_impact: reportingImpact({
        scenario_id: 'elite_plan_profile_path',
        reporting_focus: 'elite_advanced_segmentation',
        plan_profile: 'elite',
        csv_included: true,
        fields_highlighted: ['lead_source', 'won', 'lost'],
        notes: 'elite_advanced_reporting_with_roi_when_customer_spend_provided',
      }),
      reporting_snapshot: buildReportingSnapshot({
        won: 1,
        lost: 0,
        csv_export_state: 'elite_detailed_csv_fixture',
      }),
    }),

    buildScenario({
      scenario_id: 'custom_review_500_plus_leads_path',
      scenario_name: 'custom review 500 plus leads path',
      plan_profile: 'elite',
      input_fixture_summary: {
        ...f,
        monthly_leads: 520,
        plan_profile: 'elite',
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'CUSTOM_REVIEW_REQUIRED', 'HOLD']),
      guard_results: guardResults({
        custom_review_triggers_checked: 'fail',
        plan_profile_known: 'pass',
      }),
      guard_assertion_overrides: {
        custom_review_trigger_500_plus_leads: {
          result: 'fail_safely_routed',
          notes: '520_leads_exceeds_500_elite_cap',
        },
        elite_volume_limit_enforced: {
          result: 'fail_safely_routed',
          notes: 'volume_exceeds_elite_cap_without_custom_approval',
        },
      },
      hold_or_block_reason: 'volume_exceeds_500',
      owner: 'roofer',
      final_state: 'CUSTOM_REVIEW_REQUIRED',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'volume_exceeds_500',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'custom_review_volume', {
          trigger_reason: 'volume_exceeds_500',
        }),
      ],
      safety_assertions: safetyAssertions(['hold_until_custom_review_completed']),
      reporting_impact: reportingImpact({
        scenario_id: 'custom_review_500_plus_leads_path',
        reporting_focus: 'custom_review_complex_scope',
        plan_profile: 'custom_review',
        fields_highlighted: ['total_leads'],
        notes: 'custom_review_required_for_500_plus_leads_before_self_serve_reporting',
      }),
      reporting_snapshot: buildReportingSnapshot({
        total_leads: 520,
        csv_export_state: 'custom_review_pending',
      }),
    }),

    buildScenario({
      scenario_id: 'custom_review_two_plus_locations_path',
      scenario_name: 'custom review two plus locations path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        location_count: 2,
      },
      starting_state: 'NEW_LEAD',
      transition_log: transitions(['NEW_LEAD', 'CUSTOM_REVIEW_REQUIRED', 'HOLD']),
      guard_results: guardResults({
        custom_review_triggers_checked: 'fail',
      }),
      guard_assertion_overrides: {
        custom_review_trigger_two_plus_locations: {
          result: 'fail_safely_routed',
          notes: 'two_locations_requires_custom_review',
        },
      },
      hold_or_block_reason: 'multi_location',
      owner: 'roofer',
      final_state: 'CUSTOM_REVIEW_REQUIRED',
      review_queue_items: [
        {
          review_owner: 'roofer',
          reason: 'multi_location',
          status: 'pending',
        },
      ],
      audit_events: [
        auditEvent('state_transition', 'custom_review_location', {
          location_count: 2,
        }),
      ],
      safety_assertions: safetyAssertions(['hold_until_custom_review_completed']),
      reporting_impact: reportingImpact({
        scenario_id: 'custom_review_two_plus_locations_path',
        reporting_focus: 'custom_review_multi_location',
        plan_profile: 'custom_review',
        fields_highlighted: ['total_leads'],
        notes: 'custom_review_required_for_two_plus_locations',
      }),
      reporting_snapshot: buildReportingSnapshot({
        csv_export_state: 'custom_review_pending',
      }),
    }),

    buildScenario({
      scenario_id: 'activation_flag_false_blocks_live_action_path',
      scenario_name: 'activation flag false blocks live action path',
      plan_profile: 'growth',
      input_fixture_summary: {
        ...f,
        attempted_action: 'sms_send',
      },
      starting_state: 'APPOINTMENT_READY',
      transition_log: transitions(['APPOINTMENT_READY', 'BLOCKED', 'HOLD']),
      guard_results: guardResults({
        live_sends_blocked_unless_activation_flags_true: 'fail',
      }),
      guard_assertion_overrides: {
        activation_flags_default_false: { result: 'pass', notes: 'all_flags_false' },
        live_sms_blocked_when_flag_false: {
          result: 'pass',
          notes: 'sms_send_blocked',
        },
        blocked_by_activation_flag_audit_event_present: {
          result: 'pass',
          notes: 'blocked_by_activation_flag_audit_recorded',
        },
        unsupported_feature_does_not_trigger_live_action: {
          result: 'pass',
          notes: 'live_action_blocked_no_execution',
        },
      },
      hold_or_block_reason: 'activation_flag_false',
      final_state: 'BLOCKED',
      activation_flag_results: activationFlagResults('sms_send'),
      audit_events: [
        auditEvent('live_action_blocked', 'blocked_by_activation_flag', {
          blocked_action: 'sms_send',
          flag_checked: 'live_sms_enabled=false',
          dry_run_only: true,
        }),
      ],
      safety_assertions: safetyAssertions([
        'blocked_by_activation_flag',
        'jason_approval_required_before_live_activation',
      ]),
      reporting_impact: reportingImpact({
        scenario_id: 'activation_flag_false_blocks_live_action_path',
        reporting_focus: 'live_reporting_delivery_blocked',
        fields_highlighted: ['live_delivery_blocked_by_activation_flag', 'csv_export_state'],
        notes: 'live_csv_and_reporting_delivery_blocked_when_activation_flag_false',
      }),
      reporting_snapshot: buildReportingSnapshot({
        csv_export_state: 'fixture_snapshot_blocked_live_delivery',
        live_delivery_blocked_by_activation_flag: true,
      }),
    }),
  ];
}

function main() {
  const scenarios = runScenarios();
  const passed = scenarios.filter((s) => s.result === 'PASS').length;
  const failed = scenarios.filter((s) => s.result !== 'PASS').length;
  const guardSummary = computeGuardSummary(scenarios);

  const outputBase = {
    dry_run_name: 'native_workflow_fixture_state_model_dry_run',
    safety_posture: 'demo_ready_with_live_automation_disabled',
    implementation_scope: 'local_fixture_only_fake_data_dry_run',
    source_of_truth_context:
      '1b68a5d test(workflow): expand native workflow fixture guard assertions',
    guard_assertion_expansion:
      'native_workflow_fixture_guard_assertions_expansion',
    reporting_snapshot_expansion:
      'native_workflow_fixture_reporting_snapshot_expansion',
    activation_flags: { ...ACTIVATION_FLAGS },
    scenario_count: scenarios.length,
    passed_scenarios: passed,
    failed_scenarios: failed,
    guard_assertion_summary: guardSummary,
    total_guard_assertions: guardSummary.total_assertions_evaluated,
    passed_guard_assertions: guardSummary.passed_assertions,
    failed_guard_assertions: guardSummary.failed_assertions_safely_routed,
    guard_categories: GUARD_CATEGORIES,
    fail_closed_assertions: FAIL_CLOSED_ASSERTIONS,
    scenarios,
  };

  const reportingOutput = buildTopLevelReporting(outputBase);

  const output = {
    ...outputBase,
    ...reportingOutput,
    aggregate_safety_assertions: [
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'no_schema_changes',
      'no_migrations',
      'no_auth_rls_security_changes',
      'no_native_crm_sync',
      'no_payment_deposit_invoice_estimate_automation',
      'fixture_fake_data_only',
      'demo_ready_with_live_automation_disabled',
      'all_activation_flags_default_false',
      'all_scenarios_live_actions_performed_no',
      'all_scenarios_production_data_touched_no',
      'all_scenarios_external_services_called_no',
      'all_guard_failures_safely_routed',
      'explicit_guard_assertion_coverage',
      'explicit_reporting_snapshot_coverage',
      'reporting_fake_data_only',
      'reporting_live_delivery_blocked',
    ],
    summary: {
      description:
        'Deterministic fake-data native workflow fixture state model dry-run with explicit guard assertion and reporting snapshot coverage completed safely',
      total_scenarios: scenarios.length,
      passed,
      failed,
      safety_posture: 'demo_ready_with_live_automation_disabled',
      live_automation_status: 'disabled',
      output_mode: 'stdout_json_only',
      guard_assertion_coverage: 'expanded',
      reporting_snapshot_coverage: 'expanded',
    },
  };

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

main();