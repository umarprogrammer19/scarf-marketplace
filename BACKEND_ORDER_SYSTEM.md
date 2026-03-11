# Backend Order Management System

## 🎯 Overview

Complete order management system integrated with your Next.js backend and Neon PostgreSQL database.

## 📦 What's Included

### 1. Order Types (`src/types/order.ts`)
- `Order` - Complete order object
- `OrderItem` - Individual product in order
- `OrderCreateInput` - Input for creating orders
- `OrderUpdateInput` - Input for updating orders

### 2. Order Service (`src/lib/orderService.ts`)
Complete CRUD operations for orders:
- `getAllOrders()` - Get all orders
- `getOrderById(id)` - Get specific order
- `createOrder(input)` - Create new order
- `updateOrder(id, input)` - Update order status/payment
- `deleteOrder(id)` - Delete order
- `getOrdersByStatus(status)` - Filter by status
- `getOrdersByCustomerEmail(email)` - Get customer orders

### 3. API Routes

#### GET /api/orders
Get all orders with optional filters:
```bash
# Get all orders
GET /api/orders

# Get orders by status
GET /api/orders?status=pending

# Get customer orders
GET /api/orders?email=customer@example.com
```

#### POST /api/orders
Create new order:
```bash
POST /api/orders
Content-Type: application/json

{
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+92300123456",
  "items": [
    {
      "productId": "1",
      "quantity": 2,
      "price": 2499
    }
  ],
  "totalAmount": 4998,
  "paymentMethod": "cod",
  "shippingAddress": "123 Main St, Karachi"
}
```

#### GET /api/orders/[id]
Get specific order:
```bash
GET /api/orders/1
```

#### PUT /api/orders/[id]
Update order:
```bash
PUT /api/orders/1
Content-Type: application/json

{
  "status": "confirmed",
  "paymentMethod": "card"
}
```

#### DELETE /api/orders/[id]
Delete order:
```bash
DELETE /api/orders/1
```

## 🗄️ Database Schema

### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(50) NOT NULL,
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Status Values
- `pending` - Order received, awaiting confirmation
- `confirmed` - Order confirmed by admin
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

### Payment Methods
- `cod` - Cash on Delivery
- `card` - Credit/Debit Card
- `bank_transfer` - Bank Transfer

## 🚀 Setup Instructions

### 1. Create Orders Table in Neon

Run this SQL in your Neon console:

```sql
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  items JSONB NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  payment_method VARCHAR(50) NOT NULL CHECK (payment_method IN ('cod', 'card', 'bank_transfer')),
  shipping_address TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_orders_customer_email ON orders(customer_email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

### 2. Environment Variables

Make sure your `.env.local` has:
```
DATABASE_URL=postgresql://user:password@host/database
```

### 3. Test the API

Use curl or Postman to test:

```bash
# Create order
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Ahmed Khan",
    "customerEmail": "ahmed@example.com",
    "customerPhone": "+92300123456",
    "items": [
      {
        "productId": "1",
        "quantity": 1,
        "price": 2499
      }
    ],
    "totalAmount": 2499,
    "paymentMethod": "cod",
    "shippingAddress": "123 Main St, Karachi, Pakistan"
  }'

# Get all orders
curl http://localhost:3000/api/orders

# Get specific order
curl http://localhost:3000/api/orders/1

# Update order status
curl -X PUT http://localhost:3000/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "confirmed"
  }'

# Get customer orders
curl "http://localhost:3000/api/orders?email=ahmed@example.com"

# Get pending orders
curl "http://localhost:3000/api/orders?status=pending"
```

## 📊 Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "id": "1",
    "customerName": "Ahmed Khan",
    "customerEmail": "ahmed@example.com",
    "customerPhone": "+92300123456",
    "items": [
      {
        "productId": "1",
        "quantity": 1,
        "price": 2499
      }
    ],
    "totalAmount": 2499,
    "status": "pending",
    "paymentMethod": "cod",
    "shippingAddress": "123 Main St, Karachi",
    "createdAt": "2026-03-11T10:30:00Z",
    "updatedAt": "2026-03-11T10:30:00Z"
  },
  "message": "Order created successfully"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Failed to create order"
}
```

## 🔄 Order Workflow

1. **Customer Places Order** → POST /api/orders
2. **Order Created** → Status: `pending`
3. **Admin Confirms** → PUT /api/orders/[id] → Status: `confirmed`
4. **Order Shipped** → PUT /api/orders/[id] → Status: `shipped`
5. **Order Delivered** → PUT /api/orders/[id] → Status: `delivered`

## 💡 Integration with Frontend

### Create Order from Frontend
```typescript
async function createOrder(orderData) {
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  })
  return response.json()
}
```

### Get Customer Orders
```typescript
async function getCustomerOrders(email) {
  const response = await fetch(`/api/orders?email=${email}`)
  return response.json()
}
```

### Update Order Status
```typescript
async function updateOrderStatus(orderId, status) {
  const response = await fetch(`/api/orders/${orderId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
  return response.json()
}
```

## 🛠️ Admin Dashboard Features

You can build an admin dashboard to:
- View all orders
- Filter by status
- Update order status
- View customer details
- Track shipments
- Generate reports

## 📈 Future Enhancements

1. **Payment Integration**
   - Stripe integration
   - JazzCash integration
   - Easypaisa integration

2. **Notifications**
   - Email notifications
   - SMS notifications
   - WhatsApp notifications

3. **Analytics**
   - Order statistics
   - Revenue tracking
   - Customer insights

4. **Inventory Management**
   - Auto-update stock on order
   - Low stock alerts
   - Reorder management

## ✅ Checklist

- ✅ Order types defined
- ✅ Order service created
- ✅ API routes implemented
- ✅ Database schema ready
- ✅ CRUD operations working
- ✅ Filtering by status/email
- ✅ Error handling
- ✅ Response formatting

## 🎉 Ready to Use!

Your backend order system is now ready. You can:
1. Create orders from frontend
2. Track orders in database
3. Update order status
4. Query orders by customer
5. Filter by status

Start testing with the API endpoints! 🚀
