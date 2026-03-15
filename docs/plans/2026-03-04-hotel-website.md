# Hotel Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a full production-ready Empire Court Hotel website with 10 sections using Next.js 16, TypeScript, and Tailwind CSS v4.

**Architecture:** Single-page App Router route (`/`) composing 10 server/client components. Design tokens defined via Tailwind v4 `@theme` in globals.css. Scroll animations via a shared `useScrollAnimation` hook.

**Tech Stack:** Next.js 16.1.6, React 19, TypeScript, Tailwind CSS v4, Playfair Display (Google Fonts), no external images, no UI libraries.

---

### Task 1: Configure globals.css and layout.tsx

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Step 1: Update globals.css with design tokens and base styles**

Replace the entire file with:

```css
@import "tailwindcss";

@theme {
  --color-gold: #C67C2E;
  --color-gold-dark: #A8621E;
  --color-cream: #F5F5F0;
  --color-dark: #1a1a1a;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-geist-sans), Arial, sans-serif;
  background: #ffffff;
  color: #171717;
}

.font-playfair {
  font-family: var(--font-playfair), Georgia, serif;
}
```

**Step 2: Update layout.tsx to add Playfair Display font**

Replace the entire file with:

```tsx
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Empire Court Hotel & Apartments",
  description:
    "Experience luxury hospitality at Empire Court Hotel. Spacious hotel rooms and fully furnished apartments for business and leisure travellers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Step 3: Verify — run dev server**

```bash
cd /Users/topboyasante/Projects/hotell && pnpm dev
```
Expected: Server starts on http://localhost:3000 with no errors.

**Step 4: Commit**

```bash
git init && git add app/globals.css app/layout.tsx
git commit -m "feat: configure tailwind v4 tokens and playfair font"
```

---

### Task 2: Create useScrollAnimation hook

**Files:**
- Create: `hooks/useScrollAnimation.ts`

**Step 1: Create hooks directory and file**

```typescript
// hooks/useScrollAnimation.ts
"use client";

