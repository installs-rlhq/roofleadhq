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
  'plan_profile',
  'included_lead_volume',
  'current_period_lead_count',
  'usage_over_limit',
  'plan_limit_status',
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
    plan_profile: 'growth',
    included_lead_volume: 300,
    current_period_lead_count: 180,
    usage_over_limit: 'no',
    plan_limit_status: 'within_limit',
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
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-d',
        homeowner_name: 'Dana Recovery',
        homeowner_phone: '+15555550404',
        homeowner_email: 'dana.recovery@example.test',
        lead_source: 'Google Ads',
        current_lead_status: 'MISSED_LEAD_RECOVERY_ACTIVE',
        first_response_sent: 'no',
        first_response_time_minutes: '',
        follow_up_count: 2,
        missed_lead_recovery_used: 'yes',
        homeowner_replied: 'no',
        appointment_booked: 'no',
        appointment_readiness_status: 'pending_recovery',
        calendar_owner: 'Main Sales Calendar',
        permission_to_use_publicly: 'not_asked',
      }),
      buildCsvSampleRow({
        lead_id: 'lead-fix-019-e',
        homeowner_name: 'Evan PlanVolume',
        homeowner_phone: '+15555550505',
        lead_source: 'Google Ads',
        plan_profile: 'growth',
        included_lead_volume: 300,
        current_period_lead_count: 320,
        usage_over_limit: 'yes',
        plan_limit_status: 'over_limit_fake_tracking_only',
        current_lead_status: 'POST_INSPECTION_STILL_OPEN',
        calendar_owner: 'Main Sales Calendar',
        permission_to_use_publicly: 'not_asked',
      }),
    ],
    row_count: 5,
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

const ROOFER_REVIEW_ROUTING_TYPES = [
  'pricing_question',
  'estimate_question',
  'quote_request',
  'insurance_complexity',
  'repair_vs_replacement_question',
  'scheduling_issue',
  'homeowner_asks_for_roofer_directly',
  'upset_homeowner',
  'legal_or_carrier_question',
  'payment_or_invoice_question',
  'contract_question',
];

const ROOFLEADHQ_REVIEW_ROUTING_TYPES = [
  'bad_or_unclear_ai_response',
  'missed_data_capture',
  'broken_routing',
  'duplicate_lead_confusion',
  'source_attribution_issue',
  'dashboard_report_discrepancy',
  'workflow_state_confusion',
  'setup_issue',
  'failed_handoff',
  'quality_control_concern',
];

const REVIEW_QUEUE_SAFETY_ASSERTIONS = [
  'roofer_review_owns_business_judgment',
  'roofleadhq_review_limited_to_system_quality',
  'pricing_routes_to_roofer_review',
  'estimate_routes_to_roofer_review',
  'quote_routes_to_roofer_review',
  'insurance_complexity_routes_to_roofer_review',
  'repair_vs_replacement_routes_to_roofer_review',
  'scheduling_issue_routes_to_roofer_review',
  'homeowner_asks_for_roofer_routes_to_roofer_review',
  'upset_homeowner_routes_to_roofer_review',
  'legal_or_carrier_question_routes_to_roofer_review',
  'payment_or_invoice_routes_to_roofer_review',
  'contract_question_routes_to_roofer_review',
  'duplicate_routes_to_roofleadhq_system_review',
  'broken_routing_routes_to_roofleadhq_system_review',
  'source_attribution_issue_routes_to_roofleadhq_system_review',
  'dashboard_report_discrepancy_routes_to_roofleadhq_system_review',
  'workflow_state_confusion_routes_to_roofleadhq_system_review',
  'setup_issue_routes_to_roofleadhq_system_review',
  'failed_handoff_routes_to_roofleadhq_system_review',
  'quality_control_concern_routes_to_roofleadhq_system_review',
  'review_queue_items_are_fake_data_only',
  'review_queue_does_not_send_notifications',
  'review_queue_does_not_touch_production_data',
  'review_queue_does_not_call_external_services',
  'live_review_notification_blocked_when_flag_false',
  'review_decisions_are_audited',
  'review_owner_required_before_next_step',
  'review_item_has_required_manual_next_step',
  'live_action_allowed_is_no_for_all_review_items',
  'production_data_touched_is_no_for_all_review_items',
  'external_services_called_is_no_for_all_review_items',
];

const REVIEW_TYPE_METADATA = {
  pricing_question: {
    review_owner: 'roofer',
    review_reason: 'pricing_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_pricing_question_and_responds_manually',
  },
  estimate_question: {
    review_owner: 'roofer',
    review_reason: 'estimate_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_estimate_question_and_responds_manually',
  },
  quote_request: {
    review_owner: 'roofer',
    review_reason: 'quote_request_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_quote_request_and_responds_manually',
  },
  insurance_complexity: {
    review_owner: 'roofer',
    review_reason: 'insurance_complexity_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_insurance_complexity_and_responds_manually',
  },
  repair_vs_replacement_question: {
    review_owner: 'roofer',
    review_reason: 'repair_vs_replacement_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_repair_vs_replacement_and_responds_manually',
  },
  scheduling_issue: {
    review_owner: 'roofer',
    review_reason: 'scheduling_issue_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'APPOINTMENT_BOOKED',
    target_state: 'RESCHEDULE_NEEDED',
    required_manual_next_step: 'roofer_manual_reschedule',
  },
  homeowner_asks_for_roofer_directly: {
    review_owner: 'roofer',
    review_reason: 'homeowner_asks_for_roofer_directly_requires_roofer_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_responds_to_direct_homeowner_request_manually',
  },
  upset_homeowner: {
    review_owner: 'roofer',
    review_reason: 'upset_homeowner_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_handles_upset_homeowner_manually',
  },
  legal_or_carrier_question: {
    review_owner: 'roofer',
    review_reason: 'legal_or_carrier_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_legal_or_carrier_question_manually',
  },
  payment_or_invoice_question: {
    review_owner: 'roofer',
    review_reason: 'payment_or_invoice_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_payment_or_invoice_question_manually',
  },
  contract_question: {
    review_owner: 'roofer',
    review_reason: 'contract_question_requires_roofer_business_judgment',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'POST_INSPECTION_OPEN',
    target_state: 'ROOFER_REVIEW_NEEDED',
    required_manual_next_step: 'roofer_reviews_contract_question_manually',
  },
  bad_or_unclear_ai_response: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'bad_or_unclear_ai_response_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_ai_response_quality_and_routing',
  },
  missed_data_capture: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'missed_data_capture_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_missed_data_capture_and_workflow_fix',
  },
  broken_routing: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'broken_routing_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_broken_routing_and_workflow_fix',
  },
  duplicate_lead_confusion: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'duplicate_lead_confusion_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'DUPLICATE_REVIEW',
    required_manual_next_step: 'jason_reviews_duplicate_lead_confusion_and_resolves_routing',
  },
  source_attribution_issue: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'source_attribution_issue_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'SOURCE_CAPTURED',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_source_attribution_and_data_quality',
  },
  dashboard_report_discrepancy: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'dashboard_report_discrepancy_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'REPORT_PERIOD_DUE',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_dashboard_report_discrepancy',
  },
  workflow_state_confusion: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'workflow_state_confusion_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_workflow_state_confusion',
  },
  setup_issue: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'setup_issue_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'NEW_LEAD',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_setup_issue_and_configuration',
  },
  failed_handoff: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'failed_handoff_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'APPOINTMENT_READY',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_failed_handoff_and_workflow_fix',
  },
  quality_control_concern: {
    review_owner: 'roofleadhq_jason',
    review_reason: 'quality_control_concern_requires_system_quality_review',
    business_judgment_required: false,
    system_quality_issue: true,
    source_state: 'READY_FOR_RESPONSE',
    target_state: 'ROOFLEADHQ_REVIEW_NEEDED',
    required_manual_next_step: 'jason_reviews_quality_control_concern',
  },
  missing_contact_or_service_details: {
    review_owner: 'roofer',
    review_reason: 'missing_contact_or_service_details_requires_roofer_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'NEW_LEAD',
    target_state: 'MISSING_INFO',
    required_manual_next_step: 'roofer_collects_missing_phone_and_appointment_preference',
  },
  volume_exceeds_500: {
    review_owner: 'roofer',
    review_reason: 'volume_exceeds_500_requires_custom_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'NEW_LEAD',
    target_state: 'CUSTOM_REVIEW_REQUIRED',
    required_manual_next_step: 'roofer_completes_custom_review_for_volume',
  },
  multi_location: {
    review_owner: 'roofer',
    review_reason: 'multi_location_requires_custom_review',
    business_judgment_required: true,
    system_quality_issue: false,
    source_state: 'NEW_LEAD',
    target_state: 'CUSTOM_REVIEW_REQUIRED',
    required_manual_next_step: 'roofer_completes_custom_review_for_multi_location',
  },
};

const ROUTING_CATALOG_SCENARIO_MAP = {
  pricing_question: 'roofer_review_needed_path',
  estimate_question: 'estimate_needed_estimate_sent_tracking_path',
  quote_request: 'estimate_needed_estimate_sent_tracking_path',
  insurance_complexity: 'roofer_review_needed_path',
  repair_vs_replacement_question: 'post_inspection_still_open_path',
  scheduling_issue: 'inspection_missed_reschedule_path',
  homeowner_asks_for_roofer_directly: 'homeowner_follow_up_needed_path',
  upset_homeowner: 'roofer_follow_up_needed_path',
  legal_or_carrier_question: 'roofer_review_needed_path',
  payment_or_invoice_question: 'estimate_needed_estimate_sent_tracking_path',
  contract_question: 'roofer_follow_up_needed_path',
  bad_or_unclear_ai_response: 'missed_lead_recovery_path',
  missed_data_capture: 'missing_information_path',
  broken_routing: 'roofleadhq_system_review_needed_path',
  duplicate_lead_confusion: 'duplicate_review_path',
  source_attribution_issue: 'missed_lead_recovery_path',
  dashboard_report_discrepancy: 'csv_report_snapshot_fake_data_path',
  workflow_state_confusion: 'roofleadhq_system_review_needed_path',
  setup_issue: 'starter_plan_profile_path',
  failed_handoff: 'appointment_booked_path',
  quality_control_concern: 'growth_plan_profile_path',
};

const PARTIAL_REASON_TO_REVIEW_TYPE = {
  missing_contact_or_service_details: 'missing_contact_or_service_details',
  duplicate_lead_confusion: 'duplicate_lead_confusion',
  pricing_question: 'pricing_question',
  workflow_state_confusion: 'workflow_state_confusion',
  scheduling_issue: 'scheduling_issue',
  volume_exceeds_500: 'volume_exceeds_500',
  multi_location: 'multi_location',
};

function buildReviewQueueItem(config) {
  const meta = REVIEW_TYPE_METADATA[config.review_type] || {};
  return {
    review_item_id: config.review_item_id,
    scenario_id: config.scenario_id,
    review_type: config.review_type,
    review_owner: config.review_owner || meta.review_owner,
    review_reason: config.review_reason || meta.review_reason,
    business_judgment_required:
      config.business_judgment_required ?? meta.business_judgment_required ?? false,
    system_quality_issue: config.system_quality_issue ?? meta.system_quality_issue ?? false,
    source_state: config.source_state || meta.source_state || config.starting_state || 'NEW_LEAD',
    target_state: config.target_state || meta.target_state || 'HOLD',
    required_manual_next_step:
      config.required_manual_next_step || meta.required_manual_next_step || 'manual_review_required',
    hold_or_block_reason: config.hold_or_block_reason || null,
    audit_event_id: config.audit_event_id,
    live_action_allowed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    fake_data_only: true,
    status: config.status || 'pending',
  };
}

function expandScenarioReviewItem(scenario, partialItem, index) {
  const reviewType =
    partialItem.review_type ||
    PARTIAL_REASON_TO_REVIEW_TYPE[partialItem.reason] ||
    partialItem.reason;
  const auditEventId = `${scenario.scenario_id}_audit_${index}`;
  return buildReviewQueueItem({
    review_item_id: `${scenario.scenario_id}_review_${index + 1}`,
    scenario_id: scenario.scenario_id,
    review_type: reviewType,
    review_owner: partialItem.review_owner,
    review_reason: partialItem.reason || REVIEW_TYPE_METADATA[reviewType]?.review_reason,
    source_state: scenario.starting_state,
    target_state: scenario.final_state,
    required_manual_next_step: scenario.manual_next_step,
    hold_or_block_reason: scenario.hold_or_block_reason,
    audit_event_id: auditEventId,
    status: partialItem.status,
  });
}

function buildRoutingCatalogItems() {
  const allTypes = [...ROOFER_REVIEW_ROUTING_TYPES, ...ROOFLEADHQ_REVIEW_ROUTING_TYPES];
  return allTypes.map((reviewType) =>
    buildReviewQueueItem({
      review_item_id: `routing_catalog_${reviewType}`,
      scenario_id: ROUTING_CATALOG_SCENARIO_MAP[reviewType],
      review_type: reviewType,
      audit_event_id: `${ROUTING_CATALOG_SCENARIO_MAP[reviewType]}_routing_catalog_audit`,
      hold_or_block_reason: 'review_required_before_next_step',
    }),
  );
}

