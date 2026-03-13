import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";

// Revalidate every 60 seconds so new inventory shows up automatically
export const revalidate = 60;

export default async function ShopPage() {
    // Fetch all products from the database
    const allProducts = await db
        .select()
        .from(products)
        .orderBy(desc(products.createdAt));

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-16">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif text-text-main mb-4">The Complete Collection</h1>
                    <p className="text-text-muted text-lg">
                        Explore our full range of premium scarves, from everyday lawn to luxury winter pashminas.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {allProducts.length === 0 ? (
                        <div className="col-span-full text-center py-20 bg-surface rounded-2xl border border-gray-800">
                            <p className="text-text-muted text-lg">No products available at the moment.</p>
                        </div>
                    ) : (
                        allProducts.map((product) => (
                            <Link href={`/product/${product.slug}`} key={product.id} className="group flex flex-col">
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
            </main>
        </div>
    );
}