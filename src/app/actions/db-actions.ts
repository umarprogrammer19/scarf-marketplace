"use server";

import { db } from "@/db";

export async function getAllProducts() {
    // This query uses the relations we just defined!
    const dbProducts = await db.query.products.findMany({
        with: {
            category: true, // This tells Drizzle to JOIN the categories table automatically
        },
        orderBy: (products, { desc }) => [desc(products.createdAt)],
    });

    // We map it to match your mockData format exactly so the UI doesn't break
    return dbProducts.map((p) => ({
        id: String(p.id),
        name: p.name,
        price: Number(p.price),
        originalPrice: p.originalPrice ? Number(p.originalPrice) : undefined,
        description: p.description,
        fabric: p.fabric || "",
        dimensions: p.dimensions || "",
        color: p.color || "",
        category: p.category.name, // Extracted from the relation!
        image: p.image,
        images: p.images || [p.image],
        inStock: p.inStock,
        featured: p.featured,
        isNew: p.isNew,
        isFlashSale: p.isFlashSale,
    }));
}