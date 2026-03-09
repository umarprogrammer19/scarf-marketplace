import { Product } from '@/types/product'
import { ProductCreateInput, ProductUpdateInput } from '@/types/api'
import fs from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'products.json')

// Helper to read products from file
export function readProducts(): Product[] {
  try {
    if (!fs.existsSync(DATA_FILE)) {
      return []
    }
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading products:', error)
    return []
  }
}

// Helper to write products to file
export function writeProducts(products: Product[]): void {
  try {
    const dir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8')
  } catch (error) {
    console.error('Error writing products:', error)
    throw new Error('Failed to save products')
  }
}

// Get all products
export function getAllProducts(): Product[] {
  return readProducts()
}

// Get product by ID
export function getProductById(id: string): Product | null {
  const products = readProducts()
  return products.find(p => p.id === id) || null
}

// Create new product
export function createProduct(input: ProductCreateInput): Product {
  const products = readProducts()
  
  const newProduct: Product = {
    id: generateId(),
    title: input.title,
    price: input.price,
    originalPrice: input.originalPrice,
    discount: input.discount,
    image: input.image,
    category: input.category,
    stock: input.stock,
    isNew: input.isNew || false
  }
  
  products.push(newProduct)
  writeProducts(products)
  
  return newProduct
}

// Update product
export function updateProduct(id: string, input: ProductUpdateInput): Product | null {
  const products = readProducts()
  const index = products.findIndex(p => p.id === id)
  
  if (index === -1) {
    return null
  }
  
  products[index] = {
    ...products[index],
    ...input
  }
  
  writeProducts(products)
  return products[index]
}

// Delete product
export function deleteProduct(id: string): boolean {
  const products = readProducts()
  const filteredProducts = products.filter(p => p.id !== id)
  
  if (filteredProducts.length === products.length) {
    return false
  }
  
  writeProducts(filteredProducts)
  return true
}

// Generate unique ID
function generateId(): string {
  return `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}
