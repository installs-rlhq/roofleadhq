# Vapi Calls Insert Verification

Verified: 2026-05-31

Latest verified commit:
- d1b5ee7 fix(vapi): resolve calls insert build errors

Read-only Supabase verification passed for:

- call_id: 6c979eff-1c49-4652-b3e8-9235ebaed8a9
- provider: vapi
- provider_call_id: vapi_insert_test_1780244768
- roofer_id: be7efc94-bd68-43af-81b2-dc7b869b42df
- caller_phone: +15125551234
- duration_seconds: 195
- appointment_requested: true
- appointment_booked: true
- raw_payload: present
- recording_url: present

Scope confirmed:
- calls row inserted
- no lead created
- no booking created
- no follow_up created
- no SMS sent
- no Calendar event created
- no Resend email sent
- no Lindy trigger fired

Next safe step:
- Plan lead matching only.
- Do not implement lead creation yet.
