export interface Product {
    id: string; 
    name: string;
    price: number;
    originalPrice?: number;
    description: string;
    fabric: string;
    dimensions: string;
    category: string; 
    color: string;
    image: string;
    images: string[];
    stockQuantity: number; 
    inStock: boolean;
    featured: boolean;
    isNew: boolean;
    isFlashSale: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}