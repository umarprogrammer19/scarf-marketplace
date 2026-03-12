"use server";

import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function placeCODOrder(
    formData: FormData,
    cartItems: { id: number; quantity: number; price: string }[],
    totalAmount: number
) {
    if (cartItems.length === 0) return { success: false, error: "Cart is empty" };

    // Generate a random order number (e.g., AF-847294)
    const orderNumber = `AF-${Math.floor(100000 + Math.random() * 900000)}`;

    try {
        // 1. Create the main Order record
        const [newOrder] = await db.insert(orders).values({
            orderNumber,
            customerName: formData.get("customerName") as string,
            customerPhone: formData.get("customerPhone") as string,
            shippingAddress: formData.get("shippingAddress") as string,
            city: formData.get("city") as string,
            totalAmount: totalAmount.toString(),
            paymentMethod: "COD",
            status: "PENDING",
        }).returning({ id: orders.id });

        // 2. Insert all the specific items they bought
        const orderItemsData = cartItems.map(item => ({
            orderId: newOrder.id,
            productId: item.id,
            quantity: item.quantity,
            priceAtTimeOfOrder: item.price,
        }));
        await db.insert(orderItems).values(orderItemsData);

        // 3. Reduce the stock quantity in the database
        for (const item of cartItems) {
            await db.update(products)
                .set({ stockQuantity: sql`${products.stockQuantity} - ${item.quantity}` })
                .where(eq(products.id, item.id));
        }

        return { success: true, orderNumber };
    } catch (error) {
        console.error("Failed to place order:", error);
        return { success: false, error: "Failed to process checkout." };
    }
}