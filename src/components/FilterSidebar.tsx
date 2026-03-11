'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronDown, ChevronUp, X } from 'lucide-react'
import { gsap } from 'gsap'

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function FilterSidebar({ isOpen, onClose }: FilterSidebarProps) {
  const [priceOpen, setPriceOpen] = useState(true)
  const [categoryOpen, setCategoryOpen] = useState(true)
  const [sizeOpen, setSizeOpen] = useState(true)
  const sidebarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && sidebarRef.current) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -300, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, ease: 'power3.out' }
      )
    }
  }, [isOpen])

  if (!isOpen) return null

  const categories = [
    'All Products',
    'Silk Collection',
    'Velvet Collection',
    'Sari Collection',
    'Winter Collection',
    'Summer Collection',
    'Karandi Collection',
    'Khaddar Collection',
    'Printed Lawn Collection'
  ]

  const priceRanges = [
    'Under PKR 2,000',
    'PKR 2,000 - PKR 4,000',
    'PKR 4,000 - PKR 6,000',
    'PKR 6,000 - PKR 10,000',
    'Above PKR 10,000'
  ]

  const sizes = ['Small', 'Medium', 'Large', 'XL', 'XXL']

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className="fixed lg:sticky top-0 left-0 h-screen lg:h-auto w-80 bg-white shadow-xl z-50 overflow-y-auto"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#2C1810]">Filters</h2>
            <button 
              onClick={onClose}
              className="lg:hidden text-gray-500 hover:text-[#D4AF37] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <button
              onClick={() => setCategoryOpen(!categoryOpen)}
              className="flex items-center justify-between w-full mb-4 text-[#2C1810] font-semibold"
            >
              <span>Category</span>
              {categoryOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {categoryOpen && (
              <div className="space-y-3">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#D4AF37] transition-colors">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="mb-6 border-b border-gray-200 pb-6">
            <button
              onClick={() => setPriceOpen(!priceOpen)}
              className="flex items-center justify-between w-full mb-4 text-[#2C1810] font-semibold"
            >
              <span>Price Range</span>
              {priceOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {priceOpen && (
              <div className="space-y-3">
                {priceRanges.map((range) => (
                  <label key={range} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="price"
                      className="w-4 h-4 border-gray-300 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-[#D4AF37] transition-colors">
                      {range}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Size Filter */}
          <div className="mb-6">
            <button
              onClick={() => setSizeOpen(!sizeOpen)}
              className="flex items-center justify-between w-full mb-4 text-[#2C1810] font-semibold"
            >
              <span>Size</span>
              {sizeOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            {sizeOpen && (
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Clear Filters */}
          <button className="w-full bg-gray-100 text-[#2C1810] py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-white transition-all">
            Clear All Filters
          </button>
        </div>
      </div>
    </>
  )
}
