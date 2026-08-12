"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight, MapPin, Phone, Mail, Clock, Trophy, Shield, Award, Sparkles, Building2, Lightbulb, Users, PenTool, ShieldCheck, Leaf } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Lightbox from "@/components/Lightbox";
import ContactForm from "@/components/ContactForm";
import { CardCarousel } from "@/components/ui/card-carousel";
import FoldText from "@/components/ui/FoldText";
import Counter from "@/components/ui/Counter";

// Portfolio projects from projects directory
const portfolioProjects = [
  {
    id: 1,
    title: "Shade (Citywalk)",
    category: "Hospitality",
    src: "/projects/shade-citywalk/img1.webp",
    images: [
      "/projects/shade-citywalk/img1.webp",
      "/projects/shade-citywalk/img2.webp",
      "/projects/shade-citywalk/img3.webp",
      "/projects/shade-citywalk/img4.webp",
      "/projects/shade-citywalk/img5.webp"
    ],
    desc: "High-end luxury salon & premium styling venue combining arched vanity lighting, bespoke joinery, and premium marble finishes at Citywalk, Dubai.",
  },
  {
    id: 2,
    title: "La Brioche (Water's Edge)",
    category: "Hospitality",
    src: "/projects/labrioche-waters-edge/DSC_00000.webp",
    images: [
      "/projects/labrioche-waters-edge/DSC_00000.webp",
      "/projects/labrioche-waters-edge/DSC_0004.webp",
      "/projects/labrioche-waters-edge/DSC_0007.webp",
      "/projects/labrioche-waters-edge/DSC_0017.webp",
      "/projects/labrioche-waters-edge/DSC_0018.webp"
    ],
    desc: "Bespoke French bistro and bakery interior fit-out at Water's Edge, Abu Dhabi.",
  },
  {
    id: 3,
    title: "Turtle Cove Cafe (Saadiyat Island)",
    category: "Hospitality",
    src: "/projects/turtle-cove-cafe/DSC_0377.webp",
    images: [
      "/projects/turtle-cove-cafe/DSC_0377.webp",
      "/projects/turtle-cove-cafe/DSC_0384.webp",
      "/projects/turtle-cove-cafe/DSC_0389.webp",
      "/projects/turtle-cove-cafe/DSC_0391.webp",
      "/projects/turtle-cove-cafe/DSC_0393.webp"
    ],
    desc: "Artisanal coastal cafe and specialty coffee venue on Saadiyat Island, Abu Dhabi.",
  },
  {
    id: 4,
    title: "Vapiano (ZCC)",
    category: "Hospitality",
    src: "/projects/vapiano-zcc/IMG_0081.webp",
    images: [
      "/projects/vapiano-zcc/IMG_0081.webp",
      "/projects/vapiano-zcc/IMG_0082.webp",
      "/projects/vapiano-zcc/IMG_0084.webp",
      "/projects/vapiano-zcc/IMG_0086.webp",
      "/projects/vapiano-zcc/IMG_0087.webp"
    ],
    desc: "Modern Italian fast-casual restaurant fit-out and joinery work at ZCC, Abu Dhabi.",
  },
  {
    id: 5,
    title: "Domino's (Makani Mall)",
    category: "Hospitality",
    src: "/projects/dominos-makani-mall/DSC_0001-01.webp",
    images: [
      "/projects/dominos-makani-mall/DSC_0001-01.webp",
      "/projects/dominos-makani-mall/DSC_0020-01.webp",
      "/projects/dominos-makani-mall/DSC_0021-01.webp",
      "/projects/dominos-makani-mall/DSC_0024-02.webp",
      "/projects/dominos-makani-mall/DSC_0028-02.webp"
    ],
    desc: "Turnkey interior fit-out and architectural execution for Domino's Pizza at Makani Mall.",
  },
];

