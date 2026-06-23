import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiGithub, FiExternalLink, FiCode, FiLayout, FiCpu, FiDatabase, FiServer, FiGlobe, FiEdit, FiLayers, FiFeather, FiSettings, FiFileText, FiTerminal, FiClock } from "react-icons/fi";
import { SiTypescript, SiPython, SiRust, SiNextdotjs, SiTailwindcss } from "react-icons/si";
import avatarImage from "../../public/images/avatars/Mario_Guerra_avatar_new.png";
import { getAllPosts, getColorForCategory } from "@/lib/posts";

type SkillIconType =
  | "SiTypescript" | "SiPython" | "SiRust" | "SiNextdotjs" | "SiTailwindcss"
  | "SiMicrosoftazure" | "FiCode" | "FiCpu" | "FiEdit" | "FiLayers"
  | "FiServer" | "FiSettings" | "FiGlobe" | "FiFeather" | "FiLayout"
  | "FiDatabase" | "FiTerminal" | "FiFileText";

const getSkillIcon = (iconType: SkillIconType) => {
  switch (iconType) {
    case "SiTypescript": return <SiTypescript className="h-5 w-5" />;
    case "SiPython": return <SiPython className="h-5 w-5" />;
    case "SiRust": return <SiRust className="h-5 w-5" />;
    case "SiNextdotjs": return <SiNextdotjs className="h-5 w-5" />;
    case "SiTailwindcss": return <SiTailwindcss className="h-5 w-5" />;
    case "SiMicrosoftazure": return <FiServer className="h-5 w-5" />;
    case "FiCode": return <FiCode className="h-5 w-5" />;
    case "FiCpu": return <FiCpu className="h-5 w-5" />;
    case "FiEdit": return <FiEdit className="h-5 w-5" />;
    case "FiLayers": return <FiLayers className="h-5 w-5" />;
    case "FiServer": return <FiServer className="h-5 w-5" />;
    case "FiSettings": return <FiSettings className="h-5 w-5" />;
    case "FiGlobe": return <FiGlobe className="h-5 w-5" />;
    case "FiFeather": return <FiFeather className="h-5 w-5" />;
    case "FiLayout": return <FiLayout className="h-5 w-5" />;
    case "FiDatabase": return <FiDatabase className="h-5 w-5" />;
    case "FiTerminal": return <FiTerminal className="h-5 w-5" />;
    case "FiFileText": return <FiFileText className="h-5 w-5" />;
    default: return <FiCode className="h-5 w-5" />;
  }
};

