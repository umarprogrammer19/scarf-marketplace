"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const subtotal = getCartTotal();
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                        Shopping Cart
                    </h1>
                    <p className="text-muted-foreground">
                        {items.length} {items.length === 1 ? "item" : "items"} in your cart
                    </p>
                </div>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-border">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                            <ShoppingBag size={32} className="text-primary" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            Your cart is empty
                        </h2>
                        <p className="text-muted-foreground mb-8">
                            Looks like you haven't added any premium scarves yet.
                        </p>
                        <Link
                            href="/shop"
                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                        >
                            Continue Shopping
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 sm:gap-6 bg-secondary/40 border border-border rounded-xl p-4 sm:p-6 hover:border-primary/40 transition-colors duration-300"
                                >
                                    {/* Image */}
                                    <div className="relative w-20 h-24 sm:w-24 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-secondary">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                                                {item.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-2">
                                                Premium Quality Scarf
                                            </p>
                                            <p className="text-lg font-bold text-primary">
                                                Rs. {Number(item.price).toLocaleString()}
                                            </p>
                                        </div>

                                        {/* Quantity Controls & Remove */}
                                        <div className="flex items-center justify-between">
                                            <div className="inline-flex items-center bg-background border border-border rounded-lg">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity - 1)
                                                    }
                                                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                    disabled={item.quantity === 1}
                                                >
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-semibold text-foreground">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(item.id, item.quantity + 1)
                                                    }
                                                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="inline-flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors font-medium text-sm"
                                            >
                                                <Trash2 size={16} />
                                                <span className="hidden sm:inline">Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-secondary/40 border border-border rounded-xl p-6 lg:p-8 sticky top-24 space-y-6">
                                <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>

                                {/* Summary Details */}
                                <div className="space-y-3 pb-6 border-b border-border">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="text-foreground font-medium">
                                            Rs. {subtotal.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Tax (5%)</span>
                                        <span className="text-foreground font-medium">
                                            Rs. {tax.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-primary font-medium">Free</span>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="space-y-2">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Promo code"
                                            className="flex-1 bg-background border border-border rounded-lg px-4 py-2 text-sm text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                        />
                                        <button className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                                            <Tag size={18} />
                                        </button>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="pt-6 border-t border-border">
                                    <div className="flex items-center justify-between mb-6">
                                        <span className="text-lg font-semibold text-foreground">
                                            Total
                                        </span>
                                        <span className="text-2xl font-bold text-primary">
                                            Rs. {total.toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Checkout Button */}
                                    <Link
                                        href="/checkout"
                                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight size={20} />
                                    </Link>
                                </div>

                                {/* Continue Shopping */}
                                <Link
                                    href="/shop"
                                    className="w-full flex items-center justify-center gap-2 border border-border hover:border-primary/40 text-foreground hover:text-primary font-semibold py-3 rounded-lg transition-all duration-300"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
