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

[Uber reports](https://www.youtube.com/watch?v=17-YSUHo6Lk&t=40s) that more than 70% of their pull requests now involve local or cloud agents, lines of code per engineer doubled year over year, and more than 250 automated migrations changed nine million lines of code.

Those numbers are wild. But they establish throughput, not impact. Whether this machinery produces better software is the more important question, and it's still open.

The simple takeaway is that AI will write more code. Duh. Everyone using agentic coding tools already knows this.

The more profound takeaway is that Uber is building what could very well be a blueprint for large-scale software development. And at the core of that blueprint is a fundamental demotion: code is no longer the primary object of engineering work. It's becoming a managed output.

Here's what I saw, and what I think it means.

## Code is where ambiguity becomes behavior

A product spec rarely provides a complete implementation. It describes a destination, but engineers still pick the route. How should errors be handled? Where should state live and for how long? What happens under heavy load? The implementation answers those questions whether the spec does or not, sometimes deliberately and sometimes by accident.

That is why code has always been the center of software engineering. It is the bridge between incomplete human intent and executable reality.

Agentic coding is changing how that bridge gets built.

A capable agent doesn't just translate a spec. It searches the codebase, picks an approach, edits components, runs tests, inspects failures, and revises its work. When generating code, it makes the implementation decisions that humans used to make.

It's worth stating plainly: we aren't shifting to "spec-first" development. We've had specs for decades. The real shift is moving from making implementation decisions directly to *governing a system that makes some of those decisions for us*.

## The prompt isn't the product

An agent needs more than a clever prompt. It needs an environment that defines acceptable action.

- **Goals:** What are we building?
- **Constraints:** What must never break?
- **Permissions:** What can it touch?
- **Context:** What does it need to know?
- **Evidence:** What criteria shows it works?
- **Escalation:** When does it ping a human?
- **Feedback:** How do production outcomes shape the next run?

This is the shape of what Uber built. Gateways control what models can do. A context graph gives agents the institutional knowledge they need: which services exist, who owns them, and what broke last time. Skills define repeatable workflows so agents don't reinvent the wheel on every task.

It's not a fancy autocomplete or another agent harness. It's a governed engineering system.

Imagine an API migration. Tell an agent to "move every caller from v1 to v2," and it may update some method names, get the tests green, and still miss a production-only field or quietly change retry behavior.

A governed workflow finds every caller, limits which repositories can change, preserves the compatibility contract, runs consumer tests, requests review from affected owners, and stops if production telemetry goes sideways.

The code matters. But the reusable value lives in the system around it.

## Code becomes a build artifact, with a giant asterisk

Before the pitchforks come out: yes, a traditional build artifact can be deterministically reproduced from source inputs. Most AI-generated code isn't there yet. A Jira ticket and a prompt cannot reconstruct years of undocumented behavior and hard-won judgment. Delete a legacy system because "the AI can regenerate it" and you're going to have a very bad day.

But code does not need to be disposable to be demoted. It only needs to stop being the primary place where engineering intent and value live.

That starts to happen when desired behavior lives in contracts and evaluations, architectural rules are machine-enforceable, agent workflows are versioned, and production feedback closes the loop. Under those conditions, implementation becomes more replaceable. Value moves into system blueprints, API contracts, architectural constraints, tests, permissions, and escalation rules.

Replaceable does not mean unreadable. Generated code becomes context for the next agent and the thing a human has to debug at 2 a.m. Its quality still matters, even if authorship matters less.

A solid foundation doesn't *force* an agent to write safe software. Nothing does. But it makes safe changes more likely and bad changes easier to catch. A weak one produces brittle, lowest-common-denominator code that sounds plausible and fails in production.

**AI doesn't fix unclear thinking. It just turns unclear thinking into crappy software faster.**

## Cheap generation puts verification under pressure

Verification has always been hard. What's new is the economics.

When code generation is cheap, the system can produce more plausible changes than a team can confidently evaluate. And because agents can make broad changes across unfamiliar parts of a system, the evidence sometimes needs to be stronger than a unit test and a convincing PR description.

That's why [Uber's investment in validation](https://www.youtube.com/watch?v=EL123UNokkI) was a crucial part of their talk. Their agents launch simulators, compare UI screenshots, repair CI failures, and attach evidence to the PR.

Human-written code has always needed evidence. What's changing is that machine-speed output makes informal trust and purely manual review impossible to scale. The evidence has to travel with the change.

But there is a blind spot: tests only check what you remembered to test. An agent can pass every check in the suite and still confidently build the wrong thing.

That leaves us with two separate problems:

1. **Did we build the thing correctly?**
2. **Did we build the correct thing?**

We can automate more of the first. The second still requires product judgment, operational context, and someone willing to own the outcome.

Because validation is never perfect, a green build isn't enough. The system also needs hard boundaries: narrow permissions, staged rollouts, reversible changes, production monitoring, and mandatory escalation when the blast radius gets large.

Of course, governance can be wrong too. If the same agent writes the code, the test, and the explanation, you may get three artifacts that agree with each other and are all wrong. Evaluations need independent signals, clear owners, and periodic review. Otherwise, we've just moved the bugs up a layer and given them policy names.

More governance isn't automatically better either. Wrap every change in enough gates and you've rebuilt the bureaucracy the agents were supposed to help us escape. The goal is the minimum governance required for the consequence of the change.

Which brings us to the core governance question:

> What decisions can the agent make, what evidence earns that authority, and how quickly will we know when it makes a bad one?

Autonomy needs to scale with evidence, not enthusiasm.

## Who learns to govern the loop?

As agentic software factories become more common, it's fashionable to say engineers will just move up the stack into architecture and product thinking. That's a nice thought, but it's too simplistic.

Not every implementation role becomes an architecture or product role. Not every software developer is cut out to be an architect or product manager. And there's a bigger problem hiding underneath that story: implementation work is how engineers develop judgment in the first place.

You learn architecture by living with bad abstractions. You learn reliability by debugging production failures. You learn where the sharp edges are by cutting yourself on a few of them.

If agents absorb the routine implementation work, how do junior engineers become the senior engineers capable of governing those agents?

"Let the AI handle it" is not an answer. Teams will need deliberate learning loops: reviewing the agent's decisions instead of only its diff, tracing failures through context and constraints, rotating engineers through operations, and preserving opportunities to work below the abstraction layer.

Otherwise, we risk creating a thin layer of senior engineers supervising automation while quietly destroying the pipeline that creates the next generation of senior engineers. Whoops.

Today's assurance bottleneck is senior attention. If we automate away the work that produces senior judgment, tomorrow's bottleneck will be the people capable of providing that assurance at all.

I think engineering value will coalesce around five skills:

- Defining precise outcomes
- Encoding guardrails and escalation boundaries
- Building evaluations that catch subtle failures
- Investigating failures and interpreting production evidence
- Deciding if a feature is worth building at all

Engineers will spend less time making every implementation decision. They will spend more time shaping the environment in which those decisions are made.

## Assurance is the capacity bottleneck

Verification asks whether a change meets its contract. Assurance is everything the organization needs to trust that evidence enough to act on it: review, CI, deployment controls, monitoring, rollback, ownership, and human attention.

Remove one bottleneck, reveal the next. After showing its coding agents, [Uber's presentation turns to](https://www.youtube.com/watch?v=17-YSUHo6Lk&t=828s) pre-CI validation, automated review, CI capacity, and how not to overwhelm engineers with machine-generated work.

If agents crank out code faster than you can evaluate, deploy, observe, and absorb it, you don't get more value or velocity. You get a bigger queue of plausible-looking work, more maintenance, more operational risk, and more noise.

That is why code output is the wrong victory metric. The numbers that matter are migration time, change-failure rate, recovery time, regressions, and maintenance cost. If the software factory doubles output without improving those outcomes, congratulations: you've optimized the wrong thing.

Building it was never the only problem. But as implementation gets cheaper, confidence becomes the constraint we hit first.

The best software factory won't produce the most code. It will turn sharp decisions into reliable systems and prevent garbage software from ever reaching production.

## Five questions to ask now

If you're building an agentic development workflow, or evaluating whether to start, answer these five questions before you hand an agent the keys to your codebase:

1. **What decisions can the agent make alone?** Define authority by consequence, not convenience.
2. **What constraints are absolute?** Put them in tools and policy, not just a Markdown file nobody reads.
3. **What evidence is enough to trust the change?** Include behavior, security, operations, and affected owners.
4. **When must it stop and ask for help?** Treat uncertainty and blast radius as real signals.
5. **What production outcomes tell us the objective or implementation was wrong?** Decide before rollout, then feed that answer back into the system.

The future isn't just AI writing code. It's humans delegating some of the judgment that connects intent to implementation. Our job is to govern the environment where that judgment happens without forgetting how to exercise it ourselves.

Code is still where intent becomes executable. Production is still reality. The real challenge is building decision systems good enough to sit between them.
