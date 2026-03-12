import { db } from "@/db";
import { categories } from "@/db/schema";
import { createCategory } from "./actions";
import { Plus } from "lucide-react";

export default async function CategoriesPage() {
    // Fetch all existing categories directly from Neon DB
    const allCategories = await db.select().from(categories).orderBy(categories.id);

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-serif text-text-main mb-8">Manage Categories</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Side: The Form */}
                <div className="md:col-span-1">
                    <div className="bg-surface p-6 rounded-xl border border-gray-800">
                        <h2 className="text-lg font-medium text-text-main mb-4">Add New Category</h2>

                        {/* The Form calls our Server Action directly */}
                        <form action={createCategory} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm text-text-muted mb-2">
                                    Category Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="e.g., Premium Silk"
                                    required
                                    className="w-full bg-background border border-gray-800 rounded-lg px-4 py-2 text-text-main focus:outline-none focus:border-gold transition-colors"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gold hover:bg-gold-hover text-background font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus size={18} />
                                Add Category
                            </button>
                        </form>
                    </div>
                </div>

                {/* Right Side: The List of Categories */}
                <div className="md:col-span-2">
                    <div className="bg-surface rounded-xl border border-gray-800 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-800 bg-background/50">
                                    <th className="p-4 text-sm font-medium text-text-muted">ID</th>
                                    <th className="p-4 text-sm font-medium text-text-muted">Name</th>
                                    <th className="p-4 text-sm font-medium text-text-muted">Slug (URL)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="p-8 text-center text-text-muted">
                                            No categories found. Add your first one!
                                        </td>
                                    </tr>
                                ) : (
                                    allCategories.map((cat) => (
                                        <tr key={cat.id} className="border-b border-gray-800/50 hover:bg-background/30 transition-colors">
                                            <td className="p-4 text-text-muted">#{cat.id}</td>
                                            <td className="p-4 text-text-main font-medium">{cat.name}</td>
                                            <td className="p-4 text-text-muted font-mono text-sm">{cat.slug}</td>
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