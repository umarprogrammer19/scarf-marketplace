import Navbar from "@/components/storefront/Navbar";
import { Scissors, Globe, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1">
                {/* Header Section */}
                <section className="py-20 text-center container mx-auto px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-serif text-gold mb-6 tracking-wide uppercase">
                        Al Faizan
                    </h1>
                    <p className="text-xl text-text-muted leading-relaxed">
                        Redefining elegance with premium, handcrafted scarves.
                        Proudly designed and manufactured in Pakistan.
                    </p>
                </section>

                {/* Story Section */}
                <section className="py-16 bg-surface border-y border-gray-800">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-3xl font-serif text-text-main mb-6">Our Heritage</h2>
                        <div className="prose prose-invert max-w-none text-text-muted text-lg leading-loose space-y-6">
                            <p>
                                At Al Faizan, we believe that a scarf is more than just an accessory; it is a statement of grace, identity, and timeless fashion. Born from a passion for exquisite textiles, our marketplace was built to bring the finest fabrics directly to your doorstep.
                            </p>
                            <p>
                                From the breathable comfort of summer lawn to the luxurious drape of premium silk and winter pashminas, every piece in our collection is meticulously selected. We blend modern aesthetics with traditional craftsmanship, ensuring that whether you are dressing for an everyday errand or a formal evening, you do so with unparalleled elegance.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values Section */}
                <section className="py-24 container mx-auto px-4 max-w-5xl">
                    <h2 className="text-3xl font-serif text-center text-text-main mb-16">The Al Faizan Standard</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                                <Globe size={32} className="text-gold" />
                            </div>
                            <h3 className="text-xl font-serif text-text-main mb-3">Made in Pakistan</h3>
                            <p className="text-text-muted">
                                We take immense pride in our roots. Pakistan's textile heritage is world-renowned, and we source our fabrics locally to support master weavers and artisans.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                                <Scissors size={32} className="text-gold" />
                            </div>
                            <h3 className="text-xl font-serif text-text-main mb-3">Uncompromising Quality</h3>
                            <p className="text-text-muted">
                                Every thread is inspected. We utilize strict quality control measures to ensure that every scarf that carries the Al Faizan name is absolutely flawless.
                            </p>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                                <ShieldCheck size={32} className="text-gold" />
                            </div>
                            <h3 className="text-xl font-serif text-text-main mb-3">Trust & Convenience</h3>
                            <p className="text-text-muted">
                                With our secure Cash on Delivery (COD) system across Pakistan, you can shop with complete peace of mind, paying only when the elegance is in your hands.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}