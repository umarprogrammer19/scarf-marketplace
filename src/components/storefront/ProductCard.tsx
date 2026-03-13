"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Heart, ShoppingBag } from "lucide-react";
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
    slug: string;
}

export default function ProductCard({
    name,
    price,
    image,
    isNew,
    isOnSale,
    rating = 5,
    onAddToCart,
    slug
}: ProductCardProps) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <Link href={`/product/${slug}`} className="group block cursor-pointer">
            {/* Editorial Image Container */}
            <div className="relative aspect-4/5 overflow-hidden rounded-xl bg-secondary/30 mb-5">
                <Image
                    src={imageError ? "https://images.unsplash.com/photo-1606240228302-393282496a60?auto=format&fit=crop&q=80" : image}
                    alt={name}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    onError={() => setImageError(true)}
                />

                {/* Subtle Gradient Overlay on Hover for Text Contrast */}
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Minimalist Top Badges & Actions */}
                <div className="absolute top-4 left-4 right-4 flex items-start justify-between z-10">
                    <div className="flex flex-col gap-2">
                        {isNew && (
                            <span className="bg-primary text-primary-foreground text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow-lg">
                                New
                            </span>
                        )}
                        {isOnSale && (
                            <span className="bg-destructive text-destructive-foreground text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase shadow-lg">
                                Sale
                            </span>
                        )}
                    </div>

                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setIsWishlisted(!isWishlisted);
                        }}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-background/50 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg"
                    >
                        <Heart size={18} className={isWishlisted ? "fill-current text-primary" : ""} />
                    </button>
                </div>

                {/* Sexy Slide-up 'Add to Cart' */}
                <div className="absolute bottom-0 left-0 w-full translate-y-full opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 z-10">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onAddToCart?.();
                        }}
                        className="w-full bg-primary/95 backdrop-blur-sm text-primary-foreground py-4 font-bold tracking-wider uppercase text-xs flex items-center justify-center gap-2 hover:bg-primary transition-colors"
                    >
                        <ShoppingBag size={16} />
                        Quick Add
                    </button>
                </div>
            </div>

            {/* Understated Product Info */}
            <div className="flex flex-col items-center text-center px-2">
                <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={12}
                            className={i < Math.round(rating) ? "fill-primary text-primary" : "text-muted"}
                        />
                    ))}
                </div>

                <h3 className=" text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1 mb-1">
                    {name}
                </h3>

                <div className="flex items-center gap-3">
                    <span className="text-md font-medium text-muted-foreground">
                        Rs. {Math.round(price).toLocaleString()}
                    </span>
                    {isOnSale && (
                        <span className="text-sm text-muted-foreground/50 line-through">
                            Rs. {Math.round(price * 1.2).toLocaleString()}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}