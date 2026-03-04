# Elegance Scarves - E-Commerce Website

## Project Structure

```
scarf-marketplace/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles
│   ├── components/
│   │   ├── AnnouncementBar.tsx  # Top maroon announcement bar
│   │   ├── Navbar.tsx           # Sticky navigation with categories
│   │   ├── ProductCard.tsx      # Individual product card
│   │   ├── ProductGrid.tsx      # Product grid with sorting
│   │   ├── CategoryControls.tsx # Grid view & sort controls
│   │   └── Footer.tsx           # Footer with 4 columns
│   ├── data/
│   │   └── products.ts          # Product data & categories
│   ├── types/
│   │   └── product.ts           # TypeScript interfaces
│   └── lib/
│       └── utils.ts             # Utility functions (cn)
├── public/                      # Static assets
├── package.json
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

## Features Implemented

### ✅ Top Announcement Bar
- Maroon background (#800020)
- Phone number with icon on left
- Free delivery message in center
- Fully responsive

### ✅ Navbar
- Brand logo (text-based): "Elegance Scarves"
- Multi-row category navigation (8 categories)
- Right-side icons: Search, User, Wishlist (badge), Cart (badge)
- Sticky on scroll with smooth transition
- Mobile-responsive with condensed categories

### ✅ Category Controls
- Grid view toggle: 2, 3, 4, 5 columns
- Sort dropdown: Featured, Price Low to High, High to Low
- Responsive layout

### ✅ Product Grid
- Responsive grid (2 cols mobile, 3 tablet, 4 desktop)
- Dynamic column adjustment based on user selection

### ✅ Product Cards
- Product image with hover zoom effect
- Discount badge (-50%)
- "NEW" badge for new arrivals
- Sold out overlay for out-of-stock items
- Product title, price, original price
- Add to Cart button (disabled when sold out)
- Clean white background with hover shadow

### ✅ Footer
- 4 column layout: About, Customer Service, Policies, Newsletter
- Social media icons (Facebook, Instagram, Twitter)
- Payment method badges (VISA, MC, COD)
- Newsletter subscription form
- Dark maroon theme (#800020)

### ✅ Design Theme
- Primary Color: Deep Maroon (#800020)
- Secondary: Soft Beige (#F5F5F0)
- Font: Playfair Display for headings, Inter for body
- Modern minimal luxury aesthetic

## How to Run

1. Install dependencies (already done):
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Open browser to: http://localhost:3000

## Technologies Used

- **Next.js 14** - App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling (no config file needed)
- **Lucide Icons** - Icon library
- **Google Fonts** - Playfair Display & Inter

## Product Data

Sample products are in `src/data/products.ts` with:
- 8 products across different collections
- Discount pricing
- Stock management
- Category assignment
- High-quality Unsplash images

## Customization

### Add More Products
Edit `src/data/products.ts` and add new product objects.

### Change Colors
Update the maroon color (#800020) throughout components or add to Tailwind config.

### Modify Categories
Edit the `categories` array in `src/data/products.ts`.

### Update Images
Replace image URLs in product data with your own images.

## Notes

- All components are modular and reusable
- No CSS files used - pure Tailwind utility classes
- Fully responsive design
- TypeScript for type safety
- Client components used where interactivity is needed
