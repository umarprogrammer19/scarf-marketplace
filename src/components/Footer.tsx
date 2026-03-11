import { Facebook, Instagram, Twitter, Mail } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-[#2C1810] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <Image 
              src="/my_image.jpeg" 
              alt="Brand Logo" 
              width={140}
              height={70}
              className="h-14 w-auto object-contain mb-6 brightness-0 invert cursor-pointer"
            />
            <p className="text-sm text-gray-300 leading-relaxed">
              Bringing you the finest collection of premium scarves and shawls. 
              Quality craftsmanship meets timeless elegance.
            </p>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[#D4AF37]">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Track Order</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Returns & Exchange</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">FAQs</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[#D4AF37]">Policies</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Terms & Conditions</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">Refund Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[#D4AF37]">Stay Connected</h3>
            <p className="text-sm text-gray-300 mb-4">
              Subscribe for exclusive offers and updates
            </p>
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 rounded bg-white/10 border border-white/20 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#D4AF37]"
              />
              <button className="bg-[#D4AF37] text-white px-4 py-2.5 rounded hover:bg-[#C4A137] transition-colors cursor-pointer">
                <Mail className="w-4 h-4" />
              </button>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2024 All rights reserved.
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-3 text-xs text-gray-400">
            <span>We Accept:</span>
            <div className="flex gap-2">
              <div className="bg-white text-[#2C1810] px-3 py-1.5 rounded text-xs font-semibold">VISA</div>
              <div className="bg-white text-[#2C1810] px-3 py-1.5 rounded text-xs font-semibold">MASTERCARD</div>
              <div className="bg-[#D4AF37] text-white px-3 py-1.5 rounded text-xs font-semibold">COD</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