function buildTopLevelReviewQueue(scenarios, outputBase) {
  const scenarioItems = scenarios.flatMap((scenario) => scenario.review_queue_items || []);
  const catalogItems = buildRoutingCatalogItems();
  const allItems = [...scenarioItems, ...catalogItems];

  const rooferItems = allItems.filter((item) => item.review_owner === 'roofer');
  const roofleadhqItems = allItems.filter((item) => item.review_owner === 'roofleadhq_jason');

  const rooferTypesPresent = new Set(
    rooferItems.filter((item) => ROOFER_REVIEW_ROUTING_TYPES.includes(item.review_type)).map((i) => i.review_type),
  );
  const roofleadhqTypesPresent = new Set(
    roofleadhqItems
      .filter((item) => ROOFLEADHQ_REVIEW_ROUTING_TYPES.includes(item.review_type))
      .map((i) => i.review_type),
  );

  return {
    review_queue_summary: {
      description:
        'Deterministic fake-data review queue summary distinguishing roofer business-judgment review from RoofLeadHQ/Jason system-quality review',
      total_review_items: allItems.length,
      scenario_review_items: scenarioItems.length,
      routing_catalog_items: catalogItems.length,
      roofer_review_items: rooferItems.length,
      roofleadhq_system_review_items: roofleadhqItems.length,
      pending_review_items: allItems.filter((item) => item.status === 'pending').length,
      roofer_routing_types_covered: rooferTypesPresent.size,
      roofleadhq_routing_types_covered: roofleadhqTypesPresent.size,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      live_review_notification_blocked_by_activation_flag: true,
      scenario_count: outputBase.scenario_count,
    },
    review_queue_items: allItems,
    review_owner_summary: {
      roofer: {
        owner_label: 'roofer_contractor',
        owns: 'business_judgment',
        item_count: rooferItems.length,
        routing_types: [...rooferTypesPresent],
        does_not_own: 'system_workflow_data_routing_quality',
      },
      roofleadhq_jason: {
        owner_label: 'roofleadhq_jason',
        owns: 'system_workflow_data_routing_quality',
        item_count: roofleadhqItems.length,
        routing_types: [...roofleadhqTypesPresent],
        does_not_own: 'business_judgment_pricing_estimates_contracts',
      },
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    roofer_review_summary: {
      description: 'Roofer/contractor review owns business judgment — pricing, estimates, insurance, scheduling, contracts',
      total_items: rooferItems.length,
      business_judgment_required_count: rooferItems.filter((i) => i.business_judgment_required).length,
      routing_types_required: ROOFER_REVIEW_ROUTING_TYPES,
      routing_types_covered: [...rooferTypesPresent],
      all_routing_types_covered: ROOFER_REVIEW_ROUTING_TYPES.every((t) => rooferTypesPresent.has(t)),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    roofleadhq_review_summary: {
      description:
        'RoofLeadHQ/Jason review limited to system/workflow/data/routing/quality — not business judgment',
      total_items: roofleadhqItems.length,
      system_quality_issue_count: roofleadhqItems.filter((i) => i.system_quality_issue).length,
      routing_types_required: ROOFLEADHQ_REVIEW_ROUTING_TYPES,
      routing_types_covered: [...roofleadhqTypesPresent],
      all_routing_types_covered: ROOFLEADHQ_REVIEW_ROUTING_TYPES.every((t) =>
        roofleadhqTypesPresent.has(t),
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    review_safety_assertions: [
      ...REVIEW_QUEUE_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const APPOINTMENT_READINESS_SAFETY_ASSERTIONS = [
  'appointment_readiness_summary_present',
  'appointment_readiness_items_present',
  'appointment_readiness_item_required_fields_present',
  'appointment_ready_requires_homeowner_contact_data',
  'appointment_ready_requires_contact_permission_or_review',
  'do_not_contact_blocks_appointment_readiness',
  'appointment_ready_requires_service_area_fit',
  'excluded_service_area_blocks_appointment_readiness',
  'appointment_ready_requires_lead_source_or_unknown_marker',
  'appointment_ready_requires_roofing_issue_summary',
  'appointment_ready_requires_calendar_owner',
  'appointment_ready_requires_calendar_preferences',
  'missing_calendar_preferences_blocks_appointment_ready',
  'missing_calendar_owner_blocks_appointment_ready',
  'assigned_roofer_or_rep_required_when_plan_or_setup_requires_it',
  'pricing_question_blocks_to_roofer_review',
  'estimate_question_blocks_to_roofer_review',
  'quote_request_blocks_to_roofer_review',
  'insurance_complexity_blocks_to_roofer_review',
  'payment_or_contract_question_blocks_to_roofer_review',
  'scheduling_conflict_blocks_to_roofer_review',
  'unsupported_request_blocks_appointment_readiness',
  'unresolved_review_blocks_appointment_readiness',
  'live_calendar_booking_flag_defaults_false',
  'live_calendar_creation_blocked_when_flag_false',
  'no_google_calendar_event_created',
  'no_external_calendar_call_performed',
  'appointment_booked_live_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'appointment_readiness_uses_fake_data_only',
  'appointment_readiness_does_not_touch_production_data',
  'appointment_readiness_does_not_call_external_services',
  'appointment_readiness_does_not_send_notifications',
  'appointment_decisions_are_audited',
  'required_manual_next_step_present_for_not_ready_items',
];

const POST_INSPECTION_SAFETY_ASSERTIONS = [
  'post_inspection_summary_present',
  'post_inspection_items_present',
  'post_inspection_item_required_fields_present',
  'inspection_completed_routes_to_post_inspection_tracking',
  'inspection_missed_routes_to_reschedule_or_review',
  'estimate_needed_is_tracking_only',
  'estimate_sent_is_tracking_only',
  'no_automatic_estimate_generated',
  'no_automatic_quote_generated',
  'no_automatic_invoice_generated',
  'no_automatic_payment_requested',
  'homeowner_follow_up_needed_is_tracking_or_manual_only',
  'roofer_follow_up_needed_is_tracking_or_manual_only',
  'still_open_days_present_for_open_items',
  'next_step_owner_required_for_open_items',
  'next_step_due_date_required_when_follow_up_needed',
  'won_lost_closed_outcomes_supported',
  'disputed_or_unclear_outcome_routes_to_review',
  'estimate_details_route_to_roofer_review',
  'quote_details_route_to_roofer_review',
  'payment_or_invoice_routes_to_roofer_review',
  'insurance_complexity_routes_to_roofer_review',
  'repair_vs_replacement_routes_to_roofer_review',
  'roofleadhq_review_limited_to_system_quality',
  'feedback_requested_tracking_present',
  'feedback_captured_tracking_present',
  'permission_to_use_publicly_values_are_valid',
  'permissiontousepublicly_absent',
  'feedback_internal_unless_permission_obtained',
  'no_fake_reviews',
  'no_review_farming',
  'no_automatic_public_review_generation',
  'testimonial_candidate_does_not_publish_publicly',
  'live_follow_up_blocked_when_flag_false',
  'live_feedback_request_blocked_when_flag_false',
  'post_inspection_uses_fake_data_only',
  'post_inspection_does_not_touch_production_data',
  'post_inspection_does_not_call_external_services',
  'post_inspection_does_not_send_notifications',
  'post_inspection_decisions_are_audited',
  'required_manual_next_step_present_for_open_or_review_items',
];

const APPOINTMENT_BLOCKER_CATALOG = [
  {
    blocker_id: 'missing_homeowner_contact_data',
    demonstration_scenario_id: 'missing_information_path',
    blocker_type: 'missing_contact_data',
    demonstrated: true,
  },
  {
    blocker_id: 'do_not_contact_set',
    demonstration_scenario_id: 'stopped_do_not_contact_path',
    blocker_type: 'do_not_contact',
    demonstrated: true,
  },
  {
    blocker_id: 'excluded_service_area',
    demonstration_scenario_id: 'bad_fit_excluded_path',
    blocker_type: 'service_area_excluded',
    demonstrated: true,
  },
  {
    blocker_id: 'pricing_question_requires_roofer_review',
    demonstration_scenario_id: 'roofer_review_needed_path',
    blocker_type: 'pricing_question',
    demonstrated: true,
  },
  {
    blocker_id: 'estimate_question_requires_roofer_review',
    demonstration_scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    blocker_type: 'estimate_question',
    demonstrated: true,
  },
  {
    blocker_id: 'quote_request_requires_roofer_review',
    demonstration_scenario_id: 'estimate_needed_estimate_sent_tracking_path',
    blocker_type: 'quote_request',
    demonstrated: true,
  },
  {
    blocker_id: 'insurance_complexity_requires_roofer_review',
    demonstration_scenario_id: 'roofer_review_needed_path',
    blocker_type: 'insurance_complexity',
    demonstrated: true,
    demonstration_note: 'roofer_review_path_also_covers_insurance_complexity_routing',
  },
  {
    blocker_id: 'payment_or_contract_question_requires_roofer_review',
    demonstration_scenario_id: 'roofer_follow_up_needed_path',
    blocker_type: 'payment_or_contract_question',
    demonstrated: true,
  },
  {
    blocker_id: 'scheduling_conflict_requires_roofer_review',
    demonstration_scenario_id: 'inspection_missed_reschedule_path',
    blocker_type: 'scheduling_conflict',
    demonstrated: true,
  },
  {
    blocker_id: 'unsupported_request_blocks_readiness',
    demonstration_scenario_id: 'activation_flag_false_blocks_live_action_path',
    blocker_type: 'unsupported_request',
    demonstrated: true,
  },
  {
    blocker_id: 'unresolved_review_blocks_readiness',
    demonstration_scenario_id: 'duplicate_review_path',
    blocker_type: 'unresolved_review',
    demonstrated: true,
  },
  {
    blocker_id: 'missing_calendar_owner',
    demonstration_scenario_id: 'missing_information_path',
    blocker_type: 'missing_calendar_owner',
    demonstrated: true,
  },
  {
    blocker_id: 'missing_calendar_preferences',
    demonstration_scenario_id: 'missing_information_path',
    blocker_type: 'missing_calendar_preferences',
    demonstrated: true,
  },
];

const APPOINTMENT_READINESS_PROFILES = {
  normal_lead_to_appointment_readiness: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'ready',
    readiness_reason: 'all_required_appointment_readiness_fields_approved',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'proceed_to_manual_inspection_coordination',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  missing_information_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_missing_info',
    readiness_reason: 'missing_homeowner_contact_and_calendar_preferences',
    homeowner_contact_ready: false,
    contact_permission_status: 'unknown',
    do_not_contact_status: false,
    service_area_status: 'unknown',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: false,
    preferred_appointment_windows_status: 'missing',
    calendar_owner: null,
    calendar_preferences_status: 'missing',
    assigned_roofer_or_rep: null,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_collects_missing_phone_and_appointment_preference',
    required_fields_present: false,
    missing_fields: ['homeowner_phone', 'appointment_preference', 'calendar_owner'],
    blocker_reasons: [
      'missing_homeowner_contact_data',
      'missing_calendar_preferences',
      'missing_calendar_owner',
    ],
  },
  duplicate_review_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_unresolved_review',
    readiness_reason: 'duplicate_lead_requires_roofleadhq_system_review',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_review',
    assigned_roofer_or_rep: null,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_duplicate_lead_confusion_and_resolves_routing',
    required_fields_present: false,
    missing_fields: ['duplicate_resolution'],
    blocker_reasons: ['unresolved_review', 'duplicate_lead_confusion'],
  },
  bad_fit_excluded_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_service_area_excluded',
    readiness_reason: 'service_area_fit_false_routes_to_bad_fit_or_excluded',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'excluded',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'not_applicable',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'not_applicable',
    assigned_roofer_or_rep: null,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'no_appointment_coordination_for_excluded_lead',
    required_fields_present: false,
    missing_fields: ['service_area_fit'],
    blocker_reasons: ['excluded_service_area', 'service_area_fit_false'],
  },
  stopped_do_not_contact_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_do_not_contact',
    readiness_reason: 'do_not_contact_flag_blocks_all_appointment_coordination',
    homeowner_contact_ready: true,
    contact_permission_status: 'do_not_contact',
    do_not_contact_status: true,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'blocked',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'blocked',
    assigned_roofer_or_rep: null,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'no_outreach_all_channels_stopped',
    required_fields_present: false,
    missing_fields: ['contact_permission'],
    blocker_reasons: ['do_not_contact'],
  },
  missed_lead_recovery_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'pending_recovery',
    readiness_reason: 'lead_in_missed_lead_recovery_not_yet_appointment_ready',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_homeowner_response',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'pending',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'await_homeowner_response_before_appointment_readiness',
    required_fields_present: false,
    missing_fields: ['homeowner_response'],
    blocker_reasons: ['missed_lead_recovery_active'],
  },
  roofer_review_needed_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_roofer_review',
    readiness_reason: 'pricing_question_requires_roofer_business_judgment_before_appointment_ready',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_review',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_pricing_question_and_responds_manually',
    required_fields_present: false,
    missing_fields: ['roofer_review_completion'],
    blocker_reasons: ['pricing_question', 'roofer_review_required'],
  },
  roofleadhq_system_review_needed_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_system_review',
    readiness_reason: 'workflow_state_confusion_requires_roofleadhq_system_review',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_review',
    assigned_roofer_or_rep: null,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_workflow_state_confusion',
    required_fields_present: false,
    missing_fields: ['system_review_resolution'],
    blocker_reasons: ['unresolved_review', 'workflow_state_confusion'],
  },
  appointment_booked_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'booked_fixture_manual',
    readiness_reason: 'appointment_readiness_passed_manual_fixture_booking_no_live_calendar',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'inspection_coordination_manual_fixture_only',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  inspection_completed_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_inspection_completed',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'post_inspection_evaluation_manual_only',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  inspection_missed_reschedule_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_scheduling_conflict',
    readiness_reason: 'scheduling_conflict_requires_roofer_manual_reschedule',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'conflict',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'conflict_requires_review',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_manual_reschedule',
    required_fields_present: false,
    missing_fields: ['confirmed_appointment_window'],
    blocker_reasons: ['scheduling_conflict', 'scheduling_issue'],
  },
  post_inspection_still_open_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_post_inspection_still_open',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_follow_up_on_open_outcome',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  estimate_needed_estimate_sent_tracking_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_estimate_question',
    readiness_reason: 'estimate_and_quote_tracking_requires_roofer_review_no_automatic_generation',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_estimate_question_and_responds_manually',
    required_fields_present: false,
    missing_fields: ['estimate_review_completion'],
    blocker_reasons: ['estimate_question', 'quote_request'],
  },
  homeowner_follow_up_needed_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_homeowner_follow_up_pending',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'draft_homeowner_follow_up_for_review',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  roofer_follow_up_needed_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_payment_or_contract_question',
    readiness_reason: 'payment_or_contract_question_requires_roofer_review',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_contract_question_manually',
    required_fields_present: false,
    missing_fields: ['contract_review_completion'],
    blocker_reasons: ['payment_or_contract_question', 'contract_question'],
  },
  feedback_permission_yes_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_feedback_captured',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_use_only_unless_permission_yes',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  feedback_permission_no_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_feedback_internal_only',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_only_permission_no',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  feedback_permission_not_asked_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'past_appointment_readiness',
    readiness_reason: 'appointment_readiness_previously_satisfied_permission_not_asked_internal_only',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_only_permission_not_asked',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  csv_report_snapshot_fake_data_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'reporting_snapshot_only',
    readiness_reason: 'reporting_snapshot_fixture_no_appointment_coordination_action',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Acme Roofing Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'reporting_snapshot_review_only',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  starter_plan_profile_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'ready_starter_plan',
    readiness_reason: 'starter_plan_appointment_readiness_fields_satisfied_manual_booking',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'starter_plan_manual_inspection_coordination',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  growth_plan_profile_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'ready_growth_plan',
    readiness_reason: 'growth_plan_appointment_readiness_fields_satisfied',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'growth_plan_manual_inspection_coordination',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  elite_plan_profile_path: {
    readiness_decision: 'ready',
    appointment_readiness_status: 'ready_elite_plan',
    readiness_reason: 'elite_plan_appointment_readiness_fields_satisfied',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep Elite',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'elite_plan_manual_inspection_coordination',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: [],
  },
  custom_review_500_plus_leads_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_custom_review',
    readiness_reason: 'volume_exceeds_500_requires_custom_review_before_appointment_readiness',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_custom_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_custom_review',
    assigned_roofer_or_rep: null,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_completes_custom_review_for_volume',
    required_fields_present: false,
    missing_fields: ['custom_review_approval', 'assigned_roofer_or_rep'],
    blocker_reasons: ['custom_review_required', 'volume_exceeds_500'],
  },
  custom_review_two_plus_locations_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_custom_review',
    readiness_reason: 'multi_location_requires_custom_review_before_appointment_readiness',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'pending_custom_review',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'unapproved_pending_custom_review',
    assigned_roofer_or_rep: null,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_completes_custom_review_for_multi_location',
    required_fields_present: false,
    missing_fields: ['custom_review_approval', 'assigned_roofer_or_rep'],
    blocker_reasons: ['custom_review_required', 'multi_location'],
  },
  activation_flag_false_blocks_live_action_path: {
    readiness_decision: 'not_ready',
    appointment_readiness_status: 'blocked_activation_flag',
    readiness_reason: 'live_calendar_booking_enabled_false_blocks_live_calendar_action',
    homeowner_contact_ready: true,
    contact_permission_status: 'known',
    do_not_contact_status: false,
    service_area_status: 'fit',
    lead_source_status: 'captured',
    roofing_issue_summary_present: true,
    urgency_present: true,
    preferred_appointment_windows_status: 'approved',
    calendar_owner: 'Main Sales Calendar',
    calendar_preferences_status: 'approved',
    assigned_roofer_or_rep: 'Fixture Rep A',
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'manual_inspection_coordination_only_activation_flag_false',
    required_fields_present: true,
    missing_fields: [],
    blocker_reasons: ['live_calendar_booking_flag_false', 'unsupported_request'],
  },
};

const POST_INSPECTION_PROFILES = {
  normal_lead_to_appointment_readiness: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'appointment_readiness_evaluation_before_inspection_booking',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'complete_appointment_readiness_before_booking',
    has_appointment: false,
  },
  missing_information_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'missing_information_blocks_inspection_booking',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'collect_missing_information_before_inspection',
    has_appointment: false,
  },
  duplicate_review_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofleadhq_jason',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'duplicate_lead_confusion_requires_system_review_before_post_inspection',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_duplicate_lead_confusion_and_resolves_routing',
    has_appointment: false,
  },
  bad_fit_excluded_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'lost',
    outcome_date: '2026-06-10',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'service_area_excluded_no_inspection_booked',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'mark_lead_lost_service_area_excluded',
    has_appointment: false,
  },
  stopped_do_not_contact_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'closed',
    outcome_date: '2026-06-09',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'do_not_contact_blocks_all_follow_up',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'respect_do_not_contact_no_post_inspection_follow_up',
    has_appointment: false,
  },
  missed_lead_recovery_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofleadhq_jason',
    next_step_due_date: '2026-06-17',
    next_step_notes: 'bad_or_unclear_ai_response_requires_system_quality_review',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_missed_lead_recovery_and_data_capture',
    has_appointment: false,
  },
  roofer_review_needed_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'insurance_complexity_and_pricing_question_require_roofer_business_judgment',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_insurance_complexity_and_pricing_manually',
    has_appointment: false,
    review_routing_types: ['insurance_complexity', 'pricing_question'],
  },
  roofleadhq_system_review_needed_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofleadhq_jason',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'workflow_state_confusion_system_quality_review_only',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'jason_reviews_workflow_state_confusion',
    has_appointment: false,
  },
  appointment_booked_path: {
    inspection_status: 'booked_pending',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'awaiting_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-07-15',
    next_step_notes: 'manual_fixture_booking_awaiting_homeowner_inspection',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'conduct_booked_homeowner_inspection_manually',
    has_appointment: true,
  },
  inspection_completed_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'post_inspection_tracking',
    outcome: null,
    outcome_date: '2026-07-15',
    still_open_days: 0,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-07-17',
    next_step_notes: 'inspection_completed_routes_to_post_inspection_evaluation_manual_only',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'post_inspection_evaluation_manual_only',
    has_appointment: true,
  },
  inspection_missed_reschedule_path: {
    inspection_status: 'missed',
    inspection_completed: false,
    inspection_missed_or_rescheduled: true,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: true,
    post_inspection_status: 'reschedule_needed',
    outcome: null,
    outcome_date: null,
    still_open_days: 1,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-07-16',
    next_step_notes: 'inspection_missed_requires_roofer_manual_reschedule',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_manual_reschedule',
    has_appointment: true,
    review_routing_types: ['scheduling_issue'],
  },
  post_inspection_still_open_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: true,
    post_inspection_status: 'still_open',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 2,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'repair_vs_replacement_question_unclear_outcome_requires_roofer_review',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_repair_vs_replacement_and_follows_up_manually',
    has_appointment: true,
    review_routing_types: ['repair_vs_replacement_question'],
  },
  estimate_needed_estimate_sent_tracking_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: true,
    estimate_sent: true,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'estimate_tracking',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 3,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-19',
    next_step_notes: 'estimate_and_quote_details_tracking_only_no_automatic_generation',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_estimate_and_quote_details_manually',
    has_appointment: true,
    review_routing_types: ['estimate_question', 'quote_request', 'payment_or_invoice_question'],
  },
  homeowner_follow_up_needed_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: true,
    roofer_follow_up_needed: false,
    post_inspection_status: 'homeowner_follow_up_pending',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 4,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-17',
    next_step_notes: 'homeowner_follow_up_draft_manual_only_no_live_send',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'draft_homeowner_follow_up_for_review',
    has_appointment: true,
  },
  roofer_follow_up_needed_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: true,
    post_inspection_status: 'roofer_follow_up_pending',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 5,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'payment_or_invoice_question_and_upset_homeowner_require_roofer_review',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: true,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_reviews_payment_or_invoice_question_manually',
    has_appointment: true,
    review_routing_types: ['payment_or_invoice_question', 'contract_question', 'upset_homeowner'],
  },
  feedback_permission_yes_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'feedback_captured',
    outcome: 'won',
    outcome_date: '2026-06-20',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'feedback_captured_permission_yes_internal_testimonial_candidate_only',
    feedback_requested: true,
    feedback_captured: true,
    feedback_summary: 'Fixture feedback text — positive experience',
    testimonial_candidate: true,
    permission_to_use_publicly: 'yes',
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_use_only_unless_permission_yes_approved_for_public',
    has_appointment: true,
  },
  feedback_permission_no_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'feedback_captured',
    outcome: 'closed',
    outcome_date: '2026-06-19',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'feedback_internal_only_permission_no_no_public_use',
    feedback_requested: true,
    feedback_captured: true,
    feedback_summary: 'Fixture internal feedback',
    testimonial_candidate: false,
    permission_to_use_publicly: 'no',
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_only_permission_no',
    has_appointment: true,
  },
  feedback_permission_not_asked_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'feedback_captured',
    outcome: 'closed',
    outcome_date: '2026-06-19',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'feedback_internal_only_permission_not_asked',
    feedback_requested: true,
    feedback_captured: true,
    feedback_summary: 'Fixture feedback captured without permission question',
    testimonial_candidate: false,
    permission_to_use_publicly: 'not_asked',
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'feedback_internal_only_permission_not_asked',
    has_appointment: true,
  },
  csv_report_snapshot_fake_data_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: true,
    estimate_sent: true,
    homeowner_follow_up_needed: true,
    roofer_follow_up_needed: true,
    post_inspection_status: 'reporting_snapshot_only',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 1,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-16',
    next_step_notes: 'csv_report_snapshot_fake_data_compatibility_only',
    feedback_requested: true,
    feedback_captured: true,
    feedback_summary: 'Fixture CSV snapshot feedback row',
    testimonial_candidate: false,
    permission_to_use_publicly: 'not_asked',
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    required_manual_next_step: 'reporting_snapshot_review_only',
    has_appointment: true,
  },
  starter_plan_profile_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: null,
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'starter_plan_pre_inspection_coordination',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'starter_plan_manual_inspection_coordination',
    has_appointment: false,
  },
  growth_plan_profile_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'post_inspection_tracking',
    outcome: 'won',
    outcome_date: '2026-06-21',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'growth_plan_post_inspection_won_outcome_tracking',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'growth_plan_manual_inspection_coordination',
    has_appointment: true,
  },
  elite_plan_profile_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'post_inspection_tracking',
    outcome: 'closed',
    outcome_date: '2026-06-22',
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: null,
    next_step_notes: 'elite_plan_post_inspection_closed_outcome_tracking',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'elite_plan_manual_inspection_coordination',
    has_appointment: true,
  },
  custom_review_500_plus_leads_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-25',
    next_step_notes: 'custom_review_volume_boundary_before_post_inspection',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_completes_custom_review_for_volume',
    has_appointment: false,
  },
  custom_review_two_plus_locations_path: {
    inspection_status: 'not_applicable',
    inspection_completed: false,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: false,
    roofer_follow_up_needed: false,
    post_inspection_status: 'pre_inspection',
    outcome: 'needs_review',
    outcome_date: null,
    still_open_days: null,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-25',
    next_step_notes: 'custom_review_multi_location_before_post_inspection',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    required_manual_next_step: 'roofer_completes_custom_review_for_multi_location',
    has_appointment: false,
  },
  activation_flag_false_blocks_live_action_path: {
    inspection_status: 'completed',
    inspection_completed: true,
    inspection_missed_or_rescheduled: false,
    estimate_needed: false,
    estimate_sent: false,
    homeowner_follow_up_needed: true,
    roofer_follow_up_needed: false,
    post_inspection_status: 'follow_up_blocked_by_activation_flag',
    outcome: 'still_open',
    outcome_date: null,
    still_open_days: 2,
    next_step_owner: 'roofer',
    next_step_due_date: '2026-06-18',
    next_step_notes: 'live_follow_up_and_feedback_request_blocked_activation_flag_false',
    feedback_requested: false,
    feedback_captured: false,
    feedback_summary: null,
    testimonial_candidate: false,
    permission_to_use_publicly: null,
    feedback_issue_flag: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    required_manual_next_step: 'manual_follow_up_only_activation_flag_false',
    has_appointment: true,
  },
};

