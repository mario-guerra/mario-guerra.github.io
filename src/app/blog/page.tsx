import { Metadata } from "next";
import { getAllPosts, getCategories, getColorForCategory } from "@/lib/posts";
import BlogListing from "./BlogListing";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Writing",
  description: "Thoughts, insights, and perspectives on AI architecture, API product design, and developer systems.",
};

export default function Blog() {
  // Get and map posts from our Markdown files
  const posts = getAllPosts().map((post, index) => ({
    id: index + 1,
    title: post.title,
    excerpt: post.excerpt,
    readTime: post.readTime || "5 min read",
    imageUrl: post.coverImage || `https://placehold.co/800x450/${getColorForCategory(post.category)}/ffffff?text=${encodeURIComponent(post.category)}`,
    category: post.category,
    slug: post.slug,
  }));

  const categories = getCategories();

  return (
    <>
      <section className="w-full py-16 md:py-24 border-b border-border/40 relative overflow-hidden">
        {/* Subtle background industrial grid pattern */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        
        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
                <span className="h-1.5 w-1.5 bg-primary"></span>
                Writing & Intel
              </div>
              <h1 className="fluid-h1 font-bold tracking-tighter text-foreground">
                Thoughts & Insights
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground fluid-p font-light">
                Thoughts, insights, and perspectives on AI architecture, API product design, and developer systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-background">
        <div className="container px-4 md:px-8 mx-auto">
          <BlogListing posts={posts} categories={categories} />
        </div>
      </section>
    </>
  );
}
