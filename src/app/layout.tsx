import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from 'next/font/google'
import "./globals.css";
import LenisSmoothScroll from "@/components/LenisSmoothScroll";

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "LUXE SCARVES | The Hijab Company - Premium Scarf & Hijab Collection",
  description: "Discover our curated collection of luxury scarves and hijabs. Premium silk, chiffon, velvet, and more. Free shipping across Pakistan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${playfair.variable}`}>
      <body className="font-montserrat antialiased text-[#1A1A1A] bg-[#F9F7F2]">
        <LenisSmoothScroll>
          {children}
        </LenisSmoothScroll>
      </body>
    </html>
  );
}