const galleryCarouselImages = [
  { num: "01", label: "SHADE RESTOBAR", src: "/projects/shade-citywalk/DSC_0003.webp", alt: "Shade Restobar Citywalk" },
  { num: "02", label: "LA BRIOCHE BISTRO", src: "/projects/labrioche-waters-edge/DSC_00000.webp", alt: "La Brioche Waters Edge" },
  { num: "03", label: "TURTLE COVE CAFE", src: "/projects/turtle-cove-cafe/DSC_0377.webp", alt: "Turtle Cove Cafe Saadiyat" },
  { num: "04", label: "VAPIANO RESTAURANT", src: "/projects/vapiano-zcc/IMG_0081.webp", alt: "Vapiano ZCC" },
  { num: "05", label: "DOMINO'S MAKANI", src: "/projects/dominos-makani-mall/DSC_0001-01.webp", alt: "Dominos Makani Mall" },
  { num: "06", label: "SHADE LOUNGE", src: "/projects/shade-citywalk/DSC_0010.webp", alt: "Shade Lounge Area" },
  { num: "07", label: "LA BRIOCHE INTERIOR", src: "/projects/labrioche-waters-edge/DSC_0007.webp", alt: "La Brioche Interior" },
  { num: "08", label: "TURTLE COVE LOUNGE", src: "/projects/turtle-cove-cafe/DSC_0384.webp", alt: "Turtle Cove Lounge" },
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
    image: "/assets/extracted_img_p4_2_337.png",
  },
  {
    id: "corporate-interiors",
    title: "Corporate Interiors",
    image: "/assets/extracted_img_p4_3_338.jpeg",
  },
  {
    id: "mep-systems",
    title: "MEP Systems",
    image: "/assets/extracted_img_p4_6_341.jpeg",
  },
  {
    id: "fb-hospitality",
    title: "F&B & Hospitality Fit-Outs",
    image: "/assets/extracted_img_p4_4_339.jpeg",
  },
  {
    id: "retail-wellness",
    title: "Retail & Wellness Healthcare",
    image: "/assets/extracted_img_p4_5_340.jpeg",
  },
  {
    id: "joinery-services",
    title: "Joinery Services",
    image: "/assets/extracted_img_p4_7_342.jpeg",
  },
  {
    id: "approvals-compliance",
    title: "Approvals & Compliance",
    image: "/assets/extracted_img_p4_8_344.jpeg",
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
    desc: "Constantly pushing the boundaries of what is possible, including our milestone Guinness World Record achievement.",
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
  const [activeProject, setActiveProject] = useState<typeof portfolioProjects[0] | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

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
    const proj = filteredProjects[index];
    setActiveProject(proj);
    setActiveImageIndex(0);
    setLightboxOpen(true);
  };

  const handleNextImage = () => {
    if (!activeProject) return;
    setActiveImageIndex((prev) => (prev + 1) % activeProject.images.length);
  };

  const handlePrevImage = () => {
    if (!activeProject) return;
    setActiveImageIndex((prev) => (prev - 1 + activeProject.images.length) % activeProject.images.length);
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
            <FoldText
              text="LUXURY INTERIOR DESIGN . FIT-OUT . JOINERY"
              trigger="scroll"
              animationType="slide"
              once={false}
              fontSize="inherit"
              fontWeight="inherit"
              color="var(--color-warm-gold)"
              className="text-xs sm:text-sm tracking-[0.25em] uppercase font-semibold"
              style={{ lineHeight: "inherit", letterSpacing: "inherit" }}
              splitBy="word"
            />
            <div className="h-[1px] w-12 bg-warm-gold/60 mt-1 mb-4" />
            
            <h1 className="font-heading text-4xl sm:text-6xl md:text-8xl leading-[1.08] text-white">
              Timeless Spaces,<br />
              Designed for{" "}
              <span className="italic font-normal font-heading text-warm-gold">Life.</span>
            </h1>
            
            <p className="text-white/95 text-sm sm:text-base md:text-lg max-w-xl font-normal leading-relaxed pt-4">
              We create refined residential, commercial, and hospitality interiors that blend elegance, functionality, and timeless craftsmanship.
            </p>
            
            <div className="flex flex-col gap-3 pt-8 max-w-[480px]">
              {/* Primary Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <a
                  href="#portfolio"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="bg-warm-gold hover:bg-white text-forest-green text-xs uppercase tracking-[0.2em] py-4 px-6 text-center transition-all duration-300 font-semibold shadow-sm"
                >
                  EXPLORE PROJECTS
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="border border-warm-gold/50 hover:border-white text-warm-gold hover:text-white text-xs uppercase tracking-[0.2em] py-4 px-6 text-center transition-all duration-300 font-semibold shadow-sm bg-transparent"
                >
                  BOOK CONSULTATION
                </a>
              </div>

              {/* Secondary Actions */}
              <div className="flex flex-row items-center gap-4 sm:gap-6 pt-1">
                <a
                  href="https://www.instagram.com/portalis.ae?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-warm-gold/50 hover:border-white text-warm-gold hover:text-white text-xs uppercase tracking-[0.2em] py-3 px-5 text-center transition-all duration-300 font-semibold shadow-sm bg-transparent flex items-center justify-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span>INSTAGRAM</span>
                </a>
                <a
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex items-center gap-2 text-white/95 hover:text-warm-gold text-xs uppercase tracking-[0.2em] py-3 font-semibold transition-all duration-300"
                >
                  OUR PROCESS <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform text-white/95 group-hover:text-warm-gold" />
                </a>
              </div>
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

        {/* SECTION 2: ABOUT US (PDF Page 2) */}
        <section id="about" className="py-24 px-6 md:px-12 bg-light-cream">
          <div className="max-w-7xl mx-auto">
            
            {/* About Story & Oval Image Cluster Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column Story */}
              <div className="lg:col-span-6 flex flex-col space-y-6">
                <span className="text-warm-gold text-xs uppercase tracking-[0.25em] font-semibold">
                  ABOUT US
                </span>
                <h2 className="font-heading text-3xl sm:text-5xl text-forest-green leading-tight">
                  Designing Spaces.<br />Enhancing Lives.
                </h2>
                
                <div className="text-charcoal-black text-sm font-normal leading-relaxed">
                  <div className="float-left border border-warm-gold/50 p-4 bg-white shadow-sm flex flex-col items-center justify-center text-center w-28 h-24 mr-6 mb-4">
                    <span className="font-heading text-3xl text-forest-green font-semibold">
                      <Counter value={25} suffix="+" />
                    </span>
                    <span className="text-[8px] uppercase tracking-widest text-warm-gold mt-1 font-normal leading-tight font-body">YEARS OF<br />EXPERIENCE</span>
                  </div>
                  <p className="mb-4">
                    At Portalis, we bring a legacy of craftsmanship and expertise to every project. Although our company was founded a decade ago, our roots run deeper—our founder brings over years of experience in the UAE's dynamic interior design industry. This wealth of knowledge, combined with our team's dedication, enables us to create innovative, functional, and cost-effective solutions that truly transform spaces.
                  </p>
                  <p>
                    This wealth of knowledge, combined with our team's dedication, enables us to create innovative, functional, and cost-effective solutions that truly transform spaces.
                  </p>
                </div>

                <div className="pt-4">
                  <Link
                    href="/#portfolio"
                    className="circle-reveal-btn border border-warm-gold/50 px-6 py-3 text-[10px] uppercase tracking-[0.25em] text-warm-gold hover:text-white hover:border-white font-medium transition-colors duration-300 inline-flex items-center gap-3 w-fit"
                  >
                    Learn More
                    <ArrowRight size={14} />
                  </Link>
                </div>
                
                {/* 4 Core Features */}
                <div className="grid grid-cols-2 gap-6 mt-8 pt-8 border-t border-forest-green/10">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-warm-gold/30 flex items-center justify-center text-warm-gold shrink-0 bg-white shadow-sm">
                      <Users size={14} />
                    </div>
                    <div>
                      <h5 className="text-forest-green text-[9px] uppercase tracking-[0.15em] font-bold mb-1">
                        CLIENT FOCUSED
                      </h5>
                      <p className="text-charcoal-black text-[10px] font-normal leading-relaxed">
                        We listen, collaborate, and tailor every detail to reflect your lifestyle and goals.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-warm-gold/30 flex items-center justify-center text-warm-gold shrink-0 bg-white shadow-sm">
                      <PenTool size={14} />
                    </div>
                    <div>
                      <h5 className="text-forest-green text-[9px] uppercase tracking-[0.15em] font-bold mb-1">
                        THOUGHTFUL DESIGN
                      </h5>
                      <p className="text-charcoal-black text-[10px] font-normal leading-relaxed">
                        Every space is carefully planned to balance beauty, comfort, and functionality.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-warm-gold/30 flex items-center justify-center text-warm-gold shrink-0 bg-white shadow-sm">
                      <ShieldCheck size={14} />
                    </div>
                    <div>
                      <h5 className="text-forest-green text-[9px] uppercase tracking-[0.15em] font-bold mb-1">
                        QUALITY ASSURED
                      </h5>
                      <p className="text-charcoal-black text-[10px] font-normal leading-relaxed">
                        We use premium materials and work with skilled craftsmen to deliver excellence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full border border-warm-gold/30 flex items-center justify-center text-warm-gold shrink-0 bg-white shadow-sm">
                      <Leaf size={14} />
                    </div>
                    <div>
                      <h5 className="text-forest-green text-[9px] uppercase tracking-[0.15em] font-bold mb-1">
                        SUSTAINABLE APPROACH
                      </h5>
                      <p className="text-charcoal-black text-[10px] font-normal leading-relaxed">
                        We prioritize sustainable choices that create beautiful, responsible spaces.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Oval Image Cluster (PDF Page 13-16 Renders) */}
              <div className="lg:col-span-6 relative w-full h-[380px] sm:h-[480px] lg:h-[660px] max-w-[340px] sm:max-w-[440px] lg:max-w-[620px] mx-auto lg:mx-0">
                {/* Oval 1 (upper-left): Lunico Restobar (La Mer) */}
                <div className="absolute left-0 top-0 w-[170px] h-[240px] sm:w-[220px] sm:h-[310px] lg:w-[310px] lg:h-[450px] rounded-[50%] overflow-hidden border border-warm-gold/25 shadow-md z-10">
                  <Image
                    src="/assets/extracted_img_p20_1_182.jpeg"
                    alt="Lunico Restobar La Mer"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 220px, 310px"
                  />
                </div>

                {/* Oval 2 (upper-right): Lekki Restobar (Jumeirah) */}
                <div className="absolute right-0 top-4 sm:top-6 lg:top-8 w-[125px] h-[180px] sm:w-[160px] sm:h-[230px] lg:w-[240px] lg:h-[340px] rounded-[50%] overflow-hidden border border-warm-gold/25 shadow-md z-10">
                  <Image
                    src="/assets/extracted_img_p23_1_203.jpeg"
                    alt="Lekki Restobar Jumeirah"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 240px"
                  />
                </div>

                {/* Oval 3 (bottom-left): Schneider Electric Office (DSO) */}
                <div className="absolute left-[30px] sm:left-[60px] lg:left-[90px] bottom-0 w-[145px] h-[200px] sm:w-[190px] sm:h-[260px] lg:w-[270px] lg:h-[370px] rounded-[50%] overflow-hidden border border-warm-gold/25 shadow-md z-20">
                  <Image
                    src="/assets/extracted_img_p7_1_375.jpeg"
                    alt="Schneider Electric Office"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 190px, 270px"
                  />
                </div>

                {/* Oval 4 (bottom-right): Solid Forest Green Tagline circle */}
                <div className="absolute right-2 sm:right-2 lg:right-4 bottom-4 sm:bottom-4 lg:bottom-6 w-[110px] h-[110px] sm:w-[130px] sm:h-[130px] lg:w-[190px] lg:h-[190px] rounded-full bg-forest-green border border-warm-gold/20 flex flex-col justify-center p-2.5 sm:p-4 lg:p-6 text-center text-white shadow-md z-30">
                  <span className="text-[8px] sm:text-[9px] lg:text-[11px] text-warm-gold uppercase tracking-[0.15em] font-semibold block mb-0.5 sm:mb-1 lg:mb-2">PORTALIS</span>
                  <p className="text-[8px] sm:text-[9px] lg:text-[11px] font-normal leading-relaxed tracking-wider">
                    Timeless design.<br />
                    Meaningful spaces.<br />
                    Inspired living.
                  </p>
                  <div className="w-6 sm:w-6 lg:w-8 h-[1px] bg-warm-gold/50 mx-auto mt-1 sm:mt-1 lg:mt-2" />
                </div>
              </div>
            </div>

            {/* Mission & Vision Banners (Image 1 style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 mt-20 pt-16 border-t border-forest-green/10 relative">
              {/* Mission Column */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-forest-green flex items-center justify-center text-warm-gold shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-3.42-3.485L12 10.5M3 15V8.25m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-3.42-3.485L12 3.75M3 8.25v6.75" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-warm-gold text-[11px] uppercase tracking-[0.25em] font-semibold mb-2">OUR MISSION</h4>
                  <p className="text-charcoal-black text-[12px] font-normal leading-relaxed">
                    To be the premier partner for spatial transformations across the GCC, recognized for redefining environments through architectural innovation, precision craftsmanship, and a seamless end-to-end approach that sets global benchmarks for quality and execution. By bridging imaginative design with flawless operational delivery, we aim to shape inspiring, sustainable spaces that elevate human experience and stand as timeless landmarks of excellence.
                  </p>
                </div>
              </div>

              {/* Vision Column */}
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-full bg-forest-green flex items-center justify-center text-warm-gold shrink-0 shadow-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.43 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-warm-gold text-[11px] uppercase tracking-[0.25em] font-semibold mb-2">OUR VISION</h4>
                  <p className="text-charcoal-black text-[12px] font-normal leading-relaxed">
                    To deliver turnkey, high-end design development and fit-out solutions across the hospitality, corporate, retail, and wellness sectors. We pledge to collaborate closely with our clients to transform their concepts into functional, inspiring, and cost-effective realities, navigating complex regulatory frameworks flawlessly and consistently honouring our commitments to timelines, budget, and environmental sustainability.
                  </p>
                </div>
              </div>

              {/* Gold Leaf Illustration in bottom right corner */}
              <div className="absolute right-0 -bottom-6 pointer-events-none opacity-20 hidden md:block">
                <svg className="w-36 h-36 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
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

        {/* STANDALONE CORE VALUES SECTION (PDF Page 3 - PREMIUM DARK FOREST GREEN RE-DESIGN) */}
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
                  <FoldText
                    text="Details That Matter."
                    trigger="scroll"
                    hinge="top"
                    duration={0.65}
                    stagger={0.045}
                    fontSize="inherit"
                    fontWeight="inherit"
                    color="var(--color-warm-gold)"
                    className="font-heading"
                    style={{ lineHeight: "inherit", letterSpacing: "inherit" }}
                    once={false}
                  />
                </h2>
                <p className="text-charcoal-black/80 text-xs sm:text-sm font-normal max-w-xl mt-4 leading-relaxed">
                  A curated collection of moments, textures, and compositions that reflect our design philosophy.
                </p>
              </div>

              {/* Interactive 3D Card Carousel */}
              <div className="pt-4">
                <CardCarousel
                  images={galleryCarouselImages}
                  autoplayDelay={2500}
                  showPagination={true}
                  showNavigation={true}
                />
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
                  <FoldText
                    text="EXPERTISE"
                    trigger="scroll"
                    hinge="top"
                    duration={0.65}
                    stagger={0.045}
                    fontSize="inherit"
                    fontWeight="inherit"
                    color="var(--color-warm-gold)"
                    className="font-bold font-heading"
                    style={{ lineHeight: "inherit", letterSpacing: "inherit" }}
                    once={false}
                  />{" "}
                  <span className="text-forest-green uppercase font-normal">IN</span>
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




            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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

        {/* SECTION 6: CONTACT & MAPS */}
        <section id="contact" className="py-16 md:py-24 px-6 md:px-12 bg-forest-green text-white relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left Column Details */}
              <div className="lg:col-span-5 flex flex-col space-y-8">
                <div>
                  <span className="text-warm-gold text-xs uppercase tracking-[0.3em] block mb-4">
                    Get In Touch
                  </span>
                  <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl leading-tight text-white mb-6">
                    Contact Us
                  </h2>
                  <p className="text-white text-sm font-normal leading-relaxed max-w-sm">
                    We would love to hear about your project. Reach out to us and let's create something beautiful together.
                  </p>
                </div>

                {/* Details list */}
                <div className="space-y-6 pt-8 border-t border-white/10">
                  <div className="flex items-start gap-4">
                    <MapPin size={18} className="text-warm-gold mt-1" />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-warm-gold">Address</h4>
                      <p className="text-white/95 text-xs font-normal mt-1">
                        Industrial Area 2, Ajman, UAE
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone size={18} className="text-warm-gold mt-1" />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-warm-gold">Phone</h4>
                      <p className="text-white/95 text-xs font-normal mt-1">
                        +971 55 522 2074
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail size={18} className="text-warm-gold mt-1" />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-warm-gold">Email</h4>
                      <p className="text-white/95 text-xs font-normal mt-1">
                        info@portalis.ae
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Clock size={18} className="text-warm-gold mt-1" />
                    <div>
                      <h4 className="text-[10px] uppercase tracking-[0.2em] font-medium text-warm-gold">Hours</h4>
                      <p className="text-white/95 text-xs font-normal mt-1">
                        Mon - Sat: 10:00 AM - 7:00 PM<br />Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                {/* Map preview block */}
                <div className="relative w-full h-[180px] border border-warm-gold/20 overflow-hidden">
                  <Image
                    src="/assets/extracted_img_p20_2_183.jpeg"
                    alt="Lunico Interior Detail Location Map Overlay"
                    fill
                    className="object-cover opacity-50"
                  />
                  <div className="absolute inset-0 bg-forest-green/20 flex items-center justify-center">
                    <div className="bg-forest-green border border-warm-gold p-3 flex items-center gap-2">
                      <MapPin size={14} className="text-warm-gold" />
                      <span className="text-[10px] uppercase tracking-widest text-white">Find Us On Map</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Form */}
              <div className="lg:col-span-7 flex flex-col p-6 md:p-10 lg:p-12 border border-warm-gold/20 bg-teal-green/10">
                <span className="text-warm-gold text-[10px] uppercase tracking-[0.25em] font-semibold mb-6 block">
                  Send Us A Message
                </span>
                <h3 className="font-heading text-2xl text-white mb-6">
                  Let's Start Your Dream Project
                </h3>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Lightbox for Portfolio Projects */}
      {activeProject && (
        <Lightbox
          isOpen={lightboxOpen}
          project={{
            title: activeProject.title,
            category: activeProject.category,
            desc: activeProject.desc,
            images: activeProject.images,
          }}
          currentIndex={activeImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={handleNextImage}
          onPrev={handlePrevImage}
          onSelectImage={(index) => setActiveImageIndex(index)}
        />
      )}
    </>
  );
}