interface Skill {
  name: string;
  iconType: SkillIconType;
}

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3).map((post, index) => ({
    id: index + 1,
    title: post.title,
    excerpt: post.excerpt,
    readTime: post.readTime || "5 min read",
    imageUrl: post.coverImage || `https://placehold.co/800x450/${getColorForCategory(post.category)}/ffffff?text=${encodeURIComponent(post.category)}`,
    category: post.category,
    slug: post.slug,
  }));

  return (
    <>
      {/* Hero Section: Industrial Brutalism */}
      <section className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden border-b border-border py-12 md:py-24">
        {/* Micro-grid for telemetry precision */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.05)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:grid lg:grid-cols-[1.5fr_1fr] gap-12 lg:gap-8 items-center max-w-7xl mx-auto">

            {/* Left Content */}
            <div className="flex flex-col space-y-8 w-full">
              <div className="space-y-4">
                {/* Tech Monospace Metadata */}
                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <span className="h-2 w-2 block bg-primary rounded-none"></span>
                    AI Architect
                  </span>
                  <span className="hidden sm:inline-block border-l border-border h-4"></span>
                  <span className="hidden sm:inline-block">AI-Enhanced Engineering</span>
                </div>

                {/* Massive Fluid Typography */}
                <h1 className="fluid-h1 font-bold text-foreground">
                  Human-Centered. <br />
                  <span className="text-primary italic pr-2">Machine-Optimized.</span>
                </h1>

                <p className="fluid-p max-w-2xl text-muted-foreground font-light">
                  I build AI systems that handle the boring stuff, so you can focus on solving real problems.
                </p>
              </div>

              {/* Brutalist Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full items-center sm:justify-start">
                <Link
                  href="/projects"
                  className="group relative inline-flex h-12 items-center justify-center bg-foreground px-8 font-mono text-sm font-medium text-background transition-all hover:bg-primary focus:outline-none whitespace-nowrap"
                >
                  <span className="relative z-10 flex items-center">
                    [ View_Projects ]
                    <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 -z-10 bg-primary opacity-0 transition-opacity group-hover:opacity-100"></div>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center border border-border bg-transparent px-8 font-mono text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none whitespace-nowrap"
                >
                  ( Contact_Me )
                </Link>
              </div>
            </div>

            {/* Right Content: System Monitor Telemetry */}
            <div className="w-full flex justify-center lg:justify-end relative">
              {/* Floating Terminal Window */}
              <div className="theme-invert relative w-full max-w-[400px] aspect-[4/5] rounded-xl border border-border/50 bg-background shadow-2xl shadow-black/40 flex flex-col group overflow-hidden transform hover:-translate-y-1 transition-transform duration-500">

                {/* macOS Style Window Chrome */}
                <div className="flex items-center px-4 py-3 bg-muted/50 border-b border-border/50">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80 border border-black/10"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-black/10"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80 border border-black/10"></div>
                  </div>
                  <div className="flex-1 flex justify-center items-center -ml-8 text-xs font-mono text-foreground/50 tracking-wider">
                    <FiTerminal className="mr-2 h-3 w-3" /> mg-architect ~ zsh
                  </div>
                </div>

                {/* Telemetry Display */}
                <div className="relative flex-1 bg-background overflow-hidden font-mono text-sm leading-relaxed text-foreground/70 p-5 flex flex-col">
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0),rgba(0,0,0,0.02)_50%,rgba(255,255,255,0.02)_50%,rgba(0,0,0,0))] bg-[length:100%_4px] pointer-events-none opacity-20 z-20"></div>

                  {/* Scrolling Content - duplicated to create seamless loop */}
                  <div className="animate-telemetry space-y-6 pt-2 relative z-30">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <div key={i} className="space-y-6 pb-6">
                        <div>
                          <span className="text-primary font-bold">MG-ARCHITECT~$</span> <span className="text-foreground font-medium">init --core-systems</span><br />
                          <span>[OK] Bootstrapping architectural patterns...</span><br />
                          <span>[OK] LangChain/LangGraph initialized.</span>
                        </div>
                        <div>
                          <span className="text-primary font-bold">MG-ARCHITECT~$</span> <span className="text-foreground font-medium">run audit --mode=strict</span><br />
                          <span>&gt; analyzing architecture telemetry...</span><br />
                          <span>&gt; verifying vector pipelines...</span><br />
                          <span className="text-foreground font-bold">STATUS: ZERO TECH DEBT.</span>
                        </div>
                        <div>
                          <span className="text-primary font-bold">MG-ARCHITECT~$</span> <span className="text-foreground font-medium">scale deployment --env=prod</span><br />
                          <span>[WARN] Manual limits overridden.</span><br />
                          <span>&gt; injecting AI routing logic...</span><br />
                          <span className="text-primary font-bold">[READY FOR USERS]</span>
                        </div>
                        <div>
                          <span className="text-primary font-bold">MG-ARCHITECT~$</span> <span className="text-foreground font-medium">tail -f ops.log</span><br />
                          <span>&gt; Latency: 12ms</span><br />
                          <span>&gt; DX Velocity: +30%</span><br />
                          <span>&gt; Agentic Loop: Nominal</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Content Section */}
      <section className="border-b border-border bg-background py-20 md:py-32">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 max-w-7xl mx-auto">
            <div className="space-y-4">
              <div className="text-primary font-mono text-xs uppercase tracking-widest">/ Intelligence</div>
              <h2 className="fluid-h2 font-bold tracking-tighter text-foreground">Featured Output.</h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center group text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              View_Archive <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="group flex flex-col border border-border bg-card transition-all hover:border-primary relative"
              >
                {/* Accent hover line */}
                <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full z-10"></div>

                <div className="aspect-[16/9] w-full overflow-hidden border-b border-border relative">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[50%] group-hover:grayscale-0"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6 lg:p-8">
                  <div className="flex items-center gap-2 pb-4 text-xs font-mono">
                    <span className="text-primary uppercase tracking-wider">{post.category}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors focus:outline-none">
                      <span className="absolute inset-0"></span>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="flex-1 line-clamp-3 text-sm text-muted-foreground font-light leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                    <div className="text-xs font-mono text-muted-foreground flex items-center">
                      <FiClock className="mr-2 inline-block h-3 w-3" />
                      {post.readTime}
                    </div>
                    <span className="text-primary font-mono text-xs opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0">
                      READ -&gt;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 md:py-32 border-b border-border bg-secondary/20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="space-y-4 mb-16 text-center md:text-left">
              <div className="text-primary font-mono text-xs uppercase tracking-widest">/ Capability Matrix</div>
              <h2 className="fluid-h2 font-bold tracking-tighter text-foreground">Technical Arsenal.</h2>
            </div>

            <div className="grid grid-cols-2 gap-px bg-border sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border border-border">
              {(
                [
                  { name: "TypeScript", iconType: "SiTypescript" },
                  { name: "Python", iconType: "SiPython" },
                  { name: "Rust", iconType: "SiRust" },
                  { name: "Next.js", iconType: "SiNextdotjs" },
                  { name: "Tailwind", iconType: "SiTailwindcss" },
                  { name: "Azure Foundry", iconType: "FiCpu" },
                  { name: "Anthropic", iconType: "FiCpu" },
                  { name: "Vertex AI", iconType: "FiCpu" },
                  { name: "RAG", iconType: "FiLayers" },
                  { name: "API Design", iconType: "FiServer" },
                  { name: "LangGraph", iconType: "FiLayers" },
                  { name: "MS Graph", iconType: "FiGlobe" },
                  { name: "NLP", iconType: "FiFeather" },
                  { name: "Azure", iconType: "SiMicrosoftazure" },
                  { name: "GCP", iconType: "FiServer" },
                  { name: "Knowledge Mining", iconType: "FiDatabase" },
                  { name: "AI Dev", iconType: "FiTerminal" },
                  { name: "Doc Processing", iconType: "FiFileText" }
                ] as Skill[]
              ).map((skill) => (
                <div key={skill.name} className="group flex flex-col items-center justify-center space-y-4 bg-background p-8 transition-colors hover:bg-secondary/50">
                  <div className="text-muted-foreground transition-colors group-hover:text-primary">
                    {getSkillIcon(skill.iconType)}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xs font-mono text-foreground uppercase tracking-wider">{skill.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        {/* Vermilion Accent geometric shape */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-20 -z-10"></div>

        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col items-start justify-center space-y-8 max-w-4xl mx-auto text-left border-l-2 border-primary pl-8 md:pl-12">
            <h2 className="fluid-h1 font-bold tracking-tighter">Initiate Link.</h2>
            <p className="fluid-p text-muted-foreground font-light max-w-2xl">
              Systems require continuous optimization. If you have a complex architectural challenge or an AI-integration initiative, let's architect the solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full items-center sm:justify-start">
              <Link
                href="/contact"
                className="group relative inline-flex h-14 items-center justify-center bg-foreground px-10 font-mono text-sm font-medium text-background transition-all hover:bg-primary whitespace-nowrap"
              >
                <span className="relative z-10 flex items-center">
                  [ Execute_Contact ]
                  <FiArrowRight className="ml-3 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}