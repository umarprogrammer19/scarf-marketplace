// src/app/admin/products/actions.ts
"use server";

import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function getCategories() {
    return await db.select().from(categories);
}

export async function createProduct(data: {
    name: string;
    categoryId: number;
    description: string;
    price: string;
    originalPrice?: string;
    fabric: string;
    dimensions: string;
    color: string;
    image: string;
    inStock: boolean;
    isNew: boolean;
    isFlashSale: boolean;
}) {
    // Automatically generate a URL-friendly slug (e.g., "Midnight Blue Silk" -> "midnight-blue-silk")
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        await db.insert(products).values({
            name: data.name,
            slug: slug,
            categoryId: data.categoryId,
            description: data.description,
            price: data.price,
            originalPrice: data.originalPrice || null,
            fabric: data.fabric,
            dimensions: data.dimensions,
            color: data.color,
            image: data.image,
            images: [data.image], // Wrapping the main image in an array for the gallery
            inStock: data.inStock,
            isNew: data.isNew,
            isFlashSale: data.isFlashSale,
        });

        // Tell Next.js to refresh the products page so the new item shows up instantly
        revalidatePath("/admin/products");
        revalidatePath("/shop"); // Refresh the public shop too
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to create product in database." };
    }
}

// export async function deleteProduct(id: number) {
//     try {
//         await db.delete(products).where(eq(products.id, id));
//         revalidatePath("/admin/products");
//         return { success: true };
//     } catch (error) {
//         console.error("Failed to delete product:", error);
//         return { success: false, error: "Failed to delete product." };
//     }
// }

// export async function updateProduct(id: number, data: {
//     name: string;
//     categoryId: number;
//     description: string;
//     price: string;
//     stockQuantity: number;
//     imageUrl: string;
//     isNew: boolean;
//     isOnSale: boolean;
// }) {
//     const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

//     try {
//         await db.update(products).set({
//             name: data.name,
//             slug,
//             categoryId: data.categoryId,
//             description: data.description,
//             price: data.price,
//             stockQuantity: data.stockQuantity,
//             imageUrl: data.imageUrl,
//             isNew: data.isNew,
//             isOnSale: data.isOnSale,
//         }).where(eq(products.id, id));

//         revalidatePath("/admin/products");
//         return { success: true };
//     } catch (error) {
//         console.error("Failed to update product:", error);
//         return { success: false, error: "Failed to update product." };
//     }
// }