"use server";

import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function placeOrder(orderData: any, cartItems: any[]) {
    // Generate a unique Order ID based on the timestamp
    const orderId = `ORD-${Date.now()}`;
    const fullAddress = `${orderData.address}, ${orderData.postalCode}. Notes: ${orderData.notes || 'None'}`;

    try {
        // 1. Save the main order
        await db.insert(orders).values({
            id: orderId,
            customerName: orderData.fullName,
            email: orderData.email,
            phone: orderData.phone,
            address: fullAddress,
            city: orderData.city,
            totalAmount: String(orderData.total),
            status: "PENDING",
            paymentMethod: "COD",
        });

        // 2. Save the order items and update product stock
        for (const item of cartItems) {
            // Save the item
            await db.insert(orderItems).values({
                orderId: orderId,
                productId: Number(item.id),
                quantity: item.quantity,
                priceAtTimeOfOrder: String(item.price),
            });

            // Deduct the stock using raw SQL math
            await db.update(products)
                .set({ 
                    stockQuantity: sql`${products.stockQuantity} - ${item.quantity}` 
                })
                .where(eq(products.id, Number(item.id)));
        }

        return { success: true, orderId };
    } catch (error) {
        console.error("Order Database Error:", error);
        return { success: false, error: "Failed to place order." };
    }
}