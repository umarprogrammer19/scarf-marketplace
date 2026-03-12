"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createProduct(data: {
    name: string;
    categoryId: number;
    description: string;
    price: string;
    stockQuantity: number;
    imageUrl: string;
    isNew: boolean;
    isOnSale: boolean;
}) {
    const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        await db.insert(products).values({
            name: data.name,
            slug,
            categoryId: data.categoryId,
            description: data.description,
            price: data.price,
            stockQuantity: data.stockQuantity,
            imageUrl: data.imageUrl,
            isNew: data.isNew,
            isOnSale: data.isOnSale,
        });

        revalidatePath("/admin/products");
        return { success: true };
    } catch (error) {
        console.error("Database Error:", error);
        return { success: false, error: "Failed to create product." };
    }
}