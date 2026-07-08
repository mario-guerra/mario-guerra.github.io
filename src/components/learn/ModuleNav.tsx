import Link from "next/link";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

interface NavItem {
  slug: string;
  title: string;
}

interface ModuleNavProps {
  programSlug: string;
  prevModule: NavItem | null;
  nextModule: NavItem | null;
}

export default function ModuleNav({
  programSlug,
  prevModule,
  nextModule,
}: ModuleNavProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 border-t border-border mt-12 pt-8">
      {/* Previous Module Link */}
      {prevModule ? (
        <Link
          href={`/learn/${programSlug}/${prevModule.slug}/`}
          className="flex-1 group flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-secondary/20"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
            <FiArrowLeft className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Previous Module</span>
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-0.5 truncate">
              {prevModule.title}
            </h4>
          </div>
        </Link>
      ) : (
        <Link
          href={`/learn/${programSlug}/`}
          className="flex-1 group flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 hover:bg-secondary/20"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
            <FiArrowLeft className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Back To</span>
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-0.5 truncate">
              Program Overview
            </h4>
          </div>
        </Link>
      )}

      {/* Next Module Link */}
      {nextModule ? (
        <Link
          href={`/learn/${programSlug}/${nextModule.slug}/`}
          className="flex-1 group flex items-start justify-between gap-4 rounded-lg border border-border bg-card p-4 text-right transition-all hover:border-primary/50 hover:bg-secondary/20"
        >
          <div className="min-w-0 order-1 sm:order-none">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Next Module</span>
            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-0.5 truncate">
              {nextModule.title}
            </h4>
          </div>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors order-2 sm:order-none">
            <FiArrowRight className="h-5 w-5" />
          </div>
        </Link>
      ) : (
        (() => {
          const nextProgramMap: Record<string, { slug: string; title: string }> = {
            "solo-fundamentals": { slug: "api-design", title: "2. API Design" },
            "api-design": { slug: "api-auth", title: "3. Authentication & Security" },
            "api-auth": { slug: "api-deploy", title: "4. Cloud Deployment" },
            "api-deploy": { slug: "ai-agents", title: "5. AI Agent Development" },
          };
          const nextProgram = nextProgramMap[programSlug];
          if (nextProgram) {
            return (
              <Link
                href={`/learn/${nextProgram.slug}/`}
                className="flex-1 group flex items-start justify-between gap-4 rounded-lg border border-primary/30 bg-primary/5 p-4 text-right transition-all hover:border-primary/50 hover:bg-primary/10"
              >
                <div className="min-w-0 order-1 sm:order-none">
                  <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">Next Program</span>
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors mt-0.5 truncate">
                    {nextProgram.title}
                  </h4>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors order-2 sm:order-none">
                  <FiArrowRight className="h-5 w-5" />
                </div>
              </Link>
            );
          }
          return (
            <div className="flex-1 flex items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 p-4 text-center">
              <span className="text-sm font-medium text-muted-foreground">
                🎉 Program Complete! Time to start building!
              </span>
            </div>
          );
        })()
      )}
    </div>
  );
}
