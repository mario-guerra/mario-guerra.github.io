import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiFileText, FiLinkedin, FiGithub, FiMail, FiYoutube } from "react-icons/fi";
import { SiX } from "react-icons/si";
import avatarImage from "../../../public/images/avatars/Mario_Guerra_avatar_new.png";

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

      {/* Skills Section */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Skills & Expertise</h2>
              <p className="mt-2 text-muted-foreground">
                My core technical skills and areas of expertise
              </p>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Technical Expertise</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {["APIs", "TypeSpec", "OpenAPI", "LLMs", "RAG", "Distributed Systems", "Python", "C/C++", "Rust", "Azure", "Cloud Computing", "LLMOps", "Prompt Management", "Data Processing", "Qdrant", "Power BI", "DevOps", "CI/CD", "GitHub", "Security Standards"].map((skill) => (
                    <div key={skill} className="rounded-md bg-card p-3 text-center text-sm shadow-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Product & Leadership</h3>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {["Developer Tools", "API-First Strategy", "Cross-Functional Leadership", "Product Strategy", "Roadmapping", "Data-Driven Decisions", "Developer Advocacy", "Community Engagement", "User Research", "Requirements Gathering", "Stakeholder Alignment", "KPI Definition"].map((skill) => (
                    <div key={skill} className="rounded-md bg-card p-3 text-center text-sm shadow-sm">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Experience</h2>
              <p className="mt-2 text-muted-foreground">
                My professional journey
              </p>
            </div>

            <div className="space-y-8">
              <div className="relative border-l border-border pl-6">
                <div className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Principal Product Engineer — AI Strategy</h3>
                    <span className="text-sm text-muted-foreground">2025 - Present</span>
                  </div>
                  <p className="text-base font-medium">IntelePeer</p>
                  <p className="text-sm text-muted-foreground">
                    Architected and built the company's AI Agent Delivery Platform, shipping the full production stack and delivering the first live customer deployment in just three weeks. Created the <Link href="/blog/the-solo-protocol" className="text-primary hover:underline">SOLO protocol</Link> to drive repeatable, production-grade AI development.
                  </p>
                </div>
              </div>

              <div className="relative border-l border-border pl-6">
                <div className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Founder & AI Architect</h3>
                    <span className="text-sm text-muted-foreground">2025 - Present</span>
                  </div>
                  <p className="text-base font-medium">
                    IgnitionAI <a href="https://ignitionai.xyz" target="_blank" rel="noopener noreferrer" className="ml-1 text-primary hover:underline font-mono text-xs">(ignitionai.xyz)</a>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    An AI consultancy that deploys senior engineering agents to architect and launch products in days, not weeks.
                    Helping startups and SMBs turn ideas into launch-ready tools with measurable ROI.
                  </p>
                </div>
              </div>

              <div className="relative border-l border-border pl-6">
                <div className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Senior Product Manager - TypeSpec API Definition Language</h3>
                    <span className="text-sm text-muted-foreground">2021 - 2025</span>
                  </div>
                  <p className="text-base font-medium">Microsoft</p>
                  <p className="text-sm text-muted-foreground">
                    Leading product vision and strategy for TypeSpec, an open-source API definition language transforming API development.
                    Guiding Azure service teams as a member of the Azure API Stewardship Board, driving best practices for API development.
                    Defining KPIs to measure product success and iterating based on real-world usage.
                  </p>
                </div>
              </div>

              <div className="relative border-l border-border pl-6">
                <div className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Principal Software Engineer / Manager</h3>
                    <span className="text-sm text-muted-foreground">2008 - 2021</span>
                  </div>
                  <p className="text-base font-medium">Qualcomm</p>
                  <p className="text-sm text-muted-foreground">
                    Led the development of tools and platforms for Qualcomm's Hexagon DSP, the core of Snapdragon modem and Neural Processing Unit technology.
                    Served as de-facto product manager for Hexagon tools used by first-party software development teams.
                    Improved on-time delivery by 35% through the implementation of data-driven development processes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Projects Section */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="mx-auto max-w-4xl space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Key Projects</h2>
              <p className="mt-2 text-muted-foreground">
                Highlights from my portfolio
              </p>
            </div>

            <div className="space-y-8">
              <div className="relative border-l border-border pl-6">
                <div className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      <a 
                        href="https://orchidtrace.xyz" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-primary hover:underline transition-colors"
                      >
                        Orchid
                      </a> — Orchestration Interactive Debugger
                    </h3>
                    <span className="text-sm text-muted-foreground">IgnitionAI</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Created <a href="https://orchidtrace.xyz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium transition-colors">Orchid</a>, a local-first proxy and visual debugger for AI pipelines. Intercepts API traffic at the transport layer to record LLM prompts, tool payloads, and decisions to a local SQLite database. Integrates with the Model Context Protocol (MCP) to expose trace queries to agents, enabling step-by-step visual debugging and deterministic offline replay testing.
                  </p>
                </div>
              </div>

              <div className="relative border-l border-border pl-6">
                <div className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">TypeSpec 1.0 Launch</h3>
                    <span className="text-sm text-muted-foreground">Microsoft</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Led the zero-to-one launch of TypeSpec, delivering an API definition language that achieved 8-10x code reduction and 30% faster review times, delivering measurable developer productivity.
                  </p>
                </div>
              </div>

              <div className="relative border-l border-border pl-6">
                <div className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">RAG-Enhanced Chatbots with Microsoft Teams Data</h3>
                    <span className="text-sm text-muted-foreground">Personal Project</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Built RAG-enhanced chatbots using Graph API and Azure Foundry, leveraging LLMs to optimize workflows and demonstrate API-driven user support with secure data exchange.
                  </p>
                </div>
              </div>

              <div className="relative border-l border-border pl-6">
                <div className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">@azure Functionality in GitHub Copilot</h3>
                    <span className="text-sm text-muted-foreground">Microsoft</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Contributed to LLM-driven API integrations, enhancing developer productivity through context-aware code suggestions with secure data handling.
                  </p>
                </div>
              </div>

              <div className="relative border-l border-border pl-6">
                <div className="absolute -left-[7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-primary bg-background"></div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">AI Document Summarization</h3>
                    <span className="text-sm text-muted-foreground">Personal Project</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Developed an LLM-based solution to summarize large documents, optimizing data pipelines for efficient, secure processing with a sliding window approach.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border py-16 md:py-24">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center max-w-4xl mx-auto">
            <div className="space-y-2">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Let's Connect</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground">
                Interested in collaborating on API design, developer tools, or AI-powered solutions? Check out my full resume or get in touch.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/resume"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                View Resume
                <FiFileText className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
