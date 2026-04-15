# Pro Graphics Admin System

Complete order management, invoicing, and pricing markup system for Pro Graphics CMS.

## Features

### ✅ Admin Login
- Secure Supabase Auth login at `/admin/login`
- Support for 3 admin users: **Kemron**, **Keanu**, and **Uvaan**
- Session-based authentication with server-side validation

### 📋 Order Management
- Create and manage customer orders
- Track order status: Pending → Processing → Ready → Delivered
- Store customer details and delivery information
- Add multiple items per order with descriptions, quantities, and pricing

### 📄 Invoice Generation
- Auto-generate invoices from orders
- Invoice numbering: INV-2026-XXXX format
- Track payment status: Draft → Sent → Paid → Overdue
- View and download invoices
- 15% VAT calculation

### 💰 Pricing Markups
- Configure markup percentages per category:
  - Vehicle Branding
  - Sign Boards
  - Contravisions
  - Stickers
  - Promotional
  - Banners
- Cost + Markup = Customer Price calculation
- Quick price calculator for estimates

---

## Setup Instructions

### 1. Run Database Migrations

In your Supabase SQL Editor, run the migrations in order:

1. `supabase/migrations/20260413000000_admin_orders_invoices.sql` - Orders, invoices, markups tables
2. `supabase/migrations/20260413000001_admin_users.sql` - Admin profiles

### 2. Create Admin Users

**Option A: Using the Setup Script**

```bash
# Set environment variables
export NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
export SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Run the setup script
node scripts/setup-admins.js
```

**Option B: Manual Setup via Supabase Dashboard**

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User" for each admin:
   - **Kemron**: kemron@prographics.co.za
   - **Keanu**: keanu@prographics.co.za
   - **Uvaan**: uvaan@prographics.co.za
3. Set strong passwords (save securely!)
4. Copy their User IDs (UUIDs)
5. Run this SQL:

```sql
INSERT INTO admin_profiles (id, full_name, role) VALUES
  ('KEMRON-UUID-HERE', 'Kemron', 'director'),
  ('KEANU-UUID-HERE', 'Keanu', 'director'),
  ('UVAAN-UUID-HERE', 'Uvaan', 'director');
```

### 3. Configure Pricing Markups

1. Log in to `/admin`
2. Navigate to **Pricing Markups** in the sidebar
3. Set markup percentages for each category (recommended: 30-50%)
4. Use the quick calculator to verify pricing

---

## Usage Guide

### Creating an Order

1. Go to `/admin/orders`
2. Click "New Order"
3. Fill in customer details
4. Add order items with descriptions, quantities, and prices
5. Select delivery method and date
6. Submit - order number auto-generated (e.g., ORD-2026-0001)

### Generating an Invoice

1. Open an order detail page
2. Click "Generate Invoice"
3. Invoice auto-created with next number (e.g., INV-2026-0001)
4. Mark as "Sent" when emailed to customer
5. Mark as "Paid" when payment received

### Managing Pricing

1. Go to `/admin/pricing/markups`
2. Set markup % for each category
3. Cost + Markup = Customer selling price (before VAT)
4. Use calculator for quick estimates

---

## File Structure

```
app/
  admin/
    orders/
      page.tsx              # Orders list
      [id]/
        page.tsx            # Order detail
      new/
        page.tsx            # Create order
    invoices/
      page.tsx              # Invoices list
      [id]/
        page.tsx            # Invoice detail
    pricing/
      markups/
        page.tsx            # Pricing markup controls
    page.tsx                # Dashboard with stats
    layout.tsx              # Admin layout with sidebar
    login/
      page.tsx              # Login page
  api/
    orders/
      route.ts              # Create order API

components/
  admin/
    AdminSidebar.tsx        # Navigation sidebar

supabase/
  migrations/
    20260413000000_admin_orders_invoices.sql
    20260413000001_admin_users.sql

scripts/
  setup-admins.js           # Admin user setup script
```

---

## Environment Variables

Ensure these are set in your `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## Security Notes

- All admin routes require authentication
- Row Level Security (RLS) policies protect database tables
- Only authenticated users can access admin features
- Activity logging tracks order and invoice changes

---

## Next Steps / Future Enhancements

- [ ] PDF generation for invoices (using react-pdf or similar)
- [ ] Email integration for sending invoices
- [ ] Customer portal for viewing orders/invoices
- [ ] Inventory tracking
- [ ] Reporting dashboard
