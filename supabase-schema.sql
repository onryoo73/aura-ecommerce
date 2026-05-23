-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/ijmqqyrtptxesapfpshs/sql/new)

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT,
  email TEXT UNIQUE,
  email_verified TIMESTAMP,
  image TEXT,
  password TEXT,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS accounts (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  provider_account_id TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INT,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  UNIQUE(provider, provider_account_id)
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  session_token TEXT UNIQUE NOT NULL,
  user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS verification_tokens (
  identifier TEXT,
  token TEXT UNIQUE NOT NULL,
  expires TIMESTAMP NOT NULL,
  UNIQUE(identifier, token)
);

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price INT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  user_id TEXT NOT NULL REFERENCES users(id),
  total INT NOT NULL,
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS order_items (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  order_id TEXT NOT NULL REFERENCES orders(id),
  product_id TEXT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  price INT NOT NULL
);

CREATE TABLE IF NOT EXISTS promo_banner (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  price INT NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now()
);

-- Enable RLS (Row Level Security) for public reads on products
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Products are publicly readable" ON products FOR SELECT USING (true);

ALTER TABLE promo_banner ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Promo banner is publicly readable" ON promo_banner FOR SELECT USING (true);

-- Seed admin user (password: Admin123!)
INSERT INTO users (email, name, password, is_admin)
VALUES (
  'admin@aura.com',
  'Admin User',
  '$2a$10$...', -- you need to generate this, or use the seed script below
  true
)
ON CONFLICT (email) DO NOTHING;
