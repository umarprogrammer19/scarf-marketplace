"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "left" | "right";
}

export default function ScrollReveal({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                    observer.unobserve(el);
                }
            },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [delay]);

    const directionClass = {
        up: "translate-y-10",
        left: "translate-x-10",
        right: "-translate-x-10",
    }[direction];

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible ? "opacity-100 translate-y-0 translate-x-0" : `opacity-0 ${directionClass}`
            } ${className}`}
        >
            {children}
        </div>
    );
}
