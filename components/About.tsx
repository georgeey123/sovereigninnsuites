"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function About() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="about"
      ref={ref as RefObject<HTMLElement>}
      className={`py-28 bg-cream transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Left: Image Placeholder */}
          <div className="relative">
            <div className="w-full aspect-[4/5] bg-linear-to-br from-stone-300 via-stone-400 to-stone-500 rounded-sm shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="uppercase text-[9px] tracking-[0.3em] text-gold">Junction 8, Osabene</p>
                <p className="font-playfair text-lg text-white mt-1">Koforidua</p>
              </div>
            </div>
            {/* Offset accent */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-gold/40 -z-10" />
          </div>

          {/* Right: Text */}
          <div>
            <p className="uppercase text-[11px] tracking-[0.4em] text-primary-red mb-5 font-medium">
              About Us
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#1a1a1a] mb-3 leading-tight">
              Welcome to
              <br />
              Sovereign Inn Suites
            </h2>
            {/* Gold underline divider */}
            <div className="w-12 h-px bg-gold mb-8" />
            <p className="text-[#666666] leading-relaxed mb-6">
              Nestled in the heart of Osabene at Junction 8 in Koforidua, Sovereign
              Inn Suites offers a quiet and welcoming retreat in the Eastern Region
              of Ghana. Designed for comfort, privacy, and convenience, the hotel
              provides a relaxed atmosphere ideal for business travelers, families,
              and visitors exploring the region.
            </p>
            <p className="text-[#666666] leading-relaxed mb-10">
              With spacious grounds and a serene setting, Sovereign Inn Suites
              combines homely comfort with thoughtful hospitality, making every
              stay both refreshing and memorable.
            </p>
            <a
              href="#rooms"
              className="inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-primary-red hover:opacity-70 transition-opacity duration-300 font-medium"
            >
              View Our Rooms
              <span className="w-8 h-px bg-gold inline-block" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
