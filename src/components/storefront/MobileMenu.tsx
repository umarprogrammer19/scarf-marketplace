import { useEffect } from "react";
import { Link, useLocation } from "react-router";

interface MobileMenuProps {
    isOpen: boolean;
    navLinks: { label: string; path: string }[];
}

export default function MobileMenu({ isOpen, navLinks }: MobileMenuProps) {
    const location = useLocation();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
            />

            {/* Menu */}
            <div
                className={`fixed top-0 right-0 bottom-0 w-80 bg-black border-l border-white/10 z-50 transform transition-transform duration-300 ease-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div className="text-xl font-bold">
                            <span className="text-gold">LUXE</span>
                            <span className="text-white"> SCARVES</span>
                        </div>
                    </div>

                    <nav className="flex flex-col space-y-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-lg tracking-wide transition-colors duration-300 ${location.pathname === link.path
                                        ? "text-gold"
                                        : "text-white/80 hover:text-gold"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-12 pt-8 border-t border-white/10">
                        <Link
                            to="/admin"
                            className="text-sm text-white/60 hover:text-gold transition-colors duration-300"
                        >
                            Admin Panel →
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
