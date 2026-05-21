-- RoofLeadHQ Supabase Row Level Security (RLS) Policies
-- Apply these AFTER running supabase-schema.sql

-- Enable RLS on all tables
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE pipeline_runs ENABLE ROW LEVEL SECURITY;

-- ============================================
-- CLIENTS TABLE POLICIES
-- ============================================

-- Service role can do everything (for backend/Lobster runner)
CREATE POLICY "Service role full access on clients"
  ON clients FOR ALL
  USING (auth.role() = 'service_role');

-- Authenticated users can read their own client record
CREATE POLICY "Users can read own client"
  ON clients FOR SELECT
  USING (auth.uid()::text = id OR auth.role() = 'authenticated');

-- ============================================
-- LEADS TABLE POLICIES
-- ============================================

-- Service role full access
CREATE POLICY "Service role full access on leads"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

-- Authenticated users can read leads for their client
CREATE POLICY "Users can read own client leads"
  ON leads FOR SELECT
  USING (
    auth.role() = 'service_role' OR
    client_id IN (
      SELECT id FROM clients WHERE auth.uid()::text = id
    )
  );

-- Only service role can insert/update leads (via Lobster pipelines)
CREATE POLICY "Service role can insert leads"
  ON leads FOR INSERT
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Service role can update leads"
  ON leads FOR UPDATE
  USING (auth.role() = 'service_role');

-- ============================================
-- PIPELINE_RUNS TABLE POLICIES
-- ============================================

-- Service role full access
CREATE POLICY "Service role full access on pipeline_runs"
  ON pipeline_runs FOR ALL
  USING (auth.role() = 'service_role');

-- Authenticated users can read their own pipeline runs
CREATE POLICY "Users can read own pipeline runs"
  ON pipeline_runs FOR SELECT
  USING (
    auth.role() = 'service_role' OR
    client_id IN (
      SELECT id FROM clients WHERE auth.uid()::text = id
    )
  );

-- ============================================
-- HELPER FUNCTIONS
-- ============================================

-- Function to get current client_id from JWT
CREATE OR REPLACE FUNCTION get_current_client_id()
RETURNS text AS $$
BEGIN
  RETURN auth.uid()::text;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION get_current_client_id() TO authenticated;
GRANT EXECUTE ON FUNCTION get_current_client_id() TO service_role;

-- ============================================
-- SEED DATA FOR TESTING
-- ============================================

-- Insert test client
INSERT INTO clients (id, business_name, email, status, config)
VALUES (
  'acme-roofing',
  'Acme Roofing LLC',
  'owner@acme-roofing.com',
  'pilot',
  '{
    "area_code": "813",
    "services": ["shingle", "metal", "flat"],
    "tone": "professional_friendly",
    "business_hours": "7:00-18:00",
    "timezone": "America/New_York"
  }'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  business_name = EXCLUDED.business_name,
  config = EXCLUDED.config;

-- Insert another test client
INSERT INTO clients (id, business_name, email, status, config)
VALUES (
  'summit-roofing',
  'Summit Roofing Pros',
  'hello@summitroofing.com',
  'pilot',
  '{
    "area_code": "720",
    "services": ["shingle", "tile", "gutter"],
    "tone": "friendly_direct",
    "business_hours": "8:00-17:00",
    "timezone": "America/Denver"
  }'::jsonb
) ON CONFLICT (id) DO UPDATE SET
  business_name = EXCLUDED.business_name,
  config = EXCLUDED.config;

-- Insert sample leads for testing
INSERT INTO leads (client_id, source, name, phone, email, address, project_type, urgency, status, qualification_score)
VALUES 
  ('acme-roofing', 'facebook', 'John Smith', '+18135551234', 'john.smith@email.com', '123 Main St, Tampa, FL', 'shingle_replacement', 'hot', 'new', 85),
  ('acme-roofing', 'website', 'Sarah Johnson', '+18135555678', 'sarah.j@email.com', '456 Oak Ave, Tampa, FL', 'storm_damage', 'standard', 'new', 70),
  ('summit-roofing', 'retell', 'Mike Davis', '+17205551234', 'mike.davis@email.com', '789 Pine Rd, Denver, CO', 'gutter_repair', 'warm', 'new', 60)
ON CONFLICT DO NOTHING;

-- Insert sample pipeline run log
INSERT INTO pipeline_runs (pipeline_name, client_id, status, input, output)
VALUES (
  'lead-intake',
  'acme-roofing',
  'success',
  '{"source": "facebook", "lead_name": "John Smith"}'::jsonb,
  '{"lead_id": "test-uuid", "status": "routed"}'::jsonb
);

-- Verify data
SELECT 'Clients:' as table_name, count(*) as count FROM clients
UNION ALL
SELECT 'Leads:', count(*) FROM leads
UNION ALL
SELECT 'Pipeline Runs:', count(*) FROM pipeline_runs;