"use client"
import { useState } from "react";
import { ShoppingCart, Heart, Package, Shield, Truck, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/storefront/ProductCard";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { Product } from "@/types";

export default function ProductClient({ product, relatedProducts }: { product: Product, relatedProducts: Product[] }) {
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="min-h-screen pt-20">
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Breadcrumb */}
                    <div className="flex items-center space-x-2 text-sm text-white/60 mb-8">
                        <Link href="/" className="hover:text-gold transition-colors">Home</Link>
                        <span>/</span>
                        <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
                        <span>/</span>
                        <span className="text-white">{product.name}</span>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-20">
                        {/* Image Gallery */}
                        <div>
                            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 border border-white/10">
                                <img src={product.images[selectedImage] || product.image} alt={product.name} className="w-full h-full object-cover" />
                                {product.isNew && <span className="absolute top-4 left-4 px-4 py-2 bg-gold text-black text-sm font-semibold rounded-full">NEW</span>}
                                {product.isFlashSale && <span className="absolute top-4 right-4 px-4 py-2 bg-destructive text-white text-sm font-semibold rounded-full">SALE</span>}
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <button key={index} onClick={() => setSelectedImage(index)} className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index ? "border-gold" : "border-white/10 hover:border-gold/50"}`}>
                                        <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <p className="text-gold text-sm uppercase tracking-wider mb-2">{product.category}</p>
                            <h1 className="text-4xl md:text-5xl text-white mb-4">{product.name}</h1>
                            <div className="flex items-center space-x-4 mb-6">
                                <span className="text-4xl font-bold text-gold">${product.price}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="text-2xl text-white/40 line-through">${product.originalPrice}</span>
                                        <span className="px-3 py-1 bg-destructive text-white text-sm font-semibold rounded-full">Save ${product.originalPrice - product.price}</span>
                                    </>
                                )}
                            </div>

                            <p className="text-white/70 text-lg leading-relaxed mb-8">{product.description}</p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <button onClick={handleAddToCart} disabled={!product.inStock} className="flex-1 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2">
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
                                </button>
                            </div>

                            {/* Accordions */}
                            <Accordion.Root type="single" collapsible className="space-y-2">
                                <Accordion.Item value="details" className="border border-white/10 rounded-lg overflow-hidden">
                                    <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/5 transition-colors">
                                        <span className="text-white font-semibold">Product Details</span>
                                        <ChevronDown className="w-5 h-5 text-gold transition-transform group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                    <Accordion.Content className="px-6 pb-4 text-white/70">
                                        <div className="space-y-2">
                                            <p><strong>Fabric:</strong> {product.fabric}</p>
                                            <p><strong>Dimensions:</strong> {product.dimensions}</p>
                                            <p><strong>Color:</strong> {product.color}</p>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                        </div>
                    </div>

                    {/* Related Products */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="text-3xl md:text-4xl text-white mb-8 text-center">You May Also Like</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProducts.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}