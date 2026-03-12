import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc } from "drizzle-orm";
import { updateOrderStatus } from "./actions";

export default async function AdminOrdersPage() {
    // Fetch all orders, newest first
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));

    // Helper function to color-code statuses
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
            case 'CONFIRMED': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
            case 'SHIPPED': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
            case 'DELIVERED': return 'bg-green-500/10 text-green-500 border-green-500/20';
            case 'CANCELLED': return 'bg-red-500/10 text-red-500 border-red-500/20';
            default: return 'bg-gray-500/10 text-gray-500';
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-serif text-text-main mb-8">Order Management (COD)</h1>

            <div className="bg-surface rounded-xl border border-gray-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-200">
                        <thead>
                            <tr className="border-b border-gray-800 bg-background/50">
                                <th className="p-4 text-sm font-medium text-text-muted">Order ID</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Customer Details</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Date</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Total (Rs.)</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Status</th>
                                <th className="p-4 text-sm font-medium text-text-muted">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800/50">
                            {allOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-text-muted">No orders yet.</td>
                                </tr>
                            ) : (
                                allOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-background/30 transition-colors">
                                        <td className="p-4 font-medium text-text-main">{order.orderNumber}</td>

                                        <td className="p-4">
                                            <p className="text-text-main font-medium">{order.customerName}</p>
                                            <p className="text-xs text-text-muted">{order.customerPhone}</p>
                                            <p className="text-xs text-text-muted mt-1 truncate max-w-50" title={`${order.shippingAddress}, ${order.city}`}>
                                                {order.city}
                                            </p>
                                        </td>

                                        <td className="p-4 text-sm text-text-muted">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="p-4 font-bold text-gold">
                                            {Number(order.totalAmount).toLocaleString()}
                                        </td>

                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            {/* Simple form to update status */}
                                            <form action={updateOrderStatus} className="flex items-center gap-2">
                                                <input type="hidden" name="orderId" value={order.id} />
                                                <select
                                                    name="status"
                                                    defaultValue={order.status}
                                                    className="bg-background border border-gray-700 text-sm text-text-main rounded-lg px-2 py-1 outline-none focus:border-gold"
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="CONFIRMED">Confirmed</option>
                                                    <option value="SHIPPED">Shipped</option>
                                                    <option value="DELIVERED">Delivered</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </select>
                                                <button type="submit" className="text-xs bg-gold/10 text-gold hover:bg-gold hover:text-background px-3 py-1.5 rounded-lg transition-colors font-medium">
                                                    Update
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}