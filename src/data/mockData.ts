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
    inStock: boolean;
    featured: boolean;
    isNew?: boolean;
    isFlashSale?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    customerName: string;
    email: string;
    phone: string;
    address: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
    trackingNumber?: string;
}

export interface Review {
    id: string;
    customerName: string;
    rating: number;
    comment: string;
    date: string;
    image: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'admin';
    joinedAt: string;
    totalOrders: number;
}

export const products: Product[] = [
    {
        id: '1',
        name: 'Royal Kashmiri Pashmina',
        price: 299,
        originalPrice: 399,
        description: 'Handwoven in the valleys of Kashmir, this exquisite pashmina scarf embodies centuries of craftsmanship. Made from the finest cashmere wool, it offers unparalleled softness and warmth.',
        fabric: '100% Pure Cashmere',
        dimensions: '200cm x 70cm',
        category: 'Pashmina',
        color: 'Ivory',
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
        images: [
            'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
            'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800',
            'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=800',
        ],
        inStock: true,
        featured: true,
        isNew: true,
        isFlashSale: true,
    },
    {
        id: '2',
        name: 'Silk Elegance Evening Wrap',
        price: 189,
        description: 'Pure silk evening wrap with delicate hand-embroidered patterns. Perfect for formal occasions and elegant evenings.',
        fabric: '100% Pure Mulberry Silk',
        dimensions: '180cm x 65cm',
        category: 'Silk',
        color: 'Champagne Gold',
        image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800',
        images: [
            'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800',
            'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800',
        ],
        inStock: true,
        featured: true,
        isNew: true,
    },
    {
        id: '3',
        name: 'Heritage Wool Shawl',
        price: 149,
        description: 'Traditional Pakistani wool shawl with authentic patterns passed down through generations. Warm and luxurious.',
        fabric: 'Premium Merino Wool',
        dimensions: '220cm x 80cm',
        category: 'Wool',
        color: 'Burgundy',
        image: 'https://images.unsplash.com/photo-1601924638867-94c1d0cd0b43?w=800',
        images: [
            'https://images.unsplash.com/photo-1601924638867-94c1d0cd0b43?w=800',
            'https://images.unsplash.com/photo-1610480493050-a597e69ff52a?w=800',
        ],
        inStock: true,
        featured: false,
    },
    {
        id: '4',
        name: 'Midnight Velvet Stole',
        price: 229,
        originalPrice: 279,
        description: 'Luxurious velvet stole with subtle shimmer. The perfect accessory for winter evenings and special occasions.',
        fabric: 'Silk Velvet',
        dimensions: '190cm x 60cm',
        category: 'Velvet',
        color: 'Black',
        image: 'https://images.unsplash.com/photo-1591561954555-607968d71f85?w=800',
        images: [
            'https://images.unsplash.com/photo-1591561954555-607968d71f85?w=800',
        ],
        inStock: true,
        featured: true,
        isFlashSale: false,
    },
    {
        id: '5',
        name: 'Garden of Paradise Silk',
        price: 269,
        description: 'Hand-painted silk scarf featuring traditional Mughal garden motifs. Each piece is a unique work of art.',
        fabric: 'Hand-painted Silk',
        dimensions: '175cm x 65cm',
        category: 'Silk',
        color: 'Multi-color',
        image: 'https://images.unsplash.com/photo-1590736969955-11245e38d6e0?w=800',
        images: [
            'https://images.unsplash.com/photo-1590736969955-11245e38d6e0?w=800',
        ],
        inStock: true,
        featured: false,
        isNew: false,
    },
    {
        id: '6',
        name: 'Winter Cashmere Blend',
        price: 179,
        description: 'Soft cashmere blend perfect for everyday luxury. Lightweight yet incredibly warm.',
        fabric: '70% Cashmere, 30% Silk',
        dimensions: '200cm x 70cm',
        category: 'Cashmere',
        color: 'Camel',
        image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
        images: [
            'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
        ],
        inStock: true,
        featured: false,
    },
    {
        id: '7',
        name: 'Emerald Silk Hijab',
        price: 129,
        description: 'Premium silk hijab with elegant drape and natural sheen. Comfortable for all-day wear.',
        fabric: 'Pure Silk Chiffon',
        dimensions: '180cm x 75cm',
        category: 'Hijab',
        color: 'Emerald Green',
        image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800',
        images: [
            'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=800',
        ],
        inStock: true,
        featured: false,
        isFlashSale: true,
    },
    {
        id: '8',
        name: 'Pearl Grey Pashmina',
        price: 319,
        description: 'Ultra-fine pashmina in sophisticated pearl grey. The epitome of understated elegance.',
        fabric: '100% Pashmina',
        dimensions: '200cm x 70cm',
        category: 'Pashmina',
        color: 'Pearl Grey',
        image: 'https://images.unsplash.com/photo-1610480493050-a597e69ff52a?w=800',
        images: [
            'https://images.unsplash.com/photo-1610480493050-a597e69ff52a?w=800',
        ],
        inStock: false,
        featured: false,
    },
];

