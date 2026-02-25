import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
// Note: Make sure to set these environment variables before running the script
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fetchPriceItems() {
    console.log('Fetching price-items from Supabase...');

    try {
        const { data: priceItems, error } = await supabase
            .from('price_items')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching price items:', error.message);
            return;
        }

        if (!priceItems || priceItems.length === 0) {
            console.log('No price items found.');
            return;
        }

        console.log(`Successfully fetched ${priceItems.length} price items:`);
        console.table(priceItems);
    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

fetchPriceItems();
