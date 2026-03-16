"use client";

import { useState } from "react";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import ProductCard from "@/components/storefront/ProductCard";
import { SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const PRODUCTS = [
    { id: "1", slug: "midnight-botanical-silk", name: "Midnight Botanical Silk", material: "100% Mulberry Silk", price: 89, image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80", isBestSeller: true },
    { id: "2", slug: "heritage-wool-wrap", name: "Heritage Wool Wrap", material: "Merino Wool Blend", price: 120, originalPrice: 150, image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=600&q=80", isOnSale: true },
    { id: "3", slug: "cloud-touch-cashmere", name: "Cloud Touch Cashmere", material: "Premium Inner Mongolian Cashmere", price: 245, image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=600&q=80", isNew: true },
    { id: "4", slug: "geometric-expression", name: "Geometric Expression", material: "Italian Silk Twill", price: 95, image: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?auto=format&fit=crop&w=600&q=80" },
    { id: "5", slug: "earthy-check-merino", name: "Earthy Check Merino", material: "Sustainable Wool", price: 65, image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80" },
    { id: "6", slug: "highland-plaid", name: "Highland Plaid", material: "Brushed Wool", price: 78, image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=600&q=80", isNew: true },
];

const MATERIALS = ["Silk Collection", "Wool Blend", "Cashmere Luxe", "Linen Breeze"];
const COLORS = ["#2d6a4f", "#c9a84c", "#1a3a5c", "#c94c4c", "#4c4cc9", "#e8e8e8"];

export default function ShopPage() {
    const [selectedMaterials, setSelectedMaterials] = useState<string[]>(["Cashmere Luxe"]);
    const [selectedColor, setSelectedColor] = useState("#2d6a4f");
    const [currentPage, setCurrentPage] = useState(1);

    const toggleMaterial = (m: string) => {
        setSelectedMaterials((prev) =>
            prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]
        );
    };

    return (
        <div className="min-h-screen bg-[#0d0f14] text-white">
            <Navbar />

            <main className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex gap-8">

                        {/* ===== SIDEBAR ===== */}
                        <aside className="hidden lg:block w-[200px] shrink-0 pt-8">
                            {/* Filters heading */}
                            <div className="flex items-center gap-2 mb-6">
                                <SlidersHorizontal size={14} className="text-white/60" strokeWidth={2} />
                                <span className="text-[11px] font-black tracking-[0.2em] uppercase text-white">
                                    Filters
                                </span>
                            </div>

                            {/* Material */}
                            <div className="mb-7">
                                <p className="text-[9px] font-black tracking-[0.2em] uppercase text-white/40 mb-3">
                                    Material
                                </p>
                                <div className="space-y-2.5">
                                    {MATERIALS.map((m) => (
                                        <label key={m} className="flex items-center gap-2.5 cursor-pointer group">
                                            <div
                                                onClick={() => toggleMaterial(m)}
                                                className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors cursor-pointer ${
                                                    selectedMaterials.includes(m)
                                                        ? "bg-[#c9a84c] border-[#c9a84c]"
                                                        : "border-white/20 bg-transparent"
                                                }`}
                                            >
                                                {selectedMaterials.includes(m) && (
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                        <path d="M1 4L3.5 6.5L9 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
                                                    </svg>
                                                )}
                                            </div>
                                            <span className="text-xs text-white/55 group-hover:text-white transition-colors">
                                                {m}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Color */}
                            <div className="mb-7">
                                <p className="text-[9px] font-black tracking-[0.2em] uppercase text-white/40 mb-3">
                                    Color
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {COLORS.map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => setSelectedColor(c)}
                                            className={`w-6 h-6 rounded-full transition-all ${
                                                selectedColor === c
                                                    ? "ring-2 ring-white ring-offset-2 ring-offset-[#0d0f14] scale-110"
                                                    : "hover:scale-105"
                                            }`}
                                            style={{ backgroundColor: c }}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div className="mb-8">
                                <p className="text-[9px] font-black tracking-[0.2em] uppercase text-white/40 mb-3">
                                    Price Range
                                </p>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-[10px] bg-[#12172a] border border-[#2a3040] px-2 py-1 rounded text-white/60">$20</span>
                                    <span className="text-[10px] bg-[#12172a] border border-[#2a3040] px-2 py-1 rounded text-white/60">$500+</span>
                                </div>
                                <input
                                    type="range"
                                    min={20}
                                    max={500}
                                    defaultValue={300}
                                    className="w-full accent-[#c9a84c] cursor-pointer"
                                />
                            </div>

                            {/* Clear Filters */}
                            <button
                                onClick={() => { setSelectedMaterials([]); setSelectedColor(""); }}
                                className="w-full border border-white/20 text-white/60 text-[10px] font-bold tracking-[0.15em] uppercase py-2.5 rounded hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors"
                            >
                                Clear All Filters
                            </button>
                        </aside>

                        {/* ===== MAIN CONTENT ===== */}
                        <div className="flex-1 pt-8">
                            {/* Top bar */}
                            <div className="flex items-center justify-between mb-8">
                                <p className="text-xs text-white/40">
                                    Showing{" "}
                                    <span className="text-white font-bold">24</span>{" "}
                                    exclusive styles
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-[10px] text-white/40 uppercase tracking-wider">Sort by:</span>
                                    <button className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-[#c9a84c] transition-colors">
                                        Featured <ChevronDown size={13} />
                                    </button>
                                </div>
                            </div>

                            {/* Product Grid — 3 columns */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
                                {PRODUCTS.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        id={product.id}
                                        slug={product.slug}
                                        name={product.name}
                                        material={product.material}
                                        price={product.price}
                                        originalPrice={(product as any).originalPrice}
                                        image={product.image}
                                        isNew={product.isNew}
                                        isOnSale={product.isOnSale}
                                        isBestSeller={(product as any).isBestSeller}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-center gap-1.5 mt-14">
                                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2a3040] text-white/40 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                                    <ChevronLeft size={14} />
                                </button>
                                {[1, 2, 3].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setCurrentPage(p)}
                                        className={`w-8 h-8 flex items-center justify-center rounded text-xs font-bold transition-colors ${
                                            currentPage === p
                                                ? "bg-[#c9a84c] text-black"
                                                : "border border-[#2a3040] text-white/40 hover:border-[#c9a84c] hover:text-[#c9a84c]"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <span className="text-white/30 text-xs px-1">...</span>
                                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2a3040] text-white/40 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors text-xs font-bold">
                                    12
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded border border-[#2a3040] text-white/40 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                                    <ChevronRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}