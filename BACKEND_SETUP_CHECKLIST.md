# Backend Setup Checklist - Complete Guide

## Phase 1: Environment Setup ✅

### Step 1: Get Neon Connection String
- [ ] Go to https://console.neon.tech
- [ ] Log in to your account
- [ ] Select your project
- [ ] Click "Connection string" or "Connection details"
- [ ] Copy the full connection string (looks like: `postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require`)

### Step 2: Add to .env.local
- [ ] Open `.env.local` in project root (create if doesn't exist)
- [ ] Add this line:
```env
DATABASE_URL="your_connection_string_here"
```
- [ ] Save the file
- [ ] **IMPORTANT:** Restart your dev server after adding this

### Step 3: Verify Environment Variable
- [ ] Run: `curl http://localhost:3000/api/test`
- [ ] Look for `"envLoaded": true` in response
- [ ] If false, restart dev server and try again

---

## Phase 2: Database Setup ✅

### Step 4: Create Orders Table
- [ ] Go to Neon Console → Your Project → SQL Editor
- [ ] Open file: `src/lib/schema-orders.sql`
- [ ] Copy ALL the SQL code
- [ ] Paste into Neon SQL Editor
- [ ] Click "Execute" button
- [ ] Wait for success message
- [ ] You should see:
  - ✅ CREATE TABLE orders
  - ✅ CREATE INDEX (3 times)
  - ✅ CREATE FUNCTION
  - ✅ CREATE TRIGGER

### Step 5: Verify Table Creation
In Neon console:
- [ ] Go to "Tables" section
- [ ] Look for `orders` table
- [ ] Click on it to see columns:
  - id, customer_name, customer_email, customer_phone
  - items, total_amount, status, payment_method
  - shipping_address, created_at, updated_at

---

## Phase 3: API Testing ✅

### Step 6: Test Database Connection
```bash
curl http://localhost:3000/api/test
```

Expected response:
```json
{
  "success": true,
  "message": "API is working!",
  "envLoaded": true,
  "dbUrlPrefix": "postgresql://..."
}
```

- [ ] Response shows `"envLoaded": true`
- [ ] No error messages

### Step 7: Create Test Order
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "customerEmail": "test@example.com",
    "customerPhone": "+92-300-1234567",
    "items": [
      {
        "productId": "1",
        "quantity": 2,
        "price": 2500
      }
    ],
    "totalAmount": 5000,
    "paymentMethod": "cod",
    "shippingAddress": "123 Main Street, Karachi, Pakistan"
  }'
```

Expected response (201):
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "1",
    "customerName": "Test User",
    "status": "pending",
    ...
  }
}
```

- [ ] Response status is 201
- [ ] Order has an ID
- [ ] Status is "pending"

### Step 8: Retrieve Orders
```bash
curl http://localhost:3000/api/orders
```

Expected response:
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "customerName": "Test User",
      ...
    }
  ]
}
```

- [ ] Response shows array of orders
- [ ] Your test order appears in the list

### Step 9: Get Single Order
```bash
curl http://localhost:3000/api/orders/1
```

- [ ] Response shows the order with ID 1
- [ ] All fields are present

### Step 10: Update Order Status
```bash
curl -X PUT http://localhost:3000/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

Expected response:
```json
{
  "success": true,
  "message": "Order updated successfully",
  "data": {
    "id": "1",
    "status": "confirmed",
    ...
  }
}
```

- [ ] Status changed to "confirmed"
- [ ] updatedAt timestamp is recent

### Step 11: Filter Orders by Status
```bash
curl "http://localhost:3000/api/orders?status=confirmed"
```

- [ ] Returns only orders with status "confirmed"

### Step 12: Filter Orders by Email
```bash
curl "http://localhost:3000/api/orders?email=test@example.com"
```

- [ ] Returns only orders from that email

### Step 13: Delete Order
```bash
curl -X DELETE http://localhost:3000/api/orders/1
```

Expected response:
```json
{
  "success": true,
  "message": "Order deleted successfully"
}
```

- [ ] Response shows success
- [ ] Order is removed from database

---

