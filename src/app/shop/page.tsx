import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";
import Navbar from "@/components/storefront/Navbar";
import ProductCard from "@/components/storefront/ProductCard";
// import ProductFilters from "@/components/storefront/ProductFilters";

export const revalidate = 60;

export default async function ShopPage() {
    const allProducts = await db
        .select()
        .from(products)
        .orderBy(desc(products.createdAt));

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Page Header */}
            <section className="border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                        Our Collection
                    </h1>
                    <p className="text-muted-foreground">
                        Discover {allProducts.length} premium scarves
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Products Grid */}
                {allProducts.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allProducts.map((product) => (
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
                    <div className="text-center py-20 bg-secondary/20 rounded-xl border border-border">
                        <p className="text-muted-foreground mb-4">No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
