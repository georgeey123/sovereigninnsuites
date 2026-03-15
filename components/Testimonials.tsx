"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Placeholder gallery items - will be replaced with actual photos
const galleryItems = [
  { id: 1, title: "Hotel Exterior", span: "col-span-2 row-span-2" },
  { id: 2, title: "King Room", span: "" },
  { id: 3, title: "Breakfast Room", span: "" },
  { id: 4, title: "Hotel Grounds", span: "" },
  { id: 5, title: "Apartment Living Area", span: "" },
  { id: 6, title: "Outdoor Space", span: "col-span-2" },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="gallery"
      ref={ref as RefObject<HTMLElement>}
      className={`py-28 bg-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="uppercase text-[11px] tracking-[0.4em] text-primary-red mb-4 font-medium">
            Gallery
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#1a1a1a] mb-4">
            Explore Our Property
          </h2>
          <p className="text-[#666666] max-w-xl mx-auto leading-relaxed">
            Take a visual tour of Sovereign Inn Suites and discover the comfort that awaits you.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-lg cursor-pointer group ${item.span}`}
            >
              {/* Placeholder gradient - will be replaced with actual images */}
              <div className="absolute inset-0 bg-linear-to-br from-stone-300 via-stone-400 to-stone-500 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/60 to-transparent">
                <p className="text-white text-sm font-medium">{item.title}</p>
              </div>
              
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note about photos */}
        <div className="mt-8 text-center">
          <p className="text-[#999999] text-xs italic">
            Photo gallery placeholder - actual property photos coming soon
          </p>
        </div>
      </div>
    </section>
  );
}
