-- Migration: Inventory Management System
-- For Pro Graphics (Keanu & Kemron)
-- Date: 2026-04-20

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- MATERIALS TABLE
-- Stores material types (vinyl, chromatic, canvas, etc.)
-- ============================================
CREATE TABLE IF NOT EXISTS materials (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    unit TEXT NOT NULL DEFAULT 'meters',
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INVENTORY ORDERS TABLE
-- Tracks orders placed to manufacturers
-- ============================================
CREATE TABLE IF NOT EXISTS inventory_orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    material_id UUID NOT NULL REFERENCES materials(id) ON DELETE RESTRICT,
    quantity_ordered NUMERIC NOT NULL CHECK (quantity_ordered > 0),
    unit_price NUMERIC NOT NULL CHECK (unit_price >= 0),
    total_cost NUMERIC GENERATED ALWAYS AS (quantity_ordered * unit_price) STORED,
    order_date DATE NOT NULL DEFAULT CURRENT_DATE,
    expected_arrival_date DATE,
    actual_arrival_date DATE,
    status TEXT NOT NULL DEFAULT 'coming_soon'
        CHECK (status IN ('coming_soon', 'arrived', 'in_use', 'depleted')),
    manufacturer TEXT,
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MATERIAL USAGE TABLE
-- Tracks material consumption per project/job
-- ============================================
CREATE TABLE IF NOT EXISTS material_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_order_id UUID NOT NULL REFERENCES inventory_orders(id) ON DELETE CASCADE,
    quantity_used NUMERIC NOT NULL CHECK (quantity_used > 0),
    usage_date DATE NOT NULL DEFAULT CURRENT_DATE,
    project_name TEXT NOT NULL,
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_inventory_orders_material ON inventory_orders(material_id);
CREATE INDEX IF NOT EXISTS idx_inventory_orders_status ON inventory_orders(status);
CREATE INDEX IF NOT EXISTS idx_inventory_orders_order_date ON inventory_orders(order_date);
CREATE INDEX IF NOT EXISTS idx_material_usage_order ON material_usage(inventory_order_id);
CREATE INDEX IF NOT EXISTS idx_material_usage_date ON material_usage(usage_date);

-- ============================================
-- SEED DEFAULT MATERIALS
-- ============================================
INSERT INTO materials (name, description) VALUES
    ('Vinyl', 'Vinyl material for vehicle wraps, signage, and branding'),
    ('Chromatic', 'Color-changing/chromatic materials'),
    ('Canvas', 'Canvas material for custom prints'),
    ('Laminate', 'Protective laminate films'),
    ('Adhesive', 'Adhesive materials and chemicals')
ON CONFLICT (name) DO NOTHING;