## Phase 4: Advanced Testing (Optional)

### Step 14: Test Multiple Orders
Create 3-5 orders with different:
- [ ] Customer names
- [ ] Email addresses
- [ ] Payment methods (cod, card, bank_transfer)
- [ ] Different statuses

### Step 15: Test Error Cases
- [ ] Missing required fields → Should return 400
- [ ] Invalid order ID → Should return 404
- [ ] Invalid status value → Should be rejected

### Step 16: Test with Postman (Optional)
- [ ] Download Postman
- [ ] Create collection "Hijab Store"
- [ ] Add all 7 endpoints
- [ ] Test each one
- [ ] Save collection for team

---

## Phase 5: Frontend Integration (Next Steps)

### Step 17: Create Order Form Component
- [ ] Create `src/components/OrderForm.tsx`
- [ ] Add form fields for customer info
- [ ] Add product selection
- [ ] Add address input

### Step 18: Integrate with Checkout
- [ ] Add order creation on checkout
- [ ] Show success/error messages
- [ ] Redirect to order confirmation

### Step 19: Display Orders
- [ ] Create order history page
- [ ] Show customer's orders
- [ ] Allow status tracking

---

## Troubleshooting Guide

### Problem: "DATABASE_URL environment variable is not set"
**Solution:**
1. Check `.env.local` exists in project root
2. Verify DATABASE_URL line is there
3. Restart dev server: `npm run dev`
4. Test again: `curl http://localhost:3000/api/test`

### Problem: "relation 'orders' does not exist"
**Solution:**
1. Go to Neon console
2. Check if orders table exists in Tables section
3. If not, run the SQL schema again
4. Verify no SQL errors occurred

### Problem: "Connection refused" or timeout
**Solution:**
1. Check internet connection
2. Verify Neon project is active
3. Check DATABASE_URL is correct (no typos)
4. Try connecting from Neon console first

### Problem: "Missing required fields" error
**Solution:**
1. Check all required fields are in request:
   - customerName
   - customerEmail
   - customerPhone
   - items (array)
   - totalAmount
   - paymentMethod
   - shippingAddress
2. Verify data types are correct
3. Check JSON formatting

### Problem: CORS errors (if testing from external tool)
**Solution:**
- API routes are same-origin, no CORS needed
- Use curl or Postman from same machine
- If using external service, add CORS headers to API

---

## Success Indicators ✅

You'll know everything is working when:
- [ ] `curl http://localhost:3000/api/test` shows `"envLoaded": true`
- [ ] Can create orders and get 201 response
- [ ] Can retrieve all orders
- [ ] Can get single order by ID
- [ ] Can update order status
- [ ] Can filter by status and email
- [ ] Can delete orders
- [ ] Neon console shows orders table with data

---

## Quick Reference

### Files to Know
- **API Routes:** `src/app/api/orders/`
- **Order Service:** `src/lib/orderService.ts`
- **Database Connection:** `src/lib/db.ts`
- **Types:** `src/types/order.ts`
- **SQL Schema:** `src/lib/schema-orders.sql`

### Environment
- **Dev Server:** `npm run dev` (runs on http://localhost:3000)
- **Database:** Neon PostgreSQL
- **API Format:** REST with JSON

### Status Values
- `pending` - New order
- `confirmed` - Customer confirmed
- `shipped` - Order shipped
- `delivered` - Order delivered
- `cancelled` - Order cancelled

### Payment Methods
- `cod` - Cash on Delivery
- `card` - Credit/Debit Card
- `bank_transfer` - Bank Transfer

---

## Next Steps After Setup

1. ✅ Complete all checklist items above
2. ⏭️ Create order form component
3. ⏭️ Add checkout flow
4. ⏭️ Build admin dashboard
5. ⏭️ Add email notifications
6. ⏭️ Implement payment gateway

---

## Support Resources

- **Neon Docs:** https://neon.tech/docs
- **Next.js API Routes:** https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- **PostgreSQL Docs:** https://www.postgresql.org/docs/

---

**Last Updated:** March 11, 2026
**Status:** Ready for Testing ✅
