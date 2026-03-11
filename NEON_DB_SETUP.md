# Neon Database Setup Guide

## Step 1: Create Neon Account

1. Go to [https://neon.tech](https://neon.tech)
2. Sign up for a free account
3. Create a new project

## Step 2: Get Database Connection String

1. In your Neon dashboard, go to your project
2. Click on "Connection Details"
3. Copy the connection string (it looks like this):
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

## Step 3: Configure Environment Variables

1. Open `.env.local` file in your project root
2. Replace the `DATABASE_URL` with your Neon connection string:
   ```env
   DATABASE_URL="postgresql://your-username:your-password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
   ```

## Step 4: Initialize Database

Run the initialization endpoint to create tables and seed data:

```bash
# Start your dev server
npm run dev

# In another terminal or browser, visit:
http://localhost:3001/api/init-db
```

You should see:
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "productsCount": "8"
}
```

## Step 5: Test the API

```bash
# Get all products
curl http://localhost:3001/api/products

# Get single product
curl http://localhost:3001/api/products/1

# Search products
curl http://localhost:3001/api/products/search?q=silk

# Get products by category
curl http://localhost:3001/api/products?category=Silk%20Collection

# Get in-stock products only
curl http://localhost:3001/api/products?inStock=true
```

## Database Schema

```sql
CREATE TABLE products (
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
```

## Troubleshooting

### Error: DATABASE_URL not set
- Make sure `.env.local` exists in project root
- Restart your dev server after adding environment variables

### Error: Connection failed
- Check if your Neon connection string is correct
- Ensure your IP is not blocked (Neon allows all IPs by default)
- Verify the connection string includes `?sslmode=require`

### Error: Table already exists
- This is normal if you run init-db multiple times
- The endpoint checks for existing data before inserting

## Neon Features Used

- **Serverless PostgreSQL**: No connection pooling needed
- **Auto-scaling**: Scales to zero when not in use
- **Branching**: Create database branches for testing
- **Free Tier**: 0.5 GB storage, 100 hours compute per month

## Next Steps

1. ✅ Database is set up
2. ✅ Tables are created
3. ✅ Sample data is inserted
4. ✅ API routes are working

Now you can:
- Use the API in your frontend
- Add more products via POST endpoint
- Implement authentication
- Add more features (cart, orders, etc.)
