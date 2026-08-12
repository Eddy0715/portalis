import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ChevronLeft,
  CheckCircle2,
  PhoneCall,
  Mail,
  ArrowRight,
  Compass,
  Settings,
  Gem,
  Layers,
  MessageSquare,
  Pencil,
  ClipboardList,
  Hammer,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/* ───────────────────────── Service Data ───────────────────────── */

interface ServiceDetail {
  title: string;
  tagline: string;
  image: string;
  gallery: string[];
  description: string;
  pillars: { icon: string; label: string }[];
  process: { step: string; title: string; desc: string }[];
  whatsIncluded: string[];
  ctaHeadline: string;
  ctaDescription: string;
}

const servicesDetails: Record<string, ServiceDetail> = {
  "design-development": {
    title: "Design\nDevelopment",
    tagline:
      "We provide comprehensive architectural solutions that seamlessly bridge the gap between initial concept development and final detailed design, supported by precise technical drawings and meticulous material selection.",
    image: "/assets/extracted_img_p5_1_351.jpeg",
    gallery: [
      "/assets/extracted_img_p4_1_336.jpeg",
      "/assets/extracted_img_p13_6_936.jpeg",
      "/assets/extracted_img_p5_1_351.jpeg",
      "/assets/extracted_img_p3_1_322.jpeg",
    ],
    description:
      "We provide comprehensive architectural solutions that seamlessly bridge the gap between initial concept development and final detailed design, supported by precise technical drawings and meticulous material selection.",
    pillars: [
      { icon: "compass", label: "Concept to\nCompletion" },
      { icon: "settings", label: "Functional &\nComfortable" },
      { icon: "gem", label: "Timeless\nAesthetics" },
      { icon: "layers", label: "End-to-End\nManagement" },
    ],
    process: [
      { step: "01", title: "Consultation", desc: "We listen to your vision, understand your brand, and define your goals." },
      { step: "02", title: "Concept & Design", desc: "We create mood boards, layouts, and 3D concepts that bring your vision to life." },
      { step: "03", title: "Planning & Detailing", desc: "Detailed drawings, material schedules, and specifications are finalized." },
      { step: "04", title: "Execution", desc: "Our team manages every detail to deliver a flawless fit-out with precision." },
      { step: "05", title: "Final Styling", desc: "We add the perfect finishing touches to make your space truly unforgettable." },
    ],
    whatsIncluded: [
      "Space planning & layout design",
      "Custom furniture & décor selection",
      "3D visualization & renders",
      "Lighting & ambience design",
      "Material & finish selection",
      "Acoustic planning",
      "Project management & coordination",
      "Final styling & accessorizing",
    ],
    ctaHeadline: "Ready to Transform Your Space?",
    ctaDescription: "Let's create a space that elevates your brand and keeps your guests coming back.",
  },
  "turnkey-projects": {
    title: "Turnkey\nProjects",
    tagline:
      "An all-inclusive, end-to-end interior solution engineered to deliver absolute peace of mind — from concept to keys handover.",
    image: "/assets/extracted_img_p7_1_375.jpeg",
    gallery: [
      "/assets/extracted_img_p4_2_337.png",
      "/assets/extracted_img_p14_3_956.jpeg",
      "/assets/extracted_img_p7_1_375.jpeg",
      "/assets/extracted_img_p42_2_387.jpeg",
    ],
    description:
      "We completely own the project lifecycle, seamlessly driving execution from the initial creative concept to the final physical handover. Our team manages all materials, timelines, contractors, and certifications.",
    pillars: [
      { icon: "compass", label: "Complete\nOwnership" },
      { icon: "settings", label: "Budget\nControl" },
      { icon: "gem", label: "Quality\nAssured" },
      { icon: "layers", label: "On-Time\nDelivery" },
    ],
    process: [
      { step: "01", title: "Project Onboarding", desc: "Defining budget caps, material preferences, and target handover schedules." },
      { step: "02", title: "Procurement Setup", desc: "Sourcing luxury materials, custom fittings, and loose furniture from quality vendors." },
      { step: "03", title: "Authority Management", desc: "Obtaining all necessary fit-out permits and NOC certificates from master developers." },
      { step: "04", title: "Fit-out Construction", desc: "Supervising site installation, MEP routing, custom joinery, and layout fit-out." },
      { step: "05", title: "Final Certification", desc: "Inspecting all safety measures to secure municipal compliance and keys handover." },
    ],
    whatsIncluded: [
      "End-to-end project management",
      "Comprehensive material procurement",
      "In-house construction & fit-out",
      "Authority approvals & certifications",
      "Quality & safety audits (ISO standards)",
      "Bespoke furniture staging",
      "Defects liability warranty coverage",
      "Final handover documentation",
    ],
    ctaHeadline: "Ready to Start Your Turnkey Project?",
    ctaDescription: "Connect with us for a seamless, worry-free interior transformation.",
  },
  "corporate-interiors": {
    title: "Corporate\nInteriors",
    tagline:
      "Productivity-driven workspace solutions engineered to maximize operational efficiency, employee wellness, and brand identity.",
    image: "/assets/extracted_img_p6_1_361.jpeg",
    gallery: [
      "/assets/extracted_img_p4_3_338.jpeg",
      "/assets/extracted_img_p41_1_379.jpeg",
      "/assets/extracted_img_p6_1_361.jpeg",
    ],
    description:
      "We design corporate spaces that blend productivity, acoustic comfort, and clean architectural lines. Our corporate interior projects completely own the lifecycle, driving execution from workspace layouts to full authority approvals.",
    pillars: [
      { icon: "compass", label: "Workspace\nStrategy" },
      { icon: "settings", label: "Acoustic\nComfort" },
      { icon: "gem", label: "Brand\nIdentity" },
      { icon: "layers", label: "Regulatory\nCompliance" },
    ],
    process: [
      { step: "01", title: "Workspace Audit", desc: "Evaluating staff workflows, seating capacities, and meeting room layouts." },
      { step: "02", title: "Acoustic & Light Plan", desc: "Designing lighting configurations and sound-dampening structures." },
      { step: "03", title: "Furniture Specification", desc: "Sourcing ergonomic chairs, modular workstations, and executive desks." },
      { step: "04", title: "Fit-out Construction", desc: "Executing partitions, ceiling details, cable routing, and server room MEPs." },
      { step: "05", title: "Regulatory Checkoff", desc: "Managing DEWA load approvals and civil defense fire audits." },
    ],
    whatsIncluded: [
      "Productivity-driven spatial layout",
      "Acoustic and lighting engineering",
      "Ergonomic furniture procurement",
      "Server room & network cabling design",
      "Full regulatory permit management",
      "Executive suites & boardrooms setup",
      "Corporate brand styling & signage",
      "Post-handover support",
    ],
    ctaHeadline: "Ready to Elevate Your Workspace?",
    ctaDescription: "Let's create a workspace that inspires productivity and reflects your brand.",
  },
  "mep-systems": {
    title: "MEP\nSystems",
    tagline:
      "Ensuring your space performs as beautifully as it looks — from climate control and smart lighting to full authority approvals.",
    image: "/assets/extracted_img_p8_1_384.jpeg",
    gallery: [
      "/assets/extracted_img_p4_6_341.jpeg",
      "/assets/extracted_img_p12_1_420.jpeg",
      "/assets/extracted_img_p8_1_384.jpeg",
      "/assets/extracted_img_p12_1_126.jpeg",
    ],
    description:
      "Our turnkey MEP services flawlessly bridge the gap between stunning design and technical execution. From climate control and smart lighting to authority approvals, we engineer systems that run efficiently and safely.",
    pillars: [
      { icon: "compass", label: "Climate\nControl" },
      { icon: "settings", label: "Smart\nLighting" },
      { icon: "gem", label: "Fire\nSafety" },
      { icon: "layers", label: "Energy\nEfficiency" },
    ],
    process: [
      { step: "01", title: "Load Calculations", desc: "Evaluating electrical capacity, HVAC requirements, and plumbing loads." },
      { step: "02", title: "System Engineering", desc: "Designing fire fighting networks, LV infrastructures, and water supplies." },
      { step: "03", title: "Municipal Approvals", desc: "Submitting mechanical drawings to Dubai Municipality and DEWA." },
      { step: "04", title: "On-site Installation", desc: "Routing ducts, wiring, fire sprinklers, and plumbing channels on site." },
      { step: "05", title: "Safety Testing", desc: "Performing pressure tests, circuit balancing, and air-flow calibrations." },
    ],
    whatsIncluded: [
      "Advanced HVAC cooling & ventilation",
      "Electrical load calculations & DEWA setup",
      "Fire fighting sprinklers & alarm networks",
      "Low Voltage (LV) & digital cable systems",
      "Water plumbing & drainage schematics",
      "Clean emergency lighting infrastructures",
      "Energy-efficiency system engineering",
      "Complete testing & commissioning",
    ],
    ctaHeadline: "Ready for Flawless MEP Engineering?",
    ctaDescription: "Connect with our certified engineers to discuss your project's technical requirements.",
  },
  "fb-hospitality": {
    title: "F&B & Hospitality\nFit-Outs",
    tagline:
      "We create captivating restobar interiors that blend mood, music, and mixology into unforgettable experiences.",
    image: "/assets/extracted_img_p9_1_393.jpeg",
    gallery: [
      "/assets/extracted_img_p20_1_182.jpeg",
      "/assets/extracted_img_p23_1_203.jpeg",
      "/assets/extracted_img_p14_6_965.jpeg",
      "/assets/extracted_img_p16_6_1019.jpeg",
    ],
    description:
      "From concept to completion, we craft spaces that feel alive — sophisticated, inviting, and uniquely yours. Balancing immersive experiential design with rigorous commercial functionality.",
    pillars: [
      { icon: "compass", label: "Concept to\nCompletion" },
      { icon: "settings", label: "Functional &\nComfortable" },
      { icon: "gem", label: "Timeless\nAesthetics" },
      { icon: "layers", label: "End-to-End\nManagement" },
    ],
    process: [
      { step: "01", title: "Consultation", desc: "We listen to your vision, understand your brand, and define your goals." },
      { step: "02", title: "Concept & Design", desc: "We create mood boards, layouts, and 3D concepts that bring your vision to life." },
      { step: "03", title: "Planning & Detailing", desc: "Detailed drawings, material schedules, and specifications are finalized." },
      { step: "04", title: "Execution", desc: "Our team manages every detail to deliver a flawless fit-out with precision." },
      { step: "05", title: "Final Styling", desc: "We add the perfect finishing touches to make your restobar truly unforgettable." },
    ],
    whatsIncluded: [
      "Space planning & layout design",
      "Custom furniture & décor selection",
      "Bar counter & backbar joinery",
      "Lighting & ambience design",
      "Material & finish selection",
      "Acoustic planning",
      "Project management & coordination",
      "Final styling & accessorizing",
    ],
    ctaHeadline: "Ready to Transform Your Restobar?",
    ctaDescription: "Let's create a space that elevates your brand and keeps your guests coming back.",
  },
  "retail-wellness": {
    title: "Retail & Wellness\nHealthcare",
    tagline:
      "High-impact, fully compliant environments designed to maximize foot traffic and client comfort.",
    image: "/assets/extracted_img_p10_1_403.jpeg",
    gallery: [
      "/assets/extracted_img_p4_5_340.jpeg",
      "/assets/extracted_img_p26_1_224.jpeg",
      "/assets/extracted_img_p10_1_403.jpeg",
      "/assets/extracted_img_p13_4_930.jpeg",
    ],
    description:
      "We craft retail stores, spas, wellness salons, and clinical spaces engineered to elevate the customer journey with storefront visual impact, product staging, and relaxing spa environments.",
    pillars: [
      { icon: "compass", label: "Customer\nJourney" },
      { icon: "settings", label: "Visual\nImpact" },
      { icon: "gem", label: "Wellness\nFocused" },
      { icon: "layers", label: "DHA\nCompliant" },
    ],
    process: [
      { step: "01", title: "Customer Flow Mapping", desc: "Designing entryways, visual focal points, and checkout counters." },
      { step: "02", title: "Ambient Curation", desc: "Integrating soft lighting, sensory scents, and sound-dampening structures." },
      { step: "03", title: "Bespoke Display Builds", desc: "Fabricating custom shelving, garment racks, and cosmetic display units." },
      { step: "04", title: "Environmental Controls", desc: "Managing specialized ventilation, water lines, and utility connections." },
      { step: "05", title: "Mall / Developer NOC", desc: "Coordinating permits with major retail mall managements." },
    ],
    whatsIncluded: [
      "Experiential retail visual design",
      "Holistic spa & wellness layouts",
      "Specialized lighting & HVAC controls",
      "Custom storefront & shelving joinery",
      "Mall management permit coordination",
      "Advanced utility connections design",
      "High-spec finish material procurement",
      "Post-opening support",
    ],
    ctaHeadline: "Ready to Elevate Your Retail Space?",
    ctaDescription: "Let's create an environment that drives traffic and delights customers.",
  },
  "joinery-services": {
    title: "Joinery\nServices",
    tagline:
      "Bespoke woodwork and architectural fixtures manufactured in our advanced in-house facility in Ajman, UAE.",
    image: "/assets/extracted_img_p11_1_411.jpeg",
    gallery: [
      "/assets/extracted_img_p4_7_342.jpeg",
      "/assets/extracted_img_p16_3_1010.jpeg",
      "/assets/extracted_img_p11_1_411.jpeg",
      "/assets/extracted_img_p17_2_1029.jpeg",
    ],
    description:
      "An end-to-end interior joinery solution delivering absolute peace of mind. Powered by our advanced, in-house manufacturing facility, we craft bespoke woodwork, wall paneling, and luxury furniture with structural precision.",
    pillars: [
      { icon: "compass", label: "Precision\nCrafted" },
      { icon: "settings", label: "In-House\nFactory" },
      { icon: "gem", label: "Premium\nFinishes" },
      { icon: "layers", label: "On-Site\nInstallation" },
    ],
    process: [
      { step: "01", title: "Site Laser Scan", desc: "Taking precise structural dimensions on-site to eliminate gaps." },
      { step: "02", title: "Shop Drawings", desc: "Developing detailed woodwork fabrication drafts with veneer and hardware specs." },
      { step: "03", title: "In-House Factory Build", desc: "Cutting, veneering, lacquering, and assembling wood sections in our workshop." },
      { step: "04", title: "Lacquering & Finishing", desc: "Applying highly durable polyurethanes, varnishes, and custom polishes." },
      { step: "05", title: "Precision Fitting", desc: "On-site installation and hardware alignment overseen by joinery engineers." },
    ],
    whatsIncluded: [
      "Advanced site laser scans",
      "Detailed joinery shop drawings",
      "In-house wood & veneer manufacturing",
      "Architectural wall paneling & cladding",
      "Bespoke tables, desks & wardrobes",
      "Premium hardware & soft-close spec",
      "Factory-controlled lacquering & paint",
      "On-site fitting & alignment",
    ],
    ctaHeadline: "Ready for Bespoke Joinery?",
    ctaDescription: "Let's craft custom woodwork that elevates your interior to the next level.",
  },
  "approvals-compliance": {
    title: "Approvals &\nCompliance",
    tagline:
      "Clearing Dubai's legal, technical, and regulatory landscapes for on-time openings with zero compliance risk.",
    image: "/assets/extracted_img_p12_1_420.jpeg",
    gallery: [
      "/assets/extracted_img_p4_8_344.jpeg",
      "/assets/extracted_img_p13_5_933.jpeg",
      "/assets/extracted_img_p12_1_420.jpeg",
      "/assets/extracted_img_p3_1_322.jpeg",
    ],
    description:
      "We manage the entire legal, technical, and regulatory landscape, clearing all bureaucracy to ensure your project stays perfectly legal, code-compliant, and on track for an on-time opening.",
    pillars: [
      { icon: "compass", label: "Municipality\nDrawings" },
      { icon: "settings", label: "Civil Defense\nApprovals" },
      { icon: "gem", label: "DEWA\nClearances" },
      { icon: "layers", label: "Developer\nNOCs" },
    ],
    process: [
      { step: "01", title: "Technical Drawing Audit", desc: "Checking fit-out layouts against DM, Civil Defense, and developer guidelines." },
      { step: "02", title: "Submissions & NOCs", desc: "Drafting and uploading plans to authority portals (Municipality, DDA, Trakhees)." },
      { step: "03", title: "Fire Safety Sign-off", desc: "Securing Civil Defense approvals for fire sprinklers and emergency systems." },
      { step: "04", title: "Utility Approvals", desc: "Coordinating electrical loads and plumbing connections with DEWA." },
      { step: "05", title: "Final Inspection Clear", desc: "Managing site inspector walkthroughs for final conformity certificates." },
    ],
    whatsIncluded: [
      "Turnkey authority NOC management",
      "Dubai Municipality drawings submission",
      "Dubai Civil Defense approvals & signs",
      "Trakhees / DDA freezone fit-out permits",
      "DEWA load clearances & meter hookups",
      "Developer NOC (Emaar, Nakheel, etc.)",
      "Final occupancy & sign-off handovers",
      "Ongoing compliance advisory",
    ],
    ctaHeadline: "Need Fast Authority Approvals?",
    ctaDescription: "Let us handle the regulatory complexity so you can focus on your business.",
  },
};

