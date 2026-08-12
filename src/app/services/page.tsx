"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  image: string;
  description: string;
  whatsIncluded: string[];
}

const servicesList: ServiceDetail[] = [
  {
    slug: "design-development",
    title: "Design Development",
    tagline: "We provide comprehensive architectural solutions that seamlessly bridge the gap between initial concept development and final detailed design.",
    image: "/assets/extracted_img_p5_1_351.jpeg",
    description: "Our design development service translates creative ideas into technically sound design layouts. We deliver precise architectural plans, 3D renderings, and detailed material specifications to ensure seamless fit-out execution.",
    whatsIncluded: [
      "Space planning & layout design",
      "Custom furniture & décor selection",
      "3D visualization & renders",
      "Lighting & ambience design",
      "Material & finish selection",
      "Project management & coordination",
    ],
  },
  {
    slug: "turnkey-projects",
    title: "Turnkey Projects",
    tagline: "An all-inclusive, end-to-end interior solution engineered to deliver absolute peace of mind — from concept to keys handover.",
    image: "/assets/extracted_img_p7_1_375.jpeg",
    description: "We completely own the project lifecycle, seamlessly driving execution from the initial creative concept to the final physical handover. Our team manages all materials, timelines, contractors, and authority compliance certifications.",
    whatsIncluded: [
      "End-to-end project management",
      "Comprehensive material procurement",
      "In-house construction & fit-out",
      "Authority approvals & clearances",
      "Quality & safety audits",
      "Defects liability warranty coverage",
    ],
  },
  {
    slug: "corporate-interiors",
    title: "Corporate Interiors",
    tagline: "Productivity-driven workspace solutions engineered to maximize operational efficiency, employee wellness, and brand identity.",
    image: "/assets/extracted_img_p6_1_361.jpeg",
    description: "We design corporate spaces that blend productivity, acoustic comfort, and clean architectural lines. Our corporate interior projects completely own the lifecycle, driving execution from workspace layouts to full authority approvals.",
    whatsIncluded: [
      "Productivity-driven spatial layout",
      "Acoustic and lighting engineering",
      "Ergonomic furniture procurement",
      "Server room & network cabling design",
      "Full regulatory permit management",
      "Executive suites & boardrooms setup",
    ],
  },
  {
    slug: "mep-systems",
    title: "MEP Systems",
    tagline: "Ensuring your space performs as beautifully as it looks — from climate control and smart lighting to full authority approvals.",
    image: "/assets/extracted_img_p8_1_384.jpeg",
    description: "Our turnkey MEP services flawlessly bridge the gap between stunning design and technical execution. From climate control and smart lighting to authority approvals, we engineer systems that run efficiently and safely.",
    whatsIncluded: [
      "Advanced HVAC cooling & ventilation",
      "Electrical load calculations & DEWA setup",
      "Fire fighting sprinklers & alarm networks",
      "Low Voltage (LV) & digital cable systems",
      "Water plumbing & drainage schematics",
      "Complete testing & commissioning",
    ],
  },
  {
    slug: "fb-hospitality",
    title: "F&B & Hospitality Fit-Outs",
    tagline: "We create captivating restobar interiors that blend mood, music, and mixology into unforgettable experiences.",
    image: "/assets/extracted_img_p9_1_393.jpeg",
    description: "From concept to completion, we craft spaces that feel alive — sophisticated, inviting, and uniquely yours. Balancing immersive experiential design with rigorous commercial functionality.",
    whatsIncluded: [
      "Space planning & layout design",
      "Custom furniture & décor selection",
      "Bar counter & backbar joinery",
      "Lighting & ambience design",
      "Acoustic planning",
      "Project management & coordination",
    ],
  },
  {
    slug: "retail-wellness",
    title: "Retail & Wellness Healthcare",
    tagline: "High-impact, fully compliant environments designed to maximize foot traffic and client comfort.",
    image: "/assets/extracted_img_p10_1_403.jpeg",
    description: "We craft retail stores, spas, wellness salons, and clinical spaces engineered to elevate the customer journey with storefront visual impact, product staging, and relaxing spa environments.",
    whatsIncluded: [
      "Experiential retail visual design",
      "Holistic spa & wellness layouts",
      "Specialized lighting & HVAC controls",
      "Custom storefront & shelving joinery",
      "Mall management permit coordination",
      "Advanced utility connections design",
    ],
  },
  {
    slug: "joinery-services",
    title: "Joinery Services",
    tagline: "Bespoke woodwork and architectural fixtures manufactured in our advanced in-house facility in Ajman, UAE.",
    image: "/assets/extracted_img_p11_1_411.jpeg",
    description: "An end-to-end interior joinery solution delivering absolute peace of mind. Powered by our advanced, in-house manufacturing facility, we craft bespoke woodwork, wall paneling, and luxury furniture with structural precision.",
    whatsIncluded: [
      "Advanced site laser scans",
      "Detailed joinery shop drawings",
      "In-house wood & veneer manufacturing",
      "Architectural wall paneling & cladding",
      "Bespoke tables, desks & wardrobes",
      "On-site fitting & alignment",
    ],
  },
  {
    slug: "approvals-compliance",
    title: "Approvals & Compliance",
    tagline: "Clearing Dubai's legal, technical, and regulatory landscapes for on-time openings with zero compliance risk.",
    image: "/assets/extracted_img_p12_1_420.jpeg",
    description: "We manage the entire legal, technical, and regulatory landscape, clearing all bureaucracy to ensure your project stays perfectly legal, code-compliant, and on track for an on-time opening.",
    whatsIncluded: [
      "Turnkey authority NOC management",
      "Dubai Municipality drawings submission",
      "Dubai Civil Defense approvals & signs",
      "Trakhees / DDA fit-out permits",
      "DEWA load clearances & meter hookups",
      "Developer NOC (Emaar, Nakheel, etc.)",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-light-cream text-charcoal-black font-body pt-28 pb-20 overflow-hidden">
        
        {/* Page Header */}
        <section className="px-6 md:px-12 mb-16 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-warm-gold text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
              OUR EXPERTISE
            </span>
            <div className="h-[2px] w-10 bg-warm-gold/60 mb-6" />
            <h1 className="font-heading text-4xl sm:text-5xl md:text-[3.5rem] text-forest-green leading-tight">
              Our Services
            </h1>
            <p className="text-charcoal-black text-sm sm:text-base font-normal leading-relaxed max-w-2xl mt-4">
              We deliver high-end, bespoke interior fit-out and design solutions. From creative development to technical execution and authority compliance, our specialized services guarantee perfection.
            </p>
          </motion.div>
        </section>

        {/* Services Alternating Grid List */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto space-y-16 md:space-y-32">
          {servicesList.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 70, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-16 border-t border-forest-green/10 first:border-t-0 first:pt-0"
              >
                {/* Image Box */}
                <div
                  className={`lg:col-span-6 relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-warm-gold/15 shadow-md ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover hover:scale-[1.03] transition-transform duration-700"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                {/* Text Content Box */}
                <div
                  className={`lg:col-span-6 flex flex-col space-y-6 ${
                    isEven ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <span className="text-warm-gold text-[10px] uppercase tracking-[0.25em] font-semibold">
                    Service {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-4xl text-forest-green leading-snug">
                    {service.title}
                  </h2>
                  <p className="text-charcoal-black text-sm font-normal leading-relaxed">
                    {service.description}
                  </p>

                  {/* Included Items checklist */}
                  <div className="space-y-3 pt-2">
                    <span className="text-[10px] uppercase tracking-wider text-warm-gold font-semibold block">
                      Key Highlights
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.whatsIncluded.map((item, key) => (
                        <div key={key} className="flex items-center gap-2 text-xs text-charcoal-black">
                          <CheckCircle2 size={14} className="text-warm-gold shrink-0" />
                          <span className="font-normal">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Explore Button */}
                  <div className="pt-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="circle-reveal-btn border border-warm-gold/50 px-6 py-2.5 text-[10px] uppercase tracking-[0.25em] text-warm-gold hover:text-white hover:border-warm-gold font-medium transition-colors duration-300 inline-flex items-center gap-3 w-fit"
                    >
                      Explore Service Details
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </section>

      </main>

      <Footer />
    </>
  );
}
