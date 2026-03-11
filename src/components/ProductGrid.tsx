'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { Product, GridColumns, SortOption } from '@/types/product'
import ProductCard from './ProductCard'
import CategoryControls from './CategoryControls'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [gridColumns, setGridColumns] = useState<GridColumns>(4)
  const [sortBy, setSortBy] = useState<SortOption>('featured')
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section header
      gsap.from(headerRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // Animate product cards
      gsap.from(gridRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: {
          amount: 0.8,
          from: 'start',
          grid: 'auto',
        },
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-white product-grid-section">
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto px-6 pt-16 pb-8">
        <div ref={headerRef} className="text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2C1810] mb-4">
            Our Collection
          </h2>
          <p className="text-gray-600 text-lg">
            Explore our carefully curated selection of premium scarves and shawls
          </p>
        </div>
      </div>

      <CategoryControls
        gridColumns={gridColumns}
        setGridColumns={setGridColumns}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      
      <div className="max-w-[1400px] mx-auto px-6 pb-20">
        <div ref={gridRef} className={`grid ${gridClass} gap-8`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
