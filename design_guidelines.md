# Haditra Website - Design Guidelines

## Design Approach
**Reference-Based**: Drawing primary inspiration from zainlee.com's modern, tech-forward aesthetic combined with professional corporate design patterns. The design emphasizes clean layouts, generous whitespace, and subtle premium interactions.

## Visual Identity

### Color System
- **Primary Palette**: Deep slate (#0F172A, #1E293B, #334155) for headers and text
- **Accent Colors**: Vibrant blue system (#2563EB primary, #3B82F6 hover, #60A5FA highlights)
- **Backgrounds**: White (#FFFFFF) primary, Slate 50 (#F8FAFC) alternating sections, Slate 100 (#F1F5F9) for cards
- **Text Hierarchy**: Primary (#0F172A), Secondary (#475569), Muted (#64748B), Light (#94A3B8)
- **Gradients**: Hero uses `from-blue-600 via-blue-700 to-indigo-700`; buttons use `from-blue-600 to-blue-700`

### Typography
- **Font Family**: Inter for all text (clean, modern, professional)
- **Hero Titles**: 4xl-7xl font size, bold weight, tight leading
- **Section Headers**: 3xl-5xl, bold, with subtle text gradient options
- **Body Text**: Base to lg sizes, regular weight, readable line height (1.6-1.8)
- **Category Tags**: Uppercase, letter-spacing 0.2em, xs-sm sizes

## Layout System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 8, 12, 16, 20, 24, 32** for consistent rhythm
- Section padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Card padding: p-6 to p-8
- Gap between elements: gap-4, gap-6, gap-8

### Grid System
- Container max-width: 7xl (1280px)
- Service cards: 3-column grid on desktop (grid-cols-3), single column mobile
- Stats: 4-column grid desktop, 2-column tablet, single mobile
- Portfolio: 3-column masonry-style grid

## Component Library

### Hero Slider (Full-screen)
- 4 auto-playing slides (7s intervals) with crossfade transitions
- Full viewport height with gradient overlays (90% opacity dark slate → blue → dark slate)
- Centered content with category tag (pill-shaped, backdrop blur, border glow)
- Large split titles with staggered animation (title/subtitle appear separately)
- Dual CTAs: Primary (blue gradient button) + Secondary (outline button)
- Navigation arrows (sides) + dot indicators (bottom)
- Pause on hover interaction

### Statistics Section
- 4 key metrics in grid layout with animated count-up on scroll into view
- Large numbers (5xl-6xl font) in accent blue
- Supporting label text below in muted gray
- Subtle card background (slate-50) with rounded corners

### Services Grid
- 3 main service categories (Software Engineering, AI & Technologies, Creative Studio)
- Card design: White background, hover lift effect (translateY -4px), shadow elevation on hover
- Each card: Icon/emoji, title, description, 3 feature bullets
- "Learn More" link with arrow icon

### Client Logos Carousel
- Horizontal scrolling logo strip with auto-loop
- Grayscale logos with opacity, color on hover
- Equal spacing, consistent sizing (h-12 to h-16)

### Featured Projects
- 3-column grid of project cards
- Large image with gradient overlay on hover
- Category tag (top-left), title, tech stack badges
- "Learn more" CTA appears on hover

### Testimonials
- 3-column grid of client quotes
- 5-star rating display
- Quote text, client name, title/company
- Light background cards with subtle shadow

### Footer
- Dark background (#0F172A) with white/light gray text
- 4-column layout: Brand + description, Quick Links, Services, Contact Info
- Social icons, copyright, legal links at bottom

## Animations

### Motion Principles
- **Entrance**: FadeInUp (opacity 0→1, translateY 30→0, 600ms)
- **Cards**: ScaleIn on hover (scale 0.95→1, 500ms)
- **Stagger**: Children animate with 100ms delay between each
- **Easing**: Cubic bezier [0.22, 1, 0.36, 1] for smooth, natural motion
- **Scroll Triggers**: Animate elements as they enter viewport
- **Minimize**: Keep animations subtle and purposeful, avoid excessive motion

### Specific Interactions
- Button hover: Slight scale (1.02), gradient shift
- Card hover: Lift shadow, border glow
- Hero slider: Smooth crossfade, content stagger (category → title → subtitle → CTAs)
- Navigation: Smooth scroll behavior

## Images

### Hero Slider Backgrounds
- **Slide 1**: Modern office/workspace (software development theme)
- **Slide 2**: AI/tech visualization (neural networks, data visualization)
- **Slide 3**: Creative studio setup (cameras, video production)
- **Slide 4**: IoT/automation technology (smart devices, connectivity)
- All images: High-res (1920px wide), slight blur/overlay for text readability

### Service Cards
- Icon-based (no photos in cards), use gradient icon backgrounds

### Portfolio Projects
- 3 featured project images showcasing actual work
- 16:9 aspect ratio, professional quality

### Client Logos
- SVG or PNG logos, grayscale treatment

## Accessibility
- High contrast text (WCAG AA minimum)
- Focus states on all interactive elements (blue ring)
- Alt text on all images
- Keyboard navigation support
- Semantic HTML structure

## Responsive Behavior
- Mobile: Single column, stacked navigation (hamburger menu), smaller text scales
- Tablet: 2-column grids where appropriate
- Desktop: Full multi-column layouts, larger typography
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)

## Special Features
- Language switcher in navigation (EN/AR support)
- Scroll progress indicator (optional)
- Smooth scroll to sections from nav
- Loading states for dynamic content
- Backdrop blur effects on overlays and floating elements