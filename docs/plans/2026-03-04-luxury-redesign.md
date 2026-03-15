# Luxury Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Full replace of the existing warm-tone hotel site with a 5-star ultra-luxury dark cinematic website inspired by Aman/Four Seasons.

**Architecture:** Delete old components, rebuild 9 new components under `components/`, update globals.css with dark tokens, wire in `app/page.tsx`. The `hooks/useScrollAnimation.ts` is kept unchanged.

**Tech Stack:** Next.js 16.1.6, React 19, TypeScript, Tailwind CSS v4, Playfair Display + Geist Sans, no external images.

---

### Task 1: Replace globals.css with dark luxury tokens

**Files:**
- Modify: `app/globals.css`

**Step 1: Replace entire file with:**

```css
@import "tailwindcss";

@theme {
  --color-gold: #C6A75E;
  --color-gold-dark: #A88A42;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}

body {
  font-family: var(--font-geist-sans), Arial, sans-serif;
  background: #0E0E10;
  color: #F5F5F5;
}

.font-playfair {
  font-family: var(--font-playfair), Georgia, serif;
}

::selection {
  background: #C6A75E;
  color: #0E0E10;
}

input[type="date"]::-moz-calendar-picker-indicator {
  opacity: 0.4;
  filter: invert(1);
}
```

**Step 2: Verify no syntax errors by reading it back.**

---

### Task 2: Update layout.tsx metadata

**Files:**
- Modify: `app/layout.tsx`

**Step 1: Replace the metadata block only (keep fonts):**

```tsx
export const metadata: Metadata = {
  title: "Aurum Resort — A Five-Star Luxury Experience",
  description:
    "Aurum Resort offers an unparalleled luxury escape. Private suites, Michelin-level dining, world-class wellness, and bespoke experiences await.",
};
```

**Step 2: Confirm the file still imports Geist and Playfair_Display correctly.**

---

### Task 3: Remove old components, create Navbar.tsx

**Files:**
- Delete (overwrite): `components/TopBar.tsx`, `components/AboutSection.tsx`, `components/WhyChooseUs.tsx`, `components/PropertyGrid.tsx`, `components/FeaturedRoom.tsx`, `components/HotelCTA.tsx`
- Create: `components/Navbar.tsx`

**Step 1: Delete the old components by overwriting them with empty placeholder exports (they will be replaced in later tasks or simply not imported).**

Actually — just leave old files. They will stop being imported after page.tsx is updated. Focus on creating new files.

**Step 1: Create `components/Navbar.tsx`:**

```tsx
"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Residences", href: "#suites" },
  { label: "Dining", href: "#experience" },
  { label: "Wellness", href: "#amenities" },
  { label: "Experiences", href: "#experience" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0E0E10]/95 backdrop-blur-md border-b border-white/5 shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-none">
          <span className="font-playfair text-xl font-medium tracking-[0.25em] text-[#F5F5F5] uppercase">
            Aurum
          </span>
          <span className="uppercase text-[8px] tracking-[0.4em] text-gold font-medium mt-0.5">
            Resort & Spa
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] text-[#B5B5B5] hover:text-[#F5F5F5] transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Reserve Button + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="#reserve"
            className="hidden lg:inline-flex items-center border border-gold text-gold hover:bg-gold hover:text-[#0E0E10] text-[11px] uppercase tracking-[0.2em] font-medium px-5 py-2 transition-all duration-300"
          >
            Reserve
          </a>
          <button
            className="lg:hidden p-2 text-[#B5B5B5]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden bg-[#0E0E10]/98 border-t border-white/5 px-8 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[11px] uppercase tracking-[0.2em] text-[#B5B5B5] hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reserve"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center border border-gold text-gold text-[11px] uppercase tracking-[0.2em] font-medium px-5 py-2.5 w-fit transition-all duration-300"
          >
            Reserve
          </a>
        </nav>
      )}
    </header>
  );
}
```

---

### Task 4: Create Hero.tsx

**Files:**
- Create: `components/Hero.tsx`

