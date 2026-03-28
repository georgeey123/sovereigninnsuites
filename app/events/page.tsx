import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gold/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="font-playfair text-4xl md:text-5xl font-medium text-[#1a1a1a] mb-4">
            Under Construction
          </h1>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-[#666666] text-lg max-w-md mx-auto mb-8 leading-relaxed">
            We are working on bringing you exciting event packages. 
            From weddings to conferences, Sovereign Inn Suites will be the perfect venue for your special occasions.
          </p>
          <p className="text-[#999999] text-sm">
            Stay tuned for updates!
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
