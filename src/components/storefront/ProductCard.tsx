"use client"
import { Heart, Eye } from "lucide-react";
import { Product } from "../../data/mockData";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import QuickViewModal from "../home/QuickViewModal";
import Link from "next/link";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();
    const [showQuickView, setShowQuickView] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product);
    };

    return (
        <>
            <div className="group relative bg-card rounded-lg overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500">
                {/* Image Container */}
                <Link href={`/product/${product.id}`} className="block relative overflow-hidden aspect-3/4">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center space-x-3">
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-2 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                        >
                            Add to Cart
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setShowQuickView(true);
                            }}
                            className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300 transform translate-y-4 group-hover:translate-y-0"
                        >
                            <Eye className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.isNew && (
                            <span className="px-3 py-1 bg-gold text-black text-xs font-semibold rounded-full">
                                NEW
                            </span>
                        )}
                        {product.isFlashSale && (
                            <span className="px-3 py-1 bg-destructive text-white text-xs font-semibold rounded-full">
                                SALE
                            </span>
                        )}
                        {!product.inStock && (
                            <span className="px-3 py-1 bg-black/80 text-white text-xs font-semibold rounded-full">
                                SOLD OUT
                            </span>
                        )}
                    </div>

                    {/* Wishlist */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100">
                        <Heart className="w-5 h-5" />
                    </button>
                </Link>

                {/* Product Info */}
                <div className="p-6">
                    <Link href={`/product/${product.id}`}>
                        <p className="text-xs text-gold uppercase tracking-wider mb-2">
                            {product.category}
                        </p>
                        <h3 className="text-lg font-semibold text-white mb-2 hover:text-gold transition-colors duration-300">
                            {product.name}
                        </h3>
                    </Link>

                    <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-gold">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-sm text-white/40 line-through">
                                ${product.originalPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <QuickViewModal
                product={product}
                isOpen={showQuickView}
                onClose={() => setShowQuickView(false)}
            />
        </>
    );
}
