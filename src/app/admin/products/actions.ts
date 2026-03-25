"use server";

import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function getCategories() {
    return await db.select().from(categories);
}

export async function createProduct(data: {
    name: string; categoryId: number; description: string; price: string;
    originalPrice?: string; fabric: string; dimensions: string; color: string;
    image: string; stockQuantity: number; inStock: boolean; isNew: boolean; isFlashSale: boolean;
}) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        await db.insert(products).values({
            name: data.name, slug: slug, categoryId: data.categoryId, description: data.description,
            price: data.price, originalPrice: data.originalPrice || null, fabric: data.fabric,
            dimensions: data.dimensions, color: data.color, image: data.image, images: [data.image],
            stockQuantity: data.stockQuantity, inStock: data.stockQuantity > 0, // Auto out-of-stock if 0
            isNew: data.isNew, isFlashSale: data.isFlashSale,
        });

        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to create product." };
    }
}

export async function updateProduct(id: string, data: {
    name: string; categoryId: number; description: string; price: string;
    originalPrice?: string; fabric: string; dimensions: string; color: string;
    image: string; stockQuantity: number; inStock: boolean; isNew: boolean; isFlashSale: boolean;
}) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        await db.update(products).set({
            name: data.name, slug: slug, categoryId: data.categoryId, description: data.description,
            price: data.price, originalPrice: data.originalPrice || null, fabric: data.fabric,
            dimensions: data.dimensions, color: data.color, image: data.image,
            stockQuantity: data.stockQuantity, inStock: data.stockQuantity > 0,
            isNew: data.isNew, isFlashSale: data.isFlashSale,
        }).where(eq(products.id, Number(id)));

        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to update product." };
    }
}

export async function deleteProduct(id: string) {
    try {
        await db.delete(products).where(eq(products.id, Number(id)));
        revalidatePath("/admin/products");
        revalidatePath("/shop");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to delete product." };
    }
}