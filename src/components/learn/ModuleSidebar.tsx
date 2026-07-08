"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";
import { FiMenu, FiX, FiCheckSquare, FiSquare } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

interface ModuleLink {
  title: string;
  moduleNumber: number;
  slug: string;
  description: string;
}

interface ModuleSidebarProps {
  programSlug: string;
  programTitle: string;
  modules: ModuleLink[];
}

export default function ModuleSidebar({
  programSlug,
  programTitle,
  modules,
}: ModuleSidebarProps) {
  const pathname = usePathname();
  const [completedModules, setCompletedModules] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync completion state on mount
  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem(`learn:${programSlug}:completed`);
    if (saved) {
      try {
        setCompletedModules(JSON.parse(saved));
      } catch (e) {
        console.error("Error loading progress:", e);
      }
    }
  }, [programSlug]);

  const toggleComplete = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const updated = {
      ...completedModules,
      [slug]: !completedModules[slug],
    };
    setCompletedModules(updated);
    localStorage.setItem(`learn:${programSlug}:completed`, JSON.stringify(updated));
  };

  const completedCount = modules.filter(m => completedModules[m.slug]).length;
  const progressPercent = Math.round((completedCount / modules.length) * 100) || 0;

  const sidebarContent = (
    <div className="flex h-full flex-col bg-card px-4 py-6 md:px-6">
      {/* Title */}
      <div className="mb-6 border-b border-border pb-4">
        <Link href={`/learn/${programSlug}`} className="group">
          <span className="text-xs font-semibold tracking-wider text-primary uppercase">Learning Program</span>
          <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors mt-0.5 leading-snug">
            {programTitle}
          </h2>
        </Link>

        {/* Progress Bar */}
        {mounted && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>{completedCount} of {modules.length} modules completed</span>
              <span className="font-semibold text-foreground">{progressPercent}%</span>
            </div>
            <div className="h-1.5 w-full bg-secondary overflow-hidden rounded-full">
              <div 
                className="h-full bg-primary transition-all duration-500 ease-out" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Modules List */}
      <nav className="flex-1 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
        {modules.map((m) => {
          const href = `/learn/${programSlug}/${m.slug}/`;
          const isActive = pathname === href || pathname.startsWith(href);
          const isDone = completedModules[m.slug];

          return (
            <Link
              key={m.slug}
              href={href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "group flex items-start gap-3 rounded-lg p-3 text-sm transition-all hover:bg-secondary/50",
                isActive 
                  ? "bg-secondary text-foreground font-medium border-l-2 border-primary rounded-l-none" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {/* Checkbox */}
              {mounted && (
                <button
                  onClick={(e) => toggleComplete(m.slug, e)}
                  className="mt-0.5 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                  aria-label={isDone ? `Mark module ${m.moduleNumber} incomplete` : `Mark module ${m.moduleNumber} complete`}
                >
                  {isDone ? (
                    <FiCheckSquare className="h-4.5 w-4.5 text-primary" />
                  ) : (
                    <FiSquare className="h-4.5 w-4.5 group-hover:border-primary transition-colors" />
                  )}
                </button>
              )}

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className={cn(
                    "text-xs font-mono text-muted-foreground",
                    isActive && "text-primary font-semibold"
                  )}>
                    M{m.moduleNumber}
                  </span>
                </div>
                <h3 className={cn(
                  "truncate text-sm mt-0.5",
                  isActive ? "text-foreground font-semibold" : "text-foreground/90 group-hover:text-foreground"
                )}>
                  {m.title}
                </h3>
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Permanent sidebar on md and up) */}
      <aside className="hidden md:block w-72 lg:w-80 shrink-0 border-r border-border h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Trigger (Sticky bottom-right button) */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg focus:outline-none hover:bg-primary/95 transition-colors"
          aria-label={isOpen ? "Close module menu" : "Open module menu"}
        >
          {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Sidebar (AnimatePresence slide in from right/bottom) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black md:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-16 right-0 z-30 w-[85vw] max-w-[320px] border-l border-border bg-background shadow-2xl md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
