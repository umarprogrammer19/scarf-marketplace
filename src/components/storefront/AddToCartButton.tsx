"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

interface AddToCartProps {
    product: {
        id: number;
        name: string;
        price: string;
        imageUrl: string;
        stockQuantity: number;
    };
}

export default function AddToCartButton({ product }: AddToCartProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAdd = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1,
        });
        alert(`${product.name} added to cart!`); // We will make this a nice toast notification later
    };

    return (
        <button
            onClick={handleAdd}
            disabled={product.stockQuantity === 0}
            className="w-full bg-gold hover:bg-gold-hover text-background font-bold text-lg py-5 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mb-8 hover:shadow-[0_0_20px_rgba(197,160,89,0.3)]"
        >
            <ShoppingBag size={24} />
            {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
    );
}