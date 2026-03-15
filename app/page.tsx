import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Suites from "@/components/Suites";
import Experience from "@/components/Experience";
import Amenities from "@/components/Amenities";
import Testimonials from "@/components/Testimonials";
import ReservationCTA from "@/components/ReservationCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-white">
      <Navbar />
      <Hero />
      <About />
      <Suites />
      <Amenities />
      <Experience />
      <Testimonials />
      <ReservationCTA />
      <Footer />
    </main>
  );
}