```tsx
"use client";

import { useState } from "react";
import type { ReactNode } from "react";

const suiteOptions = ["All Suites", "Garden Suite", "Ocean Suite", "Presidential Suite", "Penthouse"];

export default function Hero() {
  const [guests, setGuests] = useState("2");
  const [suite, setSuite] = useState("All Suites");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-950">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        {/* Subtle grain */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "128px 128px",
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-8 max-w-[1280px] mx-auto w-full pt-20">
        <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-6 font-medium">
          A Five-Star Luxury Experience
        </p>
        <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-medium tracking-wide text-[#F5F5F5] mb-6 leading-[1.1]">
          Where Elegance Meets
          <br />
          Timeless Comfort
        </h1>
        <p className="text-[#B5B5B5] max-w-2xl mx-auto mb-10 leading-relaxed text-base md:text-lg">
          An intimate sanctuary of refined luxury, where every detail is
          thoughtfully curated to offer an unparalleled experience of serenity,
          beauty, and bespoke service.
        </p>
        <a
          href="#reserve"
          className="inline-flex items-center border border-gold text-gold hover:bg-gold hover:text-[#0E0E10] text-[11px] uppercase tracking-[0.25em] font-medium px-8 py-3.5 transition-all duration-300 mb-16"
        >
          Reserve Your Stay
        </a>

        {/* Glass Booking Bar */}
        <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-full px-6 py-4 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center">
            <div className="flex flex-col text-left px-3">
              <label htmlFor="hero-checkin" className="uppercase text-[9px] tracking-[0.25em] text-[#B5B5B5] mb-1">
                Check In
              </label>
              <input
                id="hero-checkin"
                type="date"
                className="bg-transparent text-[#F5F5F5] text-sm focus:outline-none w-full"
              />
            </div>
            <div className="flex flex-col text-left px-3 border-l border-white/10">
              <label htmlFor="hero-checkout" className="uppercase text-[9px] tracking-[0.25em] text-[#B5B5B5] mb-1">
                Check Out
              </label>
              <input
                id="hero-checkout"
                type="date"
                className="bg-transparent text-[#F5F5F5] text-sm focus:outline-none w-full"
              />
            </div>
            <div className="flex flex-col text-left px-3 border-l border-white/10">
              <label htmlFor="hero-guests" className="uppercase text-[9px] tracking-[0.25em] text-[#B5B5B5] mb-1">
                Guests
              </label>
              <select
                id="hero-guests"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="bg-transparent text-[#F5F5F5] text-sm focus:outline-none appearance-none"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n} className="bg-[#0E0E10]">
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col text-left px-3 border-l border-white/10">
              <label htmlFor="hero-suite" className="uppercase text-[9px] tracking-[0.25em] text-[#B5B5B5] mb-1">
                Suite Type
              </label>
              <select
                id="hero-suite"
                value={suite}
                onChange={(e) => setSuite(e.target.value)}
                className="bg-transparent text-[#F5F5F5] text-sm focus:outline-none appearance-none"
              >
                {suiteOptions.map((s) => (
                  <option key={s} value={s} className="bg-[#0E0E10]">
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2 md:col-span-4 lg:col-span-1 flex justify-end px-2">
              <button className="w-full lg:w-auto bg-gold hover:bg-gold-dark text-[#0E0E10] text-[11px] uppercase tracking-[0.2em] font-semibold px-6 py-2.5 rounded-full transition-colors duration-300">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="uppercase text-[9px] tracking-[0.3em] text-[#B5B5B5]">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#B5B5B5] to-transparent" />
      </div>
    </section>
  );
}
```

---

### Task 5: Create About.tsx

**Files:**
- Create: `components/About.tsx`

