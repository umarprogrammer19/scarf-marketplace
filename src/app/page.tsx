import Hero from "@/components/home/hero-section";
import NewArrivals from "@/components/home/new-arrivals";
import Footer from "@/components/storefront/Footer";
import Navbar from "@/components/storefront/Navbar";
import ProductCard from "@/components/storefront/ProductCard";
import ProductCarousel3D from "@/components/storefront/ProductCarousel3D";
import ScrollReveal from "@/components/storefront/ScrollReveal";
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import { Award, ChevronRight, Diamond, Paintbrush, Sparkles } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
    const latestProducts = await db
        .select()
        .from(products)
        .orderBy(desc(products.createdAt))
        .limit(8);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* ===== HERO SECTION ===== */}
            <Hero />
            {/* <section className="relative w-full min-h-[85vh] flex items-center overflow-hidden pt-16">
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                        <div className="max-w-lg">
                            <ScrollReveal delay={100}>
                                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-primary/30 bg-primary/5 rounded-full">
                                    <span className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase">
                                        Premium Accessories
                                    </span>
                                </div>
                            </ScrollReveal>

                            <ScrollReveal delay={250}>
                                <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-foreground mb-6 leading-[1.15]">
                                    Elevate Your<br />
                                    Style with<br />
                                    <span className="text-primary italic font-serif">Luxury Silk</span>
                                </h1>
                            </ScrollReveal>

                            <ScrollReveal delay={400}>
                                <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed max-w-sm">
                                    Discover our curated collection of premium and elegant scarves, hand-crafted for the modern visionary.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal delay={550}>
                                <div className="flex flex-col gap-3 max-w-xs">
                                    <Link
                                        href="/shop"
                                        className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3 font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] rounded-md"
                                    >
                                        Shop the Collection
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="inline-flex items-center justify-center gap-2 border border-foreground/30 text-foreground px-7 py-3 font-bold text-xs tracking-[0.15em] uppercase transition-all duration-300 hover:border-primary hover:text-primary rounded-md"
                                    >
                                        View Lookbook
                                    </Link>
                                </div>
                            </ScrollReveal>
                        </div>

                        <ScrollReveal delay={300} direction="left">
                            <div className="hidden lg:flex justify-end">
                                <div className="relative w-[400px] h-[520px] rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 animate-[float_6s_ease-in-out_infinite]">
                                    <Image
                                        src="/home.png"
                                        alt="Luxury Silk Scarf Model"
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    <div className="absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section> */}

            {/* ===== 3D ROTATING CAROUSEL — Exclusive Collection ===== */}
            {/* {latestProducts.length > 0 && (
                <section className="py-20 md:py-28 relative overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/[0.03] blur-[120px] pointer-events-none" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal>
                            <div className="text-center mb-16">
                                <span className="text-[10px] font-bold tracking-[0.3em] text-primary/60 uppercase block mb-3">
                                    Exclusive Collection
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-serif italic">
                                    Our Latest Arrivals
                                </h2>
                                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                                    Explore our handcrafted masterpieces — hover to pause, click to discover
                                </p>
                            </div>
                        </ScrollReveal>

                        <ScrollReveal>
                            <div className="h-[380px] flex items-center justify-center">
                                <ProductCarousel3D
                                    products={latestProducts.map((p) => ({
                                        id: String(p.id),
                                        name: p.name,
                                        price: Number(p.price),
                                        image: p.imageUrl,
                                        slug: p.slug,
                                        isNew: p.isNew ?? false,
                                        isOnSale: p.isOnSale ?? false,
                                    }))}
                                />
                            </div>
                        </ScrollReveal>

                        <div className="text-center mt-10">
                            <Link
                                href="/shop"
                                className="inline-flex items-center gap-2 border border-primary/40 text-primary px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase rounded-full hover:bg-primary hover:text-black transition-all duration-300"
                            >
                                View All Products <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </section>
            )} */}

            {/* ===== PRODUCTS GRID ===== */}
            <NewArrivals />
            {/* {latestProducts.length > 0 && (
                <section className="py-16 md:py-20 border-t border-white/4">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <ScrollReveal>
                            <div className="text-center mb-12">
                                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">Shop All</h2>
                                <p className="text-sm text-muted-foreground">Handcrafted masterpieces for your wardrobe</p>
                            </div>
                        </ScrollReveal>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10">
                            {latestProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    id={String(product.id)}
                                    name={product.name}
                                    price={Number(product.price)}
                                    image={product.imageUrl}
                                    isNew={product.isNew}
                                    isOnSale={product.isOnSale}
                                    slug={product.slug}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )} */}

            {/* ===== BRAND STORY ===== */}
            <section className="py-20 md:py-24 border-t border-border">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <ScrollReveal>
                        <div className="flex items-center justify-center gap-1 text-primary mb-5">
                            <Sparkles size={16} />
                            <Diamond size={20} />
                            <Sparkles size={16} />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-5 font-serif italic">Our Brand Story</h2>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-12 max-w-xl mx-auto">
                            &ldquo;Crafting elegance since 1920, our scarves are sourced from the finest materials across the globe, ensuring unmatched quality and timeless style.&rdquo;
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-3 gap-6">
                        {[
                            { icon: Award, title: "Heritage", desc: "Decades of craftsmanship" },
                            { icon: Diamond, title: "Quality", desc: "100% authentic fibers" },
                            { icon: Paintbrush, title: "Design", desc: "Modern sophistication" },
                        ].map((item, i) => (
                            <ScrollReveal key={item.title} delay={i * 150}>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                                        <item.icon size={20} className="text-primary" />
                                    </div>
                                    <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== NEWSLETTER ===== */}
            <ScrollReveal>
                <section className="py-14 md:py-16 bg-card border-y border-border">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="max-w-md">
                                <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                                    Join the Al Faizan Inner Circle
                                </h2>
                                <p className="text-sm text-muted-foreground">
                                    Receive exclusive previews of our seasonal collections and styling tips from fashion experts.
                                </p>
                            </div>
                            <div className="flex w-full md:w-auto">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="flex-1 md:w-64 bg-secondary border border-border rounded-l-lg px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary transition-colors"
                                />
                                <button className="bg-primary text-primary-foreground px-5 py-2.5 rounded-r-lg font-bold text-xs tracking-wider uppercase hover:bg-primary/90 transition-colors whitespace-nowrap">
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </ScrollReveal>

            <Footer />
        </div>
    );
}
