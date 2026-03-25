"use client"
import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const { getCartCount } = useCart();
    const location = usePathname();
    const cartCount = getCartCount();


    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location]);

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/shop" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
        { label: "Track Order", path: "/track-order" },
    ];

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
                    : "bg-transparent"
                    }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="text-2xl font-bold">
                                <span className="text-gold">LUXE</span>
                                <span className="text-white"> SCARVES</span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    href={link.path}
                                    className={`text-sm tracking-wide transition-colors duration-300 relative group ${location === link.path
                                        ? "text-gold"
                                        : "text-white/80 hover:text-gold"
                                        }`}
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full" />
                                </Link>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/cart"
                                className="relative text-white/80 hover:text-gold transition-colors duration-300"
                                aria-label="Shopping Cart"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {mounted && cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-gold text-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold animate-fade-in">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>

                            {/* Mobile Menu Toggle */}
                            <button
                                className="md:hidden text-white/80 hover:text-gold transition-colors duration-300"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="w-6 h-6" />
                                ) : (
                                    <Menu className="w-6 h-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <MobileMenu isOpen={isMobileMenuOpen} navLinks={navLinks} />
        </>
    );
}
