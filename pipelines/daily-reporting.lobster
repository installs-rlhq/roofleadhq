name: Daily Reporting & Observability
description: Generate daily performance summaries and detect issues
version: 0.1.0
triggers:
  - scheduler: "0 8 * * *"   # 8:00 AM daily

steps:
  - name: Aggregate Daily Stats
    type: supabase
    action: rpc
    function: get_daily_stats
    input:
      date: "{{ yesterday() }}"

  - name: Detect Duplicates
    type: supabase
    action: query
    table: leads
    filters:
      duplicate_count: "gt:0"
      created_at: "gte:{{ yesterday() }}"
    output:
      duplicates: "{{ query_result | length }}"

  - name: Detect Stale Issues
    type: supabase
    action: query
    table: leads
    filters:
      status: "stale"
      archived_at: "gte:{{ yesterday() }}"
    output:
      stale_count: "{{ query_result | length }}"

  - name: Generate Summary
    type: transform
    action: build_report
    input:
      stats: "{{ steps.aggregate_daily_stats }}"
      duplicates: "{{ steps.detect_duplicates }}"
      stale: "{{ steps.detect_stale_issues }}"

  - name: Send Daily Report
    type: notification
    action: email_or_slack
    input:
      to: "{{ master_config.reporting.recipients }}"
      subject: "RoofLeadHQ Daily Summary - {{ yesterday() }}"
      body: "{{ steps.generate_summary.report_text }}"

  - name: Log Report Run
    type: supabase
    action: insert
    table: pipeline_runs
    input:
      pipeline_name: "daily-reporting"
      status: "success"
      output: "{{ steps.generate_summary }}"

outputs:
  success: true
  report_date: "{{ yesterday() }}"