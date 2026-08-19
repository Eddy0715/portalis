import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, PenTool, ShieldCheck, Star, Eye } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Counter from "@/components/ui/Counter";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-light-cream text-charcoal-black font-body">

        {/* ════════════════════════════════════════════════════════
            SECTION 1 — HERO: OUR STORY + IMAGE GRID
            Exact match to reference PDF about page layout
        ════════════════════════════════════════════════════════ */}
        <section className="pt-28 pb-20 px-6 md:px-12">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col justify-between">

              {/* OUR STORY label */}
              <div className="space-y-8">
                <div>
                  <span className="text-warm-gold text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
                    OUR STORY
                  </span>
                  <div className="h-[2px] w-10 bg-warm-gold/60" />
                </div>

                {/* Large Serif Headline */}
                <h1 className="font-heading text-4xl sm:text-5xl md:text-[3.5rem] text-forest-green leading-[1.12]">
                  Designing <span className="italic font-normal">Spaces.</span>
                  <br />
                  Enhancing <span className="italic font-normal">Lives.</span>
                </h1>

                {/* Body Copy */}
                <div className="space-y-4 max-w-md">
                  <p className="text-charcoal-black text-sm font-normal leading-relaxed">
                    At Portalis Interiors, we believe that great design goes
                    beyond aesthetics. It shapes the way you live, work,
                    and feel every day.
                  </p>
                  <p className="text-charcoal-black text-sm font-normal leading-relaxed">
                    Our approach is rooted in understanding your vision and
                    crafting interiors that are timeless, functional, and
                    uniquely yours.
                  </p>
                </div>

                {/* LEARN MORE link */}
                <Link
                  href="/#portfolio"
                  className="group inline-flex items-center gap-3 text-forest-green hover:text-warm-gold text-[10px] uppercase tracking-[0.25em] font-semibold pt-2 transition-colors duration-300"
                >
                  Learn More
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>

              {/* ── 3 Value Blocks ── */}
              <div className="space-y-8 pt-12 mt-8 border-t border-forest-green/10">
                {/* Client Focused */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full border border-warm-gold/35 flex items-center justify-center text-warm-gold shrink-0">
                    <Users size={22} />
                  </div>
                  <div>
                    <h4 className="text-forest-green text-xs uppercase tracking-[0.2em] font-bold mb-1.5">
                      Client Focused
                    </h4>
                    <p className="text-charcoal-black text-xs font-normal leading-relaxed max-w-xs">
                      We listen, collaborate, and tailor
                      every detail to reflect your
                      lifestyle and goals.
                    </p>
                  </div>
                </div>

                {/* Thoughtful Design */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full border border-warm-gold/35 flex items-center justify-center text-warm-gold shrink-0">
                    <PenTool size={22} />
                  </div>
                  <div>
                    <h4 className="text-forest-green text-xs uppercase tracking-[0.2em] font-bold mb-1.5">
                      Thoughtful Design
                    </h4>
                    <p className="text-charcoal-black text-xs font-normal leading-relaxed max-w-xs">
                      Every space is carefully planned
                      to balance beauty, comfort,
                      and functionality.
                    </p>
                  </div>
                </div>

                {/* Quality Assured */}
                <div className="flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full border border-warm-gold/35 flex items-center justify-center text-warm-gold shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h4 className="text-forest-green text-xs uppercase tracking-[0.2em] font-bold mb-1.5">
                      Quality Assured
                    </h4>
                    <p className="text-charcoal-black text-xs font-normal leading-relaxed max-w-xs">
                      We use premium materials and
                      work with skilled craftsmen to
                      deliver excellence.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Mission & Vision ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 mt-8 border-t border-forest-green/10">
                {/* Mission */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full border border-warm-gold/30 flex items-center justify-center text-warm-gold shrink-0">
                    <Star size={16} />
                  </div>
                  <div>
                    <h5 className="text-forest-green text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                      Our Mission
                    </h5>
                    <p className="text-charcoal-black text-[11px] font-normal leading-relaxed">
                      To be the premier partner for spatial transformations across the GCC, recognized for redefining environments through architectural innovation, precision craftsmanship, and a seamless end-to-end approach that sets global benchmarks for quality and execution. By bridging imaginative design with flawless operational delivery, we aim to shape inspiring, sustainable spaces that elevate human experience and stand as timeless landmarks of excellence.
                    </p>
                  </div>
                </div>

                {/* Vision */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full border border-warm-gold/30 flex items-center justify-center text-warm-gold shrink-0">
                    <Eye size={16} />
                  </div>
                  <div>
                    <h5 className="text-forest-green text-[10px] uppercase tracking-[0.2em] font-bold mb-1">
                      Our Vision
                    </h5>
                    <p className="text-charcoal-black text-[11px] font-normal leading-relaxed">
                      To deliver turnkey, high-end design development and fit-out solutions across the hospitality, corporate, retail, and wellness sectors. We pledge to collaborate closely with our clients to transform their concepts into functional, inspiring, and cost-effective realities, navigating complex regulatory frameworks flawlessly and consistently honouring our commitments to timelines, budget, and environmental sustainability.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN — IMAGE GRID ── */}
            <div className="flex flex-col gap-4">
              {/* Row 1: Single large wide image */}
              <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden border border-warm-gold/15 shadow-sm">
                <Image
                  src="/assets/extracted_img_p20_1_182.jpeg"
                  alt="Lunico Restobar La Mer interior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>

              {/* Row 2: 2 images side by side */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden border border-warm-gold/15 shadow-sm">
                  <Image
                    src="/assets/extracted_img_p23_1_203.jpeg"
                    alt="Lekki Restobar Jumeirah interior"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="relative w-full aspect-[4/3] rounded-[16px] overflow-hidden border border-warm-gold/15 shadow-sm">
                  <Image
                    src="/assets/extracted_img_p14_6_965.jpeg"
                    alt="Indi16 Business Bay restobar"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              </div>

              {/* Row 3: 3 images side by side */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="relative w-full aspect-[3/2] sm:aspect-[3/4] rounded-[16px] overflow-hidden border border-warm-gold/15 shadow-sm">
                  <Image
                    src="/assets/extracted_img_p15_4_986.jpeg"
                    alt="Nox Citywalk cocktail lounge"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="relative w-full aspect-[3/2] sm:aspect-[3/4] rounded-[16px] overflow-hidden border border-warm-gold/15 shadow-sm">
                  <Image
                    src="/assets/extracted_img_p13_3_924.jpeg"
                    alt="Daikan Citywalk ramen bistro"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="relative w-full aspect-[3/2] sm:aspect-[3/4] rounded-[16px] overflow-hidden border border-warm-gold/15 shadow-sm">
                  <Image
                    src="/assets/extracted_img_p7_1_375.jpeg"
                    alt="Schneider Electric corporate office"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 2 — EXPERIENCE & GUINNESS RECORD
        ════════════════════════════════════════════════════════ */}
        <section className="bg-forest-green py-20 px-6 md:px-12 border-t border-b border-warm-gold/20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 items-center text-center">

            {/* 15 Years */}
            <div className="flex flex-col items-center gap-3">
              <span className="font-heading text-5xl sm:text-6xl text-warm-gold font-semibold">
                <Counter value={15} />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white font-normal">
                Years of Experience
              </span>
            </div>

            {/* Guinness Record */}
              <div className="flex flex-col items-center gap-3 border-x border-warm-gold/20 py-4 hidden sm:flex">
              <div className="w-14 h-14 rounded-full border border-warm-gold/40 flex items-center justify-center">
                <svg className="w-7 h-7 text-warm-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-6.624V2.721" />
                </svg>
              </div>
              <span className="text-warm-gold text-xs uppercase tracking-[0.2em] font-semibold">
                Guinness World Record
              </span>
              <span className="text-white/85 text-[11px] font-normal leading-relaxed max-w-xs">
                Holder for milestone achievements in design & execution excellence.
              </span>
            </div>

            {/* Projects Delivered */}
            <div className="flex flex-col items-center gap-3">
              <span className="font-heading text-5xl sm:text-6xl text-warm-gold font-semibold">
                <Counter value={200} suffix="+" />
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-white font-normal">
                Projects Delivered
              </span>
            </div>

          </div>
        </section>

        {/* ════════════════════════════════════════════════════════
            SECTION 3 — CORE VALUES GRID (6 cards)
        ════════════════════════════════════════════════════════ */}
        <section className="bg-light-cream py-20 px-6 md:px-12 border-b border-forest-green/8">
          <div className="max-w-7xl mx-auto">

            <div className="text-center mb-16 space-y-4">
              <span className="text-warm-gold text-xs uppercase tracking-[0.3em] font-semibold block">
                Our Principles
              </span>
              <div className="h-[1px] w-8 bg-warm-gold/60 mx-auto" />
              <h2 className="font-heading text-3xl sm:text-4xl text-forest-green">
                Our Core Values
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499c.173-.443.867-.443 1.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385c.116.486-.421.878-.83.606l-4.707-2.316a.562.562 0 00-.47 0L5.94 16.931c-.409.272-.946-.12-.83-.606l1.285-5.385a.562.562 0 00-.182-.557l-4.204-3.602c-.38-.325-.178-.948.32-.988l5.519-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ),
                  title: "Elite Craftsmanship & Quality",
                  desc: "Exceptional workmanship and unwavering adherence to the highest standards, utilizing premium-quality materials.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                    </svg>
                  ),
                  title: "Client-Centric Partnership",
                  desc: "Viewing our clients as true partners, working closely to deliver tailored solutions that align with their vision.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M18.75 4.236c.982.143 1.954.317 2.916.52A6.003 6.003 0 0016.27 9.728M18.75 4.236V4.5c0 2.108-.966 3.99-2.48 5.228m0 0a6.023 6.023 0 01-2.77.896m5.25-6.624V2.721" />
                    </svg>
                  ),
                  title: "Record-Breaking Innovation",
                  desc: "Constantly pushing the boundaries of what is possible.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                  title: "Integrity in Commitments",
                  desc: "Consistently honoring our budget and timeline commitments to deliver absolute peace of mind.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                    </svg>
                  ),
                  title: "End-to-End Excellence",
                  desc: "Owning the entire project lifecycle seamlessly from the initial concept design to final authority clearances.",
                },
                {
                  icon: (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  ),
                  title: "Environmental Stewardship",
                  desc: "Prioritizing sustainable methods, materials, and processes to create responsible and beautiful environments.",
                },
              ].map((value, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-warm-gold/15 p-8 flex flex-col space-y-4 transition-all duration-300 hover:shadow-md hover:border-warm-gold/40 group"
                >
                  <div className="w-12 h-12 rounded-full border border-warm-gold/30 flex items-center justify-center text-warm-gold group-hover:bg-warm-gold group-hover:text-white transition-all duration-300 shrink-0">
                    {value.icon}
                  </div>
                  <h4 className="font-heading text-base text-forest-green font-semibold group-hover:text-warm-gold transition-colors duration-300">
                    {value.title}
                  </h4>
                  <p className="text-charcoal-black text-xs font-normal leading-relaxed">
                    {value.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>



        {/* ════════════════════════════════════════════════════════
            SECTION 4 — CTA BANNER
        ════════════════════════════════════════════════════════ */}
        <section className="bg-forest-green py-16 px-6 md:px-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white leading-tight">
                Let's Build Something Beautiful Together
              </h3>
              <p className="text-white/85 text-sm font-normal mt-2 max-w-lg">
                Whether it's a luxury residence, a buzzing restaurant, or a modern workspace — we bring your vision to life.
              </p>
            </div>
            <Link
              href="/#contact"
              className="bg-warm-gold hover:bg-white text-forest-green text-[10px] uppercase tracking-[0.2em] font-semibold py-4 px-8 transition-all duration-300 flex items-center gap-2 shrink-0"
            >
              Start Your Project <ArrowRight size={12} />
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
