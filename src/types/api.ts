import { Product } from './product'

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface ProductCreateInput {
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  stock: number
  isNew?: boolean
}

export interface ProductUpdateInput extends Partial<ProductCreateInput> {}
