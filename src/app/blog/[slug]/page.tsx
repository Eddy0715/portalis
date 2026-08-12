import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar, User, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";

const portableTextComponents = {
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset) return null;
      return (
        <div className="relative w-full aspect-[16/9] my-8 rounded-[16px] overflow-hidden border border-warm-gold/15 shadow-sm">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || "Blog Image"}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
};

/* ───────────────────────── Static Params ───────────────────────── */

export async function generateStaticParams() {
  let sanitySlugs: any[] = [];
  try {
    const posts = await client.fetch(`*[_type == "post"] { "slug": slug.current }`);
    sanitySlugs = posts.map((post: any) => ({ slug: post.slug }));
  } catch (err) {
    console.error("Error fetching static params slugs from Sanity:", err);
  }
  return sanitySlugs;
}

/* ───────────────────────── Page Props ───────────────────────── */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;

  let post: any = null;

  // 1. Try to fetch from Sanity (fresh data)
  try {
    const sanityPost = await client.withConfig({ useCdn: false }).fetch(
      `*[_type == "post" && slug.current == $slug][0] {
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
      }`,
      { slug }
    );

    if (sanityPost) {
      post = {
        title: sanityPost.title,
        slug: sanityPost.slug,
        image: sanityPost.image || "/assets/blog_fallback.png",
        category: sanityPost.category || "General",
        author: {
          name: sanityPost.author?.name || "Portalis Team",
          image: sanityPost.author?.image || "/assets/extracted_img_p7_1_375.jpeg",
        },
        publishedAt: sanityPost.publishedAt
          ? new Date(sanityPost.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "August 1, 2026",
        content: sanityPost.body,
        isSanity: true,
      };
    }
  } catch (err) {
    console.error("Error fetching Sanity post details:", err);
  }

  if (!post) {
    notFound();
  }

  // Fetch related posts (dynamic + static fallback)
  let relatedPosts: any[] = [];
  try {
    const sanityRelated = await client.withConfig({ useCdn: false }).fetch(
      `*[_type == "post" && slug.current != $slug][0...3] {
        title,
        "slug": slug.current,
        "image": mainImage.asset->url,
        "category": categories[0]->title,
        publishedAt
      }`,
      { slug }
    );
    if (sanityRelated && sanityRelated.length > 0) {
      relatedPosts = sanityRelated.map((item: any) => ({
        title: item.title,
        slug: item.slug,
        image: item.image || "/assets/blog_fallback.png",
        category: item.category || "General",
        publishedAt: item.publishedAt
          ? new Date(item.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })
          : "August 1, 2026",
      }));
    }
  } catch (err) {
    console.error("Error fetching related posts from Sanity:", err);
  }

  // No static fallback, only show what Sanity returns (up to 3)

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
          <div className="blog-content-rich max-w-none mb-20">
            <PortableText value={post.content} components={portableTextComponents} />
          </div>

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