export const reviews: Review[] = [
    {
        id: '1',
        customerName: 'Sarah Johnson',
        rating: 5,
        comment: 'Absolutely stunning quality! The pashmina is incredibly soft and the craftsmanship is impeccable. Worth every penny.',
        date: '2026-03-15',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    {
        id: '2',
        customerName: 'Ayesha Khan',
        rating: 5,
        comment: 'I ordered three scarves and they all exceeded my expectations. The colors are rich and vibrant. Fast shipping to Lahore!',
        date: '2026-03-10',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    },
    {
        id: '3',
        customerName: 'Emma Wilson',
        rating: 5,
        comment: 'Best scarf purchase I have ever made. The silk is genuine and the packaging was luxurious. Highly recommend!',
        date: '2026-03-08',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
    },
    {
        id: '4',
        customerName: 'Fatima Ali',
        rating: 4,
        comment: 'Beautiful scarf, exactly as described. Delivery took a bit longer than expected but the quality makes up for it.',
        date: '2026-03-05',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
    },
];

export const orders: Order[] = [
    {
        id: 'ORD-2024-001',
        customerName: 'Sarah Johnson',
        email: 'sarah@example.com',
        phone: '+92 300 1234567',
        address: '123 Main Street, Lahore, Pakistan',
        items: [
            { ...products[0], quantity: 1 },
            { ...products[1], quantity: 2 },
        ],
        total: 677,
        status: 'delivered',
        createdAt: '2026-03-01T10:00:00Z',
        trackingNumber: 'TRK123456789',
    },
    {
        id: 'ORD-2024-002',
        customerName: 'Ayesha Khan',
        email: 'ayesha@example.com',
        phone: '+92 321 9876543',
        address: '456 Garden Town, Karachi, Pakistan',
        items: [
            { ...products[3], quantity: 1 },
        ],
        total: 229,
        status: 'shipped',
        createdAt: '2026-03-15T14:30:00Z',
        trackingNumber: 'TRK987654321',
    },
    {
        id: 'ORD-2024-003',
        customerName: 'Emma Wilson',
        email: 'emma@example.com',
        phone: '+92 333 5555555',
        address: '789 DHA Phase 5, Islamabad, Pakistan',
        items: [
            { ...products[4], quantity: 1 },
            { ...products[5], quantity: 1 },
        ],
        total: 448,
        status: 'processing',
        createdAt: '2026-03-20T09:15:00Z',
    },
    {
        id: 'ORD-2024-004',
        customerName: 'Fatima Ali',
        email: 'fatima@example.com',
        phone: '+92 345 7777777',
        address: '321 Clifton, Karachi, Pakistan',
        items: [
            { ...products[6], quantity: 3 },
        ],
        total: 387,
        status: 'pending',
        createdAt: '2026-03-22T16:45:00Z',
    },
];

export const users: User[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        email: 'sarah@example.com',
        role: 'customer',
        joinedAt: '2025-12-15',
        totalOrders: 5,
    },
    {
        id: '2',
        name: 'Admin User',
        email: 'admin@luxescarves.com',
        role: 'admin',
        joinedAt: '2025-01-01',
        totalOrders: 0,
    },
    {
        id: '3',
        name: 'Ayesha Khan',
        email: 'ayesha@example.com',
        role: 'customer',
        joinedAt: '2026-01-10',
        totalOrders: 3,
    },
    {
        id: '4',
        name: 'Emma Wilson',
        email: 'emma@example.com',
        role: 'customer',
        joinedAt: '2026-02-20',
        totalOrders: 2,
    },
];

export const faqs = [
    {
        question: 'What materials are your scarves made from?',
        answer: 'Our scarves are crafted from the finest materials sourced directly from Pakistan, including 100% pure cashmere, mulberry silk, premium merino wool, and authentic pashmina. Each material is carefully selected for its quality, durability, and luxurious feel.',
    },
    {
        question: 'How do I care for my luxury scarf?',
        answer: 'We recommend dry cleaning for all our luxury scarves to maintain their quality. If hand washing, use cold water with a gentle detergent specifically designed for delicate fabrics. Never wring or twist the scarf. Lay flat to dry away from direct sunlight.',
    },
    {
        question: 'Do you ship internationally?',
        answer: 'Yes, we ship worldwide from Pakistan. Domestic orders typically arrive within 3-5 business days. International shipping takes 7-14 business days depending on the destination. All orders are fully insured and tracked.',
    },
    {
        question: 'What is your return policy?',
        answer: 'We offer a 30-day return policy on all unworn, unwashed items with original tags attached. Simply contact our customer service team to initiate a return. Refunds are processed within 5-7 business days of receiving the returned item.',
    },
    {
        question: 'Are your products authentic?',
        answer: 'Absolutely. All our products are 100% authentic and handcrafted by master artisans in Pakistan. Each scarf comes with a certificate of authenticity and detailed information about its origin and materials.',
    },
    {
        question: 'Do you offer gift wrapping?',
        answer: 'Yes! We offer complimentary luxury gift wrapping for all orders. Each scarf is beautifully packaged in our signature black and gold boxes, making them perfect for special occasions.',
    },
];
