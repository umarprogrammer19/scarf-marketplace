"use client";

import Link from "next/link";
import { ShoppingBag, Search, Menu, X, Gem, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const items = useCartStore((state) => state.items);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const cartCount = mounted ? items.reduce((sum, item) => sum + item.quantity, 0) : 0;

    const navLinks = [
        { href: "/shop", label: "Shop" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
    ];

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-all duration-500 ${
                scrolled
                    ? "bg-background/95 backdrop-blur-md border-b border-border shadow-lg shadow-black/20"
                    : "bg-background/80 backdrop-blur-sm"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 shrink-0">
                    <Gem size={20} className="text-primary" />
                    <span className="text-lg font-bold text-foreground tracking-wide">
                        Al Faizan
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions */}
                <div className="flex items-center gap-3">
                    {/* Search Bar - Desktop */}
                    <div className="hidden md:flex items-center bg-secondary/60 border border-border rounded-full px-3 py-1.5">
                        <Search size={14} className="text-muted-foreground mr-2" />
                        <input
                            type="text"
                            placeholder="Search collection..."
                            className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-40"
                        />
                    </div>

                    {/* Cart */}
                    <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* User */}
                    <button className="hidden md:flex p-2 text-foreground hover:text-primary transition-colors">
                        <User size={20} />
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden p-2 text-foreground"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-background border-t border-border">
                    <div className="px-4 py-3">
                        <div className="flex items-center bg-secondary/60 border border-border rounded-lg px-3 py-2 mb-4">
                            <Search size={14} className="text-muted-foreground mr-2" />
                            <input
                                type="text"
                                placeholder="Search collection..."
                                className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-full"
                            />
                        </div>
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-foreground hover:text-primary py-3 px-2 text-sm font-medium border-b border-border/50 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            )}
        </header>
    );
}
