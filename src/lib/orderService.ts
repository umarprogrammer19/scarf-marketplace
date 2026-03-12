import { sql } from './db'
import { Order, OrderCreateInput, OrderUpdateInput } from '@/types/order'

function mapRowToOrder(row: any): Order {
  return {
    id: row.id.toString(),
    customerName: row.customer_name,
    customerEmail: row.customer_email,
    customerPhone: row.customer_phone,
    items: row.items,
    totalAmount: row.total_amount,
    status: row.status,
    paymentMethod: row.payment_method,
    shippingAddress: row.shipping_address,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }
}

// Get all orders
export async function getAllOrders(): Promise<Order[]> {
  try {
    const rows = await sql`
      SELECT * FROM orders 
      ORDER BY created_at DESC
    `
    return rows.map(mapRowToOrder)
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw new Error('Failed to fetch orders')
  }
}

// Get order by ID
export async function getOrderById(id: string): Promise<Order | null> {
  try {
    const rows = await sql`
      SELECT * FROM orders 
      WHERE id = ${parseInt(id)}
    `
    
    if (rows.length === 0) {
      return null
    }
    
    return mapRowToOrder(rows[0])
  } catch (error) {
    console.error('Error fetching order:', error)
    throw new Error('Failed to fetch order')
  }
}

// Create new order
export async function createOrder(input: OrderCreateInput): Promise<Order> {
  try {
    console.log('Creating order with input:', input)
    
    const rows = await sql`
      INSERT INTO orders (
        customer_name,
        customer_email,
        customer_phone,
        items,
        total_amount,
        status,
        payment_method,
        shipping_address
      )
      VALUES (
        ${input.customerName},
        ${input.customerEmail},
        ${input.customerPhone},
        ${JSON.stringify(input.items)}::jsonb,
        ${input.totalAmount},
        'pending',
        ${input.paymentMethod},
        ${input.shippingAddress}
      )
      RETURNING *
    `
    
    console.log('Order created successfully:', rows[0])
    return mapRowToOrder(rows[0])
  } catch (error: any) {
    console.error('Error creating order:', error)
    throw new Error(`Failed to create order: ${error.message}`)
  }
}

// Update order
export async function updateOrder(id: string, input: OrderUpdateInput): Promise<Order | null> {
  try {
    const orderId = parseInt(id)
    
    const rows = await sql`
      UPDATE orders 
      SET 
        status = COALESCE(${input.status || null}, status),
        payment_method = COALESCE(${input.paymentMethod || null}, payment_method),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${orderId}
      RETURNING *
    `
    
    if (rows.length === 0) {
      return null
    }
    
    return mapRowToOrder(rows[0])
  } catch (error) {
    console.error('Error updating order:', error)
    throw new Error('Failed to update order')
  }
}

// Get orders by status
export async function getOrdersByStatus(status: string): Promise<Order[]> {
  try {
    const rows = await sql`
      SELECT * FROM orders 
      WHERE status = ${status}
      ORDER BY created_at DESC
    `
    return rows.map(mapRowToOrder)
  } catch (error) {
    console.error('Error fetching orders by status:', error)
    throw new Error('Failed to fetch orders by status')
  }
}

// Get orders by customer email
export async function getOrdersByCustomerEmail(email: string): Promise<Order[]> {
  try {
    const rows = await sql`
      SELECT * FROM orders 
      WHERE customer_email = ${email}
      ORDER BY created_at DESC
    `
    return rows.map(mapRowToOrder)
  } catch (error) {
    console.error('Error fetching customer orders:', error)
    throw new Error('Failed to fetch customer orders')
  }
}

// Delete order
export async function deleteOrder(id: string): Promise<boolean> {
  try {
    const rows = await sql`
      DELETE FROM orders 
      WHERE id = ${parseInt(id)}
      RETURNING id
    `
    
    return rows.length > 0
  } catch (error) {
    console.error('Error deleting order:', error)
    throw new Error('Failed to delete order')
  }
}
