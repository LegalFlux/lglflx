import { createClient } from '@supabase/supabase-js';

// Usando valores padrão para desenvolvimento
const supabaseUrl = 'https://example.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
