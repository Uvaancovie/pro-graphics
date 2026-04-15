const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function main() {
  const usersToCreate = [
    { email: 'uvaanmicrosoft@gmail.com', name: 'Uvaan', password: 'AdminPassword123!' },
    { email: 'i.t.safuneralsupplies@gmail.com', name: 'Kemron', password: 'AdminPassword123!' }
  ];

  for (const u of usersToCreate) {
    console.log(`Creating user ${u.email}...`);
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true
    });

    if (authError) {
      console.error(`Error creating auth user ${u.email}:`, authError.message);
    } else {
      console.log(`Successfully created auth user ${u.email} with ID ${authData.user.id}`);
      
      // Update admin profiles
      const { error: profileError } = await supabaseAdmin
        .from('admin_profiles')
        .upsert({
          id: authData.user.id,
          full_name: u.name,
          role: 'director',
          is_active: true
        });
        
      if (profileError) {
         console.error(`Error creating admin profile for ${u.email}:`, profileError.message);
      } else {
         console.log(`Successfully created admin profile for ${u.email}`);
      }
    }
  }
}

main().catch(console.error);
