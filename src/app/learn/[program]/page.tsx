import Link from "next/link";
import Image from "next/image";
import { getProgramMeta, getAllModules, getProgramSlugs } from "@/lib/learn";
import { notFound } from "next/navigation";
import { FiPlay, FiBook, FiClock, FiCpu } from "react-icons/fi";

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = getProgramSlugs();
  return slugs.map((program) => ({
    program,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ program: string }> }) {
  const { program: programSlug } = await params;
  const meta = getProgramMeta(programSlug);

  if (!meta) {
    return {
      title: "Program Not Found",
      description: "The requested learning program could not be found.",
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.coverImage ? [meta.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: meta.coverImage ? [meta.coverImage] : [],
    },
  };
}

interface ProgramPageProps {
  params: Promise<{
    program: string;
  }>;
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  const { program: programSlug } = await params;
  const meta = getProgramMeta(programSlug);
  const modules = getAllModules(programSlug);

  if (!meta) {
    notFound();
  }

  const startSlug = modules[0]?.slug || "";

  return (
    <article className="container max-w-4xl mx-auto px-4 py-8 md:py-12">
      {/* Header card */}
      <div className="rounded-lg border border-border bg-card p-6 md:p-8 mb-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-xs text-muted-foreground font-medium">
            Audience: {meta.targetAudience}
          </span>
        </div>

        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
          {meta.title}
        </h1>

        <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
          {meta.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between border-t border-border/50 pt-6">
          <div className="flex items-center gap-3">
            <Image
              src="/images/avatars/Mario_Guerra_avatar_new.png"
              alt={meta.author}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{meta.author}</p>
              <p className="text-xs text-muted-foreground">Author & Technical Leader</p>
            </div>
          </div>

          {startSlug && (
            <Link
              href={`/learn/${programSlug}/${startSlug}/`}
              className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none"
            >
              Start Course
              <FiPlay className="ml-2 h-4 w-4 fill-current" />
            </Link>
          )}
        </div>
      </div>

      {/* Program details layout */}
      <div className="grid gap-8 md:grid-cols-3">
        {/* Modules List TOC */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-2">Course Outline</h2>
          <div className="space-y-4">
            {modules.map((m) => (
              <Link
                key={m.slug}
                href={`/learn/${programSlug}/${m.slug}/`}
                className="group block rounded-lg border border-border bg-card/50 p-4 transition-all hover:bg-secondary/20 hover:border-primary/30"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-primary font-semibold">Module {m.moduleNumber}</span>
                      {m.pillar && (
                        <span className="text-xs font-medium text-muted-foreground border-l border-border pl-2">
                          {m.pillar}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {m.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {m.description}
                    </p>
                  </div>
                  <div className="flex flex-col items-end shrink-0 gap-1.5 text-xs text-muted-foreground font-mono">
                    {m.estimatedTime && (
                      <span className="flex items-center gap-1">
                        <FiClock className="h-3 w-3" />
                        {m.estimatedTime}
                      </span>
                    )}
                    {m.soloCommand && (
                      <span className="flex items-center gap-1 font-semibold text-primary/80">
                        <FiCpu className="h-3 w-3" />
                        {m.soloCommand}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Course Info Sidebar */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold border-b border-border pb-2">At a Glance</h2>
          <div className="rounded-lg border border-border bg-card/30 p-4 space-y-4 text-sm">
            <div>
              <span className="text-xs text-muted-foreground uppercase font-semibold block">Version</span>
              <span className="font-medium text-foreground">{meta.version}</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-semibold block">Pillars Taught</span>
              <span className="font-medium text-foreground">6 Core Pillars</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-semibold block">Hands-on Project</span>
              <span className="font-medium text-foreground">Python CLI Study Tracker</span>
            </div>
            <div>
              <span className="text-xs text-muted-foreground uppercase font-semibold block">Workflow Integrations</span>
              <span className="font-medium text-foreground">VS Code + Copilot Agent Mode + Codex</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
