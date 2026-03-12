// src/app/page.tsx
import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";

// Next.js will revalidate this page every 60 seconds so new products show up quickly
export const revalidate = 60;

export default async function Home() {
  // Fetch the 8 newest products from the database
  const latestProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt))
    .limit(8);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center bg-surface overflow-hidden border-b border-gray-800">
          <div className="absolute inset-0 bg-[url('/hero-bg-placeholder.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif text-text-main mb-6 leading-tight">
              Elegance Woven in Every Thread
            </h1>
            <p className="text-lg text-text-muted mb-10 max-w-xl mx-auto">
              Discover our latest collection of premium scarves, meticulously crafted in Pakistan for the modern wardrobe.
            </p>
            <Link
              href="/shop"
              className="inline-block bg-gold hover:bg-gold-hover text-background font-bold text-lg py-4 px-10 rounded-full transition-colors uppercase tracking-wide"
            >
              Shop the Collection
            </Link>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="py-24 container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-gold mb-2">New Arrivals</h2>
              <p className="text-text-muted">The latest additions to our premium collection.</p>
            </div>
            <Link href="/shop" className="hidden md:block text-text-main hover:text-gold transition-colors border-b border-gold pb-1">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProducts.length === 0 ? (
              <p className="text-text-muted col-span-full text-center py-10">No products found. Add some from the admin panel!</p>
            ) : (
              latestProducts.map((product) => (
                <Link href={`/product/${product.slug}`} key={product.id} className="group flex flex-col">
                  {/* Product Image Container */}
                  <div className="relative aspect-4/5 bg-surface rounded-xl overflow-hidden border border-gray-800 mb-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="bg-text-main text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          New
                        </span>
                      )}
                      {product.isOnSale && (
                        <span className="bg-gold text-background text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          Sale
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Product Details */}
                  <h3 className="text-lg font-serif text-text-main group-hover:text-gold transition-colors truncate">
                    {product.name}
                  </h3>
                  <p className="text-text-muted mt-1 font-medium">
                    Rs. {Number(product.price).toLocaleString()}
                  </p>
                </Link>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}