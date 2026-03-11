# GSAP + ScrollTrigger Implementation Guide

## 🎬 Overview

Your scarf marketplace now features smooth, professional animations powered by GSAP (GreenSock Animation Platform) and ScrollTrigger plugin. These animations enhance user experience with scroll-based reveals and interactive effects.

## 📦 Installation

```bash
npm install gsap
```

## 🎯 Implemented Animations

### 1. Hero Section Animations

#### Entrance Timeline
```javascript
- Badge: Slides down with fade (0.8s)
- Title: Words appear sequentially (1s, stagger 0.2s)
- Description: Fades up (0.8s)
- Buttons: Appear with stagger (0.6s, stagger 0.15s)
- Stats: Reveal with stagger (0.6s, stagger 0.1s)
- Image: Scales in (1.2s)
```

#### Parallax Effect
- Hero section moves down and fades as you scroll
- Creates depth and modern feel
- Scrub: 1 (smooth scrolling)

### 2. Features Bar

#### Scroll Trigger Animation
```javascript
- Trigger: When features bar enters viewport (90%)
- Effect: Each feature slides up with fade
- Stagger: 0.2s between features
- Duration: 0.8s
```

### 3. Product Grid

#### Section Header
```javascript
- Title and description fade up
- Stagger: 0.2s
- Trigger: 85% viewport
```

#### Product Cards
```javascript
- Cards appear from bottom
- Grid-based stagger animation
- Amount: 0.8s total stagger
- Creates wave effect
- Trigger: 80% viewport
```

### 4. Footer

#### Content Reveal
```javascript
- All footer columns animate together
- Slide up with fade
- Stagger: 0.15s between columns
- Trigger: 90% viewport
```

## 🛠️ Custom Hooks

### useGsapAnimation
Base hook for GSAP context management.

### useFadeInUp(delay)
```javascript
const ref = useFadeInUp(0.2)
// Element fades in and moves up
```

### useStaggerFadeIn(staggerDelay)
```javascript
const ref = useStaggerFadeIn(0.1)
// Children animate with stagger
```

### useParallax(speed)
```javascript
const ref = useParallax(0.5)
// Element moves with scroll
```

### useScaleIn()
```javascript
const ref = useScaleIn()
// Element scales from 0.8 to 1
```

### useSlideIn(direction)
```javascript
const ref = useSlideIn('left')
// Element slides in from left/right
```

## 📝 Usage Examples

### Basic Fade In
```tsx
import { useFadeInUp } from '@/hooks/useGsapAnimation'

function MyComponent() {
  const ref = useFadeInUp()
  
  return <div ref={ref}>Content</div>
}
```

### Stagger Children
```tsx
import { useStaggerFadeIn } from '@/hooks/useGsapAnimation'

function MyList() {
  const ref = useStaggerFadeIn(0.15)
  
  return (
    <div ref={ref}>
      <div>Item 1</div>
      <div>Item 2</div>
      <div>Item 3</div>
    </div>
  )
}
```

### Custom Timeline
```tsx
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

function MyComponent() {
  const ref = useRef(null)
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
    }, ref)
    
    return () => ctx.revert()
  }, [])
  
  return <div ref={ref}>Content</div>
}
```

## 🎨 Animation Properties

### Common Easing Functions
- `power3.out` - Smooth deceleration (default)
- `power3.inOut` - Smooth acceleration and deceleration
- `back.out(1.7)` - Overshoot effect
- `elastic.out(1, 0.3)` - Bouncy effect
- `none` - Linear (for parallax)

### Typical Durations
- Quick: 0.3s - 0.6s
- Standard: 0.8s - 1s
- Slow: 1.2s - 1.5s

### Stagger Patterns
```javascript
stagger: 0.1          // Simple delay
stagger: {
  amount: 0.8,        // Total time
  from: 'start',      // Direction
  grid: 'auto'        // Grid layout
}
```

## 🎯 ScrollTrigger Configuration

### Basic Setup
```javascript
scrollTrigger: {
  trigger: element,
  start: 'top 80%',      // When top of element hits 80% of viewport
  end: 'bottom 20%',     // When bottom hits 20%
  toggleActions: 'play none none none',
  scrub: true,           // Smooth scrubbing
  markers: false         // Debug markers
}
```

### Toggle Actions
Format: `onEnter onLeave onEnterBack onLeaveBack`
- `play` - Play animation
- `pause` - Pause animation
- `resume` - Resume animation
- `reset` - Reset animation
- `restart` - Restart animation
- `complete` - Complete animation
- `reverse` - Reverse animation
- `none` - Do nothing

