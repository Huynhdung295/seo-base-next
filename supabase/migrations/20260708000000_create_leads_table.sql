-- ─── Leads Table ─────────────────────────────────────────────
-- Stores lead capture form submissions.
-- Used by the Server Action in src/actions/lead.ts.

CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  message TEXT,
  source VARCHAR(100) DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon key (for form submissions)
CREATE POLICY "Allow anonymous lead submissions" ON leads
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated/service-role can read leads
-- (Admin dashboard or internal tools)
CREATE POLICY "Only admin can read leads" ON leads
  FOR SELECT
  USING (auth.role() = 'service_role');