/* ───────────────────────── Helpers ───────────────────────── */

const pillarIcons: Record<string, React.ReactNode> = {
  compass: <Compass size={24} />,
  settings: <Settings size={24} />,
  gem: <Gem size={24} />,
  layers: <Layers size={24} />,
};

const processIcons = [
  <MessageSquare key="msg" size={20} />,
  <Pencil key="pen" size={20} />,
  <ClipboardList key="clip" size={20} />,
  <Hammer key="ham" size={20} />,
  <Sparkles key="spark" size={20} />,
];

/* ───────────────────────── Static Params ───────────────────────── */

export async function generateStaticParams() {
  return [
    { slug: "design-development" },
    { slug: "turnkey-projects" },
    { slug: "corporate-interiors" },
    { slug: "mep-systems" },
    { slug: "fb-hospitality" },
    { slug: "retail-wellness" },
    { slug: "joinery-services" },
    { slug: "approvals-compliance" },
  ];
}

/* ───────────────────────── Page ───────────────────────── */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const detail = servicesDetails[slug];

  if (!detail) {
    notFound();
  }

  const subject = encodeURI(`Inquiry - ${detail.title.replace("\n", " ")}`);
  const messageText = `Hi Portalis Interiors, I'm interested in your ${detail.title.replace("\n", " ")} service. Please provide more details.`;
  const encodedText = encodeURIComponent(messageText);
  const whatsappUrl = `https://wa.me/971555222074?text=${encodedText}`;
  const mailtoUrl = `mailto:info@portalis.ae?subject=${subject}&body=${encodedText}`;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-light-cream text-charcoal-black font-body">

        {/* ════════════════════════════════════════════════════════
            SECTION 1 — HERO (Split: Left Text + Right Image)
            Matches Reference PDF Page 8 layout exactly
        ════════════════════════════════════════════════════════ */}
        <section className="bg-light-cream pt-28 pb-16 px-6 md:px-12 border-b border-forest-green/10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column — Back Link + Title + Tagline */}
            <div className="flex flex-col space-y-6">
              <Link
                href="/services"
                className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-forest-green/60 hover:text-warm-gold transition-colors duration-300 font-medium w-fit"
              >
                <ChevronLeft size={14} /> Back to Services
              </Link>

              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-forest-green leading-[1.1] whitespace-pre-line">
                {detail.title}
              </h1>

              <p className="text-charcoal-black text-sm sm:text-base font-normal leading-relaxed max-w-lg">
                {detail.tagline}
              </p>

              {/* 4 Icon Pillars Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-forest-green/10 mt-2">
                {detail.pillars.map((pillar, idx) => (
                  <div key={idx} className="flex flex-col items-center text-center gap-3">
                    <div className="w-12 h-12 rounded-full border border-warm-gold/30 flex items-center justify-center text-forest-green">
                      {pillarIcons[pillar.icon] || <Compass size={24} />}
                    </div>
                    <span className="text-[10px] text-forest-green font-medium leading-tight whitespace-pre-line tracking-wide uppercase">
                      {pillar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column — Large Hero Image */}
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-lg border border-warm-gold/15">
              <Image
                src={detail.image}
                alt={detail.title.replace("\n", " ")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — OUR DESIGN PROCESS
            Left: Title + CTA | Right: 5-Step Horizontal Timeline
        ════════════════════════════════════════════════════════ */}
        <section className="bg-white py-20 px-6 md:px-12 border-b border-forest-green/8">
          <div className="max-w-7xl mx-auto">

            {/* Top Row: Title + Button | Side by Side */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-16">
              <div className="lg:col-span-4 flex flex-col space-y-5">
                <h2 className="font-heading text-3xl sm:text-4xl text-forest-green leading-tight">
                  Our Design Process
                </h2>
                <p className="text-charcoal-black text-sm font-normal leading-relaxed">
                  A seamless journey from concept to your dream realization.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-forest-green hover:bg-warm-gold text-white text-[10px] uppercase tracking-[0.2em] font-semibold py-3.5 px-6 transition-all duration-300 w-fit flex items-center gap-2 mt-2"
                >
                  Book a Consultation <ArrowRight size={12} />
                </a>
              </div>

              {/* Horizontal 5-Step Timeline */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-5 gap-0 relative">
                  {detail.process.map((step, idx) => (
                    <div key={step.step} className="flex flex-col items-center text-center relative px-1">
                      {/* Icon Circle */}
                      <div className="w-11 h-11 rounded-full border border-warm-gold/40 flex items-center justify-center text-forest-green bg-light-cream mb-4 relative z-10">
                        {processIcons[idx]}
                      </div>

                      {/* Connecting Arrow (not on last) */}
                      {idx < detail.process.length - 1 && (
                        <div className="absolute top-5 left-[calc(50%+22px)] right-[calc(-50%+22px)] h-[1px] bg-forest-green/15 z-0 hidden lg:block">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[5px] border-l-forest-green/30 border-y-[3px] border-y-transparent" />
                        </div>
                      )}

                      {/* Step Number */}
                      <span className="text-warm-gold text-[10px] font-semibold tracking-[0.15em] mb-1.5">
                        {step.step}
                      </span>

                      {/* Title */}
                      <h4 className="font-heading text-xs sm:text-sm text-forest-green font-semibold leading-tight mb-2">
                        {step.title}
                      </h4>

                      {/* Description */}
                      <p className="text-charcoal-black/55 text-[10px] font-normal leading-relaxed hidden sm:block">
                        {step.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — WHAT'S INCLUDED
        ════════════════════════════════════════════════════════ */}
        <section className="bg-light-cream py-20 px-6 md:px-12 border-b border-forest-green/8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* Left: Title */}
            <div className="lg:col-span-4">
              <h2 className="font-heading text-3xl sm:text-4xl text-forest-green leading-tight">
                What's Included
              </h2>
              <div className="h-[2px] w-10 bg-warm-gold/60 mt-4" />
            </div>

            {/* Right: Checklist Grid */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {detail.whatsIncluded.map((item) => (
                  <div key={item} className="flex items-start gap-3 py-2 border-b border-forest-green/5 last:border-b-0">
                    <CheckCircle2 size={16} className="text-warm-gold mt-0.5 shrink-0" />
                    <span className="text-charcoal-black/80 text-sm font-normal">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>



        {/* ════════════════════════════════════════════════════════
            SECTION 5 — CTA BANNER (Full Width)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-forest-green py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-full border border-warm-gold/30 flex items-center justify-center text-warm-gold shrink-0">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl text-white leading-tight">
                  {detail.ctaHeadline}
                </h3>
                <p className="text-white/85 text-xs sm:text-sm font-normal mt-1">
                  {detail.ctaDescription}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-warm-gold hover:bg-white text-forest-green text-[10px] uppercase tracking-[0.2em] font-semibold py-3.5 px-6 text-center transition-all duration-300 flex items-center justify-center gap-2"
              >
                <PhoneCall size={12} /> Book a Consultation <ArrowRight size={12} />
              </a>
              <a
                href={mailtoUrl}
                className="border border-white/25 hover:border-white text-white text-[10px] uppercase tracking-[0.2em] font-semibold py-3.5 px-6 text-center transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Mail size={12} /> Email Us
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
