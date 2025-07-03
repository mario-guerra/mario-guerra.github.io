import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCalendar, FiClock } from "react-icons/fi";
import { getAllPosts, getCategories } from "@/lib/posts";

export const dynamic = 'force-static';

// Get posts from our Markdown files
const blogPosts = getAllPosts().map((post, index) => ({
  id: index + 1,
  title: post.title,
  excerpt: post.excerpt,
  // Format the date more nicely without showing the year
  date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
  readTime: post.readTime || "5 min read", // Default if not specified
  imageUrl: post.coverImage || `https://placehold.co/800x450/${getColorForCategory(post.category)}/ffffff?text=${encodeURIComponent(post.category)}`,
  category: post.category,
  slug: post.slug,
  blogpost: post.blogpost || false,
}));

// Helper function to get a color based on category
function getColorForCategory(category: string = ''): string {
  const colors: Record<string, string> = {
    'Development': '9333ea',
    'React': '4f46e5',
    'Performance': '0ea5e9',
    'CSS': '22c55e',
    'Design': 'f97316',
    'TypeScript': '0284c7',
    'JavaScript': 'eab308',
    'Next.js': '000000',
  };
  
  return colors[category] || '6b7280'; // Default gray if category not found
}

export default function Blog() {
  // Blog posts
  const blogPosts = getAllPosts().map((post, index) => ({
    id: index + 1,
    title: post.title,
    excerpt: post.excerpt,
    // Format the date more nicely without showing the year
    date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    readTime: post.readTime || "5 min read", // Default if not specified
    imageUrl: post.coverImage || `https://placehold.co/800x450/${getColorForCategory(post.category)}/ffffff?text=${encodeURIComponent(post.category)}`,
    category: post.category,
    slug: post.slug,
    blogpost: post.blogpost || false,
  }));

  // Filter into blog posts and articles
  const blogPostItems = blogPosts.filter((post) => post.blogpost);
  // Articles
  const articles = blogPosts.filter((post) => !post.blogpost);

  return (
    <>
        <section className="w-full py-12 md:py-24 lg:py-32 border-b border-border/40">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-6xl mx-auto">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Blog & Articles
                </h1>
                <p className="mx-auto max-w-[700px] text-foreground/80 md:text-xl">
                  Thoughts, insights, and perspectives on AI, developer-centric design, and technology.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {getCategories().map(category => (
                  <Link
                    key={category}
                    href={`#${category.toLowerCase()}`}
                    className="inline-flex items-center justify-center rounded-full border border-input bg-background px-4 py-1 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Blog Posts */}
        {blogPostItems.length > 0 && (
          <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/20">
            <div className="container px-4 md:px-6 mx-auto">
              <div className="flex flex-col items-start gap-4 max-w-6xl mx-auto">
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                    Blog Posts
                  </h2>
                  <p className="max-w-[700px] text-foreground/80">
                    Insights and solutions from my experience in software development.
                  </p>
                </div>
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                  {blogPostItems.map((post) => (
                    <div
                      key={post.id}
                      className="group relative overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md"
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          width={800}
                          height={450}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex items-center gap-2 p-4">
                        <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {post.category}
                        </div>
                        <div className="flex items-center text-xs text-foreground/70">
                          <FiClock className="mr-1 h-3 w-3" />
                          {post.readTime}
                        </div>
                      </div>
                      <div className="p-4 pt-0">
                        <h3 className="text-xl font-bold">
                          <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="mt-2 line-clamp-2 text-foreground/80">
                          {post.excerpt}
                        </p>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                          Read More
                          <FiArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* All Posts */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-start gap-4 max-w-6xl mx-auto">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">
                  Articles
                </h2>
                <p className="max-w-[700px] text-foreground/80">
                  My notes on best practices for developer-centric design, based on my experience. Mainly for my own reference, but I hope you find them useful too.
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {articles.map((post) => (
                  <div
                    key={post.id}
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="aspect-video w-full overflow-hidden">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        width={800}
                        height={450}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-center gap-2 pb-2">
                        <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {post.category}
                        </div>
                      </div>
                      <h3 className="text-lg font-bold">
                        <Link href={`/blog/${post.slug}`} className="hover:text-primary">
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-2 flex-1 line-clamp-2 text-sm text-foreground/80">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="text-xs text-foreground/70">
                          <FiClock className="mr-1 inline-block h-3 w-3" />
                          {post.readTime}
                        </div>
                        <Link
                          href={`/blog/${post.slug}`}
                          className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                        >
                          Read More
                          <FiArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
    </>
  );
}
