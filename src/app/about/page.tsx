import { Award, Heart, Globe, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-20">
            {/* Hero */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black via-black/90 to-black">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-6 py-2 bg-gold/10 border border-gold/30 rounded-full text-gold text-sm tracking-wider mb-6">
                        OUR STORY
                    </span>
                    <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6">
                        Crafting Luxury
                        <br />
                        <span className="text-gold">Since 1950</span>
                    </h1>
                    <p className="text-xl text-white/70 leading-relaxed">
                        A heritage of excellence in handcrafted luxury scarves, bringing Pakistani artisanal traditions to the world
                    </p>
                </div>
            </section>

            {/* Our Heritage */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl text-white mb-6">
                                Rooted in Pakistani Heritage
                            </h2>
                            <div className="space-y-6 text-white/70 leading-relaxed">
                                <p>
                                    For over seven decades, Luxe Scarves has been at the forefront of luxury textile craftsmanship in Pakistan. Our journey began in the bustling markets of Lahore, where our founder discovered the timeless art of scarf-making from master artisans.
                                </p>
                                <p>
                                    Every scarf we create is a testament to Pakistan's rich cultural heritage and our unwavering commitment to quality. We work directly with local artisans, preserving centuries-old techniques while embracing contemporary design sensibilities.
                                </p>
                                <p>
                                    From the finest Kashmiri pashmina to hand-painted silk, each piece tells a story of dedication, skill, and passion. Our scarves are more than accessories—they are wearable art, connecting you to the heart of Pakistani craftsmanship.
                                </p>
                            </div>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800"
                                alt="Artisan crafting"
                                className="rounded-2xl border border-white/10"
                            />
                            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-gold/10 rounded-full blur-3xl -z-10" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-black/50 to-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl text-white mb-6">Our Values</h2>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                icon: Award,
                                title: "Excellence",
                                desc: "Uncompromising quality in every thread",
                            },
                            {
                                icon: Heart,
                                title: "Passion",
                                desc: "Love for the craft drives us forward",
                            },
                            {
                                icon: Globe,
                                title: "Sustainability",
                                desc: "Ethical sourcing and eco-friendly practices",
                            },
                            {
                                icon: Shield,
                                title: "Authenticity",
                                desc: "100% genuine, handcrafted products",
                            },
                        ].map((value) => (
                            <div
                                key={value.title}
                                className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 text-center hover:border-gold/30 transition-all duration-500 backdrop-blur-sm"
                            >
                                <div className="w-16 h-16 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <value.icon className="w-8 h-8 text-gold" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-white/60">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Made in Pakistan */}
            <section className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-linear-to-br from-gold/10 to-gold/5 border border-gold/30 rounded-3xl p-12 backdrop-blur-sm">
                        <div className="text-6xl mb-6">🇵🇰</div>
                        <h2 className="text-4xl md:text-5xl text-white mb-6">
                            Proudly Made in Pakistan
                        </h2>
                        <p className="text-xl text-white/70 leading-relaxed mb-8">
                            Every scarf is handcrafted by skilled Pakistani artisans, supporting local communities and preserving traditional craftsmanship for future generations.
                        </p>
                        <p className="text-gold font-semibold text-lg">
                            When you buy from Luxe Scarves, you're supporting Pakistani heritage
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
