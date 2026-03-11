import { sql } from './db'
import { Product } from '@/types/product'
import { ProductCreateInput, ProductUpdateInput } from '@/types/api'

// Helper to convert DB row to Product type
function mapRowToProduct(row: any): Product {
  return {
    id: row.id.toString(),
    title: row.title,
    price: row.price,
    originalPrice: row.original_price,
    discount: row.discount,
    image: row.image,
    category: row.category,
    stock: row.stock,
    isNew: row.is_new
  }
}

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  try {
    const rows = await sql`
      SELECT * FROM products 
      ORDER BY created_at DESC
    `
    return rows.map(mapRowToProduct)
  } catch (error) {
    console.error('Error fetching products:', error)
    throw new Error('Failed to fetch products')
  }
}

// Get product by ID
export async function getProductById(id: string): Promise<Product | null> {
  try {
    const rows = await sql`
      SELECT * FROM products 
      WHERE id = ${parseInt(id)}
    `
    
    if (rows.length === 0) {
      return null
    }
    
    return mapRowToProduct(rows[0])
  } catch (error) {
    console.error('Error fetching product:', error)
    throw new Error('Failed to fetch product')
  }
}


// Create new product
export async function createProduct(input: ProductCreateInput): Promise<Product> {
  try {
    const rows = await sql`
      INSERT INTO products (
        title, 
        price, 
        original_price, 
        discount, 
        image, 
        category, 
        stock, 
        is_new
      )
      VALUES (
        ${input.title},
        ${input.price},
        ${input.originalPrice || null},
        ${input.discount || null},
        ${input.image},
        ${input.category},
        ${input.stock},
        ${input.isNew || false}
      )
      RETURNING *
    `
    
    return mapRowToProduct(rows[0])
  } catch (error) {
    console.error('Error creating product:', error)
    throw new Error('Failed to create product')
  }
}

// Update product
export async function updateProduct(id: string, input: ProductUpdateInput): Promise<Product | null> {
  try {
    // If no fields to update, return current product
    if (Object.keys(input).length === 0) {
      return getProductById(id)
    }

    // Build update object
    const updateFields: any = {}
    if (input.title !== undefined) updateFields.title = input.title
    if (input.price !== undefined) updateFields.price = input.price
    if (input.originalPrice !== undefined) updateFields.original_price = input.originalPrice
    if (input.discount !== undefined) updateFields.discount = input.discount
    if (input.image !== undefined) updateFields.image = input.image
    if (input.category !== undefined) updateFields.category = input.category
    if (input.stock !== undefined) updateFields.stock = input.stock
    if (input.isNew !== undefined) updateFields.is_new = input.isNew

    const productId = parseInt(id)

    // Perform update using Neon's sql template
    const rows = await sql`
      UPDATE products 
      SET 
        title = COALESCE(${updateFields.title || null}, title),
        price = COALESCE(${updateFields.price || null}, price),
        original_price = COALESCE(${updateFields.original_price !== undefined ? updateFields.original_price : null}, original_price),
        discount = COALESCE(${updateFields.discount !== undefined ? updateFields.discount : null}, discount),
        image = COALESCE(${updateFields.image || null}, image),
        category = COALESCE(${updateFields.category || null}, category),
        stock = COALESCE(${updateFields.stock !== undefined ? updateFields.stock : null}, stock),
        is_new = COALESCE(${updateFields.is_new !== undefined ? updateFields.is_new : null}, is_new),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ${productId}
      RETURNING *
    `
    
    if (rows.length === 0) {
      return null
    }
    
    return mapRowToProduct(rows[0])
  } catch (error) {
    console.error('Error updating product:', error)
    throw new Error('Failed to update product')
  }
}

// Delete product
export async function deleteProduct(id: string): Promise<boolean> {
  try {
    const rows = await sql`
      DELETE FROM products 
      WHERE id = ${parseInt(id)}
      RETURNING id
    `
    
    return rows.length > 0
  } catch (error) {
    console.error('Error deleting product:', error)
    throw new Error('Failed to delete product')
  }
}

// Get products by category
export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const rows = await sql`
      SELECT * FROM products 
      WHERE category = ${category}
      ORDER BY created_at DESC
    `
    return rows.map(mapRowToProduct)
  } catch (error) {
    console.error('Error fetching products by category:', error)
    throw new Error('Failed to fetch products by category')
  }
}

// Get in-stock products
export async function getInStockProducts(): Promise<Product[]> {
  try {
    const rows = await sql`
      SELECT * FROM products 
      WHERE stock > 0
      ORDER BY created_at DESC
    `
    return rows.map(mapRowToProduct)
  } catch (error) {
    console.error('Error fetching in-stock products:', error)
    throw new Error('Failed to fetch in-stock products')
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const searchTerm = `%${query}%`
    const rows = await sql`
      SELECT * FROM products 
      WHERE title ILIKE ${searchTerm} 
         OR category ILIKE ${searchTerm}
      ORDER BY created_at DESC
    `
    return rows.map(mapRowToProduct)
  } catch (error) {
    console.error('Error searching products:', error)
    throw new Error('Failed to search products')
  }
}
