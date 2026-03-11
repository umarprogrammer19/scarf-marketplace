# Backend Order System - Testing Guide

## Overview
Your backend order management system is fully implemented with Next.js API routes and Neon PostgreSQL. This guide walks you through setting up the database and testing all endpoints.

---

## STEP 1: Setup Neon Database

### 1.1 Create Neon Account & Project
1. Go to [https://console.neon.tech](https://console.neon.tech)
2. Sign up or log in
3. Create a new project (or use existing one)
4. Copy your `DATABASE_URL` connection string

### 1.2 Add DATABASE_URL to .env.local
Create/update `.env.local` in your project root:

```env
DATABASE_URL="postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require"
```

Replace with your actual Neon connection string from the console.

### 1.3 Create Orders Table in Neon
1. Go to Neon Console → Your Project → SQL Editor
2. Copy the entire SQL schema from `src/lib/schema-orders.sql`
3. Paste it into the SQL Editor
4. Click "Execute"

The schema creates:
- `orders` table with all required fields
- Indexes for performance (email, status, created_at)
- Trigger for automatic `updated_at` timestamp updates

---

## STEP 2: Verify Database Connection

### Test Connection Endpoint
```bash
curl http://localhost:3000/api/test
```

Expected response:
```json
{
  "success": true,
  "message": "Database connected successfully",
  "timestamp": "2026-03-11T10:30:00.000Z"
}
```

---

## STEP 3: Test Order API Endpoints

### 3.1 Create an Order (POST)

**Endpoint:** `POST /api/orders`

**Request:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Fatima Khan",
    "customerEmail": "fatima@example.com",
    "customerPhone": "+92-300-1234567",
    "items": [
      {
        "productId": "1",
        "quantity": 2,
        "price": 2500
      },
      {
        "productId": "3",
        "quantity": 1,
        "price": 3500
      }
    ],
    "totalAmount": 8500,
    "paymentMethod": "cod",
    "shippingAddress": "123 Main Street, Karachi, Pakistan"
  }'
```

**Expected Response (201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "1",
    "customerName": "Fatima Khan",
    "customerEmail": "fatima@example.com",
    "customerPhone": "+92-300-1234567",
    "items": [
      {
        "productId": "1",
        "quantity": 2,
        "price": 2500
      },
      {
        "productId": "3",
        "quantity": 1,
        "price": 3500
      }
    ],
    "totalAmount": 8500,
    "status": "pending",
    "paymentMethod": "cod",
    "shippingAddress": "123 Main Street, Karachi, Pakistan",
    "createdAt": "2026-03-11T10:30:00.000Z",
    "updatedAt": "2026-03-11T10:30:00.000Z"
  }
}
```

---

### 3.2 Get All Orders (GET)

**Endpoint:** `GET /api/orders`

**Request:**
```bash
curl http://localhost:3000/api/orders
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "customerName": "Fatima Khan",
      "customerEmail": "fatima@example.com",
      "customerPhone": "+92-300-1234567",
      "items": [...],
      "totalAmount": 8500,
      "status": "pending",
      "paymentMethod": "cod",
      "shippingAddress": "123 Main Street, Karachi, Pakistan",
      "createdAt": "2026-03-11T10:30:00.000Z",
      "updatedAt": "2026-03-11T10:30:00.000Z"
    }
  ]
}
```

---

### 3.3 Get Orders by Status (GET with query)

**Endpoint:** `GET /api/orders?status=pending`

**Request:**
```bash
curl "http://localhost:3000/api/orders?status=pending"
```

**Supported statuses:** `pending`, `confirmed`, `shipped`, `delivered`, `cancelled`

---

### 3.4 Get Orders by Customer Email (GET with query)

**Endpoint:** `GET /api/orders?email=fatima@example.com`

**Request:**
```bash
curl "http://localhost:3000/api/orders?email=fatima@example.com"
```

---

### 3.5 Get Single Order (GET)

**Endpoint:** `GET /api/orders/[id]`

**Request:**
```bash
curl http://localhost:3000/api/orders/1
```

**Expected Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "customerName": "Fatima Khan",
    ...
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Order not found"
}
```

---

### 3.6 Update Order Status (PUT)

**Endpoint:** `PUT /api/orders/[id]`

**Request:**
```bash
curl -X PUT http://localhost:3000/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'
```

**Allowed status updates:** `pending` → `confirmed` → `shipped` → `delivered` (or `cancelled`)

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Order updated successfully",
  "data": {
    "id": "1",
    "status": "confirmed",
    "updatedAt": "2026-03-11T10:35:00.000Z",
    ...
  }
}
```

---

### 3.7 Delete Order (DELETE)

**Endpoint:** `DELETE /api/orders/[id]`

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/orders/1
```

**Expected Response (200):**
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

---

## STEP 4: Test with Postman (Optional)

### Import Collection
1. Open Postman
2. Create new collection: "Hijab Store Orders"
3. Add requests for each endpoint above
4. Set `{{base_url}}` variable to `http://localhost:3000`

### Example Postman Variables
```
base_url: http://localhost:3000
order_id: 1
customer_email: fatima@example.com
```

---

## STEP 5: Frontend Integration (Next Steps)

Once backend is tested, integrate order creation from frontend:

### Example Frontend Order Creation
```typescript
async function createOrder(orderData: OrderCreateInput) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  
  const result = await response.json()
  
  if (result.success) {
    console.log('Order created:', result.data)
    // Show success message
    // Redirect to order confirmation page
  } else {
    console.error('Order failed:', result.error)
    // Show error message
  }
}
```

---

## Troubleshooting

### Issue: "DATABASE_URL environment variable is not set"
**Solution:** 
- Ensure `.env.local` exists in project root
- Restart dev server after adding `.env.local`
- Check that DATABASE_URL is correctly formatted

### Issue: "relation 'orders' does not exist"
**Solution:**
- Run the SQL schema in Neon console
- Verify the schema executed without errors
- Check that you're using the correct database

### Issue: "Connection refused"
**Solution:**
- Verify Neon project is active
- Check DATABASE_URL is correct
- Ensure internet connection is stable

### Issue: "CORS errors when testing from frontend"
**Solution:**
- API routes are same-origin, no CORS needed
- If using external tools, ensure proper headers

---

## Database Schema Reference

### Orders Table Structure
```sql
id              SERIAL PRIMARY KEY
customer_name   VARCHAR(255) NOT NULL
customer_email  VARCHAR(255) NOT NULL
customer_phone  VARCHAR(20) NOT NULL
items           JSONB NOT NULL
total_amount    DECIMAL(10, 2) NOT NULL
status          VARCHAR(50) DEFAULT 'pending'
payment_method  VARCHAR(50) NOT NULL
shipping_address TEXT NOT NULL
created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP
```

### Indexes
- `idx_orders_customer_email` - Fast lookup by email
- `idx_orders_status` - Fast filtering by status
- `idx_orders_created_at` - Fast sorting by date

---

## API Response Format

All endpoints follow this response format:

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error description"
}
```

---

## Next Steps

1. ✅ Setup Neon database
2. ✅ Create orders table using SQL schema
3. ✅ Test all API endpoints with curl/Postman
4. ⏭️ Create order form component on frontend
5. ⏭️ Integrate order creation with product checkout
6. ⏭️ Build admin dashboard for order management
7. ⏭️ Add email notifications for orders

---

## Support

For issues or questions:
- Check Neon console for database errors
- Review server logs in terminal
- Verify all environment variables are set
- Ensure Next.js dev server is running
