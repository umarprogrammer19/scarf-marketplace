import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import Navbar from "@/components/storefront/Navbar";
import ProductCard from "@/components/storefront/ProductCard";
import { ChevronRight, Truck, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const latestProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(8); // 8 is a cleaner number for 4-column editorial grids

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      {/* Cinematic Hero Section */}
      <section className="relative w-full h-[85vh] min-h-150 flex items-center justify-center overflow-hidden">
        {/* Deep, rich background image with heavy gradient for text readability */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-no-repeat opacity-40"></div>
        <div className="absolute inset-0 bg-linear-to-b from-background/40 via-background/60 to-background"></div>

        {/* Subtle glowing orb for depth */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-150 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 border border-primary/30 bg-background/50 backdrop-blur-md rounded-full">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
              The Winter Collection
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-8xl  text-foreground mb-6 leading-[1.1] tracking-tight">
            Elegance Woven <br className="hidden md:block" />
            <span className="text-primary italic">with Tradition</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl font-light leading-relaxed">
            Discover our exquisite collection of premium luxury scarves. Masterfully crafted in Pakistan for the modern wardrobe.
          </p>

          <Link
            href="/shop"
            className="group relative inline-flex items-center justify-center gap-3 bg-primary text-primary-foreground px-10 py-5 font-bold tracking-widest uppercase text-sm transition-all duration-300 hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)]"
          >
            Explore the Collection
            <ChevronRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Glassmorphism Trust Bar */}
      <section className="relative z-20 -mt-10 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-border/50 backdrop-blur-xl border border-border/50 rounded-2xl overflow-hidden shadow-2xl">
          <div className="flex items-center justify-center gap-4 bg-card/80 p-8">
            <Truck className="text-primary" size={28} />
            <div>
              <p className=" text-lg text-foreground">Nationwide Delivery</p>
              <p className="text-sm text-muted-foreground">Fast shipping across Pakistan</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-card/80 p-8">
            <ShieldCheck className="text-primary" size={28} />
            <div>
              <p className=" text-lg text-foreground">Cash on Delivery</p>
              <p className="text-sm text-muted-foreground">Pay securely at your doorstep</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 bg-card/80 p-8">
            <Sparkles className="text-primary" size={28} />
            <div>
              <p className=" text-lg text-foreground">Premium Quality</p>
              <p className="text-sm text-muted-foreground">100% authentic fine fabrics</p>
            </div>
          </div>
        </div>
      </section>

      {/* Curated Collection Grid */}
      <section className="py-24 md:py-32">
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl  text-foreground mb-4">Curated Arrivals</h2>
              <p className="text-lg text-muted-foreground font-light">
                Our latest selection of handcrafted masterpieces, designed to elevate your everyday elegance.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-primary hover:text-primary-foreground hover:bg-primary px-6 py-3 border border-primary transition-all duration-300"
            >
              View Gallery
              <ChevronRight size={16} />
            </Link>
          </div>

          {latestProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
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
          ) : (
            <div className="text-center py-32 bg-secondary/20 rounded-2xl border border-border">
              <p className="text-xl text-muted-foreground font-light">The gallery is currently being updated.</p>
            </div>
          )}
        </div>
      </section>

      {/* Editorial Footer (Minimalist & Clean) */}
      <footer className="border-t border-border bg-background pt-24 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"></div>
        <div className="max-w-350 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <h3 className=" text-3xl text-primary tracking-widest uppercase mb-6">Al Faizan</h3>
              <p className="text-muted-foreground font-light leading-relaxed max-w-sm">
                Redefining elegance with premium, handcrafted scarves. Proudly designed and manufactured in Pakistan.
              </p>
            </div>

            <div className="md:col-span-2 md:col-start-8">
              <h4 className="font-bold tracking-widest uppercase text-xs text-foreground mb-6">Boutique</h4>
              <ul className="space-y-4">
                <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors font-light">Shop All</Link></li>
                <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors font-light">Our Heritage</Link></li>
                <li><Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors font-light">Your Cart</Link></li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-bold tracking-widest uppercase text-xs text-foreground mb-6">Concierge</h4>
              <ul className="space-y-4">
                <li className="text-muted-foreground font-light">+92 300 123 4567</li>
                <li className="text-muted-foreground font-light">support@alfaizan.com</li>
                <li className="text-muted-foreground font-light pt-2">Karachi, Pakistan</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground tracking-wider uppercase font-light">
            <p>&copy; {new Date().getFullYear()} Al Faizan. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary transition-colors">Instagram</Link>
              <Link href="#" className="hover:text-primary transition-colors">Facebook</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}