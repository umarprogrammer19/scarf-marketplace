import { XCircle, RefreshCw, Mail } from "lucide-react";
import Link from "next/link";

export default function OrderFailedPage() {
    return (
        <div className="min-h-screen pt-20 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center animate-fade-in">
                <div className="mb-8">
                    <div className="w-32 h-32 bg-destructive/10 border-4 border-destructive rounded-full flex items-center justify-center mx-auto mb-6">
                        <XCircle className="w-16 h-16 text-destructive" />
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl text-white mb-4">
                        Order Failed
                    </h1>

                    <p className="text-xl text-white/70 mb-8">
                        We're sorry, but we couldn't process your order. Please try again.
                    </p>
                </div>

                <div className="bg-linear-to-br from-white/5 to-white/2 border border-white/10 rounded-2xl p-8 backdrop-blur-sm mb-8">
                    <h3 className="text-white font-semibold mb-4">What went wrong?</h3>
                    <ul className="text-white/60 text-left space-y-2 max-w-md mx-auto">
                        <li>• Payment information may have been incorrect</li>
                        <li>• Network connection issues</li>
                        <li>• Items in your cart may be out of stock</li>
                        <li>• Technical error on our end</li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                    <Link
                        href="/checkout"
                        className="px-8 py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] inline-flex items-center justify-center space-x-2"
                    >
                        <RefreshCw className="w-5 h-5" />
                        <span>Try Again</span>
                    </Link>

                    <Link
                        href="/contact"
                        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-lg hover:bg-white/10 hover:border-gold transition-all duration-300 inline-flex items-center justify-center space-x-2"
                    >
                        <Mail className="w-5 h-5" />
                        <span>Contact Support</span>
                    </Link>
                </div>

                <div className="text-white/40 text-sm">
                    <p>Order ID: ORD-{Date.now()}</p>
                    <p className="mt-2">Please save this for reference if you contact support</p>
                </div>
            </div>
        </div>
    );
}
