'use client'

import { Product } from '@/types/product'
import Image from 'next/image'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isSoldOut = product.stock === 0
  const cardRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = cardRef.current
    const image = imageRef.current
    const overlay = overlayRef.current
    const actions = actionsRef.current

    if (!card || !image || !overlay || !actions) return

    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.15,
        duration: 0.6,
        ease: 'power2.out'
      })
      
      gsap.to(overlay, {
        opacity: 1,
        duration: 0.3
      })

      gsap.to(actions.children, {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.08,
        ease: 'back.out(1.7)'
      })
    }

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        duration: 0.6,
        ease: 'power2.out'
      })
      
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.3
      })

      gsap.to(actions.children, {
        y: 20,
        opacity: 0,
        duration: 0.3
      })
    }

    card.addEventListener('mouseenter', handleMouseEnter)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div 
      ref={cardRef}
      className="group bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer border border-gray-100 hover:border-[#D4AF37]/30"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <div ref={imageRef} className="w-full h-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Overlay with Quick Actions */}
        <div 
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity"
        >
          <div ref={actionsRef} className="absolute bottom-4 left-4 right-4 flex gap-2">
            <button className="flex-1 bg-white text-[#2C1810] py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg opacity-0 translate-y-5">
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button className="bg-white text-[#2C1810] p-3 rounded-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-lg opacity-0 translate-y-5">
              <Heart className="w-5 h-5" />
            </button>
            <button className="bg-white text-[#2C1810] p-3 rounded-lg hover:bg-[#D4AF37] hover:text-white transition-all duration-300 shadow-lg opacity-0 translate-y-5">
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Discount Badge */}
        {product.discount && !isSoldOut && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-[#D4AF37] to-[#C4A137] text-white px-3 py-1.5 text-xs font-bold tracking-wider uppercase shadow-lg rounded-lg backdrop-blur-sm">
            {product.discount}% OFF
          </div>
        )}

        {/* New Badge */}
        {product.isNew && !isSoldOut && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-[#2C1810] to-[#3D2318] text-white px-3 py-1.5 text-xs font-bold tracking-wider uppercase rounded-lg shadow-lg backdrop-blur-sm">
            NEW
          </div>
        )}

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-gray-600 text-white px-8 py-3 text-sm font-semibold tracking-widest uppercase rounded-lg shadow-xl">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3 bg-white">
        <p className="text-xs text-[#D4AF37] font-semibold tracking-widest uppercase">
          {product.category}
        </p>
        
        <h3 className="text-base font-medium text-[#2C1810] tracking-wide line-clamp-2 min-h-[3rem] leading-relaxed group-hover:text-[#D4AF37] transition-colors">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-3 pt-2">
          <span className="text-xl font-bold text-[#2C1810]">
            PKR {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Indicator */}
        {!isSoldOut && product.stock && product.stock < 10 && (
          <div className="flex items-center gap-2 text-xs text-orange-600 bg-orange-50 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-orange-600 rounded-full animate-pulse"></div>
            Only {product.stock} left in stock
          </div>
        )}
      </div>
    </div>
  )
}
