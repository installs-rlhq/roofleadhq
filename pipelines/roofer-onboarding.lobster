name: Roofer Onboarding
description: Complete new roofer client intake and setup
version: 0.1.0
triggers:
  - manual
  - config_change: clients.*

steps:
  - name: Validate Config
    type: config
    action: validate_client
    input:
      client_id: "{{ input.client_id }}"

  - name: Create Stripe Customer
    type: stripe
    action: create_customer
    input:
      email: "{{ client.email }}"
      name: "{{ client.business_name }}"
      metadata:
        client_id: "{{ client.id }}"
        source: "roofleadhq_onboarding"

  - name: Provision Twilio Number
    type: twilio
    action: buy_number
    input:
      area_code: "{{ client.area_code | default('555') }}"
      friendly_name: "{{ client.business_name }} - RoofLeadHQ"

  - name: Create Supabase Record
    type: supabase
    action: insert
    table: clients
    input:
      id: "{{ client.id }}"
      business_name: "{{ client.business_name }}"
      stripe_customer_id: "{{ steps.create_stripe_customer.id }}"
      twilio_number: "{{ steps.provision_twilio_number.phone_number }}"
      status: "pilot"
      onboarded_at: "{{ now() }}"
      config: "{{ client.config | default({}) }}"

  - name: Initialize 7-Day Pilot
    type: scheduler
    action: create_schedule
    input:
      client_id: "{{ client.id }}"
      duration_days: 7
      checkin_days: [1, 3, 5, 7]
      pipeline: "pipelines/pilot-checkin.lobster"

  - name: Generate Retell Prompt
    type: prompt_generator
    action: render
    input:
      template: "retell_roofer_base"
      variables:
        business_name: "{{ client.business_name }}"
        services: "{{ client.services }}"
        tone: "{{ client.tone | default('professional_friendly') }}"

  - name: Generate Vapi Prompt
    type: prompt_generator
    action: render
    input:
      template: "vapi_roofer_base"
      variables:
        business_name: "{{ client.business_name }}"
        services: "{{ client.services }}"
        tone: "{{ client.tone | default('professional_friendly') }}"

  - name: Commit & Notify
    type: notification
    action: slack_or_email
    input:
      message: "New roofer {{ client.business_name }} onboarded successfully. Pilot active for 7 days."
      channels: ["internal", "client"]

outputs:
  success: true
  client_id: "{{ client.id }}"
  stripe_id: "{{ steps.create_stripe_customer.id }}"
  twilio_number: "{{ steps.provision_twilio_number.phone_number }}"