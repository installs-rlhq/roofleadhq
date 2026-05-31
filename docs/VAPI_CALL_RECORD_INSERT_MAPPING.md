# RoofLeadHQ Vapi Call Record Insert Mapping

Version: May 31, 2026  
Status: Planning only  
Owner: Jason Lohse  
Scope: Vapi post-call webhook mapping before any Supabase writes are enabled

---

## 1. Purpose

This document defines how the RoofLeadHQ Vapi post-call webhook should eventually map a completed phone call into Supabase.

This is planning only.

No implementation is approved by this document.

---

## 2. Current Verified State

The current Vapi webhook route is live and verified on the VPS.

Endpoint:

```text
POST /webhooks/vapi/call-completed
