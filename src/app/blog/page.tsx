"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blogData";

/* ─────────── helpers ─────────── */
function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr.toUpperCase();
  return d
    .toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase();
}

function padNum(n: number) {
  return String(n).padStart(2, "0");
}

/* ─────────── card variants ─────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], delay: i * 0.07 },
  }),
};

/* ══════════════════════════════════════
   FEATURED CARD  (large numbered dark card)
══════════════════════════════════════ */
function FeaturedCard({
  post,
  index,
}: {
  post: (typeof blogPosts)[0];
  index: number;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <motion.div
        custom={index}
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="blog-glass-card blog-glass-card--featured relative flex flex-col justify-between w-full aspect-square p-7 sm:p-9 rounded-[20px] overflow-hidden cursor-pointer"
      >
        {/* Background image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-500" />
        </div>

        {/* Glass green hover overlay */}
        <div className="blog-glass-overlay absolute inset-0 z-10 rounded-[20px] pointer-events-none" />

        {/* Content */}
        <div className="relative z-20 flex flex-col h-full">
          {/* Number */}
          <span className="font-heading text-[5rem] sm:text-[7rem] leading-none text-white/20 select-none -mt-2 mb-auto">
            {padNum(index + 1)}
          </span>

          <div className="mt-auto space-y-3">
            {/* Date */}
            <p className="text-warm-gold text-[10px] tracking-[0.28em] font-semibold uppercase">
              {formatDate(post.publishedAt)}
            </p>

            {/* Title */}
            <h2 className="font-heading text-xl sm:text-2xl text-white leading-snug group-hover:text-warm-gold transition-colors duration-400">
              {post.title}
            </h2>

            {/* CTA */}
            <div className="flex items-center gap-3 pt-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-semibold group-hover:text-warm-gold transition-colors duration-300">
                View Details
              </span>
              <span className="w-8 h-8 rounded-full border border-white/30 flex items-center justify-center group-hover:border-warm-gold group-hover:bg-warm-gold/10 transition-all duration-300">
                <ArrowRight size={13} className="text-white/70 group-hover:text-warm-gold transition-colors duration-300" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ══════════════════════════════════════
   GRID CARD  (same dark style as FeaturedCard)
══════════════════════════════════════ */
function GridCard({
  post,
  index,
}: {
  post: (typeof blogPosts)[0];
  index: number;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <motion.div
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={cardVariants}
        className="blog-glass-card blog-glass-card--featured relative flex flex-col justify-between w-full aspect-square p-6 rounded-[20px] overflow-hidden cursor-pointer"
      >
        {/* Background image with dark overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-500" />
        </div>

        {/* Glass green hover overlay */}
        <div className="blog-glass-overlay absolute inset-0 z-10 rounded-[20px] pointer-events-none" />

        <div className="relative z-20 flex flex-col h-full">
          {/* Number */}
          <span className="font-heading text-[4rem] sm:text-[5.5rem] leading-none text-white/20 select-none -mt-2 mb-auto">
            {padNum(index + 1)}
          </span>

          <div className="mt-auto space-y-3">
            {/* Date */}
            <p className="text-warm-gold text-[10px] tracking-[0.28em] font-semibold uppercase">
              {formatDate(post.publishedAt)}
            </p>

            {/* Title */}
            <h3 className="font-heading text-lg sm:text-xl text-white leading-snug group-hover:text-warm-gold transition-colors duration-400">
              {post.title}
            </h3>

            {/* CTA */}
            <div className="flex items-center gap-3 pt-3">
              <span className="text-[10px] uppercase tracking-[0.28em] text-white/70 font-semibold group-hover:text-warm-gold transition-colors duration-300">
                View Details
              </span>
              <span className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center group-hover:border-warm-gold group-hover:bg-warm-gold/10 transition-all duration-300">
                <ArrowRight size={11} className="text-white/70 group-hover:text-warm-gold transition-colors duration-300" />
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function BlogListingPage() {
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-light-cream text-charcoal-black font-body pt-28 pb-24 overflow-hidden">
        {/* ── Page Header ── */}
        <section className="px-6 md:px-12 mb-14 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-warm-gold text-[10px] uppercase tracking-[0.35em] font-semibold block mb-3">
              INSIGHTS &amp; TRENDS
            </span>
            <div className="h-[2px] w-10 bg-warm-gold/60 mb-5" />
            <h1 className="font-heading text-4xl sm:text-5xl md:text-[3.5rem] text-forest-green leading-tight">
              The Portalis Journal
            </h1>
            <p className="text-charcoal-black/70 text-sm sm:text-base leading-relaxed max-w-xl mt-4">
              Expert insights on luxury interior architecture, custom joinery,
              turnkey fit-outs, and regulatory clearances in Dubai.
            </p>
          </motion.div>
        </section>

        {/* ── Divider ── */}
        <div className="w-full border-t border-forest-green/10 mb-14" />

        {/* ── Blog Grid ── */}
        <section className="px-6 md:px-12 max-w-7xl mx-auto">
          {/* Mobile: single column stack; Desktop: side-by-side layout */}
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">

            {/* LEFT — Featured card */}
            <div className="w-full lg:w-[32%] shrink-0">
              <FeaturedCard post={featuredPost} index={0} />
            </div>

            {/* RIGHT — 2×2 grid, collapses to 1 col on mobile */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {remainingPosts.map((post, idx) => (
                <GridCard key={post.slug} post={post} index={idx + 1} />
              ))}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
