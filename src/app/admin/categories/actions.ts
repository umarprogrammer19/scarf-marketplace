"use server";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function createCategory(formData: FormData) {
    const name = formData.get("name") as string;

    if (!name) return;

    // Create a URL-friendly slug (e.g., "Silk Scarves" -> "silk-scarves")
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    try {
        await db.insert(categories).values({
            name,
            slug,
        });

        // This tells Next.js to refresh the page automatically so the new category shows up
        revalidatePath("/admin/categories");
    } catch (error) {
        console.error("Failed to create category:", error);
        throw new Error("Failed to create category. It might already exist.");
    }
}