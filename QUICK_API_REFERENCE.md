# Quick API Reference - Order Management

## Quick Setup Checklist
- [ ] Add `DATABASE_URL` to `.env.local`
- [ ] Restart dev server
- [ ] Run SQL schema in Neon console
- [ ] Test connection: `curl http://localhost:3000/api/test`

---

## API Endpoints Summary

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/orders` | Create new order |
| GET | `/api/orders` | Get all orders |
| GET | `/api/orders?status=pending` | Filter by status |
| GET | `/api/orders?email=user@example.com` | Filter by email |
| GET | `/api/orders/1` | Get single order |
| PUT | `/api/orders/1` | Update order status |
| DELETE | `/api/orders/1` | Delete order |

---

## Quick Test Commands

### Create Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "customerPhone": "+92-300-1234567",
    "items": [{"productId": "1", "quantity": 1, "price": 2500}],
    "totalAmount": 2500,
    "paymentMethod": "cod",
    "shippingAddress": "123 Main St, Karachi"
  }'
```

### Get All Orders
```bash
curl http://localhost:3000/api/orders
```

### Get Pending Orders
```bash
curl "http://localhost:3000/api/orders?status=pending"
```

### Get User Orders
```bash
curl "http://localhost:3000/api/orders?email=test@example.com"
```

### Get Single Order
```bash
curl http://localhost:3000/api/orders/1
```

### Update Order Status
```bash
curl -X PUT http://localhost:3000/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

### Delete Order
```bash
curl -X DELETE http://localhost:3000/api/orders/1
```

---

## Order Status Flow
```
pending → confirmed → shipped → delivered
   ↓
cancelled (can happen at any stage)
```

---

## Payment Methods
- `cod` - Cash on Delivery
- `card` - Credit/Debit Card
- `bank_transfer` - Bank Transfer

---

## Required Fields for Order Creation
```json
{
  "customerName": "string",
  "customerEmail": "string",
  "customerPhone": "string",
  "items": [
    {
      "productId": "string",
      "quantity": "number",
      "price": "number"
    }
  ],
  "totalAmount": "number",
  "paymentMethod": "cod|card|bank_transfer",
  "shippingAddress": "string"
}
```

---

## Response Examples

### Success (201)
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": { /* order object */ }
}
```

### Error (400)
```json
{
  "success": false,
  "error": "Missing required fields"
}
```

### Not Found (404)
```json
{
  "success": false,
  "error": "Order not found"
}
```

---

## Files Reference
- **API Routes:** `src/app/api/orders/`
- **Services:** `src/lib/orderService.ts`
- **Types:** `src/types/order.ts`
- **Database:** `src/lib/db.ts`
- **Schema:** `src/lib/schema-orders.sql`
