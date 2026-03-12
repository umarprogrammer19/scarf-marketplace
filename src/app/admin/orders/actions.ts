"use server";

import { db } from "@/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(formData: FormData) {
    const orderId = Number(formData.get("orderId"));
    const newStatus = formData.get("status") as "PENDING" | "CONFIRMED" | "SHIPPED" | "DELIVERED" | "CANCELLED";

    try {
        await db.update(orders)
            .set({ status: newStatus })
            .where(eq(orders.id, orderId));

        revalidatePath("/admin/orders");
    } catch (error) {
        console.error("Failed to update status:", error);
    }
}