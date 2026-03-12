import {
    pgTable,
    serial,
    varchar,
    text,
    timestamp,
    integer,
    boolean,
    numeric,
    pgEnum
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// 1. Enums for fixed values
export const roleEnum = pgEnum("role", ["ADMIN", "CUSTOMER"]);
export const orderStatusEnum = pgEnum("order_status", ["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"]);

// 2. Users Table (Primarily for Admin Access right now)
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: text("password").notNull(), // Hashed password
    role: roleEnum("role").default("CUSTOMER").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

// 3. Categories Table
export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
});

// 4. Products Table
export const products = pgTable("products", {
    id: serial("id").primaryKey(),
    categoryId: integer("category_id").references(() => categories.id).notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).notNull().unique(),
    description: text("description").notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    stockQuantity: integer("stock_quantity").notNull().default(0),
    imageUrl: text("image_url").notNull(), // URL from Cloudinary/UploadThing

    // Marketplace Features
    isNew: boolean("is_new").default(false).notNull(),
    isOnSale: boolean("is_on_sale").default(false).notNull(),
    salePrice: numeric("sale_price", { precision: 10, scale: 2 }),

    // SEO Metafields
    metaTitle: varchar("meta_title", { length: 255 }),
    metaDescription: text("meta_description"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 5. Orders Table (Strictly COD)
export const orders = pgTable("orders", {
    id: serial("id").primaryKey(),
    orderNumber: varchar("order_number", { length: 50 }).notNull().unique(), // e.g., AF-10024

    // Customer Details (No account required for checkout)
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    customerPhone: varchar("customer_phone", { length: 50 }).notNull(),
    shippingAddress: text("shipping_address").notNull(),
    city: varchar("city", { length: 100 }).notNull(),

    totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
    status: orderStatusEnum("status").default("PENDING").notNull(),
    paymentMethod: varchar("payment_method", { length: 50 }).default("COD").notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// 6. Order Items Table (What exactly did they buy?)
export const orderItems = pgTable("order_items", {
    id: serial("id").primaryKey(),
    orderId: integer("order_id").references(() => orders.id).notNull(),
    productId: integer("product_id").references(() => products.id).notNull(),
    quantity: integer("quantity").notNull(),
    priceAtTimeOfOrder: numeric("price_at_time_of_order", { precision: 10, scale: 2 }).notNull(),
});

// 7. Relations (Tells Drizzle how tables connect for easy querying)
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