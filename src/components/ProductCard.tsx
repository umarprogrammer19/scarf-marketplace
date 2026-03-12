'use client'

import { Product } from '@/types/product'
import Image from 'next/image'
import { ShoppingCart, Heart, Eye } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface ProductCardProps {
  product: Product
  onQuickBuy?: (product: Product) => void
  index?: number
}

// Lifestyle images for hover effect (mapped by category)
const lifestyleImages: Record<string, string> = {
  'Silk Collection': 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=1000&fit=crop&q=80',
  'Velvet Collection': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80',
  'Summer Collection': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop&q=80',
  'Winter Collection': 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=1000&fit=crop&q=80',
  'Sari Collection': 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=1000&fit=crop&q=80',
  'Karandi Collection': 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=1000&fit=crop&q=80',
  'Khaddar Collection': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80',
  'Printed Lawn Collection': 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=800&h=1000&fit=crop&q=80',
  'Organza': 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=1000&fit=crop&q=80',
  'Festive': 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop&q=80',
  'Crimps': 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=800&h=1000&fit=crop&q=80',
  'Accessories': 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=1000&fit=crop&q=80',
  'Jersey': 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=1000&fit=crop&q=80',
}

export default function ProductCard({ product, onQuickBuy, index = 0 }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const frontImageRef = useRef<HTMLImageElement>(null)
  const backImageRef = useRef<HTMLImageElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const quickAddButtonRef = useRef<HTMLButtonElement>(null)
  const actionButtonsRef = useRef<HTMLDivElement>(null)
  const borderGlowRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseEnter = () => {
      setIsHovered(true)

      const tl = gsap.timeline()

      // Subtle gold border glow appears
      tl.to(borderGlowRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      })

      // Image container subtle scale
      tl.to(imageContainerRef.current, {
        scale: 1.02,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')

      // Front image fades out, back (lifestyle) image fades in
      tl.to(frontImageRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      }, '-=0.4')

      tl.to(backImageRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      }, '-=0.3')

      // Overlay fades in
      tl.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.3')

      // Quick Add button slides up from bottom
      tl.to(quickAddButtonRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      }, '-=0.2')

      // Action buttons (Quick View, Wishlist) slide up with stagger
      tl.to(actionButtonsRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.4)',
      }, '-=0.3')

      // Card shadow elevation
      tl.to(card, {
        boxShadow: '0 24px 48px rgba(184, 134, 11, 0.15), 0 8px 16px rgba(0, 0, 0, 0.08)',
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.5')
    }

    const handleMouseLeave = () => {
      setIsHovered(false)

      const tl = gsap.timeline()

      // Card shadow resets
      tl.to(card, {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
        duration: 0.4,
        ease: 'power2.out',
      })

      // Gold border glow fades
      tl.to(borderGlowRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.3')

      // Image container scale resets
      tl.to(imageContainerRef.current, {
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')

      // Front image fades back in
      tl.to(frontImageRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: 'power2.inOut',
      }, '-=0.4')

      // Back (lifestyle) image fades out
      tl.to(backImageRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.inOut',
      }, '-=0.3')

      // Overlay fades out
      tl.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      }, '-=0.3')

      // Quick Add button slides down
      tl.to(quickAddButtonRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.4,
        ease: 'power2.in',
      }, '-=0.2')

      // Action buttons slide down
      tl.to(actionButtonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      }, '-=0.2')
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  // Magnetic effect for Quick Add button
  const handleQuickAddMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isHovered) return

    const button = e.currentTarget
    const rect = button.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(button, {
      x: x * 0.15,
      y: y * 0.15,
      duration: 0.3,
      overwrite: 'auto',
    })
  }

  const handleQuickAddMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    })
  }

  // Get lifestyle image for this category
  const lifestyleImage = lifestyleImages[product.category] || product.image

  return (
    <div
      ref={cardRef}
      className="group relative bg-white overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      {/* Gold Border Glow Effect */}
      <div
        ref={borderGlowRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          opacity: 0,
          border: '1.5px solid transparent',
          boxShadow: 'inset 0 0 0 1.5px rgba(184, 134, 11, 0)',
        }}
      />

      {/* Image Container */}
      <div
        ref={imageContainerRef}
        className="relative aspect-[3/4] overflow-hidden bg-[#F5F2EB]"
      >
        {/* Front Image (Product Shot) */}
        <Image
          ref={frontImageRef}
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-700"
          priority={index < 4}
        />

        {/* Back Image (Lifestyle/Draped Shot) - Hidden by default */}
        <Image
          ref={backImageRef}
          src={lifestyleImage}
          alt={`${product.title} - Lifestyle`}
          fill
          className="object-cover opacity-0"
        />

        {/* Texture Overlay - Shows fabric grain on hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C5A059' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Overlay with Actions */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/40 to-transparent opacity-0 z-10"
        >
          <div className="absolute bottom-0 left-0 right-0 p-5 space-y-4">
            {/* Quick Add Button - Slides up from bottom */}
            <button
              ref={quickAddButtonRef}
              onMouseMove={handleQuickAddMouseMove}
              onMouseLeave={handleQuickAddMouseLeave}
              onClick={() => onQuickBuy?.(product)}
              className="w-full bg-[#B8860B] hover:bg-[#D4AF37] text-white py-4 font-medium tracking-wide text-sm transition-all duration-300 flex items-center justify-center gap-2"
              style={{
                transform: 'translateY(60px)',
                opacity: 0,
              }}
            >
              <ShoppingCart size={18} strokeWidth={1.5} />
              <span>QUICK ADD TO CART</span>
            </button>

            {/* Quick View & Wishlist Buttons */}
            <div
              ref={actionButtonsRef}
              className="flex gap-3"
              style={{
                transform: 'translateY(30px)',
                opacity: 0,
              }}
            >
              <button
                onClick={() => onQuickBuy?.(product)}
                className="flex-1 bg-white/15 hover:bg-white/25 text-white py-3 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md border border-white/20"
              >
                <Eye size={16} strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-wider">Quick View</span>
              </button>
              <button className="flex-1 bg-white/15 hover:bg-white/25 text-white py-3 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md border border-white/20">
                <Heart size={16} strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-wider">Wishlist</span>
              </button>
            </div>
          </div>
        </div>

        {/* Badges */}
        {product.isNew && (
          <div className="absolute top-4 left-4 bg-[#1A1A1A] text-[#D4AF37] px-4 py-2 text-xs font-semibold tracking-widest uppercase z-10">
            New Arrival
          </div>
        )}

        {product.discount && (
          <div className="absolute top-4 right-4 bg-[#B8860B] text-white px-4 py-2 text-xs font-semibold tracking-widest uppercase z-10">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3 bg-white">
        {/* Category - Elegant uppercase tracking */}
        <p className="text-xs text-[#B8860B] font-medium tracking-[0.15em] uppercase">
          {product.category}
        </p>

        {/* Title - Serif font for luxury feel */}
        <h3 className="text-base font-serif font-semibold text-[#1A1A1A] line-clamp-2 group-hover:text-[#B8860B] transition-colors duration-300 leading-snug">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-3 pt-1">
          <span className="text-lg font-serif font-bold text-[#1A1A1A]">
            PKR {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through font-medium">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="flex items-center gap-2 text-xs text-[#B8860B] bg-[#F9F7F2] px-3 py-2">
            <div className="w-2 h-2 bg-[#B8860B] rounded-full animate-pulse"></div>
            <span>Only {product.stock} left in stock</span>
          </div>
        )}

        {product.stock === 0 && (
          <div className="text-xs text-gray-500 bg-[#F5F2EB] px-3 py-2 font-medium">
            Out of Stock
          </div>
        )}
      </div>
    </div>
  )
}
