import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiFileText, FiLinkedin, FiGithub, FiMail, FiYoutube } from "react-icons/fi";
import { SiX } from "react-icons/si";
import avatarImage from "../../../public/images/avatars/Mario_Guerra_avatar.png";

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
                  Product leader translating technical complexity into seamless developer experiences. Proven record of driving 30%+ productivity gains by combining developer-first principles with strategic AI innovation.
                </p>
              </div>
              <div className="max-w-[600px] space-y-4 text-foreground/90">
                <p>
                  Hello! I'm Mario Guerra, a Technical Product Manager with over 15 years of experience driving innovation in developer tools, APIs, AI-driven solutions, and scalable infrastructure.
                </p>
                <p>
                  Currently at Microsoft, I lead the TypeSpec API Definition Language project, an open-source language that has been adopted by over 30% of Azure services to produce SDKs across multiple programming languages, cutting development and review time by 30%.
                </p>
                <p>
                  I specialize in creating developer-first products that measurably boost productivity and accelerate software delivery. By integrating human-centered design with cutting-edge AI capabilities, I transform complex development workflows into intuitive, efficient, and reliable experiences.
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
              <div className="relative aspect-square overflow-hidden rounded-full border-2 border-primary bg-background/50 p-2">
                <Image
                  src={avatarImage}
                  alt="Mario Guerra"
                  width={400}
                  height={400}
                  className="aspect-square rounded-full object-cover"
                  priority
                />
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
                    <h3 className="text-lg font-semibold">Senior Product Manager - TypeSpec API Definition Language</h3>
                    <span className="text-sm text-muted-foreground">2021 - Present</span>
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
