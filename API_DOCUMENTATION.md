# E-Commerce API Documentation

## Base URL
```
http://localhost:3001/api
```

## Response Format
All API responses follow this structure:
```json
{
  "success": true,
  "data": {},
  "message": "Optional message",
  "error": "Optional error message"
}
```

---

## Endpoints

### 1. Get All Products
**GET** `/api/products`

Returns all products from the database.

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

**Example:**
```bash
curl http://localhost:3001/api/products
```

---

### 2. Get Single Product
**GET** `/api/products/[id]`

Returns a single product by ID.

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

**Error Response (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

**Example:**
```bash
curl http://localhost:3001/api/products/1
```

---

### 3. Create Product
**POST** `/api/products`

Creates a new product.

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
- `title` (string)
- `price` (number)
- `image` (string)
- `category` (string)
- `stock` (number)

**Optional Fields:**
- `originalPrice` (number)
- `discount` (number)
- `isNew` (boolean)

**Response (201):**
```json
{
  "success": true,
  "data": {
    "id": "prod_1234567890_abc123",
    "title": "New Scarf",
    "price": 1999,
    "originalPrice": 3999,
    "discount": 50,
    "image": "https://example.com/image.jpg",
    "category": "Summer Collection",
    "stock": 25,
    "isNew": true
  },
  "message": "Product created successfully"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Missing required fields: title, price, image, category, stock"
}
```

**Example:**
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "New Scarf",
    "price": 1999,
    "image": "https://example.com/image.jpg",
    "category": "Summer Collection",
    "stock": 25
  }'
```

---

### 4. Update Product
**PUT** `/api/products/[id]`

Updates an existing product. All fields are optional.

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
    "originalPrice": 4999,
    "discount": 50,
    "image": "https://...",
    "category": "Silk Collection",
    "stock": 30,
    "isNew": false
  },
  "message": "Product updated successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

**Example:**
```bash
curl -X PUT http://localhost:3001/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 2199,
    "stock": 30
  }'
```

---

### 5. Delete Product
**DELETE** `/api/products/[id]`

Deletes a product by ID.

**Response (200):**
```json
{
  "success": true,
  "message": "Product deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Product not found"
}
```

**Example:**
```bash
curl -X DELETE http://localhost:3001/api/products/1
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Testing the API

### Using cURL

**Get all products:**
```bash
curl http://localhost:3001/api/products
```

**Get single product:**
```bash
curl http://localhost:3001/api/products/1
```

**Create product:**
```bash
curl -X POST http://localhost:3001/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Product",
    "price": 1500,
    "image": "https://example.com/test.jpg",
    "category": "Test Category",
    "stock": 10
  }'
```

**Update product:**
```bash
curl -X PUT http://localhost:3001/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"stock": 50}'
```

**Delete product:**
```bash
curl -X DELETE http://localhost:3001/api/products/1
```

### Using JavaScript/Fetch

```javascript
// Get all products
const products = await fetch('http://localhost:3001/api/products')
  .then(res => res.json())

// Get single product
const product = await fetch('http://localhost:3001/api/products/1')
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

## Data Storage

Products are stored in a local JSON file at:
```
src/data/products.json
```

The file is automatically created and updated by the API. No database setup required.

---

## Project Structure

```
scarf-marketplace/
├── src/
│   ├── app/
│   │   └── api/
│   │       └── products/
│   │           ├── route.ts          # GET, POST /api/products
│   │           └── [id]/
│   │               └── route.ts      # GET, PUT, DELETE /api/products/[id]
│   ├── data/
│   │   └── products.json             # Product data storage
│   ├── lib/
│   │   └── productService.ts         # Business logic
│   └── types/
│       ├── product.ts                # Product type definitions
│       └── api.ts                    # API type definitions
```
