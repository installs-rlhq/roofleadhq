# Vapi Schema Readiness

**Status:** Planning / Documentation Only  
**Date:** 2026-05-31  
**Purpose:** Document Supabase schema readiness for the Vapi Phone Lead Path.

## 1. Status

Core Vapi Phone Lead Path columns and allowed values are ready.

One production-grade improvement is recommended before implementing the Vapi webhook:

```sql
CREATE UNIQUE INDEX IF NOT EXISTS calls_provider_call_id_unique_idx
ON public.calls (provider, provider_call_id)
WHERE provider_call_id IS NOT NULL;

