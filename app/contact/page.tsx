import ContactForm from "@/components/ContactForm";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Contact Us | Sovereign Inn Suites",
  description: "Get in touch with Sovereign Inn Suites. Contact us for bookings, events, or general inquiries.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-20">
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
