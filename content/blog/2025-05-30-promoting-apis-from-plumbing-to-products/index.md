---
title: "Promoting APIs from Plumbing to Products"
excerpt: "Elevate your APIs from hidden infrastructure to polished products by prioritizing developer experience. Learn how treating APIs as user interfaces improves developer productivity, enables AI agent consumption, and creates interfaces that developers actually want to use."
date: "2025-05-30"
author: "Mario Guerra"
category: "API Design"
tags: [blog]
blogpost: true
coverImage: "/portfolio-website/images/blog/promoting-apis-from-plumbing-to-products/APIs_From_Plumbing_to_Products.jpeg"
---

Most software users never directly interact with an API. They tap buttons, swipe screens, and navigate menus without knowing about the underlying services exchanging data behind the scenes. This invisibility makes it easy for organizations to treat APIs as technical afterthoughts.

But for the developers who have to integrate these APIs into applications, the design quality matters **a lot**. A well-designed API can accelerate development via simple and straightforward implementations. A poorly designed one can turn even simple integration tasks into weeks of frustration and technical debt.

In many organizations, APIs live in the basement of software architecture. They're treated as plumbing, hidden behind walls, connecting various systems while remaining largely invisible until something breaks. This plumbing mentality results in APIs that may work in the technical sense but create significant friction for the developers who have to work with them.

What happens when we bring APIs up from the basement and into the showroom? When we start treating them as carefully crafted products rather than necessary infrastructure? The transformation can dramatically improve developer productivity, reduce integration time, and ultimately create better experiences for end users who may never know the API exists.

After years of helping teams build APIs for Azure and witnessing the evolution of AI systems, I've become convinced of one fundamental truth. **APIs deserve to be treated as products, not pipes**. They're user interfaces that happen to have developers and increasingly AI agents as their users.

## The Mental Shift From Plumbing to Product

Most technical discussions about APIs focus on HTTP methods, resource modeling, and RESTful principles. While these concepts matter, they miss a more fundamental question.

"How will this design decision affect the developers who need to integrate with our API?"

The best APIs I've encountered feel like they were built by someone who genuinely understands developers' problems and wants to help solve them. The worst ones make me wonder if anyone ever tried to use them before attempting to ship them.

Consider these two contrasting approaches:

**The Plumbing Approach**
"We need an API for our order processing system. Let's expose our database tables and internal functions through REST endpoints."

**The Product Approach**  
"Developers need to create and track orders. What would make this task intuitive and efficient for them? How can we hide our implementation complexity and expose only what they need?"

When we promote APIs from plumbing to products, they transform from frustrating obstacles into smooth paths that help developers accomplish their actual goals. This promotion isn't just a change in terminology, it's a different way of approaching design, implementation, and ongoing maintenance.

## Prioritizing Developer Experience

When we center developer experience in our API design, certain principles consistently produce better outcomes. Let's explore what makes APIs truly developer-friendly.

### Consistency Creates Intuitive Experiences

Consistency might be the single most important factor in API usability. Each inconsistency forces developers to pause, check documentation, and mentally context-switch.

Imagine if every app on your phone had completely different UI patterns for basic actions like saving or navigating back. That's exactly what inconsistent APIs feel like to developers.

When your API follows consistent patterns for everything from HTTP status codes to query parameters to error responses, developers benefit tremendously. They can learn a small part of your API and accurately predict how the rest works. This means less time reading documentation and more time building valuable features.

### Thoughtful Simplicity Reduces Cognitive Load

Complex APIs create cognitive burden for developers. Every parameter, option, header, and response field they need to understand takes mental energy away from solving their actual problems.

The best APIs hide complexity rather than expose it. When designing, ask yourself questions like these: Is this the simplest possible design that meets real developer needs? Am I exposing implementation details that developers shouldn't need to worry about? Could I make common operations simpler while keeping advanced capabilities available?

### Error Messages as Guidance, Not Dead Ends

Few things frustrate developers more than unhelpful error messages. Well-designed error responses transform moments of frustration into clear paths forward by answering:

- **What happened** - Clear error codes let developers programmatically handle specific conditions
- **Why did it happen** - Human-readable messages explain the issue in plain language
- **How can they fix it** - The most helpful errors suggest specific remediation steps

A good error message isn't just information. It's a helping hand extended exactly when developers need it most.

### Respecting Developer Investments Through Versioning

When a team builds on your API, they're making a significant investment. Your versioning strategy signals how much you respect that investment.

From a developer's perspective, any change that breaks their code is a major pain point, regardless of how minor it might seem to you. Building trust requires several key elements. You need explicitly defined support windows so developers know how long each version will be maintained. Provide clear guarantees about what kinds of changes might be made within a version. Give advance notice of upcoming versions and deprecations. Offer overlapping support periods that give adequate time to migrate.

