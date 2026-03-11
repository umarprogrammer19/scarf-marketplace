'use client'

import { Search, User, Heart, ShoppingCart, Menu, X } from 'lucide-react'
import { categories } from '@/data/products'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  
  const firstRow = categories.slice(0, 4)
  const secondRow = categories.slice(4)

  useEffect(() => {
    // Navbar entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      
      tl.from(logoRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.8,
      })
      .from(categoriesRef.current?.children || [], {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
      }, '-=0.4')
      .from(iconsRef.current?.children || [], {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
      }, '-=0.3')
    }, navRef)

    // Scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav 
      ref={navRef}
      className={`bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3 shadow-lg' : 'py-5'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-[#2C1810] cursor-pointer hover:text-[#D4AF37] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0 cursor-pointer">
            <Image 
              src="/my_image.jpeg" 
              alt="Brand Logo" 
              width={140}
              height={70}
              className={`w-auto object-contain hover:opacity-80 transition-all duration-300 ${
                scrolled ? 'h-12' : 'h-14'
              }`}
              priority
            />
          </div>

          {/* Two-Row Categories - Hidden on mobile */}
          <div ref={categoriesRef} className="hidden lg:flex flex-col items-center gap-3 flex-1 px-12">
            <div className="flex items-center gap-8">
              {firstRow.map((category) => (
                <button
                  key={category}
                  className="relative text-[13px] text-[#2C1810] hover:text-[#D4AF37] transition-colors whitespace-nowrap font-medium tracking-wider uppercase cursor-pointer group"
                >
                  {category}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-8">
              {secondRow.map((category) => (
                <button
                  key={category}
                  className="relative text-[13px] text-[#2C1810] hover:text-[#D4AF37] transition-colors whitespace-nowrap font-medium tracking-wider uppercase cursor-pointer group"
                >
                  {category}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </div>
          </div>

          {/* Icons */}
          <div ref={iconsRef} className="flex items-center gap-5">
            <button className="text-[#2C1810] hover:text-[#D4AF37] transition-all duration-200 cursor-pointer hover:scale-110 transform">
              <Search className="w-5 h-5" />
            </button>
            <button className="hidden sm:block text-[#2C1810] hover:text-[#D4AF37] transition-all duration-200 cursor-pointer hover:scale-110 transform">
              <User className="w-5 h-5" />
            </button>
            <button className="relative text-[#2C1810] hover:text-[#D4AF37] transition-all duration-200 cursor-pointer hover:scale-110 transform group">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                3
              </span>
            </button>
            <button className="relative text-[#2C1810] hover:text-[#D4AF37] transition-all duration-200 cursor-pointer hover:scale-110 transform group">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                2
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 pt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className="text-left text-sm text-[#2C1810] hover:text-[#D4AF37] hover:bg-gray-50 transition-colors px-4 py-3 rounded uppercase tracking-wide cursor-pointer"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
