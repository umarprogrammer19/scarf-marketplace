"use client";

import { ImagePlus, Loader2, AlertCircle } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";
import { updateProduct } from "../../actions";
import { useRouter } from "next/navigation";

export default function EditForm({ product, categories }: { product: any, categories: any[] }) {
    const router = useRouter();
    // Initialize the image URL with the product's existing image
    const [imageUrl, setImageUrl] = useState(product.imageUrl);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!imageUrl) {
            setError("Please ensure an image is uploaded!");
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        try {
            await updateProduct(product.id, {
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
            setTimeout(() => {
                setSuccess(false);
                router.push("/admin/products"); // Send them back to the table
            }, 1500);
        } catch (err) {
            setError("Failed to update product. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="bg-card p-8 rounded-xl border border-border shadow-2xl">
            {success && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-500 font-medium">Product updated successfully! Redirecting...</p>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/30 rounded-lg flex items-center gap-3">
                    <AlertCircle size={20} className="text-destructive shrink-0" />
                    <p className="text-destructive">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image Upload Area */}
                <div>
                    <label className="block text-sm font-semibold text-foreground mb-3 tracking-wider uppercase">Product Image</label>
                    <CldUploadWidget
                        uploadPreset="ml_default"
                        onSuccess={(result: any) => setImageUrl(result.info.secure_url)}
                    >
                        {({ open }) => (
                            <div
                                onClick={() => open()}
                                className="border border-border rounded-xl p-4 flex items-center gap-6 cursor-pointer hover:border-primary hover:bg-secondary/30 transition-all bg-secondary/10"
                            >
                                <img src={imageUrl} alt="Current scarf" className="h-32 w-24 object-cover rounded-lg shadow-lg border border-border" />
                                <div>
                                    <p className="text-foreground font-medium mb-1 flex items-center gap-2">
                                        <ImagePlus size={18} className="text-primary" /> Replace Image
                                    </p>
                                    <p className="text-muted-foreground text-sm">Click here to upload a new image from Cloudinary.</p>
                                </div>
                            </div>
                        )}
                    </CldUploadWidget>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2 tracking-wider uppercase">Product Name</label>
                        <input type="text" name="name" defaultValue={product.name} required className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2 tracking-wider uppercase">Category</label>
                        <select name="categoryId" defaultValue={product.categoryId} required className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors">
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2 tracking-wider uppercase">Price (Rs.)</label>
                        <input type="number" name="price" step="0.01" defaultValue={Number(product.price)} required className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-foreground mb-2 tracking-wider uppercase">Stock Quantity</label>
                        <input type="number" name="stockQuantity" defaultValue={product.stockQuantity} required className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-semibold text-foreground mb-2 tracking-wider uppercase">Description</label>
                    <textarea name="description" defaultValue={product.description} required rows={5} className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors resize-none leading-relaxed" />
                </div>

                <div className="flex gap-8 border-t border-border pt-6">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" name="isNew" defaultChecked={product.isNew} className="w-5 h-5 accent-primary rounded" />
                        <span className="text-foreground font-medium tracking-wide text-sm group-hover:text-primary transition-colors">Mark as "New Arrival"</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" name="isOnSale" defaultChecked={product.isOnSale} className="w-5 h-5 accent-destructive rounded" />
                        <span className="text-foreground font-medium tracking-wide text-sm group-hover:text-destructive transition-colors">Mark as "On Sale"</span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 tracking-widest uppercase text-sm rounded-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                >
                    {isSubmitting ? <Loader2 className="animate-spin" size={20} /> : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}