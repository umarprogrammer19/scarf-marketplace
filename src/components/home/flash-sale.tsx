"use client";
import { useState, useEffect } from "react";
import { products } from "../../data/mockData";
import ProductCard from "../storefront/ProductCard";
import { Timer } from "lucide-react";

export default function FlashSale() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 45,
    });

    const flashSaleProducts = products.filter((p) => p.isFlashSale);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black to-black/50">
            <div className="max-w-7xl mx-auto">
                {/* Header with Timer */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center space-x-2 px-6 py-3 bg-destructive/10 border border-destructive/30 rounded-full mb-6">
                        <Timer className="w-5 h-5 text-destructive" />
                        <span className="text-destructive font-semibold">Limited Time Offer</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
                        Flash Sale
                    </h2>

                    <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
                        Don't miss out on these exclusive deals. Hurry, sale ends soon!
                    </p>

                    {/* Countdown Timer */}
                    <div className="flex items-center justify-center space-x-6">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center mb-2">
                                <span className="text-3xl font-bold text-gold">
                                    {String(timeLeft.hours).padStart(2, "0")}
                                </span>
                            </div>
                            <span className="text-white/60 text-sm">Hours</span>
                        </div>
                        <span className="text-3xl text-gold">:</span>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center mb-2">
                                <span className="text-3xl font-bold text-gold">
                                    {String(timeLeft.minutes).padStart(2, "0")}
                                </span>
                            </div>
                            <span className="text-white/60 text-sm">Minutes</span>
                        </div>
                        <span className="text-3xl text-gold">:</span>
                        <div className="text-center">
                            <div className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-xl flex items-center justify-center mb-2">
                                <span className="text-3xl font-bold text-gold">
                                    {String(timeLeft.seconds).padStart(2, "0")}
                                </span>
                            </div>
                            <span className="text-white/60 text-sm">Seconds</span>
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {flashSaleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
