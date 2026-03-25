"use client";
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Footer() {
    const [email, setEmail] = useState("");
    const pathName = usePathname();

    const locations = ["/admin", "/admin/users", "/admin/products", "/admin/orders"]
    if (locations.includes(pathName)) return;

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            toast.success("Subscribed!", {
                description: "You've been added to our newsletter",
            });
            setEmail("");
        }
    };

    return (
        <footer className="bg-black border-t border-white/10 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Newsletter Section */}
                <div className="mb-16 text-center">
                    <h3 className="text-3xl mb-4 text-white">
                        Subscribe to Our Newsletter
                    </h3>
                    <p className="text-white/60 mb-6 max-w-xl mx-auto">
                        Be the first to know about new arrivals, exclusive offers, and special events.
                    </p>
                    <form
                        onSubmit={handleNewsletterSubmit}
                        className="flex max-w-md mx-auto gap-3"
                    >
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-6 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                            required
                        />
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>

                {/* Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="text-2xl font-bold mb-4">
                            <span className="text-gold">LUXE</span>
                            <span className="text-white"> SCARVES</span>
                        </div>
                        <p className="text-white/60 mb-6">
                            Handcrafted luxury scarves from Pakistan. Timeless elegance meets traditional craftsmanship.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-300"
                            >
                                <Facebook className="w-4 h-4" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-300"
                            >
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white/60 hover:text-gold hover:border-gold transition-all duration-300"
                            >
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/shop"
                                    className="text-white/60 hover:text-gold transition-colors duration-300"
                                >
                                    Shop All
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="text-white/60 hover:text-gold transition-colors duration-300"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-white/60 hover:text-gold transition-colors duration-300"
                                >
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/track-order"
                                    className="text-white/60 hover:text-gold transition-colors duration-300"
                                >
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Customer Care</h4>
                        <ul className="space-y-3">
                            <li>
                                <a
                                    href="#"
                                    className="text-white/60 hover:text-gold transition-colors duration-300"
                                >
                                    Shipping Information
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-white/60 hover:text-gold transition-colors duration-300"
                                >
                                    Returns & Exchanges
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-white/60 hover:text-gold transition-colors duration-300"
                                >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-white/60 hover:text-gold transition-colors duration-300"
                                >
                                    Terms of Service
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-white/60">
                                <MapPin className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                                <span>123 Fashion Street, Lahore, Pakistan</span>
                            </li>
                            <li className="flex items-center space-x-3 text-white/60">
                                <Phone className="w-5 h-5 text-gold shrink-0" />
                                <span>+92 300 1234567</span>
                            </li>
                            <li className="flex items-center space-x-3 text-white/60">
                                <Mail className="w-5 h-5 text-gold shrink-0" />
                                <span>hello@luxescarves.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-white/40 text-sm">
                        © 2026 Luxe Scarves. Handcrafted with love in Pakistan.
                    </p>
                    <div className="flex items-center space-x-6 text-sm text-white/40">
                        <span>🇵🇰 Made in Pakistan</span>
                        <span>•</span>
                        <span>100% Authentic</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
