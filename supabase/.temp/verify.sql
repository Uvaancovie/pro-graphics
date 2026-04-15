-- Create admin users for Kemron and Uvaan via Supabase Auth
-- Note: This needs to be done via the Auth Admin API, not SQL.
-- Let's verify the current state of everything instead.

-- Final verification query
SELECT 'tables' as check_type, table_name as name, 
  (xpath('/row/cnt/text()', query_to_xml(format('SELECT count(*) as cnt FROM public.%I', table_name), false, true, '')))[1]::text as count
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
