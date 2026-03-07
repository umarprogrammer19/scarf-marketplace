'use client'

import { Search, User, Heart, ShoppingCart } from 'lucide-react'
import { useState, useEffect } from 'react'
import { categories } from '@/data/products'

export default function Navbar() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`bg-white border-b border-yellow-700/30 transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img 
              src="/my_image.jpeg" 
              alt="Elegance Scarves Logo" 
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>

          {/* Categories - Hidden on mobile */}
          <div className="hidden lg:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 flex-1 px-8">
            {categories.map((category) => (
              <button
                key={category}
                className="text-sm text-gray-700 hover:text-yellow-700 transition-colors whitespace-nowrap font-medium cursor-pointer"
              >
                {category}
              </button>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button className="text-gray-700 hover:text-yellow-700 transition-colors cursor-pointer">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-700 hover:text-yellow-700 transition-colors cursor-pointer">
              <User className="w-5 h-5" />
            </button>
            <button className="relative text-gray-700 hover:text-yellow-700 transition-colors cursor-pointer">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-yellow-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                3
              </span>
            </button>
            <button className="relative text-gray-700 hover:text-yellow-700 transition-colors cursor-pointer">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-yellow-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="lg:hidden pb-4 flex flex-wrap gap-2">
          {categories.slice(0, 4).map((category) => (
            <button
              key={category}
              className="text-xs text-gray-700 hover:text-yellow-700 transition-colors px-2 py-1 bg-yellow-50 rounded cursor-pointer"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
