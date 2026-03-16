import Sidebar from "@/components/admin/Sidebar";
import { auth } from "@/auth";
import Link from "next/link";
import { Bell, Plus, Search } from "lucide-react";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await auth();

    if (!session) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Top Bar */}
                <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border px-6 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center bg-secondary border border-border rounded-lg px-3 py-2 flex-1 max-w-md">
                        <Search size={16} className="text-muted-foreground mr-2" />
                        <input
                            type="text"
                            placeholder="Search data..."
                            className="bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none w-full"
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-muted-foreground hover:text-foreground transition-colors relative">
                            <Bell size={20} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
                        </button>
                        <Link
                            href="/admin/products/new"
                            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors"
                        >
                            <Plus size={16} />
                            New Product
                        </Link>
                    </div>
                </header>

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
