# Complete Backend API Documentation

## Tech Stack
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Neon (Serverless PostgreSQL)
- **Driver**: @neondatabase/serverless

---

## Base URL
```
http://localhost:3001/api
```

---

## API Endpoints

### 1. Initialize Database
**GET** `/api/init-db`

Creates tables and seeds initial data. Run this once after setting up Neon.

**Response:**
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "productsCount": "8"
}
```

---

### 2. Get All Products
**GET** `/api/products`

**Query Parameters:**
- `category` (optional): Filter by category
- `inStock` (optional): Set to "true" for in-stock products only

**Examples:**
```bash
# All products
GET /api/products

# By category
GET /api/products?category=Silk%20Collection

# In-stock only
GET /api/products?inStock=true
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Elegant Silk Scarf - Maroon",
      "price": 2499,
      "originalPrice": 4999,
      "discount": 50,
      "image": "https://...",
      "category": "Silk Collection",
      "stock": 15,
      "isNew": true
    }
  ]
}
```

---

### 3. Get Single Product
**GET** `/api/products/[id]`

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Elegant Silk Scarf - Maroon",
    "price": 2499,
    "originalPrice": 4999,
    "discount": 50,
    "image": "https://...",
    "category": "Silk Collection",
    "stock": 15,
    "isNew": true
  }
}
```

---

### 4. Search Products
**GET** `/api/products/search?q=query`

Searches in title and category fields (case-insensitive).

**Example:**
```bash
GET /api/products/search?q=silk
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "title": "Elegant Silk Scarf - Maroon",
      ...
    }
  ]
}
```

---

### 5. Create Product
**POST** `/api/products`

**Request Body:**
```json
{
  "title": "New Scarf",
  "price": 1999,
  "originalPrice": 3999,
  "discount": 50,
  "image": "https://example.com/image.jpg",
  "category": "Summer Collection",
  "stock": 25,
  "isNew": true
}
```

**Required Fields:**
- title
- price
- image
- category
- stock

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "9",
    "title": "New Scarf",
    ...
  },
  "message": "Product created successfully"
}
```

---

### 6. Update Product
**PUT** `/api/products/[id]`

All fields are optional. Only send fields you want to update.

**Request Body:**
```json
{
  "price": 2199,
  "stock": 30,
  "isNew": false
}
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "title": "Elegant Silk Scarf - Maroon",
    "price": 2199,
    "stock": 30,
    ...
  },
  "message": "Product updated successfully"
}
```

---

### 7. Delete Product
**DELETE** `/api/products/[id]`

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error

---

## Testing with cURL

```bash
# Initialize database
curl http://localhost:3001/api/init-db

# Get all products
curl http://localhost:3001/api/products

# Get single product
curl http://localhost:3001/api/products/1

# Search products
curl "http://localhost:3001/api/products/search?q=silk"

# Create product
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "price": 1500,
    "image": "https://example.com/test.jpg",
    "category": "Test Category",
    "stock": 10
  }'

# Update product
curl -X PUT http://localhost:3001/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"stock": 50, "price": 2199}'

# Delete product
curl -X DELETE http://localhost:3001/api/products/1
```

---

## Testing with JavaScript

```javascript
// Get all products
const products = await fetch('http://localhost:3001/api/products')
  .then(res => res.json())

// Search products
const searchResults = await fetch('http://localhost:3001/api/products/search?q=silk')
  .then(res => res.json())

// Create product
const newProduct = await fetch('http://localhost:3001/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Product',
    price: 2000,
    image: 'https://example.com/image.jpg',
    category: 'Test',
    stock: 15
  })
}).then(res => res.json())

// Update product
const updated = await fetch('http://localhost:3001/api/products/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ stock: 100 })
}).then(res => res.json())

// Delete product
const deleted = await fetch('http://localhost:3001/api/products/1', {
  method: 'DELETE'
}).then(res => res.json())
```

---

## Project Structure

```
scarf-marketplace/
├── src/
│   ├── app/
│   │   └── api/
│   │       ├── init-db/
│   │       │   └── route.ts          # Database initialization
│   │       └── products/
│   │           ├── route.ts          # GET, POST /api/products
│   │           ├── [id]/
│   │           │   └── route.ts      # GET, PUT, DELETE /api/products/[id]
│   │           └── search/
│   │               └── route.ts      # GET /api/products/search
│   ├── lib/
│   │   ├── db.ts                     # Neon connection
│   │   ├── dbService.ts              # Database operations
│   │   └── schema.sql                # SQL schema
│   └── types/
│       ├── product.ts                # Product types
│       └── api.ts                    # API types
├── .env.local                        # Environment variables
└── NEON_DB_SETUP.md                  # Setup guide
```

---

## Environment Variables

Required in `.env.local`:

```env
DATABASE_URL="postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

---

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

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_stock ON products(stock);
```

---

## Features

✅ Full CRUD operations  
✅ Search functionality  
✅ Filter by category  
✅ Filter by stock status  
✅ Serverless PostgreSQL (Neon)  
✅ TypeScript type safety  
✅ Error handling  
✅ Input validation  
✅ Indexed queries for performance  

---

## Next Steps

1. ✅ Set up Neon database
2. ✅ Initialize tables
3. ✅ Test all endpoints
4. 🔄 Connect frontend to API
5. 🔄 Add authentication
6. 🔄 Add cart functionality
7. 🔄 Add order management
