-- Insert Custom Canvas product (if it doesn't exist)
INSERT INTO products (name, slug, category, short_desc, description, features, image_url, sort_order)
VALUES (
  'Custom Canvas Prints',
  'custom-canvas',
  'promotional',
  'High-quality custom canvas prints for your home or office.',
  'Transform your favourite photos or artwork into stunning, high-quality canvas prints. Printed on premium poly-cotton canvas and tensioned over a solid wood frame.',
  ARRAY['Premium poly-cotton blend','UV resistant inks','Solid wood frame','Ready to hang'],
  '/images/ads/shop-front-office-branding.jpeg',
  0
)
ON CONFLICT (slug) DO UPDATE
SET image_url = '/images/ads/shop-front-office-branding.jpeg';

-- Update existing products with images
UPDATE products 
SET image_url = '/images/ads/vehicle-branding.jpeg'
WHERE slug = 'vehicle-branding';

UPDATE products 
SET image_url = '/images/ads/custom-sign-boards.jpeg'
WHERE slug = 'sign-boards';

UPDATE products 
SET image_url = '/images/ads/contravisions.jpeg'
WHERE slug = 'contravisions';

UPDATE products 
SET image_url = '/images/ads/custom-cutout-stickers.jpeg'
WHERE slug = 'stickers';
