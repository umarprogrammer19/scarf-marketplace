import { db } from "@/db";
import { categories } from "@/db/schema";
import { createCategory } from "./actions";
import { Plus } from "lucide-react";

export default async function CategoriesPage() {
    const allCategories = await db.select().from(categories).orderBy(categories.id);

    return (
        <div className="max-w-6xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Manage Categories</h1>
                <p className="text-muted-foreground">Create and manage product categories</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Side: The Form */}
                <div className="lg:col-span-1">
                    <div className="bg-card p-6 rounded-xl border border-border sticky top-8">
                        <h2 className="text-lg font-semibold text-foreground mb-4">Add New Category</h2>

                        <form action={createCategory} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="e.g., Premium Silk"
                                    required
                                    className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={18} />
                                Add Category
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side: The List of Categories */}
                <div className="lg:col-span-2">
                    <div className="bg-card rounded-xl border border-border overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-border bg-secondary/50">
                                    <th className="p-4 text-sm font-semibold text-foreground">ID</th>
                                    <th className="p-4 text-sm font-semibold text-foreground">Name</th>
                                    <th className="p-4 text-sm font-semibold text-foreground">Slug (URL)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {allCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-muted-foreground">
                                            No categories found. Add your first one!
                                        </td>
                                    </tr>
                                ) : (
                                    allCategories.map((cat) => (
                                        <tr key={cat.id} className="hover:bg-secondary/30 transition-colors">
                                            <td className="p-4 text-muted-foreground text-sm font-mono">#{cat.id}</td>
                                            <td className="p-4 text-foreground font-medium">{cat.name}</td>
                                            <td className="p-4 text-muted-foreground font-mono text-sm">{cat.slug}</td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
