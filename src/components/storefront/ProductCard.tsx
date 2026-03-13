"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    image: string;
    isNew?: boolean;
    isOnSale?: boolean;
    rating?: number;
    onAddToCart?: () => void;
    slug: string
}

export default function ProductCard({
    id,
    name,
    price,
    image,
    isNew,
    isOnSale,
    rating = 4.5,
    onAddToCart,
    slug
}: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <Link href={`/product/${slug}`}>
            <div className="group cursor-pointer">
                {/* Image Container */}
                <div className="relative overflow-hidden rounded-xl bg-secondary h-64 sm:h-72 mb-4">
                    <Image
                        src={imageError ? "https://images.unsplash.com/photo-1761839259488-2bdeeae794f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" : image}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={() => setImageError(true)}
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <div className="flex gap-2">
                            {isNew && (
                                <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                                    NEW
                                </span>
                            )}
                            {isOnSale && (
                                <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                                    SALE
                                </span>
                            )}
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setIsWishlisted(!isWishlisted);
                            }}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                        >
                            <Heart
                                size={18}
                                className={isWishlisted ? "fill-current" : ""}
                            />
                        </button>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                onAddToCart?.();
                            }}
                            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform scale-75 group-hover:scale-100"
                        >
                            <ShoppingCart size={18} />
                            Add to Cart
                        </button>
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                    {/* Rating */}
                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className={
                                    i < Math.round(rating)
                                        ? "fill-primary text-primary"
                                        : "text-muted-foreground"
                                }
                            />
                        ))}
                        <span className="text-xs text-muted-foreground ml-1">({rating})</span>
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 pt-2">
                        <span className="text-lg font-bold text-primary">
                            Rs. {Math.round(price).toLocaleString()}
                        </span>
                        {isOnSale && (
                            <span className="text-sm text-muted-foreground line-through">
                                Rs. {Math.round(price * 1.2).toLocaleString()}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
