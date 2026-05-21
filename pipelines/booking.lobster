name: Appointment Booking
description: Calendar integration and automated booking confirmation
version: 0.1.0
triggers:
  - pipeline: follow-up
  - webhook: calendar_callback

steps:
  - name: Check Lead Qualification
    type: supabase
    action: get
    table: leads
    filters:
      id: "{{ input.lead_id }}"
      status: ["hot", "warm"]

  - name: Generate Available Slots
    type: calendar
    action: get_availability
    input:
      roofer_id: "{{ client.roofer_id }}"
      duration_minutes: 30
      days_ahead: 7

  - name: Send Booking Link
    type: twilio
    action: send_sms
    input:
      to: "{{ lead.phone }}"
      template: "booking_link"
      variables:
        link: "{{ steps.generate_available_slots.booking_url }}"

  - name: Handle Booking Confirmation
    type: conditional
    condition: "{{ webhook.type == 'booking_confirmed' }}"
    steps:
      - name: Create Calendar Event
        type: calendar
        action: book_slot
        input:
          slot_id: "{{ webhook.slot_id }}"
          lead_id: "{{ lead.id }}"
      - name: Update Lead Status
        type: supabase
        action: update
        table: leads
        input:
          status: "booked"
          appointment_time: "{{ webhook.appointment_time }}"
      - name: Notify Roofer
        type: notification
        action: sms_or_email
        input:
          to: "{{ client.roofer_phone }}"
          template: "new_booking"

outputs:
  success: true
  booking_status: "{{ steps.handle_booking_confirmation.status }}"