```tsx
"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref as RefObject<HTMLElement>}
      className={`py-28 bg-[#0E0E10] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Tall Image */}
          <div className="relative">
            <div className="w-full aspect-[3/5] bg-gradient-to-br from-neutral-800 via-stone-800 to-neutral-900 rounded-sm shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="uppercase text-[9px] tracking-[0.3em] text-gold/70">Est. 1998</p>
                <p className="font-playfair text-lg text-[#F5F5F5] mt-1">Aurum Resort</p>
              </div>
            </div>
            {/* Offset accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/20 -z-10" />
          </div>

          {/* Right: Text */}
          <div>
            <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-5 font-medium">
              About the Estate
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#F5F5F5] mb-3 leading-tight">
              An Icon of Refined
              <br />
              Hospitality
            </h2>
            {/* Gold underline divider */}
            <div className="w-12 h-px bg-gold mb-8" />
            <p className="text-[#B5B5B5] leading-relaxed mb-6">
              Nestled in a landscape of extraordinary beauty, Aurum Resort has
              long been the destination of choice for discerning travellers who
              seek more than a stay — they seek a transformation. Our philosophy
              is rooted in the art of quiet luxury: spaces that breathe, service
              that anticipates, and moments that endure.
            </p>
            <p className="text-[#B5B5B5] leading-relaxed mb-10">
              Every suite has been designed by award-winning architects with a
              singular vision — to create private sanctuaries that blur the
              boundary between inside and out, between indulgence and belonging.
              This is not merely a hotel. It is a living work of art.
            </p>
            <a
              href="#suites"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-gold hover:opacity-70 transition-opacity duration-300 font-medium"
            >
              Discover Our Suites
              <span className="w-8 h-px bg-gold inline-block" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 6: Create Suites.tsx

**Files:**
- Create: `components/Suites.tsx`

```tsx
"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const suites = [
  {
    name: "The Garden Suite",
    description: "Private terrace with manicured garden views",
    price: "$1,200",
    gradient: "from-stone-800 via-neutral-800 to-stone-900",
    size: "120 sqm",
  },
  {
    name: "The Ocean Suite",
    description: "Uninterrupted panoramic ocean vistas",
    price: "$2,400",
    gradient: "from-slate-800 via-stone-800 to-slate-900",
    size: "180 sqm",
  },
  {
    name: "The Penthouse",
    description: "Our most prestigious residence, unmatched in every way",
    price: "$5,800",
    gradient: "from-neutral-700 via-stone-800 to-neutral-900",
    size: "320 sqm",
  },
];

export default function Suites() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="suites"
      ref={ref as RefObject<HTMLElement>}
      className={`py-28 bg-[#111214] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-4 font-medium">
            Accommodations
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#F5F5F5]">
            Signature Suites
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {suites.map((suite) => (
            <div key={suite.name} className="group flex flex-col">
              {/* Image Placeholder */}
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${suite.gradient} transition-transform duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-black/20" />
                {/* Size tag */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="uppercase text-[9px] tracking-[0.2em] text-[#B5B5B5]">
                    {suite.size}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col">
                <h3 className="font-playfair text-xl font-medium text-[#F5F5F5] mb-1">
                  {suite.name}
                </h3>
                <div className="w-8 h-px bg-gold my-3" />
                <p className="text-[#B5B5B5] text-sm leading-relaxed mb-4 flex-1">
                  {suite.description}
                </p>
                <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
                  <div>
                    <span className="font-playfair text-2xl text-gold">{suite.price}</span>
                    <span className="text-[#B5B5B5] text-xs ml-1">/ night</span>
                  </div>
                  <a
                    href="#reserve"
                    className="text-[11px] uppercase tracking-[0.2em] text-[#B5B5B5] hover:text-gold transition-colors duration-300 flex items-center gap-2"
                  >
                    Explore Suite
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 7: Create Experience.tsx

**Files:**
- Create: `components/Experience.tsx`

```tsx
"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="experience"
      ref={ref as RefObject<HTMLElement>}
      className="relative min-h-[75vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-neutral-900 to-stone-950">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40" />
      </div>

      <div
        className={`relative z-10 text-center px-8 max-w-[1280px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-6 font-medium">
          Experiences
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-[#F5F5F5] mb-6 leading-tight">
          Curated Experiences
          <br />
          Beyond Imagination
        </h2>
        <p className="text-[#B5B5B5] max-w-xl mx-auto mb-10 leading-relaxed">
          From private sunset cruises and helicopter excursions to intimate
          chef-table dinners beneath the stars — every experience at Aurum is
          singular, unforgettable, and entirely yours.
        </p>
        <a
          href="#contact"
          className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-gold hover:opacity-70 transition-opacity duration-300 font-medium border-b border-gold/50 pb-0.5"
        >
          Enquire About Experiences
        </a>
      </div>
    </section>
  );
}
```

---

### Task 8: Create Amenities.tsx

**Files:**
- Create: `components/Amenities.tsx`

```tsx
"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const amenities = [
  "Private infinity pool overlooking the horizon",
  "Michelin-level dining curated by our Executive Chef",
  "Personal butler service, 24 hours a day",
  "Chauffeur transfers in luxury vehicles",
  "Spa & wellness sanctuary with holistic therapies",
  "Private beach access & water sports concierge",
];

export default function Amenities() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="amenities"
      ref={ref as RefObject<HTMLElement>}
      className={`py-28 bg-[#0E0E10] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Text */}
          <div>
            <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-5 font-medium">
              Amenities
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#F5F5F5] mb-3 leading-tight">
              World-Class
              <br />
              Amenities
            </h2>
            <div className="w-12 h-px bg-gold mb-8" />
            <p className="text-[#B5B5B5] leading-relaxed mb-10">
              At Aurum, luxury is not an amenity — it is an expectation. Every
              facility has been conceived to deliver a seamlessly elevated
              experience from first arrival to final farewell.
            </p>
            <ul className="space-y-5">
              {amenities.map((item) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                  <span className="text-[#B5B5B5] text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Image Collage */}
          <div className="relative hidden lg:block">
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-neutral-800 to-stone-900 rounded-sm shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-stone-700/50 via-neutral-800 to-stone-900" />
            </div>
            <div className="absolute -bottom-8 -left-8 w-2/3 aspect-[3/2] bg-gradient-to-br from-stone-800 to-neutral-900 rounded-sm shadow-2xl border border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tl from-neutral-700/40 via-stone-800 to-neutral-900" />
            </div>
            <div className="absolute -top-6 -right-6 w-24 h-24 border border-gold/15 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

### Task 9: Create Testimonials.tsx

**Files:**
- Create: `components/Testimonials.tsx` (replace existing)

```tsx
"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="testimonials"
      ref={ref as RefObject<HTMLElement>}
      className={`py-28 bg-[#111214] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-4 font-medium">
            Guest Voices
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#F5F5F5]">
            What Our Guests Say
          </h2>
        </div>

        {/* Editorial Quote */}
        <div className="max-w-3xl mx-auto text-center">
          {/* Faded gold quotation mark */}
          <div className="font-playfair text-[120px] leading-none text-gold/15 select-none mb-0 -mb-8">
            &ldquo;
          </div>

          {/* Stars */}
          <div className="flex justify-center gap-1 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} className="w-4 h-4 fill-gold text-gold" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>

          <blockquote className="font-playfair text-xl md:text-2xl text-[#F5F5F5] leading-relaxed font-medium mb-10">
            There are places that exist in memory long after you have left.
            Aurum is one of them. The silence, the light, the way every member
            of staff seemed to understand exactly what we needed before we
            needed it — this is hospitality at its most human and most
            extraordinary.
          </blockquote>

          <div className="w-12 h-px bg-gold/40 mx-auto mb-6" />

          <p className="text-[#F5F5F5] text-sm font-medium tracking-wide">
            Isabelle Moreau
          </p>
          <p className="text-[#B5B5B5] text-xs uppercase tracking-[0.25em] mt-1">
            Paris, France
          </p>
        </div>

        {/* Second + third testimonials in smaller format */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20 pt-16 border-t border-white/5">
          {[
            {
              quote: "The Penthouse suite redefined my understanding of luxury. Every morning I woke to a view that felt almost unreal.",
              name: "James Whitmore",
              country: "London, UK",
            },
            {
              quote: "Aurum does not perform luxury — it lives it. The spa, the dining, the rooms — everything was perfectly calibrated.",
              name: "Yuki Tanaka",
              country: "Tokyo, Japan",
            },
          ].map((t) => (
            <div key={t.name} className="text-center px-6">
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="w-3 h-3 fill-gold text-gold" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#B5B5B5] text-sm leading-relaxed italic mb-5">&ldquo;{t.quote}&rdquo;</p>
              <p className="text-[#F5F5F5] text-sm font-medium">{t.name}</p>
              <p className="text-[#B5B5B5] text-xs uppercase tracking-[0.2em] mt-1">{t.country}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

### Task 10: Create ReservationCTA.tsx

**Files:**
- Create: `components/ReservationCTA.tsx`

```tsx
"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ReservationCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="reserve"
      ref={ref as RefObject<HTMLElement>}
      className={`py-28 bg-[#0E0E10] transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8 text-center">
        <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-5 font-medium">
          Reservations
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl font-medium text-[#F5F5F5] mb-5 leading-tight">
          Begin Your Escape
        </h2>
        <p className="text-[#B5B5B5] max-w-md mx-auto mb-10 leading-relaxed">
          A sanctuary reserved for those who seek the extraordinary.
        </p>
        {/* Thin gold divider */}
        <div className="w-16 h-px bg-gold/40 mx-auto mb-10" />
        <a
          href="mailto:reservations@aurumresort.com"
          className="inline-flex items-center bg-gold hover:bg-gold-dark text-[#0E0E10] text-[12px] uppercase tracking-[0.25em] font-semibold px-10 py-4 transition-colors duration-300"
        >
          Reserve Now
        </a>
        <p className="text-[#B5B5B5] text-xs uppercase tracking-[0.2em] mt-6">
          Or call +1 (800) 000-0000 for immediate assistance
        </p>
      </div>
    </section>
  );
}
```

---

### Task 11: Create Footer.tsx

**Files:**
- Create: `components/Footer.tsx` (replace existing)

```tsx
const footerColumns = [
  {
    heading: "Hotel",
    links: ["Our Story", "Awards", "Sustainability", "Press"],
  },
  {
    heading: "Explore",
    links: ["Signature Suites", "Dining", "Wellness & Spa", "Experiences"],
  },
  {
    heading: "Services",
    links: ["Private Events", "Corporate Stays", "Weddings", "Gift Cards"],
  },
  {
    heading: "Contact",
    links: ["Reservations", "Concierge", "Careers", "General Enquiries"],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0A0A0C] border-t border-gold/20">
      {/* Main columns */}
      <div className="max-w-[1280px] mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="uppercase text-[10px] tracking-[0.35em] text-gold mb-5 font-medium">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-[#B5B5B5] hover:text-[#F5F5F5] transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Logo + tagline */}
        <div className="mt-16 pt-10 border-t border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <span className="font-playfair text-xl font-medium tracking-[0.25em] text-[#F5F5F5] uppercase">
              Aurum
            </span>
            <span className="block uppercase text-[8px] tracking-[0.4em] text-gold mt-0.5">
              Resort & Spa
            </span>
          </div>
          <p className="text-xs text-[#B5B5B5] italic font-playfair">
            &ldquo;Where elegance meets timeless comfort&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#B5B5B5]">
            © 2026 Aurum Resort & Spa. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[11px] text-[#B5B5B5] hover:text-gold transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-[11px] text-[#B5B5B5] hover:text-gold transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

### Task 12: Replace app/page.tsx

**Files:**
- Modify: `app/page.tsx`

```tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Suites from "@/components/Suites";
import Experience from "@/components/Experience";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import ReservationCTA from "@/components/ReservationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#0E0E10]">
      <Navbar />
      <Hero />
      <About />
      <Suites />
      <Experience />
      <Amenities />
      <Testimonials />
      <ReservationCTA />
      <Footer />
    </main>
  );
}
```

---

## Summary

12 tasks. Full replacement of globals.css, all components, and page.tsx. The `hooks/useScrollAnimation.ts` and `app/layout.tsx` fonts are preserved unchanged (only metadata updated in layout.tsx).
