import { getProductById, getAllProducts } from "@/app/actions/storefront-actions";
import { notFound } from "next/navigation";
import ProductClient from "./ProductClient";

export const revalidate = 60;

export default async function ProductDetailPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    // 1. Await params for Next.js 16
    const resolvedParams = await params;

    // 2. Fetch the single product
    const product = await getProductById(resolvedParams.id);

    // If product doesn't exist, show 404
    if (!product) {
        notFound();
    }

    // 3. Fetch all products to find related ones in the same category
    const allProducts = await getAllProducts();
    const relatedProducts = allProducts
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return <ProductClient product={product} relatedProducts={relatedProducts} />;
}