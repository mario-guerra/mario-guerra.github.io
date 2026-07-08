import { getProgramMeta, getAllModules } from "@/lib/learn";
import ModuleSidebar from "@/components/learn/ModuleSidebar";
import { notFound } from "next/navigation";

interface ProgramLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    program: string;
  }>;
}

export default async function ProgramLayout({
  children,
  params,
}: ProgramLayoutProps) {
  const { program: programSlug } = await params;
  const meta = getProgramMeta(programSlug);
  const modules = getAllModules(programSlug);

  if (!meta) {
    notFound();
  }

  // Map to simple structure required by sidebar
  const sidebarModules = modules.map(m => ({
    title: m.title,
    moduleNumber: m.moduleNumber,
    slug: m.slug,
    description: m.description,
  }));

  return (
    <div className="flex-1 flex flex-col md:flex-row relative">
      <ModuleSidebar
        programSlug={programSlug}
        programTitle={meta.title}
        modules={sidebarModules}
      />
      <div className="flex-1 min-w-0 bg-background">
        {children}
      </div>
    </div>
  );
}
