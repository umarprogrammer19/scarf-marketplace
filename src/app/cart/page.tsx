"use client"
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen pt-20 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <ShoppingBag className="w-24 h-24 text-gold/20 mx-auto mb-6" />
                    <h1 className="text-4xl text-white mb-4">Your Cart is Empty</h1>
                    <p className="text-white/60 mb-8">
                        Looks like you haven't added anything to your cart yet
                    </p>
                    <Link
                        href="/shop"
                        className="inline-block px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl md:text-5xl text-white mb-12">Shopping Cart</h1>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row gap-6 bg-card border border-white/10 rounded-xl p-6 hover:border-gold/30 transition-all duration-300"
                            >
                                <Link
                                    href={`/product/${item.id}`}
                                    className="w-full sm:w-32 h-32 shrink-0 rounded-lg overflow-hidden"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                    />
                                </Link>

                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <Link href={`/product/${item.id}`}>
                                            <h3 className="text-xl font-semibold text-white mb-1 hover:text-gold transition-colors">
                                                {item.name}
                                            </h3>
                                        </Link>
                                        <p className="text-sm text-white/60 mb-2">{item.category}</p>
                                        <p className="text-xl font-bold text-gold">${item.price}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
                                            >
                                                <Minus className="w-4 h-4 mx-auto" />
                                            </button>
                                            <span className="text-white font-semibold w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
                                            >
                                                <Plus className="w-4 h-4 mx-auto" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-destructive hover:text-destructive/80 transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 backdrop-blur-sm">
                            <h2 className="text-2xl font-semibold text-white mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between text-white/70">
                                    <span>Subtotal</span>
                                    <span>${getCartTotal().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white/70">
                                    <span>Shipping</span>
                                    <span className="text-gold">Free</span>
                                </div>
                                <div className="flex justify-between text-white/70">
                                    <span>Tax</span>
                                    <span>Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="border-t border-white/10 pt-4 mb-6">
                                <div className="flex justify-between text-xl font-bold">
                                    <span className="text-white">Total</span>
                                    <span className="text-gold">${getCartTotal().toFixed(2)}</span>
                                </div>
                            </div>

                            <Link
                                href="/checkout"
                                className="block w-full py-4 bg-gold text-black text-center font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-4"
                            >
                                Proceed to Checkout
                            </Link>

                            <Link
                                href="/shop"
                                className="block w-full py-4 bg-white/5 border border-white/10 text-white text-center font-semibold rounded-lg hover:bg-white/10 hover:border-gold transition-all duration-300"
                            >
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
