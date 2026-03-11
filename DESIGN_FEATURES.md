# Design Features Guide

## 🎨 Premium UI Components

### Hero Section Features
```
┌─────────────────────────────────────────────────────────┐
│  NEW COLLECTION 2026 ✨                                 │
│                                                          │
│  Timeless                                                │
│  Elegance                                                │
│                                                          │
│  Discover our exquisite collection...                   │
│                                                          │
│  [Shop New Arrivals →]  [View Collections]              │
│                                                          │
│  500+        10K+         4.9★                          │
│  Products    Customers    Rating                        │
└─────────────────────────────────────────────────────────┘
```

### Product Card Hover State
```
┌──────────────────┐
│                  │
│   [Product]      │  ← Image scales on hover
│                  │
│ ┌──────────────┐ │  ← Overlay appears
│ │[Add to Cart]♡│ │  ← Quick actions
│ └──────────────┘ │
│                  │
│ SILK SCARVES     │
│ Premium Silk...  │
│ PKR 2,500        │
│ • Only 5 left    │  ← Stock indicator
└──────────────────┘
```

### Navigation Structure
```
┌─────────────────────────────────────────────────────────┐
│ ☰  [LOGO]  SILK | VELVET | WOOL | COTTON  🔍 👤 ♡(3) 🛒(2)│
│            SHAWLS | WRAPS | STOLES | PASHMINA            │
└─────────────────────────────────────────────────────────┘
```

### Grid Layout Options
```
2 Columns:  [▦▦]     Selected: Dark background
3 Columns:  [▦▦▦]    Hover: Light gray
4 Columns:  [▦▦▦▦]   Default: White
5 Columns:  [▦▦▦▦▦]  Active: Gold accent
```

## 🎯 Interactive Elements

### Buttons
- **Primary**: Gold background (#D4AF37) with white text
- **Secondary**: White border with transparent background
- **Hover**: Slight scale + shadow increase
- **Active**: Darker shade with pressed effect

### Cards
- **Default**: White with subtle border
- **Hover**: Shadow elevation + border color change
- **Image**: Zoom effect (scale 1.1)
- **Overlay**: Fade in with quick actions

### Icons
- **Cart Badge**: Gold circle with white number
- **Wishlist**: Heart outline → filled on click
- **Social**: Circle background with icon
- **Hover**: Scale 1.1 + color change to gold

## 🌈 Color Usage

### Primary Colors
- **Dark Brown (#2C1810)**: Headers, text, primary buttons
- **Gold (#D4AF37)**: Accents, badges, hover states
- **White (#FFFFFF)**: Backgrounds, cards
- **Light Gray (#FAFAFA)**: Page background

### Gradients
- **Hero**: `from-[#2C1810] via-[#3D2318] to-[#2C1810]`
- **Footer**: `from-[#2C1810] via-[#3D2318] to-[#2C1810]`
- **Controls**: `from-[#FAFAFA] to-white`

## ⚡ Animations

### Transitions
- **Duration**: 300ms (standard), 700ms (images)
- **Easing**: ease-out for most, ease-in-out for scales
- **Properties**: transform, opacity, colors

### Hover Effects
```css
Product Card:
  - Image: scale(1.1) + 700ms
  - Overlay: opacity 0 → 1 + 300ms
  - Buttons: translateY(16px) → 0 + 300ms

Navigation:
  - Links: underline width 0 → 100% + 300ms
  - Icons: scale(1.1) + 200ms

Footer Links:
  - translateX(0) → translateX(4px) + 200ms
```

## 📱 Responsive Design

### Mobile (< 768px)
- Single column product grid
- Hamburger menu
- Stacked hero content
- Simplified footer layout

### Tablet (768px - 1024px)
- 2-3 column product grid
- Condensed navigation
- Side-by-side hero elements

### Desktop (> 1024px)
- 4-5 column product grid
- Full navigation with categories
- Hero with image showcase
- Four-column footer

## 🎭 Special Effects

### Decorative Elements
- Blurred circles in hero background
- Gradient overlays on images
- Floating quality badge
- Animated stock indicators

### Micro-interactions
- Badge pulse animation
- Button ripple effect
- Smooth scroll to sections
- Loading states

## 🔧 Customization Tips

### Change Brand Colors
Edit `src/app/globals.css`:
```css
:root {
  --color-primary: #YourColor;
  --color-gold: #YourAccent;
}
```

### Adjust Grid Spacing
Edit `src/components/ProductGrid.tsx`:
```tsx
<div className={`grid ${gridClass} gap-8`}>  // Change gap-8
```

### Modify Hero Stats
Edit `src/components/HeroSection.tsx`:
```tsx
<div className="text-3xl font-bold text-[#D4AF37]">500+</div>
```

### Update Animation Speed
Edit `src/app/globals.css`:
```css
@keyframes fadeIn {
  /* Adjust timing here */
}
```

## 🎪 Component Hierarchy

```
App
├── AnnouncementBar (Top banner)
├── Navbar (Sticky navigation)
├── HeroSection
│   ├── Main Banner
│   └── Features Bar
├── ProductGrid
│   ├── Section Header
│   ├── CategoryControls
│   └── ProductCard (Multiple)
└── Footer
    ├── About & Contact
    ├── Quick Links
    ├── Customer Service
    └── Newsletter
```

## 💡 Best Practices Applied

✅ Mobile-first responsive design
✅ Accessibility-compliant focus states
✅ Performance-optimized animations
✅ Semantic HTML structure
✅ Consistent spacing system
✅ Reusable component patterns
✅ Type-safe TypeScript
✅ Next.js Image optimization
✅ SEO-friendly markup
✅ Cross-browser compatibility
