export interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  stock: number
  isNew?: boolean
}

export type SortOption = 'featured' | 'price-low' | 'price-high'
export type GridColumns = 2 | 3 | 4 | 5
