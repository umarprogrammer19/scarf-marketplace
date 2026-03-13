"use client";

import { useEffect, useState } from "react";
import { TrendingUp, ShoppingBag, Package, DollarSign, Users, AlertCircle } from "lucide-react";
import Link from "next/link";

interface DashboardStats {
    totalSales: number;
    pendingOrders: number;
    totalProducts: number;
    recentOrders: Array<{
        id: string;
        customerName: string;
        total: number;
        status: string;
        date: string;
    }>;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/admin/dashboard");
                const data = await response.json();
                setStats(data);
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            icon: DollarSign,
            label: "Total Sales",
            value: stats?.totalSales ? `Rs. ${stats.totalSales.toLocaleString()}` : "Rs. 0",
            change: "+12%",
            color: "text-primary",
            bgColor: "bg-primary/10",
        },
        {
            icon: ShoppingBag,
            label: "Pending Orders",
            value: stats?.pendingOrders || 0,
            change: "Awaiting Delivery",
            color: "text-orange-500",
            bgColor: "bg-orange-500/10",
        },
        {
            icon: Package,
            label: "Total Products",
            value: stats?.totalProducts || 0,
            change: "Active",
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
        },
        {
            icon: Users,
            label: "Total Customers",
            value: "500+",
            change: "+8% this month",
            color: "text-purple-500",
            bgColor: "bg-purple-500/10",
        },
    ];

    return (
        <div>
            {/* Welcome Section */}
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome back! Here's your business overview.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="bg-secondary/40 border border-border rounded-xl p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                                    <Icon size={24} className={stat.color} />
                                </div>
                                <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                        </div>
                    );
                })}
            </div>

            {/* Recent Orders */}
            {stats?.recentOrders && stats.recentOrders.length > 0 && (
                <div className="bg-secondary/40 border border-border rounded-xl p-6 mb-8">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
                        <Link
                            href="/admin/orders"
                            className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                        >
                            View All
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                                        Customer
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                                        Order ID
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                                        Amount
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                                        Status
                                    </th>
                                    <th className="text-left py-3 px-4 font-semibold text-foreground text-sm">
                                        Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentOrders.slice(0, 5).map((order) => (
                                    <tr key={order.id} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                                        <td className="py-4 px-4 text-foreground text-sm">{order.customerName}</td>
                                        <td className="py-4 px-4 text-muted-foreground text-sm font-mono">
                                            {order.id.slice(0, 8)}...
                                        </td>
                                        <td className="py-4 px-4 text-primary font-semibold text-sm">
                                            Rs. {order.total.toLocaleString()}
                                        </td>
                                        <td className="py-4 px-4">
                                            <span
                                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.status === "pending"
                                                    ? "bg-orange-500/10 text-orange-500"
                                                    : order.status === "delivered"
                                                        ? "bg-green-500/10 text-green-500"
                                                        : "bg-blue-500/10 text-blue-500"
                                                    }`}
                                            >
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="py-4 px-4 text-muted-foreground text-sm">{order.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Performance Alert */}
            {!loading && stats && stats.pendingOrders > 0 && (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle size={20} className="text-orange-500 shrink-0 mt-0.5" />
                    <div>
                        <p className="font-semibold text-foreground">
                            {stats.pendingOrders} pending orders
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                            You have {stats.pendingOrders} order{stats.pendingOrders > 1 ? "s" : ""} awaiting fulfillment.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