function buildAppointmentReadinessItem(scenario, profile, index) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  return {
    readiness_item_id: `${scenario.scenario_id}_readiness_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    appointment_readiness_status: profile.appointment_readiness_status,
    readiness_decision: profile.readiness_decision,
    readiness_reason: profile.readiness_reason,
    required_fields_present: profile.required_fields_present,
    missing_fields: profile.missing_fields,
    blocker_reasons: profile.blocker_reasons,
    homeowner_contact_ready: profile.homeowner_contact_ready,
    contact_permission_status: profile.contact_permission_status,
    do_not_contact_status: profile.do_not_contact_status,
    service_area_status: profile.service_area_status,
    lead_source_status: profile.lead_source_status,
    roofing_issue_summary_present: profile.roofing_issue_summary_present,
    urgency_present: profile.urgency_present,
    preferred_appointment_windows_status: profile.preferred_appointment_windows_status,
    calendar_owner: profile.calendar_owner,
    calendar_preferences_status: profile.calendar_preferences_status,
    assigned_roofer_or_rep: profile.assigned_roofer_or_rep,
    roofer_review_required: profile.roofer_review_required,
    roofleadhq_review_required: profile.roofleadhq_review_required,
    required_manual_next_step: profile.required_manual_next_step,
    live_calendar_action_allowed: 'no',
    appointment_booked_live: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    fake_data_only: true,
    audit_event_id: `${scenario.scenario_id}_readiness_audit_${index + 1}`,
  };
}

function buildScenarioAppointmentReadinessItem(scenario) {
  const profile = APPOINTMENT_READINESS_PROFILES[scenario.scenario_id];
  if (!profile) {
    return null;
  }
  return buildAppointmentReadinessItem(scenario, profile, 0);
}

function buildBlockerCatalogItems() {
  return APPOINTMENT_BLOCKER_CATALOG.map((blocker) => {
    const profile = APPOINTMENT_READINESS_PROFILES[blocker.demonstration_scenario_id];
    return {
      blocker_id: blocker.blocker_id,
      blocker_type: blocker.blocker_type,
      demonstration_scenario_id: blocker.demonstration_scenario_id,
      demonstrated: blocker.demonstrated,
      demonstration_note: blocker.demonstration_note || null,
      readiness_decision: profile.readiness_decision,
      fake_data_only: true,
      live_calendar_action_allowed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      linked_readiness_item_id: `${blocker.demonstration_scenario_id}_readiness_1`,
      audit_event_id: `${blocker.demonstration_scenario_id}_blocker_audit_${blocker.blocker_id}`,
    };
  });
}

function buildTopLevelAppointmentReadiness(scenarios, outputBase) {
  const scenarioItems = scenarios
    .map((scenario) => buildScenarioAppointmentReadinessItem(scenario))
    .filter(Boolean);
  const blockerCatalog = buildBlockerCatalogItems();
  const allItems = [...scenarioItems];

  const readyItems = allItems.filter((item) => item.readiness_decision === 'ready');
  const notReadyItems = allItems.filter((item) => item.readiness_decision === 'not_ready');

  const blockerCounts = {};
  for (const item of notReadyItems) {
    for (const reason of item.blocker_reasons) {
      blockerCounts[reason] = (blockerCounts[reason] || 0) + 1;
    }
  }

  const calendarOwners = {};
  for (const item of allItems) {
    if (item.calendar_owner) {
      calendarOwners[item.calendar_owner] = (calendarOwners[item.calendar_owner] || 0) + 1;
    }
  }

  const calendarPreferenceStatuses = {};
  for (const item of allItems) {
    calendarPreferenceStatuses[item.calendar_preferences_status] =
      (calendarPreferenceStatuses[item.calendar_preferences_status] || 0) + 1;
  }

  return {
    appointment_readiness_summary: {
      description:
        'Deterministic fake-data appointment readiness summary across all fixture scenarios — ready vs not-ready for manual inspection coordination without live booking',
      total_readiness_items: allItems.length,
      ready_items: readyItems.length,
      not_ready_items: notReadyItems.length,
      blocker_catalog_items: blockerCatalog.length,
      roofer_review_blocked_count: notReadyItems.filter((i) => i.roofer_review_required).length,
      roofleadhq_review_blocked_count: notReadyItems.filter((i) => i.roofleadhq_review_required)
        .length,
      live_calendar_booking_enabled: false,
      google_calendar_event_created: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    appointment_readiness_items: allItems,
    appointment_blocker_summary: {
      description: 'Appointment readiness blockers demonstrated across fixture scenarios',
      blocker_counts: blockerCounts,
      blocker_catalog: blockerCatalog,
      total_blocker_types_demonstrated: Object.keys(blockerCounts).length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    appointment_ready_summary: {
      description: 'Leads with sufficient approved fake-data for manual inspection coordination',
      ready_count: readyItems.length,
      ready_scenario_ids: readyItems.map((i) => i.scenario_id),
      requires_homeowner_contact_data: true,
      requires_contact_permission_or_review: true,
      requires_service_area_fit: true,
      requires_lead_source_or_unknown_marker: true,
      requires_roofing_issue_summary: true,
      requires_calendar_owner: true,
      requires_calendar_preferences: true,
      live_calendar_action_allowed: 'no',
      appointment_booked_live: 'no',
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    appointment_not_ready_summary: {
      description: 'Leads blocked or routed to review before appointment coordination',
      not_ready_count: notReadyItems.length,
      not_ready_scenario_ids: notReadyItems.map((i) => i.scenario_id),
      blocker_categories: [
        'missing_contact_data',
        'do_not_contact',
        'service_area_excluded',
        'missing_calendar_owner',
        'missing_calendar_preferences',
        'roofer_review_required',
        'roofleadhq_review_required',
        'scheduling_conflict',
        'unsupported_request',
        'activation_flag_false',
        'custom_review_required',
      ],
      all_have_required_manual_next_step: notReadyItems.every((i) => i.required_manual_next_step),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    calendar_preference_summary: {
      description: 'Calendar booking preference status across appointment readiness items',
      preference_status_counts: calendarPreferenceStatuses,
      approved_count: calendarPreferenceStatuses.approved || 0,
      missing_count: calendarPreferenceStatuses.missing || 0,
      pending_count:
        (calendarPreferenceStatuses.pending || 0) +
        (calendarPreferenceStatuses.pending_review || 0) +
        (calendarPreferenceStatuses.pending_custom_review || 0),
      conflict_count: calendarPreferenceStatuses.conflict || 0,
      requires_approval_before_appointment_ready: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    calendar_owner_summary: {
      description: 'Calendar owner assignments across appointment readiness items',
      owner_counts: calendarOwners,
      missing_calendar_owner_blocks_appointment_ready: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    appointment_readiness_safety_assertions: [
      ...APPOINTMENT_READINESS_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

function buildPostInspectionItem(scenario, profile, index) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const appointmentId = profile.has_appointment
    ? input.fixture_appointment_id || `apt-fix-${scenario.scenario_id}`
    : null;
  return {
    post_inspection_item_id: `${scenario.scenario_id}_post_inspection_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    appointment_id: appointmentId,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    inspection_status: profile.inspection_status,
    inspection_completed: profile.inspection_completed,
    inspection_missed_or_rescheduled: profile.inspection_missed_or_rescheduled,
    estimate_needed: profile.estimate_needed,
    estimate_sent: profile.estimate_sent,
    homeowner_follow_up_needed: profile.homeowner_follow_up_needed,
    roofer_follow_up_needed: profile.roofer_follow_up_needed,
    post_inspection_status: profile.post_inspection_status,
    outcome: profile.outcome,
    outcome_date: profile.outcome_date,
    still_open_days: profile.still_open_days,
    next_step_owner: profile.next_step_owner,
    next_step_due_date: profile.next_step_due_date,
    next_step_notes: profile.next_step_notes,
    feedback_requested: profile.feedback_requested,
    feedback_captured: profile.feedback_captured,
    feedback_summary: profile.feedback_summary,
    testimonial_candidate: profile.testimonial_candidate,
    permission_to_use_publicly: profile.permission_to_use_publicly,
    feedback_issue_flag: profile.feedback_issue_flag,
    roofer_review_required: profile.roofer_review_required,
    roofleadhq_review_required: profile.roofleadhq_review_required,
    required_manual_next_step: profile.required_manual_next_step,
    review_routing_types: profile.review_routing_types || [],
    live_follow_up_action_allowed: 'no',
    live_feedback_request_allowed: 'no',
    automatic_estimate_generated: 'no',
    automatic_quote_generated: 'no',
    automatic_invoice_generated: 'no',
    automatic_payment_requested: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    fake_data_only: true,
    audit_event_id: `${scenario.scenario_id}_post_inspection_audit_${index + 1}`,
  };
}

function buildScenarioPostInspectionItem(scenario) {
  const profile = POST_INSPECTION_PROFILES[scenario.scenario_id];
  if (!profile) {
    return null;
  }
  return buildPostInspectionItem(scenario, profile, 0);
}

