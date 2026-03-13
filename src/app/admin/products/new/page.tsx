"use client";

import { ImagePlus, Loader2, AlertCircle } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { createProduct } from "../actions";

export default function ProductsPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const categories = [{ id: 1, name: "Premium Silk" }, { id: 2, name: "Summer Lawn" }];

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!imageUrl) {
            setError("Please upload an image first!");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            await createProduct({
                name: formData.get("name") as string,
                categoryId: Number(formData.get("categoryId")),
                description: formData.get("description") as string,
                price: formData.get("price") as string,
                stockQuantity: Number(formData.get("stockQuantity")),
                isNew: formData.get("isNew") === "on",
                isOnSale: formData.get("isOnSale") === "on",
                imageUrl: imageUrl,
            });

            setSuccess(true);
            setImageUrl("");
            (e.target as HTMLFormElement).reset();

            // Clear success message after 3 seconds
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            setError("Failed to add product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground mb-2">Add New Product</h1>
                <p className="text-muted-foreground">Create a new premium scarf listing</p>
            </div>

            {/* Success Message */}
            {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-500 font-medium">Product added successfully!</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
                    <AlertCircle size={20} className="text-destructive shrink-0" />
                    <p className="text-destructive">{error}</p>
                </div>
            )}

            <div className="bg-card p-8 rounded-xl border border-border">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Image Upload Area */}
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">Product Image</label>
                        <CldUploadWidget
                            uploadPreset="ml_default"
                            onSuccess={(result: any) => setImageUrl(result.info.secure_url)}
                        >
                            {({ open }) => (
                                <div
                                    onClick={() => open()}
                                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-all ${imageUrl ? 'border-primary bg-primary/10' : 'border-border hover:border-primary hover:bg-secondary/30'}`}
                                >
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Uploaded scarf" className="h-40 object-cover rounded-lg" />
                                    ) : (
                                        <>
                                            <ImagePlus size={40} className="text-muted-foreground mb-4" />
                                            <p className="text-foreground font-medium">Click to upload scarf image</p>
                                            <p className="text-muted-foreground text-sm mt-1">PNG, JPG up to 10MB</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </CldUploadWidget>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Product Name</label>
                            <input type="text" name="name" required className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors" placeholder="e.g., Midnight Blue Silk" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Category</label>
                            <select name="categoryId" required className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors">
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Price (Rs.)</label>
                            <input type="number" name="price" step="0.01" required className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors" placeholder="2500.00" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-foreground mb-2">Stock Quantity</label>
                            <input type="number" name="stockQuantity" required className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors" placeholder="50" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
                        <textarea name="description" required rows={4} className="w-full bg-secondary border border-border rounded-lg px-4 py-2 text-foreground placeholder-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-colors resize-none" placeholder="Describe the fabric, dimensions, and feel..." />
                    </div>

                    <div className="space-y-3 border-t border-border pt-6">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="isNew" className="w-5 h-5 accent-primary rounded" />
                            <span className="text-foreground font-medium group-hover:text-primary transition-colors">Mark as "New Arrival"</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" name="isOnSale" className="w-5 h-5 accent-primary rounded" />
                            <span className="text-foreground font-medium group-hover:text-primary transition-colors">Mark as "On Sale"</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !imageUrl}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Save Product to Database'}
                    </button>
                </form>
            </div>
        </div>
    );
}
