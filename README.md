# 🧣 Elegance Scarves - Premium E-Commerce Website

A modern, fully responsive e-commerce website for a women's scarf brand built with Next.js 14, TypeScript, and Tailwind CSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Features

### 🎨 Design
- **Premium Aesthetic**: Deep maroon (#800020) and soft beige color scheme
- **Elegant Typography**: Playfair Display for headings, Inter for body text
- **Fully Responsive**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, minimal design with smooth animations

### 🛍️ E-Commerce Features
- **Product Grid**: Dynamic 2-5 column layout with user controls
- **Product Cards**: Hover zoom effects, discount badges, stock status
- **Sorting**: Featured, Price Low to High, Price High to Low
- **Shopping Cart**: Badge counter with cart icon
- **Wishlist**: Badge counter with heart icon
- **Sold Out Overlay**: Clear indication for out-of-stock items

### 📱 Components
- **Announcement Bar**: Maroon top bar with phone number and free delivery message
- **Sticky Navbar**: 8 product categories with smooth scroll behavior
- **Hero Section**: Premium gradient banner with CTAs
- **Product Grid**: Responsive grid with sorting and filtering
- **Footer**: 4-column layout with newsletter, social links, and payment badges

## 🚀 Quick Start

```bash
# Navigate to project
cd scarf-marketplace

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Playfair Display, Inter)
- **Image Optimization**: Next.js Image component

## 📁 Project Structure

```
scarf-marketplace/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with fonts
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── AnnouncementBar.tsx # Top announcement bar
│   │   ├── Navbar.tsx          # Navigation with categories
│   │   ├── HeroSection.tsx     # Hero banner
│   │   ├── CategoryControls.tsx# Grid & sort controls
│   │   ├── ProductGrid.tsx     # Product grid container
│   │   ├── ProductCard.tsx     # Individual product card
│   │   └── Footer.tsx          # Footer section
│   ├── data/
│   │   └── products.ts         # Product data & categories
│   ├── types/
│   │   └── product.ts          # TypeScript interfaces
│   └── lib/
│       └── utils.ts            # Utility functions
├── public/                     # Static assets
├── next.config.ts              # Next.js configuration
├── postcss.config.mjs          # PostCSS configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies
```

## 🎯 Key Features Implemented

### ✅ Top Announcement Bar
- Maroon background with white text
- Phone number with icon (left)
- Free delivery message (center)
- Fully responsive layout

### ✅ Navigation Bar
- Brand logo: "Elegance Scarves"
- 8 product categories in multi-row layout
- Search, User, Wishlist (badge: 3), Cart (badge: 2) icons
- Sticky on scroll with shadow effect
- Mobile-responsive with condensed view

### ✅ Hero Section
- Gradient maroon background
- Compelling headline and description
- Two CTA buttons
- Decorative elements

### ✅ Category Controls
- Grid view toggles: 2, 3, 4, 5 columns
- Sort dropdown: Featured, Price Low-High, High-Low
- Responsive button layout

### ✅ Product Grid
- Responsive columns (2 mobile → 4 desktop)
- Dynamic sorting functionality
- Clean spacing and alignment

### ✅ Product Cards
- High-quality product images
- Hover zoom effect (scale 110%)
- Discount badge (-50%)
- "NEW" badge for new arrivals
- Sold out overlay for zero stock
- Product title (2-line clamp)
- Price with strikethrough original price
- Add to Cart button (disabled when sold out)
- Smooth hover shadow effect

### ✅ Footer
- 4-column responsive layout
  - About Us
  - Customer Service
  - Policies
  - Newsletter subscription
- Social media icons (Facebook, Instagram, Twitter)
- Payment method badges (VISA, MC, COD)
- Copyright notice
- Dark maroon theme

## 🎨 Design System

### Colors
```css
Primary: #800020 (Deep Maroon)
Secondary: #F5F5F0 (Soft Beige)
Accent: #600018 (Dark Maroon)
Background: #FFFFFF (White)
Text: #111827 (Gray 900)
```

### Typography
```
Headings: Playfair Display (serif)
Body: Inter (sans-serif)
```

### Breakpoints
```
Mobile: < 768px (2 columns)
Tablet: 768px - 1024px (3 columns)
Desktop: > 1024px (4 columns)
```

## 🛠️ Customization

### Update Brand Name
Edit `src/components/Navbar.tsx`:
```tsx
<h1>Your Brand Name</h1>
```

### Add Products
Edit `src/data/products.ts`:
```typescript
{
  id: '9',
  title: 'New Product',
  price: 2999,
  originalPrice: 5999,
  discount: 50,
  image: 'https://your-image.com/image.jpg',
  category: 'Collection Name',
  stock: 10,
  isNew: true
}
```

### Change Colors
Replace `#800020` throughout components with your brand color.

### Modify Categories
Edit `categories` array in `src/data/products.ts`.

## 📱 Responsive Design

- **Mobile First**: Optimized for small screens
- **Flexible Grid**: Adapts from 2 to 5 columns
- **Touch Friendly**: Large tap targets for mobile
- **Performance**: Optimized images with Next.js Image

## 🚀 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## 📝 Sample Data

Includes 8 sample products across collections:
- Silk Collection
- Velvet Collection
- Winter Collection
- Summer Collection
- Karandi Collection
- Khaddar Collection
- Printed Lawn Collection

## 🔜 Future Enhancements

- [ ] Product detail pages
- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Payment integration
- [ ] Product search
- [ ] Category filtering
- [ ] Product reviews
- [ ] Wishlist functionality
- [ ] Order tracking
- [ ] Admin dashboard

## 📄 License

This project is created for educational and commercial use.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your own e-commerce needs.

---

**Built with ❤️ using Next.js 14, TypeScript, and Tailwind CSS**

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)

