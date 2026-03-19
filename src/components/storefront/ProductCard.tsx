"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";

interface ProductCardProps {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    isNew?: boolean;
    isOnSale?: boolean;
    isBestSeller?: boolean;
    slug: string;
    material?: string;
}

export default function ProductCard({
    id,
    name,
    price,
    originalPrice,
    image,
    isNew,
    isOnSale,
    isBestSeller,
    slug,
    material,
}: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);
    const { addItem: addToWishlist, removeItem: removeFromWishlist, isWishlisted } = useWishlistStore();
    const wishlisted = isWishlisted(Number(id));
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef<HTMLAnchorElement>(null);
    const tiltRef = useRef<HTMLDivElement>(null);

    // Scroll reveal
    useEffect(() => {
        const el = cardRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.15 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    // 3D tilt
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const el = tiltRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;
        el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        const el = tiltRef.current;
        if (!el) return;
        el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    }, []);

    return (
        <Link
            ref={cardRef}
            href={`/product/${slug}`}
            className={`group block transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
        >
            <div
                ref={tiltRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative rounded-2xl bg-[#111111] border border-white/[0.06] overflow-hidden transition-all duration-500 ease-out will-change-transform group-hover:border-primary/20 group-hover:shadow-[0_8px_40px_rgba(212,175,55,0.08)]"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#0e0e0e]">
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />

                    {/* Shine sweep on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.05)_55%,transparent_60%)] group-hover:translate-x-full" />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                        {isBestSeller && (
                            <span className="backdrop-blur-md bg-primary/90 text-black text-[9px] font-bold tracking-[0.12em] px-3 py-1 uppercase rounded-full">
                                Best Seller
                            </span>
                        )}
                        {isNew && (
                            <span className="backdrop-blur-md bg-primary/90 text-black text-[9px] font-bold tracking-[0.12em] px-3 py-1 uppercase rounded-full">
                                New
                            </span>
                        )}
                        {isOnSale && (
                            <span className="backdrop-blur-md bg-red-500/90 text-white text-[9px] font-bold tracking-[0.12em] px-3 py-1 uppercase rounded-full">
                                Sale
                            </span>
                        )}
                    </div>

                    {/* Action buttons - top right */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                if (wishlisted) {
                                    removeFromWishlist(Number(id));
                                } else {
                                    addToWishlist({
                                        id: Number(id),
                                        name,
                                        price: String(price),
                                        imageUrl: image,
                                        slug,
                                    });
                                }
                            }}
                            className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 hover:border-primary/30 transition-all duration-200"
                        >
                            <Heart
                                size={14}
                                className={`transition-colors ${wishlisted ? "fill-red-500 text-red-500" : "text-white/80"}`}
                            />
                        </button>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                addItem({
                                    id: Number(id),
                                    name,
                                    price: String(price),
                                    imageUrl: image,
                                    quantity: 1,
                                });
                            }}
                            className="p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-all duration-200"
                        >
                            <ShoppingBag size={14} className="text-white/80" />
                        </button>
                    </div>

                    {/* Quick view bar at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                        <div className="bg-primary/90 backdrop-blur-md text-black text-center py-2 rounded-lg text-[10px] font-bold tracking-[0.15em] uppercase hover:bg-primary transition-colors">
                            Quick View
                        </div>
                    </div>
                </div>

                {/* Info section */}
                <div className="p-4 space-y-2.5">
                    {/* Name + Material */}
                    <div>
                        <h3 className="text-[13px] font-semibold text-white/90 group-hover:text-primary transition-colors duration-300 line-clamp-1 tracking-wide">
                            {name}
                        </h3>
                        {material && (
                            <p className="text-[10px] text-white/30 mt-0.5 tracking-wider uppercase">{material}</p>
                        )}
                    </div>

                    {/* Price row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-base font-bold text-primary">
                                ${price.toFixed(2)}
                            </span>
                            {originalPrice && (
                                <span className="text-xs text-white/25 line-through">
                                    ${originalPrice.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {/* Rating dots / decorative */}
                        <div className="flex items-center gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-1 h-1 rounded-full ${i < 4 ? "bg-primary/60" : "bg-white/10"}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom glow line */}
                <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-500" />
            </div>
        </Link>
    );
}
