import { Product } from '@/types/product'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const isSoldOut = product.stock === 0

  return (
    <div className="group bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Discount Badge */}
        {product.discount && !isSoldOut && (
          <div className="absolute top-3 right-3 bg-[#D4AF37] text-white px-3 py-1.5 text-xs font-semibold tracking-wider uppercase shadow-lg">
            {product.discount}% OFF
          </div>
        )}

        {/* New Badge */}
        {product.isNew && !isSoldOut && (
          <div className="absolute top-3 left-3 bg-[#2C1810] text-white px-3 py-1.5 text-xs font-semibold tracking-wider uppercase">
            NEW
          </div>
        )}

        {/* Sold Out Overlay */}
        {isSoldOut && (
          <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-gray-600 text-white px-8 py-3 text-sm font-semibold tracking-widest uppercase">
              Sold Out
            </span>
          </div>
        )}
      </div>

      <div className="p-5 space-y-3 bg-white">
        <p className="text-xs text-[#D4AF37] font-medium tracking-widest uppercase">
          {product.category}
        </p>
        
        <h3 className="text-sm font-normal text-[#2C1810] tracking-wide line-clamp-2 min-h-[2.5rem] leading-relaxed">
          {product.title}
        </h3>
        
        <div className="flex items-center gap-3 pt-1">
          <span className="text-lg font-semibold text-[#2C1810]">
            PKR {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              PKR {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
