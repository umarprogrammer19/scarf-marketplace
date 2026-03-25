import FAQs from "@/components/home/faqs";
import FlashSale from "@/components/home/flash-sale";
import Hero from "@/components/home/hero-section";
import NewArrivals from "@/components/home/new-arrivals";
import Reviews from "@/components/home/Reviews";
import { getAllProducts } from "@/app/actions/storefront-actions";

export const revalidate = 60;

export default async function HomePage() {
    // 1. Fetch ALL real products from Neon DB instantly
    const allProducts = await getAllProducts();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Hero />
            <NewArrivals products={allProducts} />
            <FlashSale products={allProducts} />
            <Reviews />
            <FAQs />
        </div>
    );
}