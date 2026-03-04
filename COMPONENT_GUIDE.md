# Component Guide

## Component Hierarchy

```
Home Page (page.tsx)
│
├── AnnouncementBar
│   ├── Phone Icon + Number
│   └── Free Delivery Message
│
├── Navbar (Sticky)
│   ├── Brand Logo
│   ├── Categories (8 items)
│   └── Icons (Search, User, Wishlist, Cart)
│
├── HeroSection
│   ├── Headline
│   ├── Description
│   └── CTA Buttons (2)
│
├── ProductGrid
│   ├── CategoryControls
│   │   ├── Grid Toggle Buttons (2-5 cols)
│   │   └── Sort Dropdown
│   │
│   └── Product Cards (Grid)
│       └── ProductCard (x8)
│           ├── Image (with hover zoom)
│           ├── Badges (NEW, Discount)
│           ├── Sold Out Overlay
│           ├── Title
│           ├── Prices
│           └── Add to Cart Button
│
└── Footer
    ├── About Column
    ├── Customer Service Column
    ├── Policies Column
    ├── Newsletter Column
    ├── Social Icons
    └── Payment Badges
```

## Component Details

### 1. AnnouncementBar
**File**: `src/components/AnnouncementBar.tsx`
**Type**: Server Component
**Props**: None

