import Sidebar from "@/components/admin/Sidebar";
import { auth } from "@/auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    // Check if the user is logged in
    const session = await auth();

    // If there is no session, we are likely on the login page, so just show the children (the login form)
    if (!session) {
        return <>{children}</>;
    }

    // If logged in, show the full admin layout with the sidebar
    return (
        <div className="flex min-h-screen bg-background text-text-main">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}