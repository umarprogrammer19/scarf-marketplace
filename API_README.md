# Full-Stack E-Commerce Backend API

A complete REST API built with Next.js 14 App Router for managing e-commerce products.

## Features

✅ Full CRUD operations (Create, Read, Update, Delete)  
✅ File-based storage (no database required)  
✅ TypeScript for type safety  
✅ Clean, modular architecture  
✅ Consistent JSON response format  
✅ Error handling  
✅ Input validation  

## Quick Start

1. **Start the development server:**
```bash
cd scarf-marketplace
npm run dev
```

2. **Test the API:**
```bash
# In a new terminal
node test-api.js
```

3. **Or use cURL:**
```bash
curl http://localhost:3001/api/products
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/[id]` | Get single product |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/[id]` | Update product |
| DELETE | `/api/products/[id]` | Delete product |

## Response Format

All responses follow this structure:

```typescript
{
  success: boolean
  data?: any
  message?: string
  error?: string
}
```

## Example Usage

### JavaScript/Fetch

```javascript
// Get all products
const response = await fetch('http://localhost:3001/api/products')
const { success, data } = await response.json()

if (success) {
  console.log('Products:', data)
}
```

### Create Product

```javascript
const response = await fetch('http://localhost:3001/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'New Scarf',
    price: 2499,
    image: 'https://example.com/image.jpg',
    category: 'Silk Collection',
    stock: 20
  })
})

const { success, data, message } = await response.json()
```

### Update Product

```javascript
const response = await fetch('http://localhost:3001/api/products/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    stock: 50,
    price: 2199
  })
})
```

### Delete Product

```javascript
const response = await fetch('http://localhost:3001/api/products/1', {
  method: 'DELETE'
})
```

## Project Structure

```
src/
├── app/api/products/
│   ├── route.ts              # GET, POST handlers
│   └── [id]/route.ts         # GET, PUT, DELETE handlers
├── lib/
│   └── productService.ts     # Business logic & file operations
├── types/
│   ├── product.ts            # Product interface
│   └── api.ts                # API response types
└── data/
    └── products.json         # Data storage
```

## Data Model

```typescript
interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  stock: number
  isNew?: boolean
}
```

## Testing

Run the included test script:

```bash
node test-api.js
```

This will test all CRUD operations and error handling.

## Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for detailed API documentation with examples.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Storage:** JSON file (no database)
- **API:** REST with Next.js Route Handlers

## Notes

- Products are stored in `src/data/products.json`
- IDs are auto-generated with format: `prod_timestamp_random`
- File is created automatically if it doesn't exist
- All operations are synchronous (suitable for small datasets)

## Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Internal Server Error
