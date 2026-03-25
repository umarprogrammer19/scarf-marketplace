import { Home, Search } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center animate-fade-in">
                <div className="mb-8">
                    <h1 className="text-9xl md:text-[200px] font-bold text-gold/20 mb-4">
                        404
                    </h1>
                    <h2 className="text-4xl md:text-5xl text-white mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-xl text-white/70 mb-8">
                        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] inline-flex items-center justify-center space-x-2"
                    >
                        <Home className="w-5 h-5" />
                        <span>Go Home</span>
                    </Link>

                    <Link
                        href="/shop"
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-gold transition-all duration-300 inline-flex items-center justify-center space-x-2"
                    >
                        <Search className="w-5 h-5" />
                        <span>Browse Shop</span>
                    </Link>
                </div>

                <div className="mt-16 text-white/40">
                    <p>Lost? Here are some helpful links:</p>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        <Link href="/about" className="text-gold hover:underline">About Us</Link>
                        <Link href="/contact" className="text-gold hover:underline">Contact</Link>
                        <Link href="/track-order" className="text-gold hover:underline">Track Order</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
