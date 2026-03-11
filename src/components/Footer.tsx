'use client'

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function Footer() {
  const footerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer className="bg-gradient-to-br from-[#2C1810] via-[#3D2318] to-[#2C1810] text-white">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div ref={footerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <Image 
              src="/my_image.jpeg" 
              alt="Brand Logo" 
              width={140}
              height={70}
              className="h-14 w-auto object-contain mb-6 brightness-0 invert cursor-pointer"
            />
            <p className="text-sm text-gray-300 leading-relaxed mb-6">
              Bringing you the finest collection of premium scarves and shawls. 
              Quality craftsmanship meets timeless elegance.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>+92 300 1234567</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span>info@scarfstore.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37] mt-1" />
                <span>Karachi, Pakistan</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[#D4AF37]">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">Our Story</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">Collections</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">Contact</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-[#D4AF37]">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">Track Order</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">Returns & Exchange</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-[#D4AF37] transition-colors cursor-pointer hover:translate-x-1 inline-block">FAQs</a></li>
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
                placeholder="Your email"
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder:text-gray-400 focus:outline-none focus:border-[#D4AF37] focus:bg-white/15 transition-all"
              />
              <button className="bg-[#D4AF37] text-white px-4 py-3 rounded-lg hover:bg-[#C4A137] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                <Mail className="w-5 h-5" />
              </button>
            </div>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:bg-[#D4AF37] hover:text-white transition-all duration-300 cursor-pointer">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:bg-[#D4AF37] hover:text-white transition-all duration-300 cursor-pointer">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-300 hover:bg-[#D4AF37] hover:text-white transition-all duration-300 cursor-pointer">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2026 Scarf Marketplace. All rights reserved.
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-[#D4AF37] transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors cursor-pointer">Terms of Service</a>
            <a href="#" className="hover:text-[#D4AF37] transition-colors cursor-pointer">Refund Policy</a>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#2C1810] px-3 py-1.5 rounded text-xs font-bold">VISA</div>
            <div className="bg-white text-[#2C1810] px-3 py-1.5 rounded text-xs font-bold">MASTERCARD</div>
            <div className="bg-[#D4AF37] text-white px-3 py-1.5 rounded text-xs font-bold">COD</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
