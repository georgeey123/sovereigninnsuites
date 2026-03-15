"use client";

import { useState } from "react";

const roomTypes = ["All Rooms", "King Room", "One-Bedroom Apartment"];

export default function Hero() {
  const [roomType, setRoomType] = useState("All Rooms");
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Placeholder - will be replaced with actual photo */}
      <div className="absolute inset-0 bg-linear-to-br from-stone-600 via-stone-500 to-stone-700">
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/20" />
        {/* Subtle texture overlay */}
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
          Koforidua, Eastern Region, Ghana
        </p>
        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide text-white mb-6 leading-[1.1]">
          A Quiet &amp; Welcoming
          <br />
          Retreat
        </h1>
        <p className="text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed text-base md:text-lg">
          Nestled in the heart of Osabene at Junction 8, Sovereign Inn Suites
          offers comfort, privacy, and convenience for business travelers,
          families, and visitors exploring the region.
        </p>
        <a
          href="#reserve"
          className="inline-flex items-center border border-gold text-gold hover:bg-gold hover:text-white text-[11px] uppercase tracking-[0.25em] font-medium px-8 py-3.5 transition-all duration-300 mb-16"
        >
          Check Availability
        </a>

        {/* Booking Form - White/Cream Glass */}
        <div className="backdrop-blur-md bg-white/90 border border-gold/30 rounded-2xl px-6 py-5 max-w-4xl mx-auto shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
            {/* Room Type */}
            <div className="flex flex-col text-left px-3 col-span-2 lg:col-span-1">
              <label htmlFor="hero-room" className="uppercase text-[9px] tracking-[0.25em] text-[#666666] mb-1">
                Room Type
              </label>
              <select
                id="hero-room"
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="bg-transparent text-[#1a1a1a] text-sm focus:outline-none appearance-none"
              >
                {roomTypes.map((r) => (
                  <option key={r} value={r} className="bg-white">
                    {r}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Check In */}
            <div className="flex flex-col text-left px-3 border-l border-gold/30">
              <label htmlFor="hero-checkin" className="uppercase text-[9px] tracking-[0.25em] text-[#666666] mb-1">
                Check In
              </label>
              <input
                id="hero-checkin"
                type="date"
                className="bg-transparent text-[#1a1a1a] text-sm focus:outline-none w-full"
              />
            </div>
            
            {/* Check Out */}
            <div className="flex flex-col text-left px-3 border-l border-gold/30">
              <label htmlFor="hero-checkout" className="uppercase text-[9px] tracking-[0.25em] text-[#666666] mb-1">
                Check Out
              </label>
              <input
                id="hero-checkout"
                type="date"
                className="bg-transparent text-[#1a1a1a] text-sm focus:outline-none w-full"
              />
            </div>
            
            {/* Adults */}
            <div className="flex flex-col text-left px-3 border-l border-gold/30">
              <label htmlFor="hero-adults" className="uppercase text-[9px] tracking-[0.25em] text-[#666666] mb-1">
                Adults
              </label>
              <select
                id="hero-adults"
                value={adults}
                onChange={(e) => setAdults(e.target.value)}
                className="bg-transparent text-[#1a1a1a] text-sm focus:outline-none appearance-none"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n} className="bg-white">
                    {n}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Children */}
            <div className="flex flex-col text-left px-3 border-l border-gold/30">
              <label htmlFor="hero-children" className="uppercase text-[9px] tracking-[0.25em] text-[#666666] mb-1">
                Children
              </label>
              <select
                id="hero-children"
                value={children}
                onChange={(e) => setChildren(e.target.value)}
                className="bg-transparent text-[#1a1a1a] text-sm focus:outline-none appearance-none"
              >
                {[0, 1, 2, 3, 4].map((n) => (
                  <option key={n} value={n} className="bg-white">
                    {n}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Check Availability Button */}
            <div className="col-span-2 md:col-span-3 lg:col-span-1 flex justify-end px-2">
              <a 
                href="mailto:info@sovereigninnsuites.com?subject=Booking Inquiry&body=Room Type: King Room%0ACheck-in: %0ACheck-out: %0AAdults: 2%0AChildren: 0%0A%0APlease check availability for my requested dates."
                className="w-full lg:w-auto bg-primary-red hover:bg-primary-red/90 text-white text-[10px] uppercase tracking-[0.15em] font-semibold px-4 py-2.5 rounded-lg transition-colors duration-300 text-center"
              >
                Check Availability
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
        <span className="uppercase text-[9px] tracking-[0.3em] text-white/80">Scroll</span>
        <div className="w-px h-8 bg-linear-to-b from-white/80 to-transparent" />
      </div>
    </section>
  );
}
