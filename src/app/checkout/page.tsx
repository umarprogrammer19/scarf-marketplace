"use client";

import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { placeCODOrder } from "./actions";
import { Loader2, Truck, ShieldCheck, ChevronRight, CreditCard, Award, Lock } from "lucide-react";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import Image from "next/image";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [paymentTab, setPaymentTab] = useState<"card" | "paypal">("card");

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;
    if (items.length === 0) { router.push("/cart"); return null; }

    const subtotal = getCartTotal();
    const shipping = 0;
    const tax = Math.round(subtotal * 0.05);
    const total = subtotal + tax + shipping;

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const firstName = formData.get("firstName") as string;
        const lastName = formData.get("lastName") as string;
        const fullFormData = new FormData();
        fullFormData.set("customerName", `${firstName} ${lastName}`.trim());
        fullFormData.set("customerPhone", formData.get("customerPhone") as string);
        fullFormData.set("shippingAddress", formData.get("shippingAddress") as string);
        fullFormData.set("city", formData.get("city") as string);
        const cartItemsPayload = items.map((item) => ({
            id: item.id, quantity: item.quantity, price: item.price,
        }));
        const result = await placeCODOrder(fullFormData, cartItemsPayload, total);
        if (result.success) {
            clearCart();
            router.push(`/checkout/success?order=${result.orderNumber}`);
        } else {
            alert("Something went wrong. Please try again.");
            setIsSubmitting(false);
        }
    }

    const inputClass = "w-full bg-[#0d0f14] border border-[#2a3040] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c9a84c] transition-colors";
    const labelClass = "block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2";

    return (
        <div className="min-h-screen bg-[#0d0f14] text-white flex flex-col">
            <Navbar />

            <main className="flex-1 pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-xs text-white/30 mb-8 pt-4">
                        <Link href="/cart" className="hover:text-[#c9a84c] transition-colors">Cart</Link>
                        <ChevronRight size={12} />
                        <span className="text-white/60 font-medium">Checkout</span>
                        <ChevronRight size={12} />
                        <span className="text-white/30">Payment</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* ===== LEFT — FORM ===== */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* STEP 1 — Shipping Address */}
                                <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-7">
                                        <span className="w-8 h-8 rounded-full bg-[#c9a84c] text-black flex items-center justify-center text-sm font-black">
                                            1
                                        </span>
                                        <h2 className="text-lg font-bold text-white">Shipping Address</h2>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div>
                                            <label className={labelClass}>First Name</label>
                                            <input type="text" name="firstName" required placeholder="John" className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Last Name</label>
                                            <input type="text" name="lastName" required placeholder="Doe" className={inputClass} />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className={labelClass}>Street Address</label>
                                        <input type="text" name="shippingAddress" required placeholder="123 Luxury Lane" className={inputClass} />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className={labelClass}>City</label>
                                            <input type="text" name="city" required placeholder="New York" className={inputClass} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Postcode</label>
                                            <input type="text" placeholder="10001" className={inputClass} />
                                        </div>
                                    </div>
                                </div>

                                {/* STEP 2 — Shipping Method */}
                                <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-7">
                                        <span className="w-8 h-8 rounded-full bg-[#c9a84c] text-black flex items-center justify-center text-sm font-black">
                                            2
                                        </span>
                                        <h2 className="text-lg font-bold text-white">Shipping Method</h2>
                                    </div>

                                    <div className="space-y-3">
                                        {/* Selected option */}
                                        <label className="flex items-center justify-between p-4 bg-[#c9a84c]/8 border border-[#c9a84c]/40 rounded-lg cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full border-2 border-[#c9a84c] flex items-center justify-center">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#c9a84c]" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-sm">Premium Courier</p>
                                                    <p className="text-xs text-white/40">2-3 Business Days</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-green-400">Free</span>
                                        </label>

                                        {/* Unselected option */}
                                        <label className="flex items-center justify-between p-4 bg-[#0d0f14] border border-[#2a3040] rounded-lg cursor-pointer hover:border-[#c9a84c]/30 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <div className="w-5 h-5 rounded-full border-2 border-white/20" />
                                                <div>
                                                    <p className="font-bold text-white text-sm">Next Day Delivery</p>
                                                    <p className="text-xs text-white/40">Delivered by tomorrow</p>
                                                </div>
                                            </div>
                                            <span className="text-sm font-bold text-white">$25.00</span>
                                        </label>
                                    </div>
                                </div>

                                {/* STEP 3 — Payment Information */}
                                <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-6 sm:p-8">
                                    <div className="flex items-center gap-3 mb-7">
                                        <span className="w-8 h-8 rounded-full bg-[#c9a84c] text-black flex items-center justify-center text-sm font-black">
                                            3
                                        </span>
                                        <h2 className="text-lg font-bold text-white">Payment Information</h2>
                                    </div>

                                    {/* Tab Switcher */}
                                    <div className="flex rounded-lg border border-[#2a3040] overflow-hidden mb-6">
                                        <button
                                            type="button"
                                            onClick={() => setPaymentTab("card")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider transition-colors ${
                                                paymentTab === "card"
                                                    ? "bg-[#1e2640] text-white"
                                                    : "bg-transparent text-white/30 hover:text-white/60"
                                            }`}
                                        >
                                            <CreditCard size={14} />
                                            Credit Card
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setPaymentTab("paypal")}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold tracking-wider transition-colors border-l border-[#2a3040] ${
                                                paymentTab === "paypal"
                                                    ? "bg-[#1e2640] text-white"
                                                    : "bg-transparent text-white/30 hover:text-white/60"
                                            }`}
                                        >
                                            <span className="text-[#1a73e8] font-black text-sm">P</span>
                                            PayPal
                                        </button>
                                    </div>

                                    {paymentTab === "card" ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className={labelClass}>Card Number</label>
                                                <div className="relative">
                                                    <input
                                                        type="text"
                                                        placeholder="0000 0000 0000 0000"
                                                        className={`${inputClass} pr-10`}
                                                    />
                                                    <Lock size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className={labelClass}>Expiry Date</label>
                                                    <input type="text" placeholder="MM/YY" className={inputClass} />
                                                </div>
                                                <div>
                                                    <label className={labelClass}>CVV</label>
                                                    <input type="text" placeholder="123" className={inputClass} />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center justify-center py-8 border border-[#2a3040] rounded-lg bg-[#0d0f14]">
                                            <p className="text-sm text-white/40">You will be redirected to PayPal to complete payment.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-[#c9a84c] hover:bg-[#e0bc6a] disabled:opacity-50 disabled:cursor-not-allowed text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-lg transition-all hover:shadow-[0_0_30px_rgba(201,168,76,0.35)] flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <><Loader2 className="animate-spin" size={18} />Processing...</>
                                    ) : (
                                        <><ShieldCheck size={16} />Complete Secure Purchase &bull; ${total.toLocaleString()}</>
                                    )}
                                </button>

                                <p className="text-[11px] text-center text-white/25 leading-relaxed">
                                    Your transaction is secured by AES-256 encryption. By placing this order, you agree to our{" "}
                                    <span className="text-white/40 underline cursor-pointer">Terms of Service</span>.
                                </p>
                            </form>
                        </div>

                        {/* ===== RIGHT — ORDER SUMMARY ===== */}
                        <div className="lg:col-span-1">
                            <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-6 sticky top-24 space-y-5">
                                <h2 className="text-base font-bold text-[#c9a84c]">Order Summary</h2>

                                {/* Cart Items */}
                                <div className="space-y-4 max-h-64 overflow-y-auto pr-1 border-b border-white/[0.06] pb-5">
                                    {items.map((item) => (
                                        <div key={item.id} className="flex gap-3 items-start">
                                            <div className="relative w-14 h-16 shrink-0 rounded-lg overflow-hidden bg-[#0d0f14] border border-white/[0.07]">
                                                <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-bold text-white text-xs line-clamp-1">{item.name}</p>
                                                <p className="text-[10px] text-white/35 mt-0.5">Edition: Collector&apos;s 2024</p>
                                                <p className="text-sm font-black text-[#c9a84c] mt-1">
                                                    ${(Number(item.price) * item.quantity).toLocaleString()}.00
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Price Rows */}
                                <div className="space-y-2.5">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-white/40">Subtotal</span>
                                        <span className="text-white">${subtotal.toLocaleString()}.00</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-white/40">Shipping</span>
                                        <span className="text-green-400 font-bold">Free</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-white/40">Estimated Tax</span>
                                        <span className="text-white">${tax.toLocaleString()}.00</span>
                                    </div>
                                </div>

                                {/* Promo Code */}
                                <div className="flex gap-2 pt-4 border-t border-white/[0.06]">
                                    <input
                                        type="text"
                                        placeholder="Promo code"
                                        className="flex-1 bg-[#0d0f14] border border-[#2a3040] rounded-lg px-3 py-2.5 text-xs text-white placeholder-white/20 outline-none focus:border-[#c9a84c] transition-colors"
                                    />
                                    <button className="px-4 py-2.5 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-lg text-xs font-bold text-[#c9a84c] hover:bg-[#c9a84c]/20 transition-colors">
                                        Apply
                                    </button>
                                </div>

                                {/* Total */}
                                <div className="pt-4 border-t border-white/[0.06]">
                                    <p className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30 mb-1">
                                        Total Amount
                                    </p>
                                    <div className="flex items-end justify-between">
                                        <p className="text-3xl font-black text-white">
                                            ${total.toLocaleString()}.00
                                        </p>
                                        <span className="text-xs text-white/30 mb-1">USD</span>
                                    </div>
                                </div>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/[0.06]">
                                    <div className="flex flex-col items-center gap-2 p-3 bg-[#0d0f14] rounded-lg border border-white/[0.07]">
                                        <Award size={18} className="text-[#c9a84c]" strokeWidth={1.5} />
                                        <span className="text-[9px] font-black tracking-wider uppercase text-white/40 text-center leading-tight">
                                            Authenticity<br />Guaranteed
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2 p-3 bg-[#0d0f14] rounded-lg border border-white/[0.07]">
                                        <Truck size={18} className="text-[#c9a84c]" strokeWidth={1.5} />
                                        <span className="text-[9px] font-black tracking-wider uppercase text-white/40 text-center leading-tight">
                                            Insured<br />Shipping
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}