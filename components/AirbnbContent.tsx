"use client";

import { useState } from "react";
import Carousel from "./Carousel";

const galleryImages = [
  "/images/accra/sis_accra_estate_gate.jpeg",
  "/images/accra/sis_accra_entrance.jpeg",
  "/images/accra/sis_accra_upclose_entrance.jpeg",
  "/images/accra/sis_accra_livingroom.jpeg",
  "/images/accra/sis_accra_livingroom2.jpeg",
  "/images/accra/sis_accra_kitchen.jpeg",
  "/images/accra/sis_accra_dining.jpeg",
  "/images/accra/sis_accra_dining2.jpeg",
  "/images/accra/sis_accra_bedroom.jpeg",
  "/images/accra/sis_accra_bedroom2.jpeg",
  "/images/accra/sis_accra_bedroom3.jpeg",
  "/images/accra/sis_accra_bedroom4.jpeg",
  "/images/accra/sis_accra_shower.jpeg",
  "/images/accra/sis_accra_shower2.jpeg",
  "/images/accra/sis_accra_toilet.jpeg",
  "/images/accra/sis_accra_telephone_shower.jpeg",
];

const apartment = {
   name: "Modern configurable 1-5 bedroom apartments with up to 10 guests",
   description: "Sovereign Inn Suites Accra offers modern 1, 2, and 3-bedroom en-suite apartments located in a quiet and secure gated community in East Airport.",
   guests: "Various configurations available",
   features: ["Spacious king-size bedrooms with private en-suite bathrooms", "Fully air-conditioned apartments", "Large modern kitchen fully equipped with appliances and utensils", "Bright, spacious living areas", "24/7 security surveillance in a gated community", "Perfect for individuals, families, business travelers, or long stays"],
};

const AIRBNB_LISTING_URL = "https://www.airbnb.com";

