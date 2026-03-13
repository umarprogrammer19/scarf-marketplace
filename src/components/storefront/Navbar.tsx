'use client';

import Link from 'next/link';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Navbar() {
    const [mounted, setMounted] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [itemCount, setItemCount] = useState(0);

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);

        // Get cart count from localStorage
        const cart = localStorage.getItem('cart-storage');
        if (cart) {
            try {
                const cartData = JSON.parse(cart);
                const count = cartData.state?.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0;
                setItemCount(count);
            } catch (e) {
                setItemCount(0);
            }
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
                    ? "bg-background/95 backdrop-blur-xl border-b border-primary/20 shadow-lg"
                    : "bg-background border-b border-border"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="h-20 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 relative">
                            <Image
                                src="/logo.jpeg"
                                alt="Al Faizan"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                        </div>
                        <div className="hidden sm:flex flex-col">
                            <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                                AL FAIZAN
                            </span>
                            <span className="text-xs text-muted-foreground">Premium Scarves</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        <Link
                            href="/"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                            Shop
                        </Link>
                        <Link
                            href="/about"
                            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                            About
                        </Link>
                    </nav>

                    {/* Right Section */}
                    <div className="flex items-center gap-4">
                        {/* Search Icon (desktop) */}
                        <button className="hidden sm:flex items-center justify-center w-10 h-10 rounded-lg hover:bg-secondary transition-colors duration-200">
                            <Search size={20} className="text-muted-foreground" />
                        </button>

                        {/* Cart */}
                        <Link
                            href="/cart"
                            className="relative flex items-center justify-center w-10 h-10 rounded-lg hover:bg-secondary transition-colors duration-200"
                        >
                            <ShoppingBag size={20} className="text-muted-foreground hover:text-primary" />
                            {mounted && itemCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                                    {itemCount}
                                </span>
                            )}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-secondary transition-colors duration-200"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? (
                                <X size={20} />
                            ) : (
                                <Menu size={20} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="md:hidden border-t border-border py-4 space-y-2 animate-in fade-in slide-in-from-top-2">
                        <Link
                            href="/"
                            className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link
                            href="/shop"
                            className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        <Link
                            href="/about"
                            className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-secondary rounded-lg transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
