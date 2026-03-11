import { NextRequest, NextResponse } from 'next/server'
import { getAllProducts, createProduct } from '@/lib/dbService'
import { ApiResponse } from '@/types/api'
import { Product } from '@/types/product'

// GET /api/products - Get all products
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const inStock = searchParams.get('inStock')

    let products: Product[]

    if (category) {
      const { getProductsByCategory } = await import('@/lib/dbService')
      products = await getProductsByCategory(category)
    } else if (inStock === 'true') {
      const { getInStockProducts } = await import('@/lib/dbService')
      products = await getInStockProducts()
    } else {
      products = await getAllProducts()
    }
    
    const response: ApiResponse<Product[]> = {
      success: true,
      data: products
    }
    
    return NextResponse.json(response, { status: 200 })
  } catch (error) {
    console.error('GET /api/products error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to fetch products'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}

// POST /api/products - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.title || !body.price || !body.image || !body.category || body.stock === undefined) {
      const response: ApiResponse = {
        success: false,
        error: 'Missing required fields: title, price, image, category, stock'
      }
      return NextResponse.json(response, { status: 400 })
    }
    
    const newProduct = await createProduct(body)
    
    const response: ApiResponse<Product> = {
      success: true,
      data: newProduct,
      message: 'Product created successfully'
    }
    
    return NextResponse.json(response, { status: 201 })
  } catch (error) {
    console.error('POST /api/products error:', error)
    const response: ApiResponse = {
      success: false,
      error: 'Failed to create product'
    }
    
    return NextResponse.json(response, { status: 500 })
  }
}
