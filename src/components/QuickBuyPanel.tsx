'use client'

import { Product } from '@/types/product'
import Image from 'next/image'
import { X, ShoppingCart, Heart } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface QuickBuyPanelProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickBuyPanel({ product, isOpen, onClose }: QuickBuyPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const ctx = gsap.context(() => {
      // Overlay fade in
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })

      // Panel slide in from right
      gsap.to(contentRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
      })
    }, panelRef)

    return () => ctx.revert()
  }, [isOpen])

  const handleClose = () => {
    const ctx = gsap.context(() => {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.2,
      })

      gsap.to(contentRef.current, {
        x: 400,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: onClose,
      })
    }, panelRef)
  }

  if (!product) return null

  return (
    <div ref={panelRef} className={isOpen ? 'fixed inset-0 z-50' : 'hidden'}>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 opacity-0 cursor-pointer"
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        ref={contentRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col opacity-0 translate-x-full"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#F9F7F2]">
          <h2 className="text-xl font-serif font-bold text-[#1A1A1A]">Quick Buy</h2>
          <button
            onClick={handleClose}
            className="text-[#1A1A1A] hover:text-[#B8860B] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Product Image */}
          <div className="relative aspect-[3/4] overflow-hidden bg-[#F9F7F2] rounded-lg">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
            />
            {product.discount && (
              <div className="absolute top-4 right-4 bg-[#B8860B] text-white px-3 py-1 text-xs font-semibold">
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-4">
            {/* Category */}
            <p className="text-xs text-[#B8860B] font-semibold tracking-widest uppercase">
              {product.category}
            </p>

            {/* Title */}
            <h3 className="text-lg font-serif font-bold text-[#1A1A1A]">
              {product.title}
            </h3>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-2xl font-serif font-bold text-[#1A1A1A]">
                PKR {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#1A1A1A]/40 line-through">
                  PKR {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className="text-sm text-[#1A1A1A]/70">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            {/* Description */}
            <p className="text-sm text-[#1A1A1A]/60 leading-relaxed">
              Premium {product.category.toLowerCase()} scarf crafted with the finest materials. Perfect for any occasion, this piece combines elegance with comfort.
            </p>

            {/* Size Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
                Size
              </label>
              <div className="flex gap-2">
                {['One Size', 'Small', 'Medium', 'Large'].map((size) => (
                  <button
                    key={size}
                    className="flex-1 py-2 border border-[#1A1A1A]/20 text-xs font-semibold text-[#1A1A1A] hover:bg-[#F9F7F2] transition-colors"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
                Color
              </label>
              <div className="flex gap-2">
                {['Black', 'Cream', 'Gold', 'Navy'].map((color) => (
                  <button
                    key={color}
                    className="w-10 h-10 rounded-full border-2 border-[#1A1A1A]/20 hover:border-[#B8860B] transition-colors"
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#1A1A1A] uppercase tracking-wide">
                Quantity
              </label>
              <div className="flex items-center border border-[#1A1A1A]/20">
                <button className="flex-1 py-2 text-center hover:bg-[#F9F7F2] transition-colors">−</button>
                <span className="flex-1 text-center font-semibold">1</span>
                <button className="flex-1 py-2 text-center hover:bg-[#F9F7F2] transition-colors">+</button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#F9F7F2] p-6 space-y-3">
          <button
            disabled={product.stock === 0}
            className="w-full bg-[#B8860B] hover:bg-[#1A1A1A] text-white py-4 font-semibold tracking-wide uppercase text-sm transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
          <button className="w-full border-2 border-[#B8860B] text-[#B8860B] hover:bg-[#F9F7F2] py-3 font-semibold tracking-wide uppercase text-sm transition-all duration-300 flex items-center justify-center gap-2">
            <Heart size={18} />
            Add to Wishlist
          </button>
        </div>
      </div>
    </div>
  )
}
