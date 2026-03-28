"use client";

import { useState } from "react";
import type { RefObject } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const inquiryTypes = [
  "General Inquiry",
  "Booking Request",
  "Event Hosting",
  "Feedback",
  "Partnership",
  "Other",
];

export default function ContactForm() {
  const { ref: sectionRef, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiryType: "General Inquiry",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = formData.subject || `Inquiry: ${formData.inquiryType}`;
    const body = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Inquiry Type: ${formData.inquiryType}

Message:
${formData.message}

---
Sent from Sovereign Inn Suites website`;

    window.location.href = `mailto:info@sovereigninnsuites.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const inputClass = "w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-sm text-[#1a1a1a] focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors duration-300";
  const labelClass = "block text-[11px] uppercase tracking-[0.2em] text-[#666666] mb-2 font-medium";

  return (
    <section
      ref={sectionRef as RefObject<HTMLElement>}
      className={`py-24 bg-cream transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="max-w-2xl mx-auto px-8">
        <div className="text-center mb-12">
          <p className="uppercase text-[11px] tracking-[0.4em] text-primary-red mb-4 font-medium">
            Get in Touch
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl font-medium text-[#1a1a1a] mb-4">
            Contact Us
          </h2>
          <p className="text-[#666666] leading-relaxed">
            Have a question or want to make an inquiry? Fill out the form below 
            and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className={labelClass}>Your Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className={labelClass}>Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
                placeholder="+233 XX XXX XXXX"
              />
            </div>
            <div>
              <label htmlFor="inquiryType" className={labelClass}>Inquiry Type</label>
              <select
                id="inquiryType"
                name="inquiryType"
                value={formData.inquiryType}
                onChange={handleChange}
                className={inputClass}
              >
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="subject" className={labelClass}>Subject</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className={inputClass}
              placeholder="How can we help you?"
            />
          </div>

          <div>
            <label htmlFor="message" className={labelClass}>Your Message</label>
            <textarea
              id="message"
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              rows={5}
              className={inputClass}
              placeholder="Tell us more about your inquiry..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-red hover:bg-primary-red/90 text-white text-[12px] uppercase tracking-[0.25em] font-semibold px-10 py-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Send Message
          </button>

          <p className="text-center text-[#999999] text-xs">
            Your email client will open with your message ready to send
          </p>
        </form>

        <div className="mt-16 pt-12 border-t border-gold/30">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src="/images/koforidua/sis_business_card.jpeg"
                alt="Sovereign Inn Suites Business Card"
                className="w-full h-auto"
              />
            </div>
            <p className="text-center text-[#999999] text-xs mt-4">
              You can also reach us via the contact details on our business card
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
