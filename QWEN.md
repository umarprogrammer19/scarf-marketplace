# Scarf Marketplace - Project Context

## Project Overview

**Alfaizan Scarf** is a Next.js 16 e-commerce marketplace specializing in scarves. The application features a modern storefront with product catalog, shopping cart, checkout flow, and an admin dashboard for managing products and orders.

### Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 |
| **UI Components** | shadcn/ui (radix-nova style) |
| **Database** | PostgreSQL (Neon Serverless) |
| **ORM** | Drizzle ORM |
| **Auth** | NextAuth v5 (Credentials provider) |
| **State Management** | Zustand (with persistence) |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Image Hosting** | Cloudinary |

### Architecture

```
src/
├── app/              # Next.js App Router pages & API routes
│   ├── about/        # About page
│   ├── admin/        # Admin dashboard & management
│   ├── api/          # API endpoints
│   ├── cart/         # Shopping cart page
│   ├── checkout/     # Checkout flow
│   ├── contact/      # Contact page
│   ├── product/      # Product detail pages
│   ├── shop/         # Product catalog
│   ├── track-order/  # Order tracking
│   └── ...
├── components/
│   ├── admin/        # Admin-specific components
│   ├── home/         # Homepage components (Hero, FAQs, FlashSale, etc.)
│   ├── magicui/      # Animated UI effects
│   ├── storefront/   # Shared storefront components (Navbar, Footer)
│   └── ui/           # shadcn/ui base components
├── context/          # React Context providers
├── data/             # Static/mock data
├── db/
│   ├── index.ts      # Database connection export
│   └── schema.ts     # Drizzle ORM schema definitions
├── lib/
│   └── utils.ts      # Utility functions (cn helper)
├── store/            # Zustand state stores
│   ├── cartStore.ts  # Shopping cart state
│   └── wishlistStore.ts
├── auth.ts           # NextAuth configuration
└── proxy.ts          # Proxy configuration
```

### Database Schema

The application uses PostgreSQL with the following tables:

- **users** - Admin/customer accounts with role-based access
- **categories** - Product categories
- **products** - Product catalog with sale/new flags, SEO metadata
- **orders** - Customer orders (COD only, no account required)
- **order_items** - Order line items

## Building and Running

### Prerequisites

- Node.js 20+
- PostgreSQL database (Neon recommended)
- Environment variables configured in `.env.local`

### Environment Variables

Create a `.env.local` file with:

```env
DATABASE_URL=postgresql://...
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_secure_password
```

### Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Database Commands

```bash
# Generate Drizzle migration files
npm run db:generate

# Push schema to database
npm run db:push
```

### Linting

```bash
npm run lint
```

## Development Conventions

### Code Style

- **TypeScript**: Strict mode enabled
- **Imports**: Path alias `@/*` maps to `./src/*`
- **Components**: Functional components with TypeScript interfaces
- **Naming**: PascalCase for components, camelCase for variables/functions

### Project Patterns

1. **Server Components**: Pages use React Server Components by default; client components opt-in with `"use client"`
2. **State Management**: Zustand stores with `persist` middleware for cart/wishlist
3. **Database Access**: Import `db` from `@/db` for Drizzle queries
4. **Styling**: Tailwind CSS with `cn()` utility for conditional classes
5. **Forms**: React Hook Form with Zod schema validation

### Component Structure

```tsx
// Client components start with "use client"
import { useState } from 'react';

interface Props {
  // typed props
}

export default function Component({ prop }: Props) {
  return <div className="...">...</div>;
}
```

### Key Features

- **Guest Checkout**: Orders can be placed without creating an account
- **COD Only**: Cash on Delivery is the sole payment method
- **Admin Auth**: Credentials-based authentication for admin dashboard
- **Image Optimization**: Configured for Cloudinary and Unsplash domains
- **Revalidation**: 60-second ISR revalidation on homepage

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://zustand-demo.pmnd.rs/)
