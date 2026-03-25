export interface Product {
    id: string; // Database IDs are numbers, but we convert to string for the UI
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    fabric: string;
    dimensions: string;
    category: string; // The category NAME, not the ID
    color: string;
    image: string;
    images: string[];
    inStock: boolean;
    featured: boolean;
    isNew: boolean;
    isFlashSale: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}