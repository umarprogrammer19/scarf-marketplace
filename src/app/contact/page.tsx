"use client";

import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import { Mail, Phone, MapPin, MessageCircle, Navigation } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#0d0f14] text-white">
            <Navbar />

            <main className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* ===== LEFT SIDE ===== */}
                        <div>
                            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
                                Let&apos;s start a<br />conversation.
                            </h1>
                            <p className="text-sm text-white/45 mb-10 max-w-md leading-relaxed">
                                Questions about our fabrics, shipping, or looking for a custom order? Our team is here to help you find the perfect piece.
                            </p>

                            {/* 2x2 Contact Cards */}
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                {[
                                    {
                                        icon: Mail,
                                        title: "Email us",
                                        desc: "Our friendly team is here to help.",
                                        link: "hello@scarfhaven.com",
                                    },
                                    {
                                        icon: Phone,
                                        title: "Call us",
                                        desc: "Mon-Fri from 8am to 5pm.",
                                        link: "+1 (555) 000-0000",
                                    },
                                    {
                                        icon: MapPin,
                                        title: "Visit store",
                                        desc: "Stop by our flagship showroom.",
                                        link: "123 Silk Road, Textile District, NY",
                                    },
                                    {
                                        icon: MessageCircle,
                                        title: "Live support",
                                        desc: "Available for quick queries.",
                                        link: "Start a live chat",
                                    },
                                ].map((item) => (
                                    <div
                                        key={item.title}
                                        className="bg-[#12172a] border border-[#1e2640] rounded-xl p-5"
                                    >
                                        <div className="w-9 h-9 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center mb-4">
                                            <item.icon size={16} className="text-[#c9a84c]" strokeWidth={1.5} />
                                        </div>
                                        <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
                                        <p className="text-xs text-white/40 mb-3 leading-relaxed">{item.desc}</p>
                                        <p className="text-xs font-semibold text-[#c9a84c] cursor-pointer hover:text-[#e0bc6a] transition-colors">
                                            {item.link}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* Map Section */}
                            <div className="relative rounded-xl overflow-hidden border border-[#1e2640]" style={{ height: "220px" }}>
                                <iframe
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=-74.05%2C40.68%2C-73.95%2C40.78&layer=mapnik"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.1)" }}
                                    loading="lazy"
                                    title="Store Location"
                                />
                                {/* Get Directions button */}
                                <div className="absolute bottom-4 left-4">
                                    <button className="inline-flex items-center gap-2 bg-[#0d0f14] border border-[#2a3040] text-white text-xs font-bold tracking-wider uppercase px-4 py-2.5 rounded-lg hover:border-[#c9a84c] hover:text-[#c9a84c] transition-colors">
                                        <Navigation size={12} />
                                        Get Directions
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ===== RIGHT SIDE — Contact Form ===== */}
                        <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-8">
                            <form className="space-y-5">
                                {/* Name row */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                                            First Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Jane"
                                            className="w-full bg-[#0d0f14] border border-[#2a3040] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c9a84c] transition-colors"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                                            Last Name
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Doe"
                                            className="w-full bg-[#0d0f14] border border-[#2a3040] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c9a84c] transition-colors"
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        placeholder="jane@example.com"
                                        className="w-full bg-[#0d0f14] border border-[#2a3040] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c9a84c] transition-colors"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                                        Subject
                                    </label>
                                    <select className="w-full bg-[#0d0f14] border border-[#2a3040] rounded-lg px-4 py-3 text-sm text-white/60 outline-none focus:border-[#c9a84c] transition-colors appearance-none cursor-pointer">
                                        <option>Select a topic</option>
                                        <option>Order Inquiry</option>
                                        <option>Product Question</option>
                                        <option>Shipping & Delivery</option>
                                        <option>Returns & Exchange</option>
                                        <option>Custom Order</option>
                                        <option>Other</option>
                                    </select>
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-[10px] font-bold tracking-[0.15em] uppercase text-white/40 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows={5}
                                        placeholder="How can we help you?"
                                        className="w-full bg-[#0d0f14] border border-[#2a3040] rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-[#c9a84c] transition-colors resize-none"
                                    />
                                </div>

                                {/* Checkbox */}
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-[#2a3040] bg-[#0d0f14] accent-[#c9a84c]"
                                    />
                                    <span className="text-xs text-white/35">
                                        You agree to our friendly{" "}
                                        <span className="text-[#c9a84c] underline cursor-pointer hover:text-[#e0bc6a]">
                                            privacy policy
                                        </span>.
                                    </span>
                                </label>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-[#c9a84c] text-black font-black text-xs tracking-[0.2em] uppercase py-4 rounded-lg hover:bg-[#e0bc6a] transition-all duration-300 hover:shadow-[0_0_25px_rgba(201,168,76,0.3)]"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}