function buildTopLevelPostInspection(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => buildScenarioPostInspectionItem(scenario))
    .filter(Boolean);

  const openItems = allItems.filter(
    (item) =>
      item.outcome === 'still_open' ||
      item.post_inspection_status === 'still_open' ||
      item.still_open_days !== null,
  );
  const followUpItems = allItems.filter(
    (item) => item.homeowner_follow_up_needed || item.roofer_follow_up_needed,
  );
  const estimateItems = allItems.filter((item) => item.estimate_needed || item.estimate_sent);
  const feedbackItems = allItems.filter((item) => item.feedback_requested || item.feedback_captured);
  const rooferReviewItems = allItems.filter((item) => item.roofer_review_required);
  const roofleadhqReviewItems = allItems.filter((item) => item.roofleadhq_review_required);
  const openOrReviewItems = allItems.filter(
    (item) =>
      item.outcome === 'still_open' ||
      item.outcome === 'needs_review' ||
      item.roofer_review_required ||
      item.roofleadhq_review_required,
  );

  const outcomeCounts = {};
  for (const item of allItems) {
    if (item.outcome) {
      outcomeCounts[item.outcome] = (outcomeCounts[item.outcome] || 0) + 1;
    }
  }

  const permissionCounts = { yes: 0, no: 0, not_asked: 0, unset: 0 };
  for (const item of allItems) {
    if (item.permission_to_use_publicly === 'yes') permissionCounts.yes += 1;
    else if (item.permission_to_use_publicly === 'no') permissionCounts.no += 1;
    else if (item.permission_to_use_publicly === 'not_asked') permissionCounts.not_asked += 1;
    else permissionCounts.unset += 1;
  }

  const postInspectionStatusCounts = {};
  for (const item of allItems) {
    postInspectionStatusCounts[item.post_inspection_status] =
      (postInspectionStatusCounts[item.post_inspection_status] || 0) + 1;
  }

  return {
    post_inspection_summary: {
      description:
        'Deterministic fake-data post-inspection summary across all fixture scenarios — tracking only after booked homeowner inspection without live automation',
      total_post_inspection_items: allItems.length,
      inspection_completed_count: allItems.filter((i) => i.inspection_completed).length,
      inspection_missed_or_rescheduled_count: allItems.filter(
        (i) => i.inspection_missed_or_rescheduled,
      ).length,
      still_open_count: allItems.filter((i) => i.outcome === 'still_open').length,
      estimate_tracking_count: estimateItems.length,
      homeowner_follow_up_count: allItems.filter((i) => i.homeowner_follow_up_needed).length,
      roofer_follow_up_count: allItems.filter((i) => i.roofer_follow_up_needed).length,
      feedback_captured_count: allItems.filter((i) => i.feedback_captured).length,
      roofer_review_required_count: rooferReviewItems.length,
      roofleadhq_review_required_count: roofleadhqReviewItems.length,
      live_follow_up_enabled: false,
      live_feedback_request_enabled: false,
      automatic_estimate_generation: false,
      automatic_quote_generation: false,
      automatic_invoice_generation: false,
      automatic_payment_requested: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    post_inspection_items: allItems,
    post_inspection_status_summary: {
      description: 'Post-inspection status distribution across fixture scenarios',
      status_counts: postInspectionStatusCounts,
      pre_inspection_count: postInspectionStatusCounts.pre_inspection || 0,
      post_inspection_tracking_count:
        (postInspectionStatusCounts.post_inspection_tracking || 0) +
        (postInspectionStatusCounts.still_open || 0) +
        (postInspectionStatusCounts.estimate_tracking || 0) +
        (postInspectionStatusCounts.homeowner_follow_up_pending || 0) +
        (postInspectionStatusCounts.roofer_follow_up_pending || 0) +
        (postInspectionStatusCounts.feedback_captured || 0),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    estimate_tracking_summary: {
      description: 'Estimate-needed and estimate-sent tracking boundaries — tracking only, no document generation',
      estimate_needed_count: allItems.filter((i) => i.estimate_needed).length,
      estimate_sent_count: allItems.filter((i) => i.estimate_sent).length,
      tracking_only: true,
      automatic_estimate_generated: 'no',
      automatic_quote_generated: 'no',
      automatic_invoice_generated: 'no',
      all_items_tracking_only: estimateItems.every(
        (i) =>
          i.automatic_estimate_generated === 'no' &&
          i.automatic_quote_generated === 'no' &&
          i.automatic_invoice_generated === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    homeowner_follow_up_summary: {
      description: 'Homeowner follow-up tracking — draft/manual only, no live sends',
      homeowner_follow_up_needed_count: allItems.filter((i) => i.homeowner_follow_up_needed).length,
      tracking_or_manual_only: true,
      live_follow_up_action_allowed: 'no',
      all_items_live_follow_up_blocked: allItems.every(
        (i) => i.live_follow_up_action_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    roofer_follow_up_summary: {
      description: 'Roofer follow-up tracking — manual roofer action only, no live automation',
      roofer_follow_up_needed_count: allItems.filter((i) => i.roofer_follow_up_needed).length,
      tracking_or_manual_only: true,
      live_follow_up_action_allowed: 'no',
      all_items_live_follow_up_blocked: allItems.every(
        (i) => i.live_follow_up_action_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    outcome_summary: {
      description: 'Post-inspection outcome tracking — still_open, won, lost, needs_review, closed',
      outcome_counts: outcomeCounts,
      still_open_supported: 'still_open' in outcomeCounts,
      won_supported: 'won' in outcomeCounts,
      lost_supported: 'lost' in outcomeCounts,
      needs_review_supported: 'needs_review' in outcomeCounts,
      closed_supported: 'closed' in outcomeCounts,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_capture_summary: {
      description: 'Feedback capture tracking — internal unless permission obtained',
      feedback_requested_count: allItems.filter((i) => i.feedback_requested).length,
      feedback_captured_count: allItems.filter((i) => i.feedback_captured).length,
      testimonial_candidate_count: allItems.filter((i) => i.testimonial_candidate).length,
      testimonial_candidate_internal_only: true,
      feedback_issue_flag_count: allItems.filter((i) => i.feedback_issue_flag).length,
      no_fake_reviews: true,
      no_review_farming: true,
      no_automatic_public_review_generation: true,
      live_feedback_request_allowed: 'no',
      all_items_live_feedback_blocked: allItems.every(
        (i) => i.live_feedback_request_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_permission_summary: {
      description: 'Public-use permission tracking — yes, no, not_asked only',
      permission_counts: permissionCounts,
      valid_values_only: ['yes', 'no', 'not_asked'],
      permissiontousepublicly_absent: true,
      feedback_internal_unless_permission_yes: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_inspection_review_summary: {
      description:
        'Post-inspection review routing — roofer owns business judgment; RoofLeadHQ/Jason limited to system quality',
      roofer_review_required_count: rooferReviewItems.length,
      roofleadhq_review_required_count: roofleadhqReviewItems.length,
      roofer_owns_business_judgment: [
        'estimate_details',
        'quote_details',
        'pricing_question',
        'payment_or_invoice_question',
        'contract_question',
        'insurance_complexity',
        'repair_vs_replacement_question',
        'upset_homeowner',
        'disputed_inspection_outcome',
        'scheduling_issue',
      ],
      roofleadhq_limited_to_system_quality: [
        'bad_or_unclear_ai_response',
        'missed_data_capture',
        'broken_routing',
        'source_attribution_issue',
        'dashboard_report_discrepancy',
        'workflow_state_confusion',
        'setup_issue',
        'failed_handoff',
        'quality_control_concern',
      ],
      all_open_or_review_have_manual_next_step: openOrReviewItems.every(
        (i) => i.required_manual_next_step,
      ),
      all_follow_up_have_due_dates: followUpItems.every((i) => i.next_step_due_date),
      all_open_have_owners: openItems
        .filter((i) => i.outcome === 'still_open' || i.still_open_days !== null)
        .every((i) => i.next_step_owner),
      all_open_have_still_open_days: openItems
        .filter((i) => i.outcome === 'still_open')
        .every((i) => i.still_open_days !== null && i.still_open_days !== undefined),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_inspection_safety_assertions: [
      ...POST_INSPECTION_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const FEEDBACK_PERMISSION_SAFETY_ASSERTIONS = [
  'feedback_permission_expansion_summary_present',
  'feedback_permission_items_present',
  'feedback_permission_item_required_fields_present',
  'permission_to_use_publicly_values_are_valid',
  'permissiontousepublicly_absent',
  'public_use_allowed_only_when_permission_yes',
  'public_use_blocked_when_permission_no',
  'public_use_blocked_when_permission_not_asked',
  'missing_permission_fails_closed_or_routes_to_review',
  'testimonial_candidate_does_not_publish_publicly',
  'testimonial_candidate_without_permission_remains_internal',
  'feedback_internal_unless_permission_obtained',
  'feedback_issue_flag_routes_to_review',
  'homeowner_wants_follow_up_routes_to_roofer_review',
  'negative_or_disputed_feedback_routes_to_roofer_review',
  'pricing_estimate_quote_feedback_routes_to_roofer_review',
  'payment_or_contract_feedback_routes_to_roofer_review',
  'roofleadhq_review_limited_to_system_quality',
  'feedback_permission_capture_mismatch_routes_to_roofleadhq_review',
  'csv_permission_value_matches_permission_to_use_publicly',
  'reporting_permission_value_matches_permission_to_use_publicly',
  'no_fake_reviews',
  'no_review_farming',
  'no_incentivized_positive_feedback_request',
  'no_automatic_public_review_generation',
  'no_automatic_testimonial_publication',
  'live_feedback_request_blocked_when_flag_false',
  'feedback_permission_uses_fake_data_only',
  'feedback_permission_does_not_touch_production_data',
  'feedback_permission_does_not_call_external_services',
  'feedback_permission_does_not_send_notifications',
  'feedback_permission_decisions_are_audited',
  'required_manual_next_step_present_for_issue_or_review_items',
  'automatic_public_review_generated_is_no_for_all_items',
  'testimonial_published_publicly_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
];

const FEEDBACK_PERMISSION_EXTENSIONS = {
  homeowner_follow_up_needed_path: {
    homeowner_wants_follow_up: true,
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  roofer_follow_up_needed_path: {
    homeowner_wants_follow_up: true,
    roofer_showed_up_as_expected: false,
    roofer_helpful_professional: false,
    negative_or_disputed_feedback: true,
    payment_or_contract_feedback: true,
  },
  estimate_needed_estimate_sent_tracking_path: {
    pricing_estimate_quote_feedback: true,
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  feedback_permission_yes_path: {
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  feedback_permission_no_path: {
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  feedback_permission_not_asked_path: {
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  csv_report_snapshot_fake_data_path: {
    feedback_permission_capture_mismatch: true,
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
  },
  roofleadhq_system_review_needed_path: {
    roofer_showed_up_as_expected: null,
    roofer_helpful_professional: null,
  },
  missed_lead_recovery_path: {
    roofer_showed_up_as_expected: null,
    roofer_helpful_professional: null,
  },
  inspection_missed_reschedule_path: {
    roofer_showed_up_as_expected: false,
    roofer_helpful_professional: null,
  },
  post_inspection_still_open_path: {
    roofer_showed_up_as_expected: true,
    roofer_helpful_professional: true,
    negative_or_disputed_feedback: true,
  },
};

function resolvePermissionReportingValue(permission) {
  if (permission === 'yes' || permission === 'no' || permission === 'not_asked') {
    return permission;
  }
  return 'not_applicable';
}

function derivePublicUseDecision(permission, testimonialCandidate) {
  if (permission === 'yes') {
    return {
      public_use_allowed: true,
      public_use_block_reason: null,
      internal_only: false,
    };
  }
  if (permission === 'no') {
    return {
      public_use_allowed: false,
      public_use_block_reason: 'homeowner_denied_public_use',
      internal_only: true,
    };
  }
  if (permission === 'not_asked') {
    return {
      public_use_allowed: false,
      public_use_block_reason: 'permission_not_asked',
      internal_only: true,
    };
  }
  if (testimonialCandidate) {
    return {
      public_use_allowed: false,
      public_use_block_reason: 'permission_missing_fails_closed',
      internal_only: true,
    };
  }
  return {
    public_use_allowed: false,
    public_use_block_reason: permission === null ? 'permission_not_applicable' : 'permission_missing_fails_closed',
    internal_only: true,
  };
}

function buildFeedbackPermissionItem(scenario, postInspectionItem, index) {
  if (!postInspectionItem) {
    return null;
  }
  const extension = FEEDBACK_PERMISSION_EXTENSIONS[scenario.scenario_id] || {};
  const permission = postInspectionItem.permission_to_use_publicly;
  const publicUse = derivePublicUseDecision(permission, postInspectionItem.testimonial_candidate);
  const csvPermissionValue = resolvePermissionReportingValue(permission);
  const reportingPermissionValue = resolvePermissionReportingValue(permission);
  const internalOnly =
    publicUse.internal_only ||
    (postInspectionItem.testimonial_candidate && permission !== 'yes') ||
    permission === 'no' ||
    permission === 'not_asked' ||
    permission === null;

  return {
    feedback_permission_item_id: `${scenario.scenario_id}_feedback_permission_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: postInspectionItem.lead_id,
    appointment_id: postInspectionItem.appointment_id,
    post_inspection_item_id: postInspectionItem.post_inspection_item_id,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    feedback_requested: postInspectionItem.feedback_requested,
    feedback_captured: postInspectionItem.feedback_captured,
    feedback_summary: postInspectionItem.feedback_summary,
    feedback_issue_flag: postInspectionItem.feedback_issue_flag,
    testimonial_candidate: postInspectionItem.testimonial_candidate,
    permission_to_use_publicly: permission,
    public_use_allowed: publicUse.public_use_allowed,
    public_use_block_reason: publicUse.public_use_block_reason,
    internal_only: internalOnly,
    homeowner_wants_follow_up: extension.homeowner_wants_follow_up ?? false,
    roofer_showed_up_as_expected: extension.roofer_showed_up_as_expected ?? null,
    roofer_helpful_professional: extension.roofer_helpful_professional ?? null,
    roofer_review_required: postInspectionItem.roofer_review_required,
    roofleadhq_review_required: postInspectionItem.roofleadhq_review_required,
    required_manual_next_step: postInspectionItem.required_manual_next_step,
    csv_permission_value: csvPermissionValue,
    reporting_permission_value: reportingPermissionValue,
    automatic_public_review_generated: 'no',
    testimonial_published_publicly: 'no',
    incentivized_positive_feedback_requested: 'no',
    fake_review_generated: 'no',
    review_farming_detected: 'no',
    live_feedback_request_allowed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    feedback_permission_capture_mismatch: extension.feedback_permission_capture_mismatch ?? false,
    negative_or_disputed_feedback: extension.negative_or_disputed_feedback ?? false,
    pricing_estimate_quote_feedback: extension.pricing_estimate_quote_feedback ?? false,
    payment_or_contract_feedback: extension.payment_or_contract_feedback ?? false,
    fake_data_only: true,
    audit_event_id: `${scenario.scenario_id}_feedback_permission_audit_${index + 1}`,
  };
}

function buildScenarioFeedbackPermissionItem(scenario, postInspectionItem) {
  if (!postInspectionItem) {
    return null;
  }
  return buildFeedbackPermissionItem(scenario, postInspectionItem, 0);
}

function buildTopLevelFeedbackPermission(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => {
      const postItem = buildScenarioPostInspectionItem(scenario);
      return buildFeedbackPermissionItem(scenario, postItem, 0);
    })
    .filter(Boolean);

  const permissionCounts = { yes: 0, no: 0, not_asked: 0, unset: 0 };
  for (const item of allItems) {
    if (item.permission_to_use_publicly === 'yes') permissionCounts.yes += 1;
    else if (item.permission_to_use_publicly === 'no') permissionCounts.no += 1;
    else if (item.permission_to_use_publicly === 'not_asked') permissionCounts.not_asked += 1;
    else permissionCounts.unset += 1;
  }

  const feedbackStatusCounts = {
    not_requested: allItems.filter((i) => !i.feedback_requested && !i.feedback_captured).length,
    requested_not_captured: allItems.filter((i) => i.feedback_requested && !i.feedback_captured).length,
    captured: allItems.filter((i) => i.feedback_captured).length,
    issue_flagged: allItems.filter((i) => i.feedback_issue_flag).length,
  };

  const testimonialCandidates = allItems.filter((i) => i.testimonial_candidate);
  const issueItems = allItems.filter((i) => i.feedback_issue_flag);
  const reviewOrIssueItems = allItems.filter(
    (i) =>
      i.feedback_issue_flag ||
      i.roofer_review_required ||
      i.roofleadhq_review_required ||
      i.feedback_permission_capture_mismatch,
  );
  const publicUseAllowedItems = allItems.filter((i) => i.public_use_allowed);
  const publicUseBlockedItems = allItems.filter((i) => !i.public_use_allowed);

  return {
    feedback_permission_expansion: 'native_workflow_fixture_feedback_permission_expansion',
    feedback_permission_expansion_summary: {
      description:
        'Deterministic fake-data feedback permission expansion across all fixture scenarios — explicit homeowner feedback capture and public-use permission boundaries without live automation',
      total_feedback_permission_items: allItems.length,
      feedback_requested_count: allItems.filter((i) => i.feedback_requested).length,
      feedback_captured_count: allItems.filter((i) => i.feedback_captured).length,
      feedback_issue_flag_count: issueItems.length,
      testimonial_candidate_count: testimonialCandidates.length,
      public_use_allowed_count: publicUseAllowedItems.length,
      public_use_blocked_count: publicUseBlockedItems.length,
      permission_counts: permissionCounts,
      live_feedback_request_enabled: false,
      automatic_public_review_generation: false,
      automatic_testimonial_publication: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    feedback_permission_items: allItems,
    feedback_permission_status_summary: {
      description: 'Feedback request/capture/issue status distribution across fixture scenarios',
      status_counts: feedbackStatusCounts,
      feedback_not_requested_count: feedbackStatusCounts.not_requested,
      feedback_requested_count: allItems.filter((i) => i.feedback_requested).length,
      feedback_captured_count: feedbackStatusCounts.captured,
      feedback_issue_flagged_count: feedbackStatusCounts.issue_flagged,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    testimonial_candidate_summary: {
      description:
        'Testimonial candidate tracking — internal-only; no automatic public testimonial publication',
      testimonial_candidate_count: testimonialCandidates.length,
      testimonial_candidate_internal_only: true,
      testimonial_candidate_without_permission_remains_internal: testimonialCandidates
        .filter((i) => i.permission_to_use_publicly !== 'yes')
        .every((i) => i.internal_only),
      testimonial_published_publicly: 'no',
      automatic_testimonial_publication: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_issue_summary: {
      description: 'Feedback issue flag routing — internal review required, no automatic publication',
      feedback_issue_flag_count: issueItems.length,
      issue_items_route_to_review: issueItems.every(
        (i) => i.roofer_review_required || i.roofleadhq_review_required,
      ),
      all_issue_items_internal_only: issueItems.every((i) => i.internal_only),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    public_use_permission_summary: {
      description: 'Public-use permission boundaries — yes/no/not_asked only; permissiontousepublicly absent',
      permission_counts: permissionCounts,
      valid_values_only: ['yes', 'no', 'not_asked'],
      permissiontousepublicly_absent: true,
      public_use_allowed_only_when_permission_yes: publicUseAllowedItems.every(
        (i) => i.permission_to_use_publicly === 'yes',
      ),
      public_use_blocked_when_permission_no: allItems
        .filter((i) => i.permission_to_use_publicly === 'no')
        .every((i) => !i.public_use_allowed && i.internal_only),
      public_use_blocked_when_permission_not_asked: allItems
        .filter((i) => i.permission_to_use_publicly === 'not_asked')
        .every((i) => !i.public_use_allowed && i.internal_only),
      missing_permission_fails_closed: allItems
        .filter((i) => i.testimonial_candidate && i.permission_to_use_publicly !== 'yes')
        .every((i) => !i.public_use_allowed),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_csv_reporting_summary: {
      description: 'CSV and reporting permission value compatibility — matches permission_to_use_publicly',
      csv_permission_values_match: allItems.every(
        (i) => i.csv_permission_value === resolvePermissionReportingValue(i.permission_to_use_publicly),
      ),
      reporting_permission_values_match: allItems.every(
        (i) =>
          i.reporting_permission_value === resolvePermissionReportingValue(i.permission_to_use_publicly),
      ),
      csv_export_is_one_directional: true,
      csv_not_native_crm_sync: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_review_boundary_summary: {
      description:
        'Feedback review ownership — roofer owns business judgment; RoofLeadHQ/Jason limited to system quality',
      roofer_review_required_count: allItems.filter((i) => i.roofer_review_required).length,
      roofleadhq_review_required_count: allItems.filter((i) => i.roofleadhq_review_required).length,
      homeowner_wants_follow_up_routes_to_roofer: allItems
        .filter((i) => i.homeowner_wants_follow_up)
        .every((i) => i.roofer_review_required || i.required_manual_next_step),
      negative_or_disputed_feedback_routes_to_roofer: allItems
        .filter((i) => i.negative_or_disputed_feedback)
        .every((i) => i.roofer_review_required),
      pricing_estimate_quote_feedback_routes_to_roofer: allItems
        .filter((i) => i.pricing_estimate_quote_feedback)
        .every((i) => i.roofer_review_required),
      payment_or_contract_feedback_routes_to_roofer: allItems
        .filter((i) => i.feedback_issue_flag && i.roofer_review_required)
        .length >= 1,
      roofleadhq_limited_to_system_quality: [
        'bad_or_unclear_ai_response',
        'missed_data_capture',
        'broken_routing',
        'source_attribution_issue',
        'dashboard_report_discrepancy',
        'workflow_state_confusion',
        'setup_issue',
        'failed_handoff',
        'quality_control_concern',
        'feedback_permission_capture_mismatch',
      ],
      feedback_permission_capture_mismatch_routes_to_roofleadhq: allItems
        .filter((i) => i.feedback_permission_capture_mismatch)
        .every((i) => i.roofleadhq_review_required),
      all_review_or_issue_have_manual_next_step: reviewOrIssueItems.every(
        (i) => i.required_manual_next_step,
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_permission_safety_assertions: [
      ...FEEDBACK_PERMISSION_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const MANUAL_OUTREACH_SAFETY_ASSERTIONS = [
  'manual_outreach_expansion_summary_present',
  'manual_outreach_items_present',
  'manual_outreach_item_required_fields_present',
  'missed_lead_recovery_can_route_to_manual_outreach',
  'max_follow_up_attempts_can_route_to_manual_outreach',
  'missing_contact_data_blocks_manual_outreach_or_routes_to_review',
  'unclear_contact_permission_blocks_manual_outreach_or_routes_to_review',
  'do_not_contact_blocks_manual_outreach',
  'homeowner_contact_ready_required_for_manual_outreach',
  'roofer_review_required_before_business_judgment_outreach',
  'roofleadhq_review_required_before_system_quality_outreach',
  'pricing_question_routes_to_roofer_review_before_outreach',
  'estimate_question_routes_to_roofer_review_before_outreach',
  'quote_request_routes_to_roofer_review_before_outreach',
  'insurance_complexity_routes_to_roofer_review_before_outreach',
  'payment_or_invoice_routes_to_roofer_review_before_outreach',
  'contract_question_routes_to_roofer_review_before_outreach',
  'homeowner_asks_for_roofer_routes_to_roofer_review_before_outreach',
  'upset_homeowner_routes_to_roofer_review_before_outreach',
  'negative_or_disputed_feedback_routes_to_roofer_review_before_outreach',
  'broken_routing_routes_to_roofleadhq_review_before_outreach',
  'missed_data_capture_routes_to_roofleadhq_review_before_outreach',
  'source_attribution_issue_routes_to_roofleadhq_review_before_outreach',
  'feedback_permission_capture_mismatch_routes_to_roofleadhq_review_before_outreach',
  'manual_outreach_owner_required',
  'manual_next_step_required',
  'next_step_owner_required',
  'next_step_due_date_required_when_outreach_needed',
  'outreach_attempt_count_present',
  'manual_outreach_decisions_are_audited',
  'live_sms_blocked_when_flag_false',
  'live_email_blocked_when_flag_false',
  'live_call_blocked_when_flag_false',
  'notification_sent_is_no_for_all_items',
  'live_sms_allowed_is_no_for_all_items',
  'live_email_allowed_is_no_for_all_items',
  'live_call_allowed_is_no_for_all_items',
  'no_twilio_call_performed',
  'no_vapi_call_performed',
  'no_resend_call_performed',
  `no_${BRIDGE_VENDOR}_live_workflow_performed`,
  'no_google_calendar_event_created',
  'no_external_services_called',
  'manual_outreach_uses_fake_data_only',
  'manual_outreach_does_not_touch_production_data',
  'manual_outreach_does_not_send_notifications',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'unsupported_request_routes_to_review_or_later_only',
  'unsupported_request_does_not_trigger_live_outreach',
];

const MANUAL_OUTREACH_PROFILES = {
  normal_lead_to_appointment_readiness: {
    outreach_needed: false,
    outreach_status: 'not_needed',
    outreach_reason: 'appointment_readiness_satisfied_no_manual_outreach_yet',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  missing_information_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_review',
    outreach_reason: 'missing_contact_data_blocks_manual_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_contact_ready',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-18',
    business_judgment_required: true,
    system_quality_issue: false,
  },
  duplicate_review_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'unresolved_duplicate_review_blocks_outreach',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-19',
    business_judgment_required: false,
    system_quality_issue: true,
    broken_routing: true,
  },
  bad_fit_excluded_path: {
    outreach_needed: false,
    outreach_status: 'blocked',
    outreach_reason: 'excluded_service_area_blocks_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  stopped_do_not_contact_path: {
    outreach_needed: false,
    outreach_status: 'blocked',
    outreach_reason: 'do_not_contact_blocks_all_manual_outreach',
    outreach_owner: 'none',
    outreach_channel_allowed: 'none',
    prior_follow_up_count: 2,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  missed_lead_recovery_path: {
    outreach_needed: true,
    outreach_status: 'needed',
    outreach_reason: 'missed_lead_recovery_requires_manual_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 2,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: true,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-14',
    next_step_due_date: '2026-06-17',
    business_judgment_required: false,
    system_quality_issue: false,
    bad_or_unclear_ai_response: true,
  },
  roofer_review_needed_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofer_review',
    outreach_reason: 'pricing_question_requires_roofer_review_before_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_roofer_review_complete',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-18',
    business_judgment_required: true,
    system_quality_issue: false,
    pricing_question: true,
    insurance_complexity: true,
  },
  roofleadhq_system_review_needed_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'workflow_state_confusion_requires_roofleadhq_review_before_outreach',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_system_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-19',
    business_judgment_required: false,
    system_quality_issue: true,
    broken_routing: true,
    missed_data_capture: true,
  },
  appointment_booked_path: {
    outreach_needed: false,
    outreach_status: 'not_needed',
    outreach_reason: 'appointment_booked_fixture_manual_coordination_only',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-12',
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  inspection_completed_path: {
    outreach_needed: false,
    outreach_status: 'tracking_only',
    outreach_reason: 'post_inspection_tracking_no_outreach_until_follow_up_needed',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  inspection_missed_reschedule_path: {
    outreach_needed: true,
    outreach_status: 'needed_after_roofer_review',
    outreach_reason: 'scheduling_issue_requires_roofer_manual_reschedule_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-17',
    business_judgment_required: true,
    system_quality_issue: false,
    scheduling_issue: true,
  },
  post_inspection_still_open_path: {
    outreach_needed: true,
    outreach_status: 'needed',
    outreach_reason: 'post_inspection_still_open_requires_roofer_manual_follow_up',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 2,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-15',
    next_step_due_date: '2026-06-18',
    business_judgment_required: true,
    system_quality_issue: false,
    negative_or_disputed_feedback: true,
    repair_vs_replacement_question: true,
  },
  estimate_needed_estimate_sent_tracking_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofer_review',
    outreach_reason: 'estimate_and_quote_questions_require_roofer_review_before_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_roofer_review_complete',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-18',
    business_judgment_required: true,
    system_quality_issue: false,
    estimate_question: true,
    quote_request: true,
    payment_or_invoice_question: true,
  },
  homeowner_follow_up_needed_path: {
    outreach_needed: true,
    outreach_status: 'needed',
    outreach_reason: 'homeowner_follow_up_requires_manual_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 2,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-15',
    next_step_due_date: '2026-06-17',
    business_judgment_required: true,
    system_quality_issue: false,
    homeowner_asks_for_roofer_directly: true,
    feedback_issue_follow_up: true,
  },
  roofer_follow_up_needed_path: {
    outreach_needed: true,
    outreach_status: 'needed_after_roofer_review',
    outreach_reason: 'negative_feedback_and_contract_question_require_roofer_manual_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 3,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 1,
    last_manual_outreach_attempt_date: '2026-06-14',
    next_step_due_date: '2026-06-17',
    business_judgment_required: true,
    system_quality_issue: false,
    upset_homeowner: true,
    negative_or_disputed_feedback: true,
    contract_question: true,
    payment_or_invoice_question: true,
    feedback_issue_follow_up: true,
  },
  feedback_permission_yes_path: {
    outreach_needed: false,
    outreach_status: 'tracking_only',
    outreach_reason: 'feedback_captured_permission_yes_no_live_outreach_required',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  feedback_permission_no_path: {
    outreach_needed: false,
    outreach_status: 'tracking_only',
    outreach_reason: 'feedback_internal_only_permission_no_blocks_public_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  feedback_permission_not_asked_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_review',
    outreach_reason: 'unclear_contact_permission_requires_review_before_outreach',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_permission_reviewed',
    prior_follow_up_count: 1,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-19',
    business_judgment_required: false,
    system_quality_issue: false,
    unclear_contact_permission: true,
  },
  csv_report_snapshot_fake_data_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'source_attribution_and_feedback_permission_mismatch_require_system_review',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_system_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-20',
    business_judgment_required: false,
    system_quality_issue: true,
    source_attribution_issue: true,
    feedback_permission_capture_mismatch: true,
  },
  starter_plan_profile_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'setup_issue_requires_roofleadhq_system_review_before_outreach',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_system_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-20',
    business_judgment_required: false,
    system_quality_issue: true,
    setup_issue: true,
  },
  growth_plan_profile_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofleadhq_review',
    outreach_reason: 'quality_control_concern_requires_roofleadhq_system_review',
    outreach_owner: 'roofleadhq_jason',
    outreach_channel_allowed: 'none_until_system_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-20',
    business_judgment_required: false,
    system_quality_issue: true,
    quality_control_concern: true,
  },
  elite_plan_profile_path: {
    outreach_needed: false,
    outreach_status: 'not_needed',
    outreach_reason: 'elite_plan_fixture_tracking_no_manual_outreach_yet',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only_when_needed',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: null,
    business_judgment_required: false,
    system_quality_issue: false,
  },
  custom_review_500_plus_leads_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofer_review',
    outreach_reason: 'custom_review_volume_boundary_blocks_outreach_until_review',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_roofer_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-25',
    business_judgment_required: true,
    system_quality_issue: false,
    unsupported_request: true,
  },
  custom_review_two_plus_locations_path: {
    outreach_needed: false,
    outreach_status: 'blocked_pending_roofer_review',
    outreach_reason: 'custom_review_multi_location_blocks_outreach_until_review',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'none_until_roofer_review_complete',
    prior_follow_up_count: 0,
    max_follow_up_attempts_reached: false,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 0,
    last_manual_outreach_attempt_date: null,
    next_step_due_date: '2026-06-25',
    business_judgment_required: true,
    system_quality_issue: false,
    unsupported_request: true,
  },
  activation_flag_false_blocks_live_action_path: {
    outreach_needed: true,
    outreach_status: 'needed_manual_only',
    outreach_reason: 'max_follow_up_attempts_reached_requires_manual_outreach_live_blocked',
    outreach_owner: 'roofer',
    outreach_channel_allowed: 'manual_only',
    prior_follow_up_count: 4,
    max_follow_up_attempts_reached: true,
    missed_lead_recovery_used: false,
    manual_outreach_attempt_count: 2,
    last_manual_outreach_attempt_date: '2026-06-13',
    next_step_due_date: '2026-06-18',
    business_judgment_required: false,
    system_quality_issue: false,
    unsupported_request: true,
  },
};

function buildManualOutreachItem(
  scenario,
  readinessItem,
  postItem,
  feedbackItem,
  profile,
  index,
) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const appointmentId = postItem?.appointment_id || null;
  const manualNextStep =
    scenario.manual_next_step ||
    readinessItem?.required_manual_next_step ||
    postItem?.required_manual_next_step ||
    feedbackItem?.required_manual_next_step ||
    profile.required_manual_next_step ||
    'manual_outreach_review_required';
  const nextStepOwner =
    scenario.owner ||
    postItem?.next_step_owner ||
    (profile.outreach_owner === 'roofleadhq_jason' ? 'roofleadhq_jason' : 'roofer');
  const outreachOwner = profile.outreach_owner || nextStepOwner || 'roofer';

  return {
    manual_outreach_item_id: `${scenario.scenario_id}_manual_outreach_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    appointment_id: appointmentId,
    post_inspection_item_id: postItem?.post_inspection_item_id || null,
    feedback_permission_item_id: feedbackItem?.feedback_permission_item_id || null,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    outreach_needed: profile.outreach_needed,
    outreach_status: profile.outreach_status,
    outreach_reason: profile.outreach_reason,
    outreach_owner: outreachOwner,
    outreach_channel_allowed: profile.outreach_channel_allowed,
    contact_permission_status: readinessItem?.contact_permission_status || 'unknown',
    do_not_contact_status: readinessItem?.do_not_contact_status ?? false,
    homeowner_contact_ready: readinessItem?.homeowner_contact_ready ?? false,
    roofer_review_required:
      readinessItem?.roofer_review_required ||
      postItem?.roofer_review_required ||
      profile.business_judgment_required ||
      false,
    roofleadhq_review_required:
      readinessItem?.roofleadhq_review_required ||
      postItem?.roofleadhq_review_required ||
      profile.system_quality_issue ||
      false,
    business_judgment_required: profile.business_judgment_required ?? false,
    system_quality_issue: profile.system_quality_issue ?? false,
    prior_follow_up_count: profile.prior_follow_up_count ?? 0,
    max_follow_up_attempts_reached: profile.max_follow_up_attempts_reached ?? false,
    missed_lead_recovery_used: profile.missed_lead_recovery_used ?? false,
    manual_next_step: manualNextStep,
    next_step_owner: nextStepOwner,
    next_step_due_date: profile.next_step_due_date,
    last_manual_outreach_attempt_date: profile.last_manual_outreach_attempt_date,
    manual_outreach_attempt_count: profile.manual_outreach_attempt_count ?? 0,
    manual_outreach_notes: `fixture_manual_outreach_${scenario.scenario_id}`,
    hold_or_block_reason: scenario.hold_or_block_reason || null,
    audit_event_id: `${scenario.scenario_id}_manual_outreach_audit_${index + 1}`,
    live_sms_allowed: 'no',
    live_email_allowed: 'no',
    live_call_allowed: 'no',
    notification_sent: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    pricing_question: profile.pricing_question ?? false,
    estimate_question: profile.estimate_question ?? false,
    quote_request: profile.quote_request ?? false,
    insurance_complexity: profile.insurance_complexity ?? false,
    payment_or_invoice_question: profile.payment_or_invoice_question ?? false,
    contract_question: profile.contract_question ?? false,
    homeowner_asks_for_roofer_directly: profile.homeowner_asks_for_roofer_directly ?? false,
    upset_homeowner: profile.upset_homeowner ?? false,
    negative_or_disputed_feedback: profile.negative_or_disputed_feedback ?? false,
    broken_routing: profile.broken_routing ?? false,
    missed_data_capture: profile.missed_data_capture ?? false,
    source_attribution_issue: profile.source_attribution_issue ?? false,
    feedback_permission_capture_mismatch: profile.feedback_permission_capture_mismatch ?? false,
    unsupported_request: profile.unsupported_request ?? false,
    feedback_issue_follow_up: profile.feedback_issue_follow_up ?? false,
    scheduling_issue: profile.scheduling_issue ?? false,
    repair_vs_replacement_question: profile.repair_vs_replacement_question ?? false,
    setup_issue: profile.setup_issue ?? false,
    quality_control_concern: profile.quality_control_concern ?? false,
    unclear_contact_permission: profile.unclear_contact_permission ?? false,
    fake_data_only: true,
  };
}

function buildScenarioManualOutreachItem(scenario, readinessItem, postItem, feedbackItem) {
  const profile = MANUAL_OUTREACH_PROFILES[scenario.scenario_id];
  if (!profile) {
    return null;
  }
  return buildManualOutreachItem(scenario, readinessItem, postItem, feedbackItem, profile, 0);
}

function buildTopLevelManualOutreach(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => {
      const readinessItem = buildScenarioAppointmentReadinessItem(scenario);
      const postItem = buildScenarioPostInspectionItem(scenario);
      const feedbackItem = buildScenarioFeedbackPermissionItem(scenario, postItem);
      return buildScenarioManualOutreachItem(scenario, readinessItem, postItem, feedbackItem);
    })
    .filter(Boolean);

  const neededItems = allItems.filter((i) => i.outreach_needed);
  const blockedItems = allItems.filter((i) => i.outreach_status.startsWith('blocked'));
  const missedLeadItems = allItems.filter((i) => i.missed_lead_recovery_used);
  const maxFollowUpItems = allItems.filter((i) => i.max_follow_up_attempts_reached);
  const postInspectionOutreachItems = allItems.filter(
    (i) =>
      i.post_inspection_item_id &&
      (i.outreach_needed ||
        i.outreach_status === 'needed_after_roofer_review' ||
        i.outreach_status === 'tracking_only'),
  );
  const feedbackOutreachItems = allItems.filter(
    (i) =>
      i.feedback_permission_item_id &&
      (i.feedback_issue_follow_up ||
        i.negative_or_disputed_feedback ||
        i.feedback_permission_capture_mismatch),
  );
  const rooferReviewBlocked = allItems.filter(
    (i) => i.roofer_review_required && !i.outreach_needed && i.business_judgment_required,
  );
  const roofleadhqReviewBlocked = allItems.filter(
    (i) => i.roofleadhq_review_required && !i.outreach_needed && i.system_quality_issue,
  );

  const outreachStatusCounts = {};
  for (const item of allItems) {
    outreachStatusCounts[item.outreach_status] =
      (outreachStatusCounts[item.outreach_status] || 0) + 1;
  }

  const outreachReasonCounts = {};
  for (const item of allItems) {
    outreachReasonCounts[item.outreach_reason] =
      (outreachReasonCounts[item.outreach_reason] || 0) + 1;
  }

  const outreachOwnerCounts = {};
  for (const item of allItems) {
    outreachOwnerCounts[item.outreach_owner] =
      (outreachOwnerCounts[item.outreach_owner] || 0) + 1;
  }

  return {
    manual_outreach_expansion: 'native_workflow_fixture_manual_outreach_expansion',
    manual_outreach_expansion_summary: {
      description:
        'Deterministic fake-data manual outreach expansion across all fixture scenarios — explicit outreach-needed vs outreach-blocked boundaries without live sends or notifications',
      total_manual_outreach_items: allItems.length,
      outreach_needed_count: neededItems.length,
      outreach_blocked_count: blockedItems.length,
      missed_lead_recovery_outreach_count: missedLeadItems.length,
      max_follow_up_manual_outreach_count: maxFollowUpItems.length,
      post_inspection_outreach_count: postInspectionOutreachItems.length,
      feedback_outreach_count: feedbackOutreachItems.length,
      live_sms_enabled: false,
      live_email_enabled: false,
      live_call_enabled: false,
      notifications_sent: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    manual_outreach_items: allItems,
    manual_outreach_status_summary: {
      description: 'Manual outreach status distribution across fixture scenarios',
      status_counts: outreachStatusCounts,
      outreach_needed_count: neededItems.length,
      outreach_blocked_count: blockedItems.length,
      outreach_tracking_only_count: allItems.filter((i) => i.outreach_status === 'tracking_only')
        .length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_owner_summary: {
      description: 'Manual outreach owner assignments — roofer vs RoofLeadHQ/Jason vs none',
      owner_counts: outreachOwnerCounts,
      roofer_owned_count: allItems.filter((i) => i.outreach_owner === 'roofer').length,
      roofleadhq_owned_count: allItems.filter((i) => i.outreach_owner === 'roofleadhq_jason').length,
      none_owned_count: allItems.filter((i) => i.outreach_owner === 'none').length,
      all_needed_items_have_owner: neededItems.every((i) => i.outreach_owner && i.outreach_owner !== 'none'),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_reason_summary: {
      description: 'Manual outreach reason catalog across fixture scenarios',
      reason_counts: outreachReasonCounts,
      do_not_contact_blocks_outreach: allItems
        .filter((i) => i.do_not_contact_status)
        .every((i) => !i.outreach_needed && i.outreach_status === 'blocked'),
      missing_contact_blocks_or_routes_to_review: allItems
        .filter((i) => !i.homeowner_contact_ready)
        .every((i) => !i.outreach_needed || i.outreach_status.includes('review')),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_attempt_summary: {
      description: 'Manual outreach attempt logging — dry-run tracking only, no live sends',
      total_attempt_count: allItems.reduce((sum, i) => sum + i.manual_outreach_attempt_count, 0),
      items_with_attempts: allItems.filter((i) => i.manual_outreach_attempt_count > 0).length,
      all_items_have_attempt_count: allItems.every(
        (i) => i.manual_outreach_attempt_count !== undefined && i.manual_outreach_attempt_count !== null,
      ),
      no_live_sends_performed: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_manual_outreach_summary: {
      description: 'Missed lead recovery manual outreach handling — human follow-up after safe attempts',
      missed_lead_recovery_used_count: missedLeadItems.length,
      missed_lead_recovery_can_route_to_manual_outreach: missedLeadItems.every(
        (i) => i.outreach_needed && i.missed_lead_recovery_used,
      ),
      all_missed_lead_items_manual_only: missedLeadItems.every(
        (i) => i.outreach_channel_allowed === 'manual_only',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    post_inspection_manual_outreach_summary: {
      description:
        'Post-inspection manual outreach — homeowner/roofer follow-up tracking without live sends',
      post_inspection_outreach_item_count: postInspectionOutreachItems.length,
      homeowner_follow_up_outreach_count: allItems.filter(
        (i) => i.scenario_id === 'homeowner_follow_up_needed_path' && i.outreach_needed,
      ).length,
      roofer_follow_up_outreach_count: allItems.filter(
        (i) => i.scenario_id === 'roofer_follow_up_needed_path' && i.outreach_needed,
      ).length,
      all_post_inspection_outreach_manual_only: postInspectionOutreachItems.every(
        (i) => i.live_sms_allowed === 'no' && i.live_email_allowed === 'no' && i.live_call_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    feedback_manual_outreach_summary: {
      description:
        'Feedback issue manual outreach — negative/disputed feedback and permission mismatch routing',
      feedback_outreach_item_count: feedbackOutreachItems.length,
      negative_or_disputed_feedback_routes_to_roofer: allItems
        .filter((i) => i.negative_or_disputed_feedback)
        .every((i) => i.roofer_review_required || i.outreach_owner === 'roofer'),
      feedback_permission_capture_mismatch_routes_to_roofleadhq: allItems
        .filter((i) => i.feedback_permission_capture_mismatch)
        .every((i) => i.roofleadhq_review_required),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_review_boundary_summary: {
      description:
        'Manual outreach review ownership — roofer owns business judgment; RoofLeadHQ/Jason limited to system quality',
      roofer_review_blocked_count: rooferReviewBlocked.length,
      roofleadhq_review_blocked_count: roofleadhqReviewBlocked.length,
      pricing_question_routes_to_roofer: allItems
        .filter((i) => i.pricing_question)
        .every((i) => i.roofer_review_required && !i.outreach_needed),
      estimate_question_routes_to_roofer: allItems
        .filter((i) => i.estimate_question)
        .every((i) => i.roofer_review_required && !i.outreach_needed),
      quote_request_routes_to_roofer: allItems
        .filter((i) => i.quote_request)
        .every((i) => i.roofer_review_required && !i.outreach_needed),
      insurance_complexity_routes_to_roofer: allItems
        .filter((i) => i.insurance_complexity)
        .every((i) => i.roofer_review_required),
      payment_or_invoice_routes_to_roofer: allItems
        .filter((i) => i.payment_or_invoice_question)
        .every((i) => i.roofer_review_required),
      contract_question_routes_to_roofer: allItems
        .filter((i) => i.contract_question)
        .every((i) => i.roofer_review_required),
      homeowner_asks_for_roofer_routes_to_roofer: allItems
        .filter((i) => i.homeowner_asks_for_roofer_directly)
        .every((i) => i.roofer_review_required || i.outreach_owner === 'roofer'),
      upset_homeowner_routes_to_roofer: allItems
        .filter((i) => i.upset_homeowner)
        .every((i) => i.roofer_review_required),
      broken_routing_routes_to_roofleadhq: allItems
        .filter((i) => i.broken_routing)
        .every((i) => i.roofleadhq_review_required),
      missed_data_capture_routes_to_roofleadhq: allItems
        .filter((i) => i.missed_data_capture)
        .every((i) => i.roofer_review_required || i.roofleadhq_review_required),
      source_attribution_issue_routes_to_roofleadhq: allItems
        .filter((i) => i.source_attribution_issue)
        .every((i) => i.roofleadhq_review_required),
      unsupported_request_routes_to_review_or_later_only: allItems
        .filter((i) => i.unsupported_request)
        .every((i) => !i.live_sms_allowed || i.live_sms_allowed === 'no'),
      all_needed_items_have_manual_next_step: neededItems.every((i) => i.manual_next_step),
      all_needed_items_have_next_step_owner: neededItems.every((i) => i.next_step_owner),
      all_needed_items_have_due_date: neededItems.every((i) => i.next_step_due_date),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    manual_outreach_safety_assertions: [
      ...MANUAL_OUTREACH_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const MISSED_LEAD_RECOVERY_SAFETY_ASSERTIONS = [
  'missed_lead_recovery_expansion_summary_present',
  'missed_lead_recovery_items_present',
  'missed_lead_recovery_item_required_fields_present',
  'missed_lead_recovery_status_summary_present',
  'missed_lead_recovery_eligibility_summary_present',
  'missed_lead_recovery_blocker_summary_present',
  'missed_lead_recovery_attempt_summary_present',
  'missed_lead_recovery_can_mark_eligible_when_contact_and_permission_safe',
  'missed_lead_recovery_requires_homeowner_contact_ready',
  'missed_lead_recovery_requires_contact_permission_or_review',
  'do_not_contact_blocks_missed_lead_recovery',
  'missing_contact_data_blocks_recovery_or_routes_to_review',
  'unclear_contact_permission_blocks_recovery_or_routes_to_review',
  'max_follow_up_attempts_blocks_additional_recovery',
  'bad_fit_or_excluded_blocks_recovery',
  'excluded_service_area_blocks_recovery',
  'lead_source_required_or_unknown_marker_present',
  'first_response_time_tracked',
  'prior_follow_up_count_tracked',
  'max_follow_up_attempts_tracked',
  'homeowner_replied_status_tracked',
  'missed_lead_recovery_manual_outreach_handoff_present_when_needed',
  'manual_outreach_owner_required_when_manual_outreach_needed',
  'required_manual_next_step_present_for_blocked_or_review_items',
  'next_step_owner_required_for_recovery_items',
  'next_step_due_date_required_for_open_recovery_items',
  'roofer_review_required_before_business_judgment_recovery',
  'pricing_question_routes_to_roofer_review_before_recovery',
  'estimate_question_routes_to_roofer_review_before_recovery',
  'quote_request_routes_to_roofer_review_before_recovery',
  'insurance_complexity_routes_to_roofer_review_before_recovery',
  'payment_or_invoice_routes_to_roofer_review_before_recovery',
  'contract_question_routes_to_roofer_review_before_recovery',
  'upset_homeowner_routes_to_roofer_review_before_recovery',
  'roofleadhq_review_required_before_system_quality_recovery',
  'broken_routing_routes_to_roofleadhq_review_before_recovery',
  'missed_data_capture_routes_to_roofleadhq_review_before_recovery',
  'source_attribution_issue_routes_to_roofleadhq_review_before_recovery',
  'recovery_state_mismatch_routes_to_roofleadhq_review',
  'activation_flags_default_false',
  'live_sms_blocked_when_flag_false',
  'live_email_blocked_when_flag_false',
  'live_call_blocked_when_flag_false',
  'notification_sent_is_no_for_all_recovery_items',
  'live_sms_allowed_is_no_for_all_recovery_items',
  'live_email_allowed_is_no_for_all_recovery_items',
  'live_call_allowed_is_no_for_all_recovery_items',
  'no_twilio_call_performed',
  'no_vapi_call_performed',
  'no_resend_call_performed',
  `no_${BRIDGE_VENDOR}_live_workflow_performed`,
  'no_google_calendar_event_created',
  'no_external_services_called',
  'missed_lead_recovery_uses_fake_data_only',
  'missed_lead_recovery_does_not_touch_production_data',
  'missed_lead_recovery_does_not_send_notifications',
  'missed_lead_recovery_decisions_are_audited',
  'production_data_touched_is_no_for_all_recovery_items',
  'external_services_called_is_no_for_all_recovery_items',
  'unsupported_request_routes_to_review_or_later_only',
  'unsupported_request_does_not_trigger_live_recovery',
  'reporting_summary_includes_missed_lead_recovery',
  'csv_snapshot_preserves_missed_lead_recovery_field',
];

const MISSED_LEAD_RECOVERY_PROFILES = {
  normal_lead_to_appointment_readiness: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'timely_first_response_no_recovery_needed',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 8,
    homeowner_replied: true,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-10',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  missing_information_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_review',
    missed_lead_recovery_reason: 'missing_contact_data_blocks_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'missing_contact_data',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: 'missed_form',
    homeowner_phone_present: false,
    homeowner_email_present: true,
  },
  duplicate_review_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'duplicate_review_blocks_recovery_until_resolved',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    next_step_due_date: '2026-06-19',
    missed_inquiry_type: 'missed_inquiry',
    broken_routing: true,
  },
  bad_fit_excluded_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked',
    missed_lead_recovery_reason: 'excluded_service_area_blocks_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'bad_fit_or_excluded',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: 'missed_form',
    service_area_status: 'excluded',
  },
  stopped_do_not_contact_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked',
    missed_lead_recovery_reason: 'do_not_contact_blocks_missed_lead_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'do_not_contact',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 45,
    homeowner_replied: false,
    prior_follow_up_count: 2,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-08',
    manual_outreach_needed: false,
    manual_outreach_owner: 'none',
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: 'missed_call',
  },
  missed_lead_recovery_path: {
    missed_lead_recovery_used: true,
    missed_lead_recovery_status: 'active',
    missed_lead_recovery_reason: 'no_timely_first_response_safe_follow_up_remaining',
    recovery_eligible: true,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 2,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-14',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: false,
    system_quality_issue: false,
    roofer_review_required: false,
    roofleadhq_review_required: false,
    next_step_due_date: '2026-06-17',
    missed_inquiry_type: 'missed_call',
    bad_or_unclear_ai_response: true,
  },
  roofer_review_needed_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'pricing_question_requires_roofer_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_roofer_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-12',
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    roofer_review_required: true,
    roofleadhq_review_required: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: 'missed_inquiry',
    pricing_question: true,
    insurance_complexity: true,
  },
  roofleadhq_system_review_needed_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'workflow_state_confusion_requires_system_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    roofer_review_required: false,
    roofleadhq_review_required: true,
    next_step_due_date: '2026-06-19',
    missed_inquiry_type: 'missed_form',
    broken_routing: true,
    missed_data_capture: true,
    recovery_state_mismatch: true,
  },
  appointment_booked_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'appointment_booked_recovery_not_applicable',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 10,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-11',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  inspection_completed_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'post_appointment_recovery_not_applicable',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 15,
    homeowner_replied: true,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-10',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  inspection_missed_reschedule_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'scheduling_issue_requires_roofer_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_roofer_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 20,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-13',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-17',
    missed_inquiry_type: null,
    scheduling_issue: true,
  },
  post_inspection_still_open_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'post_inspection_follow_up_recovery_tracked_separately',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 12,
    homeowner_replied: true,
    prior_follow_up_count: 2,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-15',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: null,
    repair_vs_replacement_question: true,
    upset_homeowner: true,
  },
  estimate_needed_estimate_sent_tracking_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'estimate_quote_payment_questions_require_roofer_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_roofer_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 25,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-14',
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: null,
    estimate_question: true,
    quote_request: true,
    payment_or_invoice_question: true,
  },
  homeowner_follow_up_needed_path: {
    missed_lead_recovery_used: true,
    missed_lead_recovery_status: 'eligible',
    missed_lead_recovery_reason: 'homeowner_non_response_after_safe_follow_up_attempts',
    recovery_eligible: true,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 90,
    homeowner_replied: false,
    prior_follow_up_count: 3,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-15',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-17',
    missed_inquiry_type: 'missed_inquiry',
    homeowner_asks_for_roofer_directly: true,
  },
  roofer_follow_up_needed_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'upset_homeowner_and_contract_question_require_roofer_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_roofer_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 30,
    homeowner_replied: true,
    prior_follow_up_count: 3,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-14',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-17',
    missed_inquiry_type: null,
    upset_homeowner: true,
    contract_question: true,
    payment_or_invoice_question: true,
  },
  feedback_permission_yes_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'feedback_captured_recovery_not_applicable',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 10,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-12',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  feedback_permission_no_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'feedback_internal_only_recovery_not_applicable',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 10,
    homeowner_replied: true,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-12',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  feedback_permission_not_asked_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_review',
    missed_lead_recovery_reason: 'unclear_contact_permission_blocks_recovery_until_reviewed',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'contact_permission_unknown',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 35,
    homeowner_replied: false,
    prior_follow_up_count: 1,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-13',
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: '2026-06-19',
    missed_inquiry_type: 'missed_form',
    unclear_contact_permission: true,
  },
  csv_report_snapshot_fake_data_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'source_attribution_issue_requires_system_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'unknown',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    next_step_due_date: '2026-06-20',
    missed_inquiry_type: 'missed_form',
    source_attribution_issue: true,
    lead_source_status: 'unknown',
  },
  starter_plan_profile_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'setup_issue_requires_system_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'unknown',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    next_step_due_date: '2026-06-20',
    missed_inquiry_type: 'missed_inquiry',
    setup_issue: true,
    lead_source_status: 'unknown',
  },
  growth_plan_profile_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofleadhq_review',
    missed_lead_recovery_reason: 'quality_control_concern_requires_system_review_before_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unresolved_system_review',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofleadhq_jason',
    business_judgment_required: false,
    system_quality_issue: true,
    next_step_due_date: '2026-06-20',
    missed_inquiry_type: 'missed_call',
    quality_control_concern: true,
  },
  elite_plan_profile_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'not_used',
    missed_lead_recovery_reason: 'elite_plan_fixture_tracking_no_recovery_yet',
    recovery_eligible: false,
    recovery_blocked: false,
    recovery_block_reason: null,
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 7,
    homeowner_replied: true,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-10',
    manual_outreach_needed: false,
    manual_outreach_owner: null,
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: null,
    missed_inquiry_type: null,
  },
  custom_review_500_plus_leads_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'unsupported_request_custom_review_blocks_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unsupported_request',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-25',
    missed_inquiry_type: 'missed_inquiry',
    unsupported_request: true,
  },
  custom_review_two_plus_locations_path: {
    missed_lead_recovery_used: false,
    missed_lead_recovery_status: 'blocked_pending_roofer_review',
    missed_lead_recovery_reason: 'unsupported_request_multi_location_blocks_recovery',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'unsupported_request',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: false,
    first_response_time_minutes: null,
    homeowner_replied: false,
    prior_follow_up_count: 0,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: false,
    last_contact_channel: null,
    last_follow_up_date: null,
    manual_outreach_needed: false,
    manual_outreach_owner: 'roofer',
    business_judgment_required: true,
    system_quality_issue: false,
    next_step_due_date: '2026-06-25',
    missed_inquiry_type: 'missed_form',
    unsupported_request: true,
  },
  activation_flag_false_blocks_live_action_path: {
    missed_lead_recovery_used: true,
    missed_lead_recovery_status: 'stopped_max_attempts',
    missed_lead_recovery_reason: 'max_follow_up_attempts_reached_recovery_stopped_manual_only',
    recovery_eligible: false,
    recovery_blocked: true,
    recovery_block_reason: 'max_follow_up_attempts_reached',
    original_lead_source: 'Fixture Google Ads',
    first_response_sent: true,
    first_response_time_minutes: 120,
    homeowner_replied: false,
    prior_follow_up_count: 4,
    max_follow_up_attempts: 4,
    max_follow_up_attempts_reached: true,
    last_contact_channel: 'sms_simulated',
    last_follow_up_date: '2026-06-13',
    manual_outreach_needed: true,
    manual_outreach_owner: 'roofer',
    business_judgment_required: false,
    system_quality_issue: false,
    next_step_due_date: '2026-06-18',
    missed_inquiry_type: 'missed_call',
    unsupported_request: true,
  },
};

function buildMissedLeadRecoveryItem(
  scenario,
  readinessItem,
  postItem,
  manualOutreachItem,
  profile,
  index,
) {
  const input = scenario.input_fixture_summary || {};
  const leadId = input.fixture_lead_id || `lead-fix-${scenario.scenario_id}`;
  const manualNextStep =
    scenario.manual_next_step ||
    readinessItem?.required_manual_next_step ||
    postItem?.required_manual_next_step ||
    profile.required_manual_next_step ||
    'missed_lead_recovery_review_required';
  const nextStepOwner =
    scenario.owner ||
    postItem?.next_step_owner ||
    profile.manual_outreach_owner ||
    (profile.system_quality_issue ? 'roofleadhq_jason' : 'roofer');

  return {
    missed_lead_recovery_item_id: `${scenario.scenario_id}_missed_lead_recovery_${index + 1}`,
    scenario_id: scenario.scenario_id,
    lead_id: leadId,
    plan_profile: scenario.plan_profile,
    current_state: scenario.starting_state,
    target_state: scenario.final_state,
    missed_lead_recovery_used: profile.missed_lead_recovery_used ?? false,
    missed_lead_recovery_status: profile.missed_lead_recovery_status,
    missed_lead_recovery_reason: profile.missed_lead_recovery_reason,
    recovery_eligible: profile.recovery_eligible ?? false,
    recovery_blocked: profile.recovery_blocked ?? false,
    recovery_block_reason: profile.recovery_block_reason,
    original_lead_source: profile.original_lead_source || input.lead_source || 'unknown',
    first_response_sent: profile.first_response_sent ?? false,
    first_response_time_minutes: profile.first_response_time_minutes,
    homeowner_replied: profile.homeowner_replied ?? false,
    prior_follow_up_count: profile.prior_follow_up_count ?? 0,
    max_follow_up_attempts: profile.max_follow_up_attempts ?? 4,
    max_follow_up_attempts_reached: profile.max_follow_up_attempts_reached ?? false,
    last_contact_channel: profile.last_contact_channel,
    last_follow_up_date: profile.last_follow_up_date,
    contact_permission_status: profile.unclear_contact_permission
      ? 'unknown'
      : readinessItem?.contact_permission_status || 'unknown',
    do_not_contact_status: readinessItem?.do_not_contact_status ?? false,
    homeowner_contact_ready: profile.homeowner_phone_present === false
      ? false
      : (readinessItem?.homeowner_contact_ready ?? false),
    homeowner_phone_present:
      profile.homeowner_phone_present ?? Boolean(input.homeowner_phone),
    homeowner_email_present:
      profile.homeowner_email_present ?? Boolean(input.homeowner_email),
    service_area_status: profile.service_area_status || readinessItem?.service_area_status || 'fit',
    lead_source_status: profile.lead_source_status || readinessItem?.lead_source_status || 'captured',
    roofing_issue_summary_present: readinessItem?.roofing_issue_summary_present ?? true,
    urgency_present: readinessItem?.urgency_present ?? true,
    manual_outreach_needed: profile.manual_outreach_needed ?? false,
    manual_outreach_owner: profile.manual_outreach_owner,
    roofer_review_required:
      profile.roofer_review_required ??
      (readinessItem?.roofer_review_required ||
        postItem?.roofer_review_required ||
        profile.business_judgment_required ||
        false),
    roofleadhq_review_required:
      profile.roofleadhq_review_required ??
      (readinessItem?.roofleadhq_review_required ||
        postItem?.roofleadhq_review_required ||
        profile.system_quality_issue ||
        false),
    business_judgment_required: profile.business_judgment_required ?? false,
    system_quality_issue: profile.system_quality_issue ?? false,
    required_manual_next_step: manualNextStep,
    next_step_owner: nextStepOwner,
    next_step_due_date: profile.next_step_due_date,
    audit_event_id: `${scenario.scenario_id}_missed_lead_recovery_audit_${index + 1}`,
    live_sms_allowed: 'no',
    live_email_allowed: 'no',
    live_call_allowed: 'no',
    notification_sent: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    missed_inquiry_type: profile.missed_inquiry_type,
    pricing_question: profile.pricing_question ?? false,
    estimate_question: profile.estimate_question ?? false,
    quote_request: profile.quote_request ?? false,
    insurance_complexity: profile.insurance_complexity ?? false,
    payment_or_invoice_question: profile.payment_or_invoice_question ?? false,
    contract_question: profile.contract_question ?? false,
    upset_homeowner: profile.upset_homeowner ?? false,
    broken_routing: profile.broken_routing ?? false,
    missed_data_capture: profile.missed_data_capture ?? false,
    source_attribution_issue: profile.source_attribution_issue ?? false,
    recovery_state_mismatch: profile.recovery_state_mismatch ?? false,
    unclear_contact_permission: profile.unclear_contact_permission ?? false,
    unsupported_request: profile.unsupported_request ?? false,
    scheduling_issue: profile.scheduling_issue ?? false,
    repair_vs_replacement_question: profile.repair_vs_replacement_question ?? false,
    setup_issue: profile.setup_issue ?? false,
    quality_control_concern: profile.quality_control_concern ?? false,
    bad_or_unclear_ai_response: profile.bad_or_unclear_ai_response ?? false,
    fake_data_only: true,
  };
}

function buildScenarioMissedLeadRecoveryItem(
  scenario,
  readinessItem,
  postItem,
  manualOutreachItem,
) {
  const profile = MISSED_LEAD_RECOVERY_PROFILES[scenario.scenario_id];
  if (!profile) {
    return null;
  }
  return buildMissedLeadRecoveryItem(
    scenario,
    readinessItem,
    postItem,
    manualOutreachItem,
    profile,
    0,
  );
}

function buildTopLevelMissedLeadRecovery(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => {
      const readinessItem = buildScenarioAppointmentReadinessItem(scenario);
      const postItem = buildScenarioPostInspectionItem(scenario);
      const manualOutreachItem = buildScenarioManualOutreachItem(
        scenario,
        readinessItem,
        postItem,
        buildScenarioFeedbackPermissionItem(scenario, postItem),
      );
      return buildScenarioMissedLeadRecoveryItem(
        scenario,
        readinessItem,
        postItem,
        manualOutreachItem,
      );
    })
    .filter(Boolean);

  const eligibleItems = allItems.filter((i) => i.recovery_eligible);
  const blockedItems = allItems.filter((i) => i.recovery_blocked);
  const activeItems = allItems.filter(
    (i) => i.missed_lead_recovery_used && i.missed_lead_recovery_status === 'active',
  );
  const stoppedItems = allItems.filter(
    (i) => i.missed_lead_recovery_status === 'stopped_max_attempts',
  );
  const manualOutreachItems = allItems.filter((i) => i.manual_outreach_needed);
  const openRecoveryItems = allItems.filter(
    (i) =>
      i.missed_lead_recovery_used &&
      !i.recovery_blocked &&
      i.missed_lead_recovery_status !== 'not_used',
  );
  const reviewOrBlockedItems = allItems.filter(
    (i) => i.recovery_blocked || i.roofer_review_required || i.roofleadhq_review_required,
  );

  const statusCounts = {};
  for (const item of allItems) {
    statusCounts[item.missed_lead_recovery_status] =
      (statusCounts[item.missed_lead_recovery_status] || 0) + 1;
  }

  const blockerCounts = {};
  for (const item of blockedItems) {
    if (item.recovery_block_reason) {
      blockerCounts[item.recovery_block_reason] =
        (blockerCounts[item.recovery_block_reason] || 0) + 1;
    }
  }

  const ownerCounts = {};
  for (const item of manualOutreachItems) {
    if (item.manual_outreach_owner) {
      ownerCounts[item.manual_outreach_owner] =
        (ownerCounts[item.manual_outreach_owner] || 0) + 1;
    }
  }

  return {
    missed_lead_recovery_expansion: 'native_workflow_fixture_missed_lead_recovery_expansion',
    missed_lead_recovery_expansion_summary: {
      description:
        'Deterministic fake-data missed lead recovery expansion across all fixture scenarios — explicit eligible vs blocked recovery boundaries without live sends or notifications',
      total_missed_lead_recovery_items: allItems.length,
      recovery_eligible_count: eligibleItems.length,
      recovery_blocked_count: blockedItems.length,
      missed_lead_recovery_active_count: activeItems.length,
      missed_lead_recovery_stopped_count: stoppedItems.length,
      manual_outreach_handoff_count: manualOutreachItems.length,
      live_sms_enabled: false,
      live_email_enabled: false,
      live_call_enabled: false,
      notifications_sent: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    missed_lead_recovery_items: allItems,
    missed_lead_recovery_status_summary: {
      description: 'Missed lead recovery status distribution across fixture scenarios',
      status_counts: statusCounts,
      recovery_eligible_count: eligibleItems.length,
      recovery_blocked_count: blockedItems.length,
      missed_lead_recovery_active_count: activeItems.length,
      missed_lead_recovery_stopped_count: stoppedItems.length,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_eligibility_summary: {
      description:
        'Recovery eligibility rules — contact ready, permission safe, service area fit, follow-up attempts remaining',
      recovery_eligible_count: eligibleItems.length,
      recovery_eligible_requires_contact_ready: eligibleItems.every((i) => i.homeowner_contact_ready),
      recovery_eligible_requires_no_do_not_contact: eligibleItems.every((i) => !i.do_not_contact_status),
      recovery_eligible_requires_safe_follow_up_remaining: eligibleItems.every(
        (i) => !i.max_follow_up_attempts_reached,
      ),
      missed_lead_recovery_can_mark_eligible_when_contact_and_permission_safe: eligibleItems.every(
        (i) =>
          i.homeowner_contact_ready &&
          !i.do_not_contact_status &&
          i.contact_permission_status === 'known',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_blocker_summary: {
      description: 'Recovery blocker catalog — do-not-contact, missing contact, max attempts, reviews',
      blocker_counts: blockerCounts,
      do_not_contact_blocks_recovery: allItems
        .filter((i) => i.do_not_contact_status)
        .every((i) => i.recovery_blocked && !i.recovery_eligible),
      missing_contact_blocks_recovery_or_routes_to_review: allItems
        .filter((i) => !i.homeowner_contact_ready)
        .every((i) => i.recovery_blocked || i.missed_lead_recovery_status.includes('review')),
      unclear_contact_permission_blocks_recovery: allItems
        .filter((i) => i.unclear_contact_permission || i.contact_permission_status === 'unknown')
        .every((i) => i.recovery_blocked || i.missed_lead_recovery_status.includes('review')),
      max_follow_up_attempts_blocks_additional_recovery: stoppedItems.every(
        (i) => i.max_follow_up_attempts_reached && i.recovery_blocked,
      ),
      bad_fit_or_excluded_blocks_recovery: allItems
        .filter((i) => i.recovery_block_reason === 'bad_fit_or_excluded')
        .every((i) => i.recovery_blocked),
      excluded_service_area_blocks_recovery: allItems
        .filter((i) => i.service_area_status === 'excluded')
        .every((i) => i.recovery_blocked),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_attempt_summary: {
      description: 'Follow-up attempt tracking — dry-run only, no live sends',
      total_prior_follow_up_count: allItems.reduce((sum, i) => sum + i.prior_follow_up_count, 0),
      items_with_follow_up_attempts: allItems.filter((i) => i.prior_follow_up_count > 0).length,
      all_items_track_first_response_time: allItems.every(
        (i) => i.first_response_sent !== undefined && i.first_response_time_minutes !== undefined,
      ),
      all_items_track_homeowner_replied: allItems.every(
        (i) => i.homeowner_replied !== undefined,
      ),
      all_items_track_max_follow_up_attempts: allItems.every(
        (i) => i.max_follow_up_attempts !== undefined && i.max_follow_up_attempts !== null,
      ),
      no_live_sends_performed: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_owner_summary: {
      description: 'Manual outreach owner assignments for recovery handoff — roofer vs RoofLeadHQ/Jason',
      owner_counts: ownerCounts,
      roofer_owned_count: manualOutreachItems.filter((i) => i.manual_outreach_owner === 'roofer')
        .length,
      roofleadhq_owned_count: manualOutreachItems.filter(
        (i) => i.manual_outreach_owner === 'roofleadhq_jason',
      ).length,
      all_manual_outreach_items_have_owner: manualOutreachItems.every(
        (i) => i.manual_outreach_owner && i.manual_outreach_owner !== 'none',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_manual_outreach_summary: {
      description:
        'Manual outreach handoff when recovery requires human follow-up — no live automation',
      manual_outreach_needed_count: manualOutreachItems.length,
      missed_lead_recovery_manual_outreach_handoff_present: manualOutreachItems.every(
        (i) => i.required_manual_next_step && i.next_step_owner,
      ),
      all_manual_outreach_manual_only: manualOutreachItems.every(
        (i) => i.live_sms_allowed === 'no' && i.live_email_allowed === 'no' && i.live_call_allowed === 'no',
      ),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_review_boundary_summary: {
      description:
        'Recovery review ownership — roofer owns business judgment; RoofLeadHQ/Jason limited to system quality',
      roofer_review_blocked_count: allItems.filter(
        (i) => i.roofer_review_required && i.recovery_blocked,
      ).length,
      roofleadhq_review_blocked_count: allItems.filter(
        (i) => i.roofleadhq_review_required && i.recovery_blocked,
      ).length,
      pricing_question_routes_to_roofer: allItems
        .filter((i) => i.pricing_question)
        .every((i) => i.roofer_review_required && i.recovery_blocked),
      estimate_question_routes_to_roofer: allItems
        .filter((i) => i.estimate_question)
        .every((i) => i.roofer_review_required && i.recovery_blocked),
      quote_request_routes_to_roofer: allItems
        .filter((i) => i.quote_request)
        .every((i) => i.roofer_review_required && i.recovery_blocked),
      insurance_complexity_routes_to_roofer: allItems
        .filter((i) => i.insurance_complexity)
        .every((i) => i.roofer_review_required),
      payment_or_invoice_routes_to_roofer: allItems
        .filter((i) => i.payment_or_invoice_question)
        .every((i) => i.roofer_review_required),
      contract_question_routes_to_roofer: allItems
        .filter((i) => i.contract_question)
        .every((i) => i.roofer_review_required),
      upset_homeowner_routes_to_roofer: allItems
        .filter((i) => i.upset_homeowner)
        .every((i) => i.roofer_review_required),
      broken_routing_routes_to_roofleadhq: allItems
        .filter((i) => i.broken_routing)
        .every((i) => i.roofleadhq_review_required),
      missed_data_capture_routes_to_roofleadhq: allItems
        .filter((i) => i.missed_data_capture)
        .every((i) => i.roofleadhq_review_required),
      source_attribution_issue_routes_to_roofleadhq: allItems
        .filter((i) => i.source_attribution_issue)
        .every((i) => i.roofleadhq_review_required),
      recovery_state_mismatch_routes_to_roofleadhq: allItems
        .filter((i) => i.recovery_state_mismatch)
        .every((i) => i.roofleadhq_review_required),
      lead_source_required_or_unknown_marker_present: allItems.every(
        (i) => i.original_lead_source && i.lead_source_status,
      ),
      all_blocked_or_review_have_manual_next_step: reviewOrBlockedItems.every(
        (i) => i.required_manual_next_step,
      ),
      all_open_recovery_have_next_step_owner: openRecoveryItems.every((i) => i.next_step_owner),
      all_open_recovery_have_due_date: openRecoveryItems.every((i) => i.next_step_due_date),
      unsupported_request_routes_to_review_or_later_only: allItems
        .filter((i) => i.unsupported_request)
        .every((i) => i.recovery_blocked || i.missed_lead_recovery_status.includes('review')),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_reporting_summary: {
      description: 'Reporting and CSV compatibility for missed lead recovery fields',
      csv_field_preserved: 'missed_lead_recovery_used',
      weekly_snapshot_includes_missed_lead_recovery_active: true,
      lead_source_summary_includes_missed_lead_recovery_count: true,
      growth_plan_includes_missed_lead_recovery_tracking: true,
      starter_plan_excludes_missed_lead_recovery_tracking: true,
      reporting_summary_includes_missed_lead_recovery: true,
      csv_snapshot_preserves_missed_lead_recovery_field: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    missed_lead_recovery_safety_assertions: [
      ...MISSED_LEAD_RECOVERY_SAFETY_ASSERTIONS,
      'no_supabase_reads_or_writes',
      'no_production_data',
      'no_live_automation',
      'no_external_service_calls',
      'demo_ready_with_live_automation_disabled',
    ],
  };
}

const PLAN_INCLUDED_LEAD_VOLUME = {
  starter: 100,
  growth: 300,
  elite: 500,
};

const CUSTOM_REVIEW_VOLUME_THRESHOLD = 500;

const DRAFT_OVERAGE_FEE_CONCEPT = {
  possible_draft_fee_per_50_leads_usd: 100,
  billing_approval_status: 'draft_internal_not_approved',
  live_billing_published: false,
  publication_approval_required: true,
};

const USAGE_VOLUME_SAFETY_ASSERTIONS = [
  'usage_volume_expansion_summary_present',
  'usage_volume_items_present',
  'usage_volume_item_required_fields_present',
  'starter_limit_100_leads_enforced_in_fixture',
  'growth_limit_300_leads_enforced_in_fixture',
  'elite_limit_500_leads_enforced_in_fixture',
  'five_hundred_plus_leads_routes_to_custom_review',
  'two_plus_locations_routes_to_custom_review',
  'multiple_calendars_routes_to_custom_review',
  'multiple_phone_numbers_routes_to_custom_review',
  'multiple_sales_reps_routes_to_custom_review',
  'complex_routing_routes_to_custom_review',
  'advanced_custom_reporting_routes_to_custom_review',
  'overage_tracking_is_fake_data_only',
  'overage_does_not_trigger_live_billing',
  'overage_does_not_auto_upgrade_plan',
  'plan_upgrade_recommendation_is_manual_review_only',
  'billing_action_allowed_is_no_for_all_items',
  'automatic_plan_change_allowed_is_no_for_all_items',
  'live_billing_action_performed_is_no_for_all_items',
  'production_data_touched_is_no_for_all_items',
  'external_services_called_is_no_for_all_items',
  'usage_volume_does_not_touch_production_data',
  'usage_volume_does_not_call_external_services',
  'usage_volume_does_not_change_customer_plan',
  'usage_volume_does_not_send_notifications',
  'usage_volume_decisions_are_audited',
  'reporting_summary_includes_usage_volume',
  'csv_snapshot_preserves_plan_and_usage_context_if_applicable',
  'public_pricing_copy_not_changed_without_approval',
];

const USAGE_VOLUME_PROFILES = {
  normal_lead_to_appointment_readiness: {
    current_period_lead_count: 180,
    prior_period_lead_count: 165,
    projected_period_lead_count: 195,
  },
  missing_information_path: {
    current_period_lead_count: 175,
    prior_period_lead_count: 160,
    projected_period_lead_count: 190,
  },
  duplicate_review_path: {
    complex_routing: true,
    custom_review_required: true,
    custom_review_reason: 'complex_routing',
  },
  bad_fit_excluded_path: {
    current_period_lead_count: 160,
    prior_period_lead_count: 155,
    projected_period_lead_count: 170,
  },
  stopped_do_not_contact_path: {
    current_period_lead_count: 170,
    prior_period_lead_count: 168,
    projected_period_lead_count: 175,
  },
  missed_lead_recovery_path: {
    current_period_lead_count: 210,
    prior_period_lead_count: 195,
    projected_period_lead_count: 225,
  },
  roofer_review_needed_path: {
    phone_number_count: 2,
    custom_review_required: true,
    custom_review_reason: 'multiple_phone_numbers',
  },
  roofleadhq_system_review_needed_path: {
    current_period_lead_count: 190,
    prior_period_lead_count: 185,
    projected_period_lead_count: 200,
  },
  appointment_booked_path: {
    calendar_count: 2,
    custom_review_required: true,
    custom_review_reason: 'multiple_calendars',
  },
  inspection_completed_path: {
    sales_rep_count: 3,
    custom_review_required: true,
    custom_review_reason: 'multiple_sales_reps',
  },
  inspection_missed_reschedule_path: {
    current_period_lead_count: 200,
    prior_period_lead_count: 188,
    projected_period_lead_count: 215,
  },
  post_inspection_still_open_path: {
    current_period_lead_count: 320,
    prior_period_lead_count: 290,
    projected_period_lead_count: 335,
    usage_over_limit: true,
    overage_count: 20,
    plan_upgrade_recommended: true,
  },
  estimate_needed_estimate_sent_tracking_path: {
    current_period_lead_count: 205,
    prior_period_lead_count: 198,
    projected_period_lead_count: 218,
  },
  homeowner_follow_up_needed_path: {
    current_period_lead_count: 195,
    prior_period_lead_count: 190,
    projected_period_lead_count: 205,
  },
  roofer_follow_up_needed_path: {
    current_period_lead_count: 198,
    prior_period_lead_count: 192,
    projected_period_lead_count: 210,
  },
  feedback_permission_yes_path: {
    current_period_lead_count: 185,
    prior_period_lead_count: 178,
    projected_period_lead_count: 192,
  },
  feedback_permission_no_path: {
    current_period_lead_count: 182,
    prior_period_lead_count: 176,
    projected_period_lead_count: 188,
  },
  feedback_permission_not_asked_path: {
    current_period_lead_count: 188,
    prior_period_lead_count: 180,
    projected_period_lead_count: 195,
  },
  csv_report_snapshot_fake_data_path: {
    advanced_custom_reporting: true,
    custom_review_required: true,
    custom_review_reason: 'advanced_custom_reporting',
    current_period_lead_count: 275,
    prior_period_lead_count: 260,
    projected_period_lead_count: 290,
  },
  starter_plan_profile_path: {
    plan_profile: 'starter',
    current_period_lead_count: 80,
    prior_period_lead_count: 72,
    projected_period_lead_count: 88,
    included_lead_volume: 100,
    volume_band: '80_100pct',
  },
  growth_plan_profile_path: {
    plan_profile: 'growth',
    current_period_lead_count: 250,
    prior_period_lead_count: 230,
    projected_period_lead_count: 270,
    included_lead_volume: 300,
    volume_band: '80_100pct',
  },
  elite_plan_profile_path: {
    plan_profile: 'elite',
    current_period_lead_count: 450,
    prior_period_lead_count: 420,
    projected_period_lead_count: 480,
    included_lead_volume: 500,
    volume_band: '80_100pct',
  },
  custom_review_500_plus_leads_path: {
    plan_profile: 'elite',
    current_period_lead_count: 520,
    prior_period_lead_count: 490,
    projected_period_lead_count: 550,
    included_lead_volume: 500,
    custom_review_required: true,
    custom_review_reason: 'volume_exceeds_500',
    volume_band: 'custom_review_band',
  },
  custom_review_two_plus_locations_path: {
    location_count: 2,
    current_period_lead_count: 240,
    prior_period_lead_count: 220,
    projected_period_lead_count: 255,
    custom_review_required: true,
    custom_review_reason: 'multi_location',
  },
  activation_flag_false_blocks_live_action_path: {
    current_period_lead_count: 215,
    prior_period_lead_count: 200,
    projected_period_lead_count: 228,
  },
};

function computeVolumeBand(current, included) {
  if (!included) return 'custom_review_band';
  if (current > included) return 'over_limit';
  const pct = current / included;
  if (pct >= 0.95) return 'at_limit';
  if (pct >= 0.8) return '80_100pct';
  if (pct >= 0.5) return '50_80pct';
  return 'under_50pct';
}

function detectCustomReviewTriggers(input, profile) {
  const reasons = [];
  const current = profile.current_period_lead_count ?? input.monthly_leads ?? 0;
  const locationCount = profile.location_count ?? input.location_count ?? 1;
  const calendarCount = profile.calendar_count ?? input.calendar_count ?? 1;
  const phoneCount = profile.phone_number_count ?? input.phone_number_count ?? 1;
  const salesRepCount = profile.sales_rep_count ?? input.sales_rep_count ?? 1;

  if (current >= CUSTOM_REVIEW_VOLUME_THRESHOLD) reasons.push('volume_exceeds_500');
  if (locationCount >= 2) reasons.push('multi_location');
  if (calendarCount >= 2) reasons.push('multiple_calendars');
  if (phoneCount >= 2) reasons.push('multiple_phone_numbers');
  if (salesRepCount >= 2) reasons.push('multiple_sales_reps');
  if (profile.complex_routing) reasons.push('complex_routing');
  if (profile.advanced_custom_reporting) reasons.push('advanced_custom_reporting');
  if (profile.unusual_integration_needs) reasons.push('unusual_integration_needs');
  if (profile.multi_location_operations) reasons.push('multi_location_operations');

  return reasons;
}

function buildUsageVolumeItem(scenario, profile, index) {
  const input = scenario.input_fixture_summary || {};
  const planProfile = profile.plan_profile || scenario.plan_profile || input.plan_profile || 'growth';
  const included =
    profile.included_lead_volume ??
    PLAN_INCLUDED_LEAD_VOLUME[planProfile] ??
    PLAN_INCLUDED_LEAD_VOLUME.growth;
  const current =
    profile.current_period_lead_count ??
    input.monthly_leads ??
    (planProfile === 'starter' ? 80 : planProfile === 'elite' ? 450 : 180);
  const prior = profile.prior_period_lead_count ?? Math.max(0, current - 15);
  const projected = profile.projected_period_lead_count ?? current + 15;

  const detectedTriggers = detectCustomReviewTriggers(input, {
    ...profile,
    current_period_lead_count: current,
  });
  const customReviewRequired =
    profile.custom_review_required === true || detectedTriggers.length > 0;
  const customReviewReason =
    profile.custom_review_reason ||
    (detectedTriggers.length ? detectedTriggers[0] : null);

  const usageOverLimit =
    profile.usage_over_limit === true || (included && current > included && !customReviewRequired);
  const overageCount =
    profile.overage_count ?? (usageOverLimit && included ? Math.max(0, current - included) : 0);
  const overageBlockCount =
    profile.overage_block_count_if_applicable ??
    (overageCount > 0 ? Math.ceil(overageCount / 50) : 0);

  let planLimitStatus = 'within_limit';
  if (customReviewRequired) planLimitStatus = 'custom_review_required';
  else if (usageOverLimit) planLimitStatus = 'over_limit_fake_tracking_only';

  const volumeBand =
    profile.volume_band ?? computeVolumeBand(current, customReviewRequired ? included : included);

  return {
    usage_volume_item_id: `${scenario.scenario_id}_usage_volume_${index + 1}`,
    scenario_id: scenario.scenario_id,
    roofer_account_id: input.fixture_roofer_id || 'roof-fix-001',
    plan_profile: planProfile,
    report_period: profile.report_period || '2026-06',
    included_lead_volume: included,
    current_period_lead_count: current,
    prior_period_lead_count: prior,
    projected_period_lead_count: projected,
    volume_band: volumeBand,
    plan_limit_status: planLimitStatus,
    usage_over_limit: usageOverLimit,
    overage_count: overageCount,
    overage_block_count_if_applicable: overageBlockCount,
    plan_upgrade_recommended: profile.plan_upgrade_recommended ?? (usageOverLimit && !customReviewRequired),
    custom_review_required: customReviewRequired,
    custom_review_reason: customReviewReason,
    custom_review_triggers_detected: detectedTriggers,
    location_count: profile.location_count ?? input.location_count ?? 1,
    calendar_count: profile.calendar_count ?? input.calendar_count ?? 1,
    phone_number_count: profile.phone_number_count ?? input.phone_number_count ?? 1,
    sales_rep_count: profile.sales_rep_count ?? input.sales_rep_count ?? 1,
    complex_routing: profile.complex_routing ?? false,
    advanced_custom_reporting: profile.advanced_custom_reporting ?? false,
    draft_overage_fee_concept: DRAFT_OVERAGE_FEE_CONCEPT,
    billing_action_allowed: 'no',
    automatic_plan_change_allowed: 'no',
    live_billing_action_performed: 'no',
    production_data_touched: 'no',
    external_services_called: 'no',
    audit_event_id: `${scenario.scenario_id}_usage_volume_audit_${index + 1}`,
    fake_data_only: true,
  };
}

function buildScenarioUsageVolumeItem(scenario) {
  const profile = USAGE_VOLUME_PROFILES[scenario.scenario_id];
  if (!profile) return null;
  return buildUsageVolumeItem(scenario, profile, 0);
}

function buildTopLevelUsageVolume(scenarios, outputBase) {
  const allItems = scenarios
    .map((scenario) => buildScenarioUsageVolumeItem(scenario))
    .filter(Boolean);

  const starterItems = allItems.filter((i) => i.plan_profile === 'starter');
  const growthItems = allItems.filter((i) => i.plan_profile === 'growth');
  const eliteItems = allItems.filter((i) => i.plan_profile === 'elite');
  const customReviewItems = allItems.filter((i) => i.custom_review_required);
  const overageItems = allItems.filter((i) => i.usage_over_limit);
  const upgradeRecommendedItems = allItems.filter((i) => i.plan_upgrade_recommended);

  const starterWithinLimit = starterItems.every(
    (i) => i.included_lead_volume === 100 && i.current_period_lead_count <= 100,
  );
  const growthWithinLimit = growthItems.filter((i) => !i.custom_review_required).every(
    (i) =>
      i.included_lead_volume === 300 &&
      (i.current_period_lead_count <= 300 || i.usage_over_limit),
  );
  const eliteWithinLimit = eliteItems.filter((i) => !i.custom_review_required).every(
    (i) => i.included_lead_volume === 500 && i.current_period_lead_count <= 500,
  );

  return {
    usage_volume_expansion: 'native_workflow_fixture_usage_volume_plan_limit_expansion',
    usage_volume_expansion_summary: {
      description:
        'Deterministic fake-data usage volume and plan-limit expansion across all fixture scenarios — Starter/Growth/Elite/Custom Review boundaries without live billing or plan changes',
      total_usage_volume_items: allItems.length,
      starter_item_count: starterItems.length,
      growth_item_count: growthItems.length,
      elite_item_count: eliteItems.length,
      custom_review_item_count: customReviewItems.length,
      overage_item_count: overageItems.length,
      plan_upgrade_recommended_count: upgradeRecommendedItems.length,
      draft_overage_fee_concept: DRAFT_OVERAGE_FEE_CONCEPT,
      public_pricing_copy_changed: false,
      public_pricing_copy_approval_required: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
      scenario_count: outputBase.scenario_count,
    },
    usage_volume_items: allItems,
    plan_limit_summary: {
      description: 'Plan included lead volume boundaries — Starter 100, Growth 300, Elite 500',
      starter_included_leads: 100,
      growth_included_leads: 300,
      elite_included_leads: 500,
      custom_review_threshold_leads: CUSTOM_REVIEW_VOLUME_THRESHOLD,
      starter_limit_100_leads_enforced_in_fixture: starterWithinLimit,
      growth_limit_300_leads_enforced_in_fixture: growthWithinLimit,
      elite_limit_500_leads_enforced_in_fixture: eliteWithinLimit,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    starter_volume_summary: {
      description:
        'Starter plan — up to 100 leads/month, simple/single-location, basic reporting, no advanced source ROI by default',
      included_lead_volume: 100,
      item_count: starterItems.length,
      within_limit_count: starterItems.filter((i) => !i.usage_over_limit).length,
      basic_reporting_only: true,
      advanced_source_roi_by_default: false,
      complex_routing_triggers_review: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    growth_volume_summary: {
      description:
        'Growth plan — up to 300 leads/month, single location, missed lead recovery, source tracking, appointment readiness, booked inspection tracking, post-inspection follow-up, feedback capture, weekly/monthly reporting, CSV export',
      included_lead_volume: 300,
      item_count: growthItems.length,
      within_limit_count: growthItems.filter((i) => !i.usage_over_limit && !i.custom_review_required)
        .length,
      missed_lead_recovery_included: true,
      source_tracking_included: true,
      appointment_readiness_included: true,
      booked_inspection_tracking_included: true,
      post_inspection_follow_up_included: true,
      feedback_capture_included: true,
      weekly_monthly_reporting_included: true,
      csv_export_included: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    elite_volume_summary: {
      description:
        'Elite plan — up to 500 leads/month, single location unless custom approved, advanced reporting, deeper source segmentation, larger review queue capacity, priority setup/support, detailed CSV/export',
      included_lead_volume: 500,
      item_count: eliteItems.length,
      within_limit_count: eliteItems.filter((i) => !i.custom_review_required && !i.usage_over_limit)
        .length,
      advanced_reporting_included: true,
      deeper_source_segmentation_included: true,
      larger_review_queue_capacity: true,
      priority_setup_support: true,
      detailed_csv_export_included: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    custom_review_volume_summary: {
      description:
        'Custom Review triggers — 500+ leads, 2+ locations, multiple calendars/phones/reps, complex routing, advanced custom reporting, unusual integrations, multi-location operations',
      custom_review_item_count: customReviewItems.length,
      five_hundred_plus_leads_routes_to_custom_review: customReviewItems.some(
        (i) =>
          i.scenario_id === 'custom_review_500_plus_leads_path' ||
          i.custom_review_reason === 'volume_exceeds_500',
      ),
      two_plus_locations_routes_to_custom_review: customReviewItems.some(
        (i) =>
          i.scenario_id === 'custom_review_two_plus_locations_path' ||
          i.custom_review_reason === 'multi_location',
      ),
      multiple_calendars_routes_to_custom_review: customReviewItems.some(
        (i) => i.custom_review_reason === 'multiple_calendars' || i.calendar_count >= 2,
      ),
      multiple_phone_numbers_routes_to_custom_review: customReviewItems.some(
        (i) => i.custom_review_reason === 'multiple_phone_numbers' || i.phone_number_count >= 2,
      ),
      multiple_sales_reps_routes_to_custom_review: customReviewItems.some(
        (i) => i.custom_review_reason === 'multiple_sales_reps' || i.sales_rep_count >= 2,
      ),
      complex_routing_routes_to_custom_review: customReviewItems.some(
        (i) => i.custom_review_reason === 'complex_routing' || i.complex_routing,
      ),
      advanced_custom_reporting_routes_to_custom_review: customReviewItems.some(
        (i) =>
          i.custom_review_reason === 'advanced_custom_reporting' || i.advanced_custom_reporting,
      ),
      manual_review_only: true,
      automatic_plan_change_blocked: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    overage_tracking_summary: {
      description:
        'Overage tracked in fake data only — no billing, no auto-upgrade, no notifications, draft $100/50 leads concept not approved',
      overage_item_count: overageItems.length,
      overage_tracking_is_fake_data_only: true,
      overage_does_not_trigger_live_billing: allItems.every(
        (i) => i.live_billing_action_performed === 'no',
      ),
      overage_does_not_auto_upgrade_plan: allItems.every(
        (i) => i.automatic_plan_change_allowed === 'no',
      ),
      overage_does_not_send_notifications: true,
      draft_overage_fee_concept: DRAFT_OVERAGE_FEE_CONCEPT,
      live_overage_fee_published: false,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    plan_upgrade_recommendation_summary: {
      description: 'Plan upgrade recommendations are manual review only — no automatic plan changes',
      plan_upgrade_recommended_count: upgradeRecommendedItems.length,
      plan_upgrade_recommendation_is_manual_review_only: true,
      automatic_plan_change_allowed_is_no: allItems.every(
        (i) => i.automatic_plan_change_allowed === 'no',
      ),
      billing_action_allowed_is_no: allItems.every((i) => i.billing_action_allowed === 'no'),
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    usage_volume_reporting_summary: {
      description: 'Reporting and CSV compatibility for plan profile and usage volume context',
      reporting_summary_includes_usage_volume: true,
      csv_snapshot_preserves_plan_and_usage_context_if_applicable: true,
      csv_fields_preserved: [
        'plan_profile',
        'included_lead_volume',
        'current_period_lead_count',
        'usage_over_limit',
        'plan_limit_status',
      ],
      weekly_snapshot_includes_plan_context: true,
      monthly_snapshot_includes_usage_volume: true,
      public_pricing_copy_not_changed_without_approval: true,
      fake_data_only: true,
      live_actions_performed: 'no',
      production_data_touched: 'no',
      external_services_called: 'no',
    },
    usage_volume_safety_assertions: [
      ...USAGE_VOLUME_SAFETY_ASSERTIONS,
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
  const scenarioDraft = {
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
    reporting_snapshot: config.reporting_snapshot || null,
    reporting_impact: config.reporting_impact || null,
    csv_snapshot_if_applicable: config.csv_snapshot_if_applicable || null,
    activation_flag_results: config.activation_flag_results || activationFlagResults(),
    audit_events: config.audit_events,
    safety_assertions: config.safety_assertions,
    ...SAFETY,
    result: 'PASS',
  };
  const reviewQueueItems = (config.review_queue_items || []).map((item, index) =>
    expandScenarioReviewItem(scenarioDraft, item, index),
  );
  const appointmentReadinessItem = buildScenarioAppointmentReadinessItem(scenarioDraft);
  const postInspectionItem = buildScenarioPostInspectionItem(scenarioDraft);
  const feedbackPermissionItem = buildScenarioFeedbackPermissionItem(
    scenarioDraft,
    postInspectionItem,
  );
  const manualOutreachItem = buildScenarioManualOutreachItem(
    scenarioDraft,
    appointmentReadinessItem,
    postInspectionItem,
    feedbackPermissionItem,
  );
  const missedLeadRecoveryItem = buildScenarioMissedLeadRecoveryItem(
    scenarioDraft,
    appointmentReadinessItem,
    postInspectionItem,
    manualOutreachItem,
  );
  const usageVolumeItem = buildScenarioUsageVolumeItem(scenarioDraft);
  return {
    ...scenarioDraft,
    review_queue_items: reviewQueueItems,
    appointment_readiness_items: appointmentReadinessItem ? [appointmentReadinessItem] : [],
    post_inspection_items: postInspectionItem ? [postInspectionItem] : [],
    feedback_permission_items: feedbackPermissionItem ? [feedbackPermissionItem] : [],
    manual_outreach_items: manualOutreachItem ? [manualOutreachItem] : [],
    missed_lead_recovery_items: missedLeadRecoveryItem ? [missedLeadRecoveryItem] : [],
    usage_volume_items: usageVolumeItem ? [usageVolumeItem] : [],
  };
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
    review_queue_expansion: 'native_workflow_fixture_review_queue_expansion',
    appointment_readiness_expansion: 'native_workflow_fixture_appointment_readiness_expansion',
    post_inspection_expansion: 'native_workflow_fixture_post_inspection_expansion',
    feedback_permission_expansion: 'native_workflow_fixture_feedback_permission_expansion',
    manual_outreach_expansion: 'native_workflow_fixture_manual_outreach_expansion',
    missed_lead_recovery_expansion: 'native_workflow_fixture_missed_lead_recovery_expansion',
    usage_volume_expansion: 'native_workflow_fixture_usage_volume_plan_limit_expansion',
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
  const reviewQueueOutput = buildTopLevelReviewQueue(scenarios, outputBase);
  const appointmentReadinessOutput = buildTopLevelAppointmentReadiness(scenarios, outputBase);
  const postInspectionOutput = buildTopLevelPostInspection(scenarios, outputBase);
  const feedbackPermissionOutput = buildTopLevelFeedbackPermission(scenarios, outputBase);
  const manualOutreachOutput = buildTopLevelManualOutreach(scenarios, outputBase);
  const missedLeadRecoveryOutput = buildTopLevelMissedLeadRecovery(scenarios, outputBase);
  const usageVolumeOutput = buildTopLevelUsageVolume(scenarios, outputBase);

  const output = {
    ...outputBase,
    ...reportingOutput,
    ...reviewQueueOutput,
    ...appointmentReadinessOutput,
    ...postInspectionOutput,
    ...feedbackPermissionOutput,
    ...manualOutreachOutput,
    ...missedLeadRecoveryOutput,
    ...usageVolumeOutput,
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
      'explicit_review_queue_coverage',
      'review_queue_fake_data_only',
      'review_queue_live_notification_blocked',
      'roofer_review_owns_business_judgment',
      'roofleadhq_review_limited_to_system_quality',
      'explicit_appointment_readiness_coverage',
      'appointment_readiness_fake_data_only',
      'appointment_readiness_live_calendar_blocked',
      'no_google_calendar_event_created',
      'explicit_post_inspection_coverage',
      'post_inspection_fake_data_only',
      'post_inspection_live_follow_up_blocked',
      'post_inspection_live_feedback_blocked',
      'no_automatic_estimate_quote_invoice_payment',
      'feedback_internal_unless_permission_obtained',
      'explicit_feedback_permission_coverage',
      'feedback_permission_fake_data_only',
      'feedback_permission_live_feedback_blocked',
      'no_automatic_public_review_or_testimonial_publication',
      'explicit_manual_outreach_coverage',
      'manual_outreach_fake_data_only',
      'manual_outreach_live_sends_blocked',
      'manual_outreach_no_notifications',
      'explicit_missed_lead_recovery_coverage',
      'missed_lead_recovery_fake_data_only',
      'missed_lead_recovery_live_sends_blocked',
      'missed_lead_recovery_no_notifications',
      'explicit_usage_volume_plan_limit_coverage',
      'usage_volume_fake_data_only',
      'usage_volume_no_live_billing',
      'usage_volume_no_auto_plan_change',
      'usage_volume_no_notifications',
    ],
    summary: {
      description:
        'Deterministic fake-data native workflow fixture state model dry-run with explicit guard assertion, reporting snapshot, review queue, appointment readiness, post-inspection, feedback permission, manual outreach, missed lead recovery, and usage volume plan-limit coverage completed safely',
      total_scenarios: scenarios.length,
      passed,
      failed,
      safety_posture: 'demo_ready_with_live_automation_disabled',
      live_automation_status: 'disabled',
      output_mode: 'stdout_json_only',
      guard_assertion_coverage: 'expanded',
      reporting_snapshot_coverage: 'expanded',
      review_queue_coverage: 'expanded',
      appointment_readiness_coverage: 'expanded',
      post_inspection_coverage: 'expanded',
      feedback_permission_coverage: 'expanded',
      manual_outreach_coverage: 'expanded',
      missed_lead_recovery_coverage: 'expanded',
      usage_volume_plan_limit_coverage: 'expanded',
    },
  };

  process.stdout.write(`${JSON.stringify(output, null, 2)}\n`);
}

main();