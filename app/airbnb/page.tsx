import type { Metadata } from "next";
import AirbnbContent from "@/components/AirbnbContent";
import Navbar from "@/components/Navbar";
import AccraFooter from "@/components/AccraFooter";

export const metadata: Metadata = {
  title: "Accra Apartments | Sovereign Inn Suites",
  description:
    "Book our beautifully furnished apartments in Accra, Ghana via Airbnb. Perfect for short and extended stays with all the comforts of home.",
};

export default function AirbnbPage() {
  return (
    <main className="bg-white">
      <Navbar />
      <AirbnbContent />
      <AccraFooter />
    </main>
  );
}
