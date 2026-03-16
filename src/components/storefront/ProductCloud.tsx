"use client";

import { IconCloud } from "@/components/magicui/icon-cloud";

export default function ProductCloud({ images }: { images: string[] }) {
    return (
        <div className="relative w-full h-full">
            <IconCloud imageArray={images} />
        </div>
    );
}