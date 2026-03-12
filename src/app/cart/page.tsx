"use client";

import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function CartPage() {
    const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

    // This prevents hydration errors between server/client rendering with Zustand
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-5xl">
                <h1 className="text-4xl font-serif text-text-main mb-10">Your Cart</h1>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-surface rounded-2xl border border-gray-800">
                        <h2 className="text-2xl text-text-main mb-4 font-serif">Your cart is empty</h2>
                        <p className="text-text-muted mb-8">Looks like you haven't added any premium scarves yet.</p>
                        <Link href="/" className="inline-block bg-gold hover:bg-gold-hover text-background font-bold py-3 px-8 rounded-full transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                        {/* Cart Items List */}
                        <div className="lg:col-span-2 space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-6 bg-surface p-4 rounded-2xl border border-gray-800 items-center">
                                    <img src={item.imageUrl} alt={item.name} className="w-24 h-32 object-cover rounded-xl" />

                                    <div className="flex-1">
                                        <h3 className="text-lg font-serif text-text-main mb-1">{item.name}</h3>
                                        <p className="text-gold font-medium mb-4">Rs. {Number(item.price).toLocaleString()}</p>

                                        <div className="flex items-center gap-4">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center bg-background border border-gray-700 rounded-lg">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-text-muted hover:text-gold transition-colors">
                                                    <Minus size={16} />
                                                </button>
                                                <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-text-muted hover:text-gold transition-colors">
                                                    <Plus size={16} />
                                                </button>
                                            </div>

                                            {/* Remove Item */}
                                            <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-300 transition-colors flex items-center gap-1 text-sm font-medium">
                                                <Trash2 size={16} /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-surface p-8 rounded-2xl border border-gray-800 sticky top-28">
                                <h2 className="text-2xl font-serif text-text-main mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6 text-sm text-text-muted">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>Rs. {getCartTotal().toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping (COD)</span>
                                        <span className="text-text-main">Calculated at checkout</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-800 pt-6 mb-8 flex justify-between items-center">
                                    <span className="text-lg font-medium text-text-main">Total</span>
                                    <span className="text-2xl font-bold text-gold">Rs. {getCartTotal().toLocaleString()}</span>
                                </div>

                                <Link href="/checkout" className="w-full bg-gold hover:bg-gold-hover text-background font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2">
                                    Proceed to Checkout <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}