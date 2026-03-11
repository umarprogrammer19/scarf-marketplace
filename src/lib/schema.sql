-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  original_price INTEGER,
  discount INTEGER,
  image TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  is_new BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category for faster queries
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Create index on stock for filtering
CREATE INDEX IF NOT EXISTS idx_products_stock ON products(stock);

-- Insert sample data
INSERT INTO products (title, price, original_price, discount, image, category, stock, is_new) VALUES
('Elegant Silk Scarf - Maroon', 2499, 4999, 50, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=800&fit=crop&q=80', 'Silk Collection', 15, true),
('Velvet Winter Shawl', 3499, 6999, 50, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80', 'Winter Collection', 8, false),
('Printed Lawn Dupatta', 1999, 3999, 50, 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=800&h=800&fit=crop&q=80', 'Printed Lawn Collection', 0, false),
('Karandi Embroidered Scarf', 2799, 5599, 50, 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=800&fit=crop&q=80', 'Karandi Collection', 12, true),
('Summer Cotton Scarf', 1499, 2999, 50, 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop&q=80', 'Summer Collection', 20, false),
('Khaddar Warm Shawl', 3299, 6599, 50, 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=800&fit=crop&q=80', 'Khaddar Collection', 5, false),
('Silk Floral Print Scarf', 2899, 5799, 50, 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80', 'Silk Collection', 10, false),
('Velvet Luxury Stole', 3999, 7999, 50, 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=800&fit=crop&q=80', 'Velvet Collection', 7, true)
ON CONFLICT DO NOTHING;
