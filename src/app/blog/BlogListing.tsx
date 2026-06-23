"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { cn } from "@/utils/cn";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  readTime: string;
  imageUrl: string;
  category: string;
  slug: string;
}

interface BlogListingProps {
  posts: Post[];
  categories: string[];
}

export default function BlogListing({ posts, categories }: BlogListingProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const matched = categories.find(c => c.toLowerCase() === hash.toLowerCase());
        if (matched) {
          setSelectedCategory(matched);
        } else if (hash.toLowerCase() === "all") {
          setSelectedCategory("All");
        }
      } else {
        setSelectedCategory("All");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [categories]);

  const selectCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === "All") {
      window.history.pushState(null, "", window.location.pathname);
    } else {
      window.location.hash = category.toLowerCase();
    }
  };

  const filteredPosts = selectedCategory === "All"
    ? posts
    : posts.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());

  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);
  const allCategories = ["All", ...categories];

  return (
    <>
      {/* Category Navigation */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16 max-w-4xl mx-auto">
        {allCategories.map((category) => (
          <button
            key={category}
            onClick={() => selectCategory(category)}
            className={cn(
              "inline-flex h-10 items-center justify-center rounded-none border px-5 text-xs font-mono uppercase tracking-wider transition-all duration-300 focus:outline-none",
              selectedCategory === category
                ? "border-primary bg-primary text-primary-foreground font-semibold"
                : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary"
            )}
          >
            {category === "All" ? "[ ALL_OUTPUT ]" : category}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="border border-dashed border-border py-20 text-center text-muted-foreground font-mono max-w-6xl mx-auto">
          [ NO_WRITING_FOUND_FOR_CATEGORY: {selectedCategory.toUpperCase()} ]
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Featured Post */}
        {featuredPost && (
          <div className="group relative border border-border bg-card transition-all hover:border-primary mb-16 rounded-none flex flex-col md:grid md:grid-cols-2 gap-0 overflow-hidden">
            {/* Accent hover line */}
            <div className="absolute top-0 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full z-10"></div>
            
            <div className="aspect-[16/10] md:aspect-auto w-full h-full min-h-[300px] overflow-hidden border-b md:border-b-0 md:border-r border-border relative">
              <Image
                src={featuredPost.imageUrl}
                alt={featuredPost.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-102 grayscale-[30%] group-hover:grayscale-0"
              />
            </div>
            <div className="flex flex-col justify-between p-8 lg:p-12 relative">
              <div className="space-y-6">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-primary uppercase tracking-widest">{featuredPost.category}</span>
                  <span className="text-muted-foreground/30 font-light">|</span>
                  <span className="text-muted-foreground flex items-center">
                    <FiClock className="mr-1 h-3.5 w-3.5" />
                    {featuredPost.readTime}
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-primary transition-colors focus:outline-none">
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed text-base">
                  {featuredPost.excerpt}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-end border-t border-border/50 pt-6">
                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center group text-sm font-mono text-foreground hover:text-primary transition-colors focus:outline-none"
                >
                  READ_POST <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Unified Grid */}
        {remainingPosts.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => (
              <div
                key={post.id}
                className="group flex flex-col border border-border bg-card transition-all hover:border-primary relative rounded-none"
              >
                {/* Accent hover line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full z-10"></div>

                <div className="aspect-[16/9] w-full overflow-hidden border-b border-border relative">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="flex items-center gap-2 pb-4 text-xs font-mono">
                    <span className="text-primary uppercase tracking-wider">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors focus:outline-none">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="flex-1 line-clamp-3 text-sm text-muted-foreground font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="text-xs font-mono text-muted-foreground flex items-center">
                      <FiClock className="mr-2 inline-block h-3.5 w-3.5 text-muted-foreground/75" />
                      {post.readTime}
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-primary font-mono text-xs opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 focus:outline-none"
                    >
                      READ -&gt;
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
