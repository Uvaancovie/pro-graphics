import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createSupabaseBrowserClient() {
  return supabase;
}

export function createSupabasePublicClient() {
  return supabase;
}

export function createSupabaseServerClient() {
  return supabase;
}
