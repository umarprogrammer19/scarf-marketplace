import { NextRequest, NextResponse } from 'next/server'
import { getProductById, updateProduct, deleteProduct } from '@/lib/dbService'
import { ApiResponse } from '@/types/api'
import { Product } from '@/types/product'

// GET /api/products/[id] - Get single product
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const product = await getProductById(params.id)
    
    if (!product) {
      const response: ApiResponse = {
        success: false,
        error: 'Product not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<Product> = {
      success: true,
      data: product
    }
    
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('GET /api/products/[id] error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch product'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const updatedProduct = await updateProduct(params.id, body)
    
    if (!updatedProduct) {
      const response: ApiResponse = {
        success: false,
        error: 'Product not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse<Product> = {
      success: true,
      data: updatedProduct,
      message: 'Product updated successfully'
    }
    
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to update product'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deleteProduct(params.id)
    
    if (!deleted) {
      const response: ApiResponse = {
        success: false,
        error: 'Product not found'
      }
      return NextResponse.json(response, { status: 404 })
    }
    
    const response: ApiResponse = {
      success: true,
      message: 'Product deleted successfully'
    }
    
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('DELETE /api/products/[id] error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to delete product'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}