export default function AirbnbContent() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <>
      <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-linear-to-br from-stone-500 via-stone-600 to-stone-700">
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-black/20" />
        </div>

        <div className="relative z-10 text-center px-8 max-w-[1280px] mx-auto w-full">
           <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-6 font-medium">
             Accra, Ghana
           </p>
           <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium tracking-wide text-white mb-6 leading-[1.1]">
             Sovereign Inn Suites Accra
           </h1>
            <p className="text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed text-base md:text-lg">
              Looking for a comfortable and secure place to stay in Accra for your short and medium term needs? Sovereign Inn Suites Accra offers modern 1-5 bedroom (configurable) en-suite apartments located in a quiet and secure gated community in East Airport.
            </p>
           <a
            href={AIRBNB_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 text-white text-[11px] uppercase tracking-[0.25em] font-medium px-8 py-3.5 transition-all duration-300 gap-2 rounded-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.703c-.263.678-.793 1.167-1.478 1.366-.263.076-.54.114-.822.114-.397 0-.81-.084-1.23-.255-1.086-.44-2.067-1.322-2.836-2.548-.167-.267-.32-.54-.46-.818-.14.278-.293.551-.46.818-.77 1.226-1.75 2.108-2.836 2.548-.42.17-.833.255-1.23.255-.282 0-.56-.038-.822-.114-.686-.2-1.216-.688-1.478-1.366-.27-.693-.27-1.5 0-2.33.397-1.216 1.26-2.428 2.433-3.412 1.005-.843 2.17-1.478 3.393-1.843V7.5c0-.414.336-.75.75-.75s.75.336.75.75v2.618c1.223.365 2.388 1 3.393 1.843 1.173.984 2.036 2.196 2.433 3.412.27.83.27 1.637 0 2.33z"/>
            </svg>
            Book on Airbnb
          </a>
        </div>
      </section>

      <section className="py-20 bg-cream">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="w-full aspect-[4/3] rounded-lg shadow-2xl overflow-hidden">
                <img
                  src="/images/accra/sis_accra_entrance.jpeg"
                  alt="Sovereign Inn Suites Accra Entrance"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/40 -z-10" />
            </div>

            <div>
              <p className="uppercase text-[11px] tracking-[0.4em] text-primary-red mb-5 font-medium">
                About Our Accra Property
              </p>
              <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#1a1a1a] mb-3 leading-tight">
                Your Home in
                <br />
                Ghana&apos;s Capital
              </h2>
              <div className="w-12 h-px bg-gold mb-8" />
               <p className="text-[#666666] leading-relaxed mb-6">
                 📍 Prime Location
                 <br />
                 Only 8 minutes from Accra International Airport on clear day.
                 <br />
                 2–5 minutes drive to Melcom Mall, China Mall, Accra Mall, Accra Palace Mall and several great restaurants
               </p>
               <p className="text-[#666666] leading-relaxed mb-8">
                 🏡 Apartment Features
                 <br />
                 Spacious king-size bedrooms with private en-suite bathrooms
                 <br />
                 Fully air-conditioned apartments
                 <br />
                 Large modern kitchen fully equipped with appliances and utensils
                 <br />
                 Bright, spacious living areas
                 <br />
                 24/7 security surveillance in a gated community
                 <br />
                 Perfect for individuals, families, business travelers, or long stays.
               </p>
               
              <div className="grid grid-cols-2 gap-4">
                {["Self Check-in", "Free WiFi", "Full Kitchen", "Air Conditioning", "Free Parking", "24/7 Support"].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-[#666666] text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[800px] mx-auto px-8">
          <div className="text-center mb-12">
            <p className="uppercase text-[11px] tracking-[0.4em] text-primary-red mb-4 font-medium">
              Available Unit
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#1a1a1a]">
              Our Apartment
            </h2>
          </div>

          <div className="bg-cream rounded-lg overflow-hidden shadow-lg">
            <Carousel images={galleryImages} aspectRatio="aspect-[16/9]" />
            
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full z-20">
              <span className="uppercase text-[9px] tracking-[0.2em] text-primary-red font-medium">
                {apartment.guests}
              </span>
            </div>

            <div className="p-8">
              <h3 className="font-playfair text-2xl font-medium text-[#1a1a1a] mb-2">
                {apartment.name}
              </h3>
              <div className="w-10 h-px bg-gold my-4" />
              <p className="text-[#666666] text-sm leading-relaxed mb-6">
                {apartment.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                {apartment.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0" />
                    <span className="text-[#666666] text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <a
                href={AIRBNB_LISTING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#FF5A5F] hover:bg-[#FF5A5F]/90 text-white text-[12px] uppercase tracking-[0.15em] font-medium px-8 py-4 transition-all duration-300 gap-2 rounded-lg w-full justify-center"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.703c-.263.678-.793 1.167-1.478 1.366-.263.076-.54.114-.822.114-.397 0-.81-.084-1.23-.255-1.086-.44-2.067-1.322-2.836-2.548-.167-.267-.32-.54-.46-.818-.14.278-.293.551-.46.818-.77 1.226-1.75 2.108-2.836 2.548-.42.17-.833.255-1.23.255-.282 0-.56-.038-.822-.114-.686-.2-1.216-.688-1.478-1.366-.27-.693-.27-1.5 0-2.33.397-1.216 1.26-2.428 2.433-3.412 1.005-.843 2.17-1.478 3.393-1.843V7.5c0-.414.336-.75.75-.75s.75.336.75.75v2.618c1.223.365 2.388 1 3.393 1.843 1.173.984 2.036 2.196 2.433 3.412.27.83.27 1.637 0 2.33z"/>
                </svg>
                Book on Airbnb
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-warm-bg">
        <div className="max-w-[1280px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="uppercase text-[11px] tracking-[0.4em] text-primary-red mb-4 font-medium">
              Gallery
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#1a1a1a] mb-4">
              Explore the Space
            </h2>
            <p className="text-[#666666] max-w-xl mx-auto leading-relaxed">
              Take a visual tour of our Accra apartments and see what awaits you.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Carousel images={galleryImages} aspectRatio="aspect-[16/10]" />
          </div>

          <div className="mt-6 text-center">
            <p className="text-[#999999] text-xs italic">
              Photo gallery placeholder - actual property photos coming soon
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary-red">
        <div className="max-w-[1280px] mx-auto px-8 text-center">
          <p className="uppercase text-[11px] tracking-[0.4em] text-gold mb-5 font-medium">
            Ready to Book?
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-medium text-white mb-5 leading-tight">
            Reserve Your Stay in Accra
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-8 leading-relaxed">
            Book directly through Airbnb for a seamless reservation experience. 
            View availability, pricing, and guest reviews all in one place.
          </p>

          <a
            href={AIRBNB_LISTING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-white hover:bg-white/90 text-[#FF5A5F] text-[12px] uppercase tracking-[0.25em] font-semibold px-10 py-4 transition-colors duration-300 gap-2 rounded-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 17.703c-.263.678-.793 1.167-1.478 1.366-.263.076-.54.114-.822.114-.397 0-.81-.084-1.23-.255-1.086-.44-2.067-1.322-2.836-2.548-.167-.267-.32-.54-.46-.818-.14.278-.293.551-.46.818-.77 1.226-1.75 2.108-2.836 2.548-.42.17-.833.255-1.23.255-.282 0-.56-.038-.822-.114-.686-.2-1.216-.688-1.478-1.366-.27-.693-.27-1.5 0-2.33.397-1.216 1.26-2.428 2.433-3.412 1.005-.843 2.17-1.478 3.393-1.843V7.5c0-.414.336-.75.75-.75s.75.336.75.75v2.618c1.223.365 2.388 1 3.393 1.843 1.173.984 2.036 2.196 2.433 3.412.27.83.27 1.637 0 2.33z"/>
            </svg>
            Book on Airbnb
          </a>

           <p className="text-white/70 text-sm mt-6">
             Questions? Contact us at{" "}
             <a href="mailto:info@sovereigninnsuites.com" className="text-gold hover:underline">
               info@sovereigninnsuites.com
             </a>
           </p>
         </div>
       </section>

       {/* Location Map Section */}
       <section className="py-20 bg-warm-bg">
         <div className="max-w-[1280px] mx-auto px-8">
           <div className="text-center mb-16">
             <p className="uppercase text-[11px] tracking-[0.4em] text-primary-red mb-4 font-medium">
               Location
             </p>
             <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#1a1a1a] mb-4">
               Our Location in Accra
             </h2>
           </div>
           
           <div className="max-w-[500px] mx-auto">
             <img
               src="/images/accra/sis_accra_aprox_loc.jpeg"
               alt="Approximate Location of Sovereign Inn Suites Accra"
               className="rounded-lg shadow-lg"
             />
             <p className="mt-4 text-[#666666] text-sm text-center">
               Located in East Airport, Accra near Spintex Road on Mahogany Avenue
             </p>
           </div>
         </div>
       </section>

       <section className="py-10 bg-cream border-t border-gold/20">
         <div className="max-w-[1280px] mx-auto px-8 text-center">
           <a
             href="/"
             className="inline-flex items-center text-[11px] uppercase tracking-[0.2em] text-primary-red hover:opacity-70 transition-opacity duration-300 font-medium gap-2"
           >
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
             Back to Sovereign Inn Suites (Koforidua)
           </a>
         </div>
       </section>
    </>
  );
}
