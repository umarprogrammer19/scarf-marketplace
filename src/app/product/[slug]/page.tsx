"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import { Heart, ShoppingCart, Truck, Shield, Star, ChevronRight } from "lucide-react";

// --- Mock data (replace with your DB fetch) ---
const PRODUCT = {
    id: "1",
    name: "Classic Mulberry Silk Scarf",
    price: 120,
    badge: "New Season",
    description:
        "Experience unparalleled luxury with our 100% Mulberry Silk scarf. Hand-rolled edges and a subtle lustrous sheen define this timeless piece. Perfect for adding a touch of sophistication to any ensemble.",
    features: [
        "100% Pure Mulberry Silk (19mm)",
        "Dimensions: 90cm x 90cm",
        "Eco-friendly reactive dyes",
    ],
    colors: ["#2d6a4f", "#1a1a1a", "#c94c4c", "#1a3a5c", "#e8e8e8"],
    images: [
        "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=400&q=80",
    ],
};

const REVIEWS = [
    {
        id: 1,
        title: "Absolutely Exquisite",
        body: "The quality of this silk is far superior to other brands I've tried. The sheen is sophisticated, and the colors are even more vibrant in person.",
        author: "Eleanor M.",
        initials: "EM",
        verified: true,
        rating: 5,
        date: "2 days ago",
    },
    {
        id: 2,
        title: "Perfect Gift",
        body: "I bought this as a gift for my mother. The packaging was beautiful and the scarf feels incredibly soft. She was absolutely delighted.",
        author: "Julian H.",
        initials: "JH",
        verified: true,
        rating: 5,
        date: "1 week ago",
    },
    {
        id: 3,
        title: "Vibrant Emerald",
        body: "Lovely color. Only minor point is it slips a bit easily, but that's just the nature of high quality silk! Very happy with my purchase.",
        author: "Sarah C.",
        initials: "SC",
        verified: true,
        rating: 4,
        date: "2 weeks ago",
    },
];

