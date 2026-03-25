import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Al Faizan Scarf | Premium Made in Pakistan",
  description: "Discover our premium collection of luxury scarves, hijabs, and shawls. Cash on Delivery available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className={`font-sans antialiased bg-background text-text-main`}>
        <CartProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#0a0a0a',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                color: '#ffffff',
              },
              className: 'luxury-toast',
            }}
          />
        </CartProvider>
      </body>
    </html>
  );
}