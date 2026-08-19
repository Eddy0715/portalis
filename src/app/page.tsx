"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, MapPin, Phone, Mail, Clock, Trophy, Shield, Award, Sparkles, Building2, Lightbulb, Users, PenTool, ShieldCheck, Leaf, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import ContactForm from "@/components/ContactForm";

// Portfolio projects mapping from PORTALIS .pdf catalog (Pages 13-16)
const portfolioProjects = [
  {
    id: 1,
    title: "Lunico (La Mer)",
    category: "Hospitality",
    src: "/assets/extracted_img_p20_1_182.jpeg",
    desc: "Luxury restobar interior fit-out balancing immersive lighting and premium textures.",
  },
  {
    id: 2,
    title: "Lekki (Jumeirah)",
    category: "Hospitality",
    src: "/assets/extracted_img_p23_1_203.jpeg",
    desc: "Upscale dining and nightlife venue featuring bespoke metal work and joinery.",
  },
  {
    id: 3,
    title: "Daikan (Citywalk)",
    category: "Hospitality",
    src: "/assets/extracted_img_p13_3_924.jpeg",
    desc: "Industrial-chic ramen bistro combining concrete finishes and timber detailing.",
  },
  {
    id: 4,
    title: "Nox (Citywalk)",
    category: "Hospitality",
    src: "/assets/extracted_img_p15_4_986.jpeg",
    desc: "Premium cocktail lounge with mood lighting and custom velvet seating layouts.",
  },
  {
    id: 5,
    title: "Chili's (CCAZ)",
    category: "Hospitality",
    src: "/assets/extracted_img_p12_1_126.jpeg",
    desc: "Turnkey fit-out of the casual dining restaurant chain in Dubai.",
  },
  {
    id: 6,
    title: "Indi16 (Business Bay)",
    category: "Hospitality",
    src: "/assets/extracted_img_p14_6_965.jpeg",
    desc: "Vibrant high-traffic rooftop restobar with custom gold displays and layouts.",
  },
  {
    id: 7,
    title: "La Brioche (Khabisi)",
    category: "Hospitality",
    src: "/assets/extracted_img_p16_3_1010.jpeg",
    desc: "French country-style bakery and cafe fit-out with bespoke furnishings.",
  },
  {
    id: 8,
    title: "Wave (Dibba)",
    category: "Hospitality",
    src: "/assets/extracted_img_p16_6_1019.jpeg",
    desc: "Scenic seaside cafe and lounge with biophilic elements and glass works.",
  },
  {
    id: 9,
    title: "Schneider Electric (DSO)",
    category: "Commercial",
    src: "/assets/extracted_img_p7_1_375.jpeg",
    desc: "Modern corporate headquarters optimization with high-spec MEP engineering.",
  },
  {
    id: 10,
    title: "Future Food Office",
    category: "Commercial",
    src: "/assets/extracted_img_p41_1_379.jpeg",
    desc: "Innovative, productivity-driven corporate workspace with clean office layouts.",
  },
];

// The 8 services from PORTALIS .pdf Page 4 grid layout
const services = [
  {
    id: "design-development",
    title: "Design Development",
    image: "/assets/extracted_img_p4_1_336.jpeg",
  },
  {
    id: "turnkey-projects",
    title: "Turnkey Projects",
    image: "/assets/extracted_img_p4_3_338.jpeg",
  },
  {
    id: "corporate-interiors",
    title: "Corporate Interiors",
    image: "/assets/extracted_img_p4_4_339.jpeg",
  },
  {
    id: "mep-systems",
    title: "MEP Systems",
    image: "/assets/extracted_img_p4_5_340.jpeg",
  },
  {
    id: "fb-hospitality",
    title: "F&B & Hospitality Fit-Outs",
    image: "/assets/extracted_img_p4_6_341.jpeg",
  },
  {
    id: "retail-wellness",
    title: "Retail & Wellness Healthcare",
    image: "/assets/extracted_img_p4_7_342.jpeg",
  },
  {
    id: "joinery-services",
    title: "Joinery Services",
    image: "/assets/extracted_img_p4_8_344.jpeg",
  },
  {
    id: "approvals-compliance",
    title: "Approvals & Compliance",
    image: "/assets/extracted_img_p4_9_345.png",
  },
];



