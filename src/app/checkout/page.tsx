"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { placeCODOrder } from "./actions";
import { Loader2, Truck, ShieldCheck, ArrowLeft, Check } from "lucide-react";
import Navbar from "@/components/storefront/Navbar";
import Image from "next/image";

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    if (items.length === 0) {
        router.push("/cart");
        return null;
    }

    const subtotal = getCartTotal();
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        const cartItemsPayload = items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
        }));

        const result = await placeCODOrder(formData, cartItemsPayload, total);

        if (result.success) {
            clearCart();
            router.push(`/checkout/success?order=${result.orderNumber}`);
        } else {
            alert("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <button
                    onClick={() => router.back()}
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back
                </button>

                <div className="mb-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                        Secure Checkout
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Complete your order with Cash on Delivery
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Shipping Details Section */}
                            <div className="bg-secondary/40 border border-border rounded-xl p-8 space-y-6">
                                <div className="flex items-center gap-3 pb-6 border-b border-border">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Truck size={20} className="text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">
                                        Delivery Details
                                    </h2>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">
                                            Full Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="customerName"
                                            required
                                            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="Ammar Khan"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-foreground">
                                            Phone Number <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            name="customerPhone"
                                            required
                                            className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                            placeholder="0300 1234567"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">
                                        Complete Delivery Address <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        name="shippingAddress"
                                        required
                                        rows={3}
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none transition-all"
                                        placeholder="House/Apt No, Street Name, Area..."
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-foreground">
                                        City <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                        placeholder="Karachi"
                                    />
                                </div>
                            </div>

                            {/* Payment Method Section */}
                            <div className="bg-secondary/40 border border-border rounded-xl p-8 space-y-6">
                                <div className="flex items-center gap-3 pb-6 border-b border-border">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <ShieldCheck size={20} className="text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold text-foreground">
                                        Payment Method
                                    </h2>
                                </div>

                                <div className="p-4 bg-primary/10 border border-primary/30 rounded-lg flex items-start gap-3">
                                    <Check size={20} className="text-primary shrink-0 mt-1" />
                                    <div>
                                        <p className="font-semibold text-foreground">
                                            Cash on Delivery (COD)
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Pay securely when the rider delivers your package to your doorstep. No upfront payment required.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground font-bold text-lg py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={20} />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Check size={20} />
                                        Confirm Order - Rs. {total.toLocaleString()}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-secondary/40 border border-border rounded-xl p-6 lg:p-8 sticky top-24 space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">Order Summary</h2>

                            {/* Items */}
                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 border-b border-border pb-6">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-start">
                                        <div className="relative w-12 h-16 shrink-0 rounded-lg overflow-hidden bg-secondary">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-foreground line-clamp-1 text-sm">
                                                {item.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                Qty: {item.quantity}
                                            </p>
                                            <p className="text-sm font-semibold text-primary mt-1">
                                                Rs. {(Number(item.price) * item.quantity).toLocaleString()}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Price Breakdown */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="text-foreground font-medium">
                                        Rs. {subtotal.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax (5%)</span>
                                    <span className="text-foreground font-medium">
                                        Rs. {tax.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span className="text-primary font-medium">Free</span>
                                </div>
                            </div>

                            {/* Total */}
                            <div className="pt-3 border-t border-border">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-foreground">
                                        Total
                                    </span>
                                    <span className="text-2xl font-bold text-primary">
                                        Rs. {total.toLocaleString()}
                                    </span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="space-y-2 pt-6 border-t border-border">
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <ShieldCheck size={16} className="text-primary" />
                                    100% Secure Payment
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Check size={16} className="text-primary" />
                                    Guaranteed Authentic
                                </div>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Truck size={16} className="text-primary" />
                                    Fast Delivery
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
