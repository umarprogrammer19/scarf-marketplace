"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    slug: string;
    isNew?: boolean;
    isOnSale?: boolean;
}

export default function ProductCarousel3D({ products }: { products: Product[] }) {
    const [isPaused, setIsPaused] = useState(false);
    const count = products.length;

    return (
        <div className="w-full flex flex-col items-center">
            {/* 3D Scene container */}
            <div
                className="relative w-full max-w-[900px] mx-auto"
                style={{
                    perspective: "1000px",
                    height: "420px",
                }}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Rotating ring */}
                <div
                    className="absolute top-1/2 left-1/2 w-[180px] h-[240px]"
                    style={{
                        transformStyle: "preserve-3d",
                        animation: "carouselSpin 20s linear infinite",
                        animationPlayState: isPaused ? "paused" : "running",
                        transform: "translate(-50%, -50%) perspective(1000px)",
                        // CSS custom properties for children
                        ["--quantity" as string]: count,
                    }}
                >
                    {products.map((product, i) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="absolute inset-0 group"
                            style={{
                                transformStyle: "preserve-3d",
                                transform: `rotateY(${(360 / count) * i}deg) translateZ(350px)`,
                            }}
                        >
                            <div className="w-[180px] h-[240px] rounded-xl overflow-hidden border border-white/10 bg-[#111] transition-all duration-500 group-hover:border-primary/50 group-hover:shadow-[0_0_40px_rgba(212,175,55,0.2)] group-hover:scale-105">
                                {/* Product Image */}
                                <div className="relative w-full h-[70%] overflow-hidden">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60" />

                                    {product.isNew && (
                                        <span className="absolute top-2 left-2 bg-primary/90 text-black text-[7px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">
                                            New
                                        </span>
                                    )}
                                    {product.isOnSale && (
                                        <span className="absolute top-2 right-2 bg-red-500/90 text-white text-[7px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase">
                                            Sale
                                        </span>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="p-3">
                                    <h3 className="text-[11px] font-semibold text-white/80 truncate group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm font-bold text-primary mt-1">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Ground reflection */}
            <div className="w-[400px] h-[1px] bg-gradient-to-r from-transparent via-primary/25 to-transparent mt-2" />
            <div className="w-[200px] h-[60px] bg-primary/[0.03] blur-[30px] -mt-4 rounded-full" />
        </div>
    );
}