// Core Values from PORTALIS .pdf (Page 3)
const coreValues = [
  {
    icon: Award,
    title: "Elite Craftsmanship & Quality",
    desc: "Exceptional workmanship and unwavering adherence to the highest standards, utilizing premium-quality materials.",
  },
  {
    icon: Building2,
    title: "Client-Centric Partnership",
    desc: "Viewing our clients as true partners, working closely to deliver tailored solutions that align with their vision.",
  },
  {
    icon: Trophy,
    title: "Record-Breaking Innovation",
    desc: "Constantly pushing the boundaries of what is possible.",
  },
  {
    icon: Shield,
    title: "Integrity in Commitments",
    desc: "Consistently honoring our budget and timeline commitments to deliver absolute peace of mind.",
  },
  {
    icon: Sparkles,
    title: "End-to-End Excellence",
    desc: "Owning the entire project lifecycle seamlessly from the initial concept design to final authority clearances.",
  },
  {
    icon: Lightbulb,
    title: "Environmental Stewardship",
    desc: "Prioritizing sustainable methods, materials, and processes to create responsible and beautiful environments.",
  },
];

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.log("Autoplay failed:", err);
      });
    }
  }, []);

  useEffect(() => {
    if (activeCategory === "All Projects") {
      setFilteredProjects(portfolioProjects);
    } else {
      setFilteredProjects(
        portfolioProjects.filter((project) => project.category === activeCategory)
      );
    }
  }, [activeCategory]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleNextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const handlePrevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  return (
    <>
      <Navbar />

      <main className="flex-1 w-full bg-light-cream">
        
        {/* SECTION 1: HERO COVER (PDF Page 1/3 - WITH BACKGROUND VIDEO) */}
        <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden py-16">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full z-0">
            <video 
              ref={videoRef}
              autoPlay 
              loop 
              muted 
              playsInline 
              className="object-cover w-full h-full"
            >
              <source src="/assets/hero_bg.mp4" type="video/mp4" />
            </video>
            {/* Dark green overlay to unify with the color palette */}
            <div className="absolute inset-0 bg-forest-green/45 backdrop-blur-[1px] mix-blend-multiply" />
            <div className="absolute inset-0 bg-black/35" />
          </div>

          <div className="relative z-10 px-6 md:px-12 max-w-7xl mx-auto w-full flex flex-col space-y-4">
            <span className="text-warm-gold text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold">
              LUXURY INTERIOR DESIGN . FIT-OUT . JOINERY
            </span>
            <div className="h-[1px] w-12 bg-warm-gold/60 mt-1 mb-4" />
            
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl leading-[1.08] text-white">
              Timeless Spaces,<br />
              Designed for <span className="text-warm-gold italic font-normal">Life.</span>
            </h1>
            
            <p className="text-white/95 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed pt-4">
              We create refined residential, commercial, and hospitality interiors that blend elegance, functionality, and timeless craftsmanship.
            </p>
            
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 pt-8">
              <a
                href="#portfolio"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="bg-warm-gold hover:bg-white text-forest-green text-xs uppercase tracking-[0.2em] py-4 px-8 text-center transition-all duration-300 font-semibold shadow-sm"
              >
                EXPLORE PROJECTS
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group flex items-center justify-center sm:justify-start gap-2 text-white/95 hover:text-warm-gold text-xs uppercase tracking-[0.2em] py-4 font-semibold transition-all duration-300"
              >
                VIEW OUR PROCESS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-white/95 group-hover:text-warm-gold" />
              </a>
            </div>
          </div>
        </section>

        {/* OUR APPROACH SUBSECTION (PDF Page 3) */}
        <section className="bg-light-cream py-16 px-6 md:px-12 border-t border-b border-forest-green/10">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="text-warm-gold text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
              OUR APPROACH
            </span>
            <div className="h-[1px] w-8 bg-warm-gold/60 mb-6" />
            <h2 className="font-heading text-2xl sm:text-4xl text-forest-green leading-snug max-w-2xl">
              Thoughtful Design. Meaningful Spaces.
            </h2>
            <p className="text-charcoal-black text-xs sm:text-sm font-normal leading-relaxed max-w-xl mt-4">
              We blend creativity, functionality, and craftsmanship to deliver interiors that are as beautiful as they are livable.
            </p>
          </div>
        </section>

        {/* SECTION 2: ABOUT US — Exact Reference Implementation */}
        <section id="about" className="relative py-20 bg-[#F5F2EC] overflow-hidden">

          {/* FAR LEFT: Potted Olive Tree & Shadow (Full Bleed Left Edge, Smooth Fade Right) */}
          <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-[36%] xl:w-[34%] pointer-events-none z-0">
            <Image
              src="/assets/potted-olive-tree-v2.png"
              alt="Luxury interior potted olive tree"
              fill
              className="object-cover object-left-bottom"
              style={{
                WebkitMaskImage: 'linear-gradient(to right, black 72%, transparent 100%)',
                maskImage: 'linear-gradient(to right, black 72%, transparent 100%)',
              }}
              sizes="550px"
              priority
            />
          </div>

          <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 z-10">

            {/* Main Layout: [Tree Spacer] [Text Content] [Arch Images] */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-center">

              {/* Spacer Column on Far Left (reserves space for tree & pot) */}
              <div className="hidden lg:block lg:col-span-3 h-full" />

              {/* CENTER-LEFT: Text Content */}
              <div className="lg:col-span-4 flex flex-col space-y-5">

                {/* Subtitle */}
                <div>
                  <span className="text-warm-gold text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold block mb-2">
                    ABOUT US
                  </span>
                  <div className="w-8 h-[1.5px] bg-warm-gold" />
                </div>

                {/* Headline */}
                <h2 className="font-heading text-4xl sm:text-[44px] leading-[1.12]">
                  <span className="text-forest-green font-normal block">Designing Spaces.</span>
                  <span className="text-warm-gold italic font-normal block mt-1">Enhancing Lives.</span>
                </h2>

                {/* Body Paragraphs */}
                <div className="space-y-3 text-charcoal-black/80 text-xs sm:text-sm leading-relaxed font-body">
                  <p>
                    At Portalis Interiors, we believe that great design goes beyond aesthetics. It shapes the way you live, work, and feel every day.
                  </p>
                  <p>
                    Our approach is rooted in understanding your vision and crafting interiors that are timeless, functional, and uniquely yours.
                  </p>
                </div>

                {/* Learn More Button */}
                <div className="pt-2">
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-3 border border-warm-gold/60 px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-warm-gold hover:bg-forest-green hover:text-white hover:border-forest-green transition-all duration-300 font-medium"
                  >
                    <span>LEARN MORE</span>
                    <ArrowRight size={13} className="text-warm-gold group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                  </Link>
                </div>

                {/* 4 Feature Items — Horizontal arrangement below button */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-forest-green/10 mt-2">

                  {/* 1. Client Focused */}
                  <div className="flex flex-col items-center text-center px-1">
                    <div className="w-9 h-9 rounded-full border border-warm-gold/40 bg-white/60 flex items-center justify-center text-warm-gold mb-2 shadow-sm">
                      <Users size={15} />
                    </div>
                    <h5 className="text-forest-green text-[8px] uppercase tracking-[0.14em] font-bold mb-1">CLIENT FOCUSED</h5>
                    <p className="text-charcoal-black/70 text-[8px] leading-relaxed">
                      We listen, collaborate, and tailor every detail.
                    </p>
                  </div>

                  {/* 2. Thoughtful Design */}
                  <div className="flex flex-col items-center text-center px-1 border-l border-forest-green/10">
                    <div className="w-9 h-9 rounded-full border border-warm-gold/40 bg-white/60 flex items-center justify-center text-warm-gold mb-2 shadow-sm">
                      <PenTool size={15} />
                    </div>
                    <h5 className="text-forest-green text-[8px] uppercase tracking-[0.14em] font-bold mb-1">THOUGHTFUL DESIGN</h5>
                    <p className="text-charcoal-black/70 text-[8px] leading-relaxed">
                      Every space is carefully planned to balance beauty.
                    </p>
                  </div>

                  {/* 3. Quality Assured */}
                  <div className="flex flex-col items-center text-center px-1 border-l border-forest-green/10">
                    <div className="w-9 h-9 rounded-full border border-warm-gold/40 bg-white/60 flex items-center justify-center text-warm-gold mb-2 shadow-sm">
                      <ShieldCheck size={15} />
                    </div>
                    <h5 className="text-forest-green text-[8px] uppercase tracking-[0.14em] font-bold mb-1">QUALITY ASSURED</h5>
                    <p className="text-charcoal-black/70 text-[8px] leading-relaxed">
                      We use premium materials and skilled craftsmen.
                    </p>
                  </div>

                  {/* 4. Sustainable Approach */}
                  <div className="flex flex-col items-center text-center px-1 border-l border-forest-green/10">
                    <div className="w-9 h-9 rounded-full border border-warm-gold/40 bg-white/60 flex items-center justify-center text-warm-gold mb-2 shadow-sm">
                      <Leaf size={15} />
                    </div>
                    <h5 className="text-forest-green text-[8px] uppercase tracking-[0.14em] font-bold mb-1">SUSTAINABLE APPROACH</h5>
                    <p className="text-charcoal-black/70 text-[8px] leading-relaxed">
                      We prioritize sustainable and responsible choices.
                    </p>
                  </div>

                </div>

              </div>

              {/* RIGHT: Architectural Organic Arch Composition */}
              <div className="lg:col-span-5 relative w-full h-[500px] sm:h-[580px] max-w-[620px] mx-auto">

                {/* IMAGE 1: Large Architectural Arch (Upper Center/Right) */}
                <div
                  className="absolute left-[3%] top-0 w-[50%] h-[80%] overflow-hidden border border-warm-gold/20 shadow-lg z-10 transition-transform duration-500 hover:scale-[1.01]"
                  style={{ borderRadius: '180px 180px 100px 100px' }}
                >
                  <Image
                    src="/assets/about-interior-1.png"
                    alt="Portalis Luxury Interior Alcove Console"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 240px, 320px"
                    priority
                  />
                </div>

                {/* IMAGE 2: Upper Right Vertical Arch/Capsule */}
                <div
                  className="absolute right-[2%] top-[3%] w-[42%] h-[54%] overflow-hidden border border-warm-gold/20 shadow-lg z-10 transition-transform duration-500 hover:scale-[1.01]"
                  style={{ borderRadius: '140px 140px 140px 140px' }}
                >
                  <Image
                    src="/assets/about-interior-2.png"
                    alt="Portalis Living Room"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 200px, 260px"
                  />
                </div>

                {/* IMAGE 3: Lower Middle Vertical Rounded Arch (Overlapping) */}
                <div
                  className="absolute left-[30%] bottom-[2%] w-[45%] h-[56%] overflow-hidden border border-warm-gold/20 shadow-xl z-20 transition-transform duration-500 hover:scale-[1.01]"
                  style={{ borderRadius: '150px 150px 150px 150px' }}
                >
                  <Image
                    src="/assets/about-interior-3.png"
                    alt="Portalis Dining Room"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 220px, 280px"
                  />
                </div>

                {/* DARK GREEN CIRCLE STATEMENT (Lower Right) */}
                <div
                  className="absolute right-0 bottom-[8%] w-[150px] h-[150px] sm:w-[190px] sm:h-[190px] rounded-full bg-[#0A352F] border border-warm-gold/30 flex flex-col justify-center items-center text-center text-white shadow-xl z-30 p-4"
                >
                  <p className="text-[10px] sm:text-xs font-normal leading-relaxed tracking-wide text-white/90">
                    Timeless design.<br />
                    Meaningful spaces.<br />
                    Inspired living.
                  </p>
                  <div className="w-8 h-[1px] bg-warm-gold mt-2.5" />
                </div>

              </div>

            </div>

            {/* BOTTOM: Mission + Vision Rounded Panel */}
            <div className="mt-16 p-8 sm:p-10 rounded-[32px] bg-[#F0ECE1]/80 border border-warm-gold/20 relative overflow-hidden backdrop-blur-sm shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10">

                {/* Mission */}
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-full bg-forest-green flex items-center justify-center text-warm-gold shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-3.42-3.485L12 10.5M3 15V8.25m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-3.42-3.485L12 3.75M3 8.25v6.75" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-warm-gold text-[10px] uppercase tracking-[0.25em] font-semibold mb-2">OUR MISSION</h4>
                    <p className="text-charcoal-black/85 text-xs sm:text-sm font-normal leading-relaxed">
                      To create inspiring interiors that elevate everyday living through thoughtful design, quality, and integrity.
                    </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="flex items-start gap-5 md:border-l md:border-warm-gold/20 md:pl-12">
                  <div className="w-12 h-12 rounded-full bg-forest-green flex items-center justify-center text-warm-gold shrink-0 shadow-sm">
                    <svg className="w-5 h-5 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-warm-gold text-[10px] uppercase tracking-[0.25em] font-semibold mb-2">OUR VISION</h4>
                    <p className="text-charcoal-black/85 text-xs sm:text-sm font-normal leading-relaxed">
                      To be a trusted name in interior design, known for creating timeless spaces that leave a lasting impact.
                    </p>
                  </div>
                </div>

              </div>

              {/* Botanical Leaf SVG Decoration */}
              <div className="absolute right-4 bottom-2 pointer-events-none opacity-20 hidden md:block z-0">
                <svg className="w-32 h-32 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
                  <path d="M50 90 C50 60, 30 30, 20 10" />
                  <path d="M50 90 C50 60, 70 30, 80 10" />
                  <path d="M50 90 L50 20" />
                  <path d="M50 70 Q35 55 25 50" />
                  <path d="M50 70 Q65 55 75 50" />
                  <path d="M50 50 Q30 35 20 30" />
                  <path d="M50 50 Q70 35 80 30" />
                  <path d="M50 30 Q35 20 25 15" />
                  <path d="M50 30 Q65 20 75 15" />
                </svg>
              </div>

            </div>

          </div>
        </section>

        {/* STANDALONE CORE VALUES SECTION */}
        <section className="bg-forest-green py-24 px-6 md:px-12 border-t border-b border-warm-gold/20 relative overflow-hidden">
          {/* Subtle gold line pattern background representing drafting coordinates */}
          <div className="absolute inset-0 pointer-events-none opacity-10 flex items-center justify-center">
            <svg className="w-full h-full text-warm-gold" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.12">
              <line x1="0" y1="20" x2="100" y2="20" />
              <line x1="0" y1="50" x2="100" y2="50" />
              <line x1="0" y1="80" x2="100" y2="80" />
              <line x1="25" y1="0" x2="25" y2="100" />
              <line x1="50" y1="0" x2="50" y2="100" />
              <line x1="75" y1="0" x2="75" y2="100" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-20 space-y-4">
              <span className="text-warm-gold text-xs uppercase tracking-[0.3em] font-semibold block">
                OUR PRINCIPLES
              </span>
              <div className="h-[1px] w-8 bg-warm-gold/60 mx-auto" />
              <h2 className="font-heading text-3xl sm:text-5xl text-white">
                Our Core Values
              </h2>
            </div>

            {/* Transparent grid with thin gold borders, expanded spacing, floating icons, and gold dividers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {coreValues.map((value, idx) => {
                const IconComp = value.icon;
                return (
                  <div 
                    key={idx} 
                    className="border border-warm-gold/25 p-10 bg-forest-green/20 backdrop-blur-md flex flex-col space-y-6 transition-all duration-500 hover:bg-white/[0.04] hover:border-warm-gold/70 group rounded-[20px] shadow-sm hover:shadow-md"
                  >
                    {/* Gold Ring Icon container with float & fill on hover */}
                    <div className="p-4 border border-warm-gold/30 text-warm-gold w-fit rounded-full group-hover:bg-warm-gold group-hover:text-forest-green group-hover:scale-110 transition-all duration-500 ease-out shrink-0">
                      <IconComp size={22} />
                    </div>
                    
                    {/* Serif Header and gold rule */}
                    <div className="space-y-3">
                      <h4 className="font-heading text-xl text-white group-hover:text-warm-gold transition-colors duration-300">
                        {value.title}
                      </h4>
                      <div className="w-8 h-[1px] bg-warm-gold/50 group-hover:w-16 group-hover:bg-warm-gold transition-all duration-500" />
                    </div>
                    
                    {/* Description text */}
                    <p className="text-white/95 text-xs font-normal leading-relaxed">
                      {value.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ========================================================
            SECTION 3.8: DESIGN STYLE / GALLERY (PHOTO LIBRARY)
        ======================================================== */}
        <section id="gallery" className="relative py-24 px-6 md:px-12 bg-light-cream border-t border-forest-green/10 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10 space-y-24">
            
            {/* PHOTO LIBRARY BLOCK */}
            <div>
              {/* Section Header */}
              <div className="mb-12">
                <span className="text-warm-gold text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
                  PHOTO LIBRARY
                </span>
                <div className="h-[2px] w-10 bg-warm-gold/60 mt-3 mb-6" />
                
                <h2 className="font-heading text-4xl sm:text-5xl md:text-[3.25rem] leading-tight text-forest-green">
                  Spaces That Inspire,<br />
                  <span className="text-warm-gold">Details That Matter.</span>
                </h2>
                <p className="text-charcoal-black/80 text-xs sm:text-sm font-normal max-w-xl mt-4 leading-relaxed">
                  A curated collection of moments, textures, and compositions that reflect our design philosophy.
                </p>
              </div>

              {/* Grid of 6 photo library cards with 3D perspective curved arch panel layout */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-8 pb-4 perspective-container">
                {[
                  { num: "01", label: "LIVE SPACES", image: "/assets/extracted_img_p15_4_986.jpeg" },
                  { num: "02", label: "RESTOBAR", image: "/assets/extracted_img_p23_1_203.jpeg" },
                  { num: "03", label: "LOUNGE AREAS", image: "/assets/extracted_img_p13_3_924.jpeg" },
                  { num: "04", label: "DINING AREAS", image: "/assets/extracted_img_p16_6_1019.jpeg" },
                  { num: "05", label: "BATHROOMS", image: "/assets/extracted_img_p12_2_127.jpeg" },
                  { num: "06", label: "PRIVATE DINING", image: "/assets/extracted_img_p14_3_956.jpeg" },
                ].map((item, idx) => (
                  <div 
                    key={item.num} 
                    className={`flex flex-col group cursor-pointer transition-all duration-500 hover:-translate-y-2 perspective-card-${idx}`}
                  >
                    <div className="relative w-full aspect-[9/14] rounded-[20px] overflow-hidden border border-warm-gold/15 shadow-sm group-hover:shadow-md transition-all duration-500">
                      <Image
                        src={item.image}
                        alt={item.label}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 17vw"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-[10px] uppercase font-bold text-warm-gold tracking-widest block mb-1">
                        {item.num}
                      </span>
                      <h4 className="text-[11px] uppercase tracking-[0.15em] font-semibold text-forest-green group-hover:text-warm-gold transition-colors duration-300">
                        {item.label}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dot Indicators (Image 1 style) */}
              <div className="flex justify-center items-center gap-2 mt-8">
                <span className="w-2.5 h-2.5 rounded-full bg-warm-gold" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-gray/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-gray/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-gray/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-gray/40" />
                <span className="w-1.5 h-1.5 rounded-full bg-stone-gray/40" />
              </div>
            </div>

            {/* DESIGN ELEMENTS BLOCK */}
            <div className="border-t border-forest-green/10 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                
                {/* Left side info */}
                <div className="lg:col-span-4 flex flex-col space-y-6">
                  <div>
                    <span className="text-warm-gold text-[10px] uppercase tracking-[0.25em] font-semibold block mb-2">
                      OUR DESIGN ELEMENTS
                    </span>
                    <h2 className="font-heading text-4xl sm:text-5xl leading-tight uppercase">
                      <span className="text-forest-green block">DESIGN</span>
                      <span className="text-warm-gold block">STYLE</span>
                    </h2>
                  </div>
                  <p className="text-charcoal-black text-xs sm:text-sm font-normal leading-relaxed">
                    Our design style is a reflection of our philosophy—where form meets function, and beauty lies in simplicity. We believe great interiors are not just seen, but felt. Every element is thoughtfully chosen to create spaces that are timeless, personal, and inspiring.
                  </p>
                </div>

                {/* Right side element items list */}
                <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-12">
                  {[
                    {
                      title: "BALANCE",
                      desc: "A perfect harmony of proportions, materials, and visual weight.",
                      icon: (
                        <svg className="w-5 h-5 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <circle cx="9" cy="12" r="5" strokeDasharray="2 2" />
                          <circle cx="15" cy="12" r="5" />
                        </svg>
                      ),
                    },
                    {
                      title: "PROPORTION",
                      desc: "Carefully considered scale and layout to create spaces that feel just right.",
                      icon: (
                        <svg className="w-5 h-5 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <rect x="4" y="4" width="7" height="7" rx="1" />
                          <rect x="13" y="4" width="7" height="7" rx="1" />
                          <rect x="4" y="13" width="7" height="7" rx="1" />
                          <rect x="13" y="13" width="7" height="7" rx="1" />
                        </svg>
                      ),
                    },
                    {
                      title: "MATERIALITY",
                      desc: "Natural, authentic materials that age beautifully and tell a story.",
                      icon: (
                        <svg className="w-5 h-5 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M12 3 L20 7 L12 11 L4 7 Z" />
                          <path d="M4 7 L4 14 L12 18 L12 11" />
                          <path d="M20 7 L20 14 L12 18" />
                        </svg>
                      ),
                    },
                    {
                      title: "LIGHT",
                      desc: "Thoughtful lighting to enhance mood, texture, and function.",
                      icon: (
                        <svg className="w-5 h-5 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="4" />
                          <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                        </svg>
                      ),
                    },
                    {
                      title: "TEXTURE",
                      desc: "Layering of textures to add depth, warmth, and character.",
                      icon: (
                        <svg className="w-5 h-5 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M4 18h16M4 14h16M4 10h16M4 6h16" strokeDasharray="3 3" />
                        </svg>
                      ),
                    },
                    {
                      title: "TIMELESSNESS",
                      desc: "Designing spaces that remain elegant and relevant for years to come.",
                      icon: (
                        <svg className="w-5 h-5 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      ),
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col space-y-3.5 border-l border-warm-gold/20 pl-5">
                      <div className="w-9 h-9 rounded-full border border-warm-gold/30 flex items-center justify-center bg-white shadow-sm">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-[10px] uppercase tracking-[0.15em] font-bold text-forest-green mb-1">
                          {item.title}
                        </h4>
                        <p className="text-charcoal-black text-[11px] font-normal leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </div>

            {/* COLLAGE & ATMOSPHERE CARDS */}
            <div className="border-t border-forest-green/10 pt-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                
                {/* Collage of design inspirations */}
                <div className="lg:col-span-6 flex flex-col space-y-6">
                  <h3 className="font-heading text-xl uppercase tracking-[0.2em] text-forest-green">
                    DESIGN INSPIRATION
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative aspect-[3/4] sm:aspect-auto sm:h-[450px] rounded-2xl overflow-hidden border border-warm-gold/10 shadow-sm">
                      <Image
                        src="/assets/extracted_img_p15_4_986.jpeg"
                        alt="Inspiration 1"
                        fill
                        className="object-cover hover:scale-[1.03] transition-transform duration-700"
                      />
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="relative h-[218px] rounded-2xl overflow-hidden border border-warm-gold/10 shadow-sm">
                        <Image
                          src="/assets/extracted_img_p20_1_182.jpeg"
                          alt="Inspiration 2"
                          fill
                          className="object-cover hover:scale-[1.03] transition-transform duration-700"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 h-[218px]">
                        <div className="relative rounded-2xl overflow-hidden border border-warm-gold/10 shadow-sm">
                          <Image
                            src="/assets/extracted_img_p13_3_924.jpeg"
                            alt="Inspiration 3"
                            fill
                            className="object-cover hover:scale-[1.03] transition-transform duration-700"
                          />
                        </div>
                        <div className="relative rounded-2xl overflow-hidden border border-warm-gold/10 shadow-sm">
                          <Image
                            src="/assets/extracted_img_p23_1_203.jpeg"
                            alt="Inspiration 4"
                            fill
                            className="object-cover hover:scale-[1.03] transition-transform duration-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Atmosphere & feel cards */}
                <div className="lg:col-span-6 flex flex-col space-y-6">
                  <h3 className="font-heading text-xl uppercase tracking-[0.2em] text-forest-green">
                    ATMOSPHERE & FEEL
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {[
                      {
                        title: "SOPHISTICATED & CHIC",
                        desc: "Moody tones, refined materials, and ambient lighting create an elevated and sophisticated experience.",
                        image: "/assets/extracted_img_p20_2_183.jpeg",
                      },
                      {
                        title: "WARM & INVITING",
                        desc: "Rich textures, warm lighting, and earthy tones bring comfort, intimacy, and a welcoming atmosphere.",
                        image: "/assets/extracted_img_p14_5_962.jpeg",
                      },
                      {
                        title: "CONNECTED TO NATURE",
                        desc: "Biophilic elements and natural materials create a calming connection between indoor comfort and outdoor beauty.",
                        image: "/assets/extracted_img_p13_6_936.jpeg",
                      },
                    ].map((card, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col bg-forest-green rounded-2xl border border-warm-gold/15 overflow-hidden shadow-sm"
                      >
                        <div className="relative w-full aspect-square">
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-5 flex-grow flex flex-col space-y-2.5">
                          <h4 className="font-heading text-xs text-warm-gold tracking-wider uppercase font-semibold leading-tight">
                            {card.title}
                          </h4>
                          <p className="text-[10px] text-white/90 font-normal leading-relaxed flex-grow">
                            {card.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>


        {/* SECTION 4: SERVICES GRID (PDF Page 4 - EXACT SCREENSHOT RECREATION) */}
        <section id="services" className="relative py-24 px-6 md:px-12 bg-light-cream overflow-hidden">
          {/* Faint Architectural Vault Arches Vector Backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
            <svg className="w-[80%] h-[80%] text-forest-green" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
              <path d="M10 90 C 10 30, 90 30, 90 90" />
              <path d="M20 90 C 20 40, 80 40, 80 90" />
              <path d="M30 90 C 30 50, 70 50, 70 90" />
              <path d="M40 90 C 40 60, 60 60, 60 90" />
              <line x1="50" y1="20" x2="50" y2="90" />
            </svg>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header matching Image 1 layout */}
            <div className="mb-16 space-y-6">
              <div>
                <span className="text-warm-gold text-xs uppercase tracking-[0.3em] font-semibold block">
                  OUR SERVICES
                </span>
                <div className="h-[2px] w-10 bg-warm-gold/60 mt-3" />
              </div>
              
              <div className="flex flex-col items-center text-center space-y-4 pt-4">
                <h3 className="font-heading text-3xl sm:text-[2.5rem] text-forest-green leading-tight">
                  We ARE
                </h3>
                <h2 className="font-heading text-4xl sm:text-[3.5rem] leading-none tracking-wide">
                  <span className="text-warm-gold font-bold">EXPERTISE</span> <span className="text-forest-green uppercase font-normal">IN</span>
                </h2>
                
                <div className="pt-2">
                  <Link
                    href="/services"
                    className="circle-reveal-btn border border-warm-gold/50 px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-warm-gold hover:text-white hover:border-warm-gold font-medium transition-colors duration-300 inline-flex items-center gap-3"
                  >
                    Learn More
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

            {/* Exact 8 rounded cards grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 w-full">
              {services.map((svc) => (
                <Link
                  key={svc.id}
                  href={`/services/${svc.id}`}
                  className="group flex flex-col items-center"
                >
                  {/* Rounded image container matching soft-corner look */}
                  <div className="relative w-full aspect-[4/3] rounded-[32px] overflow-hidden border border-warm-gold/15 shadow-sm transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-md group-hover:border-warm-gold">
                    <Image
                      src={svc.image}
                      alt={svc.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 300px"
                    />
                  </div>
                  {/* Centered label below */}
                  <h3 className="font-heading text-base sm:text-lg text-forest-green leading-snug font-semibold text-center mt-5 group-hover:text-warm-gold transition-colors duration-300">
                    {svc.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: PORTFOLIO SECTION (PDF Pages 13-16) */}
        <section id="portfolio" className="py-24 px-6 md:px-12 bg-white border-t border-b border-warm-gold/10">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16">
              <div>
                <span className="text-forest-green text-xs uppercase tracking-[0.3em] block mb-4">
                  Our Work
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight text-forest-green">
                  Our Portfolio
                </h2>
              </div>
              <p className="text-charcoal-black text-xs font-normal max-w-sm mt-4 lg:mt-0 leading-relaxed">
                A selection of refined spaces we have designed, approved, and brought to life in the UAE.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap gap-4 mb-12 border-b border-charcoal-black/10 pb-6">
              {["All Projects", "Commercial", "Hospitality"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-[0.25em] font-medium py-2 px-4 transition-all duration-300 ${
                    activeCategory === cat
                      ? "text-forest-green border-b border-forest-green font-semibold"
                      : "text-charcoal-black/80 hover:text-forest-green"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    key={project.id}
                    onClick={() => openLightbox(index)}
                    className="group cursor-pointer border border-warm-gold/20 overflow-hidden flex flex-col justify-between aspect-[0.85] bg-light-cream hover:border-forest-green/40 transition-all duration-300 hover:shadow-md"
                  >
                    <div className="relative flex-1 overflow-hidden aspect-[4/3] border-b border-warm-gold/10">
                      <Image
                        src={project.src}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 350px"
                      />
                    </div>
                    <div className="p-6 bg-white flex flex-col space-y-2">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-warm-gold font-semibold">
                        {project.category}
                      </span>
                      <h3 className="font-heading text-lg text-forest-green leading-snug group-hover:text-warm-gold transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-charcoal-black text-xs font-normal leading-relaxed line-clamp-2">
                        {project.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* SECTION 6: CONTACT — updated design */}
        <section id="contact" className="bg-light-cream relative overflow-hidden">

          {/* Decorative: Dark green semi-circle top-left */}
          <div className="absolute -top-10 -left-10 w-[180px] h-[180px] rounded-full bg-forest-green hidden md:block" style={{ zIndex: 1 }} />

          {/* Decorative: Beige circle top-right */}
          <div className="absolute top-8 -right-8 w-[100px] h-[100px] rounded-full bg-stone-gray/50 hidden md:block" style={{ zIndex: 1 }} />

          {/* Decorative: Dot grid left */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:block opacity-30" style={{ zIndex: 0 }}>
            {Array.from({ length: 5 }).map((_, row) => (
              <div key={row} className="flex gap-2 mb-2">
                {Array.from({ length: 3 }).map((_, col) => (
                  <div key={col} className="w-1 h-1 rounded-full bg-warm-gold/70" />
                ))}
              </div>
            ))}
          </div>

          {/* Decorative: Dot grid right */}
          <div className="absolute right-6 bottom-12 hidden xl:block opacity-30" style={{ zIndex: 1 }}>
            {Array.from({ length: 5 }).map((_, row) => (
              <div key={row} className="flex gap-2 mb-2">
                {Array.from({ length: 3 }).map((_, col) => (
                  <div key={col} className="w-1 h-1 rounded-full bg-warm-gold/70" />
                ))}
              </div>
            ))}
          </div>

          <div className="relative max-w-[1280px] mx-auto px-6 md:px-12 py-24" style={{ zIndex: 2 }}>
            <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr_340px] gap-8 xl:gap-12 items-start">

              {/* LEFT: Form Card */}
              <div className="bg-white border border-stone-gray/30 shadow-sm p-7">
                <span className="text-warm-gold text-[10px] uppercase tracking-[0.3em] font-semibold block mb-4">
                  SEND US A MESSAGE
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl text-charcoal-black leading-tight mb-6">
                  Let&apos;s Start Your<br />
                  Dream <span className="text-warm-gold italic">Project</span>
                </h3>
                <ContactForm />
              </div>

              {/* CENTER: Contact Info */}
              <div className="py-4 lg:py-0 flex flex-col items-center text-center">
                <span className="text-warm-gold text-[10px] uppercase tracking-[0.35em] font-semibold mb-4 block">
                  GET IN TOUCH
                </span>
                <h2 className="font-heading text-5xl sm:text-6xl leading-tight mb-3">
                  <span className="text-charcoal-black">Contact </span>
                  <span className="text-warm-gold italic">Us</span>
                </h2>
                <div className="w-10 h-[2px] bg-warm-gold mx-auto mb-5" />
                <p className="text-charcoal-black/70 text-sm font-normal leading-relaxed mb-10 max-w-[340px]">
                  We&apos;d love to hear about your project.<br />
                  Reach out to us and let&apos;s create something beautiful together.
                </p>

                <div className="space-y-5 text-left w-full max-w-[340px]">
                  {/* ADDRESS */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center shrink-0">
                      <MapPin size={16} className="text-white" />
                    </div>
                    <div>
                      <h5 className="text-[9px] uppercase tracking-[0.25em] text-warm-gold font-semibold mb-1">ADDRESS</h5>
                      <p className="text-charcoal-black text-[12px] font-normal leading-relaxed">
                        Industrial Area 2, Ajman, UAE
                      </p>
                    </div>
                  </div>
                  {/* PHONE */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center shrink-0">
                      <Phone size={16} className="text-white" />
                    </div>
                    <div>
                      <h5 className="text-[9px] uppercase tracking-[0.25em] text-warm-gold font-semibold mb-1">PHONE</h5>
                      <p className="text-charcoal-black text-[12px] font-normal">+971 55 522 2074</p>
                    </div>
                  </div>
                  {/* EMAIL */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center shrink-0">
                      <Mail size={16} className="text-white" />
                    </div>
                    <div>
                      <h5 className="text-[9px] uppercase tracking-[0.25em] text-warm-gold font-semibold mb-1">EMAIL</h5>
                      <p className="text-charcoal-black text-[12px] font-normal">info@portalis.ae</p>
                    </div>
                  </div>
                  {/* HOURS */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-forest-green flex items-center justify-center shrink-0">
                      <Clock size={16} className="text-white" />
                    </div>
                    <div>
                      <h5 className="text-[9px] uppercase tracking-[0.25em] text-warm-gold font-semibold mb-1">HOURS</h5>
                      <p className="text-charcoal-black text-[12px] font-normal leading-relaxed">
                        Mon – Sat: 10:00 AM – 7:00 PM<br />Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT: Arched Interior Photo */}
              <div className="relative self-stretch hidden lg:block">
                <div
                  className="relative overflow-hidden w-full h-full min-h-[520px]"
                  style={{ borderRadius: '180px 180px 12px 12px' }}
                >
                  <Image
                    src="/assets/contact-interior.png"
                    alt="Portalis Interiors — luxury interior design"
                    fill
                    className="object-cover object-center"
                    sizes="340px"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>


      <Footer />

      {/* Lightbox for Portfolio Projects */}
      <Lightbox
        isOpen={lightboxOpen}
        images={filteredProjects.map((p) => ({ src: p.src, title: p.title, category: p.category }))}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
      />
    </>
  );
}
