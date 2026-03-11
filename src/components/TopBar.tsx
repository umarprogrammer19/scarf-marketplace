'use client'

import { Phone, Mail, MapPin } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function TopBar() {
  const topBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(topBarRef.current?.children || [], {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out'
      })
    }, topBarRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-gradient-to-r from-[#2C1810] to-[#3D2318] text-white py-2.5 px-4 text-xs">
      <div ref={topBarRef} className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>+92 331 293 6919</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            <span>info@scarfstore.com</span>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="text-[#D4AF37] font-medium">Free Delivery on Orders Above PKR 4,990</span>
          <div className="hidden lg:flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5" />
            <span>Karachi, Pakistan</span>
          </div>
        </div>
      </div>
    </div>
  )
}
