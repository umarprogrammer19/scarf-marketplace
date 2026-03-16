import Link from "next/link";
import Navbar from "@/components/storefront/Navbar";
import Footer from "@/components/storefront/Footer";
import { Home, Truck, Mail, HelpCircle, Check } from "lucide-react";

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ order: string }>;
}) {
    const params = await searchParams;
    const orderNumber = params.order || "#SH-99281";

    const estDelivery = new Date();
    estDelivery.setDate(estDelivery.getDate() + 5);
    const deliveryDate = estDelivery.toLocaleDateString("en-US", {
        month: "short", day: "numeric", year: "numeric",
    });

    // Mock order items — replace with real DB fetch using orderNumber
    const orderItems = [
        {
            id: 1,
            name: "Azure Silk Floral Scarf",
            detail: "Pure Mulberry Silk • 180cm x 90cm",
            qty: 1,
            price: 85,
            image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=200&q=80",
        },
        {
            id: 2,
            name: "Classic Crimson Cashmere",
            detail: "Premium Cashmere • Heavy Weight",
            qty: 1,
            price: 120,
            image: "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=200&q=80",
        },
    ];

    const subtotal = orderItems.reduce((sum, i) => sum + i.price * i.qty, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-[#0d0f14] text-white flex flex-col">
            <Navbar />

            <main className="flex-1 pt-20 pb-16 flex items-center justify-center">
                <div className="max-w-lg w-full mx-auto px-4">

                    {/* ===== SUCCESS ICON ===== */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#c9a84c] mb-6 shadow-[0_0_30px_rgba(201,168,76,0.4)]">
                            <Check size={28} className="text-black" strokeWidth={3} />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">
                            Thank you for your purchase!
                        </h1>
                        <p className="text-sm text-white/45 max-w-sm mx-auto leading-relaxed">
                            Your order is confirmed and being prepared for shipment. We&apos;ll send you an update when it&apos;s on the way.
                        </p>
                    </div>

                    {/* ===== ORDER INFO CARDS ===== */}
                    <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-5">
                            <p className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30 mb-2">
                                Order Number
                            </p>
                            <p className="text-lg font-black text-[#c9a84c] tracking-wider">
                                {orderNumber}
                            </p>
                        </div>
                        <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-5">
                            <p className="text-[9px] font-black tracking-[0.2em] uppercase text-white/30 mb-2">
                                Est. Delivery
                            </p>
                            <p className="text-lg font-black text-white">
                                {deliveryDate}
                            </p>
                        </div>
                    </div>

                    {/* ===== ORDER SUMMARY ===== */}
                    <div className="bg-[#12172a] border border-[#1e2640] rounded-xl p-6 mb-6">
                        <h2 className="text-sm font-bold text-white mb-5">Order Summary</h2>

                        {/* Items */}
                        <div className="space-y-4 pb-5 border-b border-white/[0.06]">
                            {orderItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-4">
                                    {/* Thumbnail */}
                                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#0d0f14] border border-white/[0.07] shrink-0">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-white line-clamp-1">{item.name}</p>
                                        <p className="text-[10px] text-white/35 mt-0.5">{item.detail}</p>
                                        <p className="text-[10px] text-white/35 mt-0.5">Qty: {item.qty}</p>
                                    </div>
                                    {/* Price */}
                                    <p className="text-sm font-black text-[#c9a84c] shrink-0">
                                        ${item.price.toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* Subtotals */}
                        <div className="space-y-2.5 py-4 border-b border-white/[0.06]">
                            <div className="flex justify-between text-xs">
                                <span className="text-white/40">Subtotal</span>
                                <span className="text-white">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                                <span className="text-white/40">Shipping</span>
                                <span className="text-green-400 font-bold">Free</span>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center pt-4">
                            <span className="text-sm font-black text-white">Total</span>
                            <span className="text-lg font-black text-white">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* ===== ACTION BUTTONS ===== */}
                    <div className="flex flex-col sm:flex-row gap-3 mb-8">
                        <Link
                            href="/"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#12172a] border border-[#1e2640] text-white hover:border-[#c9a84c] hover:text-[#c9a84c] font-bold py-3.5 rounded-lg transition-all text-xs tracking-wider uppercase"
                        >
                            <Home size={15} />
                            Return to Homepage
                        </Link>
                        <Link
                            href="/shop"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#12172a] border border-[#1e2640] text-white hover:border-[#c9a84c] hover:text-[#c9a84c] font-bold py-3.5 rounded-lg transition-all text-xs tracking-wider uppercase"
                        >
                            <Truck size={15} />
                            Track My Order
                        </Link>
                    </div>

                    {/* ===== HELP LINKS ===== */}
                    <div className="text-center">
                        <p className="text-xs text-white/30 mb-3">Need help with your order?</p>
                        <div className="flex items-center justify-center gap-6">
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-1.5 text-xs text-[#c9a84c] hover:text-[#e0bc6a] transition-colors"
                            >
                                <Mail size={13} />
                                Contact Support
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-1.5 text-xs text-[#c9a84c] hover:text-[#e0bc6a] transition-colors"
                            >
                                <HelpCircle size={13} />
                                FAQ
                            </Link>
                        </div>
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    );
}