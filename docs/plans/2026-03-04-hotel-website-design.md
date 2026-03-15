# Hotel Website Design — Empire Court Hotel
Date: 2026-03-04

## Stack
- Next.js 16.1.6 (App Router)
- TypeScript
- Tailwind CSS v4 (@theme tokens in globals.css)
- React 19
- No UI libraries

## Design Tokens (globals.css @theme)
- `--color-gold: #C67C2E` — primary accent
- `--color-gold-dark: #A8621E` — hover state
- `--color-cream: #F5F5F0` — section backgrounds
- Font headings: Playfair Display (Google Fonts, serif)
- Font body: Geist Sans (existing)

## Typography Scale
- Hero title: `text-4xl md:text-5xl font-semibold tracking-wide` (Playfair)
- Section titles: `text-2xl md:text-3xl font-semibold` (Playfair)
- Body: `text-gray-600 leading-relaxed`
- Labels: `uppercase text-xs tracking-widest text-gray-500`

## Container
- `max-w-[1200px] mx-auto px-6`
- Section spacing: `py-20 md:py-14`

## Component Architecture

### 1. TopBar
- Dark strip (#1a1a1a)
- Left: phone + email
- Right: "Book Now" gold pill button

### 2. Navbar
- Client component (sticky scroll shadow)
- White background, logo left (Playfair "EMPIRE COURT")
- Nav links centered: Home, Hotel, Apartments, About, Amenities, Booking, Gallery, Contact
- Sticky with shadow on scroll

### 3. HeroBooking
- Full-viewport height
- Styled div placeholder: dark warm gradient overlay
- Centered: "CHECK AVAILABILITY" + subtext
- Floating white booking card: check-in, check-out, guests dropdown, gold search button

### 4. AboutSection
- 2-column split (50/50)
- Left: title "WE MADE IT A HOME", paragraphs, bullet highlights with gold icons, "Our Services →" link
- Right: tall image placeholder (warm gradient)

### 5. WhyChooseUs
- Full-width dark bg image placeholder
- Centered gold-tinted translucent box
- Title "WHY YOU SHOULD CHOOSE US"
- 3-column features: Comfort / Perfect Stay / Premium Hospitality
- "Book Now →" button

### 6. PropertyGrid
- 2 equal full-width cards side by side
- HOTEL card + APARTMENTS card
- Overlay text, hover: slight zoom + darker overlay (200ms transition)

### 7. FeaturedRoom
- Left: large horizontal image placeholder
- Right: "OUR LUXURIOUS SUITE" title, description, CTA button

### 8. HotelCTA
- Full-width background image placeholder
- Floating white card left: title + description + feature icons
- Right: 2 stacked buttons (Book Apartment filled, Book Hotel outline)

### 9. Testimonials
- Centered title "TESTIMONIALS" + intro text
- 3 cards: guest name, review, star rating
- Soft shadow, white bg

### 10. Footer
- Upper: 3 columns — map placeholder, Quick Links, Hotel info
- Lower: dark bar with copyright

## Image Placeholders
Styled divs using `bg-gradient-to-br` in warm neutrals (stone/amber), labeled, no external images.

## Scroll Animations
Custom `useIntersectionObserver` hook → `opacity-0 translate-y-4 → opacity-100 translate-y-0` on section entry.

## File Structure
```
app/
  layout.tsx
  page.tsx
  globals.css
components/
  TopBar.tsx
  Navbar.tsx
  HeroBooking.tsx
  AboutSection.tsx
  WhyChooseUs.tsx
  PropertyGrid.tsx
  FeaturedRoom.tsx
  HotelCTA.tsx
  Testimonials.tsx
  Footer.tsx
hooks/
  useScrollAnimation.ts
docs/
  plans/
    2026-03-04-hotel-website-design.md
```
