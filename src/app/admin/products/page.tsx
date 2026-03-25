"use client";
import { useState } from "react";
import { products as initialProducts } from "../../../data/mockData";
import { Search, Plus, Edit, Trash2, Upload } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { toast } from "sonner";

export default function AdminProducts() {
    const [products, setProducts] = useState(initialProducts);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        category: "Pashmina",
        fabric: "",
        color: "",
        description: "",
    });

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: any = {
            id: String(products.length + 1),
            ...formData,
            price: parseFloat(formData.price),
            dimensions: "200cm x 70cm",
            image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800",
            images: ["https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800"],
            inStock: true,
            featured: false,
        };
        setProducts([...products, newProduct]);
        setShowAddModal(false);
        setFormData({
            name: "",
            price: "",
            category: "Pashmina",
            fabric: "",
            color: "",
            description: "",
        });
        toast.success("Product Added", {
            description: "New product has been added successfully",
        });
    };

    const deleteProduct = (id: string) => {
        setProducts(products.filter((p) => p.id !== id));
        toast.success("Product Deleted", {
            description: "Product has been removed from inventory",
        });
    };

    return (
        <div className="p-4 lg:p-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <div>
                    <h1 className="text-3xl md:text-4xl text-white mb-2">Products Management</h1>
                    <p className="text-white/60">Manage your product inventory</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="mt-4 md:mt-0 px-6 py-3 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300 flex items-center space-x-2"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New Product</span>
                </button>
            </div>

            {/* Search */}
            <div className="bg-card border border-white/10 rounded-xl p-6 mb-8">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                    />
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-card border border-white/10 rounded-xl overflow-hidden hover:border-gold/30 transition-all duration-300"
                    >
                        <div className="relative aspect-square">
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                            {!product.inStock && (
                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                    <span className="px-4 py-2 bg-destructive text-white font-semibold rounded-lg">
                                        Out of Stock
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="p-4">
                            <p className="text-xs text-gold uppercase tracking-wider mb-1">
                                {product.category}
                            </p>
                            <h3 className="text-white font-semibold mb-2 line-clamp-1">
                                {product.name}
                            </h3>
                            <p className="text-2xl font-bold text-gold mb-4">${product.price}</p>

                            <div className="flex gap-2">
                                <button className="flex-1 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-gold transition-all duration-300 flex items-center justify-center space-x-2">
                                    <Edit className="w-4 h-4" />
                                    <span className="text-sm">Edit</span>
                                </button>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="px-4 py-2 bg-destructive/10 border border-destructive/30 text-destructive rounded-lg hover:bg-destructive hover:text-white transition-all duration-300"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Product Modal */}
            <Dialog.Root open={showAddModal} onOpenChange={setShowAddModal}>
                <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto z-50">
                        <Dialog.Close className="absolute top-4 right-4 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-gold hover:text-black transition-all">
                            <X className="w-5 h-5" />
                        </Dialog.Close>

                        <h2 className="text-2xl font-semibold text-white mb-6">
                            Add New Product
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-white mb-2">Product Image</label>
                                <div className="border-2 border-dashed border-white/10 rounded-lg p-8 text-center hover:border-gold/30 transition-colors cursor-pointer">
                                    <Upload className="w-12 h-12 text-white/40 mx-auto mb-4" />
                                    <p className="text-white/60 mb-2">Click to upload or drag and drop</p>
                                    <p className="text-white/40 text-sm">PNG, JPG up to 10MB</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-white mb-2">Product Name *</label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                                        placeholder="Luxury Scarf Name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white mb-2">Price *</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                                        placeholder="299.99"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white mb-2">Category *</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-gold transition-colors duration-300"
                                    >
                                        <option value="Pashmina">Pashmina</option>
                                        <option value="Silk">Silk</option>
                                        <option value="Wool">Wool</option>
                                        <option value="Cashmere">Cashmere</option>
                                        <option value="Velvet">Velvet</option>
                                        <option value="Hijab">Hijab</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-white mb-2">Fabric *</label>
                                    <input
                                        type="text"
                                        value={formData.fabric}
                                        onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                                        placeholder="100% Pure Silk"
                                    />
                                </div>

                                <div>
                                    <label className="block text-white mb-2">Color *</label>
                                    <input
                                        type="text"
                                        value={formData.color}
                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
                                        placeholder="Gold"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-white mb-2">Description *</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-gold transition-colors duration-300 resize-none"
                                    placeholder="Product description..."
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full py-4 bg-gold text-black font-semibold rounded-lg hover:bg-gold-light transition-all duration-300"
                            >
                                Add Product
                            </button>
                        </form>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}
