---
title: "The Embarrassingly Simple Way AI Models Get Smarter"
excerpt: "A recent paper reveals that models can dramatically improve at hard coding tasks by training on their own outputs, with no labels, no reinforcement learning, and no human feedback required."
date: "2026-04-06"
author: "Mario Guerra"
category: "AI"
tags: ["AI", "Machine Learning", "Self-Distillation", "LLMs", "Model Training"]
blogpost: true
coverImage: "/images/blog/the-embarrassingly-simple-way-ai-models-get-smarter/robot-attic-exploration.png"
---

> What if an AI could get dramatically better at its job without anyone telling it what it's doing right or wrong?

## Table of contents
- [The dusty attic](#the-dusty-attic)
- [Taking inventory](#taking-inventory)
- [Knowing what you have changes how you choose](#knowing-what-you-have-changes-how-you-choose)
- [What this means for the rest of us](#what-this-means-for-the-rest-of-us)
- [The bigger picture](#the-bigger-picture)

---

Picture a dusty attic you've never properly explored. You know there's stuff up there, boxes from years of accumulation, but you've never taken the time to see what's actually in them.

One afternoon, you finally climb up with a flashlight and start opening things.

Some of it is junk. Tangled cables, broken parts, things that should have been thrown out years ago. But some of it is genuinely valuable. Equipment you forgot you owned. Books that are exactly what you need right now. Tools that solve a problem you were about to spend money on.

You didn't add anything to the attic. Everything was already there. But the act of taking inventory changed everything, because now you know what you have. And knowing what you have fundamentally changes how you make decisions.

A recent AI research paper describes something strikingly similar happening inside AI models that write code, and the results should change how you think about AI capability.

**A model trained on its own outputs, including wrong ones, with no feedback of any kind, gets dramatically better at solving hard coding problems.**

The researchers call the technique "simple self-distillation." The name is deliberate. It's almost embarrassingly straightforward.

---

## The dusty attic

Every AI model has an attic. It's the full range of solutions the model is capable of producing, everything from elegant code to complete nonsense. During normal use, you only ever see what the model reaches for first, whatever is closest to the top of the stairs. You never find out what else is up there.

Simple self-distillation is the flashlight.

Here's the recipe: take an AI model that writes code, have it produce thousands of solutions to programming problems, don't grade them, don't filter out the bad ones, don't even check if they work, and then feed all of those solutions back into the model's learning process so it can absorb patterns from its own work.

Your gut reaction is probably that this is a terrible idea. Learning from your own mistakes should reinforce bad habits, not fix them. But here's what actually happens: the model improves consistently, and the biggest improvements show up on the hardest problems, the ones the model was struggling with most.

Why? Because the model isn't learning new solutions from its generated code. **It's taking inventory.** By processing the full breadth of its own outputs, the model builds a map of its own capabilities. It discovers what it already knows (the valuable equipment buried under dust) and what's just noise (the tangled cables and broken parts).

The inventory doesn't add knowledge. It organizes the knowledge that was always there.

And just like our attic trip, knowing what you have changes everything about how you make decisions.

---

## Taking inventory

The inventory process has three steps, and the magic is in the shift between the first and the last.

1. **Explore freely** — The model generates solutions in a loose, creative mode, like throwing open every box in the attic and pulling everything out. It produces a wide range of outputs, some brilliant, some mediocre, some wrong.

2. **Take stock** — All of those solutions are fed back into the model's learning process, as-is. No sorting, no scoring. Just exposure to everything it's capable of.

3. **Choose with clarity** — The model is then tested in a more focused, selective mode, like walking through the attic after inventory, knowing exactly where everything is and reaching straight for what you need.

The key is the shift between exploring and choosing. The model rummages freely, then acts with precision. That mismatch between "open every box" and "grab exactly the right thing" is the entire engine of improvement.

Here's why the inventory metaphor holds so tightly. Before the attic trip, you might have gone out and bought a new tool because you didn't realize you already owned one. You might have thrown away something workable because you mistook it for junk. After the inventory, you have a mental map. You know what's valuable, what's garbage, and where everything sits. You make sharper decisions, not because you acquired anything new, but because you stopped being blind to what was already there.

> **But here's where it gets really interesting.** A real attic is static. You can only work with what's already up there. The model's "attic" is different. Once the flashlight reveals what's valuable and what's junk, the model doesn't just pick from its existing inventory. It starts *generating new things* that look more like the treasure and less like the garbage. The act of taking inventory recalibrates the model's creative instincts, so future solutions trend toward the quality patterns it recognized and away from the noise. The attic isn't just storage. Once the light hits, it becomes a workshop that builds more of what's valuable and less of what isn't.

---

## Knowing what you have changes how you choose

To see why this produces such outsized gains on hard problems specifically, consider that writing code involves two fundamentally different kinds of decisions.

Sometimes there's only one right move. You're writing the one character that completes a line of code, or following a rule that has no flexibility. These are **lock** moments, like finding a key in the attic that only fits one door. The model needs to be precise, reaching directly for the single right answer without hesitation.

Other times, the problem branches into many legitimate paths. There might be five different ways to structure a solution, and multiple approaches will work. The best choice might not be obvious until much later. These are **fork** moments, like finding a shelf of tools in the attic where several of them could do the job. The model needs to stay open and consider its options before committing.

The trouble with most AI models is that they handle every decision the same way. They haven't taken inventory, so they can't tell a lock from a fork. They either grab the first thing they touch (missing better options) or spend too long browsing (making sloppy mistakes on things that should be automatic).

It's like navigating the attic in the dark. You bump into everything and can't tell treasure from trash.

Simple self-distillation turns on the flashlight and opens the workshop. After taking inventory of its own outputs, the model develops situational awareness. It learns when to reach directly for the one right answer and when to keep browsing because the situation calls for exploration. That's why the hardest problems benefit the most. Hard problems have more forks, more moments where the workshop's ability to generate treasure-like solutions instead of junk makes the difference.

---

## What this means for the rest of us

You don't need to be training AI models for this research to matter to you. The implications are broader than the technique itself.

**The tools you're already using probably have a bigger attic than you think.** This is the headline insight. If a dead-simple self-learning loop with zero external guidance can unlock major performance gains, the capability was already inside the model. It wasn't missing knowledge. It just hadn't taken inventory of what it knew.

We've been assuming "the AI can't do this" when the real issue was "the AI hasn't explored its own attic yet." Those are very different problems with very different solutions. The next time a model gives you a mediocre output, it might be worth changing how you ask rather than reaching for a smarter model. You might just need to turn on the light and let the workshop do its thing.

**Complexity is often a crutch, not a solution.** There's enormous pressure in AI to build sophisticated systems. Multi-step improvement processes. Elaborate schemes to score and rank the model's behavior. Expensive human review pipelines. These approaches represent real progress, but they also carry real costs in engineering time, data requirements, and fragility.

This paper demonstrates that sometimes the highest-leverage move is subtracting machinery, not adding it. You don't always need to buy new equipment. Sometimes you just need to check the attic, and trust that it knows how to become a workshop on its own.

**How you ask matters as much as what you ask.** The entire mechanism here hinges on a deliberate shift between creative exploration and focused selection. Rummage wide, then choose narrow.

If that sounds like good human problem-solving strategy, it's not a coincidence. The same principle applies when you're working with AI tools in your own workflow. Let the model explore freely in your brainstorming phase, then tighten the constraints when you need a precise answer. The mode you operate in shapes the quality of the output.

---

## The bigger picture

We're living through a strange and exciting moment in AI where the field keeps discovering that less can produce more. Models improve by arguing with themselves. Learning processes work better with messier data. A technique that a single researcher could implement in an afternoon outperforms systems that took entire teams months to build.

Simple self-distillation is a particularly clean example of this pattern because it strips away every crutch. No human judgment. No external scoring. No architectural changes. Just a model, its own outputs, and a flashlight.

For years, we've assumed that making AI better requires showing it what "better" looks like. This research suggests a different story. Sometimes the model already has what it needs, packed away in boxes it never thought to open. Our job isn't to fill the attic with better stuff. It's to hand the model a flashlight and let the attic become a workshop.

The most powerful question in AI might not be "how do we teach it more?"

It might be "what does it already know that we haven't figured out how to ask for?"

---

*If you want to dig into the technical details, the [original paper](https://arxiv.org/pdf/2604.01193) is worth your time. And if you've had your own experience with simple approaches outperforming complex ones, whether in AI or anywhere else, I'd love to hear about it. The best insights often come from people who are willing to try the things that shouldn't work.*
