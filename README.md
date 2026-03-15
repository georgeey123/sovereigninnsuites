# Aurum Resort — Luxury Hotel Website

A 5-star ultra-luxury hotel website built with Next.js, TypeScript, and Tailwind CSS. Inspired by Aman, Four Seasons, and The Ritz-Carlton.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Fonts:** Playfair Display (headings) · Geist Sans (body)
- **Package Manager:** pnpm

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Build for production:

```bash
pnpm build
pnpm start
```

## Project Structure

```
app/
  layout.tsx          # Root layout, fonts, metadata
  page.tsx            # Main page — composes all sections
  globals.css         # Tailwind v4 tokens, base styles

components/
  Navbar.tsx          # Fixed navbar, transparent → blur on scroll
  Hero.tsx            # Full-screen hero with glass booking bar
  About.tsx           # Editorial split: image + about text
  Suites.tsx          # 3-card signature suites grid
  Experience.tsx      # Full-width cinematic experience section
  Amenities.tsx       # 2-col amenities list + image collage
  Testimonials.tsx    # Editorial guest testimonials
  ReservationCTA.tsx  # Reservation call-to-action
  Footer.tsx          # 4-column footer

hooks/
  useScrollAnimation.ts  # IntersectionObserver fade-up hook
```

## Design Tokens

Defined in `app/globals.css` via Tailwind v4 `@theme`:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-gold` | `#C6A75E` | Accents, CTAs, dividers |
| `--color-gold-dark` | `#A88A42` | Hover states |
| Background | `#0E0E10` | Page background |
| Text primary | `#F5F5F5` | Headings |
| Text secondary | `#B5B5B5` | Body copy |