export default function ProductDetailPage() {
    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);

    return (
        <div className="min-h-screen bg-[#0d0f14] text-white">
            <Navbar />

            <main className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-[11px] text-white/35 mb-8 pt-4">
                        <Link href="/" className="hover:text-[#c9a84c] transition-colors">Home</Link>
                        <ChevronRight size={12} />
                        <Link href="/shop" className="hover:text-[#c9a84c] transition-colors">Accessories</Link>
                        <ChevronRight size={12} />
                        <span className="text-white/60">Mulberry Silk Scarf</span>
                    </nav>

                    {/* ===== PRODUCT SECTION ===== */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* LEFT — Images */}
                        <div>
                            {/* Main Image */}
                            <div className="relative aspect-square rounded-xl overflow-hidden bg-[#12172a] mb-3">
                                <Image
                                    src={PRODUCT.images[selectedImage]}
                                    alt={PRODUCT.name}
                                    fill
                                    className="object-cover transition-opacity duration-300"
                                    priority
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 gap-3">
                                {PRODUCT.images.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedImage(i)}
                                        className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                                            selectedImage === i
                                                ? "border-[#c9a84c]"
                                                : "border-white/10 hover:border-white/30"
                                        }`}
                                    >
                                        <Image src={img} alt="" fill className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT — Product Info */}
                        <div className="flex flex-col justify-start pt-2">
                            {/* Badge */}
                            <div className="inline-flex mb-4 w-fit">
                                <span className="text-[10px] font-black tracking-[0.2em] uppercase bg-[#c9a84c]/15 border border-[#c9a84c]/40 text-[#c9a84c] px-3 py-1.5 rounded-full">
                                    {PRODUCT.badge}
                                </span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
                                {PRODUCT.name}
                            </h1>

                            {/* Price */}
                            <p className="text-3xl font-black text-white mb-5">
                                ${PRODUCT.price.toFixed(2)}
                            </p>

                            {/* Description */}
                            <p className="text-sm text-white/50 leading-relaxed mb-6 max-w-md">
                                {PRODUCT.description}
                            </p>

                            {/* Features */}
                            <ul className="space-y-2 mb-7">
                                {PRODUCT.features.map((f) => (
                                    <li key={f} className="flex items-center gap-2.5 text-sm text-white/60">
                                        <div className="w-4 h-4 rounded-full border border-[#c9a84c]/50 bg-[#c9a84c]/10 flex items-center justify-center shrink-0">
                                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                                                <path d="M1 3L3 5L7 1" stroke="#c9a84c" strokeWidth="1.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* Color Selector */}
                            <div className="mb-7">
                                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 mb-3">
                                    Select Color:{" "}
                                    <span className="text-[#c9a84c]">Emerald Green</span>
                                </p>
                                <div className="flex gap-2.5">
                                    {PRODUCT.colors.map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setSelectedColor(c)}
                                            className={`w-7 h-7 rounded-full transition-all ${
                                                selectedColor === c
                                                    ? "ring-2 ring-[#c9a84c] ring-offset-2 ring-offset-[#0d0f14] scale-110"
                                                    : "hover:scale-105 opacity-70 hover:opacity-100"
                                            }`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Quantity */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center border border-[#2a3040] rounded-lg overflow-hidden">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-11 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors text-lg"
                                    >
                                        −
                                    </button>
                                    <span className="w-10 text-center text-sm font-bold text-white">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-11 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-colors text-lg"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Add to Cart */}
                            <button className="w-full flex items-center justify-center gap-2 bg-[#c9a84c] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-lg hover:bg-[#e0bc6a] transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,168,76,0.35)] mb-3">
                                <ShoppingCart size={16} />
                                Add to Cart
                            </button>

                            {/* Wishlist */}
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className="w-full flex items-center justify-center gap-2 border border-white/15 text-white/60 font-bold text-xs tracking-[0.15em] uppercase py-3.5 rounded-lg hover:border-white/30 hover:text-white transition-all mb-8"
                            >
                                <Heart
                                    size={15}
                                    className={isWishlisted ? "fill-red-500 text-red-500" : ""}
                                />
                                {isWishlisted ? "Saved to Wishlist" : "Add to Wishlist"}
                            </button>

                            {/* Trust Badges */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="flex items-center gap-3 border border-white/[0.07] bg-[#12172a] rounded-xl p-4">
                                    <Truck size={18} className="text-[#c9a84c] shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-xs font-bold text-white">Free Express Shipping</p>
                                        <p className="text-[10px] text-white/35 mt-0.5">On orders over $200</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 border border-white/[0.07] bg-[#12172a] rounded-xl p-4">
                                    <Shield size={18} className="text-[#c9a84c] shrink-0" strokeWidth={1.5} />
                                    <div>
                                        <p className="text-xs font-bold text-white">Secure Checkout</p>
                                        <p className="text-[10px] text-white/35 mt-0.5">SSL Encrypted</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ===== CUSTOMER REVIEWS ===== */}
                    <div className="mt-20 pt-16 border-t border-white/[0.06]">
                        {/* Reviews Header */}
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl font-bold text-white mb-2">Customer Reviews</h2>
                                <div className="flex items-center gap-2">
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((s) => (
                                            <Star
                                                key={s}
                                                size={16}
                                                className="text-[#c9a84c] fill-[#c9a84c]"
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm text-white/40">Based on 124 reviews</span>
                                </div>
                            </div>
                            <button className="border border-[#c9a84c] text-[#c9a84c] text-xs font-bold tracking-[0.15em] uppercase px-5 py-3 rounded-lg hover:bg-[#c9a84c] hover:text-black transition-all duration-300">
                                Write a Review
                            </button>
                        </div>

                        {/* Review Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {REVIEWS.map((review) => (
                                <div
                                    key={review.id}
                                    className="bg-[#12172a] border border-white/[0.07] rounded-xl p-6"
                                >
                                    {/* Stars + date */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map((s) => (
                                                <Star
                                                    key={s}
                                                    size={12}
                                                    className={
                                                        s <= review.rating
                                                            ? "text-[#c9a84c] fill-[#c9a84c]"
                                                            : "text-white/20"
                                                    }
                                                />
                                            ))}
                                        </div>
                                        <span className="text-[10px] text-white/30">{review.date}</span>
                                    </div>

                                    {/* Title */}
                                    <h4 className="text-sm font-bold text-white mb-2">{review.title}</h4>

                                    {/* Body */}
                                    <p className="text-xs text-white/45 leading-relaxed mb-5">
                                        {review.body}
                                    </p>

                                    {/* Author */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#c9a84c]/20 border border-[#c9a84c]/30 flex items-center justify-center">
                                            <span className="text-[10px] font-black text-[#c9a84c]">
                                                {review.initials}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-white">{review.author}</p>
                                            {review.verified && (
                                                <p className="text-[10px] text-[#c9a84c]/70">Verified Buyer</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Show More */}
                        <div className="text-center mt-8">
                            <button className="text-xs font-bold tracking-[0.15em] uppercase text-[#c9a84c] hover:text-[#e0bc6a] transition-colors border-b border-[#c9a84c]/40 pb-0.5">
                                Show more reviews
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}