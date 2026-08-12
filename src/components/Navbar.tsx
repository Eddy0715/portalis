"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/", anchor: "#home" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/#portfolio", anchor: "#portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact", anchor: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const pathname = usePathname();

  const isHomepage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section detection only on homepage
      if (isHomepage) {
        const sections = ["home", "about", "gallery", "services", "portfolio", "contact"];
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage]);

  // Set active state based on pathname for subpages
  useEffect(() => {
    if (pathname === "/about") {
      setActiveSection("about");
    } else if (pathname.startsWith("/services")) {
      setActiveSection("services");
    } else if (pathname.startsWith("/blog")) {
      setActiveSection("blog");
    } else if (!isHomepage) {
      setActiveSection("");
    }
  }, [pathname, isHomepage]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setMobileMenuOpen(false);

    // On homepage, use smooth scroll for anchor links
    if (isHomepage && link.anchor) {
      e.preventDefault();
      const targetId = link.anchor.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
    // On subpages, let the Link component handle navigation
  };

  const getHref = (link: typeof navLinks[0]) => {
    if (isHomepage && link.anchor) {
      return link.anchor;
    }
    return link.href;
  };

  const isActive = (link: typeof navLinks[0]) => {
    if (isHomepage && link.anchor) {
      const anchorId = link.anchor.substring(1);
      return activeSection === anchorId;
    }
    if (link.href === "/about" && pathname === "/about") return true;
    if (link.href === "/" && pathname === "/") return true;
    if (link.href === "/blog" && pathname.startsWith("/blog")) return true;
    if (link.anchor === "#services" && pathname.startsWith("/services")) return true;
    return false;
  };

  const useTransparent = isHomepage && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          useTransparent
            ? "bg-transparent border-b border-transparent py-5"
            : "backdrop-blur-md border-b border-warm-gold/20 shadow-md py-3"
        }`}
        style={useTransparent ? {} : { backgroundColor: "rgba(31, 59, 52, 0.85)" }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo with stylized Arch SVG */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <svg
              className="w-8 h-8 transition-colors duration-300 text-warm-gold group-hover:text-white"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M6 20V10C6 6.68629 8.68629 4 12 4C15.3137 4 18 6.68629 18 10V20" strokeLinecap="round"/>
              <path d="M9 20V10C9 8.34315 10.3431 7 12 7C13.6569 7 15 8.34315 15 10V20" strokeLinecap="round"/>
              <path d="M12 20V13" strokeLinecap="round"/>
            </svg>
            <div className="flex flex-col">
              <span
                className="font-heading text-lg md:text-xl tracking-[0.25em] transition-colors duration-300 text-white group-hover:text-warm-gold"
              >
                PORTALIS
              </span>
              <span className="text-[8px] tracking-[0.38em] text-warm-gold font-normal uppercase">
                Interiors LLC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={getHref(link)}
                onClick={(e) => handleNavClick(e, link)}
                className={`text-[10px] uppercase tracking-[0.2em] font-medium transition-all duration-300 hover:text-warm-gold hover-underline pb-0.5 ${
                  isActive(link)
                    ? "text-warm-gold font-semibold border-b border-warm-gold"
                    : "text-white/95"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>



          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden transition-colors duration-300 focus:outline-none text-warm-gold hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer (moved outside header to prevent backdrop-filter containing block collapsing) */}
      <div
        className={`fixed inset-0 top-[65px] z-40 transition-all duration-500 ease-in-out md:hidden backdrop-blur-md border-t border-warm-gold/20 ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(31, 59, 52, 0.95)" }}
      >
        <div className="flex flex-col items-center justify-center h-[calc(100vh-150px)] space-y-8 px-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={getHref(link)}
              onClick={(e) => handleNavClick(e, link)}
              className={`text-base uppercase tracking-[0.2em] transition-colors duration-300 ${
                isActive(link)
                  ? "text-warm-gold font-semibold border-b border-warm-gold/30 pb-1"
                  : "text-white/95 hover:text-warm-gold"
              }`}
            >
              {link.name}
            </Link>
          ))}

        </div>
      </div>
    </>
  );
}
