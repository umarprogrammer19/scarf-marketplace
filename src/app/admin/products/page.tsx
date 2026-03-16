import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Edit, Trash2, Filter } from "lucide-react";
import { deleteProduct } from "./actions";

export default async function AdminProductsList() {
    const allProducts = await db
        .select({
            id: products.id,
            name: products.name,
            price: products.price,
            stockQuantity: products.stockQuantity,
            imageUrl: products.imageUrl,
            isNew: products.isNew,
            isOnSale: products.isOnSale,
            categoryName: categories.name,
        })
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .orderBy(desc(products.createdAt));

    const getStockBadge = (qty: number) => {
        if (qty === 0) return { label: "Out of Stock", cls: "bg-red-500/10 text-red-500" };
        if (qty <= 15) return { label: `Low Stock (${qty})`, cls: "bg-yellow-500/10 text-yellow-500" };
        return { label: `In Stock (${qty})`, cls: "bg-green-500/10 text-green-500" };
    };

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Product Inventory</h1>
                    <p className="text-sm text-muted-foreground">Manage and monitor your catalog&apos;s availability and pricing.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex bg-secondary rounded-lg border border-border text-xs font-medium">
                        <button className="px-3 py-1.5 bg-foreground text-background rounded-lg">All Items</button>
                        <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors">Active</button>
                        <button className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors">Archived</button>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-border rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <Filter size={14} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-primary">Thumbnail</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-primary">Product Name</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-primary">Material</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-primary">Price</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-primary">Stock Status</th>
                                <th className="py-3 px-4 text-[10px] font-bold tracking-widest uppercase text-primary text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {allProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="py-12 text-center text-muted-foreground text-sm">
                                        No products found. Click &quot;+ New Product&quot; to start building your catalog.
                                    </td>
                                </tr>
                            ) : (
                                allProducts.map((product) => {
                                    const stock = getStockBadge(product.stockQuantity);
                                    return (
                                        <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                                            <td className="py-3 px-4">
                                                <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary">
                                                    <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                <p className="font-semibold text-foreground text-sm line-clamp-1">{product.name}</p>
                                            </td>
                                            <td className="py-3 px-4 text-sm text-muted-foreground">
                                                {product.categoryName || "Uncategorized"}
                                            </td>
                                            <td className="py-3 px-4 text-sm font-semibold text-primary">
                                                Rs. {Number(product.price).toLocaleString()}
                                            </td>
                                            <td className="py-3 px-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${stock.cls}`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                    {stock.label}
                                                </span>
                                            </td>
                                            <td className="py-3 px-4 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <Link
                                                        href={`/admin/products/${product.id}/edit`}
                                                        className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <form action={async () => { "use server"; await deleteProduct(product.id); }}>
                                                        <button
                                                            type="submit"
                                                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                            title="Delete"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </form>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Footer */}
                {allProducts.length > 0 && (
                    <div className="border-t border-border px-4 py-3 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">
                            Showing <span className="text-foreground font-semibold">1</span> to{" "}
                            <span className="text-foreground font-semibold">{allProducts.length}</span> of{" "}
                            <span className="text-foreground font-semibold">{allProducts.length}</span> products
                        </p>
                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">1</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