These practices demonstrate respect for the time and resources developers have invested in your platform. They create confidence that your API won't suddenly change and break their applications.

## The New Frontier: Designing for AI Agents

As we enter the age of AI, we're witnessing a fundamental shift in how APIs are consumed. Traditionally, APIs were designed for human developers to integrate into their code. But with the rise of AI agents and Large Language Models (LLMs), we now need to consider a new type of consumer: autonomous AI systems that discover, learn, and interact with our APIs without human intervention.

This introduces new challenges and opportunities for API designers.

### Discovery Becomes Critical

AI agents need to find the right APIs for their tasks. Unlike humans who can search documentation or ask colleagues, AI systems mainly rely on what they can programmatically discover.

Creating dedicated discovery mechanisms like API catalogs with semantic metadata helps these systems understand the purpose and context of each API. Without good discovery tools, even the best-designed APIs remain invisible to AI agents.

### Documentation As Training Data

For AI systems, your API documentation isn't just reference material. It's potential training data that shapes how these systems understand and use your API. The quality of your descriptions directly impacts an AI's ability to correctly invoke your services.

Consider enhancing your service descriptions with detailed examples showing both simple and complex scenarios. Include explicit information about when and why to use each endpoint. Add clear error handling guidance and context about relationships between different operations.

The difference between good and great documentation is often the difference between an AI that can use your API effectively and one that can't use it at all.

### Designing Chunky APIs for Complex Workflows

While granular APIs offer flexibility, AI agents often need to accomplish higher-level tasks. Creating "chunky" operations that encapsulate common workflows into single calls can dramatically reduce the cognitive load on AI systems.

For example, instead of requiring multiple coordinated API calls to upload a file to a new storage container, a single convenience operation might handle the entire process:

```
POST /operations/uploadFileToNewContainer
```

This approach makes it much easier for AI agents to accomplish complex tasks without needing to understand all the underlying steps.

### Metadata and Documentation That Machines Can Parse

The structure of your API documentation directly impacts how well AI agents can understand your services. When designing documentation for machine consumption, focus on clear, consistent formats that are easy to parse. Include structured metadata that provides context and explicit information about relationships between resources. Provide detailed parameter descriptions with context about valid values.

Making your documentation machine-friendly doesn't mean sacrificing human readability. In fact, the clarity and structure that helps machines also makes your documentation better for human developers.

## Bringing It All Together: The API as a Product

Whether your API consumers are human developers or AI agents, the fundamental shift is the same. We need to treat our APIs as products rather than just technical interfaces.

### Designing from the Outside In

This requires a change in how we approach API design. Start with the experience you want to create, then work backward to implementation. This outside-in approach forces you to think about how your API will be consumed before writing a single line of implementation code.

"What would make this task intuitive for developers?" becomes the driving question rather than "How do we expose our internal systems?"

### Testing with Real Users

Would you ship a frontend UI without user testing? I hope not! The same principle should apply to your APIs.

Get feedback on your API design before writing implementation code. Tools like TypeSpec can help you formalize your API contract, making it easier for developers to give feedback on your design when it's still relatively inexpensive to make changes.

### Measuring Success Through Adoption and Satisfaction

Track not just technical metrics but how effectively developers can use your API. Metrics like time-to-first-successful-call, support ticket volume, and developer satisfaction tell you far more about the quality of your API than uptime statistics alone.

### Evolving Thoughtfully

Respect the investments developers have made in your platform. Every breaking change forces your consumers to spend time and resources updating their code, time they could be spending building new features or improving their own products.

The way you handle changes and deprecations speaks volumes about how much you value the developers who use your API. Clear communication, adequate notice, and thoughtful migration paths build trust and loyalty.

## Building APIs Worth Choosing

The most successful APIs aren't just technically sound. They're user interfaces designed with deep consideration for the developers and AI systems who use them. They anticipate common use cases, provide clear paths forward when things go wrong, and respect users' time and expertise.

Great APIs don't happen by accident. They require intentional design that puts the developer experience at the center of the process from day one. When we make this mental shift from APIs as plumbing to APIs as products, we create platforms that developers genuinely want to build on and that AI agents can effectively leverage.

How would your APIs change if you approached them with the same care and attention you give to your user interfaces? What if every design decision started with the question of how this will affect the developers who use our API?

<div class="resource-links">

## Related Resources

- [API Strategy and Governance](/documentation/api_strategy_governance) Learn how to establish an effective API strategy and governance model
- [API Lifecycle Management](/documentation/api_lifecycle_management) Best practices for managing APIs throughout their entire lifecycle
- [Making APIs Consumable by AI Agents](/documentation/making_apis_consumable_by_agents) Techniques for designing APIs that work well with AI systems

</div>


