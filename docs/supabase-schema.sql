-- RoofLeadHQ Supabase Schema
-- Run this in Supabase SQL Editor

-- Clients table
create table if not exists clients (
  id text primary key,
  business_name text not null,
  email text,
  stripe_customer_id text,
  twilio_number text,
  status text default 'pilot',
  onboarded_at timestamptz default now(),
  config jsonb default '{}',
  created_at timestamptz default now()
);

-- Leads table
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  client_id text references clients(id),
  source text,                    -- facebook, website, retell, vapi
  name text,
  phone text,
  email text,
  address text,
  project_type text,
  urgency text default 'standard',
  notes text,
  qualification_score integer,
  status text default 'new',      -- new, hot, warm, cold, unqualified, booked, stale
  tags text[],
  enriched_data jsonb,
  duplicate_count integer default 0,
  last_seen_at timestamptz,
  last_activity_at timestamptz default now(),
  routed_at timestamptz,
  appointment_time timestamptz,
  created_at timestamptz default now()
);

-- Indexes for performance
create index if not exists idx_leads_phone on leads(phone);
create index if not exists idx_leads_status on leads(status);
create index if not exists idx_leads_client_status on leads(client_id, status);
create index if not exists idx_leads_last_activity on leads(last_activity_at);

-- Pipeline runs log (for observability)
create table if not exists pipeline_runs (
  id bigserial primary key,
  pipeline_name text not null,
  client_id text,
  lead_id uuid,
  status text,                    -- success, failed, skipped
  input jsonb,
  output jsonb,
  error text,
  started_at timestamptz default now(),
  completed_at timestamptz
);

create index if not exists idx_pipeline_runs_name_time on pipeline_runs(pipeline_name, started_at desc);