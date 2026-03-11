import { NextRequest, NextResponse } from 'next/server'
import { getOrderById, updateOrder, deleteOrder } from '@/lib/orderService'
import { ApiResponse } from '@/types/api'
import { Order } from '@/types/order'

// GET /api/orders/[id] - Get single order
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const order = await getOrderById(id)
    
    if (!order) {
      const response: ApiResponse = {
        success: false,
        error: 'Order not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<Order> = {
      success: true,
      data: order
    }
    
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('GET /api/orders/[id] error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch order'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

// PUT /api/orders/[id] - Update order
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    const updatedOrder = await updateOrder(id, body)
    
    if (!updatedOrder) {
      const response: ApiResponse = {
        success: false,
        error: 'Order not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<Order> = {
      success: true,
      data: updatedOrder,
      message: 'Order updated successfully'
    }
    
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('PUT /api/orders/[id] error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update order'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE /api/orders/[id] - Delete order
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const deleted = await deleteOrder(id)
    
    if (!deleted) {
      const response: ApiResponse = {
        success: false,
        error: 'Order not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse = {
      success: true,
      message: 'Order deleted successfully'
    }
    
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('DELETE /api/orders/[id] error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to delete order'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}
