import { NextRequest, NextResponse } from 'next/server'
import { getAllOrders, createOrder } from '@/lib/orderService'
import { ApiResponse } from '@/types/api'
import { Order } from '@/types/order'

// GET /api/orders - Get all orders
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const email = searchParams.get('email')

    let orders: Order[]

    if (status) {
      const { getOrdersByStatus } = await import('@/lib/orderService')
      orders = await getOrdersByStatus(status)
    } else if (email) {
      const { getOrdersByCustomerEmail } = await import('@/lib/orderService')
      orders = await getOrdersByCustomerEmail(email)
    } else {
      orders = await getAllOrders()
    }
    
    const response: ApiResponse<Order[]> = {
      success: true,
      data: orders
    }
    
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('GET /api/orders error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch orders'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/orders - Create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.customerName || !body.customerEmail || !body.customerPhone || 
        !body.items || !body.totalAmount || !body.paymentMethod || !body.shippingAddress) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const newOrder = await createOrder(body)
    
    const response: ApiResponse<Order> = {
      success: true,
      data: newOrder,
      message: 'Order created successfully'
    }
    
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('POST /api/orders error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create order'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}
