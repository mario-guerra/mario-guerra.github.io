import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiGithub, FiExternalLink, FiCode, FiLayout, FiCpu, FiDatabase, FiServer, FiGlobe, FiEdit, FiLayers, FiFeather, FiSettings, FiFileText, FiTerminal, FiClock } from "react-icons/fi";
import { SiTypescript, SiPython, SiSharp, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import avatarImage from "../../public/images/avatars/Mario_Guerra_avatar_new.png";
import { getAllPosts, getColorForCategory } from "@/lib/posts";

// Define skill icon type
type SkillIconType =
  | "SiTypescript" | "SiPython" | "SiSharp" | "SiNextdotjs" | "SiTailwindcss"
  | "SiMicrosoftazure" | "FiCode" | "FiCpu" | "FiEdit" | "FiLayers"
  | "FiServer" | "FiSettings" | "FiGlobe" | "FiFeather" | "FiLayout"
  | "FiDatabase" | "FiTerminal" | "FiFileText";

// Function to get the right icon component
const getSkillIcon = (iconType: SkillIconType) => {
  switch (iconType) {
    case "SiTypescript": return <SiTypescript className="h-6 w-6" />;
    case "SiPython": return <SiPython className="h-6 w-6" />;
    case "SiSharp": return <SiSharp className="h-6 w-6" />;
    case "SiNextdotjs": return <SiNextdotjs className="h-6 w-6" />;
    case "SiTailwindcss": return <SiTailwindcss className="h-6 w-6" />;
    case "SiMicrosoftazure": return <FiServer className="h-6 w-6" />; 
    case "FiCode": return <FiCode className="h-6 w-6" />;
    case "FiCpu": return <FiCpu className="h-6 w-6" />;
    case "FiEdit": return <FiEdit className="h-6 w-6" />;
    case "FiLayers": return <FiLayers className="h-6 w-6" />;
    case "FiServer": return <FiServer className="h-6 w-6" />;
    case "FiSettings": return <FiSettings className="h-6 w-6" />;
    case "FiGlobe": return <FiGlobe className="h-6 w-6" />;
    case "FiFeather": return <FiFeather className="h-6 w-6" />;
    case "FiLayout": return <FiLayout className="h-6 w-6" />;
    case "FiDatabase": return <FiDatabase className="h-6 w-6" />;
    case "FiTerminal": return <FiTerminal className="h-6 w-6" />;
    case "FiFileText": return <FiFileText className="h-6 w-6" />;
    default: return <FiCode className="h-6 w-6" />; // Default icon
  }
};

interface Skill {
  name: string;
  iconType: SkillIconType;
}

export default function Home() {
  // Fetch top 3 most recent posts from our Markdown files
  const recentPosts = getAllPosts().slice(0, 3).map((post, index) => ({
    id: index + 1,
    title: post.title,
    excerpt: post.excerpt,
    date: new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
    readTime: post.readTime || "5 min read", 
    // Absolute fallback resilience exactly mirroring blog layout
    imageUrl: post.coverImage || `https://placehold.co/800x450/${getColorForCategory(post.category)}/ffffff?text=${encodeURIComponent(post.category)}`,
    category: post.category,
    slug: post.slug,
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 -z-10 animated-gradient bg-gradient-to-r from-primary/20 via-background to-secondary/20"></div>
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px] mx-auto max-w-6xl">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter text-foreground sm:text-5xl xl:text-6xl/none">
                  Human-Centered, AI-Enhanced Products & Services
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Hi, I'm Mario Guerra. I create intelligent tools that transform how developers build software, delivering measurable productivity gains and higher quality code.
                </p>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  By merging human-centered design principles with strategic AI capabilities, I turn complex workflows into intuitive, efficient experiences for teams of all sizes.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link
                  href="/projects"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  View Projects
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Contact Me
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative aspect-square overflow-hidden rounded-full border-2 border-primary bg-background/50 p-2">
                <Image
                  src={avatarImage}
                  alt="Mario Guerra"
                  width={375}
                  height={375}
                  className="aspect-square rounded-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Content</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                My most recent writing and insights.
              </p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl">
            {recentPosts.map((post) => (
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
                    {post.category && (
                      <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {post.category}
                      </div>
                    )}
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
                    <div className="text-xs text-foreground/70 flex items-center">
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
          <div className="mt-12 flex justify-center">
            <Link
              href="/blog"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            >
              Read The Blog
              <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">My Skills</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Technologies and tools I specialize in
              </p>
            </div>
          </div>
          <div className="mt-12 mx-auto max-w-6xl">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {(
                [
                  { name: "TypeScript", iconType: "SiTypescript" },
                  { name: "Python", iconType: "SiPython" },
                  { name: "C#", iconType: "SiSharp" },
                  { name: "Next.js", iconType: "SiNextdotjs" },
                  { name: "Tailwind CSS", iconType: "SiTailwindcss" },
                  { name: "Azure OpenAI", iconType: "FiCpu" },
                  { name: "Azure Cognitive Services", iconType: "SiMicrosoftazure" },
                  { name: "Vertex AI", iconType: "FiCpu" },
                  { name: "RAG", iconType: "FiLayers" },
                  { name: "API Design", iconType: "FiServer" },
                  { name: "Semantic Kernel", iconType: "FiSettings" },
                  { name: "Microsoft Graph API", iconType: "FiGlobe" },
                  { name: "NLP", iconType: "FiFeather" },
                  { name: "Azure", iconType: "SiMicrosoftazure" },
                  { name: "GCP", iconType: "SiGooglecloud" },
                  { name: "Knowledge Mining", iconType: "FiDatabase" },
                  { name: "AI-Assisted Development", iconType: "FiTerminal" },
                  { name: "Document Processing", iconType: "FiFileText" }
                ] as Skill[]
              ).map((skill) => (
                <div key={skill.name} className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-border bg-card p-4 shadow-sm">
                  <div className="rounded-md bg-primary/10 p-2 text-primary">
                    {getSkillIcon(skill.iconType)}
                  </div>
                  <div className="text-center">
                    <h3 className="text-sm font-medium">{skill.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border bg-muted/40 py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-6xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Let's Work Together</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Have a project in mind? Let's discuss how I can help bring your ideas to life.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Contact Me
                <FiArrowRight className="ml-2" />
              </Link>
              <Link
                href="/resume"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                View Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}