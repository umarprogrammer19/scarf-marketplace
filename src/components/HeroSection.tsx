'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const leftContentRef = useRef<HTMLDivElement>(null)
  const rightImageRef = useRef<HTMLDivElement>(null)
  const imageInnerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial setup
      gsap.set(leftContentRef.current, { xPercent: -100, opacity: 0 })
      gsap.set(rightImageRef.current, { xPercent: 100, opacity: 0, scale: 1.1 })
      gsap.set(logoRef.current, { y: -50, opacity: 0 })

      // Hero entrance animation timeline
      const entranceTl = gsap.timeline({
        defaults: { ease: 'power4.out' },
      })

      // Logo drops in from top
      entranceTl.to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out',
      })

      // Left content slides in elegantly
      entranceTl.to(leftContentRef.current, {
        xPercent: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power4.out',
      }, '-=0.8')

      // Right image fades in with parallax scale
      entranceTl.to(rightImageRef.current, {
        xPercent: 0,
        opacity: 1,
        scale: 1,
        duration: 1.6,
        ease: 'power3.out',
      }, '-=1.2')

      // Image inner subtle zoom
      entranceTl.to(imageInnerRef.current, {
        scale: 1.05,
        duration: 2,
        ease: 'power2.out',
      }, '-=1.4')

      // Text stagger animation
      const textTl = gsap.timeline({
        delay: 0.8,
        defaults: { ease: 'power3.out' },
      })

      textTl.fromTo(
        '.hero-eyebrow',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
      .fromTo(
        '.hero-title-line1',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        '-=0.6'
      )
      .fromTo(
        '.hero-title-line2',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        '-=0.9'
      )
      .fromTo(
        '.hero-description',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        '-=0.8'
      )
      .fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      )

      // Parallax effect on scroll - Image moves at different speed
      gsap.to(rightImageRef.current, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Subtle zoom effect on image during scroll
      gsap.to(imageInnerRef.current, {
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })

      // Left content subtle parallax
      gsap.to(leftContentRef.current, {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#F9F7F2]"
    >
      {/* Split Screen Layout */}
      <div className="flex h-screen">
        {/* Left Content - Text Side */}
        <div
          ref={leftContentRef}
          className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 lg:px-16 xl:px-24 bg-gradient-to-br from-[#F9F7F2] via-[#FDFBF8] to-[#F5F2EB]"
        >
          {/* Logo */}
          <div ref={logoRef} className="mb-8 lg:mb-12">
            <div className="relative w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#B8860B] to-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-serif text-2xl lg:text-3xl font-bold">L</span>
            </div>
          </div>

          {/* Content Container */}
          <div className="max-w-xl text-center lg:text-left">
            {/* Eyebrow Text */}
            <p className="hero-eyebrow text-sm md:text-base text-[#B8860B] font-medium tracking-[0.25em] uppercase mb-6">
              ✦ The Hijab Company Collection ✦
            </p>

            {/* Main Title - Split into two lines */}
            <h1 className="mb-6">
              <span className="hero-title-line1 block font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#1A1A1A] leading-[1.1]">
                Elegance
              </span>
              <span className="hero-title-line2 block font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#1A1A1A] leading-[1.1] italic text-[#B8860B]">
                Reimagined
              </span>
            </h1>

            {/* Description */}
            <p className="hero-description text-gray-600 text-base md:text-lg lg:text-xl font-light leading-relaxed mb-10">
              Discover the art of refined draping. Our curated collection 
              blends timeless craftsmanship with contemporary elegance, 
              bringing you scarves that whisper luxury.
            </p>

            {/* CTA Buttons */}
            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group relative px-10 py-4 bg-[#1A1A1A] text-white overflow-hidden transition-all duration-500 hover:shadow-2xl">
                <span className="relative z-10 text-sm font-medium tracking-[0.15em] uppercase">
                  Shop Collection
                </span>
                <div className="absolute inset-0 bg-[#B8860B] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              </button>

              <button className="group px-10 py-4 border-2 border-[#1A1A1A] text-[#1A1A1A] overflow-hidden transition-all duration-500 hover:border-[#B8860B] hover:text-[#B8860B]">
                <span className="text-sm font-medium tracking-[0.15em] uppercase">
                  Explore Lookbook
                </span>
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="hero-cta mt-12 pt-8 border-t border-[#1A1A1A]/10">
              <div className="flex flex-wrap justify-center lg:justify-start gap-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#B8860B] rounded-full" />
                  <span>Premium Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#B8860B] rounded-full" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 bg-[#B8860B] rounded-full" />
                  <span>Easy Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Image Side */}
        <div
          ref={rightImageRef}
          className="hidden lg:flex w-1/2 relative overflow-hidden"
        >
          {/* Image Container with Parallax */}
          <div
            ref={imageInnerRef}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200&h=1600&fit=crop&q=80"
              alt="Luxury Scarf Model"
              fill
              className="object-cover"
              priority
            />

            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#F9F7F2]/30" />

            {/* Decorative Element - Gold Frame Accent */}
            <div className="absolute top-8 right-8 bottom-8 left-8 border border-white/20 pointer-events-none" />
          </div>

          {/* Floating Badge */}
          <div className="absolute bottom-12 left-12 bg-white/95 backdrop-blur-sm px-6 py-4 shadow-2xl">
            <p className="text-xs text-[#B8860B] font-medium tracking-widest uppercase mb-1">
              New Collection
            </p>
            <p className="text-lg font-serif font-semibold text-[#1A1A1A]">
              Spring / Summer 2026
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-3">
          <span className="text-xs text-gray-400 tracking-[0.2em] uppercase">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-[#B8860B] to-transparent relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#B8860B] to-transparent animate-scroll-indicator" />
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes scroll-indicator {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }

        .animate-scroll-indicator {
          animation: scroll-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default HeroSection
