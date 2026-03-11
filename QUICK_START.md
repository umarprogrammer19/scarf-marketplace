# Quick Start Guide - E-Commerce Backend with Neon DB

## Prerequisites
- Node.js installed
- Neon account (free at neon.tech)

---

## Setup Steps

### 1. Install Dependencies
```bash
cd scarf-marketplace
npm install
```

### 2. Set Up Neon Database

1. Go to [https://neon.tech](https://neon.tech) and sign up
2. Create a new project
3. Copy your connection string from the dashboard

### 3. Configure Environment

Create `.env.local` file in project root:

```env
DATABASE_URL="your-neon-connection-string-here"
```

Example:
```env
DATABASE_URL="postgresql://neondb_owner:xxxxx@ep-cool-name-123456.us-east-2.aws.neon.tech/neondb?sslmode=require"
```

### 4. Start Development Server

```bash
npm run dev
```

Server will start at: `http://localhost:3001`

### 5. Initialize Database

Open your browser or use curl:

```bash
curl http://localhost:3001/api/init-db
```

Or visit: `http://localhost:3001/api/init-db`

You should see:
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "productsCount": "8"
}
```

### 6. Test the API

```bash
# Get all products
curl http://localhost:3001/api/products

# Get single product
curl http://localhost:3001/api/products/1

# Search products
curl "http://localhost:3001/api/products/search?q=silk"
```

---

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/init-db` | Initialize database |
| GET | `/api/products` | Get all products |
| GET | `/api/products?category=X` | Filter by category |
| GET | `/api/products?inStock=true` | Get in-stock products |
| GET | `/api/products/[id]` | Get single product |
| GET | `/api/products/search?q=X` | Search products |
| POST | `/api/products` | Create product |
| PUT | `/api/products/[id]` | Update product |
| DELETE | `/api/products/[id]` | Delete product |

---

## Example: Create a Product

```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beautiful Scarf",
    "price": 2499,
    "originalPrice": 4999,
    "discount": 50,
    "image": "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800",
    "category": "Silk Collection",
    "stock": 20,
    "isNew": true
  }'
```

---

## Example: Update a Product

```bash
curl -X PUT http://localhost:3001/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "stock": 50,
    "price": 2199
  }'
```

---

## Example: Delete a Product

```bash
curl -X DELETE http://localhost:3001/api/products/1
```

---

## Troubleshooting

### Error: DATABASE_URL not set
- Check if `.env.local` exists in project root
- Restart dev server after adding environment variables

### Error: Connection failed
- Verify your Neon connection string is correct
- Make sure it includes `?sslmode=require`

### Port 3000 already in use
- The app will automatically use port 3001
- Or kill the process using port 3000

---

## Project Structure

```
scarf-marketplace/
├── src/
│   ├── app/
│   │   └── api/              # API routes
│   ├── lib/
│   │   ├── db.ts            # Database connection
│   │   └── dbService.ts     # Database operations
│   └── types/               # TypeScript types
├── .env.local               # Environment variables
└── package.json
```

---

## What's Included

✅ Complete REST API  
✅ PostgreSQL database (Neon)  
✅ TypeScript  
✅ CRUD operations  
✅ Search functionality  
✅ Category filtering  
✅ Stock management  
✅ Error handling  
✅ Sample data  

---

## Next Steps

1. ✅ Backend is ready
2. Connect your frontend to the API
3. Add authentication (NextAuth.js)
4. Implement shopping cart
5. Add order management
6. Deploy to Vercel

---

## Documentation

- **Setup Guide**: `NEON_DB_SETUP.md`
- **API Documentation**: `BACKEND_API_DOCS.md`
- **Database Schema**: `src/lib/schema.sql`

---

## Support

If you encounter any issues:
1. Check the documentation files
2. Verify your Neon connection string
3. Make sure all dependencies are installed
4. Restart the dev server

Happy coding! 🚀
