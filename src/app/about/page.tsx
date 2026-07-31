import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiLinkedin, FiGithub, FiMail, FiYoutube } from "react-icons/fi";
import { SiX } from "react-icons/si";
import avatarImage from "../../../public/images/avatars/Mario_Guerra_avatar_new.png";

const experience = [
  {
    role: "Principal Product Engineer, AI Strategy & Architecture",
    company: "IntelePeer/Aqurio",
    period: "2025 - Present",
    summary:
      "Own AI product strategy and the engineering execution behind it, from architecture through production rollout.",
    projects: [
      {
        name: "AI Agent Delivery Platform",
        description:
          "Architected and built the company's AI Agent Delivery Platform, shipping the full production stack and delivering the first live customer deployment in just three weeks.",
      },
      {
        name: "Patient Engagement Platform",
        description:
          "Designed a healthcare patient-engagement platform on Temporal, Python, and PostgreSQL, with messaging workflows built for scalable, compliance-aware patient outreach.",
      },
    ],
  },
  {
    role: "Founder & AI Architect",
    company: "IgnitionAI",
    companyUrl: "https://ignitionai.xyz",
    period: "2025 - Present",
    summary:
      "An AI consultancy that deploys senior engineering agents to architect and launch products in days, not weeks. Helping startups and SMBs turn ideas into launch-ready tools with measurable ROI.",
    projects: [
      {
        name: "Orchid, Orchestration Interactive Debugger",
        description: (
          <>
            Created{" "}
            <a
              href="https://orchidtrace.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium transition-colors"
            >
              Orchid
            </a>
            , a local-first proxy and visual debugger for AI pipelines. Captures API traffic at the transport layer to
            record LLM prompts, tool payloads, and decisions to a local SQLite database. Integrates with the Model
            Context Protocol (MCP) to expose trace queries to agents, enabling step-by-step visual debugging and
            deterministic offline replay testing.
          </>
        ),
      },
      {
        name: "SOLO Protocol",
        description: (
          <>
            Created{" "}
            <Link href="/blog/the-solo-protocol" className="text-primary hover:underline font-medium transition-colors">
              SOLO
            </Link>{" "}
            (Single Operator Loop Orchestration), a framework that turns AI coding assistants into a production-grade
            engineering team of one. Slash-command workflows enforce spec-driven design, security-first architecture,
            and test-driven development, so every feature is architected, critiqued, and revised before a line of code
            is written.
          </>
        ),
      },
    ],
  },
  {
    role: "Senior Product Manager, TypeSpec API Definition Language",
    company: "Microsoft",
    period: "2021 - 2025",
    summary:
      "Led product vision and strategy for TypeSpec, an open-source API definition language transforming API development. Guided Azure service teams as a member of the Azure API Stewardship Board, and defined the KPIs used to measure product success and iterate on real-world usage.",
    projects: [
      {
        name: "TypeSpec 1.0 Launch",
        description: (
          <>
            Led the zero-to-one launch of{" "}
            <a
              href="https://typespec.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium transition-colors"
            >
              TypeSpec
            </a>
            , delivering an API definition language that achieved 8-10x code reduction and 30% faster review times,
            delivering measurable developer productivity.
          </>
        ),
      },
      {
        name: "@azure Functionality in GitHub Copilot",
        description:
          "Prototyped a RAG-based solution to improve the model's responses, enhancing developer productivity through context-aware code suggestions with secure data handling.",
      },
    ],
  },
  {
    role: "Principal Engineering Manager, Hexagon DSP Tools",
    company: "Qualcomm",
    period: "2008 - 2021",
    summary:
      "Led the development of tools and platforms for Qualcomm's Hexagon DSP, the core of Snapdragon modem and Neural Processing Unit technology. Served as de-facto product manager for Hexagon tools used by first-party software teams, improving on-time delivery by 35% through data-driven development processes.",
    projects: [],
  },
  {
    role: "Independent R&D",
    company: "Personal Projects",
    period: "Ongoing",
    summary: "Self-directed work exploring where LLMs actually hold up in production.",
    projects: [
      {
        name: "RAG-Enhanced Chatbots with Microsoft Teams Data",
        description:
          "Built RAG-enhanced chatbots using Graph API and Azure Foundry, leveraging LLMs to optimize workflows and demonstrate API-driven user support with secure data exchange.",
      },
      {
        name: "AI Document Summarization",
        description:
          "Developed an LLM-based solution to summarize large documents, optimizing data pipelines for efficient, secure processing with a sliding window approach.",
      },
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 max-w-6xl mx-auto">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  I build products that help you ship faster and waste less time.
                </p>
              </div>
              <div className="max-w-[600px] space-y-4 text-foreground/90">
                <p>
                  I'm Mario Guerra. For the last 18 years, I've built products, APIs, and AI systems.
                </p>
                <p>
                  At Microsoft, I led TypeSpec—an open-source API definition language. Today, nearly all Azure services use it to generate SDKs, cutting their development and review time by over 30%.
                </p>
                <p>
                  Currently, I focus on AI. I build products that automate the tedious parts of your work, so you can focus on solving real problems.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://linkedin.com/in/mario-guerra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-muted"
                  aria-label="LinkedIn"
                >
                  <FiLinkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/mario-guerra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-muted"
                  aria-label="GitHub"
                >
                  <FiGithub className="h-5 w-5" />
                </a>
                <a
                  href="https://youtube.com/@thisismarioguerra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-muted"
                  aria-label="YouTube"
                >
                  <FiYoutube className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/_marioguerra_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-muted"
                  aria-label="X (formerly Twitter)"
                >
                  <SiX className="h-4 w-4" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background text-foreground hover:bg-muted"
                  aria-label="Email"
                >
                  <FiMail className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative w-full max-w-[400px] aspect-[4/5] border border-border bg-card p-4 flex flex-col group">
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-primary -translate-x-px -translate-y-px"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-primary translate-x-px translate-y-px"></div>

                <div className="flex justify-between items-center mb-4 text-[10px] font-mono text-muted-foreground uppercase border-b border-border/50 pb-2">
                  <span>ID: MG-77X</span>
                  <span>STATUS: ACTIVE</span>
                </div>

                <div className="relative flex-1 bg-muted overflow-hidden">
                  <Image
                    src={avatarImage}
                    alt="Mario Guerra"
                    fill
                    className="object-cover object-center transition-all duration-700 group-hover:scale-105 grayscale-[50%] group-hover:grayscale-[20%]"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0.03)_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0))] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience & Impact Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-4 mb-12 md:mb-16">
              <div className="text-primary font-mono text-xs uppercase tracking-widest">/ Track Record</div>
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Experience &amp; Impact.</h2>
              <p className="text-muted-foreground font-light max-w-2xl">
                Where I've worked and what I shipped there.
              </p>
            </div>

            <div className="relative space-y-12">
              {/* Continuous timeline spine */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-border" aria-hidden="true"></div>

              {experience.map((job) => (
                <div key={`${job.company}-${job.role}`} className="group relative pl-6 md:pl-8">
                  {/* Timeline node */}
                  <div className="absolute left-0 top-[7px] h-2.5 w-2.5 -translate-x-1/2 border border-primary bg-background transition-colors duration-300 group-hover:bg-primary"></div>

                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                    <h3 className="text-lg font-bold tracking-tight md:text-xl">{job.role}</h3>
                    <span className="shrink-0 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      {job.period}
                    </span>
                  </div>

                  <p className="mt-1 font-mono text-sm uppercase tracking-wider text-primary">
                    {job.companyUrl ? (
                      <a
                        href={job.companyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {job.company}
                      </a>
                    ) : (
                      job.company
                    )}
                  </p>

                  <p className="mt-3 text-sm font-light leading-relaxed text-muted-foreground">{job.summary}</p>

                  {job.projects.length > 0 && (
                    <div className="mt-6 grid gap-px bg-border border border-border sm:grid-cols-2">
                      {job.projects.map((project) => (
                        <article
                          key={project.name}
                          className="relative flex flex-col bg-background p-5 transition-colors duration-300 hover:bg-secondary/40"
                        >
                          <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                            / Project
                          </span>
                          <h4 className="mt-2 text-sm font-bold tracking-tight">{project.name}</h4>
                          <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-4xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Let's Build Something Amazing</h2>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                Contact Me
                <FiArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