### Common Patterns
```javascript
// Play once on enter
toggleActions: 'play none none none'

// Play and reverse
toggleActions: 'play reverse play reverse'

// Play once, reset on leave
toggleActions: 'play none none reset'
```

## 🔧 Performance Tips

### 1. Use Transform and Opacity
```javascript
// Good - GPU accelerated
gsap.to(element, { x: 100, opacity: 0.5 })

// Avoid - CPU intensive
gsap.to(element, { left: '100px', width: '50%' })
```

### 2. Context Management
Always use `gsap.context()` for cleanup:
```javascript
useEffect(() => {
  const ctx = gsap.context(() => {
    // Animations here
  }, ref)
  
  return () => ctx.revert() // Cleanup
}, [])
```

### 3. Batch Similar Elements
```javascript
// Good - Single animation
gsap.from('.cards', { y: 50, stagger: 0.1 })

// Avoid - Multiple animations
cards.forEach(card => gsap.from(card, { y: 50 }))
```

### 4. Use Will-Change Sparingly
```css
.animated-element {
  will-change: transform, opacity;
}
```

## 🎪 Advanced Techniques

### Timeline with Labels
```javascript
const tl = gsap.timeline()

tl.from('.hero', { opacity: 0 })
  .addLabel('content')
  .from('.title', { y: 50 }, 'content')
  .from('.desc', { y: 30 }, 'content+=0.2')
```

### Scroll-Linked Animation
```javascript
gsap.to('.parallax', {
  y: () => window.innerHeight * 0.5,
  ease: 'none',
  scrollTrigger: {
    trigger: '.section',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1
  }
})
```

### Responsive Animations
```javascript
ScrollTrigger.matchMedia({
  // Desktop
  '(min-width: 1024px)': function() {
    gsap.from('.element', { x: 100 })
  },
  
  // Mobile
  '(max-width: 1023px)': function() {
    gsap.from('.element', { y: 50 })
  }
})
```

## 🐛 Debugging

### Enable Markers
```javascript
scrollTrigger: {
  trigger: element,
  markers: true  // Shows trigger points
}
```

### Console Logging
```javascript
scrollTrigger: {
  trigger: element,
  onEnter: () => console.log('Entered'),
  onLeave: () => console.log('Left')
}
```

### Kill Animations
```javascript
// Kill all animations
gsap.killTweensOf('*')

// Kill specific element
gsap.killTweensOf('.element')
```

## 📱 Mobile Considerations

### Reduce Motion
```javascript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

if (!prefersReducedMotion) {
  // Run animations
}
```

### Touch-Friendly
- Avoid hover-triggered animations
- Use larger trigger areas
- Reduce animation complexity

## 🎓 Best Practices

1. **Keep it Subtle**: Animations should enhance, not distract
2. **Consistent Timing**: Use similar durations throughout
3. **Meaningful Motion**: Animate with purpose
4. **Performance First**: Test on low-end devices
5. **Accessibility**: Respect prefers-reduced-motion
6. **Progressive Enhancement**: Site works without JS

## 🔗 Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Easing Visualizer](https://greensock.com/ease-visualizer/)
- [GSAP Forum](https://greensock.com/forums/)

## 🎬 Animation Checklist

- ✅ Hero entrance timeline
- ✅ Hero parallax scroll
- ✅ Features bar reveal
- ✅ Product grid stagger
- ✅ Section headers fade in
- ✅ Footer content reveal
- ✅ Smooth scroll behavior
- ✅ Context cleanup
- ✅ Performance optimized
- ✅ Mobile responsive

## 🚀 Next Steps

1. Add page transitions
2. Implement product detail animations
3. Create cart slide-in animation
4. Add loading animations
5. Implement image reveal effects
6. Create hover micro-interactions
7. Add scroll progress indicator
8. Implement smooth page scrolling

## 💡 Custom Animation Ideas

### Magnetic Buttons
```javascript
gsap.to('.button', {
  x: (i, target) => {
    const rect = target.getBoundingClientRect()
    return (mouseX - rect.left - rect.width / 2) * 0.3
  },
  y: (i, target) => {
    const rect = target.getBoundingClientRect()
    return (mouseY - rect.top - rect.height / 2) * 0.3
  },
  duration: 0.3
})
```

### Text Reveal
```javascript
gsap.from('.text', {
  clipPath: 'inset(0 100% 0 0)',
  duration: 1,
  ease: 'power3.out'
})
```

### Counter Animation
```javascript
gsap.to('.counter', {
  textContent: 500,
  duration: 2,
  snap: { textContent: 1 },
  ease: 'power1.inOut'
})
```
