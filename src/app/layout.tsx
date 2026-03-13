import type { Metadata } from "next";
import "./globals.css";


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
    <html lang="en">
      <body className={`font-sans antialiased bg-background text-text-main`}>
        {children}
      </body>
    </html>
  );
}