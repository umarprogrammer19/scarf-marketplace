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
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Order Management</h1>
                <p className="text-muted-foreground">Manage COD orders and track shipments</p>
            </div>

            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-max">
                        <thead>
                            <tr className="border-b border-border bg-secondary/50">
                                <th className="p-4 text-sm font-semibold text-foreground">Order ID</th>
                                <th className="p-4 text-sm font-semibold text-foreground">Customer Details</th>
                                <th className="p-4 text-sm font-semibold text-foreground">Date</th>
                                <th className="p-4 text-sm font-semibold text-foreground">Total (Rs.)</th>
                                <th className="p-4 text-sm font-semibold text-foreground">Status</th>
                                <th className="p-4 text-sm font-semibold text-foreground">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {allOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-muted-foreground">No orders yet.</td>
                                </tr>
                            ) : (
                                allOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                                        <td className="p-4 font-medium text-foreground">{order.orderNumber}</td>

                                        <td className="p-4">
                                            <p className="text-foreground font-medium text-sm">{order.customerName}</p>
                                            <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                                            <p className="text-xs text-muted-foreground mt-1 truncate max-w-xs" title={`${order.shippingAddress}, ${order.city}`}>
                                                {order.city}
                                            </p>
                                        </td>

                                        <td className="p-4 text-sm text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="p-4 font-bold text-primary">
                                            {Number(order.totalAmount).toLocaleString()}
                                        </td>

                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>

                                        <td className="p-4">
                                            <form action={updateOrderStatus} className="flex items-center gap-2">
                                                <input type="hidden" name="orderId" value={order.id} />
                                                <select
                                                    name="status"
                                                    defaultValue={order.status}
                                                    className="bg-secondary border border-border text-sm text-foreground rounded-lg px-2 py-1.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                                                >
                                                    <option value="PENDING">Pending</option>
                                                    <option value="CONFIRMED">Confirmed</option>
                                                    <option value="SHIPPED">Shipped</option>
                                                    <option value="DELIVERED">Delivered</option>
                                                    <option value="CANCELLED">Cancelled</option>
                                                </select>
                                                <button type="submit" className="text-xs bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-3 py-1.5 rounded-lg transition-colors font-semibold">
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
