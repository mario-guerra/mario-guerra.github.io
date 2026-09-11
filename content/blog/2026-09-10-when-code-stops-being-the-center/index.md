---
title: "Code Is Being Demoted to a Build Artifact"
excerpt: "The real shift isn't that AI writes more code. It's that code itself is dropping down the stack into a managed output. Value is moving to the governance layer."
date: "2026-09-10"
author: "Mario Guerra"
category: "Development"
tags: ["AI", "Software Engineering", "Agentic Coding", "Governance"]
blogpost: true
coverImage: "/images/blog/when-code-stops-being-the-center/sparky_software_factory.png"
---

I recently watched [Uber's presentation on their software factory architecture](https://www.youtube.com/watch?v=17-YSUHo6Lk), and it changed how I think about where software engineering is headed.

They're reporting that more than 70% of their pull requests involve local or cloud agents, code produced per engineer has doubled, and automated migrations have rewritten nine million lines of code.

Those numbers are wild. But they're not what I find interesting. More code isn't the same thing as more value.

The simple takeaway is that AI will write more code — duh. Everyone using agentic coding tools already knows this.

The more profound takeaway is that Uber is building what could very well be the blueprint for the future of software development. And at the core of that blueprint is a fundamental demotion: code is no longer the end goal. It's becoming a managed output.

To be clear, that's a directional claim, not a declaration that we can delete every repository tomorrow. Code isn't a build artifact yet in the deterministic, `make clean && make` sense. But more of it is being produced and managed like one, and that's enough to change where engineers create value.

Here's what I saw, and what I think it means.

## Code is where ambiguity dies

A product spec rarely provides a complete implementation. It describes a destination, but engineers still pick the route. How should errors be handled? Where should state live and for how long? What happens when the system is under heavy load? Hundreds of implementation decisions missing from the spec eventually coalesce in the code.

That is why code has always been the center of software engineering. Code is the bridge between incomplete human intent and executable reality.

Agentic coding is changing how that bridge gets built.

A capable agent doesn't just translate a spec. It searches the codebase, picks an approach, edits components, runs tests, inspects failures, and revises its work. When generating code, it makes the implementation decisions that humans used to make.

Maybe this is already evident to you, but I think it's worth stating plainly: we aren't shifting to "spec-first" development. We've had specs for decades. The real shift is moving from making implementation decisions directly to *governing a system that makes some of those decisions for us*.

## What we build as software engineers is changing, rapidly

An agent needs more than a clever prompt. It needs an environment that defines acceptable action.

- **Goals:** What are we building?
- **Guardrails:** What must never break?
- **Permissions:** What can it touch?
- **Context:** What does it need to know?
- **Criteria:** What evidence shows it works?
- **Escalation:** When does it ping a human?
- **Feedback:** How do production outcomes shape the next run?

This is the shape of what Uber built. Gateways control what models can do. A context graph gives agents the institutional knowledge they need — which services exist, who owns them, what broke last time. Skills define repeatable workflows so agents don't reinvent the wheel on every task.

It's not a fancy autocomplete or another agent harness. It's a governed engineering system.

Imagine a routine API migration. A weak instruction says, "Move every caller from v1 to v2." The agent updates some method names, gets the tests green, and opens a PR. It may still miss a deprecated field used only in production, violate a service ownership boundary, or quietly change retry behavior.

A governed workflow is different. It finds every caller from the service graph, limits changes to approved repositories, preserves an explicit compatibility contract, runs consumer tests and traffic simulations, requests review from affected owners, and stops if production telemetry goes sideways.

The code matters. But the reusable value lives in the system around it.

## Code becomes a build artifact — with a giant asterisk

Before the pitchforks come out: yes, a traditional build artifact can be deterministically reproduced from source inputs. Most AI-generated code isn't there yet.

A Jira ticket and a prompt cannot reconstruct years of undocumented behavior, production incidents, and hard-won human judgment. Existing code is still a source of truth, especially in legacy systems. Delete it because "the AI can regenerate it" and you're going to have a very bad day.

But look at the direction of travel.

Code starts behaving like a build artifact when desired behavior lives in contracts and evaluations, architectural rules are machine-enforceable, agent workflows are versioned, changes can be tested in realistic environments, and production feedback closes the loop.

Under those conditions, the implementation becomes more replaceable. A governed process can generate, refactor, and delete code while preserving the behavior and constraints that actually matter.

This does not mean code becomes disposable. It means value moves up the stack: robust system blueprints, API contracts, architectural constraints, comprehensive tests, permissions, and escalation rules.

A solid foundation doesn't *force* an agent to write safe software. Nothing does. But it makes safe changes more likely and bad changes easier to catch. A weak foundation lets the agent default to its laziest instinct: producing brittle, lowest-common-denominator code that sounds plausible and fails in production.

**AI doesn't fix unclear thinking. It just turns unclear thinking into crappy software faster.**

## Cheap generation puts verification under pressure

Verification has always been hard. What's new is the economics.

When code generation is cheap, trying again is easy. The system can produce more plausible changes than a team can confidently evaluate, so the pressure on verification goes way up. And because agents can make broad changes across unfamiliar parts of a system, the evidence sometimes needs to be stronger than a unit test and a convincing PR description.

That's why [Uber's massive investment in validation](https://www.youtube.com/watch?v=EL123UNokkI) was a crucial part of their talk. Their agents don't just write code. They launch simulators, compare UI screenshots, fix CI pipelines, and attach hard evidence to the PR.

The trust model is shifting from confidence in the author to evidence attached to the change. A PR shouldn't get a lighter pass because a senior engineer wrote it, or because an agent produced a very confident explanation. It should merge because the available evidence shows that the change meets the contract.

But there is a blind spot: tests only check what you remembered to test. An agent can pass every check in the suite and still confidently build the wrong thing.

That leaves us with two separate problems:

1. **Did we build the thing correctly?**
2. **Did we build the correct thing?**

We can automate more of the first. The second still requires product judgment, operational context, and someone willing to own the outcome.

Because validation is never perfect, a green build isn't enough. The system also needs hard boundaries: narrow permissions, staged rollouts, reversible changes, production monitoring, and mandatory escalation when the blast radius gets large.

Of course, the governance layer can be wrong too. A test can encode the same bad assumption as the implementation. A guardrail can preserve yesterday's architecture. If the same agent writes the code, the test, and the explanation, you may get three artifacts that agree with each other and are all wrong. Evaluations need independent signals, clear owners, and periodic review. Otherwise, we've just moved the bugs up a layer and given them policy names.

And more governance isn't automatically better. Wrap every change in enough approvals, gates, and escalation rules and you've reinvented the bureaucracy the agents were supposed to help us escape. The goal is the minimum governance required for the consequence of the change.

Which brings us to the core governance question:

> What decisions can the agent make, what evidence earns that authority, and how quickly will we know when it makes a bad one?

Autonomy needs to scale with evidence, not enthusiasm.

## Governing the loop

As agentic software factories become more common, it's fashionable to say engineers will just move up the stack into architecture and product thinking. That's a nice thought, but it's too simplistic.

Not every implementation role becomes an architecture or product role. Not every software developer is cut out to be an architect or product manager. And there's a bigger problem hiding underneath that story: implementation work is how engineers develop judgment in the first place.

You learn architecture by living with bad abstractions. You learn reliability by debugging production failures. You learn where the sharp edges are by cutting yourself on a few of them.

If agents absorb the routine implementation work, how do junior engineers become the senior engineers capable of governing those agents?

"Let the AI handle it" is not an answer. Teams will need deliberate learning loops: reviewing the agent's decisions instead of only its diff, tracing failures back through context and constraints, rotating engineers through operations, and making sure people still get opportunities to work below the abstraction layer.

Otherwise, we risk creating a thin layer of senior engineers supervising automation while quietly destroying the pipeline that creates the next generation of senior engineers. Whoops.

I think engineering value will coalesce around a specific set of skills:

- Defining precise outcomes
- Encoding architectural guardrails
- Building evaluations that catch subtle failures
- Establishing permissions and escalation boundaries
- Investigating systemic failures
- Interpreting production evidence
- Deciding if a feature is worth building at all

Engineers will spend less time making every implementation decision. They will spend more time shaping the environment in which those decisions are made.

## Assurance is the capacity bottleneck

Verification asks whether a change meets its contract. Assurance is everything the organization needs to trust that evidence enough to act on it: review, CI, deployment controls, monitoring, rollback, ownership, and human attention.

Remove one bottleneck, reveal the next. Uber doubled its code output. It also hit the wall on code review, CI capacity, and human attention.

If agents crank out code faster than you can evaluate, deploy, observe, and absorb it, you don't get more value or velocity. You get a bigger queue of plausible-looking work, more maintenance, more operational risk, and more noise.

That is why code output is the wrong victory metric. The numbers that matter are migration time, change-failure rate, recovery time, regressions, and maintenance cost. Uber's output numbers establish throughput, not impact. If the software factory doubles output without improving those outcomes, congratulations: you've optimized the wrong thing.

The old problem: Can we build it?

The new problem: Can we establish enough justified confidence to let it run?

The best software factory won't produce the most code. It will turn sharp decisions into reliable systems and prevent garbage software from ever reaching production.

## Five questions to ask now

If you're building an agentic development workflow, or evaluating whether to start, answer these five questions before you hand an agent the keys to your codebase:

1. **What decisions can the agent make alone?** Define authority by consequence, not convenience.
2. **What constraints are absolute?** Put them in tools and policy, not just a Markdown file nobody reads.
3. **What evidence is enough to trust the change?** Include behavior, security, operations, and affected owners.
4. **When must it stop and ask for help?** Treat uncertainty and blast radius as real signals.
5. **What production outcomes prove the objective or implementation was wrong?** Decide before rollout, then feed that answer back into the system.

The future isn't just AI writing code. It's humans delegating some of the judgment that connects intent to implementation. Our job is to govern the environment where that judgment happens without forgetting how to exercise it ourselves.

Code is still where intent becomes executable. Production is still reality. The real challenge is building decision systems good enough to sit between them.
