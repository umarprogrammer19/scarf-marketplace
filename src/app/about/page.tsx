import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import Image from "next/image";
import Link from "next/link";
import { Shield, Leaf, Users, Gem } from "lucide-react";

export const metadata = {
    title: "Our Heritage | Lumina Luxe",
    description: "A century of timeless elegance — crafting luxury scarves since 1924.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#0d0f14] text-white">
            <Navbar />

            {/* ===== HERO — Full bleed scarf image with text overlay ===== */}
            <section className="relative w-full h-screen min-h-[600px] max-h-[900px] flex items-end pb-20 overflow-hidden">
                <Image
                    src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=1800&q=85"
                    alt="Luxury cashmere scarf"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/85" />
                <div className="relative z-10 w-full text-center px-4">
                    <p className="text-[11px] font-bold tracking-[0.35em] text-white/60 uppercase mb-4">
                        Est. 1924
                    </p>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-white mb-4 leading-tight">
                        A Legacy of<br />
                        <span className="italic font-serif text-white">Timeless Elegance</span>
                    </h1>
                    <p className="text-sm text-white/55 max-w-md mx-auto leading-relaxed">
                        For a century, Lumina Luxe has defined the pinnacle of textile artistry,
                        weaving the soul of Italian heritage into every silken thread.
                    </p>
                </div>
            </section>

            {/* ===== THE GOLDEN THREAD OF HISTORY ===== */}
            <section className="py-20 md:py-24 bg-[#0d0f14]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-[#c9a84c] mb-6 leading-snug">
                                The Golden Thread of History
                            </h2>
                            <p className="text-sm text-white/50 leading-relaxed mb-5">
                                Founded in the heart of Florence by Isabella Lumina, our house began as a small
                                atelier dedicated to the pursuit of the perfect weave. Isabella believed that a
                                scarf was more than an accessory; it was a canvas for storytelling.
                            </p>
                            <p className="text-sm text-white/50 leading-relaxed mb-8">
                                From the cobblestone streets of Italy to the fashion capitals of the world, we have
                                remained steadfast in our commitment to traditional techniques that others have long
                                abandoned in favor of speed. Every Lumina Luxe piece carries with it a century of
                                expertise and a whisper of history.
                            </p>
                            <blockquote className="border-l-2 border-[#c9a84c] pl-5 py-1">
                                <p className="text-sm text-white/70 italic leading-relaxed">
                                    &ldquo;Quality is not an act, it is a habit passed down through generations of hands.&rdquo;
                                </p>
                            </blockquote>
                            <div className="mt-8 inline-flex items-center gap-3 bg-[#c9a84c]/10 border border-[#c9a84c]/25 rounded-lg px-5 py-3">
                                <span className="text-3xl font-black text-[#c9a84c]">100</span>
                                <span className="text-xs font-bold tracking-[0.15em] text-white/50 uppercase leading-tight">
                                    Years of<br />Mastery
                                </span>
                            </div>
                        </div>
                        <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                            <Image
                                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
                                alt="Traditional weaving loom"
                                fill
                                className="object-cover grayscale"
                            />
                            <div className="absolute inset-0 bg-black/30" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== THE ART OF THE WEAVE ===== */}
            <section className="py-20 md:py-24 border-t border-white/[0.06] bg-[#0b0d12]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <p className="text-[10px] font-bold tracking-[0.3em] text-[#c9a84c] uppercase mb-3">
                            The Craftsmanship
                        </p>
                        <h2 className="text-2xl md:text-3xl font-bold text-white">
                            The Art of the Weave
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "Sourcing the Soul",
                                desc: "We exclusively source Grade-A mulberry silk, renowned for its incredible tensile strength and ethereal luster.",
                                img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=600&q=80",
                            },
                            {
                                title: "The Master's Touch",
                                desc: "Each pattern is hand drawn by our studio artists before being transferred to screens for traditional hand printing.",
                                img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80",
                            },
                            {
                                title: "The Hand-Rolled Edge",
                                desc: "Every Lumina Luxe scarf is finished with a signature hand-rolled hem, a process that takes over 45 minutes per piece.",
                                img: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=600&q=80",
                            },
                        ].map((item) => (
                            <div key={item.title} className="group">
                                <div className="relative rounded-xl overflow-hidden aspect-[4/3] mb-5">
                                    <Image
                                        src={item.img}
                                        alt={item.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                                <p className="text-xs text-white/45 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== OUR COMMITMENT TO QUALITY ===== */}
            <section className="py-20 md:py-24 border-t border-white/[0.06] bg-[#0d0f14]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="grid grid-cols-2 gap-5">
                            {[
                                { icon: Shield, title: "Uncompromising", desc: "Rigorous 12-point inspection." },
                                { icon: Leaf, title: "Sustainable", desc: "Organic dyes, zero waste." },
                                { icon: Users, title: "Ethical", desc: "Fair trade artisan partnerships." },
                                { icon: Gem, title: "Enduring", desc: "Heirlooms for tomorrow." },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="flex flex-col gap-3 p-5 rounded-xl border border-white/[0.07] bg-[#12172a]"
                                >
                                    <div className="w-9 h-9 rounded-full border border-[#c9a84c]/30 bg-[#c9a84c]/10 flex items-center justify-center">
                                        <item.icon size={16} className="text-[#c9a84c]" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                                    <p className="text-xs text-white/40 leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-snug">
                                Our Commitment<br />
                                to{" "}
                                <span className="text-[#c9a84c] italic font-serif">Quality</span>
                            </h2>
                            <p className="text-sm text-white/45 leading-relaxed mb-8 max-w-sm">
                                We do not believe in fashion that is fleeting. Our commitment is to create pieces
                                that stand as a testament to durability and grace. Every material is vetted, every
                                process is scrutinized, and every finished product is a promise of excellence.
                            </p>
                            <Link
                                href="/shop"
                                className="inline-flex items-center justify-center border border-[#c9a84c] text-[#c9a84c] px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase rounded-md hover:bg-[#c9a84c] hover:text-black transition-all duration-300"
                            >
                                Discover Our Standards
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== CTA BANNER ===== */}
            <section className="py-20 md:py-24 border-t border-white/[0.06] bg-[#0b0d12]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-lg md:text-xl text-white/80 mb-4 font-light">
                        Wrap yourself in a century of artistry.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-[#c9a84c] uppercase border-b border-[#c9a84c] pb-0.5 hover:text-[#e0bc6a] hover:border-[#e0bc6a] transition-colors"
                    >
                        Shop the Anniversary Collection
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    );
}