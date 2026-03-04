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
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    5: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
  }[gridColumns]

  return (
    <>
      <CategoryControls
        gridColumns={gridColumns}
        setGridColumns={setGridColumns}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <div className="container mx-auto px-4 pb-16">
        <div className={`grid ${gridClass} gap-4 md:gap-6`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  )
}
