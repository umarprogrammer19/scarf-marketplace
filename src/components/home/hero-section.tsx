import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=1920')",
                }}
            >
                <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
                <div className="mb-6">
                    <span className="inline-block px-6 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm tracking-wider backdrop-blur-sm">
                        HANDCRAFTED IN PAKISTAN
                    </span>
                </div>

                <h1 className="text-5xl md:text-7xl lg:text-8xl mb-6 text-white leading-tight">
                    Timeless Elegance,
                    <br />
                    <span className="text-gold">Woven to Perfection</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                    Discover our curated collection of luxury scarves, each piece a
                    masterwork of traditional craftsmanship and contemporary design.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/shop"
                        className="group px-10 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] flex items-center space-x-2"
                    >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>

                    <Link
                        href="/about"
                        className="px-10 py-4 bg-white/5 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-gold transition-all duration-500"
                    >
                        Our Story
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-gold rounded-full animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 border border-gold/20 rounded-full animate-pulse" />
            <div className="absolute bottom-40 right-20 w-32 h-32 border border-gold/10 rounded-full animate-pulse delay-75" />
        </section>
    );
}
