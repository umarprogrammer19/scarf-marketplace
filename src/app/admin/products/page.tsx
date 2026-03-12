"use client"; 

import { ImagePlus, Loader2 } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { createProduct } from "./actions";

export default function ProductsPage() {
    const [imageUrl, setImageUrl] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    // In a real app, you'd fetch these from the DB, but let's hardcode for the UI test
    const categories = [{ id: 1, name: "Premium Silk" }, { id: 2, name: "Summer Lawn" }];

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!imageUrl) return alert("Please upload an image first!");

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

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

        setIsSubmitting(false);
        setImageUrl("");
        (e.target as HTMLFormElement).reset();
        alert("Product added successfully!");
    }

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-serif text-text-main mb-8">Add New Scarf</h1>

            <div className="bg-surface p-8 rounded-xl border border-gray-800">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Image Upload Area */}
                    <div>
                        <label className="block text-sm text-text-muted mb-2">Product Image</label>
                        <CldUploadWidget
                            uploadPreset="ml_default" // Create an unsigned preset in Cloudinary settings!
                            onSuccess={(result: any) => setImageUrl(result.info.secure_url)}
                        >
                            {({ open }) => (
                                <div
                                    onClick={() => open()}
                                    className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${imageUrl ? 'border-gold bg-gold/10' : 'border-gray-700 hover:border-gold hover:bg-surface/50'
                                        }`}
                                >
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Uploaded scarf" className="h-40 object-cover rounded-lg" />
                                    ) : (
                                        <>
                                            <ImagePlus size={40} className="text-text-muted mb-4" />
                                            <p className="text-text-main font-medium">Click to upload scarf image</p>
                                            <p className="text-text-muted text-sm mt-1">Powered by Cloudinary</p>
                                        </>
                                    )}
                                </div>
                            )}
                        </CldUploadWidget>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm text-text-muted mb-2">Product Name</label>
                            <input type="text" name="name" required className="w-full bg-background border border-gray-800 rounded-lg px-4 py-2 text-text-main focus:border-gold outline-none" placeholder="e.g., Midnight Blue Silk" />
                        </div>

                        <div>
                            <label className="block text-sm text-text-muted mb-2">Category</label>
                            <select name="categoryId" required className="w-full bg-background border border-gray-800 rounded-lg px-4 py-2 text-text-main focus:border-gold outline-none">
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-text-muted mb-2">Price (Rs.)</label>
                            <input type="number" name="price" step="0.01" required className="w-full bg-background border border-gray-800 rounded-lg px-4 py-2 text-text-main focus:border-gold outline-none" placeholder="2500.00" />
                        </div>

                        <div>
                            <label className="block text-sm text-text-muted mb-2">Stock Quantity</label>
                            <input type="number" name="stockQuantity" required className="w-full bg-background border border-gray-800 rounded-lg px-4 py-2 text-text-main focus:border-gold outline-none" placeholder="50" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm text-text-muted mb-2">Description</label>
                        <textarea name="description" required rows={4} className="w-full bg-background border border-gray-800 rounded-lg px-4 py-2 text-text-main focus:border-gold outline-none" placeholder="Describe the fabric, dimensions, and feel..." />
                    </div>

                    <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="isNew" className="w-5 h-5 accent-gold" />
                            <span className="text-text-main">Mark as "New Arrival"</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" name="isOnSale" className="w-5 h-5 accent-gold" />
                            <span className="text-text-main">Mark as "On Sale"</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting || !imageUrl}
                        className="w-full bg-gold hover:bg-gold-hover text-background font-bold py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : 'Save Product to Database'}
                    </button>
                </form>
            </div>
        </div>
    );
}