import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";
import { ArrowLeft, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import AddToCartButton from "@/components/storefront/AddToCartButton";

interface ProductPageProps {
    params: {
        slug: string;
    };
}

export default async function ProductPage({ params }: ProductPageProps) {
    // 1. Fetch the exact product from Neon DB matching the slug in the URL
    const { slug } = await params;
    const productArray = await db
        .select()
        .from(products)
        .where(eq(products.slug, slug))
        .limit(1);

    const product = productArray[0];

    // 2. If the product doesn't exist, trigger Next.js 404 page
    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-12">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center text-text-muted hover:text-gold transition-colors mb-8">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Home
                </Link>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">

                    {/* Left Column: Product Image */}
                    <div className="relative aspect-4/5 bg-surface rounded-2xl overflow-hidden border border-gray-800">
                        <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="object-cover w-full h-full"
                        />
                        {/* Badges */}
                        <div className="absolute top-6 left-6 flex flex-col gap-3">
                            {product.isNew && (
                                <span className="bg-text-main text-background text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                    New Arrival
                                </span>
                            )}
                            {product.isOnSale && (
                                <span className="bg-gold text-background text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                                    On Sale
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Product Details */}
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl md:text-5xl  text-text-main mb-4 leading-tight">
                            {product.name}
                        </h1>

                        <p className="text-3xl font-medium text-gold mb-8">
                            Rs. {Number(product.price).toLocaleString()}
                        </p>

                        <div className="prose prose-invert max-w-none text-text-muted mb-10 text-lg leading-relaxed">
                            <p>{product.description}</p>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-8">
                            {product.stockQuantity > 0 ? (
                                <span className="inline-flex items-center text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                    In Stock ({product.stockQuantity} available)
                                </span>
                            ) : (
                                <span className="inline-flex items-center text-red-500 bg-red-500/10 px-3 py-1 rounded-full text-sm font-medium">
                                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Add to Cart Button (Placeholder for next step) */}
                        <AddToCartButton product={{
                            id: product.id,
                            name: product.name,
                            price: product.price as string,
                            imageUrl: product.imageUrl,
                            stockQuantity: product.stockQuantity
                        }} />

                        {/* Trust Badges */}
                        <div className="grid grid-cols-2 gap-4 border-t border-gray-800 pt-8 mt-4">
                            <div className="flex items-center gap-3 text-text-muted">
                                <ShieldCheck size={24} className="text-gold" />
                                <span className="text-sm font-medium">Premium Quality Guarantee</span>
                            </div>
                            <div className="flex items-center gap-3 text-text-muted">
                                <Truck size={24} className="text-gold" />
                                <span className="text-sm font-medium">Cash on Delivery Available</span>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}