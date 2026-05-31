# Vapi Schema Readiness

**Status:** Schema Ready / Documentation Only  
**Date:** 2026-05-31  
**Purpose:** Document Supabase schema readiness for the Vapi Phone Lead Path before implementation.

## 1. Current Status

Core Vapi Phone Lead Path columns and allowed values are ready.

The production-grade duplicate protection index for Vapi/Retell call provider IDs has been applied and verified.

Verified index:

```sql
CREATE UNIQUE INDEX calls_provider_call_id_unique_idx
ON public.calls USING btree (provider, provider_call_id)
WHERE (provider_call_id IS NOT NULL);
