import { LayoutDashboard, Package, ShoppingCart, Users, Menu, X, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const location = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
        { icon: ShoppingCart, label: "Orders", path: "/admin/orders" },
        { icon: Package, label: "Products", path: "/admin/products" },
        { icon: Users, label: "Users", path: "/admin/users" },
    ];

    return (
        <div className="min-h-screen bg-black flex">
            {/* Mobile Sidebar Toggle */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 bg-gold text-black rounded-lg flex items-center justify-center"
            >
                {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed lg:static inset-y-0 left-0 z-40 w-72 bg-card border-r border-white/10 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6 border-b border-white/10">
                        <Link href="/" className="flex items-center space-x-2">
                            <div className="text-2xl font-bold">
                                <span className="text-gold">LUXE</span>
                                <span className="text-white"> ADMIN</span>
                            </div>
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 p-6 space-y-2">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                        ? "bg-gold text-black"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>

                    {/* User Section */}
                    <div className="p-6 border-t border-white/10">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                                <span className="text-black font-semibold">A</span>
                            </div>
                            <div>
                                <p className="text-white font-semibold">Admin User</p>
                                <p className="text-white/60 text-sm">admin@luxe.com</p>
                            </div>
                        </div>
                        <Link
                            href="/"
                            className="flex items-center space-x-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white/70 hover:text-white hover:border-gold transition-all duration-300"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="text-sm">Back to Store</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Backdrop for mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-30"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
