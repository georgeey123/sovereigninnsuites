const footerColumns = [
  {
    heading: "Koforidua",
    links: [
      { label: "King Rooms", href: "/#rooms" },
      { label: "One-Bedroom Apartment", href: "/#apartments" },
      { label: "Check Availability", href: "/#reserve" },
    ],
  },
  {
    heading: "Accra",
    links: [
      { label: "Accra Apartments", href: "/airbnb" },
      { label: "Book on Airbnb", href: "/airbnb" },
    ],
  },
  {
    heading: "Hotel",
    links: [
      { label: "About Us", href: "/#about" },
      { label: "Amenities", href: "/#amenities" },
      { label: "Gallery", href: "/#gallery" },
    ],
  },
  {
    heading: "Contact",
    links: [
      { label: "Reservations", href: "/#reserve" },
      { label: "General Enquiries", href: "mailto:info@sovereigninnsuites.com" },
    ],
  },
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-cream border-t border-gold/30">
      {/* Main columns */}
      <div className="max-w-[1280px] mx-auto px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <p className="uppercase text-[10px] tracking-[0.35em] text-primary-red mb-5 font-medium">
                {col.heading}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#666666] hover:text-primary-red transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Location & Contact */}
        <div className="mt-16 pt-10 border-t border-gold/20 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="font-playfair text-xl font-medium tracking-[0.15em] text-primary-red uppercase">
              Sovereign Inn
            </span>
            <span className="block uppercase text-[8px] tracking-[0.4em] text-gold mt-0.5">
              Suites
            </span>
            <p className="text-[#666666] text-sm mt-4 leading-relaxed">
              Junction 8, Osabene<br />
              Koforidua, Eastern Region<br />
              Ghana
            </p>
          </div>
          <div className="md:text-right">
            <p className="text-xs text-[#666666] italic font-playfair mb-4">
              &ldquo;Comfort, Privacy &amp; Convenience&rdquo;
            </p>
            <p className="text-sm text-[#666666]">
              <span className="text-primary-red">Email:</span>{" "}
              <a href="mailto:info@sovereigninnsuites.com" className="hover:text-primary-red transition-colors">
                info@sovereigninnsuites.com
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gold/20 py-5">
        <div className="max-w-[1280px] mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#666666]">
            © 2025 Sovereign Inn Suites. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[11px] text-[#666666] hover:text-primary-red transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-[11px] text-[#666666] hover:text-primary-red transition-colors duration-300">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
