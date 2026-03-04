import { Product } from '@/types/product'

export const products: Product[] = [
  {
    id: '1',
    title: 'Elegant Silk Scarf - Maroon',
    price: 2499,
    originalPrice: 4999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=800&fit=crop&q=80',
    category: 'Silk Collection',
    stock: 15,
    isNew: true
  },
  {
    id: '2',
    title: 'Velvet Winter Shawl',
    price: 3499,
    originalPrice: 6999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80',
    category: 'Winter Collection',
    stock: 8
  },
  {
    id: '3',
    title: 'Printed Lawn Dupatta',
    price: 1999,
    originalPrice: 3999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=800&h=800&fit=crop&q=80',
    category: 'Printed Lawn Collection',
    stock: 0
  },
  {
    id: '4',
    title: 'Karandi Embroidered Scarf',
    price: 2799,
    originalPrice: 5599,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=800&fit=crop&q=80',
    category: 'Karandi Collection',
    stock: 12,
    isNew: true
  },
  {
    id: '5',
    title: 'Summer Cotton Scarf',
    price: 1499,
    originalPrice: 2999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&h=800&fit=crop&q=80',
    category: 'Summer Collection',
    stock: 20
  },
  {
    id: '6',
    title: 'Khaddar Warm Shawl',
    price: 3299,
    originalPrice: 6599,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&h=800&fit=crop&q=80',
    category: 'Khaddar Collection',
    stock: 5
  },
  {
    id: '7',
    title: 'Silk Floral Print Scarf',
    price: 2899,
    originalPrice: 5799,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=800&fit=crop&q=80',
    category: 'Silk Collection',
    stock: 10
  },
  {
    id: '8',
    title: 'Velvet Luxury Stole',
    price: 3999,
    originalPrice: 7999,
    discount: 50,
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&h=800&fit=crop&q=80',
    category: 'Velvet Collection',
    stock: 7,
    isNew: true
  }
]

export const categories = [
  'New Arrivals',
  'Winter Collection',
  'Silk Collection',
  'Velvet Collection',
  'Karandi Collection',
  'Khaddar Collection',
  'Summer Collection',
  'Printed Lawn Collection'
]
