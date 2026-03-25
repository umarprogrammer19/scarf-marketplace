"use client"
import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ProductCard from "@/components/storefront/ProductCard";
import { Product } from "@/types";

export default function ShopClient({ initialProducts }: { initialProducts: Product[] }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [priceRange, setPriceRange] = useState([0, 500]);
    const [selectedColor, setSelectedColor] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const itemsPerPage = 9;

    // Dynamically extract categories and colors from the REAL database products
    const categories = ["All", ...Array.from(new Set(initialProducts.map((p) => p.category)))];
    const colors = ["All", ...Array.from(new Set(initialProducts.map((p) => p.color).filter(Boolean)))];

    // Filter products
    const filteredProducts = initialProducts.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesColor = selectedColor === "All" || product.color === selectedColor;

        return matchesSearch && matchesCategory && matchesPrice && matchesColor;
    });

    // Pagination
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const displayedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-black/50">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 text-white">Luxury Collection</h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Explore our exquisite range of handcrafted scarves
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">

                    {/* Sidebar Filters - Desktop */}
                    <aside className="hidden lg:block w-80 shrink-0">
                        <div className="sticky top-24 space-y-6">
                            {/* Search */}
                            <div>
                                <label className="block text-white mb-3">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        type="text" placeholder="Search products..." value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                                    />
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div>
                                <label className="block text-white mb-3">Category</label>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category} onClick={() => setSelectedCategory(category)}
                                            className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${selectedCategory === category ? "bg-gold text-black font-semibold" : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white"}`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-white mb-3">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
                                <input
                                    type="range" min="0" max="1000" value={priceRange[1]}
                                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                                    className="w-full accent-gold"
                                />
                            </div>

                            {/* Reset Filters */}
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); setPriceRange([0, 1000]); setSelectedColor("All"); }}
                                className="w-full py-3 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-gold transition-all duration-300"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </aside>

                    {/* Products Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-white/70">Showing {displayedProducts.length} of {filteredProducts.length} products</p>
                        </div>

                        {displayedProducts.length === 0 ? (
                            <div className="text-center py-20 text-white/60">No products found matching your filters.</div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {displayedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2">
                                <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1} className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-gold hover:text-black transition-all disabled:opacity-50">Previous</button>
                                {[...Array(totalPages)].map((_, i) => (
                                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-10 h-10 rounded-lg transition-all ${currentPage === i + 1 ? "bg-gold text-black font-semibold" : "bg-white/5 text-white hover:bg-white/10"}`}>{i + 1}</button>
                                ))}
                                <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages} className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-gold hover:text-black transition-all disabled:opacity-50">Next</button>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}