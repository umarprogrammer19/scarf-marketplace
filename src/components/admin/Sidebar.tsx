"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, ShoppingBag, ListOrdered, Tags, LogOut, Gem } from "lucide-react";
import { handleSignOut } from "@/app/admin/auth-actions";

export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/products", label: "Products", icon: ShoppingBag },
        { href: "/admin/orders", label: "Orders", icon: ListOrdered },
        { href: "/admin/categories", label: "Categories", icon: Tags },
    ];

    return (
        <aside className="w-60 bg-[#0c0c0c] h-screen flex flex-col sticky top-0 border-r border-border">
            {/* Brand */}
            <div className="p-6 pb-8">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Gem size={18} className="text-primary" />
                    </div>
                    <div>
                        <h2 className="text-foreground font-bold text-sm">Al Faizan</h2>
                        <p className="text-[10px] text-muted-foreground">Admin Console</p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => {
                    const active = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                                active
                                    ? "bg-primary/10 text-primary border-l-2 border-primary"
                                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                            }`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                        AD
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Admin</p>
                        <p className="text-[11px] text-muted-foreground">Store Manager</p>
                    </div>
                    <form action={handleSignOut}>
                        <button type="submit" className="p-1.5 text-muted-foreground hover:text-red-400 transition-colors" title="Sign Out">
                            <LogOut size={16} />
                        </button>
                    </form>
                </div>
            </div>
        </aside>
    );
}
