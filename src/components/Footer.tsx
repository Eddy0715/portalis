"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const quickLinks = [
  { name: "Home", href: "/#home", isAnchor: true, targetId: "home" },
  { name: "About", href: "/about", isAnchor: false },
  { name: "Services", href: "/services", isAnchor: false },
  { name: "Portfolio", href: "/#portfolio", isAnchor: true, targetId: "portfolio" },
  { name: "Blog", href: "/blog", isAnchor: false },
  { name: "Contact", href: "/#contact", isAnchor: true, targetId: "contact" },
];

export default function Footer() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  return (
    <footer className="bg-forest-green text-white border-t border-warm-gold/20 py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        
        {/* Column 1: Logo and Tagline (Spans 4 columns) */}
        <div className="md:col-span-4 flex flex-col space-y-6">
          <div className="flex items-center gap-3">
            <svg className="w-10 h-10 text-warm-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 20V10C6 6.68629 8.68629 4 12 4C15.3137 4 18 6.68629 18 10V20" strokeLinecap="round"/>
              <path d="M9 20V10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10V20" strokeLinecap="round"/>
              <path d="M12 20V13" strokeLinecap="round"/>
            </svg>
            <div className="flex flex-col">
              <span className="font-heading text-2xl tracking-[0.25em] text-white">
                PORTALIS
              </span>
              <span className="text-[10px] tracking-[0.38em] text-warm-gold font-normal uppercase">
                Interiors LLC
              </span>
            </div>
          </div>
          <div className="space-y-2 text-white text-xs font-normal leading-relaxed max-w-xs">
            <p>Designing spaces that inspire, elevate, and reflect who you are.</p>
            <p className="text-warm-gold font-medium uppercase tracking-widest text-[10px] pt-1">
              Thoughtfully created. Beautifully executed.
            </p>
          </div>
        </div>

        {/* Column 2: Quick Links (Spans 2 columns) */}
        <div className="md:col-span-2">
          <h4 className="text-warm-gold text-[11px] uppercase tracking-[0.25em] font-semibold mb-6 pb-2 border-b border-white/10">
            Quick Links
          </h4>
          <ul className="space-y-3">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={isHomepage && link.isAnchor && link.targetId ? `#${link.targetId}` : link.href}
                  onClick={(e) => {
                    if (isHomepage && link.isAnchor && link.targetId) {
                      e.preventDefault();
                      const targetElement = document.getElementById(link.targetId);
                      if (targetElement) {
                        targetElement.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  className="text-white/85 hover:text-warm-gold text-xs font-normal transition-colors duration-300 hover-underline"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services (Spans 3 columns) */}
        <div className="md:col-span-3">
          <h4 className="text-warm-gold text-[11px] uppercase tracking-[0.25em] font-semibold mb-6 pb-2 border-b border-white/10">
            Services
          </h4>
          <ul className="space-y-2">
            {[
              "Design Development",
              "Turnkey Projects",
              "Corporate Interiors",
              "MEP Systems",
              "F&B & Hospitality Fit-Outs",
              "Retail & Wellness / Healthcare",
              "Joinery Services",
              "Approvals & Compliance",
            ].map((service) => (
              <li key={service}>
                <span className="text-white/85 text-[11px] font-normal hover:text-warm-gold transition-colors duration-300 cursor-default">
                  {service}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Follow Us & Copyright (Spans 3 columns) */}
        <div className="md:col-span-3 flex flex-col justify-between h-full space-y-8">
          <div>
            <h4 className="text-warm-gold text-[11px] uppercase tracking-[0.25em] font-semibold mb-6 pb-2 border-b border-white/10">
              Follow Us
            </h4>
            <div className="flex space-x-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/portalis.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 hover:text-warm-gold transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              {/* Pinterest */}
              <a
                href="https://pin.it/3IM5D2G4F"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 hover:text-warm-gold transition-all duration-300"
                aria-label="Pinterest"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.627 0-12 5.373-12 12 0 5.077 3.143 9.416 7.578 11.17-.105-.949-.2-2.405.042-3.441.218-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.993 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.162 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.27 1.029-1.002 2.319-1.492 3.118 1.124.347 2.317.535 3.553.535 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61591353571001"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 hover:text-warm-gold transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3 0-4 2-4 4v3z"/>
                </svg>
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/85 hover:text-warm-gold transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="text-white/70 text-[10px] tracking-[0.18em] uppercase font-normal pt-8">
            © 2024 Portalis Interiors LLC.<br />All Rights Reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
