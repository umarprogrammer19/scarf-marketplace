"use client";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Shield, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cart, getCartTotal, clearCart } = useCart();
    const navigate = useRouter();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        notes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Simulate order placement
        const orderId = `ORD-${Date.now()}`;

        toast.success("Order Placed Successfully!", {
            description: `Your order ${orderId} has been confirmed`,
        });

        navigate.push(`/checkout/success?${orderId}`);
        return;
    };

    if (cart.length === 0) {
        navigate.push("/cart");
        return null;
    }

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl text-white mb-4">Checkout</h1>
                    <div className="flex items-center justify-center space-x-2 text-white/60">
                        <Shield className="w-5 h-5 text-gold" />
                        <span>Secure Checkout</span>
                        <Lock className="w-4 h-4 text-gold" />
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Contact Information */}
                            <div className="bg-card border border-white/10 rounded-2xl p-8">
                                <h2 className="text-2xl font-semibold text-white mb-6">
                                    Contact Information
                                </h2>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            placeholder=" "
                                            className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-transparent focus:outline-none focus:border-gold transition-colors duration-300"
                                        />
                                        <label className="absolute left-4 top-4 text-white/60 transition-all duration-300 peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs px-1">
                                            Full Name *
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder=" "
                                            className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-transparent focus:outline-none focus:border-gold transition-colors duration-300"
                                        />
                                        <label className="absolute left-4 top-4 text-white/60 transition-all duration-300 peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs px-1">
                                            Email Address *
                                        </label>
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder=" "
                                            className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-transparent focus:outline-none focus:border-gold transition-colors duration-300"
                                        />
                                        <label className="absolute left-4 top-4 text-white/60 transition-all duration-300 peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs px-1">
                                            Phone Number *
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div className="border bg-card border-white/10 rounded-2xl p-8">
                                <h2 className="text-2xl font-semibold text-white mb-6">
                                    Shipping Address
                                </h2>
                                <div className="space-y-6">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required
                                            placeholder=" "
                                            className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-transparent focus:outline-none focus:border-gold transition-colors duration-300"
                                        />
                                        <label className="absolute left-4 top-4 text-white/60 transition-all duration-300 peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs px-1">
                                            Street Address *
                                        </label>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                required
                                                placeholder=" "
                                                className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-transparent focus:outline-none focus:border-gold transition-colors duration-300"
                                            />
                                            <label className="absolute left-4 top-4 text-white/60 transition-all duration-300 peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs px-1">
                                                City *
                                            </label>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleChange}
                                                required
                                                placeholder=" "
                                                className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-transparent focus:outline-none focus:border-gold transition-colors duration-300"
                                            />
                                            <label className="absolute left-4 top-4 text-white/60 transition-all duration-300 peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs px-1">
                                                Postal Code *
                                            </label>
                                        </div>
                                    </div>

                                    <div className="relative">
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            rows={4}
                                            placeholder=" "
                                            className="peer w-full px-4 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-transparent focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                                        />
                                        <label className="absolute left-4 top-4 text-white/60 transition-all duration-300 peer-placeholder-shown:text-white/60 peer-placeholder-shown:top-4 peer-focus:top-0 peer-focus:text-xs peer-focus:text-gold peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs px-1">
                                            Order Notes (Optional)
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-card border border-white/10 rounded-2xl p-8">
                                <h2 className="text-2xl font-semibold text-white mb-6">
                                    Payment Method
                                </h2>
                                <div className="p-6 bg-gold/10 border border-gold/30 rounded-lg">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-12 h-12 bg-gold rounded-lg flex items-center justify-center">
                                            <Shield className="w-6 h-6 text-black" />
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">Cash on Delivery (COD)</p>
                                            <p className="text-white/60 text-sm">
                                                Pay when you receive your order
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                            >
                                Place Order
                            </button>
                        </form>
                    </div>

                    {/* Order Review Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <h2 className="text-2xl font-semibold text-white mb-6">
                                Order Review
                            </h2>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                                {cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div className="flex-1">
                                            <p className="text-white text-sm font-semibold">{item.name}</p>
                                            <p className="text-white/60 text-xs">Qty: {item.quantity}</p>
                                            <p className="text-gold text-sm font-bold">${item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 border-t border-white/10 pt-4 mb-4">
                                <div className="flex justify-between text-white/70">
                                    <span>Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/70">
                                    <span>Shipping</span>
                                    <span className="text-gold">Free</span>
                                </div>
                                <div className="flex justify-between text-xl font-bold pt-3 border-t border-white/10">
                                    <span className="text-white">Total</span>
                                    <span className="text-gold">${getCartTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="text-center text-xs text-white/40">
                                <p>🔒 Your information is secure and encrypted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
