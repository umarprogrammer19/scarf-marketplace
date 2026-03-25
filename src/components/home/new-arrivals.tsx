import { products } from "../../data/mockData";
import ProductCard from "./ProductCard";

export default function NewArrivals() {
    const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

    return (
        <section className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <span className="text-gold text-sm tracking-widest uppercase mb-4 block">
                        Latest Collection
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-white">
                        New Arrivals
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto">
                        Explore our newest additions, carefully curated to bring you the finest in luxury scarves
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {newArrivals.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
