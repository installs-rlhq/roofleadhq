import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  supabaseUrl: string;
  supabaseKey: string;
  supabaseServiceRoleKey: string;
  vapiApiKey: string;
  vapiWebhookSecret: string;
  gitCommitSha: string;
}

// Build 282: deployed-commit marker for runtime deployment verification. Sourced from the commit-hash
// env var Railway injects automatically (RAILWAY_GIT_COMMIT_SHA), with generic fallbacks. This is NOT a
// secret (it is a git commit hash) and reading it changes no config/schema/provider setting. It lets an
// unauthenticated GET /health report which commit is actually running, so a deploy can be confirmed
// without a dashboard screenshot or any secret.
const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_ANON_KEY || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  vapiApiKey: process.env.VAPI_API_KEY || '',
  vapiWebhookSecret: process.env.VAPI_WEBHOOK_SECRET || '',
  gitCommitSha:
    process.env.RAILWAY_GIT_COMMIT_SHA ||
    process.env.GIT_COMMIT_SHA ||
    process.env.SOURCE_VERSION ||
    process.env.SOURCE_COMMIT ||
    '',
};

export default config;
