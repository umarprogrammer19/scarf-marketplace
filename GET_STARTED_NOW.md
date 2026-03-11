# 🚀 Get Started Now - Backend Testing

## You Have 3 Things to Do

---

## ✅ STEP 1: Add Database URL (2 minutes)

### 1.1 Get Connection String
- Go to https://console.neon.tech
- Log in
- Copy your connection string

### 1.2 Add to .env.local
Create or edit `.env.local` in your project root:

```env
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

### 1.3 Restart Dev Server
```bash
npm run dev
```

---

## ✅ STEP 2: Create Orders Table (3 minutes)

### 2.1 Open Neon SQL Editor
1. Go to Neon Console
2. Click "SQL Editor"
3. Paste this entire SQL:

```sql
-- Orders table schema for Neon PostgreSQL

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

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$ LANGUAGE plpgsql;

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### 2.2 Execute
Click "Execute" button and wait for success ✅

---

## ✅ STEP 3: Test API (5 minutes)

### 3.1 Test Connection
```bash
curl http://localhost:3000/api/test
```

Should show: `"envLoaded": true`

### 3.2 Create Your First Order
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
      }
    ],
    "totalAmount": 5000,
    "paymentMethod": "cod",
    "shippingAddress": "123 Main Street, Karachi, Pakistan"
  }'
```

Should return: Order with ID and status "pending" ✅

### 3.3 Get All Orders
```bash
curl http://localhost:3000/api/orders
```

Should show: Array with your order ✅

### 3.4 Get Your Order
```bash
curl http://localhost:3000/api/orders/1
```

Should show: Your order details ✅

### 3.5 Update Order Status
```bash
curl -X PUT http://localhost:3000/api/orders/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "confirmed"}'
```

Should show: Status changed to "confirmed" ✅

---

## 🎉 Done!

Your backend is now working! You can:
- ✅ Create orders
- ✅ View orders
- ✅ Update orders
- ✅ Delete orders
- ✅ Filter orders

---

## More Commands to Try

### Get Pending Orders
```bash
curl "http://localhost:3000/api/orders?status=pending"
```

### Get User's Orders
```bash
curl "http://localhost:3000/api/orders?email=fatima@example.com"
```

### Delete Order
```bash
curl -X DELETE http://localhost:3000/api/orders/1
```

---

## Need Help?

- **Setup Issues?** → Read `BACKEND_SETUP_CHECKLIST.md`
- **Testing Issues?** → Read `BACKEND_TESTING_GUIDE.md`
- **API Reference?** → Read `QUICK_API_REFERENCE.md`
- **Architecture?** → Read `BACKEND_ARCHITECTURE.md`

---

## What's Next?

After testing:
1. Create order form component
2. Add checkout flow
3. Build admin dashboard
4. Add email notifications

---

**Time to Complete:** ~10 minutes
**Difficulty:** Easy
**Status:** Ready to Go! 🚀
