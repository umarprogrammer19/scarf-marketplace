import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import Navbar from "@/components/storefront/Navbar";
import ProductCard from "@/components/storefront/ProductCard";
import { ChevronRight, Sparkles, Truck, Shield, Award } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const revalidate = 60;

export default async function HomePage() {
  const latestProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(12);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-screen max-h-96 sm:max-h-screen bg-linear-to-br from-background via-secondary to-background overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">
                  Premium Luxury Scarves
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Elegance Woven with <span className="text-primary">Tradition</span>
              </h1>

              <p className="text-lg text-muted-foreground max-w-xl">
                Discover our exquisite collection of premium scarves, handcrafted with the finest fabrics from Pakistan. Each piece tells a story of elegance and craftsmanship.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  Shop Now
                  <ChevronRight size={20} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 border border-primary/30 hover:border-primary/60 text-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                >
                  Our Story
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <p className="text-2xl font-bold text-primary">500+</p>
                  <p className="text-sm text-muted-foreground">Happy Customers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">100%</p>
                  <p className="text-sm text-muted-foreground">Authentic</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">24/7</p>
                  <p className="text-sm text-muted-foreground">Support</p>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative h-96 hidden md:block">
              <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent rounded-2xl"></div>
              <Image
                src="/logo.png"
                alt="Al Faizan"
                fill
                className="object-contain opacity-50 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 sm:py-16 bg-secondary/40 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Truck className="text-primary" size={24} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Free Delivery</p>
                <p className="text-sm text-muted-foreground">Across Pakistan via COD</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="text-primary" size={24} />
              </div>
              <div>
                <p className="font-semibold text-foreground">100% Secure</p>
                <p className="text-sm text-muted-foreground">Cash on Delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Award className="text-primary" size={24} />
              </div>
              <div>
                <p className="font-semibold text-foreground">Premium Quality</p>
                <p className="text-sm text-muted-foreground">Guaranteed authentic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                Featured Collection
              </h2>
              <p className="text-muted-foreground">
                Handpicked premium scarves for every occasion
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden sm:flex items-center gap-2 text-primary hover:text-primary/80 font-semibold transition-colors"
            >
              View All
              <ChevronRight size={20} />
            </Link>
          </div>

          {/* Products Grid */}
          {latestProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {latestProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={String(product.id)}
                  name={product.name}
                  price={Number(product.price)}
                  image={product.imageUrl}
                  isNew={product.isNew}
                  isOnSale={product.isOnSale}
                  rating={4.5}
                  slug={product.slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">
                No products available yet. Check back soon!
              </p>
              <Link
                href="/admin/products"
                className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Add Products
              </Link>
            </div>
          )}

          <div className="flex sm:hidden mt-8">
            <Link
              href="/shop"
              className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View All Products
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 bg-linear-to-r from-primary/10 via-secondary to-primary/10 border-t border-border">
        <div className="max-w-3xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Ready to Elevate Your Style?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Browse our exclusive collection and find the perfect scarf for every moment.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            Shop Now
            <ChevronRight size={20} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">About Al Faizan</h3>
              <p className="text-sm text-muted-foreground">
                Premium scarves handcrafted in Pakistan with passion and precision.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/shop"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Shop
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Support</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="tel:+923001234567"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    0300 1234567
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:support@alfaizan.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    support@alfaizan.com
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-4">Follow Us</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Al Faizan. Made in Pakistan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
