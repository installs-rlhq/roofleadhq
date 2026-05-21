name: Stale Lead Detection
description: Detect and re-engage or clean up stale leads
version: 0.1.0
triggers:
  - scheduler: every 6 hours

steps:
  - name: Find Stale Leads
    type: supabase
    action: query
    table: leads
    filters:
      status: ["new", "warm", "in_progress"]
      last_activity_at: "lt:{{ now() - master_config.defaults.sla.stale_lead_hours }}"
    output:
      stale_leads: "{{ query_result }}"

  - name: Process Each Stale Lead
    type: loop
    over: "{{ steps.find_stale_leads.stale_leads }}"
    steps:
      - name: Check Re-engagement Eligibility
        type: rules
        action: evaluate
        input:
          lead: "{{ current }}"
          max_reengages: 2
      - name: Re-engage or Archive
        type: conditional
        condition: "{{ reengage_eligible }}"
        if_true:
          - invoke: "pipelines/follow-up.lobster"
            input:
              lead_id: "{{ current.id }}"
              urgency: "nurture"
        if_false:
          - supabase: update
            table: leads
            input:
              status: "stale"
              archived_at: "{{ now() }}"

  - name: Log Cleanup Summary
    type: logging
    action: record
    input:
      event: "stale_detection_run"
      processed: "{{ steps.find_stale_leads.stale_leads | length }}"
      timestamp: "{{ now() }}"

outputs:
  success: true
  stale_leads_processed: "{{ steps.find_stale_leads.stale_leads | length }}"