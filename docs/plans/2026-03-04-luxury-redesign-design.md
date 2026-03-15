# Luxury Redesign Design — Aurum Resort
Date: 2026-03-04

## Approach
Full replace of all existing components and globals.css. Clean slate dark luxury build.

## Stack
- Next.js 16.1.6 (App Router)
- TypeScript, React 19
- Tailwind CSS v4 (@theme tokens in globals.css)
- Playfair Display (headings) + Geist Sans (body)
- No UI libraries, no external images

## Design Tokens (globals.css @theme)
- `--color-gold: #C6A75E` — primary accent
- `--color-gold-dark: #A88A42` — hover
- Background: `#0E0E10`
- Secondary bg: `#111214`
- Text primary: `#F5F5F5`
- Text secondary: `#B5B5B5`
- Borders: `rgba(255,255,255,0.08)`

## Typography
- Headings: Playfair Display, font-medium tracking-wide
- Hero: text-5xl md:text-6xl lg:text-7xl
- Section titles: text-3xl md:text-4xl
- Labels: uppercase text-xs tracking-[0.3em] text-gray-400
- Body: Geist Sans, text-[#B5B5B5] leading-relaxed

## Spacing
- Container: max-w-[1280px] mx-auto px-8
- Sections: py-28 desktop / py-20 mobile
- Very generous whitespace throughout

## Components

### 1. Navbar
- Absolute positioning over hero (z-50)
- Transparent bg → dark blur on scroll (useEffect scroll listener)
- Logo left: "AURUM" in Playfair Display
- Links right: Residences, Dining, Wellness, Experiences, Gallery, Contact
- Gold-border "Reserve" button (border-gold text-gold hover:bg-gold hover:text-black)
- Client component

### 2. Hero
- min-h-screen, dark gradient placeholder (from-neutral-900 to-neutral-950)
- Dark overlay gradient (gradient-to-t from-black/80 via-black/40 to-transparent)
- Centered: small gold label, massive heading, refined paragraph
- Gold-border CTA "Reserve Your Stay"
- Glass booking bar below: backdrop-blur-md bg-white/5 border border-white/10 rounded-full
  - Check-in, Check-out, Guests, Suites dropdown, gold Search button
- Client component (booking form state)

### 3. About
- Editorial 2-column split
- Left: tall aspect-[3/5] vertical image placeholder (dark gradient)
- Right: label "About the Estate", heading "An Icon of Refined Hospitality", 2 paragraphs, thin gold underline divider (w-12 h-px bg-gold)
- bg-[#0E0E10]

### 4. Suites
- bg-[#111214]
- Centered heading "Signature Suites"
- 3-card grid: each with aspect-[4/3] gradient image, suite name, 1-line description, price/night, "Explore Suite →" link
- Hover: slight scale on image, opacity transition on link
- Gold divider line under each suite name

### 5. Experience
- Full-width section min-h-[70vh]
- Dark cinematic gradient placeholder
- Overlay gradient
- Centered Playfair heading "Curated Experiences Beyond Imagination"
- Minimal subtext
- Gold text CTA button (text-gold border-b border-gold hover effect)

### 6. Amenities
- bg-[#0E0E10]
- 2-column: text block left, image collage right
- Left: heading "World-Class Amenities", 5 bullet points with gold dot indicators
- Right: 2 stacked/offset gradient image placeholders (collage effect)

### 7. Testimonials
- bg-[#111214]
- Centered heading "What Our Guests Say"
- Large faded gold quotation mark (text-8xl text-gold/20)
- 5-star gold SVGs
- Large centered quote text
- Guest name + country
- Single testimonial layout (editorial, not carousel)

### 8. ReservationCTA
- bg-[#0E0E10]
- Centered: "Begin Your Escape" heading
- Subtext: "A sanctuary reserved for those who seek the extraordinary."
- Large gold filled button "Reserve Now" (bg-gold hover:bg-gold-dark text-black)

### 9. Footer
- bg-[#0A0A0C] (slightly darker)
- Thin gold top border (border-t border-gold/30)
- 4 columns: Hotel | Explore | Services | Contact
- Bottom bar: copyright + Privacy Policy + Terms

## File Structure
```
app/
  layout.tsx     (update metadata + keep fonts)
  page.tsx       (replace with new components)
  globals.css    (full replace with dark tokens)
components/
  Navbar.tsx     (replace)
  Hero.tsx       (new)
  About.tsx      (new)
  Suites.tsx     (new)
  Experience.tsx (new)
  Amenities.tsx  (new)
  Testimonials.tsx (replace)
  ReservationCTA.tsx (new)
  Footer.tsx     (replace)
hooks/
  useScrollAnimation.ts (keep, no changes)
```

## Scroll Animations
Same useScrollAnimation hook. Fade-up on section entry.
