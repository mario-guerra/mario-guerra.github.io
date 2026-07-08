import { getModuleBySlug, getAllModules, getProgramSlugs, getProgramMeta } from "@/lib/learn";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiClock, FiCpu, FiBookmark, FiChevronRight } from "react-icons/fi";
import ModuleNav from "@/components/learn/ModuleNav";
import "../../learn.css";

export const dynamic = 'force-static';
export const dynamicParams = false;

// Generate params for every module across all programs
export async function generateStaticParams() {
  const programSlugs = getProgramSlugs();
  const paths: { program: string; module: string }[] = [];

  for (const program of programSlugs) {
    const modules = getAllModules(program);
    for (const m of modules) {
      paths.push({
        program,
        module: m.slug,
      });
    }
  }

  return paths;
}

export async function generateMetadata({ params }: { params: Promise<{ program: string; module: string }> }) {
  const { program: programSlug, module: moduleSlug } = await params;
  const moduleData = await getModuleBySlug(programSlug, moduleSlug);
  const programMeta = getProgramMeta(programSlug);

  if (!moduleData || !programMeta) {
    return {
      title: "Module Not Found",
      description: "The requested module could not be found.",
    };
  }

  return {
    title: `Module ${moduleData.moduleNumber}: ${moduleData.title} | ${programMeta.title}`,
    description: moduleData.description,
    openGraph: {
      title: `Module ${moduleData.moduleNumber}: ${moduleData.title} | ${programMeta.title}`,
      description: moduleData.description,
      images: programMeta.coverImage ? [programMeta.coverImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `Module ${moduleData.moduleNumber}: ${moduleData.title} | ${programMeta.title}`,
      description: moduleData.description,
      images: programMeta.coverImage ? [programMeta.coverImage] : [],
    },
  };
}

interface ModulePageProps {
  params: Promise<{
    program: string;
    module: string;
  }>;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { program: programSlug, module: moduleSlug } = await params;
  const moduleData = await getModuleBySlug(programSlug, moduleSlug);
  const modules = getAllModules(programSlug);
  const programMeta = getProgramMeta(programSlug);

  if (!moduleData || !programMeta) {
    notFound();
  }

  // Find index of current module to compute prev/next links
  const currentIndex = modules.findIndex(m => m.slug === moduleSlug);
  const prevModule = currentIndex > 0 ? modules[currentIndex - 1] : null;
  const nextModule = currentIndex < modules.length - 1 ? modules[currentIndex + 1] : null;

  return (
    <article className="container max-w-3xl mx-auto px-4 py-8 md:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 font-medium">
        <Link href="/learn" className="hover:text-primary transition-colors">
          Learn
        </Link>
        <FiChevronRight className="h-3 w-3 shrink-0" />
        <Link href={`/learn/${programSlug}`} className="hover:text-primary transition-colors truncate max-w-[120px] sm:max-w-none">
          {programMeta.title}
        </Link>
        <FiChevronRight className="h-3 w-3 shrink-0" />
        <span className="text-foreground truncate">
          Module {moduleData.moduleNumber}
        </span>
      </nav>

      {/* Module Meta Header */}
      <header className="mb-10 pb-6 border-b border-border/50">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
            Module {moduleData.moduleNumber}
          </span>
          {moduleData.pillar && (
            <span className="inline-flex items-center gap-1 rounded bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground">
              <FiBookmark className="h-3 w-3 text-primary" />
              {moduleData.pillar}
            </span>
          )}
        </div>

        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground">
          {moduleData.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 mt-4 text-xs text-muted-foreground">
          {moduleData.estimatedTime && (
            <span className="flex items-center gap-1">
              <FiClock className="h-3.5 w-3.5" />
              Estimated: {moduleData.estimatedTime}
            </span>
          )}
          {moduleData.soloCommand && (
            <span className="flex items-center gap-1">
              <FiCpu className="h-3.5 w-3.5 text-primary" />
              Command(s): <code className="bg-secondary px-1.5 py-0.5 rounded font-mono font-semibold text-foreground">{moduleData.soloCommand}</code>
            </span>
          )}
        </div>
      </header>

      {/* Main Markdown Content */}
      <div 
        dangerouslySetInnerHTML={{ __html: moduleData.content }} 
        className="prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg max-w-none leading-relaxed"
      />

      {/* Previous / Next Module Navigation */}
      <ModuleNav
        programSlug={programSlug}
        prevModule={prevModule ? { slug: prevModule.slug, title: prevModule.title } : null}
        nextModule={nextModule ? { slug: nextModule.slug, title: nextModule.title } : null}
      />
    </article>
  );
}
