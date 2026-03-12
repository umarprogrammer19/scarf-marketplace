import Link from "next/link";
import { ShoppingBag, Menu } from "lucide-react";

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-background/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">

                {/* Mobile Menu Icon */}
                <button className="md:hidden text-text-main hover:text-gold transition-colors">
                    <Menu size={24} />
                </button>

                {/* Logo */}
                <Link href="/" className="flex-1 md:flex-none text-center md:text-left">
                    <span className="text-2xl font-serif text-gold tracking-widest uppercase">
                        Al Faizan
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex gap-8 items-center">
                    <Link href="/" className="text-sm font-medium text-text-muted hover:text-gold transition-colors uppercase tracking-wider">
                        Home
                    </Link>
                    <Link href="/shop" className="text-sm font-medium text-text-muted hover:text-gold transition-colors uppercase tracking-wider">
                        Shop All
                    </Link>
                    <Link href="/about" className="text-sm font-medium text-text-muted hover:text-gold transition-colors uppercase tracking-wider">
                        Our Story
                    </Link>
                </nav>

                {/* Cart Icon */}
                <div className="flex items-center justify-end flex-1 md:flex-none">
                    <Link href="/cart" className="relative text-text-main hover:text-gold transition-colors p-2">
                        <ShoppingBag size={24} />
                        {/* Cart Badge Placeholder */}
                        <span className="absolute top-0 right-0 bg-gold text-background text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center">
                            0
                        </span>
                    </Link>
                </div>

            </div>
        </header>
    );
}