"use client"
import { TrendingUp, ShoppingCart, Package, Users, DollarSign } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { orders, products, users } from "../../data/mockData";

export default function AdminDashboard() {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const activeOrders = orders.filter((o) => o.status !== "delivered" && o.status !== "cancelled").length;
    const totalProducts = products.length;
    const totalCustomers = users.filter((u) => u.role === "customer").length;

    const salesData = [
        { month: "Jan", revenue: 4500 },
        { month: "Feb", revenue: 5200 },
        { month: "Mar", revenue: 6100 },
        { month: "Apr", revenue: 5800 },
        { month: "May", revenue: 7200 },
        { month: "Jun", revenue: 8500 },
    ];

    const orderData = [
        { day: "Mon", orders: 12 },
        { day: "Tue", orders: 19 },
        { day: "Wed", orders: 15 },
        { day: "Thu", orders: 22 },
        { day: "Fri", orders: 28 },
        { day: "Sat", orders: 24 },
        { day: "Sun", orders: 18 },
    ];

    const stats = [
        {
            title: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            change: "+12.5%",
            icon: DollarSign,
            color: "text-gold",
            bgColor: "bg-gold/10",
            borderColor: "border-gold/30",
        },
        {
            title: "Active Orders",
            value: activeOrders,
            change: "+5.2%",
            icon: ShoppingCart,
            color: "text-blue-400",
            bgColor: "bg-blue-400/10",
            borderColor: "border-blue-400/30",
        },
        {
            title: "Total Products",
            value: totalProducts,
            change: "+2 new",
            icon: Package,
            color: "text-purple-400",
            bgColor: "bg-purple-400/10",
            borderColor: "border-purple-400/30",
        },
        {
            title: "Total Customers",
            value: totalCustomers,
            change: "+8.3%",
            icon: Users,
            color: "text-green-400",
            bgColor: "bg-green-400/10",
            borderColor: "border-green-400/30",
        },
    ];

    return (
        <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl text-white mb-2">Dashboard</h1>
                <p className="text-white/60">Welcome back! Here's what's happening with your store.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.title}
                            className={`bg-card border ${stat.borderColor} rounded-xl p-6 hover:scale-105 transition-transform duration-300`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`w-12 h-12 ${stat.bgColor} border ${stat.borderColor} rounded-lg flex items-center justify-center`}>
                                    <Icon className={`w-6 h-6 ${stat.color}`} />
                                </div>
                                <span className="text-green-400 text-sm font-semibold flex items-center">
                                    <TrendingUp className="w-4 h-4 mr-1" />
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-white/60 text-sm mb-1">{stat.title}</p>
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                {/* Revenue Chart */}
                <div className="bg-card border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Revenue Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={salesData}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="month" stroke="#999" />
                            <YAxis stroke="#999" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: "8px" }}
                                labelStyle={{ color: "#fff" }}
                            />
                            <Area type="monotone" dataKey="revenue" stroke="#D4AF37" fillOpacity={1} fill="url(#colorRevenue)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                {/* Orders Chart */}
                <div className="bg-card border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-semibold text-white mb-6">Weekly Orders</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={orderData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="day" stroke="#999" />
                            <YAxis stroke="#999" />
                            <Tooltip
                                contentStyle={{ backgroundColor: "#0a0a0a", border: "1px solid #333", borderRadius: "8px" }}
                                labelStyle={{ color: "#fff" }}
                            />
                            <Line type="monotone" dataKey="orders" stroke="#D4AF37" strokeWidth={2} dot={{ fill: "#D4AF37", r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Recent Orders */}
            <div className="bg-card border border-white/10 rounded-xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">Recent Orders</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left text-white/60 font-semibold pb-4">Order ID</th>
                                <th className="text-left text-white/60 font-semibold pb-4">Customer</th>
                                <th className="text-left text-white/60 font-semibold pb-4">Amount</th>
                                <th className="text-left text-white/60 font-semibold pb-4">Status</th>
                                <th className="text-left text-white/60 font-semibold pb-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="py-4 text-gold font-mono text-sm">{order.id}</td>
                                    <td className="py-4 text-white">{order.customerName}</td>
                                    <td className="py-4 text-white font-semibold">${order.total}</td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${order.status === "delivered" ? "bg-green-400/10 text-green-400" :
                                                order.status === "shipped" ? "bg-blue-400/10 text-blue-400" :
                                                    order.status === "processing" ? "bg-purple-400/10 text-purple-400" :
                                                        "bg-yellow-400/10 text-yellow-400"
                                            }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className="py-4 text-white/60">{new Date(order.createdAt).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
