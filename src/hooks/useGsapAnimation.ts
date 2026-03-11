'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function useGsapAnimation() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const ctx = gsap.context(() => {
      // Animation context will be set by individual components
    }, elementRef)

    return () => ctx.revert()
  }, [])

  return elementRef
}

export function useFadeInUp(delay = 0) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, elementRef)

    return () => ctx.revert()
  }, [delay])

  return elementRef
}

export function useStaggerFadeIn(staggerDelay = 0.1) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      const children = containerRef.current?.children
      if (!children) return

      gsap.from(children, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: staggerDelay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [staggerDelay])

  return containerRef
}

export function useParallax(speed = 0.5) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(elementRef.current, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, elementRef)

    return () => ctx.revert()
  }, [speed])

  return elementRef
}

export function useScaleIn() {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, elementRef)

    return () => ctx.revert()
  }, [])

  return elementRef
}

export function useSlideIn(direction: 'left' | 'right' = 'left') {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!elementRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(elementRef.current, {
        x: direction === 'left' ? -100 : 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: elementRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, elementRef)

    return () => ctx.revert()
  }, [direction])

  return elementRef
}
