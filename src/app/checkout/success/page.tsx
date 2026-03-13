import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

// Next.js passes URL search parameters as a prop to the page
export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ order: string }>;
}) {
    const params = await searchParams;
    const orderNumber = params.order;

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Navbar />

            <main className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-surface p-8 rounded-2xl border border-gray-800 text-center relative overflow-hidden">

                    {/* Decorative Background Glow */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-gold/20 blur-3xl rounded-full pointer-events-none"></div>

                    <div className="flex justify-center mb-6 relative z-10">
                        <CheckCircle size={64} className="text-green-500" />
                    </div>

                    <h1 className="text-3xl  text-text-main mb-2 relative z-10">Order Confirmed!</h1>
                    <p className="text-text-muted mb-6 relative z-10">
                        Thank you for shopping with Al Faizan. Your premium scarves are being prepared for dispatch.
                    </p>

                    <div className="bg-background/50 border border-gray-800 rounded-xl p-4 mb-8 relative z-10">
                        <p className="text-sm text-text-muted mb-1">Your Order Number</p>
                        <p className="text-2xl font-bold text-gold tracking-widest">{orderNumber}</p>
                    </div>

                    <div className="flex items-start gap-3 text-left bg-background/50 border border-gray-800 rounded-xl p-4 mb-8 relative z-10">
                        <Package size={24} className="text-text-muted shrink-0" />
                        <div>
                            <p className="font-medium text-text-main text-sm">Cash on Delivery (COD)</p>
                            <p className="text-xs text-text-muted mt-1">Please keep the exact change ready for the rider at the time of delivery.</p>
                        </div>
                    </div>

                    <Link href="/shop" className="w-full bg-gold hover:bg-gold-hover text-background font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 relative z-10">
                        Continue Shopping <ArrowRight size={20} />
                    </Link>
                </div>
            </main>
        </div>
    );
}