**Features**:
- Maroon background (#800020)
- Phone icon with number
- Centered free delivery message
- Responsive flex layout

**Styling**:
```tsx
bg-[#800020] text-white py-2 px-4
```

---

### 2. Navbar
**File**: `src/components/Navbar.tsx`
**Type**: Client Component ('use client')
**Props**: None

**Features**:
- Sticky on scroll (useEffect + scroll listener)
- Brand logo (text-based)
- 8 category buttons
- 4 icon buttons with badges
- Mobile responsive (condensed categories)

**State**:
```tsx
const [isSticky, setIsSticky] = useState(false)
```

**Styling**:
- Sticky: `fixed top-0 left-0 right-0 z-50 shadow-md`
- Logo: `font-playfair text-2xl md:text-3xl font-bold text-[#800020]`

---

### 3. HeroSection
**File**: `src/components/HeroSection.tsx`
**Type**: Server Component
**Props**: None

**Features**:
- Gradient maroon background
- Centered content
- Two CTA buttons
- Decorative circles

**Styling**:
```tsx
bg-gradient-to-r from-[#800020] to-[#600018]
```

---

### 4. CategoryControls
**File**: `src/components/CategoryControls.tsx`
**Type**: Client Component
**Props**:
```typescript
{
  gridColumns: GridColumns (2 | 3 | 4 | 5)
  setGridColumns: (cols: GridColumns) => void
  sortBy: SortOption ('featured' | 'price-low' | 'price-high')
  setSortBy: (sort: SortOption) => void
}
```

**Features**:
- 4 grid toggle buttons with icons
- Sort dropdown (select element)
- Active state styling

**Icons Used**:
- Grid2X2 (2 columns)
- Grid3X3 (3 columns)
- LayoutGrid (4 columns)
- Rows3 (5 columns)

---

### 5. ProductGrid
**File**: `src/components/ProductGrid.tsx`
**Type**: Client Component
**Props**:
```typescript
{
  products: Product[]
}
```

**Features**:
- Manages grid columns state
- Manages sort state
- Sorts products based on selection
- Dynamic grid class based on columns

**State**:
```tsx
const [gridColumns, setGridColumns] = useState<GridColumns>(4)
const [sortBy, setSortBy] = useState<SortOption>('featured')
```

**Sorting Logic**:
```typescript
switch (sortBy) {
  case 'price-low': sorted.sort((a, b) => a.price - b.price)
  case 'price-high': sorted.sort((a, b) => b.price - a.price)
  default: return sorted
}
```

---

### 6. ProductCard
**File**: `src/components/ProductCard.tsx`
**Type**: Client Component
**Props**:
```typescript
{
  product: Product
}
```

**Features**:
- Next.js Image with fill layout
- Hover zoom effect (scale-110)
- Conditional badges (NEW, Discount)
- Sold out overlay
- Price display with strikethrough
- Disabled button for sold out items

**Image Optimization**:
```tsx
<Image
  src={product.image}
  alt={product.title}
  fill
  className="object-cover group-hover:scale-110 transition-transform duration-500"
/>
```

**Conditional Rendering**:
```tsx
{product.isNew && <span>NEW</span>}
{product.discount && <span>-{product.discount}%</span>}
{product.stock === 0 && <div>SOLD OUT</div>}
```

---

### 7. Footer
**File**: `src/components/Footer.tsx`
**Type**: Server Component
**Props**: None

**Features**:
- 4-column grid (responsive)
- Newsletter form
- Social media links
- Payment badges
- Copyright notice

**Grid Layout**:
```tsx
grid-cols-1 md:grid-cols-2 lg:grid-cols-4
```

**Icons Used**:
- Facebook
- Instagram
- Twitter
- Mail

---

## Data Structures

### Product Interface
**File**: `src/types/product.ts`

```typescript
interface Product {
  id: string
  title: string
  price: number
  originalPrice?: number
  discount?: number
  image: string
  category: string
  stock: number
  isNew?: boolean
}
```

### Type Aliases
```typescript
type SortOption = 'featured' | 'price-low' | 'price-high'
type GridColumns = 2 | 3 | 4 | 5
```

---

## Utility Functions

### cn() - Class Name Merger
**File**: `src/lib/utils.ts`

```typescript
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

**Usage**: Merge Tailwind classes with conditional logic
```tsx
className={cn("base-class", condition && "conditional-class")}
```

---

## State Management

### Local Component State
All state is managed locally using React useState:

1. **Navbar**: `isSticky` (boolean)
2. **ProductGrid**: `gridColumns` (2-5), `sortBy` (string)

### Props Drilling
- ProductGrid → CategoryControls (grid & sort state)
- ProductGrid → ProductCard (product data)

---

## Styling Approach

### Tailwind Utility Classes
- No custom CSS files (except globals.css for base styles)
- Inline utility classes for all styling
- Responsive modifiers: `sm:`, `md:`, `lg:`
- Hover states: `hover:`
- Group hover: `group-hover:`

### Custom Colors
```css
Maroon: #800020
Dark Maroon: #600018
Beige: #F5F5F0
```

### Font Variables
```css
--font-playfair: 'Playfair Display'
--font-inter: 'Inter'
```

---

## Performance Optimizations

1. **Next.js Image**: Automatic optimization, lazy loading
2. **Server Components**: Default for static content
3. **Client Components**: Only where interactivity needed
4. **useMemo**: Sorting logic memoized in ProductGrid
5. **Font Optimization**: Google Fonts via next/font

---

## Accessibility

- Semantic HTML elements
- Alt text on all images
- Keyboard navigation support
- Focus states on interactive elements
- ARIA labels where needed
- Disabled state for unavailable actions

---

## Responsive Breakpoints

```css
Mobile: < 768px
  - 2 column grid
  - Stacked layout
  - Condensed navbar

Tablet: 768px - 1024px
  - 3 column grid
  - 2 column footer

Desktop: > 1024px
  - 4 column grid (default)
  - 4 column footer
  - Full navbar
```

---

## Icon Library

**Lucide React** icons used:
- Phone
- Search
- User
- Heart
- ShoppingCart
- Grid2X2
- Grid3X3
- LayoutGrid
- Rows3
- Facebook
- Instagram
- Twitter
- Mail

---

## Future Component Ideas

1. **ProductDetail** - Individual product page
2. **CartDrawer** - Slide-out cart panel
3. **SearchModal** - Full-screen search overlay
4. **FilterSidebar** - Category and price filters
5. **AuthModal** - Login/signup modal
6. **ReviewSection** - Product reviews and ratings
7. **RelatedProducts** - Product recommendations
8. **Breadcrumbs** - Navigation trail
9. **LoadingSpinner** - Loading states
10. **Toast** - Notification messages
