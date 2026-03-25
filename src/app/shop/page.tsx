import { getAllProducts } from "@/app/actions/storefront-actions";
import ShopClient from "./ShopClient";

export const revalidate = 60; // Keep it fast

export default async function ShopPage() {
    // Fetch ALL products from the database instantly
    const products = await getAllProducts();

    return <ShopClient initialProducts={products} />;
}