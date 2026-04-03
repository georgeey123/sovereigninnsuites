import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Carousel from "@/components/Carousel";

export const metadata = {
  title: "Events | Sovereign Inn Suites",
  description: "Upcoming events at Sovereign Inn Suites - Hosting celebrations, conferences, and more.",
};

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-cream">
      <Navbar />
      <div className="pt-20 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="text-center px-8">
          <h1 className="font-playfair text-4xl md:text-5xl font-medium text-[#1a1a1a] mb-6">
            Events at Sovereign Inn Suites
          </h1>
          <div className="w-20 h-px bg-gold mx-auto mb-8" />
          
          <div className="max-w-4xl mb-12">
            <p className="text-[#666666] text-lg leading-relaxed mb-6">
              Sovereign Inn Suites offers exceptional event spaces for weddings, conferences, celebrations, and corporate gatherings. 
              Our versatile indoor and outdoor venues can accommodate intimate gatherings or larger events with ease.
            </p>
            <p className="text-[#666666] text-lg leading-relaxed mb-6">
              From elegant wedding receptions to productive business conferences, our experienced team ensures every detail 
              is handled with precision and care, creating memorable experiences for you and your guests.
            </p>
          </div>
          
          <div className="mb-10">
            <video 
              width="100%" 
              max-w-none 
              height-auto
              controls 
              className="rounded-lg shadow-lg"
              style={{ maxHeight: '80vh', objectFit: 'contain' }}
            >
              <source src="/videos/koforidua/sis_event.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          
          <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#1a1a1a] mb-4">
            Our Event Space
          </h2>
          
          <div className="max-w-4xl mb-12">
            <Carousel 
              images={[
                "/images/koforidua/event/sis_event_compound.jpeg",
                "/images/koforidua/event/sis_event_pagola.jpeg", 
                "/images/koforidua/event/sis_conference.jpeg",
                "/images/koforidua/event/sis_eatery.jpeg"
              ]} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}