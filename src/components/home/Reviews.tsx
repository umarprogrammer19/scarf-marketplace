"use client";
import { useState } from "react";
import { reviews } from "../../data/mockData";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

export default function Reviews() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextReview = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length);
    };

    const prevReview = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
    };

    const currentReview = reviews[currentIndex];

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm tracking-widest uppercase mb-4 block">
                        Testimonials
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
                        What Our Clients Say
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Join thousands of satisfied customers who trust us for luxury
                    </p>
                </div>

                {/* Slider */}
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-12 backdrop-blur-sm">
                        {/* Quote Icon */}
                        <Quote className="w-16 h-16 text-gold/20 absolute top-8 left-8" />

                        {/* Review Content */}
                        <div className="relative z-10 text-center">
                            {/* Stars */}
                            <div className="flex justify-center space-x-1 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-6 h-6 ${i < currentReview.rating
                                            ? "fill-gold text-gold"
                                            : "text-white/20"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Comment */}
                            <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed italic">
                                "{currentReview.comment}"
                            </p>

                            {/* Customer Info */}
                            <div className="flex items-center justify-center space-x-4">
                                <img
                                    src={currentReview.image}
                                    alt={currentReview.customerName}
                                    className="w-16 h-16 rounded-full border-2 border-gold/30 object-cover"
                                />
                                <div className="text-left">
                                    <p className="text-white font-semibold">
                                        {currentReview.customerName}
                                    </p>
                                    <p className="text-white/60 text-sm">Verified Customer</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <button
                            onClick={prevReview}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
                        >
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                            onClick={nextReview}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
                        >
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center space-x-2 mt-8">
                        {reviews.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? "w-8 bg-gold"
                                    : "bg-white/20 hover:bg-white/40"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
