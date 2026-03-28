"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import Carousel from "./Carousel";

const rooms = [
  {
    name: "King size room, 1 bed",
    description: "Comfortable king-size bed providing generous space for relaxation and a restful night's sleep. Ideal for couples, business travelers, or solo guests seeking extra comfort.",
    availability: "6 Available",
    images: ["from-stone-300 via-stone-400 to-stone-500", "from-stone-400 via-stone-500 to-stone-600", "from-amber-200 via-amber-300 to-amber-400"],
    features: ["King-size bed", "Complimentary WiFi", "Private bathroom", "Air conditioning"],
  },
  {
    name: "Detached Apartment",
    description: "Perfect for extended stays or guests seeking additional space. A home-away-from-home experience with added privacy and flexibility.",
    availability: "1 Available",
    images: ["from-stone-400 via-stone-500 to-stone-600", "from-slate-300 via-slate-400 to-slate-500", "from-orange-200 via-orange-300 to-orange-400"],
    features: ["King-size bedroom", "Open-plan living room", "Well-sized kitchen", "Private shower & toilet"],
  },
];

export default function Suites() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="rooms"
      ref={ref as RefObject<HTMLElement>}
      className={`py-28 bg-white transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <p className="uppercase text-[11px] tracking-[0.4em] text-primary-red mb-4 font-medium">
            Accommodation
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#1a1a1a] mb-4">
            Our Rooms &amp; Apartments
          </h2>
          <p className="text-[#666666] max-w-2xl mx-auto leading-relaxed">
            Sovereign Inn Suites features a select collection of well-appointed rooms designed 
            to provide comfort and tranquility. Each space is carefully arranged to ensure 
            guests enjoy a restful and enjoyable stay.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div key={room.name} id={room.name === "One-Bedroom Apartment" ? "apartments" : undefined} className="group flex flex-col bg-cream rounded-lg overflow-hidden shadow-lg">
              <Carousel images={room.images} />
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full z-20">
                <span className="uppercase text-[9px] tracking-[0.2em] text-primary-red font-medium">
                  {room.availability}
                </span>
              </div>

              <div className="flex-1 flex flex-col p-6 pt-8">
                <h3 className="font-playfair text-2xl font-medium text-[#1a1a1a] mb-2">
                  {room.name}
                </h3>
                <div className="w-10 h-px bg-gold my-3" />
                <p className="text-[#666666] text-sm leading-relaxed mb-5">
                  {room.description}
                </p>
                
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {room.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                      <span className="text-[#666666] text-xs">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gold/20">
                  <a
                    href="mailto:info@sovereigninnsuites.com?subject=Booking Inquiry - Room&body=I am interested in booking a room at Sovereign Inn Suites.%0A%0ARoom Type: %0ACheck-in Date: %0ACheck-out Date: %0ANumber of Guests: %0A%0APlease let me know availability and rates."
                    className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] text-primary-red hover:opacity-70 transition-opacity duration-300 font-medium gap-2"
                  >
                    Book This Room
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#666666] text-sm">
            Guests benefit from complimentary WiFi, ample parking, and access to our large breakfast room and open outdoor spaces.
          </p>
        </div>
      </div>
    </section>
  );
}
