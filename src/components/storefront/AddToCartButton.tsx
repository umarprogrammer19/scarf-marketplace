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
        alert(`${product.name} added to cart!`);
    };

    return (
        <button
            onClick={handleAdd}
            disabled={product.stockQuantity === 0}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm tracking-wider uppercase py-4 rounded-lg transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] mb-3"
        >
            <ShoppingBag size={18} />
            {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
    );
}
