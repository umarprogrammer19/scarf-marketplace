# GSAP Quick Start Guide

## 🚀 What's Been Added

Your website now has professional scroll-based animations using GSAP and ScrollTrigger!

## ✨ Animations Overview

### Hero Section
- **Entrance**: Elements appear sequentially (badge → title → description → buttons → stats → image)
- **Parallax**: Hero moves down and fades as you scroll
- **Duration**: ~3 seconds total entrance animation

### Features Bar
- **Scroll Reveal**: Features slide up when scrolling into view
- **Stagger**: Each feature appears 0.2s after the previous

### Product Grid
- **Header**: Title and description fade in
- **Cards**: Products appear in a wave pattern
- **Grid Stagger**: Creates smooth cascading effect

### Footer
- **Content Reveal**: All sections slide up together
- **Stagger**: 0.15s delay between columns

## 🎮 How to Test

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Open Browser**
   - Navigate to `http://localhost:3000`

3. **Watch Animations**
   - Hero loads with sequential animations
   - Scroll down to see features reveal
   - Continue scrolling to see products appear
   - Scroll to footer for final reveal

4. **Test Parallax**
   - Scroll slowly through hero section
   - Notice the subtle movement and fade

## 🎨 Customization

### Change Animation Speed

**Hero Section** (`src/components/HeroSection.tsx`):
```typescript
// Find this line and change duration
duration: 1,  // Change to 0.5 for faster, 2 for slower
```

**Product Grid** (`src/components/ProductGrid.tsx`):
```typescript
// Change stagger amount
stagger: {
  amount: 0.8,  // Change to 0.4 for faster, 1.2 for slower
}
```

### Adjust Scroll Trigger Points

```typescript
scrollTrigger: {
  start: 'top 85%',  // Change 85% to trigger earlier/later
  // 90% = triggers later (more scroll needed)
  // 70% = triggers earlier (less scroll needed)
}
```

### Modify Easing

```typescript
ease: 'power3.out',  // Current easing

// Try these alternatives:
ease: 'power2.out',     // Gentler
ease: 'power4.out',     // More dramatic
ease: 'back.out(1.7)',  // Overshoot effect
ease: 'elastic.out',    // Bouncy
```

## 🔧 Common Tweaks

### Make Animations Faster
```typescript
// Reduce all durations by 50%
duration: 0.4,  // Instead of 0.8
duration: 0.5,  // Instead of 1
```

### Disable Parallax
```typescript
// Comment out or remove this section in HeroSection.tsx
/*
gsap.to(heroRef.current, {
  y: 100,
  opacity: 0.8,
  // ... rest of parallax code
})
*/
```

### Add More Stagger
```typescript
// Increase stagger delay
stagger: 0.3,  // Instead of 0.1
```

### Change Animation Direction
```typescript
// Slide from right instead of bottom
gsap.from(element, {
  x: 100,      // Instead of y: 60
  opacity: 0,
})
```

## 🎯 Using Custom Hooks

### In Any Component

```tsx
import { useFadeInUp } from '@/hooks/useGsapAnimation'

function MyComponent() {
  const ref = useFadeInUp(0.2)  // 0.2s delay
  
  return (
    <div ref={ref}>
      This will fade in and move up!
    </div>
  )
}
```

### Available Hooks

1. **useFadeInUp(delay)**
   - Fades in and moves up
   - `delay`: seconds to wait before starting

2. **useStaggerFadeIn(staggerDelay)**
   - Animates children with stagger
   - `staggerDelay`: delay between each child

3. **useParallax(speed)**
   - Creates parallax scroll effect
   - `speed`: 0.5 = half speed, 1 = full speed

4. **useScaleIn()**
   - Scales from 0.8 to 1
   - Includes bounce effect

5. **useSlideIn(direction)**
   - Slides in from left or right
   - `direction`: 'left' or 'right'

## 📱 Mobile Performance

Animations are optimized for mobile:
- GPU-accelerated transforms
- Efficient ScrollTrigger
- Automatic cleanup
- Reduced motion support (coming soon)

## 🐛 Troubleshooting

### Animations Not Working?

1. **Check Console**
   - Open browser DevTools (F12)
   - Look for errors

2. **Verify GSAP Installation**
   ```bash
   npm list gsap
   ```

3. **Clear Cache**
   ```bash
   rm -rf .next
   npm run dev
   ```

### Animations Too Fast/Slow?

- Adjust `duration` values
- Modify `stagger` amounts
- Change `ease` functions

### Scroll Triggers Not Firing?

- Check `start` and `end` values
- Verify element is in viewport
- Add `markers: true` for debugging

## 🎓 Learning Resources

### GSAP Basics
- [GSAP Getting Started](https://greensock.com/get-started/)
- [ScrollTrigger Tutorial](https://greensock.com/scrolltrigger/)

### Video Tutorials
- [GSAP 3 Crash Course](https://www.youtube.com/results?search_query=gsap+3+tutorial)
- [ScrollTrigger Examples](https://codepen.io/collection/AEbkkJ)

### Interactive Demos
- [GSAP Showcase](https://greensock.com/showcase/)
- [ScrollTrigger Demos](https://greensock.com/st-demos/)

## 💡 Pro Tips

1. **Keep Durations Consistent**
   - Use 0.8s for most animations
   - Use 1.2s for hero/important elements
   - Use 0.4s for quick interactions

2. **Stagger Wisely**
   - 0.1s for many items (10+ cards)
   - 0.2s for medium groups (3-6 items)
   - 0.3s for few items (2-3 items)

3. **Test on Real Devices**
   - Animations may feel different on mobile
   - Test scroll performance
   - Check battery impact

4. **Use Easing Consistently**
   - Stick to `power3.out` for most cases
   - Use `back.out` for playful elements
   - Use `none` only for parallax

## 🎬 Animation Timeline

```
Page Load
  ↓
Hero Entrance (0-3s)
  ├─ Badge appears (0-0.8s)
  ├─ Title words (0.4-1.6s)
  ├─ Description (1.0-1.8s)
  ├─ Buttons (1.4-2.2s)
  ├─ Stats (1.7-2.5s)
  └─ Image (1.0-2.2s)
  ↓
Scroll Down
  ↓
Features Bar (trigger at 90%)
  └─ 3 features stagger (0.8s total)
  ↓
Continue Scrolling
  ↓
Product Grid (trigger at 80%)
  ├─ Header (0.8s)
  └─ Cards wave (0.8s stagger)
  ↓
Scroll to Bottom
  ↓
Footer (trigger at 90%)
  └─ 4 columns stagger (0.8s total)
```

## 🔄 Next Enhancements

Want to add more animations? Try:

1. **Navbar Scroll Effect**
   - Change background on scroll
   - Shrink logo size
   - Add shadow

2. **Product Card Hover**
   - Magnetic effect
   - 3D tilt
   - Glow effect

3. **Page Transitions**
   - Fade between pages
   - Slide transitions
   - Loading animations

4. **Scroll Progress**
   - Progress bar at top
   - Animated on scroll
   - Color changes

5. **Text Animations**
   - Split text reveal
   - Character stagger
   - Typewriter effect

## 📞 Need Help?

Check these files for examples:
- `src/components/HeroSection.tsx` - Complex timeline
- `src/components/ProductGrid.tsx` - Grid stagger
- `src/hooks/useGsapAnimation.ts` - Reusable hooks
- `GSAP_ANIMATIONS.md` - Full documentation

Happy animating! 🎉
