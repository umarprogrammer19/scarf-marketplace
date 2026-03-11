import { NextRequest, NextResponse } from 'next/server'
import { searchProducts } from '@/lib/dbService'
import { ApiResponse } from '@/types/api'
import { Product } from '@/types/product'

// GET /api/products/search?q=query
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query) {
      const response: ApiResponse = {
        success: false,
        error: 'Search query is required'
      }
      return NextResponse.json(response, { status: 400 })
    }

    const products = await searchProducts(query)
    
    const response: ApiResponse<Product[]> = {
      success: true,
      data: products
    }
    
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('GET /api/products/search error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to search products'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}
