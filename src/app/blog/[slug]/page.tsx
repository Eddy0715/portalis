import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { blogPosts } from "@/lib/blogData";

/* ───────────────────────── Static Params ───────────────────────── */

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

/* ───────────────────────── Page Props ───────────────────────── */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  // Related posts (excluding current post, max 3)
  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-light-cream text-charcoal-black font-body pt-28 pb-20">
        <article className="max-w-4xl mx-auto px-6">
          
          {/* Back button */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-forest-green/60 hover:text-warm-gold transition-colors duration-300 font-medium w-fit"
            >
              <ChevronLeft size={12} /> Back to Blog
            </Link>
          </div>

          {/* Category Badge */}
          <span className="text-warm-gold text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold block mb-3">
            {post.category}
          </span>

          {/* Heading */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-forest-green leading-[1.15] mb-6">
            {post.title}
          </h1>

          {/* Metadata Block */}
          <div className="flex flex-wrap items-center gap-6 py-5 border-y border-forest-green/10 mb-10 text-[11px] sm:text-xs text-charcoal-black/70 font-medium">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-forest-green text-warm-gold flex items-center justify-center font-bold text-[9px] border border-warm-gold/20 shadow-sm">
                {post.author.name.charAt(0)}
              </span>
              <span>By {post.author.name}</span>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-warm-gold" />
              <span>Published on {post.publishedAt}</span>
            </div>
          </div>

          {/* Hero Banner Image */}
          <div className="relative aspect-[16/9] w-full rounded-[24px] overflow-hidden border border-warm-gold/15 shadow-md mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 80vw"
              priority
            />
          </div>

          {/* HTML Rich Content Body */}
          <div 
            className="blog-content-rich max-w-none mb-20"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Related Articles Section */}
          {relatedPosts.length > 0 && (
            <div className="border-t border-forest-green/10 pt-16 mt-16">
              <h3 className="font-heading text-2xl sm:text-3xl text-forest-green mb-8">
                Related Articles
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((item) => (
                  <div
                    key={item.slug}
                    className="group flex flex-col h-full bg-white border border-warm-gold/15 rounded-[20px] overflow-hidden shadow-sm hover:shadow-md hover:border-warm-gold/45 transition-all duration-300"
                  >
                    {/* Card Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-warm-gold/10">
                      <Link href={`/blog/${item.slug}`}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          sizes="(max-width: 768px) 100vw, 30vw"
                        />
                      </Link>
                      <div className="absolute top-3 left-3 bg-forest-green text-warm-gold text-[8px] uppercase tracking-[0.18em] font-semibold py-1 px-2.5 rounded shadow-sm border border-warm-gold/20">
                        {item.category}
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-5 flex flex-col flex-1 space-y-3">
                      <span className="text-[9px] text-charcoal-black/50 font-medium block">
                        {item.publishedAt}
                      </span>
                      
                      <Link href={`/blog/${item.slug}`} className="flex-1">
                        <h4 className="font-heading text-base text-forest-green leading-snug group-hover:text-warm-gold transition-colors duration-300 line-clamp-2">
                          {item.title}
                        </h4>
                      </Link>
                      
                      <Link
                        href={`/blog/${item.slug}`}
                        className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.2em] font-semibold text-warm-gold group-hover:text-forest-green transition-colors duration-300 pt-2 border-t border-forest-green/5 w-fit"
                      >
                        Read Post <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </article>
      </main>

      <Footer />
    </>
  );
}
