"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAllOrders() {
    try {
        // Drizzle makes it incredibly easy to fetch the order, the items inside it, AND the product details for those items all at once!
        const data = await db.query.orders.findMany({
            with: {
                items: {
                    with: {
                        product: true // Joins the product table to get images/names
                    }
                }
            },
            orderBy: [desc(orders.createdAt)]
        });

        // Map it to exactly what your UI expects
        return data.map((order) => ({
            id: order.id,
            customerName: order.customerName,
            email: order.email,
            phone: order.phone,
            address: order.address,
            total: Number(order.totalAmount),
            status: order.status,
            createdAt: order.createdAt.toISOString(),
            items: order.items.map((item) => ({
                id: item.product.id,
                name: item.product.name,
                price: Number(item.priceAtTimeOfOrder),
                quantity: item.quantity,
                image: item.product.image
            }))
        }));
    } catch (error) {
        console.error("Error fetching orders:", error);
        return [];
    }
}

export async function updateStatus(orderId: string, newStatus: any) {
    try {
        await db.update(orders)
            .set({ status: newStatus })
            .where(eq(orders.id, orderId));
            
        revalidatePath("/admin/orders");
        return { success: true };
    } catch (error) {
        console.error("Error updating status:", error);
        return { success: false, error: "Failed to update status" };
    }
}