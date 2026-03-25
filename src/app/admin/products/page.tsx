// src/app/admin/products/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Edit, Trash2, Upload, Loader2, PackageOpen } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createProduct, updateProduct, deleteProduct, getCategories } from "./actions";
import { getAllProducts } from "@/app/actions/storefront-actions";
import { Product } from "@/types";
import { CldUploadWidget } from "next-cloudinary";

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [dbCategories, setDbCategories] = useState<{ id: number, name: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // NEW: Track if we are editing an existing product
    const [editingId, setEditingId] = useState<string | null>(null);
    const [imageUrl, setImageUrl] = useState("");

    const defaultForm = {
        name: "", price: "", originalPrice: "", categoryId: "",
        fabric: "", color: "", dimensions: "200cm x 70cm", description: "",
        stockQuantity: 10, isNew: false, isFlashSale: false,
    };

    const [formData, setFormData] = useState(defaultForm);

    // Fetch real data on load
    const loadData = async () => {
        setIsLoading(true);
        const fetchedProducts = await getAllProducts();
        const fetchedCategories = await getCategories();
        setProducts(fetchedProducts);
        setDbCategories(fetchedCategories);
        if (fetchedCategories.length > 0) {
            setFormData(prev => ({ ...prev, categoryId: String(fetchedCategories[0].id) }));
            defaultForm.categoryId = String(fetchedCategories[0].id);
        }
        setIsLoading(false);
    };

    useEffect(() => { loadData(); }, []);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Open Modal for Editing
    const handleEditClick = (product: any) => {
        // Find the actual Category ID based on the string name from UI
        const catId = dbCategories.find(c => c.name === product.category)?.id || dbCategories[0]?.id;

        setFormData({
            name: product.name, price: String(product.price),
            originalPrice: product.originalPrice ? String(product.originalPrice) : "",
            categoryId: String(catId), fabric: product.fabric, color: product.color,
            dimensions: product.dimensions, description: product.description,
            stockQuantity: product.stockQuantity || 0, isNew: product.isNew, isFlashSale: product.isFlashSale,
        });
        setImageUrl(product.image);
        setEditingId(product.id);
        setShowModal(true);
    };

    // Open Modal for Adding
    const handleAddClick = () => {
        setFormData(defaultForm);
        setImageUrl("");
        setEditingId(null);
        setShowModal(true);
    };

    // Handle Delete
    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        const res = await deleteProduct(id);
        if (res.success) {
            toast.success("Deleted!", { description: "Product removed from database." });
            loadData();
        } else {
            toast.error("Error", { description: res.error });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageUrl) { toast.error("Image Required", { description: "Please upload an image." }); return; }
        setIsSubmitting(true);

        const payload = {
            name: formData.name, categoryId: Number(formData.categoryId), description: formData.description,
            price: formData.price, originalPrice: formData.originalPrice, fabric: formData.fabric,
            dimensions: formData.dimensions, color: formData.color, image: imageUrl,
            stockQuantity: Number(formData.stockQuantity), inStock: Number(formData.stockQuantity) > 0,
            isNew: formData.isNew, isFlashSale: formData.isFlashSale,
        };

        const result = editingId
            ? await updateProduct(editingId, payload)
            : await createProduct(payload);

        if (result.success) {
            toast.success(editingId ? "Product Updated" : "Product Added", { description: "Successfully saved to database." });
            setShowModal(false);
            loadData(); // Refresh list
        } else {
            toast.error("Error", { description: result.error });
        }
        setIsSubmitting(false);
    };

    if (isLoading) return <div className="p-8 text-white flex items-center gap-3"><Loader2 className="animate-spin" /> Loading inventory...</div>;

    return (
        <div className="p-4 lg:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl text-white mb-2">Products Management</h1>
                    <p className="text-white/60">Manage your inventory, prices, and stock</p>
                </div>
                <button onClick={handleAddClick} className="mt-4 md:mt-0 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Add New Product</span>
                </button>
            </div>

            <div className="bg-card border border-white/10 rounded-xl p-6 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold" />
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product: any) => (
                    <div key={product.id} className="bg-card border border-white/10 rounded-xl overflow-hidden hover:border-gold/30 transition-all">
                        <div className="relative aspect-square">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                            {(!product.stockQuantity || product.stockQuantity < 1) && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="px-4 py-2 bg-destructive text-white font-semibold rounded-lg">Out of Stock</span>
                                </div>
                            )}
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                                <p className="text-xs text-gold uppercase tracking-wider">{product.category}</p>
                                <span className="text-xs text-white/40 flex items-center gap-1"><PackageOpen size={12} /> {product.stockQuantity}</span>
                            </div>
                            <h3 className="text-white font-semibold mb-2 line-clamp-1">{product.name}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <p className="text-2xl font-bold text-gold">${product.price}</p>
                                {product.originalPrice && <p className="text-sm text-white/40 line-through">${product.originalPrice}</p>}
                            </div>

                            <div className="flex gap-2">
                                <button onClick={() => handleEditClick(product)} className="flex-1 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-gold flex items-center justify-center space-x-2 transition-all">
                                    <Edit className="w-4 h-4" /> <span className="text-sm">Edit</span>
                                </button>
                                <button onClick={() => handleDelete(product.id)} className="px-4 py-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg hover:bg-destructive hover:text-white transition-all">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal */}
            <Dialog.Root open={showModal} onOpenChange={setShowModal}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
                    <Dialog.Content onInteractOutside={(e) => e.preventDefault()} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto z-50">
                        <Dialog.Close className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all">
                            <X className="w-5 h-5" />
                        </Dialog.Close>

                        <h2 className="text-2xl font-semibold text-white mb-6">
                            {editingId ? "Edit Product" : "Add New Product"}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-white mb-2">Product Image *</label>
                                <CldUploadWidget uploadPreset="ml_default" onSuccess={(result: any) => setImageUrl(result.info.secure_url)}>
                                    {({ open }) => (
                                        <div onClick={() => open()} className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-gold/30 cursor-pointer">
                                            {imageUrl ? <img src={imageUrl} alt="Uploaded" className="h-32 mx-auto rounded-lg object-cover" /> : <><Upload className="w-8 h-8 text-white/40 mx-auto mb-2" /><p className="text-white/60 text-sm">Upload Image</p></>}
                                        </div>
                                    )}
                                </CldUploadWidget>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div><label className="block text-white mb-2 text-sm">Product Name *</label><input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" /></div>
                                <div><label className="block text-white mb-2 text-sm">Category *</label><select value={formData.categoryId} onChange={e => setFormData({ ...formData, categoryId: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold">{dbCategories.map(cat => (<option key={cat.id} value={cat.id} className="bg-black">{cat.name}</option>))}</select></div>
                                <div><label className="block text-white mb-2 text-sm">Sale Price ($) *</label><input type="number" step="0.01" required value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" /></div>
                                <div><label className="block text-white mb-2 text-sm">Original Price ($) <span className="text-white/40">(Optional)</span></label><input type="number" step="0.01" value={formData.originalPrice} onChange={e => setFormData({ ...formData, originalPrice: e.target.value })} placeholder="e.g. 399.99" className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" /></div>
                                <div><label className="block text-white mb-2 text-sm">Stock Quantity *</label><input type="number" required value={formData.stockQuantity} onChange={e => setFormData({ ...formData, stockQuantity: Number(e.target.value) })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" /></div>
                                <div><label className="block text-white mb-2 text-sm">Color *</label><input required value={formData.color} onChange={e => setFormData({ ...formData, color: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" /></div>
                                <div><label className="block text-white mb-2 text-sm">Fabric *</label><input required value={formData.fabric} onChange={e => setFormData({ ...formData, fabric: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" /></div>
                                <div><label className="block text-white mb-2 text-sm">Dimensions *</label><input required value={formData.dimensions} onChange={e => setFormData({ ...formData, dimensions: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-gold" /></div>
                            </div>

                            <div><label className="block text-white mb-2 text-sm">Description *</label><textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white resize-none outline-none focus:border-gold" /></div>

                            <div className="flex gap-6 border-t border-white/10 pt-4">
                                <label className="flex items-center space-x-2 text-white"><input type="checkbox" checked={formData.isNew} onChange={e => setFormData({ ...formData, isNew: e.target.checked })} className="accent-gold w-4 h-4" /><span className="text-sm">Mark as New Arrival</span></label>
                                <label className="flex items-center space-x-2 text-white"><input type="checkbox" checked={formData.isFlashSale} onChange={e => setFormData({ ...formData, isFlashSale: e.target.checked })} className="accent-gold w-4 h-4" /><span className="text-sm">Add to Flash Sale</span></label>
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all flex justify-center items-center">
                                {isSubmitting ? <Loader2 className="animate-spin w-6 h-6" /> : (editingId ? "Update Product" : "Save to Database")}
                            </button>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}