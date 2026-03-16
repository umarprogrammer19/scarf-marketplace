"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const subtotal = getCartTotal();
    const shipping = 0;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax + shipping;

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-1 pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
                        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                        <ChevronRight size={14} />
                        <span className="text-foreground font-medium">Cart</span>
                        <ChevronRight size={14} />
                        <span className="text-muted-foreground">Checkout</span>
                        <ChevronRight size={14} />
                        <span className="text-muted-foreground">Payment</span>
                    </nav>

                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
                    <p className="text-muted-foreground mb-10">
                        {items.length} {items.length === 1 ? "item" : "items"} in your cart
                    </p>

                    {items.length === 0 ? (
                        <div className="text-center py-20 bg-card rounded-2xl border border-border">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                                <ShoppingBag size={32} className="text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
                            <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added any premium scarves yet.</p>
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3.5 rounded-lg font-bold text-sm tracking-wider uppercase transition-all"
                            >
                                Continue Shopping <ArrowRight size={18} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Cart Items */}
                            <div className="lg:col-span-2 space-y-4">
                                {items.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex gap-4 sm:gap-6 bg-card border border-border rounded-xl p-4 sm:p-5 hover:border-primary/30 transition-colors"
                                    >
                                        <div className="relative w-20 h-24 sm:w-24 sm:h-32 shrink-0 rounded-lg overflow-hidden bg-secondary">
                                            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-semibold text-foreground mb-1 line-clamp-1">{item.name}</h3>
                                                <p className="text-xs text-muted-foreground mb-2">Premium Quality Scarf</p>
                                                <p className="text-lg font-bold text-primary">Rs. {Number(item.price).toLocaleString()}</p>
                                            </div>
                                            <div className="flex items-center justify-between mt-3">
                                                <div className="inline-flex items-center bg-secondary border border-border rounded-lg">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        disabled={item.quantity === 1}
                                                        className="p-2 text-muted-foreground hover:text-primary transition-colors disabled:opacity-30"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-semibold text-foreground">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="inline-flex items-center gap-1.5 text-red-500 hover:text-red-400 transition-colors text-sm"
                                                >
                                                    <Trash2 size={14} />
                                                    <span className="hidden sm:inline">Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Summary */}
                            <div className="lg:col-span-1">
                                <div className="bg-card border border-border rounded-xl p-6 lg:p-8 sticky top-24 space-y-6">
                                    <h2 className="text-xl font-bold text-primary">Order Summary</h2>

                                    <div className="space-y-3 pb-5 border-b border-border">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Subtotal</span>
                                            <span className="text-foreground font-medium">Rs. {subtotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="text-green-500 font-medium">Free</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Estimated Tax</span>
                                            <span className="text-foreground font-medium">Rs. {tax.toLocaleString()}</span>
                                        </div>
                                    </div>

                                    {/* Promo Code */}
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Promo code"
                                            className="flex-1 bg-secondary border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary transition-colors"
                                        />
                                        <button className="px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-semibold text-primary hover:bg-primary/10 transition-colors">
                                            Apply
                                        </button>
                                    </div>

                                    {/* Total */}
                                    <div className="pt-5 border-t border-border">
                                        <div className="flex items-center justify-between mb-1">
                                            <span className="text-xs font-bold tracking-wider uppercase text-muted-foreground">Total Amount</span>
                                            <span className="text-xs text-muted-foreground">PKR</span>
                                        </div>
                                        <p className="text-3xl font-bold text-primary">Rs. {total.toLocaleString()}</p>
                                    </div>

                                    <Link
                                        href="/checkout"
                                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3.5 rounded-lg transition-all text-sm tracking-wider uppercase"
                                    >
                                        Proceed to Checkout <ArrowRight size={18} />
                                    </Link>

                                    <Link
                                        href="/shop"
                                        className="w-full flex items-center justify-center gap-2 border border-border hover:border-primary/40 text-foreground hover:text-primary font-semibold py-3 rounded-lg transition-all text-sm"
                                    >
                                        Continue Shopping
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
