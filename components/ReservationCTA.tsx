"use client";

import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ReservationCTA() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      id="reserve"
      ref={ref as RefObject<HTMLElement>}
      className={`py-28 bg-primary-red transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8 text-center">
        <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-5 font-medium">
          Reservations
        </p>
        <h2 className="font-playfair text-4xl md:text-5xl font-medium text-white mb-5 leading-tight">
          Book Your Stay
        </h2>
        <p className="text-white/80 max-w-lg mx-auto mb-6 leading-relaxed">
          Reservations can be made by contacting Sovereign Inn Suites directly. 
          For booking inquiries, availability, and rates, please reach out via email.
        </p>
        <p className="text-white/70 text-sm mb-8">
          For a seamless experience, early booking is recommended, especially during peak travel periods.
        </p>
        
        {/* Thin gold divider */}
        <div className="w-16 h-px bg-gold/60 mx-auto mb-10" />
        
        <a
          href="mailto:info@sovereigninnsuites.com?subject=Booking Inquiry&body=Hello,%0A%0AI would like to make a reservation at Sovereign Inn Suites.%0A%0ARoom Type: %0ACheck-in Date: %0ACheck-out Date: %0ANumber of Adults: %0ANumber of Children: %0A%0APlease let me know availability and rates.%0A%0AThank you."
          className="inline-flex items-center bg-gold hover:bg-gold-dark text-white text-[12px] uppercase tracking-[0.25em] font-semibold px-10 py-4 transition-colors duration-300 gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Book via Email
        </a>
        
        <p className="text-white/90 text-sm mt-8">
          <span className="text-gold">Email:</span> info@sovereigninnsuites.com
        </p>

        {/* Check-in/out info */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/70 text-xs uppercase tracking-[0.2em] mb-2">
            Check-in / Check-out
          </p>
          <p className="text-white/80 text-sm">
            Flexible check-in and check-out times can be arranged to suit your convenience. 
            Please contact us directly prior to arrival for special requests.
          </p>
        </div>
      </div>
    </section>
  );
}
