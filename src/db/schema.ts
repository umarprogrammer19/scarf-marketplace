import {
    pgTable, serial, varchar, text, timestamp,
    integer, boolean, numeric, pgEnum, jsonb
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Enums
export const roleEnum = pgEnum("role", ["ADMIN", "CUSTOMER"]);
export const orderStatusEnum = pgEnum("order_status", ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"]);

// 2. Users Table
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(),
    role: roleEnum("role").default("CUSTOMER").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Categories Table
export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
});

// 4. Products Table (Includes new UI fields)
export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").references(() => categories.id).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),

    // Pricing & Stock
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
    stockQuantity: integer("stock_quantity").notNull().default(0),
    inStock: boolean("in_stock").default(true).notNull(),

    // Details from UI
    fabric: varchar("fabric", { length: 255 }),
    dimensions: varchar("dimensions", { length: 255 }),
    color: varchar("color", { length: 100 }),

    // Images
    image: text("image").notNull(), // Main thumbnail
    images: jsonb("images").$type<string[]>().default([]), // Array of gallery images

    // Flags
    featured: boolean("featured").default(false).notNull(),
    isNew: boolean("is_new").default(false).notNull(),
    isFlashSale: boolean("is_flash_sale").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 5. Orders Table
export const orders = pgTable("orders", {
    id: varchar("id", { length: 50 }).primaryKey(), // Changed to string for 'ORD-2024-001' style
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 50 }).notNull(),
    address: text("address").notNull(),
    city: varchar("city", { length: 100 }).notNull(),

    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    status: orderStatusEnum("status").default("PENDING").notNull(),
    paymentMethod: varchar("payment_method", { length: 50 }).default("COD").notNull(),
    trackingNumber: varchar("tracking_number", { length: 100 }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 6. Order Items Table
export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: varchar("order_id").references(() => orders.id).notNull(),
    productId: integer("product_id").references(() => products.id).notNull(),
    quantity: integer("quantity").notNull(),
    priceAtTimeOfOrder: numeric("price_at_time_of_order", { precision: 10, scale: 2 }).notNull(),
});

// ==========================================
// 7. RELATIONS (The Magic Bridge)
// ==========================================

export const categoriesRelations = relations(categories, ({ many }) => ({
    products: many(products),
}));

export const productsRelations = relations(products, ({ one }) => ({
    category: one(categories, {
        fields: [products.categoryId],
        references: [categories.id],
    }),
}));

export const ordersRelations = relations(orders, ({ many }) => ({
    items: many(orderItems),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
    order: one(orders, {
        fields: [orderItems.orderId],
        references: [orders.id],
    }),
    product: one(products, {
        fields: [orderItems.productId],
        references: [products.id],
    }),
}));