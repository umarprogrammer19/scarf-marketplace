"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { placeCODOrder } from "./actions";
import { Loader2, Truck, ShieldCheck } from "lucide-react";
import Navbar from "@/components/storefront/Navbar";

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    // If they somehow reach checkout with an empty cart, send them back
    if (items.length === 0) {
        router.push("/cart");
        return null;
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const cartItemsPayload = items.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price
        }));

        const result = await placeCODOrder(formData, cartItemsPayload, getCartTotal());

        if (result.success) {
            clearCart(); // Empty their cart
            // We will route them to a success page with their Order Number!
            router.push(`/checkout/success?order=${result.orderNumber}`);
        } else {
            alert("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
                <h1 className="text-4xl font-serif text-text-main mb-10">Secure Checkout</h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left: The COD Form */}
                    <div className="bg-surface p-8 rounded-2xl border border-gray-800">
                        <h2 className="text-2xl font-serif text-gold mb-6 flex items-center gap-2">
                            <Truck size={24} /> Shipping Details (COD Only)
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm text-text-muted mb-2">Full Name</label>
                                    <input type="text" name="customerName" required className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 text-text-main focus:border-gold outline-none" placeholder="Ammar" />
                                </div>
                                <div>
                                    <label className="block text-sm text-text-muted mb-2">Phone Number</label>
                                    <input type="tel" name="customerPhone" required className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 text-text-main focus:border-gold outline-none" placeholder="0300 1234567" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm text-text-muted mb-2">Complete Delivery Address</label>
                                <textarea name="shippingAddress" required rows={3} className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 text-text-main focus:border-gold outline-none" placeholder="House/Apt No, Street, Area..." />
                            </div>

                            <div>
                                <label className="block text-sm text-text-muted mb-2">City</label>
                                <input type="text" name="city" required className="w-full bg-background border border-gray-800 rounded-lg px-4 py-3 text-text-main focus:border-gold outline-none" placeholder="Karachi" />
                            </div>

                            <div className="bg-background/50 p-4 rounded-xl border border-gray-800 flex items-start gap-3 mt-6">
                                <ShieldCheck size={24} className="text-gold shrink-0 mt-1" />
                                <div>
                                    <p className="font-medium text-text-main">Cash on Delivery</p>
                                    <p className="text-sm text-text-muted">You will pay in cash when the rider delivers your package to your doorstep.</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-gold hover:bg-gold-hover text-background font-bold text-lg py-4 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-8"
                            >
                                {isSubmitting ? <Loader2 className="animate-spin" /> : `Confirm Order - Rs. ${getCartTotal().toLocaleString()}`}
                            </button>
                        </form>
                    </div>

                    {/* Right: Order Review */}
                    <div className="bg-surface p-8 rounded-2xl border border-gray-800 h-fit sticky top-28">
                        <h2 className="text-2xl font-serif text-text-main mb-6">Order Review</h2>

                        <div className="space-y-4 mb-6 max-h-100 overflow-y-auto pr-2">
                            {items.map(item => (
                                <div key={item.id} className="flex gap-4 items-center pb-4 border-b border-gray-800 last:border-0">
                                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                                    <div className="flex-1">
                                        <p className="font-medium text-text-main line-clamp-1">{item.name}</p>
                                        <p className="text-sm text-text-muted">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="font-bold text-gold">Rs. {(Number(item.price) * item.quantity).toLocaleString()}</p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-gray-800 pt-6">
                            <div className="flex justify-between items-center text-lg font-bold text-text-main">
                                <span>Total to Pay (COD)</span>
                                <span className="text-2xl text-gold">Rs. {getCartTotal().toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}