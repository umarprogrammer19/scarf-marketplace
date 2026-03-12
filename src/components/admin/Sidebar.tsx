import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, ListOrdered, Tags } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-64 bg-surface h-screen border-r border-gray-800 flex flex-col">
            {/* Logo Area */}
            <div className="h-16 flex items-center justify-center border-b border-gray-800">
                <span className="text-gold font-bold text-xl tracking-wider uppercase">
                    Al Faizan
                </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 space-y-2">
                <Link href="/admin" className="flex items-center gap-3 text-text-muted hover:text-gold hover:bg-black/20 px-4 py-3 rounded-lg transition-colors">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link href="/admin/orders" className="flex items-center gap-3 text-text-muted hover:text-gold hover:bg-black/20 px-4 py-3 rounded-lg transition-colors">
                    <ListOrdered size={20} />
                    <span>Orders (COD)</span>
                </Link>
                <Link href="/admin/products" className="flex items-center gap-3 text-text-muted hover:text-gold hover:bg-black/20 px-4 py-3 rounded-lg transition-colors">
                    <ShoppingBag size={20} />
                    <span>Products</span>
                </Link>
                <Link href="/admin/categories" className="flex items-center gap-3 text-text-muted hover:text-gold hover:bg-black/20 px-4 py-3 rounded-lg transition-colors">
                    <Tags size={20} />
                    <span>Categories</span>
                </Link>
            </nav>
        </aside>
    );
}