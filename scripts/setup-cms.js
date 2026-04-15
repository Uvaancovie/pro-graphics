// Complete Admin + CMS setup script for Pro Graphics
// Fixes: seed data, admin profiles, storage buckets, pricing markups
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { autoRefreshToken: false, persistSession: false } }
);

async function setup() {
  console.log('🚀 Pro Graphics Admin + CMS Setup\n');

  // ── Step 1: Seed pricing markups ──────────────────────────
  console.log('Step 1: Seeding pricing markups...');
  const { data: existingMarkups } = await supabase
    .from('pricing_markups')
    .select('id', { count: 'exact', head: true });

  const { count: markupCount } = await supabase
    .from('pricing_markups')
    .select('*', { count: 'exact', head: true });

  if (!markupCount || markupCount === 0) {
    const markups = [
      { category: 'vehicle-branding', markup_type: 'percentage', markup_value: 40.00, cost_basis: 'material_labor', is_active: true },
      { category: 'sign-boards', markup_type: 'percentage', markup_value: 35.00, cost_basis: 'material_labor', is_active: true },
      { category: 'contravisions', markup_type: 'percentage', markup_value: 45.00, cost_basis: 'material_labor', is_active: true },
      { category: 'stickers', markup_type: 'percentage', markup_value: 50.00, cost_basis: 'material_labor', is_active: true },
      { category: 'promotional', markup_type: 'percentage', markup_value: 40.00, cost_basis: 'material_labor', is_active: true },
      { category: 'banners', markup_type: 'percentage', markup_value: 35.00, cost_basis: 'material_labor', is_active: true },
      { category: 'all', markup_type: 'percentage', markup_value: 30.00, cost_basis: 'material_labor', is_active: true },
    ];
    const { error } = await supabase.from('pricing_markups').insert(markups);
    if (error) console.log('  ❌ Markup insert error:', error.message);
    else console.log('  ✅ Inserted 7 pricing markup rules');
  } else {
    console.log(`  ⚠️  Already has ${markupCount} markups, skipping`);
  }

  // ── Step 2: Seed products if empty ────────────────────────
  console.log('\nStep 2: Checking products...');
  const { data: products, error: prodErr } = await supabase
    .from('products')
    .select('id');

  if (!products || products.length === 0) {
    console.log('  Inserting seed products...');
    const productData = [
      {
        name: 'Vehicle Branding', slug: 'vehicle-branding', category: 'vehicle-branding',
        short_desc: 'Turn your fleet into mobile billboards. 30,000–70,000 daily impressions.',
        features: ['Full wraps & partial graphics', '3M & Avery Dennison materials', 'Design included', '5-year outdoor durability'],
        sort_order: 1, is_visible: true,
      },
      {
        name: 'Custom Sign Boards', slug: 'sign-boards', category: 'sign-boards',
        short_desc: 'Chromadek, ABS, or Perspex signage for any environment.',
        features: ['Chromadek & ABS options', 'Full-colour digital print', 'Indoor & outdoor grades', 'Installation available'],
        sort_order: 2, is_visible: true,
      },
      {
        name: 'Contravisions', slug: 'contravisions', category: 'contravisions',
        short_desc: 'One-way vision window graphics. Advertise outside, see through inside.',
        features: ['One-way vision film', 'Perforated vinyl', 'Storefronts & vehicles', 'UV & weather resistant'],
        sort_order: 3, is_visible: true,
      },
      {
        name: 'Custom Stickers', slug: 'stickers', category: 'stickers',
        short_desc: 'Die-cut to perfection. Save up to 60% on volume orders.',
        features: ['Die-cut & sheet options', 'Gloss & matt finishes', 'Waterproof vinyl', 'Bulk pricing available'],
        sort_order: 4, is_visible: true,
      },
      {
        name: 'Promotional Items', slug: 'promotional', category: 'promotional',
        short_desc: 'Corporate branded merchandise and promotional products.',
        features: ['Branded merchandise', 'Corporate gifts', 'Event materials', 'Bulk ordering'],
        sort_order: 5, is_visible: true,
      },
      {
        name: 'Banners', slug: 'banners', category: 'banners',
        short_desc: 'High-impact banners for events, retail and outdoor advertising.',
        features: ['PVC & mesh options', 'Large format printing', 'Eyelet finishing', 'Indoor & outdoor use'],
        sort_order: 6, is_visible: true,
      },
    ];

    const { data: insertedProducts, error: insertErr } = await supabase
      .from('products')
      .insert(productData)
      .select('id, slug');

    if (insertErr) {
      console.log('  ❌ Product insert error:', insertErr.message);
    } else {
      console.log(`  ✅ Inserted ${insertedProducts.length} products`);

      // Add pricing packages for vehicle branding
      const vb = insertedProducts.find(p => p.slug === 'vehicle-branding');
      if (vb) {
        const packages = [
          { product_id: vb.id, tier: 'good', label: 'Partial Branding', price_from: 2500, price_to: 4500, unit: 'per vehicle', includes: ['Door & bonnet graphics', '1 design revision', 'Standard vinyl', '5-year guarantee'], is_popular: false },
          { product_id: vb.id, tier: 'better', label: 'Half Wrap', price_from: 5000, price_to: 8000, unit: 'per vehicle', includes: ['Half vehicle coverage', '2 design revisions', 'Premium vinyl', '5-year guarantee', 'Free design'], is_popular: true },
          { product_id: vb.id, tier: 'best', label: 'Full Wrap', price_from: 9000, price_to: 15000, unit: 'per vehicle', includes: ['100% vehicle coverage', 'Unlimited revisions', '3M Premium vinyl', '5-year guarantee', 'Free design', 'Free removal'], is_popular: false },
        ];
        const { error: pkgErr } = await supabase.from('pricing_packages').insert(packages);
        if (pkgErr) console.log('  ❌ Pricing packages error:', pkgErr.message);
        else console.log('  ✅ Inserted 3 pricing packages for Vehicle Branding');
      }
    }
  } else {
    console.log(`  ✅ Products already exist (${products.length} found)`);
  }

  // ── Step 3: Link existing users to admin profiles ─────────
  console.log('\nStep 3: Setting up admin profiles...');
  const { data: { users }, error: userErr } = await supabase.auth.admin.listUsers();
  if (userErr) {
    console.log('  ❌ Could not list users:', userErr.message);
  } else {
    console.log(`  Found ${users.length} auth users:`);

    // Map known emails to names
    const emailNameMap = {
      'uvaanmicrosoft@gmail.com': 'Uvaan',
      'i.t.safuneralsupplies@gmail.com': 'Kemron',
      'way2flyagency@gmail.com': 'Keanu',
    };

    for (const user of users) {
      const name = emailNameMap[user.email] || user.email.split('@')[0];
      console.log(`  → ${user.email} → "${name}" (${user.id})`);

      // Check if profile exists
      const { data: existing } = await supabase
        .from('admin_profiles')
        .select('id')
        .eq('id', user.id)
        .single();

      if (!existing) {
        const { error: profileErr } = await supabase
          .from('admin_profiles')
          .insert({
            id: user.id,
            full_name: name,
            role: 'director',
            is_active: true,
          });

        if (profileErr) {
          console.log(`    ❌ Profile insert error: ${profileErr.message}`);
        } else {
          console.log(`    ✅ Created admin profile for ${name}`);
        }
      } else {
        console.log(`    ⚠️  Profile already exists, skipping`);
      }
    }
  }

  // ── Step 4: Create gallery-images storage bucket ──────────
  console.log('\nStep 4: Setting up storage buckets...');
  const { data: buckets } = await supabase.storage.listBuckets();
  const hasGallery = buckets?.some(b => b.name === 'gallery-images');

  if (!hasGallery) {
    const { error: bucketErr } = await supabase.storage.createBucket('gallery-images', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    });
    if (bucketErr) console.log('  ❌ Bucket creation error:', bucketErr.message);
    else console.log('  ✅ Created gallery-images bucket (public, 5MB limit)');
  } else {
    console.log('  ✅ gallery-images bucket already exists');
  }

  // Check for product-images bucket
  const hasProductImages = buckets?.some(b => b.name === 'product-images');
  if (!hasProductImages) {
    const { error: bucketErr } = await supabase.storage.createBucket('product-images', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    });
    if (bucketErr) console.log('  ❌ Product images bucket error:', bucketErr.message);
    else console.log('  ✅ Created product-images bucket (public, 5MB limit)');
  } else {
    console.log('  ✅ product-images bucket already exists');
  }

  // ── Step 5: Verify final state ────────────────────────────
  console.log('\n' + '═'.repeat(60));
  console.log('📊 Final Database State:');
  console.log('═'.repeat(60));

  const checks = [
    { name: 'products', label: 'Products' },
    { name: 'pricing_packages', label: 'Pricing Packages' },
    { name: 'gallery', label: 'Gallery Images' },
    { name: 'blogs', label: 'Blog Posts' },
    { name: 'customers', label: 'Customers' },
    { name: 'orders', label: 'Orders' },
    { name: 'invoices', label: 'Invoices' },
    { name: 'pricing_markups', label: 'Pricing Markups' },
    { name: 'admin_profiles', label: 'Admin Profiles' },
    { name: 'admin_activity_log', label: 'Activity Log' },
  ];

  for (const { name, label } of checks) {
    const { count } = await supabase.from(name).select('*', { count: 'exact', head: true });
    const icon = count > 0 ? '✅' : '⬜';
    console.log(`  ${icon} ${label.padEnd(25)} ${count ?? 0} rows`);
  }

  const { data: finalBuckets } = await supabase.storage.listBuckets();
  console.log(`\n  📦 Storage Buckets: ${finalBuckets?.map(b => b.name).join(', ')}`);

  const { data: { users: finalUsers } } = await supabase.auth.admin.listUsers();
  console.log(`  👤 Admin Users: ${finalUsers?.map(u => u.email).join(', ')}`);

  console.log('\n✅ Setup complete! You can now log in at /admin/login');
  console.log('   Use one of the admin emails above with its password.\n');
}

setup().catch(console.error);
