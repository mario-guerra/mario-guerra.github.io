AI coding assistants are brilliant, but they're also lazy. Ask one to build something and it takes the shortest path to a working solution. The code runs, but dig deeper and you'll find security gaps, brittle architecture, and shortcuts everywhere.

After months of building production software as a one-person team, I developed [SOLO](https://marioguerra.xyz/solo-protocol/) (Single Operator Loop Orchestration) to address these challenges. It's a framework that adds just enough structure to transform sloppy AI output into software that's actually production-worthy.

---

## Why structure matters

The promise of agentic coding is simple: give an AI a goal and let it iterate until it succeeds. In practice, this approach burns through tokens, skips important planning steps, and produces code that's hard to maintain.

LLMs don't think about security. They don't consider the full software development lifecycle. They jump straight to coding and apply Band-Aid fixes when things break. And as conversations grow, automatic compaction loses important context.

I built SOLO around six principles:

- **Spec-Driven Development.** I lay groundwork before writing code. I give the AI a blueprint, not just a goal.
- **API-First design.** I keep backend plumbing separate from frontend concerns.
- **Security-First architecture.** I design authentication and security before feature code.
- **Trust but verify.** I build in checkpoints. I never accept the first output.
- **Test-Driven development.** I generate comprehensive tests. I run them after every feature.
- **Controlled context.** I own what gets saved between sessions.

---

## The workflow

SOLO uses slash commands to guide the AI through a structured process.

**Planning loop.** Before coding, I run the **`/Architect`** command to design the system. Then I run **`/Critique`** to tear apart the plan and surface hidden issues. I run **`/Revise`** to address those findings. I loop until I'm satisfied, then generate **`/Tickets`** with clear dependencies.

**Execution loop.** The **`/Code`** command invokes a principal engineer persona with TDD baked in. For refactors, **`/Code++`** creates a reference implementation first. **`/Review`** performs an adversarial code audit. **`/Fix`** addresses the findings. **`/Test`** runs all tests until they're green and clean, with strict instructions not to remove or hack tests to achieve this. Proper code fixes are required.

**Debug loop.** When things break and the cause isn't obvious, I use the **`/Sherlock`** directive to reframe the problem as a mystery to solve. This persona shift breaks the AI out of its Band-Aid fix patterns and triggers deeper root cause analysis. Based on the findings, I loop back to the Planning Loop to redesign the fix, then return to the Execution Loop to implement it. The Debug Loop cycles between investigation, planning, and execution until the issue is truly resolved.

**Memory loop.** At the end of each session, I run the **`/Memory`** command to create a structured session file with project basics, current work, discovered pitfalls, and next steps. When I start a new session, **`/Resume`** rehydrates that context. This loop is what makes SOLO sustainable for real projects. Without it, I'd lose accumulated knowledge every time I start a fresh session or the context window fills up.

---

## Who benefits

You might think this sounds like overhead. It is more work than just asking an AI to build something. But the workflows encode expertise you don't need to have yourself.

You don't need to be an expert architect to use the **`/Architect`** command. The prompts steer the AI toward best practices that would otherwise require years of experience to know.

If you're building something just for yourself, maybe you don't need this rigor. But if you're putting code into production, the investment pays off. The workflows are a **power-up** that lets you trust AI outputs more because of the rigor built into the process.

---

## Getting started

SOLO works with Cursor, Antigravity, and any agentic IDE that supports slash commands. Drop the workflow files into your IDE's command directory and start using the slash commands.

Start with a small project. Run through the **Planning Loop** to see how critique and revise improve your plans. Try the **Execution Loop** and notice what the review catches. The goal isn't rigid adherence to every step. It's internalizing the principles: **Plan before you code. Critique your plans. Verify your implementations. Own your context.**

AI tools are powerful enough to build real software, but not reliable enough to trust blindly. SOLO is a framework for getting the best from these tools while compensating for their weaknesses.

---

*The SOLO Protocol is open source and [available on GitHub](https://github.com/mario-guerra/solo-protocol-release).*
