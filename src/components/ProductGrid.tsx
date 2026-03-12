'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { Product, GridColumns, SortOption } from '@/types/product'
import ProductCard from './ProductCard'
import CategoryControls from './CategoryControls'
import QuickBuyPanel from './QuickBuyPanel'
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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isQuickBuyOpen, setIsQuickBuyOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

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
      // Section background
      gsap.set(sectionRef.current, {
        backgroundColor: '#FDFBF8',
      })

      const headerEl = headerRef.current
      if (!headerEl) return

      // Animate section header with elegant reveal
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      const subtitleEl = headerEl.querySelector('.section-subtitle')
      const titleEl = headerEl.querySelector('.section-title')
      const descriptionEl = headerEl.querySelector('.section-description')
      const dividerEl = headerEl.querySelector('.section-divider')

      headerTl
        .from(subtitleEl, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
        .from(titleEl, {
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power4.out',
        }, '-=0.6')
        .from(descriptionEl, {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, '-=0.7')
        .from(dividerEl, {
          scaleX: 0,
          duration: 1.2,
          ease: 'power4.out',
        }, '-=0.6')

      // Cascade animation for product cards
      const cards = Array.from(gridRef.current?.children || [])
      
      // Stagger from 'center' for a beautiful cascade effect
      gsap.fromTo(cards,
        {
          y: 100,
          opacity: 0,
          scale: 0.92,
          rotationX: 5,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          stagger: {
            amount: 1.2,
            from: 'center',
            grid: 'auto',
          },
          ease: 'power4.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      )

      // Subtle continuous float animation for cards (parallax-like)
      cards.forEach((card, index) => {
        gsap.to(card, {
          y: -6,
          duration: 2.5 + (index % 3) * 0.3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: index * 0.1,
        })
      })

      // Parallax effect on scroll for the entire grid
      gsap.to(gridRef.current, {
        yPercent: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [sortedProducts])

  return (
    <section ref={sectionRef} className="product-grid-section py-20">
      {/* Section Header */}
      <div className="max-w-[1400px] mx-auto px-6 pb-16">
        <div ref={headerRef} className="text-center max-w-3xl mx-auto">
          {/* Subtitle */}
          <p className="section-subtitle text-sm text-[#B8860B] font-medium tracking-[0.2em] uppercase mb-4">
            Curated Excellence
          </p>

          {/* Title */}
          <h2 className="section-title font-serif text-4xl md:text-6xl font-bold text-[#1A1A1A] mb-6 leading-tight">
            Our Exquisite <span className="italic text-[#B8860B]">Collection</span>
          </h2>

          {/* Description */}
          <p className="section-description text-gray-600 text-lg md:text-xl font-light leading-relaxed">
            Discover our handpicked selection of premium scarves, each piece crafted 
            with meticulous attention to detail and timeless elegance.
          </p>

          {/* Decorative Divider */}
          <div className="section-divider w-24 h-0.5 bg-gradient-to-r from-transparent via-[#B8860B] to-transparent mx-auto mt-8" />
        </div>
      </div>

      {/* Category Controls */}
      <CategoryControls
        gridColumns={gridColumns}
        setGridColumns={setGridColumns}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Product Grid */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div 
          ref={gridRef} 
          className={`grid ${gridClass} gap-6 md:gap-8`}
        >
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              onQuickBuy={(product) => {
                setSelectedProduct(product)
                setIsQuickBuyOpen(true)
              }}
            />
          ))}
        </div>
      </div>

      {/* Quick Buy Panel */}
      <QuickBuyPanel
        product={selectedProduct}
        isOpen={isQuickBuyOpen}
        onClose={() => setIsQuickBuyOpen(false)}
      />
    </section>
  )
}
