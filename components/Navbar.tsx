"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Rooms & Apartments", href: "/#rooms" },
   { label: "Accra Apartments", href: "/airbnb" },
  { label: "Amenities", href: "/#amenities" },
  { label: "About Us", href: "/#about" },
  { label: "Events", href: "/events" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const isInnerPage = pathname === "/contact" || pathname === "/events";
  const isDarkPage = pathname === "/" || pathname === "/airbnb";
  const showLightNavbar = scrolled || isInnerPage;
  const showWhiteText = isDarkPage && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showLightNavbar || !isDarkPage
          ? "bg-white/95 backdrop-blur-md border-b border-gold/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-8 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" className="flex flex-col leading-none">
          <span className={`font-playfair text-lg font-medium tracking-[0.15em] uppercase ${showLightNavbar || !isDarkPage ? "text-primary-red" : "text-white"}`}
              style={{ color: showWhiteText ? "#ffffff" : undefined }}>
            Sovereign Inn
          </span>
          <span className="uppercase text-[8px] tracking-[0.4em] text-gold font-medium mt-0.5">
            Suites
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-[11px] uppercase tracking-[0.15em] transition-colors duration-300 ${showLightNavbar || !isDarkPage ? "text-[#666666]" : "text-white"} hover:text-primary-red`}
              style={{ color: showWhiteText ? "#ffffff" : undefined }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Reserve Button + Mobile Toggle */}
        <div className="flex items-center gap-4">
          <a
            href="/#reserve"
            className={`hidden lg:inline-flex items-center border text-[11px] uppercase tracking-[0.2em] font-medium px-5 py-2 transition-all duration-300 ${
              showLightNavbar || !isDarkPage
                ? "border-primary-red text-primary-red hover:bg-primary-red hover:text-white"
                : "border-gold text-gold hover:bg-gold hover:text-white"
            }`}
          >
            Book Now
          </a>
          <button
            className={`lg:hidden p-2 ${showLightNavbar || !isDarkPage ? "text-[#666666]" : "text-white"}`}
            style={{ color: showWhiteText ? "#ffffff" : undefined }}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="lg:hidden bg-white/98 border-t border-gold/20 px-8 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-[11px] uppercase tracking-[0.2em] text-[#666666] hover:text-primary-red transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#reserve"
            onClick={() => setMenuOpen(false)}
            className="inline-flex items-center border border-primary-red text-primary-red text-[11px] uppercase tracking-[0.2em] font-medium px-5 py-2.5 w-fit transition-all duration-300 hover:bg-primary-red hover:text-white"
          >
            Book Now
          </a>
        </nav>
      )}
    </header>
  );
}
