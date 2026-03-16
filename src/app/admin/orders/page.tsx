import { db } from "@/db";
import { orders } from "@/db/schema";
import { desc, eq, count, sum } from "drizzle-orm";
import { updateOrderStatus } from "./actions";
import { Eye, Edit, Trash2, AlertTriangle, Bell } from "lucide-react";

export default async function AdminOrdersPage() {
    const allOrders = await db.select().from(orders).orderBy(desc(orders.createdAt));

    const totalOrders = allOrders.length;
    const pendingOrders = allOrders.filter(o => o.status === "PENDING").length;
    const deliveredOrders = allOrders.filter(o => o.status === "DELIVERED").length;
    const totalRevenue = allOrders.reduce((sum, o) => sum + Number(o.totalAmount), 0);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING": return "bg-yellow-500/10 text-yellow-500";
            case "CONFIRMED": return "bg-blue-500/10 text-blue-500";
            case "SHIPPED": return "bg-purple-500/10 text-purple-500";
            case "DELIVERED": return "bg-green-500/10 text-green-500";
            case "CANCELLED": return "bg-red-500/10 text-red-500";
            default: return "bg-gray-500/10 text-gray-500";
        }
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">Customer Orders</h1>
                <p className="text-sm text-muted-foreground">Monitor and manage all customer purchases and fulfillment status.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Total Orders</p>
                        <span className="text-[10px] font-bold bg-foreground text-background px-1.5 py-0.5 rounded">ALL</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{totalOrders.toLocaleString()}</p>
                    <p className="text-[11px] text-green-500 mt-1">+12% from last month</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Pending Shipment</p>
                        <span className="text-[10px] font-bold bg-yellow-500/10 text-yellow-500 px-1.5 py-0.5 rounded">PENDING</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{pendingOrders}</p>
                    <p className="text-[11px] text-yellow-500 mt-1">Requires attention</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Total Revenue</p>
                        <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded">MONEY</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">Rs. {totalRevenue.toLocaleString()}</p>
                    <p className="text-[11px] text-green-500 mt-1">+8% from last month</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Delivered</p>
                        <span className="text-[10px] font-bold bg-green-500/10 text-green-500 px-1.5 py-0.5 rounded">DONE</span>
                    </div>
                    <p className="text-2xl font-bold text-foreground">{deliveredOrders.toLocaleString()}</p>
                    <p className="text-[11px] text-muted-foreground mt-1">Completed successfully</p>
                </div>
            </div>

            {/* Tab Filters */}
            <div className="flex items-center gap-1 mb-4 border-b border-border">
                {["ALL ORDERS", "PENDING", "SHIPPED", "DELIVERED", "CANCELLED"].map((tab, i) => (
                    <button
                        key={tab}
                        className={`px-4 py-2.5 text-xs font-bold tracking-wider transition-colors ${
                            i === 0
                                ? "text-foreground border-b-2 border-primary"
                                : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Orders Table */}
            <div className="bg-card border border-border rounded-xl overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Order ID</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Customer Name</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Date</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Total Amount</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Status</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {allOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-sm text-muted-foreground">No orders yet.</td>
                                </tr>
                            ) : (
                                allOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                                        <td className="py-3 px-4">
                                            <span className="text-sm font-bold text-primary">{order.orderNumber}</span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                                                    {order.customerName.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                                                </div>
                                                <span className="text-sm text-foreground">{order.customerName}</span>
                                            </div>
                                        </td>
                                        <td className="py-3 px-4 text-sm text-muted-foreground">
                                            {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                        </td>
                                        <td className="py-3 px-4 text-sm font-semibold text-foreground">
                                            Rs. {Number(order.totalAmount).toLocaleString()}
                                        </td>
                                        <td className="py-3 px-4">
                                            <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center gap-1">
                                                <form action={updateOrderStatus} className="flex items-center gap-1.5">
                                                    <input type="hidden" name="orderId" value={order.id} />
                                                    <select
                                                        name="status"
                                                        defaultValue={order.status}
                                                        className="bg-secondary border border-border text-xs text-foreground rounded-lg px-2 py-1.5 outline-none focus:border-primary transition-colors"
                                                    >
                                                        <option value="PENDING">Pending</option>
                                                        <option value="CONFIRMED">Confirmed</option>
                                                        <option value="SHIPPED">Shipped</option>
                                                        <option value="DELIVERED">Delivered</option>
                                                        <option value="CANCELLED">Cancelled</option>
                                                    </select>
                                                    <button
                                                        type="submit"
                                                        className="text-[10px] bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground px-2.5 py-1.5 rounded-lg transition-colors font-bold"
                                                    >
                                                        Update
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Alerts */}
            {pendingOrders > 0 && (
                <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-5 flex items-start gap-4">
                    <AlertTriangle size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-bold text-foreground text-sm">Shipment Deadline</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            There are {pendingOrders} orders that need to be shipped within the next 24 hours to maintain your express fulfillment rating.
                        </p>
                        <button className="text-xs font-bold text-primary mt-2 hover:underline uppercase tracking-wider">
                            View Priority Orders
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
