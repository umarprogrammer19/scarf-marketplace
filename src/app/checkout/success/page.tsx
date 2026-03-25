"use client"
import confetti from "canvas-confetti";
import { ArrowRight, CheckCircle, Package } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useId } from "react";

export default function OrderSuccessPage() {
    const location = useSearchParams();
    console.log(location)
    const orderId = location || "ORD-UNKNOWN";

    useEffect(() => {
        // Trigger confetti animation
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#D4AF37', '#F4E4BE', '#B8941F'],
        });
    }, []);

    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center animate-fade-in">
                <div className="mb-8">
                    <div className="w-32 h-32 bg-gold/10 border-4 border-gold rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                        <CheckCircle className="w-16 h-16 text-gold" />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                        Order Confirmed!
                    </h1>

                    <p className="text-xl text-white/70 mb-8">
                        Thank you for your purchase. Your order has been successfully placed.
                    </p>
                </div>

                <div className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 backdrop-blur-sm mb-8">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <Package className="w-6 h-6 text-gold" />
                        <p className="text-white/60">Order ID</p>
                    </div>
                    <p className="text-3xl font-bold text-gold mb-4">{orderId}</p>
                    <p className="text-white/60">
                        A confirmation email has been sent to your registered email address
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <h3 className="text-white font-semibold mb-2">What's Next?</h3>
                        <p className="text-white/60 text-sm">
                            We'll process your order and ship it within 1-2 business days. You'll receive a tracking number via email once your order is dispatched.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/track-order"
                            className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] inline-flex items-center justify-center space-x-2"
                        >
                            <span>Track Your Order</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>

                        <Link
                            href="/shop"
                            className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-gold transition-all duration-300"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>

                <div className="mt-12 text-white/40 text-sm">
                    <p>Need help? <Link href="/contact" className="text-gold hover:underline">Contact Support</Link></p>
                </div>
            </div>
        </div>
    );
}
