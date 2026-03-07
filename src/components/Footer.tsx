import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-yellow-700 to-yellow-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <img 
              src="/my_image.jpeg" 
              alt="Elegance Scarves Logo" 
              className="h-16 w-auto object-contain mb-4"
            />
            <p className="text-sm text-gray-100 leading-relaxed">
              Elegance Scarves brings you the finest collection of premium scarves and shawls. 
              Quality craftsmanship meets timeless elegance.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">Contact Us</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">Track Order</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">Returns</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">FAQs</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">Refund Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-xl font-bold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-200 mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded text-gray-800 text-sm focus:outline-none"
              />
              <button className="bg-white text-yellow-800 px-4 py-2 rounded hover:bg-gray-100 transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-200">
            © 2024 Elegance Scarves. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-gray-200 transition-colors cursor-pointer">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2 text-xs text-gray-200">
            <span>We Accept:</span>
            <div className="flex gap-2">
              <div className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-semibold">VISA</div>
              <div className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-semibold">MC</div>
              <div className="bg-white text-gray-800 px-2 py-1 rounded text-xs font-semibold">COD</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
