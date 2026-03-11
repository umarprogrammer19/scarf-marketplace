import TopBar from '@/components/TopBar'
import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import ProductGrid from '@/components/ProductGrid'
import CustomerService from '@/components/CustomerService'
import Footer from '@/components/Footer'
import { products } from '@/data/products'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <ProductGrid products={products} />
        <CustomerService />
      </main>
      <Footer />
    </div>
  )
}