import { useEffect, useRef, useState } from "react";

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
```

**Step 2: Commit**

```bash
git add hooks/useScrollAnimation.ts
git commit -m "feat: add useScrollAnimation hook"
```

---

### Task 3: TopBar component

**Files:**
- Create: `components/TopBar.tsx`

**Step 1: Create component**

```tsx
// components/TopBar.tsx
export default function TopBar() {
  return (
    <div className="bg-[#1a1a1a] text-white text-xs py-2">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-6 text-gray-300">
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3 fill-gold" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            +234 (0)3 4456 | (0)3 4500
          </span>
          <span className="flex items-center gap-1.5">
            <svg className="w-3 h-3 fill-gold" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            info@empirecourt.com
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="#booking"
            className="bg-gold hover:bg-gold-dark text-white uppercase tracking-widest text-[10px] font-semibold px-4 py-1.5 rounded transition-colors duration-200"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add components/TopBar.tsx
git commit -m "feat: add TopBar component"
```

---

### Task 4: Navbar component

**Files:**
- Create: `components/Navbar.tsx`

**Step 1: Create component**

```tsx
// components/Navbar.tsx
"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Hotel", href: "#hotel" },
  { label: "Apartments", href: "#apartments" },
  { label: "About", href: "#about" },
  { label: "Amenities", href: "#amenities" },
  { label: "Booking", href: "#booking" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <a href="#" className="flex flex-col leading-tight">
          <span className="font-playfair text-lg font-bold tracking-widest text-[#1a1a1a] uppercase">
            Empire Court
          </span>
          <span className="uppercase text-[9px] tracking-[0.3em] text-gold font-semibold">
            Hotel
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs uppercase tracking-widest text-gray-600 hover:text-gold transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-700"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-xs uppercase tracking-widest text-gray-600 hover:text-gold transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
```

**Step 2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add sticky Navbar with mobile menu"
```

---

### Task 5: HeroBooking component

**Files:**
- Create: `components/HeroBooking.tsx`

**Step 1: Create component**

```tsx
// components/HeroBooking.tsx
"use client";

import { useState } from "react";

export default function HeroBooking() {
  const [guests, setGuests] = useState("1");

  return (
    <section
      id="booking"
      className="relative min-h-[90vh] flex items-center justify-center"
    >
      {/* Background Placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-amber-950 to-stone-800">
        <div className="absolute inset-0 bg-black/55" />
        {/* Subtle texture overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 w-full max-w-[1200px] mx-auto">
        <p className="uppercase text-xs tracking-widest text-gold mb-3 font-medium">
          Discover Our Rooms & Apartments →
        </p>
        <h1 className="font-playfair text-4xl md:text-6xl font-semibold tracking-wide text-white mb-4">
          CHECK AVAILABILITY
        </h1>
        <p className="text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed text-sm md:text-base">
          Choose from our Spacious, Stylish, Designed, and fully furnished Hotel
          Rooms, 2-Bedroom &amp; 3-Bedroom apartments — perfect for families,
          business travellers, or long-term stays. All apartments come with
          fully equipped kitchens, Wi-Fi, air conditioning, and easy access to
          major city spots.
        </p>

        {/* Booking Card */}
        <div className="bg-white rounded-sm shadow-2xl p-4 md:p-6 max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="flex flex-col text-left">
              <label className="uppercase text-[10px] tracking-widest text-gray-500 mb-1.5 font-medium">
                Check In
              </label>
              <input
                type="date"
                className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="uppercase text-[10px] tracking-widest text-gray-500 mb-1.5 font-medium">
                Check Out
              </label>
              <input
                type="date"
                className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div className="flex flex-col text-left">
              <label className="uppercase text-[10px] tracking-widest text-gray-500 mb-1.5 font-medium">
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="border border-gray-200 rounded-sm px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-gold transition-colors bg-white"
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gold hover:bg-gold-dark text-white uppercase tracking-widest text-xs font-semibold py-2.5 px-4 rounded-sm transition-colors duration-200">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/HeroBooking.tsx
git commit -m "feat: add HeroBooking section with booking form"
```

---

### Task 6: AboutSection component

**Files:**
- Create: `components/AboutSection.tsx`

**Step 1: Create component**

```tsx
// components/AboutSection.tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const highlights = [
  { icon: "wifi", label: "Complimentary High-Speed Wi-Fi" },
  { icon: "shield", label: "24/7 Security & Surveillance" },
  { icon: "car", label: "Secure On-Site Parking" },
  { icon: "star", label: "Daily Housekeeping Service" },
];

function HighlightIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    wifi: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"
      />
    ),
    shield: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
      />
    ),
    car: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8 17H5a2 2 0 01-2-2V9a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-3m-9 0h10M9 17v2m6-2v2M7 9l2-4h6l2 4"
      />
    ),
    star: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    ),
  };

  return (
    <svg
      className="w-4 h-4 text-gold flex-shrink-0"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      {icons[type]}
    </svg>
  );
}

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <p className="uppercase text-xs tracking-widest text-gold mb-3 font-medium">
              About Us
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
              WE MADE IT A HOME.
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Children up to age 4 spend the night free in their parents&apos;
              room. We charge per night for each additional &apos;bed&apos; for
              children up to age 12, and an amount per night for each additional
              bed for children from age 13. Additional beds are only available
              in the hotel.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              We are glad to welcome your four-legged friend to our Apartments
              too. Send us inquiry for pets other than dogs or cats for the
              charge per night.
            </p>

            {/* Highlights */}
            <ul className="space-y-3 mb-8">
              {highlights.map((item) => (
                <li key={item.label} className="flex items-center gap-3">
                  <HighlightIcon type={item.icon} />
                  <span className="text-sm text-gray-700">{item.label}</span>
                </li>
              ))}
            </ul>

            <a
              href="#amenities"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-dark transition-colors duration-200 uppercase tracking-widest border-b border-gold pb-0.5"
            >
              Our Services →
            </a>
          </div>

          {/* Right: Image Placeholder */}
          <div className="relative">
            <div className="w-full aspect-[3/4] bg-gradient-to-br from-amber-100 via-stone-200 to-amber-200 rounded-sm overflow-hidden shadow-xl">
              <div className="absolute inset-0 flex items-end p-6">
                <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-sm">
                  <p className="uppercase text-[10px] tracking-widest text-gray-500">
                    Our Rooms
                  </p>
                  <p className="font-playfair text-sm font-semibold text-gray-800">
                    Elegantly Furnished
                  </p>
                </div>
              </div>
            </div>
            {/* Accent block */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-gold/10 rounded-sm -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/AboutSection.tsx
git commit -m "feat: add AboutSection with split layout and scroll animation"
```

---

### Task 7: WhyChooseUs component

**Files:**
- Create: `components/WhyChooseUs.tsx`

**Step 1: Create component**

```tsx
// components/WhyChooseUs.tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: "home",
    title: "Comfort That Feels Like Home",
    description:
      "Spacious, fully furnished apartments with cosy living areas, in-room kitchens, and premium accessories — all designed for real living, not just sleeping.",
  },
  {
    icon: "calendar",
    title: "Perfect for Any Stay",
    description:
      "Whether you're in town for a weekend getaway, an extended business trip, or relocation, we offer flexible booking options and long-stay discounts.",
  },
  {
    icon: "award",
    title: "Premium Hospitality",
    description:
      "From the moment you arrive, our dedicated team ensures every detail is handled with warmth, professionalism, and a genuine desire to exceed your expectations.",
  },
];

export default function WhyChooseUs() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="amenities"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950">
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div
        className={`relative z-10 max-w-[1200px] mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Orange center box */}
        <div className="max-w-3xl mx-auto bg-gold/90 backdrop-blur-sm px-8 py-10 text-center mb-12">
          <p className="uppercase text-xs tracking-widest text-white/80 mb-2 font-medium">
            Why Us
          </p>
          <h2 className="font-playfair text-2xl md:text-3xl font-semibold text-white">
            WHY YOU SHOULD CHOOSE US
          </h2>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {features.map((feature) => (
            <div key={feature.title} className="text-white">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {feature.icon === "home" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    )}
                    {feature.icon === "calendar" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    )}
                    {feature.icon === "award" && (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    )}
                  </svg>
                </div>
              </div>
              <h3 className="font-playfair text-lg font-semibold mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#booking"
            className="inline-flex items-center gap-2 bg-white text-gold hover:bg-gold hover:text-white text-xs uppercase tracking-widest font-semibold px-8 py-3 transition-colors duration-200"
          >
            Book Now →
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/WhyChooseUs.tsx
git commit -m "feat: add WhyChooseUs section with 3-column features"
```

---

### Task 8: PropertyGrid component

**Files:**
- Create: `components/PropertyGrid.tsx`

**Step 1: Create component**

```tsx
// components/PropertyGrid.tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const properties = [
  {
    id: "hotel",
    label: "HOTEL",
    description: "Classic comfort with premium service",
    bg: "bg-gradient-to-br from-stone-700 via-amber-900 to-stone-800",
    href: "#hotel",
  },
  {
    id: "apartments",
    label: "APARTMENTS",
    description: "Spacious living for extended stays",
    bg: "bg-gradient-to-br from-amber-800 via-stone-700 to-amber-950",
    href: "#apartments",
  },
];

export default function PropertyGrid() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="hotel"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-0 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {properties.map((property) => (
          <a
            key={property.id}
            href={property.href}
            className="group relative block aspect-[4/3] overflow-hidden"
          >
            <div
              className={`absolute inset-0 ${property.bg} transition-transform duration-500 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/55 transition-colors duration-300" />

            {/* Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
              <h3 className="font-playfair text-3xl md:text-4xl font-semibold tracking-widest mb-2">
                {property.label}
              </h3>
              <div className="w-8 h-px bg-gold mb-3 group-hover:w-16 transition-all duration-300" />
              <p className="text-xs uppercase tracking-widest text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {property.description} →
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/PropertyGrid.tsx
git commit -m "feat: add PropertyGrid with hover zoom effect"
```

---

### Task 9: FeaturedRoom component

**Files:**
- Create: `components/FeaturedRoom.tsx`

**Step 1: Create component**

```tsx
// components/FeaturedRoom.tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function FeaturedRoom() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="apartments"
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-cream transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative">
            <div className="w-full aspect-[4/3] bg-gradient-to-br from-amber-100 via-stone-200 to-amber-300 shadow-lg overflow-hidden rounded-sm">
              {/* Decorative furniture silhouette lines */}
              <div className="absolute inset-0 flex items-end p-6">
                <div className="bg-white/70 backdrop-blur-sm px-4 py-3 rounded-sm">
                  <p className="uppercase text-[10px] tracking-widest text-gray-500">
                    Suite Interior
                  </p>
                  <p className="font-playfair text-sm font-semibold text-gray-800">
                    Premium Finishes
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -top-3 -right-3 w-16 h-16 bg-gold/20 rounded-sm -z-10" />
          </div>

          {/* Text */}
          <div>
            <p className="uppercase text-xs tracking-widest text-gold mb-3 font-medium">
              Featured
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
              OUR LUXURIOUS SUITE
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Our luxurious rooms are well-equipped with modern facilities, every
              chambre-inspired decor designed perfectly crafted for your unique
              comfort and relaxation needs.
            </p>
            <p className="text-gray-600 leading-relaxed mb-8">
              Each suite features a king-size bed, rainfall shower, private
              balcony with city views, and a fully stocked minibar. Experience
              the pinnacle of refined hospitality during every moment of your
              stay.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#booking"
                className="inline-block bg-gold hover:bg-gold-dark text-white text-xs uppercase tracking-widest font-semibold px-8 py-3 transition-colors duration-200"
              >
                Reserve Suite
              </a>
              <a
                href="#gallery"
                className="inline-block border border-gray-300 hover:border-gold text-gray-700 hover:text-gold text-xs uppercase tracking-widest font-semibold px-8 py-3 transition-colors duration-200"
              >
                View Gallery
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/FeaturedRoom.tsx
git commit -m "feat: add FeaturedRoom split section"
```

---

### Task 10: HotelCTA component

**Files:**
- Create: `components/HotelCTA.tsx`

**Step 1: Create component**

```tsx
// components/HotelCTA.tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  { icon: "check", label: "Fully Furnished Apartments" },
  { icon: "check", label: "Room Service Available" },
  { icon: "check", label: "Conference Facilities" },
  { icon: "check", label: "Airport Pickup on Request" },
];

export default function HotelCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="gallery"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative py-28 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-950 via-stone-800 to-amber-900">
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div
        className={`relative z-10 max-w-[1200px] mx-auto px-6 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Card */}
          <div className="bg-white p-8 md:p-10 shadow-2xl">
            <p className="uppercase text-xs tracking-widest text-gold mb-3 font-medium">
              Our Properties
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gray-900 mb-5 leading-tight">
              HOTEL &amp; APARTMENTS
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6 text-sm">
              Welcome to Empire Court Hotel &amp; Apartments. Experience
              comfort, style, and exceptional service in every stay. Whether
              here for business or leisure, Empire Court offers the perfect blend
              of hotel luxury and apartment convenience. Your ideal home away
              from home.
            </p>

            <ul className="space-y-2 mb-6">
              {features.map((f) => (
                <li key={f.label} className="flex items-center gap-2.5">
                  <svg
                    className="w-4 h-4 text-gold flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm text-gray-700">{f.label}</span>
                </li>
              ))}
            </ul>

            <a
              href="#gallery"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-gold hover:text-gold-dark transition-colors duration-200"
            >
              View Image Gallery →
            </a>
          </div>

          {/* Right: Stacked Buttons */}
          <div className="flex flex-col gap-4 lg:items-start">
            <a
              href="#booking"
              className="w-full lg:w-64 text-center bg-gold hover:bg-gold-dark text-white text-xs uppercase tracking-widest font-semibold px-8 py-4 transition-colors duration-200"
            >
              Book Apartment
            </a>
            <a
              href="#booking"
              className="w-full lg:w-64 text-center border-2 border-white text-white hover:bg-white hover:text-gold text-xs uppercase tracking-widest font-semibold px-8 py-4 transition-colors duration-200"
            >
              Book a Hotel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add components/HotelCTA.tsx
git commit -m "feat: add HotelCTA section with floating card"
```

---

### Task 11: Testimonials component

**Files:**
- Create: `components/Testimonials.tsx`

**Step 1: Create component**

```tsx
// components/Testimonials.tsx
"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "Dr. Ngozi Adeyemi",
    role: "Business Traveller",
    review:
      "I have been a regular guest at Empire Court for all my Lagos business trips. The service is impeccable, the rooms are always spotless, and the staff genuinely goes above and beyond. It feels like a home away from home every single time.",
    rating: 5,
    initials: "NA",
  },
  {
    name: "Mr. Raphael",
    role: "Family Guest",
    review:
      "The staff are so friendly and welcoming. Our family stayed for two weeks in one of the apartments and we had everything we needed — the kitchen, the space, the security. Would highly recommend to any family visiting.",
    rating: 5,
    initials: "MR",
  },
  {
    name: "Adrian James",
    role: "Long-Stay Guest",
    review:
      "I stay here comfortably every time I visit Nigeria. Really a top-notch establishment with luxury rooms and superb customer care. The breakfast service is a lovely touch that sets the morning up perfectly.",
    rating: 5,
    initials: "AJ",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? "fill-gold text-gold" : "fill-gray-200 text-gray-200"}`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={`py-20 bg-cream transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="uppercase text-xs tracking-widest text-gold mb-3 font-medium">
            Guest Reviews
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
            TESTIMONIALS
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto leading-relaxed text-sm">
            At Empire Court Hotel &amp; Apartments, we take pride in delivering
            exceptional hospitality and unforgettable experiences. From the
            moment you check in to the day you leave, our goal is to make every
            guest feel at home.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white p-6 shadow-[0_2px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-shadow duration-300"
            >
              <StarRating count={t.rating} />
              <p className="text-gray-600 text-sm leading-relaxed mt-4 mb-6 italic">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-200 to-stone-300 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-stone-700">
                    {t.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500 uppercase tracking-widest">
                    {t.role}
                  </p>
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

**Step 2: Commit**

```bash
git add components/Testimonials.tsx
git commit -m "feat: add Testimonials section with star ratings"
```

---

### Task 12: Footer component

**Files:**
- Create: `components/Footer.tsx`

**Step 1: Create component**

```tsx
// components/Footer.tsx
const quickLinks = [
  { label: "Home", href: "#" },
  { label: "About Us", href: "#about" },
  { label: "Hotel", href: "#hotel" },
  { label: "Apartments", href: "#apartments" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact Us", href: "#contact" },
];

export default function Footer() {
  return (
    <footer id="contact">
      {/* Upper Footer */}
      <div className="bg-white py-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Map Placeholder */}
            <div>
              <p className="uppercase text-xs tracking-widest text-gold mb-4 font-medium">
                Find Us
              </p>
              <div className="w-full aspect-[4/3] bg-gradient-to-br from-stone-100 to-stone-200 rounded-sm overflow-hidden relative shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <svg
                      className="w-10 h-10 mx-auto mb-2 text-gold/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <p className="text-xs uppercase tracking-widest">
                      Open in Maps
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <p className="uppercase text-xs tracking-widest text-gold mb-4 font-medium">
                Quick Links
              </p>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-gold transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Hotel Info */}
            <div>
              <div className="mb-6">
                <span className="font-playfair text-xl font-bold tracking-widest text-[#1a1a1a] uppercase">
                  Empire Court
                </span>
                <span className="block uppercase text-[9px] tracking-[0.3em] text-gold font-semibold mt-0.5">
                  Hotel
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                Our luxurious rooms are well-equipped with modern facilities,
                lovingly channelled decor, and classically inspired décor
                offering distinctive comforts in a warm and welcoming setting.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-700 font-semibold">
                  Address:
                </p>
                <p className="text-sm text-gray-600">
                  3 Victoria Road, GRA, Lagos, Nigeria
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  +234 (0)3 4456 | (0)3 4500
                </p>
                <p className="text-sm text-gray-600">
                  info@empirecourt.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Bar */}
      <div className="bg-[#1a1a1a] py-4">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">
            Copyright 2024. Empire Court Hotel. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gold transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gold transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Footer with map placeholder, quick links, hotel info"
```

---

### Task 13: Wire everything in app/page.tsx

**Files:**
- Modify: `app/page.tsx`

**Step 1: Replace page.tsx**

```tsx
// app/page.tsx
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroBooking from "@/components/HeroBooking";
import AboutSection from "@/components/AboutSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import PropertyGrid from "@/components/PropertyGrid";
import FeaturedRoom from "@/components/FeaturedRoom";
import HotelCTA from "@/components/HotelCTA";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <TopBar />
      <Navbar />
      <HeroBooking />
      <AboutSection />
      <WhyChooseUs />
      <PropertyGrid />
      <FeaturedRoom />
      <HotelCTA />
      <Testimonials />
      <Footer />
    </main>
  );
}
```

**Step 2: Verify in browser at http://localhost:3000**

Run: `pnpm dev`
Expected: Full hotel page rendered with all 10 sections, no TypeScript errors.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire all sections into main page"
```

---

### Task 14: Final polish — responsive checks and micro-details

**Files:**
- Modify: `app/globals.css` (add scroll padding and selection color)

**Step 1: Add final CSS polish**

Add to end of `globals.css`:

```css
/* Scroll offset for sticky nav */
html {
  scroll-padding-top: 4rem;
}

/* Gold text selection */
::selection {
  background: #C67C2E;
  color: white;
}

/* Remove date input icon on Firefox */
input[type="date"]::-moz-calendar-picker-indicator {
  opacity: 0.5;
}
```

**Step 2: Verify responsive at 375px, 768px, 1280px breakpoints**

Open DevTools → toggle device toolbar → check each section.
Expected: No overflow, text readable, booking form stacks cleanly on mobile.

**Step 3: Final commit**

```bash
git add app/globals.css
git commit -m "feat: add scroll padding and selection polish"
```

---

## Summary

14 tasks total. Every component is self-contained with its own scroll animation. All images are styled `div` placeholders with warm gradients. Tailwind v4 `@theme` tokens power the accent color system. The site is fully responsive with a mobile hamburger nav.
