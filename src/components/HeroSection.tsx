export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-yellow-700 to-yellow-800 text-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6">
            Discover Timeless Elegance
          </h1>
          <p className="text-lg md:text-xl text-gray-100 mb-8">
            Explore our exquisite collection of premium scarves crafted with the finest fabrics. 
            From silk to velvet, find the perfect piece to elevate your style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-yellow-800 px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors cursor-pointer">
              Shop New Arrivals
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors cursor-pointer">
              View Collections
            </button>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full translate-x-24 translate-y-24"></div>
    </section>
  )
}
