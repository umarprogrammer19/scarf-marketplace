import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import EditForm from "./EditForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// 1. Update the type to reflect that params is a Promise
export default async function EditProductPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    // 2. Await the params before using them!
    const resolvedParams = await params;
    const productId = Number(resolvedParams.id);

    // Fetch the specific product using the resolved ID
    const productData = await db
        .select()
        .from(products)
        .where(eq(products.id, productId))
        .limit(1);

    const product = productData[0];

    // If someone types a random ID in the URL, show 404
    if (!product) {
        notFound();
    }

    // Fetch categories for the dropdown
    const allCategories = await db.select().from(categories);

    return (
        <div className="max-w-4xl mx-auto">
            <Link
                href="/admin/products"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
                <ArrowLeft size={16} /> Back to Inventory
            </Link>

            <div className="mb-8">
                <h1 className="text-4xl font-serif text-foreground mb-2">Edit Product</h1>
                <p className="text-muted-foreground">Update the details for "{product.name}"</p>
            </div>

            {/* Pass the data to our Client Form component */}
            <EditForm product={product} categories={allCategories} />
        </div>
    );
}