"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { Eye, Filter, Search, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getAllOrders, updateStatus } from "./actions";

export default function AdminOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    // Fetch real orders on load
    const loadOrders = async () => {
        setIsLoading(true);
        const data = await getAllOrders();
        setOrders(data);
        setIsLoading(false);
    };

    useEffect(() => {
        loadOrders();
    }, []);

    const filteredOrders = orders.filter((order) => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customerName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "all" || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleUpdateStatus = async (orderId: string, newStatus: string) => {
        // Optimistically update the UI instantly
        setOrders(orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        ));

        // Update the database
        const result = await updateStatus(orderId, newStatus);
        if (result.success) {
            toast.success("Status Updated", { description: `Order ${orderId} is now ${newStatus}` });
        } else {
            toast.error("Error", { description: result.error });
            loadOrders(); // Revert if failed
        }
    };

    if (isLoading) return <div className="p-8 text-white flex items-center gap-3"><Loader2 className="animate-spin" /> Loading orders...</div>;

    return (
        <div className="p-4 lg:p-8">
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl text-white mb-2">Orders Management</h1>
                <p className="text-white/60">Manage and track all customer orders</p>
            </div>

            <div className="bg-card border border-white/10 rounded-xl p-6 mb-8">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input type="text" placeholder="Search by order ID or customer..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" />
                    </div>

                    <div className="relative">
                        <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold">
                            <option value="all" className="bg-black">All Status</option>
                            <option value="pending" className="bg-black">Pending</option>
                            <option value="processing" className="bg-black">Processing</option>
                            <option value="shipped" className="bg-black">Shipped</option>
                            <option value="delivered" className="bg-black">Delivered</option>
                            <option value="cancelled" className="bg-black">Cancelled</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-card border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5 border-b border-white/10">
                            <tr>
                                <th className="text-left text-white/60 font-semibold p-4">Order ID</th>
                                <th className="text-left text-white/60 font-semibold p-4">Customer</th>
                                <th className="text-left text-white/60 font-semibold p-4">Items</th>
                                <th className="text-left text-white/60 font-semibold p-4">Total</th>
                                <th className="text-left text-white/60 font-semibold p-4">Status</th>
                                <th className="text-left text-white/60 font-semibold p-4">Date</th>
                                <th className="text-left text-white/60 font-semibold p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr><td colSpan={7} className="p-8 text-center text-white/60">No orders found.</td></tr>
                            ) : filteredOrders.map((order) => (
                                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4 text-gold font-mono text-sm">{order.id}</td>
                                    <td className="p-4">
                                        <div>
                                            <p className="text-white font-semibold">{order.customerName}</p>
                                            <p className="text-white/60 text-sm">{order.email}</p>
                                        </div>
                                    </td>
                                    <td className="p-4 text-white">{order.items.length}</td>
                                    <td className="p-4 text-white font-semibold">${order.total.toFixed(2)}</td>
                                    <td className="p-4">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                                            className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer outline-none
                                                ${order.status === "delivered" ? "bg-green-400/10 text-green-400" :
                                                    order.status === "shipped" ? "bg-blue-400/10 text-blue-400" :
                                                        order.status === "processing" ? "bg-purple-400/10 text-purple-400" :
                                                            order.status === "cancelled" ? "bg-red-400/10 text-red-400" :
                                                                "bg-yellow-400/10 text-yellow-400"}`}
                                        >
                                            <option value="pending" className="bg-black text-white">Pending</option>
                                            <option value="processing" className="bg-black text-white">Processing</option>
                                            <option value="shipped" className="bg-black text-white">Shipped</option>
                                            <option value="delivered" className="bg-black text-white">Delivered</option>
                                            <option value="cancelled" className="bg-black text-white">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="p-4 text-white/60">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="p-4">
                                        <button onClick={() => setSelectedOrder(order)} className="w-8 h-8 bg-gold/10 border border-gold/30 rounded-lg flex items-center justify-center text-gold hover:bg-gold hover:text-black transition-all">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Order Details Modal */}
            <Dialog.Root open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
                    <Dialog.Content onInteractOutside={(e) => e.preventDefault()} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto z-50">
                        <Dialog.Close className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all">
                            <X className="w-5 h-5" />
                        </Dialog.Close>

                        {selectedOrder && (
                            <div>
                                <h2 className="text-2xl font-semibold text-white mb-6">Order Details</h2>
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div><p className="text-white/60 text-sm mb-1">Order ID</p><p className="text-gold font-mono">{selectedOrder.id}</p></div>
                                        <div><p className="text-white/60 text-sm mb-1">Status</p><p className="text-white capitalize">{selectedOrder.status}</p></div>
                                        <div><p className="text-white/60 text-sm mb-1">Customer</p><p className="text-white">{selectedOrder.customerName}</p></div>
                                        <div><p className="text-white/60 text-sm mb-1">Total</p><p className="text-gold text-xl font-bold">${selectedOrder.total.toFixed(2)}</p></div>
                                    </div>
                                    <div><p className="text-white/60 text-sm mb-1">Contact</p><p className="text-white">{selectedOrder.email}</p><p className="text-white">{selectedOrder.phone}</p></div>
                                    <div><p className="text-white/60 text-sm mb-1">Shipping Address</p><p className="text-white">{selectedOrder.address}</p></div>
                                    <div>
                                        <p className="text-white/60 text-sm mb-2">Items</p>
                                        <div className="space-y-2">
                                            {selectedOrder.items.map((item: any) => (
                                                <div key={item.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
                                                    <img src={item.image} alt={item.name} className="w-12 h-12 rounded object-cover" />
                                                    <div className="flex-1">
                                                        <p className="text-white font-semibold">{item.name}</p>
                                                        <p className="text-white/60 text-sm">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-gold font-bold">${item.price.toFixed(2)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}