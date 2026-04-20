-- Migration: Seed Common Materials for Pro Graphics
-- Date: 2026-04-20

-- Insert a comprehensive list of common materials for a print and graphics vehicle wrapping shop
INSERT INTO materials (name, unit, description) VALUES
    -- Vehicle Wrapping & High-End Vinyls
    ('Cast Vinyl (e.g., 3M 2080 / Avery Supreme)', 'meters', 'High-quality conformable vinyl for full vehicle wraps'),
    ('Calendered Vinyl', 'meters', 'Standard vinyl for flat surfaces and partial wraps'),
    ('Carbon Fiber Vinyl', 'meters', 'Textured vinyl mimicking carbon fiber for accents'),
    ('Reflective Vinyl', 'meters', 'High-visibility vinyl for emergency vehicles and signage'),
    ('Chrome / Metallic Vinyl', 'meters', 'Specialty metallic finish wrapping film'),
    
    -- Window & Specialty Films
    ('Perforated Window Film (Contravision)', 'meters', 'One-way vision film for vehicle windows and storefronts'),
    ('Window Tint Film', 'meters', 'Various opacity tinting for automotive windows'),
    ('Frosted / Etched Glass Film', 'meters', 'Privacy film for architectural and office glass'),
    
    -- Print Media
    ('PVC Banner Material', 'meters', 'Heavy-duty material for outdoor banners and billboards'),
    ('High-Gloss Photo Paper', 'meters', 'Premium paper for high-resolution graphics and posters'),
    ('Matte Canvas Roll', 'meters', 'Artistic canvas for gallery prints and interior decor'),
    ('Wallpaper Roll (Printable)', 'meters', 'Custom printable wall coverings for interior design'),
    ('Backlit Film', 'meters', 'Translucent material for illuminated lightboxes'),
    
    -- Rigid Substrates (Calculated in sheets but typically stored in units/meters)
    ('Correx Boards (4mm)', 'units', 'Lightweight corrugated plastic boards for temporary signs'),
    ('ABS Boards (1-2mm)', 'units', 'Durable plastic sheeting for indoor/outdoor signage'),
    ('Chromadek / Steel Sheets', 'units', 'Heavy-duty metal sheets for permanent outdoor signs'),
    ('Perspex / Acrylic Sheets', 'units', 'Premium clear or colored acrylic for luxury signage'),
    ('Foam Board', 'units', 'Lightweight indoor presentation and display boards'),

    -- Finishing & Application
    ('Gloss Laminate Film', 'meters', 'Clear overlay to protect prints with a shiny finish'),
    ('Matte Laminate Film', 'meters', 'Clear overlay to protect prints with a non-reflective finish'),
    ('Application / Transfer Tape', 'meters', 'Tape used to transfer cut vinyl decals to surfaces'),
    ('Edge Sealer Tape', 'rolls', 'Tape used to seal edges of wraps for longevity'),
    ('Primer / Surface Prep (94)', 'liters', 'Adhesion promoter for deep recesses and edges')
ON CONFLICT (name) DO NOTHING;
