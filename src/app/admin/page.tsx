"use client";

import { DollarSign, ShoppingBag, Users, TrendingUp, TrendingDown, Download, Bell, Search, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

const SALES_DATA = [
    { day: "MON", value: 30 },
    { day: "TUE", value: 45 },
    { day: "WED", value: 55 },
    { day: "THU", value: 40 },
    { day: "FRI", value: 70 },
    { day: "SAT", value: 85 },
    { day: "SUN", value: 95 },
];

const TOP_PRODUCTS = [
    { name: "Silk Floral Scarf", sales: "420 sales", price: "$45.00", img: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=100&q=80" },
    { name: "Wool Pashmina", sales: "315 sales", price: "$89.00", img: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=100&q=80" },
    { name: "Cashmere Wrap", sales: "280 sales", price: "$120.00", img: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=100&q=80" },
    { name: "Linen Summer...", sales: "190 sales", price: "$32.00", img: "https://images.unsplash.com/photo-1609709295948-17d77cb2a69b?auto=format&fit=crop&w=100&q=80" },
];

const MOCK_ORDERS = [
    { id: "ORD-9421", customer: "Elena Martinez", initials: "EM", product: "Silk Floral Scarf", status: "Shipped", total: "$45.00", date: "Oct 24, 2023" },
    { id: "ORD-9420", customer: "James Holt", initials: "JH", product: "Wool Pashmina (x2)", status: "Processing", total: "$178.00", date: "Oct 24, 2023" },
    { id: "ORD-9419", customer: "Sarah Reed", initials: "SR", product: "Cashmere Wrap", status: "Shipped", total: "$120.00", date: "Oct 23, 2023" },
    { id: "ORD-9418", customer: "David Kim", initials: "DK", product: "Linen Summer Scarf", status: "Cancelled", total: "$32.00", date: "Oct 23, 2023" },
];

function SmoothChart() {
    const W = 600, H = 200, PAD = 20;
    const max = Math.max(...SALES_DATA.map(d => d.value));
    const pts = SALES_DATA.map((d, i) => ({
        x: PAD + (i / (SALES_DATA.length - 1)) * (W - PAD * 2),
        y: H - PAD - (d.value / max) * (H - PAD * 2),
    }));

    // Smooth curve using cubic bezier
    let path = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
        const cpx = (pts[i - 1].x + pts[i].x) / 2;
        path += ` C ${cpx} ${pts[i - 1].y}, ${cpx} ${pts[i].y}, ${pts[i].x} ${pts[i].y}`;
    }
    const areaPath = `${path} L ${pts[pts.length - 1].x} ${H} L ${pts[0].x} ${H} Z`;

    return (
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="none">
            <defs>
                <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#c9a84c" stopOpacity="0.02" />
                </linearGradient>
            </defs>
            {/* Grid lines */}
            {[0.25, 0.5, 0.75].map((v) => (
                <line
                    key={v}
                    x1={PAD} y1={PAD + v * (H - PAD * 2)}
                    x2={W - PAD} y2={PAD + v * (H - PAD * 2)}
                    stroke="#ffffff08" strokeWidth="1"
                />
            ))}
            {/* Area fill */}
            <path d={areaPath} fill="url(#goldGrad)" />
            {/* Line */}
            <path d={path} fill="none" stroke="#c9a84c" strokeWidth="2.5" strokeLinecap="round" />
            {/* Dots */}
            {pts.map((pt, i) => (
                <circle key={i} cx={pt.x} cy={pt.y} r="3.5" fill="#c9a84c" stroke="#0d0f14" strokeWidth="2" />
            ))}
        </svg>
    );
}

function StatusBadge({ status }: { status: string }) {
    const map: Record<string, string> = {
        shipped: "bg-blue-500/15 text-blue-400",
        processing: "bg-yellow-500/15 text-yellow-400",
        delivered: "bg-green-500/15 text-green-400",
        cancelled: "bg-red-500/15 text-red-400",
        pending: "bg-orange-500/15 text-orange-400",
    };
    return (
        <span className={`inline-flex px-2.5 py-1 rounded text-[10px] font-black tracking-wider ${map[status.toLowerCase()] || "bg-white/10 text-white/60"}`}>
            {status}
        </span>
    );
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
            label: "Total Revenue",
            value: stats?.totalSales ? `$${stats.totalSales.toLocaleString()}` : "$128,430.00",
            change: "+12.5%",
            positive: true,
        },
        {
            icon: ShoppingBag,
            label: "Total Orders",
            value: stats?.pendingOrders ? stats.pendingOrders.toLocaleString() : "1,240",
            change: "+8.2%",
            positive: true,
        },
        {
            icon: Users,
            label: "Active Users",
            value: "856",
            change: "+5.1%",
            positive: true,
        },
        {
            icon: TrendingUp,
            label: "Conversion Rate",
            value: "3.24%",
            change: "-0.4%",
            positive: false,
        },
    ];

    const orders = stats?.recentOrders?.length
        ? stats.recentOrders.slice(0, 5).map((o) => ({
            id: o.id.slice(0, 8),
            customer: o.customerName,
            initials: o.customerName.split(" ").map((n) => n[0]).join("").slice(0, 2),
            product: "Scarf Order",
            status: o.status.charAt(0).toUpperCase() + o.status.slice(1),
            total: `$${o.total.toLocaleString()}`,
            date: o.date,
        }))
        : MOCK_ORDERS;

    return (
        <div className="min-h-screen bg-[#0d0f14]">

            {/* ===== TOP BAR ===== */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                <h1 className="text-lg font-black text-white tracking-wide">Dashboard Overview</h1>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative hidden sm:block">
                        <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                        <input
                            type="text"
                            placeholder="Search data..."
                            className="bg-[#12172a] border border-[#1e2640] rounded-lg pl-8 pr-4 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-[#c9a84c] transition-colors w-48"
                        />
                    </div>
                    {/* Bell */}
                    <button className="w-9 h-9 rounded-lg bg-[#12172a] border border-[#1e2640] flex items-center justify-center text-white/40 hover:text-white hover:border-[#c9a84c] transition-colors">
                        <Bell size={15} />
                    </button>
                    {/* New Product */}
                    <Link
                        href="/admin/products/new"
                        className="inline-flex items-center gap-1.5 bg-[#c9a84c] text-black text-xs font-black tracking-wider uppercase px-4 py-2.5 rounded-lg hover:bg-[#e0bc6a] transition-colors"
                    >
                        <Plus size={13} />
                        New Product
                    </Link>
                </div>
            </div>

            <div className="p-6 space-y-6">

                {/* ===== STAT CARDS ===== */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((stat, i) => {
                        const Icon = stat.icon;
                        return (
                            <div key={i} className="bg-[#12172a] border border-[#1e2640] rounded-xl p-5 hover:border-[#c9a84c]/30 transition-colors">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#c9a84c]/10 border border-[#c9a84c]/20 flex items-center justify-center">
                                        <Icon size={18} className="text-[#c9a84c]" strokeWidth={1.5} />
                                    </div>
                                    <span className={`inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full ${
                                        stat.positive
                                            ? "bg-green-500/10 text-green-400"
                                            : "bg-red-500/10 text-red-400"
                                    }`}>
                                        {stat.positive ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-[10px] text-white/35 uppercase tracking-wider mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-white">{stat.value}</p>
                            </div>
                        );
                    })}
                </div>

                {/* ===== CHART + TOP PRODUCTS ===== */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                    {/* Sales Chart */}
                    <div className="lg:col-span-2 bg-[#12172a] border border-[#1e2640] rounded-xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-sm font-bold text-white">Sales Performance</h2>
                                <p className="text-[11px] text-white/35 mt-0.5">Revenue trends for the last 7 days</p>
                            </div>
                            <select className="bg-[#0d0f14] border border-[#2a3040] rounded-lg px-3 py-1.5 text-xs text-white/60 outline-none focus:border-[#c9a84c] transition-colors">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Last 90 Days</option>
                            </select>
                        </div>

                        {/* SVG Chart */}
                        <div className="h-48 w-full mb-4">
                            <SmoothChart />
                        </div>

                        {/* Day labels */}
                        <div className="flex justify-between px-5">
                            {SALES_DATA.map((d) => (
                                <span key={d.day} className="text-[10px] text-white/25 font-bold">{d.day}</span>
                            ))}
                        </div>
                    </div>

                    {/* Top Selling Products */}
                    <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-6">
                        <h2 className="text-sm font-bold text-white mb-5">Top Selling Products</h2>
                        <div className="space-y-4">
                            {TOP_PRODUCTS.map((product) => (
                                <div key={product.name} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#0d0f14] border border-white/[0.07] shrink-0">
                                        <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-bold text-white truncate">{product.name}</p>
                                        <p className="text-[10px] text-white/35 mt-0.5">{product.sales}</p>
                                    </div>
                                    <span className="text-xs font-black text-[#c9a84c] shrink-0">{product.price}</span>
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/admin/products"
                            className="block mt-5 text-center text-xs text-white/40 hover:text-[#c9a84c] border border-white/[0.07] hover:border-[#c9a84c]/30 rounded-lg py-2.5 transition-colors font-bold"
                        >
                            View All Products
                        </Link>
                    </div>
                </div>

                {/* ===== RECENT ORDERS TABLE ===== */}
                <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-bold text-white">Recent Orders</h2>
                        <button className="inline-flex items-center gap-1.5 text-xs text-[#c9a84c] hover:text-[#e0bc6a] font-bold transition-colors">
                            <Download size={13} />
                            Download CSV
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/[0.06]">
                                    {["Order ID", "Customer", "Product", "Status", "Total", "Date"].map((h) => (
                                        <th key={h} className="text-left py-3 px-3 text-[9px] font-black tracking-[0.15em] uppercase text-white/30">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-xs text-white/30">
                                            Loading orders...
                                        </td>
                                    </tr>
                                ) : orders.map((order, i) => (
                                    <tr
                                        key={i}
                                        className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                                    >
                                        <td className="py-3.5 px-3">
                                            <span className="text-xs font-black text-[#c9a84c]">#{order.id}</span>
                                        </td>
                                        <td className="py-3.5 px-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-[#c9a84c]/15 border border-[#c9a84c]/25 flex items-center justify-center shrink-0">
                                                    <span className="text-[9px] font-black text-[#c9a84c]">
                                                        {order.initials}
                                                    </span>
                                                </div>
                                                <span className="text-xs text-white font-medium">{order.customer}</span>
                                            </div>
                                        </td>
                                        <td className="py-3.5 px-3">
                                            <span className="text-xs text-white/50">{order.product}</span>
                                        </td>
                                        <td className="py-3.5 px-3">
                                            <StatusBadge status={order.status} />
                                        </td>
                                        <td className="py-3.5 px-3">
                                            <span className="text-xs font-black text-[#c9a84c]">{order.total}</span>
                                        </td>
                                        <td className="py-3.5 px-3">
                                            <span className="text-xs text-white/35">{order.date}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}