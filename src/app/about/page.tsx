import Navbar from "@/components/storefront/Navbar";
import { Scissors, Globe, ShieldCheck, Heart, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative py-16 sm:py-24 border-b border-border">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                        Al Faizan <span className="text-primary">Story</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Crafting elegance, one scarf at a time. Discover the passion behind every piece.
                    </p>
                </div>
            </section>

            {/* Heritage Section */}
            <section className="py-16 sm:py-24 bg-secondary/40">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <p className="text-primary font-semibold uppercase tracking-wider text-sm">
                                    Our Heritage
                                </p>
                                <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                                    Rooted in Pakistani Tradition
                                </h2>
                            </div>
                            <div className="space-y-4 text-muted-foreground leading-relaxed">
                                <p>
                                    At Al Faizan, we believe that a scarf is more than just an accessory—it is a statement of grace, identity, and timeless fashion. Born from a passion for exquisite textiles and a deep respect for Pakistani heritage, our marketplace was created to bring the finest fabrics directly to your doorstep.
                                </p>
                                <p>
                                    From the breathable comfort of summer lawn to the luxurious drape of premium silk and winter pashminas, every piece in our collection is meticulously selected. We blend modern aesthetics with traditional craftsmanship, ensuring that whether you're dressing for an everyday errand or a formal evening, you do so with unparalleled elegance.
                                </p>
                            </div>
                        </div>

                        <div className="relative h-96 rounded-2xl overflow-hidden border border-border">
                            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent"></div>
                            <Image
                                src="/logo.png"
                                alt="Al Faizan Heritage"
                                fill
                                className="object-contain opacity-50"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 sm:py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                            The Al Faizan Standard
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            Five core values that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="group p-8 bg-secondary/40 border border-border rounded-xl hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <Globe size={28} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Made in Pakistan
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We take immense pride in our roots. Pakistan's textile heritage is world-renowned, and we source our fabrics locally to support master weavers and artisans.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="group p-8 bg-secondary/40 border border-border rounded-xl hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <Scissors size={28} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Uncompromising Quality
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Every thread is inspected. We use strict quality control measures to ensure that every scarf carrying the Al Faizan name is absolutely flawless.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="group p-8 bg-secondary/40 border border-border rounded-xl hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <ShieldCheck size={28} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Trust & Security
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                With our secure Cash on Delivery (COD) system across Pakistan, you can shop with complete peace of mind, paying only when elegance is in your hands.
                            </p>
                        </div>

                        {/* Value 4 */}
                        <div className="group p-8 bg-secondary/40 border border-border rounded-xl hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <Heart size={28} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Customer Care
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                Your satisfaction is our priority. We offer dedicated support and ensure every customer experience is memorable and delightful.
                            </p>
                        </div>

                        {/* Value 5 */}
                        <div className="group p-8 bg-secondary/40 border border-border rounded-xl hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <Zap size={28} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Fast Delivery
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                We ensure your scarves reach you quickly and safely. Efficient logistics mean your order arrives looking pristine.
                            </p>
                        </div>

                        {/* Value 6 */}
                        <div className="group p-8 bg-secondary/40 border border-border rounded-xl hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                <Scissors size={28} className="text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground mb-3">
                                Diverse Collection
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                From traditional designs to contemporary styles, we curate a diverse range to suit every taste, occasion, and season.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 sm:py-24 bg-linear-to-r from-primary/10 via-secondary/40 to-primary/10 border-y border-border">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        <div className="text-center">
                            <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">500+</p>
                            <p className="text-muted-foreground">Happy Customers</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">100%</p>
                            <p className="text-muted-foreground">Authentic Scarves</p>
                        </div>
                        <div className="text-center">
                            <p className="text-4xl sm:text-5xl font-bold text-primary mb-2">50+</p>
                            <p className="text-muted-foreground">Unique Designs</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-24">
                <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
                        Experience Al Faizan
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8">
                        Join thousands of customers who have discovered the perfect scarf. Browse our exclusive collection and elevate your style.
                    </p>
                    <Link
                        href="/shop"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                    >
                        Shop Now
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border bg-secondary/20 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-muted-foreground mb-4">
                        Crafted with passion. Made in Pakistan.
                    </p>
                    <p className="text-sm text-muted-foreground">
                        &copy; 2024 Al Faizan. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
