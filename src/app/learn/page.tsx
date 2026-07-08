import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import { getProgramSlugs, getProgramMeta, getAllModules } from "@/lib/learn";

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Learning",
  description: "Practical, structured programs designed to bridge the gap between academic CS and professional engineering.",
  openGraph: {
    title: "Learning | Mario Guerra",
    description: "Practical, structured programs designed to bridge the gap between academic CS and professional engineering.",
    images: ["/images/projects/agentic-curriculum.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learning | Mario Guerra",
    description: "Practical, structured programs designed to bridge the gap between academic CS and professional engineering.",
    images: ["/images/projects/agentic-curriculum.png"],
  },
};

export default function LearnIndexPage() {
  const slugs = getProgramSlugs();
  const programsOrder = ["solo-fundamentals", "api-design", "api-auth", "api-deploy", "ai-agents"];

  const programs = slugs
    .map(slug => {
      const meta = getProgramMeta(slug);
      if (!meta) return null;

      const modules = getAllModules(slug);
      return {
        ...meta,
        slug,
        moduleCount: modules.length
      };
    })
    .filter((p): p is NonNullable<typeof p> => p !== null)
    // Sort strictly based on our predefined order
    .sort((a, b) => {
      const indexA = programsOrder.indexOf(a.slug);
      const indexB = programsOrder.indexOf(b.slug);
      // Fallback for any unknown program to the end
      const posA = indexA === -1 ? 99 : indexA;
      const posB = indexB === -1 ? 99 : indexB;
      return posA - posB;
    });

  const featuredProgram = programs[0];
  const remainingPrograms = programs.slice(1);

  return (
    <>
      {/* Hero Section */}
      <section className="w-full py-16 md:py-24 border-b border-border/40 relative overflow-hidden">
        {/* Subtle background industrial grid pattern */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.03)_1px,transparent_1px)] bg-[size:32px_32px]"></div>

        <div className="container px-4 md:px-8 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-primary uppercase tracking-widest">
                <span className="h-1.5 w-1.5 bg-primary"></span>
                Training & Systems
              </div>
              <h1 className="fluid-h1 font-bold tracking-tighter text-foreground">
                Learning Programs
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground fluid-p font-light">
                Structured curriculum and hands-on protocols built for Computer Science students to turn developer vibes into professional-grade execution.
              </p>
              <div className="mx-auto max-w-[700px] mt-8 p-4 border border-border bg-card text-left text-xs font-mono text-muted-foreground relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                <span className="text-primary font-bold block uppercase tracking-wider mb-1">🧭 Recommended Learning Path</span>
                These courses are designed to be completed in sequence. Because each program builds directly on top of the codebase and project you develop in the previous step, I highly recommend taking them in order to avoid getting lost!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course List Section */}
      <section className="w-full py-16 bg-background">
        <div className="container px-4 md:px-8 mx-auto">
          <div className="max-w-6xl mx-auto">
            {featuredProgram ? (
              <>
                {/* Featured Course Card (matches Blog style) */}
                <div className="group relative border border-border bg-card transition-all hover:border-primary mb-16 rounded-none flex flex-col md:grid md:grid-cols-2 gap-0 overflow-hidden">
                  {/* Accent hover line */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-primary transition-all duration-300 group-hover:w-full z-10"></div>

                  <div className="aspect-[16/10] md:aspect-auto w-full h-full min-h-[300px] overflow-hidden border-b md:border-b-0 md:border-r border-border relative">
                    <Image
                      src={featuredProgram.coverImage || "/images/projects/agentic-curriculum.png"}
                      alt={featuredProgram.title}
                      fill
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-102 grayscale-[30%] group-hover:grayscale-0"
                    />
                  </div>

                  <div className="flex flex-col justify-between p-8 lg:p-12 relative">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 text-xs font-mono">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <FiBookOpen className="h-3.5 w-3.5" />
                          {featuredProgram.moduleCount} Modules
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
                        <Link href={`/learn/${featuredProgram.slug}/`} className="hover:text-primary transition-colors focus:outline-none">
                          {featuredProgram.title}
                        </Link>
                      </h3>

                      <p className="text-muted-foreground font-light leading-relaxed text-base">
                        {featuredProgram.description}
                      </p>

                      <div className="text-xs font-mono text-muted-foreground pt-2">
                        Target Audience: <span className="text-foreground">{featuredProgram.targetAudience}</span>
                      </div>
                    </div>

                    <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-6">
                      <span className="text-xs font-mono text-muted-foreground">BY_AUTHOR: {featuredProgram.author.toUpperCase()}</span>
                      <Link
                        href={`/learn/${featuredProgram.slug}/`}
                        className="inline-flex items-center group text-sm font-mono text-foreground hover:text-primary transition-colors focus:outline-none"
                      >
                        START_COURSE <FiArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Unified Grid for future courses */}
                {remainingPrograms.length > 0 && (
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                    {remainingPrograms.map((program) => (
                      <div
                        key={program!.slug}
                        className="group flex flex-col border border-border bg-card transition-all hover:border-primary relative rounded-none"
                      >
                        <div className="absolute top-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full z-10"></div>

                        <div className="aspect-[16/9] w-full overflow-hidden border-b border-border relative">
                          <Image
                            src={program.coverImage || "/images/projects/agentic-curriculum.png"}
                            alt={program.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105 grayscale-[30%] group-hover:grayscale-0"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-6 lg:p-8">
                          <h3 className="text-xl font-bold mb-4 line-clamp-2">
                            <Link href={`/learn/${program!.slug}/`} className="hover:text-primary transition-colors focus:outline-none">
                              {program!.title}
                            </Link>
                          </h3>
                          <p className="flex-1 line-clamp-3 text-sm text-muted-foreground font-light leading-relaxed">
                            {program!.description}
                          </p>
                          <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4">
                            <div className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                              <FiBookOpen className="h-3.5 w-3.5 text-muted-foreground/75" />
                              {program!.moduleCount} Modules
                            </div>
                            <Link
                              href={`/learn/${program!.slug}/`}
                              className="text-primary font-mono text-xs opacity-0 -translate-x-4 transition-all group-hover:opacity-100 group-hover:translate-x-0 focus:outline-none"
                            >
                              START -&gt;
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="border border-dashed border-border py-20 text-center text-muted-foreground font-mono">
                [ NO_LEARNING_PROGRAMS_FOUND ]
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
