"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    ShoppingBag,
    ListOrdered,
    Tags,
    LogOut,
    ChevronRight,
} from "lucide-react";
import Image from "next/image";
import { signOut } from "@/auth";

export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/orders", label: "Orders (COD)", icon: ListOrdered },
        { href: "/admin/products", label: "Products", icon: ShoppingBag },
        { href: "/admin/categories", label: "Categories", icon: Tags },
    ];

    const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

    async function handleLogout() {
        await signOut();
    }

    return (
        <aside className="w-64 bg-secondary/40 border-r border-border h-screen flex flex-col overflow-y-auto sticky top-0">
            {/* Logo Area */}
            <div className="h-20 flex items-center justify-center border-b border-border px-4">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 relative">
                        <Image
                            src="/logo.jpeg"
                            alt="Al Faizan"
                            width={40}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                            AL FAIZAN
                        </span>
                        <span className="text-xs text-muted-foreground">Admin</span>
                    </div>
                </Link>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${active
                                    ? "bg-primary/20 border border-primary/40 text-primary"
                                    : "text-muted-foreground hover:text-foreground hover:bg-primary/10"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <Icon size={20} />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {active && <ChevronRight size={18} className="opacity-50" />}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-border space-y-4">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all duration-200 font-medium"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
