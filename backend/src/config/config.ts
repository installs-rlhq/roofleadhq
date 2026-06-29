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
}

const config: Config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseKey: process.env.SUPABASE_ANON_KEY || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  vapiApiKey: process.env.VAPI_API_KEY || '',
  vapiWebhookSecret: process.env.VAPI_WEBHOOK_SECRET || '',
};

export default config;
