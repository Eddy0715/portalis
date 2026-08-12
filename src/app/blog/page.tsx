"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";

/* ─────────── helpers ─────────── */
function getExcerpt(body: any[]): string {
  if (!body || !Array.isArray(body)) return "No description available.";
  const firstTextBlock = body.find((block) => block._type === "block" && block.children);
  if (!firstTextBlock) return "No description available.";
  const text = firstTextBlock.children.map((child: any) => child.text).join("");
  return text.length > 160 ? text.substring(0, 157) + "..." : text;
}
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
  post: any;
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
  post: any;
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
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const sanityPosts = await client.withConfig({ useCdn: false }).fetch(`
        *[_type == "post"] | order(publishedAt desc) {
          title,
          "slug": slug.current,
          "image": mainImage.asset->url,
          "category": categories[0]->title,
          "author": {
            "name": author->name,
            "image": author->image.asset->url
          },
          publishedAt,
          body
        }
      `);

      if (sanityPosts) {
        const mapped = sanityPosts.map((post: any) => ({
          title: post.title,
          slug: post.slug,
          excerpt: post.body ? getExcerpt(post.body) : "No description available.",
          image: post.image || "/assets/blog_fallback.png",
          category: post.category || "General",
          author: {
            name: post.author?.name || "Portalis Team",
            image: post.author?.image || "/assets/extracted_img_p7_1_375.jpeg",
          },
          publishedAt: post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            : "August 1, 2026",
          content: post.body,
          isSanity: true,
        }));
        setPosts(mapped);
      }
    } catch (err: any) {
      console.error("Error fetching Sanity posts:", err);
      setError("Unable to connect to the blog database. Please verify your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

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
        <section className="px-6 md:px-12 max-w-7xl mx-auto min-h-[350px] flex items-center justify-center">
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 rounded-full border-2 border-warm-gold/20 border-t-warm-gold animate-spin" />
              <p className="text-xs text-charcoal-black/50 tracking-widest uppercase font-medium">Loading Journal...</p>
            </div>
          ) : error ? (
            <div className="text-center space-y-4 max-w-md mx-auto">
              <p className="text-sm text-red-700 font-medium">{error}</p>
              <button 
                onClick={fetchPosts} 
                className="px-5 py-2.5 border border-warm-gold/50 text-[10px] uppercase tracking-[0.25em] font-semibold text-warm-gold hover:bg-warm-gold hover:text-white transition-all duration-300 w-fit mx-auto cursor-pointer"
              >
                Retry Connection
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center space-y-2">
              <p className="text-sm text-charcoal-black/60">No articles published yet.</p>
              <p className="text-xs text-warm-gold uppercase tracking-wider">Check back soon for insights</p>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch w-full">
              {/* LEFT — Featured card */}
              {posts[0] && (
                <div className="w-full lg:w-[32%] shrink-0">
                  <FeaturedCard post={posts[0]} index={0} />
                </div>
              )}

              {/* RIGHT — 2×2 grid, collapses to 1 col on mobile */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {posts.slice(1).map((post, idx) => (
                  <GridCard key={post.slug} post={post} index={idx + 1} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
