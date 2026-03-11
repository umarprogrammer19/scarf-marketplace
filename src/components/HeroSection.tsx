'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const categoriesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.from(titleRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
      })
      .from(badgeRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
      }, '-=0.8')
      .from(categoriesRef.current?.children || [], {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      }, '-=0.4')
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const categories = [
    { name: 'ORGANZA', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop&q=80' },
    { name: 'FESTIVE', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop&q=80' },
    { name: 'CRIMPS', image: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=400&h=400&fit=crop&q=80' },
    { name: 'ACCESSORIES', image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&h=400&fit=crop&q=80' },
    { name: 'JERSEY', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop&q=80' },
    { name: 'SILK', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=400&fit=crop&q=80' },
    { name: 'VELVET', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop&q=80' },
    { name: 'COTTON', image: 'https://images.unsplash.com/photo-1610652492500-ded49ceeb378?w=400&h=400&fit=crop&q=80' },
  ]

  return (
    <section ref={heroRef} className="relative bg-[#F5F3EF] overflow-hidden">
      <div className="relative h-[60vh] md:h-[70vh]">
        <Image
          src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1920&h=1080&fit=crop&q=80"
          alt="Hijabs Collection"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-[1400px] mx-auto px-6 w-full flex items-center justify-between">
            <h1 ref={titleRef} className="font-serif text-6xl md:text-8xl lg:text-9xl font-bold text-[#2C1810] tracking-wider">
              HIJABS
            </h1>
            <div ref={badgeRef} className="hidden md:block text-right">
              <span className="text-sm md:text-base tracking-[0.3em] text-[#2C1810] font-light uppercase">
                NEW ARRIVALS
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-12 border-t border-gray-200">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="relative">
            <div ref={categoriesRef} className="flex items-center gap-6 md:gap-8 overflow-x-auto pb-4 scrollbar-hide">
              {categories.map((category) => (
                <div key={category.name} className="flex flex-col items-center gap-4 cursor-pointer group flex-shrink-0">
                  <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  </div>
                  <span className="text-xs md:text-sm font-bold tracking-[0.2em] text-[#2C1810] group-hover:text-[#D4AF37] transition-colors uppercase whitespace-nowrap">
                    {category.name}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      <FeaturesBar />
    </section>
  )
}

function FeaturesBar() {
  const featuresRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(featuresRef.current?.children || [], {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      })
    }, featuresRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="bg-gradient-to-r from-[#2C1810] to-[#3D2318] text-white border-t border-gray-800">
      <div className="max-w-[1400px] mx-auto px-6 py-6">
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="text-[#D4AF37] text-2xl font-bold">500+</div>
            <div className="text-xs tracking-wider uppercase text-gray-300">Premium Products</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-[#D4AF37] text-2xl font-bold">FREE</div>
            <div className="text-xs tracking-wider uppercase text-gray-300">Delivery Above PKR 4,990</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-[#D4AF37] text-2xl font-bold">24/7</div>
            <div className="text-xs tracking-wider uppercase text-gray-300">Customer Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
