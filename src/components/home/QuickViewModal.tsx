import { X, Plus, Minus } from "lucide-react";
import { Product } from "../../data/mockData";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

interface QuickViewModalProps {
    product: Product;
    isOpen: boolean;
    onClose: () => void;
}

export default function QuickViewModal({
    product,
    isOpen,
    onClose,
}: QuickViewModalProps) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);

    if (!isOpen) return null;

    const handleAddToCart = () => {
        addToCart(product, quantity);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-card rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all duration-300"
                >
                    <X className="w-5 h-5" />
                </button>

                <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Image */}
                    <div className="relative aspect-square rounded-lg overflow-hidden">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <p className="text-gold text-sm uppercase tracking-wider mb-2">
                            {product.category}
                        </p>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            {product.name}
                        </h2>

                        <div className="flex items-center space-x-3 mb-6">
                            <span className="text-3xl font-bold text-gold">
                                ${product.price}
                            </span>
                            {product.originalPrice && (
                                <span className="text-xl text-white/40 line-through">
                                    ${product.originalPrice}
                                </span>
                            )}
                        </div>

                        <p className="text-white/70 mb-6 leading-relaxed">
                            {product.description}
                        </p>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between py-3 border-b border-white/10">
                                <span className="text-white/60">Fabric:</span>
                                <span className="text-white">{product.fabric}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/10">
                                <span className="text-white/60">Dimensions:</span>
                                <span className="text-white">{product.dimensions}</span>
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-white/10">
                                <span className="text-white/60">Color:</span>
                                <span className="text-white">{product.color}</span>
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center space-x-4 mb-6">
                            <span className="text-white">Quantity:</span>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
                                >
                                    <Minus className="w-4 h-4" />
                                </button>
                                <span className="w-12 text-center text-white font-semibold">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white hover:bg-gold hover:text-black hover:border-gold transition-all duration-300"
                                >
                                    <Plus className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={!product.inStock}
                            className="w-full py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
