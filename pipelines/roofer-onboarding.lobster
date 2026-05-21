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
    type: conditional
    condition: "{{ client.existing_twilio_number | default(false) }}"
    if_true:
      - name: Use Existing Twilio Number
        type: transform
        action: set
        output:
          twilio_number: "{{ client.twilio_number }}"
    if_false:
      - name: Buy New Twilio Number
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
      twilio_number: "{{ steps.provision_twilio_number.twilio_number | default(steps.provision_twilio_number.phone_number) }}"
      vapi_phone_number_id: "{{ client.vapi.phone_number_id }}"
      vapi_assistant_id: "{{ client.vapi.assistant_id }}"
      vapi_prompt: "{{ client.vapi.prompt }}"
      status: "pilot"
      onboarded_at: "{{ now() }}"
      config: "{{ client | default({}) }}"

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

  - name: Handle Vapi Prompt
    type: conditional
    condition: "{{ client.vapi.prompt | default(false) }}"
    if_true:
      - name: Store Custom Vapi Prompt
        type: transform
        action: set
        output:
          final_vapi_prompt: "{{ client.vapi.prompt }}"
    if_false:
      - name: Generate Default Vapi Prompt
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
  twilio_number: "{{ steps.provision_twilio_number.twilio_number | default(steps.provision_twilio_number.phone_number) }}"