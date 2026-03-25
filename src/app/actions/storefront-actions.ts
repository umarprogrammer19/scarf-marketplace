"use server";

import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { Product } from "@/types";

// Helper function to map DB rows to your exact UI format
function mapProductToUI(dbProduct: any): Product {
    return {
        id: String(dbProduct.id),
        name: dbProduct.name,
        price: Number(dbProduct.price),
        originalPrice: dbProduct.originalPrice ? Number(dbProduct.originalPrice) : undefined,
        description: dbProduct.description,
        fabric: dbProduct.fabric || "",
        dimensions: dbProduct.dimensions || "",
        color: dbProduct.color || "",
        category: dbProduct.category?.name || "Uncategorized", 
        image: dbProduct.image,
        images: dbProduct.images || [dbProduct.image],
        
        stockQuantity: dbProduct.stockQuantity || 0, // <--- ADD THIS LINE
        
        inStock: dbProduct.inStock,
        featured: dbProduct.featured,
        isNew: dbProduct.isNew,
        isFlashSale: dbProduct.isFlashSale,
    };
}

// 1. Fetch ALL products for the Shop Page
export async function getAllProducts(): Promise<Product[]> {
    try {
        const data = await db.query.products.findMany({
            with: { category: true }, // Automatically joins the category table
            orderBy: [desc(products.createdAt)],
        });
        return data.map(mapProductToUI);
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

// 2. Fetch a SINGLE product for the Product Detail Page
export async function getProductById(id: string): Promise<Product | null> {
    try {
        const data = await db.query.products.findFirst({
            where: eq(products.id, Number(id)),
            with: { category: true },
        });

        if (!data) return null;
        return mapProductToUI(data);
    } catch (error) {
        console.error("Failed to fetch product:", error);
        return null;
    }
}

// 3. Fetch FEATURED products for the Home Page New Arrivals
export async function getFeaturedProducts(): Promise<Product[]> {
    try {
        const data = await db.query.products.findMany({
            where: eq(products.featured, true),
            with: { category: true },
            limit: 8,
            orderBy: [desc(products.createdAt)],
        });
        return data.map(mapProductToUI);
    } catch (error) {
        console.error("Failed to fetch featured products:", error);
        return [];
    }
}