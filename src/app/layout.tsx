import type { Metadata } from "next";
import { Playfair_Display, Inter } from 'next/font/google'
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Elegance Scarves - Premium Women's Scarf Collection",
  description: "Shop the finest collection of silk, velvet, and cotton scarves. Free delivery across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased text-gray-900">
        {children}
      </body>
    </html>
  );
}
