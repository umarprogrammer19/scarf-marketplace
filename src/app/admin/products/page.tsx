// src/app/admin/products/page.tsx
import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";
import { deleteProduct } from "./actions";

export default async function AdminProductsList() {
    // Fetch products and join with categories to get the category name
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

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif text-foreground mb-2">Inventory Management</h1>
                    <p className="text-muted-foreground">Manage your scarf catalog, pricing, and stock.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    <Plus size={20} /> Add New Product
                </Link>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-200">
                        <thead>
                            <tr className="border-b border-border bg-secondary/50">
                                <th className="p-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">Product</th>
                                <th className="p-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">Category</th>
                                <th className="p-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">Price</th>
                                <th className="p-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">Stock</th>
                                <th className="p-4 text-xs font-bold tracking-widest text-muted-foreground uppercase">Status</th>
                                <th className="p-4 text-xs font-bold tracking-widest text-muted-foreground uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {allProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-12 text-center text-muted-foreground">
                                        No products found. Click "Add New Product" to start building your catalog.
                                    </td>
                                </tr>
                            ) : (
                                allProducts.map((product) => (
                                    <tr key={product.id} className="hover:bg-secondary/20 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-4">
                                                <img src={product.imageUrl} alt={product.name} className="w-12 h-16 object-cover rounded-md border border-border" />
                                                <span className="font-semibold text-foreground line-clamp-1">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-muted-foreground">{product.categoryName}</td>
                                        <td className="p-4 font-medium text-primary">Rs. {Number(product.price).toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stockQuantity > 0 ? 'bg-green-500/10 text-green-500' : 'bg-destructive/10 text-destructive'}`}>
                                                {product.stockQuantity} in stock
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-2">
                                                {product.isNew && <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 border border-primary/50 text-primary rounded-full">New</span>}
                                                {product.isOnSale && <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-1 border border-destructive/50 text-destructive rounded-full">Sale</span>}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Link
                                                    href={`/admin/products/${product.id}/edit`}
                                                    className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                    title="Edit Product"
                                                >
                                                    <Edit size={18} />
                                                </Link>

                                                {/* Delete Button (Using Server Action) */}
                                                <form action={async () => {
                                                    "use server";
                                                    await deleteProduct(product.id);
                                                }}>
                                                    <button
                                                        type="submit"
                                                        className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                                                        title="Delete Product"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}