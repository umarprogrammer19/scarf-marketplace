'use client'

import { Phone, Mail, Clock, CreditCard, Package, RefreshCw } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function CustomerService() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current?.children || [], {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16 border-y border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C1810] mb-4">
            Quick Help Section
          </h2>
          <p className="text-gray-600 text-lg">
            Have a question? Find answers or reach out to us
          </p>
        </div>

        <div ref={sectionRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Customer Service */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
              <Phone className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-bold text-[#2C1810] mb-4">Customer Service</h3>
            <div className="space-y-3 text-gray-600">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm">+92-331-293-6919</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm">Mon-Sat: 11:00 am - 6:00 pm PST</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                <span className="text-sm">Send us an email</span>
              </div>
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
              <Package className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-bold text-[#2C1810] mb-4">Shipping</h3>
            <div className="space-y-3 text-gray-600 text-sm">
              <p className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1">✓</span>
                <span>Free Local Delivery on all orders above PKR 4,990</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1">✓</span>
                <span>International Orders charged as per destination & weight</span>
              </p>
              <p className="flex items-start gap-2">
                <span className="text-[#D4AF37] mt-1">✓</span>
                <span>Fast & Reliable Delivery Service</span>
              </p>
            </div>
          </div>

          {/* Payments */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
            <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-6">
              <CreditCard className="w-8 h-8 text-[#D4AF37]" />
            </div>
            <h3 className="text-xl font-bold text-[#2C1810] mb-4">Payments</h3>
            <div className="space-y-3 text-gray-600 text-sm">
              <p className="mb-3">Accepts the following payment methods:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-100 px-3 py-1.5 rounded text-xs font-semibold">Credit Card</span>
                <span className="bg-gray-100 px-3 py-1.5 rounded text-xs font-semibold">Debit Card</span>
                <span className="bg-[#D4AF37] text-white px-3 py-1.5 rounded text-xs font-semibold">COD</span>
                <span className="bg-gray-100 px-3 py-1.5 rounded text-xs font-semibold">Wallet</span>
                <span className="bg-gray-100 px-3 py-1.5 rounded text-xs font-semibold">Bank Transfer</span>
              </div>
            </div>
          </div>

          {/* Return Policy */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 md:col-span-2 lg:col-span-3">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <RefreshCw className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#2C1810] mb-4">Return Policy</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  You can return or claim for exchanges, should the item be received defected or any different than what's mentioned. 
                  We ensure 100% customer satisfaction with our hassle-free return and exchange policy. Contact us within 7 days of receiving your order.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
