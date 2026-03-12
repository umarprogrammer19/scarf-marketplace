'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { gsap } from 'gsap'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navItemsRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const cartBadgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Navbar entrance animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
      })

      // Logo animation with elegant scale
      tl.from(logoRef.current, {
        y: -40,
        opacity: 0,
        scale: 0.85,
        duration: 1,
        ease: 'power4.out',
      })

      // Nav items animation with stagger
      tl.from(
        navItemsRef.current?.children || [],
        {
          y: -25,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
        },
        '-=0.6'
      )

      // Icons animation with scale
      tl.from(
        iconsRef.current?.children || [],
        {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'back.out(1.7)',
        },
        '-=0.5'
      )

      // Cart badge pop
      tl.from(
        cartBadgeRef.current,
        {
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: 'back.out(2)',
        },
        '-=0.3'
      )
    }, navRef)

    // Scroll effect with enhanced glass-morphism
    const handleScroll = () => {
      const scrolled = window.scrollY > 80
      setIsScrolled(scrolled)

      if (navRef.current) {
        gsap.to(navRef.current, {
          backgroundColor: scrolled
            ? 'rgba(255, 255, 255, 0.95)'
            : 'rgba(255, 255, 255, 0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 0 rgba(184, 134, 11, 0.1)'
            : '0 0px 0px rgba(0, 0, 0, 0)',
          borderBottom: scrolled
            ? '1px solid rgba(184, 134, 11, 0.15)'
            : '1px solid transparent',
          duration: 0.5,
          ease: 'power2.out',
        })

        // Logo scale down on scroll
        gsap.to(logoRef.current, {
          scale: scrolled ? 0.9 : 1,
          duration: 0.5,
          ease: 'power2.out',
        })

        // Subtle height change
        gsap.to(navRef.current.querySelector('.nav-inner'), {
          height: scrolled ? 70 : 80,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      ctx.revert()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Magnetic button effect for icons
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      overwrite: 'auto',
    })
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.5)',
    })
  }

  // Nav item hover animation
  const handleNavItemMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector('.nav-underline')
    if (underline) {
      gsap.to(underline, {
        width: '100%',
        duration: 0.4,
        ease: 'power3.out',
      })
    }
  }

  const handleNavItemMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const underline = e.currentTarget.querySelector('.nav-underline')
    if (underline) {
      gsap.to(underline, {
        width: '0%',
        duration: 0.3,
        ease: 'power3.in',
      })
    }
  }

  return (
    <nav
      ref={navRef}
      className="fixed w-full top-0 z-50 transition-all duration-300"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        <div className="nav-inner h-20">
          <div className="flex justify-between items-center h-full">
            {/* Logo */}
            <div ref={logoRef} className="flex-shrink-0">
              <Link
                href="/"
                className="flex items-center gap-3 group"
              >
                <div className="relative w-10 h-10 lg:w-12 lg:h-12 overflow-hidden rounded-full bg-gradient-to-br from-[#B8860B] to-[#D4AF37] flex items-center justify-center shadow-md">
                  <span className="text-white font-serif text-lg lg:text-xl font-bold">L</span>
                </div>
                <div className="hidden sm:block">
                  <span className="text-lg lg:text-xl font-serif font-bold text-[#1A1A1A] tracking-tight">
                    LUXE SCARVES
                  </span>
                  <p className="text-[9px] text-gray-500 tracking-[0.2em] uppercase">
                    The Hijab Company
                  </p>
                </div>
              </Link>
            </div>

            {/* Navigation Items - Desktop */}
            <div
              ref={navItemsRef}
              className="hidden md:flex items-center gap-10"
            >
              <Link
                href="#collections"
                className="text-sm font-medium text-[#1A1A1A] hover:text-[#B8860B] transition-colors duration-300 relative group"
                onMouseEnter={handleNavItemMouseEnter}
                onMouseLeave={handleNavItemMouseLeave}
              >
                <span className="tracking-[0.12em] uppercase">Collections</span>
                <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8860B] transition-all duration-300" />
              </Link>
              <Link
                href="#new-arrivals"
                className="text-sm font-medium text-[#1A1A1A] hover:text-[#B8860B] transition-colors duration-300 relative group"
                onMouseEnter={handleNavItemMouseEnter}
                onMouseLeave={handleNavItemMouseLeave}
              >
                <span className="tracking-[0.12em] uppercase">New Arrivals</span>
                <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8860B] transition-all duration-300" />
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium text-[#1A1A1A] hover:text-[#B8860B] transition-colors duration-300 relative group"
                onMouseEnter={handleNavItemMouseEnter}
                onMouseLeave={handleNavItemMouseLeave}
              >
                <span className="tracking-[0.12em] uppercase">Our Story</span>
                <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8860B] transition-all duration-300" />
              </Link>
              <Link
                href="#journal"
                className="text-sm font-medium text-[#1A1A1A] hover:text-[#B8860B] transition-colors duration-300 relative group"
                onMouseEnter={handleNavItemMouseEnter}
                onMouseLeave={handleNavItemMouseLeave}
              >
                <span className="tracking-[0.12em] uppercase">Journal</span>
                <span className="nav-underline absolute bottom-0 left-0 w-0 h-0.5 bg-[#B8860B] transition-all duration-300" />
              </Link>
            </div>

            {/* Icons */}
            <div ref={iconsRef} className="flex items-center gap-5 lg:gap-6">
              {/* Search */}
              <button
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="text-[#1A1A1A] hover:text-[#B8860B] transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={20} strokeWidth={1.5} />
              </button>

              {/* Wishlist */}
              <button
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="text-[#1A1A1A] hover:text-[#B8860B] transition-colors duration-300 relative"
                aria-label="Wishlist"
              >
                <Heart size={20} strokeWidth={1.5} />
              </button>

              {/* Cart */}
              <button
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="text-[#1A1A1A] hover:text-[#B8860B] transition-colors duration-300 relative"
                aria-label="Shopping Cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <div
                    ref={cartBadgeRef}
                    className="absolute -top-2 -right-2 bg-[#B8860B] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    {cartCount}
                  </div>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-[#1A1A1A] hover:text-[#B8860B] transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-[#B8860B]/20">
          <div className="px-6 py-8 space-y-6">
            <Link
              href="#collections"
              className="block text-sm font-medium text-[#1A1A1A] hover:text-[#B8860B] transition-colors tracking-[0.12em] uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              Collections
            </Link>
            <Link
              href="#new-arrivals"
              className="block text-sm font-medium text-[#1A1A1A] hover:text-[#B8860B] transition-colors tracking-[0.12em] uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              New Arrivals
            </Link>
            <Link
              href="#about"
              className="block text-sm font-medium text-[#1A1A1A] hover:text-[#B8860B] transition-colors tracking-[0.12em] uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="#journal"
              className="block text-sm font-medium text-[#1A1A1A] hover:text-[#B8860B] transition-colors tracking-[0.12em] uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              Journal
            </Link>
            <div className="pt-6 border-t border-gray-100">
              <button className="w-full py-3 bg-[#1A1A1A] text-white text-sm font-medium tracking-[0.12em] uppercase">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
