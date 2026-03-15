"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Experience() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="dining"
      ref={ref as RefObject<HTMLElement>}
      className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-stone-500 via-stone-600 to-stone-700">
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/20 to-black/30" />
      </div>

      <div
        className={`relative z-10 text-center px-8 max-w-[1280px] mx-auto transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-6 font-medium">
          Food &amp; Drink
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl font-medium text-white mb-6 leading-tight">
          Start Your Day
          <br />
          In Comfort
        </h2>
        <p className="text-white/80 max-w-xl mx-auto mb-8 leading-relaxed">
          Guests can enjoy breakfast in the hotel&apos;s spacious breakfast room, designed 
          to provide a comfortable and inviting dining experience. The relaxed setting 
          makes it easy to start your day in comfort before heading out to explore 
          or attend to business.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <div className="flex items-center gap-2 text-gold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">Morning Breakfast Service</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gold/40" />
          <div className="flex items-center gap-2 text-gold">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm">Spacious Dining Area</span>
          </div>
        </div>
      </div>
    </section>
  );
}
