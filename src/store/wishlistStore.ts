import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
    id: number;
    name: string;
    price: string;
    imageUrl: string;
    slug: string;
}

interface WishlistState {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: number) => void;
    isWishlisted: (id: number) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                const exists = get().items.find((i) => i.id === item.id);
                if (!exists) {
                    set({ items: [...get().items, item] });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },

            isWishlisted: (id) => {
                return get().items.some((i) => i.id === id);
            },

            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'alfaizan-wishlist',
        }
    )
);
