import Link from "next/link";
import { Gem } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-background border-t border-border">
            {/* Gold accent line */}
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <Gem size={20} className="text-primary" />
                            <span className="text-lg font-bold text-foreground">Al Faizan</span>
                        </Link>
                        <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
                            The ultimate marketplace for premium hand-crafted scarves. Sourced ethically from artisans around the world.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Instagram</Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Pinterest</Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">Facebook</Link>
                        </div>
                    </div>

                    {/* Shop */}
                    <div>
                        <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">Shop</h4>
                        <ul className="space-y-3">
                            <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">Silk Scarves</Link></li>
                            <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">Wool Wraps</Link></li>
                            <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">Cashmere Collection</Link></li>
                            <li><Link href="/shop" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gift Cards</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">Support</h4>
                        <ul className="space-y-3">
                            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
                            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Care Instructions</Link></li>
                            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">Newsletter</h4>
                        <p className="text-sm text-muted-foreground mb-4">Join for 10% off your first luxury piece.</p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Email address"
                                className="flex-1 bg-secondary border border-border rounded-l-lg px-3 py-2 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary transition-colors"
                            />
                            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-lg text-xs font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors">
                                Join
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Al Faizan Marketplace. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
