'use client'

import { Search, User, Heart, ShoppingCart } from 'lucide-react'
import { categories } from '@/data/products'
import Image from 'next/image'

export default function Navbar() {
  const firstRow = categories.slice(0, 4)
  const secondRow = categories.slice(4)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer">
            <Image 
              src="/my_image.jpeg" 
              alt="Brand Logo" 
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
              priority
            />
          </div>

          {/* Two-Row Categories - Hidden on mobile */}
          <div className="hidden lg:flex flex-col items-center gap-4 flex-1 px-12">
            <div className="flex items-center gap-8">
              {firstRow.map((category) => (
                <button
                  key={category}
                  className="text-[13px] text-[#2C1810] hover:text-[#D4AF37] transition-colors whitespace-nowrap font-normal tracking-wider uppercase cursor-pointer"
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-8">
              {secondRow.map((category) => (
                <button
                  key={category}
                  className="text-[13px] text-[#2C1810] hover:text-[#D4AF37] transition-colors whitespace-nowrap font-normal tracking-wider uppercase cursor-pointer"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <button className="text-[#2C1810] hover:text-[#D4AF37] transition-colors cursor-pointer">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-[#2C1810] hover:text-[#D4AF37] transition-colors cursor-pointer">
              <User className="w-5 h-5" />
            </button>
            <button className="relative text-[#2C1810] hover:text-[#D4AF37] transition-colors cursor-pointer">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                3
              </span>
            </button>
            <button className="relative text-[#2C1810] hover:text-[#D4AF37] transition-colors cursor-pointer">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Categories */}
        <div className="lg:hidden pb-4 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                className="text-xs text-[#2C1810] hover:text-[#D4AF37] transition-colors px-3 py-1.5 bg-gray-50 rounded whitespace-nowrap uppercase tracking-wide cursor-pointer"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
