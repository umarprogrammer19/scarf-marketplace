"use client"
import { useState } from "react";
import { products } from "../../../data/mockData";
import { ShoppingCart, Heart, Package, Shield, Truck, ChevronDown } from "lucide-react";
import { useCart } from "../../../context/CartContext";
import ProductCard from "../../../components/storefront/ProductCard";
import * as Accordion from "@radix-ui/react-accordion";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function ProductDetailPage() {
    const { id } = useParams();
    const product = products.find((p) => p.id === id);
    const { addToCart } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl text-white mb-4">Product Not Found</h1>
                    <Link href="/shop" className="text-gold hover:underline">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="min-h-screen pt-20">
            {/* Product Details Section */}
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
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                {product.isNew && (
                                    <span className="absolute top-4 left-4 px-4 py-2 bg-gold text-black text-sm font-semibold rounded-full">
                                        NEW
                                    </span>
                                )}
                                {product.isFlashSale && (
                                    <span className="absolute top-4 right-4 px-4 py-2 bg-destructive text-white text-sm font-semibold rounded-full">
                                        SALE
                                    </span>
                                )}
                            </div>

                            {/* Thumbnails */}
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImage === index
                                            ? "border-gold"
                                            : "border-white/10 hover:border-gold/50"
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Product Info */}
                        <div>
                            <p className="text-gold text-sm uppercase tracking-wider mb-2">
                                {product.category}
                            </p>
                            <h1 className="text-4xl md:text-5xl text-white mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-center space-x-4 mb-6">
                                <span className="text-4xl font-bold text-gold">${product.price}</span>
                                {product.originalPrice && (
                                    <>
                                        <span className="text-2xl text-white/40 line-through">
                                            ${product.originalPrice}
                                        </span>
                                        <span className="px-3 py-1 bg-destructive text-white text-sm font-semibold rounded-full">
                                            Save ${product.originalPrice - product.price}
                                        </span>
                                    </>
                                )}
                            </div>

                            <p className="text-white/70 text-lg leading-relaxed mb-8">
                                {product.description}
                            </p>

                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-6 mb-8">
                                <span className="text-white">Quantity:</span>
                                <div className="flex items-center space-x-4">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
                                    >
                                        -
                                    </button>
                                    <span className="text-xl text-white font-semibold w-12 text-center">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!product.inStock}
                                    className="flex-1 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>{product.inStock ? "Add to Cart" : "Out of Stock"}</span>
                                </button>
                                <button className="px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-white/10 hover:border-gold transition-all duration-300">
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4 mb-8 py-6 border-y border-white/10">
                                <div className="text-center">
                                    <Truck className="w-8 h-8 text-gold mx-auto mb-2" />
                                    <p className="text-sm text-white/70">Free Shipping</p>
                                </div>
                                <div className="text-center">
                                    <Shield className="w-8 h-8 text-gold mx-auto mb-2" />
                                    <p className="text-sm text-white/70">Authentic</p>
                                </div>
                                <div className="text-center">
                                    <Package className="w-8 h-8 text-gold mx-auto mb-2" />
                                    <p className="text-sm text-white/70">Gift Wrapped</p>
                                </div>
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
                                            <p><strong>Category:</strong> {product.category}</p>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>

                                <Accordion.Item value="care" className="border border-white/10 rounded-lg overflow-hidden">
                                    <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/5 transition-colors">
                                        <span className="text-white font-semibold">Care Instructions</span>
                                        <ChevronDown className="w-5 h-5 text-gold transition-transform group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                    <Accordion.Content className="px-6 pb-4 text-white/70">
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Dry clean recommended</li>
                                            <li>Hand wash in cold water if necessary</li>
                                            <li>Do not wring or twist</li>
                                            <li>Lay flat to dry</li>
                                            <li>Iron on low heat if needed</li>
                                        </ul>
                                    </Accordion.Content>
                                </Accordion.Item>

                                <Accordion.Item value="shipping" className="border border-white/10 rounded-lg overflow-hidden">
                                    <Accordion.Trigger className="w-full px-6 py-4 flex items-center justify-between text-left group hover:bg-white/5 transition-colors">
                                        <span className="text-white font-semibold">Shipping & Returns</span>
                                        <ChevronDown className="w-5 h-5 text-gold transition-transform group-data-[state=open]:rotate-180" />
                                    </Accordion.Trigger>
                                    <Accordion.Content className="px-6 pb-4 text-white/70">
                                        <p>Free shipping on all orders. Delivery within 3-5 business days in Pakistan. 30-day return policy on unworn items with original tags.</p>
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                        </div>
                    </div>

                    {/* You May Also Like */}
                    {relatedProducts.length > 0 && (
                        <div>
                            <h2 className="text-3xl md:text-4xl text-white mb-8 text-center">
                                You May Also Like
                            </h2>
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
