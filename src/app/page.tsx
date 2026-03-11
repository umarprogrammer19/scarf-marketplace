import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import ProductGrid from '@/components/ProductGrid'
import Footer from '@/components/Footer'
import { products } from '@/data/products'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <ProductGrid products={products} />
      </main>
      <Footer />
    </div>
  )
}
