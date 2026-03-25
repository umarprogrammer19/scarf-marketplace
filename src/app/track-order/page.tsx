import { useState } from "react";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { orders } from "../../data/mockData";

export default function TrackOrderPage() {
    const [orderId, setOrderId] = useState("");
    const [contact, setContact] = useState("");
    const [trackedOrder, setTrackedOrder] = useState<any>(null);
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const order = orders.find(
            (o) => o.id === orderId && (o.email === contact || o.phone === contact)
        );

        if (order) {
            setTrackedOrder(order);
        } else {
            setError("Order not found. Please check your Order ID and contact information.");
            setTrackedOrder(null);
        }
    };

    const getStatusStep = (status: string) => {
        const steps = ["pending", "processing", "shipped", "delivered"];
        return steps.indexOf(status);
    };

    const statusColors: any = {
        pending: "text-yellow-500",
        processing: "text-blue-500",
        shipped: "text-purple-500",
        delivered: "text-green-500",
        cancelled: "text-red-500",
    };

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                        Track Your Order
                    </h1>
                    <p className="text-xl text-white/70">
                        Enter your order details to track your shipment
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 backdrop-blur-sm mb-12">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-white mb-2">Order ID *</label>
                            <input
                                type="text"
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                                placeholder="e.g., ORD-2024-001"
                                required
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                            />
                        </div>

                        <div>
                            <label className="block text-white mb-2">Email or Phone *</label>
                            <input
                                type="text"
                                value={contact}
                                onChange={(e) => setContact(e.target.value)}
                                placeholder="Email address or phone number"
                                required
                                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                            />
                        </div>

                        {error && (
                            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] flex items-center justify-center space-x-2"
                        >
                            <Search className="w-5 h-5" />
                            <span>Track Order</span>
                        </button>
                    </form>
                </div>

                {/* Order Details */}
                {trackedOrder && (
                    <div className="space-y-8 animate-fade-in">
                        {/* Order Info */}
                        <div className="bg-card border border-white/10 rounded-2xl p-8">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-white mb-2">
                                        Order {trackedOrder.id}
                                    </h2>
                                    <p className="text-white/60">
                                        Placed on {new Date(trackedOrder.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className={`mt-4 md:mt-0 inline-block px-6 py-3 bg-white/5 border border-white/10 rounded-full ${statusColors[trackedOrder.status]} font-semibold uppercase text-sm`}>
                                    {trackedOrder.status}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-white/10">
                                <div>
                                    <p className="text-white/60 text-sm mb-1">Customer</p>
                                    <p className="text-white font-semibold">{trackedOrder.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm mb-1">Total Amount</p>
                                    <p className="text-gold text-xl font-bold">${trackedOrder.total}</p>
                                </div>
                                <div>
                                    <p className="text-white/60 text-sm mb-1">Shipping Address</p>
                                    <p className="text-white">{trackedOrder.address}</p>
                                </div>
                                {trackedOrder.trackingNumber && (
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Tracking Number</p>
                                        <p className="text-white font-mono">{trackedOrder.trackingNumber}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="bg-card border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-8">Order Timeline</h3>

                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-white/10" />

                                {/* Timeline Steps */}
                                <div className="space-y-8">
                                    {[
                                        { status: "pending", icon: Clock, label: "Order Placed", desc: "Your order has been received" },
                                        { status: "processing", icon: Package, label: "Processing", desc: "Your order is being prepared" },
                                        { status: "shipped", icon: Truck, label: "Shipped", desc: "Your order is on the way" },
                                        { status: "delivered", icon: CheckCircle, label: "Delivered", desc: "Your order has been delivered" },
                                    ].map((step, index) => {
                                        const currentStep = getStatusStep(trackedOrder.status);
                                        const isCompleted = currentStep >= index;
                                        const isCurrent = currentStep === index;
                                        const Icon = step.icon;

                                        return (
                                            <div key={step.status} className="relative flex items-start">
                                                <div
                                                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${isCompleted
                                                        ? "bg-gold border-gold"
                                                        : "bg-black border-white/20"
                                                        }`}
                                                >
                                                    <Icon
                                                        className={`w-6 h-6 ${isCompleted ? "text-black" : "text-white/40"
                                                            }`}
                                                    />
                                                </div>

                                                <div className="ml-6 flex-1">
                                                    <h4
                                                        className={`font-semibold mb-1 ${isCompleted ? "text-white" : "text-white/40"
                                                            }`}
                                                    >
                                                        {step.label}
                                                        {isCurrent && (
                                                            <span className="ml-2 text-xs px-2 py-1 bg-gold/10 text-gold rounded-full">
                                                                Current
                                                            </span>
                                                        )}
                                                    </h4>
                                                    <p className={isCompleted ? "text-white/60" : "text-white/30"}>
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-card border border-white/10 rounded-2xl p-8">
                            <h3 className="text-xl font-semibold text-white mb-6">Order Items</h3>
                            <div className="space-y-4">
                                {trackedOrder.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="text-white font-semibold">{item.name}</p>
                                            <p className="text-white/60 text-sm">Quantity: {item.quantity}</p>
                                        </div>
                                        <p className="text-gold font-bold">${item.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
