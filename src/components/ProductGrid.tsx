'use client'

import { useState, useMemo } from 'react'
import { Product, GridColumns, SortOption } from '@/types/product'
import ProductCard from './ProductCard'
import CategoryControls from './CategoryControls'

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [gridColumns, setGridColumns] = useState<GridColumns>(4)
  const [sortBy, setSortBy] = useState<SortOption>('featured')

  const sortedProducts = useMemo(() => {
    const sorted = [...products]
    
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price)
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price)
      default:
        return sorted
    }
  }, [products, sortBy])

  const gridClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
  }[gridColumns]

  return (
    <div className="bg-white">
      <CategoryControls
        gridColumns={gridColumns}
        setGridColumns={setGridColumns}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className={`grid ${gridClass} gap-8`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
