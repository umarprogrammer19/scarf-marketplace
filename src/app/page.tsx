import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'
import { products } from '@/data/products'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <HeroSection />
      <main className="flex-1 bg-[#F5F5F0]">
        <ProductGrid products={products} />
      </main>
      <Footer />
    </div>
  )
}
